// Actual public navigation, selection, and deck keyboard checks in the root TaskSpace.
const fs=await import('node:fs/promises'),crypto=await import('node:crypto');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const home=root+'/research/devday-fidelity-20261116';
const request=JSON.parse(await fs.readFile(home+'/main-capture-request.json','utf8'));
const output=home+'/'+request.round+'/technical';await fs.mkdir(output,{recursive:true});
const manifest=JSON.parse(await fs.readFile(home+'/'+request.round+'/present-1280/manifest.json','utf8'));
const revision=manifest.revision,count=manifest.observations.length;
const {createRequire}=await import('node:module');
const require=createRequire(root+'/package.json');
const sourceDeck=require(root+'/lib/markdown-document.cjs').parseDocument(await fs.readFile(root+'/talks/llm-wiki/slides.md','utf8'));
const {collectMaterialLineMetrics}=await import(home+'/reading-line-metrics-current.mjs');
const supports=sourceDeck.slides.flatMap((slide,index)=>slide.view?.support?[{slide:index+1,...slide.view.support}]:[]);
if(sourceDeck.slides.length!==count||!supports.length)throw Error('Current source and support inventory must be present');
const page=(await taskSpace(request.taskSpaceId)).page('p1');
await page.cdp('Network.enable');await page.cdp('Network.setCacheDisabled',{cacheDisabled:true});
const saveSnapshot=async(name,options)=>{const state=await page.snapshot(options);await fs.writeFile(output+'/'+name,typeof state==='string'?state:JSON.stringify(state,null,2));};
const results={complete:false,revision,hashes:manifest.hashes,selections:[],links:[],directSupport:[],navigation:[],materials:[]};
const origin='http://127.0.0.1:'+request.port;
for(const width of [390,1440]){
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:false});
 for(const support of supports){
  await page.goto('about:blank');await page.goto(origin+'/presentations/llm-wiki/read.html?direct-support='+revision.slice(0,12)+'-'+width+'#'+support.slide);
  await page.waitForFunction(({revision,count})=>window.PRESENTATION?.document.revision===revision&&document.querySelectorAll('#slideStage .slide').length===count&&document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete&&i.naturalWidth>0),{revision,count});
  const selector='.slide[data-index="'+(support.slide-1)+'"] .markdown-support a';
  await page.waitForSelector(selector,{state:'visible'});
  const departure=await page.evaluate(sel=>{const a=document.querySelector(sel);return{href:a.href,label:a.textContent,width:innerWidth};},selector);
  const expected=new URL(support.href.replace(/\.md(?=#|$)/,'.html'),origin+'/presentations/llm-wiki/read.html').href;
  if(departure.href!==expected||departure.width!==width)throw Error('Adjacent native support has the wrong target');
  await saveSnapshot('support-'+String(support.slide).padStart(2,'0')+'-'+width+'.txt');
  if(support.slide===15){
   // The first automatic click was intercepted by the fixed footer. Keep UI intact,
   // center the now-observed native link, then perform a real pointer click.
   await page.evaluate(sel=>document.querySelector(sel).scrollIntoView({block:'center',behavior:'instant'}),selector);
   await page.waitForFunction(sel=>{const a=document.querySelector(sel),r=a.getBoundingClientRect(),f=document.querySelector('.presenter-bar').getBoundingClientRect();return r.y>76&&r.bottom<f.y;},selector);
  }
  await page.click(selector,{label:'자료의 읽기 본문 열기'});
  await page.waitForFunction(({expected,notesRevision})=>{const h=document.getElementById(decodeURIComponent(location.hash.slice(1))),b=h?.getBoundingClientRect();return location.href===expected&&Boolean(document.querySelector('.material-article'))&&document.fonts.status==='loaded'&&document.body.dataset.revision===notesRevision&&b&&b.y>=0&&b.y<innerHeight;},{expected,notesRevision:manifest.hashes['talks/llm-wiki/materials/keynote-notes.md']});
  const destination=await page.evaluate(()=>{const anchor=decodeURIComponent(location.hash.slice(1)),h=document.getElementById(anchor),b=h?.getBoundingClientRect();return{sourcePath:document.body.dataset.source,url:location.href,anchor,anchorExists:Boolean(h),anchorY:b?.y,viewport:{width:innerWidth,height:innerHeight},documentWidth:document.documentElement.scrollWidth,text:document.querySelector('.material-article').textContent};});
  destination.paragraphs=await page.evaluate(collectMaterialLineMetrics);
  if(!destination.anchorExists||destination.viewport.width!==width||destination.documentWidth!==width||destination.anchorY<0||destination.anchorY>=destination.viewport.height)throw Error('Native support anchor is missing or not in view');
  destination.screenshot=output+'/direct-support-'+String(support.slide).padStart(2,'0')+'-'+width+'.png';await page.screenshot({path:destination.screenshot});
  results.directSupport.push({slide:support.slide,width,departure,destination});
  await fs.writeFile(output+'/actions-partial.json',JSON.stringify(results,null,2)+'\n');
 }
 await page.goto('about:blank');await page.goto(origin+'/presentations/llm-wiki/read.html?actions='+revision.slice(0,12)+'-'+width+'#7');
 await page.waitForFunction(({revision,count})=>window.PRESENTATION?.document.revision===revision&&document.querySelectorAll('#slideStage .slide').length===count&&document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete&&i.naturalWidth>0),{revision,count});
 await saveSnapshot('reading-start-'+width+'.txt');
 await page.click('.stage-document-links a[href="materials/index.html"]',{label:'키노트 공개 자료 열기'});
 await page.waitForFunction(()=>location.pathname.endsWith('/materials/index.html')&&Boolean(document.querySelector('.material-article')));
 await saveSnapshot('materials-index-'+width+'.txt',{scope:'full_page'});
 const notesLink=await page.evaluate(()=>{const a=document.querySelector('.material-article a[href="keynote-notes.html"]');if(!a)throw Error('Actual public notes link missing');return{text:a.textContent,href:a.href};});
 await page.click('.material-article a[href="keynote-notes.html"] >> nth=0',{label:'편집한 내용의 전체 해설 읽기'});
 await page.waitForFunction(()=>location.pathname.endsWith('/keynote-notes.html')&&Boolean(document.querySelector('.material-article'))&&document.fonts.status==='loaded');
 const notes=await page.evaluate(()=>({url:location.href,title:document.title,text:document.querySelector('.material-article').textContent,viewport:{width:innerWidth,height:innerHeight},documentWidth:document.documentElement.scrollWidth,headings:[...document.querySelectorAll('.material-article h2,.material-article h3')].map(h=>({id:h.id,text:h.textContent})),links:[...document.querySelectorAll('.material-article a')].map(a=>({href:a.getAttribute('href'),text:a.textContent}))}));
 if(notes.documentWidth!==width||notes.text.includes('\uFFFD'))throw Error('Public notes overflow or decoding failure');
 results.links.push({departure:notesLink,destination:notes.url,width});
 results.materials.push(notes);
 await fs.writeFile(output+'/actions-partial.json',JSON.stringify(results,null,2)+'\n');
 await page.screenshot({path:output+'/notes-top-'+width+'.png'});
 await saveSnapshot('notes-'+width+'.txt',{scope:'full_page'});
 for(const id of ['원자료와-작업-약속','요약과-기존-문서의-관계','활동안과-미확인-범위','시작-요청과-선택-기준']){
  await page.evaluate(id=>{const h=document.getElementById(id);if(!h)throw Error('Required public anchor missing: '+id);h.scrollIntoView({block:'start',behavior:'instant'});},id);
  await page.screenshot({path:output+'/notes-'+id+'-'+width+'.png'});
 }
 if(width===390){
  results.materialTables=[];
  for(const [anchor,key] of [['계획이-바뀐-근거','plan-change'],['활동안과-미확인-범위','activity']]){
   const selector='xpath=//*[@id="'+anchor+'"]/following-sibling::div[contains(@class,"material-table-scroll")][1]';
   await page.hover(selector,{label:'원문의 실제 표 읽기'});
   const state=await page.evaluate(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;if(!el)throw Error('Native material table missing');el.scrollLeft=0;return{clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,before:el.scrollLeft};},anchor);
   await page.screenshot({path:output+'/notes-'+key+'-table-left-390.png'});
   await page.focus(selector);await page.press(selector,'ArrowRight');
   if(state.scrollWidth>state.clientWidth)await page.waitForFunction(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;return el.scrollLeft>0;},anchor,{timeout:5000});
   const keyboardScrollLeft=await page.evaluate(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;return el.scrollLeft;},anchor);
   await page.evaluate(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;el.scrollTo({left:el.scrollWidth,behavior:'instant'});},anchor);
   await page.waitForFunction(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;return Math.abs(el.scrollLeft-(el.scrollWidth-el.clientWidth))<1;},anchor);
   const moved=await page.evaluate(id=>{let el=document.getElementById(id);while(el&&!el.classList.contains('material-table-scroll'))el=el.nextElementSibling;return el.scrollLeft;},anchor);
   results.materialTables.push({key,anchor,...state,keyboardScrollLeft,after:moved});
   await page.screenshot({path:output+'/notes-'+key+'-table-right-390.png'});
  }
 }
 const selected=await page.evaluate(()=>{let pre=document.getElementById('시작-요청과-선택-기준');while(pre&&!pre.matches('pre'))pre=pre.nextElementSibling;if(!pre)throw Error('Copyable request missing');pre.scrollIntoView({behavior:'instant',block:'start'});const range=document.createRange();range.selectNodeContents(pre);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);return{text:pre.textContent,selected:selection.toString(),width:innerWidth,scrollWidth:pre.scrollWidth,clientWidth:pre.clientWidth};});
 selected.terminalNewlineOmitted=selected.text.endsWith('\n')&&!selected.selected.endsWith('\n');
 if(selected.text.replace(/\r?\n$/,'')!==selected.selected.replace(/\r?\n$/,'')||!selected.selected.includes('선택 이유')||!selected.selected.includes('내 목적'))throw Error('The complete request was not selectable');
 results.selections.push(selected);await page.screenshot({path:output+'/request-selected-'+width+'.png'});
 await fs.writeFile(output+'/actions-partial.json',JSON.stringify(results,null,2)+'\n');
 // Follow the original example pack, rather than relying on a filesystem check.
 await page.evaluate(()=>{getSelection().removeAllRanges();document.querySelector('.material-article a[href$=".txt"]').scrollIntoView({block:'center',behavior:'instant'});});
 await page.click('.material-article a[href$=".txt"] >> nth=0',{label:'원래 예제 팩 전문 확인'});
 await page.waitForFunction(()=>location.pathname.endsWith('.txt')&&document.body.innerText.includes('LLM Wiki'));
 const pack=await page.evaluate(()=>({url:location.href,text:document.body.innerText,charset:document.characterSet}));
 if(pack.text.includes('\uFFFD')||!pack.text.includes('raw/context-note.md'))throw Error('Original pack was not readable');
 results.links.push({kind:'original-pack',width,...pack});
}
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:720,deviceScaleFactor:1,mobile:false});
await page.goto('about:blank');await page.goto(origin+'/presentations/llm-wiki/?actions=keyboard-'+revision.slice(0,12)+'#1');
await page.waitForFunction(revision=>window.PRESENTATION?.document.revision===revision&&Number(document.querySelector('.slide.is-active')?.dataset.index)===0,revision);
for(let index=0;index<count;index++){
 if(index)await page.keyboard.press('ArrowRight');
 await page.waitForFunction(index=>Number(document.querySelector('.slide.is-active')?.dataset.index)===index,index);
 results.navigation.push(await page.evaluate(()=>({slide:Number(document.querySelector('.slide.is-active').dataset.index)+1,hash:location.hash,theme:document.body.dataset.theme})));
}
await page.keyboard.press('Home');await page.waitForFunction(()=>location.hash==='#1');
await page.keyboard.press('End');await page.waitForFunction(count=>location.hash==='#'+count,count);
await saveSnapshot('deck-end.txt');
await page.click('[data-action="overview"]',{label:'편집한 전체 흐름 확인'});await page.waitForSelector('#overviewDialog:not([hidden])');
results.overviewCount=await page.evaluate(()=>document.querySelectorAll('#overviewGrid .overview-card').length);
if(results.overviewCount!==count)throw Error('Overview inventory mismatch');
const target=Math.floor(count/2);
await page.click('#overviewGrid [data-slide="'+target+'"]',{label:'전체 보기에서 장 이동'});
await page.waitForFunction(target=>location.hash==='#'+(target+1)&&document.querySelector('#overviewDialog').hidden,target);
results.overviewSelected=target+1;results.homeEnd=true;
for(const [name,expected] of Object.entries(manifest.hashes)){
 const actual=crypto.createHash('sha256').update(await fs.readFile(root+'/'+name)).digest('hex');if(actual!==expected)throw Error('Inputs changed: '+name);
}
results.complete=true;await fs.writeFile(output+'/actions.json',JSON.stringify(results,null,2)+'\n');
console.log({complete:true,count,links:results.links.length,selections:results.selections.length,overview:results.overviewCount});
