// Execute with ego-browser nodejs. The request selects one frozen round/viewport.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const { createRequire } = await import('node:module');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/llm-wiki-typography-20261102';
const request = JSON.parse(await fs.readFile(base + '/capture-request.json', 'utf8'));
const require = createRequire(root + '/package.json');
const { collectInputs } = require(root + '/scripts/design-review.cjs');
const { prepare, captureSlide } = await import(root + '/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot = async () => ({ ...collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).inputs,
  'DESIGN.md': sha(await fs.readFile(root + '/DESIGN.md')),
  'AGENTS.md': sha(await fs.readFile(root + '/AGENTS.md')) });
const { collectLineMetrics } = await import(base + '/line-metrics.mjs');
const inputs = await snapshot();
const revision = inputs['talks/llm-wiki/slides.md'];
const captureKey = sha(JSON.stringify(inputs)).slice(0, 12);
const output = base + '/' + request.round + '/' + request.mode + '-' + request.width;
await fs.mkdir(output, { recursive: true });
const task = await taskSpace(27), page = task.page('p1');
await prepare(page);
await page.cdp('Emulation.setDeviceMetricsOverride', { width: request.width, height: request.height, deviceScaleFactor: 1, mobile: false });
const observations = [];
if (request.mode === 'present') {
  const count = collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).slideCount;
  for (let n = 1; n <= count; n++) {
    const row = await captureSlide(page, 'http://127.0.0.1:4330/presentations/llm-wiki/?capture=' + captureKey + '#' + n, null);
    if (Number(row.index) !== n - 1) throw new Error('Wrong active slide: ' + n);
    Object.assign(row, await page.evaluate(() => ({ viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      revision: window.PRESENTATION.document.revision, theme: document.body.dataset.theme })));
    if (row.images.some(img => !img.naturalWidth)) throw new Error('Image failed to decode');
    if (row.revision !== revision || row.viewport.width !== request.width || row.viewport.height !== request.height || row.viewport.devicePixelRatio !== 1 || row.theme !== 'stage') throw new Error('Stale or unexpected presentation');
    row.typography = await page.evaluate(collectLineMetrics);
    Object.assign(row, await page.evaluate(() => {
      const slide=document.querySelector('#slideStage .is-active'), r=slide.getBoundingClientRect(), scale=r.width/1600;
      const box=el=>{if(!el)return null;const b=el.getBoundingClientRect();return {x:(b.x-r.x)/scale,y:(b.y-r.y)/scale,width:b.width/scale,height:b.height/scale};};
      const body=slide.querySelector('.markdown-body');
      return {bodyLogicalBox:box(body),groupCount:Number(body?.dataset.groupCount||0),groups:[...slide.querySelectorAll('.md-group')].map((group,index)=>({index,heading:group.querySelector('h2')?.textContent||null,sourceLine:group.dataset.sourceLine||null,logicalBox:box(group),firstParagraphBox:box(group.querySelector('p'))}))};
    }));
    for (const img of row.images) {
      const scale=row.stage.width/1600;
      img.logicalBox={x:(img.box.x-row.stage.x)/scale,y:(img.box.y-row.stage.y)/scale,width:img.box.width/scale,height:img.box.height/scale};
    }
    row.filename = output + '/slide-' + String(n).padStart(2, '0') + '.png';
    await page.screenshot({ path: row.filename, clip: { x: row.stage.x, y: row.stage.y, width: row.stage.width, height: row.stage.height } });
    observations.push(row);
    console.log({ slide: n, width: request.width, overflow: row.overflow.length });
  }
} else throw new Error('Use capture-reading.mjs for real viewport reading captures');
if (JSON.stringify(inputs) !== JSON.stringify(await snapshot())) throw new Error('Inputs changed while capturing');
await fs.writeFile(output + '/inputs.json', JSON.stringify(inputs, null, 2) + '\n');
await fs.writeFile(output + '/manifest.json', JSON.stringify({ revision,
  captureMode: request.mode === 'present' ? 'presentation-stage-only' : 'read-slide-crop',
  hashes: inputs, observations }, null, 2) + '\n');
console.log({ complete: true, output, revision });
