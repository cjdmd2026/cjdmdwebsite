(()=>{
 const scene=document.querySelector('.kit-unboxing'),pin=scene?.querySelector('.unboxing-pin');if(!pin)return;
 const enabled=matchMedia('(min-width:801px) and (prefers-reduced-motion:no-preference)');let played=false,running=false,frame=0,oldSnap='',oldBehavior='';
 function stop(){if(!running)return;running=false;cancelAnimationFrame(frame);document.documentElement.style.scrollSnapType=oldSnap;document.documentElement.style.scrollBehavior=oldBehavior}
 function start(){if(played||!enabled.matches)return;played=true;running=true;const root=document.documentElement;oldSnap=root.style.scrollSnapType;oldBehavior=root.style.scrollBehavior;root.style.scrollSnapType='none';root.style.scrollBehavior='auto';const from=scrollY,top=parseFloat(getComputedStyle(pin).top)||0;const target=scrollY+scene.getBoundingClientRect().top-top+Math.max(0,scene.offsetHeight-pin.offsetHeight)*.89;let begin;
 function tick(now){if(!running)return;begin??=now;const t=Math.min(1,(now-begin)/6800),e=t*t*(3-2*t);window.scrollTo({top:from+(target-from)*e,behavior:'instant'});if(t<1)frame=requestAnimationFrame(tick);else stop()}
 frame=requestAnimationFrame(tick)}
 function check(){if(played||!enabled.matches)return;const r=scene.getBoundingClientRect(),top=parseFloat(getComputedStyle(pin).top)||0;if(r.top<=top+45&&r.top>=top-100)start()}
 addEventListener('scroll',check,{passive:true});addEventListener('pageshow',check);['wheel','touchstart','pointerdown'].forEach(type=>addEventListener(type,stop,{passive:true}));addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Escape',' '].includes(e.key))stop()});enabled.addEventListener('change',stop);check();
})();
