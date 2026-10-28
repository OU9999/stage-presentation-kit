# 공통 학습 자료 빌더 인수 검수

2026-10-28 · 기준 main `4c2e2fa` · manager `/root/llm_engineering_manager`.

사용자의 별도 공부 자료·대본·정보 모음 요구에 맞춰 일반 `materials/*.md`를 발표와 별도의 정적 HTML로 생성하는 경로를 통합했다. 실제 14장 발표와 자료 5개로 복사·빌드·이동·링크를 검증했다. 최종 전체 회귀와 공개 전달은 root가 수행한다.

## 직접 인수와 실질 분담

공통 WORK_LOG·CONTRACT와 root의 helper/template API를 읽고 디자인 manager와 직접 인수회의를 했다. 디자인팀 전원의 final과 편집 종료를 확인한 뒤 기존 두 실무자를 새 작업으로 재개했다. 이전 capacity 복구나 새 중복 팀 생성이 아니다.

- A `/root/llm_engineering_manager/integration_reviewer`: `scripts/stage.cjs`의 프로젝트 통합을 실제 구현하고 B 결과를 취합했다. 인계받은 `scripts/materials.cjs`, `templates/material.html`, `templates/materials.css`는 변경하지 않았다.
- B `/root/llm_engineering_manager/source_materials`: `tests/materials.test.cjs`의 독립 계약 회귀 11개와 MARKDOWN-FIRST의 일반 작성 안내를 실제 작성했다. A 구현을 직접 읽고 회귀를 실행했다.
- A는 B 테스트·안내의 초안과 최종 실물을 읽고 회신했고, B도 A 코드·helper·template·CSS를 읽어 직접 회신했다. 최종 교정 요청은 0건이다. 양쪽이 각각 대상 검사 24개를 직접 실행했다.
- 두 실무자의 기존 설정은 `gpt-6.1-sol / high / fork none`이다. 공통 계약·구현·경계 검증 판단을 위해 사용했으며 root가 같은 작업에서 확인한 2026-10-28 08:45 UTC 공식 최신 모델/runtime catalog 스냅샷을 공유했다.

root만 WORK_LOG·최종 생성물·브라우저·Git·README를 소유했다. 발표/대본/학습 원문과 root 소유 blocks.css는 freeze를 유지했다. 새 브라우저 Space를 만들거나 이전 사용자 Space를 조작하지 않았다.

## 구현 계약과 실제 결과

`talks/<주제>/materials/` 바로 아래의 일반 Markdown을 발견하고 선택 title/description/order, H1과 H2/H3 목차를 사용한다. 주제명을 코드에 고정하지 않았다. 자료는 발표 장수에 포함하지 않으며 `presentations/<주제>/materials/<이름>.html`로 생성한다.

자료 간 Markdown·한글/중복 heading fragment·같은 문서 anchor·자료에서 `../slides.md#숫자`로 복귀·슬라이드에서 자료로 진입하는 링크를 등록된 대상에 맞춰 변환한다. 코드 블록의 가상 경로는 파일 참조로 처리하지 않는다. 임의의 다른 Markdown과 없는 index.md 링크는 거절한다. source index.md가 없으면 자료 한 개만으로 자동 hub를 생성한다.

manifest는 자료가 있는 덱에만 `links.materials`와 자료별 source/title/order/revision/href를 추가한다. deck JSON은 바꾸지 않고 발표/read HTML과 모음에 진입점을 둔다. 자료 CSS는 프로젝트 `_runtime/materials.css`에 한 번 복사하고 hash로 참조한다. 기존 base RUNTIME 7개 목록을 늘리지 않았다. 자료가 없는 덱은 자료 template/CSS에도 의존하지 않는다.

자료 자산은 슬라이드와 같은 덱의 내용 hash 파일로 공유한다. 자료·자산·template·CSS를 dependency/watch에 넣어 누락 후 복구도 처리한다. 오류는 source 파일·해당 문단 시작 행·원문 참조를 보여 준다. 정확한 문자 offset을 얻기 위한 markdown-it private API는 추가하지 않았다. check는 임시 예상 출력을 비교하며 실제 출력은 고치지 않는다. 참조 오류 시 전체 last-good를 유지한다.

manager가 초기 diff에서 발견한 호환 반례도 교정했다. `materials`라는 이름의 기존 덱 전체를 제외하던 필터를 실제 owning deck 아래의 자료인지 구별하도록 바꿨다. B는 기존 `talks/materials/slides.md` 덱과 다른 덱의 `materials/slides.md` 자료가 함께 보존되는 회귀를 추가했다.

## 실제 실행 검수

상세 해시·명령·출력과 담당별 검증 범위는 [verification.json](verification.json)에 보존했다.

| 실행·확인 | 결과 |
| --- | --- |
| A와 B 각각 `node --test tests/materials.test.cjs tests/stage-project.test.cjs tests/site-build.test.cjs` | 각각 24/24 통과: 신규 자료 11 + 기존 13 |
| 실제 14장·자료 5개의 독립 복사 CLI build/check | exit 0, differences 0 |
| 같은 프로젝트 이동 후 CLI 재빌드 | 출력 22파일 / 593,941 bytes, 모든 파일 바이트 동일 |
| 생성 HTML 참조와 자료 anchor | 전체 로컬 370참조, 자료 HTML 338참조 해결 |
| 원고/자료/자산 | 복사 입력 SHA·자료 source/revision 5개·내용 hash SVG 3개 일치 |
| 실제 기존 4원고 HEAD/현재 빌더 비교 | 동일한 현재 runtime/template/config에서 출력 48개 전부 바이트 동일 |
| B 별도 2덱 HEAD/현재 비교 | 출력 16개 전부 바이트 동일 |
| 문법·공백 | `node --check`, `git diff --check` 통과 |

새 11개 회귀는 raw HTML escape, 코드 내 구분자/가상 링크, Unicode·중복 heading, 양방향 링크·fragment·출력 참조, 자동/명시 index, 공유 자산, 오류 진단·last-good, 자료 없는 덱, 자료 이름과 덱 이름 충돌, 프로젝트 이동·실제 CLI, check의 바이트/mtime 비수정, dev 변경/누락 복구를 다룬다. 디자인의 제한된 동등 3열 글자 규칙과 기존 primary 보조 열·읽기 글자 규칙의 보존도 정적으로 확인했다. CSS 정적 검사를 화면 가독성 합격으로 대신하지 않았다.

manager는 최종 stage diff·helper/template·11개 테스트·안내를 실제 읽었다. 새 자료 5개를 별도로 파싱해 H2/H3 93개와 로컬 원문 링크 62개의 파일·heading·14장 범위 누락 0을 확인했다. A의 최종 검증 프로그램도 전체 읽고 직접 재실행해 14장/5자료/370참조/입력 해시/check 0을 확인했다.

manager가 이동한 임시 프로젝트에서 별도 check를 실행해 출력 바이트와 mtime 모두 비수정, 현재 자료 5개의 source revision 일치, 모든 자료 heading fragment 실재, 원래 talks 폴더 의존 0도 확인했다. 이 별도 검사의 파일 경로를 가진 로컬 참조는 175개(자료 147개)이며, 같은 문서 anchor까지 포함하는 A의 370개(338개)와 집계 기준을 구분한다.

## 종료와 root 인계

A와 B는 모두 final·편집 종료를 직접 통지했다. source 통합·helper/template/자료CSS·테스트·작성 안내의 소유권을 root에 인계한다. manager는 이 REVIEW와 verification.json 두 검수 파일만 작성했다.

root의 초기 실제 검수에서 14장 Stage·Paper 6장·기존 primary 보조 열, 동등 3열의 32/40px, 자료 5개 desktop/mobile 전문 순서·revision·18px 본문·가로 넘침 0, native 메뉴 Enter와 코드 키보드 가로 스크롤이 통과했다는 보고를 받았다. 팀의 정적/임시 빌드 검증과 root 브라우저 검증을 구분한다. root는 이어서 전체 탐색·발표자·모바일 header·인쇄/전체 회귀·verify·commit/push·Pages를 마무리한다. 이 문서는 그 후속 절차의 완료를 미리 주장하지 않는다.
