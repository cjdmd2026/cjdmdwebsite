/* Mobile exhibition: automatic opening assembly, swipe galleries and an icon banner. */
(() => {
    'use strict';
    const main = document.querySelector('main.main');
    if (!main) return;
    const fallbackPoster = new URL('../assets/images/poster/Vertical_poster_white.webp', document.currentScript.src).href;
    const designers = new Map((window.DESIGNERS || []).map(person => [person.id, person]));
    const fragments = window.MAIN_ICON_FRAGMENTS || {};
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
    const icon = id => {
        const fragment = fragments[id];
        return fragment ? `<svg viewBox="${escape(fragment.viewBox)}" style="color:${escape(fragment.color)}" aria-hidden="true" focusable="false">${fragment.svg}</svg>` : '';
    };
    const image = (src, alt, extra = '') => `<img src="${escape(src)}" alt="${escape(alt)}" loading="lazy" decoding="async" ${extra}>`;
    const heading = (title, id) => `<div class="mobile-section-heading"><h2 id="${id}">${title}</h2></div>`;
    const dots = labels => `<div class="mobile-gallery-dots">${labels.map((label, index) => `<button type="button" data-slide="${index}" aria-label="${escape(label)} 보기"><span></span></button>`).join('')}</div>`;
    const professors = window.MAIN_PROFESSORS || [];
    const posters = window.MAIN_POSTERS || [];
    const departments = window.MAIN_COMMITTEE || [];
    const videos = window.MAIN_VIDEOS || [];
    const iconItems = Object.keys(fragments).map(id => `<li>${icon(id)}<span class="sr-only">${escape(designers.get(id)?.nameKo || id)}의 아이콘</span></li>`).join('');

    document.documentElement.classList.remove('intro-loading', 'page-transition-preload');
    document.body.classList.remove('intro-before-main');
    document.getElementById('introLoader')?.remove();
    try { sessionStorage.removeItem('stamp-page-transition'); } catch { /* Storage is optional. */ }
    window.MainIntro.complete = true;
    main.className = 'main main-mobile';
    main.innerHTML = `
        <section class="mobile-welcome" id="home" aria-labelledby="mobile-title">
            <h1 id="mobile-title">유연한 결합</h1>
            <p class="mobile-edition">청주대학교 디지털미디어디자인 졸업전시회</p>
        </section>
        <div class="mobile-assembly" id="mobileAssembly" data-state="loading" role="region" aria-label="아이콘이 모여 완성하는 결합">
            <div class="mobile-assembly-stage" role="img" aria-label="흩어진 아이콘들이 모여 결합 글자를 완성하는 그래픽">
                <div class="mobile-assembly-paper" aria-hidden="true"></div>
                <canvas aria-hidden="true"></canvas>
                <img class="mobile-assembly-poster" src="${escape(posters[0]?.image || fallbackPoster)}" alt="" width="1686" height="2387" decoding="async">
            </div>
            <p class="sr-only" role="status" aria-live="polite">애니메이션 준비 중</p>
        </div>
        <section class="mobile-posters" id="hero" data-active-slide="0" data-poster-motion="idle" aria-labelledby="mobile-poster-title">
            <h2 class="sr-only" id="mobile-poster-title">전시 포스터</h2>
            <div id="mobile-poster-slides">
                <figure class="mobile-poster-card">
                    <div class="mobile-poster-stage">
                        <div class="mobile-poster-image"><button type="button" id="mobilePosterSwitch" aria-label="포스터 바꾸기">
                            <img src="${escape(posters[0].image)}" alt="${escape(posters[0].label)}" width="1686" height="2387" fetchpriority="high" decoding="async">
                            <canvas id="mobilePosterCanvas" aria-hidden="true" hidden></canvas>
                        </button></div>
                        <canvas id="mobilePosterFx" aria-hidden="true"></canvas>
                    </div>
                    <figcaption><span data-poster-label>${escape(posters[0].label)}</span><a data-poster-download href="${escape(posters[0].pdf)}" download aria-label="${escape(posters[0].label)} PDF 다운로드">포스터 다운로드 <span aria-hidden="true">↓</span></a></figcaption>
                </figure>
            </div>
        </section>
        <section class="mobile-about" id="journey" aria-labelledby="mobile-icons-title">
            <h2 id="mobile-icons-title">다채로운 개성이 빚어낸 결합</h2>
            <p class="mobile-introduction">우리는 고유한 매력을 지닌 다채로운 개성들의 집합입니다. 어울리지 않을 듯 어우러진 조화는 어떤 환경에서도 유연하게 적응하는 우리의 방법입니다.</p>
            <div class="mobile-icon-banner">
                <div class="mobile-icon-window"><div class="mobile-icon-track">
                    <ul class="mobile-icon-list" aria-label="참여 디자이너 아이콘">${iconItems}</ul>
                    <ul class="mobile-icon-list" aria-hidden="true" inert>${iconItems}</ul>
                </div></div>
            </div>
        </section>
        <section class="mobile-section" id="committee" data-carousel aria-labelledby="committeeTitle" aria-roledescription="슬라이드">
            ${heading('졸업전시위원회', 'committeeTitle')}
            <div class="mobile-department-tabs" aria-label="위원회 부서">${departments.map((department, index) => `<button type="button" data-slide="${index}" aria-controls="mobile-department-slides">${escape(department.label)}</button>`).join('')}</div>
            <div class="mobile-gallery-track mobile-departments" id="mobile-department-slides" tabindex="0" aria-label="위원회, 좌우로 넘기기">${departments.map(department => `
                <article class="mobile-department" aria-labelledby="department-${escape(department.id)}" data-slide-label="${escape(department.label)}">
                    <h3 class="sr-only" id="department-${escape(department.id)}">${escape(department.label)}</h3>
                    ${image(department.image, `${department.label} 단체 사진`, 'width="762" height="497"')}
                    <ul class="mobile-member-list">${department.members.map(member => `<li>${escape(designers.get(member.id)?.nameKo || member.id)}</li>`).join('')}</ul>
                </article>`).join('')}</div>
        </section>
        <section class="mobile-section" id="professor" data-carousel aria-labelledby="professorTitle" aria-roledescription="슬라이드">
            ${heading('함께해 주신 교수님', 'professorTitle')}
            <ul class="mobile-gallery-track mobile-professors" id="mobile-professor-slides" tabindex="0" aria-label="교수진, 좌우로 넘기기">${professors.map(professor => `
                <li class="mobile-professor" data-slide-label="${escape(professor.name)} 교수">
                    <div class="mobile-professor-photo">${professor.image ? image(professor.image, `${professor.name} 교수 사진`) : '<span>사진 준비 중</span>'}</div>
                    <div class="mobile-professor-info"><p>${escape(professor.major)}</p><h3>${escape(professor.name)} <span>교수</span></h3></div>
                    ${professor.message && !professor.message.startsWith('[임시]') ? `<p class="mobile-professor-message">${escape(professor.message)}</p>` : ''}
                </li>`).join('')}</ul>
            ${dots(professors.map(professor => `${professor.name} 교수`))}
        </section>
        <section class="mobile-section mobile-video-section" id="video" data-carousel aria-labelledby="videoTitle" aria-roledescription="슬라이드">
            ${heading('전시 이야기', 'videoTitle')}
            <ul class="mobile-gallery-track mobile-videos" id="mobile-video-slides" tabindex="0" aria-label="전시 영상, 좌우로 넘기기">${videos.map(video => `
                <li data-slide-label="${escape(video.title)}"><a href="https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}" target="_blank" rel="noopener" aria-label="${escape(video.title)} YouTube에서 보기 (새 창)">
                    <div class="mobile-video-image">${image(`https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg`, '', 'width="480" height="360"')}<span aria-hidden="true">▶</span></div>
                </a></li>`).join('')}</ul>
            ${dots(videos.map(video => video.title))}
        </section>`;
    main.dataset.mobileReady = 'true';

    // Native dragging and snapping, with direct tab/dot selection and keyboard navigation.
    main.querySelectorAll('[data-carousel]').forEach(gallery => {
        const track = gallery.querySelector('.mobile-gallery-track');
        const slides = [...track.children];
        if (!slides.length) return;
        const selectors = [...gallery.querySelectorAll('[data-slide]')];
        const status = document.createElement('p');
        status.className = 'sr-only';
        status.setAttribute('aria-live', 'polite');
        gallery.append(status);
        let current = 0;
        const position = index => slides[index].offsetLeft - slides[0].offsetLeft;
        function size() { track.style.height = `${slides[current].offsetHeight}px`; }
        function select(index) {
            current = index;
            gallery.dataset.activeSlide = String(index);
            status.textContent = slides[index].dataset.slideLabel;
            slides.forEach((slide, slideIndex) => {
                slide.inert = slideIndex !== index;
                slide.setAttribute('aria-hidden', String(slideIndex !== index));
            });
            selectors.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.slide) === index)));
            const selectedTab = gallery.querySelector('.mobile-department-tabs [aria-pressed="true"]');
            if (selectedTab) {
                const tabs = selectedTab.parentElement;
                tabs.scrollTo({left: selectedTab.offsetLeft, behavior: 'auto'});
            }
            size();
        }
        function go(index) {
            const target = Math.max(0, Math.min(index, slides.length - 1));
            if (track.contains(document.activeElement)) track.focus({preventScroll: true});
            select(target);
            track.scrollTo({left: position(target), behavior: 'auto'});
        }
        selectors.forEach(button => button.addEventListener('click', () => go(Number(button.dataset.slide))));
        track.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
        });
        track.addEventListener('scroll', () => {
            const nearest = slides.reduce((best, slide, index) => Math.abs(position(index) - track.scrollLeft) < Math.abs(position(best) - track.scrollLeft) ? index : best, 0);
            if (nearest !== current) select(nearest);
        }, {passive: true});
        let width = track.clientWidth;
        const observer = new ResizeObserver(() => {
            size();
            if (width !== track.clientWidth) {
                width = track.clientWidth;
                track.scrollTo({left: position(current), behavior: 'auto'});
            }
        });
        slides.forEach(slide => observer.observe(slide));
        select(0);
    });

    // Native scrolling and immediate menu state changes; no timers or animation loops.
    const button = document.querySelector('.menu-button');
    const menu = document.querySelector('.mobile-menu');
    const footer = document.querySelector('.footer');
    function setMenu(open, restoreFocus = false) {
        menu.hidden = !open;
        menu.inert = !open;
        menu.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        document.body.classList.toggle('mobile-menu-open', open);
        main.inert = open;
        footer.inert = open;
        if (open) menu.querySelector('a').focus({ preventScroll: true });
        else if (restoreFocus) button.focus({ preventScroll: true });
    }
    button.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => {
        if (menu.hidden) return;
        if (event.key === 'Escape') { setMenu(false, true); return; }
        if (event.key !== 'Tab') return;
        const links = [document.querySelector('.logo a'), button, ...menu.querySelectorAll('a')];
        const next = (links.indexOf(document.activeElement) + (event.shiftKey ? -1 : 1) + links.length) % links.length;
        event.preventDefault();
        links[next].focus();
    });
    setMenu(false);
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
})();
