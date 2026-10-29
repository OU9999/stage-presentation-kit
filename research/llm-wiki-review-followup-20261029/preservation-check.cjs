'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'input/baseline.json')));
const {parseDocument}=require(path.join(root,'scripts/markdown-document.cjs'));
const file='talks/llm-wiki/slides.md',old=cp.execFileSync('git',['show',baseline.head+':'+file],{cwd:root,encoding:'utf8'}),current=fs.readFileSync(path.join(root,file),'utf8');
const options={sourcePath:file,id:'llm-wiki'};
const a=parseDocument(old,options),b=parseDocument(current,options);
function normalized(value){if(Array.isArray(value))return value.map(normalized);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!['position','origin'].includes(k)).map(([k,v])=>[k,normalized(v)]));return value;}
const changed=[];for(let i=0;i<a.slides.length;i++)if(JSON.stringify(normalized(a.slides[i]))!==JSON.stringify(normalized(b.slides[i])))changed.push(i+1);
assert.deepEqual(changed,[3,10,16,23,25,26,27,39]);
const altered=Object.entries(baseline.files).filter(([f,h])=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')!==h).map(([f])=>f);
assert.deepEqual(altered,['talks/llm-wiki/slides.md','talks/llm-wiki/materials/speaker-script.md']);
const reading=fs.readFileSync(path.join(root,'talks/llm-wiki/assets/case-reading-initial.svg'),'utf8'),course=fs.readFileSync(path.join(root,'talks/llm-wiki/assets/case-course-initial.svg'),'utf8');
assert.ok(!/3장|추적|피신|동료 보호/.test(reading));assert.ok(!/8주차|Gini|분류트리/.test(course));
const snapshot=JSON.parse(fs.readFileSync(path.join(__dirname,'input/snapshot.json')));
const stale=Object.entries(snapshot.source_files).filter(([f,h])=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')!==h).map(([f])=>f);assert.deepEqual(stale,[]);
const result={baseline:baseline.head,revision:snapshot.revision,changed_source_slides:changed,preserved_reveal_slides:[11,17],modified_baseline_files:altered,unchanged_baseline_files:Object.keys(baseline.files).length-altered.length,frozen_source_files:Object.keys(snapshot.source_files).length,changed_after_freeze:stale,initial_svgs_exclude_future_information:true,scope:'AST comparison excludes source locations; source/asset identity and disclosure boundary checks are separate from presentation quality.'};
fs.writeFileSync(path.join(__dirname,'evidence/preservation.json'),JSON.stringify(result,null,2)+'\n');console.log(result);
