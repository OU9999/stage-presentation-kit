"use strict";

const { number, percent, points } = require("./theme.cjs");

function buildSlides(data, summary, assetVersions = {}) {
  const { baseline, followup, activationDifference, weekly, stepRates, interviews, effort } = summary;
  const decimals = data.measurement.percentageDecimals;
  const period = item => `W${item.fromWeek}–W${item.toWeek}`;
  const note = anchor => `${data.meta.disclosure}\n${data.meta.studyDesign}\n집계 정의: ${data.measurement.activation}\n${data.meta.reportingCutoff}\n수치·관계·계산: data.html#${anchor}\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.`;
  const source = anchor => `가상 데이터 · 상세 표 data.html#${anchor}`;
  const topReason = [...interviews].sort((a, b) => b.count - a.count)[0];
  const strongest = summary.maxStepDifference;
  const first = weekly[0], last = weekly[weekly.length - 1];
  const image = (id, title, message, alt, anchor, extra = {}) => ({ id, layout: "image", motion: "fade", quiet: true, title, src: `assets/${id}.svg${assetVersions[id] ? `?v=${assetVersions[id]}` : ""}`, alt, fit: "contain", caption: message, notes: `${note(anchor)}\n출처: ${source(anchor)}`, ...extra });
  return [
    { id: "opening", layout: "cover", align: "center", motion: "rise", title: ["첫 경험을,", "다음 행동으로."], tone: "blue", highlight: "다음 행동으로.", subtitle: `${number(weekly.length)}주 가상 제품 개선 프로젝트`, notes: note("periods") },
    { id: "observed-change", layout: "metric-pair", motion: "fade", title: `활성화율의 관찰 차이, ${points(activationDifference, decimals)}.`, items: [
      { value: number(baseline.rate, decimals), unit: "%", label: `${baseline.label} · ${period(baseline)}`, tone: "white" },
      { value: number(followup.rate, decimals), unit: "%", label: `${followup.label} · ${period(followup)}`, tone: "blue" }
    ], support: `${number(baseline.activated)}/${number(baseline.registered)}명 → ${number(followup.activated)}/${number(followup.registered)}명 · 가입 후 ${number(data.measurement.outcomeWindowDays)}일 내 첫 공유`, notes: note("periods") },
    image("funnel", "첫 공유까지, 어디가 달랐을까?", `첫 공유 ${number(baseline.activated)}명 → ${number(followup.activated)}명 · 신규 가입 ${number(baseline.registered)}명 / ${number(followup.registered)}명`, `기준과 후반의 단계별 인원을 비교한 퍼널. 첫 공유는 ${number(baseline.activated)}명에서 ${number(followup.activated)}명으로 관찰됐습니다.`, "funnel"),
    image("trend", "변화가 이어지는 시간을 봅니다.", `주별 첫 공유율 ${percent(first.rate, decimals)} → ${percent(last.rate, decimals)}. 모든 주는 같은 관찰창.`, `${number(weekly.length)}개 가입 코호트의 ${number(data.measurement.outcomeWindowDays)}일 내 첫 공유율 추세. 첫 주 ${percent(first.rate, decimals)}, 마지막 주 ${percent(last.rate, decimals)}이며 인과 효과를 뜻하지 않습니다.`, "weekly"),
    image("composition", "사람들이 말한, 첫 마찰.", `${number(data.interviews.sampleSize)}명 중 ${number(topReason.count)}명: ${topReason.label}.`, `선정한 가상 인터뷰 응답자 ${number(data.interviews.sampleSize)}명의 대표 마찰 분포. 전체 가입자의 발생률은 아닙니다.`, "interviews"),
    image("step-rates", "다음 연결을, 더 자세히.", `${strongest.label} 구간: 가장 큰 관찰 변화폭 ${points(strongest.difference, decimals)}.`, `기준과 후반의 직전 단계 전환율 비교. ${strongest.label} 구간에서 가장 큰 관찰 변화폭이 나타났습니다.`, "step-rates"),
    image("journey", "마찰을, 다음 행동에 연결합니다.", "기능 제안과 경험 단계의 대응 관계를 그립니다.", "가입부터 첫 공유까지의 여정에 제안 기능과 인터뷰 이유를 연결한 도식. 실제 이동량이나 인과 관계가 아닙니다.", "journey"),
    image("priorities", "무엇을 먼저, 확인할까요?", "예상 영향과 노력의 기획 판단으로 검증 순서를 정합니다.", "개선안의 예상 영향과 노력에 대한 가상 기획 점수. 측정 성과나 성공 확률이 아닙니다.", "priorities"),
    image("roadmap", "관찰에서, 적용과 확인까지.", `${number(weekly.length)}주 계획. 마지막 코호트의 추적 완료 후 집계를 확정합니다.`, "프로젝트 주차별 과업 일정. 각 과업의 시작과 종료를 모두 포함하며 마지막 코호트 추적 완료 시점을 구분합니다.", "roadmap"),
    image("effort", "사람의 시간을, 나눠 봅니다.", `역할과 기간별 계획 ${number(effort.total)}${data.effortAllocation.unit}. 경과 주수와 다른 단위입니다.`, `역할과 기간별 투입 계획. 셀·행·열 합계를 ${data.effortAllocation.unit}로 비교하며 전체 ${number(effort.total)}${data.effortAllocation.unit}입니다.`, "effort"),
    { id: "next-validation", layout: "steps", motion: "stagger", title: ["관찰 차이 다음에는,", "다시 검증합니다."], steps: data.nextValidation.plans.map(plan => ({ title: data.initiatives.items.find(item => item.id === plan.initiative).label, description: plan.method })), notes: note("next-validation") },
    { id: "closing", layout: "closing", align: "center", motion: "rise", title: ["작게 적용하고,", "같은 기준으로 다시 봅니다."], takeaway: "가상 관찰과 다음 검증 계획을 구분합니다.", action: "정확한 수치·계산·표 열기", url: "data.html", notes: note("next-validation") }
  ];
}

function renderMarkdown(data, summary, assetVersions = {}) {
  const slides = buildSlides(data, summary, assetVersions);
  const front = `---\nid: ${JSON.stringify(data.meta.id)}\ntitle: ${JSON.stringify(data.meta.title)}\ntheme: stage\nspeaker: 가상 프로젝트 팀\ndate: ${JSON.stringify(`${summary.weekly.length}주 관찰 예시`)}\nfooter: 가상 데이터 · 실제 성과 아님\n---\n\n`;
  return front + slides.map(slide => "```stage\n" + JSON.stringify(slide, null, 2) + "\n```").join("\n\n---\n\n") + "\n";
}

module.exports = { buildSlides, renderMarkdown };
