const REFERENCE_ASPECT = 1.377;
const SPREAD_OVERSCAN = 0.27975;
export function framingFor(layout, aspect) {
    const k = aspect / REFERENCE_ASPECT;
    if (layout === 'spread') {
        const box = {
            x: -1,
            y: -aspect / 2,
            width: 2,
            height: aspect
        };
        const view = {
            x: box.x - SPREAD_OVERSCAN * box.width,
            y: box.y - SPREAD_OVERSCAN * box.height,
            width: box.width * (1 + 2 * SPREAD_OVERSCAN),
            height: box.height * (1 + 2 * SPREAD_OVERSCAN)
        };
        const distance = view.height / 2 / Math.tan(20 * Math.PI / 180);
        return {
            box,
            view,
            eye: {
                x: 0,
                y: 0
            },
            distance,
            dragWidth: view.width,
            shadow: {
                left: -0.8,
                right: 1,
                top: 0.85 * k,
                bottom: -1.05 * k
            }
        };
    }
    const box = {
        x: -0.34,
        y: -1.2 * k,
        width: 1.56,
        height: 2.4 * k
    };
    const view = {
        x: -1.15,
        y: box.y,
        width: box.x + box.width + 1.15,
        height: box.height
    };
    return {
        box,
        view,
        eye: {
            x: box.x + box.width / 2,
            y: 0
        },
        distance: 3.1 * k,
        dragWidth: box.width,
        shadow: {
            left: -1.1,
            right: 1.1,
            top: 0.8 * k,
            bottom: -0.8 * k
        }
    };
}
export function plainFramingFor(layout, aspect) {
    const box = layout === 'spread' ? {
        x: -1,
        y: -aspect / 2,
        width: 2,
        height: aspect
    } : {
        x: 0,
        y: -aspect / 2,
        width: 1,
        height: aspect
    };
    return {
        box,
        view: box,
        eye: {
            x: box.x + box.width / 2,
            y: 0
        },
        distance: 1,
        dragWidth: box.width,
        shadow: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    };
}
export function fit(framing, width, height, bleed) {
    const fitted = bleed ? framing.box : framing.view;
    const scale = height > 0 ? Math.min(width / fitted.width, height / fitted.height) : width / fitted.width;
    const boxHeight = height > 0 ? height : fitted.height * scale;
    const left = (width - fitted.width * scale) / 2 - fitted.x * scale;
    const top = (boxHeight - fitted.height * scale) / 2 + (fitted.y + fitted.height) * scale;
    const toPx = (r)=>({
            x: left + r.x * scale,
            y: top - (r.y + r.height) * scale,
            width: r.width * scale,
            height: r.height * scale
        });
    return {
        scale,
        view: toPx(framing.view),
        box: toPx(framing.box),
        height: boxHeight
    };
}


//# sourceURL=framing.ts