# main-03 native 해설의 실제 반례 교정

최신 사용자 기준·WORK_LOG·DESIGN을 유지합니다. 독립 검수 전원 writer가 종료했습니다. main-03의 발표40은 추가 구조 반려가 없었으나 읽기는 실제 native 화면에서 다시 반려됐습니다. 정본은 `review/main-03/reading-native-findings.md`, `reading-verdict.json`, `integration.md`이며 이전 수동 원문·PNG·source-snapshot104입력은 보존합니다.

이번 제품 교정은 작고 명확합니다. 본편 구조·20장/지원6개와 typography 하한을 불필요하게 다시 바꾸지 않습니다.

- **A: native 공용 타이포.** `templates/materials.css`의 실제 한국어 독서에서 어절을 보존합니다.390의 `technical/direct-support-03-390.png`는 `다음 스터 / 디의…`,08은 `아닙니 / 다.`로 갈립니다. 현재 `.material-content`의 `word-break:normal`을 검토하고 본문/인용/강조가 단어 중간에서 갈라지지 않도록 최소 교정합니다. 긴 URL·파일 경로·코드/표의 합법적 내부 스크롤은 보존합니다. 글자 크기를 낮추거나 인용·조건을 삭제하지 않습니다. CSS 선언만으로 성공을 주장하지 않고 다음 actual native glyph/화면으로 다시 봅니다. A의 새 소유는 해당 공용 CSS이며 기존 발표/공용 지원 입력은 변경 필요가 입증되지 않으면 유지합니다.
- **B: 정확 native 구문과 독립 통합.** `talks/llm-wiki/materials/keynote-notes.md`의 `**“15분이니까 ‘읽기부터’?”**는`가 생성 HTML과 실제390 화면에서 literal 별표로 노출됩니다. CommonMark의 강조 경계를 고려해 이 한 구절을 올바르게 조판합니다. 질문/원문/해석 지위·뜻/anchor는 유지하고 공통 parser를 임의 변형하지 않습니다. 현재 관련 절의 렌더 HTML을 직접 확인해 다른 의도치 않은 구문 노출이 없는지도 검토합니다. 원본/archive/코드에 의도적으로 남긴 Markdown 예시는 손대지 않습니다. 새 native CSS와 notes의 필수 구절·현재 계약/26coverage가 맞는지 독립 대조하고 필요한 검사/인계를 맡습니다. 한 줄 수정과 같은 문자열 존재 테스트를 새로 늘릴 필요는 없습니다.

A/B는 역할을 직접 교차 검토하고 product stablehold를 먼저 통보합니다. root가 build/새main-04 네 scope·자료별12클릭/두native표양끝/요청전문선택을 실제 수집합니다. 기존 main-03 읽기를 소급 승인하지 않습니다. source/범위가 바뀌면 현재 입력 hash로 다시 검증하며 시각 승인은 명시 require-approved만 보고합니다.

root는 현재 local preview 서버의 병렬 자원 실패도 별도 교정했습니다. status0/전송0으로 마지막SVG가HTTP도착전에 실패한 관측이 있으며, root 소유 Python 서버의 backlog5를128로 늘려 같은127.0.0.1:4336에서 재검증합니다. 원인이 확정됐다고 단정하지 않고 실제 다음 실행의 자원/화면 결과로 판단합니다. 이 환경 변경을 제품 가독성 반려나 동작 통과의 면책으로 쓰지 않습니다. 브라우저/생성물/WORK_LOG/DESIGN/Git은 root만 씁니다.
