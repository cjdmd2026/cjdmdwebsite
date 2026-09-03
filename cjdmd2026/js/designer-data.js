/* =========================================================
   Designer Data
   =========================================================

   window.DESIGNERS: 설문 응답 34명 / 설문 순서(가나다순).
   Grid View, Slide View, 추후 Designer Detail Page 공통 데이터.

   id           : 디자이너 고유 ID (동명이인은 별도 ID)
   nameKo       : 설문 국문 이름
   nameEn       : 설문 영문 이름 (철자/대소문자 유지)
   initial      : 초성 필터용
   projectIds   : window.PROJECTS의 id 연결
   teamName     : 설문에 입력된 팀명 원문
   teammateIds  : 본인을 제외한 팀원의 DESIGNERS.id
   phone        : 설문 연락처
   email        : 설문 이메일
   instagram    : @를 제외한 계정명, 설문 X는 빈 문자열
   image        : 프로필 사진 경로 (사진 미제공으로 빈 문자열)
   order        : 기본 표시 순서 (1~34)

   - 이름으로 연결하지 않고 id / projectIds로 연결합니다.
   - 김지유: 피싱 뚝! / COCO:LANG을 서로 다른 디자이너로 관리.
   - PROJECTS의 title과 설문 teamName은 서로 다를 수 있습니다.
   - 화면 생성/필터/클릭 동작은 designer.js에서 처리합니다.
========================================================= */

window.DESIGNERS = [
    /* 01. 고비주 · GO BIJU */
    {
        id: "go-biju",
        nameKo: "고비주",
        nameEn: "GO BIJU",
        initial: "ㄱ",
        projectIds: ["efact"],
        teamName: "E.FACT",
        teammateIds: ["kim-hyejin"],
        phone: "010-5050-5867",
        email: "gobiju48@gmail.com",
        instagram: "biju._.487",
        image: "",
        order: 1
    },

    /* 02. 권민성 · KWON MINSEONG */
    {
        id: "kwon-minseong",
        nameKo: "권민성",
        nameEn: "KWON MINSEONG",
        initial: "ㄱ",
        projectIds: ["year-on"],
        teamName: "YEAR:ON,이어온",
        teammateIds: ["min-jiho"],
        phone: "010-6207-7054",
        email: "dpqms67@naver.com",
        instagram: "minsnrnjsrnjs",
        image: "",
        order: 2
    },

    /* 03. 김다현 · KIM DAHYUN */
    {
        id: "kim-dahyun",
        nameKo: "김다현",
        nameEn: "KIM DAHYUN",
        initial: "ㄱ",
        projectIds: ["stylens"],
        teamName: "Stylens",
        teammateIds: ["kim-hawon"],
        phone: "010-4234-7428",
        email: "dahyun.kim.gbc@gmail.com",
        instagram: "dxhxxnnnn._.a",
        image: "",
        order: 3
    },

    /* 04. 김도연 · KIM DOYEON */
    {
        id: "kim-doyeon",
        nameKo: "김도연",
        nameEn: "KIM DOYEON",
        initial: "ㄱ",
        projectIds: ["dadeullim"],
        teamName: "다들림",
        teammateIds: ["kim-sungeun", "yun-jiwon"],
        phone: "010-7123-8872",
        email: "ehdus2964@gmail.com",
        instagram: "do_doye",
        image: "",
        order: 4
    },

    /* 05. 김민재 · KIM MINJAE */
    {
        id: "kim-minjae",
        nameKo: "김민재",
        nameEn: "KIM MINJAE",
        initial: "ㄱ",
        projectIds: ["cheoma"],
        teamName: "빛이 내려오는 통로, 처마",
        teammateIds: ["jo-wooseong"],
        phone: "010-9584-6658",
        email: "kimdgb012@naver.com",
        instagram: "threereload",
        image: "",
        order: 5
    },

    /* 06. 김성은 · KIM SUNGEUN */
    {
        id: "kim-sungeun",
        nameKo: "김성은",
        nameEn: "KIM SUNGEUN",
        initial: "ㄱ",
        projectIds: ["dadeullim"],
        teamName: "다들림",
        teammateIds: ["kim-doyeon", "yun-jiwon"],
        phone: "010-9866-4729",
        email: "2023010283cju@gmail.com",
        instagram: "seonminto",
        image: "",
        order: 6
    },

    /* 07. 김주연 · KIM JUYOUN */
    {
        id: "kim-juyoun",
        nameKo: "김주연",
        nameEn: "KIM JUYOUN",
        initial: "ㄱ",
        projectIds: ["jikji"],
        teamName: "직지잼버리",
        teammateIds: [],
        phone: "010-2939-3616",
        email: "jju01277@gmail.com",
        instagram: "yahooooooooooooio",
        image: "",
        order: 7
    },

    /* 08. 김지유 · KIM JIYOO */
    {
        id: "kim-jiyoo-phishing-ddook",
        nameKo: "김지유",
        nameEn: "KIM JIYOO",
        initial: "ㄱ",
        projectIds: ["phishing-ddook"],
        teamName: "피싱 뚝!",
        teammateIds: ["nam-nayoung", "lee-goeun"],
        phone: "010-8029-8793",
        email: "jiyoo4213@naver.com",
        instagram: "wldbdak",
        image: "",
        order: 8
    },

    /* 09. 김지유 · KIM JIYOU */
    {
        id: "kim-jiyou-kokorang",
        nameKo: "김지유",
        nameEn: "KIM JIYOU",
        initial: "ㄱ",
        projectIds: ["kokorang"],
        teamName: "COCO:LANG",
        teammateIds: ["kim-jiyoon"],
        phone: "010-4694-8065",
        email: "Ekcqka2004@gmail.com",
        instagram: "_ream.o",
        image: "",
        order: 9
    },

    /* 10. 김지윤 · KIM JIYOON */
    {
        id: "kim-jiyoon",
        nameKo: "김지윤",
        nameEn: "KIM JIYOON",
        initial: "ㄱ",
        projectIds: ["kokorang"],
        teamName: "COCO:LANG",
        teammateIds: ["kim-jiyou-kokorang"],
        phone: "010-2468-4219",
        email: "jy24684219@gmail.com",
        instagram: "jiyoon_2468",
        image: "",
        order: 10
    },

    /* 11. 김하원 · KIM HAWON */
    {
        id: "kim-hawon",
        nameKo: "김하원",
        nameEn: "KIM HAWON",
        initial: "ㄱ",
        projectIds: ["stylens"],
        teamName: "Stylens",
        teammateIds: ["kim-dahyun"],
        phone: "010-4853-7632",
        email: "hawon041228@gmail.com",
        instagram: "nyamahaki",
        image: "",
        order: 11
    },

    /* 12. 김혜진 · KIM HYEJIN */
    {
        id: "kim-hyejin",
        nameKo: "김혜진",
        nameEn: "KIM HYEJIN",
        initial: "ㄱ",
        projectIds: ["efact"],
        teamName: "E.FACT",
        teammateIds: ["go-biju"],
        phone: "010-9342-0260",
        email: "gpwls4502@gmail.com",
        instagram: "hye.ejjj",
        image: "",
        order: 12
    },

    /* 13. 남나영 · NAM NAYOUNG */
    {
        id: "nam-nayoung",
        nameKo: "남나영",
        nameEn: "NAM NAYOUNG",
        initial: "ㄴ",
        projectIds: ["phishing-ddook"],
        teamName: "피싱 뚝!",
        teammateIds: ["kim-jiyoo-phishing-ddook", "lee-goeun"],
        phone: "010-2207-4109",
        email: "zerodesign16@gmail.com",
        instagram: "h_ove.o",
        image: "",
        order: 13
    },

    /* 14. 노민영 · NOH MINYEONG */
    {
        id: "noh-minyeong",
        nameKo: "노민영",
        nameEn: "NOH MINYEONG",
        initial: "ㄴ",
        projectIds: ["omix"],
        teamName: "OMIX",
        teammateIds: ["song-seungbin", "ham-daeyeon"],
        phone: "010-5824-7667",
        email: "designer.zeibe@gmail.com",
        instagram: "",
        image: "",
        order: 14
    },

    /* 15. 민지호 · MIN JIHO */
    {
        id: "min-jiho",
        nameKo: "민지호",
        nameEn: "MIN JIHO",
        initial: "ㅁ",
        projectIds: ["year-on"],
        teamName: "YEAR:ON , 이어온 (바뀔가능성있음..)",
        teammateIds: ["kwon-minseong"],
        phone: "010-2660-2036",
        email: "alswlgh2004@gmail.com",
        instagram: "mn__zio",
        image: "",
        order: 15
    },

    /* 16. 박윤아 · PARK YUNA */
    {
        id: "park-yuna",
        nameKo: "박윤아",
        nameEn: "PARK YUNA",
        initial: "ㅂ",
        projectIds: ["curo"],
        teamName: "CURO",
        teammateIds: ["yoo-hyejin", "ju-bomin"],
        phone: "010-5016-1925",
        email: "yuha1925@naver.com",
        instagram: "yun_a01_",
        image: "",
        order: 16
    },

    /* 17. 박윤지 · PARK YOONJI */
    {
        id: "park-yoonji",
        nameKo: "박윤지",
        nameEn: "PARK YOONJI",
        initial: "ㅂ",
        projectIds: ["28"],
        teamName: "28(二十八)",
        teammateIds: ["ju-yejin"],
        phone: "010-7221-1076",
        email: "pyj.cloud@gmail.com",
        instagram: "0i0i0_nn",
        image: "",
        order: 17
    },

    /* 18. 서연우 · SEO YEONWOO */
    {
        id: "seo-yeonwoo",
        nameKo: "서연우",
        nameEn: "SEO YEONWOO",
        initial: "ㅅ",
        projectIds: ["ilkko"],
        teamName: "읽:꼬",
        teammateIds: ["lim-jongwon", "jo-eungyo"],
        phone: "010-2716-9901",
        email: "yeonwoo9901@gmail.com",
        instagram: "west.__.kite_woo",
        image: "",
        order: 18
    },

    /* 19. 손예진 · SON YEJIN */
    {
        id: "son-yejin",
        nameKo: "손예진",
        nameEn: "SON YEJIN",
        initial: "ㅅ",
        projectIds: ["magmoa"],
        teamName: "마그모아",
        teammateIds: ["song-yujin"],
        phone: "010-7148-4100",
        email: "songlass1031@gmail.com",
        instagram: "rock9_rock9",
        image: "",
        order: 19
    },

    /* 20. 송승빈 · SONG SEUNGBIN */
    {
        id: "song-seungbin",
        nameKo: "송승빈",
        nameEn: "SONG SEUNGBIN",
        initial: "ㅅ",
        projectIds: ["omix"],
        teamName: "옴믹스",
        teammateIds: ["noh-minyeong", "ham-daeyeon"],
        phone: "010-8679-0250",
        email: "beanbin0306@naver.com",
        instagram: "",
        image: "",
        order: 20
    },

    /* 21. 송유진 · SONG YUJIN */
    {
        id: "song-yujin",
        nameKo: "송유진",
        nameEn: "SONG YUJIN",
        initial: "ㅅ",
        projectIds: ["magmoa"],
        teamName: "마그모아",
        teammateIds: ["son-yejin"],
        phone: "010-5578-6908",
        email: "syj.design1206@gmail.com",
        instagram: "songyzin",
        image: "",
        order: 21
    },

    /* 22. 안나경 · AHN NAGYEONG */
    {
        id: "ahn-nagyeong",
        nameKo: "안나경",
        nameEn: "AHN NAGYEONG",
        initial: "ㅇ",
        projectIds: ["apuchika"],
        teamName: "아푸치카",
        teammateIds: ["youn-taegyun", "lee-nayeong"],
        phone: "010-4174-1228",
        email: "zzzk88x@gmail.com",
        instagram: "nk2i.o",
        image: "",
        order: 22
    },

    /* 23. 유길종 · YOO GILJONG */
    {
        id: "yoo-giljong",
        nameKo: "유길종",
        nameEn: "YOO GILJONG",
        initial: "ㅇ",
        projectIds: ["todadak"],
        teamName: "토다닥",
        teammateIds: [],
        phone: "010-9220-5744",
        email: "gil10504@naver.com",
        instagram: "yugil_jong",
        image: "",
        order: 23
    },

    /* 24. 유혜진 · YOO HYEJIN */
    {
        id: "yoo-hyejin",
        nameKo: "유혜진",
        nameEn: "YOO HYEJIN",
        initial: "ㅇ",
        projectIds: ["curo"],
        teamName: "CURO",
        teammateIds: ["park-yuna", "ju-bomin"],
        phone: "010-5937-4311",
        email: "hyejin010266@gmail.com",
        instagram: "hyejin133",
        image: "",
        order: 24
    },

    /* 25. 윤지원 · YUN JIWON */
    {
        id: "yun-jiwon",
        nameKo: "윤지원",
        nameEn: "YUN JIWON",
        initial: "ㅇ",
        projectIds: ["dadeullim"],
        teamName: "다들림",
        teammateIds: ["kim-doyeon", "kim-sungeun"],
        phone: "010-4565-7098",
        email: "yunjiwon105@naver.com",
        instagram: "happyunw",
        image: "",
        order: 25
    },

    /* 26. 윤태균 · YOUN TAEGYUN */
    {
        id: "youn-taegyun",
        nameKo: "윤태균",
        nameEn: "YOUN TAEGYUN",
        initial: "ㅇ",
        projectIds: ["apuchika"],
        teamName: "아푸치카",
        teammateIds: ["ahn-nagyeong", "lee-nayeong"],
        phone: "010-5730-9497",
        email: "010290cj@naver.com",
        instagram: "y_tegyun",
        image: "",
        order: 26
    },

    /* 27. 이고은 · LEE GOEUN */
    {
        id: "lee-goeun",
        nameKo: "이고은",
        nameEn: "LEE GOEUN",
        initial: "ㅇ",
        projectIds: ["phishing-ddook"],
        teamName: "피싱 뚝!",
        teammateIds: ["kim-jiyoo-phishing-ddook", "nam-nayoung"],
        phone: "010-3141-5438",
        email: "dleksms86@naver.com",
        instagram: "olgoeun__",
        image: "",
        order: 27
    },

    /* 28. 이나영 · LEE NAYEONG */
    {
        id: "lee-nayeong",
        nameKo: "이나영",
        nameEn: "LEE NAYEONG",
        initial: "ㅇ",
        projectIds: ["apuchika"],
        teamName: "아푸치카",
        teammateIds: ["ahn-nagyeong", "youn-taegyun"],
        phone: "010-2206-0140",
        email: "rosaria0140@naver.com",
        instagram: "01_.na0",
        image: "",
        order: 28
    },

    /* 29. 임종원 · LIM JONGWON */
    {
        id: "lim-jongwon",
        nameKo: "임종원",
        nameEn: "LIM JONGWON",
        initial: "ㅇ",
        projectIds: ["ilkko"],
        teamName: "읽:꼬",
        teammateIds: ["seo-yeonwoo", "jo-eungyo"],
        phone: "010-9207-2467",
        email: "tkfkd9207@gmail.com",
        instagram: "l_bell.1",
        image: "",
        order: 29
    },

    /* 30. 조우성 · JO WOOSEONG */
    {
        id: "jo-wooseong",
        nameKo: "조우성",
        nameEn: "JO WOOSEONG",
        initial: "ㅈ",
        projectIds: ["cheoma"],
        teamName: "처마 빛이 내려오는 통로",
        teammateIds: ["kim-minjae"],
        phone: "010-7392-6880",
        email: "qawer1236@gmail.com",
        instagram: "qawer1236",
        image: "",
        order: 30
    },

    /* 31. 조은교 · JO EUNGYO */
    {
        id: "jo-eungyo",
        nameKo: "조은교",
        nameEn: "JO EUNGYO",
        initial: "ㅈ",
        projectIds: ["ilkko"],
        teamName: "읽:꼬",
        teammateIds: ["seo-yeonwoo", "lim-jongwon"],
        phone: "010-4150-8452",
        email: "chooz779@gmail.com",
        instagram: "goodgyo_o",
        image: "",
        order: 31
    },

    /* 32. 주보민 · JU BOMIN */
    {
        id: "ju-bomin",
        nameKo: "주보민",
        nameEn: "JU BOMIN",
        initial: "ㅈ",
        projectIds: ["curo"],
        teamName: "CURO",
        teammateIds: ["park-yuna", "yoo-hyejin"],
        phone: "010-9483-4032",
        email: "bmbm1027@naver.com",
        instagram: "nyam1027",
        image: "",
        order: 32
    },

    /* 33. 주예진 · JU YEJIN */
    {
        id: "ju-yejin",
        nameKo: "주예진",
        nameEn: "JU YEJIN",
        initial: "ㅈ",
        projectIds: ["28"],
        teamName: "28(二十八)",
        teammateIds: ["park-yoonji"],
        phone: "010-7267-0023",
        email: "ha098776@naver.com",
        instagram: "2chyj",
        image: "",
        order: 33
    },

    /* 34. 함대연 · HAM DAEYEON */
    {
        id: "ham-daeyeon",
        nameKo: "함대연",
        nameEn: "HAM DAEYEON",
        initial: "ㅎ",
        projectIds: ["omix"],
        teamName: "OMIX",
        teammateIds: ["noh-minyeong", "song-seungbin"],
        phone: "010-4074-2849",
        email: "tyou1218@naver.com",
        instagram: "im_real_daeyeon",
        image: "",
        order: 34
    }
];
