const fs=await import('node:fs/promises'),task=await taskSpace(11),p=task.page('p1');
const root='/Users/ou9999/Documents/stage-presentation-kit',out=root+'/research/type-layout-20261025/evidence';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1728,height:1120,deviceScaleFactor:1,mobile:false});
await p.goto('http://localhost:4317/examples/text-layout/index.html?inspect=first#1');
const records=[];
for(let index=0;index<8;index++){
 if(index)await p.click('[data-action="next"]');
 await p.evaluate(async()=>{await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 const result=await p.evaluate(()=>{const s=document.querySelector('#slideStage>.is-active'),b=s.getBoundingClientRect(),outside=[];for(const n of s.querySelectorAll('[data-field],.visual-hero-line,.visual-hero-label')){const r=document.createRange();r.selectNodeContents(n);const t=r.getBoundingClientRect();if(t.width&&(t.left<b.left-2||t.right>b.right+2||t.top<b.top-2||t.bottom>b.bottom+2))outside.push({field:n.dataset.field||n.className,text:n.textContent,box:t.toJSON()});}return{index:Number(s.dataset.index)+1,classes:s.className,copy:s.querySelector('.slide-title').textContent,hero:s.querySelector('.visual-hero-value')?.textContent,heroFont:s.querySelector('.visual-hero-value')?getComputedStyle(s.querySelector('.visual-hero-value')).fontSize:null,source:s.innerText,outside,clip:{x:b.x,y:b.y,width:b.width,height:b.height,scale:1600/b.width}};});
 const shot=await p.cdp('Page.captureScreenshot',{format:'png',clip:result.clip,fromSurface:true,captureBeyondViewport:true});await fs.writeFile(out+'/recipe-'+result.index+'.png',Buffer.from(shot.data,'base64'));records.push(result);
}
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await p.click('[data-action="mode"]');
const mobile=await p.evaluate(()=>({viewport:innerWidth,body:document.documentElement.scrollWidth,slides:[...document.querySelectorAll('#slideStage>.slide')].map(s=>({index:s.dataset.index,client:s.clientWidth,width:s.scrollWidth,title:getComputedStyle(s.querySelector('.slide-title')).fontSize,hero:s.querySelector('.visual-hero-value')?.textContent,heroFont:s.querySelector('.visual-hero-value')?getComputedStyle(s.querySelector('.visual-hero-value')).fontSize:null}))}));
await fs.writeFile(out+'/first-product.json',JSON.stringify({records,mobile},null,2)+'\n');console.log({outside:records.filter(r=>r.outside.length),mobile});
