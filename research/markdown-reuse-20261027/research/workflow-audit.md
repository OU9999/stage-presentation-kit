# Markdown 원본·재사용 흐름 감사

2026-10-27 · `/root/research_manager/react_researcher` · 기준 `main` / `835453787bd3fdf75837a618674e6fb20828ee7a`

## 결론

현재도 Markdown 한 파일에서 발표를 생성할 수 있다. 그러나 **일반 Markdown 문서 하나를 발표와 공유용 읽기 문서로 재사용하는 구조는 아직 아니다.** 현재 compiler는 제한된 Markdown을 기존 슬라이드 데이터 필드로 옮기는 어댑터이며, 읽기 모드는 같은 슬라이드를 연속 표시한다. 새 설계에서는 Markdown을 작성 권위로 두고, 원문 순서와 역할을 보존하는 문서 모델에서 발표·읽기를 생성하고 부록·선택한 공개 원본은 선택 확장으로 두는 경계를 권한다. 이는 제안이며 구현 결과가 아니다.

Vite/React 이행은 도구·UI 선택이고, Markdown 단일 원본과 여러 출력은 작성 계약의 문제다. Node·preview·watch/build·CI를 허용하는 새 지침을 따른다. 과거 무빌드·content.js 한 파일 편집은 호환 경로이며 새 Markdown 설계를 거절하는 근거가 아니다.

## 현행 코드 감사

| 경계 | 직접 확인한 동작 | 재사용 가능/부족 |
| --- | --- | --- |
| 작성 안내 | `README.md:3`, `MARKDOWN.md:3`은 직접 content.js와 선택형 Markdown의 이중 경로를 안내 | 기존 예제를 보존하되 새 Markdown 모드의 주원본·생성물을 명확히 구분해야 함 |
| parser | `scripts/markdown-deck.cjs:10–34`, `:115–207`은 layout별 허용 필드·제목/문단 매핑 | 20개 양식과 모델 검증은 재사용 가능. 일반 prose block/인라인 AST는 없음 |
| 문서 정보 | `:239–255`는 flat frontmatter 6필드, `---` 슬라이드 분리, 기본 statement | 중첩 YAML 아님. frontmatter와 슬라이드 구분선의 위치 의존. 같은 이름의 파일은 같은 fallback id 가능 |
| 미디어 | `:226–236`, `:254–260`, `:295–305`는 선언된 필드만 경로 재계산·실재 검사 | 참조 해석을 재사용. build는 파일을 복사하는 portable 패키저가 아님 |
| 생성 | `:268–314`는 루트 HTML template·5개 공통 runtime을 상대 경로/hash로 참조하고 content.js/index.html 두 파일 기록 | 공통 스타일·native visual을 유지할 수 있음. 공유 문서/부록/source 배포 명세·manifest 없음 |
| 여러 발표 | `scripts/build-examples.cjs:7–16`은 Markdown 5개 slug를 코드에 고정하고 직접 원본 3종을 별도 갱신 | 새 발표를 자동 발견하는 문서 컬렉션 구조가 아님. id/slug/entry/asset 정책 manifest가 후보 |
| 읽기 | `app.js:765–796`은 같은 stage children의 hidden/class와 모드를 갱신 | 모든 장 연속 읽기는 가능하지만 원래 Markdown의 계층·본문·보충설명 투영이 아님 |
| 화면 수정 | `app.js:1248–1268`은 DOM innerText→raw deck 필드, `:915–932`는 visual JSON→검증→원본 객체 갱신 | source span·원고 patch·Markdown serializer가 없어 원고로 돌아가지 않음 |
| 보관/내보내기 | `app.js:1028`, `:1095`는 localStorage 편집본과 content.js Blob 다운로드 | Markdown mode에서 이를 원고 저장이라고 안내하면 다음 build에 수정이 소실될 수 있음 |
| 발표자·자료 | `app.js:1138–1156`은 notes를 발표자에 표시. `showCurrentData():867`는 현재 편집본, direct-deck의 data.html은 disk content.js | notes 역할·같은 수치의 plot/표 재사용은 유지하되 공개 출력과 원본 공개는 별도 정책 필요 |

현재 compiler는 검증·미디어 확인 후 쓰기를 시작하고 같은 입력에서 시각을 넣지 않는다. 이를 새 빌드의 입력 오류 보존·결정적 출력 원칙으로 재사용한다. 다만 여러 파일 쓰기의 트랜잭션이나 전체 컬렉션 원자적 교체를 구현했다고 주장하지 않는다.

## 순수 메모리 재현

2026-10-27 Node에서 현행 `parseMarkdown()`를 `require()`하여 아래 입력을 직접 실행했다. 제품·원고·생성물을 쓰지 않았다. 전면 브라우저 검증이나 새 parser 구현 검증이 아니다.

| 입력 | 실제 결과 |
| --- | --- |
| `# 작은 발표` + 일반 문단 | 성공: `layout: statement`, `title`, `subtitle` |
| `## 소제목` | 오류: 단일 `#`만 지원 |
| 기본 장의 `- 핵심 하나` | 오류: 목록 자동 변환은 demo.steps만 지원 |
| 기본 장의 `![설명](plot.png)` | 오류: statement는 Markdown 이미지 표시 불가 |
| pipe 표 / `> 인용` | 오류: 해당 본문 문법 지원 안 함 |
| `js` code fence | 오류: stage JSON fence만 지원 |
| `# **강조**와 [링크](https://example.com)` | 성공하지만 제목 문자열에 문법 기호 그대로 보존 |
| `본문은 <b>그대로</b>.` | 문자열 그대로 보존; 일반 HTML 본문으로 파싱하지 않음 |
| `/talks/alpha/slides.md`, `/talks/beta/slides.md` | frontmatter id가 없으면 둘 다 id `slides` |

fallback id가 같아도 현재 localStorage 키에는 pathname이 함께 있어 즉시 충돌한다고 단정할 수 없다. 그러나 경로 이동·복사·공유 링크·새 컬렉션 식별에서 안정된 deck/slide id를 별도로 정할 이유가 된다.

재현 방식:

```js
const { parseMarkdown } = require('./scripts/markdown-deck.cjs');
parseMarkdown('# 작은 발표\n\n짧은 설명입니다.');
parseMarkdown('# 제목\n\n- 핵심 하나'); // 현재 오류
parseMarkdown('# 제목', { sourcePath: '/talks/alpha/slides.md' }).id; // slides
```

## 제안하는 단일 원본 경계

1. **Markdown을 작성 원본으로 지정한다.** 새 모드에서는 Markdown+참조 자산/필요 데이터만 수정하고 content.js/index/read는 생성물로 둔다. 기존 content.js 프로젝트는 legacy 입력 어댑터로 계속 처리할 수 있다. 한 deck 안에 양쪽을 동시에 편집 권위로 두지 않는다.
2. **문서 모델을 슬라이드 필드보다 앞에 둔다.** heading·paragraph·list·image·quote·table·code와 inline 의미를 원문 순서·source 위치·안정 id로 보존하고, 명시 구분선/역할을 이용해 발표 투영을 만든다. 기본 본문 구도는 기존 STAGE의 타이포·색·여백을 사용한다. 현 20양식에는 임의 blocks가 없으므로 parser뿐 아니라 최소 본문 모델·renderer 확장이 필요하다. 그 크기는 엔지니어링 검토 대상이다. 새 브랜드나 무제한 자동 layout 추론을 만들지 않는다.
3. **발표와 읽기를 구분한다.** 발표는 저밀도 장면, 읽기는 같은 청중용 본문·자료를 문서 흐름으로 보존한다. 긴 내용은 원고에서 명시한 보충설명/부록으로 분리하거나 overflow를 진단한다. 내용을 자동 삭제·요약·축약하지 않는다. 선택한 레이아웃과 native visual은 기존 모델 어댑터를 통해 재사용한다.
4. **역할은 명시하고 기본값은 제안으로 둔다.** 발표·읽기의 일반 본문, 부록 자료, 발표자 notes를 구분한다. 기본 제안은 notes를 청중 출력에서 제외하고 부록은 공유용 읽기의 별도 구역으로 포함하는 것이다. 역할 구문의 최종 명칭과 부록 포함 정책은 팀 합의/후속 확정 대상이다.
5. **공유는 공개 투영이다.** 내부 단일 원본이라고 원본 파일을 자동 공개하지 않는다. 기본 제안은 발표+청중 읽기만 공개하고 원본 Markdown/첨부 다운로드는 opt-in이다. 원본에 notes가 있으면 숨긴 UI만으로 비공개가 되지 않으므로 공개 projection에서는 생성 데이터·페이지·다운로드 artifact에 포함하지 않는다. 원본 공개를 선택할 때 notes 포함 원본인지 제외한 공개본인지 명시한다.

## 화면 편집과 source 분기 방지

가장 작은 새 모드는 **Markdown 수정→preview/build**, 화면에서는 발표/읽기만 하는 방식이다. 화면 편집을 유지한다면 source 저장기가 준비되기 전에는 임시 preview draft로 표시하고 원본에 반영되지 않음을 알린다. content.js 다운로드는 legacy/호환 출력이며 Markdown 저장이 아니다.

후속 확장으로 source span/id를 이용한 명시 field patch나 Markdown 원본 편집기를 붙일 수 있다. 이 경우 frontmatter·주석·원문 줄바꿈·표·code·notes·알 수 없는 확장 보존, 동시 외부 수정 충돌, 취소/undo와 재빌드 일치를 검증해야 한다. 현행 구조화 deck 전체를 Markdown으로 되돌리는 자동 역변환은 구현돼 있지 않으며, 역변환을 약속하는 것보다 저장 가능한 범위를 좁혀 정의하는 편이 현실적이다.

## 다중 발표·공유 재사용 제안

작은 컬렉션 목록 또는 경로 규칙에 deck id, slug/원고 경로, 공통 스타일 참조, 출력 entry와 공개 옵션을 둔다. 한 발표의 id는 파일 basename만으로 만들지 않는다. 기존 숫자 #n 링크를 기본 호환으로 유지하고, 장 삽입 뒤에도 유지할 영구 slide anchor는 선택 확장으로 둔다. 일반 작성자에게 모든 장의 id 설정을 요구하지 않는다. 목록/경로 규칙의 구체 형식은 구현팀 결정 사항이다.

공통 runtime/theme은 중앙에서 유지하고 개별 발표에는 원고·자산·선택 설정을 둔다. 웹 컬렉션은 공유 자산을 재사용하고 portable 산출물은 필요한 runtime·자산을 모아 복사할 수 있게 한다. **공통 스타일 업데이트와 원고 내용 변경을 분리**해 한 원고를 새 주제로 복사해도 runtime을 직접 고치지 않게 한다. Node 도구나 CI는 작성 편의이며 보는 사람에게 필수 설치를 요구하지 않는 출력은 선택할 수 있다.

## 기존 조사 재사용과 한계

- [Vite·React 결과](../../vite-react-20261027/RESULT.md)의 공통 모델/경량 재생기/독립 작성 UI와 DOM 소유권 구분을 재사용한다. 이번에는 원본을 content.js로 고정하지 않고 Markdown 중심으로 재정의한다. 프레임워크 교체는 이 작성 계약을 대신하지 않는다.
- [글 배치 공동 권고](../../type-layout-20261025/manager/final-decision.md)의 제목·설명 읽기 폭, 명시 wide/split, 원문 줄바꿈, 모바일 native 내용·표를 재사용한다. 모든 Markdown을 제목 카드 하나에 강제로 넣는 방식은 피한다.
- [native 자료 구조](../../visual-redesign-20261024/engineering/contract-proposal.md)의 동일 자료→그림·강조값·표를 재사용한다. 일반 표를 자동 차트로 추론하는 기능과는 구분한다.

새 공식 문서를 조사하거나 제품·기존 원고·Git·브라우저·배포를 변경하지 않았다. 실제 새 문법 변환/산출물 경로와 보존 검증은 엔지니어링팀이 이어서 확인할 작업이다. 단일 작업 상태는 루트 `WORK_LOG.md`를 따른다.
