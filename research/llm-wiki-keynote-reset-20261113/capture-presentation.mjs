// Execute with ego-browser nodejs. The request selects one frozen round/viewport.
const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const { createRequire } = await import('node:module');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/llm-wiki-keynote-reset-20261113';
const request = JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const require = createRequire(root + '/package.json');
const { collectInputs } = require(root + '/scripts/design-review.cjs');
const { captureSlide } = await import(root + '/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot = async () => ({ ...collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).inputs,
  'talks/llm-wiki/qa/keynote-current.json':sha(await fs.readFile(root+'/talks/llm-wiki/qa/keynote-current.json')),
  'talks/llm-wiki/qa/keynote-coverage.json':sha(await fs.readFile(root+'/talks/llm-wiki/qa/keynote-coverage.json')),
  'DESIGN.md': sha(await fs.readFile(root + '/DESIGN.md')),
  'AGENTS.md': sha(await fs.readFile(root + '/AGENTS.md')) });
const { collectLineMetrics } = await import(root + '/research/llm-wiki-keynote-reset-20261113/line-metrics.mjs');
const inputs = await snapshot();
const revision = inputs['talks/llm-wiki/slides.md'];
const sourceSnapshot=base+'/'+request.round+'/source-snapshot.json';
try{
 const previous=JSON.parse(await fs.readFile(sourceSnapshot,'utf8'));
 if(previous.revision!==revision||JSON.stringify(Object.fromEntries(Object.entries(previous.inputs).map(([key,value])=>[key,value.sha256])))!==JSON.stringify(inputs))throw Error('Choose a new round for changed source inputs');
}catch(error){
 if(error.code!=='ENOENT')throw error;
 const frozen={};for(const [name,hash]of Object.entries(inputs)){
  const file=base+'/'+request.round+'/source/'+name;await fs.mkdir(file.slice(0,file.lastIndexOf('/')),{recursive:true});
  const bytes=await fs.readFile(root+'/'+name);if(sha(bytes)!==hash)throw Error('Inputs changed while freezing source');await fs.writeFile(file,bytes);
  frozen[name]={path:file.slice(root.length+1),sha256:hash};
 }
 await fs.writeFile(sourceSnapshot,JSON.stringify({revision,inputs:frozen},null,2)+'\n');
}
const captureKey = sha(JSON.stringify(inputs)).slice(0, 12);
const output = base + '/' + request.round + '/' + request.mode + '-' + request.width;
await fs.mkdir(output, { recursive: true });
const task = await taskSpace(request.taskSpaceId), page = task.page('p1');
await page.cdp('Page.addScriptToEvaluateOnNewDocument',{source: 'window.__renewalErrors=[];addEventListener("error",e=>{if(e.message)window.__renewalErrors.push(e.message)});addEventListener("unhandledrejection",e=>window.__renewalErrors.push(String(e.reason)));'});
await page.cdp('Network.enable'); await page.cdp('Network.setCacheDisabled', {cacheDisabled:true});
await page.cdp('Emulation.setDeviceMetricsOverride', { width: request.width, height: request.height, deviceScaleFactor: 1, mobile: false });
// Force a new document; hash navigation alone preserves an earlier failed resource load.
await page.goto('about:blank');
const sourceDeck = require(root+'/lib/markdown-document.cjs').parseDocument(await fs.readFile(root+'/talks/llm-wiki/slides.md','utf8'));
const descendants=node=>[node,...(node.children||[]).flatMap(descendants)];
const observations = [];
if (request.mode === 'present') {
  const count = collectInputs({ repoRoot: root, source: 'talks/llm-wiki/slides.md' }).slideCount;
  for (const n of (request.slides || Array.from({length:count},(_,i)=>i+1))) {
    await page.goto('about:blank');
    const row = await captureSlide(page, 'http://127.0.0.1:' + request.port + '/presentations/llm-wiki/?capture=' + captureKey + '#' + n, null);
    if (!await page.evaluate(() => Boolean(window.StageBlocks && window.STAGE_MODEL && window.StageVisual))) throw new Error('Required browser runtime did not load');
    if (row.diagnostic || row.failures.length || row.errors.length) { await fs.writeFile(output+'/failed-observation.json',JSON.stringify({inputs,observations,failed:row},null,2)+'\n'); throw new Error('Browser rendering error: '+JSON.stringify({slide:n,diagnostic:row.diagnostic,failures:row.failures,errors:row.errors})); }
    if (Number(row.index) !== n - 1) throw new Error('Wrong active slide: ' + n);
    Object.assign(row, await page.evaluate(() => ({ viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      revision: window.PRESENTATION.document.revision, theme: document.body.dataset.theme })));
    if (row.images.length!==sourceDeck.slides[n-1].blocks.flatMap(descendants).filter(node=>node.tag==='img').length) throw new Error('Source and actual DOM image inventories differ');
    if (row.images.some(img => !img.naturalWidth)) throw new Error('Image failed to decode');
    if (row.revision !== revision || row.viewport.width !== request.width || row.viewport.height !== request.height || row.viewport.devicePixelRatio !== 1 || row.theme !== 'stage') throw new Error('Stale or unexpected presentation');
    row.typography = await page.evaluate(collectLineMetrics);
    Object.assign(row, await page.evaluate(() => {
      const slide=document.querySelector('#slideStage .is-active'), r=slide.getBoundingClientRect(), scale=r.width/1600;
      const box=el=>{if(!el)return null;const b=el.getBoundingClientRect();return {x:(b.x-r.x)/scale,y:(b.y-r.y)/scale,width:b.width/scale,height:b.height/scale};};
      const body=slide.querySelector('.markdown-body');
      return {links:[...slide.querySelectorAll('a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})),bodyLogicalBox:box(body),groupCount:Number(body?.dataset.groupCount||0),groups:[...slide.querySelectorAll('.md-group')].map((group,index)=>({index,heading:group.querySelector('h2')?.textContent||null,sourceLine:group.dataset.sourceLine||null,logicalBox:box(group),firstParagraphBox:box(group.querySelector('p'))}))};
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
  source:'talks/llm-wiki/slides.md', scopeSlides:observations.map(row=>Number(row.index)+1),
  captureMode: request.mode === 'present' ? 'presentation-stage-only' : 'read-slide-crop',
  hashes: inputs, observations }, null, 2) + '\n');
console.log({ complete: true, output, revision });
