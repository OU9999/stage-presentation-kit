const fs=await import('node:fs/promises');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit/research/devday-fidelity-20261116';
const task=await taskSpace(4),page=task.page('p1');
const records=[];
for(const [id,times] of [['Fls_onRviPM',[1230,1260,1380,1455,1500,1550,2870,2910]],['XkKdbPhIvbY',[210,1200]]]){
 if(!(await page.url()).includes('v='+id))await page.goto('https://www.youtube.com/watch?v='+id);
 await page.waitForFunction(()=>!!document.querySelector('video')&&document.querySelector('video').readyState>=2,undefined,{timeout:20000});
 await page.waitForFunction(id=>document.querySelector('#movie_player')?.getVideoData?.().video_id===id,id,{timeout:20000});
 if(await page.evaluate(()=>document.querySelector('#movie_player').classList.contains('unstarted-mode'))){
  const r=await page.evaluate(()=>{const r=document.querySelector('#movie_player').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};});
  await page.mouse.click(r.x,r.y,{label:'Play official session'});
 }
 await page.waitForFunction(()=>!document.querySelector('#movie_player').classList.contains('unstarted-mode'),undefined,{timeout:15000});
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 const metadata=await page.evaluate(()=>{const p=document.querySelector('#movie_player'),d=p?.getVideoData?.();return{url:location.href,title:document.title,videoData:d?{video_id:d.video_id,title:d.title,author:d.author}:null,channel:document.querySelector('#owner #channel-name')?.textContent.trim()};});
 for(const time of times){
  await page.evaluate(t=>{const v=document.querySelector('video');v.pause();v.currentTime=t;},time);
  await page.waitForFunction(t=>{const v=document.querySelector('video');return !v.seeking&&v.readyState>=2&&Math.abs(v.currentTime-t)<.2;},time,{timeout:15000});
  const state=await page.evaluate(()=>{const v=document.querySelector('video'),r=v.getBoundingClientRect();return{time:v.currentTime,paused:v.paused,readyState:v.readyState,videoWidth:v.videoWidth,videoHeight:v.videoHeight,scroll:{x:scrollX,y:scrollY},viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},rect:{x:r.x,y:r.y,width:r.width,height:r.height}};});
  if(!state.videoWidth||state.rect.width<100||state.rect.y<0||state.rect.y+state.rect.height>state.viewport.height)throw Error('Video not fully visible');
  const filename='evidence/official-'+id+'-'+time+'.png';
  await page.screenshot({path:root+'/'+filename,clip:state.rect});
  records.push({...metadata,...state,file:filename,observation:'Fresh official video seek frame; not a claim of continuous playback or full-video review.'});
  await fs.writeFile(root+'/evidence/official-frames.json',JSON.stringify(records,null,2)+'\n');
  console.log({id,time,file:filename});
 }
}
console.log({complete:true,frames:records.length,taskSpaceId:task.spaceId});
