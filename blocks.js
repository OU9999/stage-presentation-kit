/* Semantic Markdown rendering; parsing happens at build time. */
(function (root, factory) {
  "use strict";
  var api = factory(typeof module === "object" && module.exports ? require("./deck-model.js") : root && root.STAGE_MODEL);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.StageBlocks = api;
})(typeof window !== "undefined" ? window : null, function (model) {
  "use strict";
  var tags = "p h1 h2 h3 h4 h5 h6 ul ol li blockquote pre code table thead tbody tr th td strong em s a img br hr".split(" ");
  var blockTags = "p h1 h2 h3 h4 h5 h6 ul ol li blockquote pre table hr".split(" ");
  function safeUrl(value, image) {
    if (typeof value !== "string" || /[\u0000-\u0020\u007f]/.test(value)) return false;
    var scheme = /^([a-z][a-z0-9+.-]*):/i.exec(value);
    return !scheme || /^(https?)$/i.test(scheme[1]) || (!image && /^mailto$/i.test(scheme[1])) || (image && /^data:image\/(?:png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(value));
  }
  function renderNode(node, options, depth) {
    options = options || {};
    depth = depth || 0;
    if (!node || depth > 64) throw new Error("잘못된 Markdown 노드입니다.");
    if (node.type === "text" && typeof node.value === "string") return document.createTextNode(node.value);
    if (node.type !== "element" || tags.indexOf(node.tag) < 0 || !Array.isArray(node.children)) throw new Error("지원하지 않는 Markdown 노드입니다.");
    var el = document.createElement(options.preview && node.tag === "a" ? "span" : node.tag);
    if (blockTags.indexOf(node.tag) >= 0) el.classList.add("block-node");
    if (node.position) {
      el.dataset.sourceLine = String(node.position.line);
      el.dataset.sourceEndLine = String(node.position.endLine);
    }
    var attrs = node.attrs || {};
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];
      if (key === "href" && node.tag === "a" && !options.preview && safeUrl(value, false)) el.setAttribute("href", value);
      else if (key === "src" && node.tag === "img" && safeUrl(value, true)) el.setAttribute("src", value);
      else if ((key === "alt" && node.tag === "img") || key === "title") el.setAttribute(key, String(value));
      else if (key === "start" && node.tag === "ol" && Number.isInteger(Number(value))) el.setAttribute(key, String(value));
      else if (key === "align" && /^(th|td)$/.test(node.tag) && /^(left|center|right)$/.test(value)) el.style.textAlign = value;
      else if (key === "class" && node.tag === "code" && /^language-[a-z0-9_+-]+$/i.test(value)) el.classList.add(value);
    });
    node.children.forEach(function (child) { el.append(renderNode(child, options, depth + 1)); });
    if (node.tag === "img") {
      if (options.onMediaChange) el.addEventListener("load", options.onMediaChange);
      el.addEventListener("error", function () {
        el.dataset.mediaError = attrs.src || "이미지 경로 없음";
        el.classList.add("blocks-image-error");
        if (options.onMediaChange) options.onMediaChange();
      });
    }
    if (node.tag === "pre" || node.tag === "table") {
      var scroll = document.createElement("div");
      scroll.className = "blocks-scroll block-node";
      scroll.tabIndex = options.preview ? -1 : 0;
      scroll.setAttribute("role", "region");
      scroll.setAttribute("aria-label", node.tag === "pre" ? "코드 · 방향키로 스크롤" : "표 · 방향키로 스크롤");
      if (node.position) scroll.dataset.sourceLine = String(node.position.line);
      scroll.append(el);
      return scroll;
    }
    return el;
  }
  function renderNodes(nodes, options) {
    var fragment = document.createDocumentFragment();
    nodes.forEach(function (node) { fragment.append(renderNode(node, options)); });
    return fragment;
  }

  function isElement(node, tag) { return !!node && node.type === "element" && (!tag || node.tag === tag); }
  function nodeText(node) {
    if (!node) return "";
    return node.type === "text" ? node.value : (node.children || []).map(nodeText).join("");
  }
  function contains(node, tag) { return isElement(node, tag) || (node.children || []).some(function (child) { return contains(child, tag); }); }
  function pureImages(node) {
    if (isElement(node, "img")) return [node];
    if (!isElement(node, "p")) return [];
    var meaningful = node.children.filter(function (child) { return child.type !== "text" || child.value.trim(); });
    // Linked images and mixed inline paragraphs stay semantic paragraphs, never discard the wrapper/link.
    return meaningful.length > 0 && meaningful.every(function (child) { return isElement(child, "img"); }) ? meaningful : [];
  }
  function copyNode(node) {
    return ["p", "ul", "ol"].indexOf(node.tag) >= 0 && !contains(node, "img");
  }
  function paragraph(node) { return isElement(node, "p") && !contains(node, "img"); }
  function groupsFor(slide) {
    var starts = [];
    slide.blocks.forEach(function (node, index) { if (isElement(node, "h2")) starts.push(index); });
    return starts.map(function (start, index) {
      var end = starts[index + 1] === undefined ? slide.blocks.length : starts[index + 1];
      var setting = ((slide.view && slide.view.groups) || []).find(function (group) { return group.start === start && group.end === end; });
      return Object.assign({ start: start, end: end }, setting || {});
    });
  }

  function customIcon(item) {
    var children = item.children || [];
    var first = children.find(function (node) { return node.type !== "text" || node.value.trim(); });
    var candidate = isElement(first, "p") ? first.children.find(function (node) { return node.type !== "text" || node.value.trim(); }) : first;
    if (!isElement(candidate, "img")) return null;
    var imageCount = 0;
    function count(node) { if (isElement(node, "img")) imageCount++; (node.children || []).forEach(count); }
    count(item);
    return imageCount === 1 ? candidate : null;
  }
  function wallShape(nodes, view) {
    var index = nodes.findIndex(function (node) { return isElement(node, "ul") || isElement(node, "ol"); });
    // Ordered walls would hide authored numbering with the perimeter CSS: retain the full document instead.
    if (index < 0 || !isElement(nodes[index], "ul") || index !== nodes.length - 1 || !nodes.slice(0, index).every(paragraph)) return null;
    var list = nodes[index], items = list.children;
    if (!items.length || !items.every(function (item) { return isElement(item, "li"); })) return null;
    if (view.icons) {
      if (view.icons.length !== items.length || items.some(function (item) { return contains(item, "img"); })) return null;
      return { list: list, before: nodes.slice(0, index), custom: false };
    }
    if (!items.every(customIcon)) return null;
    return { list: list, before: nodes.slice(0, index), custom: true };
  }
  function tileKind(nodes) {
    if (nodes.length === 1 && pureImages(nodes[0]).length === 1) return "image";
    if (nodes.some(valueParts) && nodes.every(paragraph)) return "value";
    if (nodes.length === 1 && isElement(nodes[0], "blockquote")) return "quote";
    if (nodes.length === 1 && (isElement(nodes[0], "ul") || isElement(nodes[0], "ol"))) return "list";
    if (nodes.length && nodes.every(paragraph)) return "text";
    return "mixed";
  }
  function gridStyle(element, geometry) {
    element.style.setProperty("--md-columns", String(geometry.columns));
    element.style.setProperty("--md-rows", String(geometry.rows));
  }
  function slotStyle(element, slot) {
    element.style.setProperty("--md-column", String(slot.column));
    element.style.setProperty("--md-row", String(slot.row));
    element.style.setProperty("--md-col-span", String(slot.columnSpan || 1));
    element.style.setProperty("--md-row-span", String(slot.rowSpan || 1));
  }
  function iconSvg(name, className) {
    name = model && model.normalizeIcon(name);
    if (!model || !Object.prototype.hasOwnProperty.call(model.iconPaths, name)) return null;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS ? document.createElementNS(ns, "svg") : document.createElement("svg");
    var path = document.createElementNS ? document.createElementNS(ns, "path") : document.createElement("path");
    svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor"); svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round"); svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    path.setAttribute("d", model.iconPaths[name]); svg.append(path); return svg;
  }
  // Structure-only composition planning. It never changes source nodes, calculates results or reads layout.
  function planSlide(slide, options) {
    options = options || {};
    if (!slide || slide.layout !== "blocks" || !Array.isArray(slide.blocks)) throw new Error("Markdown 장의 blocks 배열이 필요합니다.");
    var nodes = slide.blocks, view = slide.view || {}, requested = view.compose || "auto";
    var groups = groupsFor(slide);
    var images = [];
    var cursor = 0;
    while (cursor < nodes.length && pureImages(nodes[cursor]).length) {
      pureImages(nodes[cursor]).forEach(function (image) { images.push({ block: cursor, node: image }); });
      cursor += 1;
    }
    var trailing = nodes.slice(cursor);
    var plainHeading = nodeText(slide.heading);
    var bodyLength = nodes.map(nodeText).join("").length;
    var shortText = !!slide.heading && plainHeading.length <= 52 && nodes.every(paragraph) && bodyLength <= 200;
    var imageTail = trailing.every(paragraph) && trailing.map(nodeText).join("").length <= 240;
    var split = images.length === 1 && trailing.length > 0 && trailing.every(copyNode) && trailing.map(nodeText).join("").length <= 380;
    var quote = nodes.length > 0 && isElement(nodes[0], "blockquote") && nodeText(nodes[0]).length <= 220 && nodes.slice(1).every(paragraph) && nodes.slice(1).map(nodeText).join("").length <= 200;
    var suitability = {
      document: true,
      message: shortText,
      closing: shortText,
      quote: quote,
      media: images.length === 1 && imageTail,
      split: split,
      gallery: images.length >= 2 && images.length <= 6 && imageTail,
      mosaic: images.length >= 2 && images.length <= 6 && imageTail,
      editorial: groups.length > 0,
      bento: groups.length > 0 && groups[0].start === 0,
      "icon-wall": !!wallShape(nodes, view)
    };
    var composition = requested;
    var warnings = [];
    if (requested === "auto") {
      if (quote) composition = "quote";
      else if (suitability.gallery) composition = "gallery";
      else if (split && trailing.some(function (node) { return node.tag === "ul" || node.tag === "ol"; })) composition = "split";
      else if (suitability.media) composition = "media";
      else if (split) composition = "split";
      else if (shortText) composition = "message";
      else composition = "document";
    } else if (!suitability[requested]) {
      composition = "document";
      warnings.push({ message: "선택한 " + requested + " 구도에 맞지 않는 원고 형태입니다. 내용을 모두 유지한 기본 문서로 표시합니다.", line: slide.origin && slide.origin.line || 1, path: options.sourcePath || "" });
    }
    var geometry = null, variant = view.variant || (composition === "bento" ? "balanced" : "");
    var variants = { portraits: "gallery", strip: "gallery", staggered: "mosaic", balanced: "bento", seoul: "bento", recap: "bento" };
    function fallback(message) {
      composition = "document";
      warnings.push({ message: message + " 내용을 모두 유지한 기본 문서로 표시합니다.", line: slide.origin && slide.origin.line || 1, path: options.sourcePath || "" });
    }
    if (view.icons && composition !== "icon-wall") fallback("icons 배열은 icon-wall의 원래 목록에만 연결할 수 있습니다.");
    if (groups.some(function (group) { return group.icon; }) && composition !== "bento") fallback("그룹 icon은 bento 타일에서만 표시할 수 있습니다.");
    if (view.variant && variants[view.variant] !== composition) fallback("선택한 variant가 이 구도/원고와 맞지 않습니다.");
    if (composition === "mosaic" && variant === "staggered") {
      var positions = images.length === 6 && model && model.packMosaic([2, 1, 1, 1, 1, 2].map(function (span) { return { span: span }; }));
      if (!positions) fallback("staggered는 원순서 사진 6개가 필요합니다.");
      else geometry = { columns: 4, rows: 2, slots: positions.map(function (slot) { return { column: slot.column, row: slot.row, columnSpan: slot.span, rowSpan: 1 }; }) };
    }
    if (composition === "bento") {
      geometry = model && model.planBento(groups.length, { variant: variant, primaryIndex: groups.findIndex(function (group) { return group.primary; }) });
      if (!geometry) fallback("선택한 bento preset과 H2 자료 수가 맞지 않습니다.");
    }
    var wall = composition === "icon-wall" && wallShape(nodes, view);
    if (wall) {
      geometry = model && model.planIconWall(wall.list.children.length);
      if (!geometry) fallback("icon-wall 자료 수가 지원 범위를 벗어납니다.");
    }
    if (composition !== "bento" && composition !== "icon-wall" && !(composition === "mosaic" && variant === "staggered")) geometry = null;
    var mediaFallback = false;
    if (Array.isArray(view.focus) && (["gallery", "mosaic"].indexOf(composition) < 0 || view.focus.length !== images.length)) {
      composition = "document"; mediaFallback = true;
      warnings.push({ message: "사진별 focus 배열은 gallery/mosaic의 원순서 사진 수와 같아야 합니다. 사진 전체를 보존한 기본 문서로 표시합니다.", line: slide.origin && slide.origin.line || 1, path: options.sourcePath || "" });
    }
    if (composition === "document") { variant = ""; geometry = null; }
    return { variant: variant, geometry: geometry, wall: wall, composition: composition, requested: requested, quiet: ["message", "quote", "closing"].indexOf(composition) >= 0, images: images, mediaEnd: cursor, groups: groups, mediaFallback: mediaFallback, warnings: warnings };
  }

  function safeFocus(value) {
    if (typeof value !== "string" || !/^\d+(?:\.\d+)?%[ \t]+\d+(?:\.\d+)?%$/.test(value)) return false;
    return value.split(/[ \t]+/).every(function (part) { var number = parseFloat(part); return number >= 0 && number <= 100; });
  }
  function sourcePosition(element, node) {
    if (node && node.position) { element.dataset.sourceLine = String(node.position.line); element.dataset.sourceEndLine = String(node.position.endLine); }
  }
  function figureFor(node, options, mediaOptions, image) {
    image = image || pureImages(node)[0];
    var figure = document.createElement("figure");
    figure.className = "md-media block-node";
    figure.dataset.fit = mediaOptions.fit === "cover" ? "cover" : "contain";
    sourcePosition(figure, node);
    var rendered = renderNode(image, options);
    if (safeFocus(mediaOptions.focus)) rendered.style.objectPosition = mediaOptions.focus.replace(/[ \t]+/g, " ");
    figure.append(rendered);
    if (image.attrs && image.attrs.title) {
      var caption = document.createElement("figcaption");
      caption.textContent = image.attrs.title;
      sourcePosition(caption, image);
      figure.append(caption);
    }
    return figure;
  }
  function valueParts(node) {
    if (!isElement(node, "p")) return null;
    var children = node.children;
    var first = children.findIndex(function (child) { return child.type !== "text" || child.value.trim(); });
    if (first < 0 || !isElement(children[first], "strong") || !children[first].children.every(function (child) { return child.type === "text"; })) return null;
    if (!children.slice(first + 1).every(function (child) { return child.type === "text"; })) return null;
    var number = nodeText(children[first]);
    var unit = children.slice(first + 1).map(nodeText).join("");
    if (number.length > 18 || !/^[-+−]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(number) || !/^[ \t]*[^\s.,!?;:]{1,12}[ \t]*$/.test(unit)) return null;
    return { first: first, number: children[first], unit: unit };
  }
  function renderValue(node, options) {
    var parts = valueParts(node);
    if (!parts) return null;
    var p = document.createElement("p"); p.className = "md-value block-node"; sourcePosition(p, node);
    node.children.slice(0, parts.first).forEach(function (child) { p.append(renderNode(child, options)); });
    var number = renderNode(parts.number, options); number.classList.add("md-value-number"); p.append(number);
    var unit = document.createElement("span"); unit.className = "md-value-unit"; unit.textContent = parts.unit; p.append(unit);
    return p;
  }
  function renderSlide(slide, options) {
    options = options || {};
    var plan = planSlide(slide, options), view = slide.view || {};
    var defaultMedia = plan.mediaFallback ? { fit: "contain" } : view;
    var root = document.createElement("div"); root.className = "markdown-composition";
    if (plan.warnings.length) {
      root.dataset.compositionWarning = plan.warnings.map(function (warning) { return warning.message; }).join("\n");
      root.dataset.sourceLine = String(plan.warnings[0].line);
    }
    if (slide.heading && plan.composition !== "icon-wall") {
      var heading = renderNode(slide.heading, options); heading.classList.add("slide-title"); heading.classList.add("md-heading"); root.append(heading);
    }
    var body = document.createElement("div"); body.className = "markdown-body"; root.append(body);
    if (plan.composition === "editorial") body.dataset.groupCount = String(plan.groups.length);
    function appendNode(parent, node, setting, value) {
      var images = pureImages(node);
      if (images.length) images.forEach(function (image) { parent.append(figureFor(node, options, setting, image)); });
      else parent.append(value && renderValue(node, options) || renderNode(node, options));
    }
    if (plan.composition === "gallery" || plan.composition === "mosaic") {
      var grid = document.createElement("div"); grid.className = "md-grid"; body.append(grid);
      if (plan.variant === "portraits" || plan.variant === "strip") gridStyle(grid, { columns: plan.images.length, rows: 1 });
      if (plan.geometry) gridStyle(grid, plan.geometry);
      plan.images.forEach(function (image, index) {
        var settings = { fit: view.fit, focus: Array.isArray(view.focus) ? view.focus[index] : view.focus };
        var figure = figureFor(slide.blocks[image.block], options, settings, image.node);
        if (plan.geometry) slotStyle(figure, plan.geometry.slots[index]);
        grid.append(figure);
      });
      slide.blocks.slice(plan.mediaEnd).forEach(function (node) { appendNode(body, node, defaultMedia, false); });
    } else if (plan.composition === "icon-wall") {
      var wall = document.createElement("div"); wall.className = "md-wall"; gridStyle(wall, plan.geometry); body.append(wall);
      var copy = document.createElement("div"); copy.className = "md-wall-copy"; slotStyle(copy, plan.geometry.copy); wall.append(copy);
      if (slide.heading) { var wallHeading = renderNode(slide.heading, options); wallHeading.classList.add("slide-title", "md-heading"); copy.append(wallHeading); }
      plan.wall.before.forEach(function (node) { copy.append(renderNode(node, options)); });
      var list = document.createElement(plan.wall.list.tag); list.className = "md-wall-items"; sourcePosition(list, plan.wall.list); wall.append(list); gridStyle(list, plan.geometry);
      plan.wall.list.children.forEach(function (item, itemIndex) {
        var li = document.createElement("li"); li.className = "md-wall-item"; sourcePosition(li, item); slotStyle(li, plan.geometry.slots[itemIndex]); list.append(li);
        var icon = document.createElement("span"); icon.className = "md-wall-icon"; li.append(icon);
        var label = document.createElement("div"); label.className = "md-wall-label"; li.append(label);
        var image = plan.wall.custom && customIcon(item);
        if (image) icon.append(renderNode(image, options));
        else {
          var setting = view.icons[itemIndex], name = typeof setting === "string" ? setting : setting.icon;
          if (setting.tone) li.dataset.tone = setting.tone;
          var svg = iconSvg(name); if (svg) icon.append(svg);
        }
        item.children.forEach(function (node) {
          if (node === image) return;
          if (image && isElement(node, "p") && node.children.indexOf(image) >= 0) {
            var p = document.createElement("p"); sourcePosition(p, node);
            node.children.forEach(function (child) { if (child !== image) p.append(renderNode(child, options)); }); label.append(p);
          } else label.append(renderNode(node, options));
        });
        if (image && image.attrs && image.attrs.title) { var caption = document.createElement("span"); caption.className = "md-wall-caption"; caption.textContent = image.attrs.title; sourcePosition(caption, image); label.append(caption); }
      });
    } else if (plan.composition === "split") {
      body.append(figureFor(slide.blocks[0], options, defaultMedia));
      var copy = document.createElement("div"); copy.className = "md-copy"; body.append(copy);
      slide.blocks.slice(1).forEach(function (node) { appendNode(copy, node, defaultMedia, false); });
    } else {
      if (plan.composition === "bento") gridStyle(body, plan.geometry);
      var byStart = Object.create(null);
      plan.groups.forEach(function (group) { byStart[group.start] = group; });
      for (var index = 0; index < slide.blocks.length;) {
        var group = byStart[index];
        if (group) {
          var container = document.createElement("section"); container.className = "md-group";
          if (plan.composition === "bento") {
            container.classList.add("md-tile"); container.dataset.kind = tileKind(slide.blocks.slice(group.start + 1, group.end));
            slotStyle(container, plan.geometry.slots[plan.groups.indexOf(group)]);
          }
          if (group.primary) container.classList.add("is-primary");
          if (["blue", "orange", "purple", "green", "yellow", "neutral"].indexOf(group.tone) >= 0) container.dataset.tone = group.tone;
          sourcePosition(container, slide.blocks[index]); body.append(container);
          var mediaOptions = plan.mediaFallback ? defaultMedia : { fit: group.fit || view.fit, focus: group.focus || view.focus };
          slide.blocks.slice(group.start, group.end).forEach(function (node) { appendNode(container, node, mediaOptions, plan.composition === "editorial" || plan.composition === "bento"); });
          if (plan.composition === "bento" && group.icon) { var decoration = iconSvg(group.icon, "md-tile-icon"); if (decoration) container.append(decoration); }
          index = group.end;
        } else { appendNode(body, slide.blocks[index], defaultMedia, false); index += 1; }
      }
    }
    return { body: root, variant: plan.variant, composition: plan.composition, quiet: plan.quiet, warnings: plan.warnings };
  }
  return { renderNode: renderNode, renderNodes: renderNodes, renderSlide: renderSlide, planSlide: planSlide, safeUrl: safeUrl };
});
