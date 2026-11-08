/* ==========================================================================
   CURO — STORY 텍스트 등장 / 퇴장  · 28차 (위치 30차)
   · 장면 이동이 완전히 끝난 뒤(curo:page) → STORY 이동이면 바로(story.text.afterMove), 책 열기로 도착이면 story.text.pause 초 쉬고 → 보조 문구 → 메인 타이틀 → 본문 순으로 (stagger) → 화살표 마지막
   · 이동 시작(curo:leave, pages.js) → 그 장면 텍스트를 story.text.fadeOut 초 동안 바로 fade-out (배경과 함께 끌려가지 않음)
   · 다시 돌아오면 정착 후 다시 재생
   값: config mainN.text (duration / ease / stagger / 요소별 y), story.text (pause / fadeOut)
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.CURO_CONFIG;
  const ST = CFG.story.text || { pause: 0.25, fadeOut: 0.25 };
  const root = document.documentElement;
  const SCENE_CFG = { 'story-1': CFG.main2, 'story-5': CFG.main5 };
  // 47차: 장면 목록(config story.scenes)의 나머지 장면도 같은 방식 (mainN.text)
  Object.entries(CFG.story.scenes || {}).forEach(([id, key]) => { if (!SCENE_CFG[id] && CFG[key]) SCENE_CFG[id] = CFG[key]; });

  const blocks = {};
  document.querySelectorAll('.story-text[data-page]').forEach((b) => {
    const id = b.getAttribute('data-page');
    const t = (SCENE_CFG[id] && SCENE_CFG[id].text) || {};
    blocks[id] = b;
    b.style.setProperty('--st-out', ST.fadeOut + 's');
    const dur = t.duration || 0.7, stag = t.stagger || 0.12, ease = t.ease || 'ease-out';
    const order = { kicker: 0, title: 1, body: 2, logo: 3 };   // 47차: logo (Main9) = 본문 다음
    b.querySelectorAll('.st-el').forEach((el) => {
      const k = el.getAttribute('data-st');
      const o = t[k] || {};
      let delay, d = dur, x0 = 0, y0 = o.y || 0;
      if (k === 'arrow') {
        const a = t.arrow || {};
        d = a.duration || 0.5;
        delay = stag * 2 + dur + (a.delay || 0);           // 본문 등장이 끝난 뒤
        x0 = a.x || 0; y0 = 0;
      } else {
        delay = stag * (order[k] || 0);
      }
      el.style.setProperty('--st-dur', d + 's');
      el.style.setProperty('--st-ease', ease);
      el.style.setProperty('--st-delay', delay.toFixed(3) + 's');
      el.style.setProperty('--st-x0', x0 + 'px');
      el.style.setProperty('--st-y0', y0 + 'px');
    });
    // 328차: → 다음 장면 / ← 이전 장면 (.st-prev)
    b.querySelectorAll('.st-arrow').forEach((arrow) => arrow.addEventListener('click', () => window.CURO_PAGES && (arrow.classList.contains('st-prev') ? window.CURO_PAGES.prev() : window.CURO_PAGES.next())));
  });

  // 30차: 크기 u = contain(min), 위치 = 그림(cover, max 배율)의 anchor 지점을 따라감 → 가로로 넓은/낮은 창에서 텍스트가 가운데로 몰리지 않음
  //   content 범위(.st-el 의 디자인 좌표)가 화면 밖으로 나가지 않게 margin 으로 clamp
  const LY = ST.layout || { follow: 0 };
  function extent(b) {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    b.querySelectorAll(':scope > .st-el').forEach((el) => {
      x0 = Math.min(x0, el.offsetLeft); y0 = Math.min(y0, el.offsetTop);
      x1 = Math.max(x1, el.offsetLeft + el.offsetWidth); y1 = Math.max(y1, el.offsetTop + el.offsetHeight);
    });
    return x1 > x0 ? { x0, y0, x1, y1 } : { x0: 0, y0: 0, x1: 1920, y1: 1080 };
  }
  function place(vw, vh, u, S, ax, ay, lo0, hi0, m, size) {
    const f = LY.follow == null ? 1 : LY.follow;
    const center = (size === vw ? vw - 1920 * u : vh - 1080 * u) / 2;          // 예전 방식 (가운데)
    const pin = (size === vw ? vw / 2 + (ax - 960) * S : vh / 2 + (ay - 540) * S) - (size === vw ? ax : ay) * u;
    let t = center + (pin - center) * f;
    const lo = m - lo0 * u, hi = size - m - hi0 * u;                             // 내용이 화면 안에
    if (lo <= hi) t = Math.min(Math.max(t, lo), hi);
    return t;
  }
  function fit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const u = Math.min(vw / 1920, vh / 1080), S = Math.max(vw / 1920, vh / 1080);
    root.style.setProperty('--st-u', u.toFixed(5));
    const A = LY.anchor || { x: 960, y: 540 }, m = (LY.margin || 0) * u;
    Object.keys(blocks).forEach((id) => {
      const b = blocks[id], e = extent(b);
      b.style.setProperty('--st-tx', place(vw, vh, u, S, A.x, A.y, e.x0, e.x1, m, vw).toFixed(1) + 'px');
      b.style.setProperty('--st-ty', place(vw, vh, u, S, A.x, A.y, e.y0, e.y1, m, vh).toFixed(1) + 'px');
    });
  }

  const timers = {}, started = {};
  function show(id, pause) {
    const b = blocks[id];
    if (!b) return;
    clearTimeout(timers[id]);
    b.classList.remove('is-in');
    started[id] = true;
    const ms = (pause == null ? ST.pause : pause) * 1000 / (window.CURO_DEBUG_TIMESCALE || 1);
    if (ms <= 0) b.classList.add('is-in');
    else timers[id] = setTimeout(() => { b.classList.add('is-in'); }, ms);
  }
  function hide(id) {
    const b = blocks[id];
    if (!b) return;
    clearTimeout(timers[id]);
    started[id] = false;
    b.classList.remove('is-in');
  }

  window.addEventListener('curo:leave', (e) => hide(e.detail.from));
  // 28차: 장면 이동 완료(curo:page) 후에만 등장. STORY 장면끼리 이동(via 'story') → 멈추자마자 바로 (story.text.afterMove)
  //   책 열기로 도착 → story.text.pause 후. 이동 중 progress 로 미리 시작하지 않음 (26·27차 startAt 방식 취소)
  // 47차: 텍스트 안 이미지(Main9 로고)는 장면 이미지와 같이 현재 장면 ±preload.load 일 때만 내려받음 (data-src → src)
  const PANELS = CFG.story.panels || [], LOAD = (CFG.story.preload || {}).load || 2;
  function loadNear(page) {
    const c = PANELS.indexOf(page);
    Object.keys(blocks).forEach((id) => {
      if (Math.abs(PANELS.indexOf(id) - (c < 0 ? 0 : c)) > LOAD) return;
      blocks[id].querySelectorAll('img[data-src]').forEach((img) => { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); });
    });
  }
  window.addEventListener('curo:page', (e) => {
    loadNear(e.detail.page);
    Object.keys(blocks).forEach((id) => { if (id !== e.detail.page) hide(id); });
    if (document.documentElement.classList.contains('perf-notext')) return;
    show(e.detail.page, e.detail.via === 'story' ? (ST.afterMove || 0) : ST.pause);
  });
  window.addEventListener('resize', fit);
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);   // 폰트 로드 후 content 폭 다시 잼

  window.CURO_STORY_TEXT = { show, hide, showNow: (id) => { const b = blocks[id]; if (b) { clearTimeout(timers[id]); b.classList.add('is-in'); } } };
})();
