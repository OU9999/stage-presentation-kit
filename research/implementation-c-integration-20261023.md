# C안 제품화의 최종 통합 확인

2026-10-23. 총괄이 개발팀 결과를 취합한 뒤 별도 브라우저 탭과 복사한 발표 폴더로 확인했다. 담당자·상태는 [WORK_LOG.md](../WORK_LOG.md), 설계와 팀별 검증은 [개발팀 보고서](implementation-c-20261023.md)에 기록한다.

## 결과와 재사용

[현장 구성 4번](../examples/devday-compositions/index.html#4)에 승인된 C안을 적용했다. 불균등한 12슬롯, 오른쪽 큰 표지, 문서·인용·개념도·열린 작업 UI의 서로 다른 표면을 유지한다. 수치와 과정의 경계는 약한 중립선으로 처리한다. 같은 주제의 관찰 → 주제 → 다음 행동을 연결하며 기존 사진·수치 타일도 계속 사용할 수 있다.

`bento`의 `variant: "editorial"`과 구조화한 `artifact` 8종으로 구현했다. 사용자 문장은 HTML의 편집 필드이며, 기본 그림·파형·도구 아이콘은 공통 렌더러가 그린다. 주제마다 렌더러나 SVG를 수정할 필요가 없다. [한 장 스타터](../examples/editorial-starter.js)를 복사한 발표 폴더의 루트 `content.js`로 교체하거나, [Markdown 원고](../examples/devday-compositions/slides.md)의 4장을 바꿔 쓴다. [빠른 시작](../README.md#c안으로-빠르게-시작하기), [필드 계약](../CONFIG.md#c안처럼-한-이야기로-엮기), [배열 순서](../MARKDOWN.md#편집형-혼합-타일-c안)를 연결했다.

## 총괄의 독립 확인

macOS Chromium154, ego-browser Space8의 p2에서 실행했다. 개발 매니저의 p1 및 이전 사용자용 Space4·5는 별도다.

| 범위 | 실제 확인 | 근거 |
| --- | --- | --- |
| 제품 C | 최종 런타임을 새로 열어 12타일·8결과물·43편집 필드, 사진 로딩, 작성자 점검 숨김, Console·Network 실패0 확인. 원래 Field Notes 문구로 확인했다. | [최종 화면](evidence/c-integration-20261023/production-c-final.png), [표시·자원 영수증](evidence/c-integration-20261023/production-final.json) |
| 다른 주제로 복사 | 별도 폴더에 공통 런타임·HTML·스타터와 사진만 복사했다. Node 빌드 없이 릴리스 회고의 다른 제목·수치·발견으로 12타일·8종·42필드가 표시됐다. | [스타터 실제 화면](evidence/c-integration-20261023/starter-edited.png) |
| 직접 편집·저장·복원·내보내기 | 내용 편집 버튼으로 표지 첫 줄을 `Sprint`, 발견 첫 행을 `조건을 먼저 보여줘요.`로 입력했다. 저장 후 새로고침으로 복원했고, 실제 다운로드한 `content.js`를 VM으로 읽어 두 값이 같은 중첩 필드에 있음을 확인했다. 최종 런타임 해시로 복사본을 갱신한 뒤 복원·실제 다운로드를 다시 확인했다. 점검·Console·Network 실패0. | [최종 스타터 영수증](evidence/c-integration-20261023/starter-reuse.json) |
| PDF | 최종 예제에서 배경을 포함해 7장 PDF를 다시 생성했다. pdfinfo로 7페이지를 확인하고, 4번을 Poppler로 렌더해 표지·문서·사진·아이콘·한글·하단 출처와 타일 경계를 직접 검수했다. 잘림·겹침·빈 미디어 없음. | [PDF](../output/pdf/devday-compositions.pdf), [PDF 4번 렌더](evidence/c-integration-20261023/pdf-page-4.png) |
| 갤러리·미리보기 | C의 실제 1600×900 슬라이드를 캡처하고 갤러리 쿼리를 새 이미지 해시로 교체했다. 갤러리의 5이미지 로딩·스타터 링크·가로 넘침 없음을 확인했다. 다섯 결과의 1600×1170 모음 이미지도 새 C로 갱신하고 직접 열었다. | [갤러리 영수증](evidence/c-integration-20261023/gallery-final.json), [C 미리보기](../examples/previews/devday-compositions.png), [다섯 결과](../examples/previews/collection.png) |

복사 QA는 `output/c-implementation-qa-illWJg/`의 고유 id·경로를 사용했다. 제품 원고를 덮어쓰지 않았으며 사용자의 다른 발표 저장 키를 조작하지 않았다. 초기 기다림 두 건은 존재하지 않는 CSS 클래스와 여러 status 중 첫 요소를 선택한 검증 도구의 선택자 오류였고, 실제 페이지 상태를 확인한 뒤 올바른 선택자로 계속했다. 제품 실패로 집계하지 않는다.

## 자동 검사와 생성 일치

총괄이 최종 코드에서 `node --test tests/*.test.cjs`를 직접 실행해 **163통과, 실패·skip 0**을 확인했다. 기존111개, 신규 런타임43개·작성9개다. `git diff --check`도 통과했다. 개발팀은 Markdown 5개·35장 생성과 연속 생성 10파일의 바이트 동일을 확인했다. 총괄도 루트와 예제 HTML의 공통 자원 해시18/18 및 갤러리의 미리보기 해시 일치를 별도 검사했다. 작성 가이드5개·개발 보고2개·작업 로그의 실제 로컬 링크 대상도 확인했다. 총괄의 최종 브라우저 응답은 아래 공통 자원을 사용한다.

| 파일 | SHA-256 식별값 |
| --- | --- |
| `app.js` | `cb1b9721b0bc2897c5c0c44c959d2d967f4d5a3f272a7824c7c544863ac21d3a` |
| `styles.css` | `819c38f3e3ec0f5bcb35b8a6094a4bafc3ae8a2a5cdad377923caa1de2acf545` |
| `deck-model.js` | `df2624fd79a3c03a580c7bfc48b192756bc640d3fa0688a084638c4a62bd1dc7` |
| `examples/previews/devday-compositions.png` | `d2384ff6d328b08b86f446bd8b9ef5b899f82312089bce0c8f6dfb505826cdae` |
| `examples/previews/collection.png` | `56ded48ec589649a5028e975ae2b637a76b55213635b51c4b1dfb3780d105626` |
| `output/pdf/devday-compositions.pdf` | `453b1a63cff58daa4bb990b7967c06fca8ae0bfc151f3ae65c0e88961666696a` |

## 팀 검증과 한계

개발 매니저는 실제 세 테마 전환, 390px 발표·읽기 전환, 편집·복원·다운로드, 긴 문장의 정확한 필드 경고, 발표자 창의 양방향 이동, 인접 장과 `file://` 오프라인 재생을 별도로 확인했다. [행동별 근거와 한계](implementation-c-20261023.md#매니저의-실제-브라우저-검증)를 확인한다.

이번에는 전체55장을 다시 탐색하지 않았다. PDF 전체7장을 모두 시각 검수했다는 뜻도 아니며, 바뀐 C의 4번을 렌더 검수했다. 물리 휴대전화·다른 브라우저·프로젝터·발표 거리에서의 측색과 가독성은 미검증이다. 작은 화면에서 본문을 읽을 때는 읽기 모드를 사용한다. 브라우저에서는 문장을 편집하며, 항목 수·사진 경로·배치 옵션은 Markdown/params에서 바꾼다.

커밋·업로드는 하지 않았다. 기존 서버 PID67305의 cwd와 localhost4317 리스너·제품 HTTP200을 확인했다. Space8은 검증을 마치고 제품4번의 p2만 사용자용으로 남겼다. 이전 Space4·5는 보존했다.
