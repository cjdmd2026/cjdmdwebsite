import { readState } from './storage.mjs';
import { presignUpload } from './r2.mjs';
import { admission } from './admission.mjs';
import { assertUploading, folderFile, filePath } from './folder.mjs';
import { readTicket, SubmissionError } from './policy.mjs';

export function readUploadTicket(ticket, secret = process.env.SUBMISSION_SIGNING_SECRET, now = Date.now()) {
  const submission = readTicket(ticket, secret, now);
  if (submission.storage !== 'r2' || submission.mode !== 'folder') throw new SubmissionError('저장소가 변경되었습니다. 페이지를 새로고침하고 폴더를 다시 선택해 제출해주세요.', 410);
  return submission;
}
export async function issueUpload(submission, index, { read = readState, gate = admission, sign = presignUpload } = {}) {
  const state = await read(submission.id);
  assertUploading(state);
  if (state.teamId !== submission.teamId || state.slug !== submission.slug || state.storage !== 'r2') throw new SubmissionError('접수 정보가 일치하지 않습니다.', 403);
  const file = folderFile(state, index);
  const slot = await gate.touch(submission, { issueToken: true });
  return sign(filePath(submission.id, index), file.size, Math.min(submission.expires, slot.tokenExpiresAt));
}
