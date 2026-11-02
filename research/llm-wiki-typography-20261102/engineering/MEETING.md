# LLM Wiki 타이포 교정: 엔지니어링·발표 직접 회의

이 문서는 구현 계약과 실제 교환의 근거다. 목표·담당·미완료의 정본은 root 소유 [WORK_LOG](../../../WORK_LOG.md)이며 별도 상태 로그를 만들지 않는다. 현재 본편은 `needs-changes`다. 제품 구현·최신 화면·독립 재검수 전에는 새 승인을 주장하지 않는다.

## 인수한 기준과 소유 경계

기준 HEAD는 `bf3cce13fcab66a6e44896241f508f4fe2d3793e`다. AGENTS·DESIGN의 현재판, MARKDOWN-FIRST·CONFIG, 원고 `talks/llm-wiki/slides.md`, blocks.js·blocks.css·scripts/markdown-document.cjs, 발표팀 A/B 감사·TYPOGRAPHY_SPEC·MEETING_HANDOFF를 읽었다. manager 스킬과 coordinate의 선택 기준을 적용한다. 모델은 root가 확인한 [08:20 UTC 스냅샷](../model-snapshot.json)의 정확한 `gpt-6.1-sol/high/fork_turns=none`이며 현재 catalog와 대조했다. capacity 중단을 품질 문제로 해석하거나 모델을 자동 변경하지 않는다.

최신 사용자 범위는 줄 호흡·위치·위계·레이아웃과 자체제작 5/11/20 면의 실제 교정 및 재발 방지다. 검정 Stage·큰 타이포·여백·한 시각 중심을 역할별로 적용한다. root의 최신 정확화에 따라 고유면 보존은 외부 제작자에 한정하지 않으며 자기 제품의 실제 UI 캡처도 원본 증거이면 대상이다. 5/11/20은 실제 캡처가 아닌 설명용 재구성 SVG 예시이므로 이번 검정 조판 대상이다. 원본 파일의 보존과 본편 시각면의 보존은 구분한다. 26개 주제·35+5분·핵심9도식의 관계·원19SVG·48장 보관·데모·사용자 test.md를 보존한다. 새 자산은 별도 경로다. 생성물 수동 편집·전용 slide 좌표 CSS·내용 삭제·계속 축소·브라우저 zoom 변경은 해법으로 쓰지 않는다.

root는 WORK_LOG·빌드/생성물·실브라우저 TaskSpace27/p1을 단독 소유한다. 발표 복구 매니저는 presentation/MEETING_HANDOFF.md만 소유한다. 엔지니어링 매니저는 이 회의 문서를 소유하며 root의 writer 인수/슬롯 투입 신호 전에는 제품 편집과 실무 spawn을 시작하지 않는다. 기존 A의 감사와 실제 반론을 인수하지만 받지 못한 최종 취합 서명을 합의로 발명하지 않는다.

## 구현 근거와 직접 반론

엔지니어링 매니저가 발표 복구 매니저에게 역할별 크기, 지원 문법, 공통 소속, 자산 분류, 좁은 회귀를 직접 제안했다. 발표 복구 매니저가 다섯 쟁점에 동의하고 역할과 허용 반례를 구체화했다. 엔지니어링은 비용·오탐·관측 안정성 반론으로 일반 한국어 검사기/새 경고 UI를 만들지 않고 기존 실제 관측과 프로젝트 fixture를 쓰는 방법을 회신했다.

엔지니어링 매니저도 before/present-1280의5/11/20/6/17/24 원본 PNG를 직접 열었다. 5의 raw 흰 면 우세와 작은 rules,11의 주제명/두 흰 면 우세,20의 반복 내부 제목/여러 작은 필수 층,6의 공통 의미 AI열 편입과 끝 서술어,17의 실제 한 호흡/작은 현상·대응,24의 작은 요청 대비 큰 제목/지원층을 확인했다. 이 대표 직접 열람을 전26장 시각 검토로 확대하지 않는다.

| 쟁점 | 근거·반론과 합의 |
| --- | --- |
| 실제 지원 개행 | parser는 softbreak를 text `\n`, hardbreak를 AST br로 만든다. 직접 Node probe에서 인용의 backslash는 br, H1 끝 backslash는 literal과 별도 p임을 재현했다. 본문/인용은 기존 br를 사용하고 H1 신문법은 필요한 경우에만 최소 계약 검토한다. softbreak 전역 hardbreak화는 하지 않는다. |
| 필수 설명의 크기 | 현 quote p25, media p22, document29/pre26은 역할을 충분히 구별하지 않는다. 17/18의 현상·대응/목적·직접기록·출처구분,24의 네 요청,media의 관계 설명/필수 라벨은 32–36logical 출발 역할로 구체화한다. 출처·탐색·비필수 메타22–24와 분리하며 모든 장의 전역 하한으로 만들지 않는다. 링크가 있다는 이유만으로 혼합 필수 p를 메타로 처리하지 않는다. |
| 실제 표시와 숫자의 한계 | 1280의 실제 stage917.333폭에서32–36logical은18.347–20.64표시px다. SVG는 내부 크기×contain 배율×stage 배율을 계산한다. 숫자 통과는 현장/미감 승인이 아니다. centered34 선언도 group-count3 선택자가32로 덮으므로 computed 결과를 확인한다. |
| 6 공통 의미 | groupsFor는 H2~다음H2를 묶고 renderer는 앞 p를 body직속으로 남긴다. Node probe에서 p,h2,p,h2,p가 groups[1..3,3..5]로 경고 없이 editorial 계획됨을 확인했다. 기존 full-span CSS를 활용해 공통 p를 두H2 앞으로 옮긴다. CSS로 AI열 문장을 중앙에 옮기는 것만으로 해결하지 않는다. centered gap/행높이는 실제 화면에서 확인한다. |
| 실제 호흡과 반례 | 17/18은 br 경계 전후 glyph-y가 다르고 순서/강조가 남아야 한다. 현재 환경 두 호흡이 목표이며 다른 OS의 추가 자동행은 시각 재검토한다. 표지·사람/AI라벨·‘왜 골랐고,’ 같은 의도 짧은 행은 허용한다. |
| 재구성 예시 5/11/20 | 새 검정 조판과 주역 글자/관계를 재설계하며 원본을 보존한다. 실제 원본 증거/설명용 재구성 예시로 권한을 구분하며 제작자 내외부만으로 판정하지 않는다. 단순 색반전·흰 픽셀 할당량은 수용 조건이 아니다. 9/10 무방향 관계,11 기존 근거3/연결2의 의미를 보존하고 새 인과를 추가하지 않는다. |

## 구현·회귀 제안의 경계

기존 root manifest.typography의 Range 실glyph 행·computed font·좌표에 source 역할 대응을 붙여 프로젝트 전용 순수 판정 함수/CLI로 검증한다. 새 브라우저 라이브러리나 제품 경고 UI는 필요하지 않다. 대상 미발견·중복·원문 삭제는 fixture 오류이며 pass로 삼지 않는다. 의미보존 재문장화는 사람이 원문 동등성과 기대 경계를 인수한다. 제품 문자열은 CSS 분기키가 아니다.

- 4/6/12/21/22의 지정 본문: 보존한 원본에서 실제 고립 서술어 끝행 fail, 수정판에서 목적어/부사구와 읽는 행 pass. 모든 짧은 행 금지가 아니며 의도 독립행 반례를 함께 통과시킨다.
- 17/18: 역할별 필수 p 크기와 인용 두 호흡의 glyph-y/순서를 관측한다. br 문자열 존재로 대체하지 않는다. 발표 복구 매니저는 17/18·24의 지정 필수 native 역할을32logical 구현 시작 하한,32–36 범위 조판으로 확정 회신했다. SVG 필수 라벨은 이 목표와 실제 contain 후 역할을 함께 검토하며 원 font-size>=32만으로 통과시키지 않는다.
- 24: 목적/자료/정리/확인 네 요청 전문·역할별 실제 크기/기하를 관측한다. H3만 줄여 기존26을 통과시키지 않는다. 코드에서 native 문서로 바꾸는 경우 원요청 의미·복사/읽기 접근을 보존한다.
- 6: 원본 AI그룹 소속 fail, 수정 AST/DOM 공통 소속과 전폭 기하 pass를 함께 확인한다.
- 5/11/20: source별 자체제작/외부원본 분류, 새 자산 참조, 보존 원19SVG 대응을 확인한다. 새로운 관계·실제 내부 글자/크기의 성공은 사람이 최신 화면에서 판단한다.

before fail→after pass는 같은 판정기를 실행한 결과로 남긴다. 자동 검사는 알려진 회귀/관측 최신성, 발표팀은 실제 화면의 위계·호흡·관계·읽는 순서를 독립 판단한다. 소스 동결 후 root가 발표1920×1080/1280×720 전26장과 읽기1440/390, 공통 영향 대표 화면을 제공하며 반려 범위는 같은 수정/검수 루프로 돌아간다.

## 실무 배정안

root가 발표팀 writer 종료와 교차회의를 인수한 뒤 투입 신호를 보냈다. 정확 `gpt-6.1-sol/high/fork_turns=none`으로 두 실무자를 실제 배치했고 각자 실질 초기 구현을 시작한다. 같은 작업의08:20 UTC 공식/실catalog 스냅샷을 공유해 재사용한다.

| 실무자 | 직접 확인한 소유 |
| --- | --- |
| A `/root/typography_engineering_manager/common_typography_engineer` | blocks.css·필요 최소 blocks.js/scripts/markdown-document.cjs, 기존 tests/blocks-runtime·blocks-composition·markdown-document.test.cjs, AGENTS·DESIGN·MARKDOWN-FIRST·필요CONFIG, engineering/A_IMPLEMENTATION.md |
| B `/root/typography_engineering_manager/deck_qa_integrator` | talks/llm-wiki/slides.md·신규 assets/typography/*.svg만·필요 materials speaker-script/diagram-reading/session-plan, 새 scripts/llm-wiki-typography-qa.cjs·새 프로젝트 test/역할 fixture, engineering/B_IMPLEMENTATION.md·ENGINEERING_HANDOFF.md |

두 실무자에게 최신 지시·정본/교정명세·소유/보존·현재needs-changes·필수 역할32하한/호흡·실원본증거 예외·root실측·완료조건을 직접 전달했다. A/B는 파일 소유를 회신하고 서로 직접 통보한다. A/B가 직접 반론하고 B가 자기 구현과 A 결과를 함께 취합한다. 같은 파일 동시 writer를 두지 않는다. 최종 빌드/캡처와 생성물은 계속 root 소유다.

## 구현 초안의 실제 교차 반론

매니저는 A의 공통 구현과 B의 원고·새9SVG·자료를 직접 읽고 관련42검사를 독립 실행했다. 6 공통 p가 그룹 밖에서29를 상속하는 문제는 A가32 역할로 고쳤다. B는32×43em의1376폭이 전폭1416보다40좁은 후속 반례를 직접 전달했고 A가 prelude의 max-width를 풀었다. 13의 질문은 document 인용40/단계32의 역할로 A/B가 합의했다. root가 다른4덱33장에는 document 인용이 없음을 확인해 존재하지 않은 기존 사례의 검수로 확대하지 않는다.

새5 SVG는44글자 확대 후 설명 baseline237과 다음 범주265가28밖에 떨어지지 않았다. 매니저와 A가 각각 직접 반론했고 B가 세 범주/설명 쌍을174/222·276/324·378/426으로 재배분했다. 매니저의 동일x·가까운baseline 정적 후보 검사는 수정 뒤0이었지만 실제 bbox·실크기·관계 판정은 root의 새 관측과 발표팀이 맡는다. 매니저는 diagram-reading20의 ‘밝은 문서면’과 이전 개선판 링크 불일치를 지적했고 B가9절 현재 그림/이전 원본의 경로와 설명을 동기화했다.

좁은 QA 초안은 실제 baseline70검사에서44회귀/invalid0을 재현했다. A와 매니저는 실측 SVG 생략 시 skip, 일부 라벨만 남겨 통과,6 기하 누락 TypeError,현재 CSS/runtime 최신성 누락,좋은 옛 SVG 실측과 새 manifest 조합의 반례를 직접 전달했다. B는 필수 관측/전체라벨 inventory·asset SHA/source 경로·재구성 분류·현재 해시/명시 baseline 계약을 보강한다. 이 수치는 수정판 통과나 시각 승인이 아니며 최종 CLI 재실행과 새 실제 화면으로 확인한다.

root의 후속 요구도 A/B에게 각각 직접 통지했다. 현재 CLI는 source/SVG/CSS/runtime의 해시가 맞아야 하며 명시 baseline은 동결 역사 입력으로 분리하고 npm 실행/AGENTS 마감·작성 안내에 연결한다. 단독 링크를 언제나 비필수로 단정하지 않으며 기존 `**[시작하기](...)**` 강조 CTA는 body로 남는 반례를 추가한다. 최신 교정 명세·root 예정 RESULT/새 검수 경로는 LLM README에서 찾게 하고 이전 감사는 이력으로 구별한다.

## 동결 인수와 다음 검증의 책임

A/B 모두 실제 final과 writer 종료를 확인했다. root가 마지막으로 추가한 다른 viewport의 SVG 관측 혼입 반례까지 B가 구현했고 A가 짧은 후속 읽기 검토로 최종19 QA/42공통을 인수했다. 매니저도 최종61개를 독립 실행해 전부 통과했으며 [B 동결17항](b-source-freeze.json)의 실제 SHA 불일치0을 확인했다. 원고는 `5a23d0bddb3a2873067c4407b308c50b275e38fbba81292575f1d33cb5f6a702`다. 최종 취합은 [ENGINEERING_HANDOFF](ENGINEERING_HANDOFF.md)이고 공통/원고·자산·회귀의 세부는 [A](A_IMPLEMENTATION.md)·[B](B_IMPLEMENTATION.md)에 대응한다.

같은 판정기의 실제 baseline 실행을 매니저도 재현했다. 명시 baseline mode는70검사/44회귀/계약오류0,exit1,visualApproval=false다. current는 전체 실제 입력 해시·필수 SVG 전체 inventory/분류/asset identity뿐 아니라 SVG 관측의 동일 manifest 파일SHA와 viewport도 요구한다. 오래된 좋은 관측을 새 runtime에 붙여 통과하는 경로를 허용하지 않는다.

root가 새 빌드/사이트검사·전체회귀·발표 두 크기 전26장/읽기 두 폭/공통대표 캡처를 이어서 수행한다. 현재판 after pass·독립 시각 승인은 아직 미확인이다. 특히22의 새 의미행이34 크기에서 다시 서술어 꼬리를 만드는지는 추정으로 면제하지 않고 실제 role 검사/화면으로 판단한다. 반려되면 기존 소유자를 재개해 기준을 낮추지 않고 수정·동결·새 관측으로 반복한다. 엔지니어링 매니저는 이 인계로 회의 문서 writer도 종료하며 제품·정책·QA는 동결을 유지한다.

## 1차 실제 반려 인수와 국소 교정 재개

root는303전체 테스트와 빌드/사이트 검증을 통과한 판에서 실제1280 전26장과 SVG 관측을 수집했다. current68항은 계약오류0/회귀2(`risk-content-tail`, `diagram-3-font`30.786logical<32)로 실패했다. 이는 알려진 회귀 판정기의 작동 증거이며 수정판 통과가 아니다. 발표 복구 매니저가 [1차 반려](../review/FINAL_VERDICT.round-01.md)의 R1–6을 직접 인계했다. 매니저도 해당1280의3/8/9/10/19/22 원본을 직접 열고 자산 source와 대조했다.

발표팀 writer 전원 종료와 root 재개 신호를 받은 뒤 같은 A/B를 follow-up했다. 최신 교체 AGENTS와 WORK_LOG·DESIGN의 현재 기준/검수 상태를 다시 읽었으며 모델/역할·보존·root 브라우저/로그/생성물 단독 소유는 유지한다. 이번 실제 파일 소유는 A가 새로운 `scripts/llm-wiki-geometry-qa.cjs`와 해당 테스트/`A_ROUND02_REVIEW.md`, B가 기존 원고·typography 자산·main QA/역할fixture/프로젝트 테스트·round02 취합이다. 공통 CSS·정본문서 변경은 필요한 증거가 없는 한 추가하지 않는다. A도 대기 역할이 아니라9/10의 지정 선-라벨 기하와 관계 보존을 다루는 순수 계약/회귀를 직접 구현한다.

R1은3 필수 크기를 실제 contain 후32 이상으로 회복하되 두 하단 필수문장·3원자료·5노드/5관계를 보존한다. R2/R3은22 내용의 ‘있습니다.’와 관리의 ‘듭니다.’를 의미구에 붙이고, R4는9 두 사선/10 수직선의 라벨 관통을 기존3무방향관계의 동선 분리로 교정한다. R5는8 답의 목적어/정리 동작을 한 호흡으로, R6은19 공부의 연결 동사를 같은 뜻으로 묶는다. 5 wiki의 범주/설명 쌍 간격은 비차단 권고로 구별해 개선한다.24/26의 역할별 현재 수용을32 전역 하한으로 뒤집지 않는다.

원래 baseline44와1차 current2 결과는 당시 범위 그대로 보존한다. root가 반려판77입력을 source-snapshot/source에 원바이트 보관했다. 확장한19/22관리/8답/9·10의 좁은 회귀는 별도 역사 부분 probe로 범위와 입력 해시를 명시하고, 새 current는 round02 새 입력으로 다시 실행한다. 과거 실패 결과를 새 판정기로 덮어 실패를 숨기지 않는다. 필요한 SVG path/node/실측bbox 필드는 A/B가 root에 직접 합의하며 기하 후보 검사는 독립 시각 판정을 대신하지 않는다.

## Round02 최종 기술 인수

A/B가 실제 final과 writer 종료를 통지했다. A는 국소 기하 helper/10회귀와 독립 source-layout probe를 구현했고 B가 원고/자산·main QA/fixture를 교정·취합했다. 매니저는 [A](A_ROUND02_REVIEW.md)·[B](B_ROUND02_IMPLEMENTATION.md)와 최신 [취합](ENGINEERING_HANDOFF.md)을 직접 읽고 관련75개를 독립 실행해 모두 통과했다.26parse/plan경고0·공백검사도 통과했다. 공통 CSS/runtime·정본문서·24/26에는 이번 추가 변경이 없다.

직접 교차에서는10의 수직선만 우회할 때 남는 두 사선/라벨 반례를 A가 제기했고 B가 노드·라벨도 분리했다. 매니저는 R5의 단일 SVG text bbox 안에 두 tspan행을 숨길 수 있는 반례를 제기했다. B가 root의 실 SVG glyphRows를 필수화해 두 행은 회귀/관측 누락은 invalid로 교정했고 A가 최종 전문과 단위를 인수했다. 역사 font/anchor/spacing 불변 가정 아래의 bbox 평행이동 probe pass는 새 실제 after pass와 구별한다.

매니저도 최종 확장 baseline CLI를 실행해72항/45회귀/계약오류0·exit1을 재현했다. 기존 [70항/44](before-qa.json)와 [68항/2](../round-01/technical/current-1280.json)는 보존했다. [추가7범위 probe](round-01-expanded-probes.json)는77snapshot SHA와 당시 실제 행/폰트/bbox·보존path로 모두 실패를 재현한 별도 부분 검사이며 full current가 아니다.

[round02 동결](b-source-freeze.round02.json)의20항은 현재 SHA와 불일치0이다. 원고는 `72f3e1a1a04cab86c82b82162dd5915203069e04fb51f4908603cb503759d5dd`다. B의 [보존97항 기록](round02-preservation.json)은 의도 수정한 정본4개를 제외한 기존 tracked LLM Wiki 파일의 bf3cce13 대비 바이트 불일치0을 명시한다. root의 반려판77snapshot도 매니저가 전항 SHA 일치를 확인했다.

root가 다음 빌드/새4화면·실 glyphRows/SVG 기하와 입력해시·current QA·독립 발표 재검수를 이어간다. 그전 실제 current 통과와 제품/지침의 시각 승인은 미확인이다. 매니저도 이 기술 인계로 문서 writer를 종료하며 제품·정책·QA의 재수정은 반려 인수 뒤 기존 소유자 재개로 진행한다.
