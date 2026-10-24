# STAGE 기술 구조 검토

2026-10-24 · `/root/engineering_manager/architecture_engineer`

## 권고

이번 컬러·모션 개선은 **현재 HTML/CSS/JavaScript 렌더러를 유지해 구현한다**. 현재도 단순한 정적 문서가 아니라 데이터 검증·19개 양식·편집·저장·내보내기·발표자 동기화를 가진 웹 애플리케이션이다. 강조색 역할 분리와 짧은 다섯 종류의 모션은 렌더러 교체 없이 확장할 수 있다. React·발표 프레임워크의 장단점과 이번 제품에 필요한지의 판단을 구분한다.

## 실제 코드와 동작에서 확인한 것

| 경계 | 현재 구현 | 이번에 지킬 계약 |
| --- | --- | --- |
| 재생 | `index.html`이 `content.js`, `deck-model.js`, `app.js`를 일반 defer script로 읽음 | 폴더 복사 후 `file://`로 열기, 외부 런타임·폰트·CDN 없는 재생 |
| 내용과 레이아웃 | `window.PRESENTATION` JSON, `deck-model.js`의 19개 layout 검증, `app.js:renderSlide()` 공통 렌더러 | 특정 슬라이드 ID·문구에 묶이지 않는 새 선택 필드 |
| 편집·보관 | `[data-field]`와 plaintext 편집, 원본 서명과 경로를 포함한 localStorage 키, Blob 기반 `content.js` 다운로드 | 새 모션 설정을 편집·복원·내보내기에서 그대로 보존 |
| 작성 | `scripts/markdown-deck.cjs`가 Markdown과 stage JSON을 파싱해 `content.js`·`index.html` 생성 | Markdown과 params의 동일 계약, 오류일 때 이전 생성 결과 보존 |
| 발표·읽기·PDF | `updateActive()`의 장 진행, 별도 읽기 CSS·인쇄 CSS | 모션이 장 진행·읽기·인쇄의 전제조건이 되지 않음 |
| 발표자 | 별도 창에 같은 렌더러로 현재·다음 장 생성, token을 가진 `postMessage`로 상태 동기화 | 관객 화면만 재생하고 복제 화면은 정적으로 완성 |

브라우저 TaskSpace 2의 본인 전용 p3에서 `file:///Users/ou9999/Documents/stage-presentation-kit/index.html#6`을 새로 열었다. 루트 20개 슬라이드, 활성 인덱스 5, `06 / 20`과 세 로컬 script가 실제로 표시됨을 확인했다. 이는 file 재생의 제한된 확인이며 전체 기능·모든 브라우저 검증은 아니다.

## 대안 비교

| 선택 | 얻을 수 있는 것 | 이 프로젝트에서 필요한 추가 작업 | 이번 판단 |
| --- | --- | --- | --- |
| 현재 HTML/CSS/JS | 기존 작성·렌더·오프라인 계약과 직접 연결, CSS 토큰·keyframes 확장 | 새 필드 검증, 상태별 모션 제어, 의미색 역할 정리 | 채택 |
| React | 복잡해지는 편집 UI를 컴포넌트·상태 모델로 조직할 수 있음 | 기존 DOM 렌더러·contenteditable·발표자 복제·상태 동기화를 React 수명주기에 연결하고 회귀 검증, 일반적 개발 구성에 build tool 도입 | 이번 범위에는 전환 이득 부족 |
| reveal.js | fragments·발표자 노트·PDF 등 발표 기능을 이미 제공 | 기존 19개 양식·원고 JSON·편집/export를 reveal markup과 진행 상태에 매핑, 인쇄 정책·키보드·동기화 통합 | 새 발표 엔진이 필요해질 때 재평가 |

React가 정적 호스팅이나 GitHub Pages를 막는 것은 아니다. [React 공식 앱 생성 가이드](https://react.dev/learn/creating-a-react-app)는 CSR·SPA·SSG와 정적 호스팅 경로를 설명한다. [from-scratch 가이드](https://react.dev/learn/build-a-react-app-from-scratch)는 Vite·Parcel·Rsbuild 같은 build tool부터 시작하는 일반적 개발 구성을 제시한다. 따라서 이번 선택은 “React는 서버가 필수”라는 기술 제한이 아니라, 현재의 무빌드 작성·배포 편의와 필요한 기능 범위에 대한 판단이다. 별도 번들 구성으로 file 배포를 설계할 수도 있지만 이번 목적을 위한 필수 작업은 아니다.

[reveal.js 기본 설치](https://revealjs.com/installation/)도 브라우저만으로 여는 무빌드 구성을 제공한다. 다만 외부 Markdown 로딩에는 로컬 서버가 필요하며, [speaker view](https://revealjs.com/speaker-view/)도 로컬 사용 시 서버 요구를 설명한다. [fragments](https://revealjs.com/fragments/)는 장 내부에 추가 진행 단계를 만들고, [PDF export](https://revealjs.com/pdf-export/)는 기본적으로 fragment별 페이지를 만든다. 이 기능들은 유용하지만 현재의 “한 번 넘기면 다음 장, PDF는 한 장당 한 페이지, 모든 내용 표시” 계약에 통합할 판단과 작업이 필요하다.

## 디자인팀이 바로 사용할 구현 경계

1. **새 데이터는 작은 enum 하나로 시작한다.** `slide.motion`을 `none | fade | rise | stagger | chart`로 제한하고 미지정은 기존의 짧은 fade 동작을 유지한다. 임의 CSS·선택자·실행 코드 입력을 받지 않는다.
2. **작성 경로를 함께 확장한다.** `deck-model.js`에 검증을 추가하고 compiler의 `COMMON`에 `motion`을 허용해야 한다. 현재 compiler는 stage JSON과 metadata 모두 최종 allowed 검사를 거치므로 params만 통과시키고 Markdown이 실패하는 불일치를 피한다.
3. **재생과 복제본을 분리한다.** `app.js`의 활성 장·모드·편집 상태와 `renderSlide(..., preview)`를 모션의 경계로 삼는다. `styles.css`의 기본 상태는 최종 콘텐츠이며, 관객 발표 화면에서만 효과를 얹는다. 구체 엔진·selector·취소 규칙은 [모션 계획](motion-plan.md)이 확정한다.
4. **의미색을 구조색에서 분리한다.** 핵심 문장·이름·수치·선택 차트 막대에는 선명한 의미색, eyebrow·출처·경계에는 중립 토큰을 쓴다. 사진·artifact 표면은 기존의 독립 색을 유지한다. [리서치 취합](../research/synthesis.md)의 색상값은 원본 공식값이 아닌 제품 제안이다.
5. **생성 결과를 함께 갱신한다.** 변경한 원고·루트 content 예시, `CONFIG.md`·`MARKDOWN.md` 작성 안내와 runtime cache hash를 연결한다. 공통 runtime이 바뀌면 다섯 예제의 `index.html`을 compiler로 재생성해 실제 파일 hash와 query가 맞도록 한다.

## 도입을 다시 검토할 조건

실시간 협업 편집, 복잡한 속성 패널과 undo 이력, 다중 문서 라우팅·상태 관리가 제품의 중심이 되면 React 기반 작성기를 별도로 검토한다. 수동 단계 공개·타임라인 제어·많은 발표 플러그인이 중요해지면 reveal.js 또는 전용 모션 엔진의 이득을 다시 비교한다. 그 경우에도 재생용 데이터 계약과 오프라인 출력은 작성기 기술과 분리해 유지할 수 있다. 이는 향후 판단 기준이며 이번에 새 편집기·프레임워크를 도입한 결과가 아니다.

## 검증과 한계

- 이번에 직접 연 공식 문서: React 2개와 reveal.js 4개. 본문과 실제 현행 코드를 대조했다.
- 제품 코드를 수정하지 않았다. 새 라이브러리 설치·React/reveal 변환 시제품·성능 벤치마크·제품 회귀 테스트는 수행하지 않았다.
- 구현 검증은 새 enum 정상/오류·원본 불변·Markdown/params 동일성, 대표 선언/범주/차트, 빠른 이동·편집·발표자·reduced-motion·모바일 읽기·인쇄에 집중한다. 기존 자동 테스트와 새 동작의 의미 있는 경계 테스트를 함께 실행한다.

팀 목표·담당자·미완료 작업·결정의 단일 기록은 루트 `WORK_LOG.md`가 담당한다.
