import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),scope={window:{}};
vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const deck=scope.window.PRESENTATION,revision=deck.document.revision;
const page=(await taskSpace(84)).page('p1');await prepare(page);await page.cdp('Page.bringToFront');
const slides=[];
for(let n=1;n<=deck.slides.length;n++){
 const r=await captureSlide(page,'http://127.0.0.1:4323/presentations/llm-wiki/index.html?qa='+revision+'#'+n,dir+'screens/slide-'+String(n).padStart(2,'0')+'.png',{stageOnly:true});
 if(await page.evaluate(()=>window.PRESENTATION.document.revision)!==revision)throw new Error('Stale browser revision');
 r.filename='screens/slide-'+String(n).padStart(2,'0')+'.png';
 r.groupFonts=await page.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active .md-group')].map(e=>({body:getComputedStyle(e).fontSize,heading:getComputedStyle(e.querySelector('h2')).fontSize})));
 slides.push(r);console.log({slide:n,composition:r.composition,overflow:r.overflow,diagnostic:r.diagnostic});
}
const paper=await captureSlide(page,'http://127.0.0.1:4323/presentations/llm-wiki/index.html#6',dir+'screens/paper-06.png',{stageOnly:true,theme:'paper'});
const primary=await captureSlide(page,'http://127.0.0.1:4323/presentations/product-notes/index.html#4',dir+'screens/primary-regression.png',{stageOnly:true});
primary.fonts=await page.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active .md-group:not(.is-primary)')].map(e=>({body:getComputedStyle(e).fontSize,heading:getComputedStyle(e.querySelector('h2')).fontSize})));
await fs.writeFile(dir+'slides.json',JSON.stringify({revision,slides,paper,primary},null,2)+'\n');
if(slides.some(r=>r.overflow.length||r.diagnostic||r.errors.length||r.failures.length||r.images.some(i=>!i.naturalWidth)||r.localStorageCalls.length)||paper.overflow.length||primary.overflow.length||primary.fonts.some(f=>f.body!=='22px'||f.heading!=='28px'))throw new Error('Slide QA requires review');
