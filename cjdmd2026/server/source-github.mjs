import { createHash } from 'node:crypto';
import { SubmissionError } from './policy.mjs';
import { sourceFingerprint } from './source-policy.mjs';

export async function checkSourceRepository(github, expected = {}) {
  const repo = await github('');
  if (repo.private !== true || repo.archived || repo.disabled || !repo.default_branch || (expected.repository && repo.full_name?.toLowerCase() !== expected.repository.toLowerCase()) || (expected.id && repo.id !== expected.id)) throw new SubmissionError('서버 원본을 보관할 비공개 저장소 설정을 확인해야 합니다. 담당자에게 알려주세요.', 503);
  if (repo.permissions?.push === false) throw new SubmissionError('서버 원본 저장소에 쓰기 권한이 없습니다. 담당자에게 알려주세요.', 503);
  const branch = expected.branch || repo.default_branch;
  try { await github(`/git/ref/heads/${encodeURIComponent(branch)}`); }
  catch (error) {
    if ([404, 409].includes(error.githubStatus)) throw new SubmissionError('서버 원본 저장소에 README와 기본 브랜치를 먼저 만들어주세요.', 503);
    throw error;
  }
  return { repository: repo.full_name, id: repo.id, branch };
}

// Source is archived as data under a receipt directory. No code is installed,
// executed, merged into the exhibition, or placed in a root workflow directory.
export async function saveServerSource(submission, state, archive, { github, onProgress = async () => {} }) {
  const destination = state.sourceDestination;
  await checkSourceRepository(github, destination);
  const target = `server-submissions/${submission.slug}/${submission.id}`;
  const fingerprint = sourceFingerprint(state);
  const refPath = `/git/ref/heads/${encodeURIComponent(destination.branch)}`;
  const base = (await github(refPath)).object.sha;
  try {
    const marker = await github(`/contents/${target}/submission.json?ref=${encodeURIComponent(base)}`);
    const previous = JSON.parse(Buffer.from(marker.content, 'base64').toString('utf8'));
    if (previous.receipt !== submission.id || previous.fingerprint !== fingerprint) throw new SubmissionError('같은 접수 번호의 보관 기록이 변경되었습니다. 담당자에게 알려주세요.', 409);
    return { commit: base, path: target };
  } catch (error) { if (error.githubStatus !== 404) throw error; }
  const known = new Set(state.checkpoint || []), tree = [];
  let done = 0;
  for (const file of archive.files) {
    const sha = file.gitSha;
    if (!/^[a-f0-9]{40}$/.test(sha || '')) throw new SubmissionError('서버 원본의 검증 기록이 올바르지 않습니다.');
    if (!known.has(sha)) {
      const content = await file.load();
      const actual = createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
      if (actual !== sha) throw new SubmissionError('파일 내용이 변경되었습니다. 다시 제출해주세요.');
      const saved = await github('/git/blobs', { content: content.toString('base64'), encoding: 'base64' });
      if (saved.sha !== sha) throw new SubmissionError('저장소의 파일 검증에 실패했습니다.', 502);
      known.add(sha);
    }
    tree.push({ path: file.path, mode: '100644', type: 'blob', sha });
    if (++done === 1 || done % 10 === 0 || done === archive.files.length) await onProgress(done, archive.files.length, [...known]);
  }
  const sourceTree = await github('/git/trees', { tree });
  const record = { receipt: submission.id, teamId: submission.teamId, slug: submission.slug, receivedAt: new Date(state.createdAt).toISOString(), fingerprint, details: state.details, files: state.files, sourceTree: sourceTree.sha, warning: '접수된 원본입니다. 실행·배포 전 검토가 필요합니다. 제출자의 팀 소속은 인증되지 않았습니다.' };
  const recordTree = await github('/git/trees', { tree: [
    { path: 'source', mode: '040000', type: 'tree', sha: sourceTree.sha },
    { path: 'submission.json', mode: '100644', type: 'blob', content: JSON.stringify(record, null, 2) },
  ] });
  const commit = await github(`/git/commits/${base}`);
  const root = await github('/git/trees', { base_tree: commit.tree.sha, tree: [{ path: target, mode: '040000', type: 'tree', sha: recordTree.sha }] });
  const next = await github('/git/commits', { message: `[서버 원본 접수] ${submission.slug} (${submission.id.slice(0, 8)})`, tree: root.sha, parents: [base] });
  // Recheck visibility before publishing the commit and never force-update a ref.
  await checkSourceRepository(github, destination);
  try { await github(`/git/refs/heads/${encodeURIComponent(destination.branch)}`, { sha: next.sha, force: false }, 'PATCH'); }
  catch (error) {
    if ([409, 422].includes(error.githubStatus)) throw new SubmissionError('저장소의 최신 변경과 함께 다시 접수하고 있습니다.', 503);
    throw error;
  }
  return { commit: next.sha, path: target };
}
