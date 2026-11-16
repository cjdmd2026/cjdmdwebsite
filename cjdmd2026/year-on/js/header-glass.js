(() => {
  const header = document.querySelector('.global-header');
  if (!header) return;
  const globe = header.querySelector('.globe-button');
  const language = header.querySelector('.language-menu');
  const menuButton = header.querySelector('.menu-toggle');
  const menu = header.querySelector('.header-menu-panel');
  const close = except => {
    if (except !== language) language?.classList.remove('open');
    if (except !== menu) menu?.classList.remove('open');
    globe?.setAttribute('aria-expanded', language?.classList.contains('open') ? 'true' : 'false');
    menuButton?.setAttribute('aria-expanded', menu?.classList.contains('open') ? 'true' : 'false');
  };
  globe?.addEventListener('click', event => {
    event.stopPropagation();
    const opening = !language.classList.contains('open');
    close(language);
    language.classList.toggle('open', opening);
    globe.setAttribute('aria-expanded', String(opening));
  });
  menuButton?.addEventListener('click', event => {
    event.stopPropagation();
    const opening = !menu.classList.contains('open');
    close(menu);
    menu.classList.toggle('open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
  });
  header.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => close()));
  addEventListener('click', event => { if (!header.contains(event.target)) close(); });
  addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
})();
