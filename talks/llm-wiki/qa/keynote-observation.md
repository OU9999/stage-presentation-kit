# LLM Wiki 현재판 관측 계약

현재 [역할](keynote-current.json)과 [coverage](keynote-coverage.json)는 11장, native 텍스트 28개, 이미지 8개, 인접 읽기 링크 11개와 원래 26개 주제의 위치를 명시합니다. 입력 또는 자산이 달라지면 새 화면에서 관측합니다.

[작성 안내의 명령](../../../MARKDOWN-FIRST.md#실제-관측의-프로젝트-회귀)을 발표 1920×1080·1280×720, 읽기 1440×1000·390×844에서 각각 실행합니다. 각 범위는 DPR1입니다. `--mode source`는 정적 역할과 원본 보존·공개 위치를 확인합니다. `--mode current`에는 해당 범위의 manifest와 실관측 metrics가 모두 필요합니다. 역사 회귀에는 보관한 입력·관측·계약을 사용합니다.

## 같은 입력과 범위

- `revision`은 정본 `talks/llm-wiki/slides.md`의 실제 SHA256입니다.
- `hashes`는 `collectInputs`의 원고·런타임·공용 스타일·자산·학습 자료 전체와 AGENTS.md, DESIGN.md, 두 계약 JSON의 현재 SHA256입니다.
- `captureManifest:{path,sha256}`는 보조 metrics를 수집할 때 사용한 manifest의 저장소 상대 경로와 실제 바이트 SHA256입니다.
- manifest의 `captureMode`는 `presentation-stage-only` 또는 `read-slide-crop`이며, 각각 모든 현재 장의 고유한 0기반 index·revision·viewport를 요구합니다.

## 실제 문장과 그림

`typography[]`는 브라우저 Range에서 읽어 온 `tag`, `text`, `fontSize`, `effectivePixels`, `logicalBox`, `lines[{text,x,y,width,height}]`, `breaks`, `emphasis`를 담습니다. 실제 `domParent.tag`, `directBody`, `parentGroup`, `copyRole`도 함께 확인합니다. 발표 좌표는 1600×900 논리 화면, 읽기 좌표는 장 내부 CSS px입니다.

- Markdown은 실제 AST의 `sourceLine`, 원문 text와 tag, 작성한 BR, strong·em의 글자와 순서로 대응합니다. BR 전후의 Range y를 관측하며 원문 줄 나눔과 실제 행을 함께 검증합니다.
- 명시 레거시 결과의 제목은 `H1[data-field="title"]`이고 `slide.title`과 대응합니다. 결과 제목의 newline은 실제 두 glyph 행으로 확인합니다. `sourceLine`은 비어 있으며 임의 줄 번호를 넣으면 실패합니다.
- 비교 라벨은 실제 `FIGURE > FIGCAPTION[data-copy-role="figure-label"]`입니다. 이미지 title의 실제 줄에서 작성하며 발표 26논리 px, 읽기 18CSS px로 관측합니다. 인용의 본문은 `BLOCKQUOTE > P`입니다.
- 읽기와 발표의 이미지 목록은 실제 DOM 순서, 콘텐츠 해시가 반영된 src, alt, intrinsic width·height, fit과 실제 rect를 사용합니다. PNG는 실제 header와 decode 크기로, SVG는 실제 viewBox와 contain 투영으로 검증합니다.

## 발표면의 경계와 SVG

- 1장 선언의 실제 두 행과 아래 행의 상대 폭, 2장 양쪽 창과 native 라벨의 실제 위치를 확인합니다.
- 3장 `quoteCardLogicalBox`는 `.md-copy > blockquote`의 실제 stage 논리 좌표입니다. SVG `renderedRect`를 같은 좌표로 옮겨 카드와 기사의 접점과 겹침, 기사 glyph와의 충돌, native 인용의 실제 소속과 행을 검증합니다.
- 4장은 이미지 rect와 실제 `frameLogicalBox`, `frameBorder`, `frameBackground`에서 원비율, 투명한 프레임과 2×2 정렬을 관측합니다. 읽기에서는 넓이에 맞추어 이미지의 같은 원비율을 사용합니다.

SVG metrics의 각 항목에는 `slide`, `src`, `sourcePaths`, `assetSha256`, `materialKind`, `fit`, `svgViewBox`, `renderedRect`, `texts`, `geometry`가 필요합니다. `materialKind`는 SVG root의 실제 `data-material-kind`입니다. 기사와 네 결과면은 원자료 경로가 명시된 `editorial-adaptation`입니다. 두 창과 관계도는 `explanatory-reconstruction`입니다.

`renderedRect`는 DOM img 안에서 실제 contain으로 표시된 CSS rect입니다. `texts[]`는 실제 `<text>` 순서로 fontSize, bbox, 실제 glyphRows, contain을 반영한 stageLogicalPixels를 수집합니다. 기사·결과면의 자료 안 글은 화면의 실제 크기에서 확인하며, 정확 원문과 문서 전문은 인접한 공개 해설 절에서 읽습니다. 관계도의 세 라벨은 필수 관계 텍스트입니다.

`geometry.coordinateSpace`는 `root-svg-viewBox`입니다. `geometry.shapes`는 각각 `[data-observe-id]`의 실제 `{id,tag,bbox,visible,opacity,fill,stroke,strokeWidth}`를 담습니다. 두 작업창의 경계와 작업 표식, 기사의 패널과 본문, 네 결과면의 일정표·연결·편집창·기록 칸, 관계도의 노드와 선을 기록합니다.

7장의 `connected-knowledge.svg`는 자료 요약·개념과 비교·현재 계획을 세 무방향 선으로 연결합니다. `geometry.nodes`는 각 `[data-node-id]`의 실제 자식 RECT와 경계의 명시 port, `geometry.relations`는 각 `[data-edge-id]`의 실제 점·연결 port·선 굵기·가시성·marker를 수집합니다. 현재 역할 계약의 세 쌍과 연결 끝 및 glyph 교차를 대조합니다.

## 실제 읽기 경로

`view.support`의 정확 label·href와 제어문의 sourceLine을 실제 `p.markdown-support[data-copy-role="support"][data-source-line] a`에서 읽습니다. `supportLinks[]`에는 실제 A의 절대 href, glyph rect, 18CSS px와 가시성을 남깁니다. 각 장의 자료는 연결된 공개 해설의 정확한 경로와 앵커로 열립니다. 3장의 `contentOrder`는 읽기 DOM에서 인용과 링크가 기사보다 앞서는 순서를 기록합니다. 4장은 전문 링크 다음에 네 결과물 이미지가 오는 순서를 DOM과 실제 세로 위치에서 확인합니다. 링크와 첫 이미지의 왼쪽 기준선은 같습니다. 전역 `supportNavigation`은 실제 `.stage-document-links`의 링크입니다.

`supportDocuments[]`에는 실제 공개 해설의 `sourcePath,url,title,text,anchors,links,scrollWidth,clientWidth`와 `paragraphs[{section,text,isQuote,fontSize,wordBreak,lines}]`를 기록합니다. ‘선택 이유 메모’ 원문과 현재 기사의 편집 문장은 각각 해당 절의 실제 인용 P, 전체 glyph, keep-all과 의미 단위의 실제 행을 확인합니다. coverage는 공개 해설·대본·읽기 위치와 요구 구절을 대조합니다. 2장 읽기는 문서 폭에 맞는 두 열 또는 한 열의 실제 이미지와 라벨 위치, 5장은 모바일 정의의 실제 한 행, 6·8·9장은 그룹 안과 그룹 사이의 glyph 간격을 관측합니다. 7장은 읽기 `svgLabels`의 실제 배포 SVG 글자 크기를 이미지 contain rect에 투영해 관계 라벨 크기를 확인합니다.

누락·중복·입력 불일치는 `contract-invalid`, 관측의 행·크기·구도·넘침 문제는 `regression`입니다. 시각 판정과 승인 범위는 [검수 기록 안내](../../../DESIGN-REVIEW.md)를 따릅니다.
