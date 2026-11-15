import { readSiteArchive } from './archive.mjs';
import { configuration, SubmissionError } from './policy.mjs';
import { submitToGithub, mergeSubmission, githubClient } from './github.mjs';
import { readState, writeState, takeLock, releaseLock, readArchive } from './storage.mjs';
import { folderArchive } from './folder.mjs';
import { admission } from './admission.mjs';
import { sourceConfiguration } from './source-policy.mjs';
import { saveServerSource } from './source-github.mjs';

export function createProcessor({ read = readState, write = writeState, lockSubmission = takeLock, unlock = releaseLock, gate = admission, configFor = configuration, sourceConfigFor = sourceConfiguration, client = githubClient, prepareArchive = async (submission, state) => state.mode === 'folder' ? folderArchive(submission, state) : readSiteArchive(await readArchive(submission)), submit = submitToGithub, merge = mergeSubmission, saveSource = saveServerSource } = {}) {
  return async function processSubmission(submission) {
    const lock = await lockSubmission(submission.id);
    if (!lock) return;
    let state;
    try {
      state = await read(submission.id);
      if (!state || ['submitted', 'merge_failed', 'failed', 'cancelled'].includes(state.phase) || state.resumeAfter > Date.now()) return;
      if (state.purpose !== submission.purpose) throw new SubmissionError('접수 종류가 일치하지 않습니다.', 403);
      if (state.mode === 'folder' && (state.phase === 'awaiting_upload' || !state.finalizedAt)) return;
      await gate.touch(submission);
      state = { ...state, phase: state.pullNumber ? 'merging' : 'validating', attempts: (state.attempts || 0) + 1, resumeAfter: undefined, message: undefined };
      await write(submission.id, state);
      const onProgress = async (completedFiles, totalFiles, checkpoint) => {
        const advanced = completedFiles > (state.completedFiles || 0) || checkpoint.length > (state.checkpoint?.length || 0);
        state = { ...state, completedFiles: Math.max(completedFiles, state.completedFiles || 0), totalFiles, checkpoint, retryFailures: advanced ? 0 : state.retryFailures };
        await write(submission.id, state);
        await gate.touch(submission);
      };
      if (state.purpose === 'server') {
        const sourceConfig = sourceConfigFor();
        if (!sourceConfig.enabled || sourceConfig.repository.toLowerCase() !== state.sourceDestination?.repository?.toLowerCase()) throw new SubmissionError('서버 원본 저장소 설정이 변경되었습니다. 담당자에게 알려주세요.', 409);
        const github = client(sourceConfig.token, sourceConfig.repository, fetch, Date.now() + 210000);
        const archive = await prepareArchive(submission, state);
        state = { ...state, phase: 'saving' }; await write(submission.id, state);
        const saved = await saveSource(submission, state, archive, { github, onProgress });
        await write(submission.id, { ...state, phase: 'submitted', archived: true, sourceCommit: saved.commit, sourcePath: saved.path, checkpoint: undefined, message: undefined, resumeAfter: undefined });
        await gate.finish(submission).catch(() => {});
        return;
      }
      const config = configFor();
      const github = client(process.env.SUBMISSION_GITHUB_TOKEN, config.repository, fetch, Date.now() + 210000);
      if (!state.pullNumber) {
        const archive = await prepareArchive(submission, state);
        state = { ...state, phase: 'saving', totalFiles: archive.files.length, totalBytes: archive.bytes };
        await write(submission.id, state);
        const pull = await submit(submission, archive, { github, config, checkpoint: state.checkpoint || [], onProgress });
        if (pull.unchanged) {
          await write(submission.id, { ...state, phase: 'submitted', merged: true, unchanged: true, checkpoint: undefined, message: undefined });
          await gate.finish(submission).catch(() => {});
          return;
        }
        state = { ...state, phase: 'merging', pullNumber: pull.number, pullUrl: pull.html_url, pullHeadSha: pull.head?.sha, checkpoint: undefined };
        await write(submission.id, state);
      }
      const merged = await merge(submission, { number: state.pullNumber, head: { sha: state.pullHeadSha }, ...(state.baseTreeSha !== undefined ? { baseTreeSha: state.baseTreeSha } : {}) }, { github, config });
      await write(submission.id, { ...state, phase: 'submitted', merged: true, mergeCommit: merged.sha, mergedAt: Date.now(), resumeAfter: undefined, message: undefined });
      // Cleanup is retried by availability/status requests if storage is unavailable.
      await gate.finish(submission).catch(() => {});
    } catch (error) {
      if (!state) return;
      const retryable = typeof error.retryable === 'boolean' ? error.retryable : error.githubStatus
        ? Boolean(error.retryAfterMs) || [408, 425, 429].includes(error.githubStatus) || error.githubStatus >= 500
        : error.status >= 500 || error.name === 'TimeoutError' || error.name === 'AbortError';
      // Execution slices are continuations, not failures. Transient failures keep
      // the source/checkpoint for the lifetime of the active receipt.
      const retryFailures = error.continuation ? (state.retryFailures || 0) : Math.min((state.retryFailures || 0) + 1, 16);
      const baseDelay = error.githubRateLimited ? 65000 : 5000;
      const delay = error.continuation ? 5000 : Math.max(error.retryAfterMs || 0, Math.min(error.githubRateLimited ? 900000 : 300000, baseDelay * 2 ** (retryFailures - 1)));
      // Keep only operational metadata, never tokens, file bodies or raw API errors.
      const lastError = { at: Date.now(), phase: state.phase, attempt: state.attempts, errorType: error.name, status: error.status, githubStatus: error.githubStatus, githubMethod: error.githubMethod, githubPath: error.githubPath, githubRequestId: error.githubRequestId, githubRateLimited: error.githubRateLimited, githubRateLimitRemaining: error.githubRateLimitRemaining, githubRateLimitReset: error.githubRateLimitReset, retryable, retryAfterMs: retryable ? delay : undefined };
      const message = error instanceof SubmissionError && error.status < 500 ? error.message : state.pullNumber ? `파일은 PR #${state.pullNumber}에 보관되어 있지만 자동 반영을 확인하지 못했습니다. 담당자에게 접수 번호를 알려주세요.` : '제출 처리에 실패했습니다. 접수 번호를 담당자에게 알려주세요.';
      await write(submission.id, { ...state, phase: retryable ? 'paused' : state.pullNumber ? 'merge_failed' : 'failed', retryFailures, lastError, resumeAfter: retryable ? Date.now() + delay : undefined, message: retryable ? '업로드한 파일은 유지됩니다. 저장된 부분부터 자동으로 이어서 처리합니다.' : message }).catch(() => {});
      if (!retryable) await gate.finish(submission).catch(() => {});
      console.error('Submission processing failed', { id: submission.id, ...lastError, completedFiles: state.completedFiles, totalFiles: state.totalFiles });
    } finally { await unlock(lock); }
  };
}
export const processSubmission = createProcessor();
