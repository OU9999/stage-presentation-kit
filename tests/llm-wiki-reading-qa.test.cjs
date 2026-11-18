'use strict';
// Frozen pre-keynote 26-slide regression; current keynote coverage lives in llm-wiki-keynote-qa.test.cjs.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {evaluateReading,readingRowsVerdict}=require('../scripts/llm-wiki-reading-qa.cjs');
const {parseDocument}=require('../lib/markdown-document.cjs');
const fixture=require('../talks/llm-wiki/qa/current-roles.json');
const root=path.join(__dirname,'..'),base='research/llm-wiki-design-iteration-20261113/round-02/';
const oldMetrics=require('../'+base+'reading-18-lines-390.json');
const oldManifestBytes=fs.readFileSync(path.join(root,base+'read-390/manifest.json'));
const oldSource=fs.readFileSync(path.join(root,base+'source/talks/llm-wiki/slides.md'),'utf8');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const walk=n=>[n,...(n.children||[]).flatMap(walk)],text=n=>n.type==='text'?n.value:(n.children||[]).map(text).join('');
const compact=s=>s.replace(/\s/g,'');
function evaluateFrozen(metrics=oldMetrics,source=oldSource){return evaluateReading(metrics,source,{fixture,manifest:JSON.parse(oldManifestBytes),manifestSha256:sha(oldManifestBytes),currentInputs:oldMetrics.hashes,contractSha256:oldMetrics.hashes['talks/llm-wiki/qa/current-roles.json']});}
test('the new reading checker reproduces both actual round-02 isolated predicate rows without invalid evidence',()=>{
 const r=evaluateFrozen();assert.equal(r.status,'regression');assert.equal(r.summary.invalid,0);assert.equal(r.visualApproval,false);assert.equal(r.checks.find(c=>c.id==='responsibility-rows').status,'regression');
 const role=oldMetrics.typography.find(n=>compact(n.text)===compact(fixture.reading.body.text));assert.deepEqual(role.lines.filter(l=>fixture.reading.body.forbiddenRows.includes(l.text)).map(l=>l.text),['정하고,','남깁니다.']);
});
test('missing native glyph coordinates, a missing role, another viewport or a stale reading manifest cannot pass',()=>{
 for(const mutate of [m=>delete m.typography[2].lines[0].y,m=>m.typography.splice(2,1),m=>m.viewport.width=1440,m=>m.captureManifest.sha256='0'.repeat(64),m=>delete m.hashes['blocks.css']]){const m=structuredClone(oldMetrics);mutate(m);assert.equal(evaluateFrozen(m).status,'contract-invalid');}
});
test('same-y literal newlines are one measured row and only the designated predicate rows fail',()=>{
 const n={text:'목적은 직접 정하고,',lines:[{text:'목적은 직접\n정하고,',x:0,y:0,width:170,height:22}]};assert.equal(readingRowsVerdict(n,['정하고,']),'pass');
 n.lines=[{text:'목적은 직접',x:0,y:0,width:120,height:22},{text:'정하고,',x:0,y:33,width:50,height:22}];assert.equal(readingRowsVerdict(n,['정하고,']),'regression');
 n.lines[1].text='정하';assert.equal(readingRowsVerdict(n,['정하고,']),'contract-invalid');
});
test('the frozen pre-keynote source keeps every responsibility word, the original central boundary and declaration emphasis, adding only two local boundaries',()=>{
 const source=fs.readFileSync(path.join(root,'research/llm-wiki-keynote-reset-20261113/before/talks/llm-wiki/slides.md'),'utf8');
 const before='누구를 위해 무엇을 만들지 목적은 직접 정하고,\\\n감정 · 생각 · 판단 · 선택 이유를 직접 남깁니다.';
 const after='누구를 위해 무엇을 만들지\\\n목적은 직접 정하고,\\\n감정 · 생각 · 판단 · 선택 이유를\\\n직접 남깁니다.';
 assert.ok(oldSource.includes(before));assert.equal(source,oldSource.replace(before,after),'Only slide 18 breathing changes; accepted 10/12/15 and every other source slide stay unchanged.');
 const nodes=parseDocument(source).slides[17].blocks.flatMap(walk),paragraphs=nodes.filter(n=>n.tag==='p');
 const body=paragraphs.find(n=>compact(text(n))===compact(fixture.reading.body.text));assert.ok(body);assert.equal(walk(body).filter(n=>n.tag==='br').length,3);
 const segments=body.children.reduce((rows,n)=>{if(n.tag==='br')rows.push('');else rows[rows.length-1]+=text(n);return rows;},['']).map(s=>s.trim());
 assert.deepEqual(segments,['누구를 위해 무엇을 만들지','목적은 직접 정하고,','감정 · 생각 · 판단 · 선택 이유를','직접 남깁니다.']);
 const declaration=paragraphs.find(n=>compact(text(n))===compact(fixture.reading.declaration.text));assert.equal(walk(declaration).filter(n=>n.tag==='br').length,1);assert.equal(walk(declaration).filter(n=>n.tag==='strong').map(text).join(''),'내가 적습니다.');
 assert.ok(paragraphs.some(n=>text(n)===fixture.reading.distinction));
});
