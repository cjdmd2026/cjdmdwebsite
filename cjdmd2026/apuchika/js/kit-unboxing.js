(() => {
  const section = document.querySelector('.kit-unboxing');
  if (!section) return;
  const pin = section.querySelector('.unboxing-pin');
  const camera = section.querySelector('.package-camera');
  const zoom = section.querySelector('.package-zoom');
  const items = section.querySelector('.kit-floating-items');
  const copy = section.querySelector('.unboxing-copy');
  const description = section.querySelector('.unboxing-description');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (v) => { v = clamp(v); return v * v * (3 - 2 * v); };
  const phase = (p, a, b) => ease((p - a) / (b - a));
  let raf = 0, progress = 0, started = false, began = null, playing = false;
  function render() {
    raf = 0;
    if (reduced.matches) { section.classList.add('is-inside');
      for (const el of [copy, description]) el.style.opacity = '1';
      return; }
    const rect = section.getBoundingClientRect();
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    const travel = Math.max(1, section.offsetHeight - pin.offsetHeight);

    const approach = phase(progress, .02, .17);
    const open = phase(progress, .17, .46);
    const unfold = phase(progress, .36, .64);
    const enter = Math.pow(phase(progress, .17, .70), 1.45);
    const reveal = phase(progress, .72, .86);
    const desktop = pin.clientWidth >= 901;
    camera.style.opacity = matchMedia('(max-width:800px)').matches ? String(1-phase(progress,.62,.78)) : '1';
    const initialScale = desktop
      ? Math.min(pin.clientWidth * .445 / zoom.offsetWidth, pin.clientHeight * .50 / zoom.offsetHeight)
      : Math.min(pin.clientWidth * .38 / zoom.offsetWidth, pin.clientHeight * .37 / zoom.offsetHeight, 1.65);
    const fillScale = Math.max(pin.clientWidth / 280, pin.clientHeight / 220) * 1.04;
    const scale = initialScale * (1 + .12 * approach) * (1 - enter) + fillScale * enter;
    const set = (name, value) => zoom.style.setProperty(name, value);
    set('--box-scale', scale.toFixed(5));
    set('--rear-angle', `${-90 * (1 - unfold)}deg`);
    // Lid stays attached to the rear wall; this compensates its parent's unfolding rotation.
    set('--lid-angle', `${90 + 180 * open - 90 * unfold}deg`);
    set('--front-angle', `${90 * (1 - unfold)}deg`);
    // Side walls unfold along their original hinges while the camera moves into the interior.
    set('--left-angle', `${90 * (1 - phase(progress, .36, .64))}deg`);
    set('--right-angle', `${-90 * (1 - phase(progress, .36, .64))}deg`);
    set('--return-left', `${180 * (1 - phase(progress, .40, .64))}deg`);
    set('--return-right', `${-180 * (1 - phase(progress, .40, .64))}deg`);
    const tabs = phase(progress, .31, .45);
    set('--tab-left', `${-90 * (1 - tabs)}deg`);
    set('--tab-right', `${90 * (1 - tabs)}deg`);
    set('--tongue-angle', `${-90 * (1 - phase(progress, .18, .26))}deg`);
    // Text is absent for the entire opening and entry, including reverse scrolling.
    const textOpacity = Math.max(1 - phase(progress, .04, .14), reveal);
    for (const el of [copy, description]) el.style.opacity = textOpacity.toFixed(4);
    items.style.opacity = reveal.toFixed(4);
    items.style.transform = `translateY(${(1 - reveal) * 25}px)`;
    section.classList.toggle('is-inside', enter > .92);
    camera.setAttribute('aria-label', progress < .17 ? '닫힌 아푸치카 패키지 정면' : progress < .70 ? '패키지가 열리며 상자 안쪽으로 확대됩니다' : '상자 내부의 키트 소개 공간');
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(render); }
  const duration=2800;
  let direction=1,lastFrame=null,locked=false,lockedY=0,cooldownUntil=0,lastScroll=scrollY;
  function advance(now){
    if(!playing)return;
    const dt=lastFrame===null?0:Math.min(now-lastFrame,80);lastFrame=now;
    progress=clamp(progress+direction*dt/duration);render();
    if((direction===1&&progress<1)||(direction===-1&&progress>0))requestAnimationFrame(advance);
    else {playing=false;lastFrame=null;unlock();}
  }
  const block=e=>{if(locked)e.preventDefault()};
  const blockKey=e=>{if(locked&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))e.preventDefault()};
  function unlock(){if(!locked)return;locked=false;cooldownUntil=performance.now()+350;lastScroll=scrollY;}
  function sizeStage(){
    const header=document.querySelector('.apu-header');
    const top=Math.max(0,header?.getBoundingClientRect().bottom||0);
    section.style.setProperty('--unboxing-header-height',top+'px');
    section.style.setProperty('--unboxing-view-height',Math.max(1,innerHeight-top)+'px');
  }
  function startPlayback(reverse=false){
    if(playing)return;
    if(reverse?progress<=0:progress>=1)return;
    started=true;direction=reverse?-1:1;
    if(reduced.matches){progress=reverse?0:1;render();return;}
    sizeStage();
    const top=document.querySelector('.apu-header')?.getBoundingClientRect().bottom||0;
    lockedY=Math.max(0,scrollY+pin.getBoundingClientRect().top-top);
    locked=true;window.scrollTo({top:lockedY,behavior:'instant'});
    playing=true;lastFrame=null;requestAnimationFrame(advance);
  }
  addEventListener('wheel',block,{passive:false});addEventListener('touchmove',block,{passive:false});addEventListener('keydown',blockKey);addEventListener('pagehide',unlock);
  function checkEntry(){
    if(locked){if(Math.abs(scrollY-lockedY)>1)window.scrollTo({top:lockedY,behavior:'instant'});return;}
    const y=scrollY,up=y<lastScroll;lastScroll=y;if(playing||performance.now()<cooldownUntil)return;
    const r=pin.getBoundingClientRect(),top=document.querySelector('.apu-header')?.getBoundingClientRect().bottom||0;
    const visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,top))/r.height;
    if(visible>=(matchMedia('(max-width:800px)').matches?.65:.85)){if(progress===0&&!up)startPlayback();else if(progress===1&&up)startPlayback(true);}
  }
  addEventListener('scroll',checkEntry,{passive:true});
  new IntersectionObserver(()=>checkEntry(),{threshold:[0,.65,.85]}).observe(pin);
  addEventListener('resize',()=>{sizeStage();schedule()});
  window.visualViewport?.addEventListener('resize',()=>{sizeStage();schedule()});
  sizeStage();
  document.fonts?.ready.then(sizeStage);
  if(window.ResizeObserver&&document.querySelector('.apu-header'))new ResizeObserver(sizeStage).observe(document.querySelector('.apu-header'));
  addEventListener('pageshow', schedule);
  reduced.addEventListener('change', schedule);
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(pin);
  render();
})();
