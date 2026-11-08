export const HANDOFF_VIEWPORTS=.85;
const clamp=value=>Math.max(0,Math.min(1,value));
// Ease into a steady dolly instead of building to a short, fast burst halfway.
function smooth(t){
  const ramp=.22;
  if(t>1-ramp)return 1-smooth(1-t);
  if(t>=ramp)return (t-ramp/2)/(1-ramp);
  const u=t/ramp;
  return ramp*(u*u*u-.5*u*u*u*u)/(1-ramp);
}
const lenisInstance=()=>typeof lenis==='undefined'?null:lenis;
const gatherStart=.56;
// Restore the original forward timing: the loose field travels first, then
// gathers during the latter part of the zoom out.
const forwardGather=progress=>1-Math.cbrt(clamp((1-progress)/(1-gatherStart)));

// One deliberate gesture, as in designer-icon-slide. Scrollbar dragging can
// also scrub the same distance directly without starting an automatic step.
export function createMainHandoff(host,onProgress){
  const state=window.MainIntro;
  const range=()=>host.clientHeight*HANDOFF_VIEWPORTS;
  const gridTop=()=>state.anchor()-range();
  // Catch the continuing gesture while the pattern is still pulling back,
  // rather than stopping at the flat grid and restarting the same camera.
  const approach=()=>host.clientHeight*.18;
  let frame=0,sequence=0,wheelTotal=0,lastWheel=-Infinity,lastDirection=0;
  let previousProgress=0,previousGather=0,direction=1,originProgress=0,originGather=0;
  let previousDetail={progress:0,gather:0,travel:1},originDetail=previousDetail;
  function setPose(progress,requestedDirection){
    progress=clamp(progress);
    const nextDirection=requestedDirection??(progress>previousProgress+1e-6?1:
      progress<previousProgress-1e-6?-1:direction);
    if(nextDirection!==direction){
      // Reversing a partially scrubbed transition starts from its current
      // assembly, rather than jumping between the two timing curves.
      originProgress=previousProgress;originGather=previousGather;originDetail=previousDetail;direction=nextDirection;
    }
    let gather;
    if(progress===0||progress===1)gather=progress;
    else if(direction<0){
      // Only the return zoom unwinds over the whole remaining trip to the grid.
      gather=originProgress>0?originGather*clamp(progress/originProgress):progress;
    }else{
      const start=forwardGather(originProgress);
      gather=originGather+(1-originGather)*clamp((forwardGather(progress)-start)/Math.max(1e-8,1-start));
    }
    let detail;
    if(progress===0||progress===1)detail={progress,gather,travel:1};
    else if(direction<0){
      // Let the small marks respond a little earlier, retaining zero initial
      // velocity and a gradual acceleration into the unfolding.
      const returning=originProgress>0?clamp(1-progress/originProgress):1;
      const remaining=1-Math.pow(returning,1.8);
      // Shorten the tiny marks' routes as they start unfolding. Keep the
      // current amount on a direction change so scrubbing cannot snap them.
      const retreat=originProgress>0?clamp((originProgress-progress)/(originProgress*.26)):1;
      const settle=retreat*retreat*(3-2*retreat);
      detail={progress:originDetail.progress*remaining,gather:originDetail.gather*remaining,
        travel:originDetail.travel+(.12-originDetail.travel)*settle};
    }else{
      const start=forwardGather(originProgress);
      const advance=clamp((progress-originProgress)/Math.max(1e-8,1-originProgress));
      detail={
        progress:originDetail.progress+(1-originDetail.progress)*advance,
        gather:originDetail.gather+(1-originDetail.gather)*clamp((forwardGather(progress)-start)/Math.max(1e-8,1-start)),
        travel:originDetail.travel+(1-originDetail.travel)*advance*advance*(3-2*advance)
      };
    }
    previousProgress=progress;previousGather=gather;previousDetail=detail;state.zoomingIn=direction<0;
    onProgress(progress,gather,detail);
  }
  function update(progress,gather){
    const wasComplete=state.complete;
    state.progress=progress;state.complete=progress===1 && gather===1;
    if(wasComplete!==state.complete){
      window.dispatchEvent(new CustomEvent('main-intro-handoff',{detail:{complete:state.complete}}));
    }
  }
  function readScroll(){
    if(state.moving)return;
    const offset=scrollY-gridTop(),length=range();
    setPose(offset<=1?0:offset>=length-1?1:offset/length);
  }
  async function travel(forward){
    const offset=scrollY-gridTop(),length=range();
    const from=offset>=length-1?1:Math.abs(offset)<=1?0:Math.max(-approach()/length,Math.min(1,offset/length));
    const to=forward?1:0;
    if(from===to && !state.moving)return;
    const id=++sequence;
    cancelAnimationFrame(frame);state.moving=true;
    const driver=lenisInstance();driver?.stop();
    const surface=window.MainWordSurface;
    const img=surface?.getSource(surface.theme).image;
    if(img && !img.complete){try{await img.decode();}catch{/* The native poster still exposes its text and download. */}}
    if(id!==sequence)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration=(reduced?240:6200)*Math.abs(to-from);
    const start=performance.now();
    function tick(now){
      if(id!==sequence)return;
      const elapsed=now-start;
      const t=duration?clamp(elapsed/duration):1;
      const p=t===1?to:from+(to-from)*smooth(t);
      const y=gridTop()+range()*p;
      window.scrollTo({top:y,behavior:'instant'});setPose(p,forward?1:-1);
      if(elapsed<duration){frame=requestAnimationFrame(tick);return;}
      state.moving=false;state.inputUntil=performance.now()+300;
      driver?.scrollTo(y,{immediate:true,force:true});driver?.start();
    }
    frame=requestAnimationFrame(tick);
  }
  state.reverse=()=>travel(false);
  const excluded=e=>e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey||
    document.body.classList.contains('mobile-menu-open')||document.documentElement.classList.contains('page-transition-active')||
    e.target.closest?.('input,textarea,select,[contenteditable]');
  function owns(direction){
    if(state.moving)return true;
    const offset=scrollY-gridTop();
    return direction>0 ? offset>=-approach() && offset<range()-1 : offset>1 && offset<=range()+2;
  }
  const consume=e=>{e.preventDefault();e.stopImmediatePropagation();};
  addEventListener('wheel',e=>{
    if(excluded(e)||Math.abs(e.deltaX)>=Math.abs(e.deltaY))return;
    const direction=Math.sign(e.deltaY),now=performance.now();
    if(!owns(direction))return;
    consume(e);
    if(state.moving||now<state.inputUntil)return;
    if(now-lastWheel>220||direction!==lastDirection)wheelTotal=0;
    lastDirection=direction;lastWheel=now;
    wheelTotal+=Math.abs(e.deltaY)*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
    if(wheelTotal>=60){wheelTotal=0;travel(direction>0);}
  },{capture:true,passive:false});
  let touch=null;
  addEventListener('touchstart',e=>{touch=e.touches.length===1?e.touches[0]:null;},{passive:true});
  addEventListener('touchmove',e=>{
    if(!touch||excluded(e)||e.touches.length!==1)return;
    const dy=touch.clientY-e.touches[0].clientY;
    if(Math.abs(dy)<Math.abs(touch.clientX-e.touches[0].clientX)||!owns(Math.sign(dy)))return;
    consume(e);
    if(!state.moving && Math.abs(dy)>=42){touch=null;travel(dy>0);}
  },{capture:true,passive:false});
  addEventListener('keydown',e=>{
    if(excluded(e)||e.target.closest?.('a')||(e.key===' '&&e.target.closest?.('button')))return;
    const direction=['ArrowDown','PageDown',' '].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:0;
    if(!direction||!owns(direction))return;
    consume(e);
    if(!state.moving&&!e.repeat)travel(direction>0);
  },{capture:true});
  return {update,readScroll,travel};
}
