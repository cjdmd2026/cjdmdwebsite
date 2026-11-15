import { createHash, createHmac, randomUUID } from 'node:crypto';
import { SubmissionError, signTicket } from './policy.mjs';
import { readState, writeState, takeLock, releaseLock } from './storage.mjs';
import { admission } from './admission.mjs';

// A private browser key identifies one immutable request, including when its
// successful response was lost. The public receipt ID cannot reveal that key.
export function createPreparation({ read = readState, write = writeState, lock = takeLock, unlock = releaseLock, gate = admission, secret = () => process.env.SUBMISSION_SIGNING_SECRET, now = Date.now } = {}) {
  return async function prepare(fields, requestKey = randomUUID(), validateNew = async () => ({})) {
    if (typeof requestKey !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestKey)) throw new SubmissionError('접수 요청 정보가 올바르지 않습니다.');
    const digest = createHmac('sha256', secret()).update(`prepare:${requestKey}`).digest('hex');
    const id = `${digest.slice(0, 8)}-${digest.slice(8, 12)}-${digest.slice(12, 16)}-${digest.slice(16, 20)}-${digest.slice(20, 32)}`;
    const requestHash = createHash('sha256').update(JSON.stringify(fields)).digest('hex');
    const held = await lock(id);
    if (!held) throw Object.assign(new SubmissionError('같은 접수 요청을 확인하고 있습니다.', 409), { retryable: true, retryAfterMs: 5000 });
    try {
      let state = await read(id);
      const resumed = Boolean(state);
      if (state && state.requestHash !== requestHash) throw new SubmissionError('접수 요청의 파일 목록이 변경되었습니다. 기존 접수를 확인해주세요.', 409);
      const createdAt = state?.createdAt ?? now();
      const submission = { storage: 'r2', mode: 'folder', ...(fields.purpose ? { purpose: fields.purpose } : {}), teamId: fields.teamId, slug: fields.slug, id, pathname: `submissions/${id}/files/`, expires: createdAt + 24 * 60 * 60 * 1000 };
      if (submission.expires <= now()) throw new SubmissionError('접수 요청의 유효기간이 지났습니다.', 410);
      if (!state) {
        const additions = await validateNew();
        await gate.claim(submission, fields.totalBytes);
        state = { ...fields, ...additions, requestHash, storage: 'r2', phase: 'awaiting_upload', createdAt };
        // Keep the reservation if this write/response fails; the same key can
        // recover it without resetting a receipt or claiming a second slot.
        await write(id, state);
      } else if (!['submitted', 'merge_failed', 'failed', 'cancelled'].includes(state.phase)) await gate.touch(submission);
      return { ticket: signTicket(submission, secret()), pathname: submission.pathname, id, expires: submission.expires, resumed };
    } finally { await unlock(held); }
  };
}
export const prepareSubmission = createPreparation();
