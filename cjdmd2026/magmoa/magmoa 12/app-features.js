(() => {
  const root = document.querySelector('.phone-showcase');
  if (!root) return;
  const section = root.closest('.editorial-features');
  const stage = root.querySelector('.phone-stage');
  const slides = [...root.querySelectorAll('.phone-slide')];
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const counter = root.querySelector('.slide-counter');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width:701px)');
  const frame = document.createElement('div');
  frame.className = 'feature-fixed-frame';
  frame.setAttribute('aria-hidden', 'true');
  stage.append(frame);
  let current = 0, queued = false;
  let displayed = 0, target = 0, lastTime = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function render(position) {
    current = clamp(Math.round(position), 0, slides.length - 1);
    slides.forEach((slide, i) => {
      const distance = i - position;
      const amount = Math.min(1, Math.abs(distance));
      const opacity = distance < 0 ? Math.max(0, 1 + distance * 1.6) : Math.max(0, 1 - amount * .68 - Math.max(0, distance - 1) * .26);
      slide.style.transform = `translateX(calc(-50% + ${distance * 116}%)) scale(${1 - amount * .14})`;
      slide.style.opacity = opacity;
      slide.style.filter = `blur(${amount * 2.5}px)`;
      slide.style.zIndex = String(5 - Math.round(Math.abs(distance)));
      slide.classList.toggle('is-current', i === current);
      slide.classList.remove('is-prev', 'is-next');
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === current));
      tab.tabIndex = i === current ? 0 : -1;
    });
    stage.setAttribute('aria-labelledby', tabs[current].id);
    if (counter) counter.textContent = `0${current + 1} / 04`;
  }
  function range() { return Math.max(1, section.offsetHeight - innerHeight); }
  function select(index, focus = false) {
    index = clamp(index, 0, slides.length - 1);
    if (desktop.matches && !reduced.matches) {
      const top = scrollY + section.getBoundingClientRect().top;
      scrollTo({top: top + range() * ((index + .3) / slides.length), behavior: 'smooth'});
    } else render(index);
    if (focus) tabs[index].focus();
  }
  function update(time = performance.now()) {
    queued = false;
    if (!desktop.matches || reduced.matches) { displayed = target = current; render(current); lastTime = 0; return; }
    const progress = clamp(-section.getBoundingClientRect().top / range(), 0, 1);
    const segment = progress * slides.length;
    const base = Math.min(slides.length - 1, Math.floor(segment));
    // Hold each view, then scrub the next preview into the stationary frame.
    const blend = clamp((segment - base - .58) / .42, 0, 1);
    // Ease into the screen, then let the final few pixels settle into the frame.
    const eased = blend * blend * blend * (blend * (blend * 6 - 15) + 10);
    target = Math.min(slides.length - 1, base + eased);
    const elapsed = lastTime ? Math.min(64, Math.max(1, time - lastTime)) : 16;
    lastTime = time;
    displayed += (target - displayed) * (1 - Math.exp(-elapsed / 85));
    if (Math.abs(target - displayed) < .0005) displayed = target;
    render(displayed);
    if (displayed !== target) schedule();
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', event => {
      const targets = {ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: slides.length - 1};
      if (event.key in targets) { event.preventDefault(); select(targets[event.key], true); }
    });
  });
  root.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => select(current + (button.dataset.direction === 'next' ? 1 : -1))));
  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(current + (event.key === 'ArrowRight' ? 1 : -1)); }
  });
  let start;
  stage.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') start = {x:e.clientX, y:e.clientY}; });
  stage.addEventListener('pointerup', e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(current + (dx < 0 ? 1 : -1));
    start = null;
  });
  stage.addEventListener('pointercancel', () => { start = null; });
  root.showFeature = select;
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  render(0);
  update();
})();
