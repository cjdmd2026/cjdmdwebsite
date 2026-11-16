import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { validateFiles, folderLimits } from '../submit/files.mjs';
import { hashFile } from '../submit/hash-file.mjs';
import { verifyFileStream } from '../server/folder.mjs';
import { createR2Storage } from '../server/r2.mjs';
import { storageBudgetBytes } from '../server/admission.mjs';
import { assetKey, assetManifestName, parseAssetManifest, serializeAssetManifest } from '../server/site-assets.mjs';
import { submitToGithub } from '../server/github.mjs';
import { siteSnapshot } from '../server/site.mjs';
import { handleAsset } from '../api/site-asset.js';

const MiB = 1024 ** 2;
const asset = { path: 'models/큰 모델.glb', size: 500 * MiB, sha256: 'a'.repeat(64), gitSha: 'b'.repeat(40), key: assetKey('ilkko', 'a'.repeat(64)) };
const config = { repository: 'test/exhibition', branch: 'main', sitePath: 'cjdmd2026' };
const submission = { id: '62c12225-8afa-478b-8a57-1aad5a411ad5', slug: 'ilkko', teamId: 'ilkko' };
const index = { path: 'index.html', type: 'blob', mode: '100644', size: 2, sha: 'c'.repeat(40) };
function githubFixture(assets = []) {
  const calls = [], content = serializeAssetManifest(assets, 'ilkko');
  async function github(path, body) {
    calls.push({ path, body });
    if (path.startsWith('/pulls?')) return [];
    if (path.startsWith('/git/ref/heads/submissions/')) throw Object.assign(new Error(), { githubStatus: 404 });
    if (path === '/git/ref/heads/main') return { object: { sha: 'base' } };
    if (path === '/git/commits/base') return { tree: { sha: 'root' } };
    if (path === '/git/trees/root') return { tree: [{ path: 'cjdmd2026', type: 'tree', sha: 'site' }] };
    if (path === '/git/trees/site') return { tree: [{ path: 'ilkko', type: 'tree', sha: 'team' }] };
    if (path === '/git/trees/team?recursive=1') return { tree: [index, ...(assets.length ? [{ path: assetManifestName, type: 'blob', mode: '100644', sha: 'manifest', size: Buffer.byteLength(content) }] : [])] };
    if (path === '/git/blobs/manifest') return { encoding: 'base64', content: Buffer.from(content).toString('base64') };
    if (path === '/git/blobs') return { sha: 'd'.repeat(40) };
    if (path === '/git/trees') return { sha: body.base_tree === 'root' ? 'new-root' : 'new-team' };
    if (path === '/git/commits') return { sha: 'new-commit' };
    if (path === '/git/refs') return {};
    if (path === '/pulls') return { number: 1 };
    throw new Error(`Unexpected ${path}`);
  }
  return { github, calls };
}

test('500 MiB media plus the website fits, while oversized media/code is rejected', () => {
  const files = [{ path: 'index.html', size: 2, sha256: 'c'.repeat(64) }, asset];
  assert.equal(validateFiles(files).bytes, 500 * MiB + 2);
  assert.throws(() => validateFiles([{ ...asset, size: folderLimits.fileBytes + 1 }], { requireIndex: false }), /500 MiB/);
  assert.throws(() => validateFiles([{ ...asset, path: 'index.html' }]), /32 MiB/);
  assert.equal(storageBudgetBytes({}), 8192 * MiB);
  assert.equal(storageBudgetBytes({ SUBMISSION_R2_BUDGET_MIB: '16384' }), 16384 * MiB);
  for (const value of ['0', '-1', 'bad', 'Infinity']) assert.throws(() => storageBudgetBytes({ SUBMISSION_R2_BUDGET_MIB: value }));
});

test('500 MiB browser and server verification uses bounded chunks and matching hashes', async () => {
  const chunk = Buffer.alloc(8 * MiB, 7), sha = createHash('sha256'), git = createHash('sha1').update(`blob ${asset.size}\0`);
  function* parts() { for (let n = 0; n < asset.size; n += chunk.length) yield chunk.subarray(0, Math.min(chunk.length, asset.size - n)); }
  for (const part of parts()) { sha.update(part); git.update(part); }
  const file = { ...asset, sha256: sha.digest('hex') };
  const verified = await verifyFileStream('test', file, {
    headBlob: async () => ({ size: asset.size, etag: 'verified-etag' }),
    getBlob: async () => ({ stream: parts(), blob: { etag: 'verified-etag' } }),
  });
  assert.equal(verified.gitSha, git.digest('hex'));
  assert.equal(verified.content, undefined);
  assert.equal(verified.etag, 'verified-etag');
  let maxRead = 0;
  const browserFile = { size: asset.size, slice(start, end) {
    const length = Math.min(end, asset.size) - start; maxRead = Math.max(maxRead, length);
    return { arrayBuffer: async () => chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + length) };
  } };
  assert.equal(await hashFile(browserFile, asset.path), file.sha256);
  assert.ok(maxRead <= 8 * MiB);
});

test('large uploads publish once to R2 and store only a manifest in GitHub', async () => {
  const f = githubFixture(); let copies = 0;
  const file = { ...asset, load: () => assert.fail('large file must not be loaded/base64 encoded'), publish: async () => { copies++; return asset; } };
  assert.equal((await submitToGithub(submission, { files: [file], bytes: file.size }, { github: f.github, config })).number, 1);
  assert.equal(copies, 1);
  assert.equal(f.calls.some(call => call.path === '/git/blobs'), false);
  const tree = f.calls.find(call => call.path === '/git/trees').body.tree;
  assert.equal(f.calls.find(call => call.path === '/git/trees').body.base_tree, 'team');
  assert.deepEqual(tree.map(file => file.path), [assetManifestName]);
  assert.deepEqual(parseAssetManifest(JSON.parse(tree[0].content), 'ilkko'), [asset]);
});

test('published media remains visible/editable and unchanged submissions create no writes', async () => {
  const f = githubFixture([asset]);
  const snapshot = await siteSnapshot('ilkko', f.github, config);
  assert.deepEqual(snapshot.files.map(file => file.path), ['index.html', asset.path]);
  assert.equal(snapshot.files[1].size, asset.size);
  assert.deepEqual(await submitToGithub(submission, { files: [], bytes: 0 }, { github: f.github, config }), { unchanged: true });
  assert.equal(f.calls.some(call => call.body), false);
});

test('explicit deletion removes public metadata; a small replacement goes back into GitHub', async () => {
  for (const files of [[], [{ path: asset.path, size: 3, content: Buffer.from('new') }]]) {
    const f = githubFixture([asset]);
    await submitToGithub(submission, { files, bytes: 3, deletions: files.length ? [] : [asset.path] }, { github: f.github, config });
    const tree = f.calls.filter(call => call.path === '/git/trees' && call.body.base_tree !== 'root').flatMap(call => call.body.tree);
    assert.deepEqual(tree.find(file => file.path === assetManifestName), { path: assetManifestName, mode: '100644', type: 'blob', sha: null });
    assert.equal(tree.some(file => file.path === asset.path), Boolean(files.length));
  }
});

test('asset metadata cannot expose temporary uploads, other teams, code or arbitrary URLs', () => {
  for (const change of [{ key: 'submissions/private/files/0' }, { key: assetKey('curo', asset.sha256) }, { key: 'https://example.com/file' }, { path: '../model.glb' }, { path: 'code.js' }, { gitSha: 'invalid' }]) {
    assert.throws(() => parseAssetManifest({ version: 1, files: [{ ...asset, ...change }] }, 'ilkko'));
  }
});

test('asset endpoint signs only published paths and preserves HEAD and Range redirects', async () => {
  const ports = { assets: async () => new Map([[`ilkko/${asset.path}`, asset]]), sign: async (key, method) => { assert.equal(key, asset.key); return `https://bucket.test/asset?method=${method}`; } };
  for (const method of ['GET', 'HEAD']) {
    const response = await handleAsset(new Request(`https://example.com/api/site-asset?path=${encodeURIComponent(`ilkko/${asset.path}`)}`, { method, headers: { Range: 'bytes=0-1023' } }), ports);
    assert.equal(response.status, 307); assert.equal(new URL(response.headers.get('Location')).searchParams.get('method'), method);
  }
  for (const path of ['submissions/private/files/0', asset.key, `curo/${asset.path}`]) assert.equal((await handleAsset(new Request(`https://example.com/api/site-asset?path=${encodeURIComponent(path)}`), ports)).status, 404);
  assert.equal((await handleAsset(new Request('https://example.com/api/site-asset?path=x', { method: 'POST' }), ports)).status, 405);
});

test('R2 copies the verified source with an ETag condition and retries without recopying', async () => {
  let exists = false, copies = 0;
  const config = { missing: [], bucket: 'test-bucket' };
  const r2 = createR2Storage({ config, client: { async send(command) {
    if (command.constructor.name === 'HeadObjectCommand') { if (!exists) throw Object.assign(new Error(), { name: 'NotFound' }); return { ContentLength: asset.size }; }
    assert.equal(command.constructor.name, 'CopyObjectCommand');
    assert.equal(command.input.CopySourceIfMatch, 'etag'); assert.equal(command.input.ContentType, 'model/gltf-binary');
    exists = true; copies++; return {};
  } } });
  for (let i = 0; i < 2; i++) await r2.publishAsset(`submissions/${submission.id}/files/0`, asset, 'model/gltf-binary', 'etag');
  assert.equal(copies, 1);
  await assert.rejects(r2.publishAsset('private/source', asset, 'model/gltf-binary', 'etag'));
});
