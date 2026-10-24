/* No build step, network requests, or third-party runtime. */
(function () {
  "use strict";

  var stage = document.getElementById("slideStage");
  var model = window.STAGE_MODEL;
  if (!model) {
    stage.textContent = "deck-model.js를 불러오지 못했습니다. index.html의 스크립트 경로를 확인하세요.";
    return;
  }
  var record = function (value) { return value !== null && typeof value === "object" && !Array.isArray(value); };
  var owns = function (value, key) { return Object.prototype.hasOwnProperty.call(value, key); };
  var clone = function (value) { try { var text = JSON.stringify(value); return text === undefined ? value : JSON.parse(text); } catch (_) { return value; } };
  var original = clone(window.PRESENTATION);
  var params = new URLSearchParams(location.search);
  var isPresenter = params.get("presenter") === "1";
  var themes = ["stage", "paper", "midnight"];
  var names = { cover: "표지", statement: "큰 문장", section: "섹션", compare: "비교", metric: "숫자", image: "이미지", demo: "데모", quote: "인용", steps: "단계", closing: "마무리", chart: "메시지와 차트", media: "전체 화면 시연", gallery: "이미지 갤러리", mosaic: "이미지 모자이크", results: "메시지와 결과", categories: "분류와 역할", bento: "혼합 결과 타일", "icon-wall": "아이콘월", "metric-pair": "두 수치 비교" };
  var tones = ["orange", "purple", "blue", "green", "yellow"];
  var itemTones = tones.concat("white");
  var motions = ["none", "fade", "rise", "stagger", "chart"];
  var motionPreference = typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  // Original geometric drawings, with one viewBox and stroke weight; no font glyphs or brand logos.
  var iconPaths = {
    brain: "M9 5a3 3 0 0 0-5 2 3.5 3.5 0 0 0-1 6 3.5 3.5 0 0 0 4 5 3 3 0 0 0 5 2V5a3 3 0 0 0-3 0ZM15 5a3 3 0 0 1 5 2 3.5 3.5 0 0 1 1 6 3.5 3.5 0 0 1-4 5 3 3 0 0 1-5 2M7 8c3 0 3 4 1 5M5 14c2-1 4 0 4 2M17 8c-3 0-3 4-1 5M19 14c-2-1-4 0-4 2",
    price: "M15.5 7.5c-1-2-6-2-6 1 0 3 6 2 6 5 0 3-5 3-7 1M12 4v15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    speed: "m13 2-9 12h7l-1 8 10-13h-7l1-7Z",
    image: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM3 17l6-6 5 5 3-3 4 4M10 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    voice: "M3 10v4M7.5 6v12M12 3v18M16.5 7v10M21 10v4",
    record: "M8 4H5v17h14V4h-3M8 2h8v5H8V2ZM8 11h8M8 15h8M8 18h5",
    compare: "M3 7h16m-4-4 4 4-4 4M21 17H5m4-4-4 4 4 4",
    select: "m4 3 6 17 3-7 7-3L4 3ZM14 15l5 5",
    share: "M9 8l6-3M9 16l6 3M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 20a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
    chart: "M3 3v18h18M7 16v-5M12 16V7M17 16V4",
    search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6",
    book: "M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15",
    calendar: "M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2ZM7 2v5m10-5v5M3 9h18M7 13h2m6 0h2M7 17h2m6 0h2",
    mail: "M3 5h18v14H3V5Zm0 0 9 8 9-8",
    globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z",
    check: "m6 12 4 4 8-8M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    folder: "M3 5h7l2 3h9v12H3V5Z",
    music: "M10 17V4l11-2v13M10 7l11-2M10 17c0 4-7 5-7 1 0-3 7-4 7-1Zm11-2c0 4-7 5-7 1 0-3 7-4 7-1Z",
    spark: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"
  };
  var storageKey = "stage-kit:v1:" + (record(original) && typeof original.id === "string" ? original.id : "deck") + ":" + location.pathname;
  var sourceSignature;
  try { sourceSignature = JSON.stringify(original); } catch (_) { sourceSignature = null; }
  var rawDeck = clone(original);
  var deck;
  var validationIssues = [];
  var rootFatal = false;
  var geometryIssues = Object.create(null);
  var diagnosticsTimer;
  var restored = false;
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved && saved.sourceSignature === sourceSignature && owns(saved, "deck")) {
      rawDeck = clone(saved.deck);
      restored = true;
    }
  } catch (_) { /* Local storage can be unavailable for local files. */ }
  refreshValidation();
  var state = {
    index: Math.max(0, Math.min(deck.slides.length - 1, (parseInt(location.hash.slice(1), 10) || 1) - 1)),
    mode: "present", editing: false, theme: themes.indexOf(deck.theme) >= 0 ? deck.theme : "stage"
  };
  var revision = Date.now();
  var saveTimer;
  var toastTimer;
  var presenterWindow = null;
  var currentDialog = null;
  var returnFocus = null;
  var startedAt = Date.now();
  var lastRemoteState = null;
  var remoteConnected = false;
  var lastRemoteSeen = 0;
  var token = params.get("session") || "";
  if (!isPresenter) {
    var tokenKey = storageKey + ":session";
    try { token = sessionStorage.getItem(tokenKey) || ""; } catch (_) { /* Optional persistence. */ }
    if (!token && window.name.indexOf("stage-audience:") === 0) token = window.name.slice(15);
    if (!token) {
      token = window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2);
      try { sessionStorage.setItem(tokenKey, token); } catch (_) { /* window.name is the fallback. */ }
    }
    if (!window.name || window.name.indexOf("stage-audience:") === 0) window.name = "stage-audience:" + token;
  }

  function refreshValidation() {
    try {
      validationIssues = model.validateDeck(rawDeck);
      JSON.stringify(rawDeck);
    } catch (_) {
      validationIssues = [{ severity: "error", path: "$", message: "설정을 읽을 수 없습니다. 순환 참조 없이 JSON으로 저장할 수 있는 데이터인지 확인하세요." }];
    }
    rootFatal = validationIssues.some(function (issue) { return issue.severity === "error" && issue.slideIndex === undefined; });
    deck = rootFatal ? { title: "발표 설정을 확인하세요", theme: "stage", speaker: "", date: "", footer: "CONTENT CHECK", slides: [null] } : rawDeck;
  }

  function slideName(index) {
    var slide = deck.slides[index];
    return record(slide) && owns(names, slide.layout) ? names[slide.layout] : "입력 확인";
  }

  function element(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
  }

  function semanticIcon(name) {
    name = model.normalizeIcon(name);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", owns(iconPaths, name) ? iconPaths[name] : "");
    svg.append(path);
    return svg;
  }

  function valueAt(object, path) {
    return path.split(".").reduce(function (value, key) { return value == null ? undefined : value[key]; }, object);
  }

  function setAt(object, path, value) {
    var parts = path.split(".");
    var key = parts.pop();
    var parent = parts.reduce(function (part, segment) { return part[segment]; }, object);
    if (parent && key !== "__proto__" && key !== "constructor" && key !== "prototype") parent[key] = value;
  }

  function field(tag, className, slide, path, fallback, owner) {
    var value = valueAt(owner === "deck" ? deck : slide, path);
    var el = element(tag, className, value == null ? fallback || "" : value);
    el.dataset.field = path;
    if (owner) el.dataset.owner = owner;
    return el;
  }

  function title(slide, className, path) {
    path = path || "title";
    var value = valueAt(slide, path);
    var el;
    if (Array.isArray(value)) {
      el = element("h1", className || "slide-title");
      value.forEach(function (line, index) { el.append(field("span", "title-line", slide, path + "." + index)); });
    } else {
      el = field("h1", className || "slide-title", slide, path);
    }
    if (slide.highlight) {
      var targets = el.dataset.field ? [el] : Array.from(el.children);
      targets.forEach(function (target) {
        var text = target.textContent;
        var start = text.indexOf(slide.highlight);
        if (start < 0) return;
        target.textContent = "";
        target.append(document.createTextNode(text.slice(0, start)), element("mark", "accent-text", slide.highlight), document.createTextNode(text.slice(start + slide.highlight.length)));
      });
    }
    return el;
  }

  function optional(parent, tag, className, slide, path) {
    if (valueAt(slide, path)) parent.append(field(tag, className, slide, path));
  }

  function safeUrl(url) {
    if (!url) return "";
    try {
      var resolved = new URL(url, location.href);
      return ["http:", "https:", "mailto:", "file:"].indexOf(resolved.protocol) >= 0 ? resolved.href : "";
    } catch (_) { return ""; }
  }

  function media(slide, preview, path) {
    var wrap = element("div", "media-frame");
    wrap.dataset.mediaPath = (path || "") + (slide.video ? "video" : "src");
    var src = slide.video || slide.src;
    if (src) {
      var item;
      if (slide.video) {
        item = element("video", "slide-video");
        item.controls = !preview;
        item.preload = "metadata";
        item.playsInline = true;
        if (slide.poster) item.poster = slide.poster;
      } else {
        item = element("img", "slide-image");
        item.alt = slide.alt || "발표 이미지";
        item.draggable = false;
      }
      item.src = src;
      item.style.objectFit = slide.fit === "cover" ? "cover" : "contain";
      if (slide.focalPoint) item.style.objectPosition = slide.focalPoint;
      var zoom = Number.isFinite(slide.zoom) ? Math.max(1, Math.min(3, slide.zoom)) : 1;
      item.style.transform = "scale(" + zoom + ")";
      item.style.transformOrigin = slide.focalPoint || "50% 50%";
      if (!preview) item.addEventListener(slide.video ? "loadedmetadata" : "load", scheduleDiagnostics);
      item.addEventListener("error", function () {
        item.hidden = true;
        wrap.dataset.mediaError = String(src);
        var fallback = element("div", "image-placeholder");
        fallback.append(element("span", "placeholder-symbol", "↗"), element("p", "placeholder-title", "미디어를 찾을 수 없습니다."), element("span", "placeholder-path", String(src)), element("small", "placeholder-hint", "content.js의 파일 경로를 확인하세요."));
        wrap.append(fallback);
        if (!preview) scheduleDiagnostics();
      }, { once: true });
      wrap.append(item);
    } else {
      var placeholder = element("div", "image-placeholder");
      placeholder.append(element("span", "placeholder-symbol", "＋"), element("p", "placeholder-title", "당신의 장면을 넣으세요."), element("small", "placeholder-hint", "content.js → src 또는 video"));
      wrap.append(placeholder);
    }
    return wrap;
  }

  function mediaItem(slide, index, kind, preview) {
    var item = slide.items[index] || {};
    var figure = element("figure", kind + "-item");
    figure.dataset.itemIndex = String(index);
    var path = "items." + index + ".";
    if (kind === "mosaic") figure.dataset.span = Number(item.span) === 2 ? "2" : "1";
    optional(figure, "div", kind + "-label media-item-label", slide, path + "label");
    figure.append(media(item, preview, path));
    optional(figure, "figcaption", kind + "-caption media-item-caption", slide, path + "caption");
    return figure;
  }

  // Artwork is decorative geometry. All author-supplied words remain editable DOM fields.
  function artifactArt(kind) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", kind === "cover" ? "0 0 280 180" : kind === "waveform" ? "0 0 170 70" : "0 0 54 54");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    function shape(tag, attrs) {
      var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.keys(attrs).forEach(function (key) { node.setAttribute(key, attrs[key]); });
      svg.append(node);
    }
    if (kind === "cover") {
      shape("rect", { width: 280, height: 180, fill: "#d8dee1" });
      shape("circle", { cx: 60, cy: 100, r: 105, fill: "#80a9de" });
      shape("circle", { cx: 205, cy: 180, r: 107, fill: "#e9b17c" });
      shape("circle", { cx: 233, cy: -10, r: 43, fill: "#b6a4cd" });
      shape("path", { d: "M-10 172C40 75 90 13 137 53S208 172 290 50", fill: "none", stroke: "#244b76", "stroke-width": 8 });
      [[70, 62], [160, 79], [238, 115]].forEach(function (point) { shape("circle", { cx: point[0], cy: point[1], r: 8, fill: "#eeede5" }); });
    } else if (kind === "waveform") {
      shape("path", { d: "M5 31V39M16 24V46M27 29V41M38 15V55M49 22V48M60 6V64M71 17V53M82 24V46M93 11V59M104 19V51M115 28V42M126 18V52M137 25V45M148 31V39M159 29V41", fill: "none", stroke: "currentColor", "stroke-width": 5, "stroke-linecap": "round" });
    } else if (kind === "quote") {
      shape("path", { d: "M0 32Q14 10 27 30T54 25", fill: "none", stroke: "currentColor", "stroke-width": 3 });
    } else {
      shape("circle", { cx: 23, cy: 29, r: 22, fill: "#86a8d0" });
      shape("circle", { cx: 37, cy: 19, r: 14, fill: "#e8ad7a" });
      shape("path", { d: "M2 49Q27 1 52 49", fill: "none", stroke: "#2f557f", "stroke-width": 4 });
    }
    return svg;
  }

  function artifact(slide, itemIndex, preview) {
    var item = slide.items[itemIndex];
    var path = "items." + itemIndex + ".";
    var kind = item.kind;
    var surface = element("div", "artifact artifact-" + kind);
    function copy(tag, className, key) { return field(tag, className, slide, path + key); }
    function addOptional(parent, tag, className, key) { optional(parent, tag, className, slide, path + key); }
    function heading() {
      var result = Array.isArray(item.title) ? element("h2", "artifact-title") : copy("h2", "artifact-title", "title");
      if (Array.isArray(item.title)) item.title.forEach(function (_, index) { result.append(copy("span", "title-line", "title." + index)); });
      return result;
    }
    if (kind === "cover") {
      addOptional(surface, "p", "artifact-kicker", "label");
      surface.append(heading());
      addOptional(surface, "p", "artifact-subtitle", "subtitle");
      var art = element("div", "artifact-cover-art");
      art.append(item.src ? media({ src: item.src, alt: item.alt, fit: item.fit, focalPoint: item.focalPoint }, preview, path) : artifactArt("cover"));
      surface.append(art);
      if (item.footer || item.edition) {
        var footer = element("div", "artifact-cover-footer");
        addOptional(footer, "span", "artifact-footer", "footer");
        addOptional(footer, "span", "artifact-edition", "edition");
        surface.append(footer);
      }
    } else if (kind === "quote" || kind === "waveform") {
      addOptional(surface, "p", "artifact-kicker", "label");
      if (kind === "waveform") surface.append(artifactArt(kind));
      surface.append(copy(kind === "quote" ? "blockquote" : "p", "artifact-text", "text"));
      if (kind === "quote") surface.append(artifactArt(kind));
    } else if (kind === "concepts") {
      var concepts = element("div", "artifact-concepts-map");
      concepts.dataset.count = String(item.items.length);
      var links = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      links.setAttribute("viewBox", "0 0 222 200");
      links.setAttribute("aria-hidden", "true");
      var link = document.createElementNS("http://www.w3.org/2000/svg", "path");
      link.setAttribute("d", item.items.length > 2 ? "M62 50L157 70L112 149ZM62 50L36 113L112 149L184 157L157 70" : item.items.length > 1 ? "M62 50L157 70" : "");
      link.setAttribute("fill", "none");
      link.setAttribute("stroke", "currentColor");
      links.append(link);
      concepts.append(links);
      item.items.forEach(function (_, index) { concepts.append(copy("span", "artifact-concept", "items." + index)); });
      surface.append(concepts);
      addOptional(surface, "p", "artifact-caption", "caption");
    } else if (kind === "task") {
      var task = element("div", "artifact-task-surface");
      var taskTitle = element("div", "artifact-task-header");
      addOptional(taskTitle, "h2", "artifact-task-title", "title");
      addOptional(taskTitle, "span", "artifact-task-progress", "progress");
      if (item.title || item.progress) task.append(taskTitle);
      var taskRow = element("div", "artifact-task-row");
      var check = element("span", "artifact-check", "✓");
      check.setAttribute("aria-hidden", "true");
      taskRow.append(check, copy("p", "artifact-task-text", "text"));
      task.append(taskRow);
      var tools = element("div", "artifact-tools");
      var defaults = [{ icon: "record", tone: "blue" }, { icon: "voice", tone: "orange" }, { icon: "brain", tone: "purple" }, { icon: "share", tone: "green" }];
      (item.tools || defaults).forEach(function (tool, index) {
        var toolNode = element("div", "artifact-tool");
        if (itemTones.indexOf(tool.tone) >= 0) toolNode.dataset.tone = tool.tone;
        else toolNode.dataset.tone = defaults[index].tone;
        toolNode.append(tool.src ? media({ src: tool.src, alt: tool.alt }, preview, path + "tools." + index + ".") : semanticIcon(tool.icon));
        if (tool.label && item.tools) {
          toolNode.setAttribute("aria-label", tool.label);
          toolNode.append(copy("span", "artifact-tool-label", "tools." + index + ".label"));
        }
        tools.append(toolNode);
      });
      surface.append(task, tools);
    } else if (kind === "report") {
      var reportMark = element("div", "artifact-report-mark");
      addOptional(reportMark, "span", "artifact-report-number", "number");
      reportMark.append(artifactArt("report"));
      var reportCopy = element("div", "artifact-report-copy");
      addOptional(reportCopy, "p", "artifact-kicker", "label");
      reportCopy.append(heading());
      item.items.forEach(function (_, index) { reportCopy.append(copy("p", "artifact-report-line", "items." + index)); });
      surface.append(reportMark, reportCopy);
    } else if (kind === "process") {
      var process = element("ol", "artifact-process-steps");
      item.items.forEach(function (_, index) {
        var step = element("li", "artifact-process-step");
        var number = element("span", "artifact-process-number", String(index + 1));
        number.setAttribute("aria-hidden", "true");
        step.append(number, copy("span", "artifact-process-label", "items." + index));
        process.append(step);
      });
      surface.append(process);
      if (item.title) surface.append(heading());
    } else if (kind === "actions") {
      var actionHeading = element("div", "artifact-actions-header");
      actionHeading.append(semanticIcon(item.icon || "record"));
      if (item.title) actionHeading.append(heading());
      var actions = element("ul", "artifact-actions-list");
      item.items.forEach(function (_, index) { actions.append(copy("li", "artifact-action", "items." + index)); });
      surface.append(actionHeading, actions);
    }
    return surface;
  }

  function renderErrorSlide(index, errors) {
    var article = element("article", "slide layout-error");
    article.dataset.layout = "error";
    article.dataset.index = String(index);
    article.dataset.theme = state.theme;
    article.setAttribute("aria-label", (index + 1) + "번 슬라이드 입력 확인");
    var inner = element("div", "slide-inner");
    inner.append(element("div", "slide-eyebrow", "CONTENT CHECK"));
    var body = element("div", "slide-body");
    body.append(element("h1", "slide-title", rootFatal ? "발표 설정을 확인하세요." : (index + 1) + "번 슬라이드를 확인하세요."), element("p", "error-summary", rootFatal ? "발표 설정을 고치면 다시 표시됩니다. 원본 데이터는 보존됩니다." : "다른 슬라이드는 계속 볼 수 있습니다. 원본 데이터와 항목은 그대로 보존됩니다."));
    var list = element("ul", "error-list");
    errors.forEach(function (issue) {
      var item = element("li", "error-item");
      item.append(element("code", "error-path", issue.path), element("span", "error-message", issue.message));
      list.append(item);
    });
    body.append(list, element("p", "error-guidance", "content.js의 표시된 경로를 고치세요. 항목이 많다면 장을 나누고, 읽기 모드에서 원본 내용을 확인하세요."));
    var raw;
    try { raw = JSON.stringify(rootFatal ? rawDeck : deck.slides[index], null, 2); } catch (_) { raw = "설정을 JSON으로 표시할 수 없습니다. content.js 원본을 확인하세요."; }
    body.append(element("pre", "error-raw", raw === undefined ? "undefined" : raw));
    inner.append(body);
    var footer = element("footer", "slide-footer");
    footer.append(element("span", "slide-footer-label", "원본 데이터는 내용 내보내기로 보관할 수 있습니다."), element("span", "slide-page", String(index + 1).padStart(2, "0")));
    inner.append(footer);
    article.append(inner);
    return article;
  }

  function renderSlide(slide, index, preview) {
    var errors = validationIssues.filter(function (issue) { return issue.severity === "error" && (rootFatal ? issue.slideIndex === undefined : issue.slideIndex === index); });
    if (errors.length) return renderErrorSlide(index, errors);
    var layout = owns(names, slide.layout) ? slide.layout : "statement";
    var article = element("article", "slide layout-" + layout);
    article.dataset.layout = layout;
    article.dataset.hasTitle = slide.title ? "true" : "false";
    article.dataset.index = String(index);
    article.dataset.theme = slide.theme || state.theme;
    article.dataset.motion = motions.indexOf(slide.motion) >= 0 ? slide.motion : "fade";
    if (tones.indexOf(slide.tone) >= 0) article.dataset.tone = slide.tone;
    if (slide.surface === "butter") article.dataset.surface = "butter";
    if (slide.align === "center") {
      article.dataset.align = "center";
      if (["cover", "statement", "section", "closing"].indexOf(layout) >= 0) article.classList.add("is-message");
    }
    if (slide.quiet) article.classList.add("is-quiet");
    article.setAttribute("aria-label", (index + 1) + ". " + (Array.isArray(slide.title) ? slide.title.join(" ") : slide.title || slide.label || names[layout]));
    var inner = element("div", "slide-inner");
    inner.append(field("div", "slide-eyebrow", slide, "eyebrow"));
    var body = element("div", "slide-body");
    if (layout === "cover") {
      body.append(title(slide));
      optional(body, "p", "slide-subtitle", slide, "subtitle");
      var meta = element("div", "cover-meta");
      meta.append(field("span", "cover-speaker", slide, "speaker", "", "deck"), field("span", "cover-date", slide, "date", "", "deck"));
      body.append(meta);
    } else if (layout === "statement") {
      body.append(title(slide));
      optional(body, "p", "statement-support", slide, "support");
      optional(body, "p", "slide-subtitle", slide, "subtitle");
    } else if (layout === "section") {
      body.append(field("div", "section-number", slide, "number"), title(slide));
      optional(body, "p", "slide-subtitle", slide, "subtitle");
    } else if (layout === "compare") {
      body.append(title(slide));
      var columns = element("div", "compare-grid");
      ["left", "right"].forEach(function (side) {
        var column = element("section", "compare-column compare-" + side);
        column.append(field("h2", "compare-label", slide, side + ".label"));
        var points = element("ul", "compare-points");
        ((slide[side] && slide[side].points) || []).forEach(function (_, pointIndex) { points.append(field("li", "compare-point", slide, side + ".points." + pointIndex)); });
        column.append(points);
        columns.append(column);
      });
      body.append(columns);
    } else if (layout === "metric") {
      var number = element("div", "metric-value");
      number.append(field("span", "metric-number", slide, "value"));
      optional(number, "span", "metric-unit", slide, "unit");
      body.append(number, field("h1", "metric-label", slide, "label"));
      optional(body, "p", "metric-support", slide, "support");
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "metric-pair") {
      if (slide.title) body.append(title(slide));
      var metricPairs = element("div", "metric-pair-grid");
      slide.items.forEach(function (item, itemIndex) {
        var metricItem = element("section", "metric-pair-item");
        var metricPath = "items." + itemIndex + ".";
        if (itemTones.indexOf(item.tone) >= 0) metricItem.dataset.tone = item.tone;
        var metricValue = element("div", "metric-value");
        metricValue.append(field("span", "metric-number", slide, metricPath + "value"));
        optional(metricValue, "span", "metric-unit", slide, metricPath + "unit");
        metricItem.append(metricValue, field("h2", "metric-label", slide, metricPath + "label"));
        metricPairs.append(metricItem);
      });
      body.append(metricPairs);
      optional(body, "p", "metric-support", slide, "support");
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "chart") {
      var chart = slide.chart || {};
      var rows = Array.isArray(chart.rows) ? chart.rows : [];
      var maximum = Number(chart.max);
      if (!Number.isFinite(maximum) || maximum <= 0) {
        maximum = rows.reduce(function (largest, row) {
          var number = Number(row && row.value);
          return Number.isFinite(number) ? Math.max(largest, number) : largest;
        }, 1);
      }
      var chartGrid = element("div", "chart-grid");
      var chartCopy = element("div", "chart-copy");
      chartCopy.append(title(slide));
      optional(chartCopy, "p", "slide-subtitle", slide, "subtitle");
      var chartVisual = element("div", "chart-visual");
      optional(chartVisual, "h2", "chart-title", slide, "chart.title");
      var bars = element("div", "chart-bars");
      rows.forEach(function (row, rowIndex) {
        var number = Number(row && row.value);
        if (!Number.isFinite(number)) number = 0;
        var chartRow = element("div", "chart-row" + (row && row.highlight ? " is-highlighted" : ""));
        var track = element("div", "chart-track");
        var bar = element("div", "chart-bar");
        bar.style.width = String(Math.max(0, Math.min(100, number / maximum * 100))) + "%";
        bar.setAttribute("aria-hidden", "true");
        track.append(bar);
        var value = element("div", "chart-value");
        var valueNumber = field("span", "chart-value-number", slide, "chart.rows." + rowIndex + ".value");
        valueNumber.textContent = String(number);
        value.append(valueNumber);
        if (chart.unit) value.append(element("span", "chart-unit", chart.unit));
        chartRow.append(field("div", "chart-row-label", slide, "chart.rows." + rowIndex + ".label"), track, value);
        bars.append(chartRow);
      });
      chartVisual.append(bars);
      optional(chartVisual, "p", "source-line", slide, "source");
      chartGrid.append(chartCopy, chartVisual);
      body.append(chartGrid);
    } else if (layout === "gallery" || layout === "mosaic") {
      if (slide.title) body.append(title(slide));
      optional(body, "p", "slide-subtitle", slide, "subtitle");
      var mediaGrid = element("div", layout + "-grid");
      if (layout === "gallery") {
        var variant = slide.variant === "strip" ? "strip" : "portraits";
        article.dataset.variant = variant;
        mediaGrid.dataset.variant = variant;
        mediaGrid.style.setProperty("--gallery-count", String(Array.isArray(slide.items) ? Math.max(1, slide.items.length) : 1));
      }
      if (Array.isArray(slide.items)) {
        var positions = layout === "mosaic" ? model.packMosaic(slide.items) : null;
        slide.items.forEach(function (_, itemIndex) {
          var item = mediaItem(slide, itemIndex, layout, preview);
          if (positions) {
            item.style.gridRow = String(positions[itemIndex].row);
            item.style.gridColumn = positions[itemIndex].column + " / span " + positions[itemIndex].span;
          }
          mediaGrid.append(item);
        });
      }
      body.append(mediaGrid);
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "results") {
      var resultsGrid = element("div", "results-grid");
      var resultsCopy = element("div", "results-copy");
      if (slide.title) resultsCopy.append(title(slide));
      optional(resultsCopy, "p", "slide-subtitle", slide, "subtitle");
      optional(resultsCopy, "p", "source-line", slide, "source");
      var resultsVisual = element("div", "results-visual");
      if (Array.isArray(slide.items)) {
        slide.items.forEach(function (_, itemIndex) { resultsVisual.append(mediaItem(slide, itemIndex, "result", preview)); });
      }
      resultsGrid.append(resultsCopy, resultsVisual);
      body.append(resultsGrid);
    } else if (layout === "categories") {
      if (slide.title) body.append(title(slide));
      optional(body, "p", "slide-subtitle", slide, "subtitle");
      var categoryGrid = element("div", "categories-grid");
      categoryGrid.style.setProperty("--category-count", String(Array.isArray(slide.items) ? Math.max(1, slide.items.length) : 1));
      if (Array.isArray(slide.items)) {
        slide.items.forEach(function (item, itemIndex) {
          item = item || {};
          var category = element("section", "category-item");
          if (itemTones.indexOf(item.tone) >= 0) category.dataset.tone = item.tone;
          var icon = element("div", "category-icon");
          var symbol = item.icon ? element("span", "category-symbol") : field("span", "category-symbol", slide, "items." + itemIndex + ".symbol");
          symbol.setAttribute("aria-hidden", "true");
          if (item.icon) symbol.append(semanticIcon(item.icon));
          icon.append(symbol);
          category.append(icon, field("h2", "category-label", slide, "items." + itemIndex + ".label"));
          optional(category, "p", "category-description", slide, "items." + itemIndex + ".description");
          categoryGrid.append(category);
        });
      }
      body.append(categoryGrid);
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "bento") {
      if (slide.title) body.append(title(slide));
      optional(body, "p", "slide-subtitle", slide, "subtitle");
      var composition = model.bentoPreset(slide.preset);
      var bento = element("div", "bento-grid");
      article.dataset.preset = slide.preset || "recap";
      if (slide.variant === "editorial") article.dataset.variant = "editorial";
      bento.style.setProperty("--bento-columns", String(composition.columns));
      bento.style.setProperty("--bento-rows", String(composition.rows));
      slide.items.forEach(function (item, itemIndex) {
        var slot = composition.slots[itemIndex];
        var tile = element("figure", "bento-item");
        var tilePath = "items." + itemIndex + ".";
        tile.dataset.type = item.type;
        if (item.type === "artifact") tile.dataset.kind = item.kind;
        tile.dataset.itemIndex = String(itemIndex);
        tile.dataset.columnSpan = String(slot.columnSpan);
        tile.dataset.rowSpan = String(slot.rowSpan);
        tile.style.gridColumn = slot.column + " / span " + slot.columnSpan;
        tile.style.gridRow = slot.row + " / span " + slot.rowSpan;
        if (itemTones.indexOf(item.tone) >= 0) tile.dataset.tone = item.tone;
        if (item.type === "media") {
          tile.append(media(item, preview, tilePath));
          if (item.label || item.caption) {
            var tileCaption = element("figcaption", "bento-media-caption");
            optional(tileCaption, "div", "bento-label", slide, tilePath + "label");
            optional(tileCaption, "p", "bento-text", slide, tilePath + "caption");
            tile.append(tileCaption);
          }
        } else if (item.type === "artifact") {
          tile.append(artifact(slide, itemIndex, preview));
        } else {
          var bentoCopy = element("div", "bento-copy");
          if (item.type === "metric") {
            var bentoValue = element("div", "bento-value");
            bentoValue.append(field("span", "bento-number", slide, tilePath + "value"));
            optional(bentoValue, "span", "bento-unit", slide, tilePath + "unit");
            bentoCopy.append(bentoValue);
          }
          optional(bentoCopy, "div", "bento-label", slide, tilePath + "label");
          if (item.type === "text") bentoCopy.append(field("p", "bento-text", slide, tilePath + "text"));
          tile.append(bentoCopy);
        }
        bento.append(tile);
      });
      body.append(bento);
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "icon-wall") {
      var wall = element("div", "icon-wall-grid");
      var wallCopy = element("div", "icon-wall-copy");
      if (slide.title) wallCopy.append(title(slide));
      optional(wallCopy, "p", "slide-subtitle", slide, "subtitle");
      wall.append(wallCopy);
      var wallSlots = model.iconWallSlots(slide.items.length);
      slide.items.forEach(function (item, itemIndex) {
        var wallItem = element("figure", "icon-wall-item");
        var wallPath = "items." + itemIndex + ".";
        wallItem.dataset.itemIndex = String(itemIndex);
        wallItem.style.gridColumn = String(wallSlots[itemIndex].column);
        wallItem.style.gridRow = String(wallSlots[itemIndex].row);
        if (itemTones.indexOf(item.tone) >= 0) wallItem.dataset.tone = item.tone;
        var wallIcon;
        if (item.icon) {
          wallIcon = element("div", "icon-wall-icon");
          wallIcon.append(semanticIcon(item.icon));
          wallIcon.setAttribute("role", "img");
          wallIcon.setAttribute("aria-label", item.alt || item.label || item.icon);
        } else {
          wallIcon = media(Object.assign({}, item, { fit: "contain" }), preview, wallPath);
          wallIcon.classList.add("icon-wall-icon");
        }
        wallItem.append(wallIcon);
        optional(wallItem, "figcaption", "icon-wall-label", slide, wallPath + "label");
        wall.append(wallItem);
      });
      body.append(wall);
      optional(body, "p", "source-line", slide, "source");
    } else if (layout === "media") {
      body.append(media(slide, preview));
      if (slide.caption) {
        var overlay = element("div", "media-overlay");
        overlay.append(field("p", "media-caption", slide, "caption"));
        body.append(overlay);
      }
    } else if (layout === "image") {
      if (slide.title) body.append(title(slide));
      body.append(media(slide, preview));
      optional(body, "p", "media-caption", slide, "caption");
    } else if (layout === "demo") {
      var demo = element("div", "demo-grid");
      var copy = element("div", "demo-copy");
      copy.append(title(slide));
      var steps = element("ol", "demo-steps");
      (slide.steps || []).forEach(function (_, stepIndex) { steps.append(field("li", "demo-step", slide, "steps." + stepIndex)); });
      copy.append(steps);
      if (safeUrl(slide.url)) {
        var demoLink = element("a", "demo-link", "데모 열기 ↗");
        demoLink.href = safeUrl(slide.url);
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        copy.append(demoLink);
      }
      var visual = element("div", "demo-media");
      visual.append(media(slide, preview));
      optional(visual, "p", "media-caption", slide, "caption");
      demo.append(copy, visual);
      body.append(demo);
    } else if (layout === "quote") {
      body.append(field("blockquote", "quote-text", slide, "quote"));
      optional(body, "p", "quote-attribution", slide, "attribution");
      optional(body, "p", "quote-support", slide, "support");
    } else if (layout === "steps") {
      body.append(title(slide));
      var sequence = element("div", "steps-grid");
      (slide.steps || []).forEach(function (_, stepIndex) {
        var step = element("section", "step");
        step.append(element("span", "step-number", String(stepIndex + 1).padStart(2, "0")), field("h2", "step-title", slide, "steps." + stepIndex + ".title"), field("p", "step-description", slide, "steps." + stepIndex + ".description"));
        sequence.append(step);
      });
      body.append(sequence);
    } else if (layout === "closing") {
      body.append(title(slide));
      optional(body, "p", "slide-subtitle", slide, "takeaway");
      optional(body, "p", "closing-action", slide, "action");
      if (safeUrl(slide.url)) {
        var link = field("a", "closing-url", slide, "url");
        link.href = safeUrl(slide.url);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        body.append(link);
      }
    }
    inner.append(body);
    var footer = element("footer", "slide-footer");
    footer.append(element("span", "slide-footer-label", deck.footer || deck.title), element("span", "slide-page", String(index + 1).padStart(2, "0")));
    inner.append(footer);
    article.append(inner);
    return article;
  }

  function render() {
    refreshValidation();
    geometryIssues = Object.create(null);
    state.index = Math.max(0, Math.min(deck.slides.length - 1, state.index));
    document.title = (deck.title || "발표 자료") + (isPresenter ? " — 발표자" : " — Stage");
    document.body.dataset.theme = state.theme;
    document.body.dataset.mode = state.mode;
    document.body.dataset.presenter = String(isPresenter);
    document.body.dataset.editing = String(state.editing);
    document.getElementById("themeSelect").value = state.theme;
    stage.replaceChildren();
    deck.slides.forEach(function (slide, index) { stage.append(renderSlide(slide, index, false)); });
    document.getElementById("workspace").hidden = isPresenter;
    document.getElementById("presenterWorkspace").hidden = !isPresenter;
    if (isPresenter) {
      document.querySelector(".app-header").hidden = true;
      document.querySelectorAll('[data-action="export"], [data-action="presenter"], [data-action="print"]').forEach(function (button) { button.hidden = true; });
    }
    updateActive(false);
    updateDiagnostics();
    requestAnimationFrame(scaleStages);
  }

  function updateActive(scroll) {
    Array.from(stage.children).forEach(function (slide, index) {
      var active = index === state.index;
      slide.classList.toggle("is-active", active);
      slide.hidden = state.mode === "present" && !active;
      slide.querySelectorAll("[data-field]").forEach(function (editable) {
        var enabled = state.editing && active && !isPresenter;
        editable.contentEditable = enabled ? "plaintext-only" : "false";
        editable.classList.toggle("editable", enabled);
        if (enabled) editable.setAttribute("spellcheck", "false");
      });
      if (!active) slide.querySelectorAll("video").forEach(function (video) { video.pause(); });
    });
    document.getElementById("slideCounter").textContent = String(state.index + 1).padStart(2, "0") + " / " + String(deck.slides.length).padStart(2, "0");
    document.getElementById("slideLabel").textContent = slideName(state.index);
    document.getElementById("slideProgress").style.width = ((state.index + 1) / deck.slides.length * 100) + "%";
    document.querySelectorAll('[data-action="previous"]').forEach(function (button) { button.disabled = state.index === 0; });
    document.querySelectorAll('[data-action="next"]').forEach(function (button) { button.disabled = state.index === deck.slides.length - 1; });
    document.getElementById("editBanner").hidden = !state.editing;
    document.getElementById("editButton").setAttribute("aria-pressed", String(state.editing));
    document.getElementById("editButton").textContent = state.editing ? "편집 마침" : "내용 편집";
    document.getElementById("modeButton").setAttribute("aria-pressed", String(state.mode === "read"));
    document.getElementById("modeButton").textContent = state.mode === "read" ? "발표 모드" : "읽기 모드";
    document.getElementById("announcer").textContent = (state.index + 1) + " / " + deck.slides.length + ", " + slideName(state.index);
    if (isPresenter) renderPresenter();
    if (scroll && state.mode === "read") stage.children[state.index].scrollIntoView({ behavior: motionPreference && motionPreference.matches ? "instant" : "smooth", block: "start" });
    scheduleDiagnostics();
  }

  function scaleStages() {
    [document.getElementById("stageViewport"), document.getElementById("presenterCurrent"), document.getElementById("presenterNext")].forEach(function (viewport) {
      var width = viewport.clientWidth;
      var height = viewport.clientHeight;
      if (width && height) viewport.style.setProperty("--stage-scale", String(Math.max(0.05, Math.min((width - 24) / 1600, (height - 24) / 900))));
    });
    scheduleDiagnostics();
  }

  function createDiagnostics() {
    if (isPresenter) return;
    var badge = element("button", "diagnostics-badge", "작성자 점검");
    badge.id = "diagnosticsBadge";
    badge.type = "button";
    badge.dataset.action = "diagnostics";
    badge.hidden = true;
    document.querySelector(".utility-controls").prepend(badge);
    var backdrop = element("div", "dialog-backdrop");
    backdrop.id = "diagnosticsDialog";
    backdrop.hidden = true;
    var dialog = element("section", "dialog dialog-diagnostics");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "diagnosticsTitle");
    var header = element("header", "dialog-header");
    var heading = element("div");
    heading.append(element("span", "dialog-eyebrow", "CONTENT CHECK"));
    var title = element("h2", "", "작성자 점검");
    title.id = "diagnosticsTitle";
    heading.append(title);
    var close = element("button", "", "닫기 ×");
    close.type = "button";
    close.dataset.action = "close";
    header.append(heading, close);
    var body = element("div", "dialog-body");
    var list = element("ul", "diagnostics-list");
    list.id = "diagnosticsList";
    var read = element("button", "button", "읽기 모드에서 전체 내용 보기");
    read.type = "button";
    read.dataset.action = "read-diagnostics";
    body.append(list, element("p", "diagnostics-guidance", "표시된 content.js 경로를 확인하세요. 긴 문장은 줄이거나 다음 장으로 나누고, 초과 항목은 별도 슬라이드로 옮기세요. 입력과 원본 데이터는 자동으로 삭제하지 않습니다."), read);
    dialog.append(header, body);
    backdrop.append(dialog);
    document.body.append(backdrop);
  }

  function allIssues() {
    var result = validationIssues.slice();
    Object.keys(geometryIssues).forEach(function (key) { result = result.concat(geometryIssues[key]); });
    return result;
  }

  function updateDiagnostics() {
    if (isPresenter) return;
    var badge = document.getElementById("diagnosticsBadge");
    if (!badge) return;
    var issues = allIssues();
    badge.hidden = issues.length === 0;
    badge.textContent = "작성자 점검 " + issues.length;
    badge.setAttribute("aria-label", issues.length + "개 입력 오류 또는 분량 경고 확인");
    var list = document.getElementById("diagnosticsList");
    list.replaceChildren();
    issues.forEach(function (issue) {
      var item = element("li", "diagnostic-item");
      item.dataset.severity = issue.severity;
      var location = issue.slideIndex === undefined ? "발표 설정" : (issue.slideIndex + 1) + "번 슬라이드";
      item.append(element("span", "diagnostic-severity", issue.severity === "error" ? "오류" : "경고"), element("code", "diagnostic-location", location + " · " + issue.path), element("p", "diagnostic-message", issue.message));
      list.append(item);
    });
  }

  function scheduleDiagnostics() {
    if (isPresenter) return;
    clearTimeout(diagnosticsTimer);
    diagnosticsTimer = setTimeout(measureActiveSlide, 220);
  }

  function measureActiveSlide() {
    if (isPresenter || state.mode !== "present") return;
    var slide = stage.children[state.index];
    if (!slide || slide.dataset.layout === "error") { updateDiagnostics(); return; }
    var body = slide.querySelector(".slide-body");
    if (!body) return;
    var slideBounds = slide.getBoundingClientRect();
    var bodyBounds = body.getBoundingClientRect();
    if (!slideBounds.width || !bodyBounds.width) return;
    var tolerance = Math.max(1, 6 * slideBounds.width / 1600);
    var issues = [];
    var seen = Object.create(null);
    function add(path, message) {
      if (seen[path]) return;
      seen[path] = true;
      issues.push({ severity: "warning", slideIndex: state.index, path: path, message: message });
    }
    function outside(bounds, container) {
      return bounds.left < container.left - tolerance || bounds.right > container.right + tolerance || bounds.top < container.top - tolerance || bounds.bottom > container.bottom + tolerance;
    }
    slide.querySelectorAll("[data-field]").forEach(function (field) {
      var bounds = field.getBoundingClientRect();
      var style = getComputedStyle(field);
      if (!bounds.width || !bounds.height || style.visibility === "hidden") return;
      var container = body.contains(field) ? bodyBounds : slideBounds;
      var tile = field.closest(".bento-item");
      if (tile) container = tile.getBoundingClientRect();
      var path = field.dataset.owner === "deck" ? "$." + field.dataset.field : "slides." + state.index + "." + field.dataset.field;
      var range = document.createRange();
      range.selectNodeContents(field);
      var textBounds = range.getBoundingClientRect();
      var clipping = ["hidden", "clip", "auto", "scroll"];
      var clipped = (clipping.indexOf(style.overflowY) >= 0 && field.clientHeight > 0 && field.scrollHeight > field.clientHeight + 6) || (clipping.indexOf(style.overflowX) >= 0 && field.clientWidth > 0 && field.scrollWidth > field.clientWidth + 6);
      if (outside(bounds, container) || (textBounds.width && outside(textBounds, container)) || clipped) add(path, "글자가 발표 영역을 벗어나거나 잘립니다. 문장을 줄이거나 슬라이드를 나누세요. 읽기 모드에서는 전체 내용을 확인할 수 있습니다.");
    });
    body.querySelectorAll(".media-frame").forEach(function (frame) {
      var bounds = frame.getBoundingClientRect();
      var path = "slides." + state.index + "." + (frame.dataset.mediaPath || "src");
      if (frame.dataset.mediaError) add(path, "미디어를 불러오지 못했습니다. 파일 경로를 확인하세요: " + frame.dataset.mediaError);
      else if (bounds.width <= 1 || bounds.height <= 1) add(path, "미디어 프레임의 크기가 0에 가깝습니다. 제목·설명을 줄이거나 항목을 다음 장으로 나누세요.");
      else if (outside(bounds, bodyBounds)) add(path, "미디어 프레임이 발표 영역을 벗어납니다. 항목이나 설명을 다음 장으로 나누세요.");
    });
    geometryIssues[state.index] = issues;
    updateDiagnostics();
  }

  function goTo(index, remote) {
    index = Math.max(0, Math.min(deck.slides.length - 1, index));
    if (isPresenter && !remote) {
      sendToAudience("navigate", { index: index });
      return;
    }
    state.index = index;
    if (!isPresenter) {
      try { history.replaceState(null, "", "#" + (index + 1)); } catch (_) { location.hash = String(index + 1); }
      revision = Date.now();
    }
    updateActive(true);
    syncPresenter();
  }

  function persist() {
    clearTimeout(saveTimer);
    if (isPresenter) return;
    refreshValidation();
    try {
      localStorage.setItem(storageKey, JSON.stringify({ sourceSignature: sourceSignature, deck: rawDeck, savedAt: new Date().toISOString() }));
      document.getElementById("saveStatus").textContent = "이 브라우저에 저장됨";
    } catch (_) {
      document.getElementById("saveStatus").textContent = "파일로 내보내 보관하세요";
    }
    revision = Date.now();
    updateDiagnostics();
    syncPresenter();
  }

  function toast(message) {
    clearTimeout(toastTimer);
    var box = document.getElementById("toast");
    box.textContent = message;
    box.hidden = false;
    toastTimer = setTimeout(function () { box.hidden = true; }, 6500);
  }

  function closeDialog() {
    if (!currentDialog) return;
    currentDialog.hidden = true;
    currentDialog = null;
    document.body.classList.remove("dialog-open");
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  }

  function openDialog(id) {
    closeDialog();
    returnFocus = document.activeElement;
    if (id === "overviewDialog") {
      var grid = document.getElementById("overviewGrid");
      grid.replaceChildren();
      deck.slides.forEach(function (slide, index) {
        var card = element("button", "overview-card" + (index === state.index ? " is-current" : ""));
        card.type = "button";
        card.dataset.slide = String(index);
        card.setAttribute("aria-label", (index + 1) + ". " + slideName(index));
        var thumb = element("div", "overview-thumb");
        thumb.setAttribute("aria-hidden", "true");
        var miniature = renderSlide(slide, index, true);
        miniature.classList.add("is-active");
        miniature.querySelectorAll("a,video,button").forEach(function (item) { item.tabIndex = -1; if (item.tagName === "VIDEO") item.controls = false; });
        thumb.append(miniature);
        card.append(thumb, element("span", "overview-label", String(index + 1).padStart(2, "0") + " / " + slideName(index)));
        grid.append(card);
      });
    }
    currentDialog = document.getElementById(id);
    currentDialog.hidden = false;
    document.body.classList.add("dialog-open");
    var focus = currentDialog.querySelector(".is-current") || currentDialog.querySelector("button") || currentDialog.querySelector(".dialog");
    focus.focus();
  }

  function toggleEdit() {
    state.editing = !state.editing;
    document.body.dataset.editing = String(state.editing);
    if (!state.editing) { persist(); render(); }
    else { updateActive(false); toast("글자를 클릭해 바꾸세요. 마치면 내용 내보내기로 파일을 보관할 수 있습니다."); }
  }

  function exportContent() {
    persist();
    var serialized;
    try { serialized = JSON.stringify(rawDeck, null, 2); } catch (_) { toast("원본을 JSON으로 내보낼 수 없습니다. 순환 참조 없이 저장할 수 있는 데이터인지 content.js를 확인하세요."); return; }
    var contents = "/* Stage 발표 원본 — 이 파일을 발표 폴더의 content.js와 교체하세요. */\nwindow.PRESENTATION = " + (serialized === undefined ? "undefined" : serialized) + ";\n";
    var objectUrl = URL.createObjectURL(new Blob([contents], { type: "text/javascript;charset=utf-8" }));
    var link = element("a");
    link.href = objectUrl;
    link.download = "content.js";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
    toast("content.js를 내려받았습니다. 발표 폴더의 같은 이름 파일과 교체하세요.");
  }

  function openPresenter() {
    if (isPresenter) return;
    if (presenterWindow && !presenterWindow.closed) { presenterWindow.focus(); syncPresenter(); return; }
    var url = new URL(location.href);
    url.searchParams.set("presenter", "1");
    url.searchParams.set("session", token);
    presenterWindow = window.open(url.href, "stage-presenter-" + token, "popup,width=1440,height=900");
    if (!presenterWindow) toast("발표자 창이 차단됐습니다. 이 페이지의 팝업을 허용한 뒤 다시 열어주세요.");
    else toast("발표자 창을 열었습니다. 청중에게는 원래 슬라이드 화면을 공유하세요.");
  }

  function post(target, kind, data) {
    if (!target || target.closed) return;
    var targetOrigin = location.protocol === "file:" ? "*" : location.origin;
    target.postMessage(Object.assign({ channel: "stage-kit", token: token, kind: kind }, data || {}), targetOrigin);
  }

  function sendToAudience(kind, data) {
    if (!window.opener || window.opener.closed) { toast("발표 화면과 연결이 끊겼습니다. 원래 화면에서 발표자 창을 다시 여세요."); return; }
    post(window.opener, kind, data);
  }

  function syncPresenter() {
    if (isPresenter || !presenterWindow || presenterWindow.closed) return;
    post(presenterWindow, "state", { deck: rawDeck, index: state.index, theme: state.theme, revision: revision, startedAt: startedAt });
  }

  function renderPresenter() {
    var current = document.getElementById("presenterCurrent");
    var next = document.getElementById("presenterNext");
    current.replaceChildren();
    next.replaceChildren();
    var currentStage = element("div", "slide-stage");
    var currentSlide = renderSlide(deck.slides[state.index], state.index, true);
    currentSlide.classList.add("is-active");
    currentStage.append(currentSlide);
    current.append(currentStage);
    if (state.index + 1 < deck.slides.length) {
      var nextStage = element("div", "slide-stage");
      var nextSlide = renderSlide(deck.slides[state.index + 1], state.index + 1, true);
      nextSlide.classList.add("is-active");
      nextStage.append(nextSlide);
      next.append(nextStage);
    } else next.append(element("p", "presenter-end", "마지막 슬라이드입니다."));
    document.getElementById("presenterNotes").textContent = (record(deck.slides[state.index]) && typeof deck.slides[state.index].notes === "string" && deck.slides[state.index].notes) || "이 슬라이드에는 노트가 없습니다. content.js의 notes에 메모를 넣으세요.";
    document.getElementById("presenterPosition").textContent = (state.index + 1) + " / " + deck.slides.length;
    requestAnimationFrame(scaleStages);
  }

  window.addEventListener("message", function (event) {
    var message = event.data;
    if (!message || message.channel !== "stage-kit" || message.token !== token) return;
    if (location.protocol !== "file:" && event.origin !== location.origin) return;
    if (isPresenter) {
      if (event.source !== window.opener || message.kind !== "state") return;
      if (!owns(message, "deck")) return;
      var remoteIndex = Math.max(0, Number(message.index) || 0);
      var remoteTheme = themes.indexOf(message.theme) >= 0 ? message.theme : "stage";
      var changed = lastRemoteState !== message.revision || state.index !== remoteIndex || state.theme !== remoteTheme;
      if (changed) {
        rawDeck = clone(message.deck);
        refreshValidation();
        state.index = Math.min(deck.slides.length - 1, remoteIndex);
        state.theme = remoteTheme;
      }
      startedAt = Number(message.startedAt) || Date.now();
      lastRemoteState = message.revision;
      remoteConnected = true;
      lastRemoteSeen = Date.now();
      document.getElementById("presenterConnection").textContent = "발표 화면과 연결됨";
      if (changed) render();
    } else {
      if (message.kind === "hello" && (!presenterWindow || presenterWindow.closed)) presenterWindow = event.source;
      if (event.source !== presenterWindow) return;
      if (message.kind === "hello") syncPresenter();
      if (message.kind === "navigate" && Number.isInteger(message.index)) goTo(message.index, true);
      if (message.kind === "timer") { startedAt = Date.now(); syncPresenter(); }
    }
  });

  document.addEventListener("click", function (event) {
    var card = event.target.closest("[data-slide]");
    if (card && currentDialog) { goTo(Number(card.dataset.slide)); closeDialog(); return; }
    if (currentDialog && event.target === currentDialog) { closeDialog(); return; }
    if (state.editing && event.target.closest("[contenteditable=plaintext-only], [contenteditable=true]")) { if (event.target.closest("a")) event.preventDefault(); return; }
    var button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    var action = button.dataset.action;
    if (action === "previous") goTo(state.index - 1);
    if (action === "next") goTo(state.index + 1);
    if (action === "overview") openDialog("overviewDialog");
    if (action === "diagnostics") openDialog("diagnosticsDialog");
    if (action === "read-diagnostics") {
      state.mode = "read";
      document.body.dataset.mode = state.mode;
      closeDialog();
      updateActive(true);
    }
    if (action === "help") openDialog("helpDialog");
    if (action === "close") closeDialog();
    if (action === "presenter") openPresenter();
    if (action === "edit") toggleEdit();
    if (action === "export") exportContent();
    if (action === "mode") { state.mode = state.mode === "present" ? "read" : "present"; document.body.dataset.mode = state.mode; updateActive(false); requestAnimationFrame(scaleStages); }
    if (action === "fullscreen") {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () { toast("전체 화면을 사용할 수 없습니다. 브라우저의 전체 화면 메뉴를 사용하세요."); });
      else toast("브라우저의 전체 화면 메뉴를 사용하세요.");
    }
    if (action === "print") { if (state.editing) toggleEdit(); window.print(); }
    if (action === "timer") { if (isPresenter) sendToAudience("timer"); else startedAt = Date.now(); }
    if (action === "reset" && window.confirm("이 폴더의 브라우저 편집 내용을 지우고 content.js 원본으로 돌아갈까요?")) {
      clearTimeout(saveTimer);
      try { localStorage.removeItem(storageKey); } catch (_) { /* Optional storage. */ }
      rawDeck = clone(original);
      refreshValidation();
      state.theme = themes.indexOf(deck.theme) >= 0 ? deck.theme : "stage";
      state.index = Math.min(state.index, deck.slides.length - 1);
      state.editing = false;
      revision = Date.now();
      closeDialog();
      render();
      syncPresenter();
      document.getElementById("saveStatus").textContent = "원본 템플릿";
      toast("content.js 원본으로 돌아왔습니다.");
    }
  });

  document.getElementById("themeSelect").addEventListener("change", function (event) {
    state.theme = event.target.value;
    deck.theme = state.theme;
    render();
    persist();
  });

  stage.addEventListener("input", function (event) {
    var target = event.target.closest("[data-field]");
    if (!state.editing || !target) return;
    var article = target.closest(".slide");
    var object = target.dataset.owner === "deck" ? deck : deck.slides[Number(article.dataset.index)];
    var path = target.dataset.field;
    var previousValue = valueAt(object, path);
    var nextValue = target.innerText.replace(/\r/g, "").replace(/\n$/, "");
    if (/^title(?:\.\d+)?$/.test(path) && typeof object.highlight === "string" && previousValue === object.highlight) {
      object.highlight = nextValue;
    }
    setAt(object, path, nextValue);
    scheduleDiagnostics();
    document.getElementById("saveStatus").textContent = "저장 중…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 250);
  });

  document.addEventListener("keydown", function (event) {
    // Native media controls own arrows, Home/End, Space, and other shortcuts.
    if (event.target.closest("video, audio")) return;
    var editing = event.target.closest("[contenteditable=plaintext-only], [contenteditable=true], input, textarea, select");
    if (editing) {
      if (event.key === "Escape" && state.editing) { event.preventDefault(); toggleEdit(); document.getElementById("editButton").focus(); }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (currentDialog) {
      if (event.key === "Escape") { event.preventDefault(); closeDialog(); }
      if (event.key === "Tab") {
        var focusable = Array.from(currentDialog.querySelectorAll("button,a[href],input,select,[tabindex='0']")).filter(function (item) { return !item.hidden && !item.disabled; });
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (currentDialog.id === "overviewDialog" && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(event.key) >= 0) {
        event.preventDefault();
        var cards = Array.from(currentDialog.querySelectorAll(".overview-card"));
        var position = cards.indexOf(document.activeElement);
        var delta = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
        cards[Math.max(0, Math.min(cards.length - 1, position + delta))].focus();
      }
      return;
    }
    if (["ArrowRight", "ArrowDown", "PageDown", " "].indexOf(event.key) >= 0) {
      if (event.key === " " && event.target.closest("button,a,video")) return;
      event.preventDefault(); goTo(state.index + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].indexOf(event.key) >= 0) { event.preventDefault(); goTo(state.index - 1); }
    else if (event.key === "Home") { event.preventDefault(); goTo(0); }
    else if (event.key === "End") { event.preventDefault(); goTo(deck.slides.length - 1); }
    else if (event.key.toLowerCase() === "o") openDialog("overviewDialog");
    else if (event.key.toLowerCase() === "p" && !isPresenter) openPresenter();
    else if (event.key.toLowerCase() === "f") document.querySelector('[data-action="fullscreen"]').click();
    else if (event.key === "?") openDialog("helpDialog");
    else if (event.key === "Escape" && state.editing) toggleEdit();
  });

  window.addEventListener("hashchange", function () {
    if (!isPresenter) goTo((parseInt(location.hash.slice(1), 10) || 1) - 1);
  });
  window.addEventListener("resize", scaleStages);
  function onMotionPreferenceChange(event) {
    if (event.matches && state.mode === "read") {
      // Complete a pending smooth navigation immediately when the preference changes.
      stage.children[state.index].scrollIntoView({ behavior: "instant", block: "start" });
    }
  }
  if (motionPreference) {
    if (typeof motionPreference.addEventListener === "function") motionPreference.addEventListener("change", onMotionPreferenceChange);
    else if (typeof motionPreference.addListener === "function") motionPreference.addListener(onMotionPreferenceChange);
  }
  window.addEventListener("beforeunload", function () { if (saveTimer) persist(); });
  document.addEventListener("fullscreenchange", scaleStages);
  if (window.ResizeObserver) {
    var resizeObserver = new ResizeObserver(scaleStages);
    ["stageViewport", "presenterCurrent", "presenterNext"].forEach(function (id) { resizeObserver.observe(document.getElementById(id)); });
  }
  setInterval(function () {
    var elapsed = Math.floor((Date.now() - startedAt) / 1000);
    document.getElementById("presenterTimer").textContent = String(Math.floor(elapsed / 60)).padStart(2, "0") + ":" + String(elapsed % 60).padStart(2, "0");
    if (isPresenter && (!window.opener || window.opener.closed)) document.getElementById("presenterConnection").textContent = "발표 화면 연결이 끊겼습니다.";
  }, 1000);
  if (isPresenter) {
    setInterval(function () {
      if (window.opener && !window.opener.closed) sendToAudience("hello", { revision: lastRemoteState });
      if (remoteConnected && Date.now() - lastRemoteSeen > 6000) document.getElementById("presenterConnection").textContent = "발표 화면을 다시 연결하는 중…";
    }, 2000);
    sendToAudience("hello", { revision: null });
  }
  document.getElementById("saveStatus").textContent = restored ? "저장한 편집 내용" : "원본 템플릿";
  createDiagnostics();
  render();
})();
