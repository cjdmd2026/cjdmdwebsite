function initializeHeader() {
  const header = document.querySelector('.submission-header');
  const button = header?.querySelector('.menu-button');
  const menu = header?.querySelector('.mobile-menu');
  if (!button || !menu) {
    if (button) button.hidden = true;
    return;
  }
  const mobile = matchMedia('(max-width: 759px)');
  const background = [document.querySelector('.page-shell'), document.querySelector('.site-footer')];

  function setMenu(open, restoreFocus = false) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    menu.hidden = !open;
    menu.inert = !open;
    document.body.classList.toggle('mobile-menu-open', open);
    background.forEach(element => { if (element) element.inert = open; });
    if (restoreFocus) button.focus();
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  mobile.addEventListener('change', () => { if (!mobile.matches) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const links = [header.querySelector('.logo a'), button, ...menu.querySelectorAll('a')];
      const first = links[0], last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

initializeHeader();
