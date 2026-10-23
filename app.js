/* No build step, network requests, or third-party runtime. */
(function () {
  "use strict";

  var original = window.PRESENTATION;
  var stage = document.getElementById("slideStage");
  if (!original || !Array.isArray(original.slides) || !original.slides.length) {
    stage.textContent = "content.js에 슬라이드가 없습니다. window.PRESENTATION.slides를 확인하세요.";
    return;
  }
  var clone = function (value) { return JSON.parse(JSON.stringify(value)); };
  var params = new URLSearchParams(location.search);
  var isPresenter = params.get("presenter") === "1";
  var themes = ["stage", "paper", "midnight"];
  var names = { cover: "표지", statement: "큰 문장", section: "섹션", compare: "비교", metric: "숫자", image: "이미지", demo: "데모", quote: "인용", steps: "단계", closing: "마무리", chart: "메시지와 차트", media: "전체 화면 시연", gallery: "이미지 갤러리", mosaic: "이미지 모자이크", results: "메시지와 결과", categories: "분류와 역할" };
  var tones = ["orange", "purple", "blue", "green", "yellow"];
  var storageKey = "stage-kit:v1:" + String(original.id || "deck") + ":" + location.pathname;
  var sourceSignature = JSON.stringify(original);
  var deck = clone(original);
  var restored = false;
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved && saved.sourceSignature === sourceSignature && saved.deck && Array.isArray(saved.deck.slides) && saved.deck.slides.length) {
      deck = saved.deck;
      restored = true;
    }
  } catch (_) { /* Local storage can be unavailable for local files. */ }
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

  function element(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
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

  function media(slide, preview) {
    var wrap = element("div", "media-frame");
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
      item.addEventListener("error", function () {
        item.hidden = true;
        var fallback = element("div", "image-placeholder");
        fallback.append(element("span", "placeholder-symbol", "↗"), element("p", "placeholder-title", "미디어를 찾을 수 없습니다."), element("span", "placeholder-path", String(src)), element("small", "placeholder-hint", "content.js의 파일 경로를 확인하세요."));
        wrap.append(fallback);
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
    var path = "items." + index + ".";
    if (kind === "mosaic") figure.dataset.span = Number(item.span) === 2 ? "2" : "1";
    optional(figure, "div", kind + "-label media-item-label", slide, path + "label");
    figure.append(media(item, preview));
    optional(figure, "figcaption", kind + "-caption media-item-caption", slide, path + "caption");
    return figure;
  }

  function renderSlide(slide, index, preview) {
    var layout = names[slide.layout] ? slide.layout : "statement";
    var article = element("article", "slide layout-" + layout);
    article.dataset.layout = layout;
    article.dataset.index = String(index);
    article.dataset.theme = slide.theme || state.theme;
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
        slide.items.forEach(function (_, itemIndex) { mediaGrid.append(mediaItem(slide, itemIndex, layout, preview)); });
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
          if (["blue", "green", "orange", "purple"].indexOf(item.tone) >= 0) category.dataset.tone = item.tone;
          var icon = element("div", "category-icon");
          var symbol = field("span", "category-symbol", slide, "items." + itemIndex + ".symbol");
          symbol.setAttribute("aria-hidden", "true");
          icon.append(symbol);
          category.append(icon, field("h2", "category-label", slide, "items." + itemIndex + ".label"));
          optional(category, "p", "category-description", slide, "items." + itemIndex + ".description");
          categoryGrid.append(category);
        });
      }
      body.append(categoryGrid);
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
    document.title = deck.title + (isPresenter ? " — 발표자" : " — Stage");
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
    document.getElementById("slideLabel").textContent = names[deck.slides[state.index].layout] || "슬라이드";
    document.getElementById("slideProgress").style.width = ((state.index + 1) / deck.slides.length * 100) + "%";
    document.querySelectorAll('[data-action="previous"]').forEach(function (button) { button.disabled = state.index === 0; });
    document.querySelectorAll('[data-action="next"]').forEach(function (button) { button.disabled = state.index === deck.slides.length - 1; });
    document.getElementById("editBanner").hidden = !state.editing;
    document.getElementById("editButton").setAttribute("aria-pressed", String(state.editing));
    document.getElementById("editButton").textContent = state.editing ? "편집 마침" : "내용 편집";
    document.getElementById("modeButton").setAttribute("aria-pressed", String(state.mode === "read"));
    document.getElementById("modeButton").textContent = state.mode === "read" ? "발표 모드" : "읽기 모드";
    document.getElementById("announcer").textContent = (state.index + 1) + " / " + deck.slides.length + ", " + (names[deck.slides[state.index].layout] || "슬라이드");
    if (isPresenter) renderPresenter();
    if (scroll && state.mode === "read") stage.children[state.index].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scaleStages() {
    [document.getElementById("stageViewport"), document.getElementById("presenterCurrent"), document.getElementById("presenterNext")].forEach(function (viewport) {
      var width = viewport.clientWidth;
      var height = viewport.clientHeight;
      if (width && height) viewport.style.setProperty("--stage-scale", String(Math.max(0.05, Math.min((width - 24) / 1600, (height - 24) / 900))));
    });
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
    try {
      localStorage.setItem(storageKey, JSON.stringify({ sourceSignature: sourceSignature, deck: deck, savedAt: new Date().toISOString() }));
      document.getElementById("saveStatus").textContent = "이 브라우저에 저장됨";
    } catch (_) {
      document.getElementById("saveStatus").textContent = "파일로 내보내 보관하세요";
    }
    revision = Date.now();
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
        card.setAttribute("aria-label", (index + 1) + ". " + names[slide.layout]);
        var thumb = element("div", "overview-thumb");
        thumb.setAttribute("aria-hidden", "true");
        var miniature = renderSlide(slide, index, true);
        miniature.classList.add("is-active");
        miniature.querySelectorAll("a,video,button").forEach(function (item) { item.tabIndex = -1; if (item.tagName === "VIDEO") item.controls = false; });
        thumb.append(miniature);
        card.append(thumb, element("span", "overview-label", String(index + 1).padStart(2, "0") + " / " + names[slide.layout]));
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
    var contents = "/* Stage 발표 원본 — 이 파일을 발표 폴더의 content.js와 교체하세요. */\nwindow.PRESENTATION = " + JSON.stringify(deck, null, 2) + ";\n";
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
    post(presenterWindow, "state", { deck: deck, index: state.index, theme: state.theme, revision: revision, startedAt: startedAt });
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
    if (deck.slides[state.index + 1]) {
      var nextStage = element("div", "slide-stage");
      var nextSlide = renderSlide(deck.slides[state.index + 1], state.index + 1, true);
      nextSlide.classList.add("is-active");
      nextStage.append(nextSlide);
      next.append(nextStage);
    } else next.append(element("p", "presenter-end", "마지막 슬라이드입니다."));
    document.getElementById("presenterNotes").textContent = deck.slides[state.index].notes || "이 슬라이드에는 노트가 없습니다. content.js의 notes에 메모를 넣으세요.";
    document.getElementById("presenterPosition").textContent = (state.index + 1) + " / " + deck.slides.length;
    requestAnimationFrame(scaleStages);
  }

  window.addEventListener("message", function (event) {
    var message = event.data;
    if (!message || message.channel !== "stage-kit" || message.token !== token) return;
    if (location.protocol !== "file:" && event.origin !== location.origin) return;
    if (isPresenter) {
      if (event.source !== window.opener || message.kind !== "state") return;
      if (!message.deck || !Array.isArray(message.deck.slides) || !message.deck.slides.length) return;
      var remoteIndex = Math.max(0, Math.min(message.deck.slides.length - 1, Number(message.index) || 0));
      var remoteTheme = themes.indexOf(message.theme) >= 0 ? message.theme : "stage";
      var changed = lastRemoteState !== message.revision || state.index !== remoteIndex || state.theme !== remoteTheme;
      if (changed) {
        deck = clone(message.deck);
        state.index = remoteIndex;
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
      deck = clone(original);
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
  render();
})();
