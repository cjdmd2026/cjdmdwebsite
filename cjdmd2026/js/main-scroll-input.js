/* A wheel gesture can emit many tiny events, including a long momentum tail. */
(() => {
    'use strict';
    window.MainScrollInput = {
        createWheelTracker() {
            let lastAt = -Infinity, lastTriggerAt = -Infinity, lastDirection = 0;
            let total = 0, peak = 0, used = false;
            return event => {
                if (event.ctrlKey || event.metaKey || event.altKey ||
                    Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return null;
                const direction = Math.sign(event.deltaY);
                const now = performance.now();
                let fresh = now - lastAt > 180 || direction !== lastDirection;
                if (fresh) { total = 0; peak = 0; used = false; }
                lastAt = now; lastDirection = direction;
                const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
                const magnitude = Math.abs(event.deltaY) * unit;
                peak = Math.max(peak, magnitude);
                // Sustained wheel notches are deliberate input; a fading momentum tail is not.
                if (used && now - lastTriggerAt >= 320 && magnitude >= (event.deltaMode === 1 ? 16 : 24) && magnitude >= peak * .9) {
                    total = 0; used = false; fresh = true;
                }
                total += magnitude;
                const trigger = !used && total >= 8;
                if (trigger) { used = true; lastTriggerAt = now; }
                return { direction, fresh, trigger };
            };
        }
    };
})();
