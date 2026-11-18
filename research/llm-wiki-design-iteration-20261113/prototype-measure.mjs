const fs=await import('node:fs/promises');
const crypto=await import('node:crypto');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/llm-wiki-design-iteration-20261113/round-01';
const {captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const page=(await taskSpace(85)).page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:720,deviceScaleFactor:1,mobile:false});
await page.goto('about:blank');
const observations=[];
for(const n of [3,5,10,12,15]){
 const row=await captureSlide(page,'http://127.0.0.1:4336/presentations/llm-wiki/?prototype-round01#'+n,null);
 row.viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight,devicePixelRatio}));
 row.revision=await page.evaluate(()=>window.PRESENTATION.document.revision);
 row.filename=base+'/prototype-'+n+'.png';
 await page.screenshot({path:row.filename,clip:{x:row.stage.x,y:row.stage.y,width:row.stage.width,height:row.stage.height}});
 observations.push(row);
}
for(const row of observations){for(const img of row.images){
 await page.goto('http://127.0.0.1:4336/presentations/llm-wiki/'+img.src);
 await page.waitForSelector('svg');await page.waitForFunction(()=>document.fonts.status==='loaded');
 const svg=await page.evaluate(()=>{const r=document.querySelector('svg'),v=r.viewBox.baseVal;return{viewBox:{width:v.width,height:v.height},texts:[...r.querySelectorAll('text')].map(el=>{const b=el.getBBox(),s=getComputedStyle(el);return{text:el.textContent,fontSize:parseFloat(s.fontSize),bbox:{x:b.x,y:b.y,width:b.width,height:b.height}}})};});
 const scale=Math.min(img.box.width/svg.viewBox.width,img.box.height/svg.viewBox.height);
 img.assetSha256=crypto.createHash('sha256').update(await fs.readFile(root+'/presentations/llm-wiki/'+img.src)).digest('hex');
 img.svg=svg;img.containScale=scale;img.essentialMeasurements=svg.texts.map(t=>({...t,logicalFontSize:t.fontSize*scale/(row.stage.width/1600),bottom:t.bbox.y+t.bbox.height}));
}}
await fs.writeFile(base+'/prototype-observations.json',JSON.stringify({scope:'Exploratory first implementation. Not current approval evidence; full capture stopped on actual slide12 overflow.',observations},null,2)+'\n');
console.log(observations.map(r=>({slide:Number(r.index)+1,diagnostic:r.diagnostic,images:r.images.map(img=>({src:img.src,minFont:Math.min(...img.essentialMeasurements.filter(t=>t.fontSize>=38).map(t=>t.logicalFontSize)),maxBottom:Math.max(...img.essentialMeasurements.map(t=>t.bottom))}))})));
