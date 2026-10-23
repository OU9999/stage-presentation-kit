# Markdown으로 발표 만들기

Markdown은 원고이고, `content.js`는 브라우저가 읽는 변환 결과입니다. 문장·사진·설정을 원고에 적고 빌드하면 지금의 19개 슬라이드 양식으로 표시됩니다. AI 연결 없이 실행되며, AI에게 원고 초안을 부탁한 뒤 같은 문법으로 검토하고 빌드해도 됩니다.

**Node.js 18 이상**이 필요합니다. npm 설치나 추가 의존성은 없습니다. 생성한 발표를 보는 데에는 Node.js가 필요하지 않습니다.

```sh
# 준비된 예제 다섯 개를 모두 다시 생성
node scripts/build-examples.cjs

# 원하는 원고 하나를 원하는 폴더에 생성
node scripts/markdown-deck.cjs examples/product-launch/slides.md examples/product-launch
```

생성한 폴더의 `index.html`을 열면 됩니다. 원고는 [제품 소개](examples/product-launch/slides.md), [엔지니어링 회고](examples/engineering-review/slides.md), [사진 이야기](examples/photo-story/slides.md), [워크숍](examples/workshop/slides.md), [DevDay 구성 연구](examples/devday-compositions/slides.md)입니다. 완성 화면은 [예제 모음](examples/index.html)에서 비교할 수 있습니다.

## 가장 작은 원고

```md
---
id: my-presentation
title: 다음 프로젝트
theme: stage
speaker: 발표자 이름
date: "2027. 01. 15."
footer: PROJECT NOTES
---

<!-- stage
layout: cover
align: center
notes: "첫 문장은 천천히 읽습니다.\n다음 장에서 구체적으로 설명합니다."
-->
# 다음 프로젝트를,
# 함께 시작합니다.

우리에게 필요한 변화를 소개합니다.

---

# 먼저, 하나의 생각.

설명할 한 문장을 이곳에 적습니다.
```

문서 맨 위의 `---` 한 쌍은 발표 정보입니다. `id`, `title`, `theme`, `speaker`, `date`, `footer`만 쓸 수 있습니다. 그 뒤에 단독 `---`를 놓으면 다음 장이 시작됩니다. 마지막 장 뒤에는 구분선을 추가하지 않습니다.

장별 `<!-- stage` 블록은 생략할 수 있습니다. `layout`을 생략하면 `statement`입니다. 이 블록은 JSON 주석이 아니라 **한 줄에 `key: value` 하나**를 쓰는 형식입니다. 문자열은 그대로 쓰거나 JSON 큰따옴표로 감싸세요. `true`, `false`, `null`, 숫자는 해당 값으로 해석되므로 숫자 모양의 날짜·단위를 문자열로 쓰려면 큰따옴표를 붙입니다. 중첩 객체·배열·작은따옴표 문자열·YAML 문법은 지원하지 않습니다.

발표자와 날짜는 문서 상단에서 지정합니다. 표지 한 장의 JSON에 `speaker`, `date`를 넣는 방식은 지원하지 않습니다.

## 문장이 들어가는 위치

현재 화면에 실제로 표시되는 필드로 변환합니다. 지원하지 않는 위치의 본문을 조용히 버리지 않습니다.

| layout | `# 제목` | 일반 문단 |
| --- | --- | --- |
| cover | title | subtitle |
| statement | title | subtitle |
| section | title | subtitle |
| closing | title | takeaway |
| compare | title | 지원하지 않음. left/right JSON 사용 |
| metric | label | support |
| chart | title | subtitle |
| image | title | caption |
| media | 지원하지 않음. 화면 전체를 미디어로 사용 | caption |
| demo | title | caption |
| quote | quote | attribution |
| steps | title | 지원하지 않음. steps JSON 사용 |
| gallery, mosaic, results, categories | title | subtitle |
| bento, icon-wall | title | subtitle |
| metric-pair | title | support |

제목은 본문 앞에 작성합니다. `#` 행을 여러 개 연속해서 쓰면 의도한 줄바꿈이 됩니다. 기본 `title`은 문자열 배열로, `metric.label`과 `quote.quote`는 줄바꿈을 포함한 문자열로 변환합니다. `##` 이하의 제목은 지원하지 않습니다.

같은 문단의 여러 행은 공백으로 연결하고, 빈 줄로 나눈 문단은 줄바꿈으로 연결합니다. 굵게·링크·HTML 같은 인라인 문법을 해석하는 일반 Markdown 렌더러는 아닙니다. 인라인 기호와 HTML은 글자 그대로 표시됩니다. 표, `>` 인용 블록, 다른 코드 fence, 번호 목록은 명시적으로 오류를 알립니다. 설명 메모는 `notes`에 적으세요.

## 이미지와 데모 목록

한 줄에 이미지 하나를 적습니다. `image`, `media`, `demo`에는 한 장을, `gallery`, `mosaic`, `results`에는 여러 장을 넣을 수 있습니다.

````md
<!-- stage
layout: demo
notes: 결과를 먼저 보여준 뒤 과정을 설명합니다.
-->
# 직접 보면, 더 분명합니다.

실제 시연을 대신하는 예시 화면입니다.

![작업 공간 화면](../../assets/workspace-demo.svg)

- 시작 상태 확인
- 한 가지 행동 시연
- 결과와 의미 설명
````

`-` 목록의 자동 변환은 `demo.steps`에만 적용됩니다. 다른 양식의 목록은 아래 JSON 설정을 사용합니다. 이미지의 선택적 제목 구문은 지원하지 않으므로 `![설명](경로 "제목")` 대신 일반 문단이나 JSON의 `caption`을 사용하세요.

Markdown 이미지는 `src`와 `alt`를 만듭니다. 미디어 틀의 `fit`, `focalPoint`, `zoom`은 장별 설정 또는 JSON에 별도로 지정할 수 있습니다. 여러 이미지의 개별 라벨·캡션·크롭·span이 필요하면 JSON `items`를 사용하세요. Markdown으로 작성한 mosaic 이미지의 기본 `span`은 1입니다.

## 차트와 구조화된 설정

기본 문법으로 표현하기 어려운 내용은 장 안의 `stage` JSON fence에 적습니다. JSON 객체의 필드가 해당 슬라이드에 합쳐집니다.

````md
<!-- stage
layout: chart
quiet: true
-->
# 설명보다,
# 하나의 근거.

같은 기준으로 비교합니다.

```stage
{
  "chart": {
    "title": "비교 데이터 · 가상 예시",
    "unit": "점",
    "max": 100,
    "rows": [
      { "label": "옵션 A", "value": 32 },
      { "label": "옵션 B", "value": 84, "highlight": true }
    ]
  },
  "source": "양식 설명용 가상 수치 · 실제 데이터로 교체"
}
```
````

JSON에는 `chart`, `left/right`, `items`, `steps`, `value/unit`처럼 현재 렌더러가 지원하는 필드만 넣습니다. 각 필드와 수량은 [입력 계약](CONFIG.md)을 따릅니다. `steps`는 `title/description` 객체 1~3개이며, `demo.steps`는 문자열 배열 0~3개입니다. 이미지 항목은 다음처럼 지정합니다.

`bento`, `icon-wall`, `metric-pair`의 `items`도 같은 JSON fence에 적습니다. `bento`의 `preset`은 `recap` 또는 `seoul`이며 정확히 12타일입니다. 각 항목의 `type`을 `media`, `metric`, `text`로 구분합니다. `icon-wall`은 `icon` 의미 키 또는 `src` 이미지 중 하나를 가진 1~22개 항목, `metric-pair`는 `value`와 `label`을 가진 정확히 2개 항목입니다. 이 세 양식에서는 일반 Markdown 이미지 목록으로 배치를 추정하지 않습니다. `categories.items[].icon`에도 같은 의미 아이콘 키를 쓸 수 있습니다.

````md
<!-- stage
layout: gallery
variant: portraits
quiet: true
-->
# 함께 만드는 장면.

```stage
{
  "items": [
    {
      "src": "../../assets/photos/listen.jpg",
      "alt": "헤드폰을 쓰고 작업하는 사람",
      "label": "몰입하는 시간",
      "caption": "직접 관찰한 내용으로 교체",
      "fit": "cover",
      "focalPoint": "50% 25%"
    }
  ],
  "source": "사진 출처를 적으세요."
}
```
````

한 필드는 한 곳에서만 지정합니다. metadata와 JSON의 같은 키, Markdown 제목과 JSON `title`, 문단과 JSON `subtitle/caption`, Markdown 이미지와 JSON `items`가 겹치면 **값이 같아도 오류**입니다. 이미지를 Markdown으로 적은 장에 `src`, `video`, `alt`를 중복 지정할 수도 없습니다. 합칠 순서에 따라 내용을 덮어쓰는 방식은 제공하지 않습니다.

## 경로와 생성 파일

미디어 경로는 **Markdown 원고가 있는 폴더**를 기준으로 적습니다. `src`, `video`, `poster`와 `items` 안의 같은 필드에 모두 적용됩니다. 다른 폴더에 빌드해도 같은 원본 파일을 가리키도록 상대 경로를 다시 계산합니다. 미디어를 출력 폴더로 복사하지 않습니다.

```sh
node scripts/markdown-deck.cjs examples/photo-story/slides.md /tmp/my-photo-presentation
```

이 명령은 출력 폴더의 `index.html`, `content.js`만 만듭니다. HTML은 공유 `styles.css`, `deck-model.js`, `app.js`를 상대 경로로 참조하므로 배포·이동할 때에는 공유 런타임과 미디어도 함께 있어야 합니다. 기본 예제는 저장소 폴더 구조 그대로 복사하면 됩니다. 임의의 출력 폴더를 웹 서버로 열 때에는 이 상대 경로들이 같은 서버에서 접근 가능한지도 확인하세요.

로컬 미디어 파일이 없으면 빌드가 실패합니다. HTTP(S), `file:` URL과 이미지·영상 `data:` URI도 입력할 수 있지만, 다섯 예제는 모두 로컬 자산만 사용합니다. `mailto:`·`javascript:` 같은 미디어에 맞지 않는 URI는 오류입니다. 사진 출처 파일은 빌드가 변경하지 않습니다.

공유 자산과 생성 데이터에는 실제 내용의 해시를 query로 붙여 다시 빌드한 결과가 이전 캐시에 가려지지 않도록 합니다. 빌드 때 시각을 삽입하지 않아 같은 입력과 런타임에서는 같은 파일이 생성됩니다.

## 확인과 수정

구문·필드 충돌·입력 모델 오류·누락된 로컬 미디어를 **출력 쓰기 전에 검사**합니다. 경고는 빌드 명령에 출력하며, 변환 결과를 임의로 잘라내지 않습니다. 정상 형식이어도 문장이 길면 발표 화면의 작성자 점검에서 실제 넘침을 확인해야 합니다.

원고를 바꾼 뒤에는 다시 빌드하세요. 브라우저에서 직접 편집한 내용은 `content.js`로 내보낼 수 있지만, 그 파일이 Markdown 원고에 역으로 반영되지는 않습니다. 중요한 수정은 원고에도 옮겨 적어야 다음 빌드에 남습니다.

Node에서 함수를 사용하려면 다음 인터페이스를 사용할 수 있습니다.

```js
const { parseMarkdown, buildDeck } = require("./scripts/markdown-deck.cjs");
const deck = parseMarkdown(markdownText, { sourcePath, outputDir, repoRoot });
const { deck: built, issues, files } = buildDeck(inputPath, outputDir, { repoRoot });
// files.content와 files.index는 생성 파일의 절대 경로입니다.
```

`parseMarkdown`은 원고를 데이터로 바꾸며 파일을 쓰거나 미디어의 실재 여부를 검사하지 않습니다. `sourcePath`와 `outputDir`을 함께 주면 미디어 경로를 재계산합니다. `buildDeck`은 모델과 실제 파일까지 검사한 뒤 두 출력 파일을 만듭니다. 잘못된 입력은 `Error`로 보고합니다.
