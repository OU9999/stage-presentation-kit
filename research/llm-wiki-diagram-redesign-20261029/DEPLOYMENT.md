# 도식 교정의 공개 확인

2026-10-29. 기능 커밋 `7f12018634c9aea0fb673cb5123da76ae62e7f38`을 main에 푸시했다. [Pages run40834540753](https://github.com/OU9999/stage-presentation-kit/actions/runs/40834540753)이 같은 SHA로 success이며 Pages API도 built다.

[전후 비교10장](https://ou9999.github.io/stage-presentation-kit/research/llm-wiki-diagram-redesign-20261029/) · [수정된 발표7장](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/#7).

- 발표·자료·자산·runtime·모음37파일과 비교 페이지/설명/이전·이후 PNG22파일, 총59파일이 HTTP200이며 로컬과 바이트가 같다. [HTTP 기록](./evidence/public-http.json).
- source37544465…80576의 공개40장을 열어 본문 넘침·진단·콘솔 오류·이미지 실패가 없음을 확인했다. 변경10장 PNG를 저장했고7장과 비교1440px PNG도 직접 열어 보았다. [40장 기록](./evidence/public-slides.json).
- 기본29장/28→40·13장의 동등한 상담카드·장내5링크·개요40장·발표자 양방향 이동과390px 읽기40장 전문/순서·18px 본문·contain/alt·가로 넘침0을 확인했다. [이동](./evidence/public-navigation.json) · [진행](./evidence/public-core-route-browser.json).
- 자료6개×1440/390px의 전문/순서·18px 본문·키보드 메뉴/코드 스크롤을 확인했다. 읽기 anchor18개는 헤더 아래에 보인다. [자료](./evidence/public-documents.json) · [읽기 위치](./evidence/public-reading-anchors.json).
- 전후 비교 페이지는1440/390px에서10개 비교·20개 이미지·초기 이미지 정상/가로 넘침0·JS0이다. [비교 화면](./evidence/public-comparison.json).

TaskSpace109는 계측 페이지와 팝업을 정리하고 계측 없는 공개 비교 페이지 p4만 남겨 finish를 한 번 완료했다. [종료](./evidence/browser-close.json). 이전 사용자 공간과 서버4323을 보존했고 이후 브라우저 조작은 하지 않는다.

공개 검수 기록만 후속 커밋·푸시하며 발표 파일은 기능 커밋의 바이트를 유지한다. 기록 커밋의 최종 원격/Pages와 동일59파일은 마지막에 HTTP로 확인한다. 디자인의 선호를 자동 검사 통과로 증명하지 않으며 실제 전후 화면을 함께 제공한다.
