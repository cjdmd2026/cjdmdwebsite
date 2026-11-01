# R2 제출 저장소 연결

운영 주소는 https://www.dmd2026.com/submit/ 입니다. Vercel은 Hobby로 유지하고, 파일 임시 보관·접수 상태·업로드 순서 관리는 Cloudflare R2를 사용합니다. 최종 파일은 기존 GitHub 저장소의 팀 폴더에 반영합니다.

## 1. Cloudflare에서 버킷 생성

1. [Cloudflare 대시보드](https://dash.cloudflare.com/)에 로그인합니다.
2. **Storage & databases → R2 Object Storage → Overview**로 이동합니다. 처음이면 R2 구독 활성화와 결제수단 등록 절차를 완료합니다.
3. **Create bucket**에서 이름을 **dmd2026-submit**으로 입력합니다. 다른 이름을 쓰면 아래 환경변수에도 같은 이름을 입력하세요.
4. **Standard** 저장소를 선택합니다. 위치는 Automatic 또는 Asia-Pacific 힌트로 설정하고, EU/FedRAMP 전용 관할 구역은 선택하지 않습니다. 현재 코드는 기본 R2 엔드포인트를 사용합니다.
5. 버킷은 **비공개**로 유지합니다. Public Development URL(r2.dev)이나 Custom Domain을 연결할 필요가 없습니다.

Standard의 무료 제공량은 월 10 GB-month, 저장·목록 등 100만 회, 조회 1,000만 회입니다. 무료 한도를 초과하면 과금되므로 무조건 0원인 서비스는 아닙니다. Vercel Hobby의 서버 실행량 한도도 별도로 적용됩니다.

## 2. 브라우저 업로드 허용(CORS)

버킷 **Settings → CORS Policy → Add/Edit**에서 [r2-cors.json](./r2-cors.json)의 내용을 붙여 넣고 저장합니다.

```json
[
  {
    "AllowedOrigins": ["https://dmd2026.com", "https://www.dmd2026.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type", "If-None-Match"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

CORS 설정이 없으면 서버에서 업로드 주소를 발급해도 브라우저가 파일을 보내지 못합니다. 저장소를 공개로 바꾸는 설정은 아닙니다. Vercel Preview에서 시험하려면 그 미리보기의 정확한 출처를 AllowedOrigins에 별도로 추가해야 합니다.

## 3. 버킷 전용 API 인증 정보 생성

1. R2 Overview의 **Account Details → API Tokens → Manage**로 이동합니다.
2. **Create Account API token**을 선택합니다. 계정 권한상 제공되지 않으면 **Create User API token**을 사용합니다.
3. 권한은 **Object Read & Write**로 선택하고, **Apply to specific buckets only → dmd2026-submit**으로 제한합니다.
4. 사용 기간은 제출 운영 기간을 포함하도록 설정합니다. 기본 Vercel 함수의 출발 IP는 고정되지 않으므로 임의의 IP 제한을 추가하지 않습니다.
5. 발급 화면의 **Access Key ID**, **Secret Access Key**를 보관합니다. 일반 API Token 문자열과 다릅니다. Secret Access Key는 발급 직후에만 표시됩니다.
6. R2 Overview의 **Account ID**도 확인합니다. S3 API 주소에서 https://와 .r2.cloudflarestorage.com 사이의 계정 ID입니다.

실제 키 값은 채팅이나 GitHub 파일에 붙여 넣지 말고 다음 단계의 Vercel 환경변수에 직접 입력하세요.

## 4. Vercel 프로젝트 환경변수 추가

**CJdmd → cjdmdwebsite → Settings → Environment Variables → Add Environment Variable**에서 아래 네 개를 **Production** 환경에 추가합니다. 팀 전체 환경변수 조회 화면이 아니라 프로젝트 설정 화면입니다.

| Key | Value |
|---|---|
| R2_ACCOUNT_ID | Cloudflare Account ID |
| R2_BUCKET_NAME | dmd2026-submit |
| R2_ACCESS_KEY_ID | 발급한 Access Key ID |
| R2_SECRET_ACCESS_KEY | 발급한 Secret Access Key |

기존 SUBMISSION_GITHUB_TOKEN, SUBMISSION_SIGNING_SECRET, 저장소·브랜치·도메인 설정은 유지합니다. SUBMISSIONS_ENABLED=true도 필요합니다. VITE_나 NEXT_PUBLIC_ 접두사는 붙이지 않습니다.

BLOB_READ_WRITE_TOKEN, BLOB_STORE_ID, BLOB_WEBHOOK_PUBLIC_KEY는 새 코드에서 사용하지 않습니다. 남아 있어도 R2 동작에 영향을 주지 않습니다. 기존 Blob 파일과 저장소는 이번 변경으로 삭제하지 않습니다.

저장한 뒤 **Deployments → 최신 main 배포 → ⋯ → Redeploy → Production**으로 재배포합니다. 새 R2 코드가 포함된 최신 배포를 선택하세요.

## 5. 연결 점검과 전환

1. [제출 페이지](https://www.dmd2026.com/submit/)를 새로고침합니다. 설정이 없으면 '제출 기능을 준비하고 있습니다' 안내가 나타납니다.
2. /api/submission?action=config가 HTTP 200과 enabled: true를 반환하는지 확인합니다.
3. 실제 반영할 팀의 파일로 업로드를 시작합니다. 일시정지·이어 올리기를 확인한 뒤, 파일 목록 검토 후 '변경사항 반영'을 누릅니다.
4. GitHub PR 병합과 Vercel 배포 완료, 해당 팀 주소까지 확인합니다. 최종 버튼은 운영 사이트를 바꾸므로 임의의 테스트 파일을 학생 폴더에 반영하지 않습니다.

이미 GitHub에 반영된 팀 파일은 유지합니다. **예전 Blob에서 미완료된 업로드는 R2로 자동 이전되지 않습니다.** 새 페이지에서 팀과 폴더를 다시 선택해 제출해야 합니다. 기존 접수 확인권은 브라우저에 보존하며 새 R2 접수와 분리합니다.

서버 원본 접수 기능은 이번 변경에 포함하지 않았습니다. 정적 웹사이트 제출만 전환합니다.

## 보관과 비용 관리

- 한 팀씩 접수, 4개 파일 동시 업로드, 팀 전체 500 MiB·2,000개·파일당 95 MiB 제한을 유지합니다.
- R2 버킷의 기존 파일과 새 업로드 예약분을 합쳐 900 MiB가 넘으면 접수를 막습니다. 무료 용량을 고려한 보수적인 운영 제한이며 R2 자체의 최대 용량은 아닙니다. 이 버킷은 제출 전용으로 사용하세요.
- 파일은 유효기간 최대 10분의 서명 URL로 직접 업로드합니다. URL은 저장 위치·정확한 크기·덮어쓰기 금지 조건에 묶이고 비밀 키는 브라우저로 전달하지 않습니다.
- 큰 파일도 최대 95 MiB의 단일 PUT으로 전송합니다. 일시정지 중이던 파일 자체는 다시 전송할 수 있으며, 검증 완료 파일은 건너뜁니다.
- 성공·실패·취소 후 이미 발급한 업로드 주소의 만료를 기다려 최대 약 12분 뒤 임시 파일을 정리합니다. 파일 내용의 SHA-256 검증, GitHub 폴더 범위 검사, 자동 병합을 유지합니다.
- 요청이 완전히 끊기면 자동 정리는 다음 요청 때 실행됩니다. 장기간 남는 임시 파일에 대비해 버킷 Settings의 **Object lifecycle rules**에서 submissions/와 submission-limits/를 각각 **7일 후 삭제**하도록 설정하는 것을 권장합니다. 이 규칙은 R2 임시 접수 기록만 대상으로 하며 GitHub 파일에는 적용되지 않습니다. submission-control/에는 적용하지 않습니다. R2의 수명주기 정리는 즉시 실행되는 것이 아닙니다.
- 사용량은 R2 Overview에서 확인하세요. 위 용량 제한은 월별 작업 횟수나 비용의 절대 상한을 보장하지 않습니다.

## 오류 확인

| 증상 | 확인 |
|---|---|
| 준비 중 안내 | 네 개 R2 변수와 기존 제출 변수, Production 적용 여부, Redeploy 여부 |
| 저장소 연결 오류·503 | Account ID/버킷 이름/키, 해당 버킷 Object Read & Write 권한, Cloudflare 구독 상태 |
| 업로드 주소 발급 후 전송 실패 | CORS 두 도메인, PUT, Content-Type 및 If-None-Match 허용 여부 |
| 업로드 후 반영 실패 | GitHub 토큰 권한·만료, PR 충돌, Vercel 함수 로그 |

관련 공식 문서: [R2 시작](https://developers.cloudflare.com/r2/get-started/), [API 인증 정보](https://developers.cloudflare.com/r2/api/tokens/), [CORS](https://developers.cloudflare.com/r2/buckets/cors/), [요금](https://developers.cloudflare.com/r2/pricing/), [수명주기](https://developers.cloudflare.com/r2/buckets/object-lifecycles/).
