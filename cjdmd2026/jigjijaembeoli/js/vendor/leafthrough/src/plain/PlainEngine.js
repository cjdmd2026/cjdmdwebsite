import * as THREE from "../../../three.module.js";
const SWIPE_PX = 30;
export class PlainEngine {
    group = new THREE.Group();
    maxPosition;
    spread;
    settings;
    hitArea;
    abort = new AbortController();
    current;
    dirty = true;
    press = null;
    constructor(ctx){
        this.settings = ctx.settings;
        this.hitArea = ctx.hitArea;
        this.spread = ctx.settings.layout === 'spread';
        this.maxPosition = this.spread ? Math.ceil(ctx.pageCount / 2) : ctx.pageCount;
        this.current = this.clamp(ctx.position);
        this.bindInput();
    }
    get position() {
        return this.current;
    }
    get turning() {
        return false;
    }
    pagesInView() {
        return this.spread ? {
            from: Math.max(2 * this.current - 1, 0),
            to: 2 * this.current
        } : {
            from: this.current,
            to: this.current
        };
    }
    get activeSide() {
        if (!this.spread) return 'both';
        if (this.current === 0) return 'right';
        if (this.current === this.maxPosition) return 'left';
        return 'both';
    }
    update() {
        const moved = this.dirty;
        this.dirty = false;
        return moved;
    }
    flip(forward) {
        if (!forward) {
            if (this.current <= 0) return false;
            this.current--;
        } else if (this.spread) {
            if (this.current >= this.maxPosition) return false;
            this.current++;
        } else if (this.current < this.maxPosition - 1) {
            this.current++;
        } else if (this.settings.loop && this.current > 0) {
            this.current = 0;
        } else return false;
        this.dirty = true;
        return true;
    }
    jumpTo(position) {
        this.current = this.clamp(position);
        this.dirty = true;
    }
    setPageTexture() {}
    dispose() {
        this.abort.abort();
    }
    clamp(position) {
        const last = this.spread ? this.maxPosition : this.maxPosition - 1;
        return Math.min(Math.max(Math.round(position), 0), Math.max(last, 0));
    }
    bindInput() {
        const el = this.hitArea;
        const signal = this.abort.signal;
        const { interaction } = this.settings;
        el.addEventListener('pointerdown', (e)=>{
            if (this.press && !e.isPrimary) return;
            if (e.button !== 0 || !(interaction.drag || interaction.click)) return;
            this.press = {
                id: e.pointerId,
                x: e.clientX,
                y: e.clientY
            };
        }, {
            signal
        });
        el.addEventListener('pointerup', (e)=>{
            const press = this.press;
            if (!press || e.pointerId !== press.id) return;
            this.press = null;
            const dx = e.clientX - press.x;
            if (Math.abs(dx) > SWIPE_PX) {
                if (interaction.drag) this.flip(dx < 0);
                return;
            }
            if (!interaction.click) return;
            const rect = el.getBoundingClientRect();
            const side = this.activeSide;
            this.flip(side === 'both' ? e.clientX >= rect.left + rect.width / 2 : side === 'right');
        }, {
            signal
        });
        const cancel = (e)=>{
            if (this.press?.id === e.pointerId) this.press = null;
        };
        el.addEventListener('pointercancel', cancel, {
            signal
        });
    }
}


//# sourceURL=plain/PlainEngine.ts