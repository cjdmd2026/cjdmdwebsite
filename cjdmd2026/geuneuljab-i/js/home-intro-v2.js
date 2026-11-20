// V2: doors -> sky -> downward reveal -> play the first eaves scene.
export function setupHomeDirectVideo(video) {
  if (!video) return;
  let started = false, ready = false;
  const reveal = () => {
    if (ready || !started || video.seeking || video.readyState < 2) return;
    ready = true;
    video.dataset.homeDirectReady = 'true';
    video.removeEventListener('seeked', reveal);
    video.removeEventListener('loadeddata', reveal);
  };
  const prepare = () => {
    if (started || video.readyState < 1) return;
    started = true;
    const requested = Number(video.dataset.homeDirectStart) || 0;
    const time = Math.min(requested, Math.max(0, (video.duration || 1) - .05));
    try { video.currentTime = time; }
    catch { ready = true; video.dataset.homeDirectReady = 'true'; }
    reveal();
  };
  video.addEventListener('loadedmetadata', prepare, { once: true });
  video.addEventListener('seeked', reveal);
  video.addEventListener('loadeddata', reveal);
  prepare();
}

export function setupHomeIntroV2(doc = document, win = window) {
  const body = doc.body;
  if (body.dataset.homeVariant === 'b') {
    setupHomeDirectVideo(doc.querySelector('video[data-home-direct-start]'));
    return;
  }
  if (body.dataset.homeIntro !== 'sky') return;
  const video = doc.querySelector('video[data-home-defer-playback]');
  const sky = doc.querySelector('.home-v2-intro-sky');
  if (!video || !sky) return;
  const skyVideo = sky.querySelector?.('video');
  const playSky = () => {
    if (!skyVideo) return;
    if (body.dataset.homeIntro === 'complete' || doc.visibilityState === 'hidden') {
      skyVideo.pause();
      return;
    }
    try { skyVideo.play()?.catch(() => {}); } catch {}
  };
  if (skyVideo) {
    skyVideo.muted = skyVideo.defaultMuted = true;
    skyVideo.loop = skyVideo.autoplay = skyVideo.playsInline = true;
    skyVideo.addEventListener('loadeddata', playSky);
    doc.addEventListener('visibilitychange', playSky);
    win.addEventListener('pageshow', playSky);
    win.addEventListener('pointerdown', playSky, { once: true, passive: true });
    playSky();
  }

  const reduced = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let prepared = false, seekStarted = false, released = false, started = false;
  const preventScroll = event => event.preventDefault();
  const preventKeys = event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) event.preventDefault();
  };
  win.addEventListener('wheel', preventScroll, { passive: false });
  win.addEventListener('touchmove', preventScroll, { passive: false });
  win.addEventListener('keydown', preventKeys);
  video.autoplay = false;
  video.pause();

  const releasePlayback = () => {
    if (released || !prepared || body.dataset.homeIntro !== 'complete') return;
    released = true;
    delete video.dataset.homeDeferPlayback;
    video.autoplay = true;
    win.dispatchEvent(new win.Event('home-intro-complete'));
  };
  const markPrepared = () => {
    if (prepared || !seekStarted || video.seeking || video.readyState < 2) return;
    prepared = true;
    body.dataset.homeIntroFrameReady = 'true';
    releasePlayback();
  };
  const prepareFirstScene = () => {
    if (seekStarted || video.readyState < 1) return;
    seekStarted = true;
    // Skip only the file's opening fade from black; keep the first roof scene.
    const start = Math.min(.8, Math.max(0, (video.duration || 1) - .05));
    try { video.currentTime = start; } catch { seekStarted = false; }
    markPrepared();
  };
  video.addEventListener('loadedmetadata', prepareFirstScene, { once: true });
  video.addEventListener('seeked', markPrepared);
  video.addEventListener('loadeddata', markPrepared);
  prepareFirstScene();

  const complete = () => {
    body.dataset.homeIntro = 'complete';
    if (skyVideo) {
      skyVideo.pause();
      skyVideo.removeEventListener('loadeddata', playSky);
      doc.removeEventListener('visibilitychange', playSky);
      win.removeEventListener('pageshow', playSky);
      win.removeEventListener('pointerdown', playSky);
    }
    sky.remove();
    win.removeEventListener('wheel', preventScroll);
    win.removeEventListener('touchmove', preventScroll);
    win.removeEventListener('keydown', preventKeys);
    body.classList.add('index-scene-reveal', 'index-typography-ready');
    win.requestAnimationFrame(() => body.classList.add('index-typography-reveal'));
    releasePlayback();
  };
  const descend = () => {
    if (started) return;
    started = true;
    win.scrollTo(0, 0);
    body.classList.remove('index-typography-reveal');
    // Start while the frame is passing out of view, not after its removal.
    // Completion remains a fallback for reduced motion or an early failsafe.
    if (reduced) { complete(); return; }
    body.dataset.homeIntro = 'descending';
    win.setTimeout(complete, 1350);
  };
  win.addEventListener('home-entrance-passing', descend, { once: true });
  win.addEventListener('home-entrance-complete', descend, { once: true });
}
