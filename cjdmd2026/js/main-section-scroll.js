/* 메인 index: 한 번의 세로 스크롤마다 다음 콘텐츠의 중앙으로 이동합니다.
   히어로보다 먼저 입력을 받아, 위로 돌아온 제스처의 관성이 포스터를 되감지 않게 합니다. */
(() => {
    "use strict";

    const main = document.querySelector("main.main");
    const sections = [...document.querySelectorAll("main.main > section")];
    if (!main || sections.length < 2) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector(".header");
    const editable = "input, textarea, select, [contenteditable]:not([contenteditable='false'])";
    const hasLenis = () => typeof lenis !== "undefined" && lenis;
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let points = [];
    let moving = false, gestureHeld = false, gestureTimer = 0;
    let touch = null, touchUsed = false;
    let resizeFrame = 0;

    function measure() {
        const headerHeight = header?.offsetHeight || 0;
        const available = Math.max(1, innerHeight - headerHeight);
        const viewportCenter = headerHeight + available / 2;
        main.style.paddingBottom = "0px";
        const next = [{ y: 0, section: sections[0] }];

        sections.slice(1).forEach(section => {
            const rect = section.getBoundingClientRect();
            const style = getComputedStyle(section);
            // 섹션 사이 여백을 제외하고 제목부터 마지막 콘텐츠까지의 중앙을 계산합니다.
            const top = scrollY + rect.top + parseFloat(style.paddingTop);
            const bottom = scrollY + rect.bottom - parseFloat(style.paddingBottom);
            const center = (top + bottom) / 2 - viewportCenter;
            if (bottom - top > available) {
                // 낮은 화면에서도 콘텐츠의 위·아래가 잘린 채 넘어가지 않도록 합니다.
                next.push({ y: top - headerHeight, section });
                next.push({ y: center, section });
                next.push({ y: bottom - innerHeight, section });
            } else {
                next.push({ y: center, section });
            }
        });

        const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        // 마지막 영상도 중앙에 놓을 수 있는 만큼만 푸터 앞의 공간을 보충합니다.
        main.style.paddingBottom = `${Math.ceil(Math.max(0, next.at(-1).y - limit))}px`;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        next.push({ y: maxScroll, section: document.querySelector(".footer") });
        points = next.map(point => ({ ...point, y: Math.max(0, Math.min(maxScroll, point.y)) }))
            .filter((point, i, all) => !i || point.y - all[i - 1].y > 2);
    }

    function holdGesture() {
        gestureHeld = true;
        clearTimeout(gestureTimer);
        gestureTimer = setTimeout(() => { gestureHeld = false; }, 320);
    }

    function move(direction) {
        measure();
        const point = direction > 0
            ? points.find(point => point.y > scrollY + 3)
            : [...points].reverse().find(point => point.y < scrollY - 3);
        if (!point) return;
        const start = scrollY;
        const distance = point.y - start;
        const duration = reducedMotion.matches ? 0 : 850;
        const started = performance.now();
        moving = true;
        if (hasLenis()) lenis.stop();

        function frame(now) {
            const progress = duration ? Math.min(1, (now - started) / duration) : 1;
            window.scrollTo({ top: start + distance * ease(progress), behavior: "instant" });
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                moving = false;
                holdGesture();
                if (hasLenis()) lenis.start();
            }
        }
        requestAnimationFrame(frame);
    }

    function ignore(event) {
        return event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey
            || document.body.classList.contains("mobile-menu-open")
            || document.documentElement.classList.contains("page-transition-active")
            || event.target.closest?.(editable);
    }

    function ownsScroll(direction) {
        // 포스터의 0 → 1 → 2 단계와 위로 되감기는 입력은 기존 히어로가 담당합니다.
        return scrollY > 2 || (direction > 0 && window.MainHeroCanScroll?.());
    }

    function consume(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    window.addEventListener("wheel", event => {
        if (ignore(event) || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
        const direction = Math.sign(event.deltaY);
        if (moving || gestureHeld) {
            consume(event);
            holdGesture();
            return;
        }
        if (!ownsScroll(direction)) return;
        consume(event);
        if (Math.abs(event.deltaY) < 4) return;
        holdGesture();
        move(direction);
    }, { passive: false, capture: true });

    window.addEventListener("touchstart", event => {
        touch = event.touches.length === 1 && !ignore(event)
            ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
        touchUsed = false;
    }, { passive: true, capture: true });

    window.addEventListener("touchmove", event => {
        if (!touch || event.touches.length !== 1 || ignore(event)) return;
        const dx = touch.x - event.touches[0].clientX;
        const dy = touch.y - event.touches[0].clientY;
        if (touchUsed) { consume(event); return; }
        // 위원회 탭·교수진 등 가로 조작은 그대로 통과시킵니다.
        if (Math.abs(dx) >= Math.abs(dy)) return;
        const direction = Math.sign(dy);
        if (moving || gestureHeld) { consume(event); return; }
        if (!ownsScroll(direction)) return;
        consume(event);
        if (Math.abs(dy) < 36) return;
        touchUsed = true;
        move(direction);
    }, { passive: false, capture: true });

    const endTouch = () => { touch = null; touchUsed = false; };
    window.addEventListener("touchend", endTouch, { passive: true, capture: true });
    window.addEventListener("touchcancel", endTouch, { passive: true, capture: true });

    window.addEventListener("keydown", event => {
        if (ignore(event) || event.target.closest?.("iframe, video")) return;
        if (event.key === " " && event.target.closest?.("button, a, [role='tab']")) return;
        const direction = ["ArrowDown", "PageDown"].includes(event.key) ? 1
            : ["ArrowUp", "PageUp"].includes(event.key) ? -1
            : event.key === " " ? (event.shiftKey ? -1 : 1) : 0;
        if (!direction) return;
        if (moving || gestureHeld) { consume(event); return; }
        if (!ownsScroll(direction)) return;
        consume(event);
        if (!event.repeat) move(direction);
    }, { capture: true });

    function resize() {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
            const current = points.find(point => Math.abs(point.y - scrollY) <= 3);
            measure();
            if (!moving && current && scrollY > 2) {
                const target = points.find(point => point.section === current.section);
                if (target) window.scrollTo({ top: target.y, behavior: "instant" });
            }
        });
    }
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("load", resize, { once: true });
    document.fonts?.ready.then(resize);
    resize();
})();
