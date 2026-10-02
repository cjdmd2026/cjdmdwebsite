/* Project slide variant: horizontal white wave with colored icon fragments.
 * Replace the existing project controller script with this file (use defer).
 * Required existing files: project-data.js and assets/images/project/test/icon/*.svg.
 * CSS and overlay markup are inserted automatically. No HTML body or CSS edits.
 */
(() => {
  "use strict";
  function initialize() {
    if (window.ProjectFluidSlide) {
      console.warn("[ProjectWave] A project controller is already loaded. Use one variant at a time.");
      return;
    }
    const iconBaseUrl = new URL(
      window.PROJECT_WAVE_OPTIONS?.iconBaseUrl || "../assets/images/project/test/icon/",
      document.baseURI
    );
    const waveStyle = document.createElement("style");
    waveStyle.dataset.projectWaveStyle = "";
    waveStyle.textContent = `
.project-wave {
  position: fixed;
  inset: 0;
  z-index: 999;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
  isolation: isolate;
}
.project-wave.is-active { visibility: visible; pointer-events: auto; }
.project-wave__surface,
.project-wave__icons { position: absolute; inset: 0; width: 100%; height: 100%; }
.project-wave__surface { display: block; fill: #fff; }
.project-wave__icon {
  position: absolute;
  top: 0;
  left: 0;
  width: clamp(76px, 10vw, 156px);
  height: clamp(76px, 10vw, 156px);
  transform-origin: 50% 50%;
  will-change: transform;
}
.project-wave__icon svg { display: block; width: 100%; height: 100%; overflow: visible; }
.project-wave__icon svg * { animation: none !important; transition: none !important; }
html.project-wave-running #slideview .card,
html.project-wave-running .project-info { transition: none !important; }
html[data-project-fluid-view="slide"].project-wave-text-pending :is(
  .project-dial-title, .project-info, .title-section .project-title, .desktop-slide-description
) { visibility: hidden !important; opacity: 0 !important; animation: none !important; }
html[data-project-fluid-view="slide"].project-wave-text-enter :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-in 520ms ease-out both !important;
}
html[data-project-fluid-view="slide"].project-wave-text-enter .project-info {
  animation-delay: 100ms !important;
}
html[data-project-fluid-view="slide"].project-wave-text-exit :is(
  .project-dial-item.is-active .project-dial-title, .project-info,
  .title-section .project-title, .desktop-slide-description
) {
  visibility: visible !important;
  animation: project-wave-copy-out 520ms ease-in reverse both !important;
}
@keyframes project-wave-copy-out {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@keyframes project-wave-copy-in {
  from { opacity: 0; transform: translateX(var(--project-wave-copy-offset, 14px)); clip-path: inset(0 100% 0 0); }
  to { opacity: 1; transform: translateX(0); clip-path: inset(0 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  html.project-wave-text-enter :is(.project-dial-title, .project-info,
    .title-section .project-title, .desktop-slide-description) {
    animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important;
  }
}
`;
    document.head.append(waveStyle);

(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const files = [
    "team-09-magmoa.svg", "team-10-ieoon.svg", "team-11-byeolungwan.svg",
    "team-12-kokorang.svg", "team-13-effect.svg", "team-14-jikji-jamboree.svg",
    "team-01-apuchika.svg", "team-02-ommix.svg", "team-03-phishing-ttuk.svg",
    "team-04-ilkko.svg", "team-05-kuro.svg", "team-06-dadeullim.svg",
    "team-07-style-lens.svg", "team-08-geuneuljabi.svg",
  ];
  const count = 840;
  const screenPassMs = 1100;
  const overlay = document.createElement("div");
  overlay.className = "project-wave";
  overlay.setAttribute("aria-hidden", "true");
  const svg = document.createElementNS(NS, "svg");
  svg.classList.add("project-wave__surface");
  const path = document.createElementNS(NS, "path");
  svg.append(path);
  const icons = document.createElement("div");
  icons.className = "project-wave__icons";
  overlay.append(svg, icons);
  document.body.append(overlay);

  let particles = [];
  let iconExtent = 180;
  let job = null;
  let frame = 0;
  let token = 0;
  let flowTime = 0;
  let completed = 0;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  function syncHeaderStacking() {
    const header = document.querySelector(".header");
    const headerZ = Number.parseInt(header ? getComputedStyle(header).zIndex : "1000", 10);
    overlay.style.zIndex = String(Number.isFinite(headerZ) && headerZ > 1 ? headerZ - 1 : 999);
  }
  syncHeaderStacking();
  window.addEventListener("resize", syncHeaderStacking);

  function fragment(source, shape) {
    const result = document.createElementNS(NS, "svg");
    result.setAttribute("viewBox", source.getAttribute("viewBox") || "0 0 100 100");
    result.setAttribute("aria-hidden", "true");
    result.setAttribute("focusable", "false");
    const chain = [];
    for (let node = shape; node && node !== source; node = node.parentElement) chain.unshift(node);
    let parent = result;
    chain.forEach((node, index) => {
      const clone = node.cloneNode(index === chain.length - 1);
      clone.removeAttribute("id");
      parent.append(clone);
      parent = clone;
    });
    return result;
  }

  const ready = Promise.all(files.map(async file => {
    const response = await fetch(new URL(file, iconBaseUrl));
    if (!response.ok) throw new Error(`Wave icon: ${response.status} ${file}`);
    const doc = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
    if (doc.querySelector("parsererror")) throw new Error(`Invalid icon: ${file}`);
    return [...doc.querySelectorAll("path,polygon,polyline,rect,circle,ellipse,line")]
      .filter(shape => !shape.closest("defs,clipPath,mask"))
      .map(shape => fragment(doc.documentElement, shape));
  })).then(groups => {
    const pieces = groups.flat();
    if (!pieces.length) throw new Error("Wave icons are empty");
    particles = Array.from({ length: count }, (_, index) => {
      const el = document.createElement("span");
      el.className = "project-wave__icon";
      el.append(pieces[index % pieces.length].cloneNode(true));
      return {
        el, index, edge: index < count / 2 ? 0 : 1,
        seed: ((index * 9301 + 49297) % 233280) / 233280,
        row: index % 14,
        offsetX: ((index * 43) % 70) - 35,
        scale: .52 + ((index * 17) % 46) / 100,
        angle: ((index * 23) % 90) - 45,
        spin: (((index * 31) % 21) - 10) * .0016,
      };
    });
    icons.replaceChildren(...particles.map(p => p.el));
    iconExtent = Math.max(...particles.map(p => {
      const el = p.el.firstElementChild;
      const box = el.getBBox();
      const view = el.viewBox.baseVal;
      if (!view.width || !view.height) return 180;
      const x = Math.max(Math.abs(box.x - view.x - view.width / 2), Math.abs(box.x + box.width - view.x - view.width / 2));
      const y = Math.max(Math.abs(box.y - view.y - view.height / 2), Math.abs(box.y + box.height - view.y - view.height / 2));
      return Math.hypot(x, y) * Math.min(156 / view.width, 156 / view.height) * p.scale;
    }));
    overlay.dataset.ready = "true";
  });
  // The transition caller handles load failures; keep initial failures observable too.
  ready.catch(error => console.error("[ProjectWave]", error));

  function geometry() {
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    const amplitude = width * .08;
    return { width, height, amplitude, margin: amplitude + iconExtent + 130,
      length: width + amplitude * 2 + 24 };
  }

  function edgeBase(edge, size) {
    const front = -size.margin + job.distance - edge * size.length;
    return job.direction > 0 ? front : size.width - front;
  }

  function waveX(y, edge, size) {
    return edgeBase(edge, size)
      + Math.sin(y / size.height * Math.PI * 3.2 + flowTime * .004) * size.width * .055
      + Math.sin(y / size.height * Math.PI * 7.4 - flowTime * .006) * size.width * .025;
  }

  function paint(size, dt) {
    const front = Array.from({ length: 65 }, (_, i) => {
      const y = size.height * i / 64;
      return [waveX(y, 0, size), y];
    });
    const back = front.map(([x, y]) => [x - job.direction * size.length, y]).reverse();
    path.setAttribute("d", [...front, ...back].map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") + " Z");
    for (const p of particles) {
      const lane = ((p.index * 37) % 139) / 138;
      const y = lane * size.height + Math.sin(flowTime * .0018 + p.seed * 12) * size.height * .035 + p.offsetX;
      const band = (p.row - 6.5) * 12 + Math.sin(flowTime * .003 + p.seed * 20) * 18;
      const x = waveX(y, p.edge, size) + band;
      p.angle += p.spin * dt / (1000 / 60);
      p.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${p.scale}) rotate(${p.angle.toFixed(2)}deg)`;
    }
  }

  function finish(success) {
    cancelAnimationFrame(frame);
    frame = 0;
    overlay.classList.remove("is-active");
    overlay.dataset.phase = "idle";
    document.documentElement.classList.remove("project-wave-running");
    const resolve = job?.resolve;
    job = null;
    if (success) completed++;
    resolve?.(success);
  }

  function tick(now) {
    if (!job) return;
    const dt = Math.min(now - job.lastFrame, 40);
    job.lastFrame = now;
    flowTime += dt;
    const size = geometry();
    job.distance += dt * size.width / screenPassMs;
    if (!job.swapped && job.distance >= size.margin + size.width + size.amplitude) {
      job.swapped = true;
      job.swap();
      overlay.dataset.phase = "revealing";
    }
    paint(size, dt);
    if (job.distance >= size.width + size.length + size.margin * 2) return finish(true);
    frame = requestAnimationFrame(tick);
  }

  async function transition({ direction = 1, swap }) {
    if (job) return false;
    const current = ++token;
    await ready;
    if (current !== token) return false;
    if (reducedMotion.matches) { swap(); return true; }
    syncHeaderStacking();
    return new Promise(resolve => {
      job = { direction: Math.sign(direction) || 1, swap, resolve,
        swapped: false, distance: 0, lastFrame: performance.now() };
      paint(geometry(), 0);
      overlay.dataset.phase = "covering";
      overlay.classList.add("is-active");
      document.documentElement.classList.add("project-wave-running");
      frame = requestAnimationFrame(tick);
    });
  }

  function cancel() { token++; finish(false); }
  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches || !job) return;
    if (!job.swapped) job.swap();
    finish(true);
  });
  window.ProjectWave = Object.freeze({ ready, transition, cancel,
    get state() { return { busy: !!job, phase: overlay.dataset.phase || "idle", completed }; } });
})();

(function(){
    const PROJECT_FLUID_SETTINGS={
        duration: 1.05,       // 다이얼과 이미지가 비슷한 호흡으로 움직이도록 약간 단축
        overlapAt: 0.58,     // 너무 빠르게 겹치지 않도록 조금 뒤에서 다음 전환 허용
        rgbRelease: 0.18,    // 안전용 잔여값. 실제 Fluid 해제는 wipe 마지막 구간 안에서 끝냄
        rgb: 5,              // RGB를 한 단계 부드럽게
        fluid: 50,          // 세로 전환에서 과한 출렁임을 줄임
        wheelThreshold: 90,  // 미세 휠 입력에 너무 민감하게 반응하지 않도록
        wheelInterval: 120,  // 연속 입력 간 호흡
        pixelRatio: 1.25,
        maxTextureSize: 1920,
        ...window.PROJECT_FLUID_OPTIONS
    };
    // White SVG wave replaces the bundled RGB/WebGL transition.

    (() => {
        "use strict";
        let writerFrame=0,writerTimer=0,infoRevealCleanup=null;
        function clearWriterQueue(){
            cancelAnimationFrame(writerFrame);
            clearTimeout(writerTimer);
            infoRevealCleanup?.();
            infoRevealCleanup=null;
        }
        function revealProjectInfo(projectInfo,animate){
            if(!projectInfo)return;

            projectInfo.classList.remove('is-visible');
            void projectInfo.offsetWidth;

            if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){
                projectInfo.classList.add('is-visible');
                return;
            }

            const activeTitle=document.querySelector(
                '.project-dial-item.is-active .project-dial-title'
            );
            let done=false,fallbackTimer=0;
            const cleanup=()=>{
                activeTitle?.removeEventListener('animationstart',onTitleRevealStart);
                clearTimeout(fallbackTimer);
            };
            const show=()=>{
                if(done)return;
                done=true;
                cleanup();
                requestAnimationFrame(()=>projectInfo.classList.add('is-visible'));
            };
            const onTitleRevealStart=event=>{
                if(event.animationName!=='project-dial-title-reveal')return;
                clearTimeout(fallbackTimer);
                fallbackTimer=window.setTimeout(show,300);
            };

            if(activeTitle){
                activeTitle.addEventListener('animationstart',onTitleRevealStart);
                fallbackTimer=window.setTimeout(show,2400);
                infoRevealCleanup=cleanup;
            }else{
                show();
            }
        }
        // =========================================================
        // PROJECTS 데이터
        // =========================================================
        function getProjects() {
            if (
                !window.PROJECTS ||
                !Array.isArray(window.PROJECTS)
            ) {
                console.error(
                    "PROJECTS 데이터를 찾을 수 없습니다. project-data.js 연결을 확인해주세요."
                );
                return [];
            }
            return window.PROJECTS;
        }
        function getProjectById(
            projectId
        ) {
            return getProjects().find(
                project =>
                    String(project.id) ===
                    String(projectId)
            );
        }
        // =========================================================
        // Category Label
        // =========================================================
        const CATEGORY_LABELS = {
            all:
                "ALL",
            health:
                "건강",
            education:
                "교육",
            environment:
                "환경",
            culture:
                "문화",
            leisure:
                "여가",
            welfare:
                "복지",
            life:
                "생활",
            XR:
                "생활",
            xr:
                "생활"
        };
        function getCategoryLabel(
            category
        ) {
            return (
                CATEGORY_LABELS[category]
                ||
                category
                ||
                ""
            );
        }
        // =========================================================
        // HTML 카드 ↔ project-data.js 연결
        //
        // Slide / Grid 순서는 HTML 순서를 그대로 사용.
        // =========================================================
        function bindProjectCards() {
            const cards =
                document.querySelectorAll(
                    `
                    #slideview .card[data-project-id],
                    #gridview .card[data-project-id]
                    `
                );
            cards.forEach(
                card => {
                    const projectId =
                        card.dataset.projectId;
                    const project =
                        getProjectById(
                            projectId
                        );
                    if (!project) {
                        console.warn(
                            `프로젝트 데이터를 찾을 수 없습니다: ${projectId}`
                        );
                        return;
                    }
                    // =============================================
                    // Category
                    // =============================================
                    if (project.category) {
                        card.dataset.category =
                            project.category;
                    }
                    // =============================================
                    // Grid Image
                    // =============================================
                    const gridImage =
                        card.querySelector(
                            ".card-image"
                        );
                    if (
                        gridImage &&
                        project.image
                    ) {
                        gridImage.style.backgroundImage =
                            `url("${project.image}")`;
                    }
                    // =============================================
                    // Slide Image
                    // =============================================
                    if (
                        card.closest(
                            "#slideview"
                        ) &&
                        project.image
                    ) {
                        card.style.backgroundImage =
                            `url(${project.slideImage || project.image})`;
                    }
                    // =============================================
                    // Grid Info
                    // =============================================
                    const category =
                        card.querySelector(
                            ".card-category"
                        );
                    const title =
                        card.querySelector(
                            ".card-title"
                        );
                    const members =
                        card.querySelector(
                            ".card-members"
                        );
                    const description =
                        card.querySelector(
                            ".card-description"
                        );
                    if (category) {
                        category.textContent =
                            getCategoryLabel(
                                project.category
                            );
                    }
                    if (title) {
                        title.textContent =
                            project.title;
                    }
                    if (members) {
                        members.textContent =
                            project.members.join(" / ");
                    }
                    if (description) {
                        description.textContent =
                            project.description;
                    }
                }
            );
        }
        // =========================================================
        // Slide 프로젝트 정보 변경
        // =========================================================
        function updateSlideInfo(
            projectId,
            animate = false
        ) {
            clearWriterQueue();
            const project =
                getProjectById(
                    projectId
                );
            if (!project) {
                return;
            }
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            const description = document.querySelector(
                ".project-description .project-info-block:first-child p"
            );
            // =====================================================
            // 기존 Writer 중지
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            // =====================================================
            // 프로젝트 정보 입력
            // =====================================================
            titles.forEach(
                title => {
                    title.textContent =
                        project.title;
                }
            );
            if (worker) {
                worker.textContent =
                    project.members.join(" / ");
            }
            if (description) {
                description.textContent =
                    project.description;
            }
            const projectInfo = description?.closest(
                ".project-info"
            );
            // =====================================================
            // Writer 다시 실행
            // =====================================================
            if (
                animate &&
                window.TypewriterEffect
            ) {
                writerFrame=requestAnimationFrame(
                    () => {
                        if (titleGroup) {
                            window.TypewriterEffect.replay(
                                titleGroup
                            );
                        }
                    }
                );
            }
            revealProjectInfo(projectInfo,animate);
        }
        // =========================================================
        // Grid 제목
        // =========================================================
        function showGridTitle() {
            clearWriterQueue();
            const titleGroup =
                document.querySelector(
                    ".title-section h1[typewriter-effect]"
                );
            const titles =
                document.querySelectorAll(
                    ".project-title"
                );
            const worker =
                document.querySelector(
                    ".worker"
                );
            if (
                window.TypewriterEffect
            ) {
                if (titleGroup) {
                    window.TypewriterEffect.cancel(
                        titleGroup
                    );
                }
            }
            titles.forEach(
                title => {
                    title.textContent =
                        "프로젝트";
                }
            );
            if (worker) {
                worker.textContent =
                    "";
            }
            /*
            * cancel() 이후 manual typewriter가
            * 숨겨지는 것을 방지
            */
            if (titleGroup) {
                titleGroup.classList.add(
                    "is-typed"
                );
                titleGroup.dataset.typing =
                    "false";
                titleGroup.dataset.typed =
                    "true";
            }
        }
        // =========================================================
        // 초기화
        // =========================================================

        function initProjectPage() {
            if (window.ProjectFluidSlide) return;
            bindProjectCards();
            const slideview=document.querySelector('#slideview');
            const gridview=document.querySelector('#gridview');
            const cards=[...document.querySelectorAll('#slideview .card[data-project-id]')];
            const viewButtons=[...document.querySelectorAll('.view-button')];
            if (!slideview || !cards.length) return;
            const events=new AbortController();
            const listen=(el,event,handler,options={})=>el.addEventListener(event,handler,{...options,signal:events.signal});
            const settings={...PROJECT_FLUID_SETTINGS};
            const reduce=matchMedia('(prefers-reduced-motion: reduce)');
            let index=Math.max(0,cards.findIndex(c=>c.classList.contains('is-active')));
            let engine=null,phase='idle',pending=null,request=0,disabled=false,disposed=false;
            let wheelTotal=0,lastWheel=0,searchFrame=0,wheelTimer=0,lastStep=-Infinity;
            let wanted=null,wantedDirection=1,loading=false,prepared=null;
            let initial=true,stoppedLenis=null;
            const root=document.documentElement;

            // =========================================================
            // Project Dial
            // ---------------------------------------------------------
            // Slide View의 활성 프로젝트와 project-dial을 동기화합니다.
            // 다음 프로젝트(+1) : 리스트가 아래 -> 위로 이동
            // 이전 프로젝트(-1) : 리스트가 위 -> 아래로 이동
            // =========================================================
            const projectDial=document.querySelector('.project-dial');
            const projectDialList=projectDial?.querySelector('.project-dial-list')||null;
            const projectDialItems=projectDialList
                ? [...projectDialList.querySelectorAll('.project-dial-item[data-project-id]')]
                : [];

            // SVG 조각은 화면 좌표로 움직이고, 조립되면 원본의 좌표/겹침 순서로 돌아갑니다.
            const projectIconFiles={
                'apuchika':'team-01-apuchika.svg',
                'omix':'team-02-ommix.svg',
                'phishing-ddook':'team-03-phishing-ttuk.svg',
                'ilkko':'team-04-ilkko.svg',
                'curo':'team-05-kuro.svg',
                'dadeullim':'team-06-dadeullim.svg',
                'stylens':'team-07-style-lens.svg',
                'cheoma':'team-08-geuneuljabi.svg',
                'magmoa':'team-09-magmoa.svg',
                'year-on':'team-10-ieoon.svg',
                '28':'team-11-byeolungwan.svg',
                'cocorang':'team-12-kokorang.svg',
                'efact':'team-13-effect.svg',
                'jikji':'team-14-jikji-jamboree.svg'
            };
            // 조립/분산/간격은 ms. flowSpeed와 flowDistance는 흐름의 속도/이동 폭 배율입니다.
            const iconAssemblySettings={
                gatherDuration:700,scatterDuration:650,stagger:120,
                flowSpeed:1,flowDistance:1
            };
            const svgNamespace='http://www.w3.org/2000/svg';
            const svgElement=name=>document.createElementNS(svgNamespace,name);
            const dialIcons=new Map();
            let dialIconProjectId=null,iconFrame=0,iconFieldReady=false;
            let deferIconAssembly=false;
            let iconAssemblyWaiter=null;
            let iconFlowTime=0,iconLastFrame=0,iconFlowBounds=null;
            const iconField=svgElement('svg');
            iconField.classList.add('project-icon-field');
            iconField.setAttribute('aria-hidden','true');
            iconField.setAttribute('focusable','false');
            document.body.appendChild(iconField);

            // 복합 path의 구멍은 바깥 윤곽과 함께 움직여야 합니다.
            // 안쪽 윤곽은 바깥 윤곽과 묶어 fill-rule과 원래 도형을 보존합니다.
            function splitIconShape(shape,measure){
                const clone=()=>{
                    const node=shape.cloneNode(true);
                    node.removeAttribute('id');
                    return node;
                };
                const path=shape.getAttribute('d')||'';
                if(shape.localName!=='path'||/m/.test(path))return [clone()];
                const contours=path.match(/M[^M]+/g)||[];
                if(contours.length<2)return [clone()];
                const groups=contours.map(d=>{
                    const node=clone();node.setAttribute('d',d);measure.appendChild(node);
                    const box=measure.getBBox();node.remove();
                    return {paths:[d],box};
                });
                const contains=(a,b)=>a.x<=b.x+.01&&a.y<=b.y+.01&&
                    a.x+a.width>=b.x+b.width-.01&&a.y+a.height>=b.y+b.height-.01;
                for(let i=0;i<groups.length;i++){
                    for(let j=i+1;j<groups.length;j++){
                        const a=groups[i],b=groups[j];
                        if(!contains(a.box,b.box)&&!contains(b.box,a.box))continue;
                        const x=Math.min(a.box.x,b.box.x),y=Math.min(a.box.y,b.box.y);
                        a.box={x,y,width:Math.max(a.box.x+a.box.width,b.box.x+b.box.width)-x,
                            height:Math.max(a.box.y+a.box.height,b.box.y+b.box.height)-y};
                        a.paths.push(...b.paths);groups.splice(j,1);i=-1;break;
                    }
                }
                return groups.map(group=>{const node=clone();node.setAttribute('d',group.paths.join(''));return node;});
            }

            const iconLoads=projectDialItems.map(async(item,projectOrder)=>{
                const projectId=String(item.dataset.projectId),file=projectIconFiles[projectId];
                const title=item.querySelector('.project-dial-title');
                if(!file||!title)return;
                const slot=document.createElement('span');
                slot.className='project-dial-icon';slot.setAttribute('aria-hidden','true');
                title.before(slot);item.classList.add('has-project-icon');
                const group=svgElement('g');group.dataset.projectId=projectId;iconField.appendChild(group);
                const entry={item,slot,group,pieces:[],projectOrder};
                dialIcons.set(projectId,entry);
                const measureSvg=svgElement('svg'),measure=svgElement('g');
                measureSvg.style.cssText='position:fixed;width:1px;height:1px;visibility:hidden;pointer-events:none';
                measureSvg.setAttribute('aria-hidden','true');measureSvg.appendChild(measure);
                try{
                    const response=await fetch(new URL(file, iconBaseUrl),{signal:events.signal});
                    if(!response.ok)throw new Error(`SVG ${response.status}`);
                    const xml=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
                    if(disposed)return;
                    if(xml.querySelector('parsererror'))throw new Error('Invalid SVG');
                    document.body.appendChild(measureSvg);
                    for(const layer of xml.querySelectorAll('.icon-layer')){
                        for(const source of layer.querySelectorAll('path,polygon,rect,circle,ellipse,polyline')){
                            for(const shape of splitIconShape(source,measure)){
                                measure.appendChild(shape);const box=measure.getBBox();shape.remove();
                                const cx=box.x+box.width/2,cy=box.y+box.height/2;
                                const node=svgElement('g'),centered=svgElement('g');
                                centered.setAttribute('transform',`translate(${-cx} ${-cy})`);
                                centered.appendChild(shape);node.appendChild(centered);group.appendChild(node);
                                node.dataset.piece=String(entry.pieces.length);
                                entry.pieces.push({node,cx,cy,size:Math.max(box.width,box.height,1),current:null,motion:null});
                            }
                        }
                    }
                    if(!entry.pieces.length)throw new Error('Empty SVG');
                }catch(error){
                    if(error.name!=='AbortError')console.warn(`[Project icons] ${file}`,error);
                    group.remove();slot.remove();item.classList.remove('has-project-icon','is-icon-loaded');
                    dialIcons.delete(projectId);
                }finally{measureSvg.remove();}
            });
            if(dialIcons.size)projectDial?.classList.add('has-project-icons');

            const iconMix=(a,b,t)=>a+(b-a)*t;
            const iconEase=t=>1-Math.pow(1-t,3);
            const iconRandom=seed=>{const value=Math.sin(seed*127.1+311.7)*43758.5453;return value-Math.floor(value);};
            function paintIconPiece(piece){
                const p=piece.current;
                piece.node.setAttribute('transform',`translate(${p.x.toFixed(4)} ${p.y.toFixed(4)}) rotate(${p.rotation.toFixed(4)}) scale(${p.scale.toFixed(6)})`);
                if(piece.paintedOpacity!==p.opacity){
                    piece.node.setAttribute('opacity',p.opacity);piece.paintedOpacity=p.opacity;
                }
            }
            function iconFlowRightAt(y){
                const b=iconFlowBounds;
                const vertical=(y-b.arcCenter)/b.arcRadius;
                let right=b.inset+(b.arcRight-b.inset)*Math.sqrt(Math.max(0,1-vertical*vertical));
                const dy=y-b.centerY;
                // 완성된 아이콘 주변을 완만하게 돌아가도록 연속적인 안쪽 경계를 만듭니다.
                const avoid=b.centerX-b.iconClearance+dy*dy/(2*b.iconClearance);
                const blend=Math.max(10-Math.abs(right-avoid),0)/10;
                right=Math.min(right,avoid)-blend*blend*2.5;
                return Math.max(b.inset+.01,right);
            }
            function flowingIconPosition(piece){
                if(reduce.matches||!iconFlowBounds)return {...piece.scattered};
                const b=iconFlowBounds,phase=piece.seed*Math.PI*2;
                const t=iconFlowTime*iconAssemblySettings.flowSpeed;
                const distance=iconAssemblySettings.flowDistance;
                // 삼각함수 좌표로 아치 내부를 순환하므로 경계에서 튕기거나 순간이동하지 않습니다.
                const vertical=piece.flowVertical+distance*(
                    (Math.sin(t*.24+phase)-Math.sin(phase))*28/b.arcRadius+
                    (Math.sin(t*.13+phase*2)-Math.sin(phase*2))*10/b.arcRadius
                );
                const y=b.arcCenter+Math.sin(vertical)*b.arcRadius;
                const horizontal=piece.flowHorizontal+distance*(
                    (Math.sin(t*.29+phase*1.7)-Math.sin(phase*1.7))*.34+
                    (Math.sin(t*.17+phase)-Math.sin(phase))*.12
                );
                const x=b.inset+(iconFlowRightAt(y)-b.inset)*(.5+.5*Math.sin(horizontal));
                return {...piece.scattered,x,y,
                    rotation:piece.scattered.rotation+(Math.sin(t*.22+phase)-Math.sin(phase))*12*distance};
            }
            function requestIconFrame(){
                if(!iconFrame&&iconFieldReady&&!disposed&&!slideview.hidden&&!document.hidden){
                    iconFrame=requestAnimationFrame(drawIconField);
                }
            }
            function layoutIconField(){
                if(!iconFieldReady||slideview.hidden||!projectDial)return;
                const width=innerWidth,height=innerHeight;
                iconField.setAttribute('viewBox',`0 0 ${width} ${height}`);
                // clamp() 변수는 계산 전 문자열이므로 실제 슬롯의 CSS width를 읽습니다.
                const slot=dialIcons.values().next().value?.slot;
                const iconSize=slot?parseFloat(getComputedStyle(slot).width):72;
                const left=projectDial.getBoundingClientRect().left,scale=iconSize/268;
                const centerY=height/2,centerX=left+iconSize/2;
                const pieces=[...dialIcons.values()].flatMap(entry=>entry.pieces);
                // 순서를 섞되 위치는 고정하여 스크롤할 때마다 아치가 뒤바뀌지 않습니다.
                const ranked=[...pieces].sort((a,b)=>a.seed-b.seed);
                // 아치의 테두리가 아니라 왼쪽 가장자리부터 안쪽 면적 전체에 배치합니다.
                const inset=18,arcRight=Math.max(inset+40,left+iconSize-10);
                const arcTop=Math.max(72,height*.085),arcBottom=height-24;
                const arcCenter=(arcTop+arcBottom)/2,arcRadius=(arcBottom-arcTop)/2;
                const iconClearance=iconSize/2+18;
                iconFlowBounds={inset,arcRight,arcCenter,arcRadius,centerX,centerY,iconClearance};
                let candidate=0;
                ranked.forEach((piece,i)=>{
                    let x,y;
                    // 고정된 2차원 수열로 조각들이 특정 선이나 지점에 몰리지 않게 합니다.
                    do{
                        candidate++;
                        x=inset+((.5+candidate*.754877666)%1)*(arcRight-inset);
                        y=arcTop+((.5+candidate*.569840291)%1)*(arcBottom-arcTop);
                    }while(x>iconFlowRightAt(y));
                    piece.scattered={x,y,scale:Math.min(.5,(11+iconRandom(i+31)*12)/piece.size),
                        rotation:(iconRandom(i+73)-.5)*120,opacity:.3+iconRandom(i+101)*.35};
                    const clampUnit=value=>Math.max(-1,Math.min(1,value));
                    piece.flowVertical=Math.asin(clampUnit((y-arcCenter)/arcRadius));
                    piece.flowHorizontal=Math.asin(clampUnit(2*(x-inset)/(iconFlowRightAt(y)-inset)-1));
                    piece.assembled={x:centerX+(piece.cx-120)*scale,y:centerY+(piece.cy-120)*scale,
                        scale,rotation:0,opacity:1};
                    if(!piece.current){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                });
                iconField.classList.add('is-ready');
            }
            function finishIconAssembly(){
                if(!iconFieldReady)return;
                const entry=dialIcons.get(dialIconProjectId);
                if(entry&&entry.group.dataset.state!=='assembled'&&!entry.pieces.some(piece=>piece.motion)){
                    entry.group.dataset.state='assembled';
                }
                if(entry&&entry.group.dataset.state==='assembled'&&!entry.item.classList.contains('is-icon-loaded')){
                    entry.item.classList.add('is-icon-loaded');
                }
                const waiter=iconAssemblyWaiter;
                const target=waiter&&dialIcons.get(waiter.id);
                if(waiter&&(!target||target.group.dataset.state===waiter.state)){
                    iconAssemblyWaiter=null;
                    waiter.resolve(true);
                }
            }
            function waitForIconMotion(projectId,state){
                return new Promise(resolve=>{
                    iconAssemblyWaiter={id:String(projectId),state,resolve};
                    finishIconAssembly();
                });
            }
            function drawIconField(now){
                iconFrame=0;
                if(disposed||slideview.hidden||document.hidden){iconLastFrame=0;return;}
                if(iconLastFrame&&!reduce.matches)iconFlowTime+=Math.min((now-iconLastFrame)/1000,.05);
                iconLastFrame=now;
                let moving=false;
                dialIcons.forEach(entry=>{
                    const active=entry.group.dataset.projectId===dialIconProjectId;
                    entry.pieces.forEach(piece=>{
                        const motion=piece.motion;
                        if(!motion){
                            if(!active&&!reduce.matches){piece.current=flowingIconPosition(piece);paintIconPiece(piece);}
                            return;
                        }
                        const t=Math.max(0,Math.min(1,(now-motion.start)/motion.duration));
                        const eased=iconEase(motion.gather?Math.min(1,t/.84):t);
                        // 분산 목적지도 계속 흐르게 하여 도착 직후의 움직임이 이어지게 합니다.
                        const target=motion.gather?motion.to:flowingIconPosition(piece);
                        const p={};
                        for(const key of ['x','y','rotation','opacity'])p[key]=iconMix(motion.from[key],target[key],eased);
                        if(motion.gather){
                            p.scale=t<.84?iconMix(motion.from.scale,target.scale*1.08,eased):
                                target.scale*(t<.92?iconMix(1.08,.97,(t-.84)/.08):iconMix(.97,1,(t-.92)/.08));
                        }else p.scale=iconMix(motion.from.scale,target.scale,eased);
                        piece.current=t===1?{...target}:p;paintIconPiece(piece);
                        if(t===1)piece.motion=null;else moving=true;
                    });
                    if(!active&&entry.group.dataset.state!=='scattered'&&!entry.pieces.some(piece=>piece.motion)){
                        entry.group.dataset.state='scattered';
                    }
                });
                finishIconAssembly();
                if(moving||(!reduce.matches&&dialIcons.size>1))requestIconFrame();
            }
            function moveIconEntry(entry,gather){
                const now=performance.now();
                entry.group.dataset.state=gather?'assembling':'scattering';
                entry.pieces.forEach((piece,i)=>{
                    const to=gather?piece.assembled:flowingIconPosition(piece);
                    if(reduce.matches){piece.current={...to};piece.motion=null;paintIconPiece(piece);return;}
                    piece.motion={from:{...piece.current},to:{...to},gather,
                        start:now+(i/Math.max(1,entry.pieces.length-1))*iconAssemblySettings.stagger,
                        duration:gather?iconAssemblySettings.gatherDuration:iconAssemblySettings.scatterDuration};
                });
                if(reduce.matches)entry.group.dataset.state=gather?'assembled':'scattered';
                requestIconFrame();
            }
            function syncDialIcon(projectId){
                if(slideview.hidden)return;
                const id=String(projectId);
                // Keep the incoming fragments flowing until the wave has fully exited.
                if(deferIconAssembly){
                    const previous=dialIcons.get(dialIconProjectId);
                    previous?.item.classList.remove('is-icon-loaded');
                    dialIconProjectId=null;
                    if(iconFieldReady&&previous){
                        layoutIconField();
                        moveIconEntry(previous,false);
                    }
                    return;
                }
                if(id===dialIconProjectId)return;
                const previous=dialIcons.get(dialIconProjectId);
                previous?.item.classList.remove('is-icon-loaded');
                dialIconProjectId=id;
                if(!iconFieldReady)return;
                layoutIconField();
                if(previous)moveIconEntry(previous,false);
                const active=dialIcons.get(id);
                if(active){
                    active.item.classList.remove('is-icon-loaded');
                    iconField.appendChild(active.group);
                    moveIconEntry(active,true);
                }
            }
            function resetIconField(){
                cancelAnimationFrame(iconFrame);iconFrame=0;dialIconProjectId=null;
                iconFlowTime=0;iconLastFrame=0;
                dialIcons.forEach(entry=>{
                    entry.item.classList.remove('is-icon-loaded');entry.group.dataset.state='scattered';
                    entry.pieces.forEach(piece=>{
                        piece.motion=null;
                        if(piece.scattered){piece.current={...piece.scattered};paintIconPiece(piece);}
                    });
                });
            }
            function resizeIconField(){
                if(!iconFieldReady||slideview.hidden)return;
                layoutIconField();
                dialIcons.forEach(entry=>entry.pieces.forEach(piece=>{
                    const target=entry.group.dataset.projectId===dialIconProjectId?piece.assembled:flowingIconPosition(piece);
                    if(piece.motion){
                        piece.motion.from={...piece.current};piece.motion.to={...target};piece.motion.start=performance.now();
                    }else{piece.current={...target};paintIconPiece(piece);}
                }));
            }
            Promise.all(iconLoads).then(()=>{
                if(disposed)return;
                dialIcons.forEach(entry=>entry.pieces.forEach((piece,i)=>{piece.seed=iconRandom(entry.projectOrder*101+i+1);}));
                iconFieldReady=true;
                if(slideview.hidden)return;
                layoutIconField();
                const id=dialIconProjectId||cards[index]?.dataset.projectId;
                dialIconProjectId=null;syncDialIcon(id);
                finishIconAssembly();
            });
            // Dial은 현재 위치를 정수 index가 아니라 실수 position으로 관리합니다.
            // 예: 4 -> 5로 이동할 때 4.0, 4.1, 4.2 ... 5.0처럼
            // 연속적으로 변하기 때문에 opacity / scale도 끊기지 않습니다.
            let dialPosition=null;
            let dialRaf=0;

            const originalView=root.getAttribute('data-project-fluid-view');
            const host=document.createElement('div');
            host.className='project-fluid-surface';host.setAttribute('aria-hidden','true');
            slideview.appendChild(host);
            const style=document.createElement('style');
            style.dataset.projectFluidStyle='';
            style.textContent=`
            #slideview .project-fluid-surface {
                position:absolute;
                left:0;
                top:0;
                width:1px;
                height:1px;
                z-index:2;
                visibility:hidden;
                pointer-events:none;
                overflow:hidden;
            }
            #slideview.is-fluid-transitioning .project-fluid-surface { visibility:visible; }

            /* Fluid 캔버스는 카드보다 위에 있지만,
               활성 카드 자체를 다시 위로 올려 border가 사라지지 않게 합니다.
               카드의 background는 투명하므로 border만 Fluid 위에 남습니다. */
            #slideview.is-fluid-transitioning .card {
                background-image:none!important;
                background-color:transparent!important;
                transition:none!important;
            }
            #slideview.is-fluid-transitioning .card.is-active {
                z-index:3!important;
            }

            #slideview.is-fluid-transitioning .card img { visibility:hidden; }
            #slideview .card[data-fluid-instant] { transition:none!important; }
            html[data-project-fluid-view="slide"],html[data-project-fluid-view="slide"] body { overflow:hidden; }

            /*
             * Dial은 JS가 매 프레임 위치/농도/크기를 연속 보간합니다.
             * 기존 CSS transition과 동시에 적용되면 이중 easing이 생기므로
             * slide view에서만 transition을 잠시 맡기지 않습니다.
             */
            html[data-project-fluid-view="slide"] .project-dial-list {
                transition:none!important;
                will-change:transform;
            }

            html[data-project-fluid-view="slide"] .project-dial-item {
                transition:none!important;
                transform-origin:left center;
                will-change:transform,opacity,filter;
            }

            .project-dial.has-project-icons {
                --project-dial-icon-size:clamp(48px,5vw,80px);
                --project-dial-icon-gap:clamp(12px,1.25vw,24px);
                --project-dial-title-duration:800ms;
            }
            .container:has(#slideview:not([hidden])) .project-dial.has-project-icons {
                width:min(
                    calc(36vw + var(--project-dial-icon-size) + var(--project-dial-icon-gap)),
                    calc(100vw - 12rem)
                );
            }
            .project-dial-item.has-project-icon {
                gap:var(--project-dial-icon-gap);
            }
            .project-dial-icon {
                display:block;
                flex:0 0 var(--project-dial-icon-size);
                width:var(--project-dial-icon-size);
                height:var(--project-dial-icon-size);
                max-width:none;
                visibility:hidden;
                pointer-events:none;
            }
            .project-icon-field {
                display:none;
                position:fixed;
                inset:0;
                width:100%;
                height:100%;
                z-index:90;
                overflow:hidden;
                pointer-events:none;
            }
            html[data-project-fluid-view="slide"] .project-icon-field.is-ready { display:block; }
            /* 제목의 자리와 행 높이를 유지해 다이얼이 흔들리지 않게 합니다. */
            html[data-project-fluid-view="slide"] .project-dial-title {
                display:block;
                visibility:hidden;
                opacity:0;
                clip-path:inset(0 100% 0 0);
                animation:none;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.is-icon-loaded .project-dial-title {
                visibility:visible;
                opacity:1;
                clip-path:inset(0 0 0 0);
                animation:project-dial-title-reveal var(--project-dial-title-duration,800ms) cubic-bezier(.22,1,.36,1) both;
            }
            html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
                animation-delay:var(--project-dial-title-delay,0ms);
            }
            @keyframes project-dial-title-reveal {
                from { clip-path:inset(0 100% 0 0); }
                to { clip-path:inset(0 0 0 0); }
            }
            html[data-project-fluid-view="slide"] .project-info {
                opacity:0;
                transform:translateX(-32px);
                clip-path:inset(0 100% 0 0);
                will-change:transform,opacity,clip-path;
            }
            html[data-project-fluid-view="slide"] .project-info.is-visible {
                animation:project-info-reveal 700ms cubic-bezier(.22,1,.36,1) both;
            }
            @keyframes project-info-reveal {
                from {
                    opacity:0;
                    transform:translateX(-32px);
                    clip-path:inset(0 100% 0 0);
                }
                to {
                    opacity:1;
                    transform:translateX(0);
                    clip-path:inset(0 0 0 0);
                }
            }
            @media (prefers-reduced-motion:reduce) {
                html[data-project-fluid-view="slide"] .project-dial-item.is-active:not(.has-project-icon) .project-dial-title,
                html[data-project-fluid-view="slide"] .project-dial-item.is-active.has-project-icon.is-icon-loaded .project-dial-title {
                    animation:none;
                }
                html[data-project-fluid-view="slide"] .project-info,
                html[data-project-fluid-view="slide"] .project-info.is-visible {
                    opacity:1;
                    transform:none;
                    clip-path:none;
                    animation:none;
                }
            }
            `;
            document.head.appendChild(style);
            function visibleCards(){return cards.filter(card=>!card.hidden);}

            // =========================================================
            // Fluid Surface Bounds
            // ---------------------------------------------------------
            // WebGL 전환 캔버스를 #slideview 전체(100vh)가 아니라
            // 실제 슬라이드 카드가 차지하는 영역에만 맞춥니다.
            // 따라서 CSS에서 카드 높이/위치를 바꿔도 애니메이션이
            // 현재 레이아웃을 그대로 따라갑니다.
            // =========================================================
            function syncFluidSurfaceBounds(card=cards[wanted??index]||cards[index]){
                if(!card||slideview.hidden)return;

                const viewRect=slideview.getBoundingClientRect();
                const cardRect=card.getBoundingClientRect();

                host.style.left=`${cardRect.left-viewRect.left}px`;
                host.style.top=`${cardRect.top-viewRect.top}px`;
                host.style.width=`${Math.max(1,cardRect.width)}px`;
                host.style.height=`${Math.max(1,cardRect.height)}px`;

                /* 카드의 radius도 Fluid Surface에 그대로 적용해서
                   전환 중 모서리가 네모로 튀어나오지 않게 합니다. */
                const cardStyle=getComputedStyle(card);
                host.style.borderRadius=cardStyle.borderRadius;
            }

            function getSource(card){
                const project =
                    getProjectById(card.dataset.projectId);

                const source =
                    project?.slideImage ||
                    project?.image;

                if(source){
                    return new URL(
                        source,
                        document.baseURI
                    ).href;
                }

                const value =
                    getComputedStyle(card).backgroundImage;

                const match =
                    value.match(
                        /^url\(["']?(.*?)["']?\)$/
                    );

                return match
                    ? new URL(
                        match[1],
                        document.baseURI
                    ).href
                    : '';
            }
            // =========================================================
            // Dial Motion
            // =========================================================
            const dialClamp=(value,min,max)=>Math.max(min,Math.min(max,value));
            const dialLerp=(a,b,t)=>a+(b-a)*t;

            // 빠르게 출발하고 마지막에서 천천히 안착하는 곡선.
            // CSS의 cubic-bezier(.22,1,.36,1)와 비슷한 인상입니다.
            const dialEase=t=>1-Math.pow(1-t,3);

            function updateDialClasses(activeIndex){
                projectDialItems.forEach((item,i)=>{
                    const distance=Math.abs(i-activeIndex);
                    item.classList.toggle('is-active',distance===0);
                    item.classList.toggle('is-near',distance===1);
                    item.classList.toggle('is-far',distance===2);
                    item.classList.toggle('is-none',distance>2);
                });
            }

            function getDialItemCenterAt(position){
                if(!projectDialItems.length)return 0;

                const last=projectDialItems.length-1;
                const safe=dialClamp(position,0,last);

                const low=Math.floor(safe);
                const high=Math.ceil(safe);
                const mix=safe-low;

                const lowItem=projectDialItems[low];
                const highItem=projectDialItems[high];

                const lowCenter=lowItem.offsetTop+lowItem.offsetHeight/2;
                const highCenter=highItem.offsetTop+highItem.offsetHeight/2;

                return dialLerp(lowCenter,highCenter,mix);
            }

            function applyDialVisual(position){
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const dialRect=projectDial.getBoundingClientRect();
                const centerInsideDial=window.innerHeight/2-dialRect.top;
                const itemCenter=getDialItemCenterAt(position);

                projectDialList.style.transform=
                    `translate3d(0, ${centerInsideDial-itemCenter}px, 0)`;

                /*
                 * 중앙을 통과하는 순간을 기준으로 각 항목의 상태를
                 * 연속적으로 계산합니다.
                 *
                 * active -> near -> far -> none이 갑자기 바뀌지 않고,
                 * 이동 도중 자연스럽게 밝아졌다가 다시 흐려집니다.
                 */
                projectDialItems.forEach((item,i)=>{
                    const signed=i-position;
                    const distance=Math.abs(signed);

                    let opacity;
                    if(distance<=1){
                        opacity=dialLerp(1,.52,distance);
                    }else if(distance<=2){
                        opacity=dialLerp(.52,.22,distance-1);
                    }else if(distance<=3){
                        opacity=dialLerp(.22,.05,distance-2);
                    }else{
                        opacity=.035;
                    }

                    let scale;

                    if(distance<=1){
                        // active 1.0 → near 0.8
                        scale=dialLerp(
                            1,
                            .5,
                            distance
                        );
                    }else if(distance<=2){
                        // near 0.8 → far 0.4
                        scale=dialLerp(
                            .5,
                            .4,
                            distance-1
                        );
                    }else if(distance<=3){
                        // far 0.4 → none 0.3
                        scale=dialLerp(
                            .4,
                            .3,
                            distance-2
                        );
                    }else{
                        scale=.3;
                    }

                    const blur=distance<=1.15
                        ? 0
                        : dialClamp((distance-1.15)*.34,0,.8);

                    /*
                     * 아주 약한 X 깊이만 줍니다.
                     * 과한 3D 다이얼 느낌 없이 중앙 항목이 살짝 앞으로
                     * 오는 듯한 인상만 남깁니다.
                     */
                    const x=dialClamp(distance*2.2,0,5.5);

                    item.style.opacity=opacity.toFixed(3);
                    item.style.transform=
                        `translate3d(${-x}px,0,0) scale(${scale.toFixed(4)})`;
                    item.style.filter=`blur(${blur.toFixed(2)}px)`;
                });
            }

            function stopDialMotion(){
                if(dialRaf){
                    cancelAnimationFrame(dialRaf);
                    dialRaf=0;
                }
            }

            function syncProjectDial(projectId,direction=0,instant=false){
                if(!projectDial||!projectDialList||!projectDialItems.length)return;

                const targetIndex=projectDialItems.findIndex(
                    item=>String(item.dataset.projectId)===String(projectId)
                );
                if(targetIndex<0)return;

                syncDialIcon(projectId);
                updateDialClasses(targetIndex);

                projectDial.classList.toggle('is-moving-up',direction>0);
                projectDial.classList.toggle('is-moving-down',direction<0);
                projectDial.dataset.direction=
                    direction>0?'up':
                    direction<0?'down':
                    'none';

                if(dialPosition===null){
                    const existing=projectDialItems.findIndex(
                        item=>item.classList.contains('is-active')
                    );
                    dialPosition=existing>=0?existing:targetIndex;
                }

                stopDialMotion();

                if(
                    instant ||
                    Math.abs(targetIndex-dialPosition)<.001 ||
                    reduce.matches
                ){
                    dialPosition=targetIndex;
                    applyDialVisual(dialPosition);
                    return;
                }

                const from=dialPosition;
                const distance=Math.abs(targetIndex-from);

                /*
                 * 1칸 이동은 약 850ms.
                 * 연속 스크롤로 2칸 이상 목표가 바뀌어도
                 * 길이가 과하게 늘어나지 않게 제한합니다.
                 */
                const duration=dialClamp(
                    settings.duration*820 + Math.max(0,distance-1)*75,
                    700,
                    1050
                );

                const started=performance.now();

                const tick=now=>{
                    const raw=dialClamp((now-started)/duration,0,1);
                    const eased=dialEase(raw);

                    dialPosition=dialLerp(from,targetIndex,eased);
                    applyDialVisual(dialPosition);

                    if(raw<1){
                        dialRaf=requestAnimationFrame(tick);
                    }else{
                        dialRaf=0;
                        dialPosition=targetIndex;
                        applyDialVisual(targetIndex);
                    }
                };

                dialRaf=requestAnimationFrame(tick);
            }

            function markActive(next,instant=false,direction=0){
                if(instant)cards.forEach(c=>c.setAttribute('data-fluid-instant',''));

                cards.forEach((c,i)=>c.classList.toggle('is-active',i===next));
                index=next;

                // 이미지 슬라이드와 Dial을 같은 project-id 기준으로 동기화
                syncProjectDial(cards[next]?.dataset.projectId,direction,instant);

                if(instant){
                    void slideview.offsetWidth;
                    cards.forEach(c=>c.removeAttribute('data-fluid-instant'));
                }
            }
            function forceTextVisible(){
                document.querySelectorAll('.title-section h1[typewriter-effect],.slide-description p[typewriter-effect]').forEach(el=>{
                    el.classList.add('is-typed');el.dataset.typing='false';el.dataset.typed='true';
                });
            }
            async function exitProjectCopy(){
                root.classList.remove('project-wave-text-enter');
                root.classList.add('project-wave-text-exit');
                const elements=document.querySelectorAll(
                    '.project-dial-item.is-active .project-dial-title, .project-info, '+
                    '.title-section .project-title, .desktop-slide-description'
                );
                // Wait for the actual reverse animations, including cancellation on view changes.
                const animations=[...elements].flatMap(element=>element.getAnimations())
                    .filter(animation=>animation.animationName==='project-wave-copy-out');
                const results=await Promise.all(animations.map(animation=>animation.finished.then(()=>true,()=>false)));
                return results.every(Boolean);
            }
            function clearTransition(){
                window.ProjectWave.cancel();
                iconAssemblyWaiter?.resolve(false);
                iconAssemblyWaiter=null;
                deferIconAssembly=false;
                root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                request++;clearTimeout(wheelTimer);wheelTimer=0;
                wanted=null;prepared=null;loading=false;phase='idle';pending=null;wheelTotal=0;lastStep=-Infinity;
                engine?.cancel();slideview.classList.remove('is-fluid-transitioning');
            }
            function jump(next,updateText=true){
                clearTransition();markActive(next,true);
                if(updateText&&!slideview.hidden)updateSlideInfo(cards[next].dataset.projectId,false);
                queueMicrotask(warm);
            }
            const imageLoads = new Map();
            function loadImage(source) {
                if (!source) return Promise.reject(new Error('Missing project image'));
                const url = new URL(source, document.baseURI).href;
                if (!imageLoads.has(url)) {
                    const image = new Image();
                    image.src = url;
                    imageLoads.set(url, image.decode().catch(error => {
                        imageLoads.delete(url);
                        throw error;
                    }));
                }
                return imageLoads.get(url);
            }
            function warm() {
                if (disposed || slideview.hidden) return;
                const visible = visibleCards(), at = visible.indexOf(cards[index]);
                for (const card of [visible[at - 1], cards[index], visible[at + 1]]) {
                    if (card) loadImage(getSource(card)).catch(() => {});
                }
            }
            async function transitionTo(next, direction = 1) {
                if (disposed || slideview.hidden || !cards[next] || cards[next].hidden) return;
                if (next === index || phase !== 'idle') return;
                if (reduce.matches) { jump(next); return; }
                const current = ++request;
                wanted = next;
                loading = true;
                phase = 'loading';
                try {
                    await Promise.all([window.ProjectWave.ready, loadImage(getSource(cards[next])), ...iconLoads]);
                    if (current !== request || disposed || slideview.hidden || cards[next].hidden) return;
                    loading = false;
                    phase = 'scattering';
                    deferIconAssembly=true;
                    const copyExit=exitProjectCopy();
                    const outgoing=dialIcons.get(dialIconProjectId);
                    dialIconProjectId=null;
                    let scatterFinished=Promise.resolve(true);
                    if(outgoing){
                        layoutIconField();
                        moveIconEntry(outgoing,false);
                        scatterFinished=waitForIconMotion(outgoing.group.dataset.projectId,'scattered');
                    }
                    const [textHidden,scattered]=await Promise.all([copyExit,scatterFinished]);
                    if(!textHidden||!scattered||current!==request||disposed||slideview.hidden||cards[next].hidden)return;
                    phase = 'animating';
                    const finished = await window.ProjectWave.transition({
                        direction,
                        swap() {
                            deferIconAssembly=true;
                            root.classList.add('project-wave-text-pending');
                            root.classList.remove('project-wave-text-enter', 'project-wave-text-exit');
                            root.style.setProperty('--project-wave-copy-offset', `${direction * 14}px`);
                            markActive(next, true, direction);
                            updateSlideInfo(cards[next].dataset.projectId, false);
                            forceTextVisible();
                            wanted = null;
                        }
                    });
                    if (finished && current === request && !disposed && !slideview.hidden) {
                        phase='assembling';
                        deferIconAssembly=false;
                        syncDialIcon(cards[index].dataset.projectId);
                        const assembled=await waitForIconMotion(cards[index].dataset.projectId,'assembled');
                        if(assembled&&current===request&&!disposed&&!slideview.hidden){
                            root.classList.remove('project-wave-text-pending');
                            root.classList.add('project-wave-text-enter');
                        }
                    }
                } catch (error) {
                    if (current === request && !disposed) {
                        deferIconAssembly=false;
                        root.classList.remove('project-wave-text-pending', 'project-wave-text-enter', 'project-wave-text-exit');
                        console.error('[Project wave transition]', error);
                        markActive(next, true, direction);
                        updateSlideInfo(cards[next].dataset.projectId, false);
                    }
                } finally {
                    if (current === request) {
                        wanted = null;
                        phase = 'idle';
                        loading = false;
                        wheelTotal = 0;
                        clearTimeout(wheelTimer);
                        wheelTimer = 0;
                        lastStep = performance.now();
                        warm();
                    }
                }
            }
            function navigate(direction){
                if (phase !== 'idle') return;
                if(
                    root.classList.contains('project-intro-pending') ||
                    root.classList.contains('project-intro-running')
                ) return;

                const list=visibleCards();if(!list.length||slideview.hidden)return;
                const at=list.indexOf(cards[wanted??index]);
                const next=at<0?list[0]:list[at+direction];
                if(next)transitionTo(cards.indexOf(next),direction);
            }
            function currentLenis(){
                // The supplied HTML declares `const lenis` at window scope (not window.lenis).
                try{return typeof lenis!=='undefined'?lenis:window.lenis;}catch{return window.lenis;}
            }
            function changeView(view){
                if(view!=='grid'&&view!=='slide')return;

                const wasSlide=!slideview.hidden;

                clearTransition();
                clearWriterQueue();

                slideview.hidden=view!=='slide';
                if(gridview)gridview.hidden=view!=='grid';

                root.setAttribute(
                    'data-project-fluid-view',
                    view
                );

                viewButtons.forEach(button=>{
                    button.hidden=
                        button.dataset.view===view;

                    button.classList.toggle(
                        'is-active',
                        button.dataset.view===view
                    );
                });

                if(view==='grid'){
                    resetIconField();
                    /*
                     * Grid에서는 project-dial이 display:none이 되므로
                     * 숨겨진 상태에서 위치 계산 RAF가 계속 돌지 않게 정지합니다.
                     */
                    stopDialMotion();

                    showGridTitle();

                    if(stoppedLenis){
                        stoppedLenis.start();
                        stoppedLenis=null;
                    }
                }else{
                    const l=currentLenis();

                    if(
                        l &&
                        !l.isStopped &&
                        typeof l.stop==='function'
                    ){
                        l.stop();
                        stoppedLenis=l;
                    }

                    if(!wasSlide||initial){
                        window.scrollTo({
                            top:0,
                            left:0,
                            behavior:'instant'
                        });
                    }

                    const visible=visibleCards();

                    if(
                        visible.length &&
                        cards[index].hidden
                    ){
                        markActive(
                            cards.indexOf(visible[0]),
                            true
                        );
                    }

                    syncFluidSurfaceBounds(
                        cards[index]
                    );

                    if(engine){
                        engine.resize();
                    }

                    updateSlideInfo(
                        cards[index].dataset.projectId,
                        true
                    );

                    if(!initial){
                        forceTextVisible();
                    }

                    /*
                     * Slide가 다시 display 상태가 된 다음 프레임에
                     * Dial의 실제 크기/offsetTop을 다시 읽어 중앙 위치를 계산합니다.
                     *
                     * 이전 Grid 상태에서 남아 있던 dialPosition도 버려
                     * 화면 밖 translate 값이 재사용되지 않게 합니다.
                     */
                    requestAnimationFrame(()=>{
                        if(slideview.hidden)return;

                        dialPosition=null;

                        syncProjectDial(
                            cards[index]?.dataset.projectId,
                            0,
                            true
                        );
                    });
                }

                initial=false;

                if(view==='slide'){
                    queueMicrotask(warm);
                }
            }
            function reconcileSearch(){
                if(disposed)return;
                const list=visibleCards();
                if(!list.length){clearTransition();return;}
                if(engine?.nodes.some(n=>[n.from,n.to].some(f=>!list.some(c=>c.dataset.projectId===f.id)))){jump(list.includes(cards[index])?index:cards.indexOf(list[0]));return;}
                if(!list.includes(cards[index]))jump(cards.indexOf(list[0]));
                else if(wanted!==null&&!list.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
            }
            listen(document,'project-search-change',event=>{
                // The existing filter sets card.hidden and publishes visibleIds.
                const raw=event.detail?.visibleIds;
                if(Array.isArray(raw)){
                    const ids=new Set(raw.map(String));
                    const allowed=cards.filter(c=>ids.has(String(c.dataset.projectId)));
                    if(!allowed.length){clearTransition();return;}
                    if(!allowed.includes(cards[index]))jump(cards.indexOf(allowed[0]));
                    else if(wanted!==null&&!allowed.includes(cards[wanted])){wanted=null;prepared=null;loading=false;request++;warm();}
                }
                cancelAnimationFrame(searchFrame);searchFrame=requestAnimationFrame(reconcileSearch);
            });
            const observer=new MutationObserver(reconcileSearch);
            cards.forEach(card=>observer.observe(card,{attributes:true,attributeFilter:['hidden']}));
            viewButtons.forEach(button=>listen(button,'click',()=>changeView(button.dataset.view)));
            const editable=target=>target instanceof Element&&target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"],[data-fluid-ignore]');
            const wheelOption=(name,fallback,min,max)=>Math.min(max,Math.max(min,Number.isFinite(Number(settings[name]))?Number(settings[name]):fallback));
            function flushWheel(){
                wheelTimer=0;
                if(disposed||slideview.hidden){wheelTotal=0;return;}
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)<threshold)return;
                const dir=Math.sign(wheelTotal);wheelTotal=0;lastStep=performance.now();navigate(dir);
            }
            listen(document,'wheel',event=>{
                if(slideview.hidden||event.ctrlKey||event.metaKey||editable(event.target))return;
                const nested=event.composedPath().find(el=>el instanceof Element&&el.matches('[data-fluid-ignore],[role="dialog"]'));
                if(nested)return;
                if(event.cancelable)event.preventDefault();
                event.lenisStopPropagation=true;
                const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
                if(!delta)return;
                const now=performance.now();
                if(now-lastWheel>160||Math.sign(delta)!==Math.sign(wheelTotal))wheelTotal=0;
                lastWheel=now;
                const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
                wheelTotal+=delta*unit;
                const threshold=wheelOption('wheelThreshold',10,1,500);
                if(Math.abs(wheelTotal)>=threshold){
                    const wait=wheelOption('wheelInterval',100,0,1000)-(now-lastStep);
                    if(wait<=0){clearTimeout(wheelTimer);flushWheel();}
                    else if(!wheelTimer)wheelTimer=setTimeout(flushWheel,wait);
                }
            },{passive:false,capture:true});
            listen(document,'keydown',event=>{
                if(slideview.hidden||editable(event.target)||event.ctrlKey||event.metaKey||event.altKey)return;
                const dir=['ArrowDown','ArrowRight','PageDown'].includes(event.key)?1:['ArrowUp','ArrowLeft','PageUp'].includes(event.key)?-1:0;
                if(dir){event.preventDefault();if(!event.repeat)navigate(dir);}
            });
            let touch=null;
            listen(document,'touchstart',event=>{
                if(slideview.hidden||editable(event.target)||event.touches.length!==1){touch=null;return;}
                touch={x:event.touches[0].clientX,y:event.touches[0].clientY};
            },{passive:true});
            listen(document,'touchmove',event=>{if(touch&&!slideview.hidden&&event.touches.length===1&&event.cancelable)event.preventDefault();},{passive:false});
            listen(document,'touchend',event=>{
                if(!touch||slideview.hidden)return;
                const end=event.changedTouches[0],dx=touch.x-end.clientX,dy=touch.y-end.clientY;touch=null;
                const delta=Math.abs(dy)>Math.abs(dx)?dy:dx;if(Math.abs(delta)>45)navigate(Math.sign(delta));
            },{passive:true});
            listen(document,'touchcancel',()=>{touch=null;},{passive:true});
            listen(window,'resize',()=>{
                syncFluidSurfaceBounds(cards[wanted??index]||cards[index]);

                // 화면 크기가 바뀌어도 현재 이동 중인 위치를 유지한 채 중앙 재계산
                resizeIconField();
                if(dialPosition!==null)applyDialVisual(dialPosition);
                else syncProjectDial(cards[index]?.dataset.projectId,0,true);
            });
            listen(reduce,'change',()=>{
                if(reduce.matches){
                    const next=wanted??index;
                    resetIconField();jump(next);
                }else{iconLastFrame=0;requestIconFrame();warm();}
            });
            listen(document,'visibilitychange',()=>{
                iconLastFrame=0;
                if(document.hidden){cancelAnimationFrame(iconFrame);iconFrame=0;}
                else requestIconFrame();
            });
            markActive(index,true);changeView('slide');
            window.ProjectFluidSlide={
                next:()=>navigate(1),prev:()=>navigate(-1),
                goTo(projectId){const next=cards.findIndex(c=>String(c.dataset.projectId)===String(projectId));if(next>=0)void transitionTo(next,next<index?-1:1);},
                setOptions(options){Object.assign(settings,options);engine?.setOptions(options);if(engine&&!slideview.hidden)engine.resize();},
                changeView,
                get state(){return {
                    view:slideview.hidden?'grid':'slide',phase,index,projectId:cards[index]?.dataset.projectId,
                    pendingId:wanted===null?null:cards[wanted]?.dataset.projectId,loading,disabled,
                    textureCount:engine?.imageCache.size||0,loadingCount:engine?.imageLoads.size||0,
                    activeCount:engine?.nodes.length||0,wipes:engine?.state.wipes||[],
                    transitionCount:engine?.started||0,renderCount:engine?.renderCount||0,rgbEnvelope:engine?.energy||0
                };},
                destroy(){
                    clearTransition();disposed=true;clearWriterQueue();
                    cancelAnimationFrame(searchFrame);
                    stopDialMotion();
                    resetIconField();
                    dialIcons.forEach(entry=>{
                        entry.item.classList.remove('has-project-icon','is-icon-loaded');
                        entry.slot.remove();
                    });
                    dialIcons.clear();iconField.remove();
                    projectDial?.classList.remove('has-project-icons');
                    observer.disconnect();events.abort();engine?.destroy();engine=null;host.remove();style.remove();
                    if(stoppedLenis)stoppedLenis.start();
                    if(originalView===null)root.removeAttribute('data-project-fluid-view');else root.setAttribute('data-project-fluid-view',originalView);
                    delete window.ProjectFluidSlide;
                }
            };
        }
        if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initProjectPage,{once:true});
        else initProjectPage();
    })();

    })();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
