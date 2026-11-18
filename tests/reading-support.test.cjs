'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm');
const {parseDocument,collectReferences}=require('../scripts/markdown-document.cjs');
const {validateDeck}=require('../deck-model.js');
const {buildProject}=require('../scripts/stage.cjs');
const control=(href='./materials/notes.md#핵심',label='자료의 본문을 글로 읽기')=>'<!-- stage-slide\ncompose: document\nsupport:\n  label: '+JSON.stringify(label)+'\n  href: '+JSON.stringify(href)+'\n-->\n';
const content='# 자료\n\n목적과 판단은 직접 적습니다.';
function fixture(t){const directory=fs.mkdtempSync(path.join(os.tmpdir(),'stage-reading-support-'));t.after(()=>fs.rmSync(directory,{recursive:true,force:true}));const configPath=path.join(directory,'ou.config.json');fs.writeFileSync(configPath,JSON.stringify({sourceDir:'talks',outputDir:'out'}));const write=(name,text)=>{const file=path.join(directory,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);return file;};write('talks/one/slides.md',control()+content);write('talks/one/materials/notes.md','# 공개 해설\n\n## 핵심\n\n정확한 자료 구절과 근거.');return {directory,write,options:{configPath,repoRoot:path.resolve(__dirname,'..')},read:name=>fs.readFileSync(path.join(directory,'out',name),'utf8')};}
function compiled(project,name='one'){const context={window:{}};vm.runInNewContext(project.read(name+'/content.js'),context);return JSON.parse(JSON.stringify(context.window.PRESENTATION));}
test('support is explicit navigation metadata with an automatic control origin, separate from every authored block',()=>{
 const deck=parseDocument(control()+content),slide=deck.slides[0];assert.deepEqual(slide.view.support,{label:'자료의 본문을 글로 읽기',href:'./materials/notes.md#핵심',origin:{line:1,endLine:6}});
 const without=parseDocument(content).slides[0];const semantic=n=>JSON.parse(JSON.stringify(n,(k,v)=>k==='position'?undefined:v));assert.deepEqual(semantic(slide.blocks),semantic(without.blocks));assert.deepEqual(semantic(slide.heading),semantic(without.heading));assert.deepEqual(validateDeck(deck),[]);
 const refs=collectReferences(deck);assert.equal(refs.length,1);assert.equal(refs[0].kind,'support');assert.equal(refs[0].owner[refs[0].key],'./materials/notes.md#핵심');
});
test('support parser and direct model reject malformed, remote, query, missing-anchor and unsafe inputs',()=>{
 for(const value of [null,[],{},'private notes',{label:'x'},{href:'./materials/notes.md#핵심'},{label:' ',href:'./materials/notes.md#핵심'},{label:'x',href:'javascript:alert(1)'},{label:'x',href:'https://example.com/notes.md#핵심'},{label:'x',href:'//example.com/notes.md#핵심'},{label:'x',href:'./materials/notes.md?view=all#핵심'},{label:'x',href:'./materials/notes.md'},{label:'x',href:'./image.svg#핵심'},{label:'x',href:'./materials/notes.md#핵심',origin:{line:1,endLine:7}},{label:'x',href:'./materials/notes.md#핵심',extra:true}]){
  assert.throws(()=>parseDocument('<!-- stage-slide\nsupport: '+JSON.stringify(value)+'\n-->\n'+content),/support/);
  const deck=parseDocument(content);deck.slides[0].view={support:value};if(!value?.origin)assert.ok(validateDeck(deck).length,JSON.stringify(value));
 }
 // Generated HTML targets must validate in the browser after the source Markdown target was resolved.
 const deck=parseDocument(content);deck.slides[0].view={support:{label:'읽기',href:'materials/notes.html#핵심',origin:{line:1,endLine:7}}};assert.deepEqual(validateDeck(deck),[]);
});
test('isolated builds resolve registered public material anchors and retain support-only dependencies',t=>{
 const project=fixture(t),result=buildProject(project.options),deck=compiled(project);assert.deepEqual(validateDeck(deck),[]);assert.equal(deck.slides[0].view.support.href,'materials/notes.html#핵심');assert.ok(result.dependencies.includes(fs.realpathSync(path.join(project.directory,'talks/one/materials/notes.md'))));
 assert.ok(project.read('one/materials/notes.html').includes('id="핵심"'));assert.ok(project.read('one/content.js').includes('자료의 본문을 글로 읽기'));
});
test('registered public support can target another deck while private files, slides and absent anchors fail before output changes',t=>{
 const project=fixture(t);project.write('talks/two/slides.md','# 다른 발표');project.write('talks/two/materials/other.md','# 다른 공개 자료\n\n## 근거\n\n같은 자료의 근거');project.write('talks/one/private.md','# 비공개 임의 Markdown\n\n## 핵심');
 const slide=project.write('talks/one/slides.md',control('../two/materials/other.md#근거')+content);buildProject(project.options);assert.equal(compiled(project).slides[0].view.support.href,'../two/materials/other.html#근거');const before=project.read('one/content.js');
 for(const href of ['./private.md#핵심','./slides.md#1','./materials/notes.md#없는-절','../two/slides.md#1']){fs.writeFileSync(slide,control(href)+content);assert.throws(()=>buildProject(project.options),/support|등록|anchor|제목|자료|단락|slides\.md/);assert.equal(project.read('one/content.js'),before);}
});

test('an explicit legacy layout can reuse the adjacent support control without creating an AST field',()=>{
 const metadata=control().replace('compose: document\n','');
 const legacy='<!-- stage\nlayout: results\nvariant: unframed\n-->\n\n# Result\n\n![Example](./example.svg)';
 const deck=parseDocument(metadata+'\n'+legacy);
 const slide=deck.slides[0];
 assert.equal(slide.layout,'results');
 assert.equal(slide.title,'Result');
 assert.equal(slide.blocks,undefined);
 assert.deepEqual(slide.view.support.origin,{line:1,endLine:5});
 assert.deepEqual(validateDeck(deck),[]);
 assert.deepEqual(collectReferences(deck).map(ref=>ref.kind),['support','image']);
 assert.throws(()=>parseDocument(control()+'\n'+legacy),/support/);
});
