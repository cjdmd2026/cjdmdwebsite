(()=>{
 const root=document.getElementById('aboutEntryStory'),gate=document.getElementById('yaiGate'),stage=root.querySelector('.yai-stage'),scenes=[...root.querySelectorAll('.yai-scene')],arts=[...root.querySelectorAll('.yai-painting')],album=document.getElementById('abrArchive'),works=[...album.querySelectorAll('.abr-work')],relations=document.getElementById('aboutRelations');
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},progress=e=>clamp(-e.getBoundingClientRect().top/Math.max(1,e.offsetHeight-innerHeight));let frame=0;
 let uriRunning=false,uriDone=false,uriStart=0,uriBase=0,uriTravel=0;
 const uriBlock=e=>{if(uriRunning&&!e.target.closest('a,button,input'))e.preventDefault()};
 addEventListener('wheel',uriBlock,{passive:false});addEventListener('touchmove',uriBlock,{passive:false});addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(e.key))uriBlock(e)});
 function advanceUri(now){
  const rect=relations.getBoundingClientRect(),travel=Math.max(1,relations.offsetHeight-innerHeight),p=-rect.top/travel;
  if(!uriRunning&&!uriDone&&p>=.32&&p<.60){uriRunning=true;uriStart=now;uriBase=scrollY+rect.top;uriTravel=travel;}
  if(uriRunning&&!document.hidden){const t=Math.min(1,(now-uriStart)/5400);scrollTo({top:uriBase+uriTravel*(.32+.26*t),behavior:'instant'});request();if(t===1){uriRunning=false;uriDone=true}}
  if(p<.1)uriDone=false;
  requestAnimationFrame(advanceUri);
 }
 requestAnimationFrame(advanceUri);
 history.scrollRestoration='manual';if(!location.hash)scrollTo(0,0);
 function render(){frame=0;const p=root.dataset.entryComplete==='true'?Math.max(.16,progress(root)):progress(root),gateP=clamp(p/.10);gate.style.opacity=String(1-ease((p-.084)/.020));const gateTime=Number.isFinite(gate.duration)?Math.min(gate.duration-.03,gateP*gate.duration):0;if(!entering&&!gate.seeking&&Math.abs(gate.currentTime-gateTime)>.04)gate.currentTime=gateTime;gate.style.transform=`scale(${1+ease(gateP)*.65+Math.pow(clamp((gateP-.32)/.68),1.7)*1.55})`;gate.style.transformOrigin="50% 68%";const poster=root.querySelector('.yai-gate-poster');poster.style.opacity=String(1-ease(p/.008));poster.style.transform=gate.style.transform;poster.style.transformOrigin=gate.style.transformOrigin;root.querySelector('.yai-entry-heading').style.opacity=String(1-ease(p/.025));root.querySelector('.yai-white').style.opacity='0';
 const ranges=[[.12,.23],[.23,.34],[.34,.60],[.60,.86],[.86,1.01]];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 scenes.forEach((scene,i)=>{
  const [start,end]=ranges[i],visible=p>=start&&p<end;
  scene.style.opacity=visible?String(Math.min(1,(p-start)/.012,(end-p)/.012)):'0';
  scene.style.visibility=visible?'visible':'hidden';
  scene.setAttribute('aria-hidden',String(!visible));
  const video=scene.querySelector('.yai-art-video');
  if(video){
   const isMudong=scene.dataset.painting==='mudong';
   video.style.transform=isMudong?'translateY(-50%) scaleX(.86)':'none';
   const backdrop=scene.querySelector('.yai-art-backdrop');
   if(visible){
    if(video.paused){video.muted=true;video.play().catch(()=>{});}
    if(backdrop){
     if(video.readyState>=2&&backdrop.readyState>=2&&Math.abs(backdrop.currentTime-video.currentTime)>.25)backdrop.currentTime=video.currentTime;
     if(backdrop.paused){backdrop.muted=true;backdrop.play().catch(()=>{});}
    }
   }else{
    if(!video.paused)video.pause();
    if(backdrop&&!backdrop.paused)backdrop.pause();
   }
   return;
  }
  if(!visible||!scene.classList.contains('yai-painting'))return;

  const img=scene.querySelector('img');
  const pan=ease((p-start)/(end-start));
  const offset=reducedMotion?0:(pan-.5)*14;
  const zoom=reducedMotion?1.18:1.18+pan*.04;
  img.style.objectPosition=scene.dataset.painting==='mudong'?'50% 40%':'50% 45%';
  img.style.transform=`translate3d(${offset}%, 0, 0) scale(${zoom})`;
 });
 const albumTravel=Math.max(1,album.offsetHeight-innerHeight);const ap=clamp((-album.getBoundingClientRect().top-innerHeight*.45)/Math.max(1,albumTravel-innerHeight*.9))*(works.length+1.4);const closing=root.ownerDocument.querySelector('.abr-album-closing'),closingAlpha=ease((ap-(works.length-.8))/.35),artAlpha=1-ease((ap-(works.length-.4))/.65);closing.style.opacity=String(closingAlpha);closing.setAttribute('aria-hidden',String(closingAlpha<.05));const ep=clamp((ap-(works.length-.8))/2.1);album.style.setProperty('--album-bridge',ep);closing.querySelectorAll('.album-closing-line').forEach((line,i)=>{const a=i===0?ease(ep/.16)*(1-ease((ep-.34)/.12)):ease((ep-.43)/.14);line.style.opacity=String(a)});works.forEach((w,i)=>{const d=i-ap,ad=Math.abs(d),on=ad<2.2,x=d*(Math.min(innerWidth*(innerWidth<760?.78:.43),650)*.87+(innerWidth<760?20:32))/innerWidth*100,y=d*13+(i%2?.8:-.8),scale=Math.max(.46,1-ad*.26);w.style.visibility=on?'visible':'hidden';w.style.opacity=String((ad<.48?1:clamp(.16-ad*.05))*artAlpha);w.style.transform=`translate3d(${x}vw,${y}vh,0) scale(${scale})`;w.style.zIndex=String(100-Math.round(ad*12));w.style.pointerEvents=ad<.5?'auto':'none';w.classList.toggle('is-active',ad<.5);w.classList.toggle('is-reading',ad<.42);const caption=w.querySelector('figcaption');caption.style.transform='none';caption.style.opacity=ad<.48?'1':'0';w.setAttribute('aria-hidden',String(ad>=.5))});
 const rp=progress(relations);window.YEARONWeness?.(rp);
 const map=document.getElementById('wnRelationMap');const light=relations.getBoundingClientRect().top<innerHeight*.5&&map.getBoundingClientRect().bottom>innerHeight*.5;document.body.classList.toggle('about-light',light);

 }
 function request(){if(!frame)frame=requestAnimationFrame(render)}
 let entering=false,entered=location.hash.length>0,entryAttempt=0,entrySafeguard=0,entryBoot=0;
 // During entry, let the decoder play continuously instead of repeatedly seeking.
 async function enter(){
  if(entering||entered)return;entering=true;const attempt=++entryAttempt;delete root.dataset.entryComplete;
  const entryTop=scrollY+root.getBoundingClientRect().top;
  const finishEntry=()=>{if(!entering||attempt!==entryAttempt)return;clearTimeout(entrySafeguard);entering=false;entered=true;root.dataset.entryComplete='true';gate.pause();scrollTo({top:entryTop+Math.max(1,root.offsetHeight-innerHeight)*.16,behavior:'instant'});request()};
  entrySafeguard=setTimeout(finishEntry,6800);
  gate.muted=true;gate.playbackRate=1.5;
  let playback=true;
  gate.play().catch(()=>{playback=false});
  const started=performance.now();let handoffStart=null;
  function tick(now){
   if(!entering||attempt!==entryAttempt)return;
   const duration=Number.isFinite(gate.duration)&&gate.duration>0?gate.duration:6.04;
   const elapsed=now-started;
   const t=playback?Math.max(clamp(gate.currentTime/duration),clamp((elapsed-1200)/5000)):clamp(elapsed/2800);
   if(playback&&handoffStart===null)gate.playbackRate=1.5+1.4*ease(t)+4.3*ease(clamp((t-.30)/.40));
   let p=.10*t;
   if(t>=.88||gate.ended){
    if(handoffStart===null){handoffStart=now;gate.pause()}
    const finish=clamp((now-handoffStart)/380);p=.105+.045*ease(finish);
    if(finish>=1){finishEntry();return}
   }
   scrollTo({top:entryTop+(root.offsetHeight-innerHeight)*p,behavior:'instant'});request();
   if(entering)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
 }
 addEventListener('wheel',e=>{if(entering){e.preventDefault();return}if(!entered&&scrollY<innerHeight*.3&&e.deltaY>0){e.preventDefault();enter()}},{passive:false});

 // Bound large wheel/trackpad bursts only while standalone copy is being read.
 let readingFrame=0,readingQueue=0,readingLast=0,readingTouch=null;
 function readingZone(){const p=progress(root);if(p>=.115&&p<.34||p>=.855&&p<=1&&root.getBoundingClientRect().bottom>innerHeight*.4)return true;return [...document.querySelectorAll('.about-pair.story-subtitle')].some(e=>{const b=e.getBoundingClientRect();return b.top<innerHeight*.7&&b.bottom>innerHeight*.3})}
 function readingTick(now){readingFrame=0;const dt=Math.min(40,now-(readingLast||now-16));readingLast=now;const step=Math.sign(readingQueue)*Math.min(Math.abs(readingQueue),innerHeight*.85*dt/1000);scrollBy({top:step,behavior:'instant'});readingQueue-=step;if(Math.abs(readingQueue)>1&&readingZone())readingFrame=requestAnimationFrame(readingTick);else{readingQueue=0;readingLast=0}}
 function paceReading(e,delta){if(e.defaultPrevented||entering||uriRunning||!readingZone()||e.target.closest('a,button,input,textarea,select')||!delta)return;e.preventDefault();readingQueue=Math.max(-innerHeight*.6,Math.min(innerHeight*.6,readingQueue+delta));if(!readingFrame)readingFrame=requestAnimationFrame(readingTick)}
 addEventListener('wheel',e=>{if(!e.ctrlKey&&Math.abs(e.deltaY)>=Math.abs(e.deltaX))paceReading(e,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1))},{passive:false});
 addEventListener('touchstart',e=>readingTouch=e.touches[0]?.clientY,{passive:true});addEventListener('touchmove',e=>{const y=e.touches[0]?.clientY;if(readingTouch!=null&&y!=null)paceReading(e,readingTouch-y);readingTouch=y},{passive:false});addEventListener('touchend',()=>readingTouch=null,{passive:true});
 root.querySelector('.yai-start').addEventListener('click',enter);gate.addEventListener('loadedmetadata',request);gate.addEventListener('seeked',request);addEventListener('scroll',request,{passive:true});addEventListener('resize',request);function bootEntry(){if(location.hash)return;clearTimeout(entryBoot);clearTimeout(entrySafeguard);entryAttempt++;entering=false;entered=false;delete root.dataset.entryComplete;scrollTo(0,0);entryBoot=setTimeout(enter,500);request()}
 addEventListener('pageshow',bootEntry);entryBoot=setTimeout(()=>{if(!location.hash&&!entered&&!entering)enter()},700);render();
})();
