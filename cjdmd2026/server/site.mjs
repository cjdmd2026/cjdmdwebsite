import { targetPath, SubmissionError } from './policy.mjs';
import { applyFileChanges } from '../submit/files.mjs';
import { findTeam } from './teams.mjs';
import { assetManifestName, assetManifestBytes, parseAssetManifest } from './site-assets.mjs';

export async function siteSnapshot(teamId, github, config) {
  const base = await github(`/git/ref/heads/${config.branch}`);
  const commit = await github(`/git/commits/${base.object.sha}`);
  let treeSha = commit.tree.sha;
  for (const part of targetPath(teamId, config.sitePath).split('/')) {
    const tree = await github(`/git/trees/${treeSha}`);
    if (tree.truncated) throw new SubmissionError('전체 폴더 목록을 확인하지 못했습니다. 담당자에게 문의해주세요.', 409);
    const child = tree.tree.find(item => item.path === part);
    if (!child) return { baseCommit: base.object.sha, rootTree: commit.tree.sha, treeSha: null, files: [] };
    if (child.type !== 'tree') throw new SubmissionError('팀 폴더 경로가 파일과 겹칩니다. 담당자에게 문의해주세요.', 409);
    treeSha = child.sha;
  }
  const tree = await github(`/git/trees/${treeSha}?recursive=1`);
  if (tree.truncated) throw new SubmissionError('전체 파일 목록을 확인하지 못했습니다. 담당자에게 문의해주세요.', 409);
  const manifest = tree.tree.find(item => item.path === assetManifestName);
  let assets = [];
  if (manifest) {
    try {
      if (manifest.type !== 'blob' || manifest.mode !== '100644' || !Number.isSafeInteger(manifest.size) || manifest.size > assetManifestBytes) throw new Error();
      const blob = await github(`/git/blobs/${manifest.sha}`);
      if (blob.encoding !== 'base64' || typeof blob.content !== 'string' || blob.content.length > assetManifestBytes * 1.5) throw new Error();
      assets = parseAssetManifest(JSON.parse(Buffer.from(blob.content, 'base64').toString('utf8')), findTeam(teamId).slug);
    } catch (error) {
      if (error.githubStatus || error.continuation) throw error;
      throw new SubmissionError('대용량 파일 목록을 확인하지 못했습니다. 담당자에게 문의해주세요.', 409);
    }
  }
  const files = tree.tree.filter(item => item.type !== 'tree' && item.path !== assetManifestName).map(item => {
    if (item.type !== 'blob' || !['100644', '100755'].includes(item.mode) || !Number.isSafeInteger(item.size) || item.size < 0) throw new SubmissionError('지원하지 않는 저장소 파일이 있습니다. 담당자에게 문의해주세요.', 409);
    return { path: item.path, size: item.size, sha: item.sha, mode: item.mode };
  });
  const paths = new Set(files.map(file => file.path.toLowerCase()));
  for (const asset of assets) {
    if (paths.has(asset.path.toLowerCase())) throw new SubmissionError('대용량 파일과 저장소 파일 경로가 겹칩니다.', 409);
    files.push({ path: asset.path, size: asset.size, sha: asset.gitSha, mode: '100644', external: asset });
  }
  return { baseCommit: base.object.sha, rootTree: commit.tree.sha, treeSha, files };
}

export function checkSiteChanges(snapshot, changes) {
  if (changes.baseTreeSha !== undefined && snapshot.treeSha !== changes.baseTreeSha) throw new SubmissionError('다른 제출로 팀 폴더가 변경되었습니다. 편집을 취소하고 최신 목록에서 다시 확인해주세요.', 409);
  try { return applyFileChanges(snapshot.files, changes.files, changes.deletions); }
  catch (error) { throw new SubmissionError(error.message, 409); }
}
