/* ==========================================================================
   CURO — STORY horizontal world (Main2 → Main3 → Main4 → Main5 → … → Main9)  · 25차, 45차 장면 추가
   장면(panel)을 화면 크기로 자르지 않고 하나의 긴 world 위에 놓는다. 카메라 위치 cam 하나가 이동한다.
     [Main2] ── 연결 구간(connector) ── [Main5]      ← viewport(#story, 유일한 clip)
   · 장면 k 의 정착 위치 X[k] : 그 장면이 fullscreen camera 그대로 보이는 cam 값.
       X[k+1] = X[k] + (vw + gap) ÷ 원경 배율   (원경 plane 에서 두 장면 사이 폭이 gap 이 되도록)
   · 레이어 화면 위치 = (X[k] − cam) × 배율(scene.parallax[depth]).  panel 자체 = 배율 1.
       cam = X[k] 이면 모든 offset 0 → reference 그대로. Y축·scale 변화 없음.
   · 연결 구간 (41차) : 별도 레이어 없음. 장면 사이 빈 공간에는 #story 배경색만 보인다.
     전환 구간별 색 = config story.transitions['A|B'].background — 화면에 가장 가까운 구간의 색으로 #story 배경을 바꾼다 (바뀔 때만 1번 씀).
   아래로 scroll(pages.js) → 다음 장면으로 cam 이동, 위로 → 반대.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.CURO_CONFIG;
  const SC = CFG.story;
  const M5 = CFG.main5;
  const M2 = CFG.main2;
  const root = document.documentElement;
  const px = (v) => v + 'px';
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const stage = document.getElementById('story');
  const panels = SC.panels.map((id) => stage.querySelector(`.story-panel[data-page="${id}"]`));

  /* ---------- 초기 설정 ---------- */
  root.style.setProperty('--m5-w', px(M5.scene.w));
  root.style.setProperty('--m5-h', px(M5.scene.h));
  root.style.setProperty('--m5-bg', M5.background);
  M5.layers.forEach((l) => {
    const n = stage.querySelector(`.m5-layer[data-m5="${l.key}"]`);
    if (n) n.hidden = !l.enabled;
  });

  // 확인용 분리 테스트 (?perf 와 함께: &flat = parallax 끔, &nolive = will-change 안 씀)
  const QS = new URLSearchParams(location.search);
  const TEST = { flat: QS.has('flat'), nolive: QS.has('nolive') };

  const SCENES = {
    'story-1': { cfg: M2, sel: (k) => `.m2-layer[data-m2="${k}"]`, scale: () => parseFloat(root.style.getPropertyValue('--story-s')) || 1 },
    'story-5': { cfg: M5, sel: (k) => `.m5-layer[data-m5="${k}"]`, scale: () => parseFloat(root.style.getPropertyValue('--m5-s')) || 1 }
  };
  /* 45차: Main3·4·6~9 — 같은 구조의 일반 장면. HTML: .story-panel > .story-camera.story-camera--scene > .story-scene > .sc-layer[data-layer=key] > img
     camera(cover 배율·위치)는 장면마다 config mainN.camera 로 계산해 그 panel 의 .story-camera 에 직접 쓴다 (Main5 의 --m5-* 와 같은 계산) */
  const SCENE_OF = SC.scenes || {};
  SC.panels.forEach((id, i) => {
    if (SCENES[id] || !panels[i]) return;
    const cfg = CFG[SCENE_OF[id]];
    if (!cfg) return;
    const camEl = panels[i].querySelector('.story-camera');
    const sceneEl = panels[i].querySelector('.story-scene');
    if (sceneEl) { sceneEl.style.width = px(cfg.scene.w); sceneEl.style.height = px(cfg.scene.h); }
    const sc = { cfg, camEl, s: 1, sel: (k) => `.sc-layer[data-layer="${k}"]` };
    sc.scale = () => sc.s;
    cfg.layers.forEach((l) => {
      const n = panels[i].querySelector(sc.sel(l.key));
      if (n) n.hidden = !l.enabled;
    });
    SCENES[id] = sc;
  });
  const farOf = (id) => ((SCENES[id].cfg.parallax || {}).far) || 1;

  // 장면 가장자리 fade 는 이미지 복사본에 구워 넣었다 (25차, tools/bake_edge_fade.py). 여기서는 아무것도 하지 않음

  /* 27차: 웹용 레이어 PNG 는 투명 여백을 잘라낸 복사본 → config 의 box [x, y, w, h] 로 원래 캔버스의 같은 자리에 둔다.
     group: 같은 장면·같은 depth·항상 같은 이동인 이웃 레이어는 wrapper 하나에 넣어 wrapper 만 움직인다 (compositor layer 1장).
     각 레이어 DOM 은 그대로 남아 있어 나중에 개별 animation 을 붙일 수 있다 */
  //   레이어 요소(.m2-layer/.m5-layer) 자체도 box 크기로 줄인다 → compositor layer(texture)가 캔버스 전체가 아니라 그림 영역만큼만 생김
  SC.panels.forEach((id, i) => {
    const sc = SCENES[id], panel = panels[i];
    if (!sc || !panel) return;
    const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px'; };
    const groups = {};
    sc.cfg.layers.forEach((l) => {
      const el = panel.querySelector(sc.sel(l.key));
      if (!el || !l.box) return;
      const img = el.querySelector('img');
      place(el, l.box[0], l.box[1], l.box[2], l.box[3]);
      if (img) { place(img, 0, 0, l.box[2], l.box[3]); img.width = l.box[2]; img.height = l.box[3]; }
      if (l.group) (groups[l.group] = groups[l.group] || []).push({ el, box: l.box });
    });
    // group: 이웃 레이어들을 묶는 wrapper = 구성원 box 의 합집합. 구성원은 wrapper 기준 좌표로 옮긴다
    Object.keys(groups).forEach((gk) => {
      const m = groups[gk];
      const x0 = Math.min(...m.map((o) => o.box[0])), y0 = Math.min(...m.map((o) => o.box[1]));
      const x1 = Math.max(...m.map((o) => o.box[0] + o.box[2])), y1 = Math.max(...m.map((o) => o.box[1] + o.box[3]));
      const g = document.createElement('div');
      g.className = 'story-group'; g.setAttribute('data-group', gk);
      place(g, x0, y0, x1 - x0, y1 - y0);
      m[0].el.parentNode.insertBefore(g, m[0].el);
      m.forEach((o) => { g.appendChild(o.el); o.el.style.left = (o.box[0] - x0) + 'px'; o.el.style.top = (o.box[1] - y0) + 'px'; });
    });
  });

  /* 40차: 꺼진(enabled:false) 레이어는 이미지를 내려받지 않는다 — HTML 은 data-src 로 두고, 켜진 레이어만 src 로 바꾼다.
     45차: 장면이 8개가 되어 전부 한꺼번에 받지 않도록, 현재 장면 ±preload.load 안의 장면만 src 로 바꾼다 (activate).
       Main2('story-1')는 HTML 에서 처음부터 src. 한 번 받은 이미지는 그대로 둔다 (다시 요청하지 않음) */
  const PRE = SC.preload || { load: 2, decode: 1 };
  function activate(center) {
    SC.panels.forEach((id, i) => {
      const sc = SCENES[id], panel = panels[i];
      if (!sc || !panel || Math.abs(i - center) > PRE.load) return;
      sc.cfg.layers.forEach((l) => {
        const el = panel.querySelector(sc.sel(l.key)), img = el && el.querySelector('img[data-src]');
        if (img && l.enabled) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
      });
    });
  }

  /* 40차: 다음 장면 이미지 미리 준비 — 첫 이동 중에 Main5 이미지 decode(약 30ms)가 끼어들어 끊기던 문제.
     장면에 도착할 때마다 현재·이웃 장면(±preload.decode) 이미지를 img.decode() 로 미리 풀어 둔다.
     45차: 처음(한가할 때)에도 전체가 아니라 첫 장면 기준 이웃만 (Main2·Main3). 애니메이션 구조(rAF / render)는 그대로 */
  const decoded = new WeakSet();
  function prepare(center) {
    SC.panels.forEach((id, i) => {
      if (center != null && Math.abs(i - center) > PRE.decode) return;
      const panel = panels[i];
      if (!panel) return;
      panel.querySelectorAll('img[src]').forEach((img) => {
        if (decoded.has(img) || !img.decode) return;
        decoded.add(img);
        img.decode().catch(() => decoded.delete(img));
      });
    });
  }
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300));
  const warm = () => idle(() => { activate(0); prepare(0); });
  if (document.readyState === 'complete') warm();
  else window.addEventListener('load', warm, { once: true });

  // 레이어 목록 (배율 ≠ 1 인 것만 따로 움직임). group 이 있으면 group wrapper 가 움직인다

  /* 45차: frame — 창밖 하늘처럼 방(창틀) 레이어보다 느린 레이어가 이동 중 방 canvas 밖(장면 사이 빈 공간)으로
     먼저 나가거나 늦게 남아 '하늘만 떠 보이는' 것을 막는다. config mainN.frame = depth 이름 (그 depth 의 배율로 움직이는 틀).
     그보다 느린 레이어를 scene canvas 크기의 overflow:hidden 틀(.sc-frame) 안에 넣고, 틀은 frame 배율로, 안의 레이어는 차이만큼만 움직인다.
     정지 화면에서는 틀 = canvas 전체라 아무것도 잘리지 않는다 (사각 clip → mask/clip-path 와 달리 매 프레임 paint 없음) */
  const factorOf = (sc, depth) => { const p = sc.cfg.parallax || {}; return SC.parallax && !TEST.flat && p[depth] != null ? p[depth] : 1; };
  const framed = {};   // panel index → { el, f, keys:Set }
  const FRAME_INSET = 2;   // 48차: 틀 좌우 안쪽 여백 (scene px)
  SC.panels.forEach((id, i) => {
    const sc = SCENES[id], panel = panels[i];
    if (!sc || !panel || !(sc.camEl || sc.cfg.frameBox) || !sc.cfg.frame) return;
    const fF = factorOf(sc, sc.cfg.frame);
    const inner = sc.cfg.layers.filter((l) => factorOf(sc, l.depth) < fF).map((l) => panel.querySelector(sc.sel(l.key))).filter(Boolean);
    if (!inner.length) return;
    /* 48차: 틀 좌우를 FRAME_INSET(scene px)만큼 안쪽으로. 방 레이어(MiddleView 등)의 좌우 끝은 이동 중 소수 px 위치라 1px 가 반투명(AA)으로 그려지는데,
       clip 은 px 단위로 잘려 그 1px 뒤로 틀 안의 하늘이 비쳐 '얇은 세로선'이 보였다 (Main3 y<912, Main7 <590, Main8 <574, Main9 <645 에서만).
       2px 안쪽에서 자르면 그 1px 뒤에는 하늘 대신 빈 공간 배경만 남는다. 정지 화면에서는 canvas 끝 2px 가 화면 밖이라 변화 없음 */
    const ins = FRAME_INSET;
    /* 355차: frameBox [x, w] = 틀을 canvas 전체 대신 방 레이어의 불투명한 가로 범위로 (Main2: 하늘이 이동 중 벽 오른쪽 fade·빈 공간으로 삐져나와 세로 띠로 보이던 것) */
    const fb = sc.cfg.frameBox, fx0 = fb ? fb[0] : ins, fw = fb ? fb[1] : sc.cfg.scene.w - ins * 2;
    const fr = document.createElement('div');
    fr.className = 'sc-frame';
    fr.style.left = px(fx0); fr.style.width = px(fw); fr.style.height = px(sc.cfg.scene.h);
    const frIn = document.createElement('div');            // 안쪽 레이어 좌표를 canvas 기준으로 되돌리는 wrapper (그림 없음)
    frIn.className = 'sc-frame-in';
    frIn.style.left = px(-fx0);
    fr.appendChild(frIn);
    inner[0].parentNode.insertBefore(fr, inner[0]);
    inner.forEach((el) => frIn.appendChild(el));
    framed[i] = { el: fr, f: fF, els: new Set(inner) };
  });

  const depthLayers = SC.panels.map((id, i) => {
    const sc = SCENES[id], panel = panels[i];
    if (!sc || !panel) return [];
    const seen = new Set(), F = framed[i];
    const list = sc.cfg.layers.map((l) => {
      const layerEl = panel.querySelector(sc.sel(l.key));
      const el = l.group && layerEl ? layerEl.parentNode : layerEl;
      let factor = factorOf(sc, l.depth);
      if (F && F.els.has(el)) factor = factor - F.f + 1;     // 틀 안: 틀(frame 배율)에 대한 상대 이동
      return { el, key: (l.group ? 'group:' + l.group : l.key) + '(' + l.depth + ')', factor };
    });
    if (F) list.unshift({ el: F.el, key: 'frame(' + sc.cfg.frame + ')', factor: F.f });
    return list.filter((o) => o.el && o.factor !== 1 && !seen.has(o.el) && seen.add(o.el));
  });
  depthLayers.forEach((list) => list.forEach((o) => o.el.classList.add('is-depth')));

  // 41차: 연결 구간 = 장면 쌍마다 { gap(원경 plane 폭), background(빈 공간 색) }. DOM·compositor layer 를 만들지 않는다
  const TR = SC.transitions || {};
  const gaps = [];
  for (let i = 0; i < SC.panels.length - 1; i++) {
    const c = TR[`${SC.panels[i]}|${SC.panels[i + 1]}`] || {};
    gaps.push({ gap: c.gap != null ? c.gap : 0, bg: c.background || SC.gapBackground || '' });
  }

  /* ---------- camera / world layout ---------- */
  function coverCamera(cam, vw, vh) {
    const cr = cam.coverRect;
    const s = Math.max(vw / cr.w, vh / cr.h);
    const W = vw / s, H = vh / s;
    const L = clamp(cam.focus.x - W / 2, cr.x, cr.x + cr.w - W);
    const T = clamp(cam.focus.y - H / 2, cr.y, cr.y + cr.h - H);
    return { s, x: -L * s, y: -T * s };
  }

  /* 46차: 장면이 정지했을 때 각 레이어(그림 box)의 화면 x 범위 { f, l, r } — layout() 의 최소 간격 계산용.
     화면 x = 이동량 d × 배율 f + (box x × camera 배율 + camera x).  frame 안 레이어는 틀(canvas 전체, frame 배율)로 대신한다 */
  const SAFE = 20;        // 이웃 장면과 화면 끝 사이 최소 여백 (1080 높이 기준 px)
  function restExtents(id, vw, vh) {
    const sc = SCENES[id];
    if (!sc) return [];
    const k = coverCamera(sc.cfg.camera, vw, vh);          // Main2 = 책 열기 끝의 fullscreen camera 와 같은 계산
    const fF = sc.cfg.frame && !sc.cfg.frameBox ? factorOf(sc, sc.cfg.frame) : null;   // 355차: frameBox 장면은 간격 계산을 예전 그대로 (그림 box 기준)
    const out = [];
    sc.cfg.layers.forEach((l) => {
      if (!l.enabled || !l.box) return;
      const f = factorOf(sc, l.depth);
      if (fF != null && f < fF) return;
      out.push({ f, l: k.x + l.box[0] * k.s, r: k.x + (l.box[0] + l.box[2]) * k.s });
    });
    if (fF != null) out.push({ f: fF, l: k.x + FRAME_INSET * k.s, r: k.x + (sc.cfg.scene.w - FRAME_INSET) * k.s });
    return out;
  }

  let X = [0];            // 장면별 정착 cam 위치 (viewport px)
  let sceneScale = [], farF = [];   // resize 때 캐시
  let cam = 0;            // 현재 카메라 위치 = 모든 레이어가 공유하는 하나의 horizontal progress
  let idx = 0;            // 마지막으로 정착한 장면 index
  function layout() {
    const vw = window.innerWidth, vh = window.innerHeight, u = vh / 1080;
    const c = coverCamera(M5.camera, vw, vh);
    root.style.setProperty('--m5-s', c.s.toFixed(6));
    root.style.setProperty('--m5-x', px(c.x.toFixed(2)));
    root.style.setProperty('--m5-y', px(c.y.toFixed(2)));
    // 45차: 일반 장면 camera (Main5 와 같은 cover 계산, panel 의 .story-camera 에 직접)
    SC.panels.forEach((id) => {
      const sc = SCENES[id];
      if (!sc || !sc.camEl) return;
      const k = coverCamera(sc.cfg.camera, vw, vh);
      sc.s = k.s;
      sc.camEl.style.transform = `translate(${k.x.toFixed(2)}px, ${k.y.toFixed(2)}px) scale(${k.s.toFixed(6)})`;
    });
    sceneScale = SC.panels.map((id) => (SCENES[id] ? SCENES[id].scale() : 1));
    farF = SC.panels.map((id) => (SC.parallax && SCENES[id] ? farOf(id) : 1));
    X = [0];
    const ext = SC.panels.map((id) => restExtents(id, vw, vh));
    for (let i = 1; i < SC.panels.length; i++) {
      const gap = gaps[i - 1].gap * u;
      const fBase = (farOf(SC.panels[i - 1]) + farOf(SC.panels[i])) / 2;
      // 46차: 정지 화면에 이웃 장면이 들어오지 않는 최소 간격 보장. 16:9 보다 좁은 화면(cover 가 좌우를 더 자름)에서만 config gap 보다 커짐
      let need = 0;
      ext[i].forEach((L) => { need = Math.max(need, (vw - L.l + SAFE * u) / L.f); });        // 앞 장면 정지: 다음 장면 왼쪽 끝 ≥ 화면 오른쪽
      ext[i - 1].forEach((L) => { need = Math.max(need, (L.r + SAFE * u) / L.f); });         // 다음 장면 정지: 앞 장면 오른쪽 끝 ≤ 화면 왼쪽
      X.push(X[i - 1] + Math.max((vw + gap) / fBase, need));
    }
    vwC = vw; uC = u;
    cam = X[idx];
    last = {};
    render();
  }

  /* 매 프레임: transform 값만 쓴다 (translate3d / scaleX). layout 을 읽지 않고, 값이 같으면 다시 쓰지 않는다.
     화면 크기·장면 위치·scale 은 layout()(초기화·resize)에서 계산해 캐시 */
  let vwC = window.innerWidth, uC = window.innerHeight / 1080, last = {};
  const put = (el, key, prop, val) => { if (last[key] !== val) { last[key] = val; el.style[prop] = val; } };
  function render() {
    const vw = vwC, u = uC;
    SC.panels.forEach((id, i) => {
      const p = panels[i];
      if (!p) return;
      const d = X[i] - cam;                                   // 이 장면이 정착 위치에서 벗어난 양 (배율 1 기준)
      put(p, 'v' + i, 'visibility', Math.abs(d) > vw * 3 ? 'hidden' : '');
      put(p, 't' + i, 'transform', `translate(${d.toFixed(2)}px, 0)`);
      const s = sceneScale[i];
      depthLayers[i].forEach((o, j) => {
        // 레이어 추가 이동 = d × (배율 − 1)  (panel 안, scene 좌표 → ÷ scale)
        put(o.el, 'l' + i + '_' + j, 'transform', `translate(${((d * (o.factor - 1)) / s).toFixed(2)}px, 0)`);
      });
    });
    // 41차: 빈 공간 색 — 화면 가운데에 가장 가까운 연결 구간(원경 plane 의 A ~ B)의 색. 값이 바뀔 때만 style 을 쓴다
    if (gaps.length) {
      let best = 0, bd = Infinity;
      gaps.forEach((g, i) => {
        const A = (X[i] - cam) * farF[i] + vw, B = (X[i + 1] - cam) * farF[i + 1];
        const dd = Math.abs((A + B) / 2 - vw / 2);
        if (dd < bd) { bd = dd; best = i; }
      });
      if (gaps[best].bg) put(stage, 'gapbg', 'backgroundColor', gaps[best].bg);
    }
  }

  // 현재·이웃 장면만 compositor layer 유지 (정지 중에 미리 올려 두어 이동 시작 순간의 raster 를 피함)
  function setLive(center, on) {
    if (TEST.nolive) on = false;
    SC.panels.forEach((id, i) => {
      const live = on && Math.abs(i - center) <= 1;
      if (panels[i]) panels[i].classList.toggle('is-live', live);
    });
  }
  window.addEventListener('curo:page', (e) => {
    // 119차: Main10(책 뒤표지)에 있는 동안은 Main9 를 그대로 준비 (뒤표지를 열면 바로 Main9)
    const i = e.detail.page === 'main10' ? SC.panels.length - 1 : SC.panels.indexOf(e.detail.page);
    setLive(i < 0 ? 0 : i, i >= 0);          // STORY 밖(MAIN)에서는 모두 해제 (GPU 메모리)
    activate(i < 0 ? 0 : i);                 // 45차: 현재 ±preload.load 장면 이미지 내려받기 시작
    prepare(i < 0 ? 0 : i);                  // 40차: 현재·이웃 장면 이미지 decode (MAIN 에서는 첫 장면 기준 = Main2·Main3)
  });

  /* ---------- 확인용 (?perf) ----------
     js/perf.js 가 window.CURO_PERF_HOOK 를 걸면 매 frame 최종 transform 값을 넘긴다. 평소에는 아무 일도 하지 않음 */
  const HOOK = () => window.CURO_PERF_HOOK || null;
  function snapshot() {
    const o = {};
    SC.panels.forEach((id, i) => {
      o[id + ':scene'] = +(X[i] - cam).toFixed(2);
      depthLayers[i].forEach((l) => { o[id + ':' + l.key] = +(((X[i] - cam) * (l.factor - 1)) / sceneScale[i] + (X[i] - cam)).toFixed(2); });
    });
    return o;
  }

  /* ---------- 이동 ---------- */
  let busy = false;
  function go(from, to) {
    const i0 = SC.panels.indexOf(from), i1 = SC.panels.indexOf(to);
    if (i0 < 0 || i1 < 0 || busy) return Promise.resolve(false);
    busy = true;
    root.classList.add('is-story-moving');
    // 45차: 이동 중에는 출발·도착 장면만 compositor layer 유지 (반대쪽 이웃은 도착 후 어차피 해제됨 → 장면 3개 분량 texture 를 2개로)
    if (!TEST.nolive) panels.forEach((p, k) => { if (p && k !== i0 && k !== i1) p.classList.remove('is-live'); });
    const o = { c: X[i0] };
    const dist = X[i1] - X[i0];
    if (HOOK()) HOOK().start(from, to, t0 => t0);
    return new Promise((res) => {
      const t = window.CURO_ANIM.timeline({
        onUpdate: () => {
          cam = o.c; render();
          const prog = dist ? (cam - X[i0]) / dist : 1;
          if (HOOK()) HOOK().frame(prog, cam, snapshot());
        },
        onComplete: () => {
          idx = i1; cam = X[i1]; render();
          root.classList.remove('is-story-moving');
          busy = false;
          if (HOOK()) HOOK().end(from, to);
          res(true);
          // 28차: 이동 완료(모든 레이어가 최종 위치에 render 된 뒤) → 이 이벤트로 텍스트 등장 시작 (story-text.js)
          window.dispatchEvent(new CustomEvent('curo:page', { detail: { page: to, via: 'story' } }));
        }
      });
      t.to(o, { c: X[i1], duration: SC.slide.duration * Math.abs(i1 - i0), ease: SC.slide.ease }, 0);
      t.timeScale(window.CURO_DEBUG_TIMESCALE || 1);
      t.play();
    });
  }

  window.addEventListener('resize', layout);
  layout();

  window.CURO_STORY = {
    go,
    panels: () => SC.panels.slice(),
    has: (id) => SC.panels.includes(id),
    isBusy: () => busy,
    position: () => (X.length > 1 ? cam / X[X.length - 1] * (X.length - 1) : 0),   // 대략적인 장면 index (소수 = 이동 중)
    camera: () => ({ cam, X: X.slice() }),
    // 확인용: 두 장면 사이 진행률 p (0 = 첫 장면, 1 = 마지막 장면 — 장면 index 기준 선형)
    seek: (p) => {
      if (busy) return;
      const i = clamp(Math.floor(p), 0, X.length - 2), f = p - i;
      cam = X[i] + (X[i + 1] - X[i]) * f; render();
    },
    rerender: () => render(),
    perf: () => perfLog.slice()
  };
})();
