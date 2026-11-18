'use strict';
// Read-only product probes. Only capability-results.json beside this file is written.
// The DOM shim verifies renderer output structure/text, never layout or glyph visibility.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const { parseDocument, collectReferences } = require(path.join(root, 'lib/markdown-document.cjs'));
const model = require(path.join(root, 'deck-model.js'));
const planner = require(path.join(root, 'blocks.js'));
class Node {
  constructor(tag) {
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.value = ''; this.className = '';
    this.style = { setProperty(k, v) { this[k] = v; } };
    this.classList = { add: (...names) => { this.className += ' ' + names.join(' '); } };
  }
  append(...children) { children.forEach(c => this.children.push(...(c.tagName === '#fragment' ? c.children : [c]))); }
  prepend(...children) { this.children.unshift(...children); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  addEventListener() {}
  set textContent(v) { this.value = String(v); this.children = []; }
  get textContent() { return this.value + this.children.map(c => c.textContent).join(''); }
}
const document = {
  createElement: tag => new Node(tag), createElementNS: (_, tag) => new Node(tag),
  createTextNode: value => Object.assign(new Node('#text'), { value }), createDocumentFragment: () => new Node('#fragment')
};
const context = { document, window: { STAGE_MODEL: model } };
vm.runInNewContext(read('blocks.js'), context);
vm.runInNewContext(read('visual.js'), context);
const renderer = context.window.StageBlocks, visualRenderer = context.window.StageVisual;
const all = n => [n, ...n.children.flatMap(all)];
const sourceText = n => !n ? '' : n.type === 'text' ? n.value : (n.children || []).map(sourceText).join('');
const norm = s => s.replace(/\s+/g, ' ').trim();
const classIs = (n, c) => n.className.split(/\s+/).includes(c);
const control = settings => '<!-- stage-slide\n' + settings + '\n-->\n';
const stage = value => '```stage\n' + JSON.stringify(value, null, 2) + '\n```';
const results = { executedAt: new Date().toISOString(), scope: 'Node parser/planner/renderer DOM-shim + independent comparison with saved browser DOM inventory; no new browser or visual approval', checks: [] };
function check(name, fn) {
  try { results.checks.push({ name, pass: true, ...fn() }); }
  catch (e) { results.checks.push({ name, pass: false, error: e.stack }); }
}
function blockProbe(source) {
  const deck = parseDocument(source, { sourcePath: 'research-only/probe.md' });
  assert.deepEqual(model.validateDeck(deck), []);
  const slide = deck.slides[0], before = JSON.stringify(slide);
  const output = renderer.renderSlide(slide);
  assert.equal(JSON.stringify(slide), before);
  const expected = norm(sourceText(slide.heading) + slide.blocks.map(sourceText).join(''));
  assert.equal(norm(output.body.textContent), expected);
  return { deck, slide, output, nodes: all(output.body) };
}
check('all26-explicit-compose-plan-saved-browser-DOM', () => {
  const file = 'talks/llm-wiki/slides.md', source = read(file), deck = parseDocument(source, { sourcePath: file });
  const inventory = JSON.parse(read('research/llm-wiki-design-audit-20261113/evidence/deck-inventory.json'));
  assert.equal(deck.slides.length, 26); assert.equal(inventory.slides.length, 26);
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), inventory.revision);
  const slides = deck.slides.map((s, i) => {
    const p = planner.planSlide(s), captured = inventory.slides[i];
    assert.ok(s.view.compose && s.view.compose !== 'auto'); assert.equal(s.tone,'neutral'); assert.equal(p.warnings.length, 0);
    assert.equal(s.view.compose, captured.requested.compose); assert.equal(p.composition, captured.rendered.composition);
    assert.equal(s.title, captured.title); assert.equal(s.origin.line, captured.sourceLine);
    assert.deepEqual(s.blocks.map(n => n.tag), captured.topLevelBlocks);
    assert.deepEqual(s.blocks.filter(n => n.tag === 'h2').map(sourceText), captured.h2);
    return { slide: i + 1, sourceLine: s.origin.line, requested: s.view.compose, explicitTone:s.tone, plan: p.composition, savedBrowserDOM: captured.rendered.composition, warnings: p.warnings };
  });
  const hashes = Object.entries(inventory.inputs).filter(([p]) => fs.existsSync(path.join(root,p))).map(([p,h]) => ({ path:p, same:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')===h }));
  assert.ok(hashes.every(h => h.same));
  return { slides, inventoryInputHashes: hashes, independenceLimit: 'Fresh parse/planning matched root-collected actual browser inventory; this agent did not recapture browser DOM.' };
});
check('all26-renderer-preserves-authored-text-links-hardbreaks', () => {
  const deck = parseDocument(read('talks/llm-wiki/slides.md'));
  const slides = deck.slides.map((s,i) => {
    const output = renderer.renderSlide(s), nodes = all(output.body);
    assert.equal(norm(output.body.textContent), norm(sourceText(s.heading)+s.blocks.map(sourceText).join('')));
    const ast=[]; let br=0; const walk=n=>{ if(!n)return;if(n.tag==='a')ast.push(n.attrs.href);if(n.tag==='br')br++;(n.children||[]).forEach(walk); }; [s.heading,...s.blocks].forEach(walk);
    assert.deepEqual(nodes.filter(n=>n.tagName==='a').map(n=>n.attrs.href),ast);
    assert.equal(nodes.filter(n=>n.tagName==='br').length,br);
    const astWithBreak=n=>!n?'':n.tag==='br'?'[HARD_BREAK]':n.type==='text'?n.value:(n.children||[]).map(astWithBreak).join('');
    const domWithBreak=n=>n.tagName==='br'?'[HARD_BREAK]':n.value+n.children.map(domWithBreak).join('');
    assert.equal(norm(domWithBreak(output.body)),norm([s.heading,...s.blocks].map(astWithBreak).join('')));
    return { slide:i+1, anchors:ast.length, sourceBr:br, renderedBr:nodes.filter(n=>n.tagName==='br').length, hardBreakTextOrderSame:true, img:nodes.filter(n=>n.tagName==='img').length, inlineSVG:nodes.filter(n=>n.tagName==='svg').length };
  }); return {slides};
});
check('all9-current-comparisons-use-same-Markdown-blocks-engine', () => {
  const manifest=JSON.parse(read('research/llm-wiki-design-audit-20261113/evidence/compare/manifest.json'));
  assert.equal(manifest.observations.length,9);
  const samples=manifest.observations.map(o=>{
    const file='talks/'+o.deck+'/slides.md';
    const source=read(file),deck=parseDocument(source,{sourcePath:file}),s=deck.slides[o.slide-1],plan=planner.planSlide(s);
    assert.equal(crypto.createHash('sha256').update(source).digest('hex'),o.inputs[file]);
    assert.equal(s.layout,'blocks');assert.equal(o.layout,'blocks');assert.equal(plan.composition,o.composition);assert.equal(plan.variant,o.variant||'');
    for(const runtime of ['app.js','blocks.js','blocks.css','deck-model.js','visual.js','visual.css','styles.css'])assert.equal(crypto.createHash('sha256').update(read(runtime)).digest('hex'),o.inputs[runtime]);
    return {name:o.name,source:file,slide:o.slide,layout:s.layout,requested:s.view?.compose||'auto',explicitTone:s.tone||null,groupTones:(s.view?.groups||[]).map(g=>g.tone||null),iconTones:(s.view?.icons||[]).filter(i=>typeof i==='object').map(i=>i.tone||null),plan:plan.composition,variant:plan.variant,savedBrowserDOM:o.composition,warnings:plan.warnings};
  });return {samples,conclusion:'The nine current comparison samples share parseDocument → StageBlocks with LLM Wiki, not merely an app shell. Other legacy examples use the common runtime with separate layout branches.'};
});
check('C1-native-exact-excerpt-with-source-and-relationship-table', () => {
  const quote='목적: 우리 스터디에서 LLM Wiki를 왜 쓰고 어떤 질문에 다시 활용할지 정하기.';
  assert.ok(read('talks/llm-wiki/assets/expanded-study.txt').includes(quote));
  const source=control('compose: document\ntone: neutral')+'# 왜 필요한가요?\n\n> '+quote+'\n\n발표팀 구성 예 · raw/context-note.md의 구절입니다.\n\n| 읽은 메모 | 다시 읽을 문서 | 다음 쓰임 |\n| --- | --- | --- |\n| 목적과 맥락 · 검색과 비교 · 지식의 활용 | 개념 · 비교 · 현재 이해 · 계획 · 다음 질문 | 다음 스터디 질문 |\n\n[원자료 예제 팩](./assets/expanded-study.txt)';
  const p=blockProbe(source); return {composition:p.output.composition,quote,links:p.nodes.filter(n=>n.tagName==='a').map(n=>n.attrs.href),limit:'Semantic excerpt/table supported. This reduced structural probe is not a full replacement preserving all five original edges; keep/recompose SVG for those edges or explicitly model all of them.'};
});
check('C2-two-dom-groups-and-shared-rules-prelude', () => {
  const wikiQuote='LLM이 원자료의 개념·비교·종합을 연결 문서로 작성하고 갱신하는 지식관리 패턴이다.';
  assert.ok(read('talks/llm-wiki/assets/expanded-study.txt').includes(wikiQuote));
  const source=control('compose: editorial\nvariant: centered\ntone: neutral')+'# 무엇이 생기나요?\n\n**rules.md는 raw/와 wiki/ 두 영역의 작업 약속입니다.** 원자료 보존 · 근거 연결 · 관련 쪽 갱신 · 중요한 결과 확인.\n\n마크다운은 글과 링크를 적는 텍스트 파일입니다. [발표팀 구성 예의 원문](./assets/expanded-study.txt)\n\n## raw/ · 보존\n\n> 목적: 우리 스터디에서 LLM Wiki를 왜 쓰고 어떤 질문에 다시 활용할지 정하기.\n\ncontext-note.md · retrieval-note.md · synthesis-note.md\n\n요지 · 선택 이유 · 남은 질문\n\n## wiki/ · 작성하고 갱신\n\n> '+wikiQuote+'\n\n개념 · 비교 · 종합 · 질문 · 목차 · 로그';
  const p=blockProbe(source),body=p.output.body.children[1],groups=body.children.filter(n=>classIs(n,'md-group'));
  assert.equal(groups.length,2); assert.ok(body.children[0].textContent.startsWith('rules.md')); assert.ok(!groups.some(g=>g.textContent.includes('rules.md')));
  assert.ok(body.children[1].textContent.startsWith('마크다운은 글과 링크'));
  assert.ok(!groups.some(g=>g.textContent.includes('마크다운은 글과 링크')));
  return {composition:p.output.composition,variant:p.output.variant,groupCount:groups.length,rulesParent:body.tagName,markdownDefinitionParent:body.tagName,preludeTexts:body.children.filter(n=>!classIs(n,'md-group')).map(n=>n.textContent),groupTexts:groups.map(g=>g.textContent),limit:'Both shared rules and Markdown definition are supported as prelude outside the H2 groups. A shared trailing row after two H2 groups would belong to the last group; no postlude scope control exists. This long reduced structural probe is not a complete correction or fit/glyph approval.'};
});
check('C3-C4-native-directed-branching-capability-not-original-ingest-replacement', () => {
  const visual={kind:'flow',items:[{id:'s',label:'자료 요약 · 입구'},{id:'c',label:'LLM Wiki 개념'},{id:'v',label:'RAG와 비교'},{id:'p',label:'현재 계획'},{id:'i',label:'목차·링크 갱신'}],links:[{from:'s',to:'c'},{from:'s',to:'v'},{from:'c',to:'p'},{from:'v',to:'p'},{from:'p',to:'i'}]};
  const deck=parseDocument(stage({layout:'visual',title:'읽고 나누고 기존 문서를 갱신합니다',visual}));
  assert.deepEqual(model.validateDeck(deck),[]); const rendered=visualRenderer.render(deck.slides[0].visual),nodes=all(rendered.plot);
  return {layout:deck.slides[0].layout,table:rendered.table,edges:nodes.filter(n=>classIs(n,'flow-connection')).map(n=>n.textContent),inlineSVG:nodes.filter(n=>n.tagName==='svg').length,limit:'Capability-only synthetic directed five-edge graph. It is NOT a meaning-preserving replacement of slide 10 with its three undirected relations/no mandatory generation order/no automatic update promise. Native output is ordered nodes plus separate directed text edges/table, not spatial connecting lines; names are labels, not real hyperlinks.'};
});
check('C3-original-three-undirected-relations-cannot-drop-in-native-flow', () => {
  const svg=read('talks/llm-wiki/assets/typography/ingest-map.svg');
  const relations=[...svg.matchAll(/data-relation-id="([^"]+)"/g)].map(m=>m[1]);assert.equal(relations.length,3);assert.ok(svg.includes('무방향 세 관계'));
  const visual={kind:'flow',items:[{id:'summary',label:'자료 요약 · 원자료의 입구'},{id:'concept',label:'개념 · 비교'},{id:'plan',label:'현재 계획'}],links:[{from:'summary',to:'concept',direction:'undirected'},{from:'summary',to:'plan',direction:'undirected'},{from:'concept',to:'plan',direction:'undirected'}]};
  assert.deepEqual(model.validateVisual(visual),[]);const out=visualRenderer.render(visual);const edges=all(out.plot).filter(n=>classIs(n,'flow-connection')).map(n=>n.textContent);assert.ok(edges.every(e=>e.includes(' → ')));
  return {originalRelations:relations,nativeEdges:edges,unknownDirectionIgnored:true,conclusion:'Existing SVG recompose is the smallest supported path preserving the three undirected relations. Adding reverse arrows would falsely imply two directed operations and is not equivalent. Native relational tables can explicitly label undirected meaning; native flow cannot.'};
});
check('C4-native-linked-document-table-is-real-anchor-only-if-authored-link', () => {
  const p=blockProbe(control('compose: document\ntone: neutral')+'# 문서들은 연결됩니다\n\n| 문서 이름 | 관계 |\n| --- | --- |\n| `wiki/concepts/llm-wiki.md` | 개념에서 비교와 계획으로 다시 읽기 |\n| `wiki/comparisons/rag-vs-wiki.md` | 같은 질문에서 차이 비교 |\n\n[기존 관계 읽기](./materials/diagram-reading.md#9장-미리-정리한-문서-다시-읽기)');
  assert.equal(p.nodes.filter(n=>n.tagName==='a').length,1);
  return {anchors:p.nodes.filter(n=>n.tagName==='a').map(n=>n.attrs.href),virtualCodePaths:p.nodes.filter(n=>n.tagName==='code').map(n=>n.textContent),references:collectReferences(p.deck).map(r=>({kind:r.kind,value:r.owner[r.key]})),limit:'Code paths inside expanded-study.txt are virtual sections, not standalone registered .md files. Use existing example-pack/diagram anchors or create/register material pages before authoring actual .md links.'};
});
check('C6-two-H2-with-two-H3-judgments-and-separate-execution', () => {
  const p=blockProbe(control('compose: editorial\nvariant: centered\ntone: neutral')+'# 다 넣기보다, 다시 쓸 자료부터\n\n## 먼저 판단합니다\n\n### 내 목적에 필요한가\n\n앞으로 만들 결과와 **관련된 자료인가**\n\n### 왜 골랐는가\n\n가치 있다고 느낀 이유를 **직접 적을 수 있는가**\n\n## 판단했다면, 작게 시작하기\n\n같은 주제의 **자료 두 개부터 연결합니다.**');
  const groups=p.nodes.filter(n=>classIs(n,'md-group'));
  assert.equal(groups.length,2);assert.equal(all(groups[0]).filter(n=>n.tagName==='h3').length,2);assert.ok(!groups[0].textContent.includes('자료 두 개'));
  return {composition:p.output.composition,groups:groups.map(g=>({text:g.textContent,h3:all(g).filter(n=>n.tagName==='h3').map(n=>n.textContent)})),limit:'DOM distinguishes two judgments inside one group and one execution in another. Conditional wording provides sequence; there is no connector. CSS/fit/glyph hierarchy remains unobserved.'};
});
check('C6-three-H2-primary-is-span-not-two-judgments-group', () => {
  const p=blockProbe(control('compose: editorial\ntone: neutral')+'# 다시 쓸 자료부터\n\n## 내 목적에 필요한가\n\n앞으로 만들 결과와 관련된 자료인가\n\n## 왜 골랐는가\n\n가치 있다고 느낀 이유를 직접 적을 수 있는가\n\n<!-- stage-group\nprimary: true\n-->\n## 작게 시작하기\n\n같은 주제의 자료 두 개부터 연결합니다.');
  const groups=p.nodes.filter(n=>classIs(n,'md-group'));assert.equal(groups.length,3);assert.ok(classIs(groups[2],'is-primary'));
  return {groups:groups.map(g=>({text:g.textContent,primary:classIs(g,'is-primary')})),limit:'primary adds class/size allocation; three sibling groups remain. It does not create a parent for the two judgments or encode a conditional arrow.'};
});
check('C6-two-judgments-converge-to-one-action-native-flow', () => {
  const visual={kind:'flow',items:[{id:'purpose',label:'내 목적에 필요한가'},{id:'reason',label:'왜 골랐는가'},{id:'act',label:'같은 주제 자료 두 개 연결'}],links:[{from:'purpose',to:'act'},{from:'reason',to:'act'}]};
  assert.deepEqual(model.validateVisual(visual),[]);
  const p=visualRenderer.render(visual);return {table:p.table,edges:all(p.plot).filter(n=>classIs(n,'flow-connection')).map(n=>n.textContent),limit:'Explicit two incoming connections are supported; full judgment descriptions/rich text links need another supported prose surface or SVG. No browser fit observed.'};
});
check('unsupported-compose-visual-and-freeform-fields-counterexamples', () => {
  let error;try{parseDocument(control('compose: visual')+'# example');}catch(e){error=e.message;}assert.ok(error);
  const value={kind:'flow',items:[{id:'a',label:'A',x:25,y:50,description:'MUST_NOT_CLAIM_VISIBLE',href:'./a.md'},{id:'b',label:'B'}],links:[{from:'a',to:'b',label:'EDGE_LABEL_NOT_RENDERED'}]};
  assert.deepEqual(model.validateVisual(value),[]);const out=visualRenderer.render(value);assert.ok(!out.plot.textContent.includes('MUST_NOT_CLAIM_VISIBLE'));assert.ok(!out.plot.textContent.includes('EDGE_LABEL_NOT_RENDERED'));assert.equal(all(out.plot).filter(n=>n.tagName==='a').length,0);
  return {composeVisualError:error,unknownFlowFieldsAcceptedButNotRendered:['items.x','items.y','items.description','items.href','links.label'],limit:'Permissive validator acceptance is not a rendering capability. Current supported flow uses item label/id and link from/to.'};
});
check('explicit-invalid-media-preserves-order-with-fallback', () => {
  const deck=parseDocument(control('compose: media')+'# 읽을 구절\n\n그림 앞의 주장\n\n![관계](./example.svg)\n\n그림 뒤 설명');
  const plan=planner.planSlide(deck.slides[0]);assert.equal(plan.composition,'document');assert.equal(plan.warnings.length,1);
  return {composition:plan.composition,warnings:plan.warnings,limit:'Media wants leading pure image(s) and supported trailing prose. This is supported fallback, not parser loss; reordering prose changes authorship or choose document.'};
});
results.summary={checks:results.checks.length,passed:results.checks.filter(c=>c.pass).length,failed:results.checks.filter(c=>!c.pass).length};
fs.writeFileSync(path.join(__dirname,'capability-results.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results.summary));
if(results.summary.failed)process.exitCode=1;
