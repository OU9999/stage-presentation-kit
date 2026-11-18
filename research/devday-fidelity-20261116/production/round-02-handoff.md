# Round02 구조 교정 제작 인계

2026-11-16 · `/root/devday_creation_manager`.

[ROUND02_PRODUCTION](../ROUND02_PRODUCTION.md)과 [독립 검증 취합](../review/round-01/manager-summary.md), A/B 최종 문서 및 원문16행을 인수해 같은 A/B를 follow-up했다. 모델은 같은 작업의 공식/가용 snapshot에 따른 `gpt-6.1-sol / xhigh / fork none`이다. 최신 DESIGN은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다.

이번 교정은 pilot1/4의 구조 반려에 대응하며 pilot2/3은 보존한다. 이전 네 장의 원문 상태·이유, 캡처·proof는 바꾸지 않는다. round01 명시 전체 scope의 일반 CLI 성공과 `--require-approved` 실패는 역사로 유지하며 새 입력의 시각 승인으로 승계하지 않는다. 제작자는 자기 미감을 승인하지 않는다.

## 소유와 실제 교정

- A `visual_editor`: 새 `prototypes/talks/round-02/assets/**`와 `production/round-02-visual-intent.md`. round01 자산을 복제한 뒤1/4만 교정하며2/3 SVG bytes를 보존한다.
- B `source_integrator`: 새 `round-02/slides.md`·`materials/**`, `production/source-proof-round02.cjs/json`과 취합. 실제 원문·요약/질문·metadata 역할, 공개 지원절을 A와 직접 대조한다.
- manager는 이 인계만 쓴다. 기존 공통 core/CSS/parser·CONFIG/MARKDOWN-FIRST·tests·본편·round01·WORK_LOG·Git는 읽기 전용이다. root만 빌드·브라우저·캡처·최종 통합을 한다.

1은 공통 원자료/답과 동의 설명의 반복을 묶고 남아 다시 읽을 문서를 가장 분명한 차이로 편집한다. 실제 계획 구절은 좁은 세 카드/라벨을 대체하는 자료 단서이며 추가 설명층으로 쌓지 않는다. 같은 질문·둘 다 이번 답·병행 가능, RAG 저장/관계 확장과 위키 검색의 범위를 보존한다.

4는 조건 메모의 정체성과 native 정확 목적 구절을 보존하되 질문·필수 조건을 한 덩어리로 묶고 반복 판단/지위 문단을 덜어낸다. 입문자와 본편 뒤 별도 활동15분은 읽을 본문에 남긴다. 순수 출처/구성예만 기존 image title→figcaption을 사용하고 필수 조건·목적·질문·판단은 metadata로 낮추지 않는다.

manager는 round01의1/4 양폭 실제PNG4개와 보관 Codex01:30·새24:00/25:00 원본을 직접 읽었다. 1의 밝은 답/입력 동의 설명과4의 두 독서면이 경쟁하는 관찰을 A/B에 직접 전달했다. A/B도 같은 실제 자료를 직접 인수했다.

## 현재 정합과 다음 확인

현재 원고 SHA256은 `619000010e74a25f32fe8fa0e8df15d839cc26be1c63e219353acc5315e01912`다. manager는 새 원고·1/4 SVG·[A 인계](round-02-visual-intent.md)·변경된 공개 해설과 proof 조건을 직접 읽었다. 별도 parser/model/planner 실행에서4장·model issue0·media/media/media/split:evidence·경고0을 확인했다.

manager의 읽기 전용 비교에서2/3 본문 AST는 position/origin을 제외하고 동일했고 `connected-documents.svg`·`session-plan-row.svg` bytes도 같았다. 네 SVG를 실제 XML parser로 별도 파싱해 재구성 지위와 viewBox를 확인했다. 새 proof는 전역 덱 수를 품질 규칙으로 고정하지 않고 명시 round02 입력의 네 역할을 검증한다. config는 round01/02를 함께 발견하는 기존 상태를 유지한다.

[새 proof](source-proof-round02.cjs)와 [실제 결과](source-proof-round02.json)는 **16/16 통과·실패0·exit0·`visualApproval:false`**다. manager가 아래 명령을 별도 실행해 같은 통과를 확인했고 결과의 현재26입력을 재해시해 불일치0을 확인했다.

```sh
node research/devday-fidelity-20261116/production/source-proof-round02.cjs
```

정확한 처음 계획 발췌와 상태·요약/정확 구절 구별·native 필수 조건/질문/목적·순수 작성지위 caption·공개20링크/support4·원팩 바이트·보호 원본129파일·round01 입력26개와 과거 proof JSON을 확인했다. 이전 round01의16/16은 당시 실행 근거로 보존했다. manager도 그26입력 불일치0과 기존 관련 테스트 파일의 바이트 보존을 별도 확인했다.

B의 첫 새 proof 실행에서는 작성지위를 alt에만 강제하던 옛 조건1개가 허용된 image title→figcaption 배치와 충돌해 실패했다. 실제 title/alt의 작성지위를 확인하도록 새 proof의 해당 조건을 이행한 뒤16/16이 됐다. 렌더 입력은 그 사이 바꾸지 않았고 옛 proof/code/JSON도 수정하지 않았다. 조건·목적을 metadata로 옮겨 통과시킨 것이 아니다.

이번은 새 격리 원고·자료만의 변경이며 공통 코드·문서·tests를 바꾸거나 테스트를 새로 만들지 않았다. 이전 공용 evidence 변형의 전체360/본편 네 현재 회귀 통과는 root가 인수한 문맥이며 이번 새 실물의 미감 승인이 아니다.

## 정확한 파일과 종료

새 제작 파일은 아래12개다. 기존 config·round01·공통 파일은 변경하지 않았다. root의 빌드 생성물·캡처는 제작팀 목록과 구별한다.

```text
research/devday-fidelity-20261116/prototypes/talks/round-02/slides.md
research/devday-fidelity-20261116/prototypes/talks/round-02/assets/same-question-comparison.svg
research/devday-fidelity-20261116/prototypes/talks/round-02/assets/connected-documents.svg
research/devday-fidelity-20261116/prototypes/talks/round-02/assets/session-plan-row.svg
research/devday-fidelity-20261116/prototypes/talks/round-02/assets/condition-note-selection.svg
research/devday-fidelity-20261116/prototypes/talks/round-02/materials/notes.md
research/devday-fidelity-20261116/prototypes/talks/round-02/materials/reading-pack.md
research/devday-fidelity-20261116/prototypes/talks/round-02/materials/study-pack.txt
research/devday-fidelity-20261116/production/round-02-visual-intent.md
research/devday-fidelity-20261116/production/source-proof-round02.cjs
research/devday-fidelity-20261116/production/source-proof-round02.json
research/devday-fidelity-20261116/production/round-02-handoff.md
```

A/B는 새 자산과 alt/공개절을 마지막으로 직접 대조해 추가 수정 요청0을 확인했다. 먼저 각자의 렌더 입력 hold를 직접 확정해 root에게 통보했고, 이후 A/B 모두 실제 FINAL 응답으로 완료와 모든 writer 종료를 통보했다. manager도 이 최종 인계 뒤 writer를 종료한다. build/browser/capture·Git·WORK_LOG 쓰기는 제작팀이 실행하지 않았다.

## root의 다음 실제 확인

렌더 입력 hold를 먼저 root에 직접 통보한 뒤 새 양폭 네 장·actual glyph/SVG 배율·원본/전후 문맥·필요 읽기/support 행동을 수집한다. 제작팀 종료 후 같은 독립 검증관이1/4를 재판정하고2/3 보존 영향을 확인한다. 구조 반려를 색·간격·기술 통과로 해제하지 않는다.

특히1의 남는 문서가 공통 양끝보다 먼저 읽히는지, 처음 계획의 정확 구절이 차이에 기여하는지,4의 필수 조건/질문→정확 목적→선택 위치가 한 읽는 경로가 되는지는 미확인이다. 새 실물/읽기/support 클릭·실배율·glyph·모션/현장·다른 OS·사용자 미감은 이 정적 결과가 승인하지 않는다. 독립 판정과 현재 CLI의 명시 범위 `--require-approved` 성공 전에는 승인으로 보고하지 않는다.
