// Root-owned browser verification; selection reads text without changing the system clipboard.
const fs = await import('node:fs/promises');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base = root + '/research/llm-wiki-typography-20261102/round-03';
const page = (await taskSpace(27)).page('p1');
const revision = JSON.parse(await fs.readFile(base + '/present-1280/manifest.json','utf8')).revision;
const results = { revision, selections:[], links:[], navigation:[] };
async function readSlide(n,width) {
  await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:false});
  await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/read.html?final='+width+'-'+n+'#'+n);
  await page.waitForFunction(({n,revision})=>window.PRESENTATION?.document.revision===revision && document.querySelectorAll('#slideStage .slide').length===26 && Number(document.querySelector('.slide.is-active')?.dataset.index)===n-1 && document.fonts.status==='loaded' && [...document.images].every(i=>i.complete&&i.naturalWidth>0),{n,revision});
}
for(const width of [390,1440]) {
  await readSlide(24,width);
  const row=await page.evaluate(()=>{
    const ps=[...document.querySelectorAll('.slide[data-index="23"] .markdown-body > p')].filter(p=>!p.classList.contains('md-meta'));
    if(ps.length!==4)throw new Error('Four request paragraphs were not retained');
    const range=document.createRange();range.setStartBefore(ps[0]);range.setEndAfter(ps[3]);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);
    return {viewport:{width:innerWidth,height:innerHeight},paragraphs:ps.map(p=>p.textContent),selected:selection.toString(),documentWidth:document.documentElement.scrollWidth};
  });
  if(row.documentWidth!==width||row.paragraphs.some(p=>!row.selected.includes(p)))throw new Error('Request selection lost content');
  row.screenshot=base+'/technical/request-selection-'+width+'.png';await page.screenshot({path:row.screenshot});results.selections.push(row);
}
for(const [n,part] of [[24,'expanded-study.txt'],[24,'workshop.html'],[24,'visual-appendix.html'],[26,'index.html'],[26,'reference-library.html']]) {
  await readSlide(n,390);
  const selector='.slide[data-index="'+(n-1)+'"] a[href$="'+part+'"]';
  const departure=await page.evaluate(sel=>{const a=document.querySelector(sel);if(!a)throw new Error('Missing material link');return{label:a.textContent,href:a.href};},selector);
  await page.click(selector,{label:'발표의 학습 자료 확인'});
  if(part.endsWith('.txt'))await page.waitForFunction(()=>document.body.innerText.includes('LLM Wiki'));
  else await page.waitForSelector('.material-article');
  const destination=await page.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText,images:[...document.images].map(i=>({src:i.getAttribute('src'),complete:i.complete,naturalWidth:i.naturalWidth}))}));
  if(!destination.url.endsWith(part)||destination.text.includes('\uFFFD'))throw new Error('Wrong or incorrectly decoded material');
  if(part==='visual-appendix.html'){
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    destination.images=await page.evaluate(()=>[...document.images].map(i=>({src:i.getAttribute('src'),complete:i.complete,naturalWidth:i.naturalWidth})));
    if(destination.images.length!==19)throw new Error('Original diagram appendix lost images');
  }
  results.links.push({slide:n,departure,...destination});
}
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:720,deviceScaleFactor:1,mobile:false});
await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/?final-navigation#1');
await page.waitForFunction(revision=>window.PRESENTATION?.document.revision===revision&&Number(document.querySelector('.slide.is-active')?.dataset.index)===0,revision);
for(let i=0;i<26;i++){
  if(i)await page.keyboard.press('ArrowRight');
  await page.waitForFunction(i=>Number(document.querySelector('.slide.is-active')?.dataset.index)===i,i);
  results.navigation.push(await page.evaluate(()=>({slide:Number(document.querySelector('.slide.is-active').dataset.index)+1,hash:location.hash,theme:document.body.dataset.theme})));
}
await page.keyboard.press('Home');await page.waitForFunction(()=>location.hash==='#1');
await page.keyboard.press('End');await page.waitForFunction(()=>location.hash==='#26');
await page.click('[data-action="overview"]',{label:'전체 발표 구성 확인'});
await page.waitForSelector('#overviewDialog:not([hidden])');
results.overviewCount=await page.evaluate(()=>document.querySelectorAll('#overviewGrid .overview-card').length);
if(results.overviewCount!==26)throw new Error('Wrong overview count');
await page.click('#overviewGrid [data-slide="16"]',{label:'검토할 인용 장 선택'});
await page.waitForFunction(()=>location.hash==='#17'&&document.querySelector('#overviewDialog').hidden);
results.overviewSelected=17;results.homeEnd=true;results.complete=true;
await fs.writeFile(base+'/final-actions.json',JSON.stringify(results,null,2)+'\n');
console.log({complete:true,selections:results.selections.length,links:results.links.length,navigation:results.navigation.length,overview:results.overviewCount});
