(() => {
  const script = document.currentScript;
  const music = new Audio(new URL('../assets/audio/apuchika-bgm-soft-v71.mp3', script.src).href);
  music.id = 'site-background-music';
  music.loop = true;
  music.preload = 'none';
  music.hidden = true;
  document.body.append(music);
  const existingButton = document.querySelector('.site-music-toggle');
  const button = existingButton || document.createElement('button');
  button.type = 'button';
  button.className = 'site-music-toggle';
  button.textContent = 'BGM 켜기';
  button.setAttribute('aria-label', '배경음악 켜기');
  button.setAttribute('aria-pressed', 'false');
  if (!existingButton) document.body.append(button);
  const read = (key) => { try { return sessionStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { sessionStorage.setItem(key, value); } catch {} };
  const readPreference = () => {
    try { return localStorage.getItem('apu-bgm-enabled') ?? read('apu-bgm-enabled'); }
    catch { return read('apu-bgm-enabled'); }
  };
  const preference = readPreference();
  let enabled = preference !== 'false';
  const remember = value => {
    save('apu-bgm-enabled', String(value));
    try { localStorage.setItem('apu-bgm-enabled', String(value)); } catch {}
  };
  let pending = false;
  let videoPlaying = false;
  document.addEventListener('apu:video-start', () => { videoPlaying = true; music.pause(); });
  const savedTime = Number(read('apu-bgm-time')) || 0;
  music.addEventListener('loadedmetadata', () => {
    if (savedTime < music.duration) music.currentTime = savedTime;
  }, { once: true });
  function render() {
    const playing = !music.paused;
    const icon = new URL(playing ? '../assets/images/sound-on-v73.svg' : '../assets/images/sound-off-v73.svg', script.src);
    button.innerHTML = '<img src="' + icon.href + '" alt="" width="64" height="64">';
    button.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');
    button.setAttribute('aria-pressed', String(playing));
  }
  async function start() {
    if (!enabled || videoPlaying || pending || !music.paused || document.hidden) return;
    pending = true;
    try { await music.play(); remember(true); } catch { /* A user gesture may be required. */ }
    finally { pending = false; render(); }
  }
  button.addEventListener('click', () => {
    unlocked = true;
    videoPlaying = false;
    enabled = music.paused;
    remember(enabled);
    if (enabled) start();
    else { music.pause(); render(); }
  });
  let unlocked = false;
  const unlock = (event) => {
    unlocked = true;
    if (button.contains(event.target)) return;
    start();
    playBubbles();
  };
  document.addEventListener('pointerdown', unlock, { passive: true });
  document.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) music.pause();
    else start();
  });
  render();
  music.addEventListener('play', render);
  music.addEventListener('pause', render);
  // Restore enabled playback on every page, without requiring another click.
  if (preference === 'true') start();
  window.addEventListener('pageshow', () => { if (readPreference() === 'true') start(); });
  const scene = document.querySelector('#solution');
  let bubbles = null, sceneVisible = false, bubblesPlayed = false;
  function playBubbles() {
    if (!bubbles || !unlocked || !sceneVisible || bubblesPlayed || document.hidden) return;
    const video = scene.querySelector('.hero-logo-video');
    const gif = scene.querySelector('.mobile-logo-gif');
    const ready = matchMedia('(max-width:800px)').matches ? gif?.getAttribute('src') : video && !video.paused;
    if (!ready) return;
    bubblesPlayed = true;
    bubbles.currentTime = 0;
    bubbles.play().catch(() => { bubblesPlayed = false; });
  }
  if (scene) {
    bubbles = new Audio(new URL('../assets/audio/logo-bubbles-soft-v72.mp3', script.src).href);
    bubbles.preload = 'none';
    scene.querySelector('video')?.addEventListener('playing', playBubbles);
    scene.querySelector('.mobile-logo-gif')?.addEventListener('load', playBubbles);
    new IntersectionObserver(entries => {
      sceneVisible = entries[0].isIntersecting;
      if (sceneVisible) playBubbles();
      else { bubbles.pause(); bubbles.currentTime = 0; bubblesPlayed = false; }
    }, { threshold: .2 }).observe(scene);
    document.addEventListener('visibilitychange', () => { if (document.hidden) bubbles.pause(); });
  }
  window.addEventListener('pagehide', () => {
    save('apu-bgm-time', String(music.currentTime));
    music.pause();
  });
})();
