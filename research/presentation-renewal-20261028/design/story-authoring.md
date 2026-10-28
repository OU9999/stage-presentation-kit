# 두 실제 Markdown 서사와 작성 비용

작성 B `/root/design_manager/story_designer` · 2026-10-28. 이번 사용자 승인에 따라 기존 두 `talks/*/slides.md`를 전면 재작성했다. 내용은 Markdown에만 작성했고 JSON·HTML·CSS에 다시 입력하지 않았다. 공통 상태는 [WORK_LOG](../../../WORK_LOG.md)에서 관리한다. parser/renderer는 다음 엔지니어링 단계의 구현 대상이며 이 문서가 현재 렌더 성공을 주장하지 않는다.

## 실제 원고와 서로 다른 이야기

[제품 원고](../../../talks/product-notes/slides.md)는 가상 제품의 문제 장면→관찰→기록 정리→검토 원칙→작은 결정→실행으로 이어지는8장이다. [팀 학습 원고](../../../talks/team-learning/slides.md)는 풍경→행위의 여러 시선→사진의 다른 범위→관찰/짐작 구분→함께 남길 질문으로 이어지는8장이다. 예전처럼 표·코드·인용을 각1회 넣은 동일6장 기능 목록을 반복하지 않았다. 원고의 전면 편집은 승인된 범위이며 기존 원고의 모든 문장을 유지했다는 뜻은 아니다.

| 제품 장 | 서사와 의도한 조판 | 실제 선택 |
| --- | --- | --- |
| 1 | 작은 관찰에서 다음 행동으로 · 큰 약속 | 기본 auto, 주황 의미 단위 |
| 2 | 기록하는 장면과3개 관찰 원칙 · 사진+목록 split | 기본 auto, 사진 cover/focus만 |
| 3 | 관찰과 확인할 일 · 넓은 가상 기록 표 | 기본 auto/document, 차트 추론 없음 |
| 4 | 한 장의 문서·남긴 기록24개·다음 행동2개 · editorial | compose1개, primary1개, 파랑/주황 그룹 |
| 5 | 무엇을 이해했는지 말하는 원칙 · 큰 quote | 설정 없이 auto |
| 6 | 상태 문구 하나를 바꾸는 결정 · 큰 선언 | 기본 auto, 초록 의미 단위 |
| 7 | 체크리스트→작은 변경→학습 질문 · 순서 링크 | 설정 없이 auto/document |
| 8 | 작게 바꾸고 다시 보기 · closing | compose1개, 주황 의미 단위 |

| 워크숍 장 | 서사와 의도한 조판 | 실제 선택 |
| --- | --- | --- |
| 1 | 같은 장면에서 다른 질문 · 큰 선언 | 기본 auto, 보라 의미 단위 |
| 2 | 풍경 전체 보기 · 큰 사진 | 기본 auto/media, cover/focus만 |
| 3 | 기록·듣기·적기 ·3사진 gallery | 기본 auto/gallery, cover/focus만 |
| 4 | 넓은 범위·가까운 단서·주변 맥락 ·3사진 mosaic | compose1개, cover/focus |
| 5 | 보이는 것과 짐작을 나누는 원칙 · 큰 quote | 설정 없이 auto |
| 6 | 단서와 모르는 질문 ·2그룹 editorial | compose1개, primary1개, 초록/보라 그룹, 사진 cover/focus |
| 7 | 함께 읽기·제품 장면으로 복귀·외부 원문 · 순서 링크 | 설정 없이 auto/document |
| 8 | 다음 장면에서 다시 묻기 · closing | compose1개, 보라 의미 단위 |

이 조판 명칭은 작성 의도와 합의된 입력 계약을 대조한 것이다. 실제 auto 분류·grid·fit·caption·넘침·모바일 결과는 연결 후 확인해야 한다.

## 원고가 가진 색·사진·출처의 역할

- 주황은 제품의 다음 행동, 초록은 선택한 작은 변경에 사용했다. 중립 표·quote·실행 장으로 돌아오므로 매장 색 순환을 만들지 않았다.
- 제품4장의 파랑 `24`와 주황 `2`는 그룹의 대상 이름에 대응한다. `개`는 strong 밖이므로 중립 단위로 남겨야 한다. 숫자는 가상 편집 예시이고 서로 다른 대상을 세므로 전환율·개선 성과가 아니라고 원고에 명시했다. 표 값을 추출하거나 계산하지 않았다.
- 워크숍6장의 초록 '보이는 단서'와 보라 '아직 모르는 것'은 이름·위치로도 구별한다. 색만으로 의미를 전달하지 않는다. 모든 사진은 원색이며 tint/흑백화를 요구하지 않았다.
- 기존7개 로컬 Pexels 사진 중6종을 재사용했다. 새 이미지를 생성·다운로드하지 않았고 실제 참여자/조사 대상처럼 쓰지 않았다. 작성한 사진은 서로 다른 stock 장면이며 같은 인물·장소의 전후 비교가 아니라고 밝혔다.
- 이미지 title은 caption과 작가/소스이며 제어 문자열로 사용하지 않는다. 두 원고의 끝에는 [기존 공개 크레딧](https://github.com/OU9999/stage-presentation-kit/blob/main/assets/CREDITS.md) 링크를 넣었다. 자체 report.svg는 가상 문서로 표시하고 전체 모양을 회수하는 보조 결과물이지 내부 작은 문구를 읽는 증거라고 주장하지 않는다. gallery의 credit caption은 작가명이 길 수 있으므로 실제 크기와 줄 수를 root의 화면 검수 항목으로 남긴다.

## 정확한 참조 보존

제품의 `./checklist.txt`와 `../team-learning/slides.md`, 학습의 `./reading.txt`와 `../product-notes/slides.md#2`를 유지했다. 외부 Markdown 안내의 목적지 `https://www.markdownguide.org/basic-syntax/`도 유지했다. 학습→제품#2는 새 원고에서도 '관찰할 장면'으로 연결된다. 파일명은 기존 그대로이며 각 원고의 모든 상대 링크·이미지 참조가 실제 존재함을 정적으로 확인했다. root가 비등록 Markdown 링크를 현재 builder가 허용하지 않음을 알려 크레딧만 기존 공개 GitHub 문서로 연결했다. 원고는 이 제약을 우회하도록 엔진 범위를 늘리지 않는다. 출력 assets와 등록 덱의 read 링크 재작성은 후속 builder 검증 대상이다.

## 기본 작성과 추가 선택의 실제 비용

두 원고16장 중 **compose를 직접 지정한 장은5장**(editorial2·mosaic1·closing2)이고, 나머지11장은 compose를 쓰지 않았다. 자동11장의 분류는 연결 전 예정값이며 실제 분류 성공을 뜻하지 않는다. 실제 원고의 editorial은 제품4·학습6 두 장이다. 색·crop까지 포함하면 stage-slide 블록은11개이므로 '선택이5번뿐'이라고 총 작성 부담을 축소하지 않는다.

| 비용 종류 | 제품8장 | 학습8장 | 합계 |
| --- | ---: | ---: | ---: |
| compose 명시 |2|3|5|
| compose 미지정 |6|5|11|
| stage-slide 블록(색/crop 포함) |5|6|11|
| 장 tone 값 |3|2|5|
| stage-group 블록 |3|2|5|
| 그룹 tone 값 |2|2|4|
| primary:true |1|1|2|
| 이미지 참조 |2|8|10|

표의 필드는 중첩되므로 합산해 조작 횟수로 해석하지 않는다. 제목·본문·값·단위·사진 경로·alt·caption은 각 위치에 한 번만 작성한다. 같은 사진을 다른 맥락의 장에 의도적으로 다시 쓰는 것은 별도 내용 권위가 아니다. 작가는 기본 Markdown을 쓰고, 색이 필요한 장의 tone·사진 crop·mosaic/editorial·대표 그룹에만 선택을 더했다. 기존 H2에 group을 묶으므로 문구·값을 별도 schema로 재입력하지 않는다. 시간/클릭 수나 일반 초보 사용자의 숙련 비용은 측정하지 않았다.

## 독립 초안 뒤 직접 교차 검토

A가 제기한6사진+긴 caption의 작은 thumbnail 재발 반례를 수용해 gallery를3사진과 짧은 caption으로 작성했다. 긴 설명은 별도 장에 두었으며 최대 사진 수를 채우는 과제는 만들지 않았다. B는 A에게 editorial의 세로 report를 contain할 때 실제 본문은 작을 수 있으므로 역할을 '문서 전체 결과 회수'로 한정해야 한다는 반례를 보냈다.

A가 실제 원고를 읽고 제품4장의 오른쪽 반높이 그룹에 긴 가상 안내가 넘칠 수 있다는 반례를 보냈다. B는 숨김/자동 축소 대신 저자 편집으로 '가상 수치 · 서로 다른 작업 단위 · 전환율이나 성과가 아닙니다.'로 줄였다. 가상성·단위 차이·비성과 조건은 그대로 남겼다.

A의 최종 [조판 계약](composition-spec.md)과 실제 blocks.css를 읽고 인수했다. split hook(figure.md-media+div.md-copy), editorial 직계 .md-group, primary의 남은 높이 배분, 그룹 H2/strong의 tone, 강조 밖 단위의 중립색과 원고를 대조했다. `.md-value/.md-value-number/.md-value-unit`은 단독 p의 짧은 strong 숫자+단위에만 연결하며 계산/성과 추론을 하지 않는 후속 renderer 계약이다. 일반 첫 strong 문장은 이 처리에서 제외한다. 제목 없는 quote의 빈 grid행 반례는 A 최종 CSS에서 flex column+남은 높이 body로 해소한 것을 확인했다. 실제 cascade/화면 검증을 완료했다는 의미는 아니다.

## 검증과 남은 범위

Node의 yaml·markdown-it으로2원고16장, stage-slide11개·stage-group5개의 키/형식·H2 바로 앞 결속·이미지10참조·로컬 링크 존재를 확인했다. 누락 참조0·허용 밖 키0이다. 현재 제품 parser를 새 문법의 성공 근거로 사용하지 않았다. root 소유의 browser/server를 조작하지 않았고 실제 렌더·390px read·Paper 대비·같은 원고 수정/reload·legacy 회귀·링크 출력까지 통과했다고 주장하지 않는다. 이 항목은 후속 엔지니어링/총괄의 실제 검증에 인계한다.
