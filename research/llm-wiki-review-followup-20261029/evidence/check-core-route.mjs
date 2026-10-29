import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.FOLLOWUP_QA_BASE||'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
const route=JSON.parse(await fs.readFile(new URL('../../llm-wiki-foundations-20261029/engineering/core-route.json',import.meta.url),'utf8'));
const scope={window:{}};vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const revision=scope.window.PRESENTATION.document.revision;
const p=(await taskSpace(122)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.goto(base+'presentations/llm-wiki/index.html?route='+revision+'#1');
await p.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='0');
assert.equal(await p.evaluate(()=>window.PRESENTATION.document.revision),revision);
const moves=[],choices=[];
for(let i=0;i<route.route.length;i++){
 const from=route.route[i].slide;
 await p.waitForFunction(n=>document.querySelector('#slideStage .is-active')?.dataset.index===String(n-1),from);
 if((route.choices||[]).some(choice=>choice.question===from)||(route.participation||[]).some(item=>item.slide===from&&item.equalVisualTreatment)){
  const c=await p.evaluate(()=>{
   const slide=document.querySelector('#slideStage .is-active');
   return [...slide.querySelectorAll('h2')].map(e=>{const r=e.parentElement.getBoundingClientRect();return{label:e.textContent,color:getComputedStyle(e).color,font:getComputedStyle(e).fontSize,background:getComputedStyle(e.parentElement).backgroundColor,width:r.width,height:r.height};});
  });
  assert.equal(c.length,2,'Two explicit choices must be visible');
  assert.equal(c[0].color,c[1].color,'A/B color before reveal');
  assert.equal(c[0].font,c[1].font,'A/B size before reveal');
  assert.equal(c[0].background,c[1].background,'A/B background before reveal');
  assert.ok(Math.abs(c[0].width-c[1].width)<1,'A/B width before reveal');
  assert.ok(Math.abs(c[0].height-c[1].height)<1,'A/B height before reveal');
  choices.push({slide:from,choices:c});
 }
 if(i===route.route.length-1)break;
 const to=route.route[i+1].slide;
 if(to!==from+1||(route.choices||[]).some(choice=>choice.question===from)){
  const selector='#slideStage .is-active a[href="#'+to+'"]';
  const labels=await p.evaluate(n=>[...document.querySelectorAll('#slideStage .is-active a[href="#'+n+'"]')].map(a=>a.textContent),to);
  assert.ok(labels.length,'Real route link '+from+' -> '+to);
  await p.click(selector+' >> nth=0');moves.push({from,to,method:'link',label:labels[0]});
 }else{await p.keyboard.press('ArrowRight');moves.push({from,to,method:'ArrowRight'});}
}
const end=await p.evaluate(()=>({hash:location.hash,index:document.querySelector('#slideStage .is-active')?.dataset.index,heading:document.querySelector('#slideStage .is-active .slide-title')?.textContent}));
assert.equal(end.hash,'#40');assert.equal(end.index,'39');
const result={revision,steps:route.route.length,moves,choices,end,timing:'1080+120 seconds is a plan; this navigation check does not measure a live talk.'};
await fs.writeFile(dir+prefix+'core-route-browser.json',JSON.stringify(result,null,2)+'\n');
console.log({revision,steps:result.steps,jumps:moves.filter(m=>m.to!==m.from+1).length,neutralChoices:choices.length,end});
