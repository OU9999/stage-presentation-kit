# 한 이야기로 이어지는 데이터 디자인

2026-10-24 · 취합 `/root/design_manager/systems_designer`

**관찰한 변화에서 출발해, 마찰을 듣고, 다음 선택과 투입 계획으로 이어진다.** [12장 storyboard](../research/storyboard.md)를 유지하며 KPI와 서로 다른 여덟 SVG 표현을 연결한다. [단일 dataset](../research/dataset.json)의 가상 관찰 수치와 주관적 기획 설정을 같은 성과처럼 묶지 않는다.

## 서로 다른 두 실무의 실제 결과

| 전문성·실무 | 실제 작성 | 교차 검토 |
| --- | --- | --- |
| 정량 정보시각화 `/root/design_manager/information_designer` | [charts.cjs](../../../scripts/visual-story/charts.cjs)의 퍼널·12주 추세·48명 구성비·단계 전환율, [정량 사양](charts-spec.md) | 도식 담당이 기간·분모·원본 정수 계산·축을 코드와 대조했다. |
| 정보설계·도식 `/root/design_manager/systems_designer` | [diagrams.cjs](../../../scripts/visual-story/diagrams.cjs)의 여정·우선순위·일정·투입, [도식 사양](diagrams-spec.md), 이 취합 | 정량 담당이 ID 참조·기획 점수 축·일정 길이·행열 합과 글자 대비 전략을 대조했다. |

공통 [theme.cjs](../../../scripts/visual-story/theme.cjs)는 매니저 소유이며 두 모듈의 팔레트·안전한 텍스트 출력·SVG wrapper와 기본 계산을 공유한다. 팀은 API와 소유권을 직접 합의하고 상대 파일을 동시에 편집하지 않았다.

## 생성 모듈의 확정 API

모든 함수는 `function(data) → SVG 문자열`이다. raw canonical dataset을 읽으며 파일 저장이나 원본 변경을 하지 않는다.

| 모듈 | export |
| --- | --- |
| `charts.cjs` | `renderFunnel`, `renderTrend`, `renderComposition`, `renderStepRates` |
| `diagrams.cjs` | `renderJourney`, `renderPriority`, `renderRoadmap`, `renderEffort` |

`1280×640` viewBox·로컬 운영체제 글꼴·최소 26px 라벨·자체 title/desc를 제공한다. 숫자·라벨·ID 관계는 데이터에서 읽고, 비율·차이·구성 길이·좌표·일정 길이·투입 합계는 생성할 때 계산한다. 원본 정수 계산 후 최종 표시에서만 반올림한다. 외부 폰트·CDN·라이브러리·이미지 요청이나 공통 런타임 확장이 없다.

## 시각적 이야기

1. **표지와 KPI:** native `cover`와 `metric-pair`로 가상 첫 경험 관찰과 기준·후반의 차이를 크게 제시한다.
2. **퍼널과 추세:** 동일 기간 가입 분모의 정렬 막대와 누락 없는 12주 선으로 변화의 위치·시간을 본다. 면적·원근·이중 축으로 수치를 과장하지 않는다.
3. **구성비와 단계율:** 인터뷰 응답 분모와 직전 단계 분모를 따로 명시한다. 전자는 선정된 응답자의 마찰 분류이고 후자는 원본 퍼널에서 다시 계산한 전환율이다.
4. **여정과 우선순위:** 세 기능의 대응 관계와 예상 영향×노력의 기획 판단을 표현한다. 이동량이나 실제 성공 확률로 해석하지 않는다.
5. **일정과 투입:** 실행 주차와 인·주를 구분해 같은 계획의 시간·자원을 본다. W13 집계 확정은 W1–W12 실행 축 밖의 주석으로 남긴다.
6. **다음 검증과 닫기:** 기존 `steps` 또는 `compare`와 `closing`으로 아직 모르는 질문과 같은 기준의 다음 관찰을 연결한다.

native KPI를 포함해 아홉 가지 표현이다. 색은 비교·대상·계획의 역할에만 쓰며 Stage 중립 바탕·보조 메타·발표다운 여백을 유지한다. SVG 안에는 큰 장 제목을 반복하지 않고 native 텍스트에 한 결론을 둔다. 효과는 기존 장 진입 fade 또는 의미 있는 native 텍스트의 rise/stagger만 사용하며 SVG 내부 전용 모션을 추가하지 않는다.

## 후속 엔지니어링 인계

실제 편집 원본은 `examples/visual-story/data.json` 하나다. 같은 원본에서 숫자가 들어가는 발표 원문·SVG 여덟 개·실제 HTML 요약과 표를 함께 재생성한다. 이 연구 JSON은 확정 입력 스냅샷이며 제품이 연구 폴더를 런타임 의존성으로 삼지 않는다. 기존 다섯 예제의 손편집 Markdown 계약은 보존하고, 새 생성 Markdown은 재생성 산출물임을 안내한다.

SVG는 기존 `image`에 `fit: contain`으로 넣는다. 각 그림의 짧은 alt는 종류·기간·결론을 설명하고 정확한 값·관계·계산은 `data.html`에서 읽는다. 표 anchor는 `periods`, `weekly`, `funnel`, `interviews`, `step-rates`, `journey`, `priorities`, `roadmap`, `effort`, `next-validation`을 유지한다. 닫는 장의 `url: data.html`과 작성 안내의 실제 링크로 표 진입을 제공하며 일반 source 문자열이 자동 링크가 된다고 가정하지 않는다.

390px에서는 작은 SVG 축을 모두 읽을 수 있다고 주장하지 않는다. native 메시지·짧은 alt·같은 데이터의 실제 HTML 표를 함께 확인한다. 정수·분모·관찰창·합계·계획/관찰 구분은 리서치 계약, 실제 생성·오류 보존·원고/표 동기화·오프라인은 엔지니어링, 최종 실제 발표·PDF는 총괄이 검증한다.

[디자인 프리뷰](preview.html)와 매니저 검수 근거에서 대표 SVG의 실제 배치·모바일 외곽·텍스트 bounds를 확인한다. 이 취합의 정적 코드 교차 검토를 제품 통합 검증이나 전면 접근성 검증으로 확대하지 않는다. 팀 운영 상태와 다음 행동의 단일 기록은 루트 `WORK_LOG.md`다.
