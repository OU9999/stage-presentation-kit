import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.REFINEMENT_QA_BASE||'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
const scope={window:{}};vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const revision=scope.window.PRESENTATION.document.revision,p=(await taskSpace(99)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
const results=[];
for(const n of [3,6,12,17,19,23,31,33,34,35]){
 await p.goto(base+'presentations/llm-wiki/read.html?anchors='+revision+'#'+n);
 await p.waitForFunction(()=>document.body.dataset.mode==='read'&&document.fonts.status==='loaded'&&[...document.querySelectorAll('#slideStage img')].every(e=>e.complete));
 await p.waitForFunction(n=>{const a=document.querySelector('#slideStage .slide[data-index="'+(n-1)+'"]');return Math.abs(a.getBoundingClientRect().top-92)<3;},n);
 const r=await p.evaluate(n=>{const a=document.querySelector('#slideStage .slide[data-index="'+(n-1)+'"]'),h=a.querySelector('.slide-title');return{slide:n,revision:window.PRESENTATION.document.revision,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heading:h.textContent,top:h.getBoundingClientRect().top,headerBottom:document.querySelector('.app-header').getBoundingClientRect().bottom,bodyText:a.textContent};},n);
 assert.equal(r.revision,revision);assert.equal(r.scrollWidth,r.width);assert.ok(r.top>=r.headerBottom);results.push(r);
 if(n===33){
  const selector='#slideStage .slide[data-index="32"] .visual-data-details';
  assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),true);
  await p.focus(selector+' summary');await p.keyboard.press('Enter');assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),false);
  await p.keyboard.press('Enter');assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),true);
 }
 if([17,31,35].includes(n))await p.screenshot({path:dir+'screens/'+prefix+'read-'+n+'-390.png'});
}
await fs.writeFile(dir+prefix+'reading-anchors.json',JSON.stringify({revision,results,nativeFlowKeyboardToggle:true},null,2)+'\n');
console.log({revision,anchors:results.length,width:390,overflow:0,coveredTitles:0,nativeFlowKeyboardToggle:true});
