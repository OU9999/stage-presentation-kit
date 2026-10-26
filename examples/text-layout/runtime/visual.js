/* Data-driven DOM/SVG visuals. No generated image files or network requests. */
(function (root, factory) {
  "use strict";
  var model = typeof module === "object" && module.exports ? require("./deck-model.js") : root.STAGE_MODEL;
  var api = factory(model);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.StageVisual = api;
})(typeof window !== "undefined" ? window : null, function (model) {
  "use strict";
  var local = {};
(function () {
  "use strict";
  var colors = {bg:"var(--slide-bg)",text:"var(--slide-text)",muted:"var(--slide-muted)",line:"var(--slide-line)",blue:"var(--slide-accent)",green:"var(--visual-green)",purple:"var(--visual-purple)",orange:"var(--visual-orange)"};
  function el(tag,className,text) { var node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=String(text);return node; }
  function svg(tag,attrs) {var node=document.createElementNS("http://www.w3.org/2000/svg",tag);Object.keys(attrs||{}).forEach(function(key){node.setAttribute(key,String(attrs[key]));});return node;}
  function svgText(x,y,value,opts) {opts=opts||{};var node=svg("text",{x:x,y:y,"font-size":opts.size||24,fill:opts.fill||colors.text,"text-anchor":opts.anchor||"start"});node.textContent=String(value);return node;}
  function rootSvg(width,height,label) {var node=svg("svg",{viewBox:"0 0 "+width+" "+height,role:"img","aria-label":label});var title=svg("title");title.textContent=label;node.append(title);return node;}
  function format(value,unit) {if(value===null||value===undefined||!Number.isFinite(value))return "–";return value.toLocaleString("en-US",{maximumFractionDigits:1})+(unit||"");}
  function normalizeSeries(v) { return model.visualSeries(v); }
  function focusIndices(v,count) {var raw=Array.isArray(v.focus)?v.focus:v.focus===undefined?(v.emphasis==="focus"?[count-1]:[]):[v.focus];return raw.filter(function(index){return Number.isInteger(index)&&index>=0&&index<count;});}
  local.VisualDesign={colors:colors,el:el,svg:svg,svgText:svgText,rootSvg:rootSvg,format:format,normalizeSeries:normalizeSeries,focusIndices:focusIndices};
})();

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
    if (visual.emphasis !== "focus" || (Array.isArray(visual.focus) && visual.focus.length !== 1) || !series.length || !finite(series[series.length - 1].values[index])) return null;
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
    // A second, narrow vector view uses the same values. Its labels stay legible in reading mode.
    var compact = api().rootSvg(600, 400, "관찰값 추세 · 좁은 화면");
    compact.classList.add("q-line-mobile");
    var mx = function (i) { return count <= 1 ? 320 : 54 + i / (count - 1) * 516; };
    var my = function (value) { return 328 - (value - lower) / (upper - lower) * 286; };
    [lower, (lower + upper) / 2, upper].forEach(function (tick) {
      compact.append(api().svg("line", { x1:54,y1:my(tick),x2:570,y2:my(tick),stroke:color.line,"stroke-width":1 }));
      addText(compact,43,my(tick)+8,format(tick),25,color.muted,"end");
    });
    series.forEach(function (s, seriesIndex) {
      var stroke = palette(seriesIndex, series.length - 1), segments = [], segment = [];
      s.values.forEach(function (value, i) { if (finite(value)) segment.push(mx(i) + "," + my(value)); else if (segment.length) { segments.push(segment); segment=[]; } });
      if (segment.length) segments.push(segment);
      segments.forEach(function (points) { if (points.length > 1) compact.append(api().svg("polyline",{points:points.join(" "),fill:"none",stroke:stroke,"stroke-width":4})); });
      s.values.forEach(function (value,i) { if (finite(value)) compact.append(api().svg("circle",{cx:mx(i),cy:my(value),r:5,fill:stroke})); });
    });
    [0,count-1].filter(function(i,index,all){return i>=0&&all.indexOf(i)===index;}).forEach(function(i){addText(compact,mx(i),378,labels[i],26,color.muted,i===0?"start":"end");});
    plot.append(compact);
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
})(local);

(function () {
  "use strict";
  function helpers() { return local.VisualDesign; }
  function label(value) { return typeof value === "string" ? value : String(value && value.label || ""); }
  function focus(visual, count) { return helpers().focusIndices(visual, count); }
  function result(plot, caption, headers, rows) { return { plot: plot, hero: null, table: { caption: caption, headers: headers, rows: rows } }; }

  function flow(visual) {
    var D = helpers(), items = visual.items || [], selected = focus(visual, items.length);
    var plot = D.el("div", "system-plot system-flow-plot"), list = D.el("ol", "system-flow");
    list.style.setProperty("--flow-count", Math.max(1, items.length));
    var links = Array.isArray(visual.links) ? visual.links : null;
    if (links) list.classList.add("is-branching");
    items.forEach(function (item, index) {
      var node = D.el("li", "flow-step" + (selected.indexOf(index) >= 0 ? " is-focus" : ""));
      node.append(D.el("span", "flow-index", String(index + 1).padStart(2, "0")), D.el("span", "flow-title", label(item)));
      list.append(node);
    });
    plot.append(list);
    var byId = function (key) { return typeof key === "number" ? items[key] : items.find(function (item, index) { return String(item && item.id !== undefined ? item.id : index) === String(key); }); };
    var rows;
    if (links) {
      var edges = D.el("ul", "flow-connections");
      rows = links.map(function (link) {
        var from = label(byId(link.from)), to = label(byId(link.to));
        edges.append(D.el("li", "flow-connection", from + " → " + to));
        return [from, to];
      });
      // A branching table still includes isolated nodes, not only edge endpoints.
      rows = items.map(function (item, index) {
        var id = item && item.id !== undefined ? item.id : String(index);
        var outgoing = links.filter(function (link) { return typeof link.from === "number" ? link.from === index : String(link.from) === String(id); });
        return [label(item), outgoing.length ? outgoing.map(function (link) { return label(byId(link.to)); }).join(" / ") : "연결 없음"];
      });
      plot.append(edges);
    } else {
      rows = items.map(function (item, index) { return [String(index + 1), label(item), items[index + 1] === undefined ? "마지막 단계" : label(items[index + 1])]; });
    }
    return result(plot, "흐름의 순서와 연결", links ? ["항목", "다음 연결"] : ["순서", "단계", "다음 단계"], rows);
  }

  function domain(values, given) {
    if (Array.isArray(given) && given.length === 2 && given[0] < given[1]) return given.slice();
    var low = Math.min.apply(null, values.concat(0)), high = Math.max.apply(null, values.concat(0));
    if (low === high) return [low - 1, high + 1];
    return [Math.floor(low), Math.ceil(high)];
  }
  function approximateWidth(value) {
    return Array.from(value).reduce(function (sum, character) { return sum + (/[^\u0000-\u00ff]/.test(character) ? 28 : 15); }, 0);
  }
  function matrix(visual) {
    var D = helpers(), items = visual.items || [], selected = focus(visual, items.length);
    var plot = D.el("div", "system-plot system-matrix"), graphic = D.rootSvg(1000, 390, (visual.xLabel || "가로 값") + "과 " + (visual.yLabel || "세로 값") + "의 관계");
    var dx = domain(items.map(function (item) { return item.x; }), visual.xDomain);
    var dy = domain(items.map(function (item) { return item.y; }), visual.yDomain);
    var x = function (value) { return 64 + (value - dx[0]) / (dx[1] - dx[0]) * 860; };
    var y = function (value) { return 302 - (value - dy[0]) / (dy[1] - dy[0]) * 252; };
    var axis = function (a, b, c, d, strong) { graphic.append(D.svg("line", { x1: a, y1: b, x2: c, y2: d, stroke: strong ? D.colors.muted : D.colors.line, "stroke-width": 1 })); };
    axis(64, 50, 64, 302, true); axis(64, 302, 924, 302, true);
    [0, .5, 1].forEach(function (fraction) {
      var vx = dx[0] + (dx[1] - dx[0]) * fraction, vy = dy[0] + (dy[1] - dy[0]) * fraction;
      if (fraction === .5) { axis(x(vx), 50, x(vx), 302, false); axis(64, y(vy), 924, y(vy), false); }
      graphic.append(D.svgText(x(vx), 336, D.format(vx), { size: 19, fill: D.colors.muted, anchor: "middle" }));
      graphic.append(D.svgText(43, y(vy) + 7, D.format(vy), { size: 19, fill: D.colors.muted, anchor: "end" }));
    });
    graphic.append(D.svgText(64, 25, (visual.yLabel || "세로 값") + " ↑", { size: 21, fill: D.colors.muted }));
    graphic.append(D.svgText(924, 378, (visual.xLabel || "가로 값") + " →", { size: 21, fill: D.colors.muted, anchor: "end" }));
    var used = [], fallback = [], visited = Object.create(null);
    items.forEach(function (item, index) {
      var key = String(item.x) + "|" + String(item.y), cluster = items.map(function (candidate, candidateIndex) { return candidate.x === item.x && candidate.y === item.y ? candidateIndex : -1; }).filter(function (i) { return i >= 0; });
      if (visited[key]) return;
      visited[key] = true;
      var px = x(item.x), py = y(item.y), active = cluster.some(function (i) { return selected.indexOf(i) >= 0; });
      var color = active ? D.colors.blue : D.colors.muted;
      graphic.append(D.svg("circle", { cx: px, cy: py, r: cluster.length > 1 ? 15 : active ? 9 : 6, fill: color }));
      if (cluster.length > 1) {
        graphic.append(D.svgText(px, py + 6, String(cluster.length), { size: 17, fill: D.colors.bg, anchor: "middle" }));
        cluster.forEach(function (i) { fallback.push({ item: items[i], index: i, duplicate: true }); });
        return;
      }
      var name = label(item), width = approximateWidth(name), accepted = null;
      var candidates = [
        { dx: 18, dy: -16, anchor: "start" }, { dx: 18, dy: 42, anchor: "start" },
        { dx: -18, dy: -16, anchor: "end" }, { dx: -18, dy: 42, anchor: "end" },
        { dx: 18, dy: -52, anchor: "start" }, { dx: -18, dy: -52, anchor: "end" },
        { dx: 180, dy: -16, anchor: "start" }, { dx: -180, dy: -16, anchor: "end" },
        { dx: 18, dy: 88, anchor: "start" }, { dx: -18, dy: 88, anchor: "end" }
      ];
      if (width < 310) candidates.some(function (candidate) {
        var box = { x: px + candidate.dx - (candidate.anchor === "end" ? width : 0), y: py + candidate.dy - 24, w: width, h: 36 };
        if (box.x < 8 || box.x + box.w > 985 || box.y < 28 || box.y + box.h > 312) return false;
        if (used.some(function (old) { return box.x < old.x + old.w + 8 && box.x + box.w + 8 > old.x && box.y < old.y + old.h + 7 && box.y + box.h + 7 > old.y; })) return false;
        used.push(box); accepted = candidate; return true;
      });
      if (accepted) {
        if (Math.abs(accepted.dy) > 20 || Math.abs(accepted.dx) > 30) graphic.append(D.svg("line", { x1: px, y1: py, x2: px + accepted.dx, y2: py + accepted.dy - 13, stroke: color, "stroke-width": 1 }));
        graphic.append(D.svgText(px + accepted.dx, py + accepted.dy, name, { size: 28, fill: active ? D.colors.blue : D.colors.text, anchor: accepted.anchor }));
      } else {
        graphic.append(D.svgText(px + 13, py - 10, String(index + 1), { size: 18, fill: color }));
        fallback.push({ item: item, index: index, duplicate: false });
      }
    });
    plot.append(graphic);
    var readable = D.el("ul", "matrix-readable" + (fallback.length ? " has-fallback" : ""));
    items.forEach(function (item, index) {
      var row = D.el("li", selected.indexOf(index) >= 0 ? "is-focus" : "");
      row.append(D.el("strong", "", String(index + 1) + ". " + label(item)), D.el("span", "", (visual.xLabel || "가로") + " " + D.format(item.x) + " · " + (visual.yLabel || "세로") + " " + D.format(item.y)));
      readable.append(row);
    });
    if (fallback.some(function (item) { return item.duplicate; })) readable.prepend(D.el("li", "matrix-collision-note", "같은 위치의 숫자는 그 좌표에 겹친 항목 수입니다."));
    plot.append(readable);
    return result(plot, "좌표와 항목", ["항목", visual.xLabel || "가로 값", visual.yLabel || "세로 값"], items.map(function (item) { return [label(item), item.x, item.y]; }));
  }

  function timeline(visual) {
    var D = helpers(), items = visual.items || [], selected = focus(visual, items.length);
    var plot = D.el("div", "system-plot system-timeline");
    var start = Math.min.apply(null, items.map(function (item) { return item.start; }));
    var end = Math.max.apply(null, items.map(function (item) { return item.end; }));
    var span = end - start || 1;
    var axis = D.el("div", "timeline-axis");
    axis.append(D.el("span", "", D.format(start, visual.unit || "")), D.el("span", "", D.format(end, visual.unit || "")));
    plot.append(axis);
    items.forEach(function (item, index) {
      var row = D.el("div", "timeline-row" + (selected.indexOf(index) >= 0 ? " is-focus" : ""));
      var copy = D.el("div", "timeline-copy");
      copy.append(D.el("strong", "", label(item)), D.el("span", "timeline-values", D.format(item.start) + "–" + D.format(item.end, visual.unit || "")));
      var track = D.el("div", "timeline-track"), range = D.el("i", "timeline-range");
      range.style.left = (item.start - start) / span * 100 + "%";
      range.style.width = (item.end - item.start) / span * 100 + "%";
      if (item.start === item.end) range.classList.add("is-milestone");
      range.setAttribute("aria-hidden", "true"); track.append(range); row.append(copy, track); plot.append(row);
    });
    return result(plot, "과업별 시작과 끝", ["과업", "시작" + (visual.unit ? "(" + visual.unit + ")" : ""), "끝" + (visual.unit ? "(" + visual.unit + ")" : "")], items.map(function (item) { return [label(item), item.start, item.end]; }));
  }

  function heatmap(visual) {
    var D = helpers(), rows = visual.rows || [], columns = visual.columns || [], values = visual.values || [];
    var plot = D.el("div", "system-plot system-heatmap"), grid = D.el("div", "heat-grid");
    var numeric = values.reduce(function (flat, row) { return flat.concat(row.filter(function (value) { return typeof value === "number" && isFinite(value); })); }, []);
    var maximum = Math.max.apply(null, numeric.map(Math.abs).concat(1));
    grid.style.setProperty("--heat-columns", Math.max(1, columns.length));
    grid.append(D.el("div", "heat-corner"));
    columns.forEach(function (column) { grid.append(D.el("div", "heat-column", label(column))); });
    rows.forEach(function (row, rowIndex) {
      grid.append(D.el("div", "heat-row-label", label(row)));
      columns.forEach(function (column, columnIndex) {
        var value = values[rowIndex] && values[rowIndex][columnIndex], cell = D.el("div", "heat-cell");
        if (typeof value === "number" && isFinite(value)) {
          var strength = 15 + 85 * Math.abs(value) / maximum;
          cell.style.backgroundColor = "color-mix(in srgb, " + (value < 0 ? D.colors.orange : D.colors.blue) + " " + strength + "%, var(--slide-bg))";
          cell.style.color = strength > 60 ? "var(--visual-cell-ink, #080808)" : D.colors.text;
          cell.textContent = D.format(value);
        } else { cell.textContent = "—"; cell.classList.add("is-missing"); }
        cell.setAttribute("aria-label", label(row) + ", " + label(column) + ": " + (value === null || value === undefined ? "관측값 없음" : D.format(value, visual.unit || "")));
        grid.append(cell);
      });
    });
    plot.append(grid);
    var legend = D.el("div", "heat-key", "숫자가 실제 값이며 색은 크기를 보조합니다." + (visual.unit ? " 단위: " + visual.unit : ""));
    if (numeric.some(function (n) { return n < 0; })) legend.append(D.el("span", "", "주황: 음수 · 파랑: 양수"));
    plot.append(legend);
    return result(plot, "행과 열별 값" + (visual.unit ? " · " + visual.unit : ""), ["구분"].concat(columns.map(label)), rows.map(function (row, rowIndex) { return [label(row)].concat(columns.map(function (_, columnIndex) { var value = values[rowIndex] && values[rowIndex][columnIndex]; return value === null || value === undefined ? "관측값 없음" : value; })); }));
  }

  local.VisualSystems = { render: function (visual) {
    if (visual.kind === "flow") return flow(visual);
    if (visual.kind === "matrix") return matrix(visual);
    if (visual.kind === "timeline") return timeline(visual);
    if (visual.kind === "heatmap") return heatmap(visual);
    throw new Error("Unsupported systems visual: " + visual.kind);
  } };
})();

  function render(visual) {
    var issues = model.validateVisual(visual);
    if (issues.length) { var error = new Error(issues.map(function (issue) { return issue.path + ": " + issue.message; }).join("\n")); error.issues = issues; throw error; }
    var result = (["line", "bars", "composition", "funnel"].indexOf(visual.kind) >= 0 ? local.VisualQuantitative : local.VisualSystems).render(visual);
    // Ratio source counts stay in the accessible table, alongside the computed value.
    if (Array.isArray(visual.numerators)) {
      result.table.headers.push("분자", "분모");
      result.table.rows.forEach(function (row, i) { row.push(visual.numerators[i], visual.denominators[i]); });
    }
    result.plot.classList.add("visual-plot");
    return result;
  }
  function tableNode(data, options) {
    options = options || {};
    var D = local.VisualDesign, wrap = D.el("div", "visual-table-scroll"), table = D.el("table", "visual-table");
    wrap.tabIndex = 0;
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", options.caption || data.caption || "현재 데이터 표");
    table.append(D.el("caption", "", options.caption || data.caption || "현재 데이터"));
    var head = D.el("thead"), headings = D.el("tr");
    data.headers.forEach(function (label) { var th = D.el("th", "", label); th.scope = "col"; headings.append(th); });
    head.append(headings); table.append(head);
    var body = D.el("tbody");
    data.rows.forEach(function (row) { var tr = D.el("tr"); row.forEach(function (value, i) { var cell = D.el(i ? "td" : "th", "", value === null || value === undefined ? "관측값 없음" : value); if (!i) cell.scope = "row"; tr.append(cell); }); body.append(tr); });
    table.append(body); wrap.append(table); return wrap;
  }
  function renderTable(visual, options) { return tableNode(render(visual).table, options); }
  function renderDataPage(deck, container) {
    var D = local.VisualDesign;
    container.replaceChildren();
    (deck.slides || []).forEach(function (slide, index) {
      if (!slide || slide.layout !== "visual") return;
      var section = D.el("section", "visual-data-section"), title = Array.isArray(slide.title) ? slide.title.join(" ") : slide.title || "시각자료 " + (index + 1);
      section.id = slide.id || "slide-" + (index + 1);
      section.append(D.el("h2", "", title));
      var meta = [slide.visual && slide.visual.period, slide.visual && slide.visual.source, slide.source].filter(Boolean).join(" · ");
      if (meta) section.append(D.el("p", "visual-data-meta", meta));
      try { section.append(renderTable(slide.visual, { caption: title })); }
      catch (error) { section.append(D.el("pre", "visual-data-error", error.message)); }
      if (slide.notes) section.append(D.el("p", "visual-data-notes", slide.notes));
      container.append(section);
    });
    return container;
  }
  return { render: render, renderTable: renderTable, tableNode: tableNode, renderDataPage: renderDataPage, format: local.VisualDesign.format };
});
