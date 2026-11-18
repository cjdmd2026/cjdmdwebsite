(() => {
 const section=document.querySelector('.about-beliefs');if(!section)return;
 const stage=section.querySelector('.beliefs-stage'),intro=section.querySelector('.beliefs-intro');
 const columns=[...section.querySelectorAll('.belief-column')];
 const compact=matchMedia('(max-width:800px)'), reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const clamp=n=>Math.max(0,Math.min(1,n));const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
 let queued=false;
 function update(){
  queued=false;if(compact.matches||reduced.matches)return;
  const h=stage.clientHeight,w=stage.clientWidth;
  const p=clamp(-section.getBoundingClientRect().top/Math.max(1,section.offsetHeight-h));
  const width=Math.min(1240,w*.84),left=(w-width)/2,gap=22,columnWidth=(width-gap*3)/4;
  const clearance=Math.max(110,(document.querySelector('header')?.getBoundingClientRect().bottom||80)+28);
  section.style.setProperty('--intro-top',`${clearance}px`);
  const introBottom=clearance+intro.offsetHeight;
  const step=Math.min(42,h*.045);
  const imageHeight=Math.max(100,Math.min(columnWidth*1.36,h-introBottom-72-3*step));
  const baseTop=introBottom+28;
  const turn=smooth((p-.08)/.22), reveal=smooth((p-.32)/.10), expand=smooth((p-.64)/.24);
  const copyFade=smooth((p-.62)/.12), closingReveal=smooth((p-.90)/.08);
  const outro=section.querySelector('.beliefs-outro');
  const outroHeight=outro.offsetHeight;
  const finalBase=Math.max(clearance,Math.min(h*.40-imageHeight*.5,h-32-outroHeight-24-imageHeight-step*1.5));
  const galleryTop=baseTop+(finalBase-baseTop)*turn;
  section.style.setProperty('--gallery-top',`${galleryTop}px`);
  section.style.setProperty('--photo-height',`${imageHeight}px`);
  section.style.setProperty('--intro-opacity',1-smooth((p-.07)/.18));
  section.style.setProperty('--intro-y',`${-24*turn}px`);
  const offsets=columns.map((_,i)=>(3-i)*step*(1-turn)+(i-1.5)*step*turn);
  columns.forEach((column,i)=>{column.style.setProperty('--column-y',`${offsets[i]}px`);column.style.setProperty('--column-opacity',i===1?(expand>0?0:1):1-smooth((p-.60)/.16));});
  // Same image and crop at the handoff: second gallery card becomes full screen.
  const x=left+columnWidth+gap,y=galleryTop+offsets[1];
  section.style.setProperty('--expand-left',`${x*(1-expand)}px`);
  section.style.setProperty('--expand-top',`${y*(1-expand)}px`);
  section.style.setProperty('--expand-width',`${columnWidth+(w-columnWidth)*expand}px`);
  section.style.setProperty('--expand-height',`${imageHeight+(h-imageHeight)*expand}px`);
  section.style.setProperty('--expand-radius',`${26*(1-expand)}px`);
  section.style.setProperty('--expand-opacity',expand>0?1:0);
  section.style.setProperty('--shade-opacity',closingReveal*.85);
  section.style.setProperty('--outro-top',`${galleryTop+step*1.5+imageHeight+24}px`);
  section.style.setProperty('--outro-opacity',reveal*(1-copyFade));
  section.style.setProperty('--outro-y',`${28*(1-reveal)}px`);
  section.style.setProperty('--closing-opacity',closingReveal);
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 compact.addEventListener('change',schedule);reduced.addEventListener('change',schedule);
 document.fonts?.ready.then(schedule);new ResizeObserver(schedule).observe(intro);schedule();
})();
