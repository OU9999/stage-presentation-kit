# 표현·작성·읽기 아키텍처 전면 감사

2026-10-28 · `/root/engineering_manager/migration_designer` · 기준 `cdb88b421d5a2fc018fe0269713e1ba16d4d8b20`

## 판정

**후속조치가 필요하며, 우선 대상은 일반 Markdown 기본 조판과 그 결과를 인수하는 기준이다.** parser의 의미 보존·기존 CSS·20양식의 생존은 기본 작성 경로가 같은 STAGE 미감을 제공한다는 증거가 아니었다. 반대로 기존 전체를 교체하거나 새 parser/프레임워크를 늘려야 한다는 근거도 없다. 같은 내용 통제비교는 현재 renderer/지원 metadata 경로에 따른 실제 표현 차이를 확인하며, 특정 CSS 한 속성의 효과나 미래 복원안의 성공을 증명하지 않는다.

앞선 보고의 view API는 선택 표현을 연결할 후보로 남지만 **API·엄격 문법을 먼저 정하고 이를 복원 완료로 삼는 순서는 수정해야 한다.** 무선택 원고에서 제목·설명·인용·매체의 상대 위계와 공간을 먼저 검수하고, 그 결과에 꼭 필요한 작은 선택만 추가한다. profile 추가 의무나1~2힌트면 충분하다는 보장은 현재 근거로 유지할 수 없다.

## 실제 확인 범위

- 새 [디자인4문서](../design/synthesis.md)를 읽고 inventory와 각 source content를 직접 대조했다. [inventory](../evidence/inventory.json)는 **11덱90장·legacy20양식+blocks=21종·native8종**이다. 각11파일의 장수/layout 배열이 집계와 일치했다. 이는90장 디자인 전수합격이 아니다.
- [screens](../evidence/screens.json)의51결과는 모두1440×1000·ready였고 기록된 runtime 오류/geometry 후보는 각각0이다. 오류가 없다는 사실은 독해·장간 리듬·미감 합격과 다르다. 나머지 표본을 추가 수집하더라도 이51근거를 덮어쓰지 않는다.
- [kit16장](../evidence/contact-kit.png)·[native8장](../evidence/contact-native.png)·[C/타이포15장](../evidence/contact-sequences.png)·[새12장](../evidence/contact-markdown.png)·[통제4장](../evidence/contact-controlled.png) contact를 직접 열었다. 원본 개별 열람은 [C04](../evidence/devday-compositions-04.png), [kit11 mosaic](../evidence/kit-11.png), [native bars02](../evidence/visual-story-02.png), [heatmap10](../evidence/visual-story-10.png) 네 장이다.51원본 모두를 개별 열람했다고 보고하지 않는다.
- [controlled generator](../evidence/controlled/generate.cjs)를 읽고 네 원고·생성 content SHA·[fixtures](../evidence/controlled/fixtures.json)·[실측](../evidence/controlled/observations.json)을 검수했다. generator를 재실행하거나 root evidence를 수정하지 않았다. 이전12hint probe·전체210검사를 반복하지 않았다.
- team-learning05 제목 잘림 후보는 [Range 실측](../evidence/title-candidate-check.json)에서 재현되지 않았으므로 확정 결함에서 제외한다. 일반 glyph/clip 검사 보강의 필요와 이 특정 사례 결함 판정을 구분한다.

## 동일 내용 통제비교의 확인과 한계

네 source의 metadata 부분을 제외한 body가 fixtures에 기록된 원문과 정확히 일치하고, 각 body/content SHA도 실제 파일과 일치했다. 두 message의 body SHA는 `6c472045076f…`, image는 `63191db1b6bc…`이며 root 관찰의 렌더 본문도 쌍별 같다. image는 같은 URL·alt·1280×960 원자산을 사용한다.

| 통제 쌍 | 현재 결과 | 해석 가능한 것 / 아닌 것 |
| --- | --- | --- |
| message: 같은 H1+같은 설명 | 명시 statement/center/quiet는126px 선언, 일반 blocks는70px 제목·설명과 footer | 주제 차이 없이 현재 두 경로의 공간/위계 차이 확인. 모든 제목126px가 정답이거나 default가 자동 statement여야 한다는 증거 아님 |
| image: 같은 H1+같은 이미지+같은 caption 문단 | 명시 image/contain/quiet의 img 요소는약1187×505px, blocks는약257×193px | 같은 자산도 경로에 따라 크게/작게 제공됨. contain 요소박스는 실제 그림 paint 폭/면적과 달라 배율로 쓰지 않음 |

통제 변수는 **renderer와 현재 지원 metadata의 경로 묶음**이다. 명시 quiet에 따른 footer 차이도 포함된다. 원고를 다시 작성한 새 시안도, CSS 한 숫자의 실험도 아니다. contain의 여백은 잘림 없는 자료 보존과 함께 평가하며, 실제 UI 내부의 어느 정보를 읽어야 하는지는 별도 독해 조건이다. 작은 삽화를 키웠다고 증거 타당성이 생기거나 native가 항상 우월하다고 결론내리지 않는다.

## 전체 표현 모델과 현재 작성 경로

| 층·범위 | 현재 재사용 가능 | 현재 한계·후속 우선순위 |
| --- | --- | --- |
| 일반 MD 의미층 | [parser](../../../scripts/markdown-document.cjs#L98)는 heading/inline·list/image/table/code/quote·전체 source line을 유지. 최초 의미 H1만 한번 소비 | 내용을 다시 입력하지 않고 형태·길이·비율에 맞게 조판할 재료가 이미 있음. 기본 품질 개선에 새 제어문법이 반드시 먼저 필요한 것은 아님 |
| 기본 표현 | [app blocks](../../../app.js#L427)와 [blocks CSS](../../../blocks.css#L2)는 heading+한 본문 흐름·발표70px/30px·이미지230px 상한, read는 native 문서 흐름 | 무선택 조판의 제목/자료/설명 공간·H1+quote 균형·마무리의 위계를 먼저 시안 검수. 모든 장 중앙/큰 제목으로 바꾸지 않음 |
| legacy20양식 | 큰 cover/statement/section/closing, quote, image/media/demo/gallery/mosaic/results, compare/chart/metric/metric-pair, steps/categories/bento/icon-wall, native visual | [명시 stage 어댑터](../../../scripts/markdown-document.cjs#L82)는 현재 사용 가능. 단순 선언/image는 통제 사례처럼 선택 가능하지만 혼합 일반 표/code/목록을 같은 AST로 view만 바꾸는 계약은 아님. 전 원고의 의무 경로로 만들지 않음 |
| native8종 | [visual](../../../visual.js#L36)의 bars/funnel/line/composition/flow/matrix/timeline/heatmap. 단일 자료에서 plot·hero·표 생성 | 검증/수치 관계·열린 면적 재사용. 저자가 명시한 [분자/분모 n/d×100](../../../deck-model.js#L138)과 [원분자/분모 표 보존](../../../visual.js#L361)도 기존 계산 계약이다. 작은 축/범례/긴 label·단위는 독해 시안 대상이며 전면 교체 근거 없음 |
| 공통 본문 renderer | [StageBlocks](../../../blocks.js#L17)는 semantic DOM·source line·이미지 진단·표/code 국소 스크롤·preview 링크 비활성 | 같은 AST에 제한된 composition wrapper/측정·타이포 선택을 붙이는 작은 책임으로 시작 가능. source/read·overview/presenter 동등성은 별도 인수 |
| 작성/발행 | [stage builder](../../../scripts/stage.cjs#L69)는 참조 자산 복사/발행 URL과 덱별 output, [기존 MD 안내](../../../MARKDOWN-FIRST.md)는 기본 재사용을 권함 | MD 권위와 공통 스타일은 유지. URI는 canonical 원고와 출력 resolver를 구분할 후보. profile/새 태그를 배워야만 기본 미감을 얻는 구조를 필수 이행으로 고정하지 않음 |

기존 schema가 복잡하다는 이유로 그 표현 자원을 버리거나, 일반 MD가 단순하다는 이유로 모든 장을 문서 틀 하나에 고정하는 두 극단을 피한다. 이번 감사에서 새 라이브러리·모노레포·전체 runtime 재작성이 필요하다는 근거는 없다.

## 자동 조판과 의미 추론을 분리

**형태에 맞춘 자동 조판 후보:** 같은 AST의 글 길이/줄 수·블록 개수·표/code 폭·이미지 종횡비·가용 면적을 이용한 제목 폭/행간/자료 크기/간격/배치 선택이다. 원문/값/순서를 새로 쓰지 않고 과소한 이미지와 과도한 동일 위계를 개선할 수 있다. 현재 코드도 mosaic 공간 배치와 native 긴 값 fitting을 사용한다. 따라서 ‘자동 사실 추론을 하지 않는다’를 ‘모든 기본 조판을 수동 지정한다’로 확대하면 안 된다.

**자동 확정하지 않을 의미:** 표를 성과 chart로 바꾸기, 숫자를 개선율로 해석하기, 목록을 범주나 단계로 재해석하기, H1+인용에서 주역을 추측하기, 처음/마지막이라는 이유로 끝맺음 의도를 확정해 새 문구를 만들거나 링크/조건을 숨기고 의미를 바꾸는 것이다. 처음/마지막 위치를 cover/closing 성격의 조판 후보 입력으로 쓰는 것 자체는 검토 가능하다. 균형 잡힌 공간을 자동 제공하는 것과 의미를 확정하는 것은 다르다. 저자가 명시한 분자/분모 계산·선택 focus의 파생 강조는 기존 계약으로 유지하며, 금지는 선언되지 않은 성과/관계의 발명이다. 선택이 필요하면 후보/저자 통제를 검토하되 모든 장에 새 syntax를 요구하지 않는다.

단순한 길이 threshold 하나도 정답으로 확정하지 않는다. 짧은 경고/가상 안내를 작은 부속글로 자동 처리하면 의미가 바뀔 수 있다. 조판은 제목/인용/조건의 명시 의미를 보존하면서 후보를 비교해야 하며, 공간이 부족해도 원문을 무단 삭제·요약·숨기지 않는다.

## 이전 계약의 독립 반례와 수정

| 이전 기술 선호 | 실제 근거·반례 | 이번 판정 |
| --- | --- | --- |
| header/모든 문구는 발표에 가시1회 | 기존 metric-pair는 값·중립단위·대상·가상 안내로 의미를 조판. 단순 ‘대상/값/단위’ 구조어와 기간/분모/단위를 담은 rich header는 다름 | **기계적 규칙 폐기.** 정보성 조건은 실제 발표에서 보존·추적하고 구조 라벨 통합은 시안 검토. 어떤 header를 자동 숨기는 새 코드는 구현하지 않음 |
| 표시 중복0 | bars02의55%는 hero와 막대값에 실제 반복되고, [heroFor/tableFor](../../../visual.js#L40)는 같은 원본 자료를 재사용 | **입력 권위 중복과 표현 반복 분리.** 같은 단일 원본의 강조+근거는 허용. 원치 않은 heading 중복/다른 값·단위 불일치는 결함 |
| 대표도 보이는 순서 고정 | C04는 배열4번째 artifact cover가 [seoul4번째 slot](../../../deck-model.js#L28)의 큰 영역을 차지. 의미 중심과 배열 첫 항목이 다름 | **일률 규칙 수정.** 비선형 자료군의 시각 면적/위치와 DOM/read 논리 순서를 분리. 실제 chronology/절차/인과는 계속 보존 |
| mosaic은 모든 시각 순서가 원고와 같아야 함 | [packMosaic](../../../deck-model.js#L48)는 좁은 항목이 앞 빈칸을 메울 수 있고 [CONFIG](../../../CONFIG.md)는 DOM/read와 desktop 배치를 구분 | 일반 지원 계약의 반례. 매니저의 독립 /tmp API 대조에서 [1,1,1,2,1]은4번째가 row2/col1,5번째가 row1/col4를 채웠다. 이 담당이 재실행한 결과는 아니며, 현재 kit11의 [2,1,1,1,1,2]는 순서 역전 없음 |
| pair 출처1문단·2행/H2그룹만 허용 | schema는 구현을 작게 할 수 있으나 자연 원고의 복수 출처·혼합 자료를 충분히 담는다는 검증 없음 | **선호 가안으로 환원.** 관계가 명확한 binding/저자 선택은 필요하지만 문단 수/heading 수준을 유일한 내용 관계로 고정하지 않음 |
| profile1회+1~2힌트면 충분 | 두 새 원고는 모두6장·동형 기능순서이며 여러 서사/정보량/미디어역할의 작성 검증이 아님 | **충분성·의무성 폐기.** 무선택 결과부터 인수하고 필요한 선택/재입력/수동조정 수는 실제 작성에서 측정 |
| 부적합은 모두 hard error | 오타/모호 binding과 단순 공간 부족은 사실 손상 위험이 다름 | 오류 종류를 분리하고 경고+원문 fallback을 시안 검토. silent 무시·내용 손실로 성공 처리하지 않음 |

표현을 달리할 수 있다는 말은 발표의 핵심 조건을 read/aria에만 남기면 된다는 뜻이 아니다. 값·대상·단위·기간/분모·조건·가상/실측 성격·인용 귀속·링크 목적·사실인 순서는 유지한다. 저자가 명시한 짧은 발표 표현/전문 구분은 검토 가능한 별도 선택이지 이번 감사가 자동 숨김을 허가한 것은 아니다. raw source/read 전문은 유지하고 발표에서 무엇이 바뀌는지 추적 가능해야 한다.

## 최소 후속 아키텍처와 진단

**순서를 기본 시안→작은 표현 책임→필요한 선택 계약으로 바꾼다.** 현 heading+blocks를 내용 권위로 유지하고, shape/측정과 기본 조판을 결정하는 작은 구성 책임을 app/StageBlocks/blocks CSS 경계에 둔다. 렌더러가 새 내용을 발명하거나 parser를 재작성할 필요는 없다. 실제 측정/read/source 처리는 공통 helper로 공유하고 legacy/native 분기는 유지한다. 정확한 API·class·문법은 같은내용 시안 뒤 정한다.

선택적 view나 자료군이 필요하면 노드/셀/그룹 참조만 추가한다. 값을 JSON에 재입력하거나 AST를 새 원본으로 복제하지 않는다. 셀의 rich inline과 정보성 header는 원셀 참조로 보존한다. 발표용 공간 배치·반복 강조는 허용 범위를 명시하고, 읽기는 전체 원문/논리 관계를 유지한다. H2 그룹·순번 primary·새 수동 ID의 부담도 비교한 뒤 채택한다.

| 진단 종류 | 안전 정책 후보 | 종료/검증 조건 |
| --- | --- | --- |
| 잘못된 AST/위험 URL·구문·필수 local asset 누락 | 명시 error, 마지막 정상 산출물 유지 | 기존 실패 보존을 유지. 부분 결과를 정상으로 공개하지 않음 |
| 선택 정보가 여러 노드를 모호하게 가리킴·서로 충돌 | error 또는 적용 보류, 위치/수정법 표시 | 추측 binding·값/단위 재해석 금지. 원고 내용 자체는 불변 |
| 유효한 원고이나 요청 구도에 공간 부족·지원 외 shape | 보이는 warning+원문 일반 구도로 fallback하는 후보 | 누락 없는 기본 결과와 경고 인지/복구를 실제 검수. 원문 fallback도 긴 표/code가 발표에서 안 읽힐 수 있으므로 독해/릴리스 합격을 뜻하지 않음 |
| 표현 중 조건/귀속 손실 우려 | 투영 적용 보류·내용 충실 fallback/검토 요구 | read에 있다는 이유로 가시 핵심 조건 누락을 합격시키지 않음 |

현재 builder의 source 오류 보존과 새 표현 경고/fallback 구현은 다른 작업이다. 어떤 severity가 사용자에게 가장 안전한지는 실제 원고 수정·복구 시안에서 평가한다. 모든 정상 MD를 막는 엄격 실패도, 부적합을 몰래 무시하는 성공도 기본값으로 확정하지 않는다.

## 필수조치·시안·유지의 담당/순서/종료 조건

| 순서·구분 | 담당 제안 | 다음 결과물·종료 조건 |
| --- | --- | --- |
| 1 필수조치 | 디자인+runtime/작성 담당 | 기존 같은내용2쌍을 기준으로 무선택 기본의 선언·자료면적·H1+quote·마무리 시안. 문법 선확정 없이 역할/독해/사실 보존의 인수 기준 합의 |
| 2 시안 후 선택 | blocks 표현 담당+디자인 | 길이/비율/블록형태에 따른 작은 자동 조판과 필요한 저자 선택 비교. 긴 한글/표/code/혼합 자료에서 공간·조건·링크/alt·source 추적을 보존 |
| 3 필수조치 | 작성경험 담당+독립 QA | 서로 다른2서사를 실제 작성·수정. 제목/이미지 교체·표행/출처문단 추가·대표 변경의 재입력/수동조정/오류복구를 기록하고 무선택 결과부터 인수 |
| 4 시안 검증 | 자료/표현 담당+디자인 | pair header/복수 설명·C 대표가뒤/혼합그룹·native 작은축/label·hero반복의 같은내용 표현. 문법 간단함만으로 완료 판정하지 않음 |
| 5 유지·회귀 | 기존 runtime 담당+QA | legacy20/native8의 실제 영향 경계, overview/presenter·편집·read390px·reduced motion. 현재210기능검사와 새 시각/서사/작성 인수를 구분 |

전체 종료 조건은 기능·사실/읽기·주역/독해·연속 서사·처음 작성의 기본 품질을 각각 통과하는 것이다. 장수·검사수·문서 분량을 새 완료 근거로 만들지 않는다. 이번 감사는 후속 필요/범위/반대안/우선순위 인계가 완료 기준이며 실제 제품 복원 완료는 아니다.

## 직접 교차 검토와 한계

상대 `/root/engineering_manager/performance_auditor`에게 동일내용 검수와 mosaic의 실제샘플/일반지원 구분, C4번째 주역·native 반복, 기본 조판/사실추론의 분리를 직접 전달했다. 상대도 이 구분을 수용하고 작성 약속·QA 이행 초안을 준비했다. 각자 독립 실질 초안 뒤 상대 quality-delivery-audit 전체와 근거 범위를 실제 읽었다. B의 반론을 받아 마지막 위치를 closing 조판 후보 입력으로 쓰는 것과 끝맺음 의미를 발명/생략하는 것을 분리했다. 이 담당은 원문 fallback이 내용은 완전해도 발표에서 여전히 안 읽힐 수 있다는 반례를 보내 build 손실방지와 독해/미감 인수를 별개로 둘 것을 요청했고 B가 자기 감사에 수용·반영했다. 명시 분자/분모 계산은 양쪽 모두 실제 소스를 읽고 기존 계약으로 유지하며 무단 성과 해석과 구분했다. 세부 syntax를 먼저 확정하지 않고 무선택 기본 시안과 기능/사실·독해·서사·작성 인수를 분리하는 대안에 합의했다.

원본 개별4장+contact5개 열람과 구조90장/51관찰JSON/통제4fixture 검수 범위다. 물리 발표거리 독해·새 기본/선택 시안·실제 사용자 작성·새 모바일/접근성·전체90장 시각합격·구현 비용은 미확인이다. 새설치/제품 구현/default build/서버·브라우저 조작/210검사·이전12probe·Git 작업은 하지 않았다. 이 담당은 이 문서만 작성했고 제품·원고·생성물·이전 연구·공통 근거·WORK_LOG는 수정하지 않았다.
