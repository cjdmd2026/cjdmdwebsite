document.querySelector('[data-top]')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
(()=>{
 const viewport=document.querySelector('.friends-story-viewport'),track=viewport?.querySelector('.friends-story-track');if(!track)return;
 const group=document.createElement('div');group.className='friends-story-group';group.append(...track.children);track.append(group);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let animation=null,distance=0,frame=0,lastWidth=0,lastDistance=0;
 function sync(){if(animation)(document.hidden||viewport.matches(':focus-within'))?animation.pause():animation.play()}
 function build(){frame=0;const width=viewport.clientWidth,nextDistance=group.getBoundingClientRect().width;if(!Number.isFinite(nextDistance)||nextDistance<20||width<1)return;
 if(animation&&Math.abs(width-lastWidth)<1&&Math.abs(nextDistance-lastDistance)<1)return;
 const speed=matchMedia('(max-width:800px)').matches?8:24;
 const phase=animation&&distance?((Number(animation.currentTime)||0)/(distance/speed*1000))%1:0;animation?.cancel();animation=null;
 [...track.children].filter(el=>el!==group).forEach(el=>el.remove());distance=nextDistance;lastWidth=width;lastDistance=distance;if(reduced.matches)return;
 const copies=Math.min(3,Math.max(1,Math.ceil(width/distance)));
 for(let i=0;i<copies;i++){const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('a').forEach(a=>a.tabIndex=-1);track.append(clone)}
 animation=track.animate([{transform:'translateX(0)'},{transform:`translateX(${-distance}px)`}],{duration:distance/speed*1000,iterations:Infinity,easing:'linear'});animation.currentTime=phase*distance/speed*1000;sync()}
 function schedule(){if(!frame)frame=requestAnimationFrame(build)}
 viewport.addEventListener('focusin',sync);viewport.addEventListener('focusout',()=>requestAnimationFrame(sync));document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{lastWidth=0;lastDistance=0;schedule()});
 new ResizeObserver(schedule).observe(viewport);addEventListener('resize',schedule);document.fonts?.ready.then(schedule);schedule();
})();
