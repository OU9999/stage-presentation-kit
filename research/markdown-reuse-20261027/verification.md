# Markdown 구현 최종 검증

2026-10-27 · 총괄 `/root`

`talks/**/slides.md`를 수정해 공통 STAGE 스타일의 발표와 읽기를 생성하는 흐름을 구현했다. [작성 안내](../../MARKDOWN-FIRST.md), [팀 구현 보고](implementation.md), [독립 사후 검토](post-review.md)를 함께 제공한다. 원래 설계 검토와 회의는 [RESULT.md](RESULT.md)·[MEETING.md](MEETING.md)에 보존했다.

- 최종 `npm test`: **210/210 통과**, 실패0. 기존185와 새 parser13·renderer4·builder/dev8을 포함한다. Node v24.22.1에서 실행했으며 Node20 실기까지 검증한 것은 아니다.
- `node scripts/build-examples.cjs`: 기존 다섯 원고·직접 작성 예제·독립 스타터의 공통 runtime 참조를 갱신했다. 기존 원고와 content.js 내용은 변하지 않았다.
- `npm run build`: 서로 다른 주제의 두 원고·12장과 발표/읽기/모음·자산을 생성했다. 전체20파일을 연속 생성해 바이트 동일, 원본4파일 불변, HTML 로컬 참조57개 누락0. [빌드 근거](evidence/build-validation.json).
- 실제 브라우저: 저장소 하위 `presentations/` 경로의 두 덱12장 모두 H1 한 번 표시·본문 넘침0·이미지 실패0·실행 오류0·Network 실패0. MD 교차 링크를 직접 눌러 다른 덱의 읽기6장으로 이동했다.
- 읽기 `#2`: 새 문서 진입과 같은 문서 내 hash 이동 뒤 두 번째 장이 sticky header 아래에 보였다. smooth 이동 중간 값과 완료 값을 구분해 최종 top92px/header76px를 확인했다.
- 모바일390px: 가로 넘침0, 일반 본문18px/code15px, 이미지와 목록이 원고 순서대로 표시됐다. [모바일 화면](evidence/mobile-reading.png)·[발표 표 화면](evidence/desktop-markdown.png).
- 원본 권위: localStorage get/set을 별도 페이지에서 계측해 둘 다0, edit/export/reset 노출0을 확인했다. 전체 보기6개에 상호작용 링크/중복id0, 발표자 현재·다음 각각1장을 확인했다.
- 오류·회복: 별도 임시 프로젝트에서 notes 구조키 오류 overlay와 원고 위치, 마지막 성공본문 보존을 확인했다. 원고 수정만으로 SSE가 화면을 갱신하고 오류 overlay를 제거했다. 긴22목록은 DOM과 읽기에22개 모두 남고 발표에서는 source:line 넘침을 안내했다. 코드 스크롤에 방향키를 입력해도 장은 바뀌지 않았다.
- 기존 호환: visual 스타터3장과 편집3필드, 기존 구성7장의 `#4` bento 화면을 실제 브라우저에서 확인했다. [브라우저 근거](evidence/browser-local.json).

리서치 매니저는 별도 임시 프로젝트의 의미/원고/자산/독립성10점검·SSE 오류 회복5점검과 builder8검사를 독립 수행했고 필수 미해결 결함을 찾지 못했다. 엔지니어링 실무자 두 명은 상대 코드와 검사를 직접 교차 검토했다. 세 팀 담당자의 편집 종료 후 최종 생성·검사를 수행했다.

새 모드의 notes/role/appendix/sourceDownload 구조 설정·영구 heading anchor·별도 portable/offline·CI·화면→Markdown 저장은 이번 범위 밖이다. 원격 자료의 offline 재생이나 전원 장애 때 모든 파일 시스템 원자성을 보장하지 않는다. 공개 저장소의 원고 자체는 공개이며, 공유 결과 폴더만 제공하는 dev 서버와 구분한다.

커밋·푸시와 공개 Pages 후속 검증은 총괄이 이어서 수행하고 단일 [WORK_LOG](../../WORK_LOG.md)에 기록한다.
