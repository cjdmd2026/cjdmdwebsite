import {createReadingHover} from './reading-hover.js';

const clamp=value=>Math.max(0,Math.min(1,value));

export function createContentOne(section,reducedMotion){
  const rows=section.querySelectorAll('[data-read]');
  createReadingHover(section.querySelector('.individuality-title'),reducedMotion);
  let target=0,current=0,frame=0,lastTime=0,initialized=false;

  function render(){
    const timeline=current*rows.length;
    rows.forEach((row,index)=>{
      const fill=clamp((timeline-index)/.52);
      row.style.setProperty('--read-progress',String(fill));
    });
  }
  function tick(time){
    const dt=Math.min(.05,(time-lastTime)/1000||1/60);lastTime=time;
    current+=(target-current)*(1-Math.exp(-dt/.09));
    if(Math.abs(target-current)<.00005)current=target;
    render();
    frame=current===target?0:requestAnimationFrame(tick);
  }
  function update(progress){
    target=clamp(progress);
    const bounds=section.getBoundingClientRect(),offscreen=bounds.bottom<=0||bounds.top>=innerHeight;
    if(!initialized||offscreen||reducedMotion.matches){
      if(frame)cancelAnimationFrame(frame);frame=0;
      current=target;render();initialized=true;return;
    }
    if(!frame&&current!==target){lastTime=performance.now();frame=requestAnimationFrame(tick);}
  }
  reducedMotion.addEventListener('change',()=>update(target));
  render();
  return {update};
}
