# Native visual 런타임 구현 인계

2026-10-24 · `/root/engineering_manager/runtime_engineer` · 공통 코드 편집 종료

`layout: "visual"`의 8종(`line/bars/composition/funnel/flow/matrix/timeline/heatmap`)을 `app.js`·`deck-model.js`와 새 `visual.js/css`로 연결했다. 디자인의 DOM/SVG 시안을 제품 테마와 작성 계약에 맞췄으며 image/media-frame·불투명 SVG 배경을 통하지 않는다. 프레임워크·CDN·패키지·새 생성 단계가 없다.

## 연결 계약

- 로드: `styles.css` → `visual.css`, `content.js` → `deck-model.js` → `visual.js` → `app.js`.
- 기존 전역 `STAGE_MODEL`에 `validateVisual(v,path?,slideIndex?)`와 `visualSeries(v)`를 추가했다. 모델과 렌더러가 비율/계열 계산을 공유한다.
- `StageVisual.render(v)` → `{plot,hero,table}`. `renderTable(v,{caption?})` → 실제 HTML 표 wrapper. `tableNode(table,{caption?})`는 이미 렌더한 동일 표를 조립한다. `renderDataPage(deck,container)`는 각 visual 장의 표를 같은 content에서 조립한다.
- 양의 비율 분모, 유한 수치/계산 결과, 대응 길이, 실제 참조, 의미별 음수만 진단한다. `%`라는 단위로 상한을 추정하지 않는다. 문자열 ID 또는 숫자 배열 인덱스로 flow를 연결한다. 연결이 없어도 모든 노드는 표에 남는다.
- 단일 focus의 hero는 마지막 계열의 선택 수치에서 도출한다. matrix 복수 focus는 라벨만 강조하며 합계는 추정하지 않는다. ratio 표에 계산 결과와 원래 분자·분모를 같이 남긴다.
- 브라우저의 ‘내용 편집’에서 현재 visual의 JSON 편집 버튼을 표시한다. 오류가 있는 적용은 원본을 바꾸지 않으며 유효한 적용만 그림·hero·읽기 표를 함께 갱신한다. 취소/닫기/Esc는 draft를 버리고 편집 모드는 유지한다. dialog의 textarea에도 Tab 순환을 적용한다.

## 화면과 기존 기능

wide/split 그리드에 기존 native 제목·설명 편집 필드와 plot·hero를 배치했다. 모든 색은 slide 역할/tone과 테마별 팔레트를 따른다. 흐름 라벨은 발표 논리 크기에서 36px, 2단계는 52px이다. matrix는 직접 라벨을 우선하고 겹친 좌표의 위치를 바꾸지 않는다.

읽기 모드에 같은 입력의 펼쳐진 표를 제공한다. 좁은 화면의 line은 동일 데이터에서 600×400 벡터 뷰를 조립하고 220px로 표시해 넓은 SVG의 letterbox 여백을 피한다. 작은 SVG 글씨만으로 접근성을 완료 처리하지 않으며 native 요약과 16px 표를 함께 제공한다. 모바일 세부 배치의 실제 브라우저 확인은 매니저/총괄이 수행했다.

저장/내보내기/발표자/전체 보기에는 visual 객체 전체가 기존 rawDeck 경로로 보존된다. 원본 clone에서 NaN/Infinity를 null gap으로 숨기지 않으며, JSON 저장·내보내기도 유한하지 않은 숫자를 조용히 변환하지 않는다. 기존 motion/reduce 예외는 유지하고 visual 행/막대에도 같은 관객·발표·비편집·screen·no-preference 조건을 적용했다. app의 active print action은 제거했고 과거 print CSS는 손대지 않았다. PDF/인쇄를 검사하지 않았다.

## 검증과 소유권

새 [런타임 회귀](../../../tests/native-visual-runtime.test.cjs) 8개와 기존 모델·런타임·모션 139개, 합계 **147개 통과**. 독립 재사용 10장(7점 ratio/5범주/2·5flow/음수/중복좌표/null/17주/2×5/합0), 원본 불변, 필요한 필드 진단, 실제 렌더러의 plot/hero/표 변경, native 제목 경로, HTML textContent, 실제 JSON 적용의 원자성을 검증한다. JS 3개 syntax와 `git diff --check` 통과. 브라우저를 직접 조작하지 않았다.

작성 담당 `/root/engineering_manager/authoring_engineer`와 파일 경계·전역/API·로드 순서·동적 편집 UI·표페이지를 직접 합의했고, 그 담당이 새 예제/스타터/HTML/문서·옛 전용 경로 정리·단독 최종 생성/전체 회귀를 수행한다. 별도 `data.html`은 디스크의 content.js를 읽으므로 브라우저 편집을 공유하려면 내용 내보내기로 파일을 교체해야 한다는 한계도 전달했다.

공통 인계 파일: `app.js`, `styles.css`(불변), `deck-model.js`, `visual.js`, `visual.css`, `tests/native-visual-runtime.test.cjs`. WORK_LOG·Git·제품 원고·최종 PNG·비교 페이지는 수정하지 않았다. 공통 코드 잠금 후 변경이 필요하면 매니저의 재배정을 받는다.

## 현재 자료 표 링크 보완

상단 ‘표’ 링크의 `data-action="current-data"`를 app에서 처리한다. 별도 원본 페이지로 이동하는 기본 링크 동작을 막고 읽기 모드에서 현재 장의 펼쳐진 데이터 표로 이동·키보드 초점을 옮긴다. 현재 장에 표가 없으면 첫 실제 visual 표를 선택한다. 브라우저에서 JSON으로 편집한 현재 deck의 표를 그대로 사용하며 디스크 원본을 다시 읽거나 저장 동기화 계층을 추가하지 않는다. 독립 data.html은 원본 파일의 표 페이지로 유지한다.

이 경계의 실제 함수 회귀를 추가해 native runtime **9개 통과**, app syntax·공백 검사를 확인했다. 기존 139개는 앞선 통합에서 통과한 기록이며 이번 작은 링크 보완에서 다시 확대 실행하지 않았다. app 최종 SHA12는 `f1b06d5449b1`, visual.css는 `a135350a6268`로 유지한다. 작성 담당에게 HTML hook·최종 해시를 직접 인계하고 재편집 종료했다.

## 표·수평 도표의 키보드 스크롤 보완

focus된 `.visual-table-scroll`과 실제 focusable `.visual-plot[tabindex='0']`에서는 방향키·Home/End·Page Up/Down·Space를 브라우저 기본 스크롤에 넘긴다. 모든 visual 영역을 가로막지 않으며 일반 stage의 이전/다음 단축키는 유지한다. heatmap의 실제 관객 plot에만 `tabindex=0`·region 설명을 추가하고 overview/presenter 복제의 초점 대상은 늘리지 않는다.

현재 표 링크 보완과 함께 app에 반영했고, 실제 keydown handler 회귀로 native 기본 동작을 prevent하지 않으면서 일반 stage에서는 계속 이동함을 확인했다. native 회귀 **10개 통과**, app syntax·공백 검사 통과. app 최신 SHA12 `7e774f101b16`을 작성 담당에게 인계했다. 앞 절의 해시는 순차 검수 이력이며 최종 참조는 이 값이다. 공통 편집 재종료했고 실제 390px 스크롤 확인은 매니저가 맡는다.
