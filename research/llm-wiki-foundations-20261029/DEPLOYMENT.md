# LLM Wiki 본질·사례 재구성 공개 인수

2026-10-29. 기능 커밋 `a19000169a0482b6593c8cb72e9f626b64642bc0`을 `main`에 커밋·푸시했다. GitHub Pages run [40830719486](https://github.com/OU9999/stage-presentation-kit/actions/runs/40830719486)은 같은 SHA로 success이며 Pages API도 built를 반환했다.

공개 주소: [40장 발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/) · [학습 자료](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/).

## 공개 확인

- 발표·자료·자산·공통 runtime·모음의 실제37파일 모두 HTTP200이며 로컬 파일과 바이트가 같다. [HTTP 기록](./evidence/public-http.json).
- 원고 revision `bec9b35fc7b711651ef55d354ede5b760a2d710650bb2fd7128c83f8657cab7f`의40장을 공개 URL에서 실제 열어 촬영했다. 본문 넘침·진단·콘솔 오류·이미지 실패가 없다. [40장 기록](./evidence/public-slides.json).
- 기본29장 실제 이동과28→40,13장 두 상담의 동일한 색·크기·면적, 장내5링크·개요40장·발표자 양방향 이동을 다시 확인했다. [경로](./evidence/public-core-route-browser.json) · [이동·모바일](./evidence/public-navigation.json).
- 모바일390px 읽기40장 전문/순서·18px 본문·이미지contain/alt·가로 넘침 없음을 확인했다. 읽기 anchor18개는 제목이 헤더 아래에 보인다. [anchor 기록](./evidence/public-reading-anchors.json).
- 자료6개×1440/390px의 원문 전문과 순서·18px 본문·코드/메뉴 키보드 조작을 확인했다. 자료 페이지의 JavaScript는0개다. [자료 기록](./evidence/public-documents.json).
- 사례TXT3은 학습서의 실제 링크를 클릭해 브라우저에서 열었고 UTF-8전문이 원본 바이트와 일치한다. 로컬 octet-stream 다운로드와 공개 text/plain 읽기라는 서버 동작 차이를 구분했다. [첨부 기록](./evidence/public-case-links.json).

초기 전체 PNG는29장이 비트 단위로 같고11장은 작은 문자 래스터 차이가 있었다. 같은 viewport/포인터에서 font readiness와 두 paint frame을 기다려11쌍을 재촬영하자 전부 PNG가 같았으며 문단의 글꼴/색/좌표/크기도 일치했다. 최초 캡처는 보존하고 재검수만 [별도 기록](./evidence/public-pixel-comparison.json)에 남겼다. 제품 수정 없이 촬영 시점을 안정시킨 결과다.

## 종료와 전달

TaskSpace108에서 계측 페이지·팝업을 정리하고 계측 없는 공개4장 결과 페이지 p4만 남겨 `finish`를 정확히 한 번 완료했다. [종료 기록](./evidence/browser-close.json). 기존 사용자 공간과 서버4323은 보존했다. 두 팀의 manager와 모든 실무 writer는 종료 상태다. 이후 브라우저 조작은 하지 않는다.

발표 파일은 기능 커밋의 공개 검수 바이트를 유지한다. 이 공개 검수 기록과 WORK_LOG만 후속 커밋·푸시하고 최종 원격 tip/Pages/동일 제품 HTTP를 확인한다. 실제 사람의 Zoom 낭독·참여 반응이나 새 LLM 실행 성과는 측정한 항목으로 보고하지 않는다.
