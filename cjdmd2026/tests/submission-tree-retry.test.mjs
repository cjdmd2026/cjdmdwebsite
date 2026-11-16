import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { githubClient } from '../server/github.mjs';
import { createProcessor } from '../server/process.mjs';

const hash = content => createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
const submission = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', teamId: 'ilkko', slug: 'ilkko' };
const config = { repository: 'test/exhibition', branch: 'main', sitePath: 'cjdmd2026' };

function fixture(count, timeoutAt = 0) {
  const existing = [{ path: 'index.html', size: 2, sha: 'index', type: 'blob', mode: '100644' },
    ...Array.from({ length: 1200 }, (_, i) => ({ path: `images/keep-${i}.svg`, size: 2, sha: `keep-${i}`, type: 'blob', mode: '100644' }))];
  const trees = new Map([['old-team', new Map(existing.map(file => [file.path, file]))]]);
  const stats = { loads: 0, blobs: 0, treeAttempts: 0, commits: 0, pulls: 0, finished: 0, merges: 0 };
  const writes = [];
  let nextTree = 0, committedTree, state = { phase: 'queued', mode: 'folder', finalizedAt: Date.now() };
  const files = Array.from({ length: count }, (_, i) => {
    const content = Buffer.from(`new-${i}`);
    return { path: `images/new-${i}.svg`, size: content.length, gitSha: hash(content), load: async () => { stats.loads++; return content; } };
  });
  const fetcher = async (url, options) => {
    const path = new URL(url).pathname.replace('/repos/test/exhibition', '');
    const body = options.body && JSON.parse(options.body);
    const reply = value => Response.json(value);
    if (options.method === 'GET') {
      if (path === '/pulls') return reply([]);
      if (path.startsWith('/git/ref/heads/submissions/')) return Response.json({ message: 'Not Found' }, { status: 404 });
      if (path === '/git/ref/heads/main') return reply({ object: { sha: 'base' } });
      if (path === '/git/commits/base') return reply({ tree: { sha: 'root' } });
      if (path === '/git/trees/root') return reply({ tree: [{ path: 'cjdmd2026', type: 'tree', sha: 'site' }] });
      if (path === '/git/trees/site') return reply({ tree: [{ path: 'ilkko', type: 'tree', sha: 'old-team' }] });
      if (path === '/git/trees/old-team') return reply({ tree: existing });
    }
    if (path === '/git/blobs') {
      stats.blobs++;
      return reply({ sha: hash(Buffer.from(body.content, 'base64')) });
    }
    if (path === '/git/trees') {
      if (body.base_tree === 'root') {
        assert.equal(body.tree[0].path, 'cjdmd2026/ilkko');
        committedTree = trees.get(body.tree[0].sha);
        return reply({ sha: 'new-root' });
      }
      stats.treeAttempts++;
      writes.push(body);
      if (stats.treeAttempts === timeoutAt) return Response.json({ message: "Sorry, your request timed out. It's likely that your input was too large to process." }, { status: 422 });
      assert.ok(body.tree.length <= 100);
      assert.ok(trees.has(body.base_tree));
      const tree = new Map(trees.get(body.base_tree));
      for (const entry of body.tree) {
        if (entry.sha === null) { assert.ok(tree.has(entry.path)); tree.delete(entry.path); }
        else tree.set(entry.path, entry);
      }
      const sha = `team-${++nextTree}`;
      trees.set(sha, tree);
      return reply({ sha });
    }
    if (path === '/git/commits') { stats.commits++; return reply({ sha: 'a'.repeat(40) }); }
    if (path === '/git/refs') return reply({});
    if (path === '/pulls') { stats.pulls++; return reply({ number: 12, head: { sha: 'a'.repeat(40) } }); }
    assert.fail(`Unexpected GitHub request ${options.method} ${path}`);
  };
  const github = githubClient('test', config.repository, fetcher);
  const process = createProcessor({
    read: async () => structuredClone(state), write: async (_id, value) => { state = structuredClone(value); },
    lockSubmission: async () => ({}), unlock: async () => {},
    gate: { touch: async () => {}, finish: async () => { stats.finished++; } },
    configFor: () => config, client: () => github,
    prepareArchive: async () => ({ files, bytes: files.reduce((sum, file) => sum + file.size, 0), baseTreeSha: 'old-team' }),
    merge: async () => { stats.merges++; return { sha: 'b'.repeat(40) }; },
  });
  return { stats, writes, files, existing, run: () => process(submission), get state() { return state; }, get committedTree() { return committedTree; } };
}

test('a 422 tree timeout retains all 13 uploaded files and resumes without downloading or uploading them again', async t => {
  t.mock.method(console, 'error', () => {});
  const f = fixture(13, 1);
  await f.run();
  assert.equal(f.state.phase, 'paused');
  assert.equal(f.state.lastError.githubStatus, 422);
  assert.equal(f.state.lastError.retryable, true);
  assert.equal(f.state.completedFiles, 13);
  assert.equal(f.state.checkpoint.length, 13);
  assert.equal(f.stats.finished, 0);
  assert.equal(f.stats.commits, 0);
  assert.equal(f.stats.pulls, 0);
  const attempts = f.stats.treeAttempts;
  await f.run();
  assert.equal(f.stats.treeAttempts, attempts, 'respect retry delay');
  f.state.resumeAfter = 0;
  await f.run();
  assert.equal(f.state.phase, 'submitted');
  assert.equal(f.state.merged, true);
  assert.equal(f.stats.loads, 13);
  assert.equal(f.stats.blobs, 13);
  assert.equal(f.stats.commits, 1);
  assert.equal(f.stats.pulls, 1);
  assert.equal(f.stats.merges, 1);
  assert.equal(f.stats.finished, 1);
  for (const file of f.existing) assert.deepEqual(f.committedTree.get(file.path), file);
  for (const file of f.files) assert.equal(f.committedTree.get(file.path).sha, file.gitSha);
  assert.equal(f.committedTree.size, f.existing.length + 13);
});

test('a timeout after earlier tree batches never publishes a partial site and retry preserves untouched files', async t => {
  t.mock.method(console, 'error', () => {});
  const f = fixture(205, 3);
  await f.run();
  assert.equal(f.state.phase, 'paused');
  assert.equal(f.stats.commits, 0);
  assert.equal(f.stats.finished, 0);
  assert.equal(f.committedTree, undefined);
  f.state.resumeAfter = 0;
  await f.run();
  assert.equal(f.state.phase, 'submitted');
  assert.equal(f.stats.loads, 205);
  assert.equal(f.stats.blobs, 205);
  assert.equal(f.stats.commits, 1);
  assert.equal(f.stats.pulls, 1);
  assert.equal(f.committedTree.size, f.existing.length + 205);
  for (const file of f.existing) assert.deepEqual(f.committedTree.get(file.path), file);
  for (const file of f.files) assert.equal(f.committedTree.get(file.path).sha, file.gitSha);
  assert.ok(f.writes.every(body => body.tree.length <= 100 && body.tree.every(file => file.path.startsWith('images/new-'))));
});
