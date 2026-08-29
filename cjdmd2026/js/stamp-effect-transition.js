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
 * stamp-sound
 * stamp-sound-volume="0.7"
 *
 * =========================================================
 *
 * viewport 동작
 *
 * 화면 중앙 근처 진입
 * → Stamp 실행
 *
 * 화면에서 완전히 벗어남
 * → 자동 Reset
 *
 * 다시 중앙 근처 진입
 * → Stamp 다시 실행
 *
 * =========================================================
 *
 * 자동 성능 최적화
 *
 * 1개 실행
 * → 기존 효과
 *
 * 2개 이상 동시 실행
 * → 도장 개수 약 1/3
 * → Performance 설정 적용
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

        // 동시 실행 시 글자 개수
        density:
            1 / 3,

        // 동시 실행 시 글자 크기
        sizeBoost:
            1,

        // 현재 설정값
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
       Stamp Sound

       핵심:
       - 소리는 "별도 리듬"으로 재생하지 않음
       - 실제 Stamp가 찍히는 정확한 animationDelay를 사용
       - 너무 많은 소리가 겹치지 않도록 최대 재생 횟수 제한
       - 첫 유 / 연 / 한 / 결 / 합은 항상 실제 Stamp와 함께 재생
    ========================================================= */

    const STAMP_SOUND_FILES = [
        "stamp01.wav",
        "stamp02.wav",
        "stamp03.wav",
        "stamp04.wav",
        "stamp05.wav",
        "stamp06.wav"
    ];


    const STAMP_SOUND_CONFIG = {

        /*
         * 유 / 연 / 한 / 결 / 합 볼륨
         */
        introVolume:
            0.72,


        /*
         * 이후 일반 Stamp 볼륨
         */
        hitVolume:
            0.40,


        /*
         * 한 번의 Stamp Effect에서
         * 재생할 수 있는 최대 소리 횟수.
         *
         * 첫 5회(유연한결합)도 이 숫자에 포함.
         */
        maxSounds:
            42,


        /*
         * 소리와 소리 사이 최소 간격.
         *
         * 시각 효과에는 영향을 주지 않고
         * 오디오가 지나치게 겹치는 것만 방지.
         */
        minGapMs:
            36,


        /*
         * 오디오 체감 지연 보정
         *
         * -30 = Stamp 화면 타이밍보다
         * 사운드 예약을 30ms 먼저 걸어
         * 실제로 들리는 타이밍을 맞춤
         */
        syncOffsetMs:
            -40,


        /*
         * 전체 Stamp 진행도의 이 지점부터
         * 소리가 점점 작아지기 시작.
         *
         * 0.70 = 마지막 30% 구간에서 Fade Out
         */
        fadeStartProgress:
            0.40,


        /*
         * 마지막 Stamp 근처에서 남길 볼륨 비율
         *
         * 0.18 = 기본 hitVolume의 18%
         */
        fadeEndVolumeRatio:
            0,


        /*
         * 후반 리버브 시작 지점
         *
         * 0.55 = 전체 진행도의 55%부터
         * 부드러운 작은 방 공간감이 서서히 증가
         */
        reverbStartProgress:
            0.10,


        /*
         * 마지막 구간에서 Wet 신호의 최대 비율
         */
        reverbEndWetRatio:
            0.56,


        /*
         * 가까운 벽의 작은 방처럼 짧고 부드럽게 남는 잔향 시간
         */
        reverbDuration:
            0.82,


        /*
         * 잔향 감쇠 곡선
         * 값이 클수록 초반은 선명하고 뒤가 길게 남음
         */
        reverbDecay:
            5.2,


        /*
         * 작은 방의 가까운 벽 반사 느낌.
         * 원음 직후 아주 짧은 초기 반사가 들리도록 함.
         */
        roomPreDelayMs:
            7,


        /*
         * 리버브의 고역을 부드럽게 깎아
         * 커튼 / 가구가 있는 따뜻한 방처럼 만듦.
         */
        roomLowpassHz:
            3200,


        /*
         * 초기 반사 강도.
         * 너무 높이면 욕실처럼 딱딱하게 들릴 수 있음.
         */
        roomEarlyReflection:
            0.34,


        /*
         * 같은 소리가 빠르게 겹칠 수 있도록
         * 파일 하나당 Audio Voice 여러 개 준비.
         */
        voicesPerSound:
            4

    };


    /*
     * 이 JS 파일의 위치:
     * /js/stamp-effect-transition.js
     *
     * 사운드 위치:
     * /assets/sounds/stamp01.wav
     * ...
     * /assets/sounds/stamp06.wav
     */
    const stampScriptURL =
        document.currentScript
            ?
            document.currentScript.src
            :
            "";


    function resolveStampSoundURL(
        fileName
    ) {

        if (
            stampScriptURL
        ) {

            try {

                return new URL(
                    `../assets/sounds/${fileName}`,
                    stampScriptURL
                ).href;

            }

            catch (error) {
                // fallback 사용
            }

        }


        return `/assets/sounds/${fileName}`;

    }


    const stampSoundURLs =
        STAMP_SOUND_FILES.map(
            resolveStampSoundURL
        );


    /* =========================================================
       Web Audio Reverb Engine

       - 별도 리버브 음원 파일 없이 브라우저에서 Impulse Response 생성
       - 후반으로 갈수록 Wet 신호를 키워 가까운 벽의 따뜻한 방 공간감 형성
       - AudioContext는 실제 재생 시점에만 생성/재개
    ========================================================= */

    let stampAudioContext =
        null;

    let stampReverbNode =
        null;


    let stampReverbLowpass =
        null;


    let stampReverbPreDelay =
        null;


    function getStampAudioContext() {

        if (
            stampAudioContext
        ) {

            if (
                stampAudioContext.state ===
                "suspended"
            ) {

                stampAudioContext
                    .resume()
                    .catch(
                        () => {}
                    );

            }

            return stampAudioContext;

        }


        const AudioContextClass =
            window.AudioContext
            ||
            window.webkitAudioContext;


        if (
            !AudioContextClass
        ) {
            return null;
        }


        stampAudioContext =
            new AudioContextClass();


        const length =
            Math.max(
                1,
                Math.floor(
                    stampAudioContext.sampleRate
                    *
                    STAMP_SOUND_CONFIG
                        .reverbDuration
                )
            );


        const impulse =
            stampAudioContext
                .createBuffer(
                    2,
                    length,
                    stampAudioContext.sampleRate
                );


        /*
         * 따뜻한 작은 방 Impulse Response
         *
         * - 길이는 짧게
         * - 초반 반사는 또렷하지만 강하지 않게
         * - 뒤쪽 잔향은 빠르게 사라지게
         */
        const earlyReflectionTimes =
            [
                0.012,
                0.024,
                0.041,
                0.063
            ];


        for (
            let channel = 0;
            channel < impulse.numberOfChannels;
            channel++
        ) {

            const data =
                impulse.getChannelData(
                    channel
                );


            for (
                let i = 0;
                i < length;
                i++
            ) {

                const progress =
                    i
                    /
                    length;


                const decay =
                    Math.pow(
                        1 - progress,
                        STAMP_SOUND_CONFIG
                            .reverbDecay
                    );


                /*
                 * 작은 방은 넓은 홀보다
                 * 잔향 밀도와 폭을 줄여 더 가까운 느낌으로 만듦.
                 */
                const random =
                    Math.random()
                    *
                    2
                    -
                    1;


                data[i] =
                    random
                    *
                    decay
                    *
                    0.34;

            }


            /*
             * 가까운 벽에서 튕겨오는 초기 반사.
             * 좌/우 타이밍을 아주 조금 다르게 만들어
             * 자연스러운 실내 폭만 남김.
             */
            earlyReflectionTimes
                .forEach(
                    (
                        time,
                        index
                    ) => {

                        const channelOffset =
                            channel === 0
                                ?
                                0
                                :
                                0.0025;


                        const sampleIndex =
                            Math.min(
                                length - 1,
                                Math.floor(
                                    (
                                        time
                                        +
                                        channelOffset
                                    )
                                    *
                                    stampAudioContext
                                        .sampleRate
                                )
                            );


                        const reflectionGain =
                            STAMP_SOUND_CONFIG
                                .roomEarlyReflection
                            *
                            Math.pow(
                                0.72,
                                index
                            );


                        data[sampleIndex] +=
                            reflectionGain;

                    }
                );

        }


        stampReverbNode =
            stampAudioContext
                .createConvolver();


        stampReverbNode.buffer =
            impulse;


        stampReverbNode.normalize =
            true;


        /*
         * 아주 짧은 Pre-delay:
         * 원음 직후 벽에 부딪혀 돌아오는 느낌.
         */
        stampReverbPreDelay =
            stampAudioContext
                .createDelay(
                    0.1
                );


        stampReverbPreDelay.delayTime.value =
            STAMP_SOUND_CONFIG
                .roomPreDelayMs
            /
            1000;


        /*
         * 따뜻한 룸 톤:
         * 리버브의 고역을 줄여 딱딱한 욕실 느낌을 피함.
         */
        stampReverbLowpass =
            stampAudioContext
                .createBiquadFilter();


        stampReverbLowpass.type =
            "lowpass";


        stampReverbLowpass.frequency.value =
            STAMP_SOUND_CONFIG
                .roomLowpassHz;


        stampReverbLowpass.Q.value =
            0.55;


        stampReverbNode.connect(
            stampReverbPreDelay
        );


        stampReverbPreDelay.connect(
            stampReverbLowpass
        );


        stampReverbLowpass.connect(
            stampAudioContext.destination
        );


        return stampAudioContext;

    }



    /*
     * Audio 요소마다 Web Audio Source는
     * 한 번만 생성할 수 있으므로 WeakMap으로 보관
     */
    const stampVoiceGraphs =
        new WeakMap();


    function getStampVoiceGraph(
        audio
    ) {

        const existing =
            stampVoiceGraphs.get(
                audio
            );


        if (
            existing
        ) {
            return existing;
        }


        const context =
            getStampAudioContext();


        if (
            !context
            ||
            !stampReverbNode
        ) {
            return null;
        }


        let source;


        try {

            source =
                context.createMediaElementSource(
                    audio
                );

        }

        catch (error) {

            return null;

        }


        const dryGain =
            context.createGain();


        const wetGain =
            context.createGain();


        source.connect(
            dryGain
        );


        source.connect(
            wetGain
        );


        dryGain.connect(
            context.destination
        );


        wetGain.connect(
            stampReverbNode
        );


        const graph = {
            source,
            dryGain,
            wetGain
        };


        stampVoiceGraphs.set(
            audio,
            graph
        );


        return graph;

    }



    /* =========================================================
       Audio Pool
    ========================================================= */

    const stampSoundPools =
        stampSoundURLs.map(
            src => {

                return Array.from(

                    {
                        length:
                            STAMP_SOUND_CONFIG
                                .voicesPerSound
                    },

                    () => {

                        const audio =
                            new Audio(src);


                        audio.preload =
                            "auto";


                        return audio;

                    }

                );

            }
        );


    const stampSoundVoiceIndexes =
        new Array(
            STAMP_SOUND_FILES.length
        ).fill(0);


    let lastStampSoundIndex =
        -1;


    let stampAudioWarned =
        false;



    /* =========================================================
       실제 Stamp Sound 재생
    ========================================================= */

    function playStampSound(
        dryVolume = 1,
        wetVolume = 0
    ) {

        if (
            STAMP_SOUND_FILES.length === 0
        ) {
            return;
        }


        let soundIndex;


        /*
         * 같은 파일이 바로 두 번 연속 선택되는 것만 방지.
         * 실제 Stamp 타이밍 자체는 전혀 변경하지 않음.
         */
        do {

            soundIndex =
                Math.floor(
                    Math.random()
                    *
                    STAMP_SOUND_FILES.length
                );

        }
        while (
            STAMP_SOUND_FILES.length > 1
            &&
            soundIndex ===
            lastStampSoundIndex
        );


        lastStampSoundIndex =
            soundIndex;


        const pool =
            stampSoundPools[
                soundIndex
            ];


        const voiceIndex =
            stampSoundVoiceIndexes[
                soundIndex
            ];


        const audio =
            pool[
                voiceIndex
            ];


        stampSoundVoiceIndexes[
            soundIndex
        ] =
            (
                voiceIndex
                +
                1
            )
            %
            pool.length;


        /*
         * 아주 미세한 볼륨 편차만 적용.
         * 타이밍에는 영향을 주지 않음.
         */
        const variation =
            0.92
            +
            Math.random()
            *
            0.12;


        /*
         * Web Audio Graph이 사용 가능하면
         * 원음(Dry)과 잔향(Wet)을 분리해서 제어.
         *
         * 지원되지 않는 환경에서는
         * 기존 HTMLAudio volume 방식으로 fallback.
         */
        const graph =
            getStampVoiceGraph(
                audio
            );


        if (
            graph
        ) {

            const now =
                stampAudioContext
                    .currentTime;


            graph.dryGain.gain
                .setValueAtTime(
                    Math.min(
                        1,
                        Math.max(
                            0,
                            dryVolume
                            *
                            variation
                        )
                    ),
                    now
                );


            graph.wetGain.gain
                .setValueAtTime(
                    Math.min(
                        1.2,
                        Math.max(
                            0,
                            wetVolume
                            *
                            variation
                        )
                    ),
                    now
                );


            /*
             * MediaElement 자체 볼륨은 1로 두고
             * GainNode에서 실제 볼륨을 제어
             */
            audio.volume =
                1;

        }

        else {

            audio.volume =
                Math.min(
                    1,
                    Math.max(
                        0,
                        dryVolume
                        *
                        variation
                    )
                );

        }


        try {

            audio.pause();
            audio.currentTime = 0;

        }

        catch (error) {
            // 무시
        }


        const promise =
            audio.play();


        if (
            promise
            &&
            typeof promise.catch ===
            "function"
        ) {

            promise.catch(
                error => {

                    if (
                        !stampAudioWarned
                    ) {

                        stampAudioWarned =
                            true;


                        console.warn(
                            "[StampEffect] Stamp 사운드를 재생하지 못했습니다. 경로 또는 브라우저 자동재생 정책을 확인해주세요.",
                            error
                        );

                    }

                }
            );

        }

    }



    /* =========================================================
       Sound Timer 정리
    ========================================================= */

    function clearStampSoundTimers(
        state
    ) {

        if (
            !state
            ||
            !Array.isArray(
                state.soundTimeoutIds
            )
        ) {
            return;
        }


        state.soundTimeoutIds
            .forEach(
                id => {

                    window.clearTimeout(
                        id
                    );

                }
            );


        state.soundTimeoutIds =
            [];

    }



    /* =========================================================
       실제 Stamp 시점에 Sound 예약
    ========================================================= */

    function scheduleStampSound(
        state,
        delayMs,
        dryVolume,
        wetVolume = 0
    ) {

        const timeoutId =
            window.setTimeout(

                () => {

                    const index =
                        state.soundTimeoutIds
                            .indexOf(
                                timeoutId
                            );


                    if (
                        index >= 0
                    ) {

                        state.soundTimeoutIds
                            .splice(
                                index,
                                1
                            );

                    }


                    playStampSound(
                        dryVolume,
                        wetVolume
                    );

                },

                Math.max(
                    0,
                    delayMs
                )

            );


        state.soundTimeoutIds
            .push(
                timeoutId
            );

    }



    /* =========================================================
       Stamp와 1:1로 연결된 Sound Sequence

       별도의 사운드 리듬을 만들지 않고,
       선택된 "실제 Stamp"의 animationDelay를 그대로 사용.

       단,
       Stamp 수가 수백 개이므로 모든 Stamp에서 소리를 내지 않고
       maxSounds / minGapMs 한도로 제한.
    ========================================================= */

    function scheduleStampSoundSequence({

        state,
        stamps,
        options,
        getDelay

    }) {

        if (
            !options.sound
            ||
            !Array.isArray(stamps)
            ||
            stamps.length === 0
        ) {
            return;
        }


        clearStampSoundTimers(
            state
        );


        const masterVolume =
            options.soundVolume;


        const introCount =
            Math.min(
                5,
                stamps.length
            );


        let scheduledCount =
            0;


        let lastSoundTime =
            -Infinity;



        /* ---------------------------------------------------------
           1. 유 → 연 → 한 → 결 → 합
           실제 첫 5개 Stamp에 정확하게 연결
        --------------------------------------------------------- */

        for (
            let i = 0;
            i < introCount;
            i++
        ) {

            if (
                scheduledCount
                >=
                STAMP_SOUND_CONFIG
                    .maxSounds
            ) {
                break;
            }


            const stamp =
                stamps[i];


            const soundTime =

                options.delayMs

                +

                getDelay(
                    stamp.delay
                )
                *
                1000

                +

                STAMP_SOUND_CONFIG
                    .syncOffsetMs;


            scheduleStampSound(

                state,

                soundTime,

                STAMP_SOUND_CONFIG
                    .introVolume
                *
                masterVolume,

                0

            );


            scheduledCount++;

            lastSoundTime =
                soundTime;

        }



        /* ---------------------------------------------------------
           2. 나머지 Stamp

           전체 Stamp 구간에 골고루 분산시키기 위해
           자동으로 몇 개의 Stamp마다 소리를 낼지 계산.

           소리가 나는 순간은 무조건 실제 Stamp가 찍히는 순간.
        --------------------------------------------------------- */

        const remainingSoundLimit =
            Math.max(
                0,
                STAMP_SOUND_CONFIG
                    .maxSounds
                -
                scheduledCount
            );


        if (
            remainingSoundLimit <= 0
            ||
            stamps.length <= introCount
        ) {
            return;
        }


        const remainingStampCount =
            stamps.length
            -
            introCount;


        /*
         * Stamp가 많을수록 자동으로 더 띄엄띄엄 선택.
         *
         * 예:
         * 남은 Stamp 180개 / 소리 23개
         * → 대략 8개 Stamp마다 한 번.
         */
        const stampStep =
            Math.max(
                1,
                Math.ceil(
                    remainingStampCount
                    /
                    remainingSoundLimit
                )
            );


        for (
            let i = introCount;
            i < stamps.length;
            i += stampStep
        ) {

            if (
                scheduledCount
                >=
                STAMP_SOUND_CONFIG
                    .maxSounds
            ) {
                break;
            }


            const stamp =
                stamps[i];


            const soundTime =

                options.delayMs

                +

                getDelay(
                    stamp.delay
                )
                *
                1000

                +

                STAMP_SOUND_CONFIG
                    .syncOffsetMs;


            /*
             * 선택된 Stamp들이 너무 가까운 경우에는
             * 오디오만 생략.
             *
             * 시각 Stamp에는 아무 영향 없음.
             */
            if (
                soundTime
                -
                lastSoundTime
                <
                STAMP_SOUND_CONFIG
                    .minGapMs
            ) {

                continue;

            }


            /*
             * 후반으로 갈수록 소리가 자연스럽게 작아짐.
             *
             * fadeStartProgress 이전에는 100%,
             * 마지막에는 fadeEndVolumeRatio까지 감소.
             */
            const stampProgress =
                stamps.length > 1
                    ?
                    i
                    /
                    (stamps.length - 1)
                    :
                    1;


            let fadeVolumeRatio =
                1;


            if (
                stampProgress
                >
                STAMP_SOUND_CONFIG
                    .fadeStartProgress
            ) {

                const fadeProgress =
                    Math.min(
                        1,
                        (
                            stampProgress
                            -
                            STAMP_SOUND_CONFIG
                                .fadeStartProgress
                        )
                        /
                        (
                            1
                            -
                            STAMP_SOUND_CONFIG
                                .fadeStartProgress
                        )
                    );


                /*
                 * 부드럽게 감쇠하도록 Smoothstep 적용
                 */
                const smoothFade =
                    fadeProgress
                    *
                    fadeProgress
                    *
                    (
                        3
                        -
                        2
                        *
                        fadeProgress
                    );


                fadeVolumeRatio =
                    1
                    +
                    (
                        STAMP_SOUND_CONFIG
                            .fadeEndVolumeRatio
                        -
                        1
                    )
                    *
                    smoothFade;

            }


            /*
             * 후반으로 갈수록:
             * - Dry는 fadeVolumeRatio에 따라 작아지고
             * - Wet 리버브는 점점 강해져 마지막에 잔향이 남음
             */
            let reverbProgress =
                0;


            if (
                stampProgress
                >
                STAMP_SOUND_CONFIG
                    .reverbStartProgress
            ) {

                reverbProgress =
                    Math.min(
                        1,
                        (
                            stampProgress
                            -
                            STAMP_SOUND_CONFIG
                                .reverbStartProgress
                        )
                        /
                        (
                            1
                            -
                            STAMP_SOUND_CONFIG
                                .reverbStartProgress
                        )
                    );

            }


            /*
             * 리버브도 갑자기 커지지 않도록 Smoothstep
             */
            const smoothReverb =
                reverbProgress
                *
                reverbProgress
                *
                (
                    3
                    -
                    2
                    *
                    reverbProgress
                );


            const dryVolume =
                STAMP_SOUND_CONFIG
                    .hitVolume
                *
                fadeVolumeRatio
                *
                masterVolume;


            const wetVolume =
                STAMP_SOUND_CONFIG
                    .hitVolume
                *
                STAMP_SOUND_CONFIG
                    .reverbEndWetRatio
                *
                smoothReverb
                *
                masterVolume;


            scheduleStampSound(

                state,

                soundTime,

                dryVolume,

                wetVolume

            );


            scheduledCount++;

            lastSoundTime =
                soundTime;

        }

    }




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

            /*
             * Stamp 요소는
             * 애니메이션 준비 전까지 숨김
             */

            [stamp]:not([stamp-invert]):not(.stamp-effect-ready),
            [data-stamp]:not([stamp-invert]):not(.stamp-effect-ready) {
                opacity: 0 !important;
            }

            [stamp][stamp-invert]:not(.stamp-effect-ready),
            [data-stamp][stamp-invert]:not(.stamp-effect-ready) {
                opacity: 1 !important;
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
                null,


            /*
             * Stamp Sound 예약 Timer
             */
            soundTimeoutIds:
                []

        };

    }



    /* =========================================================
       화면 중앙 진입 감지

       화면 전체가 아니라
       중앙 약 20% 영역에 들어왔을 때 실행
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


                    const state =
                        states.get(el);



                    /*
                     * 이미 애니메이션 실행 중이면
                     * 다시 실행하지 않음
                     */

                    if (
                        state &&
                        state.running
                    ) {

                        continue;

                    }



                    /*
                     * 화면 중앙에 들어오면 실행
                     */

                    play(el);

                }

            },

            {

                root:
                    null,

                threshold:
                    0,


                /*
                 * 화면 위 40%
                 * 화면 아래 40%
                 *
                 * 제외
                 *
                 * 중앙 20% 영역에서 실행
                 */

                rootMargin:
                    "-40% 0px -40% 0px"

            }

        );



    /* =========================================================
       화면 완전 이탈 감지

       중요:
       중앙 20%에서 나갔다고 Reset하는 게 아니라
       실제 브라우저 화면에서 완전히 사라졌을 때 Reset
    ========================================================= */

    const viewportExitObserver =
        new IntersectionObserver(

            entries => {

                for (
                    const entry
                    of entries
                ) {

                    const el =
                        entry.target;



                    /*
                     * 기본 viewport Stamp만 적용
                     *
                     * active / hover / click에는
                     * 영향을 주지 않음
                     */

                    if (
                        getOptions(el).trigger
                        !==
                        "viewport"
                    ) {

                        continue;

                    }



                    /*
                     * 아직 화면에 조금이라도
                     * 보이고 있으면 유지
                     */

                    if (
                        entry.isIntersecting
                    ) {

                        continue;

                    }



                    const state =
                        states.get(el);


                    if (
                        !state
                    ) {

                        continue;

                    }



                    /*
                     * 화면에서 완전히 사라짐
                     *
                     * → 처음 상태로 되돌림
                     */

                    reset(el);

                }

            },

            {

                root:
                    null,

                threshold:
                    0,

                rootMargin:
                    "0px"

            }

        );



    /* =========================================================
       숫자 Attribute
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



    /* =========================================================
       옵션
    ========================================================= */

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
                ),


            /*
             * Stamp Sound 사용 여부
             */
            sound:

                el.hasAttribute(
                    "stamp-sound"
                ),


            /*
             * 전체 Stamp Sound 볼륨
             */
            soundVolume:

                numberAttr(
                    el,
                    "stamp-sound-volume",
                    1,
                    0,
                    1
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
       SVG 요소
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

                ?

                density
                *
                PERFORMANCE.density

                :

                density;



        const effectiveSpeed =

            performanceMode

                ?

                speed
                /
                PERFORMANCE.playbackRate

                :

                speed;



        const sizeBoost =

            performanceMode

                ?

                PERFORMANCE.sizeBoost

                :

                1;



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



        /* =====================================================
           화면 크기에 따른 밀도
        ========================================================= */

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



        /* =====================================================
           랜덤 위치
        ========================================================= */

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



        /* =====================================================
           도장 개수
        ========================================================= */

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



        /* =====================================================
           빈 공간 감지 Canvas
        ========================================================= */

        const canvas =
            document.createElement(
                "canvas"
            );



        const maxCanvasWidth =

            performanceMode

                ?

                500

                :

                900;



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
                "2d",
                {
                    willReadFrequently:
                        true
                }
            );



        ctx.fillStyle =
            "black";


        ctx.fillRect(

            0,
            0,

            canvas.width,
            canvas.height

        );



        /* =====================================================
           Canvas Coverage
        ========================================================= */

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



        /* =====================================================
           Stamp 추가
        ========================================================= */

        function place(
            x,
            y,
            size,
            step,
            charOverride = null,
            rotationRange = 25
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
                    (
                        rotationRange
                        *
                        2
                    )
                    -
                    rotationRange,


                char:

                    charOverride
                    ??
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



        /* =====================================================
           시작 도장

           유 → 연 → 한 → 결 → 합

           첫 글자는 화면 정중앙,
           나머지 글자도 중앙 주변의 작은 범위에서 등장.
           이후부터 기존 랜덤 도장이 이어짐.
        ========================================================= */

        const introChars = [
            "유",
            "연",
            "한",
            "결",
            "합"
        ];


        const centerX =
            width
            *
            0.5;


        const centerY =
            height
            *
            0.5;


        /*
         * 중앙에서 너무 멀리 퍼지지 않도록
         * 요소의 짧은 변을 기준으로 작은 반경 사용
         */
        const introSpread =
            minSide
            *
            0.075;


        /*
         * 시작 다섯 글자를
         * 화면 중앙을 기준으로 왼쪽 → 오른쪽으로 배치
         *
         * 유  연  한  결  합
         */
        const introLetterGap =
            minSide
            *
            0.11;


        const introStartX =
            centerX
            -
            introLetterGap
            *
            2;


        const introPositions = [

            /* 유 */
            {
                x: introStartX,
                y: centerY
            },

            /* 연 */
            {
                x: introStartX
                    +
                    introLetterGap,
                y: centerY
            },

            /* 한 : 정중앙 */
            {
                x: centerX,
                y: centerY
            },

            /* 결 */
            {
                x: centerX
                    +
                    introLetterGap,
                y: centerY
            },

            /* 합 */
            {
                x: centerX
                    +
                    introLetterGap
                    *
                    2,
                y: centerY
            }

        ];


        introChars.forEach(
            (
                char,
                index
            ) => {

                const p =
                    introPositions[index];


                /*
                 * 첫 다섯 글자는 기존 랜덤 도장보다
                 * 조금 느긋하게 찍히고,
                 * 회전도 작게 제한해서 글자가 잘 읽히게 함.
                 */
                place(

                    p.x,

                    p.y,

                    minSide
                    *
                    (
                        0.16
                        +
                        index
                        *
                        0.012
                    ),

                    0.045,

                    char,

                    8

                );

            }
        );


        /*
         * 고정 시작 시퀀스가 끝난 뒤
         * 랜덤 도장이 바로 이어지지 않도록 아주 짧은 여백
         */
        t +=
            0.018
            *
            effectiveSpeed;



        /* =====================================================
           큰 도장
        ========================================================= */

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



        /* =====================================================
           중간 도장
        ========================================================= */

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



        /* =====================================================
           작은 도장
        ========================================================= */

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
        ========================================================= */

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

                            Math.floor(
                                gx
                            )

                        );



                    const iy =
                        Math.min(

                            canvas.height - 1,

                            Math.floor(
                                gy
                            )

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



        /* =====================================================
           일반 모드
        ========================================================= */

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



        /* =====================================================
           성능 모드
        ========================================================= */

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
       완료
    ========================================================= */

    function finishStamp(
        el,
        state
    ) {

        if (
            el.hasAttribute(
                "stamp-invert"
            )
        ) {

            el.style.opacity =
                "0";

        }


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

        /*
         * Stamp가 취소 / Reset / 완료되면
         * 남아있는 Sound 예약도 모두 취소
         */
        clearStampSoundTimers(
            state
        );


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
            state.svg &&
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

    function optimizeRunningStamp(
        el
    ) {

        const state =
            states.get(el);


        if (
            !state ||
            !state.running ||
            state.performanceMode ||
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



        /*
         * 3개 중 1개만 유지
         */

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



        /* =====================================================
           실행 중 Animation 속도 변경
        ========================================================= */

        const animations =
            state.svg.getAnimations();


        animations.forEach(
            animation => {

                animation.playbackRate =
                    PERFORMANCE.playbackRate;

            }
        );



        /* =====================================================
           종료 Timer 보정
        ========================================================= */

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



    /* =========================================================
       동시 2개 이상 체크
    ========================================================= */

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


        const invert =
            el.hasAttribute(
                "stamp-invert"
            );


        if (
            invert
        ) {
            el.style.removeProperty(
                "opacity"
            );
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



        /*
         * 이미 실행 중
         */

        if (
            state.running
        ) {

            return;

        }



        /*
         * 완료 상태
         *
         * 화면 밖으로 나가면 reset()에서
         * done = false가 되기 때문에
         * 재진입 시 다시 실행 가능
         */

        if (
            state.done &&
            !options.repeat &&
            !force
        ) {

            return;

        }



        /*
         * 다시 시작할 때
         * 기본 숨김 상태
         */

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



        /* =====================================================
           크기 없는 상태
        ========================================================= */

        if (
            rect.width < 1 ||
            rect.height < 1
        ) {


            if (
                !state.sizeObserver &&
                "ResizeObserver" in window
            ) {


                state.sizeObserver =
                    new ResizeObserver(
                        () => {


                            const nextRect =
                                el.getBoundingClientRect();


                            if (
                                nextRect.width < 1 ||
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



        /* =====================================================
           성능 모드 판정
        ========================================================= */

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



        /* =====================================================
           SVG
        ========================================================= */

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
                        invert
                            ?
                            "white"
                            :
                            "black"

                }

            );


        mask.appendChild(
            black
        );



        /* =====================================================
           도장 생성
        ========================================================= */

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
           전체 Sequence 시간
        ========================================================= */

        const extraSequenceTime =

            performanceMode

                ?

                0.5

                :

                1.0;



        const sequenceDuration =

            endTime

            +

            extraSequenceTime;



        /* =====================================================
           처음 천천히
           마지막 빠르게
        ========================================================= */

        /*
         * 값이 작을수록
         * 초반은 더 여유 있게 찍히고
         * 후반으로 갈수록 간격이 빠르게 좁아짐
         */
        const STAMP_ACCELERATION =
            0.42;


        /*
         * 도장 크기 진행 설정
         *
         * 초반: 작은 글자
         * 후반: 큰 글자
         */
        const STAMP_START_SIZE_RATIO =
            0.10;

        const STAMP_END_SIZE_RATIO =
            0.68;

        /*
         * 1보다 크면 초반의 작은 크기가 조금 더 오래 유지되고
         * 후반으로 갈수록 크기가 빠르게 커짐
         */
        const STAMP_SIZE_GROWTH =
            1.25;



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



        /* =====================================================
           Stamp Sound

           화면의 Stamp와 동일한 getAcceleratedDelay()를 사용.
           즉, 선택된 실제 Stamp가 찍히는 순간에만 소리가 재생됨.
        ========================================================= */

        scheduleStampSoundSequence({

            state,

            stamps,

            options,

            getDelay:
                getAcceleratedDelay

        });



        const letterDuration =

            0.4

            *

            effectiveSpeed;



        /*
         * 진행도에 따라 실제 도장 글자 크기 계산
         *
         * 시작할 때는 작고,
         * 끝으로 갈수록 큰 글자가 찍힘
         */
        const stampMinSide =
            Math.max(
                1,
                Math.min(
                    width,
                    height
                )
            );


        function getProgressiveStampSize(
            stamp
        ) {

            const progress =

                endTime > 0

                    ?

                    Math.min(
                        1,
                        Math.max(
                            0,
                            stamp.delay / endTime
                        )
                    )

                    :

                    1;


            const sizeProgress =
                Math.pow(
                    progress,
                    STAMP_SIZE_GROWTH
                );


            const startSize =
                Math.max(
                    26,
                    stampMinSide
                    *
                    STAMP_START_SIZE_RATIO
                );


            const endSize =
                Math.max(
                    startSize,
                    stampMinSide
                    *
                    STAMP_END_SIZE_RATIO
                );


            /*
             * 기존 랜덤 크기값을 아주 조금만 반영해서
             * 모든 글자가 똑같은 크기로 보이지 않게 함
             */
            const originalSizeRatio =
                Math.min(
                    1,
                    Math.max(
                        0,
                        stamp.size
                        /
                        stampMinSide
                    )
                );


            const variation =
                0.90
                +
                originalSizeRatio
                *
                0.18;


            return (

                startSize

                +

                (
                    endSize
                    -
                    startSize
                )

                *
                sizeProgress

            )

            *
            variation;

        }



        /* =====================================================
           도장 글자 생성
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
                                getProgressiveStampSize(
                                    s
                                )
                            ),

                        fill:
                            invert
                                ?
                                "black"
                                :
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
                        invert
                            ?
                            "black"
                            :
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



        /* =====================================================
           SVG DOM 연결
        ========================================================= */

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



        /* =====================================================
           마스크 준비 후 요소 표시
        ========================================================= */

        requestAnimationFrame(
            () => {

                el.classList.add(
                    "stamp-effect-ready"
                );

            }
        );



        /* =====================================================
           종료 시간
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



        /* =====================================================
           동시 실행 최적화
        ========================================================= */

        checkPerformanceMode();

    }



    /* =========================================================
       Reset

       화면 밖으로 완전히 나갔을 때도
       여기로 들어옴
    ========================================================= */

    function reset(el) {

        if (
            el instanceof Element
            &&
            el.hasAttribute(
                "stamp-invert"
            )
        ) {

            el.style.removeProperty(
                "opacity"
            );

        }


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



        /*
         * 다시 숨김
         */

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



        /*
         * 재실행 가능하도록 초기화
         */

        state.done =
            false;


        state.performanceMode =
            false;


        state.endAt =
            0;

    }



    /* =========================================================
       요소 초기화
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



        /* =====================================================
           Hover
        ========================================================= */

        if (
            trigger ===
            "hover"
        ) {

            el.addEventListener(

                "pointerenter",

                () => play(el)

            );

        }



        /* =====================================================
           Click
        ========================================================= */

        else if (
            trigger ===
            "click"
        ) {

            el.addEventListener(

                "click",

                () => play(el)

            );

        }



        /* =====================================================
           Manual
        ========================================================= */

        else if (
            trigger ===
            "manual"
        ) {

            // StampEffect.play(element)

        }



        /* =====================================================
           Active
        ========================================================= */

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



        /* =====================================================
           기본 = Viewport

           두 Observer에 동시에 등록

           1. 중앙 진입
           2. 화면 완전 이탈
        ========================================================= */

        else {

            viewportObserver.observe(
                el
            );


            viewportExitObserver.observe(
                el
            );

        }

    }



    /* =========================================================
       Init
    ========================================================= */

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


                    /* =================================================
                       새 Stamp 요소
                    ================================================= */

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



                    /* =================================================
                       is-active 변화
                    ================================================= */

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

