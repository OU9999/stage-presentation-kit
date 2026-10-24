# 정량 4종의 열린 무대

`quantitative.js`는 `window.VisualQuantitative.render(visual)`에서 `{plot, hero, table}`를 반환한다. `plot`은 DOM이며 큰 제목과 focus 숫자는 부모의 같은 무대 그리드에 조립한다. image·media-frame·배경 SVG 사각형·외곽 카드가 없다. 공통 `VisualDesign` helper를 사용하며 원본 배열을 변경하지 않는다.

| kind | 입력 | 실제 구도 |
| --- | --- | --- |
| line | labels+values 또는 series, 선택 비율 입력 | 투명한 넓은 선·최소 축·자동 focus 값. null은 선을 끊고 0으로 바꾸지 않는다. 축은 데이터 범위로 계산하며 선택 domain을 사용할 수 있다. |
| bars | labels+values 또는 series | native 라벨·정확한 값·0 위치를 가진 가로 막대. 음수는 0의 왼쪽으로 뻗는다. 긴 라벨은 줄바꿈한다. |
| composition | labels+비음수 values | 실제 원값 비중의 누적 길이와 native 범례. 작은 구간의 내부 글씨는 생략해도 범례·표에서 모든 값 보존. 합계 0은 계산 불가로 표시한다. |
| funnel | labels+series | native 단계와 같은 기준의 계열별 막대, 마지막 또는 선택 단계의 큰 값. 단계 수는 배열 길이로 결정한다. |

`emphasis: focus`일 때만 `hero`를 반환하며 마지막 계열의 선택 값에서 직접 계산한다. 숫자 사본을 따로 입력하지 않는다. 모든 종류는 같은 원본의 정확한 `table.headers/rows`를 반환한다. 단위·기간·분모 문맥은 부모 무대의 짧은 문장으로 남긴다.

7점·5분류·긴 라벨을 위한 별도 도메인 구조나 고정 개수 제한이 없다. 390px에서는 native 행·값·범례를 16–18px로 재배치하고 표가 세부 정보를 제공한다. 선의 작은 축을 축소한 것만으로 모바일 가독성을 완료 처리하지 않는다. PDF·인쇄를 위한 크기나 parser 조건은 사용하지 않는다.
