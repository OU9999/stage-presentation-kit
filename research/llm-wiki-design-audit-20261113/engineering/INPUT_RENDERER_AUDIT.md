# 입력·콘텐츠 모델·renderer 감사

담당: `/root/engineering_audit_manager/input_renderer_auditor` · 2026-11-13. 시작 HEAD `fca44a239eec36fcd3a96fd4997adc6b03d020cd`. 제품·정본지침·원고·자산은 수정하지 않았다. [starting-state](../starting-state.json), [모델 snapshot](../model-snapshot.json), AGENTS/DESIGN/MARKDOWN-FIRST/CONFIG/DESIGN-REVIEW의 현재 계약을 읽고 지정된 연구 파일 세 개만 작성했다.

**이번 비교 9종과 LLM Wiki는 같은 Markdown parser와 StageBlocks 조판 엔진을 쓴다. 현재 26장은 전부 `compose`를 명시했으며 source→AST→planner→저장된 실제 브라우저 DOM의 구도가 일치한다. 반복 표현을 자동 parser 고장으로 설명할 근거는 없다.** 핵심 개선 후보의 상당 부분은 현 문법·기존 SVG 자산 경로로 제작할 수 있다. 자유 공간의 연결선, 공유 후행 행, flow 항목의 rich text/실제 링크 등은 현 native 계약에 없는 기능이다. 이 기능 부재가 현재 26장의 renderer 오류라는 뜻은 아니다.

## 실행과 관측 경계

```sh
node research/llm-wiki-design-audit-20261113/engineering/capability-probes.cjs
```

결과: [capability-results.json](capability-results.json) **13 checks / 13 passed / 0 failed**. [프로브](capability-probes.cjs)는 제품 parser/model/renderer를 그대로 실행하고, Node의 작은 DOM shim으로 생성 구조·문자·링크·그룹 소속을 확인한다. 마지막에 같은 폴더의 결과 JSON만 쓴다. 제품 파일이나 브라우저를 조작하지 않는다.

- 26장 및 비교 9종은 root가 수집한 [deck inventory](../evidence/deck-inventory.json)와 [비교 manifest](../evidence/compare/manifest.json)의 실제 브라우저 결과에 독립 재파싱·planner 결과를 대조했다. 브라우저 DOM을 이 담당자가 새로 수집한 것은 아니다. deck inventory의 렌더 입력 89개는 현재 파일과 SHA256이 모두 일치했다.
- 현재 [3](../evidence/present-1920/slide-03.png)·[5](../evidence/present-1920/slide-05.png)·[10](../evidence/present-1920/slide-10.png)·[12](../evidence/present-1920/slide-12.png)·[15](../evidence/present-1920/slide-15.png)의 저장 PNG를 `view_image`로 직접 읽었다. 새 capability 예문을 브라우저에 표시하거나 캡처하지 않았다.
- 실제 근거는 viewport 1920×1080, stage 약1557.333×876이다. 1600×900 논리값 및 더 작은 viewport의 stage와 구별한다. DOM shim에는 CSS 계산·Range glyph·contain 배율·잘림·시각 판단 기능이 없다. 13/13은 시안 합격·본편 승인이 아니다.
- source AST의 hard break 수와 문자 사이 hard break 순서, 링크 순서, 전체 본문 문자열을 26장 모두 렌더 결과에 assert로 대조했다. B의 반론을 받아 단순 br inventory였던 초기 프로브를 보강했다. 소스와 렌더 출력의 보존 확인이며 모든 글자가 실제 화면에서 읽힌다는 보장은 아니다.

## 같은 엔진인가: 실제 경로

| 입력/근거 | 실행 경로 | 판단 |
| --- | --- | --- |
| LLM Wiki `talks/llm-wiki/slides.md` | `lib/project.cjs:206` → `parseDocument` → `layout: blocks` → `app.js:413` → `StageBlocks.renderSlide` → `blocks.css` | 새 Markdown 경로 |
| 현재 비교 9종: portraits/strip/mosaic/bento/icons/custom-icons/table/quote/editorial-photo | photo-essay/community-exhibit/product-notes/team-learning의 원고를 같은 `parseDocument`로 재파싱. 9개 모두 `layout: blocks`, planner composition/variant와 저장 DOM 일치 | LLM과 parser·조판 renderer까지 동일. 같은 runtime 파일 해시도 대조 |
| `examples/devday-compositions` 등 legacy 원고 | `scripts/build-examples.cjs:12` → `lib/markdown-deck.cjs` → legacy layout → `app.js`의 해당 분기 | 공통 앱/테마를 사용하되 blocks 조판과 별도. 이번 비교 9종을 이 경로라고 설명하면 오류 |
| 새 원고의 명시 `stage` JSON | `lib/markdown-document.cjs:92`가 legacy adapter 호출 → `layout: visual` 등 | Markdown 안에서 기존 양식 접근 가능. 같은 장에서 stage-slide/group과 혼용 불가 |
| 공통 파일 | `lib/runtime.cjs:6`: styles/visual/blocks CSS, model, visual/blocks/app JS | 새 프레임워크·별도 엔진 설치가 선행조건은 아님 |

원고 control은 `lib/markdown-document.cjs:252`의 허용 compose/tone/fit/focus/variant/icons로 제한한다. `compose: visual`은 오류다. `visual`은 compose가 아니라 기존 `layout`이며 정확한 세 백틱 `stage` JSON으로 선택한다([작성 안내](../../../MARKDOWN-FIRST.md), 약302행). 이 문법 차이를 native 기능 부재로 오해하지 않는다.

색 역시 엔진 강제와 원고 선택을 구분한다. **LLM26장은 모두 `tone: neutral`을 명시**했고 프로브에 장별로 남겼다. 공용 blocks의 생략 기본은 neutral이 아니라 `app.js:395–396`의 blue다. `blocks.css:5,27`은 neutral의 강조를 본문색으로 만들므로 이 선택이 native 강조/그룹명에서 색 대비를 줄이는 영향은 있다. 비교 bento는 그룹 blue/orange/purple/green, icon-wall은 항목 purple/blue/orange, editorial-photo는 그룹 green/purple을 명시했다. 사진/자체 아이콘/SVG의 고유색은 별도 자산에서 온다. 외부 SVG 안의 녹색 관계점/주황 조건은 LLM의 native neutral 선언으로 제거되지 않는다.

따라서 사진·색 개수만으로 현재 문제를 설명할 수 없다는 판단을 ‘중립 선택은 영향이 전혀 없다’로 확대하지 않는다. 구체 대상/조건/발췌와 대응되는 의미색·자료 표면을 선택 시안으로 비교할 여지는 있다. 현 Stage 팔레트로 가능하며 색 면적/횟수 할당량·전역 팔레트 교체·장식 사진 추가는 권고하지 않는다. 실제 원본 증거면과 자체 재구성의 표면 권한은 아래의 경계를 따른다.

## 26장 명시 구성의 독립 대조

각 항목은 **원고 명시값 = planner = 저장 실제 DOM**, fallback warning 0이다. title/sourceLine/top-level AST tag/H2도 inventory와 일치했다. 전26의 문자열·실제 a href 순서·br·외부 img 수는 결과 JSON에 장별로 남겼다.

| 장 | compose | 장 | compose |
| --- | --- | --- | --- |
| 1 | message | 14 | media |
| 2 | quote | 15 | editorial |
| 3 | media | 16 | media |
| 4 | editorial | 17 | quote |
| 5 | media | 18 | quote |
| 6 | editorial | 19 | editorial |
| 7 | document | 20 | media |
| 8 | media | 21 | editorial |
| 9 | media | 22 | editorial |
| 10 | media | 23 | document |
| 11 | media | 24 | document |
| 12 | editorial | 25 | closing |
| 13 | document | 26 | message |

`blocks.js:156–206`에서 auto는 인용/사진/짧은 본문의 **형태**를 판단한다. 명시 compose는 suitability를 확인하고 적합하면 그대로 쓴다. 현재 26장은 auto 분기가 선택한 결과가 아니다. 같은 editorial이어도 동등 책임의6, 범주의19/21/22와 관계를 보여야 하는12, 두 판단/실행의15는 역할이 다르다. 엔진이 의미를 추론하여 이런 차이를 자동 교정하지 않는다는 것은 설계 경계다.

반례 프로브: `compose: media`에 이미지 **앞** 주장→이미지→뒤 설명을 주면 document+경고로 원순서를 보존한다. 이것도 parser 손실이 아니다. `blocks.js:162`의 leading pure-image 계약에 맞추거나 document를 선택한다. 내용을 임의 추출·삭제·재정렬하는 확장을 기본 해결책으로 삼지 않는다.

## 원인 분리

| 관측/코드·원고 근거 | 원인 분류 | 후속 판단 |
| --- | --- | --- |
| 3/5/10은 원고38/73/150행의 SVG 한 장, media 요청. 저장 화면도 그대로 표시 | 자산 내부의 설명 구성·구절 선택·위계 | wrapper compose만 바꿔 SVG 내부 관계를 고칠 수 없음. 자산 재조판 또는 필요한 구절을 native로 다시 작성 |
| 12는 원고176–189행의 일반 설명 H2 세 개. 실제 문서명/연결 대상이 본문에 없음 | 저자의 표현 선택 | parser가 문서명을 잃은 것이 아님. 기존 예제의 정확한 이름·관계를 입력해야 함 |
| 15는 원고228–241행의 목적질문/이유질문/작게시작 H2 세 개 | DOM까지 세 동급 sibling 그룹인 제작 선택 | `primary`만으로 첫 두 질문을 한 판단 그룹으로 묶지 못함 |
| rules 양영역 적용은 현재 raw-wiki-rules.svg의 desc 및 하단 필수 문장에 이미 존재, PNG에서도 보임 | 누락이 아닌 현재 보이는 귀속·위계 강화 후보 | ‘규칙을 새로 추가하여 누락 수정’으로 보고하지 않음 |
| 모든 기존 source/plan/저장 DOM 구도가 일치하고 렌더 text/link 순서 보존 | 이번 조사에서 해당 경로 renderer 오류 근거 없음 | 디자인의 필요 변화를 engine bug로 바꾸지 않음 |
| flow의 x/y/description/href/link.label이 validator는 수용하나 render하지 않음 | 합성 counterexample에서 확인한 미지원 필드/허용적인 검증 경계 | 현재26장은 flow 입력이 없어 현덱 결함 증거가 아님. 지원 경로라고 안내해서도 안 됨 |

## 가능한 것·미지원인 것

| 요구 | 현 계약의 경로/실행 근거 | 경계 |
| --- | --- | --- |
| 구체 메모 발췌·강조·질문과 원문 링크 | document의 blockquote/p/table/a, C1 probe. `expanded-study.txt:44`의 실제 문장을 발췌 | 표본은 구조 확인용. 기존 다섯 관계선 모두를 대체한 완성안이 아님 |
| raw 보존 vs wiki 갱신의 두 영역, 양쪽에 적용되는 rules | editorial 두 H2 + H2 **앞** 전폭 rules/정의 문단, C2 probe | rules와 마크다운 정의 모두 body 직속이며 두 그룹 밖임을 각각 assert. 축약된 긴 프로브이며 전체 교정·실제 크기/분량은 미관측 |
| 두 영역 뒤의 공통 rules 행 | 기존 SVG에서는 가능. 현재 native editorial에는 공통 **후행** scope control이 없음 | 마지막 H2 뒤에 쓰면 마지막 그룹 소속(`blocks.js:91–98`). 좌표 이동만으로 소속 문제를 숨기지 않음 |
| 방향이 있는 합성 분기·합류 | `stage` JSON `layout: visual`, `kind: flow`, items.id/label + links.from/to. C3/C4 capability probe 실행 | 합성 5방향 edge는 현재10의 의미보존 교정안이 아님. 본편은 노드 목록과 별도의 `A → B` 관계 목록. 노드 사이 공간 연결선이 아님 |
| 현재10의 요약입구/개념·비교/현재계획 사이 무방향3관계 보존 | 기존 SVG의 세 `data-relation-id`와 desc, 새 C3 반례 probe 확인. 기존 SVG 재조판이 최소 경로 | flow의 `links.direction` 지원 없음. 합성으로 direction:undirected를 줘도 화살표3개로 렌더됨. 역화살표 추가도 양방향 자동작동을 암시하므로 동등 대체가 아님 |
| 기존 문서명·관계 자체를 읽기 | document 표/목록/링크, 또는 기존 SVG의 글자/선 수정 | 이름 문자열·코드 경로와 실제 탐색 링크를 구별. flow label은 클릭 링크가 아님 |
| 두 판단을 한 그룹, 실행을 별도 그룹 | centered editorial **2H2**, 판단 H2 안에 **2H3**와 원문 문장, 실행 H2. C6 probe DOM 소속 확인 | 두 열이라도 자동 인과 도식은 아님. ‘판단했다면’ 같은 관계 문구와 실제 리듬 검토 필요 |
| 세 H2에서 마지막 primary | stage-group primary는 is-primary class 및 공간 배분으로 실행 강조 | 세 sibling은 그대로. 두 판단이라는 부모/순서를 보장하지 않음 |
| 두 판단→한 실행 연결 | flow.links의 두 from→동일 to 실행됨 | 질문의 긴 원문·rich 강조를 label만으로 다 담아 읽힌다고 주장할 수 없음 |
| 열린 자유 배치 관계도, edge label, 노드 위치/설명/개별 링크 | 현 flow에 없음. 설명용 SVG 재조판 경로는 이미 있음 | 순수 native 자동 관계도까지 요구할 때만 국소 확장 후보. 이번 감사에서 엔진 확장은 불필요 |

### SVG와 native의 경계

`blocks.js:245–260`의 figure는 SVG를 `img src`로 렌더한다. 실제26 probe에서도 해당 장은 img1/inlineSVG0이다. 원고 alt/title/캡션과 부모의 fit/focus는 유지할 수 있으나 부모 Stage CSS가 외부 SVG 내부 text/path의 크기·좌표·색을 재조판하지 않는다. 내부를 고치려면 SVG 자산을 수정하거나 구절/관계를 native 노드로 옮겨야 한다.

현재 typography SVG의 `data-material-kind="explanatory-reconstruction"`과 title/desc는 발표팀의 설명용 재구성을 명시한다. 따라서 실제 제품 UI 캡처·원본 문서 고유면의 예외를 자동 승계하지 않는다(DESIGN 약82행). 반대로 실제 사진/UI를 새로 가져왔다면 고유색/표면/초점을 보존해야 한다. 검정 Stage·큰 타이포·넓은 여백·한 중심을 지키는 것이 현재 기본이며 밝은 면/사진/아이콘의 수량을 새 합격 조건으로 두지 않는다.

SVG 경로는 현재의 모든 관계선을 원하는 공간에 두기 쉽고 현 문법을 바꾸지 않지만, 글자가 외부 img 안에 있어 부모 DOM 본문/링크가 되지 않고 contain 배율에 의해 함께 줄어든다. native는 편집 가능한 텍스트·본문 역할·실제 링크·읽기 재배치를 제공하지만, 그 자체로 충분한 화면 면적이나 좋은 관계 구도를 보장하지 않는다. 둘 중 하나를 전면 의무화할 근거는 없다.

### 가상 파일명과 실제 링크

`expanded-study.txt:22–38`의 raw/wiki 경로는 **하나의 예제 팩 안의 가상 파일 절**이다. `raw/context-note.md` 등이 현재 독립 파일인 것처럼 링크를 만들지 않는다. 코드 안 경로는 `collectReferences`의 참조가 아니며, `<a href>`만 실제 링크다(`lib/markdown-document.cjs:308–325`). C4 probe는 코드 경로 두 개에서 참조가 생기지 않고 작성한 관계읽기 링크만 수집되는 것을 확인했다.

실제 링크가 필요하면 현재 `assets/expanded-study.txt`, `materials/diagram-reading.md`의 실제 anchor를 사용하거나 새 material을 명시 등록한다. `lib/project.cjs:114–130`은 heading/장번호와 실재 파일을 확인하며 등록된 slides.md와 materials/*.md만 변환한다. 이번 probe는 parser/renderer 수준이므로 가상의 `research-only` 경로에서 프로젝트 참조 빌드를 완료한 것이 아니다. 완성 원고는 프로젝트 build/verify와 실제 클릭 검증을 거쳐야 한다.

## 최소 구현 명세: 현 지원부터 사용

아래는 후속 작업 명세이며 이번 감사에서 시안을 구현하지 않았다. 구체 시각 목표는 [디자인 취합](../design/DESIGN_SYNTHESIS.md)의 C1–C7을 함께 적용한다.

1. **3장:** 구절은 예제 팩의 실제 원문에서 선택하고 발표팀 구성 예 지위를 밝힌다. 현재 요구 문장을 그림과 경쟁하는 하단 사본으로 두는 대신 구절→현재 이해/다음 질문과 가까이 묶는다. 원자료 세 개·개념/비교/현재 이해/계획/다음 질문·기존 다섯 관계선을 보존할 때는 기존 설명 SVG의 조판 수정이 가장 작은 경로다. native excerpt/table probe는 가능한 부품을 보여주며 이 보존 조건을 충족한 완성 대체물이 아니다. 그림 관계읽기·원문 접근 유지.
2. **5장:** raw의 실제 목적/선택 이유 구절과 wiki의 해당 개념 구절을 같은 주제에서 택한다. raw 세 이름/요지·선택이유·남은질문, wiki 개념·비교·종합·질문·목차·로그와 네 약속을 보존한다. rules는 이미 존재하므로 양영역 적용의 위계를 강화한다. 현재 SVG의 전체폭 하단 rules를 재조판하거나 native 두 H2 앞의 공통행으로 옮긴다. native 공통 후행행이 꼭 필요하다는 추가 요구가 있을 때만 postlude scope를 작은 확장으로 검토한다. 마크다운 정의는 공통 native 본문으로 유지한다.
3. **10장:** 현재 SVG의 세 문서 대상은 자료요약(원자료의 입구), 개념·비교, 현재계획이다. 이들 사이 **무방향 세 관계**와 원자료를 ‘읽고 나누기’ 작업 화살표를 구별하여 보존한다. 관련 문서·목차·링크를 갱신한다는 설명을 가까이 두되 필수 생성 순서·자동 양방향 갱신으로 바꾸지 않는다. 기존 SVG text/path 조정이 최소 경로다. 합성 C3/C4의 5방향 edge는 native flow의 분기·합류 **capability 예시**일 뿐 현재 관계 보존이나 drop-in 교정안이 아니다. `links.direction`이 없어 native flow는 이 무방향 의미를 직접 보존하지 못한다. native 관계표로 명시적 무방향 관계를 적는 것은 가능하지만 별도 구도로 비교·검수해야 한다. 요약만 만드는 과정으로 의미를 축소하지 않는다.
4. **12장:** 이 장이 앞 관계의 요약인지 추가 설명인지 먼저 결정한다. 남긴다면 일반 범주 설명을 같은 예제의 기존 문서명·정확한 연결로 바꾼다. document 관계표/실제자료 링크 또는 기존 경로를 잇는 설명 SVG가 지원된다. 이름만 가상의 `.md` href로 만들지 않는다. 다른 기존 대등 범주3열(19/21/22)을 일괄 교정하지 않는다.
5. **15장:** 먼저 판단 H2 아래 두 H3 질문과 원문 목적/가치 문장을 보존하고, 다른 H2를 ‘판단했다면, 작게 시작하기’와 자료 두 개 연결로 둔다. 이 방식은 DOM도 두 역할을 구분한다. 3H2+primary는 크기만 바꾸는 선택 실험이다. 두 판단의 합류선이 꼭 필요하면 기존 SVG 또는 flow.links를 비교한다. 2H2의 더 많은 첫 열 문장/H3가 화면 호흡과 본문 시작선에 미치는 영향은 14→15→16 흐름에서 직접 검수한다.

위 범위는 새 엔진·React·자유 배치 편집기·모든 관계도 component를 만들 이유가 아니다. native 자유 배치가 별도로 요구될 경우 최소 후보는 flow의 위치/연결 경로/edge label/항목 내용 계약이며, source와 읽기 표에서 같은 의미를 보존하는 검증도 함께 필요하다. 현재 validator가 모르는 필드를 수용한다는 사실을 이 확장의 구현 완료로 취급하지 않는다.

## 회귀 계약과 후속 완료 조건

현재의 기술 83 pass와 이전 승인은 새로운 미감의 면책이 아니다. QA 담당이 지적한 `scripts/llm-wiki-typography-qa.cjs:88–107,159–185`는 제목·구절·행·9 SVG 경로/라벨/기하에 대한 현재 계약이다. 올바른 native 전환도 예전 SVG 기대와 불일치하여 regression/contract-invalid가 될 수 있다. 이때 실패를 숨기거나 자동으로 engine bug로 분류하지 않는다.

후속 담당은 원래 baseline을 보존한 채 바뀐 역할·원문/링크·native DOM 또는 SVG 기하에 맞는 계약 변경을 명시 검토하고 현재 입력으로 수집한 manifest/SVG 관측을 다시 실행한다. 원고만 같아도 자산/CSS/runtime 변화는 새 근거를 요구한다. 대상 개별1280/1920 및 영향을 받는 앞뒤 보드, 읽기 전문/링크, 실제 glyph 행/표시크기/소속/contain 배율을 확인한다. 공통 CSS/runtime을 바꾸면 대표 양식·긴 한국어·밝은 실제 UI·사진·다른 주제·읽기·모션 줄이기까지 영향 범위를 확대한다.

이번 감사의 `needs-changes` 기록 완료와 본편 승인을 구별한다. `--require-approved`를 통과한 명시 범위만 승인으로 표현한다. 이번 native 프로브는 실제 화면 크기·수정 후 글자행·읽기/preview/presenter/다른 OS·접근 링크의 실제 탐색을 관측하지 않았으므로 이 항목들은 후속 소유자의 미완료다.

## 직접 반론과 해소

- A→B: 초기에는 legacy/blocks 경로 차이를 일반적으로 전달했으나, 현재 비교 manifest를 직접 읽고 9종 모두 blocks라는 점을 정정했다. B가 인수했고 최종 원인은 동일 parser/조판 엔진에서의 자료·표현 선택으로 좁혔다. legacy는 보충 경로다.
- B→A: permissive validator의 합성 무시 반례를 현26장 renderer bug로 확대하지 말라는 반론을 수용했다. 현26에는 flow 입력이 없어 원인표에서 분리했다.
- 매니저/B→A: 5의 rules는 이미 두 영역 약속이며15의primary만으로역할관계가보장되지않는다는 반론을 수용했다. 2H2+2H3,3H2+primary,flow합류를 각각 실행하고 그 구조·시각 한계를 나눴다.
- B→A: 고정 SVG/문구 회귀 계약이 정당한 재구성에도 실패할 수 있다는 지적을 수용했다. baseline 보존·명시적 역할 계약 변경·현 입력 재관측을 완료 조건에 포함했다.
- B→A: hardbreak검증을표방한초기프로브가br수를반환만하고대조하지않는다는반론을수용했다. 최종은sourceBr/renderedBr수와문자사이[HARD_BREAK]순서모두assert하여13/13을재실행했다. 실제glyph관측과는여전히별개다.
- root/매니저/B→A: 합성 C3/C4의5방향edge를현재10의무방향3관계보존으로소개하면의미변경이라는반론을수용했다. 원래 세관계를 직접 세고 direction:undirected가 무시되는 반례를 추가했다. 가능표와최소명세에서SVG보존을최소경로로수정했다.
- root/매니저/B→A: C2 초기정의문이wiki그룹끝에있었다는반론을수용했다. 최종probe에서는rules와마크다운정의모두두H2앞으로두고body직속/그룹밖임을각각assert했다. 이보강도전체교정/화면승인으로확대하지않는다.
- root/매니저→A: 현재neutral의영향자체를없다고확대하지말라는반론을수용했다. LLM26의명시neutral과비교원고의group/icon tone, blocks생략blue를코드/프로브로구분하고의미색·자료표면시안검토여지를남겼다.
- 매니저가11-check판프로브를독립재실행하며결과JSON의시각을다시기록한일이있었다. 충돌은없었고그뒤A가비교9종검증과원문발췌·무방향관계·br순서프로브를보강하여현재13-check결과를직접다시생성했다. 현재 결과의최종writer는A다.

최종 writer 상태: A의 세 소유 파일 작성 종료. 제품 변경·정본 변경·Git commit/push 없음. 실제 구현/시안/시각 승인 미완료의 이유와 다음 검증은 위에 명시했다.
