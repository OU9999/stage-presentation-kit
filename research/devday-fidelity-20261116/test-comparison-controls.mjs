const fs=await import('node:fs/promises');
const base='/Users/ou9999-wdl/Documents/devday-presentation-kit/research/devday-fidelity-20261116';
const p=(await taskSpace(4)).page('p1');
const request=JSON.parse(await fs.readFile(base+'/main-capture-request.json','utf8'));
const latest=request.round;
const out=[];
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await p.goto('http://127.0.0.1:4336/research/devday-fidelity-20261116/');
await p.waitForFunction(latest=>Boolean(document.querySelector('#round option[value=\"'+latest+'\"]'))&&document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete&&i.naturalWidth>0),latest);
const entrySnapshot=await p.snapshot();await fs.writeFile(base+'/'+latest+'/technical/comparison-entry.txt',typeof entrySnapshot==='string'?entrySnapshot:JSON.stringify(entrySnapshot,null,2));
for(const round of ['round-01','round-02',latest])for(const width of ['1280','1920'])for(let role=0;role<4;role++){
 await p.selectOption('#round',round);await p.selectOption('#width',width);await p.click('#tabs button >> nth='+role,{label:'원본과 수정 장면 비교'});
 await p.waitForFunction(({round,width,role})=>{const after=document.querySelector('#after');return after.src.includes('/'+round+'/present-'+width+'/')&&[...document.querySelectorAll('#tabs button')][role].getAttribute('aria-pressed')==='true'&&[...document.images].every(i=>i.complete&&i.naturalWidth>0);},{round,width,role});
 const row=await p.evaluate(()=>({round:document.querySelector('#round').value,width:document.querySelector('#width').value,title:document.querySelector('#newTitle').textContent,images:[...document.images].map(i=>({src:i.src,width:i.naturalWidth})),deck:document.querySelector('#deck').href}));
 if(row.images.length!==3||row.images.some(i=>!i.width))throw Error('Missing comparison image');out.push(row);
}
await fs.writeFile(base+'/'+latest+'/technical/comparison-controls.json',JSON.stringify({complete:true,combinations:out},null,2)+'\n');
await p.selectOption('#round',latest);await p.selectOption('#width','1920');await p.click('#tabs button >> nth=3',{label:'근거 장면의 원본 대조'});
await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
await p.screenshot({path:base+'/'+latest+'/technical/comparison-preview.png'});
console.log({complete:true,combinations:out.length});
