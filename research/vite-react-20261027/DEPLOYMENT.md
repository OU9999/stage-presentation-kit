# GitHub Pages 배포 검증

2026-10-27 · 코드 커밋 `8323db8ec9f1b3b1b9d29d04857fed2c8ef79f93`

[공개 검토 화면](https://ou9999.github.io/stage-presentation-kit/research/vite-react-20261027/) · [React 편집 시제품](https://ou9999.github.io/stage-presentation-kit/research/vite-react-20261027/preview/react/index.html)

기존 public 저장소의 `main`·루트 branch source로 배포했다. [해당 커밋의 Pages 실행](https://github.com/OU9999/stage-presentation-kit/actions/runs/40471061531)은 성공했고, 실제 github.io 화면과 파일을 별도로 확인했다. 설정 변경이나 별도 앱 서버는 필요하지 않았다.

| 확인 범위 | 실제 결과 |
| --- | --- |
| 배포 전 회귀 | 기존 테스트 185개 통과·실패 0 |
| 공개 파일 | 신규 조사/화면과 공통 runtime 등 67개 URL 모두 HTTP 200·로컬 SHA-256 일치 |
| 배포 경로 | `/stage-presentation-kit/` 아래 결과 화면·React module/공통 script/CSS·기존 발표 iframe 정상 로드 |
| 탭 | 마우스 선택 및 키보드 좌우 이동으로 현재 발표/React 시제품 전환 |
| React 편집 | 실제 키보드 입력 58→72 적용, 차트/표 원본 일치, 무효 JSON 거절과 기존값 보존, 취소·초기값 복원 |
| 기존 발표 | 12장 생성, 다음·End·Home 이동 |
| 모바일 | 결과 화면·React 패널 390px에서 scrollWidth 390, iframe도 가로 넘침 0 |
| 브라우저 오류 | 확인한 경로의 Runtime/Console error·취소되지 않은 Network 실패·window error/rejection 0 |

정적 파일 검수와 실제 브라우저 검수는 서로 다른 근거다. 기존 제품 전체를 React로 전환하거나 성능 개선율을 재측정한 결과는 아니다. 시제품의 값은 가상 데이터이며 브라우저 새로고침 시 초기값으로 돌아간다.

근거는 [GitHub 배포 상태](evidence/pages-deployment.json), [공개 HTTP·해시](evidence/pages-http.json), [실제 UI 결과](evidence/pages-browser.json), [실행 스크립트](evidence/pages-browser-check.mjs)에 보관했다. [데스크톱 화면](evidence/pages-overview-desktop.png)·[React 화면](evidence/pages-react-embedded.png)·[모바일 화면](evidence/pages-overview-mobile.png)·[React 모바일](evidence/pages-react-mobile.png)도 함께 보관한다.

이 검증 기록은 별도 후속 커밋으로 전달한다. 후속 커밋은 검증 문서·근거·작업 로그만 추가하며, 위에서 검증한 결과 화면과 React 실행 파일을 바꾸지 않는다.
