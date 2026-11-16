(() => {
  document.querySelectorAll('.global-header nav a[href="jeong.html"]').forEach(link => link.remove());
  document.querySelectorAll('.global-header nav a[href="index.html"]').forEach(link => {
    if (link.textContent.trim().toUpperCase() === 'CHANNELS') link.href = 'media-by-era.html';
  });
  const saved = localStorage.getItem('yearon-theme');
  const initial = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = initial;

})();
