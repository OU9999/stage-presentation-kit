(function (global) {
  "use strict";
  var C;
  function api() { C = global.VisualDesign; return C; }
  function element(tag, name, value) { return api().el(tag, name, value); }
  function finite(value) { return typeof value === "number" && Number.isFinite(value); }
  function format(value, unit) { return value === null || value === undefined || !finite(value) ? "—" : api().format(value, unit || ""); }
  function seriesFor(visual) {
    return api().normalizeSeries(visual).map(function (series, index) {
      return { label: series.label || (visual.series ? "계열 " + (index + 1) : "값"), values: series.values.slice() };
    });
  }
  function focusFor(visual, count, fallback) {
    var choices = api().focusIndices(visual, count);
    return choices.length ? choices[0] : fallback;
  }
  function heroFor(visual, series, index) {
    if (visual.emphasis !== "focus" || !series.length || !finite(series[series.length - 1].values[index])) return null;
    return { value: series[series.length - 1].values[index], unit: visual.unit || "", label: visual.labels[index] };
  }
  function tableFor(visual, series, caption) {
    return {
      caption: caption,
      headers: ["대상"].concat(series.map(function (s) { return s.label + (visual.unit ? " (" + visual.unit + ")" : ""); })),
      rows: visual.labels.map(function (label, index) { return [label].concat(series.map(function (s) { return format(s.values[index]); })); })
    };
  }
  function palette(index, last) { var colors = api().colors; return index === last ? colors.blue : [colors.muted, colors.purple, colors.green][index % 3]; }
  function addText(svg, x, y, value, size, color, anchor) {
    svg.append(api().svgText(x, y, value, { size: size, fill: color, anchor: anchor || "start" }));
  }
  function legendFor(series) {
    var legend = element("div", "q-series-legend");
    series.forEach(function (s, index) { var label = element("span", "q-series-label", s.label); label.style.setProperty("--series-color", palette(index, series.length - 1)); legend.append(label); });
    return legend;
  }
  function renderLine(visual) {
    var series = seriesFor(visual), labels = visual.labels.slice(), count = labels.length;
    var plot = element("div", "q-plot q-line"), drawing = api().rootSvg(1200, 350, "관찰값 추세"), all = [];
    drawing.classList.add("q-line-svg");
    series.forEach(function (s) { s.values.forEach(function (value) { if (finite(value)) all.push(value); }); });
    var lower = Math.min.apply(null, [0].concat(all)), upper = Math.max.apply(null, [0].concat(all));
    if (lower === upper) upper = lower + 1;
    var domain = Array.isArray(visual.domain) && visual.domain.length === 2 ? visual.domain : [lower, upper];
    lower = domain[0]; upper = domain[1];
    var left = 58, right = 1164, top = 32, bottom = 278;
    var x = function (i) { return count <= 1 ? (left + right) / 2 : left + i / (count - 1) * (right - left); };
    var y = function (value) { return bottom - (value - lower) / (upper - lower) * (bottom - top); };
    var focus = focusFor(visual, count, count - 1), color = api().colors;
    [lower, (lower + upper) / 2, upper].forEach(function (tick) {
      drawing.append(api().svg("line", { x1: left, y1: y(tick), x2: right, y2: y(tick), stroke: tick === 0 ? color.muted : color.line, "stroke-width": 1 }));
      addText(drawing, left - 13, y(tick) + 7, format(tick), 20, color.muted, "end");
    });
    series.forEach(function (s, seriesIndex) {
      var stroke = palette(seriesIndex, series.length - 1), segments = [], segment = [];
      s.values.forEach(function (value, index) {
        if (finite(value)) segment.push(x(index) + "," + y(value));
        else if (segment.length) { segments.push(segment); segment = []; }
      });
      if (segment.length) segments.push(segment);
      segments.forEach(function (points) { if (points.length > 1) drawing.append(api().svg("polyline", { points: points.join(" "), fill: "none", stroke: stroke, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" })); });
      s.values.forEach(function (value, index) { if (finite(value)) drawing.append(api().svg("circle", { cx: x(index), cy: y(value), r: index === focus && seriesIndex === series.length - 1 ? 7 : 3.5, fill: stroke })); });
    });
    var ticks = [0, count - 1, focus];
    if (count > 5) ticks.push(Math.round((count - 1) / 3), Math.round((count - 1) * 2 / 3));
    ticks.filter(function (value, index, values) { return value >= 0 && value < count && values.indexOf(value) === index; }).sort(function (a, b) { return a - b; }).forEach(function (index) {
      var fullLabel = String(labels[index]), shortLabel = Array.from(fullLabel).length > 18 ? Array.from(fullLabel).slice(0, 15).join("") + "…" : fullLabel;
      addText(drawing, x(index), 326, shortLabel, 22, color.muted, index === 0 ? "start" : index === count - 1 ? "end" : "middle");
    });
    drawing.setAttribute("aria-label", "같은 순서의 관찰값 추세. 누락된 값은 선을 연결하지 않습니다.");
    plot.append(drawing);
    if (series.length > 1) plot.append(legendFor(series));
    if (!all.length) plot.append(element("p", "q-empty", "표시할 관측값이 없습니다."));
    return { plot: plot, hero: heroFor(visual, series, focus), table: tableFor(visual, series, "관찰값과 추세") };
  }
  function renderRows(visual, funnel) {
    var series = seriesFor(visual), labels = visual.labels.slice(), count = labels.length, all = [];
    series.forEach(function (s) { s.values.forEach(function (value) { if (finite(value)) all.push(value); }); });
    var lower = Math.min.apply(null, [0].concat(all)), upper = Math.max.apply(null, [0].concat(all));
    if (lower === upper) upper = lower + 1;
    var range = upper - lower, zero = -lower / range * 100;
    var focus = focusFor(visual, count, funnel ? count - 1 : Math.max(0, labels.length - 1));
    var plot = element("div", "q-plot q-rows" + (funnel ? " q-funnel" : " q-bars"));
    plot.style.setProperty("--q-row-count", count);
    labels.forEach(function (label, index) {
      var row = element("div", "q-row" + (index === focus ? " is-focus" : ""));
      var heading = element("div", "q-row-heading"), values = element("div", "q-values"), tracks = element("div", "q-tracks");
      heading.append(element("span", "q-label", label));
      series.forEach(function (s, seriesIndex) {
        var value = s.values[index], caption = element("span", "q-value", format(value, visual.unit));
        caption.style.setProperty("--series-color", palette(seriesIndex, series.length - 1));
        values.append(caption);
        var track = element("div", "q-track"); track.setAttribute("aria-hidden", "true"); track.style.setProperty("--q-zero", zero + "%");
        if (finite(value)) {
          var mark = element("i", "q-bar");
          mark.style.left = ((Math.min(0, value) - lower) / range * 100) + "%";
          mark.style.width = (Math.abs(value) / range * 100) + "%";
          mark.style.background = palette(seriesIndex, series.length - 1);
          mark.style.opacity = index === focus ? "1" : seriesIndex === series.length - 1 ? ".55" : ".8";
          track.append(mark);
        }
        tracks.append(track);
      });
      heading.append(values); row.append(heading, tracks); plot.append(row);
    });
    if (series.length > 1) plot.append(legendFor(series));
    if (!count) plot.append(element("p", "q-empty", "표시할 항목이 없습니다."));
    return { plot: plot, hero: heroFor(visual, series, focus), table: tableFor(visual, series, funnel ? "단계별 값" : "대상별 비교") };
  }
  function renderComposition(visual) {
    var values = visual.values.slice(), labels = visual.labels.slice(), total = values.reduce(function (sum, value) { return sum + value; }, 0);
    var colors = api().colors, shades = [colors.blue, colors.purple, colors.green, colors.orange, colors.muted];
    var plot = element("div", "q-plot q-composition"), stack = element("div", "q-stack"), legend = element("div", "q-composition-legend");
    var fallback = values.indexOf(Math.max.apply(null, values)), focus = focusFor(visual, values.length, fallback);
    if (total > 0) values.forEach(function (value, index) {
      var share = value / total * 100, segment = element("div", "q-segment");
      segment.style.width = share + "%"; segment.style.background = shades[index % shades.length];
      if (share >= 13) segment.append(element("span", "", format(share, "%")));
      stack.append(segment);
    });
    else plot.append(element("p", "q-empty", "합계가 0이어서 구성비를 계산할 수 없습니다."));
    values.forEach(function (value, index) {
      var item = element("div", "q-composition-item" + (index === focus ? " is-focus" : "")), dot = element("i", "q-dot");
      dot.style.background = shades[index % shades.length];
      var copy = element("div", "q-composition-copy");
      copy.append(element("span", "q-label", labels[index]));
      copy.append(element("span", "q-share", format(value, visual.unit) + (total > 0 ? " · " + format(value / total * 100, "%") : "")));
      item.append(dot, copy); legend.append(item);
    });
    if (total > 0) plot.prepend(stack);
    plot.append(legend);
    var hero = visual.emphasis === "focus" && finite(values[focus]) ? { value: values[focus], unit: visual.unit || "", label: labels[focus] + (total > 0 ? " · " + format(values[focus] / total * 100, "%") : "") } : null;
    return { plot: plot, hero: hero, table: { caption: "구성 원값과 비중", headers: ["분류", "원값" + (visual.unit ? " (" + visual.unit + ")" : ""), "비중"], rows: labels.map(function (label, index) { return [label, format(values[index]), total > 0 ? format(values[index] / total * 100, "%") : "계산 불가"]; }) } };
  }
  function render(visual) {
    api();
    if (visual.kind === "line") return renderLine(visual);
    if (visual.kind === "bars") return renderRows(visual, false);
    if (visual.kind === "funnel") return renderRows(visual, true);
    if (visual.kind === "composition") return renderComposition(visual);
    throw new Error("Unsupported quantitative visual: " + visual.kind);
  }
  global.VisualQuantitative = { render: render };
})(window);
