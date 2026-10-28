// Resume the same TaskSpace after the Ego helper child executable rejected a Node CLI script.
const fs=await import('node:fs/promises'),cp=await import('node:child_process'),assert=(await import('node:assert/strict')).default;
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',out=root+'/research/reusable-layouts-20261028/evidence';
const {prepare,captureSlide}=await import('file://'+out+'/browser-helpers.mjs'),task=await taskSpace(62),p=task.page('p1');await prepare(p);const results={before:[],after:[]};
const phase=name=>cp.execFileSync('/Users/ou9999-wdl/.nvm/versions/node/v24.22.1/bin/node',[out+'/authoring-check.cjs',name],{encoding:'utf8',cwd:root});
try{
 for(let n=1;n<=4;n++)results.before.push(await captureSlide(p,'http://127.0.0.1:4325/flexible/#'+n,null));
 assert.equal(results.before[0].images.length,2);assert.equal(results.before[1].tiles.length,5);assert.equal(results.before[2].tiles.length,5);
 await p.goto('http://127.0.0.1:4325/flexible/#2');await p.waitForSelector('.is-active .md-tile');phase('edit');
 await p.waitForFunction(()=>window.PRESENTATION.slides[1].blocks.filter(n=>n.tag==='h2').length===8&&document.querySelector('.is-active .md-value-number')?.textContent==='31');results.autoReloadObserved=true;
 for(let n=1;n<=4;n++)results.after.push(await captureSlide(p,'http://127.0.0.1:4325/flexible/#'+n,n===2?out+'/screens/authored-bento-8.png':null,{stageOnly:true}));
 assert.equal(results.after[0].images.length,3);assert.equal(results.after[1].tiles.length,8);assert.equal(results.after[2].tiles.length,12);assert(results.after[2].text.includes('다시 확인할 역할'));assert.notEqual(results.before[3].images[0].src,results.after[3].images[0].src);
 await p.goto('http://127.0.0.1:4325/flexible/#2');await p.waitForSelector('.is-active .md-tile');phase('break');await p.waitForSelector('#__stage_error');results.buildError=await p.evaluate(()=>({message:document.querySelector('#__stage_error').textContent,lastGoodValue:document.querySelector('.is-active .md-value-number').textContent}));assert.equal(results.buildError.lastGoodValue,'31');
 phase('recover');await p.waitForFunction(()=>!document.getElementById('__stage_error')&&document.querySelector('.is-active .md-value-number')?.textContent==='31');phase('verify');results.lastGoodPreserved=true;
 await fs.writeFile(out+'/authoring-browser.json',JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({before:results.before.map(x=>[x.images.length,x.tiles.length]),after:results.after.map(x=>[x.images.length,x.tiles.length]),autoReloadObserved:results.autoReloadObserved,lastGoodPreserved:results.lastGoodPreserved,overflows:results.after.flatMap(x=>x.overflow),errors:results.after.flatMap(x=>x.errors)}));
}finally{await p.cdp('Emulation.clearDeviceMetricsOverride');}
