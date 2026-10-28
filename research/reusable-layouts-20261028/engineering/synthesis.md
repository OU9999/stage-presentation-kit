# Markdown 재사용 배치 구현 인계

2026-10-28 · 엔지니어링 B 취합. [구현 계약](../design/implementation-contract.md)과 [시각 계약](../design/visual-contract.md), [작성 기록](../design/authoring-stories.md), 디자인 synthesis/manager-review 및 실제 신규 원고17장을 읽었다. 기존 두 원고16장과 이전 보고는 보존했다. 공통 로그·최종 생성·실제 브라우저·Git 전달은 root 소유다.

## 구현한 경계

A는 [parser](../../../scripts/markdown-document.cjs), [모델과 pure planner](../../../deck-model.js), 해당 검사를 맡고 B는 [renderer](../../../blocks.js), 단독 이양된 [CSS](../../../blocks.css), [작성 안내](../../../MARKDOWN-FIRST.md), renderer 통합 검사를 맡았다. 새 runtime 파일을 늘리지 않고 공유 모델의 iconPaths20개와 planner를 소비한다. 기존 legacy bentoPreset/packMosaic/iconWallSlots API를 보존한다.

| 작성 선택 | 실제 연결과 보존 |
| --- | --- |
| gallery / portraits, strip |2~6사진 실제 개수를 columns로 전달. img2:5/4:3 프레임과 외부 caption을 구분하고 원순서 focus를 유지 |
| mosaic / staggered |6사진 span2,1,1,1,1,2를 기존 packMosaic로 계획하고 CSS 위치 변수만 전달 |
| bento / balanced,seoul,recap |H2 그룹의 canonical AST를 원순서로 한 번 렌더. balanced1~12와 고정12 preset을 구분. image/value/quote/list/text/mixed는 표면 구조이며 의미 추론이 아님 |
| builtin icon-wall |원래 ul 한 개의 li와 icons 배열을 source-order binding. 원라벨/rich link는 li에만 있으며 SVG는 aria-hidden 장식 |
| allcustom icon-wall |icons 없이 모든 li가 일반 img로 시작. src/alt/title·원색·라벨/link를 보존하며 title caption도 표시 |

`renderSlide`는 기존 body/composition/quiet/warnings에 variant를 반환한다. grid/slot 위치는 모델의 pure planner에서만 얻는다. bento의 group별 tone/primary/fit/focus/icon은 원래 H2 범위를 가리킨다. 선택 icon은 장식 SVG이며 본문을 재입력하지 않는다. 값은 기존 raw 숫자 강조+중립 단위 hook이고 계산·반올림·성과 추론이 없다.

입력 schema 오류와 유효하지만 구도에 맞지 않는 선택을 구분한다. 후자는 document 전문+원고 줄 경고이며 root app의 기존 작성자 점검이 compositionWarning/sourceLine dataset을 소비한다. variant/compose 부조화, bento 자료 수/preset 불일치·H2 앞 안내/표, wall 배열 수·과다·mixed custom·목록 뒤 조건문·현재 번호 표현을 지원하지 않는 ol 등이 해당한다. ordered fallback은 원래 ol/start와 번호를 보존한다. icons를 non-wall에, group.icon을 non-bento에 쓰면 조용히 무시하지 않고 경고한다. 기존 focus1~6 schema는 유지하며 유효 배열의 실사진 수/구도 불일치는 기존 안전 contain 경고다.

읽기는 같은 DOM을 CSS로 평면화하고 사진 전체·caption·H2·목록·원문 링크·조건·순서를 복구한다. preview/presenter도 같은 계획이며 링크는 비상호작용이다. 원고 AST와 참조 owner/key는 변경하지 않는다. 출력 자산/등록 MD 링크/7 runtime 경로는 기존 builder 경로를 사용한다.

## 검증과 직접 협의

새 [통합 검사](../../../tests/reusable-layouts.test.cjs)는 새8+9장 실제 구도,2~6열 사진/focus/caption,staggered 기하,balanced5/8/12·seoul/recap12,wall5/12/22와custom3,rich links/preview/source순서·불변,ordered start·tail·수량/preset 부적합의 전문 경고를 검수한다. [기존 composition 검사](../../../tests/blocks-composition.test.cjs)의 VM에 공유 모델과 CSS style API만 연결해 기존16장/기본gallery/editorial/mosaic 회귀를 유지한다.

A와 B는 API shape를 직접 합의했다. A가 `planBento(count,{variant,primaryIndex})`/`planIconWall(count)`의 columns/rows/slots와 중앙 copy를 제공하고 B는 null을 전문 경고로 소비한다. primary 없는 -1/undefined도 합의했다. 공유 normalizeIcon으로 직접 model-valid 대소문자/공백 이름도 같은 path에 연결한다. focus 배열 범위를 새 count 유연성과 혼동해 완화하지 않고 manager 확인 뒤 기존1~6을 유지했다. 실제 소스 상호검토와 최종 실행 결과는 아래 최종 인수에 기록한다.

## 실제 작성 부담과 남은 시각 인수

새 원고는 사진8장·전시9장의 서로 다른 이야기다. 장 메타11개·compose8개·variant4개·group메타12개·선택icon8개·builtin배열12항목·custom3개를 구분한다. 겹치는 필드 수를 클릭 수로 합산하거나 compose8회만으로 전체 작성 부담을 축소하지 않는다. builtin 목록을 옮기면 배열도 같이 옮겨야 하고 custom은 이미지/라벨을 같은 li에서 함께 이동한다. 사용자 시간/오류 비용을 측정하지 않았다.

본 검증은 Node/VM의 의미·계약·기하 검증이다. CSS 존재나 planner coverage, fallback 내용 보존을 미감·독해 합격으로 확대하지 않는다. root의 최종 생성/실제19입력 fixture와 브라우저,2:5/4:3 실측·얼굴 crop·C자료 면적·wall 희소/밀집 균형·Stage/Paper 대비·390px read·overview/presenter·실제 원고 수정·기존 legacy/native 회귀와 디자인 독립 후검수가 남는다. B는 default build/공유 browser·서버·원고·기존 연구·runtime 사본·최종 출력·Git를 조작하지 않았다.

## 최종 정적 인수

B가 실행한 명령은 `node --test tests/reusable-layouts.test.cjs tests/reusable-layout-planners.test.cjs tests/blocks-composition.test.cjs tests/blocks-runtime.test.cjs tests/markdown-document.test.cjs tests/deck-model.test.cjs`이며 **95/95 통과**했다. 신규 renderer9·기존 composition12·runtime4와 A의 parser20·model44·신규 planner6이다. 전체 suite를 별도로 반복한 수치가 아니다. B 코드 문법 검사와 소유 파일 공백 검사를 통과했다. 가이드와 이 문서의 실제 Markdown 로컬 링크15개 누락0을 대조했다.

매니저는 별도 [독립 VM 검사](evidence/manager-check.cjs)를 실행했고 B도 `/tmp/stage-reusable-layouts-manager-check.json`을 읽어25입력/54장·bento36+wall22 pure plan·기존 planner6비교를 확인했다. 두 담당의 테스트와 구분하며 브라우저/비율/미감 검증으로 확대하지 않는다.

B의 두 코드 freeze는 다음과 같다. root의 실제 QA 결함 요청이 오기 전 코드 편집을 중지했다.

- blocks.js SHA256 `6238a42a3298944a6d023cb81b3f73af9c6d3e038b1c8437c08b1fd307b5de32`
- blocks.css SHA256 `73f3bcb69ed39f76cfb9670ba86891947d4d28c3eb11a6e25eac5826431bbde2`

CSS는 디자인팀의 최종 이양본 `ea5ca9a9…`을 인수하고 custom 원title caption의 작은 scoped rule만 보강했다. Stage/Paper reverse면 아이콘, read 평면 복원과 원래 의미색 규칙을 유지했다. 신규 원고·자체 SVG는 디자인 writer 소유이며 B가 수정하지 않았다.

A는 B의 blocks.js와 통합9검사를 전체 읽고 custom/linked image·rich link/caption·source순서·fallback/slot 결속을 확인했다. ordered wall의 전문 fallback은 기존 번호를 숨기지 않는 이번 지원 경계로 상호 수용했다. B는 A의 parser/model과 새 pure planner6검사를 전체 읽고 원줄/H2 범위·unknown/unsafe 입력·focus1~6·새 count의 fallback 경계·기존 기하/path 불변에 필수 정정이 없음을 직접 회신했다. 직접 model-valid icon 이름의 공백/대문자 반례를 B의 normalizeIcon 소비로 보강하고 통합 검사에 넣었다. 두 담당은 실제 소스 상호검수를 마쳤으며 A의 writer 종료를 수신했다. 매니저회의나 실제 디자인 후검수를 수행했다고 주장하지 않는다.

B의 정확한 편집 범위는 blocks.js, blocks.css, MARKDOWN-FIRST.md, tests/blocks-composition.test.cjs, 신규 tests/reusable-layouts.test.cjs, 이 engineering/synthesis.md의6개다. B는 여기서 문서/검사까지 편집을 종료하고, 이후 root QA와 종합 갱신의 소유권을 매니저에게 인계한다. 새 결함에 대한 소유권 확인 전 제품 편집을 재개하지 않는다.

후속 정량 대비 QA에서 Stage wall22 yellow stroke의 plate 대비2.7975를 root가 확인했다. root의 좁은 교정 지시에 따라 매니저가 B 종료 소유권을 인수해 `.md-wall-icon`의 기존 palette color-mix 비율만70→65%로 바꿨다. 현재 CSS SHA는 `b513e16205a1f900a16d0dcbc4ae44000d3e561428f0264b500138ba1463f5a9`이며 나머지 소스 freeze는 같다. 이 차이 외 CSS가 이전 freeze와 바이트 동일함을 역치환 SHA로 확인했다. 실제 대비/PNG 재검수는 root 결과로 구분한다.
