"use strict";

// Design-only preview. Product generation reads examples/visual-story/data.json instead.
const fs = require("node:fs");
const path = require("node:path");
const data = require("../research/dataset.json");
const charts = require("../../../scripts/visual-story/charts.cjs");
const diagrams = require("../../../scripts/visual-story/diagrams.cjs");
const { esc, percent, points, periodSummary, funnelSeries, rate, number } = require("../../../scripts/visual-story/theme.cjs");
const baseline = periodSummary(data, "baseline");
const followup = periodSummary(data, "followup");
const first = data.weeklyCohorts[0];
const last = data.weeklyCohorts[data.weeklyCohorts.length - 1];
const previousFunnel = funnelSeries(data, "baseline");
const laterFunnel = funnelSeries(data, "followup");
const lastIndex = previousFunnel.length - 1;
const finalStepDifference = rate(laterFunnel[lastIndex].value, laterFunnel[lastIndex - 1].value) - rate(previousFunnel[lastIndex].value, previousFunnel[lastIndex - 1].value);
const effort = data.effortAllocation.items.reduce((sum, item) => sum + item.personWeeksByPeriod.reduce((total, value) => total + value, 0), 0);
const entries = [
  ["funnel", "퍼널", "같은 가입 분모에서, 마지막 공유까지.", `${number(baseline.activated)}명 → ${number(followup.activated)}명 · 가입 후 ${data.measurement.outcomeWindowDays}일 이내`, charts.renderFunnel],
  ["trend", "12주 추세", "중간 주차를 빼지 않고 이어 봅니다.", `${percent(rate(first.activated, first.registered))} → ${percent(rate(last.activated, last.registered))} · 서로 다른 주차 코호트의 관찰`, charts.renderTrend],
  ["composition", "인터뷰 구성비", "처음 시작할 때의 마찰을 듣습니다.", `선정된 가상 인터뷰 ${number(data.interviews.sampleSize)}명의 대표 원인 분류`, charts.renderComposition],
  ["step-rates", "단계 전환율", "초안에서 공유로, 연결을 다시 봅니다.", `마지막 구간의 관찰 차이 ${points(finalStepDifference)} · 직전 단계가 분모`, charts.renderStepRates],
  ["journey", "여정 대응", "각 마찰에, 제안을 연결합니다.", "대응 관계를 보여주는 기획 도식 · 이동량이나 인과 효과가 아닙니다", diagrams.renderJourney],
  ["priorities", "우선순위", "영향과 노력을 함께 봅니다.", `가상 기획 판단 · ${data.initiatives.scoreScale.min}–${data.initiatives.scoreScale.max}점 순서척도`, diagrams.renderPriority],
  ["roadmap", "일정", "관찰하고, 적용하고, 다시 확인합니다.", data.roadmap.followupNote, diagrams.renderRoadmap],
  ["effort", "역할별 투입", "사람의 시간을 기간에 나눠 놓습니다.", `총 ${number(effort)}${data.effortAllocation.unit}의 가상 투입 계획 · 경과 주수와 다른 단위`, diagrams.renderEffort]
];

fs.mkdirSync(path.join(__dirname, "svg"), { recursive: true });
const cards = entries.map(([id, label, title, message, render], index) => {
  const drawing = render(data);
  fs.writeFileSync(path.join(__dirname, "svg", id + ".svg"), drawing + "\n");
  return `<section id="${id}"><div class="section-heading"><span>${String(index + 1).padStart(2, "0")} / ${esc(label)}</span><h2>${esc(title)}</h2><p>${esc(message)}</p></div><figure data-chart="${id}">${drawing}</figure></section>`;
}).join("\n");
const navigation = entries.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("");
const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>STAGE — 한 이야기, 여러 시각</title>
<style>
:root{color-scheme:dark;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:#f6f6f4;background:#111}*{box-sizing:border-box}body{margin:0}main{max-width:1360px;margin:auto;padding:36px 40px 70px}header{display:flex;justify-content:space-between;gap:24px;border-bottom:1px solid #353535;padding-bottom:24px}header strong{font-size:23px;letter-spacing:-.06em}header span{font-size:12px;color:#a4a4a1}a{color:inherit;text-underline-offset:4px}a:focus-visible{outline:2px solid white;outline-offset:5px}.intro{padding:60px 0 30px}.intro p{font-size:15px;color:#a4a4a1;line-height:1.7;max-width:850px}.intro h1{font-size:52px;font-weight:450;letter-spacing:-.06em;line-height:1.2;margin:16px 0}.kpi{display:flex;align-items:baseline;gap:20px;font-size:36px;letter-spacing:-.04em;margin:32px 0;color:#a4a4a1}.kpi strong{color:#24a8ff;font-size:64px;font-weight:450}.kpi small{font-size:24px;color:#69cf82}nav{display:flex;gap:10px 20px;flex-wrap:wrap;padding:18px 0 30px;border-bottom:1px solid #353535}nav a{font-size:13px;color:#a4a4a1}section{padding:45px 0 25px;scroll-margin-top:20px}.section-heading>span{color:#a4a4a1;font-size:12px}.section-heading h2{font-size:30px;font-weight:450;letter-spacing:-.045em;margin:16px 0 12px}.section-heading p{color:#a4a4a1;font-size:15px;line-height:1.6;margin:0 0 24px}figure{margin:0;border:1px solid #282828;background:#080808;overflow:hidden}figure svg{display:block;width:100%;height:auto}footer{margin-top:30px;padding-top:25px;border-top:1px solid #353535;font-size:13px;color:#a4a4a1;line-height:1.7}@media(max-width:700px){main{padding:24px 18px 40px}header span{max-width:180px;text-align:right;font-size:10px}.intro{padding-top:38px}.intro h1{font-size:36px}.intro p{font-size:13px}.kpi{gap:12px;font-size:25px;flex-wrap:wrap}.kpi strong{font-size:44px}.kpi small{font-size:18px}.section-heading h2{font-size:24px}.section-heading p{font-size:13px}nav{gap:12px 18px}section{padding-top:34px}}
</style></head><body><main><header><strong>STAGE</strong><span>하나의 관찰, 서로 다른 시각</span></header><div class="intro"><p>12주 가상 제품 개선 프로젝트</p><h1>첫 경험을,<br>다음 행동으로.</h1><p>${esc(data.meta.disclosure)} ${esc(data.meta.studyDesign)}</p><div class="kpi">${percent(baseline.rate)} <span>→</span> <strong>${percent(followup.rate)}</strong><small>${points(followup.rate - baseline.rate)} 관찰 차이</small></div><p>핵심 숫자에서 출발해 흐름·추세·마찰·다음 판단으로 이어집니다.</p></div><nav aria-label="시각 자료">${navigation}</nav>${cards}<footer>디자인 검토용 시안입니다. 작은 화면의 SVG 세부 축·라벨은 축소되므로 최종 예제에는 같은 데이터의 요약과 실제 HTML 표를 함께 제공합니다. 원본과 집계 기준은 <a href="../research/data-contract.md">데이터 계약</a>에 있습니다.</footer></main></body></html>\n`;
fs.writeFileSync(path.join(__dirname, "preview.html"), html);
process.stdout.write(`Generated ${entries.length} SVG drawings and preview.html\n`);
