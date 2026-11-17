/* =========================================================
   COCO:LANG GLOBAL AUDIO
   - 페이지별 BGM
   - BGM 재생 위치 유지
   - 모든 버튼 클릭 효과음
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     현재 페이지 확인
  ===================================================== */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  /* =====================================================
     페이지별 BGM 설정
  ===================================================== */

  const bgmGroups = {

    /* 시작 영역 */
    start: {
      pages: [
        "",
        "test-index.html",
        "select.html",
        "pet-status.html",
        "dog-info.html",
        "guest-info.html"
      ],

      src: "audio/bgm-start.mp3"
    },


    /* 성향 테스트 */
    question: {
      pages: [
        "question.html"
      ],

      src: "audio/bgm-question.mp3"
    },


    /* 결과 영역 */
    result: {
      pages: [
        "result.html",
        "result-detail.html",
        "types.html"
      ],

      src: "audio/bgm-result.mp3"
    }

  };


  /* =====================================================
     현재 페이지가 어느 BGM 그룹인지 찾기
  ===================================================== */

  let currentGroup = null;
  let currentBgmSrc = null;


  Object.keys(bgmGroups).forEach(function (groupName) {

    const group =
      bgmGroups[groupName];

    if (
      group.pages.includes(currentPage)
    ) {

      currentGroup =
        groupName;

      currentBgmSrc =
        group.src;

    }

  });


  /* =====================================================
     BGM 생성
  ===================================================== */

  let bgm = null;


  if (currentBgmSrc) {

    bgm =
      new Audio(currentBgmSrc);

    bgm.loop = true;

    /* BGM 볼륨 */
    bgm.volume = 0.22;


    /* ===============================================
       같은 BGM 그룹이면 이전 재생 위치 이어받기
    =============================================== */

    const savedGroup =
      sessionStorage.getItem(
        "cocolangBgmGroup"
      );

    const savedTime =
      parseFloat(
        sessionStorage.getItem(
          "cocolangBgmTime"
        )
      );


    if (
      savedGroup === currentGroup &&
      !Number.isNaN(savedTime)
    ) {

      bgm.currentTime =
        savedTime;

    } else {

      bgm.currentTime = 0;

    }


    /* 현재 그룹 저장 */

    sessionStorage.setItem(
      "cocolangBgmGroup",
      currentGroup
    );

  }


  /* =====================================================
     BGM 재생
  ===================================================== */

  function playBgm() {

    if (!bgm) {
      return;
    }


    bgm
      .play()
      .then(function () {

        sessionStorage.setItem(
          "cocolangAudioUnlocked",
          "true"
        );

      })
      .catch(function () {

        /*
         * 브라우저에서 자동재생을 막은 경우
         * 첫 클릭 때 자동으로 다시 재생됨
         */

      });

  }


  /* 이전 페이지에서 이미 사용자가 클릭했다면 재생 시도 */

  if (
    sessionStorage.getItem(
      "cocolangAudioUnlocked"
    ) === "true"
  ) {

    playBgm();

  }


  /* =====================================================
     처음 클릭했을 때 BGM 시작
  ===================================================== */

  function unlockAudio() {

    playBgm();

    sessionStorage.setItem(
      "cocolangAudioUnlocked",
      "true"
    );


    document.removeEventListener(
      "pointerdown",
      unlockAudio
    );

    document.removeEventListener(
      "keydown",
      unlockAudio
    );

  }


  document.addEventListener(
    "pointerdown",
    unlockAudio
  );

  document.addEventListener(
    "keydown",
    unlockAudio
  );


  /* =====================================================
     BGM 시간 계속 저장
  ===================================================== */

  if (bgm) {

    setInterval(function () {

      if (
        !bgm.paused &&
        Number.isFinite(
          bgm.currentTime
        )
      ) {

        sessionStorage.setItem(
          "cocolangBgmTime",
          String(
            bgm.currentTime
          )
        );

      }

    }, 500);

  }


  /* =====================================================
     페이지 이동 직전 재생 위치 저장
  ===================================================== */

  window.addEventListener(
    "pagehide",
    function () {

      if (!bgm) {
        return;
      }


      sessionStorage.setItem(
        "cocolangBgmGroup",
        currentGroup
      );

      sessionStorage.setItem(
        "cocolangBgmTime",
        String(
          bgm.currentTime
        )
      );

    }
  );


  /* =====================================================
     클릭 효과음
  ===================================================== */

  const clickSound =
    new Audio(
      "audio/click.mp3"
    );

  clickSound.volume = 0.55;


  /* =====================================================
     모든 버튼 클릭 효과음
  ===================================================== */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "button"
        );


      if (!button) {
        return;
      }


      /* disabled 버튼은 소리 X */

      if (
        button.disabled ||
        button.classList.contains(
          "disabled"
        )
      ) {

        return;

      }


      /*
       * 빠르게 여러 번 눌러도
       * 클릭음 처음부터 다시 재생
       */

      clickSound.pause();

      clickSound.currentTime = 0;


      clickSound
        .play()
        .catch(function () {});

    }
  );

});