import * as THREE from "../../three.module.js";
export function pageToPosition(page, layout, count) {
    const p = THREE.MathUtils.clamp(Math.round(page) || 0, 0, Math.max(count - 1, 0));
    return layout === 'spread' ? Math.ceil(p / 2) : p;
}
export function positionToPage(position, layout) {
    return layout === 'spread' ? Math.max(0, 2 * position - 1) : position;
}
export function pagesAt(position, layout, count) {
    const candidates = layout === 'spread' ? [
        2 * position - 1,
        2 * position
    ] : [
        position
    ];
    return candidates.filter((p)=>p >= 0 && p < count);
}
export function pageDetail(position, layout, count) {
    const visiblePages = pagesAt(position, layout, count);
    const page = visiblePages.length ? visiblePages[0] : Math.max(0, Math.min(positionToPage(position, layout), count - 1));
    return {
        page,
        visiblePages,
        pageCount: count,
        layout
    };
}
export class Riffle {
    state = null;
    get active() {
        return this.state !== null;
    }
    start(target, speed) {
        this.state = {
            target,
            interval: 140 / speed,
            last: -Infinity
        };
    }
    stop() {
        this.state = null;
    }
    step(now, engine) {
        const riffle = this.state;
        if (!riffle || now - riffle.last < riffle.interval) return;
        if (engine.position === riffle.target) {
            this.state = null;
            return;
        }
        riffle.last = now;
        if (!engine.flip(engine.position < riffle.target)) this.state = null;
    }
}
export function bindKeyboard(element, mode, actions, signal) {
    const handler = (e)=>{
        const current = mode();
        if (!current || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
        if (current === 'global') {
            const target = e.target;
            if (target?.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"]')) return;
        } else if (e.currentTarget !== element) return;
        const keys = {
            ArrowRight: actions.next,
            PageDown: actions.next,
            ArrowLeft: actions.prev,
            PageUp: actions.prev,
            Home: actions.first,
            End: actions.last
        };
        const action = keys[e.key];
        if (!action) return;
        e.preventDefault();
        action();
    };
    element.addEventListener('keydown', handler, {
        signal
    });
    window.addEventListener('keydown', (e)=>{
        if (mode() === 'global' && !element.contains(e.target)) handler(e);
    }, {
        signal
    });
}


//# sourceURL=navigation.ts