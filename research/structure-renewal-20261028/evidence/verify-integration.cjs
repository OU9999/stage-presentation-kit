'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process'),assert=require('node:assert/strict');const root=path.resolve(__dirname,'../../..');process.chdir(root);const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json'))),hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);
for(const [file,expected] of Object.entries(baseline.sha256))assert.equal(hash(fs.readFileSync(file)),expected,file+' unchanged');
const files=['index.html',...walk('examples'),...walk('presentations'),...walk('starters/markdown/presentations')],snapshot=()=>Object.fromEntries(files.map(file=>[file,hash(fs.readFileSync(file))]));
const run=args=>{const result=cp.spawnSync('npm',args,{encoding:'utf8',cwd:root});assert.equal(result.status,0,result.stderr);return result.stdout.trim();};
const before=snapshot();run(['run','verify:site']);assert.deepEqual(snapshot(),before);run(['run','build:site']);assert.deepEqual(snapshot(),before);
const history=cp.execFileSync('git',['diff','--name-only','4d1adfa','--','research',':!research/structure-renewal-20261028'],{encoding:'utf8'}).trim();assert.equal(history,'');
const result={baseline:baseline.head,protectedFiles:Object.keys(baseline.sha256).length,runtimeAndFourSourcesUnchanged:true,rootHtmlByteIdentical:true,checkedFiles:files.length,verifyDidNotModifyOutputs:true,wholeSiteRebuildByteIdentical:true,archivedEvidenceUnchanged:true};fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
