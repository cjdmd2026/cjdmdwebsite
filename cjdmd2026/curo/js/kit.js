/* ==========================================================================
   CURO KIT (49차, 50차 수정)
   1) 배율 — 섹션 1~3: 1920×1080 frame contain, 섹션 4: 폭 기준
   2) 세로 full-page snap — 1 → 2 → 3 (→ 4 맨 위). 4 는 일반 문서 스크롤, 4 맨 위에서 위로 → 3
      fullPage.js 의 vertical snap 처럼 한 번 입력 = 한 섹션, 이동 중·직후 입력 잠금, wheel 누적 threshold
      (라이브러리 없이 window 스크롤 위치를 rAF 로 보간 — 4번 일반 스크롤과 같은 document 를 쓰기 때문)
   3) 섹션 2 전개 — 완성 외형 fade → 내부 부품 reveal → 각 부품 SVG 가 transform(translate3d)으로 전개 위치까지
   4) A~H ↔ 부품 강조 (hover · focus · tap, 양방향)
   값은 js/kit-config.js
   ========================================================================== */
(function () {
  'use strict';
  if (window.matchMedia && matchMedia('(max-width: 600px)').matches) return;   // 184차: 폰은 js/kit-mobile.js 화면

  const K = window.CURO_KIT;
  const SN = K.snap, EX = K.explode;
  const root = document.documentElement;
  const px = (v) => v + 'px';
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  // 80차: 맨 앞에 'CURO 키트 안에 무엇이 들어있을까?'(k0) 추가 → snap index 0 = k0, 1 = k1(제품), 2 = k2, 3 = k3, 4 = k4 맨 위
  // 238차: 1번 아래 화면은 제품마다 다름 (kit-config sections: 벨트 2·3·4 / 인형 2·4 / 동화책 4) — 안 쓰는 화면은 css 가 숨김
  let SECTION_IDS = ['k0', 'k1', 'k2', 'k3', 'k4'];
  let L = SECTION_IDS.length - 1;                    // 마지막 = 일반 스크롤 섹션(k4) 맨 위
  const SECS = K.sections || {};
  const productId = () => root.dataset.kitProduct || K.startProduct || 'belt';
  function setSections() {
    SECTION_IDS = ['k0', 'k1'].concat(SECS[productId()] || ['k2', 'k3', 'k4']);
    L = SECTION_IDS.length - 1;
  }
  setSections();
  const IDX = (id) => SECTION_IDS.indexOf(id);
  // 80차: 벨트 외 제품(아래 상세 내용 아직 없음)을 보고 있으면 k1 아래로 못 내려감 (js/kit-products.js 가 CURO_KIT_LOCK 제공)
  const maxIdx = () => (window.CURO_KIT_LOCK && window.CURO_KIT_LOCK()) ? IDX('k1') : L;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- cubic-bezier (config 문자열 → 함수) ---------- */
  function bezier(str) {
    const m = /cubic-bezier\(([^)]+)\)/.exec(str || '');
    const [x1, y1, x2, y2] = m ? m[1].split(',').map(Number) : [0.65, 0, 0.35, 1];
    const bx = (t) => 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t;
    const by = (t) => 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t;
    return (x) => {
      if (x <= 0) return 0; if (x >= 1) return 1;
      let lo = 0, hi = 1, t = x;
      for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; if (bx(t) < x) lo = t; else hi = t; }
      return by(t);
    };
  }
  const snapEase = bezier(SN.ease);

  /* ---------- 1. 배율 ----------
     50차: 1080 frame 전체를 contain 하던 방식(min(vw/1920, vh/1080))은 브라우저 상단 UI 로 높이가 줄면
     (예: 1920×945) 위·아래 흰 여백까지 맞추느라 전체가 0.875배로 작아지고 좌우에 빈 여백이 생겼다.
     → 섹션마다 실제 콘텐츠 세로 범위(config layout.fit)만 화면에 맞춘다. */
  let H = window.innerHeight;
  const LAY = K.layout || {};
  function fitSection(el, vw, vh) {
    const f = (LAY.fit && LAY.fit[el.id]) || [0, 1080];
    const pad = LAY.fitPad != null ? LAY.fitPad : 24;
    // 위쪽 여백: 상단 메뉴(topnav.css, --nav-h)가 있으면 그 아래부터
    const navH = parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 0;
    const padT = Math.max(pad, navH + 12);
    const u = Math.min(vw / 1920, Math.max(0.1, vh - padT - pad) / (f[1] - f[0]));
    const kx = (vw - 1920 * u) / 2;
    // 기본은 1080 frame 가운데 정렬(F11·1920×1080 은 시안과 같음). 콘텐츠 범위가 화면 밖으로 나갈 때만 필요한 만큼 이동
    const ky = clamp((vh - 1080 * u) / 2, padT - u * f[0], vh - pad - u * f[1]);
    el.style.setProperty('--ku', u.toFixed(5));
    el.style.setProperty('--kx', px(kx.toFixed(2)));
    el.style.setProperty('--ky', px(ky.toFixed(2)));
    el.style.setProperty('--kr', px((kx / u).toFixed(2)));         // frame 오른쪽 바깥 여백 (디자인 px)
    return u;
  }
  function layout() {
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    H = vh;
    root.style.setProperty('--kvh', px(vh));
    // 58차: 섹션 1~3 은 공통 반응형 기준(css/snap.css)으로 배치 — 통째 scale 하지 않음.
    //   JS 는 실제 화면 폭(--kvw)과, transform 에 쓸 크기 단위 su 의 숫자 값(--sun)만 넣는다.
    //   su = min(콘텐츠폭/1920, (높이 − 메뉴)/1004, 1)  ← snap.css 의 --su 와 같은 식
    root.style.setProperty('--kvw', px(vw));
    const navH = parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 0;
    // 59차: F11 전체화면 판정 → html.is-fs (snap.css 가 크기를 0.87 배로, 남는 높이를 위아래로 나눔)
    const fs = !!document.fullscreenElement
      || (window.matchMedia && matchMedia('(display-mode: fullscreen)').matches)
      || (screen.height - vh <= 2 && screen.width - window.innerWidth <= 2);
    root.classList.toggle('is-fs', fs);
    const sy0 = Math.min(1, (vh - navH) / 1004);
    // --sun 은 2번 stage 전용. 60차: 2번은 F11 에서도 시안(1920×1080 = 1배) 구도 → F11 축소 규칙 제외
    const su = Math.min(Math.min(vw, 1920) / 1920, sy0);   // = 2번 섹션의 --su
    root.style.setProperty('--sun', su.toFixed(5));
    scale = su;                                       // 2번 부품 hover 판정용 (stage 배율)
    const u4 = Math.min(vw / 1920, LAY.maxScale4 || 1) * (LAY.scale4 || 1);   // scale4 < 1 → 4번 콘텐츠 폭을 줄여 양옆 여백 확보
    root.style.setProperty('--k4u', u4.toFixed(5));
    root.style.setProperty('--k4x', px(((vw - 1920 * u4) / 2).toFixed(2)));
  }
  let scale = 1;

  /* ---------- 2. 세로 snap ---------- */
  let cur = 0;                 // 마지막으로 정착한 snap index (0~3)
  let moving = false, coolUntil = 0, rafId = 0;
  let k3Hook = null;           // 63차: 섹션 3 도착 시 마우스 따라다니는 원 다시 판정
  const snapTop = (i) => i * H;
  const in4 = () => window.scrollY >= snapTop(L) - 1;
  const atTopOf4 = () => Math.abs(window.scrollY - snapTop(L)) <= 2;
  const menuOpen = () => !!(window.CURO_MENU && window.CURO_MENU.isOpen());

  function go(i, ms, force) {
    i = clamp(i, 0, maxIdx());
    // 81차: 0번(키트 구성)에서는 스크롤·키로 아래로 넘어가지 않음 — 제품을 눌러야(force) 1번으로
    if (!force && cur === IDX('k0') && i > cur) i = cur;
    if (moving) return;
    const from = window.scrollY, to = snapTop(i);
    leaving(i);
    if (Math.abs(from - to) < 1 || ms === 0) { window.scrollTo(0, to); coolUntil = performance.now() + SN.cooldownMs; arrive(i); return; }   // 83차: ms 0 = 바로 이동(페이지 이동처럼)
    moving = true;
    root.classList.add('kit-moving');
    const dur = ms != null ? ms : SN.duration * 1000;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, from + (to - from) * snapEase(p));
      if (p < 1) { rafId = requestAnimationFrame(step); return; }
      moving = false;
      root.classList.remove('kit-moving');
      coolUntil = performance.now() + SN.cooldownMs;
      arrive(i);
    };
    rafId = requestAnimationFrame(step);
  }

  function arrive(i) {
    cur = i;
    root.classList.toggle('kit-in-4', i === L);
    root.classList.toggle('float-top-on', i >= 1);
    const id = SECTION_IDS[i];
    if ((EX.resetOn || []).includes(id)) resetExplode();
    if (id === 'k2') startExplode();
    if (k3Hook) k3Hook();
  }
  function leaving(next) {
    // 2번을 떠나도 진행 중인 전개는 끝까지 진행 (중간에 멈추면 다시 돌아왔을 때 어정쩡한 상태가 됨).
    // 처음부터 다시 = explode.resetOn 섹션(기본 1번)에 도착할 때 resetExplode()
  }

  // wheel
  let acc = 0, accT = 0;
  const norm = (e) => e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * H : e.deltaY;
  // floating 상담 UI 안의 입력은 snap 과 분리
  const inFloat = (t) => !!(t && t.closest && t.closest('.k-chat, .k-float'));
  window.addEventListener('wheel', (e) => {
    if (menuOpen()) return;                         // main.js 가 막는다
    if (e.target && e.target.closest && e.target.closest('.k-chat')) {
      // 패널 안: 패널 본문이 스크롤될 수 있으면 그대로(overscroll-behavior: contain), 아니면 페이지로 넘기지 않음
      const body = e.target.closest('.k-chat-body');
      const dy0 = norm(e);
      const can = body && (dy0 > 0 ? body.scrollTop + body.clientHeight < body.scrollHeight - 1 : body.scrollTop > 0);
      if (!can) e.preventDefault();
      return;
    }
    const dy = norm(e);
    const zone = !in4();
    const upAtTop4 = !zone && dy < 0 && window.scrollY <= snapTop(L) + 1;
    if (moving || performance.now() < coolUntil) {
      if (zone || upAtTop4) e.preventDefault();
      acc = 0; return;
    }
    if (!zone) {
      if (dy < 0 && window.scrollY - (-dy) < snapTop(L) && !upAtTop4) {
        // 4번 안에서 위로 스크롤하다 4 맨 위를 지나치지 않게 멈춤 → 다음 입력부터 3번으로
        e.preventDefault(); window.scrollTo(0, snapTop(L)); coolUntil = performance.now() + SN.cooldownMs; acc = 0; return;
      }
      if (!upAtTop4) return;                        // 4번: 일반 스크롤
    }
    e.preventDefault();
    const now = performance.now();
    if (now - accT > SN.wheelWindowMs || Math.sign(dy) !== Math.sign(acc)) acc = 0;
    accT = now; acc += dy;
    if (acc >= SN.wheelThreshold) { acc = 0; go(cur + 1); }
    else if (acc <= -SN.wheelThreshold) { acc = 0; go(upAtTop4 ? L - 1 : cur - 1); }
  }, { passive: false });

  // keys
  document.addEventListener('keydown', (e) => {
    if (menuOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target && e.target.closest ? e.target : null;
    if (t && t.closest('input, textarea, select, .menu-panel, .k-float, .k-chat')) return;   // 상담 UI·입력칸 안의 키는 snap 과 분리
    if (t && (e.key === ' ' || e.key === 'Enter') && t.closest('button, a')) return;          // 버튼·링크의 Space 는 버튼 동작
    const down = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
    const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
    const zone = !in4();
    if (zone && (down || up || e.key === 'Home' || e.key === 'End')) {
      e.preventDefault();
      if (moving || performance.now() < coolUntil) return;
      if (e.key === 'Home') go(0); else if (e.key === 'End') go(maxIdx()); else go(cur + (down ? 1 : -1));
    } else if (!zone && up && atTopOf4()) {
      e.preventDefault();
      if (!moving) go(L - 1);
    } else if (!zone && e.key === 'Home') {
      e.preventDefault(); go(0, 1200);
    }
  });

  // touch
  let ty0 = null;
  window.addEventListener('touchstart', (e) => { ty0 = inFloat(e.target) ? null : e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (ty0 == null || menuOpen()) return;
    const dy = ty0 - e.touches[0].clientY;            // + = 아래로 넘김
    if (!in4() || (atTopOf4() && dy < 0)) e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchend', (e) => {
    if (ty0 == null) return;
    const dy = ty0 - (e.changedTouches[0] ? e.changedTouches[0].clientY : ty0); ty0 = null;
    if (Math.abs(dy) < SN.touchThreshold || moving || performance.now() < coolUntil || menuOpen()) return;
    if (!in4()) go(cur + (dy > 0 ? 1 : -1));
    else if (atTopOf4() && dy < 0) go(L - 1);
  }, { passive: true });

  // scrollbar 드래그 등으로 snap 구간 중간에 멈추면 가까운 섹션으로
  let settleT = 0;
  window.addEventListener('scroll', () => {
    root.classList.toggle('kit-in-4', in4());
    root.classList.toggle('float-top-on', window.scrollY > H * 0.5);
    if (moving) return;
    clearTimeout(settleT);
    settleT = setTimeout(() => {
      if (moving) return;
      const y = window.scrollY;
      if (y > snapTop(maxIdx()) + 1 && maxIdx() < L) { go(maxIdx(), 450); return; }   // 80차: 잠금 중 스크롤바로 내려간 경우
      if (y >= snapTop(L) - 1) { if (cur !== L) arrive(L); return; }
      const near = Math.round(y / H);
      if (Math.abs(y - snapTop(near)) > 1) go(near, 450);
      else if (near !== cur) { leaving(near); arrive(near); }
    }, SN.settleMs);
  }, { passive: true });

  window.addEventListener('resize', () => {
    const wasIn4 = in4(), r4 = window.scrollY - snapTop(L);
    layout();
    if (moving) { cancelAnimationFrame(rafId); moving = false; root.classList.remove('kit-moving'); }
    if (!wasIn4) window.scrollTo(0, snapTop(cur));
    else window.scrollTo(0, snapTop(L) + Math.max(0, r4));
  });

  /* ---------- floating UI (위로 가기 · 상담) = js/float.js (공통) ---------- */
  // 체크 아이콘 등 KIT 전용 아이콘 (kit-config.js icons)
  const ICONS = K.icons || {};
  document.querySelectorAll('img[data-icon]').forEach((im) => {
    const src = ICONS[im.dataset.icon];
    if (src && !im.getAttribute('src')) { im.src = encodeURI(src); im.decoding = 'async'; im.draggable = false; }
  });
  // '위로 가기' = 섹션 1 로 snap 이동
  if (window.CURO_FLOAT) window.CURO_FLOAT.onTop = () => { if (!moving) go(0, 1200); };

  /* ---------- 3. 섹션 2 전개 ---------- */
  const stage = document.getElementById('k2-stage');
  const list = document.getElementById('k2-parts');
  const items = list ? Array.from(list.querySelectorAll('li[data-part]')) : [];
  const parts = [];
  let state = 'idle', timers = [];
  // 238차: 분해도 자료 = 제품별 (벨트 = 맨 위 값, 그 외 = kit-config stages.제품)
  const BELT_STAGE = { showFirst: K.showFirst, parts: K.parts, callouts: K.callouts, labels: K.labels, revealOpacity: EX.revealOpacity, showAlt: '조립된 벨트 외형' };
  const stageData = (id) => (K.stages && K.stages[id]) || BELT_STAGE;
  let D = stageData(productId()), stageFor = productId();

  function buildStage() {
    stage.style.setProperty('--kx-fade', EX.fadeDuration + 's');
    stage.style.setProperty('--kx-fade-ease', EX.fadeEase);
    stage.style.setProperty('--kx-move', EX.moveDuration + 's');
    stage.style.setProperty('--kx-move-ease', EX.moveEase);
    stage.style.setProperty('--kx-dim', EX.dimDuration + 's');
    stage.style.setProperty('--kx-dim-o', String(EX.dimOpacity));
    if (list) {
      list.style.setProperty('--kx-dim', EX.dimDuration + 's');
      list.style.setProperty('--kx-text-dim-o', String(EX.textDimOpacity != null ? EX.textDimOpacity : 0.35));
    }
    const n = D.parts.length;
    D.parts.forEach((p, i) => {
      const img = new Image();
      img.className = 'k2-part';
      img.src = p.src; img.alt = ''; img.decoding = 'async'; img.draggable = false;
      img.dataset.part = p.part; img.dataset.id = p.id;
      Object.assign(img.style, { left: px(p.exploded[0]), top: px(p.exploded[1]), width: px(p.w), height: px(p.h) });
      img.style.setProperty('--dx', px(p.assembled[0] - p.exploded[0]));
      img.style.setProperty('--dy', px(p.assembled[1] - p.exploded[1]));
      const ro = D.revealOpacity && D.revealOpacity[p.id];
      img.style.setProperty('--o-reveal', String(ro == null ? 1 : ro));
      // 242차: 처음(조립 외형이 보일 때)부터 비쳐 보이는 부품 (각도 가이드 패드) · 겹침 순서
      const io = D.idleOpacity && D.idleOpacity[p.id];
      if (io != null) img.style.setProperty('--o-idle', String(io));
      if (p.z != null) img.style.zIndex = String(p.z);
      img.style.setProperty('--kx-delay', ((n - 1 - i) * EX.moveStagger).toFixed(3) + 's');   // 앞쪽(위) 부품부터
      stage.appendChild(img);
      parts.push({ cfg: p, el: img, hit: null });
    });
    const sf = D.showFirst, show = new Image();
    show.className = 'k2-show'; show.src = sf.src; show.alt = D.showAlt || ''; show.draggable = false;
    Object.assign(show.style, { left: px(sf.pos[0]), top: px(sf.pos[1]), width: px(sf.w), height: px(sf.h) });
    stage.appendChild(show);
    buildLabels();
    buildCallouts();
    // hover 판정용 알파 맵 (부품 SVG 의 실제 그림 영역)
    parts.forEach((o) => {
      const im = new Image();
      im.onload = () => {
        const w = Math.ceil(o.cfg.w), h = Math.ceil(o.cfg.h);
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const g = c.getContext('2d', { willReadFrequently: true });
        g.drawImage(im, 0, 0, o.cfg.w, o.cfg.h);
        try {
          const d = g.getImageData(0, 0, w, h).data;
          // 261차: hitFill 부품(속이 비치는 패드 등)은 줄마다 왼쪽 끝 ~ 오른쪽 끝을 모두 칠한 것으로 (투명한 안쪽도 hover)
          if (o.cfg.hitFill) for (let y = 0; y < h; y++) { let l = -1, r = -1; for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 2) { if (l < 0) l = x; r = x; } for (let x = l; l >= 0 && x <= r; x++) d[(y * w + x) * 4 + 3] = 255; }
          o.hit = { w, h, a: d };
        } catch (err) { o.hit = null; }
      };
      im.src = o.cfg.src;
    });
  }

  /* 부품 안내선 (53차~, config.labels 가 있을 때만): 부품 위 점 → 꺾인 선 → 알파벳 + 부품 이름.
     좌표 = 디자인 px (stage 와 같은 1920×1080). 강조된 부품의 안내선만 그려진다. */
  const labelEls = {};
  function buildLabels() {
    const L = D.labels;
    if (!L) return;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'k2-leaders'); svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', '1920'); svg.setAttribute('height', '1080'); svg.setAttribute('aria-hidden', 'true');
    stage.appendChild(svg);
    Object.keys(L).forEach((letter) => {
      const c = L[letter], pts = c.path;
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'k2-leader'); g.dataset.part = letter;
      const line = document.createElementNS(NS, 'polyline');
      line.setAttribute('points', pts.map((q) => q.join(',')).join(' '));
      line.setAttribute('pathLength', '1');
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', pts[0][0]); dot.setAttribute('cy', pts[0][1]); dot.setAttribute('r', '4.5');
      g.appendChild(line); g.appendChild(dot); svg.appendChild(g);
      const end = pts[pts.length - 1];
      const lab = document.createElement('div');
      lab.className = 'k2-label is-' + (c.align || 'right');
      lab.dataset.part = letter;
      lab.style.left = px(end[0]); lab.style.top = px(end[1]);
      lab.innerHTML = '<span class="k2-label-b"></span><span class="k2-label-t"></span>';
      lab.firstChild.textContent = letter; lab.lastChild.textContent = c.name;
      stage.appendChild(lab);
      labelEls[letter] = [g, lab];
    });
  }

  /* 부품 설명 콜아웃 (60차, config.callouts): 부품 이름 상자 + 설명 + 얇은 연결선 + 끝 점.
     좌표 = stage 디자인 px. line = [시작점(상자 쪽), …꺾는 점, 끝 점(부품 위 점)]. 강조된 부품의 콜아웃만 보임 */
  function buildCallouts() {
    const C = D.callouts;
    if (!C) return;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'k2-co-lines'); svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', '1920'); svg.setAttribute('height', '1080'); svg.setAttribute('aria-hidden', 'true');
    stage.appendChild(svg);
    Object.keys(C).forEach((letter) => {
      const c = C[letter], pts = c.line || [];
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'k2-co-line'); g.dataset.part = letter;
      if (pts.length > 1) {
        const line = document.createElementNS(NS, 'polyline');
        line.setAttribute('points', pts.map((q) => q.join(',')).join(' '));
        g.appendChild(line);
        const end = pts[pts.length - 1], dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('cx', end[0]); dot.setAttribute('cy', end[1]); dot.setAttribute('r', String(c.dotR || 4.5));
        g.appendChild(dot);
      }
      svg.appendChild(g);
      const box = document.createElement('div');
      box.className = 'k2-co'; box.dataset.part = letter; box.setAttribute('role', 'note');
      box.style.left = px(c.box[0]); box.style.top = px(c.box[1]);
      if (c.w) box.style.setProperty('--co-w', px(c.w));
      box.innerHTML = '<div class="k2-co-name"></div><p class="k2-co-desc"></p>';
      box.firstChild.textContent = c.name; box.lastChild.textContent = c.desc;
      if (c.note) { const n = document.createElement('p'); n.className = 'k2-co-note'; n.textContent = c.note; box.appendChild(n); }   // 272차: 종류 안내 + 그림 줄
      if (c.icons) { const l = document.createElement('div'); l.className = 'k2-co-ics'; c.icons.forEach(([src, alt]) => { const im = new Image(); im.src = src; im.alt = alt; l.appendChild(im); }); box.appendChild(l); }
      stage.appendChild(box);
      labelEls[letter] = (labelEls[letter] || []).concat([g, box]);
    });
  }

  function cancelExplodeTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, s) { timers.push(setTimeout(fn, s * 1000)); }

  function resetExplode() {
    cancelExplodeTimers();
    setFocus(null);
    stage.classList.add('no-anim');
    stage.classList.remove('is-reveal', 'is-explode', 'is-done', 'is-ready');
    if (list) list.classList.remove('is-ready');
    void stage.offsetWidth;                          // 전환 없이 조립 상태로
    stage.classList.remove('no-anim');
    state = 'idle';
  }
  function startExplode() {
    if (state !== 'idle') return;
    state = 'running';
    const maxDelay = (D.parts.length - 1) * EX.moveStagger;
    later(() => stage.classList.add('is-reveal'), EX.startDelay);
    later(() => stage.classList.add('is-explode'), EX.startDelay + EX.fadeDuration + EX.holdDuration);
    // 완료 = 마지막 부품의 이동까지 끝난 뒤. 이때부터만 A~H ↔ 부품 강조 가능 (.is-ready)
    later(() => {
      stage.classList.add('is-done', 'is-ready'); if (list) list.classList.add('is-ready'); state = 'done';
    }, EX.startDelay + EX.fadeDuration + EX.holdDuration + EX.moveDuration + maxDelay + 0.08);
  }

  /* ---------- 4. A~H ↔ 부품 강조 ---------- */
  let focus = null;
  function setFocus(letter) {
    if (letter && state !== 'done') letter = null;   // 전개가 끝난 뒤에만
    if (letter === focus) return;
    focus = letter;
    stage.classList.toggle('has-focus', !!letter);
    if (list) list.classList.toggle('has-focus', !!letter);
    Object.keys(labelEls).forEach((k) => labelEls[k].forEach((el) => el.classList.toggle('is-on', k === letter)));
    parts.forEach((o) => o.el.classList.toggle('is-focus', o.cfg.part === letter));
    items.forEach((li) => li.classList.toggle('is-focus', li.dataset.part === letter));
  }
  function hitPart(clientX, clientY) {
    const r = stage.getBoundingClientRect();
    const x = (clientX - r.left) / scale, y = (clientY - r.top) / scale;   // 디자인 px
    for (let i = parts.length - 1; i >= 0; i--) {
      const o = parts[i], [ex, ey] = o.cfg.exploded, lx = Math.floor(x - ex), ly = Math.floor(y - ey);
      if (!o.hit || lx < 0 || ly < 0 || lx >= o.hit.w || ly >= o.hit.h) continue;
      if (o.hit.a[(ly * o.hit.w + lx) * 4 + 3] > 2) return o.cfg.part;   // 261차: 24 → 2 (반투명 면이 많은 부품(각도 가이드 패드 등)도 면 전체가 hover 영역)
    }
    return null;
  }

  let lastPointer = 'mouse';
  document.addEventListener('pointerdown', (e) => { lastPointer = e.pointerType || 'mouse'; }, true);
  items.forEach((li) => {
    // 전개 중 마우스를 올려둔 경우에도 완료 후 '움직였을 때' 강조 (mousemove)
    const onMouse = () => { if (lastPointer === 'mouse' && state === 'done' && focus !== li.dataset.part) setFocus(li.dataset.part); };
    li.addEventListener('mouseenter', onMouse);
    li.addEventListener('mousemove', onMouse);
    li.addEventListener('focus', () => { if (li.matches(':focus-visible')) setFocus(li.dataset.part); });
    li.addEventListener('blur', () => { if (list && !list.contains(document.activeElement)) setFocus(null); });
    li.addEventListener('click', () => {                    // 터치: 탭 = 선택 / 다시 탭 = 해제
      if (lastPointer !== 'mouse') setFocus(focus === li.dataset.part ? null : li.dataset.part);
    });
  });
  if (list) list.addEventListener('mouseleave', () => { if (lastPointer === 'mouse') setFocus(null); });

  stage.addEventListener('mousemove', (e) => {
    if (state !== 'done' || lastPointer !== 'mouse') return;
    const p = hitPart(e.clientX, e.clientY);
    stage.style.cursor = p ? 'pointer' : '';
    setFocus(p);
  });
  stage.addEventListener('mouseleave', () => { if (lastPointer === 'mouse') { stage.style.cursor = ''; setFocus(null); } });
  stage.addEventListener('click', (e) => {
    if (state !== 'done' || lastPointer === 'mouse') return;
    const p = hitPart(e.clientX, e.clientY);
    setFocus(p && p !== focus ? p : null);
  });

  /* ---------- 5. 섹션 3 제품 특징 #01~#03 (63차) ----------
     - 섹션 3 에서 ← / → 키 (썸네일 3개는 보기용 이미지, 64차)
     - 마우스를 따라다니는 PREV / NEXT 원: 화면 왼쪽 절반 = PREV, 오른쪽 절반 = NEXT, 클릭 = 이동
       첫 장의 PREV · 마지막 장의 NEXT 자리에서는 나타나지 않음(이동 없음).
       메뉴·floating 버튼·링크 위에서는 숨김(일반 커서), 글·썸네일 위에서는 투명하게(64차) */
  const K3 = K.k3 || null;
  const k3el = document.getElementById('k3');
  const k3 = (() => {
    if (!K3 || !k3el || !K3.slides || !K3.slides.length) return null;
    const S = K3.slides, N = S.length;
    const text = k3el.querySelector('.k3-text');
    const numT = k3el.querySelector('.k3-num-t'), title = k3el.querySelector('.k3-title'), body = k3el.querySelector('.k3-body');
    const photo = k3el.querySelector('.k3-photo');
    const thumbImgs = Array.from(k3el.querySelectorAll('.k3-thumbs img'));
    const THUMB0 = thumbImgs.map((im) => [im.getAttribute('src'), im.alt]);
    const curEl = k3el.querySelector('.k3-cursor'), curT = curEl && curEl.querySelector('.k3-cursor-t');
    const outMs = (K3.outDuration != null ? K3.outDuration : 0.22) * 1000;
    k3el.style.setProperty('--k3-out', (outMs / 1000) + 's');
    k3el.style.setProperty('--k3-in', (K3.inDuration != null ? K3.inDuration : 0.42) + 's');
    let idx = 0, busy = false, tOut = 0, shown = 0;   // 196차: shown = 지금 화면에 그려진 슬라이드

    // 155차: 오른쪽 사진·썸네일도 글과 같이 사라졌다 나타남 (같은 시간). 사진은 미리 불러 둠
    S.forEach((d) => { if (d.photo) { const im = new Image(); im.src = d.photo; } (d.thumbs || []).forEach((t) => { const im = new Image(); im.src = t[0]; }); });
    function setPhoto(d) {
      if (d.photo && photo.getAttribute('src') !== d.photo) {
        photo.src = d.photo; photo.alt = d.alt || '';
        const b = d.box;
        photo.style.left = b ? `calc(${b[0]} * var(--su))` : ''; photo.style.top = b ? `calc(${b[1]} * var(--su))` : '';
        photo.style.width = b ? `calc(${b[2]} * var(--su))` : ''; photo.style.height = b ? `calc(${b[3]} * var(--su))` : '';
        photo.style.clipPath = d.clipBottom ? `inset(0 0 calc(100% - ${d.clipBottom} * var(--su)) 0)` : '';
        photo.style.webkitMask = photo.style.mask = d.mask || '';   // 235차: 사진 일부 가리기 (#01 손)
      }
      thumbImgs.forEach((im, k) => { const t = (d.thumbs || THUMB0)[k]; if (t && im.getAttribute('src') !== t[0]) { im.src = t[0]; im.alt = t[1]; } });
    }
    // 235차: 처음(#01) 사진도 box·mask 적용 (마크업 src 가 같아 setPhoto 가 건너뛰던 것)
    if (S[0] && S[0].photo) { photo.removeAttribute('src'); setPhoto(S[0]); }
    function render(i) {
      const d = S[i];
      numT.textContent = d.num; title.innerHTML = d.title; body.innerHTML = d.body;
    }
    function show(i) {
      i = clamp(i, 0, N - 1);
      if (i === idx) return;
      idx = i;
      // 전환 중 다시 눌러도 마지막 선택으로 (글은 한 번만 사라졌다 나타남)
      updateCursorDir();
      if (busy) return;
      run();
    }
    /* 196차: 빠르게 좌우로 넘기면 전환이 끝난 뒤 idx 와 화면(shown)이 달라져 #1 에 #2 내용이 남던 것
       → 전환이 끝날 때 마지막 선택(idx)과 다르면 한 번 더 전환 */
    function run() {
      busy = true;
      text.classList.remove('is-in'); text.classList.add('is-out');
      photo.classList.remove('is-in'); photo.classList.add('is-out');
      clearTimeout(tOut);
      tOut = setTimeout(() => {
        shown = idx; render(shown); setPhoto(S[shown]);
        text.classList.add('is-in'); photo.classList.add('is-in');
        void text.offsetWidth;
        text.classList.remove('is-out'); photo.classList.remove('is-out');
        setTimeout(() => { busy = false; text.classList.remove('is-in'); photo.classList.remove('is-in'); if (shown !== idx) run(); }, (K3.inDuration || 0.42) * 1000);
      }, outMs);
    }

    // --- 마우스 따라다니는 원 ---
    const hideSel = (K3.cursor && K3.cursor.hideOn) || 'a, button';
    const dimSel = (K3.cursor && K3.cursor.dimOn) || '.k3-col';
    const follow = (K3.cursor && K3.cursor.follow) || 0.16;
    let tx = 0, ty = 0, cx = 0, cy = 0, on = false, dir = 0, raf = 0, lastT = 0, mx = -1, my = -1;
    const finePointer = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : { matches: true };
    function dirAt(x) { return x < window.innerWidth / 2 ? -1 : 1; }
    function canGo(d) { return d < 0 ? idx > 0 : idx < N - 1; }
    function updateCursorDir() {
      if (!curEl || mx < 0) return;
      evaluate(mx, my, document.elementFromPoint(mx, my));
    }
    function setOn(v) {
      if (v === on) return;
      on = v;
      curEl.classList.toggle('is-on', v);
      k3el.classList.toggle('k3-cursor-on', v);
    }
    function evaluate(x, y, target) {
      const r = k3el.getBoundingClientRect();
      const ok = finePointer.matches && cur === IDX('k3') && !moving && !menuOpen()
        && target && k3el.contains(target) && !target.closest(hideSel)
        && y >= r.top && y <= r.bottom;
      const d = dirAt(x);
      if (!ok || !canGo(d)) { setOn(false); return false; }
      if (d !== dir) {
        dir = d;
        curEl.classList.toggle('is-prev', d < 0);
        if (curT) curT.textContent = d < 0 ? 'PREV' : 'NEXT';
      }
      curEl.classList.toggle('is-dim', !!target.closest(dimSel));
      tx = x - r.left; ty = y - r.top;
      if (!on) { cx = tx; cy = ty; place(); }      // 처음 나타날 때는 바로 그 자리에서 (멀리서 날아오지 않게)
      setOn(true);
      if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); }
      return true;
    }
    function place() { curEl.style.setProperty('--cx', cx.toFixed(1) + 'px'); curEl.style.setProperty('--cy', cy.toFixed(1) + 'px'); }
    function tick(now) {
      const dt = Math.min(64, now - lastT); lastT = now;
      const k = 1 - Math.pow(1 - follow, dt / 16.667);   // 프레임 속도와 무관하게 같은 느낌
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      place();
      if (Math.abs(tx - cx) < 0.3 && Math.abs(ty - cy) < 0.3) { cx = tx; cy = ty; place(); raf = 0; return; }
      raf = requestAnimationFrame(tick);
    }
    if (curEl) {
      document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; evaluate(mx, my, e.target); }, { passive: true });
      document.addEventListener('mouseleave', () => setOn(false));
      window.addEventListener('blur', () => setOn(false));
      window.addEventListener('scroll', () => { if (moving || cur !== IDX('k3')) setOn(false); }, { passive: true });
      k3el.addEventListener('click', (e) => {
        if (!on || e.button !== 0) return;
        if (e.target.closest(hideSel)) return;
        const d = dirAt(e.clientX);
        if (canGo(d)) show(idx + d);
      });
    }
    // 키보드: 섹션 3 에 있을 때 ← / →
    document.addEventListener('keydown', (e) => {
      if (cur !== IDX('k3') || moving || menuOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target && e.target.closest ? e.target : null;
      if (t && t.closest('input, textarea, select, .k-chat')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
    });
    k3Hook = updateCursorDir;
    return { go: show, current: () => idx, cursorOn: () => on, refresh: updateCursorDir };
  })();

  /* 238차: 1번에서 제품을 바꾸면 (kit-products.js 가 html[data-kit-product] 를 바꿈) 아래 화면 구성·분해도도 그 제품으로 */
  function onProduct() {
    const id = productId();
    setSections();
    if (id === stageFor) return;
    stageFor = id;
    const nd = stageData(id);
    if (nd === D) return;
    D = nd;
    cancelExplodeTimers(); setFocus(null);
    parts.length = 0; Object.keys(labelEls).forEach((k) => delete labelEls[k]);
    stage.innerHTML = '';
    buildStage(); resetExplode();
  }
  new MutationObserver(onProduct).observe(root, { attributes: true, attributeFilter: ['data-kit-product'] });

  /* ---------- init ---------- */
  layout();
  buildStage();
  resetExplode();
  window.scrollTo(0, 0);
  arrive(0);

  // 328차: '렌탈 하러가기' (PC 왼쪽 버튼 · 폰 아래 바) → 오른쪽 아래 학습 상담 열기
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.k1-btn, .km-cta');
    if (!b || !window.CURO_FLOAT) return;
    e.preventDefault(); window.CURO_FLOAT.setChat(true);
  });

  window.CURO_KIT_API = { go, k3, current: () => cur, state: () => state, setFocus, resetExplode, startExplode, setChat: (on) => window.CURO_FLOAT && window.CURO_FLOAT.setChat(!!on) };
})();
