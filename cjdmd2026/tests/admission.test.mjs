import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createAdmission, idleTimeoutMs } from '../server/admission.mjs';

const receipt = teamId => ({ id: randomUUID(), teamId });
function fixture() {
  let time = 100000, version = 0, failRemoval = false;
  const records = new Map(), states = new Map(), files = new Map(), removed = [];
  const ports = {
    now: () => time,
    read: async key => structuredClone(records.get(key) || null),
    write: async (key, data, options = {}) => {
      const existing = records.get(key);
      if (options.ifMatch ? existing?.etag !== options.ifMatch : Boolean(existing)) {
        const error = new Error('already exists'); error.name = 'BlobPreconditionFailedError'; throw error;
      }
      const etag = String(++version); records.set(key, { data: structuredClone(data), etag }); return { pathname: key, etag };
    },
    listBlobs: async ({ prefix = '' }) => ({ blobs: [...files].filter(([path]) => path.startsWith(prefix)).map(([pathname, size]) => ({ pathname, size })), hasMore: false }),
    remove: async paths => { if (failRemoval) throw new Error('storage unavailable'); for (const path of paths) { files.delete(path); removed.push(path); } },
    readSubmission: async id => structuredClone(states.get(id)),
    writeSubmission: async (id, state) => states.set(id, structuredClone(state)),
  };
  return { gate: createAdmission(ports), otherInstance: () => createAdmission(ports), records, states, files, removed, advance: ms => { time += ms; }, failRemoval: value => { failRemoval = value; } };
}

test('concurrent teams on separate server instances receive exactly one admission', async () => {
  const f = fixture(), a = receipt('ilkko'), b = receipt('curo');
  const results = await Promise.allSettled([f.gate.claim(a), f.otherInstance().claim(b)]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(results.find(r => r.status === 'rejected').reason.status, 423);
  const winner = results[0].status === 'fulfilled' ? a : b;
  assert.equal((await f.gate.availability()).teamId, winner.teamId);
  await assert.rejects(f.gate.claim(receipt(winner.teamId)), { status: 423 });
});

test('ownership is required for tokens and activity extends only a live lease', async () => {
  const f = fixture(), a = receipt('ilkko'); await f.gate.claim(a);
  await assert.rejects(f.gate.touch(receipt('curo'), { issueToken: true }), { status: 410 });
  f.advance(6 * 60 * 1000);
  const active = await f.gate.touch(a, { issueToken: true });
  assert.ok(active.tokenExpiresAt > 0);
  f.advance(25 * 60 * 1000);
  assert.equal((await f.gate.availability()).busy, true);
  f.advance(11 * 60 * 1000);
  await assert.rejects(f.gate.touch(a), { status: 410 });
  assert.equal((await f.gate.availability()).busy, false);
});

test('expired uploads are removed before the next team enters; old workers cannot release the new slot', async () => {
  const f = fixture(), a = receipt('ilkko'), b = receipt('curo');
  await f.gate.claim(a); f.states.set(a.id, { phase: 'awaiting_upload' });
  f.files.set(`submissions/${a.id}/files/0`, 200); f.files.set(`submissions/${a.id}/verified/0.json`, 20);
  f.files.set('unrelated/keep.txt', 10);
  f.advance(idleTimeoutMs + 1); await f.gate.claim(b);
  assert.equal(f.states.get(a.id).phase, 'failed');
  assert.deepEqual([...f.files.keys()], ['unrelated/keep.txt']);
  await f.gate.finish(a);
  assert.equal((await f.gate.availability()).teamId, b.teamId);
  await assert.rejects(f.gate.touch(a), { status: 410 });
});

test('finished uploads retain the slot until issued upload tokens expire, then preserve the receipt', async () => {
  const f = fixture(), a = receipt('ilkko'); await f.gate.claim(a);
  await f.gate.touch(a, { issueToken: true });
  f.states.set(a.id, { phase: 'submitted', pullNumber: 7 });
  f.files.set(`submissions/${a.id}/files/0`, 200);
  await f.gate.finish(a);
  assert.equal((await f.gate.availability()).cleaning, true);
  await assert.rejects(f.gate.claim(receipt('curo')), { status: 423 });
  assert.equal(f.removed.length, 0);
  f.advance(12 * 60 * 1000 + 1);
  assert.equal((await f.gate.availability()).busy, false);
  assert.equal(f.files.size, 0); assert.equal(f.states.get(a.id).pullNumber, 7);
});

test('cleanup failure keeps admission closed and retries rather than leaking files', async () => {
  const f = fixture(), a = receipt('ilkko'); await f.gate.claim(a);
  f.files.set(`submissions/${a.id}/files/0`, 200); f.advance(idleTimeoutMs + 1); f.failRemoval(true);
  await assert.rejects(f.gate.availability(), /storage unavailable/);
  await assert.rejects(f.gate.claim(receipt('curo')), { status: 423 });
  f.failRemoval(false); f.advance(5 * 60 * 1000 + 1);
  assert.equal((await f.gate.availability()).busy, false); assert.equal(f.files.size, 0);
});

test('storage already occupied by older or unrelated uploads prevents a reservation that would exceed capacity', async () => {
  const f = fixture(); f.files.set('older-upload/file', 500 * 1024 ** 2);
  await assert.rejects(f.gate.claim(receipt('ilkko'), 500 * 1024 ** 2), { status: 503 });
  assert.equal((await f.gate.availability()).busy, false);
  assert.equal(f.files.size, 1);
});
