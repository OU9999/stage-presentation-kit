#!/usr/bin/env node
'use strict';
// Native reading CSS pixels are independent of presentation logical pixels.
// This checks one observed mobile responsibility role, never visual approval.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {parseDocument}=require('./markdown-document.cjs');
const {collectInputs}=require('./design-review.cjs');
const {actualLines,breakVerdict}=require('./llm-wiki-typography-qa.cjs');
const fixturePath='talks/llm-wiki/qa/current-roles.json';
const fixture=require('../'+fixturePath);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const compact=s=>String(s||'').replace(/\s/g,'');
const same=(a,b)=>compact(a)===compact(b);
const equal=(a,b)=>!!a&&!!b&&JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());
const walk=n=>[n,...(n.children||[]).flatMap(walk)];
const value=n=>n.type==='text'?n.value:(n.children||[]).map(value).join('');
function readingRowsVerdict(node,forbidden){
 if(!node||!Array.isArray(node.lines)||!node.lines.length||node.lines.some(l=>!['x','y','width','height'].every(k=>Number.isFinite(l[k]))||l.width<=0||l.height<=0))return 'contract-invalid';
 const rows=actualLines(node);
 if(!rows||!same(rows.map(l=>l.text).join(''),node.text))return 'contract-invalid';
 return rows.some(row=>forbidden.some(t=>same(row.text,t)))?'regression':'pass';
}
function evaluateReading(metrics,source,options={}){
 const contract=(options.fixture||fixture).reading,checks=[];
 const add=(id,status,detail)=>checks.push({id,status,detail});
 const requireData=(ok,id,detail)=>{if(!ok)add(id,'contract-invalid',detail);return ok;};
 if(!requireData(contract&&Array.isArray(contract.body?.boundaries),'reading-contract','An explicit reading role/boundary contract is required.'))return finish();
 const manifest=options.manifest,currentInputs=options.currentInputs;
 requireData(metrics?.coordinateSpace==='native-reading-CSS-pixels','coordinate-space','Reading observations must use native CSS pixels with scale 1.');
 requireData(metrics?.revision===sha(source),'source-identity','Observed revision must match actual source bytes.');
 requireData(currentInputs&&Object.keys(currentInputs).length>0&&Object.entries(currentInputs).every(([p,h])=>metrics?.hashes?.[p]===h),'current-inputs','Every actual source, runtime, style, asset and current contract hash must match.');
 requireData(options.contractSha256&&metrics?.hashes?.[fixturePath]===options.contractSha256,'contract-identity','The exact current role fixture must be part of the captured input hashes.');
 requireData(equal(metrics?.viewport,contract.viewport)&&metrics?.slide===contract.slide,'reading-scope','This role requires slide 18 at 390x844 DPR1.');
 const capture=metrics?.captureManifest;
 requireData(capture?.sha256&&capture.sha256===options.manifestSha256&&manifest?.captureMode==='read-slide-crop'&&manifest.revision===metrics?.revision&&equal(manifest.hashes,metrics?.hashes),'capture-identity','Metrics must identify the exact reading manifest and its complete input inventory.');
 const row=manifest?.observations?.filter(o=>Number(o.index)===contract.slide-1);
 requireData(row?.length===1&&equal(row[0].viewport,contract.viewport)&&row[0].revision===metrics?.revision,'capture-scope','One same-revision reading observation must cover this exact viewport and slide.');
 let deck;
 try{deck=parseDocument(source);}catch(error){add('source','contract-invalid',error.message);return finish();}
 const nodes=deck.slides[contract.slide-1]?.blocks.flatMap(walk)||[];
 function target(text){
  const matches=nodes.filter(n=>n.tag==='p'&&same(value(n),text));
  if(!requireData(matches.length===1,'source-role-'+text,'One exact source paragraph must retain the required responsibility meaning.'))return null;
  const src=matches[0],observed=(metrics?.typography||[]).filter(n=>n.tag==='P'&&Number(n.sourceLine)===src.position.line&&same(n.text,value(src)));
  if(!requireData(observed.length===1,'observed-role-'+text,'One exact sourceLine/tag/text Range observation is required.'))return {src};
  return {src,node:observed[0]};
 }
 const body=target(contract.body.text);
 if(body){
  add('responsibility-source-breaks',walk(body.src).filter(n=>n.tag==='br').length===contract.body.expectedBreaks?'pass':'regression','The role-specific authored boundaries must preserve both responsibilities.');
  if(body.node){
   add('responsibility-rows',readingRowsVerdict(body.node,contract.body.forbiddenRows),'No designated predicate may become an isolated actual glyph row, including rows inside the paragraph.');
   const font=parseFloat(body.node.fontSize),effective=body.node.effectivePixels;
   if(requireData(Number.isFinite(font)&&Number.isFinite(effective)&&Math.abs(font-effective)<.05,'reading-size-observation','Computed and effective values must be measured native CSS pixels.'))add('responsibility-font',font+.05>=contract.body.minCssFont?'pass':'regression','The body retains the existing 18 CSS px reading start value.');
   add('responsibility-membership',body.node.directBody===true&&body.node.parentGroup===null?'pass':'regression','Responsibility copy remains native body, not metadata or another material group.');
   if(requireData(Array.isArray(body.node.breaks),'responsibility-break-observation','Actual before/after glyph positions are required for every authored boundary.')){
    add('responsibility-rendered-break-count',body.node.breaks.length===contract.body.expectedBreaks?'pass':'regression','The three role boundaries must render, not textContent newline splits.');
    if(body.node.breaks.length===contract.body.expectedBreaks)for(const [i,b]of contract.body.boundaries.entries())add('responsibility-boundary-'+i,breakVerdict(body.node,b.before,b.after),'Required boundary uses actual glyph y before and after.');
   }
  }
 }
 const declaration=target(contract.declaration.text);
 if(declaration){
  const strong=walk(declaration.src).filter(n=>n.tag==='strong').map(value).join('');
  add('declaration-source',walk(declaration.src).filter(n=>n.tag==='br').length===1&&same(strong,contract.declaration.emphasis)?'pass':'regression','The original declaration keeps its one authored boundary and emphasis.');
  if(declaration.node){add('declaration-boundary',breakVerdict(declaration.node,contract.declaration.before,contract.declaration.after),'Declaration boundary uses actual native glyph positions.');add('declaration-emphasis',Array.isArray(declaration.node.emphasis)&&same(declaration.node.emphasis.filter(n=>n.tag==='STRONG').map(n=>n.text).join(''),contract.declaration.emphasis)?'pass':'contract-invalid','Actual declaration emphasis/order must remain observed.');}
 }
 target(contract.distinction);
 return finish();
 function finish(){const invalid=checks.filter(c=>c.status==='contract-invalid').length,regressions=checks.filter(c=>c.status==='regression').length;return {format:'llm-wiki-reading-result-v1',status:invalid?'contract-invalid':regressions?'regression':'pass',visualApproval:false,revision:metrics?.revision,viewport:metrics?.viewport,summary:{checks:checks.length,invalid,regressions},checks};}
}
module.exports={evaluateReading,readingRowsVerdict};
if(require.main===module){
 try{
  const opts={},args=process.argv.slice(2);while(args.length){const key=args.shift();if(!['--metrics','--source','--output'].includes(key)||!args.length)throw Error('Usage: --metrics path --source talks/llm-wiki/slides.md [--output path]');opts[key.slice(2)]=args.shift();}
  const root=path.resolve(__dirname,'..');if(!opts.metrics||path.resolve(opts.source||'')!==path.join(root,'talks/llm-wiki/slides.md'))throw Error('Current native reading QA requires --metrics and the canonical source.');
  const bytes=fs.readFileSync(opts.metrics),metrics=JSON.parse(bytes),name=metrics.captureManifest?.path;
  if(typeof name!=='string'||path.isAbsolute(name)||!path.resolve(root,name).startsWith(root+path.sep))throw Error('A repository-relative reading capture manifest is required.');
  const manifestBytes=fs.readFileSync(path.join(root,name));
  const currentInputs=collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).inputs;for(const p of ['AGENTS.md','DESIGN.md',fixturePath])currentInputs[p]=sha(fs.readFileSync(path.join(root,p)));
  const result=evaluateReading(metrics,fs.readFileSync(opts.source,'utf8'),{manifest:JSON.parse(manifestBytes),manifestSha256:sha(manifestBytes),currentInputs,contractSha256:currentInputs[fixturePath]});
  result.contract={path:fixturePath,sha256:currentInputs[fixturePath]};result.evidence={path:opts.metrics,sha256:sha(bytes),captureManifest:{path:name,sha256:sha(manifestBytes)}};
  const json=JSON.stringify(result,null,2)+'\n';if(opts.output)fs.writeFileSync(opts.output,json);process.stdout.write(json);process.exitCode=result.status==='pass'?0:result.status==='contract-invalid'?2:1;
 }catch(error){process.stderr.write(error.message+'\n');process.exitCode=2;}
}
