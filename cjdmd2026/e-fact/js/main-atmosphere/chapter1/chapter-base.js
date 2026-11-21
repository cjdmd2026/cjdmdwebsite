// =========================
// ELEMENTS
// =========================

const header = document.querySelector("#header");
const hero = document.querySelector(".hero");

const revealElements = document.querySelectorAll(".reveal");

const decodeTabs = document.querySelectorAll(".decode-tab");

const detailLabel = document.querySelector(".detail-label");
const detailTitle = document.querySelector(".detail-title");

const detailDescriptions = document.querySelectorAll(
    ".detail-description"
);

const detailPoints = document.querySelector(".detail-points");

const detailImage = document.querySelector(
    ".detail-image-element"
);

const detailImageTitle = document.querySelector(
    ".detail-image-title"
);

const detailImageFrame = document.querySelector(
    ".detail-image"
);

const detailProcessVideo = document.querySelector(
    "#incineration-process-video"
);

const searchInput = document.querySelector(
    "#decode-search-input"
);

const searchButton = document.querySelector(
    "#decode-search-button"
);

const keywordButtons = document.querySelectorAll(
    ".keyword-btn"
);

const searchMessage = document.querySelector(
    ".search-message"
);

const decodeContent = document.querySelector(
    "#decode-content"
);


// =========================
// DECODE DATA
// =========================

const decodeData = {

    definition:{

        number:"DECODE 01",

        title:"소각이란?",

        descriptions:[
            "소각은 폐기물을 고온에서 연소시켜 부피와 무게를 줄이는 폐기물 처리 방법입니다. 연소 과정에서 발생하는 배출가스와 소각재는 관련 법령에 따라 적절하게 처리·관리해야 합니다.",

            "연소 과정에서 발생한 열은 전기 생산이나 지역난방 등의 에너지원으로 활용할 수 있지만, 배출가스와 소각재를 안전하게 처리하기 위한 철저한 관리가 필요합니다."
        ],

        image:"../../images/main-atmosphere/chapter1/img/detail-image1.jpg",

        imageAlt:"소각 개념 이미지",

        imageTitle:"INCINERATION",

        points:[
            {
                icon:"fa-temperature-high",
                title:"고온 연소",
                description:"약 850~1,100℃에서 폐기물을 연소합니다."
            },
            {
                icon:"fa-compress",
                title:"부피 감소",
                description:"폐기물의 부피와 무게를 크게 줄입니다."
            },
            {
                icon:"fa-bolt",
                title:"에너지 회수",
                description:"연소 열을 전기와 난방 에너지로 활용합니다."
            }
        ],

        keywords:[
            "소각",
            "소각이란",
            "폐기물",
            "연소"
        ]

    },


    process:{

        number:"DECODE 02",

        title:"소각 과정",

        descriptions:[
            "소각시설은 폐기물의 반입과 저장, 투입, 연소, 열 회수, 배출가스 정화, 소각재 처리 등의 과정을 거쳐 폐기물을 처리합니다. 이 과정에서 연소 온도와 체류 시간을 적절하게 유지하고, 발생하는 배출가스와 소각재를 관련 환경 기준에 따라 관리하는 것이 중요합니다."
        ],

        image:"../../images/main-atmosphere/chapter1/img/detail-image2.jpg",

        imageAlt:"소각 과정 이미지",

        imageTitle:"PROCESS",

        points:[
            {
                icon:"fa-truck",
                title:"반입과 저장",
                description:"폐기물을 확인하고 저장조에 보관합니다."
            },
            {
                icon:"fa-fire-flame-curved",
                title:"연소",
                description:"소각로에서 폐기물을 고온으로 연소합니다."
            },
            {
                icon:"fa-filter",
                title:"후처리",
                description:"배출가스와 소각재를 별도로 처리합니다."
            }
        ],

        keywords:[
            "소각 과정",
            "소각 절차",
            "반입",
            "연소",
            "배출가스"
        ]

    },


    advantage:{

        number:"DECODE 03",

        title:"소각의 장점",

        descriptions:[
            "소각은 폐기물의 부피와 무게를 크게 줄일 수 있어 매립지 사용량을 감소시키는 데 도움이 됩니다. 도시처럼 토지 확보가 어려운 지역에서 활용도가 높은 방식입니다.",

            "또한 연소 과정에서 발생한 열을 회수하면 전기나 지역난방 등의 에너지원으로 활용할 수 있습니다."
        ],

        image:"../../images/main-atmosphere/chapter1/img/detail-image3.jpg?v=20261117-frame43-v2",

        imageAlt:"소각 장점 이미지",

        imageTitle:"ADVANTAGE",

        points:[
            {
                icon:"fa-down-left-and-up-right-to-center",
                title:"폐기물 감량",
                description:"폐기물의 부피와 무게를 감소시킵니다."
            },
            {
                icon:"fa-map",
                title:"매립지 절감",
                description:"매립에 필요한 공간을 줄일 수 있습니다."
            },
            {
                icon:"fa-plug",
                title:"에너지 생산",
                description:"소각열을 전기와 난방에 활용합니다."
            }
        ],

        keywords:[
            "소각 장점",
            "소각의 장점",
            "에너지 회수",
            "부피 감소"
        ]

    },


    disadvantage:{

        number:"DECODE 04",

        title:"소각의 단점",

        descriptions:[
            "소각 과정에서는 미세먼지, 질소산화물, 황산화물과 같은 대기오염물질이 발생할 가능성이 있습니다. 시설이 적절하게 운영되지 않으면 주변 환경과 주민 건강에 부담을 줄 수 있습니다.",

            "시설 건설과 운영에 많은 비용이 필요하며, 소각 후에도 바닥재와 비산재 등의 잔재물이 발생하므로 별도의 안전한 처리가 필요합니다."
        ],

        image:"../../images/main-atmosphere/chapter1/img/detail-image4.jpg?v=20261117-frame43-v2",

        imageAlt:"소각 단점 이미지",

        imageTitle:"DISADVANTAGE",

        points:[
            {
                icon:"fa-smog",
                title:"대기오염 우려",
                description:"연소 과정에서 오염물질이 발생할 수 있습니다."
            },
            {
                icon:"fa-coins",
                title:"높은 운영비",
                description:"시설 구축과 유지에 많은 비용이 필요합니다."
            },
            {
                icon:"fa-box-archive",
                title:"소각재 처리",
                description:"연소 후 남은 재를 별도로 처리해야 합니다."
            }
        ],

        keywords:[
            "소각 단점",
            "소각의 단점",
            "다이옥신",
            "미세먼지",
            "소각재"
        ]

    },


    environment:{

        number:"DECODE 05",

        title:"환경 영향",

        descriptions:[
            "소각시설의 환경 영향은 연료가 되는 폐기물의 종류, 소각로의 성능, 배출가스 처리시설과 운영 관리 수준에 따라 달라집니다.",

            "오염물질 배출을 최소화하기 위해서는 지속적인 측정과 설비 관리, 투명한 정보 공개가 필요합니다. 시설이 특정 지역에 집중되지 않도록 지역 간 형평성도 함께 고려해야 합니다."
        ],

        image:"../../images/main-atmosphere/chapter1/img/detail-image5.jpg?v=20261117-frame43-v2",

        imageAlt:"소각 환경 영향 이미지",

        imageTitle:"ENVIRONMENT",

        points:[
            {
                icon:"fa-wind",
                title:"대기 영향",
                description:"배출가스 관리가 지역 대기질과 연결됩니다."
            },
            {
                icon:"fa-heart-pulse",
                title:"건강 영향",
                description:"주변 주민의 건강 우려를 함께 고려해야 합니다."
            },
            {
                icon:"fa-scale-balanced",
                title:"지역 형평성",
                description:"시설의 지역 편중을 방지할 필요가 있습니다."
            }
        ],

        keywords:[
            "환경 영향",
            "대기오염",
            "주민 건강",
            "지역 형평성",
            "배출가스"
        ]

    }

};


// =========================
// HEADER SCROLL
// =========================

function updateHeader(){

    if(!header){
        return;
    }

    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

}

window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


// =========================
// SCROLL REVEAL
// =========================

if("IntersectionObserver" in window){

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(!entry.isIntersecting){
                    return;
                }

                entry.target.classList.add("show");

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold:0.14,
            rootMargin:"0px 0px -55px 0px"
        }

    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}else{

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


// =========================
// RENDER DETAIL POINTS
// =========================

function renderDetailPoints(points){

    if(!detailPoints){
        return;
    }

    detailPoints.innerHTML = "";

    points.forEach(point => {

        const item = document.createElement("div");

        item.className = "detail-point";

        item.innerHTML = `
            <i class="fa-solid ${point.icon}"></i>

            <div>
                <strong>
                    ${point.title}
                </strong>

                <span>
                    ${point.description}
                </span>
            </div>
        `;

        detailPoints.appendChild(item);

    });

}


// =========================
// CHANGE DECODE CONTENT
// =========================

function changeDecodeContent(topic){

    const data = decodeData[topic];

    if(!data){
        return;
    }

    decodeTabs.forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.topic === topic
        );

    });

    if(detailLabel){

        detailLabel.textContent =
            data.number;

    }

    if(detailTitle){

        detailTitle.textContent =
            data.title;

    }

    detailDescriptions.forEach(
        (description,index) => {

            description.textContent =
                data.descriptions[index] || "";

        }
    );

    renderDetailPoints(data.points);

    const showProcessVideo = topic === "process";

    detailImageFrame?.classList.toggle(
        "is-video",
        showProcessVideo
    );

    if(showProcessVideo && detailProcessVideo){
        detailProcessVideo.pause();
        detailProcessVideo.currentTime = 0;
        detailProcessVideo.muted = false;
        detailProcessVideo.volume = 1;
        detailProcessVideo.controls = false;
        detailImageFrame?.classList.remove("is-playing");
        detailProcessVideo.dispatchEvent(new Event("processvideoreset"));
    }else{
        detailProcessVideo?.pause();
        detailImageFrame?.classList.remove("is-playing");
        detailProcessVideo?.dispatchEvent(new Event("processvideoreset"));
    }

    if(detailImage){

        detailImage.style.opacity = "0";

        setTimeout(() => {

            detailImage.src = data.image;
            detailImage.alt = data.imageAlt;

            detailImage.style.opacity = "1";

        },180);

    }

    if(detailImageTitle){

        detailImageTitle.textContent =
            data.imageTitle;

    }

}


// 탭 클릭

decodeTabs.forEach(tab => {

    tab.addEventListener("click",() => {

        changeDecodeContent(
            tab.dataset.topic
        );

    });

});

document.querySelectorAll("[data-topic-link]").forEach(link => {

    link.addEventListener("click",() => {

        changeDecodeContent(
            link.dataset.topicLink
        );

    });

});


// =========================
// SEARCH
// =========================

function normalizeText(text){

    return text
        .toLowerCase()
        .replace(/\s+/g,"")
        .trim();

}


function findTopicByKeyword(keyword){

    const normalizedKeyword =
        normalizeText(keyword);

    if(!normalizedKeyword){
        return null;
    }

    for(const [topic,data] of Object.entries(decodeData)){

        const searchableText = normalizeText(
            [
                data.title,
                ...data.keywords,
                ...data.descriptions
            ].join(" ")
        );

        if(
            searchableText.includes(
                normalizedKeyword
            )
        ){
            return topic;
        }

    }

    return null;

}


function executeSearch(){

    const keyword =
        searchInput?.value.trim() || "";

    if(!keyword){

        if(searchMessage){

            searchMessage.textContent =
                "검색어를 입력해주세요.";

        }

        searchInput?.focus();

        return;

    }

    const topic =
        findTopicByKeyword(keyword);

    if(topic){

        changeDecodeContent(topic);

        if(searchMessage){

            searchMessage.textContent =
                `"${keyword}" 관련 정보를 찾았습니다.`;

        }

        decodeContent?.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }else{

        if(searchMessage){

            searchMessage.textContent =
                `"${keyword}"에 대한 검색 결과가 없습니다.`;

        }

    }

}


// 검색 버튼

if(searchButton){

    searchButton.addEventListener(
        "click",
        executeSearch
    );

}


// 엔터 검색

if(searchInput){

    searchInput.addEventListener(
        "keydown",
        event => {

            if(event.key === "Enter"){

                event.preventDefault();

                executeSearch();

            }

        }
    );

}


// 추천 검색어

keywordButtons.forEach(button => {

    button.addEventListener("click",() => {

        const keyword =
            button.dataset.keyword;

        if(searchInput){

            searchInput.value = keyword;

        }

        executeSearch();

    });

});


// =========================
// MOBILE HEADER SPACING
// =========================

function updateMobileHeaderSpacing(){

    if(!header || !hero){
        return;
    }

    if(hero.classList.contains("incinerator-motion")){
        hero.style.marginTop = "0";
        return;
    }

    if(window.innerWidth <= 768){

        const headerHeight =
            header.offsetHeight;

        hero.style.marginTop =
            `${headerHeight + 15}px`;

    }else{

        hero.style.marginTop =
            "110px";

    }

}

window.addEventListener(
    "resize",
    updateMobileHeaderSpacing
);

window.addEventListener(
    "load",
    updateMobileHeaderSpacing
);

updateMobileHeaderSpacing();

// Fact archive: keep the selected index and card in sync.
(() => {
    const links = [...document.querySelectorAll(".fact-archive-index a")];
    const cards = [...document.querySelectorAll(".fact-archive .decode-card")];
    if (!links.length || !cards.length) return;

    const selectCard = id => {
        links.forEach(link => {
            const selected = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", selected);
            if (selected) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
        cards.forEach(card => card.classList.toggle("active", card.id === id));
    };

    links.forEach(link => link.addEventListener("click", () => {
        selectCard(link.getAttribute("href").slice(1));
    }));

    const initialId = location.hash.startsWith("#fact-card-")
        ? location.hash.slice(1)
        : "fact-card-01";
    selectCard(initialId);
})();

// 일반 설명 섹션: 질문 다음에 답변과 자료를 순차적으로 공개합니다.
(() => {
    const answers = document.querySelectorAll(".narrative-question, .narrative-answer");
    if (!answers.length) return;

    document.documentElement.classList.add("narrative-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        answers.forEach(answer => answer.classList.add("is-narrative-visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-narrative-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    answers.forEach(answer => observer.observe(answer));
})();

// 소각장이란 히어로: 질문에서 본문으로 이어지는 스크롤 서사를 구성합니다.
(() => {
    const root = document.querySelector(".incinerator-motion");
    const stage = root?.querySelector(".incinerator-stage");
    const image = root?.querySelector(".hero-panorama img");
    const prelude = root?.querySelector(".incinerator-prelude");
    const question = root?.querySelector(".incinerator-question");
    const invitation = root?.querySelector(".incinerator-invitation");
    const heading = root?.querySelector(".hero-heading");
    const eyebrow = root?.querySelector(".hero-eyebrow");
    const title = root?.querySelector("h1");
    const summary = root?.querySelector(".hero-summary");
    const cue = root?.querySelector(".incinerator-scroll-cue");
    const ribbon = root?.querySelector(".topic-ribbon");
    if(!root || !stage || !image || !heading) return;

    document.documentElement.classList.add("incinerator-motion-ready");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const clamp = value => Math.max(0,Math.min(1,value));
    const ease = value => 1 - Math.pow(1 - clamp(value),3);
    const phase = (progress,startIn,endIn,startOut,endOut) =>
        ease((progress - startIn) / (endIn - startIn)) *
        (1 - ease((progress - startOut) / (endOut - startOut)));

    const draw = () => {
        frame = 0;
        if(reducedMotion.matches){
            [eyebrow,title,summary,cue,ribbon].forEach(element => {
                if(!element) return;
                element.style.opacity = "1";
                element.style.transform = "none";
            });
            if(prelude) prelude.style.display = "none";
            heading.style.transform = "translate(-50%,-50%)";
            return;
        }

        const travel = Math.max(1,root.offsetHeight - stage.offsetHeight);
        const progress = clamp(-root.getBoundingClientRect().top / travel);
        const questionReveal = phase(progress,.015,.10,.20,.29);
        const invitationReveal = phase(progress,.11,.19,.28,.37);
        const titleReveal = ease((progress - .34) / .14);
        const summaryReveal = ease((progress - .50) / .15);
        const cueReveal = ease((progress - .62) / .12);
        const ribbonReveal = ease((progress - .70) / .13);

        root.style.setProperty("--incinerator-dim",String(.30 + questionReveal * .34 + titleReveal * .12));
        image.style.transform = `translate3d(${pointerX * -7}px,${pointerY * -5 - progress * 24}px,0) scale(${1.045 + progress * .15})`;
        heading.style.transform = `translate(-50%,-50%) translate3d(${pointerX * 2}px,${pointerY * 2}px,0)`;
        if(prelude) prelude.style.transform = "translate(-50%,-50%)";

        if(question){
            question.style.opacity = String(questionReveal);
            question.style.transform = `translateY(${(1 - questionReveal) * 34}px)`;
        }
        if(invitation){
            invitation.style.opacity = String(invitationReveal);
            invitation.style.transform = `translateY(${(1 - invitationReveal) * 28}px)`;
        }
        [eyebrow,title].forEach(element => {
            if(!element) return;
            element.style.opacity = String(titleReveal);
            element.style.transform = `translateY(${(1 - titleReveal) * 38}px)`;
        });
        if(summary){
            summary.style.opacity = String(summaryReveal);
            summary.style.transform = `translateY(${(1 - summaryReveal) * 42}px)`;
        }
        if(cue){
            cue.style.opacity = String(cueReveal);
            cue.style.transform = `translateY(${(1 - cueReveal) * 18}px)`;
        }
        if(ribbon){
            ribbon.style.opacity = String(ribbonReveal);
            ribbon.style.transform = `translateY(${(1 - ribbonReveal) * 100}%)`;
        }
    };

    const schedule = () => {
        if(!frame) frame = requestAnimationFrame(draw);
    };

    stage.addEventListener("pointermove",event => {
        if(event.pointerType !== "mouse") return;
        pointerX = (event.clientX / window.innerWidth - .5) * 2;
        pointerY = (event.clientY / window.innerHeight - .5) * 2;
        schedule();
    });
    stage.addEventListener("pointerleave",() => {
        pointerX = 0;
        pointerY = 0;
        schedule();
    });
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    reducedMotion.addEventListener("change",schedule);
    draw();
})();


// =========================
// INITIAL CONTENT
// =========================

changeDecodeContent("definition");


// =========================
