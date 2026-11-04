/* ==========================================================================
   CURO — animation adapter
   - window.gsap 이 이미 있으면 GSAP core timeline 을 사용한다 (40차: 자동 로드는 제거 — HTML 에서 직접 넣을 때만).
   - 없으면 같은 사용법(부분집합)의 내장 timeline 으로 동작한다 (현재).
     지원: timeline({ onComplete, onUpdate }) / tl.to(target, { duration, ease, ...숫자 props }, position)
           tl.play() / tl.reverse() / tl.pause() / tl.seek(t) / tl.timeScale(n) / tl.isActive()
           옵션 onReverseComplete (되감기 완료)
     ease 이름은 GSAP 표기와 같음: none, power1~4.in/out/inOut, sine.*, expo.*, circ.*
   - 애니메이션은 "숫자 상태 객체"만 tween 하고, 화면 반영은 onUpdate 의 render 함수가 한 곳에서 한다.
     → GSAP 로 바꿔도 코드가 그대로 동작한다.
   ========================================================================== */
(function () {
  'use strict';


  /* ---------- GSAP ----------
     40차: assets/vendor/gsap.min.js 자동 로드 제거 (파일이 없어 매번 404). 페이지가 미리 window.gsap 을 넣어 둔 경우에만 사용,
     없으면 아래 내장 timeline (현재 상태). GSAP 을 쓰려면 HTML 에 <script src="assets/vendor/gsap.min.js"> 를 anim.js 앞에 추가 */
  const gsapReady = Promise.resolve(!!window.gsap);

  /* ---------- ease ---------- */
  const P = (n) => ({
    in: (t) => Math.pow(t, n),
    out: (t) => 1 - Math.pow(1 - t, n),
    inOut: (t) => (t < 0.5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 * (1 - t), n) / 2)
  });
  const EASES = {
    none: (t) => t,
    linear: (t) => t,
    power1: P(2), power2: P(3), power3: P(4), power4: P(5),     // GSAP 규칙: powerN = 지수 N+1
    sine: {
      in: (t) => 1 - Math.cos((t * Math.PI) / 2),
      out: (t) => Math.sin((t * Math.PI) / 2),
      inOut: (t) => -(Math.cos(Math.PI * t) - 1) / 2
    },
    expo: {
      in: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
      out: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      inOut: (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2)
    },
    circ: {
      in: (t) => 1 - Math.sqrt(1 - t * t),
      out: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
      inOut: (t) => (t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2)
    }
  };
  function parseEase(name) {
    if (typeof name === 'function') return name;
    if (!name) return EASES.power1.out;                  // GSAP 기본값과 같음
    const [fam, kind] = String(name).split('.');
    const f = EASES[fam];
    if (!f) return EASES.power1.out;
    if (typeof f === 'function') return f;
    return f[kind || 'out'] || f.out;
  }

  /* ---------- 내장 timeline ----------
     playhead(time) 기반: play() 는 앞으로, reverse() 는 현재 위치에서 0 으로 되감기.
     tween 의 시작값은 처음 play/seek 할 때 한 번 기억한다 (같은 속성을 두 tween 이 건드리지 않는다는 전제).
     옵션: onUpdate, onComplete(끝 도착), onReverseComplete(0 도착) — GSAP timeline 과 같은 이름 */
  function miniTimeline(opts = {}) {
    const tweens = [];
    let scale = 1, raf = 0, active = false, total = 0, time = 0, dir = 1, lastTs = 0, captured = false;

    function capture() {
      if (captured) return;
      captured = true;
      for (const t of tweens) { t.from = {}; for (const k in t.props) t.from[k] = t.target[k]; }
    }
    function apply(tm) {
      for (const t of tweens) {
        const p = Math.min(1, Math.max(0, (tm - t.start) / t.duration));
        const e = t.ease(p);
        for (const k in t.props) t.target[k] = t.from[k] + (t.props[k] - t.from[k]) * e;
      }
      opts.onUpdate && opts.onUpdate();
    }
    function run(direction) {
      capture();
      cancelAnimationFrame(raf);
      dir = direction; active = true; lastTs = 0;
      const ref = (document.timeline && document.timeline.currentTime) || performance.now();   // play() 를 부른 frame 시각
      const tick = (now) => {
        // 27차: 첫 frame 에도 한 frame 만큼 진행 (예전에는 경과 0 → 첫 frame 에 같은 위치에 한 번 머묾).
        //   시작 기준 = play() 를 부른 frame 시각. 페이지가 한동안 frame 을 안 그렸으면 한 frame(16.7ms)으로 제한
        if (!lastTs) lastTs = now - Math.min(1000 / 60, Math.max(1000 / 240, now - ref));
        time += ((now - lastTs) / 1000) * scale * dir;
        lastTs = now;
        if (time >= total) time = total;
        if (time <= 0) time = 0;
        apply(time);
        if (dir > 0 && time >= total) { active = false; opts.onComplete && opts.onComplete(); return; }
        if (dir < 0 && time <= 0) { active = false; opts.onReverseComplete && opts.onReverseComplete(); return; }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    const api = {
      to(target, vars, position) {
        const { duration = 0.5, ease, ...props } = vars;
        const start = typeof position === 'number' ? position : total;
        tweens.push({ target, start, duration: Math.max(0.0001, duration), ease: parseEase(ease), props, from: null });
        total = Math.max(total, start + Math.max(0.0001, duration));
        return api;
      },
      timeScale(n) { scale = n; return api; },
      duration() { return total; },
      time() { return time; },
      isActive() { return active; },
      reversed() { return dir < 0; },
      play() { run(1); return api; },
      reverse() { run(-1); return api; },
      kill() { cancelAnimationFrame(raf); active = false; },
      pause() { cancelAnimationFrame(raf); active = false; return api; },
      /** 디버그/검증용: 특정 시간(초)의 상태로 이동 (GSAP tl.seek 과 같은 의미). 콜백은 호출하지 않음 */
      seek(tm) { capture(); time = Math.min(total, Math.max(0, tm)); apply(time); return api; }
    };
    return api;
  }

  /* ---------- 공개 API ---------- */
  window.CURO_ANIM = {
    ready: gsapReady,
    engine: () => (window.gsap ? 'gsap ' + (window.gsap.version || '') : 'built-in'),
    /** timeline 생성. GSAP 이 있으면 gsap.timeline(paused) */
    timeline(opts = {}) {
      if (window.gsap) {
        const tl = window.gsap.timeline({ paused: true, onUpdate: opts.onUpdate, onComplete: opts.onComplete, onReverseComplete: opts.onReverseComplete });
        return tl;   // to / play / timeScale / isActive / duration 동일
      }
      return miniTimeline(opts);
    },
    parseEase
  };
})();
