export const testNow = Date.parse('2026-11-20T03:00:00Z');
export const testEnv = { CLEANSYS_SERVICE_KEY: 'test%2B%2F%3Dkey', AIRKOREA_SERVICE_KEY: 'test+/=key', INCINERATOR_SERVICE_KEY: 'test+/=key' };
export const envelope = (items, extra = {}) => ({ response: { header: { resultCode: '00' }, body: { items, ...extra } } });
export const tmsRow = (overrides = {}) => ({ fact_manage_nm: '청주시 생활폐기물처리시설', area_nm: '충청북도', stack_code: '001', mesure_dt: '2026-11-20 11:30', tsp_mesure_value: '4.5', tsp_exhst_perm_stdr_value: '20', nox_mesure_value: '점검중', nox_exhst_perm_stdr_value: '50', ...overrides });
export const airRow = (overrides = {}) => ({ stationName: '복대동', dataTime: '2026-11-20 11:00', khaiValue: '42', khaiGrade: '1', pm10Value: '18', pm25Value: '9', o3Value: '0.021', no2Value: '0.012', coValue: '-', so2Value: '0.003', ...overrides });
export const recoveryRow = (overrides = {}) => ({ prcsFcltId: 'facility-1', prcsFcltNm: '청주시 생활폐기물처리시설', dtlPrcsFcltId: 'unit-1', dtlPrcsFcltNm: '1호기', trgtYr: '2025', prcsFcltAddr: '충청북도 청주시 흥덕구', incnrRtrvlEfcn: '78.5', certBgngYmd: '20250101', certEndYmd: '20251231', certIssuYmd: '20250102', ...overrides });
export function fixtureFetch(input) {
  const url = new URL(input);
  if (url.pathname.endsWith('/rltmMesureResult')) return Promise.resolve(Response.json(envelope([
    tmsRow(), tmsRow({ mesure_dt: '2026-11-20 10:30', tsp_mesure_value: '3' }),
    tmsRow({ fact_manage_nm: '㈜클렌코', stack_code: '002', tsp_mesure_value: '8' }),
  ])));
  if (url.pathname.endsWith('/getCtprvnRltmMesureDnsty')) return Promise.resolve(Response.json(envelope([airRow(), airRow({ stationName: '봉명동', pm25Value: '12' }), airRow({ stationName: '충주시' })])));
  if (url.pathname.endsWith('/getMsrstnAcctoRltmMesureDnsty')) return Promise.resolve(Response.json(envelope([airRow(), airRow({ dataTime: '2026-11-20 10:00', pm25Value: '7' })])));
  if (url.pathname.endsWith('/getList')) return Promise.resolve(Response.json(envelope({ item: recoveryRow() }, { totalCount: 1 })));
  throw new Error('Unexpected upstream URL');
}
