// Execute with ego-browser nodejs. The request selects one frozen round/viewport.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const { createRequire } = await import('node:module');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/llm-wiki-remake-20261102';
const request = JSON.parse(await fs.readFile(base + '/capture-request.json', 'utf8'));
const require = createRequire(root + '/package.json');
const { collectInputs } = require(root + '/scripts/design-review.cjs');
const { prepare, captureSlide } = await import(root + '/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot = async () => ({ ...collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).inputs,
  'DESIGN.md': sha(await fs.readFile(root + '/DESIGN.md')),
  'AGENTS.md': sha(await fs.readFile(root + '/AGENTS.md')) });
const inputs = await snapshot();
const revision = inputs['talks/llm-wiki/slides.md'];
const captureKey = sha(JSON.stringify(inputs)).slice(0, 12);
const output = base + '/' + request.round + '/' + request.mode + '-' + request.width;
await fs.mkdir(output, { recursive: true });
const task = await taskSpace(23), page = task.page('p1');
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
    if (row.revision !== revision || row.viewport.width !== request.width || row.theme !== 'stage') throw new Error('Stale or unexpected presentation');
    row.filename = output + '/slide-' + String(n).padStart(2, '0') + '.png';
    await page.screenshot({ path: row.filename, clip: { x: row.stage.x, y: row.stage.y, width: row.stage.width, height: row.stage.height } });
    observations.push(row);
    console.log({ slide: n, mode: request.mode, width: request.width, overflow: row.overflow.length, diagnostic: row.diagnostic });
  }
} else if (request.mode === 'read') {
  await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/read.html?capture=' + captureKey + '#1');
  await page.waitForFunction(expected => document.body.dataset.mode === 'read' && window.PRESENTATION?.document.revision === expected &&
    document.querySelectorAll('#slideStage .slide').length === window.PRESENTATION.slides.length &&
    document.fonts.status === 'loaded' && [...document.images].every(img => img.complete), revision);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  const state = await page.evaluate(() => {
    const box = el => { const r = el.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }; };
    return { viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, revision: window.PRESENTATION.document.revision,
      documentWidth: document.documentElement.scrollWidth, documentHeight: document.documentElement.scrollHeight,
      observations: [...document.querySelectorAll('#slideStage .slide')].map(slide => ({ index: slide.dataset.index,
        heading: slide.querySelector('.slide-title')?.textContent, stage: box(slide), text: slide.querySelector('.slide-body')?.textContent,
        nativeFonts: [...slide.querySelectorAll('.slide-body p,.slide-body li')].map(el => getComputedStyle(el).fontSize),
        images: [...slide.querySelectorAll('img')].map(img => ({ src: img.getAttribute('src'), alt: img.alt, complete: img.complete,
          naturalWidth: img.naturalWidth, width: img.getBoundingClientRect().width, originalLink: img.closest('a')?.getAttribute('href') || null })),
        links: [...slide.querySelectorAll('a')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })) })) };
  });
  if (state.viewport.width !== request.width || state.revision !== revision) throw new Error('Wrong reading viewport/revision');
  await page.screenshot({ path: output + '/full-page.png', fullPage: true });
  for (const row of state.observations) observations.push({ ...row, viewport: state.viewport, revision,
    filename: output + '/slide-' + String(Number(row.index) + 1).padStart(2, '0') + '.png' });
  await fs.writeFile(output + '/reading-metrics.json', JSON.stringify(state, null, 2) + '\n');
  console.log({ mode: request.mode, width: request.width, slides: observations.length, documentWidth: state.documentWidth, height: state.documentHeight });
} else throw new Error('Unknown capture mode');
if (JSON.stringify(inputs) !== JSON.stringify(await snapshot())) throw new Error('Inputs changed while capturing');
await fs.writeFile(output + '/inputs.json', JSON.stringify(inputs, null, 2) + '\n');
await fs.writeFile(output + '/manifest.json', JSON.stringify({ revision,
  captureMode: request.mode === 'present' ? 'presentation-stage-only' : 'read-slide-crop',
  hashes: inputs, observations }, null, 2) + '\n');
console.log({ complete: true, output, revision });
