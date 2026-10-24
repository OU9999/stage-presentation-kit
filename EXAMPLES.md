# 실제 연구를 반영한 예제

## 여섯 가지 발표와 두 작성 흐름

[예제 모음 화면](examples/index.html)에서 실제 슬라이드의 미리보기와 발표·원문·PDF를 함께 볼 수 있습니다. [여섯 가지 결과 이미지](examples/previews/collection.png)도 제공합니다. 기존 다섯 발표는 Markdown을, 데이터 발표는 data.json을 수정한 뒤 `node scripts/build-examples.cjs`로 다시 만들 수 있습니다. 자세한 입력 방식은 [MARKDOWN.md](MARKDOWN.md)에 있습니다.

| 예제 | 구성과 색의 역할 | 원문 | 결과 |
| --- | --- | --- | --- |
| 숫자·그래프·도식 | 가상 12주 제품 개선, KPI·퍼널·추세·구성비·흐름·우선순위·일정·히트맵 | [data.json](examples/visual-story/data.json) · [가이드](examples/visual-story/README.md) | [발표](examples/visual-story/index.html) · [계산표](examples/visual-story/data.html) · [PDF](output/pdf/visual-story.pdf) |
| 현장 구성 연구 | SF의 사진·의미색 범주, 서울의 아이콘월·두 수치, 서울·도쿄 혼합 타일 | [slides.md](examples/devday-compositions/slides.md) | [발표](examples/devday-compositions/index.html) · [PDF](output/pdf/devday-compositions.pdf) |
| 제품 소개 | Stage 바탕, 주황 한 문장, 주요 수치, 문서·UI 결과와 시연 | [slides.md](examples/product-launch/slides.md) | [발표](examples/product-launch/index.html) · [PDF](output/pdf/product-launch.pdf) |
| 기술 개선 보고 | Stage 검정 바탕, 전후 비교, 단일 도표, 파랑 한 문장, 다음 행동 | [slides.md](examples/engineering-review/slides.md) | [발표](examples/engineering-review/index.html) · [PDF](output/pdf/engineering-review.pdf) |
| 사진 중심 이야기 | Stage 검정 바탕, 제목 없는 6열 풀컬러 사진·큰 사진·콜라주, 중립 문장 | [slides.md](examples/photo-story/slides.md) | [발표](examples/photo-story/index.html) · [PDF](output/pdf/photo-story.pdf) |
| 워크숍 | Stage 검정 바탕, 보라색 문장 전환, 자체 SVG 범주의 의미색, 실습 세 단계 | [slides.md](examples/workshop/slides.md) | [발표](examples/workshop/index.html) · [PDF](output/pdf/workshop.pdf) |

이 예제들은 실제 회사·제품·연구 결과에 대한 주장이 아닙니다. 수치·발언은 가상으로 만들었고 사진은 기존 크레딧의 스톡 자료를 재사용했습니다. 생성된 HTML은 공통 `app.js`·`styles.css`·`deck-model.js`와 `assets/`를 참조하므로 공유할 때는 저장소 폴더 전체를 함께 옮깁니다. Markdown 작성·변환·발표에 AI 서비스는 필요하지 않습니다.

기존 다섯 발표는 각 7장, 데이터 발표는 12장·총 47장이며, 공통 렌더러는 19개 양식을 지원합니다. 기본 무대는 모두 Stage 검정 바탕입니다. DevDay 세션에서 참고한 큰 타이포와 여백을 공통으로 유지하고, 레이아웃·사진 구성·강조색으로 주제에 맞는 변화를 만듭니다. 사진·작품·문서·UI 자체의 원래 색과 밝기는 유지합니다.

데이터 예제의 수정 원본은 `data.json` 하나이며, 숫자 포함 `slides.md`·SVG 여덟 개·`data.html`·발표 파일을 함께 재생성합니다. 생성 Markdown을 손편집 원본으로 오인하지 마세요. 작은 그림의 세부 수치·분모·관계는 같은 입력에서 만든 실제 HTML 표로 읽습니다.

**이전 네 예제의 검증 이력:** 2026-10-23 Chromium에서 28장을 실제로 탐색해 입력 오류·분량 경고·미디어 로딩 실패가 없음을 확인했습니다. 390px 읽기 모드와 네 발표의 `file://` 실행, 각 7페이지 PDF도 확인했습니다. Markdown 문장을 수정한 뒤 재생성하고 브라우저를 새로고침해 새 데이터 주소와 실제 문장 변경을 검증했습니다. `node --test tests/*.test.cjs`는 기존 43개와 Markdown 19개, 총 62개를 통과했습니다. PDF와 미리보기 이미지는 이후 원문 수정 시 별도로 다시 저장합니다. 이 기록은 이번 현장 구성 추가분의 브라우저 검증을 뜻하지 않습니다.

## 현장 구성 연구 7장

[발표 열기](examples/devday-compositions/index.html) · [원본과 적용 결과 비교](research/visual-implementation.html) · [구현 diff](research/visual-implementation-diff-20261023.md)

| 장 | 재사용하는 구성 | 직접 근거와 적용 범위 |
| --- | --- | --- |
| 1·7 | 검정 바탕의 표지·마무리 | 큰 문장과 여백을 사용하는 독자 예제 |
| 2 | 짧은 상단 설명과 같은 높이의 풀컬러 사진 6개 | SF 키노트 48:30. 큰 제목·하단 캡션을 생략. 원본과 동일한 촬영 시리즈는 아님 |
| 3 | 중앙 제목·5개 원형 SVG·색이 대응하는 이름 | SF 키노트 23:00. 자체 아이콘 사용, 흰 범주 포함 |
| 4 | 관찰·주제·다음 행동을 엮는 12개 혼합 타일 | 서울·도쿄 현장 사진 재검토 후 선택한 C안. `bento`, `preset: seoul`, `variant: editorial`. 오른쪽 표지와 행동 UI가 앵커이며 모든 문장을 바꿀 수 있음 |
| 5 | 중앙 메시지를 비워 둔 외곽 아이콘월 | 서울 현장 사진. `icon-wall`, 22개 자체 의미 아이콘. 원본 서비스 로고의 복제는 아님 |
| 6 | 파랑·주황의 같은 위계 두 수치 | 서울 현장 사진. `metric-pair`, 가상 수치·단위·라벨 |

도시별 원본과 확인 한계는 [서울 조사](research/seoul-devday-visual-research-20261023.md), [도쿄·벵갈루루 조사](research/completed-cities-visual-research-20261023.md)에 있습니다. 도쿄의 관계도·카드 패턴과 벵갈루루의 3열 수치는 이번 예제에 추가하지 않았습니다. 행사의 전체 공식 슬라이드나 전환 규칙을 확인했다는 의미는 아닙니다.

이 구성을 다른 내용으로 쓰려면 [한 장짜리 릴리스 회고 스타터](examples/editorial-starter.js)를 루트 `content.js`로 복사합니다. 빌드 없이 사용할 수 있으며, 문장·수치·사진만 바꾸면 됩니다. Markdown은 위 원고의 4장을 복사하고 다시 생성하세요. [슬롯 순서](MARKDOWN.md#편집형-혼합-타일-c안)와 [필수 필드](CONFIG.md#c안처럼-한-이야기로-엮기)를 함께 제공합니다.

**C안 제품화 검증:** 자동 테스트163개 통과. C안의 실제 렌더·세 테마·390px 읽기·편집/저장/복원/다운로드·발표자 창·오프라인 실행을 확인했습니다. 총괄은 다른 주제의 스타터를 별도 폴더에서 빌드 없이 열고 문장을 수정한 뒤 실제 다운로드 값까지 독립 확인했습니다. [개발팀 검증](research/implementation-c-20261023.md), [미리보기·PDF를 포함한 총괄 통합 검증](research/implementation-c-integration-20261023.md).

**이전 혼합 타일 추가 검증:** 자동 테스트111개 통과. 5개 발표35장과 루트20장, 총55장 실제 탐색에서 경고·미디어 실패·브라우저 오류0. 390px 읽기·오프라인·새 양식의 편집/복원/실제 다운로드·발표자 창과 PDF55페이지 렌더를 확인했습니다. [검증 기록과 한계](research/implementation-verification-20261023.md). 이 기록은 이후 C안 제품화의 검증을 대신하지 않습니다.

## 기존 20장 양식 모음

20장 예제는 특정 주제의 실적 발표가 아닌, 골라서 복사할 수 있는 양식 모음입니다. 관찰한 발표의 사진·로고·캐릭터를 복사하지 않고 로컬 스톡 사진과 직접 만든 SVG로 구성했습니다. [사진 크레딧](assets/CREDITS.md).

| 예제 | 관찰한 구성과 적용 | 바꿔 쓸 필드 |
| --- | --- | --- |
| [03 사진 모음](index.html#3) | DevDay 48:30의 동일 세로 프레임·상단 설명. 풀컬러 장면 6개를 같은 무게로 제시 | `gallery`, `variant: portraits`, `items[].src/alt/label/caption/focalPoint` |
| [04 큰 사진](index.html#4) | Apple 사진판처럼 사진의 색과 질감을 화면 전체에 표시 | `media`, `src`, `fit`, `focalPoint`, `caption` |
| [05 조건 비교](index.html#5) | Apple의 사진별 조건 라벨에서 착안. 같은 사진의 디지털 표시 크롭으로 비교 축을 명시 | `gallery`, `variant: strip`, `tone: yellow`, `items[].zoom/label` |
| [06 유색 선언](index.html#6) | Codex 20:00처럼 문장의 아래 의미 단위 전체를 주황으로 강조 | `statement`, `tone`, `highlight` |
| [07 범주](index.html#7) | DevDay 23:00처럼 아이콘과 이름을 같은 색으로 연결 | `categories`, `items[].icon/label/description/tone` |
| [08 이름 소개](index.html#8) | DevDay 24:15처럼 큰 보라 이름. 다음은 중립적인 근거 화면 | `section`, `tone: purple`, `highlight` |
| [10 여러 결과물](index.html#10) | DevDay 25:00처럼 왼쪽 주장과 오른쪽 문서·UI 등 2×2 배열 | `results`, `items` 4개, 매체별 `fit` |
| [11 작품 콜라주](index.html#11) | Figma 제품 데모를 참고한 독자 작품 모음. 2+1+1 / 1+1+2. 현장 bento와 별도 양식 | `mosaic`, `items[].span/fit` |
| [12 이름 소개](index.html#12) → [13 중립 복귀](index.html#13) | 검정 위 보라색 이름으로 소개 역할을 분리. DevDay 24:15의 역할을 참고 | `tone: purple`, `highlight`, 다음 슬라이드는 기본 표면 |
| [15 주요 수치](index.html#15) | Apple의 큰 녹색 변화량처럼 수치 하나에 색을 집중 | `metric`, `tone: green`, `value/unit/label/source` |

20장 전체에 같은 강조색을 반복하지 않습니다. 사진·작품은 원래의 색을, 범주는 대응 관계를, 선언은 한 의미 단위를, 이름 소개는 흐름의 변화를 맡습니다. 이 구성은 관찰에서 도출한 독자 템플릿이며 원본 회사의 공식 규칙이 아닙니다.

사진의 표시 범위와 작품의 내용 보존은 별도로 판단합니다. 인물 사진은 초점 위치를 조절할 수 있지만, 문서·대시보드·타이포 작품은 `contain`으로 전체 내용을 보존하는 편이 적합합니다. 넓은 콜라주 칸의 포스터는 원본의 글자를 자르는 대신 그 비율에 맞춘 독자 SVG 변형을 사용했습니다.

05장의 zoom은 같은 표시 프레임의 디지털 확대입니다. 원본 촬영의 렌즈 배율이나 실제 성능 수치로 소개하지 않습니다. 인물 사진은 양식용 스톡 이미지이며 예시 발표자 이름과 연결되지 않습니다. 수치와 SVG 문서·UI는 예시 데이터입니다.

색·경로·배치 옵션은 `content.js`에서, 화면에 표시되는 문장·라벨·설명은 편집 모드에서 바꿀 수 있습니다. 발표자 노트에는 각 장의 재사용 방법이 있습니다.

원본 영상·시점·확인 범위는 [DevDay 추가 조사](research/devday-color-photo-analysis.md), [외부 추가 조사](research/external-color-photo-analysis.md), [컬러 비교 보드](research/color.html)를 참조하세요.
