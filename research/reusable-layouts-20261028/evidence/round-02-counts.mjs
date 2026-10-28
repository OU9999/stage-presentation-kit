const fs=await import('node:fs/promises');const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',out=root+'/research/reusable-layouts-20261028/evidence';
const {prepare,captureSlide}=await import('file://'+out+'/browser-helpers.mjs'),cases=JSON.parse(await fs.readFile(out+'/cases.json','utf8'));
const task=await taskSpace(62),p=task.page('p1'),results=[];await prepare(p);
try{for(const item of cases){
 const observation=await captureSlide(p,'http://127.0.0.1:4323/research/reusable-layouts-20261028/evidence/check-deck/#'+item.number,item.number<=16?out+'/screens/case-'+String(item.number).padStart(2,'0')+'.png':null,{stageOnly:true});
 results.push({...item,...observation});await fs.writeFile(out+'/counts-browser.json',JSON.stringify(results,null,2)+'\n');
}console.log(JSON.stringify({cases:results.length,compositionMismatch:results.filter(x=>x.composition!==cases[x.number-1].composition).map(x=>[x.id,x.composition]),overflows:results.filter(x=>!x.warning&&x.overflow.length).map(x=>[x.id,x.overflow]),imageFailures:results.flatMap(x=>x.images.filter(i=>!i.naturalWidth||i.box.width<=1||i.box.height<=1)),warnings:results.filter(x=>x.diagnostic).map(x=>[x.id,x.diagnostic]),ratios:results.filter(x=>['portraits','strip'].includes(x.variant)).map(x=>({id:x.id,ratios:x.images.map(i=>i.box.width/i.box.height)}))}));}finally{await p.cdp('Emulation.clearDeviceMetricsOverride');}
