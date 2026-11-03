// Existing main.js mobile menu, with keyboard focus and desktop resize cleanup.
export function initSiteHeader(){
  // The integrated page keeps its existing navigation/menu controller.
  if(window.MainIntro)return {setAutoHideProgress(progress){window.MainIntro.headerProgress=progress;}};
  const header=document.querySelector('.header');
  const button=document.querySelector('.menu-button');
  const menu=document.querySelector('.mobile-menu');
  const main=document.querySelector('main');
  const mobile=matchMedia('(max-width:759px)');
  let timer=0,autoHideProgress=0,pointerNearHeader=false;
  function syncHeaderVisibility(scrubbing=false){
    const hidden=autoHideProgress>0&&!pointerNearHeader;
    header.style.setProperty('--header-hide-offset',`calc(${-100*autoHideProgress}% - ${autoHideProgress}px)`);
    header.style.setProperty('--header-hide-opacity',String(1-autoHideProgress));
    // Scroll already supplies eased intermediate positions. Keep the original
    // timed transition for mouse approach, keyboard focus and the mobile menu.
    header.style.setProperty('--header-slide-duration',scrubbing?'0s':'.4s');
    header.style.setProperty('--header-background-duration',scrubbing?'0s':'.6s');
    if(header.classList.contains('is-intro-hidden')!==hidden)header.classList.toggle('is-intro-hidden',hidden);
  }
  // Match main-hero.js: reveal on approach to the top edge, with hysteresis.
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    pointerNearHeader=event.clientY<=header.offsetHeight+(pointerNearHeader?16:0);
    syncHeaderVisibility();
  },{passive:true});
  document.addEventListener('pointerleave',()=>{pointerNearHeader=false;syncHeaderVisibility();});
  header.addEventListener('focusin',()=>syncHeaderVisibility());
  header.addEventListener('focusout',()=>syncHeaderVisibility());
  function set(open,restoreFocus=false){
    clearTimeout(timer);
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
    document.body.classList.toggle('mobile-menu-open',open);
    syncHeaderVisibility();
    main.inert=open;
    menu.inert=!open;
    if(open){menu.hidden=false;requestAnimationFrame(()=>{if(button.getAttribute('aria-expanded')==='true')menu.classList.add('is-open');});}
    else{menu.classList.remove('is-open');timer=setTimeout(()=>{menu.hidden=true;},280);}
    if(restoreFocus)button.focus({preventScroll:true});
  }
  button.addEventListener('click',()=>set(button.getAttribute('aria-expanded')!=='true'));
  document.querySelectorAll('.header a').forEach(link=>link.addEventListener('click',()=>set(false)));
  document.addEventListener('keydown',event=>{
    if(button.getAttribute('aria-expanded')!=='true')return;
    if(event.key==='Escape'){set(false,true);return;}
    if(event.key!=='Tab')return;
    const focusable=[...document.querySelectorAll('.header .logo a,.menu-button,.mobile-menu a')];
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  mobile.addEventListener('change',()=>{if(!mobile.matches)set(false);});
  return {setAutoHideProgress(progress){
    const next=Math.max(0,Math.min(1,progress));
    if(next===autoHideProgress)return;
    autoHideProgress=next;syncHeaderVisibility(true);
  }};
}
