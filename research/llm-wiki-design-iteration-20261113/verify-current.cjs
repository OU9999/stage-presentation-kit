'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=n=>fs.readFileSync(path.join(root,n));
const json=n=>JSON.parse(read(n));
const {collectInputs,checkRecord}=require('../../scripts/design-review.cjs');
const round=process.argv[2];if(!/^round-\d+$/.test(round||''))throw Error('Explicit round required');
const base=path.relative(root,__dirname),folder=base+'/'+round;
const actual=collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).inputs;
for(const f of ['AGENTS.md','DESIGN.md','talks/llm-wiki/qa/current-roles.json'])actual[f]=sha(read(f));
const scopes=[];
for(const key of ['present-1280','present-1920','read-1440','read-390']){
 const manifest=json(folder+'/'+key+'/manifest.json');
 assert.deepEqual(Object.entries(manifest.hashes).sort(),Object.entries(actual).sort(),key+' exact input identity');
 assert.equal(manifest.observations.length,26);assert.equal(new Set(manifest.observations.map(r=>Number(r.index))).size,26);
 const images=[];
 for(const row of manifest.observations){
  assert.equal(row.revision,actual['talks/llm-wiki/slides.md']);
  assert.equal(row.viewport.devicePixelRatio,1);
  const name=path.relative(root,row.filename),bytes=read(name);
  assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16),Math.round(row.stage.width));assert.equal(bytes.readUInt32BE(20),Math.round(row.stage.height));
  assert.ok(row.images.every(img=>img.complete&&img.naturalWidth>0));
  images.push({slide:Number(row.index)+1,path:name,sha256:sha(bytes)});
 }
 const recordPath=folder+'/reviews/'+key+'.review.json';
 let approval=null;if(fs.existsSync(path.join(root,recordPath)))approval=checkRecord({repoRoot:root,source:'talks/llm-wiki/slides.md',record:json(recordPath),requireApproved:true});
 if(process.argv.includes('--require-approved'))assert.ok(approval?.passed,key+' current explicit visual approval required');
 scopes.push({scope:key,inputs:Object.keys(actual).length,slides:26,actualPNGDimensions:true,approval,images});
}
const before=json(base+'/before/starting-state.json').hashes;
const protectedAssets=Object.keys(before).filter(n=>n.startsWith('talks/llm-wiki/assets/')&&!/\/speaker-guide\.(?:svg|txt)$/.test(n));
for(const f of protectedAssets)assert.equal(sha(read(f)),before[f],f+' original preserved');
for(const f of ['AGENTS.md','CONFIG.md','app.js','blocks.js','blocks.css','styles.css','visual.js','visual.css','deck-model.js','talks/llm-wiki/test.md'])assert.equal(sha(read(f)),before[f],f+' preserved');
const originalReview=json('research/llm-wiki-design-audit-20261113/design-needs-changes.review.json');assert.equal(sha(read(originalReview.reviewSource.path)),originalReview.reviewSource.sha256);
const historical='research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json';assert.equal(sha(read(historical)),'94e5ccdd91ebda96b1bcfb8e5de7ed1724dd51654067e4d468a43d5df06da003');
const qa=['1280','1920'].map(width=>{const result=json(folder+'/qa-'+width+'.json');assert.equal(result.status,'pass');assert.equal(result.visualApproval,false);assert.equal(result.summary.invalid,0);assert.equal(result.summary.regressions,0);assert.equal(result.contract.sha256,actual['talks/llm-wiki/qa/current-roles.json']);return{width:Number(width),...result.summary,contract:result.contract};});
const reading=json(folder+'/qa-reading-390.json');assert.equal(reading.status,'pass');assert.equal(reading.visualApproval,false);assert.equal(reading.summary.invalid,0);assert.equal(reading.summary.regressions,0);assert.equal(reading.contract.sha256,actual['talks/llm-wiki/qa/current-roles.json']);
const frozenReview=json(base+'/round-02/design-source-hashes.json');for(const [name,hash] of Object.entries(frozenReview.hashes))assert.equal(sha(read(name)),hash,'Closed independent round-02 review preserved: '+name);
const actions=json(folder+'/final-actions.json');assert.equal(actions.complete,true);assert.equal(actions.links.length,9);assert.equal(actions.navigation.length,26);assert.equal(actions.selections.length,2);assert.equal(actions.overviewCount,26);
const report={checkedAt:new Date().toISOString(),round,source:actual['talks/llm-wiki/slides.md'],currentInputs:Object.keys(actual).length,scopes,qa,reading:{...reading.summary,contract:reading.contract},preservedRound02ManualReviews:true,protectedAssets:{count:protectedAssets.length,changed:0},preservedHistory:true,protectedRuntimeAndMeaningInputs:true,actions:{links:9,navigation:26,selections:2,overview:26}};
fs.writeFileSync(path.join(__dirname,round,'integration-verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,scopes:scopes.map(({images,...scope})=>scope)},null,2));
