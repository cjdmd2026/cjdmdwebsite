import test from 'node:test';
import assert from 'node:assert/strict';
import { upload } from '../submit/upload.mjs';
function fixture() {
  const headers = {};
  const request = { upload: {}, status: 0, open(method, url) { this.method = method; this.url = url; }, setRequestHeader(k, v) { headers[k] = v; }, send(body) { this.body = body; }, abort() { this.aborted = true; this.onabort(); } };
  const controller = new AbortController(), progress = [];
  const file = new File(['hi'], 'index.html');
  const pending = upload('https://r2.test/signed', file, { headers: { 'Content-Type': 'application/octet-stream', 'If-None-Match': '*' }, abortSignal: controller.signal, onUploadProgress: event => progress.push(event), createRequest: () => request });
  return { request, pending, controller, progress, headers, file };
}
test('browser sends the File directly with signed headers and reports progress only until response', async () => {
  const f = fixture();
  assert.equal(f.request.method, 'PUT'); assert.equal(f.request.body, f.file);
  assert.deepEqual(Object.keys(f.headers).sort(), ['Content-Type', 'If-None-Match']);
  f.request.upload.onprogress({ loaded: 1 }); assert.equal(f.progress[0].percentage, 50);
  f.request.status = 200; f.request.onload(); await f.pending;
  assert.equal(f.progress.at(-1).loaded, 2);
  f.controller.abort(); assert.equal(f.request.aborted, undefined);
});
test('pause aborts in-flight uploads and server failures retain their status for reconciliation', async () => {
  const f = fixture(); f.controller.abort();
  await assert.rejects(f.pending, { name: 'AbortError' }); assert.equal(f.request.aborted, true);
  for (const status of [403, 412, 429, 503]) {
    const failure = fixture(); failure.request.status = status; failure.request.onload();
    await assert.rejects(failure.pending, { status });
  }
  for (const event of ['onerror', 'ontimeout']) {
    const failure = fixture(); failure.request[event]();
    await assert.rejects(failure.pending, { status: 0 });
  }
});
