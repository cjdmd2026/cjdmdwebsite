(() => {
    "use strict";

    /* ==================== 조절할 값 ==================== */

    const CONFIG = {
        designerId: "",
        fullMode: "ratio",       // "ratio" 또는 "viewport"
        travelScreens: 3.1,
        expandLeadScreens: 0.65, // 섹션이 상단에 닿기 전부터 확대를 시작합니다.
        expandEnd: 0.05,
        shrinkStart: 0.52,
        bannerHeight: 0.36,
        bannerRadius: 0,
        focalX: 0.5,
        focalY: 0.5,

        // 프로필 ↔ 최대 확대 이미지 ↔ 카드 목록 시작
        stepScroll: true,
        stepDuration: 1500,       // 전체 화면 ↔ 카드 목록(ms)
        profileStepDuration: 2200, // 프로필 ↔ 전체 화면(ms)
        wheelThreshold: 12,      // 작을수록 가벼운 스크롤에도 반응
        gestureIdle: 0         // 다음 제스처로 판단할 입력 간격(ms)
    };

    const COURSE_CARDS = [
        { id: "interactive", label: "INTERACTIVE DESIGN" },
        { id: "service", label: "SERVICE DESIGN" },
        { id: "interface", label: "INTERFACE DESIGN" }
    ];

    const root = document.documentElement;
    const compactLayout = matchMedia(document.querySelector("script[data-compact-layout]")?.dataset.compactLayout || "(max-width: 759px)");

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
    const easeInOutSine = t => (1 - Math.cos(Math.PI * t)) / 2;

    let controller = null;
    let mountFrame = 0;
    let stopped = false;
    let renderCleanups = [];
    let profileLenis = null;

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

    function syncSmoothScroll() {
        if (compactLayout.matches || stopped) {
            profileLenis?.destroy();
            if (window.lenis === profileLenis) window.lenis = null;
            profileLenis = null;
            return;
        }
        window.DesktopFeaturesReady?.then(() => {
            if (compactLayout.matches || stopped || !window.Lenis || getLenis()) return;
            profileLenis = new window.Lenis({duration: 1, smoothWheel: true, wheelMultiplier: 0.75, autoRaf: true});
            window.lenis = profileLenis;
        });
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

    /* ==================== 단계별 휠 스크롤 ==================== */

    function createStepScroller(getStops) {
        const tolerance = 4;
        let animationFrame = 0;
        let resizeFrame = 0;
        let restingIndex = null;
        let moving = false;
        let gestureUsed = false;
        let lastWheelAt = -Infinity;
        let wheelTotal = 0;

        // 입력창, 별도 스크롤 영역, 팝업 안에서는 원래 휠 동작 유지.
        function isIndependentScroll(event, direction) {
            for (const element of event.composedPath()) {
                if (!(element instanceof Element)) continue;
                if (element === document.body || element === root) break;

                if (element.matches(
                    'input, textarea, select, [contenteditable]:not([contenteditable="false"]), ' +
                    '[role="dialog"], dialog, [data-lenis-prevent], [data-lenis-prevent-wheel]'
                )) return true;

                const overflow = getComputedStyle(element).overflowY;
                if (!/auto|scroll|overlay/.test(overflow)) continue;
                const limit = element.scrollHeight - element.clientHeight;
                if (limit <= 1) continue;

                if (
                    (direction < 0 && element.scrollTop > 0) ||
                    (direction > 0 && element.scrollTop < limit - 1)
                ) return true;
            }
            return false;
        }

        function cancel() {
            cancelAnimationFrame(animationFrame);
            cancelAnimationFrame(resizeFrame);
            animationFrame = 0;
            resizeFrame = 0;
            restingIndex = null;
            moving = false;
            gestureUsed = false;
            wheelTotal = 0;
            lastWheelAt = -Infinity;
        }

        function consumeWheel(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        function moveTo(index, fullImageTop) {
            const from = window.scrollY;
            const profileStep = index === 0 || (index === 1 && from < fullImageTop);
            const duration = profileStep ? CONFIG.profileStepDuration : CONFIG.stepDuration;
            const ease = profileStep ? easeInOutSine : smooth;
            const startedAt = performance.now();
            moving = true;
            restingIndex = null;
            gestureUsed = true;
            wheelTotal = 0;

            // 진행 중이던 Lenis 관성을 현재 위치에서 정리.
            scrollInstantly(from);

            function tick(now) {
                const stops = getStops();
                if (!stops) {
                    cancel();
                    return;
                }

                const progress = clamp((now - startedAt) / duration);

                // 매 프레임 도착 위치를 읽어 화면 크기 변경도 반영.
                scrollInstantly(lerp(from, stops[index], ease(progress)));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(tick);
                } else {
                    animationFrame = 0;
                    moving = false;
                    restingIndex = index;
                }
            }

            animationFrame = requestAnimationFrame(tick);
        }

        function onWheel(event) {
            if (
                !CONFIG.stepScroll || event.defaultPrevented ||
                !event.cancelable || event.ctrlKey || event.metaKey ||
                event.shiftKey || !event.deltaY ||
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ) return;

            const direction = Math.sign(event.deltaY);
            if (isIndependentScroll(event, direction)) return;

            const stops = getStops();
            if (!stops) return;

            const now = performance.now();
            const freshGesture = now - lastWheelAt > CONFIG.gestureIdle;
            lastWheelAt = now;

            // 한 번의 휠/트랙패드 관성으로 다음 단계까지 넘어가지 않음.
            if (moving || (gestureUsed && !freshGesture)) {
                consumeWheel(event);
                return;
            }
            if (freshGesture) {
                gestureUsed = false;
                wheelTotal = 0;
            }

            const unit = event.deltaMode === 1 ? 16
                : event.deltaMode === 2 ? window.innerHeight : 1;
            const delta = event.deltaY * unit;
            const current = window.scrollY;
            const last = stops.length - 1;
            let next = -1;

            if (current > stops[last] + tolerance) {
                // 목록 내부는 자유롭게 스크롤. 위로 돌아올 때 시작점에서 정지.
                const pending = getLenis()?.targetScroll;
                const projected = (Number.isFinite(pending) ? pending : current) + delta;
                if (direction < 0 && projected <= stops[last]) next = last;
            } else if (direction > 0) {
                next = stops.findIndex(stop => stop > current + tolerance);
            } else {
                for (let index = last; index >= 0; index--) {
                    if (stops[index] < current - tolerance) {
                        next = index;
                        break;
                    }
                }
            }

            if (next < 0) {
                restingIndex = null;
                wheelTotal = 0;
                return;
            }

            // Lenis보다 먼저 입력을 잡아 자동 이동과 일반 스크롤의 충돌 방지.
            consumeWheel(event);
            if (Math.sign(wheelTotal) !== direction) wheelTotal = 0;
            wheelTotal += delta;
            if (Math.abs(wheelTotal) >= CONFIG.wheelThreshold) moveTo(next, stops[1]);
        }

        function onResize() {
            if (moving || restingIndex === null) return;
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
                resizeFrame = 0;
                const stops = getStops();
                if (stops && restingIndex !== null) {
                    resizeLenis();
                    scrollInstantly(stops[restingIndex]);
                }
            });
        }

        window.addEventListener("wheel", onWheel, {
            capture: true,
            passive: false
        });
        // 스크롤바/터치/키보드 조작은 사용자가 직접 위치를 바꾸려는 동작.
        window.addEventListener("pointerdown", cancel, true);
        window.addEventListener("touchstart", cancel, { passive: true, capture: true });
        window.addEventListener("keydown", cancel, true);
        window.addEventListener("resize", onResize);

        return {
            cancel,
            destroy() {
                cancel();
                window.removeEventListener("wheel", onWheel, true);
                window.removeEventListener("pointerdown", cancel, true);
                window.removeEventListener("touchstart", cancel, true);
                window.removeEventListener("keydown", cancel, true);
                window.removeEventListener("resize", onResize);
            }
        };
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
        const emailItem = profile.querySelector(".contact-email");
        const emailLink = emailItem?.querySelector("a");
        const instagramItem = profile.querySelector(".contact-instagram");
        const instagramLink = instagramItem?.querySelector("a");
        const membersItem = profile.querySelector(".contact-members");
        const membersText = membersItem?.querySelector("span");

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

        const email = typeof designer?.email === "string"
            ? designer.email.trim()
            : "";

        if (emailLink) {
            emailLink.textContent = email;
            emailLink.href = email ? `mailto:${email}` : "";
        }

        if (emailItem) emailItem.hidden = !email;

        const instagram = typeof designer?.instagram === "string"
            ? designer.instagram.trim()
            : "";
        const instagramId = instagram
            .replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, "")
            .replace(/^@/, "")
            .replace(/\/?(?:\?.*)?$/, "");

        if (instagramLink) {
            instagramLink.textContent = instagramId ? `@${instagramId}` : "";
            instagramLink.href = instagramId
                ? `https://www.instagram.com/${encodeURIComponent(instagramId)}/`
                : "";
        }

        if (instagramItem) {
            instagramItem.hidden = !instagramId;
            // CSS의 display: grid가 hidden을 덮어써도 아이콘을 포함한 행 전체를 숨깁니다.
            instagramItem.style.display = instagramId ? "" : "none";
        }

        const designerMap = new Map(
            (Array.isArray(window.DESIGNERS) ? window.DESIGNERS : [])
                .filter(item => item?.id)
                .map(item => [String(item.id), item])
        );
        const memberNames = (
            Array.isArray(designer?.teammateIds)
                ? designer.teammateIds
                : []
        )
            .map(id => designerMap.get(String(id))?.nameKo?.trim())
            .filter(Boolean);

        if (membersText) membersText.textContent = memberNames.join(", ");
        if (membersItem) {
            membersItem.hidden = memberNames.length === 0;
            membersItem.style.display = memberNames.length ? "" : "none";
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

        // 사진과 그라디언트 마스크에 같은 이미지를 사용해 실루엣을 맞춥니다.
        portrait.style.setProperty(
            "--portrait-image",
            url ? `url(${JSON.stringify(url)})` : "none"
        );

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
                projectTitle: project.title || "",
                logo: text(project.logo),
                profileLogo: text(project.profileLogo),
                imageFit: entry.imageFit === "contain" ? "contain" : "cover",

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

        if (!compactLayout.matches) card.tabIndex = 0;

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
        image.style.objectFit = project.imageFit || "cover";
        image.dataset.imageFit = project.imageFit || "cover";

        if (isFirst) {
            thumb.id = "firstProjectThumb";
            image.id = "projectImage";
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

        if (isFirst && !compactLayout.matches) {
            const flyer = createNode(
                "div",
                "hero-flyer is-docked"
            );

            flyer.id = "heroFlyer";

            const media = createNode("div", "media-frame");
            media.id = "mediaFrame";

            const overlay = createNode("div", "hero-overlay");
            overlay.id = "heroOverlay";
            overlay.setAttribute("aria-hidden", "true");

            const title = createNode(
                "div",
                "hero-title",
                project.projectTitle || project.title || ""
            );

            title.id = "heroTitle";
            title.setAttribute("aria-hidden", "true");
            title.dataset.projectTitle = project.projectTitle || project.title || "";

            const logoSource = resolveAssetPath(project.logo);
            if (logoSource) {
                const logo = createNode("img", "hero-logo");
                logo.dataset.projectId = project.id;
                logo.alt = `${title.dataset.projectTitle} 로고`;
                logo.decoding = "async";
                const preview = resolveAssetPath(project.profileLogo);
                const fallback = () => {
                    if (preview && logo.src !== logoSource) {
                        logo.src = logoSource;
                        return;
                    }
                    title.textContent = title.dataset.projectTitle;
                };
                logo.addEventListener("error", fallback);
                renderCleanups.push(() => logo.removeEventListener("error", fallback));
                logo.src = preview || logoSource;
                title.replaceChildren(logo);
            }

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
        const listTitle = container.querySelector(".list-title");
        const projectLink = container.querySelector(".profile-project-link");
        listTitle.textContent = "전시 목록";
        projectLink.hidden = true;
        projectLink.removeAttribute("href");

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

        const floatingBackground = window.DesignerFloatingBackground?.mount(
            document.querySelector(".main"), designer
        );
        if (floatingBackground) renderCleanups.push(floatingBackground.destroy);

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
        if (compactLayout.matches) {
            listTitle.textContent = project.title || "전시 목록";
            if (project.url) {
                projectLink.href = new URL(project.url, new URL("project/", siteRoot)).href;
                projectLink.hidden = false;
            }
        }

        const cards = courseCards.map(
            (courseCard, index) =>
                createProjectCard(courseCard, index === 0)
        );

        const fragment = document.createDocumentFragment();

        cards.forEach(card => {
            fragment.appendChild(card);
        });

        container.appendChild(fragment);

        if (!compactLayout.matches) {
            bindActiveCards(cards);
            mount();
        }
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
        if (stopped || compactLayout.matches) return;

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
        const header = document.querySelector('.header');
        let fullImageVisible = false;
        let pointerNearHeader = header?.matches(':hover') ?? false;

        let frame = 0;
        let dead = false;
        let active = false;
        let needsMeasure = true;
        let geometry = null;
        let sourceWidth = 0;
        let sourceHeight = 0;

        const fullStopProgress = (CONFIG.expandEnd + CONFIG.shrinkStart) / 2;
        const stepScroller = createStepScroller(() => {
            if (
                dead || !active || reducedMotion.matches ||
                !image.complete || !image.naturalWidth || !target.isConnected
            ) return null;

            if (needsMeasure || !geometry) measure();

            return geometry.stops;
        });

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

        function syncHeader(fullImage = fullImageVisible) {
            fullImageVisible = fullImage;
            header?.classList.toggle('is-full-image-hidden', fullImage && !pointerNearHeader);
        }

        function dock() {
            syncHeader(false);
            if (flyer.parentElement !== target) {
                target.appendChild(flyer);
            }

            flyer.classList.add("is-docked");

            Object.assign(flyer.style, {
                width: "100%",
                height: "100%",
                transform: "none",
                clipPath: "none",
                borderRadius: "inherit",
                opacity: "1"
            });

            hideLabels();
        }

        function fitMedia(width, height) {
            const fit = image.dataset.imageFit === "contain" ? Math.min : Math.max;
            const scale = fit(
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

            if (!next) stepScroller.cancel();

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
            // Keep the submitted logo intact during scroll/resize refreshes.
            if (title?.querySelector(".hero-logo")) return;

            const heading = target
                .closest(".project-card")
                ?.querySelector(".card-copy h3");

            const text = title?.dataset.projectTitle || heading?.textContent.trim();

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

            const intro = document.querySelector(".intro");
            const profileTop = intro
                ? Math.max(0, intro.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0))
                : 0;
            geometry = {
                vw,
                vh,
                sectionTop,
                endScroll,
                range,
                radii,
                localWidth,
                localHeight,
                hasCardSize: card.width > 0 && card.height > 0,
                fullCardHeight,
                stops: [profileTop, sectionTop + range * fullStopProgress, Math.ceil(endScroll)]
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

            if (!geometry.hasCardSize) {
                dock();
                return;
            }
            const progress =
                window.scrollY >= endScroll
                    ? 1
                    : clamp(
                        (window.scrollY - sectionTop) /
                        range
                    );

            syncHeader(progress >= CONFIG.expandEnd && progress < CONFIG.shrinkStart);

            if (progress >= 1) {
                dock();
                fitMedia(localWidth, localHeight);
                return;
            }

            const fullHeight =
                CONFIG.fullMode === "viewport"
                    ? vh
                    : vw * fullCardHeight / localWidth;

            const fullY = (vh - fullHeight) / 2;
            const stageRect = stage.getBoundingClientRect();

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

            const expandLead = vh * CONFIG.expandLeadScreens;
            const expandProgress = clamp(
                (window.scrollY - sectionTop + expandLead) /
                (expandLead + range * CONFIG.expandEnd)
            );

            if (expandProgress < 1) {
                const p = smooth(expandProgress);

                height = lerp(
                    initialHeight,
                    fullHeight,
                    p
                );

                y = (vh - height) / 2;

                radius =
                    `${lerp(CONFIG.bannerRadius, 0, p)}px`;
            } else if (progress >= CONFIG.shrinkStart) {
                const card = target.getBoundingClientRect();
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

            if (flyer.parentElement !== stage) stage.appendChild(flyer);
            flyer.classList.remove("is-docked");
            // Crop a stable surface. Resizing its layout box every scroll frame
            // also forces layout for the image, gradient, and logo inside it.
            const surfaceWidth = Math.max(vw, width);
            const surfaceHeight = Math.max(fullHeight, height);
            Object.assign(flyer.style, {
                width: `${surfaceWidth}px`,
                height: `${surfaceHeight}px`,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                clipPath: `inset(0 ${surfaceWidth - width}px ${surfaceHeight - height}px 0 round ${radius})`,
                borderRadius: "0",
                opacity: String(flyerOpacity)
            });

            fitMedia(width, height);

            const titleIn = smooth(clamp((expandProgress - 0.6) / 0.4));

            if (title) {
                const logoExit = smooth(clamp(
                    (progress - fullStopProgress) / (CONFIG.shrinkStart - fullStopProgress)
                ));
                // Measure the CSS bottom inset from the visible edge when the image extends below the viewport.
                const visibleBottom = Math.min(height, vh - stageRect.top - y);
                title.style.opacity = String(titleIn * (1 - logoExit));
                title.style.transform = `translateY(${visibleBottom - surfaceHeight + lerp(18, 0, titleIn) + 32 * logoExit}px)`;
            }

            if (overlay) {
                const overlayOut = 1 - smooth(clamp((progress - CONFIG.shrinkStart) / 0.22));
                overlay.style.opacity = String(titleIn * overlayOut);
                overlay.style.transform = `scale(${width / surfaceWidth}, ${height / surfaceHeight})`;
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
            header,
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
        if (header) {
            listen(document, 'pointermove', event => {
                if (event.pointerType === 'touch') return;
                const near = event.clientY <= header.offsetHeight + (pointerNearHeader ? 16 : 0);
                if (near === pointerNearHeader) return;
                pointerNearHeader = near;
                syncHeader();
            }, { passive: true });
            listen(document, 'pointerleave', () => {
                pointerNearHeader = false;
                syncHeader();
            }, { passive: true });
        }
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
                syncHeader(false);
                stepScroller.destroy();

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

    function changeLayout() {
        syncSmoothScroll();
        renderDetail();
    }

    const backLink = document.querySelector(".back-button");
    function returnToDesigners(event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!document.referrer || !backLink || history.length < 2) return;
        const previous = new URL(document.referrer);
        if (previous.origin !== location.origin || previous.pathname.replace(/index\.html$/, "") !== new URL(backLink.href).pathname) return;
        event.preventDefault();
        if (window.PageTransition) window.PageTransition.back(1);
        else history.back();
    }

    if (
        typeof window.DesignerDetail?.destroy === "function"
    ) {
        window.DesignerDetail.destroy();
    } else {
        window.DesignerHandoff?.destroy?.();
    }

    function destroy() {
        stopped = true;
        syncSmoothScroll();
        compactLayout.removeEventListener("change", changeLayout);
        backLink?.removeEventListener("click", returnToDesigners);

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

    syncSmoothScroll();
    compactLayout.addEventListener("change", changeLayout);
    backLink?.addEventListener("click", returnToDesigners);

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
