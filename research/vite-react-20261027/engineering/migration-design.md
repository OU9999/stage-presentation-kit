# Vite·React 실행 경계와 단계별 전환 설계

2026-10-27 · 담당 `/root/engineering_manager/migration_designer` · 제품 기준 `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 권고와 구현 가능성

**Vite+React를 작성 UI에 도입하고 기존 경량 재생기는 portable 출력으로 유지하는 경로가 구체적이다.** HTTP/Pages 작성기에 React root를 추가하고, 검증 모델·원고·내보내기를 공통 계약으로 연결한다. 이후 데이터 계약과 production 비교 결과에 따라 HTTP 재생기까지 확장한다. 무설치·폴더 복사·file 직접 재생·content.js 한 파일 작성은 별도 portable 출력의 수용 기준으로 둔다. file 요구는 출력 설계 비용이며 Vite/React 도입을 거절하는 이유가 아니다. PDF는 필수 게이트가 아니다.

작은 visual JSON React 편집 패널을 `/tmp`에서 실제 production build했다. **Vite/React 최신 안정 패키지를 고정해 빌드할 수 있음, 일반 script 복사와 module entry를 분리할 수 있음, 생성 파일 크기를 확인할 수 있음**까지 검증했다. 제품 전체·20개 양식·실제 app 연동·브라우저 UI·file/IME·성능 개선의 검증은 아니다. 공식 기술 근거는 [Vite 조사](../research/vite-draft.md)·[React 조사](../research/react-draft.md)를 재사용하며 이번 신규 실행은 아래 별도 근거로 구분한다.

| 선택 | 구체 구현 | 얻는 것 | 남는 비용·판단 |
| --- | --- | --- | --- |
| Vite 단독 | 모델/렌더러를 유지하는 명시적 module bootstrap과 MPA HTTP 출력, portable classic 출력 별도 유지 | 개발 서버·빌드·해시 자산·의존/entry 관리 | DOM 알고리즘은 동일. file 호환은 출력별 검증. React 차이를 분리하는 비교군 |
| Vite + 점진 React | 별도 작성 화면 또는 전용 편집 root에 draft/errors/commit/cancel, 기존 stage는 명령으로 갱신 | UI 상태·검증 목록·확장 패널의 컴포넌트 관리, 점진 도입 가능 | bridge·저장·동기화 계약 필요. 현재 textarea 하나에 필수인 것은 아니며 확장 필요에 따라 채택 |
| Vite + 전면 React | 20양식·stage·overview·presenter·inline 편집을 공통 React 상태/컴포넌트로 이행 | 장기 UI 일관성과 조합 가능성 | 가장 큰 회귀 범위. 현재보다 빠르다는 근거 없음. source/편집/창 통신·portable 패키징까지 독립 수용 필요 |

전면 React를 택하더라도 한 번에 모두 바꿀 이유는 없다. 점진 섬→명령/상태 경계→공통 layout adapter→재생 화면 순으로 검증할 수 있다. 새 작성기를 먼저 배포하는 선택과 기존 플레이어를 교체하는 선택은 독립적이다.

## 현행 bootstrap을 옮길 때 지킬 경계

현재 [index.html](../../../index.html#L12)은 `content.js` → `deck-model.js` → `visual.js` → `app.js`의 **classic defer 네 파일**을 순서대로 읽는다. 각각 `window.PRESENTATION`, `window.STAGE_MODEL`, `window.StageVisual`을 제공하고 app은 실행 시 이를 즉시 capture한다. 모델/visual은 Node용 UMD 분기도 있어 `type="module"`만 붙이는 방식은 명시적 ESM API 전환과 다르다. 현재가 이미 CSR이며 ordinary 장 이동은 기존 DOM을 갱신하므로 React가 최초로 CSR이나 재사용을 도입하는 것은 아니다.

다음 두 bootstrap 경로를 구분한다.

1. **점진 작성기:** classic portable 파일은 현재 형태를 유지한다. HTTP 작성기에서도 필요한 모델/데이터는 먼저 준비하고 bridge-ready와 DOM-ready를 모두 확인한 뒤 React를 mount한다. React 파일을 먼저 import하더라도 앱 데이터를 읽거나 legacy DOM을 붙이는 시점은 이 gate 뒤다. 전체 `window`를 공유 store로 노출하지 않고 snapshot/command 경계로 좁힌다.
2. **모듈 재생기:** `initPlayer({ deck, model, visual, assetResolver, storage, transport })`처럼 생성 함수로 바꿔 명시적으로 의존성을 주입한다. 교체 가능한 content.js를 classic 외부 파일로 남기면 그 준비를 확인한 뒤 module init을 호출한다. 모든 top-level side effect를 파일 이름 순서로 해결하려 하지 않는다. 이 생성 함수는 후속 설계안이며 현행 app에는 구현하지 않았다.

별도 작성기 bootstrap은 bridge에 `getSnapshot()/subscribe()/commitVisual()` 같은 계약을 둘 수 있다. 첫 통합에서는 기존 `persist()/render()` 경로를 한 번 호출해 기능을 보존한다. 국소 렌더·검증 중복 제거는 [성능 감사](performance-audit.md)의 별도 개선으로 측정한다. React state 변경과 legacy rawDeck 변경을 각기 독립 원본으로 만들지 않는다.

## stage·StageVisual·ReactDOM 소유권

| 영역 | 초기 점진 도입의 소유자 | 교차 경계 |
| --- | --- | --- |
| `#slideStage`, 장 DOM, field/contentEditable, 영상·모션·fit | 기존 app | React는 children/class/hidden을 직접 바꾸지 않고 commit/navigation 명령만 보냄 |
| 새 `#visualEditorRoot` | ReactDOM | legacy는 이 root 내부 DOM을 조회·수정하지 않음. 외부 dialog/focus 정책을 맡길 경우 공개 메서드·이벤트로 연결 |
| JSON 초안·오류·취소 | React 로컬 state | 열 때 revision을 포함한 visual snapshot 수신; 취소는 초안 폐기; 성공 commit만 원본 변경 |
| 원본 deck·source signature·활성 장·저장·발표자 | 단일 legacy store 또는 이후 공통 store | commit 시 revision/slide ID가 달라졌으면 충돌/재열기 처리. 성공 후 최신 snapshot을 내려줌 |
| StageVisual plot/표 | 현행에서는 app/StageVisual | React 재생기를 나중에 만들면 React는 빈 ref host만 소유하고 effect/cleanup 어댑터가 host 내부를 관리. React children과 동시 조작 금지 |

React root의 첫 render는 내부 기존 자식을 교체하므로 기존 stage에 그대로 붙여 호환이라고 볼 수 없다. `hydrateRoot`도 현행 임의 DOM의 인수 API가 아니다. [React root](https://react.dev/reference/react-dom/client/createRoot), [DOM refs](https://react.dev/learn/manipulating-the-dom-with-refs), [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

작은 패널부터 시작해도 실제 제품 연결에는 dialog Escape/backdrop·focus 복원·키보드 이동 차단·한글 IME·잘못된 JSON 유지·닫기/취소·연속 apply·장 전환 중 열린 초안·reduced motion을 확인해야 한다. inline contentEditable은 마지막 경계로 두며 warning 억제만으로 selection/undo/IME 완료로 판단하지 않는다. [React contentEditable](https://react.dev/reference/react-dom/components/common)

현재 JSON 성공 적용은 `validateVisual` 후 rawDeck 변경→persist→전체 render다. 같은 자료로 그림·강조값·발표 안 표를 갱신한다. 별도 data.html은 디스크 content.js를 읽으므로 아직 내보내지 않은 브라우저 편집값과 다를 수 있다. 새 작성기에서도 이 둘을 조용히 합치지 않는다.

## 자산·MPA·base·Pages artifact

**원고와 배포 URL을 분리한다.** 원본의 `src: '../../assets/...'` 같은 문자열은 그대로 보존하고, HTTP build에서는 compiler가 수집한 참조 목록을 `원본 식별자 → 배포 URL`의 asset map으로 만든다. Vite의 bundle manifest는 모듈/entry 산출물 목록이며 임의 deck 문자열을 발견하는 미디어 manifest의 대체물이 아니다. `new URL(variable, import.meta.url)`에 자동 탐색을 기대하지 않는다. 작은 참조 집합은 정적 import로 연결하고 교체형 자료는 선별 public 복사로 별도 유지한다. [Vite assets](https://vite.dev/guide/assets), [manifest 옵션](https://vite.dev/config/build-options#build-manifest)

`content.js`를 module graph에 고정하면 작성 후 재build가 필요하므로 **교체형 계약에서는 content.js를 classic 외부 파일로 남긴다.** index와 data가 같은 위치의 같은 파일을 읽게 하며 build 시점 hash query가 남아 있을 때 HTTP 캐시 정책·새로고침 동작까지 확인한다. export는 원본 경로를 사용하고 hashed URL을 원고에 역기록하지 않는다. 다운로드 링크·동영상 poster·srcset·새 탭 URL도 asset resolver 목록에 포함한다.

MPA는 루트 index, 갤러리, 기존 다섯 Markdown 발표, visual-story index/data, 두 standalone 스타터 index/data 및 공개 연구 HTML을 목록화한다. 새 덱을 만들 때 entry 등록/생성과 public artifact 목록 비교를 자동화하는 후보가 있다. 기존 `index.html#n`, `?presenter=1`을 유지하면 SPA rewrite가 필요하지 않다. 동적 URL은 프로젝트 base `/stage-presentation-kit/`와 덱 상대 경로를 구분한다. 필요하면 portable은 상대 base를 쓰지만 base 설정이 module CORS 문제를 해결하지는 않는다. [Vite MPA/base](https://vite.dev/guide/build), [GitHub Pages](https://vite.dev/guide/static-deploy#github-pages)

Pages 게시 후보는 원고 변환→Vite build→검증된 dist→Actions artifact다. 현재 branch 루트 게시를 유지한다면 별도 branch 루트 또는 docs에 산출물을 두는 방식도 가능하다. 단순히 저장소에 dist 폴더를 만든다고 기존 게시 설정이 dist로 전환되지는 않는다. `.nojekyll`, gallery/preview/credit/연구 링크와 기존 보관 파일의 공개 목록을 대조하며 새 PDF 생성은 요구하지 않는다. 재배포 후 열린 탭이 옛 lazy chunk를 읽는 경우는 이전 asset 보존 또는 재열기 안내를 검증한다. 이번에는 Pages 설정·배포를 변경하지 않았다. [Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## portable 출력의 구체 계약

현재 [direct-deck](../../../scripts/direct-deck.cjs#L31)는 content.js를 덮어쓰지 않고 HTML을 갱신하며 standalone이면 `styles.css`, `visual.css`, `deck-model.js`, `visual.js`, `app.js` **runtime 5파일**을 복사한다. 이 경로를 유지하면 작성기에 React를 쓰면서 결과 발표를 무설치·file로 보낼 수 있다. 저장소의 runtime 복사본은 동기화·보수 비용이다. 한 페이지가 두 사본을 모두 요청하지 않으므로 합산 전송량으로 계산하지 않는다.

첫 단계는 기존 runtime 5파일과 export 형식을 그대로 유지하는 것이 가장 작다. 후속 공통 소스 빌드를 원하면 HTTP ESM과 portable classic/IIFE 산출물을 별도 target으로 설계한다. portable은 상대 자산, 외부 module/dynamic import/modulepreload/fetch 없는 초기화, 직접 content 교체, 창 통신을 확인한다. 기본 Vite ESM dist의 file 실행은 공식적으로 CORS 문제가 있으므로 별도 호환 출력의 검증이 필요하다. [Vite file 오류](https://vite.dev/guide/troubleshooting#built-file-does-not-work-because-of-cors-error)

portable을 포함한 두 출력은 데이터 schema·내보내기 형식·source signature·저장 위치 규칙을 공유한다. HTTP와 file의 origin/path 차이로 저장본이 자동 공유된다고 약속하지 않는다. 필요 시 export/import가 두 환경 사이의 명시적 이동 경로다.

## 실제 isolated production probe

재현 소스·설정·lock은 [probe-source](evidence/probe-source/package.json), 명령 원문은 [probe-build-log.txt](evidence/probe-build-log.txt), 정확한 파일별 크기·SHA·Vite manifest 원문 객체는 [probe-results.json](evidence/probe-results.json), 소스/설정/lock SHA는 [probe-source-sha256.json](evidence/probe-source-sha256.json)에 있다. `node_modules`와 dist는 저장소에 보관하지 않는다. 모델/visual 원본 사본도 증거 폴더에 복제하지 않고 prepare가 기준 제품 두 파일을 읽어 격리 public에 복사하며 SHA를 로그에 남긴다.

2026-10-27 npm primary registry `https://registry.npmjs.org/`에서 `npm view`로 latest를 확인했다. Vite **8.3.5**, React/ReactDOM **19.3.1**을 exact pin했고 ReactDOM peer `react ^19.3.1`을 확인했다. Node **v24.22.1**, npm **11.19.1**이며 Vite 요구 `^20.19.0 || >=22.12.0`을 충족한다. 공식 사이트의 React v19.3 문서와 패키지의 patch version을 구분한다. 제품 package/lock을 추가하거나 설치하지 않았다.

명령은 아래와 같다. 먼저 probe-source만 새 `/tmp` 폴더에 복사하고 그 폴더에서 실행한다. `REPO_PATH`는 기준 SHA의 저장소 절대 경로다.

```sh
node prepare.mjs "$REPO_PATH"
npm ci --ignore-scripts --no-audit --no-fund
npm run build
node verify.mjs "$REPO_PATH"
```

프로브에는 수동 JSON fixture, 실제 deck-model/visual 두 파일, 작은 legacy bridge fixture, vanilla 준비상태 entry와 React textarea 패널만 있다. 실제 app.js는 import하지 않는다. React 작성 패널은 **eager entry**이며 lazy import 지연 로드의 절감 효과를 측정하지 않았다. React Compiler/Fast Refresh 플러그인·UI 전체변환도 없다. JSX는 Vite 빌드 자체로 처리했다.

빌드 성공 후 classic public script가 bundle되지 않는다는 Vite 경고가 있었다. 이 구성에서는 의도한 비번들 복사 경계다. 이를 전체 app의 tree-shaking이나 브라우저 defer/module 순서 증명으로 해석하지 않는다. output HTML의 classic tag/base/순서, 실제 원본 두 파일의 바이트 동일성, Node VM 명시 순차 실행의 전역 생성, 순수 모델 valid commit/invalid rejection을 확인했다. bootstrap은 bridge-ready 이벤트와 DOM 파싱 완료 두 조건으로 mount한다. 브라우저에서 이를 실행해 확인한 것은 아니다.

| 최종 출력 | 원본 B | Node zlib 파일별 gzip 추정 B |
| --- | ---: | ---: |
| `assets/editor-DAdjzpHn.js` | 220,559 | 68,349 |
| `assets/modulepreload-polyfill-P2Xu9kJm.js` | 670 | 389 |
| `assets/vanilla-CGEeU8qd.js` | 396 | 271 |

- `index.html` fixture에 필요한 HTML+classic 4개+module 의존의 고유 파일 합계: 282,743B / 파일별 Node gzip 합계 85,833B.
- `vanilla.html` fixture에 필요한 HTML+classic 4개+module 의존의 고유 파일 합계: 62,571B / 파일별 Node gzip 합계 17,756B.

vanilla entry는 준비상태와 preview 연결만 하고 React entry에는 편집 UI가 있으므로 **동등 기능 A/B가 아니다**. 차이는 작은 구성에서 실제 React 포함 빌드가 만들어지는 비용을 보여줄 뿐 STAGE 순증·최종 bundle·성능 차이가 아니다. Node zlib gzip 표와 Vite 콘솔의 반올림 gzip 표시는 압축 계산 경로가 달라 수치가 다를 수 있어 합치지 않는다. 기존 source-sizes의 Python gzip과 본 probe의 Node zlib도 압축 계산 조건이 다르므로 직접 전송량 우열로 비교하지 않는다. 모두 오프라인 추정이며 HTTP transfer가 아니다. build 82ms는 이번 작은 로컬 fixture 한 번의 빌드 경과값이며 제품 빌드/HMR 성능으로 확대하지 않는다.

## 단계별 수용 계획

| 단계 | 구현 대상 | 다음 단계로 가기 위한 결과 |
| --- | --- | --- |
| 0: 기준 고정 | 최신 4근거·20양식·원고·저장/export·HTTP/file 계약 고정, 병목 trace | 실제 input-to-paint와 첫 장 준비·이미지 decode 정의, 현재/미디어개선/번들/React의 변수를 분리 |
| 1: Vite 작성기 뼈대 | lock/Node 정책·MPA/base·asset map·외부 content·bridge 준비 | root/중첩 index/data·동적 자산·gallery 공개 목록 누락0, 초기 데이터/모델 순서 확정, portable 출력 바이트/실행 보존 |
| 2: React 작성 섬 | 실제 visual JSON adapter·독립 root·revision 충돌·취소/오류/성공·focus | 그림/강조값/현재 표 일치, data.html 디스크 원본 차이 유지, IME/선택/undo·장 전환·export/restore·발표자 갱신 성공 |
| 3: 작업량 개선 | 미디어/fit 병합·발표자 delta·JSON 국소 갱신을 각각 실험 | 동일 콘텐츠/DOM 정책의 반복 trace에서 경로별 개선·회귀 없음. 개선되지 않으면 성능 이득으로 주장하지 않음 |
| 4: HTTP 재생/전면 React 선택 | 20양식과 오류·overview/presenter·읽기/모션/영상·inline 이행 | 모든 기능의 production 비교와 portable 수용 통과. 기존보다 빠르다는 결론은 실제 같은 조건의 결과가 있을 때만 제시 |

후속 기능 게이트는 기존 185검사와 필요한 새 경로 회귀, 390px·긴 한글/큰 값·표·reduced motion·영상 pause, 이동/직접 hash·창 재접속·저장 실패·내보내기·원본 교체·offline folder copy다. HTTP 작성기 추가만으로 20양식의 전면 React 이행을 완료했다고 표시하지 않는다. 이번 185검사는 root 완료 결과를 재사용했고 재실행하지 않았다.

## 직접 협의와 범위

성능 감사 담당과 관객 장 이동의 DOM 재사용, JSON 성공 적용의 전체 validate/persist/render, 발표자의 full-state/전체 stage 갱신을 직접 협의하고 상대 실질 초안을 읽었다. 따라서 프레임워크의 도입 효과와 작업량 개선을 분리하며 React가 이 비용을 자동 제거한다는 주장은 배제한다. 상대가 본 설계와 실제 probe 소스를 읽고 요청한 비동등 fixture 차액·Python/Node gzip 비교 한계와 source 링크 형식을 반영했으며 필수 설계 정정 없음에 합의했다. 매니저의 bootstrap 검토를 받아 probe에 bridge-ready/DOM-ready gate를 명시했다.

제품·원고·WORK_LOG·브라우저·서버·Pages·Git은 변경하지 않았다. 이 담당의 편집은 본 설계, 종합, probe 최소 재현 증거로 한정한다. 최신 모델 스냅샷과 현 runtime catalog 유효성은 매니저 확인을 재사용했고 배정 모델은 `gpt-6.1-sol/high/fork_turns=none`이다.
