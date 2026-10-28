import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { prepare, captureSlide } from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const evidence = fileURLToPath(new URL('./', import.meta.url));
const task = await taskSpace(76), page = task.page('p1');
await prepare(page);
await page.cdp('Page.bringToFront');
const paper = [];
for (const n of [5,7,8,11]) paper.push(await captureSlide(page, 'http://127.0.0.1:4323/presentations/llm-wiki/index.html#'+n, evidence+'screens/paper-'+n+'.png', {stageOnly:true,theme:'paper'}));
await page.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await page.goto('http://127.0.0.1:4323/presentations/llm-wiki/read.html');
await page.waitForFunction(()=>document.body.dataset.mode==='read'&&document.querySelectorAll('#slideStage .slide').length===12&&document.fonts.status==='loaded');
for (let n=0;n<12;n++) await page.evaluate(n=>document.querySelectorAll('#slideStage .slide')[n].scrollIntoView({behavior:'instant',block:'start'}),n);
await page.waitForFunction(()=>[...document.querySelectorAll('#slideStage img')].every(i=>i.complete&&i.naturalWidth));
const mobile = await page.evaluate(()=>{
  const clean=s=>s.replace(/\s+/g,'');
  const text=n=>Array.isArray(n)?n.map(text).join(''):n?.type==='text'?n.value:(n?.children||[]).map(text).join('');
  const slides=[...document.querySelectorAll('#slideStage .slide')];
  const missing=[];
  window.PRESENTATION.slides.forEach((s,i)=>{
    const actual=clean(slides[i].textContent);let cursor=0;
    for(const node of [s.heading,...s.blocks]){const expected=clean(text(node));if(!expected)continue;const at=actual.indexOf(expected,cursor);if(at<0)missing.push({slide:i+1,text:expected.slice(0,100)});else cursor=at+expected.length;}
  });
  return {mode:document.body.dataset.mode,count:slides.length,missing,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    images:[...document.querySelectorAll('#slideStage img')].map(i=>({alt:i.alt,width:i.naturalWidth,fit:getComputedStyle(i).objectFit})),
    links:[...slides.at(-1).querySelectorAll('a')].map(a=>({text:a.textContent,href:a.href})),
    minBodyFont:Math.min(...[...document.querySelectorAll('#slideStage .slide-body p,#slideStage .slide-body li')].map(e=>parseFloat(getComputedStyle(e).fontSize))),
    storage:window.__renewalStorage,errors:window.__renewalErrors,
    editable:document.querySelectorAll('[contenteditable="true"]').length};
});
await page.goto('http://127.0.0.1:4323/presentations/llm-wiki/read.html#7');
await page.waitForFunction(()=>{const e=document.querySelector('#slideStage .slide[data-index="6"]');return document.fonts.status==='loaded'&&e&&Math.abs(e.getBoundingClientRect().top-92)<5;});
mobile.anchorTop=await page.evaluate(()=>document.querySelector('#slideStage .slide[data-index="6"]').getBoundingClientRect().top);
await page.screenshot({path:evidence+'screens/mobile-read-7.png'});
await fs.writeFile(evidence+'reading.json',JSON.stringify({paper,mobile},null,2)+'\n');
console.log({paper:paper.map(s=>({index:s.index,overflow:s.overflow,diagnostic:s.diagnostic})),mobile});
if(mobile.missing.length||mobile.scrollWidth>mobile.viewport+1||mobile.images.some(i=>!i.alt||!i.width||i.fit!=='contain')||mobile.storage.length||mobile.errors.length||mobile.editable||paper.some(s=>s.overflow.length||s.diagnostic||s.errors.length)) throw new Error('Reading/Paper QA requires review.');
