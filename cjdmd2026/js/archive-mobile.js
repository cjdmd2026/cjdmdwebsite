(() => {
    'use strict';
    const mobile = matchMedia('(width < 760px)');
    const section = document.querySelector('.archive-mobile');
    if (!section) return;

    // Read the existing archive records so both layouts use the same content.
    const exhibitions = [...document.querySelectorAll('.history-item')].map(item => {
        const card = item.querySelector('.history-card');
        const description = document.createElement('div');
        description.innerHTML = card.dataset.description.replace(/<br\s*\/?>/gi, ' ');
        return {
            year: item.querySelector('.history-year').textContent.trim(),
            title: card.dataset.title,
            description: description.textContent.replace(/\s+/g, ' ').trim(),
            image: card.style.backgroundImage,
            href: item.getAttribute('href')
        };
    });
    const tabs = section.querySelector('.archive-year-tabs');
    const panel = section.querySelector('.archive-exhibition');
    const cover = panel.querySelector('.archive-exhibition-cover');
    const title = panel.querySelector('h3');
    const description = panel.querySelector('.archive-exhibition-description');
    const year = panel.querySelector('.archive-exhibition-year');
    const link = panel.querySelector('.archive-exhibition-link');
    const status = panel.querySelector('.archive-exhibition-status');
    const students = panel.querySelector('.student');
    const studentDetails = panel.querySelector('details');
    let selected = exhibitions.length - 1;
    let ready = false;

    function selectExhibition(index, focus = false) {
        selected = index;
        const exhibition = exhibitions[index];
        [...tabs.children].forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', tabs.children[index].id);
        cover.style.backgroundImage = exhibition.image;
        cover.setAttribute('aria-label', `${exhibition.year}년 ${exhibition.title} 졸업전시 포스터`);
        title.textContent = exhibition.title;
        year.textContent = exhibition.year;
        description.textContent = exhibition.description;
        link.hidden = !exhibition.href;
        status.hidden = Boolean(exhibition.href);
        if (exhibition.href) {
            link.href = exhibition.href;
            link.setAttribute('aria-label', `${exhibition.year}년 ${exhibition.title} 전시 웹사이트 (새 창)`);
        } else {
            link.removeAttribute('href');
            status.textContent = exhibition.year === DEFAULT_STUDENT_YEAR ? '지금 함께하고 있는 전시입니다.' : '이 전시는 웹페이지가 없습니다.';
        }
        renderStudents(students, exhibition.year);
        panel.querySelector('.archive-student-count').textContent = `${students.childElementCount}명`;
        studentDetails.open = false;
        if (focus) tabs.children[index].focus({ preventScroll: true });
    }

    function initHistory() {
        if (ready || !mobile.matches) return;
        ready = true;
        exhibitions.forEach((exhibition, index) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.className = 'archive-year-tab';
            tab.id = `archive-year-${exhibition.year}`;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', panel.id);
            tab.textContent = exhibition.year;
            tab.addEventListener('click', () => selectExhibition(index));
            tab.addEventListener('keydown', event => {
                if (event.altKey || event.ctrlKey || event.metaKey) return;
                let next;
                if (event.key === 'ArrowRight') next = (index + 1) % exhibitions.length;
                if (event.key === 'ArrowLeft') next = (index - 1 + exhibitions.length) % exhibitions.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = exhibitions.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                selectExhibition(next, true);
            });
            tabs.append(tab);
        });
        selectExhibition(selected);
    }

    // Horizontal swipes change the record; vertical movement keeps native scrolling.
    let touchStart = null;
    cover.addEventListener('touchstart', event => {
        touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    cover.addEventListener('touchend', event => {
        if (!touchStart || event.touches.length) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        selectExhibition(Math.max(0, Math.min(exhibitions.length - 1, selected + (dx < 0 ? 1 : -1))));
    }, { passive: true });
    cover.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.mobile-menu');
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const logo = header.querySelector('.logo');

    function setMenu(open, restoreFocus = false) {
        if (!open && mobile.matches && document.documentElement.classList.contains('page-transition-menu-hold')) return;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        document.body.classList.toggle('mobile-menu-open', open);
        menu.hidden = !open;
        menu.inert = !open;
        menu.classList.toggle('is-open', open);
        main.inert = footer.inert = logo.inert = open;
        if (restoreFocus) menuButton.focus({ preventScroll: true });
    }
    menuButton.addEventListener('click', () => setMenu(menu.hidden));
    menu.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
        if (menu.hidden) return;
        if (event.key === 'Escape') setMenu(false, true);
        if (event.key !== 'Tab') return;
        const last = menu.querySelector('li:last-child a');
        if (event.shiftKey && document.activeElement === menuButton) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            menuButton.focus();
        }
    });
    function syncHeader() { header.classList.toggle('is-scrolled', scrollY > 8); }
    window.addEventListener('scroll', syncHeader, { passive: true });
    mobile.addEventListener('change', () => { setMenu(false); initHistory(); });
    window.addEventListener('pageshow', () => setMenu(false));
    initHistory();
    syncHeader();
})();
