"use strict";
// Rebuild the audited ordinary Markdown bodies with the current implementation.
// The previous sources, measurements, and PNGs remain immutable.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const repo = path.resolve(__dirname, "../../..");
const { parseDocument } = require(path.join(repo, "scripts/markdown-document.cjs"));
const { generatedHtml } = require(path.join(repo, "scripts/markdown-deck.cjs"));
const { validateDeck } = require(path.join(repo, "deck-model.js"));
const baseline = JSON.parse(fs.readFileSync(path.join(repo, "research/design-system-reaudit-20261028/evidence/controlled/fixtures.json")));
const template = fs.readFileSync(path.join(repo, "index.html"), "utf8");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const fixtures = baseline.results.filter(item => item.mode === "plain").map(item => {
  const directory = path.join(__dirname, "controlled", item.case, "plain");
  const sourcePath = path.join(directory, "slides.md");
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(sourcePath, item.body);
  assert.equal(sha(item.body), item.bodySha256);
  const deck = parseDocument(item.body, { sourcePath: path.relative(repo, sourcePath), id: "renewal-" + item.case });
  assert.deepEqual(validateDeck(deck).filter(issue => issue.severity === "error"), []);
  const content = "window.PRESENTATION = " + JSON.stringify(deck, null, 2) + ";\n";
  fs.writeFileSync(path.join(directory, "content.js"), content);
  fs.writeFileSync(path.join(directory, "index.html"), generatedHtml(template, deck, sourcePath, directory, repo, content));
  return { case: item.case, bodySha256: sha(item.body), url: path.relative(repo, path.join(directory, "index.html")), before: "research/design-system-reaudit-20261028/evidence/controlled/" + item.case + "-plain.png" };
});
const runtime = Object.fromEntries(["blocks.css", "blocks.js", "app.js", "deck-model.js"].map(file => [file, sha(fs.readFileSync(path.join(repo, file)))]));
fs.writeFileSync(path.join(__dirname, "default-comparison.json"), JSON.stringify({ sameAuthoredBody: true, fixtures, runtime }, null, 2) + "\n");
console.log(fixtures);
