# Markdown 주원본·다중 발표 재사용 — 엔지니어링 취합

2026-10-27 · 초기 취합 `/root/engineering_manager/migration_designer` · 회의 반영 `/root/engineering_manager` · 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

**단계:** 실제 compiler 재현·구조 감사와 두 매니저의 2라운드 반론·수정 합의를 반영했다. 아래 정책은 팀의 설계 기본안이며 구현 완료 또는 사용자 확정 요구를 주장하지 않는다.

## 권고

**Markdown 파일을 주원본으로 두고 자동 preview/build에서 기존 STAGE 스타일의 발표와 청중 읽기를 생성하는 경로를 만든다.** React UI·전면 app 모듈화·새 디자인 시스템은 선행 조건이 아니다. 현재 compiler·순수 모델 검증·20양식·native visual·공통 스타일을 재사용하고 일반 blocks/inline의 parser·검증·최소 본문 renderer와 공개 출력 경계만 확장한다. Markdown+preview가 요구를 충족하면 추가 작성 UI가 없어도 된다.

현재 compiler는 일반 Markdown parser가 아니라 **제한 문법→기존 layout 필드 어댑터**다. 일반 AST를 subtitle에 평탄화하면 제목 계층·목록·표·code·링크·순서를 보존하지 못한다. 새 일반 dialect와 현재 legacy dialect를 명시적으로 구분한다. 첫 장 cover, 마지막 closing, 일반 표 chart를 추론하거나 글 길이로 삭제/요약/자동 장 분할하지 않는다. 기존 content.js 직접 입력과 무빌드/file 재생은 호환 경로·출력 수용 조건이다.

## 실제 검증과 관찰

[compiler 감사](compiler-audit.md), [구조 감사](architecture-audit.md), [실행 script](evidence/compiler-probe.cjs), [입력/오류/출력 JSON](evidence/compiler-probe.json)을 대조했다. 실제 입력·생성물은 `/tmp/stage-markdown-audit-X3r6Hc`이며 repoRoot는 읽기 전용 실제 저장소다. 제품의 일괄 예제 빌드는 실행하지 않았다.

| 확인 | 실제 결과 | 해석 |
| --- | --- | --- |
| 18개 parser/build 입력 | 8 성공·10 거절 | 현재 지원/의도된 제한을 재현. 새 일반 6장 샘플이 동작한다는 증거 아님 |
| 기본 문단·반복 `#` | statement.subtitle, title 배열 | legacy 지원. 문서 block/inline 모델 아님 |
| `##`, 기본 목록/이미지, 번호 목록·인용·표·일반 code fence | 오류 | 새 일반 본문 요구 부족. code 속 `---` fence 인식과 code 표시 지원은 별개 |
| inline 강조·code·링크·HTML | 문자로 남음. 없는 일반 링크도 성공 | inline 의미/첨부 참조 추출 없음. raw HTML 실행 지원 아님 |
| 명시 demo 목록·image+caption | 성공 | 기존 layout 어댑터 재사용 가능 |
| media 경로 | 원고 기준→output 상대 URL, `%20`·query/hash 보존 | local 실재 검사 재사용. 파일 복사는 없음. 원격 URL 존재는 검사하지 않음 |
| 동일 basename 두 원고 | id 둘 다 slides, title/output은 다름 | 새 id/slug registry 필요. 현 storage는 pathname도 써서 현재 충돌로 단정하지 않음 |
| 같은 경로 재build | 수동 content.js 편집 사라짐, MD 불변 | MD 권위와 생성물 편집을 두 원본으로 두면 분기. export는 MD 저장 아님 |
| 구문/모델/없는 media 실패 3경로 | 기존 index/content SHA 보존 | preflight 실패 결과. content→index 순차쓰기로 일반 I/O atomic publish는 미보장/미검증 |
| compiled만 복사 | 두 파일만 포함, runtime5·media·원고/갤러리 외부 참조 | 정적 dependency closure 불완결. 브라우저 실행/file 회귀 결과 아님 |
| notes/source 공유 | notes sentinel이 generated content에 남고 sourceLink가 자동 포함 | 현행 notes 비공개 기능 없음. 새 공개 projection과 artifact 선별 필요 |

구조 감사는 추가로 `StageVisual.renderDataPage()`가 visual 장 notes를 표 페이지에 실제 넣고, app의 renderer가 고정 ID·전역·closure에 결합함을 확인했다. 모델은 모든 미지 필드를 거절하지 않지만 compiler FIELDS는 blocks를 거절한다. 따라서 parser 허용 목록만 고치거나 deck에 blocks 필드만 붙여서는 본문이 표시되지 않는다.

제품8파일 SHA가 실행 전후 일치했다. 기존185검사는 직전 같은 제품 소스의 root 통과를 재사용했고 반복하지 않았다. 새 parser·watch·UI·packager·공개 출력·source patch·패키지 설치·브라우저·배포는 구현/실행하지 않았다.

## 최소 책임 경계

다음은 새 패키지/폴더를 모두 만들라는 지시가 아니라 소수 파일에서 유지할 책임이다. 자세한 코드 근거는 [구조 감사](architecture-audit.md)에 있다.

| 책임 | 입력→출력 | 최소 변경 |
| --- | --- | --- |
| 문서 해석 | Markdown+dialect→meta/sections/blocks/inline/role/source 위치 | legacy parse 유지, 일반 노드 의미·순서·code 공백 보존 |
| 발표 어댑터 | 문서→기본 blocks 장 또는 명시 layout | 새 blocks 검증/렌더 분기, 기존20양식/visual 재사용. adapter가 담지 못하면 위치 오류 |
| 공개/역할 투영 | 문서→audience/presenter/read·선택 공개 원고 | notes/부록/공개 선택을 데이터 단계에 반영 |
| 프로젝트 목록 | id/source/slug/dialect/출력 옵션→덱별 계획 | 현재 고정5slug 일괄생성과 분리, 중복id/slug/출력 preflight |
| 자산/출력 | projection별 참조→asset map/template/artifact 목록 | 선언 media 계산 재사용, 일반 link/첨부와 portable copy 확장 |
| 본문 renderer | 검증 blocks→발표/읽기의 semantic DOM | 기존 app에 한 blocks 분기+작은 공통 helper, 기존 토큰/타이포 재사용 |
| preview/publisher | 변경→해당 덱 staging·검증·교체·reload | 처음에는 읽기 전용 preview, 마지막 정상본 유지. atomic 실패 계약은 새 검증 필요 |

현재 app 전체를 createPlayer API로 분해하는 작업은 첫 단계에 필요하지 않다. **덱별 HTML 격리와 blocks 한 분기**로 시작한다. 이후 multi-mount가 필요해지면 root/storage/transport·destroy/구독 해제를 명시적으로 분리한다. Node require 가능한 StageVisual도 DOM 렌더에는 document가 필요하므로 DOM 없는 SSR 완료로 해석하지 않는다.

일반 제목의 inline도 실제 heading DOM에 보존하고 검색/목록용 plain label은 파생값으로 둔다. table/code/list의 검증·thumbnail/presenter·overflow를 함께 확장하며 기존 plaintext `[data-field]` 편집으로 rich 구조를 덮어쓰지 않는다. 긴 한글/표/code는 읽기에 전체를 보존하고 발표 넘침을 원고 위치로 진단한다. 기존 style token을 써도 새로운 의미 노드 스타일/진단은 구현해야 한다.

회의에서 제목 승격 조건을 좁혔다. **장의 첫 의미 블록이 H1일 때만** 제목으로 한 번 소비한다. 앞 문단 뒤의 H1과 후속 heading은 본문 순서에 남는다. 연속 H1은 새 모드에서는 첫 제목+후속 본문 heading이고 legacy만 기존 title 배열을 유지한다. thumbnail·presenter 복제에는 중복 DOM id와 불필요한 상호작용 제어를 만들지 않는 게이트도 둔다.

## 단일 원본·다중 덱·공개 출력

**단일 원본:** 새 모드는 Markdown이 권위이고 preview는 읽기 전용을 기본 제안으로 둔다. 기존 legacy 편집/export는 별도 호환이다. 임시 화면 draft가 있으면 미반영/sourceRevision을 표시한다. 영속 화면 저장은 source patch/충돌/주석·확장 보존을 구현한 뒤 별도 채택한다. node ID만 붙여 Markdown 역저장이 해결됐다고 하지 않는다.

**다중 덱:** deck id·원고 경로·출력 slug·제목을 분리한 작은 목록을 사용한다. 새 원고 등록은 도구/경로 규칙으로 가능하게 하고 작성자에게 모든 장 id/CSS 설정을 요구하지 않는다. registry는 도구의 등록 메타데이터이며 MD와 수동 동기화할 두 번째 작성 원본이 아니다. source 위치는 진단에 필요하지만 영구 slide anchor는 초기 필수가 아니다. 기존 `#n`을 호환하며 source 이동/중복 slug/다른 덱 출력 불변을 검증한다. 공통 runtime/style을 웹에서 공유하고 portable에서만 필요한 사본을 생성한다.

**공개 projection:** 회의의 설계 기본안은 발표+청중 읽기 공개, notes 제외, 부록은 읽기에 포함·발표 제외, 공개 MD/별도 자료모음 다운로드 opt-in이다. 사용자 확정 정책은 아니다. 공개 data·HTML·다운로드 목록에 notes를 넣지 않고 presenter 출력은 로컬/별도 선택 전달 경로로 분리한다. 원본 MD 자동 링크는 새 public template의 기본으로 만들지 않는다. 이미 PUBLIC Git인 원본과 이력은 artifact 제외만으로 비공개가 되지 않는다. 새 인증 플랫폼은 이 설계에 추가하지 않는다.

자산 목록도 projection별로 만든다. notes 전용 첨부가 공개 목록에 들어가지 않게 하면서 본문과 공유하는 참조는 유지해야 한다. source 원고의 전체 asset 집합을 공개 artifact에 무조건 복사하지 않는다. 구조 데이터→native 그림/강조값/동일 자료 표는 기존 계약을 유지하며 일반 표는 자동 visual로 바꾸지 않는다.

본문이 참조한 일반 공개 첨부는 출력 의존성으로 포함한다. 다만 registry에 등록된 입력 MD 링크는 가능한 공개 읽기 URL로 연결한다. 연결을 해결할 수 없으면 원문 위치 진단으로 공개 build를 중단하며 링크를 조용히 삭제하지 않는다. raw 원고·발표자 데이터는 별도 opt-in 없이 복사하지 않는다. 이는 알려진 source/출력 종류의 계획이며 임의의 모든 MD·첨부를 검사해 비공개를 보장하는 기능이 아니다.

**출력 완결:** 웹 컬렉션은 공통 runtime+덱별 data/미디어/읽기 entry를 게시하고, portable은 필요한 runtime/자산/선택 다운로드를 output 안으로 모아 상대 경로 closure를 만족해야 한다. source 도움말/gallery 링크도 공개 선택에 맞게 재생성하거나 제외한다. 현재 buildDeck에 standalone 옵션이 구현된 것은 아니며 direct-deck의 runtime5복사는 재사용 후보다. HTML 두 파일만 복사하는 흐름을 portable 성공이라고 안내하지 않는다.

local closure와 인터넷 없는 실행도 구분한다. 현 probe의 원격 media는 존재 확인 없이 build 성공했다. 선택 portable은 원격 의존 목록을 남기고, **명시 offline 출력**에서 필요한 원격 media가 해결되지 않으면 진단/실패한다. 외부 참고 링크를 모두 다운로드하지 않는다.

최소 1단계는 일반 MD 의미 보존·기존 STAGE 발표/읽기·파일 저장 후 자동 preview와 두 덱 독립성이다. 2단계 공유 출력에서 공개 projection 게이트를 적용한다. portable/offline은 선택 출력이며 채택할 때 closure/file 회귀를 확인한다. CI는 같은 검증 build를 실행하는 선택 운영 방식이고 첫 단계 선행 조건이 아니다. 기존 legacy/standalone 호환은 유지하며 source patch는 후속이다.

## 구현 수용과 매니저 회의 입력

1. 리서치의 일반 6장 샘플에서 이미지+목록·heading/inline·link·code 속 `---`·인용·표를 발표와 읽기에 순서/원문 그대로 보존한다. 지원 밖 노드는 source 위치와 실패하며 기존 원고는 legacy 의미를 유지한다.
2. 기존20양식과 새 blocks의 thumbnail/presenter·390px·reduced motion·코드/표 키보드 스크롤·alt/link·넘침을 검수한다. 자동 요약/삭제/차트 추론 없이 긴 자료를 읽기에 보존한다.
3. 두 주제/동일 basename 원고를 같은 스타일로 만들고 id/slug/assets/output을 분리한다. 한 덱 수정이 다른 덱을 덮지 않고 공통 runtime 변경은 관련 산출물에 반영되는지 확인한다.
4. parse/model/missing asset·중복 output·write 실패의 마지막 정상본/부분출력 정책을 검증한다. 현 preflight 보존과 새 staging/교체 설계를 구분한다.
5. notes sentinel·notes 전용 asset/sourceLink가 공개 data/HTML/다운로드에 없는지 검사하고 shared asset은 남는지 확인한다. source opt-in과 부록/발표자 정책을 명시한다.
6. Markdown 수정→preview/build가 최소 경로인지, 화면 draft/source patch를 후속으로 둘지 확정한다. parser 라이브러리·watch 구현 방식·전체 UI 모듈화는 후속 선택이며 이번 감사에서 새로 구현하지 않는다.

## 직접 교차 검토와 한계

두 담당이 [compiler 초안](compiler-audit.md)과 [구조 초안](architecture-audit.md)을 실제 읽고 일대일로 협의했다. compiler 담당의 **preflight 보존≠I/O atomic**, 구조 담당의 **compiler FIELDS 거절≠model unknown-field 처리**, **notes 표 페이지 노출** 반례를 채택했다. 전면 app 분리 대신 blocks 검증/renderer 한 분기와 덱별 문서 격리, source 위치와 영구 장ID 분리, 공개 projection별 참조 목록에 합의했다.

R1에서 연구 매니저의 일반 dialect/blocks·명시 layout·공통 스타일 초기안에 엔지니어링이 제목 승격 위치·모델 미지 필드·현 진단 빈칸을 반론했고 위 제목/검증/preview 게이트로 수정했다. R2에서 엔지니어링의 단일 원본/registry/공개 출력 초기안에 연구 매니저가 원격 media·원본 MD 첨부 우회·선택 출력의 과도한 선행 조건을 반론했고 원격 의존/공개 source 해석/단계 분리로 수정했다. 두 매니저가 직접 수용·최종 합의를 확인했다.

이번 결과는 감사·설계·현재 compiler 재현이다. 새 Markdown 문법·본문 renderer·읽기 생성·watch·portable packager·공개 projection은 미구현이고 실제 browser 동등성은 미검증이다. parser 라이브러리·역할 구문·registry 형식/등록 UX·atomic 교체·source patch는 후속 구현 선택이다. 제품·기존 원고·기존 연구·WORK_LOG·MEETING·Git·배포는 엔지니어링팀이 변경하지 않았다. 단일 상태 로그와 최종 회의록은 총괄 소유이며 이 취합의 회의 반영은 실무자 편집 종료 후 엔지니어링 매니저가 인수했다.
