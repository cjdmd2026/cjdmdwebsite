import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import QRCode from 'qrcode';

export const MAX_BYTES = 4 * 1024 * 1024;
export const TTL = 24 * 60 * 60 * 1000;
const ID = /^\d{13}-[a-f0-9]{48}$/;
const TOKEN = /^[a-f0-9]{48}$/;
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow' };
const json = (value, status = 200, extra = {}) => Response.json(value, { status, headers: { ...headers, ...extra } });
const hash = value => createHash('sha256').update(value).digest('hex');
const trustedWrite = request => request.headers.get('origin') === new URL(request.url).origin && request.headers.get('sec-fetch-site') !== 'cross-site';
const failure = (message, status) => Object.assign(new Error(message), { status });

async function readBody(request, maximum) {
  if (Number(request.headers.get('content-length')) > maximum) throw failure('파일 또는 문의 내용의 용량이 너무 커요.', 413);
  const reader = request.body?.getReader();
  if (!reader) throw failure('전송할 내용이 없어요.', 400);
  const chunks = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) { await reader.cancel(); throw failure('파일 또는 문의 내용의 용량이 너무 커요.', 413); }
      chunks.push(Buffer.from(value));
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}

async function cleanup(bucket, now) {
  const page = await bucket.list({ prefix: 'badges/', limit: 64 });
  const keys = page.objects.filter(object => ID.test(object.key.slice(7)) && Number(object.key.slice(7, 20)) <= now).map(object => object.key);
  if (keys.length) await bucket.delete(keys);
}

async function createBadge(request, bucket, now, ip) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'image/png') return json({ error: 'PNG 이미지만 보관할 수 있어요.' }, 415);
  const bytes = await readBody(request, MAX_BYTES);
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) || bytes.readUInt32BE(8) !== 13 || bytes.toString('ascii', 12, 16) !== 'IHDR') return json({ error: '올바른 이미지가 아니에요.' }, 400);
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  if (!((width === 1500 && height === 1000) || (width === 2048 && height === 1129))) return json({ error: '완성된 대원증 이미지를 보내 주세요.' }, 400);
  await bucket.limit(ip, 'badges', now);
  const expiresAt = now + TTL, id = `${expiresAt}-${randomBytes(24).toString('hex')}`;
  // The deletion capability stays in the creating page; it is never part of the QR.
  const deleteToken = randomBytes(24).toString('hex');
  const url = new URL('/apuchika/pages/badge-download.html', request.url);
  url.searchParams.set('id', id);
  const qr = await QRCode.toString(url.href, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, width: 240, color: { dark: '#153c58', light: '#ffffff' } });
  await bucket.put(`badges/${id}`, bytes, { httpMetadata: { contentType: 'image/png' }, customMetadata: { deletehash: hash(deleteToken), expiresat: String(expiresAt) } });
  await cleanup(bucket, now).catch(() => {});
  return json({ id, url: url.href, qr, expiresAt, deleteToken }, 201);
}

async function readBadge(request, bucket, id, now) {
  if (Number(id.slice(0, 13)) <= now) {
    await bucket.delete(`badges/${id}`);
    return json({ error: '다운로드 기간이 지났어요. 새 대원증을 만들어 주세요.' }, 410);
  }
  const object = await bucket.get(`badges/${id}`);
  if (!object) return json({ error: '삭제되었거나 존재하지 않는 대원증이에요.' }, 404);
  return new Response(object.body, { headers: { ...headers, 'Content-Type': 'image/png', 'Content-Length': String(object.size), 'Content-Disposition': `${new URL(request.url).searchParams.get('download') === '1' ? 'attachment' : 'inline'}; filename="apuchika-guardian-card.png"` } });
}

async function deleteBadge(request, bucket, id) {
  const token = request.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  if (!TOKEN.test(token)) return json({ error: '대원증을 만든 페이지에서 삭제해 주세요.' }, 403);
  const object = await bucket.head(`badges/${id}`);
  if (object) {
    const expected = object.customMetadata?.deletehash;
    if (!/^[a-f0-9]{64}$/.test(expected || '') || !timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(hash(token), 'hex'))) return json({ error: '삭제 권한이 없어요.' }, 403);
    await bucket.delete(`badges/${id}`);
  }
  return json({ deleted: true });
}

async function createInquiry(request, bucket, now, ip) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ ok: false, error: '문의 형식을 확인해 주세요.' }, 415);
  let data;
  try { data = JSON.parse((await readBody(request, 8192)).toString('utf8')); }
  catch (error) { if (error.status) throw error; return json({ ok: false, error: '문의 내용을 확인해 주세요.' }, 400); }
  const { name, phone, period, age, message } = data || {};
  if (typeof name !== 'string' || !name.trim() || name.length > 40 || typeof phone !== 'string' || !/^\+?[\d ()-]{8,20}$/.test(phone) || ![age, period].every(value => typeof value === 'string' && value.trim() && value.length <= 24) || typeof message !== 'string' || !message.trim() || message.length > 1500) return json({ ok: false, error: '필수 항목과 연락처를 확인해 주세요.' }, 400);
  await bucket.limit(ip, 'inquiries', now);
  await bucket.put(`inquiries/${randomUUID()}.json`, JSON.stringify({ name: name.trim(), phone, period, age, message: message.trim(), received: new Date(now).toISOString() }));
  return json({ ok: true }, 201);
}

export async function handleApuchikaRequest(request, { bucket, now = Date.now(), ip = 'local' } = {}) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.match(/^\/apuchika\/api\/(badges|inquiries)(?:\/([^/]+))?\/?$/);
    const resource = path?.[1] || (url.pathname === '/api/apuchika' ? url.searchParams.get('resource') : null);
    const id = path?.[2] || (url.pathname === '/api/apuchika' ? url.searchParams.get('id') : null);
    if (!['badges', 'inquiries'].includes(resource) || (id && (resource !== 'badges' || !ID.test(id)))) return json({ error: '주소를 확인해 주세요.' }, 404);
    const methods = resource === 'badges' && id ? ['GET', 'DELETE'] : ['POST'];
    if (!methods.includes(request.method)) return json({ error: '지원하지 않는 요청이에요.' }, 405, { Allow: methods.join(', ') });
    if (request.method !== 'GET' && !trustedWrite(request)) return json({ error: '아푸치카 페이지에서 다시 시도해 주세요.' }, 403);
    if (!bucket) return json({ error: '저장 기능을 준비 중이에요. 잠시 후 다시 시도해 주세요.' }, 503);
    if (resource === 'inquiries') return await createInquiry(request, bucket, now, ip);
    if (request.method === 'POST') return await createBadge(request, bucket, now, ip);
    if (request.method === 'DELETE') return await deleteBadge(request, bucket, id);
    return await readBadge(request, bucket, id, now);
  } catch (error) {
    const status = [400, 413, 429, 503].includes(error.status) ? error.status : 503;
    return json({ error: status === 503 ? '저장소에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.' : error.message }, status);
  }
}
