import { LeafThrough } from './LeafThrough.js';
export { LeafThrough };
export function leafThrough(node, options) {
    const { onInit, ...rest } = options;
    const magazine = new LeafThrough(node, rest);
    onInit?.(magazine);
    return {
        update (next) {
            const { onInit: _ignored, ...nextRest } = next;
            magazine.setOptions(nextRest);
        },
        destroy () {
            magazine.dispose();
        }
    };
}


//# sourceURL=svelte.ts