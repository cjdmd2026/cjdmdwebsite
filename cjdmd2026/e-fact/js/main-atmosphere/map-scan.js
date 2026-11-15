(() => {
  'use strict';
  const dialog = document.querySelector('#map-scan-dialog');
  const open = document.querySelector('#map-scan-open');
  const close = dialog?.querySelector('.map-scan-close');
  const particles = dialog?.querySelector('.scan-particles');
  const scene = dialog?.querySelector('.map-scan-scene');
  if (!dialog || !open || !close || !particles || !scene) return;
  for (let i = 0; i < 42; i += 1) {
    const dot = document.createElement('i');
    dot.className = 'scan-particle';
    const angle = (-45 + Math.random() * 90) * Math.PI / 180;
    const distance = 65 + Math.random() * 180;
    dot.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    dot.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
    dot.style.setProperty('--duration', `${2.2 + Math.random() * 2.8}s`);
    dot.style.setProperty('--delay', `${Math.random() * -5}s`);
    particles.append(dot);
  }
  const show = () => { dialog.classList.remove('is-closing'); dialog.showModal(); document.documentElement.style.overflow = 'hidden'; };
  const hide = () => {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    const finish = () => { dialog.close(); dialog.classList.remove('is-closing'); document.documentElement.style.overflow = ''; open.focus({preventScroll:true}); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish(); else setTimeout(finish, 240);
  };
  open.addEventListener('click', show);
  close.addEventListener('click', hide);
  let targetX=.7,targetY=.42,currentX=.7,currentY=.42,frame=0;
  const drawLens=()=>{
    currentX+=(targetX-currentX)*.16;
    currentY+=(targetY-currentY)*.16;
    scene.style.setProperty('--lens-x',`${currentX*100}%`);
    scene.style.setProperty('--lens-y',`${currentY*100}%`);
    scene.style.setProperty('--image-x',`${currentX*100}%`);
    scene.style.setProperty('--image-y',`${currentY*100}%`);
    if(Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001)frame=requestAnimationFrame(drawLens);else frame=0;
  };
  const moveLens=event=>{
    const rect=scene.getBoundingClientRect(),mobile=matchMedia('(max-width:800px)').matches;
    const marginX=mobile?.2:.16,marginY=mobile?.22:.25;
    targetX=Math.max(marginX,Math.min(1-marginX,(event.clientX-rect.left)/rect.width));
    targetY=Math.max(marginY,Math.min(1-marginY,(event.clientY-rect.top)/rect.height));
    if(!frame)frame=requestAnimationFrame(drawLens);
  };
  scene.addEventListener('pointermove',moveLens,{passive:true});
  scene.addEventListener('pointerdown',event=>{scene.setPointerCapture?.(event.pointerId);moveLens(event)});
  dialog.addEventListener('cancel', event => { event.preventDefault(); hide(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) hide(); });
})();
