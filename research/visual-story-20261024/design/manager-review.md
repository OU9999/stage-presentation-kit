# 디자인 생성 모듈 검수

2026-10-24 · `/root/design_manager`

**확정 데이터의 여덟 SVG 표현과 생성 API를 검수했고 추가 수정 의견은 없다.** 정량 시각화와 정보설계 실무자 두 명이 각각 실제 모듈·사양을 작성하고 서로 코드와 숫자를 직접 대조했다. 매니저는 공통 [theme.cjs](../../../scripts/visual-story/theme.cjs)를 먼저 확정·전달한 뒤 실제 출력을 독립 검수했다.

## 실제 산출물

- [charts.cjs](../../../scripts/visual-story/charts.cjs): `renderFunnel`, `renderTrend`, `renderComposition`, `renderStepRates`.
- [diagrams.cjs](../../../scripts/visual-story/diagrams.cjs): `renderJourney`, `renderPriority`, `renderRoadmap`, `renderEffort`.
- 모든 API는 raw canonical dataset을 받아 완성된 SVG 문자열을 반환한다. 원본 변경·파일 I/O·네트워크·외부 런타임이 없으며 숫자를 소스에 복사하지 않는다.
- [프리뷰 생성기](build-preview.cjs)는 연구 입력 스냅샷으로 [8개 SVG](svg/funnel.svg)와 [실제 프리뷰](preview.html)를 만든다. 제품 생성기는 후속 `examples/visual-story/data.json`을 단일 입력으로 사용한다.

## 독립 검수

| 검사 | 결과 |
| --- | --- |
| 숫자 표시 | 81.25%→81.3%, 35%→55%의 +20%p, 마지막 단계의 원본 정수 차이 +14.6%p가 일치. |
| 순수 생성 | 8함수에 깊게 동결한 입력을 전달해 정상 생성. 원본 불변·같은 입력의 바이트 동일·NaN/Infinity/undefined 없음. |
| SVG | 8개 XML 파싱·viewBox 1280×640·title/desc 확인. 외부 이미지·스크립트 요청 없음. |
| 데스크톱 | TaskSpace 3의 매니저 전용 p2, 1440px. 8개 모두 최소 글씨 26px, 텍스트 viewBox 이탈 0·텍스트끼리의 사각 경계 충돌 0. |
| 시각 검수 | 실제 캡처 8장을 모두 직접 열었다. 같은 분모의 퍼널, 누락 없는 12주 추세, 인터뷰 분모·긴 범례, 마지막 단계 강조, 여정 대응, 번호+목록 matrix, W13 주석, 숫자+범례 heatmap이 사양과 일치. |
| 390px | 문서 scrollWidth 390px, SVG 8개와 native 메시지가 보이며 가로 넘침 0. 작은 축·미세 라벨의 가독성을 통과했다고 주장하지 않음. |

실제 값과 파일 식별값은 [생성 검사](evidence/module-checks.json), SVG 텍스트 경계·모바일 결과는 [브라우저 검사](evidence/browser-review.json)에 있다. 대표 캡처는 [인터뷰 구성비](evidence/composition.png), [우선순위](evidence/priorities.png), [히트맵](evidence/effort.png), [모바일](evidence/mobile-composition.png)다. 매니저는 p1이나 이전 Space를 조작하지 않았고 p2를 총괄 종료용으로 남긴다.

## 구현 인계

[정량 사양](charts-spec.md)·[도식 사양](diagrams-spec.md)·[취합](synthesis.md)의 API와 짧은 alt 계약을 엔지니어링 매니저에게 직접 전달했다. 후속 생성기는 같은 `data.json`에서 숫자가 있는 Markdown·8 SVG·실제 HTML 표와 요약을 함께 생성한다. 표 앵커는 `periods/weekly/funnel/interviews/step-rates/journey/priorities/roadmap/effort/next-validation`을 유지한다.

SVG는 기존 `image`·`fit: contain`, KPI는 기존 native 수치 양식을 사용한다. 모바일은 native 메시지와 읽을 수 있는 HTML 표 진입을 함께 확인해야 한다. JSON만 제공하거나 축소 그래픽만으로 접근성 대안을 완료하지 않는다. 실제 발표·오프라인·PDF·데이터 오류 보존·표의 모바일 가독성은 후속 구현과 총괄 검증에 속한다.

두 실무자와 매니저는 코드·사양 편집 종료 상태다. 공통 런타임·예제 원고·제품 data.json·갤러리·WORK_LOG·Git은 수정하지 않았다. 운영 상태의 단일 기록은 루트 `WORK_LOG.md`다.
