# Markdown 재사용 구조 — 엔지니어링 매니저 검수

2026-10-27 · `/root/engineering_manager` · 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

**감사·현재 compiler 재현·두 매니저 회의 검수 완료.** Markdown 주원본과 자동 preview/build를 중심으로 기존 STAGE 스타일의 발표·읽기를 생성하는 최소 구조에 합의했다. 새 parser·blocks renderer·watch·공개 projection은 구현하지 않았다. React UI·전체 app 재작성·portable/CI를 첫 단계의 필수 선행 작업으로 삼지 않는다.

## 독립 검수

| 대상 | 직접 확인과 판정 |
| --- | --- |
| 현 compiler | splitSlides/parseSlide/parseMarkdown/buildDeck/generatedHtml·고정 예제 목록을 직접 읽었다. 일반 본문을 layout 필드에 매핑하는 현 지원과 새 의미 blocks의 부족을 구분했다. compiler FIELDS가 blocks를 거절하는 것과 모델의 일부 미지 필드 무시도 구분했다. |
| runtime·스타일 | app의 전역/고정 ID·closure renderer·plaintext 입력·저장/export, 모델·visual·styles·template을 읽었다. 최소 blocks 검증/렌더 분기와 기존 토큰 재사용이 타당하며 전면 분리는 선행할 필요가 없다. 두 스타터 runtime 10사본은 루트와 바이트가 같았다. |
| 실제 재현 | [script](evidence/compiler-probe.cjs)와 [JSON](evidence/compiler-probe.json)을 읽고 실제 `/tmp/stage-markdown-audit-X3r6Hc`의 18개 원고를 JSON 입력과 대조했다. 성공 8개 content SHA와 제품 8파일 SHA를 독립 대조했다. 실패 10개, media 재계산·동일 basename/다른 output·generated 수정 덮어쓰기·정적 closure 결과도 확인했다. |
| 실패 보존 | 구문/모델/없는 media의 3종 preflight 실패에서 이전 두 출력이 유지되는 증거를 확인했다. 실제 쓰기는 content→index 순차이므로 I/O 실패의 원자 교체까지 보장한다고 확대하지 않았다. 이 구분을 담당자에게 직접 통보해 반영했다. |
| 공유 경계 | notes sentinel이 생성 content에 남고 help에 원고 링크가 생기는 원시 증거를 확인했다. visual.renderDataPage도 notes를 실제 본문에 추가한다. 새 공개 출력은 데이터·template·자산 목록부터 투영해야 하며 UI 숨김만으로 처리할 수 없다. |

현행 코드 근거는 [parser](../../../scripts/markdown-deck.cjs#L115), [build](../../../scripts/markdown-deck.cjs#L287), [예제 목록](../../../scripts/build-examples.cjs#L7), [장 renderer](../../../app.js#L405), [화면 입력](../../../app.js#L1248), [notes 표 출력](../../../visual.js#L388)에 있다. 코드·경로 대조이며 새 브라우저/file 실행이나 전체 UI 회귀가 아니다. 기존185검사는 같은 제품 소스의 직전 총괄 통과를 재사용했고 반복하지 않았다.

## 직접 회의의 수정 합의

**R1:** 연구 매니저가 새/legacy dialect 분리·blocks·명시20양식·공통 스타일 helper를 제안했다. 엔지니어링은 제목 승격의 순서 변경과 기존 모델/진단의 빈칸을 반론했다. 첫 의미 블록이 H1일 때만 제목으로 한 번 소비하고, 나머지 heading/문단 순서·rich inline을 보존하는 조건으로 수정했다. 새 blocks 검증·source/넘침·thumbnail/presenter 복제 게이트를 함께 두며 plaintext 편집·subtitle 평탄화·전면 player 재작성은 기본 경로에서 제외한다.

**R2:** 엔지니어링이 MD 권위·읽기 전용 preview·도구 관리 registry·공개 projection·자산/출력 게이트를 제안했다. 연구 매니저의 원격 media 성공·첨부를 통한 raw 원고 우회 공개·선택 출력의 과도한 선행 조건 반론을 수용했다. local package closure와 명시 offline을 분리하고, 등록 입력 MD는 공개 읽기로 연결하며 미해결 source 링크는 공개 build의 위치 오류로 둔다. 일반 공개 첨부와 raw source/presenter를 구분한다. 기본 1단계는 일반 MD+STAGE 발표/읽기+자동 preview·두 덱 독립성, 공유 projection은 다음 단계, portable/offline/CI는 선택이다.

notes 제외·부록 읽기 포함/발표 제외·source opt-in은 팀의 설계 기본안이며 사용자 확정 요구가 아니다. 이미 PUBLIC인 Git 원고/이력은 render 제외로 비공개가 되지 않는다. 인증 플랫폼을 추가하지 않는다. 역할 구문·parser 라이브러리·registry 형식/등록 UX·atomic 교체·source patch는 후속 선택이다. [회의 반영 취합](synthesis.md)에 정확한 출력 조건과 수용 기준을 기록했다.

## 팀·소유권과 한계

기존 완료 실무자 두 명을 canonical follow-up으로 재개했다. 구조 담당은 [architecture-audit.md](architecture-audit.md), compiler 담당은 [compiler-audit.md](compiler-audit.md)·최소 재현·초기 취합의 실질 초안을 맡았다. 두 명은 서로 전체 초안과 script/JSON을 읽고 preflight/atomic·FIELDS/model·notes 표 출력·source 위치/영구ID·projection별 참조를 직접 협의했다. 완료·편집 종료 후 매니저가 synthesis의 회의 반영 소유권을 인수했으며 중복 writer는 없다.

새 작업에서 총괄이 2026-10-27 08:20~08:23 UTC 공식 모델/출시 기록을 확인하고 08:35 UTC 최신 Sol 페이지를 재확인한 스냅샷과 현재 catalog를 대조했다. 기존 두 실무자의 `gpt-6.1-sol/high/초기 fork_turns=none`을 재사용했고 일반 기술 판단·새 요약 인계에 맞췄다. 총괄 포함 4슬롯을 지켰으며 한 실무자 종료 후 연구 매니저를 재개해 두 라운드를 직접 진행했다.

엔지니어링 변경은 이 폴더의 4문서와 재현 script/JSON뿐이다. 실제 입력·생성물은 /tmp에만 두었다. 제품·기존 원고·기존 연구·루트 package·WORK_LOG·MEETING·Git·배포·브라우저를 변경하지 않았다. 새 기능의 실행 성공이나 공개 안전·성능 개선을 주장하지 않는다. 단일 작업 로그와 최종 회의록은 총괄이 소유한다.

최종 4문서를 다시 읽고 로컬 링크 55개 누락 0, 후행 공백/불필요한 끝줄 0, JSON 파싱, 제품 8파일 SHA 일치와 `git diff --check`를 확인했다. tracked 변경은 총괄의 WORK_LOG뿐이며 HEAD는 기준과 같다. 두 실무자와 매니저 모두 편집을 종료한다.
