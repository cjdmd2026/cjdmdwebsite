import { ipAddress } from '@vercel/functions';
import { apuchikaBucket } from '../server/apuchika-storage.mjs';
import { handleApuchikaRequest } from '../server/apuchika-api.mjs';

export function handleRequest(request) {
  return handleApuchikaRequest(request, { bucket: apuchikaBucket(), ip: ipAddress(request) || 'local' });
}

export default { fetch: handleRequest };
