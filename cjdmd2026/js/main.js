/* =========================================================
   Main Page — 섹션 스크립트
   1. 배경 아이콘 (ambient) — 위치·크기는 1920 시안에서 측정한 프리셋
      · hero      : 포스터 정착 후 보이며 오른쪽으로 천천히 흐름
      · committee : 양옆 사이드에서 제자리 떠다님
      · professor : 카드 앞쪽, 양옆 사이드
   2. 졸업 전시 위원회 (안1: 조작 없이도 일정 시간마다 다음 부서로 자동 슬라이드)
   3. 교수진 소개 (원통형 3D 슬라이더)
   4. 졸업 전시 유튜브 (화살표 → 사라짐 → 영상들이 이동 → 화살표 다시 나타남)
   5. 모바일 메뉴
   데이터: main-data.js / designer-data.js / designer-icon-data.js / main-icon-fragments.js
   ========================================================= */
(() => {
    "use strict";

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const scriptURL = document.currentScript?.src || document.baseURI;
    const FRAGMENTS = window.MAIN_ICON_FRAGMENTS || {};
    const FRAGMENT_IDS = Object.keys(FRAGMENTS);
    // 개인 조각의 배정과 색은 디자이너 페이지와 같은 데이터를 사용합니다.
    // SVG 도형은 main-icon-fragments.js에 추출된 개인 조각을 재사용합니다.
    const DESIGNER_ICON_COLORS = new Map((window.DESIGNER_ICON_PROJECTS || [])
        .flatMap(project => Object.entries(project.studentColors || {})));
    const SVG_NS = "http://www.w3.org/2000/svg";
    const rand = (a, b) => a + Math.random() * (b - a);
    const wait = ms => new Promise(r => setTimeout(r, reducedMotion.matches ? 0 : ms));

    /* 학생 개인 조각 아이콘 SVG (fill = currentColor) */
    function fragmentSVG(id) {
        const frag = FRAGMENTS[id];
        if (!frag) return null;
        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("viewBox", frag.viewBox);
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.innerHTML = frag.svg;
        return svg;
    }

    /* =====================================================
       1. Ambient icons
       프리셋: [x(%), y(%), 크기(vw), 밝기(0~255)]  — 밝은 것(>=236)은 살짝 흐리게
    ===================================================== */
    const AMBIENT = {
        hero: {
            colored: true,
            flow: [10, 22],   // 오른쪽으로 흐르는 속도(px/s, 1920 기준)
            presets: [[72.8, 30.6, 2.14, 238], [58.3, 31.3, 1.93, 238], [12.2, 36.0, 2.19, 226], [48.9, 36.5, 2.03, 239], [75.9, 37.3, 2.6, 218], [93.7, 38.0, 2.24, 218], [70.6, 42.3, 2.24, 238], [8.6, 45.0, 2.34, 219], [47.2, 45.0, 1.67, 240], [3.2, 47.0, 1.88, 240], [71.8, 47.4, 2.24, 238], [13.3, 47.4, 2.03, 239], [71.1, 55.0, 2.03, 242], [10.6, 56.3, 2.08, 219], [47.3, 58.0, 2.24, 231], [96.1, 58.1, 1.88, 238], [7.9, 59.1, 1.88, 242], [88.7, 61.1, 1.93, 238], [13.4, 60.9, 1.61, 245], [81.3, 63.3, 2.14, 222], [62.1, 65.3, 1.98, 238], [74.3, 65.5, 2.08, 240], [93.5, 69.1, 1.82, 245], [10.5, 71.7, 2.45, 230], [72.7, 71.9, 2.14, 222], [49.0, 74.0, 2.24, 218], [30.0, 33.0, 2.0, 236], [36.0, 68.0, 2.2, 222]]
        },
        committee: {
            colored: true,
            float: [8, 18],
            presets: [[83.4, 13.2, 1.46, 244], [92.4, 14.3, 2.08, 238], [10.9, 15.1, 2.08, 238], [18.1, 16.6, 1.35, 245], [77.9, 20.9, 1.46, 244], [13.4, 23.6, 1.46, 244], [6.7, 24.4, 2.03, 235], [92.9, 25.6, 1.67, 244], [12.5, 30.8, 2.03, 235], [19.3, 32.3, 2.4, 244], [7.4, 33.6, 2.08, 238], [94.0, 36.9, 2.08, 231], [8.9, 43.7, 2.19, 231], [98.2, 44.9, 1.51, 244], [13.6, 46.2, 1.67, 244], [10.9, 54.9, 1.93, 231], [95.6, 56.0, 3.12, 244], [89.0, 59.6, 1.61, 244], [81.6, 61.7, 1.98, 233], [15.1, 70.7, 1.82, 233], [90.1, 74.7, 2.08, 238], [9.9, 74.4, 1.46, 244], [80.1, 76.4, 1.61, 244], [4.5, 79.4, 2.29, 238], [13.8, 80.0, 1.82, 233], [18.1, 81.3, 1.88, 244], [86.2, 82.6, 1.41, 244], [7.7, 91.2, 1.67, 244]]
        },
        professor: {
            float: [8, 16],
            // [x, y, 크기, 밝기, 좌우 움직임 폭(vw)] — 폭이 큰 것은 화면 밖에서 들어왔다 나갔다 함
            presets: [
                [0.9, 4.5, 1.9, 226, 1.2], [99.1, 4.5, 1.9, 226, 1.2],
                [4.2, 58, 2.0, 250, 1.8], [4.2, 71.7, 2.0, 250, 1.6], [94.9, 45.2, 2.0, 250, 1.8], [95.8, 71.3, 2.0, 250, 1.6],
                [1.8, 93.8, 2.3, 236, 1.4], [98.2, 93.8, 2.3, 236, 1.4],
                [-3, 30, 1.8, 246, 6], [-3, 82, 1.6, 240, 5.5], [103, 22, 1.8, 246, 6], [103, 60, 1.7, 240, 5.5],
                [-2, 48, 1.4, 250, 4.5], [102, 86, 1.4, 250, 4.5]
            ]
        }
    };

    let updateCommitteeAmbient = () => {};
    (function ambient() {
        const layers = [...document.querySelectorAll("[data-ambient]")];
        if (!layers.length || !FRAGMENT_IDS.length) return;
        let fragIndex = 0;

        function makeItems(layer, cfg, memberIds = null) {
            if (memberIds && !memberIds.length) return [];
            return cfg.presets.map(([x, y, size, tone, ampVw], i) => {
                const id = memberIds ? memberIds[i % memberIds.length]
                    : FRAGMENT_IDS[(fragIndex++ * 5) % FRAGMENT_IDS.length];
                const color = cfg.colored ? (memberIds ? DESIGNER_ICON_COLORS.get(id) : FRAGMENTS[id].color) : null;
                const el = fragmentSVG(id);
                el.classList.add("ambient__icon");
                el.dataset.designerId = id;
                el.style.color = color || `rgb(${tone}, ${tone}, ${tone})`;
                const darkTone = Math.min(255, 255 - tone + 40);   // 검은 배경일 때 색
                if (tone >= 236 && tone < 250) el.style.filter = `blur(${rand(1, 2.2).toFixed(1)}px)`;
                layer.append(el);
                return {
                    el, x: x / 100, y: y / 100, size, tone, darkTone, color, travel: 0,
                    speed: cfg.flow ? rand(cfg.flow[0], cfg.flow[1]) : 0,
                    amp: cfg.float ? rand(cfg.float[0], cfg.float[1]) : rand(2, 5),
                    ampVw: ampVw || 0,
                    freq: ampVw ? rand(.25, .5) : rand(.15, .32), phase: Math.random() * Math.PI * 2,
                    rot: rand(-8, 8), rotSpeed: ampVw ? rand(-14, 14) : 0
                };
            });
        }

        const states = layers.map(layer => {
            const cfg = AMBIENT[layer.dataset.ambient];
            if (!cfg) return null;
            const items = layer.dataset.ambient === "committee" ? [] : makeItems(layer, cfg);
            return { layer, items, active: true, width: 0, height: 0 };
        }).filter(Boolean);

        function sizeItems(items) {
            const unit = innerWidth / 100;
            items.forEach(it => {
                it.sizePx = Math.max(12, it.size * unit);
                it.el.style.width = it.el.style.height = `${it.sizePx.toFixed(1)}px`;
            });
        }
        function measureAmbient() {
            // 크기를 먼저 읽고 스타일을 나중에 써서 레이아웃 재계산이 반복되지 않게 합니다.
            states.forEach(state => {
                state.width = state.layer.clientWidth;
                state.height = state.layer.clientHeight;
            });
            states.forEach(({ items }) => sizeItems(items));
        }
        measureAmbient();

        const committeeState = states.find(state => state.layer.dataset.ambient === "committee");
        const COMMITTEE_MOTION = { exit: 700, enter: 1000, waveSize: 3, waveDelay: 140, withinWave: 24 };
        const clamp01 = value => Math.max(0, Math.min(1, value));
        // 강한 ease-in-out: 출발과 도착은 천천히, 중간 구간에는 속도를 붙입니다.
        const easeTravel = value => value < .5
            ? 8 * Math.pow(value, 4)
            : 1 - Math.pow(-2 * value + 2, 4) / 2;

        function travelAt(item, time) {
            const flight = item.flight;
            if (!flight) return item.travel;
            const progress = clamp01((time - flight.start) / flight.duration);
            return flight.from + (flight.to - flight.from) * easeTravel(progress);
        }
        function startFlight(items, phase, time) {
            const width = committeeState.width, height = committeeState.height;
            const distanceToPortal = item => Math.hypot(
                (item.x < .5 ? item.x : 1 - item.x) * width,
                (item.y - .5) * height
            );
            [true, false].forEach(left => {
                // 각 측면의 중앙에 가까운 아이콘부터 3개씩, 묶음 간 동작을 겹쳐 보냅니다.
                const side = items.filter(item => (item.x < .5) === left &&
                    !(phase === "exit" && item.flight?.to === 1));
                side.sort((a, b) => distanceToPortal(a) - distanceToPortal(b));
                side.forEach((item, order) => {
                    item.travel = travelAt(item, time);
                    item.flight = {
                        from: item.travel, to: phase === "exit" ? 1 : 0,
                        start: time + Math.floor(order / COMMITTEE_MOTION.waveSize) * COMMITTEE_MOTION.waveDelay
                            + (order % COMMITTEE_MOTION.waveSize) * COMMITTEE_MOTION.withinWave,
                        duration: COMMITTEE_MOTION[phase]
                    };
                });
            });
        }
        function makeCommitteeItems(state, entering, time) {
            const items = makeItems(state.layer, AMBIENT.committee, state.memberIds);
            sizeItems(items);
            items.forEach(item => {
                item.travel = entering ? 1 : 0;
                item.el.dataset.department = state.departmentId;
            });
            if (entering) startFlight(items, "enter", time);
            return items;
        }
        function replaceCommitteeItems(state) {
            state.items.forEach(item => item.el.remove());
            state.items = makeCommitteeItems(state, false);
            state.layer.dataset.department = state.departmentId;
        }
        updateCommitteeAmbient = dept => {
            const state = committeeState;
            if (!state || state.departmentId === dept.id) return;
            state.departmentId = dept.id;
            state.memberIds = [...new Set(dept.members.map(member => member.id))]
                .filter(id => DESIGNER_ICON_COLORS.has(id) && FRAGMENTS[id]);
            if (!state.items.length || reducedMotion.matches || !state.active || document.hidden) {
                replaceCommitteeItems(state);
                return;
            }
            const time = performance.now();
            // 아직 화면 밖에 있는 이전 아이콘은 제거하고, 보이는 아이콘은 현재 위치에서 퇴장합니다.
            state.items = state.items.filter(item => {
                if (item.flight && travelAt(item, time) >= 1) {
                    item.el.remove();
                    return false;
                }
                return true;
            });
            startFlight(state.items, "exit", time);
            // 퇴장을 기다리지 않고 같은 시각에 새 부서의 입장을 시작합니다.
            state.items.push(...makeCommitteeItems(state, true, time));
            state.layer.dataset.department = state.departmentId;
        };
        function stepCommittee(state, time) {
            if (!state.items.some(item => item.flight)) return;
            if (reducedMotion.matches) {
                replaceCommitteeItems(state);
                return;
            }
            state.items = state.items.filter(item => {
                const flight = item.flight;
                if (!flight) return true;
                item.travel = travelAt(item, time);
                if (time < flight.start + flight.duration) return true;
                if (flight.to === 1) {
                    item.el.remove();
                    return false;
                }
                item.travel = 0;
                item.flight = null;
                return true;
            });
        }
        if ("ResizeObserver" in window) {
            const ro = new ResizeObserver(measureAmbient);
            states.forEach(({ layer }) => ro.observe(layer));
        }
        window.addEventListener("resize", measureAmbient, { passive: true });

        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(entries => entries.forEach(entry => {
                const state = states.find(s => s.layer === entry.target);
                if (state) state.active = entry.isIntersecting;
            }));
            states.forEach(s => io.observe(s.layer));
        }

        function frame(time) {
            requestAnimationFrame(frame);
            if (document.hidden || document.documentElement.classList.contains("page-transition-active")) return;
            const t = time / 1000;
            const motion = reducedMotion.matches ? 0 : 1;
            const unit = innerWidth / 100;
            const scale = innerWidth / 1920;
            const bg = window.MainHeroBg ? window.MainHeroBg() : null;
            states.forEach(state => {
                const { layer, active, width: w, height: h } = state;
                if (!active) return;
                if (state === committeeState) stepCommittee(state, time);
                const isHero = layer.dataset.ambient === "hero";
                if (isHero && bg?.ambient <= 0) return;
                state.items.forEach(it => {
                    const size = it.sizePx;
                    let x = it.x * w;
                    if (it.speed) {
                        const span = w + size * 2;
                        x = ((x + size + t * it.speed * scale * motion) % span + span) % span - size;
                    } else if (it.ampVw) {
                        // 옆에서 들어왔다 나갔다 + 위아래로 흔들림
                        const s = Math.sin(t * it.freq + it.phase);
                        const toward = it.x < .5 ? 1 : -1;
                        x += (s * .5 + .5) * it.ampVw * unit * toward * motion;
                    } else {
                        x += Math.sin(t * it.freq + it.phase) * it.amp * motion;
                    }
                    let y = it.y * h + Math.cos(t * it.freq * .9 + it.phase) * it.amp * (it.ampVw ? 1.2 : .6) * motion;
                    let rot = it.rot + t * (it.rotSpeed || 0) * motion;
                    let iconScale = 1;
                    // 양옆 중앙의 한 점으로 휘어져 모이며 작아지고, 입장할 때는 반대로 펼쳐집니다.
                    if (it.travel) {
                        const side = it.x < .5 ? -1 : 1;
                        const portalX = side < 0 ? -18 : w + 18;
                        const p = it.travel, remaining = 1 - p;
                        const controlX = x + (portalX - x) * .55;
                        x = remaining * remaining * x + 2 * remaining * p * controlX + p * p * portalX;
                        y = remaining * remaining * y + (1 - remaining * remaining) * h * .5;
                        iconScale = 1 - .92 * Math.pow(p, 1.6);
                        rot += side * 70 * p;
                    }
                    if (isHero && bg && !it.color) {
                        // 배경이 왼쪽 → 오른쪽으로 바뀌는 경계를 따라 아이콘 색도 함께 전환
                        let m;
                        if (bg.t >= 1) m = 1;
                        else if (bg.fade) m = bg.t;
                        else {
                            const edge = bg.t * (1 + bg.band * 2) - bg.band, d = edge - x / w;
                            const k = Math.min(1, Math.max(0, (d + bg.band) / (2 * bg.band)));
                            m = k * k * (3 - 2 * k);
                        }
                        const a = bg.fromDark ? it.darkTone : it.tone, b = bg.toDark ? it.darkTone : it.tone;
                        const c = Math.round(a + (b - a) * m);
                        if (it.lastTone !== c) {
                            it.el.style.color = `rgb(${c}, ${c}, ${c})`;
                            it.lastTone = c;
                        }
                    }
                    it.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) scale(${iconScale.toFixed(3)})`;
                });
            });
        }
        requestAnimationFrame(frame);
    })();

    /* =====================================================
       2. 졸업 전시 위원회 — 안1
       - 선택된 부서 탭은 크게, 나머지는 작게
       - 조작이 없어도 interval마다 다음 부서 이미지로 슬라이드 → 탭도 함께 이동
       - 마우스를 올리거나 화면 밖에 있으면 멈춤
    ===================================================== */
    (function committee() {
        const data = window.MAIN_COMMITTEE || [];
        const tabsEl = document.getElementById("committeeTabs");
        const track = document.getElementById("committeeTrack");
        const slider = document.getElementById("committeeSlider");
        const membersEl = document.getElementById("committeeMembers");
        const section = document.getElementById("committee");
        if (!data.length || !tabsEl || !track) return;

        const SETTINGS = { interval: 4500 };
        // 안1: 자동 슬라이드 / 안2(index2.html): data-mode="arrows" → 화살표로 직접 이동, 자동 전환 없음
        const arrowMode = section.dataset.mode === "arrows";
        const designers = new Map((window.DESIGNERS || []).map(d => [d.id, d]));
        let index = 0, elapsed = 0, last = 0, inView = false, hovering = false;

        data.forEach((dept, i) => {
            const tab = document.createElement("button");
            tab.type = "button";
            tab.className = "committee-tab";
            tab.id = `committee-tab-${dept.id}`;
            tab.setAttribute("role", "tab");
            tab.setAttribute("aria-controls", "committeeSlider");
            tab.textContent = dept.label;
            tab.style.setProperty("--tab-label-length", String(Array.from(dept.label).length));
            tab.addEventListener("click", () => goTo(i));
            tabsEl.append(tab);

            const slide = document.createElement("div");
            slide.className = "committee-slide";
            slide.setAttribute("role", "group");
            slide.setAttribute("aria-label", `${dept.label} 단체 사진`);
            slide.innerHTML = `<img src="${dept.image}" alt="${dept.label} 단체 사진" loading="eager" decoding="async" draggable="false">`;
            track.append(slide);
        });
        const tabs = [...tabsEl.children];

        tabsEl.addEventListener("keydown", event => {
            if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
            event.preventDefault();
            goTo(index + (event.key === "ArrowRight" ? 1 : -1), event.key === "ArrowRight" ? 1 : -1);
            tabs[index].focus();
        });

        function renderMembers(dept) {
            membersEl.innerHTML = "";
            dept.members.forEach((member, i) => {
                const person = designers.get(member.id);
                const li = document.createElement("li");
                li.className = "committee-member";
                li.style.setProperty("--i", i);
                const icon = document.createElement("span");
                icon.className = "committee-member__icon";
                const svg = fragmentSVG(member.id);
                if (svg) {
                    icon.append(svg);
                    li.style.setProperty("--member-color", FRAGMENTS[member.id].color);
                }
                const name = document.createElement("span");
                name.className = "committee-member__name";
                name.textContent = person?.nameKo || member.id;
                li.append(icon, name);
                membersEl.append(li);
            });
        }

        // 사이에 있는 부서를 거치지 않고, 지금 사진 → 고른 사진으로만 바로 슬라이드
        const slides = [...track.children];
        let shown = -1;
        // 두 사진을 한 덩어리(track)로 함께 움직여 경계에 틈(선)이 생기지 않게 함
        let slideTimer = 0;
        function settle() {
            clearTimeout(slideTimer);
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            slides.forEach((sl, k) => {
                sl.style.transition = "none";
                sl.style.transform = "translateX(0)";
                sl.style.visibility = k === shown ? "visible" : "hidden";
                sl.style.zIndex = "";
            });
        }
        function slideTo(next, dir) {
            const cur = slides[shown];
            const tgt = slides[next];
            settle();
            if (!cur || cur === tgt || reducedMotion.matches) {
                shown = next;
                settle();
                return;
            }
            const w = slider.clientWidth;
            cur.style.visibility = "visible";
            tgt.style.visibility = "visible";
            tgt.style.zIndex = "2";
            // 새 사진은 옆에 2px 겹쳐 붙임
            tgt.style.transform = `translateX(${dir * (w - 2)}px)`;
            track.offsetHeight;
            track.style.transition = "transform .9s cubic-bezier(.65, 0, .25, 1)";
            track.style.transform = `translateX(${-dir * (w - 2)}px)`;
            shown = next;
            slideTimer = setTimeout(settle, 950);
        }

        function goTo(i, dir) {
            const prev = index;
            index = (i + data.length) % data.length;
            elapsed = 0;
            if (dir === undefined) dir = index >= prev ? 1 : -1;
            slideTo(index, shown === -1 ? 0 : dir);
            tabs.forEach((tab, t) => {
                tab.setAttribute("aria-selected", String(t === index));
                tab.tabIndex = t === index ? 0 : -1;
            });
            slider.setAttribute("aria-labelledby", tabs[index].id);
            updateCommitteeAmbient(data[index]);
            renderMembers(data[index]);
            const tab = tabs[index];
            if (tabsEl.scrollWidth > tabsEl.clientWidth) {
                tabsEl.scrollTo({ left: tab.offsetLeft - (tabsEl.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
            }
        }

        [slider, tabsEl, membersEl].forEach(el => {
            el.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hovering = true; });
            el.addEventListener("pointerleave", () => { hovering = false; });
        });

        let downX = null;
        slider.addEventListener("pointerdown", e => { downX = e.clientX; });
        slider.addEventListener("pointerup", e => {
            if (downX === null) return;
            const dx = e.clientX - downX;
            downX = null;
            if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        });

        new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
        }, { threshold: .35 }).observe(section);

        function tick(time) {
            const dt = last ? Math.min(100, time - last) : 0;
            last = time;
            if (!arrowMode && inView && !hovering && !document.hidden) {
                elapsed += dt;
                if (elapsed >= SETTINGS.interval) goTo(index + 1, 1);
            }
            requestAnimationFrame(tick);
        }

        if (arrowMode) {
            let moving = false;
            const btns = [document.getElementById("committeePrev"), document.getElementById("committeeNext")];
            // 화살표는 계속 보이게 두고, 슬라이드 중 연타만 막음
            const move = async dir => {
                if (moving) return;
                moving = true;
                goTo(index + dir, dir);
                await wait(900);
                moving = false;
            };
            btns[0]?.addEventListener("click", () => move(-1));
            btns[1]?.addEventListener("click", () => move(1));
        }

        goTo(0);
        requestAnimationFrame(tick);
    })();

    /* =====================================================
       3. 교수진 소개 — 시안 측정값으로 맞춘 원통형 배치
       - 카드가 원통 안쪽에 서 있는 것처럼: 옆으로 갈수록 바깥 모서리가 앞으로 나옴
       - 가운데 카드만 글자 노출, 옆 카드는 사진만 어둡게
    ===================================================== */
    (function professors() {
        const data = window.MAIN_PROFESSORS || [];
        const stage = document.getElementById("professorStage");
        const track = document.getElementById("professorTrack");
        const status = document.getElementById("professorStatus");
        if (!data.length || !track) return;

        const LAYOUT = {
            radius: 1.92,     // 원통 반지름 (카드 너비 배수)
            edgeCut: .8,      // 양 끝 카드 중심 ~ 화면 가장자리 거리 (카드 너비 배수, 작을수록 더 많이 잘림)
            angle: 32.4,      // 카드 한 칸당 회전 각도(deg)
            depth: 1.17       // 앞으로 나오는 정도 보정
        };
        const n = data.length;
        let active = Math.min(n - 1, Math.max(0, window.MAIN_PROFESSOR_START || 0));
        let dragged = false;

        const cards = data.map((prof, i) => {
            const li = document.createElement("li");
            li.className = "professor-card";
            li.setAttribute("role", "group");
            li.setAttribute("aria-roledescription", "slide");
            li.setAttribute("aria-label", `${prof.name} 교수`);
            li.innerHTML = `
                ${prof.image
                    ? `<div class="professor-card__photo"><img src="${prof.image}" alt="${prof.name} 교수 사진" loading="lazy" decoding="async" draggable="false"></div>`
                    : `<div class="professor-card__photo professor-card__photo--empty"><span>사진 준비 중</span></div>`}
                <div class="professor-card__info">
                    <p class="professor-card__major"></p>
                    <h3 class="professor-card__name"></h3>
                    <p class="professor-card__message"></p>
                </div>`;
            li.querySelector(".professor-card__major").textContent = prof.major;
            li.querySelector(".professor-card__name").textContent = `${prof.name} 교수`;
            li.querySelector(".professor-card__message").textContent = prof.message;
            li.addEventListener("click", () => { if (!dragged) setActive(i); });
            track.append(li);
            return li;
        });

        // 카드 위치: off(가운데 기준 칸 수, 소수 가능)에 따라 원통 위에 배치
        //  ±2칸까지 보이고, 2~3칸 사이에서 원통을 따라 계속 돌아가며 사라짐
        function transformFor(off, cardW) {
            // 화면이 낮아 카드가 작아져도 양 끝 카드는 화면 가장자리에서 잘리도록 반지름을 넓힘
            const edge = innerWidth / 2 - cardW * LAYOUT.edgeCut;
            const R = Math.max(cardW * LAYOUT.radius, edge / Math.sin(2 * LAYOUT.angle * Math.PI / 180));
            const phi = off * LAYOUT.angle * Math.PI / 180;
            const x = R * Math.sin(phi);
            const z = R * (1 - Math.cos(phi)) * LAYOUT.depth;
            return `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${(-off * LAYOUT.angle).toFixed(2)}deg)`;
        }

        // 회전 위치(pos)를 연속값으로 두고 매 프레임 그려서,
        // 한 칸이든 두 칸이든 원통이 그대로 돌아가듯 자연스럽게 이동
        let pos = active;            // 현재 회전 위치 (연속값)
        let anim = null;
        const wrap = v => { v = ((v % n) + n) % n; return v >= n / 2 ? v - n : v; };   // -n/2 ~ n/2

        function render() {
            const cardW = cards[0].offsetWidth;
            const current = ((Math.round(pos) % n) + n) % n;
            cards.forEach((card, i) => {
                const off = wrap(i - pos);
                const abs = Math.abs(off);
                const opacity = abs <= 2 ? 1 : Math.max(0, 3 - abs);   // 2~3칸: 서서히 사라짐
                card.style.transform = transformFor(off, cardW);
                card.style.opacity = opacity.toFixed(3);
                card.style.visibility = opacity <= 0 ? "hidden" : "";
                card.style.zIndex = String(10 - Math.round(abs));
                card.classList.toggle("is-active", i === current);
                card.setAttribute("aria-hidden", String(i !== current));
            });
        }

        // 시안 전환 곡선 cubic-bezier(.6, 0, .2, 1)
        function ease(t) {
            const x1 = .6, x2 = .2;
            const bx = u => 3 * x1 * u * (1 - u) * (1 - u) + 3 * x2 * u * u * (1 - u) + u * u * u;
            const by = u => 3 * u * u * (1 - u) + u * u * u;   // y1 = 0, y2 = 1
            let lo = 0, hi = 1, u = t;
            for (let k = 0; k < 24; k++) { u = (lo + hi) / 2; if (bx(u) < t) lo = u; else hi = u; }
            return by(u);
        }

        function animateTo(target) {
            const from = pos, dist = Math.abs(target - from);
            if (dist < 1e-3) return;
            const dur = 900 + (Math.max(1, dist) - 1) * 300;    // 한 칸 0.9초, 두 칸 1.2초
            const t0 = performance.now();
            if (anim) cancelAnimationFrame(anim);
            const step = now => {
                const t = Math.min(1, (now - t0) / dur);
                pos = from + (target - from) * ease(t);
                render();
                if (t < 1) anim = requestAnimationFrame(step);
                else { anim = null; pos = ((target % n) + n) % n; render(); }
            };
            anim = requestAnimationFrame(step);
        }

        function layout() { render(); }

        function setActive(i) {
            const next = ((i % n) + n) % n;
            const target = pos + wrap(next - pos);   // 가까운 방향으로 회전
            active = next;
            if (status) status.textContent = `${data[active].name} 교수 (${active + 1}/${n})`;
            animateTo(target);
        }

        let startX = null;
        stage.addEventListener("pointerdown", e => { startX = e.clientX; dragged = false; });
        stage.addEventListener("pointermove", e => {
            if (startX !== null && Math.abs(e.clientX - startX) > 8) dragged = true;
        });
        stage.addEventListener("pointerup", e => {
            if (startX === null) return;
            const dx = e.clientX - startX;
            startX = null;
            if (Math.abs(dx) > 50) setActive(active + (dx < 0 ? 1 : -1));
            setTimeout(() => { dragged = false; }, 0);
        });

        stage.tabIndex = 0;
        stage.setAttribute("aria-label", "교수진 슬라이더 — 좌우 방향키로 이동");
        stage.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") { e.preventDefault(); setActive(active + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); setActive(active - 1); }
        });

        window.addEventListener("resize", () => layout());
        layout();
        if (status) status.textContent = `${data[active].name} 교수 (${active + 1}/${n})`;
    })();

    /* =====================================================
       4. 졸업 전시 유튜브
       - 가운데 영상과 양옆 영상이 한 줄로 이어져 있고, 화살표를 누르면
         화살표가 사라짐 → 영상들이 옆으로 이동 → 화살표가 다시 나타남
       - 가운데 영상 클릭 시 재생, 아래 썸네일은 나머지 영상
    ===================================================== */
    (function videos() {
        const data = window.MAIN_VIDEOS || [];
        const stage = document.getElementById("videoStage");
        const track = document.getElementById("videoTrack");
        const thumbs = document.getElementById("videoThumbs");
        const prevBtn = document.getElementById("videoPrev");
        const nextBtn = document.getElementById("videoNext");
        if (!data.length || !track) return;

        const n = data.length;
        const thumb = (id, q = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
        const youtubeIcon = new URL("../assets/images/icons/youtube-icon.svg", scriptURL).href;
        let index = 0, moving = false;

        // 영상마다 카드 1개 (위치만 바꿔가며 이동)
        const cards = data.map((video, i) => {
            const li = document.createElement("li");
            li.className = "video-card";
            li.innerHTML = `
                <button class="video-poster" type="button" aria-label="${video.title} 재생">
                    <img src="${thumb(video.id, "maxresdefault")}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${thumb(video.id)}'">
                    <span class="video-poster__play"><img src="${youtubeIcon}" alt=""></span>
                </button>`;
            li.querySelector(".video-poster").addEventListener("click", () => {
                if (moving) return;
                if (i !== index) { go(i); return; }
                li.querySelector(".video-poster").remove();
                li.insertAdjacentHTML("beforeend", `<iframe src="https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0"
                    title="${video.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>`);
            });
            track.append(li);
            return { li, video };
        });

        // 재생 중이던 영상은 이동 시 원래 썸네일로 되돌림
        function resetCard(card) {
            const iframe = card.li.querySelector("iframe");
            if (!iframe) return;
            iframe.remove();
            const i = cards.indexOf(card);
            card.li.insertAdjacentHTML("afterbegin", `
                <button class="video-poster" type="button" aria-label="${card.video.title} 재생">
                    <img src="${thumb(card.video.id)}" alt="">
                    <span class="video-poster__play"><img src="${youtubeIcon}" alt=""></span>
                </button>`);
            card.li.querySelector(".video-poster").addEventListener("click", () => {
                if (moving) return;
                if (i !== index) { go(i); return; }
                card.li.querySelector(".video-poster").remove();
                card.li.insertAdjacentHTML("beforeend", `<iframe src="https://www.youtube-nocookie.com/embed/${card.video.id}?autoplay=1&rel=0"
                    title="${card.video.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
            });
        }

        // 원형 배치에서 i번 영상의 위치(가운데 = 0). 정확히 반대편(±n/2)이면 지금 있던 쪽을 유지
        function offsetOf(i) {
            let off = i - index;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const prev = cards[i]?.li.dataset.off;
            if (Math.abs(off) === n / 2 && prev !== undefined && Math.sign(Number(prev)) === -Math.sign(off)) off = -off;
            return off;
        }

        function layout(animate = true) {
            const style = getComputedStyle(stage);
            const w = parseFloat(style.getPropertyValue("--video-w")) || 0;
            const vw = innerWidth / 100;
            const cardW = cards[0].li.offsetWidth || w * vw;
            // 간격(--video-gap)은 CSS calc 값이라, 화살표 위치로 실제 px 간격을 역산
            let gap = 0;
            const sr = stage.getBoundingClientRect(), pr = prevBtn?.getBoundingClientRect();
            if (pr && pr.width) gap = Math.max(0, 2 * ((sr.left + sr.width / 2) - cardW / 2 - (pr.left + pr.width / 2)));
            const xFor = off => `translateX(${(off * (cardW + gap)).toFixed(1)}px)`;
            cards.forEach((card, i) => {
                const off = offsetOf(i);
                const prevOff = card.li.dataset.off === undefined ? off : Number(card.li.dataset.off);
                if (!animate) {
                    card.li.style.transition = "none";
                } else if (Math.abs(off - prevOff) > 1) {
                    // 반대편으로 넘어오는 영상: 들어올 쪽 화면 바깥에서 출발
                    card.li.style.transition = "none";
                    card.li.style.transform = xFor(off + Math.sign(off || 1));
                    card.li.offsetHeight;
                    card.li.style.transition = "";
                }
                card.li.style.transform = xFor(off);
                card.li.dataset.off = String(off);
                card.li.classList.toggle("is-active", off === 0);
                card.li.querySelector(".video-poster")?.setAttribute("tabindex", off === 0 ? "0" : "-1");
            });
            if (!animate) {
                track.offsetHeight;
                cards.forEach(card => { card.li.style.transition = ""; });
            }
        }

        function renderThumbs() {
            thumbs.innerHTML = "";
            for (let k = 1; k < n; k++) {
                const i = (index + k) % n;
                const li = document.createElement("li");
                li.innerHTML = `<button class="video-thumb" type="button" aria-label="${data[i].title} 보기">
                    <img src="${thumb(data[i].id)}" alt="" loading="lazy"></button>`;
                li.firstElementChild.addEventListener("click", () => go(i));
                thumbs.append(li);
            }
        }

        async function go(i) {
            i = (i + n) % n;
            if (moving || i === index) return;
            moving = true;
            const prevCard = cards[index];
            [prevBtn, nextBtn].forEach(b => b?.classList.add("is-hidden"));   // 1) 화살표 사라짐
            await wait(280);
            resetCard(prevCard);
            index = i;
            layout(true);                                                     // 2) 영상 이동
            thumbs.classList.add("is-fading");                                //    아래 썸네일은 페이드로 교체
            setTimeout(() => { renderThumbs(); thumbs.classList.remove("is-fading"); }, reducedMotion.matches ? 0 : 320);
            await wait(880);
            [prevBtn, nextBtn].forEach(b => b?.classList.remove("is-hidden")); // 3) 화살표 다시 나타남
            await wait(300);
            moving = false;
        }

        prevBtn?.addEventListener("click", () => go(index - 1));
        nextBtn?.addEventListener("click", () => go(index + 1));
        window.addEventListener("resize", () => layout(false));
        layout(false);
        renderThumbs();
    })();

    /* =====================================================
       5. 모바일 메뉴
    ===================================================== */
    (function mobileMenu() {
        const button = document.querySelector(".menu-button");
        const menu = document.querySelector(".mobile-menu");
        if (!button || !menu) return;
        let timer = 0;
        function set(open) {
            clearTimeout(timer);
            button.setAttribute("aria-expanded", String(open));
            button.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
            document.body.classList.toggle("mobile-menu-open", open);
            if (open) {
                menu.hidden = false;
                requestAnimationFrame(() => menu.classList.add("is-open"));
            } else {
                menu.classList.remove("is-open");
                timer = setTimeout(() => { menu.hidden = true; }, 280);
            }
        }
        button.addEventListener("click", () => set(button.getAttribute("aria-expanded") !== "true"));
        document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
    })();
})();
