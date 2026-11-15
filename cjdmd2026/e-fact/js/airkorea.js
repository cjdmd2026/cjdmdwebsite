(()=>{'use strict';
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const grades={1:{label:'좋음',className:'good'},2:{label:'보통',className:'normal'},3:{label:'나쁨',className:'bad'},4:{label:'매우 나쁨',className:'very-bad'}};
let state={status:'loading',stations:[]},retryTimer=null;
let selected='복대동',inflight=null;
const endpoint=new URL('api/air',new URL('.',document.currentScript.src));
const value=(number,digits=0)=>number===null||number===undefined?'—':Number(number).toFixed(digits);
function grade(station){return grades[station?.grade]||{label:'판단 보류',className:'unknown'}}
function renderBand(){
  const host=document.querySelector('#airkorea-live');
  if(!host)return;
  if(!['ok','stale'].includes(state.status)||!state.stations.length){host.innerHTML='<p class="air-live-empty">실시간 자료를 불러오지 못했어요. 잠시 뒤 다시 확인해 주세요.</p>';return}
  if(!state.stations.some(item=>item.id===selected))selected=state.stations[0].id;
  const station=state.stations.find(item=>item.id===selected),g=grade(station);
  host.innerHTML=`<div class="air-live-head"><label>청주 측정소<select id="air-station-select">${state.stations.map(item=>`<option value="${esc(item.id)}" ${item.id===selected?'selected':''}>${esc(item.name)}</option>`).join('')}</select></label><span>${esc(station.measuredAt)} 측정</span></div><div class="air-live-summary ${g.className}"><div><small>통합대기환경지수</small><strong>${value(station.cai)}</strong></div><b><i></i>${g.label}</b></div><div class="air-live-values"><article><span>PM10</span><strong>${value(station.pm10)}</strong><small>㎍/㎥</small></article><article><span>PM2.5</span><strong>${value(station.pm25)}</strong><small>㎍/㎥</small></article><article><span>오존</span><strong>${value(station.o3,3)}</strong><small>ppm</small></article></div><p class="air-live-note">${state.status==='stale'?'연결 재시도 중 · 이전 수신 자료입니다. 측정 시점을 확인하세요. ':''}동네 측정소의 생활권 대기질입니다. 굴뚝 배출 수치와 측정 위치·의미가 달라요.</p>`;
  host.querySelector('#air-station-select').onchange=event=>{selected=event.target.value;renderBand()};
}
async function requestData(){
  clearTimeout(retryTimer);
  try{
    const response=await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(60000)});
    if(!response.ok)throw Error();
    const data=await response.json();
    if(!['ok','stale'].includes(data.status)||!Array.isArray(data.stations))throw Error();
    state=data;if(data.status==='stale')retryTimer=setTimeout(load,30000);
  }catch{state=state.stations.length?{...state,status:'stale'}:{status:location.protocol==='file:'?'server-offline':'unavailable',stations:[]};clearTimeout(retryTimer);retryTimer=setTimeout(load,30000)}
  renderBand();
  document.dispatchEvent(new CustomEvent('airkorea-update',{detail:state}));
  return state;
}
function load(){if(inflight)return inflight;inflight=requestData().finally(()=>{inflight=null});return inflight}
window.EFactAir={grades,grade,value,get state(){return state},load};
renderBand();load();setInterval(()=>{if(!document.hidden)load()},300000);
})();
