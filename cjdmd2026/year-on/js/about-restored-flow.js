(()=>{
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},chapters=[];
function add(root,layer){if(!root||!layer)return;layer.classList.add('about-fixed-scene');chapters.push({root,layer});}
add(document.getElementById('aboutEntryStory'),document.querySelector('.yai-stage'));
add(document.getElementById('artistSequence'),document.querySelector('#artistSequence .abr-artist'));
add(document.getElementById('abrArchive'),document.querySelector('.abr-archive-sticky'));
document.querySelectorAll('.about-pair').forEach(root=>{const layer=document.createElement('div');while(root.firstChild)layer.append(root.firstChild);root.append(layer);add(root,layer)});
add(document.getElementById('aboutCultureScenes'),document.querySelector('.about-culture-stage'));
const destination=document.querySelector('.about-destination');if(destination){const layer=document.createElement('div');layer.className='about-destination-content';while(destination.firstChild)layer.append(destination.firstChild);destination.append(layer);add(destination,layer)}
add(document.getElementById('aboutRelations'),document.querySelector('.wn-stage'));

const intro=document.getElementById('aboutEntryStory'),introCue=intro.querySelector('.yai-start');
const scrollCue=document.createElement('div');
scrollCue.className='about-reading-scroll';
scrollCue.setAttribute('aria-hidden','true');
scrollCue.innerHTML=introCue.innerHTML;
document.body.append(scrollCue);
const timelineRoot=document.getElementById('ypMediaAnchor');
const timelineStage=timelineRoot.querySelector('.media-story-stage');
// Keep the final era at its reading position while fading into the next chapter.
add(timelineRoot,timelineStage);
const timelineViewport=timelineRoot.querySelector('.media-story-viewport');
const timelineTrack=timelineRoot.querySelector('.media-story-track');
const timelineRows=Array.from(timelineTrack.querySelectorAll('.media-story-row'));
let timelineTravel=0,timelineCenters=[],activeTimelineRow,raf=0;
new ResizeObserver(()=>{
 timelineTravel=Math.max(0,timelineTrack.offsetWidth-timelineViewport.clientWidth);
 timelineCenters=timelineRows.map(row=>row.offsetLeft+row.querySelector('.media-story-image').offsetWidth/2);
 timelineRoot.style.setProperty('--timeline-travel',timelineTravel+'px');
 schedule();
}).observe(timelineTrack);
function render(){raf=0;const vh=innerHeight;let active;
for(const ch of chapters){const r=ch.root.getBoundingClientRect();let alpha=ease((vh*.28-r.top)/(vh*.18))*ease((r.bottom-vh*.10)/(vh*.18));
 if(ch.root.id==='aboutRelations')alpha=ease((vh*.85-r.top)/(vh*.85))*ease((r.bottom-vh*.02)/(vh*.65));
 if(ch.root.id==='artistSequence')alpha=ease((vh*.28-r.top)/(vh*.18))*ease((r.bottom-vh*.10)/(vh*.48));
 if(ch.root.id==='abrArchive')alpha=ease((vh*.58-r.top)/(vh*.48))*ease((r.bottom-vh*.10)/(vh*.18));
 if(ch.root.classList.contains('about-pair'))alpha=ease((vh*.10-r.top)/(vh*.18))*ease((r.bottom-vh*.10)/(vh*.18));
 if(ch.root.id==='aboutDestination'){alpha=ease((vh*.15-r.top)/(vh*.70))*ease((r.bottom-vh*.10)/(vh*.18));ch.layer.style.setProperty('--destination-reveal',alpha);const a=ch.layer.querySelector('a');if(a)a.tabIndex=alpha>.9?0:-1;}
 const on=alpha>.001;ch.layer.style.opacity=String(alpha);ch.layer.classList.toggle('is-current',on);ch.layer.style.visibility=on?'visible':'hidden';ch.layer.setAttribute('aria-hidden',String(!on));if(on)active=ch.root;
if(ch.root.id==='artistSequence'){
 const local=clamp((vh*.28-r.top)/(vh*2.1));
 const image=ch.root.querySelector('.abr-artist-image');
 image.style.maskImage=image.style.webkitMaskImage='none';
 const now=performance.now();if(!on){ch.inkProgress=0;ch.inkAt=now;}const dt=Math.min(64,now-(ch.inkAt||now-16));ch.inkAt=now;ch.inkProgress=Math.min(local,(ch.inkProgress||0)+dt/2400);if(on&&ch.inkProgress<local)schedule();
 const mask=window.YEARONPortraitInk?.(ch.inkProgress)||'none';
 ch.layer.style.maskImage=ch.layer.style.webkitMaskImage=mask;
 ch.layer.style.maskRepeat=ch.layer.style.webkitMaskRepeat='no-repeat';
 ch.layer.style.maskSize=ch.layer.style.webkitMaskSize='100% 100%';
 ch.layer.style.maskPosition=ch.layer.style.webkitMaskPosition='center';

}
}
const light=active?.classList.contains('about-definition');document.body.classList.toggle('about-light',!!light);
const reading=intro.getBoundingClientRect().bottom<vh*1.2;
introCue.style.opacity=reading?'0':'1';
const ending=destination&&destination.getBoundingClientRect().top<vh*.2;
const timeline=timelineRoot.getBoundingClientRect();
const timelineOffset=Math.min(timelineTravel,Math.max(0,-timeline.top));
timelineTrack.style.setProperty('--timeline-offset',-timelineOffset+'px');
if(timelineCenters.length){
 const progress=timelineTravel ? timelineOffset/timelineTravel : 0;
 const first=timelineCenters[0],last=timelineCenters.at(-1);
 timelineTrack.style.setProperty('--timeline-line-progress',first+(last-first)*progress+'px');
 let nearest=null,nearestDistance=Infinity;
 const horizontal=matchMedia('(prefers-reduced-motion: reduce)').matches?timelineViewport.scrollLeft:timelineOffset;
 timelineRows.forEach((row,index)=>{
  const distance=Math.abs(timelineCenters[index]-horizontal-timelineViewport.clientWidth/2);
  const focus=1-clamp(distance/(timelineViewport.clientWidth*.48));
  row.style.setProperty('--media-focus',ease(focus).toFixed(4));
  if(distance<nearestDistance){nearestDistance=distance;nearest=row;}
 });
 if(nearest!==activeTimelineRow){
  activeTimelineRow?.classList.remove('is-current');
  nearest?.classList.add('is-current');
  activeTimelineRow=nearest;
 }
}
document.body.classList.toggle('about-reading-cue-visible',reading&&!ending && !timelineStage.classList.contains('is-current'));
}
// Horizontal trackpad gestures follow the same scroll-driven timeline.
timelineViewport.addEventListener('wheel',event=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;
 const top=timelineRoot.getBoundingClientRect().top;
 const offset=Math.max(0,-top);
 if(top>1||offset>timelineTravel+1)return;
 const next=Math.max(0,Math.min(timelineTravel,offset+event.deltaX));
 if(next===offset)return;
 event.preventDefault();window.scrollBy({top:next-offset,behavior:'instant'});
},{passive:false});
timelineViewport.addEventListener('keydown',event=>{
 if(!['ArrowLeft','ArrowRight'].includes(event.key)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 event.preventDefault();const offset=Math.max(0,-timelineRoot.getBoundingClientRect().top);
 const next=Math.max(0,Math.min(timelineTravel,offset+(event.key==='ArrowRight'?1:-1)*timelineRows[0].offsetWidth));
 window.scrollBy({top:next-offset,behavior:'smooth'});
});
function schedule(){if(!raf)raf=requestAnimationFrame(render)}timelineViewport.addEventListener('scroll',schedule,{passive:true});addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('pageshow',schedule);render();
})();
