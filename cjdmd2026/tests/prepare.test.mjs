import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createPreparation } from '../server/prepare.mjs';
import { readTicket } from '../server/policy.mjs';

const secret = 'test-only-preparation-signing-secret';
const fields = { mode: 'folder', teamId: 'ilkko', slug: 'ilkko', files: [{ path: 'index.html', size: 2, sha256: 'a'.repeat(64) }], totalBytes: 2, totalFiles: 1, deletions: [], baseTreeSha: null };
function fixture() {
  const states = new Map(), locks = new Set(), claims = new Set();
  let failWrite = '', validations = 0, time = Date.now();
  const prepare = createPreparation({ secret: () => secret, now: () => time,
    read: async id => structuredClone(states.get(id)),
    write: async (id, state) => {
      const failure = failWrite; failWrite = '';
      if (failure === 'before') throw Object.assign(new Error('storage unavailable'), { status: 503 });
      states.set(id, structuredClone(state));
      if (failure === 'after') throw Object.assign(new Error('response lost'), { status: 503 });
    },
    lock: async id => { if (locks.has(id)) return null; locks.add(id); return { id }; },
    unlock: async held => locks.delete(held.id),
    gate: { claim: async submission => claims.add(submission.id), touch: async submission => assert.ok(claims.has(submission.id)) },
  });
  const validate = async () => { validations++; return {}; };
  return { prepare, states, claims, locks, run: (key, value = fields) => prepare(value, key, validate), fail: value => { failWrite = value; }, advance: ms => { time += ms; }, get validations() { return validations; } };
}

test('a lost prepare response reuses the same receipt, ticket, manifest and expiry', async () => {
  const f = fixture(), key = randomUUID(), first = await f.run(key);
  const state = f.states.get(first.id); state.phase = 'saving'; state.checkpoint = ['saved'];
  f.advance(60000);
  const again = await f.run(key);
  assert.equal(again.id, first.id); assert.equal(again.ticket, first.ticket); assert.equal(again.expires, first.expires);
  assert.equal(again.resumed, true); assert.equal(first.resumed, false);
  assert.equal(f.states.size, 1); assert.equal(f.claims.size, 1); assert.equal(f.validations, 1);
  assert.deepEqual(f.states.get(first.id).checkpoint, ['saved']);
  assert.equal(readTicket(first.ticket, secret).id, first.id);
  assert.doesNotMatch(JSON.stringify(f.states.get(first.id)), new RegExp(key));
});

test('preparation storage failures before and after writing recover the same reserved receipt', async () => {
  for (const failure of ['before', 'after']) {
    const f = fixture(), key = randomUUID(); f.fail(failure);
    await assert.rejects(f.run(key), { status: 503 });
    assert.equal(f.locks.size, 0);
    const result = await f.run(key);
    assert.equal(f.claims.size, 1); assert.equal(f.states.size, 1);
    assert.equal(f.states.get(result.id).phase, 'awaiting_upload');
  }
});

test('simultaneous prepare attempts serialize and tell the losing caller to retry', async () => {
  const f = fixture(), key = randomUUID();
  const results = await Promise.allSettled([f.run(key), f.run(key)]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  const error = results.find(result => result.status === 'rejected').reason;
  assert.equal(error.status, 409); assert.equal(error.retryable, true);
  assert.equal(f.states.size, 1); assert.equal((await f.run(key)).resumed, true);
});

test('a retry key cannot replace its manifest or team, extend expiry, or restore an expired receipt', async () => {
  const f = fixture(), key = randomUUID(), first = await f.run(key);
  for (const changed of [{ ...fields, teamId: 'curo', slug: 'curo' }, { ...fields, deletions: ['old.js'] }]) {
    await assert.rejects(f.run(key, changed), { status: 409 });
  }
  assert.deepEqual(f.states.get(first.id).files, fields.files);
  f.advance(86400001);
  await assert.rejects(f.run(key), { status: 410 });
  assert.equal(f.claims.size, 1);
});

test('invalid keys cannot create storage or reservations', async () => {
  const f = fixture();
  for (const key of ['', 'public-receipt', '../other', null]) await assert.rejects(f.run(key), { status: 400 });
  assert.equal(f.claims.size, 0); assert.equal(f.states.size, 0); assert.equal(f.locks.size, 0);
});
