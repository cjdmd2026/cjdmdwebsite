import { folderLimits } from './files.mjs';

export { folderLimits as sourceLimits };
const excludedDirectories = new Set(['node_modules', '.git', '.github', '.vercel', '.next', '.nuxt', '.venv', 'venv', '__pycache__', '.idea', '.vscode', 'coverage', '__macosx']);
const dotfiles = new Set(['.env.example', '.gitignore', '.dockerignore', '.nvmrc', '.python-version']);
const names = new Set(['dockerfile', 'makefile', 'procfile', 'pipfile', 'pipfile.lock', 'gemfile', 'gemfile.lock', 'license', 'readme']);
const extensions = new Set('js mjs cjs ts tsx jsx json html htm css scss sass less vue svelte py pyi go mod sum rs toml lock rb php java kt cs csproj sln sql prisma graphql gql yaml yml md mdx txt xml ini cfg conf sh bash ps1 bat cmd csv jpg jpeg png gif webp avif svg ico woff woff2 ttf otf mp4 webm mp3 wav pdf glb gltf bin wasm webmanifest'.split(' '));
export function excludedSourceFile(path) {
  const parts = path.split('/').map(part => part.toLowerCase());
  return parts.some(part => excludedDirectories.has(part) || part === '.ds_store' || part.startsWith('._'));
}
export function validateSourceFiles(input, { hashes = true } = {}) {
  if (!Array.isArray(input) || !input.length || input.length > folderLimits.files) throw new Error('서버 원본은 1개부터 최대 2,000개까지 제출할 수 있습니다.');
  let bytes = 0;
  const seen = new Set();
  const files = input.map(item => {
    if (typeof item.path !== 'string' || !item.path || item.path.length > 240 || /[\\\x00-\x1f<>:"|?*%]/.test(item.path)) throw new Error('사용할 수 없는 파일 경로가 있습니다.');
    const path = item.path.normalize('NFC'), parts = path.split('/'), name = parts.at(-1).toLowerCase();
    if (parts.some((part, i) => !part || part.endsWith('.') || part.endsWith(' ') || (part.startsWith('.') && !(i === parts.length - 1 && dotfiles.has(part.toLowerCase())))) || excludedSourceFile(path)) throw new Error(`${path}: 숨김 파일·설치 패키지·캐시를 제외해주세요.`);
    if (/^(?:credentials|service[-_]?account)(?:[.-].*)?\.json$/i.test(name) || /^(?:id_rsa|id_ed25519|secrets?)(?:[.\-_]|$)/i.test(name) || /\.(?:pem|key|p12|pfx|sqlite|sqlite3|db)$/i.test(name)) throw new Error(`${path}: 비밀 키와 실제 데이터베이스 파일은 제출하지 마세요.`);
    if (!dotfiles.has(name) && !names.has(name) && !extensions.has(name.split('.').pop())) throw new Error(`${path}: 소스 코드와 실행 안내 파일만 제출해주세요. 압축 파일과 실행 파일은 제외해주세요.`);
    const key = path.toLowerCase();
    if (seen.has(key)) throw new Error(`${path}: 이름이 중복되거나 대소문자만 다른 파일이 있습니다.`);
    seen.add(key);
    if (!Number.isSafeInteger(item.size) || item.size < 0 || item.size > folderLimits.fileBytes) throw new Error(`${path}: 개별 파일은 95 MiB까지 제출할 수 있습니다.`);
    bytes += item.size;
    if (bytes > folderLimits.totalBytes) throw new Error('서버 원본 전체 용량은 500 MiB까지입니다.');
    if (hashes && !/^[a-f0-9]{64}$/.test(item.sha256 || '')) throw new Error('파일 확인 정보가 올바르지 않습니다. 폴더를 다시 선택해주세요.');
    return { path, size: item.size, ...(hashes ? { sha256: item.sha256 } : {}) };
  });
  for (const key of seen) {
    const parts = key.split('/');
    for (let i = 1; i < parts.length; i++) if (seen.has(parts.slice(0, i).join('/'))) throw new Error('파일과 폴더 이름이 겹칩니다.');
  }
  return { files, bytes };
}
export function sourceFolderSelection(input) {
  const selected = Array.from(input), root = selected[0]?.webkitRelativePath?.split('/')[0];
  if (!root) throw new Error('전체 서버 소스가 들어 있는 폴더를 선택해주세요.');
  const all = selected.map(file => {
    if (!file.webkitRelativePath.startsWith(`${root}/`)) throw new Error('한 개의 폴더를 선택해주세요.');
    return { path: file.webkitRelativePath.slice(root.length + 1), size: file.size, file };
  });
  const kept = all.filter(file => !excludedSourceFile(file.path));
  const checked = validateSourceFiles(kept, { hashes: false });
  return { name: root, skipped: all.length - kept.length, bytes: checked.bytes, files: checked.files.map((file, i) => ({ ...file, file: kept[i].file })).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0) };
}
export function validateSourceText(path, text) {
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{30,}|\bgithub_pat_[A-Za-z0-9_]{30,}|\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}|\bAKIA[A-Z0-9]{16}/.test(text)) throw new Error(`${path}: 비밀 키로 보이는 내용이 있습니다. 키를 제거하고 환경변수 이름만 남겨주세요.`);
  if (path.split('/').at(-1).toLowerCase() === '.env.example') {
    for (const line of text.split(/\r?\n/)) {
      if (!line.trim() || line.trim().startsWith('#')) continue;
      if (!/^(?:export\s+)?[A-Za-z_][A-Za-z0-9_]*\s*=\s*(?:#.*)?$/.test(line.trim())) throw new Error('.env.example은 API_KEY=처럼 값을 비워서 제출해주세요.');
    }
  }
}
export function sourceTextFile(path) {
  return !/\.(?:jpg|jpeg|png|gif|webp|avif|ico|woff2?|ttf|otf|mp4|webm|mp3|wav|pdf|glb|bin|wasm)$/i.test(path);
}
