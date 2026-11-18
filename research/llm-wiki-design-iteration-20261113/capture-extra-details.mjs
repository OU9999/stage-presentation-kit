const fs=await import('node:fs/promises');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const home=root+'/research/llm-wiki-design-iteration-20261113';
const request=JSON.parse(await fs.readFile(home+'/capture-request.json','utf8'));
const base=home+'/'+request.round;
const page=(await taskSpace(request.taskSpaceId)).page('p1');
await page.cdp('Network.enable');await page.cdp('Network.setCacheDisabled',{cacheDisabled:true});
await page.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
await page.goto('about:blank');const observations=[];
for(const n of [8,9,11,14,16,20]){
 await page.goto('http://127.0.0.1:4336/presentations/llm-wiki/read.html?extra-detail-'+n+'#'+n);
 await page.waitForFunction(n=>document.querySelectorAll('#slideStage .slide').length===26&&Number(document.querySelector('.slide.is-active')?.dataset.index)===n-1,n);
 const selector='.slide[data-index="'+(n-1)+'"] a[href*="materials/"]';
 const departure=await page.evaluate(sel=>{const a=document.querySelector(sel);if(!a)throw Error('Missing actual detail route');return{text:a.textContent,href:a.href};},selector);
 await page.click(selector,{label:'도식의 문장 설명 확인'});
 await page.waitForFunction(href=>location.href===href&&document.fonts.status==='loaded'&&document.querySelector('.material-article'),departure.href);
 const row=await page.evaluate(()=>({url:location.href,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio},documentWidth:document.documentElement.scrollWidth,anchor:decodeURIComponent(location.hash),anchorExists:!location.hash||Boolean(document.getElementById(decodeURIComponent(location.hash.slice(1)))),text:document.querySelector('.material-article').textContent}));
 if(row.documentWidth!==390||!row.anchorExists)throw Error('Detail overflow or missing target');
 row.slide=n;row.departure=departure;row.filename=base+'/technical/detail-'+n+'-390.png';
 await page.screenshot({path:row.filename});observations.push(row);
}
await fs.writeFile(base+'/detail-actions.json',JSON.stringify({scope:'Additional real reading destinations requested by independent reviewer; 20 follows the actual session-plan link, others exact diagram-reading anchors.',observations},null,2)+'\n');
console.log({details:observations.length,errors:0});
