/* ==========================================================================
   203차: 메인 폰 화면 (#mm) — css/main-mobile.css
   첫 화면(책 표지) → 누르면 이야기 8장 (옆으로 넘기기). 글은 PC .story-text 를 복사해 씀 (한 곳만 고치면 둘 다 바뀜)
   ========================================================================== */
(function () {
  'use strict';
  const mq = window.matchMedia('(max-width: 600px)');
  // PC ↔ 폰 경계를 넘으면 (창 크기 · F12 기기 모드) 같은 주소로 다시 그림
  let was = mq.matches, rt = 0;
  const onMq = () => { clearTimeout(rt); rt = setTimeout(() => { if (mq.matches !== was) location.reload(); }, 150); };
  if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
  if (!mq.matches) return;                 // PC 는 그대로 (경계를 넘으면 아래에서 새로고침)
  window.CURO_MOBILE_MAIN = true;          // pages.js 휠·스와이프가 PC 장면을 움직이지 않게

  const PAGES = ['story-1', 'story-3', 'story-4', 'story-5', 'story-6', 'story-7', 'story-8', 'story-9'];
  const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="#8C837B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const html = (sel, el) => { const n = el && el.querySelector(sel); return n ? n.innerHTML : ''; };

  const slides = PAGES.map((pg, i) => {
    const t = document.querySelector(`.story-text[data-page="${pg}"]`);
    const end = i === PAGES.length - 1;
    const pill = t && t.querySelector('.st-pill') ? `<span class="mm-pill">${t.querySelector('.st-kicker').textContent}</span>` : '';
    const kick = t && !t.querySelector('.st-pill') && t.querySelector('.st-kicker') ? `<p class="mm-kick">${html('.st-kicker', t)}</p>` : '';
    const cta = end ? `<a class="mm-cta" href="program.html">CURO 프로그램 보러가기 ${'<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}</a>` : '';
    return `<section class="mm-slide${end ? ' is-end' : ''}" aria-roledescription="slide" aria-label="${i + 1} / ${PAGES.length}">
      <div class="mm-img"><img src="assets/images/main/mobile/scene-${i + 1}.webp?v=284" alt="" ${i > 1 ? 'loading="lazy"' : ''} decoding="async"></div>
      <div class="mm-tx">${pill}${kick}<h2 class="mm-ttl">${html('.st-title', t)}</h2><p class="mm-bd">${end ? html('.st-body', t).replace(/<br\s*\/?>/, ' ') : html('.st-body', t)}</p>${cta}</div>
    </section>`;
  }).join('');

  const root = document.createElement('div');
  root.id = 'mm';
  root.innerHTML = `
    <div class="mm-cover" role="button" tabindex="0" aria-label="책 열기">
      <div class="mm-stage"><div class="mm-zoom">
        <img class="mm-bg" src="assets/images/main/main1/background.webp?v=118" alt="" decoding="async">
        <img class="mm-logo" src="assets/images/main/main1/logo.svg?v=269" alt="CURO">
        <p class="mm-tag">우리 아이의 첫 자가주사가 따뜻한 시작이 되도록</p>
        <div class="mm-grp"><img src="assets/images/main/main1/character.webp?v=118" alt=""><div class="mm-book"><div class="mm-page"><div class="mm-mini" aria-hidden="true"></div></div><img class="mm-spine" src="assets/images/main/main1/front-cover.webp?v=118" alt=""><div class="mm-cv"><img class="mm-cv-f" src="assets/images/main/main1/front-cover.webp?v=118" alt="콩이와 큐로 가디언즈 책 표지"><div class="mm-cv-b"></div></div></div></div>
        <p class="mm-open">TAP TO OPEN<i class="mm-tap" aria-hidden="true"></i></p>
      </div></div>
    </div>
    <div class="mm-story" aria-label="이야기">
      <div class="mm-bar"><button type="button" class="mm-home" aria-label="처음으로"><img src="assets/icons/curo-logo.svg" alt="CURO"></button></div>
      <div class="mm-track">${slides}</div>
      <div class="mm-nav"><span class="mm-dots">${PAGES.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</span><button type="button" class="mm-next" aria-label="다음 장면">${arrow}</button></div>
    </div>`;
  document.body.insertBefore(root, document.body.firstChild);

  /* 208차: 책 안쪽 = 실제 이야기 화면(위 바 + 1장 그림)을 그대로 축소해 넣음 → 펼친 뒤엔 진짜 화면이 이 네모 창(클리핑) 안에서 보이다가
     창이 커지는 만큼 화면도 제자리로 (따로 만든 축소 레이아웃 없음) */
  const mini = root.querySelector('.mm-mini');
  mini.innerHTML = root.querySelector('.mm-slide .mm-img').outerHTML;   // 210차: 그림만 (위 바는 들어온 뒤 나타남 — 겹쳐 보이지 않게)
  const page = root.querySelector('.mm-page');
  /* 212차: 책 안 = 실제 이야기 화면을 원래 크기 그대로, 그림이 책 페이지 가운데 오게 놓은 것 (책 페이지가 창) */
  const imgH = () => root.querySelector('.mm-slide .mm-img').offsetHeight || window.innerHeight * 0.6;
  let TY0 = 0;
  function fitMini() {
    const W = window.innerWidth, H = window.innerHeight, m = parseFloat(getComputedStyle(root).getPropertyValue('--mms')) || 1;
    const r = page.getBoundingClientRect();
    TY0 = (r.top + r.height / 2) - imgH() / 2;                     // 그림 가운데 = 책 페이지 가운데
    mini.style.width = W + 'px'; mini.style.height = H + 'px';
    mini.style.transform = `scale(${1 / m}) translate(${-r.left}px, ${TY0 - r.top}px)`;
  }

  /* 첫 화면 무대 배율: 390×844 가 화면에 다 들어오게 */
  const stageFit = () => root.style.setProperty('--mms', Math.min(window.innerWidth / 390, window.innerHeight / 844).toFixed(4));
  stageFit(); requestAnimationFrame(fitMini); window.addEventListener('load', fitMini); window.addEventListener('resize', () => { stageFit(); fitMini(); });

  const cover = root.querySelector('.mm-cover'), track = root.querySelector('.mm-track');
  const dots = [...root.querySelectorAll('.mm-dots i')];
  let cur = 0;

  function openBook() {
    if (root.classList.contains('is-story') || root.classList.contains('is-opening')) return;
    if (window.CURO_BGM) window.CURO_BGM.play();
    // 205차: PC 와 같은 순서 — ① 표지가 왼쪽 경첩으로 펼쳐지며 책 안이 보임 ② 책 창이 화면만큼 커지며 이야기 화면이 제자리로
    root.classList.add('is-opening');
    setTimeout(grow, 900);
  }
  const EASE = 'cubic-bezier(0.6, 0, 0.3, 1)', DUR = 850;   // 222차: 0.85s 로 되돌림
  function grow() {
    track.scrollLeft = 0;
    fitMini();
    const r = page.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight;
    const story = root.querySelector('.mm-story');
    // 212차: 책 페이지(네모 창)가 화면보다 훨씬 커질 때까지 확대 — 그 창 안으로 원래 크기의 이야기 화면이 드러나며 제자리로
    const Z = Math.max(W / r.width, H / r.height) * 1.6;            // 끝: 페이지가 화면의 1.6배
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const tx = W / 2 - cx * Z, ty = H / 2 - cy * Z;                  // 페이지 가운데 → 화면 가운데
    const L1 = r.left * Z + tx, T1 = r.top * Z + ty, R1 = r.right * Z + tx, B1 = r.bottom * Z + ty;
    root.classList.add('is-story');
    // 213차: 창(clip)·표지 확대·화면 위치를 한 프레임에서 같이 계산 (따로 돌리면 clip 이 늦어 틈으로 뒤가 비침)
    const tracks = [...story.querySelectorAll('.mm-track, .mm-nav')];
    cover.style.transformOrigin = '0 0';
    const t0 = performance.now();
    const lerp = (a, b, t) => a + (b - a) * t;
    (function frame(now) {
      const p = Math.min(1, (now - t0) / DUR), e = ease(p);
      const z = lerp(1, Z, e), x = lerp(0, tx, e), y = lerp(0, ty, e);
      cover.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
      const L = r.left * z + x, T = r.top * z + y, R = r.right * z + x, B = r.bottom * z + y;
      story.style.clipPath = `inset(${T}px ${W - R}px ${H - B}px ${L}px round ${4 * (1 - e)}px)`;
      const m = ease(Math.min(1, p / 0.7));
      tracks.forEach((el) => { el.style.transform = `translateY(${TY0 * (1 - m)}px)`; });
      if (p < 1) { requestAnimationFrame(frame); return; }
      story.style.clipPath = ''; tracks.forEach((el) => { el.style.transform = ''; });
      root.classList.add('is-in'); cover.style.transform = '';
    })(t0);
  }
  /* cubic-bezier(0.6, 0, 0.3, 1) */
  function ease(t) {
    const x1 = 0.6, y1 = 0, x2 = 0.3, y2 = 1;
    const bx = (u) => 3 * x1 * u * (1 - u) * (1 - u) + 3 * x2 * u * u * (1 - u) + u * u * u;
    const by = (u) => 3 * y1 * u * (1 - u) * (1 - u) + 3 * y2 * u * u * (1 - u) + u * u * u;
    let lo = 0, hi = 1, u = t;
    for (let i = 0; i < 24; i++) { u = (lo + hi) / 2; if (bx(u) < t) lo = u; else hi = u; }
    return by(u);
  }
  cover.addEventListener('click', openBook);
  cover.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(); } });
  root.querySelector('.mm-home').addEventListener('click', () => { location.href = location.pathname; });   // 210차: 로고 = 이 페이지 처음으로 (새로고침)

  function mark() {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i === cur) return;
    cur = i;
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
    root.classList.toggle('is-last', i === PAGES.length - 1);
  }
  track.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
  root.querySelector('.mm-next').addEventListener('click', () => track.scrollTo({ left: (cur + 1) * track.clientWidth, behavior: 'smooth' }));
})();
