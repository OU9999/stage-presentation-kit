# Markdown 구현 독립 사후 검토

2026-10-27 · `/root/research_manager` · 시작 HEAD `835453787bd3fdf75837a618674e6fb20828ee7a` 이후 로컬 구현 검토

**이번 1단계 범위에서 남은 필수 수정은 발견하지 못했다.** Markdown 파일 + 자동 미리보기, 기존 STAGE 스타일의 발표·읽기, 일반 본문 의미 보존과 두 덱 독립 생성은 [원래 합의](MEETING.md)에 맞는다. Phase 2의 노트·부록·원본 다운로드 정책과 별도 portable/offline 기능까지 완료했다고 설명하지 않는다. 이 검토는 별도 CLI/Node·정적 코드 검수이며 실제 브라우저 QA·전체 회귀·Git 전달은 총괄의 검증과 구분한다.

## 실제 확인

| 검토 항목 | 독립 확인한 결과 |
| --- | --- |
| 작성 UX | [안내](../../MARKDOWN-FIRST.md), package/config와 CLI를 대조했다. `talks/**/slides.md` 발견·공통 theme·도구 관리 manifest로 시작하며 일반 원고에 stage JSON·React UI·매 장 id를 요구하지 않는다. |
| 의미·기존 양식 | 새 parser는 첫 의미 H1만 rich heading으로 한 번 소비하고 뒤 heading·본문 순서를 보존한다. 일반 blocks 경로와 명시 legacy adapter를 분리한다. 모델 allowlist·본문 renderer와 읽기 CSS가 함께 추가돼 parser만 바꾸는 빈 구현이 아니다. |
| 한 원본 | 새 format은 localStorage 편집 복원을 건너뛰고 편집·생성물 export를 숨기며 해당 함수도 방어한다. 새 안내는 content.js를 생성물로 설명한다. 기존 legacy 편집 경로는 별도다. |
| 다중 덱·자료 | 동일 basename의 alpha/beta를 생성했다. 교차 MD 링크가 상대 read URL로 변환되고 일반 로컬 이미지/한글 첨부는 hash 자산으로 복사됐다. alpha 수정 후 beta content 바이트가 같았고 missing asset 실패는 마지막 성공본을 보존했다. |
| 읽기·표현 | 발표/읽기 HTML을 같은 deck에서 생성하고 읽기는 문서 흐름 CSS를 쓴다. rich 링크·이미지 alt·code 원문·table 구조가 생성 자료에 남았다. `read.html#2`의 실제 초기 스크롤·390px/넘침·발표자 동작은 총괄 브라우저 검증 대상이다. |
| 설명의 범위 | 새 안내는 HTTP용 모음 전체 공유·원격 의존·기존 문법과의 차이를 설명한다. 구조 설정 notes/role/appendix/sourceDownload는 미지원 오류이며, 보통 본문·코드의 해당 단어를 금지하지 않는다. 공개 노트 투영이나 원고 역저장이 구현됐다는 과장은 없다. |

읽은 구현은 `scripts/markdown-document.cjs`, `scripts/stage.cjs`, `blocks.js/css`, `deck-model.js`, `app.js`와 `package.json`, `stage.config.json`이다. 새로운 browser/TaskSpace를 만들거나 기존 화면을 조작하지 않았다.

## 실행 근거

1. 별도 임시 프로젝트에서 6장 일반 원고와 다른 주제 2장 원고를 `buildProject()`로 생성했다. rich heading·교차 read 링크 `#2`·code 안 단독 `---`·semantic table·이미지/한글 첨부·동일 basename의 두 덱·타 덱 바이트 불변·누락 asset 정상본 보존·문단 뒤 H1·notes 구조키 거절의 10개 점검을 통과했다.
2. 또 다른 임시 프로젝트의 `startDev({port:0})`에서 SSE `build-error`·마지막 성공 파일 보존·누락 참조 파일 생성 후 `built` 회복·HTTP HTML에만 reload script 주입·정적 HTML의 dev 코드 미포함을 확인했다. 생성한 서버는 종료했다.
3. 최신 [프로젝트 회귀](../../tests/stage-project.test.cjs)를 독립 실행했다. **8/8 통과, 실패 0.** 두 덱/자산, parser·모델·asset·id 오류의 전체 성공본 보존, 중첩 URL, 출력 보호, rename 실패 복구, 프로젝트 이동 후 재빌드, 동일 자산 bytes의 여러 원본 감시, sourceRoot 삭제/복원 및 새 sourceDir 오류 회복을 포함한다.

실행은 Node `v24.22.1`이었다. 첫 임시 점검 경로는 `/var/folders/hx/cmckp4f16zz_mq9ctbqvll4c0000gn/T/stage-independent-review-9pCYy9`, dev 점검은 같은 임시 루트의 `stage-independent-watch-eHOQXv`다. 제품·기존 원고·기본 `presentations/`는 이 검토가 수정하지 않았다. 임시 자료를 영구 산출물로 제공하거나 Node 20 실기 검증을 했다는 뜻은 아니다.

검토 시 SHA-256 접두사는 parser `0d2904a1803f`, builder `f65be32a389d`, blocks JS `ab4b9545781c`, blocks CSS `a711cad4dfdc`, model `46f4fdf578cf`, app `895df1da1f68`이다. 총괄의 이후 교정·최종 검증이 있으면 그 소스와 실행 결과를 우선한다.

## 직접 논의와 남은 한계

엔지니어링 매니저에게 임시 실행 결과와 sourceRoot/watch 보완 경계를 직접 전달했다. 팀 B의 최신 보완 후 위 프로젝트 테스트를 실행해 sourceRoot 복구·새 원고 폴더 회복을 확인했다. 총괄에게는 검토 결과와 README 링크 줄의 사소한 강조 기호 교정만 전달했다. 이 검토에서 제품 코드를 직접 고치지 않았다.

- 기본 deck id/slug는 원고 폴더 경로에서 나온다. 폴더를 옮겨도 id를 유지하려면 명시 frontmatter id가 필요하며, 제목 기반 영구 anchor와 모든 장의 영구 id는 후속이다.
- notes·역할·부록·source 다운로드의 공개 투영은 Phase 2다. 현재 새 원고와 명시 첨부에는 공개할 자료만 넣는다. 기존 PUBLIC Git의 원고/이력을 runtime 숨김으로 비공개로 만들 수 없다.
- `presentations/` 전체는 공통 runtime을 포함한 HTTP 정적 결과다. 개별 덱만 분리한 portable, 원격 media까지 포함하는 offline 보장, CI 배포, 화면→MD 저장·충돌 처리는 이번 완료 범위가 아니다.
- 실제 브라우저의 내용 밀도·모바일·스크롤·발표자·오류 복구는 총괄 QA에 의존한다. 이 문서의 Node 통과를 그 시각 검증이나 성능 개선율로 확대하지 않는다.

이 파일만 편집했으며 사후 검토를 종료한다. 상태·Git/배포·최종 완료 기록은 총괄이 `WORK_LOG.md`에 남긴다.
