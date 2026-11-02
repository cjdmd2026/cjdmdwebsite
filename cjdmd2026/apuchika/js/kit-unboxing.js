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
  let raf = 0;
  function render() {
    raf = 0;
    if (reduced.matches) { section.classList.add('is-inside');
      for (const el of [copy, description]) el.style.opacity = '1';
      return; }
    const rect = section.getBoundingClientRect();
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    const travel = Math.max(1, section.offsetHeight - pin.offsetHeight);
    const progress = clamp((stickyTop - rect.top) / travel);
    const approach = phase(progress, .02, .17);
    const open = phase(progress, .17, .46);
    const unfold = phase(progress, .36, .64);
    const enter = Math.pow(phase(progress, .17, .70), 1.45);
    const reveal = phase(progress, .72, .86);
    const desktop = pin.clientWidth >= 901;
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
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  reduced.addEventListener('change', schedule);
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(pin);
  render();
})();
