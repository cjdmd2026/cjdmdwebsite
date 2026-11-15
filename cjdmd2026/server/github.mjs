import { createHash } from 'node:crypto';
import { configuration, targetPath, SubmissionError } from './policy.mjs';
import { findTeam } from './teams.mjs';
import { siteSnapshot, checkSiteChanges } from './site.mjs';
import { githubErrorDetails, githubDiagnostics, withFileContext, assertGithubFileSizes } from './github-diagnostics.mjs';
import { githubFileBytes, externalAsset } from '../submit/files.mjs';
import { assetManifestName, serializeAssetManifest, parseAssetManifest } from './site-assets.mjs';

export function githubClient(token = process.env.SUBMISSION_GITHUB_TOKEN, repository = configuration().repository, fetcher = fetch, deadline = Infinity) {
  return async function github(path, body, method = body ? 'POST' : 'GET') {
    if (Date.now() > deadline - 1000) throw Object.assign(new SubmissionError('이어서 처리하고 있습니다.', 503), { continuation: true });
    const payload = body ? JSON.stringify(body) : undefined;
    const context = { githubMethod: method, githubPath: path.split('?')[0], ...(payload ? { githubRequestBytes: Buffer.byteLength(payload) } : {}) };
    let response;
    try { response = await fetcher(`https://api.github.com/repos/${repository}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', 'User-Agent': 'cjdmd2026-submissions' },
      body: payload,
      signal: AbortSignal.timeout(Math.min(20000, Math.max(1000, Math.floor(deadline - Date.now())))),
    }); } catch {
      // A lost response is reconciled by the receipt/branch/PR checks on resume.
      throw Object.assign(new SubmissionError('저장소 연결을 다시 시도하고 있습니다.', 503), context);
    }
    if (!response.ok) {
      const error = new SubmissionError(response.status === 403 || response.status === 429 ? '저장소가 잠시 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.' : '저장소에 제출 내용을 전달하지 못했습니다. 담당자에게 접수 번호를 알려주세요.', 502);
      error.githubStatus = response.status;
      const numericHeader = name => {
        const value = response.headers.get(name);
        return value !== null && value.trim() !== '' && Number.isFinite(Number(value)) ? Number(value) : undefined;
      };
      const remaining = numericHeader('x-ratelimit-remaining');
      const resetAt = numericHeader('x-ratelimit-reset');
      const retryAfter = response.headers.get('retry-after');
      const seconds = retryAfter === null || retryAfter.trim() === '' ? NaN : Number(retryAfter);
      const after = Math.max(0, Number.isFinite(seconds) ? seconds * 1000 : (Date.parse(retryAfter || '') || 0) - Date.now());
      Object.assign(error, context, { githubRequestId: response.headers.get('x-github-request-id'), githubRateLimitRemaining: remaining, githubRateLimitReset: resetAt });
      const detail = await response.json().catch(() => ({}));
      Object.assign(error, githubErrorDetails(detail, { token, body }));
      const limited = response.status === 429 || (response.status === 403 && (retryAfter !== null || remaining === 0 || /rate[\s-]?limit|abuse detection/i.test(detail?.message || '')));
      error.githubRateLimited = Boolean(limited);
      error.retryable = Boolean(limited) || [408, 425].includes(response.status) || response.status >= 500;
      if (limited) {
        const reset = remaining === 0 && resetAt !== undefined ? resetAt * 1000 - Date.now() + 1000 : 0;
        error.retryAfterMs = Math.max(65000, Number.isFinite(after) ? after : 0, Number.isFinite(reset) ? reset : 0);
      } else if (error.retryable && after > 0) error.retryAfterMs = after;
      throw error;
    }
    if (response.status === 204) return null;
    try { return await response.json(); }
    catch { throw Object.assign(new SubmissionError('저장소 응답을 다시 확인하고 있습니다.', 502), context); }
  };
}
export async function existingPullRequest(submission, github, config) {
  const branch = `submissions/${submission.slug}/${submission.id}`;
  const [owner] = config.repository.split('/');
  const pulls = await github(`/pulls?state=all&head=${encodeURIComponent(`${owner}:${branch}`)}&base=${encodeURIComponent(config.branch)}`);
  return pulls[0] || null;
}
export async function submitToGithub(submission, archive, { github = githubClient(), config = configuration(), checkpoint = [], onProgress = async () => {} } = {}) {
  assertGithubFileSizes(archive.files);
  const team = findTeam(submission.teamId);
  const branch = `submissions/${team.slug}/${submission.id}`;
  const target = targetPath(team.id, config.sitePath);
  const existing = await existingPullRequest(submission, github, config);
  if (existing) return existing;
  let branchExists = false;
  try { await github(`/git/ref/heads/${branch}`); branchExists = true; } catch (error) { if (error.githubStatus !== 404) throw error; }
  if (!branchExists) {
    const snapshot = await siteSnapshot(team.id, github, config);
    const combined = checkSiteChanges(snapshot, { files: archive.files.map(file => ({ ...file, size: file.size ?? file.content?.length })), deletions: archive.deletions || [], baseTreeSha: archive.baseTreeSha });
    // Start from the current team files, retaining everything not explicitly removed.
    const known = new Set([...checkpoint, ...snapshot.files.filter(item => !item.external).map(item => item.sha)]);
    const saved = new Set(checkpoint);
    const tree = new Map(combined.files.filter(file => !file.external).map(file => [file.path, { path: file.path, mode: file.mode || '100644', type: 'blob', sha: file.sha }]));
    const assets = new Map(combined.files.filter(file => file.external).map(file => [file.path, file.external]));
    let done = 0;
    for (const file of archive.files) {
      if ((file.size ?? file.content?.length) > githubFileBytes) {
        try {
          if (!externalAsset(file.path) || !file.publish) throw Object.assign(new SubmissionError('큰 미디어 파일은 폴더 업로드로 다시 제출해주세요. HTML·CSS·JS 등 코드는 파일당 32 MiB까지 가능합니다.', 413), { retryable: false });
          const asset = parseAssetManifest({ version: 1, files: [await file.publish()] }, team.slug)[0];
          if (asset.path !== file.path || asset.size !== file.size || asset.gitSha !== file.gitSha || asset.sha256 !== file.sha256) throw new SubmissionError('대용량 파일 검증 정보가 일치하지 않습니다.', 422);
          assets.set(file.path, asset);
          tree.delete(file.path);
          done++;
          await onProgress(done, archive.files.length, [...saved]);
          continue;
        } catch (error) { throw withFileContext(error, file, done + 1); }
      }
      assets.delete(file.path);
      let content = file.content;
      const expectedSha = file.gitSha || createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
      let sha = expectedSha;
      const needsSave = !known.has(sha);
      if (needsSave) {
        try {
          content ??= await file.load();
          if (file.gitSha && createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex') !== file.gitSha) throw new SubmissionError('파일 검증에 실패했습니다. 다시 제출해주세요.');
          const blob = await github('/git/blobs', { content: content.toString('base64'), encoding: 'base64' });
          sha = blob.sha;
          known.add(sha);
        } catch (error) { throw withFileContext(error, file, done + 1); }
      }
      tree.set(file.path, { path: file.path, mode: '100644', type: 'blob', sha });
      saved.add(sha);
      done++;
      // Persist every newly saved blob so a later failure never loses a batch.
      if (needsSave || done === 1 || done % 10 === 0 || done === archive.files.length) await onProgress(done, archive.files.length, [...saved]);
    }
    // An identical selection needs no GitHub write, including tree creation.
    const previousFiles = snapshot.files.filter(file => !file.external);
    const manifest = serializeAssetManifest([...assets.values()], team.slug);
    const previousManifest = serializeAssetManifest(snapshot.files.filter(file => file.external).map(file => file.external), team.slug);
    if (manifest === previousManifest && tree.size === previousFiles.length && previousFiles.every(file => {
      const next = tree.get(file.path);
      return next?.sha === file.sha && next.mode === (file.mode || '100644');
    })) return { unchanged: true };
    if (assets.size) tree.set(assetManifestName, { path: assetManifestName, mode: '100644', type: 'blob', content: manifest });
    const siteTree = await github('/git/trees', { tree: [...tree.values()] });
    if (siteTree.sha === snapshot.treeSha) return { unchanged: true };
    const rootTree = await github('/git/trees', { base_tree: snapshot.rootTree, tree: [{ path: target, mode: '040000', type: 'tree', sha: siteTree.sha }] });
    const next = await github('/git/commits', { message: `[웹사이트 제출] ${team.name} (${submission.id.slice(0, 8)})`, tree: rootTree.sha, parents: [snapshot.baseCommit] });
    await github('/git/refs', { ref: `refs/heads/${branch}`, sha: next.sha });
  }
  const body = [
    `${team.name} 팀의 웹사이트 제출입니다.`, '',
    `- 대상 폴더: \`${target}/\``,
    `- 반영 후 주소: https://dmd2026.com/${team.slug}/`,
    `- 접수 번호: \`${submission.id}\``,
    `- 추가·교체: ${archive.files.length}개 / ${(archive.bytes / 1024 ** 2).toFixed(1)} MiB`,
    `- 명시적 삭제: ${(archive.deletions || []).length}개`, '',
    '이 제출은 팀 목록에서 선택해 접수했으며 제출자의 소속을 인증하지 않습니다. 서버가 팀 폴더와 변경 내용을 검증한 뒤 자동 병합합니다.',
    '기존 파일은 유지하며 같은 경로의 파일만 교체합니다. 삭제 목록에서 직접 선택한 파일만 제거합니다.',
  ].join('\n');
  return github('/pulls', { title: `[웹사이트 제출] ${team.name}`, head: branch, base: config.branch, body, maintainer_can_modify: true });
}

export async function mergeSubmission(submission, savedPull, { github = githubClient(), config = configuration() } = {}) {
  const team = findTeam(submission.teamId);
  const target = `${targetPath(team.id, config.sitePath)}/`;
  const branch = `submissions/${team.slug}/${submission.id}`;
  const problem = message => new SubmissionError(`${message} 파일은 PR #${savedPull.number}에 보관되어 있습니다. 담당자에게 접수 번호를 알려주세요.`, 409);
  if (!Number.isSafeInteger(savedPull.number) || !/^[a-f0-9]{40}$/.test(savedPull.head?.sha || '')) throw problem('병합할 제출 정보를 확인하지 못했습니다.');
  const pull = await github(`/pulls/${savedPull.number}`);
  if (pull.head?.ref !== branch || pull.base?.ref !== config.branch || pull.head?.repo?.full_name !== config.repository || pull.base?.repo?.full_name !== config.repository || pull.head?.sha !== savedPull.head.sha) {
    throw problem('접수 이후 제출 브랜치가 변경되어 자동 반영을 중단했습니다.');
  }
  // A lost response after a successful merge must not create a second PR/commit.
  if (pull.merged) return { merged: true, sha: pull.merge_commit_sha };
  if (savedPull.baseTreeSha !== undefined && (await siteSnapshot(team.id, github, config)).treeSha !== savedPull.baseTreeSha) throw problem('제출 중 팀 폴더가 변경되어 최신 파일을 보호하기 위해 자동 반영을 중단했습니다.');
  if (pull.state !== 'open' || pull.draft) throw problem('제출 PR이 닫혀 있거나 임시 상태여서 자동 반영하지 못했습니다.');
  if (pull.mergeable === null) {
    const error = new SubmissionError('저장소가 자동 반영 가능 여부를 확인하고 있습니다.', 503);
    error.retryAfterMs = 15000;
    throw error;
  }
  if (!pull.mergeable) throw problem('기존 파일과 충돌해 자동 반영하지 못했습니다.');
  // GitHub returns at most 3,000 changed files. Never merge an incomplete audit.
  if (!Number.isSafeInteger(pull.changed_files) || pull.changed_files < 1 || pull.changed_files > 3000) throw problem('변경 파일 목록을 모두 확인하지 못했습니다.');
  let checked = 0;
  for (let page = 1; checked < pull.changed_files; page++) {
    const files = await github(`/pulls/${pull.number}/files?per_page=100&page=${page}`);
    if (!files.length) throw problem('변경 파일 목록을 모두 확인하지 못했습니다.');
    for (const file of files) {
      if (!file.filename?.startsWith(target) || (file.previous_filename && !file.previous_filename.startsWith(target))) throw problem('선택한 팀 폴더 밖의 변경이 있어 자동 반영을 중단했습니다.');
    }
    checked += files.length;
  }
  if (checked !== pull.changed_files) throw problem('확인 중 제출 내용이 변경되었습니다.');
  const repository = await github('');
  const method = repository.allow_squash_merge ? 'squash' : repository.allow_merge_commit ? 'merge' : repository.allow_rebase_merge ? 'rebase' : null;
  if (!method) throw problem('저장소에서 허용된 병합 방식을 확인하지 못했습니다.');
  try {
    const result = await github(`/pulls/${pull.number}/merge`, { sha: savedPull.head.sha, merge_method: method }, 'PUT');
    if (!result.merged) throw problem('저장소가 자동 병합을 완료하지 못했습니다.');
    return result;
  } catch (error) {
    if (error.githubStatus === 403 && !error.retryAfterMs) throw Object.assign(problem('저장소 권한 또는 보호 규칙 때문에 자동 반영하지 못했습니다.'), githubDiagnostics(error));
    if ([405, 409, 422].includes(error.githubStatus)) throw Object.assign(problem('저장소 보호 규칙, 충돌 또는 제출 변경으로 자동 반영하지 못했습니다.'), githubDiagnostics(error));
    throw error;
  }
}
