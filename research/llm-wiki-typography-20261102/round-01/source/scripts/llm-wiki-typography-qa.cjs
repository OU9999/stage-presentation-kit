#!/usr/bin/env node
'use strict';
// This CLI checks the LLM Wiki's known roles against real Range glyph observations.
// It never assigns a visual approval and does not infer a universal Korean rule.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { parseDocument } = require('./markdown-document.cjs');
const defaultFixture = require('../research/llm-wiki-typography-20261102/engineering/fixtures/llm-wiki-roles.json');
const compact = s => String(s || '').replace(/\s/g, '');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const value = n => n.type === 'text' ? n.value : (n.children || []).map(value).join('');
const walk = n => [n, ...(n.children || []).flatMap(walk)];
const same = (a, b) => compact(a) === compact(b);
const multiset = a => a.map(compact).sort();
const equalMap = (a,b) => !!a && !!b && JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());

function actualLines(node) {
  // A literal soft newline inside lines[].text is not a rendered line break.
  if (!Array.isArray(node.lines) || !node.lines.length || node.lines.some(l => !Number.isFinite(l.y))) return null;
  const rows = [];
  for (const line of node.lines) {
    let row = rows.find(r => Math.abs(r.y - line.y) < .75);
    if (!row) { row = { y: line.y, text: '' }; rows.push(row); }
    row.text += line.text;
  }
  return rows.sort((a, b) => a.y - b.y);
}
function tailVerdict(node, forbidden) {
  const lines = actualLines(node);
  if (!lines || !same(lines.map(l => l.text).join(''), node.text)) return 'contract-invalid';
  return forbidden.some(t => same(t, lines.at(-1).text)) ? 'regression' : 'pass';
}
function breakVerdict(node, before, after) {
  const lines = actualLines(node);
  if (!lines || !same(lines.map(l => l.text).join(''), node.text)) return 'contract-invalid';
  if (lines.length < 2) return 'regression';
  if (!Array.isArray(node.breaks)) return 'contract-invalid';
  const boundaries = node.breaks.filter(b => compact(b.beforeText).endsWith(compact(before)) && compact(b.afterText).startsWith(compact(after)));
  if (boundaries.length !== 1) return 'contract-invalid';
  const b = boundaries[0];
  if (![b.beforeGlyph?.y, b.afterGlyph?.y].every(Number.isFinite)) return 'contract-invalid';
  return Math.abs(b.beforeGlyph.y - b.afterGlyph.y) >= .75 ? 'pass' : 'regression';
}
function boxInside(inner, outer, epsilon = 2) {
  return inner && outer && ['x','y','width','height'].every(k => Number.isFinite(inner[k]) && Number.isFinite(outer[k])) && inner.width > 0 && inner.height > 0 && inner.x >= outer.x-epsilon && inner.y >= outer.y-epsilon && inner.x+inner.width <= outer.x+outer.width+epsilon && inner.y+inner.height <= outer.y+outer.height+epsilon;
}
function evaluate(manifest, source, options = {}) {
  const fixture = options.fixture || defaultFixture;
  const checks = [];
  const mode = options.mode || 'current';
  const add = (id, status, detail) => checks.push({ id, status, detail });
  if (!['current','baseline'].includes(mode)) add('mode','contract-invalid','An explicit current or baseline mode is required.');
  if (mode==='baseline') {
    if (sha(source)!==fixture.beforeSourceSha256 || !equalMap(manifest.hashes,fixture.baselineCaptureHashes)) add('baseline-identity','contract-invalid','Baseline mode requires the frozen original source and complete historical capture hashes.');
  } else {
    if (!options.currentInputs || !Object.keys(options.currentInputs).length || ['talks/llm-wiki/slides.md','blocks.css','blocks.js','scripts/markdown-document.cjs'].some(k=>!options.currentInputs[k]) || Object.keys(options.currentInputs).some(k=>manifest.hashes?.[k]!==options.currentInputs[k])) add('current-inputs','contract-invalid','Current mode requires every actual runtime, style, source and asset input hash to match the capture.');
  }
  if (!options.svgMetrics) add('svg-metrics','contract-invalid','Measured SVG inventory/contain sizes are required for all nine diagrams.');
  else if (mode==='current') {
    if (!equalMap(options.svgMetrics.hashes,manifest.hashes)) add('svg-inputs','contract-invalid','SVG metrics must carry the same complete capture inputs, including CSS/runtime, as the manifest.');
    if (!options.manifestSha256 || options.svgMetrics.captureManifest?.sha256!==options.manifestSha256 || !equalMap(options.svgMetrics.viewport,manifest.observations?.[0]?.viewport)) add('svg-capture','contract-invalid','SVG metrics must identify this exact manifest file and viewport.');
  }
  let deck;
  try { deck = parseDocument(source); } catch (e) { return { status:'contract-invalid', checks:[{id:'source',status:'contract-invalid',detail:e.message}] }; }
  if (deck.slides.length !== 26) {
    add('source-count','contract-invalid','Exactly the original 26 topics are required.');
    return {format:'llm-wiki-typography-result-v1',mode,status:'contract-invalid',visualApproval:false,summary:{checks:checks.length,invalid:checks.filter(c=>c.status==='contract-invalid').length,regressions:0},checks};
  }
  if (manifest.revision !== sha(source)) add('capture-source','contract-invalid','Manifest revision does not match the supplied source bytes.');
  function observation(slide) {
    const found = (manifest.observations || []).filter(o => Number(o.index) === slide-1);
    if (found.length !== 1) { add(`slide-${slide}`,'contract-invalid',`Expected one observation, found ${found.length}.`); return null; }
    return found[0];
  }
  function sourceMatch(slide, text, { includes = false } = {}) {
    const nodes = deck.slides[slide-1]?.blocks.flatMap(walk) || [];
    const found = nodes.filter(n => ['p','pre'].includes(n.tag) && (includes ? compact(value(n)).includes(compact(text)) : same(value(n), text)));
    if (found.length !== 1) { add(`source-${slide}-${text.slice(0,10)}`,'contract-invalid',`Required role missing, duplicated or changed (${found.length}).`); return null; }
    return found[0];
  }
  function observedMatch(o, sourceNode) {
    if (!o || !sourceNode) return null;
    const found = (o.typography || []).filter(n => n.tag === sourceNode.tag.toUpperCase() && Number(n.sourceLine) === sourceNode.position.line && same(n.text, value(sourceNode)));
    if (found.length !== 1) { add(`observation-${o.index}-${sourceNode.position.line}`,'contract-invalid',`Expected one exact source/tag/text observation, found ${found.length}.`); return null; }
    return found[0];
  }
  function size(id, n, min) {
    const font = parseFloat(n.fontSize), effective = n.effectivePixels;
    if (!Number.isFinite(font) || !Number.isFinite(effective) || effective <= 0) add(id,'contract-invalid','Computed and effective font observations are required.');
    else add(id,font + .05 >= min ? 'pass' : 'regression',`${font} logical / ${effective.toFixed(3)} displayed px; required role starts at ${min} logical.`);
  }
  for (const role of fixture.roles) {
    const o = observation(role.slide), src = sourceMatch(role.slide, role.text), node = observedMatch(o, src);
    if (!node) continue;
    if (role.forbiddenLastLines) add(role.id+'-tail',tailVerdict(node,role.forbiddenLastLines),'Only this role’s designated non-intentional predicate tail is checked.');
    if (role.minLogicalFont) size(role.id+'-font',node,role.minLogicalFont);
  }
  for (const role of fixture.breaks) {
    const o=observation(role.slide),src=sourceMatch(role.slide,role.text),node=observedMatch(o,src);
    if (!node) continue;
    const br = walk(src).filter(n => n.tag === 'br');
    if (br.length !== 1) add(role.id+'-source-break','regression',`Expected one authored boundary, found ${br.length}.`);
    add(role.id+'-rendered-break',breakVerdict(node,role.before,role.after),'Boundary uses actual before/after glyph y, never textContent newline splitting.');
    const sourceStrong = walk(src).filter(n => n.tag === 'strong').map(value).join('');
    if (!same(sourceStrong, role.emphasis)) add(role.id+'-source-emphasis','contract-invalid','Required emphasis/order changed.');
    if (br.length && (!Array.isArray(node.emphasis) || !same(node.emphasis.filter(n=>n.tag.toLowerCase()==='strong').map(n=>n.text).join(''),role.emphasis))) add(role.id+'-rendered-emphasis','contract-invalid','Rendered emphasis/order observation missing or changed.');
  }
  // Request text may live in the original PRE or in four native paragraphs.
  const requestObs=observation(24);
  for (let i=0;i<fixture.requests.length;i++) {
    const src=sourceMatch(24,fixture.requests[i],{includes:true}),n=observedMatch(requestObs,src);
    if (!n) continue;
    size('request-'+i+'-font',n,32);
    const body=requestObs.bodyLogicalBox || (requestObs.body && requestObs.stage && Object.fromEntries(['x','y','width','height'].map(k=>[k,['x','y'].includes(k)?(requestObs.body[k]-requestObs.stage[k])/(requestObs.stage.width/1600):requestObs.body[k]/(requestObs.stage.width/1600)])));
    add('request-'+i+'-geometry',boxInside(n.logicalBox,body)?'pass':'regression','The complete request remains inside the actual body area.');
  }
  const s6=deck.slides[5],o6=observation(6),shared=sourceMatch(6,fixture.roles.find(r=>r.id==='shared-editing').text),sharedObs=observedMatch(o6,shared);
  const h2=s6.blocks.map((n,i)=>n.tag==='h2'?i:-1).filter(i=>i>=0);
  const isPrelude=shared && s6.blocks.indexOf(shared)<h2[0] && h2.length===2;
  add('shared-source-membership',isPrelude?'pass':'regression','Common reading/editing belongs before both role groups in the source AST.');
  if (sharedObs) {
    if (!isPrelude) add('shared-dom-membership','regression','Original source still places shared text inside the AI group.');
    else if (!('parentGroup' in sharedObs) || typeof sharedObs.directBody!=='boolean') add('shared-dom-membership','contract-invalid','DOM group/directBody observation is required.');
    else add('shared-dom-membership',sharedObs.parentGroup===null && sharedObs.directBody?'pass':'regression','Common paragraph must be a direct child of the body.');
    if (isPrelude && Array.isArray(o6.groups) && o6.groups.length===2 && Number(o6.groupCount)===2) {
      const [a,b]=o6.groups,body=o6.bodyLogicalBox;
      if (![a.logicalBox,b.logicalBox,a.firstParagraphBox,b.firstParagraphBox,body,sharedObs.logicalBox].every(b=>b&&['x','y','width','height'].every(k=>Number.isFinite(b[k])))) {add('shared-layout','contract-invalid','Complete group/body/first-paragraph boxes are required.');}
      else {
      const widths=Math.abs(a.logicalBox.width-b.logicalBox.width)<2 && a.logicalBox.width>body.width*.42;
      const aligned=Math.abs(a.firstParagraphBox.y-b.firstParagraphBox.y)<2;
      const full=sharedObs.logicalBox.width>=body.width-2 && Math.abs(sharedObs.logicalBox.x-body.x)<2;
      add('shared-layout',widths&&aligned&&full?'pass':'regression','Two real columns, equal first-body baselines, shared full-width row.');
      }
    } else if (isPrelude) add('shared-layout','contract-invalid','Two groups and measured first-paragraph/body boxes are required.');
  }
  for (const role of fixture.diagrams) {
    const slide=deck.slides[role.slide-1];
    const imgs=slide.blocks.flatMap(walk).filter(n=>n.tag==='img');
    const current=imgs.length===1 && imgs[0].attrs?.src;
    add('diagram-'+role.slide+'-source',current===role.src?'pass':'regression','Explanatory reconstruction uses its separate new asset, preserving originals.');
    if (options.assetHashes && current) {
      const file=path.posix.normalize(path.posix.join('talks/llm-wiki',current));
      const captured=manifest.hashes?.[file],actual=options.assetHashes[file];
      const images=observation(role.slide)?.images || [];
      if (!captured || !actual || captured!==actual || images.length!==1 || !images[0].src.includes(captured.slice(0,12))) add('diagram-'+role.slide+'-capture','contract-invalid','Captured asset identity must match the supplied source asset bytes.');
    }
    if (options.svgMetrics) {
      const all=options.svgMetrics.observations?.filter(o=>o.slide===role.slide) || [];
      if (all.length!==1 || options.svgMetrics.revision!==manifest.revision || all[0].src!==observation(role.slide)?.images?.[0]?.src) {add('diagram-'+role.slide+'-metrics','contract-invalid','One same-revision SVG metric observation is required.');continue;}
      const assetPath=path.posix.normalize(path.posix.join('talks/llm-wiki',current||role.src));
      if (all[0].assetSha256!==manifest.hashes?.[assetPath] || !all[0].sourcePaths?.includes(assetPath)) add('diagram-'+role.slide+'-asset-identity','contract-invalid','SVG metrics must identify the captured source asset SHA256 and source path.');
      const expected=mode==='baseline'?role.beforeTexts:role.currentTexts;
      if (!Array.isArray(all[0].texts) || JSON.stringify(multiset(all[0].texts.map(t=>t.text)))!==JSON.stringify(multiset(expected))) {add('diagram-'+role.slide+'-inventory','contract-invalid','Every expected visible label must be observed once, including repeated labels.');continue;}
      if (mode==='current' && all[0].materialKind!==role.kind) add('diagram-'+role.slide+'-classification','contract-invalid','Observed explanatory-reconstruction classification must match the project role fixture.');
      const essential=all[0].texts.filter(t=>!role.sourceMetaTexts.some(x=>same(x,t.text)));
      if (!essential.length || essential.some(t=>!Number.isFinite(t.stageLogicalPixels))) add('diagram-'+role.slide+'-font','contract-invalid','Actual contain-projected SVG text metrics are required.');
      else add('diagram-'+role.slide+'-font',essential.every(t=>t.stageLogicalPixels+.05>=role.minLogicalFont)?'pass':'regression',`Minimum essential contain-projected size ${Math.min(...essential.map(t=>t.stageLogicalPixels)).toFixed(3)} logical px.`);
    }
  }
  if (options.assetHashes) for (const [file,expected] of Object.entries(fixture.originalAssets)) add('preserved-'+file,options.assetHashes[file]===expected?'pass':'contract-invalid','Original SVG bytes must remain available unchanged.');
  const invalid=checks.filter(c=>c.status==='contract-invalid').length,regressions=checks.filter(c=>c.status==='regression').length;
  return {format:'llm-wiki-typography-result-v1',mode,status:invalid?'contract-invalid':regressions?'regression':'pass',visualApproval:false,revision:manifest.revision,summary:{checks:checks.length,invalid,regressions},checks};
}
if (require.main === module) {
  try {
    const args=process.argv.slice(2),opts={};
    while(args.length){const k=args.shift();if(!['--mode','--manifest','--source','--svg-metrics','--output'].includes(k)||!args.length)throw Error('Usage: --mode current|baseline --manifest path --source path --svg-metrics path [--output path]');opts[k.slice(2)]=args.shift();}
    if(!opts.manifest||!opts.source||!opts.mode||!opts['svg-metrics'])throw Error('--mode, --manifest, --source and --svg-metrics are required.');
    const root=path.resolve(__dirname,'..');
    const files=[...Object.keys(defaultFixture.originalAssets),...defaultFixture.diagrams.map(d=>path.posix.normalize(path.posix.join('talks/llm-wiki',d.src)))];
    const assetHashes=Object.fromEntries(files.map(f=>[f,fs.existsSync(path.join(root,f))?sha(fs.readFileSync(path.join(root,f))):null]));
    let currentInputs;
    if(opts.mode==='current') {
      if(path.resolve(opts.source)!==path.join(root,'talks/llm-wiki/slides.md'))throw Error('Current mode requires the canonical talks/llm-wiki/slides.md source.');
      currentInputs=require('./design-review.cjs').collectInputs({repoRoot:root,source:'talks/llm-wiki/slides.md'}).inputs;
      for(const file of ['AGENTS.md','DESIGN.md'])currentInputs[file]=sha(fs.readFileSync(path.join(root,file)));
    }
    const manifestBytes=fs.readFileSync(opts.manifest);
    const result=evaluate(JSON.parse(manifestBytes.toString('utf8')),fs.readFileSync(opts.source,'utf8'),{assetHashes,mode:opts.mode,currentInputs,manifestSha256:sha(manifestBytes),...(opts['svg-metrics']?{svgMetrics:JSON.parse(fs.readFileSync(opts['svg-metrics'],'utf8'))}:{})});
    const json=JSON.stringify(result,null,2)+'\n';if(opts.output)fs.writeFileSync(opts.output,json);process.stdout.write(json);process.exitCode=result.status==='pass'?0:result.status==='contract-invalid'?2:1;
  } catch(e) {process.stderr.write(e.message+'\n');process.exitCode=2;}
}
module.exports={evaluate,actualLines,tailVerdict,breakVerdict,boxInside};
