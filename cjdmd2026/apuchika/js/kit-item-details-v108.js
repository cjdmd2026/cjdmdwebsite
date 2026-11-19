(()=>{
 const section=document.querySelector('#kitIntro');if(!section)return;
 const buttons=[...section.querySelectorAll('[data-kit-item]')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function clear(){buttons.forEach(button=>{button.setAttribute('aria-pressed','false');button.querySelector('.kit-item-label').hidden=true})}
 function sync(){const visible=section.classList.contains('is-inside')||reduced.matches;buttons.forEach(button=>{button.disabled=!visible});if(!visible)clear()}
 new MutationObserver(sync).observe(section,{attributes:true,attributeFilter:['class']});
 reduced.addEventListener('change',sync);sync();
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const wasOpen=button.getAttribute('aria-pressed')==='true';clear();
  if(!wasOpen){button.setAttribute('aria-pressed','true');button.querySelector('.kit-item-label').hidden=false}
 }));
 document.addEventListener('click',event=>{if(!event.target.closest('[data-kit-item]'))clear()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')clear()});
})();
