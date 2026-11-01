import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeSubmission } from '../server/github.mjs';
import { createProcessor } from '../server/process.mjs';
import { SubmissionError } from '../server/policy.mjs';

const submission = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', teamId: 'ilkko', slug: 'ilkko' };
const config = { repository: 'test/exhibition', branch: 'main', sitePath: 'cjdmd2026' };
const sha = 'a'.repeat(40);
const saved = { number: 12, head: { sha } };
function fixture(changes = {}) {
  const calls = [], options = { allow_squash_merge: true };
  const files = [{ filename: 'cjdmd2026/ilkko/index.html', status: 'modified' }, { filename: 'cjdmd2026/ilkko/old.jpg', status: 'removed' }];
  const pull = { number: 12, state: 'open', merged: false, mergeable: true, changed_files: files.length,
    head: { sha, ref: `submissions/ilkko/${submission.id}`, repo: { full_name: config.repository } },
    base: { ref: config.branch, repo: { full_name: config.repository } }, ...changes };
  const github = async (path, body, method) => {
    calls.push({ path, body, method });
    if (path === '/pulls/12') return pull;
    if (path.startsWith('/pulls/12/files?')) { const page = Number(new URL(path, 'https://test').searchParams.get('page')); return files.slice((page - 1) * 100, page * 100); }
    if (path === '') return options;
    if (path === '/pulls/12/merge') {
      if (options.error) throw options.error;
      return { merged: options.result !== false, sha: 'b'.repeat(40) };
    }
    throw new Error(`Unexpected call: ${path}`);
  };
  return { github, pull, files, calls, options, run: () => mergeSubmission(submission, saved, { github, config }) };
}

test('auto merge audits every changed/deleted team file and pins the exact reviewed head', async () => {
  const f = fixture();
  for (let i = 0; i < 100; i++) f.files.push({ filename: `cjdmd2026/ilkko/assets/${i}.png` });
  f.pull.changed_files = f.files.length;
  assert.equal((await f.run()).merged, true);
  assert.equal(f.calls.filter(call => call.path.includes('/files?')).length, 2);
  assert.deepEqual(f.calls.at(-1), { path: '/pulls/12/merge', body: { sha, merge_method: 'squash' }, method: 'PUT' });
});

test('auto merge rejects other folders, a similar prefix, and renames from outside the team', async () => {
  for (const file of [{ filename: 'cjdmd2026/curo/index.html' }, { filename: 'cjdmd2026/ilkko-old/index.html' }, { filename: 'cjdmd2026/ilkko/a.js', previous_filename: '.github/workflows/deploy.yml' }]) {
    const f = fixture(); f.files[0] = file;
    await assert.rejects(f.run(), /팀 폴더 밖/);
    assert.equal(f.calls.some(call => call.method === 'PUT'), false);
  }
});

test('changed heads, forks, retargeted branches, and incomplete file lists fail closed', async () => {
  for (const change of [f => { f.pull.head.sha = 'c'.repeat(40); }, f => { f.pull.head.repo.full_name = 'other/fork'; }, f => { f.pull.base.ref = 'other'; }, f => { f.pull.changed_files = 3001; }, f => { f.pull.changed_files = 3; f.files.length = 0; }]) {
    const f = fixture(); change(f);
    await assert.rejects(f.run());
    assert.equal(f.calls.some(call => call.method === 'PUT'), false);
  }
});

test('already merged receipts are recovered without merging again', async () => {
  const f = fixture({ merged: true, state: 'closed', merge_commit_sha: 'b'.repeat(40) });
  assert.deepEqual(await f.run(), { merged: true, sha: 'b'.repeat(40) });
  assert.equal(f.calls.length, 1);
});

test('unknown mergeability retries; conflicts and closed PRs require attention', async () => {
  await assert.rejects(fixture({ mergeable: null }).run(), error => error.status === 503 && error.retryAfterMs === 15000);
  await assert.rejects(fixture({ mergeable: false }).run(), /충돌/);
  await assert.rejects(fixture({ state: 'closed' }).run(), /닫혀/);
});

test('repository merge options are respected and rejected merges never report success', async () => {
  const f = fixture(); f.options.allow_squash_merge = false; f.options.allow_merge_commit = true;
  await f.run(); assert.equal(f.calls.at(-1).body.merge_method, 'merge');
  f.options.result = false; await assert.rejects(f.run(), /완료하지 못/);
  for (const status of [403, 405, 409, 422]) {
    const g = fixture(); g.options.error = Object.assign(new Error(), { githubStatus: status });
    await assert.rejects(g.run(), error => error.status === 409 && /PR #12/.test(error.message));
  }
  const limited = fixture(); limited.options.error = Object.assign(new Error(), { githubStatus: 403, retryAfterMs: 65000 });
  await assert.rejects(limited.run(), error => error.retryAfterMs === 65000);
});

function processor(merge) {
  let state = { phase: 'queued', mode: 'folder', finalizedAt: Date.now() };
  const writes = []; let archived = 0, submitted = 0, finished = 0, unlocked = 0;
  const run = createProcessor({
    read: async () => structuredClone(state), write: async (_id, value) => { state = structuredClone(value); writes.push(state); },
    lockSubmission: async () => ({}), unlock: async () => { unlocked++; },
    gate: { touch: async () => {}, finish: async () => { finished++; } },
    configFor: () => config, client: () => () => {},
    prepareArchive: async () => { archived++; return { files: [{}], bytes: 2 }; },
    submit: async () => { submitted++; return saved; }, merge,
  });
  return { run: () => run(submission), get state() { return state; }, writes, get counts() { return { archived, submitted, finished, unlocked }; } };
}

test('processor records merge progress and reports completion only after a confirmed merge', async () => {
  const p = processor(async () => ({ merged: true, sha }));
  await p.run();
  assert.ok(p.writes.some(state => state.phase === 'merging' && state.pullHeadSha === sha));
  assert.equal(p.state.phase, 'submitted'); assert.equal(p.state.merged, true); assert.equal(p.state.mergeCommit, sha);
  assert.deepEqual(p.counts, { archived: 1, submitted: 1, finished: 1, unlocked: 1 });
  await p.run(); assert.equal(p.counts.submitted, 1);
});

test('merge response loss retries the same pinned PR without reloading files or recreating a PR', async () => {
  let attempts = 0;
  const p = processor(async (_submission, pull) => {
    assert.deepEqual(pull, saved);
    if (++attempts === 1) throw new SubmissionError('Temporary failure', 503);
    return { merged: true, sha };
  });
  await p.run(); assert.equal(p.state.phase, 'paused'); assert.equal(p.counts.finished, 0);
  p.state.resumeAfter = 0; await p.run();
  assert.equal(p.state.phase, 'submitted'); assert.equal(p.state.merged, true);
  assert.deepEqual(p.counts, { archived: 1, submitted: 1, finished: 1, unlocked: 2 });
});

test('permanent merge failures preserve the PR, release storage, and never claim deployment', async () => {
  const p = processor(async () => { throw new SubmissionError('PR #12 자동 반영 확인 필요', 409); });
  await p.run();
  assert.equal(p.state.phase, 'merge_failed'); assert.equal(p.state.pullNumber, 12); assert.equal(p.state.merged, undefined);
  assert.match(p.state.message, /PR #12/); assert.equal(p.counts.finished, 1);
  await p.run(); assert.equal(p.counts.submitted, 1);
});
