# DevDay 첫 네 실물 제작 인계

2026-11-16 · 제작 manager `/root/devday_creation_manager`.

이 문서는 제작 소스와 원문 정합의 인계다. 제작팀은 자기 시안의 미감을 승인하지 않는다. 현재 본편은 사용자 재반려 뒤 `needs-changes`이며, 본편 시각 승인과 사용자 승인은 미완료다.

## 인수한 범위와 소유

- [PRODUCTION_BRIEF](../PRODUCTION_BRIEF.md), [검증 준비 인수](../review/READY.md), [수용 기준](../review/acceptance-final.md), [A 최종](../review/art-direction-final.md), [도구 조사](../review/tooling-initial.md)를 정본으로 인수했다.
- 최신 DESIGN SHA256은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다. root의 새 11월16일 기준을 A/B에게 각각 직접 전달했고, 양쪽 모두 실제 해시 재계산과 해당 문단 실독을 확인했다. 준비 문서의 과거 DESIGN 해시는 당시 근거로 보존했다.
- [model-snapshot.json](../model-snapshot.json)의 2026-11-16T05:49:30Z 공식/가용 catalog를 같은 작업의 배정 근거로 재사용했다. manager/A/B는 정확 `gpt-6.1-sol / xhigh / fork none`이다.
- A `/root/devday_creation_manager/visual_editor`: `prototypes/talks/round-01/assets/**`와 `production/visual-intent.md`. 네 자료 자산의 시각 편집과 실질 초기 초안을 맡았다.
- B `/root/devday_creation_manager/source_integrator`: `prototypes/ou.config.json`, `prototypes/talks/round-01/slides.md`, `materials/**`, `production/source-proof.cjs` 및 정합 결과. config·네 장 원고·공개 해설을 독립 초기 작업으로 작성하고 A 결과를 취합한다.
- 실제 15장 입력을 작성한 뒤, B가 일반 split의 30px 문단과 blockquote 거절 경로를 확인했다. root는 최소 `compose: split` + `variant: evidence` 확장을 승인하고 B에게 `lib/markdown-document.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, CONFIG·MARKDOWN-FIRST의 해당 최소 문법 예, 기존 관련 tests의 단일 writer 소유를 추가했다. 명시 조합에서 image-first 뒤 단일 blockquote와 짧은 p만 허용하며 일반 split·auto·AST·원순서·읽기·sourceLine을 보존한다. 공통 파일의 다른 쓰기 권한으로 확대하지 않는다.
- manager는 이 HANDOFF만 작성한다. root는 WORK_LOG·Git·빌드·브라우저·캡처·최종 통합을 단독 소유한다. 두 실무는 서로 정확 구절·자료 배치·문법 인터페이스를 직접 협의했다.

이번 신규 원고의 1–4장은 기존 본편 05/07/13/15의 역할에 대응한다. 02는 수정하지 않는 선언 문맥이다. 본편·기존 자산·과거 근거와 위 최소 확장 밖의 공통 코드는 읽기 전용이며, 이 네 장을 본편에 이행하는 것은 독립 검증 뒤 별도 단계다.

## 제작 결과와 정적 검증

격리 프로젝트는 `../prototypes/ou.config.json`이며 sourceDir=`talks`, outputDir=`site`다. 기존 공용 엔진을 사용하고 dependency는 추가하지 않는다. 네 장의 발표 자료는 다음과 같다.

| 신규/본편 대응 | 구현과 읽을 대상 | 공개 지원절 |
| --- | --- | --- |
| 1 /05 비교 | native H1의 같은 질문 아래, 이번 입력/답과 지속되는 실제 연결 문서 단서의 두 작업 흐름을 `same-question-comparison.svg`에서 대조한다. 설명용 흐름·병행 가능·성능 우열 미측정을 본문에 표시한다. | `materials/notes.md#검색과-지속-문서` |
| 2 /07 관계 | `connected-documents.svg`의 큰 `LLM Wiki / RAG와 위키 / 다음 스터디의 첫 시도`를 세 영역/세 무방향선에 귀속한다. 자료 요약은 입구이며 기존 문서는 함께 읽고 고칠 대상이라는 의미를 가시 본문에도 보존한다. | `materials/notes.md#세-무방향-관계` |
| 3 /13 결과 문서 | `session-plan-row.svg`는 활동안의 전체 제목, `15분 진행안`, 세 필드와 정확한 6~11분 한 행을 한 밝은 문서면에 묶는다. 표면은 이 재구성에서 선택한 국소 조판이다. | `materials/notes.md#활동안과-미확인-범위` |
| 4 /15 선택 근거 | `condition-note-selection.svg`는 조건 메모의 제목·세 가상 조건·목적 문장의 실제 선택 위치를 담는다. 오른쪽 native blockquote는 정확한 목적 문장을 54px/1.35로 읽고, 재구성 질문과 판단 문단은 구별한다. | `materials/notes.md#선택의-근거-확인` |

15의 네 의미행은 A/B가 직접 협의한 `도구 설치보다 목차와 / 연결을 따라 다음 질문의 / 근거를 찾는 경험을 / 먼저 하고 싶다.`다. 전체 문장을 굵게 만들거나 H2로 바꾸지 않고 단일 native blockquote의 실제 `br`로 작성한다. 현재 표시 크기와 glyph 행은 root의 실제 캡처에서 확인해야 한다.

`materials/study-pack.txt`는 기존 `talks/llm-wiki/assets/expanded-study.txt`의 바이트 사본이고 `materials/reading-pack.md#팩-전문`은 그 전문을 공개 문서로 읽는 경로다. 논리 `.md` 구간명을 독립 파일 링크로 만들지 않는다. raw·위키·결과물 모두 발표팀 자작 설명 예이며 실제 모델 실행·운영/학습 성과로 승격하지 않는다.

manager는 실제 네 SVG 소스·시각 의도 전문·공통 eligibility/CSS·새 양/부정 테스트·문법 예를 읽었다. 별도 읽기 전용 실행에서 현재 원고를 실제 parser/model/planner에 넣어 **4장, model issue0, media/media/media/split:evidence, 경고0, support4개의 정확 origin**을 확인했다. blockquote의 `br`를 공백으로 읽은 목적 문장은 원팩의 정확 문장과 같으며 텍스트 팩 사본의 바이트도 원본과 같다.

B의 관련 네 테스트 파일 실행은 [실제 stdout](related-tests.txt)의 **90/90 통과, 실패/취소/생략0**이다. 새 두 테스트는 단일 인용 eligibility, 부정10형태, 일반 split/auto 비확장, frozen AST·canonical 위치·hardbreak·실제 렌더 DOM 순서·출처·preview 링크를 확인한다. 이는 실제 브라우저 glyph·실배율 검사와 구별한다.

[source-proof.cjs](source-proof.cjs)의 [실제 결과](source-proof.json)는 **16/16 통과, 실패0, `visualApproval:false`**다. 정확 원팩 구간과 공개 발췌·4역할·4support·실제 로컬20링크/앵커·보호 원본129파일을 확인한다. manager가 별도로 다음 명령을 재실행해 같은 통과를 확인했고 결과 JSON의26입력을 현재 재해시해 불일치0을 확인했다.

```sh
node research/devday-fidelity-20261116/production/source-proof.cjs
```

manager는 네 SVG를 실제 XML parser로 별도 파싱했고 모두 재구성 지위·viewBox를 확인했다. 07의 원래 세 영역/세 edge ID와 from/to, marker0도 별도 확인했다. 시작167파일을 현재 재해시한 차이는 root의 DESIGN 보강과 명시 승인된 공통4코드뿐이었다. CONFIG·MARKDOWN-FIRST·테스트의 추가 변경은 아래 정확 목록에 포함한다. 기존 본편·자산·공개 해설·과거 review의 바이트는 보존됐다.

A와 B 모두 실제 FINAL 응답으로 완료와 **모든 writer 종료**를 통보했다. B가 먼저 렌더 입력의 좁은 hold를 직접 확정해 root의 빠른 build/capture를 열었고, 이후 proof·결과·stdout까지 종료했다. manager도 이 최종 HANDOFF 인계 뒤 writer를 종료한다. root에게 각 단계와 소유변경을 일대일 직접 통보했다.

## 정확한 변경 파일

제작팀이 생성·수정한 파일은 아래21개다. `research/devday-fidelity-20261116/` 아래 경로는 해당 prefix를 그대로 적었다. root가 별도로 수정한 DESIGN과 root의 빌드 생성물/캡처는 이 제작팀 목록에 합치지 않는다.

```text
research/devday-fidelity-20261116/prototypes/ou.config.json
research/devday-fidelity-20261116/prototypes/talks/round-01/slides.md
research/devday-fidelity-20261116/prototypes/talks/round-01/assets/same-question-comparison.svg
research/devday-fidelity-20261116/prototypes/talks/round-01/assets/connected-documents.svg
research/devday-fidelity-20261116/prototypes/talks/round-01/assets/session-plan-row.svg
research/devday-fidelity-20261116/prototypes/talks/round-01/assets/condition-note-selection.svg
research/devday-fidelity-20261116/prototypes/talks/round-01/materials/notes.md
research/devday-fidelity-20261116/prototypes/talks/round-01/materials/reading-pack.md
research/devday-fidelity-20261116/prototypes/talks/round-01/materials/study-pack.txt
research/devday-fidelity-20261116/production/visual-intent.md
research/devday-fidelity-20261116/production/source-proof.cjs
research/devday-fidelity-20261116/production/source-proof.json
research/devday-fidelity-20261116/production/related-tests.txt
research/devday-fidelity-20261116/production/HANDOFF.md
lib/markdown-document.cjs
deck-model.js
blocks.js
blocks.css
CONFIG.md
MARKDOWN-FIRST.md
tests/blocks-composition.test.cjs
```

## root의 다음 실제 확인

전원 writer 종료 뒤 현재 공용 엔진으로 격리 config를 빌드·검증하고, 1920×1080·1280×720/DPR1의 실제 stage 네 장과 보드를 수집한다. 기존 04→05→06, 06→07→08, 12→13→14, 14→15→16 및 비수정 02와 함께 놓고 같은 역할의 공식 원본에 대조한다. viewport와 실제 stage 크기, SVG contain 배율과 native glyph 크기를 구별한다.

제작에 참여하지 않은 기존 검증 manager/A/B를 root가 실제 재호출한다. 특히 05의 구체 비교 대상, 07의 실제 문서명과 세 무방향 관계, 13의 한 문서/한 행, 15의 자료 정체성/선택 위치와 큰 목적 구절이 검토 대상이다. 기술 정합은 시각 승인이 아니며 명시 범위의 새 실제 판정과 `--require-approved` 성공 전에는 승인으로 보고하지 않는다.

남은 실제 위험은 05의 문서 객체와 13의 한 행이 최종 contain 크기에서도 읽히는지, 15의 조건 문서와 native54px 목적 구절이 다른 무게로 연결되는지, 세 관계 접점이 실제 표시에서 분명한지, 네 장과 앞뒤 흐름이 다른 자료 역할로 읽히는지다. 읽기/support 클릭·다른 OS·모션/현장·사용자 미감은 이번 제작 정적 검사로 확인하지 않았다. root는 관련 전체 테스트와 영향 runtime smoke/현재 회귀를 마감하며, 실제 시각 veto는 구조 수정과 재검수로 해소한다.
