const fs=await import('node:fs/promises');
const base='/Users/ou9999-wdl/Documents/devday-presentation-kit/research/devday-fidelity-20261116';
const req=JSON.parse(await fs.readFile(base+'/capture-request.json','utf8'));
const page=(await taskSpace(req.taskSpaceId)).page('p1');
const manifest=JSON.parse(await fs.readFile(base+'/evidence/'+req.round+'/present-1280/manifest.json','utf8'));
const out=base+'/evidence/'+req.round+'/reading-probe';await fs.mkdir(out,{recursive:true});
const result={complete:false,scope:'Actual reading/support smoke; no aesthetic approval or full native-read review.',hashes:manifest.hashes,native:[],links:[],readingEnd:[]};
const save=()=>fs.writeFile(out+'/actions.json',JSON.stringify(result,null,2)+'\n');
for(const width of [390,1440]){
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:false});
 const reading=req.url+'read.html?probe='+manifest.revision.slice(0,12);
 const ready=()=>page.waitForFunction(revision=>window.PRESENTATION?.document?.revision===revision&&document.body.dataset.mode==='read'&&document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete&&i.naturalWidth>0),manifest.revision,{timeout:20000});
 await page.goto('about:blank');await page.goto(reading+'#4');await ready();
 await page.evaluate(()=>document.querySelector('#slideStage .slide[data-index="3"] blockquote').scrollIntoView({block:'center',behavior:'instant'}));
 await page.waitForFunction(()=>{const r=document.querySelector('#slideStage .slide[data-index="3"] blockquote')?.getBoundingClientRect();return r&&r.y>=0&&r.bottom<=innerHeight;},undefined,{timeout:10000});
 const state=await page.evaluate(()=>{
  const s=document.querySelector('#slideStage .slide[data-index="3"]'),q=s.querySelector('blockquote'),p=q?.querySelector('p'),r=q?.getBoundingClientRect();
  return{url:location.href,width:innerWidth,height:innerHeight,dpr:devicePixelRatio,documentWidth:document.documentElement.scrollWidth,quoteTag:q?.tagName,quoteText:q?.innerText,quoteFont:p?getComputedStyle(p).fontSize:null,quoteSourceLine:q?.dataset.sourceLine,quoteBox:r?.toJSON(),nativeBody:[...s.querySelectorAll('.md-copy>p')].map(p=>({text:p.innerText,fontSize:getComputedStyle(p).fontSize,sourceLine:p.dataset.sourceLine})),supportCount:document.querySelectorAll('.markdown-support a').length};
 });
 const canon='도구 설치보다 목차와 연결을 따라 다음 질문의 근거를 찾는 경험을 먼저 하고 싶다.';
 if(state.documentWidth!==width||state.width!==width||state.dpr!==1||state.supportCount!==4||state.quoteTag!=='BLOCKQUOTE'||!state.quoteSourceLine||parseFloat(state.quoteFont)<18||state.quoteText.replace(/\s/g,'')!==canon.replace(/\s/g,''))throw Error('Native quote/width mismatch: '+JSON.stringify(state));
 const screenshot=out+'/native-04-'+width+'.png';await page.screenshot({path:screenshot});result.native.push({...state,screenshot});await save();
 for(let i=0;i<4;i++){
  // A fresh document avoids clicking while the previous hash's smooth scroll is still moving.
  await page.goto('about:blank');await page.goto(reading+'#'+(i+1));await ready();
  const selector='#slideStage .slide[data-index="'+i+'"] .markdown-support a';
  await page.waitForSelector(selector,{state:'visible'});
  if(i===3){
   // Inspect the actual final document viewport and footer clearance after a wheel scroll.
   await page.mouse.move(width/2,420,{label:'Inspect final reading viewport'});
   await page.mouse.wheel(0,700,{label:'Read document through end'});
   await page.waitForFunction(sel=>{const a=document.querySelector(sel),r=a.getBoundingClientRect(),f=[...document.querySelectorAll('footer')].map(x=>x.getBoundingClientRect()).find(x=>x.height>0&&x.y>0);return r.y>70&&r.bottom<(f?f.y:innerHeight);},selector,{timeout:5000});
   result.readingEnd.push(await page.evaluate(sel=>{const a=document.querySelector(sel),r=a.getBoundingClientRect();return{width:innerWidth,scrollY,scrollHeight:document.documentElement.scrollHeight,innerHeight,linkRect:r.toJSON(),centerHitsLink:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('a')===a};},selector));
  }
  const departure=await page.evaluate(sel=>{const a=document.querySelector(sel);return{label:a.textContent,href:a.href,fontSize:getComputedStyle(a).fontSize};},selector);
  if(parseFloat(departure.fontSize)<18)throw Error('Support too small');
  await page.click(selector,{label:'Read source passage'});
  await page.waitForFunction(href=>location.href===href,departure.href,{timeout:15000});
  const destination=await page.evaluate(()=>{const id=decodeURIComponent(location.hash.slice(1)),h=document.getElementById(id);return{url:location.href,anchor:id,heading:h?.textContent,anchorY:h?.getBoundingClientRect().y,documentWidth:document.documentElement.scrollWidth,width:innerWidth,fontSize:getComputedStyle(document.body).fontSize};});
  if(!destination.heading||destination.documentWidth!==width||destination.anchorY<0||destination.anchorY>900)throw Error('Wrong public destination: '+JSON.stringify(destination));
  const screenshot=out+'/support-'+String(i+1).padStart(2,'0')+'-'+width+'.png';await page.screenshot({path:screenshot});
  result.links.push({slide:i+1,width,departure,destination,screenshot});await save();
 }
}
result.complete=true;await save();console.log({complete:true,round:req.round,nativeViews:result.native.length,directSupport:result.links.length});
