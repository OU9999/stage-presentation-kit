const fs=await import('node:fs/promises');const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',out=root+'/research/reusable-layouts-20261028/evidence';
const {prepare,captureSlide}=await import('file://'+out+'/browser-helpers.mjs'),task=await taskSpace(62),p=task.page('p1');await prepare(p);
const results={paper:[],contrast:[],read:[]};
const contrast=()=>{
 const active=document.querySelector('#slideStage .is-active'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=canvas.height=1;
 const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].map(x=>x/255);};
 const luminance=rgb=>rgb.slice(0,3).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
 const ratio=(fg,bg)=>{let a=luminance(rgba(fg)),b=luminance(rgba(bg));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
 const backgrounds=node=>{let current=node;while(current){const color=getComputedStyle(current).backgroundColor;if(rgba(color)[3]>.99)return color;current=current.parentElement;}return 'black';};
 return {theme:document.body.dataset.theme,icons:[...active.querySelectorAll('.md-wall-icon:has(svg)')].map(node=>({tone:node.closest('[data-tone]')?.dataset.tone,color:getComputedStyle(node).color,background:getComputedStyle(node).backgroundColor,ratio:ratio(getComputedStyle(node).color,getComputedStyle(node).backgroundColor)})),tileText:[...active.querySelectorAll('.md-tile > h2,.md-tile > p,.md-tile > blockquote,.md-tile-icon')].map(node=>({text:node.textContent,color:getComputedStyle(node).color,background:backgrounds(node),ratio:ratio(getComputedStyle(node).color,backgrounds(node))}))};
};
try{
 for(const theme of ['stage','paper'])for(const [name,url] of [['exhibit-05','presentations/community-exhibit/#5'],['wall-22','research/reusable-layouts-20261028/evidence/check-deck/#15']]){
  const observation=await captureSlide(p,'http://127.0.0.1:4323/'+url,theme==='paper'?out+'/screens/'+name+'-paper.png':null,{stageOnly:true,theme});results.contrast.push({name,...await p.evaluate(contrast)});if(theme==='paper')results.paper.push(observation);
 }
 for(const [name,url] of [['photo-02','presentations/photo-essay/#2'],['photo-03','presentations/photo-essay/#3'],['photo-05','presentations/photo-essay/#5'],['exhibit-07','presentations/community-exhibit/#7'],['exhibit-08','presentations/community-exhibit/#8'],['bento-8','research/reusable-layouts-20261028/evidence/check-deck/#9']])results.paper.push(await captureSlide(p,'http://127.0.0.1:4323/'+url,out+'/screens/'+name+'-paper.png',{stageOnly:true,theme:'paper'}));
 await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 for(const deck of ['photo-essay','community-exhibit']){
  await p.goto('http://127.0.0.1:4323/presentations/'+deck+'/read.html#5');await p.waitForSelector('body[data-mode="read"]');await p.waitForFunction(()=>document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete));await p.waitForFunction(()=>Math.abs(document.querySelector('#slideStage > :nth-child(5)').getBoundingClientRect().top-92)<2);
  const read=await p.evaluate(()=>{
   const clean=x=>x.replace(/\s+/g,' ').trim(),nodeText=node=>!node?'':node.type==='text'?node.value:(node.children||[]).map(nodeText).join('');
   return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,hash:location.hash,hashTop:document.querySelector('#slideStage > :nth-child(5)').getBoundingClientRect().top,slides:[...document.querySelectorAll('#slideStage > article')].map((slide,i)=>{const source=window.PRESENTATION.slides[i],body=slide.querySelector('.slide-body').cloneNode(true);body.querySelectorAll('figcaption,.md-wall-caption,svg').forEach(n=>n.remove());return {number:i+1,matches:clean(body.textContent)===clean(nodeText(source.heading)+source.blocks.map(nodeText).join('')),images:[...slide.querySelectorAll('img')].map(img=>({alt:img.alt,naturalWidth:img.naturalWidth,fit:getComputedStyle(img).objectFit,filter:getComputedStyle(img).filter,width:img.getBoundingClientRect().width})),links:[...slide.querySelectorAll('.slide-body a')].map(a=>({text:a.textContent,href:a.getAttribute('href')}))};}),storage:window.__renewalStorage,errors:window.__renewalErrors};
  });results.read.push({deck,...read});await p.screenshot({path:out+'/screens/'+deck+'-read-mobile.png'});
 }
 await p.goto('http://127.0.0.1:4323/research/reusable-layouts-20261028/evidence/check-deck/read.html#17');await p.waitForSelector('body[data-mode="read"]');
 results.warningRead=await p.evaluate(()=>({slides:document.querySelectorAll('#slideStage > article').length,text:[17,18,19].map(n=>document.querySelector('#slideStage > :nth-child('+n+') .slide-body').textContent),warningCount:document.querySelectorAll('[data-composition-warning]').length,horizontalOverflow:document.documentElement.scrollWidth>innerWidth}));
 await fs.writeFile(out+'/themes-read-browser.json',JSON.stringify(results,null,2)+'\n');
 console.log(JSON.stringify({paper:results.paper.length,overflows:results.paper.flatMap(x=>x.overflow),read:results.read.map(x=>({deck:x.deck,slides:x.slides.length,mismatches:x.slides.filter(s=>!s.matches).length,horizontalOverflow:x.scrollWidth>x.width,hashTop:x.hashTop,storage:x.storage.length,errors:x.errors})),iconContrast:results.contrast.map(x=>({name:x.name,theme:x.theme,min:x.icons.length?Math.min(...x.icons.map(i=>i.ratio)):null})),warningRead:results.warningRead.warningCount}));
}finally{await p.cdp('Emulation.clearDeviceMetricsOverride');}
