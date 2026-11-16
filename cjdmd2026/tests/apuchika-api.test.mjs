import test from 'node:test';
import assert from 'node:assert/strict';
import { handleApuchikaRequest, MAX_BYTES, TTL } from '../server/apuchika-api.mjs';
import { createApuchikaBucket } from '../server/apuchika-storage.mjs';

const origin = 'https://dmd2026.com';
const now = 1800000000000;
class Bucket {
  data = new Map(); limits = [];
  async put(key, bytes, options = {}) { this.data.set(key, { bytes, customMetadata: options.customMetadata }); }
  async get(key) { const item = this.data.get(key); return item ? { ...item, body: item.bytes, size: item.bytes.length } : null; }
  async head(key) { return this.get(key); }
  async delete(keys) { for (const key of Array.isArray(keys) ? keys : [keys]) this.data.delete(key); }
  async list({ prefix, limit }) { return { objects: [...this.data.keys()].filter(key => key.startsWith(prefix)).sort().slice(0, limit).map(key => ({ key })) }; }
  async limit(...args) { this.limits.push(args); }
}
function png(width = 2048, height = 1129) {
  const bytes = Buffer.alloc(33);
  bytes.set([137, 80, 78, 71, 13, 10, 26, 10]);
  bytes.writeUInt32BE(13, 8); bytes.write('IHDR', 12);
  bytes.writeUInt32BE(width, 16); bytes.writeUInt32BE(height, 20);
  return bytes;
}
function request(path = '/apuchika/api/badges', method = 'POST', body = png(), extra = {}) {
  return new Request(origin + path, { method, headers: { origin, 'content-type': 'image/png', ...extra }, ...(['GET', 'DELETE'].includes(method) ? {} : { body, ...(body instanceof ReadableStream ? { duplex: 'half' } : {}) }) });
}
const call = (req, bucket, time = now) => handleApuchikaRequest(req, { bucket, now: time, ip: 'test-client' });

test('badge QR works under /apuchika; image bytes survive; only its creator can revoke', async () => {
  const bucket = new Bucket();
  const response = await call(request(), bucket);
  assert.equal(response.status, 201);
  const result = await response.json();
  assert.match(result.id, /^\d{13}-[a-f0-9]{48}$/);
  assert.equal(new URL(result.url).pathname, '/apuchika/pages/badge-download.html');
  assert.equal(new URL(result.url).searchParams.get('id'), result.id);
  assert.equal(result.expiresAt, now + TTL);
  assert.match(result.qr, /^<svg/);
  assert.ok(!result.url.includes(result.deleteToken));
  assert.ok(!JSON.stringify([...bucket.data.values()]).includes(result.deleteToken));
  const path = '/apuchika/api/badges/' + result.id;
  const image = await call(request(path + '?download=1', 'GET'), bucket);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.match(image.headers.get('content-disposition'), /^attachment/);
  assert.match(image.headers.get('cache-control'), /no-store/);
  assert.deepEqual(Buffer.from(await image.arrayBuffer()), png());
  assert.equal((await call(request(path, 'DELETE'), bucket)).status, 403);
  assert.equal((await call(request(path, 'DELETE', null, { authorization: 'Bearer ' + 'a'.repeat(48) }), bucket)).status, 403);
  assert.equal((await call(request(path, 'DELETE', null, { authorization: 'Bearer ' + result.deleteToken }), bucket)).status, 200);
  assert.equal((await call(request(path, 'GET'), bucket)).status, 404);
});

test('expiry and bounded cleanup remove expired photos without touching inquiries', async () => {
  const bucket = new Bucket();
  const expired = await (await call(request(), bucket, now - TTL)).json();
  bucket.data.set('inquiries/keep.json', { bytes: 'test' });
  await call(request(), bucket);
  assert.ok(!bucket.data.has('badges/' + expired.id));
  assert.ok(bucket.data.has('inquiries/keep.json'));
  const active = await (await call(request(), bucket)).json();
  assert.equal((await call(request('/apuchika/api/badges/' + active.id, 'GET'), bucket, now + TTL)).status, 410);
  assert.ok(!bucket.data.has('badges/' + active.id));
});

test('write origins, payload limits, image validation, unavailable storage and methods fail safely', async () => {
  const bucket = new Bucket();
  assert.equal((await call(request(undefined, 'POST', png(), { origin: 'https://other.example' }), bucket)).status, 403);
  assert.equal((await call(request(undefined, 'POST', png(), { origin: '' }), bucket)).status, 403);
  assert.equal((await call(request(undefined, 'POST', png(), { 'sec-fetch-site': 'cross-site' }), bucket)).status, 403);
  assert.equal((await call(request(undefined, 'POST', png(), { 'content-length': String(MAX_BYTES + 1) }), bucket)).status, 413);
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(MAX_BYTES)); controller.enqueue(new Uint8Array(1)); controller.close(); } });
  assert.equal((await call(request(undefined, 'POST', stream), bucket)).status, 413);
  assert.equal((await call(request(undefined, 'POST', 'not png'), bucket)).status, 400);
  assert.equal((await call(request(undefined, 'POST', png(9000, 9000)), bucket)).status, 400);
  assert.equal((await call(request(undefined, 'POST', png(), { 'content-type': 'text/html' }), bucket)).status, 415);
  assert.equal((await call(request(undefined, 'GET'), bucket)).status, 405);
  assert.equal((await call(request('/apuchika/api/badges/invalid', 'GET'), bucket)).status, 404);
  assert.equal((await call(request(), null)).status, 503);
  assert.equal(bucket.data.size, 0);
});

test('Vercel rewrite destination handles create and image routes', async () => {
  const bucket = new Bucket();
  const created = await call(request('/api/apuchika?resource=badges'), bucket);
  assert.equal(created.status, 201);
  const { id } = await created.json();
  assert.equal((await call(request('/api/apuchika?resource=badges&id=' + id, 'GET'), bucket)).status, 200);
  assert.equal((await call(request('/api/apuchika?resource=unknown'), bucket)).status, 404);
});

test('inquiries validate fields and persist privately, with no public reading endpoint', async () => {
  const bucket = new Bucket();
  const inquiry = data => request('/apuchika/api/inquiries', 'POST', JSON.stringify(data), { 'content-type': 'application/json' });
  const fields = { name: ' 테스트 ', phone: '010-0000-0000', age: '5세', period: '1개월', message: ' 문의 테스트 ' };
  assert.equal((await call(inquiry({ ...fields, phone: 'bad' }), bucket)).status, 400);
  assert.equal((await call(inquiry(null), bucket)).status, 400);
  assert.equal((await call(inquiry(fields), bucket)).status, 201);
  const [key, record] = [...bucket.data][0];
  assert.match(key, /^inquiries\/[a-f0-9-]+\.json$/);
  assert.equal(JSON.parse(record.bytes).name, '테스트');
  assert.equal((await call(request('/apuchika/api/inquiries', 'GET'), bucket)).status, 405);
  assert.equal(bucket.limits[0][1], 'inquiries');
});

test('storage failures never produce a success response or expose internal errors', async () => {
  const bucket = new Bucket();
  bucket.put = async () => { throw new Error('secret internal endpoint'); };
  const result = await call(request(), bucket);
  assert.equal(result.status, 503);
  assert.ok(!(await result.text()).includes('secret'));
  bucket.limit = async () => { throw Object.assign(new Error('잠시 후 다시 시도해 주세요.'), { status: 429 }); };
  assert.equal((await call(request(), bucket)).status, 429);
});

const config = { bucket: 'test', missing: [], credentials: { secretAccessKey: 'test-only-secret' } };
test('R2 adapter confines keys and maps image ownership metadata and list prefixes', async () => {
  const commands = [];
  const bucket = createApuchikaBucket({ config, client: { async send(command) {
    commands.push(command);
    if (command.constructor.name === 'HeadObjectCommand') return { ContentLength: 33, Metadata: { deletehash: 'hash' } };
    if (command.constructor.name === 'ListObjectsV2Command') return { Contents: [{ Key: 'apuchika/badges/123' }] };
    if (command.constructor.name === 'GetObjectCommand') throw Object.assign(new Error(), { name: 'NoSuchKey' });
    return {};
  } } });
  await bucket.put('badges/123', png(), { customMetadata: { deletehash: 'hash' }, httpMetadata: { contentType: 'image/png' } });
  assert.equal(commands[0].input.Key, 'apuchika/badges/123');
  assert.equal(commands[0].input.IfNoneMatch, '*');
  assert.equal((await bucket.head('badges/123')).customMetadata.deletehash, 'hash');
  assert.deepEqual((await bucket.list({ prefix: 'badges/' })).objects, [{ key: 'badges/123' }]);
  assert.equal(await bucket.get('badges/missing'), null);
  await assert.rejects(bucket.put('../submissions/test', 'bad'));
});

test('R2 rate counters retry conditional conflicts, cap requests, and reset by window', async () => {
  const records = new Map(); let conflictOnce = true, revision = 0;
  const bucket = createApuchikaBucket({ config, client: { async send(command) {
    const input = command.input;
    if (command.constructor.name === 'GetObjectCommand') {
      const item = records.get(input.Key);
      if (!item) throw Object.assign(new Error(), { name: 'NoSuchKey' });
      return { ETag: item.etag, Body: { transformToString: async () => item.body } };
    }
    if (conflictOnce) { conflictOnce = false; throw Object.assign(new Error(), { name: 'PreconditionFailed' }); }
    const current = records.get(input.Key);
    assert.equal(input.IfMatch, current?.etag);
    if (!current) assert.equal(input.IfNoneMatch, '*');
    records.set(input.Key, { body: input.Body, etag: String(++revision) });
    return {};
  } } });
  for (let index = 0; index < 30; index++) await bucket.limit('test-ip', 'badges', now);
  await assert.rejects(bucket.limit('test-ip', 'badges', now), error => error.status === 429);
  await bucket.limit('test-ip', 'badges', now + 60000);
  assert.equal(records.size, 2);
  assert.ok(![...records.keys()].some(key => key.includes('test-ip')));
});
