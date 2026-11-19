(() => {
  document.querySelector('[data-episode-back]')?.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });
})();
