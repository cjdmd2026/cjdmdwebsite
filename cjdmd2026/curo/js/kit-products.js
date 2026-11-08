/* ==========================================================================
   CURO KIT 제품 (80차, 81차 수정) — 0번 'CURO 키트 안에 무엇이 들어있을까?' + 1번 제품 슬라이드 5종
   내용·이미지·좌표 = js/kit-config.js 의 products. 세로 snap 은 kit.js (이 파일보다 뒤에 로드).
   - 0번: 평소 동화풍 그림. 그림 모양 위에 마우스 → 실물 사진 + 동그라미가 조금 커지며 막대가 자라 돋보기 + 이름.
          스크롤로는 넘어가지 않음 — 제품을 눌러야 1번에서 그 제품 (kit.js go(…, force))
   - 1번: 원 + 제품 = 카드. 오른쪽 화살표 · 오른쪽 끝 다음 제품 · 페이지 점 · ←/→ 키로 전환.
          전환 = 오른쪽 끝의 다음 제품 카드가 가운데로 오면서 커지며 자리잡고, 오른쪽에서 그다음 제품이 들어옴
   - 벨트 외 제품(detail: false)을 보고 있으면 아래(2~4번)로 내려가지 않음 → window.CURO_KIT_LOCK (kit.js 가 사용)
   ========================================================================== */
(function () {
  'use strict';
  if (window.matchMedia && matchMedia('(max-width: 600px)').matches) return;   // 184차: 폰은 js/kit-mobile.js 화면
  const K = window.CURO_KIT || {};
  const P = K.products || [];
  if (!P.length) return;
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const N = P.length;
  const mod = (i) => ((i % N) + N) % N;
  let cur = Math.max(0, P.findIndex((p) => p.id === (K.startProduct || 'belt')));

  /* =================== 1번 제품 슬라이드 =================== */
  const s1 = $('k1');
  const title = $('k1-title'), body = $('k1-body'), label = $('k1-label'), price = $('k1-price');
  const dots = $('k1-dots'), cardsEl = $('k1-cards'), aMain = $('k1-anchor-main'), aPeek = $('k1-anchor-peek');
  dots.innerHTML = P.map((p, i) => `<li><button type="button" data-i="${i}" aria-label="${esc(p.name)}"></button></li>`).join('');
  const AR = P.map(() => 1);                                 // 1번 이미지 비율 (contain 계산용)
  P.forEach((p, i) => { const im = new Image(); im.onload = () => { AR[i] = im.naturalWidth / im.naturalHeight; place(); }; im.src = p.img; });

  // --- 글 ---
  function fillText(i) {
    const p = P[i];
    title.innerHTML = p.title; body.innerHTML = p.body; label.textContent = p.label;
    price.classList.toggle('is-empty', !p.price);
    price.querySelector('strong').textContent = p.price || '';
    dots.querySelectorAll('li').forEach((li, j) => {
      li.classList.toggle('is-active', j === i);
      const b = li.querySelector('button'); if (j === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
    root.classList.toggle('kit-locked', !p.detail);
    s1.style.setProperty('--k1-ay', p.ay || 0);
    root.dataset.kitProduct = p.id;
  }

  // --- 카드 (원 + 제품) ---
  // 상태: main(가운데) / peek(오른쪽 끝, 원 0.3 · 제품 0.5) / enter(peek 보다 오른쪽 화면 밖) / out(가운데에서 왼쪽으로 작아지며 사라짐) / gone(peek 자리에서 사라짐)
  const cards = [];
  function makeCard(i, state) {
    const el = document.createElement('div');
    el.className = 'k1-card';
    el.innerHTML = '<div class="k1-card-c"></div><img class="k1-card-p" alt="" decoding="async">';
    el.querySelector('.k1-card-c').style.background = P[i].color;
    const im = el.querySelector('img'); im.src = P[i].img; im.alt = P[i].title.replace(/<br>/g, ' ');
    cardsEl.appendChild(el);
    const c = { el, i, state };
    el.addEventListener('click', () => { if (c.state === 'peek') show(cur + 1, false, 1); });
    cards.push(c);
    return c;
  }
  let R = null;                                               // 틀 크기 (kf 기준 px)
  function measure() {
    const f = cardsEl.getBoundingClientRect(), m = aMain.getBoundingClientRect(), q = aPeek.getBoundingClientRect();
    R = { m: { x: m.left - f.left, y: m.top - f.top, w: m.width }, q: { x: q.left - f.left, y: q.top - f.top, w: q.width } };
  }
  const vis = (w, h, ar) => Math.min(w, h * ar);              // object-fit: contain 일 때 실제 그림 폭
  function apply(c) {
    if (!R) return;
    const p = P[c.i], ar = AR[c.i], M = R.m, Q = R.q;
    const su = M.w / 617, sq = Q.w / 300;
    // 원 중심 y 는 제품마다 피그마 값(cy), 다음 제품 원은 지금 가운데 제품의 qy 기준
    const mcx = M.x + M.w / 2, mcy = M.y + M.w / 2 + ((p.cy || 520.5) - 520.5) * su;
    const qcx = Q.x + Q.w / 2, qcy = Q.y + Q.w / 2 + ((P[cur].qy || 556) - 556) * su;
    const Qy = qcy - Q.w / 2;
    // 기준(가운데) 크기로 놓고 transform 으로 상태별 이동
    const circ = c.el.children[0], img = c.el.children[1];
    circ.style.width = circ.style.height = M.w + 'px';
    circ.style.left = M.x + 'px'; circ.style.top = (mcy - M.w / 2) + 'px';
    const [bl, bt, bw, bh] = p.box;
    const pb = { x: mcx + bl * su, y: mcy + bt * su, w: bw * su, h: bh * su };
    img.style.left = pb.x + 'px'; img.style.top = pb.y + 'px'; img.style.width = pb.w + 'px'; img.style.height = pb.h + 'px';
    const [ql, qt, qw, qh] = p.peek;
    const pq = { x: Q.x + ql * sq, y: Qy + qt * sq, w: qw * sq, h: qh * sq };
    const kc = Q.w / M.w, kp = vis(pq.w, pq.h, ar) / vis(pb.w, pb.h, ar);
    const peekC = `translate3d(${qcx - mcx}px, ${qcy - mcy}px, 0) scale(${kc})`;
    const peekP = `translate3d(${pq.x + pq.w / 2 - (pb.x + pb.w / 2)}px, ${pq.y + pq.h / 2 - (pb.y + pb.h / 2)}px, 0) scale(${kp})`;
    const dx = Q.w * 1.25;
    let tc = 'none', tp = 'none', oc = 1, op = 1;
    if (c.state === 'peek') { tc = peekC; tp = peekP; oc = 0.3; op = 0.5; }
    else if (c.state === 'enter') { tc = `translate3d(${dx}px, 0, 0) ` + peekC; tp = `translate3d(${dx}px, 0, 0) ` + peekP; oc = 0; op = 0; }
    else if (c.state === 'gone') { tc = peekC; tp = peekP; oc = 0; op = 0; }
    else if (c.state === 'out') { tc = `translate3d(${-M.w * 0.14}px, 0, 0) scale(0.86)`; tp = tc; oc = 0; op = 0; }
    else if (c.state === 'pre') { tc = 'scale(0.9)'; tp = 'scale(0.9)'; oc = 0; op = 0; }   // 84차: 이전으로 갈 때 새 가운데 카드 시작 (제자리, 작게·투명)
    circ.style.transform = tc; img.style.transform = tp; circ.style.opacity = oc; img.style.opacity = op;
    c.el.classList.toggle('is-peek', c.state === 'peek');
    c.el.style.zIndex = c.state === 'main' ? 2 : (c.state === 'out' || c.state === 'pre') ? 1 : 3;
  }
  function place() { measure(); cards.forEach(apply); }

  // 처음: 가운데 = cur, 오른쪽 = cur + 1
  makeCard(cur, 'main'); makeCard(mod(cur + 1), 'peek');
  fillText(cur); place();

  let busy = 0;
  // dir: 1 = 다음(오른쪽 카드가 가운데로 오며 커짐), -1 = 이전(가운데 카드가 줄며 오른쪽으로 빠지고, 고른 제품이 가운데에 나타남)
  function show(i, instant, dir) {
    i = mod(i);
    if (i === cur && !instant) return;
    if (!dir) dir = i > cur ? 1 : -1;
    cur = i;
    fillText(i);                                               // 83차: 글·버튼은 효과 없이 바로
    measure();
    if (instant) {                                             // 0번에서 눌러 들어올 때: 바로 그 상태로
      cards.splice(0).forEach((c) => c.el.remove());
      makeCard(i, 'main'); makeCard(mod(i + 1), 'peek'); cards.forEach(apply);
      return;
    }
    let mainC = cards.find((c) => c.state === 'main');
    let peekC = cards.find((c) => c.state === 'peek');
    const plan = [];                                           // [card, 다음 상태]
    if (dir > 0) {
      // 오른쪽 끝 카드가 i 가 아니면(점으로 건너뛸 때) i 카드를 오른쪽 밖에서 시작, 원래 오른쪽 카드는 사라짐
      if (!peekC || peekC.i !== i) {
        if (peekC) plan.push([peekC, 'gone']);
        peekC = makeCard(i, 'enter');
      }
      if (mainC) plan.push([mainC, 'out']);
      plan.push([peekC, 'main']);
      plan.push([makeCard(mod(i + 1), 'enter'), 'peek']);
    } else {
      // 이전: 새 가운데 카드는 왼쪽에서 작게·투명하게 시작 → 가운데로
      const inC = makeCard(i, 'pre');
      // 84차: 겹치지 않게 — 가운데 카드가 먼저 줄며 오른쪽으로 빠지고, 새 카드는 조금 뒤 제자리에서 커지며 나타남 (92차: 0.15초 뒤, 0.6초)
      // 93차: 다음 전환과 같은 속도·곡선(0.9초, cubic-bezier(0.62,0,0.3,1)). 새 카드만 0.12초 늦게 출발해 0.9초에 같이 끝남(겹침 방지)
      inC.el.style.setProperty('--kd', '0.12s'); inC.el.style.setProperty('--kt', '0.78s');
      if (mainC && mainC.i === mod(i + 1)) {                   // 바로 앞 제품: 지금 가운데가 오른쪽 '다음 제품' 자리로 줄며 이동
        plan.push([mainC, 'peek']);
        if (peekC) plan.push([peekC, 'enter']);                // 원래 오른쪽 카드는 화면 밖으로
      } else {
        if (mainC) plan.push([mainC, 'gone']);                 // 가운데 카드: 오른쪽으로 줄며 사라짐
        if (peekC) plan.push([peekC, 'enter']);
        plan.push([makeCard(mod(i + 1), 'enter'), 'peek']);
      }
      plan.push([inC, 'main']);
    }
    cards.forEach(apply);
    void cardsEl.offsetWidth;                                  // 시작 상태 확정
    requestAnimationFrame(() => {
      cards.forEach((c) => c.el.classList.add('is-anim'));
      plan.forEach(([c, st]) => { c.state = st; apply(c); });
      const token = ++busy;
      setTimeout(() => {
        if (token !== busy) return;
        for (let k = cards.length - 1; k >= 0; k--) {
          const c = cards[k];
          if (c.state !== 'main' && c.state !== 'peek') { c.el.remove(); cards.splice(k, 1); }
          else { c.el.classList.remove('is-anim'); ['--kd', '--kt', '--ko', '--ke'].forEach((v) => c.el.style.removeProperty(v)); }
        }
      }, 1150);
    });
  }
  $('k1-next').addEventListener('click', () => show(cur + 1, false, 1));
  dots.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) show(+b.dataset.i); });
  document.addEventListener('keydown', (e) => {
    const api = window.CURO_KIT_API;
    if (!api || api.current() !== 1 || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target && e.target.closest && e.target.closest('input, textarea, .k-chat, .menu-panel')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, false, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, false, -1); }
  });
  // 240차: 창 크기를 바꾸면 kit.js 가 배율(--su 등)을 다시 넣은 '뒤에' 재야 함 (먼저 재면 이전 크기로 카드가 어긋나 남음) → 다음 프레임 + 멈춘 뒤 한 번 더
  let rsT = 0;
  window.addEventListener('resize', () => {
    cards.forEach((c) => c.el.classList.remove('is-anim'));
    requestAnimationFrame(place);
    clearTimeout(rsT); rsT = setTimeout(place, 160);
  });
  window.CURO_KIT_LOCK = () => !P[cur].detail;
  window.CURO_KIT_PRODUCTS = { show, current: () => P[cur].id };

  /* =================== 0번 장면 =================== */
  const s0 = $('k0'), itemsEl = $('k0-items'), spotsEl = $('k0-spots');
  if (!s0) return;
  // 89차: 피그마 좌표 → 새(더 넓은) 배경 좌표 (kit-config.js k0map)
  const MAP = K.k0map || { scale: 1, x: 0, y: 0 };
  P.forEach((p) => {
    const b = p.k0.box, sp = p.k0.spot, k = MAP.scale;
    p.k0 = Object.assign({}, p.k0, { box: [MAP.x + b[0] * k, MAP.y + b[1] * k, b[2] * k, b[3] * k], spot: [MAP.x + sp[0] * k, MAP.y + sp[1] * k] });
  });
  itemsEl.innerHTML = P.map((p, i) => {
    const [x, y, w, h] = p.k0.box;
    return `<button class="k0-item" type="button" data-i="${i}" style="--x:${x}px;--y:${y}px;--w:${w}px;--h:${h}px;--z:${p.k0.z}" aria-label="${esc(p.name)} 자세히 보기">`
      + `<img class="k0-ill" src="${esc(p.k0.ill)}" alt="" decoding="async"><img class="k0-real" src="${esc(p.k0.real)}" alt="" decoding="async"></button>`;
  }).join('');
  // 동그라미 + 돋보기 막대 (같은 동그라미가 커지고 막대가 자람) — export 된 돋보기 아이콘이 없어 inline SVG
  const MAG = '<svg class="k0-mag" viewBox="0 0 62 66" aria-hidden="true"><circle class="k0-mag-c" cx="24" cy="24" r="19.5"/><path class="k0-mag-h" d="M39.5 40.5L52 55"/></svg>';
  spotsEl.innerHTML = P.map((p) => `<span class="k0-spot" style="--cx:${p.k0.spot[0]}px;--cy:${p.k0.spot[1]}px">${MAG}<span class="k0-name">${esc(p.name)}</span></span>`).join('');
  const items = Array.from(itemsEl.children), spots = Array.from(spotsEl.children);
  // 329차: 배경과 제품 그림이 다 준비된 뒤 한 번에 보이게 (제품이 늦게 '툭' 나타나 깜빡여 보이던 것)
  (function () {
    const st = $('k0-stage'), imgs = [s0.querySelector('.k0-scene img'), ...itemsEl.querySelectorAll('.k0-ill')].filter(Boolean);
    const done = () => st && st.classList.add('is-loaded');
    Promise.all(imgs.map((im) => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()))).then(done);
    setTimeout(done, 1500);
  })();

  // 88차 배율: 장면(배경+제품+글)은 항상 화면을 빈틈없이 덮음(cover) — 흐린 배경으로 늘리는 것 없음, 남는 부분은 잘림.
  //   세로 위치: 인형 위(피그마 y 199)가 메뉴 아래 30 이상 띄고, 마우스 아이콘 아래(1045)가 화면 안에 들어오게.
  //   둘 다 안 되는 낮은 창이면 그 가운데. 가로는 가운데 (좁은 창에서는 양옆이 잘림)
  let k0s = 1, k0x = 0, k0y = 0;
  function layout0() {
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    const navH = parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 0;
    k0s = Math.max(vw / 1920, vh / 1080);
    k0x = (vw - 1920 * k0s) / 2;
    const lo = vh - 1024 * k0s;                           // 이보다 위로 올리면 글·마우스가 화면 아래로 잘림 (89차: 새 배경 기준 마우스 아래 1024)
    const hi = navH + 30 - 243 * k0s;                     // 이보다 위로 올리면 인형이 메뉴에 붙음 (89차: 새 배경 기준 인형 위 243)
    let y = lo <= hi ? Math.min(hi, Math.max(lo, (lo + hi) / 2)) : (lo + hi) / 2;
    if (lo <= hi) y = Math.max(lo, Math.min(hi, vh - 1080 * k0s > lo ? vh - 1080 * k0s : (lo + hi) / 2));
    y = Math.min(y, 0);                                   // 장면 위 끝이 화면 위보다 내려오지 않게
    y = Math.max(y, vh - 1080 * k0s);                     // 장면 아래 끝이 화면 아래보다 올라오지 않게
    k0y = y;
    s0.style.setProperty('--k0s', k0s.toFixed(5));
    s0.style.setProperty('--k0x', k0x.toFixed(2) + 'px');
    s0.style.setProperty('--k0y', k0y.toFixed(2) + 'px');
    const line = (vw - 1360 * Math.min(1, vw / 1920)) / 2;                    // 제목 왼쪽 끝 = 메뉴 라인
    const tl = Math.max(24 / k0s - k0x / k0s, (line - k0x) / k0s);
    s0.style.setProperty('--k0line', tl.toFixed(1) + 'px');
    // 안내 문구 가운데 = 피그마 960, 단 좁은 창에서 제목(폭 약 410)과 겹치면 오른쪽으로 비킴
    s0.style.setProperty('--k0hx', Math.max(960, tl + 410 + 40 + 105).toFixed(1) + 'px');
  }
  window.addEventListener('resize', layout0); layout0();

  // 그림 모양 판정 — js/kit-masks.js 의 미리 계산한 비트맵 (파일로 열어도 동작)
  const MASKS = window.CURO_KIT_MASKS || {};
  const hits = P.map((p) => {
    const m = MASKS[p.id]; if (!m) return null;
    const bin = atob(m.b), bytes = new Uint8Array(bin.length);
    for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
    return { w: m.w, h: m.h, bytes, ar: m.w / m.h };
  });
  const bit = (o, x, y) => { const n = y * o.w + x; return (o.bytes[n >> 3] >> (7 - (n & 7))) & 1; };
  function hitAt(dx, dy) {
    const order = P.map((p, i) => i).sort((a, b) => P[b].k0.z - P[a].k0.z);
    for (const i of order) {
      const p = P[i], [x, y, w, h] = p.k0.box, [sx, sy] = p.k0.spot;
      if ((dx - sx) ** 2 + (dy - sy) ** 2 < 30 * 30) return i;                 // 동그라미 위
      if (dx < x || dy < y || dx > x + w || dy > y + h) continue;
      const o = hits[i];
      if (!o) return i;
      let iw = w, ih = w / o.ar; if (ih > h) { ih = h; iw = h * o.ar; }
      const lx = (dx - x - (w - iw) / 2) / iw, ly = (dy - y - (h - ih) / 2) / ih;
      if (lx < 0 || ly < 0 || lx >= 1 || ly >= 1) continue;
      if (bit(o, Math.floor(lx * o.w), Math.floor(ly * o.h))) return i;
    }
    return -1;
  }
  let on = -1;
  function setOn(i) {
    if (i === on) return;
    on = i;
    items.forEach((el, j) => el.classList.toggle('is-on', j === i));
    spots.forEach((el, j) => el.classList.toggle('is-on', j === i));
    s0.classList.toggle('is-pointer', i >= 0);
  }
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  s0.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && !fine.matches) return;
    if (e.target.closest && e.target.closest('.k-float, .k-chat')) { setOn(-1); return; }
    setOn(hitAt((e.clientX - k0x) / k0s, (e.clientY - k0y) / k0s));
  });
  s0.addEventListener('pointerleave', () => setOn(-1));
  function open(i) {
    show(i, true);
    setOn(-1);
    const api = window.CURO_KIT_API;
    // 86차: 스크롤·페이드 없이 바로 이동. 0번 → 1번은 제품을 눌렀을 때만(force)
    if (api) api.go(1, 0, true);
  }
  s0.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('.k-float, .k-chat')) return;
    const b = e.target.closest && e.target.closest('.k0-item');
    const i = b ? +b.dataset.i : hitAt((e.clientX - k0x) / k0s, (e.clientY - k0y) / k0s);
    if (i >= 0) open(i);
  });
  items.forEach((b, i) => {
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) setOn(i); });
    b.addEventListener('blur', () => setOn(-1));
  });
})();
