'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {evaluate:evaluateRaw,actualLines,tailVerdict,breakVerdict,boxInside,svgPhraseVerdict}=require('../scripts/llm-wiki-typography-qa.cjs');
const fixture=require('../research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json');
const before=require('../research/llm-wiki-typography-20261102/before/present-1280/manifest.json');
const beforeSVG=require('../research/llm-wiki-typography-20261102/before/present-1280/svg-metrics.json');
const source=fs.readFileSync(require.resolve('../research/llm-wiki-typography-20261102/engineering/fixtures/slides-before.md'),'utf8');
const clone=o=>structuredClone(o);
const evaluate=(m,s,o={})=>evaluateRaw(m,s,{mode:'baseline',svgMetrics:beforeSVG,...o});
const node=(text,lines)=>({text,lines:lines.map(([text,y])=>({text,y}))});

test('same checker reproduces real baseline predicate, font, boundary, membership and asset failures without invalid fixtures',()=>{
 const r=evaluate(before,source,{svgMetrics:beforeSVG});
 assert.equal(r.status,'regression');assert.equal(r.summary.invalid,0);assert.equal(r.visualApproval,false);
 for(const id of ['context-tail','ai-work-tail','shared-editing-tail','topic-files-tail','benefit-reuse-tail','risk-change-tail','context-difficulty-font','request-0-font','human-declaration-rendered-break','shared-source-membership','diagram-5-source','diagram-20-font'])assert.equal(r.checks.find(c=>c.id===id)?.status,'regression',id);
});

test('rendered y coordinates define rows; literal newline in one glyph row does not create two rows',()=>{
 assert.equal(actualLines(node('첫 호흡\n다음 호흡',[['첫 호흡\n다음 호흡',100]])).length,1);
 assert.equal(breakVerdict(node('첫 호흡\n다음 호흡',[['첫 호흡\n다음 호흡',100]]),'첫 호흡','다음 호흡'),'regression');
 assert.equal(tailVerdict(node('다시 읽게 합니다.',[['다시 읽게\n합니다.',100]]),['합니다.']),'pass');
});

test('designated lonely predicate fails while a phrase plus its predicate passes using the same tail function',()=>{
 assert.equal(tailVerdict(node('다시 읽게 합니다.',[['다시 읽게 ',100],['합니다.',145]]),['합니다.']),'regression');
 assert.equal(tailVerdict(node('다시 읽게 합니다.',[['다시 읽게 합니다.',100]]),['합니다.']),'pass');
 assert.equal(tailVerdict(node('다시 읽게 합니다.',[['다시 읽게 ',100],['합니',145]]),['합니다.']),'contract-invalid');
});

test('same-y glyph fragments merge and missing/invalid glyph coordinates cannot pass',()=>{
 assert.equal(tailVerdict(node('다시 읽게 합니다.',[['다시 ',100],['읽게 합니다.',100.1]]),['합니다.']),'pass');
 assert.equal(tailVerdict({text:'합니다.',lines:[]},['합니다.']),'contract-invalid');
 assert.equal(tailVerdict({text:'합니다.',lines:[{text:'합니다.'}]},['합니다.']),'contract-invalid');
});

test('authored boundary needs before/after glyph y, with extra automatic rows left for human review',()=>{
 const n=node('왜 골랐고, 어떤 질문을 풀려는가?',[['왜 골랐고,',100],['어떤 질문을',195],['풀려는가?',290]]);
 n.breaks=[{beforeText:'왜 골랐고,',afterText:'어떤 질문을 풀려는가?',beforeGlyph:{y:100},afterGlyph:{y:195}}];
 assert.equal(breakVerdict(n,'왜 골랐고,','어떤 질문을 풀려는가?'),'pass');
 n.breaks[0].afterGlyph.y=100;assert.equal(breakVerdict(n,'왜 골랐고,','어떤 질문을 풀려는가?'),'regression');
 delete n.breaks;assert.equal(breakVerdict(n,'왜 골랐고,','어떤 질문을 풀려는가?'),'contract-invalid');
});

test('target deletion and duplication are contract-invalid rather than successful removal of the failure',()=>{
 for(const mutation of ['deleted','duplicated']){
  const m=clone(before),p=m.observations[3].typography.find(n=>n.text.startsWith('흩어진 맥락'));
  if(mutation==='deleted')m.observations[3].typography=m.observations[3].typography.filter(n=>n!==p);else m.observations[3].typography.push(clone(p));
  assert.equal(evaluate(m,source).status,'contract-invalid',mutation);
 }
 const modified=source.replace('필요할 때 다시 읽게 합니다.','필요할 때 합니다.');
 const m=clone(before);m.revision=crypto.createHash('sha256').update(modified).digest('hex');
 assert.equal(evaluate(m,modified).status,'contract-invalid');
});

test('a missing slide, duplicate observation or stale source revision is contract-invalid',()=>{
 for(const type of ['missing','duplicate','revision']){const m=clone(before);if(type==='missing')m.observations=m.observations.filter(o=>Number(o.index)!==16);if(type==='duplicate')m.observations.push(clone(m.observations[16]));if(type==='revision')m.revision='stale';assert.equal(evaluate(m,source).status,'contract-invalid',type);}
});

test('intentional short declarations and labels outside the designated source roles do not become regressions',()=>{
 const m=clone(before),baseline=evaluate(m,source).summary;
 m.observations[0].typography.push(node('합니다.',[['합니다.',100]]),node('AI',[['AI',180]]),node('왜 골랐고,',[['왜 골랐고,',260]]));
 assert.deepEqual(evaluate(m,source).summary,baseline);
});

test('role font checks use observed computed sizes; shrinking metadata cannot repair required request text',()=>{
 const m=clone(before),o=m.observations[23];o.typography.find(n=>n.tag==='H3').fontSize='12px';
 assert.equal(evaluate(m,source).checks.find(c=>c.id==='request-0-font').status,'regression');
 const pre=o.typography.find(n=>n.tag==='PRE');pre.fontSize='32px';pre.effectivePixels=32*o.stage.width/1600;
 assert.equal(evaluate(m,source).checks.find(c=>c.id==='request-0-font').status,'pass');
});

test('request/body geometry requires complete positive boxes and catches outside content',()=>{
 const body={x:92,y:78,width:1416,height:704};
 assert.equal(boxInside({x:92,y:200,width:1200,height:300},body),true);
 assert.equal(boxInside({x:92,y:700,width:1200,height:300},body),false);
 assert.equal(boxInside({x:92,y:200,width:0,height:300},body),false);
});

test('SVG effective font checks use actual contain projection, never original fontSize alone',()=>{
 const m=clone(beforeSVG),o=m.observations.find(o=>o.slide===20);for(const t of o.texts){t.fontSize='80px';t.stageLogicalPixels=24;}
 const r=evaluate(before,source,{svgMetrics:m});assert.equal(r.checks.find(c=>c.id==='diagram-20-font').status,'regression');
 for(const t of o.texts)t.stageLogicalPixels=34;
 assert.equal(evaluate(before,source,{svgMetrics:m}).checks.find(c=>c.id==='diagram-20-font').status,'pass');
});

test('original asset loss and metrics from another asset/revision are contract-invalid',()=>{
 const hashes=clone(fixture.originalAssets);hashes[Object.keys(hashes)[0]]='changed';
 assert.equal(evaluate(before,source,{assetHashes:hashes}).status,'contract-invalid');
 const m=clone(beforeSVG);m.observations.find(o=>o.slide===5).src='different.svg';
 assert.equal(evaluate(before,source,{svgMetrics:m}).status,'contract-invalid');
});

test('missing or partial SVG observations and invisible duplicate/missing labels cannot pass',()=>{
 assert.equal(evaluate(before,source,{svgMetrics:undefined}).status,'contract-invalid');
 for(const mutation of ['slide','label','duplicate']){const m=clone(beforeSVG);if(mutation==='slide')m.observations=m.observations.filter(o=>o.slide!==11);else {const texts=m.observations.find(o=>o.slide===11).texts;if(mutation==='label')texts.pop();else texts.push(clone(texts[0]));}assert.equal(evaluate(before,source,{svgMetrics:m}).status,'contract-invalid',mutation);}
});

test('current mode refuses changed CSS/runtime hashes and missing required input inventory',()=>{
 assert.equal(evaluateRaw(before,source,{mode:'current',svgMetrics:beforeSVG}).checks.find(c=>c.id==='current-inputs').status,'contract-invalid');
 const currentInputs={...before.hashes,'blocks.css':'changed'};
 assert.equal(evaluateRaw(before,source,{mode:'current',svgMetrics:beforeSVG,currentInputs}).checks.find(c=>c.id==='current-inputs').status,'contract-invalid');
 const m=clone(before);delete m.hashes['blocks.js'];
 assert.equal(evaluateRaw(m,source,{mode:'current',svgMetrics:beforeSVG,currentInputs:before.hashes}).status,'contract-invalid');
});

test('baseline mode requires its exact historical source and complete historical input hashes',()=>{
 const m=clone(before);delete m.hashes['blocks.css'];assert.equal(evaluate(m,source).status,'contract-invalid');
 const m2=clone(before);m2.hashes['blocks.css']='changed';assert.equal(evaluate(m2,source).status,'contract-invalid');
});

test('observed material classification distinguishes reconstruction and original evidence, including our own UI',()=>{
 const f=clone(fixture),metrics=clone(beforeSVG);metrics.hashes=before.hashes;metrics.viewport=before.observations[0].viewport;metrics.captureManifest={sha256:'test-manifest-bytes'};
 const {parseDocument}=require('../scripts/markdown-document.cjs');const deck=parseDocument(source);
 for(const role of f.diagrams){delete role.geometry;delete role.sameLinePhrase;role.currentTexts=role.beforeTexts;role.src=deck.slides[role.slide-1].blocks.flatMap(n=>n.children||[]).find(n=>n.tag==='img').attrs.src;metrics.observations.find(o=>o.slide===role.slide).materialKind=role.kind;}
 const run=()=>evaluateRaw(before,source,{mode:'current',fixture:f,currentInputs:before.hashes,manifestSha256:'test-manifest-bytes',svgMetrics:metrics});
 assert.equal(run().summary.invalid,0);
 metrics.observations.find(o=>o.slide===5).materialKind='original-evidence';assert.equal(run().checks.find(c=>c.id==='diagram-5-classification').status,'contract-invalid');
 // An actual product UI evidence role may keep its surface; the classifier does not impose black pixels.
 f.diagrams.find(d=>d.slide===5).kind='original-evidence';assert.equal(run().summary.invalid,0);
});

test('a deleted source deck fails structurally without throwing from later role access',()=>{
 const r=evaluate(before,'# Only');assert.equal(r.status,'contract-invalid');assert.equal(r.checks.find(c=>c.id==='source-count').status,'contract-invalid');
});

test('SVG metrics from earlier CSS/runtime are invalid even when source and SVG bytes still match',()=>{
 const metrics=clone(beforeSVG);metrics.hashes={...before.hashes,'blocks.css':'old-css'};
 const r=evaluateRaw(before,source,{mode:'current',svgMetrics:metrics,currentInputs:before.hashes});
 assert.equal(r.checks.find(c=>c.id==='svg-inputs').status,'contract-invalid');
 assert.equal(evaluateRaw(before,source,{mode:'current',svgMetrics:metrics,currentInputs:{}}).checks.find(c=>c.id==='current-inputs').status,'contract-invalid');
});

test('current SVG observations from another manifest file or viewport cannot pass capture identity',()=>{
 const metrics=clone(beforeSVG);metrics.hashes=before.hashes;metrics.viewport=before.observations[0].viewport;metrics.captureManifest={sha256:'old-manifest'};
 const run=()=>evaluateRaw(before,source,{mode:'current',svgMetrics:metrics,currentInputs:before.hashes,manifestSha256:'current-manifest'});
 assert.equal(run().checks.find(c=>c.id==='svg-capture').status,'contract-invalid');
 metrics.captureManifest.sha256='current-manifest';metrics.viewport={width:1920,height:1080,devicePixelRatio:1};
 assert.equal(run().checks.find(c=>c.id==='svg-capture').status,'contract-invalid');
});

const round01=require('../research/llm-wiki-typography-20261102/round-01/present-1280/manifest.json');
const round01SVG=require('../research/llm-wiki-typography-20261102/round-01/present-1280/svg-metrics.json');
test('expanded R2/R3/R6 roles reproduce the real round-01 content, management and study tails',()=>{
 for(const id of ['risk-content','risk-management','use-study']){
  const role=fixture.roles.find(r=>r.id===id),o=round01.observations.find(o=>Number(o.index)===role.slide-1);
  const n=o.typography.find(n=>n.tag==='P'&&n.text.replace(/\s/g,'')===role.text.replace(/\s/g,''));
  assert.ok(n,id);assert.equal(tailVerdict(n,role.forbiddenLastLines),'regression',id);
 }
});
test('same SVG phrase checker fails the observed split answer and accepts an unshrunk single row',()=>{
 const o=round01SVG.observations.find(o=>o.slide===8),contract=fixture.diagrams.find(d=>d.slide===8).sameLinePhrase;
 assert.equal(svgPhraseVerdict(o,contract,{allowHistoricalBBox:true}),'regression');
 const revised=clone(o);revised.texts=revised.texts.filter(t=>!contract.segments.includes(t.text));
 revised.texts.push({text:contract.text,bbox:{x:1010,y:377.5,width:446.15,height:52},glyphRows:[{text:contract.text,x:1010,y:420,width:446.15,height:52}],fontSize:'44px'});
 assert.equal(svgPhraseVerdict(revised,contract),'pass');
 revised.texts.at(-1).bbox.width=470;assert.equal(svgPhraseVerdict(revised,contract),'regression');
 revised.texts.at(-1).bbox.width=446.15;revised.texts.push(clone(revised.texts.at(-1)));assert.equal(svgPhraseVerdict(revised,contract),'contract-invalid');
});
test('SVG answer observation deletion or missing geometry cannot hide the designated phrase failure',()=>{
 const o=clone(round01SVG.observations.find(o=>o.slide===8)),contract=fixture.diagrams.find(d=>d.slide===8).sameLinePhrase;
 o.texts=o.texts.filter(t=>t.text!=='정리합니다.');assert.equal(svgPhraseVerdict(o,contract),'contract-invalid');
 const p=clone(round01SVG.observations.find(o=>o.slide===8));delete p.texts.find(t=>t.text==='정리합니다.').bbox;assert.equal(svgPhraseVerdict(p,contract),'contract-invalid');
});

test('a single SVG text bbox cannot disguise two positioned tspan glyph rows or missing glyph observations',()=>{
 const contract=fixture.diagrams.find(d=>d.slide===8).sameLinePhrase;
 const n={text:contract.text,bbox:{x:1010,y:330,width:446,height:122},glyphRows:[{text:'스터디 계획을',x:1010,y:375,width:235,height:52},{text:'정리합니다.',x:1010,y:445,width:198,height:52}]};
 assert.equal(svgPhraseVerdict({texts:[n]},contract),'regression');
 delete n.glyphRows;assert.equal(svgPhraseVerdict({texts:[n]},contract),'contract-invalid');
 n.glyphRows=[{text:'스터디 계획을',x:1010,y:375,width:235,height:52}];assert.equal(svgPhraseVerdict({texts:[n]},contract),'contract-invalid');
});
