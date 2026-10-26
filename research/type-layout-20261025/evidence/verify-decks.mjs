const fs=await import('node:fs/promises'),task=await taskSpace(11),p=task.page('p1');
const root='/Users/ou9999/Documents/stage-presentation-kit',out=root+'/research/type-layout-20261025/evidence';
await fs.mkdir(out+'/slides',{recursive:true});
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1728,height:1120,deviceScaleFactor:1,mobile:false});
const sources=[['recipes','examples/text-layout/index.html',8],['story','examples/visual-story/index.html',12],['root','index.html',20],...['product-launch','engineering-review','photo-story','workshop','devday-compositions'].map(s=>[s,'examples/'+s+'/index.html',7])],records=[];
for(const [name,url,count] of sources){
 await p.goto('http://localhost:4317/'+url+'?typeReview=final#1');
 await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 for(let i=0;i<count;i++){
  if(i)await p.click('[data-action="next"]');
  await p.evaluate(async()=>{await Promise.all(document.getAnimations().filter(a=>a.effect.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const r=await p.evaluate(()=>{
   const s=document.querySelector('#slideStage>.is-active'),b=s.getBoundingClientRect(),outside=[];
   for(const n of s.querySelectorAll('[data-field],.visual-hero-line,.visual-hero-label')){const range=document.createRange();range.selectNodeContents(n);const t=range.getBoundingClientRect();if(t.width&&(t.left<b.left-3||t.right>b.right+3||t.top<b.top-3||t.bottom>b.bottom+3))outside.push({field:n.dataset.field||n.className,text:n.textContent});}
   const c=s.querySelector('.visual-copy')?.getBoundingClientRect(),h=s.querySelector('.visual-hero')?.getBoundingClientRect();
   return{index:Number(s.dataset.index)+1,layout:s.dataset.layout,title:s.querySelector('.slide-title')?.innerText,classes:s.className,outside,hero:s.querySelector('.visual-hero-value')?.textContent,copyHeroOverlap:!!(c&&h&&c.left<h.right-2&&c.right>h.left+2&&c.top<h.bottom-2&&c.bottom>h.top+2),text:s.innerText,clip:{x:b.x,y:b.y,width:b.width,height:b.height,scale:1600/b.width}};
  });
  r.deck=name;
  if(r.index!==i+1||r.layout==='error'||r.outside.length||r.copyHeroOverlap)throw Error(JSON.stringify(r));
  if(name==='story'||name==='recipes'){
   const shot=await p.cdp('Page.captureScreenshot',{format:'png',clip:r.clip,fromSurface:true,captureBeyondViewport:true});const file=name==='story'?out+'/slides/'+String(i+1).padStart(2,'0')+'.png':out+'/recipe-'+String(i+1)+'.png';await fs.writeFile(file,Buffer.from(shot.data,'base64'));
  }
  records.push(r);
 }
 console.log({deck:name,checked:count});
}
for(const [name,number]of Object.entries({opening:'01',funnel:'03',trend:'04',flow:'07'}))await fs.copyFile(out+'/slides/'+number+'.png',out+'/after-'+name+'.png');
await fs.writeFile(out+'/final-decks.json',JSON.stringify({count:records.length,records},null,2)+'\n');console.log({count:records.length,outside:records.flatMap(r=>r.outside)});
