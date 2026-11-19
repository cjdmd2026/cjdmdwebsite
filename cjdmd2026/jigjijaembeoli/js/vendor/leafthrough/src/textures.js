import * as THREE from "../../three.module.js";
const CONCURRENCY = 4;
const NEAR = 1;
const UPLOADS_PER_FRAME = 1;
const IDLE_SPARE = 8;
const UPLOAD_TIMEOUT = 100;
export class PageLoader {
    sources;
    renderer;
    radius;
    events;
    textures;
    owned = new Set();
    inFlight = new Map();
    failed = new Set();
    pending = new Map();
    cancelUploads = null;
    first = [];
    from = 0;
    to = 0;
    around = 0;
    wrap = false;
    waiting = new Set();
    settleFirst = ()=>{};
    disposed = false;
    constructor(sources, renderer, radius, events){
        this.sources = sources;
        this.renderer = renderer;
        this.radius = radius;
        this.events = events;
        this.textures = new Array(sources.length);
    }
    start(from, to, first) {
        this.from = from;
        this.to = to;
        this.first = first.filter((i)=>i >= 0 && i < this.sources.length && this.distance(i) <= this.radius);
        this.waiting = new Set(this.first);
        const ready = new Promise((resolve)=>this.settleFirst = resolve);
        this.focus(from, to);
        if (!this.waiting.size) this.settleFirst();
        return ready;
    }
    focus(from, to = from, around = from) {
        if (this.disposed) return;
        this.from = from;
        this.to = to;
        this.around = around;
        const keep = 2 * this.radius;
        for (const [i, request] of this.inFlight){
            if (this.distance(i) <= keep) continue;
            request.abort();
            this.inFlight.delete(i);
        }
        this.textures.forEach((texture, i)=>{
            if (!texture || this.distance(i) <= keep || !this.owned.has(texture)) return;
            this.textures[i] = undefined;
            this.events.onUnload(i);
            this.owned.delete(texture);
            texture.dispose();
        });
        for (const [i, texture] of this.pending){
            if (this.distance(i) > keep) {
                this.pending.delete(i);
                if (this.owned.delete(texture)) texture.dispose();
            } else if (this.distance(i) <= NEAR) {
                this.pending.delete(i);
                this.show(i, texture);
            }
        }
        this.pump();
    }
    setWrap(wrap) {
        if (wrap === this.wrap) return;
        this.wrap = wrap;
        this.focus(this.from, this.to, this.around);
    }
    setRadius(radius) {
        this.radius = radius;
        this.focus(this.from, this.to, this.around);
    }
    retry() {
        this.failed.clear();
        this.pump();
    }
    dispose() {
        this.disposed = true;
        this.cancelUploads?.();
        this.cancelUploads = null;
        this.pending.clear();
        for (const request of this.inFlight.values())request.abort();
        for (const texture of this.owned)texture.dispose();
        this.owned.clear();
    }
    distance(page) {
        const straight = page < this.from ? this.from - page : page > this.to ? page - this.to : 0;
        if (!this.wrap) return straight;
        const count = this.sources.length;
        return Math.min(straight, page + count - this.to, this.from + count - page);
    }
    pump() {
        if (this.disposed || this.inFlight.size >= CONCURRENCY) return;
        const wanted = (i)=>!this.textures[i] && !this.inFlight.has(i) && !this.pending.has(i) && !this.failed.has(i) && this.distance(i) <= this.radius;
        const queue = [
            ...this.first.filter((i)=>this.waiting.has(i)),
            ...this.sources.map((_, i)=>i).sort((a, b)=>this.distance(a) - this.distance(b) || Math.abs(a - this.around) - Math.abs(b - this.around))
        ];
        for (const page of queue){
            if (this.inFlight.size >= CONCURRENCY) return;
            if (wanted(page)) this.load(page);
        }
    }
    load(page) {
        const request = new AbortController();
        this.inFlight.set(page, request);
        this.createTexture(this.sources[page], request.signal).then((texture)=>{
            if (this.disposed || request.signal.aborted) {
                if (this.owned.delete(texture)) texture.dispose();
                return;
            }
            if (this.owned.has(texture)) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.premultiplyAlpha = true;
                texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
                texture.needsUpdate = true;
            }
            if (this.waiting.has(page) || this.distance(page) <= NEAR) this.show(page, texture);
            else {
                this.pending.set(page, texture);
                this.scheduleUploads();
            }
        }).catch((error)=>{
            if (this.disposed || request.signal.aborted) return;
            this.failed.add(page);
            this.events.onError(page, error);
        }).finally(()=>{
            if (this.inFlight.get(page) === request) this.inFlight.delete(page);
            if (this.waiting.delete(page) && !this.waiting.size) this.settleFirst();
            this.pump();
        });
    }
    show(page, texture) {
        this.renderer.initTexture(texture);
        this.textures[page] = texture;
        this.events.onLoad(page, texture);
    }
    scheduleUploads() {
        if (this.cancelUploads || !this.pending.size) return;
        if (typeof requestIdleCallback === 'function') {
            const id = requestIdleCallback((deadline)=>this.uploadSome(deadline), {
                timeout: UPLOAD_TIMEOUT
            });
            this.cancelUploads = ()=>cancelIdleCallback(id);
        } else {
            const id = requestAnimationFrame(()=>this.uploadSome());
            this.cancelUploads = ()=>cancelAnimationFrame(id);
        }
    }
    uploadSome(deadline) {
        this.cancelUploads = null;
        const queue = [
            ...this.pending.keys()
        ].sort((a, b)=>this.distance(a) - this.distance(b) || Math.abs(a - this.around) - Math.abs(b - this.around));
        let count = 0;
        for (const page of queue){
            if (count >= UPLOADS_PER_FRAME && !(deadline && deadline.timeRemaining() > IDLE_SPARE)) break;
            const texture = this.pending.get(page);
            this.pending.delete(page);
            this.show(page, texture);
            count++;
        }
        this.scheduleUploads();
    }
    async createTexture(source, signal) {
        if (source instanceof THREE.Texture) return source;
        const own = (texture)=>(this.owned.add(texture), texture);
        if (typeof source === 'string') return own(new THREE.Texture(await loadImage(source, signal)));
        if (typeof HTMLCanvasElement !== 'undefined' && source instanceof HTMLCanvasElement) return own(new THREE.CanvasTexture(source));
        if (typeof HTMLImageElement !== 'undefined' && source instanceof HTMLImageElement) {
            if (!source.complete || !source.naturalWidth) await source.decode();
            return own(new THREE.Texture(source));
        }
        const canvas = document.createElement('canvas');
        canvas.width = source.width;
        canvas.height = source.height;
        canvas.getContext('2d').drawImage(source, 0, 0);
        return own(new THREE.CanvasTexture(canvas));
    }
}
function loadImage(url, signal) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        const onAbort = ()=>{
            done();
            img.src = '';
            reject(new DOMException('Page no longer needed', 'AbortError'));
        };
        const done = ()=>{
            img.onload = img.onerror = null;
            signal?.removeEventListener('abort', onAbort);
        };
        signal?.addEventListener('abort', onAbort, {
            once: true
        });
        img.onload = ()=>{
            done();
            img.decode().then(()=>resolve(img), ()=>resolve(img));
        };
        img.onerror = ()=>{
            done();
            reject(new Error(`Failed to load page image: ${url}`));
        };
        img.src = url;
    });
}
export async function loadGrain(source) {
    let texture;
    if (typeof source === 'string') texture = new THREE.Texture(await loadImage(source));
    else if (source instanceof HTMLCanvasElement) texture = new THREE.CanvasTexture(source);
    else {
        if (!source.complete || !source.naturalWidth) await source.decode();
        texture = new THREE.Texture(source);
    }
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
}


//# sourceURL=textures.ts