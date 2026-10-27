'use strict';
// Run: node compiler-probe.cjs /absolute/repo/path /absolute/result.json
// Only the result JSON is written outside a fresh OS temp directory.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const cp = require('node:child_process');
const repo = path.resolve(process.argv[2]);
const resultFile = path.resolve(process.argv[3]);
const { parseMarkdown, buildDeck } = require(path.join(repo, 'scripts/markdown-deck.cjs'));
const temp = fs.mkdtempSync('/tmp/stage-markdown-audit-');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const products = ['scripts/markdown-deck.cjs','scripts/build-examples.cjs','deck-model.js','visual.js','app.js','index.html','styles.css','visual.css'];
const snapshot = () => Object.fromEntries(products.map(file => [file, sha(fs.readFileSync(path.join(repo,file)))]));
const before = snapshot();
const metadata = fields => '<!-- stage\n'+fields+'\n-->\n';
const cases = [
 ['basic', '# Title\n\nFirst line\nsecond line\n\nSecond paragraph.'],
 ['repeated-h1', '# First\n# Second\n\nBody'],
 ['h2', '# Title\n\n## Subheading'],
 ['unordered-default', '# Title\n\n- One\n- Two'],
 ['unordered-demo', metadata('layout: demo')+'# Title\n\n- One\n- Two'],
 ['ordered', '# Title\n\n1. One\n2. Two'],
 ['image-default', '# Title\n\n![Alt](./media.svg)'],
 ['image-explicit', metadata('layout: image')+'# Title\n\n![Alt](./media.svg)\n\nCaption'],
 ['inline-literal', '# **Title**\n\n**strong** *emphasis* `code` [missing](./missing.pdf) <b>raw</b>'],
 ['code-fence-separator', '# Title\n\n```js\nconst x = `\n---\n`;\n```'],
 ['quote', '# Title\n\n> A quote'],
 ['table', '# Title\n\n| A | B |\n| --- | --- |\n| 1 | 2 |'],
 ['duplicate-field', metadata('subtitle: Config')+'# Title\n\nBody'],
 ['unsupported-blocks', metadata('layout: statement')+'```stage\n{"blocks":[{"type":"paragraph","text":"Lost?"}]}\n```\n# Title'],
 ['notes', metadata('notes: PRIVATE_SENTINEL_73')+'# Title\n\nPublic body'],
 ['missing-media', metadata('layout: image')+'# Title\n\n![Alt](./missing.svg)'],
 ['remote-media', metadata('layout: image')+'# Title\n\n![Alt](https://example.invalid/unverified.svg)'],
 ['inline-missing-link', '# Title\n\n[Attachment](./missing.pdf)']
];
const results = [];
for (const [name, source] of cases) {
 const dir = path.join(temp, name); fs.mkdirSync(dir,{recursive:true});
 const input = path.join(dir,'slides.md'); const output = path.join(dir,'compiled');
 fs.writeFileSync(input,source); fs.writeFileSync(path.join(dir,'media.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>');
 const item={name,source};
 try { item.parsed=parseMarkdown(source,{sourcePath:input,outputDir:output}); }
 catch(e) { item.parseError=e.message; }
 try {
  const built=buildDeck(input,output,{repoRoot:repo});
  const content=fs.readFileSync(built.files.content,'utf8');const html=fs.readFileSync(built.files.index,'utf8');
  item.build={ok:true,deck:built.deck,issues:built.issues,files:fs.readdirSync(output).sort(),contentSha:sha(content),sourceContainsNotes:source.includes('PRIVATE_SENTINEL_73'),generatedContentContainsNotes:content.includes('PRIVATE_SENTINEL_73'),generatedContentEscapesRawHtml:content.includes('\\u003cb>raw\\u003c/b>'),sourceLinkPresent:html.includes('href="../slides.md"'),content};
 } catch(e) { item.build={ok:false,error:e.message}; }
 assert.equal(fs.readFileSync(input,'utf8'),source);
 results.push(item);
}
const get=name=>results.find(r=>r.name===name);
assert.equal(get('basic').build.deck.slides[0].layout,'statement');
assert.equal(get('basic').build.deck.slides[0].subtitle,'First line second line\n\nSecond paragraph.');
assert.deepEqual(get('repeated-h1').build.deck.slides[0].title,['First','Second']);
for(const name of ['h2','unordered-default','ordered','image-default','code-fence-separator','quote','table','duplicate-field','unsupported-blocks']) assert.equal(get(name).build.ok,false,name);
assert.equal(get('inline-literal').build.ok,true);
assert(get('inline-literal').build.deck.slides[0].subtitle.includes('[missing](./missing.pdf)'));
assert.equal(get('inline-literal').build.generatedContentEscapesRawHtml,true);
assert.equal(get('notes').build.generatedContentContainsNotes,true);
assert.equal(get('notes').build.sourceLinkPresent,true);
assert.equal(get('missing-media').parsed.slides[0].src,'../missing.svg');
assert.equal(get('missing-media').build.ok,false);
assert.equal(get('remote-media').build.ok,true);
// URL-encoded media paths and suffix are rewritten relative to output, not copied.
const mediaDir=path.join(temp,'media');fs.mkdirSync(mediaDir,{recursive:true});
fs.writeFileSync(path.join(mediaDir,'space name.svg'),'<svg xmlns="http://www.w3.org/2000/svg"/>');
const mediaInput=path.join(mediaDir,'slides.md');fs.writeFileSync(mediaInput,metadata('layout: image')+'# Media\n\n![Alt](./space%20name.svg?v=2#figure)');
const mediaBuild=buildDeck(mediaInput,path.join(mediaDir,'compiled'),{repoRoot:repo});
assert.equal(mediaBuild.deck.slides[0].src,'../space%20name.svg?v=2#figure');
// Identical basenames yield identical fallback IDs; separate output path remains separate.
const identities=[];
for(const name of ['alpha','beta']) {
 const dir=path.join(temp,name);fs.mkdirSync(dir);const input=path.join(dir,'slides.md');
 fs.writeFileSync(input,'# '+name+'\n\nBody');const built=buildDeck(input,path.join(dir,'compiled'),{repoRoot:repo});
 identities.push({source:input,output:built.files.index,id:built.deck.id,title:built.deck.title});
}
assert.deepEqual(identities.map(i=>i.id),['slides','slides']);
// Rebuild overwrites generated content.js edits; invalid input preflight preserves outputs.
const original=get('basic');const input=path.join(temp,'basic/slides.md');const output=path.join(temp,'basic/compiled');
const contentFile=path.join(output,'content.js');const indexFile=path.join(output,'index.html');
const originalContent=fs.readFileSync(contentFile,'utf8');fs.writeFileSync(contentFile,originalContent+'\n/* BROWSER_EXPORT_EDIT */\nwindow.PRESENTATION.slides[0].title="Screen edit";\n');
buildDeck(input,output,{repoRoot:repo});assert.equal(fs.readFileSync(contentFile,'utf8'),originalContent);
const rebuild={manualGeneratedEditOverwritten:true,sourceUnchanged:true};
const lastGood={content:sha(fs.readFileSync(contentFile)),index:sha(fs.readFileSync(indexFile))};
rebuild.failures=[];
for (const [name, source] of [['parse','# Title\n\n## Bad'],['model',metadata('layout: visual')+'# Title'],['missing-media',metadata('layout: image')+'# Title\n\n![Alt](missing.svg)']]) {
 fs.writeFileSync(input,source);let error;
 try{buildDeck(input,output,{repoRoot:repo});}catch(e){error=e.message;}
 assert(error,name);assert.equal(sha(fs.readFileSync(contentFile)),lastGood.content);assert.equal(sha(fs.readFileSync(indexFile)),lastGood.index);
 rebuild.failures.push({name,error,lastGoodOutputPreserved:true});
}
fs.writeFileSync(input,original.source);
// Required entry dependency closure before and after relocation, without browser execution.
const sampleOut=path.join(mediaDir,'compiled');const html=fs.readFileSync(path.join(sampleOut,'index.html'),'utf8');
const refs=[...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(v=>!v.startsWith('#')&&!/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(v));
const relocated=path.join(temp,'share/deeper/copied');fs.mkdirSync(relocated,{recursive:true});fs.cpSync(sampleOut,relocated,{recursive:true});
const references=refs.map(value=>{const clean=decodeURIComponent(value.split(/[?#]/)[0]);const absolute=path.resolve(sampleOut,clean);const moved=path.resolve(relocated,clean);return {value,originalExists:fs.existsSync(absolute),outsideCompiled:!absolute.startsWith(sampleOut+path.sep),afterRelocationExists:fs.existsSync(moved)};});
const closure={compiledFiles:fs.readdirSync(sampleOut).sort(),references,media:{value:mediaBuild.deck.slides[0].src,outsideCompiled:true,assetCopied:false},standalone:false,method:'Static dependency/path closure only; no browser/file-protocol execution'};
assert.equal(closure.compiledFiles.length,2);assert(references.filter(r=>/\.(?:js|css)/.test(r.value)&&!r.value.startsWith('content.js')).every(r=>r.outsideCompiled));
assert.deepEqual(snapshot(),before);
const head=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim();
const result={capturedAt:new Date().toISOString(),head,node:process.version,temp,command:'node compiler-probe.cjs REPO RESULT_JSON',productSha256:before,productUnchanged:true,cases:results,mediaRewrite:{source:'./space%20name.svg?v=2#figure',output:mediaBuild.deck.slides[0].src,fileCopied:false},identities,rebuild,closure,limitations:['Tests current compiler only; no new parser/CLI/watch/source patch/renderer implementation','No package install, browser, live publication, complete UI regression or existing185 test rerun','Preflight parse/model/missing-media failures preserve existing files; filesystem write failure/atomic multi-file publish not tested','Identical fallback deck id is not proof of current storage collision: storage also includes location.pathname','Relocation is a static dependency closure check, not an actual browser run']};
fs.writeFileSync(resultFile,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({head,temp,cases:results.length,buildPassed:results.filter(r=>r.build.ok).length,buildRejected:results.filter(r=>!r.build.ok).length,productUnchanged:true,rebuild,closure},null,2));
