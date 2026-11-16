(() => {
  const video = document.querySelector('#incineration-process-video');
  const label = document.querySelector('#process-video-label');
  const toggle = document.querySelector('.process-video-toggle');
  const progress = document.querySelector('.process-video-progress i');
  if (!video) return;

  if (label) label.textContent = '소각 과정';

  toggle?.addEventListener('click', () => video.paused ? video.play().catch(() => {}) : video.pause());
  video.addEventListener('play', () => { if (toggle) toggle.innerHTML = '정지 <span>Ⅱ</span>'; });
  video.addEventListener('pause', () => { if (toggle) toggle.innerHTML = '재생 <span>▶</span>'; });
  video.addEventListener('timeupdate', () => {
    if (progress && Number.isFinite(video.duration) && video.duration > 0) progress.style.width = `${video.currentTime / video.duration * 100}%`;
  });
})();
