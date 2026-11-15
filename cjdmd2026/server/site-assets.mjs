import { validateFiles, folderLimits, externalAsset, githubFileBytes } from '../submit/files.mjs';

export const assetManifestName = '.submission-assets.json';
export const assetManifestBytes = 1024 * 1024;
export const assetKey = (slug, hash) => `published-assets/${slug}/${hash}`;
const types = { jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', eot: 'application/vnd.ms-fontobject', mp4: 'video/mp4', webm: 'video/webm', ogg: 'audio/ogg', mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4', glb: 'model/gltf-binary', bin: 'application/octet-stream', wasm: 'application/wasm', pdf: 'application/pdf' };
export const assetContentType = path => types[path.split('.').at(-1).toLowerCase()] || 'application/octet-stream';

export function parseAssetManifest(value, slug) {
  if (!/^[a-z0-9-]+$/.test(slug) || value?.version !== 1 || !Array.isArray(value.files)) throw new Error('Invalid asset manifest');
  const validated = validateFiles(value.files, { requireIndex: false, allowEmpty: true });
  return validated.files.map((file, index) => {
    const item = value.files[index];
    if (file.path !== item.path || !externalAsset(file.path) || file.size <= githubFileBytes || file.size > folderLimits.fileBytes || !/^[a-f0-9]{40}$/.test(item.gitSha) || item.key !== assetKey(slug, file.sha256)) throw new Error('Invalid published asset');
    return { ...file, gitSha: item.gitSha, key: item.key };
  }).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}
export function serializeAssetManifest(files, slug) {
  const content = JSON.stringify({ version: 1, files: parseAssetManifest({ version: 1, files }, slug) }, null, 2) + '\n';
  if (Buffer.byteLength(content) > assetManifestBytes) throw new Error('Asset manifest too large');
  return content;
}
