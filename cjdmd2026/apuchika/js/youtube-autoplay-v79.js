document.addEventListener('DOMContentLoaded', () => {
  const episodes = window.apuEpisodes || [];
  const videoId = episode => {
    if (!episode?.video || episode.locked) return null;
    try {
      const url = new URL(episode.video);
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
      return /^[\w-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  };
  const mount = (cover, episode, preview = false) => {
    const id = videoId(episode);
    if (!id || cover.querySelector('.youtube-auto-frame')) return;
    const frame = document.createElement('iframe');
    frame.className = 'youtube-auto-frame';
    frame.title = episode.title + (preview ? ' 미리보기' : ' 영상');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&playsinline=1&rel=0' + (preview ? '&controls=0&disablekb=1' : '');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;display:block;z-index:2;' + (preview ? 'pointer-events:none;' : '');
    if (preview) frame.tabIndex = -1;
    cover.append(frame);
  };
  const stop = cover => cover.querySelector('.youtube-auto-frame')?.remove();

  // A detail visit starts the connected episode immediately.
  if (document.body.classList.contains('episode-page')) {
    const episode = episodes.find(e => e.id === new URLSearchParams(location.search).get('id')) || episodes[0];
    if (videoId(episode)) document.querySelector('.episode-play')?.click();
  }

  const feature = document.querySelector('#featuredLink');
  if (feature) {
    // Keep the visual slot while allowing interaction with the YouTube controls.
    const slot = document.createElement('div');
    slot.id = feature.id;
    slot.className = feature.className;
    slot.append(...feature.childNodes);
    feature.replaceWith(slot);
    let visible = false;
    const selected = () => episodes[Number(document.querySelector('[data-feature][aria-pressed="true"]')?.dataset.feature || 0)];
    const sync = () => { stop(slot); if (visible && !document.hidden) mount(slot, selected()); };
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: .25 }).observe(slot);
    document.querySelector('.feature-list')?.addEventListener('click', sync);
    document.addEventListener('visibilitychange', sync);
  }

  // Thumbnail previews never intercept the existing detail-page link.
  const bindCards = () => {
    document.querySelectorAll('.episode-card .card-cover-link').forEach(link => {
      if (link.dataset.previewReady) return;
      link.dataset.previewReady = 'true';
      const episode = episodes.find(e => e.id === new URL(link.href).searchParams.get('id'));
      if (!videoId(episode)) return;
      const cover = link.querySelector('.cover');
      const enter = () => { if (matchMedia('(hover:hover)').matches) mount(cover, episode, true); };
      const leave = () => stop(cover);
      link.addEventListener('pointerenter', enter);
      link.addEventListener('pointerleave', leave);
      link.addEventListener('focus', enter);
      link.addEventListener('blur', leave);
      new IntersectionObserver(entries => { if (!entries[0].isIntersecting) leave(); }).observe(link);
      document.addEventListener('visibilitychange', () => { if (document.hidden) leave(); });
    });
  };
  bindCards();
  const grid = document.querySelector('.episode-grid');
  if (grid) new MutationObserver(bindCards).observe(grid, { childList: true });
});
