# Params로 새 발표 만들기

Markdown 원고로 관리하려면 [작성법](MARKDOWN.md)과 [네 가지 발표 예제](examples/index.html)를 사용하세요. 변환 결과는 아래와 같은 입력 계약을 따릅니다.

`content.js`의 `window.PRESENTATION`이 발표의 입력 계약입니다. 발표 폴더 전체를 복사한 뒤 이 객체와 로컬 미디어를 바꾸면 됩니다. HTML·렌더러·CSS를 주제마다 수정할 필요는 없습니다. 다른 주제의 짧은 시작점은 [project-review.js](examples/project-review.js)입니다. 이 파일의 내용으로 복사한 폴더의 루트 `content.js`를 교체하세요.

```js
window.PRESENTATION = {
  id: "my-project-review",
  title: "프로젝트 회고",
  theme: "stage",
  speaker: "발표자",
  date: "2027. 01. 15.",
  footer: "PROJECT REVIEW",
  slides: [
    { id: "opening", layout: "cover", align: "center", title: ["프로젝트,", "다음을 위한 회고."] },
    { id: "message", layout: "statement", align: "center", title: "기억할 한 문장.", notes: "말로 덧붙일 내용" }
  ]
};
```

## 공통 필드

| 필드 | 입력과 기본 동작 |
| --- | --- |
| `id` | 발표별 고유 문자열. 브라우저 저장을 구분하는 데 사용 |
| `title`, `speaker`, `date`, `footer` | 발표 정보 문자열. 실제 날짜는 입력한 값 사용 |
| `theme` | `stage` / `paper` / `midnight`. 생략하면 `stage` |
| `slides` | 한 장 이상의 슬라이드 객체 배열 |
| `slides[].layout` | 아래 16개 양식 중 하나. 이름 오타도 해당 장의 오류로 안내 |
| `title` | 문자열 또는 문자열 배열. 배열은 의도한 줄바꿈이며 긴 줄은 화면 폭에서 다시 줄바꿈될 수 있음 |
| `subtitle`, `source`, `notes` | 문자열. 출처와 발표자 노트는 따로 관리 |
| `align` | `center` 또는 생략. 기본 왼쪽 정렬, 중앙 메시지 변형은 cover/statement/section/closing 지원 |
| `quiet` | `true` / `false`. 반복 라벨·하단 정보 숨김 |
| `tone` | `orange` / `purple` / `blue` / `green` / `yellow`. 의미 있는 색 강조용 |
| `highlight` | 제목 안에서 강조할 문자열. 한 줄 전체를 강조하면 화면에서 그 줄을 수정할 때도 색이 따라감 |
| `surface` | `butter` 또는 생략. 소개 화면 한 장의 담황색 표면 |

현재 입력 계약은 JSON으로 보관 가능한 값입니다. 함수·순환 참조를 넣지 않습니다. 임의의 브랜드 HEX·글꼴·새 표면을 추가하려면 공통 `styles.css`를 수정합니다.

## 양식과 수량

수량을 초과하면 항목을 몰래 삭제하지 않고 해당 장에 오류를 안내합니다. 글자 수만으로 맞춤을 보장할 수는 없으므로 실제 화면의 분량 점검도 함께 사용합니다.

| `layout` | 주로 바꾸는 필드 | 수량·배치 계약 |
| --- | --- | --- |
| `cover` | title, subtitle | 제목은 짧게. speaker/date는 발표 공통 정보 |
| `statement` | title, support, subtitle | 한 주장. 긴 본문은 나눠 사용 |
| `section` | number, title, subtitle | number는 문자열 또는 숫자 |
| `closing` | title, takeaway, action, url | 마지막 메시지와 다음 행동 |
| `compare` | left/right의 label, points | 좌우 객체, 각 points는 문자열 배열 0~3개 |
| `metric` | value, unit, label, support, source | value는 유한한 숫자 또는 표시용 문자열. 주 수치 하나 |
| `chart` | chart.title/unit/max/rows, source | rows 1~6개. 각 행은 label/value/highlight. value는 0 이상 숫자 또는 내보낸 숫자 문자열 |
| `image` | title, src, alt, fit, caption | 이미지 한 장 |
| `media` | src 또는 video, poster, caption | 전체 화면 미디어 한 개 |
| `demo` | title, src 또는 video, steps, url | 미디어 한 개, steps는 문자열 배열 0~3개 |
| `quote` | quote, attribution, support | 짧은 인용문과 출처 |
| `steps` | title, steps | title/description 객체 1~3개 |
| `gallery` | variant, items | 이미지 1~6개. `portraits` / `strip` |
| `mosaic` | items | 1~8개, 각 span은 숫자 1 또는 2. 총 span 8 이하, 4열×2행에 배치 |
| `results` | title, subtitle, items, source | 미디어 1~4개, 좌측 주장과 우측 2×2 틀 |
| `categories` | title, items | 1~5개. label/description/symbol/tone |

`mosaic`은 작품 모음용입니다. 빈 칸을 채우기 위해 뒤 항목이 데스크톱 화면의 앞 빈 칸에 놓일 수 있습니다. 원본 데이터와 DOM의 순서는 바꾸지 않으며 모바일 읽기에서는 입력 순서로 한 열을 만듭니다. 시간·단계·비교 순서가 중요하면 `gallery`나 `steps`를 사용하세요. 기존 예제의 `[2,1,1,1,1,2]` 배치도 그대로 사용할 수 있습니다.

## 이미지 항목

```js
{
  layout: "gallery", variant: "portraits", quiet: true,
  title: "함께 만드는 사람들",
  items: [
    { src: "assets/people.jpg", alt: "작업 중인 사람", label: "한 장면", caption: "짧은 설명", fit: "cover", focalPoint: "50% 25%" }
  ]
}
```

- `src`, `video`, `poster`는 **열린 HTML 문서의 위치**를 기준으로 합니다. 루트 index.html에서 `assets/people.jpg`는 루트 assets 폴더입니다.
- 사진에는 `cover`와 `focalPoint`로 초점을 정할 수 있습니다. 문서·UI·타이포 작품은 `contain`으로 핵심 내용의 잘림을 피합니다.
- `zoom`은 1~3 사이의 숫자로 표시 프레임을 디지털 확대합니다. 광학 배율을 뜻하지 않습니다.
- 범주의 tone은 `blue`, `green`, `orange`, `purple` 중 하나입니다. 이미지 자체의 색은 바꾸지 않습니다.

## 점검과 복구

잘못된 layout·배열 타입·항목 수는 해당 슬라이드의 오류로 안내하고 나머지 장은 계속 사용할 수 있게 합니다. 원본 항목은 내보내기에 보존하므로 오류 경로를 보고 `content.js`에서 수정할 수 있습니다. 문법 오류로 content.js 자체를 실행할 수 없는 경우에는 원본 파일의 JavaScript 문법부터 고쳐야 합니다.

형식은 맞지만 문장이 길거나 미디어 프레임이 사라지는 경우에는 활성 장의 실제 크기로 점검합니다. 문제가 있으면 작성자 점검에서 장 번호·문제 위치와 조정 방법을 확인하세요. 읽기 모드는 긴 문장의 전체 내용을 확인할 때 사용할 수 있습니다. 경고는 작성자 조작 UI이며 PDF의 슬라이드 본문에 넣지 않습니다. 글자를 자동으로 과도하게 줄이거나 초과 항목을 조용히 버리지 않습니다.

브라우저 편집은 문자 수정용입니다. 항목 수·이미지 경로·배치·색 옵션은 원본 데이터에서 바꿉니다. 저장은 발표 id와 HTML 경로로 구분하며, 원본 객체가 바뀌면 이전 브라우저 편집본을 자동 복원하지 않습니다. 중요한 편집은 먼저 content.js로 내보내 보관하세요.

## 개발 검증

런타임은 여전히 설치·빌드·외부 라이브러리 없이 작동합니다. Node.js가 있으면 순수 입력·배치 계약의 회귀 검증을 실행할 수 있습니다.

```sh
node --test tests/*.test.cjs
```

이 명령의 통과는 브라우저의 글꼴·크롭·PDF·실제 넘침 검증을 대신하지 않습니다. 콘텐츠를 바꾼 뒤에는 실제 발표 기기에서도 리허설하세요.
