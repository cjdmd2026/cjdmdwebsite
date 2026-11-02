document.querySelector('[data-top]').addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
(() => {
 const viewport=document.querySelector('.friends-story-viewport');
 const track=viewport.querySelector('.friends-story-track');
 const group=document.createElement('div');group.className='friends-story-group';
 group.append(...track.children);track.append(group);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let animation=null,distance=0;
 const sync=()=>{if(animation)(document.hidden||viewport.matches(':focus-within'))?animation.pause():animation.play();};
 function build(){
  const phase=animation&&distance?(Number(animation.currentTime)||0)/(distance/18*1000)%1:0;
  animation?.cancel();animation=null;
  [...track.children].filter(el=>el!==group).forEach(el=>el.remove());
  distance=group.getBoundingClientRect().width;
  if(!distance||reduced.matches)return;
  for(let i=0;i<Math.ceil(viewport.clientWidth/distance)+1;i++){
   const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');
   clone.querySelectorAll('a').forEach(a=>a.tabIndex=-1);track.append(clone);
  }
  animation=track.animate([{transform:'translateX(0)'},{transform:`translateX(${-distance}px)`}],{duration:distance/18*1000,iterations:Infinity,easing:'linear'});
  animation.currentTime=phase*distance/18*1000;sync();
 }
 viewport.addEventListener('focusin',sync);viewport.addEventListener('focusout',()=>requestAnimationFrame(sync));
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',build);
 const observer=new ResizeObserver(build);observer.observe(viewport);observer.observe(group);
 document.fonts.ready.then(build);
})();
