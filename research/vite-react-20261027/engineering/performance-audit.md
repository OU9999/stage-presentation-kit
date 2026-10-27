# STAGE 성능 감사와 검증 계획

2026-10-27 · 담당 `/root/engineering_manager/performance_auditor` · 제품 기준 `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 판단

**성능 개선은 가능하지만 현재 근거로 React 전환을 성능 해법으로 확정할 수 없다.** 먼저 현행 재생기의 미디어 요청 범위·측정 작업·발표자 갱신 범위를 분리해 계측하고 개선한다. Vite의 빌드·전송 효과와 React 작성 UI의 관리 이득은 이 작업량 개선과 따로 비교한다. 실제 CPU trace·동등 기능 production 비교가 없으므로 아래 항목은 확인된 작업 경로에 근거한 **검증 후보**이며 병목 순위나 절감률을 실측한 결과가 아니다.

최신 코드에는 `visual`을 포함한 **20개 양식**이 있다([모델](../../../deck-model.js#L9), [렌더러](../../../app.js#L405)). `goTo()`의 관객 장 이동은 기존 DOM을 재사용한다. 전체 렌더 제거를 React의 자동 이득으로 계산하면 잘못된 비교다. 반면 발표자 창은 다른 경로를 사용하므로 관객과 함께 평균내지 않는다.

도입 경로는 **Vite 작성 환경 + 독립 React 작성 UI + 경량 재생기**로 구체화할 수 있다. HTTP/Pages용 production 출력과 폴더 복사·무설치용 portable 출력을 구분하고 공통 모델/콘텐츠 계약을 공유한다. `file://`는 portable 출력의 인수 조건이며 Vite/React 작성 도구를 도입하지 못할 이유가 아니다. 상세 경계와 최소 빌드 증명은 전환설계 담당 산출물에서 평가하고, 아래 성능 실험은 이 설계와 함께 진행할 수 있다.

## 현재 근거와 해석 한계

수치는 모두 같은 최신 HEAD의 [browser-baseline.json](../evidence/browser-baseline.json), [baseline-summary.json](../evidence/baseline-summary.json), [source-sizes.json](../evidence/source-sizes.json), [keyboard-outlier-check.json](../evidence/keyboard-outlier-check.json)을 직접 대조했다. `*-before-pull.*`는 사용하지 않았다. 감사자는 브라우저를 새로 실행하지 않았다. 기존 185개 검사 통과는 총괄 실행 결과이며 여기서 재실행하지 않았다.

| 덱 | 장 / 숨긴 장 | 문서 전체 요소 수, 3회 | stage 편집 필드 수 | 문서 FCP 중앙값 | 최초 요청 이미지 URL / 로컬 파일 합계 |
| --- | --- | --- | --- | --- | --- |
| 루트 | 20 / 19 | 515 / 515 / 515 | 112 | 84ms | 13 / 2,108,987B |
| DevDay | 7 / 6 | 485 / 490 / 490 | 79 | 136ms | 6 / 1,831,368B |
| visual-story | 12 / 11 | 853 / 853 / 853 | 48 | 64ms | 0 / 0B |
| text-layout | 8 / 7 | 623 / 623 / 623 | 28 | 88ms | 0 / 0B |

- 환경은 Python HTTP 서버·1440×1000·페이지 캐시 비활성·CPU/네트워크 제한 없음·각 3회다. 현장 CWV, 저사양 성능, 첫 슬라이드 완료, 전환 후 개선율을 의미하지 않는다. 사전 HTML의 header/toolbar도 FCP를 만들 수 있다.
- `stageReadyObservedMs`는 MutationObserver가 `.is-active` DOM을 발견한 시각이다. 미디어 decode·텍스트 맞춤·paint·모션 종료를 기다린 ready가 아니다. 이 수치를 첫 장이 모두 그려진 시간으로 이름 바꾸지 않는다.
- 초기 루트에는 이미지 요소 23개가 있고 모두 당시 숨긴 장 안에 있었다. 13개 URL의 로컬 파일 합계 2,108,987B는 요청 파일 목록과 대응하는 원본 크기다. 응답 압축·캐시·decode·네트워크 전송량 실측의 대체값이 아니다. visual/text 덱의 이미지가 0개이므로 사진 개선만으로 전체 성능을 설명하지 않는다.
- 루트 `index.html` + CSS 2개 + JS 4개 합계는 269,472B, 파일별 오프라인 gzip 합계는 62,689B다. 여기에는 루트 `content.js`가 포함된다. 서버는 압축을 제공하지 않았고 일부 resource timing의 size가 0이므로 gzip 추정을 실제 Pages 전송량으로 쓰지 않는다.
- 두 standalone 스타터의 runtime 사본은 저장소·유지보수 중복이다. 한 페이지에서 그 모든 사본을 동시에 받는 구조가 아니므로 위 페이지 전송 후보 크기에 더하지 않는다.
- 첫 로드 표본에서 루트 첫 run에 64ms long task 1개가 관찰됐으나 원인 trace가 없다. 다른 초기 run의 long task 0도 모든 상호작용이 빠르다는 증거는 아니다.
- 기존 실제 키 이동 43회의 동기 이벤트 중앙값은 루트/DevDay/visual/text 순서로 약 1.2/0.8/1.8/1.3ms다. capture부터 window bubble까지의 처리 구간으로, rAF·지연 diagnostics·layout/paint를 포함하지 않아 INP나 화면 반응 시간으로 쓰지 않는다. text의 단일 249.7ms 값은 같은 원본으로 추가 16회에서 최대 8.2ms·신규 long task 0으로 재현되지 않았다. 원시값은 보존하며 코드·GC·브라우저·계측 중 어느 원인도 확정하지 않는다.

## 소스에서 확인한 작업 계약

기호 `N`은 장 수, `F`는 stage 전체 편집 필드 수, `V`는 시각자료 장 수다. 아래의 비례 관계는 반복문/호출 경로 설명이며 소요 시간의 실측값이 아니다.

| 사용자 경로 | 즉시 실행하는 작업 | 뒤따르는 작업과 유지 계약 |
| --- | --- | --- |
| 최초 진입 | 원본 clone·sourceSignature 직렬화·서명 일치 저장본 복원→전체 validate. 마지막 `render()`에서 다시 validate→stage 비우기→N장 `renderSlide(..., false)`→`updateActive()`의 전체 장·필드 순회 | `updateActive()`가 rAF text fit·220ms diagnostics를 예약하고 `render()`도 rAF scale을 예약한다. scale은 fit을 다시 호출한다. 모든 장의 미디어 `src`를 DOM 생성 시 넣는다. 숨긴 DOM도 초기 생성 비용·미디어 요청 가능성이 있다. |
| 관객 일반 next/previous/Home/End·hash 이동 | `goTo()`가 index/hash/revision 갱신→`updateActive()`가 N장 class/hidden, F필드 editable 상태, 비활성 장 video pause, 카운터/접근성 알림 갱신 | **stage 전체 재생성 없음.** read 모드는 기존 장으로 smooth/instant scroll. rAF fit·debounced diagnostics를 예약한다. 발표자 연결 시 full deck state를 postMessage한다. |
| 시각자료 JSON 적용 | JSON parse→`validateVisual()`; 잘못된 값이면 draft/오류를 남기고 종료. 성공 시 rawDeck의 해당 visual을 교체→`persist()` 전체 validate·전체 직렬화/저장·revision·sync→`render()` 전체 validate·N장 재생성 | 같은 원본으로 plot/강조값/발표 안 표가 같이 갱신된다. `StageVisual.render()`도 입력 visual을 검증한다. 국소 JSON 적용에도 전체 deck 경로를 사용하므로 검증/렌더 범위를 줄이는 후보이지만 오류·저장·동기화를 먼저 보존해야 한다. |
| inline 입력·편집 마침 | 입력마다 기존 `[data-field]`에서 원본 경로로 문자열 반영. 입력 이벤트 안에서 stage 재생성 없음. rAF fit·220ms diagnostics·250ms persist 예약 | 마침에는 `persist(); render()` 전체 경로. plaintext-only·선택/한글 IME/undo·title/highlight 연동을 보존한다. 매 타이핑 React controlled 재렌더로 바꾸면 동등성 검증이 새로 필요하다. |
| 전체 보기 | 열 때마다 grid를 비우고 N장 `renderSlide(..., true)`로 미리보기 생성. 버튼과 thumbnail DOM이 추가된다. | 미리보기는 live table·heatmap 포커스·video controls를 생략하지만 SVG plot과 미디어 src는 생성한다. 닫기는 dialog를 숨기며 grid를 지우지 않으므로 다음 열기 전까지 이 DOM이 남는다. 열린 dialog의 current 초점·키보드 이동·닫기 후 초점 복원을 보존한다. |
| 발표자 최초 진입·변경 state 수신 | 발표자도 `render()`에서 숨긴 원래 stage N장을 만든다. `updateActive()`→`renderPresenter()`가 current/next preview를 별도 재생성한다. message의 revision/index/theme 중 변경이 있으면 full deck clone·validate 후 다시 `render()` | preview 최대 2장 + 숨긴 stage N장. 관객 `goTo()`는 revision을 갱신하므로 단순 장 이동도 발표자에서는 전체 stage 재렌더 경로다. 발표자 자체 이동은 명령을 opener에 보내고 관객 state 응답을 따른다. |
| 발표자 연결 유지 | 발표자 2초 간격 hello→관객이 full deck state 응답. unchanged revision/index/theme이면 발표자는 clone/validate/render를 생략 | postMessage에 full deck payload는 매 응답에 포함된다. timer/connection은 별도. token·origin·source 확인, file의 origin 처리, 재접속·노트·current/next·시작 시각은 최적화 후에도 지킨다. |

근거: [초기·모델·저장](../../../app.js#L13), [media](../../../app.js#L193), [visual renderer](../../../app.js#L432), [render](../../../app.js#L742), [updateActive](../../../app.js#L765), [JSON 적용](../../../app.js#L915), [goTo/persist](../../../app.js#L1008), [전체 보기](../../../app.js#L1057), [발표자](../../../app.js#L1111), [state 수신](../../../app.js#L1160), [inline 입력](../../../app.js#L1248), [타이머/hello/bootstrap](../../../app.js#L1329), [visual 검증·표](../../../visual.js#L361).

### 치수 측정과 diagnostics

`fitTextLayouts()`([app.js:798](../../../app.js#L798))는 문서 전체 `.layout-visual`을 찾고 `clientWidth`가 0인 장은 건너뛴다. 관객 발표 모드의 숨긴 장은 대체로 건너뛰지만 선택자 검색과 첫 치수 읽기는 남는다. 읽기 모드는 여러 장을 측정하고, 전체 보기/발표자 미리보기도 같은 문서 선택자에 들어간다. 장별 class/font-size를 초기화한 뒤 `offsetHeight/clientHeight`, 자식 `offsetWidth`, computed gap, `scrollWidth`, hero 폭·font-size를 읽고 다시 class/font-size를 쓴다. **쓰고 읽는 순서가 있으므로 강제 layout 후보**이나 실제 flush 횟수·시간은 trace로 확인해야 한다. 무조건 CSS 계산이 병목이라고 확정하지 않는다.

`scaleStages()`([app.js:820](../../../app.js#L820))는 세 viewport의 폭/높이를 읽고 CSS 변수 쓰기 후 fit→diagnostics 예약을 한다. bootstrap·rAF·resize/ResizeObserver·fullscreen·읽기 전환이 같은 작업을 중복 예약할 가능성이 있다. 기존 fit은 원문과 editable DOM을 바꾸지 않고 긴 값에 행을 먼저 준 다음 숫자만 축소한다. 측정 결과 캐시는 장 revision뿐 아니라 viewport 폭·모드·theme/폰트·미디어/본문 변경에 맞춰 무효화해야 한다.

diagnostics([app.js:956](../../../app.js#L956))는 매번 이전 타이머를 취소해 220ms 뒤 **현재 장만** 측정한다. 발표자·읽기 모드에서는 측정을 생략한다. field마다 DOMRect·computed style·text Range 경계·scroll/client 치수를 읽고 media frame을 확인한 뒤 장별 geometryIssues를 저장한다. `updateDiagnostics()`는 누적 validation+geometry issue 목록을 매번 다시 만든다. 따라서 이를 모든 장 geometry를 매 키마다 동기 측정한다고 설명하면 틀리다. 다만 장 전환 후 대기·이미지 load/error·resize·입력 뒤 작업량은 현행 키보드 sync 값에서 빠진다. 경고를 삭제해 속도를 얻는 변경은 동등 성능 비교로 인정하지 않는다.

## 우선 조사·개선 후보

우선순위는 **검증을 시작할 순서**다. 확인한 비용의 크기 순위가 아니다. 각 후보는 vanilla 상태에서 먼저 비교할 수 있다.

| 순서 | 후보·제안 | 근거와 기대하는 변화 | 채택 전 반례·확인 |
| --- | --- | --- | --- |
| 0 | 경로별 mark/trace를 격리 복사본에 추가 | DOM 생성·model validate·fit·diagnostics·postMessage·preview 생성·layout/paint·이미지 decode를 분리해 실제 비용 확인 | 최초 ready와 input-to-paint 정의를 먼저 고정. rAF 완료만을 실제 paint 완료로 단정하지 않고 trace/screenshot과 대조. instrumentation 부하도 기록. |
| 1 | 미디어 크기/요청 범위 조정 | 사진 덱에서 비활성 장 이미지 요청 13URL/2.1MB가 확인됐다. 원본 적정 해상도·압축과 현재/인접 장 명시적 준비를 분리 실험 | `loading=lazy`만으로 다음 장 준비를 보장하지 않는다. #n 직접 진입·연속/역방향/Home/End 이동·발표자 다음 장·읽기/전체 보기·오프라인 file·잘못된 경로 fallback을 검증한다. 첫 장 이미지와 인접 장은 준비/decode 시점 명시. 이미지 없는 덱의 영향 0도 따로 보고. |
| 2 | fit/scale 호출 병합·유효한 장만 측정·read/write 단계화 | 같은 frame의 중복 rAF와 전역 visual 검색, class/font 초기화 후 치수 읽기가 정적으로 확인됨 | 긴 한글·9,876,543.2·단위/label·좌우/중앙 정렬·390px·읽기/전체 보기·발표자·실시간 inline 편집에서 현재 문구/DOM·배치 동등성. 캐시 stale·ResizeObserver 재진입을 확인. trace에 개선이 없으면 복잡성 추가를 채택하지 않음. |
| 3 | 발표자 navigation delta·preview만 갱신 | 관객 장 이동 때 발표자 전체 deck clone/validate/render가 발생하고 주기 응답에도 full payload가 포함됨 | content revision과 navigation sequence를 분리하고 최초/재접속은 full state. 구버전/누락 delta resync·수정 직후 장 이동·양방향 명령·token/origin/source·file를 유지. 관객 개선과 별도 계측. |
| 4 | JSON apply의 검증/DOM 범위 줄이기·diagnostics 목록 갱신 줄이기 | 성공 apply에서 validateVisual→persist 전체validate/직렬화→render 전체validate/DOM→visual 재검증이 이어짐 | 단일 source 원칙·전체 deck 오류 격리·plot/강조값/표 일치·저장 실패/내보내기·발표자 최신 deck·원본 서명 계약 유지. 검증 API의 신뢰 경계를 명시한 뒤 중복 제거. |
| 5 | ordinary updateActive의 이전/현재 장 차등 갱신·thumbnail 캐시 | 관객 이동은 이미 DOM 재사용하지만 전체 장·필드 순회. 전체 보기 N장 재생성 및 닫힌 DOM 잔류 | edit 토글·읽기 전환·theme·reset/full render 시 전체 갱신 경로 유지. 비활성 영상 pause, 스크린리더 알림, focus/thumbnail 최신성을 검증. DOM 가상화는 read 전체 내용/브라우저 검색/표 접근/발표자와 충돌해 이후 후보. |
| 별도 | Vite minify·asset/entry 관리, 필요 시 독립 React 편집 패널 | 압축 전 269KB 텍스트 shell/runtime는 정적 build 비교 대상. 큰 작성 UI의 상태 관리 이득은 별도 목적 | 최소 probe 크기를 전체 STAGE dist/로딩 성능으로 확대하지 않음. same DOM·미디어 정책을 고정한 production 비교가 필요. React 자체가 위 순회/전체렌더/치수 측정을 자동 삭제하지 않음. |

## 실행 가능한 후속 검증

이번 감사의 완료는 설계·근거 검수다. 아래는 구현 승인 후의 비교 계획이며 실행 결과로 표시하지 않는다.

1. **동일 입력과 출력 계약을 고정한다.** 현재 네 덱에 20양식 전체 fixture·긴 텍스트/큰 값·큰 표·긴 deck fixture를 더한다. 수치·DOM/미디어 정책·폰트·viewport·브라우저/장치·서버 압축·캐시·motion을 기록한다. 현재→vanilla 개별 개선→Vite+vanilla→필요 시 React 섬 순서로 한 변수씩 비교한다. lazy media와 bundler를 함께 바꾸면 효과를 분리할 추가 arm을 둔다.
2. **로딩과 입력을 다른 세션으로 측정한다.** 초기 cold/warm load를 각각 반복하고 CPU/네트워크 무제한 및 제한 프로필을 고정한다. 새 문서 navigation으로 startup을 측정하고, warm 문서에서 인접/비인접 장 이동·빠른 연속 입력·JSON 성공/실패·읽기·전체 보기 첫/재개방·inline 입력·발표자 연결/미연결을 구분한다. 최소 각 조건 10회 raw sample을 보관하고 중앙값/범위를 보고한다. 작은 로컬 표본의 p75/p95를 field CWV로 표시하지 않는다.
3. **정확한 준비 지점을 기록한다.** 모델 완료/DOM 완료/fit 완료/현재 이미지 decode/화면 frame/모션 종료를 별도 지표로 둔다. 입력 시점부터 다음 실제 화면 갱신까지 trace로 확인하며, 220ms 뒤 진단과 250ms 저장도 별도 구간으로 포함한다. JSON commit과 다음 paint, 발표자 state 전송/수신/preview paint는 연결 ID로 대응한다. frame 예산·모션 종료시간은 제품 요구와 장치에 맞춰 정하고 지금의 FCP 84ms를 첫 장 SLA로 사용하지 않는다.
4. **원인과 메모리를 확인한다.** CPU trace에서 scripting/validation/layout/paint/image decode·주요 call stack·forced layout을 확인한다. 초기/전체 보기 개방/닫기/반복 JSON 적용/발표자 이동 후 DOM 수·heap·detached node를 비교한다. 단일 249.7ms는 재현 trace가 확보돼야 원인 후보를 좁힌다.
5. **기능 동등성을 게이트로 둔다.** README의 폴더 복사·file 재생·`content.js` 한 파일 교체, HTTP/Pages와 기존 `#n`·query·상대 미디어 경로, 저장 원본 서명/경로, 내보내기·복원·reset, 한글 IME·selection·undo·붙여넣기, 긴 값/모바일·표 키보드/스크린리더, video pause·reduced motion, dialog focus, 발표자 current/next/노트·양방향·재접속을 확인한다. PDF는 이번 필수 게이트가 아니다. 기존 185검사와 새 경로에 맞는 회귀 검사를 사용한다.
6. **채택 판단을 기능/성능/비용으로 나눈다.** 관객 startup·input-to-paint·JSON apply·발표자 각 경로의 반복 결과가 개선되고 회귀가 없을 때 해당 최적화를 채택한다. 차이가 잡음 범위면 성능 개선으로 주장하지 않는다. Vite/React는 개발 편의·유지보수 목적의 선택을 별도로 할 수 있지만 현재 근거로 전면 전환 속도 우위를 주장하지 않는다.

## 교차 검토와 변경 범위

전환설계 담당 `/root/engineering_manager/migration_designer`에게 ordinary navigation DOM 재사용, JSON 적용의 전체 경로, 발표자 full-state/전체 렌더와 React 섬 probe의 증명 범위를 직접 전달했다. 상대의 [전환설계](migration-design.md), probe 결과와 panel/bootstrap/bridge 실질 소스를 읽고 양방향 검토했다. HTTP/Pages 작성 섬과 portable 재생기 분리, 단일 store/command와 DOM 소유권·revision 충돌 경계에 동의했다. 반론으로 두 fixture의 기능이 달라 출력 차액을 React 비용이나 성능 차이로 볼 수 없음, 기존 Python gzip과 probe Node gzip의 압축 조건이 달라 전송량 우열을 비교하면 안 됨을 직접 전달했다. 상대는 비동등 기능·오프라인 추정·실제 app 미통합 한계를 반영했고, 감사의 관객/발표자 경로 구분과 우선순위가 검증 순서라는 결론에 동의했다. 마지막 링크 형식·gzip 조건 보완도 직접 요청했다. 전체 제품 구현·브라우저 검증·성능 개선의 증명은 후속으로 남는다.

제품·원고·패키지·브라우저·서버·Git·배포는 변경하지 않았다. 이 담당의 편집 범위는 이 보고서 하나다. 성능 수치의 신규 실험·프로파일이나 React 전체 전환은 수행하지 않았다. `WORK_LOG.md`는 총괄만 갱신한다. 소스/근거/상대 초안 대조와 로컬 링크·공백 검수를 마쳤으며 **이 담당은 편집을 종료한다.**
