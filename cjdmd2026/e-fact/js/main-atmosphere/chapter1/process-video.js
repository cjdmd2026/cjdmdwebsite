(() => {
  const video = document.querySelector('#incineration-process-video');
  const frame = video?.closest('.detail-image');
  const toggle = document.querySelector('.process-video-toggle');
  const progress = document.querySelector('.process-video-progress i');
  const toggleLabel = toggle?.querySelector('strong');
  const toggleCaption = toggle?.querySelector('small');
  if (!video || !frame || !toggle) return;

  const setReadyState = (continued = false) => {
    frame.classList.remove('is-playing');
    video.controls = false;
    if (toggleLabel) toggleLabel.textContent = continued ? '계속 영상 보기' : '영상으로 알아보기';
    if (toggleCaption) toggleCaption.textContent = continued ? '멈춘 지점부터 재생' : '소각 과정 재생';
  };

  toggle.addEventListener('click', () => {
    video.muted = false;
    video.volume = 1;
    video.controls = true;
    video.play().catch(() => setReadyState(video.currentTime > 0));
  });

  video.addEventListener('play', () => {
    frame.classList.add('is-playing');
    video.controls = true;
  });

  video.addEventListener('pause', () => {
    if (!video.ended) setReadyState(video.currentTime > 0);
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    setReadyState(false);
  });

  video.addEventListener('processvideoreset', () => setReadyState(false));

  video.addEventListener('timeupdate', () => {
    if (progress && Number.isFinite(video.duration) && video.duration > 0) progress.style.width = `${video.currentTime / video.duration * 100}%`;
  });

  setReadyState(false);
})();
