/* ==========================================================================
   FRIENDS 등장 효과 (147차 시안) — friends-burst-proposal.html 전용
   친구가 처음 나타날 때(페이지 첫 화면 · 다른 친구를 고를 때) 캐릭터 뒤에서 단순한 그림이 퍼짐
   그림 = 임시 SVG 도형 (테두리 없음, 색만). 사용자 그림이 생기면 SHAPES 를 파일로 바꾸면 됨
   ========================================================================== */
(function () {
  'use strict';
  const F = window.CURO_FRIENDS;
  const frame = document.querySelector('.fr-meet-f'), charBtn = document.getElementById('fr-char');
  if (!F || !frame || !charBtn) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 임시 도형 (viewBox 0 0 100 100, 모서리 둥글게 = 같은 색 stroke + round join) ---------- */
  const r = (d, c) => `<path d="${d}" fill="${c}" stroke="${c}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>`;
  const SHAPES = {
    star: (c) => r('M50 12 L61 38 L89 40 L67 58 L74 86 L50 71 L26 86 L33 58 L11 40 L39 38 Z', c),
    sparkle: (c) => r('M50 8 Q55 45 92 50 Q55 55 50 92 Q45 55 8 50 Q45 45 50 8 Z', c),
    heart: (c) => r('M50 84 C20 64 10 46 18 32 C26 18 44 20 50 34 C56 20 74 18 82 32 C90 46 80 64 50 84 Z', c),
    streak: (c) => `<rect x="38" y="10" width="24" height="80" rx="12" fill="${c}"/>`,
    dot: (c) => `<circle cx="50" cy="50" r="34" fill="${c}"/>`,
    bubble: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/><circle cx="37" cy="36" r="9" fill="#FFFFFF" opacity="0.75"/>`,
    drop: (c) => r('M50 10 C62 32 78 46 78 62 C78 78 66 90 50 90 C34 90 22 78 22 62 C22 46 38 32 50 10 Z', c),
    leaf: (c) => r('M18 82 C18 40 44 16 84 16 C84 58 60 82 18 82 Z', c),
    cloud: (c) => `<g fill="${c}"><circle cx="34" cy="58" r="20"/><circle cx="54" cy="44" r="24"/><circle cx="72" cy="60" r="18"/><rect x="24" y="56" width="58" height="22" rx="11"/></g>`,
    gear: (c) => `<g fill="${c}">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="42" y="6" width="16" height="24" rx="6" transform="rotate(${a} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="30"/></g><circle cx="50" cy="50" r="11" fill="#FFFFFF" opacity="0.8"/>`,
    bulb: (c) => `<circle cx="50" cy="42" r="28" fill="${c}"/><rect x="38" y="62" width="24" height="22" rx="7" fill="${c}"/>`,
    check: (c) => `<path d="M18 52 L40 74 L84 26" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`,
    ring: (c) => `<circle cx="50" cy="50" r="32" fill="none" stroke="${c}" stroke-width="14"/>`,
    memo: (c) => `<rect x="16" y="14" width="68" height="74" rx="10" fill="${c}"/><rect x="28" y="34" width="44" height="7" rx="3.5" fill="#FFFFFF" opacity="0.8"/><rect x="28" y="50" width="32" height="7" rx="3.5" fill="#FFFFFF" opacity="0.8"/>`
  };

  /* ---------- 친구별: 그림 · 색 · 퍼지는 방식 ---------- */
  //   mode: pop = 위로 팡 / float = 아래에서 천천히 떠오름 / scatter = 사방으로 빠르게 튀며 회전 / seq = 하나씩 톡톡 차례로
  const SET = {
    beary: { mode: 'pop', items: [['star', '#F0555B'], ['sparkle', '#FFFFFF'], ['heart', '#FF7A80'], ['streak', '#F7A1A4'], ['star', '#FFFFFF'], ['sparkle', '#FFD27A'], ['heart', '#E04A50'], ['streak', '#FFB3B6']] },   // 277차: 분홍 바탕에 맞춤
    ellie: { mode: 'float', items: [['bubble', '#FFFFFF'], ['drop', '#F5822A'], ['leaf', '#FFB35C'], ['cloud', '#FFF4C2'], ['bubble', '#FFAE5E'], ['dot', '#FF9A3D'], ['drop', '#FFFFFF'], ['leaf', '#FFC46B']] },   // 296차: 큰 방울(bubble) #F07A1E → #FFAE5E 연하게 · 295차: 하늘색 → 주황, 흰색은 양 끝 2개
    rabby: { mode: 'scatter', items: [['star', '#FFFFFF'], ['star', '#4AA7DD'], ['gear', '#FFFFFF'], ['bulb', '#FFE38A'], ['sparkle', '#FFFFFF'], ['star', '#8FD0F2'], ['gear', '#2E8BBF'], ['sparkle', '#FFF6C2']] },   // 278차: 하늘 바탕 — 흰색 + 파랑 계열 (+ 노란 전구)
    mio: { mode: 'seq', items: [['memo-line', '#FFFFFF'], ['check', '#86A24C'], ['ring', '#FFFFFF'], ['star', '#FFFFFF'], ['memo', '#F8FCEC'], ['check', '#5E7B2E'], ['star', '#E3F0C2'], ['ring', '#A9C36C']] }   // 278차: 연두 바탕 — 흰색 + 초록 계열만
  };

  /* 231차: 그림 = 모양별 파일 하나 (assets/images/friends/burst/{모양}.svg, 색 = currentColor) — 색은 여기 SET 에서 */
  const BURST_SRC = (shape) => `assets/images/friends/burst/${shape}.svg?v=${shape.startsWith('memo') ? 278 : 231}`;   // 260차: 앞 흰 메모 = memo-line (배경색 정도로 옅은 줄·테두리), 뒤 메모 = memo 원래대로
  [...new Set(Object.values(SET).flatMap((s) => s.items.map(([sh]) => sh)))].forEach((sh) => fetch(BURST_SRC(sh)).catch(() => {}));   // 미리 불러 둠

  const layer = document.createElement('div');
  layer.className = 'fb-layer';
  layer.setAttribute('aria-hidden', 'true');
  frame.insertBefore(layer, charBtn);                       // 캐릭터 뒤 · 영문 이름 위

  let runId = 0;
  function burst(i) {
    const f = F.list[i], set = SET[f.id];
    if (!set || reduce) return;
    const id = ++runId;
    layer.querySelectorAll('.fb-item').forEach((el) => el.remove());
    // 187차: 캐릭터 위치는 실제 화면에서 잼 (PC = 1920 프레임 배율, 폰 = 화면 기준 배치 둘 다 맞음)
    const phone = window.matchMedia('(max-width: 600px), (max-width: 1024px) and (orientation: portrait)').matches, K = phone ? (window.innerWidth > 600 ? 0.8 : 0.58) : 1;   // 폰은 그림·거리 절반
    const fr = frame.getBoundingClientRect(), cb = charBtn.getBoundingClientRect(), sc = fr.width / frame.offsetWidth || 1;
    const vs = cb.width / sc;
    const cx = (cb.left - fr.left) / sc + vs / 2, cy = (cb.top - fr.top) / sc + vs * 0.5;  // 캐릭터 가슴 쯤
    const reach = Math.max(330 * K, vs * 0.72 + 60 * K);   // 캐릭터 밖으로 충분히
    const n = set.items.length;
    // 캐릭터 살짝 커졌다 돌아옴
    charBtn.animate([{ transform: 'scale(0.9)' }, { transform: 'scale(1.04)', offset: 0.55 }, { transform: 'scale(1)' }],
      { duration: 650, easing: 'cubic-bezier(0.3, 1.4, 0.5, 1)' });
    set.items.forEach(([shape, color], k) => {
      const el = document.createElement('span');
      el.className = 'fb-item';
      // 148차: 크기·속도·거리를 그림마다 크게 다르게 (큰 것은 느리고 가까이, 작은 것은 빠르고 멀리) + 매번 조금씩 흔들림
      const jit = () => 0.88 + Math.random() * 0.24;
      const SZ = [128, 34, 92, 46, 150, 28, 70, 40], SP = [1.45, 0.62, 1.15, 0.72, 1.6, 0.55, 1.0, 0.68], DS = [0.78, 1.28, 0.95, 1.15, 0.7, 1.35, 0.9, 1.2];
      const size = SZ[k % 8] * K * jit() * (set.mode === 'float' ? 1.05 : 1), sp = SP[k % 8] * jit(), ds = DS[k % 8] * jit();
      el.style.width = el.style.height = size + 'px';
      el.style.left = (cx - size / 2) + 'px'; el.style.top = (cy - size / 2) + 'px';
      el.innerHTML = `<svg viewBox="0 0 100 100" style="color:${color}"><use href="${BURST_SRC(shape)}#s"/></svg>`;
      layer.appendChild(el);
      // 퍼지는 방향: 캐릭터 양옆·위쪽 (아래 무대 쪽은 적게)
      let ang, dist, rot, dur, delay, ease;
      const t = n > 1 ? k / (n - 1) : 0.5;
      if (set.mode === 'pop') { ang = -200 + t * 220; dist = reach * (0.85 + (k % 3) * 0.12); rot = (k % 2 ? 1 : -1) * 25; dur = 900; delay = k * 25; ease = 'cubic-bezier(0.2, 1.5, 0.4, 1)'; }
      if (set.mode === 'float') { ang = -205 + t * 230; dist = reach * (0.75 + (k % 3) * 0.1); rot = (k % 2 ? 1 : -1) * 10; dur = 1500; delay = k * 70; ease = 'cubic-bezier(0.25, 0.8, 0.35, 1)'; }
      if (set.mode === 'scatter') { ang = -220 + t * 260; dist = reach * (0.9 + (k % 3) * 0.14); rot = (k % 2 ? 1 : -1) * 300; dur = 750; delay = k * 15; ease = 'cubic-bezier(0.15, 1.3, 0.4, 1)'; }
      if (set.mode === 'seq') { ang = -200 + t * 220; dist = reach * (0.85 + (k % 2) * 0.12); rot = (k % 2 ? 1 : -1) * 12; dur = 760; delay = [0, 3, 6, 1, 5, 2, 7, 4][k] * 32; ease = 'cubic-bezier(0.25, 1.5, 0.45, 1)'; }   // 151차: 왼쪽→오른쪽 차례(120ms 간격) 대신 다른 친구들처럼 거의 함께, 순서만 섞어 톡톡
      dur *= sp; dist *= ds; delay *= 0.6 + Math.random() * 0.8;
      const a = ang * Math.PI / 180; let dy = Math.sin(a) * dist * 0.85;
      let dx = Math.cos(a) * dist * 1.2;
      if (!phone) dx = Math.max(dx, 660 - cx);   // 왼쪽 글(이름·소개) 위로는 안 넘어가게 (프레임 x 660 까지) — 폰은 글이 위에 있어 제한 없음
      else {   // 192차: 폰 = 마지막 자리가 화면 안 (좌우 끝·위 글·아래 버튼에 안 걸리게)
        const W = frame.offsetWidth, m = size / 2 + 10, yTop = cy - vs * 0.75, yBot = cy + vs * 0.25;
        const ex = Math.min(W - m, Math.max(m, cx + dx * 1.05)), ey = Math.min(yBot, Math.max(yTop, cy + dy * 1.05 - 12));
        dx = (ex - cx) / 1.05; dy = (ey + 12 - cy) / 1.05;
      }
      const keep = false;   // 149차: 남는 그림 없이 모두 사라짐
      const from = set.mode === 'float' ? `translate(${dx * 0.2}px, ${dy * 0.2 + 60 * K}px) scale(0.4)` : 'translate(0, 0) scale(0)';
      // 퍼짐(dur) → 잠깐 머묾(0.5s) → 흐려짐(0.6s)
      const total = dur + 1100, g = dur / total, h = (dur + 500) / total;
      const anim = el.animate([
        { transform: from + ' rotate(0deg)', opacity: 0, easing: ease },
        { transform: `translate(${dx}px, ${dy}px) scale(1) rotate(${rot}deg)`, opacity: 1, offset: g, easing: 'linear' },
        { transform: `translate(${dx * 1.02}px, ${dy * 1.02 - 4}px) scale(1) rotate(${rot}deg)`, opacity: 1, offset: h, easing: 'ease-in' },
        { transform: `translate(${dx * 1.05}px, ${dy * 1.05 - 12}px) scale(${keep ? 1 : 0.9}) rotate(${rot}deg)`, opacity: keep ? 0.7 : 0 }
      ], { duration: total, delay, fill: 'forwards' });
      anim.onfinish = () => {
        if (id !== runId) return;
        if (!keep) { el.remove(); return; }
        el.style.transform = `translate(${dx * 1.05}px, ${dy * 1.05 - 12}px) rotate(${rot}deg)`; el.style.opacity = '0.7';
        anim.cancel();
        el.classList.add('is-keep');                          // 천천히 둥실
      };
    });
  }

  // 첫 화면: 영상이 준비되면 / 다른 친구를 고르면: 글·캐릭터가 바뀌는 순간(0.35s)에
  let cur = 0;
  const first = () => burst(0);
  const vIdle = document.getElementById('fr-idle');
  if (vIdle && vIdle.readyState < 2) vIdle.addEventListener('loadeddata', first, { once: true }); else setTimeout(first, 300);
  document.getElementById('fr-pick').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    const i = +b.dataset.i; if (i === cur) return;
    cur = i;
    layer.querySelectorAll('.fb-item').forEach((el) => el.animate([{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], { duration: 250, fill: 'forwards' }));
    setTimeout(() => burst(i), 360);
  });
  window.CURO_FRIENDS_BURST = { burst };
})();
