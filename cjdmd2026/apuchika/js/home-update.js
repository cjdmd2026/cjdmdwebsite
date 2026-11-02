document.addEventListener('DOMContentLoaded', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  document.querySelector('.top-button').addEventListener('click', () => window.scrollTo({top: 0, behavior: reduced ? 'instant' : 'smooth'}));
  const steps = [...document.querySelectorAll('.step')], picture = document.querySelector('#processImage');
  steps.forEach((step, index) => {
    step.setAttribute('role','tab'); step.setAttribute('aria-controls','processImage'); step.setAttribute('aria-selected',String(index===0)); step.tabIndex = index===0 ? 0 : -1;
    const activate = () => { steps.forEach(s => {const on = s===step; s.classList.toggle('is-active',on); s.setAttribute('aria-selected',String(on)); s.tabIndex=on ? 0 : -1;}); picture.src=step.dataset.img; picture.alt=step.textContent.replace(/\s+/g,' ').trim(); };
    step.addEventListener('click',activate); step.addEventListener('mouseenter',activate);
    step.addEventListener('keydown',e => {const d = ['ArrowRight','ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft','ArrowUp'].includes(e.key) ? -1 : 0;if(d){e.preventDefault();const next=steps[(index+d+steps.length)%steps.length];next.click();next.focus();}});
  });
  const logo=document.querySelector('.hero-logo-video');
  if(!reduced) new IntersectionObserver(entries=>{if(entries[0].isIntersecting)logo.play().catch(()=>{});else logo.pause();},{threshold:.15}).observe(logo);
  // Each repeat is one non-shrinking group, including its trailing gap.
  function initLoop(viewport,track,groupClass,speed,reverse=false,pauseOnHover=true){
    let group=track.querySelector('.'+groupClass);
    if(group){[...track.children].filter(c=>c!==group).forEach(c=>c.remove());}
    else{group=document.createElement('div');group.className=groupClass;[...track.children].forEach(c=>group.append(c));track.append(group);}
    let animation=null, hovered=false, focused=false, distance=0;
    function sync(){if(!animation)return;(hovered||focused||document.hidden)?animation.pause():animation.play();}
    function build(){
      const phase=animation&&distance ? (Number(animation.currentTime)||0)/(distance/speed*1000)%1 : 0;
      animation?.cancel();
      [...track.children].filter(c=>c!==group).forEach(c=>c.remove());
      distance=group.getBoundingClientRect().width;
      if(!distance)return;
      const copies=Math.ceil(viewport.clientWidth/distance)+1;
      for(let i=0;i<copies;i++){const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('[tabindex],a,button').forEach(el=>el.tabIndex=-1);track.append(clone);}
      if(reduced)return;
      animation=track.animate([{transform:`translateX(${reverse?-distance:0}px)`},{transform:`translateX(${reverse?0:-distance}px)`}],{duration:distance/speed*1000,iterations:Infinity,easing:'linear'});
      animation.currentTime=phase*(distance/speed*1000);sync();
    }
    if(pauseOnHover)viewport.addEventListener('mouseenter',()=>{hovered=true;sync();});
    if(pauseOnHover)viewport.addEventListener('mouseleave',()=>{hovered=false;sync();});
    viewport.addEventListener('focusin',()=>{focused=true;sync();});
    viewport.addEventListener('focusout',e=>{focused=viewport.contains(e.relatedTarget);sync();});
    document.addEventListener('visibilitychange',sync);
    const observer=new ResizeObserver(build);observer.observe(viewport);observer.observe(group);
    document.fonts.ready.then(build);
  }
  document.querySelectorAll('.comment-row').forEach((row,i)=>initLoop(row,row.querySelector('.comment-track'),'comment-group',27,i===1,false));
});
