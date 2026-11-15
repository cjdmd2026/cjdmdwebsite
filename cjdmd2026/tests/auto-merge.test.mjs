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

function processor(merge, overrides = {}) {
  let state = { phase: 'queued', mode: 'folder', finalizedAt: Date.now() };
  const writes = []; let archived = 0, submitted = 0, finished = 0, unlocked = 0;
  const run = createProcessor({
    read: async () => structuredClone(state), write: async (_id, value) => { state = structuredClone(value); writes.push(state); },
    lockSubmission: async () => ({}), unlock: async () => { unlocked++; },
    gate: { touch: async () => {}, finish: async () => { finished++; } },
    configFor: () => config, client: () => () => {},
    prepareArchive: async () => { archived++; return { files: [{}], bytes: 2 }; },
    submit: async () => { submitted++; return saved; }, merge, ...overrides,
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

test('temporary GitHub failures retain uploaded source after eight attempts and eventually resume', async () => {
  let attempts = 0;
  const p = processor(async () => ({ merged: true, sha }), { submit: async (_submission, _archive, { checkpoint, onProgress }) => {
    if (!attempts) await onProgress(1, 2, [sha]);
    else assert.deepEqual(checkpoint, [sha]);
    if (++attempts <= 12) throw Object.assign(new SubmissionError('GitHub unavailable', 502), { githubStatus: 503 });
    return saved;
  } });
  for (let i = 0; i < 12; i++) {
    const before = Date.now();
    await p.run();
    assert.equal(p.state.phase, 'paused');
    assert.equal(p.counts.finished, 0);
    assert.deepEqual(p.state.checkpoint, [sha]);
    assert.equal(p.state.completedFiles, 1);
    assert.ok(p.state.resumeAfter >= before + Math.min(300000, 5000 * 2 ** i));
    await p.run(); assert.equal(attempts, i + 1, 'do not retry before resumeAfter');
    p.state.resumeAfter = 0;
  }
  await p.run();
  assert.equal(p.state.phase, 'submitted');
  assert.equal(p.counts.finished, 1);
});

test('execution slices are resumable beyond eight runs without error backoff or deleting files', async () => {
  let attempts = 0;
  const p = processor(async () => ({ merged: true, sha }), { submit: async () => {
    if (++attempts <= 10) throw Object.assign(new SubmissionError('Continue', 503), { continuation: true });
    return saved;
  } });
  for (let i = 0; i < 10; i++) {
    await p.run(); assert.equal(p.state.phase, 'paused'); assert.equal(p.state.retryFailures, 0);
    assert.equal(p.counts.finished, 0); p.state.resumeAfter = 0;
  }
  await p.run(); assert.equal(p.state.phase, 'submitted');
});

test('saved progress stays monotonic and new progress resets retry backoff', async () => {
  let attempt = 0;
  const p = processor(async () => ({ merged: true, sha }), { submit: async (_submission, _archive, { checkpoint, onProgress }) => {
    if (++attempt === 1) await onProgress(10, 20, [sha]);
    else {
      await onProgress(1, 20, checkpoint);
      assert.equal(p.state.completedFiles, 10);
      assert.equal(p.state.retryFailures, 1);
      await onProgress(11, 20, [...checkpoint, 'b'.repeat(40)]);
    }
    throw new SubmissionError('Temporary', 503);
  } });
  await p.run(); p.state.resumeAfter = 0; await p.run();
  assert.equal(p.state.completedFiles, 11); assert.equal(p.state.retryFailures, 1);
});

test('rate limits honor server delay but permission and validation errors stop', async () => {
  for (const status of [408, 425, 429, 500, 502, 503]) {
    const p = processor(async () => { throw Object.assign(new SubmissionError('Temporary', 502), { githubStatus: status, retryAfterMs: 3600000 }); });
    const before = Date.now(); await p.run();
    assert.equal(p.state.phase, 'paused'); assert.ok(p.state.resumeAfter >= before + 3600000); assert.equal(p.counts.finished, 0);
  }
  for (const status of [401, 403, 404, 422]) {
    const p = processor(async () => { throw Object.assign(new SubmissionError('Permanent', 502), { githubStatus: status }); });
    await p.run(); assert.equal(p.state.phase, 'merge_failed'); assert.equal(p.counts.finished, 1);
  }
});

test('explicit transient contention preserves processing state and explicit permanent errors stop', async () => {
  for (const retryable of [true, false]) {
    const p = processor(async () => { throw Object.assign(new SubmissionError('Storage condition', retryable ? 423 : 503), { retryable }); });
    await p.run();
    assert.equal(p.state.phase, retryable ? 'paused' : 'merge_failed');
    assert.equal(p.counts.finished, retryable ? 0 : 1);
  }
});

test('repeated secondary limits back off and persist safe diagnostics without cleaning uploads', async () => {
  const p = processor(async () => { throw Object.assign(new SubmissionError('private-content test-token', 502), {
    githubStatus: 403, githubRateLimited: true, retryAfterMs: 65000, githubRateLimitRemaining: 123,
    githubPath: '/git/blobs', githubMethod: 'POST', githubRequestId: 'request-123',
  }); });
  for (const delay of [65000, 130000, 260000]) {
    const before = Date.now(); await p.run();
    assert.equal(p.state.phase, 'paused'); assert.equal(p.counts.finished, 0);
    assert.ok(p.state.resumeAfter >= before + delay);
    assert.equal(p.state.lastError.githubStatus, 403);
    assert.equal(p.state.lastError.githubRateLimitRemaining, 123);
    assert.equal(p.state.lastError.githubRequestId, 'request-123');
    assert.doesNotMatch(JSON.stringify(p.state.lastError), /private-content|test-token/);
    p.state.resumeAfter = 0;
  }
});

test('file-level validation diagnostics persist in the receipt and runtime log', async t => {
  const logs = [];
  t.mock.method(console, 'error', (...args) => logs.push(args));
  const details = { githubStatus: 422, githubMethod: 'POST', githubPath: '/git/blobs', githubMessage: 'Validation Failed',
    githubErrors: [{ resource: 'Blob', field: 'content', code: 'too_large' }], filePath: 'videos/intro.mp4', fileSize: 90000000, fileIndex: 180 };
  const p = processor(async () => assert.fail('must not merge'), { submit: async () => {
    throw Object.assign(new SubmissionError('private-content', 502), details, { body: 'private-content', token: 'test-token', retryable: false });
  } });
  await p.run();
  assert.equal(p.state.phase, 'failed');
  for (const [key, value] of Object.entries(details)) {
    assert.deepEqual(p.state.lastError[key], value);
    assert.deepEqual(logs[0][1][key], value);
  }
  assert.doesNotMatch(JSON.stringify([p.state.lastError, logs]), /private-content|test-token/);
});
