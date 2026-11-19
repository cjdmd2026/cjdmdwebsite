document.addEventListener('DOMContentLoaded', () => {
  const back = document.querySelector('.passes-back');
  back?.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      const previous = new URL(document.referrer);
      if (previous.origin === location.origin && previous.pathname !== location.pathname && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    } catch { /* A direct visit returns to the kit page. */ }
  });
});
