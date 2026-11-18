'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {evaluate,rectGeometry,correspondenceChecks,supportLinkChecks,nativeNodes,SOURCE,CONTRACT,COVERAGE}=require('../scripts/llm-wiki-keynote-qa.cjs');
const {parseDocument}=require('../scripts/markdown-document.cjs');
const {planSlide}=require('../blocks.js');
const {validateDeck}=require('../deck-model.js');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const text=n=>n.type==='text'?n.value:(n.children||[]).map(text).join('');
function fixture(options={}){
 const source='# First\n\nA **[required](./materials/keynote-notes.md#meanings)** *claim*.\n\n---\n\n# Second\n\n'+(options.table?'| Field | Value |\n| --- | --- |\n| Condition | Required meaning |':(options.quotation?'> ':'')+'Another required claim.');
 const revision=sha(source),viewport={width:1280,height:720,devicePixelRatio:1},readViewport={width:390,height:844,devicePixelRatio:1};
 const notes='talks/llm-wiki/materials/keynote-notes.md',speaker='talks/llm-wiki/materials/speaker-script.md',index='talks/llm-wiki/materials/index.md';
 const fragments=Array.from({length:26},(_,i)=>'meaning-'+(i+1));
 const files={[SOURCE]:source,[notes]:'# Notes\n\n## Meanings\n\n'+fragments.join(' ')+'\n\n> Synthetic required quote.',[speaker]:'# Speaker\n\n## Talk\n\n'+fragments.join(' '),[index]:'# Index\n\n[Notes](./keynote-notes.md)'};
 const contract={nativeParagraphs:[{id:'synthetic-native-quote',path:notes,section:'meanings',text:'Synthetic required quote.',isQuote:true,minReading:18,wordBreak:'keep-all',sameRowPhrase:'required quote'}],preservation:{files:{original:'preserved'}},format:'llm-wiki-keynote-current-v1',status:'current',source:SOURCE,notes,materialIndex:index,publicMaterials:[index,notes,speaker],presentationViewports:[viewport],readingViewports:[readViewport],slides:parseDocument(source).slides.map((s,i)=>({id:'role-'+i,slide:i+1,links:i===0?[{href:'./materials/keynote-notes.md#meanings',text:'required'}]:[],images:[],native:nativeNodes(s).map(n=>({tag:n.tag.toUpperCase(),sourceLine:n.position.line,text:text(n),role:n.domParentTag==='BLOCKQUOTE'?'quotation':['p','th','td'].includes(n.tag)?'body':'title',...(n.domParentTag?{domParentTag:n.domParentTag}:{}),minLogical:['p','th','td'].includes(n.tag)?32:64,minReading:18,directBody:n.tag==='p'&&!n.domParentTag,parentGroup:null,emphasis:(function walk(n){return [n,...(n.children||[]).flatMap(walk)]})(n).filter(n=>['strong','em'].includes(n.tag)).map(n=>({tag:n.tag.toUpperCase(),text:text(n)})),boundaries:[]}))}))};
 const coverage={format:'llm-wiki-keynote-coverage-v1',status:'current',topics:fragments.map((required,i)=>({originalSlide:i+1,meaning:required,presentation:['role-'+i%2],notes:{path:notes,anchor:'meanings',required:[required]},speaker:{path:speaker,anchor:'talk',required:[required]},reading:{path:notes,anchor:'meanings',required:[required]}}))};
 const hashes=Object.fromEntries([SOURCE,'blocks.css','blocks.js',CONTRACT,COVERAGE,'DESIGN.md'].map(p=>[p,'a'.repeat(64)]));
 const observed=(r,reading)=>({index:r.slide-1,url:'http://local/presentations/llm-wiki/read.html#'+r.slide,revision,rect:{x:0,y:0,width:390,height:800},viewport:reading?readViewport:viewport,stage:{width:1600,height:900},scrollWidth:390,clientWidth:390,supportLinks:[],links:r.slide===1?[{href:'http://local/presentations/llm-wiki/materials/keynote-notes.html#meanings',text:'required'}]:[],images:[],typography:r.native.map((t,i)=>({tag:t.tag,dataField:null,sourceLine:t.sourceLine,text:t.text,...(t.domParentTag?{domParent:{tag:t.domParentTag}}:{}),copyRole:t.tag==='P'?'body':null,directBody:t.directBody,parentGroup:null,fontSize:(reading?24:t.minLogical)+'px',effectivePixels:reading?24:t.minLogical,logicalBox:{x:0,y:i*100,width:200,height:80},lines:[{text:t.text,x:0,y:i*100,width:200,height:40}],breaks:[],emphasis:t.emphasis}))});
 const manifest={source:SOURCE,revision,captureMode:'presentation-stage-only',hashes,observations:contract.slides.map(r=>observed(r,false))};
 const svgMetrics={revision,hashes,viewport,captureManifest:{path:'present.json',sha256:'present-sha'},observations:[]};
 const readManifest={source:SOURCE,revision,captureMode:'read-slide-crop',hashes,observations:contract.slides.map(r=>observed(r,true))};
 const readingMetrics={revision,hashes,viewport:readViewport,coordinateSpace:'native-reading-CSS-pixels',captureManifest:{path:'read.json',sha256:'read-sha'},supportNavigation:[{text:'학습 자료',href:'http://local/presentations/llm-wiki/materials/index.html'}],supportDocuments:[{sourcePath:notes,url:'http://local/presentations/llm-wiki/materials/keynote-notes.html',text:files[notes],anchors:['notes','meanings'],links:[],paragraphs:[{section:'meanings',text:'Synthetic required quote.',isQuote:true,fontSize:'18px',wordBreak:'keep-all',lines:[{text:'Synthetic required quote.',x:0,y:0,width:250,height:22}]}],scrollWidth:390,clientWidth:390}],observations:contract.slides.map(r=>observed(r,true))};
 const args={source,contract,coverage,readFile:p=>{if(!(p in files))throw Error(p);return files[p];},currentInputs:hashes,actualPreserved:{original:'preserved'}};
 return {args,files,manifest,svgMetrics,readManifest,readingMetrics,present:()=>evaluate({...args,manifest,manifestPath:'present.json',manifestSha256:'present-sha',svgMetrics}),reading:()=>evaluate({...args,manifest:readManifest,manifestPath:'read.json',manifestSha256:'read-sha',readingMetrics})};
}
test('new current QA accepts its complete synthetic current observation contract in separate scopes',()=>{
 const f=fixture();for(const result of [f.present(),f.reading()]){assert.equal(result.status,'pass',JSON.stringify(result.checks.filter(c=>c.status!=='pass')));assert.equal(result.visualApproval,false);}
 assert.equal(evaluate({...f.args,mode:'source'}).status,'pass');
});
test('unfinished/empty coverage, deleted relocated meaning, missing anchors and unknown current roles cannot pass',()=>{
 for(const mutate of [f=>f.args.coverage.topics.pop(),f=>f.args.coverage.topics[0].originalSlide=2,f=>f.args.coverage.topics[0].notes.anchor='missing',f=>f.files[f.args.contract.notes]=f.files[f.args.contract.notes].replace('meaning-26','gone'),f=>f.args.coverage.topics[0].presentation=['unknown'],f=>f.args.contract.status='checkpoint-incomplete']){const f=fixture();mutate(f);assert.equal(f.present().status,'contract-invalid');}
});
test('source/native role deletion or duplicate actual observations cannot disguise missing required copy',()=>{
 for(const mutate of [f=>f.args.contract.slides[0].native.pop(),f=>f.manifest.observations[0].typography.pop(),f=>f.manifest.observations[0].typography.push({...f.manifest.observations[0].typography[0]}),f=>f.manifest.observations.pop(),f=>delete f.manifest.observations[0].typography[0].lines]){const f=fixture();mutate(f);assert.equal(f.present().status,'contract-invalid');}
});
test('exact current hashes, manifest pair, viewport and current contract identity are mandatory',()=>{
 for(const mutate of [f=>f.args.currentInputs={...f.args.currentInputs,'blocks.css':'changed'},f=>f.svgMetrics.captureManifest.sha256='old',f=>f.svgMetrics.captureManifest.path='other.json',f=>f.svgMetrics.viewport={width:1920,height:1080,devicePixelRatio:1},f=>f.manifest.revision='old',f=>f.manifest.observations[0].viewport={width:1920,height:1080,devicePixelRatio:1}]){const f=fixture();mutate(f);assert.equal(f.present().status,'contract-invalid');}
});
test('required copy cannot shrink, become metadata, move to another group or clip',()=>{
 for(const mutate of [n=>{n.fontSize='24px';n.effectivePixels=24;},n=>n.copyRole='navigation',n=>n.parentGroup={index:1},n=>n.logicalBox.x=1599]){const f=fixture();mutate(f.manifest.observations[0].typography[1]);assert.equal(f.present().status,'regression');}
 const f=fixture();delete f.manifest.observations[0].typography[1].copyRole;assert.equal(f.present().status,'contract-invalid');
});
test('missing or reordered actual emphasis and changed original assets cannot pass',()=>{for(const mutate of [f=>f.manifest.observations[0].typography[1].emphasis=[],f=>f.manifest.observations[0].typography[1].emphasis=[...f.manifest.observations[0].typography[1].emphasis].reverse(),f=>f.args.actualPreserved.original='changed']){const f=fixture();mutate(f);assert.equal(f.present().status,'contract-invalid');}});
test('reading missing native notes, meaning/anchor observations, global access or exact reading pair cannot pass',()=>{
 for(const mutate of [f=>delete f.readingMetrics.supportDocuments,f=>f.readingMetrics.supportDocuments[0].text='only a title',f=>f.readingMetrics.supportDocuments[0].anchors=[],f=>f.readingMetrics.supportNavigation=[],f=>f.readingMetrics.captureManifest.sha256='different',f=>f.readingMetrics.captureManifest.path='present.json',f=>delete f.readingMetrics.observations[0].scrollWidth]){const f=fixture();mutate(f);assert.equal(f.reading().status,'contract-invalid');}
 const f=fixture();f.readingMetrics.supportDocuments[0].scrollWidth=600;assert.equal(f.reading().status,'regression');
});
function graph(){
 const nodes=[{id:'entry',shape:'rect',bbox:{x:0,y:0,width:100,height:100},ports:[{id:'east',x:100,y:50}]},{id:'concept',shape:'rect',bbox:{x:300,y:0,width:100,height:100},ports:[{id:'west',x:300,y:50},{id:'south',x:350,y:100}]},{id:'plan',shape:'rect',bbox:{x:300,y:200,width:100,height:100},ports:[{id:'west',x:300,y:250},{id:'north',x:350,y:200}]}];
 const relations=[{id:'entry-concept',from:'entry',to:'concept',fromPort:'east',toPort:'west'},{id:'entry-plan',from:'entry',to:'plan',fromPort:'east',toPort:'west'},{id:'concept-plan',from:'concept',to:'plan',fromPort:'south',toPort:'north'}];
 const port=(n,p)=>nodes.find(x=>x.id===n).ports.find(x=>x.id===p);
 return {contract:{nodes:structuredClone(nodes),relations},observed:{svgViewBox:{x:0,y:0,width:500,height:400},texts:[{text:'concept',bbox:{x:320,y:20,width:50,height:20}}],geometry:{coordinateSpace:'root-svg-viewBox',nodes,relations:relations.map(e=>({...e,points:[port(e.from,e.fromPort),port(e.to,e.toPort)],strokeWidth:2,visible:true,opacity:1,markerStart:null,markerEnd:null}))}}};
}
const status=checks=>checks.some(c=>c.status==='contract-invalid')?'contract-invalid':checks.some(c=>c.status==='regression')?'regression':'pass';
test('same-basename links at another folder or origin never pass as current public access',()=>{for(const mutate of [f=>f.readingMetrics.observations[0].links[0].href='http://elsewhere/presentations/llm-wiki/materials/keynote-notes.html#meanings',f=>f.readingMetrics.observations[0].links[0].href='http://local/wrong/keynote-notes.html#meanings',f=>f.readingMetrics.supportNavigation[0].href='http://elsewhere/presentations/llm-wiki/materials/index.html',f=>f.readingMetrics.supportDocuments[0].url='http://local/wrong/keynote-notes.html']){const f=fixture();mutate(f);assert.equal(f.reading().status,'contract-invalid');}});
test('rect graph supports several actual legal ports and refuses missing/invisible/directional/disconnected edges',()=>{
 const f=graph();assert.equal(status(rectGeometry(f.observed,f.contract)),'pass');
 for(const mutate of [o=>o.geometry.relations[0].visible=false,o=>o.geometry.relations[0].markerEnd='url(#arrow)',o=>o.geometry.relations[0].points[0]={x:50,y:50},o=>o.geometry.nodes[1].ports[0]={id:'west',x:350,y:50},o=>o.texts[0].bbox={x:180,y:40,width:30,height:20}]){const o=structuredClone(f.observed);mutate(o);assert.equal(status(rectGeometry(o,f.contract)),'regression');}
 const o=structuredClone(f.observed);o.geometry.relations.pop();assert.equal(status(rectGeometry(o,f.contract)),'contract-invalid');
});
test('quiet preserves legacy defaults, explicit false/true and all authored AST content',()=>{
 const control=(compose,quiet)=>'<!-- stage-slide\ncompose: '+compose+(quiet===undefined?'':'\nquiet: '+quiet)+'\n-->\n';
 for(const [compose,body,legacy]of [['message','# Title\n\nCopy',true],['quote','# Title\n\n> Copy',true],['closing','# Title\n\nCopy',true],['document','# Title\n\nCopy\n\nMore',false],['media','# Title\n\n![Alt](asset.svg)',false],['editorial','# Title\n\n## One\n\nCopy',false]]){
  const original=parseDocument(control(compose)+body).slides[0];assert.equal(planSlide(original).quiet,legacy);
  for(const quiet of [true,false]){const deck=parseDocument(control(compose,quiet)+body),s=deck.slides[0];assert.equal(planSlide(s).quiet,quiet);const semantic=n=>JSON.parse(JSON.stringify(n,(k,v)=>k==='position'?undefined:v));assert.deepEqual(semantic(s.blocks),semantic(original.blocks));assert.deepEqual(semantic(s.heading),semantic(original.heading));assert.deepEqual(validateDeck(deck),[]);}
 }
 for(const invalid of ['"true"','1','null','[]'])assert.throws(()=>parseDocument(control('document',invalid)+'# Title'),/quiet/);
 assert.throws(()=>parseDocument('<!-- stage-slide\nquitet: true\n-->\n# Title'),/quitet/);
 const deck=parseDocument('# Title');deck.slides[0].view={quiet:'true'};assert.ok(validateDeck(deck).some(e=>/quiet/.test(JSON.stringify(e))));
});

test('production current source contract covers every actual role, all 26 topics and every public/SVG destination statically',()=>{const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'..'),readFile=p=>fs.readFileSync(path.join(root,p),'utf8'),contract=JSON.parse(readFile(CONTRACT)),coverage=JSON.parse(readFile(COVERAGE));const actualPreserved=Object.fromEntries(Object.keys(contract.preservation.files).map(p=>[p,sha(fs.readFileSync(path.join(root,p)))]));const r=evaluate({source:readFile(SOURCE),contract,coverage,readFile,actualPreserved,mode:'source'});assert.equal(contract.slides.length,parseDocument(readFile(SOURCE)).slides.length);assert.equal(coverage.topics.length,26);assert.equal(r.status,'pass',JSON.stringify(r.checks.filter(c=>c.status!=='pass')));assert.equal(r.visualApproval,false);assert.equal(r.mode,'source');});

test('heading floors follow the declared current media/quote role while required bodies retain 32px',()=>{const c=require('../talks/llm-wiki/qa/keynote-current.json');for(const r of c.slides)for(const t of r.native){if(t.tag==='H1'){const floors={declaration:120,'identity-heading':96,'closing-heading':96,'media-support-heading':54,'quote-context-heading':38};assert.equal(t.minLogical,floors[t.role]||64,r.id);if(t.role in floors)assert.ok(t.roleReason.trim());}if(['body','quotation'].includes(t.role))assert.ok(t.minLogical>=32);if(t.role==='source-caption'){assert.equal(t.tag,'FIGCAPTION');assert.equal(t.domParentTag,'FIGURE');}if(['TH','TD'].includes(t.tag))assert.ok(t.minReading>=18);}});

test('adjacent reading navigation needs actual glyphs, origin, role, visible 18px size and exact native target',()=>{
 const contract={label:'본문을 글로 읽기',sourceLine:12,minReading:18},target='http://local/presentations/demo/materials/notes.html#exact',frame={x:0,y:0,width:390,height:844};
 const original={label:contract.label,text:contract.label,href:target,sourceLine:12,copyRole:'support',fontSize:'18px',effectivePixels:18,rect:{x:10,y:100,width:200,height:32},lines:[{text:contract.label,x:10,y:100,width:180,height:22}],visible:true};
 assert.equal(status(supportLinkChecks([original],contract,target,frame)),'pass');
 for(const mutate of [n=>delete n.lines,n=>n.lines[0].text='본문',n=>n.href=target.replace('#exact','#another-valid-anchor'),n=>n.href=target.replace('http://local','http://elsewhere'),n=>n.sourceLine=1,n=>n.copyRole='navigation',n=>delete n.visible]){const n=structuredClone(original);mutate(n);assert.equal(status(supportLinkChecks([n],contract,target,frame)),'contract-invalid');}
 for(const mutate of [n=>{n.fontSize='16px';n.effectivePixels=16;},n=>n.visible=false,n=>n.rect.x=389]){const n=structuredClone(original);mutate(n);assert.equal(status(supportLinkChecks([n],contract,target,frame)),'regression');}
 assert.equal(status(supportLinkChecks([],contract,target,frame)),'contract-invalid');assert.equal(status(supportLinkChecks([original,original],contract,target,frame)),'contract-invalid');
});

test('another existing native anchor cannot substitute for the exact support section of the displayed material',()=>{
 const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'..'),readFile=p=>fs.readFileSync(path.join(root,p),'utf8'),contract=JSON.parse(readFile(CONTRACT)),coverage=JSON.parse(readFile(COVERAGE)),role=contract.slides.find(r=>r.images.length),oldHref=role.support.href;
 role.support.target.anchor='사람의-선택과-기록';role.support.href=oldHref.split('#')[0]+'#'+role.support.target.anchor;
 const source=readFile(SOURCE).replace(oldHref,role.support.href),actualPreserved=Object.fromEntries(Object.keys(contract.preservation.files).map(p=>[p,sha(fs.readFileSync(path.join(root,p)))]));
 const r=evaluate({source,contract,coverage,readFile,actualPreserved,mode:'source'});assert.equal(r.checks.find(c=>c.id==='image-support-target-'+role.id).status,'contract-invalid');
});


test('only an image-only source block contributes its real image title as a FIGCAPTION role',()=>{
 const source='# Source\n\n![Material](source.svg "Authored example")\n\n> Exact purpose.';
 const slide=parseDocument(source).slides[0],before=structuredClone(slide),nodes=nativeNodes(slide),caption=nodes.find(n=>n.tag==='figcaption');
 assert.equal(text(caption),'Authored example');assert.equal(caption.position.line,3);assert.equal(caption.domParentTag,'FIGURE');assert.deepEqual(slide,before);
 assert.equal(nodes.find(n=>n.tag==='p').domParentTag,'BLOCKQUOTE');
 for(const content of ['Mixed ![Material](source.svg "Title") prose.','[![Material](source.svg "Title")](https://example.com)','> ![Material](source.svg "Title")'])assert.equal(nativeNodes(parseDocument(content).slides[0]).filter(n=>n.tag==='figcaption').length,0);
 for(const mutate of [t=>t.role='source-caption',t=>{t.role='body';t.minLogical=20;}]){const f=fixture();mutate(f.args.contract.slides[0].native[1]);assert.equal(evaluate({...f.args,mode:'source'}).status,'contract-invalid');}
});

test('native quotation ownership is mandatory in both scopes and cannot become caption metadata',()=>{
 for(const scope of ['present','reading']){
  const original=fixture({quotation:true});assert.equal(original[scope]().status,'pass');
  const observations=f=>scope==='present'?f.manifest.observations:f.readingMetrics.observations;
  const missing=fixture({quotation:true});delete observations(missing)[1].typography[1].domParent;assert.equal(missing[scope]().status,'contract-invalid');
  const moved=fixture({quotation:true});observations(moved)[1].typography[1].domParent.tag='FIGURE';assert.equal(moved[scope]().status,'regression');
  const renamed=fixture({quotation:true});renamed.args.contract.slides[1].native[1].domParentTag='FIGURE';assert.equal(renamed[scope]().status,'contract-invalid');
  for(const role of ['navigation','source','source-caption']){const f=fixture({quotation:true});f.args.contract.slides[1].native[1].role=role;assert.equal(f[scope]().status,'contract-invalid');}
 }
});


test('field correspondences require measured paths and do not borrow document relation observations',()=>{
 const contract=[{id:'title-change',points:[{x:100,y:100},{x:200,y:100}]}],original={svgViewBox:{x:0,y:0,width:500,height:400},geometry:{correspondences:[{id:'title-change',points:[{x:100,y:100},{x:200,y:100}],strokeWidth:2,visible:true,opacity:1,markerStart:null,markerEnd:null}]}};
 assert.equal(status(correspondenceChecks(original,contract)),'pass');
 for(const mutate of [o=>delete o.geometry.correspondences,o=>o.geometry.correspondences=[],o=>delete o.geometry.correspondences[0].points,o=>delete o.geometry.correspondences[0].visible,o=>o.geometry.correspondences.push(structuredClone(o.geometry.correspondences[0]))]){const o=structuredClone(original);mutate(o);assert.equal(status(correspondenceChecks(o,contract)),'contract-invalid');}
 for(const mutate of [e=>e.points[1].x=300,e=>e.visible=false,e=>e.opacity=0,e=>e.markerEnd='url(#arrow)',e=>e.strokeWidth=0]){const o=structuredClone(original);mutate(o.geometry.correspondences[0]);assert.equal(status(correspondenceChecks(o,contract)),'regression');}
});


test('source table cells keep TR ownership and body floors in both actual observation scopes',()=>{
 for(const scope of ['present','reading']){
  const original=fixture({table:true});assert.equal(original[scope]().status,'pass');
  const roles=original.args.contract.slides[1].native.filter(n=>['TH','TD'].includes(n.tag));assert.equal(roles.length,4);assert.ok(roles.every(n=>n.domParentTag==='TR'&&n.directBody===false&&n.minLogical>=32&&n.minReading>=18));
  const observed=f=>(scope==='present'?f.manifest.observations:f.readingMetrics.observations)[1].typography.find(n=>n.tag==='TH');
  const missing=fixture({table:true});delete observed(missing).domParent;assert.equal(missing[scope]().status,'contract-invalid');
  const moved=fixture({table:true});observed(moved).domParent.tag='DIV';assert.equal(moved[scope]().status,'regression');
  const direct=fixture({table:true});observed(direct).directBody=true;assert.equal(direct[scope]().status,'regression');
  const small=fixture({table:true});const n=observed(small),size=scope==='present'?31:17;n.fontSize=size+'px';n.effectivePixels=size;assert.equal(small[scope]().status,'regression');
  for(const mutate of [n=>n.directBody=true,n=>n.domParentTag='DIV',n=>{n.role='source';n.minLogical=22;},n=>n.minReading=14]){const f=fixture({table:true});mutate(f.args.contract.slides[1].native.find(n=>n.tag==='TH'));assert.equal(f[scope]().status,'contract-invalid');}
 }
});

test('actual SVG feature roles and legacy result fields reject missing or invented identities',()=>{
 const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'..'),readFile=p=>fs.readFileSync(path.join(root,p),'utf8');
 const base=JSON.parse(readFile(CONTRACT)),coverage=JSON.parse(readFile(COVERAGE)),actualPreserved=Object.fromEntries(Object.keys(base.preservation.files).map(p=>[p,sha(fs.readFileSync(path.join(root,p)))]));
 const run=contract=>evaluate({source:readFile(SOURCE),contract,coverage,readFile,actualPreserved,mode:'source'});
 const article=c=>c.slides.find(r=>r.id==='meeting-article').images[0];
 const graph=c=>c.slides.find(r=>r.id==='connected-documents').images[0];
 const result=c=>c.slides.find(r=>r.id==='work-results').native[0];
 assert.equal(run(base).status,'pass');
 assert.equal(result(base).dataField,'title');
 assert.equal(result(base).sourceLine,undefined);
 const mutations=[
   c=>{article(c).texts[0].roleReason='';},
   c=>{article(c).materialSource='invented-source';},
   c=>{article(c).shapes.pop();},
   c=>{graph(c).texts[0].minLogical=22;},
   c=>{graph(c).texts[0].role='source';},
   c=>{result(c).sourceLine=1;},
   c=>{result(c).dataField='subtitle';},
   c=>{result(c).rows.reverse();}
 ];
 for(const mutate of mutations){const contract=structuredClone(base);mutate(contract);assert.equal(run(contract).status,'contract-invalid');}
});

test('declaration ratio uses the actual two positive Range widths in glyph y order',()=>{
 const f=fixture(),target=f.args.contract.slides[0].native[1],native=f.manifest.observations[0].typography[1];
 target.rowWidthRatio=[.84,.94];
 native.lines=[{text:'claim.',x:6,y:140,width:108,height:25},{text:'A required',x:0,y:105,width:120,height:25}];
 assert.equal(f.present().checks.find(c=>c.id.endsWith('row-width-ratio')).status,'pass');
 native.lines[0].width=119;
 assert.equal(f.present().checks.find(c=>c.id.endsWith('row-width-ratio')).status,'regression');
});
