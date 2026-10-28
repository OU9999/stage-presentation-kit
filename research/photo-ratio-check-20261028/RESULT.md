# 다중 사진의 좋은 비율은 어디에 남아 있는가

2026-10-28 · 확인 기준 b011e41. 제품 코드는 변경하지 않았다.

기존6열 세로 사진과4:3 비교 스트립은 삭제되지 않았다. 그러나 새 Markdown 기본 갤러리와 대표 예제에 그 비율을 선택하는 경로가 빠져 있다. 기존 양식 보존과 새 작성 흐름에서의 미감 재사용은 별개이며, 직전16장 예제의 성공을 전체 사진 배치 시스템의 복원 완료로 해석하면 안 된다.

| 배치 | 실제 공개 위치 | 현재 상태 |
| --- | --- | --- |
|6열 세로 사진·제목 없는2:5 프레임 | [기존 모음3번](https://ou9999.github.io/stage-presentation-kit/#3) | 그대로 동작.6개 프레임 실측 비율 모두0.4. |
|4:3 사진 비교 스트립 | [기존 모음5번](https://ou9999.github.io/stage-presentation-kit/#5) | 그대로 동작.4개 프레임 실측 비율 모두1.333. |
|새 일반 Markdown의6장 gallery | [현재 경계 예제5번](https://ou9999.github.io/stage-presentation-kit/research/presentation-renewal-20261028/evidence/edge-deck/#5) |3열×2행. 이번 원고의 실제 이미지 비율은 약1.868이며 남은 높이·caption에 따라 달라지는 값이다. |
|새 워크숍의3장 gallery | [현재 워크숍3번](https://ou9999.github.io/stage-presentation-kit/presentations/team-learning/#3) |3열×1행. 기존6열 세로 프레임의 대체가 아니다. |

공개4화면을 같은1440×1000 viewport에서 직접 캡처하고3화면을 이미지로 열어 확인했다. 이미지는 모두 정상 로드됐다. 서로 다른 원고·사진을 쓴 예제이므로 동일 내용의 미감 A/B 실험이라고 주장하지 않는다. [실측](evidence/observations.json)에 열·행과 실제 이미지 상자를 남겼다.

원인은 [기존 CSS](../../styles.css)의 portraits/strip 변형과 [새 CSS](../../blocks.css)의 gallery 분기가 별개이기 때문이다. 새 gallery는2장2열·3장3열·4장2×2·5~6장3열2행만 선택한다. 새 stage-slide의 허용 입력에는 variant·열수·사진 비율이 없으며, variant: portraits를 넣으면 현재 명시 오류가 난다.

기존 stage layout adapter를 쓰면 Markdown 본문6장을 다시 입력하지 않고도 gallery/portraits 또는 strip으로 보내는 것은 가능하다. 실제 parser/model에 같은6이미지를 넣어 두 경우 모두 성공했다. 다만 이 경로는 새 stage-slide의 focus 배열 등과 섞을 수 없고, 새 일반 조판의 간편한 선택지로 안내된 상태도 아니다. [입력 재현](evidence/authoring-paths.json)에 성공3건과 명시 오류1건을 보관했다.

후속 개선 대상은 기존 인물 열·가로 스트립·격자를 작은 선택으로 재사용하는 경로와 대표 예제다. 사진을 여러 장 넣으면 임의로 가장 좋은 crop을 보장한다는 약속 대신, 기존 비율·원고 순서·사진별 초점과 읽기 원문을 함께 보존해야 한다. 이번 요청에서는 누락의 위치를 확인했으며 제품 구현이나 비율 선택 기능 추가는 수행하지 않았다.

## 추가 확인: 사진·아이콘이 불균등하게 맞물리는 그리드

사용자가 세로 사진 외에도 여러 사진·아이콘을 약간 뒤틀린 grid처럼 표현한 구성을 추가로 지목했다. 다음3개 기존 공개 화면을 직접 열고 캡처·이미지 열람으로 대조했다. 세 경우 모두 이미지 로딩 실패0이며, 기존 첫 비율 실측과 제품 코드는 변경하지 않았다.

| 기존 구성 | 실제 위치 | 새 간편 Markdown 경로의 차이 |
| --- | --- | --- |
|혼합 타일 C안 · bento/seoul/editorial | [현장 구성4번](https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/#4) · [현재 화면](evidence/bento.png) |12개 타일의 폭·높이·행별 분할이 다르다. 큰 세로 표지, 사진, 수치, 인용, 파형, 작은 아이콘 등이 맞물린다. 새 compose: editorial은 H2 자료 그룹 조판이며 이12타일 구성을 재사용하는 기능이 아니다. |
|아이콘월 · icon-wall | [현장 구성5번](https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/#5) · [현재 화면](evidence/icon-wall.png) | 중앙 메시지와 외곽22아이콘을 사용한다. 새 compose에는 icon-wall 선택이 없다. 실측 grid 직계 자식23개 중1개는 중앙 문장이다. |
|불균등 작품 모자이크 | [기존 모음11번](https://ou9999.github.io/stage-presentation-kit/#11) · [현재 화면](evidence/mosaic.png) | 가로 큰2개와 작은4개가2+1+1 / 1+1+2로 맞물린다. 새 동명 mosaic의 첫 이미지 주역+보조 이미지 배치와 구분된다. |

이 화면들은 임의 각도로 회전한 grid를 구현한 것이 아니라 폭·높이·행별 분할·중앙 빈 공간으로 비대칭을 만든 구성이다. 사용자의 '뒤틀린'이라는 묘사가 어느 하나를 뜻하는지는 단정하지 않고 후보를 함께 제시한다. [실제 위치·grid·transform 관찰](evidence/irregular-grids.json)을 보관했다.

따라서 누락은 사진 비율 선택에 더해 혼합 타일·아이콘월·기존 불균등 모자이크의 간편한 작성 연결과 대표 예제에도 걸친다. 기존 고급 stage adapter와 직접 content.js 원본은 계속 사용할 수 있지만, 새 일반 Markdown이 그 표현 범위를 이미 회수했다고 볼 수는 없다. 기능 검사가 통과하고 기존 코드가 남아 있다는 사실과, 사용자가 새 원고에서 기존 미감을 쉽게 재사용할 수 있다는 결과를 구분해야 한다.
