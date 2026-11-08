/* 279차: '다른 제품도 둘러볼까요?' — 캐릭터 상세의 친구 줄과 같은 방식 (278차 시안 반영)
   292차: PC = 오른쪽 세로 플로팅(2번째 화면부터) · 폰 = 상세 맨 아래 띠. 누르면 그 제품 상세로 바로 이동 */
(function () {
  const K = window.CURO_KIT; if (!K || !K.products) return;
  const P = K.products;
  const css = document.createElement('style');
  css.textContent = `
.kof { --q: calc(var(--kfu, 1) * 1px); position: fixed; z-index: 14; right: calc(40 * var(--q)); top: 50%; transform: translate(16px, -50%); opacity: 0; pointer-events: none;
  width: calc(60 * var(--q)); box-sizing: border-box; padding: calc(8 * var(--q)); border-radius: 999px; background: rgba(255, 255, 255, 0.86); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Pretendard', sans-serif; transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.kof.is-on { opacity: 1; transform: translate(0, -50%); pointer-events: auto; }
.kof ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: calc(8 * var(--q)); }   /* 297차: 폭 = 플로팅 버튼 60 */
.kof li { position: relative; }
.kof a { position: relative; display: block; width: calc(44 * var(--q)); height: calc(44 * var(--q)); border-radius: 50%; background: var(--c); transition: transform 0.2s ease; }
.kof a img { position: absolute; object-fit: contain; }
.kof a::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #2B2B2B; opacity: 0.1; transition: opacity 0.25s ease; }
.kof a:hover { transform: scale(1.08); } .kof a:hover::after { opacity: 0; }
.kof a[aria-current="page"] { pointer-events: none; box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 3.5px #1EB2A6; }
.kof a[aria-current="page"]::after { opacity: 0; }
.kof li span { position: absolute; right: calc(100% + 14px); top: 50%; transform: translate(6px, -50%); opacity: 0; pointer-events: none; white-space: nowrap;
  padding: 6px 12px; border-radius: 999px; background: #2B2B2B; color: #FFFFFF; font-size: 13px; font-weight: 500; transition: opacity 0.2s ease, transform 0.25s ease; }
.kof li:hover span { opacity: 1; transform: translate(0, -50%); }
html.kit-phone .kof { display: none; }
.ko-sub { color: #8A8A8A; }
.ko-m { margin: 48px -20px 0; padding: 30px 20px 32px; background: #F7F7F7; text-align: center; }
.ko-m h2 { margin: 0; font-size: 15px; font-weight: 700; color: #2B2B2B; }
.ko-m .ko-sub { margin-top: 5px; font-size: 12px; }
.ko-m ul { margin: 18px 0 0; padding: 0; list-style: none; display: flex; justify-content: center; gap: 12px; }
.ko-m li { display: flex; flex-direction: column; align-items: center; width: 52px; }
.ko-m a { position: relative; display: block; width: 46px; height: 46px; border-radius: 50%; background: var(--c); }
.ko-m a img { position: absolute; inset: 12%; width: 76%; height: 76%; object-fit: contain; }
.ko-m a[aria-current="page"] { box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #1EB2A6; }
.ko-m li span { margin-top: 6px; font-size: 10px; line-height: 1.3; color: #8A8A8A; word-break: keep-all; }
.ko-m li:has(a[aria-current="page"]) span { color: #2B2B2B; font-weight: 500; }`;
  document.head.appendChild(css);
  const REAL = { belt: ['belt-real', 10], book: ['book-real', 19], doll: ['doll-real', 20], cap: ['cap-real', 9], assist: ['assist-real', 21] };
  const pic = (p) => { const r = REAL[p.id]; return r ? `<img src="assets/images/kit/products/${r[0]}.webp?v=332" alt="" style="inset:${r[1]}%;width:${100 - 2 * r[1]}%;height:${100 - 2 * r[1]}%">` : `<img src="${p.k0.ill}" alt="">`; };
  const cur = () => document.documentElement.dataset.kitProduct || 'belt';
  const items = (href) => P.map((p) => `<li><a href="${href(p)}" data-id="${p.id}" style="--c:${p.color}"${p.id === cur() ? ' aria-current="page"' : ''} aria-label="${p.name}">${pic(p)}</a><span>${p.name}</span></li>`).join('');
  const HEAD = '<h2>다른 제품도 둘러볼까요?</h2><p class="ko-sub">CURO 키트의 다른 제품을 더 만나보세요</p>';

  // PC: 292차 — 오른쪽 세로 플로팅(플로팅 버튼과 같은 세로줄). 2번째 화면(전개도, current ≥ 2)부터 보임 (291차 시안에서 '다른 제품' 글자만 뺌)
  if (document.getElementById('k4')) {
    const box = document.createElement('nav'); box.className = 'kof'; box.setAttribute('aria-label', '다른 제품');
    document.body.appendChild(box);
    const draw = () => { box.innerHTML = `<ul>${items((p) => '#' + p.id)}</ul>`; };
    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-kit-product'] });
    box.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-id]'); if (!a) return; e.preventDefault();
      const i = P.findIndex((p) => p.id === a.dataset.id), api = window.CURO_KIT_API, KP = window.CURO_KIT_PRODUCTS;
      if (KP) KP.show(i, true);
      if (api) api.go(1, 0, true);   // 새 제품 첫 화면(1번)으로
    });
    const tick = () => { const api = window.CURO_KIT_API; box.classList.toggle('is-on', !!api && api.current() >= 2); };
    window.addEventListener('scroll', tick, { passive: true }); window.addEventListener('resize', tick);
    setInterval(tick, 400); tick();
  }
  // 폰: 상세 맨 아래 (#p-제품 으로 이동)
  const more = document.getElementById('km-more');
  if (more) {
    const add = () => {
      if (more.querySelector('.ko-m')) return;
      const m = /^#p-(\w+)$/.exec(location.hash); if (!m) return;
      const box = document.createElement('section'); box.className = 'ko-m';
      box.innerHTML = HEAD + `<ul>${P.map((p) => `<li><a href="#p-${p.id}" style="--c:${p.color}"${p.id === m[1] ? ' aria-current="page"' : ''} aria-label="${p.name}">${pic(p)}</a><span>${p.name}</span></li>`).join('')}</ul>`;
      more.appendChild(box);
    };
    new MutationObserver(add).observe(more, { childList: true }); add();
  }
})();
