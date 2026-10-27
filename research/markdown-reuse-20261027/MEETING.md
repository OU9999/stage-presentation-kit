# Markdown 원본과 재사용 구조 — 팀 회의록

2026-10-27 · 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

참석자는 리서치 매니저 `/root/research_manager`, 엔지니어링 매니저 `/root/engineering_manager`다. 총괄 `/root`는 업무 경계·최종 취합을 담당했다. 양 팀 실무자의 독립 초안과 교차 검토 후, 두 매니저가 서로 직접 제안·반례·수정안을 교환하고 아래 합의를 각각 총괄에게 보고했다. 문법·API는 **팀의 설계 권고이며 미구현**이다.

## 1차: 일반 Markdown, 기존 스타일과 양식의 연결

**문제와 근거.** 현 compiler의 실제 18입력은 8개 성공·10개 거절이었다. 일반 본문과 inline 의미를 현재 layout 필드로 모두 보존할 수 없다. compiler는 `blocks`를 거절하며, 현재 모델에 필드만 추가해도 renderer까지 연결되지 않으면 표시되지 않을 수 있다. 근거는 [compiler 감사](engineering/compiler-audit.md)와 [구조 감사](engineering/architecture-audit.md)다.

**리서치 초기안.** 새 일반 Markdown 모드를 명시적으로 선택하고, 기존 반복 `#` 제목 줄바꿈은 legacy 문법으로 유지한다. STAGE 토큰을 재사용하는 기본 blocks 렌더 경로와 필요한 장의 기존 20양식 어댑터를 연결한다.

**엔지니어링 반론.** 첫 `#`를 앞 문단보다 뒤에서 찾아 제목으로 승격하면 원문 순서가 바뀐다. 현 `[data-field]` 중심 진단은 code/list/table을 충분히 검사하지 않고 plaintext 편집은 rich inline 구조를 지운다. 전체 보기·발표자 복제본에 같은 ID와 상호작용을 복제하는 문제도 검증해야 한다.

**수정 합의.**

- 장의 **첫 의미 블록이 H1일 때만** 제목으로 한 번 소비한다. 앞 문단과 후속 heading은 순서대로 보존한다. 새 모드의 연속 H1은 후속 본문이고, legacy 원고만 기존 title 배열 의미를 유지한다.
- 표시용 rich inline 제목과 탐색/알림용 파생 plain label을 구분한다. 제목을 본문에 중복 표시하지 않는다.
- parser, blocks schema/검증, 최소 본문 renderer, source 위치·넘침 진단을 함께 추가한다. 일반 본문을 subtitle 문자열로 평탄화해 지원했다고 하지 않는다.
- 기존 STAGE 글꼴·색·여백·타이포·20양식·native visual을 재사용한다. 명시 layout이 담지 못하는 본문을 조용히 삭제하거나 표를 차트로 추측하지 않는다.
- thumbnail/presenter의 중복 ID와 상호작용 없는 복제, 제목·본문·코드·표·목록의 진단을 수용 기준으로 둔다.
- 새 모드의 plaintext 화면 편집, React UI 선행, 전체 player 재작성은 초기 구현의 전제에서 제외한다. 우선 덱별 HTML로 player를 격리한다.

parser 라이브러리, 구체 노드/schema 이름, 실제 CSS/renderer 코드는 구현 단계의 선택으로 남겼다. 기존 원고의 자동 변환 완료나 새 문법의 실행 성공을 주장하지 않는다.

## 2차: 한 원본, 여러 발표와 자료 공유

**문제와 근거.** 재빌드는 생성 content.js 수정을 덮어썼다. 현재 compiled 폴더는 index/content 두 파일이며 공통 runtime·미디어·원고/갤러리에 외부 의존한다. notes는 생성 데이터에 남고 `renderDataPage`에도 표시된다. 이 동작을 일반 Markdown 원본 저장이나 독립 공유 package로 간주할 수 없다.

**엔지니어링 초기안.** Markdown 권위와 읽기 전용 preview를 기본으로 두고, 도구가 관리하는 작은 deck registry를 연결한다. 발표·청중 읽기·발표자용 projection을 나누고 공개 source는 선택 사항으로 둔다. 출력별 자산 수집과 staging/검증/교체를 설계한다.

**리서치 반례.** 현 build는 미확인 원격 미디어도 허용하므로 로컬 파일이 모였다고 offline 동작을 보장할 수 없다. 본문의 `slides.md` 링크를 단순 첨부로 자동 복사하면 원본 제공의 선택 정책을 우회한다. 모든 portable/offline/CI를 첫 단계에 강제하면 기본 Markdown 작성 경로가 과도하게 커진다.

**수정 합의.**

- Markdown을 유일한 작성 원본으로 둔다. 새 preview는 읽기 전용이며 content.js export를 Markdown 저장이라고 안내하지 않는다. source patch·역변환·동시 수정 처리는 후속이다.
- registry는 작성자가 동기화할 두 번째 원본이 아닌 도구의 프로젝트 정보다. 안정 deck ID·source·slug·문법 모드·출력을 연결하고 중복 ID/출력 경로를 진단한다. 제목·파일 basename만을 영구 식별자로 사용하지 않는다.
- 같은 문서 모델에서 발표와 청중 읽기를 생성한다. notes를 청중 출력에서 제외하고 부록은 읽기 포함·발표 제외로 두는 것은 **팀의 기본 제안**이며 사용자 확정 요구와 구분한다.
- 자산은 projection 후 실제 공개 참조를 기준으로 모은다. 일반 공개 첨부와 raw 원고/발표자 자료를 구분한다. 등록된 입력 Markdown 링크는 공개 읽기 URL로 연결하고 해결하지 못하면 원고 위치를 알리며 공개 build를 중단한다. raw source 제공은 별도 선택이다.
- PUBLIC Git 원본·과거 이력의 내용은 runtime/HTML에서 제외해도 비공개가 되지 않는다. 이 회의는 새 인증 플랫폼이나 비공개 저장소 구축으로 확대하지 않는다.
- portable은 로컬 의존 완결과 원격 의존 선언을 구분한다. 명시적으로 offline 출력을 택했을 때 필수 원격 자료를 해결하지 못하면 실패한다. 외부 참고 링크는 자동 다운로드하지 않는다.
- 검증 후 쓰기 전에 발생하는 오류에서 기존 결과가 보존된 현재 동작과, 향후 덱별 staging/원자 교체 제안을 구분한다. 현재 I/O 장애 원자성은 미검증이다.

## 합의한 구현 순서

1. **핵심 작성 경로:** 일반 Markdown + STAGE 발표/읽기 + 자동 preview. 기존/새 문법을 구분하고, 두 원고가 같은 스타일로 독립 생성되는지 확인한다. 원문 의미·순서·코드 공백과 source 진단을 보존한다.
2. **공유 출력의 정확성:** 공개 projection·원고/첨부 연결·원본 선택·누락 자산/중복 경로·기존 성공본 유지 게이트를 구현한다. 현재 GitHub Pages의 기존 주소 호환도 검증한다.
3. **선택 출력과 자동화:** portable/offline/CI 배포는 채택할 때 별도로 검증한다. React 편집기, Markdown source patch, player 전체 모듈화는 실제 필요가 생길 때 검토한다.

확정하지 않은 것은 parser 제품·역할 표식 문법·registry 형식/등록 UX·원자 교체 방식이다. 구현 전 기술 선택이 남은 상태이며, 이번 작업에서 제품 코드나 배포를 변경하지 않았다.

근거: [리서치 종합](research/synthesis.md), [엔지니어링 종합](engineering/synthesis.md), [실제 compiler 재현](engineering/evidence/compiler-probe.json).
