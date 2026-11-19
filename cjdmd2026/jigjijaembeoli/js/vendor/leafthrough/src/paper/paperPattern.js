import * as THREE from "../../../three.module.js";
const SIZE = 384;
const KERNEL = [
    [
        1,
        0.108,
        -0.049,
        0.022
    ],
    [
        0.131,
        0.016,
        -0.014,
        0.008
    ],
    [
        -0.039,
        -0.018,
        0,
        0.009
    ],
    [
        0.021,
        0.005,
        0.004,
        0.009
    ]
];
const CLOUD = 0.07;
const CLOUD_PERIOD = 32;
const LEVELS = [
    [
        0,
        0.537
    ],
    [
        0.001,
        0.624
    ],
    [
        0.01,
        0.675
    ],
    [
        0.05,
        0.714
    ],
    [
        0.1,
        0.733
    ],
    [
        0.25,
        0.761
    ],
    [
        0.5,
        0.788
    ],
    [
        0.75,
        0.816
    ],
    [
        0.9,
        0.835
    ],
    [
        0.95,
        0.847
    ],
    [
        0.99,
        0.867
    ],
    [
        0.999,
        0.89
    ],
    [
        1,
        0.914
    ]
];
function periodicNoise(period, random) {
    const grid = new Float32Array(period * period);
    for(let i = 0; i < grid.length; i++)grid[i] = random();
    const at = (x, y)=>grid[(y % period + period) % period * period + (x % period + period) % period];
    return (x, y)=>{
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const fx = x - xi;
        const fy = y - yi;
        const sx = fx * fx * (3 - 2 * fx);
        const sy = fy * fy * (3 - 2 * fy);
        const a = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * sx;
        const b = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * sx;
        return a + (b - a) * sy;
    };
}
function spread(values) {
    let mean = 0;
    for (const v of values)mean += v;
    mean /= values.length;
    let variance = 0;
    for (const v of values)variance += (v - mean) ** 2;
    return Math.sqrt(variance / values.length) || 1;
}
let canvas = null;
export function paperPatternCanvas() {
    if (canvas) return canvas;
    let s = 7;
    const random = ()=>(s = s * 1664525 + 1013904223 >>> 0) / 4294967296;
    const noise = new Float32Array(SIZE * SIZE);
    for(let i = 0; i < noise.length; i++){
        noise[i] = Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    }
    const at = (x, y)=>noise[(y + SIZE) % SIZE * SIZE + (x + SIZE) % SIZE];
    const reach = KERNEL.length - 1;
    const grain = new Float32Array(SIZE * SIZE);
    for(let y = 0; y < SIZE; y++){
        for(let x = 0; x < SIZE; x++){
            let v = 0;
            for(let dy = -reach; dy <= reach; dy++){
                const row = KERNEL[Math.abs(dy)];
                for(let dx = -reach; dx <= reach; dx++)v += row[Math.abs(dx)] * at(x + dx, y + dy);
            }
            grain[y * SIZE + x] = v;
        }
    }
    const cloudNoise = periodicNoise(CLOUD_PERIOD, random);
    const cloud = new Float32Array(SIZE * SIZE);
    for(let y = 0; y < SIZE; y++){
        for(let x = 0; x < SIZE; x++)cloud[y * SIZE + x] = cloudNoise(x / SIZE * CLOUD_PERIOD, y / SIZE * CLOUD_PERIOD);
    }
    const cloudScale = CLOUD * spread(grain) / spread(cloud);
    for(let i = 0; i < grain.length; i++)grain[i] += cloud[i] * cloudScale;
    const order = Array.from(grain.keys()).sort((a, b)=>grain[a] - grain[b]);
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(SIZE, SIZE);
    let level = 1;
    order.forEach((pixel, rank)=>{
        const share = rank / (order.length - 1);
        while(LEVELS[level][0] < share)level++;
        const [fromShare, from] = LEVELS[level - 1];
        const [toShare, to] = LEVELS[level];
        const g = Math.round(255 * (from + (to - from) * (share - fromShare) / (toShare - fromShare)));
        const o = pixel * 4;
        image.data[o] = image.data[o + 1] = image.data[o + 2] = g;
        image.data[o + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);
    return canvas;
}
export function createPaperPattern(renderer) {
    const texture = new THREE.CanvasTexture(paperPatternCanvas());
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
}


//# sourceURL=paper/paperPattern.ts