const fs=await import('node:fs/promises');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',out=root+'/research/reusable-layouts-20261028/evidence';
const {prepare,captureSlide}=await import('file://'+out+'/browser-helpers.mjs');
await fs.mkdir(out+'/screens',{recursive:true});
const task=await taskSpace(62),p=task.page('p1'),observations=[];
await prepare(p);
try{
 for(const [deck,prefix,count] of [['photo-essay','photo',8],['community-exhibit','exhibit',9]])for(let n=1;n<=count;n++){
  const observation=await captureSlide(p,'http://127.0.0.1:4323/presentations/'+deck+'/#'+n,out+'/screens/'+prefix+'-'+String(n).padStart(2,'0')+'.png',{stageOnly:true});
  const semantic=await p.evaluate(()=>{
   const active=document.querySelector('#slideStage .is-active'),source=window.PRESENTATION.slides[Number(active.dataset.index)];
   const nodeText=node=>!node?'':node.type==='text'?node.value:(node.children||[]).map(nodeText).join('');
   const body=active.querySelector('.slide-body').cloneNode(true);body.querySelectorAll('figcaption,.md-wall-caption,svg').forEach(node=>node.remove());
   const clean=value=>value.replace(/\s+/g,' ').trim();
   return {sourceTextMatches:clean(body.textContent)===clean(nodeText(source.heading)+source.blocks.map(nodeText).join('')),renderedText:clean(body.textContent),expectedText:clean(nodeText(source.heading)+source.blocks.map(nodeText).join(''))};
  });
  observations.push({deck,number:n,...observation,...semantic});
  await fs.writeFile(out+'/stories-browser.json',JSON.stringify(observations,null,2)+'\n');
 }
 console.log(JSON.stringify({slides:observations.length,overflows:observations.filter(x=>x.overflow.length).map(x=>[x.deck,x.number,x.overflow]),imageFailures:observations.flatMap(x=>x.images.filter(i=>!i.complete||!i.naturalWidth||i.box.width<=1||i.box.height<=1)),semanticFailures:observations.filter(x=>!x.sourceTextMatches).map(x=>[x.deck,x.number]),runtimeErrors:observations.flatMap(x=>x.errors),warnings:observations.filter(x=>x.diagnostic).map(x=>[x.deck,x.number,x.diagnostic])}));
}finally{await p.cdp('Emulation.clearDeviceMetricsOverride');}
