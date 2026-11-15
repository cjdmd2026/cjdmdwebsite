const cases = [
    {key:"isseane",number:"01",scope:"global",country:"FRANCE",name:"프랑스 Isséane",title:"도시 안에 숨은 자원회수시설",summary:"시설을 지하화하고 도시 경관·정보 공개·시민 견학을 연결한 도심형 시설입니다.",image:"../images/pages/img/cases-card/isseane.jpg",tags:["space","공간 통합","시설 공개"]},
    {key:"copenhill",number:"02",scope:"global",country:"DENMARK",name:"덴마크 CopenHill",title:"소각장 지붕이 된 도시의 새로운 산",summary:"소각시설 지붕과 외벽을 스키·하이킹·등반 공간으로 활용한 사례입니다.",image:"../images/pages/img/cases-card/copenhill.jpg",tags:["space","랜드마크","시민 여가"]},
    {key:"spittelau",number:"03",scope:"global",country:"AUSTRIA",name:"오스트리아 Spittelau",title:"혐오시설의 외관을 도시의 상징으로",summary:"예술적 재건축과 지역난방을 결합해 도심 기반시설을 드러낸 사례입니다.",image:"../images/pages/img/cases-card/spittelau.jpg",tags:["space","예술 건축","지역난방"]},
    {key:"beitou",number:"04",scope:"global",country:"TAIWAN",name:"대만 Beitou",title:"굴뚝을 전망대로 바꾼 지역 복지시설",summary:"소각장 굴뚝 전망대와 주민 편의·환경교육 기능을 결합했습니다.",image:"../images/pages/img/cases-card/beitou.jpg",tags:["space","전망대","환경교육"]},
    {key:"hanam",number:"05",scope:"domestic",country:"KOREA · HANAM",name:"하남 Union Park",title:"환경시설은 지하로, 지상은 시민공원으로",summary:"소각·하수·음식물·재활용 시설을 지하화하고 상부를 공원으로 조성했습니다.",image:"../images/pages/img/cases-card/hanam.jpg",tags:["space","지하화","시민공원"]},
    {key:"asan",number:"06",scope:"domestic",country:"KOREA · ASAN",name:"아산 환경과학공원",title:"소각열과 환경교육을 하나의 공원으로",summary:"소각열 활용과 생태곤충원·과학관·전망대를 한 장소에 연결했습니다.",image:"../images/pages/img/cases-card/asan.jpg",tags:["space","energy","환경교육"]},
    {key:"musashino",number:"07",scope:"global",country:"JAPAN",name:"일본 Musashino",title:"주민과 함께 감시하는 도심형 클린센터",summary:"계획 단계의 시민 참여와 실시간 운영정보 공개를 결합한 사례입니다.",image:"../images/pages/img/cases-card/musashino.jpg",tags:["participation","주민 감시","정보 공개"]},
    {key:"mapo",number:"08",scope:"domestic",country:"KOREA · SEOUL",name:"서울 마포 자원회수시설",title:"공원 옆 자원회수시설과 주민지원 구조",summary:"열 회수와 주민지원협의체·주민지원기금을 함께 운영합니다.",image:"../images/pages/img/cases-card/mapo.jpg",tags:["participation","energy","주민지원"]},
    {key:"jeonju",number:"09",scope:"domestic",country:"KOREA · JEONJU",name:"전주권 소각자원센터",title:"주민 감시원이 확인하는 폐기물 반입",summary:"주민감시원이 반입 폐기물과 성상검사 과정에 참여하는 사례입니다.",image:"../images/pages/img/cases-card/jeonju.jpg",tags:["participation","주민감시원","성상검사"]},
    {key:"jeju",number:"10",scope:"domestic",country:"KOREA · JEJU",name:"제주 환경자원순환센터",title:"주민 협약과 지역사업으로 완성한 입지 합의",summary:"공개 공모와 주민협약, 지역 수익사업을 통해 시설 입지를 추진했습니다.",image:"../images/pages/img/cases-card/jeju.jpg",tags:["participation","주민협약","지역 환원"]},
    {key:"seongnam",number:"11",scope:"domestic",country:"KOREA · SEONGNAM",name:"성남 상대원동 대체시설",title:"노후시설 교체와 주민지원 협약",summary:"노후 소각장을 대체 건립하면서 주민지원기금과 관리 방안을 협의했습니다.",image:"../images/pages/img/cases-card/seongnam.jpg",tags:["participation","시설 현대화","주민지원"]},
    {key:"gyeongju",number:"12",scope:"domestic",country:"KOREA · GYEONGJU",name:"경주 자원회수시설",title:"반입 수수료를 주민 복지로 환원",summary:"주민협동조합과 편익시설을 통해 시설 수익 일부를 지역에 환원합니다.",image:"../images/pages/img/cases-card/gyeongju.jpg",tags:["participation","주민협동조합","복지 환원"]},
    {key:"selchp",number:"13",scope:"global",country:"UNITED KINGDOM",name:"영국 SELCHP",title:"폐기물 에너지를 지역난방으로 연결",summary:"런던의 소각열을 인근 주거단지 지역난방에 공급하는 사례입니다.",image:"../images/pages/img/cases-card/selchp.jpg",tags:["energy","지역난방","에너지 복지"]},
    {key:"garstad",number:"14",scope:"global",country:"SWEDEN",name:"스웨덴 Gärstad",title:"자원순환 교육과 지역 고용의 거점",summary:"재활용센터·지역난방·환경교육을 지자체 공기업이 통합 운영합니다.",image:"../images/pages/img/cases-card/garstad.jpg",tags:["energy","환경교육","공공 운영"]},
    {key:"ulsan",number:"15",scope:"domestic",country:"KOREA · ULSAN",name:"울산 성암소각장",title:"소각 스팀을 산업단지에 공급하는 순환 모델",summary:"소각에서 발생한 증기를 인근 산업체에 공급해 에너지와 수익을 회수합니다.",image:"../images/pages/img/cases-card/ulsan.jpg",tags:["energy","산업 스팀","열 회수"]},
    {key:"tuasone",number:"16",scope:"global",country:"SINGAPORE",name:"싱가포르 TuasOne",title:"고밀도 국가의 대규모 폐기물 에너지시설",summary:"토지 제약 속에서 대량의 잔여폐기물을 처리하고 전력을 생산합니다.",image:"../images/pages/img/cases-card/tuasone.jpg",tags:["energy","대규모 처리","자동화"]},
    {key:"hagenholz",number:"17",scope:"global",country:"SWITZERLAND",name:"스위스 Hagenholz",title:"소각열을 도시 에너지망에 정밀하게 연결",summary:"전기·지역난방 생산과 소각재 금속 회수를 결합한 취리히 사례입니다.",image:"../images/pages/img/cases-card/hagenholz.jpg",tags:["energy","지역난방","금속 회수"]},
    {key:"pyeongtaek",number:"18",scope:"domestic",country:"KOREA · PYEONGTAEK",name:"평택 Eco Center",title:"복합 폐기물처리시설과 주민 편익의 결합",summary:"여러 폐기물 처리기능을 통합하고 주민편익시설과 연계한 사례입니다.",image:"../images/pages/img/cases-card/pyeongtaek.jpg",tags:["space","participation","복합시설"]}
];

for(const item of cases){
    item.image=`../images/pages/img/cases-card/${item.key}.jpg`;
}

const mapLocations = {
    isseane:{lat:48.8317,lon:2.2636,location:"프랑스 이시레몰리노"},
    copenhill:{lat:55.6842,lon:12.6200,location:"덴마크 코펜하겐"},
    spittelau:{lat:48.2348,lon:16.3586,location:"오스트리아 빈"},
    beitou:{lat:25.1080,lon:121.4990,location:"대만 타이베이 베이터우"},
    hanam:{lat:37.5520,lon:127.2090,location:"대한민국 경기도 하남"},
    asan:{lat:36.7830,lon:127.0150,location:"대한민국 충청남도 아산"},
    musashino:{lat:35.7170,lon:139.5680,location:"일본 도쿄도 무사시노"},
    mapo:{lat:37.5700,lon:126.8790,location:"대한민국 서울 마포"},
    jeonju:{lat:35.7910,lon:127.0430,location:"대한민국 전북 전주"},
    jeju:{lat:33.4510,lon:126.6250,location:"대한민국 제주 봉개동"},
    seongnam:{lat:37.4310,lon:127.1660,location:"대한민국 경기도 성남 상대원동"},
    gyeongju:{lat:35.8500,lon:129.2500,location:"대한민국 경북 경주"},
    selchp:{lat:51.4740,lon:-0.0440,location:"영국 런던 뎁트퍼드"},
    garstad:{lat:58.4310,lon:15.6810,location:"스웨덴 린셰핑"},
    ulsan:{lat:35.4860,lon:129.3630,location:"대한민국 울산 성암동"},
    tuasone:{lat:1.2980,lon:103.6350,location:"싱가포르 투아스"},
    hagenholz:{lat:47.4180,lon:8.5610,location:"스위스 취리히 하겐홀츠"},
    pyeongtaek:{lat:37.0300,lon:127.0800,location:"대한민국 경기도 평택"}
};

const WORLD_MAP_IMAGE = "../images/pages/img/world-map.jpg";

const mapRegions = {
    europe:{label:"유럽 6개 사례",keys:["isseane","copenhill","spittelau","selchp","garstad","hagenholz"],worldPin:{x:51.1,y:38.3},
        image:"../images/pages/img/map-europe.jpg",imageAlt:"유럽 6개 사례 확대 지도",pins:{
            selchp:{x:25.1,y:48.4},isseane:{x:31.7,y:62.7},hagenholz:{x:43.1,y:69.1},
            copenhill:{x:47.2,y:40.4},garstad:{x:52.3,y:31.3},spittelau:{x:53.2,y:69.1}
        }},
    korea:{label:"대한민국 9개 사례",keys:["hanam","asan","mapo","jeonju","jeju","seongnam","gyeongju","ulsan","pyeongtaek"],worldPin:{x:79.7,y:45.0},
        image:"../images/pages/img/map-korea.jpg",imageAlt:"대한민국 9개 사례 확대 지도",pins:{
            mapo:{x:48.7,y:41.4},hanam:{x:49.5,y:41.8},seongnam:{x:49.3,y:43.0},
            pyeongtaek:{x:48.7,y:47.1},asan:{x:47.8,y:49.5},jeonju:{x:48.3,y:59.3},
            gyeongju:{x:55.7,y:58.9},ulsan:{x:56.9,y:62.4},jeju:{x:46.8,y:81.6}
        }},
    taiwan:{label:"대만 1개 사례",keys:["beitou"],worldPin:{x:78.6,y:53.8},
        image:"../images/pages/img/map-taiwan.jpg",imageAlt:"대만 사례 확대 지도",pins:{beitou:{x:57.9,y:11.7}}},
    japan:{label:"일본 1개 사례",keys:["musashino"],worldPin:{x:83.4,y:45.7},
        image:"../images/pages/img/map-japan.jpg",imageAlt:"일본 사례 확대 지도",pins:{musashino:{x:58.5,y:62.4}}},
    singapore:{label:"싱가포르 1개 사례",keys:["tuasone"],worldPin:{x:74.2,y:66.4},
        image:"../images/pages/img/map-singapore.jpg",imageAlt:"싱가포르 사례 확대 지도",pins:{tuasone:{x:29.9,y:60.6}}}
};

const header = document.querySelector("#header");
const hero = document.querySelector(".hero");
const grid = document.querySelector("#case-grid");
const searchInput = document.querySelector("#case-search");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const criteriaButtons = [...document.querySelectorAll("[data-case-filter]")];
const resultStatus = document.querySelector("#result-status");
const worldMapZoom = document.querySelector("#world-map-zoom");
const worldMapImage = worldMapZoom?.querySelector("img");
const worldCaseMarkers = document.querySelector("#world-case-markers");
const mapCasePanel = document.querySelector("#map-case-panel");
const mapPanelImage = document.querySelector("#map-panel-image");
const mapPanelLabel = document.querySelector("#map-panel-label");
const mapPanelTitle = document.querySelector("#map-panel-title");
const mapPanelLocation = document.querySelector("#map-panel-location");
const mapPanelSummary = document.querySelector("#map-panel-summary");
const mapPanelTags = document.querySelector("#map-panel-tags");
const mapPanelLink = document.querySelector("#map-panel-link");
const mapPanelClose = document.querySelector("#map-panel-close");
const mapResetButton = document.querySelector("#map-reset-button");
let activeFilter = "all";

function updateHeader(){
    header?.classList.toggle("scrolled",window.scrollY > 40);
}

function cardTemplate(item){
    return `
        <article class="archive-case-card reveal" data-key="${item.key}" data-scope="${item.scope}" data-tags="${item.tags.join(" ")}">
            <a class="archive-card-image" href="CaseDetail.html?case=${item.key}" aria-label="${item.name} 상세 페이지 보기">
                <img src="${item.image}" alt="${item.name} 사례 이미지" loading="lazy">
                <span class="archive-card-number">${item.number}</span>
            </a>
            <div class="archive-card-content">
                <span class="archive-card-label">${item.scope === "global" ? "GLOBAL" : "DOMESTIC"} CASE ${item.number} · ${item.country}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <div class="archive-card-tags">${item.tags.slice(1).map(tag => `<span># ${tag}</span>`).join("")}</div>
                <a class="archive-card-link" href="CaseDetail.html?case=${item.key}"><span>사례 자세히 보기</span><i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>`;
}

function normalize(text){
    return text.toLowerCase().replace(/\s+/g,"");
}

function applyFilters(){
    const keyword = normalize(searchInput?.value || "");
    let count = 0;
    document.querySelectorAll(".archive-case-card").forEach(card => {
        const item = cases.find(value => value.key === card.dataset.key);
        const primaryCategory = item.tags[0];
        const filterMatch =
            activeFilter === "all" ||
            item.scope === activeFilter ||
            primaryCategory === activeFilter;
        const searchTarget = normalize(`${item.country} ${item.name} ${item.title} ${item.summary} ${item.tags.join(" ")}`);
        const keywordMatch = !keyword || searchTarget.includes(keyword);
        card.hidden = !(filterMatch && keywordMatch);
        if(!card.hidden) count += 1;
    });
    resultStatus.textContent = `총 ${count}개의 사례가 표시됩니다.`;
}

function observeRevealElements(){
    if(!("IntersectionObserver" in window)){
        document.querySelectorAll(".reveal").forEach(element => element.classList.add("show"));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },{threshold:.1,rootMargin:"0px 0px -45px"});
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

grid.innerHTML = cases.map(cardTemplate).join("");
observeRevealElements();
applyFilters();

filterButtons.forEach(button => {
    button.addEventListener("click",() => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach(item => item.classList.toggle("active",item === button));
        applyFilters();
    });
});

criteriaButtons.forEach(button => {
    button.addEventListener("click",() => {
        const filter = button.dataset.caseFilter;
        const targetButton = filterButtons.find(item => item.dataset.filter === filter);

        if(!targetButton) return;

        activeFilter = filter;
        filterButtons.forEach(item => item.classList.toggle("active",item === targetButton));
        applyFilters();

        document.querySelector("#case-archive")?.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    });
});

searchInput?.addEventListener("input",applyFilters);
window.addEventListener("scroll",updateHeader,{passive:true});
updateHeader();


// =========================
// INTERACTIVE WORLD MAP
// =========================

function categoryName(item){
    return {
        space:"공간과 도시의 재구성",
        participation:"주민 참여와 투명한 운영",
        energy:"에너지 회수와 자원순환"
    }[item.tags[0]] || "국내외 환경 사례";
}

function projectMapPoint(location){
    return {
        x:((location.lon + 180) / 360) * 100,
        y:((90 - location.lat) / 180) * 100
    };
}

function markerTemplate(item){
    const activeRegion = worldCaseMarkers?.dataset.region;
    const region = activeRegion ? mapRegions[activeRegion] : null;
    const point = region
        ? region.pins[item.key]
        : projectMapPoint(mapLocations[item.key]);
    return `<button class="world-case-marker" type="button" data-key="${item.key}"
        data-map-x="${point.x}" data-map-y="${point.y}" data-short-label="${item.name}"
        aria-label="${item.name} 지도에서 보기"><span>${item.number}</span></button>`;
}

function clusterTemplate(key,region){
    const point = region.worldPin;
    return `<button class="world-case-marker world-map-cluster" type="button" data-region="${key}"
        data-map-x="${point.x}" data-map-y="${point.y}" data-short-label="${region.label}"
        aria-label="${region.label} 위치 확대"><span>${region.keys.length}</span><b>${region.label}</b></button>`;
}

function bindMapMarkerEvents(){
    worldCaseMarkers?.querySelectorAll(".world-case-marker").forEach(marker => {
        marker.addEventListener("click",event => {
            event.stopPropagation();
            if(marker.dataset.region){
                openMapRegion(marker.dataset.region);
            }else{
                selectMapCase(marker.dataset.key);
            }
        });
    });
}

function createWorldMapMarkers(){
    if(!worldCaseMarkers) return;

    worldCaseMarkers.innerHTML = Object.entries(mapRegions)
        .map(([key,region]) => clusterTemplate(key,region))
        .join("");

    bindMapMarkerEvents();

    positionWorldMapMarkers();
}

function openMapRegion(regionKey){
    const region = mapRegions[regionKey];
    if(!region || !worldCaseMarkers || !worldMapImage) return;

    mapCasePanel?.classList.remove("open");
    worldCaseMarkers.dataset.region = regionKey;
    worldMapImage.classList.add("is-changing");

    window.setTimeout(() => {
        worldMapImage.src = region.image;
        worldMapImage.alt = region.imageAlt;
        worldCaseMarkers.innerHTML = region.keys
            .map(key => markerTemplate(cases.find(item => item.key === key)))
            .join("");
        bindMapMarkerEvents();
        if(worldMapImage.complete) positionWorldMapMarkers();
    },180);

    const guide = document.querySelector("#map-guide");
    if(guide?.lastChild) guide.lastChild.textContent = ` ${region.label} · 숫자 핀을 선택하세요`;
}

function positionWorldMapMarkers(){
    if(!worldMapZoom || !worldMapImage || !worldMapImage.naturalWidth) return;

    const boxWidth = worldMapZoom.clientWidth;
    const boxHeight = worldMapZoom.clientHeight;
    // 실제 CSS의 object-fit/object-position과 같은 계산을 사용해야 이미지와 핀이 일치한다.
    const imageStyle = window.getComputedStyle(worldMapImage);
    const objectFit = imageStyle.objectFit;
    const objectPosition = imageStyle.objectPosition.trim().split(/\s+/);
    const scaleMethod = objectFit === "cover" ? Math.max : Math.min;
    const scale = scaleMethod(
        boxWidth / worldMapImage.naturalWidth,
        boxHeight / worldMapImage.naturalHeight
    );
    const renderedWidth = worldMapImage.naturalWidth * scale;
    const renderedHeight = worldMapImage.naturalHeight * scale;
    const positionToRatio = (value,fallback) => {
        if(!value) return fallback;
        if(value === "left" || value === "top") return 0;
        if(value === "center") return .5;
        if(value === "right" || value === "bottom") return 1;
        if(value.endsWith("%")) return Number.parseFloat(value) / 100;
        return fallback;
    };

    const positionX = positionToRatio(objectPosition[0],.5);
    const positionY = positionToRatio(objectPosition[1],.5);
    const offsetX = (boxWidth - renderedWidth) * positionX;
    const offsetY = (boxHeight - renderedHeight) * positionY;

    worldCaseMarkers.querySelectorAll(".world-case-marker").forEach(marker => {
        const sourceX = Number(marker.dataset.mapX) / 100;
        const sourceY = Number(marker.dataset.mapY) / 100;
        const screenX = ((sourceX * renderedWidth + offsetX) / boxWidth) * 100;
        // 회전된 마커의 중심이 아니라 뾰족한 끝이 실제 좌표를 가리키게 한다.
        const pinTipOffset = marker.offsetHeight / Math.sqrt(2);
        const screenY = ((sourceY * renderedHeight + offsetY - pinTipOffset) / boxHeight) * 100;
        marker.style.setProperty("--marker-x",`${screenX}%`);
        marker.style.setProperty("--marker-y",`${screenY}%`);
    });
}

function selectMapCase(key){
    const item = cases.find(value => value.key === key);
    const location = mapLocations[key];
    if(!item || !location || !worldMapZoom || !mapCasePanel) return;

    worldCaseMarkers?.querySelectorAll(".world-case-marker").forEach(marker => {
        marker.classList.toggle("active",marker.dataset.key === key);
    });

    mapPanelImage.src = item.image;
    mapPanelImage.alt = `${item.name} 사례 이미지`;
    mapPanelLabel.textContent = `${item.scope === "global" ? "GLOBAL" : "DOMESTIC"} CASE ${item.number} · ${categoryName(item)}`;
    mapPanelTitle.textContent = item.title;
    mapPanelLocation.textContent = location.location;
    mapPanelSummary.textContent = item.summary;
    mapPanelTags.innerHTML = item.tags.slice(1).map(tag => `<span># ${tag}</span>`).join("");
    mapPanelLink.href = `CaseDetail.html?case=${item.key}`;
    mapCasePanel.classList.add("open");
}

function resetWorldMap(){
    mapCasePanel?.classList.remove("open");
    if(worldCaseMarkers) delete worldCaseMarkers.dataset.region;

    if(worldMapImage){
        worldMapImage.classList.add("is-changing");
        window.setTimeout(() => {
            worldMapImage.src = WORLD_MAP_IMAGE;
            worldMapImage.alt = "18개 국내외 소각시설 사례 권역이 표시된 세계지도";
            createWorldMapMarkers();
            if(worldMapImage.complete) positionWorldMapMarkers();
        },180);
    }
    const guide = document.querySelector("#map-guide");
    if(guide?.lastChild) guide.lastChild.textContent = " 지역 핀을 선택해 사례를 확인하세요";
}

mapResetButton?.addEventListener("click",resetWorldMap);
mapPanelClose?.addEventListener("click",resetWorldMap);
worldMapImage?.addEventListener("load",() => {
    worldMapImage.classList.remove("is-changing");
    window.requestAnimationFrame(positionWorldMapMarkers);
});
document.addEventListener("keydown",event => {
    if(event.key === "Escape") resetWorldMap();
});

createWorldMapMarkers();
window.addEventListener("resize",positionWorldMapMarkers);


// =========================
// EFFORT CARD STAGGER
// =========================

const effortSections = document.querySelectorAll(".effort");

if("IntersectionObserver" in window){
    const effortObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;

            entry.target.querySelectorAll(".effort-item").forEach((card,index) => {
                window.setTimeout(() => card.classList.add("card-show"),index * 100);
            });

            effortObserver.unobserve(entry.target);
        });
    },{threshold:.18});

    effortSections.forEach(section => {
        section.querySelectorAll(".effort-item").forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(35px)";
        });
        effortObserver.observe(section);
    });
}else{
    document.querySelectorAll(".effort-item").forEach(card => card.classList.add("card-show"));
}

const animationStyle = document.createElement("style");
animationStyle.textContent = `
    .effort-item{
        transition:
            opacity .65s ease,
            transform .65s ease,
            border-color .35s ease,
            background .35s ease,
            box-shadow .35s ease;
    }

    .effort-item.card-show{
        opacity:1 !important;
        transform:translateY(0) !important;
    }

    .effort-item.card-show:hover{
        transform:translateY(-9px) !important;
    }
`;
document.head.appendChild(animationStyle);


// =========================
// MOBILE HEADER SPACING
// =========================

function updateMobileHeaderSpacing(){
    if(!header || !hero) return;

    if(window.innerWidth <= 768){
        hero.style.marginTop = `${header.offsetHeight + 15}px`;
    }else{
        hero.style.marginTop = "110px";
    }
}

window.addEventListener("resize",updateMobileHeaderSpacing);
window.addEventListener("load",updateMobileHeaderSpacing);
updateMobileHeaderSpacing();
