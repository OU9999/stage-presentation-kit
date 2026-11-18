# Round02 수정 실물 인계

2026-11-17 · 제작 manager `/root/devday_creation_manager`. round01의4장×발표두폭은 모두 needs-changes다. 원문과 캡처·승인 CLI 실패 기록은 보존했고 본편 이행은 하지 않았다. 이번 수정도 **실제 새 화면/독립 판정 전 미감 미승인**이다.

최신 사용자 권한은 내용보다 미감 우선이며 문구·구두점·전문·필드·기존 구도를 고정하지 않는다. MODEL.json의2026-11-17T01:12:16Z와 정확 gpt-6.1-sol/xhigh/none을 같은 A/B에게 직접 다시 전달하고 수신을 확인했다. DESIGN SHA는 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다.

## 동결 입력과 실행

원고: `research/devday-rebuild-20261117/prototypes/talks/first-look/slides.md`

SHA256: `8345c2bae7ed5b2c607d9e033e448098cb47868a7b57b96c37c2a94b5791aee2`

저장소 루트에서 root가 실행한다.

```sh
node bin/ou-presentation.cjs build --config research/devday-rebuild-20261117/prototypes/ou.config.json
node bin/ou-presentation.cjs verify --config research/devday-rebuild-20261117/prototypes/ou.config.json
```

출력은 `research/devday-rebuild-20261117/prototypes/site/first-look/index.html`과 `read.html`이다. 자료는 같은 덱의 `materials/notes.html`이다. A의 세 새 SVG와 B의 원고/공개자료·공용 코드/문법/테스트는 전부 HOLD다. root에게 proof 마감 전에 입력 동결을 먼저 직접 인계했다. 이후 A/B의 actual FINAL과 proof/취합을 포함한 모든 writer 종료도 직접 확인했다. manager는 이 인계 마감 뒤 writer를 종료한다. build·전체 테스트·브라우저·실캡처·Git·WORK_LOG는 root만 실행/작성한다.

## 반려별 실제 수정

| 장 | 현재 실제 입력 | 수정한 형상과 재확인할 것 |
| --- | --- | --- |
| 1 | `message + declaration`, ‘지식을 남기는 방식이 / 다음 질문을 바꿉니다’ | 문구를 다시 쓰고 쉼표/마침표를 없앴다. 명시 변형의 native H1은126px/430, strong도 획을 상속한다. 넓어진 두 행과 흰색/주황색의 실제 무게·광학 중심을 재검수해야 한다. |
| 2 | `gallery + comparison`, 새 `answer-window-r02.svg`와 `wiki-window-r02.svg` | 동일720×420/외곽694×378을 유지했다. 큰 답 채움판/검색 pill을 제거하고 양쪽을 얇은 문서 경계·원형 표식·짧은 글줄 문법으로 맞췄다. 오른쪽 밀도/내부선 대비를 높였다. 전체 grid1260/중앙gap184·라벨26/gap28로 바깥 여백도 늘렸다. 실제 두 폭에서 전체 점유·틈·안쪽 선/표식과 라벨 무게를 재검수한다. |
| 3 | `split + quote-card`, 새 `condition-article-r02.svg`, ‘문서를 따라 읽고 / 다음 질문에 쓸 / 근거를 찾고 싶다’ | 제목46px/300·본문20px/300의 연속12줄/4문단으로 기사 질감을 다시 편집했다. 카드 문장은 원문을 요약해 재작성했고 공개자료에 정확 원문과 구별했다. 명시 quote-card의 곡선 표식은 Georgia/Times 계열 실제 glyph로 바꿨다. 좌우1.32:1/gap44와 인용 행폭·패딩·부호/본문 간격의 결과를 새 화면에서 판정한다. |
| 4 | 기존 `results + unframed`, 기존 네1000×640 PNG | 각 image의 intrinsic 비율/auto 높이와 grid auto 행으로 셀을 맞췄다. 명시 변형만 배경/테두리를 없애고 좌우.75:1.55/gap80·native 주장64px로 조정했다. 네 자료를 cover로 자르지 않았다. 실제 검정 띠·틀 해소와 원본1500 대비 주장의 상대 크기·그리드 높이를 재확인한다. |

픽셀 수치는 구현값이며 원본에서 추출한 정답이 아니다. manager가 B의 첫 max-width1480이 실제 가용1416보다 커 바깥 여백을 줄이지 못함을 지적했고, B가 실 CSS를 확인해1260의 동결안으로 바꿨다. 창 자체를 무조건 세로 압축하거나 카드 상하 패딩의 대칭 자체를 강제하는 처방은 최종 반론에서 철회돼 적용하지 않았다. 원자료 crop으로 검정 띠를 숨기지 않았다.

## 소유·파일·인터페이스

이하 새 연구 경로는 `research/devday-rebuild-20261117/` 기준이다.

- A: `prototypes/assets/answer-window-r02.svg`, `wiki-window-r02.svg`, `condition-article-r02.svg`, `production/visual-intent-round02.md`. 기존3SVG와4PNG를 덮지 않았다.
- B 현재 원고/공개자료: `prototypes/talks/first-look/slides.md`, `prototypes/talks/first-look/materials/notes.md`. config·원팩·결과PNG의 입력은 유지했다.
- B 공용 구현: `lib/markdown-document.cjs`, `lib/markdown-deck.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, `app.js`, `styles.css`. 문법은 `CONFIG.md`, `MARKDOWN-FIRST.md`의 작은 명시 변형 예에 한정했다. 관련 테스트는 `tests/blocks-composition.test.cjs`, `tests/deck-model.test.cjs`, `tests/markdown-document.test.cjs`, `tests/bento-editorial-runtime.test.cjs`다. 정확 전체 변경 파일과 검사 범위는 `production/integration-round02.md`에도 기재했다.
- B 새 검증/취합: `prototypes/source-proof-round02.cjs`, `prototypes/source-proof-round02.json`, `production/integration-round02.md`. round01 runner/json/취합은 역사로 보존했다.
- manager: 이 `production/round-02-handoff.md`만 작성한다.

declaration은 명시 message에서만, unframed는 results에서만 선택한다. 기존 message·results의 기본값과 일반 gallery/strip/evidence/auto를 바꾸지 않고 주제 id·한국어 문구를 공용 CSS에 넣지 않았다. 공용 추가 소유와 variant 인터페이스를 A/B/root에 직접 전달하고 수신을 확인했다. A/B는 원고의 참조·기사/카드 비례·새 문장과 공개자료의 작성 지위를 직접 대조했다.

‘이번 답/다시 쓸 지식’은 필수 비교 라벨이다. 명시 comparison의 실제 FIGCAPTION에만 `data-copy-role="figure-label"`을 부여하고 기존 실제 sourceLine과 FIGURE 소속을 보존한다. 발표26px은 이 원본 대조에서 선택한 값이며 전역32px 하한으로 고정하지 않는다. 읽기는 이 역할만18px로 두며 일반 provenance caption은 그대로다. 모든 FIGCAPTION을 source-caption으로 간주하는 옛 본편 QA는 이 새 의미로 통과시켰다고 주장하지 않는다. 후속 본편 이행 때 실제 DOM역할/data-field 관측과 계약을 정직하게 맞춰야 한다. legacy results 제목은 native H1의 기존 `data-field="title"`을 유지하며 sourceLine을 가짜로 합성하지 않는다.

## 실제 확인과 보존

manager는 round01의 양폭8개별과 A/B 최종 명세16범위·MANAGER·ROOT 초기 원문을 실제 읽었다. 절차 한계 때문에 round01을 root 비노출 독립검수로 표현하지 않는다. 다음 검증 초기 전 root 관찰을 격리하는 운영은 root가 맡는다.

B가 관련 순수 단위검사135/135 통과와 4개 정확한 plan/model issue0/warning0을 보고했다. manager도 별도로 실제 current parse/model/plan·모든 local ref를 확인해4장/issue0/warning0/참조누락0을 확인했다. 새 read-only proof를 직접 실행해 **10/10**, `visualApproval:false`, `observedRender:false`를 확인하고 저장된31입력을 재해시해 불일치0을 확인했다. 명시 공용7파일을 제외한 시작 baseline97입력은 동일하다. manager는 추가로 round01 manifest에 기록된 이전3SVG+결과4PNG의7개 해시가 현재와 모두 같음을 직접 확인했다.

새 비교는 설명용 문서도식이고 새 기사는 자작 가상 메모의 편집문이다. 네 결과면은 이전과 같은 자작 HTML의 실제 캡처다. 외부 제품 UI·실제 참가자 기록·모델 성과로 바꾸지 않는다. 공개자료는 정확 원문과 새 인용 재작성을 구별하며 원팩 전문을 그대로 연결한다. 원문 보존이 새 발표 문장을 고정하는 제약은 아니다.

실제 glyph·창 내부 대비·기사 질감·native 카드 비례·네 자료의 가장자리·전체 흐름은 root의 새 round02 양폭 화면과 검증팀이 판정한다. 선언 weight/색·개행 수·테스트 통과·자작 지위만으로 반려가 해소됐다고 하지 않는다. 본편/읽기 전체 이행은 여전히 보류다.
