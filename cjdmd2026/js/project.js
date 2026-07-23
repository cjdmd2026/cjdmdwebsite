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
    changeView("grid");
});

//마우스 휠
const slider = document.querySelector("#slideview .content");
const card = slider.querySelector(".card");

let isScrolling = false;

slider.addEventListener(
    "wheel",
    (event) => {
        if (slider.scrollWidth <= slider.clientWidth) return;

        event.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

    const gap = parseFloat(getComputedStyle(slider).gap) || 0;
    const moveAmount = card.offsetWidth + gap;

    slider.scrollBy({
      left: event.deltaY > 0 ? moveAmount : -moveAmount,
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  },
  { passive: false }
);