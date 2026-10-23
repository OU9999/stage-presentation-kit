/* Shared by the browser and Node checks. Validation never changes the input. */
(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.STAGE_MODEL = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var layouts = Object.create(null);
  ["cover", "statement", "section", "compare", "metric", "image", "demo", "quote", "steps", "closing", "chart", "media", "gallery", "mosaic", "results", "categories", "bento", "icon-wall", "metric-pair"].forEach(function (name) { layouts[name] = true; });
  var owns = function (object, key) { return Object.prototype.hasOwnProperty.call(object, key); };
  var record = function (value) { return value !== null && typeof value === "object" && !Array.isArray(value); };
  var iconNames = ["brain", "price", "speed", "image", "voice", "record", "compare", "select", "share", "code", "chart", "search", "book", "calendar", "mail", "globe", "check", "folder", "music", "spark"];
  var itemTones = ["blue", "green", "orange", "purple", "yellow", "white"];

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
    function icon(object, path, slideIndex) {
      if (object.icon !== undefined && (typeof object.icon !== "string" || iconNames.indexOf(object.icon) < 0)) issue("error", path + ".icon", "지원하는 의미 아이콘 키를 사용하세요: " + iconNames.join(" / ") + ".", slideIndex);
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
        issue("error", path + ".layout", "지원하는 19개 layout 이름을 사용하세요.", slideIndex);
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
      choice(slide, "tone", ["orange", "purple", "blue", "green", "yellow"], path, slideIndex);
      choice(slide, "surface", ["butter"], path, slideIndex);
      choice(slide, "align", ["center"], path, slideIndex);
      if (slide.number !== undefined && typeof slide.number !== "string" && !Number.isFinite(slide.number)) issue("error", path + ".number", "섹션 번호는 문자열 또는 유한한 숫자여야 합니다.", slideIndex);
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
          } else issue("error", itemPath + ".type", "media / metric / text 중 하나를 사용하세요.", slideIndex);
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
  return { validateDeck: validateDeck, packMosaic: packMosaic, bentoPreset: bentoPreset, iconWallSlots: iconWallSlots, iconNames: iconNames.slice() };
});
