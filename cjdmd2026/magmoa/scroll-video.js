(() => {
  const section = document.querySelector('.about-video-story');
  const video = section?.querySelector('video');
  const image = section?.querySelector('.about-memory-scene');
  if (!video && !image) return;
  const nextSection = document.querySelector('.about-process');
  if (nextSection) nextSection.classList.add('has-film-transition');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let wanted = 0;
  let queued = false;
  let cardRevealTimer = null;
  function seek() {
    if (!video || reduced.matches || video.seeking || video.readyState < 2 || !Number.isFinite(video?.duration)) return;
    if (Math.abs(video.currentTime - wanted) > .025) video.currentTime = wanted;
  }
  function update() {
    queued = false;
    if (reduced.matches) {
      video?.pause();
      if (image) image.style.transform = 'none';
      clearTimeout(cardRevealTimer);
      cardRevealTimer = null;
      nextSection?.classList.add('is-in-view');
      nextSection?.style.removeProperty('--process-heading-opacity');
      nextSection?.style.removeProperty('--process-heading-y');
      nextSection?.style.removeProperty('--process-shift');
      nextSection?.style.removeProperty('--process-wipe');
      if (nextSection) nextSection.style.visibility = 'visible';
      return;
    }
    const viewport = section.querySelector('.about-video-sticky').offsetHeight;
    const range = Math.max(1, section.offsetHeight - viewport);
    const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / range));
    const filmProgress = Math.min(1, progress / .76);
    const wipe = Math.max(0, Math.min(1, (progress - .76) / .24));
    const fade = Math.max(0, Math.min(1, (progress - .08) / .20));
    section.style.setProperty('--film-copy-opacity', 1 - fade);
    section.style.setProperty('--film-copy-y', `${-fade * 35}px`);
    if (nextSection) {
      // Reveal the real next section, then hand it back to normal document flow.
      const remaining = Math.max(0, section.getBoundingClientRect().top + range);
      nextSection.style.setProperty('--process-shift', `${-remaining}px`);
      nextSection.style.setProperty('--process-wipe', `${(1 - wipe) * viewport}px`);
      nextSection.style.visibility = wipe > 0 ? 'visible' : 'hidden';
      const headingProgress = Math.max(0, Math.min(1, (wipe - .50) / .45));
      nextSection.style.setProperty('--process-heading-opacity', headingProgress);
      nextSection.style.setProperty('--process-heading-y', `${(1 - headingProgress) * 32}px`);

    }
    if (Number.isFinite(video?.duration)) wanted = filmProgress * Math.max(0, video.duration - .04);
    if (image) image.style.transform = `scale(${1.06 + filmProgress * .08}) translateY(${-filmProgress * 2}%)`;
    seek();
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  video?.addEventListener('loadedmetadata', schedule);
  video?.addEventListener('loadeddata', schedule);
  video?.addEventListener('canplay', schedule);
  video?.addEventListener('seeked', seek);
  video?.addEventListener('error', () => section.classList.add('video-unavailable'));
  // Never autoplay: scroll alone chooses the frame, including reverse movement.
  video?.pause();
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  schedule();
})();
