(() => {
  const T = EFactTMS;
  const $ = selector => document.querySelector(selector);
  let selected = '1';
  const allFacilities = () => T.state.facilities || [];

  function updateMap(facility) {
    if (!facility) return;
    document.querySelectorAll('.facility-map-pin').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.facility === facility.id)));
    $('#facility-map-name').textContent = facility.name;
    $('#facility-map-status').textContent = facility.outlets.length
      ? `공개 배출구 ${facility.outlets.length}개 · 측정 시점을 함께 확인하세요.`
      : '공개 측정 자료가 확인되지 않은 시설입니다.';
  }

  function render() {
    const district = $('#district').value;
    const list = allFacilities().filter(f => district === 'all' || f.category === district);
    if (!list.some(f => f.id === selected)) selected = list[0]?.id;
    $('#facilities').innerHTML = list.map(f => `<button type="button" class="facility-button" data-id="${f.id}" aria-pressed="${f.id === selected}"><small>${T.esc(f.category)}</small><strong>${T.esc(f.name)}</strong><span>${f.outlets.length ? `공개 배출구 ${f.outlets.length}개` : '측정 자료 미확인'}</span></button>`).join('');
    $('#facilities').querySelectorAll('button').forEach(button => button.onclick = () => selectFacility(button.dataset.id, false));
    const facility = allFacilities().find(f => f.id === selected);
    $('#detail').innerHTML = facility ? T.detail(facility) : '<p>해당 사업장이 없습니다.</p>';
    if (!facility) return;
    updateMap(facility);
    $('#scene-facility').textContent = facility.name;
    $('#scene-status').textContent = facility.outlets.length ? '공개 측정 자료 · 시점 확인' : '자료 미확인';
    document.querySelectorAll('[data-facility]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.facility === facility.id)));
    document.dispatchEvent(new CustomEvent('facility-selected', { detail: facility.id }));
  }

  function selectFacility(id, scrollToDetail) {
    selected = id;
    $('#district').value = 'all';
    render();
    if (!scrollToDetail) return;
    const detail = $('#detail');
    detail.classList.remove('map-selected');
    requestAnimationFrame(() => detail.classList.add('map-selected'));
    $('#facility-detail').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => detail.focus({ preventScroll: true }), 650);
  }

  document.querySelectorAll('.facility-map-pin').forEach(button => button.addEventListener('click', () => selectFacility(button.dataset.facility, true)));
  $('#district').onchange = render;
  document.addEventListener('choose-facility', event => selectFacility(event.detail, false));
  document.addEventListener('tms-update', render);
  render();
  T.load();
})();
