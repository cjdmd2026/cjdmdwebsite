(() => {
  const group = document.querySelector('.invite-cards');
  if (!group) return;
  const cards = [...group.querySelectorAll('.invite-card')];
  let front = cards.find(card => card.classList.contains('apu')) || cards[0];
  let busy = false;
  let pending = null;
  front.classList.add('is-front');
  async function bringForward(card) {
    if (busy) { pending = card; return; }
    if (card === front) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      front.classList.remove('is-front');
      card.classList.add('is-front');
      front = card;
      return;
    }
    busy = true;
    const outward = cards.map(item => item.animate([
      {translate:'0 0'},
      {translate:`${item.classList.contains('chika') ? '-18%' : '18%'} -6px`}
    ], {duration:380, easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'}));
    await Promise.all(outward.map(animation => animation.finished));
    front.classList.remove('is-front');
    card.classList.add('is-front');
    front = card;
    const inward = cards.map(item => item.animate([
      {translate:`${item.classList.contains('chika') ? '-18%' : '18%'} -6px`},
      {translate:'0 0'}
    ], {duration:480,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}));
    await Promise.all(inward.map(animation => animation.finished));
    [...outward,...inward].forEach(animation => animation.cancel());
    busy = false;
    const next = pending;
    pending = null;
    if (next) bringForward(next);
  }
  cards.forEach(card => {
    card.addEventListener('pointerenter',event => {
      if (event.pointerType !== 'touch') bringForward(card);
    });
    card.addEventListener('focus',() => bringForward(card));
    card.addEventListener('click',() => bringForward(card));
  });
})();
