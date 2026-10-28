"use strict";
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),cp=require('node:child_process');
const repo=path.resolve(__dirname,'../../..');process.chdir(repo);
const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json')));
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const kept=['styles.css','visual.css','visual.js','talks/product-notes/slides.md','talks/team-learning/slides.md'];
for(const file of kept)assert.equal(sha(file),baseline.hashes[file],file+' preserved');
const original=cp.execFileSync('git',['show',baseline.head+':deck-model.js'],{encoding:'utf8'}),context={module:{exports:{}}};vm.runInNewContext(original,context);const before=context.module.exports,model=require(path.join(repo,'deck-model.js'));
const plain=value=>JSON.parse(JSON.stringify(value));
for(const variant of [undefined,'seoul','recap'])assert.deepEqual(plain(model.bentoPreset(variant)),plain(before.bentoPreset(variant)),'legacy bento '+variant);
for(let n=1;n<=22;n++)assert.deepEqual(plain(model.iconWallSlots(n)),plain(before.iconWallSlots(n)),'legacy wall '+n);
for(let n=1;n<=8;n++)assert.deepEqual(plain(model.packMosaic(Array.from({length:n},()=>({span:1})))),plain(before.packMosaic(Array.from({length:n},()=>({span:1})))),'legacy mosaic '+n);
const oldApp=cp.execFileSync('git',['show',baseline.head+':app.js'],{encoding:'utf8'}),literal=oldApp.match(/var iconPaths = (\{[\s\S]*?\n  \});/)[1];assert.deepEqual(plain(model.iconPaths),plain(vm.runInNewContext('('+literal+')')));
const runtime=['styles.css','visual.css','blocks.css','deck-model.js','visual.js','blocks.js','app.js'];
const copies=['presentations/_runtime','examples/visual-starter/runtime','examples/text-layout/runtime'];
for(const directory of copies)for(const name of runtime)assert.equal(sha(path.join(directory,name)),sha(name),directory+'/'+name);
const runtimeRefs=[];for(const file of ['index.html',...['product-launch','engineering-review','photo-story','workshop','devday-compositions','visual-story','visual-starter','text-layout'].map(x=>'examples/'+x+'/index.html'),...['product-notes','team-learning','photo-essay','community-exhibit'].flatMap(x=>['presentations/'+x+'/index.html','presentations/'+x+'/read.html'])]){
 const html=fs.readFileSync(file,'utf8');for(const name of runtime){const match=html.match(new RegExp('(?:href|src)="([^"\\s]*'+name.replace('.','\\.')+')\\?v=([a-f0-9]+)"'));assert(match,file+' '+name);const resolved=path.resolve(path.dirname(file),match[1]);assert(fs.existsSync(resolved),resolved);assert.equal(match[2],sha(resolved).slice(0,12),file+' '+name+' version');runtimeRefs.push({file,name});}
}
const history=cp.execFileSync('git',['diff','--name-only',baseline.head,'--','research/design-recovery-20261028','research/design-system-reaudit-20261028','research/presentation-renewal-20261028','research/photo-ratio-check-20261028'],{encoding:'utf8'}).trim();assert.equal(history,'','archived evidence unchanged');
const receipt={baseline:baseline.head,preserved:kept,legacyApiComparisons:3+22+8,sharedIcons:Object.keys(model.iconPaths).length,runtimeFiles:runtime.length,clonedRuntimeFiles:runtime.length*copies.length,versionReferences:runtimeRefs.length,archivedEvidenceUnchanged:!history};fs.writeFileSync(path.join(__dirname,'integration.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
