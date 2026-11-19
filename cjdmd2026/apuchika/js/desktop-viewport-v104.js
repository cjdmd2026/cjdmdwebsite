(()=>{
const mq=matchMedia('(min-width:801px)'),root=document.documentElement,header=document.querySelector('header.apu-header');if(!header)return;
let queued=false;
function update(){queued=false;if(!mq.matches){root.style.removeProperty('--pc-view-height');return}const h=Math.round(header.getBoundingClientRect().height*100)/100;root.style.setProperty('--desktop-header',h+'px');root.style.setProperty('--pc-view-height',Math.max(1,innerHeight-h)+'px')}
function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
addEventListener('resize',schedule,{passive:true});addEventListener('pageshow',schedule);mq.addEventListener('change',schedule);if(window.ResizeObserver)new ResizeObserver(schedule).observe(header);document.fonts?.ready.then(schedule);update();
})();
