import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const scope={window:{}};vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const revision=scope.window.PRESENTATION.document.revision,p=(await taskSpace(99)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await fs.mkdir(dir+'draft',{recursive:true});const slides=[];
for(const n of [2,3,4,6,7,9,12,17,19,22,23,26,30,31,34,35]){const name='draft/slide-'+String(n).padStart(2,'0')+'.png';const r=await captureSlide(p,'http://127.0.0.1:4323/presentations/llm-wiki/index.html?draft='+revision+'#'+n,dir+name,{stageOnly:true});if(await p.evaluate(()=>window.PRESENTATION.document.revision)!==revision)throw new Error('Stale');r.filename=name;slides.push(r);}
await fs.writeFile(dir+'draft.json',JSON.stringify({revision,slides},null,2)+'\n');console.log({revision,slides:slides.length,overflow:slides.flatMap(s=>s.overflow),errors:slides.flatMap(s=>s.errors)});
