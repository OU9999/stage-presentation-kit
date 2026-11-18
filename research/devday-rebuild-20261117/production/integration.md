# 첫 실물 인계

2026-11-17의 미감 우선 권한으로 원고를 새로 편집했다. 기존 본편과 과거 승인·반려 기록은 보존했다. 이 문서는 제작 인계이며 미감 승인이 아니다.

입력은 동결했다. B는 원고·공개자료·공용 코드·문법 문서·테스트 쓰기를 종료했고, A도 자산과 visual-intent의 writer 종료를 직접 통보했다. 이후 변경은 manager가 범위를 다시 열 때 진행한다.

## 실행

저장소 루트에서 root가 실행한다.

```sh
node bin/ou-presentation.cjs build --config research/devday-rebuild-20261117/prototypes/ou.config.json
node bin/ou-presentation.cjs verify --config research/devday-rebuild-20261117/prototypes/ou.config.json
```

출력은 `prototypes/site/first-look/index.html`과 `read.html`이다. 자료는 같은 덱의 `materials/notes.html`에 연결된다. 첫 세 장은 명시 support가 해당 절로 연결되며, 기존 results를 쓰는 네 번째 장의 상세는 공개 자료 목록과 해설 목차의 ‘다음 작업의 모양’에 있다.

## 실제 입력과 편집

- `prototypes/ou.config.json`
- `prototypes/talks/first-look/slides.md` — native 메시지, 동등한 두 창, 기사와 인용 카드, 좌측 주장과 우측 네 결과면의 네 장이다.
- `prototypes/talks/first-look/materials/notes.md` — 원문에서 선택한 부분, 발표용 재작성, 비교의 한계와 자작 예의 지위를 설명한다.
- `prototypes/talks/first-look/materials/source-pack.txt` — 기존 expanded-study.txt와 바이트가 같은 전문이다.
- 실제 참조 자산은 `prototypes/assets/answer-window.svg`, `wiki-window.svg`, `condition-article.svg`, `output-plan.png`, `output-map.png`, `output-question.png`, `output-brief.png`다. PNG는 root가 A의 실제 자작 HTML을 각각1000×640으로 캡처했다. 실모델 성과나 외부 제품 화면이 아니다.

원본 Codex90/210/1200·Keynote1440/1455/1500, 현재 main04 전20 보드와5/13/15 개별을 직접 열었다. 이전5의 절차 상자와 긴 발췌 대신 같은 크기 두 창의 작업 형태를 비교한다. 이전15의 밝은 메모와 긴 검정 인용을 어두운 기사면·밝은 짧은 인용으로 바꿨다. 이전13의 큰 워크시트 한 면 대신 서로 다른 실제 자작 결과면을 제시한다. 메시지는 제목과 강조를 native 글자로 유지한다.

## 좁은 공용 변경

B가 승인받은 파일만 수정했다: `lib/markdown-document.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, `CONFIG.md`, `MARKDOWN-FIRST.md`, `tests/blocks-composition.test.cjs`.

`split + quote-card`는 기존 evidence와 같은 원고 조건에서만 반전색 native 인용 카드를 쓴다. 인용부호의 색은 기존 tone에서 받는다. `gallery + comparison`은 각각 독립된 이미지 문단 정확 두 개만 받아 원본 비율의 동등한 프레임과32px native 하단 라벨을 쓴다. 두 변형의 표현 CSS는 발표 모드에만 적용한다. 주제 ID나 한국어 문구 조건은 없다. 기존 evidence·일반 split·auto·gallery·strip의 선택과 원문 AST·순서·sourceLine·읽기는 유지한다.

## 확인한 범위

`node --test tests/blocks-composition.test.cjs tests/markdown-document.test.cjs tests/deck-model.test.cjs`: **88/88 통과**. 새 변형의 허용·거절, 내용 유실 없는 fallback, 원문 소속·개행·강조·순서와 기존 일반 구도를 확인했다. B는 build·browser·capture·전체 테스트를 실행하지 않았다.

`node research/devday-rebuild-20261117/prototypes/source-proof.cjs`: **9/9 통과**, 현재30입력의 SHA를 `source-proof.json`에 기록했다. 네 역할의 실제 parse/plan에 issue와 warning이 없고, 참조7자산·support3절·결과물 해설절·원팩 전문과 정확한 연속 부분 인용이 존재한다. 시작104입력 중 명시 변경한 공용4파일을 제외한100입력은 바이트가 그대로다.

남은 판단은 실제 합성 화면이다. 인용 카드의 행·광학적 여백과 기사면의 비례, 비교 창과 라벨의 무게, 네 작업면의 실제 화면 내 식별성, 앞뒤 흐름은 root의 양 발표폭 캡처와 독립 검수가 확인한다. 기술 결과를 미감 승인으로 사용하지 않는다.
