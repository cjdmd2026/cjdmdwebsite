import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import yazl from 'yazl';
import { teams } from '../server/teams.mjs';
import { limits, validateSubmission, signTicket, readTicket, assertOrigin, configuration, targetPath } from '../server/policy.mjs';
import { safeArchivePath, siteRoot, readSiteArchive } from '../server/archive.mjs';
import { submitToGithub } from '../server/github.mjs';
import { handleRequest } from '../api/submission.js';

function zip(files) {
  const archive = new yazl.ZipFile();
  for (const file of files) archive.addBuffer(Buffer.from(file.content ?? 'hello'), file.path, file.options);
  archive.end();
  return new Promise((resolve, reject) => {
    const chunks = [];
    archive.outputStream.on('data', chunk => chunks.push(chunk));
    archive.outputStream.on('end', () => resolve(Buffer.concat(chunks)));
    archive.outputStream.on('error', reject);
  });
}
test('existing team data maps to fixed, unique, safe site folders', () => {
  assert.equal(teams.length, 14);
  assert.equal(teams.find(team => team.id === 'ilkko').slug, 'ilkko');
  assert.equal(new Set(teams.map(team => team.slug)).size, teams.length);
  assert.ok(teams.every(team => /^[a-z0-9-]+$/.test(team.slug)));
  assert.equal(targetPath('ilkko', 'cjdmd2026'), 'cjdmd2026/ilkko');
  assert.throws(() => targetPath('../main', 'cjdmd2026'));
});
test('unknown teams and invalid/oversized submissions are rejected', () => {
  const valid = { teamId: 'ilkko', fileName: '작품.zip', fileSize: 1000 };
  assert.equal(validateSubmission(valid).slug, 'ilkko');
  assert.throws(() => validateSubmission({ ...valid, teamId: '../main' }));
  assert.throws(() => validateSubmission({ ...valid, fileSize: limits.zipBytes + 1 }));
  assert.throws(() => validateSubmission({ ...valid, fileName: 'project.exe' }));
});
test('tickets cannot be changed, expired or reused for another team folder', () => {
  const secret = 'test-secret-is-at-least-32-characters';
  const payload = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', teamId: 'ilkko', slug: 'ilkko', expires: Date.now() + 10000 };
  payload.pathname = `submissions/${payload.id}/site.zip`;
  const ticket = signTicket(payload, secret);
  assert.equal(readTicket(ticket, secret).id, payload.id);
  assert.throws(() => readTicket(ticket.replace(/^./, 'x'), secret));
  assert.throws(() => readTicket(ticket, secret, payload.expires + 1));
  assert.throws(() => readTicket(signTicket({ ...payload, slug: 'apuchika' }, secret), secret));
  assert.throws(() => readTicket(signTicket({ ...payload, pathname: 'https://attacker.test/' }, secret), secret));
});
test('only the configured site and exact preview origins are accepted', () => {
  const request = origin => new Request('https://dmd2026.com/api/submission', { headers: origin ? { origin } : {} });
  assert.doesNotThrow(() => assertOrigin(request('https://dmd2026.com'), { VERCEL: '1' }));
  assert.doesNotThrow(() => assertOrigin(request('https://www.dmd2026.com'), { VERCEL: '1' }));
  assert.throws(() => assertOrigin(request('https://www.dmd2026.com.evil.test'), { VERCEL: '1' }));
  assert.throws(() => assertOrigin(request('https://dmd2026.com.evil.test'), { VERCEL: '1' }));
  assert.throws(() => assertOrigin(request(null), { VERCEL: '1' }));
});
test('missing server secrets fail closed', () => {
  assert.equal(configuration({ SUBMISSIONS_ENABLED: 'true' }).enabled, false);
  assert.equal(configuration({ SUBMISSIONS_ENABLED: 'true', BLOB_READ_WRITE_TOKEN: 'dummy', SUBMISSION_GITHUB_TOKEN: 'dummy', SUBMISSION_SIGNING_SECRET: 'short' }).enabled, false);
});
test('ZIP normalizes a single wrapper and preserves files with Korean names', async () => {
  const archive = await readSiteArchive(await zip([{ path: '웹사이트/index.html', content: '<!doctype html><h1>hello</h1>' }, { path: '웹사이트/images/그림.svg', content: '<svg/>' }, { path: '__MACOSX/._index.html' }]));
  assert.deepEqual(archive.files.map(file => file.path), ['index.html', 'images/그림.svg']);
});
test('root index wins over indexes in subpages', async () => {
  const archive = await readSiteArchive(await zip([{ path: 'index.html' }, { path: 'about/index.html' }]));
  assert.equal(archive.files.length, 2);
});
test('ambiguous or missing index is rejected', () => {
  assert.throws(() => siteRoot(['one/index.html', 'two/index.html']));
  assert.throws(() => siteRoot(['index.htm']));
  assert.throws(() => siteRoot(['Index.html']));
});
test('empty index and malformed ZIP are rejected', async () => {
  await assert.rejects(readSiteArchive(await zip([{ path: 'index.html', content: '' }])));
  await assert.rejects(readSiteArchive(Buffer.from('not a zip')));
});
test('path traversal, backslashes, absolute and encoded paths are rejected', () => {
  for (const name of ['../index.html', '/index.html', 'a/../../b.js', 'C:/index.html', 'a\\index.html', 'a//index.html', '%2e%2e/index.html']) assert.throws(() => safeArchivePath(name));
});
test('development secrets, node_modules and scripts are rejected', async () => {
  for (const path of ['.env', '.git/config', 'node_modules/x/index.js', 'package.json', 'script.exe']) await assert.rejects(readSiteArchive(await zip([{ path: 'index.html' }, { path }])));
});
test('symbolic links are rejected', async () => {
  await assert.rejects(readSiteArchive(await zip([{ path: 'index.html' }, { path: 'link.js', options: { mode: 0o120777 } }])));
});
test('case-colliding filenames are rejected', async () => {
  await assert.rejects(readSiteArchive(await zip([{ path: 'index.html' }, { path: 'img/A.png' }, { path: 'img/a.png' }])));
});
test('declared expanded size, individual size, count limits are enforced before decompression', async () => {
  const data = await zip([{ path: 'index.html', content: 'x'.repeat(2000) }, { path: 'a.css' }]);
  await assert.rejects(readSiteArchive(data, { ...limits, fileBytes: 100 }));
  await assert.rejects(readSiteArchive(data, { ...limits, totalBytes: 100 }));
  await assert.rejects(readSiteArchive(data, { ...limits, files: 1 }));
});
test('ZIP CRC mismatch is rejected', async () => {
  const data = await zip([{ path: 'index.html', content: 'checksum' }]);
  const offset = data.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
  data.writeUInt32LE(123, offset + 16);
  await assert.rejects(readSiteArchive(data));
});
const submission = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', teamId: 'ilkko', slug: 'ilkko' };
const config = { repository: 'test/exhibition', branch: 'main', sitePath: 'cjdmd2026' };
const archive = { files: [{ path: 'index.html', content: Buffer.from('hi') }], bytes: 2 };
function mockGithub(existing = null) {
  const calls = [];
  const github = async (path, body) => {
    calls.push({ path, body });
    if (path.startsWith('/pulls?')) return existing ? [existing] : [];
    if (path.startsWith('/git/ref/heads/submissions/')) { const error = new Error(); error.githubStatus = 404; throw error; }
    if (path === '/git/ref/heads/main') return { object: { sha: 'base-commit' } };
    if (path === '/git/commits/base-commit') return { tree: { sha: 'base-tree' } };
    if (path.startsWith('/git/trees/base-tree')) return { tree: [], truncated: false };
    if (path === '/git/blobs') return { sha: 'uploaded-blob' };
    if (path === '/git/trees') return { sha: body.base_tree ? 'root-tree' : 'team-tree' };
    if (path === '/git/commits') return { sha: 'new-commit' };
    if (path === '/git/refs') return {};
    if (path === '/pulls') return { number: 12, html_url: 'https://github.com/test/exhibition/pull/12' };
    throw new Error(`Unexpected API call: ${path}`);
  };
  return { github, calls };
}
test('GitHub submission atomically replaces one team subtree on a new PR branch', async () => {
  const { github, calls } = mockGithub();
  const result = await submitToGithub(submission, archive, { github, config });
  assert.equal(result.number, 12);
  const root = calls.find(call => call.path === '/git/trees' && call.body.base_tree);
  assert.deepEqual(root.body.tree, [{ path: 'cjdmd2026/ilkko', mode: '040000', type: 'tree', sha: 'team-tree' }]);
  assert.equal(calls.find(call => call.path === '/git/refs').body.ref, `refs/heads/submissions/ilkko/${submission.id}`);
  assert.equal(calls.find(call => call.path === '/pulls').body.base, 'main');
  assert.equal(calls.some(call => call.path.includes('/merges')), false);
});
test('repeated callback reuses the existing pull request', async () => {
  const existing = { number: 9 };
  const { github, calls } = mockGithub(existing);
  assert.equal((await submitToGithub(submission, archive, { github, config })).number, 9);
  assert.equal(calls.length, 1);
});
test('resumed processing skips already uploaded Git blobs', async () => {
  const { github, calls } = mockGithub();
  const sha = createHash('sha1').update('blob 2\0').update('hi').digest('hex');
  await submitToGithub(submission, archive, { github, config, checkpoint: [sha] });
  assert.equal(calls.some(call => call.path === '/git/blobs'), false);
});
test('folder processing loads files individually and skips storage downloads for checkpointed files', async () => {
  const sha = createHash('sha1').update('blob 2\0').update('hi').digest('hex');
  let loads = 0;
  const folder = { files: [{ path: 'index.html', gitSha: sha, load: async () => { loads++; return Buffer.from('hi'); } }], bytes: 2 };
  await submitToGithub(submission, folder, { ...mockGithub(), config, checkpoint: [sha] });
  assert.equal(loads, 0);
  await submitToGithub(submission, folder, { ...mockGithub(), config });
  assert.equal(loads, 1);
  await assert.rejects(submitToGithub(submission, { ...folder, files: [{ ...folder.files[0], load: async () => Buffer.from('no') }] }, { ...mockGithub(), config }));
});
test('unconfigured API cannot accept files and does not expose secret names', async () => {
  const previous = process.env.SUBMISSIONS_ENABLED;
  process.env.SUBMISSIONS_ENABLED = 'false';
  try {
    const result = await handleRequest(new Request('http://localhost:4173/api/submission?action=config'));
    const body = await result.json();
    assert.equal(body.enabled, false);
    assert.equal(JSON.stringify(body).includes('TOKEN'), false);
    const submit = await handleRequest(new Request('http://localhost:4173/api/submission?action=prepare', { method: 'POST', body: '{}' }));
    assert.equal(submit.status, 503);
  } finally { if (previous === undefined) delete process.env.SUBMISSIONS_ENABLED; else process.env.SUBMISSIONS_ENABLED = previous; }
});
