# 글 배치 두 차례 직접 토론

실제 참여: `/root/design_manager/apple_openai_typographer`(A 독립 초기 작성), `/root/design_manager/anthropic_editorial_typographer`(B 독립 초기 작성·본 취합). 회사 경력이나 고정 기업 규칙을 주장하지 않는다. [공통 평가 기준](manager/criteria.md), [같은 원고](shared/corpus.js).

## 1라운드 — 동일 네 장 A/B

| 구체 비평 | 상대의 실제 변경 | 채택·기각 이유 |
| --- | --- | --- |
| A→B: 추세 hero가 주장보다 약124px 위, funnel도 수치가 먼저 떠 있다. | B copy/evidence 상단 정렬, hero/plot 거리 축소. | 주장과 자료가 같은 무대에서 관계를 갖게 한다. 초기 가운데 정렬은 기각. |
| A→B: 짧은4단계 flow를 오른쪽 세로 열에 두면 관계보다 빈 공간이 커진다. | B 짧은 flow를 가로 wide로 변경. | 관계의 전체 순서를 한 번에 본다. 설명이 많은 경우의 세로 배치는 범위 한정. |
| B→A: 넓은 추세·동일 왼쪽선은 좋지만 hero의 -96px 당김은 긴 제목과 충돌한다. | A negative margin 제거, copy/hero/plot 명시 grid. | 한 줄 예제에만 맞는 수작업 좌표를 기각. 읽기 폭과 강조값 폭을 분리. |
| B→A: 원문 편집 후 resize가 show()로 재생성하면 편집을 잃는다. | A fit/실측만 실행하도록 분리. | 배치가 글쓰기/재사용을 방해하지 않게 한다. |

## 2라운드 — 차트·긴 한국어·390px·다른 주제

| 실제 반례·직접 검토 | 수정/최종 판단 |
| --- | --- |
| B의1068px stage가 aspect-ratio/min-height 때문에1493px로 확장. | B width100%/min-width0로 교정. 중간 폭의 가로 넘침도 검수에 포함. |
| A가 B 모바일 compact SVG 실제 클래스 불일치를 발견. | B 선택자를 q-line-mobile로 고치고 display:block/228px 확인. |
| 매니저와 양측이 긴값+긴단위는 숫자 span만 재면 부족하다고 지적. | 양측 숫자+단위 전체 실측. A는 독립 강조행, B는 작은 숫자 타입 fallback. 원문/값/단위를 생략하지 않음. |
| B가 A의1600/390 긴 한국어·9,876,543.2건 실제 화면을 재확인. A가 B1068/390 및 표12·7행을 재확인. | 가로 넘침0, 원문/값/표 보존. 제품 숫자·본문은 편집 경로에서 유지. |
| B의추세 plot801×300은 A의wide보다 작다. | 모든 차트split 기각. 추세/짧은 flow wide, 설명+자료 맥락만 한정 split으로 합의. |

두 차례 모두 비평 후 본인 파일을 수정하고 상대가 재확인했다. [A 변경 전후/검증](apple-openai/review.md), [B 변경 전후/검증](anthropic/review.md). 취합은 권고이며 제품 최종 결정/적용은 매니저·총괄 소유다.
