/* Semantic Markdown rendering; parsing happens at build time. */
(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.StageBlocks = api;
})(typeof window !== "undefined" ? window : null, function () {
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
  return { renderNode: renderNode, renderNodes: renderNodes, safeUrl: safeUrl };
});
