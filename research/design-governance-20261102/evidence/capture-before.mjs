// Run with ego-browser nodejs; keep screenshot and measurements in one invocation.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const output = root + '/research/design-governance-20261102/evidence/before/';
const { prepare, captureSlide } = await import(root + '/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const task = await taskSpace(12);
const page = task.page('p1');
await prepare(page);
const observations = [];
for (let n = 1; n <= 26; n++) {
  const filename = output + 'slide-' + String(n).padStart(2, '0') + '.png';
  const row = await captureSlide(page, 'http://127.0.0.1:4330/presentations/llm-wiki/#' + n, filename, { stageOnly: true });
  row.viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, devicePixelRatio }));
  row.revision = await page.evaluate(() => window.PRESENTATION.document.revision);
  if (row.viewport.width !== 1440 || row.viewport.height !== 1000) throw new Error('Viewport changed during capture');
  observations.push(row);
}
const revision = observations[0].revision;
if (observations.some(row => row.revision !== revision)) throw new Error('Revision changed during capture');
const hashes = {};
for (const file of ['talks/llm-wiki/slides.md', 'styles.css', 'DESIGN.md', 'talks/llm-wiki/test.md']) {
  hashes[file] = crypto.createHash('sha256').update(await fs.readFile(root + '/' + file)).digest('hex');
}
await fs.writeFile(output + 'manifest.json', JSON.stringify({ revision, captureMode: 'presentation-stage-only', hashes, observations }, null, 2) + '\n');
console.log({ revision, slides: observations.length, viewport: observations[0].viewport,
  overflow: observations.filter(row => row.overflow.length).length,
  missing: observations.filter(row => row.images.some(img => !img.naturalWidth)).length });
