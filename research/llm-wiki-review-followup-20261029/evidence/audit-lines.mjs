import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {prepare,captureSlide} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const scope={window:{}};vm.runInNewContext(await fs.readFile(new URL('../../../presentations/llm-wiki/content.js',import.meta.url),'utf8'),scope);
const revision=scope.window.PRESENTATION.document.revision;
const p=(await taskSpace(122)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
const rows=[];
for(let i=1;i<=scope.window.PRESENTATION.slides.length;i++){
 await captureSlide(p,'http://127.0.0.1:4323/presentations/llm-wiki/index.html?lines='+revision+'#'+i,null);
 const result=await p.evaluate(()=>{
  const active=document.querySelector('#slideStage .is-active');
  const selectors='.slide-title,.md-group > h2,.markdown-body > p,.md-group > p,.md-copy li,.md-media figcaption,.md-wall-label,blockquote > p,.visual-title,.visual-subtitle,.q-label,.q-share,.flow-title,.visual-context';
  const entries=[...active.querySelectorAll(selectors)].flatMap(element=>{
   const rect=element.getBoundingClientRect();if(element.classList.contains('md-value'))return [];if(!rect.width||!rect.height||!element.textContent.trim())return [];
   const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),lines=[];let node;
   while(node=walker.nextNode()){
    for(let j=0;j<node.length;j++){
     const range=document.createRange();range.setStart(node,j);range.setEnd(node,j+1);const r=range.getBoundingClientRect();
     if(!r.width||!r.height)continue;
     let line=lines.find(line=>Math.abs(line.y-r.top)<Math.max(3,r.height*.25));if(!line){line={y:r.top,text:''};lines.push(line);}line.text+=node.textContent[j];
    }
   }
   const text=lines.sort((a,b)=>a.y-b.y).map(l=>l.text.replace(/\s+/g,' ').trim()).filter(Boolean);
   const last=text.at(-1)||'',shortLast=text.length>1&&last.replace(/[\s.,!?。·“”‘’'"()]/g,'').length<=6;
   return [{tag:element.tagName,sourceLine:element.dataset.sourceLine,text:element.textContent,lines:text,shortLast,font:getComputedStyle(element).fontSize}];
  });return {slide:Number(active.dataset.index)+1,title:active.querySelector('.slide-title')?.textContent,entries};
 });rows.push(result);
}
const name=globalThis.FOLLOWUP_AUDIT_NAME || 'lines';
await fs.writeFile(dir+name+'.json',JSON.stringify({revision,slides:rows},null,2)+'\n');
console.log(rows.flatMap(row=>row.entries.filter(e=>e.shortLast).map(e=>({slide:row.slide,lines:e.lines,font:e.font}))));
