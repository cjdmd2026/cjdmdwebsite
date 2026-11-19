export const DEFAULT_SPREAD_QUERY = '(min-width: 768px) and (orientation: landscape)';
export const DEFAULT_PAGE_ASPECT = 1.377;
export function defaultPageLabel({ visiblePages, pageCount }) {
    if (!visiblePages.length) return `Closed, ${pageCount} pages`;
    const [first, last] = [
        visiblePages[0] + 1,
        visiblePages[visiblePages.length - 1] + 1
    ];
    return first === last ? `Page ${first} of ${pageCount}` : `Pages ${first}–${last} of ${pageCount}`;
}
export function isPageDescriptor(page) {
    return typeof page === 'object' && page !== null && Object.getPrototypeOf(page) === Object.prototype && 'src' in page;
}
export const pageImage = (page)=>isPageDescriptor(page) ? page.src : page;
export function resolveSettings(options, layout, prefersReducedMotion) {
    const spread = layout === 'spread';
    const paper = options.paper ?? {};
    const lighting = options.lighting ?? {};
    const motion = options.motion ?? {};
    const interaction = options.interaction ?? {};
    const reduced = motion.reducedMotion === 'auto' || motion.reducedMotion === undefined ? prefersReducedMotion : motion.reducedMotion;
    return {
        layout,
        pageAspect: options.pageAspect ?? DEFAULT_PAGE_ASPECT,
        loop: options.loop ?? true,
        bleed: options.bleed ?? true,
        paper: {
            grain: paper.grain ?? true,
            grainScale: paper.grainScale ?? 1.46,
            grainStrength: paper.grainStrength ?? 0.17,
            showThrough: paper.showThrough ?? (spread ? 0.04 : 0.3),
            inkGloss: paper.inkGloss ?? 0.33,
            roughness: paper.roughness ?? 0.5,
            metalness: paper.metalness ?? 0.17,
            backColor: paper.backColor ?? '#fcfcf9',
            wrinkles: paper.wrinkles ?? 1,
            bulge: paper.bulge ?? 1,
            cutout: paper.cutout ?? false,
            sheetGap: Math.max(0, paper.sheetGap ?? 0),
            depthBias: paper.depthBias ?? true
        },
        deform: null,
        lighting: {
            ambient: {
                sky: lighting.ambient?.sky ?? '#ffffff',
                ground: lighting.ambient?.ground ?? '#a1aeaf',
                intensity: lighting.ambient?.intensity ?? (spread ? 1.5 : 1.7)
            },
            sun: {
                color: lighting.sun?.color ?? '#ffffff',
                intensity: lighting.sun?.intensity ?? 2,
                position: lighting.sun?.position ?? (spread ? [
                    -3.5,
                    1.3,
                    4.1
                ] : [
                    0.689,
                    -1.15,
                    2.15
                ])
            },
            shadows: lighting.shadows ?? true,
            shadowMapSize: lighting.shadowMapSize ?? 2048,
            floorShadow: lighting.floorShadow ?? 0.15
        },
        motion: {
            speed: Math.max(0.05, motion.speed ?? 1),
            dragDistance: motion.dragDistance ?? (spread ? 0.8 : 1.2),
            commitThreshold: motion.commitThreshold ?? (spread ? 0.2 : 0.1),
            curl: motion.curl ?? 1,
            maxTilt: motion.maxTilt ?? (spread ? 45 : 35),
            jitter: reduced ? false : motion.jitter ?? true,
            hoverLift: reduced ? 0 : motion.hoverLift ?? 0.03,
            reduced
        },
        interaction: {
            drag: interaction.drag ?? true,
            click: interaction.click ?? true,
            hold: interaction.hold ?? true,
            hover: interaction.hover ?? true,
            keyboard: interaction.keyboard ?? true
        },
        maxPixelRatio: options.maxPixelRatio ?? 3
    };
}
export const LIVE_OPTIONS = new Set([
    'onPageChange',
    'onReady',
    'onPageLoad',
    'onError',
    'formatPageLabel',
    'label',
    'startPage',
    'preload',
    'pages'
]);
export function preloadRadius(preload) {
    const radius = preload ?? 6;
    return Number.isNaN(radius) ? 6 : Math.max(0, radius);
}
export function snapshot(value) {
    if (typeof value !== 'object' || value === null) return value;
    if (Array.isArray(value)) return value.map(snapshot);
    if (Object.getPrototypeOf(value) !== Object.prototype) return value;
    return Object.fromEntries(Object.entries(value).map(([key, item])=>[
            key,
            snapshot(item)
        ]));
}
export function deepEqual(a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const protoA = Object.getPrototypeOf(a);
    if (protoA !== Object.prototype && protoA !== Array.prototype) return false;
    if (protoA !== Object.getPrototypeOf(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key)=>deepEqual(a[key], b[key]));
}
export function changedOptions(previous, next) {
    const keys = new Set([
        ...Object.keys(previous),
        ...Object.keys(next)
    ]);
    return [
        ...keys
    ].filter((key)=>!deepEqual(previous[key], next[key]));
}


//# sourceURL=options.ts