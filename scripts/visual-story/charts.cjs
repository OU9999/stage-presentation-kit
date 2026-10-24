"use strict";

const { palette: p, number, percent, rate, points, largestChangeIndex, text, lines, wrap, svg, periodSummary, funnelSeries } = require("./theme.cjs");

function rect(x, y, width, height, fill, extra = "") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" ${extra}/>`;
}
function line(x1, y1, x2, y2, stroke = p.line, extra = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" ${extra}/>`;
}
function periodLabel(period) { return `${period.label} · W${period.fromWeek}–W${period.toWeek}`; }

function renderFunnel(data) {
  const decimals = data.measurement.percentageDecimals;
  const periods = [periodSummary(data, "baseline"), periodSummary(data, "followup")];
  const series = periods.map(period => funnelSeries(data, period.id));
  const columns = [290, 850];
  const plotWidth = 340;
  let body = "";
  periods.forEach((period, column) => {
    const x = columns[column];
    body += text(x, 54, periodLabel(period), { size: 30, fill: column ? p.blue : p.muted });
    body += text(x, 94, `신규 가입 ${number(period.registered)}명`, { size: 26, fill: p.muted });
    body += line(x, 115, x, 550);
    body += line(x + plotWidth, 115, x + plotWidth, 550);
    series[column].forEach((stage, index) => {
      const y = 154 + index * 108;
      const share = rate(stage.value, period.registered);
      if (column === 0) {
        const labels = wrap(stage.label, 8);
        body += lines(30, y + 16 - (labels.length - 1) * 17, labels, { size: 30, lineHeight: 35 });
      }
      body += text(x, y, `${number(stage.value)}명 · ${percent(share, decimals)}`, {
        size: 30, fill: column && index === series[column].length - 1 ? p.blue : (column ? p.text : p.muted)
      });
      body += rect(x, y + 18, plotWidth, 25, p.wash);
      body += rect(x, y + 18, plotWidth * share / 100, 25, column ? p.blue : "#686866", column && index !== series[column].length - 1 ? 'opacity=".62"' : "");
    });
    body += text(x, 582, "0", { size: 26, fill: p.muted });
    body += text(x + plotWidth, 582, "가입 대비 100%", { size: 26, fill: p.muted, anchor: "end" });
  });
  body += text(30, 630, `단위: 명 · 막대: 같은 기간 신규 가입 대비율 · 가입 후 ${number(data.measurement.outcomeWindowDays)}일 관찰`, { size: 26, fill: p.muted });
  const description = periods.map((period, index) => `${periodLabel(period)}, ${series[index].map(stage => `${stage.label} ${number(stage.value)}명`).join(", ")}`).join(". ");
  return svg("visual-funnel", "단계별 가입 대비 인원 비교", description + ". 같은 기간 신규 가입자 수를 분모로 하는 가상 관찰 집계.", body);
}

function renderTrend(data) {
  const decimals = data.measurement.percentageDecimals;
  const weeks = [...data.weeklyCohorts].sort((a, b) => a.week - b.week);
  const first = weeks[0], last = weeks[weeks.length - 1];
  const plot = { x: 105, y: 125, width: 1070, height: 350 };
  const x = week => plot.x + (week - first.week) / (last.week - first.week) * plot.width;
  const y = value => plot.y + plot.height - value / 100 * plot.height;
  const spacing = plot.width / (weeks.length - 1);
  let body = text(30, 88, "활성화율 (%)", { size: 26, fill: p.muted });
  data.periods.forEach((period, index) => {
    const left = Math.max(plot.x, x(period.fromWeek) - spacing / 2);
    const right = Math.min(plot.x + plot.width, x(period.toWeek) + spacing / 2);
    body += rect(left, plot.y, right - left, plot.height, index === 1 ? "#15121d" : p.wash);
    body += text((left + right) / 2, 53, periodLabel(period), { size: 28, fill: index === 2 ? p.blue : p.muted, anchor: "middle" });
    if (index > 0) body += line(left, plot.y, left, plot.y + plot.height, "#575753", 'stroke-dasharray="6 7"');
  });
  [0, 25, 50, 75, 100].forEach(tick => {
    body += line(plot.x, y(tick), plot.x + plot.width, y(tick));
    body += text(plot.x - 20, y(tick) + 9, number(tick), { size: 26, fill: p.muted, anchor: "end" });
  });
  const coordinates = weeks.map(week => `${x(week.week)},${y(rate(week.activated, week.registered))}`).join(" ");
  body += `<polyline points="${coordinates}" fill="none" stroke="${p.blue}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
  weeks.forEach((week, index) => {
    const value = rate(week.activated, week.registered);
    body += `<circle cx="${x(week.week)}" cy="${y(value)}" r="${index === weeks.length - 1 ? 9 : 5}" fill="${p.blue}"/>`;
    body += text(x(week.week), 518, `W${week.week}`, { size: 26, fill: p.muted, anchor: "middle" });
  });
  body += text(x(first.week), y(rate(first.activated, first.registered)) - 25, percent(rate(first.activated, first.registered), decimals), { size: 38 });
  body += text(x(last.week), y(rate(last.activated, last.registered)) - 25, percent(rate(last.activated, last.registered), decimals), { size: 38, fill: p.blue, anchor: "end" });
  const uniqueDenominators = [...new Set(weeks.map(week => week.registered))];
  const denominator = uniqueDenominators.length === 1 ? `각 주 신규 가입 ${number(uniqueDenominators[0])}명` : "분모: 해당 주 신규 가입자 수";
  body += text(105, 579, `${denominator} · 가입 후 ${number(data.measurement.outcomeWindowDays)}일 안의 첫 공유`, { size: 26, fill: p.muted });
  body += text(105, 625, data.meta.reportingCutoff, { size: 26, fill: p.muted });
  const description = weeks.map(week => `W${week.week} ${number(week.activated)}/${number(week.registered)}명, ${percent(rate(week.activated, week.registered), decimals)}`).join(". ");
  return svg("visual-trend", "주별 활성화율 추세", description + ". 전후 관찰이며 인과 효과를 뜻하지 않는다.", body);
}

function renderComposition(data) {
  const survey = data.interviews;
  const decimals = data.measurement.percentageDecimals;
  const colors = [p.orange, p.purple, p.blue, "#656563"];
  const plot = { x: 40, y: 110, width: 1200, height: 90 };
  let body = text(40, 55, `응답 ${number(survey.sampleSize)}명 안의 분포`, { size: 32 });
  body += text(1240, 55, `${survey.period} · 대표 원인 하나`, { size: 26, fill: p.muted, anchor: "end" });
  let current = plot.x;
  survey.categories.forEach((category, index) => {
    const share = rate(category.count, survey.sampleSize);
    const width = plot.width * category.count / survey.sampleSize;
    const color = colors[index % colors.length];
    body += rect(current, plot.y, width, plot.height, color);
    // Narrow and zero segments keep their exact value in the legend and HTML table.
    if (width >= 150) body += text(current + width / 2, plot.y + 59, percent(share, decimals), { size: 38, fill: index % colors.length === 3 ? p.text : p.canvas, anchor: "middle", weight: 500 });
    current += width;
    const x = index % 2 === 0 ? 40 : 665;
    const y = 286 + Math.floor(index / 2) * 135;
    body += rect(x, y - 21, 20, 20, color);
    const labels = wrap(category.label, 17);
    body += lines(x + 36, y, labels, { size: 30, lineHeight: 35 });
    body += text(x + 36, y + labels.length * 35 + 8, `${number(category.count)}명 · ${percent(share, decimals)}`, { size: 30, fill: index === 0 ? p.orange : p.muted });
  });
  body += text(40, 588, "선정한 미활성 사용자 인터뷰 · 전체 신규 사용자 비율이 아닙니다.", { size: 26, fill: p.muted });
  body += text(40, 630, survey.kind, { size: 26, fill: p.muted });
  const description = survey.categories.map(category => `${category.label}: ${number(category.count)}명, ${percent(rate(category.count, survey.sampleSize), decimals)}`).join(". ");
  return svg("visual-composition", "인터뷰 대표 마찰의 구성비", `${survey.period} 가상 인터뷰 ${number(survey.sampleSize)}명. ${description}. 응답자별 대표 마찰 하나를 분류한 비중이며 전체 사용자 발생률이 아니다.`, body);
}

function renderStepRates(data) {
  const decimals = data.measurement.percentageDecimals;
  const periods = [periodSummary(data, "baseline"), periodSummary(data, "followup")];
  const series = periods.map(period => funnelSeries(data, period.id));
  const rates = series.map(stages => stages.slice(1).map((stage, index) => rate(stage.value, stages[index].value)));
  const differences = rates[0].map((value, index) => rates[1][index] - value);
  const maximumIndex = largestChangeIndex(differences);
  const maximum = differences[maximumIndex];
  const plot = { x: 470, width: 610 };
  let body = rect(470, 26, 28, 14, "#686866") + text(512, 48, periodLabel(periods[0]), { size: 28, fill: p.muted });
  body += rect(850, 26, 28, 14, p.blue) + text(892, 48, periodLabel(periods[1]), { size: 28 });
  [0, 50, 100].forEach(tick => {
    const x = plot.x + tick / 100 * plot.width;
    body += line(x, 110, x, 515);
    body += text(x, 557, percent(tick, 0), { size: 26, fill: p.muted, anchor: "middle" });
  });
  series[0].slice(1).forEach((stage, index) => {
    const y = 151 + index * 135;
    const label = `${series[0][index].label} → ${stage.label}`;
    const labels = wrap(label, 12);
    body += lines(30, y + 19 - (labels.length - 1) * 17, labels, { size: 30, lineHeight: 35 });
    [0, 1].forEach(column => {
      const value = rates[column][index];
      const barY = y - 8 + column * 40;
      body += rect(plot.x, barY, plot.width, 24, p.wash);
      body += rect(plot.x, barY, plot.width * value / 100, 24, column ? p.blue : "#686866", column && index !== maximumIndex ? 'opacity=".62"' : "");
      body += text(1230, barY + 24, percent(value, decimals), { size: 32, fill: column ? p.text : p.muted, anchor: "end" });
    });
  });
  body += text(30, 623, `가장 큰 관찰 차이 ${points(maximum, decimals)}`, { size: 32, fill: p.blue });
  body += text(1240, 623, "분모: 각 구간의 직전 단계 인원", { size: 26, fill: p.muted, anchor: "end" });
  const description = series[0].slice(1).map((stage, index) => `${series[0][index].label}에서 ${stage.label}: ${percent(rates[0][index], decimals)}에서 ${percent(rates[1][index], decimals)}, 차이 ${points(differences[index], decimals)}`).join(". ");
  return svg("visual-step-rates", "직전 단계 전환율 비교", description + ". 원본 인원으로 각각 계산한 가상 전후 관찰이다.", body);
}

module.exports = { renderFunnel, renderTrend, renderComposition, renderStepRates };
