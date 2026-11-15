// Archive navigation is independent of the viewer and its lighting controls.
export const archiveCategories = [
  { id: 'minga', ko: '민가', en: 'House', color: '#8a6f5a', art: './assets/images/archive-categories/arc_house_color.webp', roofTipY: 125, image: './assets/images/archive-categories/house.webp?v=20261007', koCopy: '얕은 처마와\n부드러운 그늘', enCopy: 'Shallow eaves and\nsoft shade' },
  { id: 'sachal', ko: '사찰·향교', en: 'Temple & Hyanggyo', color: '#655044', art: './assets/images/archive-categories/arc_temple_color.webp', roofTipY: 70, image: './assets/images/archive-categories/temple.webp?v=20261007', koCopy: '깊고 겹쳐진\n처마와 층진 그늘', enCopy: 'Deep, layered eaves\nand stacked shade' },
  { id: 'gate', ko: '성문·누각', en: 'Gate/Pavilion', color: '#3e3935', art: './assets/images/archive-categories/arc_gate_color.webp', roofTipY: 249, image: './assets/images/archive-categories/gate.webp?v=20261007', koCopy: '통로와 개방 공간을\n가르는 넓은 그늘', enCopy: 'Broad shade dividing\npaths and open spaces' }
];

const categoryGroup = category => category === 'hyanggyo' ? 'sachal' : category;
export const archiveLayout = (state = {}) => state.layout === 'carousel' ? 'carousel' : 'grid';

// Viewer models represent specific buildings, unlike the broader archive tabs.
export const viewerArchiveSites = Object.freeze({
  minga: 'bugang-old-house', sachal: 'yonghwasa', gate: 'sangdangsanseong'
});

export function viewerArchiveRecords(items, building, part, limit = 4) {
  const site = viewerArchiveSites[building];
  if (!site) return [];
  const records = items.filter(item => item.category === building &&
    (item.site === site || (building === 'gate' && item.site.startsWith(`${site}-`))));
  const exact = records.filter(item => item.part === part);
  return (exact.length ? exact : records).slice(0, limit);
}

export function filterArchiveRecords(items, state = {}, munuiSites = []) {
  return items.filter(item => ['category', 'era', 'region', 'part'].every(key =>
    !state[key] || state[key] === 'all' || (key === 'category' ? categoryGroup(item[key]) === categoryGroup(state[key]) : item[key] === state[key])) &&
    (!state.site || state.site === 'all' || (state.site === 'munui' ? munuiSites.includes(item.site)
      : state.site === 'sangdangsanseong' ? item.site === state.site || item.site.startsWith('sangdangsanseong-')
      : item.site === state.site)));
}

export function archiveLocations(items, category, order) {
  return order.map(site => ({ site, records: filterArchiveRecords(items, { category, site }) }))
    .filter(place => place.records.length);
}

export function readArchiveRoute(search, items, munuiSites = []) {
  const params = new URLSearchParams(search);
  const state = {};
  for (const key of ['category', 'site', 'part', 'era', 'region']) {
    const value = params.get(key);
    if (value && value !== 'all' && (items.some(item => item[key] === value) || (key === 'site' && (value === 'munui'
      || (value === 'sangdangsanseong' && items.some(item => item.site.startsWith('sangdangsanseong-'))))))) state[key] = value;
  }
  if (state.site === 'sangdangsanseong') state.category = 'gate';
  else if (state.site && state.site !== 'munui') state.category = items.find(item => item.site === state.site)?.category;
  if (state.category) state.category = categoryGroup(state.category);
  if (['grid', 'carousel'].includes(params.get('layout'))) state.layout = params.get('layout');
  state.view = params.get('view') === 'photos' || state.category || state.site || state.part || state.era || state.region ? 'photos' : 'categories';
  return state;
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const imagePath = item => item.image.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

// Match photographs by record ID, even when only one layout has them on screen.
export function planArchiveReflow(before, after, viewport) {
  const visible = rect => rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < viewport.width && rect.bottom > 0 && rect.top < viewport.height;
  const bounded = rect => ({
    left: Math.max(-rect.width, Math.min(viewport.width, rect.left)),
    top: Math.max(-rect.height, Math.min(viewport.height, rect.top)),
    width: rect.width, height: rect.height
  });
  const frame = rect => ({ left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
  return [...after].flatMap(([id, target]) => {
    const source = before.get(id);
    if (!source || (!visible(source.rect) && !visible(target.rect))) return [];
    return [{ id, source, target, frames: [frame(bounded(source.rect)), frame(bounded(target.rect))] }];
  });
}

export function setupArchiveGallery({ items, siteLabels, siteOrder, munuiSites, getLang, partLabel, openPhoto }) {
  const root = document.getElementById('archiveGallery');
  if (!root) return;
  const content = root.querySelector('[data-archive-content]');
  const heading = root.querySelector('.archive-gallery-head');
  const back = root.querySelector('[data-archive-back]');
  const status = root.querySelector('[data-archive-status]');
  let state = readArchiveRoute(location.search, items, munuiSites);
  let disposeStrip = () => {};
  let disposeCategoryAlignment = () => {};
  let disposeLayoutTransition = () => {};
  const rememberedPhotos = new Map();

  const isKo = () => getLang() === 'ko';
  const label = site => siteLabels[site]?.[getLang()] || site;
  const countLabel = count => isKo() ? `${count}개 사진` : `${count} photos`;
  const img = (item, lazy = true) => `<img src="${escapeHtml(imagePath(item))}" alt="" ${lazy ? 'loading="lazy"' : ''} decoding="async" draggable="false">`;
  const photoFace = (item, lazy, side) => `<span class="archive-photo-face archive-photo-face--${side}"${side === 'back' ? ' aria-hidden="true"' : ''}>${img(item, lazy)}<span class="archive-photo-copy"><strong>${escapeHtml(label(item.site))}</strong></span></span>`;
  const selectionKey = () => [state.category, state.site, state.part, state.era, state.region].join('/');

  function navigate(next, focusSelector = '[data-view-heading]', animate = true) {
    state = next;
    const url = new URL(location.href);
    if (state.view === 'photos') url.searchParams.set('view', 'photos');
    else url.searchParams.delete('view');
    if (state.layout) url.searchParams.set('layout', archiveLayout(state));
    else url.searchParams.delete('layout');
    for (const key of ['category', 'site', 'part', 'era', 'region']) {
      if (state[key]) url.searchParams.set(key, state[key]);
      else url.searchParams.delete(key);
    }
    history.pushState(null, '', url);
    render(animate);
    window.scrollTo({ top: 0, behavior: 'instant' });
    root.querySelector(focusSelector)?.focus({ preventScroll: true });
  }

  function cancelLayoutTransition() {
    disposeLayoutTransition();
    disposeLayoutTransition = () => {};
  }

  function capturePhotoPositions() {
    return new Map([...content.querySelectorAll('[data-open-record]')].map(card => {
      const image = card.querySelector('img');
      return [card.dataset.openRecord, { card, image, rect: image.getBoundingClientRect() }];
    }));
  }

  function changeLayout(next, focusSelector) {
    cancelLayoutTransition();
    const before = capturePhotoPositions();
    navigate(next, focusSelector, false);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const moves = planArchiveReflow(before, capturePhotoPositions(), viewport);
    if (!moves.length || typeof moves[0].target.image.animate !== 'function') return;

    const overlay = document.createElement('div');
    overlay.className = 'archive-layout-transition';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.append(overlay);
    const animations = [];
    const hiddenCards = [];
    const enteringGrid = archiveLayout(next) === 'grid';
    const scrollTop = window.scrollY;
    let disposed = false;
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      animations.forEach(animation => animation.cancel());
      hiddenCards.forEach(card => { card.style.visibility = ''; });
      overlay.remove();
      window.removeEventListener('resize', cancelLayoutTransition);
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (window.scrollY !== scrollTop) cancelLayoutTransition(); };
    disposeLayoutTransition = cleanup;
    window.addEventListener('resize', cancelLayoutTransition, { once: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    moves.forEach(({ source, target, frames }, index) => {
      const photograph = target.image.cloneNode(false);
      photograph.src = source.image.currentSrc || source.image.src;
      photograph.loading = 'eager';
      photograph.className = 'archive-layout-photograph';
      photograph.style.filter = getComputedStyle(source.image).filter;
      overlay.append(photograph);
      target.card.style.visibility = 'hidden';
      hiddenCards.push(target.card);
      const delay = Math.min(index, 9) * 24;
      const endFilter = getComputedStyle(target.image).filter;
      const flight = photograph.animate([
        { ...frames[0], filter: photograph.style.filter, borderRadius: '8px' },
        { ...frames[1], filter: endFilter, borderRadius: '8px' }
      ], { duration: 680, delay, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both' });
      animations.push(flight);
      const copy = target.card.querySelector('.archive-grid-copy, .archive-photo-copy');
      if (copy) animations.push(copy.animate([
        { opacity: 0, translate: '0 6px' },
        { opacity: getComputedStyle(copy).opacity, translate: '0 0' }
      ], { duration: 220, delay: 530 + delay, fill: 'both', easing: 'ease-out' }));
      // Reveal the destination at its arrival; other photographs keep travelling.
      flight.finished.then(() => {
        if (!disposed) { target.card.style.visibility = ''; photograph.style.visibility = 'hidden'; }
      }).catch(() => {});
    });
    const controls = content.querySelector('.archive-photo-controls');
    if (controls && !enteringGrid) animations.push(controls.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: 430, fill: 'both' }));
    Promise.allSettled(animations.map(animation => animation.finished)).then(cleanup);
  }

  function changePhotoFilter(next, focusSelector, direction) {
    cancelLayoutTransition();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(next, focusSelector, false);
      return;
    }
    const visible = ({ rect }) => rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
    const outgoing = [...capturePhotoPositions().values()].filter(visible);
    // Clone only visible cards before rendering; retain their captions and crop.
    const snapshots = outgoing.map(({ card, rect, image }) => {
      const snapshot = card.cloneNode(true);
      // A stationary snapshot needs one face, not two large decoded textures.
      snapshot.querySelector?.('.archive-photo-face--back')?.remove();
      const photo = snapshot.querySelector?.('img');
      if (photo) { photo.loading = 'eager'; photo.style.filter = getComputedStyle(image).filter; }
      return { card: snapshot, rect };
    });
    navigate(next, focusSelector, false);
    const incoming = [...capturePhotoPositions().values()].filter(visible);
    if (!incoming.length && !snapshots.length) return;
    if (typeof (incoming[0]?.card || snapshots[0]?.card)?.animate !== 'function') return;

    const overlay = document.createElement('div');
    overlay.className = 'archive-layout-transition';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('inert', '');
    document.body.append(overlay);
    const animations = [];
    const distance = direction * Math.min(280, Math.max(120, window.innerWidth * .18));
    const scrollTop = window.scrollY;
    let disposed = false;
    let readyTimer = 0;
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      clearTimeout(readyTimer);
      animations.forEach(animation => animation.cancel());
      overlay.remove();
      window.removeEventListener('resize', cancelLayoutTransition);
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (window.scrollY !== scrollTop) cancelLayoutTransition(); };
    disposeLayoutTransition = cleanup;
    window.addEventListener('resize', cancelLayoutTransition, { once: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    snapshots.forEach(({ card, rect }, index) => {
      card.className += ' archive-filter-card';
      Object.assign(card.style, {
        left: `${rect.left}px`, top: `${rect.top}px`,
        width: `${rect.width}px`, height: `${rect.height}px`
      });
      overlay.append(card);
      animations.push(card.animate([
        { translate: '0 0', opacity: 1 },
        { translate: `${-distance}px 0`, opacity: 0 }
      ], { duration: 220, delay: Math.min(index, 4) * 10, fill: 'both', easing: 'cubic-bezier(.4,0,.6,1)' }));
    });
    incoming.forEach(({ card }, index) => {
      animations.push(card.animate([
        { translate: `${distance}px 0`, opacity: 0 },
        { translate: '0 0', opacity: 1 }
      ], { duration: 360, delay: 30 + Math.min(index, 4) * 15, fill: 'both', easing: 'cubic-bezier(.22,.61,.36,1)' }));
    });
    const controls = content.querySelector('.archive-photo-controls');
    if (controls) animations.push(controls.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: 140, fill: 'both' }));
    // Keep the old photos visible while newly selected visible photos decode.
    // Limit the wait so a failed or slow image cannot lock navigation.
    const decoding = incoming.flatMap(({ image }) => {
      if (typeof image.decode !== 'function') return [];
      image.loading = 'eager';
      image.fetchPriority = 'high';
      return [image.decode().catch(() => {})];
    });
    if (decoding.length) {
      animations.forEach(animation => animation.pause());
      Promise.race([Promise.allSettled(decoding), new Promise(resolve => { readyTimer = setTimeout(resolve, 250); })]).then(() => {
        clearTimeout(readyTimer);
        if (!disposed) animations.forEach(animation => animation.play());
      });
    }
    Promise.allSettled(animations.map(animation => animation.finished)).then(cleanup);
  }

  function renderCategories(animate) {
    const categories = archiveCategories.filter(category => items.some(item => item.category === category.id));
    content.innerHTML = `<section class="archive-category-cards${animate ? ' is-entering' : ''}" aria-label="${isKo() ? '건축 종류 선택' : 'Choose a building type'}">${categories.map((category, index) => {
      const title = escapeHtml(category[getLang()]).replace('·', '<span class="archive-category-separator">·</span>');
      return `<button type="button" class="archive-category-card" data-category="${category.id}" style="--category-color:${category.color};--entry-order:${index}">
        <span class="archive-category-art" aria-hidden="true"><img src="${category.art}" alt="" width="1200" height="1400" decoding="async" draggable="false"></span>
        <h2>${title}</h2>
        <p>${escapeHtml(category[isKo() ? 'koCopy' : 'enCopy'])}</p>
        <span class="archive-category-image"><img src="${category.image}" alt="" decoding="async" draggable="false"></span>
        <span class="archive-category-arrow" aria-hidden="true">↗</span>
      </button>`;
    }).join('')}</section>`;
    const cards = [...content.querySelectorAll('.archive-category-card')];
    if (animate) {
      const entrance = cards.at(-1)?.getAnimations().find(animation => animation.animationName === 'archive-category-arrive');
      if (entrance) entrance.finished.then(() => content.querySelector('.archive-category-cards')?.classList.remove('is-entering')).catch(() => {});
      else content.querySelector('.archive-category-cards')?.classList.remove('is-entering');
    }
    const alignRoofTips = () => {
      const artwork = cards.map(card => {
        const art = card.querySelector('.archive-category-art');
        const image = art.querySelector('img');
        const category = categories.find(entry => entry.id === card.dataset.category);
        const scale = Math.max(image.clientWidth / Number(image.getAttribute('width')), image.clientHeight / Number(image.getAttribute('height')));
        return { category, image, scale };
      });
      const temple = artwork.find(entry => entry.category.id === 'sachal');
      const target = temple.category.roofTipY * temple.scale;
      for (const { category, image, scale } of artwork) {
        image.style.setProperty('--roof-shift', `${(target - category.roofTipY * scale).toFixed(2)}px`);
      }
    };
    const observer = new ResizeObserver(alignRoofTips);
    for (const card of cards) observer.observe(card.querySelector('.archive-category-art'));
    alignRoofTips();
    disposeCategoryAlignment = () => observer.disconnect();
  }

  function renderPhotos(animate) {
    const grid = archiveLayout(state) === 'grid';
    const records = filterArchiveRecords(items, state, munuiSites);
    const places = archiveLocations(items, state.category, siteOrder);
    window.__archiveModalItems = records;
    const category = archiveCategories.find(entry => entry.id === state.category);
    const title = state.site ? (state.site === 'munui' ? (isKo() ? '문의문화유산단지' : 'Munui Cultural Heritage Complex') : label(state.site)) : state.part ? partLabel(state.part) : category ? category[getLang()] : (isKo() ? '전체 사진' : 'All photos');
    const allLabel = isKo() ? '전체' : 'All';
    const savedIndex = records.findIndex(item => item.id === rememberedPhotos.get(selectionKey()));
    const initialIndex = savedIndex >= 0 ? savedIndex : Math.min(2, records.length - 1);
    const empty = `<p class="archive-empty">${isKo() ? '해당 조건의 사진이 없습니다.' : 'No photos match these filters.'}</p>`;
    const photos = grid
      ? `<div class="archive-photo-grid" role="group" aria-label="${escapeHtml(title)}">${records.map((item, index) => `<button type="button" class="archive-grid-card" data-open-record="${item.id}" aria-label="${escapeHtml(isKo() ? item.titleKo : item.titleEn)}">
          ${img(item, index >= 10)}<span class="archive-grid-copy"><strong>${escapeHtml(label(item.site))}</strong></span>
        </button>`).join('') || empty}</div>`
      : `<div class="archive-photo-strip" tabindex="0" role="region" aria-roledescription="carousel" aria-label="${escapeHtml(title)}">
        <div class="archive-photo-track">${records.map((item, index) => `<button type="button" class="archive-photo-card${index === initialIndex ? ' is-active' : ''}" style="--entry-order:${Math.max(0, Math.min(6, index - initialIndex + 2))}" data-open-record="${item.id}" aria-label="${escapeHtml(isKo() ? item.titleKo : item.titleEn)}">
          <span class="archive-photo-surface">${photoFace(item, Math.abs(index - initialIndex) > 3, 'front')}${photoFace(item, true, 'back')}</span>
        </button>`).join('') || empty}</div>
      </div>
      <div class="archive-photo-controls" ${records.length < 2 ? 'hidden' : ''}>
        <button type="button" data-photo-step="-1" aria-label="${isKo() ? '이전 사진' : 'Previous photo'}">←</button>
        <input type="range" min="0" max="${Math.max(0, records.length - 1)}" value="${Math.max(0, initialIndex)}" step="1" aria-label="${isKo() ? '사진 이동' : 'Browse photos'}">
        <span data-photo-position aria-live="polite"></span>
        <button type="button" data-photo-step="1" aria-label="${isKo() ? '다음 사진' : 'Next photo'}">→</button>
      </div>`;
    content.innerHTML = `<section class="archive-photo-collection${grid ? ' archive-photo-collection--grid' : ''}${animate ? ' is-entering' : ''}">
      <div class="archive-photo-filters">
        <nav class="archive-site-filters" aria-label="${isKo() ? '장소 필터' : 'Filter by place'}">
          <button type="button" data-filter-site="all" aria-pressed="${!state.site}">${allLabel}</button>
          ${places.map(place => `<button type="button" data-filter-site="${place.site}" aria-pressed="${place.site === state.site}">${escapeHtml(label(place.site))}</button>`).join('')}
        </nav>
        <div class="archive-view-controls" role="group" aria-label="${isKo() ? '사진 보기 방식' : 'Photo layout'}">
          <button type="button" data-archive-layout="carousel" aria-pressed="${!grid}" aria-label="${isKo() ? '크게 보기' : 'Carousel view'}" title="${isKo() ? '크게 보기' : 'Carousel view'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><rect x="7.5" y="4" width="9" height="16" rx="1"/><path d="M4.5 7H2v10h2.5M19.5 7H22v10h-2.5"/></svg>
            <span>${isKo() ? '크게 보기' : 'Carousel'}</span>
          </button>
          <button type="button" data-archive-layout="grid" aria-pressed="${grid}" aria-label="${isKo() ? '모아 보기' : 'Grid view'}" title="${isKo() ? '모아 보기' : 'Grid view'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><rect x="3" y="3" width="7" height="7" rx=".8"/><rect x="14" y="3" width="7" height="7" rx=".8"/><rect x="3" y="14" width="7" height="7" rx=".8"/><rect x="14" y="14" width="7" height="7" rx=".8"/></svg>
            <span>${isKo() ? '모아 보기' : 'Grid'}</span>
          </button>
        </div>
      </div>
      <div class="archive-view-toolbar">
        <span class="archive-view-count">${countLabel(records.length)}</span>
      </div>
      <header class="archive-collection-head"><h2 data-view-heading tabindex="-1">${escapeHtml(title)}</h2><span>${countLabel(records.length)}</span></header>
      ${photos}
    </section>`;
    content.querySelector('.archive-photo-filters').prepend(back);
    if (records.length && !grid) disposeStrip = setupPhotoStrip(content, initialIndex, index => {
      rememberedPhotos.set(selectionKey(), records[index].id);
    });
    status.textContent = `${title} · ${countLabel(records.length)}`;
  }

  function render(animate = true) {
    cancelLayoutTransition();
    disposeStrip();
    disposeStrip = () => {};
    disposeCategoryAlignment();
    disposeCategoryAlignment = () => {};
    root.dataset.view = state.view;
    root.dataset.layout = archiveLayout(state);
    back.hidden = state.view === 'categories';
    back.querySelector('span').textContent = isKo() ? '뒤로' : 'Back';
    if (state.view === 'categories') {
      heading.prepend(back);
      renderCategories(animate);
    }
    else renderPhotos(animate);
  }
  back.addEventListener('click', () => navigate({ view: 'categories', ...(state.layout ? { layout: state.layout } : {}) }, '[data-category]'));
  content.addEventListener('click', event => {
    const category = event.target.closest('[data-category]');
    if (category) navigate({ view: 'photos', category: category.dataset.category, ...(state.layout ? { layout: state.layout } : {}) });
    const layout = event.target.closest('[data-archive-layout]');
    if (layout && ['carousel', 'grid'].includes(layout.dataset.archiveLayout)) {
      const value = layout.dataset.archiveLayout;
      if (value !== archiveLayout(state)) {
        const next = { ...state };
        next.layout = value;
        changeLayout(next, `[data-archive-layout="${value}"]`);
      } else cancelLayoutTransition();
    }
    const siteFilter = event.target.closest('[data-filter-site]');
    if (siteFilter) {
      const value = siteFilter.dataset.filterSite;
      if (value === (state.site || 'all')) return;
      const order = ['all', ...archiveLocations(items, state.category, siteOrder).map(place => place.site)];
      const direction = order.indexOf(value) > order.indexOf(state.site || 'all') ? 1 : -1;
      const next = { ...state, view: 'photos' };
      if (value === 'all') delete next.site;
      else next.site = value;
      changePhotoFilter(next, `[data-filter-site="${value}"]`, direction);
    }
    const photo = event.target.closest('[data-open-record]');
    if (photo) {
      const item = items.find(item => item.id === photo.dataset.openRecord);
      if (item) {
        cancelLayoutTransition();
        rememberedPhotos.set(selectionKey(), item.id);
        openPhoto(item);
      }
    }
  });
  window.addEventListener('popstate', () => { state = readArchiveRoute(location.search, items, munuiSites); render(); });
  render();
  return { refreshLanguage: () => render(false) };
}

// Every card is a photograph. Place buttons only filter this same continuous strip.
function setupPhotoStrip(content, initialIndex, onSelect) {
  const collection = content.querySelector('.archive-photo-collection');
  const viewport = content.querySelector('.archive-photo-strip');
  const cards = [...viewport.querySelectorAll('.archive-photo-card')];
  const range = content.querySelector('input[type="range"]');
  const previous = content.querySelector('[data-photo-step="-1"]');
  const next = content.querySelector('[data-photo-step="1"]');
  const counter = content.querySelector('[data-photo-position]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const slideDuration = 480;
  let activeIndex = initialIndex;
  let frame = 0;
  let slideFrame = 0;
  let gliding = false;
  let drag = null;
  let suppressClick = false;
  let wheelUntil = 0;
  let wheelDelta = 0;
  let spinAnimation = null;
  let painted = false;
  let entranceTimer = 0;
  let centers = [];
  let spacing = 1;
  let measuredWidth = -1;
  let measuredHeight = -1;
  const offsets = new Array(cards.length);
  const center = index => centers[index];

  function endEntrance() {
    clearTimeout(entranceTimer);
    collection.classList.remove('is-entering');
  }
  function spinCard(index, direction) {
    if (reducedMotion.matches) return;
    endEntrance();
    spinAnimation?.cancel();
    spinAnimation = cards[index].querySelector('.archive-photo-surface').animate(
      [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${direction > 0 ? -180 : 180}deg)` }],
      { duration: slideDuration, easing: 'cubic-bezier(.45,0,.55,1)' }
    );
  }
  function stopSlide() {
    cancelAnimationFrame(slideFrame);
    viewport.classList.remove('is-gliding');
    gliding = false;
  }

  function paint() {
    const distances = cards.map((_, index) => center(index) - viewport.scrollLeft);
    const closest = distances.reduce((best, distance, index) => Math.abs(distance) < Math.abs(distances[best]) ? index : best, 0);
    if (painted && !gliding && closest !== activeIndex) spinCard(closest, closest - activeIndex);
    cards.forEach((card, index) => {
      const offset = Math.max(-2.5, Math.min(2.5, distances[index] / spacing));
      if (offsets[index] !== offset) {
        card.style.setProperty('--photo-offset', offset);
        offsets[index] = offset;
      }
      if (!painted || index === closest || index === activeIndex) card.classList.toggle('is-active', index === closest);
    });
    const changed = !painted || closest !== activeIndex;
    activeIndex = closest;
    painted = true;
    if (!changed) return;
    range.value = closest;
    range.setAttribute('aria-valuetext', cards[closest].getAttribute('aria-label'));
    counter.textContent = `${String(closest + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = closest === 0;
    next.disabled = closest === cards.length - 1;
    onSelect(closest);
  }
  function moveTo(index, smooth = true) {
    const target = Math.max(0, Math.min(cards.length - 1, index));
    stopSlide();
    const destination = center(target);
    if (!smooth || reducedMotion.matches || Math.abs(destination - viewport.scrollLeft) < 1) {
      viewport.scrollLeft = destination;
      paint();
      return;
    }
    if (target !== activeIndex) spinCard(target, target - activeIndex);
    const start = viewport.scrollLeft;
    const distance = destination - start;
    const started = performance.now();
    gliding = true;
    viewport.classList.add('is-gliding');
    const step = now => {
      const progress = Math.min(1, (now - started) / slideDuration);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      viewport.scrollLeft = start + distance * eased;
      paint();
      if (progress < 1) slideFrame = requestAnimationFrame(step);
      else { stopSlide(); viewport.scrollLeft = destination; paint(); }
    };
    slideFrame = requestAnimationFrame(step);
  }
  const updateSizing = () => {
    const width = viewport.clientWidth, height = viewport.clientHeight;
    if (width === measuredWidth && height === measuredHeight) return;
    measuredWidth = width;
    measuredHeight = height;
    // Read geometry once per resize, never between style writes during a glide.
    centers = cards.map(card => card.offsetLeft + card.offsetWidth / 2 - width / 2);
    spacing = centers.length > 1 ? centers[1] - centers[0] : cards[0].offsetWidth;
    const diagonalStep = Math.max(0, Math.min(48, (viewport.clientHeight - cards[0].offsetHeight) / 5));
    viewport.style.setProperty('--photo-step', `${diagonalStep}px`);
    moveTo(activeIndex, false);
  };
  const resize = new ResizeObserver(updateSizing);
  resize.observe(viewport);
  // Reflow transitions must measure the settled carousel position synchronously.
  updateSizing();
  viewport.addEventListener('scroll', () => {
    if (gliding) return; // The glide already paints once per animation frame.
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(paint);
  }, { passive: true });
  previous.addEventListener('click', () => moveTo(activeIndex - 1));
  next.addEventListener('click', () => moveTo(activeIndex + 1));
  range.addEventListener('input', () => moveTo(Number(range.value), false));
  viewport.addEventListener('wheel', event => {
    // Keep native horizontal trackpad scrolling and browser pinch-to-zoom.
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
    const direction = Math.sign(event.deltaY);
    if ((direction < 0 && activeIndex === 0) || (direction > 0 && activeIndex === cards.length - 1)) return;
    event.preventDefault();
    const now = performance.now();
    if (now < wheelUntil) return;
    if (Math.sign(wheelDelta) !== direction) wheelDelta = 0;
    wheelDelta += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
    if (Math.abs(wheelDelta) < 24) return;
    wheelDelta = 0;
    wheelUntil = now + slideDuration;
    moveTo(activeIndex + direction);
  }, { passive: false });
  viewport.addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      moveTo(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewport.addEventListener('focusin', event => {
    const index = cards.indexOf(event.target);
    if (index >= 0 && event.target.matches(':focus-visible')) moveTo(index);
  });
  viewport.addEventListener('pointerdown', event => {
    suppressClick = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    stopSlide();
    drag = { x: event.clientX, left: viewport.scrollLeft, id: event.pointerId };
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 6) {
      suppressClick = true;
      viewport.setPointerCapture(drag.id);
      viewport.classList.add('is-dragging');
    }
    if (suppressClick) viewport.scrollLeft = drag.left - delta;
  });
  function endDrag() {
    drag = null;
    viewport.classList.remove('is-dragging');
    if (suppressClick) { paint(); moveTo(activeIndex); }
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', () => { if (!suppressClick) drag = null; });
  viewport.addEventListener('click', event => {
    if (suppressClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
  }, true);
  const onMotionChange = () => { if (reducedMotion.matches) { stopSlide(); spinAnimation?.cancel(); } };
  reducedMotion.addEventListener('change', onMotionChange);
  if (collection.classList.contains('is-entering')) entranceTimer = setTimeout(endEntrance, 1400);
  return () => {
    clearTimeout(entranceTimer);
    stopSlide();
    spinAnimation?.cancel();
    cancelAnimationFrame(frame);
    resize.disconnect();
    reducedMotion.removeEventListener('change', onMotionChange);
  };
}
