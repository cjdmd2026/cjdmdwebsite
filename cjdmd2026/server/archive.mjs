import yauzl from 'yauzl';
import { crc32 } from 'node:zlib';
import { limits, SubmissionError } from './policy.mjs';

const extensions = new Set('html htm css js mjs json jpg jpeg png gif webp avif svg ico bmp woff woff2 ttf otf eot mp4 webm ogg mp3 wav m4a glb gltf bin wasm txt xml pdf webmanifest map'.split(' '));
const forbiddenNames = new Set(['node_modules', 'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'vercel.json', 'netlify.toml']);
export function safeArchivePath(name) {
  if (!name || name.length > 240 || /[\\\x00-\x1f<>:"|?*%]/.test(name) || name.startsWith('/')) throw new SubmissionError('ZIP 안에 사용할 수 없는 파일 경로가 있습니다.');
  const path = name.replace(/\/$/, '').normalize('NFC');
  if (path.split('/').some(part => !part || part === '.' || part === '..')) throw new SubmissionError('ZIP 안에 폴더 밖을 가리키는 경로가 있습니다.');
  return path;
}
function ignore(path) {
  return path.split('/').some(part => part === '__MACOSX' || part === '.DS_Store' || part.startsWith('._'));
}
export function siteRoot(paths) {
  if (paths.includes('index.html')) return '';
  const first = paths[0]?.split('/') || [];
  let prefix = '';
  for (let i = 0; i < Math.min(first.length - 1, 6); i++) {
    prefix += `${first[i]}/`;
    if (!paths.every(path => path.startsWith(prefix))) break;
    if (paths.includes(`${prefix}index.html`)) return prefix;
  }
  throw new SubmissionError('첫 화면 index.html을 찾을 수 없습니다. index.html과 필요한 파일이 있는 웹사이트 폴더만 압축해주세요.');
}
export async function readSiteArchive(buffer, policy = limits) {
  if (!Buffer.isBuffer(buffer) || buffer.length > policy.zipBytes) throw new SubmissionError('ZIP 파일 용량이 제한을 초과했습니다.');
  let zip;
  try {
    zip = await new Promise((resolve, reject) => yauzl.fromBuffer(buffer, { lazyEntries: true, autoClose: false, strictFileNames: true, validateEntrySizes: true }, (error, file) => error ? reject(error) : resolve(file)));
    const entries = await new Promise((resolve, reject) => {
      const items = [];
      const seen = new Set();
      let total = 0;
      let count = 0;
      zip.on('error', reject);
      zip.on('entry', entry => {
        try {
          if (++count > policy.files * 3) throw new SubmissionError('ZIP 안의 항목 수가 너무 많습니다. 불필요한 폴더를 제외해주세요.');
          const path = safeArchivePath(entry.fileName);
          if ((entry.externalFileAttributes >>> 16 & 0xf000) === 0xa000) throw new SubmissionError('바로가기 또는 심볼릭 링크는 제출할 수 없습니다. 실제 파일을 넣어주세요.');
          if (entry.generalPurposeBitFlag & 1) throw new SubmissionError('암호가 설정된 ZIP은 제출할 수 없습니다.');
          if (ignore(path)) { zip.readEntry(); return; }
          if (path.split('/').some(part => part.startsWith('.') || forbiddenNames.has(part.toLowerCase()))) throw new SubmissionError('개발용·설정 파일이 포함되어 있습니다. .git, .env, node_modules 등을 제외하고 배포할 파일만 압축해주세요.');
          if (entry.fileName.endsWith('/')) { zip.readEntry(); return; }
          if (seen.has(path.toLowerCase())) throw new SubmissionError('이름이 중복되거나 대소문자만 다른 파일이 있습니다. 파일 이름을 정리해주세요.');
          seen.add(path.toLowerCase());
          if (entry.uncompressedSize > policy.fileBytes) throw new SubmissionError('개별 파일은 95 MiB까지 가능합니다. 큰 영상의 용량을 줄여주세요.');
          total += entry.uncompressedSize;
          if (total > policy.totalBytes || items.length >= policy.files) throw new SubmissionError('압축 해제 후 500 MiB, 최대 500개 파일까지 제출할 수 있습니다.');
          const extension = path.split('.').pop().toLowerCase();
          if (!extensions.has(extension)) throw new SubmissionError('웹사이트용이 아닌 파일이 있습니다. 디자인 원본이나 실행 파일을 제외하고 다시 압축해주세요.');
          items.push({ entry, path });
          zip.readEntry();
        } catch (error) { reject(error); }
      });
      zip.once('end', () => resolve(items));
      zip.readEntry();
    });
    const prefix = siteRoot(entries.map(item => item.path));
    const files = [];
    let expanded = 0;
    for (const { entry, path } of entries) {
      const stream = await new Promise((resolve, reject) => zip.openReadStream(entry, (error, result) => error ? reject(error) : resolve(result)));
      const chunks = [];
      let size = 0;
      let crc = 0;
      for await (const chunk of stream) {
        size += chunk.length;
        expanded += chunk.length;
        if (size > policy.fileBytes || expanded > policy.totalBytes) { stream.destroy(); throw new SubmissionError('압축 해제 용량이 제한을 초과했습니다.'); }
        crc = crc32(chunk, crc);
        chunks.push(chunk);
      }
      if (size !== entry.uncompressedSize || crc !== entry.crc32) throw new SubmissionError('ZIP 안의 파일이 손상되었습니다. 다시 압축해주세요.');
      files.push({ path: path.slice(prefix.length), content: Buffer.concat(chunks) });
    }
    if (!files.find(file => file.path === 'index.html')?.content.length) throw new SubmissionError('index.html 파일이 비어 있습니다.');
    return { files, bytes: expanded };
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    throw new SubmissionError('ZIP 파일을 읽을 수 없습니다. 정상적인 ZIP으로 다시 압축해주세요.');
  } finally { zip?.close(); }
}
