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
        const shaders = [];
        let program, buffer, failed = false;
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
            gl.attachShader(program, compile(gl.VERTEX_SHADER, `
                attribute vec2 aPosition;
                attribute vec2 aUV;
                attribute float aAlpha;
                uniform vec2 uSize;
                varying vec2 vUV;
                varying float vAlpha;
                void main() {
                    vec2 clip = aPosition / uSize * 2.0 - 1.0;
                    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
                    vUV = aUV;
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
        } catch (_) {
            if (program) gl.deleteProgram(program);
            shaders.forEach(shader => gl.deleteShader(shader));
            return null;
        }
        shaders.forEach(shader => gl.deleteShader(shader));
        const position = gl.getAttribLocation(program, "aPosition");
        const uv = gl.getAttribLocation(program, "aUV");
        const alpha = gl.getAttribLocation(program, "aAlpha");
        const size = gl.getUniformLocation(program, "uSize");
        const sampler = gl.getUniformLocation(program, "uAtlas");
        const textures = new Map();
        let vertices = new Float32Array(4096 * 30), used = 0, capacity = 0;
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
                if (used + 30 > vertices.length) {
                    const next = new Float32Array(vertices.length * 2);
                    next.set(vertices); vertices = next;
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
                // UV는 아틀라스 픽셀 단위로 누적하고 전송 직전에 정규화합니다.
                for (let i = 0; i < used; i += 5) {
                    vertices[i + 2] /= atlas.naturalWidth;
                    vertices[i + 3] /= atlas.naturalHeight;
                }
                gl.useProgram(program);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                if (capacity !== vertices.length) {
                    gl.bufferData(gl.ARRAY_BUFFER, vertices.byteLength, gl.DYNAMIC_DRAW);
                    capacity = vertices.length;
                }
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices.subarray(0, used));
                for (const [attribute, count, offset] of [[position, 2, 0], [uv, 2, 8], [alpha, 1, 16]]) {
                    gl.enableVertexAttribArray(attribute);
                    gl.vertexAttribPointer(attribute, count, gl.FLOAT, false, 20, offset);
                }
                gl.uniform2f(size, width, height);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(sampler, 0);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.drawArrays(gl.TRIANGLES, 0, used / 5);
                return true;
            },
            dispose() {
                textures.forEach(texture => gl.deleteTexture(texture));
                gl.deleteBuffer(buffer);
                gl.deleteProgram(program);
            }
        };
    };
})();
