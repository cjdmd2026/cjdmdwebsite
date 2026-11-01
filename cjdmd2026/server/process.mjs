import { readSiteArchive } from './archive.mjs';
import { configuration, SubmissionError } from './policy.mjs';
import { submitToGithub, githubClient } from './github.mjs';
import { readState, writeState, takeLock, releaseLock, readArchive } from './storage.mjs';
import { folderArchive } from './folder.mjs';
import { admission } from './admission.mjs';

export async function processSubmission(submission) {
  const lock = await takeLock(submission.id);
  if (!lock) return;
  let state;
  try {
    state = await readState(submission.id);
    if (!state || ['submitted', 'failed', 'cancelled'].includes(state.phase) || state.resumeAfter > Date.now()) return;
    if (state.mode === 'folder' && (state.phase === 'awaiting_upload' || !state.finalizedAt)) return;
    await admission.touch(submission);
    state = { ...state, phase: 'validating', attempts: (state.attempts || 0) + 1 };
    if (state.attempts > 8) throw new SubmissionError('처리가 지연되고 있습니다. 접수 번호를 담당자에게 알려주세요.');
    await writeState(submission.id, state);
    const archive = state.mode === 'folder' ? await folderArchive(submission, state) : await readSiteArchive(await readArchive(submission));
    state = { ...state, phase: 'saving', totalFiles: archive.files.length, totalBytes: archive.bytes };
    await writeState(submission.id, state);
    const config = configuration();
    const github = githubClient(process.env.SUBMISSION_GITHUB_TOKEN, config.repository, fetch, Date.now() + 210000);
    const pull = await submitToGithub(submission, archive, { github, config, checkpoint: state.checkpoint || [], onProgress: async (completedFiles, totalFiles, checkpoint) => {
      state = { ...state, completedFiles, totalFiles, checkpoint };
      await writeState(submission.id, state);
      await admission.touch(submission);
    } });
    await writeState(submission.id, { ...state, phase: 'submitted', pullNumber: pull.number, pullUrl: pull.html_url, checkpoint: undefined, message: undefined });
    // Cleanup is retried by availability/status requests if storage is unavailable.
    await admission.finish(submission).catch(() => {});
  } catch (error) {
    if (!state) return;
    const transient = (error.status >= 500 && (!error.githubStatus || error.githubStatus >= 500 || error.retryAfterMs)) || error.name === 'TimeoutError' || error.name === 'AbortError';
    const retryable = transient && state.attempts < 8;
    await writeState(submission.id, { ...state, phase: retryable ? 'paused' : 'failed', resumeAfter: retryable ? Date.now() + (error.retryAfterMs || 5000) : undefined, message: retryable ? '이어서 처리할 준비를 하고 있습니다.' : error instanceof SubmissionError && error.status < 500 ? error.message : '제출 처리에 실패했습니다. 접수 번호를 담당자에게 알려주세요.' }).catch(() => {});
    if (!retryable) await admission.finish(submission).catch(() => {});
    console.error('Submission processing failed', { id: submission.id, errorType: error.name, status: error.status });
  } finally { await releaseLock(lock); }
}
