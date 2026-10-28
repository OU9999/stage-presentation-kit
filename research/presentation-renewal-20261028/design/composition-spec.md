# Markdown 조판 구현 계약과 CSS 인계

담당 A `/root/design_manager/visual_auditor` · 2026-10-28. 실제 구현 파일은 [blocks.css](../../../blocks.css)다. 기존 `styles.css`·`visual.css`·20양식·native8종은 수정하지 않는다. 이전 두 감사 폴더도 읽기 전용으로 보존했다. 현재 지침과 상태는 [WORK_LOG.md](../../../WORK_LOG.md) 하나에서 관리한다.

## 실제 작성한 구도

CSS는 기존1600×900 무대를 사용한다. renderer가 반환한 `.markdown-composition` 안의 `.slide-title.md-heading`과 `.markdown-body`를 조판하고, app이 붙이는 `article.layout-blocks[data-composition]`으로 구도를 선택한다. 제목은 renderer가 한 번만 생성한다. 아래 크기는 STAGE의 독자 구현값이며 OpenAI 공식 규격이 아니다.

| composition | 실제 CSS 동작 | 작성·렌더 경계 |
| --- | --- | --- |
| auto / document |72px 제목,29px/1.6 본문, 열린 표·코드와 충분한 읽기 폭 | auto 분류는 renderer 담당. CSS가 문장·수치를 추론하지 않음 |
| message |118px 큰 제목, 중앙 배치,30px 맥락·24px 후속 안내 | 짧은 제목/문단의 안전 분류. 본문·가상 성격·출처를 숨기지 않음 |
| quote |70px 인용을 주역으로,38px 선택 제목·25px 귀속/보충문 | 제목이 없는 인용도 전체 높이에서 중앙으로 배치 |
| closing |110px 마지막 메시지·30px 설명·의미색 링크 | 끝 행동과 링크는 원문 그대로 유지 |
| split | image-first `.md-media + .md-copy`를 약52:48로 배치,48px 간격 | 이미지 앞/뒤 문단을 무단으로 합쳐 DOM순서를 바꾸지 않음. 복합 형태는 document fallback 가능 |
| media |54px 제목과 남은 높이를 채우는 큰 미디어, 짧은 caption | UI/문서 기본 contain, 사진 cover는 명시 선택 |
| gallery |2~6개 같은 크기 사진.2개는2열,3개는3열,4개는2×2,5~6개는3열2행 | 사진의 원래 색과 caption 유지.6사진에서 모든 세부를 읽을 수 있다는 보장은 아님 |
| mosaic |2~6개 불균등 격자. 첫 미디어를 큰 앵커로 두고 나머지를 보조 크기로 구성 | DOM은 원순서. 시각 위치는 편집형 관계이며 시간순서를 새로 추론하지 않음 |
| editorial | H2 `.md-group`을 열린3열 격자에 배치. `.is-primary`는2열폭,3그룹이면2행높이.2그룹이면좌우 배치 | 고정 그룹 수·12슬롯은 없음. 긴 그룹은 실제 높이/diagnostic으로 확인하며 자동 삭제·말줄임 없음 |

group은 미디어·짧은 글의 자체 표면을 유지하고, 얇은 중립 상단선만 쓴다. 모든 그룹을 같은 불투명 카드로 감싸지 않는다. primary는 flex column으로 제목·caption 뒤의 **남은 높이**에 이미지를 맞춘다. 고정390px 그림을 제목 아래 추가해 높이가 넘는 초기안을 수정했다.

## 입력과 DOM hook

장 첫 내용 앞 `<!-- stage-slide` YAML은 `compose/tone/fit/focus`, H2 바로 앞 `<!-- stage-group` YAML은 `tone/primary/fit/focus`를 사용한다. 의미 내용·이미지 경로·title caption을 설정에 복제하지 않는다. 이 구문의 parser/모델 연결은 후속 엔지니어링 구현이 담당한다.

- `StageBlocks.renderSlide(slide, options) → {body,composition,quiet}`. body는 전체 `.markdown-composition`이고 app이 기존 `.slide-body` 안에 넣는다.
- 미디어는 `figure.md-media[data-fit] > img + figcaption`이다. img의 object-position만 검증된 focus inline값을 받는다. caption은 이미지의 Markdown title 그대로다.
- gallery/mosaic은 `.md-grid`의 직접 자식 `.md-media`를 원순서로 렌더한다. count 속성이 없어도 `:has()`와 자식 수로2~6개를 배치한다.
- split의 `.md-copy`는 이미지 뒤에 연속된 목록/문단만 담는다. 새로운 hook을 manager와 B에게 직접 전달했다.
- editorial은 `.markdown-body`의 직접 자식 `.md-group[data-tone]`, 선택 `.is-primary`다. group의 H2·본문·사진은 원순서다.
- 숫자 강조 전용 hook은 `p.md-value`, `strong.md-value-number`, `span.md-value-unit`다. renderer가 **단독 문단의 짧은 strong 숫자+단위 형태**에만 부여한다. 숫자 계산·합계·성과/인과 추론이 아니다. 일반 문장 안의 첫 strong를 무조건 키우는 초기 CSS는 제거했다.86px 숫자·26px 중립 단위,3그룹의 반높이 보조영역은72px 숫자를 쓴다.
- message/quote/closing의 quiet는 footer 메타를 숨기는 app 신호다. CSS로 원문 본문을 숨기는 신호는 없다.

발표 CSS는 `.layout-blocks`에 격리했다. 기존 `.stage-document-links`14px/740px이하11px 두 규칙은 공통 header 계약이므로 그대로 보존한 유일한 기존 UI 예외다. 새로운 전역 palette·레이아웃 규칙을 추가하지 않는다.

## 색과 읽기

기본 strong/em은 실제 파랑 `#24A8FF`, Paper는 `#275F89`다. 장 tone과 group tone으로 orange/purple/blue/green/yellow/neutral을 선택한다. group의 H2와 강조만 해당 색을 사용해 같은 화면의 관찰 파랑·다음 행동 주황을 분리한다. 단위·caption·출처는 중립 밝기를 유지하고 사진·UI에 필터/틴트를 씌우지 않는다. 의미색의 정확한 값은 기존 STAGE palette의 재사용이며 원본 행사 실측값이 아니다.

read에서는 `.markdown-composition`·`.markdown-body`·`.md-grid`·`.md-group`을 block document 흐름으로 복구한다. 모든 사진은 `height:auto;max-height:none;object-fit:contain`으로 원본을 보여주며 crop이 원문 내용을 가리지 않는다. 원문/캡션/링크/alt·논리순서는 renderer가 유지한다.390px은34px 제목·18px 본문·16px 표·15px 코드·23px 인용·14px caption이며 표/코드만 자기 영역에서 스크롤한다. 내용의 자동 축약·은폐나 전체 무대 축소를 읽기 대안으로 쓰지 않는다.

## 직접 반례와 수정

B의 두 원고를 실제 읽었다. product editorial은 report primary와 파랑/주황 두 수치 그룹을 사용하고, team은 큰사진→3사진 gallery→3사진 mosaic→인용→2그룹 editorial로 다른 리듬을 사용한다. A는6사진+긴caption이 다시 thumbnail 문제가 될 수 있다는 반례를 전달했고 B는3사진·짧은caption을 택했다.

product의 오른쪽 반높이 영역에서 긴 가상/단위/비성과 문단이 넘칠 수 있다는 A·manager·root 반례에 B가 사실 성격을 유지한 짧은 문장으로 저자 편집했다. CSS도 해당3그룹의 보조본문을22px, 제목28px, 숫자72px로 구분한다. 문서를 숨기거나 임의 축소해 통과시키지 않는다.

B와 root는 모든 첫 strong를 숫자처럼 키우면 일반 강조문장을 오인한다는 반례를 제시했다. 이를 수용해 `.md-value` 전용 hook만 사용한다. B의 report는 문서 전체의 결과 모양을 회수하는 역할이며 내부 작은 글 전체를 읽는 근거라는 주장을 하지 않는다.

## 검증과 후속 인수 경계

이 단계는 실제 CSS와 사양 작성이다. git 공백 검사와 selector 범위/구도 hook/괄호 균형을 정적으로 확인한다. 제품 renderer는 아직 이 hook을 만들기 전이므로 이 단계의 CSS 존재를 실제 화면 합격으로 보고하지 않는다. 직접 브라우저·서버를 조작하지 않았고 CSS parser·layout engine으로 렌더 검증했다고 주장하지 않는다.

최종 정적 확인 결과는 rule line132개에서 예외 UI2규칙 외 예상 밖 전역 selector0, 블록 괄호 균형 정상,8개 구도 selector와 `.md-copy`·value·primary·caption hook 존재,문서 로컬 링크2개 누락0, `git diff --check` 통과다. 이는 CSS 문법 전체·실제 cascade·레이아웃 적합성 검증을 대신하지 않는다. no-H1 quote의 빈 grid행 반례는 quote root를 **flex column**으로 바꾸어 제거했고 body가 남은 높이를 받도록 했다.

후속 엔지니어링은 parser/모델·renderSlide·`.md-copy`·`.md-value`를 연결하고, root는 동일원고 전후·두8장 서사·Paper·390px read·원고수정·gallery/mosaic2~6개·긴 한국어/표/code·overview/presenter를 실제 검증한다. 특히 product editorial 반높이 수치조건·primary caption, team mosaic 사진 crop, message 긴 제목과 quiet footer를 인수 게이트로 둔다. 미감 검수 뒤 CSS가 필요하면 엔지니어링의 단독 인수 후 같은 파일을 교정한다.
