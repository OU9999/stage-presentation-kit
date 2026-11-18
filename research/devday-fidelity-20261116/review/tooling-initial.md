# 최신 발표 OSS 조사와 현재 엔진 권고

B `/root/devday_verification_manager/tooling_integrator`, 2026-11-16. 제품 변경·dependency 설치·도구 교체·브라우저 실행은 하지 않았다. 네트워크는 공식 저장소/API/문서를 새로 조회했다. 버전 원문은 [release observations](tooling-release-observations.json), license·Marpit/CLI 원문 조회는 [source observations](tooling-source-observations.json)에 조회 시각과 URL을 보존했다. 이 보고서는 도구 학습/적용 판단이며 미감 승인서가 아니다.

## 확인한 최신 안정판

`releases/latest` 세 응답을 2026-11-16T05:55:17Z에 직접 조회했고 prerelease=false를 확인했다. latest는 이 조회 시점의 공식 GitHub latest endpoint 값이다.

| 도구 | latest / 게시 UTC | license 근거 | 현재 문제에 유용한 학습 |
| --- | --- | --- | --- |
| reveal.js | **6.0.2**, 2026-09-10T15:41:21Z — [공식 release](https://github.com/hakimel/reveal.js/releases/tag/6.0.2) | [해당 tag LICENSE](https://github.com/hakimel/reveal.js/blob/6.0.2/LICENSE), MIT 본문 확인 | Markdown 밖의 자료/무대 구성, 선택형 lightbox, 현재/다음/노트, 모드별 표현 |
| Slidev | **v53.1.0**, 2026-11-05T06:30:52Z — [공식 release](https://github.com/slidevjs/slidev/releases/tag/v53.1.0) | [해당 tag MIT LICENSE](https://github.com/slidevjs/slidev/blob/v53.1.0/LICENSE) | 의미 구조와 표현 layout 분리, 다양한 presenter/overview, 필요한 부분만 컴포넌트화 |
| Marp CLI | **v4.5.1**, 2026-09-06T00:33:58Z — [공식 release](https://github.com/marp-team/marp-cli/releases/tag/v4.5.1) | [해당 tag MIT LICENSE](https://github.com/marp-team/marp-cli/blob/v4.5.1/LICENSE) | 한 원고·명시적 장별 directive, 버전 고정한 변환, theme의 국소 범위 |

Marp는 생태계와 CLI를 구분한다. 같은 조회의 marp-core latest는 **v4.4.0 / 2026-07-17T20:41:48Z**였다. CLI4.5.1 release의 ‘사용자가 Core v5를 설치했을 때 full entry 우선’ 문구를 Core v5가 공식 latest라는 근거로 승격하지 않았다. 독립 실행/호환성 실험은 하지 않았다.

## 기능을 현재 작업과 연결한 적용/비적용

| 항목 | 공식 자료의 실제 기능 | 현재 ou-presentation의 상태 | 이번 권고 / 잘못 적용한 예 |
| --- | --- | --- | --- |
| 원고와 배치 | reveal은 section+Markdown plugin, Slidev는 Markdown+frontmatter/layout/Vue, Marpit은 YAML/comment directives를 지원한다. [reveal Markdown](https://revealjs.com/markdown/), [Slidev syntax](https://sli.dev/guide/syntax), [Marpit directives 원문](https://github.com/marp-team/marpit/blob/main/docs/directives.md) | `lib/markdown-document.cjs`는 html:false, compose/variant whitelist와 AST를 유지한다. `blocks.js:155` 이후 planner가 구조 적합성을 판단한다. | 새 HTML을 임의 삽입하는 문법을 복사하지 않는다. 기존 compose에서 주역/자료를 먼저 선택한다. 실패 예: Slidev의 `<div class=...>`를 현재 원고에 그대로 붙여 파서가 이해할 것이라 가정하기. |
| 역할별 구도 | Slidev는 layout과 내용을 분리한다. Marpit의 `_` directive는 해당 장에만 적용한다. 위 공식 문법 참조. | H1은 `blocks.js:291`에서 바깥 제목으로 한 번 렌더한다. H2 그룹은 editorial에서 묶인다. centered는 `blocks.css:133–139`에서 동일 폭·중앙 높이로 만든다. 자동이 아니라 현재 원고가 5/12/14/16/18에 명시 선택했다. | 저작 선택을 먼저 바꾼다. H1 없는 media, message/quote, image-first split, primary editorial, gallery/mosaic/bento를 역할에 맞게 쓴다. 실패 예: centered라는 이름만 바꾸고 H2+본문 세 열을 그대로 유지해 ‘역할 다양화’라 집계하기. |
| 자료 확대 | reveal lightbox는 원본 이미지/영상 또는 별도 큰 파일을 overlay로 열고 contain/cover를 선택한다. alt+click zoom도 공식 데모에 있다. [lightbox](https://revealjs.com/lightbox/), [공식 demo](https://revealjs.com/) | media contain과 기존 native 이미지 zoom/focalPoint가 있으나 새 Markdown은 fit/focus 중심이다. arbitrary image-first split은 지원하지만 source에서 문장→이미지→문장을 자동 추출/재정렬하지 않는다. | 첫 시안에서는 읽을 영역을 편집한 자산/후속 장으로 확대해 재현한다. 상호작용 확대가 반복 필요로 입증되면 키보드·닫기·focus 복귀·원본 링크를 갖춘 최소 확장을 별도 검토한다. 실패 예: 잘 읽히지 않는 전체 UI를 작은 썸네일로 두고 클릭 가능하다는 이유로 발표 가독성을 통과시키기. |
| 노트·공개 해설 | reveal speaker view는 notes/current-next/timer, Slidev는 presenter와 overview·notes editor, Marp CLI는 presenter/notes export를 제공한다. [reveal notes](https://revealjs.com/speaker-view/), [Slidev UI](https://sli.dev/guide/ui), [Marp CLI README](https://github.com/marp-team/marp-cli/tree/v4.5.1#readme) | `app.js:1197`은 legacy notes를 읽지만 Markdown-v1은 `lib/markdown-document.cjs:13`에서 notes/appendix/role/sourceDownload를 거부한다. 현재 공개 speaker-script/keynote-notes는 실제 자료이지 private notes 투영이 아니다. overview/current-next는 이미 있다. | 이번에는 실제 공개 대본/정확 anchor로 상세를 이동해 의미를 보존한다. Markdown notes는 추후 독립 요구로 다룬다. 실패 예: 주석에 설명을 넣고 발표자에게만 보이거나 비공개라고 생각하기. |
| 선택적 모션 | reveal auto-animate는 인접 장의 대응 요소를 연결하고 Slidev v-click은 단계 상태를 만든다. [auto-animate](https://revealjs.com/auto-animate/), [Slidev animation](https://sli.dev/guide/animations) | 현재 `CONFIG.md`는 fade/rise/stagger/chart와 완성 상태·읽기/preview/reduced-motion 정적 표시를 명시한다. 수동 단계 공개는 현재 DESIGN 범위 밖이다. | 정지 시안의 주역·자료·관계를 먼저 통과시킨다. 같은 자료의 변화가 실제로 필요한 경우 짧은 전환만 검토한다. 실패 예: 긴 설명을 클릭마다 숨겨 첫 상태만 깨끗하게 만들고 최종 상태/읽기/역방향을 검토하지 않기. |
| 재현성 | Marp CLI는 project-local 설치로 CLI/engine 버전 통제를 권한다. reveal6.0.2는 개발/빌드 Node22.12+ 변경과 focus·Markdown·scroll 수정을 기록한다. Slidev53 release는 Vite/Vue 계열의 별도 실행 기반이다. [Marp 설치](https://github.com/marp-team/marp-cli/tree/v4.5.1#local-installation), [reveal release](https://github.com/hakimel/reveal.js/releases/tag/6.0.2), [Slidev repo](https://github.com/slidevjs/slidev) | 현재 Node>=20, dependencies `markdown-it:15.0.3`, `yaml:2.9.1`, 공통 runtime/CSS와 assets를 hash로 묶는다. | 현재 소스·lock·원자료·실제 캡처 관측을 유지한다. 교체하면 parser/공개 링크/현재입력/모든 모드 계약을 재설계해야 한다. 최신 기능 수 자체를 품질로 보고 엔진을 갈아엎지 않는다. |
| 읽기·접근성 | reveal scroll view는 같은 덱을 선형 읽기로 열고 mobile activation을 둔다. release6.0.2는 화면 밖 장의 keyboard focus 문제를 고친다. [scroll view](https://revealjs.com/scroll-view/), [release](https://github.com/hakimel/reveal.js/releases/tag/6.0.2) | 현재 읽기는 원순서 native 본문과 자료별 support/정확 공개절, 표 내부 스크롤을 쓴다. 축소 SVG는 별도 읽기 접근이 필요하다. | 키보드/현재초점/alt/명도·역할/읽기 원순서를 실검수한다. 이름이 ‘scroll’이거나 framework 기본 제공이라는 이유로 한국어 행·작은 글자·의미 관계 검수를 면제하지 않는다. |

## 다음 제작에서 바로 사용할 경로

1. **저작 선택**: 5의 두 열은 수치 도표로 바꾸지 않는다. `expanded-study.txt`의 동일 공통 질문과 두 교육용 흐름을 자료로 삼아 실제 무엇이 남는지 한 그림으로 편집한다. 7은 현 무방향 세 관계와 ‘요약은 입구’ 의미를 유지하고 실제 논리 문서 정체성을 가까이 둔다. 13은 자료의 세 필드와 읽을 한 행을 유지한다.
2. **현재 renderer 제약**: split은 이미지→연속 문장/목록만 허용한다(`blocks.js:172`, `:349`). 제목을 없애도 의미가 자료 안에 있어야 한다. 필요한 정확 source/quote 조합이 기존 compose로 안 되면 시안에서 부족함을 입증한 뒤 작은 reusable variant를 요청한다. H1을 숨기거나 source와 DOM 소속을 좌표만으로 바꾸지 않는다.
3. **관측 계약**: title/body/관계/지원문서의 실제 위치가 바뀌면 `talks/llm-wiki/qa/keynote-current.json`·`keynote-coverage.json`을 의미에 맞게 이행하고 캡처/metrics를 새로 수집한다. 옛 역할 min-font/레이아웃을 맞추기 위해 좋은 시안을 다시 텍스트면으로 강제하지 않는다. 역사 baseline 실패는 보존한다.

**이번 적용 결정:** 새 dependency/전면 교체는 권고하지 않는다. 현재 엔진의 자료면·주역/보조·원고 구성 경로를 사용한 실제 3–4장 비교가 우선이다. 부분 확대·Markdown presenter notes의 추가는 별도 미확인 요구이며 첫 시안 제작을 막지 않는다. 도구 설치나 새 도구로 렌더한 실물의 품질 검증은 수행하지 않았고, OpenAI가 이 중 어떤 도구를 사용했다는 주장도 하지 않는다.
