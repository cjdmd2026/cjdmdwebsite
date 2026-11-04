/* ==========================================================================
   푸터 (78차) — MAIN 제외 페이지 공통. body 맨 끝(스크립트들 앞)에 붙임. 스타일 = css/footer.css
   글 내용은 아래 TEXT 한 곳에서 수정
   ========================================================================== */
(function () {
  'use strict';
  const TEXT = {
    logo: 'assets/icons/curo-logo.svg',
    tagline: 'Companion for U’r Routine',
    copy: '© 2026 CURO. All Rights Reserved.',
    team: 'TEAM. 화양연화',
    members: '박윤아 유혜진 주보민'
  };
  const f = document.createElement('footer');
  f.className = 'site-foot'; f.id = 'site-foot';
  f.innerHTML =
    '<div class="site-foot-in">' +
      '<div class="site-foot-brand"><img class="site-foot-logo" src="' + encodeURI(TEXT.logo) + '" width="173" height="47" alt="CURO">' +
      '<p class="site-foot-tag">' + TEXT.tagline + '</p></div>' +
      '<p class="site-foot-copy">' + TEXT.copy + '</p>' +
      '<p class="site-foot-team"><span>' + TEXT.team + '</span><span>' + TEXT.members + '</span></p>' +
    '</div>';
  const main = document.querySelector('main');
  if (main && main.parentNode) main.parentNode.insertBefore(f, main.nextSibling);
  else document.body.appendChild(f);
  /* 194차: 내용이 짧아 화면이 남으면 푸터가 위로 떠서 아래가 비어 보이던 것 → main 최소 높이 = 화면 − 푸터 (footer.css) */
  const setH = () => document.documentElement.style.setProperty('--foot-h', f.offsetHeight + 'px');
  setH(); window.addEventListener('resize', setH);
  if (window.ResizeObserver) new ResizeObserver(setH).observe(f);
})();
