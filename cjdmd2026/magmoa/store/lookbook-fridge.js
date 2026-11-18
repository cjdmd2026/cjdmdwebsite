(() => {
  const opener = document.querySelector('#open-fridge');
  const dialog = document.querySelector('.lookbook-fridge');
  if (!opener || !dialog) return;
  const scene = dialog.querySelector('.fridge-scene');
  const detail = dialog.querySelector('.fridge-detail');
  const instruction = dialog.querySelector('.fridge-instruction');
  const magnets = [...scene.querySelectorAll('[data-product]')];
  const currency = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });
  let selected;

  function reset() {
    scene.classList.remove('is-zoomed');
    dialog.querySelector('.fridge-door-control').hidden = false;
    detail.hidden = true;
    instruction.hidden = false;
    magnets.forEach(button => { button.disabled = false; });
    scene.querySelectorAll('[data-kitchen]').forEach(button => { button.disabled = false; });
    selected?.classList.remove('is-selected');
    selected = undefined;
  }

  magnets.forEach(button => {
    const product = PRODUCTS.find(item => item.id === Number(button.dataset.product));
    const image = new Image();
    image.src = product.img1;
    image.alt = product.title;
    button.append(image);

    button.addEventListener('click', () => {
      selected = button;
      button.classList.add('is-selected');
      scene.style.setProperty('--zoom-x', button.dataset.sceneX || button.style.getPropertyValue('--x'));
      scene.style.setProperty('--zoom-y', button.style.getPropertyValue('--y'));
      dialog.querySelector('#fridge-product-title').textContent = product.title;
      detail.querySelector('.fridge-product-description').textContent = product.desc;
      detail.querySelector('.fridge-product-price').textContent = currency.format(product.price);
      detail.querySelector('.fridge-product-link').href = `detail_s.html?id=${product.id}`;
      instruction.hidden = true;
      detail.hidden = false;
      scene.classList.add('is-zoomed');
      control.hidden = true;
      detail.focus({ preventScroll: true });
      magnets.forEach(magnet => { magnet.disabled = true; });
      scene.querySelectorAll('[data-kitchen]').forEach(button => { button.disabled = true; });
    });
  });

  const doorButtons = [...dialog.querySelectorAll('[data-door-toggle]')];
  const control = dialog.querySelector('.fridge-door-control');
  function setDoors(open) {
    scene.classList.toggle('are-doors-open', open);
    doorButtons.forEach(button => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? '냉장고 문 닫기' : '냉장고 문 열기');
    });
    control.textContent = open ? '냉장고 닫기 ↙' : '냉장고 열어보기 ↗';
    magnets.forEach(button => { button.disabled = open; });
    instruction.textContent = open ? '여행에서 돌아온 일상, 냉장고 속 작은 풍경을 만나보세요.' : '손잡이를 눌러 냉장고를 열어보세요. 마그넷을 누르면 상품 이야기가 열려요.';
  }
  doorButtons.forEach(button => button.addEventListener('click', () => setDoors(!scene.classList.contains('are-doors-open'))));
  dialog.addEventListener('close', () => setDoors(false));

  function back() {
    const previous = selected;
    reset();
    previous?.focus({ preventScroll: true });
  }

  opener.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('[data-close-fridge]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-back-fridge]').addEventListener('click', back);
  dialog.addEventListener('cancel', event => {
    if (!selected) {
      if (scene.classList.contains('are-doors-open')) { event.preventDefault(); setDoors(false); }
      return;
    }
    event.preventDefault();
    back();
  });
  dialog.addEventListener('close', () => {
    reset();
    opener.focus({ preventScroll: true });
  });
})();
