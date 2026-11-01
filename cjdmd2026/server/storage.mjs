import { get, put, del, head, BlobPreconditionFailedError } from '@vercel/blob';
import { createHmac } from 'node:crypto';
import { SubmissionError } from './policy.mjs';

export async function readJson(pathname) {
  const result = await get(pathname, { access: 'private', useCache: false });
  if (!result) return null;
  return { data: await new Response(result.stream).json(), etag: result.blob.etag };
}
export function writeJson(pathname, data, options = {}) {
  return put(pathname, JSON.stringify(data), { access: 'private', addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 60, ...options });
}
export const readState = async id => (await readJson(`submissions/${id}/state.json`))?.data || null;
export const writeState = (id, state) => writeJson(`submissions/${id}/state.json`, { ...state, updatedAt: Date.now() }, { allowOverwrite: true });
export async function takeLock(id) {
  const pathname = `submissions/${id}/lock.json`;
  const lock = await readJson(pathname);
  if (lock && Date.now() - lock.data.at < 330000) return null;
  try { return await writeJson(pathname, { at: Date.now() }, lock ? { ifMatch: lock.etag } : {}); }
  catch (error) {
    if (error instanceof BlobPreconditionFailedError || /already exists/i.test(error.message)) return null;
    throw error;
  }
}
export async function releaseLock(lock) {
  if (lock) await del(lock.pathname, { ifMatch: lock.etag }).catch(() => {});
}
export async function limitSubmissions(ip) {
  const digest = createHmac('sha256', process.env.SUBMISSION_SIGNING_SECRET).update(ip).digest('hex').slice(0, 32);
  const pathname = `submission-limits/${Math.floor(Date.now() / 3600000)}/${digest}.json`;
  for (let i = 0; i < 4; i++) {
    const item = await readJson(pathname);
    if ((item?.data.count || 0) >= 100) throw new SubmissionError('한 시간 동안 제출할 수 있는 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.', 429);
    try { await writeJson(pathname, { count: (item?.data.count || 0) + 1 }, item ? { ifMatch: item.etag } : {}); return; }
    catch (error) { if (!(error instanceof BlobPreconditionFailedError) && !/already exists/i.test(error.message)) throw error; }
  }
  throw new SubmissionError('요청이 겹쳤습니다. 잠시 후 다시 시도해주세요.', 429);
}
export async function readArchive(submission) {
  const meta = await head(submission.pathname);
  if (meta.size !== submission.fileSize) throw new SubmissionError('업로드된 파일 크기가 일치하지 않습니다. 다시 제출해주세요.');
  const result = await get(submission.pathname, { access: 'private', useCache: false });
  if (!result) throw new SubmissionError('업로드된 파일을 찾을 수 없습니다. 다시 제출해주세요.');
  const chunks = [];
  let bytes = 0;
  for await (const chunk of result.stream) {
    bytes += chunk.length;
    if (bytes > submission.fileSize) throw new SubmissionError('업로드 파일의 크기가 올바르지 않습니다.');
    chunks.push(Buffer.from(chunk));
  }
  if (bytes !== submission.fileSize) throw new SubmissionError('파일 전송이 완료되지 않았습니다. 다시 시도해주세요.');
  return Buffer.concat(chunks);
}
export { del };
