// Run through ego-browser nodejs; root alone owns this capture boundary.
const fs=await import('node:fs/promises'),crypto=await import('node:crypto');
const {createRequire}=await import('node:module');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/devday-fidelity-20261116';
const request=JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const require=createRequire(root+'/package.json');
const {collectInputs}=require(root+'/scripts/design-review.cjs');
const {captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const {collectLineMetrics}=await import(root+'/research/llm-wiki-keynote-reset-20261113/line-metrics.mjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const snapshot=async()=>({...collectInputs({repoRoot:root,source:request.source}).inputs,'DESIGN.md':sha(await fs.readFile(root+'/DESIGN.md')),'AGENTS.md':sha(await fs.readFile(root+'/AGENTS.md'))});
const hashes=await snapshot(),revision=hashes[request.source];
const deck=require(root+'/lib/markdown-document.cjs').parseDocument(await fs.readFile(root+'/'+request.source,'utf8'));
const folder=base+'/evidence/'+request.round+'/present-'+request.width;
await fs.mkdir(folder,{recursive:true});
try{await fs.access(folder+'/manifest.json');throw Error('Capture already exists; use a new round');}catch(e){if(e.code!=='ENOENT')throw e;}
const frozen=base+'/evidence/'+request.round+'/source';
for(const [name,hash]of Object.entries(hashes)){
 const bytes=await fs.readFile(root+'/'+name);if(sha(bytes)!==hash)throw Error('Changing input: '+name);
 const p=frozen+'/'+name;await fs.mkdir(p.slice(0,p.lastIndexOf('/')),{recursive:true});
 try{const old=await fs.readFile(p);if(sha(old)!==hash)throw Error('Frozen round differs: '+name);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(p,bytes);}
}
const task=await taskSpace(request.taskSpaceId),page=task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:request.width,height:request.height,deviceScaleFactor:1,mobile:false});
await page.cdp('Network.enable');await page.cdp('Network.setCacheDisabled',{cacheDisabled:true});
await page.cdp('Page.addScriptToEvaluateOnNewDocument',{source:'window.__renewalErrors=[];addEventListener("error",e=>{if(e.message)window.__renewalErrors.push(e.message)});addEventListener("unhandledrejection",e=>window.__renewalErrors.push(String(e.reason)));'});
const walk=n=>[n,...(n.children||[]).flatMap(walk)],observations=[];
for(let n=1;n<=deck.slides.length;n++){
 await page.goto('about:blank');
 const row=await captureSlide(page,request.url+'?revision='+revision.slice(0,12)+'#'+n,null);
 Object.assign(row,await page.evaluate(()=>({revision:window.PRESENTATION?.document.revision,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio},theme:document.body.dataset.theme,runtime:Boolean(window.StageBlocks&&window.STAGE_MODEL&&window.StageVisual)})));
 const expectedImages=deck.slides[n-1].blocks.flatMap(walk).filter(b=>b.tag==='img').length;
 if(row.revision!==revision||!row.runtime||row.theme!=='stage'||Number(row.index)!==n-1||row.viewport.width!==request.width||row.viewport.height!==request.height||row.viewport.devicePixelRatio!==1||row.images.length!==expectedImages||row.images.some(i=>!i.complete||!i.naturalWidth)||row.errors.length||row.failures.length||row.diagnostic)throw Error('Wrong/stale/broken pilot capture: '+JSON.stringify(row));
 row.typography=await page.evaluate(collectLineMetrics);
 row.filename=folder+'/slide-'+String(n).padStart(2,'0')+'.png';
 await page.screenshot({path:row.filename,clip:{x:row.stage.x,y:row.stage.y,width:row.stage.width,height:row.stage.height}});
 observations.push(row);console.log({slide:n,width:request.width,overflow:row.overflow.length});
}
if(JSON.stringify(hashes)!==JSON.stringify(await snapshot()))throw Error('Inputs changed during capture');
await fs.writeFile(folder+'/manifest.json',JSON.stringify({source:request.source,revision,captureMode:'presentation-stage-only',scopeSlides:observations.map(r=>Number(r.index)+1),hashes,observations},null,2)+'\n');
console.log({complete:true,folder,revision});
