/* 작은 히어로 아이콘을 블러 레이어별 한 번의 GPU 호출로 그립니다.
   로컬 파일·WebGL 미지원·컨텍스트 손실 시 main-hero.js의 2D 경로를 사용합니다. */
(() => {
    "use strict";
    window.createHeroSpriteBatch = canvas => {
        if (location.protocol === "file:") return null;
        const gl = canvas.getContext("webgl", {
            alpha: true, premultipliedAlpha: true, antialias: false,
            depth: false, stencil: false, preserveDrawingBuffer: true
        });
        if (!gl) return null;
        // 한 아이콘의 정보를 한 번만 전송합니다. 확장이 없는 기기는 기존 삼각형 배치를 사용합니다.
        const instancing = gl.getExtension("ANGLE_instanced_arrays");
        const floatsPerIcon = instancing ? 11 : 30;
        const shaders = [];
        let program, buffer, quadBuffer, failed = false;
        function compile(type, source) {
            const shader = gl.createShader(type);
            shaders.push(shader);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Sprite shader unavailable");
            return shader;
        }
        try {
            program = gl.createProgram();
            gl.attachShader(program, compile(gl.VERTEX_SHADER, instancing ? `
                attribute vec2 aCorner;
                attribute vec4 aRect;
                attribute vec4 aUVRect;
                attribute vec2 aRotation;
                attribute float aAlpha;
                uniform vec2 uSize, uAtlasSize;
                varying vec2 vUV;
                varying float vAlpha;
                void main() {
                    vec2 offset = (aCorner - 0.5) * aRect.zw;
                    vec2 rotated = vec2(
                        offset.x * aRotation.x - offset.y * aRotation.y,
                        offset.x * aRotation.y + offset.y * aRotation.x);
                    vec2 position = aRect.xy + aRect.zw * 0.5 + rotated;
                    vec2 clip = position / uSize * 2.0 - 1.0;
                    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
                    vUV = (aUVRect.xy + aCorner * aUVRect.zw) / uAtlasSize;
                    vAlpha = aAlpha;
                }
            ` : `
                attribute vec2 aPosition;
                attribute vec2 aUV;
                attribute float aAlpha;
                uniform vec2 uSize, uAtlasSize;
                varying vec2 vUV;
                varying float vAlpha;
                void main() {
                    vec2 clip = aPosition / uSize * 2.0 - 1.0;
                    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
                    vUV = aUV / uAtlasSize;
                    vAlpha = aAlpha;
                }
            `));
            gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `
                precision mediump float;
                uniform sampler2D uAtlas;
                varying vec2 vUV;
                varying float vAlpha;
                void main() { gl_FragColor = texture2D(uAtlas, vUV) * vAlpha; }
            `));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Sprite program unavailable");
            buffer = gl.createBuffer();
            if (instancing) {
                quadBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
            }
        } catch (_) {
            if (buffer) gl.deleteBuffer(buffer);
            if (quadBuffer) gl.deleteBuffer(quadBuffer);
            if (program) gl.deleteProgram(program);
            shaders.forEach(shader => gl.deleteShader(shader));
            return null;
        }
        shaders.forEach(shader => gl.deleteShader(shader));
        const attributes = (instancing
            ? [["aRect", 4, 0], ["aUVRect", 4, 16], ["aRotation", 2, 32], ["aAlpha", 1, 40]]
            : [["aPosition", 2, 0], ["aUV", 2, 8], ["aAlpha", 1, 16]])
            .map(([name, count, offset]) => [gl.getAttribLocation(program, name), count, offset]);
        const corner = instancing ? gl.getAttribLocation(program, "aCorner") : -1;
        const size = gl.getUniformLocation(program, "uSize");
        const atlasSize = gl.getUniformLocation(program, "uAtlasSize");
        const sampler = gl.getUniformLocation(program, "uAtlas");
        const textures = new Map();
        let vertices = new Float32Array(4096 * floatsPerIcon), used = 0, capacity = 0;
        let width = 1, height = 1;
        canvas.addEventListener("webglcontextlost", () => { failed = true; }, { once: true });

        function vertex(x, y, u, v, opacity) {
            vertices[used++] = x; vertices[used++] = y;
            vertices[used++] = u; vertices[used++] = v;
            vertices[used++] = opacity;
        }
        return {
            resize(w, h, ratio) {
                width = w; height = h;
                const pw = Math.max(1, Math.round(w * ratio)), ph = Math.max(1, Math.round(h * ratio));
                if (canvas.width !== pw) canvas.width = pw;
                if (canvas.height !== ph) canvas.height = ph;
                gl.viewport(0, 0, pw, ph);
            },
            clear() {
                used = 0;
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            },
            add(ic, x, y, w, h, angle, opacity) {
                if (used + floatsPerIcon > vertices.length) {
                    const next = new Float32Array(vertices.length * 2);
                    next.set(vertices); vertices = next;
                }
                if (instancing) {
                    const rotated = Math.abs(angle) > .002;
                    vertices[used++] = x; vertices[used++] = y;
                    vertices[used++] = w; vertices[used++] = h;
                    vertices[used++] = ic.ax; vertices[used++] = ic.ay;
                    vertices[used++] = ic.gw; vertices[used++] = ic.gh;
                    vertices[used++] = rotated ? Math.cos(angle) : 1;
                    vertices[used++] = rotated ? Math.sin(angle) : 0;
                    vertices[used++] = opacity;
                    return;
                }
                let ax = x, ay = y, bx = x + w, by = y, cx = x + w, cy = y + h, dx = x, dy = y + h;
                if (Math.abs(angle) > .002) {
                    const cos = Math.cos(angle), sin = Math.sin(angle), mx = x + w / 2, my = y + h / 2;
                    const wx = cos * w / 2, wy = sin * w / 2, hx = -sin * h / 2, hy = cos * h / 2;
                    ax = mx - wx - hx; ay = my - wy - hy;
                    bx = mx + wx - hx; by = my + wy - hy;
                    cx = mx + wx + hx; cy = my + wy + hy;
                    dx = mx - wx + hx; dy = my - wy + hy;
                }
                const u = ic.ax, v = ic.ay, u2 = u + ic.gw, v2 = v + ic.gh;
                vertex(ax, ay, u, v, opacity); vertex(bx, by, u2, v, opacity); vertex(cx, cy, u2, v2, opacity);
                vertex(ax, ay, u, v, opacity); vertex(cx, cy, u2, v2, opacity); vertex(dx, dy, u, v2, opacity);
            },
            flush(atlas) {
                if (failed || gl.isContextLost()) return false;
                if (!used) return true;
                let texture = textures.get(atlas);
                if (!texture) {
                    texture = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas); }
                    catch (_) { gl.deleteTexture(texture); failed = true; return false; }
                    textures.set(atlas, texture);
                }
                gl.useProgram(program);
                if (instancing) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
                    gl.enableVertexAttribArray(corner);
                    gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 8, 0);
                    instancing.vertexAttribDivisorANGLE(corner, 0);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                if (capacity !== vertices.length) {
                    gl.bufferData(gl.ARRAY_BUFFER, vertices.byteLength, gl.DYNAMIC_DRAW);
                    capacity = vertices.length;
                }
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices.subarray(0, used));
                for (const [attribute, count, offset] of attributes) {
                    gl.enableVertexAttribArray(attribute);
                    gl.vertexAttribPointer(attribute, count, gl.FLOAT, false, instancing ? 44 : 20, offset);
                    if (instancing) instancing.vertexAttribDivisorANGLE(attribute, 1);
                }
                gl.uniform2f(size, width, height);
                gl.uniform2f(atlasSize, atlas.naturalWidth, atlas.naturalHeight);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(sampler, 0);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                if (instancing) instancing.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, used / floatsPerIcon);
                else gl.drawArrays(gl.TRIANGLES, 0, used / 5);
                return true;
            },
            dispose() {
                textures.forEach(texture => gl.deleteTexture(texture));
                gl.deleteBuffer(buffer);
                if (quadBuffer) gl.deleteBuffer(quadBuffer);
                gl.deleteProgram(program);
            }
        };
    };
})();
