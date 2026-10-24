#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { buildDeck } = require("./markdown-deck.cjs");
const { validateData, deriveData, assertSvg } = require("./visual-story/data.cjs");
const { renderMarkdown } = require("./visual-story/authoring.cjs");
const { renderTables } = require("./visual-story/tables.cjs");
const charts = require("./visual-story/charts.cjs");
const diagrams = require("./visual-story/diagrams.cjs");
const { esc } = require("./visual-story/theme.cjs");

const defaultRoot = path.resolve(__dirname, "..");
const renderers = {
  funnel: charts.renderFunnel, trend: charts.renderTrend, composition: charts.renderComposition,
  "step-rates": charts.renderStepRates, journey: diagrams.renderJourney,
  priorities: diagrams.renderPriority, roadmap: diagrams.renderRoadmap, effort: diagrams.renderEffort
};
const generatedNames = ["slides.md", "content.js", "index.html", "data.html", ...Object.keys(renderers).map(name => `assets/${name}.svg`)];
const hash = text => crypto.createHash("sha256").update(text).digest("hex").slice(0, 12);

function decorateHtml(html) {
  const headerLink = '<a href="data.html" class="button" aria-label="이 발표의 데이터 표와 계산 보기">표</a>';
  html = html.replace('<div class="header-actions">', '<div class="header-actions">' + headerLink);
  const marker = html.indexOf('id="helpDialog"');
  if (marker < 0) throw new Error("발표 템플릿에 helpDialog가 없습니다.");
  const intro = '<p>이 발표의 수정 원본은 <a href="data.json">data.json</a> 하나입니다. <code>node scripts/build-visual-story.cjs</code>로 숫자·SVG·표·발표를 함께 갱신합니다. <a href="slides.md">slides.md</a>는 생성물입니다. <a href="README.md">재생성 가이드</a> · <a href="data.html">읽을 수 있는 데이터·계산표</a> · <a href="../index.html">예제 모음</a></p>';
  const after = html.slice(marker);
  html = html.slice(0, marker) + after.replace(/(<div class="dialog-body">)\s*<p>[\s\S]*?<\/p>/, (_, opening) => opening + intro);
  html = html.replace("발표자 노트는 PDF에 포함되지 않습니다.", "발표자 노트는 PDF에 포함되지 않습니다. 작은 그림의 수치는 상단 데이터·계산표에서 읽을 수 있습니다.");
  html = html.replace("중요한 내용은 content.js로 내보내 보관하세요.", "내보낸 content.js는 발표 화면의 별도 복사본입니다. data.json·SVG·표·생성 원고로 역반영되지 않으며 다음 재생성 때 덮어쓰입니다.");
  return html;
}

function buildVisualStory(inputPath, outputDir, options = {}) {
  const repoRoot = path.resolve(options.repoRoot || defaultRoot);
  const input = path.resolve(inputPath || path.join(repoRoot, "examples/visual-story/data.json"));
  const output = path.resolve(outputDir || path.join(repoRoot, "examples/visual-story"));
  if (generatedNames.some(file => path.resolve(output, file) === input)) throw new Error("inputPath: 입력 원본이 생성 출력 경로와 겹칩니다. 별도 data.json을 사용하세요.");
  let data;
  try { data = JSON.parse(fs.readFileSync(input, "utf8")); }
  catch (error) { throw new Error(`data.json: ${error.message}`); }
  const realInput = fs.realpathSync(input);
  if (generatedNames.some(file => fs.existsSync(path.join(output, file)) && fs.realpathSync(path.join(output, file)) === realInput)) throw new Error("inputPath: 입력 원본과 생성 출력이 같은 실제 파일을 참조합니다.");
  const issues = validateData(data);
  if (issues.length) throw new Error("시각화 입력 검증 실패:\n" + issues.map(issue => `${issue.path}: ${issue.message}`).join("\n"));
  const summary = deriveData(data);
  const href = target => esc(path.relative(output, target).split(path.sep).map(encodeURIComponent).join("/"));
  const sourceHref = href(input);
  const guideHref = href(path.join(repoRoot, "examples/visual-story/README.md"));
  const galleryHref = href(path.join(repoRoot, "examples/index.html"));
  const links = { "data.json": sourceHref, "README.md": guideHref, "../index.html": galleryHref };
  const sourceLinks = html => html.replace(/href="(data\.json|README\.md|\.\.\/index\.html)"/g, (_, key) => `href="${links[key]}"`);
  const memory = { "data.html": sourceLinks(renderTables(data, summary)) };
  const assetVersions = {};
  for (const [name, render] of Object.entries(renderers)) {
    const svg = render(data);
    assertSvg(svg, `assets/${name}.svg`);
    memory[`assets/${name}.svg`] = svg;
    assetVersions[name] = hash(svg);
  }
  memory["slides.md"] = renderMarkdown(data, summary, assetVersions);
  // Compile beside the final directory: shared-runtime relative paths keep the same depth.
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const staging = fs.mkdtempSync(path.join(path.dirname(output), ".visual-story-stage-"));
  let built;
  try {
    fs.mkdirSync(path.join(staging, "assets"));
    for (const [file, text] of Object.entries(memory)) fs.writeFileSync(path.join(staging, file), text, "utf8");
    built = buildDeck(path.join(staging, "slides.md"), staging, { repoRoot });
    const sourceName = path.basename(input).replace(/[\r\n*\/]/g, "_");
    const content = fs.readFileSync(built.files.content, "utf8").replace(/^\/\*[^\n]*\*\//, `/* Generated from ${sourceName}. Edit the input JSON and run node scripts/build-visual-story.cjs. */`);
    let html = sourceLinks(decorateHtml(fs.readFileSync(built.files.index, "utf8")));
    html = html.replace(/src="content\.js\?v=[a-f0-9]+"/, `src="content.js?v=${hash(content)}"`);
    fs.writeFileSync(built.files.content, content, "utf8");
    fs.writeFileSync(built.files.index, html, "utf8");
    // All input, graphics, Markdown, media, and runtime checks succeeded before replacing outputs.
    fs.mkdirSync(path.join(output, "assets"), { recursive: true });
    for (const file of generatedNames) fs.copyFileSync(path.join(staging, file), path.join(output, file));
  } finally { fs.rmSync(staging, { recursive: true, force: true }); }
  const graphics = Object.fromEntries(Object.keys(renderers).map(name => [name, path.join(output, "assets", name + ".svg")]));
  const files = { source: input, slides: path.join(output, "slides.md"), content: path.join(output, "content.js"), index: path.join(output, "index.html"), data: path.join(output, "data.html"), graphics };
  return { deck: built.deck, issues: built.issues, files, outputs: generatedNames.map(file => path.join(output, file)) };
}

module.exports = { buildVisualStory, renderers, generatedNames };
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 0 && args.length !== 2) { process.stderr.write("사용법: node scripts/build-visual-story.cjs [data.json output-directory]\n"); process.exitCode = 1; }
  else {
    try { const result = buildVisualStory(args[0], args[1]); process.stdout.write(`visual-story: ${result.deck.slides.length}장·8 SVG·데이터 표 → ${result.files.index}\n`); }
    catch (error) { process.stderr.write(error.message + "\n"); process.exitCode = 1; }
  }
}
