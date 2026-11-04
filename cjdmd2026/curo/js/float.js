/* ==========================================================================
   floating UI (공통) — 우측 하단 '동화 보러가기'(77차, 예전 '위로 가기' 자리) + '상담' 버튼 + 상담 패널
   50차 kit.js 에서 만든 동작을 51차에 공통 파일로 분리 (hover/클릭/그림자 동작은 그대로).
   마크업 = .k-float / .k-chat (kit.html · program.html), 스타일 = css/float.css
   페이지 스크립트와의 연결:
     window.CURO_FLOAT.onTop  = () => {...}   '위로 가기' 동작 (기본: 맨 위로 부드럽게 스크롤)
     html.float-top-on                          '위로 가기' 버튼 표시 (페이지 스크립트가 켬)
     --float-lift (CSS 변수)                    floating 전체를 위로 올림 (모바일 하단 CTA 바 등)
   ========================================================================== */
(function () {
  'use strict';

  // ---- 아이콘 파일 (사용자 export) — 경로만 바꾸면 모든 페이지에 반영 ----
  const CFG = {
    icons: {
      book: 'assets/icons/book.svg',            // 77차: '동화 보러가기' (STORY 로 이동)
      consult: 'assets/icons/consultation.svg'       // 상담 버튼 · 상담 패널 머리 · 안내 메시지 아이콘
    },
    minScale: 0.8,                           // floating UI 배율 = clamp(minScale, vw/1920, 1)
    edge: 16                                 // 화면 가장자리 최소 여백 (px)
  };

  const root = document.documentElement;
  const px = (v) => v + 'px';
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  document.querySelectorAll('img[data-icon]').forEach((im) => {
    const src = CFG.icons[im.dataset.icon];
    if (src) { im.src = encodeURI(src); im.decoding = 'async'; im.draggable = false; }
  });

  const floatEl = document.getElementById('k-float');
  const consult = document.querySelector('.k-consult');
  const chat = document.getElementById('k-chat');
  const chatClose = chat && chat.querySelector('.k-chat-close');
  if (!floatEl) return;

  // 배율 + 상담 패널 크기 (작은 화면에서 잘리지 않게)
  function layout() {
    const vw = document.documentElement.clientWidth, vh = window.innerHeight, edge = CFG.edge;
    const lift = parseFloat(getComputedStyle(root).getPropertyValue('--float-lift')) || 0;
    const f = clamp(vw / 1920, CFG.minScale, 1);
    let r = 45 * f, b = 40 * f;
    if (872 * f + b + lift + edge > vh) b = Math.min(b, edge);
    // 위쪽 한계 = 공통 햄버거 버튼 / 상단 메뉴(site-nav) 아래 (패널이 메뉴와 겹치지 않게)
    let topLimit = edge;
    document.querySelectorAll('.hamburger, .site-nav').forEach((el) => {
      const rc = el.getBoundingClientRect();
      if (rc.height > 0) topLimit = Math.max(topLimit, rc.bottom + edge);
    });
    // 268차: 패널은 시안 비율(484 × 872) 그대로 — 화면 높이가 모자라면 아래를 잘라 가로로 길어지던 것 대신 패널 전체를 줄임
    //   (글자가 너무 작아지지 않게 최소 0.7배, 그보다 낮은 화면에서만 높이를 줄임)
    const availH = vh - b - lift - topLimit;
    const fc = Math.max(0.7, Math.min(f, availH / 872));
    let w = 484;
    if (484 * fc + r + edge > vw) { r = edge; w = (vw - 2 * edge) / fc; }
    const h = Math.min(872, availH / fc);
    root.style.setProperty('--kfu', f.toFixed(4));
    root.style.setProperty('--kfc', fc.toFixed(4));
    root.style.setProperty('--kchat-r', px(r.toFixed(1)));
    root.style.setProperty('--kchat-b', px(b.toFixed(1)));
    root.style.setProperty('--kchat-w', px(w.toFixed(1)));
    root.style.setProperty('--kchat-h', px(Math.max(200, h).toFixed(1)));
  }
  window.addEventListener('resize', layout);

  const API = {
    onTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    setChat: (on) => setChat(!!on),
    isChatOpen: () => chatOpen,
    layout
  };
  window.CURO_FLOAT = API;


  // hover 확장: 마우스일 때만 (터치는 탭 = 바로 패널 열기)
  const hoverable = window.matchMedia('(hover: hover)');
  let chatOpen = false;
  // 77차: 같은 hover 확장을 floating 버튼 전부(.k-fab = 동화 보러가기 + 상담)에 적용
  const fabs = Array.from(document.querySelectorAll('.k-fab'));
  function expandEl(el, on) { el.classList.toggle('is-expanded', !!on && !chatOpen); }
  function expand(on) { if (consult) expandEl(consult, on); }
  fabs.forEach((el) => {
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && hoverable.matches) expandEl(el, true); });
    el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') expandEl(el, false); });
    el.addEventListener('focus', () => { if (el.matches(':focus-visible')) expandEl(el, true); });
    el.addEventListener('blur', () => expandEl(el, false));
  });
  if (consult) consult.addEventListener('click', () => setChat(true));
  function setChat(on) {
    if (!chat || chatOpen === on) return;
    chatOpen = on;
    expand(false);
    chat.classList.toggle('is-open', on);
    chat.setAttribute('aria-hidden', on ? 'false' : 'true');
    floatEl.classList.toggle('is-chat-open', on);
    if (consult) consult.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) { if (chatClose) chatClose.focus({ preventScroll: true }); }
    else if (document.activeElement && chat.contains(document.activeElement) && consult) consult.focus({ preventScroll: true });
  }
  if (chatClose) chatClose.addEventListener('click', () => setChat(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && chatOpen) setChat(false); });

  // 상담 패널 안 wheel 은 페이지로 넘기지 않음 (패널 본문이 스크롤될 때만 본문 스크롤)
  if (chat) chat.addEventListener('wheel', (e) => {
    const body = e.target.closest && e.target.closest('.k-chat-body');
    const dy = e.deltaY;
    const can = body && (dy > 0 ? body.scrollTop + body.clientHeight < body.scrollHeight - 1 : body.scrollTop > 0);
    if (!can) e.preventDefault();
  }, { passive: false });

  layout();
})();
