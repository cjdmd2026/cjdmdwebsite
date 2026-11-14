(function () {
  const me = document.currentScript;
  const TARGET = (me && me.dataset.target) || '.cards';
  const ITEMS  = (me && me.dataset.items)  || '.message-bubble';
  const ORIGIN = (me && me.dataset.origin) || 'center center';

  const CANVAS_W = 2850, CANVAS_H = 1575;
  const NAV_GAP = 20;
  const SELECT_GROW = 1.03;
  const MIN_K = 0.5;

  function leftInCanvas(el, canvas) {
    let x = 0;
    while (el && el !== canvas) {
      x += el.offsetLeft;
      el = el.offsetParent;
    }
    return el === canvas ? x : null;
  }

  function fit() {
    const canvas = document.querySelector('#scaleWrap .container');
    const target = document.querySelector(TARGET);
    const prev   = document.querySelector('.prev-wrap');
    const next   = document.querySelector('.next-wrap');
    if (!canvas || !target || !prev || !next) return;

    const scale = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
    const canvasLeft = window.innerWidth / 2 - (CANVAS_W / 2) * scale;
    const toCanvas = x => (x - canvasLeft) / scale;

    const pr = prev.getBoundingClientRect();
    const nr = next.getBoundingClientRect();
    const leftLimit  = pr.width ? toCanvas(pr.right + NAV_GAP) : -Infinity;
    const rightLimit = nr.width ? toCanvas(nr.left  - NAV_GAP) :  Infinity;

    let minL = Infinity, maxR = -Infinity;
    target.querySelectorAll(ITEMS).forEach(el => {
      const l = leftInCanvas(el, canvas);
      if (l === null) return;
      minL = Math.min(minL, l);
      maxR = Math.max(maxR, l + el.offsetWidth);
    });
    const tLeft = leftInCanvas(target, canvas);
    if (!isFinite(minL) || tLeft === null) return;

    const center = tLeft + target.offsetWidth / 2;
    const kL = center - minL > 0 ? (center - leftLimit)  / ((center - minL) * SELECT_GROW) : 1;
    const kR = maxR - center > 0 ? (rightLimit - center) / ((maxR - center) * SELECT_GROW) : 1;
    const k  = Math.max(MIN_K, Math.min(1, kL, kR));

    target.style.transformOrigin = ORIGIN;
    target.style.transform = k < 0.999 ? `scale(${k})` : '';
  }

  fit();
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', () => setTimeout(fit, 200));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  window.fitCardsBetweenNav = fit;
})();
