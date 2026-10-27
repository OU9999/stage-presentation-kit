# Vite 도입 조사 초안

2026-10-27 · 담당 `/root/research_manager/vite_researcher` · pull 통합 후 기준 HEAD `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 판단

Vite 도입과 React 전환은 별도 결정이다. **Vite+vanilla만으로도 모듈 관리·개발 미리보기·배포 빌드의 이점을 얻을 수 있다.** React는 복잡한 작성 UI를 컴포넌트와 상태로 관리할 필요가 생길 때 추가로 판단한다. 현재 렌더러보다 빠르다는 근거는 아직 없다. 최신 제품의 핵심은 **웹 발표·무설치 폴더 복사·`file://` 직접 재생·`content.js` 한 파일 작성**이다. 따라서 기본 ESM dist로 기존 재생기를 대체하는 안은 이 계약을 충족하지 못하며 현 단계 권고가 아니다. Vite는 개발 도구 또는 별도 작성기부터 검토하고, 재생기를 바꾸려면 동일 계약의 호환 출력을 먼저 증명해야 한다.

기존 [기술 구조 검토](../../color-motion-20261024/engineering/architecture.md)의 데이터·편집·내보내기·발표자·읽기 계약을 재사용했다. pull 후 README·CONFIG·visual/direct-deck 경계를 다시 읽었으며 과거 19개 양식·세 script 기준은 현재 20개 양식·네 script로 갱신했다. PDF·인쇄는 과거 자료 보관 범위이며 이번 필수 성능·전환 게이트가 아니다. 이 문서는 조사·설계이며 제품 변경이나 구현 완료 보고가 아니다.

## 현행 코드에서 직접 확인한 사실

- 루트 `index.html:10–15`는 `styles.css`·`visual.css`와 네 일반 `defer` script를 상대 경로로 읽는다. `content.js`의 `window.PRESENTATION` → `deck-model.js`의 `window.STAGE_MODEL` → `visual.js`의 `window.StageVisual` → `app.js` 순서다. npm 패키지와 외부 CDN 없이 재생한다.
- `app.js:742`의 `render()`는 초기 화면에 모든 슬라이드 DOM을 만든다. 현재도 본문은 JS 실행 후 나타나는 CSR이다. `goTo():1008`는 `updateActive()`를 호출하므로 보통 장 이동이 매번 전체 렌더링을 하는 것은 아니다. Vite는 이 알고리즘을 자동 변경하지 않는다.
- `scripts/markdown-deck.cjs:268`의 `generatedHtml()`은 다섯 공통 JS/CSS의 상대 경로와 파일 hash query를 생성한다. `buildDeck():287`는 미디어 파일 존재·모델을 검사하고 `index.html`·`content.js`를 만든다. Node는 선택형 작성 도구이며 직접 작성 발표의 실행 전제는 아니다.
- `scripts/direct-deck.cjs:31`의 `refreshDirectDeck()`은 직접 작성한 `content.js`를 보존하고 `index.html`·`data.html`을 갱신한다. standalone 설정은 다섯 공통 JS/CSS를 발표 폴더 `runtime/`에 복사한다. `scripts/build-examples.cjs`는 Markdown 다섯 발표 외에 visual-story와 standalone visual-starter·text-layout를 관리한다.
- `visual.js:1`은 브라우저/Node 모델을 공유하며 로컬 DOM/SVG와 표를 생성한다. visual 여덟 종류가 더해져 총 20개 양식이다. `app.js:867`의 현재 표 버튼은 브라우저 편집값을 읽기 모드로 보여주고, 별도 `data.html`은 디스크의 `content.js`를 읽는다. 두 표 경로의 차이도 전환 시 보존한다.
- `app.js:55`의 저장 키에는 deck id와 `location.pathname`이 들어간다. `sourceSignature`가 원본과 일치할 때만 편집본을 복원한다. URL 경로나 원본 직렬화가 바뀌면 이전 편집 저장과 연결이 끊길 수 있다.
- `app.js:1095`의 내보내기는 교체 가능한 일반 `content.js` 다운로드다. `openPresenter():1111`는 현재 URL의 query를 바꾸며, `post():1122`와 메시지 검사는 HTTP origin과 `file:` 예외를 구분한다.
- [현재 배포 안내](../../../DEPLOYMENT.md)는 같은 저장소 Pages의 `main`·루트 branch source, `.nojekyll`, 기존 `/examples/.../index.html#n` 주소를 설명한다. 이는 저장소 문서상의 기준이며 이번 담당이 원격 설정을 재조회한 결과는 아니다.

## 공식 문서로 확인한 Vite의 역할

아래 문서는 모두 **2026-10-27 검색 후 직접 열람**했다. 최신 `vite.dev` 문서를 사용했으며 설치 버전을 정하거나 설치하지 않았다. 현재 공식 개요는 production bundler를 Rolldown으로 설명한다. 오래된 Vite 글의 “개발 esbuild / 배포 Rollup” 구성을 최신 공통 사실로 옮기지 않는다. vanilla·React 템플릿을 각각 제공한다. [Vite 시작 안내](https://vite.dev/guide/)

| 구분 | 공식 동작 | STAGE에 대한 해석·한계 |
| --- | --- | --- |
| 개발 서버 | ESM 소스를 요청 시 변환·제공하며 HMR을 지원한다. | CSS 수정 미리보기·모듈 의존 관리가 편해진다. 현행에는 큰 의존성 번들이 없어 대형 번들러 대비 홍보 수치를 적용할 수 없다. |
| 개발 상태 보존 | 프레임워크 통합 또는 HMR 수용 코드가 업데이트를 처리한다. 처리하지 못하면 전체 reload한다. | 현재 IIFE를 옮기기만 해도 편집 상태·팝업이 항상 보존된다고 약속할 수 없다. |
| production | HTML entry에서 정적 배포 파일을 빌드한다. 기본 `dist`는 HTTP 정적 호스팅에 올린다. | 방문자가 Node·Vite를 실행할 필요는 없다. 개발 서버의 빠른 갱신과 청중 런타임 성능은 다른 지표다. |
| 최적화 | JS/CSS minify, 모듈 의존 기반 번들·청크, modulepreload, 비동기 CSS·의존 preload를 제공한다. | 파싱·전송·캐시 최적화의 수단이다. 이미지 디코드·전체 장 DOM 생성·geometry 측정 비용까지 자동 해결하지 않는다. |

근거: [Why Vite](https://vite.dev/guide/why), [Features](https://vite.dev/guide/features), [HMR 전체 reload 조건](https://vite.dev/guide/troubleshooting#a-full-reload-happens-instead-of-hmr), [빌드 옵션](https://vite.dev/config/build-options), [정적 배포](https://vite.dev/guide/static-deploy).

**Tree-shaking의 조건:** 도달하지 않고 부작용이 없는 코드를 제거하는 것이다. 전역·DOM 변경과 CSS import는 부작용이다. 현재 `app.js`의 실행 IIFE와 문자열 layout 분기는 “그 발표에 쓰이지 않는 양식”이라는 이유만으로 자동 제거된다고 보장할 수 없다. 모델·양식 함수를 명시적 모듈로 나누고 해당 entry의 사용 범위를 설계해야 이득을 평가할 수 있다. 효과 크기는 미측정이다. [Rolldown DCE 설명](https://rolldown.rs/in-depth/dead-code-elimination), [treeshake 옵션](https://rolldown.rs/reference/InputOptions.treeshake)

기존 일반 script 네 개를 그 상태로 Vite 서버에 제공하는 것만으로 JS 번들·tree-shaking이 완성되지는 않는다. Vite가 분석하는 `type="module"` entry로 전환하거나 호환 파일 복사 전략을 구분해야 한다. 전환 시 `window.PRESENTATION`·모델·StageVisual이 준비된 뒤 앱 초기화가 실행되도록 명시적 bootstrap을 설계하고, 일반 defer와 module의 실행 순서에 암묵적으로 기대지 않는다. [HTML과 module graph](https://vite.dev/guide/#index-html-and-project-root)

**청크의 판단:** 발표자·작성 패널을 별도 entry 또는 필요 시 import로 분리할 수 있다. 다만 현재 작은 runtime을 과도하게 나누면 요청·상태 연결·배포 교체 복잡성이 늘 수 있다. MPA끼리 공유하는 runtime과 장별 데이터부터 분리하고 수동 vendor 분리는 측정 후 결정한다. 열린 탭이 새 배포 후 사라진 옛 청크를 요청하는 상황도 검증한다. [청크 및 옛 자산 오류](https://vite.dev/guide/build#chunking-strategy), [로드 오류 대응](https://vite.dev/guide/troubleshooting#failed-to-fetch-dynamically-imported-module)

## HTML entry·자산·Pages 전환 설계

**Vite로 웹 출력을 관리한다면 MPA를 기본 후보로 둔다.** Vite는 여러 HTML entry를 명시할 수 있고 HTML 위치에 맞는 출력 구조를 만든다. 루트, 갤러리, 기존 다섯 발표, visual-story의 index/data, standalone visual-starter·text-layout의 index/data, 연구 페이지 등 유지할 공개 진입점을 먼저 목록화한다. SPA 라우터 도입은 필요하지 않다. 기존 `#4`와 `?presenter=1`을 계속 지원하면 Pages에서 새로운 서버 rewrite에 의존하지 않고 직접 링크를 유지할 수 있다. 발표를 새로 추가할 때 MPA entry도 포함하는 절차가 필요하다. [Vite MPA](https://vite.dev/guide/build#multi-page-app)

**공개 경로는 `/stage-presentation-kit/`이다.** 현재 Pages 주소를 유지하는 빌드라면 `base: '/stage-presentation-kit/'`을 후보로 삼는다. Vite는 분석한 HTML·CSS·import 자산 URL을 이에 맞춘다. 런타임에서 합성하는 URL은 `import.meta.env.BASE_URL` 등을 이용해 별도로 설계한다. 다른 폴더용 `base: './'`도 가능하지만 module CORS 문제는 해결하지 않는다. [public base](https://vite.dev/guide/build#public-base-path), [GitHub Pages 경로 설정](https://vite.dev/guide/static-deploy#github-pages)

**미디어 문자열을 빌드 그래프와 구분한다.** 정적 `import imageUrl`은 hash가 붙은 배포 URL이 되며 작은 자산은 inline될 수 있다. 반면 발표 데이터 속 `src: '../../assets/...'` 같은 임의 문자열을 Vite가 모두 발견·복사·재작성한다는 보장은 없다. `new URL(imagePath, import.meta.url)`처럼 분석 불가능한 변수도 자동 변환하지 않는다. 아래 중 하나를 명시적으로 선택한다. [자산 처리](https://vite.dev/guide/assets)

1. 빌드 시 compiler가 미디어 참조 목록을 만들고 import/manifest에 연결한다. 데이터에는 원본 식별자를 유지하고 화면에서 배포 URL을 해석한다.
2. 그대로의 파일 이름이 필요한 미디어·다운로드·호환 `content.js`는 선별한 `public` 트리에 복사한다. `public` 파일은 dist 루트로 그대로 복사되므로 최종 base와 발표별 상대 위치를 검증한다. 저장소 전체를 `public`로 복사하지 않는다.

첫 방식은 hash와 누락 검사를 통합하기 좋고, 두 번째는 교체 가능한 파일 계약을 유지하기 쉽다는 **설계 판단**이다. `dist`를 내려받은 뒤 `content.js`만 교체하는 기능을 유지하려면 데이터가 JS bundle에 고정되지 않아야 한다. 현재 우선순위에서 데이터까지 bundle에 고정하고 매 수정마다 재빌드를 요구하는 안은 동등 대체안이 아니다. `data.html`과 발표가 같은 교체 파일을 읽도록 유지하고 현재 compiler의 상대 미디어 검증·원문 보존·standalone runtime 복사를 재사용한다.

**Pages 자체는 계속 사용할 수 있다.** 후보 경로는 원고 변환 → Vite production build → `dist` artifact → Pages다. 현재 branch source는 `/` 또는 `/docs`만 고를 수 있으므로 단순히 root에 `dist/`를 만들었다고 현재 root 사이트가 그 결과로 자동 바뀌지는 않는다. Actions source로 전환해 dist를 배포하거나, 생성 결과를 별도 branch 루트/`docs`에 두는 선택이 있다. 소스와 산출물을 분리하는 Actions를 우선 설계 후보로 두되 설정 변경은 이번에 하지 않는다. [GitHub source 선택](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom workflow artifact 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

갤러리·미리보기·크레딧·연구 링크·기존 보관 PDF는 HTML entry에 연결되지 않은 파일도 있다. 현재 저장소가 제공하던 파일 목록과 dist 공개 목록을 대조해야 한다. Pages artifact에서 빠진 파일도 PUBLIC Git 이력에서 숨겨지는 것은 아니다. Vite build는 슬라이드 HTML 사전 렌더링을 자동 수행하지 않는다. 기존 PDF 보관 링크의 유지와 새 PDF 생성의 필수화는 구분한다.

## `file://` 계약은 별도 결정

Vite 공식 troubleshooting은 빌드 HTML을 `file:`로 열면 module script가 CORS 때문에 실행되지 않으며 HTTP로 제공해야 한다고 명시한다. 따라서 **상대 base를 설정한 기본 Vite dist를 현행 폴더 더블클릭 재생의 동등 대체물로 볼 수 없다.** 인터넷 없는 로컬 HTTP 재생과 서버 없이 HTML 직접 열기는 다른 요구다. [Vite file protocol 오류](https://vite.dev/guide/troubleshooting#built-file-does-not-work-because-of-cors-error)

| 선택 | 개발·배포 변화 | 검증할 경계 |
| --- | --- | --- |
| 현행 재생기 + 별도 Vite 작성기 | 기존 폴더 출력 유지, 새 작성 UI만 build | 데이터·내보내기·버전 호환을 공통 계약으로 유지 |
| HTTP/Pages 전용 Vite 재생기 | 기본 ESM dist 사용, 로컬에서는 정적 서버 실행 | 현재 무서버 폴더복사 계약에 미달하므로 기본 대체안에서 제외 |
| Vite 개발 + 별도 호환 출력 | classic script/IIFE·상대 자산 등의 출력 경로 추가 설계 | 청크·dynamic import·modulepreload·fetch 없는 재생, content.js 단일 교체·동일 자료 표·편집/export·file 팝업 회귀 |

마지막은 기술적으로 검토할 수 있는 별도 패키징 작업이며 이번에 구현·검증한 해법이 아니다. 단일 HTML이나 `base: './'` 설정 하나만으로 자동 보장한다고 제안하지 않는다. 기존 file 재생을 즉시 없애야 React를 쓸 수 있다는 뜻도 아니다.

## 세 대안의 의사결정 기여

| 항목 | 현행 | Vite + vanilla | Vite + React |
| --- | --- | --- | --- |
| 작성·실행 구조 | 일반 script + 검증 모델 + 자체 renderer | renderer 유지하면서 ESM·빌드 경계 도입 | Vite 이득에 더해 UI 컴포넌트·상태 소유권 재설계 |
| 재생 성능 | 현재 기준값 | minify·번들·캐시 효과는 후보, DOM 알고리즘 동일하면 해당 비용 유지 | 런타임 추가·구현 방식의 영향까지 측정해야 하며 속도 우위 미확인 |
| 정적 호스팅 | 이미 Pages 지원 | dist를 Pages에 배포 | dist를 Pages에 배포 가능, 상시 Node 서버 필수 아님 |
| 폴더 직접 열기 | 기존 계약 | 기본 ESM dist와 충돌, 별도 판단 필요 | 같은 Vite 출력 문제 + React별 DOM·편집 검증 |
| 운영 부담 | 원고 compiler와 hash query | dependency/lockfile·Node 버전·build/배포 관리 추가 | Vite 부담 + React 수명주기·DOM 통합 부담 |

현재도 CSR이므로 React CSR만으로 “처음으로 본문이 JS 의존”한다고 쓰면 잘못이다. 반대로 Vite의 정적 산출물이 서버에서 미리 만든 슬라이드 본문 HTML이라는 뜻도 아니다. 초기 본문을 HTML에 넣고 싶다면 별도 사전 렌더 설계가 필요하며, React의 서버 rendering/hydration 경계는 [React 담당 초안](react-draft.md)에서 확인한다.

## 다음 구현을 승인할 때 확인할 것

1. 현재 우선순위인 file 호환·무설치·content.js 단일 교체를 수용 기준으로 둔다. 기존 URL·동일 deck 데이터·편집 내보내기 형식과 두 표 경로를 명시적으로 보존한다.
2. 같은 deck·미디어·브라우저 조건에서 현행과 Vite+vanilla production을 먼저 비교한다. dev/HMR 시간과 방문자 cold/warm 로드, transferred bytes·JS 실행·장 이동·편집 반응·발표자·visual 데이터 갱신을 분리한다.
3. 동일 조건의 React 대안을 추가해 React에 따른 차이만 비교한다. DOM 수를 줄이거나 미디어 lazy loading을 함께 바꾸면 그것을 별도 최적화 효과로 기록한다.
4. root·중첩 발표·새 발표 index/data entry·standalone runtime·gallery·연구 링크·asset base의 dist 누락/404와 실제 Pages deep link를 확인한다. 열린 탭의 재배포 후 청크 오류도 포함한다. PDF 생성은 이번 필수 게이트로 삼지 않는다.

이 담당은 패키지 설치·프로토타입·제품 성능 측정·제품 회귀 테스트·배포를 실행하지 않았다. 따라서 수치 개선율·최종 bundle 크기·HMR 편집 상태 보존·file 호환 출력의 성공은 미확인이다. 총괄의 pull 후 같은 HEAD [현행 브라우저 측정](../evidence/browser-baseline.json)·[소스 크기](../evidence/source-sizes.json)를 통합 근거로 참조한다. pull 전 결과는 별도 보관본이며 이 기준의 성능으로 인용하지 않는다. 현재/Vite/React production 비교는 없으므로 현행 수치와 이 조사상의 조건부 기대를 구분한다.
