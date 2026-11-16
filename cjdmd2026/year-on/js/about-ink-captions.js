(() => {
  const root = document.querySelector('#aboutEntryStory');
  if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scenes = root.querySelectorAll('.yai-question,.yai-artist-intro,.yai-bridge');
  const refresh = scene => scene.classList.toggle('ink-sentence-enter', scene.style.visibility === 'visible');
  const observer = new MutationObserver(records => {
    for (const {target} of records) refresh(target);
  });
  for (const scene of scenes) {
    observer.observe(scene, {attributes: true, attributeFilter: ['style']});
    refresh(scene);
  }
})();
