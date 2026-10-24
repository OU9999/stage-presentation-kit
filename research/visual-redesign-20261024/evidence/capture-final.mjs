const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const root = '/Users/ou9999/Documents/stage-presentation-kit';
const out = root + '/research/visual-redesign-20261024/evidence';
await fs.mkdir(out + '/slides', {recursive:true});
const task = await taskSpace(9), page = task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride', {width:1728,height:1120,deviceScaleFactor:1,mobile:false});
await page.goto('http://localhost:4317/examples/visual-story/index.html?review=final#1');
if (await page.evaluate(()=>document.body.dataset.mode==='read')) await page.click('[data-action="mode"]');
const records = [];
for (let index=0; index<12; index++) {
  if (index) await page.click('[data-action="next"]');
  await page.waitForFunction(i=>document.querySelector('#slideStage>.is-active')?.dataset.index===String(i), index);
  await page.evaluate(async()=>{await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const record = await page.evaluate(()=>{
    const slide=document.querySelector('#slideStage>.is-active'), box=slide.getBoundingClientRect();
    const outside=[...slide.querySelectorAll('[data-field]')].filter(n=>{const r=n.getBoundingClientRect();return r.width&&r.height&&(r.left<box.left-2||r.top<box.top-2||r.right>box.right+2||r.bottom>box.bottom+2);}).map(n=>n.dataset.field);
    return {index:Number(slide.dataset.index)+1,title:slide.querySelector('.slide-title')?.innerText,layout:slide.dataset.layout,frames:slide.querySelectorAll('.media-frame').length,outside,opacity:getComputedStyle(slide).opacity,text:slide.innerText,box:{x:box.x,y:box.y,width:box.width,height:box.height,scale:1600/box.width}};
  });
  if(record.index!==index+1||record.opacity!=='1'||record.outside.length) throw new Error(JSON.stringify(record));
  const capture=await page.cdp('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:true,clip:record.box});
  const bytes=Buffer.from(capture.data,'base64');
  record.pixels=[bytes.readUInt32BE(16),bytes.readUInt32BE(20)];
  await fs.writeFile(out+'/slides/'+String(index+1).padStart(2,'0')+'.png',bytes);
  records.push(record);
}
for(const [name,number] of Object.entries({funnel:'03',trend:'04',matrix:'08',heatmap:'10'})) await fs.copyFile(out+'/slides/'+number+'.png',out+'/after-'+name+'.png');
const hashes={};
for(const name of ['app.js','deck-model.js','visual.js','visual.css','examples/visual-story/content.js']) hashes[name]=crypto.createHash('sha256').update(await fs.readFile(root+'/'+name)).digest('hex');
await fs.writeFile(out+'/final-slides.json',JSON.stringify({url:await page.url(),hashes,records},null,2)+'\n');
console.log({slides:records.length,pixels:records[0].pixels,outside:records.flatMap(r=>r.outside),frames:records.reduce((n,r)=>n+r.frames,0)});
