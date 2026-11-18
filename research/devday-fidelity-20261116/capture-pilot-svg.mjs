const fs=await import('node:fs/promises'),crypto=await import('node:crypto');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/devday-fidelity-20261116';
const req=JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const folder=base+'/evidence/'+req.round+'/present-'+req.width;
const bytes=await fs.readFile(folder+'/manifest.json'),manifest=JSON.parse(bytes);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const page=(await taskSpace(req.taskSpaceId)).page('p1'),observations=[];
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1600,height:900,deviceScaleFactor:1,mobile:false});
for(const row of manifest.observations)for(const img of row.images){
 if(!img.src.endsWith('.svg'))continue;
 const url=new URL(img.src,req.url).href;
 await page.goto(url);await page.waitForSelector('svg');await page.waitForFunction(()=>document.fonts.status==='loaded');
 const svg=await page.evaluate(()=>{
  const root=document.querySelector('svg'),v=root.viewBox.baseVal,inv=root.getCTM().inverse();
  const point=(el,x,y)=>{const p=root.createSVGPoint();p.x=x;p.y=y;const q=p.matrixTransform(inv.multiply(el.getCTM()));return{x:q.x,y:q.y};};
  const box=el=>{const b=el.getBBox(),p=[point(el,b.x,b.y),point(el,b.x+b.width,b.y),point(el,b.x,b.y+b.height),point(el,b.x+b.width,b.y+b.height)];return{x:Math.min(...p.map(q=>q.x)),y:Math.min(...p.map(q=>q.y)),right:Math.max(...p.map(q=>q.x)),bottom:Math.max(...p.map(q=>q.y))};};
  return{viewBox:{x:v.x,y:v.y,width:v.width,height:v.height},materialKind:root.getAttribute('data-material-kind'),texts:[...root.querySelectorAll('text')].map(el=>{const s=getComputedStyle(el);return{text:el.textContent,class:el.getAttribute('class'),role:el.getAttribute('data-copy-role'),fontSize:s.fontSize,fontWeight:s.fontWeight,bbox:box(el),glyphCount:el.getNumberOfChars()};}),nodes:[...root.querySelectorAll('[data-node-id]')].map(el=>({id:el.getAttribute('data-node-id'),tag:el.tagName,bbox:box(el)})),edges:[...root.querySelectorAll('[data-edge-id]')].map(el=>{const n=el.getTotalLength(),a=el.getPointAtLength(0),b=el.getPointAtLength(n),s=getComputedStyle(el);return{id:el.getAttribute('data-edge-id'),from:el.getAttribute('data-from'),to:el.getAttribute('data-to'),start:point(el,a.x,a.y),end:point(el,b.x,b.y),stroke:s.stroke,strokeWidth:s.strokeWidth,markerStart:s.markerStart,markerEnd:s.markerEnd};})};
 });
 const scale=Math.min(img.box.width/svg.viewBox.width,img.box.height/svg.viewBox.height),stageScale=row.stage.width/1600;
 const asset=await fs.readFile(root+decodeURIComponent(new URL(url).pathname)),hash=sha(asset),sourcePaths=Object.entries(manifest.hashes).filter(([n,h])=>n.endsWith('.svg')&&h===hash).map(([n])=>n);
 if(!sourcePaths.length)throw Error('SVG not tied to capture inputs');
 observations.push({slide:Number(row.index)+1,url,sourcePaths,sha256:hash,stageScale,projectedScale:scale,...svg,texts:svg.texts.map(t=>({...t,projectedPixels:parseFloat(t.fontSize)*scale,stageLogicalPixels:parseFloat(t.fontSize)*scale/stageScale}))});
}
await fs.writeFile(folder+'/svg-metrics.json',JSON.stringify({revision:manifest.revision,hashes:manifest.hashes,captureManifest:{path:folder.slice(root.length+1)+'/manifest.json',sha256:sha(bytes)},method:'Observed SVG geometry/fonts at the actual contain scale; no aesthetic approval.',observations},null,2)+'\n');
console.log({folder,observedSVG:observations.length});
