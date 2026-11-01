import test from 'node:test';
import assert from 'node:assert/strict';
import { createR2Storage, StorageConflictError, StorageUnavailableError, StorageNotFoundError } from '../server/r2.mjs';
import { configuration, signTicket } from '../server/policy.mjs';
import { readUploadTicket, issueUpload } from '../server/upload.mjs';

const config = { missing: [], bucket: 'dmd2026-submit', endpoint: 'https://00000000000000000000000000000000.r2.cloudflarestorage.com', credentials: { accessKeyId: 'TEST_ONLY_KEY', secretAccessKey: 'TEST_ONLY_SECRET' } };
const id = '62c12225-8afa-478b-8a57-1aad5a411ad5', pathname = `submissions/${id}/files/0`;
const secret = 'test-only-secret-more-than-32-characters';
const submission = { id, storage: 'r2', mode: 'folder', teamId: 'ilkko', slug: 'ilkko', pathname: `submissions/${id}/files/`, expires: Date.now() + 86400000 };
const state = { ...submission, phase: 'awaiting_upload', files: [{ path: 'index.html', size: 2 }] };
function fixture(respond) {
  const calls = [];
  const storage = createR2Storage({ config, client: { send: async command => { calls.push(command); return respond(command); } } });
  return { storage, calls };
}
test('configuration requires R2 credentials and never silently falls back to blocked Blob', () => {
  const env = { SUBMISSIONS_ENABLED: 'true', SUBMISSION_SIGNING_SECRET: secret, SUBMISSION_GITHUB_TOKEN: 'test', BLOB_READ_WRITE_TOKEN: 'old' };
  assert.equal(configuration(env).enabled, false);
  Object.assign(env, { R2_ACCOUNT_ID: '0'.repeat(32), R2_BUCKET_NAME: config.bucket, R2_ACCESS_KEY_ID: 'test', R2_SECRET_ACCESS_KEY: 'test' });
  assert.equal(configuration(env).enabled, true);
  assert.equal(configuration({ ...env, R2_ACCOUNT_ID: 'evil.test/path' }).enabled, false);
  assert.equal(configuration({ ...env, R2_BUCKET_NAME: '../other' }).enabled, false);
});
test('real SDK presigns an exact key, exact content length, create-only write and short expiry without leaking secret', async () => {
  const r2 = createR2Storage({ config }), now = Date.now();
  for (const size of [0, 2, 95 * 1024 ** 2]) {
    const result = await r2.presignUpload(pathname, size, now + 30000, now), url = new URL(result.url);
    assert.equal(url.pathname, '/' + config.bucket + '/' + pathname);
    assert.equal(url.searchParams.get('X-Amz-Expires'), '30');
    assert.equal(url.searchParams.get('X-Amz-SignedHeaders'), 'content-length;content-type;host;if-none-match');
    assert.equal(url.searchParams.get('x-amz-checksum-crc32'), null);
    assert.deepEqual(result.headers, { 'Content-Type': 'application/octet-stream', 'If-None-Match': '*' });
    assert.ok(!JSON.stringify(result).includes(config.credentials.secretAccessKey));
  }
  const two = await r2.presignUpload(pathname, 2, now + 600000, now), three = await r2.presignUpload(pathname, 3, now + 600000, now);
  assert.notEqual(new URL(two.url).searchParams.get('X-Amz-Signature'), new URL(three.url).searchParams.get('X-Amz-Signature'));
  await assert.rejects(r2.presignUpload('../elsewhere', 2, now + 30000, now));
  await assert.rejects(r2.presignUpload(pathname, 96 * 1024 ** 2, now + 30000, now));
  await assert.rejects(r2.presignUpload(pathname, 2, now, now));
});
test('R2 JSON creates and updates use atomic conditions and preserve quoted ETags', async () => {
  const { storage, calls } = fixture(async command => {
    if (command.input.IfMatch === '"stale"') throw { name: 'PreconditionFailed', $metadata: { httpStatusCode: 412 } };
    return { ETag: '"v1"' };
  });
  const lock = await storage.writeJson('submission-control/active.json', { phase: 'active' });
  assert.equal(calls[0].input.IfNoneMatch, '*'); assert.equal(lock.etag, '"v1"');
  await storage.writeJson(lock.pathname, { phase: 'idle' }, { ifMatch: lock.etag });
  assert.equal(calls[1].input.IfMatch, '"v1"'); assert.equal(calls[1].input.IfNoneMatch, undefined);
  await assert.rejects(storage.writeJson(lock.pathname, {}, { ifMatch: '"stale"' }), StorageConflictError);
  await storage.writeJson('state.json', {}, { allowOverwrite: true });
  assert.equal(calls.at(-1).input.IfNoneMatch, undefined);
});
test('only absent objects become null; denied, missing bucket and outage errors fail closed', async () => {
  let error = { name: 'NoSuchKey', $metadata: { httpStatusCode: 404 } };
  const { storage } = fixture(async () => { throw error; });
  assert.equal(await storage.get(pathname), null);
  await assert.rejects(storage.head(pathname), StorageNotFoundError);
  for (const name of ['NoSuchBucket', 'AccessDenied', 'SlowDown', 'InternalError']) {
    error = { name, $metadata: { httpStatusCode: name === 'NoSuchBucket' ? 404 : 403 } };
    await assert.rejects(storage.get(pathname), StorageUnavailableError);
  }
});
test('reads expose stream and metadata and listing follows server pagination', async () => {
  const { storage, calls } = fixture(async command => {
    if (command.constructor.name === 'GetObjectCommand') return { Body: { transformToWebStream: () => new Response('hi').body }, ETag: '"e"', ContentLength: 2 };
    if (command.constructor.name === 'HeadObjectCommand') return { ETag: '"e"', ContentLength: 2 };
    return { Contents: [{ Key: pathname, Size: 2 }], IsTruncated: true, NextContinuationToken: 'next' };
  });
  const found = await storage.get(pathname);
  assert.equal(await new Response(found.stream).text(), 'hi');
  assert.deepEqual(await storage.head(pathname), { size: 2, etag: '"e"' });
  assert.deepEqual(await storage.list({ prefix: 'submissions/', cursor: 'previous', limit: 2000 }), { blobs: [{ pathname, size: 2 }], hasMore: true, cursor: 'next' });
  assert.equal(calls.at(-1).input.MaxKeys, 1000); assert.equal(calls.at(-1).input.ContinuationToken, 'previous');
  const broken = fixture(async () => ({ IsTruncated: true }));
  await assert.rejects(broken.storage.list(), StorageUnavailableError);
});
test('cleanup batches deletes and stops on individual object failures', async () => {
  const { storage, calls } = fixture(async () => ({}));
  await storage.del(Array.from({ length: 2001 }, (_, i) => 'submissions/test/files/' + i));
  assert.deepEqual(calls.map(call => call.input.Delete.Objects.length), [1000, 1000, 1]);
  assert.deepEqual(calls[0].input.Delete.Objects[0], { Key: 'submissions/test/files/0' });
  const broken = fixture(async () => ({ Errors: [{ Code: 'AccessDenied', Key: pathname }] }));
  await assert.rejects(broken.storage.del(pathname), StorageUnavailableError);
});
test('legacy Blob receipts cannot access or cancel R2 submissions', () => {
  const { storage, ...legacy } = submission;
  assert.throws(() => readUploadTicket(signTicket(legacy, secret), secret), { status: 410 });
  assert.equal(readUploadTicket(signTicket(submission, secret), secret).storage, 'r2');
});
test('upload authorization fixes destination and size from stored manifest and requires live ownership', async () => {
  const calls = [], now = Date.now();
  const ports = { read: async () => state, gate: { touch: async (receipt, options) => { assert.equal(receipt.id, id); assert.equal(options.issueToken, true); return { tokenExpiresAt: now + 10000 }; } },
    sign: async (...args) => { calls.push(args); return { url: 'test' }; } };
  assert.deepEqual(await issueUpload(submission, 0, ports), { url: 'test' });
  assert.deepEqual(calls[0], [pathname, 2, now + 10000]);
  await assert.rejects(issueUpload(submission, -1, ports));
  await assert.rejects(issueUpload(submission, '0', ports));
  await assert.rejects(issueUpload(submission, 0, { ...ports, read: async () => ({ ...state, teamId: 'curo' }) }), { status: 403 });
  await assert.rejects(issueUpload(submission, 0, { ...ports, read: async () => ({ ...state, phase: 'queued' }) }), { status: 409 });
  await assert.rejects(issueUpload(submission, 0, { ...ports, gate: { touch: async () => { throw Object.assign(new Error('expired'), { status: 410 }); } } }), { status: 410 });
  assert.equal(calls.length, 1);
});
