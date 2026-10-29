import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';

const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.DIAGRAM_QA_BASE || 'http://127.0.0.1:4323/';
const publicCheck=base.startsWith('https:');
const prefix=publicCheck?'public-':'';
const scope={window:{}};
vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const deck=scope.window.PRESENTATION,revision=deck.document.revision;
const page=(await taskSpace(109)).page('p1');
await prepare(page);await page.cdp('Page.bringToFront');await page.mouse.click(5,90);
await fs.mkdir(dir+'screens',{recursive:true});
const slides=[];
for(let n=1;n<=deck.slides.length;n++){
  const save=!publicCheck || [4,6,7,8,10,14,16,23,36,37].includes(n);
  const filename=save?`screens/${prefix}slide-${String(n).padStart(2,'0')}.png`:null;
  const r=await captureSlide(page,base+'presentations/llm-wiki/index.html?experience='+revision+'#'+n,filename?dir+filename:null,{stageOnly:true});
  if(await page.evaluate(()=>window.PRESENTATION.document.revision)!==revision)throw new Error('Stale browser revision');
  r.filename=filename;
  r.native=await page.evaluate(()=>{const slide=document.querySelector('#slideStage .is-active');if(!slide.classList.contains('layout-visual'))return null;const bounds=slide.querySelector('.slide-body').getBoundingClientRect(),outside=[];for(const e of slide.querySelectorAll('.q-label,.q-share,.q-segment span,.flow-title,.flow-index,.flow-connection,.visual-context')){const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;if(r.left<bounds.left-3||r.right>bounds.right+3||r.top<bounds.top-3||r.bottom>bounds.bottom+3)outside.push(e.textContent);}return{kind:slide.dataset.kind,outside,segments:[...slide.querySelectorAll('.q-segment')].map(e=>({share:e.style.width,label:e.textContent})),flow:[...slide.querySelectorAll('.flow-title')].map(e=>e.textContent),links:[...slide.querySelectorAll('.flow-connection')].map(e=>e.textContent)};});
  r.links=await page.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})));
  slides.push(r);
  console.log({slide:n,composition:r.composition,overflow:r.overflow,diagnostic:r.diagnostic});
}
await fs.writeFile(dir+prefix+'slides.json',JSON.stringify({base,revision,slides},null,2)+'\n');
if(slides.some(r=>r.native?.outside.length||r.overflow.length||r.diagnostic||r.errors.length||r.failures.length||r.images.some(i=>!i.naturalWidth)||r.localStorageCalls.length))throw new Error('Slide QA requires review');
