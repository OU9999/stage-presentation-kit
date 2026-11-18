const fs=await import('node:fs/promises'),crypto=await import('node:crypto');
const {createRequire}=await import('node:module');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/llm-wiki-keynote-reset-20261113';
const request=JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const source='research/llm-wiki-keynote-reset-20261113/prototypes/talks/'+request.deck+'/slides.md';
const require=createRequire(root+'/package.json');
const {collectInputs}=require(root+'/scripts/design-review.cjs');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const snapshot=async()=>({...collectInputs({repoRoot:root,source}).inputs,'DESIGN.md':sha(await fs.readFile(root+'/DESIGN.md')),'AGENTS.md':sha(await fs.readFile(root+'/AGENTS.md'))});
const inputs=await snapshot(),revision=inputs[source];
const deck=require(root+'/lib/markdown-document.cjs').parseDocument(await fs.readFile(root+'/'+source,'utf8'));
const {captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const page=(await taskSpace(request.taskSpace)).page('p1');
await page.cdp('Page.addScriptToEvaluateOnNewDocument',{source:'window.__renewalErrors=[];addEventListener("error",e=>{if(e.message)window.__renewalErrors.push(e.message)});addEventListener("unhandledrejection",e=>window.__renewalErrors.push(String(e.reason)));'});
await page.cdp('Emulation.setDeviceMetricsOverride',{width:request.width,height:request.height,deviceScaleFactor:1,mobile:false});
await page.goto('about:blank');
const output=base+'/evidence/'+request.round+'/present-'+request.width;await fs.mkdir(output,{recursive:true});
const observations=[],walk=n=>[n,...(n.children||[]).flatMap(walk)];
for(const n of (request.slides||Array.from({length:deck.slides.length},(_,i)=>i+1))){
 const row=await captureSlide(page,'http://127.0.0.1:4336/research/llm-wiki-keynote-reset-20261113/prototypes/site/'+request.deck+'/?proof='+revision.slice(0,12)+'#'+n,null);
 Object.assign(row,await page.evaluate(()=>({revision:window.PRESENTATION?.document.revision,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio},theme:document.body.dataset.theme,runtime:Boolean(window.StageBlocks&&window.STAGE_MODEL&&window.StageVisual)})));
 const expectedImages=deck.slides[n-1].blocks.flatMap(walk).filter(node=>node.tag==='img').length;
 if(!row.runtime||row.revision!==revision||row.viewport.width!==request.width||row.viewport.height!==request.height||row.viewport.devicePixelRatio!==1||row.theme!=='stage'||Number(row.index)!==n-1||row.images.length!==expectedImages||row.images.some(img=>!img.naturalWidth)||row.errors.length||row.failures.length||row.diagnostic){
  await fs.writeFile(output+'/failed.json',JSON.stringify({inputs,observations,failed:row},null,2)+'\n');throw Error('Prototype rendering failed: '+JSON.stringify({slide:n,diagnostic:row.diagnostic,errors:row.errors,failures:row.failures,images:row.images}));
 }
 row.filename=output+'/slide-'+String(n).padStart(2,'0')+'.png';
 await page.screenshot({path:row.filename,clip:{x:row.stage.x,y:row.stage.y,width:row.stage.width,height:row.stage.height}});
 observations.push(row);
}
if(JSON.stringify(inputs)!==JSON.stringify(await snapshot()))throw Error('Prototype inputs changed during capture');
await fs.writeFile(output+'/manifest.json',JSON.stringify({source,revision,captureMode:'presentation-stage-only',scopeSlides:observations.map(row=>Number(row.index)+1),hashes:inputs,observations},null,2)+'\n');
console.log({output,slides:observations.length,source,revision});
