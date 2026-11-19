/* =========================================================
   Main Page Data
   - 위원회 / 교수진 / 유튜브 영상 데이터를 한곳에서 관리합니다.
   - 학생 id는 designer-data.js(window.DESIGNERS)의 id와 같습니다.
   ========================================================= */

/* 졸업 전시 위원회 (총 34명)
 * ※ 유길종(디피부)은 개인 조각 아이콘이 없어 목록에서 제외했습니다.
 * ※ 김지유 학생이 두 명이라 id로 구분합니다.
 *   디피부 → kim-jiyou-cocorang, 편집부 → kim-jiyoo-phishing-ddook 로 임시 지정 (확인 필요)
 */
window.MAIN_COMMITTEE = [
    {
        id: "chairperson",
        label: "위원장·부위원장",
        image: "../assets/images/department/chairperson/Chairperson_Horizontal.webp",
        members: [
            { id: "yun-jiwon" },
            { id: "seo-yeonwoo" }
        ]
    },
    {
        id: "planning",
        label: "기획부",
        image: "../assets/images/department/planning/Planning_Department_Horizontal.webp",
        members: [
            { id: "jo-eungyo" },
            { id: "lee-nayeong" },
            { id: "nam-nayoung" },
            { id: "go-biju" },
            { id: "kim-dahyun" },
            { id: "kim-doyeon" }
        ]
    },
    {
        id: "display",
        label: "디피부",
        image: "../assets/images/department/display/Display_Department_Horizontal.webp",
        members: [
            { id: "song-yujin" },
            { id: "kim-jiyoon" },
            { id: "ham-daeyeon" },
            { id: "kim-minjae" },
            { id: "kim-jiyou-cocorang" },
            { id: "jo-wooseong" }
        ]
    },
    {
        id: "multi",
        label: "멀티부",
        image: "../assets/images/department/multi/Multi_Department_Horizontal.webp",
        members: [
            { id: "youn-taegyun" },
            { id: "ahn-nagyeong" },
            { id: "park-yuna" },
            { id: "park-yoonji" },
            { id: "kim-juyoun" }
        ]
    },
    {
        id: "poster",
        label: "포스터부",
        image: "../assets/images/department/poster/Poster_Department_Horizontal.webp",
        members: [
            { id: "noh-minyeong" },
            { id: "min-jiho" },
            { id: "kwon-minseong" },
            { id: "kim-hyejin" }
        ]
    },
    {
        id: "editorial",
        label: "편집부",
        image: "../assets/images/department/editorial/Editorial_Department_Horizontal.webp",
        members: [
            { id: "kim-sungeun" },
            { id: "ju-bomin" },
            { id: "yoo-hyejin" },
            { id: "lee-goeun" },
            { id: "kim-jiyoo-phishing-ddook" }
        ]
    },
    {
        id: "promotion",
        label: "홍보부",
        image: "../assets/images/department/promotion/Promotion_Department_Horizontal.webp",
        members: [
            { id: "lim-jongwon" },
            { id: "song-seungbin" },
            { id: "ju-yejin" },
            { id: "son-yejin" },
            { id: "kim-hawon" }
        ]
    }
];

/* 교수진
 * message: 카드 하단 소감 문구 (\n 으로 줄바꿈).
 * 김양호·장성복·이종선·이한길 문구는 전시 화면용 초안이며, 본인 전달 문구를 받으면 교체합니다.
 * image가 비어 있으면 '사진 준비 중' 카드가 나옵니다.
 * 처음 가운데에 올 교수님은 MAIN_PROFESSOR_START 로 지정합니다.
 */
window.MAIN_PROFESSORS = [
    {
        name: "김양호",
        major: "Special Thanks To",
        message: "함께 고민하며 완성한 이번 졸업전시가\n여러분의 다음 도전에 힘이 되길 바랍니다.",
        image: "../assets/images/professor/kimyangho.webp"
    },
    {
        name: "백승범",
        major: "인터랙션 디자인",
        message: "치열한 고민 끝에 펼쳐낸 여러분만의 세계가\n더 많은 사람의 마음에 닿길 바랍니다.",
        image: "../assets/images/professor/baekseungbeom.webp"
    },
    {
        name: "장성복",
        major: "서비스 경험디자인",
        message: "사람을 향한 따뜻한 시선과 작은 질문이\n더 나은 일상을 만드는 힘이 되길 바랍니다.",
        image: "../assets/images/professor/jangseongbok.webp"
    },
    {
        name: "이종선",
        major: "인터페이스 디자인",
        message: "익숙한 화면 속 새로운 가능성을 발견하며\n자신만의 디자인을 꾸준히 이어 가길 바랍니다.",
        image: "../assets/images/professor/leejongseon.webp"
    },
    {
        name: "정수봉",
        major: "AI 고급 프로그래밍",
        message: "열심히 진심으로 노력하면 무엇이든 해볼 수 있습니다.\n사람마다 시기만 다를 뿐이에요. 화이팅!",
        image: "../assets/images/professor/jeongsubong.webp"
    },
    {
        name: "이한길",
        major: "Special Thanks To",
        message: "함께 쌓아 온 경험을 든든한 발판 삼아\n더 넓은 세상으로 힘차게 나아가길 바랍니다.",
        image: "../assets/images/professor/leehangil.webp"
    }
];
window.MAIN_PROFESSOR_START = 2; // 장성복 교수님

/* 졸업 전시 유튜브 — youtu.be 주소의 영상 id만 넣습니다. */
window.MAIN_VIDEOS = [
    { id: "1EMWWo91-m8", title: "졸업 전시 영상 01" },
    { id: "wzALa1WWJyo", title: "졸업 전시 영상 02" },
    { id: "ft-ACq8cQQw", title: "졸업 전시 영상 03" },
    { id: "TnRZ7BPrK1U", title: "졸업 전시 영상 04" }
];

/* 포스터 (기본 → 다크 순서로 자동 전환)
 * image 가 비어 있으면 background 색만 칠합니다.
 * '결합' 아이콘 색은 버전별로 js/main-poster-sprites.js 아틀라스에 들어 있습니다. */
window.MAIN_POSTERS = [
    {
        theme: "light",
        label: "화이트 포스터",
        image: "../assets/images/poster/Vertical_poster_white.webp",
        pdf: "../assets/download/Vertical_poster_white.pdf",
        background: "#ffffff"
    },
    {
        theme: "dark",
        label: "블랙 포스터",
        image: "../assets/images/poster/Vertical_poster_black.webp",
        pdf: "../assets/download/Vertical_poster_black.pdf",
        background: "#000000"
    }
];

// Resolve shared data from this script, so the root home and archived layouts
// use the same assets even when the site is hosted under a subdirectory.
(() => {
    const base = document.currentScript.src;
    for (const item of [...window.MAIN_COMMITTEE, ...window.MAIN_PROFESSORS, ...window.MAIN_POSTERS]) {
        for (const field of ['image', 'pdf']) {
            if (item[field]) item[field] = new URL(item[field], base).href;
        }
    }
})();
