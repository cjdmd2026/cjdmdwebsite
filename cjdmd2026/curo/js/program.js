/* ==========================================================================
   PROGRAM (51차) — program.html 전용
   - 탭: sticky 상태일 때만 반투명 + blur (.is-stuck), 클릭 → 해당 섹션으로 이동, 스크롤에 따라 선택 탭 갱신
     (내용이 비어 있는 섹션의 탭은 이동하지 않음 — 섹션에 내용을 넣으면 자동으로 동작)
   - 렌탈 기간 선택 (radio)
   - '체험/상담 신청' → 공통 상담 패널 열기 (js/float.js)
   - 좁은 화면: 상단 구매 영역이 화면 위로 지나가면 하단 CTA 바 표시 + floating 버튼을 그 위로
   STORY / KIT 와는 독립 (이 파일은 program.html 에서만 로드)
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const tabs = document.getElementById('pg-tabs');
  const links = tabs ? Array.from(tabs.querySelectorAll('a[href^="#"]')) : [];
  const sentinel = document.querySelector('.pg-tabs-sentinel');
  const buy = document.getElementById('pg-buy');
  const mcta = document.getElementById('pg-mcta');
  const mobileMQ = window.matchMedia('(max-width: 1199px)');
  const phoneMQ = window.matchMedia('(max-width: 600px)');   // 179차: 폰 = 아래 바 항상 보임

  // 탭이 붙는 위치(top) + 탭 높이 — 위에 고정 메뉴가 있으면 top 이 그만큼 내려감
  const stickTop = () => (tabs ? parseFloat(getComputedStyle(tabs).top) || 0 : 0);
  const tabH = () => (tabs ? stickTop() + tabs.getBoundingClientRect().height : 0);
  const secOf = (a) => document.getElementById(a.getAttribute('href').slice(1));
  const hasContent = (sec) => !!(sec && sec.children.length);

  // 비어 있는 섹션의 탭 표시
  links.forEach((a) => { if (!hasContent(secOf(a))) a.setAttribute('aria-disabled', 'true'); });

  /* ---------- 탭 sticky 상태 (스크롤 때 확인 — 큰 점프에도 정확하도록 IntersectionObserver 대신) ---------- */
  function stuck() {
    if (tabs && sentinel) tabs.classList.toggle('is-stuck', sentinel.getBoundingClientRect().top < stickTop());
  }

  /* ---------- 탭 (126차): 섹션이 이어져 있지 않고 탭마다 따로 — 누른 탭의 섹션만 보이고 나머지는 숨김 ----------
     탭이 이미 화면 위에 붙어 있으면(내려온 상태) 탭 바로 아래(섹션 맨 위)로 올려서 새 내용이 처음부터 보이게 */
  /* 127차: 선택 line = 하나의 막대가 누른 탭으로 좌우 이동 */
  const ul = tabs ? tabs.querySelector('ul') : null;
  const bar = ul ? ul.appendChild(Object.assign(document.createElement('span'), { className: 'pg-tabs-bar is-instant' })) : null;
  if (bar) bar.setAttribute('aria-hidden', 'true');
  function moveBar(instant) {
    const a = links.find((l) => l.classList.contains('is-active'));
    if (!bar || !a) return;
    if (instant) bar.classList.add('is-instant');
    const u = ul.getBoundingClientRect(), r = a.getBoundingClientRect();
    bar.style.width = r.width + 'px';
    bar.style.setProperty('--pg-bar-x', (r.left - u.left) + 'px');
    if (instant) { void bar.offsetWidth; bar.classList.remove('is-instant'); }
  }
  window.addEventListener('resize', () => moveBar(true));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveBar(true));
  function setActive(a, instant) {
    links.forEach((l) => {
      const on = l === a;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      const sec = secOf(l);
      if (sec) sec.hidden = !on;
    });
    moveBar(instant);
  }
  links.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (!hasContent(secOf(a)) || a.classList.contains('is-active')) return;
    setActive(a);
    const top = (sentinel ? sentinel.getBoundingClientRect().top + window.scrollY : 0) - stickTop();
    if (window.scrollY > top) window.scrollTo(0, Math.max(0, top));
    if (window.CURO_FLOAT && window.CURO_FLOAT.layout) window.CURO_FLOAT.layout();
  }));
  setActive(links.find((l) => l.classList.contains('is-active')) || links[0], true);

  function mobileCta() {
    if (!mcta || !buy) return;
    const on = phoneMQ.matches || (mobileMQ.matches && buy.getBoundingClientRect().bottom < 0);
    if (on === root.classList.contains('pg-mcta-on')) return;
    root.classList.toggle('pg-mcta-on', on);
    mcta.setAttribute('aria-hidden', on ? 'false' : 'true');
    mcta.querySelectorAll('a').forEach((x) => (on ? x.removeAttribute('tabindex') : x.setAttribute('tabindex', '-1')));
    if (window.CURO_FLOAT) window.CURO_FLOAT.layout();
  }
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      root.classList.toggle('float-top-on', window.scrollY > window.innerHeight * 0.6);
      stuck();
      mobileCta();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (mobileMQ.addEventListener) mobileMQ.addEventListener('change', onScroll);

  /* ---------- 렌탈 기간 선택 (124차: 기간·가격 바뀜) ----------
     가격 = BASE(30일) × 일수/30 × (1 − 할인%). 할인이 있으면 원래 가격을 회색 취소선으로 왼쪽에 작게 */
  const BASE = 150000;
  const won = (n) => n.toLocaleString('ko-KR') + '원';
  const priceEl = document.getElementById('pg-price'), origEl = document.getElementById('pg-orig'), mPrice = document.getElementById('pg-mcta-price');
  const opts = Array.from(document.querySelectorAll('.pg-opt'));
  function pick(b) {
    opts.forEach((o) => {
      const on = o === b;
      o.classList.toggle('is-selected', on);
      o.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    const days = +b.dataset.days || 30, off = +b.dataset.off || 0;
    const orig = BASE * days / 30, price = Math.round(orig * (1 - off / 100));
    if (priceEl) priceEl.textContent = won(price);
    if (origEl) { origEl.hidden = !off; origEl.textContent = off ? won(orig) : ''; }
    if (mPrice) mPrice.textContent = `${days}일 ${won(price)}`;
  }
  opts.forEach((b) => b.addEventListener('click', () => pick(b)));
  const first = opts.find((o) => o.classList.contains('is-selected')) || opts[0];
  if (first) pick(first);

  /* ---------- 커리큘럼 상세 (125차): 단계 4칸 → 아래 사진·글 바뀜 ----------
     사진 = assets/images/program/curriculum/stepN-*.webp (사용자 '상세 페이지' 폴더, 파일 이름은 사진 내용 기준으로 정리)
     칸 아이콘 = 사용자 아이콘 (158차) */
  // 158차: 사용자 아이콘 (웹/상세 페이지 Frame 1000006605~08.svg → Icon/Curriculum*.svg). 색 바뀌도록 fill = currentColor 로 inline
  const STEP_ICON = {
    book: '<g clip-path="url(#pgic-book)"><path d="M40.486 12C32.0141 12 27.0471 13.3916 25.5049 13.9134C23.9627 13.4018 18.9857 12 10.5138 12C9.68266 12 9.01172 12.747 9.01172 13.6576V33.8253C9.01172 34.2755 9.18196 34.7155 9.47237 35.0327C9.77279 35.3396 10.1633 35.5136 10.5839 35.4829C10.664 35.4829 18.7654 35.1248 24.9341 37.8772C24.9642 37.8874 24.9942 37.8977 25.0343 37.9079C25.1845 37.9591 25.3347 38 25.4949 38C25.6551 38 25.8154 37.9693 25.9756 37.9079C26.0056 37.8977 26.0357 37.8874 26.0657 37.8772C32.2143 35.1248 40.3358 35.4829 40.4159 35.4829C40.8265 35.5136 41.227 35.3396 41.5275 35.0327C41.8179 34.7155 41.9881 34.2755 41.9881 33.8253V13.6576C41.9881 12.7367 41.3172 12 40.486 12ZM12.0159 15.3357C18.2547 15.4687 22.2604 16.3998 23.9928 16.9115V33.9992C19.3963 32.4337 14.4694 32.1677 12.0159 32.1574V15.3357ZM38.9839 32.1472C36.5304 32.1574 31.6035 32.4235 26.997 33.989V16.9115C28.7395 16.3998 32.7451 15.4687 38.9839 15.3357V32.1574V32.1472Z" fill="currentColor"/></g><defs><clipPath id="pgic-book"><rect width="33" height="26" fill="currentColor" transform="translate(9 12)"/></clipPath></defs>',
    bear: '<path d="M36.3084 28.1561C35.6168 26.9561 34.3965 25.9392 33.1456 25.2578C34.6202 23.6205 35.5151 21.5358 35.5151 19.2781C35.5151 18.8002 35.4745 18.312 35.3829 17.8239C36.705 15.79 36.3999 12.7798 34.5694 10.8476C33.5423 9.76961 32.1592 9.11876 30.6744 9.02724C29.3931 8.95605 28.1829 9.30182 27.2778 9.96284C25.549 9.58656 23.7388 9.58656 22.0405 9.96284C21.0947 9.29165 19.8846 8.94588 18.593 9.0069C17.0574 9.08826 15.6439 9.72894 14.6167 10.8069C12.7862 12.7188 12.5523 15.7595 13.9354 17.8341C13.854 18.312 13.8133 18.8002 13.8133 19.2781C13.8133 21.5358 14.7083 23.6205 16.1829 25.2578C14.9218 25.9392 13.7117 26.9561 13.01 28.1561C12.0438 29.8341 11.7591 31.7765 12.2066 33.4646C12.5727 34.807 13.3964 35.9053 14.5252 36.5562C14.7286 36.6782 14.9523 36.7392 15.1761 36.7494C16.0506 39.0376 17.9727 40.5427 19.9252 40.5427C20.271 40.5427 20.6269 40.4918 20.9727 40.3901C21.5015 40.2274 21.9693 39.963 22.3659 39.6071C23.0066 39.6782 23.8812 39.7494 24.8676 39.7494C25.5388 39.7494 26.2507 39.7087 26.9626 39.6172C27.3592 39.963 27.827 40.2376 28.3456 40.3901C28.6914 40.4918 29.0473 40.5427 29.4033 40.5427C31.3456 40.5427 33.2677 39.0376 34.1423 36.7494C34.366 36.7392 34.5897 36.6782 34.7931 36.5562C35.9219 35.9053 36.7457 34.807 37.1118 33.4646C37.5694 31.7765 37.2745 29.8341 36.3084 28.1561ZM16.8337 12.9018C17.3015 12.4035 18.0032 12.0984 18.7456 12.0578H18.8981C19.5083 12.0578 20.0676 12.2408 20.4134 12.5662C20.7998 13.0747 21.4608 13.2883 22.071 13.1052C23.7185 12.6069 25.5592 12.6069 27.2575 13.1052C27.8168 13.2679 28.5185 13.0137 28.9049 12.5662C29.271 12.2205 29.8711 12.0374 30.4914 12.0781C31.2033 12.1188 31.8643 12.434 32.3524 12.9425C33.3592 14.0103 33.3389 15.6781 32.6473 16.4002C32.2812 16.7764 32.1389 17.3256 32.2711 17.8442C32.4033 18.3222 32.4643 18.8002 32.4643 19.2781C32.4643 22.8883 28.966 25.8273 24.6642 25.8273C20.3625 25.8273 16.8642 22.8883 16.8642 19.2781C16.8642 18.8002 16.9252 18.312 17.0473 17.8442C17.1896 17.3256 17.0473 16.7764 16.6812 16.39C15.9388 15.6273 15.8473 13.9391 16.8337 12.9018ZM20.7388 36.7291C20.6676 36.9121 20.4541 37.3596 20.0981 37.4613C20.0473 37.4816 19.9863 37.4918 19.9252 37.4918C19.3659 37.4918 18.349 36.8104 17.9218 35.346C17.4642 33.8206 18.0134 32.5494 18.5829 32.3765C18.6439 32.3562 18.7049 32.3562 18.7659 32.3562C19.3151 32.3562 20.332 33.0375 20.7693 34.4918C21.0032 35.285 20.993 36.0986 20.7388 36.7291ZM31.4067 35.346C30.9694 36.8104 29.9524 37.4918 29.4033 37.4918C29.3321 37.4918 29.2812 37.4816 29.2202 37.4613C28.6507 37.2884 28.0914 36.0274 28.549 34.4918C28.9863 33.0375 30.0033 32.3562 30.5524 32.3562C30.6134 32.3562 30.6744 32.3562 30.7355 32.3765C31.0914 32.4782 31.305 32.9257 31.3761 33.1087C31.6304 33.7392 31.6406 34.5528 31.4067 35.346ZM31.61 29.4578C31.2643 29.346 30.9083 29.3053 30.5524 29.3053C28.4677 29.3053 26.3931 31.0443 25.6304 33.6274C25.3151 34.6748 25.2541 35.7325 25.427 36.6884C24.888 36.7087 24.3592 36.6884 23.8914 36.6681C24.0642 35.7121 24.0032 34.6748 23.688 33.6274C22.9253 31.0443 20.8507 29.3053 18.7659 29.3053C18.41 29.3053 18.0642 29.346 17.7083 29.4578C16.4676 29.824 15.5422 30.8206 15.0642 32.1121C15.0032 31.329 15.2167 30.4545 15.654 29.6816C16.2642 28.6239 17.9117 27.6172 18.949 27.4341C20.6066 28.3494 22.5592 28.8782 24.6642 28.8782C26.7693 28.8782 28.7219 28.3494 30.3795 27.4341C31.4067 27.6172 33.0541 28.6239 33.6643 29.6816C34.1117 30.4545 34.3151 31.329 34.2541 32.1121C33.7762 30.8206 32.8507 29.824 31.61 29.4578Z" fill="currentColor"/><path d="M20.9114 20.2213C21.445 20.2213 21.8775 19.7887 21.8775 19.2552C21.8775 18.7216 21.445 18.2891 20.9114 18.2891C20.3779 18.2891 19.9453 18.7216 19.9453 19.2552C19.9453 19.7887 20.3779 20.2213 20.9114 20.2213Z" fill="currentColor"/><path d="M28.4153 20.2213C28.9489 20.2213 29.3814 19.7887 29.3814 19.2552C29.3814 18.7216 28.9489 18.2891 28.4153 18.2891C27.8818 18.2891 27.4492 18.7216 27.4492 19.2552C27.4492 19.7887 27.8818 20.2213 28.4153 20.2213Z" fill="currentColor"/><path d="M24.6635 24.8275C22.8839 24.8275 21.4805 23.6173 21.4805 22.0817C21.4805 20.5461 22.8839 19.3359 24.6635 19.3359C26.4432 19.3359 27.8466 20.5461 27.8466 22.0817C27.8466 23.6173 26.4432 24.8275 24.6635 24.8275Z" fill="currentColor"/>',
    belt: '<path d="M40.5146 17.2427H37.3051C35.479 15.2506 32.8561 14 29.9343 14H20.162C17.2403 14 14.6174 15.2506 12.7913 17.2427H9.58181C7.05849 17.2427 5 19.3233 5 21.8688V28.8521C5 31.3976 7.05849 33.4782 9.58181 33.4782H12.7913C14.6174 35.4703 17.2403 36.7098 20.162 36.7098H29.9343C32.8561 36.7098 35.479 35.4703 37.3051 33.4782H40.5146C43.0379 33.4782 45.0964 31.3976 45.0964 28.8521V21.8688C45.0964 19.3233 43.0379 17.2427 40.5146 17.2427ZM10.7439 30.1581H9.58181C8.88458 30.1581 8.32015 29.5715 8.32015 28.8521V21.8688C8.32015 21.1494 8.88458 20.5628 9.58181 20.5628H10.7439C10.3454 21.6474 10.1241 22.8205 10.1241 24.049V26.6719C10.1241 27.9004 10.3454 29.0735 10.7439 30.1581ZM29.9343 33.3897H20.162C16.4545 33.3897 13.4443 30.3794 13.4443 26.6719V24.049C13.4443 20.3415 16.4545 17.3202 20.162 17.3202H29.9343C33.6418 17.3202 36.6521 20.3415 36.6521 24.049V26.6719C36.6521 30.3794 33.6418 33.3897 29.9343 33.3897ZM41.7762 28.8521C41.7762 29.5715 41.2118 30.1581 40.5146 30.1581H39.3525C39.7509 29.0735 39.9723 27.9004 39.9723 26.6719V24.049C39.9723 22.8205 39.7509 21.6474 39.3525 20.5628H40.5146C41.2118 20.5628 41.7762 21.1494 41.7762 21.8688V28.8521Z" fill="currentColor"/><path d="M25.0434 23.9283C25.8292 23.9283 26.4711 24.5702 26.4711 25.3559C26.4711 26.1417 25.8292 26.7836 25.0434 26.7836C24.2577 26.7836 23.6158 26.1417 23.6158 25.3559C23.6158 24.5702 24.2577 23.9283 25.0434 23.9283ZM25.0434 21.7148C23.0292 21.7148 21.4023 23.3417 21.4023 25.3559C21.4023 27.3702 23.0292 28.997 25.0434 28.997C27.0577 28.997 28.6845 27.3702 28.6845 25.3559C28.6845 23.3417 27.0577 21.7148 25.0434 21.7148Z" fill="currentColor"/>',
    pen: '<path d="M39.544 16.2339L33.6307 10.4231C33.0344 9.85085 32.1003 9.86072 31.5139 10.4428C30.9375 11.0249 30.9474 11.9621 31.5338 12.5343L33.432 14.389L30.202 17.6348L25.3124 12.8401C24.7261 12.2679 23.7819 12.2679 23.2055 12.85C22.6192 13.4321 22.6291 14.3693 23.2154 14.9415L24.3186 16.0168L14.0126 26.3066C11.7368 28.5954 11.7566 32.2753 14.0524 34.5345L10.2858 38.3229C9.89818 38.7076 9.90812 39.3291 10.2957 39.7139C10.4845 39.9112 10.7429 40 10.9914 40C11.2398 40 11.5082 39.9013 11.697 39.704L15.4636 35.9255C16.6065 37.0403 18.0972 37.6027 19.588 37.6027C21.0787 37.6027 22.6192 37.0206 23.7621 35.8762L34.0382 25.5568L35.1215 26.6223C35.4097 26.9084 35.7873 27.0465 36.165 27.0465C36.5427 27.0465 36.9302 26.8985 37.2284 26.6124C37.8048 26.0304 37.7949 25.0931 37.2284 24.5209L32.3388 19.7164L35.5588 16.4805L37.457 18.3352C37.7551 18.6213 38.1328 18.7693 38.5104 18.7693C38.8881 18.7693 39.2757 18.6213 39.5738 18.3254C40.1502 17.7433 40.1403 16.8061 39.5539 16.2339H39.544ZM21.6452 33.7946C20.5222 34.9192 18.6935 34.9291 17.5606 33.8143L16.1593 32.443C15.0263 31.3282 15.0064 29.5129 16.1295 28.3882L17.8587 26.6618L19.5383 28.3093C19.7271 28.4968 19.9756 28.5855 20.234 28.5855C20.4924 28.5855 20.7408 28.4968 20.9396 28.2994C21.3272 27.9048 21.3172 27.2833 20.9296 26.8985L19.26 25.2609L21.9831 22.5478L23.6428 24.1756C23.8416 24.3631 24.09 24.4617 24.3385 24.4617C24.5869 24.4617 24.8553 24.3631 25.054 24.1658C25.4317 23.781 25.4317 23.1595 25.054 22.7747L23.3943 21.1469L26.4454 18.0985L31.9214 23.4752L21.6551 33.7946H21.6452Z" fill="currentColor"/>'
  };
  const CURRICULUM = [
    { n: 1, name: '친숙화', day: 'DAY 01–05', icon: 'book', img: 'step1-familiar',
      one: '동화와 캐릭터를 통해 주사에 친숙해지는 단계',
      body: ['동화 속 캐릭터와 이야기를 통해 주사를 자연스럽게 알아가요.', '인형과 친해지고 주사 도구를 살펴보며, 주사에 대한 낯설음과 두려움을 조금씩 줄여나가요.'] },
    { n: 2, name: '간접 연습', day: 'DAY 06–15', icon: 'bear', img: 'step2-indirect',
      one: '인형과 콘텐츠를 활용해 주사 절차를 익히는 단계',
      body: ['아이가 인형을 대상으로 주사 연습을 하며, 주사의 순서와 방법을 자연스럽게 익혀요.', '반복적인 연습을 통해 주사에 대한 두려움을 줄이고 다음 단계로 나아갈 수 있는 자신감을 만들어가요.'] },
    { n: 3, name: '전이', day: 'DAY 16–25', icon: 'belt', img: 'step3-transfer',
      one: '연습 벨트를 활용해 주사 동작을 몸에 익히는 단계',
      body: ['인형을 대상으로 익힌 주사 동작을 연습 벨트를 활용해 자신의 몸에 적용해요.', '주사 위치와 90° 각도, 10초 유지 동작을 반복하며 실제 자가주사를 차근차근 준비해요.'] },
    { n: 4, name: '자가 수행', day: 'DAY 26–30', icon: 'pen', img: 'step4-self',
      one: '배운 내용을 바탕으로 스스로 주사에 도전하는 단계',
      body: ['앞선 단계에서 익힌 주사 순서와 동작을 바탕으로 스스로 주사에 도전해요.', '보호자와 의료진의 지도 아래 안전하게 수행하고, 작은 성취를 쌓으며 자신감을 키워나가요.'] }
  ];
  const stepsEl = document.getElementById('pg-steps');
  if (stepsEl) {
    const $s = (id) => document.getElementById(id);
    stepsEl.innerHTML = CURRICULUM.map((c, i) => `<button type="button" class="pg-step" role="tab" aria-selected="false" data-i="${i}">
        <span class="pg-step-ic"><svg viewBox="0 0 50 50" aria-hidden="true">${STEP_ICON[c.icon]}</svg></span>
        <span class="pg-step-t"><small>${c.n}단계</small><b>${c.name} 단계</b><em>${c.day}</em></span></button>`).join('');
    CURRICULUM.forEach((c) => { const im = new Image(); im.src = `assets/images/program/curriculum/${c.img}.webp?v=125`; });   // 미리 받아 둠 (바꿀 때 깜빡임 없게)
    const showStep = (i) => {
      const c = CURRICULUM[i];
      stepsEl.querySelectorAll('.pg-step').forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
      $s('pg-step-ph').src = `assets/images/program/curriculum/${c.img}.webp?v=125`;
      $s('pg-step-ph').alt = `${c.n}단계 ${c.name}`;
      $s('pg-step-eye').textContent = `STEP ${String(c.n).padStart(2, '0')} · ${c.day.replace('–', ' – ')}`;
      $s('pg-step-ttl').textContent = c.name;
      $s('pg-step-one').textContent = c.one;
      $s('pg-step-body').innerHTML = c.body.map((t) => `<span>${t}</span>`).join('');
    };
    stepsEl.addEventListener('click', (e) => { const b = e.target.closest('.pg-step'); if (b) showStep(+b.dataset.i); });
    showStep(0);   // 157차: 처음엔 1단계(친숙화)
  }

  /* ---------- 반납 및 유의사항: 하나를 펼치면 나머지는 접힘 ---------- */
  // 162차: FAQ 는 여러 개 동시에 열림 (하나 열면 다른 것이 닫히던 동작 없앰)
  // 165차: FAQ 답이 스르륵 열리고 닫힘 (높이 애니메이션, 화살표는 누르는 순간 회전)
  const faqReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.pg-faq details').forEach((d) => {
    const sum = d.querySelector('summary'), ans = d.querySelector('p');
    if (!sum || !ans) return;
    if (d.open) d.classList.add('is-open');
    let anim = null;
    sum.addEventListener('click', (e) => {
      e.preventDefault();
      if (faqReduce) { d.open = !d.open; d.classList.toggle('is-open', d.open); return; }
      const opening = !d.classList.contains('is-open');
      const from = anim ? ans.getBoundingClientRect().height : (opening ? 0 : ans.offsetHeight);
      if (anim) anim.cancel();
      d.classList.toggle('is-open', opening);
      if (opening) d.open = true;
      const to = opening ? ans.scrollHeight : 0;
      ans.style.overflow = 'hidden';
      anim = ans.animate([{ height: from + 'px', opacity: opening ? 0 : 1 }, { height: to + 'px', opacity: opening ? 1 : 0 }],
        { duration: 340, easing: 'cubic-bezier(0.25, 0.8, 0.3, 1)' });
      anim.onfinish = () => { anim = null; ans.style.overflow = ''; if (!opening) d.open = false; };
    });
  });

  /* ---------- 공유 버튼: 기기 공유 창(navigator.share), 없으면 링크 복사 ---------- */
  const shares = document.querySelectorAll('.pg-share');   // 179차: 카드 + 폰 아래 바
  const shareMsg = document.querySelector('.pg-share-msg');
  let msgT = 0;
  function toast(t) {
    if (!shareMsg) return;
    shareMsg.textContent = t; shareMsg.classList.add('is-on');
    clearTimeout(msgT); msgT = setTimeout(() => shareMsg.classList.remove('is-on'), 1600);
  }
  shares.forEach((share) => share.addEventListener('click', async () => {
    const data = { title: document.title, text: 'CURO 렌탈 서비스 — 첫 자가주사 연습을 함께해요', url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href); toast('링크가 복사되었어요');
    } catch (err) {
      if (err && err.name === 'AbortError') return;                 // 공유 창을 닫은 경우
      try { await navigator.clipboard.writeText(location.href); toast('링크가 복사되었어요'); } catch (e) { toast('링크 복사를 할 수 없어요'); }
    }
  }));

  /* ---------- 179차: 폰 — 상세 이미지 접기/펼치기 ---------- */
  const more = document.getElementById('pg-more'), longImg = document.querySelector('.pg-longimg');
  if (more && longImg) more.addEventListener('click', () => {
    const open = !longImg.classList.contains('is-open');
    longImg.classList.toggle('is-open', open);
    more.setAttribute('aria-expanded', String(open));
    more.firstChild.textContent = open ? '상품 설명 접기' : '상품 설명 펼쳐보기';
    if (!open) { const top = longImg.getBoundingClientRect().top + window.scrollY - tabH() - 8; if (window.scrollY > top) window.scrollTo(0, top); }
  });

  /* ---------- '체험/상담 신청' → 상담 패널 ---------- */
  document.querySelectorAll('[data-action="consult"]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.CURO_FLOAT) window.CURO_FLOAT.setChat(true);
  }));

  /* ---------- 크기 대응: 햄버거와 탭 겹침 방지 · 낮은 화면에서 카드 ---------- */
  const card = document.getElementById('pg-card');
  function fit() {
    // 공통 햄버거 버튼(우상단 fixed)이 탭 바 위에 오면 그만큼 탭 오른쪽을 비움
    const hb = document.querySelector('.hamburger');
    if (tabs && hb) {
      const t = tabs.getBoundingClientRect(), h = hb.getBoundingClientRect();
      const over = h.left < t.right && h.right > t.left && h.top < t.bottom && h.bottom > t.top ? t.right - h.left + 8 : 0;
      tabs.style.setProperty('--pg-tabs-pr', over + 'px');
    }
    // 카드가 (탭 아래) 화면 높이에 다 들어오지 않으면: 상세 정보 상자를 접고, 그래도 안 되면 sticky 해제
    if (card) {
      card.classList.remove('is-compact', 'is-static');
      if (getComputedStyle(card).display !== 'none') {
        const room = window.innerHeight - tabH() - 24 - 16;
        if (card.offsetHeight > room) card.classList.add('is-compact');
        if (card.offsetHeight > room) card.classList.add('is-static');
      }
    }
  }
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();

  onScroll();
  window.CURO_PROGRAM_API = { setActive };
})();
