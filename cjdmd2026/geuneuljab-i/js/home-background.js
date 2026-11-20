// Scroll changes only opacity; it never seeks or synchronizes playback time.
export function homeBackgroundProgress(scrollY, heroTop, heroHeight, viewportHeight) {
  const range = heroHeight - viewportHeight;
  if (!Number.isFinite(range) || range <= 0) return 0;
  return Math.max(0, Math.min(1, (scrollY - heroTop) / range));
}

// A manual choice becomes a control point on the scroll blend. Scrolling up
// still moves towards day, and scrolling down towards evening, without a jump
// back to the pre-click colour on the first wheel event.
export function homeManualBackgroundProgress(progress, anchor) {
  if (!anchor) return progress;
  if (progress <= anchor.position) {
    return anchor.position > 0 ? anchor.value * progress / anchor.position : anchor.value;
  }
  return anchor.position < 1
    ? anchor.value + (1 - anchor.value) * (progress - anchor.position) / (1 - anchor.position)
    : anchor.value;
}

export function setupHomeBackgroundVideos(stage, doc = document, win = window) {
  if (!stage) return { setProgress() {}, setScene() {}, dispose() {} };
  // The opening sky has its own lifetime; this controller owns scene clips.
  const videos = [...stage.querySelectorAll('.home-background-video')];
  const grouped = videos.some(video => video.dataset?.homeScene);
  const eveningVideos = grouped
    ? videos.filter(video => video.dataset.homeTime === 'evening')
    : videos.slice(1, 2);
  const requested = new Set();
  const parked = new Set();
  let disposed = false;
  let suspended = false;
  let progress = 0;
  let scene = 'sky';
  for (const video of videos) {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = !video.dataset?.homeDeferPlayback;
    video.loop = true;
    video.playsInline = true;
  }
  const reconcile = (retry = false) => {
    const visible = !disposed && !suspended && doc.visibilityState !== 'hidden';
    for (const [index, video] of videos.entries()) {
      // At either endpoint only one video contributes pixels. During the
      // crossfade both play, retaining automatic, seamless reverse scrolling.
      // A single background loops through every scroll section, including
      // the final one. Only paired day/evening layers need endpoint parking.
      const inScene = !grouped || video.dataset.homeScene === scene;
      const evening = grouped ? video.dataset.homeTime === 'evening' : index > 0;
      const needed = visible && inScene && !video.dataset?.homeDeferPlayback && (videos.length === 1 || (evening ? progress > 0 : progress < 1));
      if (!needed) {
        requested.delete(video);
        // pause() also cancels pending native autoplay before metadata loads.
        if (!parked.has(video) || !video.paused) video.pause();
        parked.add(video);
      } else if (retry || !requested.has(video)) {
        parked.delete(video);
        requested.add(video);
        video.muted = true;
        try { video.play()?.catch(() => requested.delete(video)); }
        catch { requested.delete(video); }
      }
    }
  };
  const retry = () => reconcile(true);
  const visibility = () => reconcile(true);
  const hide = () => { suspended = true; reconcile(); };
  const show = () => { suspended = false; reconcile(true); };
  videos.forEach(video => video.addEventListener('loadeddata', retry));
  doc.addEventListener('visibilitychange', visibility);
  win.addEventListener('pageshow', show);
  win.addEventListener('pagehide', hide);
  win.addEventListener('pointerdown', retry, { once: true, passive: true });
  win.addEventListener('keydown', retry, { once: true });
  win.addEventListener('home-intro-complete', retry);
  reconcile();
  return {
    setProgress(value) {
      if (disposed) return;
      const next = Math.max(0, Math.min(1, value));
      if (next === progress) return;
      progress = next;
      // Keep this write local: an inherited variable on body invalidated the
      // whole page's styles on every scroll frame.
      for (const video of eveningVideos) video.style.opacity = String(progress);
      reconcile();
    },
    setScene(value) {
      if (disposed || !grouped || scene === value) return;
      scene = value;
      // The outgoing scene holds its last frame during the CSS crossfade.
      // Only the incoming day/evening pair needs to keep decoding video.
      reconcile();
    },
    dispose() {
      disposed = true;
      videos.forEach(video => video.removeEventListener('loadeddata', retry));
      doc.removeEventListener('visibilitychange', visibility);
      win.removeEventListener('pageshow', show);
      win.removeEventListener('pagehide', hide);
      win.removeEventListener('pointerdown', retry);
      win.removeEventListener('keydown', retry);
      win.removeEventListener('home-intro-complete', retry);
      reconcile();
    }
  };
}
