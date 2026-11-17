(() => {
    'use strict';

    const stage = document.getElementById('stage');
    const paper = document.getElementById('paper');
    const accent = document.getElementById('accent');
    const replay = document.getElementById('replay');
    const pause = document.getElementById('pause');
    const timeline = document.getElementById('timeline');
    const progressLabel = document.getElementById('progress');
    const speed = document.getElementById('speed');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const labels = {project: '프로젝트', designer: '디자이너', archive: '아카이브'};
    const scenes = new Map();
    let mode = 'layered', current = 'project', task = null, lastPair = ['project', 'designer'];
    const asset = value => new URL(value, new URL('./project/', location.href)).href;
    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    };
    const cards = {
        project: ['dadeullim', 'curo', 'apuchika'].map(id => window.PROJECTS.find(item => item.id === id)).filter(Boolean)
            .map(item => ({title: item.title, subtitle: item.category, image: asset(item.slideImage)})),
        designer: ['go-biju', 'kim-dahyun', 'kim-doyeon'].map(id => window.DESIGNERS.find(item => item.id === id)).filter(Boolean)
            .map(item => ({title: item.nameKo, subtitle: item.teamName, image: asset(item.image)})),
        archive: [
            {title: 'ON', subtitle: '2021 · 1ST', image: './assets/images/archive/past-exhibition/1st.jpg'},
            {title: '지난 전시의 기록', subtitle: '2022 · 2ND', image: './assets/images/archive/past-exhibition/2nd.jpg'},
            {title: '함께 만든 순간들', subtitle: 'ARCHIVE', image: './assets/images/archive/photo/1.jpg'}
        ]
    };
    const headings = {
        project: ['프로젝트', '14', '서로 다른 생각이 만나\n새로운 가능성으로 이어집니다.'],
        designer: ['디자이너', '33', '각자의 고유한 시선으로\n함께 완성한 유연한 결합.'],
        archive: ['아카이브', '06', '쌓여온 시간과 함께\n새로운 이야기를 만들어갑니다.']
    };

    for (const [id, label] of Object.entries(labels)) {
        const scene = create('section', 'scene');
        scene.dataset.page = id;
        scene.setAttribute('aria-label', `${label} 예시 화면`);
        const header = create('header', 'scene-header');
        const logo = create('img', 'scene-logo');
        logo.src = './assets/images/icons/logo_wv.svg'; logo.alt = '유연한 결합'; logo.width = 160; logo.height = 31;
        const nav = create('nav', 'scene-nav'); nav.setAttribute('aria-label', '전환할 페이지');
        for (const [destination, name] of Object.entries(labels)) {
            const button = create('button', '', name); button.type = 'button'; button.dataset.destination = destination;
            if (id === destination) button.setAttribute('aria-current', 'page');
            button.addEventListener('click', () => navigate(destination));
            nav.appendChild(button);
        }
        header.append(logo, nav);
        const body = create('div', 'scene-body');
        const heading = create('div', 'page-heading');
        const titleGroup = create('div');
        titleGroup.appendChild(create('p', 'eyebrow', '2026 CJU DMD · GRADUATION EXHIBITION'));
        const title = create('h1', '', headings[id][0]); title.appendChild(create('sup', '', headings[id][1]));
        titleGroup.appendChild(title);
        const description = create('p', '', headings[id][2]); description.style.whiteSpace = 'pre-line';
        heading.append(titleGroup, description);
        const grid = create('div', 'cards');
        for (const card of cards[id]) {
            const figure = create('figure');
            const image = create('img', 'card-image'); image.src = card.image; image.alt = card.title; image.decoding = 'async';
            const caption = create('figcaption'); caption.append(create('span', '', card.title), create('small', '', card.subtitle));
            figure.append(image, caption); grid.appendChild(figure);
        }
        const foot = create('footer', 'scene-foot');
        foot.append(create('span', '', '청주대학교 디지털미디어디자인학과'), create('span', '', '유연한 결합 · 2026'));
        body.append(heading, grid, foot); scene.append(header, body); stage.insertBefore(scene, paper); scenes.set(id, scene);
    }

    const clamp = value => Math.max(0, Math.min(1, value));
    // Match the existing wall's cubic-bezier(.65, 0, .35, 1) acceleration.
    function ease(value) {
        const x = clamp(value);
        if (x === 0 || x === 1) return x;
        let low = 0, high = 1, t = x;
        for (let i = 0; i < 14; i++) {
            t = (low + high) / 2;
            const tx = 3 * (1-t) * (1-t) * t * .65 + 3 * (1-t) * t * t * .35 + t*t*t;
            if (tx < x) low = t; else high = t;
        }
        return 3 * (1-t) * t * t + t*t*t;
    }
    function setProgress(value) {
        timeline.value = String(Math.round(value * 1000));
        progressLabel.value = `${Math.round(value * 100)}%`;
    }
    function settle(id) {
        for (const [key, scene] of scenes) {
            const active = key === id;
            scene.hidden = !active; scene.inert = !active;
            scene.setAttribute('aria-hidden', String(!active));
            scene.style.removeProperty('z-index'); scene.style.removeProperty('clip-path');
            scene.querySelector('.scene-body').style.removeProperty('transform');
        }
        paper.style.clipPath = accent.style.clipPath = 'inset(0 100% 0 0)';
        stage.classList.remove('is-playing'); stage.dataset.state = 'idle'; stage.dataset.page = id;
        current = id; pause.textContent = '재생';
    }
    function finish(active = task) {
        if (!active || task !== active) return;
        task = null;
        cancelAnimationFrame(active.frame);
        active.animations.forEach(animation => animation.cancel());
        settle(active.to); setProgress(1);
    }
    function monitor(active) {
        if (task !== active) return;
        setProgress(clamp((active.animations[0].currentTime || 0) / active.duration));
        pause.textContent = active.animations[0].playState === 'paused' ? '재생' : '멈춤';
        active.frame = requestAnimationFrame(() => monitor(active));
    }
    function play(from, to, autoplay = true) {
        finish(); settle(from);
        lastPair = [from, to];
        if (reduced.matches || !stage.animate) { settle(to); setProgress(1); return; }
        const oldScene = scenes.get(from), newScene = scenes.get(to);
        const duration = mode === 'layered' ? 900 : 800;
        if (oldScene.contains(document.activeElement)) replay.focus({preventScroll: true});
        oldScene.inert = true;
        newScene.hidden = false; newScene.inert = true; newScene.scrollTop = 0;
        oldScene.style.zIndex = '0'; newScene.style.zIndex = '1';
        stage.classList.add('is-playing'); stage.dataset.state = autoplay ? 'playing' : 'paused'; stage.dataset.mode = mode;
        const frames = Array.from({length: 121}, (_, index) => {
            const offset = index / 120;
            const leading = mode === 'layered' ? ease(offset / .95) : ease(offset);
            const middle = mode === 'layered' ? ease((offset - .025) / .95) : leading;
            const reveal = mode === 'layered' ? ease((offset - .05) / .95) : leading;
            return {offset, leading, middle, reveal};
        });
        const active = task = {from, to, duration, animations: [], frame: 0};
        const animate = (target, keyframes) => {
            const animation = target.animate(keyframes, {duration, easing: 'linear', fill: 'both'});
            animation.pause(); animation.currentTime = 0; animation.playbackRate = Number(speed.value);
            active.animations.push(animation);
        };
        animate(newScene, frames.map(f => ({offset: f.offset, clipPath: `inset(0 ${(1-f.reveal)*100}% 0 0)`})));
        if (mode === 'layered') {
            animate(accent, frames.map(f => ({offset: f.offset, clipPath: `inset(0 ${(1-f.leading)*100}% 0 ${f.middle*100}%)`})));
            animate(paper, frames.map(f => ({offset: f.offset, clipPath: `inset(0 ${(1-f.middle)*100}% 0 ${f.reveal*100}%)`})));
            animate(oldScene.querySelector('.scene-body'), frames.map(f => ({offset: f.offset, transform: `translateX(${36*f.leading}px)`})));
            animate(newScene.querySelector('.scene-body'), frames.map(f => ({offset: f.offset, transform: `translateX(${-36*(1-f.reveal)}px)`})));
        }
        Promise.all(active.animations.map(animation => animation.finished)).then(() => finish(active), () => {});
        if (autoplay) active.animations.forEach(animation => animation.play());
        monitor(active);
    }
    function navigate(to) {
        finish();
        if (to !== current) play(current, to);
    }
    replay.addEventListener('click', () => play(...lastPair));
    pause.addEventListener('click', () => {
        if (!task) { play(...lastPair); return; }
        const resume = task.animations[0].playState === 'paused';
        task.animations.forEach(animation => resume ? animation.play() : animation.pause());
        stage.dataset.state = resume ? 'playing' : 'paused';
    });
    timeline.addEventListener('input', () => {
        const value = Number(timeline.value) / 1000;
        if (!task) play(...lastPair, false);
        if (!task) return;
        task.animations.forEach(animation => { animation.pause(); animation.currentTime = value * task.duration; });
        stage.dataset.state = 'paused'; setProgress(value);
    });
    speed.addEventListener('change', () => task?.animations.forEach(animation => animation.updatePlaybackRate(Number(speed.value))));
    document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
        mode = button.dataset.mode;
        document.querySelectorAll('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        document.getElementById('effect-title').textContent = mode === 'layered' ? '면의 흐름' : '기존 직선 전환';
        document.getElementById('effect-description').textContent = mode === 'layered'
            ? '얇은 색상 레이어와 본문이 함께 움직이는 좌→우 전환' : '화면의 직선 경계만 왼쪽에서 오른쪽으로 이동';
        play(...lastPair);
    }));
    document.getElementById('device').addEventListener('click', event => {
        stage.classList.toggle('is-mobile');
        event.currentTarget.setAttribute('aria-pressed', String(stage.classList.contains('is-mobile')));
        event.currentTarget.textContent = stage.classList.contains('is-mobile') ? '넓게 보기 ↗' : '모바일 보기 ↗';
    });
    reduced.addEventListener('change', () => { if (reduced.matches) finish(); });
    settle(current);
    Promise.race([
        Promise.allSettled([...document.images].map(image => image.decode())),
        new Promise(resolve => setTimeout(resolve, 1800))
    ]).then(() => {
        replay.disabled = false; stage.dataset.ready = 'true';
        document.getElementById('status').textContent = '메뉴를 누르거나 재생해 보세요. 막대를 끌면 전환 중간을 자세히 볼 수 있습니다.';
    });
})();
