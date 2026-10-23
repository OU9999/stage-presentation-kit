# 실제 연구를 반영한 예제

20장 예제는 특정 주제의 실적 발표가 아닌, 골라서 복사할 수 있는 양식 모음입니다. 관찰한 발표의 사진·로고·캐릭터를 복사하지 않고 로컬 스톡 사진과 직접 만든 SVG로 구성했습니다. [사진 크레딧](assets/CREDITS.md).

| 예제 | 관찰한 구성과 적용 | 바꿔 쓸 필드 |
| --- | --- | --- |
| [03 사진 모음](index.html#3) | DevDay 48:30의 동일 세로 프레임·상단 설명. 풀컬러 장면 6개를 같은 무게로 제시 | `gallery`, `variant: portraits`, `items[].src/alt/label/caption/focalPoint` |
| [04 큰 사진](index.html#4) | Apple 사진판처럼 사진의 색과 질감을 화면 전체에 표시 | `media`, `src`, `fit`, `focalPoint`, `caption` |
| [05 조건 비교](index.html#5) | Apple의 사진별 조건 라벨에서 착안. 같은 사진의 디지털 표시 크롭으로 비교 축을 명시 | `gallery`, `variant: strip`, `tone: yellow`, `items[].zoom/label` |
| [06 유색 선언](index.html#6) | Codex 20:00처럼 문장의 아래 의미 단위 전체를 주황으로 강조 | `statement`, `tone`, `highlight` |
| [07 범주](index.html#7) | DevDay 23:00처럼 아이콘과 이름을 같은 색으로 연결 | `categories`, `items[].symbol/label/description/tone` |
| [08 이름 소개](index.html#8) | DevDay 24:15처럼 큰 보라 이름. 다음은 중립적인 근거 화면 | `section`, `tone: purple`, `highlight` |
| [10 여러 결과물](index.html#10) | DevDay 25:00처럼 왼쪽 주장과 오른쪽 문서·UI 등 2×2 배열 | `results`, `items` 4개, 매체별 `fit` |
| [11 작품 콜라주](index.html#11) | Figma 데모의 혼합 작품 배열과 DevDay 후반 제품 요약. 2+1+1 / 1+1+2 | `mosaic`, `items[].span/fit` |
| [12 소개 색면](index.html#12) → [13 중립 복귀](index.html#13) | Figma 09:28→09:40→10:10에서 확인한 소개 전환의 역할을 재사용 | `surface: butter`, 다음 슬라이드는 기본 표면 |
| [15 주요 수치](index.html#15) | Apple의 큰 녹색 변화량처럼 수치 하나에 색을 집중 | `metric`, `tone: green`, `value/unit/label/source` |

20장 전체에 같은 강조색을 반복하지 않습니다. 사진·작품은 원래의 색을, 범주는 대응 관계를, 선언은 한 의미 단위를, 소개 색면은 흐름의 변화를 맡습니다. 이 구성은 관찰에서 도출한 독자 템플릿이며 원본 회사의 공식 규칙이 아닙니다.

사진의 표시 범위와 작품의 내용 보존은 별도로 판단합니다. 인물 사진은 초점 위치를 조절할 수 있지만, 문서·대시보드·타이포 작품은 `contain`으로 전체 내용을 보존하는 편이 적합합니다. 넓은 콜라주 칸의 포스터는 원본의 글자를 자르는 대신 그 비율에 맞춘 독자 SVG 변형을 사용했습니다.

05장의 zoom은 같은 표시 프레임의 디지털 확대입니다. 원본 촬영의 렌즈 배율이나 실제 성능 수치로 소개하지 않습니다. 인물 사진은 양식용 스톡 이미지이며 예시 발표자 이름과 연결되지 않습니다. 수치와 SVG 문서·UI는 예시 데이터입니다.

색·경로·배치 옵션은 `content.js`에서, 화면에 표시되는 문장·라벨·설명은 편집 모드에서 바꿀 수 있습니다. 발표자 노트에는 각 장의 재사용 방법이 있습니다.

원본 영상·시점·확인 범위는 [DevDay 추가 조사](research/devday-color-photo-analysis.md), [외부 추가 조사](research/external-color-photo-analysis.md), [컬러 비교 보드](research/color.html)를 참조하세요.
