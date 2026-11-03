import {createReadingHover} from './reading-hover.js';
import {createKeywordPalette,bounceKeyword} from './keyword-effects.js';

const clamp=value=>Math.max(0,Math.min(1,value));

export function createContentOne(section,reducedMotion){
  const chooseIcon=createKeywordPalette();
  const rows=[...section.querySelectorAll('[data-keyword]')].map(row=>{
    const word=row.querySelector('[data-read]'),glyph=document.createElement('span');
    glyph.className='keyword-pop';
    glyph.setAttribute('aria-hidden','true');
    word.append(glyph);
    const entry={row,word,glyph,completed:false,animation:null,started:false,recolor:false,icon:null};
    chooseIcon(entry);return entry;
  });
  const closing=section.querySelector('.reading-line:not([data-keyword]) [data-read]');
  createReadingHover(section.querySelector('.individuality-title'),reducedMotion);
  const duration=rows.length+.7;
  let target=0,current=0,frame=0,lastTime=0,initialized=false,active=null;

  function clear(entry){
    if(!entry)return;
    entry.animation?.cancel();entry.animation=null;
    if(entry.completed)entry.row.dataset.phase='complete';
    if(active===entry)active=null;
  }
  function bounce(entry){
    clear(active);
    const bounds=entry.word.getBoundingClientRect();
    if(bounds.bottom<=70||bounds.top>=innerHeight)return;
    active=entry;
    const animation=bounceKeyword(entry.glyph,reducedMotion);
    entry.animation=animation;entry.row.dataset.phase='pop';
    animation.onfinish=()=>{if(entry.animation===animation)clear(entry);};
  }
  function render(animate=true){
    const timeline=current*duration;
    rows.forEach((entry,index)=>{
      const local=timeline-index,text=clamp(local/.52);
      // Keep the color stable through a reveal and its hover animation. A fully
      // rewound row chooses a fresh matching icon/color on its next forward pass.
      if(local<=0){
        if(entry.started)entry.recolor=true;
        entry.started=false;
      }else if(!entry.started){
        if(entry.recolor)chooseIcon(entry);
        entry.started=true;entry.recolor=false;
      }
      entry.word.style.setProperty('--read-fill',`${text*100}%`);
      if(text<1){
        clear(entry);entry.completed=false;
        entry.row.dataset.phase=local<=0?'waiting':'text';
      }else if(!entry.completed){
        entry.completed=true;
        if(animate)bounce(entry);
      }
      if(text===1)entry.row.dataset.phase=entry.animation?'pop':'complete';
    });
    closing.style.setProperty('--read-fill',`${clamp((timeline-rows.length)/.7)*100}%`);
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
      if(offscreen)clear(active);
      current=target;render(initialized&&!offscreen);initialized=true;return;
    }
    if(!frame&&current!==target){lastTime=performance.now();frame=requestAnimationFrame(tick);}
  }
  reducedMotion.addEventListener('change',()=>{clear(active);update(target);});
  render(false);
  return {update};
}
