(()=>{
  const track=document.querySelector('#timeTrack'),deck=document.querySelector('#timeDeck'),panels=[...document.querySelectorAll('.time-panel')];
  let index=Math.max(0,Math.min(5,Number(new URLSearchParams(location.search).get('era')??3))),start=0,outerDrag=false,wheelLock=false;
  const go=n=>{index=Math.max(0,Math.min(5,Number.isFinite(n)?n:3));document.querySelector('.era-bridge')?.classList.toggle('at-present',index===5);track.style.setProperty('--time-index',index);panels.forEach((p,i)=>{p.classList.toggle('active',i===index);p.inert=i!==index});document.querySelectorAll('#timeNav button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-current',i===index?'step':'false');b.dataset.side=i<index?'past':i>index?'future':'present';b.style.setProperty('--row',i<index?i-(index-1)/2:i>index?i-index-1-(4-index)/2:0)});document.querySelector('#prevEra').disabled=index===0;document.querySelector('#nextEra').disabled=index===5;const v=document.querySelector('#channelVideo');if(index!==3)v.pause();else dispatchEvent(new Event('yearon-crt-visibility'));};
  const updateNeighbours=()=>document.querySelectorAll('#timeNav button').forEach((b,i)=>b.dataset.neighbour=String(Math.abs(i-index)===1));
  new MutationObserver(updateNeighbours).observe(track,{attributes:true,attributeFilter:['style']});updateNeighbours();
  document.querySelectorAll('#timeNav button').forEach(b=>b.onclick=()=>go(+b.dataset.index));prevEra.onclick=()=>go(index-1);nextEra.onclick=()=>go(index+1);
  window.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,.television,.social-app,.radio-console,.pc-media'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopImmediatePropagation();go(index+(e.key==='ArrowRight'?1:-1));}},true);
  /* Era changes are button/drag/keyboard driven. Wheel remains available for
     scrolling inside the computer and phone experiences. */
  deck.addEventListener('pointerdown',e=>{if(e.target.closest('button,input,.television,.scroll-media,.paper-media,.pc-media,.phone-media'))return;outerDrag=true;start=e.clientX;deck.setPointerCapture(e.pointerId)});
  deck.addEventListener('pointerup',e=>{if(!outerDrag)return;outerDrag=false;const d=e.clientX-start;if(Math.abs(d)>65)go(index+(d<0?1:-1))});

  const makeRevealDrag=(el,onProgress,initial=0)=>{
    let active=false,sx=0,base=initial,progress=initial,motion=0,target=initial,lastFrame=0;
    const paint=v=>{progress=Math.max(0,Math.min(1,v));onProgress(progress);el.dispatchEvent(new Event('yearon-scroll-reveal'));};
    const moveTo=(v,animate=false,duration=430)=>{cancelAnimationFrame(motion);if(!animate||matchMedia('(prefers-reduced-motion:reduce)').matches){paint(v);return;}const from=progress,start=performance.now();const tick=now=>{const t=Math.min(1,(now-start)/duration);paint(from+(v-from)*(1-Math.pow(1-t,3)));if(t<1)motion=requestAnimationFrame(tick);};motion=requestAnimationFrame(tick);};
    paint(progress);
    el.addEventListener('pointerdown',e=>{if((el===scrollMedia&&el.dataset.tied!=='false')||e.button!==0||e.target.closest('.scene-pin,.scroll-art-point')||(el===scrollMedia&&!e.target.closest('.scroll-right-roller')))return;cancelAnimationFrame(motion);active=true;target=progress;lastFrame=0;sx=e.clientX;base=progress;el.setPointerCapture(e.pointerId);el.classList.add('dragging');e.preventDefault();});
    const follow=now=>{const dt=Math.min(40,now-(lastFrame||now-16));lastFrame=now;const next=progress+(target-progress)*(1-Math.exp(-dt/55));paint(Math.abs(target-next)<.0003?target:next);if(active||Math.abs(target-progress)>.0003)motion=requestAnimationFrame(follow);else lastFrame=0;};
    el.addEventListener('pointermove',e=>{if(!active)return;target=Math.max(0,Math.min(1,base+(e.clientX-sx)/(el===scrollMedia?(Number(el.dataset.scrollTravel)||el.clientWidth*.9):innerWidth*.55)));if(el===scrollMedia){if(!lastFrame){lastFrame=performance.now();motion=requestAnimationFrame(follow);}}else paint(target);});
    const release=()=>{if(!active)return;active=false;el.classList.remove('dragging');if(el===scrollMedia){if(target<.025)moveTo(0,true,180);return;}if(progress>.9)moveTo(1,true);else if(progress<(el===scrollMedia ? .18 : .08))moveTo(0,true);};
    el.addEventListener('pointerup',release);el.addEventListener('pointercancel',release);return moveTo;
  };
  const paintScroll=makeRevealDrag(scrollMedia,p=>{const eased=p*p*(3-2*p);scrollMedia.style.setProperty('--reveal',p);scrollMedia.style.setProperty('--scroll-progress',p);scrollMedia.style.setProperty('--reveal-width',`${5+eased*90}%`);scrollMedia.classList.toggle('opened',p>.015);scrollMedia.classList.toggle('fully-open',p>.985);scrollTrigger.textContent=window.YEARON_LANG==='en'?(p>.7?'← DRAG TO ROLL':'DRAG TO UNROLL →'):(p>.7?'← 드래그해 말기':'드래그해 펼치기 →')});
  scrollMedia.addEventListener('yearon-scroll-unfold',e=>paintScroll(1,true,e.detail?.duration||1900));
  scrollMedia.tabIndex=0;scrollMedia.setAttribute('aria-label','풍속화 두루마리: Enter 키로 펼치거나 말기');scrollMedia.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target===scrollMedia&&scrollMedia.dataset.tied==='false'){e.preventDefault();paintScroll(scrollMedia.classList.contains('fully-open')?0:1,true)}});
  scrollMedia.querySelector('.scroll-right-roller').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&scrollMedia.dataset.tied==='false'){e.preventDefault();e.stopPropagation();paintScroll(scrollMedia.classList.contains('fully-open')?0:1,true)}});
  scrollTrigger.addEventListener('pointerdown',e=>e.stopPropagation());document.querySelectorAll('.scroll-media .open button').forEach(b=>b.onmouseenter=()=>scrollNote.textContent=b.dataset.note);
  // Two paper faces share a fixed hinge. Pointer travel controls the fold directly.
  const book=document.createElement('div');book.className='paper-book';
  book.innerHTML='<div class="paper-fixed"></div><div class="paper-leaf paper-flex-leaf"></div>';
  const paperStripCount=64,paperRowCount=1,paperStrips=[],paperReduced=matchMedia('(prefers-reduced-motion:reduce)');
  for(let row=0;row<paperRowCount;row++)for(let i=0;i<paperStripCount;i++){
    const strip=document.createElement('div');strip.className='paper-flex-strip';strip.dataset.column=i;strip.dataset.row=row;
    strip.innerHTML='<div class="paper-flex-front"></div><div class="paper-flex-back"></div>';
    book.querySelector('.paper-leaf').append(strip);paperStrips.push(strip);
  }
  paperMedia.append(book);const paperHint=paperMedia.querySelector(':scope > span');if(paperHint)paperHint.textContent='DRAG LEFT TO UNFOLD · DRAG RIGHT TO CLOSE';paperMedia.tabIndex=0;paperMedia.setAttribute('role','button');
  paperMedia.setAttribute('aria-label','Drag left to unfold newspaper, drag right to close');
  let paperProgress=0,paperDrag=null,paperFrame=0,paperSheet=-1,paperBusy=false;
  const cover='assets/images/newspaper-front-user-20261109-final.webp';
  // User-provided artwork: cover, then the open spreads.
  const page=(src,half=null)=>({src,factor:half===null?1:2,offset:half||0});
  const paperSheets=[
    {left:page('assets/images/newspaper-user-spread-02-20261109.webp',0),right:page('assets/images/newspaper-user-spread-02-20261109.webp',1)},
    {left:page('assets/images/newspaper-user-spread-03-20261109.webp',0),right:page('assets/images/newspaper-user-spread-03-20261109.webp',1)},
    {left:page('assets/images/newspaper-user-spread-04-20261109.webp',0),right:page('assets/images/newspaper-user-spread-04-20261109.webp',1)},
    {left:page('assets/images/newspaper-user-final-20261109.webp'),right:null}
  ];
  const fixedPage=book.querySelector('.paper-fixed');
  const turningLeaf=book.querySelector('.paper-flex-leaf');
  let paperEndsOnSinglePage=false;
  let paperFront=page(cover),paperBack=paperSheets[0].left;
  const rest=document.createElement('div');rest.className='paper-left-rest';book.prepend(rest);
  const paperNav=document.createElement('nav');paperNav.className='paper-page-nav';
  paperNav.setAttribute('aria-label','신문 지면 넘기기');
  paperNav.innerHTML='<button type="button" data-paper-prev aria-label="이전 지면">← 이전</button><span aria-live="polite">표지</span><button type="button" data-paper-next aria-label="다음 지면">다음 →</button>';
  book.append(paperNav);
  function surface(el,spec){el.style.backgroundImage=`url("${spec.src}")`;el.style.backgroundSize=(spec.factor*100)+'% 100%';el.style.backgroundPosition=spec.offset?'right center':'left center';}
  function setFixedPage(index){
    const right=paperSheets[index].right;
    paperEndsOnSinglePage=!right;
    surface(fixedPage,right||paperSheets[index-1].right);
  }
  function paperCounter(){paperNav.querySelector('span').textContent=paperSheet<0?'표지':String(paperSheet+2).padStart(2,'0')+' / '+String(paperSheets.length+1).padStart(2,'0');paperNav.querySelector('[data-paper-prev]').disabled=paperSheet<0;paperNav.querySelector('[data-paper-next]').disabled=paperSheet===paperSheets.length-1;paperMedia.dataset.sheet=String(paperSheet+1);}
  function flatPaper(index){
    paperSheet=index;
    paperFront=page(cover);
    paperBack=paperSheets[Math.max(0,index)].left;
    setFixedPage(Math.max(0,index));
    book.classList.toggle('paper-final-flat',paperEndsOnSinglePage);
    rest.hidden=!paperEndsOnSinglePage;
    if(paperEndsOnSinglePage)surface(rest,paperBack);
    paintPaper(index<0?0:1);
    paperCounter();
  }
  function preparePaper(direction){
    book.classList.remove('paper-final-flat');
    if(direction>0){const next=paperSheet+1;if(next>=paperSheets.length)return null;paperFront=paperSheet<0?page(cover):paperSheets[paperSheet].right;paperBack=paperSheets[next].left;setFixedPage(next);rest.hidden=paperSheet<0;if(paperSheet>=0)surface(rest,paperSheets[paperSheet].left);paintPaper(0);return next;}
    if(paperSheet<0)return null;
    const previous=paperSheet-1;paperFront=previous<0?page(cover):paperSheets[previous].right;paperBack=paperSheets[paperSheet].left;setFixedPage(paperSheet);rest.hidden=previous<0;if(previous>=0)surface(rest,paperSheets[previous].left);paintPaper(1);return previous;
  }
  const paintPaper=p=>{
    paperProgress=Math.max(0,Math.min(1,p));
    book.style.setProperty("--paper-progress",paperProgress);
    const centerEase=(1-Math.cos(Math.PI*paperProgress))/2;
    const coverOffset=paperEndsOnSinglePage?-25*centerEase:rest.hidden?25*(1-centerEase):0;
    const finalFlat=book.classList.contains('paper-final-flat');
    fixedPage.style.opacity=paperEndsOnSinglePage?String(1-centerEase):'';
    rest.style.opacity=paperEndsOnSinglePage&&!finalFlat?String(1-centerEase):'';
    turningLeaf.hidden=finalFlat;
    book.style.setProperty("--paper-cover-offset",coverOffset+"%");
    const wave=paperReduced.matches?0:Math.sin(Math.PI*paperProgress),width=book.clientWidth*.5,step=width/paperStripCount;
    const height=book.clientHeight,rowHeight=height/paperRowCount;
    let x=0,z=0;
    paperStrips.forEach((strip,k)=>{
      const i=k%paperStripCount,row=Math.floor(k/paperStripCount),u=(i+.5)/paperStripCount;
      if(i===0){x=0;z=0;}
      // The hinge stays anchored while the curl travels inward from the free edge.
      const curl=2.5*Math.pow(u,1.8)-.75*u;
      const angle=-Math.PI*paperProgress-wave*curl;
      strip.style.width=(step+.35)+'px';strip.style.height=(rowHeight+.65)+'px';
      const front=strip.firstElementChild,back=strip.lastElementChild;
      front.style.backgroundImage=`url("${paperFront.src}")`;
      front.style.backgroundSize=(width*paperFront.factor)+'px '+height+'px';
      front.style.backgroundPosition=(-paperFront.offset*width-i*step)+'px '+(-row*rowHeight)+'px';
      back.style.backgroundSize=(width*paperBack.factor)+'px '+height+'px';back.style.backgroundImage=`url("${paperBack.src}")`;
      back.style.backgroundPosition=(-paperBack.offset*width-(paperStripCount-1-i)*step)+'px '+(-row*rowHeight)+'px';
      strip.style.transform=`translate3d(${x}px,${row*rowHeight}px,${z}px) rotateY(${angle}rad)`;
      strip.style.setProperty('--paper-grain-x',(-i*step)+'px');
      strip.style.setProperty('--strip-shade',String(wave*(.035+.23*Math.abs(Math.sin(angle)))));
      x+=Math.cos(angle)*step;z-=Math.sin(angle)*step;
    });
    book.style.setProperty('--shade',wave*.22);book.style.setProperty('--paper-lift',wave);
    paperMedia.classList.toggle('opened',paperProgress>.5);paperMedia.setAttribute('aria-expanded',String(paperProgress>.5));
  };
  const settlePaper=(target,done,committed=true)=>{
    cancelAnimationFrame(paperFrame);paperBusy=true;const from=paperProgress;
    const start=performance.now(),duration=paperReduced.matches?1:330+Math.abs(target-from)*420;
    if(committed)pageTurn(paperReduced.matches?480:duration);
    const tick=now=>{const t=Math.min(1,(now-start)/duration),e=t*t*(3-2*t);paintPaper(from+(target-from)*e);if(t<1)paperFrame=requestAnimationFrame(tick);else{paperBusy=false;done?.();}};
    paperFrame=requestAnimationFrame(tick);
  };
  const turnPaper=direction=>{if(paperBusy)return;const next=preparePaper(direction);if(next===null)return;settlePaper(direction>0?1:0,()=>flatPaper(next));};
  paperNav.addEventListener('pointerdown',e=>e.stopPropagation());paperNav.addEventListener('pointerup',e=>e.stopPropagation());
  paperNav.querySelector('[data-paper-prev]').onclick=()=>turnPaper(-1);paperNav.querySelector('[data-paper-next]').onclick=()=>turnPaper(1);
  paperMedia.addEventListener('pointerdown',e=>{if(e.button!==0||paperBusy||e.target.closest('.paper-page-nav'))return;paperDrag={x:e.clientX,lastX:e.clientX,lastTime:performance.now(),velocity:0,original:paperSheet,dir:0,next:null};paperMedia.classList.add('dragging');paperMedia.setPointerCapture(e.pointerId);e.preventDefault();});
  paperMedia.addEventListener('pointermove',e=>{if(!paperDrag)return;const now=performance.now(),dt=Math.max(8,now-paperDrag.lastTime);paperDrag.velocity=paperDrag.velocity*.35+((paperDrag.lastX-e.clientX)/dt)*.65;paperDrag.lastX=e.clientX;paperDrag.lastTime=now;const delta=paperDrag.x-e.clientX;if(!paperDrag.dir&&Math.abs(delta)>4){paperDrag.dir=delta>0?1:-1;paperDrag.next=preparePaper(paperDrag.dir);}if(paperDrag.next!==null)paintPaper((paperDrag.dir>0?0:1)+delta/(book.clientWidth*.52));});
  paperMedia.addEventListener('pointerup',e=>{if(!paperDrag)return;const drag=paperDrag,moved=Math.abs(e.clientX-drag.x);paperDrag=null;paperMedia.classList.remove('dragging');if(paperMedia.hasPointerCapture(e.pointerId))paperMedia.releasePointerCapture(e.pointerId);if(moved<6){flatPaper(drag.original);turnPaper(1);return;}if(drag.next===null){flatPaper(drag.original);return;}const velocity=performance.now()-drag.lastTime<100?drag.velocity:0;const projected=paperProgress+velocity*.16;const complete=drag.dir>0?projected>.48:projected<.52;settlePaper(complete?(drag.dir>0?1:0):(drag.dir>0?0:1),()=>flatPaper(complete?drag.next:drag.original),complete);});
  paperMedia.addEventListener('pointercancel',()=>{if(!paperDrag)return;const drag=paperDrag;paperDrag=null;paperMedia.classList.remove('dragging');settlePaper(drag.dir<0?1:0,()=>flatPaper(drag.original),false);});
  paperMedia.addEventListener('keydown',e=>{if(e.target.closest('.paper-page-nav'))return;if(e.key==='Enter'||e.key===' '){e.preventDefault();turnPaper(e.shiftKey?-1:1);}});
  flatPaper(-1);
  new ResizeObserver(()=>paintPaper(paperProgress)).observe(book);

  let audioContext;
  const audio=()=>audioContext||(audioContext=new (window.AudioContext||window.webkitAudioContext)());
  const clickSound=(pitch=120)=>{const c=audio(),o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.setValueAtTime(pitch,c.currentTime);o.frequency.exponentialRampToValueAtTime(55,c.currentTime+.055);g.gain.setValueAtTime(.055,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.065);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.07)};
  const scrollPageTurn=(direction=1)=>{const c=audio(),now=c.currentTime,duration=.48,n=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++){const t=i/d.length,env=Math.pow(Math.sin(Math.PI*t),1.8)*(1-t*.45);d[i]=(Math.random()*2-1)*env}const s=c.createBufferSource(),low=c.createBiquadFilter(),high=c.createBiquadFilter(),g=c.createGain();low.type='lowpass';low.frequency.setValueAtTime(2400,c.currentTime);low.frequency.exponentialRampToValueAtTime(780,c.currentTime+duration);high.type='highpass';high.frequency.value=120;g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(.075,now+.07);g.gain.exponentialRampToValueAtTime(.0001,now+duration);s.playbackRate.value=direction>0?1:.9;s.buffer=n;s.connect(high).connect(low).connect(g).connect(c.destination);s.start(now);const tap=c.createOscillator(),tapGain=c.createGain();tap.type='sine';tap.frequency.setValueAtTime(direction>0?105:88,now+.3);tap.frequency.exponentialRampToValueAtTime(52,now+.39);tapGain.gain.setValueAtTime(.0001,now);tapGain.gain.setValueAtTime(.035,now+.3);tapGain.gain.exponentialRampToValueAtTime(.0001,now+.42);tap.connect(tapGain).connect(c.destination);tap.start(now+.29);tap.stop(now+.43)};
  function pageTurn(milliseconds){
    const context=audio();
    context.resume().catch(()=>{});
    const duration=milliseconds/1000;
    const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
    const samples=buffer.getChannelData(0);
    let previous=0;
    const pulse=(t,at,width)=>Math.exp(-Math.pow((t-at)/width,2));
    for(let i=0;i<samples.length;i++){
      const t=i/samples.length,noise=Math.random()*2-1;
      previous=previous*.72+noise*.28;
      const rustle=.30*pulse(t,.10,.06)+.68*pulse(t,.40,.18)+.28*pulse(t,.73,.09)+.16*pulse(t,.89,.055);
      const flutter=.48+.34*Math.sin(t*147)*Math.sin(t*54)+.18*Math.sin(t*254);
      samples[i]=(previous*.8+noise*.2)*rustle*flutter;
    }
    const source=context.createBufferSource();
    const filter=context.createBiquadFilter();
    const volume=context.createGain();
    filter.type='bandpass';
    filter.frequency.setValueAtTime(2400,context.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1150,context.currentTime+duration);
    filter.Q.value=.45;
    volume.gain.value=.23;
    source.buffer=buffer;
    source.connect(filter).connect(volume).connect(context.destination);
    source.start();
  }
  /* Radio playback is handled by radio-broadcast.js using mastered audio files. */

  scrollMedia.addEventListener('pointerdown',()=>scrollPageTurn(1));
  /* Era navigation stays silent; sound belongs only to an interaction inside a medium. */

  /* The 1990s desktop experience is managed by pc-experience.js. */
  go(index);
})();
