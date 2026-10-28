# Markdown 조판·사진·색 실제 구현 인계

2026-10-28 · 취합 `/root/engineering_manager/performance_auditor` · 기준 HEAD `cdb88b4`

## 구현 결과와 소유권

일반 Markdown을 기존 STAGE의 큰 선언·사진·split·사진 grid·인용·편집 요약·마무리에 연결했다. 내용은 원고/semantic AST에 한 번 두고 구도·색·crop·대표 H2 그룹만 별도 설정으로 선택한다. 기존 legacy20양식/native8종은 별도 경로로 유지한다. 이번 엔지니어링 구현과 실제 브라우저/독립 미감 인수·최종 생성·배포는 구분한다.

- A는 `scripts/markdown-document.cjs`, `deck-model.js`, parser/model tests를 구현하고 B의 실제 renderer를 읽은 뒤 편집 종료했다. control 원줄 위치·H1/매H2 boundary·AST 불변·focus 규격을 직접 교차 검수했다.
- B는 `blocks.js`, 디자인에서 단독 인수한 `blocks.css`(시작 SHA `e9ee854d…`), `MARKDOWN-FIRST.md`, `tests/blocks-composition.test.cjs`, 이 종합을 작성했다.
- 실제 화면의 공통 crop 반례 뒤 양 매니저/디자인/root가 사진별 focus 배열과 비quiet 여백 회수를 합의했다. A 종료를 확인한 뒤 parser/model 파일의 단독 편집권을 B에게 이양해 최소 QA 교정했다. 원고의 focus 배열 한 값은 디자인 담당이 수정했으며 B가 원고를 편집하지 않았다.
- root는 app/index·기존 generator/사본·최종 presentations·README·브라우저/전체 suite·Git 전달을 소유한다. B는 default build·공유 브라우저·기존 원고/연구/생성물을 수정하지 않았다.

## 실제 작동 계약

| 층 | 구현한 경계 |
| --- | --- |
| parser/model | 첫 내용 앞 여러 줄 `stage-slide`의 compose/tone/fit/focus, H2 앞 `stage-group`의 tone/primary/fit/focus. control을 빈 줄로 대체해 source 위치와 첫 H1 승격을 보존. 기존 legacy stage와 혼용·오타·위험 값·중복 primary는 입력 오류 |
| 그룹 binding | 최종 `slide.blocks`의 start 포함/end 제외로 H2부터 매 다음 H2 직전까지 참조. metadata 없는 H2도 renderer가 같은 범위로 묶고 본문을 복제하지 않음. 앞 안내/표·마지막 그룹 조건도 원순서로 남김 |
| 기본 조판 | 순수 `StageBlocks.planSlide()`가 짧은 H1+p→message, 단일 이미지→media, image-first+후속 짧은 copy→split, 연속 이미지2~6→gallery, 짧은 인용→quote, 그 외 document를 선택. 사실/수치/차트 추론이나 자동 요약 없음 |
| 명시 구도 | auto/message/split/media/gallery/mosaic/editorial/quote/closing/document. 유효하나 부적합한 선택은 document+source 줄 경고로 원문 전체를 보존. 경고는 body dataset으로 root 작성자 점검에 연결. fallback/build 성공을 미감 합격으로 보지 않음 |
| renderer | `renderSlide(slide, options) → {body,composition,quiet,warnings}`. body는 heading1회+markdown-body를 가진 markdown-composition. preview는 구도를 유지하며 링크/scroll focus는 비상호작용 |
| 미디어 | figure.md-media 안 img+원 title의 figcaption, alt/URI/source 위치 유지. 순수 이미지 p는 빈 줄 유무와 무관하게 원순서 figure 확장. 일반 문자가 섞인 p·linked image·앞 설명→이미지→뒤 설명은 추출/재정렬하지 않음 |
| focus | 공통 문자열 호환. 장에는1~6개 좌표 문자열 배열도 허용하고 gallery/mosaic의 원순서 이미지에 각각 연결. 각 좌표0~100% 엄격 검증, group은 문자열 유지. 유효 배열의 count/구도 불일치는 document+경고·모든 미디어 contain·focus 무시. 자동 위치 추정/순환 없음 |
| 색/수치 위계 | 기존 styles.css의 tone-color와 Paper 값을 공유하고 group에서 md-accent를 재선언. neutral은 blocks 전용 예외. editorial의 단독 짧은 strong 숫자+plain 단위 문단만 값/중립 단위 hook을 붙이며 raw 값·선행0·부호를 보존하고 계산하지 않음. 일반 문장/링크는 수치로 바꾸지 않음 |
| CSS/read | presentation은 blocks 안으로 격리, 비quiet top0/bottom48로 빈 eyebrow 예약 회수. quiet는 기존 전체 영역. read에서는 composition/grid/group을 평면 문서로, 사진을 높이 자동/contain으로 복원. 표/code 국소 scroll·이미지 load/error callback 유지 |

두 실제8장 원고의 현재 plan은 제품 `message/split/document/editorial/quote/message/document/closing`, 학습 `message/media/gallery/mosaic/quote/editorial/document/closing`이다. compose 지정5/16과 색/crop 포함 stage-slide11개·stage-group5개를 구분한다. 구도 선택5번을 총 작성 부담5번이나 초보 사용성 실험 결과로 표시하지 않는다.

## 검증한 것

B는 다음 명령으로 **79/79**를 확인했다.

```sh
node --test tests/blocks-composition.test.cjs tests/blocks-runtime.test.cjs tests/markdown-document.test.cjs tests/deck-model.test.cjs
```

범위는 신규 composition12검사+기존 blocks4+parser19+model44다. 주요 반례는 실제16장 AST/원문 불변·gallery/mosaic2~6(같은 p 포함)·원 caption/alt·mixed/linked image·앞뒤 설명·H2 전역 안내/표/마지막 조건·단독 숫자와 일반 강조 구분·preview/source 위치·미디어 callback·focus 공백/배열/범위·mismatch 안전 contain·공유 색/read hook이다. CSS hook/단독 palette 검사는 실제 cascade/가독성 검증을 대신하지 않는다.

매니저는 별도 소유 VM probe의26입력/40장으로 원문/순서·이미지/caption·preview·warning·배열 원순서·count/구도 불일치의 안전 contain을 독립 확인했다. 이는 매니저 실행 결과이며 B 재실행으로 보고하지 않는다. B는 기존 전체210검사나 default build·브라우저를 실행하지 않았다. root의 전체 회귀·동일원고 전후·실제16장 연속/390px/Paper·작성수정/reload·별도 디자인 후검수는 다음 통합 인수 범위다.

## 직접 반례와 교정

1. A의 실제 소스/검증을 B가 읽고 control mask·H1/H2 binding·schema 검증의 필수 정정 없음으로 회신했다. A도 renderer 전체를 읽고 model이 허용한 focus 공백/탭을 renderer가 무시하는 반례를 제시했다. B가 범위를 맞추고 CSS 값만 정규화했다.
2. 매니저의 무빈줄 이미지 p 반례로 pure-image paragraph를 원순서 확장했다. 혼합 일반 문자/linked image는 document에 그대로 둔다. 추가 설명이 있다고 그룹 개수 CSS가 달라지지 않도록 실제 group-count hook을 사용했다.
3. root 실제 사진 QA에서 공통 crop으로 얼굴이 잘린 반례가 나왔다. 새 focus 배열은 이를 작성자가 사진마다 제어하도록 하며, 지원 자체가 얼굴 보존 합격이라는 뜻은 아니다. 디자인 수정 원고와 root 재촬영으로 최종 확인한다.
4. 팔레트10HEX 복제를 제거해 기존 Stage/Paper tone-color를 공유한다. 전체 strong를 숫자로 해석하는 방식은 제외하고 전용 구조만 조판한다. 원값/조건은 삭제하지 않는다.

## 한계·최종 인수

auto는 보수적 구조/길이 기준이다. 긴 한글·복합 자료·과도한 그룹·장문 caption은 실제 layout/독해 검수가 필요하다. 안전 fallback은 내용 손실 방지이며 발표 가독성 합격이 아니다. 실제 원고의 화자/가상성격·단위/조건·출처/링크·색과 이름 대응, crop된 얼굴/관심 지점, 전체 보기/발표자,390px read와 기존 legacy/native 영향은 root/독립 디자인 인수 결과를 따른다. 새 설치·전면 runtime 재작성·추가 노트/부록·원고 역저장·offline/CI 기능은 만들지 않았다.

최종 원고/생성물·브라우저/배포 결과는 root 기록으로 인계하며 이 문서의 Node/정적 검사 성공으로 확대하지 않는다. 엔지니어링 수정은 매니저/root가 요청한 실제 결함을 단독 writer가 교정하는 경계를 유지한다.

문서·공백 검수를 마쳤고 **B는 편집을 종료한다.** 실제 B 편집은 blocks.js/blocks.css, MARKDOWN-FIRST.md, 신규 blocks-composition test, QA 이양 뒤의 parser/model 최소 교정, 이 종합으로 총7파일이다. 후속 통합 기록/이 종합 갱신은 매니저에게 인계한다.
