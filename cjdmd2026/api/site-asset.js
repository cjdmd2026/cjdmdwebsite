import { readFile } from 'node:fs/promises';
import { presignAsset } from '../server/r2.mjs';
import { parseAssetManifest } from '../server/site-assets.mjs';

let registry;
async function publishedAssets() {
  registry ||= readFile(new URL('../.generated/site-assets.json', import.meta.url), 'utf8').then(text => {
    const data = JSON.parse(text), files = new Map();
    if (data.version !== 1) throw new Error('Invalid asset registry');
    for (const [slug, assets] of Object.entries(data.teams)) for (const asset of parseAssetManifest({ version: 1, files: assets }, slug)) files.set(`${slug}/${asset.path}`, asset);
    return files;
  }).catch(error => { registry = undefined; throw error; });
  return registry;
}
export async function handleAsset(request, { assets = publishedAssets, sign = presignAsset } = {}) {
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405, headers: { ...headers, Allow: 'GET, HEAD' } });
  const query = new URL(request.url).searchParams;
  const path = query.get('path');
  if (!path || query.getAll('path').length !== 1) return new Response(null, { status: 404, headers });
  try {
    // Only the manifest bundled with THIS deployment is public. Never accept an R2 key.
    const asset = (await assets()).get(path);
    if (!asset) return new Response(null, { status: 404, headers });
    return new Response(null, { status: 307, headers: { ...headers, Location: await sign(asset.key, request.method), 'Cache-Control': 'public, max-age=300', 'Referrer-Policy': 'no-referrer' } });
  } catch (error) {
    console.error('Published asset unavailable', { path, errorType: error.name, code: error.code });
    return new Response(null, { status: 503, headers: { ...headers, 'Retry-After': '30' } });
  }
}
export default { fetch: handleAsset };
