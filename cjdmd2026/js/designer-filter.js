(() => {
    "use strict";

    function normalize(value) {
        return String(value ?? "")
            .toLocaleLowerCase("ko-KR")
            .replace(/\s+/g, "");
    }

    function init() {
        const designerPage =
            document.querySelector(".designer-page");

        const filter =
            document.querySelector(".designer-filter");

        const searchInput =
            document.querySelector(".search-bar input");

        if (!designerPage || !filter) return;

        if (!Array.isArray(window.DESIGNERS)) {
            console.warn(
                "[designer-filter.js] window.DESIGNERS가 없습니다."
            );
            return;
        }

        const designers =
            [...window.DESIGNERS].sort(
                (a, b) =>
                    (a.order ?? 0) -
                    (b.order ?? 0)
            );

        const buttons = [
            ...filter.querySelectorAll(
                ".designer-filter__button[data-initial]"
            )
        ];

        const indicator =
            filter.querySelector(
                ".designer-filter__indicator"
            );

        const indicatorShape =
            indicator?.querySelector(
                ".designer-filter__indicator-shape"
            );

        if (!buttons.length) return;

        /* =====================================================
           Style
           프로젝트의 세로 slime을 디자이너용 수평 slime으로 변경
        ===================================================== */

        const style =
            document.createElement("style");

        style.dataset.designerHorizontalFilter = "";

        style.textContent = `
            .designer-filter {
                position: relative;
                isolation: isolate;
            }

            .designer-filter__button {
                position: relative;
                z-index: 2;
            }

            .designer-filter__indicator {
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;

                display: block;

                pointer-events: none;

                /*
                 * JS에서 left / width / height를 계산합니다.
                 */
                width: 0;
                height: 0;

                overflow: visible;
            }

            .designer-filter__indicator-shape {
                position: absolute;
                inset: 0;

                display: block;

                border-radius: 999px;
                background: #000;

                transform-origin: center;
                will-change:
                    transform,
                    border-radius;
            }

            /*
             * 검은 배경 위에서 활성 글자는 흰색.
             * 기존 CSS의 is-active 스타일과도 함께 동작합니다.
             */
            .designer-filter__button[aria-pressed="true"] {
                color: #fff;
            }

            .designer-filter__button:disabled {
                opacity: .24;
                cursor: default;
            }
        `;

        document.head.appendChild(style);

        /* =====================================================
           State
        ===================================================== */

        let currentButton =
            buttons.find(
                button =>
                    button.getAttribute(
                        "aria-pressed"
                    ) === "true"
            )
            ||
            buttons[0];

        let activeInitial =
            currentButton?.dataset.initial ||
            "all";

        let searchQuery =
            normalize(
                searchInput?.value
            );

        let currentX = 0;

        /*
         * 빠르게 여러 초성을 눌렀을 때
         * 오래된 비동기 필터 전환 결과가 뒤늦게 렌더되는 것을 방지.
         */
        let filterTransitionToken = 0;

        /* =====================================================
           Search
        ===================================================== */

        function matchesSearch(
            designer,
            query
        ) {
            if (!query) return true;

            const searchText =
                normalize(
                    [
                        designer.nameKo,
                        designer.nameEn,
                        designer.id,
                        designer.teamName,
                        ...(designer.projectIds || [])
                    ].join(" ")
                );

            return searchText.includes(
                query
            );
        }

        function getResults() {
            return designers.filter(
                designer => {
                    const initialMatch =
                        activeInitial === "all"
                        ||
                        designer.initial ===
                            activeInitial;

                    const searchMatch =
                        matchesSearch(
                            designer,
                            searchQuery
                        );

                    return (
                        initialMatch &&
                        searchMatch
                    );
                }
            );
        }

        /* =====================================================
           Indicator Position
        ===================================================== */

        function getFilterPadding() {
            const style =
                getComputedStyle(filter);

            const rootFontSize =
                parseFloat(
                    getComputedStyle(
                        document.documentElement
                    ).fontSize
                ) || 16;

            function readLength(
                name,
                fallback
            ) {
                const raw =
                    style
                        .getPropertyValue(name)
                        .trim();

                if (!raw) {
                    return fallback;
                }

                if (raw.endsWith("rem")) {
                    return (
                        parseFloat(raw) *
                        rootFontSize
                    );
                }

                if (raw.endsWith("px")) {
                    return parseFloat(raw);
                }

                const value =
                    parseFloat(raw);

                return Number.isFinite(value)
                    ? value
                    : fallback;
            }

            return {
                x: readLength(
                    "--designer-filter-pad-x",
                    12.8
                ),
                y: readLength(
                    "--designer-filter-pad-y",
                    7.2
                )
            };
        }


        function getButtonBox(button) {
            const padding =
                getFilterPadding();

            return {
                x:
                    button.offsetLeft -
                    padding.x,

                y:
                    button.offsetTop -
                    padding.y,

                width:
                    button.offsetWidth +
                    padding.x * 2,

                height:
                    button.offsetHeight +
                    padding.y * 2
            };
        }

        function setIndicatorImmediately(
            button
        ) {
            if (
                !indicator ||
                !button ||
                button.disabled
            ) {
                return;
            }

            const box =
                getButtonBox(button);

            currentX =
                box.x;

            indicator
                .getAnimations()
                .forEach(
                    animation =>
                        animation.cancel()
                );

            indicatorShape
                ?.getAnimations()
                .forEach(
                    animation =>
                        animation.cancel()
                );

            indicator.style.left =
                `${box.x}px`;

            indicator.style.top =
                `${box.y}px`;

            indicator.style.width =
                `${box.width}px`;

            indicator.style.height =
                `${box.height}px`;
        }

        /* =====================================================
           Horizontal Jelly / Slime

           이전 pill과 다음 pill 사이를
           검은 젤리가 잠깐 연결한 뒤 떨어지는 모션.
        ===================================================== */

        function moveIndicator(
            nextButton
        ) {
            if (
                !indicator ||
                !nextButton ||
                nextButton.disabled
            ) {
                return;
            }

            const fromButton =
                currentButton ||
                nextButton;

            const from =
                getButtonBox(
                    fromButton
                );

            const to =
                getButtonBox(
                    nextButton
                );

            /*
             * 좌 → 우 / 우 → 좌 모두 대응.
             */
            const bridgeLeft =
                Math.min(
                    from.x,
                    to.x
                );

            const bridgeRight =
                Math.max(
                    from.x + from.width,
                    to.x + to.width
                );

            const bridgeWidth =
                bridgeRight -
                bridgeLeft;

            const movingRight =
                to.x >= from.x;

            indicator
                .getAnimations()
                .forEach(
                    animation =>
                        animation.cancel()
                );

            indicatorShape
                ?.getAnimations()
                .forEach(
                    animation =>
                        animation.cancel()
                );

            /*
             * 1. 현재 버튼
             * 2. 두 버튼 사이를 길게 연결
             * 3. 앞쪽이 먼저 다음 버튼으로 끌려감
             * 4. 꼬리가 떨어지면서 다음 버튼에 안착
             */
            const animation =
                indicator.animate(
                    [
                        {
                            left:
                                `${from.x}px`,
                            top:
                                `${from.y}px`,
                            width:
                                `${from.width}px`,
                            height:
                                `${from.height}px`,
                            offset: 0
                        },

                        {
                            left:
                                `${bridgeLeft}px`,
                            top:
                                `${Math.min(from.y, to.y)}px`,
                            width:
                                `${bridgeWidth}px`,
                            height:
                                `${Math.max(from.height, to.height)}px`,
                            offset: .42
                        },

                        movingRight
                            ? {
                                left:
                                    `${Math.max(
                                        bridgeLeft,
                                        to.x -
                                        from.width * .36
                                    )}px`,
                                top:
                                    `${to.y}px`,
                                width:
                                    `${to.width +
                                    from.width * .36}px`,
                                height:
                                    `${to.height}px`,
                                offset: .72
                            }
                            : {
                                left:
                                    `${to.x}px`,
                                top:
                                    `${to.y}px`,
                                width:
                                    `${to.width +
                                    from.width * .36}px`,
                                height:
                                    `${to.height}px`,
                                offset: .72
                            },

                        {
                            left:
                                `${to.x}px`,
                            top:
                                `${to.y}px`,
                            width:
                                `${to.width}px`,
                            height:
                                `${to.height}px`,
                            offset: 1
                        }
                    ],
                    {
                        duration: 560,
                        easing:
                            "cubic-bezier(0.22, 1, 0.36, 1)",
                        fill: "forwards"
                    }
                );

            /*
             * 연결되는 동안 젤리 덩어리 자체도
             * 납작 → 튕김 → 복귀.
             */
            indicatorShape?.animate(
                [
                    {
                        transform:
                            "scaleX(1) scaleY(1)",
                        borderRadius:
                            "999px"
                    },
                    {
                        transform:
                            "scaleX(1.035) scaleY(.82)",
                        borderRadius:
                            "45% 55% 48% 52% / 58% 42% 58% 42%"
                    },
                    {
                        transform:
                            "scaleX(.975) scaleY(1.12)",
                        borderRadius:
                            "52% 48% 58% 42% / 46% 54% 46% 54%"
                    },
                    {
                        transform:
                            "scaleX(1) scaleY(1)",
                        borderRadius:
                            "999px"
                    }
                ],
                {
                    duration: 560,
                    easing:
                        "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "forwards"
                }
            );

            animation.onfinish = () => {
                indicator.style.left =
                    `${to.x}px`;

                indicator.style.top =
                    `${to.y}px`;

                indicator.style.width =
                    `${to.width}px`;

                indicator.style.height =
                    `${to.height}px`;

                currentX =
                    to.x;
            };
        }

        /* =====================================================
           Buttons
        ===================================================== */

        function syncButtons() {
            buttons.forEach(
                button => {
                    const active =
                        button.dataset.initial ===
                        activeInitial;

                    button.classList.toggle(
                        "is-active",
                        active
                    );

                    button.setAttribute(
                        "aria-pressed",
                        String(active)
                    );
                }
            );
        }

        /* =====================================================
           Results
           Grid + Slide 모두 같은 결과 배열 사용
        ===================================================== */

        function applyResults(
            preparedResults = null
        ) {
            const results =
                preparedResults ||
                getResults();

            /*
             * designer_02.js가 DOM 카드를 다시 생성하고,
             * Slide View에서는 designer-ribbon-slider.refresh()를 호출합니다.
             */
            if (
                window.DesignerPage?.render
            ) {
                window.DesignerPage.render(
                    results
                );
            }

            designerPage.dataset
                .designerResultCount =
                    String(
                        results.length
                    );

            document.dispatchEvent(
                new CustomEvent(
                    "designer-filter-change",
                    {
                        detail: {
                            initial:
                                activeInitial,
                            query:
                                searchQuery,
                            visibleIds:
                                results.map(
                                    designer =>
                                        designer.id
                                ),
                            designers:
                                results
                        }
                    }
                )
            );
        }

        async function applyFilterWithExit() {
            const token =
                ++filterTransitionToken;

            const results =
                getResults();

            /*
             * Grid에서는 바로 변경.
             * Slide에서는 현재 WebGL 카드가 먼저 아래로 툭 떨어진 뒤
             * 필터 결과를 렌더합니다.
             */
            if (
                designerPage.classList.contains(
                    "slide-view"
                ) &&
                window.DesignerRibbonSlider
                    ?.prepareFilterTransition
            ) {
                await window
                    .DesignerRibbonSlider
                    .prepareFilterTransition(
                        results.map(
                            designer =>
                                designer.id
                        )
                    );
            }

            /*
             * 기다리는 동안 다른 초성을 눌렀다면
             * 이전 요청은 버립니다.
             */
            if (
                token !==
                filterTransitionToken
            ) {
                return;
            }

            /*
             * 떨어짐이 끝난 직후 DOM/WebGL이 바로 교체되면
             * 마지막 프레임이 잘려 보일 수 있어서 아주 짧게 여유를 둡니다.
             */
            if (
                designerPage.classList.contains(
                    "slide-view"
                )
            ) {
                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            90
                        )
                );
            }

            if (
                token !==
                filterTransitionToken
            ) {
                return;
            }

            applyResults(
                results
            );
        }

        /* =====================================================
           Filter Buttons
        ===================================================== */

        buttons.forEach(
            button => {
                button.addEventListener(
                    "click",
                    () => {
                        if (
                            button.disabled ||
                            button === currentButton
                        ) {
                            return;
                        }

                        activeInitial =
                            button.dataset.initial ||
                            "all";

                        syncButtons();

                        moveIndicator(
                            button
                        );

                        currentButton =
                            button;

                        applyFilterWithExit();
                    }
                );
            }
        );

        /* =====================================================
           Search
        ===================================================== */

        if (searchInput) {
            searchInput.addEventListener(
                "input",
                event => {
                    searchQuery =
                        normalize(
                            event.target.value
                        );

                    /*
                     * 검색 입력은 즉시 반영.
                     */
                    filterTransitionToken++;

                    applyResults();
                }
            );

            searchInput.addEventListener(
                "keydown",
                event => {
                    if (
                        event.key !==
                        "Escape"
                    ) {
                        return;
                    }

                    event.target.value =
                        "";

                    searchQuery =
                        "";

                    filterTransitionToken++;

                    applyResults();
                }
            );
        }

        /* =====================================================
           Empty Initial
        ===================================================== */

        const availableInitials =
            new Set(
                designers.map(
                    designer =>
                        designer.initial
                )
            );

        buttons.forEach(
            button => {
                const initial =
                    button.dataset.initial;

                if (
                    !initial ||
                    initial === "all"
                ) {
                    return;
                }

                const available =
                    availableInitials.has(
                        initial
                    );

                button.disabled =
                    !available;

                button.setAttribute(
                    "aria-disabled",
                    String(!available)
                );
            }
        );

        /* =====================================================
           Layout Sync
        ===================================================== */

        function reposition() {
            requestAnimationFrame(
                () => {
                    requestAnimationFrame(
                        () => {
                            setIndicatorImmediately(
                                currentButton
                            );
                        }
                    );
                }
            );
        }

        window.addEventListener(
            "resize",
            reposition,
            { passive: true }
        );

        document.addEventListener(
            "designer:viewchange",
            reposition
        );

        /* =====================================================
           Public API
        ===================================================== */

        window.DesignerFilter = {
            get state() {
                return {
                    initial:
                        activeInitial,
                    query:
                        searchQuery,
                    results:
                        getResults()
                };
            },

            apply:
                applyResults,

            reset() {
                const allButton =
                    buttons.find(
                        button =>
                            button.dataset.initial ===
                            "all"
                    );

                activeInitial =
                    "all";

                searchQuery =
                    "";

                if (searchInput) {
                    searchInput.value =
                        "";
                }

                syncButtons();

                if (allButton) {
                    moveIndicator(
                        allButton
                    );

                    currentButton =
                        allButton;
                }

                applyFilterWithExit();
            }
        };

        /* =====================================================
           Start
        ===================================================== */

        syncButtons();

        requestAnimationFrame(
            () => {
                setIndicatorImmediately(
                    currentButton
                );

                applyResults();
            }
        );
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init,
            { once: true }
        );
    } else {
        init();
    }
})();