# LLM Wiki 실제 교정 · 엔지니어링 인계

담당/취합: `/root/engineering_audit_manager/qa_workflow_integrator`, 2026-11-13. 시작 HEAD `fca44a239eec36fcd3a96fd4997adc6b03d020cd`. 사용자의 새 구현·테스트·독립 검수/반려 시 반복 지시에 따라 직전 감사의 제품 수정 금지는 이번 구현에 한해 대체되었다. 직전 [감사 정본](../../llm-wiki-design-audit-20261113/RESULT.md), 양 팀 인계와 [엔지니어링 명세](../../llm-wiki-design-audit-20261113/engineering/ENGINEERING_SYNTHESIS.md)를 읽고 시행했다. 기존 감사·승인·before 근거는 수정하지 않았다.

## 실제 소유와 변경

- A `/root/engineering_audit_manager/input_renderer_auditor`: 새 `talks/llm-wiki/assets/design/{knowledge-layers,raw-wiki-rules,ingest-map}.svg`와 자산 인계. 원본19도식·기존 typography9·archive/demo·사용자 메모는 보존한다.
- B: 원고·필요 읽기 자료/대본/안내, DESIGN/MARKDOWN-FIRST/DESIGN-REVIEW/생성 프로젝트 README/저장소 README, 새 현재 역할 JSON·회귀 CLI·새 의미 계약 테스트와 이 취합 인계.
- 매니저: 두 실무의 직접 반론과 결과 대조·완료 인수. root: 단일 WORK_LOG·모든 build 생성물·실제 브라우저/관측·Git·최종 통합. 추가 팀·브라우저는 생성하지 않았다.

모델은 동일한 `gpt-6.1-sol`/high/fork none을 재개했다. 복잡한 원고 소속·회귀 계약/반례·통합 판단이 필요하며 root가 새로 확인한 [07:48:39Z 스냅샷](../model-snapshot.json)을 공유받았다. 제품 CSS/runtime 확장은 이번 구현에 사용하지 않았다.

| 장 | 실제 변경과 보존 | 입력 경로 |
| --- | --- | --- |
| 3 | 정확한 목적 구절과 현재 이해·다음 질문을 주역으로 둔 새 그림. 세 메모·다섯 무방향 관계·원래 요구와 재사용 설명을 보존하고 중복 하단 문장을 그림 안에 귀속 | 새 design SVG + 기존 실제 관계읽기 링크. 이전 typography/원본 SVG는 별도 접근 유지 |
| 5 | raw 목적/선택 이유와 wiki 개념 구절 대조, 보존/갱신/양영역 rules 약속. 세 파일과 요지/이유/질문·wiki 범주·네 약속·예시 지위 보존 | 새 design SVG. 마크다운 정의는 SVG 밖 body 직속 native 본문32px로 유지 |
| 10 | 요약을 원자료 입구로, 기존 개념/비교·현재 계획과 문서/목차/링크 갱신을 주역으로 묶음. 작업 화살표와 세 무방향 관계 분리 | 새 design SVG. 하단 순서 문장과 중복하던 필수 의미는 그림 안에 귀속. 의무 생성 순서·자동 갱신을 추가하지 않음 |
| 12 | 앞 관계를 질문 사용 순서로 넘기는 요약/전환. 기존 세 문서 이름과 관계를 실제 표로 보여 줌. 개념별 분리·목차/원자료 탐색·새 자료 보완 본문 보존 | `compose: document`,32px 본문/표. 실제 관계읽기 anchor는 탐색 의미를 지닌 본문 안에 둠. 가상 `.md` 문서 링크를 만들지 않음 |
| 15 | 두 판단을 한 H2 아래 두 H3로, 조건 뒤 실행을 별도 H2로 분리. 원문 판단문·자료 두 개 실행·세 의도 개행 유지 | 기존 centered editorial. 실행 그룹만 green 의미색 선택. 전체 neutral 제거나 blue 복원 없음 |

12 제목/설명과 현재 자산 링크를 `materials/diagram-reading.md`, `materials/speaker-script.md`, `assets/speaker-guide.txt`, 발표 README에 동기화했다. 나머지 장은 기존 역할을 보존했다. 6 책임 두 열·7/23 표·8/9 같은 메모와 질문·14 조건→수정·16 선택 이유·17/18 질문/책임·19/21/22 동등 범주·20 가상15분/비실측·24 요청/탐색 위계의 보존은 새 시각 면책이 아니며 전26장 흐름에서 독립 재검토한다.

## 지침과 재사용 작성 진입

DESIGN의 현재 판 검수 한곳에 역할·주역·정확 자료/예시 지위·보존·모음 준거·지원 경로·검토자 brief와 실제 크기 대안 선택 문장을 추가했다. MARKDOWN-FIRST는 그 절을 착수 경로로 연결하고,2H2/2H3·공통 prelude·외부 SVG 내부 고정 배치의 작은 예를 제공한다. DESIGN-REVIEW에는 실제 본 주역/관계와 줄어든 오독을 적는 기존 `reason` 작성 예를 넣었다. 새 schema나 미감 자동 승인 기능은 추가하지 않았다.

생성 프로젝트 README는 설치 패키지에 포함되는 DESIGN/MARKDOWN-FIRST/DESIGN-REVIEW의 정본 절을 직접 연결한다. 레시피는 별도 사진·연구 자산 없이 지원 문법으로 파싱·조판 가능함을 테스트했다. 새 CLI·스타터 장수 확대·사진 연구 전체 패키징·실패 장수/시안 수/색·양식 비율 할당은 추가하지 않았다.

## 현재 계약과 동결된 두 baseline

| 계약/근거 | 지위와 유지 방법 |
| --- | --- |
| 11월2일 역사 타이포 실패 | 동결 `research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json`과 원문/관측을 그대로 사용. CLI `--mode baseline`은 이 계약의 이전 실패를 재현한다. 기존 R4 geometry3노드/3쌍 조건은 변경하지 않았다. |
| 이번 디자인 교정 전 | 동결 [83항 기술 pass](../../llm-wiki-design-audit-20261113/evidence/qa-1920.json)와 [3·5·10·12·15의 needs-changes](../../llm-wiki-design-audit-20261113/design-needs-changes.review.json), [시작 입력](../before/starting-state.json)을 구별한다. 새 테스트는 당시 원고+관측+이전 역할로83/0/0을 재현하고5개의 시각 반려가 공존함을 확인한다. |
| 새 현재 표현 | `talks/llm-wiki/qa/current-roles.json`.3/5/10 경로·현재 필수 라벨과 출처 분류,12 문서명/필수 본문,15 H3/판단/실행·의도 개행·DOM 소속/측정 시작선을 명시한다. 이전 표현 경로와 맞지 않는다고 새 내용을 포기하거나 관측을 삭제하지 않았다. |

새 현재 계약은 모든 필수 SVG의 contain 반영 최소32논리px를 유지하고,3/5의 예시 표지도 필수 관측으로 포함한다.3에는 별도 **정확히5노드/5무방향 쌍**의 연속 접속·가시성·방향 marker·프레임 계약을 추가했다.9/10의 기존 엄격3노드/3쌍 기하·라벨 교차 검사를 느슨하게 바꾸지 않았다. 새로운3의 관계 목록 검사는 미감·선과 모든 글자 간의 일반 판정기가 아니다.

15는 H3 질문38논리px·필수 본문32 이상, 세 authored break의 앞뒤 실제 glyph y, 원문/강조 순서, 두 판단/실행의 실제 parentGroup, 두 그룹의 측정 시작선과 각 첫 본문이 자기 그룹 안에 남는지를 요구한다. H3가 있는 판단 그룹과 없는 실행 그룹의 첫 본문 y를 억지로 같게 요구하지 않는다.6의 기존 공통 안내·동등 본문 시작선 계약은 유지했다.5 마크다운 정의도 body 직속 소속과32px를 별도로 요구한다.

`current` CLI는 현재 역할 JSON의 실제 SHA를 `currentInputs`에 추가하여 root manifest와 대조하며, 결과의 `contract.path/sha256`에 사용 기준을 남긴다. root 최종 캡처도 같은 키를 snapshot에 포함해야 한다. 현재 관측이 없거나 계약 해시가 다르면 pass로 처리하지 않는다. `visualApproval:false`는 성공에도 유지한다.

## 실제 반례에 따른 교정과 검증

첫 round-01의12는 실제 분량 경고로 전체 캡처가 중단되었다. 필수 글자를 줄이는 대신 독립 탐색 행의 실제 링크를 navigation 본문에 귀속하고 navigation/update를 별도 P로 나눴다. 이는 한 P 안의 중간 꼬리행을 마지막 행 검사로 놓칠 수 있다는 매니저 반론도 함께 해결한다. [첫 실패 원고](../round-01/source/talks/llm-wiki/slides.md)는 한 번의 정확한 역패치 뒤 실제 prototype revision `b5e8c02ef2aa462de61372e32819ab57cfedcbfcfdcd064fb52a17c6d4f7aba3`와 전체 SHA 일치를 확인하여 복원했다. untouched 원본 복사로 부르지 않으며 방법은 [source-recovery.json](../round-01/source-recovery.json)에 남겼다. 당시 DESIGN/QA CLI는 hold 중 직접 복사했다.

A의 초기 geometry는 상자 양쪽 접점이 한 노드의 다른 좌표가 되는 문제가 있었다. 매니저/B가 단일 circle anchor와 정확한 endpoint를 요구했고, A가3/10 관계를 line/polyline으로 분리해 고쳤다. 작업 화살표는 `data-work-id`, 무방향 관계만 `data-relation-id`로 관측한다.5의 첫 필수 크기와10의 선/입구 라벨 문제는 root 실제 측정을 받아 A가 재조판했고, B가 그 이후의16/21/16개 현재 라벨·출처 분류를 인수했다.

기술 실행: 관련 QA/검수 테스트58개 통과 후 `npm test` 전체331개 pass/0 fail, exit0. 새7개는 원문 역할·실제 링크/가상 파일 구별·원고/DOM 그룹·의도 개행·관측 누락/잘못된 소속·5쌍 관계 손실/끊김/숨김/방향·과거83pass/needs5·정확 발췌/보존 SVG·설치 안내 레시피를 검사한다. 성공 수를 미감의 근거로 사용하지 않는다. build/verify 생성물과 실제 브라우저는 root의 수행 범위다.

root가 현재 입력을 새로 수집한 [round-02/1280 관측 회귀](../round-02/qa-1280.json)와 [1920 관측 회귀](../round-02/qa-1920.json)는 각각119 checks/0 invalid/0 regressions이며 모두 `visualApproval:false`다. 두 결과의 현재 계약 SHA는 `295b1f85089bdfef888110a72dfea0b47c9dd87324dbfb22bd5f157b706ca530`이다. B가 JSON과1280의5·12·15 원본 PNG를 직접 대조했다.3/5/10 필수 텍스트의 실제 contain 최소는 각각34.351/34.704/36.069논리px다. 이를 viewport의 표시px로 혼동하지 않으며 이 값은 시각 충분성의 판정이 아니다.

B는 역사 CLI도 명시 `baseline`으로 직접 실행해 [72검사 중45회귀/invalid0](historical-baseline.json), 예상 exit1을 재현했다. 기준은 그대로인 역사 fixture SHA `94e5ccdd91ebda96b1bcfb8e5de7ed1724dd51654067e4d468a43d5df06da003`이다. 이번 교정 전83pass/5needs와 새119pass를 이 실패 baseline과 구별한다.

현재5의 **미감 우려는 남아 있다.** B가 직접 본1280에서는 raw의 파일명·부분 발췌·요지 행과 바로 아래 rules의 위계가 조밀하다. A도1280/1920의3·5·10과 metrics를 직접 보고 동의했다. A의 bbox 대조상 요지 행의 bottom519.5와 rules header의 top522.5 사이가3SVGpx이며 구분선 y526이 header bbox와 겹친다. 이를 실제 glyph ink 관통으로 단정하지 않지만 충분한 공간·위계를 판단할 독립 시각 근거다.3의 하단 메모명→예시 표지→결과 문장의 위계도 별도로 검토한다. 기술119pass 때문에 이 문제를 면책하거나 승인으로 바꾸지 않는다.

## 다음 인수와 종료 조건

현재 제품/정본/CLI/역할 JSON은 round-02 관측 상태로 hold한다. root의 발표/영향 읽기 수집과 관측 결과를 디자인팀에 인계해 실무 writer 종료 뒤 독립적으로 실제 크기를 판정한다. 기술 pass만으로 끝내지 않으며 시각 `needs-changes`가 나오면 해당 소유자를 재개해 다음 입력·관측으로 반복한다. 명시 scope의 `--require-approved` 성공 전에는 본편 승인으로 보고하지 않는다.

실제 프로젝터/발표 거리·다른OS/글꼴·실35분 낭독·청중 이해 효과는 여전히 미확인이다. root의 읽기 화면/클릭·독립 디자인 판정은 각 수행 주체의 별도 인수 결과를 따른다. 이 문서의 작성은 제품 시각 승인이 아니다. A와 최종 인터페이스/미감 우려를 직접 교환했고 기술 불일치는 없다. B의 제품/문서/CLI/JSON/테스트와 이 취합 writer는 작성 종료하며 추가 교정이 필요하면 같은 소유자로 재개한다. 커밋·푸시·배포는 수행하지 않았다.
