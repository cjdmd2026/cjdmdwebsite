(() => {
    "use strict";

    /* ==================== 조절할 값 ==================== */

    const CONFIG = {
        designerId: "",
        fullMode: "ratio",       // "ratio" 또는 "viewport"
        travelScreens: 3.1,
        expandEnd: 0.22,
        shrinkStart: 0.52,
        bannerHeight: 0.36,
        bannerRadius: 0,
        focalX: 0.5,
        focalY: 0.5
    };

    const COURSE_CARDS = [
        { id: "interactive", label: "INTERACTIVE DESIGN" },
        { id: "service", label: "SERVICE DESIGN" },
        { id: "interface", label: "INTERFACE DESIGN" }
    ];

    const root = document.documentElement;

    const scriptUrl =
        document.currentScript?.src ||
        new URL(
            "../../js/designer-detail.js",
            document.baseURI
        ).href;

    const siteRoot = new URL("../", scriptUrl);

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const clamp = (n, min = 0, max = 1) =>
        Math.min(Math.max(n, min), max);

    const lerp = (a, b, t) => a + (b - a) * t;

    const smooth = t => t * t * (3 - 2 * t);

    let controller = null;
    let mountFrame = 0;
    let stopped = false;
    let renderCleanups = [];

    /* ==================== Lenis ==================== */

    function getLenis() {
        try {
            if (typeof lenis !== "undefined") return lenis;
        } catch (_) {
            /* 아직 초기화되지 않은 경우 */
        }

        return window.lenis || null;
    }

    function resizeLenis() {
        getLenis()?.resize?.();
    }

    function scrollInstantly(top) {
        const value = Math.max(0, top);
        const instance = getLenis();

        if (typeof instance?.scrollTo === "function") {
            instance.scrollTo(value, {
                immediate: true,
                force: true
            });
        } else {
            window.scrollTo({
                top: value,
                left: window.scrollX,
                behavior: "instant"
            });
        }
    }

    /* ==================== 데이터 연결 ==================== */

    function resolveAssetPath(rawPath) {
        if (
            typeof rawPath !== "string" ||
            !rawPath.trim()
        ) {
            return "";
        }

        let path = rawPath.trim().replace(/\\/g, "/");

        const fromSiteRoot = path.replace(
            /^(?:\.{1,2}\/)+/,
            ""
        );

        if (fromSiteRoot.startsWith("assets/")) {
            path = fromSiteRoot;
        }

        try {
            const url = new URL(
                path,
                fromSiteRoot.startsWith("assets/")
                    ? siteRoot
                    : scriptUrl
            );

            if (
                !["http:", "https:", "file:", "data:", "blob:"]
                    .includes(url.protocol)
            ) {
                return "";
            }

            if (
                url.protocol === "data:" &&
                !/^data:image\//i.test(path)
            ) {
                return "";
            }

            return url.href;
        } catch (_) {
            return "";
        }
    }

    function createNode(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;

        if (text !== undefined && text !== null) {
            node.textContent = String(text);
        }

        return node;
    }

    function selectedDesignerId() {
        const params = new URLSearchParams(
            window.location.search
        );

        if (params.has("id")) {
            return (params.get("id") || "").trim();
        }

        return (
            document.querySelector(".main")?.dataset.designerId ||
            CONFIG.designerId
        ).trim();
    }

    function fillProfile(designer) {
        const profile = document.querySelector(
            ".intro .profile"
        );

        if (!profile) return;

        const nameKo = profile.querySelector(".name h1");
        const nameEn = profile.querySelector(".name h2");
        const portrait = profile.querySelector(".image");
        const sentenceWrap = profile.querySelector(".sentence");
        const sentence = sentenceWrap?.querySelector("p");

        const korean =
            designer?.nameKo || "디자이너 정보 없음";

        if (nameKo) nameKo.textContent = korean;

        if (nameEn) {
            nameEn.textContent = designer?.nameEn || "";
            nameEn.hidden = !designer?.nameEn;
        }

        const defaultStatement = `저에게 졸업전시는 미래에 대한 걱정이 자신감으로 바뀌는 과정이었던 것 같습니다. 너무나도 원했던 전공이었고, 공부하고 싶었던 분야인 만큼 매 순간에 최선을 다하여 임했다고 생각합니다. 앞으로 맞이할 날들 속에서도 디미디 5기 모두가 날개를 펼치고 훨훨 날아다니기를!`;

        const statement = designer
            ? (
                typeof designer.sentence === "string"
                    ? designer.sentence.trim()
                    : ""
            ) || defaultStatement
            : "";

        if (sentence) {
            sentence.textContent = statement;
            sentence.style.whiteSpace = "pre-line";
        }

        if (sentenceWrap) {
            sentenceWrap.hidden = !statement;
        }

        if (!portrait) return;

        const url = resolveAssetPath(designer?.image);

        portrait.style.visibility = url ? "" : "hidden";

        if (portrait.tagName === "IMG") {
            if (url) {
                portrait.src = url;
            } else {
                portrait.removeAttribute("src");
            }

            portrait.alt = designer
                ? `${korean} 프로필 사진`
                : "";

            return;
        }

        portrait.style.backgroundImage = url
            ? `url(${JSON.stringify(url)})`
            : "none";

        /* 크기와 위치는 CSS에서 조절 */
        portrait.style.backgroundRepeat = "no-repeat";

        if (url) {
            portrait.setAttribute("role", "img");
            portrait.setAttribute(
                "aria-label",
                `${korean} 프로필 사진`
            );
        } else {
            portrait.removeAttribute("role");
            portrait.removeAttribute("aria-label");
        }
    }

    function getCourseCards(project) {
        const sharedCards = project.courseCards || {};

        return COURSE_CARDS.map(course => {
            const entry = sharedCards[course.id] || {};

            const text = value =>
                typeof value === "string"
                    ? value.trim()
                    : "";

            const courseImage = text(entry.image);

            return {
                id: project.id,
                courseId: course.id,
                category: course.label,

                title:
                    text(entry.title) ||
                    project.title ||
                    "",

                description:
                    text(entry.description) ||
                    project.description ||
                    "",

                image:
                    courseImage ||
                    project.image ||
                    "",

                slideImage: courseImage
                    ? ""
                    : project.slideImage || ""
            };
        });
    }

    /* ==================== 카드 생성 ==================== */

    function createProjectCard(project, isFirst) {
        const card = createNode(
            "article",
            isFirst
                ? "project-card is-active"
                : "project-card"
        );

        card.setAttribute("tabindex", "0");

        card.setAttribute(
            "aria-label",
            `${project.category} · ${project.title || "프로젝트"}`
        );

        card.dataset.projectId = String(project.id);
        card.dataset.courseId = project.courseId;

        const thumb = createNode("div", "project-thumb");
        const image = createNode("img", "project-image");

        image.alt =
            `${project.title || "프로젝트"} · ${project.category} 이미지`;

        image.loading = isFirst ? "eager" : "lazy";
        image.decoding = "async";

        if (isFirst) {
            image.setAttribute("fetchpriority", "high");
        }

        const normalImage = resolveAssetPath(project.image);
        const wideImage = resolveAssetPath(project.slideImage);
        const primary = normalImage || wideImage;

        if (
            normalImage &&
            wideImage &&
            normalImage !== wideImage
        ) {
            const fallback = () => {
                image.removeEventListener("error", fallback);
                image.src = wideImage;
            };

            image.addEventListener("error", fallback, {
                once: true
            });

            renderCleanups.push(() => {
                image.removeEventListener("error", fallback);
            });
        }

        if (primary) image.src = primary;

        if (isFirst) {
            thumb.id = "firstProjectThumb";

            const flyer = createNode(
                "div",
                "hero-flyer is-docked"
            );

            flyer.id = "heroFlyer";

            const media = createNode("div", "media-frame");
            media.id = "mediaFrame";

            image.id = "projectImage";

            const overlay = createNode("div", "hero-overlay");
            overlay.id = "heroOverlay";
            overlay.setAttribute("aria-hidden", "true");

            const title = createNode(
                "div",
                "hero-title",
                project.title || ""
            );

            title.id = "heroTitle";
            title.setAttribute("aria-hidden", "true");

            media.appendChild(image);
            flyer.append(media, overlay, title);
            thumb.appendChild(flyer);
        } else {
            thumb.appendChild(image);
        }

        const copy = createNode("div", "card-copy");

        const category = createNode(
            "p",
            "category",
            project.category || ""
        );

        category.hidden = !project.category;

        copy.append(
            category,
            createNode("h3", "", project.title || ""),
            createNode("p", "", project.description || "")
        );

        card.append(thumb, copy);

        return card;
    }

    /* ==================== 활성 카드 유지 ==================== */

    function bindActiveCards(cards) {
        let selected = cards[0];

        cards.forEach(card => {
            const activate = () => {
                if (selected === card) return;

                selected?.classList.remove("is-active");
                card.classList.add("is-active");

                selected = card;

                controller?.refresh();
            };

            const enter = event => {
                if (event.pointerType !== "touch") {
                    activate();
                }
            };

            card.addEventListener("pointerenter", enter);
            card.addEventListener("focusin", activate);
            card.addEventListener("click", activate);

            renderCleanups.push(() => {
                card.removeEventListener("pointerenter", enter);
                card.removeEventListener("focusin", activate);
                card.removeEventListener("click", activate);
            });

            /* pointerleave에서는 활성 상태를 해제하지 않음 */
        });
    }

    /* ==================== 화면 렌더링 ==================== */

    function renderDetail() {
        if (stopped) return false;

        const container = document.querySelector(
            "#listLayer .container"
        );

        if (!container) {
            console.warn(
                "[DesignerDetail] #listLayer .container를 찾을 수 없습니다."
            );

            return false;
        }

        if (mountFrame) {
            cancelAnimationFrame(mountFrame);
        }

        mountFrame = 0;

        controller?.destroy();
        controller = null;

        root.classList.remove("motion-ready");

        renderCleanups.forEach(cleanup => cleanup());
        renderCleanups = [];

        container
            .querySelectorAll(
                ".project-card, [data-designer-detail-status]"
            )
            .forEach(node => node.remove());

        function showStatus(message) {
            const paragraph = createNode(
                "p",
                "designer-detail-status",
                message
            );

            paragraph.setAttribute(
                "data-designer-detail-status",
                ""
            );

            paragraph.setAttribute("role", "status");

            container.appendChild(paragraph);
            resizeLenis();
        }

        if (
            !Array.isArray(window.DESIGNERS) ||
            !Array.isArray(window.PROJECTS)
        ) {
            fillProfile(null);

            showStatus(
                "디자이너 정보를 불러오지 못했습니다."
            );

            console.warn(
                "[DesignerDetail] DESIGNERS와 PROJECTS 데이터 파일을 designer-detail.js보다 먼저 불러오세요."
            );

            return false;
        }

        const id = selectedDesignerId();

        if (!id) {
            fillProfile(null);
            showStatus("디자이너를 선택해 주세요.");

            console.warn(
                "[DesignerDetail] 주소에 ?id=학생ID를 넣거나 .main에 data-designer-id를 지정하세요."
            );

            return false;
        }

        const designer = window.DESIGNERS.find(
            item => item && String(item.id) === id
        );

        if (!designer) {
            fillProfile(null);

            showStatus(
                "해당 디자이너를 찾을 수 없습니다."
            );

            console.warn(
                "[DesignerDetail] 등록되지 않은 디자이너 ID:",
                id
            );

            return false;
        }

        fillProfile(designer);

        const projectMap = new Map(
            window.PROJECTS
                .filter(item => item && item.id != null)
                .map(item => [String(item.id), item])
        );

        const ids = [
            ...new Set(
                (
                    Array.isArray(designer.projectIds)
                        ? designer.projectIds
                        : []
                ).map(String)
            )
        ];

        const missing = ids.filter(
            projectId => !projectMap.has(projectId)
        );

        if (missing.length) {
            console.warn(
                "[DesignerDetail] PROJECTS에서 찾을 수 없는 projectIds:",
                missing
            );
        }

        const project = projectMap.get(ids[0]);

        if (!project) {
            showStatus(
                ids.length
                    ? "참여 프로젝트 정보를 불러오지 못했습니다."
                    : "등록된 프로젝트가 없습니다."
            );

            return true;
        }

        const courseCards = getCourseCards(project);

        const cards = courseCards.map(
            (courseCard, index) =>
                createProjectCard(courseCard, index === 0)
        );

        const fragment = document.createDocumentFragment();

        cards.forEach(card => {
            fragment.appendChild(card);
        });

        container.appendChild(fragment);

        bindActiveCards(cards);
        mount();
        resizeLenis();

        return true;
    }

    /* ==================== 스크롤 애니메이션 연결 ==================== */

    function findElements() {
        const section = document.getElementById(
            "handoffSection"
        );

        const stage = section?.querySelector("#stickyStage");
        const list = section?.querySelector("#listLayer");

        const target = list?.querySelector(
            "#firstProjectThumb"
        );

        const flyer =
            target?.querySelector("#heroFlyer") ||
            (
                controller?.nodes.target === target
                    ? controller.nodes.flyer
                    : null
            );

        const media = flyer?.querySelector("#mediaFrame");
        const image = media?.querySelector("#projectImage");

        if (
            !section ||
            !stage ||
            !list ||
            !target ||
            !flyer ||
            !media ||
            !image
        ) {
            return null;
        }

        return {
            section,
            stage,
            list,
            target,
            flyer,
            media,
            image,
            title: flyer.querySelector("#heroTitle"),
            overlay: flyer.querySelector("#heroOverlay")
        };
    }

    function scheduleMount() {
        if (stopped || mountFrame) return;

        mountFrame = requestAnimationFrame(() => {
            mountFrame = 0;
            mount();
        });
    }

    function mount() {
        if (stopped) return;

        const nodes = findElements();

        if (
            nodes &&
            controller &&
            Object.keys(nodes).every(
                key => nodes[key] === controller.nodes[key]
            )
        ) {
            controller.refresh();
            return;
        }

        controller?.destroy();

        controller = nodes
            ? createController(nodes)
            : null;
    }

    /* ==================== 스크롤 애니메이션 ==================== */

    function createController(nodes) {
        const {
            section,
            stage,
            list,
            target,
            flyer,
            media,
            image,
            title,
            overlay
        } = nodes;

        const listeners = [];

        let frame = 0;
        let dead = false;
        let active = false;
        let needsMeasure = true;
        let geometry = null;
        let sourceWidth = 0;
        let sourceHeight = 0;

        const projectCard = target.closest(".project-card");
        const cardTransitions = new Set();

        function listen(element, event, callback, options) {
            element.addEventListener(
                event,
                callback,
                options
            );

            listeners.push(() => {
                element.removeEventListener(
                    event,
                    callback,
                    options
                );
            });
        }

        function requestUpdate() {
            if (!dead && !frame) {
                frame = requestAnimationFrame(update);
            }
        }

        function requestMeasure() {
            needsMeasure = true;
            requestUpdate();
        }

        function hideLabels() {
            if (title) title.style.opacity = "0";
            if (overlay) overlay.style.opacity = "0";
        }

        function dock() {
            if (flyer.parentElement !== target) {
                target.appendChild(flyer);
            }

            flyer.classList.add("is-docked");

            Object.assign(flyer.style, {
                width: "100%",
                height: "100%",
                transform: "none",
                borderRadius: "inherit",
                opacity: "1"
            });

            hideLabels();
        }

        function fitMedia(width, height) {
            const scale = Math.max(
                width / sourceWidth,
                height / sourceHeight
            );

            const x =
                (width - sourceWidth * scale) *
                clamp(CONFIG.focalX);

            const y =
                (height - sourceHeight * scale) *
                clamp(CONFIG.focalY);

            media.style.width = `${sourceWidth}px`;
            media.style.height = `${sourceHeight}px`;

            media.style.transform =
                `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }

        function setActive(next) {
            if (active === next) return;

            const scrollBefore = window.scrollY;

            const sectionTop =
                section.getBoundingClientRect().top +
                scrollBefore;

            const targetTop =
                target.getBoundingClientRect().top;

            active = next;

            root.classList.toggle(
                "motion-ready",
                active
            );

            const anchorScroll =
                target.getBoundingClientRect().top +
                window.scrollY -
                targetTop;

            resizeLenis();

            if (
                section.isConnected &&
                target.isConnected &&
                scrollBefore > sectionTop + 1
            ) {
                scrollInstantly(anchorScroll);
            }

            needsMeasure = true;
        }

        function syncTitle() {
            const heading = target
                .closest(".project-card")
                ?.querySelector(".card-copy h3");

            const text = heading?.textContent.trim();

            if (
                title &&
                text &&
                title.textContent !== text
            ) {
                title.textContent = text;
            }
        }

        function measure() {
            const vh = window.innerHeight;

            const vw =
                stage.getBoundingClientRect().width ||
                root.clientWidth;

            section.style.setProperty(
                "--stage-height",
                `${vh}px`
            );

            section.style.setProperty(
                "--motion-travel",
                `${vh * CONFIG.travelScreens}px`
            );

            const listRect = list.getBoundingClientRect();
            const card = target.getBoundingClientRect();

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;

            /*
             * 첫 카드가 접혀 있어도 펼친 높이를 기준으로
             * 확대 크기와 스크롤 도착 지점을 유지합니다.
             */
            const reservedHeight =
                parseFloat(
                    getComputedStyle(list)
                        .getPropertyValue("--open-height")
                ) || 380;

            const row = projectCard
                ? projectCard.getBoundingClientRect()
                : card;

            const cardOffset =
                row.top - listRect.top;

            const landingTop = Math.max(
                12,
                Math.min(
                    vh * 0.1,
                    vh - cardOffset - reservedHeight - 32
                )
            );

            const desiredEndScroll =
                listRect.top +
                window.scrollY -
                landingTop;

            const scrollElement =
                document.scrollingElement || root;

            const maxScroll = Math.max(
                0,
                scrollElement.scrollHeight -
                scrollElement.clientHeight
            );

            const endScroll = Math.min(
                desiredEndScroll,
                Math.max(0, maxScroll - 1)
            );

            const range = Math.max(
                1,
                endScroll - sectionTop
            );

            const targetStyle = getComputedStyle(target);

            const localWidth =
                parseFloat(targetStyle.width) ||
                target.clientWidth ||
                card.width;

            const localHeight =
                parseFloat(targetStyle.height) ||
                target.clientHeight ||
                card.height;

            const radii = [
                "borderTopLeftRadius",
                "borderTopRightRadius",
                "borderBottomRightRadius",
                "borderBottomLeftRadius"
            ].map(
                property =>
                    parseFloat(targetStyle[property]) || 0
            );

            const fullCardHeight =
                reservedHeight || localHeight;

            geometry = {
                vw,
                vh,
                sectionTop,
                endScroll,
                range,
                radii,
                localWidth,
                localHeight,
                fullCardHeight
            };

            needsMeasure = false;
        }

        function update() {
            frame = 0;

            if (
                dead ||
                !target.isConnected ||
                !flyer.isConnected
            ) {
                return;
            }

            const hasSource = Boolean(
                image.getAttribute("src")?.trim() ||
                image.getAttribute("srcset")?.trim()
            );

            const loaded =
                hasSource &&
                image.complete &&
                image.naturalWidth > 0 &&
                image.naturalHeight > 0;

            if (!loaded || reducedMotion.matches) {
                setActive(false);
                dock();

                Object.assign(media.style, {
                    width: "100%",
                    height: "100%",
                    transform: "none"
                });

                image.style.objectPosition =
                    `${clamp(CONFIG.focalX) * 100}% ${clamp(CONFIG.focalY) * 100}%`;

                return;
            }

            sourceWidth = image.naturalWidth;
            sourceHeight = image.naturalHeight;

            if (!active) {
                section.style.setProperty(
                    "--stage-height",
                    `${window.innerHeight}px`
                );

                section.style.setProperty(
                    "--motion-travel",
                    `${window.innerHeight * CONFIG.travelScreens}px`
                );

                setActive(true);
            }

            if (needsMeasure || !geometry) {
                measure();
            }

            const card = target.getBoundingClientRect();

            if (card.width <= 0 || card.height <= 0) {
                dock();
                return;
            }

            const {
                vw,
                vh,
                sectionTop,
                endScroll,
                range,
                radii,
                localWidth,
                localHeight,
                fullCardHeight
            } = geometry;

            const progress =
                window.scrollY >= endScroll
                    ? 1
                    : clamp(
                        (window.scrollY - sectionTop) /
                        range
                    );

            if (progress >= 1) {
                dock();
                fitMedia(localWidth, localHeight);
                return;
            }

            if (flyer.parentElement !== stage) {
                stage.appendChild(flyer);
            }

            flyer.classList.remove("is-docked");

            const stageRect =
                stage.getBoundingClientRect();

            const fullHeight =
                CONFIG.fullMode === "viewport"
                    ? vh
                    : vw * fullCardHeight / localWidth;

            const fullY = (vh - fullHeight) / 2;

            const initialHeight = Math.min(
                vh * CONFIG.bannerHeight,
                fullHeight * 0.65
            );

            let width = vw;
            let height = fullHeight;
            let x = 0;
            let y = fullY;
            let radius = "0px";
            let flyerOpacity = 1;

            if (progress < CONFIG.expandEnd) {
                const p = smooth(
                    clamp(progress / CONFIG.expandEnd)
                );

                height = lerp(
                    initialHeight,
                    fullHeight,
                    p
                );

                y = (vh - height) / 2;

                radius =
                    `${lerp(CONFIG.bannerRadius, 0, p)}px`;
            } else if (progress >= CONFIG.shrinkStart) {
                const t = clamp(
                    (progress - CONFIG.shrinkStart) /
                    (1 - CONFIG.shrinkStart)
                );

                const p = smooth(t);

                const remainingScroll =
                    endScroll - window.scrollY;

                const landingY =
                    card.top - remainingScroll;

                const shrinkDistance =
                    range * (1 - CONFIG.shrinkStart);

                width = lerp(vw, card.width, p);
                height = lerp(fullHeight, card.height, p);

                x = lerp(
                    0,
                    card.left - stageRect.left,
                    p
                );

                y =
                    lerp(fullY, landingY, p) +
                    shrinkDistance * t * t * (1 - t) -
                    stageRect.top;

                const cardScale =
                    card.width / localWidth;

                radius = radii
                    .map(
                        value =>
                            `${lerp(0, value * cardScale, p)}px`
                    )
                    .join(" ");

                const targetOpacity = parseFloat(
                    getComputedStyle(target).opacity
                );

                flyerOpacity = lerp(
                    1,
                    Number.isFinite(targetOpacity)
                        ? targetOpacity
                        : 1,
                    p
                );
            }

            Object.assign(flyer.style, {
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                borderRadius: radius,
                opacity: String(flyerOpacity)
            });

            fitMedia(width, height);

            const titleIn = smooth(
                clamp(
                    (progress - CONFIG.expandEnd * 0.6) /
                    (CONFIG.expandEnd * 0.4)
                )
            );

            const titleOut =
                1 - smooth(
                    clamp(
                        (progress - CONFIG.shrinkStart) /
                        0.22
                    )
                );

            const opacity = String(
                titleIn * titleOut
            );

            if (title) {
                title.style.opacity = opacity;

                title.style.transform =
                    `translateY(${lerp(18, 0, titleIn)}px)`;
            }

            if (overlay) {
                overlay.style.opacity = opacity;
            }

            if (cardTransitions.size) {
                requestUpdate();
            }
        }

        function refresh() {
            syncTitle();
            requestMeasure();
        }

        const mutationObserver = new MutationObserver(
            records => {
                const externalChange = records.some(
                    record => {
                        if (
                            title &&
                            (
                                record.target === title ||
                                title.contains(record.target)
                            )
                        ) {
                            return false;
                        }

                        if (record.type !== "childList") {
                            return true;
                        }

                        const changed = [
                            ...record.addedNodes,
                            ...record.removedNodes
                        ];

                        return changed.some(
                            node => node !== flyer
                        );
                    }
                );

                if (externalChange) {
                    scheduleMount();
                }
            }
        );

        mutationObserver.observe(section, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ["src", "srcset", "sizes"]
        });

        const resizeObserver =
            typeof ResizeObserver === "function"
                ? new ResizeObserver(requestMeasure)
                : null;

        [
            target,
            list,
            document.body,
            document.querySelector(".intro"),
            document.querySelector(".header"),
            document.querySelector(".footer")
        ]
            .filter(Boolean)
            .forEach(element => {
                resizeObserver?.observe(element);
            });

        listen(
            window,
            "scroll",
            requestUpdate,
            { passive: true }
        );

        listen(window, "resize", requestMeasure);
        listen(window, "pageshow", refresh);
        listen(image, "load", refresh);
        listen(image, "error", requestMeasure);
        listen(reducedMotion, "change", refresh);

        if (projectCard) {
            const trackCardTransition = event => {
                if (
                    event.target !== projectCard ||
                    !["transform", "scale"]
                        .includes(event.propertyName)
                ) {
                    return;
                }

                if (event.type === "transitionrun") {
                    cardTransitions.add(
                        event.propertyName
                    );
                } else {
                    cardTransitions.delete(
                        event.propertyName
                    );
                }

                requestUpdate();
            };

            [
                "transitionrun",
                "transitionend",
                "transitioncancel"
            ].forEach(event => {
                listen(
                    projectCard,
                    event,
                    trackCardTransition
                );
            });

            [
                "pointerenter",
                "pointerleave",
                "focusin",
                "focusout"
            ].forEach(event => {
                listen(
                    projectCard,
                    event,
                    requestUpdate
                );
            });
        }

        document.fonts?.ready.then(() => {
            if (!dead) requestMeasure();
        });

        refresh();

        return {
            nodes,
            refresh,

            destroy() {
                dead = true;

                if (frame) {
                    cancelAnimationFrame(frame);
                }

                mutationObserver.disconnect();
                resizeObserver?.disconnect();

                listeners.forEach(remove => remove());

                setActive(false);

                if (target.isConnected) {
                    dock();
                } else if (flyer.parentElement === stage) {
                    flyer.remove();
                }

                Object.assign(media.style, {
                    width: "100%",
                    height: "100%",
                    transform: "none"
                });

                section.style.removeProperty(
                    "--stage-height"
                );

                section.style.removeProperty(
                    "--motion-travel"
                );
            }
        };
    }

    /* ==================== 공개 API / 초기 실행 ==================== */

    if (
        typeof window.DesignerDetail?.destroy === "function"
    ) {
        window.DesignerDetail.destroy();
    } else {
        window.DesignerHandoff?.destroy?.();
    }

    function destroy() {
        stopped = true;

        if (mountFrame) {
            cancelAnimationFrame(mountFrame);
        }

        document.removeEventListener(
            "DOMContentLoaded",
            renderDetail
        );

        window.removeEventListener(
            "popstate",
            renderDetail
        );

        window.removeEventListener(
            "designer-data-ready",
            renderDetail
        );

        controller?.destroy();
        controller = null;

        renderCleanups.forEach(cleanup => cleanup());
        renderCleanups = [];
    }

    window.DesignerHandoff = {
        refresh: scheduleMount,
        destroy
    };

    window.DesignerDetail = {
        render: renderDetail,
        destroy
    };

    window.addEventListener(
        "popstate",
        renderDetail
    );

    window.addEventListener(
        "designer-data-ready",
        renderDetail
    );

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            renderDetail,
            { once: true }
        );
    } else {
        renderDetail();
    }
})();