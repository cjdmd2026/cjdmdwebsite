import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import { folderSelection, validateFiles, validateImageContent, applyFileChanges, ignoredFile } from '../submit/files.mjs';
import { teams } from '../server/teams.mjs';
import { hashFile } from '../submit/hash-file.mjs';

// Exercise the actual controller against a minimal DOM and in-memory services.
// These tests neither drive a browser nor contact R2/GitHub.
const html = await readFile(new URL('../submit/index.html', import.meta.url), 'utf8');
const source = (await readFile(new URL('../submit/app.mjs', import.meta.url), 'utf8')).replace(/^import .*;\r?\n/gm, '').replace(/initialize\(\);\s*$/, 'this.ready = initialize();');
function element() {
  return { hidden: false, disabled: false, checked: false, value: '', textContent: '', dataset: {}, children: [], firstChild: { textContent: '' }, listeners: {},
    classList: { toggle() {}, remove() {} }, add() {}, focus() {}, removeAttribute() {}, setAttribute(name, value) { this[name] = value; },
    append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; },
    addEventListener(name, handler) { this.listeners[name] = handler; },
  };
}
function services() {
  const store = new Map(), uploaded = new Set(), counts = new Map();
  return { store, uploaded, counts, delays: [], confirmations: [], files: [], siteFiles: [], treeSha: null, deletions: [], phase: 'awaiting_upload', failOnce: true, finalizations: 0, admission: { busy: false }, preparations: 0, cancellations: 0,
    async fetch(url, options = {}) {
      const action = new URL(url, 'http://localhost').searchParams.get('action');
      const body = JSON.parse(options.body || '{}'); let data;
      if (action === 'config') data = { enabled: true, admission: this.admission };
      else if (action === 'tree') data = { treeSha: this.treeSha, files: this.siteFiles };
      else if (action === 'prepare') {
        this.preparations++;
        if (this.admission.busy) return Response.json({ error: '다른 팀이 제출 중입니다.' }, { status: 423 });
        this.files = body.files; this.deletions = body.deletions; this.baseTreeSha = body.baseTreeSha; data = { id: 'sample', pathname: 'submissions/sample/files/', ticket: 'test-only', expires: Date.now() + 86400000 };
      }
      else if (action === 'upload-url') data = { url: 'https://r2.test/files/' + body.index, headers: { 'Content-Type': 'application/octet-stream', 'If-None-Match': '*' } };
      else if (action === 'confirm-file') {
        this.confirmations.push(body.index);
        if (this.confirmResponse) return this.confirmResponse(body.index, options);
        data = { uploaded: uploaded.has(body.index) };
      }
      else if (action === 'status') data = { id: 'sample', teamId: 'ilkko', slug: 'ilkko', mode: 'folder', phase: this.phase, merged: this.merged, message: this.message, files: this.files, deletions: this.deletions, baseTreeSha: this.baseTreeSha, uploaded: [...uploaded] };
      else if (action === 'finalize') { assert.equal(uploaded.size, this.files.length); this.finalizations++; this.phase = 'submitted'; data = { accepted: true }; }
      else if (action === 'cancel') { this.cancellations++; data = { cancelled: true }; }
      else throw new Error(`Unexpected action ${action}`);
      return Response.json(data);
    },
    async upload(path, file, options) {
      const index = Number(path.split('/').pop()); counts.set(index, (counts.get(index) || 0) + 1);
      if (this.uploadHook) await this.uploadHook(index, file, options);
      if (options.abortSignal.aborted) throw new Error('Upload aborted');
      if (this.failOnce && index === 0) { this.failOnce = false; throw new Error('simulated network failure'); }
      uploaded.add(index); options.onUploadProgress({ percentage: 100, loaded: file.size });
      if (this.loseResponse && index === 0) { this.loseResponse = false; throw new Error('Lost upload response'); }
    },
  };
}
async function controller(server) {
  const elements = new Map([...html.matchAll(/id="([^"]+)"/g)].map(match => [match[1], element()]));
  const get = id => { assert.ok(elements.has(id), `Existing UI element: ${id}`); return elements.get(id); };
  get('folder-files').webkitdirectory = true;
  const context = vm.createContext({
    document: { getElementById: get, createElement: element }, window: { addEventListener() {} },
    localStorage: { getItem: key => server.store.get(key) || null, setItem: (key, value) => server.store.set(key, value), removeItem: key => server.store.delete(key) },
    __TEAMS__: teams, Option: function () {}, initBotId() {}, folderSelection, validateFiles, validateImageContent, applyFileChanges, ignoredFile,
    crypto: webcrypto, AbortController, AbortSignal, clearTimeout,
    setTimeout(callback, delay) { server.delays.push(delay); return server.scheduleTimeout ? server.scheduleTimeout(callback, delay) : setTimeout(callback, 0); },
    setInterval() {}, fetch: server.fetch.bind(server), upload: server.upload.bind(server), hashFile,
  });
  vm.runInContext(source, context); await context.ready;
  return { context, get, async event(id, name) { await get(id).listeners[name]({ preventDefault() {} }); } };
}
function sampleFiles(edit = false) {
  return [['index.html', edit ? 'no' : 'hi'], ['images/icon.svg', '<svg/>']].map(([path, content]) => {
    const file = new File([content], path.split('/').pop());
    Object.defineProperty(file, 'webkitRelativePath', { value: `website/${path}` }); return file;
  });
}
async function select(ui, files = sampleFiles()) {
  ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  ui.get('folder-files').files = files; await ui.event('folder-files', 'change');
}
test('PNG and renamed PNG selections are rejected before reserving a slot or uploading', async () => {
  for (const name of ['photo.PNG', 'photo.jpg']) {
    const server = services(), ui = await controller(server);
    const png = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], name);
    Object.defineProperty(png, 'webkitRelativePath', { value: `website/images/${name}` });
    await select(ui, [sampleFiles()[0], png]);
    assert.match(ui.get('form-error').textContent, /PNG/);
    assert.equal(ui.get('upload-button').disabled, true);
    assert.equal(server.preparations, 0);
    assert.equal(server.uploaded.size, 0);
  }
});

test('a site with a bundled library license appears in the file list and uploads intact', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  const license = new File(['Library license notice'], 'LICENSE');
  const path = 'js/vendor/three/LICENSE';
  Object.defineProperty(license, 'webkitRelativePath', { value: `website/${path}` });
  await select(ui, [...sampleFiles(), license]);
  assert.ok(ui.get('file-list').children.some(row => row.children[0].textContent === path));
  assert.equal(ui.get('upload-button').disabled, false);
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 3);
  assert.ok(server.files.some(file => file.path === path && file.size === license.size));
  assert.equal(server.finalizations, 0);
});

test('GIF can still be selected and uploaded', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  const gif = new File(['GIF89a'], 'animation.gif');
  Object.defineProperty(gif, 'webkitRelativePath', { value: 'website/images/animation.gif' });
  await select(ui, [sampleFiles()[0], gif]);
  assert.equal(ui.get('upload-button').disabled, false);
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 2);
  assert.ok(server.files.some(file => file.path === 'images/animation.gif'));
});

test('client automatically retries missing files and still requires explicit final confirmation', async () => {
  const server = services(), ui = await controller(server);
  await select(ui);
  assert.equal(ui.get('upload-button').disabled, false);
  assert.equal(ui.get('submit-button').disabled, true);
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 2); assert.equal(server.finalizations, 0);
  assert.deepEqual(server.delays, [2000]);
  assert.deepEqual([...server.counts], [[0, 2], [1, 1]]);
  assert.equal(server.finalizations, 0); assert.equal(ui.get('submit-button').disabled, true);
  ui.get('confirm').checked = true; await ui.event('confirm', 'change');
  assert.equal(ui.get('submit-button').disabled, false);
  await ui.event('submission-form', 'submit');
  assert.equal(server.finalizations, 1);
  assert.match(ui.get('status-title').textContent, /제출이 완료/);
});

test('GitHub processing keeps polling beyond the former limit and reconnects without reupload or refinalize', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui); await ui.event('upload-button', 'click');
  const original = server.fetch.bind(server);
  let reads = 0, resumes = 0, processFailures = 0, resumed = false;
  // The bound fetch installed in the VM delegates through this configurable hook.
  const fetch = async (url, options = {}) => {
    const action = new URL(url, 'http://localhost').searchParams.get('action');
    if (action === 'status') {
      if (!server.finalizations) return original(url, options);
      reads++;
      if (reads <= 4) return new Response('gateway unavailable', { status: 502 });
      const result = { id: 'sample', teamId: 'ilkko', slug: 'ilkko', totalFiles: 2, completedFiles: 1, phase: resumed ? 'submitted' : reads <= 185 ? 'saving' : 'paused', merged: resumed };
      if (reads === 186) result.resumeAfter = Date.now() + 60000;
      return Response.json(result);
    }
    if (action === 'process') {
      assert.ok(reads > 186, 'wait for server retry time');
      if (++processFailures <= 4) return Response.json({ error: 'Temporary failure' }, { status: 503 });
      resumes++; resumed = true; return Response.json({ accepted: true }, { status: 202 });
    }
    return original(url, options);
  };
  ui.context.fetch = fetch;
  ui.get('confirm').checked = true; await ui.event('confirm', 'change');
  await ui.event('submission-form', 'submit');
  assert.match(ui.get('status-title').textContent, /제출이 완료/);
  assert.equal(resumes, 1); assert.equal(server.preparations, 1); assert.equal(server.finalizations, 1);
  assert.deepEqual([...server.counts.values()], [1, 1]);
  assert.ok(server.delays.includes(40000)); assert.ok(reads > 180);
});

test('reopening a finalized paused receipt resumes GitHub storage without selecting or uploading files', async () => {
  const server = services(); server.failOnce = false;
  const first = await controller(server); await select(first); await first.event('upload-button', 'click');
  server.phase = 'paused';
  const original = server.fetch.bind(server);
  let resumes = 0;
  server.fetch = async (url, options = {}) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'process') {
      resumes++; server.phase = 'submitted'; server.merged = true; return Response.json({ accepted: true }, { status: 202 });
    }
    return original(url, options);
  };
  const restored = await controller(server);
  assert.match(restored.get('status-title').textContent, /제출이 완료/);
  assert.equal(resumes, 1); assert.equal(server.preparations, 1); assert.equal(server.finalizations, 0);
  assert.deepEqual([...server.counts.values()], [1, 1]);
});
test('a prolonged outage retries beyond five attempts while preserving the receipt and in-flight group', async () => {
  const server = services(), ui = await controller(server);
  const files = [sampleFiles()[0], ...Array.from({ length: 921 }, (_, i) => {
    const file = new File(['image'], `${i}.webp`);
    Object.defineProperty(file, 'webkitRelativePath', { value: `website/images/${i}.webp` }); return file;
  })];
  await select(ui, files);
  server.failOnce = false;
  server.confirmResponse = index => {
    if (server.delays.length < 9) {
      assert.equal(server.counts.size, 4);
      return Response.json({ error: '확인 서버 오류' }, { status: 500 });
    }
    return Response.json({ uploaded: server.uploaded.has(index) });
  };
  await ui.event('upload-button', 'click');
  assert.equal(server.preparations, 1);
  assert.deepEqual(server.delays, [2000, 4000, 8000, 16000, 30000, 30000, 30000, 30000, 30000]);
  assert.equal(server.store.size, 1); assert.equal(server.finalizations, 0);
  assert.equal(server.uploaded.size, 922); assert.equal(server.preparations, 1);
  assert.ok([...server.counts.values()].every(count => count === 1));
  assert.equal(server.finalizations, 0);
});

test('configuration and file inventory automatically recover and respect server retry delay', async () => {
  const server = services(), original = server.fetch.bind(server), failures = new Map();
  server.fetch = async (url, options) => {
    const action = new URL(url, 'http://localhost').searchParams.get('action');
    if (['config', 'tree'].includes(action)) {
      const count = (failures.get(action) || 0) + 1; failures.set(action, count);
      if (count <= 2) return Response.json({ error: 'temporary', retryAfterMs: 9000 }, { status: 503 });
    }
    return original(url, options);
  };
  const ui = await controller(server); await select(ui);
  assert.equal(ui.get('upload-button').disabled, false);
  assert.deepEqual(server.delays, [9000, 9000, 9000, 9000]);
});

test('server-marked slot contention retries preparation, while explicit permanent errors stop', async () => {
  for (const retryable of [true, false]) {
    const server = services(), ui = await controller(server), original = server.fetch.bind(server);
    server.failOnce = false; await select(ui); let attempts = 0;
    ui.context.fetch = async (url, options) => {
      if (new URL(url, 'http://localhost').searchParams.get('action') === 'prepare' && ++attempts === 1) return Response.json({ error: retryable ? '이전 접수 정리 중' : '설정 확인 필요', retryable, retryAfterMs: 7000 }, { status: retryable ? 423 : 503 });
      return original(url, options);
    };
    await ui.event('upload-button', 'click');
    assert.equal(attempts, retryable ? 2 : 1);
    assert.equal(server.uploaded.size, retryable ? 2 : 0);
    assert.deepEqual(server.delays, retryable ? [7000] : []);
  }
});

test('switching teams cancels the previous inventory retry without overwriting the new team', async () => {
  const server = services(), ui = await controller(server), original = server.fetch.bind(server), waiting = deferred();
  server.scheduleTimeout = callback => { waiting.resolve(); return setTimeout(callback, 30000); };
  ui.context.fetch = async (url, options) => {
    if (url.includes('teamId=ilkko')) return Response.json({ error: 'Temporary' }, { status: 503 });
    return original(url, options);
  };
  ui.get('team').value = 'ilkko'; const first = ui.event('team', 'change'); await waiting.promise;
  ui.get('team').value = 'curo'; await ui.event('team', 'change'); await first;
  assert.equal(ui.get('team').value, 'curo');
  assert.equal(ui.get('form-fields').disabled, false);
  assert.doesNotMatch(ui.get('form-error').textContent, /불러오지/);
});

test('lost prepare responses retry the same private key before any file transfer', async () => {
  const server = services(), ui = await controller(server), original = server.fetch.bind(server), keys = [];
  server.failOnce = false; await select(ui);
  ui.context.fetch = async (url, options = {}) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'prepare') {
      keys.push(JSON.parse(options.body).requestKey);
      const result = await original(url, options);
      if (keys.length === 1) throw new TypeError('response lost');
      return Response.json({ ...await result.json(), resumed: true });
    }
    return original(url, options);
  };
  await ui.event('upload-button', 'click');
  assert.equal(keys.length, 2); assert.equal(new Set(keys).size, 1);
  assert.deepEqual([...server.counts.values()], [1, 1]);
  assert.equal(server.store.size, 1); assert.equal(server.finalizations, 0);
});

test('pausing preparation and reloading retains its key and restores the receipt without starting uploads', async () => {
  const server = services(), original = server.fetch.bind(server), keys = [], waiting = deferred();
  let saved;
  server.fetch = async (url, options = {}) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'prepare') {
      keys.push(JSON.parse(options.body).requestKey);
      if (!saved) { saved = await (await original(url, options)).json(); throw new TypeError('response lost'); }
      return Response.json({ ...saved, resumed: true });
    }
    return original(url, options);
  };
  const first = await controller(server); await select(first);
  server.scheduleTimeout = callback => { waiting.resolve(); return setTimeout(callback, 30000); };
  const uploading = first.event('upload-button', 'click'); await waiting.promise;
  await first.event('pause-upload', 'click'); await uploading;
  assert.equal(server.uploaded.size, 0); assert.equal(server.store.size, 1);
  server.scheduleTimeout = null;
  const next = await controller(server);
  assert.equal(new Set(keys).size, 1); assert.equal(server.preparations, 1);
  assert.equal(server.store.size, 1); assert.equal(server.counts.size, 0);
  assert.match(next.get('file-count').textContent, /0 \/ 2/);
  assert.equal(next.get('choose-file').disabled, false);
});

test('finalization retries temporary failures and lock contention without uploading or creating a receipt again', async () => {
  const server = services(), ui = await controller(server), original = server.fetch.bind(server);
  server.failOnce = false; await select(ui); await ui.event('upload-button', 'click');
  let attempts = 0;
  ui.context.fetch = async (url, options) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'finalize') {
      attempts++;
      if (attempts === 1) return new Response('unavailable', { status: 503 });
      if (attempts === 2) return Response.json({ error: 'busy', retryable: true, retryAfterMs: 12000 }, { status: 409 });
    }
    return original(url, options);
  };
  ui.get('confirm').checked = true; await ui.event('confirm', 'change'); await ui.event('submission-form', 'submit');
  assert.equal(attempts, 3); assert.equal(server.finalizations, 1); assert.equal(server.preparations, 1);
  assert.deepEqual([...server.counts.values()], [1, 1]);
  assert.ok(server.delays.includes(12000)); assert.match(ui.get('status-title').textContent, /제출이 완료/);
});

test('a lost finalization response is reconciled instead of repeating the completed request', async () => {
  const server = services(), ui = await controller(server), original = server.fetch.bind(server);
  server.failOnce = false; await select(ui); await ui.event('upload-button', 'click');
  ui.context.fetch = async (url, options) => {
    const result = await original(url, options);
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'finalize') throw new TypeError('response lost');
    return result;
  };
  ui.get('confirm').checked = true; await ui.event('confirm', 'change'); await ui.event('submission-form', 'submit');
  assert.equal(server.finalizations, 1); assert.equal(server.preparations, 1);
  assert.match(ui.get('status-title').textContent, /제출이 완료/);
});

test('reload continues an explicitly requested finalization but never invents confirmation', async () => {
  const server = services(), first = await controller(server); server.failOnce = false;
  await select(first); await first.event('upload-button', 'click');
  await controller(server); assert.equal(server.finalizations, 0);
  const [key, data] = [...server.store][0]; server.store.set(key, JSON.stringify({ ...JSON.parse(data), finalizeRequested: true }));
  const next = await controller(server);
  assert.equal(server.finalizations, 1); assert.match(next.get('status-title').textContent, /제출이 완료/);
});

test('permanent finalization errors clear pending intent and do not retry after reload', async () => {
  const server = services(), original = server.fetch.bind(server);
  let attempts = 0;
  server.fetch = async (url, options) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'finalize') { attempts++; return Response.json({ error: '변경 내용 확인 필요' }, { status: 409 }); }
    return original(url, options);
  };
  const ui = await controller(server); server.failOnce = false; await select(ui); await ui.event('upload-button', 'click');
  ui.get('confirm').checked = true; await ui.event('confirm', 'change'); await ui.event('submission-form', 'submit');
  assert.equal(attempts, 1); assert.match(ui.get('form-error').textContent, /변경 내용 확인 필요/);
  await controller(server); assert.equal(attempts, 1); assert.equal(server.finalizations, 0);
});

test('cancellation automatically retries transient errors before forgetting the receipt', async () => {
  const server = services(), ui = await controller(server), original = server.fetch.bind(server);
  await select(ui); await ui.event('upload-button', 'click'); let attempts = 0;
  ui.context.fetch = async (url, options) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'cancel' && ++attempts === 1) return Response.json({ error: 'temporary' }, { status: 503 });
    return original(url, options);
  };
  await ui.event('new-submission', 'click');
  assert.equal(attempts, 2); assert.equal(server.cancellations, 1); assert.equal(server.store.size, 0);
});

test('rate limits, non-JSON server errors and connection loss automatically recover without retransmitting stored files', async () => {
  for (const response of [
    () => Response.json({ error: '잠시 후 다시 시도해주세요.' }, { status: 429 }),
    () => new Response('<html>Bad Gateway</html>', { status: 502 }),
    () => { throw new TypeError('Failed to fetch'); },
  ]) {
    const server = services(), ui = await controller(server); server.failOnce = false; await select(ui);
    server.confirmResponse = () => { server.confirmResponse = null; return response(); };
    await ui.event('upload-button', 'click');
    assert.ok(server.confirmations.length <= 4);
    assert.equal(server.counts.size, 2); assert.equal(server.store.size, 1);
    assert.equal(server.uploaded.size, 2);
    assert.ok([...server.counts.values()].every(count => count === 1));
    assert.deepEqual(server.delays, [2000]);
    assert.equal(server.finalizations, 0);
    assert.equal(ui.get('upload-progress').value, 100);
  }
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test('a late connection failure in a 388-file upload resumes automatically without reuploading completed files', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles(388));
  let interrupted = false;
  server.confirmResponse = index => {
    if (index === 348 && !interrupted) { interrupted = true; throw new TypeError('Failed to fetch'); }
    return Response.json({ uploaded: server.uploaded.has(index) });
  };
  await ui.event('upload-button', 'click');
  assert.equal(interrupted, true); assert.equal(server.uploaded.size, 388);
  assert.ok([...server.counts.values()].every(count => count === 1));
  assert.equal(server.preparations, 1); assert.equal(server.finalizations, 0);
  assert.deepEqual(server.delays, [2000]);
  assert.equal(ui.get('file-count').textContent, '388 / 388개 완료');
});

test('manual pause cancels a pending automatic retry and preserves files for a later resume', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles());
  const waiting = deferred();
  server.scheduleTimeout = callback => { waiting.resolve(); return setTimeout(callback, 30000); };
  server.confirmResponse = () => Response.json({ error: '잠시 후 재시도' }, { status: 503 });
  const uploading = ui.event('upload-button', 'click'); await waiting.promise;
  assert.equal(ui.get('pause-upload').disabled, false);
  assert.match(ui.get('status-title').textContent, /자동으로 다시 시도/);
  assert.equal(ui.get('file-list').children[0].children[2].textContent, '자동 재시도 대기');
  await ui.event('pause-upload', 'click'); await uploading;
  assert.deepEqual(server.delays, [2000]);
  assert.equal(server.counts.size, 4); assert.equal(server.preparations, 1);
  assert.equal(ui.get('upload-button').disabled, false);
  server.confirmResponse = null; server.scheduleTimeout = null;
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 12);
  assert.ok([...server.counts.values()].every(count => count === 1));
  assert.equal(server.finalizations, 0);
});

test('authorization and expired receipts stop without scheduling automatic retries', async () => {
  for (const status of [401, 403, 410, 423]) {
    const server = services(), ui = await controller(server); server.failOnce = false;
    await select(ui, manyFiles());
    server.confirmResponse = () => Response.json({ error: '접수 확인 필요' }, { status });
    await ui.event('upload-button', 'click');
    assert.deepEqual(server.delays, []);
    assert.equal(server.counts.size, 4); assert.equal(server.store.size, 1);
    assert.match(ui.get('form-error').textContent, /접수 확인 필요/);
    assert.equal(ui.get('upload-button').disabled, false);
    assert.equal(server.finalizations, 0);
  }
});

test('a permanently rejected file is not retried when another file has a temporary failure', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles());
  server.uploadHook = async index => { if (index === 0) throw Object.assign(new Error('허용되지 않은 파일'), { status: 422 }); };
  let interrupted = false;
  server.confirmResponse = index => {
    if (index === 4 && !interrupted) { interrupted = true; return Response.json({ error: '잠시 후 재시도' }, { status: 500 }); }
    return Response.json({ uploaded: server.uploaded.has(index) });
  };
  await ui.event('upload-button', 'click');
  assert.equal(interrupted, true); assert.equal(server.uploaded.size, 11);
  assert.equal(server.counts.get(0), 1);
  assert.deepEqual(server.delays, [2000]);
  assert.equal(ui.get('file-list').children[0].children[2].textContent, '실패');
  assert.equal(ui.get('submit-button').disabled, true); assert.equal(server.finalizations, 0);
});

function manyFiles(count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const path = i === 0 ? 'index.html' : `images/${i}.svg`;
    const file = new File(['1234567890'], path.split('/').pop());
    Object.defineProperty(file, 'webkitRelativePath', { value: `website/${path}` }); return file;
  });
}

test('four files overlap, progress sums all transfers, and fresh uploads need only one verification each', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles());
  const firstGroup = deferred(), release = deferred();
  let active = 0, peak = 0;
  server.uploadHook = async (_, file, options) => {
    active++; peak = Math.max(peak, active);
    options.onUploadProgress({ percentage: 50, loaded: file.size / 2 });
    if (active === 4) firstGroup.resolve();
    await release.promise;
    active--;
  };
  const uploading = ui.event('upload-button', 'click'); await firstGroup.promise;
  assert.equal(server.counts.size, 4); assert.equal(peak, 4);
  assert.ok(Math.abs(ui.get('upload-progress').value - (20 / 120 * 100)) < 0.001);
  assert.equal(ui.get('upload-button').disabled, true); assert.equal(ui.get('submit-button').disabled, true);
  release.resolve(); await uploading;
  assert.equal(peak, 4); assert.equal(active, 0); assert.equal(server.uploaded.size, 12);
  assert.equal(server.confirmations.length, 12); assert.equal(new Set(server.confirmations).size, 12);
  assert.equal(ui.get('upload-progress').value, 100); assert.equal(server.finalizations, 0);
});

test('pause aborts every active upload, starts no queued file and retries on the same receipt', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles());
  const started = deferred(); let active = 0, aborted = 0;
  server.uploadHook = (_, file, options) => new Promise((resolve, reject) => {
    active++; if (active === 4) started.resolve();
    options.abortSignal.addEventListener('abort', () => { active--; aborted++; reject(new Error('Stopped')); }, { once: true });
  });
  const uploading = ui.event('upload-button', 'click'); await started.promise;
  await ui.event('pause-upload', 'click'); await uploading;
  assert.equal(aborted, 4); assert.equal(active, 0); assert.equal(server.counts.size, 4);
  assert.equal(server.finalizations, 0); assert.equal(server.confirmations.length, 0);
  server.uploadHook = null;
  await ui.event('upload-button', 'click');
  assert.equal(server.preparations, 1); assert.equal(server.uploaded.size, 12);
  assert.equal(server.confirmations.length, 16); // Four uncertain files reconcile; fresh queued files do not.
});

test('pause also aborts concurrent verification requests and recovers stored files without uploading twice', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false;
  await select(ui, manyFiles());
  const started = deferred(); let active = 0, aborted = 0;
  server.confirmResponse = (_, options) => new Promise((resolve, reject) => {
    active++; if (active === 4) started.resolve();
    options.signal.addEventListener('abort', () => { active--; aborted++; reject(new Error('Stopped')); }, { once: true });
  });
  const uploading = ui.event('upload-button', 'click'); await started.promise;
  assert.equal(ui.get('submit-button').disabled, true);
  await ui.event('pause-upload', 'click'); await uploading;
  assert.equal(aborted, 4); assert.equal(active, 0); assert.equal(server.counts.size, 4);
  server.confirmResponse = null;
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 12); assert.equal(server.preparations, 1);
  assert.ok([...server.counts.values()].every(count => count === 1));
});

test('a lost successful upload response is verified without uploading the file twice', async () => {
  const server = services(), ui = await controller(server); server.failOnce = false; server.loseResponse = true;
  await select(ui); await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 2); assert.ok([...server.counts.values()].every(count => count === 1));
  assert.match(ui.get('file-count').textContent, /2 \/ 2/);
  assert.equal(server.finalizations, 0);
});

test('reload restores uploaded files, rejects edited folders, and resumes only the missing file', async () => {
  const server = services(), first = await controller(server);
  server.failOnce = false;
  server.uploadHook = async index => { if (index === 0) throw Object.assign(new Error('파일 전송 거절'), { status: 400 }); };
  await select(first); await first.event('upload-button', 'click');
  const next = await controller(server);
  assert.match(next.get('file-count').textContent, /1 \/ 2/);
  assert.equal(next.get('upload-button').disabled, true);
  await select(next, sampleFiles(true));
  assert.match(next.get('form-error').textContent, /파일 내용이 다릅니다/);
  assert.equal(next.get('submission-status').hidden, false);
  assert.equal(next.get('new-submission').hidden, false);
  assert.equal(next.get('upload-button').disabled, true);
  server.uploadHook = null;
  await select(next); await next.event('upload-button', 'click');
  assert.deepEqual([...server.counts], [[0, 2], [1, 1]]);
  assert.equal(server.finalizations, 0);
});

test('a waiting team can prepare files but cannot upload until the occupied slot clears', async () => {
  const server = services(); server.admission = { busy: true, teamId: 'curo' };
  const ui = await controller(server); await select(ui);
  assert.equal(ui.get('upload-button').disabled, true);
  assert.match(ui.get('admission-message').textContent, /제출 중/);
  await ui.event('upload-button', 'click'); assert.equal(server.preparations, 0);
  server.admission = { busy: false };
  await ui.event('refresh-admission', 'click');
  assert.equal(ui.get('upload-button').disabled, false);
});

test('a simultaneous prepare rejection preserves the folder and refreshes the waiting message', async () => {
  const server = services(), ui = await controller(server); await select(ui);
  server.admission = { busy: true, teamId: 'curo' };
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 0); assert.equal(server.store.size, 0);
  assert.equal(ui.get('upload-button').disabled, true);
  assert.match(ui.get('file-size').textContent, /2개/);
  assert.match(ui.get('form-error').textContent, /다른 팀/);
});

test('starting a replacement submission cancels the previous receipt before forgetting it', async () => {
  const server = services(), ui = await controller(server); await select(ui);
  await ui.event('upload-button', 'click');
  await ui.event('new-submission', 'click');
  assert.equal(server.cancellations, 1); assert.equal(server.store.size, 0);
  assert.equal(ui.get('team').disabled, false);
});

test('merged submissions show deployment pending without claiming the live site is already updated', async () => {
  const server = services(), ui = await controller(server); await select(ui);
  server.failOnce = false; server.merged = true;
  await ui.event('upload-button', 'click'); ui.get('confirm').checked = true; await ui.event('confirm', 'change');
  await ui.event('submission-form', 'submit');
  assert.match(ui.get('status-description').textContent, /배포가 끝나면/);
  assert.equal(ui.get('progress-label').textContent, '저장 완료 · 배포 대기');
});

test('a restored merge failure shows the preserved receipt without resubmitting', async () => {
  const server = services(), first = await controller(server); await select(first);
  await first.event('upload-button', 'click');
  server.phase = 'merge_failed'; server.message = 'PR #12에 보관되어 있습니다. 담당자에게 접수 번호를 알려주세요.';
  const next = await controller(server);
  assert.equal(next.get('status-title').textContent, '접수 완료 · 자동 반영 확인 필요');
  assert.match(next.get('status-description').textContent, /PR #12/);
  assert.equal(next.get('new-submission').hidden, false); assert.equal(server.finalizations, 0);
});

test('file manager navigates folders and stages new files at the current path without deleting old files', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }, { path: 'images/old.svg', size: 6 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  const folderRow = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('images'));
  await folderRow.children[0].listeners.click();
  ui.get('single-files').files = [new File(['<svg/>'], 'new.svg')]; await ui.event('single-files', 'change');
  server.failOnce = false; await ui.event('upload-button', 'click');
  assert.deepEqual(server.files.map(file => file.path), ['images/new.svg']);
  assert.deepEqual(server.deletions, []);
  assert.match(ui.get('site-usage').textContent, /3개/);
});

test('importing a site from a subfolder shows the imported files at the team root', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }, { path: 'images/old.svg', size: 6 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  const folderRow = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('images'));
  await folderRow.children[0].listeners.click();
  ui.get('folder-files').files = sampleFiles(); await ui.event('folder-files', 'change');
  assert.equal(ui.get('folder-breadcrumbs').children.length, 1);
  assert.ok(ui.get('directory-list').children.some(row => row.children[0].textContent === 'index.html'));
  const images = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('images'));
  assert.ok(images);
  await images.children[0].listeners.click();
  assert.deepEqual(ui.get('directory-list').children.map(row => row.children[0].textContent).sort(), ['icon.svg', 'old.svg']);
  assert.equal(server.preparations, 0); assert.equal(server.finalizations, 0);
});

test('adding a folder keeps its name and the current directory visible', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }, { path: 'images/old.svg', size: 6 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  const folderRow = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('images'));
  await folderRow.children[0].listeners.click();
  const file = new File(['<svg/>'], 'icon.svg');
  Object.defineProperty(file, 'webkitRelativePath', { value: 'icons/icon.svg' });
  ui.get('nested-folder-files').files = [file]; await ui.event('nested-folder-files', 'change');
  assert.equal(ui.get('folder-breadcrumbs').children.at(-1).textContent, 'images');
  const icons = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('icons'));
  assert.ok(icons);
  await icons.children[0].listeners.click();
  assert.equal(ui.get('directory-list').children[0].children[0].textContent, 'icon.svg');
  assert.equal(ui.get('file-list').children[0].children[0].textContent, 'images/icons/icon.svg');
  assert.equal(server.preparations, 0); assert.equal(server.finalizations, 0);
});

test('folder deletion is staged, can be undone, and only applies after explicit confirmation', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }, { path: 'images/old.svg', size: 6 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  const requestDelete = async () => {
    const row = ui.get('directory-list').children.find(row => row.children[0].textContent.includes('images'));
    await row.children[2].listeners.click(); await ui.event('confirm-delete', 'click');
  };
  await requestDelete(); assert.equal(server.preparations, 0); assert.equal(server.finalizations, 0);
  await ui.get('deletion-list').children[0].children[1].listeners.click();
  assert.equal(ui.get('deletion-panel').hidden, true);
  await requestDelete(); ui.get('confirm').checked = true; await ui.event('confirm', 'change');
  assert.equal(ui.get('submit-button').disabled, false);
  await ui.event('submission-form', 'submit');
  assert.deepEqual(server.deletions, ['images/old.svg']); assert.equal(server.files.length, 0); assert.equal(server.finalizations, 1);
});

test('new folders accept files and an index deletion blocks final reflection', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  ui.get('folder-name').value = 'assets'; await ui.event('create-folder', 'click');
  ui.get('single-files').files = [new File(['x'], 'new.svg')]; await ui.event('single-files', 'change');
  assert.equal(ui.get('file-list').children[0].children[0].textContent, 'assets/new.svg');
  await ui.get('folder-breadcrumbs').children[0].listeners.click();
  const index = ui.get('directory-list').children.find(row => row.children[0].textContent === 'index.html');
  await index.children[2].listeners.click(); await ui.event('confirm-delete', 'click');
  assert.equal(ui.get('upload-button').disabled, true); assert.match(ui.get('change-warning').textContent, /index.html/);
});

test('switching teams clears an unconfirmed deletion instead of applying it to the next team', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }, { path: 'old.svg', size: 2 }];
  const ui = await controller(server); ui.get('team').value = 'ilkko'; await ui.event('team', 'change');
  const row = ui.get('directory-list').children.find(row => row.children[0].textContent === 'old.svg');
  await row.children[2].listeners.click();
  assert.equal(ui.get('delete-confirmation').hidden, false);
  ui.get('team').value = 'curo'; await ui.event('team', 'change');
  assert.equal(ui.get('delete-confirmation').hidden, true);
  await ui.event('confirm-delete', 'click');
  assert.equal(ui.get('deletion-panel').hidden, true);
  assert.equal(ui.get('submit-button').disabled, true);
});

test('discarding an edit reloads current files without uploading or deleting anything', async () => {
  const server = services(); server.siteFiles = [{ path: 'index.html', size: 2 }];
  const ui = await controller(server); await select(ui);
  assert.equal(ui.get('discard-changes').disabled, false);
  server.siteFiles.push({ path: 'newer.svg', size: 2 });
  await ui.event('discard-changes', 'click');
  assert.equal(ui.get('file-preview').hidden, true);
  assert.equal(ui.get('submit-button').disabled, true);
  assert.ok(ui.get('directory-list').children.some(row => row.children[0].textContent === 'newer.svg'));
  assert.equal(server.preparations, 0); assert.equal(server.cancellations, 0); assert.equal(server.finalizations, 0);
});


test('a legacy Blob receipt stays preserved while a new R2 receipt can upload', async () => {
  const server = services(); server.failOnce = false;
  const legacy = JSON.stringify({ ticket: 'old-blob-ticket', id: 'old', expires: Date.now() + 86400000 });
  server.store.set('dmd2026-folder-receipt', legacy);
  const ui = await controller(server);
  assert.match(ui.get('form-error').textContent, /저장소가 변경/);
  await select(ui); await ui.event('upload-button', 'click');
  assert.equal(server.store.get('dmd2026-folder-receipt'), legacy);
  assert.equal(JSON.parse(server.store.get('dmd2026-folder-receipt-r2')).ticket, 'test-only');
  assert.equal(server.uploaded.size, 2); assert.equal(server.finalizations, 0);
});

test('a signing service failure automatically retries the existing receipt before sending file bytes', async () => {
  const server = services(); server.failOnce = false;
  const originalFetch = server.fetch.bind(server); let unavailable = true, requests = 0;
  server.fetch = async (url, options) => {
    if (new URL(url, 'http://localhost').searchParams.get('action') === 'upload-url') {
      requests++;
      assert.equal(options.headers.Authorization, 'Bearer test-only');
      assert.deepEqual(Object.keys(JSON.parse(options.body)), ['index']);
      if (unavailable) { unavailable = false; return Response.json({ error: '저장소 연결 오류' }, { status: 503 }); }
    }
    return originalFetch(url, options);
  };
  const ui = await controller(server); await select(ui, manyFiles());
  await ui.event('upload-button', 'click');
  assert.ok(requests <= 16); assert.deepEqual(server.delays, [2000]);
  assert.equal(server.preparations, 1); assert.equal(server.uploaded.size, 12);
  assert.ok([...server.counts.values()].every(count => count === 1));
  assert.equal(server.finalizations, 0);
});
