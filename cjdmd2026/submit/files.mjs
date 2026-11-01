// Shared by the browser and server; server validation remains authoritative.
export const folderLimits = Object.freeze({ fileBytes: 95 * 1024 ** 2, totalBytes: 500 * 1024 ** 2, files: 500 });
const extensions = new Set('html htm css js mjs json jpg jpeg png gif webp avif svg ico bmp woff woff2 ttf otf eot mp4 webm ogg mp3 wav m4a glb gltf bin wasm txt xml pdf webmanifest map'.split(' '));
const forbidden = new Set(['node_modules', 'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'vercel.json', 'netlify.toml']);
export const ignoredFile = path => path.split('/').some(part => part === '__MACOSX' || part === '.DS_Store' || part.startsWith('._'));
export function validateFiles(input, { hashes = true, policy = folderLimits } = {}) {
  if (!Array.isArray(input) || !input.length || input.length > policy.files) throw new Error(`파일은 1개부터 ${policy.files}개까지 제출할 수 있습니다.`);
  const seen = new Set();
  let bytes = 0;
  const files = input.map(item => {
    if (typeof item.path !== 'string' || !item.path || item.path.length > 240 || /[\\\x00-\x1f<>:"|?*%]/.test(item.path)) throw new Error('사용할 수 없는 파일 경로가 있습니다.');
    const path = item.path.normalize('NFC');
    const parts = path.split('/');
    if (parts.some(part => !part || part.startsWith('.') || part.endsWith('.') || part.endsWith(' ') || forbidden.has(part.toLowerCase()))) throw new Error(`${path}: 개발용·설정 파일을 제외하고 배포할 파일만 선택해주세요.`);
    if (!extensions.has(path.split('.').pop().toLowerCase())) throw new Error(`${path}: 웹사이트용 파일만 제출할 수 있습니다. 디자인 원본과 압축 파일은 제외해주세요.`);
    const key = path.toLowerCase();
    if (seen.has(key)) throw new Error(`${path}: 이름이 중복되거나 대소문자만 다른 파일이 있습니다.`);
    seen.add(key);
    if (!Number.isSafeInteger(item.size) || item.size < 0 || item.size > policy.fileBytes) throw new Error(`${path}: 개별 파일은 95 MiB까지 가능합니다. 큰 영상은 용량을 줄이거나 외부 링크로 연결해주세요.`);
    bytes += item.size;
    if (bytes > policy.totalBytes) throw new Error('전체 파일 용량은 500 MiB까지 제출할 수 있습니다.');
    if (hashes && !/^[a-f0-9]{64}$/.test(item.sha256 || '')) throw new Error('파일 확인 정보가 올바르지 않습니다. 폴더를 다시 선택해주세요.');
    return { path, size: item.size, ...(hashes ? { sha256: item.sha256 } : {}) };
  });
  for (const file of files) {
    const parts = file.path.toLowerCase().split('/');
    for (let i = 1; i < parts.length; i++) if (seen.has(parts.slice(0, i).join('/'))) throw new Error('파일과 폴더 이름이 겹칩니다.');
  }
  if (!files.find(file => file.path === 'index.html')?.size) throw new Error('선택한 폴더의 바로 안에 내용이 있는 index.html이 필요합니다. React·Vite는 빌드된 폴더를 선택해주세요.');
  return { files, bytes };
}
export function folderSelection(input) {
  const selected = Array.from(input);
  const root = selected[0]?.webkitRelativePath?.split('/')[0];
  if (!root) throw new Error('파일 대신 웹사이트 폴더를 선택해주세요. PC의 최신 브라우저를 이용해주세요.');
  const entries = selected.map(file => {
    if (!file.webkitRelativePath.startsWith(`${root}/`)) throw new Error('한 개의 웹사이트 폴더를 선택해주세요.');
    return { file, path: file.webkitRelativePath.slice(root.length + 1), size: file.size };
  }).filter(entry => !ignoredFile(entry.path));
  const checked = validateFiles(entries, { hashes: false });
  return { name: root, bytes: checked.bytes, files: checked.files.map((entry, i) => ({ ...entry, file: entries[i].file })).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0) };
}
export function sameManifest(a, b) {
  return a.length === b.length && a.every((file, i) => file.path === b[i].path && file.size === b[i].size && file.sha256 === b[i].sha256);
}
