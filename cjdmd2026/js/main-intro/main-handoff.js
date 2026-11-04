export const HANDOFF_VIEWPORTS=.85;
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=t=>t*t*(3-2*t);
const lenisInstance=()=>typeof lenis==='undefined'?null:lenis;

// One deliberate gesture, as in designer-icon-slide. Scrollbar dragging can
// also scrub the same distance directly without starting an automatic step.
export function createMainHandoff(host,onProgress){
  const state=window.MainIntro, stage=host.closest('.animation-stage');
  const range=()=>host.clientHeight*HANDOFF_VIEWPORTS;
  const gridTop=()=>state.anchor()-range();
  let frame=0,sequence=0,wheelTotal=0,lastWheel=-Infinity,lastDirection=0;
  function update(progress){
    const wasComplete=state.complete;
    state.progress=progress;state.complete=progress===1;
    document.body.classList.toggle('intro-before-main',!state.complete);
    stage.style.visibility=state.complete?'hidden':'visible';
    document.getElementById('mainIntro').inert=state.complete;
    if(wasComplete!==state.complete){
      window.dispatchEvent(new CustomEvent('main-intro-handoff',{detail:{complete:state.complete}}));
    }
  }
  function readScroll(){
    if(state.moving)return;
    const offset=scrollY-gridTop(),length=range();
    onProgress(offset<=1?0:offset>=length-1?1:offset/length);
  }
  async function travel(forward){
    const from=clamp((scrollY-gridTop())/range()), to=forward?1:0;
    if(from===to&&!state.moving)return;
    const id=++sequence;
    cancelAnimationFrame(frame);state.moving=true;
    const driver=lenisInstance();driver?.stop();
    const surface=window.MainWordSurface;
    const img=surface?.getSource(surface.theme).image;
    if(img && !img.complete){try{await img.decode();}catch{/* The native poster still exposes its text and download. */}}
    if(id!==sequence)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Designer's return from the enlarged detail is 2.9s; its zoom-in is 3.6s.
    const duration=reduced?180:Math.max(300,(forward?2900:3600)*Math.abs(to-from));
    const start=performance.now();
    function tick(now){
      if(id!==sequence)return;
      const t=clamp((now-start)/duration),p=from+(to-from)*smooth(t);
      const y=gridTop()+range()*p;
      window.scrollTo({top:y,behavior:'instant'});onProgress(p);
      if(t<1){frame=requestAnimationFrame(tick);return;}
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
    return direction>0 ? offset>=-2 && offset<range()-1 : offset>1 && offset<=range()+2;
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
    if(excluded(e)||e.target.closest?.('button,a'))return;
    const direction=['ArrowDown','PageDown',' '].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:0;
    if(!direction||!owns(direction))return;
    consume(e);
    if(!state.moving&&!e.repeat)travel(direction>0);
  },{capture:true});
  return {update,readScroll};
}
