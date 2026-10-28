import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const evidence=fileURLToPath(new URL('./',import.meta.url));
const base='https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/';
const revision='23145e8c452a041ef55d7489c8fd00da96914a1e98b03d3ad03d423f52fcde58';
const task=await taskSpace(76),page=task.page('p1');
await prepare(page);await page.cdp('Page.bringToFront');
const slides=[];
for(let n=1;n<=12;n++){
 const s=await captureSlide(page,base+'index.html?release=824cf3a#'+n,n===5?evidence+'screens/public-05.png':undefined);
 const actual=await page.evaluate(()=>window.PRESENTATION.document.revision);
 if(actual!==revision)throw new Error('Public browser revision mismatch');
 s.revision=actual;if(s.filename)s.filename='screens/public-05.png';slides.push(s);
}
await page.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await page.goto(base+'read.html#7');
await page.waitForFunction(()=>document.body.dataset.mode==='read'&&document.querySelectorAll('#slideStage .slide').length===12&&document.fonts.status==='loaded');
const mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,count:document.querySelectorAll('#slideStage .slide').length,hasExample:document.querySelector('#slideStage .slide[data-index="6"]').textContent.includes('매주'),revision:window.PRESENTATION.document.revision,storage:window.__renewalStorage,errors:window.__renewalErrors}));
await page.screenshot({path:evidence+'screens/public-mobile.png'});
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await page.goto(base+'index.html#12');
await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='11'&&document.getAnimations().every(a=>a.playState==='finished'));
console.log(await page.snapshot());
const links=await page.evaluate(()=>[...document.querySelectorAll('#slideStage .is-active a')].map(a=>({text:a.textContent,href:a.href})));
const attachments=[];
for(const link of links){
 await page.goto(base+'index.html#12');
 await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='11'&&document.getAnimations().every(a=>a.playState==='finished'));
 await page.click('#slideStage .is-active a[href="'+link.href.split('/llm-wiki/')[1]+'"]');
 await page.waitForURL(link.href);
 const text=await page.evaluate(()=>document.body.innerText);
 const local=await fs.readFile(new URL('../../../presentations/llm-wiki/assets/'+link.href.split('/').at(-1),import.meta.url),'utf8');
 attachments.push({...link,characters:text.length,complete:text.trim()===local.trim(),korean:/[가-힣]/.test(text)});
}
const result={slides,mobile,attachments};
await fs.writeFile(evidence+'public-browser.json',JSON.stringify(result,null,2)+'\n');
console.log({slides:slides.length,issues:slides.filter(s=>s.overflow.length||s.diagnostic||s.errors.length||s.failures.length).length,mobile,attachments});
if(slides.some(s=>s.overflow.length||s.diagnostic||s.errors.length||s.failures.length)||mobile.scrollWidth>mobile.width+1||mobile.revision!==revision||!mobile.hasExample||mobile.storage.length||mobile.errors.length||attachments.some(a=>!a.complete||!a.korean))throw new Error('Public QA requires review.');
