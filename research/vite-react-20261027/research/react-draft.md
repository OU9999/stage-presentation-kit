# React 전환 조사 초안

2026-10-27 · `/root/research_manager/react_researcher` · 기준 `main` / `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 판단

React 전환은 가능하다. 다만 현재 STAGE에서 **React 전면 전환을 성능 개선의 선결 조건으로 삼을 근거는 없다**. React의 우선 이득은 복잡해지는 작성·편집 UI를 컴포넌트와 명시적 상태로 관리하는 데 있다. Vite 도입과 React 도입은 따로 결정하고, React가 필요해지면 편집 패널 같은 독립 영역부터 시작하는 안을 권한다. 실제 전환·설치·시제품·성능 비교는 이번 조사에서 수행하지 않았다.

## 현행 코드에서 직접 확인한 사실

| 코드 | 관찰 | 의미와 한계 |
| --- | --- | --- |
| `index.html:10–15` | 일반 `defer` script로 `content.js` → `deck-model.js` → `visual.js` → `app.js`를 읽으며 `#slideStage`는 비어 있음 | HTML 진입점이 있어도 슬라이드 본문은 이미 CSR이다. React CSR만을 새 초기 가시성 회귀라고 단정할 수 없다. |
| `app.js:742` | `render()`가 검증 후 `stage.replaceChildren()`하고 모든 장을 `renderSlide()`로 생성 | 최초 실행·테마 변경·편집 종료 등의 전체 렌더 경로는 비교 대상이다. |
| `app.js:765`, `app.js:1008` | 일반 장 이동은 `updateActive()`의 `hidden`·class·컨트롤 갱신을 호출하며 전체 `render()`를 호출하지 않음 | “매 장 전체 DOM 재생성을 React가 없앤다”는 전환 논리는 현행과 맞지 않는다. 전체 장 순회와 diagnostics 비용은 측정할 후보이다. |
| `app.js:768`, `app.js:1248` | 활성 필드에 `plaintext-only`를 설정하고 input에서 `innerText`를 원본 객체에 반영, 250ms 뒤 저장 | 입력 중 DOM과 데이터의 관계를 React 전환 시 명시적으로 다시 설계해야 한다. |
| `app.js:1072`, `app.js:1138` | 전체 보기 썸네일과 발표자 현재·다음 장도 같은 `renderSlide(..., true)`를 사용 | 레이아웃 공통화는 이미 존재한다. React는 수명주기·컴포넌트 구성을 바꿀 수 있지만 재사용을 처음 도입하는 것은 아니다. |
| `app.js:1028`, `app.js:1122` | 원본 서명 기반 localStorage와 token/origin/source를 확인하는 `postMessage` 동기화 | React 상태로 바꿔도 저장·복원·내보내기·창 간 통신 계약은 별도로 보존해야 한다. |
| `deck-model.js:1`, `scripts/markdown-deck.cjs:287` | 브라우저/Node 공유 검증과 20개 양식, Markdown→`content.js`/HTML 생성이 이미 분리됨 | 데이터·검증·원고 컴파일은 재사용 가능한 경계다. JSX 전환을 위해 원고 계약을 바꿀 필요는 없다. |

기존 [기술 구조 검토](../../color-motion-20261024/engineering/architecture.md)의 작성·오프라인·발표자 계약을 재사용하되 현행 코드를 다시 읽었다. 이 표는 정적 코드 관찰이며 실제 소요 시간이나 사용 빈도를 나타내지 않는다.

## 공식 근거와 STAGE 적용

공식 React 문서를 검색한 뒤 아래 URL을 직접 열었다. 열람일은 모두 **2026-10-27**이며 페이지 머리말은 `v19.3`이었다. 특정 기능을 STAGE에 적용하는 판단은 공식 보장이 아닌 설계 추론으로 표시한다.

| 공식 문서 | 확인한 내용 | STAGE에 대한 추론·제안 |
| --- | --- | --- |
| [기존 프로젝트에 React 추가](https://react.dev/learn/add-react-to-an-existing-project) | 전면 재작성 없이 특정 영역에 React 컴포넌트를 넣을 수 있고, 기존 모듈 도구가 없으면 Vite 사용 경로를 안내 | 현재 stage를 유지하고 새 작성 패널만 React root로 만드는 점진 도입이 가능하다. |
| [createRoot](https://react.dev/reference/react-dom/client/createRoot) | root 내부 DOM 관리를 React가 맡고 첫 `root.render()`는 기존 자식을 지운다. 페이지 일부에 여러 root를 둘 수 있다. | 기존 `#slideStage`에 root만 붙여 호환 통합했다고 볼 수 없다. 전용 비어 있는 컨테이너를 마련하고 legacy 코드가 내부 DOM을 바꾸지 않아야 한다. |
| [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot) | React로 사전 생성한 HTML에 연결하며 서버/클라이언트 결과의 동일성을 요구한다. 불일치는 버그로 다뤄야 한다. | 임의의 현행 DOM을 비용 없이 React 관리로 넘기는 API가 아니다. 사전 렌더를 택하면 같은 React 트리·데이터·초기 테마/장 상태를 맞춰야 한다. |
| [DOM refs](https://react.dev/learn/manipulating-the-dom-with-refs) | 초점·스크롤·측정에는 ref로 DOM에 접근할 수 있지만 React가 관리하는 DOM 변경을 피하라고 설명 | 영상 pause·초점·측정은 ref 경계로 연결하고, `replaceChildren()`·class·children의 중복 소유를 제거한다. |
| [공통 DOM 컴포넌트](https://react.dev/reference/react-dom/components/common) | `children`과 `contentEditable`의 조합은 일반적으로 함께 동작하지 않으며 경고 억제 옵션은 직접 편집 내용을 관리하는 라이브러리용 | `suppressContentEditableWarning`은 커서·선택·한글 조합 입력 문제를 해결하지 않는다. 입력 상태/커밋 정책과 DOM 소유권을 검증해야 한다. |
| [컴포넌트 간 상태 공유](https://react.dev/learn/sharing-state-between-components) | 공유 상태를 공통 부모로 올리고 props·이벤트로 전달하는 구조를 설명 | raw deck, 활성 장, 테마·모드, 편집 초안의 원본을 하나씩 정하고 UI와 저장/동기화를 연결한다. legacy mutable 객체와 React state를 각각 원본으로 두지 않는다. |
| [처음부터 앱 만들기](https://react.dev/learn/build-a-react-app-from-scratch), [prerender](https://react.dev/reference/react-dom/static/prerender) | build tool부터 CSR 앱을 만들 수 있고, 별도 static API로 HTML을 미리 생성하고 client에서 hydrate할 수 있음 | 정적 호스팅은 가능하지만 Vite+React 기본 CSR과 사전 렌더는 별도 구성이다. 정적 HTML 생성에는 운영 서버가 필수인 것은 아니다. |
| [Profiler](https://react.dev/reference/react/Profiler) | React 트리 렌더 비용을 측정하며 profiling 자체의 부하가 있어 일반 production에서는 기본 비활성 | 브라우저의 전체 로딩·layout/paint·입력 지연 측정과 함께 사용한다. React render 시간만으로 사용자 성능을 대표하지 않는다. |
| [React Compiler 소개](https://react.dev/learn/react-compiler/introduction) | 별도 build-time 도구로 주로 React 컴포넌트의 반복 렌더·계산을 memoization | Vite 도입만으로 자동 활성된다고 가정하지 않는다. 이미지 전송·디코딩·CSS layout/paint·현행 vanilla 함수 비용을 자동 해결한다고 해석하지 않는다. |

## 점진 통합 설계 제안

1. **무설치 출력을 보존하고 데이터와 재생기를 분리한다.** README/CONFIG의 폴더 복사·file 재생·content.js 한 파일 작성이 현재 핵심 계약이므로 기본 ESM dist를 그대로 대체물로 채택하지 않는다. `scripts/direct-deck.cjs`는 직접 원본 content.js를 덮어쓰지 않고 standalone runtime을 함께 복사한다. 현재 모델·원고 컴파일·JSON schema를 유지하며 `navigate`, `setTheme`, `commitField`, `exportDeck` 같은 작은 명령 경계를 정의한다. 명령 이름은 설계 예시이며 구현 결과가 아니다.
2. **작성 UI에 한정해 React를 검토한다.** 현존 `app.js:890–932`의 visual JSON 편집창은 draft·errors·commit·cancel 상태를 명시할 구체적인 후보이다. 현재 단순 textarea만으로 React가 필수인 것은 아니다. 새 레이아웃 속성 패널·노트·검증 목록까지 복잡해질 때 전용 root를 둔다. legacy stage와 React panel이 서로의 내부 DOM을 수정하지 않게 하고 공통 데이터 스냅샷/이벤트로 연결한다. 단순 버튼 몇 개만을 위한 도입 이익은 작을 수 있다.
3. **inline 편집은 마지막 경계로 둔다.** 매 키 입력의 React 자식 재생성이 selection·IME 조합·undo를 깨뜨리지 않도록 controlled input/textarea 편집 패널과 DOM을 직접 관리하는 contentEditable 어댑터 중 제품 요구에 맞게 선택한다. 경고 억제만으로 완료 처리하지 않는다.
4. **재생기 전면 전환은 별도 승인 단계로 둔다.** 20개 레이아웃과 오류 화면·원본 보존·영상·모션·읽기·전체 보기·발표자까지 동일 동작을 확인한 뒤 검토한다. 현재 전체 장 DOM을 활성 장만 mount하는 방식으로 바꾸면 읽기·영상 상태 계약도 함께 달라진다.

## 새 기준에서 추가 확인한 경계

- `visual.js`의 `StageVisual`은 데이터로 native SVG/HTML과 표를 만드는 별도 DOM 렌더러다. 점진 React에서는 React가 children을 만들지 않는 빈 ref 컨테이너 안을 어댑터가 소유하도록 감싸는 설계를 검토할 수 있다. React와 StageVisual이 같은 children을 동시에 변경하지 않게 한다.
- `app.js:915`의 `applyVisualEditor()`는 JSON 파싱·모델 검증 뒤 rawDeck를 갱신하고 persist/render한다. 그림·강조값·발표 안 표는 같은 자료에서 갱신하며 별도 data.html은 디스크 content.js를 읽는 차이를 유지한다.
- `app.js:799`의 `fitTextLayouts()`는 class/style 쓰기와 offset/client/scroll 치수 읽기를 수행하며 장 이동·scale에 연결된다. layout 비용 후보지만 느리다는 측정 증거는 아니다.
- 현재 사용자 우선순위는 웹 발표·무설치 file 출력·content.js 작성이며 PDF는 이번 필수 게이트가 아니다.

## 성능 판단과 필요한 검증

**추론:** React/ReactDOM을 클라이언트에서 쓰면 현재에 없던 라이브러리 코드의 전송·파싱·실행·메모리와 렌더 작업이 생긴다. 번들 크기와 순비용은 실제 버전·구성·압축·캐시·코드 분할에 따라 달라지므로 이번 문서에 수치를 부여하지 않는다. DOM 갱신 절약 효과가 그 비용을 상쇄하는지는 동일 기능 production 비교가 필요하다. React가 이미지 크기나 CSS 모션 비용을 자동 줄여 주지는 않는다.

- 최초 진입: 빈 `#slideStage`에서 첫 장이 보이고 조작 가능해지는 시간, 요청/전송 바이트와 캐시 조건, scripting·layout·paint·이미지 decode를 구분한다.
- 장 이동: 일반 next/previous와 Home/End를 구분하고 `updateActive`, diagnostics, 모션의 작업량을 관찰한다. 본문 전체 재생성이 실제 발생한 경로인지 함께 기록한다.
- 편집: 한글 IME·줄바꿈·붙여넣기·커서/selection·undo·250ms 저장·편집 종료 후 재진입 및 원본/내보내기 일치를 확인한다.
- 복제·모드: 전체 보기 생성, 발표자 양방향 동기화, 모바일 읽기, reduced-motion, 영상 pause와 읽기의 모든 장/최종 모션 값을 검증한다.
- 비교: 현재/Vite+vanilla/Vite+React 동일 콘텐츠·화면·기능·브라우저·장치·캐시 조건으로 production 산출물을 비교한다. dev HMR 체감과 production 실행 성능은 분리한다. React 후보가 생긴 뒤에만 Profiler를 보조 적용한다.

## 한계

이번 초안은 코드와 공식 문서를 대조한 조사다. 이 담당자는 React/Vite 설치·앱 변경·원고 변경·시제품·성능 벤치마크를 수행하지 않았다. root가 별도로 생성한 [현행 브라우저 기준](../evidence/browser-baseline.json)을 취합에 반영하며, React/Vite 구현 비교는 아직 없다. 후속 엔지니어링 검토와 함께 비교할 경계·실패 조건을 정한 문서다. 목표·지침·담당자·미완료·결정의 단일 기록은 루트 `WORK_LOG.md`에 둔다.
