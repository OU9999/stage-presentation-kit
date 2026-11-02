#!/usr/bin/env node
"use strict";
const path = require("node:path");
const { buildDeck } = require("./markdown-deck.cjs");
const { refreshDirectDeck } = require("./direct-deck.cjs");
const defaultRoot = path.resolve(__dirname, "..");
const slugs = ["product-launch", "engineering-review", "photo-story", "workshop", "devday-compositions"];
function buildExamples(options = {}) {
  const repoRoot = path.resolve(options.repoRoot || defaultRoot);
  const check = !!options.check;
  const results = slugs.map(slug => {
    const directory = path.join(repoRoot, "examples", slug);
    return { slug, ...buildDeck(path.join(directory, "slides.md"), directory, { repoRoot, check }) };
  });
  results.push({ slug: "visual-story", ...refreshDirectDeck(path.join(repoRoot, "examples/visual-story"), { repoRoot, check }) });
  ["visual-starter", "text-layout"].forEach(slug => results.push({ slug, ...refreshDirectDeck(path.join(repoRoot, "examples", slug), { repoRoot, check, standalone: true }) }));
  return results;
}
module.exports = { buildExamples };
if (require.main === module) {
  try {
    for (const result of buildExamples()) {
      process.stdout.write(`${result.slug}: ${result.deck.slides.length}장 → ${result.files.index}\n`);
      for (const issue of result.issues) process.stderr.write(`[${issue.severity}] ${result.slug} ${issue.path}: ${issue.message}\n`);
    }
  } catch (error) { process.stderr.write(error.message + "\n"); process.exitCode = 1; }
}
