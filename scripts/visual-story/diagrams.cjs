"use strict";

const { palette: p, esc, number, text, lines, wrap, svg } = require("./theme.cjs");
const roleColors = [p.green, p.blue, p.purple, p.muted];
const rect = (x, y, width, height, fill, stroke = "none", radius = 0) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${esc(fill)}" stroke="${esc(stroke)}" stroke-width="2"/>`;
const line = (x1, y1, x2, y2, stroke = p.line, width = 2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${esc(stroke)}" stroke-width="${width}"/>`;
const circle = (x, y, radius, fill) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${esc(fill)}"/>`;
const sum = values => values.reduce((total, value) => total + value, 0);

function renderJourney(data) {
  const ordered = data.journeyMap.path.map(id => data.journeyMap.nodes.find(node => node.id === id));
  const centers = ordered.map((_, index) => 160 + index * (930 / (ordered.length - 1)));
  const nodeWidth = 240;
  let body = text(40, 70, "경험 단계", { size: 28, fill: p.muted });
  ordered.forEach((node, index) => {
    const x = centers[index];
    body += rect(x - nodeWidth / 2, 135, nodeWidth, 110, p.wash, p.line, 8);
    const labelLines = wrap(node.label, 8);
    body += lines(x, labelLines.length > 1 ? 181 : 201, labelLines, { size: 30, lineHeight: 37, anchor: "middle" });
    if (index < ordered.length - 1) {
      const start = x + nodeWidth / 2 + 8;
      const end = centers[index + 1] - nodeWidth / 2 - 10;
      body += line(start, 190, end, 190, p.muted);
      body += `<path d="M${end - 9} 182 L${end} 190 L${end - 9} 198" fill="none" stroke="${p.muted}" stroke-width="2"/>`;
    }
  });
  body += text(40, 350, "기능 제안", { size: 28, fill: p.muted });
  const descriptions = [];
  data.journeyMap.interventions.forEach((intervention, index) => {
    const initiative = data.initiatives.items.find(item => item.id === intervention.initiative);
    const reason = data.interviews.categories.find(item => item.id === intervention.interviewReason);
    const atIndex = ordered.findIndex(node => node.id === intervention.atStage);
    const x = centers[atIndex];
    const color = roleColors[index % roleColors.length];
    body += line(x, 245, x, 310, color);
    body += circle(x, 310, 5, color);
    body += rect(x - nodeWidth / 2, 326, nodeWidth, 86, p.canvas, color, 8);
    const titleLines = wrap(initiative.label, 8);
    body += lines(x, titleLines.length > 1 ? 360 : 378, titleLines, { size: 30, lineHeight: 35, anchor: "middle", fill: color });
    body += lines(x, 462, wrap(reason.label, 9), { size: 26, lineHeight: 34, anchor: "middle", fill: p.muted });
    descriptions.push(`${initiative.label}은 ${ordered[atIndex].label} 단계에 대응하며 참고 마찰은 ${reason.label}이다`);
  });
  body += lines(40, 578, wrap(data.journeyMap.kind, 47), { size: 26, lineHeight: 34, fill: p.muted });
  return svg("journey", "여정 단계와 기능 제안의 대응", descriptions.join(". ") + ". 실제 사용자 이동량이나 인과 효과를 뜻하지 않는다.", body);
}

function renderPriority(data) {
  const { min, max } = data.initiatives.scoreScale;
  const left = 120, top = 125, width = 520, height = 380;
  const px = value => left + (value - min) / (max - min) * width;
  const py = value => top + (max - value) / (max - min) * height;
  let body = text(90, 62, "예상 영향 ↑", { size: 28, fill: p.muted });
  body += text(780, 62, "가상 기획 판단 · 측정 성과 아님", { size: 26, fill: p.muted });
  for (let value = min; value <= max; value++) {
    body += line(px(value), top, px(value), top + height);
    body += line(left, py(value), left + width, py(value));
    body += text(px(value), top + height + 43, number(value), { size: 28, anchor: "middle", fill: p.muted });
    body += text(left - 28, py(value) + 10, number(value), { size: 28, anchor: "end", fill: p.muted });
  }
  body += text(left + width, 592, `노력 · ${number(min)}–${number(max)}점 →`, { size: 28, anchor: "end", fill: p.muted });
  data.initiatives.items.forEach((item, index) => {
    const color = roleColors[index % roleColors.length];
    const key = String(index + 1).padStart(2, "0");
    body += circle(px(item.effortScore), py(item.impactScore), 23, color);
    body += text(px(item.effortScore), py(item.impactScore) + 9, key, { size: 26, anchor: "middle", fill: p.canvas, weight: 600 });
    const y = 140 + index * 110;
    body += circle(800, y, 22, color);
    body += text(800, y + 9, key, { size: 26, anchor: "middle", fill: p.canvas, weight: 600 });
    body += text(840, y + 9, item.label, { size: 30, fill: color });
    body += text(840, y + 48, `영향 ${number(item.impactScore)} · 노력 ${number(item.effortScore)} · ${item.priority}`, { size: 26, fill: p.muted });
  });
  return svg("priority", "예상 영향과 노력의 기획 점수", data.initiatives.items.map(item => `${item.label}: 예상 영향 ${item.impactScore}점, 노력 ${item.effortScore}점, ${item.priority}`).join(". ") + ". 주관적 기획 판단이며 실제 효과 측정값이 아니다.", body);
}

function renderRoadmap(data) {
  const minWeek = Math.min(...data.weeklyCohorts.map(item => item.week));
  const maxWeek = Math.max(...data.weeklyCohorts.map(item => item.week));
  const weekCount = maxWeek - minWeek + 1;
  const left = 370, width = 850, cell = width / weekCount;
  let body = text(40, 57, data.roadmap.kind, { size: 28, fill: p.muted });
  data.periods.forEach((period, index) => {
    const start = left + (period.fromWeek - minWeek) * cell;
    const periodWidth = (period.toWeek - period.fromWeek + 1) * cell;
    body += text(start + periodWidth / 2, 86, period.label, { size: 28, anchor: "middle", fill: roleColors[index % roleColors.length] });
    body += line(start + 4, 102, start + periodWidth - 4, 102, roleColors[index % roleColors.length], 3);
  });
  for (let week = minWeek; week <= maxWeek; week++) {
    const x = left + (week - minWeek) * cell;
    body += text(x + cell / 2, 141, "W" + number(week), { size: 26, anchor: "middle", fill: p.muted });
    body += line(x, 158, x, 518);
  }
  body += line(left + width, 158, left + width, 518);
  const rowGap = 135;
  data.roadmap.tasks.forEach((task, index) => {
    const top = 176 + index * rowGap;
    const x = left + (task.fromWeek - minWeek) * cell;
    const taskWidth = (task.toWeek - task.fromWeek + 1) * cell;
    const color = roleColors[index % roleColors.length];
    const taskLines = wrap(task.label, 12);
    body += lines(40, top + (taskLines.length > 1 ? 28 : 45), taskLines, { size: 30, lineHeight: 37 });
    body += rect(x + 4, top, taskWidth - 8, 72, color, "none", 5);
    const taskLabel = task.fromWeek === task.toWeek ? `W${number(task.fromWeek)}` : `W${number(task.fromWeek)}–W${number(task.toWeek)}`;
    body += text(x + taskWidth / 2, top + 46, taskLabel, { size: 30, anchor: "middle", fill: p.canvas, weight: 500 });
  });
  body += lines(40, 580, wrap(data.roadmap.followupNote, 48), { size: 26, lineHeight: 34, fill: p.muted });
  return svg("roadmap", "프로젝트 주차별 실행 계획", data.roadmap.tasks.map(task => `${task.label}: W${task.fromWeek}부터 W${task.toWeek}까지, 시작과 끝을 포함한 ${task.toWeek - task.fromWeek + 1}주`).join(". ") + ". " + data.roadmap.followupNote, body);
}

function mix(first, second, ratio) {
  const channels = value => value.slice(1).match(/../g).map(channel => parseInt(channel, 16));
  const a = channels(first), b = channels(second);
  return "#" + a.map((value, index) => Math.round(value + (b[index] - value) * ratio).toString(16).padStart(2, "0")).join("");
}

function luminance(color) {
  const channels = color.slice(1).match(/../g).map(channel => {
    const value = parseInt(channel, 16) / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}

function readable(fill) {
  const l = luminance(fill), light = luminance(p.text), dark = luminance(p.canvas);
  return (light + .05) / (l + .05) > (l + .05) / (dark + .05) ? p.text : p.canvas;
}

function renderEffort(data) {
  const allocation = data.effortAllocation;
  const values = allocation.items.flatMap(item => item.personWeeksByPeriod);
  const maximum = Math.max(...values);
  const total = sum(values);
  const left = 330, top = 153, cellWidth = 210, cellHeight = 105;
  const color = value => mix(p.wash, p.blue, .2 + .8 * value / maximum);
  let body = text(40, 57, `${allocation.kind} · ${allocation.unit}`, { size: 28, fill: p.muted });
  body += text(1210, 57, `총 ${number(total)}${allocation.unit}`, { size: 34, anchor: "end" });
  allocation.periodOrder.forEach((id, index) => {
    const period = data.periods.find(item => item.id === id);
    body += text(left + (index + .5) * cellWidth, 110, period.label, { size: 28, anchor: "middle" });
  });
  body += text(1110, 110, "역할 합계", { size: 28, anchor: "middle", fill: p.muted });
  allocation.items.forEach((item, row) => {
    const y = top + row * cellHeight;
    body += text(40, y + 65, item.label, { size: 30 });
    item.personWeeksByPeriod.forEach((value, column) => {
      const x = left + column * cellWidth;
      const fill = color(value);
      body += rect(x + 4, y + 4, cellWidth - 8, cellHeight - 8, fill, "none", 4);
      body += text(x + cellWidth / 2, y + 69, number(value), { size: 46, anchor: "middle", fill: readable(fill), weight: 500 });
    });
    body += text(1110, y + 69, number(sum(item.personWeeksByPeriod)), { size: 40, anchor: "middle" });
  });
  const totalsY = top + allocation.items.length * cellHeight + 62;
  body += line(40, totalsY - 48, 1210, totalsY - 48);
  body += text(40, totalsY, "기간 합계", { size: 30, fill: p.muted });
  allocation.periodOrder.forEach((_, column) => {
    const value = sum(allocation.items.map(item => item.personWeeksByPeriod[column]));
    body += text(left + (column + .5) * cellWidth, totalsY, number(value), { size: 40, anchor: "middle" });
  });
  body += text(1110, totalsY, number(total), { size: 40, anchor: "middle", fill: p.blue });
  const distinct = [...new Set(values)].sort((a, b) => a - b);
  const legend = distinct.length > 3 ? [distinct[0], distinct[Math.floor((distinct.length - 1) / 2)], distinct[distinct.length - 1]] : distinct;
  body += text(40, 610, "셀의 색은 투입량을 보조합니다.", { size: 26, fill: p.muted });
  legend.forEach((value, index) => {
    const x = 820 + index * 135;
    body += rect(x, 586, 28, 28, color(value));
    body += text(x + 42, 609, `${number(value)}${allocation.unit}`, { size: 26, fill: p.muted });
  });
  return svg("effort", "역할과 기간별 투입 계획", `${allocation.definition} 역할별 합계는 ${allocation.items.map(item => item.label + " " + sum(item.personWeeksByPeriod) + allocation.unit).join(", ")}. 전체 ${total}${allocation.unit}이며 프로젝트 경과 주수와 다른 단위다.`, body);
}

module.exports = { renderJourney, renderPriority, renderRoadmap, renderEffort };
