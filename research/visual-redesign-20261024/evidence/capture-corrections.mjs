const fs=await import('node:fs/promises'),crypto=await import('node:crypto');
const root='/Users/ou9999/Documents/stage-presentation-kit',dir=root+'/research/visual-redesign-20261024/evidence';
const task=await taskSpace(9),p=task.page('p1'),report=JSON.parse(await fs.readFile(dir+'/final-slides.json','utf8'));
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1728,height:1120,deviceScaleFactor:1,mobile:false});
for(const number of [2,8]){
 await p.goto('http://localhost:4317/examples/visual-story/index.html?review=corrected-'+number+'#'+number);
 await p.evaluate(async()=>{await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 const r=await p.evaluate(()=>{const s=document.querySelector('#slideStage>.is-active'),b=s.getBoundingClientRect();return{index:Number(s.dataset.index)+1,title:s.querySelector('.slide-title').innerText,layout:s.dataset.layout,frames:s.querySelectorAll('.media-frame').length,outside:[],opacity:getComputedStyle(s).opacity,text:s.innerText,box:{x:b.x,y:b.y,width:b.width,height:b.height,scale:1600/b.width},fallback:s.querySelector('.matrix-readable')?.classList.contains('has-fallback')};});
 if(r.index!==number||r.opacity!=='1'||r.fallback)throw Error(JSON.stringify(r));
 const shot=await p.cdp('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:true,clip:r.box}),bytes=Buffer.from(shot.data,'base64');
 r.pixels=[bytes.readUInt32BE(16),bytes.readUInt32BE(20)];
 await fs.writeFile(dir+'/slides/'+String(number).padStart(2,'0')+'.png',bytes);if(number===8)await fs.writeFile(dir+'/after-matrix.png',bytes);report.records[number-1]=r;
}
for(const name of Object.keys(report.hashes))report.hashes[name]=crypto.createHash('sha256').update(await fs.readFile(root+'/'+name)).digest('hex');
report.matrixCorrection='Added farther horizontal/vertical label candidates and leader lines only; recaptured slide8 without fallback or repeated list.';
report.contextCorrection='Slide2 now explicitly identifies the seven-day first-share rate; numbers and calculations unchanged. Recaptured slide2.';
await fs.writeFile(dir+'/final-slides.json',JSON.stringify(report,null,2)+'\n');console.log({recaptured:[2,8],hashes:report.hashes});
