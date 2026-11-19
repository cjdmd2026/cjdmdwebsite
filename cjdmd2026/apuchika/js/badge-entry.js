const mobile = matchMedia('(max-width:800px)');
if (!mobile.matches) await import('./badge-v96.js?v=92');
mobile.addEventListener('change', () => location.reload());
