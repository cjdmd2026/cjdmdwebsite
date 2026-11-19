# E.FACT API

팀이 전달한 `tms-server.py`, `history_api.py`, `incinerator_api.py`,
`tms-facilities.json`을 현재 Node/Vercel 서버에 맞춰 연동했습니다.
별도 Python 서버나 8765 포트는 필요하지 않습니다.

| 경로 (GET) | 데이터 | 서버 환경변수 |
| --- | --- | --- |
| `/e-fact/api/health` | 연결 확인 | 없음 |
| `/e-fact/api/tms` | 선정된 청주 7개 사업장 굴뚝 측정값 | `CLEANSYS_SERVICE_KEY` |
| `/e-fact/api/air` | 청주 9개 측정소 생활권 대기질 | `AIRKOREA_SERVICE_KEY` |
| `/e-fact/api/air-history?station=복대동` | 최신 공개 측정시점 기준 24시간 | `AIRKOREA_SERVICE_KEY` |
| `/e-fact/api/tms-history?facility=1` | 수집된 굴뚝 측정값의 최근 24시간 | `CLEANSYS_SERVICE_KEY`, 기존 `R2_*` |
| `/e-fact/api/incinerators` | 청주 소각열 회수 인증 기록, 전체 페이지 조회 후 필터링 | `INCINERATOR_SERVICE_KEY` |

Vercel은 위 경로를 `/api/efact?resource=...`로 연결합니다. 기존 캐시된
스크립트가 사용하는 `/e-fact/js/api/...`도 지원합니다.

## 설정 및 실행

공공데이터포털에서 각 API의 이용 승인을 받은 서비스 키를 Vercel의 해당
배포 환경에 설정한 뒤 배포하세요. 키 원문과 URL 인코딩된 키 모두 지원하며
브라우저 응답·정적 빌드에 키를 포함하지 않습니다. 제공받은 파일에는 실제 키가 없습니다.

로컬에서는 `.env.local`에 `.env.example`의 필요한 값을 설정하고
`npm run build`, `npm run dev`를 실행한 뒤
`http://localhost:4173/e-fact/`에 접속합니다.

키가 없으면 `unconfigured`, 외부 API 오류 시 `unavailable`, 이전 성공
응답이 남아 있으면 원래 측정 시점을 유지한 `stale`을 반환합니다.
측정 불가·음수·비수치 값은 0 대신 null로 표시합니다.

## 이력과 캐시

TMS는 화면의 5분 주기 조회 또는 이력 조회 때 수집합니다. 방문자가 없는
시간에는 별도 수집 작업이 실행되지 않으며 수집 이전 기록은 생성하지 않습니다.
항상 수집해야 한다면 별도 스케줄러가 `/e-fact/api/tms`를 5분마다 조회하도록
운영 환경에 설정해야 합니다. 이 변경은 예약 작업을 새로 등록하지 않습니다.

기존 R2 환경변수가 있으면 `efact/history/{시설ID}.json`에 저장하며,
ETag 조건부 갱신으로 동시 요청의 기록 손실을 방지합니다. 파일별 최근 48시간만
보관하고 화면에는 최근 24시간을 반환합니다. 갱신이 없는 시설의 오래된 파일은
다음 갱신 때 정리되며 조회 시에도 기간 밖 값은 제외합니다.
R2가 없으면 서버 프로세스 메모리에서만 유지하며 응답 `storage: "memory"`와
화면 안내로 구분합니다. 서버 재시작·다른 인스턴스에서는 이력이 이어지지 않습니다.
저장소 오류가 발생해도 최신 굴뚝 자료 조회는 유지하고 이력 실패를 별도 표시합니다.

외부 API 캐시는 인스턴스별로 TMS 5분, 대기질 10분, 대기 이력·소각열 1시간입니다.
실패 후 재시도 간격은 30초이며 같은 인스턴스의 동시 요청은 합칩니다.
공공 API 요청은 건별 20초, 전체 조회는 45초 제한입니다. 일부 페이지만
수신한 소각열 자료를 완전한 자료로 표시하지 않습니다.

## 검증

`node --test tests/efact-api.test.mjs`로 공식 응답 형태의 테스트 데이터를
사용해 정규화·키 처리·캐시·페이지 조회·이력·오류 처리를 확인합니다.
`node tests/browser-efact-api.cjs`는 실제 브라우저와 API 핸들러를 연결하고
외부 데이터 공급자만 테스트 응답으로 대체하여 페이지의 데이터 표시를 확인합니다.
실제 공공 API 인증·최신 관측값은 유효한 키를 설정한 환경에서 별도로 확인해야 합니다.
