/* Committee photos: project_05's icon matrix, in white, from top-right to bottom-left. */
(() => {
    "use strict";

    const vertexSource = `
        attribute vec2 position;
        varying vec2 uv;
        void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
    `;
    const fragmentSource = `
        precision highp float;
        varying vec2 uv;
        uniform sampler2D imageA, imageB, iconAtlas;
        uniform vec2 resolution, sizeA, sizeB, iconGrid;
        uniform float progress, trailFade, codeTime, cellSize, iconCount;
        float random(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float ease(float a, float b, float v) {
            float x = clamp((v - a) / (b - a), 0., 1.);
            return x*x*x*(x*(x*6.-15.)+10.);
        }
        float region(vec2 p) {
            vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
            return mix(mix(random(i), random(i+vec2(1.,0.)), f.x),
                mix(random(i+vec2(0.,1.)), random(i+vec2(1.,1.)), f.x), f.y);
        }
        float fbm(vec2 p) {
            mat2 turn = mat2(.8, -.6, .6, .8);
            float n = region(p)*.57; p = turn*p*2.03;
            n += region(p)*.28; p = turn*p*2.01;
            return n + region(p)*.15;
        }
        vec2 cover(vec2 p, vec2 size) {
            float imageRatio = size.x/size.y, frameRatio = resolution.x/resolution.y;
            vec2 fit = imageRatio > frameRatio ? vec2(frameRatio/imageRatio, 1.) : vec2(1., imageRatio/frameRatio);
            return (p-.5)*fit+.5;
        }
        vec2 iconUV(float id, vec2 local) {
            vec2 tile = vec2(mod(id, iconGrid.x), iconGrid.y-1.-floor(id/iconGrid.x));
            return (tile+local)/iconGrid;
        }
        void main() {
            float q = progress, amplitude = sin(q*3.14159265);
            vec2 domain = vec2(uv.x*resolution.x/resolution.y, uv.y)*3.1;
            float n1 = fbm(domain+vec2(q*.72, -q*.48));
            float n2 = fbm(domain+vec2(8.3, 2.7)+vec2(-q*.52, q*.58));
            // WebGL's top-right is (1, 1): this axis always travels toward (0, 0).
            float axis = (2.-uv.x-uv.y)*.5;
            float wave = (n1-.5)*.24+sin(uv.x*5.5+n2*2.6+q*1.8)*.038;
            float front = mix(-.24, 1.30, q)-axis+wave*amplitude;
            vec2 grid = uv*resolution/vec2(cellSize), cell = floor(grid);
            float seed = random(cell), grain = (region(cell/4.)-.5)*.025;
            float becomeIcons = ease(-.035, .035, front+.12+grain);
            float becomeImage = ease(-.07, .09, front-.18+grain);
            float clock = codeTime*(1.2+seed*.8)+seed*5., step = floor(clock);
            float first = floor(random(cell+vec2(step, step*.37))*iconCount);
            float second = floor(random(cell+vec2(step+1., (step+1.)*.37))*iconCount);
            float ink = mix(texture2D(iconAtlas, iconUV(first, fract(grid))).a,
                texture2D(iconAtlas, iconUV(second, fract(grid))).a, ease(.68, 1., fract(clock)));
            float iconAmount = becomeIcons*(1.-becomeImage);
            float trailLength = .22+random(cell+vec2(17.3, 9.1))*.48;
            float trailDensity = ease(.28, .72, random(cell+vec2(4.7, 23.6)));
            float trail = ease(.10, .24, front)*(1.-ease(.20, .24+trailLength, front));
            float trailAmount = trail*trailDensity*(1.-iconAmount)*(1.-trailFade);
            vec3 outgoing = texture2D(imageA, cover(uv, sizeA)).rgb;
            vec3 incoming = texture2D(imageB, cover(uv, sizeB)).rgb;
            // A translucent white band carries the white glyphs across the photos.
            vec3 photo = mix(outgoing, incoming, ease(-.035, .035, front));
            vec3 bandBackground = mix(photo, vec3(1.), .65);
            vec3 band = mix(bandBackground, vec3(1.), ink);
            vec3 result = mix(photo, band, iconAmount);
            result = mix(result, vec3(1.), ink*trailAmount*.55);
            gl_FragColor = vec4(result, 1.);
        }
    `;

    function create({ container, fragments, duration = 2100 }) {
        const canvas = document.createElement("canvas");
        canvas.className = "committee-icon-transition";
        canvas.setAttribute("aria-hidden", "true");
        canvas.hidden = true;
        container.append(canvas);
        const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
        let gl, program, atlas, uniforms, ready, job, frame = 0, generation = 0;

        function compile(type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const message = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error(message);
            }
            return shader;
        }
        function texture(source) {
            const value = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, value);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            return value;
        }
        async function initialize() {
            gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
            if (!gl) return false;
            const icons = await Promise.all(Object.values(fragments).map(async fragment => {
                const image = new Image();
                image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fragment.viewBox}" width="64" height="64" color="white" fill="white">${fragment.svg}</svg>`)}`;
                try { await image.decode(); return image; } catch { return null; }
            }));
            const loaded = icons.filter(Boolean);
            if (!loaded.length) return false;
            const columns = Math.ceil(Math.sqrt(loaded.length)), rows = Math.ceil(loaded.length/columns);
            const sheet = document.createElement("canvas");
            sheet.width = columns*64; sheet.height = rows*64;
            const context = sheet.getContext("2d");
            loaded.forEach((icon, index) => context.drawImage(icon, (index%columns)*64+3, Math.floor(index/columns)*64+3, 58, 58));
            program = gl.createProgram();
            const vertex = compile(gl.VERTEX_SHADER, vertexSource), fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
            gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
            gl.deleteShader(vertex); gl.deleteShader(fragment);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
            gl.useProgram(program);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
            const position = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
            uniforms = Object.fromEntries(["imageA", "imageB", "iconAtlas", "resolution", "sizeA", "sizeB", "iconGrid", "progress", "trailFade", "codeTime", "cellSize", "iconCount"].map(name => [name, gl.getUniformLocation(program, name)]));
            atlas = texture(sheet);
            gl.uniform1i(uniforms.imageA, 0); gl.uniform1i(uniforms.imageB, 1); gl.uniform1i(uniforms.iconAtlas, 2);
            gl.uniform2f(uniforms.iconGrid, columns, rows); gl.uniform1f(uniforms.iconCount, loaded.length);
            return true;
        }
        function prepare() {
            // The page already has the SVG fragments; the effect needs no extra image requests.
            return ready ||= initialize().catch(() => false);
        }
        function release() {
            cancelAnimationFrame(frame);
            if (job) { gl.deleteTexture(job.from); gl.deleteTexture(job.to); }
            job = null;
        }
        function finish() {
            release();
            canvas.hidden = true;
        }
        function paint(now) {
            if (!job) return;
            const rect = container.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
            const width = Math.max(1, Math.round(rect.width*dpr)), height = Math.max(1, Math.round(rect.height*dpr));
            if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
            gl.viewport(0, 0, width, height);
            gl.useProgram(program);
            [job.from, job.to, atlas].forEach((value, index) => { gl.activeTexture(gl.TEXTURE0+index); gl.bindTexture(gl.TEXTURE_2D, value); });
            const progress = Math.min(1, Math.max(0, (now-job.start)/duration));
            const t = Math.min(1, progress/.82), tail = Math.max(0, (progress-.70)/.30);
            gl.uniform1f(uniforms.progress, t*t*t*(t*(t*6-15)+10));
            gl.uniform1f(uniforms.trailFade, tail*tail*(3-2*tail));
            gl.uniform1f(uniforms.codeTime, (now-job.start)/1000*8);
            gl.uniform1f(uniforms.cellSize, 12*dpr);
            gl.uniform2f(uniforms.resolution, width, height);
            gl.uniform2f(uniforms.sizeA, ...job.sizeA); gl.uniform2f(uniforms.sizeB, ...job.sizeB);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        function tick(now) {
            if (!job) return;
            if (now-job.start >= duration || document.hidden || reducedMotion.matches) { finish(); return; }
            paint(now);
            frame = requestAnimationFrame(tick);
        }
        async function transition(fromImage, toImage, commit) {
            const request = ++generation;
            if (reducedMotion.matches || !fromImage || fromImage === toImage && !job) {
                finish(); commit(); return;
            }
            let available = false;
            try {
                [available] = await Promise.all([prepare(), fromImage.decode(), toImage.decode()]);
            } catch { /* A missing photo or unsupported WebGL must not block the tabs. */ }
            if (request !== generation) return;
            if (!available || reducedMotion.matches || document.hidden || gl.isContextLost()) {
                finish(); commit(); return;
            }
            // On rapid tab changes, start from the visible frame instead of jumping to a photo.
            let source = fromImage;
            if (job) {
                paint(performance.now());
                source = document.createElement("canvas");
                source.width = canvas.width; source.height = canvas.height;
                source.getContext("2d").drawImage(canvas, 0, 0);
            }
            release();
            try {
                job = {
                    from: texture(source), to: texture(toImage), start: performance.now(),
                    sizeA: [source.naturalWidth || source.width, source.naturalHeight || source.height],
                    sizeB: [toImage.naturalWidth, toImage.naturalHeight]
                };
                paint(job.start);
                canvas.hidden = false;
                commit();
                frame = requestAnimationFrame(tick);
            } catch { finish(); commit(); }
        }
        reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) finish(); });
        document.addEventListener("visibilitychange", () => { if (document.hidden) finish(); });
        window.addEventListener("pagehide", () => { generation++; finish(); });
        canvas.addEventListener("webglcontextlost", event => { event.preventDefault(); finish(); });
        canvas.addEventListener("webglcontextrestored", () => { ready = null; });
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !reducedMotion.matches) { void prepare(); observer.disconnect(); }
        }, { rootMargin: "300px" });
        observer.observe(container);
        return { transition, get active() { return Boolean(job); } };
    }
    window.CommitteeIconTransition = Object.freeze({ create });
})();
