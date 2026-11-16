(() => {
  const header = document.querySelector('.global-header');
  if (!header) return;

  const parseColor = (value) => {
    const match = value && value.match(/[\d.]+/g);
    if (!match || match.length < 3) return null;
    const [r, g, b, a = 1] = match.map(Number);
    return a === 0 ? null : { r, g, b };
  };

  const luminance = ({ r, g, b }) => {
    const channel = value => {
      value /= 255;
      return value <= .03928 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
    };
    return .2126 * channel(r) + .7152 * channel(g) + .0722 * channel(b);
  };

  const saturation = ({ r, g, b }) => {
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    return max ? (max - min) / max : 0;
  };

  const update = () => {
    const archiveIntro = document.querySelector('.ka-film:not([hidden])');
    if (archiveIntro) {
      header.dataset.tone = 'light';
      return;
    }
    const x = Math.min(innerWidth - 1, Math.max(1, innerWidth * .5));
    const y = Math.min(innerHeight - 1, Math.max(1, header.getBoundingClientRect().height * .5));
    const stack = document.elementsFromPoint(x, y).filter(el => !header.contains(el) && el !== header);
    let coloredOrImage = false;
    let color = null;

    for (const start of stack) {
      for (let el = start; el && el !== document.documentElement; el = el.parentElement) {
        const style = getComputedStyle(el);
        const hasImage = style.backgroundImage !== 'none';
        if (hasImage) coloredOrImage = true;
        const candidate = parseColor(style.backgroundColor) || (hasImage ? parseColor(style.backgroundImage) : null);
        if (candidate) {
          color = candidate;
          if (saturation(candidate) > .12) coloredOrImage = true;
          break;
        }
      }
      if (color || coloredOrImage) break;
    }

    if (!color) color = parseColor(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255 };
    const needsWhite = luminance(color) < .46;
    header.dataset.tone = needsWhite ? 'light' : 'dark';
  };

  let queued = false;
  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  };

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  new MutationObserver(requestUpdate).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  const archiveIntro = document.querySelector('.ka-film');
  if (archiveIntro) new MutationObserver(requestUpdate).observe(archiveIntro, { attributes: true, attributeFilter: ['hidden', 'class', 'data-scene'] });
  update();
})();
