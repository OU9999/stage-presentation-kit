# Main03 독립 반려 교정 인계

2026-11-16 · `/root/devday_creation_manager`. 최신 WORK_LOG·DESIGN·[MAIN03_PRODUCTION](../MAIN03_PRODUCTION.md), main02 발표/읽기 초기·최종과 [검증 취합](../review/main-02/manager-summary.md), 네 원문80행의 상태/이유/다음 행동을 읽고 같은 A/B를 follow-up했다. 모델은 같은 작업 snapshot의 `gpt-6.1-sol / xhigh / fork none`, DESIGN은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다.

이전 본편 원문은 발표 각07, 읽기1440의07/15,390의03/07/15인 **7 needs-changes**다. root가 원문을 바꾸지 않은 normal4 exit0·`--require-approved`4 exit1을 보존했다. 기술2471/2499·365테스트로 그 반려를 해제하지 않았다. 이번 인계는 교정 입력과 정적 검증이며 본편 전체/사용자 미감 승인이 아니다.

## 소유·정확 교정

A는 현재 원고03의 의도 개행/07 alt와 새 `assets/devday/connected-documents.svg`만, B는 공개 해설·대본·current/coverage/observation 정합과 좁은 proof/취합을 단독 소유했다. manager는 이 파일만 작성한다. 각 소유 변경과 읽기 전용 범위를 직접 전달했고 양쪽 수신 확인 뒤 재개했다. root만 빌드·브라우저·캡처/관측·full tests·최종 CLI·Git·WORK_LOG를 쓴다.

| 범위 | 실제 교정과 보존 |
| --- | --- |
| 03 정확 선택 이유 | 모든 단어·순서·마지막 ‘이 메모를 골랐다’ 강조·사람/자작 예시 지위를 그대로 두고4 authored 의미행으로 편집했다. ‘다음 스터디의 진행안을’ 뒤에 실제 hardbreak를 두어 다음 ‘만들고 싶어서’를 함께 읽는다. 현재 계약의 기존 `forbiddenRows`에 실제 고립 ‘싶어서’를 지정했다. 코드 allowlist·글자 축소·하한 완화는 없다. |
| 07 현재 계획 | 06 갱신 제목과 같은 **입문자와 하는 첫 위키 활동**으로 맞췄다.55sourcepx를 유지하고 ‘입문자와 하는 / 첫 위키 활동’ 두 행으로 배치했다. 기존192높이 안에서 role/문서 baseline만 조정했고 rect·3node·3edge·ports·선d·marker0과 입구/개념비교 소속은 그대로다. alt·공개절·대본·필수 support 구절도 같은 현재 시점이다. |
| 공개03/15 | 구현 용어 native/prefix/caption을 원문 인용·선택한 구절의 시작·작성 지위에 관한 독자 말로 정리했다.15 질문 전체를 독립 강조 문단으로 써 실제 material parser에서 정상 strong이 되게 했다. 정확 목적·입문자/준비된 팩/본편 뒤 별도15분·자작 가상 지위·논리 원문 경로를 보존했다. |

14 recap 유지와15 읽기의 원순서/세로거리 수용은 확정된 보존 결정이다.14/15 본문이나 구도에 추가 재설계를 하지 않았다. 공통 parser/model/runtime/CSS/의존성·QA 코드/tests·역사 pilot/기존 자산·실패/옛 proof/검수 원문도 수정하지 않았다.

manager는 old main02의390/03, 발표06/07, 지원15 양폭 PNG를 직접 읽어 실제 고립행·제목 충돌·literal 강조기호를 확인했다. 이는 이전 실패의 대조이며 새 화면 승인이 아니다.

## 현재 입력과 검증

- 원고 SHA256: `1245269027b87f6e3fe18bff9507ef3ea2d5ff64f9747cc6b27a56f40415f6ec`
- 현재 관계 SVG SHA256: `f7bf509bc27ec3a5b8af5b87a98bac250b9af5d9de3b40583178743aa196b5b7`
- manager의 별도 parser/model/planner 검사:20장·issue0·구도 경고0.03의 정확 문장/강조 보존,14/15 AST 동일(position/origin 제외)을 확인했다.
- manager의 실제 XML 대조:3node/3edge·직접 RECT 속성과 edge 전체 속성 동일,marker0·문서55px 유지. 바뀐 제목의 실제 glyph/배치 승인은 새 관측으로 별도 확인한다.
- manager가 실제 material parser/renderHTML을 별도 실행해15 절의 literal `**` 없음과 정확 질문의 `<strong>`을 확인했다. 공개03/15와7의 지원절을 직접 읽어 지위/현재 제목 대응도 확인했다.
- [source 정적 결과](main-03-source-proof.json): **1365항·invalid0/regression0·exit0·`visualApproval:false`**. manager도 같은 source CLI를 독립 실행해 통과를 확인했다.
- [관련 테스트 실제 stdout](main-03-related-tests.txt): **19/19 통과·실패/취소/생략0**. B가 기존 관련 테스트를 실행했으며 공통 QA 코드/tests는 바꾸지 않았다.
- [좁은 입력 proof](main-03-input-proof.cjs)와 [실제 결과](main-03-input-proof.json): **10/10 통과·`visualApproval:false`**. 정확 선택 이유·03 실제 br 경계/고립행 계약·07 시점/기하·실제 강조 렌더·독자말/가상조건·공통 코드/옛 자산과 네 원문 review SHA 보존을 확인한다. runner는 JSON을 쓰므로 manager는 재실행하지 않고 코드를 읽고 결과15입력을 별도 재해시해 불일치0을 확인했다.

```sh
node scripts/llm-wiki-keynote-qa.cjs --mode source --source talks/llm-wiki/slides.md
node --test tests/llm-wiki-keynote-qa.test.cjs
```

이 정적/소스 결과를 old main02 실제 glyph의 실패 해제나 새 현재 QA 통과로 부르지 않는다. root가 별도로 실행하는 old 실제 행/제목/markup의 before-fail→new 실제 after-pass proof와 구별한다.

## 정확한 변경 파일

이번 제작팀 변경12파일이다. 이전 main01/02 인계·결과·실패·검수 원문은 보존했으며 root의 로그/관측/빌드/캡처는 이 목록과 구별한다.

```text
talks/llm-wiki/slides.md
talks/llm-wiki/assets/devday/connected-documents.svg
talks/llm-wiki/materials/keynote-notes.md
talks/llm-wiki/materials/speaker-script.md
talks/llm-wiki/qa/keynote-current.json
talks/llm-wiki/qa/keynote-coverage.json
talks/llm-wiki/qa/keynote-observation.md
research/devday-fidelity-20261116/production/main-03-source-proof.json
research/devday-fidelity-20261116/production/main-03-related-tests.txt
research/devday-fidelity-20261116/production/main-03-input-proof.cjs
research/devday-fidelity-20261116/production/main-03-input-proof.json
research/devday-fidelity-20261116/production/main-03-handoff.md
```

## 입력 freeze·종료·다음 범위

A/B가 원고/자산·공개 자료·현재 QA JSON의 hold를 먼저 직접 확정해 root의 작은03/07 양폭 checkpoint를 열었다. root는 checkpoint-02의 네 개별을 직접 읽어 네 의미행·현재 제목 두 행과 관계/지위 유지에 첫 실물 추가 반려가 없다고 통보했다. **이는 root의 작은 checkpoint 확인이며 전체/독립 시각 승인이 아니다.** 그 뒤 root는 같은 입력으로 main03 네 범위 전체 수집을 시작했다.

남은 production proof 마감 뒤 A/B 모두 실제 FINAL로 모든 writer 종료를 통보했다. manager도 이 최종 인계 뒤 종료한다. 새 입력 hold는 유지하며 제작팀은 자기 미감을 승인하지 않는다. root의 새 네 범위80PNG·actual glyph/표/지원14절/키보드·전문선택 관측과 제작 미참여 검증팀의 실제 재호출, 현재 원문/명시 `--require-approved` 성공이 남아 있다. 실제 발표기기·다른OS·모션·청중효과·사용자 미감은 별도 미확인 범위다.
