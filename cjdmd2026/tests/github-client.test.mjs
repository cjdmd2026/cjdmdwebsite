import test from 'node:test';
import assert from 'node:assert/strict';
import { githubClient } from '../server/github.mjs';

test('GitHub transport loss and unreadable success responses are retryable without exposing payloads', async () => {
  for (const fetcher of [async () => { throw new TypeError('fetch failed'); }, async () => new Response('<html>gateway</html>')]) {
    const github = githubClient('test-token', 'test/repository', fetcher);
    await assert.rejects(github('/git/blobs', { content: 'private-content' }), error => {
      assert.ok(error.status >= 500);
      assert.equal(error.githubMethod, 'POST'); assert.equal(error.githubPath, '/git/blobs');
      assert.doesNotMatch(JSON.stringify(error), /test-token|private-content/);
      return true;
    });
  }
});

test('GitHub deadline yields a continuation without making another request', async () => {
  const github = githubClient('test', 'test/repository', async () => assert.fail('deadline must prevent fetch'), Date.now() - 1);
  await assert.rejects(github('/git/trees'), error => error.status === 503 && error.continuation === true);
});

test('GitHub rate limits are recognized from headers and secondary-limit messages', async () => {
  for (const data of [
    { status: 429, headers: { 'retry-after': '120' }, message: 'Too many requests', min: 120000 },
    { status: 403, headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(Math.ceil(Date.now() / 1000) + 3600) }, min: 3600000 },
    { status: 403, message: 'You have exceeded a secondary rate limit.', min: 65000 },
  ]) {
    const github = githubClient('test', 'test/repository', async () => Response.json({ message: data.message }, { status: data.status, headers: { ...data.headers, 'x-github-request-id': 'test-request' } }));
    await assert.rejects(github('/git/blobs'), error => error.githubStatus === data.status && error.retryAfterMs >= data.min && error.githubRequestId === 'test-request');
  }
});

test('GitHub permission denials retain their status and are not confused with rate limits', async () => {
  const github = githubClient('test', 'test/repository', async () => Response.json({ message: 'Resource not accessible by personal access token' }, { status: 403 }));
  await assert.rejects(github('/pulls?private=query'), error => error.githubStatus === 403 && error.retryAfterMs === undefined && error.githubPath === '/pulls');
});

test('retry hints accept HTTP dates and preserve rate metadata without raw response text', async () => {
  const reset = Math.ceil(Date.now() / 1000) + 7200;
  const github = githubClient('test-token', 'test/repository', async () => Response.json({ message: 'You have exceeded a secondary rate limit. private-content' }, { status: 403, headers: {
    'retry-after': new Date(Date.now() + 120000).toUTCString(), 'x-ratelimit-remaining': '123', 'x-ratelimit-reset': String(reset),
  } }));
  await assert.rejects(github('/git/blobs', { content: 'private-content' }), error => {
    assert.equal(error.githubRateLimited, true); assert.equal(error.retryable, true);
    assert.equal(error.githubRateLimitRemaining, 123); assert.equal(error.githubRateLimitReset, reset);
    assert.ok(error.retryAfterMs >= 118000 && error.retryAfterMs <= 120000);
    assert.doesNotMatch(JSON.stringify(error), /test-token|private-content/);
    return true;
  });
  const unavailable = githubClient('test', 'test/repository', async () => Response.json({}, { status: 503, headers: { 'retry-after': '120' } }));
  await assert.rejects(unavailable('/git/trees'), error => error.retryAfterMs === 120000 && error.githubRateLimitRemaining === undefined);
});

test('successful writes have no artificial pacing delay', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let requests = 0, complete = false;
  const github = githubClient('test', 'test/repository', async () => { requests++; return Response.json({ sha: 'saved' }); });
  const work = (async () => { for (let i = 0; i < 5; i++) await github('/git/blobs', { content: 'test' }); complete = true; })();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(complete, true, 'writes must finish without advancing any delay timers');
  await work; assert.equal(requests, 5);
});
