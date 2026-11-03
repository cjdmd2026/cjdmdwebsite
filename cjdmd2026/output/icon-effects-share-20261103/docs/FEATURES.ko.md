# 기능 정리

## 1. 메인 — 부유 → 스크롤 결합

처음에는 포스터를 구성하는 아이콘들이 화면 안팎에 흩어져 천천히 움직입니다. 큰 아이콘은 선명하게, 작은 아이콘은 여러 블러 레이어로 깊이감을 줍니다. 마우스 이동·클릭으로 주변 아이콘을 밀어낼 수 있습니다.

아래 방향 휠 / 터치 스와이프 / 방향키 입력을 받으면 큰 아이콘부터 시차를 두고 원래 포스터 좌표로 모여 ‘결합’을 만듭니다. 각 아이콘의 부유 진폭, 회전, 크기, 블러가 이동과 함께 정리되고, 글자 획의 바깥쪽 작은 아이콘은 완성 후에도 움직입니다. 위 방향 입력은 다시 분산시킵니다.

원본 히어로 엔진을 보존해 다음 입력의 포스터 정착 단계도 포함했습니다.

| 단계 | 동작 |
| --- | --- |
| 0 | 흩어진 아이콘의 부유 및 마우스 반응 |
| 1 | 포스터 좌표로 모여 ‘결합’ 완성 |
| 2 | 왼쪽 포스터 위치로 축소 이동, 설명 노출, 화이트/블랙 전환 |

### 구현

- `main-poster-sprites.js`: 테마별 원본 크기, 목적 좌표, 아틀라스 잘라내기 영역.
- `main-hero.js`: 상태 전환, tween, 위치·회전·투명도 보간, 마우스 힘, Canvas 렌더링.
- `main-hero-sprite-batch.js`: WebGL로 많은 아이콘을 한 번에 그리며, 실패 시 2D 렌더링으로 대체.
- `main-scroll-input.js`: 한 번의 휠 제스처에서 발생하는 다수 이벤트·관성 입력을 정리.
- idle 30fps / 상호작용 60fps 제한, 화면 밖 아이콘 생략, 정착 획 캐시. 동작 줄이기 설정에 대응.

### 적용 순서

1. `main/index.html`의 hero section 전체를 복사합니다.
2. `css/main-effect.css`를 연결합니다. 다른 페이지에서는 reset과 demo-nav 규칙을 해당 사이트 스타일에 맞춰 조정합니다.
3. 아래 순서대로 일반 script에 defer를 지정해 연결합니다. type=module로 바꾸지 않습니다.

`main-posters.js → main-poster-sprites.js → main-scroll-input.js → main-hero-sprite-batch.js → main-hero.js`

필수 ID는 `hero, heroStage, heroCanvas, heroBg, heroPoster, heroPosterCanvas`입니다. 후속 포스터 전환을 위해 예제의 `heroFx, heroIndicator`도 그대로 복사하세요. 테마 데이터, 아틀라스, 포스터 이미지 경로는 main-hero.js 파일 위치를 기준으로 계산합니다. 제공한 js/assets의 상대 위치를 유지하면 됩니다. Lenis는 선택 사항이며 이 패키지는 기본 브라우저 입력만 사용합니다.

### 주요 조절값 — main-hero.js 상단 SETTINGS / PUSH

| 값 | 기본값 | 역할 |
| --- | --- | --- |
| fly / scatter | 900 / 1275 ms | 결합 / 분산 시간 |
| iconScatterSpeed / iconScatterDistance | 0.14 / 1.25 | 처음 부유하는 속도 / 거리 |
| iconBlurMax / iconBlurLayers | 3.5 / 6 | 최대 블러 / 레이어 수 |
| iconGatherLastStart | 0.28 | 마지막 아이콘 출발 시점 비율 |
| iconGatherCurve | 0.04 | 결합 이동 경로의 휨 |
| iconSideMaxCount | 1800 | 결합 주변 보조 아이콘 최대 수 |
| PUSH.radius / clickRadius | 110 / 200 px | 마우스 / 클릭 영향 범위 |
| autoInterval | 5500 ms | 포스터 자동 전환 간격 |

목적 글자를 바꾸려면 이미지뿐 아니라 좌표 데이터도 함께 재생성해야 합니다. 참고 SVG를 다른 것으로 교체하는 것만으로 메인의 글자가 바뀌지는 않습니다.

## 2. 아카이브 — 배경 아이콘 결합 / 분리

팀 SVG 14개를 읽고 같은 채움색의 도형끼리 하나의 조각으로 묶습니다. 실제 표시는 채움을 제거한 윤곽선입니다. 조각은 배경에서 천천히 흐르고, 화면 중앙으로 갈수록 옅어집니다. 문서 높이에 맞춰 조각 묶음을 추가하여 스크롤 아래까지 배경을 이어갑니다.

서로 다른 종류의 조각이 가까워지면 자동 결합합니다. 두 원본 도형을 하나의 SVG 안에 겹쳐 합성하고, 이동·각도·크기를 보간해 맞춘 뒤 기존 두 조각을 페이드아웃합니다. **SVG 경로 자체를 변형하는 모핑이나 boolean union 연산은 아닙니다.** 잠깐 유지한 후 늘어남·눌림·반동과 함께 두 조각으로 다시 분리됩니다.

직접 아이콘을 잡아 다른 아이콘 근처에 놓아도 결합합니다. 잡은 아이콘은 커지고, 대상에 가까워질수록 흔들림이 달라집니다. 놓을 때 대상이 없으면 합치지 않고 돌아다닙니다. Escape, 포인터 취소, 창 비활성화 시 드래그를 정리합니다.

### 적용

페이지에 다음 파일 하나를 연결하면 배경 호스트와 Shadow DOM 내부 스타일을 자동으로 만듭니다.

`<script defer src="../js/archive-background.js"></script>`

외부 라이브러리나 archive 원본 CSS는 필요 없습니다. `ICON_URLS`는 **HTML 페이지 기준** 상대 경로이므로 파일 배치를 바꿀 때 수정합니다. SVG는 HTTP로 제공해야 합니다. 효과가 body에 position:relative, isolation:isolate, 배경색을 설정하며 z-index:-1로 깔리므로 기존 페이지의 불투명 배경 레이어와 쌓임 순서를 확인하세요.

원본대로 760px 이상에서 동작합니다. 더 좁은 화면에 쓰려면 파일 상단의 archiveDesktop 미디어 쿼리를 조정하세요. 링크·버튼·입력창 및 기존 콘텐츠 클래스에서는 배경 드래그를 시작하지 않습니다. 새로운 콘텐츠 클래스는 isContentTarget 선택자에 추가할 수 있습니다.

### 주요 조절값 — archive-background.js 상단

| 값 | 기본값 | 역할 |
| --- | --- | --- |
| LINE_COLOR / STROKE_WIDTH | #444444 / 1.25 | 윤곽선 색 / 두께 |
| TILE_HEIGHT_VH | 80 | 반복 배경 묶음 기준 높이 |
| FLOW_SPEED | 18 | 부유 속도 계산 기준 |
| SNAP_DISTANCE | 24 px | 드롭 대상 탐색 여유 거리 |
| HOLD_SCALE | 1.25 | 잡은 아이콘의 확대 배율 |
| MERGE_DURATION / MERGE_HOLD | 0.65 / 1.05 초 | 자동 결합 시간 / 유지 시간 |
| MANUAL_MERGE_DURATION / MANUAL_MERGE_HOLD | 0.85 / 3 초 | 드래그 결합 시간 / 유지 시간 |
| SPLIT_IMPULSE | 175 | 분리할 때 주는 속도 |
| MERGE_COOLDOWN | 7 초 + 무작위 여유 | 분리 후 자동 재결합 대기 |
| MAX_MERGES | 2 | 자동 결합 시작을 제한하는 동시 결합 수 기준 |

MAX_MERGES는 자동 충돌 판정에만 적용됩니다. 수동 드래그 결합에는 같은 제한을 걸지 않습니다. 숨겨진 탭·페이지 전환 중에는 루프를 멈추고, 화면 밖 조각의 그리기를 생략합니다. 동작 줄이기에서는 자동 부유가 멈추지만 수동 결합과 분리 타이머는 유지됩니다.
