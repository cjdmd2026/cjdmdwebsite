// 뷰 전환 기능
document.addEventListener("DOMContentLoaded", () => {
    const viewButtons = document.querySelectorAll(".view-button");

    const views = {
        grid: document.querySelector("#gridview"),
        slide: document.querySelector("#slideview")
     };

     function changeView(selectedView) {
    // 그리드와 슬라이드 콘텐츠 변경
        Object.entries(views).forEach(([viewName, viewElement]) => {
            viewElement.hidden = viewName !== selectedView;
        });

        // 현재 보고 있는 방식의 버튼은 숨김
        // 다른 보기 방식의 버튼만 표시
        viewButtons.forEach((button) => {
            button.hidden = button.dataset.view === selectedView;
        });
    }

    viewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeView(button.dataset.view);
        });
    });

    // 처음에는 그리드 보기
    changeView("slide");
});
// 마우스 휠로 카드 전환 (opacity 크로스페이드)
const slideview = document.querySelector("#slideview");
const cards = [...document.querySelectorAll("#slideview .card")];

let currentIndex = 0;
let isScrolling = false;

// 초기 카드 활성화
cards[currentIndex].classList.add("is-active");

document.addEventListener(
    "wheel",
    (event) => {
        // 슬라이드 뷰가 아니면 무시
        if (slideview.hidden) return;

        event.preventDefault();

        if (isScrolling) return;

        const direction = event.deltaY > 0 ? 1 : -1;
        const nextIndex = currentIndex + direction;

        if (nextIndex < 0 || nextIndex >= cards.length) return;

        isScrolling = true;

        cards[currentIndex].classList.remove("is-active");
        currentIndex = nextIndex;
        cards[currentIndex].classList.add("is-active");

        setTimeout(() => {
            isScrolling = false;
        }, 600);
    },
    { passive: false }
);