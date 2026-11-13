const fs=await import('node:fs/promises');
const crypto=await import('node:crypto');
const {createRequire}=await import('node:module');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/ou-presentation-20261113';
const {collectInputs}=createRequire(root+'/package.json')(root+'/scripts/design-review.cjs');
const inputs=collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).inputs;
const task=await taskSpace(77),page=task.page('p1'),results=[];
await page.cdp('Page.addScriptToEvaluateOnNewDocument',{source:'window.__ouErrors=[];addEventListener("error",e=>{if(e.message)window.__ouErrors.push(e.message)});addEventListener("unhandledrejection",e=>window.__ouErrors.push(String(e.reason)));'});
for(const [name,url,width,height] of [
 ['collection','http://127.0.0.1:4336/presentations/',1280,720],
 ['llm-chrome','http://127.0.0.1:4336/presentations/llm-wiki/#6',1280,720],
 ['llm-read-mobile','http://127.0.0.1:4336/presentations/llm-wiki/read.html#17',390,844],
 ['material-mobile','http://127.0.0.1:4336/presentations/llm-wiki/materials/index.html',390,844],
 ['legacy-example','http://127.0.0.1:4336/examples/visual-starter/',1280,720],
 ['portable-stage','http://127.0.0.1:4338/my-talk/',1280,720],
 ['portable-read','http://127.0.0.1:4338/my-talk/read.html',390,844]
]){
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
 await page.goto(url);
 await page.waitForFunction(()=>document.fonts.status==='loaded'&&(!document.querySelector('#slideStage')||document.querySelector('#slideStage .slide'))&&document.getAnimations().every(a=>a.playState==='finished')&&[...(document.body.dataset.mode==='read'?document.querySelectorAll('img'):document.querySelectorAll('#slideStage .is-active img'))].every(i=>i.complete&&i.naturalWidth>0));
 await page.screenshot({path:base+'/'+name+'.png'});
 const row=await page.evaluate(({name,url})=>({name,url,title:document.title,viewport:{width:innerWidth,height:innerHeight},documentWidth:document.documentElement.scrollWidth,brand:document.querySelector('.brand,.material-brand')?.textContent||null,brandFont:document.querySelector('.brand')?getComputedStyle(document.querySelector('.brand')).fontSize:null,slides:document.querySelectorAll('#slideStage .slide').length,brokenVisibleImages:[...(document.body.dataset.mode==='read'?document.querySelectorAll('img'):document.querySelectorAll('#slideStage .is-active img'))].filter(i=>!i.complete||!i.naturalWidth).length,errors:window.__ouErrors||[]}),{name,url});
 if(row.documentWidth>width||row.brokenVisibleImages||row.errors.length)throw new Error(JSON.stringify(row));
 results.push(row);
 if(name==='portable-stage'){
  await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#slideStage .is-active').dataset.index==='1'&&document.getAnimations().every(a=>a.playState==='finished'));
  await page.screenshot({path:base+'/portable-step2.png'});
  await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('#slideStage .is-active').dataset.index==='2'&&document.getAnimations().every(a=>a.playState==='finished'));
  await page.screenshot({path:base+'/portable-step3.png'});
  results.push({name:'portable-keyboard',action:'ArrowRight then End',index:await page.evaluate(()=>document.querySelector('#slideStage .is-active').dataset.index)});
 }
}
if(JSON.stringify(inputs)!==JSON.stringify(collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).inputs))throw new Error('Inputs changed');
await fs.writeFile(base+'/browser-smoke.json',JSON.stringify({inputs,results},null,2)+'\n');
console.log(results);
