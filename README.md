# STAGE — 재사용하는 웹 발표 템플릿

`talks/발표이름/slides.md`만 수정하면 같은 STAGE 스타일의 발표와 읽기 자료를 만듭니다. 공통 테마는 `stage.config.json` 한 곳에서 바꾸며 여러 발표가 원고와 자산을 독립적으로 유지합니다. 생성한 화면은 로컬 CSS·JavaScript와 한국어 시스템 글꼴로 재생합니다.

```sh
npm ci
npm run dev
# http://127.0.0.1:4320 에서 확인 · 원고를 저장하면 자동 갱신
npm run build
# presentations/ 전체가 공유할 결과물
```

Node.js 20 이상이 필요합니다. 새 발표는 `talks/` 아래 폴더에 `slides.md`를 추가하면 모음에 자동 등록됩니다. `---`로 장을 나누고 일반 제목·문단·목록·코드·인용·표·이미지를 작성하세요. [Markdown 작성 안내](MARKDOWN-FIRST.md)와 서로 다른 주제의 [네 원고](talks/)를 제공합니다. 원고가 수정의 기준이며 생성 화면은 읽기 전용입니다. 발표 재생에는 패키지 설치가 필요하지 않습니다.

짧은 선언, 사진과 설명, 여러 사진, 인용은 원고 형태에 맞춰 조판합니다. 세로 사진(2:5)·사진 스트립(4:3)·불균등 모자이크·혼합 타일·아이콘월이나 강조색·사진 초점이 필요하면 해당 장의 `stage-slide`와 H2 그룹의 `stage-group`에 작은 설정을 붙입니다. 문장·사진·값을 다른 형식에 다시 입력하지 않으며, 읽기 화면은 같은 원고의 전체 내용과 순서를 유지합니다. [제품 결정](presentations/product-notes/)·[사진 워크숍](presentations/team-learning/)·[사진 에세이](presentations/photo-essay/)·[전시 준비](presentations/community-exhibit/)에서 서로 다른 구성과 색의 흐름을 볼 수 있습니다. 혼합 타일은 H2 자료 수에 맞춰 배치하고, 아이콘월은 원래 목록을 사용합니다. 12칸 고정 배치는 선택 사항입니다.

[재사용 배치와 새 원고의 실제 화면](research/reusable-layouts-20261028/)에서 배치별 예제와 원본 Markdown을 함께 확인할 수 있습니다.

[개선된 16장과 같은 원고 전후 비교](https://ou9999.github.io/stage-presentation-kit/research/presentation-renewal-20261028/)에서 실제 화면을 확인할 수 있습니다. [팀 회의](research/presentation-renewal-20261028/MEETING.md)와 [검증 범위](research/presentation-renewal-20261028/VERIFICATION.md)도 함께 제공합니다.

기존 `content.js` 직접 작성과 폴더 복사 방식도 사용할 수 있습니다. 이 방식의 설치 없는 시작·화면 편집은 아래 설명을 따릅니다.

**[Markdown 발표 모음](presentations/)** · [발표 예제 6개·47장](examples/index.html) · [새 시각자료 발표](examples/visual-story/index.html) · [바로 복사하는 스타터](examples/visual-starter/index.html) · [입력 계약](CONFIG.md) · [새 Markdown 작성](MARKDOWN-FIRST.md) · [기존 전용 문법](MARKDOWN.md)

[글 배치 스타터8장](examples/text-layout/index.html) · [글 배치 전후 비교](research/type-layout-20261025/index.html): Apple·OpenAI·Anthropic의 실제 발표 장면을 대조하고 두 차례 비평한 결과를 적용했습니다. 넓은 추세와 설명형 좌우 배치를 구분하고, 긴 숫자는 제목 폭을 빼앗지 않게 실제 폭으로 재배치합니다. [복사·편집 안내](examples/text-layout/README.md).

[시각자료 개선 전후 비교](research/visual-redesign-20261024/index.html)에서 실제 화면을 비교할 수 있습니다. 현재 웹 발표는 자동 검사185개와 실제 편집·내보내기·모바일·재사용 검수를 통과했습니다. [검증 근거](research/visual-redesign-20261024/verification.md).

## 기존 폴더로 시작하기

1. [실행 가능한 스타터 폴더](examples/visual-starter/) 전체를 원하는 위치에 복사합니다.
2. `index.html`을 열고 `content.js`의 제목·문장·자료를 바꿉니다.
3. 새로고침합니다. 그림·자동 강조값·읽기 표는 같은 자료에서 표시됩니다.

[짧은 스타터 원본](examples/visual-starter.js)에서 필요한 장 하나만 복사해도 됩니다. 스타터에는 7점 추세·5범주 구성비·2단계 흐름이 있으며, 다른 프로젝트의 코호트·인터뷰 자료 전체를 입력하지 않습니다. [복사·편집·내보내기 안내](examples/visual-starter/README.md)를 제공합니다.

```js
{ layout: "visual", title: "지원 문의는 어디에 모일까?",
  visual: { kind: "composition", labels: ["계정", "결제", "사용법", "오류", "기타"],
    values: [8, 12, 10, 6, 4], unit: "건", focus: 1, emphasis: "focus" } }
```

`layout: visual`은 선·막대·구성비·퍼널·흐름·좌표·일정·히트맵 여덟 종류입니다. 사진용 사각 프레임 없이 제목·자료·큰 값이 같은 무대를 사용합니다. 강조 숫자는 `focus`의 자료에서 계산하므로 따로 복제하지 않습니다. 자세한 [필드와 예시](CONFIG.md#시각자료-visual), [디자인 원칙](DESIGN.md)을 확인하세요.

## 기존 content.js 화면에서 편집하기

**내용 편집**에서 native 문장을 바꿉니다. visual 장에서는 **시각자료 데이터 편집**으로 JSON을 수정하면 그림·강조값·발표 안 읽기 표가 함께 바뀝니다. 잘못된 JSON·배열 대응·숫자·필요한 분모/참조는 적용 전에 안내합니다. 설치나 SVG 재생성을 요구하지 않습니다.

편집은 현재 브라우저에 저장됩니다. **내용 내보내기**로 받은 `content.js`를 발표 폴더의 같은 파일로 교체하면 다른 기기에도 전달됩니다. 별도 `data.html`은 디스크의 같은 `content.js`를 직접 읽습니다. 브라우저의 임시 편집값을 다른 페이지에 자동 공유하지 않으므로 별도 표에도 반영하려면 내보낸 파일로 교체한 뒤 표 페이지를 새로고침하세요.

[새 제품 개선 예제](examples/visual-story/index.html)는 직접 `content.js` 원본과 같은 원본의 [표 페이지](examples/visual-story/data.html)를 제공합니다. 12장은 예제의 이야기 길이이며 visual의 필수 수량이 아닙니다. 복잡한 그림을 고정 SVG로 생성하거나 예제 전용 data.json 스키마를 채울 필요가 없습니다.

## 기존 발표와 Markdown

공통 렌더러는 기존 **20개 레이아웃**과 일반 Markdown 본문 양식을 지원합니다. 루트 20장 모음과 기존 다섯 발표의 원고 내용은 유지합니다. [C안의 한 장 스타터](examples/editorial-starter.js)와 [기존 params 예제](examples/project-review.js)도 사용할 수 있습니다.

Markdown을 선호하면 기존 다섯 예제의 `slides.md`를 수정하고 선택적으로 변환합니다. 직접 원본 예제와 스타터는 이 명령이 `content.js`를 덮어쓰지 않습니다.

```sh
# 선택형 작성 도구 · Node.js 필요 · 패키지 설치 없음
node scripts/build-examples.cjs
node scripts/markdown-deck.cjs examples/product-launch/slides.md examples/my-talk
```

첫 명령은 기존 다섯 Markdown을 변환하고 직접 원본 발표·스타터의 HTML 참조를 갱신합니다. 평소 직접 원본을 수정하고 발표할 때에는 실행할 필요가 없습니다. Markdown 발표의 화면 편집은 Markdown으로 자동 돌아오지 않습니다.

## 발표와 공유

- 방향키·Space로 이동하고 `Home`·`End`로 첫/마지막 장으로 갑니다.
- `O` 전체 보기, `F` 전체 화면, `P` 발표자 창, `?` 사용법입니다.
- 작은 화면에서는 읽기 모드에서 native 내용과 같은 자료의 표를 읽습니다. 표의 모든 셀은 자체 스크롤 영역에 남습니다.
- 배포할 때에는 발표 내용과 공통 runtime·로컬 자산의 상대 위치를 함께 유지합니다. standalone 스타터는 폴더 전체만 옮기면 됩니다.

현재 공개 저장소의 [배포된 예제](https://ou9999.github.io/stage-presentation-kit/examples/)와 로컬 변경의 적용 시점은 다를 수 있습니다. 웹 갱신 절차는 [DEPLOYMENT.md](DEPLOYMENT.md)를 확인하세요. 공개할 원고와 발표자 노트만 저장합니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `content.js` | 직접 수정하는 내용·자료·발표자 노트 |
| `index.html` | 웹 발표 진입점 |
| `app.js` · `styles.css` | 발표·읽기·편집·발표자와 공통 구도 |
| `visual.js` · `visual.css` | 여덟 종류의 native 자료·자동 강조값·동일 원본 표 |
| `deck-model.js` | 의미 있는 입력·참조 진단 |
| `examples/visual-story/` | 직접 원본 12장 제품 개선 이야기 |
| `examples/visual-starter/` | 폴더째 복사하는 독립 실행 스타터 |
| `scripts/` | 선택형 Markdown 변환과 HTML 참조 갱신 |
| `CONFIG.md` · `MARKDOWN.md` | 직접 입력과 선택형 Markdown 계약 |
| `research/` | 이전 조사·토론·디자인과 검증 이력 |

기존 PDF와 과거 생성 자료는 이전 검증 이력으로 보관합니다. 현재 웹 발표의 사용 흐름과 완료 기준에 PDF 작성·페이지 수·인쇄 제약을 두지 않습니다.

## 참고와 범위

사진과 컬러는 별도로 추가 조사했습니다. [사진·컬러 비교 보드](research/color.html)에서 인물 이미지 모음, 조건별 사진 스트립, 작품 콜라주, 의미색, 유색 타이포, 발표자 소개 색면을 실제 프레임으로 비교할 수 있습니다. [DevDay 추가 조사](research/devday-color-photo-analysis.md)와 [외부 추가 조사](research/external-color-photo-analysis.md)는 전후 장면과 관찰 범위를 기록합니다. 중립 바탕을 원본 사진의 흑백 처리나 데이터·상태 이외의 색 금지로 해석하지 않습니다. 현재 예제는 풀컬러 스톡 사진 7장과 자체 제작 SVG를 사용하며, 다중 사진·결과물 모음·의미색 아이콘·혼합 타일 양식을 구현했습니다. [운영 기준과 구현 상태](research/color-design-criteria.md), [사진 크레딧](assets/CREDITS.md)을 함께 확인할 수 있습니다.

[OpenAI DevDay 2026 키노트](https://www.youtube.com/watch?v=Fls_onRviPM)와 [Codex Has Left The Laptop 세션](https://www.youtube.com/watch?v=XkKdbPhIvbY)의 실제 영상 구간을 재생하고 대표 프레임을 직접 확인했습니다. [Apple WWDC25](https://developer.apple.com/videos/play/wwdc2025/356/), [Figma Config 2025](https://www.youtube.com/watch?v=5q8YAUTYAyk), [Vercel Ship 2025](https://www.youtube.com/watch?v=lNmO7fDiyuE)도 비교했습니다. 사이트의 색상 대신 메시지·도표·시연의 배치와 정보량 차이를 참고한 독자 템플릿입니다.

전편 시청이나 원본 제작 도구의 확인을 뜻하지 않습니다. 시청 범위, 타임스탬프, 프레임, 관찰과 제안의 구분은 [세션 조사](research/devday-session-analysis.md)와 [외부 사례 조사](research/external-presentation-analysis.md)에 있습니다. 원본 로고·전용 글꼴·발표 이미지를 슬라이드의 배경으로 재사용하지 않았습니다.

발표 재생은 설치 없이 유지합니다. 새 Markdown 흐름은 `npm run dev`가 원고 변경을 자동 반영하고 `npm run build`로 공유 폴더를 생성합니다. 기존 전용 문법은 위의 legacy 변환 명령을 사용합니다. 코드 하이라이트·수식·복잡한 Markdown 확장과 플러그인이 필요하면 [Slidev](https://sli.dev/)나 [reveal.js](https://revealjs.com/)도 별도로 검토할 수 있습니다.

## 현장 사진에서 구현까지

[원본과 적용 결과 비교](research/visual-implementation.html)에서 사진·아이콘·수치·혼합 타일의 변경을 볼 수 있습니다. [서울 조사](research/seoul-devday-visual-research-20261023.md), [도쿄·벵갈루루 조사](research/completed-cities-visual-research-20261023.md), [구현 diff와 수용 기준](research/visual-implementation-diff-20261023.md)을 별도로 남겼습니다.

새 [현장 구성 예제](examples/devday-compositions/index.html)는 SF의 6열 사진과 의미색 범주, 서울의 아이콘월·두 수치, 서울과 도쿄에서 확인한 혼합 타일 구성을 재사용합니다. `bento`의 `seoul`·`recap`은 정확히 12개의 고정 슬롯을 사용합니다. 4장은 [재조사와 C안](research/review-20261023/)에 따라 한 가상 프로젝트의 결과물로 편집했으며 `variant: editorial`과 구조화한 `artifact`로 문장·사진·수치를 바꿔 쓸 수 있습니다. 기존 `mosaic`은 Figma 제품 데모와 가까운 독자 작품 모음으로 유지하며 현장 혼합 타일과 구분합니다.

현장 사진은 연구 근거입니다. 발표 예제에는 스톡 사진과 자체 SVG를 사용하며 원본 로고·캐릭터·슬라이드를 넣지 않습니다. 도쿄의 모든 패턴이나 벵갈루루의 발표 전체를 구현했다는 뜻은 아닙니다. 확인한 장면과 남은 한계는 각 조사에 기록했습니다.

## C안 제품화 검증

`node --test tests/*.test.cjs` **163개 통과**. C안의 12타일·8종 결과물·편집 가능한 글자와 사진 로딩, 세 테마, 390px 읽기 모드, 실제 문장 수정·저장·새로고침·다운로드, 발표자 창 양방향 이동, `file://` 오프라인 재생을 확인했습니다. 긴 문장의 정확한 경고 경로와 원문 보존도 확인했습니다. [개발팀 검증 범위와 근거](research/implementation-c-20261023.md).

다른 주제의 스타터를 별도 폴더에 복사해 **빌드 없이 실행**하고 표지·발견 문장을 편집·저장·복원·실제 다운로드한 데이터까지 총괄이 독립 확인했습니다. 갱신한 미리보기·PDF와 최종 자원 식별값은 [총괄 통합 검증](research/implementation-c-integration-20261023.md)을 참조하세요. 아래의 이전 55장 검증과 이번 C안의 확인 범위를 구분합니다.

## 이전 혼합 타일 추가 시 검증

`node --test tests/*.test.cjs` **111개 통과**. 5개 발표·35장과 기존20장, 총55장을 실제 키보드로 탐색해 경고·미디어 실패·브라우저 오류0을 확인했습니다. 390px 읽기·6개 발표의 오프라인 실행·새 양식의 편집/복원/다운로드·발표자 창 양방향 이동과 PDF55페이지 렌더도 확인했습니다. [검증 범위와 증거](research/implementation-verification-20261023.md).

## 이전 버전에서 확인한 동작

아래는 사진·컬러 양식을 추가했을 때의 검증 이력입니다. 이번 혼합 타일·아이콘월 추가분의 최종 검증을 대신하지 않습니다.

2026-10-23 macOS의 Chromium 154에서 데스크톱과 390×844 모바일 에뮬레이션으로 확인했습니다. 당시 20장 예제의 확인 범위는 다음과 같습니다.

- 20장 전체의 렌더링과 텍스트 잘림 없음, 16개 양식, 사진·SVG 로딩. 사진과 작품의 주요 크롭도 직접 검수했습니다.
- 새 사진 모음의 항목 설명 편집·새로고침 복원·실제 `content.js` 다운로드와 데이터 확인.
- 전체 보기 20장 선택, 테마 변경 시 의미색과 담황색 표면의 글자 대비.
- 발표자 창의 사진 모음·결과물·콜라주 미리보기와 노트 동기화, 소개 색면에서 중립 장으로 양방향 이동.
- 390px 읽기 모드에서 사진·작품·결과물의 단일 열과 순서 유지, 전체 보기 20장, 가로 넘침 없음.
- 20페이지 PDF와 새 사진·조건 비교·작품·결과물·소개 장의 렌더링 이미지 확인.

실제 발표 기기의 글꼴과 화면 비율은 리허설에서 확인하세요. 이 기록은 다른 운영체제나 물리 리모컨의 검증을 뜻하지 않습니다.

추가 사진·컬러 비교 보드는 8개 사례와 20개 근거 프레임의 로딩, 역할별 필터, 확대·닫기, 원본 시점 링크를 확인했습니다. 초기 보드에서 390px 화면의 필터·확대 창과 가로 넘침 없음을 확인했습니다. 최종판은 데스크톱에서 확인했으며, 이후 조정한 표지 배치와 이미지 높이를 모바일에서 다시 확인하지는 않았습니다. 이는 연구 보드의 확인 결과입니다.

## 이전 입력 안정성 검증

입력·수량 오류는 해당 장에서 안내하고 원본 데이터를 보존합니다. 긴 문장은 실제 화면 크기에서 작성자 점검으로 알립니다. [수정과 검증 기록](research/reusability-hardening.md)에 실패 입력과 결과가 있습니다. `node --test tests/*.test.cjs` 43개와 실제 브라우저의 정상·실패 데이터, 모바일·발표자 창·PDF를 확인했습니다. 런타임에는 Node나 패키지 설치가 필요하지 않습니다.
