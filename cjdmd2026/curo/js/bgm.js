/* ==========================================================================
   메인 배경 음악 (166차) — Index·Index2·Index3 전용
   음악 = assets/audio/main-bgm.mp3 (원본: 웹/메인/Tiny_Pages_Adventure.mp3)
   브라우저는 소리 자동 재생을 막기 때문에, 첫 클릭·터치·키 입력 때 서서히 켜짐
   햄버거 메뉴 아래 '음악 끄기 / 켜기' 버튼 (아이콘 = assets/icons/sound.svg · assets/icons/mute.svg)
   끈 상태는 이 브라우저에 기억 (다음 방문에도 꺼진 채)
   ========================================================================== */
(function () {
  'use strict';
  const SRC = 'assets/audio/main-bgm.mp3?v=166';
  const VOL = 0.45;              // 최대 음량 (0~1)
  const FADE = 1200;             // 켜질 때·꺼질 때 서서히 (ms)
  const KEY = 'curo-bgm';

  const btn = document.getElementById('menu-sound');
  let muted = false;
  try { muted = localStorage.getItem(KEY) === 'off'; } catch (e) { /* 저장 안 되는 브라우저 */ }

  const audio = new Audio(SRC);
  audio.loop = true; audio.preload = 'auto'; audio.volume = 0;
  let fadeRaf = 0, started = false;

  function fadeTo(target, done, dur) {
    cancelAnimationFrame(fadeRaf);
    const from = audio.volume, t0 = performance.now(), D = dur || FADE;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / D);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k < 1) fadeRaf = requestAnimationFrame(step); else if (done) done();
    };
    fadeRaf = requestAnimationFrame(step);
  }
  function play() {
    if (muted) return;
    const p = audio.play();
    const ok = () => { started = true; fadeTo(VOL); };
    if (p && p.then) p.then(ok).catch(() => { /* 아직 허용 안 됨 → 다음 입력 때 다시 */ }); else ok();
  }
  function stop() { fadeTo(0, () => audio.pause()); }

  function render() {
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(!muted));
    btn.classList.toggle('is-muted', muted);
    const t = btn.querySelector('.menu-sound-t');
    if (t) t.textContent = muted ? '음악 켜기' : '음악 끄기';
    btn.setAttribute('aria-label', muted ? '배경 음악 켜기' : '배경 음악 끄기');
  }

  // 첫 사용자 입력 때 재생 (소리 버튼 자체를 누른 경우는 버튼이 처리)
  const kick = (e) => {
    if (btn && btn.contains(e.target)) return;
    if (!started) play();
    if (started || muted) ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.removeEventListener(ev, kick, true));
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, kick, true));
  play();   // 이미 허용된 경우(같은 사이트를 자주 방문 등) 바로 재생

  if (btn) btn.addEventListener('click', () => {
    muted = !muted;
    try { localStorage.setItem(KEY, muted ? 'off' : 'on'); } catch (e) { /* 무시 */ }
    if (muted) stop(); else play();
    render();
  });

  // 167차: 다른 페이지로 넘어갈 때 뚝 끊기지 않게 짧게(LEAVE) 줄어든 뒤 이동
  const LEAVE = 450;
  function go(url) {
    if (audio.paused || audio.volume < 0.01) { location.href = url; return; }
    let gone = false;
    const nav = () => { if (!gone) { gone = true; location.href = url; } };
    fadeTo(0, nav, LEAVE);
    setTimeout(nav, LEAVE + 150);   // 탭이 뒤로 가 rAF 가 멈춰도 이동은 됨
  }
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(href)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    e.preventDefault();
    go(url.href);
  });

  // 다른 탭으로 가면 멈추고, 돌아오면 다시
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (!audio.paused) { cancelAnimationFrame(fadeRaf); audio.pause(); audio.dataset.resume = '1'; } }
    else if (audio.dataset.resume === '1' && !muted) { delete audio.dataset.resume; audio.volume = 0; play(); }
  });

  render();
  window.CURO_BGM = { audio, play, stop, go };   // 다른 js 에서 페이지 이동할 때 CURO_BGM.go(url) 쓰면 소리가 부드럽게 줄어든 뒤 이동
})();
