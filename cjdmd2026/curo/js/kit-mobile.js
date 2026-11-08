/* ==========================================================================
   CURO KIT — 폰(600px 이하) 전용 화면 (184차, 180차 모바일 시안 v4)
   PC 의 한 화면씩 넘기는 구성(k0~k4)은 폰에서 숨기고, 여기서 만든 화면을 씀:
     · 목록 = 벤토 그리드 (제품 5개) → 누르면 그 제품 상세 (주소 #p-제품id, 뒤로 가기 = 목록)
     · 상세 = '키트 목록' + 표시(기본 제공품 등) + 제목·설명 + 원 + 제품 (+ 가격)
              벨트(detail: true)만 아래로 안전한 설계 · #01~#03 · 안심 · 사용 방법 · 접기(제품 정보 · 주의사항)
     · 아래 고정 바 = 공유 + 렌탈 하러가기 (PROGRAM 과 같은 모양)
   내용 = js/kit-config.js (products, k3.slides) + kit.html 의 k4 (복사해서 씀). 폰 전용 그림 = assets/images/kit/mobile/
   kit.js · kit-products.js 는 폰에서 실행하지 않음 (맨 앞에서 return)
   ========================================================================== */
(function () {
  'use strict';
  if (!window.matchMedia || !matchMedia('(max-width: 600px)').matches) return;
  const K = window.CURO_KIT || {};
  const P = K.products || [];
  const root = document.documentElement;
  const host = document.getElementById('km');
  if (!host || !P.length) return;
  root.classList.add('kit-phone');
  host.hidden = false;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const arrow = (d) => `<svg viewBox="0 0 10 16" aria-hidden="true"><path d="${d === 'l' ? 'M8 2L2 8l6 6' : 'M2 2l6 6-6 6'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---------- 목록 타일 (폰 전용 값: 배경색 · 짧은 설명 · 그림 위치) ---------- */
  const TILE = {
    belt:   { cls: 'is-wide', bg: '#F6F0E6', sub: '위치·유지 시간 실시간 피드백', img: 'assets/images/kit/products/belt-layout.webp?v=81', st: 'width:250px;right:-14px;bottom:10px' },
    book:   { cls: 'is-tall', bg: '#DCEEE9', sub: '콩이와 큐로 가디언즈', img: 'assets/images/kit/products/book-real.webp?v=332', st: 'width:200px;left:10px;bottom:4px' },
    doll:   { cls: '', bg: '#F8EDDD', sub: '', img: 'assets/images/kit/products/doll-real.webp?v=80', st: 'width:92px;right:4px;bottom:-16px' },
    cap:    { cls: '', bg: '#FFF5E5', sub: '', img: 'assets/images/kit/products/cap-layout.webp?v=80', st: 'width:96px;right:-2px;bottom:-20px' },
    assist: { cls: 'is-wide is-short', bg: '#E1EEF2', sub: '', img: 'assets/images/kit/products/assist-real.webp?v=80', st: 'width:118px;right:58px;bottom:2px' }
  };
  const ORDER = ['belt', 'book', 'doll', 'cap', 'assist'];
  const byId = (id) => P.find((p) => p.id === id);

  const tiles = ORDER.map((id) => {
    const p = byId(id), t = TILE[id]; if (!p) return '';
    const badge = p.label && p.label !== '기본 제공품' ? `<em>${esc(p.label.replace(' 상품', ''))}</em>` : '';
    const sub = p.price || t.sub;
    return `<a class="km-tile ${t.cls}" href="#p-${id}" style="--bg:${t.bg}"><span class="km-tile-t">${badge}<b>${esc(p.name)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</span><img src="${t.img}" style="${t.st}" alt="" loading="lazy" decoding="async"><i class="km-go" aria-hidden="true"></i></a>`;
  }).join('');

  /* ---------- 상세 아래 내용 (238차: 제품별 — kit.html 의 .k4f.kp-제품 · .kp-제품 2번 글을 복사해 씀) ---------- */
  const k4 = document.getElementById('k4');
  function k4Parts(id) {
    const blk = k4 ? k4.querySelector('.k4f.kp-' + id) : null;
    const q = (s) => (blk ? blk.querySelector(s) : null);
    const ph = q('.k4-ph-main');
    return {
      photo: ph ? `<div class="km-safe"><img src="${ph.getAttribute('src')}" alt="${esc(ph.alt)}" loading="lazy" decoding="async"></div>` : '',
      checks: q('.k4-checks') ? [...q('.k4-checks').querySelectorAll('li')].map((li) => `<li><img src="assets/icons/check-box.svg" alt="">${esc(li.textContent.trim())}</li>`).join('') : '',
      steps: q('.k4-steps') ? [...q('.k4-steps').querySelectorAll('li')].map((li) => `<li><img src="${li.querySelector('img').getAttribute('src')}" alt="" loading="lazy" decoding="async"><b>${esc(li.querySelector('b').textContent)}</b><p>${esc(li.querySelector('p').textContent)}</p></li>`).join('') : '',
      table: q('.k4-table') ? q('.k4-table').outerHTML.replace('class="k4-table"', 'class="km-table"') : '',
      note: q('.k4-note ol') ? q('.k4-note ol').outerHTML : '',
      care: q('.k4-care') ? q('.k4-care').outerHTML.replace('class="k4-care"', 'class="km-care"') : ''
    };
  }
  const S = (K.k3 && K.k3.slides) || [];
  const K3W = [0.37, 0.37, 0.37];                             // #01~#03 사진 표시 배율 (자른 그림 원래 크기 × 이 값)
  const slides = S.map((s, i) => `<div class="km-slide${i === 0 ? ' is-on' : ''}" data-i="${i}">
      <p class="km-num">${esc(s.num)}</p><h3 class="km-t">${s.title}</h3><p class="km-b">${String(s.body).replace(/<br\s*\/?>/g, ' ')}</p>
      <div class="km-k3ph"><img src="assets/images/kit/mobile/k3-0${i + 1}.webp?v=184" alt="${esc(s.alt || '')}" data-w="${K3W[i] || 0.37}" loading="lazy" decoding="async"></div>
      <div class="km-th">${(s.thumbs || [['assets/images/kit/pad/pad-thumb-1.webp', ''], ['assets/images/kit/pad/pad-thumb-2.webp', ''], ['assets/images/kit/pad/pad-thumb-3.webp', '']]).map(([src, alt]) => `<img src="${src}" alt="${esc(alt)}" loading="lazy">`).join('')}</div>
    </div>`).join('');
  /* 187차: 분해도 = kit-config 의 부품 그림을 전개 위치(exploded) 그대로 배치 (잘리지 않게, 화면 폭에 맞춤)
     A~H 동그라미를 누르면 그 부품만 진하게 + 아래에 이름·설명 (callouts) */
  const BELT_STAGE = { parts: K.parts || [], callouts: K.callouts || {} };
  let PARTS = BELT_STAGE.parts, CO = BELT_STAGE.callouts;
  function explodeFig(id) {
    const st = (K.stages && K.stages[id]) || BELT_STAGE;
    PARTS = st.parts || []; CO = st.callouts || {};
    if (!PARTS.length) return '';
    const xs = PARTS.map((p) => p.exploded[0]), ys = PARTS.map((p) => p.exploded[1]);
    const x0 = Math.min(...xs) - 8, y0 = Math.min(...ys) - 8;
    const x1 = Math.max(...PARTS.map((p) => p.exploded[0] + p.w)) + 8, y1 = Math.max(...PARTS.map((p) => p.exploded[1] + p.h)) + 8;
    const W = x1 - x0, H = y1 - y0, pc = (v, d) => ((v / d) * 100).toFixed(3) + '%';
    /* 192차: 처음엔 조립 위치(assembled)에 모여 있다가 화면에 보이면 흩어짐 — --ax/--ay = 조립 위치까지의 거리 (자기 크기 대비 %) */
    // 모인 덩어리는 그림 칸 가운데에 (조립 위치 전체를 전개도 중심으로 옮김)
    const AS = PARTS.map((p) => p.assembled || p.exploded);
    const ax0 = Math.min(...AS.map((a) => a[0])), ax1 = Math.max(...AS.map((a, i) => a[0] + PARTS[i].w)), ay0 = Math.min(...AS.map((a) => a[1])), ay1 = Math.max(...AS.map((a, i) => a[1] + PARTS[i].h));
    const ox = (x0 + x1) / 2 - (ax0 + ax1) / 2, oy = (y0 + y1) / 2 - (ay0 + ay1) / 2;
    const imgs = PARTS.map((p, j) =>   /* 226차: PC 와 같은 겹침 순서 (배열 = 아래 → 위) */ { const a0 = p.assembled || p.exploded, a = [a0[0] + ox, a0[1] + oy];
      return `<img class="km-part" data-part="${p.part}" src="${p.src}" alt="" style="left:${pc(p.exploded[0] - x0, W)};top:${pc(p.exploded[1] - y0, H)};width:${pc(p.w, W)};--ax:${((a[0] - p.exploded[0]) / p.w * 100).toFixed(2)}%;--ay:${((a[1] - p.exploded[1]) / p.h * 100).toFixed(2)}%;--d:${(j * 0.04).toFixed(2)}s">`; }).join('');
    const pins = Object.keys(CO).map((k) => { const l = CO[k].line, e = l[l.length - 1]; return `<button type="button" class="km-pin" data-part="${k}" style="left:${pc(e[0] - x0, W)};top:${pc(e[1] - y0, H)}" aria-label="${esc(CO[k].name)}">${k}</button>`; }).join('');   // 227차: 폰은 모였다 펼쳐지는 애니메이션 없이 처음부터 펼친 상태 (km-exp 에 is-packed 없음)
    return `<div class="km-exp" style="aspect-ratio:${W.toFixed(1)} / ${H.toFixed(1)}">${imgs}${pins}</div>
      <p class="km-exp-hint">부품을 눌러 기능을 확인해보세요</p>
      <div class="km-co" id="km-co" hidden><b><span></span><em></em></b><p></p><div class="km-co-x"></div></div>`;
  }
  /* 부품 그림의 투명하지 않은 곳을 눌렀는지 (위에 그려진 부품부터) */
  const alphaCache = new WeakMap();
  function opaqueAt(img, x, y) {
    const r = img.getBoundingClientRect();
    if (x < r.left || x > r.right || y < r.top || y > r.bottom) return false;
    let c = alphaCache.get(img);
    if (!c || c.w !== Math.round(r.width)) {
      try {
        const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.round(r.width)); cv.height = Math.max(1, Math.round(r.height));
        const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(img, 0, 0, cv.width, cv.height);
        c = { w: cv.width, cx }; alphaCache.set(img, c);
      } catch (err) { return true; }
    }
    try {
      const px = Math.min(c.w - 1, Math.max(0, Math.round(x - r.left))), py = Math.max(0, Math.round(y - r.top));
      /* 손가락 크기만큼 주변 6px 안에 칠해진 곳이 있으면 */
      const d = c.cx.getImageData(Math.max(0, px - 6), Math.max(0, py - 6), 13, 13).data;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 2) return true;   // 261차: 반투명 면도
      return false;
    } catch (err) { return true; }
  }
  function partAt(fig, x, y) {
    const imgs = [...fig.querySelectorAll('.km-part')].reverse();
    for (const im of imgs) if (opaqueAt(im, x, y)) return im.dataset.part;
    return null;
  }
  function bindExplode() {
    const fig = host.querySelector('.km-exp'), co = document.getElementById('km-co'); if (!fig || !co) return;
    /* 192차: 화면에 들어오면 모여 있던 부품이 흩어짐 (한 번만) */
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); setTimeout(() => fig.classList.remove('is-packed'), 350); } }, { threshold: 0.55 });
      io.observe(fig);
    } else fig.classList.remove('is-packed');
    let on = null;
    fig.addEventListener('click', (e) => {
      const b = e.target.closest('.km-pin');
      const hit = b ? b.dataset.part : partAt(fig, e.clientX, e.clientY);   /* 188차: 알파벳 말고 부품 그림을 눌러도 */
      const k = hit && hit !== on ? hit : null;
      on = k;
      fig.classList.toggle('has-focus', !!k);
      fig.querySelectorAll('[data-part]').forEach((el) => el.classList.toggle('is-on', el.dataset.part === k));
      co.hidden = !k;
      if (k) {
        const c = CO[k];
        co.querySelector('span').textContent = k; co.querySelector('em').textContent = c.name; co.querySelector('p').textContent = c.desc;
        const x = co.querySelector('.km-co-x'); x.innerHTML = '';   // 272차: 종류 안내 + 그림 줄 (상단 캡 4종)
        if (c.note) { const n = document.createElement('small'); n.textContent = c.note; x.appendChild(n); }
        if (c.icons) { const l = document.createElement('span'); c.icons.forEach(([src, alt]) => { const im = new Image(); im.src = src; im.alt = alt; l.appendChild(im); }); x.appendChild(l); }
      }
    });
  }
  /* 238차: 제품별 상세 아래 — 벨트 = 안전한 설계 · #01~#03 · 안심 / 인형 = 안전한 설계 · 안심 / 동화책 = 안심 */
  function more(id) {
    const secs = (K.sections && K.sections[id]) || ['k2', 'k3', 'k4'];
    const k = k4Parts(id);
    const k2b = document.querySelector('.k2-body.kp-' + id);
    const spec = [...document.querySelectorAll('.k2-spec.kp-' + id)].map((d) => `<div><b>${esc(d.querySelector('strong').textContent)}</b><span>${esc(d.querySelector('span').textContent)}</span></div>`).join('');
    const s2 = secs.includes('k2') ? `
    <section class="km-sec">
      <h2 class="km-t"><span class="s">아이의 첫 연습을 위한</span><br>안전한 설계</h2>
      <p class="km-b">${esc(k2b ? k2b.textContent.replace(/\s+/g, ' ').trim() : '')}</p>
      ${explodeFig(id)}
      <div class="km-spec">${spec}</div>
    </section>` : '';
    const s3 = secs.includes('k3') ? `
    <section class="km-sec km-k3" aria-roledescription="carousel" aria-label="제품 특징">
      <div class="km-slides">${slides}</div>
      <div class="km-k3nav"><span class="km-dots">${S.map((_, i) => `<i${i === 0 ? ' class="on"' : ''}></i>`).join('')}</span><span class="km-ar"><button type="button" data-d="-1" aria-label="이전">${arrow('l')}</button><button type="button" data-d="1" aria-label="다음">${arrow('r')}</button></span></div>
    </section>` : '';
    const acc = [['제품 정보', k.table], ['사용 전 주의사항', k.note], ['취급 상 주의사항', k.care]].filter((x) => x[1]).map(([t, h]) => `<details><summary>${t}</summary>${h}</details>`).join('');
    return s2 + s3 + `
    <section class="km-sec">
      <h2 class="km-t"><span class="hl">안심</span>하고 사용할 수 있도록<br><span class="s">이런 부분을 고려했어요</span></h2>
      <span class="km-rule"></span>
      ${k.photo}
      <ul class="km-checks">${k.checks}</ul>
      ${k.steps ? `<h3 class="km-h">제품 사용 방법</h3>
      <ol class="km-steps">${k.steps}</ol>` : ''}
      <div class="km-acc">${acc}</div>
    </section>`;
  }

  host.innerHTML = `
    <div class="km-list">
      <h1 class="km-t">CURO 키트 안에<br>무엇이 들어있을까?</h1>
      <p class="km-b">제품을 눌러 자세히 확인해보세요</p>
      <div class="km-bento">${tiles}</div>
    </div>
    <div class="km-detail" hidden>
      <a class="km-back" href="#">${arrow('l')}키트 목록</a>
      <span class="km-lbl" id="km-lbl"></span>
      <h1 class="km-t" id="km-title"></h1>
      <p class="km-b" id="km-body"></p>
      <div class="km-stage" id="km-stage"><span class="c"></span><img id="km-img" alt=""></div>
      <p class="km-price" id="km-price" hidden><span>판매가</span><b></b></p>
      <div id="km-more"></div>
    </div>
    <div class="km-bar" id="km-bar" hidden>
      <button type="button" class="km-share" aria-label="공유하기"><i aria-hidden="true"></i></button>
      <a class="km-cta" href="program.html">렌탈 하러가기</a>
    </div>`;

  const list = host.querySelector('.km-list'), detail = host.querySelector('.km-detail'), bar = document.getElementById('km-bar');
  const $ = (id) => document.getElementById(id);

  function show() {
    const m = /^#p-(\w+)$/.exec(location.hash), p = m && byId(m[1]);
    list.hidden = !!p; detail.hidden = !p; bar.hidden = !p;
    root.classList.toggle('km-on-detail', !!p);
    if (p) {
      $('km-lbl').textContent = p.label || '';
      $('km-title').innerHTML = p.title; $('km-body').innerHTML = String(p.body).replace(/<br\s*\/?>/g, '<br>');
      $('km-img').src = p.img; $('km-img').alt = p.name;
      $('km-stage').style.setProperty('--c', p.color || '#F6F0E6');
      $('km-price').hidden = !p.price; $('km-price').querySelector('b').textContent = p.price || '';
      $('km-more').innerHTML = p.detail ? more(p.id) : '';
      if (p.detail) { bindK3(); bindExplode(); }
      document.title = `CURO — CURO KIT · ${p.name}`;
    } else document.title = 'CURO — CURO KIT';
    window.scrollTo(0, 0);
    if (window.CURO_FLOAT && window.CURO_FLOAT.layout) window.CURO_FLOAT.layout();
  }
  host.querySelector('.km-back').addEventListener('click', (e) => { e.preventDefault(); if (history.length > 1 && /^#p-/.test(location.hash)) history.back(); else location.hash = ''; });
  window.addEventListener('hashchange', show);

  // #01~#03: 화살표·옆으로 밀기
  function bindK3() {
    const wrap = host.querySelector('.km-k3'); if (!wrap) return;
    const sl = [...wrap.querySelectorAll('.km-slide')], dots = [...wrap.querySelectorAll('.km-dots i')];
    wrap.querySelectorAll('.km-k3ph img').forEach((im) => { const set = () => { im.style.width = Math.round(im.naturalWidth * +im.dataset.w) + 'px'; }; if (im.complete && im.naturalWidth) set(); else im.addEventListener('load', set, { once: true }); });
    let i = 0;
    const go = (n) => { i = (n + sl.length) % sl.length; sl.forEach((s, j) => s.classList.toggle('is-on', j === i)); dots.forEach((d, j) => d.classList.toggle('on', j === i)); };
    wrap.querySelectorAll('.km-ar button').forEach((b) => b.addEventListener('click', () => go(i + +b.dataset.d)));
    let x0 = null;
    wrap.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  // 공유: 기기 공유 창, 없으면 링크 복사
  bar.querySelector('.km-share').addEventListener('click', async () => {
    try { if (navigator.share) { await navigator.share({ title: document.title, url: location.href }); return; } await navigator.clipboard.writeText(location.href); }
    catch (e) { /* 닫음 */ }
  });

  show();
})();
