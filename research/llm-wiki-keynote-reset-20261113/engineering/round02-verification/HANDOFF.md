# Round02 공개 지원·현재 계약 인계

B `keynote_contract_integrator`. 제품 writer는 stable hold이며 root의 main-02 build/capture 시작 뒤 제품을 더 쓰지 않았습니다. 이번 작업은 자료·의미와 검증 구현의 완료이며 현재 실관측 통과나 시각 승인을 주장하지 않습니다.

## 실제 구현

- `talks/llm-wiki/materials/keynote-notes.md`: 공개 정본의9안정앵커. 전체 정의·파일/raw/wiki/rules·네 약속·원래 다섯 관계와 별도 세 무방향 관계·비교/문서관계/상황/활동 시간표 전문·복사 요청을 담습니다. 현재3/6/15 자료의 정확 구절과 작성 주체·설명용 재구성 지위, 입문자+준비된 팩+15분 가상 조건과 시간 비인과·미실측 한계가 native 문장으로 있습니다.
- `materials/speaker-script.md`: 현재20장 발언 메모·현재장 역링크·공개 해설 앵커·계획35분+질문5분. 구판 번호를 현재 번호로 쓰던 링크를 교정했습니다. `assets/speaker-guide.txt`, 발표 README·자료목록·관련 가이드를 정합했습니다. 진행표의 원래 내용은 `previous-speaker-guide.txt`에 당시 이력으로 보존했습니다(최신 root가 이 파일의 현재판 이행을 명시 허용).
- `qa/keynote-coverage.json`: 원래26주제 각각을 실제 현재 역할ID·대본 앵커/구절·해설 앵커/구절·native 읽기에 연결합니다. 빈 계획 항목이나 미래 장 링크가 없습니다.
- `qa/keynote-current.json`: 현재20역할·native56문구·SVG6개 및 native 지원구절·실제 rect bbox/복수port/무방향3관계, 권위 있는 시작 snapshot에 근거한 원본/역사141파일 보존 계약입니다. 이전71asset와 demo25/test, 시작design3, 동결prototype40/역사fixture를 포함합니다.
- `scripts/llm-wiki-keynote-qa.cjs`: `source` 정적 검사와 `current` 실제 관측 검사를 명시 분리합니다. 현재source/style/runtime/asset/지원/AGENTS/DESIGN/두계약 hash, exact manifest path/SHA·viewport·모든 현재장, Range행/크기/br/강조순서/소속·메타 잘림, SVG contain·전체text/tspan glyph·지위·rectport/선·라벨 관통, 읽기 전체장/native 해설 DOM/실제 링크/width를 검사합니다. 발표와 읽기는 서로 다른 exact pair입니다. `visualApproval`은 항상false입니다.
- 작성 진입: README·발표README·MARKDOWN-FIRST·CONFIG·npm `qa:llm-wiki-keynote`. quiet는 eyebrow/footer만 덜고 본문 영역을 넓히는 boolean이며 필수 본문·자료·읽기 내용을 보존한다고 명시했습니다. A 소유 제품3파일을 B가 수정하지 않았습니다.

## 실행한 검증

정확한 명령·exit·결과 SHA는 [verification.json](./verification.json)에 있습니다.

| 구분 | 실제 결과 | 근거 |
| --- | --- | --- |
| 전체 테스트 | exit0,347/347통과 | [tests.log](./tests.log) |
| 현재 정적 역할·위치·링크·원본 검사 | exit0,1085checks/0invalid/0regression, mode source | [current-source.json](./current-source.json) |
| 동결 교정 전 baseline 실제 CLI | 기대 exit1,72checks/45regressions/0invalid | [historical-baseline.json](./historical-baseline.json) |

새 반례 테스트는 source/관측/coverage/앵커/구절 누락·중복, 오래된hash/다른manifest/다른viewport, 필수본문축소/메타화/소속변경/잘림, 실제강조삭제·순서반전, 다른folder/외부host의같은basename링크, native해설관측누락, 원본bytes변경, rect다중port/끊긴선/가시성/화살표/라벨관통, quiet의기본값·명시false/true·오타·잘못된타입·AST/렌더본문보존을 확인합니다. 이전design/reading의고정26장source테스트는명시된동결before source로분리했고신현재를검사했다고표현하지않습니다. 역사fixture와과거119/11결과는바꾸지않았습니다.

## root가 이어 할 범위

root는 모든 제품 hold 뒤 새 `main-02/`의 전20장 발표1920×1080/1280×720 및 읽기1440×1000/390×844를 수집합니다. 각 SVG metrics/reading metrics는 자기 manifest 경로와 SHA를 식별하며, 읽기metrics에 실제 global supportNavigation 및 공개 notes의 supportDocuments가 포함됩니다. 부모SVGtext의 모든자식tspan glyph는포함하고자식tspan은중복계수하지않습니다. materialKind는실제SVGroot data속성입니다.

```sh
node scripts/llm-wiki-keynote-qa.cjs --mode current --source talks/llm-wiki/slides.md --manifest research/llm-wiki-keynote-reset-20261113/main-02/present-1920/manifest.json --svg-metrics research/llm-wiki-keynote-reset-20261113/main-02/present-1920/svg-metrics.json
node scripts/llm-wiki-keynote-qa.cjs --mode current --source talks/llm-wiki/slides.md --manifest research/llm-wiki-keynote-reset-20261113/main-02/present-1280/manifest.json --svg-metrics research/llm-wiki-keynote-reset-20261113/main-02/present-1280/svg-metrics.json
node scripts/llm-wiki-keynote-qa.cjs --mode current --source talks/llm-wiki/slides.md --manifest research/llm-wiki-keynote-reset-20261113/main-02/read-1440/manifest.json --reading-metrics research/llm-wiki-keynote-reset-20261113/main-02/read-1440/reading-metrics.json
node scripts/llm-wiki-keynote-qa.cjs --mode current --source talks/llm-wiki/slides.md --manifest research/llm-wiki-keynote-reset-20261113/main-02/read-390/manifest.json --reading-metrics research/llm-wiki-keynote-reset-20261113/main-02/read-390/reading-metrics.json
```

실제링크·복사요청선택·전체키이동/읽기행동, 독립적인원본비교초기시각판정과명시범위의 `--require-approved`는root/새검증관소유로남습니다. 알려진실측확인대상은20장필수행동P의32논리px계약입니다. message기본30으로실측되면회귀이며A가문구·역할/조판을교정합니다. body하한을낮추거나source정적통과로실관측/시각승인을대체하지않습니다. 수정 시 동일소유자A/B를재개하고변경뒤영향입력으로새관측합니다.
