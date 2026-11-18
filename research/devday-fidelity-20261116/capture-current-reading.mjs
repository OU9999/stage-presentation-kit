// Capture real scrolled reading pixels between sticky navigation bars; do not hide product UI.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const { createRequire } = await import('node:module');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/devday-fidelity-20261116/regression';
const request = JSON.parse(await fs.readFile(base + '/capture-request.json', 'utf8'));
const { collectInputs } = createRequire(root + '/package.json')(root + '/scripts/design-review.cjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot = async () => ({ ...collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).inputs,
  'talks/llm-wiki/qa/keynote-current.json':sha(await fs.readFile(root+'/talks/llm-wiki/qa/keynote-current.json')),
  'talks/llm-wiki/qa/keynote-coverage.json':sha(await fs.readFile(root+'/talks/llm-wiki/qa/keynote-coverage.json')),
  'DESIGN.md': sha(await fs.readFile(root + '/DESIGN.md')), 'AGENTS.md': sha(await fs.readFile(root + '/AGENTS.md')) });
const count=collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).slideCount;
const {collectReadingLineMetrics,collectSupportLinkMetrics,collectMaterialLineMetrics}=await import(root+'/research/devday-fidelity-20261116/reading-line-metrics-current.mjs');
const inputs = await snapshot(), revision = inputs['talks/llm-wiki/slides.md'];
const output = base + '/' + request.round + '/read-' + request.width;
await fs.mkdir(output + '/tiles', { recursive: true });
const page = (await taskSpace(request.taskSpaceId)).page('p1');
await page.cdp('Network.enable');await page.cdp('Network.setCacheDisabled',{cacheDisabled:true});
await page.cdp('Emulation.setDeviceMetricsOverride', { width: request.width, height: request.height, deviceScaleFactor: 1, mobile: false });
await page.goto('about:blank');
await page.goto('http://127.0.0.1:' + request.port + '/presentations/llm-wiki/read.html?capture=tiles-' + sha(JSON.stringify(inputs)).slice(0, 12) + '#1');
await page.waitForFunction(({rev,count}) => Boolean(window.StageBlocks && window.STAGE_MODEL && window.StageVisual) && document.body.dataset.mode === 'read' && window.PRESENTATION?.document.revision === rev && document.querySelectorAll('#slideStage .slide').length === count && document.fonts.status === 'loaded' && [...document.images].every(img => img.complete && img.naturalWidth > 0), {rev:revision,count});
const state = await page.evaluate(() => {
  const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), width: Math.round(r.width), height: Math.round(r.height) }; };
  return { url:location.href,supportNavigation:[...document.querySelectorAll('.stage-document-links a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})),viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, documentWidth: document.documentElement.scrollWidth,
    observations: [...document.querySelectorAll('#slideStage .slide')].map(slide => ({ index: slide.dataset.index, stage: box(slide), rect:box(slide), scrollWidth:slide.scrollWidth, clientWidth:slide.clientWidth,
      heading: slide.querySelector('.slide-title')?.textContent, text: slide.querySelector('.slide-body')?.textContent,
      nativeFonts: [...slide.querySelectorAll('.slide-body p,.slide-body li')].map(el => getComputedStyle(el).fontSize),
      images: [...slide.querySelectorAll('img')].map(img => ({ src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, width: img.getBoundingClientRect().width })),
      links: [...slide.querySelectorAll('a')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })) })) };
});
if (state.documentWidth !== request.width) throw new Error('Document overflow');
for (const row of state.observations) {
  row.viewport = state.viewport; row.revision = revision;row.url=await page.url();
  row.typography=await page.evaluate(collectReadingLineMetrics,'#slideStage .slide[data-index="'+row.index+'"]');
  row.supportLinks=await page.evaluate(collectSupportLinkMetrics,'#slideStage .slide[data-index="'+row.index+'"]');
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
await page.goto('about:blank');
await page.goto('http://127.0.0.1:'+request.port+'/presentations/llm-wiki/materials/keynote-notes.html');
await page.waitForSelector('.material-article');
await page.waitForFunction(revision=>document.fonts.status==='loaded'&&document.body.dataset.revision===revision,inputs['talks/llm-wiki/materials/keynote-notes.md']);
state.supportDocuments=[await page.evaluate(()=>({sourcePath:document.body.dataset.source,url:location.href,title:document.title,text:document.querySelector('.material-article').textContent,anchors:[...document.querySelectorAll('.material-article [id]')].map(el=>el.id),links:[...document.querySelectorAll('.material-article a')].map(a=>({href:a.getAttribute('href'),text:a.textContent})),scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}))];
state.supportDocuments[0].paragraphs=await page.evaluate(collectMaterialLineMetrics);
if (JSON.stringify(inputs) !== JSON.stringify(await snapshot())) throw new Error('Inputs changed');
await fs.writeFile(output + '/inputs.json', JSON.stringify(inputs, null, 2) + '\n');
await fs.writeFile(output + '/manifest.json', JSON.stringify({ source:'talks/llm-wiki/slides.md',revision, captureMode: 'read-slide-crop', method: 'crop-full-viewport-strips-between-sticky-chrome', hashes: inputs, ...state }, null, 2) + '\n');
const manifestBytes=await fs.readFile(output+'/manifest.json');
await fs.writeFile(output+'/reading-metrics.json',JSON.stringify({revision,hashes:inputs,viewport:state.viewport,coordinateSpace:'native-reading-CSS-pixels',supportNavigation:state.supportNavigation,supportDocuments:state.supportDocuments,captureManifest:{path:output.slice(root.length+1)+'/manifest.json',sha256:sha(manifestBytes)},observations:state.observations.map(({index,url,revision,viewport,typography,links,supportLinks,rect,scrollWidth,clientWidth})=>({index,url,revision,viewport,typography,links,supportLinks,rect,scrollWidth,clientWidth}))},null,2)+'\n');
console.log({ complete: true, output });
