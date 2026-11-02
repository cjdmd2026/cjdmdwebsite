import { createHash } from 'node:crypto';
import { findTeam } from './teams.mjs';
import { configuration, SubmissionError } from './policy.mjs';
import { validateSourceFiles, validateSourceText } from '../submit/source-files.mjs';

export function sourceConfiguration(env = process.env) {
  const repository = env.SERVER_SUBMISSION_REPOSITORY || '';
  const token = env.SERVER_SUBMISSION_GITHUB_TOKEN || '';
  const enabled = configuration(env).enabled && /^[\w.-]+\/[\w.-]+$/.test(repository) && repository.toLowerCase() !== configuration(env).repository.toLowerCase() && Boolean(token);
  return { enabled, repository, token };
}
export function validateServerSubmission(value) {
  try {
    const team = findTeam(value?.teamId);
    if (!team) throw new Error('목록에서 제출할 팀을 선택해주세요.');
    if (value.secretsExcluded !== true) throw new Error('실제 API 키와 개인정보를 제외했는지 확인해주세요.');
    const { files, bytes } = validateSourceFiles(value.files);
    const details = {};
    const fields = { runtime: 100, installCommand: 500, startCommand: 500, services: 2000, environment: 2000, notes: 4000 };
    for (const [key, length] of Object.entries(fields)) {
      const text = value.details?.[key];
      if (typeof text !== 'string' || text.length > length || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text)) throw new Error('실행 정보를 올바르게 입력해주세요.');
      details[key] = text.trim();
      validateSourceText('실행 정보', text);
    }
    if (!details.runtime || !details.installCommand || !details.startCommand) throw new Error('사용 기술, 설치 명령어, 실행 명령어를 입력해주세요.');
    if (details.environment && details.environment.split(/\r?\n/).some(line => line.trim() && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(line.trim()))) throw new Error('환경변수는 값 없이 이름만 한 줄에 하나씩 적어주세요.');
    return { mode: 'folder', purpose: 'server', teamId: team.id, slug: team.slug, files, details, totalFiles: files.length, totalBytes: bytes };
  } catch (error) { throw new SubmissionError(error.message); }
}
export function sourceFingerprint(state) {
  return createHash('sha256').update(JSON.stringify({ files: state.files, details: state.details })).digest('hex');
}
