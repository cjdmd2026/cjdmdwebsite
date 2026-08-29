// =========================================================
// Project Slide 생성
// =========================================================

function renderSlideProjects() {

    const container =
        document.querySelector(
            "#slideview .content"
        );


    if (!container) {
        return;
    }


    if (
        !window.PROJECTS ||
        !Array.isArray(window.PROJECTS)
    ) {

        console.error(
            "PROJECTS 데이터를 찾을 수 없습니다. project-data.js 연결을 확인해주세요."
        );

        return;
    }


    // Slide 순서대로 정렬
    const projects =
        [...window.PROJECTS].sort(
            (a, b) =>
                a.slideOrder -
                b.slideOrder
        );


    // 기존 HTML 카드 제거
    container.innerHTML = "";


    // 프로젝트 카드 생성
    projects.forEach(
        (project, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            // 첫 번째 카드 활성화
            if (index === 0) {

                card.classList.add(
                    "is-active"
                );

            }


            // 프로젝트 ID
            card.dataset.projectId =
                project.id;


            // 카테고리
            card.dataset.category =
                project.category;


            // 프로젝트 이미지
            card.style.backgroundImage =
                `url("${project.image}")`;


            container.appendChild(
                card
            );

        }
    );


    console.log(
        `Slide 프로젝트 ${projects.length}개 생성 완료`
    );

}



// =========================================================
// Slide 프로젝트 정보 변경
// =========================================================

function updateSlideInfo(
    projectId,
    animate = false
) {

    if (
        !window.PROJECTS ||
        !Array.isArray(window.PROJECTS)
    ) {
        return;
    }


    const project =
        window.PROJECTS.find(
            item =>
                item.id === projectId
        );


    if (!project) {
        return;
    }



    // =====================================================
    // 화면 요소
    // =====================================================

    const titleGroup =
        document.querySelector(
            ".title-section h1[typewriter-effect]"
        );


    const title =
        document.querySelector(
            ".project-title"
        );


    const worker =
        document.querySelector(
            ".worker"
        );


    const description =
        document.querySelector(
            ".slide-description p"
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


        if (description) {

            window.TypewriterEffect.cancel(
                description
            );

        }

    }



    // =====================================================
    // 새로운 프로젝트 데이터 입력
    // =====================================================

    if (title) {

        title.textContent =
            project.title;

    }


    if (worker) {

        worker.textContent =
            project.members.join(", ");

    }


    if (description) {

        description.textContent =
            project.description;

    }



    // =====================================================
    // Writer 다시 실행
    // =====================================================

    if (
        animate &&
        window.TypewriterEffect
    ) {

        requestAnimationFrame(
            () => {

                // 프로젝트명 + 작업자
                if (titleGroup) {

                    window.TypewriterEffect.replay(
                        titleGroup
                    );

                }


                // 설명은 제목보다 살짝 늦게
                if (description) {

                    window.setTimeout(
                        () => {

                            window.TypewriterEffect.replay(
                                description
                            );

                        },

                        120
                    );

                }

            }
        );

    }

}



// =========================================================
// Slide 생성
// =========================================================

renderSlideProjects();



// =========================================================
// Slide 관련 요소
// =========================================================

const slideview =
    document.querySelector(
        "#slideview"
    );


const cards =
    [
        ...document.querySelectorAll(
            "#slideview .card"
        )
    ];


let currentIndex =
    0;


let isScrolling =
    false;



// =========================================================
// 초기 상태
// =========================================================

if (
    cards.length > 0
) {

    cards[currentIndex]
        .classList
        .add(
            "is-active"
        );


    /*
     * 첫 번째 프로젝트 정보만 미리 입력
     *
     * Writer는 여기서 실행하지 않음.
     * 최초 페이지 진입 Writer는
     * page-transition.js가 담당.
     */
    updateSlideInfo(
        cards[currentIndex]
            .dataset
            .projectId,

        false
    );

}



// =========================================================
// Grid 제목으로 변경
// =========================================================

function showGridTitle() {

    const titleGroup =
        document.querySelector(
            ".title-section h1[typewriter-effect]"
        );


    const title =
        document.querySelector(
            ".project-title"
        );


    const description =
        document.querySelector(
            ".slide-description p[typewriter-effect]"
        );



    // =====================================================
    // 진행 중인 Writer 중지
    // =====================================================

    if (
        window.TypewriterEffect
    ) {

        if (titleGroup) {

            window.TypewriterEffect.cancel(
                titleGroup
            );

        }


        if (description) {

            window.TypewriterEffect.cancel(
                description
            );

        }

    }



    // =====================================================
    // Grid 제목
    // =====================================================

    if (title) {

        title.textContent =
            "프로젝트";

    }



    /*
     * cancel()을 하면 is-typing / is-typed가 제거되므로
     * manual typewriter 요소가 다시 visibility:hidden이
     * 되는 것을 방지하기 위해 완료 상태로 만들어줌.
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
// Slide 정보 복구
// =========================================================

function showCurrentSlideInfo(
    forceVisible = false
) {

    if (
        cards.length === 0
    ) {
        return;
    }


    const projectId =
        cards[currentIndex]
            .dataset
            .projectId;


    /*
     * 현재 프로젝트 데이터만 갱신
     *
     * 최초 페이지 진입에서는 여기서
     * is-typed를 붙이지 않는다.
     *
     * Stamp가 끝난 뒤 page-transition.js가
     * TypewriterEffect를 실행하도록 숨김 상태 유지.
     */
    updateSlideInfo(
        projectId,
        false
    );


    /*
     * 최초 페이지 진입이면 종료
     *
     * [typewriter-trigger="manual"]의
     * visibility:hidden 상태를 그대로 유지한다.
     */
    if (
        !forceVisible
    ) {
        return;
    }


    /*
     * Grid → Slide로 다시 돌아오는 경우에만
     * 현재 프로젝트 텍스트를 즉시 보이게 한다.
     */
    const titleGroup =
        document.querySelector(
            ".title-section h1[typewriter-effect]"
        );


    const description =
        document.querySelector(
            ".slide-description p[typewriter-effect]"
        );


    if (titleGroup) {

        titleGroup.classList.add(
            "is-typed"
        );

        titleGroup.dataset.typing =
            "false";

        titleGroup.dataset.typed =
            "true";

    }


    if (description) {

        description.classList.add(
            "is-typed"
        );

        description.dataset.typing =
            "false";

        description.dataset.typed =
            "true";

    }

}



// =========================================================
// 최초 View 설정 여부
// =========================================================

let isInitialViewSetup =
    true;



// =========================================================
// 뷰 전환
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const viewButtons =
            document.querySelectorAll(
                ".view-button"
            );


        const views = {

            grid:
                document.querySelector(
                    "#gridview"
                ),

            slide:
                document.querySelector(
                    "#slideview"
                )

        };



        // =================================================
        // View 변경
        // =================================================

        function changeView(
            selectedView
        ) {

            // =============================================
            // Grid / Slide 표시 전환
            // =============================================

            Object.entries(
                views
            ).forEach(
                ([viewName, viewElement]) => {

                    if (!viewElement) {
                        return;
                    }


                    viewElement.hidden =
                        viewName !==
                        selectedView;

                }
            );



            // =============================================
            // 현재 보고 있는 방식 버튼은 숨김
            // =============================================

            viewButtons.forEach(
                button => {

                    button.hidden =
                        button.dataset.view ===
                        selectedView;

                }
            );



            // =============================================
            // Grid View
            // =============================================

            if (
                selectedView ===
                "grid"
            ) {

                showGridTitle();

            }



            // =============================================
            // Slide View
            // =============================================

            else if (
                selectedView ===
                "slide"
            ) {

                showCurrentSlideInfo(
                    !isInitialViewSetup
                );

            }

        }



        // =================================================
        // 버튼 이벤트
        // =================================================

        viewButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        changeView(
                            button.dataset.view
                        );

                    }
                );

            }
        );



        // =================================================
        // 최초 View
        // =================================================

        changeView(
            "slide"
        );


        /*
         * 이후부터는 사용자가 직접
         * Grid / Slide를 전환하는 것으로 간주
         */
        isInitialViewSetup =
            false;

    }
);



// =========================================================
// 마우스 휠 Slide 전환
// =========================================================

document.addEventListener(

    "wheel",

    event => {

        // =================================================
        // Slide View가 아니면 무시
        // =================================================

        if (
            !slideview ||
            slideview.hidden
        ) {

            return;

        }



        event.preventDefault();



        // =================================================
        // 카드 전환 중
        // =================================================

        if (
            isScrolling
        ) {

            return;

        }



        // =================================================
        // 휠 방향
        // =================================================

        const direction =
            event.deltaY > 0
                ? 1
                : -1;



        const nextIndex =
            currentIndex +
            direction;



        // =================================================
        // 처음 / 마지막 카드 범위 제한
        // =================================================

        if (
            nextIndex < 0 ||
            nextIndex >= cards.length
        ) {

            return;

        }



        isScrolling =
            true;



        // =================================================
        // 기존 카드 비활성화
        // =================================================

        cards[currentIndex]
            .classList
            .remove(
                "is-active"
            );



        // =================================================
        // 다음 프로젝트 Index
        // =================================================

        currentIndex =
            nextIndex;



        // =================================================
        // 새 카드 활성화
        // =================================================

        cards[currentIndex]
            .classList
            .add(
                "is-active"
            );



        // =================================================
        // 프로젝트 텍스트 변경
        // + Writer 다시 실행
        // =================================================

        updateSlideInfo(

            cards[currentIndex]
                .dataset
                .projectId,

            true

        );



        // =================================================
        // 연속 휠 입력 방지
        // =================================================

        window.setTimeout(
            () => {

                isScrolling =
                    false;

            },

            600
        );

    },

    {
        passive: false
    }

);