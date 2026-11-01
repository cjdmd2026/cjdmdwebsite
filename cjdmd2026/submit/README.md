# 웹사이트 제출 페이지 운영

`https://dmd2026.com/submit/`에서 팀 선택 → ZIP 업로드 → 서버 검사 → GitHub PR 생성까지 처리합니다. 학생은 계정이나 팀 코드를 입력하지 않습니다. PR을 담당자가 병합하면 기존 Git 연동으로 Vercel이 배포합니다. 자동 병합은 하지 않습니다.

## Vercel 배포 설정

이 저장소의 Vercel **Root Directory는 `cjdmd2026`**를 기준으로 작성했습니다. 현재 설정을 먼저 확인하세요. 저장소 루트와 사이트 루트는 서로 다릅니다.

- Framework Preset: **Other**
- Root Directory: **cjdmd2026**
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `public-dist`
- Node.js: **24.x** 권장 (22.15 이상 필요)
- 기존 정적 페이지와 에셋은 빌드 시 복사합니다. 서버 코드, 테스트, 환경변수 파일은 정적 출력에 포함하지 않습니다.
- `api/submission.js`는 Vercel Function입니다. `public-dist`만 수동 업로드하면 서버 함수는 배포되지 않습니다. Git 연결 또는 Vercel 프로젝트 배포를 사용하세요.

## 최초 연결

1. Vercel의 해당 프로젝트에서 **Storage → Create Database → Blob**으로 **Private** 저장소를 생성하거나 기존 Private Blob을 연결합니다. `BLOB_READ_WRITE_TOKEN`이 프로젝트의 필요한 환경에 연결되어야 합니다. Public Blob으로 바꾸지 마세요.
2. GitHub에서 `cjdmd2026/cjdmdwebsite` 하나만 대상으로 하는 인증 정보를 준비합니다. 현재 구현은 서버 전용 fine-grained PAT를 사용합니다. 최소 권한은 **Contents: Read and write**, **Pull requests: Read and write**, **Metadata: Read**입니다. 조직의 토큰 승인 정책이 있으면 승인까지 완료해야 합니다. GitHub Apps 사용을 원한다면 서버의 토큰 공급 부분을 설치 토큰 발급 방식으로 변경할 수 있습니다.
3. Vercel 환경변수를 설정합니다. 실제 비밀 값은 채팅·소스·이 문서에 넣지 않습니다.

| 변수 | 값 / 용도 |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | 연결된 Private Blob의 서버 토큰 |
| `SUBMISSION_GITHUB_TOKEN` | 위 저장소에만 권한을 부여한 GitHub 토큰 |
| `SUBMISSION_SIGNING_SECRET` | 임의의 충분히 긴 비밀 문자열, 최소 32자. 접수 확인권 서명용 |
| `SUBMISSION_GITHUB_REPOSITORY` | `cjdmd2026/cjdmdwebsite` |
| `SUBMISSION_BASE_BRANCH` | `main` (실제 운영 배포 브랜치와 일치시킬 것) |
| `SUBMISSION_SITE_PATH` | `cjdmd2026` (GitHub 저장소 안의 사이트 폴더) |
| `SUBMISSION_ORIGIN` | `https://dmd2026.com` |
| `SUBMISSIONS_ENABLED` | 연결·점검 완료 후 `true`, 접수 중지 시 `false` |

4. 환경변수 적용 후 **Redeploy**합니다. 설정이 없으면 페이지에 준비 중 안내가 나타나고 제출은 차단됩니다. 미설정 상태에서 성공한 것처럼 처리하지 않습니다.
5. 작은 테스트 ZIP을 제출합니다. Blob에서 ZIP 접수, GitHub에서 올바른 팀 폴더만 변경하는 PR이 생성되는지 확인합니다. 해당 PR은 테스트임을 확인한 뒤 직접 병합 여부를 판단하세요. PR 생성 전에는 운영 팀 사이트를 바꾸지 않습니다.

GitHub 토큰을 `VITE_`, `NEXT_PUBLIC_` 등 브라우저에 공개되는 환경변수에 넣으면 안 됩니다. 위 변수는 서버에서만 사용합니다. 자동 미리보기 배포가 연결돼 있다면 PR 자체에도 Vercel Preview가 생성될 수 있습니다.

운영 도메인의 리디렉션을 고려하여 `https://dmd2026.com`과 `https://www.dmd2026.com` 두 출처를 허용합니다. 다른 서브도메인은 자동으로 허용하지 않습니다.

## 팀과 경로

기존 `js/project-data.js`의 팀 이름·팀원·ID를 함께 사용합니다. 프로젝트 ID는 유지하고, `server/teams.mjs`에서 아래 확정된 공개 경로로 연결합니다. 제출 화면, GitHub 저장 폴더, PR 안내, 정적 빌드가 동일한 경로 설정을 사용합니다. 변경 후 다시 빌드하세요.

| 팀 | 공개 경로 / 사이트 루트 아래 저장 폴더 |
|---|---|
| 읽:꼬 | `/ilkko/` |
| CURO | `/curo/` |
| 아푸치카 | `/apuchika/` |
| COCO LANG | `/coco-lang/` |
| 다들림 | `/dadeullim/` |
| 피싱뚝! | `/phishing-ddook/` |
| OMIX | `/omix/` |
| E.FACT | `/e-fact/` |
| Stylens | `/stylens/` |
| 직지잼버리 | `/jigjijaembeoli/` |
| 마그모아 | `/magmoa/` |
| 그늘잡이 | `/geuneuljab-i/` |
| YEAR-ON | `/year-on/` |
| 별운관 | `/byeol-ungwan/` |

- 읽:꼬 → GitHub `cjdmd2026/ilkko/` → `/ilkko/`
- 새 제출은 해당 팀 폴더 전체를 교체하는 PR입니다. 수정본에 빠진 이전 파일은 PR에서 삭제로 표시됩니다.
- 팀 선택은 신원 인증이 아닙니다. 담당자가 팀과 제출 내용을 확인해야 합니다. 동일 팀의 PR이 여러 개면 제출 시각·내용을 확인하고 최종본 하나를 반영하세요.

## 업로드와 재시도

- 브라우저가 ZIP을 Blob에 직접 multipart 업로드하므로 Vercel Function의 4.5 MB 요청 크기 제한을 거치지 않습니다.
- 초기 운영 제한: ZIP 200 MiB, 압축 해제 합계 500 MiB, 개별 파일 95 MiB, 최대 500개 파일.
- ZIP 루트의 `index.html` 또는 공통 상위 폴더 아래 `index.html`을 찾습니다. 여러 사이트가 섞인 ZIP은 거부합니다.
- 상위 폴더 탈출, 절대 경로, 심볼릭 링크, 암호화 ZIP, 중복 이름, 손상된 파일, `.git`·`.env`·`node_modules`·배포 설정·실행 파일을 거부합니다. 학생 파일은 서버에서 실행하지 않습니다.
- Vercel BotID **Basic**으로 요청을 확인합니다. 별도의 CAPTCHA·팀 코드를 요구하지 않습니다. Production에서 브라우저 요청으로 확인해야 합니다. 로컬에서만 개발 우회를 허용합니다.
- IP별 시간당 100회 접수 제한을 둡니다. 공용 캠퍼스 IP를 고려한 값이며 소속 인증은 아닙니다. 필요하면 Vercel Firewall에서도 요청 제한을 조정하세요.
- 접수는 서버가 서명한 확인권으로 조회합니다. 확인권은 브라우저 세션에 저장되며 24시간 유효합니다. 다른 사용자의 파일 URL을 입력받아 서버가 다운로드하는 기능은 없습니다.
- 업로드 완료 콜백과 브라우저가 처리를 시작할 수 있습니다. Blob의 조건부 쓰기로 중복 처리를 막고, 같은 접수는 같은 GitHub 브랜치·PR을 사용합니다.
- 처리가 길어지면 저장한 Git blob 체크포인트부터 재개합니다. **자동 재개는 제출 페이지가 열린 동안** 진행됩니다. 브라우저가 닫혀도 진행 중인 서버 호출은 계속되지만, 시간제한·일시 오류 후 다음 처리는 같은 브라우저 세션에서 페이지를 다시 열거나 상태 확인 버튼을 눌러야 합니다. 영구 큐/워크플로 엔진은 포함하지 않았습니다.
- PR 생성 성공 후 원본 ZIP을 삭제합니다. 실패·중단된 ZIP, 접수 상태, 속도 제한 기록은 Private Blob에 남습니다. 접수 기간 종료 후 `submissions/` 및 `submission-limits/`의 불필요한 기록을 관리자 화면에서 정리하세요. 자동 보관기한 삭제는 아직 없습니다.
- Blob 저장·전송과 Functions 사용량은 Vercel 플랜에 따라 과금될 수 있습니다. 공개 접수 전에 사용량 한도와 알림을 확인하세요.

## 로컬 확인

```sh
npm ci
npm test
npm run build
npm run dev
```

`http://127.0.0.1:4173/submit/`에서 확인합니다. 기본 로컬 실행은 실제 토큰 없이 준비 중 화면을 제공합니다. 실제 Blob 콜백과 GitHub 권한은 Vercel에서 연결 후 별도 확인이 필요합니다. 테스트는 실제 GitHub에 PR을 생성하지 않습니다.

관련 문서: [Vercel Functions](https://vercel.com/docs/functions/quickstart), [Blob 직접 업로드](https://vercel.com/docs/vercel-blob/client-upload), [BotID](https://vercel.com/docs/botid/get-started), [GitHub 인증 정보](https://docs.github.com/en/rest/authentication/keeping-your-api-credentials-secure).
