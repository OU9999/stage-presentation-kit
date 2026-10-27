// Run only through ego-browser nodejs; local diagnostic, not a production benchmark.
const fs = await import('node:fs/promises');
const dir = '/Users/ou9999-wdl/Documents/devday-presentation-kit/research/vite-react-20261027/evidence';
const task = await taskSpace(34);
const page = task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await page.cdp('Network.enable');
await page.cdp('Network.setCacheDisabled', { cacheDisabled: true });
await page.cdp('Page.addScriptToEvaluateOnNewDocument', { source: `
  window.__audit = { longTasks: [], lcp: [], navigation: [] };
  for (const [type, target] of [['longtask','longTasks'], ['largest-contentful-paint','lcp']]) {
    try { new PerformanceObserver(list => window.__audit[target].push(...list.getEntries().map(e => ({startTime:e.startTime,duration:e.duration,size:e.size})))).observe({type,buffered:true}); } catch (_) {}
  }
  document.addEventListener('keydown', e => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    window.__audit.currentInput = { key:e.key, start:performance.now() };
  }, true);
  document.addEventListener('keydown', e => {
    const input=window.__audit.currentInput;
    if (!input || input.key !== e.key) return;
    input.syncEventMs=performance.now()-input.start;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      input.twoAnimationFramesMs=performance.now()-input.start;
      input.hash=location.hash;
      window.__audit.navigation.push(input);
    }));
  });
` });
const result = { capturedAt: new Date().toISOString(), base: 'http://127.0.0.1:4317', environment: { viewport: '1440x1000', cache: 'disabled on audited page', cpuThrottling: 'none', networkThrottling: 'none', server: 'Python http.server, no response compression' }, limitations: ['Three local runs per deck, not field Core Web Vitals.', 'LCP is a buffered observation before navigation input, not a field percentile.', 'Keyboard syncEventMs measures event processing; twoAnimationFramesMs includes frame scheduling and is not INP.', 'No React or Vite implementation has been benchmarked.'], decks: [] };
for (const path of ['/', '/examples/devday-compositions/index.html']) {
  const deck = { path, runs: [] };
  for (let run=0; run<3; run++) {
    await page.goto(result.base+path);
    await page.waitForFunction(() => document.readyState==='complete' && document.querySelectorAll('#slideStage > .slide').length>0 && performance.getEntriesByType('paint').length>0);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    deck.runs.push(await page.evaluate(() => ({
      userAgent:navigator.userAgent,
      navigation:performance.getEntriesByType('navigation')[0].toJSON(),
      paints:performance.getEntriesByType('paint').map(x=>x.toJSON()),
      lcp:window.__audit.lcp,
      longTasks:window.__audit.longTasks,
      resources:performance.getEntriesByType('resource').map(x=>({name:x.name,initiatorType:x.initiatorType,transferSize:x.transferSize,encodedBodySize:x.encodedBodySize,decodedBodySize:x.decodedBodySize,duration:x.duration})),
      dom:{elements:document.querySelectorAll('*').length,slides:document.querySelectorAll('#slideStage > .slide').length,hiddenSlides:document.querySelectorAll('#slideStage > .slide[hidden]').length,fields:document.querySelectorAll('#slideStage [data-field]').length,images:[...document.images].map(x=>({src:x.currentSrc,complete:x.complete,width:x.naturalWidth,height:x.naturalHeight,loading:x.loading,insideHiddenSlide:!!x.closest('.slide[hidden]')}))},
      saveStatus:document.getElementById('saveStatus').textContent
    })));
  }
  const slides=deck.runs.at(-1).dom.slides;
  for(let i=1;i<slides;i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(expected => window.__audit.navigation.length >= expected, i);
  }
  deck.keyboard=await page.evaluate(()=>window.__audit.navigation);
  deck.endState=await page.evaluate(()=>({hash:location.hash,active:document.querySelector('#slideStage > .slide.is-active')?.getAttribute('aria-label')}));
  result.decks.push(deck);
}
await fs.writeFile(dir+'/browser-baseline.json',JSON.stringify(result,null,2)+'\n');
console.log(result.decks.map(d=>({path:d.path,runs:d.runs.map(r=>({dcl:r.navigation.domContentLoadedEventEnd,load:r.navigation.loadEventEnd,fcp:r.paints.find(x=>x.name==='first-contentful-paint')?.startTime,lcp:r.lcp.at(-1)?.startTime,slides:r.dom.slides,hiddenSlides:r.dom.hiddenSlides,elements:r.dom.elements,resources:r.resources.length,longTasks:r.longTasks.length})),keyboardEvents:d.keyboard.length,end:d.endState})));
console.log(await page.snapshot());
