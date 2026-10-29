import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const p=(await taskSpace(109)).page('p1');await p.cdp('Page.bringToFront');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1500,height:700,deviceScaleFactor:1,mobile:false});
const names=['wiki-maintenance-loop','wiki-layers','wiki-ingest-update','wiki-query-return','case-reading','case-team','case-course','reuse-inputs','decision-transition'];
const rows=[];
for(const name of names){
 await p.goto('http://127.0.0.1:4323/talks/llm-wiki/assets/'+name+'.svg');
 await p.waitForFunction(()=>document.querySelector('svg')&&document.fonts.status==='loaded');
 const r=await p.evaluate(()=>{
  const svg=document.querySelector('svg'),v=svg.viewBox.baseVal;
  const texts=[...svg.querySelectorAll('text')].map(e=>{const b=e.getBBox();return{text:e.textContent,x:b.x,y:b.y,width:b.width,height:b.height,font:parseFloat(getComputedStyle(e).fontSize)};});
  const outside=texts.filter(b=>b.x<-.5||b.y<-.5||b.x+b.width>v.width+.5||b.y+b.height>v.height+.5);
  const overlaps=[];
  for(let a=0;a<texts.length;a++)for(let b=a+1;b<texts.length;b++){
   const x=texts[a],y=texts[b],w=Math.min(x.x+x.width,y.x+y.width)-Math.max(x.x,y.x),h=Math.min(x.y+x.height,y.y+y.height)-Math.max(x.y,y.y);
   if(w>3&&h>3&&w*h>Math.min(x.width*x.height,y.width*y.height)*.08)overlaps.push([x.text,y.text]);
  }
  return{title:svg.querySelector('title').textContent,width:v.width,height:v.height,texts,outside,overlaps};
 });rows.push({name,...r});
}
await fs.writeFile(fileURLToPath(new URL('./svg-text.json',import.meta.url)),JSON.stringify(rows,null,2)+'\n');
console.log(rows.map(r=>({name:r.name,outside:r.outside,overlaps:r.overlaps})));
if(rows.some(r=>r.outside.length||r.overlaps.length))throw new Error('SVG text requires correction');
