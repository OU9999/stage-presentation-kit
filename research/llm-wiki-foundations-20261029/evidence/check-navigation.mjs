import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';

const dir=fileURLToPath(new URL('./',import.meta.url));
const site=globalThis.FOUNDATIONS_QA_BASE || 'http://127.0.0.1:4323/';
const prefix=site.startsWith('https:')?'public-':'';
const base=site+'presentations/llm-wiki/';
const scope={window:{}};
vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const deck=scope.window.PRESENTATION,revision=deck.document.revision,count=deck.slides.length;
const p=(await taskSpace(108)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.goto(base+'index.html?flow='+revision+'#1');
await p.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='0');
if(await p.evaluate(()=>window.PRESENTATION.document.revision)!==revision)throw new Error('Stale deck');
const reveal=[];
const transitions=[];
for(let from=1;from<=count;from++){
 await p.goto(base+'index.html?links='+revision+'#'+from);
 await p.waitForFunction(i=>document.querySelector('#slideStage .is-active')?.dataset.index===String(i-1),from);
 const targets=await p.evaluate(()=>[...new Set([...document.querySelectorAll('#slideStage .is-active a[href^="#"]')].map(a=>Number(a.getAttribute('href').slice(1))))]);
 for(const to of targets){if(!Number.isInteger(to)||to<1||to>count)throw new Error('Invalid local slide target');transitions.push([from,to]);}
}
for(const [from,to] of transitions){
  await p.goto(base+'index.html?flow='+revision+'#'+from);
  await p.waitForFunction(i=>document.querySelector('#slideStage .is-active')?.dataset.index===String(i-1),from);
  const labels=await p.evaluate(to=>[...document.querySelectorAll('#slideStage .is-active a[href="#'+to+'"]')].map(a=>a.textContent),to);
  if(!labels.length)throw new Error(`Missing real interaction ${from} to ${to}`);
  for(let option=0;option<labels.length;option++){
    if(option){await p.goto(base+'index.html?flow='+revision+'#'+from);await p.waitForFunction(i=>document.querySelector('#slideStage .is-active')?.dataset.index===String(i-1),from);}
    await p.click('#slideStage .is-active a[href="#'+to+'"] >> nth='+option);
    await p.waitForFunction(i=>location.hash==='#'+i&&document.querySelector('#slideStage .is-active')?.dataset.index===String(i-1),to);
    reveal.push({from,to,label:labels[option],actual:await p.url()});
  }
}
await p.click('[data-action="overview"]');await p.waitForFunction(()=>!document.getElementById('overviewDialog').hidden);
const overview=await p.evaluate(()=>({count:document.querySelectorAll('#overviewGrid .overview-card').length,links:document.querySelectorAll('#overviewGrid .overview-thumb a').length}));
await p.click('#overviewGrid .overview-card[data-slide="1"]');
const opening=p.waitForEvent('popup');await p.click('[data-action="presenter"]');const popup=await opening;
await popup.waitForFunction(()=>document.querySelectorAll('#presenterCurrent .slide').length===1&&document.querySelectorAll('#presenterNext .slide').length===1);
await popup.click('[data-action="next"]');await p.waitForFunction(()=>location.hash==='#3');
await p.cdp('Page.bringToFront');await p.keyboard.press('ArrowLeft');
await popup.waitForFunction(()=>document.querySelector('#presenterCurrent .slide')?.dataset.index==='1');await popup.close();
await p.click('.stage-document-links a[href="materials/index.html"]');await p.waitForSelector('.material-content');
await p.click('.material-content a[href="speaker-script.html"] >> nth=0');await p.waitForSelector('.material-content');
const last=await p.evaluate(()=>[...document.querySelectorAll('.material-sidebar .material-toc a')].find(a=>/^40장/.test(a.textContent))?.getAttribute('href'));
if(!last)throw new Error('Speaker script does not cover slide 40');
await p.focus('.material-sidebar .material-toc a[href="'+last+'"]');await p.keyboard.press('Enter');
await p.waitForFunction(id=>document.getElementById(id).getBoundingClientRect().top<innerHeight/2,decodeURIComponent(last.slice(1)));
await p.click('.material-content a[href="../read.html#40"] >> nth=0');
await p.waitForFunction(()=>document.body.dataset.mode==='read'&&location.hash==='#40');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await p.goto(base+'read.html?flow='+revision+'#9');
await p.waitForFunction(n=>document.fonts.status==='loaded'&&document.querySelectorAll('#slideStage .slide').length===n&&[...document.querySelectorAll('#slideStage img')].every(e=>e.complete),count);
function fragments(node){
  if(!node)return [];
  if(node.type==='text')return [node.value];
  return (node.children||[]).flatMap(fragments);
}
const sourceText=deck.slides.map(s=>s.layout==='blocks'?[...fragments(s.heading),...s.blocks.flatMap(fragments)].filter(s=>s?.trim()):[s.title,s.subtitle,s.source,...(s.visual?.labels||[]),...(s.visual?.items||[]).map(i=>typeof i==='string'?i:i.label)].filter(s=>typeof s==='string'&&s.trim()));
const mobile=await p.evaluate(expected=>{
  const clean=s=>s.replace(/\s+/g,'');const missing=[];
  for(let i=0;i<expected.length;i++){
    const text=clean(document.querySelector('#slideStage .slide[data-index="'+i+'"]').textContent);let cursor=0;
    for(const fragment of expected[i]){const value=clean(fragment),at=text.indexOf(value,cursor);if(at<0)missing.push({slide:i+1,text:fragment.slice(0,90)});else cursor=at+value.length;}
  }
  const paragraphs=[...document.querySelectorAll('#slideStage .markdown-body p')].filter(e=>!e.closest('blockquote,figcaption')).map(e=>parseFloat(getComputedStyle(e).fontSize));
  return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,count:document.querySelectorAll('#slideStage .slide').length,missing,paragraphs,images:[...document.querySelectorAll('#slideStage img')].map(e=>({alt:e.alt,fit:getComputedStyle(e).objectFit,width:e.naturalWidth})),header:[...document.querySelector('.app-header').children].map(e=>{const r=e.getBoundingClientRect();return{left:r.left,right:r.right};})};
},sourceText);
await p.evaluate(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);document.querySelector('#slideStage .slide[data-index="8"]').scrollIntoView({behavior:'instant',block:'start'});});
await p.waitForFunction(()=>{const y=document.querySelector('#slideStage .slide[data-index="8"]').getBoundingClientRect().top;return y>0&&y<160;});
await p.screenshot({path:dir+'screens/'+prefix+'mobile-read.png'});
const result={revision,count,reveal,overview,presenterBothDirections:true,stageToMaterialsToScriptToRead:true,mobile};
await fs.writeFile(dir+prefix+'navigation.json',JSON.stringify(result,null,2)+'\n');console.log({revision,count,interactions:reveal.length,overview,presenterBothDirections:true,mobileWidth:mobile.width,missing:mobile.missing.length});
if(count!==40||overview.count!==count||overview.links||mobile.scrollWidth>390||mobile.missing.length||!mobile.paragraphs.length||mobile.paragraphs.some(n=>n<18)||mobile.images.some(i=>!i.width||!i.alt||i.fit!=='contain')||mobile.header.some(r=>r.left<0||r.right>391))throw new Error('Navigation/mobile QA failed');
