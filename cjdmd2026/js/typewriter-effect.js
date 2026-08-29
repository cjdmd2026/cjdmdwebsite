(() => {
    "use strict";

    const SELECTOR = '[typewriter-effect]';

    /*
     * 요소별 현재 실행 중인 타이머 저장
     * replay / cancel 시 이전 타이핑 중지용
     */
    const typingTimers =
        new WeakMap();


    /* =========================
       스타일
    ========================= */

    const style =
        document.createElement('style');

    style.textContent = `

        /* =========================
           Manual Typewriter 초기 상태
        ========================= */

        [typewriter-effect][typewriter-trigger="manual"] {
            visibility: hidden;
        }

        [typewriter-effect][typewriter-trigger="manual"].is-typing,
        [typewriter-effect][typewriter-trigger="manual"].is-typed {
            visibility: visible;
        }


        /* =========================
           커서
        ========================= */

        .typewriter-cursor {
            width: 1px;
            height: 0.9em;

            display: inline-block;

            margin-left: 0.06em;

            background-color: #111;

            vertical-align: -0.06em;

            opacity: 0.3;

            animation:
            typewriter-cursor-blink
            0.9s
            steps(1, end)
            infinite;
        }


        @keyframes typewriter-cursor-blink {

            0%,
            45% {
                opacity: 0.4;
            }

            46%,
            100% {
                opacity: 0.08;
            }

        }

    `;


    document.head.appendChild(
        style
    );



    /* =========================
       화면 진입 감지
    ========================= */

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        playTypewriter(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 1
            }

        );



    /* =========================
       타이핑 실행
    ========================= */

    function playTypewriter(
        el
    ) {

        if (!el) {
            return;
        }


        /*
         * 이미 실행 중
         */
        if (
            el.dataset.typing ===
            'true'
        ) {
            return;
        }


        /*
         * 이미 완료
         */
        if (
            el.dataset.typed ===
            'true'
        ) {
            return;
        }



        /* =========================
           실행 상태
        ========================= */

        el.classList.add(
            'is-typing'
        );



        const speed =
            Number(
                el.getAttribute(
                    'typewriter-speed'
                )
            )
            ||
            60;



        const delay =
            Number(
                el.getAttribute(
                    'typewriter-delay'
                )
            )
            ||
            0;



        const keepCursor =
            el.hasAttribute(
                'typewriter-cursor-keep'
            );



        /* =========================
           원본 HTML 저장
        ========================= */

        const originalHTML =
            el.innerHTML;


        const temp =
            document.createElement(
                'div'
            );


        temp.innerHTML =
            originalHTML;



        /* =========================
           출력 영역 초기화
        ========================= */

        el.innerHTML =
            '';


        el.dataset.typing =
            'true';



        /* =========================
           커서 생성
        ========================= */

        const cursor =
            document.createElement(
                'span'
            );


        cursor.className =
            'typewriter-cursor';


        cursor.setAttribute(
            'aria-hidden',
            'true'
        );



        /* =========================
           작업 목록
        ========================= */

        const tasks =
            [];



        /* =========================
           커서 위치 이동
        ========================= */

        function moveCursorAfter(
            node
        ) {

            cursor.remove();


            node.after(
                cursor
            );

        }



        /* =========================
           HTML 구조 분석
        ========================= */

        function buildTasks(
            source,
            target
        ) {

            source.childNodes.forEach(
                node => {


                    /* =========================
                       Text Node
                    ========================= */

                    if (
                        node.nodeType ===
                        Node.TEXT_NODE
                    ) {

                        /*
                        * HTML 들여쓰기 / 줄바꿈처럼
                        * 화면에 의미 없는 공백만 있는 Text Node는 무시
                        */
                        if (
                            node.textContent.trim() === ''
                        ) {
                            return;
                        }


                        const textNode =
                            document.createTextNode('');


                        target.appendChild(
                            textNode
                        );


                        /*
                        * 연속된 공백과 줄바꿈은
                        * 일반 공백 하나로 정리
                        */
                        const text =
                            node.textContent
                                .replace(/\s+/g, ' ')
                                .trim();


                        for (
                            const char
                            of text
                        ) {

                            tasks.push(() => {

                                textNode.textContent +=
                                    char;


                                moveCursorAfter(
                                    textNode
                                );

                            });

                        }

                    }



                    /* =========================
                       Element Node
                    ========================= */

                    else if (
                        node.nodeType ===
                        Node.ELEMENT_NODE
                    ) {

                        const clone =
                            node.cloneNode(
                                false
                            );


                        target.appendChild(
                            clone
                        );



                        /* =========================
                           BR
                        ========================= */

                        if (
                            node.tagName ===
                            'BR'
                        ) {

                            tasks.push(
                                () => {

                                    moveCursorAfter(
                                        clone
                                    );

                                }
                            );


                            return;

                        }



                        /*
                         * span / strong 등
                         * 내부 구조 유지
                         */

                        buildTasks(
                            node,
                            clone
                        );

                    }

                }
            );

        }



        buildTasks(
            temp,
            el
        );



        /* =========================
           시작 커서
        ========================= */

        el.prepend(
            cursor
        );



        let index =
            0;



        /* =========================
           실제 타이핑
        ========================= */

        function type() {

            /* =========================
               완료
            ========================= */

            if (
                index >=
                tasks.length
            ) {

                el.dataset.typing =
                    'false';


                el.dataset.typed =
                    'true';



                /* 상태 변경 */

                el.classList.remove(
                    'is-typing'
                );


                el.classList.add(
                    'is-typed'
                );



                /* 커서 제거 */

                if (
                    !keepCursor
                ) {

                    cursor.remove();

                }



                /* 저장된 타이머 정리 */
                typingTimers.delete(
                    el
                );


                /* 완료 이벤트 */

                el.dispatchEvent(

                    new CustomEvent(
                        'typewritercomplete',
                        {
                            bubbles: true
                        }
                    )

                );


                return;

            }



            tasks[index]();


            index++;



            const timer =
                window.setTimeout(
                    type,
                    speed
                );


            typingTimers.set(
                el,
                timer
            );

        }



        /* =========================
           Delay 후 시작
        ========================= */

        const timer =
            window.setTimeout(
                type,
                delay
            );


        typingTimers.set(
            el,
            timer
        );

    }



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

                    const trigger =
                        el.getAttribute(
                            'typewriter-trigger'
                        );


                    /*
                     * manual이면
                     * Observer에 등록하지 않음
                     */

                    if (
                        trigger ===
                        'manual'
                    ) {

                        return;

                    }


                    /*
                     * 기본:
                     * 화면에 들어왔을 때 자동 실행
                     */

                    observer.observe(
                        el
                    );

                }
            );

    }



    /* =========================
       외부 API
    ========================= */

    window.TypewriterEffect = {

        /* 기본 실행 */
        play(
            el
        ) {

            if (!el) {
                return;
            }


            playTypewriter(
                el
            );

        },


        /* 현재 타이핑 중지 */
        cancel(
            el
        ) {

            if (!el) {
                return;
            }


            const timer =
                typingTimers.get(
                    el
                );


            if (timer) {

                window.clearTimeout(
                    timer
                );

                typingTimers.delete(
                    el
                );

            }


            const cursor =
                el.querySelector(
                    '.typewriter-cursor'
                );


            if (cursor) {

                cursor.remove();

            }


            el.dataset.typing =
                'false';


            el.dataset.typed =
                'false';


            el.classList.remove(
                'is-typing',
                'is-typed'
            );

        },


        /* 처음부터 다시 실행 */
        replay(
            el
        ) {

            if (!el) {
                return;
            }


            this.cancel(
                el
            );


            playTypewriter(
                el
            );

        }

    };



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