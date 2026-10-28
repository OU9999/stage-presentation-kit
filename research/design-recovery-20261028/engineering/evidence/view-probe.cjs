'use strict';
// Read current product APIs. Inputs/output live only in a fresh /tmp project.
// Usage: node view-probe.cjs REPO_ROOT RESULT_JSON
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const repo = path.resolve(process.argv[2]);
const resultPath = path.resolve(process.argv[3]);
const { parseDocument, collectReferences } = require(path.join(repo, 'scripts/markdown-document.cjs'));
const { buildProject } = require(path.join(repo, 'scripts/stage.cjs'));
const model = require(path.join(repo, 'deck-model.js'));
const temp = fs.mkdtempSync('/tmp/stage-view-audit-');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const productFiles = ['scripts/markdown-document.cjs','scripts/markdown-deck.cjs','scripts/stage.cjs','deck-model.js','app.js','blocks.js','blocks.css'];
const snapshot = () => Object.fromEntries(productFiles.map(file => [file, sha(fs.readFileSync(path.join(repo, file)))]));
const before = snapshot();
const base = '# A **single** claim\n\nContext and disclosure stay visible.\n\n![Figure](../../shared/figure.svg)\n\n[Reference](../plain/slides.md#1)\n';
const table = '# Two values\n\n| Target | Value | Unit |\n| --- | --- | --- |\n| Ideas | 24 | items |\n| Tasks | 6 | kinds |\n\nFictional example, not measured results.\n';
const groups = '# Results\n\n## Record\n\n![Report](../../shared/figure.svg)\n\nA complete report.\n\n## Next action\n\n> Show the next step.\n\nNext review stays in source order.\n';
const cases = [
 ['plain', base],
 ['hint-before-h1', '<!-- stage-view: message -->\n' + base],
 ['hint-after-h1', '# A **single** claim\n\n<!-- stage-view: message -->\n\nContext and disclosure stay visible.'],
 ['stage-metadata', '<!-- stage\nlayout: statement\nalign: center\n-->\n# A claim\n\nContext and disclosure stay visible.'],
 ['stage-metadata-mixed', '<!-- stage\nlayout: statement\n-->\n' + table],
 ['stage-view-metadata-key', '<!-- stage\nlayout: statement\nview: message\n-->\n# A claim'],
 ['frontmatter-view', '---\nview: message\n---\n# A claim'],
 ['frontmatter-role', '---\nrole: message\n---\n# A claim'],
 ['stage-notes', '<!-- stage\nlayout: statement\nnotes: private\n-->\n# A claim'],
 ['ordinary-h2-groups', groups],
 ['ordinary-two-values', table],
 ['code-separator', '# Code\n\n```js\nconst separator = `\n---\n`;\n```'],
];
function allText(node) {
 if (Array.isArray(node)) return node.map(allText).join('');
 return !node ? '' : node.type === 'text' ? node.value : allText(node.children || []);
}
const records = [];
for (const [name, source] of cases) {
 const input = path.join(temp,'cases',name+'.md');fs.mkdirSync(path.dirname(input),{recursive:true});fs.writeFileSync(input,source);
 const entry = {name,input,source};
 try {
  const deck=parseDocument(source,{sourcePath:'cases/'+name+'.md',id:name});
  entry.ok=true;entry.deck=deck;entry.issues=model.validateDeck(deck);
  entry.references=collectReferences(deck).map(ref=>({key:ref.key,kind:ref.kind,value:ref.owner[ref.key],position:ref.position}));
  const slide=deck.slides[0];entry.summary={layout:slide.layout,title:slide.title??null,headingTag:slide.heading?.tag??null,topLevelTags:(slide.blocks||[]).map(n=>n.tag),text:allText([...(slide.heading?[slide.heading]:[]),...(slide.blocks||[])]),origin:slide.origin};
  fs.writeFileSync(input+'.deck.json',JSON.stringify(deck,null,2)+'\n');
 }catch(error){entry.ok=false;entry.error=error.message;}
 assert.equal(fs.readFileSync(input,'utf8'),source);records.push(entry);
}
const get=name=>records.find(record=>record.name===name);
assert.equal(get('plain').summary.headingTag,'h1');
assert.equal(get('hint-before-h1').summary.headingTag,null);
assert.deepEqual(get('hint-before-h1').summary.topLevelTags.slice(0,2),['p','h1']);
assert(get('hint-before-h1').summary.text.includes('<!-- stage-view: message -->'));
assert.equal(get('hint-before-h1').issues.filter(i=>i.severity==='error').length,0);
assert.equal(get('hint-after-h1').summary.headingTag,'h1');
assert(get('hint-after-h1').summary.text.includes('<!-- stage-view: message -->'));
assert.equal(get('stage-metadata').summary.layout,'statement');
assert.equal(get('stage-metadata').deck.slides[0].blocks,undefined);
for(const name of ['stage-metadata-mixed','stage-view-metadata-key','frontmatter-view','frontmatter-role','stage-notes'])assert.equal(get(name).ok,false,name);
assert.equal(get('ordinary-two-values').summary.layout,'blocks');
assert.equal(get('ordinary-h2-groups').summary.layout,'blocks');
assert.equal(get('code-separator').deck.slides.length,1);
assert.equal(get('code-separator').deck.slides[0].blocks[0].children[0].children[0].value,'const separator = `\n---\n`;\n');
// Unknown JS properties can pass the generic model; this does not create a view API.
const injected=JSON.parse(JSON.stringify(get('plain').deck));injected.slides[0].view='message';
const injectedModel={property:'slide.view',value:'message',issues:model.validateDeck(injected),parserNeverProducesProperty:!Object.hasOwn(get('plain').deck.slides[0],'view'),runtimeReadsSlideView:/slide\.view\b/.test(fs.readFileSync(path.join(repo,'app.js'),'utf8'))};
assert.equal(injectedModel.issues.filter(i=>i.severity==='error').length,0);assert.equal(injectedModel.runtimeReadsSlideView,false);
// Build an isolated two-deck project with current APIs, preserving the literal in content.
fs.mkdirSync(path.join(temp,'talks/plain'),{recursive:true});fs.mkdirSync(path.join(temp,'talks/hinted'),{recursive:true});fs.mkdirSync(path.join(temp,'shared'));
fs.writeFileSync(path.join(temp,'talks/plain/slides.md'),base);fs.writeFileSync(path.join(temp,'talks/hinted/slides.md'),'<!-- stage-view: message -->\n'+base);
fs.writeFileSync(path.join(temp,'shared/figure.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>');
const configPath=path.join(temp,'stage.config.json');fs.writeFileSync(configPath,JSON.stringify({sourceDir:'talks',outputDir:'output'}));
const built=buildProject({configPath,repoRoot:repo});
const buildRecords=[];
for(const slug of ['plain','hinted']) {
 const dir=path.join(built.outputDir,slug);const content=fs.readFileSync(path.join(dir,'content.js'),'utf8');const scope={window:{}};
 vm.runInNewContext(content,scope,{filename:path.join(dir,'content.js'),timeout:1000});
 const deck=JSON.parse(JSON.stringify(scope.window.PRESENTATION));const presentation=fs.readFileSync(path.join(dir,'index.html'),'utf8');const read=fs.readFileSync(path.join(dir,'read.html'),'utf8');
 buildRecords.push({slug,deck,contentSha256:sha(content),literalInGeneratedData:JSON.stringify(deck).includes('<!-- stage-view: message -->'),sameContentReferenceInPresentAndRead:/src="content\.js\?v=/.test(presentation)&&/src="content\.js\?v=/.test(read),presentBodyView:/data-view="present"/.test(presentation),readBodyView:/data-view="read"/.test(read),references:collectReferences(deck).map(ref=>({key:ref.key,kind:ref.kind,value:ref.owner[ref.key],position:ref.position})),assets:fs.readdirSync(path.join(dir,'assets')).sort()});
}
assert.equal(buildRecords[1].literalInGeneratedData,true);assert(buildRecords.every(r=>r.sameContentReferenceInPresentAndRead));
assert.deepEqual(snapshot(),before);
const result={capturedAt:new Date().toISOString(),head:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim(),node:process.version,temp,productSha256:before,productUnchanged:true,cases:records,injectedModel,build:{output:built.outputDir,manifest:built.manifest,decks:buildRecords},limitations:['Current APIs only; no stage-view parser/view implementation','Actual parse/model/isolated build and static data/source inspection; no browser/CSS/layout or visual-effect execution','A passing model with unknown slide.view does not imply a supported view API','No default build, server, package install, product edits or full210test rerun']};
fs.writeFileSync(resultPath,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({head:result.head,temp,cases:records.length,success:records.filter(r=>r.ok).length,rejection:records.filter(r=>!r.ok).length,productUnchanged:true,summaries:records.map(r=>({name:r.name,ok:r.ok,...(r.summary||{error:r.error})})),build:buildRecords.map(r=>({slug:r.slug,literal:r.literalInGeneratedData,sameContent:r.sameContentReferenceInPresentAndRead}))},null,2));
