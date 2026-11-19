import { facilities, stations, normalizeTms, normalizeAir, normalizeAirHistory, incineratorPage, normalizeIncinerators } from './efact-data.mjs';
import { configuredEfactHistory } from './efact-history.mjs';

const endpoints = {
  tms: 'https://apis.data.go.kr/B552584/cleansys/rltmMesureResult',
  air: 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
  history: 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty',
  incinerators: 'https://apis.data.go.kr/B552584/tIncnrFcltInfoService/getList',
};
const emptyTms = () => ({ facilities: facilities.map(facility => ({ ...facility, outlets: [] })) });
const json = (value, status = 200, headers = {}) => Response.json(value, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
});

export function createEfactApi({ env = process.env, fetchImpl = fetch, now = Date.now, history = configuredEfactHistory(env) } = {}) {
  const cache = new Map(), inflight = new Map();
  function serviceKey(name) {
    const value = String(env[name] ?? '').trim();
    try { return decodeURIComponent(value); } catch { return value; }
  }
  async function upstream(endpoint, key, params, signal) {
    const url = new URL(endpoint);
    url.search = new URLSearchParams({ serviceKey: key, ...params }).toString();
    // URLs and upstream errors can contain credentials; never return or log them.
    const response = await fetchImpl(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(20000)]), redirect: 'error' });
    if (!response.ok) throw new Error('E.FACT upstream unavailable');
    return response.json();
  }
  function cached(name, keyName, ttl, empty, load) {
    const key = serviceKey(keyName);
    if (!key) return Promise.resolve({ status: 'unconfigured', ...empty() });
    const previous = cache.get(name);
    if (previous && now() - previous.updated < (previous.data.status === 'ok' ? ttl : 30000)) return Promise.resolve(previous.data);
    if (inflight.has(name)) return inflight.get(name);
    const task = (async () => {
      let data;
      try { data = await load(key, AbortSignal.timeout(45000)); }
      catch { data = previous?.success ? { ...previous.success, status: 'stale' } : { status: 'unavailable', ...empty() }; }
      cache.set(name, { data, updated: now(), success: data.status === 'ok' ? data : previous?.success });
      return data;
    })().finally(() => inflight.delete(name));
    inflight.set(name, task);
    return task;
  }
  async function tms() {
    return cached('tms', 'CLEANSYS_SERVICE_KEY', 300000, emptyTms, async (key, signal) => {
      const data = normalizeTms(await upstream(endpoints.tms, key, { areaNm: '충청북', type: 'json' }, signal));
      try { await history.record(data); }
      catch { data.historyStatus = 'unavailable'; }
      return data;
    });
  }
  const air = () => cached('air', 'AIRKOREA_SERVICE_KEY', 600000, () => ({ stations: [] }), async (key, signal) =>
    normalizeAir(await upstream(endpoints.air, key, { returnType: 'json', numOfRows: '100', pageNo: '1', sidoName: '충북', ver: '1.3' }, signal)));
  const airHistory = station => cached(`air-history:${station}`, 'AIRKOREA_SERVICE_KEY', 3600000, () => ({ points: [] }), async (key, signal) =>
    normalizeAirHistory(await upstream(endpoints.history, key, { returnType: 'json', stationName: station, dataTerm: 'DAILY', numOfRows: '100', pageNo: '1', ver: '1.3' }, signal), now()));
  const incinerators = () => cached('incinerators', 'INCINERATOR_SERVICE_KEY', 3600000, () => ({ records: [] }), async (key, signal) => {
    const records = [];
    for (let page = 1; page <= 100; page++) {
      const result = incineratorPage(await upstream(endpoints.incinerators, key, { pageNo: String(page), numOfRows: '1000', returnType: 'json' }, signal));
      records.push(...result.records);
      if (records.length >= result.total) return normalizeIncinerators(records);
      if (!result.records.length) throw new Error('Incomplete incinerator pagination');
    }
    throw new Error('Incinerator pagination limit');
  });
  return async function handleRequest(request) {
    if (!['GET', 'HEAD'].includes(request.method)) return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, HEAD' });
    const url = new URL(request.url);
    const match = /^\/e-fact\/(?:js\/)?api\/([a-z-]+)\/?$/.exec(url.pathname);
    const resource = match?.[1] ?? (url.pathname === '/api/efact' ? url.searchParams.get('resource') : null);
    let data;
    switch (resource) {
      case 'health': data = { service: 'efact', status: 'ok' }; break;
      case 'tms': data = await tms(); break;
      case 'air': data = await air(); break;
      case 'incinerators': data = await incinerators(); break;
      case 'air-history': {
        const station = url.searchParams.get('station');
        if (!stations.includes(station)) return json({ status: 'unavailable', points: [], error: 'Unknown station' }, 400);
        data = await airHistory(station); break;
      }
      case 'tms-history': {
        const facility = url.searchParams.get('facility');
        if (!facilities.some(item => item.id === facility)) return json({ status: 'unavailable', outlets: {}, error: 'Unknown facility' }, 400);
        const current = await tms();
        try {
          data = await history.read(facility);
          if (current.historyStatus === 'unavailable') data.status = Object.keys(data.outlets).length ? 'stale' : 'unavailable';
          else if (current.status !== 'ok') data.status = Object.keys(data.outlets).length ? 'stale' : current.status;
        } catch { data = { status: 'unavailable', outlets: {}, source: 'CleanSYS', mode: 'collected' }; }
        break;
      }
      default: return json({ error: 'Not found' }, 404);
    }
    const response = json(data);
    return request.method === 'HEAD' ? new Response(null, { status: response.status, headers: response.headers }) : response;
  };
}
