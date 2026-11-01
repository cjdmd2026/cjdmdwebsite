import { createHash } from 'node:crypto';
import { configuration, targetPath, SubmissionError } from './policy.mjs';
import { findTeam } from './teams.mjs';

export function githubClient(token = process.env.SUBMISSION_GITHUB_TOKEN, repository = configuration().repository, fetcher = fetch, deadline = Infinity) {
  return async function github(path, body, method = body ? 'POST' : 'GET') {
    if (Date.now() > deadline - 1000) throw new SubmissionError('이어서 처리하고 있습니다.', 503);
    const response = await fetcher(`https://api.github.com/repos/${repository}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', 'User-Agent': 'cjdmd2026-submissions' },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(Math.min(20000, Math.max(1000, Math.floor(deadline - Date.now())))),
    });
    if (!response.ok) {
      const error = new SubmissionError(response.status === 403 || response.status === 429 ? '저장소가 잠시 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.' : '저장소에 제출 내용을 전달하지 못했습니다. 담당자에게 접수 번호를 알려주세요.', 502);
      error.githubStatus = response.status;
      if (response.status === 429 || (response.status === 403 && (response.headers.get('retry-after') || response.headers.get('x-ratelimit-remaining') === '0'))) {
        error.retryAfterMs = Math.max(65000, Number(response.headers.get('retry-after') || 0) * 1000);
      }
      throw error;
    }
    return response.status === 204 ? null : response.json();
  };
}
export async function existingPullRequest(submission, github, config) {
  const branch = `submissions/${submission.slug}/${submission.id}`;
  const [owner] = config.repository.split('/');
  const pulls = await github(`/pulls?state=all&head=${encodeURIComponent(`${owner}:${branch}`)}&base=${encodeURIComponent(config.branch)}`);
  return pulls[0] || null;
}
export async function submitToGithub(submission, archive, { github = githubClient(), config = configuration(), checkpoint = [], onProgress = async () => {} } = {}) {
  const team = findTeam(submission.teamId);
  const branch = `submissions/${team.slug}/${submission.id}`;
  const target = targetPath(team.id, config.sitePath);
  const existing = await existingPullRequest(submission, github, config);
  if (existing) return existing;
  let branchExists = false;
  try { await github(`/git/ref/heads/${branch}`); branchExists = true; } catch (error) { if (error.githubStatus !== 404) throw error; }
  if (!branchExists) {
    const base = await github(`/git/ref/heads/${config.branch}`);
    const commit = await github(`/git/commits/${base.object.sha}`);
    // Reuse unchanged Git blobs; all new content is confined to one team subtree.
    const original = await github(`/git/trees/${commit.tree.sha}?recursive=1`);
    const known = new Set([...checkpoint, ...(original.truncated ? [] : original.tree.filter(item => item.type === 'blob').map(item => item.sha))]);
    const saved = new Set(checkpoint);
    const tree = [];
    let done = 0;
    for (const file of archive.files) {
      const expectedSha = createHash('sha1').update(`blob ${file.content.length}\0`).update(file.content).digest('hex');
      let sha = expectedSha;
      if (!known.has(sha)) {
        const blob = await github('/git/blobs', { content: file.content.toString('base64'), encoding: 'base64' });
        sha = blob.sha;
        known.add(sha);
      }
      tree.push({ path: file.path, mode: '100644', type: 'blob', sha });
      saved.add(sha);
      done++;
      if (done === 1 || done % 10 === 0 || done === archive.files.length) await onProgress(done, archive.files.length, [...saved]);
    }
    // A new subtree replaces only this team's contents (including removed files).
    const siteTree = await github('/git/trees', { tree });
    const rootTree = await github('/git/trees', { base_tree: commit.tree.sha, tree: [{ path: target, mode: '040000', type: 'tree', sha: siteTree.sha }] });
    const next = await github('/git/commits', { message: `[웹사이트 제출] ${team.name} (${submission.id.slice(0, 8)})`, tree: rootTree.sha, parents: [base.object.sha] });
    await github('/git/refs', { ref: `refs/heads/${branch}`, sha: next.sha });
  }
  const body = [
    `${team.name} 팀의 웹사이트 제출입니다.`, '',
    `- 대상 폴더: \`${target}/\``,
    `- 반영 후 주소: https://dmd2026.com/${team.slug}/`,
    `- 접수 번호: \`${submission.id}\``,
    `- 파일: ${archive.files.length}개 / ${(archive.bytes / 1024 ** 2).toFixed(1)} MiB`, '',
    '이 제출은 팀 목록에서 선택해 접수했으며 제출자의 소속을 인증하지 않습니다. 팀과 파일을 확인한 후 병합해주세요.',
    '팀 폴더는 제출한 전체 파일로 교체됩니다. 이전 제출에만 있던 파일은 삭제됩니다.',
  ].join('\n');
  return github('/pulls', { title: `[웹사이트 제출] ${team.name}`, head: branch, base: config.branch, body, maintainer_can_modify: true });
}
