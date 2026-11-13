'use strict';
// Compatibility entry point. Reusable implementation lives in lib/.
module.exports = require('../lib/markdown-deck.cjs');
const { buildDeck } = module.exports;

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    process.stderr.write("사용법: node scripts/markdown-deck.cjs input.md output-directory\n");
    process.exitCode = 1;
  } else {
    try {
      const result = buildDeck(args[0], args[1]);
      for (const issue of result.issues) process.stderr.write(`[${issue.severity}] ${issue.path}: ${issue.message}\n`);
      process.stdout.write(`${result.deck.slides.length}장 생성: ${result.files.index}\n`);
    } catch (error) { process.stderr.write(error.message + "\n"); process.exitCode = 1; }
  }
}
