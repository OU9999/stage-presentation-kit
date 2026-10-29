import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';
const dir=fileURLToPath(new URL('./',import.meta.url));
const site=globalThis.FOUNDATIONS_QA_BASE||'http://127.0.0.1:4323/';
const prefix=site.startsWith('https:')?'public-':'';
const p=(await taskSpace(108)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
const rows=[];
for(const name of ['reading','team','course']){
 const section={reading:'소설-독서',team:'고객-요구',course:'강의-메모'}[name];
 await p.goto(site+'presentations/llm-wiki/materials/study-guide.html#'+encodeURIComponent(section));
 await p.waitForSelector('.material-content');await p.waitForFunction(()=>document.fonts.status==='loaded');
 const href=await p.evaluate(name=>[...document.querySelectorAll('.material-content a')].find(a=>new RegExp('/(?:[a-f0-9]+-)?'+name+'\\.txt$').test(a.getAttribute('href')))?.getAttribute('href'),name);
 if(!href)throw new Error('Missing case attachment link: '+name);
 const url=new URL(href,site+'presentations/llm-wiki/materials/study-guide.html').href;
 const expected=await fs.readFile(new URL('../../../talks/llm-wiki/assets/examples/'+name+'.txt',import.meta.url));
 const response=await fetch(url,{method:'HEAD'});if(!response.ok)throw new Error('Attachment HEAD failed: '+url);
 const contentType=response.headers.get('content-type')||'';
 let actual,method;
 if(contentType.includes('octet-stream')){
  const pending=p.waitForEvent('download',{timeout:10000});await p.click('.material-content a[href="'+href+'"] >> nth=0');
  const download=await pending,temporary=await fs.mkdtemp(path.join(os.tmpdir(),'wiki-case-download-')),file=path.join(temporary,name+'.txt');
  await download.saveAs(file);actual=await fs.readFile(file);method='click and download';
 }else{
  await p.click('.material-content a[href="'+href+'"] >> nth=0');await p.waitForFunction(()=>document.querySelector('pre'));
  actual=Buffer.from(await p.evaluate(()=>document.querySelector('pre').textContent),'utf8');method='click and read';
 }
 if(!actual.equals(expected))throw new Error('Case attachment text differs: '+name);
 rows.push({name,url,contentType,method,bytes:actual.length,sha256:crypto.createHash('sha256').update(actual).digest('hex')});
}
await fs.writeFile(dir+prefix+'case-links.json',JSON.stringify(rows,null,2)+'\n');console.log({attachments:rows.length,methods:rows.map(r=>r.method)});
