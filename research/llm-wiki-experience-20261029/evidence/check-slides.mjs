import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';

const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.EXPERIENCE_QA_BASE || 'http://127.0.0.1:4323/';
const publicCheck=base.startsWith('https:');
const prefix=publicCheck?'public-':'';
const scope={window:{}};
vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const deck=scope.window.PRESENTATION,revision=deck.document.revision;
const page=(await taskSpace(88)).page('p1');
await prepare(page);await page.cdp('Page.bringToFront');
await fs.mkdir(dir+'screens',{recursive:true});
const slides=[];
for(let n=1;n<=deck.slides.length;n++){
  const save=!publicCheck || [1,7,19,23,24,26,30,31,33,34,37,deck.slides.length].includes(n);
  const filename=save?`screens/${prefix}slide-${String(n).padStart(2,'0')}.png`:null;
  const r=await captureSlide(page,base+'presentations/llm-wiki/index.html?experience='+revision+'#'+n,filename?dir+filename:null,{stageOnly:true});
  if(await page.evaluate(()=>window.PRESENTATION.document.revision)!==revision)throw new Error('Stale browser revision');
  r.filename=filename;
  r.links=await page.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})));
  slides.push(r);
  console.log({slide:n,composition:r.composition,overflow:r.overflow,diagnostic:r.diagnostic});
}
await fs.writeFile(dir+prefix+'slides.json',JSON.stringify({base,revision,slides},null,2)+'\n');
if(slides.some(r=>r.overflow.length||r.diagnostic||r.errors.length||r.failures.length||r.images.some(i=>!i.naturalWidth)||r.localStorageCalls.length))throw new Error('Slide QA requires review');
