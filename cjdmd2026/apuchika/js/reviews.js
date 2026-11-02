document.addEventListener('DOMContentLoaded', () => {
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
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
const reviews=document.querySelector('.reviews-marquee');
if(!reviews)return;
reviews.querySelectorAll('.review-item').forEach(card=>card.tabIndex=0);
Promise.all([...reviews.querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{});})).then(()=>initLoop(reviews,reviews.querySelector('.reviews-track'),'review-group',22));
});
