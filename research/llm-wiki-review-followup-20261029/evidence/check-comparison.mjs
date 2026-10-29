import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('./',import.meta.url));
const site=globalThis.FOLLOWUP_QA_BASE||'http://127.0.0.1:4323/';
const prefix=site.startsWith('https:')?'public-':'';
const p=(await taskSpace(122)).page('p1');await p.cdp('Page.bringToFront');
const results=[];
for(const width of [1440,390]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});
 await p.goto(site+'research/llm-wiki-review-followup-20261029/index.html');
 await p.evaluate(()=>[...document.images].forEach(e=>e.loading='eager'));
 await p.waitForFunction(()=>document.fonts.status==='loaded'&&document.images.length===16&&[...document.images].every(e=>e.complete&&e.naturalWidth));
 const r=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sections:document.querySelectorAll('section').length,images:[...document.images].map(e=>({alt:e.alt,width:e.naturalWidth})),heading:document.querySelector('h1').textContent}));
 assert.equal(r.sections,8);assert.equal(r.scrollWidth,r.width);assert.ok(r.images.every(e=>e.alt&&e.width));results.push(r);
 await p.screenshot({path:dir+'screens/'+prefix+'comparison-'+width+'.png'});
}
await fs.writeFile(dir+prefix+'comparison.json',JSON.stringify(results,null,2)+'\n');console.log({viewports:results.map(r=>r.width),sections:8,images:16,overflow:0});
