# LLM Wiki 원고·자산·실측 회귀 구현

담당은 `/root/typography_engineering_manager/deck_qa_integrator`다. 최신 목표와 담당·미완료의 정본은 root 소유 [WORK_LOG](../../../WORK_LOG.md)다. AGENTS·DESIGN·MARKDOWN-FIRST·CONFIG·발표팀의 A/B 감사와 TYPOGRAPHY_SPEC·MEETING_HANDOFF·엔지니어링 MEETING을 읽고, 기준 `bf3cce13fcab66a6e44896241f508f4fe2d3793e`에서 원고·별도 자산·프로젝트 QA를 구현했다. 같은 작업의 08:20 UTC 모델 스냅샷을 공유했으며 모델은 정확 `gpt-6.1-sol/high/fork_turns=none`이다. 현재 새 화면의 시각 승인은 미확인이다.

## 원고와 자료

`talks/llm-wiki/slides.md`의 26개 제목과 주제는 유지했다. 4/6/12/21/22의 지정 문장은 목적어·서술어가 함께 읽히도록 기존 backslash hardbreak를 사용했다. 6의 공동편집 문장은 두 H2 앞에 두어 AST에서도 공통 조건이 먼저 오게 했고, AI 설명의 두 동사구를 나눴다. 대본 6도 공통 조건→사람→AI 순서로 맞췄다. 4의 도구 예는 접두를 포함한 링크 라벨로 같은 내용을 보존하며 두 H2 앞의 공통 탐색 행으로 옮겼다. 혼합 필수본문의 링크 포함 여부로 자동 축소하지 않는다.

2/17/18/26의 의도한 호흡을 지원되는 본문/인용 br로 명시했다. 15의 선택 질문과 시작 행동도 의미구로 나눴고, 13의 중복 ‘질문’ 라벨을 정리하여 실제 질문이 먼저 보이게 했다. 7/13/23의 글자·표 행/질문 비중은 A의 공용 document 역할 변경을 인수했다. 24는 작은 PRE에서 네 native 문단으로 바꾸어 원요청 전문을 그대로 보존했다. 지원 H3를 제거하고 예제 팩·읽는 방법·원본48장의 세 접근 경로는 하단 탐색 문단에 남겼다. 별도 복사 UI 없이 DOM 선택과 원고 원문 접근을 유지한다.

media의 관계 설명과 그림 읽기 링크를 별도 문단으로 분리했다. 5/11의 반복 하단 비교 설명은 새 그림 안에 같은 의미를 크게 포함하여 그림의 공간을 확보했다. 5의 마크다운 정의와 나머지 관계 설명은 필수본문으로 유지한다. `materials/diagram-reading.md`의 핵심9절은 현재 그림/원본을 모두 열 수 있게 동기화하고, 10/20의 이전 remake도 별도 보존 링크로 남겼다. 11의 두 문서면과20의 밝은 면이라는 옛 서술은 현재 열린 비교축·설명용 재구성으로 고쳤다. README는 최신 명세/RESULT 경로와 과거 감사 이력을 구별한다.

## 별도 새 자산과 보존

새 `assets/typography/` 9SVG는 모두 `data-material-kind="explanatory-reconstruction"`을 명시한다. 원SVG를 덮어쓰지 않았다. 필수 text는44–55 원SVG 단위로 재조판했고, source인 `wiki/`만36으로 구별했다. 원값은 합격 기준이 아니며 실제 contain 후 논리 크기를 root가 관측해야 한다.

| 장·새 파일 | 보존한 대상과 관계 / 재조판 |
| --- | --- |
| 3 knowledge-layers.svg | 원자료3개·개념/비교/현재이해/계획/다음질문과 기존5관계. 라벨·읽고연결·선 대비 확대 |
| 5 raw-wiki-rules.svg | raw3파일·요지/선택이유/남은질문, wiki3범주와 설명, 양 영역을 받치는 rules4약속. 열린 두 영역과 공통 하단; 원자료 소멸 변환 아님 |
| 8 rag-path.svg | 공통 질문·같은 입력3개·출처 대응 근거3개·현재 답. 9와 질문/입력 위치 고정 |
| 9 wiki-path.svg | 개념/비교/현재계획3문서와 무방향3관계·필요한 쪽 재읽기. 새 파이프라인 방향 없음 |
| 10 ingest-map.svg | 세 입력·읽고나누기·요약입구·개념/비교·현재계획·문서목차링크갱신. 무방향3관계 유지 |
| 11 source-concept.svg | 한자료요약/여러자료개념 비교축, 목적과맥락/LLMWiki 원예문, 근거1/3개·연결2개. 두 열린 열, 새 인과 화살표 없음 |
| 14 related-updates.svg | 입문자/준비팩/15분 가상조건과 개념범위/선택기준/작업시간의3대응 |
| 16 purpose-questions.svg | 다음스터디진행안 쓰임과 맥락/선택이유/중요한점/앞으로쓰임의4판단 |
| 20 session-plan.svg | 목표·자작메모2개·네 시간/활동·원자료→개념→비교 한관계·발췌/배분예시·비실측한계 |

A와 매니저가 5의 초기 wiki 44글자에서 인접 baseline 간격28을 직접 반론했다. 이를 수용하여174/222,276/324,378/426으로 분리하고 rules를460/515/575로 재배분했다. AppKit Apple SD Gothic Neo 폭 probe에서 새9SVG의 viewBox 외곽,11 양열,8 근거 박스의 지정 가로경계 침범은 없었다. 이는 브라우저 실glyph bbox·최종 위계 승인을 대체하지 않는다.

## 실제 관측을 받는 프로젝트 회귀

`npm run qa:llm-wiki-typography -- --mode current|baseline --manifest PATH --source PATH --svg-metrics PATH [--output PATH]`로 실행한다. 현재판 source는 `talks/llm-wiki/slides.md`, baseline은 동결한 당시 원고를 쓴다. 파일 I/O는 CLI, 판정은 순수 `evaluate`와 행/경계 함수다. 일반 한국어 검사기·브라우저 라이브러리·제품 경고 UI는 추가하지 않았다.

- current는 기존 `design-review.collectInputs`와 AGENTS/DESIGN의 실제 전체 입력 해시를 manifest에 대조한다. SVG 관측도 동일한 capture hashes, 정확한 manifest 파일 SHA/viewport, source path/asset SHA를 가져야 한다. source만 같고 CSS가 오래된 SVG 관측은 invalid다.
- baseline은 fixture의 교정전 원고 SHA와 완전한 역사 manifest hashes를 대조한다. 현재 runtime이 달라졌다고 역사 실패 증거를 현재판으로 오해하지 않는다.
- 지정 대상은 source AST의 정확 본문과 tag/sourceLine/text 관측을 일대일 대응한다. 삭제·변경·중복·관측 누락은 `contract-invalid`다. literal newline을 split하지 않고 실제 lines[].y로 행을 묶어 지정 서술어 꼬리를 판정한다. 의도된 선언/라벨/짧은 질문 행은 전역 금지하지 않는다.
- 17/18/26은 br 앞뒤 glyph-y와 원문/강조 순서를 확인한다. 추가 자동행이 있으면 실제 경계가 보존되는지를 통과 조건으로 두고 사람이 호흡을 재검토한다.
- 17/18 필수본문과24 네 요청은 computed/effective font와24의 실제 body 안 기하를 확인한다. 6은 선행 공통 AST·직속 DOM·2그룹·전폭p·동등한2열폭·첫본문 기준선을 함께 확인한다.
- 9SVG는 baseline/current 별 visible text multiset을 중복 포함하여 정확 대조한다. 일부 라벨만 남겨 통과할 수 없다. classification과새src·원본보존, actual contain 투영후 필수 크기를 관측한다. 흰 픽셀 수를 세지 않으며 원본 증거면의 실제 색 보존 성공을 기계가 주장하지 않는다.

기술 결과는 [before-qa.json](before-qa.json)이다. 실제 교정전1280 manifest와 SVG관측에 같은 판정기를 실행한 결과는 **exit1,70 checks,44 regression,0 contract-invalid**다. [19개 프로젝트 테스트](../../../tests/llm-wiki-typography-qa.test.cjs)는 실baseline 실패, 실제y/softnewline 구별, 대상누락/중복/삭제, 요청크기, contain, inventory/분류/옛CSS 관측, 구조없는source를 검증하며 모두 통과했다. A 공통42와 함께61개 통과, `git diff --check`도 통과했다. 실제 after pass는 root 새 캡처가 생긴 뒤 동일 명령으로 확인해야 한다.

## 직접 교차 인수

B가 A의 CSS/runtime/test/정본문서 전문을 읽고 document 직접blockquote40,필수32/centered34·meta22–24,선행p 소속/그룹수2 계약을 수용했다. B는 필수본문+탐색행 증가가 SVG 높이를 줄이는 반례와 선행p의43em 상한1376<전체1416인 반례를 직접 제기했다. A가 실제 contain 검수를 완료조건으로 인수하고 공통prelude `max-width:none`을 구현했다. A의5간격·SVG관측생략·누락box throw·partial inventory·source-count throw 반론은 모두 교정/테스트로 인수했다. 매니저의 current runtime freshness·같은source옛CSS SVG관측 반론도 hashes 계약으로 인수했다. A는 마지막19+42 실행과 전문을 직접 재확인했다.

B는 빌드·생성물·브라우저·WORK_LOG를 편집하지 않았다. root after 자료가 나오기 전 제품·지침의 최종 승인은 미확인이다. 이후 새 실제 두 발표/두 읽기와 독립 발표팀의 위계·관계·호흡 판정, 명시 범위 `--require-approved`가 남는다.
