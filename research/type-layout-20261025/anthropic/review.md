# B 독립 시안·교차 검토

담당 `/root/design_manager/anthropic_editorial_typographer`. [같은 원고 실제 시안](prototype.html) · [공식 장면 관찰](sources.md). 제품 코드·원고·WORK_LOG는 수정하지 않았다.

## 독립 초안과 1차 토론

초안은 제목/설명을 왼쪽 읽기 열, 강조값/차트를 오른쪽 근거 열에 배치했다. 동일 opening/funnel/weekly/journey 원문과 StageVisual 데이터·표를 사용했다. [초기 추세](evidence/round1-trend.png)에서 주장 y371.9/수치 y248.4로 읽기 순서가 역전됐다. Apple/OpenAI 담당이 이 높이 차이와 짧은 flow를 세로로 두는 낭비를 구체 비평했다.

수정: 주장/근거를 같은 상단 y187.5에 맞추고 hero→plot 간격을 줄였다. 짧은 4단계 flow는 넓은 가로로 바꿨다. 설명이 많은 경우의 세로 열 가설은 범위를 한정했다. [수정 추세](evidence/round1-trend-revised.png).

반대로 A를 직접 열어 같은 왼쪽선과 넓은 추세는 채택했다. `margin-top:-96px`로 hero를 당기면 긴 제목의 영역을 침범한다는 이유로 명시 grid를 요청했다. A는 당김을 제거하고 copy/hero/plot 행을 분리했으며 resize 재렌더로 편집을 잃던 경로도 제거했다.

## 2차 반례와 수정

- 중간 1068px에서 B의 aspect-ratio+min-height840+auto 폭이 1493px로 전이됐다. width100%/min-width0를 명시해 stage/body 모두1068로 교정했다.
- A 담당이 B 모바일 compact SVG의 실제 클래스가 `q-line-mobile` 하나임을 지적했다. 잘못된 복합 선택자를 고쳐 390px에서 실제 compact plot display:block/높이228px을 확인했다.
- 긴값은 문자수 기준 분기를 폐기했다. 실제 숫자+단위+단위 margin 전체 폭을 재고 작은 숫자 타입으로 전환한다. 제품에서는 별도 행도 허용하는 구조적 fallback이 우선이다.
- A의 긴 한국어·큰값을 본인 p3에서1600/390으로 직접 열어 원문,9,876,543.2건,별도 강조행,가로 넘침0을 확인했다. [교차 검토](evidence/round2-cross-review.json).

B 최종 [정적 관찰](evidence/round2-browser.json): 7입력×1600/1068/390에서 body 폭이 각 viewport와 일치하고 검사한 native 글 이탈0. 원본 추세12행/다른 주제7행 표, 직접 편집 후 resize 문구 보존true. [데스크톱 추세](evidence/round2-1600-2.png), [넓은 flow](evidence/round2-1600-3.png), [390px 추세](evidence/round2-390-2.png), [긴 한국어](evidence/round2-390-4.png), [큰값](evidence/round2-390-6.png).

## 적용 범위와 한계

모든 차트를 B처럼 좁은 설명 열/증거 열로 고정하는 안은 기각한다. 넓은 추세와 짧은 flow는 wide가 유리하며 설명과 자료의 근접성이 필요한 장만 split을 사용한다. cover 왼쪽 정렬은 독립 가설이고 제품의 명시 align:center/title 배열을 덮어쓸 권고가 아니다. corpus에 없는 deck speaker/date를 제품에서 없애지 않는다.

시안은 저장/내보내기 제품 검증이 아니다. 실제 제품은 기존 편집·모션·상태 예외를 재사용한다. 축소 SVG만으로 모바일 가독성 성공을 주장하지 않고 native 글과 동일 데이터 표를 함께 확인했다. 배경 탭의 RAF 대기가1회 타임아웃되어 본인 페이지를 reload한 뒤 동기 정적 관찰로 전환했다. TaskSpace11 p3만 사용했고 다른 탭·Space를 조작하거나 finish하지 않았다.

최종 시안/출처/취합 파일 편집 종료.
