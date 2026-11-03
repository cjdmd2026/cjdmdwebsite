# 파일 구성과 원본 대응

원본의 경로만 기재한 문서가 아니라, 필요한 파일의 실제 사본을 포함한 패키지입니다.

| 공유용 경로 | 원본 / 처리 |
| --- | --- |
| js/main-hero.js | 같은 경로에서 수정 없이 복사 |
| js/main-hero-sprite-batch.js | 같은 경로에서 수정 없이 복사 |
| js/main-scroll-input.js | 같은 경로에서 수정 없이 복사 |
| js/main-poster-sprites.js | 같은 경로의 전체 좌표 데이터 복사 |
| js/main-posters.js | js/main-data.js 중 MAIN_POSTERS만 추출; PDF 경로 비움 |
| js/archive-background.js | js/archive.js의 6. Floating Outline Background 블록 추출; 외부 archiveDesktop 변수를 내부에 정의 |
| css/main-effect.css | css/main.css의 hero / tablet / mobile hero 규칙 추출; 최소 reset과 예제 메뉴 스타일 추가 |
| css/share.css | 안내·아카이브 데모·SVG 미리보기용 스타일 |
| assets/images/poster/*.webp | 메인에서 실제 사용하는 아틀라스 2개 + 포스터 2개 복사 |
| assets/images/project/test/icon/*.svg | 아카이브에서 실제 로드하는 팀 SVG 14개, 수정 없이 복사 |
| assets/svg/individual/*.svg | 기존 MAIN_ICON_FRAGMENTS의 viewBox / 색상 / 도형으로 만든 개인 조각 33개 |
| assets/svg/source-data/*.js | 개인 SVG의 추출 근거인 조각 데이터·팀 매핑 원본 복사 |
| assets/svg/reference/assembly-poster.svg | assets/images/poster/assembly-poster.svg의 실제 사본; assembly 페이지 참고본 |
| assets/svg/reference/gyeolhap-word.svg | assets/images/designer/gyeolhap-word.svg의 실제 사본; designer 페이지 참고본 |
| assets/images/icons/mouse-icon-animated.svg | 메인 스크롤 안내 SVG 원본 사본 |
| assets/svg/catalog.json | SVG 경로·개인 ID·색상·팀 원본 연결 |
| main/index.html / archive/index.html | 관련 기능만 남긴 독립 실행 HTML |
| index.html / svg-gallery.html | 예제 목록과 실제 SVG 미리보기 |
| serve.mjs / START-WINDOWS.cmd | 외부 설치 패키지 없이 실행하는 로컬 서버 |
| copied-files.json | 그대로 복사한 파일의 원본 경로와 SHA-256 |
| MANIFEST.sha256 | 패키지 파일별 SHA-256 (이 파일 자신 제외) |

참고 SVG 두 개는 현재 main의 WebP 렌더링 입력 파일이 아닙니다. 개인 조각 SVG 역시 원본 데이터로부터 내보낸 편집·재사용용 파일이며, 메인 효과는 별도 포스터 아틀라스와 좌표 데이터가 담당합니다.

전체 사이트의 학생 소개, 위원회·교수진·영상, 아카이브 사진과 과거 전시 콘텐츠, 서버, 인증·환경설정은 들어 있지 않습니다. 개인 SVG 파일 이름에는 기존 데이터의 식별자를 유지했습니다.
