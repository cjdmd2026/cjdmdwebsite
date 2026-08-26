/**
 * StampEffect
 * =========================================================
 *
 * 기본 사용
 * <div stamp></div>
 *
 * 슬라이드
 * <div stamp stamp-trigger="active"></div>
 *
 * 옵션
 * stamp-trigger="viewport|active|hover|click|manual"
 * stamp-delay="300"
 * stamp-speed="1"
 * stamp-density="1"
 * stamp-repeat
 *
 * =========================================================
 *
 * 자동 성능 최적화
 *
 * 1개 실행:
 * - 기존 효과 그대로
 *
 * 2개 이상 동시 실행:
 * - 도장 개수 약 1/3
 * - 도장 크기 조절
 * - 애니메이션 속도 조절
 * - 이미 실행 중인 Stamp도 자동 최적화
 */

(() => {
    "use strict";


    /* =========================================================
       기본 설정
    ========================================================= */

    const SELECTOR =
        "[stamp], [data-stamp]";

    const SVG_NS =
        "http://www.w3.org/2000/svg";

    const states =
        new WeakMap();

    const runningStamps =
        new Set();

    let uid = 0;



    /* =========================================================
       Performance 설정
    ========================================================= */

    const PERFORMANCE = {

        density:
            1 / 3,

        sizeBoost:
            1,

        playbackRate:
            0.5

    };



    /* =========================================================
       사용할 글자
    ========================================================= */

    const chars = [
        "유",
        "연",
        "한",
        "결",
        "합"
    ];


    const fonts = [

        "'Arial Black', 'Malgun Gothic', sans-serif",

        "Impact, 'Malgun Gothic', sans-serif",

        "Georgia, 'Malgun Gothic', serif",

        "'Trebuchet MS', 'Malgun Gothic', sans-serif",

        "'Courier New', 'Malgun Gothic', monospace",

        "Verdana, 'Malgun Gothic', sans-serif"

    ];



    /* =========================================================
       CSS
    ========================================================= */

    injectStyles();


    function injectStyles() {

        if (
            document.getElementById(
                "stamp-effect-styles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "stamp-effect-styles";


        style.textContent = `

            [stamp]:not(.stamp-effect-ready),
            [data-stamp]:not(.stamp-effect-ready) {

                opacity: 0 !important;

            }


            .stamp-effect-svg-defs {

                position: fixed;

                width: 0;
                height: 0;

                overflow: hidden;

                pointer-events: none;

            }


            .stamp-effect-letter {

                opacity: 0;

                transform-box: fill-box;
                transform-origin: center;

                animation-name:
                    stamp-effect-punch;

                animation-duration:
                    var(--stamp-duration, .4s);

                animation-timing-function:
                    cubic-bezier(.15, 1.9, .3, 1);

                animation-fill-mode:
                    forwards;

                animation-iteration-count:
                    1;

            }


            .stamp-effect-full {

                opacity: 0;

                animation-name:
                    stamp-effect-full-reveal;

                animation-duration:
                    var(--stamp-full-duration, .15s);

                animation-timing-function:
                    ease-in-out;

                animation-fill-mode:
                    forwards;

                animation-iteration-count:
                    1;

            }


            @keyframes stamp-effect-punch {

                0% {

                    opacity: 0;

                    transform:
                        scale(2.4)
                        rotate(
                            var(--stamp-rotate)
                        );

                }


                35% {

                    opacity: 1;

                    transform:
                        scale(.85)
                        rotate(
                            var(--stamp-rotate)
                        );

                }


                55% {

                    transform:
                        scale(1.05)
                        rotate(
                            var(--stamp-rotate)
                        );

                }


                75%,
                100% {

                    opacity: 1;

                    transform:
                        scale(1)
                        rotate(
                            var(--stamp-rotate)
                        );

                }

            }


            @keyframes stamp-effect-full-reveal {

                from {

                    opacity: 0;

                }


                to {

                    opacity: 1;

                }

            }


            @media (
                prefers-reduced-motion:
                reduce
            ) {

                .stamp-effect-letter,
                .stamp-effect-full {

                    animation-duration:
                        .01ms !important;

                    animation-delay:
                        0ms !important;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }



    /* =========================================================
       State
    ========================================================= */

    function createState() {

        return {

            initialized:
                false,

            running:
                false,

            done:
                false,

            performanceMode:
                false,

            svg:
                null,

            timeoutId:
                null,

            endAt:
                0,

            sizeObserver:
                null

        };

    }



    /* =========================================================
       Viewport
       화면 중앙 근처에서 실행
    ========================================================= */

    const viewportObserver =
        new IntersectionObserver(

            entries => {

                for (
                    const entry
                    of entries
                ) {

                    if (
                        !entry.isIntersecting
                    ) {
                        continue;
                    }


                    const el =
                        entry.target;


                    play(el);


                    if (
                        !el.hasAttribute(
                            "stamp-repeat"
                        )
                    ) {

                        viewportObserver
                            .unobserve(el);

                    }

                }

            },

            {

                root:
                    null,

                threshold:
                    0,

                rootMargin:
                    "-40% 0px -40% 0px"

            }

        );



    /* =========================================================
       옵션
    ========================================================= */

    function numberAttr(
        el,
        name,
        fallback,
        min = -Infinity,
        max = Infinity
    ) {

        const raw =
            el.getAttribute(name);


        if (
            raw === null ||
            raw.trim() === ""
        ) {

            return fallback;

        }


        const value =
            Number(raw);


        if (
            !Number.isFinite(value)
        ) {

            return fallback;

        }


        return Math.min(

            max,

            Math.max(
                min,
                value
            )

        );

    }



    function getOptions(el) {

        return {

            trigger:

                (
                    el.getAttribute(
                        "stamp-trigger"
                    )
                    ||
                    "viewport"
                )
                .toLowerCase(),


            delayMs:

                numberAttr(
                    el,
                    "stamp-delay",
                    0,
                    0
                ),


            speed:

                numberAttr(
                    el,
                    "stamp-speed",
                    1,
                    0.15,
                    5
                ),


            density:

                numberAttr(
                    el,
                    "stamp-density",
                    1,
                    0.2,
                    3
                ),


            repeat:

                el.hasAttribute(
                    "stamp-repeat"
                )

        };

    }



    /* =========================================================
       랜덤
    ========================================================= */

    function randChar() {

        return chars[
            Math.floor(
                Math.random()
                *
                chars.length
            )
        ];

    }



    function randFont() {

        return fonts[
            Math.floor(
                Math.random()
                *
                fonts.length
            )
        ];

    }



    /* =========================================================
       SVG 생성
    ========================================================= */

    function svgEl(
        name,
        attrs = {}
    ) {

        const node =
            document.createElementNS(
                SVG_NS,
                name
            );


        for (
            const [key, value]
            of Object.entries(attrs)
        ) {

            node.setAttribute(
                key,
                String(value)
            );

        }


        return node;

    }



    /* =========================================================
       도장 생성
    ========================================================= */

    function buildStamps(
        width,
        height,
        density,
        speed,
        performanceMode = false
    ) {

        const effectiveDensity =
            performanceMode

                ? density
                  *
                  PERFORMANCE.density

                : density;


        const effectiveSpeed =
            performanceMode

                ? speed
                  /
                  PERFORMANCE.playbackRate

                : speed;


        const sizeBoost =
            performanceMode

                ? PERFORMANCE.sizeBoost

                : 1;



        const minSide =
            Math.max(

                1,

                Math.min(
                    width,
                    height
                )

            );


        const minSize =
            Math.max(

                42,

                minSide
                *
                0.16

            )
            *
            sizeBoost;


        const stamps = [];

        let t = 0;



        const coverageScale =
            Math.max(

                0.55,

                Math.min(

                    1.6,

                    (
                        width
                        *
                        height
                    )

                    /

                    (
                        900
                        *
                        675
                    )

                )

            );



        const randomPos =
            () => ({

                x:

                    -0.06
                    *
                    width

                    +

                    Math.random()
                    *
                    (
                        width
                        *
                        1.12
                    ),


                y:

                    -0.06
                    *
                    height

                    +

                    Math.random()
                    *
                    (
                        height
                        *
                        1.12
                    )

            });



        const count =
            base =>

                Math.max(

                    1,

                    Math.round(

                        base
                        *
                        effectiveDensity
                        *
                        Math.sqrt(
                            coverageScale
                        )

                    )

                );



        const canvas =
            document.createElement(
                "canvas"
            );


        const maxCanvasWidth =
            performanceMode
                ? 500
                : 900;


        const scale =
            Math.min(

                1,

                maxCanvasWidth

                /

                Math.max(
                    width,
                    1
                )

            );


        canvas.width =
            Math.max(

                1,

                Math.round(
                    width
                    *
                    scale
                )

            );


        canvas.height =
            Math.max(

                1,

                Math.round(
                    height
                    *
                    scale
                )

            );


        const ctx =
            canvas.getContext(
                "2d"
            );


        ctx.fillStyle =
            "black";


        ctx.fillRect(

            0,
            0,

            canvas.width,
            canvas.height

        );



        function drawCoverage(
            stamp
        ) {

            ctx.save();


            ctx.translate(

                stamp.x
                *
                scale,

                stamp.y
                *
                scale

            );


            ctx.rotate(

                stamp.rot
                *
                Math.PI
                /
                180

            );


            ctx.font =

                `bold ${
                    stamp.size
                    *
                    scale
                }px ${
                    stamp.font
                }`;


            ctx.fillStyle =
                "#fff";


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.fillText(

                stamp.char,

                0,
                0

            );


            ctx.restore();

        }



        function place(
            x,
            y,
            size,
            step
        ) {

            const stamp = {

                x,

                y,


                size:

                    Math.max(

                        size
                        *
                        sizeBoost,

                        minSize

                    ),


                rot:

                    Math.random()
                    *
                    50
                    -
                    25,


                char:

                    randChar(),


                font:

                    randFont(),


                delay:

                    t

            };


            stamps.push(
                stamp
            );


            drawCoverage(
                stamp
            );


            t +=
                step
                *
                effectiveSpeed;

        }



        /* 큰 도장 */

        for (
            let i = 0;
            i < count(24);
            i++
        ) {

            const p =
                randomPos();


            place(

                p.x,

                p.y,


                minSide

                *
                (
                    0.52
                    +
                    Math.random()
                    *
                    0.34
                ),


                0.014

            );

        }


        t +=
            0.035
            *
            effectiveSpeed;



        /* 중간 도장 */

        for (
            let i = 0;
            i < count(58);
            i++
        ) {

            const p =
                randomPos();


            place(

                p.x,

                p.y,


                minSide

                *
                (
                    0.28
                    +
                    Math.random()
                    *
                    0.28
                ),


                0.007

            );

        }


        t +=
            0.03
            *
            effectiveSpeed;



        /* 작은 도장 */

        for (
            let i = 0;
            i < count(82);
            i++
        ) {

            const p =
                randomPos();


            place(

                p.x,

                p.y,


                minSide

                *
                (
                    0.17
                    +
                    Math.random()
                    *
                    0.18
                ),


                0.0045

            );

        }


        t +=
            0.03
            *
            effectiveSpeed;



        /* =====================================================
           빈 공간 채우기
        ===================================================== */

        function scanAndFill(
            stepRatio,
            sizeMinRatio,
            sizeMaxRatio,
            delayStep
        ) {

            const step =
                Math.max(

                    18,

                    minSide
                    *
                    stepRatio

                );


            const image =
                ctx.getImageData(

                    0,
                    0,

                    canvas.width,
                    canvas.height

                );


            const data =
                image.data;


            const canvasStep =
                Math.max(

                    1,

                    step
                    *
                    scale

                );



            for (
                let gy =
                    canvasStep / 2;

                gy < canvas.height;

                gy += canvasStep
            ) {


                for (
                    let gx =
                        canvasStep / 2;

                    gx < canvas.width;

                    gx += canvasStep
                ) {


                    const ix =
                        Math.min(

                            canvas.width - 1,

                            Math.floor(gx)

                        );


                    const iy =
                        Math.min(

                            canvas.height - 1,

                            Math.floor(gy)

                        );


                    const idx =
                        (
                            iy
                            *
                            canvas.width
                            +
                            ix
                        )
                        *
                        4;


                    const brightness =
                        data[idx];


                    if (
                        brightness >= 40
                    ) {

                        continue;

                    }



                    const jitterX =

                        (
                            Math.random()
                            *
                            canvasStep
                            *
                            0.5

                            -

                            canvasStep
                            *
                            0.25
                        )

                        /

                        scale;



                    const jitterY =

                        (
                            Math.random()
                            *
                            canvasStep
                            *
                            0.5

                            -

                            canvasStep
                            *
                            0.25
                        )

                        /

                        scale;



                    const x =

                        gx
                        /
                        scale

                        +

                        jitterX;



                    const y =

                        gy
                        /
                        scale

                        +

                        jitterY;



                    const size =

                        minSide

                        *

                        (
                            sizeMinRatio

                            +

                            Math.random()

                            *

                            (
                                sizeMaxRatio

                                -

                                sizeMinRatio
                            )
                        );



                    place(

                        x,

                        y,

                        size,

                        delayStep

                    );

                }

            }

        }



        if (
            !performanceMode
        ) {

            scanAndFill(

                0.18,

                0.27,

                0.40,

                0.0055
                *
                effectiveDensity

            );


            scanAndFill(

                0.10,

                0.20,

                0.32,

                0.0038
                *
                effectiveDensity

            );


            scanAndFill(

                0.06,

                0.16,

                0.25,

                0.0028
                *
                effectiveDensity

            );

        }


        else {

            scanAndFill(

                0.22,

                0.36,

                0.52,

                0.004
                *
                effectiveDensity

            );

        }



        return {

            stamps,

            endTime:
                t,

            effectiveSpeed

        };

    }



    /* =========================================================
       종료 처리
    ========================================================= */

    function finishStamp(
        el,
        state
    ) {

        cleanupMask(
            el,
            state,
            true
        );


        state.done =
            true;


        state.performanceMode =
            false;


        state.endAt =
            0;


        el.dispatchEvent(

            new CustomEvent(

                "stampcomplete",

                {

                    bubbles:
                        true,

                    detail: {

                        element:
                            el

                    }

                }

            )

        );

    }



    /* =========================================================
       마스크 제거
    ========================================================= */

    function cleanupMask(
        el,
        state,
        reveal = true
    ) {

        if (
            state.timeoutId
        ) {

            clearTimeout(
                state.timeoutId
            );


            state.timeoutId =
                null;

        }



        if (
            reveal
        ) {

            el.style.removeProperty(
                "-webkit-mask-image"
            );

            el.style.removeProperty(
                "mask-image"
            );


            el.style.removeProperty(
                "-webkit-mask-repeat"
            );

            el.style.removeProperty(
                "mask-repeat"
            );


            el.style.removeProperty(
                "-webkit-mask-size"
            );

            el.style.removeProperty(
                "mask-size"
            );


            el.style.removeProperty(
                "-webkit-mask-position"
            );

            el.style.removeProperty(
                "mask-position"
            );

        }



        if (
            state.svg
            &&
            state.svg.isConnected
        ) {

            state.svg.remove();

        }


        state.svg =
            null;


        state.running =
            false;


        runningStamps.delete(
            el
        );

    }



    /* =========================================================
       실행 중 Stamp 최적화
    ========================================================= */

    function optimizeRunningStamp(el) {

        const state =
            states.get(el);


        if (
            !state
            ||
            !state.running
            ||
            state.performanceMode
            ||
            !state.svg
        ) {

            return;

        }


        state.performanceMode =
            true;


        const letters =
            Array.from(

                state.svg
                    .querySelectorAll(
                        ".stamp-effect-letter"
                    )

            );


        letters.forEach(
            (
                letter,
                index
            ) => {


                if (
                    index % 3 !== 0
                ) {

                    letter.remove();

                    return;

                }



                const currentSize =
                    Number(

                        letter.getAttribute(
                            "font-size"
                        )

                    );


                if (
                    Number.isFinite(
                        currentSize
                    )
                ) {

                    letter.setAttribute(

                        "font-size",

                        Math.round(

                            currentSize
                            *
                            PERFORMANCE.sizeBoost

                        )

                    );

                }

            }
        );



        const animations =
            state.svg.getAnimations();


        animations.forEach(
            animation => {

                animation.playbackRate =
                    PERFORMANCE.playbackRate;

            }
        );



        if (
            state.endAt > 0
        ) {

            const now =
                performance.now();


            const remaining =
                Math.max(

                    0,

                    state.endAt
                    -
                    now

                );


            if (
                state.timeoutId
            ) {

                clearTimeout(
                    state.timeoutId
                );

            }


            const optimizedRemaining =

                remaining

                /

                PERFORMANCE.playbackRate;


            state.endAt =

                now

                +

                optimizedRemaining;


            state.timeoutId =
                window.setTimeout(

                    () => {

                        finishStamp(
                            el,
                            state
                        );

                    },

                    optimizedRemaining

                );

        }

    }



    function checkPerformanceMode() {

        if (
            runningStamps.size < 2
        ) {

            return;

        }


        runningStamps.forEach(
            el => {

                optimizeRunningStamp(
                    el
                );

            }
        );

    }



    /* =========================================================
       Play
    ========================================================= */

    function play(
        el,
        force = false
    ) {

        if (
            !(el instanceof Element)
        ) {

            return;

        }



        const options =
            getOptions(el);



        let state =
            states.get(el);


        if (
            !state
        ) {

            state =
                createState();


            states.set(
                el,
                state
            );

        }



        if (
            state.running
        ) {

            return;

        }



        if (
            state.done
            &&
            !options.repeat
            &&
            !force
        ) {

            return;

        }



        el.classList.remove(
            "stamp-effect-ready"
        );


        cleanupMask(
            el,
            state,
            true
        );



        const rect =
            el.getBoundingClientRect();


        if (
            rect.width < 1
            ||
            rect.height < 1
        ) {


            if (
                !state.sizeObserver
                &&
                "ResizeObserver"
                in window
            ) {


                state.sizeObserver =
                    new ResizeObserver(
                        () => {


                            const nextRect =
                                el.getBoundingClientRect();


                            if (
                                nextRect.width < 1
                                ||
                                nextRect.height < 1
                            ) {

                                return;

                            }


                            state
                                .sizeObserver
                                .disconnect();


                            state.sizeObserver =
                                null;


                            play(
                                el,
                                force
                            );

                        }
                    );


                state
                    .sizeObserver
                    .observe(
                        el
                    );

            }


            return;

        }



        const width =
            rect.width;


        const height =
            rect.height;



        const performanceMode =
            runningStamps.size >= 1;



        state.running =
            true;


        state.done =
            false;


        state.performanceMode =
            performanceMode;



        runningStamps.add(
            el
        );



        const id =
            `stamp-mask-${++uid}`;


        const svg =
            svgEl(

                "svg",

                {

                    class:
                        "stamp-effect-svg-defs",

                    width:
                        0,

                    height:
                        0,

                    "aria-hidden":
                        "true",

                    focusable:
                        "false"

                }

            );


        const defs =
            svgEl(
                "defs"
            );


        const mask =
            svgEl(

                "mask",

                {

                    id,

                    x:
                        0,

                    y:
                        0,

                    width,

                    height,

                    maskUnits:
                        "userSpaceOnUse",

                    maskContentUnits:
                        "userSpaceOnUse"

                }

            );


        mask.style.maskType =
            "luminance";



        const black =
            svgEl(

                "rect",

                {

                    x:
                        0,

                    y:
                        0,

                    width,

                    height,

                    fill:
                        "black"

                }

            );


        mask.appendChild(
            black
        );



        const {

            stamps,

            endTime,

            effectiveSpeed

        } =
            buildStamps(

                width,

                height,

                options.density,

                options.speed,

                performanceMode

            );



        /* =====================================================
           전체 시퀀스 시간
        ========================================================= */

        const extraSequenceTime =

            performanceMode

                ? 0.5

                : 1.0;



        const sequenceDuration =
            endTime
            +
            extraSequenceTime;



        /* =====================================================
           초반 느리게 → 후반 빠르게
           
           1에 가까울수록 균일
           0.7 = 약한 가속
           0.55 = 추천
           0.4 = 후반에 매우 강하게 몰림
        ========================================================= */

        const STAMP_ACCELERATION =
            0.55;



        function getAcceleratedDelay(
            originalDelay
        ) {

            if (
                endTime <= 0
            ) {

                return 0;

            }


            const progress =
                Math.min(

                    1,

                    Math.max(

                        0,

                        originalDelay
                        /
                        endTime

                    )

                );


            /*
             * progress가 진행될수록
             * 간격이 점점 촘촘해짐
             */

            const acceleratedProgress =
                Math.pow(

                    progress,

                    STAMP_ACCELERATION

                );


            return (

                acceleratedProgress

                *

                sequenceDuration

            );

        }



        const letterDuration =

            0.4

            *

            effectiveSpeed;



        /* =====================================================
           글자 생성
        ========================================================= */

        for (
            const s
            of stamps
        ) {


            const text =
                svgEl(

                    "text",

                    {

                        x:
                            s.x.toFixed(1),

                        y:
                            s.y.toFixed(1),

                        "text-anchor":
                            "middle",

                        "dominant-baseline":
                            "middle",

                        "font-family":
                            s.font,

                        "font-weight":
                            "bold",

                        "font-size":
                            Math.round(
                                s.size
                            ),

                        fill:
                            "white",

                        class:
                            "stamp-effect-letter"

                    }

                );



            text.style.setProperty(

                "--stamp-rotate",

                `${s.rot.toFixed(1)}deg`

            );


            text.style.setProperty(

                "--stamp-duration",

                `${letterDuration}s`

            );



            /*
             * 가속 곡선 적용
             */

            const acceleratedDelay =
                getAcceleratedDelay(
                    s.delay
                );


            text.style.animationDelay =

                `${
                    (
                        options.delayMs
                        /
                        1000

                        +

                        acceleratedDelay
                    )
                    .toFixed(3)
                }s`;


            text.textContent =
                s.char;


            mask.appendChild(
                text
            );

        }



        /* =====================================================
           마지막 Reveal
        ========================================================= */

        const secondLastStamp =
            stamps[

                Math.max(

                    0,

                    stamps.length
                    -
                    2

                )

            ];



        /*
         * Reveal도 같은 가속 곡선 기준
         */

        const fullRevealDelay =

            options.delayMs
            /
            1000

            +

            (

                secondLastStamp

                    ?

                    getAcceleratedDelay(
                        secondLastStamp.delay
                    )

                    :

                    sequenceDuration

            );



        const fullDuration =
            Math.max(

                0.08,

                letterDuration
                -
                0.25

            );



        const full =
            svgEl(

                "rect",

                {

                    x:
                        0,

                    y:
                        0,

                    width,

                    height,

                    fill:
                        "white",

                    class:
                        "stamp-effect-full"

                }

            );


        full.style.setProperty(

            "--stamp-full-duration",

            `${fullDuration}s`

        );


        full.style.animationDelay =
            `${fullRevealDelay.toFixed(3)}s`;


        mask.appendChild(
            full
        );



        defs.appendChild(
            mask
        );


        svg.appendChild(
            defs
        );


        document.body.appendChild(
            svg
        );


        state.svg =
            svg;



        /* =====================================================
           실제 요소에 Mask 적용
        ========================================================= */

        el.style.setProperty(

            "-webkit-mask-image",

            `url(#${id})`

        );


        el.style.setProperty(

            "mask-image",

            `url(#${id})`

        );


        el.style.setProperty(

            "-webkit-mask-repeat",

            "no-repeat"

        );


        el.style.setProperty(

            "mask-repeat",

            "no-repeat"

        );


        el.style.setProperty(

            "-webkit-mask-size",

            "100% 100%"

        );


        el.style.setProperty(

            "mask-size",

            "100% 100%"

        );


        el.style.setProperty(

            "-webkit-mask-position",

            "center"

        );


        el.style.setProperty(

            "mask-position",

            "center"

        );



        /*
         * 마스크가 준비된 뒤 표시
         */

        requestAnimationFrame(
            () => {

                el.classList.add(
                    "stamp-effect-ready"
                );

            }
        );



        /* =====================================================
           종료
        ========================================================= */

        const totalMs =

            (

                fullRevealDelay

                +

                fullDuration

                +

                0.05

            )

            *

            1000;



        state.endAt =

            performance.now()

            +

            totalMs;



        state.timeoutId =
            window.setTimeout(

                () => {

                    finishStamp(
                        el,
                        state
                    );

                },

                totalMs

            );



        checkPerformanceMode();

    }



    /* =========================================================
       Reset
    ========================================================= */

    function reset(el) {

        const state =
            states.get(el);


        if (
            !state
        ) {

            return;

        }



        cleanupMask(

            el,

            state,

            true

        );


        el.classList.remove(
            "stamp-effect-ready"
        );


        if (
            state.sizeObserver
        ) {

            state
                .sizeObserver
                .disconnect();


            state.sizeObserver =
                null;

        }


        state.done =
            false;


        state.performanceMode =
            false;


        state.endAt =
            0;

    }



    /* =========================================================
       초기화
    ========================================================= */

    function initElement(el) {

        if (
            !(el instanceof Element)
        ) {

            return;

        }


        let state =
            states.get(el);


        if (
            !state
        ) {

            state =
                createState();


            states.set(
                el,
                state
            );

        }



        if (
            state.initialized
        ) {

            return;

        }


        state.initialized =
            true;



        const trigger =
            getOptions(
                el
            ).trigger;



        if (
            trigger ===
            "hover"
        ) {

            el.addEventListener(

                "pointerenter",

                () => play(el)

            );

        }



        else if (
            trigger ===
            "click"
        ) {

            el.addEventListener(

                "click",

                () => play(el)

            );

        }



        else if (
            trigger ===
            "manual"
        ) {

            // StampEffect.play(element)

        }



        else if (
            trigger ===
            "active"
        ) {


            if (
                el.classList.contains(
                    "is-active"
                )
            ) {

                requestAnimationFrame(
                    () => {

                        play(el);

                    }
                );

            }

        }



        else {

            viewportObserver.observe(
                el
            );

        }

    }



    function init(
        root = document
    ) {


        if (

            root instanceof Element

            &&

            root.matches(
                SELECTOR
            )

        ) {

            initElement(
                root
            );

        }



        root
            .querySelectorAll?.(
                SELECTOR
            )
            .forEach(
                initElement
            );

    }



    /* =========================================================
       DOM 변화 감지
    ========================================================= */

    const observer =
        new MutationObserver(

            records => {


                for (
                    const record
                    of records
                ) {


                    if (
                        record.type ===
                        "childList"
                    ) {


                        for (
                            const node
                            of record.addedNodes
                        ) {


                            if (
                                node.nodeType
                                !==
                                1
                            ) {

                                continue;

                            }


                            init(node);

                        }


                        continue;

                    }



                    if (

                        record.type
                        ===
                        "attributes"

                        &&

                        record.attributeName
                        ===
                        "class"

                    ) {


                        const el =
                            record.target;



                        if (

                            el.matches?.(
                                SELECTOR
                            )

                            &&

                            getOptions(
                                el
                            ).trigger
                            ===
                            "active"

                            &&

                            el.classList.contains(
                                "is-active"
                            )

                        ) {

                            play(el);

                        }

                    }

                }

            }

        );



    /* =========================================================
       Boot
    ========================================================= */

    function boot() {

        init(
            document
        );


        observer.observe(

            document.documentElement,

            {

                childList:
                    true,

                subtree:
                    true,

                attributes:
                    true,

                attributeFilter:
                    ["class"]

            }

        );

    }



    /* =========================================================
       외부 API
    ========================================================= */

    window.StampEffect = {

        init,

        play,

        reset,

        getRunningCount() {

            return runningStamps.size;

        }

    };



    /* =========================================================
       실행
    ========================================================= */

    if (
        document.readyState
        ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            boot,

            {

                once:
                    true

            }

        );

    }


    else {

        boot();

    }

})();