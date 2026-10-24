# 컬러·위계 확정 사양

2026-10-24 · OpenAI 발표·브랜드 시스템 관점의 디자인 역할. 실제 기업 출신 경력을 뜻하지 않는다.

## 확정 방향

핵심 문장·사람 이름·범주·선택된 비교 대상에는 선명한 의미색을 준다. 작은 메타·출처·구조선은 중립으로 남긴다. 큰 제목·검은 캔버스·자료 자체의 컬러를 유지하며, 모든 장에 색이나 장식을 더하지 않는다. [새로 확인한 원본 장면](../research/color.md)과 [현재 기술 계약](../engineering/synthesis.md)을 바탕으로 정했다.

원본 영상의 조명·카메라·압축 영향을 포함한 시각 관찰을 참고했다. 아래 값은 **STAGE 제품 사양**이며 OpenAI의 공식 HEX나 원본 측정값이 아니다.

| 의미색 | Stage·Midnight | Paper 유지 | Stage 배경 `#080808` 대비 | 역할 |
| --- | --- | --- | --- | --- |
| orange | `#ff7a3d` | `#a54a27` | 7.73:1 | 큰 선언의 의미 단위 |
| purple | `#a080ff` | `#73519e` | 6.70:1 | 이름·섹션의 명시적 강조 |
| blue | `#24a8ff` | `#275f89` | 7.74:1 | 선택된 비교 막대·범주 |
| green | `#69cf82` | `#2d6a43` | 10.35:1 | 의미 있는 수치·범주 |
| yellow | `#edcf66` | `#80600b` | 13.08:1 | 선택적 범주·의미 강조 |

대비는 [리서치의 sRGB 계산](../research/color.md)을 인계받았다. 단색 캔버스 계산이며 사진 배경·프로젝터 가독성을 보증하지 않는다. Paper의 다섯 기존 대안은 모두 5:1 이상으로 계산되어 그대로 유지한다.

## 구현할 selector별 역할

| 기존 연결점 | 확정 사양 |
| --- | --- |
| `[data-tone]` 토큰 | 위 팔레트 적용. `slide.tone` 및 항목 tone 데이터 계약은 유지. |
| `.accent-text`, `.slide-title .accent`, 명시적 `.highlight` | 의미 강조를 계속 `--slide-accent`로 표시. 문장 전체를 바꾸지 않고 작성자가 선택한 의미 단위를 유지. |
| `.slide-eyebrow` | `--slide-muted`로 변경. 수치·주장 tone이 작은 상단 라벨로 자동 번지지 않게 함. |
| `.layout-section::after` | 자동 장식선 제거. 큰 이름·섹션 제목의 역할을 추가 선으로 분산하지 않음. |
| `.compare-column + .compare-column` | 경계는 `--slide-line`. 두 열의 간격·라벨·본문 정렬은 유지. |
| `.compare-column:last-child .compare-label` | 데이터의 선택된 측면을 뜻하는 기존 의미 강조는 유지할 수 있음. 경계색과 텍스트 의미색을 같은 규칙으로 묶지 않음. |
| `.chart-row.is-highlighted .chart-bar` | 명시된 `slide.tone`의 `--slide-accent`. tone이 없으면 기존 중립 강조로 fallback. |
| `.chart-row.is-highlighted .chart-row-label`, `.chart-value` | 선택된 행도 `--slide-text`. 막대색과 수치·라벨색을 일괄 변경하지 않음. 다른 행의 라벨·값은 기존 muted 유지. |
| `.metric-value`, 항목별 `.bento-value`, `.metric-pair-item .metric-value` | 실제 핵심 숫자의 의미색 유지. 보조 설명·출처는 중립으로 구분하고 크기·배치·수치는 유지. |
| `.metric-unit`, `.metric-pair-item .metric-unit` | 총괄의 최종 해석에 따라 `--slide-muted`. 숫자의 의미색을 단위까지 상속하지 않으며 기존 크기·배치·수치는 유지. |
| `.category-icon`·범주 라벨 및 항목 `data-tone` | 같은 범주에서 색 대응 유지. 원형 안 아이콘은 어둡게, 제목은 중립. |
| `.quote-text::before` | 장식형 인용부호는 `--slide-muted`로 분리. 실제 인용 텍스트의 명시적 강조는 보존. |
| `.step-number` | 순서 번호는 `--slide-muted`. 자동 순차 등장과 실제 단계 문구가 순서를 설명하므로 의미색을 번호 장식으로 반복하지 않음. |
| 사진·media·editorial artifact 표면 | 틴트·필터·단색 통일 없음. 기존 자산·크롭·캡션·고유 표면색 유지. |

새로운 배경 테마나 색면을 기본으로 추가하지 않는다. `butter`는 기존 옵션으로 유지하며 이번 DevDay 근거의 공통 배경으로 소개하지 않는다. 색이 없는 장은 계속 중립이다.

## 적용할 기존 대표 장

| 루트 장 | 유지할 위계 | 확정 변화 |
| --- | --- | --- |
| 6 · 선언 | 흰 첫 줄·큰 중심 문장·여백 | 마지막 의미 단위만 선명한 orange, `motion: rise` |
| 7 · 범주 | 흰 제목·원형과 라벨의 대응 | 범주별 선명한 tone, `motion: stagger` |
| 8·12 · 사람 소개 | 이름 한 덩어리가 주역 | purple 선명도 조정, 자동 section 장식선 제거, `motion: rise` |
| 9 · 근거 차트 | 흰 주장·정적 수치·비교 기준 | `tone: blue`, highlight 행의 막대 하나만 blue, `motion: chart` |
| 15 · 수치 | 큰 수치와 해석 | 수치만 green, eyebrow는 중립, 기본 fade 유지 |
| 19 · 행동 단계 | 내용·순서·레이아웃 | 중립 구조 유지, `motion: stagger` |

발표 흐름을 검토하는 [독립 프리뷰](preview.html)는 자체 문구·SVG·가상 비교 데이터를 사용한다. 원본 사진·로고·발표자의 이름을 제품 자산으로 복제하지 않는다. 해당 프리뷰의 장면별 UI는 실제 제품의 새 편집기나 새 데이터 형식을 뜻하지 않는다.

## 개발 인계와 검증

`slide.motion` 계약과 상태 예외는 [모션 사양](motion-spec.md)을 따른다. Stage·Midnight·Paper의 같은 의미 관계, 차트 선택 막대 하나의 색, 메타 중립화, 사진 원색 보존을 실제 화면으로 확인한다. 읽기·전체 보기·발표자·PDF에서도 최종 정보와 색의 관계가 같아야 한다.

프리뷰 HTML·CSS는 브랜드 담당, 동작 JavaScript·모션 사양·취합은 모션 담당이 소유한다. 인터페이스와 타이밍은 직접 합의했으며 제품 코드는 이 디자인 단계에서 편집하지 않는다. 팀 상태·담당자·미완료 작업의 단일 기록은 루트 `WORK_LOG.md`다.
