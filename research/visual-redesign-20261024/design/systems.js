(function () {
  "use strict";
  function helpers() { return window.VisualDesign; }
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
      plot.append(edges);
    } else {
      rows = items.map(function (item, index) { return [String(index + 1), label(item), items[index + 1] === undefined ? "마지막 단계" : label(items[index + 1])]; });
    }
    return result(plot, "흐름의 순서와 연결", links ? ["시작", "다음"] : ["순서", "단계", "다음 단계"], rows);
  }

  function domain(values, given) {
    if (Array.isArray(given) && given.length === 2 && given[0] < given[1]) return given.slice();
    var low = Math.min.apply(null, values.concat(0)), high = Math.max.apply(null, values.concat(0));
    if (low === high) return [low - 1, high + 1];
    return [Math.floor(low), Math.ceil(high)];
  }
  function approximateWidth(value) {
    return Array.from(value).reduce(function (sum, character) { return sum + (/[^\u0000-\u00ff]/.test(character) ? 24 : 13); }, 0);
  }
  function matrix(visual) {
    var D = helpers(), items = visual.items || [], selected = focus(visual, items.length);
    var plot = D.el("div", "system-plot system-matrix"), graphic = D.rootSvg(1000, 390, (visual.xLabel || "가로 값") + "과 " + (visual.yLabel || "세로 값") + "의 관계");
    var dx = domain(items.map(function (item) { return item.x; }), visual.xDomain);
    var dy = domain(items.map(function (item) { return item.y; }), visual.yDomain);
    var x = function (value) { return 64 + (value - dx[0]) / (dx[1] - dx[0]) * 860; };
    var y = function (value) { return 302 - (value - dy[0]) / (dy[1] - dy[0]) * 252; };
    var axis = function (a, b, c, d, strong) { graphic.append(D.svg("line", { x1: a, y1: b, x2: c, y2: d, stroke: strong ? "#4b4b47" : "#242424", "stroke-width": 1 })); };
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
      var color = active ? D.colors.blue : "#858580";
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
        { dx: 18, dy: -52, anchor: "start" }, { dx: -18, dy: -52, anchor: "end" }
      ];
      if (width < 310) candidates.some(function (candidate) {
        var box = { x: px + candidate.dx - (candidate.anchor === "end" ? width : 0), y: py + candidate.dy - 24, w: width, h: 31 };
        if (box.x < 8 || box.x + box.w > 985 || box.y < 28 || box.y + box.h > 312) return false;
        if (used.some(function (old) { return box.x < old.x + old.w + 8 && box.x + box.w + 8 > old.x && box.y < old.y + old.h + 7 && box.y + box.h + 7 > old.y; })) return false;
        used.push(box); accepted = candidate; return true;
      });
      if (accepted) {
        if (Math.abs(accepted.dy) > 20) graphic.append(D.svg("line", { x1: px, y1: py, x2: px + accepted.dx, y2: py + accepted.dy - 13, stroke: color, "stroke-width": 1 }));
        graphic.append(D.svgText(px + accepted.dx, py + accepted.dy, name, { size: 24, fill: active ? D.colors.blue : D.colors.text, anchor: accepted.anchor }));
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

  function mix(a, b, ratio) {
    var channels = function (color) { return color.slice(1).match(/../g).map(function (part) { return parseInt(part, 16); }); };
    var first = channels(a), second = channels(b);
    return "#" + first.map(function (value, index) { return Math.round(value + (second[index] - value) * ratio).toString(16).padStart(2, "0"); }).join("");
  }
  function luminance(color) {
    var rgb = color.slice(1).match(/../g).map(function (part) { var n = parseInt(part, 16) / 255; return n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4); });
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
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
          var fill = mix("#172027", value < 0 ? D.colors.orange : D.colors.blue, .2 + .8 * Math.abs(value) / maximum);
          var l = luminance(fill), dark = luminance(D.colors.bg), light = luminance(D.colors.text);
          cell.style.backgroundColor = fill;
          cell.style.color = (light + .05) / (l + .05) >= (l + .05) / (dark + .05) ? D.colors.text : D.colors.bg;
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

  window.VisualSystems = { render: function (visual) {
    if (visual.kind === "flow") return flow(visual);
    if (visual.kind === "matrix") return matrix(visual);
    if (visual.kind === "timeline") return timeline(visual);
    if (visual.kind === "heatmap") return heatmap(visual);
    throw new Error("Unsupported systems visual: " + visual.kind);
  } };
})();
