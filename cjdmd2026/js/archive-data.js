// 참여 학생 이름을 연도별 배열에 입력하세요. 예: ["이름1", "이름2"]
const STUDENTS_BY_YEAR = {
    "2021": ["김수연", "김해지", "김현주", "김현주", "김홍비", "남현정", "유채은", "이수", "이정민", "이현지", "임나영", "전보경", "조수빈", "조해지"],
    "2022": ["곽은지", "김남주", "김보연", "김보영", "김하나", "도민지", "박진슬", "박혜빈", "방미선", "방지우", "심지영", "안신영", "염윤지", "오예록", "오주희", "윤가영", "이유진", "이지은", "이효영", "조예림", "최서영", "하주희", "홍주연", "황수영"],    "2023": ["강서윤", "금윤서", "김민지", "김민채", "김윤아", "김윤희", "김정우", "김준호", "김혜인", "민서하", "백선혜", "변민섭", "신유진", "안성준", "안현정", "오소영", "윤선민", "이규민", "이서현", "이수민", "이시윤", "이지민", "이지선", "이지은", "이채은", "이현수", "임경용", "임지원", "장소희", "정주연", "조수아", "차은지", "최지수", "하예원", "하지원", "황인소"],
    "2024": ["김건우", "김나현", "김동경", "김무경", "김미성", "김채린", "김희진", "박동현", "박소이", "소수화", "손성민", "손유진", "양시원", "윤동혁", "이강현", "이다결", "이상훈", "이지민", "정이봄", "정진서", "조상윤", "최빛나", "홍유리", "홍자현"],
    "2025": ["강유림", "고현희", "곽초은", "권용우", "김도희", "김루나", "김민정", "김보미", "김선정", "김윤주", "김지수", "김현지", "김현진", "나원호", "노채린", "민유진", "박기연", "박미소", "박서희", "박순후", "박지수", "반상우", "백진주", "서동현", "손예진", "양윤보", "오우진", "오효진", "왕뢰이저", "유은비", "윤정원", "이새연", "이소현", "이연우", "이주연", "이채민", "이채현", "이현서", "임희원", "정예원", "정유민", "조범규", "조서영", "조예리", "최서윤", "최희선", "황서진", "황지원"],
    "2026": ["고비주", "권민성", "김다현", "김도연", "김민재", "김성은", "김주연", "김지유", "김지유", "김지윤", "김하원", "김혜진", "남나영", "노민영", "민지호", "박윤아", "박윤지", "서연우", "손예진", "송승빈", "송유진", "안나경", "유혜진", "윤지원", "윤태균", "이고은", "이나영", "임종원", "조우성", "조은교", "주보민", "주예진", "함대연"]
};

const DEFAULT_STUDENT_YEAR = "2026";

function renderStudents(container, year) {
    if (!container) return;
    const entries = STUDENTS_BY_YEAR[year];
    const names = Array.isArray(entries)
        ? entries.filter(name => typeof name === "string" && name.trim()).map(name => name.trim())
        : [];
    const fragment = document.createDocumentFragment();
    names.forEach(name => {
        const item = document.createElement("span");
        item.className = "student-name";
        item.setAttribute("role", "listitem");
        item.textContent = name;
        fragment.append(item);
    });
    container.replaceChildren(fragment);
    container.setAttribute("role", "list");
    container.setAttribute("aria-label", year ? `${year}년 참여 학생` : "참여 학생");
    container.dataset.year = year || "";
    container.hidden = names.length === 0;
    container.closest(".explanation")?.classList.toggle("has-students", names.length > 0);
}

