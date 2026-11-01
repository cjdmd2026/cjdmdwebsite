import { S3Client, GetObjectCommand, HeadObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export function r2Configuration(env = process.env) {
  const missing = ['R2_ACCOUNT_ID', 'R2_BUCKET_NAME', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'].filter(key => !env[key]);
  if (env.R2_ACCOUNT_ID && !/^[a-f0-9]{32}$/i.test(env.R2_ACCOUNT_ID)) missing.push('R2_ACCOUNT_ID_FORMAT');
  if (env.R2_BUCKET_NAME && (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(env.R2_BUCKET_NAME) || env.R2_BUCKET_NAME.includes('..'))) missing.push('R2_BUCKET_NAME_FORMAT');
  return { missing, bucket: env.R2_BUCKET_NAME, endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY } };
}
export class StorageConflictError extends Error {
  constructor() { super('Storage write conflict'); this.status = 412; }
}
export class StorageNotFoundError extends Error {
  constructor() { super('Storage object not found'); this.status = 404; }
}
export class StorageUnavailableError extends Error {
  constructor(code = 'Unavailable') { super('Submission storage unavailable'); this.status = 503; this.code = code; }
}
export function createR2Storage({ config = r2Configuration(), client, sign = getSignedUrl } = {}) {
  let connection = client;
  function s3() {
    if (config.missing?.length) throw new StorageUnavailableError('NotConfigured');
    return connection ||= new S3Client({ region: 'auto', endpoint: config.endpoint, credentials: config.credentials, forcePathStyle: true,
      requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', maxAttempts: 3 });
  }
  async function send(command) {
    try { return await s3().send(command); }
    catch (error) {
      if (error instanceof StorageUnavailableError) throw error;
      if (error.$metadata?.httpStatusCode === 412 || error.name === 'PreconditionFailed' || error.name === 'ConditionalRequestConflict') throw new StorageConflictError();
      if (['NoSuchKey', 'NotFound'].includes(error.name)) throw new StorageNotFoundError();
      throw new StorageUnavailableError(error.name || 'Unavailable');
    }
  }
  async function get(pathname) {
    try {
      const result = await send(new GetObjectCommand({ Bucket: config.bucket, Key: pathname }));
      return { stream: result.Body.transformToWebStream(), blob: { etag: result.ETag, size: result.ContentLength } };
    } catch (error) { if (error instanceof StorageNotFoundError) return null; throw error; }
  }
  async function head(pathname) {
    const result = await send(new HeadObjectCommand({ Bucket: config.bucket, Key: pathname }));
    return { size: result.ContentLength, etag: result.ETag };
  }
  async function writeJson(pathname, data, options = {}) {
    const body = JSON.stringify(data);
    const result = await send(new PutObjectCommand({ Bucket: config.bucket, Key: pathname, Body: body,
      ContentLength: Buffer.byteLength(body), ContentType: 'application/json', CacheControl: 'no-store',
      ...(options.ifMatch ? { IfMatch: options.ifMatch } : options.allowOverwrite ? {} : { IfNoneMatch: '*' }) }));
    if (!result.ETag) throw new StorageUnavailableError('MissingETag');
    return { pathname, etag: result.ETag };
  }
  async function list({ prefix = '', limit = 1000, cursor } = {}) {
    const result = await send(new ListObjectsV2Command({ Bucket: config.bucket, Prefix: prefix, MaxKeys: Math.min(1000, limit), ContinuationToken: cursor }));
    if (result.IsTruncated && !result.NextContinuationToken) throw new StorageUnavailableError('MissingCursor');
    return { blobs: (result.Contents || []).map(item => ({ pathname: item.Key, size: item.Size })), hasMore: Boolean(result.IsTruncated), cursor: result.NextContinuationToken };
  }
  async function del(paths) {
    const keys = Array.isArray(paths) ? paths : [paths];
    for (let i = 0; i < keys.length; i += 1000) {
      const result = await send(new DeleteObjectsCommand({ Bucket: config.bucket, Delete: { Objects: keys.slice(i, i + 1000).map(Key => ({ Key })), Quiet: true } }));
      if (result.Errors?.length) throw new StorageUnavailableError('DeleteFailed');
    }
  }
  async function presignUpload(pathname, size, validUntil, now = Date.now()) {
    if (!/^submissions\/[a-f0-9-]{36}\/files\/\d+$/.test(pathname) || !Number.isSafeInteger(size) || size < 0 || size > 95 * 1024 ** 2) throw new Error('Invalid upload');
    const expiresIn = Math.min(600, Math.floor((validUntil - now) / 1000));
    if (expiresIn < 1) throw new StorageUnavailableError('ExpiredUpload');
    // Sign the exact size and create-only precondition. The browser supplies its
    // own Content-Length from the File body; it must not set that forbidden header.
    const command = new PutObjectCommand({ Bucket: config.bucket, Key: pathname, ContentLength: size, ContentType: 'application/octet-stream', IfNoneMatch: '*' });
    const url = await sign(s3(), command, { expiresIn, signingDate: new Date(now), signableHeaders: new Set(['content-length', 'content-type', 'if-none-match']) });
    const signed = new URL(url).searchParams.get('X-Amz-SignedHeaders')?.split(';') || [];
    if (!['content-length', 'content-type', 'if-none-match'].every(header => signed.includes(header))) throw new StorageUnavailableError('UnsignedUploadConstraint');
    return { url, method: 'PUT', headers: { 'Content-Type': 'application/octet-stream', 'If-None-Match': '*' }, expiresAt: now + expiresIn * 1000 };
  }
  return { get, head, writeJson, list, del, presignUpload };
}
let storage, fingerprint;
function activeStorage() {
  const config = r2Configuration(), key = JSON.stringify(config);
  if (!storage || fingerprint !== key) { storage = createR2Storage({ config }); fingerprint = key; }
  return storage;
}
export const get = (...args) => activeStorage().get(...args);
export const head = (...args) => activeStorage().head(...args);
export const list = (...args) => activeStorage().list(...args);
export const del = (...args) => activeStorage().del(...args);
export const putJson = (...args) => activeStorage().writeJson(...args);
export const presignUpload = (...args) => activeStorage().presignUpload(...args);
