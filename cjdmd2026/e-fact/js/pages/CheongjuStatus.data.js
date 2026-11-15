/* UI data contract. No network requests or API credentials are used in preview mode.
 * For live integration, normalize each CleanSYS record with fromCleanSys(), then
 * window.CheongjuDashboard.setData({ mode: 'live', facilities: records.map(fromCleanSys) }).
 * Normalize 24 hourly AirKorea rows with fromAirKorea(), then pass them to
 * window.CheongjuDashboard.setAirData(rows.map(fromAirKorea)).
 * API keys belong on a server. Fetch your own server endpoint, not a keyed public URL.
 * Histories must contain actual timestamped observations; latest-value API alone does not supply a history.
 */
(function (root) {
  'use strict';
  const pollutants = [
    {key:'nox',name:'질소산화물',symbol:'NOx',unit:'ppm'},
    {key:'sox',name:'황산화물',symbol:'SOx',unit:'ppm'},
    {key:'tsp',name:'먼지',symbol:'TSP',unit:'mg/Sm³'},
    {key:'co',name:'일산화탄소',symbol:'CO',unit:'ppm'},
    {key:'hcl',name:'염화수소',symbol:'HCl',unit:'ppm'},
    {key:'hf',name:'불화수소',symbol:'HF',unit:'ppm'},
    {key:'nh3',name:'암모니아',symbol:'NH₃',unit:'ppm'}
  ];
  function number(value) {
    if (typeof value !== 'number' && typeof value !== 'string') return null;
    if (typeof value === 'string' && !value.trim()) return null;
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
  function assess(metric) {
    const value = number(metric?.value), limit = number(metric?.limit);
    if (value === null || limit === null || limit <= 0) return {state:'unknown',label:'판단 보류',icon:'—',ratio:null};
    const ratio = value / limit * 100;
    return ratio > 100 ? {state:'over',label:'기준 초과',icon:'↑',ratio} : ratio >= 80 ? {state:'near',label:'기준에 가까움',icon:'!',ratio} : {state:'within',label:'기준 이내',icon:'✓',ratio};
  }
  function summarize(facility) {
    const items = pollutants.map(p => ({...p,...assess(facility.measurements?.[p.key])}));
    const valid = items.filter(x => x.ratio !== null);
    const worst = [...valid].sort((a,b) => b.ratio-a.ratio)[0];
    const missing = items.length-valid.length;
    // Missing measurements never imply that the entire facility is within limits.
    const status = worst && (worst.ratio >= 80 || !missing) ? worst : {state:'unknown',label:'일부 자료 미확인',icon:'—',ratio:worst?.ratio ?? null};
    return {items,valid,worst,missing,...status};
  }
  function fromCleanSys(row) {
    return {
      id:[row.area_nm,row.fact_manage_nm,row.stack_code].join('|'),
      name:row.fact_manage_nm || '사업장명 미확인',district:row.area_nm || '지역 미확인',
      stack:row.stack_code == null ? '배출구 미확인' : `배출구 ${row.stack_code}`,
      measuredAt:row.mesure_dt || null,
      measurements:Object.fromEntries(pollutants.map(p => [p.key,{value:number(row[`${p.key}_mesure_value`]),limit:number(row[`${p.key}_exhst_perm_stdr_value`]),history:[]}]))
    };
  }
  function fromAirKorea(row) {
    const pm10Flag = row.pm10Flag ?? row.pm10_flag ?? null;
    const pm25Flag = row.pm25Flag ?? row.pm25_flag ?? null;
    const hasFlag = value => value != null && String(value).trim() && String(value).trim() !== '-';
    return {
      station: row.stationName || row.station_name || '측정소 미확인',
      measuredAt: row.dataTime || row.data_time || null,
      pm10: hasFlag(pm10Flag) ? null : number(row.pm10Value ?? row.pm10_value),
      pm25: hasFlag(pm25Flag) ? null : number(row.pm25Value ?? row.pm25_value),
      cai: number(row.khaiValue ?? row.khai_value),
      grade: number(row.khaiGrade ?? row.khai_grade),
      pm10Flag: hasFlag(pm10Flag) ? String(pm10Flag) : null,
      pm25Flag: hasFlag(pm25Flag) ? String(pm25Flag) : null
    };
  }
  const limits = [50,20,10,50,15,2,30]; // Fictional display examples, never fallback legal limits.
  const samples = [[32,5.6,2.4,12,3.2,.4,6],[44,6,3,18,4,.6,8],[61,9,4,14,6,.7,9],[null,7,3.5,15,null,.5,7]];
  const districts = ['청원구','흥덕구','서원구','상당구'];
  const demo = {mode:'demo',facilities:samples.map((values,i) => ({
    id:`demo-${i}`,name:`예시 소각시설 ${'ABCD'[i]}`,district:districts[i],stack:'배출구 001',measuredAt:'2026-09-23 14:00',
    measurements:Object.fromEntries(pollutants.map((p,j) => [p.key,{value:values[j],limit:limits[j],history:Array.from({length:25},(_,t) => ({time:new Date(Date.UTC(2026,8,22,5+t)).toISOString(),value:values[j] === null ? null : +(values[j]*(t===24?1:.8+.12*Math.sin(t*.55+j)+.07*Math.cos(t*.9+i))).toFixed(2),limit:limits[j]}))}]))
  }))};
  root.CheongjuData = {pollutants,number,assess,summarize,fromCleanSys,fromAirKorea,demo};
})(globalThis);
