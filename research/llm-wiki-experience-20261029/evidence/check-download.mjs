import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {prepare} from '../../reusable-layouts-20261028/evidence/browser-helpers.mjs';

const dir=fileURLToPath(new URL('./',import.meta.url));
const base=globalThis.EXPERIENCE_QA_BASE || 'http://127.0.0.1:4323/';
const prefix=base.startsWith('https:')?'public-':'';
const expected=await fs.readFile(new URL('../../../talks/llm-wiki/demo/llm-wiki-demo.zip',import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const p=(await taskSpace(88)).page('p1');await prepare(p);await p.cdp('Page.bringToFront');
await p.goto(base+'presentations/llm-wiki/index.html?download=experience#39');
await p.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='38');
const downloadEvent=p.waitForEvent('download',{timeout:30000});
await p.click('#slideStage .is-active a[href$=".zip"]');
const download=await downloadEvent;
const temporary=await fs.mkdtemp(path.join(os.tmpdir(),'llm-wiki-browser-download-'));
const filename=path.join(temporary,'demo.zip');await download.saveAs(filename);
const actual=await fs.readFile(filename);
if(sha(actual)!==sha(expected))throw new Error('Downloaded bytes differ');
execFileSync('/usr/bin/unzip',['-q',filename,'-d',temporary]);
const cwd=path.join(temporary,'llm-wiki-demo');
// Ego's process.execPath is its helper, so use the real shell Node binary.
const node='/Users/ou9999-wdl/.nvm/versions/node/v24.22.1/bin/node';
const runs=[];
for(const args of [['run-demo.cjs','--check'],['run-demo.cjs'],['run-demo.cjs','--check']]){
  const output=execFileSync(node,args,{cwd,encoding:'utf8'});runs.push({args,result:JSON.parse(output)});
}
const result={url:download.url(),suggestedFilename:download.suggestedFilename(),bytes:actual.length,sha256:sha(actual),runs};
await fs.writeFile(dir+prefix+'download.json',JSON.stringify(result,null,2)+'\n');
await fs.rm(temporary,{recursive:true,force:true});console.log(result);
