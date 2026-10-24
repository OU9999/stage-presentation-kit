'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const model = require('../deck-model.js');
const { readDirectDeck, refreshDirectDeck } = require('../scripts/direct-deck.cjs');
const { parseMarkdown, buildDeck } = require('../scripts/markdown-deck.cjs');
const repoRoot = path.resolve(__dirname, '..');
function temp(t) { const dir=fs.mkdtempSync(path.join(os.tmpdir(),'stage-direct-visual-')); t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));return dir; }
function fixture(t,source='examples/visual-starter/content.js') { const dir=temp(t);fs.copyFileSync(path.join(repoRoot,source),path.join(dir,'content.js'));fs.copyFileSync(path.join(repoRoot,'examples/visual-starter/README.md'),path.join(dir,'README.md'));return dir; }
function references(file) {return [...fs.readFileSync(file,'utf8').matchAll(/(?:src|href)="([^"]+)"/g)].map(x=>x[1]).filter(x=>!/^data:|^https?:|^#/.test(x));}
function assertLocal(file,within) {for(const ref of references(file)){const target=path.resolve(path.dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));assert.ok(fs.existsSync(target),`${file}: ${ref}`);if(within)assert.ok(target.startsWith(within+path.sep),`${ref} must stay inside copied folder`);}}

test('TC-DR01 native visual example directly validates eight kinds without generated SVG references',()=>{
 const {deck}=readDirectDeck(path.join(repoRoot,'examples/visual-story'));
 assert.equal(deck.slides.length,12);assert.equal(new Set(deck.slides.filter(s=>s.layout==='visual').map(s=>s.visual.kind)).size,8);
 assert.deepEqual(model.validateDeck(deck).filter(x=>x.severity==='error'),[]);
 assert.ok(!deck.slides.some(s=>s.src||s.layout==='image'));
 const line=deck.slides.find(s=>s.visual&&s.visual.kind==='line').visual;
 assert.ok(Math.abs(model.visualSeries(line)[0].values.at(-1)-58)<1e-9);
});
test('TC-DR02 optional HTML refresh preserves direct source edits and is deterministic',t=>{
 const dir=fixture(t);let source=fs.readFileSync(path.join(dir,'content.js'),'utf8').replace('[8, 12, 10, 6, 4]','[3, 9, 2, 1, 5]');fs.writeFileSync(path.join(dir,'content.js'),source);
 const first=refreshDirectDeck(dir,{repoRoot});const before=[first.files.index,first.files.data].map(f=>fs.readFileSync(f,'utf8'));
 refreshDirectDeck(dir,{repoRoot});assert.equal(fs.readFileSync(path.join(dir,'content.js'),'utf8'),source);assert.deepEqual([first.files.index,first.files.data].map(f=>fs.readFileSync(f,'utf8')),before);
 assertLocal(first.files.index);assertLocal(first.files.data);assert.match(before[1],/StageVisual\.renderDataPage/);assert.doesNotMatch(before[1],/fetch\(|data\.json/);
});
test('TC-DR03 standalone starter survives copying to an unrelated directory with local runtime and source',t=>{
 const source=fixture(t);refreshDirectDeck(source,{repoRoot,standalone:true});const moved=path.join(temp(t),'copied-talk');fs.cpSync(source,moved,{recursive:true});
 assertLocal(path.join(moved,'index.html'),moved);assertLocal(path.join(moved,'data.html'),moved);
 for(const name of ['styles.css','visual.css','deck-model.js','visual.js','app.js'])assert.deepEqual(fs.readFileSync(path.join(moved,'runtime',name)),fs.readFileSync(path.join(repoRoot,name)));
 const html=fs.readFileSync(path.join(moved,'index.html'),'utf8');assert.ok(html.indexOf('visual.js?')<html.indexOf('app.js?'));
 const {deck}=readDirectDeck(moved);assert.equal(deck.slides.length,3);assert.equal(model.visualSeries(deck.slides[0].visual)[0].values.at(-1),80);
});
test('TC-DR04 invalid raw numbers and missing deck are diagnosed before JSON cloning or page replacement',t=>{
 const dir=fixture(t);refreshDirectDeck(dir,{repoRoot});const before=['index.html','data.html'].map(f=>fs.readFileSync(path.join(dir,f),'utf8'));
 for(const source of ['window.PRESENTATION={slides:[{layout:"visual",visual:{kind:"line",labels:["A","B"],values:[1,Infinity]}}]};','window.PRESENTATION={slides:[{layout:"visual",visual:{kind:"line",labels:["A"],values:[NaN]}}]};','window.OTHER={};']){
  fs.writeFileSync(path.join(dir,'content.js'),source);assert.throws(()=>refreshDirectDeck(dir,{repoRoot}),/입력 검증 실패/);assert.deepEqual(['index.html','data.html'].map(f=>fs.readFileSync(path.join(dir,f),'utf8')),before);assert.equal(fs.readFileSync(path.join(dir,'content.js'),'utf8'),source);
 }
});
test('TC-DR05 optional Markdown accepts independent visual params and new runtime references',t=>{
 const slide={layout:'visual',title:'다른 주제',visual:{kind:'flow',items:['요청','승인']}};
 const input='---\nid: independent-visual\ntitle: 별도 발표\n---\n\n```stage\n'+JSON.stringify(slide)+'\n```\n';
 assert.deepEqual(parseMarkdown(input).slides,[slide]);const dir=temp(t);const source=path.join(dir,'slides.md');fs.writeFileSync(source,input);const built=buildDeck(source,path.join(dir,'published'),{repoRoot});
 assertLocal(built.files.index);const html=fs.readFileSync(built.files.index,'utf8');for(const file of ['styles.css','visual.css','deck-model.js','visual.js','app.js'])assert.ok(html.includes(file+'?v='));
});
test('TC-DR06 active authoring removes fixed-schema generator/parser and PDF controls while keeping archive files',()=>{
 for(const file of ['scripts/build-visual-story.cjs','scripts/visual-story','examples/visual-story/data.json','examples/visual-story/slides.md'])assert.ok(!fs.existsSync(path.join(repoRoot,file)),file);
 const root=fs.readFileSync(path.join(repoRoot,'index.html'),'utf8');const gallery=fs.readFileSync(path.join(repoRoot,'examples/index.html'),'utf8');assert.doesNotMatch(root,/data-action="print"|PDF 저장/);assert.doesNotMatch(gallery,/href="[^\"]+\.pdf/);
 assert.ok(fs.existsSync(path.join(repoRoot,'output/pdf/visual-story.pdf')));
});

test('TC-DR07 existing five Markdown decks retain source and rebuild deterministically with the shared visual runtime',t=>{
 for(const slug of ['product-launch','engineering-review','photo-story','workshop','devday-compositions']){
  const source=path.join(repoRoot,'examples',slug,'slides.md'),before=fs.readFileSync(source);const output=path.join(temp(t),slug);
  const first=buildDeck(source,output,{repoRoot}),published=[first.files.index,first.files.content].map(file=>fs.readFileSync(file));
  buildDeck(source,output,{repoRoot});assert.deepEqual([first.files.index,first.files.content].map(file=>fs.readFileSync(file)),published);assert.deepEqual(fs.readFileSync(source),before);assertLocal(first.files.index);
 }
});
