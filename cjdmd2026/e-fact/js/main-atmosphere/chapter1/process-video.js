(() => {
  const video = document.querySelector('#incineration-process-video');
  const label = document.querySelector('#process-video-label');
  const toggle = document.querySelector('.process-video-toggle');
  const progress = document.querySelector('.process-video-progress i');
  const items = [...document.querySelectorAll('#process .feature-item')];
  if (!video) return;

  const stages = [
    { time: 0, label: '반입과 저장' },
    { time: 6, label: '연소' },
    { time: 9, label: '후처리' },
    { time: 9, label: '후처리' }
  ];

  function playStage(index) {
    const stage = stages[index] || stages[0];
    label.textContent = stage.label;
    items.forEach((item, itemIndex) => item.classList.toggle('is-process-active', itemIndex === index));

    const seekAndPlay = () => {
      video.currentTime = stage.time;
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
      window.setTimeout(() => {
        if (Math.abs(video.currentTime - stage.time) > 1) video.currentTime = stage.time;
      }, 120);
    };

    if (video.readyState >= 1) seekAndPlay();
    else video.addEventListener('loadedmetadata', seekAndPlay, { once: true });
  }

  items.forEach((item, index) => {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `${stages[index].label} 영상 재생`);
    item.addEventListener('click', () => playStage(index));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        playStage(index);
      }
    });
  });

  toggle?.addEventListener('click', () => video.paused ? video.play().catch(() => {}) : video.pause());
  video.addEventListener('play', () => { if (toggle) toggle.innerHTML = '정지 <span>Ⅱ</span>'; });
  video.addEventListener('pause', () => { if (toggle) toggle.innerHTML = '재생 <span>▶</span>'; });
  video.addEventListener('timeupdate', () => {
    if (progress && Number.isFinite(video.duration) && video.duration > 0) progress.style.width = `${video.currentTime / video.duration * 100}%`;
  });
  items[0]?.classList.add('is-process-active');
})();
