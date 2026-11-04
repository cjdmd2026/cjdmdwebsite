/* ==========================================================================
   상단 메뉴 (54차) — MAIN 제외 페이지 공통. <html data-page="program|kit|story|friends"> 로 현재 메뉴 표시.
   메뉴 항목·링크·아이콘은 ITEMS 한 곳에서 관리. 스타일 = css/topnav.css
   ========================================================================== */
(function () {
  'use strict';
  const LOGO = 'assets/icons/curo-logo.svg';
  const HOME = 'index.html';
  const ITEMS = [
    { id: 'program', label: 'PROGRAM', href: 'program.html', icon: 'assets/icons/program.svg' },
    { id: 'kit', label: 'CURO KIT', href: 'kit.html', icon: 'assets/icons/curo-kit.svg' },
    { id: 'story', label: 'STORY', href: 'story.html', icon: 'assets/icons/story.svg' },
    { id: 'friends', label: 'FRIENDS', href: 'friends.html', icon: 'assets/icons/friends.svg' }
  ];
  const root = document.documentElement;
  const page = root.dataset.page || '';

  const header = document.createElement('header');
  header.className = 'site-nav'; header.id = 'site-nav';
  const inner = document.createElement('div'); inner.className = 'site-nav-in';
  const logo = document.createElement('a'); logo.className = 'site-nav-logo'; logo.href = HOME; logo.setAttribute('aria-label', 'CURO 메인으로');
  const li = new Image(); li.src = encodeURI(LOGO); li.alt = 'CURO'; li.width = 173; li.height = 47; logo.appendChild(li);
  const nav = document.createElement('nav'); nav.setAttribute('aria-label', '사이트 메뉴');
  const ul = document.createElement('ul'); ul.className = 'site-nav-menu';
  ITEMS.forEach((it) => {
    const item = document.createElement('li'); const a = document.createElement('a');
    a.href = it.href; if (it.id === page) a.setAttribute('aria-current', 'page');
    const ic = new Image(); ic.src = encodeURI(it.icon); ic.alt = ''; ic.setAttribute('aria-hidden', 'true');
    a.appendChild(ic); a.appendChild(document.createTextNode(it.label));
    item.appendChild(a); ul.appendChild(item);
  });
  nav.appendChild(ul); inner.appendChild(logo); inner.appendChild(nav); header.appendChild(inner);
  document.body.insertBefore(header, document.body.firstChild);
  root.classList.add('has-topnav');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* 192차: PC ↔ 폰(600px) 경계를 넘으면 (창 크기 변경 · F12 기기 모드 전환) 같은 주소로 다시 그림
   KIT·FRIENDS 등 일부 화면은 처음 열 때 폰/PC 구성을 정하므로, 다른 메뉴를 다녀오지 않아도 바로 맞게 */
(function () {
  'use strict';
  const mq = window.matchMedia('(max-width: 600px)');
  let was = mq.matches, t = 0;
  const on = () => { clearTimeout(t); t = setTimeout(() => { if (mq.matches !== was) { was = mq.matches; location.reload(); } }, 150); };
  if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
})();
