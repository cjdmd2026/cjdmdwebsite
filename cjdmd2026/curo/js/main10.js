/* ==========================================================================
   CURO — MAIN10 (119차, Index3 전용) : 책 뒤표지 + 'CURO 를 더 만나볼까요?' + 푸터
   값 = config main10 (위치) · bookOpenV11 (책 열기 속도·곡선 — Main1 ⇄ Main2 와 같은 느낌), 배치 = css/main10.css

   Main9 → Main10 (아래로)  : 책 닫기 = Main1 → Main2 열기를 거꾸로.
       Main9 화면이 작아지며 뒤표지 안쪽 종이 창으로 들어가고(camera zoom out) → 뒤표지가 오른쪽 책등을 축으로 덮임
   Main10 → Main9 (맨 위에서 위로, 또는 뒤표지 클릭) : 뒤표지가 열리고 → 창 안의 Main9 로 확대해 들어감
   Main10 안에서는 아래로 = 첫 화면 → 둘째 화면(메뉴 4개) → 푸터 로 통째로 내려감 (KIT 처럼 한 번에 한 칸)
   API: CURO_BOOK10.open() / close() (Promise), CURO_SUBSCROLL.main10 (pages.js 가 먼저 물어봄)
   ========================================================================== */
(function () {
  'use strict';
  const stage = document.getElementById('m10');
  if (!stage) return;
  const CFG = window.CURO_CONFIG, M = CFG.main10, BO = CFG.bookOpenV11, A = window.CURO_ANIM;
  const root = document.documentElement;
  const px = (v) => v + 'px';
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const el = {
    stage,
    move: stage.querySelector('.m10-move'),
    foot: stage.querySelector('.m10-foot'),
    coverLayer: document.querySelector('.m10-cover-layer'),
    coverPos: document.querySelector('.m10-cover-pos'),
    cover: document.querySelector('.m10-cover'),
    story: document.getElementById('story')
  };

  /* ---------- 배율 · 스크롤 칸 ---------- */
  let L = null, snapIdx = 0, y = 0;
  function layout() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.max(vw / M.scene.w, vh / M.screenH);          // 첫 화면(위 1080)을 빈틈없이 채움
    const x = (vw - M.scene.w * s) / 2;
    root.style.setProperty('--m10-s', s.toFixed(6));
    root.style.setProperty('--m10-x', px(x.toFixed(2)));
    root.style.setProperty('--m10-u', px(Math.min(1, vw / 1920).toFixed(4)));
    // 308차: 세 칸 — 첫 화면 / 그림 맨 아래(메뉴 4개, 푸터 없음) / 그림 아래에 붙은 푸터까지
    const s0 = clamp(M.focusY * s - vh / 2, 0, Math.max(0, M.screenH * s - vh));
    const end = Math.max(0, M.scene.h * s - vh);
    const snaps = [s0];
    if (end - s0 > 4) snaps.push(end);
    snaps.push(end + el.foot.offsetHeight);
    // 'CURO 를 더 만나볼까요?' 묶음(높이 약 446)을 둘째 화면 가운데에서 70 위로 (309차)
    const top = end / s;
    root.style.setProperty('--m10-more-top', px(Math.round((top + M.scene.h) / 2 - 223 - 70)));
    // 308차: 로고 + 문구 = Main1 화면에서 보이는 자리·크기 그대로 (main.js fit 이 먼저 CURO_STATE 를 채움)
    const st = window.CURO_STATE, lg = CFG.main1.logo;
    if (st && st.fitScale) {
      const f = (st.uiCompress && st.uiCompress.f) || 1, dy = (st.uiCompress && st.uiCompress.logoDy) || 0, fs = st.fitScale;
      root.style.setProperty('--m10-lw', px((fs * lg.w * f).toFixed(2)));
      root.style.setProperty('--m10-lx', px((st.fitX + fs * (lg.x + lg.w * (1 - f) / 2)).toFixed(2)));
      root.style.setProperty('--m10-ly', px((st.fitY + fs * (lg.y + dy) + s0).toFixed(2)));
    }
    L = { vw, vh, s, x, snaps };
    return L;
  }
  function setY(v) { y = v; root.style.setProperty('--m10-y', px(v.toFixed(2))); }

  /* ---------- 책 geometry (첫 화면 위치 기준) ----------
     zoom T(k): p → Z·p + t(k), Z = Zmax^k, t(k) = C(1−Z) + (V−C)k   (C = 책 중심, V = 화면 중심)
     Main9(#story)는 화면 그대로(전체 화면) 두고 T(k)∘T(1)⁻¹ 를 걸어 창 크기로 줄임 → k = 1 에서 원래 화면 */
  let G = null;
  function geometry() {
    const { vw, vh, s, x, snaps } = layout();
    const oy = -snaps[0];
    const B = M.book, P = M.page;
    const bx = x + s * B.x, by = oy + s * B.y, bw = s * B.w, bh = s * B.h;
    const C = { x: bx + bw / 2, y: by + bh / 2 }, V = { x: vw / 2, y: vh / 2 };
    const Zmax = (Math.min(vw, vh) / Math.min(bw, bh)) * (BO.zoom.extra || 1);
    const t1 = { x: C.x * (1 - Zmax) + (V.x - C.x), y: C.y * (1 - Zmax) + (V.y - C.y) };
    const w0 = { l: bx + s * P.paddingX, t: by + s * P.paddingY, r: bx + bw - s * P.paddingX, b: by + bh - s * P.paddingY };
    const w1 = { l: C.x - V.x / Zmax, t: C.y - V.y / Zmax, r: C.x + (vw - V.x) / Zmax, b: C.y + (vh - V.y) / Zmax };
    root.style.setProperty('--m10-persp', px(((vh * BO.cover.perspective) / s).toFixed(1)));
    G = { vw, vh, C, V, Zmax, t1, w0, w1, r0: P.radius * s };
    return G;
  }

  /* ---------- 장면 그리기 ---------- */
  const anim = { open: 0, zoom: 0 };
  const tuckEase = A.parseEase((BO.cover.tuck || {}).ease || 'sine.inOut');
  const winEase = A.parseEase(((BO.zoom || {}).window || {}).ease || 'power2.inOut');
  function render() {
    if (!G) return;
    // ① 뒤표지: 오른쪽 변(책등) 축으로 열림 (+180°). 90° 를 지나면 책등 쪽으로 살짝 붙음 (Main1 tuck 의 반대 방향)
    const tk = BO.cover.tuck, tu = tk ? clamp((anim.open - tk.from) / (tk.to - tk.from), 0, 1) : 0, te = tk ? tuckEase(tu) : 0;
    el.cover.style.transform = (te ? `translate(${(M.tuckX * te).toFixed(2)}px, 0px) ` : '') + `rotateY(${(180 * anim.open).toFixed(3)}deg)`;
    // ② camera zoom
    const k = anim.zoom, Z = Math.pow(G.Zmax, k);
    const tx = G.C.x * (1 - Z) + (G.V.x - G.C.x) * k, ty = G.C.y * (1 - Z) + (G.V.y - G.C.y) * k;
    const tf = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${Z.toFixed(5)})`;
    el.stage.style.transform = tf;
    el.coverLayer.style.transform = tf;
    const z = Z / G.Zmax;
    el.story.style.transform = `translate(${(tx - z * G.t1.x).toFixed(2)}px, ${(ty - z * G.t1.y).toFixed(2)}px) scale(${z.toFixed(5)})`;
    const [f0, f1] = BO.zoom.coverFade, fu = clamp((k - f0) / (f1 - f0), 0, 1);
    el.coverLayer.style.opacity = (1 - fu * fu * (3 - 2 * fu)).toFixed(3);
    // ③ 창: 안쪽 종이(w0) → 화면 전체(w1). #story 자기 좌표 = Zmax·w + t1
    const q = winEase(clamp(k / ((BO.zoom.window || {}).full || 1), 0, 1));
    const w = { l: lerp(G.w0.l, G.w1.l, q), t: lerp(G.w0.t, G.w1.t, q), r: lerp(G.w0.r, G.w1.r, q), b: lerp(G.w0.b, G.w1.b, q) };
    const Lx = G.Zmax * w.l + G.t1.x, Ty = G.Zmax * w.t + G.t1.y, Rx = G.Zmax * w.r + G.t1.x, By = G.Zmax * w.b + G.t1.y;
    const rr = lerp(G.r0, 0, q) * G.Zmax;
    el.story.style.clipPath = `inset(${Ty.toFixed(2)}px ${(G.vw - Rx).toFixed(2)}px ${(G.vh - By).toFixed(2)}px ${Lx.toFixed(2)}px round ${rr.toFixed(2)}px)`;
  }
  function clearInline() {
    el.stage.style.transform = ''; el.coverLayer.style.transform = ''; el.coverLayer.style.opacity = '';
    el.story.style.transform = ''; el.story.style.clipPath = '';
  }

  /* ---------- 열기 / 닫기 ---------- */
  let state = 'story';          // story(Main9 쪽, 책 열림) → closing → main10 → opening → story
  let tl = null, resolveFn = null;
  function buildTimeline() {
    const c = BO.cover, zm = BO.zoom;
    const t = A.timeline({ onUpdate: render, onComplete: onOpened, onReverseComplete: onClosed });
    t.to(anim, { open: 1, duration: c.duration, ease: c.ease }, c.start);
    t.to(anim, { zoom: 1, duration: zm.duration, ease: zm.ease }, zm.start);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.timeScale((reduce ? BO.reducedMotionTimeScale : 1) * (window.CURO_DEBUG_TIMESCALE || 1));
    return t;
  }
  function begin() {
    geometry();
    snapIdx = 0; setY(L.snaps[0]);
    root.classList.remove('m10-at-top');
    root.classList.add('is-m10-moving');
    el.story.setAttribute('aria-hidden', 'false');
  }
  function onClosed() {          // Main10 도착
    clearInline();
    root.classList.remove('is-m10-moving');
    root.classList.add('is-m10', 'm10-at-top');
    stage.setAttribute('aria-hidden', 'false');
    el.story.setAttribute('aria-hidden', 'true');
    el.coverPos.tabIndex = 0;
    state = 'main10';
    if (resolveFn) { resolveFn(true); resolveFn = null; }
    window.dispatchEvent(new CustomEvent('curo:page', { detail: { page: 'main10' } }));
  }
  function onOpened() {          // Main9 도착
    clearInline();
    el.cover.style.transform = '';
    root.classList.remove('is-m10-moving', 'is-m10', 'm10-at-top');
    stage.setAttribute('aria-hidden', 'true');
    el.coverPos.tabIndex = -1;
    state = 'story';
    if (resolveFn) { resolveFn(true); resolveFn = null; }
    window.dispatchEvent(new CustomEvent('curo:page', { detail: { page: 'story-9' } }));
  }
  function close() {
    if (state !== 'story') return Promise.resolve(false);
    state = 'closing';
    if (!tl) tl = buildTimeline();
    begin();
    tl.seek(tl.duration());      // 열린 상태(끝)에서 되감기
    window.CURO_BOOK10_TL = tl;   // 확인용 (seek 로 장면 확인)
    return new Promise((res) => { resolveFn = res; tl.reverse(); });
  }
  function open() {
    if (state !== 'main10' || moving) return Promise.resolve(false);
    if (window.CURO_MENU && window.CURO_MENU.isOpen()) return Promise.resolve(false);
    state = 'opening';
    if (!tl) { tl = buildTimeline(); }
    root.classList.remove('is-m10');
    begin();
    tl.seek(0);
    return new Promise((res) => { resolveFn = res; tl.play(); });
  }

  /* ---------- Main10 안에서 한 칸씩 (첫 화면 → 메뉴 → 푸터) ---------- */
  let moving = false;
  const ease = A.parseEase('power2.inOut');
  function scrollTo(i) {
    const from = y, to = L.snaps[i], t0 = performance.now(), dur = (M.scrollDuration || 0.9) * 1000;
    snapIdx = i; moving = true;
    root.classList.toggle('m10-at-top', i === 0);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setY(from + (to - from) * ease(p));
      if (p < 1) requestAnimationFrame(step); else moving = false;
    };
    requestAnimationFrame(step);
  }
  window.CURO_SUBSCROLL = window.CURO_SUBSCROLL || {};
  window.CURO_SUBSCROLL.main10 = (delta) => {
    if (state !== 'main10') return false;
    if (moving) return true;
    if (delta > 0) { if (snapIdx < L.snaps.length - 1) scrollTo(snapIdx + 1); return true; }   // 맨 아래에서는 그대로
    if (snapIdx > 0) { scrollTo(snapIdx - 1); return true; }
    return false;                                   // 맨 위에서 위로 → pages.js 가 책 열기(Main9)
  };

  /* 뒤표지 클릭 = 책 열기 (첫 화면에서만) */
  function clickOpen() {
    if (state !== 'main10' || snapIdx !== 0) return;
    if (window.CURO_PAGES && window.CURO_PAGES.current() === 'main10') window.CURO_PAGES.prev(); else open();
  }
  el.coverPos.addEventListener('click', clickOpen);
  el.coverPos.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); clickOpen(); } });

  window.addEventListener('resize', () => {
    layout();
    if (state === 'main10') { snapIdx = Math.min(snapIdx, L.snaps.length - 1); setY(L.snaps[snapIdx]); }
  });
  layout(); setY(L.snaps[0]);

  window.CURO_BOOK10 = {
    open, close,
    state: () => state,
    isBusy: () => state === 'opening' || state === 'closing' || moving,
    layout: () => L,
    geometry: () => G
  };
})();
