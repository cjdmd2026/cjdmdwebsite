(() => {
  const scriptUrl = document.currentScript?.src;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || !scriptUrl) return;
  // Keep the native pointer available until the sticker has loaded successfully.
  const image = new Image();
  image.src = new URL('cursor-paper-plane.svg', scriptUrl).href;
  image.onload = () => {
    const cursor = document.createElement('div');
    cursor.className = 'magmoa-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
    document.documentElement.classList.add('has-custom-cursor');
    let x = -100, y = -100, frame = 0;
    const update = () => { cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; frame = 0; };
    document.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      x = event.clientX; y = event.clientY;
      cursor.classList.add('is-visible');
      if (!frame) frame = requestAnimationFrame(update);
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, summary, input, textarea, select, label, [role="button"], [role="tab"], [onclick]')));
    }, {passive:true});
    document.addEventListener('pointerout', event => { if (!event.relatedTarget) cursor.classList.remove('is-visible'); });
    window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
    finePointer.addEventListener('change', () => {
      document.documentElement.classList.toggle('has-custom-cursor', finePointer.matches);
      if (!finePointer.matches) cursor.classList.remove('is-visible');
    });
    document.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.pointerType === 'touch' || reduced.matches || !finePointer.matches) return;
      if (typeof Element.prototype.animate !== 'function') return;
      const offsets = [[-22,-20],[9,-25],[23,-7],[-24,9]];
      offsets.forEach(([dx,dy], i) => {
        const piece = document.createElement('span');
        piece.className = 'magmoa-paper-piece';
        piece.setAttribute('aria-hidden', 'true');
        piece.style.left = `${event.clientX}px`; piece.style.top = `${event.clientY}px`;
        piece.style.background = i % 2 ? '#fff' : '#b9f300';
        if (i % 2) piece.style.clipPath = 'polygon(0 15%,80% 0,100% 85%,20% 100%)';
        document.body.append(piece);
        const animation = piece.animate([
          {transform:`translate(-50%,-50%) rotate(${i*35}deg) scale(.4)`,opacity:1},
          {transform:`translate(${dx*.6}px,${dy*.6}px) rotate(${i*35+35}deg) scale(1)`,opacity:.9,offset:.35},
          {transform:`translate(${dx}px,${dy}px) rotate(${i*35+75}deg) scale(.55)`,opacity:0}
        ], {duration:320,easing:'cubic-bezier(.16,.8,.3,1)',fill:'forwards'});
        animation.onfinish = () => piece.remove();
        animation.oncancel = () => piece.remove();
      });
    }, {passive:true});
  };
})();
