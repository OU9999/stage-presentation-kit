# 컬러·모션 개선 통합 검증

2026-10-24 · 총괄 `/root`의 실제 제품 검증.

[개선 전후와 실제 발표](index.html) · [실제 발표 6장](../../index.html#6) · [구현 보고](engineering/implementation.md)

## 적용한 결과

선명한 강조색을 핵심 문장·이름·범주·수치·선택 막대에 배정하고, 보조 라벨·단위·구조 경계는 중립으로 분리했다. 사진과 결과물의 고유 색·배치는 유지했다. 팔레트와 모션 수치는 STAGE의 독자 사양이며 원본 공식 HEX·원본 전환 수치로 설명하지 않는다.

현재 HTML/CSS/JavaScript 구조를 유지했다. React·reveal.js·GSAP·Motion을 공식 문서와 현행 작성·내보내기·오프라인 계약에 대조한 [기술 판단](engineering/synthesis.md)을 따랐다. 새 외부 런타임이나 빌드 도구는 추가하지 않았다.

## 총괄의 독립 확인

| 검사 | 실제 결과 | 근거 |
| --- | --- | --- |
| 자동 회귀 | 기존 163 + 새 계약 5 = 168개 통과, 실패·취소·skip 0 | `node --test tests/*.test.cjs` 독립 실행, [테스트](../../tests/motion-contract.test.cjs) |
| 같은 조건의 전후 | 5장 모두 1440×1000, 활성 장 opacity 1·실행 중 효과 0에서 캡처 | [기준 조건](evidence/before-capture.json), [개선 후와 산출물 조건](evidence/artifact-render.json) |
| 제목 모션 | `message-rise` 280ms 실행 후 효과 0·숨은 필드 0 | [실제 브라우저 결과](evidence/final-browser.json) |
| 항목 모션 | 루트 범주 4개가 300ms·0/60/120/180ms 지연으로 실행 후 완성 | [실제 브라우저 결과](evidence/final-browser.json) |
| 차트 모션 | 막대 440ms·0/40/80ms 지연, 수치 32/56/84가 전후 동일 | [실제 브라우저 결과](evidence/final-browser.json) |
| 정적 예외 | reduce에서 제목 opacity 1·효과 0, 편집에서 3필드 활성·효과 0, 전체 보기 20복제 효과 0 | [실제 브라우저 결과](evidence/final-browser.json) |
| JS 읽기 이동 | 실행 중 시스템 reduce 변경 시 실제 smooth → instant 호출 확인 | [실제 브라우저 결과](evidence/final-browser.json) |
| 모바일 읽기 | 390px viewport·scrollWidth 390px, 20장 모두 표시·효과 0 | [화면](evidence/mobile-read.png), [JSON](evidence/final-browser.json) |
| 발표자·빠른 이동 | 9→10장 동기화, 발표자에서 이전을 눌러 관객 9장 복귀. End→Home 후 활성 장 1개·01/20 | [실제 브라우저 결과](evidence/final-browser.json) |
| 실제 자원 | 새 로컬 서버에서 이미지 23개 정상, 깨진 이미지·HTTP 오류 0 | [실제 브라우저 결과](evidence/final-browser.json) |
| 비교 화면 | 장면 선택·75% 슬라이더·iframe 9장 이동, 390px 가로 넘침 0 | [화면](evidence/final-board.png), [JSON](evidence/final-browser.json) |

모션 확인은 다른 팀의 브라우저 작업 종료 후 총괄 p1을 전경으로 두고 수행했다. 각 시작 장은 새 document로 열어 이전 읽기·편집 상태가 남지 않게 했다. CSS 효과의 실제 실행과 종료를 확인했으며, duration 문자열만 검사한 결과가 아니다.

## 팀 검수와 출력

엔지니어링 매니저는 별도 고유 ID·경로의 `file://` 복사본에서 3테마·수치/단위·실제 편집→다운로드→재로딩·motion 보존·모바일 읽기를 확인했다. [매니저 근거](engineering/evidence/manager-browser.json)와 [다운로드 결과](engineering/evidence/manager-export.js)를 실제 루트 총괄 검사와 구분한다. 리서치·디자인 매니저도 최종 5장과 원본/확정 사양을 각각 독립 대조했다. [리서치 최종 검수](research/final-product-review.md), [디자인 최종 검수](design/final-product-review.md).

PDF 6개는 최종 로컬 파일을 명시적인 print media로 열어 생성했다. screen 에뮬레이션 때문에 한 페이지만 나온 초안은 거절했으며 최종 파일에 남기지 않았다. `pdfinfo`로 20/7/7/7/7/7페이지, 합계 55페이지를 확인했다. [실제 페이지 수](evidence/pdf-pages.json), [생성 조건](evidence/artifact-render.json). Poppler가 Type 3 글리프 bounding box 경고를 출력했지만, 대표 6·9장 렌더에서 한글 문장·막대·최종 수치가 완전하게 보임을 직접 확인했다. [문장 PDF 렌더](evidence/pdf-statement.png), [차트 PDF 렌더](evidence/pdf-chart.png).

루트 표지·20장 모음, 예제 5장·모음의 PNG 8개를 현재 렌더러에서 다시 캡처했고 갤러리의 이미지 cache query를 실제 SHA로 갱신했다. 이미지 편집으로 색을 덧칠한 결과가 아니다.

현재 QA 중 생긴 루트 저장 데이터가 원본과 완전히 동일함을 확인하고, `/tmp` 복구본을 남긴 뒤 해당 키만 제거했다. 다른 localStorage 키·쿠키·브라우저 프로필은 변경하지 않았다. 출력이 쌓이던 이번 세션의 로컬 서버는 로그를 파일로 보내는 같은 포트의 서버로 교체했고 실제 이미지 요청을 재검증했다.

## 최종 파일 기준과 한계

공통 파일 SHA-256 앞 12자리는 app `ec970a351872`, styles `66752a982bf1`, model `d62fc5037c36`, root content `370215d8ac4a`다. [정적 파일·링크 검증](evidence/static-checks.json)을 함께 남긴다.

현재 브라우저·390px 에뮬레이션·대표 PDF 2장의 검증이다. 모든 55페이지의 순차 육안 검수, 물리 모바일 기기, 다른 브라우저, 프로젝터·발표 거리의 색 재현·전체 보조기기 검증을 뜻하지 않는다. 변경은 로컬에 있으며 이번 작업에서 커밋·푸시·외부 배포는 하지 않았다.
