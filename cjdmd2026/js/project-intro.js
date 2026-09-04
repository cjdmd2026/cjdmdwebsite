(() => {
    "use strict";

    /*
     * 프로젝트 인트로
     *
     * 1. card 숨김
     * 2. 화면 중앙 title box에서 프로젝트명을 순서대로 표시
     * 3. 작품명 전체가 움직이지 않고, 각 글자가 아래 → 중앙 → 위로 이동
     * 4. 이전 작품명이 완전히 사라진 뒤 다음 작품명 시작
     * 5. 마지막에 활성 card가 위에서 아래로 내려옴
     *
     * 기존 intro용 HTML / CSS는 그대로 사용하고
     * 이 파일만 기존 project-intro.js 대신 교체하면 됩니다.
     */

    const SETTINGS = {
        charEnterDuration: 80, // 글자 1개의 등장 시간
        charEnterStagger: 0,   // 글자 사이 등장 간격

        hold: 42,               // 제목 완성 후 잠깐 유지

        charExitDuration: 20,  // 글자 1개의 퇴장 시간
        charExitStagger: 10,     // 글자 사이 퇴장 간격

        betweenTitles: 12,      // 다음 작품명이 시작되기 전 빈 시간

        finalHold: 120,         // 마지막 목록 제목 유지
        titleExit: 240,         // 중앙 title box 자체가 사라지는 시간

        cardDrop: 1150,         // 기존 CSS card drop 시간
        finalRevealDelay: 100
    };

    const sleep = ms =>
        new Promise(resolve => window.setTimeout(resolve, ms));

    function setTitles(elements, value) {
        elements.forEach(element => {
            element.textContent = value;
        });
    }

    function getProjects() {
        if (!Array.isArray(window.PROJECTS)) return [];

        return [...window.PROJECTS]
            .filter(project => project && project.title)
            .sort(
                (a, b) =>
                    Number(a.slideOrder ?? 999) -
                    Number(b.slideOrder ?? 999)
            );
    }

    function getActiveProject(projects) {
        const activeCard =
            document.querySelector(
                "#slideview .card.is-active[data-project-id]"
            );

        if (!activeCard) return projects[0] || null;

        return (
            projects.find(
                project =>
                    String(project.id) ===
                    String(activeCard.dataset.projectId)
            ) ||
            projects[0] ||
            null
        );
    }

    async function waitForPageTransition() {
        const root = document.documentElement;
        const startedAt = performance.now();

        while (
            root.classList.contains("page-transition-preload") &&
            performance.now() - startedAt < 1400
        ) {
            await sleep(32);
        }
    }

    /*
     * title box는 움직이지 않습니다.
     * 내부 글자만 보이도록 overflow:hidden을 적용합니다.
     */
    function prepareLetterStage(titleElements) {
        const primary = titleElements[0];

        const state = titleElements.map(element => ({
            element,
            visibility: element.style.visibility,
            overflow: element.style.overflow,
            display: element.style.display,
            verticalAlign: element.style.verticalAlign,
            paddingTop: element.style.paddingTop,
            paddingBottom: element.style.paddingBottom,
            clipPath: element.style.clipPath,
            webkitClipPath: element.style.webkitClipPath
        }));

        /* black / white 중첩 title이 있더라도
           인트로 중앙에서는 하나만 보여줍니다. */
        titleElements.slice(1).forEach(element => {
            element.style.visibility = "hidden";
        });

        primary.style.visibility = "visible";
        primary.style.overflow = "hidden";
        primary.style.display = "inline-flex";
        primary.style.alignItems = "baseline";
        primary.style.verticalAlign = "bottom";

        /*
         * 글자의 위/아래 이동이 박스 밖에서 잘리되
         * 폰트의 실제 획은 잘리지 않도록 아주 작은 내부 여백만 둡니다.
         */
        primary.style.paddingTop = "0.08em";
        primary.style.paddingBottom = "0.08em";

        /* 최종 레이아웃에서 사용하는 반전용 clip이 있더라도
           중앙 인트로 동안에는 한 줄 title box로 표시 */
        primary.style.clipPath = "none";
        primary.style.webkitClipPath = "none";

        return {
            primary,
            restore() {
                state.forEach(saved => {
                    const { element } = saved;

                    element.style.visibility = saved.visibility;
                    element.style.overflow = saved.overflow;
                    element.style.display = saved.display;
                    element.style.verticalAlign = saved.verticalAlign;
                    element.style.paddingTop = saved.paddingTop;
                    element.style.paddingBottom = saved.paddingBottom;
                    element.style.clipPath = saved.clipPath;
                    element.style.webkitClipPath = saved.webkitClipPath;
                });
            }
        };
    }

    function createLetters(element, text) {
        element.textContent = "";

        const fragment = document.createDocumentFragment();
        const letters = [];

        Array.from(text).forEach(char => {
            const letter = document.createElement("span");

            letter.className = "project-intro-letter";
            letter.textContent =
                char === " "
                    ? "\u00A0"
                    : char;

            Object.assign(letter.style, {
                display: "inline-block",
                transform: "translateY(125%)",
                opacity: "0",
                willChange: "transform, opacity"
            });

            fragment.appendChild(letter);
            letters.push(letter);
        });

        element.appendChild(fragment);

        return letters;
    }

    async function enterLetters(letters) {
        const animations =
            letters.map((letter, index) =>
                letter.animate(
                    [
                        {
                            transform: "translateY(125%)",
                            opacity: 0
                        },
                        {
                            transform: "translateY(0%)",
                            opacity: 1
                        }
                    ],
                    {
                        duration:
                            SETTINGS.charEnterDuration,
                        delay:
                            index *
                            SETTINGS.charEnterStagger,
                        easing:
                            "cubic-bezier(.22, 1, .36, 1)",
                        fill: "forwards"
                    }
                )
            );

        await Promise.all(
            animations.map(animation =>
                animation.finished.catch(() => {})
            )
        );
    }

    async function exitLetters(letters) {
        /*
         * 등장 순서와 동일하게 왼쪽 → 오른쪽으로 위로 빠집니다.
         * 작품명 전체가 한 덩어리로 움직이는 것이 아니라
         * 각 글자가 조금씩 시간차를 두고 빠집니다.
         */
        const animations =
            letters.map((letter, index) =>
                letter.animate(
                    [
                        {
                            transform: "translateY(0%)",
                            opacity: 1
                        },
                        {
                            transform: "translateY(-125%)",
                            opacity: 0
                        }
                    ],
                    {
                        duration:
                            SETTINGS.charExitDuration,
                        delay:
                            index *
                            SETTINGS.charExitStagger,
                        easing:
                            "cubic-bezier(.55, 0, .78, 0)",
                        fill: "forwards"
                    }
                )
            );

        /*
         * 모든 글자의 퇴장이 끝날 때까지 기다립니다.
         * 이 Promise가 끝난 뒤에만 다음 작품명이 만들어지므로
         * 두 작품명이 동시에 보이지 않습니다.
         */
        await Promise.all(
            animations.map(animation =>
                animation.finished.catch(() => {})
            )
        );
    }

    async function showProjectTitle(
        element,
        title
    ) {
        const letters =
            createLetters(
                element,
                String(title)
            );

        await enterLetters(letters);
        await sleep(SETTINGS.hold);
        await exitLetters(letters);

        element.textContent = "";

        await sleep(
            SETTINGS.betweenTitles
        );
    }

    function revealImmediately({
        root,
        titleGroup,
        titleElements,
        activeProject
    }) {
        if (activeProject) {
            setTitles(
                titleElements,
                activeProject.title
            );
        }

        if (titleGroup) {
            titleGroup.classList.remove("is-typing");
            titleGroup.classList.add("is-typed");
            titleGroup.dataset.typing = "false";
            titleGroup.dataset.typed = "true";
        }

        root.classList.remove(
            "project-intro-pending",
            "project-intro-running",
            "project-intro-title-exit",
            "project-intro-card-enter",
            "project-intro-final-reveal"
        );

        document
            .querySelectorAll(".page-enter-up")
            .forEach(element =>
                element.classList.add("is-show")
            );

        window.dispatchEvent(
            new Event("resize")
        );
    }

    async function runIntro() {
        const root =
            document.documentElement;

        const slideview =
            document.querySelector(
                "#slideview"
            );

        const titleGroup =
            document.querySelector(
                ".title-section h1[typewriter-effect]"
            );

        const titleElements = [
            ...document.querySelectorAll(
                ".project-title"
            )
        ];

        if (
            !slideview ||
            !titleGroup ||
            !titleElements.length
        ) {
            root.classList.remove(
                "project-intro-pending"
            );

            return;
        }

        const projects =
            getProjects();

        const activeProject =
            getActiveProject(projects);

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (
            reduceMotion ||
            !projects.length ||
            !activeProject
        ) {
            revealImmediately({
                root,
                titleGroup,
                titleElements,
                activeProject
            });

            return;
        }

        await waitForPageTransition();

        /*
         * 기존 typewriter-effect가 title을 건드리지 않도록 중지
         */
        if (
            window.TypewriterEffect &&
            typeof window.TypewriterEffect.cancel ===
                "function"
        ) {
            try {
                window.TypewriterEffect.cancel(
                    titleGroup
                );
            } catch (_) {}
        }

        titleGroup.classList.add(
            "is-typing"
        );

        titleGroup.classList.remove(
            "is-typed"
        );

        titleGroup.dataset.typing =
            "true";

        titleGroup.dataset.typed =
            "false";

        root.classList.remove(
            "project-intro-pending"
        );

        root.classList.add(
            "project-intro-running"
        );

        const letterStage =
            prepareLetterStage(
                titleElements
            );

        try {
            /*
             * 01.
             * 프로젝트 이름을 하나씩 표시.
             *
             * 이전 작품명의 모든 글자가 완전히 위로 사라진 뒤에만
             * 다음 작품명을 생성합니다.
             */
            for (
                const project of projects
            ) {
                await showProjectTitle(
                    letterStage.primary,
                    project.title
                );
            }

            /*
             * 02.
             * 활성 card를 위 → 현재 CSS 위치로 내림
             */
            root.classList.add(
                "project-intro-card-enter"
            );

            await sleep(
                SETTINGS.cardDrop
            );

        } finally {
            /*
             * 인트로용 letter DOM / inline style을 제거하고
             * 기존 black / white title 구조를 그대로 복구
             */
            letterStage.restore();

            setTitles(
                titleElements,
                activeProject.title
            );
        }

        /*
         * 03.
         * 정상 레이아웃의 title / UI 표시
         */
        titleGroup.classList.remove(
            "is-typing"
        );

        titleGroup.classList.add(
            "is-typed"
        );

        titleGroup.dataset.typing =
            "false";

        titleGroup.dataset.typed =
            "true";

        root.classList.add(
            "project-intro-final-reveal"
        );

        root.classList.remove(
            "project-intro-running",
            "project-intro-pending",
            "project-intro-title-exit",
            "project-intro-card-enter"
        );

        /*
         * Fluid surface가 card 최종 위치를 다시 읽도록 함
         */
        window.dispatchEvent(
            new Event("resize")
        );

        document
            .querySelectorAll(".page-enter-up")
            .forEach(element =>
                element.classList.add("is-show")
            );

        await new Promise(resolve =>
            requestAnimationFrame(() =>
                requestAnimationFrame(
                    resolve
                )
            )
        );

        await sleep(
            SETTINGS.finalRevealDelay
        );

        root.classList.remove(
            "project-intro-final-reveal"
        );

        document.dispatchEvent(
            new CustomEvent(
                "project-intro-complete",
                {
                    detail: {
                        projectId:
                            activeProject.id
                    }
                }
            )
        );
    }

    function failOpen(error) {
        console.warn(
            "[ProjectIntro] 입장 애니메이션을 완료하지 못해 즉시 표시합니다.",
            error
        );

        document.documentElement.classList.remove(
            "project-intro-pending",
            "project-intro-running",
            "project-intro-title-exit",
            "project-intro-card-enter",
            "project-intro-final-reveal"
        );
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                runIntro().catch(
                    failOpen
                );
            },
            { once: true }
        );
    } else {
        runIntro().catch(
            failOpen
        );
    }
})();
