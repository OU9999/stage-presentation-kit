# Markdown 발표 실제 개선 — 디자인팀 인계

취합 B `/root/design_manager/story_designer` · 2026-10-28. A는 실제 [blocks.css](../../../blocks.css)와 [조판 계약](composition-spec.md)을, B는 두 실제 원고와 [작성 기록](story-authoring.md)을 맡았다. 각각 실질 초안을 만든 뒤 직접 반례를 교환했고 B가 A의 최종 CSS/spec를 읽고 인수했다. 사용자 승인 범위에서 새 구현과 원고 전면 재작성을 진행했으며 이전 감사 자료·공통 로그·다른 제품 파일은 편집하지 않았다. 전체 제품 연결·실제 브라우저 검수·최종 생성·Git 전달은 총괄/후속 엔지니어링 소유다.

## 실제 바뀐 것

검정 캔버스에 제목과 세로 본문만 반복하던 일반 Markdown 경로를, 기존 STAGE의 큰 선언·주역 사진·사진 grid·넓은 자료·인용·결과 묶음·마무리를 사용할 수 있는 조판으로 확장했다. 내용은 일반 Markdown에 한 번 작성하고, 복잡한 배치·crop·의미색·대표 그룹만 작은 설정으로 고른다. CSS와 원고가 작성됐다는 사실과 새 parser/renderer가 연결돼 실제 개선 화면을 인수했다는 사실은 구분한다.

- 제품 원고는 문제 장면→관찰 표→기록의 회수→원칙→작은 결정→실행으로 이어지는8장으로 다시 썼다.
- 학습 원고는 풍경→기록/듣기/적기의 시선→비선형 사진 묶음→관찰/짐작 구분→함께 남길 질문으로 이어지는8장으로 다시 썼다.
- 기존과 같은 표·코드·인용의6장 기능 나열을 반복하지 않았다. 같은16장이라도 매 장의 정보량·시선·자료 역할이 다르게 의도됐다.

## 내용 한 번, 기본 조판과 작은 선택

장 첫 내용 앞 `stage-slide` YAML은 `compose/tone/fit/focus`, H2 바로 앞 `stage-group` YAML은 `tone/primary/fit/focus`만 사용한다. 이는 기존 legacy `stage`와 별개의 이번 신규 제어 문법이다. 제어 문자열을 caption이나 일반 본문에서 빼앗지 않는다. H2 자료의 문장·값·이미지를 JSON으로 다시 쓰지 않으며 source 문단 수·그룹 수·12칸을 강제하지 않는다.

| 기본 구조에서 얻을 결과 | 실제 원고 사례 | 추가 선택 |
| --- | --- | --- |
| 큰 선언 | 제품1/6·학습1 | 필요한 의미색만 tone |
| 사진+목록 split | 제품2 | 사진 cover/focus |
| 넓은 자료/순서 문서 | 제품3/7·학습7 | 없음 |
| 큰 사진 | 학습2 | 사진 cover/focus |
|2~6사진 gallery | 학습3의3사진 | 사진 cover/focus |
| 인용 중심 | 제품5·학습5 | 없음 |
| 주역+보조가 다른 사진 mosaic | 학습4의3사진 | compose·cover/focus |
| H2 혼합 자료 editorial | 제품4·학습6 | compose·primary·그룹 의미색 |
| 큰 마무리와 행동 | 두 원고8 | compose·의미색 |

표의 기본 분류는 원고의 작성 의도와 합의 계약에 따른 예정값이다. 엔지니어링 연결 후 실제 분류·무단 손실 없는 fallback·diagnostic·read를 확인해야 한다.

두 원고16장 중 compose 명시는5장(editorial2·mosaic1·closing2), 미지정은11장이다. 색/crop까지 포함한 stage-slide 블록은11개, stage-group은5개다. '배치 선택5번'을 총 설정 부담5번으로 축소하지 않는다. 별도 profile·HTML·JSON·CSS 내용 재입력은 없지만 실제 초보 사용자의 시간/실수 비용은 아직 측정하지 않았다.

## 색과 매체의 역할

제품은 주황의 '다음 행동', 초록의 '선택한 작은 변경'을 중립 표/quote/실행 장 사이에 둔다. 제품4장의 파랑24개 관찰과 주황2개 행동은 그룹 제목·위치와 연결한다. 단위 `개`는 strong 밖에 두어 중립색을 유지해야 한다. 가상 수치·서로 다른 작업 단위·전환율/성과가 아니라는 안내를 실제 원고에 남겼다. 표를 임의 성과 chart로 변환하지 않는다.

학습은 보라의 질문을 중심으로,6장에서 초록 '보이는 단서'와 보라 '아직 모르는 것'을 이름·위치로도 구별한다. 모든 색을 모든 장에 배분하거나 색을 매장 순환시키지 않았다. A의 Stage/Paper 팔레트 대응과 기본 strong 파랑은 명시 의미 단위의 표현이며 OpenAI 공식 HEX를 복원한다는 주장이 아니다.

사진은 기존7개 로컬 Pexels 중6종을 재사용했다. 자체 report.svg는 가상 문서다. stock 인물을 실제 참여자/조사 대상으로 소개하지 않고 다른 사진을 같은 인물·장소의 전후 비교로 설명하지 않는다. image title은 caption+작가/소스로 보존한다. 두 closing은 [기존 공개 크레딧](https://github.com/OU9999/stage-presentation-kit/blob/main/assets/CREDITS.md)에 연결한다. 비등록 로컬 CREDITS.md를 허용하려고 builder의 Markdown 링크 경계를 확대하지 않았다.

## A/B 직접 협의와 코드 대조

두 실무자는 각각 실제 CSS/실제 원고 초안을 먼저 작성하고 상대 결과를 읽었다.

| 직접 반례 | 실제 반영 |
| --- | --- |
| A:6사진+긴 caption은 작은 thumbnail을 다시 만들 수 있음 | B는3사진 gallery와 짧은 캡션을 작성. 작가명이 긴 caption은 root 실화면 검수로 남김 |
| B:세로 report contain은 내부 문구를 크게 읽는 증거가 되지 않음 | 문서 전체 모양을 회수하는 역할로 한정. primary 면적과 caption이 함께 남는지 후속 검수 |
| A:제품4 오른쪽 반높이 그룹의 긴 가상 안내가 넘칠 수 있음 | B는 저자 편집으로 '가상 수치 · 서로 다른 작업 단위 · 전환율이나 성과가 아닙니다.'로 정리. 조건 삭제/자동 숨김 없음 |
| B/root:첫 strong를 무조건 수치로 추론하면 짧은 강조 문장도 오해 가능 | A가 전용 `.md-value/.md-value-number/.md-value-unit` hook으로 제한. renderer는 단독 p의 짧은 strong 숫자+단위만 조판하고 계산/성과 추론은 하지 않음 |
| 제목 없는 quote를2행 grid로 두면 빈 행과 body 높이가 충돌할 수 있음 | 최종 A CSS의 quote root flex column과 남은 높이 body를 B가 직접 확인. 실제 cascade/화면은 후속 검수 |

B는 실제 blocks.css의 `.layout-blocks` 격리, `.markdown-composition`과 heading 소유, split의 figure.md-media+div.md-copy, `.md-grid`, H2 `.md-group.is-primary`, 그룹 H2/strong의 tone, read의 문서 흐름·이미지 contain 복구를 직접 읽고 원고와 대조했다. primary의 제목/caption을 보존한 남은 높이 배분과 일반86px/반높이72px 값·중립26px 단위의 전용 hook도 인수했다. 이 hook의 실제 생성은 후속 renderer가 연결해야 한다.

## 검증과 인수 경계

B는 yaml/markdown-it으로2원고16장, stage-slide11개·stage-group5개의 허용 키·H2 직전 결속·이미지10참조·상대 링크 존재를 확인했다. 누락 참조0·허용 밖 키0이다. 현재 새 문법을 처리하지 않는 parser의 실행을 성공 근거로 사용하지 않았다. 기존 checklist/reading 첨부·두 원고 상호 링크·학습→제품#2·외부 Markdown 안내 목적지는 유지했다.

후속 구현의 실제 인수 대상은 다음과 같다.

1.16장의 기본 분류와 선택 결과, 메시지·quote·closing의 주역, split/gallery/mosaic/editorial의 사진 면적과 읽을 caption.
2. 제품4의 두 큰 강조·중립 단위·사실 조건과 학습6의 두 범주색/이름 대응, 사진 원색·Paper의 실제 대비.
3. 원고/AST/read 전문·링크·alt·조건·목록/표의 의미 보존, 잘못된 선택의 document fallback과 진단, 실제 원고 수정/reload.
4.390px read의 원고 순서·전체 자료·이미지 contain·표/코드 국소 스크롤과 기존 legacy20양식/native8종·전체보기/발표자의 영향.
5. 같은 원고의 이전/현재 선언·이미지 통제2쌍과 서로 다른 새2서사의 실제 연속 화면. 내용까지 바뀐 새 원고를 CSS 하나의 효과로 주장하지 않음.

이번 B는 브라우저/서버를 조작하지 않았고 렌더·모바일·회귀·실제 작성 사용자 실험·배포까지 완료했다고 주장하지 않는다. 디자인 산출물 인수 후 엔지니어링이 parser/model/renderer/문서를 연결하고 총괄이 실제 검증·생성·commit/push/Pages 확인을 담당한다.
