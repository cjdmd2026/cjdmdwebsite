(() => {
 'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=v=>Math.max(0,Math.min(1,v));
 const art=$('.pledge-art');let heroFrame=0;
 function drawHero(){heroFrame=0;const p=reduced.matches?0:clamp(-$('.pledge-hero').getBoundingClientRect().top/innerHeight);art.style.setProperty('--scroll',String(p));}
 addEventListener('scroll',()=>{if(!heroFrame)heroFrame=requestAnimationFrame(drawHero)},{passive:true});
 art.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=art.getBoundingClientRect();art.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));art.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));});
 art.addEventListener('pointerleave',()=>{art.style.setProperty('--mx','0');art.style.setProperty('--my','0')});
 art.addEventListener('pointerdown',()=>{if(reduced.matches)return;art.classList.remove('is-pressed');void art.offsetWidth;art.classList.add('is-pressed')});art.addEventListener('animationend',e=>{if(e.animationName==='pledge-confirm')art.classList.remove('is-pressed')});
 reduced.addEventListener('change',()=>{drawHero();updateQuoteControls()});drawHero();

 const pen=$('#hero-pen'),stampTool=$('#hero-stamp'),stampMark=$('.poster-stamp'),resetTool=$('#hero-reset');let writingTimer=0,autoTimer=0,sealTimer=0,cleanupTimer=0;
 function setStampTarget(){art.classList.add('is-measuring-stamp');const t=stampTool.getBoundingClientRect(),m=stampMark.getBoundingClientRect();art.style.setProperty('--stamp-dx',`${m.left+m.width/2-(t.left+t.width/2)}px`);art.style.setProperty('--stamp-dy',`${m.top+m.height/2-(t.top+t.height*.97)}px`);art.classList.remove('is-measuring-stamp')}
 function setHeroStatus(step,title,copy){$('#pledge-step').textContent=step;$('#pledge-tool-title').textContent=title;$('#pledge-tool-copy').textContent=copy}
 function resetPledge(){[writingTimer,autoTimer,sealTimer,cleanupTimer].forEach(clearTimeout);art.classList.remove('is-writing','is-written','is-stamped','stamp-impact','pen-in-motion','stamp-tool-motion');pen.disabled=false;stampTool.disabled=true;setHeroStatus('STEP 01','펜으로 약속을 작성합니다.','페이지가 열리면 펜 다음 도장 순으로 자동 재생됩니다.')}
 function startStamp(event){event?.stopPropagation();clearTimeout(autoTimer);if(stampTool.disabled)return;setStampTarget();art.classList.add('stamp-tool-motion');stampTool.disabled=true;setHeroStatus('SEALING','직인을 찍고 있습니다.','들어 올린 도장이 인장 위치에 정렬된 뒤 눌러 찍힙니다.');sealTimer=setTimeout(()=>{art.classList.add('is-stamped','stamp-impact');setHeroStatus('COMPLETE','시민 연대서가 완성되었습니다.','한 사람의 관심이 함께 지키는 약속으로 남았습니다.')},990);cleanupTimer=setTimeout(()=>art.classList.remove('stamp-impact','stamp-tool-motion'),1500)}
 function startWriting(event){event?.stopPropagation();if(art.classList.contains('is-writing'))return;resetPledge();pen.disabled=true;art.classList.add('is-writing','pen-in-motion');setHeroStatus('WRITING 01 / 02','약속을 기록하고 있습니다.','펜촉이 세 문장과 서명 위치를 따라 움직입니다.');writingTimer=setTimeout(()=>{art.classList.remove('is-writing','pen-in-motion');art.classList.add('is-written');stampTool.disabled=false;setHeroStatus('STEP 02','이제 직인을 찍어 완성합니다.','펜 작성이 끝나 도장이 자동으로 이동합니다.');autoTimer=setTimeout(startStamp,reduced.matches?0:350)},reduced.matches?0:4700)}
 pen.addEventListener('click',startWriting);
 stampTool.addEventListener('click',startStamp);
 resetTool.addEventListener('click',event=>{event.stopPropagation();resetPledge();autoTimer=setTimeout(startWriting,reduced.matches?0:250)});
 resetPledge();autoTimer=setTimeout(startWriting,reduced.matches?0:600);

 const KEY='efact-solidarity-exhibition-v1',BASE=24373,TARGET=33000,form=$('#sign-form'),status=$('#form-status');let records=[],currentCertificate=null;
 function load(){try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(data)?data.filter(r=>r&&typeof r.name==='string'&&typeof r.region==='string'&&typeof r.message==='string').slice(-20):[]}catch{return []}}
 records=load();
 let gaugeFrame=0,displayCount=0;
 function animateGauge(){cancelAnimationFrame(gaugeFrame);const from=displayCount,to=BASE+records.length,start=performance.now();
  function tick(now){const p=reduced.matches?1:clamp((now-start)/1450),ease=1-Math.pow(1-p,3);displayCount=Math.round(from+(to-from)*ease);const ratio=Math.min(1,displayCount/TARGET);
   $('#total-count').textContent=displayCount.toLocaleString('ko-KR');$('#gauge-percent').textContent=Math.round(ratio*100)+'%';$('#gauge-fill').style.transform=`scaleX(${ratio})`;$('#gauge').setAttribute('aria-valuenow',String(Math.min(TARGET,displayCount)));$('#gauge').setAttribute('aria-valuetext',`시연 기준 ${BASE.toLocaleString('ko-KR')}명과 이 브라우저 체험 ${records.length}개`);if(p<1)gaugeFrame=requestAnimationFrame(tick);
  }gaugeFrame=requestAnimationFrame(tick);$('#gauge-caption').textContent=`시연 기준 24,373명 + 이 브라우저 체험 ${records.length}개`;
 }

 const samples=[
  ['환경 문제를 알고 난 뒤 작은 실천부터 시작하고 싶습니다. 함께하는 관심이 변화를 만든다고 믿습니다.','관심의 시작'],
  ['소각장 관련 환경 정보가 더 투명하게 공개되길 바랍니다.','알 권리'],
  ['주민과 행정이 함께 논의하는 자리가 필요합니다.','함께하는 논의'],
  ['청주의 환경 문제를 더 많은 시민이 알고 목소리를 보탰으면 합니다.','더 넓은 공감'],
  ['앞으로도 환경 문제를 알리고 연대하는 활동에 꾸준히 관심을 갖겠습니다.','지속적인 참여']
 ];
 const viewport=$('.quote-viewport'),track=$('#quote-track');let quoteOffset=0,quoteWidth=0,manualPause=false,hoverPause=false,focusPause=false,quoteVisible=false,lastTime=0,quoteFrame=0;
 function makeCard(item,index){const card=document.createElement('article');card.className='quote-card'+(item.local?' local':'');const mark=document.createElement('span'),number=document.createElement('b'),text=document.createElement('p'),by=document.createElement('small');mark.className='quote-mark';mark.textContent='“';mark.setAttribute('aria-hidden','true');number.textContent=String(index+1).padStart(2,'0');number.setAttribute('aria-hidden','true');text.textContent=item.message;by.textContent=item.label;card.append(mark,number,text,by);return card}
 function renderQuotes(){track.replaceChildren();const items=[...records.filter(r=>r.visibility==='public'&&r.message.trim()).slice().reverse().map(r=>({message:r.message,label:'익명 시민 · 이 브라우저 체험',local:true})),...samples.map(([message,label])=>({message,label:label+' · 예시 문구'}))];const group=document.createElement('div');group.className='quote-set';items.forEach((r,i)=>group.append(makeCard(r,i)));const duplicate=group.cloneNode(true);duplicate.setAttribute('aria-hidden','true');duplicate.inert=true;track.append(group,duplicate);quoteOffset=0;quoteWidth=group.getBoundingClientRect().width+18;track.style.transform='translateX(0)';}
 function updateQuoteControls(){const stopped=manualPause||reduced.matches;$('#quotes-pause').textContent=stopped?'흐름 재생 ▷':'흐름 멈추기 Ⅱ';$('#quotes-pause').setAttribute('aria-pressed',String(stopped));$('#quotes-pause').disabled=reduced.matches;viewport.style.overflowX=reduced.matches?'auto':'hidden';if(reduced.matches){track.style.transform='none';track.lastElementChild?.setAttribute('hidden','')}else{track.lastElementChild?.removeAttribute('hidden')}restartQuotes()}
 function tickQuotes(time){quoteFrame=0;const delta=lastTime?Math.min(48,time-lastTime):0;lastTime=time;if(quoteVisible&&!document.hidden&&!manualPause&&!hoverPause&&!focusPause&&!reduced.matches&&quoteWidth>0){quoteOffset=(quoteOffset+delta*.026)%quoteWidth;track.style.transform=`translate3d(${-quoteOffset}px,0,0)`}if(quoteVisible&&!document.hidden&&!reduced.matches)quoteFrame=requestAnimationFrame(tickQuotes)}
 function restartQuotes(){lastTime=0;if(!quoteFrame&&quoteVisible&&!document.hidden&&!reduced.matches)quoteFrame=requestAnimationFrame(tickQuotes)}
 new IntersectionObserver(([e])=>{quoteVisible=e.isIntersecting;restartQuotes()}).observe(viewport);
 new ResizeObserver(()=>{const group=track.firstElementChild;if(group)quoteWidth=group.getBoundingClientRect().width+18}).observe(viewport);
 viewport.addEventListener('mouseenter',()=>hoverPause=true);viewport.addEventListener('mouseleave',()=>hoverPause=false);viewport.addEventListener('focusin',()=>focusPause=true);viewport.addEventListener('focusout',()=>focusPause=false);document.addEventListener('visibilitychange',restartQuotes);
 $('#quotes-pause').addEventListener('click',()=>{manualPause=!manualPause;updateQuoteControls()});
 function shiftQuote(direction){if(reduced.matches){viewport.scrollBy({left:direction*288,behavior:'instant'});return}manualPause=true;quoteOffset=((quoteOffset+direction*(innerWidth<700?288:318))%quoteWidth+quoteWidth)%quoteWidth;track.style.transform=`translate3d(${-quoteOffset}px,0,0)`;updateQuoteControls()}
 $('#quotes-prev').addEventListener('click',()=>shiftQuote(-1));$('#quotes-next').addEventListener('click',()=>shiftQuote(1));viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();shiftQuote(e.key==='ArrowRight'?1:-1)}});

 function recordID(r){return String(r.id||new Date(r.createdAt).getTime()||Date.now()).replace(/[^\d]/g,'').slice(-8).padStart(8,'0')}
 function showCertificate(record,scroll=true){currentCertificate=record;$('#certificate-result').hidden=false;$('#cert-name').textContent=record.name;$('#cert-region').textContent=record.region;$('#cert-message').textContent=record.message||'작은 관심이 모여, 우리의 내일을 바꿉니다.';$('#cert-date').textContent=new Date(record.createdAt||Date.now()).toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric'});$('#cert-number').textContent='NO. '+recordID(record);$('#step-seal').classList.add('current');$('#step-download').classList.add('current');const seal=$('.cert-seal');seal.style.animation='none';void seal.offsetWidth;seal.style.animation='';document.dispatchEvent(new CustomEvent('solidarity:certificate',{detail:{...record,number:recordID(record)}}));if(scroll){$('#result-title').focus({preventScroll:true});$('#certificate-result').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'})}}
 function renderRecords(){const list=$('#saved-list');list.replaceChildren();$('#count').textContent=String(records.length).padStart(2,'0');$('#clear').disabled=!records.length;if(!records.length){const p=document.createElement('p');p.textContent='아직 이 브라우저에 남긴 체험 기록이 없습니다.';list.append(p)}records.slice().reverse().forEach(r=>{const item=document.createElement('article'),meta=document.createElement('div'),name=document.createElement('strong'),region=document.createElement('small'),message=document.createElement('p'),button=document.createElement('button');name.textContent=r.name;region.textContent=r.region+(r.visibility==='public'?' · 한마디 익명 표시':' · 한마디 비표시');message.textContent=r.message||'지역의 변화에 관심을 더합니다.';button.type='button';button.className='text-button';button.textContent='연대서 다시 받기 ↗';button.addEventListener('click',()=>showCertificate(r));meta.append(name,region);item.append(meta,button,message);list.append(item)});renderQuotes();updateQuoteControls();}
 $('#message').addEventListener('input',()=>$('#length').textContent=String($('#message').value.length));$('#name').addEventListener('input',()=>$('#name').setCustomValidity(''));
 form.addEventListener('submit',event=>{event.preventDefault();const name=form.elements.name.value.trim();if(name.length<2){$('#name').setCustomValidity('공백을 제외한 두 글자 이상을 입력해주세요.');$('#name').reportValidity();return}if(!form.reportValidity())return;const record={id:Date.now(),name,region:form.elements.region.value,message:form.elements.message.value.trim(),visibility:form.elements.visibility.value,createdAt:new Date().toISOString()};const next=[...load(),record].slice(-20);try{localStorage.setItem(KEY,JSON.stringify(next))}catch{status.textContent='브라우저 저장을 사용할 수 없어 서명을 기록하지 못했습니다. 저장 설정을 확인해주세요.';return}records=next;renderRecords();animateGauge();showCertificate(record);form.reset();$('#length').textContent='0';status.textContent='서명이 저장되고 연대서가 발급되었습니다. 아래에서 다운로드할 수 있습니다.';});
 $('#clear').addEventListener('click',()=>{if(!records.length||!confirm('이 브라우저의 체험 서명과 연대서 기록을 모두 지울까요?'))return;try{localStorage.removeItem(KEY)}catch{status.textContent='삭제하지 못했습니다. 브라우저 설정을 확인해주세요.';return}records=[];currentCertificate=null;$('#certificate-result').hidden=true;$('#step-seal').classList.remove('current');$('#step-download').classList.remove('current');document.dispatchEvent(new Event('solidarity:clear'));renderRecords();animateGauge();status.textContent='이 브라우저의 체험 기록을 삭제했습니다.'});
 const cert=$('#certificate');cert.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||reduced.matches)return;const r=cert.getBoundingClientRect();cert.style.setProperty('--rx',`${-(e.clientY-r.top-r.height/2)/r.height*3}deg`);cert.style.setProperty('--ry',`${(e.clientX-r.left-r.width/2)/r.width*4}deg`)});cert.addEventListener('pointerleave',()=>{cert.style.setProperty('--rx','0deg');cert.style.setProperty('--ry','0deg')});$('#print-cert').addEventListener('click',()=>{if(currentCertificate)window.print()});
 renderRecords();animateGauge();
})();

// 설명형 섹션은 질문을 먼저 보여준 뒤 답변 목록을 다음 화면에서 공개합니다.
(() => {
 const answers=[...document.querySelectorAll('.narrative-question, .narrative-answer')];
 if(!answers.length)return;
 document.documentElement.classList.add('narrative-ready');
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){answers.forEach(answer=>answer.classList.add('is-narrative-visible'));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-narrative-visible');observer.unobserve(entry.target)}),{threshold:.16,rootMargin:'0px 0px -8% 0px'});
 answers.forEach(answer=>observer.observe(answer));
})();
