import {createLoadingAssembly} from './main-intro/loading-assembly.js';

// Reuse the main loader's artwork splitting, curved flights and impact motion.
// Capture its compositor tracks before cleanup so the preview can seek, pause
// and fit them to the Circle timeline without changing the production loader.
export function createTransitionLoadingAssembly(host, reducedMotion) {
    const layer = document.createElement('div');
    layer.className = 'transition-assembly';
    layer.setAttribute('aria-hidden', 'true');
    layer.hidden = true;
    host.append(layer);
    let icons, index = 0, tracks = [], rate = 1, elapsed = 0;
    const ready = fetch('./js/main-intro/icons.json').then(response => {
        if (!response.ok) throw new Error('Loading icons unavailable');
        return response.json();
    }).then(value => { icons = value; });

    function stop() {
        for (const track of tracks) track.cancel();
        tracks = [];
        layer.hidden = true;
    }

    function start(duration = 1400, preview = false) {
        stop();
        layer.hidden = false;
        layer.replaceChildren();
        elapsed = 0;
        // Visit all 33 icons in a fixed order; no per-frame random work.
        const icon = icons[index++ % icons.length];
        layer.dataset.icon = icon.id;
        const mark = document.createElement('div');
        mark.className = 'transition-assembly-mark';
        const stage = document.createElement('div');
        stage.className = 'intro-loader-stage';
        const field = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        field.classList.add('intro-loader-field');
        stage.append(field); mark.append(stage); layer.append(mark);

        const assembly = createLoadingAssembly(field, icon, reducedMotion);
        assembly.finish(() => {});
        const source = stage.getAnimations({subtree: true}).map(animation => ({
            target: animation.effect.target,
            frames: animation.effect.getKeyframes(),
            timing: animation.effect.getTiming(),
            start: animation.startTime
        }));
        assembly.stop();
        if (!source.length) return;
        const origin = Math.min(...source.map(track => track.start));
        const end = Math.max(...source.filter(track => Number.isFinite(track.timing.iterations))
            .map(track => track.start - origin + track.timing.duration * track.timing.iterations));
        const scale = preview ? 1 : duration * .54 / end;
        const delay = preview ? 0 : duration * .07;
        for (const track of source) {
            const animation = track.target.animate(track.frames, {
                ...track.timing,
                duration: track.timing.duration * scale,
                delay: (track.start - origin) * scale + delay
            });
            animation.pause(); animation.currentTime = 0; animation.playbackRate = rate;
            tracks.push(animation);
        }
        if (!preview) {
            const visibility = layer.animate([
                {opacity: 0, offset: 0}, {opacity: 0, offset: .1},
                {opacity: 1, offset: .22}, {opacity: 1, offset: .73},
                {opacity: 0, offset: .88}, {opacity: 0, offset: 1}
            ], {duration, fill: 'both'});
            visibility.pause(); visibility.currentTime = 0; visibility.playbackRate = rate;
            tracks.push(visibility);
        } else {
            // Once assembled, the standalone view needs no active animation.
            const completion = mark.animate([{opacity: 1}, {opacity: 1}], {duration: end, fill: 'forwards'});
            completion.pause(); completion.currentTime = 0; completion.playbackRate = rate;
            tracks.push(completion);
            completion.finished.then(() => {
                if (tracks.includes(completion)) pause();
            }, () => {});
        }
    }

    function setRunning(running) {
        for (const track of tracks) {
            track.currentTime = elapsed;
            if (running) track.play();
            else track.pause();
        }
    }
    function seek(time) {
        elapsed = time;
        for (const track of tracks) track.currentTime = time;
    }
    function setRate(value) {
        rate = value;
        for (const track of tracks) track.updatePlaybackRate(rate);
    }
    function pause() {
        elapsed = tracks[0]?.currentTime || 0;
        for (const track of tracks) track.pause();
    }
    return {ready, start, stop, seek, setRate, setRunning(running) {
        if (running) setRunning(true);
        else pause();
    }};
}
