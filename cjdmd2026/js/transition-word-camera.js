/* A moving close-up of the existing main hero's assembled, dark-theme artwork.
 * Uses the same poster atlas, source coordinates, stroke boundaries and swim
 * curve as main-hero.js, with a moving camera, deterministic phases and a very
 * visible, bounded sway on the letter strokes in this preview only. */
(() => {
    'use strict';
    const scriptURL = document.currentScript.src;
    window.createTransitionWordCamera = (host, reduced) => {
        const source = window.MAIN_POSTER_SPRITES.dark;
        const atlas = new Image();
        atlas.decoding = 'async';
        atlas.src = new URL(source.atlas, scriptURL).href;
        let canvas = document.createElement('canvas');
        canvas.className = 'word-camera'; host.appendChild(canvas);
        let batch = window.createHeroSpriteBatch?.(canvas), context = null;
        function useCanvasFallback() {
            batch?.dispose(); batch = null;
            const replacement = document.createElement('canvas');
            replacement.className = 'word-camera'; canvas.replaceWith(replacement);
            canvas = replacement; context = canvas.getContext('2d');
        }
        if (!batch) useCanvasFallback();

        const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value));
        const smooth = value => value * value * (3 - 2 * value);
        const segments = [
            [40, [[320,195],[610,195],[610,300],[585,355],[480,390],[320,390]]],
            [42, [[810,190],[810,400]]], [38, [[710,250],[810,250]]], [38, [[710,360],[810,360]]],
            [40, [[330,490],[810,490],[810,590],[330,590],[330,690],[810,690]]],
            [42, [[440,810],[440,835]]], [40, [[310,875],[590,875]]],
            [50, [[795,845],[795,1170]]], [40, [[795,995],[850,995]]],
            [54, [[355,1230],[355,1415]]], [55, [[790,1230],[790,1415]]],
            [42, [[350,1415],[810,1415]]], [40, [[350,1300],[810,1300]]]
        ].flatMap(([radius, points]) => points.slice(1).map(([bx, by], i) => {
            const [ax, ay] = points[i], dx = bx-ax, dy = by-ay;
            return {ax, ay, dx, dy, length: dx*dx+dy*dy, radius};
        }));
        function freedom(cx, cy, size) {
            let distance = Infinity;
            for (const line of segments) {
                const t = clamp(((cx-line.ax)*line.dx+(cy-line.ay)*line.dy)/line.length);
                distance = Math.min(distance, Math.hypot(cx-line.ax-t*line.dx,cy-line.ay-t*line.dy)-line.radius);
            }
            const outer = Math.hypot((cx-460)/165,(cy-1060)/130);
            const inner = Math.hypot((cx-460)/90,(cy-1060)/60);
            const ring = outer > 1 ? (outer-1)*130 : inner < 1 ? (1-inner)*60 : 0;
            return smooth(clamp((Math.min(distance, ring)-size/2)/48));
        }
        const sizes = source.s.map(item => Math.max(item[2], item[3]));
        const largest = Math.max(...sizes), smallest = Math.min(...sizes);
        const pieces = source.s.map(([gx,gy,gw,gh,ax,ay], index) => {
            const size = sizes[index], free = freedom(gx+gw/2,gy+gh/2,size);
            const depth = (size-smallest)/(largest-smallest);
            const seed = (index*.61803398875)%1;
            const drift = free*(1-clamp((size-8)/16))*27*(.6+.4*seed);
            // Keep the letter recognizable while making its individual marks
            // visibly swim: 2.2–3.6 source units, with an 8–13 second cycle.
            // Blend continuously into the existing motion outside the strokes.
            const strokeSway = (2.2+1.4*seed)*(1-free);
            const speed = (.38+(.2+.35*((index*.41421356237)%1))*.72)*(.95+.05*free);
            return {gx,gy,gw,gh,ax,ay,phase:seed*Math.PI*2,speed,
                radius:(2.6+2*depth+drift*.72)*free+strokeSway};
        }).sort((a,b) => Math.max(a.gw,a.gh)-Math.max(b.gw,b.gh));

        // The same source scene, viewed from eight repeatable camera positions.
        const stops = [
            {letter:'합',x:400,y:1050}, {letter:'결',x:540,y:440},
            {letter:'합',x:600,y:1240}, {letter:'결',x:700,y:320},
            {letter:'합',x:650,y:1010}, {letter:'결',x:445,y:590},
            {letter:'합',x:480,y:1180}, {letter:'결',x:665,y:570}
        ];
        let shot = -3, serial = 0, elapsed = 0, swimTime = 0, rate = 1;
        let width = 0, height = 0, ratio = 1, scale = 1, frame = 0, lastTime = null;
        let running = false, loaded = false, bucket = -1, candidates = [];
        let statsTime = -1;
        host.dataset.source = 'main-hero-dark';
        host.dataset.sourceCount = String(pieces.length);
        function camera() {
            const a = stops[shot];
            const t = .5-.5*Math.cos(elapsed/12*Math.PI*2);
            return {
                x: a.x+(shot%2 ? -18 : 18)*t,
                y: a.y+14*t,
                index:shot, segment:shot
            };
        }
        function selectVisible(view) {
            if (bucket === view.segment) return;
            bucket = view.segment;
            const a = stops[view.index];
            const padX = width/scale/2+60, padY = height/scale/2+60;
            const left = a.x-padX, right = a.x+padX;
            const top = a.y-padY, bottom = a.y+padY;
            candidates = pieces.filter(p => p.gx+p.gw>=left && p.gx<=right && p.gy+p.gh>=top && p.gy<=bottom);
        }
        function draw() {
            if (!loaded || !width || !height || shot < 0) return;
            const view = camera(); selectVisible(view);
            if (batch) batch.clear();
            else { context.setTransform(ratio,0,0,ratio,0,0); context.clearRect(0,0,width,height); }
            let visible = 0;
            for (const p of candidates) {
                const motion = reduced.matches ? 0 : p.radius;
                const x = (p.gx+Math.sin(p.phase+swimTime*p.speed)*motion-view.x)*scale+width/2;
                const y = (p.gy+.70*Math.cos(p.phase*1.37+swimTime*p.speed*.81)*motion-view.y)*scale+height/2;
                const w = p.gw*scale, h = p.gh*scale;
                if (x+w<0 || y+h<0 || x>width || y>height) continue;
                if (batch) batch.add(p,x,y,w,h,0,1);
                else context.drawImage(atlas,p.ax,p.ay,p.gw,p.gh,x,y,w,h);
                visible++;
            }
            if (batch && !batch.flush(atlas)) { useCanvasFallback(); resize(); return; }
            // Small diagnostics for preview QA, updated at most four times/second.
            if (Math.floor(elapsed*4) !== statsTime) {
                statsTime = Math.floor(elapsed*4);
                host.dataset.camera = `${view.x.toFixed(1)},${view.y.toFixed(1)}`;
                host.dataset.visibleCount = String(visible);
            }
        }
        function resize() {
            width = host.clientWidth || host.parentElement.clientWidth;
            height = host.clientHeight || host.parentElement.clientHeight;
            // Match the supplied close crop of ㅎ: the camera sees at most
            // 600 source units along either axis, with the rest off screen.
            // Cover framing keeps this close-up on both wide and tall viewports.
            scale = Math.max(width,height)/600;
            ratio = Math.min(devicePixelRatio || 1,1.5,Math.sqrt(1800000/Math.max(1,width*height)));
            if (batch) batch.resize(width,height,ratio);
            else { canvas.width = Math.max(1,Math.round(width*ratio)); canvas.height = Math.max(1,Math.round(height*ratio)); }
            bucket = -1; statsTime = -1; draw();
        }
        function tick(now) {
            frame = 0;
            if (!running || document.hidden || reduced.matches || !loaded) { lastTime = null; return; }
            if (lastTime === null) lastTime = now;
            const delta = now-lastTime;
            if (delta >= 1000/30) {
                const dt = Math.min(delta,100)/1000*rate;
                elapsed += dt; swimTime += dt; lastTime = now; draw();
            }
            frame = requestAnimationFrame(tick);
        }
        function sync() {
            cancelAnimationFrame(frame); frame = 0; lastTime = null;
            if (running && !document.hidden && !reduced.matches && loaded) frame = requestAnimationFrame(tick);
        }
        const ready = atlas.decode().then(() => { loaded = true; resize(); sync(); });
        document.addEventListener('visibilitychange', sync);
        reduced.addEventListener('change', () => { draw(); sync(); });
        return {
            ready, resize,
            startShot() {
                shot = (shot+3)%stops.length; serial++; elapsed = 0; bucket = -1; statsTime = -1;
                host.dataset.shot = String(serial); host.dataset.shotPosition = String(shot+1);
                host.dataset.letter = stops[shot].letter; host.dataset.framing = 'detail-600';
                resize();
            },
            setRunning(value) { running = value; host.dataset.running = String(value); sync(); },
            setRate(value) { rate = value; }
        };
    };
})();
