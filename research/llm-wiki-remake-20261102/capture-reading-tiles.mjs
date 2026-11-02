// Capture real scrolled reading pixels between sticky navigation bars; do not hide product UI.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const { createRequire } = await import('node:module');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/llm-wiki-remake-20261102';
const request = JSON.parse(await fs.readFile(base + '/capture-request.json', 'utf8'));
const { collectInputs } = createRequire(root + '/package.json')(root + '/scripts/design-review.cjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot = async () => ({ ...collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).inputs,
  'DESIGN.md': sha(await fs.readFile(root + '/DESIGN.md')), 'AGENTS.md': sha(await fs.readFile(root + '/AGENTS.md')) });
const inputs = await snapshot(), revision = inputs['talks/llm-wiki/slides.md'];
const output = base + '/' + request.round + '/read-' + request.width;
await fs.mkdir(output + '/tiles', { recursive: true });
const page = (await taskSpace(23)).page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride', { width: request.width, height: request.height, deviceScaleFactor: 1, mobile: false });
await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/read.html?capture=tiles-' + sha(JSON.stringify(inputs)).slice(0, 12) + '#1');
await page.waitForFunction(rev => document.body.dataset.mode === 'read' && window.PRESENTATION?.document.revision === rev && document.querySelectorAll('#slideStage .slide').length === 26 && document.fonts.status === 'loaded' && [...document.images].every(img => img.complete && img.naturalWidth > 0), revision);
const state = await page.evaluate(() => {
  const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), width: Math.round(r.width), height: Math.round(r.height) }; };
  return { viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, documentWidth: document.documentElement.scrollWidth,
    observations: [...document.querySelectorAll('#slideStage .slide')].map(slide => ({ index: slide.dataset.index, stage: box(slide),
      heading: slide.querySelector('.slide-title')?.textContent, text: slide.querySelector('.slide-body')?.textContent,
      nativeFonts: [...slide.querySelectorAll('.slide-body p,.slide-body li')].map(el => getComputedStyle(el).fontSize),
      images: [...slide.querySelectorAll('img')].map(img => ({ src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, width: img.getBoundingClientRect().width })),
      links: [...slide.querySelectorAll('a')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })) })) };
});
if (state.documentWidth !== request.width) throw new Error('Document overflow');
for (const row of state.observations) {
  row.viewport = state.viewport; row.revision = revision;
  const number = String(Number(row.index) + 1).padStart(2, '0');
  row.filename = output + '/slide-' + number + '.png'; row.tiles = [];
  let done = 0;
  while (done < row.stage.height) {
    const targetY = row.stage.y + done;
    await page.evaluate(y => scrollTo({ top: y - 96, behavior: 'instant' }), targetY);
    const clip = await page.evaluate(({ targetY, x, width, remaining }) => {
      const topBar = document.querySelector('.app-header').getBoundingClientRect().bottom;
      const bottomBar = document.querySelector('.presenter-bar').getBoundingClientRect().top;
      const y = targetY - scrollY;
      if (y < topBar || y >= bottomBar) throw new Error('Pixel strip occluded by navigation');
      return { x, y, width, height: Math.min(remaining, Math.floor(bottomBar - y - 2)), scrollY, topBar, bottomBar };
    }, { targetY, x: row.stage.x, width: row.stage.width, remaining: row.stage.height - done });
    if (clip.height < 1) throw new Error('Empty tile');
    const filename = output + '/tiles/slide-' + number + '-' + String(row.tiles.length + 1).padStart(2, '0') + '.png';
    // Keep the whole viewport, then crop locally without relying on browser clip-coordinate assumptions.
    await page.screenshot({ path: filename });
    row.tiles.push({ filename, offsetY: done, clip }); done += clip.height;
  }
  console.log({ slide: Number(row.index) + 1, width: request.width, tiles: row.tiles.length });
}
if (JSON.stringify(inputs) !== JSON.stringify(await snapshot())) throw new Error('Inputs changed');
await fs.writeFile(output + '/inputs.json', JSON.stringify(inputs, null, 2) + '\n');
await fs.writeFile(output + '/manifest.json', JSON.stringify({ revision, captureMode: 'read-slide-crop', method: 'crop-full-viewport-strips-between-sticky-chrome', hashes: inputs, ...state }, null, 2) + '\n');
console.log({ complete: true, output });
