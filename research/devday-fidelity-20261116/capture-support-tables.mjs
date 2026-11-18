const fs=await import('node:fs/promises');
const home='/Users/ou9999-wdl/Documents/devday-presentation-kit/research/devday-fidelity-20261116';
const request=JSON.parse(await fs.readFile(home+'/main-capture-request.json','utf8'));
const base=home+'/'+request.round;
const manifest=JSON.parse(await fs.readFile(base+'/read-390/manifest.json','utf8'));
const p=(await taskSpace(4)).page('p1');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
const rows=[];
for(const [n,anchor] of [[5,'검색과-지속-문서'],[7,'세-무방향-관계']]){
 await p.goto('about:blank');await p.goto('http://127.0.0.1:4336/presentations/llm-wiki/materials/keynote-notes.html#'+encodeURIComponent(anchor));
 await p.waitForFunction(revision=>document.body.dataset.revision===revision&&document.fonts.status==='loaded',manifest.hashes['talks/llm-wiki/materials/keynote-notes.md']);
 const selector='xpath=//*[@id="'+anchor+'"]/following-sibling::div[contains(@class,"material-table-scroll")][1]';
 await p.hover(selector,{label:'해설 표의 오른쪽 내용 읽기'});
 const start=await p.evaluate(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;if(!e)throw Error('Table absent');e.scrollLeft=0;e.scrollIntoView({block:'center',behavior:'instant'});return{url:location.href,width:innerWidth,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,sourceRevision:document.body.dataset.revision};},anchor);
 await p.screenshot({path:base+'/technical/support-table-'+String(n).padStart(2,'0')+'-left-390.png'});
 await p.focus(selector);await p.press(selector,'ArrowRight');
 await p.waitForFunction(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;return e.scrollLeft>0;},anchor);
 const keyboardScrollLeft=await p.evaluate(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;return e.scrollLeft;},anchor);
 await p.evaluate(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;e.scrollTo({left:e.scrollWidth,behavior:'instant'});},anchor);
 await p.waitForFunction(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;return Math.abs(e.scrollLeft-(e.scrollWidth-e.clientWidth))<1;},anchor);
 const after=await p.evaluate(id=>{let e=document.getElementById(id);while(e&&!e.classList.contains('material-table-scroll'))e=e.nextElementSibling;return{scrollLeft:e.scrollLeft,text:e.innerText,docWidth:document.documentElement.scrollWidth};},anchor);
 if(after.docWidth!==390||Math.abs(after.scrollLeft-(start.scrollWidth-start.clientWidth))>1)throw Error('Native table overflow');
 await p.screenshot({path:base+'/technical/support-table-'+String(n).padStart(2,'0')+'-right-390.png'});
 rows.push({slide:n,anchor,...start,keyboardScrollLeft,after});
}
await fs.writeFile(base+'/technical/support-tables-extra.json',JSON.stringify({complete:true,hashes:manifest.hashes,tables:rows},null,2)+'\n');
console.log({complete:true,tables:rows.length});
