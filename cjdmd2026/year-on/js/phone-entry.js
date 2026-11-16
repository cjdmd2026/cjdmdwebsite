/* Lock screen and source-labelled horizontal photo collections. */
(()=>{const app=document.querySelector('.social-app.culture-sns');if(!app)return;
const en=()=>window.YEARON_LANG==='en',t=(a,b)=>en()?b:a;
const lock=document.createElement('section');lock.className='phone-lock';lock.setAttribute('aria-label','스마트폰 잠금 화면');lock.innerHTML='<div class="phone-lock-content"><span class="phone-lock-symbol"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="10" rx="3"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg></span><p class="phone-lock-date"></p><time class="phone-lock-clock"></time><button class="phone-unlock" type="button"><span></span><b></b></button></div>';app.append(lock);
const relock=document.createElement('button');relock.type='button';relock.className='phone-relock';relock.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';app.append(relock);
function localize(){const statusTime=app.querySelector('.culture-status time');if(statusTime)statusTime.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());lock.querySelector('.phone-lock-date').textContent=new Intl.DateTimeFormat(en()?'en-US':'ko-KR',{month:'long',day:'numeric',weekday:'long'}).format(new Date());lock.querySelector('.phone-lock-clock').textContent=new Intl.DateTimeFormat(en()?'en-US':'ko-KR',{hour:'numeric',minute:'2-digit',hour12:true}).format(new Date()).replace(/오전 |오후 | AM| PM/g,'');lock.querySelector('.phone-unlock b').textContent=t('위로 쓸어올려 잠금 해제','Swipe up to unlock');relock.setAttribute('aria-label',t('휴대폰 잠그기','Lock phone'));lock.querySelector('.phone-unlock').setAttribute('aria-label',t('잠금 해제','Unlock phone'))}

const device=app.closest('.phone-media'),hardware=document.createElement('div');hardware.className='phone-hardware';hardware.setAttribute('aria-hidden','true');hardware.innerHTML='<i class="phone-side-button one"></i><i class="phone-side-button two"></i><i class="phone-side-button three"></i>';device.prepend(hardware);
const home=document.createElement('section');home.className='phone-native-home';home.setAttribute('aria-label','YEAR:ON 스마트폰 홈 화면');
const dockIcon=(kind)=>({phone:'<path d="M7 3 4 5c-2 4 7 14 11 15l4-3-4-4-3 2-4-5 2-3Z" fill="white"/>',video:'<rect x="3" y="6" width="12" height="12" rx="3" fill="white"/><path d="m15 10 6-4v12l-6-4Z" fill="white"/>',chat:'<path d="M21 11c0 5-5 8-10 8l-6 2 1-5C1 9 6 3 12 3c5 0 9 3 9 8" fill="white"/>',talk:'<ellipse cx="12" cy="10.5" rx="10" ry="7.8" fill="#382823"/><path d="m6.2 16.1-1 4.1 4.8-3" fill="#382823"/><text x="12" y="12.3" text-anchor="middle" fill="#ffe500" stroke="none" font-family="Arial,sans-serif" font-size="5.7" font-weight="800" letter-spacing="-.3">TALK</text>'}[kind]);
home.innerHTML='<button class="phone-yearon-app" type="button" aria-label="YEAR:ON 앱 열기"><span><img src="assets/images/yearon-symbol-white-final.webp" alt=""></span><b>YEAR:ON</b></button><button type="button" class="phone-home-search" aria-label="게시물 검색"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span>검색</span></button><div class="phone-native-dock" aria-hidden="true">'+['phone','video','chat','talk'].map(k=>'<span class="dock-'+k+'"><svg viewBox="0 0 24 24">'+dockIcon(k)+'</svg></span>').join('')+'</div>';
app.append(home);const island=document.createElement('div');island.className='phone-native-island';island.setAttribute('aria-hidden','true');app.append(island);
const homeButton=document.createElement('button');homeButton.type='button';homeButton.className='phone-home-button';homeButton.setAttribute('aria-label','휴대폰 홈 화면으로');app.append(homeButton);
function contentInert(value){app.querySelectorAll('.culture-brand,.culture-feed,.culture-modes,.culture-sheet,.culture-story').forEach(el=>el.inert=value)}
function showHome(value){home.hidden=!value;app.classList.toggle('phone-is-home',value);contentInert(value);relock.hidden=value;homeButton.hidden=value;if(value)app.querySelector('[data-story-close]')?.click()}
function setLocked(value){lock.hidden=!value;app.classList.toggle('phone-is-locked',value);if(value){showHome(false);contentInert(true);relock.hidden=true;homeButton.hidden=true;localize();lock.querySelector('button').focus({preventScroll:true})}else showHome(true)}
home.querySelector('.phone-yearon-app').onclick=()=>{showHome(false);app.querySelector('.culture-feed').focus({preventScroll:true})};home.querySelector('.phone-home-search').onclick=()=>{showHome(false);app.querySelector('[data-page="search"]')?.click()};homeButton.onclick=()=>showHome(true);
let swipe = null;
lock.addEventListener('pointerdown', e => {
  if (!e.isPrimary || e.button !== 0) return;
  swipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
  e.target.setPointerCapture(e.pointerId);
});
lock.addEventListener('pointerup', e => {
  if (swipe?.id !== e.pointerId) return;
  const rise = swipe.y - e.clientY;
  const sideways = Math.abs(swipe.x - e.clientX);
  swipe = null;
  if (rise > Math.max(22, lock.clientHeight * .06) && rise > sideways) setLocked(false);
});
lock.addEventListener('lostpointercapture', e => {
  if (swipe?.id === e.pointerId) swipe = null;
});
lock.querySelector('button').onclick=()=>setLocked(false);lock.addEventListener('keydown',e=>{if(e.key==='ArrowUp'){e.preventDefault();setLocked(false)}});relock.onclick=()=>setLocked(true);
addEventListener('yearon-language-change',()=>{localize();home.querySelector('.phone-home-search span').textContent=t('검색','Search')});localize();setLocked(false);addEventListener('yearon-phone-reset',()=>setLocked(false));setInterval(localize,60000);
const albums={
 'kpop-01':{src:'assets/images/archive-v2/78410547.jpg',alt:'해밀턴 공연의 팬들 · 2018.09.23',source:'https://commons.wikimedia.org/wiki/File:ARMY_(BTS_fans)_during_Love_Yourself_concert_tour_in_Hamilton,_Canada,_23_September_2018.jpg',credit:'NamiiCho · CC BY 3.0 · 2018.09.23',first:'웸블리 · 2019.06.02',note:'서로 다른 공연장에서 함께한 순간들',noteEn:'Shared moments at different concerts'},
 'kfood-01':{src:'assets/images/phone-editorial-20261105/kfood-02.jpg',alt:'함께 굽고 나누는 식탁',source:'https://commons.wikimedia.org/wiki/File:Gimjang_in_Gaemi_Village,_1_December_2012.jpg',credit:'USAG-Humphreys · CC BY 2.0 · 2012.12.01',first:'함께 나누는 한식 테이블',note:'함께 먹고 준비하는 서로 다른 일상',noteEn:'Different moments of preparing and sharing food'}
};
function enhance(){app.querySelectorAll('.culture-post[data-post]').forEach(article=>{const a=albums[article.dataset.post],media=article.querySelector('.culture-photo');if(!a||!media||media.dataset.album)return;media.dataset.album='true';const first=media.querySelector('img'),track=document.createElement('div');track.className='phone-photo-track';track.tabIndex=0;track.setAttribute('aria-label',t('사진 모음 · 좌우로 넘기기','Photo collection · swipe horizontally'));const slide=document.createElement('div');slide.className='phone-photo-slide';slide.append(first);track.append(slide);const other=document.createElement('div');other.className='phone-photo-slide';const img=new Image();img.src=a.src;img.alt=a.alt;img.draggable=false;other.append(img);track.append(other);media.prepend(track);
 const tools=document.createElement('div');tools.className='phone-album-tools';tools.innerHTML='<button type="button" data-album-back aria-label="이전 사진">‹</button><span>1 / 2</span><button type="button" data-album-next aria-label="다음 사진">›</button>';media.append(tools);
 const caption=document.createElement('div');caption.className='phone-album-caption';media.after(caption);
 function paint(){const n=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));tools.querySelector('span').textContent=(n+1)+' / 2';caption.replaceChildren();const note=document.createElement('small');note.textContent=t(a.note,a.noteEn);caption.append(note);if(n){const l=document.createElement('a');l.href=a.source;l.target='_blank';l.rel='noopener noreferrer';l.textContent=a.credit+' ↗';caption.append(l)}else{const p=document.createElement('span');p.textContent=a.first;caption.append(p)}}
 function step(n){track.scrollTo({left:Math.max(0,Math.min(1,Math.round(track.scrollLeft/track.clientWidth)+n))*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
 tools.querySelector('[data-album-back]').onclick=()=>step(-1);tools.querySelector('[data-album-next]').onclick=()=>step(1);track.addEventListener('scroll',paint,{passive:true});track.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.stopPropagation();e.preventDefault();step(e.key==='ArrowRight'?1:-1)}});
 let drag=null;track.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'){drag={x:e.clientX,left:track.scrollLeft};track.setPointerCapture(e.pointerId)}e.stopPropagation()});track.addEventListener('pointermove',e=>{if(drag){track.scrollLeft=drag.left+drag.x-e.clientX;e.stopPropagation()}});track.addEventListener('pointerup',e=>{if(drag){const dx=drag.x-e.clientX;track.scrollTo({left:(Math.abs(dx)>track.clientWidth*.15?dx>0?1:0:Math.round(track.scrollLeft/track.clientWidth))*track.clientWidth,behavior:'smooth'});drag=null;e.stopPropagation()}});track.addEventListener('pointercancel',()=>drag=null);paint();
 })}
new MutationObserver(enhance).observe(app.querySelector('.culture-feed'),{childList:true});enhance();
})();
