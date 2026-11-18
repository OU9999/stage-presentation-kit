const fs=await import('node:fs/promises');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const home=root+'/research/llm-wiki-design-iteration-20261113';
const request=JSON.parse(await fs.readFile(home+'/capture-request.json','utf8'));
const output=home+'/'+request.round+'/compare';await fs.mkdir(output,{recursive:true});
const {captureSlide}=await import(root+'/research/reusable-layouts-20261028/evidence/browser-helpers.mjs');
const page=(await taskSpace(request.taskSpaceId)).page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
await page.goto('about:blank');const observations=[];
for(const [key,url] of [['bento','/presentations/community-exhibit/#5'],['table','/presentations/product-notes/#3'],['quote','/presentations/product-notes/#5']]){
 const row=await captureSlide(page,'http://127.0.0.1:4336'+url,null);
 if(row.diagnostic||row.errors.length||row.failures.length||row.overflow.length||row.images.some(i=>!i.naturalWidth))throw new Error('Reference example rendering failed');
 row.viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight,devicePixelRatio}));
 row.filename=output+'/'+key+'.png';await page.screenshot({path:row.filename,clip:{x:row.stage.x,y:row.stage.y,width:row.stage.width,height:row.stage.height}});
 observations.push(row);
}
await fs.writeFile(output+'/manifest.json',JSON.stringify({scope:'Current local reference examples, browser smoke and comparison; no visual approval assigned.',observations},null,2)+'\n');
console.log({references:observations.length,renderingErrors:0});
