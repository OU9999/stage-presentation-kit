# Main02 기술 10회귀 교정 인계

2026-11-16 · `/root/devday_creation_manager`. 최신 WORK_LOG/DESIGN·MAIN_BRIEF·main01 인계를 다시 읽고 같은 A/B를 follow-up했다. 정확 모델은 같은 작업 snapshot의 `gpt-6.1-sol / xhigh / fork none`이다. 이번 범위는 실제 기술 실패10건이며 본편14의 편집이나 전체 미감 승인을 대신하지 않는다.

## 실제 실패와 좁힌 소유

정본 실패는 [main01 발표1920 QA](../main-01/present-1920/qa.json)의 **2438항·invalid0/regression10**이다. 원문/캡처/관측과 main01 proof는 수정하지 않는다.

| 실제 실패 | manager가 직접 대조한 관측 | 이번 교정 범위 |
| --- | --- | --- |
| 05 `처음 계획` 필수 상태 단서 | source34px, 실제 contain 뒤30.377483 논리px. 32px 필수 하한 미달이다. | A가 새 devday comparison의 해당 CSS 크기만 교정한다. 필수 의미를 source metadata로 낮추지 않는다. |
| 08 순수 작성지위 | 독립 `<text class="meta">`의 작성지위이며24sourcepx/23.60논리px다. 조건·선택 본문과 구별된다. | B가 현재 계약에서 source 역할을 원본의 실제 별도 class/역할 근거로 명시한다. 기존 SVG는 보존하고 필수 조건/선택의 body32는 유지한다. |
| 11 TH2/TD6 | 실제 font32·`directBody:false`·`domParent.tag:TR`. 계약의 true가 source 표 구조와 불일치했다. | B가 source AST의 표셀/TR 소속과 직접 본문 아님을 일반 분류하고 실제 관측을 엄격히 대조한다. |

A의 단독 writer는 `assets/devday/same-question-comparison.svg`의 필수 라벨 크기다. B는 현재 QA 계약/script/관련 tests와 별도 main02 proof/결과를 맡고 manager는 이 인계만 쓴다. 소유/보존 범위를 각각 직접 전달했고 A/B의 수신 확인을 받았다. 원고·14·기존8자산·공통 parser/model/blocks/styles/deps·역사 pilot/fixtures·과거 증거는 읽기 전용이다. root만 full tests/build/browser/capture/관측 helper·Git·WORK_LOG를 쓴다.

manager는 old main01의08/11 PNG도 직접 읽고 순수 작성지위와 표셀의 실제 의미를 확인했다. 이는 기술 역할 교정의 근거이며 새 판의 시각 승인이 아니다.

## 실제 자산 변경과 검증 경계

A는 comparison의 `.state`만 **34→37px**로 수정하고 실제 FINAL로 writer를 종료했다. manager가 현재 파일과 역사 round02 파일을 별도 비교해 그 한 CSS 치환만 다름을 확인했다. 원문·좌표·구도·색과 현재 원고는 그대로다.

- 현재 comparison SHA256: `8af85adfb586a18daa56ece5c21067be2fb7958a818f85df49dd54ca2d582b98`
- 역사 round02 comparison SHA256: `435063bf0d2507c1f7ad3e6426d79c79192f47a26f2f1b327a98b8fbf9c19c42`
- 현재 원고 SHA256: `5dfe035552381afc176ec07b0b2d6f10b8d292bd3fd83820a459b5c6ea0ee4d0`

같은 contain 배율의 예상은 **33.057850논리px**다. 이것은 계산이며 새 실제 통과가 아니다. 자산 변경 뒤 old main01 manifest/metrics는 새 현재 입력으로 승계하지 않는다. 옛 관측의 계약 진단과 root의 새 main02 실측을 구별하고 hash·실관측 누락 실패를 유지한다.

## 마감과 다음 범위

B의 현재 계약은08 작성지위 한 항목만 `source`/22논리px·실제 `sourceClass:meta`·명시 역할 이유에 연결한다. 별도 조건/선택 네 문구는 모두 body32 그대로다.11의 TH2/TD6은 source AST의 TR에 귀속하고 `directBody:false`, 실제 TR 부모 관측, body32/reading18을 요구한다. 한국어 문구 allowlist·필수 하한 완화·기존 SVG 수정은 없다.

- [현재 source 결과](main-02-source-proof.json): **1357항·invalid0/regression0·exit0·`visualApproval:false`**. manager도 실제 CLI를 별도 실행해 같은 통과를 확인했다.
- 관련 테스트: `node --test tests/llm-wiki-keynote-qa.test.cjs` **19/19 통과**. 표셀 부모 누락/변조·축소·metadata 전환을 두 모드에서 거절하고 SVG 실제 클래스/역할 이유 누락과 필수 본문 축소를 거절한다. B가 실제 실행했다.
- [좁은 입력 proof](main-02-input-proof.cjs)와 [실제 결과](main-02-input-proof.json): **11/11 통과**. manager는 코드를 읽고 결과11입력을 별도 재해시해 불일치0을 확인했다. runner가 JSON을 쓰므로 manager는 재실행하지 않았다.
- [옛 캡처의 현재성 거절](main-02-old-capture-rejection.json): **2471항·invalid1/regression1·exit2**. `current-inputs` 불일치로 old manifest/metrics를 거절했고 작은 옛 필수 글자의 회귀도 남는다. 이는 진단이며 현재판 통과가 아니다. old main01의2438/0/10 원문은 그대로 보존했다.

이번 제작팀의 변경은 다음9파일이다. 원고·공개 자료·14·old assets·공통 runtime과 main01 결과는 변경하지 않았다. root의 새 빌드/관측/로그는 이 목록과 구별한다.

```text
talks/llm-wiki/assets/devday/same-question-comparison.svg
talks/llm-wiki/qa/keynote-current.json
scripts/llm-wiki-keynote-qa.cjs
tests/llm-wiki-keynote-qa.test.cjs
research/devday-fidelity-20261116/production/main-02-source-proof.json
research/devday-fidelity-20261116/production/main-02-old-capture-rejection.json
research/devday-fidelity-20261116/production/main-02-input-proof.cjs
research/devday-fidelity-20261116/production/main-02-input-proof.json
research/devday-fidelity-20261116/production/main-02-handoff.md
```

A/B가 현재 제품·QA 입력 hold를 직접 확정한 뒤 root에게 재빌드/수집 가능 범위를 통보했다. 이후 두 담당자 모두 실제 FINAL로 **모든 writer 종료**를 통보했고 manager도 이 최종 인계 뒤 종료한다. A/B는 폰트와 필수 계약/실측 경계를 직접 주고받았고 manager는 실제 실패/원본·새 코드/양부정 검사를 대조했다. full tests/build/browser/capture·Git·WORK_LOG 쓰기는 제작팀이 실행하지 않았다.

새 실제 크기·전체 네 관측 범위·독립 전체 검수는 root의 다음 범위다. 폰트37의32논리px 통과는 새 실측으로 확인해야 하며 source/관련 테스트 통과를 그 대신 쓰지 않는다.14는 앞뒤 자료 사이 recap으로 유지 가능한지 독립 검증에서 판단한다. 현재 본편 전체·읽기·사용자 미감 승인도 미완료다.
