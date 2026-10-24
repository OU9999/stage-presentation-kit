# 8종 generic visual 이식 사양

메시지·데이터에서 도출한 큰 값·plot을 한 무대에 조립한다. [직접 토론](discussion.md)의 열린 구도와 [엔지니어링 계약](../engineering/contract-proposal.md)을 실제 DOM/CSS로 확장했다. 별도 SVG 파일 생성·불투명 배경·사진용 패널을 사용하지 않는다.

## 실제 구현과 연결

- 공통 `shared.js/css`: 매니저 소유. 팔레트·DOM/SVG helper·wide/split 무대·native 제목/큰 값·표 조립.
- [quantitative.js](quantitative.js)·[quantitative.css](quantitative.css): 정량 담당의 line/bars/composition/funnel. [정량 사양](quantitative-spec.md).
- [systems.js](systems.js)·[systems.css](systems.css): 시스템 담당의 flow/matrix/timeline/heatmap. [시스템 사양](systems-spec.md).

두 모듈은 `render(visual) → {plot: HTMLElement, hero, table:{caption,headers,rows}}`로 동일하게 연결된다. `plot`은 native DOM과 필요한 SVG이고 부모가 같은 grid에 제목·hero를 배치한다. 표도 같은 `visual`에서 나와 수치 사본이 필요 없다. 문자열은 textContent로 넣으며 원본 배열을 바꾸지 않는다. 두 실무자가 API·색 역할·파일 소유권을 직접 공유하고 상대 코드도 대조했다.

## 구도별 적용

| 표현 | 기본 | 정보 위계 |
| --- | --- | --- |
| line | wide | 투명한 넓은 선·최소 축·focus에서 도출한 큰 값. null은 선을 끊고 관측 없음으로 남김. |
| bars | split/wide | native 긴 이름·정확한 값·0 기준 막대. 음수도 원래 부호와 방향을 유지. |
| composition | wide | 실제 길이와 native 범례. 작은 내부 글씨는 생략해도 모든 원값은 범례·표에 보존. |
| funnel | split | 선택 단계 값·같은 기준의 비교 막대·native 단계. 개수는 배열 길이로 결정. |
| flow | wide | 문장·연결선이 주역. 2/5단계 모두 별도 ID 없이 순서 입력. |
| matrix | wide | 직접 이름, 충돌할 때만 목록/리더. 동일 좌표도 원위치와 모든 이름 보존. |
| timeline | wide | native 과업과 기간 레인. 12주에 묶이지 않는 입력 범위. |
| heatmap | wide | 데이터 셀의 색·값·단위, 가변 행/열, 읽을 수 있는 표. |

`composition:wide/split`은 배치 선택이며 `emphasis:focus`는 정량 종류의 선택 값을 자동으로 크게 보여준다. matrix 복수 focus는 라벨 강조이고 시스템 자료의 합계는 추정하지 않는다. 색은 기본 blue·중립과 계열 구분에 필요한 소수색만 쓴다.

## 재사용과 모바일

단일 `visual` 객체만 복사해 7점 추세·5범주·2/5단계·다른 주제·긴 라벨을 입력한다. 현 예제의 코호트·인터뷰·12주 데이터 전체를 요구하지 않는다. 큰 숫자는 별도 원고 필드에 중복하지 않는다. 유한 값·배열 대응·필요한 분모/참조는 제품에서 진단하되 수량·가상 메타·좌표 중복을 임의로 금지하지 않는다.

390px에서는 native 제목/값/항목/범례와 표를 문서 흐름으로 조립한다. SVG 축소만으로 작은 축·라벨의 가독성을 통과했다고 주장하지 않는다. heatmap의 넓은 셀이나 표는 제한된 영역에서 스크롤하고 본문 가로 넘침은 만들지 않는다.

현재 결과는 실제 이식 가능한 디자인 시안이다. 매니저의 desktop/mobile 최소 확인 뒤 엔지니어링이 제품 계약·편집/저장/내보내기·새 스타터와 연결한다. PDF·인쇄 검증이나 새 광범위 조사를 완료 조건으로 두지 않는다. 운영 상태는 루트 `WORK_LOG.md`에 기록한다.
