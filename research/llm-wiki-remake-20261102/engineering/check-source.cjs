'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const cp = require('node:child_process');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../../..');
const { parseDocument, collectReferences } = require(path.join(root, 'scripts/markdown-document.cjs'));
const { parseMaterial } = require(path.join(root, 'scripts/materials.cjs'));
const { planSlide } = require(path.join(root, 'blocks.js'));
const text = n => n && (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const source = 'talks/llm-wiki/slides.md';
const deck = parseDocument(read(source), { sourcePath: source, id: 'llm-wiki' });
const titles = deck.slides.map(s => text(s.heading));
assert.equal(titles.length, 26);
const script = read('talks/llm-wiki/materials/speaker-script.md');
const table = [...script.matchAll(/^\| (\d+) \| (\d\d:\d\d)~(\d\d:\d\d) \| (.*?) \|$/gm)];
const sections = [...script.matchAll(/^## (\d+)장 · (.*)$/gm)];
const guide = [...read('talks/llm-wiki/assets/speaker-guide.txt').matchAll(/^(\d\d) (\d\d:\d\d)~(\d\d:\d\d) (.*)$/gm)];
assert.deepEqual(table.map(x => x[4]), titles); assert.deepEqual(sections.map(x => x[2]), titles); assert.deepEqual(guide.map(x => x[4]), titles);
const seconds = t => { const [m,s] = t.split(':').map(Number); return m*60+s; };
assert.equal(seconds(table[0][2]), 0);
table.forEach((row,i) => { assert(seconds(row[3]) > seconds(row[2])); if(i) assert.equal(row[2],table[i-1][3]); });
assert.equal(seconds(table[24][3]), 35*60); assert.equal(seconds(table[25][3]),40*60);
assert.deepEqual(guide.map(x=>[x[2],x[3]]),table.map(x=>[x[2],x[3]]));
const base = 'talks/llm-wiki/';
const docs = fs.readdirSync(path.join(root,base,'materials')).filter(f=>f.endsWith('.md')).map(f=>base+'materials/'+f);
const materials = Object.fromEntries(docs.map(p=>[p,parseMaterial(read(p),{sourcePath:p})]));
let refs=0;
function checkRef(from, value) {
 if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return;
 const [file,fragment] = value.split('#');
 const destination = file ? path.posix.normalize(path.posix.join(path.posix.dirname(from), decodeURIComponent(file.split('?')[0]))) : from;
 assert(fs.existsSync(path.join(root,destination)),from+' → '+value);
 if(fragment && destination.endsWith('.md')) {
  const anchor = decodeURIComponent(fragment);
  if(destination===source) assert(Number(anchor)>=1 && Number(anchor)<=26,value);
  else { assert(materials[destination],destination); assert(materials[destination].headingIds.includes(anchor),from+' → '+value); }
 }
 refs++;
}
for(const [p,m] of Object.entries(materials)) for(const ref of m.references) checkRef(p,ref.value);
for(const ref of collectReferences(deck)) checkRef(source, ref.owner[ref.key]);
const mainDiagrams=[3,5,8,9,10,11,14,16,20];
const access=mainDiagrams.map(n=>{
 const slide=deck.slides[n-1]; const refs=collectReferences({...deck,slides:[slide]}).map(r=>({value:r.owner[r.key]}));
 assert(refs.some(r=>r.value.includes(n===20?'materials/session-plan.md':'materials/diagram-reading.md#')),String(n));
 const plan=planSlide(slide); assert.equal(plan.composition,'media'); assert.equal(plan.warnings.length,0);
 return {slide:n,composition:plan.composition,detail:refs.find(r=>r.value.includes('materials/')).value};
});
assert.equal(planSlide(deck.slides[16]).composition,'quote');
assert.equal(planSlide(deck.slides[17]).composition,'quote');
const baseline=JSON.parse(read('research/llm-wiki-remake-20261102/before/starting-hashes.json'));
const changed=Object.keys(baseline).filter(p=>hash(p)!==baseline[p]);
const allowed=new Set([source,'blocks.js','MARKDOWN-FIRST.md',base+'README.md',base+'assets/speaker-guide.txt',base+'materials/index.md',base+'materials/session-plan.md',base+'materials/speaker-script.md',base+'materials/visual-appendix.md']);
assert.deepEqual(changed.filter(p=>!allowed.has(p)),[]);
const preserved=Object.keys(baseline).filter(p=>p.startsWith(base)&&!allowed.has(p));
const oldContext={module:{exports:{}},exports:{},require:()=>require(path.join(root,'deck-model.js'))};
vm.runInNewContext(cp.execFileSync('git',['show','HEAD:blocks.js'],{cwd:root,encoding:'utf8'}),oldContext);
const oldPlan=oldContext.module.exports.planSlide;
const files=cp.execFileSync('rg',['--files','talks'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(p=>p.endsWith('/slides.md')&&p!==source);
let otherSlides=0;
for(const p of files){ const d=parseDocument(read(p),{sourcePath:p});for(const s of d.slides) if(s.layout==='blocks'){assert.equal(planSlide(s).composition,oldPlan(s).composition,p);otherSlides++;} }
const currentInputs=Object.fromEntries([...new Set([...Object.keys(baseline),'talks/llm-wiki/materials/diagram-reading.md','talks/llm-wiki/assets/remake/ingest-map.svg','talks/llm-wiki/assets/remake/session-plan.svg','tests/blocks-composition.test.cjs','MARKDOWN-FIRST.md'])].map(p=>[p,hash(p)]));
const result={checkedAt:new Date().toISOString(),scope:'source-only; no browser readability or visual approval',slides:26,titles,timePlan:{mainMinutes:35,qaMinutes:5,measured:false},localReferencesChecked:refs,diagramAccess:access,compositions:deck.slides.map((s,i)=>({slide:i+1,...planSlide(s)})).map(({slide,composition,warnings})=>({slide,composition,warnings})),preservedOriginalInputs:preserved.length,changedBaselineInputs:changed,otherDecksCompositionParity:{decks:files.length,blockSlides:otherSlides},inputs:currentInputs};
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,inputs:undefined},null,2));
