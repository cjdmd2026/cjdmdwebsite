import { createSHA256 } from 'hash-wasm';
import { validateImageContent } from './files.mjs';

export async function hashFile(file, path, onProgress = () => {}) {
  const hash = await createSHA256();
  const chunkBytes = 8 * 1024 ** 2;
  for (let offset = 0; offset < file.size; offset += chunkBytes) {
    const bytes = new Uint8Array(await file.slice(offset, offset + chunkBytes).arrayBuffer());
    if (offset === 0) validateImageContent(path, bytes);
    hash.update(bytes);
    onProgress(Math.min(file.size, offset + bytes.length));
  }
  return hash.digest('hex');
}
