'use strict';
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict'), crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'), base=path.join(root,'talks/llm-wiki');
const {parseDocument,collectReferences}=require(path.join(root,'scripts/markdown-document.cjs'));
const {parseMaterial}=require(path.join(root,'scripts/materials.cjs'));
const {validateDeck}=require(path.join(root,'deck-model.js'));
const {planSlide}=require(path.join(root,'blocks.js'));
const text=n=>n?.type==='text'?n.value:(n?.children||[]).map(text).join('');
const walk=n=>[n,...(n?.children||[]).flatMap(walk)];
const source=fs.readFileSync(path.join(base,'slides.md'),'utf8'), deck=parseDocument(source,{sourcePath:'talks/llm-wiki/slides.md',id:'llm-wiki'});
assert.equal(deck.slides.length,40); assert.deepEqual(validateDeck(deck),[]);
const slides=deck.slides.map((s,i)=>{
 const refs=collectReferences({slides:[s]});
 if(s.layout!=='blocks')return{slide:i+1,title:s.title.replace(/\s+/g,' ').trim(),composition:'native-'+(s.visual?.kind||s.layout),links:refs.filter(r=>r.kind==='link').map(r=>r.owner[r.key]),visual:s.visual};
 const plan=planSlide(s);assert.deepEqual(plan.warnings,[],'composition '+(i+1));
 const nodes=[s.heading,...s.blocks].filter(Boolean).flatMap(walk);
 return{slide:i+1,title:text(s.heading),composition:plan.composition,links:nodes.filter(n=>n.tag==='a').map(n=>n.attrs.href),images:nodes.filter(n=>n.tag==='img').map(n=>n.attrs)};
});
const materialFiles=fs.readdirSync(path.join(base,'materials')).filter(f=>f.endsWith('.md'));assert.equal(materialFiles.length,6);
const materials=materialFiles.map(file=>{const content=fs.readFileSync(path.join(base,'materials',file),'utf8');const m=parseMaterial(content,{sourcePath:file});
 for(const r of m.references){if(/^(https?:|mailto:)/.test(r.value))continue;const [name,fragment]=r.value.split('#'),target=name?path.resolve(base,'materials',decodeURIComponent(name)):path.join(base,'materials',file);assert.ok(fs.existsSync(target),file+' '+r.value);if(target.endsWith('.md')&&fragment){if(path.basename(target)==='slides.md')assert.ok(Number(fragment)>=1&&Number(fragment)<=40);else assert.ok(parseMaterial(fs.readFileSync(target,'utf8')).headingIds.includes(decodeURIComponent(fragment)),file+' anchor '+r.value);}}
 return{file,characters:content.length,headings:m.headings.length,references:m.references.length};});
const references=collectReferences(deck).map(r=>({kind:r.kind,value:r.owner[r.key]}));
for(const r of references){if(/^(https?:|mailto:|#)/.test(r.value))continue;assert.ok(fs.existsSync(path.resolve(base,decodeURIComponent(r.value.split('#')[0]))),'source reference '+r.value);assert.ok(!/\.\/demo\/.*\.md/.test(r.value),'unregistered demo MD');}
for(const q of ['This is the key difference: the wiki is a persistent, compounding artifact.','The human mind does not work that way. It operates by association.'])assert.ok(source.split(q).length-1<=1,'quote at most once');
const photoManifest=JSON.parse(fs.readFileSync(path.join(root,'research/llm-wiki-experience-20261029/media/photo-manifest.json'),'utf8')).photos;
const credits=fs.readFileSync(path.join(base,'assets/CREDITS.md'),'utf8');
const chosenPhotos=references.filter(r=>r.kind==='image'&&/\/photos\//.test(r.value)).map(r=>r.value);
for(const name of new Set(chosenPhotos)){const file=path.resolve(base,name),entry=photoManifest.find(p=>path.resolve(root,p.file)===file);assert.ok(entry,'verified photo '+name);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),entry.sha256,'photo bytes '+name);assert.ok(credits.includes(path.basename(name)),'photo credit '+name);}
const script=fs.readFileSync(path.join(base,'materials/speaker-script.md'),'utf8');
const headers=[...script.matchAll(/^## (\d+)장\s*·\s*(.+)$/gm)];assert.deepEqual(headers.map(m=>Number(m[1])),Array.from({length:40},(_,i)=>i+1));assert.deepEqual(headers.map(m=>m[2]),slides.map(s=>s.title),'40 script titles');
const route=JSON.parse(fs.readFileSync(path.join(__dirname,'../llm-wiki-foundations-20261029/engineering/core-route.json'),'utf8'));
assert.equal(route.coreSeconds,1080);assert.equal(route.questionSeconds,120);assert.equal(route.planned,true);assert.equal(route.rehearsalMeasured,false);
const steps=route.route;assert.ok(Array.isArray(steps));assert.equal(new Set(steps.map(s=>s.slide)).size,steps.length);assert.equal(steps[0].slide,1);assert.equal(steps.at(-1).slide,40);
assert.equal(steps.filter(s=>s.slide!==40).reduce((n,s)=>n+s.seconds,0),1080);assert.equal(steps.at(-1).seconds,120);
const byCore=new Map(steps.map(s=>[s.slide,s]));
const clock=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');
const scriptRows=[...script.matchAll(/^\| (\d+) \| (핵심|선택 심화|Q&A) \| (.+) \| (.+) \|$/gm)];
assert.equal(scriptRows.length,40,'script timing table 40');
const guide=fs.readFileSync(path.join(base,'assets/speaker-guide.txt'),'utf8');
let elapsed=0;const comparedTimes=[];
for(const row of scriptRows){const n=Number(row[1]),step=byCore.get(n);assert.equal(row[4],slides[n-1].title,'table title '+n);if(step){assert.equal(row[2],n===40?'Q&A':'핵심');const stamp=clock(elapsed)+'~'+clock(elapsed+step.seconds);assert.equal(row[3],stamp+' · '+step.seconds+'초','script allocation '+n);assert.ok(guide.includes(n+'장 '+stamp+' · '+step.seconds+'초 '+slides[n-1].title),'speaker guide allocation '+n);comparedTimes.push({slide:n,start:elapsed,end:elapsed+step.seconds,seconds:step.seconds});elapsed+=step.seconds;}else{assert.equal(row[2],'선택 심화');const duration=/^\+(\d+)초 별도$/.exec(row[3]);assert.ok(duration,'separate deep allocation '+n);assert.ok(guide.includes(n+'장 +'+duration[1]+'초 별도 '+slides[n-1].title),'guide deep allocation '+n);}}
assert.equal(elapsed,1200);
const jumps=[];for(let i=0;i<steps.length-1;i++){const a=steps[i].slide,b=steps[i+1].slide;assert.ok(a>=1&&a<=40&&b>a&&b<=40);if(b!==a+1){assert.ok(slides[a-1].links.includes('#'+b),'missing live core jump '+a+' -> '+b);jumps.push({from:a,to:b});}}
for(const file of [path.join(base,'slides.md'),path.join(base,'README.md'),path.join(base,'assets/speaker-guide.txt'),path.join(base,'assets/CREDITS.md'),...materialFiles.map(f=>path.join(base,'materials',f))])assert.ok(!/스톡|stock photo|사진(?:은|을).*근거(?:가|로).*(아니|않)|실제.*(발표자|스터디 참여자|책상).*아니/i.test(fs.readFileSync(file,'utf8')),'photo meta '+file);
const report={scope:'source parse/plan, exact quotes, local anchors, 40 script titles, 6 materials, planned core timing and actual slide hash jumps; no browser/rehearsal assertion',source_sha256:crypto.createHash('sha256').update(source).digest('hex'),chosen_photos:[...new Set(chosenPhotos)],slides,materials,references:references.length,route,compared_times:comparedTimes,jumps,compositions:slides.reduce((o,s)=>(o[s.composition]=(o[s.composition]||0)+1,o),{})};
fs.writeFileSync(path.join(__dirname,'source-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({slides:slides.length,materials:materials.length,references:references.length,script_sections:headers.length,core_slides:steps.length,planned_talk_seconds:1080,planned_qa_seconds:120,real_source_jump_count:jumps.length}));
