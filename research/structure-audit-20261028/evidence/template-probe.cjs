'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const statePath=path.join(__dirname,'probes.json'),state=JSON.parse(fs.readFileSync(statePath)),kit=path.join(state.temporaryRoot,'kit'),project=path.join(state.temporaryRoot,'moved project'),index=path.join(kit,'index.html');
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);
const snapshot=()=>Object.fromEntries(walk(path.join(project,'site')).map(f=>[path.relative(project,f),crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')]));
const before=snapshot(),template=fs.readFileSync(index,'utf8');let run;
try{fs.writeFileSync(index,'<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>발표 모음</title></head><body><main><a href="presentations/">발표 모음 열기</a></main></body></html>');run=cp.spawnSync('npm',['run','build','--','--config',path.join(project,'stage.config.json')],{cwd:kit,encoding:'utf8'});assert.notEqual(run.status,0);assert.match(run.stderr,/template에 helpDialog가 없습니다/);assert.deepEqual(snapshot(),before);}finally{fs.writeFileSync(index,template);}
state.templateCoupling={rootReplacedWithCollectionLanding:true,markdownBuildExit:run.status,error:run.stderr.trim(),lastGoodOutputPreserved:true};fs.writeFileSync(statePath,JSON.stringify(state,null,2)+'\n');console.log(JSON.stringify(state.templateCoupling));
