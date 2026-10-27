"use strict";

// Optional repository upkeep. Direct decks run without this helper or Node.js.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const model = require("../deck-model.js");
const { generatedHtml } = require("./markdown-deck.cjs");
const defaultRoot = path.resolve(__dirname, "..");
const hash = value => crypto.createHash("sha256").update(value).digest("hex").slice(0, 12);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function readDirectDeck(directory) {
  const contentPath = path.join(path.resolve(directory), "content.js");
  const content = fs.readFileSync(contentPath, "utf8");
  const scope = { window: {} };
  vm.runInNewContext(content, scope, { filename: contentPath, timeout: 2000 });
  const original = scope.window.PRESENTATION;
  const issues = model.validateDeck(original);
  if (issues.some(issue => issue.severity === "error")) throw new Error("입력 검증 실패:\n" + issues.filter(issue => issue.severity === "error").map(issue => `${issue.path}: ${issue.message}`).join("\n"));
  const deck = JSON.parse(JSON.stringify(original));
  return { deck, content, contentPath, issues };
}

function dataHtml(directory, repoRoot, deck, content) {
  const ref = file => escape(path.relative(directory, path.join(repoRoot, file)).split(path.sep).join("/")) + "?v=" + hash(fs.readFileSync(path.join(repoRoot, file)));
  return `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="dark light"/><link rel="icon" href="data:,"/><title>${escape(deck.title || "발표")} — 같은 자료의 표</title><link rel="stylesheet" href="${ref("styles.css")}"/><link rel="stylesheet" href="${ref("visual.css")}"/><style>body.visual-data-page{max-width:1120px;margin:0 auto;padding:40px 24px 80px}h1{font-size:clamp(30px,5vw,48px);letter-spacing:-.04em}header{margin-bottom:40px}header p{color:var(--slide-muted);line-height:1.7}nav{display:flex;flex-wrap:wrap;gap:16px}a{color:var(--visual-blue);text-underline-offset:.25em}.visual-data-notes{white-space:pre-line}@media(max-width:600px){body.visual-data-page{padding:24px 18px}h1{font-size:30px}}</style><script src="content.js?v=${hash(content)}" defer></script><script src="${ref("deck-model.js")}" defer></script><script src="${ref("visual.js")}" defer></script></head><body class="visual-data-page" data-theme="stage"><header><nav><a href="index.html">발표로 돌아가기</a><a href="content.js">직접 수정할 content.js</a><a href="README.md">작성 안내</a></nav><h1 id="deckTitle">같은 자료의 표</h1><p>발표와 같은 content.js를 읽어 같은 렌더러로 표시합니다. 숫자를 수정하고 이 페이지를 새로고침하면 함께 바뀝니다.</p></header><main id="visualTables"></main><script>document.addEventListener("DOMContentLoaded",function(){var deck=window.PRESENTATION;document.title=(deck.title||"발표")+" — 같은 자료의 표";document.getElementById("deckTitle").textContent=(deck.title||"발표")+" — 같은 자료의 표";document.body.dataset.theme=deck.theme||"stage";window.StageVisual.renderDataPage(deck,document.getElementById("visualTables"));});</script></body></html>\n`;
}

function refreshDirectDeck(directory, options = {}) {
  directory = path.resolve(directory);
  const repoRoot = path.resolve(options.repoRoot || defaultRoot);
  const { deck, content, contentPath, issues } = readDirectDeck(directory);
  let runtimeRoot = repoRoot;
  if (options.standalone) {
    runtimeRoot = path.join(directory, "runtime");
    const assets = ["styles.css", "visual.css", "blocks.css", "deck-model.js", "visual.js", "blocks.js", "app.js"].map(file => [file, fs.readFileSync(path.join(repoRoot, file))]);
    fs.mkdirSync(runtimeRoot, { recursive: true });
    assets.forEach(([file, bytes]) => fs.writeFileSync(path.join(runtimeRoot, file), bytes));
  }
  let html = generatedHtml(fs.readFileSync(path.join(repoRoot, "index.html"), "utf8"), deck, contentPath, directory, runtimeRoot, content);
  const gallery = escape(path.relative(directory, path.join(repoRoot, "examples/index.html")).split(path.sep).join("/"));
  const intro = `<p>수정 원본은 <a href="content.js">content.js</a>입니다. 문장·자료를 바꾸고 새로고침하면 됩니다. 설치·빌드·SVG 편집은 필요하지 않습니다. <a href="data.html" data-action="current-data">현재 자료의 표</a> · <a href="README.md">작성 안내</a>${options.standalone ? "" : ` · <a href="${gallery}">예제 모음</a>`}</p>`;
  const marker = html.indexOf('id="helpDialog"');
  html = html.slice(0, marker) + html.slice(marker).replace(/(<div class="dialog-body">)\s*<p>[\s\S]*?<\/p>/, (_, opening) => opening + intro);
  html = html.replace('<div class="header-actions">', '<div class="header-actions"><a href="data.html" data-action="current-data" class="button" aria-label="현재 편집값의 데이터 표 보기">표</a>');
  const table = dataHtml(directory, runtimeRoot, deck, content);
  // Validate and read every dependency before writing either page. Never write content.js.
  const files = { index: path.join(directory, "index.html"), data: path.join(directory, "data.html"), content: contentPath };
  fs.writeFileSync(files.index, html, "utf8");
  fs.writeFileSync(files.data, table, "utf8");
  return { deck, issues, files };
}

module.exports = { readDirectDeck, refreshDirectDeck };
