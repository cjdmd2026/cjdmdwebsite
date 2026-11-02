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
      state = { ...state, phase: state.pullNumber ? 'merging' : 'validating', attempts: (state.attempts || 0) + 1 };
      if (state.attempts > 8) throw new SubmissionError('처리가 지연되고 있습니다. 접수 번호를 담당자에게 알려주세요.');
      await write(submission.id, state);
      if (state.purpose === 'server') {
        const sourceConfig = sourceConfigFor();
        if (!sourceConfig.enabled || sourceConfig.repository.toLowerCase() !== state.sourceDestination?.repository?.toLowerCase()) throw new SubmissionError('서버 원본 저장소 설정이 변경되었습니다. 담당자에게 알려주세요.', 409);
        const github = client(sourceConfig.token, sourceConfig.repository, fetch, Date.now() + 210000);
        const archive = await prepareArchive(submission, state);
        state = { ...state, phase: 'saving' }; await write(submission.id, state);
        const saved = await saveSource(submission, state, archive, { github, onProgress: async (completedFiles, totalFiles, checkpoint) => {
          state = { ...state, completedFiles, totalFiles, checkpoint }; await write(submission.id, state); await gate.touch(submission);
        } });
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
        const pull = await submit(submission, archive, { github, config, checkpoint: state.checkpoint || [], onProgress: async (completedFiles, totalFiles, checkpoint) => {
          state = { ...state, completedFiles, totalFiles, checkpoint };
          await write(submission.id, state);
          await gate.touch(submission);
        } });
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
      const transient = (error.status >= 500 && (!error.githubStatus || error.githubStatus >= 500 || error.retryAfterMs)) || error.name === 'TimeoutError' || error.name === 'AbortError';
      const retryable = transient && state.attempts < 8;
      const message = error instanceof SubmissionError && error.status < 500 ? error.message : state.pullNumber ? `파일은 PR #${state.pullNumber}에 보관되어 있지만 자동 반영을 확인하지 못했습니다. 담당자에게 접수 번호를 알려주세요.` : '제출 처리에 실패했습니다. 접수 번호를 담당자에게 알려주세요.';
      await write(submission.id, { ...state, phase: retryable ? 'paused' : state.pullNumber ? 'merge_failed' : 'failed', resumeAfter: retryable ? Date.now() + (error.retryAfterMs || 5000) : undefined, message: retryable ? '이어서 처리할 준비를 하고 있습니다.' : message }).catch(() => {});
      if (!retryable) await gate.finish(submission).catch(() => {});
      console.error('Submission processing failed', { id: submission.id, errorType: error.name, status: error.status });
    } finally { await unlock(lock); }
  };
}
export const processSubmission = createProcessor();
