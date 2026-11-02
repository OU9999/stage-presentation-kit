const fs = await import('node:fs/promises');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const out = root + '/research/llm-wiki-remake-20261102/round-03/common';
await fs.mkdir(out, { recursive: true });
const { prepare, captureSlide } = await import(root + '/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const page = (await taskSpace(23)).page('p1');
await prepare(page);
const observations = [];
for (const [deck, slide, role] of [['product-notes',5,'existing-auto-quote'],['team-learning',5,'another-topic-quote'],['product-notes',4,'bright-document-and-photo'],['product-notes',6,'korean-message']]) {
  const row = await captureSlide(page, 'http://127.0.0.1:4330/presentations/' + deck + '/#' + slide, out + '/' + deck + '-' + slide + '.png', {stageOnly:true});
  observations.push({ role, ...row });
  if (row.overflow.length || row.diagnostic || row.errors.length || row.failures.length || row.images.some(img => !img.naturalWidth)) throw new Error('Common representative failed');
}
await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
for (const [deck, slide] of [['llm-wiki',17],['product-notes',5]]) {
  const row = await captureSlide(page, 'http://127.0.0.1:4330/presentations/' + deck + '/#' + slide, out + '/reduced-' + deck + '-' + slide + '.png', {stageOnly:true});
  row.motion = await page.evaluate(() => ({ reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    animations: document.getAnimations().length, names: [...document.querySelectorAll('.slide.is-active,.slide.is-active *')].map(el => getComputedStyle(el).animationName).filter(x => x !== 'none') }));
  if (!row.motion.reduced || row.motion.animations || row.motion.names.length) throw new Error('Reduced motion failed');
  observations.push({ role:'reduced-motion', ...row });
}
await page.cdp('Emulation.setDeviceMetricsOverride', { width:390,height:844,deviceScaleFactor:1,mobile:false });
await page.goto('http://127.0.0.1:4330/presentations/product-notes/read.html#5');
await page.waitForFunction(() => document.body.dataset.mode==='read' && document.querySelectorAll('#slideStage .slide').length===8);
await page.waitForFunction(() => { const r=document.querySelector('.slide[data-index="4"]').getBoundingClientRect(); return r.top>=70 && r.top<140; });
await page.screenshot({path:out+'/product-notes-quote-read-390.png'});
observations.push(await page.evaluate(() => ({role:'other-topic-read-390', width:innerWidth,documentWidth:document.documentElement.scrollWidth,
  quote:document.querySelector('.slide[data-index="4"] blockquote').textContent, animationNames:[...document.querySelectorAll('#slideStage .slide *')].map(el=>getComputedStyle(el).animationName).filter(x=>x!=='none')})));
await page.cdp('Emulation.setEmulatedMedia', { features: [{ name:'prefers-reduced-motion',value:'no-preference' }] });
for (const slide of [7,23,24]) {
  await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/read.html?scroll-proof='+slide+'#'+slide);
  await page.waitForFunction(n => { const el=document.querySelector('.slide[data-index="'+(n-1)+'"]'); return document.querySelectorAll('#slideStage .slide').length===26 && el.getBoundingClientRect().top>=90 && el.getBoundingClientRect().top<94; },slide);
  const selector='.slide[data-index="'+(slide-1)+'"] .blocks-scroll';
  const row=await page.evaluate(sel=>{const el=document.querySelector(sel),r=el.getBoundingClientRect();return{width:innerWidth,documentWidth:document.documentElement.scrollWidth,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,text:el.textContent,rect:r.toJSON(),x:r.x+r.width/2,y:Math.min(innerHeight-100,r.y+r.height/2)};},selector);
  row.screenshots=[out+'/reading-'+slide+'-left.png'];
  await page.screenshot({path:row.screenshots[0]});
  const max=row.scrollWidth-row.clientWidth;
  if(max>0){
    await page.mouse.move(row.x,row.y);
    await page.mouse.wheel(Math.ceil(max/2),0,{label:'본문 가운데 읽기'});
    await page.waitForFunction(({sel,goal})=>document.querySelector(sel).scrollLeft>=goal,{sel:selector,goal:Math.floor(max/2)-1});
    row.screenshots.push(out+'/reading-'+slide+'-middle.png');await page.screenshot({path:row.screenshots.at(-1)});
    await page.mouse.move(row.x,row.y);
    await page.mouse.wheel(max+100,0,{label:'본문 오른쪽 끝 읽기'});
    await page.waitForFunction(({sel,goal})=>document.querySelector(sel).scrollLeft>=goal,{sel:selector,goal:max-1});
    row.screenshots.push(out+'/reading-'+slide+'-right.png');await page.screenshot({path:row.screenshots.at(-1)});
  }
  row.after=await page.evaluate(sel=>({hash:location.hash,scrollLeft:document.querySelector(sel).scrollLeft}),selector);
  if(row.after.hash!=='#'+slide)throw new Error('Native scrolling navigated the slide');
  observations.push({role:'reading-scroll-'+slide,...row});
}
await page.cdp('Emulation.setDeviceMetricsOverride', { width:1500,height:650,deviceScaleFactor:1,mobile:false });
for (const [name, asset] of [['ingest-map','e93f12b83834-ingest-map.svg'],['session-plan','71a3edfad9bd-session-plan.svg']]) {
  await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/assets/'+asset);
  await page.waitForSelector('svg');
  await page.screenshot({path:out+'/original-'+name+'.png'});
  observations.push(await page.evaluate(() => ({role:'original-svg',url:location.href,width:innerWidth,height:innerHeight,svg:document.querySelector('svg').getBoundingClientRect().toJSON(),text:document.documentElement.textContent})));
}
await fs.writeFile(out+'/verification.json',JSON.stringify({observations},null,2)+'\n');
console.log({complete:true,observations:observations.length});
