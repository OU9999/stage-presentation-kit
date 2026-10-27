# Markdown compiler 실제 감사

2026-10-27 · `/root/engineering_manager/migration_designer` · 제품 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

## 결론

**현재 compiler는 제한 Markdown→기존 layout 필드 어댑터다. 일반 Markdown 본문을 순서·의미 그대로 발표/문서로 내보내는 compiler는 아니다.** 기존 모델 검증·20양식·STAGE 타이포·선언 미디어 재계산은 재사용하되, 새 주경로에는 문서 blocks/inline 모델과 최소 본문 renderer가 필요하다. 새 AST를 subtitle 하나에 합쳐 성공으로 처리하지 않는다. Markdown 수정→자동 preview/build를 기본으로 하고 React UI는 필수 전제가 아니다.

기존 원고는 legacy 문법으로 유지하고 새 일반 Markdown 모드는 명시 버전/설정/진입 경계로 구분한다. 첫 장 cover·표 chart·글 길이 기반 삭제/요약/자동 장 분할을 추론하지 않는다. 기존 content.js와 file 사용은 호환 입력/출력 조건이며 새 요구를 거절하는 제약이 아니다.

## 실행 범위와 재현

[재현 script](evidence/compiler-probe.cjs)를 Node v24.22.1로 실행했다. 입력·생성물은 `/tmp/stage-markdown-audit-X3r6Hc`에만 기록했고 실제 repo는 `buildDeck(input, output, {repoRoot})`의 읽기 전용 모델/runtime/template 제공자로 사용했다. 제품의 `build-examples` 명령은 실행하지 않았다.

```sh
node research/markdown-reuse-20261027/engineering/evidence/compiler-probe.cjs \
  /absolute/repo/path /absolute/path/to/result.json
```

정확한 입력·변환 deck·오류·생성 content·경로 closure·제품 SHA는 [실행 결과](evidence/compiler-probe.json)에 있다. 18개 입력 중 8개 build 성공, 10개 거절을 assert했고 추가 미디어/id/rebuild/이전 성공본 보존을 확인했다. 초기 실패 fixture로 slide theme를 사용했으나 오류가 발생하지 않아 누락된 visual 모델 오류 fixture로 수정했다. 최종 기록은 실제 오류가 발생하는 그 케이스다. 패키지 설치·새 parser/CLI·제품 시제품·브라우저 실행·기존185검사 재실행은 하지 않았다. 185통과는 직전 동일 제품 소스의 root 결과를 재사용한다.

## 현행 지원·제한·새 요구 부족

아래는 모두 현재 parser/build의 실제 결과다. 의도된 제한이 새 계약의 지원으로 바뀌려면 별도 구현이 필요하다.

| 입력/경계 | 관찰 | 분류 |
| --- | --- | --- |
| `# Title`+일반 문단 | 기본 statement. 문단 내 줄은 공백으로 합치고 문단 사이는 `\n\n`인 subtitle로 합침 | 현재 지원. 문서 block 구조는 보존하지 않음 |
| 연속 `# First`/`# Second` | title 배열 두 항목 | legacy 다중 행 제목. 새 일반 문법과 의미 분리 필요 |
| `##` | 단일 `#`만 지원한다는 오류 | 현재 의도된 제한; 새 본문 계층 요구 부족 |
| 기본 `-` 목록 | demo.steps만 지원한다는 오류 | 기본 본문 목록 요구 부족 |
| 명시 `layout: demo`+`-` | steps 문자열 배열로 생성 | 현재 layout 어댑터 지원 |
| 번호 목록·인용·pipe 표 | 지원하지 않는 본문 문법 오류 | 새 일반 문서 노드 필요 |
| 기본 statement 이미지 | 이미지 양식 선택 오류 | 새 이미지+본문 구성 요구 부족 |
| 명시 `layout: image`+이미지+문단 | src/alt/caption 생성 | 현재 특정 양식 지원 |
| `**strong**`, `*emphasis*`, inline code, 링크, `<b>` | 기호가 subtitle 문자열에 그대로 남음. 일반 링크 미존재도 build 성공. `<`는 generated JS에서 escape | inline 의미·링크/첨부 참조 목록 없음. raw HTML 실행 기능으로 보지 않음 |
| 일반 `js` fence 내부 단독 `---` | code fence는 stage JSON만 지원한다는 오류. 일반 code 표시 지원 아님 | splitSlides의 fence 처리와 일반 code 노드 지원을 구분 |
| stage metadata subtitle+본문 | 중복 정의 오류 | 현재 조용한 덮어쓰기 방지 재사용 가능 |
| stage JSON에 `blocks` 추가 | layout이 표시하지 않는 필드 오류 | parser 허용 목록도 확장 필요. 모델/renderer까지 연결해야 실제 표시 |
| notes metadata | deck·generated content에 sentinel 그대로 포함 | 공개 노트 제외 기능은 현행에 없음 |

소스: [splitSlides](../../../scripts/markdown-deck.cjs#L92), [parseSlide](../../../scripts/markdown-deck.cjs#L115), [parseMarkdown](../../../scripts/markdown-deck.cjs#L239). 진단은 슬라이드 번호·field path 또는 metadata 내부 행을 제공하지만 일반 source 파일/원문 전체 행 범위의 위치 모델은 없다. 새 노드에 source 위치를 연결해야 한다. 지원 밖 문법이 오류인 경우와 inline 기호가 그대로 성공하는 경우를 구분해 안내한다.

## 미디어·원문 보존

[reference/eachMedia](../../../scripts/markdown-deck.cjs#L204)는 선언된 src/video/poster와 일부 item/tool 필드를 순회한다. 원고 폴더 기준으로 local 파일을 해석하고 output 상대 경로로 재계산한다. `%20`이 있는 `./space%20name.svg?v=2#figure`는 `../space%20name.svg?v=2#figure`로 바뀌었고 파일 실재 검사 후 성공했다. **경로 재계산은 파일 복사가 아니다.** 이 build는 자산을 output 안으로 복사하지 않는다.

`parseMarkdown`만 실행하면 없는 local 이미지도 deck을 만들지만 build에서는 오류가 난다. `https://example.invalid/unverified.svg`는 원격 참조로 build 성공했으며 네트워크 실재를 확인하지 않는다. 일반 inline 링크는 literal 문자열이라 참조 추출·존재 검사가 되지 않는다. 새 Markdown 모드에서 이미지·문서 링크·첨부의 참조 목록과 출력 resolver를 확장해야 한다. 내용/원고 URL을 배포 hash URL로 덮어쓰지 않는 것이 제안이다.

실행한 모든 입력 MD는 build 직후 바이트 그대로였다. 다만 출력은 원본 Markdown의 주석·inline·block을 복원할 수 있는 source map/AST가 아니라 deck JSON이다. 원문 불변과 의미/구조 보존은 다른 조건이다. 새 원고에서 줄바꿈·code 공백·표·목록·alt·link·role을 보존하는 수용 기준이 필요하다.

## 재빌드와 단일 원본

[buildDeck](../../../scripts/markdown-deck.cjs#L287)는 parse→모델 검증→미디어 실재→runtime/template/HTML 생성 계산을 마친 후 content.js→index.html을 순차 기록한다.

- 기존 output의 content.js에 화면 편집을 흉내 낸 변경을 넣은 뒤 같은 MD/같은 output으로 재build했더니 변경이 사라지고 원래 생성 content와 일치했다. MD는 바뀌지 않았다. 현 브라우저 export는 Markdown 역저장이 아니다.
- 구문 `##`, visual 모델 누락, 없는 local 이미지의 세 preflight 실패에서 이전 index/content SHA가 모두 보존됐다.
- 이는 그 세 실패 경로의 관찰이다. write I/O 장애·프로세스 중단·두 파일 원자 교체는 시험하지 않았다. 두 write가 순차이므로 일반 atomic publish 보장을 주장할 수 없다.

새 기본 흐름은 **MD 권위→읽기 전용 preview**다. 화면 편집을 유지한다면 임시 draft로 표시하고 source patch·revision 충돌·주석/알 수 없는 확장 보존을 구현하기 전에는 영속 원본 저장으로 안내하지 않는다. publisher는 덱별 staging→validation→publish 교체를 제안하되 현재 기능이 아니다.

## 여러 덱과 출력 독립성

`alpha/slides.md`, `beta/slides.md`를 서로 다른 compiled 폴더로 build했더니 두 id는 모두 `slides`, 제목/출력 경로는 서로 달랐다. fallback id가 basename인 것은 사실이지만 [storageKey](../../../app.js#L55)는 id와 location.pathname을 함께 쓰므로 이 실험으로 현재 저장 충돌을 주장하지 않는다. 새 manifest는 안정 deck id·source 경로·output slug·공개 옵션을 연결하고 중복 id/출력 경로를 preflight해야 한다. 모든 장의 id를 작성자가 수동으로 넣게 할 필요는 없다. 숫자 #n은 호환 경로로 유지할 수 있으며 영구 장 anchor는 선택 확장이다.

[build-examples](../../../scripts/build-examples.cjs#L7)는 product-launch/engineering-review/photo-story/workshop/devday-compositions 5개 slug를 고정해 build한다. 새 원고는 buildDeck API/개별 CLI로 만들 수 있지만 현재 일괄 build에 자동 발견되지 않는다. 현재 일괄 예제 생성에 포함하려면 목록 코드 수정이 필요하다. direct 원본 3종은 별도 경로다. 새 컬렉션은 작은 manifest/경로 규칙으로 추가를 처리하고 runtime/theme은 공통 자원으로 참조하는 방향이 적절하다. 모노레포/플러그인/React는 선결 조건이 아니다.

## compiled 폴더 단독 공유·공개 projection

현재 build의 output에는 **index.html/content.js 두 파일만** 생겼다. 정적 dependency closure는 다음과 같다.

| 참조 | 원래 위치 | compiled에 포함 | 더 깊은 위치로 폴더 복사 후 |
| --- | --- | --- | --- |
| content.js | output 내부 | 예 | 존재 |
| styles/visual CSS·model/visual/app JS 5파일 | 실제 repo 상대 참조 | 아니오 | 참조 파일 없음 |
| 이미지 | 원고 폴더의 `space name.svg` 상대 참조 | 아니오 | 원고 폴더와 자산을 함께 옮기는 패키징 필요 |
| 도움말 slides.md | source 원고 상대 참조 | 아니오 | 참조 파일 없음 |
| 예제 gallery | repo examples/index.html 상대 참조 | 아니오 | 참조 파일 없음 |

브라우저 실행이 아닌 **정적 경로/포함 목록 감사**이며 결과를 file UI 회귀로 표시하지 않는다. 웹 컬렉션에서 공통 runtime을 참조하는 것은 정상이다. compiled 폴더만 떼어 보내는 독립 package 기능과는 다르므로 새 portable packager가 필요한 runtime/media/첨부와 선택 entry를 모아야 한다. 기존 standalone direct-deck의 runtime5복사 계약은 재사용 후보지만 compiler에 이미 portable 옵션이 있는 것은 아니다.

[generatedHtml](../../../scripts/markdown-deck.cjs#L268)는 도움말에 source 원고 링크를 자동 삽입한다. 이것이 원고를 복사/게시한다는 뜻은 아니지만 기존 source가 웹에 노출되어 있으면 접근 경로가 된다. notes는 generated content에 남았다. 상대 아키텍처 감사가 확인한 [renderDataPage](../../../visual.js#L388)도 visual slide notes를 실제 표 페이지에 추가한다. **UI에서 노트만 숨기는 방식으로 공개 제외를 보장할 수 없다.**

새 proposal은 문서 role에서 발표/청중 읽기/발표자 projection을 생성하고 notes 제외 공개 데이터·다운로드·artifact allowlist를 분리하는 것이다. 공개 Markdown/첨부 opt-in과 notes 제외/부록 포함 기본값은 팀 제안이며 사용자 확정값이 아니다. 원본이 이미 PUBLIC Git에 있는 사실은 artifact 제외로 되돌리지 못한다. 본 감사는 비공개 기능을 구현하거나 데이터 삭제를 한 작업이 아니다.

## 교차 협의·후속 수용

상대 `/root/engineering_manager/performance_auditor`와 app의 closure 결합·blocks 모델/renderer 빈칸·notes 표 페이지 노출 반례를 직접 교환했다. 이 담당은 실제 sourceLink/content notes, preflight 보존과 I/O 원자성 구분, compiled dependency closure를 전달했다. 상대 architecture-audit 실질 초안을 전체 읽고 전면 app 분리 대신 blocks 한 분기/덱별 HTML 격리, source 위치 필수와 영구 장ID 선택의 분리, projection별 자산 목록에 동의했다. 위 반례와 합의를 종합에 반영했다.

후속 구현은 리서치의 일반 6장 샘플에서 제목·이미지+목록·링크·code 속 `---`·인용·표·순서·원문 보존, legacy 결과 의미 호환, 두 덱 독립 id/path/assets, invalid시 이전 성공본, source patch 없는 preview 권위, 공개 notes 제외를 확인해야 한다. 긴 코드/표/한글은 삭제·자동 요약하지 않고 overflow 진단과 읽기 전체 보존으로 다룬다. 이번에는 새 parser·본문 renderer·watch·packager·공개 projection을 구현하지 않았다.
