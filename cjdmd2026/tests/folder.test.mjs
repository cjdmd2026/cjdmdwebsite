import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { StorageNotFoundError, StorageUnavailableError } from '../server/r2.mjs';
import { folderSelection, validateFiles, sameManifest, folderLimits } from '../submit/files.mjs';
import { validateFolderSubmission, signTicket, readTicket, SubmissionError } from '../server/policy.mjs';
import { readVerifiedContent, confirmFile, finalizeFolder, folderFile } from '../server/folder.mjs';
const hash = value => createHash('sha256').update(value).digest('hex');
const files = [{ path: 'index.html', size: 2, sha256: hash('hi') }, { path: 'images/그림.svg', size: 6, sha256: hash('<svg/>') }];
const submission = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', mode: 'folder', teamId: 'ilkko', slug: 'ilkko' };

test('folder selection preserves nested paths, removes only the selected root and ignores OS metadata', () => {
  const input = files.map(file => ({ webkitRelativePath: `팀 사이트/${file.path}`, size: file.size }));
  const selected = folderSelection([...input, { webkitRelativePath: '팀 사이트/.DS_Store', size: 1 }]);
  assert.equal(selected.name, '팀 사이트');
  assert.deepEqual(selected.files.map(file => file.path), ['images/그림.svg', 'index.html']);
  assert.equal(selected.files[1].file, input[0]);
  assert.throws(() => folderSelection([{ name: 'index.html', size: 2 }]));
});
test('folder manifests accept projects above the former ZIP cap but enforce individual and total limits', () => {
  const big = [files[0], ...Array.from({ length: 4 }, (_, i) => ({ path: `video${i}.mp4`, size: 70 * 1024 ** 2, sha256: hash('video') }))];
  assert.equal(validateFolderSubmission({ teamId: 'ilkko', files: big, baseTreeSha: null }).totalFiles, 5);
  assert.throws(() => validateFiles([...files, { path: 'huge.mp4', size: folderLimits.fileBytes + 1, sha256: hash('x') }]));
  assert.throws(() => validateFiles(big, { policy: { ...folderLimits, totalBytes: 200 } }));
  assert.throws(() => validateFiles(files, { policy: { ...folderLimits, files: 1 } }));
  assert.throws(() => validateFolderSubmission({ teamId: '../main', files }));
});
test('manifest rejects traversal, secrets, duplicate/colliding paths and bad content digests', () => {
  for (const path of ['../main/index.html', '/index.html', 'a\\x.js', '%2e%2e/x.js', 'a//x.js', '.env', 'node_modules/x.js', 'package.json', 'app.exe', 'INDEX.html']) {
    assert.throws(() => validateFiles([...files, { ...files[0], path }]), path);
  }
  assert.throws(() => validateFiles([...files, { ...files[0], path: 'x.js' }, { ...files[0], path: 'x.js/y.js' }]));
  assert.throws(() => validateFiles([{ ...files[0], size: 0 }]));
  assert.throws(() => validateFiles([{ ...files[0], sha256: 'bad' }]));
  assert.throws(() => folderFile({ mode: 'folder', files }, -1));
  assert.throws(() => folderFile({ mode: 'folder', files }, '0'));
  assert.throws(() => folderFile({ mode: 'folder', files }, 2));
});
test('reselecting a same-size edited file cannot silently resume an old submission', () => {
  assert.ok(sameManifest(files, structuredClone(files)));
  assert.equal(sameManifest(files, [{ ...files[0], sha256: hash('no') }, files[1]]), false);
  assert.equal(sameManifest(files, [files[0]]), false);
});
test('folder tickets expire and cannot be redirected to another team or storage path', () => {
  const secret = 'test-secret-is-at-least-32-characters';
  const data = { ...submission, pathname: `submissions/${submission.id}/files/`, expires: Date.now() + 1000 };
  assert.equal(readTicket(signTicket(data, secret), secret).mode, 'folder');
  for (const changed of [{ pathname: 'https://example.com/' }, { slug: 'curo' }, { expires: 1 }]) assert.throws(() => readTicket(signTicket({ ...data, ...changed }, secret), secret));
});
test('server checks actual bytes and SHA-256, including truncated or oversized content', async () => {
  const read = (content, size = 2) => readVerifiedContent('fixed/path', files[0], {
    headBlob: async () => ({ size }), getBlob: async () => ({ stream: new Response(content).body }),
  });
  assert.equal((await read('hi')).toString(), 'hi');
  await assert.rejects(read('no'), { status: 422 });
  await assert.rejects(read('h'), { status: 422 });
  await assert.rejects(read('hii'), { status: 422 });
  await assert.rejects(read('hi', 3), { status: 422 });
});
test('an unuploaded file is pending with the R2 missing-object error, while access errors still fail', async () => {
  const state = { mode: 'folder', phase: 'awaiting_upload', files };
  const ports = {
    read: async () => null,
    write: async () => assert.fail('An absent file must not be marked verified'),
    readContent: (pathname, file) => readVerifiedContent(pathname, file, {
      headBlob: async () => { throw new StorageNotFoundError(); },
      getBlob: async () => assert.fail('An absent file must not be downloaded'),
    }),
    remove: async () => assert.fail('An absent file must not be deleted'),
  };
  assert.deepEqual(await confirmFile(submission, state, 0, ports), { uploaded: false });
  const denied = new StorageUnavailableError();
  await assert.rejects(confirmFile(submission, state, 0, { ...ports, readContent: async () => { throw denied; } }), error => error === denied);
});

test('verified files survive retries; corrupt upload is removed without marking it complete', async () => {
  const markers = new Map(); let reads = 0, removed = 0;
  const state = { mode: 'folder', phase: 'awaiting_upload', files };
  const ports = { read: async key => markers.get(key), write: async (key, data) => markers.set(key, { data }), readContent: async () => { reads++; return Buffer.from('hi'); }, remove: async () => { removed++; } };
  assert.equal((await confirmFile(submission, state, 0, ports)).uploaded, true);
  assert.equal((await confirmFile(submission, state, 0, ports)).uploaded, true);
  assert.equal(reads, 1);
  assert.equal((await confirmFile(submission, state, 1, { ...ports, readContent: async () => { throw new SubmissionError('corrupt', 422); } })).uploaded, false);
  assert.equal(removed, 1); assert.equal(markers.size, 1);
  await assert.rejects(confirmFile(submission, { ...state, phase: 'queued' }, 0, ports), { status: 409 });
});
test('incomplete folders cannot finalize; complete folders finalize once and retries preserve state', async () => {
  let state = { mode: 'folder', phase: 'awaiting_upload', files }, completed = [0], writes = 0, releases = 0;
  const ports = { read: async () => state, write: async (_, next) => { state = next; writes++; }, uploaded: async () => completed, lock: async () => ({}), unlock: async () => { releases++; } };
  await assert.rejects(finalizeFolder(submission, ports), { status: 409 });
  assert.equal(writes, 0); assert.equal(state.phase, 'awaiting_upload');
  completed = [0, 1];
  await finalizeFolder(submission, ports);
  assert.equal(state.phase, 'queued'); assert.ok(state.finalizedAt);
  await finalizeFolder(submission, ports);
  assert.equal(writes, 1); assert.equal(releases, 3);
  await assert.rejects(finalizeFolder(submission, { ...ports, lock: async () => null }), { status: 409 });
});
