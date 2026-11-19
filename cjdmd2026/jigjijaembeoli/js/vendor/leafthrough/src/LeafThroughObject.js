import * as THREE from "../../three.module.js";
import { sourceKey } from './content.js';
import { floorPoint, rayThrough } from './engine.js';
import { framingFor, plainFramingFor } from './framing.js';
import { bindKeyboard, pageDetail, pagesAt, pageToPosition, Riffle } from './navigation.js';
import { changedOptions, deepEqual, DEFAULT_SPREAD_QUERY, LIVE_OPTIONS, pageImage, preloadRadius, resolveSettings, snapshot } from './options.js';
import { PaperTextures } from './paper/paperTextures.js';
import { sharedResources } from './shared.js';
import { SingleEngine } from './single/SingleEngine.js';
import { SpreadEngine } from './spread/SpreadEngine.js';
import { PageLoader } from './textures.js';
const SHEET_GAP = 0.0005;
const isClient = typeof window !== 'undefined';
export class LeafThroughObject extends THREE.Group {
    camera;
    domElement;
    inputEnabled = true;
    get enabled() {
        return this.inputEnabled;
    }
    set enabled(value) {
        if (this.inputEnabled && !value) this.view?.engine.cancelInput?.();
        this.inputEnabled = value;
    }
    renderer;
    options;
    paper;
    loader = null;
    view = null;
    spreadMedia = null;
    motionMedia;
    abort = new AbortController();
    riffle = new Riffle();
    metrics;
    ray = new THREE.Ray();
    point = new THREE.Vector3();
    ends = [
        new THREE.Vector3(),
        new THREE.Vector3()
    ];
    needsRender = true;
    lastPagesKey = '';
    lastDetailKey = '';
    inView = '';
    ready = false;
    readyFired = false;
    disposed = false;
    constructor({ renderer, camera, domElement = renderer.domElement }, options){
        super();
        if (!isClient) throw new Error('LeafThrough needs a browser; create it on the client.');
        this.renderer = renderer;
        this.camera = camera;
        this.domElement = domElement;
        this.options = copyOptions(options);
        const object = this;
        this.metrics = {
            get dragWidth () {
                return object.dragWidth();
            },
            dragDelta (dx, dy) {
                const axis = object.pageAxis();
                return (dx * axis.x + dy * axis.y) / (axis.length() || 1);
            }
        };
        this.paper = new PaperTextures(options.paper?.backColor ?? '#fcfcf9', {
            onGrain: ()=>this.remount(),
            onError: (error)=>this.fail(error)
        });
        const signal = this.abort.signal;
        this.watchSpreadQuery();
        this.motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.motionMedia.addEventListener('change', ()=>this.remount(), {
            signal
        });
        window.addEventListener('online', ()=>this.retry(), {
            signal
        });
        bindKeyboard(domElement, ()=>this.enabled && this.shown() ? this.view?.settings.interaction.keyboard : false, {
            next: ()=>this.next(),
            prev: ()=>this.prev(),
            first: ()=>this.goTo(0),
            last: ()=>this.goTo(this.pageCount - 1)
        }, signal);
        this.remount(options.startPage ?? 0);
    }
    get page() {
        return this.detail().page;
    }
    get pageCount() {
        return this.options.pages.length;
    }
    get layout() {
        return this.view?.settings.layout ?? this.pickLayout();
    }
    get visiblePages() {
        return this.detail().visiblePages;
    }
    get turning() {
        return this.view?.engine.turning ?? false;
    }
    get bounds() {
        const layout = this.layout;
        const aspect = this.view?.settings.pageAspect ?? this.resolve(layout).pageAspect;
        return {
            pages: plainFramingFor(layout, aspect).box,
            reach: framingFor(layout, aspect).view
        };
    }
    next() {
        this.riffle.stop();
        return this.view?.engine.flip(true) ?? false;
    }
    prev() {
        this.riffle.stop();
        return this.view?.engine.flip(false) ?? false;
    }
    goTo(page, { animate = false } = {}) {
        if (!this.view || Number.isNaN(page)) return;
        this.riffle.stop();
        const engine = this.view.engine;
        const target = pageToPosition(page, this.view.settings.layout, this.pageCount);
        if (!animate) {
            engine.jumpTo(target);
            return;
        }
        if (engine.position === target) return;
        this.riffle.start(target, this.view.settings.motion.speed);
        this.requestFrame();
    }
    retry() {
        this.loader?.retry();
    }
    update(options) {
        this.applyOptions({
            ...this.options,
            ...options
        });
    }
    setOptions(options) {
        this.applyOptions(options);
    }
    covers(clientX, clientY) {
        const view = this.view;
        if (!view || !this.enabled || !this.shown()) return false;
        if (!rayThrough(this.camera, this.domElement, clientX, clientY, this.ray)) return false;
        const point = floorPoint(view.engine.group, this.ray, this.point);
        if (!point) return false;
        const box = view.framing.box;
        const side = view.engine.activeSide;
        const left = side === 'right' ? box.x + box.width / 2 : box.x;
        const right = side === 'left' ? box.x + box.width / 2 : box.x + box.width;
        return point.x >= left && point.x <= right && point.y >= box.y && point.y <= box.y + box.height;
    }
    tick(now = performance.now()) {
        const view = this.view;
        if (!view) return false;
        this.riffle.step(now, view.engine);
        const moved = view.engine.update(now);
        this.followReader(view.engine, view.settings.layout);
        const draw = moved || this.needsRender;
        this.needsRender = false;
        if (this.ready && !this.readyFired) {
            this.readyFired = true;
            this.options.onReady?.();
            this.dispatchEvent({
                type: 'ready'
            });
        }
        this.emitPageChange();
        return draw || this.riffle.active;
    }
    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.riffle.stop();
        this.abort.abort();
        this.spreadMedia?.abort.abort();
        this.view?.dispose();
        this.view = null;
        this.loader?.dispose();
        this.paper.dispose();
        this.removeFromParent();
    }
    applyOptions(options) {
        if (this.disposed) return;
        const previous = this.options;
        const next = this.options = copyOptions(options);
        const changed = changedOptions(previous, next);
        if (!changed.length) return;
        if (changed.includes('spreadQuery')) this.watchSpreadQuery();
        const { shadows: wasShadowed, ...lighting } = previous.lighting ?? {};
        const { shadows: shadowed, ...nextLighting } = next.lighting ?? {};
        const liveShadows = changed.includes('lighting') && deepEqual(lighting, nextLighting);
        if (liveShadows && (wasShadowed ?? true) !== (shadowed ?? true)) this.view?.engine.setShadows?.(shadowed ?? true);
        const page = this.page;
        let rebuild = changed.some((key)=>{
            if (key === 'deform') return deformKey(previous) !== deformKey(next);
            if (key === 'lighting') return !liveShadows;
            return !LIVE_OPTIONS.has(key);
        });
        if (changed.includes('pages') && this.pagesKey(next) !== this.lastPagesKey) {
            this.loader?.dispose();
            this.loader = null;
            rebuild = true;
        }
        if (changed.includes('preload')) this.loader?.setRadius(preloadRadius(this.options.preload));
        if (rebuild) this.remount(page);
    }
    pickLayout() {
        const layout = this.options.layout ?? 'auto';
        if (layout !== 'auto') return layout;
        return this.spreadMedia?.list.matches ? 'spread' : 'single';
    }
    watchSpreadQuery() {
        this.spreadMedia?.abort.abort();
        const list = window.matchMedia(this.options.spreadQuery ?? DEFAULT_SPREAD_QUERY);
        const abort = new AbortController();
        list.addEventListener('change', ()=>this.remount(), {
            signal: abort.signal
        });
        this.spreadMedia = {
            list,
            abort
        };
    }
    remount(page = this.page) {
        if (this.disposed) return;
        this.riffle.stop();
        this.view?.dispose();
        const layout = this.pickLayout();
        const settings = this.resolve(layout);
        this.lastPagesKey = this.pagesKey(this.options);
        if (!this.loader) this.loadPages(page, layout);
        this.loader?.setWrap(layout === 'single' && settings.loop);
        const domElement = this.domElement;
        const blank = this.paper.blank;
        const ctx = {
            input: {
                element: domElement,
                ray: (x, y, ray)=>rayThrough(this.camera, domElement, x, y, ray),
                covers: (x, y)=>this.covers(x, y)
            },
            settings,
            textures: this.options.pages.map((_, i)=>this.loader?.textures[i] ?? blank),
            blank: layout === 'single' ? this.paper.back(settings.paper.backColor) : blank,
            pattern: this.paper.grain(settings, this.renderer),
            shared: sharedResources(this.renderer),
            position: pageToPosition(page, layout, this.pageCount),
            metrics: this.metrics,
            shading: {
                spineContact: {
                    value: new THREE.Vector3(1, 0, 0)
                },
                lightDirection: {
                    value: new THREE.Vector3(...settings.lighting.sun.position).normalize()
                },
                origin: {
                    value: new THREE.Vector3()
                }
            },
            requestFrame: ()=>this.requestFrame()
        };
        const engine = layout === 'spread' ? new SpreadEngine(ctx) : new SingleEngine(ctx);
        this.add(engine.group);
        this.view = {
            engine,
            settings,
            framing: framingFor(layout, settings.pageAspect),
            dispose: ()=>{
                this.remove(engine.group);
                engine.dispose();
            }
        };
        this.requestFrame();
    }
    resolve(layout) {
        const settings = resolveSettings(this.options, layout, this.motionMedia.matches);
        const paper = this.options.paper;
        settings.paper.sheetGap = Math.max(0, paper?.sheetGap ?? SHEET_GAP);
        settings.paper.depthBias = paper?.depthBias ?? false;
        const deform = this.options.deform;
        if (deform) {
            const uniforms = {};
            for (const name of Object.keys(deform.uniforms ?? {})){
                const options = ()=>this.options;
                uniforms[name] = {
                    get value () {
                        return options().deform?.uniforms?.[name]?.value;
                    }
                };
            }
            settings.deform = {
                glsl: deform.glsl,
                uniforms
            };
        }
        return settings;
    }
    axis = new THREE.Vector2();
    pageAxis() {
        const group = this.view?.engine.group ?? this;
        group.updateWorldMatrix(true, false);
        this.camera.updateWorldMatrix(true, false);
        const rect = this.domElement.getBoundingClientRect();
        const [spine, edge] = this.ends.map((end, x)=>end.set(x, 0, 0).applyMatrix4(group.matrixWorld).project(this.camera));
        return this.axis.set((edge.x - spine.x) * rect.width / 2, -((edge.y - spine.y) * rect.height) / 2);
    }
    dragWidth() {
        return Math.max(1, (this.view?.framing.dragWidth ?? 1) * this.pageAxis().length());
    }
    shown() {
        for(let object = this; object; object = object.parent)if (!object.visible) return false;
        return true;
    }
    requestFrame() {
        this.needsRender = true;
        this.dispatchEvent({
            type: 'change'
        });
    }
    pagesKey(options) {
        return options.pages.map((p)=>sourceKey(pageImage(p))).join('\n');
    }
    loadPages(around, layout) {
        this.loader?.dispose();
        const loader = new PageLoader(this.options.pages.map(pageImage), this.renderer, preloadRadius(this.options.preload), {
            onLoad: (page, texture)=>{
                if (this.loader !== loader) return;
                this.view?.engine.setPageTexture(page, texture);
                this.options.onPageLoad?.(page);
                this.dispatchEvent({
                    type: 'pageload',
                    detail: {
                        page
                    }
                });
            },
            onUnload: (page)=>{
                if (this.loader !== loader) return;
                this.view?.engine.setPageTexture(page, this.paper.blank);
            },
            onError: (page, error)=>this.fail(error, page)
        });
        this.loader = loader;
        this.inView = '';
        this.ready = this.readyFired = false;
        const count = this.pageCount;
        const first = [
            around - 1,
            around,
            around + 1,
            around + 2
        ];
        const visible = pagesAt(pageToPosition(around, layout, count), layout, count);
        loader.start(visible[0] ?? around, visible[visible.length - 1] ?? around, first).then(()=>{
            if (this.loader !== loader || this.disposed) return;
            this.ready = true;
            this.requestFrame();
        });
    }
    followReader(engine, layout) {
        if (!this.loader) return;
        const { from, to } = engine.pagesInView();
        const around = pagesAt(engine.position, layout, this.pageCount)[0] ?? to;
        const key = `${from}:${to}:${around}`;
        if (key === this.inView) return;
        this.inView = key;
        this.loader.focus(from, to, around);
    }
    fail(error, page) {
        if (this.options.onError) this.options.onError(error, page);
        else console.warn('[leafthrough]', error);
        this.dispatchEvent({
            type: 'error',
            detail: {
                error,
                page
            }
        });
    }
    detail() {
        return pageDetail(this.view?.engine.position ?? 0, this.layout, this.pageCount);
    }
    emitPageChange() {
        const detail = this.detail();
        const key = `${detail.layout}:${detail.visiblePages.join(',')}/${detail.pageCount}`;
        if (key === this.lastDetailKey) return;
        const first = !this.lastDetailKey;
        this.lastDetailKey = key;
        if (first) return;
        this.options.onPageChange?.(detail);
        this.dispatchEvent({
            type: 'pagechange',
            detail
        });
    }
}
const deformKey = ({ deform })=>deform ? `${deform.glsl}\n${Object.keys(deform.uniforms ?? {}).join(',')}` : '';
function copyOptions(options) {
    const copy = snapshot(options);
    const uniforms = options.deform?.uniforms;
    if (copy.deform && uniforms) copy.deform = {
        ...copy.deform,
        uniforms: {
            ...uniforms
        }
    };
    return copy;
}


//# sourceURL=LeafThroughObject.ts