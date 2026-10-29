import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),base=globalThis.POLISH_QA_BASE||'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'',scope={window:{}};
vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const deck=scope.window.PRESENTATION,revision=deck.document.revision;
const p=(await taskSpace(92)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.goto(base+'presentations/llm-wiki/index.html?native='+revision+'#31');
await p.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.kind==='composition'&&document.fonts.status==='loaded');
const chart=await p.evaluate(()=>{const slide=document.querySelector('#slideStage .is-active'),bars=[...slide.querySelectorAll('.q-segment')];return {kind:slide.dataset.kind,values:window.PRESENTATION.slides[30].visual.values,unit:window.PRESENTATION.slides[30].visual.unit,shares:bars.map(e=>Number.parseFloat(e.style.width)),labels:[...slide.querySelectorAll('.q-label')].map(e=>e.textContent),widths:bars.map(e=>e.getBoundingClientRect().width)};});
assert.deepEqual(chart.values,[5,3]);assert.equal(chart.unit,'쪽');assert.deepEqual(chart.shares,[62.5,37.5]);
assert.ok(Math.abs(chart.widths[0]/chart.widths.reduce((a,b)=>a+b,0)-5/8)<.001);
const reads=[];
for(const width of [1440,390]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
 await p.goto(base+'presentations/llm-wiki/read.html?native='+revision+'#31');
 await p.waitForFunction(()=>document.body.dataset.mode==='read'&&document.fonts.status==='loaded');
 const data=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,slides:[30,32].map(index=>{const slide=document.querySelector('#slideStage .slide[data-index="'+index+'"]');return {index:index+1,kind:slide.dataset.kind,open:slide.querySelector('.visual-data-details').open,headers:[...slide.querySelectorAll('.visual-data-details th')].map(e=>e.textContent),rows:[...slide.querySelectorAll('.visual-data-details tbody tr')].map(row=>[...row.cells].map(e=>e.textContent)),flow:[...slide.querySelectorAll('.flow-title')].map(e=>e.textContent)};})}));
 assert.equal(data.scrollWidth,width);assert.deepEqual(data.slides[0].rows.map(row=>Number.parseFloat(row[1])),[5,3]);
 assert.deepEqual(data.slides[1].rows.map(row=>row[0]),['1','2','3']);assert.deepEqual(data.slides[1].flow,Array.from(deck.slides[32].visual.items));
 assert.ok(data.slides.every(s=>s.open));
 await p.focus('#slideStage .slide[data-index="30"] .visual-data-details summary');await p.keyboard.press('Enter');
 assert.equal(await p.evaluate(()=>document.querySelector('#slideStage .slide[data-index="30"] .visual-data-details').open),false);
 await p.keyboard.press('Enter');
 assert.equal(await p.evaluate(()=>document.querySelector('#slideStage .slide[data-index="30"] .visual-data-details').open),true);
 reads.push({...data,keyboardToggle:true});
 if(width===390){await p.evaluate(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);document.querySelector('#slideStage .slide[data-index="30"]').scrollIntoView({behavior:'instant',block:'start'});});await p.screenshot({path:dir+'screens/'+prefix+'native-read-390.png'});}
}
await fs.writeFile(dir+prefix+'native-visuals.json',JSON.stringify({revision,chart,reads},null,2)+'\n');console.log({chart,reads});
