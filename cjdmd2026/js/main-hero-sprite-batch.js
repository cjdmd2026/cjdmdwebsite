/* 작은 히어로 아이콘의 이동·블러·정착을 같은 GPU 배치로 그립니다.
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
        const floatsPerIcon = instancing ? 13 : 72;
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
                attribute float aBlur;
                attribute float aCut;
                uniform vec2 uSize, uAtlasSize;
                varying vec2 vUV;
                varying vec4 vBounds;
                varying vec2 vBlur;
                varying float vAlpha;
                varying float vCutDistance;
                void main() {
                    vec2 extent = aRect.zw + aBlur * 4.0;
                    vec2 offset = (aCorner - 0.5) * extent;
                    vec2 rotated = vec2(
                        offset.x * aRotation.x - offset.y * aRotation.y,
                        offset.x * aRotation.y + offset.y * aRotation.x);
                    vec2 position = aRect.xy + aRect.zw * 0.5 + rotated;
                    vec2 clip = position / uSize * 2.0 - 1.0;
                    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
                    vec2 source = (aCorner - 0.5) * extent / aRect.zw + 0.5;
                    vUV = (aUVRect.xy + source * aUVRect.zw) / uAtlasSize;
                    vBounds = vec4(aUVRect.xy, aUVRect.xy + aUVRect.zw) / uAtlasSize.xyxy;
                    vBlur = aBlur * aUVRect.zw / aRect.zw / uAtlasSize;
                    vAlpha = aAlpha;
                    vCutDistance = aCut == 0.0 ? 1.0 : sign(aCut) * (abs(aCut) - position.x);
                }
            ` : `
                attribute vec2 aPosition;
                attribute vec2 aUV;
                attribute float aAlpha;
                attribute vec4 aBounds;
                attribute vec2 aBlurUV;
                attribute float aCut;
                uniform vec2 uSize, uAtlasSize;
                varying vec2 vUV;
                varying vec4 vBounds;
                varying vec2 vBlur;
                varying float vAlpha;
                varying float vCutDistance;
                void main() {
                    vec2 clip = aPosition / uSize * 2.0 - 1.0;
                    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
                    vUV = aUV / uAtlasSize;
                    vBounds = aBounds / uAtlasSize.xyxy;
                    vBlur = aBlurUV / uAtlasSize;
                    vAlpha = aAlpha;
                    vCutDistance = aCut == 0.0 ? 1.0 : sign(aCut) * (abs(aCut) - aPosition.x);
                }
            `));
            gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `
                #ifdef GL_FRAGMENT_PRECISION_HIGH
                precision highp float;
                #else
                precision mediump float;
                #endif
                uniform sampler2D uAtlas;
                varying vec2 vUV;
                varying vec4 vBounds;
                varying vec2 vBlur;
                varying float vAlpha;
                varying float vCutDistance;
                vec4 sampleIcon(vec2 uv) {
                    // 아틀라스의 이웃 아이콘이 블러에 섞이지 않게 원본 영역 밖은 투명하게 처리합니다.
                    vec2 inside = step(vBounds.xy, uv) * step(uv, vBounds.zw);
                    return texture2D(uAtlas, uv) * inside.x * inside.y;
                }
                vec4 blurRow(float y) {
                    vec2 uv = vUV + vec2(0.0, y) * vBlur;
                    vec2 dx = vec2(vBlur.x, 0.0);
                    return (sampleIcon(uv - 2.0 * dx) + 4.0 * sampleIcon(uv - dx) +
                        6.0 * sampleIcon(uv) + 4.0 * sampleIcon(uv + dx) +
                        sampleIcon(uv + 2.0 * dx)) / 16.0;
                }
                void main() {
                    if (vCutDistance < 0.0) discard;
                    vec4 color = vBlur.x > 0.0
                        ? (blurRow(-2.0) + 4.0 * blurRow(-1.0) + 6.0 * blurRow(0.0) +
                            4.0 * blurRow(1.0) + blurRow(2.0)) / 16.0
                        : texture2D(uAtlas, vUV);
                    // 정규화한 premultiplied RGBA를 한 번만 합성해 초점에 따라 불투명도가 변하지 않습니다.
                    gl_FragColor = color * vAlpha;
                }
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
            ? [["aRect", 4, 0], ["aUVRect", 4, 16], ["aRotation", 2, 32], ["aAlpha", 1, 40], ["aBlur", 1, 44], ["aCut", 1, 48]]
            : [["aPosition", 2, 0], ["aUV", 2, 8], ["aAlpha", 1, 16], ["aBounds", 4, 20], ["aBlurUV", 2, 36], ["aCut", 1, 44]])
            .map(([name, count, offset]) => [gl.getAttribLocation(program, name), count, offset]);
        const corner = instancing ? gl.getAttribLocation(program, "aCorner") : -1;
        const size = gl.getUniformLocation(program, "uSize");
        const atlasSize = gl.getUniformLocation(program, "uAtlasSize");
        const sampler = gl.getUniformLocation(program, "uAtlas");
        const textures = new Map();
        let vertices = new Float32Array(4096 * floatsPerIcon), used = 0, capacity = 0;
        let width = 1, height = 1;
        canvas.addEventListener("webglcontextlost", () => { failed = true; }, { once: true });

        function vertex(x, y, u, v, opacity, ic, blurX, blurY, cut) {
            vertices[used++] = x; vertices[used++] = y;
            vertices[used++] = u; vertices[used++] = v;
            vertices[used++] = opacity;
            vertices[used++] = ic.ax; vertices[used++] = ic.ay;
            vertices[used++] = ic.ax + ic.gw; vertices[used++] = ic.ay + ic.gh;
            vertices[used++] = blurX; vertices[used++] = blurY; vertices[used++] = cut;
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
            add(ic, x, y, w, h, angle, opacity, blur = 0, cut = 0) {
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
                    vertices[used++] = blur;
                    vertices[used++] = cut;
                    return;
                }
                const blurX = blur * ic.gw / w, blurY = blur * ic.gh / h;
                // 인스턴싱이 없는 기기도 같은 여백·UV·중심 회전을 사용합니다.
                x -= blur * 2; y -= blur * 2;
                w += blur * 4; h += blur * 4;
                let ax = x, ay = y, bx = x + w, by = y, cx = x + w, cy = y + h, dx = x, dy = y + h;
                if (Math.abs(angle) > .002) {
                    const cos = Math.cos(angle), sin = Math.sin(angle), mx = x + w / 2, my = y + h / 2;
                    const wx = cos * w / 2, wy = sin * w / 2, hx = -sin * h / 2, hy = cos * h / 2;
                    ax = mx - wx - hx; ay = my - wy - hy;
                    bx = mx + wx - hx; by = my + wy - hy;
                    cx = mx + wx + hx; cy = my + wy + hy;
                    dx = mx - wx + hx; dy = my - wy + hy;
                }
                const u = ic.ax - blurX * 2, v = ic.ay - blurY * 2;
                const u2 = ic.ax + ic.gw + blurX * 2, v2 = ic.ay + ic.gh + blurY * 2;
                vertex(ax, ay, u, v, opacity, ic, blurX, blurY, cut);
                vertex(bx, by, u2, v, opacity, ic, blurX, blurY, cut);
                vertex(cx, cy, u2, v2, opacity, ic, blurX, blurY, cut);
                vertex(ax, ay, u, v, opacity, ic, blurX, blurY, cut);
                vertex(cx, cy, u2, v2, opacity, ic, blurX, blurY, cut);
                vertex(dx, dy, u, v2, opacity, ic, blurX, blurY, cut);
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
                    gl.vertexAttribPointer(attribute, count, gl.FLOAT, false, instancing ? 52 : 48, offset);
                    if (instancing) instancing.vertexAttribDivisorANGLE(attribute, 1);
                }
                gl.uniform2f(size, width, height);
                gl.uniform2f(atlasSize, atlas.naturalWidth || atlas.width, atlas.naturalHeight || atlas.height);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(sampler, 0);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                if (instancing) instancing.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, used / floatsPerIcon);
                else gl.drawArrays(gl.TRIANGLES, 0, used / 12);
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
