"use strict";
// Independent real source edits in a disposable project, exercised with the dev server.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const repo=path.resolve(__dirname,'../../..'),{buildProject}=require(path.join(repo,'scripts/stage.cjs'));
const stateFile=path.join(__dirname,'authoring-result.json'),phase=process.argv[2]||'setup';
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
if(phase==='setup'){
 const project=fs.mkdtempSync(path.join(os.tmpdir(),'stage-reusable-authoring-'));
 fs.cpSync(path.join(repo,'talks'),path.join(project,'talks'),{recursive:true});fs.cpSync(path.join(repo,'assets'),path.join(project,'assets'),{recursive:true});
 const fragments=fs.readFileSync(path.join(__dirname,'check-deck/slides.md'),'utf8').split('\n\n---\n\n').map(s=>s.replaceAll('../../../../assets/','../../assets/').replaceAll('../../../../talks/community-exhibit/icons/','../community-exhibit/icons/'));
 const sourcePath=path.join(project,'talks/flexible/slides.md');fs.mkdirSync(path.dirname(sourcePath),{recursive:true});
 const before=[fragments[0],fragments[7],fragments[12],fragments[15]].join('\n\n---\n\n');
 const after=[fragments[1],fragments[8],fragments[13],fragments[15].replace('ask.svg','look.svg')].join('\n\n---\n\n').replace('기록과 다음 행동','다른 발표의 검토 질문').replace('**24** 개','**31** 개').replace('**역할 1**','**다시 확인할 역할**').replace('https://example.com/0','../photo-essay/slides.md');
 fs.writeFileSync(sourcePath,before);const configPath=path.join(project,'stage.config.json');fs.writeFileSync(configPath,JSON.stringify({title:'자료 수를 바꾸는 발표',sourceDir:'talks',outputDir:'out'}));
 const receipt={project,configPath,sourcePath,before,after,beforeSha:sha(before),afterSha:sha(after),changes:{photos:[2,3],groups:[5,8],icons:[5,12],customSource:['ask.svg','look.svg'],value:[24,31],labelAndLink:true}};
 buildProject({configPath,repoRoot:repo});fs.writeFileSync(stateFile,JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({project,configPath,sourcePath,changes:receipt.changes}));
}else{
 const state=JSON.parse(fs.readFileSync(stateFile));const output=path.join(state.project,'out/flexible/content.js');
 if(phase==='edit'){fs.writeFileSync(state.sourcePath,state.after);state.outputBeforeEdit=sha(fs.readFileSync(output));}
 else if(phase==='break'){const current=fs.readFileSync(output);assert(current.includes('31')&&current.includes('다시 확인할 역할'));state.goodOutputSha=sha(current);fs.writeFileSync(state.sourcePath,state.after.replace('../../assets/photos/capture.jpg','./missing-author-photo.jpg'));}
 else if(phase==='recover'){assert.equal(sha(fs.readFileSync(output)),state.goodOutputSha,'last good output preserved');state.lastGoodPreserved=true;fs.writeFileSync(state.sourcePath,state.after);}
 else if(phase==='verify'){const current=fs.readFileSync(output,'utf8');assert.notEqual(sha(current),state.outputBeforeEdit);assert(current.includes('../photo-essay/read.html'));assert.equal(fs.readFileSync(state.sourcePath,'utf8'),state.after);state.sourceOnlyEdits=true;state.autoRebuildVerified=true;}
 else throw new Error('Unknown phase');
 fs.writeFileSync(stateFile,JSON.stringify(state,null,2)+'\n');console.log(JSON.stringify({phase,lastGoodPreserved:state.lastGoodPreserved,autoRebuildVerified:state.autoRebuildVerified}));
}
