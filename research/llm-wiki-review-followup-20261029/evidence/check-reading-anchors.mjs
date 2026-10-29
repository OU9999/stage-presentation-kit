import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.FOLLOWUP_QA_BASE||'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
const scope={window:{}};vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const revision=scope.window.PRESENTATION.document.revision,p=(await taskSpace(122)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
const results=[],nativeToggles=[];
for(const n of [3,10,11,16,17,23,24,25,26,27,39]){
 await p.goto(base+'presentations/llm-wiki/read.html?anchors='+revision+'#'+n);
 await p.waitForFunction(()=>document.body.dataset.mode==='read'&&document.fonts.status==='loaded'&&[...document.querySelectorAll('#slideStage img')].every(e=>e.complete));
 await p.waitForFunction(n=>{const a=document.querySelector('#slideStage .slide[data-index="'+(n-1)+'"]');return Math.abs(a.getBoundingClientRect().top-92)<3;},n);
 const r=await p.evaluate(n=>{const a=document.querySelector('#slideStage .slide[data-index="'+(n-1)+'"]'),h=a.querySelector('.slide-title');return{slide:n,revision:window.PRESENTATION.document.revision,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heading:h.textContent,top:h.getBoundingClientRect().top,headerBottom:document.querySelector('.app-header').getBoundingClientRect().bottom,bodyText:a.textContent};},n);
 assert.equal(r.revision,revision);assert.equal(r.scrollWidth,r.width);assert.ok(r.top>=r.headerBottom);results.push(r);
 if(scope.window.PRESENTATION.slides[n-1].layout==='visual'){
  const selector='#slideStage .slide[data-index="'+(n-1)+'"] .visual-data-details';
  assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),true);
  await p.focus(selector+' summary');await p.keyboard.press('Enter');assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),false);
  await p.keyboard.press('Enter');assert.equal(await p.evaluate(s=>document.querySelector(s).open,selector),true);nativeToggles.push(n);
 }
 if([11,17,24,32].includes(n))await p.screenshot({path:dir+'screens/'+prefix+'read-'+n+'-390.png'});
}
await fs.writeFile(dir+prefix+'reading-anchors.json',JSON.stringify({revision,results,nativeToggles},null,2)+'\n');
console.log({revision,anchors:results.length,width:390,overflow:0,coveredTitles:0,nativeToggles});
