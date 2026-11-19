import facilities from './efact-facilities.json' with { type: 'json' };

export { facilities };
export const stations = ['복대동', '봉명동', '산남동', '사천동', '용담동', '용암동', '오창읍', '오송읍', '가덕면'];
export const day = 86400000;
const pollutants = [
  ['tsp', '먼지', 'mg/Sm³'], ['sox', '황산화물', 'ppm'], ['nox', '질소산화물', 'ppm'],
  ['hcl', '염화수소', 'ppm'], ['hf', '불화수소', 'ppm'], ['nh3', '암모니아', 'ppm'], ['co', '일산화탄소', 'ppm'],
];
const norm = value => String(value ?? '').replace(/주식회사|\(주\)|㈜|\s/g, '');
export function number(value) {
  if (value == null || String(value).trim() === '') return null;
  const result = Number(value);
  return Number.isFinite(result) && result >= 0 ? result : null;
}

export function timestamp(value) {
  const match = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value ?? '').trim());
  if (!match) return null;
  const [, date, hour, minute, second = '00'] = match;
  const midnight = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(midnight) || new Date(midnight).toISOString().slice(0, 10) !== date
    || +hour > 24 || +minute > 59 || +second > 59 || (+hour === 24 && (+minute || +second))) return null;
  return midnight + (+hour - 9) * 3600000 + +minute * 60000 + +second * 1000;
}

function* nodes(value) {
  if (!value || typeof value !== 'object') return;
  if (!Array.isArray(value)) yield value;
  for (const child of Object.values(value)) yield* nodes(child);
}
function body(payload, codes = ['0', '00']) {
  const response = payload?.response ?? payload;
  if (!codes.includes(String(response?.header?.resultCode))) throw new Error('E.FACT upstream response unavailable');
  return response.body;
}
export function rows(value) {
  const items = value?.item ?? value ?? [];
  return Array.isArray(items) ? items : [items];
}

export function normalizeTms(payload) {
  const all = [...nodes(payload)];
  const codes = all.filter(row => 'resultCode' in row);
  if (!codes.length || codes.some(row => !['0', '00'].includes(String(row.resultCode)))) throw new Error('CleanSYS unavailable');
  const records = all.filter(row => 'fact_manage_nm' in row);
  return { status: 'ok', facilities: facilities.map(facility => {
    const outlets = new Map();
    for (const row of records) {
      if (!facility.aliases.some(alias => norm(alias) === norm(row.fact_manage_nm)) || !/충청북|충북|청주/.test(row.area_nm ?? '')) continue;
      const metrics = pollutants.flatMap(([key, name, unit]) => {
        const raw = row[`${key}_mesure_value`], value = number(raw), limit = number(row[`${key}_exhst_perm_stdr_value`]);
        return value !== null || limit !== null || (raw != null && raw !== '')
          ? [{ key, name, unit, value, limit, status: value === null && raw != null && raw !== '' ? String(raw) : null }] : [];
      });
      const outlet = { code: String(row.stack_code ?? ''), measuredAt: String(row.mesure_dt ?? ''), metrics };
      const previous = outlets.get(outlet.code);
      if (!previous || (timestamp(outlet.measuredAt) ?? -Infinity) > (timestamp(previous.measuredAt) ?? -Infinity)) outlets.set(outlet.code, outlet);
    }
    return { ...facility, outlets: [...outlets.values()] };
  }) };
}

export function normalizeAir(payload) {
  const selected = new Map();
  for (const row of rows(body(payload)?.items)) {
    if (!stations.includes(row.stationName)) continue;
    const station = {
      id: row.stationName, name: row.stationName, measuredAt: String(row.dataTime ?? ''),
      cai: number(row.khaiValue), grade: [1, 2, 3, 4].includes(Number(row.khaiGrade)) ? Number(row.khaiGrade) : null,
      pm10: number(row.pm10Value), pm25: number(row.pm25Value), o3: number(row.o3Value),
      no2: number(row.no2Value), co: number(row.coValue), so2: number(row.so2Value),
      flags: { pm10: String(row.pm10Flag ?? ''), pm25: String(row.pm25Flag ?? '') },
    };
    const previous = selected.get(station.id);
    if (!previous || (timestamp(station.measuredAt) ?? -Infinity) > (timestamp(previous.measuredAt) ?? -Infinity)) selected.set(station.id, station);
  }
  return { status: selected.size ? 'ok' : 'empty', stations: stations.flatMap(name => selected.has(name) ? [selected.get(name)] : []), source: 'AirKorea' };
}

export function normalizeAirHistory(payload, now = Date.now()) {
  const points = new Map();
  for (const row of rows(body(payload)?.items)) {
    const time = timestamp(row.dataTime);
    if (time !== null) points.set(time, { time, label: row.dataTime, pm10: number(row.pm10Value), pm25: number(row.pm25Value) });
  }
  const end = points.size ? Math.max(...points.keys()) : now;
  return { status: 'ok', points: [...points.values()].filter(point => point.time > end - day).sort((a, b) => a.time - b.time), end, source: 'AirKorea' };
}

export function incineratorPage(payload) {
  const result = body(payload, ['200', '00', '0']);
  const total = number(result?.totalCount);
  if (!Number.isSafeInteger(total)) throw new Error('Invalid incinerator total');
  return { records: rows(result.items), total };
}
export function normalizeIncinerators(records) {
  const fields = { prcsFcltId: 'facilityId', prcsFcltNm: 'name', dtlPrcsFcltId: 'unitId', dtlPrcsFcltNm: 'unit', trgtYr: 'year', prcsFcltAddr: 'address', incnrRtrvlEfcn: 'efficiency', avgIncnrRtrvlEfcn: 'average', certBgngYmd: 'start', certEndYmd: 'end', certIssuYmd: 'issued' };
  return { status: 'ok', records: records.filter(row => String(row.prcsFcltAddr ?? '').includes('청주시'))
    .map(row => Object.fromEntries(Object.entries(fields).map(([from, to]) => [to, row[from] ?? null]))), source: 'https://www.data.go.kr/data/15164842/openapi.do' };
}
