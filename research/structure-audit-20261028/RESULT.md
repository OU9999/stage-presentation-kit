# 재사용 구조와 폴더 구조 점검

2026-10-28 · 기준 `ccb25ed` · 제품/기존 원고/기존 보고 변경 없이 검사했다.

**현재 엔진은 다른 발표와 별도 프로젝트에 재사용할 수 있다. 다만 공통 변경의 배포 준비, HTML 템플릿 경계, 새 작성자의 시작점은 추가 정리가 필요하다.** 폴더 이름을 바꾸는 것보다 전체 배포의 갱신·검증 절차를 먼저 통합하는 편이 효과적이다.

## 우선 발견 사항

### 1. P2 — 공통 변경을 전체 공개 결과에 동기화하는 단일 명령이 없다

[package.json:7](../../package.json#L7)의 `npm run build`는 새 Markdown 프로젝트만 생성한다. [stage.cjs:161](../../scripts/stage.cjs#L161)은 현재 runtime을 `presentations/_runtime`에 복사하고 새 HTML의 hash를 계산한다. 기존 예제·독립 스타터 갱신은 별도 [build-examples.cjs:8](../../scripts/build-examples.cjs#L8) 경로다. [루트 index.html:10](../../index.html#L10)의 hash는 두 명령 모두 자동 갱신하지 않는다.

격리한 kit에서 공통 blocks.css에 주석을 추가한 뒤 **실제 `npm run build`**를 실행했다. 새 발표의 runtime/HTML hash는 갱신됐지만 visual-starter·text-layout의 사본과 루트 hash는 이전 값이었다. 예제 갱신 명령까지 실행하면 두 사본은 맞춰지지만 루트 hash는 여전히 이전 값이었다. 이 실험은 실제 저장소를 수정하지 않았다.

현재 배포본은 이전 작업에서 전체를 동기화·검수했으므로 이 발견이 현재 화면의 잘못된 색/스타일을 뜻하지 않는다. 이후 공통 엔진을 고칠 때 일부 예제가 뒤처지거나 같은 캐시 주소를 계속 쓰게 될 수 있는 유지보수 빈틈이다.

권장: 빠른 원고 작성용 build/dev는 유지하고, root hash·기존 예제·새 발표·runtime 사본을 함께 갱신/검증하는 `build:site` 또는 release 명령을 둔다. 생성물 불일치 검사는 날짜별 연구 폴더의 수동 실행에서 정규 검증 절차로 올린다. 배포 시 원고만 고치고 이전 생성물을 올리는 경우도 함께 검출한다.

### 2. P2 — 루트의 실제 공개 화면과 발표 HTML 템플릿이 같은 파일이다

[stage.cjs:162](../../scripts/stage.cjs#L162)은 공개 루트의 `index.html`을 새 발표의 template으로 읽는다. [stage.cjs:113](../../scripts/stage.cjs#L113)은 그 HTML의 스크립트·header·helpDialog를 문자열 규칙으로 바꾼다. 기존 빌더도 [markdown-deck.cjs:268](../../scripts/markdown-deck.cjs#L268)에서 같은 파일을 사용한다.

격리한 root HTML을 발표 모음 링크가 있는 단순한 첫 화면으로 바꾸자 새 Markdown build가 `발표 template에 helpDialog가 없습니다.`로 실패했다. 마지막 정상 출력은 보존됐다. 첫 화면의 역할을 바꾸는 작업이 발표 엔진의 내부 HTML 계약까지 건드리는 구조다.

권장: 공통 발표 DOM을 `templates/presentation.html`로 분리하고 모든 생성 경로에서 사용한다. 공개 첫 화면의 목적과 기존20장 모음의 주소는 별도로 결정한다. 현재 배치/CSS/디자인을 바꾸지 않고도 이 경계를 분리할 수 있다.

### 3. P2 — Markdown 사용자를 위한 독립 스타터와 폴더 역할 안내가 부족하다

새 추천 흐름은 `talks/*/slides.md`지만 [README 파일 구성:76](../../README.md#L76) 표는 기존 content.js 경로 위주이며 talks·presentations·blocks·stage.config의 역할이 빠져 있다. [배포 문서:11](../../DEPLOYMENT.md#L11)의 모음 설명도 실제4개 원고를 아직2개로 소개한다.

기존 examples 안에는 slides.md에서 생성하는 content.js와 직접 작성하는 content.js가 함께 있다. 파일 첫 주석과 개별 문서는 이를 구분하므로 원본 구분 장치가 전혀 없는 것은 아니다. 폴더 이름만 보고 시작하는 작성자에게는 세 경로가 같은 수준으로 보인다.

새 사진 예제 폴더만 다른 프로젝트로 복사하면 공유 사진이 없어 실패하고, 공유 assets까지 옮겨도 [다른 덱의 reading.txt](../../talks/photo-essay/slides.md#L96)가 없어 실패했다. 이 예제의 교차 링크는 의도된 시연이며, 생성한 모음 전체를 공유하라는 [현행 안내](../../MARKDOWN-FIRST.md#L22)와 구분한다. 작성용 예제 폴더 하나가 독립 스타터 역할까지 하지는 않는다.

권장: `slides.md + assets/ + 짧은 README`로 구성한 Markdown 스타터 하나를 제공한다. 새 사용자에게는 이 경로를 기본으로 안내하고, 기존 content.js/전용 Markdown은 호환 예제로 명확히 표시한다. 공유 자산과 다른 발표 링크의 의존성도 구분한다. 기존 URL을 유지하면서 문서부터 개선할 수 있다.

## 유지할 좋은 경계

| 현재 위치/모듈 | 역할과 판정 |
| --- | --- |
| `talks/<주제>/slides.md` | 작성 원본. 새 주제 추가를 폴더/원고 추가로 처리 |
| `stage.config.json` | 원고·출력 위치/테마를 한 곳에서 설정. 외부 config와 중첩 폴더 지원 |
| `scripts/markdown-document.cjs` | Markdown을 의미 AST로 변환하고 source 위치를 보존 |
| `deck-model.js` | Node/browser 공통 검증·순수 배치·공유20아이콘. DOM 의존 없음 |
| `blocks.js`, `visual.js` | 본문/시각자료의 표현. app에서 위임하고 공통 모델을 사용 |
| `app.js` | 재생·읽기·진단·발표자·기존 편집 UI 조정 |
| `presentations/` | 공유용 생성물. 덱별 내용/자산과 공통7 runtime을 포함 |
| `examples/` | 기존 작성 방식의 호환 예제와 생성물. 원본 종류를 문서에서 더 명확히 안내할 대상 |
| `research/` | 연구·검수·화면 근거. 제품의 runtime 원본과 구분할 자료 |

본문을 여러 파일에 다시 쓰거나 주제별 renderer를 복제하지 않는다. 새 bento/wall은 H2/목록 본문과 공통 planner를 사용한다. 실제 별도 프로젝트에서2개 덱4장을 만들고, 중첩 경로·동일 파일명의 다른 이미지·상호 read#2·첨부·로컬 HTML 참조를 확인했다. 전체 프로젝트 이동 후19파일의 재build 바이트가 같았고, 첫 덱의 본문/이미지 변경 후 두 번째 덱의 모든 파일이 그대로였다. 이 부분은 재사용이 실제로 성립한다.

생성 runtime 사본은 독립 실행·정적 공유를 위한 결과물이다. 사본의 존재보다 그것을 누락 없이 갱신하는 절차가 점검 대상이다.

## 후순위 정리

기준 commit의 추적 파일은1,338개/188.80MiB이며 research가1,156개/166.65MiB,약88.3%다. 현재 Markdown 공유 출력 전체는4.40MiB다. 신규 사용자용 시작 자료에는 거대한 연구 이력을 함께 복사할 필요가 없도록 경량 스타터/배포 범위를 명시하면 좋다. 비용의 대상은 저장소 복제와 전체 정적 배포이며, 발표 페이지는 참조한 파일을 로드한다. 기존 근거를 삭제할 필요는 없다.

app.js는1,384줄이고 native 렌더링·편집·진단·발표자·동기화가 한 파일에 있다. 새 Markdown 표현이 blocks.js로 위임돼 있으므로 지금 새 덱을 추가하는 데 이 파일을 편집할 필요는 없다. 이후 기능 확장 시 presenter·진단·legacy renderer처럼 책임 단위로 나누는 것이 후순위 개선이다. parser와 model의 compose/variant/tone 허용값도 공통 계약으로 모으면 미래의 불일치 위험을 줄일 수 있다. 현재 불일치를 발견했다는 주장은 아니다.

## 권장 순서

1. 전체 공개 결과의 build/검증 명령 통합과 stale hash/사본 검사.
2. 공개 index와 공통 발표 template 분리.
3. 독립 Markdown 스타터와 현재 폴더/원본 역할 안내 갱신.
4. 필요에 따라 runtime 내부 책임 분리와 archive/예제 탐색 개선.

원하는 최소 작성 구조는 `talks/<주제>/slides.md`와 해당 주제의 `assets/`다. 공통 엔진과 template은 한 곳에 두고 `presentations/`는 계속 생성물로 취급한다. 물리적인 폴더 이동은 공통 경로 계약과 검증을 마련한 뒤 적용하는 편이 안전하다.

## 이번 확인 근거와 범위

- [Git 파일/크기·모듈·원고 의존 원장](evidence/inventory.json).
- [실제 CLI 재현 결과](evidence/probes.json), [새 프로젝트/이동/독립성/빌드 재현](evidence/probe.cjs), [template 결합 재현](evidence/template-probe.cjs).
- [프로젝트 관련8검사 통과](evidence/project-tests.txt): 참조·출력 보호·중첩 폴더·이동·watch/복구.

이번 추가 검수는 구조·CLI·파일 경계다. 디자인/브라우저 검수는 직전 [공개 검수](../reusable-layouts-20261028/DEPLOYMENT.md)의 범위를 유지한다. 제품·현재 원고·공개 생성물을 이동하거나 리팩터링하지 않았고 점검 기록만 추가했다.
