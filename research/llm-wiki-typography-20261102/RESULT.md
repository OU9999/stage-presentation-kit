# LLM Wiki 줄바꿈·배치·자체 제작 면 재교정

본편과 공통 조판을 실제로 수정했고, 첫 수정판에서 다시 발견한 결함까지 교정했다. 최종 원고는 `72f3e1a1a04cab86c82b82162dd5915203069e04fb51f4908603cb503759d5dd`다. 독립 발표팀이 실제 화면을 재검토했고, 아래 명시한 네 범위의 현재 입력 승인 기록을 모두 통과했다. AGENTS·DESIGN·작성 안내도 이번 제작과 반려 운영 범위에 적합하다는 별도 판정을 받았다.

[발표 화면](http://127.0.0.1:4330/presentations/llm-wiki/#4) · [읽기 화면](http://127.0.0.1:4330/presentations/llm-wiki/read.html#24) · [줄바꿈·위계 전후 비교](final/before-after-type.jpg) · [도식·흰 면 전후 비교](final/before-after-diagrams.jpg)

## DESIGN.md가 있었는데도 실패한 이유

지침 파일이 없는 문제가 아니었다. 잘림·자료 보존·입력 대응을 확인한 뒤 그것을 시각적 완성도의 근거로 과대평가했다. 필수 설명과 탐색 정보, 실제 원본 증거와 설명용 재구성 예시를 혼동했고, 한국어의 실제 행과 배치 크기로 축소된 SVG 글자를 충분히 읽지 않았다. 이전 승인을 최종 품질로 보고한 판단은 불충분했다.

| 대상 | 이전 실제 실패 | 이번 실제 교정 |
| --- | --- | --- |
| 4·6·12·21·22 | `합니다.`·`갱신합니다.` 등 서술어만 별도 행에 남음 | 지원되는 명시 개행으로 목적어·행위를 묶고 두 발표 크기에서 실제 glyph 행 확인 |
| 6 | 공동 편집 설명이 AI 열 안에 있어 책임의 뜻이 바뀜 | 두 H2 앞의 전폭 공통 문단으로 이동, 사람·AI 두 열과 첫 본문 기준선 정렬 |
| 17·18 | 의도한 호흡이 합쳐지고 필수 설명이25논리px의 작은 보조문이 됨 | 인용의 두 호흡과 필수32논리px 본문을 복원하고 메타와 분리 |
| 24 | 청중이 읽을 요청은26논리px, 지원 제목은 더 큼 | 목적·자료·정리·확인 네 요청을32논리px 일반 본문으로, 자료 링크는 작은 탐색 행으로 배치 |
| 5·11·20 | 자체 SVG의 흰 재구성면을 원본 매체 보존 예외로 취급 | 검정 무대의 새 자산으로 재설계. 실제 원본 SVG와 자료는 별도 보존 |
| 8·9·10·19 | 첫 수정판에서 답변 호흡·연결선의 라벨 관통·동작 분절을 추가 발견 | 문장 폭과 의미 행, 세 무방향 관계의 외곽 경로를 교정하고 국소 회귀로 고정 |

새 도식은 [9개 자산](../../talks/llm-wiki/assets/typography/)으로 따로 만들었다. 기존101개 LLM Wiki 파일 가운데 의도적으로 수정한 원고·README·도식 읽기·대본4개를 제외한97개는 시작 바이트와 같다. 원본19SVG·이전 remake2·48장 보관·예제 팩·데모·사용자 메모를 보존했다. [보존 대조](round-03/technical/final-preservation.json)

## 실제 협업과 반려 반복

발표팀의 한국어 타이포 감사와 흐름 감사, 두 엔지니어의 공통 조판·원고/자산/검사 구현을 각각 수행했다. 양팀 매니저가 직접 지원 개행, 글 역할, 공통 문단 소속, 재구성 자산, 실제 관측 계약을 합의했고, 실무자는 서로의 전문과 구현을 읽고 반론했다. 팀 구성만으로 승인을 대신하지 않았다. [교정 명세](presentation/TYPOGRAPHY_SPEC.md) · [발표팀 인계](presentation/MEETING_HANDOFF.md) · [직접회의](engineering/MEETING.md) · [구현 인계](engineering/ENGINEERING_HANDOFF.md)

첫 수정판은 root의 실제 검사에서3번 도식의 투영 글크기와22번 꼬리행 때문에 실패했고, 독립 발표팀이9·10 연결선,8·19·22 문장 호흡을 추가 반려했다. 기준을 낮추지 않고 엔지니어에게 재인계해 고쳤다. 실패 원고·화면·판정은 [round-01](round-01/)과 [첫 반려 원문](review/FINAL_VERDICT.round-01.md)에 그대로 남겼다.

두 번째 수정판의 발표52장·읽기52장을 독립 실독한 뒤, 기존 native8 상세 자료의 literal `**` 한 문단도 정상 강조로 고쳤다. 이 마지막 자료 수정 때문에 전체 입력의 해시가 달라져 최종 근거는 round-03에 새로 수집했다. 양판의 모든 PNG가 같다고 주장하지 않는다. 발표39개·읽기2개의 상이한 현재 원본을 다시 직접 읽었고 나머지는 바이트 동일성을 대조했다. [실제 비교](round-03/technical/capture-comparison.json)

## 재발 방지의 실제 변경

- [AGENTS.md](../../AGENTS.md)는 작업 진입 때 DESIGN을 읽고 역할·보존 범위와 현재 판 근거를 인수하도록 연결한다. 기술 통과와 시각 승인, 실제 원본 증거와 재구성 예시를 구분한다.
- [DESIGN.md](../../DESIGN.md#한국어타이포와-읽기)는 필수 본문/탐색 메타, 의미 행·서술어 고립, 원고/DOM 소속, 실제 표시 크기·SVG contain 배율을 검토 항목으로 정한다. 숫자는 역할의 시작값이며 모든 글자의 전역 합격선이 아니다.
- [MARKDOWN-FIRST.md](../../MARKDOWN-FIRST.md#실제-관측의-프로젝트-회귀)는 실제 지원 개행과 회귀 실행을 연결한다. H1 끝 backslash를 새 제목 개행 문법인 것처럼 사용하지 않는다.
- [프로젝트 회귀 검사](../../scripts/llm-wiki-typography-qa.cjs)는 실제 glyph 행·크기·의도 개행·강조·6번 공통 소속·24번 요청 전문·9도식의 투영 크기를 확인한다. [기하 검사](../../scripts/llm-wiki-geometry-qa.cjs)는9·10의 세 무방향 관계와 연속 선·지정 라벨 영역을 확인한다.
- 현재 원고만 같아도 통과시키지 않는다. 공통 CSS/runtime·자산·지침 전체 입력, 동일 캡처의 manifest SHA/viewport/SVG 관측을 대조하고 누락·중복·삭제·오래된 관측은 invalid로 처리한다. 검사 결과는 항상 `visualApproval:false`이며, 검토자의 실제 화면 판정과 분리한다.

정해진 모든 짧은 줄·밝은 매체·3열을 금지하지 않는다. 실제 사진·UI의 고유색을 보존하며 이번 LLM Wiki의 자체 재구성 예시를 검정으로 조판한 결정을 다른 자료의 일괄 필터 권한으로 확대하지 않는다.

## 확인한 결과와 범위

| 확인 | 실제 결과와 근거 |
| --- | --- |
| 교정 전 실패 재현 | 최초70항/회귀44, 추가 계약을 반영한 확장72항/회귀45, 모두 invalid0. 두 이력을 분리 보존. [확장 baseline](round-02/technical/baseline-expanded.json) |
| 첫 수정판 반려 | 당시 current68항/회귀2 및 독립팀의 추가 시각 반려. 나중의83항 결과와 같은 항목 수로 비교하지 않음. [기술 반려](round-01/technical/) |
| 현재 알려진 회귀 | 발표1280×720·1920×1080 각각83항/회귀0/invalid0. [1280](round-03/technical/current-1280.json) · [1920](round-03/technical/current-1920.json) |
| 코드·생성물 | 전체317테스트 통과. 마지막 문서 강조 교정 후 build:site·verify:site와 diff --check 재확인. [테스트](round-02/technical/test.txt) · [현재 사이트 검증](round-03/technical/verify.txt) |
| 현재 캡처 | 발표2크기·읽기1440/390 각26장, 입력 불일치·누락0. [현재 입력 대조](round-03/technical/final-capture-inventory.json) |
| 읽기 상세 | 두 폭에서8개 도식 설명+활동안, 총18회 실제 클릭·귀환. 모바일 표는 실제 가로 입력으로 오른쪽 끝262까지 읽음. [동작 기록](round-03/reading-actions.json) |
| 선택·자료·발표 조작 |24네요청을 두 폭에서 실제 선택해 전문 보존, 자료5링크·UTF8 팩·원본부록19그림 로딩, 키1→26/Home/End/전체보기26→17 선택 통과. [동작 기록](round-03/final-actions.json) |
| 공통 변경 대표 | 다른 주제의 표·단계·사진/editorial·밝은 가상 문서·quote·bento,13질문/단계,읽기/모션 줄이기를 확인. 마지막 변경은 native8 자료뿐이므로 동결된 공통 입력의 [12개 대표 관측](round-02/common/verification.json)을 범위 한정 재사용 |

현재 회귀 실행 예:

```sh
npm run qa:llm-wiki-typography -- --mode current --manifest research/llm-wiki-typography-20261102/round-03/present-1280/manifest.json --source talks/llm-wiki/slides.md --svg-metrics research/llm-wiki-typography-20261102/round-03/present-1280/svg-metrics.json --output /tmp/llm-wiki-current-qa.json
```

## 독립 판정과 남은 한계

발표팀이 직접 작성한 장별 판정·이유를 root가 바꾸지 않고 네 기록으로 통합했다. 발표1920×1080·1280×720, 읽기1440×1000·390×844 각26장에 대해 `--require-approved`가 모두 exit0이며 개선 필요·미확인0이다. 입력/증거의 유효성 통과와 실제 시각 판정의 이유는 서로 다른 근거다.

[발표1920 승인 기록](final/present-1920.review.json) · [발표1280 승인 기록](final/present-1280.review.json) · [읽기1440 승인 기록](final/read-1440.review.json) · [읽기390 승인 기록](final/read-390.review.json) · [4범위 검사 결과](final/approval-checks.json)

[발표 담당자의 실독과 반론](review/PRESENTATION_REVIEW.md), [읽기 담당자의 실독·정본 적합성 별도 판정](review/READING_POLICY_REVIEW.md), [매니저 최종 판정](review/FINAL_VERDICT.md)에 구체 이유를 남겼다. 현재 AGENTS `c1c6ff5a…108a7`, DESIGN `ca0f0277…519c6`, MARKDOWN-FIRST `ff0afb67…f9f85f`에 추가 정본 수정 요구는 없다. 이는 이번 실제 교정과 관측·반례 운영의 적합성 판단이다.

390 읽기에서 도식의 모든 세부가 inline 축소만으로 읽히는 것은 아니다. 보이는 상세 링크와18px native 설명으로 같은 의미에 접근하는 경로를 함께 확인했다. 좁은 문단의 추가 자동행과 일부 문장 끝 분절은 실제 문단의 귀속·행간·연속 읽기를 근거로 비차단으로 판단했으며, 발표 병렬열의 고립 서술어와 구별했다. 다른 OS 글꼴·현장 프로젝터/객석 거리·실제35분 낭독·청중 이해 효과는 검증하지 않았다. 검사와 독립 검토가 모든 미래 디자인 실수를 없애 준다고 주장하지 않는다.

최종 검수 뒤 사용자가 이번 새 수정의 커밋·푸시를 추가 요청했다. `0c8aa78`(공통 조판), `68d6000`(LLM Wiki·회귀), `80b38b7`(지침·검수 근거)을 `origin/main`에 일반 푸시했고, 원격 SHA와 로컬이 같은 것 및 직후 clean 상태를 확인했다. [실제 Git 결과](final/publication.json)를 남겼다. 이 확인 문서와 WORK_LOG도 별도 마감 기록 커밋으로 동기화하며 최종 SHA는 Git 이력과 사용자 보고에서 확인한다. 공개 호스팅의 배포 상태는 검증하지 않았다.
