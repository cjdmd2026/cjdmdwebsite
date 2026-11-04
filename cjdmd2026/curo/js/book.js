/* ==========================================================================
   CURO — Index3 (후보) : 11차 책 열기 / 닫기  (MAIN ⇄ Main2)
   처음 만든 방식을 다시 만든 것. 값은 js/config-book.js, 배치는 css/book.css.

   열기: ① FrontCover 가 실제 책 표지처럼 왼쪽 hinge 로 펼쳐짐 (rotateY, 뒷면 = 왼쪽 종이 페이지)
         ② 펼쳐진 책 안(500×500 창)에 Main2 가 보임
         ③ camera zoom: MAIN·표지·Main2 가 함께 확대되며 책 창이 화면을 채우고,
            창(clip)이 화면 폭까지 넓어져 Main2 fullscreen 으로 진입
   닫기: 같은 timeline 을 되감는다 (pages.js 의 위로 scroll).
   API / 이벤트는 book.js 와 같다 (CURO_BOOK.open/close, curo:page).
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.CURO_CONFIG;
  const BO = CFG.bookOpenV11;
  const M1 = CFG.main1;
  const M2 = CFG.main2;
  const root = document.documentElement;
  const px = (v) => v + 'px';
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  root.classList.add('v11');

  const el = {
    bookPos: document.querySelector('.cover-layer .book-position'),
    cover: document.querySelector('.book-cover'),
    back: document.querySelector('.book-face--back'),
    story: document.getElementById('story'),
    main: document.querySelector('.main-stage'),
    coverLayer: document.querySelector('.cover-layer')
  };

  root.style.setProperty('--m2-w', px(M2.scene.w));
  root.style.setProperty('--m2-h', px(M2.scene.h));
  root.style.setProperty('--m2-bg', M2.background);
  M2.layers.forEach((l) => {
    const n = document.querySelector(`.m2-layer[data-m2="${l.key}"]`);
    if (n) n.hidden = !l.enabled;
  });
  if (BO.cover.back === 'none') el.back.style.display = 'none';

  /* ---------- Main2 fullscreen camera ---------- */
  function coverCamera(cam, vw, vh) {
    const cr = cam.coverRect;
    const s = Math.max(vw / cr.w, vh / cr.h);
    const W = vw / s, H = vh / s;
    const L = clamp(cam.focus.x - W / 2, cr.x, cr.x + cr.w - W);
    const T = clamp(cam.focus.y - H / 2, cr.y, cr.y + cr.h - H);
    return { s, x: -L * s, y: -T * s };
  }
  function setStoryCam(c) {
    root.style.setProperty('--story-s', c.s.toFixed(6));
    root.style.setProperty('--story-x', px(c.x.toFixed(2)));
    root.style.setProperty('--story-y', px(c.y.toFixed(2)));
  }

  /* ---------- geometry ----------
     zoom transform (viewport 좌표, origin 0 0):  p → Z·p + (C·(1−Z) + (V−C)·k)
       C = 책 중심, V = 화면 중심, k = zoom 진행률. 끝에서 책 중심이 화면 중심에 오고 Z = Zmax.
     Main2 는 zoom 이 끝났을 때 정확히 fullscreen camera 가 되도록, 그 역변환 위치(base)에 둔다. */
  let geo = null;
  function layout() {
    const st = window.CURO_STATE;
    const vw = window.innerWidth, vh = window.innerHeight;
    const S1 = st.fitScale;
    const bw = M1.book.w * S1, bh = M1.book.h * S1;
    const bx = st.fitX + S1 * M1.book.x, by = st.fitY + S1 * M1.book.y;
    const C = { x: bx + bw / 2, y: by + bh / 2 }, V = { x: vw / 2, y: vh / 2 };
    const Zmax = (Math.min(vw, vh) / Math.min(bw, bh)) * BO.zoom.extra;
    // 표지 3D: perspective (책 좌표), 소실점 = 책 중심
    root.style.setProperty('--book-perspective', px(((vh * BO.cover.perspective) / S1).toFixed(1)));
    root.style.setProperty('--book-perspective-origin', `${M1.book.w / 2}px ${M1.book.h / 2}px`);
    // Main2 base camera
    const fs = coverCamera(M2.camera, vw, vh);
    const base = { s: fs.s / Zmax, x: (fs.x - V.x) / Zmax + C.x, y: (fs.y - V.y) / Zmax + C.y };
    // 창(clip, zoom 전 좌표): 책 페이지 → zoom 끝에서 화면 전체가 되는 사각형
    //   32차: 시작 창 = 책 page(config main1.bookInterior.page) 를 padding 만큼 안쪽으로 → 크림색 내지 여백 + 둥근 모서리
    const BI = M1.bookInterior || { page: M1.book, paddingX: 0, paddingY: 0, radius: 0 };
    const pg = BI.page || M1.book;
    const px0 = st.fitX + S1 * (pg.x + BI.paddingX), py0 = st.fitY + S1 * (pg.y + BI.paddingY);
    const w0 = { l: px0, t: py0, r: px0 + S1 * (pg.w - 2 * BI.paddingX), b: py0 + S1 * (pg.h - 2 * BI.paddingY) };
    const r0 = (BI.radius || 0) * S1;
    const w1 = { l: C.x - V.x / Zmax, t: C.y - V.y / Zmax, r: C.x + (vw - V.x) / Zmax, b: C.y + (vh - V.y) / Zmax };
    geo = { vw, vh, C, V, Zmax, fs, base, w0, w1, r0 };
    return geo;
  }

  const tuckEase = window.CURO_ANIM.parseEase((BO.cover.tuck || {}).ease || 'sine.inOut');
  const winEase = window.CURO_ANIM.parseEase(((BO.zoom || {}).window || {}).ease || 'power2.inOut');

  /* ---------- state ---------- */
  let state = 'closed';
  const anim = { open: 0, zoom: 0, ui: 0 };
  let tl = null;

  function render() {
    if (!geo) return;
    // ① 표지 펼침
    // 42차: 표지가 90° 를 지나면 내지 쪽으로 살짝 이동해 겹침 (tuck). translate 를 rotate 앞에 → 화면 기준 이동, 책 모양·열리는 방향 그대로
    const tk = BO.cover.tuck, tu = tk ? clamp((anim.open - tk.from) / (tk.to - tk.from), 0, 1) : 0, te = tk ? tuckEase(tu) : 0;
    el.cover.style.transform = (te ? `translate(${(tk.x * te).toFixed(2)}px, ${(tk.y * te).toFixed(2)}px) ` : '') +
      `rotateY(${(BO.cover.angle * anim.open).toFixed(3)}deg)`;
    // ③ camera zoom (지수 보간 → 일정한 속도감)
    const k = anim.zoom;
    const Z = Math.pow(geo.Zmax, k);
    const tx = geo.C.x * (1 - Z) + (geo.V.x - geo.C.x) * k;
    const ty = geo.C.y * (1 - Z) + (geo.V.y - geo.C.y) * k;
    const tf = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${Z.toFixed(5)})`;
    el.main.style.transform = tf;
    el.coverLayer.style.transform = tf;
    el.story.style.transform = tf;
    const [f0, f1] = BO.zoom.coverFade, fu = clamp((k - f0) / (f1 - f0), 0, 1);
    el.coverLayer.style.opacity = (1 - fu * fu * (3 - 2 * fu)).toFixed(3);
    // ② 책 안 창 (zoom 전 좌표) — 페이지 창(w0) → Main2 그림 전체(w1) 로 넓어짐. w1 은 Main2 그림 범위라 창이 그림 밖(빈 배경)을 보여주지 않는다.
    //   42차: 진행을 zoom 진행률 k 대신 q (k 0 → window.full 에서 0 → 1, ease) 로 → 창이 먼저 넓어지고 이후 카메라 확대만 이어짐.
    //   책(Main1)과 Main2 가 둘 다 크게 겹쳐 보이는 시간이 짧아진다
    const WN = BO.zoom.window || { full: 1 };
    const q = winEase(clamp(k / (WN.full || 1), 0, 1));
    const w = { l: lerp(geo.w0.l, geo.w1.l, q), t: lerp(geo.w0.t, geo.w1.t, q), r: lerp(geo.w0.r, geo.w1.r, q), b: lerp(geo.w0.b, geo.w1.b, q) };
    const rr = lerp(geo.r0, 0, q);   // 둥근 모서리도 같은 진행률로 0 까지 (화면 전체가 되면 직각)
    el.story.style.clipPath = `inset(${w.t.toFixed(2)}px ${(geo.vw - w.r).toFixed(2)}px ${(geo.vh - w.b).toFixed(2)}px ${w.l.toFixed(2)}px round ${rr.toFixed(2)}px)`;
    root.style.setProperty('--main-ui-opacity', (1 - anim.ui).toFixed(3));
    root.style.setProperty('--main-ui-y', px((BO.uiExit.y * anim.ui).toFixed(2)));
  }

  function clearInline() {
    el.main.style.transform = ''; el.coverLayer.style.transform = ''; el.coverLayer.style.opacity = '';
    el.story.style.transform = ''; el.story.style.clipPath = '';
  }

  function buildTimeline() {
    const c = BO.cover, z = BO.zoom, u = BO.uiExit;
    const t = window.CURO_ANIM.timeline({ onUpdate: render, onComplete: onOpened, onReverseComplete: onClosed });
    t.to(anim, { open: 1, duration: c.duration, ease: c.ease }, c.start);
    t.to(anim, { zoom: 1, duration: z.duration, ease: z.ease }, z.start);
    t.to(anim, { ui: 1, duration: u.duration, ease: u.ease }, u.start);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.timeScale((reduce ? BO.reducedMotionTimeScale : 1) * (window.CURO_DEBUG_TIMESCALE || 1));
    return t;
  }

  let resolveFn = null;
  function onOpened() {
    // zoom 끝 = Main2 fullscreen 과 같은 화면 → base camera 를 fullscreen 으로 바꾸고 transform/clip 제거
    setStoryCam(geo.fs);
    clearInline();
    root.classList.remove('is-book-opening');
    root.classList.add('is-book-arrived');
    el.story.setAttribute('aria-hidden', 'false');
    state = 'open';
    if (resolveFn) { resolveFn(true); resolveFn = null; }
    window.dispatchEvent(new CustomEvent('curo:page', { detail: { page: 'story-1' } }));
  }
  function onClosed() {
    root.classList.remove('is-book-opening', 'is-book-arrived');
    el.story.setAttribute('aria-hidden', 'true');
    el.cover.style.transform = '';
    clearInline();
    state = 'closed';
    if (resolveFn) { resolveFn(true); resolveFn = null; }
    window.dispatchEvent(new CustomEvent('curo:page', { detail: { page: 'main' } }));
  }

  function begin() {
    layout();
    setStoryCam(geo.base);
    root.classList.add('is-book-opening');
    render();
  }
  function open(source) {
    if (state !== 'closed') return Promise.resolve(false);
    if (window.CURO_MENU && window.CURO_MENU.isOpen()) return Promise.resolve(false);
    state = 'opening';
    if (!tl) tl = buildTimeline();
    begin();
    window.CURO_BOOK_TL = tl;
    return new Promise((res) => { resolveFn = res; tl.play(); });
  }
  function close(source) {
    if (state !== 'open') return Promise.resolve(false);
    if (window.CURO_MENU && window.CURO_MENU.isOpen()) return Promise.resolve(false);
    state = 'closing';
    root.classList.remove('is-book-arrived');
    begin();
    return new Promise((res) => { resolveFn = res; tl.reverse(); });
  }

  el.bookPos.addEventListener('click', () => open('click'));
  el.bookPos.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); open('key'); }
  });
  window.addEventListener('resize', () => {
    if (state === 'closed' || state === 'open') { layout(); setStoryCam(state === 'open' ? geo.fs : geo.base); }
  });

  layout();
  setStoryCam(geo.fs);

  window.CURO_BOOK = {
    open, close,
    state: () => state,
    isBusy: () => state === 'opening' || state === 'closing',
    geometry: () => geo,
    variant: 'v11'
  };
})();
