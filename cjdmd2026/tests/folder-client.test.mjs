import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import { folderSelection, sameManifest } from '../submit/files.mjs';
import { teams } from '../server/teams.mjs';

// Exercise the actual controller against a minimal DOM and in-memory services.
// These tests neither drive a browser nor contact Blob/GitHub.
const html = await readFile(new URL('../submit/index.html', import.meta.url), 'utf8');
const source = (await readFile(new URL('../submit/app.mjs', import.meta.url), 'utf8')).replace(/^import .*;\r?\n/gm, '').replace(/initialize\(\);\s*$/, 'this.ready = initialize();');
function element() {
  return { hidden: false, disabled: false, checked: false, value: '', textContent: '', dataset: {}, children: [], firstChild: { textContent: '' }, listeners: {},
    classList: { toggle() {}, remove() {} }, add() {}, focus() {}, removeAttribute() {},
    append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; },
    addEventListener(name, handler) { this.listeners[name] = handler; },
  };
}
function services() {
  const store = new Map(), uploaded = new Set(), counts = new Map();
  return { store, uploaded, counts, files: [], phase: 'awaiting_upload', failOnce: true, finalizations: 0, admission: { busy: false }, preparations: 0, cancellations: 0,
    async fetch(url, options = {}) {
      const action = new URL(url, 'http://localhost').searchParams.get('action');
      const body = JSON.parse(options.body || '{}'); let data;
      if (action === 'config') data = { enabled: true, admission: this.admission };
      else if (action === 'prepare') {
        this.preparations++;
        if (this.admission.busy) return Response.json({ error: '다른 팀이 제출 중입니다.' }, { status: 423 });
        this.files = body.files; data = { id: 'sample', pathname: 'submissions/sample/files/', ticket: 'test-only', expires: Date.now() + 86400000 };
      }
      else if (action === 'confirm-file') data = { uploaded: uploaded.has(body.index) };
      else if (action === 'status') data = { id: 'sample', teamId: 'ilkko', slug: 'ilkko', mode: 'folder', phase: this.phase, files: this.files, uploaded: [...uploaded] };
      else if (action === 'finalize') { assert.equal(uploaded.size, this.files.length); this.finalizations++; this.phase = 'submitted'; data = { accepted: true }; }
      else if (action === 'cancel') { this.cancellations++; data = { cancelled: true }; }
      else throw new Error(`Unexpected action ${action}`);
      return Response.json(data);
    },
    async upload(path, file, options) {
      const index = Number(path.split('/').pop()); counts.set(index, (counts.get(index) || 0) + 1);
      if (this.failOnce && index === 0) { this.failOnce = false; throw new Error('simulated network failure'); }
      uploaded.add(index); options.onUploadProgress({ percentage: 100, loaded: file.size });
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
    __TEAMS__: teams, Option: function () {}, initBotId() {}, folderSelection, sameManifest,
    crypto: webcrypto, AbortController, AbortSignal, setTimeout, setInterval() {}, fetch: server.fetch.bind(server), upload: server.upload.bind(server),
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
test('client retries only failed files and requires explicit final confirmation after every file succeeds', async () => {
  const server = services(), ui = await controller(server);
  await select(ui);
  assert.equal(ui.get('upload-button').disabled, false);
  assert.equal(ui.get('submit-button').disabled, true);
  await ui.event('upload-button', 'click');
  assert.equal(server.uploaded.size, 1); assert.equal(server.finalizations, 0);
  assert.match(ui.get('upload-button').textContent, /실패한 파일/);
  await ui.event('upload-button', 'click');
  assert.deepEqual([...server.counts], [[0, 2], [1, 1]]);
  assert.equal(server.finalizations, 0); assert.equal(ui.get('submit-button').disabled, true);
  ui.get('confirm').checked = true; await ui.event('confirm', 'change');
  assert.equal(ui.get('submit-button').disabled, false);
  await ui.event('submission-form', 'submit');
  assert.equal(server.finalizations, 1);
  assert.match(ui.get('status-title').textContent, /제출이 완료/);
});
test('reload restores uploaded files, rejects edited folders, and resumes only the missing file', async () => {
  const server = services(), first = await controller(server);
  await select(first); await first.event('upload-button', 'click');
  const next = await controller(server);
  assert.match(next.get('file-count').textContent, /1 \/ 2/);
  assert.equal(next.get('upload-button').disabled, true);
  await select(next, sampleFiles(true));
  assert.match(next.get('form-error').textContent, /파일 내용이 다릅니다/);
  assert.equal(next.get('submission-status').hidden, false);
  assert.equal(next.get('new-submission').hidden, false);
  assert.equal(next.get('upload-button').disabled, true);
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
