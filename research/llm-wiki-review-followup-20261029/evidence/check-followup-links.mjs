import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const site=globalThis.FOLLOWUP_QA_BASE||'http://127.0.0.1:4323/';
const prefix=site.startsWith('https:')?'public-':'';
const p=(await taskSpace(122)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
const revision=JSON.parse(await fs.readFile(new URL('../input/snapshot.json',import.meta.url),'utf8')).revision;
const metrics=[];
for(const width of [1440,960]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 await captureSlide(p,site+'presentations/llm-wiki/index.html?followup='+revision+'#39',dir+'screens/'+prefix+'slide-39-'+width+'.png',{stageOnly:true});
 const row=await p.evaluate(()=>{const s=document.querySelector('#slideStage .is-active'),scale=s.getBoundingClientRect().width/1600;return{revision:window.PRESENTATION.document.revision,viewport:innerWidth,rows:[...s.querySelectorAll('tbody tr')].map(tr=>({cells:[...tr.querySelectorAll('td')].map(e=>({text:e.textContent,font:parseFloat(getComputedStyle(e).fontSize),effectiveFont:parseFloat(getComputedStyle(e).fontSize)*scale,width:e.getBoundingClientRect().width}))}))};});
 assert.equal(row.revision,revision);assert.equal(row.rows.length,4);assert.equal(new Set(row.rows.flatMap(r=>r.cells.map(c=>c.font))).size,1);metrics.push(row);
}
await prepare(p);
await captureSlide(p,site+'presentations/llm-wiki/index.html?handoff='+revision+'#25',null);
const link=await p.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active a')].find(e=>e.textContent==='실습 기본 2~4')?.getAttribute('href'));
assert.ok(link);await p.click('#slideStage .is-active a[href="'+link+'"]');
await p.waitForSelector('.material-content');await p.waitForFunction(()=>document.fonts.status==='loaded');
const workshop=await p.evaluate(()=>{const e=document.getElementById(decodeURIComponent(location.hash.slice(1))),h=document.querySelector('.material-header');return{url:location.href,text:e?.textContent,top:e?.getBoundingClientRect().top,headerBottom:h?.getBoundingClientRect().bottom||0};});
assert.ok(workshop.text?.includes('입력과 이전 위키'));assert.ok(workshop.top>=workshop.headerBottom-2);
await captureSlide(p,site+'presentations/llm-wiki/index.html?handoff='+revision+'#25',null);
const starter=await p.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active a')].find(e=>e.textContent==='starter 규칙')?.getAttribute('href'));
assert.ok(starter);const url=new URL(starter,await p.url()).href,response=await fetch(url,{method:'HEAD'});assert.ok(response.ok);
let actual,method;
if((response.headers.get('content-type')||'').includes('octet-stream')){
 const waiting=p.waitForEvent('download',{timeout:10000});await p.click('#slideStage .is-active a[href="'+starter+'"]');const download=await waiting;
 const folder=await fs.mkdtemp(path.join(os.tmpdir(),'llm-wiki-starter-')),file=path.join(folder,'starter.txt');await download.saveAs(file);actual=await fs.readFile(file,'utf8');method='click and download';
}else{
 await p.click('#slideStage .is-active a[href="'+starter+'"]');await p.waitForFunction(()=>document.querySelector('pre'));actual=await p.evaluate(()=>document.querySelector('pre').textContent);method='click and read';
}
assert.equal(actual,await fs.readFile(new URL('../../../talks/llm-wiki/demo/starter.txt',import.meta.url),'utf8'));
const result={revision,metrics,workshop,starter:{url,method,characters:actual.length,matchedSource:true},scope:'Actual navigation and rendered font geometry; no agent execution or human readability measurement.'};
await fs.writeFile(dir+prefix+'followup-links.json',JSON.stringify(result,null,2)+'\n');console.log(result);
