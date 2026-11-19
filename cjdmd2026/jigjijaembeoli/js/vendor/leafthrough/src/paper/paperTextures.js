import * as THREE from "../../../three.module.js";
import { loadGrain } from '../textures.js';
import { solidTexture } from './paperMaterial.js';
import { sharedResources } from '../shared.js';
import { createPaperPattern } from './paperPattern.js';
const BUILTIN_PATTERN = 'paper-pattern';
export class PaperTextures {
    events;
    blank = solidTexture('#fcfcf9');
    backBlank;
    pattern = null;
    disposed = false;
    constructor(backColor, events){
        this.events = events;
        this.backBlank = {
            texture: solidTexture(backColor),
            color: colorKey(backColor)
        };
    }
    back(color) {
        const key = colorKey(color);
        if (key !== this.backBlank.color) {
            this.backBlank.texture.dispose();
            this.backBlank = {
                texture: solidTexture(color),
                color: key
            };
        }
        return this.backBlank.texture;
    }
    grain(settings, renderer) {
        const grain = settings.paper.grain;
        const key = grain === true || grain === undefined ? 'builtin' : grain === false ? 'none' : grain;
        if (this.pattern?.key === key) return this.pattern.texture;
        this.pattern?.release();
        if (key === 'builtin') {
            const shared = sharedResources(renderer);
            const texture = shared.acquire(BUILTIN_PATTERN, ()=>createPaperPattern(renderer));
            this.pattern = {
                texture,
                key,
                release: ()=>shared.release(BUILTIN_PATTERN)
            };
            return texture;
        }
        const pattern = {
            texture: solidTexture('#000000'),
            key,
            release: ()=>pattern.texture.dispose()
        };
        this.pattern = pattern;
        if (key !== 'none') {
            loadGrain(key).then((loaded)=>{
                if (this.pattern !== pattern || this.disposed) return loaded.dispose();
                pattern.texture.dispose();
                pattern.texture = loaded;
                this.events.onGrain();
            }, (error)=>{
                if (this.pattern === pattern && !this.disposed) this.events.onError(error);
            });
        }
        return pattern.texture;
    }
    dispose() {
        this.disposed = true;
        this.pattern?.release();
        this.pattern = null;
        this.blank.dispose();
        this.backBlank.texture.dispose();
    }
}
export function colorKey(color) {
    return new THREE.Color(color).getHexString();
}


//# sourceURL=paper/paperTextures.ts