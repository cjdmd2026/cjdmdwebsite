import { createHmac } from 'node:crypto';
import { S3Client, GetObjectCommand, HeadObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { r2Configuration } from './r2.mjs';

const PREFIX = 'apuchika/';
const missing = error => ['NoSuchKey', 'NotFound'].includes(error.name) || error.$metadata?.httpStatusCode === 404;
const conflict = error => ['PreconditionFailed', 'ConditionalRequestConflict'].includes(error.name) || error.$metadata?.httpStatusCode === 412;

// Adapt the supplied Cloudflare Worker bucket API to the site's private R2 bucket.
// All keys are confined to this project's prefix, separate from student submissions.
export function createApuchikaBucket({ config = r2Configuration(), client } = {}) {
  let connection = client;
  const key = value => {
    if (!/^(badges|inquiries|limits)\/[a-zA-Z0-9./-]*$/.test(value) || value.includes('..')) throw new Error('Invalid Apuchika storage key');
    return PREFIX + value;
  };
  const send = command => {
    if (config.missing?.length) throw Object.assign(new Error('Apuchika storage not configured'), { status: 503 });
    connection ||= new S3Client({ region: 'auto', endpoint: config.endpoint, credentials: config.credentials, forcePathStyle: true, requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', maxAttempts: 3 });
    return connection.send(command);
  };
  const bucket = {
    async put(path, body, options = {}) {
      await send(new PutObjectCommand({ Bucket: config.bucket, Key: key(path), Body: body,
        ContentType: options.httpMetadata?.contentType || 'application/json', CacheControl: 'private, no-store',
        Metadata: options.customMetadata, IfNoneMatch: '*' }));
    },
    async get(path) {
      try {
        const value = await send(new GetObjectCommand({ Bucket: config.bucket, Key: key(path) }));
        return { body: value.Body.transformToWebStream(), size: value.ContentLength, customMetadata: value.Metadata };
      } catch (error) { if (missing(error)) return null; throw error; }
    },
    async head(path) {
      try {
        const value = await send(new HeadObjectCommand({ Bucket: config.bucket, Key: key(path) }));
        return { size: value.ContentLength, customMetadata: value.Metadata };
      } catch (error) { if (missing(error)) return null; throw error; }
    },
    async list({ prefix, limit = 64 }) {
      const value = await send(new ListObjectsV2Command({ Bucket: config.bucket, Prefix: key(prefix), MaxKeys: Math.min(limit, 64) }));
      return { objects: (value.Contents || []).map(item => ({ key: item.Key.slice(PREFIX.length) })) };
    },
    async delete(paths) {
      const values = Array.isArray(paths) ? paths : [paths];
      if (!values.length) return;
      const result = await send(new DeleteObjectsCommand({ Bucket: config.bucket, Delete: { Objects: values.map(path => ({ Key: key(path) })), Quiet: true } }));
      if (result.Errors?.length) throw new Error('Apuchika deletion failed');
    },
    async limit(ip, kind, now = Date.now()) {
      const digest = createHmac('sha256', config.credentials.secretAccessKey).update(ip).digest('hex').slice(0, 32);
      // Stable keys avoid accumulating a new counter object for every time window.
      for (const [path, window, maximum] of [
        [`limits/${kind}-${digest}.json`, Math.floor(now / 60000), 30],
        [`limits/${kind}-daily.json`, Math.floor(now / 86400000), 500],
      ]) {
        let saved = false;
        for (let attempt = 0; attempt < 4; attempt++) {
          let state, etag;
          try {
            const item = await send(new GetObjectCommand({ Bucket: config.bucket, Key: key(path) }));
            state = JSON.parse(await item.Body.transformToString()); etag = item.ETag;
            if (!etag) throw new Error('Missing rate counter ETag');
          } catch (error) { if (!missing(error)) throw error; }
          const count = state?.window === window ? state.count : 0;
          if (count >= maximum) throw Object.assign(new Error('요청이 많아요. 잠시 후 다시 시도해 주세요.'), { status: 429 });
          try {
            await send(new PutObjectCommand({ Bucket: config.bucket, Key: key(path), Body: JSON.stringify({ window, count: count + 1 }), ContentType: 'application/json', ...(etag ? { IfMatch: etag } : { IfNoneMatch: '*' }) }));
            saved = true; break;
          } catch (error) { if (!conflict(error)) throw error; }
        }
        if (!saved) throw Object.assign(new Error('요청이 겹쳤어요. 다시 시도해 주세요.'), { status: 429 });
      }
    },
  };
  return bucket;
}

let cached, fingerprint;
export function apuchikaBucket() {
  const config = r2Configuration();
  if (config.missing.length) return null;
  const next = JSON.stringify(config);
  if (!cached || fingerprint !== next) { cached = createApuchikaBucket({ config }); fingerprint = next; }
  return cached;
}
