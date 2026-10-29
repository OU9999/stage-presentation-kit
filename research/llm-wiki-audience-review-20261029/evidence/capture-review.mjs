import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url)),temporary=await fs.mkdtemp(path.join(os.tmpdir(),'llm-wiki-review-'));
const p=(await taskSpace(95)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');const rows=[];
for(let n=1;n<=40;n++){
 const r=await captureSlide(p,'https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html?audience=a5b558c#'+n,path.join(temporary,'slide-'+String(n).padStart(2,'0')+'.png'),{stageOnly:true});
 r.revision=await p.evaluate(()=>window.PRESENTATION.document.revision);
 if(r.revision!=='7dbd19ffdf942f22af8bec54af10fac7835a06469360b99bdb783a2dca077c28')throw new Error('Review target differs');
 rows.push(r);
}
await fs.writeFile(dir+'capture.json',JSON.stringify({temporary,gitHead:'a5b558c',slides:rows},null,2)+'\n');console.log({temporary,slides:rows.length,errors:rows.flatMap(r=>r.errors),overflow:rows.flatMap(r=>r.overflow)});
