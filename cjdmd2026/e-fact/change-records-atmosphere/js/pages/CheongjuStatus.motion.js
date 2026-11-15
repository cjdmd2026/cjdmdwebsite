(()=>{'use strict';
const $=s=>document.querySelector(s),scene=$('.air-scene'),scanner=$('#facility-scanner'),stage=$('#holo-stage'),model=$('#holo-model'),zones=[...document.querySelectorAll('.scan-zone')],panels=[...document.querySelectorAll('.zone-panel')];
const facilities=[
{id:'1',name:'청주시 생활폐기물처리시설',profile:'공공 생활폐기물 소각시설',asset:'../images/main-atmosphere/assets/facility-holograms-hd/01-cheongju-municipal.svg'},
{id:'2',name:'우진환경개발',profile:'민간 폐기물 소각시설',asset:'../images/main-atmosphere/assets/facility-holograms-hd/02-woojin.svg'},
{id:'3',name:'리뉴에너지충북',profile:'민간 폐기물 소각시설',asset:'../images/main-atmosphere/assets/facility-holograms-hd/03-renew-energy.svg'},
{id:'4',name:'다나에너지솔루션',profile:'민간 폐기물 소각시설',asset:'../images/main-atmosphere/assets/facility-holograms-hd/04-dana-energy.svg'},
{id:'5',name:'한세이프에너지',profile:'민간 폐기물 소각시설',asset:'../images/main-atmosphere/assets/facility-holograms-hd/05-hansafe.svg'},
{id:'6',name:'대한제지',profile:'소각시설 보유 제지 사업장',asset:'../images/main-atmosphere/assets/facility-holograms-hd/06-daehan-paper.svg'},
{id:'7',name:'나투라페이퍼',profile:'소각시설 보유 제지 사업장',asset:'../images/main-atmosphere/assets/facility-holograms-hd/07-natura-paper.svg'}];
const facilityIds=facilities.map(f=>f.id);
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches,hovering=false,locked=null,position=8,direction=1,last=performance.now(),active=-1;
let facilityIndex=0,rotation=0,dragging=false,startX=0,startRotation=0;
function showZone(index){if(index===active)return;active=index;scene.dataset.activeZone=String(index);zones.forEach((z,i)=>{z.classList.toggle('active',i===index);z.setAttribute('aria-pressed',String(i===index))});panels.forEach((p,i)=>p.classList.toggle('active',i===index));scene.style.setProperty('--zone-top',(index*25)+'%')}
function motion(){document.body.classList.toggle('motion-paused',paused);$('#motion-toggle').setAttribute('aria-pressed',String(paused));$('#motion-toggle').textContent=paused?'움직임 켜기 ▷':'움직임 멈추기 Ⅱ'}
function frame(now){const dt=Math.min(40,now-last);last=now;if(!paused&&locked===null&&!dragging){const speed=hovering?.00028:.00085;position+=direction*dt*speed*10;if(position>=92){position=92;direction=-1}if(position<=8){position=8;direction=1}scene.style.setProperty('--scan',position+'%');showZone(Math.min(3,Math.floor(position/25)))}requestAnimationFrame(frame)}
function setRotation(value){rotation=value;model.style.setProperty('--holo-rotate',rotation+'deg')}
function selectFacility(index,notify=true){facilityIndex=(index+facilities.length)%facilities.length;const facility=facilities[facilityIndex];model.classList.add('holo-changing');setTimeout(()=>{model.dataset.variant=String(facilityIndex);model.querySelectorAll('.holo-shell img').forEach((img,i)=>{img.src=facility.asset;img.alt=i===1?facility.name+' 외관 기반 홀로그램':''});setRotation(0);$('#holo-current').textContent=String(facilityIndex+1).padStart(2,'0');$('#holo-profile').textContent=facility.profile;stage.setAttribute('aria-label',facility.name+' 홀로그램. 좌우로 드래그해 회전할 수 있습니다');model.classList.remove('holo-changing')},150);if(notify)document.dispatchEvent(new CustomEvent('choose-facility',{detail:facility.id}))}
function shift(step){selectFacility(facilityIndex+step,true)}
motion();showZone(0);requestAnimationFrame(frame);
$('#motion-toggle').addEventListener('click',()=>{paused=!paused;motion()});
scanner.addEventListener('pointerenter',()=>hovering=true);scanner.addEventListener('pointerleave',()=>{hovering=false;locked=null});
zones.forEach((zone,index)=>{const hold=()=>{locked=index;position=index*25+12.5;scene.style.setProperty('--scan',position+'%');showZone(index)};zone.addEventListener('focus',hold);zone.addEventListener('click',()=>{locked=locked===index?null:index;if(locked!==null)hold()});zone.addEventListener('blur',()=>locked=null)});
stage.addEventListener('pointerdown',event=>{if(event.button!==0)return;dragging=true;startX=event.clientX;startRotation=rotation;stage.classList.add('dragging');stage.setPointerCapture(event.pointerId)});
stage.addEventListener('pointermove',event=>{if(!dragging)return;setRotation(startRotation+(event.clientX-startX)*.34)});
function endDrag(event){if(!dragging)return;dragging=false;stage.classList.remove('dragging');if(stage.hasPointerCapture?.(event.pointerId))stage.releasePointerCapture(event.pointerId)}
stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);
stage.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();shift(-1)}if(event.key==='ArrowRight'){event.preventDefault();shift(1)}});
$('.holo-prev').addEventListener('click',()=>shift(-1));$('.holo-next').addEventListener('click',()=>shift(1));
document.addEventListener('facility-selected',event=>{const index=facilityIds.indexOf(String(event.detail));if(index>=0&&index!==facilityIndex)selectFacility(index,false)});
scene.addEventListener('pointermove',event=>{if(paused||event.pointerType==='touch'||dragging)return;const r=scene.getBoundingClientRect();scene.style.setProperty('--mx',((event.clientX-r.left)/r.width-.5)*8+'px')});scene.addEventListener('pointerleave',()=>scene.style.setProperty('--mx','0px'));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.overview,.air-layout,.facility-section,.reading-grid article,.source-layout').forEach(element=>{element.classList.add('reveal-motion');observer.observe(element)});

})();
