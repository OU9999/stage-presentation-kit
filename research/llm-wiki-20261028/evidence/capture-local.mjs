import fs from 'node:fs/promises';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { prepare, captureSlide } from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const evidence = fileURLToPath(new URL('./', import.meta.url));
const generated = fileURLToPath(new URL('../../../presentations/llm-wiki/content.js', import.meta.url));
const scope = { window: {} };
vm.runInNewContext(await fs.readFile(generated, 'utf8'), scope);
const count = scope.window.PRESENTATION.slides.length;
const revision = scope.window.PRESENTATION.document.revision;
const task = await taskSpace(76);
const page = task.page('p1');
await prepare(page);
await page.cdp('Page.bringToFront');
await fs.mkdir(evidence + 'screens', { recursive: true });
const results = [];
for (let n = 1; n <= count; n++) {
  const name = 'slide-' + String(n).padStart(2, '0') + '.png';
  results.push(await captureSlide(page, 'http://127.0.0.1:4323/presentations/llm-wiki/index.html?qa=' + revision + '#' + n, evidence + 'screens/' + name, { stageOnly: true }));
  if (await page.evaluate(() => window.PRESENTATION.document.revision) !== revision) throw new Error('Browser revision differs from generated source.');
  console.log({slide:n, composition:results.at(-1).composition, overflow:results.at(-1).overflow, diagnostic:results.at(-1).diagnostic});
}
await fs.writeFile(evidence + 'local-slides.json', JSON.stringify(results, null, 2) + '\n');
const failures = results.filter(r => r.overflow.length || r.diagnostic || r.errors.length || r.failures.length || r.images.some(i => !i.complete || !i.naturalWidth) || r.editableNodes || r.localStorageCalls.length);
console.log({count, failures:failures.map(r=>r.index), spaceId:task.spaceId});
if (failures.length) throw new Error('Slide QA requires review. See local-slides.json.');
