(() => {
  const root = document.documentElement;
  const loader = document.querySelector('.site-loader');
  if (!loader) { root.classList.remove('intro-pending'); return; }
  const video = loader.querySelector('video');
  const skip = loader.querySelector('button');
  const progress = loader.querySelector('.intro-progress i');
  const content = [...document.body.children].filter(el => el !== loader && !['SCRIPT','STYLE'].includes(el.tagName));
  let stallTimer, finished = false;
  const previousFocus = document.activeElement;
  function hide() {
    if (finished) return;
    finished = true;
    clearTimeout(stallTimer);
    video.pause();
    root.classList.remove('intro-pending');
    content.forEach(el => { if (el.dataset.introInert === 'true') { el.inert = false; delete el.dataset.introInert; } });
    loader.classList.add('is-hidden');
    if (loader.contains(document.activeElement)) {
      if (previousFocus && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({preventScroll:true});
      } else {
        document.activeElement.blur();
      }
    }
    setTimeout(() => loader.remove(), 500);
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { hide(); return; }
  function watchPlayback() { clearTimeout(stallTimer); stallTimer = setTimeout(hide, 6000); }
  content.forEach(el => { if (!el.inert) { el.dataset.introInert = 'true'; el.inert = true; } });
  skip.addEventListener('click', hide);
  loader.addEventListener('keydown', event => {
    if (event.key === 'Escape') hide();
    if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
  });
  video.addEventListener('ended', hide, {once:true});
  video.addEventListener('error', hide, {once:true});
  video.addEventListener('timeupdate', () => {
    if (finished) return;
    if (Number.isFinite(video.duration) && video.duration > 0) progress.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
    watchPlayback();
  });
  video.src = video.dataset.src;
  video.muted = true;
  loader.hidden = false;
  skip.focus({preventScroll:true});
  watchPlayback();
  video.play().catch(hide);
})();
