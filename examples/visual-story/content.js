/* STAGE native visual example. Edit this file and refresh index.html: no build. */
(function () {
  "use strict";
  // Shared raw counts. The same values feed plots, emphasis, and data.html.
  const weekly = [[300, 90], [300, 102], [300, 111], [300, 117], [300, 123], [300, 132], [300, 141], [300, 150], [300, 156], [300, 162], [300, 168], [300, 174]];
  const sum = (rows, column) => rows.reduce((total, row) => total + row[column], 0);
  const baseline = weekly.slice(0, 4), followup = weekly.slice(-4);
  const rate = (numerator, denominator) => numerator * 100 / denominator;
  const activation = [rate(sum(baseline, 1), sum(baseline, 0)), rate(sum(followup, 1), sum(followup, 0))];
  const funnelLabels = ["신규 가입", "프로젝트 시작", "초안 완성", "첫 공유"];
  const funnelSeries = [
    { label: "기준 · W1–W4", values: [sum(baseline, 0), 840, 600, sum(baseline, 1)] },
    { label: "후반 · W9–W12", values: [sum(followup, 0), 960, 780, sum(followup, 1)] }
  ];
  const stepRates = funnelSeries.map(series => ({ label: series.label, values: series.values.slice(1).map((value, index) => rate(value, series.values[index])) }));
  const stepLabels = funnelLabels.slice(1).map((label, index) => funnelLabels[index] + " → " + label);
  const stepDifferences = stepLabels.map((_, index) => stepRates[1].values[index] - stepRates[0].values[index]);
  const largestChange = stepDifferences.reduce((best, value, index) => Math.abs(value) > Math.abs(stepDifferences[best]) ? index : best, 0);
  const frictions = { labels: ["빈 화면에서 시작하기 어려움", "다음 행동이 불명확함", "공유 전 확신이 부족함", "기타"], values: [18, 12, 10, 8] };
  const initiatives = [{ label: "시작 템플릿", x: 2, y: 5 }, { label: "다음 행동 안내", x: 2, y: 4 }, { label: "공유 미리보기", x: 3, y: 4 }, { label: "대시보드 확장", x: 5, y: 2 }];
  const disclosure = "가상 프로젝트 · 실제 회사나 실제 성과가 아닙니다.";
  const cohortContext = "가입 후 7일 내 첫 프로젝트 공유 · 마지막 코호트도 W13 종료까지 추적";
  const notes = anchor => disclosure + "\n같은 자료의 상세 표: data.html#" + anchor + "\n수정 원본은 content.js입니다. 시각자료 JSON을 편집해도 그림·강조값·표가 함께 바뀝니다.";
  const visualSlide = (id, title, context, visual) => ({ id, layout: "visual", title, subtitle: context, motion: "fade", quiet: true, visual, notes: notes(id) + "\n" + context });

  window.PRESENTATION = {
    id: "first-value-native-visual",
    title: "첫 경험을, 다음 행동으로.", theme: "stage", speaker: "가상 프로젝트 팀", date: "12주 관찰 예시", footer: "가상 자료 · 실제 성과 아님",
    slides: [
      { id: "opening", layout: "cover", align: "center", motion: "rise", title: ["첫 경험을,", "다음 행동으로."], tone: "blue", highlight: "다음 행동으로.", subtitle: "12주 가상 제품 개선 프로젝트", notes: notes("observed-change") },
      visualSlide("observed-change", "서로 다른 관찰을, 같은 기준으로.", "가입 후 7일 내 첫 공유율 · 기준 W1–W4 / 후반 W9–W12", { kind: "bars", labels: ["기준 · W1–W4", "후반 · W9–W12"], values: activation, unit: "%", focus: 1, emphasis: "focus", composition: "split" }),
      visualSlide("funnel", "첫 공유까지, 어디가 달랐을까?", "각 기간의 같은 단계 인원을 비교합니다.", { kind: "funnel", labels: funnelLabels, series: funnelSeries, unit: "명", focus: funnelLabels.length - 1, emphasis: "focus", composition: "split" }),
      visualSlide("weekly", "변화가 이어지는 시간을 봅니다.", cohortContext, { kind: "line", labels: weekly.map((_, index) => "W" + (index + 1)), numerators: weekly.map(row => row[1]), denominators: weekly.map(row => row[0]), unit: "%", focus: weekly.length - 1, emphasis: "focus", composition: "wide" }),
      visualSlide("interviews", "사람들이 말한, 첫 마찰.", "미활성 사용자 중 선정한 가상 인터뷰 · 대표 이유 하나씩", { kind: "composition", labels: frictions.labels, values: frictions.values, unit: "명", focus: 0, emphasis: "focus", composition: "wide" }),
      visualSlide("step-rates", "다음 연결을, 더 자세히.", "기준·후반 비교 · 분모: 각 구간의 직전 단계 인원", { kind: "bars", labels: stepLabels, series: stepRates, unit: "%", focus: largestChange, emphasis: "focus", composition: "wide" }),
      visualSlide("journey", "마찰을, 다음 행동에 연결합니다.", "제안 기능과 경험의 순서 · 실제 이동량이나 인과 관계가 아님", { kind: "flow", items: ["가입", "템플릿으로 시작", "안내 따라 초안", "미리보고 공유"], composition: "wide" }),
      visualSlide("priorities", "무엇을 먼저, 확인할까요?", "예상 영향 × 노력 · 가상 기획 판단, 측정 성과가 아님", { kind: "matrix", items: initiatives, xLabel: "노력", yLabel: "예상 영향", xDomain: [0, 6], yDomain: [0, 6], focus: [0, 1], composition: "wide" }),
      visualSlide("roadmap", "관찰에서, 적용과 확인까지.", "시작·끝 주 포함 · 최종 코호트 추적은 W13 종료에 확정", { kind: "timeline", items: [{ label: "기준 관찰·인터뷰", start: 1, end: 4 }, { label: "구현·점진 적용", start: 5, end: 8 }, { label: "후반 코호트 관찰", start: 9, end: 12 }], unit: "주", composition: "wide" }),
      visualSlide("effort", "사람의 시간을, 나눠 봅니다.", "역할 × 기간의 가상 계획 · 인·주는 경과 주수와 다름", { kind: "heatmap", rows: ["조사", "설계", "개발·품질"], columns: ["기준 관찰", "변경 적용", "후반 관찰"], values: [[3, 2, 1], [1, 3, 2], [1, 2, 3]], unit: "인·주", composition: "wide" }),
      { id: "next-validation", layout: "steps", motion: "stagger", title: ["관찰 차이 다음에는,", "다시 검증합니다."], steps: [{ title: initiatives[0].label, description: "신규 사용자의 첫 행동과 막힌 지점을 관찰합니다." }, { title: initiatives[1].label, description: "초안까지의 단계가 이해되는지 과업으로 점검합니다." }, { title: initiatives[2].label, description: "공유 의미와 오류 경로를 확인한 뒤 별도 비교합니다." }], notes: disclosure + "\nW14–W15의 가상 후속 계획이며 아직 수집한 결과가 아닙니다." },
      { id: "closing", layout: "closing", align: "center", motion: "rise", title: ["작게 적용하고,", "같은 기준으로 다시 봅니다."], takeaway: "자료 하나에서 그림·강조값·표를 함께 바꿉니다.", action: "파일에 보관한 원본 표 열기", url: "data.html", notes: disclosure }
    ]
  };
}());
