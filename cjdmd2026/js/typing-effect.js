(() => {
    "use strict";

    const SELECTOR = '[typing-effect]';

    const THRESHOLD = 0.2;

    const CHARS =
        'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅓㅗㅜㅡㅣㆍ·+×÷/\\[]{}<>';


    /*
     * 요소별 실행 상태 저장
     */
    const states =
        new WeakMap();



    /* =========================
       초기 숨김 스타일
    ========================= */

    const style =
        document.createElement('style');


    style.textContent = `

        /*
         * 화면 진입 전
         *
         * visibility:hidden은
         * display:none과 달리
         * 원래 공간은 그대로 유지함
         */
        [typing-effect] {
            visibility: hidden;
        }


        /*
         * 실행 중
         */
        [typing-effect].typing-effect-active {
            visibility: visible;
        }


        /*
         * 완료
         */
        [typing-effect].typing-effect-done {
            visibility: visible;
        }

    `;


    document.head.appendChild(
        style
    );



    /* =========================
       랜덤 글자
    ========================= */

    function randomChar() {

        return CHARS[
            Math.floor(
                Math.random() *
                CHARS.length
            )
        ];

    }



    /* =========================
       Text Node 가져오기
    ========================= */

    function getTextNodes(el) {

        const nodes =
            [];


        const walker =
            document.createTreeWalker(
                el,
                NodeFilter.SHOW_TEXT
            );


        let node;


        while (
            (node = walker.nextNode())
        ) {

            nodes.push({
                node,
                original:
                    node.textContent
            });

        }


        return nodes;

    }



    /* =========================
       실제 글자 수 계산
       공백 제외
    ========================= */

    function getCharacterCount(
        nodes
    ) {

        let count =
            0;


        nodes.forEach(
            item => {

                for (
                    const char
                    of item.original
                ) {

                    if (
                        !/\s/.test(char)
                    ) {

                        count++;

                    }

                }

            }
        );


        return count;

    }



    /* =========================
       원문 복구
    ========================= */

    function restoreOriginal(
        nodes
    ) {

        if (!nodes) {
            return;
        }


        nodes.forEach(
            item => {

                item.node.textContent =
                    item.original;

            }
        );

    }



    /* =========================
       높이 고정
    ========================= */

    function lockHeight(
        el,
        state
    ) {

        /*
         * 애니메이션 실행 전
         * 최종 문장의 실제 높이 측정
         */
        const height =
            el.getBoundingClientRect()
                .height;


        /*
         * 기존 inline style 기억
         */
        state.previousMinHeight =
            el.style.minHeight;

        state.previousMaxHeight =
            el.style.maxHeight;

        state.previousOverflow =
            el.style.overflow;


        /*
         * 실행 중 높이 완전 고정
         *
         * 랜덤 특수문자의 폭 때문에
         * 줄바꿈이 달라져도
         * 아래 콘텐츠가 움직이지 않음
         */
        if (height > 0) {

            el.style.minHeight =
                `${height}px`;

            el.style.maxHeight =
                `${height}px`;

            el.style.overflow =
                'hidden';

        }

    }



    /* =========================
       높이 고정 해제
    ========================= */

    function unlockHeight(
        el,
        state
    ) {

        el.style.minHeight =
            state.previousMinHeight ||
            '';

        el.style.maxHeight =
            state.previousMaxHeight ||
            '';

        el.style.overflow =
            state.previousOverflow ||
            '';

    }



    /* =========================
       처음 랜덤 글자 상태 생성
    ========================= */

    function makeRandomState(
        nodes
    ) {

        nodes.forEach(
            item => {

                let output =
                    '';


                for (
                    const char
                    of item.original
                ) {

                    /*
                     * 공백은 그대로 유지
                     */
                    if (
                        /\s/.test(char)
                    ) {

                        output +=
                            char;

                    }

                    else {

                        output +=
                            randomChar();

                    }

                }


                item.node.textContent =
                    output;

            }
        );

    }



    /* =========================
       효과 실행
    ========================= */

    function playTypingEffect(
        el
    ) {

        let state =
            states.get(el);


        if (!state) {

            state = {
                running: false,
                interval: null,
                nodes: null,
                previousMinHeight: '',
                previousMaxHeight: '',
                previousOverflow: ''
            };


            states.set(
                el,
                state
            );

        }



        /* 이미 실행 중 */
        if (
            state.running
        ) {
            return;
        }



        const speed =
            Number(
                el.getAttribute(
                    'typing-speed'
                )
            )
            ||
            35;


        const frames =
            Number(
                el.getAttribute(
                    'typing-frames'
                )
            )
            ||
            24;


        const reveal =
            el.getAttribute(
                'typing-reveal'
            )
            ||
            'left';



        /* =========================
           원본 정보 가져오기
        ========================= */

        const nodes =
            getTextNodes(el);


        const totalCharacters =
            getCharacterCount(
                nodes
            );


        if (
            totalCharacters <= 0
        ) {

            el.classList.add(
                'typing-effect-done'
            );

            return;

        }



        state.nodes =
            nodes;

        state.running =
            true;



        /* =========================
           1. 최종 높이 먼저 확보
        ========================= */

        lockHeight(
            el,
            state
        );



        /* =========================
           2. 아직 안 보이는 상태에서
              랜덤 글자로 먼저 변경
        ========================= */

        makeRandomState(
            nodes
        );


        el.dataset.typingRunning =
            'true';


        el.classList.remove(
            'typing-effect-done'
        );



        /* =========================
           3. 랜덤 상태가 준비된 다음 표시
        ========================= */

        requestAnimationFrame(
            () => {

                el.classList.add(
                    'typing-effect-active'
                );

            }
        );



        let frame =
            0;



        /* =========================
           애니메이션
        ========================= */

        state.interval =
            window.setInterval(
                () => {

                    frame++;


                    const progress =
                        Math.min(
                            frame / frames,
                            1
                        );


                    const revealedCount =
                        Math.floor(
                            totalCharacters *
                            progress
                        );


                    let globalIndex =
                        0;



                    nodes.forEach(
                        item => {

                            let output =
                                '';


                            for (
                                const char
                                of item.original
                            ) {


                                /* =====================
                                   공백 유지
                                ===================== */

                                if (
                                    /\s/.test(char)
                                ) {

                                    output +=
                                        char;

                                    continue;

                                }



                                let revealed;



                                /* =====================
                                   왼쪽 → 오른쪽
                                ===================== */

                                if (
                                    reveal ===
                                    'left'
                                ) {

                                    revealed =
                                        globalIndex <
                                        revealedCount;

                                }


                                /* =====================
                                   오른쪽 → 왼쪽
                                ===================== */

                                else {

                                    revealed =
                                        globalIndex >=
                                        totalCharacters -
                                        revealedCount;

                                }



                                output +=
                                    revealed
                                        ?
                                        char
                                        :
                                        randomChar();


                                globalIndex++;

                            }


                            item.node.textContent =
                                output;

                        }
                    );



                    /* =========================
                       완료
                    ========================= */

                    if (
                        progress >= 1
                    ) {

                        window.clearInterval(
                            state.interval
                        );


                        state.interval =
                            null;


                        /*
                         * 최종 원문 복구
                         */
                        restoreOriginal(
                            nodes
                        );


                        state.running =
                            false;


                        el.dataset.typingRunning =
                            'false';


                        el.classList.remove(
                            'typing-effect-active'
                        );


                        el.classList.add(
                            'typing-effect-done'
                        );


                        /*
                         * 원문이 완전히 돌아온 뒤
                         * 높이 제한 해제
                         */
                        requestAnimationFrame(
                            () => {

                                unlockHeight(
                                    el,
                                    state
                                );

                            }
                        );

                    }


                },

                speed
            );

    }



    /* =========================
       초기 상태로 Reset
    ========================= */

    function resetTypingEffect(
        el
    ) {

        const state =
            states.get(el);


        if (!state) {

            el.classList.remove(
                'typing-effect-active',
                'typing-effect-done'
            );

            return;

        }



        /* 실행 중인 Interval 정리 */

        if (
            state.interval
        ) {

            window.clearInterval(
                state.interval
            );


            state.interval =
                null;

        }



        /* 원문 복구 */

        restoreOriginal(
            state.nodes
        );



        /* 높이 고정 해제 */

        unlockHeight(
            el,
            state
        );



        state.running =
            false;


        el.dataset.typingRunning =
            'false';



        /*
         * visible 클래스 제거
         *
         * 다시 화면에 들어오기 전까지
         * visibility:hidden 상태
         */
        el.classList.remove(
            'typing-effect-active',
            'typing-effect-done'
        );

    }



    /* =========================
       화면 진입 감지
    ========================= */

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {


                        /* =========================
                           화면의 20% 이상 진입
                        ========================= */

                        if (
                            entry.intersectionRatio >=
                            THRESHOLD
                        ) {

                            playTypingEffect(
                                entry.target
                            );

                            return;

                        }



                        /* =========================
                           화면에서 완전히 사라짐
                           → 초기 상태로 복구
                        ========================= */

                        if (
                            !entry.isIntersecting
                        ) {

                            resetTypingEffect(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: [
                    0,
                    THRESHOLD
                ]
            }

        );



    /* =========================
       초기화
    ========================= */

    function init() {

        document
            .querySelectorAll(
                SELECTOR
            )
            .forEach(
                el => {

                    observer.observe(
                        el
                    );

                }
            );

    }



    /* =========================
       실행
    ========================= */

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            init,
            {
                once: true
            }
        );

    }

    else {

        init();

    }

})();