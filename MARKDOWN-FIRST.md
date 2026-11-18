# Markdown 한 원고로 발표하고 공유하기

`talks/주제/slides.md`를 고치면 기존 STAGE 스타일의 발표와 읽기 화면을 만듭니다. 새 주제는 `npm run new -- my-topic --title "발표 제목"`으로 추가합니다. 매번 JSON·HTML·CSS를 수정하지 않습니다.

원고를 쓰거나 바꾸기 전에 [DESIGN.md](DESIGN.md)를 읽고 변경 범위와 보존할 자료를 정합니다. 최신 사용자 지시를 우선하며, 이 안내는 입력 문법을 맡습니다. 작업 후에는 [현재 판 검수](DESIGN.md#변경과-현재-판-검수)에 따라 실제 화면·판정 이유를 남기고 [검수 기록 안내](DESIGN-REVIEW.md)로 입력과 근거의 최신성을 확인합니다. 생성 성공은 시각 승인과 구별합니다.

착수할 때 [역할에서 시안으로 연결하기](DESIGN.md#역할에서-시안으로-연결하기)의 짧은 brief로 주역·정확한 구절/관계·보존 자료·참고할 원리·지원 경로·다음 시각 검토자를 정합니다. 아래 [작은 레시피](#역할을-유지하는-작은-레시피)는 사진이나 외부 예제 없이도 시작할 수 있습니다.

## 시작하기

Node.js 20 이상에서 저장소 루트에서 실행합니다.

```sh
npm ci
npm run dev
```

터미널에 표시되는 `http://127.0.0.1:4320`을 엽니다. 원고·참조 자산·설정·공통 runtime이 바뀌면 다시 만들고 화면을 갱신합니다. 빌드 오류가 나면 원본 위치와 오류를 표시하고 마지막 성공 화면을 유지합니다. 다른 포트는 `npm run dev -- --port 4321`로 정합니다.

공유할 정적 파일만 만들려면 다음을 실행합니다.

```sh
npm run build
```

`presentations/` 전체를 HTTP 정적 호스팅에 올립니다. 이 폴더 안에 발표 모음, 덱별 발표·읽기·데이터·참조 자산과 공통 runtime이 있습니다. 보는 사람은 Node를 설치하지 않아도 됩니다. 개별 덱 폴더만 떼어 보내면 공통 runtime이 빠지므로 모음 폴더 전체를 전달하세요. 개발용 자동 새로고침 코드는 정적 파일에 기록되지 않습니다.

## 스타터로 새 발표 만들기

자체 사진·첨부가 있는 [Markdown 스타터](starters/markdown/)에서 시작할 수 있습니다. kit 루트에서 다음을 실행합니다.

```sh
cp -R starters/markdown/talks/my-talk talks/my-new-talk
npm run dev
```

새 이름의 폴더에서 slides.md와 assets만 고치면 됩니다. 기존 네 원고는 공유 자산·다른 발표 링크를 시연하며, 스타터는 다른 덱에 의존하지 않습니다. 별도 프로젝트가 필요하면 스타터 프로젝트 전체를 새 경로로 복사하고 kit에서 `npm run dev -- --config ../my-presentation/ou.config.json`을 사용하세요. 상세 복사·공유 방법은 스타터 안내에 있습니다.

공통 디자인·HTML template·기존 예제까지 배포할 때에는 `npm run build:site`로 모두 갱신하고 `npm run verify:site`로 생성물이 원본과 일치하는지 확인합니다. verify는 생성물을 수정하지 않습니다. 현재 프로젝트만 생성하는 `npm run build`와 역할을 구분합니다. 공통 HTML 원본은 templates/presentation.html이며 공개 root index.html을 template으로 사용하지 않습니다.

## 한 번 정하는 프로젝트 설정

`ou.config.json`(기존 `stage.config.json`도 지원)의 `title`, `theme`, `sourceDir`, `outputDir`를 프로젝트에 맞춥니다. theme는 기존 `stage`, `paper`, `midnight` 중 하나입니다. 도구는 sourceDir 아래의 모든 `slides.md`를 찾습니다. 예를 들어 `talks/team/review/slides.md`의 기본 id는 `team/review`이며 basename인 `slides`를 쓰지 않습니다. frontmatter에서 고유 `id`를 선택할 수 있습니다. 같은 id·정규화된 출력 이름의 중복은 오류입니다.

출력의 `manifest.json`은 도구가 관리하는 목록입니다. 직접 편집하지 않습니다. 출력 폴더는 생성물이며 다음 build에서 통째로 바뀝니다. 원본·프로젝트 루트·생성 표시가 없는 기존 폴더는 출력 대상으로 덮어쓰지 않습니다. `--config path/to/ou.config.json`으로 별도 프로젝트 설정을 사용할 수 있습니다.

## 원고 문법

```md
---
title: 이번에 배운 것
---

# 이번에 배운 것

짧은 설명과 **강조**, [첨부](./reading.txt)를 함께 씁니다.

---

# 장면을 함께 봅니다

![화면 설명](./screen.png)

- 관찰한 내용을 적습니다.
- 다음 행동을 적습니다.
```

frontmatter는 선택입니다. 첫 의미 블록이 H1이면 장 제목으로 한 번 표시하고 나머지 본문은 원고 순서대로 남깁니다. `##` 이하 제목, 문단, 순서/비순서·중첩 목록, 이미지·링크·강조·인라인 코드, 인용, 코드 fence, pipe 표를 지원합니다. code fence 안 단독 `---`는 새 장을 만들지 않습니다. 첫 장을 cover로, 일반 표를 차트로 자동 변환하지 않습니다.

## 개행·본문 역할과 공통 안내

본문·인용 안의 일반 줄바꿈은 soft break이며 화면에서 공백처럼 이어집니다. 실제 호흡을 나누려면 줄끝 backslash(또는 Markdown의 두 공백)를 사용합니다. AST의 `br`과 강조 순서는 발표·읽기·미리보기에 그대로 남습니다.

```md
목적어와 서술어를 함께 읽고,\
다음 의미구로 넘어갑니다.

> 왜 골랐고,\
> **어떤 질문을 풀려는가?**
```

H1 끝 backslash 뒤의 다음 줄은 제목의 hard break가 아닙니다. backslash가 제목에 문자로 남고 다음 줄은 별도 본문이 됩니다. 제목에 같은 문법을 복사하지 마세요. 긴 제목은 짧은 제목과 본문으로 나누거나 현재 폭에서 확인합니다. 새 Markdown 모드는 브라우저에서 원고를 편집·역저장하지 않으며 원본을 수정하고 다시 빌드합니다.

이해에 필요한 설명·책임·조건·실행 요청은 본문입니다. 링크와 섞인 문장도 본문 크기를 유지합니다. 출처나 추가 탐색만 담은 행은 별도 문단으로 씁니다. renderer는 이미지가 없는 문단 중 링크들과 공백/`·`/`|`/`/`만 있는 행에 `data-copy-role="navigation"`·`md-meta`를 붙이고 나머지 직접 문단에는 `data-copy-role="body"`를 붙입니다. 인용 내부의 링크 주장은 이 탐색 분류에 포함하지 않습니다. 이는 구조 추론이며 링크의 의미를 판정하지 않습니다. 단독 링크도 핵심 행동일 수 있습니다. `**[지금 시작하기](./materials/workshop.md)**`처럼 문단 자체를 강조하거나 같은 문단에 짧은 설명을 두면 본문 위계를 유지합니다. AST·원문·링크 순서는 바꾸지 않습니다. 읽기에서는 메타도 일반 본문 크기로 읽을 수 있습니다.

두 역할에 공통인 안내는 H2들 앞에 씁니다. 기존 editorial은 선행 문단을 body 직속 전폭 행으로 남기고 H2부터 다음 H2 직전까지만 각 그룹으로 묶습니다. centered의 두 그룹은 동일한 폭이며 공통 안내를 세 번째 그룹으로 세지 않습니다.

```md
<!-- stage-slide
compose: editorial
variant: centered
-->
# 함께 편집합니다

같은 문서를 함께 읽고 고칩니다.

## 사람

목적과 판단을 적습니다.

## AI

문서와 연결을 갱신합니다.
```

반복되는 eyebrow·footer를 덜 때 `stage-slide`에 `quiet: true`를 명시할 수 있습니다. 이는 반복 라벨을 숨기고 본문 상하 공간을 넓히며, 필수 본문·자료·읽기 내용을 삭제하거나 숨기지 않습니다. `false`는 명시적으로 다시 표시하며 미지정하면 message·quote·closing은 quiet, 다른 구도는 일반 표시라는 기존 기본값을 따릅니다. 문자열 `"true"`나 숫자는 오류입니다. 바뀐 본문 영역은 실제 Range와 화면으로 다시 확인합니다.

작은 읽기 화면에서 자료 전체가 축소될 때는 그 자료 옆에서 정확한 native 절로 바로 갈 수 있게 `support`를 명시합니다. 다음은 실제 공개 학습 자료의 제목 앵커를 사용하는 예입니다.

```md
<!-- stage-slide
compose: media
support:
  label: 이 자료의 본문을 글로 읽기
  href: ./materials/notes.md#핵심-내용
-->
![설명용 자료의 읽을 부분](./assets/example.svg)
```

`support`는 한 줄 문자열 `label`과 `href`만 받습니다. href는 프로젝트에 등록된 `materials/*.md`의 상대 경로와 실재하는 `#anchor`여야 합니다. 다른 덱에 등록된 공개 자료도 연결할 수 있습니다. 외부 URL·query·슬라이드·일반 첨부·임의 비공개 Markdown·없는 앵커는 오류이며 마지막 성공 생성물을 보존합니다. 빌드는 공개 자료의 `.html#anchor`로 변환하고, 제어 주석의 원래 위치를 자동으로 연결합니다. 원고에 `origin`을 쓰지 않습니다.

이 링크는 읽기 모드에서 해당 자료 가까이에 18CSSpx 탐색 역할로 표시됩니다. 인용 우선 `quote-card`에서는 인용 다음에, `unframed` 결과 모음에서는 첫 이미지 앞에 놓입니다. 발표의 필수 구절·관계·조건을 공개 자료로 옮겼다면 정확한 절에 실제 본문을 둡니다. 축소 자료는 장에서 해당 공개 절로 직접 연결합니다. 실제 읽기 크기의 링크 글리프·가시성과 키보드·클릭으로 정확한 목적지에 도달하는지 확인합니다.

현재 공용 시작값은 document 본문·표/quote·media 필수 문단32, document 직접 인용/질문40, centered 동등그룹 설명34논리px입니다. 별도 탐색 행은22–24논리px이고 코드·다른 구도는 자체 역할을 유지합니다. 필수 요청을 작은 코드 형식으로 고집할 필요는 없으며 native 문단/목록과 전문 접근 경로를 함께 쓸 수 있습니다. 숫자 선언만으로 통과하지 않으며 실제 glyph 줄·표시 크기·그룹 소속은 [현재 판 검수](DESIGN.md#변경과-현재-판-검수)에서 확인합니다.

## 실제 관측의 프로젝트 회귀

LLM Wiki 키노트의 현재 계약은 [장·본문·SVG 역할](talks/llm-wiki/qa/keynote-current.json)과 [원래 26주제의 실제 위치](talks/llm-wiki/qa/keynote-coverage.json)입니다. 현재 본편은 11장이며 원래 26주제는 현재 역할과 공개 해설·대본의 위치로 연결합니다. 발표면에서 옮긴 정의·전체 관계·파일·약속·요청은 [공개 해설](talks/llm-wiki/materials/keynote-notes.md)과 [현재 대본](talks/llm-wiki/materials/speaker-script.md)의 실제 앵커·구절로 검증합니다. 편집 시 `--mode source`로 정적 위치·링크·원본 보존을 먼저 검사할 수 있으며 이는 실관측 검사가 아닙니다.

```sh
node scripts/llm-wiki-keynote-qa.cjs --mode source --source talks/llm-wiki/slides.md
```

마감에는 실제 현재 입력으로 발표1920×1080·1280×720, 읽기1440×1000·390×844/DPR1을 각각 수집해 **네 범위를 별도로** 실행합니다. 각 metrics는 자기 manifest의 정확한 경로·SHA·viewport·전체 입력 해시와 일치해야 합니다.

```sh
npm run qa:llm-wiki-keynote -- --mode current --source talks/llm-wiki/slides.md --manifest PATH_TO_PRESENT_1920_MANIFEST --svg-metrics PATH_TO_MATCHING_1920_SVG_METRICS
npm run qa:llm-wiki-keynote -- --mode current --source talks/llm-wiki/slides.md --manifest PATH_TO_PRESENT_1280_MANIFEST --svg-metrics PATH_TO_MATCHING_1280_SVG_METRICS
npm run qa:llm-wiki-keynote -- --mode current --source talks/llm-wiki/slides.md --manifest PATH_TO_READ_1440_MANIFEST --reading-metrics PATH_TO_MATCHING_1440_READING_METRICS
npm run qa:llm-wiki-keynote -- --mode current --source talks/llm-wiki/slides.md --manifest PATH_TO_READ_390_MANIFEST --reading-metrics PATH_TO_MATCHING_390_READING_METRICS
```

현재 source/style/runtime/asset/공개자료와 AGENTS·DESIGN·두 계약 JSON의 실제 해시를 대조합니다. 실제 Range glyph 행·크기·의도 개행·강조 순서·DOM 소속을 확인합니다. Markdown은 실제 원고 줄, 명시 결과 레이아웃은 실제 `data-field`로 대조합니다. 자료의 원비율과 프레임, SVG contain과 이름 붙인 실제 형상, 인용과 기사 자리, 관계 포트와 무방향 선을 관측합니다. H1 태그만으로 같은 크기를 강제하지 않고 그림 보조 제목·인용 도입·주역 제목의 명시 역할을 구분합니다. 읽기에서는 모든 현재 장의 native CSS px 관측과 실제 링크·global 학습 자료 탐색, **자료별 `support`의 sourceLine·실제label/href·18px/glyph·가시성·정확 절 접근**, 공개 해설 DOM 본문·앵커·구절·가로 넘침을 확인합니다. [수집 인터페이스](talks/llm-wiki/qa/keynote-observation.md)를 따르며 발표면에 매 장 탐색 문단을 덧붙일 의무는 없습니다.

현재 입력 불일치·대상 누락/중복·필수 실제 관측 누락은 `contract-invalid`(exit2), 확인된 크기·기하·호흡 회귀는 `regression`(exit1)입니다. 통과는 exit0이며 항상 `visualApproval: false`입니다. 해시와 정적 문구만 맞추어 실관측 누락을 통과시키지 않습니다. 정돈감·주역·밀도·흐름은 실제 화면의 독립 시각 검수와 명시 범위의 `--require-approved`로 별도 확인합니다.

역사 검사는 바꾸지 않습니다. 아래 명령은 [11월2일 동결 역할](research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json)의 교정 전 실패를 재현하며 새 현재판 검사가 아닙니다.

```sh
node scripts/llm-wiki-typography-qa.cjs --mode baseline --source research/llm-wiki-typography-20261102/engineering/fixtures/slides-before.md --manifest research/llm-wiki-typography-20261102/before/present-1280/manifest.json --svg-metrics research/llm-wiki-typography-20261102/before/present-1280/svg-metrics.json
```

이전 26장용 `current-roles.json`과 typography/reading CLI의 119항·11항 결과, 45개 역사 회귀와 사용자 반려는 보존합니다. 이들 고정 fixture를 신현재 검사라고 부르거나 과거 기술 통과를 키노트의 시각 승인으로 승계하지 않습니다.

## 역할을 유지하는 작은 레시피

먼저 역할에 맞는 문법을 고릅니다. 읽을 구절과 실제 자료 링크는 일반 문단·인용·표로, 서로 다른 의미 그룹은 H2로, 한 그룹 안의 질문은 H3로 작성할 수 있습니다. 다음 예는 두 판단을 한 그룹에 두고 이후 실행을 분리합니다. 단순히 세 그룹 중 하나에 `primary`를 붙이는 것과 원고/DOM 소속이 다릅니다.

```md
<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 다시 쓸 자료부터 고릅니다

두 판단을 한 뒤 작게 시작합니다.

## 먼저 판단합니다

### 내 목적에 필요한가

앞으로 만들 결과와\
**관련된 자료인가**

### 왜 골랐는가

가치 있다고 느낀 이유를\
**직접 적을 수 있는가**

<!-- stage-group
tone: green
-->
## 판단했다면, 작게 시작하기

같은 주제의\
**자료 두 개부터 연결합니다.**
```

H2 앞의 안내는 두 그룹에 공통인 body 직속 행입니다. H2 뒤 문장은 다음 H2 직전까지 해당 그룹에 속하므로, 마지막 H2 뒤에 공통 문장을 놓아 전폭 후행 행으로 만드는 문법은 없습니다. H3와 본문이 실제 화면에서 질문/설명으로 읽히는지, 두 그룹의 시작선과 의도 개행이 유지되는지 직접 확인합니다. 읽기 화면은 원래 문서 순서를 유지합니다.

별도 SVG는 표준 이미지 `![관계 설명](./assets/relation.svg)`로 넣고, 사진과 달리 `fit: contain`으로 전체 관계를 보존할 수 있습니다. 부모의 `compose`·색·CSS를 바꿔도 외부 SVG 내부 글자와 선의 배치는 바뀌지 않습니다. 내부를 고칠 때는 그 자산을 편집하거나 필요한 구절을 native 본문으로 옮깁니다. 실제 UI 캡처와 설명용 재구성의 지위, 원본·전문 링크를 함께 보존합니다. 코드로 적은 가상 파일 이름은 실제 링크가 아닙니다. 링크는 실재 자료를 가리키는 `[설명](./materials/guide.md)`로 작성합니다.

문법 선택은 시각 합격을 보장하지 않습니다. 현재안과 달라진 크기·거리·자료 표면, 먼저 읽힌 대상과 줄어든 오독을 [DESIGN의 선택 문장](DESIGN.md#역할에서-시안으로-연결하기)으로 인수합니다.

## 사진·그리드·의미색과 기본 조판

짧은 H1+문단은 큰 선언, 이미지1개는 큰 미디어, 이미지 뒤의 목록은 좌우 split, 연속 이미지2~6개는 gallery, 짧은 인용은 인용 중심으로 조판합니다. 복잡하거나 긴 본문은 넓은 document 흐름으로 둡니다. 사진 개수·길이 같은 형태를 이용하며 문장을 요약하거나 표를 성과 차트로 해석하지 않습니다. 일반 `**강조**`와 `*강조*`는 기본 파랑이며 사진 자체 색은 바꾸지 않습니다.

필요한 장만 첫 내용 앞에 `stage-slide`를 넣습니다. 제목·사진·문장을 설정에 다시 쓰지 않습니다.

```md
<!-- stage-slide
compose: mosaic
fit: cover
focus: '50% 40%'
tone: purple
-->
# 넓게, 가까이, 밖으로.

![넓은 장면](./wide.jpg "장면의 맥락 · 사진 출처")

![가까운 단서](./detail.jpg "가까이 보기 · 사진 출처")

![다른 시선](./context.jpg "주변의 맥락 · 사진 출처")
```

`compose`는 `auto`(기본), `message`, `split`, `media`, `gallery`, `mosaic`, `editorial`, `bento`, `icon-wall`, `quote`, `closing`, `document`를 지원합니다. 명시한 `compose: quote`는 단일 인용 앞뒤의 짧은 문단을 원순서로 유지하며, 맞지 않는 본문은 document로 보존하고 자동 조판의 선택 기준은 유지합니다. mosaic은 첫 사진을 크게, editorial은 H2별 자료를 주역/보조 그룹으로 표현합니다. closing은 저자가 끝 장의 표현을 선택할 때 사용합니다. split은 이미지가 먼저 오고 뒤에 문단/목록이 이어지는 형태만 묶습니다. 앞 설명→이미지→뒤 설명, 문장과 섞인 이미지, 링크로 감싼 이미지를 무단 추출/재정렬하지 않습니다.

### 자료와 선택 구절

두 행의 큰 선언에서 굵기를 늘리지 않고 강조색을 쓰려면 명시한 `compose: message`에 `variant: declaration`을 추가합니다. 발표면의 H1과 strong 획 무게를 맞추며, 일반 message·auto·읽기와 원문 의미 강조는 바꾸지 않습니다. 다른 compose에서 이 variant를 쓰면 document와 경고로 원문을 보존합니다. 의도 개행은 여러 줄 setext 제목으로 쓸 수 있습니다.

```md
<!-- stage-slide
compose: message
variant: declaration
tone: orange
-->
함께 일하는 방식이\
**오늘부터 달라집니다**
====================
```

어두운 자료면 옆에 밝은 native 인용 카드를 놓으려면 명시한 `compose: split`에 `variant: quote-card`를 씁니다. 발표면에서 인용을 반전색 카드로 묶고 어두운 자료의 가장자리에 얕게 겹쳐 배치합니다. 이미지 뒤에 단일 인용과 짧은 문단을 놓거나, 인용과 이미지만 순서대로 쓸 수 있습니다. 인용을 먼저 쓰면 읽기 화면에서 인용, 인접 지원 링크, 그림 순으로 표시합니다. `tone`은 작은 인용부호의 색을 고릅니다. 인용과 의도 개행은 원래 Markdown으로 편집하며, 읽기에서는 카드 없이 원순서로 표시합니다. 짧게 고른 구절과 넉넉한 내부 여백이 맞는지 실제 화면에서 확인합니다.

```md
<!-- stage-slide
compose: split
variant: quote-card
tone: blue
-->
![자료의 어두운 기사면](./assets/article.svg)

> 짧게 고른 구절을\
> 원래 순서로 읽습니다.
```

강조 구절이 있는 큰 인용에는 명시 `compose: quote`와 `variant: spacious`를 사용할 수 있습니다. 발표면에서 자간을 넓히고 strong 문구를 본문과 같은 획 무게로 표시합니다.

동등한 두 그림을 원본 비율로 비교하려면 `compose: gallery`와 `variant: comparison`을 씁니다. 각각 독립된 이미지 문단 두 개만 받으며, 이미지 title은 하단의 native 비교 라벨이 됩니다. 발표면은 중앙의 제한 폭과 넓은 창 사이 여백,26논리px 라벨로 시작합니다. 넓은 읽기 화면에서도 두 그림을 같은 너비로 놓으며 좁은 화면에서는 한 열을 사용합니다. 세 번째 이미지·앞뒤 설명·혼합 문단은 document와 경고로 보존합니다. 일반 gallery·strip·auto는 바꾸지 않습니다. 비교 라벨은 순수 출처와 구별하는 `figure-label` 역할이며 읽기에서18CSSpx로 표시하고 원문 순서와 sourceLine을 보존합니다.

```md
<!-- stage-slide
compose: gallery
variant: comparison
-->
![첫 작업의 그림](./assets/first.svg "이번 답")

![두번째 작업의 그림](./assets/second.svg "다시 쓸 지식")
```

자료의 정체성과 선택한 정확 구절을 나란히 읽으려면 명시한 `compose: split`에 `variant: evidence`를 씁니다. 이미지 한 개가 먼저 오고, 그 뒤에는 단일 인용과 짧은 일반 문단만 둘 수 있습니다. 인용은 문단으로 구성된 220자 이하, 주변 문단은 합계200자 이하, 뒤 본문 전체는380자 이하입니다. 발표면에서는 인용54논리px·주변 문단32논리px로 시작하며 실제 폭과 행을 확인합니다. 일반 split·auto의 선택 조건과 읽기 크기는 바꾸지 않고 원문 순서·의도 개행·링크·출처 위치를 보존합니다. 맞지 않는 구조는 내용을 모두 남긴 document와 경고로 표시합니다.

```md
<!-- stage-slide
compose: split
variant: evidence
fit: contain
-->
![자료의 제목과 선택 위치](./assets/source-selection.svg)

이 질문의 근거를 확인합니다.

> 자료에서 고른 정확한 구절을\
> 원래 순서로 읽습니다.

설명용 재구성 · 정확 발췌
```

하나의 기록면에 두 기여를 붙이려면 `compose: editorial`과 `variant: record`를 사용합니다. 같은 문서의 한 필드에서 달라진 두 행은 `variant: revision`으로 구성할 수 있습니다. 제목 1개와 H2·짧은 문단의 묶음 2개를 작성합니다. 읽기 모드는 각 H2 가까이에 해당 문단을 놓습니다.

짧은 개념을 나란히 크게 설명하려면 `compose: editorial`에 `variant: centered`를 추가합니다. H2 그룹을 무대 중앙 높이에 놓고 상단 구분선 없이 제목·본문을 크게 보여 줍니다. 일반 editorial은 그대로 유지하며, 읽기 화면에서는 같은 내용이 원래 순서의 문서로 표시됩니다. 이 변형은 editorial에서만 사용합니다.

`tone`은 `blue`, `orange`, `purple`, `green`, `yellow`, `neutral`입니다. 색은 주로 강조와 그룹 제목에 쓰고 단위/출처는 중립으로 둡니다. Paper에서도 기존 STAGE 팔레트에 맞춥니다. `fit`은 `contain`(기본, 전체 보존) 또는 `cover`(사진 crop), `focus`는 `'0% 0%'`~`'100% 100%'`의 두 위치입니다. 이미지 title은 화면 caption과 출처로 남고 alt는 그대로 보존합니다. 읽기에서는 crop을 풀고 원본 전체를 보여 줍니다.

gallery/mosaic에서 사진마다 얼굴·관심 지점이 다르면 장의 `focus`를 원고 이미지 순서에 맞는 좌표 배열로 지정할 수 있습니다. 예를 들어 `focus: ['50% 40%', '50% 25%', '50% 0%']`는3장의 위치를 각각 정합니다. 좌표는0~100%이며 배열은1~6개를 받습니다. 실제 grid의 사진 수와 다르거나 gallery/mosaic 이외 구도라면 document+경고로 전환하고 사진은 안전한 contain으로 전체를 보존합니다. 좌표를 추정하거나 배열을 순환하지 않습니다. 그룹의 focus는 기존처럼 한 좌표 문자열만 받습니다. cover 결과에서 얼굴/중요 대상이 남는지는 실제 미리보기에서 확인하세요.

혼합 자료는 `compose: editorial`을 선택하고 기존 H2 앞의 `stage-group`으로 대표/의미색을 정할 수 있습니다. 설정은 다음 H2부터 그 다음 H2 직전까지의 원래 본문을 가리킵니다. 그룹 수나12칸·출처 문단 수를 강제하지 않습니다. 대표는 한 장에 최대1개입니다.

```md
<!-- stage-slide
compose: editorial
-->
# 기록과 다음 행동

<!-- stage-group
primary: true
fit: contain
-->
## 함께 읽을 문서

![가상 보고서](./report.svg "자체 제작 가상 문서")

<!-- stage-group
tone: orange
-->
## 다음 행동

**2** 개

다음에 확인할 두 가지 작업입니다. 가상 예시이며 성과가 아닙니다.
```

그룹 설정은 `tone`, `primary`, `fit`, `focus`와 bento의 선택 장식 `icon`을 받습니다. `**24** 개`처럼 독립 문단의 짧은 숫자 강조+단위만 수치 위계로 보이며 원값 문자열을 계산/반올림하지 않습니다. 일반 강조 문장이나 링크를 수치로 바꾸지 않습니다. 예제는 [제품 결정 이야기](talks/product-notes/slides.md)와 [사진으로 질문하는 워크숍](talks/team-learning/slides.md)을 비교하세요.

## 사진 비율·혼합 타일·아이콘월 재사용

같은 사진 원고에서 `compose: gallery`에 `variant: portraits`를 고르면2:5 세로 프레임, `variant: strip`을 고르면4:3 가로 프레임으로 배치합니다. 사진2~6개가 실제 개수만큼 한 행에 놓이고 title caption은 프레임 밖에 남습니다. 제목 없는 사진 장도 가능합니다. 기본 gallery와 구분되는 명시 선택이며, 긴 제목/caption과 crop 결과는 실제 미리보기에서 확인합니다. `compose: mosaic`, `variant: staggered`는 정확히6사진을2+1+1/1+1+2의 불균등 두 행으로 배치합니다. 사진 경로/alt/title은 본문에 한 번만 쓰고 기존 focus 배열을 원순서로 대응시킵니다.

`compose: bento`는 H2별 기존 본문을 혼합 타일로 씁니다. `variant: balanced`가 기본이며5/8/12개처럼 자료 수를 바꿀 수 있습니다. `seoul`, `recap`은 기존12개 프리셋을 선택할 때 사용합니다. 빈 타일을 채우려고 본문을 복제할 필요는 없습니다. 각 H2 앞 `stage-group`에서 `primary`, `tone`, `fit`, `focus`, 선택 `icon`을 지정합니다.

```md
<!-- stage-slide
compose: bento
variant: balanced
-->
<!-- stage-group
icon: record
tone: blue
-->
## 남길 기록

**24** 개

가상 작업 계획입니다.

## 함께 읽을 자료

![문서 설명](./report.svg "자체 제작 가상 문서")
```

나머지 H2 자료를 같은 방식으로 이어 씁니다. 사진·값·인용·목록·문서의 표면 구조에 따라 타일 면을 나누며 본문 의미를 추론하거나 내용을 요약하지 않습니다. 큰 값은 원래 숫자 문자열과 단위를 유지합니다. H2보다 앞에 별도 안내/표가 있으면 타일보다 앞으로 옮기지 않고 document+경고로 보존합니다. 마지막 H2 뒤의 조건/출처도 그 그룹의 원래 순서에 남습니다. 작은 슬롯에 긴 본문이 들어가는지는 실제 화면에서 검수하고 필요하면 원고에서 장을 나눕니다.

`compose: icon-wall`은 일반 비순서 목록 한 개와 목록 앞의 제목/문단을 사용합니다. 기존20개 의미 아이콘은 `icons` 배열의 같은 순번 li에 대응합니다. 라벨과 rich link는 목록에만 씁니다.

```md
<!-- stage-slide
compose: icon-wall
icons: [search, {icon: code, tone: blue}, check, share, calendar]
-->
# 함께 하는 일

- 살피기
- [만들기](./reading.txt)
- 점검하기
- 나누기
- 약속하기
```

내장 이름은 `brain`, `price`, `speed`, `image`, `voice`, `record`, `compare`, `select`, `share`, `code`, `chart`, `search`, `book`, `calendar`, `mail`, `globe`, `check`, `folder`, `music`, `spark`입니다. 항목 tone은 기존5색+neutral을 선택합니다. 내장 wall은 최대22개까지 배치하며5/12/22처럼 수량에 맞는 둘레 배치를 공유 planner가 정합니다. 목록을 재배열할 때 대응 icons 항목도 함께 옮겨야 하는 작성 부담이 있습니다. 빈 자료나 라벨 중복을 요구하지 않습니다.

자체 로고/아이콘은 icons 배열을 생략하고 **모든 li를 표준 이미지로 시작**하면 됩니다. 경로·alt·title과 라벨을 같은 li에서 함께 옮깁니다. 이미지는 contain과 고유색을 유지하고 title은 caption으로 남습니다.

```md
<!-- stage-slide
compose: icon-wall
-->
# 보고, 묻고, 남기기

- ![보기 표식](./look.svg) 보기
- ![질문 표식](./ask.svg) [묻기](./questions.txt)
- ![기록 표식](./note.svg) 남기기
```

builtin/custom을 섞는 null 배열 문법은 지원하지 않습니다. 링크로 감싼 이미지, 이미지 없는 항목이 섞인 custom 목록, 배열/목록 수 불일치,23개 이상의 wall은 원문 document+경고입니다. 목록 뒤 조건문을 중앙 copy로 앞당기지 않으며 꼬리 본문이 있으면 전체 document로 남깁니다. 순서 목록도 발표에서 번호를 숨기지 않도록 현재는 원래 ol/start를 가진 document+경고로 표시합니다. `icons`는 wall 전용, 그룹 `icon`은 bento 전용이며 다른 구도에서 선택하면 경고합니다. 미지 이름/variant는 입력 오류이고, 알려진 variant가 구도·수량·프리셋에 맞지 않으면 document+원고 줄 경고입니다.

새 실제 예제 [사진 에세이8장](talks/photo-essay/slides.md)와 [작은 전시9장](talks/community-exhibit/slides.md)을 참고하세요. 읽기 화면에서는 모든 프레임/grid를 풀고 원본 사진, H2, 목록, 라벨, 링크, caption과 조건을 원순서 전문으로 보여 줍니다. preview/presenter는 같은 구도와 내용을 쓰며 링크는 비상호작용입니다. 실제 배치/대비/가독성 합격은 입력 검증과 별도입니다.

설정 이름/위치/범위가 잘못되면 원고 줄번호와 오류를 알리고 마지막 성공본을 유지합니다. 문법은 유효하지만 선택한 구도에 맞지 않는 원고는 내용을 모두 남긴 document로 표시하고 **작성자 점검**에 경고합니다. fallback으로 생성됐다는 사실이 발표 가독성 검수 통과를 뜻하지는 않습니다. 긴 본문은 실제 화면을 보고 원고에서 나눠 주세요. 명시 `stage` layout/JSON 앞에 `support`만 둔 `stage-slide` 주석을 써서 읽기 링크를 추가할 수 있습니다. `stage-group`과 그 밖의 장별 조판 설정은 Markdown 본문 조판에서 사용합니다. 코드 안의 예문은 지시문으로 실행하지 않습니다.

원고가 넘치면 미리보기에서 진단하고 직접 장을 나눕니다. 내용을 자동 요약·삭제하지 않습니다. 읽기 화면에서는 코드·표와 긴 내용을 스크롤해 확인할 수 있습니다. HTML 원문은 실행하지 않으며 일반 문자로 표시될 수 있습니다.

로컬 이미지와 첨부 경로는 원고 파일 기준입니다. 참조한 파일은 내용 hash가 있는 URL로 assets에 복사하고 원본은 바꾸지 않습니다. 등록된 다른 `slides.md` 링크는 그 발표의 `read.html`로 연결합니다. 원본 Markdown을 자동 복사/다운로드하지 않습니다. 직접 링크는 숫자 `#2` 같은 장 번호를 사용하며 제목 기반 `#heading` 영구 anchor는 아직 지원하지 않습니다. `https:` 같은 원격 링크·이미지는 그대로 남아 네트워크가 필요할 수 있습니다. 파일이 없으면 새 출력으로 교체하지 않습니다.

## 발표와 별도로 읽는 학습 자료

슬라이드보다 긴 설명·대본·참고 모음·실습은 원고 옆의 선택 폴더 `materials/`에 일반 Markdown으로 작성합니다. 자료는 발표 장수에 포함되지 않습니다. 새 주제에 자료 한 개만 추가해도 자료 목록과 발표·읽기 화면의 **학습 자료** 진입점이 생깁니다. 주제별 코드나 HTML을 작성할 필요는 없습니다.

```text
talks/my-topic/
  slides.md
  assets/
    diagram.svg
  materials/
    guide.md
    workshop.md
    index.md       # 선택: 직접 쓰는 자료 목차
```

자료 파일 이름은 소문자 영문·숫자로 시작하고 이후 소문자 영문·숫자·`-`·`_`를 사용하며 `.md`로 끝냅니다. 이번 자료 경로는 `materials/` 바로 아래의 파일을 대상으로 하며 중첩 자료 폴더는 지원 범위가 아닙니다. `index.md`가 없으면 등록된 자료 목록을 담은 `materials/index.html`을 자동 생성합니다. 있으면 그 원문을 사용합니다. 자동 목차가 있다는 이유로 존재하지 않는 `index.md`에 Markdown 링크를 만들 수는 없습니다. 자동 목차로 들어가는 길은 상단 탐색과 발표 모음이 제공합니다.

자료는 첫 내용에 H1 제목 하나를 쓰고, H2/H3로 문서 안의 목차를 만듭니다. 선택 frontmatter의 `title`은 브라우저 제목과 자료 목록에 쓰는 이름, `description`은 짧은 소개, `order`는 자료 목록의 순서입니다. `order`는 0 이상의 정수이며 생략하면 0입니다. 본문의 H1과 목차는 그대로 유지됩니다. frontmatter는 다음 세 항목만 지원합니다.

```md
---
title: 처음 읽는 가이드
description: 개념과 사례를 함께 살펴봅니다.
order: 1
---
# 직접 확인하며 공부하기

## 자료의 범위

일반 문단·목록·인용·표·코드와 출처 링크를 씁니다.

### 스스로 확인하기

[실습으로 이동](./workshop.md#직접-해보기)
```

제목 anchor는 NFKC 정규화 후 소문자로 바꾸고 기호를 제거하며 공백과 `_`를 `-`로 바꿉니다. 한글도 유지합니다. 예를 들어 `## 자료의 범위!`는 `#자료의-범위`, 같은 제목의 다음 등장은 `#자료의-범위-2`가 됩니다. 실제 생성된 목차에서 링크를 확인하세요. 제목을 바꾸면 anchor도 바뀌므로 자료 간 링크를 함께 고칩니다. 자료에는 제목 anchor를, 슬라이드에는 숫자 장 번호를 사용합니다.

| 작성 위치 | Markdown 링크 예 | 생성 후 연결 |
| --- | --- | --- |
| 자료 → 같은 자료 | `[여기로](#자료의-범위)` | 같은 HTML의 제목 |
| 자료 → 다른 자료 | `[실습](./workshop.md#직접-해보기)` | `workshop.html#직접-해보기` |
| 자료 → 슬라이드 읽기 | `[3장](../slides.md#3)` | `../read.html#3` |
| 슬라이드 → 자료 | `[가이드](./materials/guide.md#자료의-범위)` | `materials/guide.html#자료의-범위` |

링크 대상 문서와 제목, 슬라이드 장 번호는 실제로 존재해야 합니다. 등록된 자료와 `slides.md`에 대한 연결만 Markdown 링크로 변환하며 임의의 다른 `.md` 파일을 자동 복사하지 않습니다. 자료에 쓴 `https:` 출처 링크는 그대로 유지합니다. 코드 fence나 인라인 코드 안의 가상 경로는 파일 참조로 처리하지 않습니다. 코드 안의 `---`도 문서나 슬라이드를 나누지 않습니다. raw HTML은 실행하지 않고 문자로 표시합니다.

`npm run build`는 자료를 `presentations/<주제>/materials/<이름>.html`로 생성합니다. 공통 자료 CSS는 자료가 있는 모음의 `_runtime/materials.css`에 한 번 복사합니다. 자료의 이미지·첨부는 자료 원본 파일을 기준으로 찾고, 같은 덱의 `assets/`에 내용 hash를 붙여 복사합니다. 같은 내용과 파일 이름을 참조하는 슬라이드·자료는 생성 자산을 공유할 수 있습니다. 원자료는 바꾸지 않으며 프로젝트를 옮겨 다시 빌드해도 상대 경로를 유지합니다. 공유할 때는 기존 발표와 마찬가지로 생성한 모음 폴더 전체를 전달합니다. 원본 Markdown이 별도 다운로드 파일로 공개되는 기능은 아닙니다.

`npm run dev`는 자료 추가·수정·자산과 공통 `templates/material.html`·`templates/materials.css` 변경도 감지합니다. 누락 파일이나 잘못된 anchor가 있으면 원본 경로, 해당 문단의 시작 행과 참조 문구로 오류를 알리고 마지막 성공 출력을 유지합니다. 파일을 만들거나 링크를 고치면 다시 생성합니다. `npm run verify:site`는 자료 본문·스타일의 오래된 생성물, 누락·불필요 파일도 검사하며 출력 자체를 고치지 않습니다.

자료가 없는 덱은 기존 발표·읽기 경로를 그대로 사용하며 자료 template·CSS를 요구하지 않습니다. 자료 화면은 정적 HTML과 CSS로 읽고 탐색합니다. 문서 목록·목차·발표 복귀는 키보드로 사용할 수 있고, 좁은 화면에서는 “목차와 다른 자료”를 열어 탐색합니다. 긴 코드와 표는 해당 영역에서 가로로 스크롤합니다. 실제 모바일 가독성과 인쇄 결과는 본문·코드·표를 넣은 상태에서 확인하세요. 입력 검증 통과가 문서 디자인의 검수까지 대신하지 않습니다.

자료 frontmatter·본문·첨부는 모두 공개할 내용만 넣습니다. 학습 자료가 비공개 발표자 노트나 권한 관리 기능을 제공하지는 않습니다. 문서의 자동 요약, 출처 신뢰성 판단, 링크된 외부 웹페이지의 최신성 확인도 별도 작업입니다.

## 원본·편집·기존 양식

새 모드의 작성 원본은 Markdown입니다. 발표/읽기 미리보기는 읽기 전용이며 브라우저 편집·content.js 다운로드를 Markdown 저장으로 제공하지 않습니다. 생성 `content.js`를 손으로 바꿔도 다음 build에서 원고 내용으로 돌아갑니다. 화면 수정의 원고 역저장·충돌 처리는 이번 범위에 없습니다.

기존 [MARKDOWN.md](MARKDOWN.md)의 제한 문법·반복 H1 줄바꿈과 직접 content.js 발표는 계속 별도 경로를 사용합니다. 새 원고에서 기존 20양식을 쓰려면 명시 `stage` layout/JSON 어댑터를 선택합니다. 고급 JSON은 정확히 세 백틱의 `stage` fence를 사용하며 일반 코드는 백틱·틸드 fence를 사용할 수 있습니다. 해당 양식이 표시할 수 없는 본문을 조용히 삭제하지 않고 오류로 알립니다. 기존 예제를 새 문법으로 자동 재해석하지 않습니다.

새 `markdown-v1` 모드의 구조 설정 `notes`, `role`, `appendix`, `sourceDownload`는 아직 지원하지 않아 오류로 처리합니다. 기존 legacy compiler의 notes 지원과 구분하세요. 일반 본문이나 코드에서 이 단어를 쓰는 것은 가능합니다. HTML 주석에 적으면 비공개가 된다고 생각하지 마세요. 원고 내용과 명시 첨부는 공개할 자료만 넣어야 합니다. 노트 비공개 투영·원본 공개 선택·부록 역할은 후속 기능입니다.

이번 단계는 일반 Markdown·자동 미리보기·정적 발표/읽기·여러 덱 재사용입니다. 별도 portable/offline 패키저, CI 배포, React 편집 UI, 영구 장 id, 화면→Markdown 저장은 포함하지 않습니다.
