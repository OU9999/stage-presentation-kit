# STAGE Vite·React 전환 조사 취합

2026-10-27 · 리서치팀 · 취합 `/root/research_manager/react_researcher`

**최종 조사 기준:** 원격 변경 통합 후 `main` / `a1b621c26d7e124a3c8d33eb288723ac7683c950`. 두 초안의 코드 경계와 총괄의 최신 브라우저 근거를 이 SHA에 맞춰 다시 대조했다. 제품·원고·설치·프로토타입·배포 변경을 수행한 보고가 아니다.

## 권고

**전환할 수 있다. 다만 성능을 이유로 React 전면 전환부터 시작할 근거는 부족하다.** Vite의 개발·빌드 이점과 React의 UI 상태 관리 이점을 따로 판단한다. 우선 미디어 로딩과 실제 작업량을 조사하고, 다음 구현 단계에서는 **무설치 출력을 보존하는 Vite+vanilla 구성**을 비교 후보로 삼는다. 기본 ESM dist로 현재 재생기를 교체하는 안은 핵심 계약을 충족하지 못하므로 권고하지 않는다. 복잡한 작성 패널·undo·속성 편집 등이 제품의 중심이 될 때 React를 독립 영역부터 추가하는 편이 현재 계약을 지키기 쉽다.

현재 README/CONFIG의 핵심 계약인 “폴더 복사·무설치 file 재생·content.js 한 파일 작성”을 지키기 위해 현행 재생기와 새 작성기를 분리하는 안을 우선 비교한다. Vite 기본 ESM dist는 HTTP/Pages용으로 보고, file 호환 출력은 별도 설계·검증 항목으로 둔다. React나 Vite가 GitHub Pages를 막는 것은 아니며, 배포된 정적 파일을 보는 사용자에게 Node 서버가 필수인 것도 아니다. [Vite 정적 배포](https://vite.dev/guide/static-deploy), [Vite file 오류](https://vite.dev/guide/troubleshooting#built-file-does-not-work-because-of-cors-error), [React 기존 프로젝트 통합](https://react.dev/learn/add-react-to-an-existing-project)

## 현행에 대한 핵심 관찰

1. **현재도 웹 앱이며 슬라이드 본문은 CSR이다.** `index.html`은 shell을 제공하고, `app.js:742`이 검증 후 전체 장 DOM을 생성한다. React CSR로 바꾼다는 이유만으로 본문이 처음 JS 의존이 되는 것은 아니다.
2. **일반 장 이동은 전체 렌더가 아니다.** `goTo()`는 `updateActive()`를 호출해 기존 장의 `hidden`·class·컨트롤을 갱신한다. React가 매 장 전체 재생성을 없애 준다는 논리는 현행 코드와 맞지 않는다.
3. **재사용 경계가 이미 있다.** 모델의 20개 양식·공유 검증, Markdown compiler, 공통 `renderSlide()`의 본문/썸네일/발표자 경로를 재사용할 수 있다. 전환 여부와 무관하게 데이터 계약을 보존한다.
4. **보존할 제품 계약이 많다.** inline plaintext 편집, 원본 서명/경로 기반 저장, 교체 가능한 `content.js` 내보내기, token·origin·source 확인을 거친 발표자 동기화, hash 장 주소, 읽기·reduced-motion·영상 상태가 포함된다. 코드 정리는 이 계약의 대체 근거가 아니다.

정적 코드 관찰의 상세 근거는 [React 초안](react-draft.md), [Vite 초안](vite-draft.md)에 있다. 앞선 [기술 구조 검토](../../color-motion-20261024/engineering/architecture.md)의 계약을 재사용하되 이번 Vite와 성능 질문을 별도 검증했다.

## 현행 브라우저 기준이 말하는 것과 말하지 않는 것

총괄이 새 HEAD에서 루트 20장·DevDay 7장·시각자료 12장·글 배치 8장을 각각 3회 관찰했다. 환경은 로컬 Python HTTP 서버, 1440×1000, 해당 페이지 캐시 비활성, CPU/네트워크 제한 없음이다. 최신 원본은 [브라우저 기준 측정](../evidence/browser-baseline.json), [파일 크기](../evidence/source-sizes.json)이다. pull 이전 근거는 `*-before-pull.json`으로 분리돼 있으며 현재 결론의 수치로 사용하지 않는다.

- 문서 FCP 중앙값은 루트/DevDay/시각자료/글 배치 순서로 84/136/64/88ms이다. header/toolbar가 사전 HTML이므로 FCP는 첫 슬라이드 준비 완료 지표가 아니다. 루트 첫 run에서만 long task 1개가 관찰됐으며 이 로컬 표본만으로 강한 병목·현장 성능을 확정하지 않는다.
- 시각자료 12장에는 이미지가 없어 사진 최적화만으로 모든 deck을 설명할 수 없다. 새 native SVG/표·전체 장 DOM·`fitTextLayouts()`와 diagnostics의 실제 layout/paint 비용도 검증 후보이다.
- 일부 resource timing의 size가 0이며 서버는 압축을 제공하지 않았다. 별도 gzip 추정과 파일 원본 크기를 실제 Pages 전송량으로 해석하지 않는다. 키 이동은 성공했으나 `syncEventMs`는 deferred 작업·layout/paint를 제외하므로 입력 성능·INP로 쓰지 않는다.

**React/Vite 구현 비교는 없으며 현재 수치로 전환 후 개선율을 예측하지 않는다.** 최신 활성 장 관찰 지표도 코드 내 정확한 준비 시점과 사용자에게 그려진 시점의 차이를 후속 검증해야 한다.

## 네 가지 대안 비교

| 선택 | 주된 이득 | 런타임 성능 판단 | 이행 비용·주요 조건 | 현재 권고 |
| --- | --- | --- | --- | --- |
| 현행 HTML/CSS/JS 유지·개선 | 무설치 재생·file 출력·현재 작성/배포 유지, 미디어와 작업량 직접 개선 | 측정한 기준이며 미디어 지연 로딩·diagnostics·순회 등은 후속 검증 후보 | 큰 작성 UI가 늘면 직접 상태/DOM 관리 부담 증가 | 핵심 사용 계약을 보존하는 기준선으로 유지 |
| Vite + vanilla | ESM·개발 서버/HMR·의존 관리·production minify/해시/청크 관리 | 전송·파싱 개선 가능성은 있으나 현재 DOM 알고리즘은 자동 변경되지 않음 | module/bootstrap·미디어 문자열·MPA·base·배포 artifact·file 계약 결정, 의존/lockfile 관리 | 무설치 출력 유지가 증명되는 범위에서 비교 후보 |
| Vite + 점진 React | Vite 이점에 더해 현존 visual JSON 편집창과 확장 작성 UI의 컴포넌트·상태 관리 | React 런타임과 legacy 연동 비용 추가; 필요 시 패널을 로드하는 설계도 비교 가능 | stage와 panel의 DOM 소유권 분리, 단일 데이터 원본·명령/이벤트 경계, 저장/동기화 연결 | 작성 UI의 복잡성이 정당화할 때 후보 |
| Vite + 전면 React | 재생/작성/발표자 UI를 일관된 컴포넌트·상태 모델로 표현 | DOM 갱신 방식과 추가 런타임 모두 영향; 현행보다 빠른지는 미확인 | 20개 양식·inline 편집·모션·영상·복제 화면·file 포함 회귀 범위 가장 큼 | 성능만을 이유로 우선 채택하지 않음 |

이 비교는 코드/공식 근거에 따른 설계 판단이며 구현 결과가 아니다. Vite의 HMR은 개발 피드백 속도이고 청중의 production 성능과 다르다. Vite는 vanilla 템플릿도 제공하며 React가 있어야 모듈화·번들을 할 수 있는 것은 아니다. [Vite 시작 안내](https://vite.dev/guide/), [React from scratch](https://react.dev/learn/build-a-react-app-from-scratch)

## 전환 설계에서 놓치기 쉬운 경계

**DOM·편집:** React 공식 문서는 부분 root 통합을 지원한다. 다만 첫 `root.render()`는 root 내부 기존 자식을 지우며 이후 내부 DOM 관리를 맡는다. 기존 stage 렌더러와 React가 같은 children을 동시에 관리해서는 안 된다. React root는 현존 visual JSON 편집창의 draft/errors/commit/cancel에 제한하고 기존 stage는 데이터/명령을 통해 연결하는 안을 검토한다. 지금의 단순 textarea만으로 React가 필수인 것은 아니다. `StageVisual`을 유지한다면 React children이 없는 ref 컨테이너 내부를 어댑터가 소유하게 할 수 있다. `applyVisualEditor():915`가 검증 후 원본·그림·강조값·발표 안 표를 함께 갱신하는 계약과 별도 data.html이 디스크 content.js를 읽는 차이를 보존한다. `hydrateRoot()`는 임의의 기존 DOM 인수 도구가 아니라 동일한 React 트리로 사전 생성한 HTML과 연결하는 API다. [createRoot](https://react.dev/reference/react-dom/client/createRoot), [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot), [DOM refs](https://react.dev/learn/manipulating-the-dom-with-refs)

React의 `children`과 `contentEditable` 조합에는 별도 관리가 필요하다. `suppressContentEditableWarning`은 경고만 억제하며 커서·선택·한글 IME·undo를 해결하지 않는다. 편집 패널의 input/textarea와 DOM을 직접 관리하는 inline 어댑터 중 필요한 UX에 맞게 설계한다. 전체 deck 상태와 로컬 편집 초안·저장 상태를 구분하고 원본이 둘로 갈라지지 않게 한다. [공통 DOM 컴포넌트](https://react.dev/reference/react-dom/components/common), [상태 공유](https://react.dev/learn/sharing-state-between-components)

**사전 렌더:** 기본 CSR과 SSG/프리렌더는 별도 선택이다. Vite build가 슬라이드 본문 HTML을 자동 생성하지는 않는다. 첫 본문을 HTML로 보낼 필요가 있으면 빌드 시 React HTML 생성과 hydration의 동일 데이터·초기 상태를 설계할 수 있다. 운영 SSR 서버를 자동으로 요구하는 것은 아니며, 현재 앱에 필요한지는 측정 뒤 판단한다. [React prerender](https://react.dev/reference/react-dom/static/prerender), [React from scratch](https://react.dev/learn/build-a-react-app-from-scratch)

**Vite 분석 경계:** 일반 `defer` script를 그대로 서빙하는 것만으로 JS 번들·tree-shaking이 끝나지 않는다. 명시적 module entry·초기 데이터 준비 순서가 필요하다. 현재의 전체 실행 IIFE/레이아웃 분기에서 쓰지 않는 양식이 자동 제거된다고 기대하지 않는다. 데이터 속 임의 미디어 경로도 자동 발견·복사·재작성하지 않으므로 compiler 참조 목록/manifest 또는 선별 public 복사를 택한다. [Vite HTML entry](https://vite.dev/guide/#index-html-and-project-root), [자산](https://vite.dev/guide/assets), [Rolldown DCE](https://rolldown.rs/in-depth/dead-code-elimination)

**출력·배포:** 기존 `/examples/.../index.html#n`과 발표자 query를 유지하는 MPA를 우선 후보로 둔다. Pages 프로젝트 base와 동적 URL, 갤러리·크레딧·연구 페이지까지 dist 공개 목록을 확인한다. 교체 가능한 `content.js`를 유지하면 런타임 데이터로 남겨야 하며 번들에 고정하면 수정 후 재빌드 흐름이 필요하다. `base: './'`만으로 file module CORS가 해결되지 않는다. Pages에는 dist를 Actions artifact로 배포하거나 branch 루트/docs에 게시하는 선택이 있으며 Actions가 필수인 것은 아니다. [Vite MPA/base](https://vite.dev/guide/build), [Pages 배포](https://vite.dev/guide/static-deploy#github-pages), [Pages source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 엔지니어링팀에 넘길 검증 항목

1. **새 기준 검증:** 통합 HEAD의 모델·원고·runtime·CSS·HTML·미디어 변경을 기존 근거와 대조하고 달라진 경로만 재측정한다. 최초 진입에는 활성 장 ready/paint·미디어 decode를 직접 확인할 계측을 추가로 설계한다.
2. **프레임워크와 독립적인 후보:** 현재/인접 장 미디어 준비, 이미지 리사이즈/압축, 전체 보기 미리보기 생성, `fitTextLayouts():799`의 class/style 쓰기와 치수 읽기, geometry diagnostics의 read/write와 빈도, 장수에 비례하는 순회·DOM 수를 프로파일링한다. 강한 병목이 확인되기 전 최적화 효과를 확정하지 않는다.
3. **전환 계약:** 무설치 file 재생·폴더 복사·content.js 한 파일 교체를 보존하고, MPA 주소·base·asset mapping·저장 origin/path/원본 서명·발표자 token/origin/source를 명시한다. 별도 HTTP 출력을 추가하더라도 기존 출력의 동등 대체라고 표시하지 않는다.
4. **동등 기능 production 비교:** 같은 deck·이미지·DOM 정책·브라우저·장치·캐시로 현재→Vite+vanilla→필요 시 React를 비교한다. 제한 CPU/네트워크와 긴 deck도 포함하고, dev HMR과 실제 전송/실행/입력/paint를 분리한다. lazy media/DOM 축소를 함께 적용하면 해당 효과를 따로 기록한다.
5. **실제 사용자 경로:** next/previous/Home/End, 읽기·390px·모션 종료/reduce·영상 pause, 전체 보기 초점, 한글 IME/selection/undo/붙여넣기·저장/복원/내보내기·초기화, 발표자 양방향 동기화, 기존 deep link와 열린 탭의 재배포 청크 오류를 확인한다.

React 후보가 실제 생기면 [Profiler](https://react.dev/reference/react/Profiler)를 보조 도구로 사용한다. profiling 부하와 dev/production 차이를 기록하며 React render 시간만으로 layout/paint·이미지·전체 입력 지연을 대표하지 않는다. [React Compiler](https://react.dev/learn/react-compiler/introduction)는 별도 설정이 필요한 반복 렌더 최적화 수단이며 vanilla 알고리즘·미디어·CSS 비용을 자동 해결하는 전환 근거가 아니다.

## 근거·교차 검토·범위

- 공식 출처는 두 담당이 **2026-10-27 검색 후 직접 열람**했다. React 상세 API·경계는 [React 초안](react-draft.md), 최신 Rolldown·build/배포·file 경계는 [Vite 초안](vite-draft.md)에 정리했다. 현재 패키지 버전을 설치하거나 고정하지 않았다.
- 직접 협의: Vite 담당이 기존 일반 script·Pages/file·MPA·base/미디어 경계를 React 담당에게 전달했고, React 담당은 현행 CSR·장 이동·root/편집 소유권을 직접 회신했다. 각자 상대의 실질 초안을 읽었으며 “Vite-only 비교를 먼저, 복잡한 작성 UI에 점진 React 후보”와 “일반 장 이동을 전체 렌더로 설명하지 않음”에 합의했다.
- 매니저 교차 검수: 현행 장 이동·createRoot 소유권·contentEditable 억제 한계와 FCP/키 이동 계측의 해석을 확인해 반영했다. 총괄이 기준 브라우저 측정과 새 기준 자동 테스트 185개 통과를 별도로 전달했다. 이 담당들이 구현 비교나 제품 회귀 테스트를 수행한 것으로 표시하지 않는다.
- 이번 산출물은 조사·설계 문서다. 새 HEAD와 핵심 기능 경계 대조를 완료했고, 엔지니어링팀의 상세 병목·이행 설계 검토는 이어질 작업이다. 이번 우선순위는 웹 발표·무설치 폴더 복사·content.js 작성이며 PDF는 필수 게이트에서 제외한다. 제품 전환·라이브러리 설치·배포·원고 변경은 수행하지 않았다. 단일 상태 기록은 루트 `WORK_LOG.md`를 따른다.
