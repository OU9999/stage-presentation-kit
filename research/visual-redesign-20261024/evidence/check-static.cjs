const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..'),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,12);
const html=['index.html','examples/index.html',...['product-launch','engineering-review','photo-story','workshop','devday-compositions','visual-story','visual-starter'].map(s=>'examples/'+s+'/index.html'),'examples/visual-story/data.html','examples/visual-starter/data.html','research/visual-redesign-20261024/index.html','research/visual-redesign-20261024/qa-reuse/index.html','research/visual-redesign-20261024/qa-reuse/data.html','research/visual-redesign-20261024/design/index.html','research/visual-redesign-20261024/design/prototype.html','research/visual-redesign-20261024/evidence/contact-sheet.html'];
const markdown=['README.md','CONFIG.md','DESIGN.md','EXAMPLES.md','MARKDOWN.md','examples/visual-story/README.md','examples/visual-starter/README.md',...['research','engineering','design'].flatMap(d=>fs.readdirSync(path.join(root,'research/visual-redesign-20261024',d)).filter(f=>f.endsWith('.md')).map(f=>'research/visual-redesign-20261024/'+d+'/'+f))];
const issues=[];let links=0,hashes=0;
for(const file of [...html,...markdown]){
 const raw=fs.readFileSync(path.join(root,file),'utf8');
 const text=file.endsWith('.md')?raw.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm,'').replace(/`[^`]*`/g,''):raw;
 const refs=file.endsWith('.html')?[...text.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]):[...text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(m=>m[1]);
 for(let ref of refs){ref=ref.replace(/^<|>$/g,'');if(/^(?:https?:|data:|mailto:|#)/.test(ref))continue;const clean=ref.split(/[?#]/)[0];if(!clean)continue;const target=path.resolve(path.dirname(path.join(root,file)),decodeURIComponent(clean));links++;if(!fs.existsSync(target)){issues.push({file,ref,problem:'missing'});continue;}const v=ref.includes('?')?new URLSearchParams(ref.split('?')[1].split('#')[0]).get('v'):null;if(v&&/^[a-f0-9]{12}$/.test(v)){hashes++;if(v!==sha(target))issues.push({file,ref,problem:'hash'});}}
}
const runtime=['styles.css','visual.css','deck-model.js','visual.js','app.js'].map(file=>({file,identical:fs.readFileSync(path.join(root,file)).equals(fs.readFileSync(path.join(root,'examples/visual-starter/runtime',file)))}));
for(const r of runtime)if(!r.identical)issues.push({problem:'runtime copy',file:r.file});
const slides=JSON.parse(fs.readFileSync(path.join(__dirname,'final-slides.json'),'utf8'));
for(const [file,hash]of Object.entries(slides.hashes))if(!crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').startsWith(hash))issues.push({problem:'capture source mismatch',file});
const report={files:html.length+markdown.length,links,hashes,runtime,issues};
fs.writeFileSync(path.join(__dirname,'final-static.json'),JSON.stringify(report,null,2)+'\n');console.log(report);if(issues.length)process.exitCode=1;
