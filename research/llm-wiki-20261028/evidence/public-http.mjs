import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import {fileURLToPath} from 'node:url';
const repo=fileURLToPath(new URL('../../../',import.meta.url));
const base='https://ou9999.github.io/stage-presentation-kit/';
const head=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim();
async function walk(folder){const entries=await fs.readdir(path.join(repo,folder),{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(folder+'/'+e.name):folder+'/'+e.name))).flat();}
const files=[...await walk('presentations/llm-wiki'),...await walk('presentations/_runtime'),'presentations/index.html','presentations/manifest.json','index.html','presentations/product-notes/index.html','presentations/product-notes/read.html','presentations/product-notes/content.js','research/llm-wiki-20261028/index.html',...Array.from({length:12},(_,i)=>'research/llm-wiki-20261028/evidence/screens/slide-'+String(i+1).padStart(2,'0')+'.png')];
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const rows=[];
for(let i=0;i<files.length;i+=6){rows.push(...await Promise.all(files.slice(i,i+6).map(async file=>{const response=await fetch(base+file+'?verify='+head,{signal:AbortSignal.timeout(20000)});const bytes=Buffer.from(await response.arrayBuffer());const expected=await fs.readFile(path.join(repo,file));return{file,status:response.status,type:response.headers.get('content-type'),bytes:bytes.length,sha256:digest(bytes),matches:bytes.equals(expected)};})));}
await fs.writeFile(new URL('./public-http.json',import.meta.url),JSON.stringify({head,base,checkedAt:new Date().toISOString(),rows},null,2)+'\n');
console.log({head,files:rows.length,failed:rows.filter(r=>r.status!==200||!r.matches),textTypes:rows.filter(r=>r.file.endsWith('.txt')).map(r=>({file:r.file,type:r.type}))});
if(rows.some(r=>r.status!==200||!r.matches))process.exitCode=1;
