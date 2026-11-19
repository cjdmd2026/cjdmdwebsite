import * as THREE from "../../three.module.js";
import { isPageDescriptor, pageImage } from './options.js';
const KEPT_IMAGES = 8;
export const VISUALLY_HIDDEN = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
export class PageContent {
    events;
    element = document.createElement('div');
    key = '';
    shown = 0;
    images = new Map();
    constructor(events){
        this.events = events;
        this.element.dataset.leafthroughContent = '';
        this.element.style.cssText = VISUALLY_HIDDEN;
    }
    show(state) {
        const { pages, visiblePages, layout, plain } = state;
        const key = [
            plain,
            layout,
            state.paper,
            ...visiblePages.map((i)=>{
                const page = pages[i];
                const info = isPageDescriptor(page) ? page : {};
                return [
                    i,
                    sourceKey(pageImage(page)),
                    info.alt,
                    info.text,
                    state.label(i)
                ].join('\u0000');
            })
        ].join('\u0001');
        if (key === this.key) return;
        this.key = key;
        const token = ++this.shown;
        const used = new Set();
        let pending = 0;
        const settle = ()=>{
            if (token === this.shown && --pending === 0) this.events.onShown();
        };
        const figures = visiblePages.flatMap((i)=>{
            const page = pages[i];
            const { alt, text } = isPageDescriptor(page) ? page : {
                alt: undefined,
                text: undefined
            };
            if (!plain && !alt && !text) return [];
            const figure = document.createElement('figure');
            figure.dataset.page = String(i);
            figure.setAttribute('aria-label', state.label(i));
            figure.style.cssText = 'margin:0';
            if (plain) {
                const spread = layout === 'spread';
                const x = spread && i % 2 === 0 ? '50%' : '0';
                figure.style.cssText = `margin:0;position:absolute;top:0;left:${x};width:${spread ? '50%' : '100%'};height:100%;` + `background:${state.paper};box-shadow:0 1px 6px rgba(0,0,0,.18)`;
                const image = this.imageFor(i, pageImage(page), alt, used);
                if (image instanceof HTMLImageElement && !image.complete) {
                    pending++;
                    image.addEventListener('load', settle, {
                        once: true
                    });
                    image.addEventListener('error', settle, {
                        once: true
                    });
                }
                figure.append(image);
            } else if (alt) {
                const image = document.createElement('span');
                image.setAttribute('role', 'img');
                image.setAttribute('aria-label', alt);
                figure.append(image);
            }
            if (text) figure.append(paragraphs(text, plain));
            return [
                figure
            ];
        });
        this.element.replaceChildren(...figures);
        if (!pending) queueMicrotask(()=>token === this.shown && this.events.onShown());
    }
    refresh() {
        this.key = '';
        this.images.clear();
    }
    imageFor(page, source, alt = '', used) {
        const key = `${sourceKey(source)}\u0000${alt}`;
        let image = this.images.get(key);
        if (image && !used.has(image)) this.images.delete(key);
        else {
            const created = image = displayImage(source, alt);
            if (created instanceof HTMLImageElement && !created.complete) {
                created.addEventListener('load', ()=>this.events.onLoad(page), {
                    once: true
                });
                created.addEventListener('error', ()=>this.events.onError(page, new Error(`Failed to load page image: ${created.src}`)), {
                    once: true
                });
            } else queueMicrotask(()=>this.events.onLoad(page));
        }
        used.add(image);
        this.images.set(key, image);
        if (this.images.size > KEPT_IMAGES) this.images.delete(this.images.keys().next().value);
        return image;
    }
    place(box) {
        if (!box) {
            this.element.style.cssText = VISUALLY_HIDDEN;
            return;
        }
        const px = (n)=>`${Math.round(n * 100) / 100}px`;
        this.element.style.cssText = `position:absolute;left:${px(box.x)};top:${px(box.y)};width:${px(box.width)};height:${px(box.height)};pointer-events:none`;
    }
}
const ids = new WeakMap();
let nextId = 1;
export function sourceKey(source) {
    if (typeof source === 'string') return source;
    let id = ids.get(source);
    if (!id) ids.set(source, id = nextId++);
    return `#${id}`;
}
function paragraphs(text, hidden) {
    const block = document.createElement('div');
    if (hidden) block.style.cssText = VISUALLY_HIDDEN;
    for (const paragraph of text.split(/\n\s*\n/)){
        const p = document.createElement('p');
        p.textContent = paragraph.trim();
        block.append(p);
    }
    return block;
}
function displayImage(source, alt = '') {
    const url = typeof source === 'string' ? source : source instanceof HTMLImageElement ? source.currentSrc || source.src : null;
    const drawable = source instanceof THREE.Texture ? source.image : source;
    const style = 'display:block;width:100%;height:100%';
    if (url === null && drawable instanceof HTMLImageElement) return displayImage(drawable, alt);
    if (url !== null) {
        const img = document.createElement('img');
        img.decoding = 'async';
        img.alt = alt;
        img.draggable = false;
        img.style.cssText = style;
        img.src = url;
        return img;
    }
    if (typeof HTMLCanvasElement !== 'undefined' && (drawable instanceof HTMLCanvasElement || drawable instanceof ImageBitmap)) {
        const canvas = document.createElement('canvas');
        canvas.width = drawable.width;
        canvas.height = drawable.height;
        canvas.getContext('2d')?.drawImage(drawable, 0, 0);
        return describe(canvas, alt, style);
    }
    return describe(document.createElement('div'), alt, style);
}
function describe(element, alt, style) {
    element.style.cssText = style;
    if (alt) {
        element.setAttribute('role', 'img');
        element.setAttribute('aria-label', alt);
    } else element.setAttribute('aria-hidden', 'true');
    return element;
}


//# sourceURL=content.ts