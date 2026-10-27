# Markdown 재사용 구조 감사

2026-10-27 · `/root/engineering_manager/performance_auditor` · 기준 `835453787bd3fdf75837a618674e6fb20828ee7a`

## 결론과 최소 변경

**Markdown 주원본 → 의미를 보존한 문서 모델 → 기존 STAGE의 발표·청중 읽기 출력**이 최소 목표다. 일반 Markdown을 현재 layout 필드에 밀어 넣는 parser 교체만으로는 충족되지 않는다. 공통 스타일·20개 양식·native visual은 재사용하고, 기본 본문 blocks의 검증·렌더 경로와 공개 출력 경계를 추가한다. 먼저 파일 편집+자동 preview/build를 제공하면 되므로 React UI·전면 app 모듈화·새 디자인 시스템은 선행 조건이 아니다.

아래의 현행은 실제 소스 감사이고, 부족은 새 요구와의 차이이며, API·폴더·출력 정책은 **미구현 제안**이다. 제품·기존 원고·기존 연구를 바꾸지 않았다. compiler 실행 재현은 상대 담당 산출물과 구분한다.

## 실제 재사용 경계

| 경계 | 현행 확인 | 부족과 최소 제안 |
| --- | --- | --- |
| 입력·검증 | [모델](../../../deck-model.js#L1)은 브라우저 전역/Node UMD로 순수 검증·visualSeries·packMosaic 등의 API를 제공한다. [20양식 목록](../../../deck-model.js#L9)과 layout별 타입/수량 검증이 있다. | 임의 문서 blocks/inline 검증은 없다. 단, 모델이 모든 알 수 없는 필드를 거절하는 것은 아니다. compiler의 [FIELDS 검사](../../../scripts/markdown-deck.cjs#L138)는 blocks를 거절하지만, 알려진 layout에 blocks만 추가하면 모델 오류 없이 renderer에서 무시될 수 있다. 새 blocks 분기의 명시 schema/검증이 필요하다. |
| 브라우저 bootstrap | [index](../../../index.html#L10)은 CSS 2개와 classic defer `content→model→visual→app` 순서다. [app](../../../app.js#L5)은 `#slideStage`, 전역 모델·PRESENTATION을 실행 시 capture하고 즉시 초기화한다. | app은 재사용 함수 API가 아닌 한 문서당 한 player IIFE다. 다중 덱은 먼저 덱별 HTML로 격리한다. 첫 단계부터 한 페이지 multi-mount를 지원하려고 고정 ID·body 상태·window 이벤트를 전부 뜯을 필요는 없다. |
| 장 renderer | [renderSlide](../../../app.js#L405)는 closure의 deck/state/validationIssues와 DOM helper를 사용한다. 본문·전체 보기·발표자 preview가 같은 분기를 재사용한다. | 함수가 이미 독립 export된 renderer는 아니다. 최소 변경은 blocks 한 분기와 공통 `renderBlocks` helper 추가다. 명시 layout은 기존 분기를 유지하며 추후 필요할 때만 `renderSlide(slide, context)`로 분리한다. |
| native 자료 | [StageVisual](../../../visual.js#L361)은 같은 visual에서 plot·hero·table을 반환하고 `tableNode`/`renderDataPage`를 제공한다. | UMD라 해도 렌더 함수는 `document`를 사용한다. Node에서 require할 수 있음과 DOM 없는 SSR 가능은 다르다. 명시 visual 자료는 기존 검증/renderer로 연결하고, 일반 표는 의미 있는 table로 그대로 렌더한다. |
| 공통 스타일 | [styles 토큰](../../../styles.css#L2)의 시스템 글꼴·stage/paper/midnight·의미색, [제목/본문](../../../styles.css#L197)의 위계·읽기 폭·줄바꿈을 공유한다. [visual CSS](../../../visual.css#L2)는 같은 색 토큰과 구도를 사용한다. | CSS는 token만의 theme 패키지가 아니라 shell·20양식·모드 선택자를 함께 담는다. 새 `.layout-blocks`/읽기 본문에 기존 토큰·타이포를 적용하고 h2/list/code/일반 table만 최소 보완한다. 기존 statement의 큰 제목+subtitle에 전 문서를 넣는 것은 스타일 재사용이 아니다. |
| HTML 생성 | [generatedHtml](../../../scripts/markdown-deck.cjs#L268)은 루트 template의 파일 경로·hash·title·helpDialog 첫 문단을 정규식으로 바꾼다. [buildDeck](../../../scripts/markdown-deck.cjs#L287)은 모델/미디어 확인 뒤 content/index를 기록한다. | 루트 helpDialog 구조·고정 파일명에 결합하며 발표·읽기·공개판별 template API가 없다. 새 모드의 template 입력은 title/runtimeRefs/dataRef/outputKind 정도로 좁히고, legacy 생성 함수는 호환 경로로 유지한다. |
| 컬렉션·복사본 | [build-examples](../../../scripts/build-examples.cjs#L7)은 5 slug와 direct deck 3개를 코드에 고정한다. [direct-deck](../../../scripts/direct-deck.cjs#L31)은 standalone 때 runtime 5파일을 복사한다. | 범용 registry/컬렉션 자동 preview는 없다. 웹은 중앙 runtime을 참조하고 portable에서만 필요한 사본을 생성한다. 이번 정적 대조에서 두 스타터 runtime 10파일은 각각 루트와 바이트 동일했다. 사본은 배포/보수 비용이며 한 페이지 전송량에 모두 합산하지 않는다. |

## 일반 본문 모델과 renderer 계약

현재 compiler는 [문단·제목 매핑](../../../scripts/markdown-deck.cjs#L148)에서 문단을 합쳐 subtitle/caption/attribution 등으로 옮긴다. app의 [field/title](../../../app.js#L145)은 textContent 문자열 또는 제목 문자열 배열을 렌더한다. 여기에 AST를 문자열로 직렬화하거나 HTML을 넣는 것만으로는 link·강조·목록·표·code의 의미가 살아나지 않는다.

제안하는 최소 문서 모델은 `Document{meta, sections, assets, sourceRevision}`와 `Section{role, blocks, explicitLayout?, sourceLocation}`이다. 블록은 heading/paragraph/list/image/blockquote/code/table, inline은 text/emphasis/strong/link/code/break를 보존한다. source 위치는 진단·원고 연결을 위한 것이며 Markdown 역저장을 구현했다는 뜻이 아니다. 노드 종류와 parser dialect를 명시하고 지원 밖 노드는 위치와 함께 실패시킨다.

발표 투영은 일반 장에 제안명 `layout: blocks`를 사용한다. 이는 **기존 20양식에 없는 새 분기**이며 이름·schema 확정은 구현 단계다. 기존 모델의 layout 목록과 blocks 검증, app의 이름/렌더 분기, thumbnail·presenter preview, 넘침 진단 경로를 함께 바꿔야 한다. renderer는 원문 순서대로 semantic DOM을 만든다. 첫 heading의 inline 의미는 실제 제목 DOM에 보존하고, 목록/검색용 plain label이 필요하면 파생값으로만 만든다. 첫 장 cover·마지막 closing·숫자 metric·표 chart를 자동 추론하지 않는다.

`renderBlocks(blocks, {mode, resolveAsset, onDiagnostic})`라는 작은 DOM helper를 발표와 별도 읽기에 공유할 수 있다. code는 textContent로 공백/줄바꿈을 보존하고, list/quote/table은 해당 요소·표 header/셀·alt·link를 보존한다. 현 `safeUrl`·media 오류 표시 정책을 참고하되 link와 media의 허용 경로를 구분한다. raw HTML은 일반 원고의 실행 경로로 사용하지 않는다. 읽기는 문서 흐름·코드/표 스크롤로 전체 내용을 보여 주고 발표는 넘침을 원본 위치로 진단한다. 자동 요약·삭제·전체 글자 축소·자동 장 추가로 맞추지 않는다.

기존 [geometry 진단](../../../app.js#L962)은 `[data-field]`와 media-frame 중심이라 새 code/list/table을 자동으로 전부 검사하지 않는다. blocks별 DOM/source 연결을 별도로 두고 경계·스크롤/클리핑을 확인해야 한다. rich inline을 현재 plaintext 편집의 `[data-field]`로 감싸면 innerText 저장이 구조를 지우므로 새 Markdown 모드에서는 그 편집 경로를 사용하지 않는다.

명시 layout adapter는 기존 20양식 schema를 그대로 타깃으로 한다. `image` 요청에 이미지+캡션만 맞으면 연결하고, 목록까지 있으면 기본 blocks로 바꾸라는 진단 또는 작성자의 장 분리를 요구한다. 설명 없는 노드 누락·중복 원본 덮어쓰기·일반 표의 visual 변환은 금지한다. `stage` JSON visual/bento 등은 별도 고급 경로다. 기존 반복 `#` 줄바꿈 원고는 legacy dialect를 유지하고 새 일반 Markdown과 버전/명령 옵션으로 분리한다.

## 원본 권위와 읽기·공유의 차이

현행 원본·화면 상태는 세 층이다. `slides.md`에서 생성한 디스크 content.js, [서명 일치 시 복원하는](../../../app.js#L55) localStorage rawDeck, [화면 입력](../../../app.js#L1248)으로 바뀐 메모리 rawDeck이다. [export](../../../app.js#L1095)는 rawDeck을 content.js로 내보내며 Markdown 저장·patch가 아니다. 재빌드하면 원고에서 생성물을 다시 쓰고 sourceSignature가 달라지면 기존 브라우저 편집본 복원을 건너뛴다. 이를 현재 데이터 손상이나 id 충돌로 과장하지 않지만, 새 MD 권위와 화면 저장이 경쟁하도록 두면 수정 유실을 부른다.

**새 모드의 최소안은 읽기 전용 preview다.** 파일 수정→watch compile→preview reload만 제공하고 generated content.js 편집/내보내기를 원고 저장으로 안내하지 않는다. legacy deck은 현재 편집·export를 유지한다. 임시 화면 draft를 남길 경우에도 sourceRevision과 미반영 상태를 표시한다. source patch·Markdown serializer·파일 충돌 처리·주석/줄바꿈 보존은 별도 후속이다. stable node id를 추가하는 것만으로 역변환 문제가 해결되지는 않는다.

현재 [읽기 전환](../../../app.js#L765)은 같은 stage의 장을 펼치며 [read CSS](../../../styles.css#L635)가 크기/흐름을 바꾼다. Markdown heading 계층·부록·일반 문서 구조를 복원하는 별도 읽기 생성은 아니다. 새 청중 읽기는 같은 문서 모델에서 생성하고 공통 토큰/본문 helper를 공유한다. visual 장의 plot/수치/표는 같은 자료를 계속 사용하며 disk data.html과 브라우저 임시 편집의 차이는 legacy 계약으로 남긴다.

새 notes 제외 정책은 **출력 데이터 생성 단계**에서 적용해야 한다. 현재 audience content.js에도 notes가 있고, [StageVisual.renderDataPage](../../../visual.js#L388)는 visual 장의 notes를 표 페이지 본문에 실제 추가한다. [발표자 동기화](../../../app.js#L1133)도 rawDeck 전체를 보낸다. 발표자 UI만 숨기거나 `?presenter=1`·token을 쓰는 것은 공개 artifact의 노트를 제외하는 기능이 아니다. 기존 공유가 노트 비공개를 약속했다고 해석하지 않는다.

기본 제안은 공개 발표·청중 읽기에서 notes를 제외하고, 발표자용 원고/노트 출력은 로컬 preview 또는 별도로 선택한 비공개 전달 경로에 두는 것이다. 새 public data/read HTML/source download/asset 목록에서 notes와 notes 전용 참조를 제외한다. 원본 다운로드는 opt-in이며 공개 투영에서 만든 Markdown과 내부 원고를 구분한다. 단, 이미지에 적힌 정보나 이미 공개 Git 원본까지 자동으로 비공개가 되는 것은 아니다. 부록은 읽기 포함·발표 제외 후보로 두되 역할 구문과 기본값은 회의에서 결정할 제안이다.

## 다중 덱 registry와 최소 모듈

deck id·출력 slug·원고 경로를 별도 값으로 관리한다. [현 fallback](../../../scripts/markdown-deck.cjs#L253)은 basename이어서 서로 다른 slides.md가 같은 id가 될 수 있지만 현재 저장키에는 pathname도 있다. 현재 저장 충돌로 단정하지 않는다. 작은 프로젝트 목록은 `{id, source, slug, dialect, outputs, sourceDownload}` 정도면 충분하다. 기본 style/theme은 프로젝트에서 한 번 정하고 덱별 원고에는 선택 metadata만 둔다. 도구가 새 원고를 발견해 목록을 갱신하거나 등록 명령을 제공할 수 있으며, 일반 작성자에게 매 장 id나 CSS 설정을 요구하지 않는다.

등록된 deck id는 제목과 분리해 유지하고 source 이동은 목록의 source만 갱신한다. 중복 id/slug·같은 출력 경로는 사전에 실패시킨다. 기존 `#n`은 호환하고 영구 slide anchor/삽입·이동 후 id 유지 알고리즘은 초기 필수에서 제외한다. source span은 최초 진단에 필요하지만 장 영구 id와 같은 개념은 아니다.

| 제안 책임 단위 | 입력 → 출력 | 재사용/작은 변경 |
| --- | --- | --- |
| `compiler/document` | Markdown+dialect → 의미 blocks·역할·source 위치·진단 | 일반 parser 추가, legacy parse는 유지 |
| `compiler/project` | registry+defaults → deck별 source/slug/출력 계획 | 고정 예제 목록을 새 프로젝트 경로와 분리 |
| `compiler/projections` | 문서 모델 → audience/presenter/read·명시 legacy layout 자료 | 일반 blocks 유지, legacy model/visual 검증 재사용, 역할·공개 선택 적용 |
| `compiler/assets-output` | 각 projection의 참조+출력 종류 → asset map·template data·파일 목록 | 기존 선언 미디어 경로 계산/실재 검사 재사용. 일반 link/첨부·portable copy까지 확장 |
| `runtime/blocks` + 현 app | 검증된 장/본문 → 발표·미리보기·읽기 DOM | 현 app에 blocks 분기·공통 helper만 먼저 추가, stage shell/20분기 유지 |
| `preview/build` | source/자산 변경 → 해당 덱 재생성·진단·reload | 성공본 유지·임시 출력 뒤 교체. React 편집기·실시간 source patch는 불필요 |

위 이름은 실제 파일/패키지가 아니라 책임 경계 제안이다. 한 저장소·소수 파일로 시작해도 된다. 기존 app 전체 분리·플러그인 registry·모노레포·새 프레임워크를 먼저 만들지 않는다. 장차 다중 mount/독립 renderer가 필요할 때만 `createPlayer({root, deck, model, visual, storage, transport})`와 destroy/구독 해제를 도입한다. 그 전까지 고정 DOM ID와 전역은 덱별 문서 안에 격리한다.

웹 컬렉션은 공통 runtime/style을 중앙에서 생성·참조하고 덱별 원고와 자산을 분리한다. portable은 해당 deck의 projection/runtime/선택 자산을 출력 안으로 복사해 상대 경로로 완결한다. 현재 compiler는 원고 밖 파일을 상대 참조할 뿐 범용 portable 패키저가 아니다. 새 출력은 원고 기준 URI와 발표/읽기/다운로드의 출력 URL을 구분한 asset map을 생성해야 한다. 공통 runtime 변경은 관련 HTML hash와 모든 portable 사본 재생성의 의존성이다. 덱 내용만 바뀌면 다른 덱 산출물은 유지하는 검증을 둔다.

## 회의 결정과 구현 인수 기준

1. 새 일반 dialect와 legacy dialect를 구분하고 blocks 모델/renderer를 함께 추가한다. 연구의 6장 예시가 현재 동작한다고 표시하지 않는다. 제목+이미지+목록·inline link·code 속 `---`·일반 표를 같은 의미/순서로 발표와 읽기에 보존한다.
2. Markdown은 유일한 작성 권위, 새 preview는 읽기 전용을 우선한다. 구형 content.js 프로젝트의 편집·무빌드/file 결과는 호환 경로이며 새 build 흐름의 거절 사유가 아니다.
3. 같은 스타일로 두 주제/같은 basename 원고를 각각 생성하고 id/slug/자산/출력이 분리되는지 확인한다. source 이동·자산 query/hash·missing asset·중복 slug와 invalid 원고에서 이전 성공본을 보존한다. 현 build의 검증 후 쓰기는 참고할 수 있으나 두 파일/컬렉션의 원자적 교체를 이미 보장하지 않는다.
4. notes 포함 원고에서 공개 data/HTML/다운로드 목록에 notes sentinel이 없는지 확인한다. 발표자용 출력의 포함 정책과 부록 기본값은 명시한다. raw source 자동 링크는 새 public template에서 기본으로 만들지 않는다.
5. 현 20양식 회귀와 blocks의 thumbnail·발표자·장 이동·390px·모션 줄이기·표/코드 키보드 스크롤·링크/alt·overflow 진단을 확인한다. 새 의미 노드를 plain-field 진단만으로 검수 완료했다고 하지 않는다. 기존 185검사는 같은 제품 소스의 총괄 통과를 재사용하며 이번 감사에서 반복하지 않았다.

## 교차 검토·검증 범위

연구 4문서와 app/model/visual/styles/index·compiler/direct-deck/build-examples·작성 가이드를 직접 읽었다. 두 스타터 runtime 10사본의 바이트 동일성을 정적으로 대조했다. 신규 설치·제품 시제품·브라우저·빌드 실행은 하지 않았다. 실제 `/tmp` compiler 재현은 상대 담당의 별도 근거로 취합한다.

compiler 감사 담당 `/root/engineering_manager/migration_designer`와 서로 실질 초안을 전체 읽고 [compiler 감사](compiler-audit.md)·재현 script/JSON을 대조했다. 상대의 18입력(8성공/10거절)·3 preflight 보존·compiled 두 파일의 외부 의존·notes/sourceLink 반례는 현재 기능의 관찰이며 새 renderer/portable 구현 증명이 아님에 동의했다. 반론·대안 협의 결과, app 전체 API 분리보다 blocks 검증+본문 helper+덱별 HTML 격리를 먼저 채택하고, source 위치는 필요하나 영구 slide ID는 선택으로 둔다. 공개 자산은 projection별 참조에서 계산해 notes 전용 첨부를 제외하되 본문과 함께 쓰는 자료는 남긴다. model 검증 추가만으로 표시가 해결되지 않음, preflight 보존과 새 staging/교체 제안을 구분함도 양방향 합의했다. 추가 필수 설계 정정은 없었다.

이 담당의 정확한 편집 범위는 **이 파일 하나**다. 로컬 링크·소스/근거 대조·공백 검수를 마쳤고 **편집을 종료한다.** WORK_LOG·MEETING·최종 합의는 총괄 소유다.
