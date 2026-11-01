import { createHmac, timingSafeEqual } from 'node:crypto';
import { findTeam } from './teams.mjs';
import { validateFiles, folderLimits } from '../submit/files.mjs';

export const limits = Object.freeze({ zipBytes: 200 * 1024 ** 2, ...folderLimits });
export class SubmissionError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
export function configuration(env = process.env) {
  const missing = ['BLOB_READ_WRITE_TOKEN', 'SUBMISSION_SIGNING_SECRET', 'SUBMISSION_GITHUB_TOKEN'].filter(key => !env[key]);
  if (env.SUBMISSION_SIGNING_SECRET && env.SUBMISSION_SIGNING_SECRET.length < 32) missing.push('SUBMISSION_SIGNING_SECRET_LENGTH');
  const repository = env.SUBMISSION_GITHUB_REPOSITORY || 'cjdmd2026/cjdmdwebsite';
  const sitePath = env.SUBMISSION_SITE_PATH ?? 'cjdmd2026';
  const branch = env.SUBMISSION_BASE_BRANCH || 'main';
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) missing.push('SUBMISSION_GITHUB_REPOSITORY');
  if (sitePath && (!/^[\w-]+(?:\/[\w-]+)*$/.test(sitePath) || sitePath.startsWith('.'))) missing.push('SUBMISSION_SITE_PATH');
  if (!/^[\w/-]+$/.test(branch)) missing.push('SUBMISSION_BASE_BRANCH');
  return { enabled: env.SUBMISSIONS_ENABLED === 'true' && !missing.length, missing, repository, sitePath, branch };
}
export function validateSubmission(value) {
  const team = findTeam(value?.teamId);
  if (!team) throw new SubmissionError('목록에서 제출할 팀을 선택해주세요.');
  if (typeof value.fileName !== 'string' || !/\.zip$/i.test(value.fileName) || value.fileName.length > 200) throw new SubmissionError('ZIP 파일을 선택해주세요.');
  if (!Number.isSafeInteger(value.fileSize) || value.fileSize < 22 || value.fileSize > limits.zipBytes) throw new SubmissionError('ZIP 파일은 최대 200 MiB까지 제출할 수 있습니다.');
  return { teamId: team.id, slug: team.slug, fileName: value.fileName.replace(/[\r\n\x00-\x1f]/g, ''), fileSize: value.fileSize };
}
export function validateFolderSubmission(value) {
  const team = findTeam(value?.teamId);
  if (!team) throw new SubmissionError('목록에서 제출할 팀을 선택해주세요.');
  try {
    const checked = validateFiles(value.files);
    return { mode: 'folder', teamId: team.id, slug: team.slug, files: checked.files, totalBytes: checked.bytes, totalFiles: checked.files.length };
  } catch (error) { throw new SubmissionError(error.message); }
}
export function signTicket(payload, secret = process.env.SUBMISSION_SIGNING_SECRET) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${createHmac('sha256', secret).update(data).digest('base64url')}`;
}
export function readTicket(ticket, secret = process.env.SUBMISSION_SIGNING_SECRET, now = Date.now()) {
  try {
    if (typeof ticket !== 'string' || ticket.length > 2500) throw new Error();
    const parts = ticket.split('.');
    if (parts.length !== 2) throw new Error();
    const [data, signature] = parts;
    const expected = createHmac('sha256', secret).update(data).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new Error();
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (!/^[a-f0-9-]{36}$/.test(payload.id) || !findTeam(payload.teamId) || !Number.isFinite(payload.expires) || payload.expires < now) throw new Error();
    const team = findTeam(payload.teamId);
    const pathname = payload.mode === 'folder' ? `submissions/${payload.id}/files/` : `submissions/${payload.id}/site.zip`;
    if (payload.pathname !== pathname || payload.slug !== team.slug) throw new Error();
    return payload;
  } catch { throw new SubmissionError('제출 확인 정보가 만료되었거나 올바르지 않습니다. 다시 제출해주세요.', 401); }
}
export function assertOrigin(request, env = process.env) {
  const origin = env.SUBMISSION_ORIGIN || 'https://dmd2026.com';
  const allowed = new Set([origin]);
  // The production domain currently redirects the apex to www.
  if (origin === 'https://dmd2026.com' || origin === 'https://www.dmd2026.com') {
    allowed.add('https://dmd2026.com');
    allowed.add('https://www.dmd2026.com');
  }
  if (env.VERCEL_URL) allowed.add(`https://${env.VERCEL_URL}`);
  if (env.VERCEL_BRANCH_URL) allowed.add(`https://${env.VERCEL_BRANCH_URL}`);
  if (!env.VERCEL && env.NODE_ENV !== 'production') { allowed.add('http://localhost:4173'); allowed.add('http://127.0.0.1:4173'); }
  if (!allowed.has(request.headers.get('origin'))) throw new SubmissionError('제출 페이지에서 다시 시도해주세요.', 403);
}
export function targetPath(teamId, sitePath) {
  const team = findTeam(teamId);
  if (!team) throw new SubmissionError('등록되지 않은 팀입니다.');
  return [sitePath, team.slug].filter(Boolean).join('/');
}
