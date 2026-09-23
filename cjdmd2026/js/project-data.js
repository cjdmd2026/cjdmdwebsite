/* =========================================================
   Project Data — 팀 공통 정보 + 과목별 상세 카드
   =========================================================
   - PROJECTS의 팀 프로젝트 15개는 기존 프로젝트 목록에서 그대로 사용합니다.
   - 학생의 projectIds[0]과 PROJECTS.id를 연결합니다.
   - 같은 팀 학생은 동일한 courseCards 데이터를 공유합니다.

   과목 카드 표시 순서:
   1. interactive → INTERACTIVE DESIGN
   2. service     → SERVICE DESIGN
   3. interface   → INTERFACE DESIGN

   courseCards의 title / description / image를 과목별로 채우세요.
   빈 문자열은 해당 팀의 공통 title / description / image를 사용합니다.
   현재는 과목별 원본이 제공되지 않아 공통 자료를 미리 보여줍니다.
   image 경로 예: ../assets/images/project/apuchika/interactive.png
   위 예시 경로는 형식 안내이며 실제 파일을 넣은 경로로 작성하세요.
========================================================= */

window.PROJECTS = [
    {
        id: "phishing-ddook",
        title: "피싱뚝!",
        members: [
            "남나영",
            "김지유",
            "이고은"
        ],
        category: "교육",
        topic: "보이스피싱 교육",
        description: "보이스피싱 피해를 예방하고 올바른 대응 방법을 학습할 수 있도록 돕는 교육 서비스입니다.",
        image: "../assets/images/project/test/project_1.png",
        slideImage: "../assets/images/project/test/wide/project_1.png",
        slideOrder: 1,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "apuchika",
        title: "아푸치카",
        members: [
            "윤태균",
            "안나경",
            "이나영"
        ],
        category: "교육",
        topic: "아동 양치 교육",
        description: "아동이 즐거운 경험을 통해 올바른 양치 방법과 습관을 익힐 수 있도록 돕는 교육 서비스입니다.",
        image: "../assets/images/project/test/project_2.png",
        slideImage: "../assets/images/project/test/wide/project_2.png",
        slideOrder: 2,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "curo",
        title: "CURO",
        members: [
            "주보민",
            "유혜진",
            "박윤아"
        ],
        category: "건강",
        topic: "당뇨 환자를 위한 바늘 친숙화 서비스",
        description: "당뇨 환자가 주사 바늘에 대한 부담을 줄이고 치료 과정에 보다 친숙하게 적응할 수 있도록 돕는 서비스입니다.",
        image: "../assets/images/project/test/project_3.png",
        slideImage: "../assets/images/project/test/wide/project_3.png",
        slideOrder: 3,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "stylens",
        title: "Stylens",
        members: [
            "김다현",
            "김하원"
        ],
        category: "복지",
        topic: "시각장애인을 위한 스타일링 서비스",
        description: "시각장애인이 의류와 스타일 정보를 보다 편리하게 이해하고 자신만의 스타일을 선택할 수 있도록 돕는 서비스입니다.",
        image: "../assets/images/project/test/project_4.png",
        slideImage: "../assets/images/project/test/wide/project_4.png",
        slideOrder: 4,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "ilkko",
        title: "읽:꼬",
        members: [
            "서연우",
            "조은교",
            "임종원"
        ],
        category: "교육",
        topic: "난독증 재택 훈련 서비스",
        description: "난독증 사용자가 일상 속에서 지속적으로 읽기 훈련을 진행할 수 있도록 돕는 재택 훈련 서비스입니다.",
        image: "../assets/images/project/test/project_5.png",
        slideImage: "../assets/images/project/test/wide/project_5.png",
        slideOrder: 5,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "dadeullim",
        title: "다들림",
        members: [
            "윤지원",
            "김도연",
            "김성은"
        ],
        category: "복지",
        topic: "청각장애인을 위한 운전 보조 서비스",
        description: "청각장애인이 운전 중 필요한 주변 정보를 보다 직관적으로 인지할 수 있도록 돕는 운전 보조 서비스입니다.",
        image: "../assets/images/project/test/project_6.png",
        slideImage: "../assets/images/project/test/wide/project_6.png",
        slideOrder: 6,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "omix",
        title: "OMIX",
        members: [
            "노민영",
            "함대연",
            "송승빈"
        ],
        category: "문화",
        topic: "불교 홍보",
        description: "불교 문화와 가치를 현대적인 방식으로 경험하고 이해할 수 있도록 제안하는 문화 콘텐츠 프로젝트입니다.",
        image: "../assets/images/project/test/project_8.png",
        slideImage: "../assets/images/project/test/wide/project_8.png",
        slideOrder: 8,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "year-on",
        title: "YEAR-ON",
        members: [
            "민지호",
            "권민성"
        ],
        category: "문화",
        topic: "한국 문화 소개",
        description: "한국의 다양한 문화를 새로운 시각으로 경험하고 이해할 수 있도록 소개하는 문화 서비스입니다.",
        image: "../assets/images/project/test/project_9.png",
        slideImage: "../assets/images/project/test/wide/project_9.png",
        slideOrder: 9,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "jikji",
        title: "직지잼버리",
        members: [
            "김주연"
        ],
        category: "문화",
        topic: "문화 소개",
        description: "직지가 지닌 역사적·문화적 가치를 현대적인 방식으로 전달하고 경험할 수 있도록 구성한 프로젝트입니다.",
        image: "../assets/images/project/test/project_10.png",
        slideImage: "../assets/images/project/test/wide/project_10.png",
        slideOrder: 10,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "cheoma",
        title: "그늘잡이",
        members: [
            "김민재",
            "조우성"
        ],
        category: "문화",
        topic: "한국 문화 소개",
        description: "한국 문화가 지닌 고유한 아름다움과 이야기를 새로운 관점에서 전달하는 문화 프로젝트입니다.",
        image: "../assets/images/project/test/project_11.png",
        slideImage: "../assets/images/project/test/wide/project_11.png",
        slideOrder: 11,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "cocorang",
        title: "COCO:LANG",
        members: [
            "김지유",
            "김지윤"
        ],
        category: "생활",
        topic: "반려동물",
        description: "반려동물과 보호자가 더욱 건강하고 즐거운 일상을 만들어갈 수 있도록 돕는 라이프스타일 서비스입니다.",
        image: "../assets/images/project/test/project_12.png",
        slideImage: "../assets/images/project/test/wide/project_12.png",
        slideOrder: 12,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "magmoa",
        title: "마그모아",
        members: [
            "송유진",
            "손예진"
        ],
        category: "여가",
        topic: "여행 서비스",
        description: "여행의 탐색부터 경험까지 보다 즐겁고 편리하게 이어질 수 있도록 제안하는 여행 서비스입니다.",
        image: "../assets/images/project/test/project_13.png",
        slideImage: "../assets/images/project/test/wide/project_13.png",
        slideOrder: 13,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "efact",
        title: "E.FACT",
        members: [
            "고비주",
            "김혜진"
        ],
        category: "환경",
        topic: "환경 보호",
        description: "일상 속 환경 문제를 인식하고 지속 가능한 행동으로 이어질 수 있도록 돕는 환경 보호 프로젝트입니다.",
        image: "../assets/images/project/test/project_14.png",
        slideImage: "../assets/images/project/test/wide/project_14.png",
        slideOrder: 14,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    },
    {
        id: "28",
        title: "별운간",
        members: [
            "박윤지",
            "주예진"
        ],
        category: "여가",
        topic: "별자리 서비스",
        description: "별자리와 관련된 정보와 경험을 새로운 방식으로 탐색하고 즐길 수 있도록 구성한 서비스입니다.",
        image: "../assets/images/project/test/project_15.png",
        slideImage: "../assets/images/project/test/wide/project_15.png",
        slideOrder: 15,
        courseCards: {
            interactive: {
                title: "",
                description: "",
                image: ""
            },
            service: {
                title: "",
                description: "",
                image: ""
            },
            interface: {
                title: "",
                description: "",
                image: ""
            }
        }
    }
];

