/* =========================================================
   Project Data — 팀 공통 정보 + 과목별 상세 카드
   Figma 제출 자료 반영: 2026-11-07 · 14팀 / 3과목
   - image: 세로 대표 이미지 (프로젝트 그리드)
   - slideImage: 가로 대표 이미지 (프로젝트 슬라이드)
   - logo: 디자이너 상세의 전체 화면 로고 (SVG 우선)
   - courseCards: interactive → service → interface
   - imageFit: OMIX는 cover로 영역을 채우며, 나머지는 제출 비율에 맞춰 지정
   - 팀의 기존 id / title / members / slideOrder는 유지합니다.
========================================================= */

window.PROJECTS = [
    {
        id: "phishing-ddook",
        title: "피싱뚝!",
        gridDescription: "어르신을 위한 보이스피싱 예방 교육입니다. 가족이나 기관을 사칭한 AI와 모의 통화를 하며 대처법을 익힙니다.",
        members: [
            "남나영",
            "김지유",
            "이고은"
        ],
        category: "교육",
        topic: "보이스피싱 교육",
        description: "‘피싱 뚝!’은 보이스피싱에 취약한 70대 이상 고령층을 대상으로, 날로 교묘해지는 보이스피싱 범죄에 스스로 대응할 수 있도록 돕는 예방 교육 프로젝트다.\n사례를 바탕으로 음성과 문자를 구분하는 학습, 취약도 테스트, AI 전화 시뮬레이션 체험, 취약유형 파악하기를 통해 위험 상황에서 차분하게 판단하고 올바르게 대처하는 능력을 기를 수 있도록 구성했다.",
        image: "../assets/images/project/submissions/phishing-ddook/portrait.webp?v=37b69973573f",
        slideImage: "../assets/images/project/submissions/phishing-ddook/landscape.webp?v=ab5ae79bdf48",
        slideOrder: 1,
        courseCards: {
            interactive: {
                title: "직접 체험해보는 보이스피싱!",
                description: "실제 보이스피싱 상황을 체험할 수 있는 AI 전화 시뮬레이션을 구현했다. 기관 및 가족 사칭 등 다양한 유형의 AI 피싱범과 직접 통화하며 상황별 대응을 경험하고, 실제 의심스러운 전화를 받았을 때 당황하거나 회피하지 않고, 학습한 내용을 바탕으로 침착하게 판단하고 대처하는 방법을 익힐 수 있는 프로젝트이다.",
                image: "../assets/images/project/submissions/phishing-ddook/interactive.webp?v=41f4f364c216"
            },
            service: {
                title: "피싱 뚝!과 함께하는 예방 습관",
                description: "일상에서도 보이스피싱 예방 학습을 지속적으로 기억할 수 있도록 휴대폰 거치대, 키링, 폰케이스, 그립톡 등 실용적인 굿즈를 제작했다. 각 굿즈에 예방 문구와 신고 번호 1394를 담아 일상 속 반복적인 학습을 유도하고, QR카드를 통해 전시 이후에도 개인 맞춤형 웹페이지에 접속해 예방 학습을 이어갈 수 있도록 구성했다.",
                image: "../assets/images/project/submissions/phishing-ddook/service.webp?v=b79f5efbe4c8"
            },
            interface: {
                title: "진짜와 사기, 어디가 다를까?",
                description: "실제 보이스피싱 사례를 기반으로 음성과 문자를 활용한 진위 판별 학습 콘텐츠와 취약도 자가진단 테스트를 구현했다. 기관 사칭 전화와 택배 사칭 문자를 구분하며 학습하고, 학습 후 해설 영상을 통해 대응법을 확인할 수 있도록 구성했다. 또한, 5개 문항의 자가진단으로 취약 유형을 도출하고, 본인이 어떤 상황과 요소에 취약한지 파악할 수 있도록 했다.",
                image: "../assets/images/project/submissions/phishing-ddook/interface.webp?v=0f3306e89061"
            }
        },
        logo: "../assets/images/project/submissions/phishing-ddook/logo.png?v=5347162bf8a8"
    },
    {
        id: "apuchika",
        title: "아푸치카",
        gridDescription: "아이들이 아푸의 이를 닦아 주며 양치법을 배우는 구강교육입니다. 놀이로 익힌 칫솔질을 AR 안내에 따라 실제 양치로 이어갑니다.",
        members: [
            "윤태균",
            "안나경",
            "이나영"
        ],
        category: "교육",
        topic: "아동 양치 교육",
        description: "아푸치카는 처음 양치를 배우는 유아기 아동이 올바른 양치법을 익히도록 기획한 체험형 구강교육 프로젝트다. 애니메이션으로 양치의 필요성과 방법을 이해하고, 반응형 교구를 직접 움직이며 칫솔질을 연습한다. 교구로 익힌 동작을 AR 가이드와 함께 실제 양치에 적용하며, 이해·연습·실천으로 이어지는 단계적 경험을 통해 스스로 올바른 양치 습관을 형성하도록 돕는다.",
        image: "../assets/images/project/submissions/apuchika/portrait.webp?v=70c1a0ee4590",
        slideImage: "../assets/images/project/submissions/apuchika/landscape.webp?v=72935c82ae8b",
        slideOrder: 2,
        courseCards: {
            interactive: {
                title: "아푸치카와 함께하는 양치!",
                description: "<아푸치카>는 애니메이션과 반응형 교구, AR 양치 가이드를 연계해 올바른 양치법을 단계적으로 익히도록 설계한 인터랙티브 교육 콘텐츠다. 애니메이션으로 양치의 필요성과 방법을 이해하고, 태블릿 안내에 따라 아푸 교구의 치아를 직접 닦으며 칫솔질을 연습한다. AR 가이드의 안내에 따라 실제로 양치하며 배운 내용을 실천하도록 구성하였다.",
                image: "../assets/images/project/submissions/apuchika/interactive.webp?v=12c87ca635c5"
            },
            service: {
                title: "집에서 만나는 아푸치카",
                description: "<아푸치카>는 아푸와 치카를 중심으로 캐릭터와 브랜드 아이덴티티를 구축하고, 교육 교구와 패키지, 다양한 구성품에 일관된 디자인 시스템을 적용하였다. 아동의 흥미를 유도하는 시각 요소를 각 접점에 유기적으로 연결하여 아푸치카만의 통합된 브랜드 경험을 형성하였다.",
                image: "../assets/images/project/submissions/apuchika/service.webp?v=a827889717f2"
            },
            interface: {
                title: "양치별 이야기를 한곳에서 만나요!",
                description: "아푸치카의 세계관을 기반으로 교육 콘텐츠와 브랜드 정보를 통합한 키즈 에듀케이션 웹사이트다. 아동의 색채 선호도를 고려한 컬러 시스템과 직관적인 정보 구조를 적용하고, 다양한 콘텐츠를 유기적으로 연결하여 일관된 브랜드 경험을 제공하도록 설계하였다.",
                image: "../assets/images/project/submissions/apuchika/interface.webp?v=d4fb93e5fa98"
            }
        },
        logo: "../assets/images/project/submissions/apuchika/logo.png?v=0e62b57c4e98"
    },
    {
        id: "curo",
        title: "CURO",
        gridDescription: "1형 당뇨가 있는 아이의 첫 인슐린 자가 주사를 돕습니다. 30일 동안 수호대 친구들과 연습 벨트로 주사 놓는 법을 익힙니다.",
        members: [
            "주보민",
            "유혜진",
            "박윤아"
        ],
        category: "건강",
        topic: "당뇨 환자를 위한 바늘 친숙화 서비스",
        description: "CURO는 자가 주사를 시작하는 1형 당뇨 환아를 돕는 30일 렌탈형 교육 서비스입니다. 수호대 캐릭터와 함께하는 4단계 교육 과정을 통해 아이는 주사에 친숙해지는 것부터 스스로 주사하는 단계까지 차근차근 나아갑니다. CURO는 주사를 처음 마주하는 아이와 어떻게 도와야 할지 고민하는 부모에게, 두려움에서 익숙함으로 나아가는 첫 한 달의 경험을 제공합니다.",
        image: "../assets/images/project/submissions/curo/portrait.webp?v=db4bc2e925bb",
        slideImage: "../assets/images/project/submissions/curo/landscape.webp?v=3f2bd4f81605",
        slideOrder: 3,
        courseCards: {
            interactive: {
                title: "연습을 실전으로 연결하는 IoT 자가주사 교육 시스템",
                description: "CURO는 주사 연습 벨트와 태블릿 앱을 연동해 아이가 인슐린 자가주사를 직접 체험하며 익힐 수 있도록 설계한 교육 시스템입니다. 주사 위치와 유지 시간에 따른 캐릭터의 피드백으로 올바른 주사 방법을 익히고, 다양한 미션과 보상, 일지와 편지 등의 콘텐츠를 통해 반복되는 교육에도 즐겁게 참여할 수 있습니다.",
                image: "../assets/images/project/submissions/curo/interactive.webp?v=01321c239e50"
            },
            service: {
                title: "동화 속 친구들과 함께하는 첫 주사 교육",
                description: "CURO는 자가주사를 처음 시작하는 아이가 주사에 대한 두려움을 덜고 자연스럽게 익숙해질 수 있도록 설계한 교육 서비스입니다. 수호대 캐릭터와 동화책을 통해 주사를 친근하게 접하고, 놀이처럼 시작한 경험을 주사 캡과 인형, 연습 벨트를 활용한 단계별 교육으로 연결해 스스로 주사하는 과정에 차근차근 적응하도록 돕습니다.",
                image: "../assets/images/project/submissions/curo/service.webp?v=d277296ff6b2"
            },
            interface: {
                title: "아이의 건강을 살피고, 배움의 과정을 잇다",
                description: "CURO는 아이의 자가주사 교육과 건강 관리를 지원하는 보호자용 앱과 렌탈 안내 웹사이트로 구성됩니다. 앱에서는 혈당 정보와 주사 연습 결과, 교육 진행 상황을 확인하며 아이의 학습을 지원할 수 있습니다. 웹사이트에서는 교육 과정과 키트의 구성 및 사용법을 알아보고, 동화 애니메이션과 캐릭터 콘텐츠를 경험하며 렌탈을 신청할 수 있습니다.",
                image: "../assets/images/project/submissions/curo/interface.webp?v=6e521df2ac68"
            }
        },
        logo: "../assets/images/project/submissions/curo/logo.svg?v=ad2df2738aed"
    },
    {
        id: "stylens",
        title: "Stylens",
        gridDescription: "저시력자가 스스로 옷을 고르도록 돕는 스마트미러입니다. 거울 앞에 옷을 들면 옷의 특징을 말해 주고 어울리는 코디를 추천합니다.",
        members: [
            "김다현",
            "김하원"
        ],
        category: "복지",
        topic: "시각장애인을 위한 스타일링 서비스",
        description: "저시력자 사용자를 위한 스마트미러 ‘STYLENS’는 시각적 정보 부족으로 의상 선택에 겪는 어려움을 해결합니다. 초음파 거리 감지 센서가 탑재된 발판을 통해 스마트미러 앞에 다가서면 시스템이 자동으로 켜집니다. 시각적 정보가 부족한 이들이 음성 명령만으로 옷을 인식하고, 직접 남긴 ‘질감 메모'와 맞춤형 코디 추천을 다정한 음성으로 안내받으며 독립적인 옷장 관리를 할 수 있는 스마트미러 서비스입니다.",
        image: "../assets/images/project/submissions/stylens/portrait.webp?v=cbd1cb920e4a",
        slideImage: "../assets/images/project/submissions/stylens/landscape.webp?v=e2a404da47e6",
        slideOrder: 4,
        courseCards: {
            interactive: {
                title: "음성으로 소통하는 스마트미러",
                description: "저시력 사용자가 옷의 정보를 확인하고 스스로 스타일을 선택하도록 돕는 스마트미러이다. 거울 앞에 옷을 제시하면 의류 정보를 인식해 음성으로 안내하며, 음성 요청에 따라 코디를 추천한다. 사용자의 행동에 화면과 소리가 함께 반응하도록 설계해 옷을 고르는 과정을 직관적인 상호작용으로 연결했다.",
                image: "../assets/images/project/submissions/stylens/interactive.webp?v=d91f2bfdf9e9"
            },
            service: {
                title: "감각으로 연결하는 스타일링 경험",
                description: "저시력 사용자의 자율적인 옷 선택을 돕는 서비스 경험을 설계했다. 촉각 옷걸이 링으로 상의와 하의를 먼저 구분한 뒤, 스마트미러의 음성 안내로 의류 정보를 확인하도록 구성했다. 파우치·키링·포토 카드 등 브랜드 구성물에는 일관된 시각 언어를 적용해 서비스의 취지와 가치를 전달한다.",
                image: "../assets/images/project/submissions/stylens/service.webp?v=70cce13dae14"
            },
            interface: {
                title: "나다운 스타일을 전하는 브랜드 웹사이트",
                description: "저시력 사용자의 가족과 지인에게 Stylens의 가치와 이용 방법을 소개하는 웹사이트이다. 연동된 디지털 옷장에서 등록된 의류 정보를 확인할 수 있도록 구성해 서비스에 대한 이해와 일상 속 활용을 돕는다.",
                image: "../assets/images/project/submissions/stylens/interface.webp?v=ae0ad7865ed0"
            }
        },
        logo: "../assets/images/project/submissions/stylens/logo.png?v=8f60a4068630"
    },
    {
        id: "ilkko",
        title: "읽:꼬",
        gridDescription: "난독증 아동이 집에서 즐기는 한글 읽기 놀이입니다. 태블릿으로 동화를 듣고 한글 타일을 손으로 맞추며 낱말을 익힙니다.",
        members: [
            "서연우",
            "조은교",
            "임종원"
        ],
        category: "교육",
        topic: "난독증 재택 훈련 서비스",
        description: "‘읽:꼬’는 한글 읽기에 어려움을 겪는 난독증 아동을 위한 재택 훈련 서비스입니다. 기존의 반복적이고 단조로운 훈련에서 벗어나, 다양한 인터랙션과 시각·청각·촉각을 활용한 다감각 훈련을 제공합니다. iPad와 실물 교구를 연계하여 아이들이 집에서도 놀이처럼 즐겁고 능동적으로 읽기 능력을 향상할 수 있도록 돕습니다.",
        image: "../assets/images/project/submissions/ilkko/portrait.webp?v=cee3156b8b4f",
        slideImage: "../assets/images/project/submissions/ilkko/landscape.webp?v=ef8833eaac72",
        slideOrder: 5,
        courseCards: {
            interactive: {
                title: "집에서 즐기며 학습하는 다감각 재택 훈련 서비스",
                description: "‘읽:꼬’는 난독증 아동이 집에서도 즐겁게 한글 읽기를 훈련할 수 있도록 설계한 iPad 기반 인터랙티브 콘텐츠입니다. 동화 속 캐릭터와 함께 이야기를 따라가며 보고, 듣고, 말하고, 터치하는 다감각 활동을 경험합니다. 실물 한글 타일과 연계한 활동도 더해 아이가 놀이하듯 자연스럽게 읽기 훈련에 몰입하도록 돕습니다.",
                image: "../assets/images/project/submissions/ilkko/interactive.webp?v=3021a923357a"
            },
            service: {
                title: "읽기 모험의 끝, 성장을 선물하다",
                description: "모든 읽기 훈련을 마친 아이에게 그동안의 노력과 성장을 축하하는 특별한 선물 패키지를 제공합니다. 동화 속에서 함께 모험한 캐릭터 굿즈를 담아, 훈련에서 느낀 즐거움이 일상에서도 이어지도록 했습니다. 아이는 선물을 열어보며 스스로 목표를 이루었다는 뿌듯함을 느끼고, 읽기 훈련을 통해 쌓아온 자신감과 성취의 기쁨을 오래도록 간직할 수 있습니다.",
                image: "../assets/images/project/submissions/ilkko/service.webp?v=7b4c5451cab5"
            },
            interface: {
                title: "아이와 보호자를 잇는 훈련 첫걸음",
                description: "‘읽:꼬’의 인터페이스는 밝은 색감과 친근한 캐릭터를 활용해 서비스 정보를 쉽고 편안하게 전달합니다. 웹사이트와 모바일 화면에서 서비스 소개와 난독증 관련 정보, 훈련 안내를 직관적으로 살펴볼 수 있도록 구성했습니다. 아이와 보호자가 필요한 정보를 부담 없이 찾고 서비스를 이해하도록 돕습니다.",
                image: "../assets/images/project/submissions/ilkko/interface.webp?v=53ae8a17168e"
            }
        },
        logo: "../assets/images/project/submissions/ilkko/logo.svg?v=9707cb55a69d"
    },
    {
        id: "dadeullim",
        title: "다들림",
        gridDescription: "청각장애 운전자에게 도로 위 위험을 알려주는 차량 인터페이스입니다. 화면의 빛과 운전대의 진동으로 위험의 방향과 거리를 전합니다.",
        members: [
            "윤지원",
            "김도연",
            "김성은"
        ],
        category: "복지",
        topic: "청각장애인을 위한 운전 보조 서비스",
        description: "다들림은 청각장애인의 안전하고 편안한 주행경험을 위한 차량 인터페이스 서비스이다. 본 프로젝트는 운전 중 청각으로 인지하기 어려운 정보를 시각, 촉각 정보로 전환하여 디스플레이와 HUD, 햅틱을 통해 직관적으로 전달하도록 설계하였다.",
        image: "../assets/images/project/submissions/dadeullim/portrait.webp?v=ed47fe59eef4",
        slideImage: "../assets/images/project/submissions/dadeullim/landscape.webp?v=51ccbdb0fbfe",
        slideOrder: 6,
        courseCards: {
            interactive: {
                title: "소리 대신 진동과 빛으로 도로 위 위험을 전하는 1인칭 주행 체험",
                description: "다들림 주행 체험은 청각장애인 운전자의 시선으로 소리 없는 도심을 111초간 달리는 1인칭 체험이다 신호 위반 차량, 오토바이, 정지 차량, 구급차가 나타나면 HUD·차량 디스플레이·햅틱 핸들이 위험의 종류와 거리, 방향을 빛과 진동으로 전달해 눈과 손으로 도로를 읽게 한다.",
                image: "../assets/images/project/submissions/dadeullim/interactive.webp?v=a223a114431e"
            },
            service: {
                title: "청각장애인을 위한 실시간 주행 정보 차량 서비스",
                description: "다들림은 청각장애인 운전자가 도로 위의 소리를 시각과 촉각으로 인지할 수 있도록 설계한 내비게이션 서비스이다. 긴급차량, 경적, 후방 접근 등 주행 중 발생하는 소리와 위험의 방향을 디스플레이, HUD, 스티어링 휠 진동으로 전달한다. 도로를 이해하는 방법은 하나일 필요가 없다.",
                image: "../assets/images/project/submissions/dadeullim/service.webp?v=2fdac4923f25"
            },
            interface: {
                title: "소리를 넘어, 모두가 함께하는 주행 경험 웹사이트",
                description: "청각장애인의 안전한 이동을 위해 소리를 시각과 진동으로 전환하는 모빌리티 브랜드 다들림의 웹사이트이다. 브랜드 아이덴티티와 서비스 경험을 중심으로 정보를 구성하고, 직관적인 인터랙션과 감각적인 비주얼을 적용하였다.",
                image: "../assets/images/project/submissions/dadeullim/interface.webp?v=7c7d9cdfa530"
            }
        },
        logo: "../assets/images/project/submissions/dadeullim/logo.svg?v=01dc3d6e7fd2"
    },
    {
        id: "omix",
        title: "OMIX",
        gridDescription: "불교의 소리와 클럽 비트를 섞어 나만의 곡을 만드는 DJ 체험입니다. 108초의 연주가 끝나면 내 무대를 영상으로 간직할 수 있습니다.",
        members: [
            "노민영",
            "함대연",
            "송승빈"
        ],
        category: "문화",
        topic: "불교 홍보",
        description: "OMIX는 불교를 낯설게 느끼는 국내외 Z세대를 위해 전통 불교문화를 현대적인 음악 경험으로 재해석합니다. 관람객은 108초 동안 불교 사운드를 직접 믹싱해 자신만의 음악을 완성하고, 이를 기록·공유하며 웹 아카이브에서 다시 감상할 수 있습니다. \n이를 통해 일회성 체험을 넘어 불교문화에 대한 관심과 경험이 일상에서도 지속되고 확산되도록 합니다.",
        image: "../assets/images/project/submissions/omix/portrait.webp?v=e3365694013c",
        slideImage: "../assets/images/project/submissions/omix/landscape.webp?v=769bef3a0845",
        slideOrder: 8,
        courseCards: {
            interactive: {
                title: "OMIX | New K-Buddhism DJ",
                description: "불교와 클럽 문화를 유연하게 결합한 DJ 체험. 4×4 패드로 한 곡의 네 가지 장르 스템과 불교 사운드를 켜고 끄며 나만의 믹스를 만들고, 피버 모드에서는 패드와 노브가 무대 조명·카메라로 바뀌며 108초가 끝나면 플레이 영상과 DJ 카드를 QR로 받아갈 수 있습니다.",
                image: "../assets/images/project/submissions/omix/interactive.webp?v=6b036d4c99cb",
                imageFit: "cover"
            },
            service: {
                title: "OMIX | 체험을 넘어 이어지는 오프라인 서비스디자인",
                description: "불교와 음악을 결합한 전시 경험을 굿즈와 오프라인 공간으로 확장한 서비스 디자인 프로젝트입니다. 관람객은 OMIX의 상징과 그래픽을 담은 의류, 키링, 스티커 등 다양한 굿즈를 직접 만나고 선택하며 브랜드를 경험합니다. 전시에서 느낀 감각을 실물로 소장하고 일상에서 사용함으로써, 일회성 체험이 지속적인 문화 경험으로 이어지도록 합니다.",
                image: "../assets/images/project/submissions/omix/service.webp?v=6b080863246a",
                imageFit: "cover"
            },
            interface: {
                title: "OMIX | 108초를 넘어 이어지는 사운드 아카이브",
                description: "OMIX는 한국 불교의 소리와 상징, 의례의 분위기를 현대 음악으로 재해석하는 플랫폼입니다. 차트와 장르 탐색으로 듣고(Listen), 인터랙티브 체험으로 나만의 사운드를 만들고(Mix), 그 결과를 아카이브에 저장해 언제든 다시 꺼내 듣습니다(Return). 불교를 설명하지 않고 먼저 듣고 경험하게 합니다.",
                image: "../assets/images/project/submissions/omix/interface.webp?v=f5bc55d7e198",
                imageFit: "cover"
            }
        },
        logo: "../assets/images/project/submissions/omix/logo.svg?v=c38afbace78c"
    },
    {
        id: "year-on",
        title: "YEAR-ON",
        gridDescription: "김홍도의 풍속화를 손짓으로 탐색하는 미디어아트입니다. 손끝으로 그림 속 인물을 이으면 이들이 나누는 이야기가 들려옵니다.",
        members: [
            "민지호",
            "권민성"
        ],
        category: "문화",
        topic: "한국 문화 소개",
        description: "이어온은 김홍도의 풍속화 속 문화를 현대적으로 재해석한 프로젝트입니다. 관람객은 핀치 제스처로 인물을 연결하며 ‘우리성’을 발견하고, 그 가치가 오늘날 K-컬처로 이어지는 모습을 살펴봅니다. 이를 통해 과거의 풍속과 현대문화를 하나의 흐름으로 연결하며, 시대를 넘어 지속되는 우리 문화의 정체성을 새롭게 경험하도록 기획했습니다.",
        image: "../assets/images/project/submissions/year-on/portrait.webp?v=5f677e4211ab",
        slideImage: "../assets/images/project/submissions/year-on/landscape.webp?v=faee87c2a7e0",
        slideOrder: 9,
        courseCards: {
            interactive: {
                title: "서로가 이어져 우리가 되는 경험",
                description: "이어온은 김홍도의 풍속화 속 인물과 문화를 현대적으로 재해석한 손 제스처 기반 인터랙티브 미디어아트 작품이다. 관람자는 핀치 제스처로 그림 속 인물들을 서로 연결하고이들이 나누는 이야기를 들으며 관계와 공동체 속에 담긴 ‘우리성’을 발견한다. 이어 인물들의 이야기는 김홍도의 그림에 담긴 다양한 풍속과 문화로 연결되며, 관람자는 이 과정을 통해 과거의 그림 속에 살아 있는 우리 문화를 경험한다.",
                image: "../assets/images/project/submissions/year-on/interactive.webp?v=094d675286a8"
            },
            service: {
                title: "당신 일상 속 우리",
                description: "이어온 굿즈는 작품 속에서 발견한 ‘우리성’을 전시장 밖의 일상으로 이어 주는 매개이다. 김홍도의 풍속화에 담긴 관계·화합·흥의 가치를 엽서, 책갈피, 키링 등에 담아 관람객이 간직하거나 소중한 사람에게 전할 수 있도록 구성했다. 굿즈를 사용하고 나누는 과정에서 사람과 사람의 마음이 연결되며, 과거의 그림에서 발견한 우리성을 오늘날의 관계 속에서도 느낄 수 있다.",
                image: "../assets/images/project/submissions/year-on/service.webp?v=2bdafbf75239"
            },
            interface: {
                title: "시대별 매체로 살펴보는 우리성",
                description: "김홍도의 풍속화에 담긴 ‘우리성’이 시대와 매체의 변화 속에서 어떻게 이어져 왔는지 탐색하는 웹사이트이다. 조선 후기부터 현대까지의 매체를 시대별 인터페이스로 구현하고, 각 매체의 조작 방식을 인터랙션으로 재현했다. 관람객은 시대별 콘텐츠와 K-아카이브를 탐색하며 과거의 일상에서 오늘날의 K-컬처까지 이어지는 ‘우리성’의 의미와 가치를 발견한다.",
                image: "../assets/images/project/submissions/year-on/interface.webp?v=65c05b52c7ce"
            }
        },
        logo: "../assets/images/project/submissions/year-on/logo.png?v=a3078539bcdc"
    },
    {
        id: "jikji",
        title: "직지잼버리",
        gridDescription: "아이들이 직지의 금속활자 제작 과정을 경험하는 AR 체험입니다. 캐릭터의 이야기를 따라 활자를 만들며 직지의 역사를 배웁니다.",
        members: [
            "김주연"
        ],
        category: "문화",
        topic: "문화 소개",
        description: "직지 잼버리는 어렵고 낯설게 느껴지는 우리나라의 세계기록유산 직지심체요절을 아이들이 쉽고 흥미롭게 이해할 수 있도록 전통 금속활자 제작 과정을  AR 인터랙티브 콘텐츠로 재해석한 프로젝트입니다.\n관람객은 캐릭터의 이야기를 따라 직지의 역사와 가치를 알아갈 수 있도록 하고자 하였습니다.\n이를 통해 단순히 역사를 보고 배우는 것을 넘어, 직접 참여하고 완성하는 경험으로 직지를 더욱 친숙하고 오래 기억할 수 있도록 합니다.",
        image: "../assets/images/project/submissions/jikji/portrait.webp?v=2fe9c74e7776",
        slideImage: "../assets/images/project/submissions/jikji/landscape.webp?v=05496fe647a0",
        slideOrder: 10,
        courseCards: {
            interactive: {
                title: "직지잼버리  |  직지 AR 체험",
                description: "AR 기술을 활용해 직지의 금속활자 제작 과정을 직접 경험하며, 관람객이 능동적으로 참여하고 즐길 수 있는 몰입형 역사 체험 콘텐츠입니다.",
                image: "../assets/images/project/submissions/jikji/interactive.webp?v=9600ad3a5abb"
            },
            service: {
                title: "직지 잼버리  |  새로운 캐릭터와 스토리를 대입한 서비스디자인",
                description: "캐릭터를 중심으로 직지의 역사적 이야기를 재구성하여, 어렵게 느껴지는 전통문화를 쉽고 재미있게 전달하는 서비스 디자인입니다.",
                image: "../assets/images/project/submissions/jikji/service.webp?v=27200805a111"
            },
            interface: {
                title: "직지 잼버리  |  새로운 세계관을 대입한 프로세스",
                description: "세계관과 캐릭터를 웹 인터페이스에 적용하여, 프로젝트의 스토리와 AR 체험 과정을 직관적으로 전달합니다. 스크롤 인터랙션과 시각적 요소를 활용해 사용자가 웹을 탐색하는 과정에서도 직지의 역사와 프로젝트의 세계관을 자연스럽게 경험할 수 있도록 설계했습니다.",
                image: "../assets/images/project/submissions/jikji/interface.webp?v=41c02afaaa86"
            }
        },
        logo: "../assets/images/project/submissions/jikji/logo.svg?v=514c02a802de"
    },
    {
        id: "cheoma",
        title: "처마",
        gridDescription: "한옥의 처마를 가까이 들여다보는 AR 전시입니다. 처마의 모양과 시간에 따라 그 아래로 드는 빛과 그늘이 어떻게 달라지는지 살펴봅니다.",
        members: [
            "김민재",
            "조우성"
        ],
        category: "문화",
        topic: "한국 문화 소개",
        description: "본 프로젝트는 처마를 동일한 조건에서 비교하고 시간에 따라 달라지는 빛과 그림자를 관찰할 수 있게 합니다. 이를 통해 고궁과 한옥을 방문하는 외국인 관람객이 처마의 외형 뿐 아니라 처마가 주변공간과 함께 한옥의 생활환경을 형성한 방식까지 이해하도록 돕습니다.",
        image: "../assets/images/project/submissions/cheoma/portrait.webp?v=fa68cf3c9ad6",
        slideImage: "../assets/images/project/submissions/cheoma/landscape.webp?v=c87097f5a3a4",
        slideOrder: 11,
        courseCards: {
            interactive: {
                title: "AR로 보는 다양한 처마",
                description: "마커를 비추면 AR 화면에 민가, 사찰, 성문의 처마가 나타나, 직접 만져보듯 살펴보며 각각의 특징을 확인할 수 있습니다. 3D 모델뿐 아니라 처마에 얽힌 다양한 이야기까지 담아낸 몰입형 전시입니다.",
                image: "../assets/images/project/submissions/cheoma/interactive.webp?v=09cfe42113c4"
            },
            service: {
                title: "처마 아래, 사람이 머물던 자리",
                description: "리플렛에는 유형별 처마의 특징과 이야기가 담겨 있습니다. 처마를 어떻게 보면 좋은지, 그리고 청주에서 직접 만날 수 있는 특별한 공간은 어디인지 함께 소개합니다.",
                image: "../assets/images/project/submissions/cheoma/service.webp?v=cb88a46fe8b2"
            },
            interface: {
                title: "처마 아래의 빛을 따라가다",
                description: "웹사이트에서 처마를 직접 만져보고, 시간대를 바꿔 가며 빛이 들어오는 모습을 살펴볼 수 있는 공간을 만들었습니다. 시뮬레이션과 데이터 아카이브를 통해 처마에 대한 더욱 자세한 정보를 확인할 수 있습니다.",
                image: "../assets/images/project/submissions/cheoma/interface.webp?v=0b4157b624ce"
            }
        },
        logo: "../assets/images/project/submissions/cheoma/logo.png?v=70e5d5ad3652"
    },
    {
        id: "cocorang",
        title: "COCO LANG",
        gridDescription: "반려견 보호자를 위한 동네 산책 매칭 서비스입니다. 지도에서 우리 강아지와 성향이 맞는 친구를 찾고 함께한 산책을 기록합니다.",
        members: [
            "김지유",
            "김지윤"
        ],
        category: "생활",
        topic: "반려동물",
        description: "COCO LANG은 반려견과 함께 산책하는 보호자를 위한 지역 기반 산책 매칭 서비스입니다. 산책 중 낯선 보호자에게 먼저 다가가기 어렵고, 반려견의 성향과 교류 의사를 알기 힘든 문제를 해결하고자 합니다.\n성향 기반 매칭과 지도 탐색, 산책 기록을 통해 일상적인 산책을 새로운 만남과 소통의 경험으로 확장합니다.",
        image: "../assets/images/project/submissions/cocorang/portrait.webp?v=c3426dc562ee",
        slideImage: "../assets/images/project/submissions/cocorang/landscape.webp?v=90688472dfd3",
        slideOrder: 12,
        courseCards: {
            interactive: {
                title: "친구를 만나 함께 걷는 코코랑 마을 탐험",
                description: "코코랑 마을 탐험은 가상 마을에서 다양한 성향의 반려견 친구를 만나고 산책의 즐거움을 경험하는 3D 인터랙티브 콘텐츠입니다. 참여자는 주민증을 인식해 마을에 입장하고, 캐릭터와 상호작용하며 서로의 성향과 반응을 알아갑니다. 이후 산책 코스를 탐색하며 새로운 친구와 함께 걷는 즐거움을 체험합니다.",
                image: "../assets/images/project/submissions/cocorang/interactive.webp?v=ed868454aaf0"
            },
            service: {
                title: "산책에서 시작되는 새로운 연결",
                description: "COCO LANG은 반려견의 성향을 바탕으로 동네 강아지들과 자연스러운 만남을 돕는 지역 기반 산책 커뮤니티 서비스입니다. 지도에서 주변 반려견의 성향과 교류 의사를 확인하고, 서로에게 맞는 산책 메이트를 찾을 수 있습니다. 산책 후에는 커뮤니티에서 경험과 추억을 공유하며 일상 속 만남이 지속적인 이웃 관계로 이어지도록 돕습니다.",
                image: "../assets/images/project/submissions/cocorang/service.webp?v=27a63a147237"
            },
            interface: {
                title: "우리 동네 산책 이야기를 담은 웹사이트",
                description: "COCOLANG의 브랜드 경험을 온라인으로 확장한 웹사이트입니다. 브랜드 스토리와 산책 커뮤니티 서비스의 주요 기능을 시각적으로 소개하고, 반려견 성향 테스트를 통해 자신의 강아지를 알아가는 경험을 제공합니다. 또한 캐릭터와 굿즈, 전시 콘텐츠를 유기적으로 연결하여 브랜드의 따뜻하고 친근한 분위기를 전달합니다.",
                image: "../assets/images/project/submissions/cocorang/interface.webp?v=13462d2d8742"
            }
        },
        logo: "../assets/images/project/submissions/cocorang/logo.svg?v=3a1b3ea69e11"
    },
    {
        id: "magmoa",
        title: "마그모아",
        gridDescription: "여행지에서 미니게임을 하며 그 지역의 디지털 마그넷을 모읍니다. 마그넷에 사진과 메모를 더하면 나만의 여행 지도가 완성됩니다.",
        members: [
            "송유진",
            "손예진"
        ],
        category: "여가",
        topic: "여행 서비스",
        description: "마그모아는 여행의 추억을 특별하게 간직하고 싶은 2030 여행자를 위한 서비스다. 기념품을 구하기 어렵거나 사진만으로는 아쉬웠던 여행 기록을 디지털 마그넷 수집으로 확장한다. 여행지에서 위치 인증과 미니게임으로 마그넷을 획득하고, 나만의 여행 지도를 채우며 추억을 기록하고 공유한다.",
        image: "../assets/images/project/submissions/magmoa/portrait.webp?v=7a894e081fc5",
        slideImage: "../assets/images/project/submissions/magmoa/landscape.webp?v=0c79e133e299",
        slideOrder: 13,
        courseCards: {
            interactive: {
                title: "여행의 순간을 수집하는 위치 기반 디지털 마그넷 서비스",
                description: "마그모아는 여행지에서 위치 인증으로 마그넷을 발견하고, 지역의 개성을 담은 미니게임을 통해 수집하는 서비스다. 직접 조작하는 수집 경험으로 여행의 재미를 더하며, 획득한 마그넷은 나만의 지도와 컬렉션에 사진·메모와 함께 기록된다. 다른 사용자와 추억을 공유하고 실물 굿즈로도 간직하며 여행의 경험을 일상으로 이어간다.",
                image: "../assets/images/project/submissions/magmoa/interactive.webp?v=42af3a2f7950"
            },
            service: {
                title: "여행의 순간을 모으다",
                description: "마그모아는 여행지에서의 발견을 수집의 즐거움으로 연결한다. 지역의 이야기를 담은 마그넷과 생동감 있는 여행 굿즈를 통해 여행의 설렘을 일상으로 이어간다. 각 장소의 개성을 담은 디자인에 여행의 순간과 감정을 더해 나만의 추억을 모으고, 익숙한 장소를 새롭게 바라보며 또 다른 여행을 떠나고 싶어지는 경험을 만들어가고자 한다.",
                image: "../assets/images/project/submissions/magmoa/service.webp?v=e0cac0528d6f"
            },
            interface: {
                title: "여행과 수집을 잇는 웹사이트",
                description: "여행의 순간을 마그넷으로 수집하고 기록하는 마그모아의 브랜드 웹사이트이다. 브랜드와 앱의 주요 기능을 소개하고, 여행과 수집이 결합된 경험을 직관적으로 전달한다. 지역별 마그넷을 둘러보고 구매할 수 있는 온라인 스토어를 통해 디지털 여행 기록을 실물 굿즈로 간직하며 여행의 경험을 이어가도록 하였다.",
                image: "../assets/images/project/submissions/magmoa/interface.webp?v=32657b846be1"
            }
        },
        logo: "../assets/images/project/submissions/magmoa/logo.svg?v=ee1b4f3539b7"
    },
    {
        id: "efact",
        title: "E.FACT",
        gridDescription: "청주의 소각시설 밀집 문제를 다룬 탐험 게임입니다. 오염된 미래의 청주를 걸으며 사라진 기억과 환경 변화의 흔적을 모읍니다.",
        members: [
            "고비주",
            "김혜진"
        ],
        category: "환경",
        topic: "환경 보호",
        description: "E.FACT는 청주 소각시설 과밀집 문제에 관심을 갖고 변화를 바라는 시민을 위한 참여형 환경 프로젝트입니다. 소각시설의 집중 현황과 환경 영향을 쉽게 이해하고 체감하기 어려운 문제를 해결하고자, 웹사이트를 통한 정보 탐색, 게임을 통한 간접 체험, 연대의 나무를 통한 시민 참여를 연결하여 문제 인식에서 공감과 연대로 이어지는 경험을 제공합니다.",
        image: "../assets/images/project/submissions/efact/portrait.webp?v=be115698a4e5",
        slideImage: "../assets/images/project/submissions/efact/landscape.webp?v=8d40153a75af",
        slideOrder: 14,
        courseCards: {
            interactive: {
                title: "탐험과 선택으로 마주하는 미래 청주의 이야기",
                description: "E.FACT는 청주 소각장 과밀집 문제를 배경으로 환경오염의 심각성을 체험하는 2.5D 탐험 게임이다. 플레이어는 오염된 미래 청주를 탐험하며 사라진 기억과 환경 변화의 흔적을 수집한다. 탐색과 선택을 통해 환경 문제의 영향을 직접 경험하고, 환경 회복을 위한 개인의 선택과 시민 참여의 중요성을 전달하고자 한다.",
                image: "../assets/images/project/submissions/efact/interactive.webp?v=875ee95917cf"
            },
            service: {
                title: "탐험의 기억을 소장하는 프로젝트 굿즈 컬렉션",
                description: "E.FACT 굿즈는 게임 속 경험과 환경 문제에 대한 메시지를 일상으로 확장하기 위해 기획되었다. 게임의 캐릭터와 세계관을 활용한 엽서, 스티커, 메모지 등 다양한 굿즈를 통해 프로젝트의 이야기를 시각적으로 전달한다. 관람객이 전시에서 느낀 감정과 기억을 간직하고, 환경 문제에 대한 관심을 일상에서도 이어갈 수 있도록 하였다.",
                image: "../assets/images/project/submissions/efact/service.webp?v=f1441688c788"
            },
            interface: {
                title: "E.FACT: 기억에서 연대로 이어지는 인터랙티브 웹사이트",
                description: "E.FACT 웹사이트는 청주 지역에 집중된 소각시설 문제를 알리고, 환경 부담의 공정한 분배와 주민의 환경권을 함께 고민하는 참여형 플랫폼입니다. 방문자는 문제의 배경과 시민의 목소리를 살펴보고, 연대서에 이름과 메시지를 남기며 더 나은 변화를 위한 시민 연대에 참여할 수 있습니다.",
                image: "../assets/images/project/submissions/efact/interface.webp?v=6daf58d01154"
            }
        },
        logo: "../assets/images/project/submissions/efact/logo.png?v=ef91273a96de"
    },
    {
        id: "28",
        title: "별운관",
        gridDescription: "동아시아 전통 별자리인 28수를 만나는 디지털 운세소입니다. 생년월일을 입력하고 카드를 고르면 점술가가 내 별의 운세를 들려줍니다.",
        members: [
            "박윤지",
            "주예진"
        ],
        category: "여가",
        topic: "별자리 서비스",
        description: "별운관(星運館)은 동아시아의 전통 천문 체계인 3원 28수를 현대적인 별자리 운세로 재해석한 프로젝트입니다. 별자리와 운세에 관심 있는 사람들이 생년월일로 자신의 28수 별자리를 찾고, 그 별자리에 얽힌 이야기와 상징을 알아가며 낯설었던 전통 별자리 문화를 친숙하게 접할 수 있도록 기획했습니다.",
        image: "../assets/images/project/submissions/28/portrait.webp?v=12a089508d6e",
        slideImage: "../assets/images/project/submissions/28/landscape.webp?v=9a2e1939de06",
        slideOrder: 15,
        courseCards: {
            interactive: {
                title: "당신의 별의 이야기를 듣다",
                description: "별운관은 동양의 전통 천문 체계인 3원 28수를 현대적으로 재해석한 별자리 운세 인터랙션이다. 관람자는 신비로운 운세소에 들어서 생년월일을 입력하고 자신의 28수 별자리를 찾는다. 이어 운세 카드를 고르면 화면 속 점술가가 운세를 풀이하며, 관람자는 이 과정을 통해 동양의 별자리 문화를 경험한다.",
                image: "../assets/images/project/submissions/28/interactive.webp?v=0ef9dc7426c5"
            },
            service: {
                title: "우리의 별자리를 일상에 담다",
                description: "별운관의 굿즈는 동양의 전통 별자리인 28수를 운세 카드와 NFC 키링, 방명록으로 풀어낸다. 운세 카드에는 별의 배열과 각 별자리를 상징하는 동물을 담았다. 별자리 문양을 넣은 키링에 노리개 술을 달고, 옛 책을 닮은 방명록에는 관람객이 전시의 기억을 남길 수 있도록 했다.",
                image: "../assets/images/project/submissions/28/service.webp?v=c83b79ab1ed1"
            },
            interface: {
                title: "별의 이야기가 머무는 곳, 별운관",
                description: "별운관은 동양의 전통 별자리인 28수를 일상에서 만나는 별자리 운세 서비스다. 앱에서는 자신의 별자리에 따른 매일의 운세와 궁합을 확인하고 운세를 기록한다. 웹에서는 옛 책을 넘기듯 화면을 가로로 넘기며 28수의 개념과 각 별자리의 특징을 살펴본다.",
                image: "../assets/images/project/submissions/28/interface.webp?v=2410117065b4"
            }
        },
        logo: "../assets/images/project/submissions/28/logo.svg?v=f6d495c0951a"
    }
];
