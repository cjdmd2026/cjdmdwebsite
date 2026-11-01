import test from 'node:test';
import assert from 'node:assert/strict';
import { applyFileChanges, folderSelection, folderLimits } from '../submit/files.mjs';
import { validateFolderSubmission } from '../server/policy.mjs';
import { siteSnapshot } from '../server/site.mjs';
import { submitToGithub, mergeSubmission } from '../server/github.mjs';
import { finalizeFolder } from '../server/folder.mjs';

const digest = 'a'.repeat(64), oldTree = 'b'.repeat(40);
const team = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', teamId: 'ilkko', slug: 'ilkko' };
const config = { repository: 'test/exhibition', branch: 'main', sitePath: 'cjdmd2026' };
const file = (path, size = 2) => ({ path, size, sha256: digest });
const existing = [{ path: 'index.html', size: 2, sha: 'index-sha', mode: '100644' }, { path: 'images/keep.svg', size: 3, sha: 'keep-sha', mode: '100644' }, { path: 'images/delete.svg', size: 4, sha: 'delete-sha', mode: '100644' }];
function storage() {
  const calls = [], settings = { truncated: false, unchanged: false };
  const github = async (path, body, method) => {
    calls.push({ path, body, method });
    if (path.startsWith('/pulls?')) return [];
    if (path.startsWith('/git/ref/heads/submissions/')) throw Object.assign(new Error(), { githubStatus: 404 });
    if (path === '/git/ref/heads/main') return { object: { sha: 'base' } };
    if (path === '/git/commits/base') return { tree: { sha: 'root' } };
    if (path === '/git/trees/root') return { tree: [{ path: 'cjdmd2026', type: 'tree', sha: 'site' }] };
    if (path === '/git/trees/site') return { tree: [{ path: 'ilkko', type: 'tree', sha: oldTree }] };
    if (path === `/git/trees/${oldTree}?recursive=1`) return { truncated: settings.truncated, tree: existing.map(item => ({ ...item, type: 'blob' })) };
    if (path === '/git/blobs') return { sha: 'new-blob' };
    if (path === '/git/trees') return { sha: body.base_tree ? 'new-root' : settings.unchanged ? oldTree : 'new-team' };
    if (path === '/git/commits') return { sha: 'new-commit' };
    if (path === '/git/refs') return {};
    if (path === '/pulls') return { number: 12 };
    if (path === '/pulls/12') return { number: 12, merged: false, state: 'open', mergeable: true, head: { sha: 'a'.repeat(40), ref: `submissions/ilkko/${team.id}`, repo: { full_name: config.repository } }, base: { ref: 'main', repo: { full_name: config.repository } } };
    throw new Error(`Unexpected call ${path}`);
  };
  return { github, calls, settings };
}

test('2,000-file batches are accepted while total size remains 500 MiB', () => {
  const files = [file('index.html'), ...Array.from({ length: 1999 }, (_, i) => file(`assets/${i}.svg`))];
  assert.equal(validateFolderSubmission({ teamId: 'ilkko', files, baseTreeSha: null }).totalFiles, 2000);
  assert.throws(() => validateFolderSubmission({ teamId: 'ilkko', files: [...files, file('one-more.svg')], baseTreeSha: null }));
  assert.equal(folderLimits.totalBytes, 500 * 1024 ** 2);
  assert.throws(() => applyFileChanges([file('index.html', folderLimits.totalBytes)], [file('more.svg')]), /500 MiB/);
  assert.throws(() => applyFileChanges(files, [file('more.svg')]), /2,000/);
});

test('separate updates preserve earlier files, replace exact paths, and count the resulting size', () => {
  const first = applyFileChanges(existing, [file('images/new.svg', 10)]);
  const second = applyFileChanges(first.files, [file('images/new.svg', 5), file('app.js', 6)], ['images/delete.svg']);
  assert.deepEqual(second.files.map(item => item.path).sort(), ['app.js', 'images/keep.svg', 'images/new.svg', 'index.html']);
  assert.equal(second.bytes, 16);
  assert.throws(() => applyFileChanges(existing, [file('INDEX.html')]), /대소문자/);
  assert.throws(() => applyFileChanges(existing, [file('images', 1)]), /파일과 폴더/);
});

test('the root index must survive; a partial update needs no additional index', () => {
  assert.equal(validateFolderSubmission({ teamId: 'ilkko', files: [file('images/new.svg')], baseTreeSha: oldTree }).totalFiles, 1);
  assert.throws(() => applyFileChanges([], [file('images/new.svg')]), /index.html/);
  assert.throws(() => applyFileChanges(existing, [], ['index.html']), /index.html/);
  assert.throws(() => applyFileChanges(existing, [], ['../curo/index.html']), /삭제할 파일/);
});

test('subfolder additions preserve both the selected folder name and current destination', () => {
  const folder = folderSelection([{ webkitRelativePath: 'icons/star.svg', size: 2 }], { prefix: 'images/', keepRoot: true, requireIndex: false });
  assert.equal(folder.files[0].path, 'images/icons/star.svg');
});

test('GitHub tree keeps untouched files and removes only explicitly requested paths', async () => {
  const f = storage();
  await submitToGithub(team, { files: [{ path: 'images/new.svg', content: Buffer.from('hi') }], bytes: 2, deletions: ['images/delete.svg'], baseTreeSha: oldTree }, { ...f, config });
  const tree = f.calls.find(call => call.path === '/git/trees' && !call.body.base_tree).body.tree;
  assert.deepEqual(tree, [
    { path: 'index.html', mode: '100644', type: 'blob', sha: 'index-sha' },
    { path: 'images/keep.svg', mode: '100644', type: 'blob', sha: 'keep-sha' },
    { path: 'images/new.svg', mode: '100644', type: 'blob', sha: 'new-blob' },
  ]);
  assert.deepEqual(f.calls.find(call => call.path === '/git/trees' && call.body.base_tree).body.tree, [{ path: 'cjdmd2026/ilkko', mode: '040000', type: 'tree', sha: 'new-team' }]);
});

test('deletion-only changes finalize and create a PR without uploading blobs', async () => {
  const f = storage();
  const changes = validateFolderSubmission({ teamId: 'ilkko', files: [], deletions: ['images/delete.svg'], baseTreeSha: oldTree });
  let state = { ...changes, phase: 'awaiting_upload' };
  await finalizeFolder(team, { read: async () => state, write: async (_id, next) => { state = next; }, uploaded: async () => [], lock: async () => ({}), unlock: async () => {} });
  assert.equal(state.phase, 'queued');
  await submitToGithub(team, { ...changes, bytes: 0 }, { ...f, config });
  assert.equal(f.calls.some(call => call.path === '/git/blobs'), false);
  assert.ok(f.calls.some(call => call.path === '/pulls'));
});

test('truncated inventories and changed team revisions stop edits and automatic merging', async () => {
  const f = storage(); f.settings.truncated = true;
  await assert.rejects(siteSnapshot('ilkko', f.github, config), /전체 파일/);
  f.settings.truncated = false;
  await assert.rejects(submitToGithub(team, { files: [file('app.js')], deletions: [], baseTreeSha: 'c'.repeat(40) }, { ...f, config }), /팀 폴더가 변경/);
  await assert.rejects(mergeSubmission(team, { number: 12, head: { sha: 'a'.repeat(40) }, baseTreeSha: 'c'.repeat(40) }, { ...f, config }), /팀 폴더가 변경/);
  assert.equal(f.calls.some(call => call.path === '/git/blobs' || call.method === 'PUT'), false);
});

test('an unchanged batch preserves the website without an empty PR', async () => {
  const f = storage(); f.settings.unchanged = true;
  const result = await submitToGithub(team, { files: [{ path: 'index.html', content: Buffer.from('hi') }], bytes: 2, baseTreeSha: oldTree }, { ...f, config });
  assert.equal(result.unchanged, true);
  assert.equal(f.calls.some(call => call.path === '/pulls'), false);
});
