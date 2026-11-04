/* ==========================================================================
   CURO — MAIN 정적 화면 + MENU
   - config → CSS custom property 주입
   - responsive fit : scene 전체가 하나의 scale 공유
   - menu open/close, scroll lock, ESC / 바깥 클릭 닫기
   (GSAP / ScrollTrigger 없음 — 책 열기·STORY 단계에서 추가 예정)
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.CURO_CONFIG;
  const root = document.documentElement;
  const px = (v) => v + 'px';

  /* ---------- 1. config → CSS vars ---------- */
  function applyConfig() {
    const m = CFG.main1;
    const ui = CFG.ui;
    const vars = {
      '--scene-w': px(m.scene.w),
      '--scene-h': px(m.scene.h),

      '--book-x': px(m.book.x),
      '--book-y': px(m.book.y),
      '--book-w': px(m.book.w),
      '--book-h': px(m.book.h),

      '--logo-x': px(m.logo.x),
      '--logo-y': px(m.logo.y),
      '--logo-w': px(m.logo.w),
      '--logo-h': px(m.logo.h),

      '--cta-cx': px(m.cta.cx),
      '--cta-cy': px(m.cta.cy),
      '--cta-fs': px(m.cta.fontSize),
      '--cta-ls': px(m.cta.letterSpacing || 0),

      // SVG 박스 좌상단 = chevron 중심 − (size/2, pathCy)
      '--arrow-x': px(m.arrow.cx - m.arrow.size / 2),
      '--arrow-y': px(m.arrow.cy - m.arrow.pathCy),
      '--arrow-size': px(m.arrow.size),
      '--cta-anchor-x': px(m.cta.cx),
      '--cta-anchor-y': px(m.uiCompress.ctaAnchorY),

      '--hb-x-angle': (ui.hamburger.xAngle || 45) + 'deg',

      '--menu-w0': px(ui.menu.panelWidth),
      '--menu-fs0': px(ui.menu.fontSize),
      '--menu-pitch0': px(ui.menu.itemPitch),
      '--menu-icon0': px(ui.menu.iconSize),
      '--menu-icon-gap0': px(ui.menu.iconGap),
      '--menu-group-w0': px(ui.menu.groupWidth),
      '--menu-group-dx0': px(ui.menu.groupOffsetX || 0)
    };
    for (const k in vars) root.style.setProperty(k, vars[k]);

    // 31차: crop 된 웹 에셋을 원래 캔버스 자리에 (box = [x, y, w, h], scene px). data-box-rel="book" = 책(hinge 사각형) 좌표 기준
    document.querySelectorAll('[data-box]').forEach((n) => {
      const b = m.assets && m.assets[n.getAttribute('data-box')];
      if (!b) return;
      const rel = n.getAttribute('data-box-rel') === 'book' ? m.book : { x: 0, y: 0 };
      n.style.left = px(b[0] - rel.x); n.style.top = px(b[1] - rel.y);
      n.style.width = px(b[2]); n.style.height = px(b[3]);
    });
  }

  /* ---------- 2. CLICK TO OPEN 세로 보정 ----------
     line-height:1 인 line box 의 중심과 "대문자 높이의 중심"은 폰트 metric 에 따라 다르다.
     폰트 로드 후 실제 글리프를 측정해서 cy 가 대문자 중심이 되도록 보정한다. */
  function calibrateCta() {
    const el = document.querySelector('.cta-text');
    if (!el) return;
    const fs = CFG.main1.cta.fontSize;
    const c = document.createElement('canvas').getContext('2d');
    c.font = `400 ${fs}px Pretendard`;
    const mt = c.measureText('H');
    // alphabetic baseline 기준 cap top = actualBoundingBoxAscent
    const capH = mt.actualBoundingBoxAscent;
    const fontAsc = mt.fontBoundingBoxAscent;
    const fontDesc = mt.fontBoundingBoxDescent;
    if (!capH || !fontAsc) return;
    // line-height:1 → content area 가 (asc+desc) 에서 fs 로 줄어들며 half-leading 이 양쪽에 균등 분배됨
    const halfLeading = (fs - (fontAsc + fontDesc)) / 2;
    const baselineFromTop = halfLeading + fontAsc;
    const capCenterFromTop = baselineFromTop - capH / 2;
    const dy = fs / 2 - capCenterFromTop;    // line box 중심 → cap 중심
    root.style.setProperty('--cta-dy', px(dy.toFixed(2)));
  }

  /* ---------- 3. responsive fit ----------
     MAIN : 1920×1080 design frame 을 cover 로 맞춘다.
            s = max(vw/1920, vh/1080), frame 중심 = viewport 중심.
     UI   : uiScale = clamp(min(vw/1920, vh/1080)) — viewport 기준 요소(hamburger, menu)에 사용. */
  // [f, y] 표를 f 로 선형 보간 (f 내림차순 표)
  function interpClearance(table, f) {
    if (!table || !table.length) return Infinity;
    const t = table.slice().sort((a, b) => b[0] - a[0]);
    if (f >= t[0][0]) return t[0][1];
    for (let i = 1; i < t.length; i++) {
      if (f >= t[i][0]) {
        const [f0, y0] = t[i - 1], [f1, y1] = t[i];
        return y1 + (y0 - y1) * (f - f1) / (f0 - f1);
      }
    }
    return t[t.length - 1][1];
  }

  let lastW = 0, lastH = 0;
  function fit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw === lastW && vh === lastH) return;
    lastW = vw; lastH = vh;

    const m = CFG.main1;
    const cam = m.camera;
    const cr = cam.coverRect;
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

    // (a) scale: coverRect 가 viewport 를 빈틈없이 덮는 최소 scale (= cover). 빈 여백 없음.
    const s = Math.max(vw / cr.w, vh / cr.h);
    // (b) camera: 보이는 scene 창(W×H)을 focus 중심으로 두되 coverRect 밖으로 나가지 않게 clamp
    const W = vw / s, H = vh / s;
    const L = clamp(cam.focus.x - W / 2, cr.x, cr.x + cr.w - W);
    const T = clamp(cam.focus.y - H / 2, cr.y, cr.y + cr.h - H);
    const x = -L * s;
    const y = -T * s;

    // (c) UI compress: 세로로 잘리는 비율 f (1920×1080 → 1, 세로 crop 없으면 항상 1)
    const uc = m.uiCompress;
    const fRaw = Math.min(1, H / m.frame.h);
    const f = Math.max(uc.minScale, fRaw);
    //   로고: top-center 기준으로 f 배 축소, 보이는 영역 top 에서 최소 여백 확보
    const clearance = interpClearance(uc.logoArtClearance, f);          // 로고 아래 캐릭터 top (scene y)
    const logoTopMax = clearance - uc.logoMinGapToArt * f - m.logo.h * f; // 이보다 내려가면 캐릭터와 가까워짐
    const logoTop = Math.max(m.logo.y, T + (uc.logoHardMinTop || 0) * f, Math.min(T + uc.logoMinTop * f, logoTopMax));
    const logoDy = logoTop - m.logo.y;
    //   CTA 그룹: arrow 아래 끝 기준으로 f 배 축소, 보이는 영역 bottom 에서 최소 여백 확보
    const ctaLimit = T + H - uc.ctaMinBottom * f;
    const ctaDy = Math.min(0, ctaLimit - uc.ctaAnchorY);

    const u = CFG.ui;
    const ui = Math.min(u.scaleMax, Math.max(u.scaleMin, Math.min(vw / 1920, vh / 1080)));

    root.style.setProperty('--fit-s', s.toFixed(5));
    root.style.setProperty('--fit-x', px(x.toFixed(2)));
    root.style.setProperty('--fit-y', px(y.toFixed(2)));
    root.style.setProperty('--ui', ui.toFixed(5));

    // hamburger / X (8차): 하나의 정사각형 아이콘 영역. 크기는 짝수 px 로 스냅 (가운데 2px 선이 정수 px 에 놓이도록).
    const hb = CFG.ui.hamburger;
    const t = hb.stroke;
    // 정사각형 한 변을 stroke 와 같은 홀짝으로 스냅 → (size − stroke)/2 가 정수 → 가운데 선이 정수 px 에 놓여 흐려지지 않음
    const snap = (v) => Math.max(t + 2, Math.round((v - t) / 2) * 2 + t);
    const size = snap(hb.size * (hb.scale || 1) * ui);                                   // 정사각형 한 변
    const lw = Math.round(size * hb.lineLength);                       // hamburger 선 길이 (3개 동일)
    const gap = Math.round(hb.lineGap * size);                          // 선 중심 간 간격 (균일)
    const ext = Math.min(size, size * hb.xExtent);                     // X bbox 한 변 (둥근 끝 포함) ≤ size
    const xw = Math.round((ext - t) * Math.SQRT2 + t);                 // 45° 회전 캡슐의 bbox = (L − t)/√2 + t
    root.style.setProperty('--hb-size', px(size));
    root.style.setProperty('--hb-lw', px(lw));
    root.style.setProperty('--hb-gap', px(gap));
    root.style.setProperty('--hb-stroke', px(t));
    root.style.setProperty('--hb-xw', px(xw));
    // 아이콘 중심을 7차와 같은 자리(오른쪽에서 centerRight, 위에서 centerTop)에 유지
    root.style.setProperty('--hb-top', px(Math.round(hb.centerTop * ui - size / 2)));
    root.style.setProperty('--hb-right', px(Math.round(hb.centerRight * ui - size / 2)));
    root.style.setProperty('--uic-f', f.toFixed(5));
    root.style.setProperty('--logo-dy', px(logoDy.toFixed(2)));
    root.style.setProperty('--cta-group-dy', px(ctaDy.toFixed(2)));

    window.CURO_STATE = Object.assign(window.CURO_STATE || {}, {
      vw, vh, fitScale: s, fitX: x, fitY: y, uiScale: ui,
      visible: { x: L, y: T, w: W, h: H },
      crop: { top: T - m.frame.y, bottom: m.frame.y + m.frame.h - (T + H), left: L - m.frame.x, right: m.frame.x + m.frame.w - (L + W) },
      uiCompress: { f, logoDy, ctaDy }
    });
  }

  /* ---------- 4. Menu ---------- */
  function initMenu() {
    const btn = document.querySelector('.hamburger');
    const panel = document.getElementById('menu-panel');
    const backdrop = document.querySelector('.menu-backdrop');
    const links = panel.querySelectorAll('.menu-link');
    // 119차: 현재 페이지 메뉴 표시 (#3CB5AC) — 파일 이름으로 찾음. 캐릭터 상세 = FRIENDS
    const here = (location.pathname.split('/').pop() || '').toLowerCase().replace(/^character(-old)?\.html$/, 'friends.html');
    links.forEach((a) => { if ((a.getAttribute('href') || '').toLowerCase() === here) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    let open = false;

    function setOpen(next, { restoreFocus = true } = {}) {
      if (next === open) return;
      open = next;
      root.classList.toggle('is-menu-open', open);
      root.classList.toggle('is-scroll-locked', open);   // 뒤 페이지(향후 STORY) 스크롤 잠금
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      if (open) {
        panel.removeAttribute('inert');
        window.setTimeout(() => links[0] && links[0].focus({ preventScroll: true }), 50);
      } else {
        panel.setAttribute('inert', '');
        if (restoreFocus) btn.focus({ preventScroll: true });
      }
    }

    btn.addEventListener('click', () => setOpen(!open));
    backdrop.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    });
    links.forEach((a) => a.addEventListener('click', (e) => {
      // 49차: 실제 페이지(kit.html 등)로 가는 링크는 그대로 이동. '#…' 섹션 링크는 아직 섹션이 없어 메뉴만 닫는다
      const href = a.getAttribute('href') || '';
      if (href && href.charAt(0) !== '#') { setOpen(false, { restoreFocus: false }); return; }
      e.preventDefault();
      setOpen(false);
    }));

    // 메뉴가 열려 있는 동안 wheel / touch 스크롤이 뒤로 전달되지 않도록
    const block = (e) => { if (open) e.preventDefault(); };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });

    window.CURO_MENU = { open: () => setOpen(true), close: () => setOpen(false), isOpen: () => open };
  }

  /* ---------- init ---------- */
  applyConfig();
  fit();
  /* 메뉴 색 theme (52차): MAIN 화면이면 기본, 그 외(PROGRAM · CURO KIT · STORY · FRIENDS)면 화이트 theme.
     MAIN 이 있는 페이지(Index*)는 책이 열려 STORY 로 가면 curo:page 이벤트로 바뀐다. */
  const hasMainScene = !!document.querySelector('.main-stage');
  function setMenuTheme(page) {
    root.classList.toggle('menu-theme-light', !(hasMainScene && (page === 'main' || page === 'main10')));   // 119차: Main10 도 MAIN 과 같은 메뉴 색
  }
  setMenuTheme(hasMainScene ? 'main' : 'sub');
  window.addEventListener('curo:page', (e) => setMenuTheme(e.detail && e.detail.page));

  // 첫 배치가 끝난 뒤에만 transition 을 켠다 (로드 순간 hamburger 선이 모였다 펴지는 현상 방지)
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-ready')));
  window.addEventListener('resize', fit);
  initMenu();

  if (document.fonts && document.fonts.load) {
    document.fonts.load(`400 ${CFG.main1.cta.fontSize}px Pretendard`).then(calibrateCta).catch(() => {});
    document.fonts.ready.then(() => root.classList.add('fonts-ready'));
  }
})();
