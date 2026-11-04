import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../js/main-hero-sprite-batch.js', import.meta.url), 'utf8');

function renderer({ instanced = true, protocol = 'http:', webgl = true } = {}) {
    const calls = [];
    const record = name => (...args) => calls.push([name, ...args]);
    const extension = {
        vertexAttribDivisorANGLE: record('divisor'),
        drawArraysInstancedANGLE: record('instances')
    };
    const gl = new Proxy({
        getExtension: () => instanced ? extension : null,
        getShaderParameter: () => true,
        getProgramParameter: () => true,
        getAttribLocation: (_, name) => name,
        getUniformLocation: (_, name) => name,
        createShader: () => ({}),
        createProgram: () => ({}),
        createBuffer: () => ({}),
        createTexture: () => ({}),
        isContextLost: () => false,
        bufferSubData: (_, offset, values) => calls.push(['upload', offset, Array.from(values)])
    }, {
        get(target, key) {
            if (key in target) return target[key];
            return /^[A-Z_]+$/.test(key) ? key : record(key);
        }
    });
    const events = {};
    const canvas = {
        getContext: () => webgl ? gl : null,
        addEventListener: (name, fn) => { events[name] = fn; }
    };
    const window = {};
    runInNewContext(source, { window, location: { protocol } });
    return { batch: window.createHeroSpriteBatch(canvas), calls, canvas, events };
}

const icon = { ax: 20, ay: 10, gw: 8, gh: 12 };
const atlas = { naturalWidth: 128, naturalHeight: 64 };

test('instancing uploads one record per sprite, preserving crop, opacity and rotation', () => {
    const { batch, calls, canvas } = renderer();
    batch.resize(200, 100, .75);
    assert.equal(canvas.width, 150);
    assert.equal(canvas.height, 75);
    batch.clear();
    batch.add(icon, 4, 6, 16, 24, Math.PI / 2, .5);
    assert.equal(batch.flush(atlas), true);
    const data = calls.find(c => c[0] === 'upload')[2];
    assert.equal(data.length, 13);
    assert.deepEqual(data.slice(0, 8), [4, 6, 16, 24, 20, 10, 8, 12]);
    assert.ok(Math.abs(data[8]) < 1e-6);
    assert.equal(data[9], 1);
    assert.equal(data[10], .5);
    assert.equal(data[11], 0);
    assert.deepEqual(calls.find(c => c[0] === 'instances'), ['instances', 'TRIANGLES', 0, 6, 1]);
    assert.ok(calls.some(c => c[0] === 'uniform2f' && c[1] === 'uAtlasSize' && c[2] === 128 && c[3] === 64));
});

test('buffer growth keeps all sprites and clear resets the instance count', () => {
    const { batch, calls } = renderer();
    batch.clear();
    for (let i = 0; i < 5000; i++) batch.add(icon, i, 6, 16, 24, 0, 1);
    assert.equal(batch.flush(atlas), true);
    const data = calls.find(c => c[0] === 'upload')[2];
    assert.equal(data.length, 5000 * 13);
    assert.equal(data[4999 * 13], 4999);
    assert.equal(calls.find(c => c[0] === 'instances')[4], 5000);
    batch.clear();
    batch.add(icon, 0, 0, 8, 12, 0, 1);
    batch.flush(atlas);
    assert.equal(calls.filter(c => c[0] === 'instances').at(-1)[4], 1);
    assert.equal(calls.filter(c => c[0] === 'texImage2D').length, 1);
});

test('devices without instancing retain the triangle renderer and rotated geometry', () => {
    const { batch, calls } = renderer({ instanced: false });
    batch.clear();
    batch.add(icon, 4, 6, 16, 24, Math.PI / 2, .5);
    assert.equal(batch.flush(atlas), true);
    const data = calls.find(c => c[0] === 'upload')[2];
    assert.equal(data.length, 72);
    assert.deepEqual(data.slice(0, 5), [24, 10, 20, 10, .5]);
    assert.deepEqual(calls.find(c => c[0] === 'drawArrays'), ['drawArrays', 'TRIANGLES', 0, 6]);
    assert.equal(calls.some(c => c[0] === 'instances'), false);
});

test('long-running animation reuses its buffer and the two poster atlas textures', () => {
    const { batch, calls } = renderer();
    const darkAtlas = { naturalWidth: 128, naturalHeight: 64 };
    let textureUploads = 0, bufferAllocations = 0;
    // Keep only the current frame's mock output, as the renderer does with its vertex buffer.
    for (let frame = 0; frame < 180; frame++) {
        calls.length = 0;
        batch.clear();
        for (let i = 0; i < 1800; i++) batch.add(icon, i % 120, frame / 60, 8, 12, 0, .6);
        assert.equal(batch.flush(frame % 2 ? darkAtlas : atlas), true);
        textureUploads += calls.filter(call => call[0] === 'texImage2D').length;
        bufferAllocations += calls.filter(call => call[0] === 'bufferData').length;
        assert.equal(calls.find(call => call[0] === 'upload')[2].length, 1800 * 13);
        assert.equal(calls.find(call => call[0] === 'instances')[4], 1800);
    }
    assert.equal(textureUploads, 2);
    assert.equal(bufferAllocations, 1);
    batch.dispose();
    assert.equal(calls.filter(call => call[0] === 'deleteTexture').length, 2);
});

test('blurred sprites retain one opacity and one instance per icon', () => {
    const { batch, calls } = renderer();
    batch.clear();
    batch.add(icon, 4, 6, 16, 24, 0, .6, 2);
    batch.add(icon, 4, 6, 16, 24, 0, .6, 0);
    batch.flush(atlas);
    const data = calls.find(c => c[0] === 'upload')[2];
    assert.equal(data.length, 26);
    assert.equal(data[10], data[23]);
    assert.equal(data[11], 2);
    assert.equal(data[24], 0);
    assert.equal(calls.find(c => c[0] === 'instances')[4], 2);
});

test('non-instanced blur expands around the original center and preserves crop bounds', () => {
    const { batch, calls } = renderer({ instanced: false });
    batch.clear();
    batch.add(icon, 4, 6, 16, 24, Math.PI / 2, .5, 2);
    batch.flush(atlas);
    const data = calls.find(c => c[0] === 'upload')[2];
    assert.equal(data.length, 72);
    // A 4px margin rotates with the quad; its center remains (12, 18).
    assert.deepEqual(data.slice(0, 11), [28, 6, 18, 8, .5, 20, 10, 28, 22, 1, 1]);
    const vertices = Array.from({ length: 6 }, (_, i) => data.slice(i * 12, (i + 1) * 12));
    assert.equal((Math.min(...vertices.map(v => v[0])) + Math.max(...vertices.map(v => v[0]))) / 2, 12);
    assert.equal((Math.min(...vertices.map(v => v[1])) + Math.max(...vertices.map(v => v[1]))) / 2, 18);
    for (const vertex of vertices) assert.deepEqual(vertex.slice(5), [20, 10, 28, 22, 1, 1, 0]);
    assert.deepEqual(calls.find(c => c[0] === 'drawArrays'), ['drawArrays', 'TRIANGLES', 0, 6]);
});

test('missing WebGL and lost contexts can fall back safely; disposal releases both buffers', () => {
    assert.equal(renderer({ protocol: 'file:' }).batch, null);
    assert.equal(renderer({ webgl: false }).batch, null);
    const { batch, calls, events } = renderer();
    batch.add(icon, 0, 0, 8, 12, 0, 1);
    batch.flush(atlas);
    events.webglcontextlost();
    assert.equal(batch.flush(atlas), false);
    batch.dispose();
    assert.equal(calls.filter(c => c[0] === 'deleteBuffer').length, 2);
    assert.equal(calls.filter(c => c[0] === 'deleteTexture').length, 1);
    assert.equal(calls.filter(c => c[0] === 'deleteProgram').length, 1);
});

test('both render paths use complementary cuts at full opacity for matching icon prints', () => {
    for (const instanced of [true, false]) {
        const { batch, calls } = renderer({ instanced });
        batch.clear();
        batch.add(icon, 4, 6, 16, 24, 0, 1, .5, 12);
        batch.add(icon, 4, 6, 16, 24, 0, 1, .5, -12);
        batch.flush(atlas);
        const data = calls.find(c => c[0] === 'upload')[2];
        const stride = instanced ? 13 : 12;
        const vertices = instanced ? 1 : 6;
        for (let i = 0; i < vertices * 2; i++) {
            assert.equal(data[i * stride + (instanced ? 10 : 4)], 1);
            assert.equal(data[(i + 1) * stride - 1], i < vertices ? 12 : -12);
        }
    }
});
