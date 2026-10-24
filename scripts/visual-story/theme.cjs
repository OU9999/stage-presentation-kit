"use strict";

// Shared design primitives. The caller validates the canonical input before rendering.
const palette = Object.freeze({
  canvas: "#080808", text: "#f6f6f4", muted: "#a4a4a1", line: "#353535",
  wash: "#171717", blue: "#24a8ff", green: "#69cf82", purple: "#a080ff",
  orange: "#ff7a3d", yellow: "#edcf66"
});
const font = '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

function esc(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function rounded(value, decimals = 1) {
  const factor = 10 ** decimals;
  const result = Math.sign(value) * Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor;
  return Object.is(result, -0) ? 0 : result;
}

function number(value, decimals = 0) {
  return rounded(value, decimals).toLocaleString("en-US", {
    minimumFractionDigits: 0, maximumFractionDigits: decimals
  });
}

function percent(value, decimals = 1) { return number(value, decimals) + "%"; }
function rate(numerator, denominator) { return numerator * 100 / denominator; }
function points(value, decimals = 1) { return (value > 0 ? "+" : "") + number(value, decimals) + "%p"; }
// Compare magnitude while preserving the signed change; ties retain the first stage.
function largestChangeIndex(values) {
  return values.reduce((selected, value, index) => Math.abs(value) > Math.abs(values[selected]) ? index : selected, 0);
}

function text(x, y, value, options = {}) {
  const { size = 30, fill = palette.text, anchor = "start", weight = 400 } = options;
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${esc(fill)}" text-anchor="${esc(anchor)}" font-weight="${weight}">${esc(value)}</text>`;
}

function lines(x, y, values, options = {}) {
  const { lineHeight = 36, ...rest } = options;
  return values.map((value, index) => text(x, y + index * lineHeight, value, rest)).join("");
}

function wrap(value, maximum = 13) {
  const output = [];
  let line = "";
  for (const word of String(value).split(/\s+/)) {
    if (line && Array.from(line + " " + word).length > maximum) { output.push(line); line = ""; }
    if (Array.from(word).length > maximum) {
      if (line) { output.push(line); line = ""; }
      const chars = Array.from(word);
      while (chars.length > maximum) output.push(chars.splice(0, maximum).join(""));
      line = chars.join("");
    } else line += (line ? " " : "") + word;
  }
  if (line) output.push(line);
  return output;
}

function svg(id, title, description, body, width = 1280, height = 640) {
  const identifier = String(id).replace(/[^a-zA-Z0-9_-]/g, "-");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${identifier}-title ${identifier}-desc" font-family="${esc(font)}"><title id="${identifier}-title">${esc(title)}</title><desc id="${identifier}-desc">${esc(description)}</desc><rect width="${width}" height="${height}" fill="${palette.canvas}"/>${body}</svg>`;
}

function periodSummary(data, id) {
  const period = data.periods.find(item => item.id === id);
  if (!period) throw new Error("Unknown visual-story period: " + id);
  const weeks = data.weeklyCohorts.filter(item => item.week >= period.fromWeek && item.week <= period.toWeek);
  const registered = weeks.reduce((sum, item) => sum + item.registered, 0);
  const activated = weeks.reduce((sum, item) => sum + item.activated, 0);
  return { ...period, registered, activated, rate: rate(activated, registered) };
}

function funnelSeries(data, id) {
  const period = periodSummary(data, id);
  const intermediate = data.funnel.intermediateCounts.find(item => item.period === id);
  return data.funnel.stages.map(stage => ({
    ...stage,
    value: stage.source === "periodRegistered" ? period.registered :
      stage.source === "periodActivated" ? period.activated : intermediate[stage.id]
  }));
}

module.exports = { palette, font, esc, rounded, number, percent, rate, points, largestChangeIndex, text, lines, wrap, svg, periodSummary, funnelSeries };
