# A 시안 — 무대 중심 글 배치

담당 `/root/design_manager/apple_openai_typographer`. 소유권은 이 폴더이며 제품 코드는 수정하지 않는다. [실제 독립 시안](prototype.html), [공식 장면 근거](sources.md), [공통 평가 기준](../manager/criteria.md).

## 초안

공통 corpus의 opening/funnel/weekly/journey 네 장 원문과 실제 StageVisual 데이터 렌더러를 그대로 사용한다. 동일 원고의 독립 B 시안과 비교한다. 기본 1600×900에서는 제목74px/1.16, 최대읽기폭1120px, 설명27px/1.5·최대1040px, 왼쪽112px을 시작점으로 둔다. cover의 원래 title 배열만 명시적 두 줄을 유지하며 124px/1.11을 쓴다. 보통 제목을 임의로 잘라 넣거나 CSS 때문에 문장을 고치지 않는다.

split은 제목과 설명을 전폭 상단에 두고 아래에서 hero310px+차트를 분리한다. wide는 도표를 가로로 열고 hero를280px 트랙으로 제한한다. 긴 강조값이 들어오면 제목 폭을 줄이는 대신 별도 행으로 재배치한다. 원문을 하드 문자수로 반려하거나 잘라내지 않는다. 설명/강조값/표는 같은 원본에서 도출한다. 인위적 외곽 패널은 없다.

모바일은 DOM 글35px/1.28·설명17px/1.65, 도식23px를 실제 읽을 수 있는 세로 흐름으로 배치한다. 차트는 전체 추세를 보조하고 실제16px HTML표를 열어 세부값을 보존한다. 작은 SVG 축만 보고 모바일 성공이라고 하지 않는다. 편집 버튼은 제목/설명 contenteditable을 켜며 숫자는 공통 corpus 데이터에 따른다. 이 시안 편집은 저장/다운로드 제품 구현을 대신하지 않는다.

순서 재생은 메시지240ms→증거280ms/160ms delay의 검토용이다. 기본은 완성된 정적 상태이고 reduced-motion에서는 애니메이션을 제거한다. 실제 제품에서는 기존 slide.motion을 사용하고 새로운 필수 전달 경로를 만들지 않는다.

## 1라운드 — 같은 네 장 A/B 직접 비평과 수정

상대 `/root/design_manager/anthropic_editorial_typographer`의 실제 HTML을 본인 p2에서 열고 [funnel](evidence/b-funnel-round1.png)·[flow](evidence/b-flow-round1.png)를 캡처하고 trend 초기 캡처도 직접 열었다. B의 설명과 조건을 같은 읽기 열에 묶은 것은 채택했다. 그러나 trend에서 hero가 제목보다 약120px 위, funnel은 약200px 위여서 큰 값이 주장을 앞질렀다. copy/evidence 상단 정렬과 짧은 hero→plot 간격을 직접 요청했고 상대가 실제 CSS를 수정했다. 모든 장을 좁은 split으로 만들면 추세 폭이 줄어드는 점을 기각 근거로 보냈다. 짧은 네 단계 flow는 넓은 가로 구도를 채택하고 긴 설명을 붙이는 경우에만 세로/split을 선택하는 결론을 교환했다.

상대는 A의 `margin-top:-96px`가 한 줄 제목에서만 우연히 맞는다고 지적했다. 매니저도 같은 반례를 주었다. 이를 채택해 **copy/hero/plot 명시적 grid 영역**으로 바꿨다. 제목 열과 hero 열을 독립시키고 긴값은 별도 행으로 옮겼다. 제목 자체의 원문/의미를 고치는 접근은 기각했다. [변경 전 trend](evidence/trend-v1.png), [변경 후 trend](evidence/final-desktop-2.png), [funnel](evidence/final-desktop-1.png), [flow](evidence/final-desktop-3.png).

## 2라운드 — 반례와 편집·모바일 직접 교차 검토

첫 합의를 긴 한국어 질문·같은 긴 질문을 붙인 실제 차트·다른 주제7주·9,876,543.2건으로 시험했다. A의 1600×1000 검토에서 7원고의 native 요소 이탈0, copy/hero 겹침0이었다. 긴 값은 글자 수 기준이 아니라 실제 가용 폭으로 별도 행 전환한다. 매니저가 숫자만 측정하면 긴 단위를 놓친다고 반론해 **숫자+단위 전체 `.hero-line`** 실측으로 수정했다. 390px에서 ‘9,876,543.2 월간 처리 요청 건수’는 숫자와 단위를 분리한 세로 흐름으로 원문을 보존했고 본문폭390px을 확인했다. [긴값 desktop](evidence/final-desktop-6.png), [긴 단위 mobile](evidence/long-unit-mobile.png).

A의 resize 핸들러가 전체 원고를 다시 그리던 초안은 직접 편집한 문장을 잃는 반례였다. 이를 폐기하고 resize는 fit/실측만 수행한다. 제목에 긴 한국어 질문을 직접 입력한 뒤 390px로 바꿔 원문 유지 true를 확인했다. 기존 cover의 `align:center`와 title 배열 두 줄도 명시적으로 존중하도록 했다. corpus는 slide만 스냅샷했으므로 deck-level speaker/date가 이 시안에 없는 것은 삭제 권고가 아니다.

390px7원고 본문폭390, 일반 제목35px·설명17px·표16px. 원문/정상값은 축약하지 않았다.12주 표12행·7주 표7행을 유지한다. 초기검수에서 compact SVG가 보이지 않는 실제 실패를 발견했다. 제품의 compact는 `q-line-mobile`만 가지고 있어 `.q-line-svg.q-line-mobile` 선택자가 적용되지 않았다. 정확한 선택자로 교정하고 **실제 추세 그림 표시와 HTML표를 함께** 확인했다. 상대에게 같은 문제를 직접 전달했고 B도 교정했다. [최종 모바일 추세](evidence/final-mobile-2.png), [검토 JSON](evidence/browser-review.json).

상대의 2차 응답은 B의 1068px 중간폭 전이 문제·숫자+단위 전체실측·모바일 compact 교정을 구체적으로 알렸다. 본인 p2에서 수정된 B의1068px와390px(추세/긴한국어/7주/큰값)을 직접 다시 확인했다. [교차 검토 JSON](evidence/b-cross-review.json), [B 모바일 실화면](evidence/b-mobile-round2.png). **추세 wide·짧은 flow wide, 설명이 긴 자료 옆 문맥만 한정 split**에 합의했고 ‘모든 차트 split’ 가설은 기각했다.

## 최종 제품 권고와 한계

- 제품 `visual.css`의 기존 composition wide/split을 유지하면서 제목 읽기 폭과 hero 너비를 독립시킨다. 음수 margin으로 시각 높이를 맞추지 않는다. `styles.css`의 제목/설명은 역할별 읽기폭·keep-all/anywhere fallback·행간을 적용한다.
- 기존 align:center, 원래 title 배열/명시 개행, speaker/date를 보존한다. CSS의 balance가 한국어 의미 단위를 보장한다고 주장하지 않는다. 선택 개행은 작성자가 원문으로 정한다.
- 필요하면 app의 hero 값+단위를 작은 `.hero-line` 그룹으로 묶어 전체 실측한다. 프리셋/브랜드 API/문자수 제한을 새로 만들지 않는다. 긴 값 fallback 후 편집/resize에서 재평가한다.
- 시안의 편집/모션은 검토 도구다. 실제 제품은 기존 저장·내보내기·읽기·motion/reduce 상태 경로를 재사용한다. 이 자료는 제품 편집기 persistence 검증이나 제품 전12장 QA를 대신하지 않는다.

두 번의 직접 토론과 최소 반례 교정을 마쳤다. 본인 소유 파일 편집·브라우저 작업 종료. TaskSpace11 p2는 종료하지 않고 총괄에게 인계한다.
