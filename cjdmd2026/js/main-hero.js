/* =========================================================
   Main Hero — 포스터 영역 (스크롤 1번 = 한 단계)
   단계 0 : 포스터를 이루는 우리 아이콘들이 화면 전체에 흩어져 떠다님
   단계 1 : (스크롤 1번) 아이콘이 포스터 속 자리로 모여 '결합' 완성
            → 뒤에 포스터 그래픽이 먼저 깔리고, 아이콘은 입자처럼 닦여 사라짐
   단계 2 : (스크롤 1번) 그래픽이 왼쪽 포스터 자리로 이동, 오른쪽 설명 노출,
            배경 아이콘이 퍼지며 자리잡음 → 포스터가 입자 느낌으로 닦이며 나타남
   정착 후 : 일정 간격으로 기본 ↔ 다크 포스터 자동 전환
            포스터가 먼저 왼쪽→오른쪽으로 입자처럼 닦이고, 배경은 조금 늦게·느리게 같은 방향
            포스터 클릭 시 즉시 전환
   위로 스크롤하면 단계가 거꾸로 돌아갑니다.
   ========================================================= */
(() => {
    "use strict";

    /* ---------- 조절값 ---------- */
    const SETTINGS = {
        autoInterval: 5500,      // 포스터 자동 전환 간격(ms)
        posterWipe: 720,         // 포스터 전환 시간(ms): 기존 포스터가 왼쪽부터 입자로 부서져 오른쪽으로 날아감
        bgDelay: 150,            // 배경 시작: 포스터 전환이 1/3쯤 남았을 때 (포스터 전환 중반부터 함께)
        bgWipe: 720,             // 배경 닦이는 시간(ms) — 포스터보다 조금 느리게
        bigFrameHeight: 0.92,    // '결합' 크게 보일 때 그래픽 높이 (화면 높이 대비)
        iconBlurFullSize: 8,     // 원본 기준: 가장 작은 아이콘은 최대 블러 유지
        iconBlurClearSize: 40,   // 이 크기까지 블러를 점진적으로 줄이고, 큰 아이콘은 선명하게
        iconBlurMax: 3.5,        // 원본 기준 최대 블러 반경 — 화면 크기에 맞춰 함께 축소
        // 단계 전환 시간(ms)
        fly: 1500, graphicIn: 320, dissolve: 420,   // 모임 → (바로) 그래픽이 뒤에 깔림 → 아이콘 한 번에 사라짐
        move: 1250, reveal: 380,
        clickSwitch: 280          // 포스터 클릭 시 빠른 전환(ms)
    };

    const hero = document.getElementById("hero");
    const stage = document.getElementById("heroStage");
    const canvas = document.getElementById("heroCanvas");
    const bgCanvas = document.getElementById("heroBg");
    const posterButton = document.getElementById("heroPoster");
    const posterCanvas = document.getElementById("heroPosterCanvas");
    const download = document.getElementById("posterDownload");
    const indicator = document.getElementById("heroIndicator");
    const header = document.querySelector(".header");
    const heroAmbient = stage?.querySelector(".hero-ambient");
    if (!hero || !stage || !canvas || !posterButton || !posterCanvas || !bgCanvas) return;

    const ctx = canvas.getContext("2d");
    // 인접한 블러 레이어를 크기별 비율로 섞어 강도가 경계 없이 이어지게 합니다.
    // 필터는 레이어에만 적용해 수천 개 아이콘의 개별 필터 연산을 피합니다.
    const blurLayers = Array.from({ length: 4 }, (_, i) => {
        const layerCanvas = document.createElement("canvas");
        layerCanvas.id = `heroSoftCanvas${i + 1}`;
        layerCanvas.className = canvas.className;
        layerCanvas.setAttribute("aria-hidden", "true");
        return { canvas: layerCanvas, ctx: layerCanvas.getContext("2d"), strength: (i + 1) / 4, alpha: 1 };
    });
    // 강하게 흐린 작은 아이콘이 뒤에, 선명한 큰 아이콘이 앞에 놓입니다.
    for (const layer of [...blurLayers].reverse()) canvas.before(layer.canvas);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const posters = window.MAIN_POSTERS || [
        { theme: "light", image: "", pdf: "", background: "#fff" },
        { theme: "dark", image: "", pdf: "", background: "#000" }
    ];
    // 버전별(light/dark) 결합 아이콘 배치 — 포스터마다 아이콘 배치가 달라 따로 사용
    const SP = window.MAIN_POSTER_SPRITES || { w: 1, h: 1, s: [] };
    const SETS = SP.light ? SP : { light: SP };
    const SPRITES = SETS.light;

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (a, b) => a + Math.random() * (b - a);

    /* ---------- 이미지 ---------- */
    const scriptURL = document.currentScript?.src || document.baseURI;
    const loadImage = src => {
        if (!src) return null;
        const img = new Image();
        img.decoding = "async";
        img.src = new URL(src, scriptURL).href;
        return img;
    };
    const ready = img => img && img.complete && img.naturalWidth > 0;
    // 버전별(블랙/화이트) 아이콘 색 아틀라스와 포스터 속 결합 위치 보정
    const atlases = { light: loadImage(SETS.light?.atlas), dark: loadImage(SETS.dark?.atlas) };
    const themeOf = () => posters[current]?.theme === "dark" ? "dark" : "light";
    const atlasNow = () => atlases[themeOf()] || atlases.light || atlases.dark;
    const fitNow = () => [1, 0, 0];   // 버전별 원본에서 직접 뽑아 보정 불필요
    // '결합'은 이미지로 교체하지 않고 아이콘 그대로 왼쪽 포스터 자리로 이동 → 포스터가 나타나면 사라짐
    const currentGraphic = () => null;
    const hasGraphic = () => false;
    const posterImages = posters.map(p => loadImage(p.image));

    /* =====================================================
       애니메이션 값 (tween)
    ===================================================== */
    const V = {
        fly: 0,        // 아이콘: 흩어짐(0) → 자리(1)
        graphic: 0,    // 그래픽이 아이콘 뒤에 깔림
        dissolve: 0,   // 아이콘이 입자처럼 사라짐
        move: 0,       // 그래픽: 화면 중앙(0) → 포스터 자리(1)
        reveal: 0,     // 포스터가 그래픽 위로 닦이며 나타남
        text: 0,       // 설명 텍스트
        ambient: 0     // 배경 아이콘
    };
    const tweens = new Map();
    function tween(key, to, duration, { delay = 0, ease = easeInOut } = {}) {
        return new Promise(resolve => {
            tweens.get(key)?.resolve();
            if (reducedMotion.matches) duration = Math.min(duration, 200);
            const from = V[key];
            const start = performance.now() + delay;
            tweens.set(key, { from, to, start, duration, ease, resolve });
        });
    }
    function stepTweens(now) {
        tweens.forEach((t, key) => {
            if (now < t.start) return;
            const p = t.duration ? clamp((now - t.start) / t.duration) : 1;
            V[key] = lerp(t.from, t.to, t.ease(p));
            if (p >= 1) { tweens.delete(key); t.resolve(); }
        });
    }
    function setNow(values) {
        Object.entries(values).forEach(([k, v]) => { tweens.get(k)?.resolve(); tweens.delete(k); V[k] = v; });
    }

    /* =====================================================
       1. 아이콘 (스프라이트)
    ===================================================== */
    let W = 1, H = 1, DPR = 1;
    let stageLeft = 0, stageTop = 0, headerHeight = 70;
    let iconSets = { light: [], dark: [] };
    const iconsNow = () => iconSets[themeOf()]?.length ? iconSets[themeOf()] : iconSets.light;
    let bigFrame = { x: 0, y: 0, w: 1, h: 1 };
    let smallFrame = { x: 0, y: 0, w: 1, h: 1 };

    function buildIcons() {
        const blurLevel = size => {
            const t = clamp((SETTINGS.iconBlurClearSize - size) / (SETTINGS.iconBlurClearSize - SETTINGS.iconBlurFullSize));
            return t * t * (3 - 2 * t) * blurLayers.length;
        };
        const make = set => (set?.s || []).map(([gx, gy, gw, gh, ax, ay, kind]) => ({
            gx, gy, gw, gh, ax, ay,
            whole: kind === 1,
            blurLevel: blurLevel(Math.max(gw, gh)),
            sx: rand(-.03, 1.03), sy: rand(-.03, 1.03),       // 흩어진 위치 (화면 비율)
            delay: Math.random() * .4,
            // 사라질 때 순서: 왼쪽→오른쪽 + 입자 노이즈
            phase: Math.random() * Math.PI * 2,
            px: 0, py: 0, pvx: 0, pvy: 0, spin: 0, angle: 0, awake: false,   // 마우스에 밀린 정도
            speed: rand(.2, .55),
            drift: rand(8, 26)
        }));
        iconSets = { light: make(SETS.light), dark: make(SETS.dark) };
    }

    function sizeCanvas(c, context, w, h) {
        const width = Math.max(1, Math.round(w * DPR));
        const height = Math.max(1, Math.round(h * DPR));
        if (c.width !== width || c.height !== height) {
            c.width = width;
            c.height = height;
        }
        context.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    let posterW = 1, posterH = 1;
    function measure() {
        const rect = stage.getBoundingClientRect();
        stageLeft = rect.left;
        stageTop = rect.top + window.scrollY;
        headerHeight = header?.offsetHeight || 70;
        W = Math.max(1, rect.width);
        H = Math.max(1, rect.height);
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        sizeCanvas(canvas, ctx, W, H);
        for (const layer of blurLayers) {
            sizeCanvas(layer.canvas, layer.ctx, W, H);
            layer.ctx.imageSmoothingQuality = "high";
        }
        bgWipe.resize(W, H, DPR);
        ctx.imageSmoothingQuality = "high";

        const ratio = SPRITES.w / SPRITES.h;
        let fh = H * SETTINGS.bigFrameHeight;
        let fw = fh * ratio;
        if (fw > W * 0.95) { fw = W * 0.95; fh = fw / ratio; }
        bigFrame = { x: (W - fw) / 2, y: (H - fh) / 2, w: fw, h: fh };

        const p = posterButton.getBoundingClientRect();
        smallFrame = { x: p.left - rect.left, y: p.top - rect.top, w: p.width, h: p.height };
        posterW = Math.max(1, p.width);
        posterH = Math.max(1, p.height);
        posterWipe.resize(posterW, posterH, DPR);
        // 포스터 전환 입자는 첫 화면에서 사용하지 않습니다. 실제 전환 때 준비합니다.
        if (fxCanvas && fx) {
            sizeCanvas(fxCanvas, fx, W, H);
            if (fxDirty) fx.clearRect(0, 0, W, H);
            fxDirty = false;
        }
        fxCells = null;
        lastPosterState = lastIconState = "";
    }

    /* =====================================================
       2. 입자 닦임 전환 (grain wipe)
       Codrops "Distortion and Grain Effects on Scroll" 의 방식을 응용:
       - 화면 픽셀 단위의 고운 노이즈로 경계가 왼쪽→오른쪽으로 번져가고
       - 경계 근처는 simplex noise 로 이미지 좌표를 살짝 흔들어(왜곡) 입자처럼 보이게 함
       WebGL 사용, 지원되지 않거나 로컬 파일(file://)로 열어 이미지가 막히면 2D 캔버스로 대체
    ===================================================== */
    const WIPE_FRAG = `
        precision highp float;
        uniform sampler2D uA, uB;
        uniform float uT, uTime, uGrain, uBand, uMode;
        varying vec2 vUv;
        vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
            m = m * m; m = m * m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }
        float rnd(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
            vec2 uv = vUv;
            float mask;
            if (uMode > 1.5) {
                // 부드러운 경계가 왼쪽 → 오른쪽으로 이동 (배경용, 입자 없음)
                float d = (uT * (1.0 + uBand * 2.0) - uBand) - uv.x;
                mask = smoothstep(-uBand, uBand, d);
            } else if (uMode > 0.5) {
                mask = uT;                                   // 한 번에 교체 (크로스페이드)
            } else {
                // 일자 경계가 왼쪽 → 오른쪽으로 이동, 경계선에만 아주 고운 입자
                float d = (uT * (1.0 + uBand * 2.0) - uBand) - uv.x;
                float g = rnd(floor(gl_FragCoord.xy / uGrain) + floor(uTime * 30.0));
                mask = d >= uBand ? 1.0 : (d <= -uBand ? 0.0 : step(g, (d + uBand) / (2.0 * uBand)));
            }
            gl_FragColor = mix(texture2D(uA, uv), texture2D(uB, uv), mask);
        }`;
    const WIPE_VERT = `
        attribute vec2 p;
        varying vec2 vUv;
        void main() { vUv = p * 0.5 + 0.5; vUv.y = 1.0 - vUv.y; gl_Position = vec4(p, 0.0, 1.0); }`;

    // src: { color: [r,g,b,a] } 또는 { image, color }
    function createWipe(el, options) {
        const opts = Object.assign({ grain: 1, band: .02 }, options);
        let gl = null, prog = null, uni = {}, texCache = new Map(), failed = false;
        let cw = 1, ch = 1, dpr = 1;

        try {
            gl = el.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
        } catch (e) { gl = null; }
        if (gl) {
            const sh = (type, src) => {
                const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
                return s;
            };
            try {
                prog = gl.createProgram();
                gl.attachShader(prog, sh(gl.VERTEX_SHADER, WIPE_VERT));
                gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, WIPE_FRAG));
                gl.linkProgram(prog);
                gl.useProgram(prog);
                const buf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
                const loc = gl.getAttribLocation(prog, "p");
                gl.enableVertexAttribArray(loc);
                gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
                ["uA", "uB", "uT", "uTime", "uGrain", "uBand", "uMode"].forEach(k => { uni[k] = gl.getUniformLocation(prog, k); });
                gl.uniform1i(uni.uA, 0);
                gl.uniform1i(uni.uB, 1);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            } catch (e) { console.warn("[hero] WebGL wipe 비활성:", e); gl = null; }
        }

        // ---- 2D 대체 (고운 입자) ----
        let ctx2d = null, mask = null, scratch = null, sctx = null;
        function use2D() {
            failed = true;
            if (gl) {
                // WebGL 컨텍스트를 쓴 캔버스는 2D로 바꿀 수 없어 새 캔버스로 교체
                const fresh = el.cloneNode(false);
                el.replaceWith(fresh);
                el = fresh;
                gl = null;
            }
            ctx2d = el.getContext("2d");
            scratch = document.createElement("canvas");
            sctx = scratch.getContext("2d");
            resize(cw, ch, dpr);
        }
        function build2DMask() {
            const cell = 2;
            const cols = Math.max(1, Math.ceil(cw / cell)), rows = Math.max(1, Math.ceil(ch / cell));
            const c = document.createElement("canvas"); c.width = cols; c.height = rows;
            const thr = new Float32Array(cols * rows);
            for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
                thr[y * cols + x] = x / cols;   // 일자 경계
            }
            mask = { c, cx: c.getContext("2d"), thr, data: c.getContext("2d").createImageData(cols, rows) };
        }
        function paint2D(t) {
            const band = opts.band;
            const p = t * (1 + band * 2) - band;
            const d = mask.data.data;
            for (let i = 0; i < mask.thr.length; i++) {
                const e = p - mask.thr[i];
                const on = e >= band ? true : e <= -band ? false : Math.random() < (e + band) / (2 * band);
                d[i * 4 + 3] = on ? 255 : 0;
            }
            mask.cx.putImageData(mask.data, 0, 0);
        }
        const fill2D = (c, src) => {
            const [r, g, b, a] = src.color || [0, 0, 0, 0];
            c.clearRect(0, 0, cw, ch);
            if (a > 0) { c.fillStyle = `rgba(${r},${g},${b},${a / 255})`; c.fillRect(0, 0, cw, ch); }
            if (src.image && ready(src.image)) c.drawImage(src.image, 0, 0, cw, ch);
        };

        // ---- WebGL 텍스처 ----
        function texFor(src) {
            const useImg = src.image && ready(src.image);
            const key = useImg ? src.image.src : "c:" + (src.color || [0, 0, 0, 0]).join(",");
            if (texCache.has(key)) return texCache.get(key);
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            if (useImg) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src.image); // file:// 이면 여기서 SecurityError
            } else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(src.color || [0, 0, 0, 0]));
            }
            texCache.set(key, tex);
            return tex;
        }

        function resize(w, h, ratio) {
            cw = Math.max(1, w); ch = Math.max(1, h); dpr = ratio;
            el.width = Math.round(cw * dpr);
            el.height = Math.round(ch * dpr);
            if (gl) gl.viewport(0, 0, el.width, el.height);
            if (ctx2d) {
                ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
                scratch.width = el.width; scratch.height = el.height;
                sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                build2DMask();
            }
        }

        // from → to 를 진행도 t(0~1)로 그림
        function draw(from, to, t, time, mode = "wipe") {
            t = Math.min(1, Math.max(0, t));
            if (gl) {
                try {
                    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texFor(t >= 1 ? to : from));
                    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texFor(to));
                } catch (e) { use2D(); return draw(from, to, t, time, mode); }
                gl.uniform1f(uni.uT, t >= 1 ? 1 : t);
                gl.uniform1f(uni.uTime, time / 1000);
                gl.uniform1f(uni.uGrain, opts.grain * dpr);
                gl.uniform1f(uni.uBand, opts.band);
                gl.uniform1f(uni.uMode, mode === "soft" ? 2 : mode === "fade" ? 1 : 0);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                return;
            }
            if (!ctx2d) use2D();
            if (t >= 1) { fill2D(ctx2d, to); return; }
            fill2D(ctx2d, from);
            if (t <= 0) return;
            if (mode === "fade") {
                ctx2d.globalAlpha = t; fill2D(sctx, to); ctx2d.drawImage(scratch, 0, 0, cw, ch); ctx2d.globalAlpha = 1;
                return;
            }
            if (mode === "soft") {
                const b = opts.band, p = t * (1 + b * 2) - b;
                fill2D(sctx, to);
                const gr = sctx.createLinearGradient((p - b) * cw, 0, (p + b) * cw, 0);
                gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(1, "rgba(0,0,0,0)");
                sctx.globalCompositeOperation = "destination-in";
                sctx.fillStyle = gr; sctx.fillRect(0, 0, cw, ch);
                sctx.globalCompositeOperation = "source-over";
                ctx2d.drawImage(scratch, 0, 0, cw, ch);
                return;
            }
            fill2D(sctx, to);
            paint2D(t);
            sctx.globalCompositeOperation = "destination-in";
            sctx.imageSmoothingEnabled = false;
            sctx.drawImage(mask.c, 0, 0, cw, ch);
            sctx.globalCompositeOperation = "source-over";
            ctx2d.drawImage(scratch, 0, 0, cw, ch);
        }

        return { draw, resize, get canvas() { return el; } };
    }

    const bgWipe = createWipe(bgCanvas, { band: .22 });   // 배경: 입자 없이 부드럽게
    // 포스터는 2D 캔버스 하나에 새 포스터 + 남은 기존 포스터를 함께 그림
    const pCtx = posterCanvas.getContext("2d");
    const pScratch = document.createElement("canvas");
    const psCtx = pScratch.getContext("2d");
    const posterWipe = {
        resize(w, h, dpr) {
            [posterCanvas, pScratch].forEach(c => { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); });
            pCtx.setTransform(1, 0, 0, 1, 0, 0); psCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
    };
    function paintPoster(c, index) {
        const w = posterCanvas.width, h = posterCanvas.height;
        c.fillStyle = posters[index].background || (posters[index].theme === "dark" ? "#000" : "#fff");
        c.fillRect(0, 0, w, h);
        const img = posterImages[index];
        if (ready(img)) c.drawImage(img, 0, 0, w, h);
    }

    /* =====================================================
       3. 포스터 / 배경 그리기
    ===================================================== */
    let current = 0;
    let themeFrom = 0, themeT = 1, bgT = 1;     // 전환 진행도 (1 = 완료)
    const hexToRgba = (hex, a = 255) => {
        const h = (hex || "#000").replace("#", "");
        const v = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
        return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16), a];
    };
    const TRANSPARENT = { color: [0, 0, 0, 0] };
    const posterSrc = index => ({
        color: hexToRgba(posters[index].background || (posters[index].theme === "dark" ? "#000" : "#fff")),
        image: posterImages[index]
    });
    const bgSrc = index => ({ color: posters[index].theme === "dark" ? [0, 0, 0, 255] : [255, 255, 255, 255] });

    let switchMode = "wipe";   // 자동 전환 = 일자 닦임 / 클릭 = 빠른 페이드
    let lastBackground = "";
    function renderBg(time) {
        // 정지한 단색 배경을 매 프레임 전체 화면 WebGL로 다시 칠하지 않습니다.
        const background = posters[current].theme === "dark" ? "#000" : "#fff";
        const state = bgT >= 1 ? background : "transition";
        if (state !== lastBackground) {
            stage.style.backgroundColor = background;
            bgWipe.canvas.style.visibility = bgT >= 1 ? "hidden" : "";
            lastBackground = state;
        }
        if (bgT >= 1) return;
        bgWipe.draw(bgSrc(themeFrom), bgSrc(current), bgT, time, switchMode === "fade" ? "fade" : "soft");
    }
    // 배경 아이콘(main.js)이 배경 전환과 같은 위치·속도로 색을 바꾸도록 상태를 공유
    window.MainHeroBg = () => ({
        fromDark: posters[themeFrom].theme === "dark",
        toDark: posters[current].theme === "dark",
        t: bgT,
        band: .22,
        fade: switchMode === "fade",
        ambient: V.ambient
    });

    /* =====================================================
       포스터 전환 입자
       - 새 포스터는 아래에 바로 깔리고, 기존 포스터를 작은 칸(입자)으로 나눠
         왼쪽부터 차례로 떨어져 나가 오른쪽으로 흩날리며 사라짐
    ===================================================== */
    const fxCanvas = document.getElementById("heroFx");
    const fx = fxCanvas?.getContext("2d");
    const FX = { cell: 1, release: .62, flight: .38, spreadX: .95, spreadY: 90 };  // 입자 크기(px) — 작을수록 고움
    let fxCells = null, fxCols = 1, fxRows = 1, fxDirty = false;
    let fxMask = null, fxMaskCtx = null, fxMaskData = null;
    let fxBuf = null, fxBufCtx = null, fxBufData = null, fxBufW = 1, fxBufH = 1;
    const fxColors = new Map();   // 포스터별 칸 색상 캐시
    function buildFx() {
        if (!fxCanvas) return;
        fxCanvas.width = Math.round(W * DPR);
        fxCanvas.height = Math.round(H * DPR);
        fx.setTransform(DPR, 0, 0, DPR, 0, 0);
        fxCols = Math.ceil(posterW / FX.cell); fxRows = Math.ceil(posterH / FX.cell);
        const n = fxCols * fxRows;
        fxCells = { t0: new Float32Array(n), vx: new Float32Array(n), vy: new Float32Array(n), lift: new Float32Array(n) };
        for (let y = 0, i = 0; y < fxRows; y++) for (let x = 0; x < fxCols; x++, i++) {
            const nx = x / fxCols;
            fxCells.t0[i] = nx * FX.release * .8 + Math.random() * FX.release * .2;
            fxCells.vx[i] = rand(.25, 1) * posterW * FX.spreadX * (.5 + nx * .5);
            fxCells.vy[i] = rand(-1, 1) * FX.spreadY;
            fxCells.lift[i] = rand(0, FX.spreadY * .8);
        }
        fxMask = document.createElement("canvas"); fxMask.width = fxCols; fxMask.height = fxRows;
        fxMaskCtx = fxMask.getContext("2d"); fxMaskData = fxMaskCtx.createImageData(fxCols, fxRows);
        // 날아가는 입자용 버퍼 (화면 해상도 그대로, 포스터 + 오른쪽 여유)
        fxBufW = Math.ceil((posterW * (1 + FX.spreadX) + 20) * DPR);
        fxBufH = Math.ceil((posterH + FX.spreadY * 2.4) * DPR);
        fxBuf = document.createElement("canvas"); fxBuf.width = fxBufW; fxBuf.height = fxBufH;
        fxBufCtx = fxBuf.getContext("2d"); fxBufData = fxBufCtx.createImageData(fxBufW, fxBufH);
        fxColors.clear();
    }
    function colorsFor(index) {
        const key = index + ":" + (ready(posterImages[index]) ? 1 : 0);
        if (fxColors.has(key)) return fxColors.get(key);
        const c = document.createElement("canvas"); c.width = fxCols; c.height = fxRows;
        const x = c.getContext("2d");
        const [r, g, b] = hexToRgba(posters[index].background || "#000");
        x.fillStyle = `rgb(${r},${g},${b})`; x.fillRect(0, 0, fxCols, fxRows);
        if (ready(posterImages[index])) x.drawImage(posterImages[index], 0, 0, fxCols, fxRows);
        let data;
        try { data = x.getImageData(0, 0, fxCols, fxRows).data; }
        catch (e) { data = new Uint8ClampedArray(fxCols * fxRows * 4).map((_, i) => [r, g, b, 255][i % 4]); }  // file:// 대비
        fxColors.set(key, data);
        return data;
    }
    function renderFx(from, t) {
        if (!fx) return;
        if (t >= 1) {
            if (fxDirty) { fx.clearRect(0, 0, W, H); fxDirty = false; }
            return;
        }
        if (!fxCells) buildFx();
        fxDirty = true;
        fx.clearRect(0, 0, W, H);
        const ox = smallFrame.x, oy = smallFrame.y;
        const src = posterSrc(from);
        const img = src.image && ready(src.image) ? src.image : null;
        const col = colorsFor(from);
        const { t0, vx, vy, lift } = fxCells;
        const n = fxCols * fxRows;

        // 1) 아직 붙어 있는 부분은 포스터 캔버스에서 같은 픽셀 격자로 그림 (renderPoster) → 가장자리 선이 남지 않음
        const md = fxMaskData.data;
        for (let i = 0; i < n; i++) md[i * 4 + 3] = t <= t0[i] ? 255 : 0;
        fxMaskCtx.putImageData(fxMaskData, 0, 0);

        // 2) 떨어져 나간 입자: 화면 픽셀 단위로 고운 점을 찍어 오른쪽으로 흩날림
        const bd = fxBufData.data; bd.fill(0);
        const bx0 = ox, by0 = oy - FX.spreadY * 1.2;
        const cs = FX.cell * DPR;
        for (let y = 0, i = 0; y < fxRows; y++) for (let x = 0; x < fxCols; x++, i++) {
            if (t <= t0[i]) continue;
            const lt = (t - t0[i]) / FX.flight;
            if (lt >= 1) continue;
            const e = lt * lt;
            const px = (x * FX.cell + e * vx[i]) * DPR;
            const py = (y * FX.cell + lt * vy[i] * .5 - e * lift[i] + FX.spreadY * 1.2) * DPR;
            const a = (1 - lt) * (1 - lt) * 255;
            const sz = 1;   // 화면 픽셀 1개 크기의 아주 고운 입자
            const X = px | 0, Y = py | 0;
            const ci = i * 4;
            for (let yy = 0; yy < sz; yy++) {
                const row = Y + yy; if (row < 0 || row >= fxBufH) continue;
                for (let xx = 0; xx < sz; xx++) {
                    const colx = X + xx; if (colx < 0 || colx >= fxBufW) continue;
                    const k = (row * fxBufW + colx) * 4;
                    if (bd[k + 3] >= a) continue;
                    bd[k] = col[ci]; bd[k + 1] = col[ci + 1]; bd[k + 2] = col[ci + 2]; bd[k + 3] = a;
                }
            }
        }
        fxBufCtx.putImageData(fxBufData, 0, 0);
        fx.drawImage(fxBuf, bx0, by0, fxBufW / DPR, fxBufH / DPR);
    }

    let lastPosterState = "";
    function renderPoster(time) {
        const state = `${current}:${themeFrom}:${V.reveal}:${themeT}:${ready(posterImages[current])}:${ready(posterImages[themeFrom])}`;
        if (state === lastPosterState) return;
        lastPosterState = state;
        const w = posterCanvas.width, h = posterCanvas.height;
        pCtx.globalAlpha = 1;
        pCtx.clearRect(0, 0, w, h);
        if (themeT >= 1) {
            if (V.reveal > 0) { pCtx.globalAlpha = V.reveal; paintPoster(pCtx, current); pCtx.globalAlpha = 1; }   // 아이콘 → 포스터
            renderFx(themeFrom, 1);
        } else if (switchMode === "fade") {
            paintPoster(pCtx, themeFrom);                                                  // 클릭: 빠른 페이드
            pCtx.globalAlpha = themeT; paintPoster(pCtx, current); pCtx.globalAlpha = 1;
            renderFx(themeFrom, 1);
        } else {
            paintPoster(pCtx, current);                                                    // 새 포스터를 아래에 깔고
            renderFx(themeFrom, themeT);                                                   // 입자 계산 + 마스크 갱신
            if (themeT < 1 && fxMask) {                                                    // 아직 안 부서진 기존 포스터
                psCtx.globalCompositeOperation = "source-over";
                psCtx.clearRect(0, 0, w, h);
                paintPoster(psCtx, themeFrom);
                psCtx.globalCompositeOperation = "destination-in";
                psCtx.imageSmoothingEnabled = false;
                psCtx.drawImage(fxMask, 0, 0, w, h);
                psCtx.globalCompositeOperation = "source-over";
                pCtx.drawImage(pScratch, 0, 0);
            }
        }
    }

    /* =====================================================
       4. 아이콘 / 그래픽 그리기
    ===================================================== */
    /* 흩어진 아이콘이 마우스에 밀리는 효과 — 카운트다운(dday-icon-matter.js)과 같은 힘 계산을 재사용
       - 마우스가 지나간 선분 기준으로 밀어냄, 빠르게 움직일수록 더 넓고 세게
       - 클릭하면 주변 아이콘이 퍼짐 / 시간이 지나면 원래 자리로 천천히 돌아감 */
    // 메인 포스터용으로 조정: 부드럽게 밀리고, 살짝 출렁이며 천천히 제자리로 돌아옴
    const PUSH = { radius: 110, clickRadius: 200, clickForce: 9, strength: .32, decay: .9, home: .006, max: 14 };
    let hasMovingIcons = false;
    let pointerNearHeader = false;
    function syncHeaderVisibility() {
        if (!header) return;
        const hidden = V.text <= 0 && !pointerNearHeader;
        if (header.classList.contains("is-intro-hidden") !== hidden) {
            header.classList.toggle("is-intro-hidden", hidden);
        }
    }
    const pointer = { x: -1000, y: -1000, oldX: -1000, oldY: -1000, vx: 0, vy: 0, active: false, down: false };
    const toStage = e => [e.clientX - stageLeft, e.clientY + window.scrollY - stageTop];
    document.addEventListener("pointermove", e => {
        if (e.pointerType !== "touch") {
            // 경계에서 헤더가 반복해서 나타났다 사라지지 않도록 여유를 둠
            pointerNearHeader = e.clientY <= headerHeight + (pointerNearHeader ? 16 : 0);
            syncHeaderVisibility();
        }
        const [x, y] = toStage(e);
        if (step !== 0 || x < 0 || y < 0 || x > W || y > H) { pointer.active = false; return; }
        if (pointer.active) {
            pointer.oldX = pointer.x; pointer.oldY = pointer.y;
            pointer.vx = clamp(x - pointer.x, -65, 65); pointer.vy = clamp(y - pointer.y, -65, 65);
        } else { pointer.oldX = x; pointer.oldY = y; pointer.vx = pointer.vy = 0; }
        pointer.x = x; pointer.y = y; pointer.active = true;
    }, { passive: true });
    document.addEventListener("pointerdown", e => {
        if (step !== 0) return;
        const [x, y] = toStage(e);
        pointer.down = true;
        for (const ic of iconsNow()) {
            const cx = ic.sx * W + ic.px, cy = ic.sy * H + ic.py;
            let dx = cx - x, dy = cy - y, d = Math.hypot(dx, dy);
            if (d >= PUSH.clickRadius) continue;
            if (d < .1) { dx = Math.cos(ic.phase); dy = Math.sin(ic.phase); d = 1; }
            const f = Math.pow(1 - d / PUSH.clickRadius, 1.3) * PUSH.clickForce;
            ic.pvx += dx / d * f; ic.pvy += dy / d * f;
            ic.awake = true;
            hasMovingIcons = true;
        }
    }, { passive: true });
    window.addEventListener("pointerup", () => { pointer.down = false; }, { passive: true });
    document.addEventListener("pointerleave", () => {
        pointer.active = false;
        pointerNearHeader = false;
        syncHeaderVisibility();
    }, { passive: true });

    function stepPush(dtFrames) {
        const canPush = pointer.active && step === 0;
        if (!canPush && !hasMovingIcons) return;
        hasMovingIcons = false;
        const speed = Math.hypot(pointer.vx, pointer.vy);
        const radius = Math.min(PUSH.radius, W * .2) + Math.min(speed, 30);
        const radiusSquared = radius * radius;
        const dec = Math.pow(PUSH.decay, dtFrames);
        const spinDec = Math.pow(.954, dtFrames);
        const sx = pointer.x - pointer.oldX, sy = pointer.y - pointer.oldY, seg = sx * sx + sy * sy;
        for (const ic of iconsNow()) {
            const cx = ic.sx * W + ic.px, cy = ic.sy * H + ic.py;
            if (canPush) {
                const t = seg ? clamp(((cx - pointer.oldX) * sx + (cy - pointer.oldY) * sy) / seg, 0, 1) : 1;
                let dx = cx - (pointer.oldX + sx * t), dy = cy - (pointer.oldY + sy * t);
                const distanceSquared = dx * dx + dy * dy;
                if (distanceSquared < radiusSquared) {
                    let d = Math.sqrt(distanceSquared);
                    if (d < .1) { dx = Math.cos(ic.phase); dy = Math.sin(ic.phase); d = 1; }
                    const fall = Math.pow(1 - d / radius, 1.5), f = fall * (1.8 + Math.min(speed, 40) * .36 + (pointer.down ? 3 : 0)) * PUSH.strength;
                    ic.pvx += dx / d * f + pointer.vx * fall * .17 * PUSH.strength;
                    ic.pvy += dy / d * f + pointer.vy * fall * .17 * PUSH.strength;
                    ic.spin += (pointer.vx * dy - pointer.vy * dx) * fall * .00004;
                    ic.awake = true;
                }
            }
            if (!ic.awake) continue;
            ic.pvx -= ic.px * PUSH.home; ic.pvy -= ic.py * PUSH.home;     // 원래 자리로
            ic.pvx = clamp(ic.pvx, -PUSH.max, PUSH.max); ic.pvy = clamp(ic.pvy, -PUSH.max, PUSH.max);
            ic.px += ic.pvx * dtFrames; ic.py += ic.pvy * dtFrames;
            ic.pvx *= dec; ic.pvy *= dec;
            ic.spin *= spinDec; ic.angle += ic.spin * dtFrames;
            if (Math.abs(ic.px) + Math.abs(ic.py) < .02 && Math.abs(ic.pvx) + Math.abs(ic.pvy) + Math.abs(ic.spin) < .002) {
                ic.px = ic.py = ic.pvx = ic.pvy = ic.spin = 0;
                ic.awake = false;
            }
            if (ic.awake) hasMovingIcons = true;
        }
        pointer.oldX = pointer.x; pointer.oldY = pointer.y;
        pointer.vx *= .65; pointer.vy *= .65;
    }
    let lastIconTime = 0;
    let lastIconState = "";

    function renderIcons(time) {
        const state = `${current}:${V.fly}:${V.graphic}:${V.dissolve}:${V.move}:${V.reveal}:${ready(atlasNow())}`;
        const moving = V.fly < 1 && !reducedMotion.matches && V.dissolve < 1 && V.reveal < 1;
        if (!moving && state === lastIconState) { lastIconTime = time; return; }
        lastIconState = state;
        ctx.clearRect(0, 0, W, H);
        for (const layer of blurLayers) {
            layer.ctx.clearRect(0, 0, W, H);
            layer.alpha = 1;
        }
        const t = time / 1000;
        const dt = lastIconTime ? Math.min(.05, (time - lastIconTime) / 1000) : 0;
        lastIconTime = time;
        if (dt && !reducedMotion.matches && V.fly < 1) stepPush(dt * 60);
        const motion = reducedMotion.matches ? 0 : 1;
        const move = easeInOut(clamp(V.move));
        const frame = {
            x: lerp(bigFrame.x, smallFrame.x, move),
            y: lerp(bigFrame.y, smallFrame.y, move),
            w: lerp(bigFrame.w, smallFrame.w, move),
            h: lerp(bigFrame.h, smallFrame.h, move)
        };

        // 포스터 자리에 포스터 배경색을 먼저 깔아 뒤의 배경 아이콘이 비치지 않게 함
        if (V.move > 0 && V.reveal <= 0) {
            ctx.globalAlpha = clamp(V.move * 1.4);
            ctx.fillStyle = posters[current].background || (posters[current].theme === "dark" ? "#000" : "#fff");
            ctx.fillRect(frame.x, frame.y, frame.w, frame.h);
            ctx.globalAlpha = 1;
        }

        // 포스터 그래픽 (아이콘 뒤에 먼저 깔림) — 포스터가 완전히 덮으면 생략
        const graphic = currentGraphic();
        if (V.graphic > 0 && V.reveal < 1 && ready(graphic)) {
            ctx.globalAlpha = V.graphic;
            ctx.drawImage(graphic, frame.x, frame.y, frame.w, frame.h);
            ctx.globalAlpha = 1;
        }

        const atlas = atlasNow();
        const [fs, fx0, fy0, fsy0] = fitNow();
        const fsy = fsy0 || fs;
        const gcx = SPRITES.w / 2, gcy = SPRITES.h / 2;
        if (V.dissolve >= 1 || V.reveal >= 1 || !ready(atlas)) return;
        const k = bigFrame.h / SPRITES.h;          // 흩어진 상태의 크기
        const kf = frame.h / SPRITES.h;            // 모인 상태(포스터 자리로 이동 포함)의 크기
        const fade = 1 - V.dissolve;                         // 그래픽이 깔린 뒤 아이콘 전체가 한 번에 사라짐
        const icons = iconsNow();
        const scattered = V.fly === 0;
        const settled = V.fly === 1;
        // 모이는 동안 초점이 돌아오고, 결합이 완성되면 원래 캔버스에 선명하게 그립니다.
        const blur = SETTINGS.iconBlurMax * k * (1 - easeInOut(clamp(V.fly)));
        for (const layer of blurLayers) {
            const radius = blur * layer.strength;
            const filter = radius > .001 ? `blur(${radius.toFixed(3)}px)` : "none";
            if (layer.canvas.style.filter !== filter) layer.canvas.style.filter = filter;
        }
        const hide = 1 - V.reveal;
        let lastAlpha = 1;
        for (let i = 0; i < icons.length; i++) {
            const ic = icons[i];
            const a = scattered ? 0 : settled ? 1 : easeInOut(clamp(V.fly * 1.4 - ic.delay));
            // 포스터에 같은 '결합'이 같은 자리에 있으므로, 아이콘은 포스터가 다 나타날 때까지 그대로 두었다가
            // 완전히 덮인 순간 지움 → 보는 사람에게는 주변 글자·선만 새로 나타나는 것처럼 보임
            const alpha = (ic.whole ? 1 : a) * fade * hide;
            if (alpha <= 0.01) continue;

            const ws = ic.gw * k, hs = ic.gh * k;
            const w = lerp(ws, ic.gw * kf * fs, a), h = lerp(hs, ic.gh * kf * fsy, a);
            const wob = (1 - a) * motion;
            let sx = ic.sx * W + Math.sin(t * ic.speed + ic.phase) * ic.drift * wob - ws / 2;
            let sy = ic.sy * H + Math.cos(t * ic.speed * .8 + ic.phase) * ic.drift * wob - hs / 2;
            sx += ic.px * wob; sy += ic.py * wob;      // 모일수록 밀린 효과는 사라짐
            const tx = frame.x + (gcx + (ic.gx - gcx) * fs + fx0) * kf;
            const ty = frame.y + (gcy + (ic.gy - gcy) * fsy + fy0) * kf;
            const ang = ic.angle * wob;
            const x = lerp(sx, tx, a), y = lerp(sy, ty, a);
            const margin = Math.abs(ang) > .002 ? Math.max(w, h) : 0;
            if (x + w + margin < 0 || y + h + margin < 0 || x - margin > W || y - margin > H) continue;
            // 크기별 연속값으로 두 강도를 섞고, 모일수록 한 레이어로 정리합니다.
            const level = settled ? 0 : ic.blurLevel;
            const lower = Math.floor(level), blend = (level - lower) * (1 - a);
            const passes = blend > 0 ? 2 : 1;
            for (let pass = 0; pass < passes; pass++) {
                const index = lower + pass;
                const layer = index > 0 ? blurLayers[index - 1] : null;
                const drawCtx = layer ? layer.ctx : ctx;
                const opacity = alpha * (pass === 0 ? 1 - blend : blend);
                if (layer) {
                    if (opacity !== layer.alpha) { drawCtx.globalAlpha = opacity; layer.alpha = opacity; }
                } else if (opacity !== lastAlpha) { ctx.globalAlpha = opacity; lastAlpha = opacity; }
                if (Math.abs(ang) > .002) {
                    const dx = x + w / 2, dy = y + h / 2;
                    drawCtx.save(); drawCtx.translate(dx, dy); drawCtx.rotate(ang);
                    drawCtx.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh, -w / 2, -h / 2, w, h);
                    drawCtx.restore();
                } else drawCtx.drawImage(atlas, ic.ax, ic.ay, ic.gw, ic.gh, x, y, w, h);
            }
        }
        ctx.globalAlpha = 1;
        for (const layer of blurLayers) layer.ctx.globalAlpha = 1;
    }

    /* =====================================================
       5. 단계 전환
    ===================================================== */
    let step = 0;           // 현재 목표 단계
    let busy = false;       // 단계 애니메이션 중

    async function goStep(next) {
        next = clamp(next, 0, 2);
        if (next === step || busy) return;
        lockPage();
        busy = true;
        const prev = step;
        step = next;
        stage.dataset.step = String(step);
        stopAuto();

        if (prev === 0 && next === 1) {
            await tween("fly", 1, SETTINGS.fly);
            if (hasGraphic()) {   // 그래픽 이미지가 있는 버전만 이미지로 교체 (흰 버전은 아이콘 그대로)
                await tween("graphic", 1, SETTINGS.graphicIn, { ease: easeOut });
                await tween("dissolve", 1, SETTINGS.dissolve, { ease: easeOut });
            }
        } else if (prev === 1 && next === 0) {
            if (V.dissolve > 0) await tween("dissolve", 0, SETTINGS.dissolve * .7, { ease: t => t });
            if (V.graphic > 0) await tween("graphic", 0, 250);
            await tween("fly", 0, SETTINGS.fly * .85);
        } else if (prev === 1 && next === 2) {
            measure();
            tween("text", 1, 800, { delay: 450, ease: easeOut });
            // 결합이 거의 도착하는 순간(이동의 90%)부터 바로 포스터로 전환 — 텀 없이 이어지게
            // 포스터 이미지가 완전히 준비된 뒤에만 나타나게 (중간에 빈 바탕이 비쳐 깜빡이지 않도록)
            const img = posterImages[current];
            const imgReady = img && img.decode ? img.decode().catch(() => {}) : Promise.resolve();
            const revealDone = Promise.all([imgReady, new Promise(r => setTimeout(r, SETTINGS.move * .9))])
                .then(() => tween("reveal", 1, SETTINGS.reveal, { ease: easeInOut }));
            await tween("move", 1, SETTINGS.move);
            // 포스터 노출과 제스처가 끝날 때까지 잠금을 유지해 다음 영역으로 새지 않게 합니다.
            await revealDone;
            // 배경 아이콘은 포스터가 다 나타난 뒤에
            tween("ambient", 1, 900, { ease: easeOut });
            startAuto();
        } else if (prev === 2 && next === 1) {
            tween("text", 0, 400);
            tween("ambient", 0, 400);
            await tween("reveal", 0, SETTINGS.reveal * .6, { ease: t => t });
            await tween("move", 0, SETTINGS.move * .9);
        }
        busy = false;
        if (step === 2) scheduleUnlock();
    }

    // 스크롤바·링크 등으로 아래로 내려간 경우: 정착 상태로 바로 맞춤
    function jumpToSettled() {
        if (step === 2 && !busy) return;
        busy = false;
        step = 2;
        stage.dataset.step = "2";
        const g = hasGraphic() ? 1 : 0;
        setNow({ fly: 1, graphic: g, dissolve: g, move: 1, reveal: 1, text: 1, ambient: 1 });
        locked = false;
        if (hasLenis()) lenis.start();
        measure();
        startAuto();
    }

    /* ---------- 입력: 휠 / 터치 / 키보드 ---------- */
    const atTop = () => window.scrollY <= 2;
    const wantsHero = dir => atTop() && ((dir > 0 && step < 2) || (dir < 0 && step > 0));
    let gestureLock = false, gestureTimer = 0;

    /* 페이지 스크롤 잠금
       - 포스터 단계(0·1)이거나 단계가 바뀌는 중에는 페이지가 절대 내려가지 않음
       - 포스터 레이아웃(2)에 도착한 뒤 0.6초 동안 관성을 흡수하고 잠금을 풉니다.
         → 계속 휠을 돌려도 대기시간이 연장되지 않습니다. */
    const hasLenis = () => {
        try { return typeof lenis !== "undefined" && lenis && typeof lenis.stop === "function"; }
        catch (e) { return false; }   // Lenis 로드 실패 시
    };
    let locked = false, releaseTimer = 0;
    // 섹션 스크롤은 포스터 연출과 입력 잠금이 모두 끝난 뒤 시작합니다.
    window.MainHeroCanScroll = () => step === 2 && !busy && !locked && !touchUsed;
    function lockPage() {
        clearTimeout(releaseTimer);
        releaseTimer = 0;
        if (!locked) { locked = true; if (hasLenis()) lenis.stop(); }
    }
    function scheduleUnlock() {
        if (releaseTimer || !locked) return;
        releaseTimer = setTimeout(() => {
            releaseTimer = 0;
            if (step !== 2 || busy) return;
            locked = false;
            if (hasLenis()) lenis.start();
        }, 600);
    }

    function handleIntent(dir) {
        // 계속 스크롤하고 있어도 다음 단계로 진행 (결합 → 왼쪽 이동 → 페이지 스크롤)
        if (busy || (gestureLock && dir < 0)) return;
        gestureLock = true;      // 한 번의 스크롤 제스처(관성 포함)에 한 단계만
        goStep(step + dir);
    }

    window.addEventListener("wheel", e => {
        const dir = Math.sign(e.deltaY);
        if (!dir) return;
        const hero = atTop() && (locked || wantsHero(dir));
        if (!hero) return;
        e.preventDefault();
        e.stopImmediatePropagation();   // Lenis 스크롤 막기
        if (!busy && wantsHero(dir) && Math.abs(e.deltaY) > 4) handleIntent(dir);
        clearTimeout(gestureTimer);
        gestureTimer = setTimeout(() => { gestureLock = false; }, 300);
        if (step === 2 && !busy) scheduleUnlock();
    }, { passive: false, capture: true });

    let touchY = null, touchUsed = false;
    window.addEventListener("touchstart", e => { touchY = e.touches[0].clientY; touchUsed = false; }, { passive: true, capture: true });
    window.addEventListener("touchmove", e => {
        if (touchY === null) return;
        const dy = touchY - e.touches[0].clientY;
        const dir = Math.sign(dy);
        const holding = atTop() && (locked || busy || touchUsed);
        if (!dir || (!holding && !wantsHero(dir))) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!touchUsed && Math.abs(dy) > 36) {
            touchUsed = true;
            gestureLock = false;
            handleIntent(dir);
        }
    }, { passive: false, capture: true });
    const endTouch = () => {
        touchY = null; touchUsed = false; gestureLock = false;
        if (step === 2 && !busy) scheduleUnlock();
    };
    window.addEventListener("touchend", endTouch, { passive: true, capture: true });
    window.addEventListener("touchcancel", endTouch, { passive: true, capture: true });

    window.addEventListener("keydown", e => {
        if (e.target.closest?.("input, textarea, [contenteditable]")) return;
        const down = ["ArrowDown", "PageDown", " "].includes(e.key);
        const up = ["ArrowUp", "PageUp"].includes(e.key);
        const dir = down ? 1 : up ? -1 : 0;
        if (!dir || !wantsHero(dir)) return;
        e.preventDefault();
        gestureLock = false;
        handleIntent(dir);
        gestureLock = false;
    }, { capture: true });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40 && step < 2) jumpToSettled();
    }, { passive: true });

    /* =====================================================
       6. 포스터 전환 (기본 ↔ 다크)
    ===================================================== */
    let autoTimer = 0;
    let fxWarmup = 0;
    let wipeStart = 0;

    function syncDownload(index) {
        if (!download) return;
        const p = posters[index];
        if (p.pdf) {
            download.href = p.pdf;
            download.removeAttribute("aria-disabled");
            download.removeAttribute("title");
            download.setAttribute("aria-label", `${p.label || "포스터"} PDF 다운로드`);
        } else {
            download.removeAttribute("href");
            download.setAttribute("aria-disabled", "true");
            download.setAttribute("title", "준비 중입니다");
            download.setAttribute("aria-label", `${p.label || "포스터"} PDF 준비 중`);
        }
    }

    function syncUI(index) {
        indicator?.querySelectorAll("button").forEach((btn, i) => btn.setAttribute("aria-selected", String(i === index)));
        syncDownload(index);
    }

    function goTo(index, mode = "wipe") {
        index = (index + posters.length) % posters.length;
        if (index === current) return;
        switchMode = mode;
        stage.style.setProperty("--theme-color-dur", mode === "fade" ? ".3s" : ".9s");
        themeFrom = current;      // 진행 중이어도 즉시 새 전환 시작
        current = index;
        themeT = 0; bgT = 0;
        wipeStart = performance.now();
        syncUI(index);
    }

    function stepTheme(now) {
        if (themeT >= 1 && bgT >= 1) return;
        const e = now - wipeStart;
        const fast = switchMode === "fade" || reducedMotion.matches;
        const posterDur = fast ? SETTINGS.clickSwitch : SETTINGS.posterWipe;
        const bgDur = fast ? SETTINGS.clickSwitch : SETTINGS.bgWipe;
        themeT = clamp(e / posterDur);
        bgT = clamp((e - (fast ? 0 : SETTINGS.bgDelay)) / bgDur);
        // 글자색은 배경이 절반쯤 지날 때 바뀜
        if (bgT > .45) stage.dataset.theme = posters[current].theme;
    }

    function startAuto() {
        if (autoTimer || document.hidden || step !== 2) return;
        if (!fxCells && !fxWarmup) {
            fxWarmup = setTimeout(() => {
                fxWarmup = 0;
                if (step === 2 && !document.hidden && !fxCells) buildFx();
            }, 1000);
        }
        autoTimer = setInterval(() => goTo(current + 1), SETTINGS.autoInterval);
    }
    function stopAuto() { clearInterval(autoTimer); autoTimer = 0; }
    function restartAuto() { stopAuto(); startAuto(); }

    posterButton.addEventListener("click", () => {
        if (!stage.classList.contains("is-poster-ready")) return;
        goTo(current + 1, "fade");   // 클릭: 입자 효과 없이 빠르게
        restartAuto();
    });
    indicator?.addEventListener("click", event => {
        const btn = event.target.closest("button[data-index]");
        if (!btn || step !== 2) return;
        goTo(Number(btn.dataset.index));   // 아래 바: 자동 전환과 같은 방식
        restartAuto();
    });
    document.addEventListener("visibilitychange", () => document.hidden ? stopAuto() : startAuto());

    /* =====================================================
       Loop
    ===================================================== */
    const cssValues = new Map();
    function setCSS(element, name, value) {
        if (!element || cssValues.get(name) === value) return;
        cssValues.set(name, value);
        element.style.setProperty(name, value);
    }
    function syncCSS(rect) {
        setCSS(stage, "--text-opacity", V.text.toFixed(3));
        setCSS(stage, "--text-events", V.text > .5 ? "auto" : "none");
        setCSS(stage, "--poster-shadow", clamp((V.move - .8) / .2).toFixed(3));
        setCSS(stage, "--hint-opacity", step === 0 && !busy ? "1" : "0");
        setCSS(heroAmbient, "--ambient-opacity", V.ambient.toFixed(3));
        // 결합 아이콘을 포스터 위에 두고, 포스터가 아래에서 완전히 나타난 뒤에 아이콘을 지움
        stage.classList.toggle("icons-front", V.move > 0 && V.reveal < 1);
        const posterReady = step === 2 && !busy && V.reveal >= 1;
        stage.classList.toggle("is-poster-ready", posterReady);
        const tabIndex = posterReady ? 0 : -1;
        if (posterButton.tabIndex !== tabIndex) posterButton.tabIndex = tabIndex;
        syncHeaderVisibility();
        header?.classList.toggle("is-dark", stage.dataset.theme === "dark" && rect.bottom > headerHeight);
    }

    function loop(now) {
        requestAnimationFrame(loop);
        if (document.hidden || document.documentElement.classList.contains("page-transition-active")) {
            lastIconTime = 0;
            return;
        }
        stepTweens(now);
        stepTheme(now);
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) {
            renderBg(now);
            renderIcons(now);
            renderPoster(now);
        }
        syncCSS(rect);
    }

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measure, 120);
    });
    document.fonts?.ready.then(measure);
    window.addEventListener("load", () => {
        measure();
        if (window.scrollY > 40) jumpToSettled();
    });

    measure();
    buildIcons();
    syncUI(0);
    if (window.scrollY <= 2) lockPage();
    requestAnimationFrame(loop);
})();
