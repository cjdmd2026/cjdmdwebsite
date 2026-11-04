/* ==========================================================================
   CURO — 페이지 이동 controller
   아래 방향(wheel·ArrowDown·PageDown·Space·위로 swipe) = 다음 페이지
   위 방향  (wheel·ArrowUp·PageUp·아래로 swipe)        = 이전 페이지
   scroll 은 trigger 일 뿐: 한 번 넘어가면 전환 animation 이 끝까지 자동 재생된다.
   전환 중·전환 직후(cooldown)의 입력은 무시한다 (trackpad 관성 scroll 대비).

   페이지 순서: config.pages.order  (지금은 'main' → 'story-1')
   전환 정의  : TRANSITIONS['from>to'] = () => Promise
     main    > story-1 : 책 열기 (CURO_BOOK.open)
     story-1 > main    : 책 닫기 (CURO_BOOK.close)
     story-1 > (다음)  : 아직 없음 → 다음 STORY 페이지를 만들 때 여기에 추가
   ========================================================================== */
(function () {
  'use strict';

  const PG = window.CURO_CONFIG.pages;
  const order = PG.order;
  let index = 0;                  // 현재 페이지
  let busy = false;
  let coolUntil = 0;

  const TRANSITIONS = {
    'main>story-1': () => window.CURO_BOOK.open('nav'),
    'story-1>main': () => window.CURO_BOOK.close('nav'),
    // 119차: Main9 ⇄ Main10 = 책 닫기/열기 (뒤표지, js/main10.js). Main10 이 없는 페이지(Index·Index2)에서는 정의 안 됨
    'story-9>main10': document.getElementById('m10') ? () => window.CURO_BOOK10.close('nav') : null,
    'main10>story-9': document.getElementById('m10') ? () => window.CURO_BOOK10.open('nav') : null
    // STORY 장면끼리(story-1 > story-5 …)는 아래 go() 에서 가로 track 이동으로 처리 (js/story.js)
  };

  function menuOpen() { return !!(window.CURO_MENU && window.CURO_MENU.isOpen()); }

  async function go(delta, source) {
    if (busy || menuOpen() || performance.now() < coolUntil) return false;
    const from = order[index];
    // 119차: 페이지 안에서 먼저 움직일 곳이 있으면(Main10 의 첫 화면 → 둘째 화면 → 푸터) 그쪽이 입력을 씀
    const inner = window.CURO_SUBSCROLL && window.CURO_SUBSCROLL[from];
    if (inner && inner(delta)) { coolUntil = performance.now() + PG.cooldownMs; return true; }
    const to = order[index + delta];
    if (!to) return false;                                  // 더 갈 페이지 없음
    // STORY 장면끼리는 가로 track 이동 (story.js). 따로 정의한 전환이 있으면 그것이 우선
    const story = window.CURO_STORY;
    const fn = TRANSITIONS[`${from}>${to}`] ||
      (story && story.has(from) && story.has(to) ? () => story.go(from, to) : null);
    if (!fn) return false;                                  // 전환이 아직 정의되지 않음
    busy = true;
    // 이동 시작 알림 → 떠나는 장면의 텍스트가 바로 fade-out (story-text.js)
    window.dispatchEvent(new CustomEvent('curo:leave', { detail: { from, to } }));
    const ok = await fn(source);                          // index 는 전환 완료 이벤트(curo:page)에서 갱신
    busy = false;
    coolUntil = performance.now() + PG.cooldownMs;
    return ok;
  }

  /* 책 클릭으로 열린 경우도 페이지 위치를 맞춘다 */
  window.addEventListener('curo:page', (e) => {
    const i = order.indexOf(e.detail.page);
    if (i >= 0) index = i;
    coolUntil = performance.now() + PG.cooldownMs;
  });

  /* ---------- wheel ---------- */
  let sum = 0, ts = 0;
  window.addEventListener('wheel', (e) => {
    if (window.CURO_MOBILE_MAIN) return;                    // 203차: 폰 메인은 js/main-mobile.js 가 따로
    if (menuOpen()) return;                                 // 메뉴가 열려 있으면 main.js 가 막는다
    e.preventDefault();                                     // 페이지 자체 scroll 은 쓰지 않는다
    if (busy || (window.CURO_BOOK && window.CURO_BOOK.isBusy()) || (window.CURO_BOOK10 && window.CURO_BOOK10.isBusy()) || (window.CURO_STORY && window.CURO_STORY.isBusy()) || performance.now() < coolUntil) { sum = 0; return; }
    const now = performance.now();
    if (now - ts > PG.wheelWindowMs || Math.sign(e.deltaY) !== Math.sign(sum)) sum = 0;
    ts = now;
    sum += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    if (sum >= PG.wheelThreshold) { sum = 0; go(+1, 'wheel'); }
    else if (sum <= -PG.wheelThreshold) { sum = 0; go(-1, 'wheel'); }
  }, { passive: false });

  /* ---------- keys ---------- */
  document.addEventListener('keydown', (e) => {
    if (window.CURO_MOBILE_MAIN || menuOpen()) return;
    if (e.target && e.target.closest && e.target.closest('.menu-panel, .hamburger, .book-position, input, textarea')) return;
    if (PG.keysNext.includes(e.key)) { e.preventDefault(); go(+1, 'key'); }
    else if (PG.keysPrev.includes(e.key)) { e.preventDefault(); go(-1, 'key'); }
  });

  /* ---------- touch ---------- */
  let ty = null;
  window.addEventListener('touchstart', (e) => { ty = window.CURO_MOBILE_MAIN ? null : e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (ty == null) return;
    const d = ty - e.touches[0].clientY;
    if (d > PG.touchThreshold) { ty = null; go(+1, 'swipe'); }
    else if (d < -PG.touchThreshold) { ty = null; go(-1, 'swipe'); }
  }, { passive: true });

  window.CURO_PAGES = {
    next: () => go(+1, 'api'),
    prev: () => go(-1, 'api'),
    current: () => order[index],
    isBusy: () => busy
  };
})();
