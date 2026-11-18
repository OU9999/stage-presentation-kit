# Round-03 실제 교정 · 현재 엔지니어링 인계

재개/취합 `/root/engineering_audit_manager/qa_workflow_integrator`, 2026-11-13. 독립 디자인의 [round-02 반려](../design/DESIGN_REVIEW_SYNTHESIS.md)를 받아 기존 소유자가 실제 재교정했다. 같은 `gpt-6.1-sol/high/none`과07:48:39Z 모델 스냅샷을 재사용했으며 새 팀·브라우저를 만들지 않았다. source freeze 뒤 root가 실제 화면/관측을 수집하고 같은 디자인 담당이 독립 재판정한다. 기술 pass를 새 시각 승인으로 바꾸지 않는다.

## 현재 변경과 보존

- A는3의 하단 자료명·발췌 지위·결론 소속과5의 열린 자료 그룹/공통 rules 여백을 재조판했다.3은1500×650·17text,5는1750×750·22text다.3의5노드/5무방향 쌍과5의 정확한 raw목적/이유·wiki구절,세 파일·세 기록 종류·여섯 wiki역할·네 약속·원문/상세 링크를 유지한다.
- B의 원고 변경은 **18장의 두 개행 추가만**이다. 모든 단어와 기존 두 책임 사이 개행을 보존했다. `누구를 위해 무엇을 만들지 / 목적은 직접 정하고, / 감정 · 생각 · 판단 · 선택 이유를 / 직접 남깁니다.`의 네 의미행으로,주어/부사구와 서술어를 함께 읽게 한다. 원래 큰 인용의1br·강조와 원문/내 기록/AI요약·해석 구분은 그대로다. 채택된10·12·15와 다른 모든 장의 원고가 이전과 동일함을 전체 source 비교로 검사한다. 대본의 단어·의미도 바뀌지 않아 추가 서술 수정은 필요하지 않다.
- 전역 폰트 축소·nowrap·공통 CSS/runtime 변경은 없다. 채택된 디자인 원칙/brief/레시피는 유지하고,새 필수 읽기 회귀의 명령·관측 범위/누락 invalid만 MARKDOWN-FIRST에 짧게 연결했다.

3의 ‘발표팀 구성 예 · 부분 발췌’는 목적 heading 옆의 발췌 지위 메타로 옮겨 source30으로 분류했다.5의 같은 표지 두 개는 각 raw/wiki header 곁의 source32다. 이 표지는 주장·관계·조건 본문이 아니며 원래 desc/alt/실제 상세의 설명용 예시 지위도 보존한다. 이전 essential 분류를 영구 의무로 고정하지 않되,필수 역할의 최소32논리px는 낮추지 않았다. source로 분류했다고 클립을 허용하지 않으며 현재 bbox 검사는 **메타를 포함한 전체 지정 text**가 viewBox 안에 남는지 확인한다. 실제 근접/판독은 다시 사람이 본다.

## 원고와 관측 계약

발표 회귀는 기존119항의 역할·min32·소속·관계 검사를 유지한다.3/5의 현재17/22라벨과 sourceMeta1/2,분류 이유만 새 자산에 맞췄다.9/10의 엄격3노드/3쌍 검사와 역사 fixture는 바꾸지 않았다. SVG 전체 재고는9개다.

18의 읽기 호흡은 새 `scripts/llm-wiki-reading-qa.cjs`로 **native CSS px**를 검사한다. 발표1600×900 논리 캔버스나 contain 배율과 섞지 않는다.

```sh
node scripts/llm-wiki-reading-qa.cjs --metrics research/llm-wiki-design-iteration-20261113/round-03/reading-18-lines-390.json --source talks/llm-wiki/slides.md --output research/llm-wiki-design-iteration-20261113/round-03/qa-reading-390.json
```

필수 관측은 root의 기존 `capture-reading-lines.mjs`/`reading-line-metrics.mjs`가 수집한다. `coordinateSpace:native-reading-CSS-pixels`,현재 source revision·전체 렌더/역할 계약 hash,정확한 read390 manifest 경로/SHA,390×844/DPR1/18장과 sourceLine/tag/text·Range행의 실제 x/y/width/height·개행 앞뒤 glyph·강조·DOM 소속을 요구한다. 잘못된 입력·viewport·manifest·누락은 invalid다.18body의18CSSpx와 body직속 소속,세 source/실제 glyph 경계,문단 중간을 포함한 모든 실제 행에서 지정 ‘정하고,’/‘남깁니다.’ 단독행 부재,인용1경계와 강조,출처구분 본문을 검사한다. 다른 장의1br 검사를 완화하지 않는다. 현재 CLI는 실제 canonical입력/계약 SHA를 대조하고 결과의 기준·근거 SHA를 남기며 성공에도 `visualApproval:false`다.

## 동결 근거와 before → after의 구별

변경 전에 round-02의 source revision `becd7a8d7a6bde3b4929b9214ac8a29630da3c6c2e1c027c26953378365b7b31`,fixture SHA `295b1f85089bdfef888110a72dfea0b47c9dd87324dbfb22bd5f157b706ca530`와 현재 파일을 대조했다. 원고·currentfixture·QA CLI·당시 새 의미 테스트는 `round-02/source/`의 기존 파일을 보존하고 누락만 새로 만들었다. 이전 기술 인계 전문은 [round-02 인계 사본](../round-02/engineering/ENGINEERING_HANDOFF.md)에 보존했다. 기존 review 원문/수동 JSON/round01·02·before와 원본·역사 fixture는 덮어쓰지 않았다.

| 근거 | 실제 상태와 의미 |
| --- | --- |
| 역사 타이포 baseline | [72항 중45회귀/invalid0](historical-baseline.json). 변경하지 않은 역사 fixture와 source/관측의 실패 재현이다. |
| 디자인 교정 전 | 동결83항 pass와3/5/10/12/15의5needs. 서로 다른 기술/시각 결과다. |
| round-02 | 발표 두 크기119/0/0,독립 수동104조합 중95approved/9needs.3·5의 네 화면8건과39018 한 건이며 [일반check4성공/require-approved4실패](../round-02/review-checks.json)다. |
| 새 읽기 기준으로 동결 round-02 재평가 | [reading-round02-regression.json](reading-round02-regression.json)은 실제 옛 Range행 ‘정하고,’/‘남깁니다.’ 두 개를 찾아8검사/3회귀/invalid0을 재현한다. 추가된 authored 경계 개수의 실패뿐 아니라 실제 단독 glyph행을 별도로 기록한다. |

읽기 재평가에서 **capture의 당시 fixture SHA**와 **새 평가 기준의 fixture/reading-role SHA**는 별개다. 새 reading 계약은 round-02 당시 fixture에 없었다. 결과는 동결 source/readmanifest/sidecar와 당시 capture SHA로 입력 동일성을 검증하고,새 reading 기준으로 다시 평가한 근거다. 이를 current production CLI 결과나 새 화면의 pass로 보고하지 않는다. 현재값 검사는 반드시 root가 새로 수집한 현재 sidecar를 사용한다.

## 현재 검증과 다음 인수

관련 계약62테스트와 전체 `npm test`335개 pass/0fail을 확인했다. 새4개 읽기 테스트는 실제 옛 두 꼬리행 재현,누락/다른 범위/오래된 근거 invalid,같은y의 문자열 newline을 실제 행으로 오인하지 않는 반례,모든 원문/기존 인용·강조를 유지한 국소 개행과 다른 장 불변을 검사한다. A의 source 발췌 identity를 직접 인수하고 원문 부분구절과 raw/wiki/rules 역할 보존 테스트도 유지했다.

root의 현재 [발표1280 회귀](../round-03/qa-1280.json)와 [발표1920 회귀](../round-03/qa-1920.json)는 각각119/0invalid/0regression이다. [별도 읽기390 회귀](../round-03/qa-reading-390.json)는 실제 새 native Range로11/0/0이며,모두 `visualApproval:false`다. 현재 source revision은 `8fa3d55cd5d92c13d20ffd40434f1725ee093c289dea4365015d0a894c659a84`,fixture SHA는 `ca8033d7fa838c74cca055b2f2c07650c4ed51262b7b12e8fce900fbb5071b34`다. 새읽기 evidence SHA `c6b283adc4a56793972d2e33c45aa11fed094b9d3d58bf7d088d5c81f1656023`와 read390 manifest SHA `def29ef5a94939589ac81d874cf8d803de9b7cfdbc0a98e51070761f84473c44`를 결과에서 직접 대조했다.

실390/18 body의18CSSpx·네 actual Range행은 y221.273 ‘누구를 위해 무엇을 만들지’,253.672 ‘목적은 직접 정하고,’,286.070 ‘감정 · 생각 · 판단 · 선택 이유를’,318.469 ‘직접 남깁니다.’다. 실제 단독 ‘정하고,’/‘남깁니다.’가 사라졌고 세 authored 경계·인용의 원래1경계/강조·출처구분이 관측됐다. 합성 pass로 채우지 않았다.

B의 직접 현재 이미지 확인은1280의3·5·18과390읽기18이다. A는1280/1920의3·5를 직접 읽고 source 메타의 bbox도 대조했다.5 wiki 개념 label 끝1397.172와 source 시작1410 사이 gap12.828SVGpx,source 끝1720.930은1750 안에 남는다.3 meta 끝551.086도 프레임 안이다. 기술상 클립 반례는 해소됐으나 약12px로 표시되는 메타의 실제 판독·계층과3/5의 전체 조판,18의 네 화면 호흡은 독립 디자인팀이 재판정한다. 이 자체 관찰을 새 시각 승인으로 보고하지 않는다.

root가 새 네 화면의 전26장·9SVG/네이티브 읽기 관측을 인계한다. 현재 제품/문서/CLI/fixture는 freeze이고 A와의 기술 인터페이스 불일치는 없다. B의 모든 소유 writer는 작성 종료한다. 독립 시각 `needs-changes`가 남으면 같은 소유자를 재개해 실제 새 입력으로 반복하며,명시 scope의 `--require-approved` 성공 전에는 본편 승인으로 보고하지 않는다. 실제 프로젝터/다른OS·실낭독·청중 효과는 미확인이다. 커밋·푸시·배포는 수행하지 않았다.

이전 구현·검증 세부는 [변경 전 round-02 인계 사본](../round-02/engineering/ENGINEERING_HANDOFF.md)에 원래 바이트로 보존했다. 그 문서의 당시119/58/331 결과와 essential 분류·hold/종료 진술은 당시 판의 이력이며 현재 round-03 결과로 승계하지 않는다.
