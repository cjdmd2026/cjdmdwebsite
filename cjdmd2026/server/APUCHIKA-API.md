# 아푸치카 API

제공된 `APUCHIKA_Final/app/api`의 대원증·문의 기능을 현재 Vercel 프로젝트에 연결했습니다. 기존 아푸치카 페이지와 자산은 유지합니다.

| 경로 | 메서드 | 기능 |
| --- | --- | --- |
| `/apuchika/api/badges` | POST | PNG 대원증 보관, QR·다운로드 URL 발급 |
| `/apuchika/api/badges/:id` | GET | 대원증 다운로드 (`?download=1` 지원) |
| `/apuchika/api/badges/:id` | DELETE | 발급 응답의 `deleteToken`을 Bearer 인증으로 전달하여 삭제 |
| `/apuchika/api/inquiries` | POST | 원본과 동일한 이름·연락처·나이·기간·문의 내용을 비공개 저장 |

`vercel.json`이 위 경로를 `api/apuchika.js`로 연결합니다. 프런트엔드의 QR 요청과 다운로드 페이지 경로도 `/apuchika/` 기준입니다. 기존 이용권 문의 폼은 비활성 상태를 유지하며 문의 API를 자동 호출하지 않습니다. 문의 API는 저장만 하며 이메일 발송이나 관리 화면은 포함하지 않습니다.

## 저장소와 접근

- 기존 서버 전용 `R2_ACCOUNT_ID`, `R2_BUCKET_NAME`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`를 사용합니다. 별도의 키를 브라우저에 넣지 않습니다.
- R2의 `apuchika/badges/`, `apuchika/inquiries/`, `apuchika/limits/` 경로만 사용합니다. 제출용 파일·공개 에셋과 경로가 분리됩니다.
- 원본의 Sites 로그인 헤더는 Vercel에서 신뢰할 수 없으므로 사용하지 않습니다. 공개 전시 사이트의 방문자가 QR을 만들고, 생성 페이지에만 전달되는 별도 비밀 토큰으로 삭제합니다. 저장소에는 삭제 토큰의 SHA-256 해시만 기록합니다.
- 다운로드 URL은 192비트 무작위 ID를 포함하며 링크를 가진 사람이 열 수 있습니다. 삭제 토큰은 QR에 포함되지 않습니다. 새 대원증 시작 또는 페이지 새로고침 시 생성 페이지의 삭제 토큰은 사라집니다.
- 대원증 링크는 24시간 후 만료됩니다. 만료 이미지 조회 또는 다음 업로드 때 최대 64개씩 만료 이미지를 삭제합니다. 업로드·조회가 없으면 물리적 삭제는 지연될 수 있습니다. 정확한 보관 기간에 따른 자동 삭제가 필요하면 해당 prefix에 R2 수명 주기 규칙을 별도로 설정합니다.
- 업로드는 최대 4 MiB의 1500×1000 또는 2048×1129 PNG이며, 쓰기 요청은 같은 출처만 허용합니다. 기능별 IP당 분당 30회, 전체 일일 500회 저장을 제한합니다. 저장 실패를 성공으로 표시하지 않습니다.
- 문의는 공개 조회 API가 없으며 R2에서 담당자가 확인합니다. 문의 자동 삭제 정책은 원본처럼 포함되지 않습니다.

## 검증과 배포

`node --test tests/apuchika-api.test.mjs`는 API·저장소 어댑터·만료·권한·용량·요청 제한을 검증합니다.

`npm run build` 후 `node tests/browser-apuchika-api.cjs`는 가상 카메라와 메모리 저장소로 실제 브라우저의 생성 → QR → 모바일 다운로드 → 삭제 흐름을 검증합니다. 운영 R2에 쓰지 않습니다.

Vercel Git 배포에는 `api/`, `server/`, `package.json`, 잠금 파일, `vercel.json`, 수정된 아푸치카 페이지·JS가 함께 필요합니다. `public-dist`만 업로드하면 API는 배포되지 않습니다. 운영 환경변수는 존재를 확인했지만 실제 R2 쓰기와 운영 경로는 배포 후 별도 확인해야 합니다.
