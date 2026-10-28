/* Shared by the browser and Node checks. Validation never changes the input. */
(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.STAGE_MODEL = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var layouts = Object.create(null);
  ["cover", "statement", "section", "compare", "metric", "image", "demo", "quote", "steps", "closing", "chart", "media", "gallery", "mosaic", "results", "categories", "bento", "icon-wall", "metric-pair", "visual", "blocks"].forEach(function (name) { layouts[name] = true; });
  var owns = function (object, key) { return Object.prototype.hasOwnProperty.call(object, key); };
  var record = function (value) { return value !== null && typeof value === "object" && !Array.isArray(value); };
  var iconNames = ["brain", "price", "speed", "image", "voice", "record", "compare", "select", "share", "code", "chart", "search", "book", "calendar", "mail", "globe", "check", "folder", "music", "spark"];
  var itemTones = ["blue", "green", "orange", "purple", "yellow", "white"];
  var artifactFields = {
    cover: ["label", "title", "subtitle", "footer", "edition", "src", "alt", "fit", "focalPoint"],
    quote: ["label", "text"], waveform: ["label", "text"], concepts: ["items", "caption"],
    task: ["title", "progress", "text", "tools"], report: ["number", "label", "title", "items"],
    process: ["title", "items"], actions: ["title", "items", "icon"]
  };

  function normalizeIcon(value) {
    var key = typeof value === "string" ? value.trim().toLowerCase() : "";
    return iconNames.indexOf(key) >= 0 ? key : null;
  }

  // A small authored composition, not a free-form grid engine. Every cell is used once.
  function bentoPreset(preset) {
    var seoul = preset === "seoul";
    if (preset !== undefined && preset !== "recap" && !seoul) return null;
    var slots = seoul
      ? [[1, 1, 3, 2], [4, 1, 3, 2], [7, 1, 3, 2], [10, 1, 3, 4], [1, 3, 2, 2], [3, 3, 2, 2], [5, 3, 2, 2], [7, 3, 3, 2], [1, 5, 3, 2], [4, 5, 3, 2], [7, 5, 3, 2], [10, 5, 3, 2]]
      : [[1, 1, 2, 2], [3, 1, 2, 1], [5, 1, 2, 1], [3, 2, 1, 1], [4, 2, 1, 1], [5, 2, 1, 2], [6, 2, 1, 1], [1, 3, 1, 1], [2, 3, 1, 1], [3, 3, 1, 1], [4, 3, 1, 1], [6, 3, 1, 1]];
    return { columns: seoul ? 12 : 6, rows: seoul ? 6 : 3, slots: slots.map(function (slot) {
      return { column: slot[0], row: slot[1], columnSpan: slot[2], rowSpan: slot[3] };
    }) };
  }

  function iconWallSlots(count) {
    if (!Number.isInteger(count) || count < 1 || count > 22) return null;
    var slots = [];
    for (var column = 1; column <= 8; column += 1) slots.push({ column: column, row: 1 });
    for (var bottom = 1; bottom <= 8; bottom += 1) slots.push({ column: bottom, row: 5 });
    for (var row = 2; row <= 4; row += 1) { slots.push({ column: 1, row: row }); slots.push({ column: 8, row: row }); }
    return slots.slice(0, count);
  }

  function packMosaic(items) {
    if (!Array.isArray(items) || items.length < 1 || items.length > 8) return null;
    var occupied = [[], []];
    var positions = [];
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      if (!record(item) || (item.span !== 1 && item.span !== 2)) return null;
      var found = false;
      for (var row = 0; row < 2 && !found; row += 1) {
        for (var column = 0; column <= 4 - item.span; column += 1) {
          var free = true;
          for (var offset = 0; offset < item.span; offset += 1) if (occupied[row][column + offset]) free = false;
          if (!free) continue;
          for (var cell = 0; cell < item.span; cell += 1) occupied[row][column + cell] = true;
          positions.push({ row: row + 1, column: column + 1, span: item.span });
          found = true;
          break;
        }
      }
      if (!found) return null;
    }
    return positions;
  }

  function validateVisual(visual, path, slideIndex) {
    path = path || "visual";
    var issues = [];
    function error(key, message) { var result = { severity: "error", path: path + (key ? "." + key : ""), message: message }; if (slideIndex !== undefined) result.slideIndex = slideIndex; issues.push(result); }
    function array(value, key) { if (!Array.isArray(value) || !value.length) { error(key, "한 개 이상의 항목을 배열로 입력하세요."); return false; } return true; }
    function finite(value, key, nullable) { if (!(nullable && value === null) && (typeof value !== "number" || !Number.isFinite(value))) error(key, "유한한 숫자" + (nullable ? " 또는 관측값이 없는 null" : "") + "를 입력하세요. 숫자 문자열은 사용하지 않습니다."); }
    function labels(value, key) { if (!array(value, key)) return false; value.forEach(function (item, i) { if (typeof item !== "string") error(key + "." + i, "라벨은 문자열로 입력하세요."); }); return true; }
    function numbers(value, key, count, nullable, nonnegative) { if (!array(value, key)) return; if (value.length !== count) error(key, "라벨/축과 같은 " + count + "개 값을 입력하세요."); value.forEach(function (n, i) { finite(n, key + "." + i, nullable); if (nonnegative && typeof n === "number" && n < 0) error(key + "." + i, "이 표현은 0 이상의 원값을 사용합니다."); }); }
    function domain(key) { if (visual[key] === undefined) return; var d = visual[key]; if (!Array.isArray(d) || d.length !== 2 || !d.every(function (n) { return typeof n === "number" && Number.isFinite(n); }) || d[0] >= d[1]) error(key, "작은 값, 큰 값 순서의 서로 다른 유한 숫자 두 개를 입력하세요."); }
    if (!record(visual)) { error("", "kind와 해당 자료를 가진 visual 객체를 입력하세요."); return issues; }
    var kinds = ["line", "bars", "composition", "funnel", "flow", "matrix", "timeline", "heatmap"];
    if (kinds.indexOf(visual.kind) < 0) { error("kind", kinds.join(" / ") + " 중 하나를 입력하세요."); return issues; }
    ["unit", "source", "period", "label", "xLabel", "yLabel"].forEach(function (key) { if (visual[key] !== undefined && typeof visual[key] !== "string") error(key, "문자열로 입력하세요."); });
    if (visual.composition !== undefined && ["wide", "split"].indexOf(visual.composition) < 0) error("composition", "wide 또는 split을 입력하세요.");
    if (visual.emphasis !== undefined && visual.emphasis !== "focus" && visual.emphasis !== "none") error("emphasis", "focus 또는 none을 입력하거나 생략하세요.");
    domain("domain"); domain("xDomain"); domain("yDomain");
    var count = 0;
    if (["line", "bars", "composition", "funnel"].indexOf(visual.kind) >= 0) {
      if (labels(visual.labels, "labels")) count = visual.labels.length;
      var methods = Number(visual.values !== undefined) + Number(visual.series !== undefined) + Number(visual.numerators !== undefined || visual.denominators !== undefined);
      if (methods !== 1) error("values", "values, series, numerators+denominators 중 한 방식만 입력하세요.");
      var nonnegative = visual.kind === "composition" || visual.kind === "funnel";
      if (visual.kind === "composition" && (visual.series !== undefined || visual.numerators !== undefined || visual.denominators !== undefined)) error("values", "구성비는 labels와 비음수 원값 values를 사용합니다.");
      if (visual.values !== undefined) numbers(visual.values, "values", count, visual.kind !== "composition", nonnegative);
      if (visual.kind === "composition" && Array.isArray(visual.values) && visual.values.every(function (n) { return typeof n === "number" && Number.isFinite(n); }) && !Number.isFinite(visual.values.reduce(function (sum, n) { return sum + n; }, 0))) error("values", "원값 합계가 유한한 범위를 벗어납니다. 단위를 바꾸거나 입력을 확인하세요.");
      if (visual.series !== undefined && array(visual.series, "series")) visual.series.forEach(function (series, i) { var key = "series." + i; if (!record(series)) { error(key, "label과 values를 가진 객체를 입력하세요."); return; } if (series.label !== undefined && typeof series.label !== "string") error(key + ".label", "문자열로 입력하세요."); numbers(series.values, key + ".values", count, true, nonnegative); });
      if (visual.numerators !== undefined || visual.denominators !== undefined) {
        numbers(visual.numerators, "numerators", count, false, nonnegative);
        numbers(visual.denominators, "denominators", count, false, false);
        if (Array.isArray(visual.denominators)) visual.denominators.forEach(function (d, i) { if (typeof d === "number" && d !== 0 && Array.isArray(visual.numerators) && typeof visual.numerators[i] === "number" && !Number.isFinite(visual.numerators[i] / d * 100)) error("numerators." + i, "계산 결과가 유한한 범위를 벗어납니다. 단위를 바꾸거나 입력을 확인하세요."); if (d === 0) error("denominators." + i, "분모가 0이어서 비율을 계산할 수 없습니다. 관측값을 확인하세요."); if (typeof d === "number" && d < 0) error("denominators." + i, "비율 계산의 분모는 양수여야 합니다."); });
      }
    } else if (["flow", "matrix", "timeline"].indexOf(visual.kind) >= 0) {
      if (array(visual.items, "items")) {
        count = visual.items.length;
        visual.items.forEach(function (item, i) {
          var key = "items." + i;
          if (visual.kind === "flow" && typeof item === "string") return;
          if (!record(item)) { error(key, visual.kind === "flow" ? "문자열 또는 label 객체를 입력하세요." : "label과 좌표/기간을 가진 객체를 입력하세요."); return; }
          if (typeof item.label !== "string") error(key + ".label", "문자열 라벨을 입력하세요.");
          if (visual.kind === "matrix") { finite(item.x, key + ".x"); finite(item.y, key + ".y"); }
          if (visual.kind === "timeline") { finite(item.start, key + ".start"); finite(item.end, key + ".end"); if (typeof item.start === "number" && typeof item.end === "number" && item.end < item.start) error(key + ".end", "종료는 시작보다 앞설 수 없습니다."); }
        });
      }
      if (visual.links !== undefined) {
        if (visual.kind !== "flow") error("links", "연결은 flow에서 사용하세요.");
        else if (!Array.isArray(visual.links)) error("links", "from/to 연결 객체 배열을 입력하세요.");
        else if (Array.isArray(visual.items)) {
          var ids = Object.create(null);
          visual.items.forEach(function (item, i) { var id = record(item) && item.id !== undefined ? item.id : i; if (record(item) && item.id !== undefined && typeof item.id !== "string") error("items." + i + ".id", "ID는 문자열로 입력하세요. 숫자 연결은 배열 인덱스입니다."); if (owns(ids, String(id))) error("items." + i + ".id", "연결에 쓰는 ID는 중복될 수 없습니다."); ids[String(id)] = true; });
          visual.links.forEach(function (link, i) { if (!record(link)) { error("links." + i, "from/to 객체를 입력하세요."); return; } ["from", "to"].forEach(function (key) { var ref = link[key], valid = Number.isInteger(ref) ? ref >= 0 && ref < count : typeof ref === "string" && owns(ids, ref); if (!valid) error("links." + i + "." + key, "존재하는 항목 ID 또는 배열 인덱스를 입력하세요."); }); });
        }
      }
    } else if (visual.kind === "heatmap") {
      var hasRows = labels(visual.rows, "rows"), hasCols = labels(visual.columns, "columns");
      if (array(visual.values, "values")) {
        if (hasRows && visual.values.length !== visual.rows.length) error("values", "rows와 같은 수의 행을 입력하세요.");
        visual.values.forEach(function (row, i) { numbers(row, "values." + i, hasCols ? visual.columns.length : 0, true, false); });
      }
      count = hasRows ? visual.rows.length : 0;
    }
    if (visual.focus !== undefined) (Array.isArray(visual.focus) ? visual.focus : [visual.focus]).forEach(function (index, i) { if (!Number.isInteger(index) || index < 0 || index >= count) error("focus" + (Array.isArray(visual.focus) ? "." + i : ""), "입력 항목 범위 안의 0부터 시작하는 정수 인덱스를 입력하세요."); });
    return issues;
  }

  function visualSeries(visual) {
    if (Array.isArray(visual.series)) return visual.series.map(function (s, i) { return { label: s.label || "계열 " + (i + 1), values: s.values.slice() }; });
    if (Array.isArray(visual.numerators)) return [{ label: visual.label || "값", values: visual.numerators.map(function (n, i) { return n / visual.denominators[i] * 100; }) }];
    return [{ label: visual.label || "값", values: Array.isArray(visual.values) ? visual.values.slice() : [] }];
  }

  // Validate the compiled semantic tree without trusting generated content.js.
  function validateBlocks(nodes, path, slideIndex) {
    var issues = [], ancestors = new Set(), count = 0;
    var tags = "p h1 h2 h3 h4 h5 h6 ul ol li blockquote pre code table thead tbody tr th td strong em s a img br hr".split(" ");
    function fail(at, message) { issues.push({severity:"error", path:at, slideIndex:slideIndex, message:message}); }
    function visit(node, at, depth) {
      if (++count > 20000 || depth > 64) { fail(at, "Markdown 트리가 너무 깊거나 큽니다."); return; }
      if (!record(node) || ancestors.has(node)) { fail(at, "Markdown 노드는 순환 참조 없는 객체여야 합니다."); return; }
      if (node.type === "text") { if (typeof node.value !== "string") fail(at, "텍스트 값은 문자열이어야 합니다."); return; }
      if (node.type !== "element" || tags.indexOf(node.tag) < 0 || !Array.isArray(node.children)) { fail(at, "지원하는 Markdown 요소와 children 배열이 필요합니다."); return; }
      if (node.position !== undefined && (!record(node.position) || !Number.isInteger(node.position.line) || node.position.line < 1 || !Number.isInteger(node.position.endLine) || node.position.endLine < node.position.line)) fail(at + ".position", "원고 줄 범위를 확인하세요.");
      if (node.attrs !== undefined && !record(node.attrs)) fail(at + ".attrs", "속성은 객체여야 합니다.");
      else Object.keys(node.attrs || {}).forEach(function (key) {
        var value = node.attrs[key], valid = false;
        if (key === "title" || (key === "alt" && node.tag === "img")) valid = typeof value === "string";
        if ((key === "href" && node.tag === "a") || (key === "src" && node.tag === "img")) {
          valid = typeof value === "string" && !/[\u0000-\u0020\u007f]/.test(value);
          var scheme = valid && /^([a-z][a-z0-9+.-]*):/i.exec(value);
          if (scheme) valid = /^(https?)$/i.test(scheme[1]) || (key === "href" && /^mailto$/i.test(scheme[1])) || (key === "src" && /^data:image\/(?:png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(value));
        }
        if (key === "start" && node.tag === "ol") valid = Number.isInteger(Number(value)) && Number(value) >= 0;
        if (key === "align" && /^(th|td)$/.test(node.tag)) valid = /^(left|center|right)$/.test(value);
        if (key === "class" && node.tag === "code") valid = typeof value === "string" && /^language-[a-z0-9_+-]+$/i.test(value);
        if (!valid) fail(at + ".attrs." + key, "지원하지 않는 Markdown 속성 또는 URL입니다.");
      });
      ancestors.add(node);
      node.children.forEach(function (child, i) { if (count <= 20000) visit(child, at + ".children." + i, depth + 1); });
      ancestors.delete(node);
    }
    if (!Array.isArray(nodes)) fail(path, "Markdown 본문은 배열이어야 합니다.");
    else nodes.forEach(function (node, i) { if (count <= 20000) visit(node, path + "." + i, 0); });
    return issues;
  }

  function validateDeck(config) {
    var issues = [];
    function issue(severity, path, message, slideIndex) {
      var result = { severity: severity, path: path, message: message };
      if (slideIndex !== undefined) result.slideIndex = slideIndex;
      issues.push(result);
    }
    function text(object, key, path, slideIndex, required) {
      var value = object[key];
      if (value === undefined && !required) return;
      if (typeof value !== "string") issue("error", path + "." + key, "문자열로 입력하세요.", slideIndex);
    }
    function choice(object, key, choices, path, slideIndex) {
      if (object[key] !== undefined && choices.indexOf(object[key]) < 0) issue("warning", path + "." + key, "지원 값: " + choices.join(" / ") + ". 기본 표시를 사용합니다.", slideIndex);
    }
    function blocksView(slide, path, slideIndex) {
      if (slide.view === undefined) return;
      var at = path + ".view", view = slide.view;
      function fail(location, message) { issue("error", location, message, slideIndex); }
      if (slide.layout !== "blocks") { fail(at, "view는 blocks 양식에서만 사용합니다."); return; }
      if (!record(view)) { fail(at, "view는 compose/fit/focus/groups 객체여야 합니다."); return; }
      function focus(value, location, group) {
        if (Array.isArray(value)) {
          if (group || value.length < 1 || value.length > 6) { fail(location, "장 focus 배열은 사진1~6개 위치만 지원합니다. 그룹은 문자열이어야 합니다."); return; }
          value.forEach(function (position, index) {
            if (Array.isArray(position)) fail(location + "." + index, "focus 위치는 두 백분율의 문자열이어야 합니다.");
            else focus(position, location + "." + index, true);
          });
          return;
        }
        var match = typeof value === "string" && /^(\d+(?:\.\d+)?)%[ \t]+(\d+(?:\.\d+)?)%$/.exec(value);
        if (!match || Number(match[1]) > 100 || Number(match[2]) > 100) fail(location, "focus는 0~100%의 두 위치여야 합니다.");
      }
      function settings(object, location, group) {
        var allowed = group ? ["start", "end", "tone", "primary", "fit", "focus", "origin"] : ["compose", "fit", "focus", "groups"];
        Object.keys(object).forEach(function (key) { if (allowed.indexOf(key) < 0) fail(location + "." + key, "지원하지 않는 조판 설정 키입니다."); });
        if (object.compose !== undefined && ["auto", "message", "split", "media", "gallery", "mosaic", "editorial", "quote", "closing", "document"].indexOf(object.compose) < 0) fail(location + ".compose", "지원하는 compose 이름을 사용하세요.");
        if (object.fit !== undefined && ["contain", "cover"].indexOf(object.fit) < 0) fail(location + ".fit", "fit은 contain/cover여야 합니다.");
        if (object.focus !== undefined) focus(object.focus, location + ".focus", group);
        if (group && object.tone !== undefined && ["orange", "purple", "blue", "green", "yellow", "neutral"].indexOf(object.tone) < 0) fail(location + ".tone", "지원하는 그룹 tone을 사용하세요.");
        if (group && object.primary !== undefined && typeof object.primary !== "boolean") fail(location + ".primary", "primary는 true/false여야 합니다.");
        if (group && object.origin !== undefined && (!record(object.origin) || !Number.isInteger(object.origin.line) || object.origin.line < 1 || !Number.isInteger(object.origin.endLine) || object.origin.endLine < object.origin.line)) fail(location + ".origin", "그룹 제어문의 원고 줄 범위를 확인하세요.");
      }
      settings(view, at, false);
      if (view.groups === undefined) return;
      if (!Array.isArray(view.groups)) { fail(at + ".groups", "groups는 노드 범위 설정의 배열이어야 합니다."); return; }
      var previousEnd = -1, primary = 0;
      view.groups.forEach(function (group, index) {
        var location = at + ".groups." + index;
        if (!record(group)) { fail(location, "그룹은 start/end와 선택 설정의 객체여야 합니다."); return; }
        settings(group, location, true);
        if (group.primary === true) primary += 1;
        var blocks = Array.isArray(slide.blocks) ? slide.blocks : [];
        if (!Number.isInteger(group.start) || !Number.isInteger(group.end) || group.start < 0 || group.end <= group.start || group.end > blocks.length) { fail(location, "그룹 start/end는 blocks의 유효한 시작 포함/끝 제외 범위여야 합니다."); return; }
        if (group.start < previousEnd) fail(location, "그룹 범위가 겹치거나 원고 순서를 벗어납니다.");
        previousEnd = group.end;
        var first = blocks[group.start];
        if (!record(first) || first.type !== "element" || first.tag !== "h2") { fail(location + ".start", "그룹은 최상위 H2 노드에서 시작해야 합니다."); return; }
        var end = group.start + 1;
        while (end < blocks.length && !(record(blocks[end]) && blocks[end].type === "element" && blocks[end].tag === "h2")) end += 1;
        if (group.end !== end) fail(location + ".end", "그룹은 다음 H2 직전 또는 본문 끝까지 결속해야 합니다.");
      });
      if (primary > 1) fail(at + ".groups", "primary 그룹은 한 장에 하나만 지정하세요.");
    }
    function icon(object, path, slideIndex) {
      if (object.icon !== undefined && !normalizeIcon(object.icon)) issue("error", path + ".icon", "지원하는 의미 아이콘 키를 사용하세요: " + iconNames.join(" / ") + ".", slideIndex);
    }
    function displayValue(object, path, slideIndex) {
      if (typeof object.value !== "string" && !Number.isFinite(object.value)) issue("error", path + ".value", "주 수치는 문자열 또는 유한한 숫자여야 합니다.", slideIndex);
    }
    function list(value, min, max, path, slideIndex) {
      if (!Array.isArray(value)) { issue("error", path, "배열로 입력하세요.", slideIndex); return false; }
      if (value.length < min || value.length > max) issue("error", path, min + "~" + max + "개를 지원합니다. 내용을 여러 슬라이드로 나누세요. 원본 항목은 보존됩니다.", slideIndex);
      return true;
    }
    function media(object, path, slideIndex) {
      ["src", "video", "poster", "alt", "caption", "label", "focalPoint"].forEach(function (key) { text(object, key, path, slideIndex); });
      choice(object, "fit", ["contain", "cover"], path, slideIndex);
      if (object.zoom !== undefined && (!Number.isFinite(object.zoom) || object.zoom < 1 || object.zoom > 3)) issue("warning", path + ".zoom", "1~3 사이의 유한한 숫자를 사용하세요. 범위 밖 값은 기존 규칙에 따라 제한됩니다.", slideIndex);
      if (!object.src && !object.video) issue("warning", path + ".src", "src 또는 video 경로가 없어 미디어 자리 표시자를 보여줍니다.", slideIndex);
      if (object.src && !object.alt) issue("warning", path + ".alt", "이미지를 설명하는 alt를 적어주세요.", slideIndex);
    }
    function unknownFields(object, allowed, path, slideIndex) {
      Object.keys(object).forEach(function (key) {
        if (allowed.indexOf(key) < 0) issue("warning", path + "." + key, "이 종류에서 사용하지 않는 필드입니다. 철자를 확인하세요. 원본 값은 보존됩니다.", slideIndex);
      });
    }
    function stringItems(value, min, max, path, slideIndex) {
      if (list(value, min, max, path, slideIndex)) value.forEach(function (item, index) {
        if (typeof item !== "string") issue("error", path + "." + index, "문자열로 입력하세요.", slideIndex);
      });
    }
    function stillImage(object, path, slideIndex) {
      ["src", "alt"].forEach(function (key) { text(object, key, path, slideIndex); });
      if (object.src && !object.alt) issue("warning", path + ".alt", "이미지를 설명하는 alt를 적어주세요.", slideIndex);
      ["video", "poster"].forEach(function (key) {
        if (object[key] !== undefined) issue("error", path + "." + key, "이 결과물에는 정지 이미지 src를 사용하세요. 영상은 media 타일에서 지원합니다.", slideIndex);
      });
    }
    function artifact(item, path, slideIndex) {
      if (!owns(artifactFields, item.kind)) { issue("error", path + ".kind", "지원 종류: " + Object.keys(artifactFields).join(" / ") + ".", slideIndex); return; }
      unknownFields(item, ["type", "kind", "tone"].concat(artifactFields[item.kind]), path, slideIndex);
      ["label", "subtitle", "footer", "edition", "text", "caption", "progress", "number"].filter(function (key) { return artifactFields[item.kind].indexOf(key) >= 0; }).forEach(function (key) { text(item, key, path, slideIndex, key === "text"); });
      if (artifactFields[item.kind].indexOf("title") >= 0) {
        if (item.kind === "cover" && Array.isArray(item.title)) stringItems(item.title, 1, 4, path + ".title", slideIndex);
        else text(item, "title", path, slideIndex, item.kind === "cover" || item.kind === "report");
      }
      if (item.kind === "cover") {
        stillImage(item, path, slideIndex);
        text(item, "focalPoint", path, slideIndex);
        choice(item, "fit", ["contain", "cover"], path, slideIndex);
      }
      if (["concepts", "report", "process", "actions"].indexOf(item.kind) >= 0) stringItems(item.items, item.kind === "process" ? 2 : 1, item.kind === "process" ? 4 : 3, path + ".items", slideIndex);
      if (item.kind === "actions") icon(item, path, slideIndex);
      if (item.kind === "task" && item.tools !== undefined && list(item.tools, 1, 4, path + ".tools", slideIndex)) item.tools.forEach(function (tool, index) {
        var toolPath = path + ".tools." + index;
        if (!record(tool)) { issue("error", toolPath, "icon 또는 src를 가진 객체여야 합니다.", slideIndex); return; }
        unknownFields(tool, ["icon", "src", "alt", "label", "tone"], toolPath, slideIndex);
        ["src", "alt", "label"].forEach(function (key) { text(tool, key, toolPath, slideIndex); });
        icon(tool, toolPath, slideIndex);
        choice(tool, "tone", itemTones, toolPath, slideIndex);
        if (Boolean(tool.src) === Boolean(tool.icon)) issue("error", toolPath, "src 또는 icon 중 하나만 지정하세요.", slideIndex);
        stillImage(tool, toolPath, slideIndex);
      });
    }
    if (!record(config)) {
      issue("error", "$", "window.PRESENTATION은 slides 배열을 가진 객체여야 합니다.");
      return issues;
    }
    ["id", "title", "speaker", "date", "footer"].forEach(function (key) { text(config, key, "$", undefined); });
    choice(config, "theme", ["stage", "paper", "midnight"], "$", undefined);
    if (!Array.isArray(config.slides) || config.slides.length === 0) {
      issue("error", "slides", "한 장 이상의 슬라이드 객체를 배열에 넣으세요.");
      return issues;
    }
    config.slides.forEach(function (slide, slideIndex) {
      var path = "slides." + slideIndex;
      if (!record(slide)) { issue("error", path, "이 슬라이드는 객체여야 합니다. null 또는 배열을 바꾸세요.", slideIndex); return; }
      if (typeof slide.layout !== "string" || !owns(layouts, slide.layout)) {
        issue("error", path + ".layout", "지원하는 layout 이름을 사용하세요.", slideIndex);
        return;
      }
      ["id", "eyebrow", "subtitle", "notes", "highlight", "support", "source", "takeaway", "action", "url", "quote", "attribution", "label", "unit"].forEach(function (key) { text(slide, key, path, slideIndex); });
      if (slide.title !== undefined) {
        if (Array.isArray(slide.title)) {
          slide.title.forEach(function (line, lineIndex) { if (typeof line !== "string") issue("error", path + ".title." + lineIndex, "제목의 각 줄은 문자열이어야 합니다.", slideIndex); });
        } else if (typeof slide.title !== "string") issue("error", path + ".title", "제목은 문자열 또는 문자열 배열이어야 합니다.", slideIndex);
      }
      ["quiet"].forEach(function (key) { if (slide[key] !== undefined && typeof slide[key] !== "boolean") issue("error", path + "." + key, "true 또는 false를 입력하세요.", slideIndex); });
      choice(slide, "theme", ["stage", "paper", "midnight"], path, slideIndex);
      if (slide.layout === "blocks") {
        if (slide.tone !== undefined && ["orange", "purple", "blue", "green", "yellow", "neutral"].indexOf(slide.tone) < 0) issue("error", path + ".tone", "지원하는 blocks tone을 사용하세요.", slideIndex);
      } else choice(slide, "tone", ["orange", "purple", "blue", "green", "yellow"], path, slideIndex);
      blocksView(slide, path, slideIndex);
      if (slide.motion !== undefined && ["none", "fade", "rise", "stagger", "chart"].indexOf(slide.motion) < 0) issue("error", path + ".motion", "none / fade / rise / stagger / chart 중 하나를 입력하거나 motion을 생략하세요.", slideIndex);
      choice(slide, "surface", ["butter"], path, slideIndex);
      choice(slide, "align", ["center"], path, slideIndex);
      if (slide.number !== undefined && typeof slide.number !== "string" && !Number.isFinite(slide.number)) issue("error", path + ".number", "섹션 번호는 문자열 또는 유한한 숫자여야 합니다.", slideIndex);
      if (slide.layout === "blocks") {
        issues = issues.concat(validateBlocks(slide.blocks, path + ".blocks", slideIndex));
        if (slide.heading !== undefined) {
          issues = issues.concat(validateBlocks([slide.heading], path + ".heading", slideIndex));
          if (!record(slide.heading) || slide.heading.type !== "element" || slide.heading.tag !== "h1") issue("error", path + ".heading", "승격 제목은 h1 요소여야 합니다.", slideIndex);
        }
      }
      if (slide.layout === "visual") issues = issues.concat(validateVisual(slide.visual, path + ".visual", slideIndex));
      if (slide.layout === "metric") displayValue(slide, path, slideIndex);
      if (slide.layout === "compare") {
        ["left", "right"].forEach(function (side) {
          if (!record(slide[side])) { issue("error", path + "." + side, "label과 points 배열을 가진 객체여야 합니다.", slideIndex); return; }
          text(slide[side], "label", path + "." + side, slideIndex);
          if (list(slide[side].points, 0, 3, path + "." + side + ".points", slideIndex)) slide[side].points.forEach(function (point, pointIndex) { if (typeof point !== "string") issue("error", path + "." + side + ".points." + pointIndex, "문자열로 입력하세요.", slideIndex); });
        });
      }
      if (slide.layout === "steps" || (slide.layout === "demo" && slide.steps !== undefined)) {
        if (list(slide.steps, slide.layout === "steps" ? 1 : 0, 3, path + ".steps", slideIndex)) slide.steps.forEach(function (step, stepIndex) {
          var stepPath = path + ".steps." + stepIndex;
          if (slide.layout === "demo") { if (typeof step !== "string") issue("error", stepPath, "데모 단계는 문자열이어야 합니다.", slideIndex); }
          else if (!record(step)) issue("error", stepPath, "title과 description을 가진 객체여야 합니다.", slideIndex);
          else { text(step, "title", stepPath, slideIndex, true); text(step, "description", stepPath, slideIndex); }
        });
      }
      if (["image", "media", "demo"].indexOf(slide.layout) >= 0) media(slide, path, slideIndex);
      if (["gallery", "mosaic", "results", "categories"].indexOf(slide.layout) >= 0) {
        var maxima = { gallery: 6, mosaic: 8, results: 4, categories: 5 };
        if (slide.layout === "gallery") choice(slide, "variant", ["portraits", "strip"], path, slideIndex);
        if (list(slide.items, 1, maxima[slide.layout], path + ".items", slideIndex)) {
          slide.items.forEach(function (item, itemIndex) {
            var itemPath = path + ".items." + itemIndex;
            if (!record(item)) { issue("error", itemPath, "각 항목은 객체여야 합니다. null 또는 배열을 바꾸세요.", slideIndex); return; }
            if (slide.layout === "categories") {
              ["label", "description", "symbol"].forEach(function (key) { text(item, key, itemPath, slideIndex, key === "label"); });
              icon(item, itemPath, slideIndex);
              choice(item, "tone", itemTones, itemPath, slideIndex);
            } else {
              media(item, itemPath, slideIndex);
              if (slide.layout === "mosaic" && item.span !== 1 && item.span !== 2) issue("error", itemPath + ".span", "mosaic의 span은 숫자 1 또는 2여야 합니다.", slideIndex);
            }
          });
          if (slide.layout === "mosaic" && !packMosaic(slide.items)) issue("error", path + ".items", "4열 × 2행에 모두 배치할 수 없습니다. span 합을 8 이하로 줄이거나 슬라이드를 나누세요.", slideIndex);
        }
      }
      if (slide.layout === "metric-pair") {
        if (list(slide.items, 2, 2, path + ".items", slideIndex)) slide.items.forEach(function (item, itemIndex) {
          var itemPath = path + ".items." + itemIndex;
          if (!record(item)) { issue("error", itemPath, "value와 label을 가진 객체여야 합니다.", slideIndex); return; }
          displayValue(item, itemPath, slideIndex);
          text(item, "label", itemPath, slideIndex, true);
          text(item, "unit", itemPath, slideIndex);
          choice(item, "tone", itemTones, itemPath, slideIndex);
        });
      }
      if (slide.layout === "bento") {
        choice(slide, "variant", ["editorial"], path, slideIndex);
        if (Array.isArray(slide.items) && slide.items.some(function (item) { return record(item) && item.type === "artifact"; }) && slide.variant !== "editorial") issue("error", path + ".variant", "artifact 결과물에는 variant: \"editorial\"을 지정하세요.", slideIndex);
        if (!bentoPreset(slide.preset)) issue("error", path + ".preset", "bento의 지원 preset은 recap / seoul입니다.", slideIndex);
        if (list(slide.items, 12, 12, path + ".items", slideIndex)) slide.items.forEach(function (item, itemIndex) {
          var itemPath = path + ".items." + itemIndex;
          if (!record(item)) { issue("error", itemPath, "type을 가진 타일 객체여야 합니다.", slideIndex); return; }
          ["column", "row", "columnSpan", "rowSpan", "span"].forEach(function (key) {
            if (item[key] !== undefined) issue("error", itemPath + "." + key, "preset의 고정 배치를 사용합니다. 개별 좌표·span을 제거하세요.", slideIndex);
          });
          choice(item, "tone", itemTones, itemPath, slideIndex);
          if (item.type === "media") media(item, itemPath, slideIndex);
          else if (item.type === "metric") {
            displayValue(item, itemPath, slideIndex);
            text(item, "unit", itemPath, slideIndex);
            text(item, "label", itemPath, slideIndex, true);
          } else if (item.type === "text") {
            text(item, "label", itemPath, slideIndex);
            text(item, "text", itemPath, slideIndex, true);
          } else if (item.type === "artifact") artifact(item, itemPath, slideIndex);
          else issue("error", itemPath + ".type", "media / metric / text / artifact 중 하나를 사용하세요.", slideIndex);
        });
      }
      if (slide.layout === "icon-wall") {
        if (list(slide.items, 1, 22, path + ".items", slideIndex)) slide.items.forEach(function (item, itemIndex) {
          var itemPath = path + ".items." + itemIndex;
          if (!record(item)) { issue("error", itemPath, "icon 또는 src를 가진 객체여야 합니다.", slideIndex); return; }
          ["src", "alt", "label"].forEach(function (key) { text(item, key, itemPath, slideIndex); });
          icon(item, itemPath, slideIndex);
          choice(item, "tone", itemTones, itemPath, slideIndex);
          if (Boolean(item.src) === Boolean(item.icon)) issue("error", itemPath, "src 또는 icon 중 하나만 지정하세요.", slideIndex);
          if (item.src && !item.alt) issue("warning", itemPath + ".alt", "이미지 아이콘을 설명하는 alt를 적어주세요.", slideIndex);
          if (item.video !== undefined || item.poster !== undefined) issue("error", itemPath, "icon-wall은 정지 이미지 src 또는 의미 아이콘만 지원합니다.", slideIndex);
        });
      }
      if (slide.layout === "chart") {
        if (!record(slide.chart)) { issue("error", path + ".chart", "rows 배열을 가진 chart 객체여야 합니다.", slideIndex); return; }
        ["title", "unit"].forEach(function (key) { text(slide.chart, key, path + ".chart", slideIndex); });
        if (slide.chart.max !== undefined && (!Number.isFinite(Number(slide.chart.max)) || Number(slide.chart.max) <= 0)) issue("warning", path + ".chart.max", "양수인 최댓값을 입력하세요. 현재는 행의 값에서 계산합니다.", slideIndex);
        if (list(slide.chart.rows, 1, 6, path + ".chart.rows", slideIndex)) slide.chart.rows.forEach(function (row, rowIndex) {
          var rowPath = path + ".chart.rows." + rowIndex;
          if (!record(row)) { issue("error", rowPath, "label과 value를 가진 객체여야 합니다.", slideIndex); return; }
          text(row, "label", rowPath, slideIndex);
          if ((typeof row.value !== "number" && typeof row.value !== "string") || String(row.value).trim() === "" || !Number.isFinite(Number(row.value))) issue("error", rowPath + ".value", "유한한 숫자 또는 숫자 문자열이어야 합니다.", slideIndex);
          else if (Number(row.value) < 0) issue("error", rowPath + ".value", "이 막대 양식은 0 이상의 값만 지원합니다. 음수까지 표현하려면 다른 차트나 설명을 사용하세요.", slideIndex);
          if (row.highlight !== undefined && typeof row.highlight !== "boolean") issue("error", rowPath + ".highlight", "true 또는 false를 입력하세요.", slideIndex);
        });
      }
    });
    return issues;
  }
  return { validateBlocks: validateBlocks, validateDeck: validateDeck, validateVisual: validateVisual, visualSeries: visualSeries, packMosaic: packMosaic, bentoPreset: bentoPreset, iconWallSlots: iconWallSlots, iconNames: iconNames.slice(), normalizeIcon: normalizeIcon };
});
