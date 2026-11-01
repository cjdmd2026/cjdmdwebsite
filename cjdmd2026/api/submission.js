import { randomUUID } from 'node:crypto';
import { waitUntil, ipAddress } from '@vercel/functions';
import { handleUpload } from '@vercel/blob/client';
import { checkBotId } from 'botid/server';
import { configuration, validateFolderSubmission, signTicket, readTicket, assertOrigin, limits, SubmissionError } from '../server/policy.mjs';
import { readState, writeState, limitSubmissions } from '../server/storage.mjs';
import { processSubmission } from '../server/process.mjs';
import { filePath, folderFile, assertUploading, uploadedFiles, confirmFile, finalizeFolder } from '../server/folder.mjs';

const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
async function smallJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError('요청 내용이 없습니다.');
  let bytes = 0;
  const chunks = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 512 * 1024) { await reader.cancel(); throw new SubmissionError('요청 크기가 너무 큽니다.', 413); }
      chunks.push(Buffer.from(value));
    }
    return JSON.parse(Buffer.concat(chunks).toString());
  } catch (error) { if (error instanceof SubmissionError) throw error; throw new SubmissionError('요청 내용을 읽을 수 없습니다.'); }
}
function ticketFromRequest(request) {
  return readTicket(request.headers.get('authorization')?.replace(/^Bearer /, ''));
}
export async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'config';
    const config = configuration();
    if (request.method === 'GET' && action === 'config') return json({ enabled: config.enabled, limits });
    if (!config.enabled) return json({ error: '제출 기능을 준비하고 있습니다. 담당자의 안내 후 다시 방문해주세요.' }, 503);
    if (request.method === 'GET' && action === 'status') {
      const submission = ticketFromRequest(request);
      const state = await readState(submission.id);
      if (!state) throw new SubmissionError('접수 기록을 찾을 수 없습니다.', 404);
      const stale = ['validating', 'saving'].includes(state.phase) && Date.now() - state.updatedAt > 350000;
      const folder = state.mode === 'folder' && state.phase === 'awaiting_upload' ? { files: state.files, uploaded: await uploadedFiles(submission.id) } : {};
      return json({ ...folder, mode: state.mode, id: submission.id, teamId: submission.teamId, slug: submission.slug, phase: stale ? 'paused' : state.phase, resumeAfter: state.resumeAfter, totalFiles: state.totalFiles, completedFiles: state.completedFiles, pullNumber: state.pullNumber, message: state.message });
    }
    if (request.method !== 'POST') return json({ error: '지원하지 않는 요청입니다.' }, 405);
    const body = await smallJson(request);
    if (action === 'upload') {
      // Vercel's callback has no browser Origin. Its signature is verified by the SDK.
      if (body.type !== 'blob.upload-completed') assertOrigin(request);
      const result = await handleUpload({ body, request,
        onBeforeGenerateToken: async (pathname, clientPayload) => {
          let payload;
          try { payload = JSON.parse(clientPayload); } catch { throw new SubmissionError('올바르지 않은 업로드 요청입니다.', 403); }
          const submission = readTicket(payload?.ticket);
          const state = await readState(submission.id);
          assertUploading(state);
          const file = folderFile(state, payload.index);
          if (pathname !== filePath(submission.id, payload.index)) throw new SubmissionError('올바르지 않은 업로드 위치입니다.', 403);
          return { allowedContentTypes: ['application/octet-stream'], maximumSizeInBytes: Math.max(1, file.size), addRandomSuffix: false, allowOverwrite: false, validUntil: Math.min(submission.expires, Date.now() + 60 * 60 * 1000) };
        },
        // Uploaded files are verified separately. A callback never submits a folder.
        onUploadCompleted: async () => {},
      });
      return json(result);
    }
    assertOrigin(request);
    if (action === 'prepare') {
      const verification = await checkBotId({ advancedOptions: { checkLevel: 'basic', headers: Object.fromEntries(request.headers) }, developmentOptions: { isDevelopment: !process.env.VERCEL && process.env.NODE_ENV !== 'production' } });
      if (verification.isBot) throw new SubmissionError('브라우저 확인에 실패했습니다. 페이지를 새로고침한 후 다시 시도해주세요.', 403);
      const fields = validateFolderSubmission(body);
      await limitSubmissions(ipAddress(request) || 'local');
      const id = randomUUID();
      const submission = { mode: 'folder', teamId: fields.teamId, slug: fields.slug, id, pathname: `submissions/${id}/files/`, expires: Date.now() + 24 * 60 * 60 * 1000 };
      await writeState(id, { ...fields, phase: 'awaiting_upload', createdAt: Date.now() });
      return json({ ticket: signTicket(submission), pathname: submission.pathname, id, expires: submission.expires });
    }
    if (action === 'confirm-file') {
      const submission = ticketFromRequest(request);
      const state = await readState(submission.id);
      return json(await confirmFile(submission, state, body.index));
    }
    if (action === 'finalize') {
      const submission = ticketFromRequest(request);
      const state = await finalizeFolder(submission);
      if (['queued', 'paused'].includes(state.phase)) waitUntil(processSubmission(submission));
      return json({ accepted: true }, 202);
    }
    if (action === 'process') {
      const submission = ticketFromRequest(request);
      const state = await readState(submission.id);
      if (!state) throw new SubmissionError('접수 기록을 찾을 수 없습니다.', 404);
      if (state.mode === 'folder' && state.phase === 'awaiting_upload') throw new SubmissionError('모든 파일을 업로드한 뒤 제출 완료를 눌러주세요.', 409);
      // The server reads only the fixed, signed private Blob pathname. No client URL is fetched.
      waitUntil(processSubmission(submission));
      return json({ accepted: true }, 202);
    }
    return json({ error: '요청한 기능을 찾을 수 없습니다.' }, 404);
  } catch (error) {
    if (!(error instanceof SubmissionError)) console.error('Submission API failed', { errorType: error.name });
    return json({ error: error instanceof SubmissionError ? error.message : '요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.' }, error.status || 500);
  }
}
export default { fetch: handleRequest };
