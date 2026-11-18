# Round02 제작 인계

round01의4장×양 발표폭은 needs-changes로 보존했다. 이번에는 같은 prototype의 원고와 명시 변형만 교정했다. 최신 미감 우선 권한을 적용했으며 새 화면의 미감 통과를 주장하지 않는다. MODEL.json의2026-11-17T01:12:16Z 선택(gpt-6.1-sol/xhigh/none)을 재사용했다.

B는 렌더 입력과 관련 테스트의 writer를 종료했다. A도 새3SVG와 visual-intent-round02를 마감하고 writer 종료를 직접 확인했다. 남은 실제 화면 수집·빌드·전체 테스트는 root 소유다.

## 현재 원고와 자산

현재 source SHA256은 `8345c2bae7ed5b2c607d9e033e448098cb47868a7b57b96c37c2a94b5791aee2`다. 원고는 `prototypes/talks/first-look/slides.md`, 공개 해설은 같은 폴더의 `materials/notes.md`다. config와 전문 source-pack.txt는 그대로다.

1. **선언:** ‘지식을 남기는 방식이 / 다음 질문을 바꿉니다’. 구두점을 덜고 두 행의 글자 폭을 맞췄다. 명시 message/declaration에서만 강조어의 굵기를 H1과 맞추고 넓은 native 제목을 쓴다.
2. **비교:** A의 answer-window-r02.svg·wiki-window-r02.svg를 참조한다. 두 창의 원래720×420 비율은 유지한다. 실제 가용1416논리px 안의 grid를1260px로 제한해 중앙에 놓고,사이184px·하단 라벨26px로 전체 점유와 라벨 무게를 바꿨다. 이는 원본의 공식 치수라고 주장하는 값이 아니다.
3. **기사와 카드:** A의 condition-article-r02.svg와 ‘문서를 따라 읽고 / 다음 질문에 쓸 / 근거를 찾고 싶다’를 배치했다. 이 문장은 발표팀의 가상 목적 메모를 **재작성한 문장**이며 정확 발췌로 보고하지 않는다. 공개 해설에 원문 전문과 이 구별을 남겼다. 카드와 기사 비례·간격을 바꾸고 인용부호에 곡선형 serif glyph를 명시했다. 실제 모양은 새 캡처가 확인한다.
4. **결과면:** 기존 results의 명시 unframed만 선택한다. 이미지 width100%/height auto와 자동 행 높이로 소스의 원래 비율을 보존하고 재생 프레임의 배경·테두리를 생략한다. 고정25:16이나 cover 크롭은 넣지 않았다. 기존4PNG는 바이트가 동일한1000×640 전체 자료다. 왼쪽 native title/data-field 경로를 유지하며 그리드와 상대 크기를 조정했다.

비교 캡션은 필수 라벨이므로 순수 출처 메타와 구별했다. 실제 비교 성공 plan의 FIGCAPTION에만 `data-copy-role="figure-label"`을 부여하며 FIGURE 소속과 원래 sourceLine을 유지한다. 이 라벨의 읽기 크기는18CSSpx다. 다른 gallery·순수 출처 캡션의 역할과 크기는 바꾸지 않았다. 본편 QA 계약 확대나 가짜 sourceLine 합성은 하지 않았다.

## 정확한 변경 범위

- 원고/해설: `prototypes/talks/first-look/slides.md`, `materials/notes.md`.
- 공용 runtime/입력: `lib/markdown-document.cjs`, `lib/markdown-deck.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, `app.js`, `styles.css`.
- 작은 문법 예: `CONFIG.md`, `MARKDOWN-FIRST.md`.
- 관련 단위검사: `tests/blocks-composition.test.cjs`, `tests/deck-model.test.cjs`, `tests/markdown-document.test.cjs`, `tests/bento-editorial-runtime.test.cjs`.
- 새 정적 근거: `prototypes/source-proof-round02.cjs`, `source-proof-round02.json`와 이 파일.

A의 새 자산/visual-intent는 별도 소유다. 기존 round01 proof runner·결과·인계·원본3SVG·4결과PNG·기존 캡처/리뷰는 덮지 않았다. 기존 proof의9/9는 당시 입력의 역사 결과이며 현재 통과로 승계하지 않는다.

## 실행과 정적 결과

root의 빌드 경로는 같다.

```sh
node bin/ou-presentation.cjs build --config research/devday-rebuild-20261117/prototypes/ou.config.json
node bin/ou-presentation.cjs verify --config research/devday-rebuild-20261117/prototypes/ou.config.json
```

출력은 `prototypes/site/first-look/index.html`, 공개 해설은 같은 덱의 `materials/notes.html`이다. 첫 세 장의 support3절과 결과물 해설 목차·원팩 전문 접근은 유지했다.

관련 순수 단위검사 **135/135 통과**. 선언의 명시 message 전용 조건과 auto/다른 compose의 거절·AST/개행/강조/sourceLine 보존, 비교 라벨 역할과 일반 캡션 불변, unframed의 results 전용 조건·native 제목/media 경로·일반 결과 markup 불변을 확인했다. 첫 실행에서 unknown variant의 기존 warning을 error로 가정한 새 assertion 하나가 실패했고,새 test를 기존 warning 정책과 실제 다른 layout 거절로 구별한 뒤135/135를 확인했다. 제품 계약을 낮춰 통과시키지 않았다.

```sh
node research/devday-rebuild-20261117/prototypes/source-proof-round02.cjs
```

현재 정적 proof는 **10/10**,31입력 SHA를 기록했다. source parse/model issue0·plan warning0,지원 목적지·7자산·재작성 지위·원문 전문·역사 자산 보존을 확인했다. 시작104입력에서 명시 허용한 공용7파일을 제외한 **97입력은 변경0**이다.

이 수치는 실제 곡선 glyph,그리드의 검정 띠 해소,광학적 중심과 자료 식별성의 승인이 아니다. B가 직접 읽은 화면은 round01 양폭8개와 공식 원본4PNG다. 새 합성 화면은 root의 현재 양폭 캡처와 독립 검수로 판정한다. 임의의 세로 압축이나 카드 패딩 균등화를 채택 조건으로 삼지 않았다.
