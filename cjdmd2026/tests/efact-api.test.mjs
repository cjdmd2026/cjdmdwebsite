import test from 'node:test';
import assert from 'node:assert/strict';
import { createEfactApi } from '../server/efact-api.mjs';
import { createEfactHistory } from '../server/efact-history.mjs';
import { normalizeTms, normalizeAir, normalizeAirHistory, timestamp, day } from '../server/efact-data.mjs';
import { StorageConflictError } from '../server/r2.mjs';
import { envelope, tmsRow, airRow, recoveryRow, testNow, testEnv, fixtureFetch } from './efact-fixtures.mjs';

const request = (path, options) => new Request(`https://example.test${path}`, options);
const setup = (options = {}) => createEfactApi({ env: testEnv, fetchImpl: fixtureFetch, now: () => testNow, history: createEfactHistory({ now: () => testNow }), ...options });
const get = async (api, path) => (await api(request(`/e-fact/api/${path}`))).json();

test('missing credentials return explicit states without making upstream calls', async () => {
  const api = setup({ env: {}, fetchImpl: () => assert.fail('must not fetch without a key') });
  for (const path of ['tms', 'air', 'incinerators', 'air-history?station=복대동', 'tms-history?facility=1']) {
    const data = await get(api, path);
    assert.equal(data.status, 'unconfigured');
  }
  assert.deepEqual(await get(api, 'health'), { service: 'efact', status: 'ok' });
  assert.equal((await get(api, 'tms')).facilities.length, 7);
});

test('routes preserve namespaced, legacy and Vercel rewritten requests; reject invalid inputs', async () => {
  const api = setup();
  for (const path of ['/e-fact/api/air', '/e-fact/js/api/air', '/api/efact?resource=air']) {
    const response = await api(request(path));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal((await response.json()).stations[0].name, '복대동');
  }
  for (const path of ['air-history?station=서울', 'tms-history?facility=../secret']) assert.equal((await api(request(`/e-fact/api/${path}`))).status, 400);
  assert.equal((await api(request('/e-fact/api/nope'))).status, 404);
  assert.equal((await api(request('/e-fact/api/air', { method: 'POST' }))).status, 405);
  assert.equal(await (await api(request('/e-fact/api/health', { method: 'HEAD' }))).text(), '');
});

test('TMS filters by aliases and area, deduplicates outlets and preserves missing measurements', () => {
  const data = normalizeTms(envelope([
    tmsRow(), tmsRow({ mesure_dt: '2026-11-20 10:30', tsp_mesure_value: '3' }),
    tmsRow({ fact_manage_nm: '(주) 클렌코', co_mesure_value: '0' }),
    tmsRow({ area_nm: '서울', stack_code: 'wrong-area' }),
    tmsRow({ fact_manage_nm: '다른 업체', stack_code: 'wrong-company' }),
  ]));
  assert.equal(data.facilities.length, 7);
  assert.equal(data.facilities[0].outlets.length, 1);
  assert.equal(data.facilities[0].outlets[0].metrics[0].value, 4.5);
  assert.deepEqual(data.facilities[0].outlets[0].metrics[1], { key: 'nox', name: '질소산화물', unit: 'ppm', value: null, limit: 50, status: '점검중' });
  assert.equal(data.facilities[2].outlets[0].metrics.at(-1).value, 0);
  assert.throws(() => normalizeTms({ resultCode: '30' }));
});

test('AirKorea filters and orders stations, deduplicates updates and excludes invalid numbers', () => {
  const data = normalizeAir(envelope([
    airRow({ stationName: '오창읍' }), airRow({ pm10Value: '', pm25Value: '-1', khaiGrade: '9', o3Value: 'Infinity' }),
    airRow({ dataTime: '2026-11-20 10:00' }), airRow({ stationName: '서울' }),
  ]));
  assert.deepEqual(data.stations.map(station => station.name), ['복대동', '오창읍']);
  assert.equal(data.stations[0].pm10, null);
  assert.equal(data.stations[0].pm25, null);
  assert.equal(data.stations[0].o3, null);
  assert.equal(data.stations[0].grade, null);
});

test('history interprets Korea midnight and selects the latest measured 24 hours', () => {
  assert.equal(timestamp('2026-11-19 24:00'), Date.parse('2026-11-20T00:00:00+09:00'));
  for (const invalid of ['', '2026-02-30 12:00', '2026-11-20 24:01', '2026-11-20 12:99']) assert.equal(timestamp(invalid), null);
  const data = normalizeAirHistory(envelope([
    airRow(), airRow({ dataTime: '2026-11-19 11:00' }), airRow({ dataTime: '2026-11-19 24:00' }), airRow({ dataTime: 'bad' }), airRow({ pm25Value: '-' }),
  ]));
  assert.equal(data.points.length, 2);
  assert.equal(data.points[1].pm25, null);
  assert.equal(data.end, timestamp('2026-11-20 11:00'));
});

test('upstream key decoding, cache and coalescing keep credentials private; outages retain timestamps', async () => {
  let now = testNow, count = 0, failing = false;
  const api = setup({ now: () => now, fetchImpl: async (input, options) => {
    count++;
    assert.equal(new URL(input).searchParams.get('serviceKey'), 'test+/=key');
    assert.equal(options.redirect, 'error');
    if (failing) throw new Error(`secret URL: ${input}`);
    return fixtureFetch(input);
  } });
  const [first, second] = await Promise.all([get(api, 'tms'), get(api, 'tms')]);
  assert.deepEqual(first, second);
  assert.equal(count, 1);
  failing = true; now += 300001;
  const stale = await get(api, 'tms');
  assert.equal(stale.status, 'stale');
  assert.equal(stale.facilities[0].outlets[0].measuredAt, first.facilities[0].outlets[0].measuredAt);
  assert.equal(JSON.stringify(stale).includes('test+/='), false);
  await get(api, 'tms'); assert.equal(count, 2);
  now += 30001; await get(api, 'tms'); assert.equal(count, 3);
});

test('incinerator pagination includes later Cheongju records and rejects incomplete results', async () => {
  const pages = [];
  const api = setup({ fetchImpl: async input => {
    const page = new URL(input).searchParams.get('pageNo'); pages.push(page);
    return Response.json(envelope({ item: recoveryRow(page === '1' ? { prcsFcltAddr: '서울' } : {}) }, { totalCount: '2' }));
  } });
  const data = await get(api, 'incinerators');
  assert.deepEqual(pages, ['1', '2']);
  assert.equal(data.records.length, 1);
  assert.equal(data.records[0].efficiency, '78.5');
  assert.equal(data.records[0].unit, '1호기');
  const incomplete = setup({ fetchImpl: async () => Response.json(envelope([], { totalCount: 3 })) });
  assert.deepEqual(await get(incomplete, 'incinerators'), { status: 'unavailable', records: [] });
});

function persistentStorage() {
  const data = new Map(); let revision = 0;
  return {
    data,
    async get(key) { const item = data.get(key); return item ? { stream: JSON.stringify(item.value), blob: { etag: item.etag } } : null; },
    async writeJson(key, value, options) {
      if (data.get(key)?.etag !== options.ifMatch) throw new StorageConflictError();
      data.set(key, { value, etag: String(++revision) });
    },
  };
}

test('persistent TMS observations survive a new instance, merge conflicts, deduplicate and expire', async () => {
  const storage = persistentStorage(); let now = testNow;
  const a = createEfactHistory({ storage, now: () => now }), b = createEfactHistory({ storage, now: () => now });
  await Promise.all([
    a.record(normalizeTms(envelope([tmsRow()]))),
    b.record(normalizeTms(envelope([tmsRow({ mesure_dt: '2026-11-20 10:30' })]))),
  ]);
  await a.record(normalizeTms(envelope([tmsRow()])));
  const restarted = createEfactHistory({ storage, now: () => now });
  const data = await restarted.read('1');
  assert.equal(data.storage, 'persistent');
  assert.equal(data.outlets['001'].length, 2);
  assert.deepEqual([...storage.data.keys()], ['efact/history/1.json']);
  now += day;
  assert.deepEqual((await restarted.read('1')).outlets, {});
  now += day;
  await restarted.record(normalizeTms(envelope([tmsRow({ mesure_dt: '2026-11-22 11:30' })])));
  assert.equal(storage.data.get('efact/history/1.json').value.outlets['001'].length, 1);
});

test('history collection does not mask live data when storage fails', async () => {
  const history = { async record() { throw Error('private storage error'); }, async read() { throw Error('private storage error'); } };
  const api = setup({ history });
  assert.equal((await get(api, 'tms')).status, 'ok');
  const data = await get(api, 'tms-history?facility=1');
  assert.equal(data.status, 'unavailable');
  assert.equal(JSON.stringify(data).includes('private'), false);
  const temporary = await get(setup(), 'tms-history?facility=1');
  assert.equal(temporary.outlets['001'].length, 1);
  assert.equal(temporary.storage, 'memory');
});
