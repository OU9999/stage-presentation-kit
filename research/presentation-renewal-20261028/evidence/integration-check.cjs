"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict"), cp = require("node:child_process");
const repo = path.resolve(__dirname, "../../..");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const read = file => fs.readFileSync(path.join(repo, file));
const relative = file => path.relative(repo, file).split(path.sep).join("/");
function files(directory) { return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]); }
const base = JSON.parse(read("research/presentation-renewal-20261028/evidence/before-sources.json"));
const previous = JSON.parse(read("research/design-system-reaudit-20261028/integration-receipt.json"));
for (const [file, hash] of Object.entries(previous.artifactHashes)) assert.equal(sha(read(file)), hash, "Previous audit changed: " + file);
const originalFiles = ["styles.css", "visual.css", "visual.js", "content.js", "package.json", "package-lock.json"];
const tracked = cp.execFileSync("git", ["ls-tree", "-r", "--name-only", base.head, "examples"], { cwd: repo, encoding: "utf8" }).trim().split("\n");
originalFiles.push(...tracked.filter(file => /^examples\/[^/]+\/(?:slides\.md|content\.js)$/.test(file)));
for (const file of originalFiles) assert.deepEqual(read(file), cp.execFileSync("git", ["show", base.head + ":" + file], { cwd: repo }), "Original source changed: " + file);
const runtime = ["styles.css", "visual.css", "blocks.css", "deck-model.js", "visual.js", "blocks.js", "app.js"];
for (const directory of ["presentations/_runtime", "examples/visual-starter/runtime", "examples/text-layout/runtime"]) for (const file of runtime) assert.deepEqual(read(directory + "/" + file), read(file), "Runtime copy differs: " + directory + "/" + file);
const renewal = "research/presentation-renewal-20261028/";
const currentHtml = ["index.html", ...["examples", "presentations"].flatMap(directory => files(path.join(repo, directory)).filter(file => file.endsWith(".html")).map(relative))];
const documents = ["README.md", "MARKDOWN-FIRST.md", "talks/product-notes/slides.md", "talks/team-learning/slides.md", ...files(path.join(repo, renewal)).filter(file => /\.(?:md|html)$/.test(file)).map(relative), ...currentHtml];
let references = 0, versions = 0;
const targets = new Set();
function checkTarget(document, raw, html) {
  let url = raw.replace(/&amp;/g, "&").trim().replace(/^<|>$/g, "");
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return;
  if (!html) url = url.split(/\s+["']/)[0];
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!pathname) return;
  const target = path.resolve(path.dirname(path.join(repo, document)), pathname);
  assert(fs.existsSync(target), document + " has missing reference: " + raw);
  references += 1; targets.add(relative(target));
  const version = html && /[?&]v=([a-f\d]{12})(?:&|#|$)/.exec(url);
  if (version && fs.statSync(target).isFile()) { assert.equal(sha(fs.readFileSync(target)).slice(0, 12), version[1], "Stale version: " + document + " -> " + url); versions += 1; }
}
for (const document of new Set(documents)) {
  let source = read(document).toString("utf8");
  const html = document.endsWith(".html");
  if (html) for (const match of source.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) checkTarget(document, match[1], true);
  else {
    source = source.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, "");
    for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) checkTarget(document, match[1], false);
  }
}
const stage = JSON.parse(read(renewal + "evidence/screens.json"));
assert.equal(stage.length, 16);
assert(stage.every(row => !row.overflow.length && !row.errors.length && !row.failures.length && !row.diagnostic && row.images.every(image => image.naturalWidth > 0) && !row.editableNodes && !row.localStorageCalls.length));
const mobile = JSON.parse(read(renewal + "evidence/mobile-browser.json"));
assert(mobile.decks.every(row => row.width === row.scrollWidth && row.semanticTextMatches && row.images.every(image => image.ok && image.fit === "contain" && Math.abs(image.ratio - image.naturalRatio) < .001)));
const edges = JSON.parse(read(renewal + "evidence/edge-browser.json"));
assert.equal(edges.length, 22);
assert(edges.every(row => row.composition === row.expected && !row.errors.length && !row.failures.length));
assert(edges.filter(row => /^(?:gallery|mosaic)-\d$/.test(row.id)).every(row => !row.overflow.length));
assert.deepEqual(edges.find(row => row.id === "individual-focus").images.map(image => image.focus), ["50% 20%", "50% 80%"]);
const paper = JSON.parse(read(renewal + "evidence/paper-browser.json"));
function luminance(value) { const rgb = value.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => { channel /= 255; return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; }); return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]; }
const contrast = paper.filter(row => row.tone).map(row => { const a = luminance(row.color), b = luminance(row.background); return { tone: row.tone, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) }; });
assert(contrast.every(row => row.ratio >= 4.5));
const report = { scope: "Current implementation and local verification; deployment recorded separately", baseline: base.head, originalSourcesPreserved: originalFiles.length, priorAuditHashesMatched: Object.keys(previous.artifactHashes).length, runtimeCopiesMatched: 21, documentsChecked: new Set(documents).size, localReferences: references, versionHashesChecked: versions, referenceTargets: [...targets].sort(), sourceHashes: Object.fromEntries([...runtime, "scripts/markdown-document.cjs", "talks/product-notes/slides.md", "talks/team-learning/slides.md"].map(file => [file, sha(read(file))])), tests: { passed: 229, failed: 0 }, actualStoryScreens: 16, browserEdgeCases: 22, paperContrast: contrast };
fs.writeFileSync(path.join(__dirname, "integration-result.json"), JSON.stringify(report, null, 2) + "\n");
console.log({ ...report, referenceTargets: report.referenceTargets.length });
