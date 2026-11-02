const fs=await import('node:fs/promises');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/llm-wiki-typography-20261102';
const request=JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const out=base+'/'+request.round+'/common';await fs.mkdir(out,{recursive:true});
const {prepare,captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const p=(await taskSpace(27)).page('p1');await prepare(p);
const observations=[];
for(const [deck,slide,role] of [
 ['product-notes',3,'other-topic-table'],['product-notes',7,'other-topic-steps'],['product-notes',4,'other-topic-bright-authored-document'],
 ['product-notes',2,'actual-color-stock-photo'],['product-notes',5,'existing-quote'],['team-learning',6,'photo-and-editorial-copy'],
 ['community-exhibit',5,'mixed-bento'],['community-exhibit',6,'other-topic-document'],['llm-wiki',13,'document-question-and-steps']
]){
 const row=await captureSlide(p,'http://127.0.0.1:4330/presentations/'+deck+'/#'+slide,out+'/'+deck+'-'+slide+'.png',{stageOnly:true});
 if(row.overflow.length||row.diagnostic||row.failures.length||row.errors.length||row.images.some(img=>!img.naturalWidth))throw new Error('Representative failed: '+role);
 observations.push({role,...row});
}
await p.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
for(const [deck,slide]of[['llm-wiki',17],['product-notes',5]]){
 const row=await captureSlide(p,'http://127.0.0.1:4330/presentations/'+deck+'/#'+slide,out+'/reduced-'+deck+'-'+slide+'.png',{stageOnly:true});
 row.motion=await p.evaluate(()=>({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,animations:document.getAnimations().length,names:[...document.querySelectorAll('.slide.is-active,.slide.is-active *')].map(el=>getComputedStyle(el).animationName).filter(n=>n!=='none')}));
 if(!row.motion.reduced||row.motion.animations||row.motion.names.length)throw new Error('Reduced-motion regression');
 observations.push({role:'reduced-motion',...row});
}
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
await p.goto('http://127.0.0.1:4330/presentations/product-notes/read.html#5');
await p.waitForFunction(()=>document.querySelectorAll('#slideStage .slide').length===8&&document.querySelector('.slide[data-index="4"]').getBoundingClientRect().top>=90&&document.querySelector('.slide[data-index="4"]').getBoundingClientRect().top<94);
await p.screenshot({path:out+'/other-topic-quote-read-390.png'});
observations.push(await p.evaluate(()=>({role:'other-topic-reading',viewport:{width:innerWidth,height:innerHeight},documentWidth:document.documentElement.scrollWidth,quote:document.querySelector('.slide[data-index="4"] blockquote').textContent})));
await p.cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
await fs.writeFile(out+'/verification.json',JSON.stringify({observations},null,2)+'\n');console.log({complete:true,out,observations:observations.length});
