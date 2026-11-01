import { randomUUID } from 'node:crypto';
import { waitUntil, ipAddress } from '@vercel/functions';
import { handleUpload } from '@vercel/blob/client';
import { checkBotId } from 'botid/server';
import { configuration, validateFolderSubmission, signTicket, readTicket, assertOrigin, limits, SubmissionError } from '../server/policy.mjs';
import { readState, writeState, limitSubmissions, takeLock, releaseLock } from '../server/storage.mjs';
import { processSubmission } from '../server/process.mjs';
import { filePath, folderFile, assertUploading, uploadedFiles, confirmFile, finalizeFolder } from '../server/folder.mjs';
import { admission } from '../server/admission.mjs';
import { githubClient } from '../server/github.mjs';
import { siteSnapshot, checkSiteChanges } from '../server/site.mjs';
import { findTeam } from '../server/teams.mjs';

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
      if (bytes > 2 * 1024 ** 2) { await reader.cancel(); throw new SubmissionError('요청 크기가 너무 큽니다.', 413); }
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
    if (request.method === 'GET' && action === 'config') return json({ enabled: config.enabled, limits, admission: config.enabled ? await admission.availability() : { busy: false } });
    if (!config.enabled) return json({ error: '제출 기능을 준비하고 있습니다. 담당자의 안내 후 다시 방문해주세요.' }, 503);
    if (request.method === 'GET' && action === 'tree') {
      const team = findTeam(url.searchParams.get('teamId'));
      if (!team) throw new SubmissionError('목록에서 팀을 선택해주세요.');
      const snapshot = await siteSnapshot(team.id, githubClient(), config);
      return json({ treeSha: snapshot.treeSha, files: snapshot.files.map(({ path, size }) => ({ path, size })) });
    }
    if (request.method === 'GET' && action === 'status') {
      const submission = ticketFromRequest(request);
      const state = await readState(submission.id);
      if (!state) throw new SubmissionError('접수 기록을 찾을 수 없습니다.', 404);
      if (['submitted', 'merge_failed', 'failed', 'cancelled'].includes(state.phase)) await admission.finish(submission);
      if (!['submitted', 'merge_failed', 'failed', 'cancelled'].includes(state.phase)) {
        try { await admission.touch(submission); }
        catch (error) {
          if (error.status !== 410) throw error;
          return json({ id: submission.id, teamId: submission.teamId, phase: 'failed', message: error.message });
        }
      }
      const stale = ['validating', 'saving', 'merging'].includes(state.phase) && Date.now() - state.updatedAt > 350000;
      const folder = state.mode === 'folder' && state.phase === 'awaiting_upload' ? { files: state.files, deletions: state.deletions || [], baseTreeSha: state.baseTreeSha, uploaded: await uploadedFiles(submission.id) } : {};
      return json({ ...folder, mode: state.mode, id: submission.id, teamId: submission.teamId, slug: submission.slug, phase: stale ? 'paused' : state.phase, resumeAfter: state.resumeAfter, totalFiles: state.totalFiles, completedFiles: state.completedFiles, pullNumber: state.pullNumber, merged: state.merged === true, unchanged: state.unchanged === true, message: state.message });
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
          const slot = await admission.touch(submission, { issueToken: true });
          return { allowedContentTypes: ['application/octet-stream'], maximumSizeInBytes: Math.max(1, file.size), addRandomSuffix: false, allowOverwrite: false, validUntil: Math.min(submission.expires, slot.tokenExpiresAt) };
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
      checkSiteChanges(await siteSnapshot(fields.teamId, githubClient(), config), fields);
      const id = randomUUID();
      const submission = { mode: 'folder', teamId: fields.teamId, slug: fields.slug, id, pathname: `submissions/${id}/files/`, expires: Date.now() + 24 * 60 * 60 * 1000 };
      await admission.claim(submission, fields.totalBytes);
      try { await writeState(id, { ...fields, phase: 'awaiting_upload', createdAt: Date.now() }); }
      catch (error) { await admission.finish(submission).catch(() => {}); throw error; }
      return json({ ticket: signTicket(submission), pathname: submission.pathname, id, expires: submission.expires });
    }
    if (action === 'heartbeat') {
      const slot = await admission.touch(ticketFromRequest(request));
      return json({ expiresAt: slot.expiresAt });
    }
    if (action === 'cancel') {
      const submission = ticketFromRequest(request);
      const held = await takeLock(submission.id);
      if (!held) throw new SubmissionError('제출을 처리하고 있습니다. 잠시 후 다시 시도해주세요.', 409);
      try {
        const state = await readState(submission.id);
        if (state && !['awaiting_upload', 'failed', 'cancelled', 'submitted', 'merge_failed'].includes(state.phase)) throw new SubmissionError('최종 제출을 처리하고 있습니다. 처리 완료 후 새 제출을 시작해주세요.', 409);
        if (state?.phase === 'awaiting_upload') await writeState(submission.id, { ...state, phase: 'cancelled', message: '새 제출을 시작해 이전 접수를 취소했습니다.' });
        await admission.finish(submission);
      } finally { await releaseLock(held); }
      return json({ cancelled: true });
    }
    if (action === 'confirm-file') {
      const submission = ticketFromRequest(request);
      await admission.touch(submission);
      const state = await readState(submission.id);
      return json(await confirmFile(submission, state, body.index));
    }
    if (action === 'finalize') {
      const submission = ticketFromRequest(request);
      await admission.touch(submission);
      const state = await finalizeFolder(submission);
      if (['queued', 'paused'].includes(state.phase)) waitUntil(processSubmission(submission));
      return json({ accepted: true }, 202);
    }
    if (action === 'process') {
      const submission = ticketFromRequest(request);
      const state = await readState(submission.id);
      if (!state) throw new SubmissionError('접수 기록을 찾을 수 없습니다.', 404);
      if (state.mode === 'folder' && state.phase === 'awaiting_upload') throw new SubmissionError('모든 파일을 업로드한 뒤 제출 완료를 눌러주세요.', 409);
      await admission.touch(submission);
      // The server reads only the fixed, signed private Blob pathname. No client URL is fetched.
      waitUntil(processSubmission(submission));
      return json({ accepted: true }, 202);
    }
    return json({ error: '요청한 기능을 찾을 수 없습니다.' }, 404);
  } catch (error) {
    if (!(error instanceof SubmissionError)) console.error('Submission API failed', { action: new URL(request.url).searchParams.get('action'), errorType: error.constructor?.name || error.name, status: error.status });
    return json({ error: error instanceof SubmissionError ? error.message : '요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.' }, error.status || 500);
  }
}
export default { fetch: handleRequest };
