'use strict';
// Deck-specific checks of preserved actual before/after observations, never aesthetic approval.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const repo=path.resolve(__dirname,'../..'),base=path.relative(repo,__dirname),round=process.argv[2];
assert.match(round||'',/^main-\d+$/);assert.notEqual(round,'main-02');
const read=n=>fs.readFileSync(path.join(repo,n)),json=n=>JSON.parse(read(n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),compact=s=>s.replace(/\s/g,'');
const evidence=n=>({path:n,sha256:sha(read(n))});
const phases=[];
for(const name of ['main-02',round]){
 const p=base+'/'+name,rm=p+'/read-390/reading-metrics.json',mf=p+'/read-390/manifest.json',sm=p+'/present-1920/svg-metrics.json';
 const reading=json(rm),manifest=json(mf),svg=json(sm);
 assert.equal(reading.captureManifest.sha256,sha(read(mf)));assert.equal(reading.revision,manifest.revision);
 const selection=reading.observations.find(o=>Number(o.index)===2).typography.filter(n=>n.tag==='P'&&n.domParent?.tag==='BLOCKQUOTE'&&n.text.includes('LLM Wiki'));
 assert.equal(selection.length,1);const quote=selection[0],rows=quote.lines.map(r=>compact(r.text));
 const paragraphs=reading.supportDocuments.find(d=>d.sourcePath==='talks/llm-wiki/materials/keynote-notes.md').paragraphs;
 const support=paragraphs.filter(n=>n.section==='선택의-근거-확인'&&!n.isQuote&&n.text.includes('읽기부터'));
 assert.ok(support.length);const question=support[0];
 const expected='입문자와하는첫위키활동',hasTitle=n=>n?.texts.some(t=>compact(t.text)===expected);
 const currentPlan=svg.observations.find(o=>o.slide===7),revisedPlan=svg.observations.find(o=>o.slide===6);assert.ok(hasTitle(revisedPlan));
 phases.push({round:name,revision:manifest.revision,evidence:[evidence(rm),evidence(mf),evidence(sm)],selection:{text:quote.text,rows:quote.lines.map(r=>r.text),passes:!rows.includes('싶어서')&&rows.some(r=>r.includes('만들고싶어서'))},currentPlan:{expectedTitle:'입문자와 하는 첫 위키 활동',actualTexts:currentPlan.texts.map(t=>t.text),passes:hasTitle(currentPlan)},supportQuestion:{text:question.text,passes:!question.text.includes('**')}});
}
for(const key of ['selection','currentPlan','supportQuestion']){assert.equal(phases[0][key].passes,false,key+' observed before must fail');assert.equal(phases[1][key].passes,true,key+' observed after must pass');}
assert.equal(compact(phases[0].selection.text),compact(phases[1].selection.text),'Exact selection words remain unchanged');
const report={format:'devday-observed-corrections-v1',checkedAt:new Date().toISOString(),visualApproval:false,scope:'Actual read390 selection glyph rhythm, current7/changed6 title correspondence, native support15 rendered question. Other scopes require their separate current QA and human review.',phases};
fs.writeFileSync(path.join(__dirname,round,'known-observation-regressions.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({before:phases[0].round,after:phases[1].round,actualBeforeFailures:3,currentPasses:3,visualApproval:false}));
