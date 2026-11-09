/* ==========================================================================
   FRIENDS (94차) — friends.html 전용
   1) 배율: 1920×1080 시안 프레임을 화면에 맞춤 (--fs/--fx/--fy), 글 왼쪽·버튼 오른쪽 = 메뉴 라인
   2) (117차) 소개 화면 없앰 — 들어오면 바로 친구 소개, 아래(푸터)는 일반 스크롤
   3) 친구 고르기: 오른쪽 친구를 누르면 오른쪽에서부터, 왼쪽이면 왼쪽에서부터 배경·무대 색이 번지듯 바뀜.
      이름·소개·대사·영문 이름은 사라졌다 나타남, 버튼 색과 고른 원은 바로 바뀜
   내용·색은 아래 FRIENDS 에서 수정
   ========================================================================== */
(function () {
  'use strict';
  // 274차: 색 = 새 선택 버튼 색 계열 (베어리 빨강 · 엘리 노랑 · 래비 파랑 · 미오 초록)
  const FRIENDS = [
    { id: 'beary', dim: '#9E2F33', name: '베어리', en: 'BEARY', tag: '다정한 리더 · 용기',
      desc: ['언제나 옆에서 든든하게', '응원해주는 다정한 리더에요'], quote: ["'처음이 무서워도,", "천천히 해보면 할 수 있어!'"],
      icon: 'assets/icons/beary-select.webp?v=333', stage: 'assets/images/friends/stage-beary.svg?v=276', pose: 'assets/images/friends/pose-beary.svg?v=95',
      v: { x: 681, y: 188, s: 560 }, idle: 'assets/videos/friends/beary-idle.webm?v=146', hi: 'assets/videos/friends/beary-hi.webm?v=146',
      c: { top: '#FFCACB', bot: '#FFF0F0', hill: '#FFF9F9', ink: '#9E2F33', accent: '#E04A50', btn: '#D9575C' } },
    { id: 'ellie', dim: '#7A5A0C', name: '엘리', en: 'Ellie', tag: '든든한 지킴이 · 안심',
      desc: ['말없이 곁을 지키며', '마음을 편안하게 해주는 지킴이에요'], quote: ["'걱정하지 마, 내가 옆에서", "든든하게 지켜줄게!'"],
      icon: 'assets/icons/ellie-select.webp?v=333', stage: 'assets/images/friends/stage-ellie.svg?v=290', pose: 'assets/images/friends/pose-ellie.svg?v=95',
      v: { x: 635, y: 113, s: 652 }, idle: 'assets/videos/friends/ellie-idle.webm?v=146', hi: 'assets/videos/friends/ellie-hi.webm?v=146',
      c: { top: '#FFE188', bot: '#FFF5D8', hill: '#FFFCF0', ink: '#7A5A0C', accent: '#CC9A0E', btn: '#DDA824' } },
    { id: 'rabby', dim: '#1D5F82', name: '래비', en: 'Rabby', tag: '쾌활한 발명가 · 도전',
      desc: ['새로운 방법을 찾아내며', '연습을 즐겁게 만들어주는 발명왕이에요'], quote: ["'어렵게 느껴진다면,", "우리 다른 방법으로 해볼까?'"],
      icon: 'assets/icons/rabby-select.webp?v=333', stage: 'assets/images/friends/stage-rabby.svg?v=277', pose: 'assets/images/friends/pose-rabby.svg?v=95',
      v: { x: 745, y: 326, s: 439 }, idle: 'assets/videos/friends/rabby-idle.webm?v=146', hi: 'assets/videos/friends/rabby-hi.webm?v=146',
      c: { top: '#BFE3F7', bot: '#E9F6FD', hill: '#F8FCFF', ink: '#1D5F82', accent: '#2590C5', btn: '#2E8BBF' } },
    { id: 'mio', dim: '#4E6327', name: '미오', en: 'Mio', tag: '꼼꼼한 기록가 · 칭찬',
      desc: ['작은 노력도 놓치지 않고', '하나하나 기억해주는 기록가예요'], quote: ["'오늘도 해냈네!", "너의 노력을 모두 기억하고 있어!'"],
      icon: 'assets/icons/mio-select.webp?v=333', stage: 'assets/images/friends/stage-mio.svg?v=277', pose: 'assets/images/friends/pose-mio.svg?v=283',
      v: { x: 738, y: 306, s: 446 }, idle: 'assets/videos/friends/mio-idle.webm?v=146', hi: 'assets/videos/friends/mio-hi.webm?v=266',
      c: { top: '#D8EAAF', bot: '#F2F8E2', hill: '#FBFDF5', ink: '#4E6327', accent: '#77953A', btn: '#86A24C' } }
  ];
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const meet = $('fr-meet');   // 117차: 소개 화면(fr-intro) 없앰
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- 1. 배율 ---------- */
  function layout() {
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    const s = Math.min(vw / 1920, vh / 1080);
    const fx = (vw - 1920 * s) / 2, fy = vh - 1080 * s;                 // 가로 가운데, 아래 맞춤 (위 남는 곳 = 메뉴 쪽 여백)
    const line = (vw - 1360 * Math.min(1, vw / 1920)) / 2;            // 메뉴 라인 (topnav.css --page-w)
    root.style.setProperty('--fvh', vh + 'px');
    root.style.setProperty('--fs', s.toFixed(5));
    root.style.setProperty('--fx', fx.toFixed(2) + 'px');
    root.style.setProperty('--fy', fy.toFixed(2) + 'px');
    root.style.setProperty('--fline', ((line - fx) / s).toFixed(1) + 'px');
    root.style.setProperty('--fliner', ((vw - line - fx) / s).toFixed(1) + 'px');
  }
  window.addEventListener('resize', layout);
  layout();
  // 348차: 폰 — 대사(글) 아래 끝 위치를 --qb 로 (영문 이름 글자가 글 위로 올라가지 않게, css 폰 구간에서 씀)
  const qbSet = () => { const q = $('fr-quote'), sec = $('fr-meet'); if (!q || !sec) return;
    root.style.setProperty('--qb', Math.round(q.getBoundingClientRect().bottom - sec.getBoundingClientRect().top) + 'px'); };
  if ('ResizeObserver' in window) new ResizeObserver(qbSet).observe($('fr-info'));
  window.addEventListener('resize', qbSet);

  /* ---------- 2. 친구 소개 ---------- */
  const layers = $('fr-layers'), pick = $('fr-pick');
  pick.innerHTML = FRIENDS.map((f, i) => `<li><button type="button" data-i="${i}" aria-label="${esc(f.name)}" aria-pressed="false" style="--dim:${f.dim}"><img src="${encodeURI(f.icon)}" alt=""></button></li>`).join('');
  FRIENDS.forEach((f) => { const im = new Image(); im.src = f.stage; });
  function makeLayer(f) {
    const el = document.createElement('div');
    el.className = 'fr-layer';
    Object.entries(f.c).forEach(([k, v]) => el.style.setProperty('--c-' + k, v));
    el.innerHTML = `<div class="fr-frame"><div class="fr-hill"></div><img class="fr-stage" src="${esc(f.stage)}" alt=""><p class="fr-lmark" aria-hidden="true">${esc(f.en)}</p><img class="fr-pose" src="${esc(f.pose)}" alt=""></div>`;
    layers.appendChild(el);
    return el;
  }
  /* ---------- 146차: 캐릭터 영상 — 고르면 idle 반복, 캐릭터·소리 버튼 누르면 hi 한 번 → 다시 idle ---------- */
  const charBtn = $('fr-char'), vIdle = $('fr-idle'), vHi = $('fr-hi'), still = $('fr-still');
  // 투명 webm(VP9 알파)을 못 그리는 Safari 는 그림(pose svg)으로
  const ua = navigator.userAgent, noAlpha = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|Firefox|FxiOS/.test(ua);
  const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  /* 263차: 영상 바꿀 때 깜빡임 — 두 영상을 번갈아 보이고 숨기던 방식은 브라우저가 숨겨진 영상을 다시 그릴 때 한두 프레임 빌 수 있음.
     → 화면에는 캔버스 하나만 보이고, 지금 영상의 프레임을 매 화면마다 캔버스에 그림. 다음 영상이 그릴 수 있게 된 뒤에만 바꾸므로
     그 사이에는 캔버스에 마지막 장면이 그대로 남아 빈 화면이 생기지 않음 (영상 두 개는 투명하게 뒤에서 재생) */
  const cv = document.createElement('canvas');
  cv.className = 'fr-vid fr-cv'; cv.setAttribute('aria-hidden', 'true');
  charBtn.insertBefore(cv, still);
  const cx = cv.getContext('2d');
  let cur = null, want = null, onSwitch = null, onDraw = null;
  const ready = (v) => v.readyState >= 2 && !v.seeking && v.videoWidth > 0;
  function swapTo(v, fn) { want = v; onSwitch = fn || null; }
  function tick() {
    requestAnimationFrame(tick);
    if (want && !want.paused && ready(want)) { cur = want; want = null; const fn = onSwitch; onSwitch = null; if (fn) fn(); }
    if (!cur || !ready(cur)) return;
    const w = cur.videoWidth, h = cur.videoHeight;
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    cx.clearRect(0, 0, w, h); cx.drawImage(cur, 0, 0, w, h);
    if (onDraw) { const fn = onDraw; onDraw = null; fn(); }
  }
  if (!noAlpha) requestAnimationFrame(tick);
  function setChar(f, done) {
    charBtn.style.setProperty('--v-x', f.v.x + 'px'); charBtn.style.setProperty('--v-y', f.v.y + 'px'); charBtn.style.setProperty('--v-s', f.v.s + 'px'); charBtn.style.setProperty('--v-k', (f.v.s / 560).toFixed(3));   // 179차: 폰 레이아웃 크기 비율 (베어리 = 1)
    charBtn.setAttribute('aria-label', `${f.name} 인사하기`);
    charBtn.classList.remove('is-hi');
    if (typeof placeTouch === 'function') placeTouch(f.id);
    // 187차: Safari(아이폰 포함)는 투명 webm 대신 움직이는 webp (assets/images/friends/anim/{id}-idle·hi.webp, 영상에서 변환) — 그림만 보이던 것 대신 PC 처럼 움직임
    if (noAlpha) { vIdle.hidden = vHi.hidden = cv.hidden = true; still.hidden = false; still.src = ANIM(f.id, 'idle'); const pre = new Image(); pre.src = ANIM(f.id, 'hi'); if (done) done(); return; }
    cur = null; onSwitch = null; if (SWAP_FADE) cx.clearRect(0, 0, cv.width, cv.height);   // 329차: 바로 바뀜 모드면 새 그림이 그려질 때까지 이전 그림을 둠 (빈 화면 안 보이게)   // 친구가 바뀌면 이전 친구 그림은 지움 (이때는 사라졌다 나타나는 중)
    let fin = false; const end = () => { if (!fin) { fin = true; if (done) done(); } };
    onDraw = end; setTimeout(end, 900);                      // 새 친구 첫 장면이 그려지면 나타남 (늦어도 0.9초)
    vHi.pause(); vHi.src = f.hi; vHi.load();
    vIdle.src = f.idle; vIdle.currentTime = 0; play(vIdle); swapTo(vIdle);
  }
  const ANIM = (id, k) => `assets/images/friends/anim/${id}-${k}.webp?v=266`;
  const HI_MS = 3633;                                            // 인사 영상 길이 (네 친구 같음)
  let hiT = 0;
  /* 255차 · 256차: 캐릭터 목소리 (assets/audio/friends/voice/{id}-intro · hi-1 · hi-2.mp3, 원본 = 웹/프렌즈/효과음/캐릭터별)
     아래 친구 원을 누르면 = 등장 효과음 + '안녕 난 ○○야'(intro) / 캐릭터·'○○와 인사하기' 를 누르면 = hi-1 · hi-2 번갈아
     등장 효과음 = assets/audio/friends/appear.mp3 (258차: 네 친구 모두 같은 소리, 원본 Professional_cartoon_#3) */
  const VOICE = (id, k) => `assets/audio/friends/voice/${id}-${k}.mp3?v=291`;
  const said = {}, voice = new Audio(), sfx = new Audio();
  voice.preload = sfx.preload = 'auto'; sfx.volume = 0.6;
  let voiceT = 0;
  const playA = (a, src) => { a.pause(); a.src = src; a.currentTime = 0; const p = a.play(); if (p && p.catch) p.catch(() => {}); };
  function speak(id) {                                           // 인사: hi-1 · hi-2 번갈아
    clearTimeout(voiceT);
    const n = said[id] || 0; said[id] = n + 1;
    playA(voice, VOICE(id, n % 2 ? 'hi-2' : 'hi-1'));
  }
  // 257차: 효과음이 다 끝난 뒤 목소리 (겹치지 않게). 효과음 파일은 2초지만 1.58초 뒤로는 무음 → 1.7초에 목소리
  const SFX_SRC = 'assets/audio/friends/appear.mp3?v=258', SFX_END = 1.7;
  /* 259차: 터치 안내 아이콘 (assets/icons/touch-hint.svg) — '안녕 난 ○○야' 가 끝나면 캐릭터 위에 떠서 눌러야 하는 걸 알려줌. 누르거나 친구를 바꾸면 사라짐 */
  const touch = document.createElement('span');
  touch.className = 'fr-touch'; touch.setAttribute('aria-hidden', 'true');
  touch.innerHTML = '<img src="assets/icons/touch-hint.svg?v=259" alt="">';
  charBtn.appendChild(touch);
  const TOUCH_AT = { beary: [58, 70], ellie: [63, 65], rabby: [58, 76], mio: [58, 72] };   // 캐릭터 상자 기준 배 위치 (%)
  let touchT = 0;
  const hint = (on) => { clearTimeout(touchT); touch.classList.toggle('is-on', !!on); };
  voice.addEventListener('ended', () => hint(true));   // 260차: 소개·인사 대사가 끝날 때마다 다시 터치 안내
  function placeTouch(id) { const t = TOUCH_AT[id] || [58, 70]; touch.style.left = t[0] + '%'; touch.style.top = t[1] + '%'; }
  function appear(id, onBlocked) {
    hint(false);                                          // 등장: 효과음 → 끝나면 '안녕 난 ○○야'
    const my = {};
    clearTimeout(voiceT); voice.pause(); appear.cur = my;
    const go = () => { if (appear.cur === my) playA(voice, VOICE(id, 'intro')); };
    sfx.pause(); sfx.src = SFX_SRC; sfx.currentTime = 0;
    const p = sfx.play();
    const after = () => { voiceT = setTimeout(go, SFX_END * 1000); };
    if (p && p.then) p.then(after, () => { if (onBlocked) onBlocked(); else go(); }); else after();          // 효과음이 막히면 목소리만 바로 (264차: 처음 들어올 때는 onBlocked)
  }
  function sayHi() {
    if (sel < 0) return;
    hint(false);
    speak(FRIENDS[sel].id);
    if (noAlpha) {                                               // 움직이는 webp: 인사 한 번 → 다시 기본
      const f = FRIENDS[sel]; clearTimeout(hiT);
      still.src = ANIM(f.id, 'hi') + '&t=' + Date.now();
      hiT = setTimeout(() => { if (FRIENDS[sel] === f) still.src = ANIM(f.id, 'idle'); }, HI_MS);
      return;
    }
    // 260차: 인사 영상은 끝난 뒤 미리 0초로 되감아 둠. 263차: 인사 영상이 그릴 수 있게 된 뒤에 캔버스가 넘어감 (그 전엔 기본 영상 장면 유지)
    const go = () => { play(vHi); swapTo(vHi, () => { charBtn.classList.add('is-hi'); vIdle.pause(); }); };
    if (vHi.currentTime > 0.01 && !vHi.seeking) vHi.currentTime = 0;
    if (vHi.seeking || vHi.readyState < 2) vHi.addEventListener(vHi.seeking ? 'seeked' : 'canplay', go, { once: true }); else go();
  }
  vHi.addEventListener('ended', () => {   // 인사 끝 → 기본 영상을 멈췄던 곳에서 이어 재생, 그릴 수 있게 되면 넘어감 (그 사이 인사 마지막 장면 유지)
    play(vIdle); swapTo(vIdle, () => { charBtn.classList.remove('is-hi'); vHi.pause(); vHi.currentTime = 0; });   // 넘어간 뒤 인사 영상 미리 되감기
  });
  charBtn.addEventListener('click', sayHi);
  $('fr-sound').addEventListener('click', sayHi);   // 255차: 목소리는 sayHi 안에서 (speak)

  /* 329차: 친구를 바꿀 때 글·캐릭터 — false = 바로 바뀜 / true = 천천히 사라졌다 나타남 (328차까지) */
  const SWAP_FADE = true;
  const PHONE = window.matchMedia('(max-width: 600px), (max-width: 1024px) and (orientation: portrait)');
  let sel = -1, swapT = 0;
  function fillText(f) {
    $('fr-name').textContent = f.name;
    $('fr-tag').textContent = f.tag;
    $('fr-desc').innerHTML = f.desc.map(esc).join('<br>');
    // 98차: 따옴표는 BM JUA 에 모양이 비어 있어 Pretendard 로 (‘ … ’)
    $('fr-quote').innerHTML = f.quote.map(esc).join('<br>').replace(/^'/, '<span class="fr-q">‘</span>').replace(/'$/, '<span class="fr-q">’</span>');
    $('fr-mark').textContent = f.en;
    $('fr-sound-t').textContent = `${f.name}와 인사하기`;   // 236차: 소리 버튼이 무엇인지 글로 (이름이 모두 받침 없음 → '와')
    // 98차: 글 색은 글이 바뀌는 순간에 같이 (사라지기 전에 색이 먼저 바뀌지 않게)
    ['ink', 'accent'].forEach((k) => $('fr-info').style.setProperty('--c-' + k, f.c[k]));
    // 328차: '알아보기' 버튼 색·글도 글과 함께 (사라졌다 나타날 때 바뀜. 예전엔 누르는 순간 바로 바뀜)
    meet.style.setProperty('--c-btn', f.c.btn);
    const cta = $('fr-cta'); cta.querySelector('span').textContent = `${f.name} 알아보기`; cta.href = `character.html?c=${f.id}`;   // 99차: 캐릭터 상세로
  }
  function select(i) {
    if (i === sel) return;
    const f = FRIENDS[i], prev = sel; sel = i;
    pick.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    if (prev < 0) { makeLayer(f); fillText(f); setChar(f); return; }
    // 배경: 누른 쪽에서부터 번지듯
    const el = makeLayer(f);
    if (i > prev) el.classList.add('from-r');                                 // 오른쪽 친구 → 오른쪽에서부터
    el.classList.add('is-from');
    void el.offsetWidth;
    el.classList.add('is-go'); el.classList.remove('is-from');
    el.addEventListener('transitionend', () => { while (layers.firstChild !== el) layers.firstChild.remove(); }, { once: true });
    // 329차: 바로 바뀜 (SWAP_FADE = false). 예전처럼 사라졌다 나타나게 하려면 위 SWAP_FADE 를 true 로
    if (!SWAP_FADE) { clearTimeout(swapT); meet.classList.remove('is-swap'); fillText(f); setChar(f); return; }
    // 글·영문 이름: 사라졌다 나타남
    clearTimeout(swapT);
    meet.classList.add('is-swap');
    if (PHONE.matches) { meet.style.setProperty('--c-btn', f.c.btn); const cta = $('fr-cta'); cta.querySelector('span').textContent = `${f.name} 알아보기`; cta.href = `character.html?c=${f.id}`; }   // 349차: 폰 = 알아보기 버튼은 사라지지 않고 색만 바로 바뀜
    swapT = setTimeout(() => { fillText(f); setChar(f, () => { if (FRIENDS[sel] === f) meet.classList.remove('is-swap'); }); }, 350);   // 263차: 새 친구 첫 장면이 그려진 뒤 나타남
  }
  pick.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (!b || +b.dataset.i === sel) return; appear(FRIENDS[+b.dataset.i].id); select(+b.dataset.i); });   // 277차: 이미 고른 친구를 다시 누르면 효과음·목소리 없음   // 256차: 원 누르면 등장 효과음 + 소개 목소리
  select(0);
  /* 264차: 처음 들어올 때도 등장 효과음 → '안녕 난 베어리야'. 브라우저가 소리 자동 재생을 막으면(이 사이트에서 아직 누른 적 없을 때)
     터치 안내를 먼저 띄우고, 화면 아무 곳이나 처음 누르는 순간 재생 (친구 원·캐릭터·인사 버튼은 자기 소리가 있으니 제외) */
  appear(FRIENDS[0].id, () => {
    appear.cur = null;
    touchT = setTimeout(() => hint(true), 1600);
    const off = () => { removeEventListener('pointerdown', once, true); removeEventListener('keydown', once, true); };
    const once = (e) => { off(); if (e.target && e.target.closest && e.target.closest('.fr-pick button, #fr-char, #fr-sound, a')) return; appear(FRIENDS[sel].id); };
    addEventListener('pointerdown', once, true); addEventListener('keydown', once, true);
  });

  /* 117차: 소개 화면이 없어져 '한 화면씩' 넘기기 없음 — 친구 소개 아래(푸터)는 일반 스크롤 */
  window.CURO_FRIENDS = { list: FRIENDS, select };
  window.scrollTo(0, 0);
})();
