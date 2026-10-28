# 실제 개선의 디자인 인수 기준

2026-10-28 · 디자인 매니저. 이번 문서는 제품 구현과 두 Markdown 예제 작성의 기준이며 상태는 루트 WORK_LOG 하나에서 관리한다. 이전 감사 문서와 근거는 보존한다. 아래 API·입력 구문은 엔지니어링 매니저와 직접 제안·수정·최종 수신 확인을 거쳐 확정했고 root가 인수했다. 실제 renderer 연결과 시각 검증은 후속 통합에서 수행한다.

## 직접 합의한 입력·렌더 계약

장 첫 내용 앞의 `<!-- stage-slide`로 시작하는 작은 YAML 블록(`-->` 종료)에 `compose/tone/fit/focus`만 둔다. 기존 legacy `stage`와 분리한다. H2 바로 앞 `<!-- stage-group`에는 `tone/primary:true/fit/focus`만 두고 다음 H2의 범위에 결속한다. 제어 줄을 빈 줄로 치환해 첫 의미 H1 한 번과 원본 줄 위치를 보존한다. 제목·값·이미지 경로를 설정에 복제하지 않는다.

compose는 `auto/message/split/media/gallery/mosaic/editorial/quote/closing/document`, tone은 기존5색과 `neutral`, fit은 `contain/cover`다. focus는 검증한 object-position으로 전달한다. 장 tone은 기존 `slide.tone`, 나머지는 `slide.view`와 H2 범위 binding으로 보관한다. 고정 그룹 수·12칸·출처1문단 제약은 없다. 오타/미지 키·모호 marker는 위치 진단하며, 유효하나 부적합한 구도는 원문이 남는 document와 보이는 진단으로 처리한다. 그 fallback이 발표 독해까지 합격한 것은 아니다.

`StageBlocks.renderSlide(slide,{preview,index,total,sourcePath,onMediaChange})`는 `{body,composition,quiet}`를 반환한다. root app은 body 전체를 기존 slide-body에 넣고 article의 `data-composition`과 `is-quiet`를 적용한다. body는 `.markdown-composition` 안에 `.slide-title.md-heading`과 `.markdown-body`를 한 번 렌더한다. 사진 `.md-media[data-fit]`, 사진 묶음 `.md-grid`, H2 그룹 `.md-group[data-tone]`과 `.is-primary`가 공통 hook이다. focus 위치만 검증된 inline style로 전달한다. 기본 strong는 실제 기존 blue/Paper 대응을 쓰며 선택 group tone으로 같은 장의 다른 역할색을 제공한다.

split은 image-first의 `.md-media + .md-copy`를 안전한 자동 형태로 확정했다. 이미지 중간의 앞/뒤 문단을 한 copy로 합쳐 원고 순서를 바꾸지 않는다. renderer의 후속 연결에 넘길 추가 hook는 editorial 단독 문단의 짧은 strong 숫자+단위에 한정한 `.md-value / .md-value-number / .md-value-unit`이다. 값은 원문 표시이며 계산·성과 추론을 하지 않는다. 정확한 허용 형태는 엔지니어링 인수 때 확인하고 모든 첫 강조 문장에 숫자 위계를 적용하지 않는다.

DOM은 원고 순서로 유지하고 발표의 면적·주역은 CSS로 배치한다. read에서는 grid/그룹의 발표 강조 배치를 평면 문서 흐름으로 되돌려 전체 원문·caption·링크·alt를 보존한다. preview는 같은 발표 구도와 비상호작용 렌더다. quiet는 message/quote/closing의 footer 메타를 숨기는 표시 신호이며 본문·가상성격·출처의 삭제 신호가 아니다.

## 기본 조판과 작은 선택

짧은 H1와 소수 문단, 한 이미지와 목록, 인용, 여러 이미지처럼 의미를 바꾸지 않고 구분할 수 있는 형태에서 다른 조판을 제공한다. 이미지/표/숫자의 내용에서 성과·인과를 추론하거나 문장을 지우지 않는다. 복잡한 mosaic·H2 자료 모음·사진 crop/focus·선택 의미색만 작은 설정으로 제어한다. 일반 원고마다 profile·JSON·HTML·CSS를 다시 작성하게 하지 않는다.

기존1600×900 논리 무대와 중립 캔버스, 의미색5개·Paper 대응색을 활용한다. 큰 선언과 낮은 밀도, 넓은 사진/실제 UI, 열린 표·코드, 불균등 결과물의 밀도 차이가 한 시각 가족으로 읽혀야 한다. 모든 장을 큰 제목·동일 카드·같은 색으로 통일하지 않는다.

## 이번에 실제로 보여줄 것

- 자동 선언, 큰 인용, 마무리의 쉼과 행동.
- 사진 hero와 목록의 분할,2~6개 사진의 정렬된 gallery, 주역과 보조가 다른 mosaic.
- H2별 이미지·인용·짧은 문서를 원매체의 면으로 묶은 editorial.
- 선택 의미 단위의 색, 값과 중립 단위, 범주 이름과 색 대응, 사진/UI 고유색, 중립 장으로 돌아오는 리듬.
- 긴 한국어·표·코드의 읽을 면적,390px read의 전체 원문·논리 순서·국소 스크롤.

UI/문서는 contain을 기본으로 검토하고 사진은 필요한 경우 cover/focus를 선택한다. 이미지 title은 원래 caption 의미를 유지하며 제어 문법으로 빼앗지 않는다. 색을 감정/성과로 자동 해석하거나 매장 순환시키지 않는다. 기존 legacy20양식/native8종의 전역 규칙을 건드리지 않고 blocks 범위에 적용한다.

## 서로 다른 두 이야기

제품결정 원고는 문제 장면→관찰→근거→작은 결정→실행으로 이어진다. 워크숍/사진 탐색 원고는 장면→서로 다른 시선→확대/비교→선택한 관찰→다음 질문처럼 다른 흐름을 갖는다. 기존과 같은 표·코드·인용의6장 기능 나열을 반복하지 않는다. 가상 프로젝트·자체 제작 UI·스톡 사진의 성격과 크레딧, 기존 첨부/상호 링크의 목적은 유지한다.

## 실제 인수

CSS와 원고 작성 후 parser/모델·renderer를 연결하고 실제 브라우저로 확인한다. 동일 원고의 이전 선언/이미지2쌍과 현재 결과를 비교하며 내용이 다른 두 새 서사는 별도 결과로 제시한다. 제목·사진 교체, 목록/표행·출처 추가, 대표 자료·끝 행동 변경을 실제로 수행해 재입력·오류복구·모바일 영향을 확인한다. 문법 정의·CSS 존재·기능 검사 수만으로 개선 완료를 선언하지 않는다.
