import { createHash } from 'node:crypto';
import { get, head, list } from '@vercel/blob';
import { readJson, writeJson, readState, writeState, takeLock, releaseLock, del } from './storage.mjs';
import { SubmissionError } from './policy.mjs';

export const filePath = (id, index) => `submissions/${id}/files/${index}`;
const markerPath = (id, index) => `submissions/${id}/verified/${index}.json`;
export function folderFile(state, index) {
  if (state?.mode !== 'folder' || !Number.isSafeInteger(index) || index < 0 || index >= state.files.length) throw new SubmissionError('올바르지 않은 파일 요청입니다.', 400);
  return state.files[index];
}
export function assertUploading(state) {
  if (state?.mode !== 'folder' || state.phase !== 'awaiting_upload') throw new SubmissionError('파일을 추가할 수 없는 접수입니다. 접수 상태를 확인해주세요.', 409);
}
export async function uploadedFiles(id) {
  const prefix = `submissions/${id}/verified/`;
  const indices = [];
  let cursor;
  do {
    const result = await list({ prefix, limit: 1000, cursor });
    for (const blob of result.blobs) {
      const match = /^(\d+)\.json$/.exec(blob.pathname.slice(prefix.length));
      if (match) indices.push(Number(match[1]));
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);
  return indices.sort((a, b) => a - b);
}
export async function readVerifiedContent(pathname, file, { getBlob = get, headBlob = head } = {}) {
  const meta = await headBlob(pathname);
  if (meta.size !== file.size) throw new SubmissionError('업로드된 파일 크기가 일치하지 않습니다.', 422);
  const result = await getBlob(pathname, { access: 'private', useCache: false });
  if (!result) throw new SubmissionError('업로드된 파일을 찾을 수 없습니다.', 404);
  const chunks = [];
  const hash = createHash('sha256');
  let size = 0;
  for await (const chunk of result.stream) {
    size += chunk.length;
    if (size > file.size) throw new SubmissionError('파일 크기가 올바르지 않습니다.', 422);
    hash.update(chunk);
    chunks.push(Buffer.from(chunk));
  }
  if (size !== file.size || hash.digest('hex') !== file.sha256) throw new SubmissionError('파일 전송 내용이 일치하지 않습니다. 이 파일을 다시 업로드해주세요.', 422);
  return Buffer.concat(chunks);
}
export async function confirmFile(submission, state, index, { read = readJson, write = writeJson, readContent = readVerifiedContent, remove = del } = {}) {
  assertUploading(state);
  const file = folderFile(state, index);
  if (await read(markerPath(submission.id, index))) return { uploaded: true };
  const pathname = filePath(submission.id, index);
  let content;
  try { content = await readContent(pathname, file); }
  catch (error) {
    if (error.name === 'BlobNotFoundError' || error.status === 404) return { uploaded: false };
    if (error.status === 422) { await remove(pathname); return { uploaded: false, message: error.message }; }
    throw error;
  }
  const gitSha = createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
  try { await write(markerPath(submission.id, index), { sha256: file.sha256, gitSha, size: file.size }); }
  catch (error) { if (!await read(markerPath(submission.id, index))) throw error; }
  return { uploaded: true };
}
// Only an explicit finalization can move a folder out of awaiting_upload.
export async function finalizeFolder(submission, { read = readState, write = writeState, uploaded = uploadedFiles, lock = takeLock, unlock = releaseLock } = {}) {
  const held = await lock(submission.id);
  if (!held) throw new SubmissionError('다른 요청을 처리하고 있습니다. 잠시 후 상태를 확인해주세요.', 409);
  try {
    const state = await read(submission.id);
    if (state?.mode !== 'folder') throw new SubmissionError('접수 기록을 찾을 수 없습니다.', 404);
    if (state.phase !== 'awaiting_upload') return state;
    const complete = new Set(await uploaded(submission.id));
    if (state.files.some((_, i) => !complete.has(i))) throw new SubmissionError('아직 업로드되지 않은 파일이 있습니다. 업로드를 마친 뒤 제출 완료를 눌러주세요.', 409);
    const next = { ...state, phase: 'queued', finalizedAt: Date.now() };
    await write(submission.id, next);
    return next;
  } finally { await unlock(held); }
}
export async function folderArchive(submission, state) {
  const files = new Array(state.files.length);
  async function prepare(index) {
    const file = state.files[index];
    const verified = (await readJson(markerPath(submission.id, index)))?.data;
    if (!verified || verified.sha256 !== file.sha256 || verified.size !== file.size || !/^[a-f0-9]{40}$/.test(verified.gitSha)) throw new SubmissionError('파일 검증 기록이 없습니다. 담당자에게 접수 번호를 알려주세요.');
    files[index] = { path: file.path, gitSha: verified.gitSha, load: () => readVerifiedContent(filePath(submission.id, index), file) };
  }
  for (let i = 0; i < files.length; i += 8) await Promise.all(Array.from({ length: Math.min(8, files.length - i) }, (_, offset) => prepare(i + offset)));
  return { files, bytes: state.totalBytes };
}
