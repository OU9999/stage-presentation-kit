# Main01 본편 이행 인계

2026-11-16 · 제작 manager `/root/devday_creation_manager`.

[MAIN_BRIEF](../MAIN_BRIEF.md), 최신 WORK_LOG/DESIGN과 [round02 검증 취합](../review/round-02/manager-summary.md), A/B 최종 판정을 읽고 같은 제작 A/B를 follow-up했다. root는 원문 상태/이유를 바꾸지 않은 네 `--require-approved` CLI 성공을 인수했다. 그 승인 범위는 격리 네 역할×두 발표폭뿐이며 새 본편·읽기·사용자 미감으로 승계하지 않는다.

## 소유와 보존

- A `visual_editor`의 새 단독 writer는 실제 `talks/llm-wiki/slides.md`와 새 `talks/llm-wiki/assets/devday/**`다. 채택05/07/13/15 이행,3/6 자료면 교정,전체 구도/서사를 맡는다.
- B `source_integrator`는 현재 공개 해설/대본·진행표·필요한 자료 역링크·README·현재 역할/coverage/관측 계약·정합 proof와 취합을 맡는다. 실제 표현 갭에 한해 현재 QA script/관련 tests를 최소 일반 확장한다.
- manager는 이 인계만 쓴다. 공통 parser/model/blocks/styles/dependency·기존 모든 자산과 과거 시안/proof/검수 원문은 읽기 전용이다. root만 WORK_LOG·Git·빌드·브라우저·관측 helper를 쓴다. 새 소유 변경은 A/B 각각 직접 전달하고 양쪽의 수신 확인 후 재개했다.
- 같은 작업의 model snapshot을 공유하며 정확 `gpt-6.1-sol / xhigh / fork none`을 유지한다. DESIGN SHA256은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다.

3은 사람이 채울 선택 이유의 자작 예,6은 같은 팩의 논리 계획 구간의 실제 전후 상태다.5의 처음 계획→6의 가상 조건 반영→15의 목적 대조를 연결한다. 원래26주제의 의미는 실제 공개절/대본/지원 앵커에 보존하고 장수20을 영구 고정하지 않는다.12/18의 유효 병렬을 형식 할당량 때문에 폐기하지 않는다.

root의 색 범위 보충도 A/B에게 직접 전달했다. 검정 Stage와 공통 코드는 유지하며 기존 tone·문장 강조·자료 고유색은 의미의 위계에 맞게 선택할 수 있다. 기존 neutral을 영구 고정으로 삼거나 색 수를 채우는 방식으로 해석하지 않는다.

## 관측 계약의 정확한 갭

B는 현재 `nativeNodes()`가 원고 AST의 h/p/li 등을 열거하지만 image title에서 생기는 실제 FIGCAPTION을 표현하지 못하고, 인용 P의 BLOCKQUOTE 부모를 강제할 계약이 없음을 확인했다. 새 관측 역할은 원래 image title/sourceLine과 실제 FIGCAPTION/FIGURE 소속에 대응하며, native 인용은 정확 P/BLOCKQUOTE 소속을 대조한다. 원문 AST·필수 본문32 이상·정확 원문/관계·실관측/현재 hash 누락 실패를 유지하고 한국어 문구 allowlist를 쓰지 않는다.

root의 새 `line-metrics-current.mjs`·`reading-line-metrics-current.mjs`는 실제 FIGCAPTION/P tag·sourceLine·domParent·Range/glyph/크기를 수집한다. B에게 두 경로와 필드를 직접 전달했고 B는 현재 추가 필드가 필요 없다고 확인했다. 순수 작성지위/출처만 caption으로 분류하며 조건·판단·목적을 작게 내려 검사를 회피하지 않는다.

## 빠른 checkpoint와 남은 범위

현재 본편은20장이고 source SHA256은 `5dfe035552381afc176ec07b0b2d6f10b8d292bd3fd83820a459b5c6ea0ee4d0`다. A는3/5/6/7/10/13/15를 이행했고 새 devday 자산5개를 작성했다. manager의 실제 parser/model 검사는20장·issue0·구도 경고0이며 채택 네 SVG는 round02와 바이트 동일하다.

3은 native 선택 이유의 큰 정확 인용과 출처/자작 예시 문단으로 바꿨다.6의 새 `plan-revision.svg`는 같은 논리 계획의 실제 H1/조건을 전후 필드로 대응하며 도구 실행 diff로 주장하지 않는다.10은 사람이 직접 기록한다는 의미 단위에 기존 orange tone을 선택했다. A는 전체 원고 역할과 기존20장 보드3개를 재검토했고 유효 단문·12/18 병렬을 유지했다.

**14는 아직 기존 본문이며 구체 사례화의 편집 판단이 미완료다.** 첫 새3/6 실물 뒤 같은 계획에서 후속 질문/검토할 답으로 이어지는 구체 사례가 필요한지 판단한다. 이를 전체 편집 완료나 미감 승인으로 보고하지 않는다.

새3/6과 채택 네 역할이 본편에 놓인 렌더 입력 hold를 먼저 인계했다. A는 실제 FINAL로 본편/새 자산 writer를 종료했다. B도 공개 자료·README/진행표·QA current/coverage/observation·QA script/관련 tests의 추가 쓰기를 중지하고 hold를 직접 확정했다. root에게 각 범위를 직접 통보했으며 남은 B writer는 production의 실행 결과/좁은 proof뿐이다. 전체80관측 마감 뒤로 첫 구조 반려를 미루지 않는다.

현재 계약은20역할·63 native(실제 FIGCAPTION3 포함)·6SVG·7support다. manager의 source QA 독립 실행은 **1340항·invalid0/regression0·pass·`visualApproval:false`**였다. B는 관련 QA17/17 통과를 보고했고 새 caption의 실추출/본문 면제 금지·quote 부모 누락/변조·06 대응선 실관측의 누락/변조를 두 모드에서 확인했다. 실행 정본은 아래 인계에서 연결한다.

관계도07의 `data-node-id`는 G에 있으나 실제 영역은 직접 자식 RECT다. B가 발견한 관측 갭을 root에게 직접 전달했고 root는 새 helper에서 정확히 그 RECT의 bbox/경계 ports를 관측하도록 교정했다.06의 from/to 없는 두 필드선은 `geometry.correspondences`,07의 graph refs가 있는 세 무방향선은 `geometry.relations`로 분리한다. B QA는06의 실제 points/가시성/marker도 검증하며 정적 선 ID만으로 실측 통과라고 보고하지 않는다. 역사 helper와 채택 SVG는 보존했다.

## 실제 검증 결과

- [현재 source 결과](main-01-source-proof.json): **1340항·invalid0/regression0·pass·`visualApproval:false`**. manager도 실제 source CLI를 별도 실행해 같은 통과를 확인했다. 원래26주제의 현재 공개절/대본 목적지·63 native·6SVG·7support가 정적 위치에 대응한다.
- 관련 테스트: `node --test tests/llm-wiki-keynote-qa.test.cjs` **17/17 통과**. B가 실행했고 [정합 결과](main-01-input-proof.json)에 명령/exit0/17pass를 인계했다. 새 pure caption의 source 추출·본문 면제 거부·quote 부모 누락/변조·06 대응선 실측 누락/변조를 포함한다.
- [역사 baseline 결과](main-01-historical-baseline.json): **72항·invalid0/regression45·기대한 exit1**. 교정 전 역사 실패의 재현이며 새 현재판 통과나 승인으로 쓰지 않는다.
- [좁은 원문/채택 proof](main-01-input-proof.cjs)와 [실제 결과](main-01-input-proof.json): **9/9 통과·`visualApproval:false`**. 선택 이유/목적의 정확 native 인용, 같은 계획의 실제 두 제목/조건, 필드 대응 정적 계약, 채택 네 SVG 바이트, 현재 source 결과의 source hash를 확인한다. 이 runner는 결과 JSON을 쓰므로 manager는 재실행하지 않고 코드를 읽고 결과10입력을 현재 재해시해 불일치0을 확인했다.

manager는 채택 네 SVG 바이트 비교와 source/parser 검사를 독립 실행했다. 시작 기록의 기존 자산81개도 현재 재해시해 불일치0을 확인했다. 의도적으로 갱신한 `assets/speaker-guide.txt`는 이 보존 검사에서 제외했다. 공유 parser/model/blocks/styles나 옛 assets/keynote/design/archive를 이번 단계에 수정하지 않았다.

```sh
node scripts/llm-wiki-keynote-qa.cjs --mode source --source talks/llm-wiki/slides.md
```

## 정확한 제작팀 변경 파일

아래20개는 본편 입력·QA의 최소 확장과 인계 결과다. root의 WORK_LOG·관측 helper·빌드 생성물/캡처는 이 목록과 구별한다.

```text
talks/llm-wiki/slides.md
talks/llm-wiki/assets/devday/same-question-comparison.svg
talks/llm-wiki/assets/devday/connected-documents.svg
talks/llm-wiki/assets/devday/session-plan-row.svg
talks/llm-wiki/assets/devday/condition-note-selection.svg
talks/llm-wiki/assets/devday/plan-revision.svg
talks/llm-wiki/materials/keynote-notes.md
talks/llm-wiki/materials/speaker-script.md
talks/llm-wiki/README.md
talks/llm-wiki/assets/speaker-guide.txt
talks/llm-wiki/qa/keynote-current.json
talks/llm-wiki/qa/keynote-coverage.json
talks/llm-wiki/qa/keynote-observation.md
scripts/llm-wiki-keynote-qa.cjs
tests/llm-wiki-keynote-qa.test.cjs
research/devday-fidelity-20261116/production/main-01-source-proof.json
research/devday-fidelity-20261116/production/main-01-historical-baseline.json
research/devday-fidelity-20261116/production/main-01-input-proof.cjs
research/devday-fidelity-20261116/production/main-01-input-proof.json
research/devday-fidelity-20261116/production/main-01-handoff.md
```

## writer 종료와 다음 행동

A/B는 각각 실제 FINAL로 첫 checkpoint의 **모든 writer 종료**를 통보했다. manager도 이 최종 인계 뒤 writer를 종료한다. 먼저 렌더 입력 hold를 직접 합의/통지해 root의 소수 실물 수집을 열었으며, 그 뒤 production proof만 마감했다. 제작팀은 build/browser/capture·Git·WORK_LOG 쓰기를 하지 않았고 자기 미감을 승인하지 않았다.

남은 담당은 root와 제작 미참여 검증팀이다. 먼저 새3/6과 채택 네 역할의 본편 배치·앞뒤 흐름을 실제 양폭에서 판정한다.14의 구체 사례 편집은 그 실물 뒤 별도 재개할 A/B의 미완료 판단이다. 전체 본편·읽기·support 동작·실배율/glyph/관계 및 대응선 기하·모션/현장·다른OS·사용자 미감은 이 정적 결과로 승인하지 않는다. 이후 현재 네 관측 범위와 독립 원문/명시 `--require-approved` 성공이 결합된 범위만 승인으로 보고한다.
