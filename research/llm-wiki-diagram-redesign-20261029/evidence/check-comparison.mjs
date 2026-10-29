import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('./',import.meta.url)),base=globalThis.DIAGRAM_QA_BASE||'http://127.0.0.1:4323/',prefix=base.startsWith('https:')?'public-':'';
const p=(await taskSpace(109)).page('p1');await p.cdp('Page.bringToFront');const rows=[];
for(const width of [1440,390]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
 await p.goto(base+'research/llm-wiki-diagram-redesign-20261029/');
 await p.waitForFunction(()=>document.fonts.status==='loaded'&&[...document.images].slice(0,2).every(e=>e.complete&&e.naturalWidth));
 const r=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sections:document.querySelectorAll('section').length,images:document.images.length,firstImages:[...document.images].slice(0,2).map(e=>({complete:e.complete,width:e.naturalWidth})),scripts:document.scripts.length}));rows.push(r);
 await p.screenshot({path:dir+prefix+'comparison-'+width+'.png'});
 if(r.width!==r.scrollWidth||r.sections!==10||r.images!==20||r.scripts)throw new Error('Comparison page failed');
}
await fs.writeFile(dir+prefix+'comparison.json',JSON.stringify(rows,null,2)+'\n');console.log({comparison:rows});
