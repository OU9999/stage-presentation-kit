const fs=await import('node:fs/promises'),assert=(await import('node:assert/strict')).default;
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit',out=root+'/research/reusable-layouts-20261028/evidence';
const {prepare,captureSlide}=await import('file://'+out+'/browser-helpers.mjs'),task=await taskSpace(62),p=task.page('p1');await prepare(p);const results=[];
const contrast=()=>{
 const active=document.querySelector('#slideStage .is-active'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=canvas.height=1;
 const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].map(x=>x/255);};
 const luminance=rgb=>rgb.slice(0,3).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
 const ratio=(fg,bg)=>{let a=luminance(rgba(fg)),b=luminance(rgba(bg));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
 const backgrounds=node=>{let current=node;while(current){const color=getComputedStyle(current).backgroundColor;if(rgba(color)[3]>.99)return color;current=current.parentElement;}return 'black';};
 return {theme:document.body.dataset.theme,icons:[...active.querySelectorAll('.md-wall-icon:has(svg)')].map(node=>({tone:node.closest('[data-tone]')?.dataset.tone,color:getComputedStyle(node).color,background:getComputedStyle(node).backgroundColor,ratio:ratio(getComputedStyle(node).color,getComputedStyle(node).backgroundColor)})),tileText:[...active.querySelectorAll('.md-tile > h2,.md-tile > p,.md-tile > blockquote,.md-tile-icon')].map(node=>({text:node.textContent,color:getComputedStyle(node).color,background:backgrounds(node),ratio:ratio(getComputedStyle(node).color,backgrounds(node))}))};
};
try{
 for(const theme of ['stage','paper']){
  const observation=await captureSlide(p,'http://127.0.0.1:4323/research/reusable-layouts-20261028/evidence/check-deck/#15',out+'/screens/wall-22-'+theme+'-final.png',{stageOnly:true,theme});
  const colors=await p.evaluate(contrast);assert(colors.icons.every(icon=>icon.ratio>=3));assert.deepEqual([...new Set(colors.icons.map(i=>i.tone))].sort(),['blue','green','orange','purple','yellow']);results.push({observation,colors});
 }
 for(const [url,file,theme] of [['presentations/community-exhibit/#7','exhibit-07.png','stage'],['presentations/community-exhibit/#7','exhibit-07-paper.png','paper'],...[13,14,15].map(n=>['research/reusable-layouts-20261028/evidence/check-deck/#'+n,'case-'+n+'.png','stage'])])await captureSlide(p,'http://127.0.0.1:4323/'+url,out+'/screens/'+file,{stageOnly:true,theme});
 await fs.writeFile(out+'/final-color-browser.json',JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results.map(x=>({theme:x.colors.theme,minContrast:Math.min(...x.colors.icons.map(i=>i.ratio)),yellow:x.colors.icons.find(i=>i.tone==='yellow').ratio,overflow:x.observation.overflow}))));
}finally{await p.cdp('Emulation.clearDeviceMetricsOverride');}
