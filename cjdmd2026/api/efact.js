import { createEfactApi } from '../server/efact-api.mjs';

let handler;
export function handleRequest(request) {
  handler ||= createEfactApi();
  return handler(request);
}

export default { fetch: handleRequest };
