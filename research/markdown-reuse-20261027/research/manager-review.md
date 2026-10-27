# Markdown 재사용 구조 — 리서치·회의 매니저 검수

2026-10-27 · `/root/research_manager` · 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

**조사·엔지니어링 근거 대조와 두 매니저의 두 차례 직접 회의를 완료했다.** 새 요구는 간단한 Markdown 원본으로 기존 STAGE 스타일을 재사용하는 것이다. 이전 content.js 직접 작성·무빌드를 새 설계의 필수 제약으로 고정하지 않는다. Markdown 파일 편집 + 자동 미리보기를 최소 경로로 합의했으며 React UI를 전제로 삼지 않는다. 새 기능 구현 완료와 설계 합의를 구분한다.

## 매니저 독립 검수

| 항목 | 실제 확인 | 판단 |
| --- | --- | --- |
| 일반 문법 지원 | `MARKDOWN.md`, `scripts/markdown-deck.cjs:115`·`:239`, 기존 제품 원고와 Markdown 테스트를 읽었다. | 현재 compiler는 제한 문법→layout 필드 어댑터다. 일반 Markdown 전체가 이미 지원된다고 안내할 수 없다. |
| 재사용 경계 | compiler의 모델 검증·미디어 재계산·공통 5파일 참조, `deck-model.js`, `app.js`의 공통 렌더러를 대조했다. | 기존 스타일·20양식·native visual을 유지한다. 일반 blocks는 현재 범용 필드가 없으므로 parser뿐 아니라 최소 모델·renderer 확장이 필요하다. |
| 원본 소유권 | `app.js:1248` 입력, `:1028` 저장, `:1095` export와 compiler의 원고 재빌드를 대조했다. | 화면 수정은 현재 MD에 돌아오지 않는다. 새 모드의 MD를 권위로 두고 생성 content.js를 동시에 편집하지 않는다. 처음에는 읽기 전용 preview면 충분하다. |
| 읽기와 공유 | `app.js:765` 읽기 상태, `:867` 현재 자료 표, `:1138` 발표자 노트, direct-deck의 disk data.html을 읽었다. | 현 읽기는 같은 장 DOM이며 문서형 읽기 생성과 다르다. 노트·부록·원본 다운로드 정책은 공개 투영의 제안으로 구분해야 한다. |
| 여러 발표 | `scripts/build-examples.cjs`의 고정 5개 slug와 parser basename id, localStorage의 pathname을 확인했다. | 작은 목록/경로 규칙의 후보가 타당하다. 같은 slides id를 현재 저장 충돌이라고 과장하지 않으며 모든 장에 수동 id를 강요하지 않는다. |
| 원고 예시 | [작성 계약](authoring-contract.md)의 6장 제안과 [종합](synthesis.md)의 현재/미구현 구분을 직접 읽었다. | headings·목록·이미지/링크·code·인용·표를 포함하고 실제 코드 fence 안 단독 `---` 반례가 있다. 현재 실행 가능한 새 문법으로 표시하지 않았다. |

[기존 Vite·React 결과](../../vite-react-20261027/RESULT.md)는 역할 분리의 근거로 재사용했다. [타이포 결정](../../type-layout-20261025/manager/final-decision.md)과 [native visual 계약](../../visual-redesign-20261024/engineering/contract-proposal.md)의 원문·스타일·동일 자료 보존 원칙을 다시 읽었다. 새 외부 프레임워크 조사나 디자인은 하지 않았다.

## 직접 협의와 수정

두 실무자는 [작성 계약](authoring-contract.md)과 [흐름 감사](workflow-audit.md)의 초기 실질 초안을 각각 작성했고, 흐름 감사 담당이 [1차 종합](synthesis.md)을 취합했다. 서로 전체 초안을 직접 읽고 다음 내용을 합의했다.

- 일반 blocks와 기존 layout 어댑터를 분리하고, 이미지+목록·긴 표·code를 기존 필드에 억지로 평탄화하지 않는다.
- MD 단일 원본과 화면 draft·legacy content.js export를 구분한다. 화면 역변환을 첫 단계의 필수 구현으로 만들지 않는다.
- 노트가 포함된 원본 MD 다운로드와 노트 제외 공개 출력을 구분한다. 부록·원본 공유의 기본값은 사용자 확정이 아닌 제안이다.
- 모노레포·플러그인·React 작성기를 추가 전제로 삼지 않는다. 영구 장 anchor·화면 source patch는 선택 확장으로 낮춘다.

매니저는 샘플의 실제 단독 `---` 반례와 parser 시작 줄번호를 교정하도록 요청했고 반영본을 확인했다. 회의 반영 후 문서 4개의 실제 로컬 링크 29개 누락 0, 후행 공백·불필요한 끝줄 0, `git diff --check` 통과를 확인했다. 코드 예시의 가상 입력 경로는 실제 문서 링크와 구분했다.

## 두 매니저 회의의 반론과 수정

R1은 리서치 매니저가 일반 blocks/inline·공통 스타일·legacy 이행을 제안했다. 엔지니어링 매니저가 앞 문단 뒤 H1을 승격하면 순서가 바뀌고 기존 진단/편집이 rich 노드를 처리하지 못한다는 반례를 제시했다. 첫 의미 블록 H1만 제목으로 한 번 소비하도록 좁혔고 새 blocks schema/renderer·source/넘침·thumbnail/presenter의 비상호작용 복제를 함께 수용했다. legacy 반복 # 의미는 별도 dialect로 유지한다.

R2는 엔지니어링 매니저가 MD 권위·read-only preview·도구 관리 registry·공개 projection·출력 완결을 제안했다. 리서치 매니저는 실제 probe의 원격 media 성공과 본문에서 raw 원고를 첨부로 참조하는 반례를 제기했다. 로컬 closure와 offline 보장을 분리하고, 등록 입력 MD 링크는 공개 읽기 URL로 해석하거나 위치 오류로 공개 build를 중단하도록 수정했다. raw source/발표자 데이터는 opt-in 없이 복사하지 않으며 일반 공개 첨부만 dependency로 포함한다. 이미 공개 Git의 원고·이력은 artifact notes 제외로 숨겨지지 않는다.

최소 1단계는 일반 MD 보존·STAGE 발표/읽기·읽기 전용 자동 preview·두 덱 독립성, 2단계는 notes/source/첨부의 공개 투영이다. portable/offline·CI는 선택 단계, source patch는 후속으로 분리했다. 노트·부록·source 기본값은 팀의 설계안이며 사용자 확정 요구로 보고하지 않는다. 새로운 인증 플랫폼·React UI·전체 player 재작성은 범위를 넓힌 대안으로 채택하지 않았다.

[구조 감사](../engineering/architecture-audit.md)와 [compiler 실행 JSON](../engineering/evidence/compiler-probe.json)을 직접 읽어 18입력(8성공/10거절), 3 preflight 정상본 보존, 생성물 재빌드 덮어쓰기·외부 의존·notes/sourceLink를 대조했다. 제품 SHA 불변과 정적 closure 검사는 새 renderer나 실제 file 브라우저 성공을 의미하지 않는다. 최종 회의록과 상태 로그는 총괄 소유로 유지했다.

## 후속 구현에서 결정·검증할 것

1. 새 일반/legacy 모드를 선택하는 구체 옵션과 parser·본문 노드 schema, 최소 렌더러의 구현.
2. 한 원본의 발표·청중 읽기·선택 부록 구문과 긴 표/code의 실제 보존·넘침 진단.
3. 도구 관리 작은 목록/경로 규칙의 형식, 자산 묶음·deck별 출력 교체와 선택 portable 호환의 실제 재현.
4. 합의한 읽기 전용 preview와 notes/source 다운로드 기본안의 구현, 공개 artifact에서 notes·source 전용 참조가 실제 제외되는지.

이 문서는 조사·회의 단계 검수다. 새 parser·renderer·watch·source patch·공유 패키저는 구현하지 않았다. 제품·기존 원고·배포·Git·브라우저는 변경하지 않았다. 실제 재현은 현재 compiler의 동작과 한계를 확인했으며 새 출력 구현 검증은 아니다. parser/schema 이름·역할 구문·registry 직렬화/등록 UX·원자 교체 방식은 후속 선택으로 남겼다.

배정은 기존 두 실무자의 편집 종료를 확인한 뒤 canonical follow-up으로 재개했다. 새 모델 스냅샷은 총괄의 2026-10-27 08:20~08:23 UTC 공식 모델·출시 기록 조회와 현재 catalog를 대조해 재사용했다. 두 명 모두 원래 `gpt-6.1-sol/high/fork_turns=none`이며 일반 기술 판단·원고 계약·취합에 맞는 설정과 요약 인계를 유지했다. 회의 재개에서는 08:35 재확인 스냅샷이 같은 작업에서 유효함을 재확인했다. 실무자를 추가 재개하지 않았고 인수한 종합/검수만 갱신한 뒤 편집을 종료한다. 단일 상태 로그는 루트 `WORK_LOG.md`다.
