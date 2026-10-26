# 발표 글 배치 공동 권고

[A 독립 시안](apple-openai/prototype.html) · [B 독립 시안](anthropic/prototype.html) · [두 차례 토론](discussion.md). 취합 `/root/design_manager/anthropic_editorial_typographer`; 두 실무 모두 실제 초안 작성·상호 비평·본인 수정·상대 재확인을 마쳤다.

## 채택할 구조

1. 제목과 설명은 같은 시선 시작점에 묶고 역할별 읽기 폭을 준다. 제목은 대략64–76px/1.16–1.25, 설명은27px/1.5–1.6의 현재 무대 범위에서 실제 원고로 결정한다. 수치의 intrinsic 폭이 제목 폭을 바꾸지 않게 copy/hero/plot을 명시 grid 영역으로 나눈다. 음수 margin으로 수치를 당기지 않는다.
2. 추세와 짧은 흐름도는 넓은 evidence가 기본이다. 설명과 자료를 동시에 읽어야 할 때만 split을 사용한다. 모든 장을 같은 제목 크기/2열/정렬로 고정하는 안은 기각한다. 외곽 차트 패널은 추가하지 않는다.
3. 숫자와 단위는 하나의 읽기 묶음이다. 실제 전체 폭이 부족하면 별도 행 또는 안정된 작은 타입으로 전환하며 제목을 좁히거나 숫자/단위를 자르지 않는다. 문자수 제한이나 임의 축약은 없다.
4. 한국어는 keep-all과 안전한 overflow-wrap을 결합한다. 배열/명시 줄바꿈을 보존하며 자동 balance/pretty를 의미 단위 보장의 대체물로 쓰지 않는다. 긴 설명은 읽기 폭과 충분한 행간으로 처리한다.
5. 390px는 title35/설명17–18/표16px 정도의 실제 DOM 문서 흐름으로 바꾼다. native 글, compact plot, 동일 자료 표를 함께 제공한다. 편집 후 resize가 내용을 다시 생성하지 않아야 한다.

## 최소 제품 적용 위치

- `visual.css`: visual copy/hero/plot 명시 grid, 역할별 글폭/거리·행간, wide/split과 모바일 단일 흐름. 실제 plot는 현 renderer를 유지한다.
- `styles.css`: 공통 title/body/subtitle의 원문 줄바꿈·읽기 폭·정렬을 정리하되 명시 `align:center`와 layout별 역할을 존중한다. cover의 deck speaker/date는 유지한다.
- `app.js`: 필요할 경우 hero 값+단위 한 줄 묶음과 실측 fallback 표시만 작은 DOM 변경으로 추가한다. 기존 motion/읽기/편집/reduce/저장/내보내기 경로를 재사용한다. 새 브랜드 preset·큰 API·프레임워크는 만들지 않는다.

프로토타입의 왼쪽 cover, 편집 버튼, 등장 재생은 비교 가설/검토 장치다. 제품의 명시 정렬·title 배열·metainfo를 삭제하는 권고가 아니다. 상세 적용 수치는 매니저의 최종 결정을 따른다.

## 근거와 검수 범위

Apple/OpenAI는 [실제 공식 발표 관찰](apple-openai/sources.md), Anthropic은 [00:08 짧은 제목/00:55 설명형 슬라이드](anthropic/sources.md)를 확인했다. Anthropic02:15는 실제 Console 데모여서 자료 옆 작업 문맥에만 한정했다. 회사 홈페이지나 내부 규칙을 발표 근거로 대체하지 않았다.

A는7원고1600/390, B는7원고1600/1068/390를 정적으로 관찰했다. 긴 한국어,12점/7점 추세,큰값·단위,직접 편집 후 resize,실제 compact SVG/동일 표를 양측이 교차 확인했다. [B21경우](anthropic/evidence/round2-browser.json), [B의A교차검토](anthropic/evidence/round2-cross-review.json), [A의B교차검토](apple-openai/evidence/b-cross-review.json). 제품 전체12장/실제 저장·내보내기의 완료 검증은 후속 구현 단계 범위다. PDF는 사용하지 않았다.

두 실무 파일 편집·브라우저 작업 종료. TaskSpace11에서 A p2/B p3만 만들었고 최종 Space 정리는 총괄에게 맡긴다.
