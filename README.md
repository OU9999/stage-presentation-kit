# STAGE — 재사용하는 웹 발표 템플릿

주제에 맞는 레이아웃을 골라 내용을 바꾸는 발표 키트입니다. 설치나 빌드 과정 없이 `index.html`을 브라우저에서 열면 됩니다. 한글 시스템 글꼴과 로컬 파일만 사용합니다.

**외부 발표 링크:** [C안 4번](https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4) · [예제 고르기](https://ou9999.github.io/stage-presentation-kit/examples/) · [20장 양식 모음](https://ou9999.github.io/stage-presentation-kit/). 같은 공개 저장소의 GitHub Pages에 배포했습니다. [작성·갱신 안내](DEPLOYMENT.md)에서 원고를 바꿔 같은 링크로 발행하는 절차를 확인하세요.

[전체 예제 미리보기](example-preview.png) · [표지 미리보기](preview.png) · [샘플 PDF](output/pdf/stage-sample.pdf) · [디자인 가이드](DESIGN.md) · [입력 계약과 수량](CONFIG.md) · [원본 장면 비교 보드](research/index.html) · [사진·컬러 비교 보드](research/color.html) · [실제 세션 조사와 수정 기준](research/decisions.md)

**[Markdown 발표 예제 5개·35장 열기](examples/index.html)** · [다섯 가지 결과 미리보기](examples/previews/collection.png) · [Markdown 작성법](MARKDOWN.md)

제품 소개·기술 개선 보고·사진 중심 이야기·워크숍·현장 구성 연구를 각각 7장짜리 별도 발표로 제공합니다. 공통 렌더러는 19개 양식을 지원합니다. 각 폴더에는 수정할 `slides.md`와 바로 열 수 있는 `index.html`이 있고, [PDF](output/pdf/)도 함께 보관합니다. 수치와 제품명은 양식 설명용 가상 예시입니다.

다섯 예제 모두 **Stage 검정 바탕·큰 글자·넉넉한 여백**을 기본으로 합니다. 사진과 결과물은 원래 컬러를 살리고, 강조 문장과 범주의 색으로 흐름을 만듭니다.

[컬러·모션 개선 비교](research/color-motion-20261024/index.html)에서 원본 근거와 개선 화면을 볼 수 있습니다. 강조색은 핵심 문장·이름·수치·선택한 막대에 집중하고, 보조 라벨과 경계는 중립으로 유지합니다. `motion`으로 짧은 전환·제목 등장·항목 순차 등장·차트 진입을 선택할 수 있습니다.

기존 양식 모음은 **20장·16개 양식**입니다. [사진 모음](index.html#3), [디지털 크롭 비교](index.html#5), [컬러 선언](index.html#6), [결과물 2×2](index.html#10), [작품 콜라주](index.html#11), [보라색 이름 소개](index.html#12)를 바로 볼 수 있습니다. [예제와 연구 근거의 연결](EXAMPLES.md)도 기록했습니다.

## 시작하기

1. 이 폴더를 복사하고 새 발표 이름으로 바꿉니다.
2. `index.html`을 엽니다.
3. 화면의 편집 기능으로 문장을 바꿉니다. 브라우저에 저장한 변경 사항은 해당 브라우저에서 다시 열 때 복원됩니다.
4. 다른 컴퓨터로 옮기거나 보관하려면 내용을 내보내고, 내려받은 `content.js`로 폴더의 같은 파일을 교체합니다. 폴더 전체를 함께 옮깁니다.

브라우저 저장은 원본 파일을 수정하지 않습니다. 중요한 발표는 내보낸 파일을 폴더에 반영해 보관하세요.

## GitHub에서 가져오기

발표는 위 웹주소로 보고, 내용을 바꾸려면 저장소를 복제합니다. 공개 저장소는 읽기용 GitHub 인증이 필요하지 않으며 원격에 수정 사항을 push하려면 쓰기 권한이 있는 계정을 사용합니다.

```sh
git clone https://github.com/OU9999/stage-presentation-kit.git
cd stage-presentation-kit
open index.html
```

`open`은 macOS 명령입니다. 다른 운영체제에서는 폴더의 `index.html`을 브라우저로 열면 됩니다. 이 프로젝트는 현재 저장소의 `main`·루트를 GitHub Pages 발행 대상으로 사용합니다. 공개 전환과 Pages 활성화·배포 성공은 별개입니다. 런타임·사진·가이드·연구 근거와 샘플 PDF를 보관하며, `output/example/` 등의 중간 검수 파일은 제외합니다.

## Markdown으로 새 발표 만들기

예제 모음은 **Markdown 원문 → 내용 데이터 → 기존 렌더러**로 생성합니다. AI 연결은 필요하지 않습니다. 원문 작성이나 다듬기를 AI에게 맡겨도 같은 입력 문법을 사용합니다.

1. `examples/`에서 가까운 예제의 `slides.md`를 복사해 제목·내용·이미지 경로를 바꿉니다.
2. Node.js가 있는 환경에서 아래 명령을 실행합니다. 패키지 설치는 필요하지 않습니다.
3. 생성된 `index.html`을 열어 발표합니다. 생성 후 재생에는 Node.js가 필요하지 않습니다.

```sh
# 저장소의 다섯 가지 예제 다시 생성
node scripts/build-examples.cjs

# 수정한 Markdown을 새 폴더에 생성
node scripts/markdown-deck.cjs examples/product-launch/slides.md examples/my-talk
```

이 입력기는 STAGE에서 지원하는 Markdown 문법을 사용합니다. Marp 테마·지시문 호환을 뜻하지 않습니다. 사진·도표·콜라주에는 작은 배치 설정을 함께 작성합니다. [지원 문법과 매핑](MARKDOWN.md)을 확인하세요.

Markdown을 쓰는 발표는 `slides.md`가 원본입니다. 생성된 `content.js`를 직접 고치거나 화면에서 편집한 내용은 Markdown으로 돌아오지 않습니다. 오래 보관할 수정은 원문에 반영한 뒤 재생성하세요. PDF와 미리보기 이미지는 자동 갱신하지 않으므로 최종 내용으로 다시 저장해야 합니다.

## Params로 새 발표 만들기

`content.js`가 내용의 원본입니다. 발표 제목, 발표자, 슬라이드 문장과 발표자 노트를 이 파일에서 관리합니다. 샘플 슬라이드는 양식을 보여주는 예시이므로 모두 사용할 필요는 없습니다. 필요한 슬라이드 객체를 복사하거나 삭제하고 순서를 바꾸세요.

파일 위쪽의 `title`, `speaker`, `date`, `footer`, `theme`를 먼저 바꿉니다. 각 슬라이드의 `layout`은 양식 이름이고, `title` 배열의 문자열 하나가 한 줄입니다. `highlight`에는 강조할 제목의 일부를, `notes`에는 화면에서 말로 덧붙일 내용을 적습니다. 새 슬라이드를 복제하면 `id`도 서로 다르게 지정하세요.

| 레이아웃 | 넣을 내용 |
| --- | --- |
| `cover` | 발표 제목, 부제, 발표자 |
| `statement` | 기억할 한 문장 |
| `section` | 새 장의 번호와 이름 |
| `compare` | 같은 기준으로 비교하는 두 열 |
| `metric` | 숫자 하나, 의미, 출처 |
| `image` | 이미지와 짧은 캡션 |
| `demo` | 화면이나 영상, 시연 순서 |
| `quote` | 짧은 인용문과 출처 |
| `steps` | 다음 행동 세 단계 |
| `closing` | 핵심 메시지와 다음 행동 |
| `chart` | 짧은 주장과 단일 막대 도표, 출처 |
| `media` | 화면 전체를 사용하는 이미지 또는 영상 |
| `gallery` | 같은 비율의 사진 모음 `portraits` 또는 조건 비교 `strip` |
| `mosaic` | 비율과 크기가 다른 작품·제품 콜라주 |
| `results` | 짧은 주장 옆 문서·UI 등 결과물 2×2 |
| `categories` | 같은 선굵기의 자체 SVG 아이콘·이름을 의미색으로 연결한 범주 |
| `bento` | 사진·UI·수치·짧은 문장을 서로 다른 폭과 높이의 12개 타일로 결합 |
| `icon-wall` | 중앙 메시지 주위에 배치한 이미지 또는 의미 아이콘 1~22개 |
| `metric-pair` | 같은 위계의 두 수치와 각 대상의 의미색 |

`cover`, `statement`, `section`, `closing`에 `align: "center"`를 지정하면 중앙에 큰 메시지를 놓습니다. 이 변형에서는 반복 라벨과 하단 문구를 줄여 문장에 집중합니다. `chart`의 수치와 항목, `media`의 파일 경로도 같은 내용 파일에서 교체합니다. 샘플은 중립 문장 → 풀컬러 사진 → 조건 비교 → 유색 선언과 범주 → 발표자 소개 → 근거·결과물 → 보라색 이름 소개와 중립 복귀의 흐름입니다. 데이터는 실제 성과가 아닌 양식용 예시입니다.

차트의 `chart.rows`에는 항목 이름과 0 이상의 수치를 넣고, `chart.max`에 비교의 최댓값을 지정합니다. `highlight: true`인 행의 막대는 `tone`이 있으면 그 의미색으로, 생략하면 중립 밝기로 강조합니다. 수치와 라벨의 밝기는 따로 유지합니다. `quiet: true`를 지정하면 보조 라벨과 하단 문구를 숨길 수 있습니다.

새 이미지 양식의 `items`에는 `src`, `alt`, `label`, `caption`, `fit`, `focalPoint`를 넣습니다. 사진 모음은 `variant: "portraits"`, 조건 비교는 `variant: "strip"`을 지정합니다. `mosaic`은 숫자 span 1 또는 2, 합계 8 이하를 4열×2행에 배치합니다. 작품 모음은 빈 칸을 채우며, 원본과 모바일 읽기 순서는 유지합니다. `results`는 1~4개를 지원합니다. 문서·UI·타이포 작품의 중요한 내용이 잘리지 않도록 `fit: "contain"`을 우선하세요.

`tone`은 `orange`, `purple`, `blue`, `green`, `yellow` 중 하나이고, `highlight`에 강조할 문장이나 이름을 넣습니다. `surface: "butter"`는 그 장만 담황색 소개 화면으로 표시합니다. 범주와 새 혼합 구성은 항목별 `tone`에 `blue`, `green`, `orange`, `purple`, `yellow`, `white`를 사용합니다. 현재 예제는 검정 바탕을 유지합니다. `zoom`은 1~3의 **표시 프레임 기준 디지털 확대**이며 기본값은 1입니다. 광학 배율을 뜻하지 않습니다. 색·배치·이미지 경로는 `content.js`, 문장과 항목 설명은 화면의 편집 기능에서 바꿉니다.

`styles.css`의 테마 색상과 공통 타이포를 바꾸면 전체 발표에 적용됩니다. `DESIGN.md`에서 각 레이아웃의 사용 기준과 권장 문장 길이를 확인할 수 있습니다.

장별 `motion`은 `none`, `fade`, `rise`, `stagger`, `chart` 중 하나이며 생략하면 짧은 `fade`를 사용합니다. 선언·소개에는 `rise`, 단계·범주·결과에는 `stagger`, 비교 막대에는 `chart`를 선택할 수 있습니다. 읽기·편집·발표자 미리보기·전체 보기·PDF·모션 줄이기 설정에서는 모든 내용이 즉시 표시됩니다. [params 계약](CONFIG.md#모션-선택)과 [Markdown 예시](MARKDOWN.md#장별-모션)를 제공합니다. 이 기능은 기존 HTML/CSS/JavaScript에서 동작하며 추가 패키지나 빌드가 필요하지 않습니다.

이미지와 영상은 `assets/`에 넣고 상대 경로로 연결하면 오프라인으로 재생할 수 있습니다. 외부 데모 링크는 연결된 사이트와 네트워크가 필요합니다. 현재 샘플은 실시간 외부 서비스에 의존하지 않습니다.

다른 주제의 시작점은 [릴리스 회고 params](examples/project-review.js)입니다. 복사한 폴더의 루트 `content.js`를 이 파일의 내용으로 교체해 사용합니다. 필드 타입·수량 제한·오류 복구는 [CONFIG.md](CONFIG.md)를 참조하세요.

### C안으로 빠르게 시작하기

[Field Notes 결과](examples/devday-compositions/index.html#4)는 사진·인용·발견·다음 행동을 한 이야기로 연결합니다. [한 장짜리 릴리스 회고 스타터](examples/editorial-starter.js)의 내용을 복사한 폴더의 **루트 `content.js`**로 교체하면 설치·빌드 없이 같은 구성을 쓸 수 있습니다. 우선 제목·문장·수치·사진만 바꾸세요. 표지 그림·파형·도구 아이콘은 자동으로 그리며, 문장은 화면에서 편집하고 저장·내보낼 수 있습니다.

Markdown을 선호하면 [현장 구성 원고](examples/devday-compositions/slides.md)의 4장을 복사한 뒤 다시 생성합니다. `layout: bento`, `preset: seoul`, `variant: editorial`이 배치를 담당합니다. [배열 순서와 작성법](MARKDOWN.md#편집형-혼합-타일-c안), [필수 필드만 보는 계약](CONFIG.md#c안처럼-한-이야기로-엮기)을 함께 제공합니다. 기존 `bento`도 같은 양식에서 계속 사용할 수 있습니다.

## 발표와 공유

- 방향키로 이동하고, 화면의 버튼으로 전체 슬라이드 목록과 단축키 안내를 엽니다.
- `O`는 전체 보기, `F`는 전체 화면, `P`는 발표자 창, `?`는 사용법입니다. `Home`과 `End`로 첫 장과 마지막 장으로 이동할 수 있습니다.
- 발표자 창은 발표 화면과 분리해 사용합니다. 화면 공유나 프로젝터에는 청중용 창을 선택하세요. 팝업이 차단되면 해당 사이트의 팝업을 허용한 뒤 다시 엽니다.
- PDF는 인쇄 기능에서 PDF 저장을 선택합니다. 가로 방향, 여백 없음, 배경 그래픽 켜기, 브라우저 머리글·바닥글 끄기를 권장합니다. PDF에는 모션과 실시간 데모가 담기지 않습니다.
- 같은 저장소의 GitHub Pages로 외부 링크를 공유합니다. 원고·생성 결과·사진을 commit/push하고 해당 커밋의 Pages 배포 성공과 실제 링크를 확인하세요. 발표자 노트도 원본에서 읽을 수 있으므로 공개할 내용으로 관리합니다.

실제 갱신 절차는 [DEPLOYMENT.md](DEPLOYMENT.md)를 따릅니다. 화면의 **내용 편집**은 내 브라우저에 저장하며, **내용 내보내기**는 `content.js`를 내려받습니다. 공개 사이트를 즉시 수정하지 않습니다. Markdown 원고는 화면 편집과 자동 동기화되지 않으므로 원문에도 반영한 뒤 다시 생성하세요. 현재 전체 저장소를 공개해 같은 저장소에서 발행하는 방식이며, 이전 [외부 공유 검토](research/external-sharing-20261023/repo-visibility.md)는 결정 과정의 기록입니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | 브라우저에서 여는 시작 파일 |
| `content.js` | 재사용할 발표 내용과 노트 |
| `app.js` | 렌더링·탐색·편집·발표자 창·작성자 점검 |
| `deck-model.js` | 입력 검증과 콜라주 배치 |
| `CONFIG.md` | 파라미터 계약·수량·오류 복구 |
| `examples/` | 다섯 가지 Markdown 발표·35장 생성 결과·갤러리·기존 params 예제 |
| `scripts/` | 패키지 설치 없는 Markdown 변환·예제 일괄 생성 |
| `MARKDOWN.md` | 지원 Markdown 문법과 변환 규칙 |
| `DEPLOYMENT.md` | 공개 발표 주소·작성부터 같은 링크 갱신까지의 사용 절차 |
| `tests/` | Node 기본 실행기로 검사하는 입력·배치 회귀 검증 |
| `styles.css` | 레이아웃·테마·인쇄 스타일 |
| `DESIGN.md` | 디자인 원칙과 레이아웃 사용법 |
| `assets/` | 로컬 이미지와 데모 자료 |
| `research/` | 실제 발표 영상의 시간대별 관찰과 적용 기준 |

## 참고와 범위

사진과 컬러는 별도로 추가 조사했습니다. [사진·컬러 비교 보드](research/color.html)에서 인물 이미지 모음, 조건별 사진 스트립, 작품 콜라주, 의미색, 유색 타이포, 발표자 소개 색면을 실제 프레임으로 비교할 수 있습니다. [DevDay 추가 조사](research/devday-color-photo-analysis.md)와 [외부 추가 조사](research/external-color-photo-analysis.md)는 전후 장면과 관찰 범위를 기록합니다. 중립 바탕을 원본 사진의 흑백 처리나 데이터·상태 이외의 색 금지로 해석하지 않습니다. 현재 예제는 풀컬러 스톡 사진 7장과 자체 제작 SVG를 사용하며, 다중 사진·결과물 모음·의미색 아이콘·혼합 타일 양식을 구현했습니다. [운영 기준과 구현 상태](research/color-design-criteria.md), [사진 크레딧](assets/CREDITS.md)을 함께 확인할 수 있습니다.

[OpenAI DevDay 2026 키노트](https://www.youtube.com/watch?v=Fls_onRviPM)와 [Codex Has Left The Laptop 세션](https://www.youtube.com/watch?v=XkKdbPhIvbY)의 실제 영상 구간을 재생하고 대표 프레임을 직접 확인했습니다. [Apple WWDC25](https://developer.apple.com/videos/play/wwdc2025/356/), [Figma Config 2025](https://www.youtube.com/watch?v=5q8YAUTYAyk), [Vercel Ship 2025](https://www.youtube.com/watch?v=lNmO7fDiyuE)도 비교했습니다. 사이트의 색상 대신 메시지·도표·시연의 배치와 정보량 차이를 참고한 독자 템플릿입니다.

전편 시청이나 원본 제작 도구의 확인을 뜻하지 않습니다. 시청 범위, 타임스탬프, 프레임, 관찰과 제안의 구분은 [세션 조사](research/devday-session-analysis.md)와 [외부 사례 조사](research/external-presentation-analysis.md)에 있습니다. 원본 로고·전용 글꼴·발표 이미지를 슬라이드의 배경으로 재사용하지 않았습니다.

발표 재생은 설치 없이 유지하며, Markdown을 수정했을 때만 Node.js로 다시 생성합니다. 코드 하이라이트·수식·복잡한 Markdown 확장과 플러그인이 필요하면 [Slidev](https://sli.dev/)나 [reveal.js](https://revealjs.com/)도 별도로 검토할 수 있습니다.

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
