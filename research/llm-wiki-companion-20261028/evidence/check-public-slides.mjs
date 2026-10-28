import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),p=(await taskSpace(84)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');const rows=[];
for(let n=1;n<=14;n++){const r=await captureSlide(p,'https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html?release=8995439#'+n,n===7?dir+'screens/public-slide-07.png':undefined,{stageOnly:true});r.revision=await p.evaluate(()=>window.PRESENTATION.document.revision);if(r.filename)r.filename='screens/public-slide-07.png';rows.push(r);}
await fs.writeFile(dir+'public-slides.json',JSON.stringify(rows,null,2)+'\n');const failed=rows.filter(r=>r.revision!=='4b0484e0763d24d3811af1b14e69dc34571a9e1ca4b33e03e7ec09b2f1edc83c'||r.overflow.length||r.diagnostic||r.errors.length||r.failures.length||r.images.some(i=>!i.naturalWidth));console.log({slides:rows.length,failed:failed.map(r=>r.index)});if(failed.length)throw new Error('Public slide verification failed');
