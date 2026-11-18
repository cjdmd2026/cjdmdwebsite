(() => {
  const track = document.querySelector('.app-hero-scroll');
  const hero = track.querySelector('.app-layout-hero');
  const visual = hero.querySelector('.app-layout-hero__visual');
  const orbitCanvas = hero.querySelector(".app-hero-orbit");
  const screen = hero.querySelector('.app-layout-phone__screen');
  const header = document.querySelector('body > header');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const lanes = [...hero.querySelectorAll('.app-magnet-lane')];
  const pieces = lanes.flatMap(lane => [...lane.querySelectorAll('img')]);
  let frame;
  let geometry;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  function orbitSpread(x, width, height) {
    const edge = Math.abs(2 * x / width - 1);
    return height * (.065 + .34 * edge ** 2.4);
  }

  function drawOrbit(width, viewHeight, orbitY, height) {
    const scale = Math.min(devicePixelRatio || 1, 2);
    orbitCanvas.width = Math.round(width * scale);
    orbitCanvas.height = Math.round(viewHeight * scale);
    const context = orbitCanvas.getContext('2d');
    context.scale(scale, scale);

    const colors = ['#d8edff30', '#b1eaff48', '#a4fff352', '#d5f6ff55', '#d8e6ff40'];
    colors.forEach((color, band) => {
      context.beginPath();
      const top = -1 + band * .4;
      const bottom = top + .4;
      for (let step = 0; step <= 80; step++) {
        const x = width * step / 80;
        context.lineTo(x, orbitY + orbitSpread(x, width, height) * top);
      }
      for (let step = 80; step >= 0; step--) {
        const x = width * step / 80;
        context.lineTo(x, orbitY + orbitSpread(x, width, height) * bottom);
      }
      context.closePath();
      context.fillStyle = color;
      context.fill();
    });
  }

  function layout() {
    track.classList.toggle('is-animated', !reducedMotion.matches);
    const view = hero.getBoundingClientRect();
    const visualTop = visual.getBoundingClientRect().top - view.top;
    const top = header.offsetHeight + parseFloat(getComputedStyle(header).top) + 14;
    const height = Math.max(0, view.height - top - 8);
    visual.style.setProperty('--magnet-top', `${top - visualTop}px`);
    visual.style.setProperty('--magnet-height', `${height}px`);
    visual.style.setProperty('--magnet-size', `${Math.min(220, height / 3.9)}px`);
    const target = screen.getBoundingClientRect();
    geometry = {
      width: view.width,
      top,
      height,
      orbitY: clamp(target.top - view.top + target.height * .34, top + height * .42, top + height * .74),
      targetX: target.left - view.left + target.width / 2,
      targetY: clamp(target.top - view.top + target.height * .3, top, view.height - 32),
      laneLeft: lanes.map(lane => lane.getBoundingClientRect().left - view.left),
    };
    drawOrbit(view.width, view.height, geometry.orbitY, height);
    schedule();
  }

  function render(time) {
    frame = undefined;
    const { width, top, height, orbitY, targetX, targetY, laneLeft } = geometry;
    const motion = !reducedMotion.matches;
    const progress = motion ? clamp(-7 * track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - hero.offsetHeight), 0, 7) : 0;
    const orbit = Math.min(progress * 3 / 2.55, 3);
    const gathering = clamp((progress - 2.55) / 1.45, 0, 1);
    screen.style.setProperty('--collection-list-reveal', String(clamp((progress - 5.25) / 1.0, 0, 1)));
    screen.style.setProperty('--collection-reveal', String(clamp((gathering - .69) / .27, 0, 1)));
    screen.style.setProperty('--collection-flash', String(Math.max(0, 1 - Math.abs(gathering - .77) / .13) * .75));

    orbitCanvas.style.opacity = String(1 - gathering);
    pieces.forEach((image, index) => {
      const side = index < pieces.length / 2 ? 0 : 1;
      const slot = index % (pieces.length / 2);
      const order = slot * 2 + side;
      const phase = slot / (pieces.length / 2) + side / pieces.length + orbit / 3;
      const travel = ((phase % 1) + 1) % 1;
      const x = width * (travel * 1.32 - .16);
      const outer = clamp(Math.abs(2 * x / width - 1), 0, 1);
      const perspective = .53 + outer * .63;
      const float = motion ? Math.sin(time / 700 + order * .7) * 3 : 0;
      const direction = side ? 1 : -1;
      const y = orbitY + direction * orbitSpread(x, width, height) * .72 + float;
      const collect = clamp((gathering - order / (pieces.length - 1) * .364) / .60, 0, 1);
      const eased = collect ** 2.3;
      const approach = Math.sin(collect * Math.PI);
      const gatherX = x + (targetX - x) * eased;
      const gatherY = y + (targetY - y) * eased - approach * height * .13;
      image.style.setProperty('--x', `${gatherX - laneLeft[side]}px`);
      image.style.setProperty('--y', `${gatherY - top}px`);
      image.style.setProperty('--orbit-angle', `${(2 * travel - 1) * 10 * (1 - eased)}deg`);
      image.style.setProperty('--scale', String(perspective * (1 + approach * .42) * (1 - eased * .92)));
      image.style.setProperty('--depth-blur', `${(1 - outer) * 1.2}px`);
      image.style.zIndex = String(collect > .04 ? 50 : 14 + side);
      image.style.opacity = String((.72 + outer * .28) * (1 - clamp((collect - .76) / .24, 0, 1)));
    });
    if (motion && progress < 4 && track.getBoundingClientRect().top < innerHeight) schedule();
  }

  function schedule() {
    if (frame === undefined) frame = requestAnimationFrame(render);
  }

  const observer = new ResizeObserver(layout);
  observer.observe(hero);
  observer.observe(header);
  observer.observe(visual);
  addEventListener('scroll', schedule, { passive: true });
  reducedMotion.addEventListener('change', layout);
  layout();
})();
