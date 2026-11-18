# Round03 지원·역할·회귀 인계

B `keynote_contract_integrator`. production writer는 stable hold입니다. root가 main-03 build/capture를 시작할 수 있도록 제품 정합을 보고서보다 먼저 고정했습니다. 이후 변경은 이 연구 검증 기록뿐입니다. 현재 실관측 통과·시각 승인·사용자 승인으로 표현하지 않습니다.

## 구현과 직접 합의

- 현재 역할 계약은20장/native55/SVG6/자료별 support6입니다. 모든 sourceLine·자료의 text inventory·강조·hard break·소속·링크와 대본/진행표/README를 A 최종 원고에 맞췄습니다. 원26주제 coverage는 실제 현재 역할ID·대본·공개 해설/native절의 경로·앵커·구절을 유지합니다.
- H1의64 일괄 계약 오류는7의 `media-support-heading`54,9/17의 `quote-context-heading`38이라는 **세 명시 역할만** 교정했습니다. 독립 검증관의 main-02 실제 역할 판정을 `roleReason`에 남겼습니다. 다른 H1·필수본문32·읽기표18 하한은 유지합니다.20의30px 실행P는 A가 반복 행동을19에 귀속하고 실제 제거했으며10의 책임 문장은 의미 hard break/강조를,11표는 실제18px를 사용합니다.
- 새6은 정의 반복 대신 같은 `wiki/syntheses/study-plan.md`의 처음/갱신 조건을 정확 발췌한 자료입니다. 새15는 발표용 확인 질문·판정과 원자료의 정확한 목적 구절을 대응시킵니다. 공개 해설/현재 대본에서도 이 구분과 가상 조건·시간 비인과·실제 모델/사용자/활동/효과 미실측 지위를 유지합니다.
- A 단독 공용5파일의 `support:{label,href}`와 B의 QA/tests/작성안내를 일치시켰습니다. 명시 탐색은 원고 본문 AST와 별도이며 parser가 `origin:{line,endLine}`을 부여합니다. ref kind support→등록 public material+실재 anchor 검증→`.html#anchor` 변환→실제 sibling DOM으로 이어집니다. query·remote·slides·일반 asset·비등록/private Markdown은 거부합니다. 생성 deck의 `.html#anchor`는 browser model 검사에서 유효합니다.
- 읽기 DOM은 `p.markdown-support[data-copy-role="support"][data-source-line] a`입니다. actual href/label/sourceLine/copyRole/18CSSpx/Range glyph/slide-local rect/visible 관측을 `row.supportLinks`에 별도로 요구합니다. unrelated global navigation이나 다른 유효 anchor로 대체할 수 없습니다. 이미지 `readingSupport`와 source/역할 support가 같은 정확 native절을 가리키며 required 구절이 그 절에 실재해야 합니다.

| 자료 장 | 제어 sourceLine | 실제 공개 native 절 |
| --- | --- | --- |
|3|25|`keynote-notes.md#선택-이유-메모`|
|6|66|`keynote-notes.md#계획이-바뀐-근거`|
|7|79|`keynote-notes.md#세-무방향-관계`|
|8|94|`keynote-notes.md#원자료와-정리한-이해`|
|13|172|`keynote-notes.md#활동안과-미확인-범위`|
|15|210|`keynote-notes.md#선택의-근거-확인`|

root는 정확 selector/origin/visible 필수성·URL 수집 수정·두 폭 자료별 클릭 계약을 직접 인수했습니다. 원래141파일 보호 계약과 역사45회귀는 유지했습니다. main-02 원고/runtime/assets104 snapshot과 그 PNG/판정/partial 실패를 수정하지 않았습니다.

## 실제 실행 결과

정확 명령·exit·입력/결과 SHA는 [verification.json](./verification.json)에 있습니다.

| 검사 | 실제 결과 | 근거 |
| --- | --- | --- |
| 전체 테스트 | exit0,355/355통과 | [tests.log](./tests.log) |
| 집중 역할/지원/렌더 테스트 |37/37통과|[focused-tests.log](./focused-tests.log)|
| 현재 source 정적 검사 | exit0,1205checks/0invalid/0regression, `mode: source` | [current-source.json](./current-source.json) |
| 역사 baseline 실제 CLI | 기대 exit1,72checks/45regressions/0invalid | [historical-baseline.json](./historical-baseline.json) |
| main-02 동결104입력 SHA 재확인 |104개 중 mismatch0|[main02-failure-history.json](./main02-failure-history.json)|

새 의미 있는 반례는 malformed source/model support, source-only origin 입력 거부, 다른 덱 공개 material+anchor 빌드·compiled model 검증, remote/query/private/slides/assets/없는 anchor 거부와 마지막 성공 출력 보존, 원고 AST/렌더 본문·preview 보존, 명시 sibling/sourceLine, 실제support 누락·중복·잘못된 role/origin·숨김·16px·glyph 누락·클리핑·다른 host/folder/다른 유효 anchor, 이미지와 지원 절의 불일치입니다. 생산 장수20 상수 검사는 실제 deck/role inventory 대조로 바꿨으며 원래26주제 고정은 의미 보존 계약으로 유지합니다.

main-02 기술 결과는 파일 SHA와 실패 목록을 기록한 역사입니다. 그4개 발표 font 결과 중3개는 당시 H1 역할 계약 오류,20본문30<32와 읽기표16<18·모바일 책임 꼬리행은 실제 제품 문제로 구분합니다. 당시 URL/notes query 관측 누락은 기존 결과 그대로 남깁니다. 새 계약이나 수집기를 과거 관측에 소급 적용해 pass로 바꾸지 않았습니다.

## 남은 실제 확인

root가 main-03의 발표1920/1280와 읽기1440/390를 새로 수집하고, 각 exact manifest/metrics 쌍에 현재 CLI를 실행합니다. 명령은 작성 안내의 네 범위와 같고 경로만 main-03으로 지정합니다. 자료별 직접 링크의 두 폭 실제 클릭→정확 native 절·구절·관계/조건의 읽기, native 표/책임 행, 전편 주역·자료·흐름의 독립 시각 재검수와 명시 범위 `--require-approved`는 아직 이 B 결과에 포함되지 않습니다.

실관측 누락이나 새 반려는 같은 소유자A/B가 교정합니다. 필요 시 production hold를 먼저 해제·통보하고 현재 입력을 바꾼 뒤 새 관측을 수집합니다. source 정적 통과나 테스트 수량을 실관측/시각 승인으로 대체하지 않습니다.
