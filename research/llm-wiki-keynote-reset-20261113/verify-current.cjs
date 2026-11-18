'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),base=path.relative(root,__dirname);
const read=n=>fs.readFileSync(path.join(root,n)),json=n=>JSON.parse(read(n));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const {collectInputs,checkRecord}=require('../../scripts/design-review.cjs');
const round=process.argv[2];assert.match(round||'',/^main-\d+$/);
const source='talks/llm-wiki/slides.md',folder=base+'/'+round;
const current=collectInputs({repoRoot:root,source}),actual=current.inputs;
for(const n of ['AGENTS.md','DESIGN.md','talks/llm-wiki/qa/keynote-current.json','talks/llm-wiki/qa/keynote-coverage.json'])actual[n]=sha(read(n));
const report={checkedAt:new Date().toISOString(),source:actual[source],slideCount:current.slideCount,currentInputCount:Object.keys(actual).length,scopes:[],preservation:{}};
for(const key of ['present-1280','present-1920','read-1440','read-390']){
 const manifest=json(folder+'/'+key+'/manifest.json');
 assert.deepEqual(Object.entries(manifest.hashes).sort(),Object.entries(actual).sort(),key+' exact current inputs');
 assert.equal(manifest.observations.length,current.slideCount);assert.equal(new Set(manifest.observations.map(o=>Number(o.index))).size,current.slideCount);
 const images=[];
 for(const o of manifest.observations){
  assert.equal(o.revision,actual[source]);assert.equal(o.viewport.devicePixelRatio,1);
  assert.ok(o.images.every(i=>i.complete&&i.naturalWidth>0));
  const name=path.relative(root,o.filename),bytes=read(name);
  assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16),Math.round(o.stage.width));assert.equal(bytes.readUInt32BE(20),Math.round(o.stage.height));
  images.push({slide:Number(o.index)+1,path:name,sha256:sha(bytes)});
 }
 const qa=json(folder+'/qa-'+key+'.json');
 assert.equal(qa.status,'pass');assert.equal(qa.visualApproval,false);assert.equal(qa.summary.invalid,0);assert.equal(qa.summary.regressions,0);
 assert.equal(qa.contract.sha256,actual['talks/llm-wiki/qa/keynote-current.json']);
 const record=folder+'/reviews/'+key+'.review.json';
 let approval=null;if(fs.existsSync(path.join(root,record)))approval=checkRecord({repoRoot:root,source,record:json(record),requireApproved:true});
 if(process.argv.includes('--require-approved'))assert.ok(approval?.passed,key+' requires current independent approval');
 report.scopes.push({scope:key,qa:qa.summary,approval,images});
}
const before=json('research/llm-wiki-design-iteration-20261113/before/starting-state.json').hashes;
const protectedAssets=Object.keys(before).filter(n=>n.startsWith('talks/llm-wiki/assets/')&&!/\/speaker-guide\.(?:svg|txt)$/.test(n));
for(const n of protectedAssets)assert.equal(sha(read(n)),before[n],n+' original asset preserved');
report.preservation.originalAssets={count:protectedAssets.length,changed:0};
const protectedOther=Object.keys(before).filter(n=>n.startsWith('talks/llm-wiki/demo/')||n.startsWith('talks/llm-wiki/archive/')||n==='talks/llm-wiki/test.md');
for(const n of protectedOther)assert.equal(sha(read(n)),before[n],n+' original source preserved');
report.preservation.demoArchiveMemo={count:protectedOther.length,changed:0};
const starting=json(base+'/before/starting-state.json').hashes;
for(const n of Object.keys(starting).filter(n=>n.startsWith('talks/llm-wiki/assets/design/')||n==='talks/llm-wiki/qa/current-roles.json'))assert.equal(sha(read(n)),starting[n],n+' historical design/contract preserved');
for(const {path:n,sha256:h}of json(base+'/USER_REJECTION.json').priorRecords)assert.equal(sha(read(n)),h,n+' rejected approval history preserved');
const frozen=json(base+'/prototype-source-hashes.json').hashes;
for(const [n,h]of Object.entries(frozen))assert.equal(sha(read(n)),h,n+' frozen prototype preserved');
report.preservation.frozenPrototypeFiles={count:Object.keys(frozen).length,changed:0};
assert.equal(sha(read('research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json')),'94e5ccdd91ebda96b1bcfb8e5de7ed1724dd51654067e4d468a43d5df06da003');
report.preservation.rejectedApprovalsAndBaseline=true;
const actions=json(folder+'/technical/actions.json');assert.equal(actions.complete,true);assert.equal(actions.navigation.length,current.slideCount);assert.equal(actions.overviewCount,current.slideCount);assert.equal(actions.selections.length,2);assert.equal(actions.homeEnd,true);
assert.deepEqual(Object.entries(actions.hashes).sort(),Object.entries(actual).sort());
const roles=json('talks/llm-wiki/qa/keynote-current.json').slides,supports=roles.filter(r=>r.support);
assert.equal(actions.directSupport.length,supports.length*2);
for(const width of [390,1440])for(const role of supports){const matches=actions.directSupport.filter(s=>s.slide===role.slide&&s.width===width);assert.equal(matches.length,1);const s=matches[0];assert.equal(s.destination.url,s.departure.href);assert.equal(s.destination.anchor,role.support.target.anchor);assert.equal(s.destination.viewport.width,width);assert.equal(s.destination.documentWidth,width);assert.ok(s.destination.anchorExists&&s.destination.anchorY>=0&&s.destination.anchorY<s.destination.viewport.height);}
assert.equal(actions.materialTables.length,2);
for(const t of actions.materialTables){assert.equal(t.before,0);assert.ok(t.keyboardScrollLeft>0);assert.ok(Math.abs(t.after-(t.scrollWidth-t.clientWidth))<1);}
for(const selection of actions.selections)assert.equal(selection.text.replace(/\r?\n$/,''),selection.selected.replace(/\r?\n$/,''));
const native=json(folder+'/read-390/reading-metrics.json').supportDocuments.find(d=>d.sourcePath==='talks/llm-wiki/materials/keynote-notes.md');
const quote=native.paragraphs.filter(p=>p.section==='선택-이유-메모'&&p.isQuote&&p.text.includes('이 메모를 골랐다'));
assert.equal(quote.length,1);assert.ok(parseFloat(quote[0].fontSize)>=18);assert.ok(quote[0].lines.some(l=>l.text.replace(/\s/g,'').includes('이메모를골랐다')));
report.actions={directSupport:actions.directSupport.length,materialTables:actions.materialTables,links:actions.links.length,selections:actions.selections.length,navigation:actions.navigation.length,overview:actions.overviewCount};
report.nativeQuote={fontSize:quote[0].fontSize,lines:quote[0].lines.map(l=>l.text),wholeObjectAndPredicate:true};
report.relocatedTopics=json('talks/llm-wiki/qa/keynote-coverage.json').topics.length;assert.equal(report.relocatedTopics,26);
fs.writeFileSync(path.join(root,folder,'integration-verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,scopes:report.scopes.map(({images,...s})=>s)},null,2));
