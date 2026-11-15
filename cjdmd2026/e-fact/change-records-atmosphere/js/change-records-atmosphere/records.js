// =========================
// ELEMENTS
// =========================

const header = document.querySelector("#header");
const hero = document.querySelector(".hero");

const revealElements = document.querySelectorAll(".reveal");

const storyTrack = document.querySelector(".story-track");
const storyCards = document.querySelectorAll(".story-card");

const prevButton = document.querySelector(".slider-btn.prev");
const nextButton = document.querySelector(".slider-btn.next");

const storyDots = document.querySelectorAll(".story-dot");

const categoryButtons = document.querySelectorAll(".category-btn");
const recordList = document.querySelector(".record-list");
const chipVaultWindow = document.querySelector(".chip-vault-window");
const chipVaultPrev = document.querySelector(".chip-vault-arrow--prev");
const chipVaultNext = document.querySelector(".chip-vault-arrow--next");

const galleryItems = document.querySelectorAll(".gallery-item");

const galleryModal = document.querySelector(".gallery-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const modalClose = document.querySelector(".modal-close");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalSource = document.querySelector(".modal-source");
const modalSourceLabel = document.querySelector(".modal-source-label");

let currentStoryIndex = 0;
const storySection = document.querySelector(".resident-story");
const storyAudioButton = document.querySelector("#story-audio-toggle");
const storyAudioLabel = document.querySelector("#story-audio-label");
const storyAudioStatus = document.querySelector("#story-audio-status");
const storyAudio = new Audio();
storyAudio.preload = "metadata";
let storySectionVisible = false;
let storyAudioUnlocked = false;

function updateStoryAudioUI(message){
    const isPlaying = !storyAudio.paused && !storyAudio.ended;
    storyAudioButton?.classList.toggle("is-playing",isPlaying);
    storyAudioButton?.setAttribute("aria-pressed",String(isPlaying));
    if(storyAudioLabel){
        storyAudioLabel.textContent = isPlaying ? "현재 이야기 음성 멈추기" : "현재 이야기 음성 재생";
    }
    const icon = storyAudioButton?.querySelector(".story-audio-icon");
    if(icon){
        icon.textContent = isPlaying ? "Ⅱ" : "▶";
    }
    if(message && storyAudioStatus){
        storyAudioStatus.textContent = message;
    }
}

async function playCurrentStoryAudio({fromStart=false}={}){
    const card = storyCards[currentStoryIndex];
    const source = card?.dataset.audio;
    if(!source || !storySectionVisible){
        storyAudio.pause();
        updateStoryAudioUI();
        return;
    }
    if(!storyAudio.src.endsWith(source)){
        storyAudio.src = source;
        storyAudio.load();
        fromStart = true;
    }
    if(fromStart){
        storyAudio.currentTime = 0;
    }
    try{
        await storyAudio.play();
        storyAudioUnlocked = true;
        updateStoryAudioUI(`${currentStoryIndex + 1}번 이야기 음성 재생 중`);
    }catch(error){
        updateStoryAudioUI("재생 버튼을 누르면 이야기 음성이 시작됩니다.");
    }
}

function syncStoryAudio(){
    storyAudio.pause();
    if(storySectionVisible){
        playCurrentStoryAudio({fromStart:true});
    }else{
        updateStoryAudioUI("카드가 화면에 들어오면 음성이 재생됩니다.");
    }
}


// =========================
// HEADER SCROLL EFFECT
// =========================

function updateHeader(){

    if(!header){
        return;
    }

    if(window.scrollY > 40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll",updateHeader);

updateHeader();


// =========================
// SCROLL REVEAL
// =========================

if("IntersectionObserver" in window){

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold:0.14,
            rootMargin:"0px 0px -60px 0px"
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
// STORY SLIDER
// =========================

function updateStorySlider(){

    if(!storyTrack || storyCards.length === 0){
        return;
    }

    storyTrack.style.transform =
        `translateX(-${currentStoryIndex * 100}%)`;

    storyCards.forEach((card,index) => {

        card.classList.toggle(
            "active",
            index === currentStoryIndex
        );

    });

    storyDots.forEach((dot,index) => {

        dot.classList.toggle(
            "active",
            index === currentStoryIndex
        );

    });

    syncStoryAudio();

}

if(storySection && "IntersectionObserver" in window){
    const storyAudioObserver = new IntersectionObserver(([entry]) => {
        storySectionVisible = entry.isIntersecting && entry.intersectionRatio >= 0.32;
        if(storySectionVisible){
            playCurrentStoryAudio({fromStart:!storyAudioUnlocked});
        }else{
            storyAudio.pause();
            updateStoryAudioUI("카드가 화면에 들어오면 음성이 재생됩니다.");
        }
    },{threshold:[0,.32,.55]});
    storyAudioObserver.observe(storySection);
}

storyAudioButton?.addEventListener("click",() => {
    storyAudioUnlocked = true;
    if(!storyAudio.paused){
        storyAudio.pause();
        updateStoryAudioUI("음성이 일시 정지되었습니다.");
    }else{
        playCurrentStoryAudio();
    }
});

function unlockStoryAudio(){
    storyAudioUnlocked = true;
    if(storySectionVisible && storyAudio.paused){
        playCurrentStoryAudio();
    }
}
document.addEventListener("pointerdown",unlockStoryAudio,{once:true,passive:true});
document.addEventListener("keydown",unlockStoryAudio,{once:true});

storyAudio.addEventListener("play",() => updateStoryAudioUI());
storyAudio.addEventListener("pause",() => updateStoryAudioUI());
storyAudio.addEventListener("ended",() => updateStoryAudioUI("현재 이야기 음성 재생이 끝났습니다."));
document.addEventListener("visibilitychange",() => {
    if(document.hidden){
        storyAudio.pause();
    }
});


// 다음 이야기

if(nextButton){

    nextButton.addEventListener("click",() => {

        currentStoryIndex++;

        if(currentStoryIndex >= storyCards.length){

            currentStoryIndex = 0;

        }

        updateStorySlider();

    });

}


// 이전 이야기

if(prevButton){

    prevButton.addEventListener("click",() => {

        currentStoryIndex--;

        if(currentStoryIndex < 0){

            currentStoryIndex = storyCards.length - 1;

        }

        updateStorySlider();

    });

}


// 페이지 점 클릭

storyDots.forEach((dot,index) => {

    dot.addEventListener("click",() => {

        currentStoryIndex = index;

        updateStorySlider();

    });

});


// 모바일 이미지 스와이프

let storyTouchStartX = 0;

storyTrack?.addEventListener("touchstart",event => {
    storyTouchStartX = event.touches[0].clientX;
},{ passive:true });

storyTrack?.addEventListener("touchend",event => {
    const distance = event.changedTouches[0].clientX - storyTouchStartX;

    if(Math.abs(distance) < 45){
        return;
    }

    if(distance < 0){
        nextButton?.click();
    }else{
        prevButton?.click();
    }
},{ passive:true });


// 키보드 방향키

document.addEventListener("keydown",event => {

    const storySection = document.querySelector(".resident-story");

    if(!storySection){
        return;
    }

    const sectionRect = storySection.getBoundingClientRect();

    const isStorySectionVisible =
        sectionRect.top < window.innerHeight &&
        sectionRect.bottom > 0;

    if(!isStorySectionVisible){
        return;
    }

    if(event.key === "ArrowRight" && nextButton){

        nextButton.click();

    }

    if(event.key === "ArrowLeft" && prevButton){

        prevButton.click();

    }

});

updateStorySlider();


// =========================
// RECORD DATA
// =========================

const recordData = {

    issue:[
        {
            title:"다이옥신 기준치 5배 이상·폐기물 1만3천t 과다소각 적발",
            description:"북이면 소재 진주산업에서 허용기준 0.1ng을 넘는 0.55ng의 다이옥신이 검출됐고 과다소각 사실도 확인됐습니다.",
            date:"2017.11",
            type:"공식 적발",
            kind:"official",
            source:"연합뉴스",
            url:"https://www.yna.co.kr/view/AKR20180206182500064"
        },
        {
            title:"주민들이 19개 마을 건강 피해를 직접 조사",
            description:"주민협의체는 암 사망 60명, 그중 폐암 사망 31명으로 집계했다고 밝혔습니다. 정부 공식통계가 아닌 주민 측 조사입니다.",
            date:"2018.05",
            type:"주민 조사",
            kind:"resident",
            source:"노컷뉴스",
            url:"https://www.nocutnews.co.kr/news/5108864"
        },
        {
            title:"보건소 관리 북이면 재가 암환자 45명",
            description:"2018년 말 기준 북이면 재가 암환자는 청원구 전체 199명 중 45명으로 보도됐습니다. 전체 암환자나 암 발생률과는 다른 지표입니다.",
            date:"2018.12",
            type:"행정자료 보도",
            kind:"press",
            source:"한겨레",
            url:"https://www.hani.co.kr/arti/area/chungcheong/901448.html"
        },
        {
            title:"검은 분진·악취와 생활 불편에 대한 주민 증언",
            description:"주민들은 배추밭, 창틀과 빨래에 내려앉은 검은 분진과 굴뚝 연기, 악취 문제를 현장 증언으로 제기했습니다.",
            date:"2024.08.30",
            type:"주민 증언",
            kind:"resident",
            source:"오마이뉴스",
            url:"https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003059565"
        },
        {
            title:"농산물 판매와 지역 낙인으로 이어진 2차 피해",
            description:"주민들은 소각장 지역이라는 낙인이 농산물 판매와 생업에 악영향을 주고 주민 공동체 내부 갈등도 키웠다고 증언했습니다.",
            date:"2024–2026",
            type:"주민 증언",
            kind:"resident",
            source:"SBS",
            url:"https://news.sbs.co.kr/news/endPage.do?news_id=N1008495153"
        },
        {
            title:"수도권 지자체와 계약한 생활폐기물 2만6,428t",
            description:"SBS는 북이면 3개 업체의 계약 규모를 이같이 보도했습니다. 정부 공개통계가 아닌 언론 취재 결과로 표시합니다.",
            date:"2026.03.28",
            type:"언론 확인",
            kind:"press",
            source:"SBS 취재파일",
            url:"https://news.sbs.co.kr/news/endPage.do?news_id=N1008495153"
        }
    ],

    citizen:[
        {
            title:"내수·북이면 주민 소각시설 증설 반대 집회",
            description:"주민들이 청주시청 정문 앞에 모여 진주산업의 소각시설 증설에 반대했습니다.",
            date:"2016.10.12",
            type:"언론 확인",
            kind:"press",
            source:"충청투데이",
            url:"https://www.cctoday.co.kr/news/articleView.html?idxno=1010225"
        },
        {
            title:"북이면 이장단과 주민들의 진주산업 폐쇄 요구",
            description:"주민들은 다이옥신 초과배출과 과다소각 문제를 들어 사업장 폐쇄와 허가취소를 촉구했습니다.",
            date:"2018.02.05",
            type:"주민 행동",
            kind:"resident",
            source:"동양일보",
            url:"https://www.dynews.co.kr/news/articleView.html?idxno=365537"
        },
        {
            title:"청주지방법원 앞 허가취소 유지 촉구 활동",
            description:"주민대책위와 환경단체가 진주산업의 허가취소 처분을 유지하라고 법원 앞에서 요구했습니다.",
            date:"2018.05",
            type:"시민단체 기록",
            kind:"civic",
            source:"충북일보",
            url:"https://www.inews365.com/news/article.html?no=538150"
        },
        {
            title:"주민 1,523명 건강영향조사 청원 제출",
            description:"북이면 주민들이 소각시설 주변 건강 피해를 조사해 달라는 청원서와 서명을 환경부에 제출했습니다.",
            date:"2019.04.22",
            type:"주민 청원",
            kind:"resident",
            source:"충북일보",
            url:"https://www.inews365.com/news/article.html?no=585785"
        },
        {
            title:"환경부 앞 매일 아침 1인시위 시작",
            description:"주민과 시민단체는 조사 결과 폐기와 재조사, 환경부 장관 면담을 요구하며 두 달 넘게 시위를 이어갔습니다.",
            date:"2021.06.28",
            type:"시민단체 기록",
            kind:"civic",
            source:"청주충북환경운동연합",
            url:"https://cjcb.ekfem.or.kr/posts/LKtZ3B"
        },
        {
            title:"암 사망자 유가족과 주민들의 환경부 규탄 집회",
            description:"유가족·주민·시민단체가 책임 있는 재조사와 주민이 납득할 수 있는 원인 규명을 요구했습니다.",
            date:"2021.07.22",
            type:"시민단체 기록",
            kind:"civic",
            source:"청주충북환경운동연합",
            url:"https://cjcb.ekfem.or.kr/posts/LKtZ3B"
        }
    ],

    policy:[
        {
            title:"청주시, 진주산업 폐기물처리업 허가취소",
            description:"청주시는 환경부 유권해석을 거쳐 허가취소 처분을 내렸습니다. 이후 업체와 행정소송이 이어졌습니다.",
            date:"2018.02.06",
            type:"공식 처분",
            kind:"official",
            source:"연합뉴스",
            url:"https://www.yna.co.kr/view/AKR20180206182500064"
        },
        {
            title:"환경보건위원회, 주민 건강영향조사 청원 수용",
            description:"주민들이 4월 22일 제출한 청원을 제28차 환경보건위원회가 수용했습니다.",
            date:"2019.08.06",
            type:"공식 확인",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"정부 최초 소각시설 주변 주민건강영향조사 착수",
            description:"국립환경과학원이 충북대 의과대학 등에 조사를 의뢰해 북이면 주민 건강과 환경 노출을 조사했습니다.",
            date:"2019.12",
            type:"공식 조사",
            kind:"official",
            source:"KDI 정책자료",
            url:"https://eiec.kdi.re.kr/policy/materialView.do?datecount=&num=197415&pg=&pp=20&recommend=&topic="
        },
        {
            title:"청주시의회, 주민건강영향 재조사 촉구 결의",
            description:"청주시의회는 국내외 역학조사 전문기관을 포함한 재조사와 청주시의 적극적인 대응을 요구했습니다.",
            date:"2021.06.30",
            type:"공식 의정활동",
            kind:"official",
            source:"연합뉴스",
            url:"https://www.yna.co.kr/view/AKR20210630026800064"
        },
        {
            title:"환경부, 5년간 추가보완조사 추진 발표",
            description:"환경부는 기존 조사의 시간·자료 한계를 보완하기 위해 2021년 9월부터 연차별 조사를 추진한다고 밝혔습니다.",
            date:"2021.07.20",
            type:"공식 발표",
            kind:"official",
            source:"정책브리핑",
            url:"https://www.korea.kr/briefing/pressReleaseView.do?newsId=156462446"
        },
        {
            title:"주민·시민단체·전문가 참여 민관합동협의회 첫 회의",
            description:"환경부와 청주시, 주민·시민단체 대표와 전문가 등 14명이 추가보완조사 방향을 논의했습니다.",
            date:"2022.01.18",
            type:"공식 절차",
            kind:"official",
            source:"연합뉴스",
            url:"https://www.yna.co.kr/view/AKR20220119078600064"
        }
    ],

    media:[
        {
            title:"KBS 추적60분, 주민 자체조사와 폐암 사망 문제 보도",
            description:"방송은 주민협의체 조사와 다이옥신 초과배출 사건, 주민들의 피해 호소를 전국에 알렸습니다.",
            date:"2019.03.15",
            type:"방송 보도",
            kind:"press",
            source:"추적60분 소개",
            url:"https://www.jjan.kr/article/20190313667108"
        },
        {
            title:"한겨레, 주민조사와 보건소 재가 암환자 자료 보도",
            description:"주민 조사 수치와 함께 북이면 재가 암환자 45명이라는 보건소 관리자료를 구분해 다뤘습니다.",
            date:"2019.07.11",
            type:"언론 확인",
            kind:"press",
            source:"한겨레",
            url:"https://www.hani.co.kr/arti/area/chungcheong/901448.html"
        },
        {
            title:"농민신문, 이병현 주민의 투병과 농산물 판매 피해 보도",
            description:"실명 주민의 질병 경험과 주민 자체조사, 생업 피해를 현장 취재했습니다.",
            date:"2024.08.22",
            type:"실명 인터뷰",
            kind:"press",
            source:"농민신문",
            url:"https://www.nongmin.com/article/20240821500691"
        },
        {
            title:"오마이뉴스, 배추밭·창틀·빨래의 검은 분진 증언 기록",
            description:"유민채 전 이장이 토론회에서 밝힌 생활환경 피해와 제도개선 요구를 보도했습니다.",
            date:"2024.08.30",
            type:"주민 증언",
            kind:"press",
            source:"오마이뉴스",
            url:"https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003059565"
        },
        {
            title:"MBC충북, 현재 운영 중인 주민 감시초소 취재",
            description:"김경일 감시초소원이 이상 연기를 확인하고 업체에 문의하는 주민 감시활동을 보도했습니다.",
            date:"2026.01.22",
            type:"현장 보도",
            kind:"press",
            source:"MBC충북",
            url:"https://kjmbc.co.kr/NewsArticle/1502307"
        },
        {
            title:"SBS, 수도권 폐기물 반입과 보완조사 종료 문제 취재",
            description:"보완조사가 2025년 1월 종료됐다는 내용은 현재 별도 정부 발표가 아닌 SBS 취재 결과로 확인됩니다.",
            date:"2026.03.28",
            type:"언론 단독확인",
            kind:"press",
            source:"SBS 취재파일",
            url:"https://news.sbs.co.kr/news/endPage.do?news_id=N1008495153"
        }
    ],

    research:[
        {
            title:"3개 업체 소각용량, 1999년 15t에서 2017년 543.84t으로 증가",
            description:"환경부는 약 36배 증가했다고 공식 조사자료에 기록했습니다.",
            date:"1999–2017",
            type:"공식 수치",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"주민 소변 카드뮴 2.47㎍/g-cr, 성인 평균의 3.7~5.7배",
            description:"카드뮴 농도는 소각시설과 가까울수록 유의하게 증가하는 경향을 보였습니다.",
            date:"2021.05.13",
            type:"공식 수치",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"2-나프톨은 대조군의 약 1.8배, 8-OHdG도 유의하게 높음",
            description:"일부 유해물질 대사체와 유전자 손상지표가 일반 국민 또는 대조지역보다 높게 조사됐습니다.",
            date:"2021.05.13",
            type:"공식 수치",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"남성 담낭암 2.63배·여성 신장암 2.79배",
            description:"후향적 코호트 연구에서 비교지역보다 높았지만, 이 수치만으로 소각시설과의 인과관계가 확정된 것은 아닙니다.",
            date:"2021.05.13",
            type:"공식 수치",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"폐암·혈액암 증가는 통계적 유의성 확인되지 않음",
            description:"정부는 높은 생체지표와 특정 암종을 확인했지만 소각시설과 암 발생의 역학적 관련성은 명확히 입증되지 않았다고 결론냈습니다.",
            date:"2021.05.13",
            type:"공식 결론",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        },
        {
            title:"시간·과거 배출자료의 한계를 인정하고 사후 모니터링 제안",
            description:"환경부도 고형암 잠복기와 과거 노출자료 부족을 조사 한계로 적시하고 2017년 이후 암 발생률의 지속 평가를 제안했습니다.",
            date:"2021.05.13",
            type:"공식 결론",
            kind:"official",
            source:"환경부",
            url:"https://mcee.go.kr/home/web/board/read.do%3Bjsessionid%3D6Wi4fLdXIj86puSRSuwUC8N_a7W3Eh23HM1zy6Gu.mehome1?boardCategoryId=&boardId=1452080&boardMasterId=939&decorator=&maxIndexPages=10&maxPageItems=10&menuId=10598&orgCd=&pagerOffset=4560&searchKey=&searchValue="
        }
    ],

    solidarity:[
        {
            title:"청주시의회 전 의원, 주민 건강영향조사 촉구 건의문",
            description:"재적의원 전원이 서명한 건의문을 환경부에 전달하며 주민들의 건강·생존 문제를 조사해 달라고 요구했습니다.",
            date:"2019.07.17",
            type:"공식 의정활동",
            kind:"official",
            source:"충청타임즈",
            url:"https://www.cctimes.kr/news/articleView.html?idxno=577864"
        },
        {
            title:"주민·환경단체, 조사 원자료 공개와 전문가 검증 요구",
            description:"최종보고서 공개, 한국역학회 검증, 환경부 장관 면담과 책임 있는 추가조사를 요구했습니다.",
            date:"2021.08",
            type:"시민단체 기록",
            kind:"civic",
            source:"청주충북환경운동연합",
            url:"https://cjcb.ekfem.or.kr/posts/potG41"
        },
        {
            title:"유민채 전 이장, 국회 환경노동위원회 국정감사 출석",
            description:"북이면 주민 건강 피해와 조사 과정의 문제를 증언하고 정부의 책임 있는 대응을 촉구했습니다.",
            date:"2021.10.13",
            type:"국회 증언 보도",
            kind:"press",
            source:"충북인뉴스",
            url:"https://www.cbinews.co.kr/news/articleView.html?idxno=202961"
        },
        {
            title:"전국 산업·의료폐기물 피해지역 국회토론회 연대",
            description:"북이면을 포함한 전국 피해지역 주민과 환경단체가 국회에서 피해 실태와 제도개선 방안을 함께 논의했습니다.",
            date:"2023.11.15",
            type:"국회 공식 기록",
            kind:"official",
            source:"국회도서관",
            url:"https://ampos.nanet.go.kr/materialSeminarDetail.do?control_no=PAMP10000000074213"
        },
        {
            title:"산업폐기물 피해 방지 법·제도 개선 토론",
            description:"북이면 사례를 포함해 주민 알권리, 사전고지와 폐기물 처리 공공성 강화 방안이 논의됐습니다.",
            date:"2024.08.29",
            type:"시민단체 기록",
            kind:"civic",
            source:"청주충북환경운동연합",
            url:"https://cjcb.ekfem.or.kr/posts/YytdR4"
        },
        {
            title:"79개 단체, 주민알권리 7대 표준 조례안 제안",
            description:"사전고지·위원회 공개·주민참여·환경피해 예비조사와 건강검진 지원 등을 제안했습니다. 아직 제정된 조례는 아닙니다.",
            date:"2026.03.24",
            type:"시민사회 제안",
            kind:"civic",
            source:"청주충북환경운동연합",
            url:"https://cjcb.ekfem.or.kr/posts/J5tOwXl"
        }
    ]

};


// =========================
// RECORD LIST RENDERING
// =========================

function renderRecordList(category){

    if(!recordList){
        return;
    }

    const selectedRecords = recordData[category];

    if(!selectedRecords){
        return;
    }

    recordList.innerHTML = "";
    const countLabel = document.querySelector('.archive-count');
    if(countLabel) countLabel.textContent = `${String(selectedRecords.length).padStart(2, '0')} RECORDS`;
    categoryButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));

    selectedRecords.forEach((record,index) => {

        const item = document.createElement("button");

        item.className = `record-item record-item--${record.kind}`;
        item.type = "button";
        item.style.setProperty('--vault-order', index);
        item.style.setProperty('--entry-delay', `${Math.min(index, 5) * 45}ms`);
        item.setAttribute(
            "aria-label",
            `${record.title} 기록 칩 열기`
        );

        item.innerHTML = `
            <span class="chip-rail" aria-hidden="true">
                ${Array.from({length:8},() => '<i></i>').join('')}
            </span>
            <span class="chip-face">
                <span class="chip-status" aria-hidden="true"></span>
                <span class="chip-code">REC ${String(index + 1).padStart(3,"0")}</span>
                <strong class="chip-type">${record.type}</strong>
                <time class="chip-date">${record.date}</time>
                <span class="chip-circuit" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="chip-sequence">/// ${String(index + 1).padStart(3,"0")}</span>
            </span>
        `;

        item.addEventListener('pointerenter',() => playArchiveSound('hover'));
        item.addEventListener('click',() => openRecordChip(record,index,item));

        recordList.appendChild(item);

    });

    if(chipVaultWindow){
        window.requestAnimationFrame(() => {
            const firstChip = recordList.querySelector('.record-item');
            if(firstChip){
                chipVaultWindow.scrollLeft = Math.max(0,firstChip.offsetLeft - chipVaultWindow.clientWidth * .34);
            }
            updateChipVaultDepth();
        });
    }

}

function moveChipVault(direction){
    if(!chipVaultWindow) return;
    const chip = recordList?.querySelector('.record-item');
    const distance = chip ? Math.max(190,chip.offsetWidth - 28) : chipVaultWindow.clientWidth * .72;
    const maxScroll = Math.max(0,chipVaultWindow.scrollWidth - chipVaultWindow.clientWidth);
    const nextScroll = Math.max(0,Math.min(maxScroll,chipVaultWindow.scrollLeft + direction * distance));
    chipVaultWindow.scrollTo({left:nextScroll,behavior:'smooth'});
    playArchiveSound('hover');
}

chipVaultPrev?.addEventListener('click',() => moveChipVault(-1));
chipVaultNext?.addEventListener('click',() => moveChipVault(1));

if(chipVaultWindow){
    let vaultPointerId = null;
    let vaultStartX = 0;
    let vaultStartScroll = 0;
    let vaultDragged = false;
    let suppressVaultClick = false;

    chipVaultWindow.addEventListener('pointerdown',event => {
        if(event.button !== 0) return;
        vaultPointerId = event.pointerId;
        vaultStartX = event.clientX;
        vaultStartScroll = chipVaultWindow.scrollLeft;
        vaultDragged = false;
    });

    window.addEventListener('pointermove',event => {
        if(event.pointerId !== vaultPointerId) return;
        const delta = event.clientX - vaultStartX;
        if(!vaultDragged && Math.abs(delta) > 12){
            vaultDragged = true;
            suppressVaultClick = true;
            chipVaultWindow.classList.add('is-dragging');
            try{ chipVaultWindow.setPointerCapture(event.pointerId); }catch(error){}
        }
        if(vaultDragged){
            event.preventDefault();
            chipVaultWindow.scrollLeft = vaultStartScroll - delta;
        }
    });

    const finishVaultDrag = event => {
        if(event.pointerId !== vaultPointerId) return;
        chipVaultWindow.classList.remove('is-dragging');
        try{ chipVaultWindow.releasePointerCapture(event.pointerId); }catch(error){}
        vaultPointerId = null;
        window.setTimeout(() => {
            vaultDragged = false;
            suppressVaultClick = false;
        },0);
    };
    window.addEventListener('pointerup',finishVaultDrag);
    window.addEventListener('pointercancel',finishVaultDrag);
    chipVaultWindow.addEventListener('click',event => {
        if(suppressVaultClick){
            event.preventDefault();
            event.stopPropagation();
        }
    },true);

    chipVaultWindow.addEventListener('scroll',() => {
        window.requestAnimationFrame(updateChipVaultDepth);
    },{passive:true});
}

function updateChipVaultDepth(){
    if(!chipVaultWindow || !recordList) return;
    const viewport = chipVaultWindow.getBoundingClientRect();
    const viewportCenter = viewport.left + viewport.width / 2;
    const divisor = Math.max(260,viewport.width * .31);

    recordList.querySelectorAll('.record-item').forEach(item => {
        const box = item.getBoundingClientRect();
        const distance = Math.max(-1.8,Math.min(1.8,(box.left + box.width / 2 - viewportCenter) / divisor));
        const absolute = Math.min(1.5,Math.abs(distance));
        item.style.setProperty('--vault-x',`${distance * 36}px`);
        item.style.setProperty('--vault-y',`${distance * -112}px`);
        item.style.setProperty('--vault-tilt',`${distance * -16}deg`);
        item.style.setProperty('--vault-roll',`${distance * -3.5}deg`);
        item.style.setProperty('--vault-z',`${115 - absolute * 235}px`);
        item.style.setProperty('--vault-scale',`${1.05 - Math.min(1,absolute) * .13}`);
        item.style.setProperty('--vault-opacity',`${1 - Math.min(1,absolute) * .3}`);
        item.style.zIndex = String(50 - Math.round(absolute * 20));
        item.classList.toggle('is-vault-focus',absolute < .3);
    });
}

window.addEventListener('resize',() => window.requestAnimationFrame(updateChipVaultDepth));

const archiveSoundFiles = {
    hover: '../images/change-records-atmosphere/assets/audio/ui/chip-hover.wav',
    eject: '../images/change-records-atmosphere/assets/audio/ui/chip-eject.wav',
    open: '../images/change-records-atmosphere/assets/audio/ui/panel-open.wav',
    close: '../images/change-records-atmosphere/assets/audio/ui/chip-return.wav'
};

const archiveSounds = new Map();
let activeRecordChip = null;
let recordChipDialog = null;
let recordChipTransitionTimers = [];

function clearRecordChipTransitionTimers(){
    recordChipTransitionTimers.forEach(timer => window.clearTimeout(timer));
    recordChipTransitionTimers = [];
}

function queueRecordChipTransition(callback,delay){
    const timer = window.setTimeout(callback,delay);
    recordChipTransitionTimers.push(timer);
}

function playArchiveSound(name){
    const src = archiveSoundFiles[name];
    if(!src) return;
    let audio = archiveSounds.get(name);
    if(!audio){
        audio = new Audio(src);
        audio.preload = 'auto';
        archiveSounds.set(name,audio);
    }
    audio.currentTime = 0;
    audio.volume = name === 'hover' ? .13 : .24;
    audio.play().catch(() => {});
}

function ensureRecordChipDialog(){
    if(recordChipDialog) return recordChipDialog;
    recordChipDialog = document.createElement('div');
    recordChipDialog.className = 'record-chip-dialog';
    recordChipDialog.setAttribute('aria-hidden','true');
    recordChipDialog.innerHTML = `
        <div class="record-chip-backdrop"></div>
        <div class="record-reader-stage" aria-hidden="true">
            <div class="record-reader-device">
                <div class="record-reader-head">
                    <span>E.FACT / ARCHIVE READER</span>
                    <strong class="record-reader-state" role="status" aria-live="polite">STANDBY</strong>
                </div>
                <div class="record-reader-slot" aria-hidden="true">
                    <span class="record-reader-chip"></span>
                    <i></i>
                </div>
                <div class="record-reader-core" aria-hidden="true">
                    <span>01</span><span>10</span><span>01</span><span>11</span><span>00</span><span>10</span>
                </div>
                <div class="record-reader-progress" aria-hidden="true"><i></i></div>
                <p>PHYSICAL ARCHIVE / DATA INTEGRITY CHECK</p>
            </div>
        </div>
        <article class="record-chip-panel" role="dialog" aria-modal="true" aria-labelledby="record-chip-title">
            <header class="record-chip-panel-bar">
                <div class="record-chip-panel-code"><i></i>E.FACT / ARCHIVE ACCESS</div>
                <div class="record-chip-panel-signals" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
                <button class="record-chip-close" type="button" aria-label="기록 닫기">×</button>
            </header>
            <div class="record-chip-panel-grid">
                <aside class="record-chip-id">
                    <small>RECORD NO.</small>
                    <span class="record-chip-id-number"></span>
                    <small>CLASSIFICATION</small>
                    <span class="record-chip-id-type"></span>
                    <small>DATE</small>
                    <time class="record-chip-id-date"></time>
                    <div class="record-chip-verified"><span>✓</span>VERIFIED</div>
                    <div class="record-chip-checksum">
                        <small>CHECKSUM</small>
                        <span><i></i><i></i><i></i><i></i><i></i><i></i><b>A7F9 · 3E2C</b></span>
                    </div>
                </aside>
                <section class="record-chip-content">
                    <div class="record-chip-content-head">
                        <p class="record-chip-kicker">VERIFIED RECORD</p>
                        <div class="record-chip-integrity"><span>DATA INTEGRITY</span><i><b></b></i><strong>100%</strong></div>
                    </div>
                    <h3 id="record-chip-title"></h3>
                    <p class="record-chip-description"></p>
                    <footer class="record-chip-content-foot">
                        <div class="record-chip-source"></div>
                        <a class="record-chip-link" target="_blank" rel="noopener noreferrer">원문 기록 확인 <span>↗</span></a>
                    </footer>
                </section>
            </div>
            <div class="record-chip-scanline" aria-hidden="true"></div>
        </article>`;
    document.body.appendChild(recordChipDialog);
    recordChipDialog.querySelector('.record-chip-close').addEventListener('click',closeRecordChip);
    recordChipDialog.querySelector('.record-chip-backdrop').addEventListener('click',closeRecordChip);
    return recordChipDialog;
}

function openRecordChip(record,index,trigger){
    const dialog = ensureRecordChipDialog();
    if(dialog.classList.contains('is-open')) return;
    clearRecordChipTransitionTimers();
    activeRecordChip = trigger;
    trigger.classList.add('is-ejecting');
    playArchiveSound('eject');
    dialog.querySelector('.record-chip-id-number').textContent = `REC ${String(index + 1).padStart(3,'0')}`;
    dialog.querySelector('.record-chip-id-type').textContent = record.type;
    dialog.querySelector('.record-chip-id-date').textContent = record.date;
    dialog.querySelector('#record-chip-title').textContent = record.title;
    dialog.querySelector('.record-chip-description').textContent = record.description;
    dialog.querySelector('.record-chip-source').textContent = `SOURCE / ${record.source}`;
    const link = dialog.querySelector('.record-chip-link');
    link.href = record.url;
    const readerState = dialog.querySelector('.record-reader-state');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const insertDelay = reducedMotion ? 40 : 680;
    const decodeDelay = reducedMotion ? 90 : 1580;
    const revealDelay = reducedMotion ? 140 : 1980;

    dialog.classList.remove('is-decoding','is-verified','is-record-ready','is-closing');
    dialog.classList.add('is-open','is-inserting');
    dialog.setAttribute('aria-hidden','false');
    document.body.classList.add('record-chip-open');
    readerState.textContent = 'CHIP INSERT';

    queueRecordChipTransition(() => {
        dialog.classList.remove('is-inserting');
        dialog.classList.add('is-decoding');
        readerState.textContent = 'DECODING 01 / 06';
    },insertDelay);

    queueRecordChipTransition(() => {
        dialog.classList.remove('is-decoding');
        dialog.classList.add('is-verified');
        readerState.textContent = 'DATA VERIFIED';
    },decodeDelay);

    queueRecordChipTransition(() => {
        dialog.classList.add('is-record-ready');
        playArchiveSound('open');
        dialog.querySelector('.record-chip-close').focus();
    },revealDelay);
}

function closeRecordChip(){
    if(!recordChipDialog?.classList.contains('is-open')) return;
    clearRecordChipTransitionTimers();
    playArchiveSound('close');
    recordChipDialog.classList.add('is-closing');
    recordChipDialog.classList.remove('is-open','is-inserting','is-decoding','is-verified','is-record-ready');
    recordChipDialog.setAttribute('aria-hidden','true');
    document.body.classList.remove('record-chip-open');
    queueRecordChipTransition(() => {
        recordChipDialog?.classList.remove('is-closing');
        activeRecordChip?.classList.remove('is-ejecting');
        activeRecordChip?.focus();
        activeRecordChip = null;
        clearRecordChipTransitionTimers();
    },420);
}


// 카테고리 선택

categoryButtons.forEach(button => {

    button.addEventListener("click",() => {

        const category = button.dataset.category;

        categoryButtons.forEach(categoryButton => {

            categoryButton.classList.remove("active");

        });

        button.classList.add("active");

        renderRecordList(category);

    });

});


// 최초 목록 출력

renderRecordList("issue");


// =========================
// GALLERY MODAL
// =========================

function openGalleryModal(
    imageSrc,
    imageTitle,
    imageDescription,
    sourceUrl,
    sourceLabel
){

    if(
        !galleryModal ||
        !modalImage ||
        !modalTitle
    ){
        return;
    }

    modalImage.src = imageSrc;
    modalImage.alt = imageTitle;

    modalTitle.textContent = imageTitle;

    if(modalDescription){
        modalDescription.textContent = imageDescription || "";
    }

    if(modalSource){
        modalSource.href = sourceUrl || "#";
        modalSource.classList.toggle("is-hidden",!sourceUrl);
    }

    if(modalSourceLabel){
        modalSourceLabel.textContent = sourceLabel || "자료 원문 확인";
    }

    galleryModal.classList.add("open");

    galleryModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

}


function closeGalleryModal(){

    if(!galleryModal){
        return;
    }

    galleryModal.classList.remove("open");

    galleryModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

    setTimeout(() => {

        if(modalImage){

            modalImage.src = "";
            modalImage.alt = "";

        }

        if(modalDescription){
            modalDescription.textContent = "";
        }

        if(modalSource){
            modalSource.href = "#";
        }

    },350);

}


// 이미지 클릭

galleryItems.forEach(item => {

    item.addEventListener("click",() => {

        const imageSrc = item.dataset.image;
        const imageTitle = item.dataset.title;
        const imageDescription = item.dataset.description;
        const sourceUrl = item.dataset.source;
        const sourceLabel = item.dataset.sourceLabel;

        if(!imageSrc){
            return;
        }

        openGalleryModal(
            imageSrc,
            imageTitle || "기록 이미지",
            imageDescription,
            sourceUrl,
            sourceLabel
        );

    });

});


// 닫기 버튼

if(modalClose){

    modalClose.addEventListener(
        "click",
        closeGalleryModal
    );

}


// 바깥 영역 클릭

if(modalBackdrop){

    modalBackdrop.addEventListener(
        "click",
        closeGalleryModal
    );

}


// ESC 키로 닫기

document.addEventListener("keydown",event => {

    if(
        event.key === "Escape" &&
        recordChipDialog?.classList.contains("is-open")
    ){

        closeRecordChip();
        return;

    }

    if(
        event.key === "Escape" &&
        galleryModal?.classList.contains("open")
    ){

        closeGalleryModal();

    }

});


// =========================
// MOBILE HEADER SPACING
// =========================

function updateMobileHeaderSpacing(){

    if(!header || !hero){
        return;
    }

    if(window.innerWidth <= 768){

        const headerHeight = header.offsetHeight;

        hero.style.marginTop =
            `${headerHeight + 15}px`;

    }else{

        hero.style.marginTop = "110px";

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
