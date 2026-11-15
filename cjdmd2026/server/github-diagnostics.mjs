import { folderLimits, fileSizeMessage } from '../submit/files.mjs';
import { SubmissionError } from './policy.mjs';

export function assertGithubFileSizes(files, limit = folderLimits.fileBytes) {
  for (const [index, file] of files.entries()) {
    const size = file.size ?? file.content?.length;
    if (size > limit) throw withFileContext(new SubmissionError(fileSizeMessage(file.path, size, limit), 413), file, index + 1);
  }
}

// Keep useful GitHub validation errors without storing request bodies or credentials.
export function githubErrorDetails(detail, { token, body } = {}) {
  const privateValues = [token];
  function collect(value, key) {
    if (typeof value === 'string' && !['encoding', 'mode', 'type'].includes(key)) privateValues.push(value);
    else if (value && typeof value === 'object') for (const [name, item] of Object.entries(value)) collect(item, name);
  }
  collect(body);
  function clean(value, limit = 1000) {
    if (typeof value !== 'string') return undefined;
    let text = value;
    for (const secret of privateValues) if (secret?.length >= 4) text = text.split(secret).join('[redacted]');
    return text.replace(/\b(?:Bearer|Basic)\s+\S+/gi, '[redacted]')
      .replace(/\b(?:gh[pousr]_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)\b/g, '[redacted]')
      .replace(/[A-Za-z0-9+/_=-]{80,}/g, '[redacted]')
      .replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, limit);
  }
  const errors = Array.isArray(detail?.errors) ? detail.errors.slice(0, 8).map(item => {
    if (typeof item === 'string') return { message: clean(item) };
    return Object.fromEntries(['resource', 'field', 'code', 'message'].flatMap(key => {
      const value = clean(item?.[key], key === 'message' ? 1000 : 120);
      return value === undefined ? [] : [[key, value]];
    }));
  }) : undefined;
  return { githubMessage: clean(detail?.message), githubErrors: errors };
}

export function withFileContext(error, file, index) {
  return Object.assign(error, { filePath: file.path, fileSize: file.size ?? file.content?.length, fileIndex: index });
}

// Explicit allowlist: never spread an Error or raw API response into persisted state.
export function githubDiagnostics(error) {
  const keys = ['githubStatus', 'githubMethod', 'githubPath', 'githubRequestId', 'githubRateLimited',
    'githubRateLimitRemaining', 'githubRateLimitReset', 'githubMessage', 'githubErrors', 'githubRequestBytes', 'filePath', 'fileSize', 'fileIndex'];
  return Object.fromEntries(keys.filter(key => error[key] !== undefined).map(key => [key, error[key]]));
}
