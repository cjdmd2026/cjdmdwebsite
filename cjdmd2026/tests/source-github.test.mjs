import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { saveServerSource } from '../server/source-github.mjs';

test('server-source blob failures retain the file identity and GitHub diagnostics', async () => {
  const content = Buffer.from('source');
  const gitSha = createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
  const file = { path: 'src/server.js', size: content.length, gitSha, load: async () => content };
  const state = { sourceDestination: { repository: 'test/private', branch: 'main', id: 1 }, files: [file], details: {} };
  const failure = Object.assign(new Error(), { githubStatus: 422, githubMessage: 'Validation Failed', retryable: false });
  const github = async path => {
    if (path === '') return { private: true, full_name: 'test/private', default_branch: 'main', id: 1 };
    if (path === '/git/ref/heads/main') return { object: { sha: 'base' } };
    if (path.startsWith('/contents/')) throw Object.assign(new Error(), { githubStatus: 404 });
    if (path === '/git/blobs') throw failure;
    assert.fail(`Unexpected call: ${path}`);
  };
  await assert.rejects(saveServerSource({ id: 'receipt', slug: 'team' }, state, { files: [file] }, { github }), error => {
    assert.equal(error, failure); assert.equal(error.filePath, 'src/server.js');
    assert.equal(error.fileSize, 6); assert.equal(error.fileIndex, 1);
    assert.equal(error.githubStatus, 422); assert.equal(error.githubMessage, 'Validation Failed');
    return true;
  });
});
