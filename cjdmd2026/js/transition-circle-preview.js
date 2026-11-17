(() => {
    'use strict';

    const stage = document.getElementById('stage');
    const field = document.getElementById('transition-background');
    const status = document.getElementById('status');
    const replay = document.getElementById('replay');
    const pause = document.getElementById('pause');
    const timeline = document.getElementById('timeline');
    const progressLabel = document.getElementById('progress');
    const speed = document.getElementById('speed');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const labels = {project: '프로젝트', designer: '디자이너', archive: '아카이브'};
    const scenes = new Map();
    let current = 'project', task = null, lastPair = ['project', 'designer'];
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
        body.append(heading, grid, foot); scene.append(header, body); stage.insertBefore(scene, field); scenes.set(id, scene);
    }

    // Interlude Columns: staggered bars rise to cover, then continue upward.
    // https://github.com/codrops/interlude/blob/main/src/transitions/columns.ts
    // Codrops, MIT (see interlude-MIT-LICENSE.txt). Original 700ms bar duration,
    // 60ms stagger and power2 easing, matching the site-wide transition.
    const BAR_DURATION = 700, STAGGER = 60;
    const clamp = value => Math.max(0, Math.min(1, value));
    const inOut = t => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    const out = t => 1 - (1 - t) ** 3;
    const phases = [...document.querySelectorAll('[data-phase]')];

    function showPhase(name) {
        if (stage.dataset.phase === name) return;
        stage.dataset.phase = name;
        phases.forEach(item => {
            if (item.dataset.phase === name) item.setAttribute('aria-current', 'step');
            else item.removeAttribute('aria-current');
        });
    }
    function setProgress(value) {
        timeline.value = String(Math.round(value * 1000));
        progressLabel.value = `${Math.round(value * 100)}%`;
        showPhase(value < .5 ? 'cover' : 'reveal');
    }
    function settle(id) {
        for (const [key, scene] of scenes) {
            const active = key === id;
            scene.hidden = !active; scene.inert = !active;
            scene.setAttribute('aria-hidden', String(!active));
            scene.style.removeProperty('z-index'); scene.style.removeProperty('clip-path');
        }
        field.hidden = true; field.style.removeProperty('clip-path');
        field.replaceChildren();
        stage.classList.remove('is-playing', 'is-running');
        stage.dataset.state = 'idle'; stage.dataset.page = id;
        current = id; pause.textContent = '재생'; showPhase('idle');
    }
    function finish(active = task) {
        if (!active || task !== active) return;
        task = null;
        cancelAnimationFrame(active.frame);
        active.animations.forEach(animation => animation.cancel());
        setProgress(1); settle(active.to);
        status.textContent = `${labels[active.to]} 화면입니다. 다른 메뉴를 누르거나 전환을 다시 재생해 보세요.`;
    }
    function update(active) {
        if (task !== active) return;
        setProgress(clamp((active.animations[0].currentTime || 0) / active.duration));
        active.frame = requestAnimationFrame(() => update(active));
    }
    function setPlaying(running) {
        if (!task) return;
        cancelAnimationFrame(task.frame);
        task.animations.forEach(animation => running ? animation.play() : animation.pause());
        stage.classList.toggle('is-running', running);
        stage.dataset.state = running ? 'playing' : 'paused';
        pause.textContent = running ? '멈춤' : '재생';
        if (running) update(task);
    }
    function play(from, to, autoplay = true) {
        finish(); settle(from);
        lastPair = [from, to];
        if (reduced.matches || !stage.animate) {
            setProgress(1); settle(to);
            status.textContent = `${labels[to]} 화면입니다. 동작 줄이기 설정에 따라 즉시 전환했습니다.`;
            return;
        }
        const oldScene = scenes.get(from), newScene = scenes.get(to);
        if (oldScene.contains(document.activeElement)) replay.focus({preventScroll: true});
        oldScene.inert = true; oldScene.setAttribute('aria-hidden', 'true');
        newScene.hidden = false; newScene.inert = true; newScene.scrollTop = 0;
        oldScene.style.zIndex = '1'; newScene.style.zIndex = '0';
        field.hidden = false;
        stage.classList.add('is-playing');
        const horizontal = stage.clientWidth < 768;
        const count = horizontal ? 3 : 5;
        field.dataset.axis = horizontal ? 'x' : 'y';
        const half = BAR_DURATION + (count - 1) * STAGGER, duration = half * 2;
        const active = task = {from, to, duration, animations: [], frame: 0, autoPaused: false};
        const animate = (target, frames) => {
            const animation = target.animate(frames, {duration, fill: 'both', easing: 'linear'});
            animation.pause(); animation.currentTime = 0; animation.playbackRate = Number(speed.value);
            active.animations.push(animation);
        };
        // Switch pages only when every column fully covers the stage.
        animate(oldScene, [
            {opacity: 1, offset: 0, easing: 'steps(1, end)'},
            {opacity: 0, offset: .5}, {opacity: 0, offset: 1}
        ]);
        for (let index = 0; index < count; index++) {
            const bar = create('div', 'transition-column');
            Object.assign(bar.style, horizontal
                ? {left: '0', top: `${index * 100 / count}%`, width: '100%', height: `calc(${100 / count}% + 1px)`}
                : {left: `${index * 100 / count}%`, width: `calc(${100 / count}% + 1px)`});
            field.append(bar);
            const delay = index * STAGGER;
            const offsets = [...new Set([
                ...Array.from({length: 121}, (_, i) => i / 120),
                delay / duration, (delay + BAR_DURATION) / duration,
                .5, (half + delay) / duration, (half + delay + BAR_DURATION) / duration
            ].map(clamp))].sort((a, b) => a - b);
            animate(bar, offsets.map(offset => {
                const time = offset * duration;
                const y = time <= half
                    ? 100 * (1 - inOut(clamp((time - delay) / BAR_DURATION)))
                    : -100 * out(clamp((time - half - delay) / BAR_DURATION));
                return {offset, transform: horizontal ? `translateX(${-y}%)` : `translateY(${y}%)`};
            }));
        }
        Promise.all(active.animations.map(animation => animation.finished)).then(() => finish(active), () => {});
        status.textContent = labels[from] + ' → ' + labels[to] + ' · ' + (horizontal ? '왼쪽 → 오른쪽' : '아래 → 위') + ' Columns 전환 · ' + (duration / 1000).toFixed(2) + '초';
        setProgress(0); setPlaying(autoplay);
    }
    function navigate(to) {
        if (stage.dataset.ready !== 'true' || task || to === current) return;
        play(current, to);
    }
    replay.addEventListener('click', () => play(...lastPair));
    pause.addEventListener('click', () => {
        if (!task) { play(...lastPair); return; }
        task.autoPaused = false;
        setPlaying(task.animations[0].playState === 'paused');
    });
    timeline.addEventListener('input', () => {
        const value = Number(timeline.value) / 1000;
        if (!task) play(...lastPair, false);
        if (!task) return;
        task.autoPaused = false; setPlaying(false);
        task.animations.forEach(animation => { animation.currentTime = value * task.duration; });
        setProgress(value);
    });
    speed.addEventListener('change', () => {
        task?.animations.forEach(animation => animation.updatePlaybackRate(Number(speed.value)));
    });
    document.getElementById('device').addEventListener('click', event => {
        finish(); stage.classList.toggle('is-mobile');
        event.currentTarget.setAttribute('aria-pressed', String(stage.classList.contains('is-mobile')));
        event.currentTarget.textContent = stage.classList.contains('is-mobile') ? '넓게 보기 ↗' : '모바일 보기 ↗';
    });
    // Finish before a resize changes the responsive column count.
    new ResizeObserver(() => { if (task) finish(); }).observe(stage);
    reduced.addEventListener('change', () => {
        if (!reduced.matches) return;
        if (task) finish();
    });
    document.addEventListener('visibilitychange', () => {
        stage.classList.toggle('is-hidden', document.hidden);
        if (!task) return;
        if (document.hidden && task.animations[0].playState === 'running') {
            task.autoPaused = true; setPlaying(false);
        } else if (!document.hidden && task.autoPaused) {
            task.autoPaused = false; setPlaying(true);
        }
    });
    settle(current);
    Promise.race([
        Promise.allSettled([...document.images].map(image => image.decode())),
        new Promise(resolve => setTimeout(resolve, 1800))
    ]).then(() => {
        [replay, pause, timeline].forEach(control => { control.disabled = false; });
        stage.dataset.ready = 'true';
        status.textContent = '메뉴를 누르면 #f2f2f2 패널이 모바일에서는 왼쪽에서 오른쪽으로, PC에서는 아래에서 위로 이동합니다.';
    }).catch(() => {
        status.textContent = '미리보기를 준비하지 못했습니다. 페이지를 새로고침해 주세요.';
    });
})();

