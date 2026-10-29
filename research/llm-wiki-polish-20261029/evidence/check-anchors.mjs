import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),base=globalThis.POLISH_QA_BASE||'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
const p=(await taskSpace(92)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');const results=[];
for(const width of [1440,390]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
 for(const target of [{deck:'llm-wiki',path:'presentations/llm-wiki/read.html',slide:31},{deck:'llm-wiki',path:'presentations/llm-wiki/read.html',slide:33},{deck:'visual-story',path:'examples/visual-story/index.html',slide:5},{deck:'visual-story',path:'examples/visual-story/index.html',slide:7}]){
  await p.goto(base+target.path+'?anchorFix=1&width='+width+'#'+target.slide);
  await p.waitForFunction(()=>document.fonts.status==='loaded'&&!!window.PRESENTATION);
  if(await p.evaluate(()=>document.body.dataset.mode)!=='read'){await p.click('[data-action="mode"]');await p.click('[data-action="next"]');await p.click('[data-action="previous"]');}
  await p.waitForFunction(index=>{const a=document.querySelector('#slideStage .slide[data-index="'+index+'"]');return document.body.dataset.mode==='read'&&a?.classList.contains('layout-visual')&&Math.abs(a.getBoundingClientRect().top-92)<3;},target.slide-1);
  const state=await p.evaluate(index=>{const a=document.querySelector('#slideStage .slide[data-index="'+index+'"]'),h=a.querySelector('.slide-title'),header=document.querySelector('.app-header');return{articleTop:a.getBoundingClientRect().top,headingTop:h.getBoundingClientRect().top,headerBottom:header.getBoundingClientRect().bottom,scrollMargin:getComputedStyle(a).scrollMarginTop,heading:h.textContent,width:innerWidth,scrollWidth:document.documentElement.scrollWidth};},target.slide-1);
  assert.ok(state.headingTop>=state.headerBottom);assert.equal(state.scrollMargin,'92px');assert.equal(state.width,state.scrollWidth);
  results.push({...target,...state});
  if(width===390&&target.deck==='llm-wiki')await p.screenshot({path:dir+'screens/'+prefix+'anchor-'+target.slide+'-390.png'});
 }
}
await fs.writeFile(dir+prefix+'anchors.json',JSON.stringify({results},null,2)+'\n');console.log(results);
