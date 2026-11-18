'use strict';
// Frozen pre-keynote 26-slide regression; current keynote coverage lives in llm-wiki-keynote-qa.test.cjs.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {parseDocument}=require('../lib/markdown-document.cjs');
const {planSlide}=require('../blocks.js');
const {evaluate,graphInventoryVerdict}=require('../scripts/llm-wiki-typography-qa.cjs');
const current=require('../talks/llm-wiki/qa/current-roles.json');
const source=fs.readFileSync(path.join(__dirname,'../research/llm-wiki-keynote-reset-20261113/before/talks/llm-wiki/slides.md'),'utf8');
const walk=n=>[n,...(n.children||[]).flatMap(walk)];
const value=n=>n.type==='text'?n.value:(n.children||[]).map(value).join('');
const compact=s=>s.replace(/\s/g,'');

test('historical 26-slide selection keeps two full judgments in one H2 and one action in the other, with three authored boundaries',()=>{
 const slide=parseDocument(source).slides[14],nodes=slide.blocks,starts=nodes.map((n,i)=>n.tag==='h2'?i:-1).filter(i=>i>=0);
 assert.equal(starts.length,2);
 const groups=starts.map((s,i)=>nodes.slice(s,starts[i+1]||nodes.length));
 assert.deepEqual(groups[0].filter(n=>n.tag==='h3').map(value),current.grouping.questions);
 assert.deepEqual(groups.map(g=>g.filter(n=>n.tag==='p').map(n=>compact(value(n)))),[current.grouping.judgments.map(compact),[compact(current.grouping.action)]]);
 assert.equal(nodes.flatMap(walk).filter(n=>n.tag==='br').length,3);
 assert.equal(planSlide(slide).warnings.length,0);
});

function selectionObservation(){
 const deck=parseDocument(source),slide=deck.slides[14],grouping=current.grouping;
 const groups=[{index:0,heading:grouping.headings[0],logicalBox:{x:92,y:200,width:676,height:440},firstParagraphBox:{x:92,y:330,width:600,height:80}},{index:1,heading:grouping.headings[1],logicalBox:{x:832,y:200,width:676,height:440},firstParagraphBox:{x:832,y:300,width:600,height:80}}];
 const typography=slide.blocks.filter(n=>['p','h3'].includes(n.tag)).map(n=>({tag:n.tag.toUpperCase(),sourceLine:n.position.line,text:value(n),fontSize:n.tag==='h3'?'38.08px':'34px',effectivePixels:20,lines:[{text:value(n),y:300}],parentGroup:{index:compact(value(n))===compact(grouping.action)?1:0,heading:compact(value(n))===compact(grouping.action)?grouping.headings[1]:grouping.headings[0]}}));
 const manifest={revision:crypto.createHash('sha256').update(source).digest('hex'),observations:[{index:14,typography,groups,groupCount:2}]};
 const fixture={...current,roles:current.roles.filter(r=>r.slide===15||r.id==='shared-editing'),requests:[],diagrams:[],breaks:[]};
 const run=()=>evaluate(manifest,source,{mode:'current',fixture});
 return {manifest,run};
}
test('selection checker requires actual DOM ownership and measured starts instead of primary class or source text alone',()=>{
 const f=selectionObservation();
 const checks=()=>f.run().checks.filter(c=>c.id.startsWith('selection-'));
 assert.ok(checks().every(c=>c.status==='pass'));
 f.manifest.observations[0].typography[0].parentGroup.index=1;
 assert.equal(checks().find(c=>c.id.startsWith('selection-dom-')).status,'regression');
 f.manifest.observations[0].groups[1].logicalBox.y=250;
 assert.equal(checks().find(c=>c.id==='selection-group-layout').status,'regression');
 delete f.manifest.observations[0].groups[0].firstParagraphBox;
 assert.equal(checks().find(c=>c.id==='selection-group-layout').status,'contract-invalid');
});

test('document transition names the same example and keeps actual links distinct from virtual file names',()=>{
 const slide=parseDocument(source).slides[11],nodes=slide.blocks.flatMap(walk);
 assert.deepEqual(nodes.filter(n=>n.tag==='td').filter((_,i)=>i%2===0).map(value),['LLM Wiki 개념','RAG와 위키 비교','우리 스터디 계획']);
 assert.ok(nodes.some(n=>n.tag==='p'&&value(n).includes('목차와 링크로 관련 개념과 원자료를 찾아 읽습니다.')));
 assert.ok(nodes.some(n=>n.tag==='p'&&value(n).includes('새 자료가 오면 문서와 관계를 보완합니다.')));
 const links=nodes.filter(n=>n.tag==='a').map(n=>n.attrs.href);
 assert.equal(links.length,1);assert.ok(links[0].startsWith('./materials/diagram-reading.md#'));
 assert.ok(!links.some(href=>/wiki\/(concepts|comparisons|plans)\//.test(href)));
 const paragraphs=slide.blocks.filter(n=>n.tag==='p');
 const navigation=paragraphs.find(n=>value(n).includes('목차와 링크로'));
 const update=paragraphs.find(n=>value(n).includes('새 자료가 오면'));
 assert.ok(navigation&&update&&navigation!==update,'Each predicate-tail role must keep its own observed paragraph boundary.');
});

test('new five-pair graph refuses a missing edge, disconnected endpoint, hidden relation or directional marker',()=>{
 const contract=current.diagrams.find(d=>d.slide===3).graphInventory;
 const nodes=contract.nodes.map((id,i)=>({id,x:100+i*100,y:100+i*50}));
 const observed={svgViewBox:{x:0,y:0,width:1500,height:650},geometry:{coordinateSpace:'root-svg-viewBox',nodes,relations:contract.relations.map(r=>({from:r.from,to:r.to,points:[nodes.find(n=>n.id===r.from),nodes.find(n=>n.id===r.to)],strokeWidth:3,visible:true,opacity:1,markerStart:null,markerEnd:null}))}};
 assert.equal(graphInventoryVerdict(observed,contract),'pass');
 for(const mutate of [o=>o.geometry.relations[0].points[0]={x:1,y:1},o=>o.geometry.relations[0].visible=false,o=>o.geometry.relations[0].markerEnd='url(#arrow)']){const copy=structuredClone(observed);mutate(copy);assert.equal(graphInventoryVerdict(copy,contract),'regression');}
 const missing=structuredClone(observed);missing.geometry.relations.pop();assert.equal(graphInventoryVerdict(missing,contract),'contract-invalid');
});

test('pre-design 83 technical passes coexist with the frozen five needs-changes decisions, independently of the old failure baseline',()=>{
 const prefix='../research/llm-wiki-design-audit-20261113/';
 const manifest=require(prefix+'evidence/present-1920/manifest.json'),metrics=require(prefix+'evidence/present-1920/svg-metrics.json');
 const historical=require('../research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json');
 const oldSource=fs.readFileSync(path.join(__dirname,'../research/llm-wiki-design-iteration-20261113/before/source/talks/llm-wiki/slides.md'),'utf8');
 const result=evaluate(manifest,oldSource,{mode:'current',fixture:historical,currentInputs:manifest.hashes,svgMetrics:metrics,manifestSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,prefix+'evidence/present-1920/manifest.json'))).digest('hex'),assetHashes:{...manifest.hashes,...historical.originalAssets}});
 assert.equal(result.status,'pass');assert.deepEqual(result.summary,{checks:83,invalid:0,regressions:0});assert.equal(result.visualApproval,false);
 const review=require(prefix+'design-needs-changes.review.json');assert.deepEqual(review.reviews.map(r=>r.slide),[3,5,10,12,15]);assert.ok(review.reviews.every(r=>r.status==='needs-changes'));
});

test('new document surfaces use exact example excerpts, preserve raw/wiki/rules roles and leave the nine earlier SVG bytes intact',()=>{
 const repo=path.join(__dirname,'..'),pack=compact(fs.readFileSync(path.join(repo,'talks/llm-wiki/assets/expanded-study.txt'),'utf8'));
 const svg=name=>fs.readFileSync(path.join(repo,'talks/llm-wiki/assets/design/'+name+'.svg'),'utf8');
 const text=markup=>[...markup.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(m=>m[1]).join('');
 const excerpt=(markup,id)=>text(new RegExp('<g\\b[^>]*data-node-id="'+id+'"[^>]*>([\\s\\S]*?)<\\/g>').exec(markup)[1]);
 assert.ok(pack.includes(compact(excerpt(svg('knowledge-layers'),'source-excerpt'))));
 const raw=svg('raw-wiki-rules');
 assert.ok(pack.includes(compact(excerpt(raw,'raw-purpose'))));
 assert.ok(pack.includes(compact(excerpt(raw,'wiki-concept'))));
 const selection=[...raw.matchAll(/<text\b[^>]*data-node-id="selection-reason-[12]"[^>]*>([^<]*)<\/text>/g)].map(m=>m[1]).join('');
 assert.ok(selection&&pack.includes(compact(selection)));
 for(const phrase of ['raw/ · 보존','wiki/ · 작성하고 갱신','context-note.md','retrieval-note.md','synthesis-note.md','요지','선택 이유','남은 질문','질문 · 목차 · 로그','원자료 보존 · 근거 연결','관련 쪽 갱신 · 중요한 결과 확인'])assert.ok(text(raw).includes(phrase),phrase);
 for(const id of ['raw-summary','raw-reason','raw-question'])assert.ok(new RegExp('data-node-id="'+id+'"').test(raw),'Each retained raw record kind keeps its explicit source ownership.');
 const definition=parseDocument(source).slides[4].blocks.find(n=>n.tag==='p'&&value(n)==='마크다운은 글과 링크를 적는 텍스트 파일입니다.');assert.ok(definition);
 for(const name of fs.readdirSync(path.join(repo,'talks/llm-wiki/assets/typography'))){assert.deepEqual(fs.readFileSync(path.join(repo,'talks/llm-wiki/assets/typography',name)),fs.readFileSync(path.join(repo,'research/llm-wiki-design-iteration-20261113/before/source/talks/llm-wiki/assets/typography',name)));}
});

test('packaged entry guide resolves to included documents and its small recipe is supported without research assets',()=>{
 const repo=path.join(__dirname,'..'),included=require('../package.json').files;
 const template=fs.readFileSync(path.join(repo,'templates/project-README.md'),'utf8');
 for(const match of template.matchAll(/\]\(node_modules\/ou-presentation\/([^#)]+)(?:#([^)]*))?\)/g)){
  assert.ok(included.includes(match[1]));
  const document=fs.readFileSync(path.join(repo,match[1]),'utf8');
  if(match[2])assert.ok(document.split('\n').some(line=>line.startsWith('#')&&line.replace(/^#+\s+/,'').replace(/[^\p{L}\p{N} -]/gu,'').replace(/ /g,'-')===match[2]),match[2]);
 }
 const guide=fs.readFileSync(path.join(repo,'MARKDOWN-FIRST.md'),'utf8').split('## 역할을 유지하는 작은 레시피')[1].split('## 사진·그리드')[0];
 const snippet=/```md\n([\s\S]*?)```/.exec(guide)[1],slide=parseDocument(snippet).slides[0];
 assert.equal(planSlide(slide).composition,'editorial');assert.equal(planSlide(slide).groups.length,2);assert.equal(planSlide(slide).warnings.length,0);
 assert.ok(!snippet.includes('research/'));assert.ok(!snippet.includes('!['));
});
