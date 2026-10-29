import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {parseMaterial} from '../../../scripts/materials.cjs';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),sourceDir=new URL('../../../talks/llm-wiki/materials/',import.meta.url);
const task=await taskSpace(88),p=task.page('p1');await prepare(p);await p.cdp('Page.bringToFront');
const text=t=>t.children?t.children.map(text).join(''):['text','code_inline','fence','code_block'].includes(t.type)?t.content:['softbreak','hardbreak'].includes(t.type)?' ':'';
const base=globalThis.EXPERIENCE_QA_BASE || 'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
await fs.mkdir(dir+'screens',{recursive:true});
const results=[];
for(const name of (await fs.readdir(sourceDir)).filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3))){
 const source=await fs.readFile(new URL(name+'.md',sourceDir),'utf8'),parsed=parseMaterial(source),fragments=parsed.tokens.filter(t=>['inline','fence','code_block'].includes(t.type)).map(text).filter(Boolean);
 for(const width of [1440,390]){
  await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
  await p.goto(base+'presentations/llm-wiki/materials/'+name+'.html?qa='+parsed.revision);
  await p.waitForFunction(()=>document.querySelector('.material-content')&&document.fonts.status==='loaded');
  const r=await p.evaluate(({fragments,revision})=>{const clean=s=>s.replace(/\s+/g,'');const content=document.querySelector('.material-content'),actual=clean(content.textContent),missing=[];let cursor=0;for(const f of fragments){const s=clean(f),at=actual.indexOf(s,cursor);if(at<0)missing.push(s.slice(0,100));else cursor=at+s.length;}return{revision:document.body.dataset.revision,expectedRevision:revision,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,missing,paragraphFont:getComputedStyle(content.querySelector('p')).fontSize,headings:content.querySelectorAll('h2,h3').length,scripts:document.scripts.length,pre:content.querySelectorAll('pre').length,focusablePre:content.querySelectorAll('pre[tabindex="0"]').length,storage:window.__renewalStorage,errors:window.__renewalErrors,menuClosed:!document.querySelector('.material-mobile-nav').open};},{fragments,revision:parsed.revision});
  r.name=name;if(r.revision!==parsed.revision||r.width<r.scrollWidth||r.missing.length||r.scripts||r.pre!==r.focusablePre||r.paragraphFont!=='18px'||r.errors.length||r.storage.length)throw new Error(JSON.stringify(r));
  results.push(r);console.log({name,width,missing:r.missing.length,headings:r.headings});
  if(name==='study-guide')await p.screenshot({path:dir+'screens/'+prefix+'study-'+width+'.png'});
 }
}
await p.goto(base+'presentations/llm-wiki/materials/study-guide.html');
await p.waitForSelector('.material-mobile-nav summary');await p.focus('.material-mobile-nav summary');await p.keyboard.press('Enter');
const menu=await p.evaluate(()=>({open:document.querySelector('.material-mobile-nav').open,links:document.querySelectorAll('.material-mobile-nav a').length}));
await p.keyboard.press('Enter');
const candidate=await p.evaluate(()=>{const e=[...document.querySelectorAll('.material-content pre')].find(e=>e.scrollWidth>e.clientWidth+20);if(!e)return null;e.id='qa-code';e.scrollIntoView({behavior:'instant',block:'center'});return{before:e.scrollLeft,width:e.clientWidth,scrollWidth:e.scrollWidth};});
if(candidate){await p.focus('#qa-code');await p.keyboard.press('ArrowRight');await p.waitForFunction(()=>document.getElementById('qa-code').scrollLeft>0);candidate.after=await p.evaluate(()=>document.getElementById('qa-code').scrollLeft);if(candidate.after<=candidate.before)throw new Error('Code keyboard scrolling failed');}
await fs.writeFile(dir+prefix+'documents.json',JSON.stringify({results,menu,code:candidate},null,2)+'\n');
if(!menu.open||!candidate)throw new Error('Mobile navigation/code coverage missing');
