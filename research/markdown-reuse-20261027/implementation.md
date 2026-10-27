# Markdown 작성 흐름 구현과 검증

2026-10-27 · 엔지니어링 매니저 `/root/engineering_manager`

**`talks/주제/slides.md`를 고치면 기존 STAGE 스타일의 발표와 읽기 화면이 생성된다.** 새 주제는 폴더와 원고를 추가하면 자동 발견한다. 원고마다 JSON·HTML·CSS를 다시 작성하지 않는다. 사용 방법은 [MARKDOWN-FIRST.md](../../MARKDOWN-FIRST.md)에 있다.

```sh
npm ci
npm run dev
```

기본 미리보기는 `http://127.0.0.1:4320`이며 원고·자산·설정·공통 runtime 변경을 반영한다. `npm run build`는 `presentations/`에 정적 모음을 만든다. 전체 모음 폴더를 HTTP로 제공하면 보는 사람에게 Node가 필요하지 않다. 개별 덱 폴더만 떼면 공통 runtime이 빠진다.

## 구현한 동작

- [일반 Markdown parser](../../scripts/markdown-document.cjs)는 제목·문단·목록·이미지·inline·인용·code·표를 의미 DOM 트리로 보존한다. 첫 의미 H1만 제목으로 한 번 소비하고 나머지 순서를 유지한다. code 안 `---`, 틸드/긴 fence, 들여쓰기 code와 중첩 목록·인용의 구분선은 장을 잘못 나누지 않는다. 원고 전체의 줄 위치와 source revision도 기록한다.
- 명시 `stage` layout/JSON만 기존 20양식의 어댑터로 처리한다. 표시할 수 없는 본문·중복 필드·구형 splitter에서 여러 장으로 나뉘는 모호한 입력은 일부만 취하지 않고 오류로 알린다. 기존 원고/직접 content.js 경로는 별도로 유지한다.
- [프로젝트 도구](../../scripts/stage.cjs)는 `slides.md`를 자동 발견하고 상대 폴더를 기본 deck id로 사용한다. frontmatter id는 선택 사항이며 중복 id·slug를 사전에 거절한다. 출력 manifest는 도구가 관리한다. 기본 id와 slug는 원고 폴더 이동 시 바뀌므로 같은 id가 필요하면 명시 id를 사용한다.
- 로컬 이미지·첨부는 원고 기준으로 확인해 hash URL로 복사한다. 등록 원고 링크는 상대 `read.html`로 바꾸고 미등록 Markdown 원본은 자동 복사하지 않는다. 공통 7파일은 `_runtime/`에 한 번 두고 발표·읽기·모음 링크를 상대 경로로 연결한다. source 원고·참조 자산은 바꾸지 않는다.
- 새 staging을 완성·검증한 뒤 출력 폴더를 교체한다. 기존 비생성 폴더·원고/프로젝트와 겹치는 출력은 거절한다. 생성 marker는 상대 config 참조를 써 프로젝트 전체를 옮겨도 다시 build할 수 있다. 처리 가능한 publish rename 실패는 이전 출력을 복구한다.
- 개발 서버는 출력 모음만 제공하고 HTML 응답에만 SSE 새로고침을 주입한다. build 오류는 마지막 정상 화면과 원고 위치 진단을 유지하며 수정 후 복구한다. 생성 정적 파일에는 개발 script를 넣지 않는다.

두 주제의 6장 원고 [제품 회고](../../talks/product-notes/slides.md)·[팀 학습](../../talks/team-learning/slides.md)에 이미지+목록, code 안 구분선, 인용·표·inline 링크·첨부·한글을 담았다. 프로젝트 공통값은 [stage.config.json](../../stage.config.json)에서 한 번 정한다.

## runtime 연결과 원본 권위

총괄이 `blocks.js/blocks.css`, 모델 검증, app과 template·legacy 생성 경로를 연결했다. 새 `markdown-v1`은 화면 편집·생성 content.js export/reset과 이전 브라우저 편집본 복원을 사용하지 않는다. Markdown이 원본이고 미리보기는 읽기 전용이다. rich heading과 본문은 같은 의미 노드를 발표·전체 보기·발표자·읽기에 사용한다.

읽기는 같은 자료의 문서 흐름을 제공한다. 긴 내용은 DOM/읽기에 보존하고 발표에서 원고 줄 기준 넘침을 진단한다. 일반 표를 자동 차트로 바꾸거나 내용을 요약·삭제하지 않는다. 최초 `read.html#2`도 해당 장으로 이동한다. 기존 STAGE 토큰·타이포를 사용하고 새로운 작성 UI/브랜드 스타일은 만들지 않았다.

## 실제 검증과 수정

| 검증 | 확인한 결과 |
| --- | --- |
| parser 기능 검사 | [13개 검사](../../tests/markdown-document.test.cjs) 통과. 혼합 의미·rich 제목·전체 줄 위치·여러 code/구분선·HTML 문자 표시·명시 adapter·노트 구조키·mutable 자산 참조·원문 불변을 확인했다. |
| builder/dev 기능 검사 | [8개 검사](../../tests/stage-project.test.cjs) 통과. 매니저가 최종 파일을 독립 실행해 다시 통과했다. 두 덱·중첩 상대 링크·자산 복사·실패 보존·안전한 출력·rename 복구·프로젝트 이동·watch/SSE를 확인했다. |
| 실패와 덱 독립성 | 정상 두 덱의 전체 출력 SHA snapshot을 구문/모델/자산/id/slug 실패 뒤 대조했다. publish rename 실패에서 이전 출력과 staging 정리도 확인했다. |
| dev 오류 복구 | 누락 외부 자산 생성, 동일 내용의 여러 자산 원본 변경, sourceRoot 삭제/복원, config가 가리킨 새 원고의 초기 오류를 원고 수정만으로 복구하는 경로를 검사했다. |
| 내용 보존 교정 | 사용자 제목의 `$&` 등 replacement 토큰이 원문 대신 특수 치환되지 않도록 수정했다. 명시 adapter의 여러 장 중 첫 장만 취할 수 있는 경로도 오류로 막았다. |
| 총괄 browser 확인 | 실제 두 덱12장, 모바일390px, 원고 권위/편집 제어 차단, 전체 보기·발표자 복제와 `read#2` 이동을 확인했다. 임시 프로젝트에서 오류 overlay→원고 수정→SSE 복구, 긴22목록의 원문/읽기 보존·발표 진단도 확인했다. 이는 총괄 실행 결과이며 매니저의 별도 browser 실행으로 표시하지 않는다. |

parser와 builder 담당은 서로의 실제 소스·테스트를 읽고 직접 교차 검토했다. 매니저는 API/의미·경로·쓰기·watch를 읽고 전체 Markdown help 교체, 이동 가능한 marker, 누락 외부 자산·원고 루트·config 후보의 복구, 제목 치환·전체 모음 실패 보존 반례를 검수했다. 최종 기존 회귀·runtime/browser 및 Git/공개 전달의 증거는 총괄의 단일 WORK_LOG와 후속 검증 기록을 따른다. [독립 후속 검토](post-review.md)는 별도 리서치 매니저가 맡았다.

## 범위와 한계

이번 새 모드의 구조키 `notes`, `role`, `appendix`, `sourceDownload`는 지원하지 않아 오류로 처리한다. 기존 legacy compiler의 notes 지원과 다르다. 일반 본문·HTML 원문/주석·code의 단어는 그대로 표시될 수 있으므로 노트 비공개 투영을 구현했다고 해석하지 않는다. 원본 공개·노트/부록 역할을 다루는 2단계는 남아 있다.

원격 이미지·참고 링크는 원격 의존이며 offline을 보장하지 않는다. 전용 portable/offline 패키저·CI 배포·React 작성기·영구 heading anchor·화면→Markdown 역저장은 추가하지 않았다. staging/처리 가능한 rename 실패의 복구를 시험했으며 전원 장애나 모든 crash에서 파일 시스템 원자성을 증명한 것은 아니다.

실무자 두 명은 기존 완료 담당자를 `gpt-6.1-sol/high/초기 fork_turns=none`으로 재개했다. 총괄의 2026-10-27 09:01 UTC 공식 모델/현재 catalog 스냅샷을 재사용했고 새 요약 인계와 일반 구현에 맞췄다. parser 담당은 신규2파일, builder 담당은 신규8파일을 소유했고 모두 편집 종료했다. 매니저는 이 보고서만 편집하며 제품·WORK_LOG·default presentations 생성·브라우저·Git 전달은 총괄 소유를 지켰다.

보고서의 실제 로컬 링크9개 누락0·후행 공백/불필요한 끝줄0과 `git diff --check`를 확인했다. 독립 후속 검토자도 필수 미해결 문제 없이 편집을 종료했다. 엔지니어링 매니저도 이 보고서 편집을 종료하고 최종 Git/공개 검증은 총괄에게 인계한다.
