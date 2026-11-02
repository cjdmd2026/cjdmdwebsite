(() => {
  const movie = document.querySelector('#kit-movie');
  if (!movie) return;
  const stage = movie.querySelector('.kit-movie-stage');
  const screen = movie.querySelector('.kit-movie-screen');
  const video = movie.querySelector('[data-kit-video]');
  const header = document.querySelector('.site-header');
  const count = 192;
  let frame = 0, tick = 0, sequence = false, updateSequence;

  function progress() {
    const distance = Math.max(1, movie.offsetHeight - stage.offsetHeight);
    return Math.max(0, Math.min(1,
      (header.offsetHeight - movie.getBoundingClientRect().top) / (distance * .88)));
  }

  // Chromium uses the original transparent frames: no asynchronous video seek
  // can hold the scroll timeline at the poster or an earlier video frame.
  function startSequence() {
    if (sequence) return;
    sequence = true;
    video.pause();
    video.preload = 'none';
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    canvas.className = 'kit-scroll-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    screen.append(canvas);
    const context = canvas.getContext('2d', {alpha: true});
    const blobs = new Map(), requests = new Map(), decoded = new Map(), decoding = new Map();
    const failures = new Map();
    let warming = false, shown = -1, paintTicket = 0;
    const url = index => `assets/video/kit-alpha-frames-v52/frame-${String(index).padStart(3, '0')}.webp`;

    function getBlob(index) {
      if (blobs.has(index)) return Promise.resolve(blobs.get(index));
      if (requests.has(index)) return requests.get(index);
      const request = fetch(url(index), {cache: 'force-cache'})
        .then(response => {
          if (!response.ok) throw new Error('Frame unavailable');
          return response.blob();
        })
        .then(blob => { blobs.set(index, blob); return blob; })
        .catch(() => { failures.set(index, (failures.get(index) || 0) + 1); return null; })
        .finally(() => requests.delete(index));
      requests.set(index, request);
      return request;
    }

    function getImage(index) {
      if (decoded.has(index)) return Promise.resolve(decoded.get(index));
      if (decoding.has(index)) return decoding.get(index);
      const task = getBlob(index).then(async blob => {
        if (!blob) return null;
        const objectURL = URL.createObjectURL(blob);
        const image = new Image();
        image.src = objectURL;
        try { await image.decode(); } catch { return null; }
        finally { URL.revokeObjectURL(objectURL); }
        decoded.set(index, image);
        // Retain compressed frames, but bound decoded image memory.
        while (decoded.size > 10) {
          const furthest = [...decoded.keys()].sort((a, b) => Math.abs(b - frame) - Math.abs(a - frame))[0];
          decoded.delete(furthest);
        }
        return image;
      }).finally(() => decoding.delete(index));
      decoding.set(index, task);
      return task;
    }

    async function paint(index) {
      const ticket = ++paintTicket;
      const image = await getImage(index);
      if (!image || ticket !== paintTicket || index !== frame) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      shown = index;
      screen.classList.add('sequence-ready');
      for (const neighbor of [index - 1, index + 1]) {
        if (neighbor >= 0 && neighbor < count) void getImage(neighbor);
      }
    }

    // Fetch near the section, prioritizing the latest scroll position even
    // after a fast jump or a reversal. Four requests bound network pressure.
    async function worker() {
      while (warming) {
        const remaining = Array.from({length: count}, (_, i) => i)
          .filter(i => !blobs.has(i) && !requests.has(i) && (failures.get(i) || 0) < 2)
          .sort((a, b) => Math.abs(a - frame) - Math.abs(b - frame));
        if (!remaining.length) return;
        const index = remaining[0];
        await getBlob(index);
        if (index === frame && shown !== frame) void paint(frame);
      }
    }
    function warm() {
      if (warming) return;
      warming = true;
      for (let i = 0; i < 4; i++) void worker();
    }
    updateSequence = () => { if (shown !== frame) void paint(frame); };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { warm(); observer.disconnect(); }
    }, {rootMargin: '2000px 0px'});
    observer.observe(movie);
    updateSequence();
  }

  function seekVideo() {
    if (sequence || video.readyState < 1 || !Number.isFinite(video.duration)) return;
    const target = frame / (count - 1) * Math.max(0, video.duration - 1 / 24);
    if (!video.seeking && Math.abs(video.currentTime - target) > 1 / 48) video.currentTime = target;
  }
  function render() {
    tick = 0;
    frame = Math.round(progress() * (count - 1));
    if (sequence) updateSequence(); else seekVideo();
  }
  function schedule() { if (!tick) tick = requestAnimationFrame(render); }

  if (/Chrome|Chromium|CriOS|Edg|OPR/.test(navigator.userAgent)) {
    startSequence();
  } else {
    video.addEventListener('loadedmetadata', schedule);
    video.addEventListener('loadeddata', () => { screen.classList.add('webm-ready'); schedule(); });
    video.addEventListener('seeked', seekVideo);
    video.addEventListener('error', startSequence);
    if (video.readyState >= 2) screen.classList.add('webm-ready');
    video.preload = 'auto';
    video.load();
  }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
