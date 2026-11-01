import { list } from '@vercel/blob';
import { readJson, writeJson, readState, writeState, del } from './storage.mjs';
import { SubmissionError } from './policy.mjs';

const slotPath = 'submission-control/active.json';
export const idleTimeoutMs = 30 * 60 * 1000;
const tokenLifetimeMs = 10 * 60 * 1000;
const conflict = error => error.name === 'BlobPreconditionFailedError' || /already exists/i.test(error.message);
const expiredMessage = '30분 동안 진행이 없어 임시 파일을 정리했습니다. 폴더를 선택해 새로 제출해주세요.';

// A single durable, conditional-write lease works across all Vercel instances.
// The browser's disabled button is only a hint; every write checks ownership.
export function createAdmission({ read = readJson, write = writeJson, remove = del, listBlobs = list, readSubmission = readState, writeSubmission = writeState, now = Date.now } = {}) {
  const replace = (previous, data) => write(slotPath, data, previous ? { ifMatch: previous.etag } : {});
  const busyError = () => new SubmissionError('다른 팀이 제출 중이거나 임시 파일을 정리하고 있습니다. 잠시 후 다시 시도해주세요.', 423);

  async function sweep() {
    const previous = await read(slotPath);
    if (!previous || previous.data.phase === 'idle' || previous.data.expiresAt > now()) return previous;
    const slot = previous.data;
    if (!/^[a-f0-9-]{36}$/.test(slot.id)) throw new Error('Invalid admission record');
    let cleaning;
    try { cleaning = await replace(previous, { ...slot, phase: 'cleaning', expiresAt: now() + 5 * 60 * 1000 }); }
    catch (error) { if (conflict(error)) return read(slotPath); throw error; }
    // Close the old receipt before deleting anything. A crashed cleanup is retried.
    const state = await readSubmission(slot.id);
    if (state && !['submitted', 'merge_failed', 'failed', 'cancelled'].includes(state.phase)) {
      await writeSubmission(slot.id, { ...state, phase: 'failed', message: expiredMessage });
    }
    // Only temporary data belonging to this receipt is eligible for removal.
    for (const kind of ['files/', 'verified/']) {
      let cursor;
      do {
        const result = await listBlobs({ prefix: `submissions/${slot.id}/${kind}`, limit: 1000, cursor });
        if (result.blobs.length) await remove(result.blobs.map(blob => blob.pathname));
        cursor = result.hasMore ? result.cursor : undefined;
      } while (cursor);
    }
    const data = { phase: 'idle' };
    try { const saved = await replace({ etag: cleaning.etag }, data); return { data, etag: saved.etag }; }
    catch (error) { if (conflict(error)) return read(slotPath); throw error; }
  }

  async function availability() {
    const slot = (await sweep())?.data;
    return slot && slot.phase !== 'idle'
      ? { busy: true, teamId: slot.teamId, cleaning: slot.phase !== 'active', expiresAt: slot.expiresAt }
      : { busy: false };
  }

  async function claim(submission, reservedBytes = 0) {
    const previous = await sweep();
    if (previous && previous.data.phase !== 'idle') throw busyError();
    const data = { id: submission.id, teamId: submission.teamId, phase: 'active', expiresAt: now() + idleTimeoutMs, tokenExpiresAt: 0 };
    try { await replace(previous, data); }
    catch (error) { if (conflict(error)) throw busyError(); throw error; }
    try {
      // Include older uploads and any other blobs; never delete unrelated data.
      let cursor, usedBytes = 0;
      do {
        const page = await listBlobs({ limit: 1000, cursor });
        usedBytes += page.blobs.reduce((sum, blob) => sum + blob.size, 0);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);
      if (usedBytes + reservedBytes > 900 * 1024 ** 2) throw new SubmissionError('임시 저장공간이 부족합니다. 담당자에게 이전 업로드 정리를 요청해주세요.', 503);
      return data;
    } catch (error) { await finish(submission).catch(() => {}); throw error; }
  }

  async function touch(submission, { issueToken = false } = {}) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const previous = await read(slotPath), slot = previous?.data;
      if (!slot || slot.id !== submission.id || slot.teamId !== submission.teamId || slot.phase !== 'active' || slot.expiresAt <= now()) {
        throw new SubmissionError('이 접수의 업로드 시간이 종료되었습니다. 상태를 확인한 뒤 새 제출을 시작해주세요.', 410);
      }
      // Renew at most once per five minutes, instead of writing on every file.
      const renew = slot.expiresAt - now() < idleTimeoutMs;
      const token = issueToken && slot.tokenExpiresAt - now() < 5 * 60 * 1000;
      if (!renew && !token) return slot;
      const data = { ...slot, expiresAt: now() + idleTimeoutMs + 5 * 60 * 1000, tokenExpiresAt: token ? now() + tokenLifetimeMs : slot.tokenExpiresAt };
      try { await replace(previous, data); return data; }
      catch (error) { if (!conflict(error)) throw error; }
    }
    throw busyError();
  }

  async function finish(submission) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const previous = await read(slotPath), slot = previous?.data;
      // A delayed worker must never release another receipt's slot.
      if (!slot || slot.id !== submission.id || slot.phase !== 'active') return;
      // Blob client tokens cannot be revoked. Keep the slot until issued tokens
      // expire, plus a short drain period, before cleanup and the next admission.
      const data = { ...slot, phase: 'draining', expiresAt: slot.tokenExpiresAt ? Math.max(now(), slot.tokenExpiresAt + 2 * 60 * 1000) : now() };
      try { await replace(previous, data); await sweep(); return; }
      catch (error) { if (!conflict(error)) throw error; }
    }
    throw busyError();
  }

  return { availability, claim, touch, finish };
}

export const admission = createAdmission();
