const fs=await import('node:fs/promises');
const {createRequire}=await import('node:module');
const crypto=await import('node:crypto');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',base=root+'/research/llm-wiki-design-audit-20261113/evidence/compare';
const {collectInputs}=createRequire(root+'/package.json')(root+'/scripts/design-review.cjs');
const {captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const p=(await taskSpace(81)).page('p1');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
await p.goto('http://127.0.0.1:4336/research/reusable-layouts-20261028/');
await p.waitForFunction(()=>document.querySelector('#hero').complete&&document.querySelector('#hero').naturalWidth>0);
await p.screenshot({path:base+'/gallery.png'});
const observations=[];
for(const [deck,slide,name] of [['photo-essay',2,'portraits'],['photo-essay',3,'strip'],['photo-essay',5,'mosaic'],['community-exhibit',5,'bento'],['community-exhibit',7,'icons'],['community-exhibit',8,'custom-icons'],['product-notes',3,'table'],['product-notes',5,'quote'],['team-learning',6,'editorial-photo']]){
 const inputs=collectInputs({repoRoot:root,source:'talks/'+deck+'/slides.md'}).inputs;
 const row=await captureSlide(p,'http://127.0.0.1:4336/presentations/'+deck+'/#'+slide,base+'/'+name+'.png',{stageOnly:true});
 if(!await p.evaluate(()=>Boolean(window.StageBlocks&&window.STAGE_MODEL&&window.StageVisual)))throw new Error('Missing runtime');
 if(row.overflow.length||row.diagnostic||row.failures.length||row.errors.length||row.images.some(i=>!i.naturalWidth))throw new Error('Invalid reference capture: '+name);
 observations.push({name,deck,slide,inputs,...row});
 console.log({reference:name,slide});
}
await fs.writeFile(base+'/manifest.json',JSON.stringify({viewport:{width:1920,height:1080,devicePixelRatio:1},method:'Fresh actual rendered examples at the same viewport as the LLM Wiki; not an inherited approval.',observations},null,2)+'\n');
console.log({complete:true,references:observations.length});
