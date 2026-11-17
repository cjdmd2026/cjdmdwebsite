/* The desktop main-hero.js poster compositor and particle equations, reused on mobile.
   Automatic: 720 ms left-to-right particle wipe. Tap: 280 ms crossfade. */
(() => {
    'use strict';
    const timing = Object.freeze({autoInterval: 5500, posterWipe: 720, clickSwitch: 280, move: 1250, reveal: 380});
    const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function create({posterCanvas, fxCanvas, posters, posterImages}) {
        const fx = fxCanvas.getContext('2d');
        const ready = image => image && image.complete && image.naturalWidth > 0;
        const rand = (a, b) => a + Math.random() * (b - a);
        let W = 1, H = 1, DPR = 1, posterW = 1, posterH = 1, smallFrame = {x: 0, y: 0};
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


        function draw({from = 0, to = 0, progress = 1, mode = 'wipe', reveal = 1}) {
            const themeFrom = from, current = to, themeT = progress, switchMode = mode, V = {reveal};
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


        return {
            draw,
            prepare: buildFx,
            resize({width, height, ratio, surfaceWidth, surfaceHeight, x, y}) {
                posterW = width; posterH = height; DPR = ratio;
                W = surfaceWidth; H = surfaceHeight; smallFrame = {x, y};
                posterWipe.resize(width, height, ratio);
                fxCanvas.width = Math.round(W * DPR); fxCanvas.height = Math.round(H * DPR);
                fx.setTransform(DPR, 0, 0, DPR, 0, 0);
                fxCells = null; fxDirty = false; fxColors.clear();
            }
        };
    }
    window.MainPosterWipe = {timing, easeInOut, create};
})();
