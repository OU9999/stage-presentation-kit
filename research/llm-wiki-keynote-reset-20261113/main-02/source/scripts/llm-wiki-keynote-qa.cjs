#!/usr/bin/env node
'use strict';
// Current keynote checks are deliberately separate from the frozen 26-slide regressions.
// Real observations are mandatory in current mode. This never grants visual approval.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {parseDocument} = require('./markdown-document.cjs');
const {parseMaterial, renderMaterial} = require('./materials.cjs');
const {collectInputs} = require('./design-review.cjs');
const {actualLines, breakVerdict, boxInside} = require('./llm-wiki-typography-qa.cjs');
const {segmentIntersectsBox} = require('./llm-wiki-geometry-qa.cjs');
const SOURCE = 'talks/llm-wiki/slides.md';
const CONTRACT = 'talks/llm-wiki/qa/keynote-current.json';
const COVERAGE = 'talks/llm-wiki/qa/keynote-coverage.json';
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const compact = x => String(x || '').replace(/\s/g, '');
const same = (a,b) => compact(a) === compact(b);
const walk = n => [n, ...(n.children || []).flatMap(walk)];
const value = n => n.type === 'text' ? n.value : n.tag === 'br' ? ' ' : (n.children || []).map(value).join('');
const equal = (a,b) => !!a && !!b && JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
const box = b => b && ['x','y','width','height'].every(k => Number.isFinite(b[k])) && b.width > 0 && b.height > 0;
const point = p => p && Number.isFinite(p.x) && Number.isFinite(p.y);
const near = (a,b,e=2) => point(a) && point(b) && Math.hypot(a.x-b.x,a.y-b.y) <= e;
const nativeTags = new Set(['h1','h2','h3','h4','h5','h6','p','pre','li','th','td']);
function nativeNodes(slide) {
  return [slide?.heading,...(slide?.blocks || [])].filter(Boolean).flatMap(walk).filter(n => nativeTags.has(n.tag) && compact(value(n)) && !(n.tag === 'li' && (n.children || []).some(c => ['p','ul','ol'].includes(c.tag))));
}
function svgTexts(source) {
  const decode = x => x.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  return [...source.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(m => decode(m[1].replace(/<[^>]+>/g,'')));
}
function section(text, anchor) {
  const material = parseMaterial(text);
  const html = renderMaterial(material).body;
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (!ids.includes(anchor) && material.headingId !== anchor) return null;
  const headings = [...text.matchAll(/^#{1,6}\s+(.+)$/gm)];
  // Use the actual material parser's generated heading IDs, including duplicate suffixes.
  const slug = s => s.toLowerCase().trim().replace(/<[^>]*>/g,'').replace(/[`*]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').replace(/\s+/g,'-');
  const first = material.headingIds.indexOf(anchor);
  if (first < 0) return null;
  const start = headings[first].index, level = headings[first][0].match(/^#+/)[0].length;
  const end = headings.slice(first+1).find(h => h[0].match(/^#+/)[0].length <= level)?.index ?? text.length;
  return text.slice(start,end);
}
function rectGeometry(observation, contract) {
  const checks=[]; const add=(id,status,detail)=>checks.push({id,status,detail});
  const invalid=(id,detail)=>add(id,'contract-invalid',detail);
  const g=observation?.geometry, expected=contract?.nodes, edges=contract?.relations;
  if (!Array.isArray(expected)||!expected.length||!Array.isArray(edges)||!edges.length||!g||g.coordinateSpace!=='root-svg-viewBox'||!Array.isArray(g.nodes)||!Array.isArray(g.relations)) { invalid('inventory','Named rect nodes, ports and undirected edges are mandatory.');return checks; }
  if (g.nodes.length!==expected.length||g.relations.length!==edges.length||new Set(g.nodes.map(n=>n.id)).size!==expected.length||new Set(g.relations.map(e=>e.id)).size!==edges.length) { invalid('inventory','Missing or duplicate nodes/edges cannot pass.');return checks; }
  for (const n of expected) {
    const actual=g.nodes.find(a=>a.id===n.id), b=actual?.bbox||actual?.box;
    if(!actual||!(actual.shape==='rect'||String(actual.tag).toLowerCase()==='rect')||!box(b)||!Array.isArray(actual.ports)) {invalid('node-'+n.id,'Actual rect bbox and named ports required.');continue;}
    add('node-'+n.id,boxInside(b,observation.svgViewBox,0)&&['x','y','width','height'].every(k=>Math.abs(b[k]-n.bbox[k])<=2)?'pass':'regression','Measured node boundary matches its explicit layout contract.');
    if(actual.ports.length!==n.ports.length||new Set(actual.ports.map(p=>p.id)).size!==n.ports.length||n.ports.some(p=>!actual.ports.some(q=>q.id===p.id))){invalid('ports-'+n.id,'Every declared named legal port must be observed once.');continue;}
    for(const p of n.ports){const q=actual.ports.find(a=>a.id===p.id),onBoundary=point(q)&&q.x>=b.x-2&&q.x<=b.x+b.width+2&&q.y>=b.y-2&&q.y<=b.y+b.height+2&&Math.min(Math.abs(q.x-b.x),Math.abs(q.x-b.x-b.width),Math.abs(q.y-b.y),Math.abs(q.y-b.y-b.height))<=2;add('port-'+n.id+'-'+p.id,q&&near(p,q)&&onBoundary?'pass':'regression','Port reaches the actual rect boundary, rather than an old circle anchor.');}
  }
  for(const e of edges){
    const a=g.relations.find(r=>r.id===e.id);
    if(!a||a.from!==e.from||a.to!==e.to||a.fromPort!==e.fromPort||a.toPort!==e.toPort||!Array.isArray(a.points)||a.points.length<2||!a.points.every(point)||!Number.isFinite(a.strokeWidth)||typeof a.visible!=='boolean'||!Number.isFinite(a.opacity)||!('markerStart'in a)||!('markerEnd'in a)){invalid('edge-'+e.id,'Exact edge identity, endpoints, continuous points and visibility required.');continue;}
    const port=(node,id)=>g.nodes.find(n=>n.id===node)?.ports?.find(p=>p.id===id);
    const frame=observation.svgViewBox,inside=p=>p.x>=frame.x&&p.x<=frame.x+frame.width&&p.y>=frame.y&&p.y<=frame.y+frame.height;
    const valid=near(a.points[0],port(a.from,a.fromPort))&&near(a.points.at(-1),port(a.to,a.toPort))&&a.visible&&a.opacity>0&&a.strokeWidth>0&&a.points.every(inside)&&[a.markerStart,a.markerEnd].every(m=>m===null||m==='none');
    add('edge-'+e.id,valid?'pass':'regression','A visible undirected path reaches its two named legal ports and remains in frame.');
    const labels=(observation.texts||[]).filter(t=>box(t.bbox));
    const hits=labels.filter(t=>a.points.slice(1).some((p,i)=>segmentIntersectsBox(a.points[i],p,t.bbox,a.strokeWidth/2)));
    add('labels-'+e.id,hits.length?'regression':'pass',hits.length?'Path intersects actual text bbox: '+hits.map(t=>t.text).join(' / '):'No actual label bbox is crossed.');
  }
  return checks;
}
function evaluate({source, contract, coverage, readFile, currentInputs, manifest, manifestSha256, manifestPath, svgMetrics, readingMetrics, readingManifest, readingManifestSha256, actualPreserved, mode='current'}) {
  const checks=[], add=(id,status,detail)=>checks.push({id,status,detail}), need=(ok,id,detail)=>{add(id,ok?'pass':'contract-invalid',detail);return !!ok;};
  const finish=()=>{const invalid=checks.filter(c=>c.status==='contract-invalid').length,regressions=checks.filter(c=>c.status==='regression').length;return {format:'llm-wiki-keynote-result-v1',mode,status:invalid?'contract-invalid':regressions?'regression':'pass',visualApproval:false,revision:sha(source||''),summary:{checks:checks.length,invalid,regressions},checks};};
  if(!need(contract?.format==='llm-wiki-keynote-current-v1'&&contract.status==='current'&&contract.source===SOURCE&&coverage?.format==='llm-wiki-keynote-coverage-v1'&&coverage.status==='current','contract','Only completed current contracts can be evaluated.'))return finish();
  let deck;try{deck=parseDocument(source);}catch(e){need(false,'source',e.message);return finish();}
  const roles=contract.slides;
  if(!need(Array.isArray(roles)&&roles.length===deck.slides.length&&roles.every((r,i)=>r.slide===i+1)&&new Set(roles.map(r=>r.id)).size===roles.length,'slide-inventory','Current role inventory must cover every source slide exactly once.'))return finish();
  const files=new Map(); const read=name=>{if(!files.has(name)){try{files.set(name,readFile(name));}catch{files.set(name,null);}}return files.get(name);};
  function destination(target,id){
    if(!need(target&&typeof target.path==='string'&&typeof target.anchor==='string'&&Array.isArray(target.required)&&target.required.length,id+'-contract','Exact public path, anchor and meaning fragments are required.'))return;
    const text=read(target.path);if(!need(typeof text==='string',id+'-file','Required public support file exists.'))return;
    let contents;try{contents=section(text,target.anchor);}catch{contents=null;}
    need(contents!==null,id+'-anchor','Required public support anchor exists.');
    for(const [i,t]of target.required.entries())need(typeof t==='string'&&compact(t)&&contents!==null&&compact(contents).includes(compact(t)),id+'-meaning-'+i,'Required meaning remains in its declared public section: '+t);
  }
  const preserved=Object.entries(contract.preservation?.files||{});
  need(preserved.length>0&&preserved.every(([name,hash])=>actualPreserved?.[name]===hash),'preserved-inputs','Every declared original asset/archive/demo and historical baseline file retains its authoritative original bytes.');
  const topics=coverage.topics;
  if(need(Array.isArray(topics)&&topics.length===26&&topics.every(t=>Number.isInteger(t.originalSlide)&&t.originalSlide>=1&&t.originalSlide<=26)&&new Set(topics.map(t=>t.originalSlide)).size===26,'coverage-inventory','All 26 original topics require actual presentation, speaker and native reading destinations.')){
    for(const t of topics){const id='topic-'+t.originalSlide;
      need(typeof t.meaning==='string'&&t.meaning.trim()&&Array.isArray(t.presentation)&&t.presentation.length&&t.presentation.every(p=>roles.some(r=>r.id===p)),id+'-presentation','Every original topic belongs to real current roles.');
      destination(t.notes,id+'-notes');destination(t.speaker,id+'-speaker');destination(t.reading,id+'-reading');
    }
  }
  // Every public Markdown reference is resolved through the production material parser.
  for(const name of contract.publicMaterials||[]){const text=read(name);if(!need(typeof text==='string','public-file-'+name,'Every public guide exists.'))continue;
    try{renderMaterial(parseMaterial(text,{sourcePath:name}),href=>{
      if(/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href))return href;
      const [raw,anchor]=href.split('#'),target=path.posix.normalize(path.posix.join(path.posix.dirname(name),decodeURIComponent(raw||path.posix.basename(name))));
      const body=read(target);need(body!==null,'link-'+name+'-'+href,'Public local target exists.');
      if(anchor&&body!==null){if(target===SOURCE)need(Number.isInteger(Number(anchor))&&Number(anchor)>0&&Number(anchor)<=roles.length,'slide-link-'+name+'-'+anchor,'Numeric backlink points inside the current deck.');else if(target.endsWith('.md'))need(section(body,decodeURIComponent(anchor))!==null,'anchor-'+name+'-'+href,'Public material anchor exists.');}
      return href;
    });}catch(e){need(false,'public-parse-'+name,e.message);}
  }
  // The global support path is real and must reach the notes; a per-slide link is not required.
  const index=read(contract.materialIndex),notes=contract.notes;
  need(typeof index==='string'&&index.includes('./'+path.posix.basename(notes)),'notes-entry','Public materials index links to the current native notes.');
  for(const role of roles){const nodes=nativeNodes(deck.slides[role.slide-1]),targets=role.native||[];
    need(targets.length===nodes.length&&targets.every((t,i)=>t.tag===nodes[i].tag.toUpperCase()&&t.sourceLine===nodes[i].position.line&&same(t.text,value(nodes[i]))),'source-role-'+role.id,'No source text role may disappear from the measured inventory.');
    for(const [i,t]of targets.entries())need(Array.isArray(t.emphasis)&&JSON.stringify(t.emphasis)===JSON.stringify(walk(nodes[i]||{}).filter(n=>['strong','em'].includes(n.tag)).map(n=>({tag:n.tag.toUpperCase(),text:value(n)}))),'source-emphasis-'+role.id+'-'+i,'Every authored emphasis and its order is explicit.');
    for(const t of targets)need(Number.isFinite(t.minLogical)&&t.minLogical>0&&(['navigation','source','cover-subtitle'].includes(t.role)||t.minLogical>=32),'role-size-'+role.id+'-'+t.sourceLine,'Required text retains its explicit role and size floor.');
    const sourceNodes=[deck.slides[role.slide-1].heading,...deck.slides[role.slide-1].blocks].filter(Boolean).flatMap(walk),sourceImages=sourceNodes.filter(n=>n.tag==='img'),sourceLinks=sourceNodes.filter(n=>n.tag==='a');
    need((role.images||[]).length===sourceImages.length&&(role.images||[]).every((image,i)=>image.path===path.posix.normalize(path.posix.join(path.posix.dirname(SOURCE),sourceImages[i].attrs.src))),'source-images-'+role.id,'Every source image has its explicit current asset contract.');
    need((role.links||[]).length===sourceLinks.length&&(role.links||[]).every((link,i)=>link.href===sourceLinks[i].attrs.href),'source-links-'+role.id,'Every actual source link belongs to the current reading-link contract.');
    for(const image of role.images||[]){const asset=read(image.path);if(!need(typeof asset==='string','asset-'+image.path,'Current SVG asset exists.'))continue;
      destination(image.readingSupport,'svg-native-support-'+role.id);
      if(image.geometry){const nodes=[...asset.matchAll(/data-node-id="([^"]+)"/g)].map(m=>m[1]).sort(),edges=[...asset.matchAll(/data-edge-id="([^"]+)"/g)].map(m=>m[1]).sort();need(JSON.stringify(nodes)===JSON.stringify(image.geometry.nodes.map(n=>n.id).sort())&&JSON.stringify(edges)===JSON.stringify(image.geometry.relations.map(e=>e.id).sort()),'asset-geometry-'+role.id,'Every real SVG node and edge remains in the named geometry contract.');need(image.texts.every(t=>t.role==='body'&&t.minLogical>=32),'asset-relation-roles-'+role.id,'Required relation labels and explanations remain body roles.');}
      const actual=svgTexts(asset);need(Array.isArray(image.texts)&&actual.length===image.texts.length&&actual.every((t,i)=>same(t,image.texts[i].text)),'asset-texts-'+image.path,'Every actual SVG text, including metadata, has an explicit observation role.');
      need(/<svg\b[^>]*\bdata-material-kind="explanatory-reconstruction"/.test(asset),'asset-kind-'+image.path,'The actual SVG root marks the explanatory reconstruction.');
      for(const t of image.texts||[])need(Number.isFinite(t.minLogical)&&t.minLogical>0&&(['navigation','source'].includes(t.role)||t.minLogical>=32),'asset-role-'+image.path+'-'+t.text,'Relation explanations are required body, never small source metadata.');
    }
  }
  if(mode==='source')return finish();
  if(!need(mode==='current','mode','Use current for actual observations or source for explicitly static checks.'))return finish();
  const inputs=Object.entries(currentInputs||{});
  need(inputs.length>0&&[SOURCE,'blocks.css','blocks.js',CONTRACT,COVERAGE,'DESIGN.md'].every(p=>currentInputs?.[p])&&inputs.every(([p,h])=>manifest?.hashes?.[p]===h),'current-inputs','Exact current source, runtime, style, assets, public support and role/coverage hashes are mandatory.');
  need(manifest?.revision===sha(source)&&manifest?.source===SOURCE,'capture-source','Manifest identifies the actual canonical source bytes.');
  need(['presentation-stage-only','read-slide-crop'].includes(manifest?.captureMode),'capture-mode','Presentation observations come from the actual stage.');
  const isReading=manifest?.captureMode==='read-slide-crop';
  const presentationViewport=isReading?null:manifest?.observations?.[0]?.viewport;
  if(!isReading)need(contract.presentationViewports?.some(v=>equal(v,presentationViewport)),'presentation-viewport','Manifest viewport exactly matches an explicit current target.');
  function exactObservations(data,label,viewport){const list=data?.observations;return need(Array.isArray(list)&&list.length===roles.length&&new Set(list.map(o=>Number(o.index))).size===roles.length&&list.every(o=>Number.isInteger(Number(o.index))&&Number(o.index)>=0&&Number(o.index)<roles.length&&o.revision===sha(source)&&equal(o.viewport,viewport)),label+'-scope','Exactly one current observation per current slide and viewport is required.');}
  if(!isReading)exactObservations(manifest,'presentation',presentationViewport);
  if(isReading){readingManifest=manifest;readingManifestSha256=manifestSha256;}
  const readingViewport=readingMetrics?.viewport||readingMetrics?.observations?.[0]?.viewport;
  if(isReading){
  need(readingMetrics?.coordinateSpace==='native-reading-CSS-pixels'&&contract.readingViewports?.some(v=>equal(v,readingViewport)),'reading-viewport','Native reading CSS-pixel observations use an explicit current viewport.');
  need(readingMetrics?.revision===sha(source)&&equal(readingMetrics?.hashes,manifest?.hashes)&&readingMetrics?.captureManifest?.sha256===readingManifestSha256&&readingMetrics?.captureManifest?.path===manifestPath&&readingManifest?.revision===sha(source)&&equal(readingManifest?.hashes,manifest?.hashes),'reading-capture','Reading metrics identify their exact current manifest and complete matching input inventory.');
  exactObservations(readingMetrics,'reading',readingViewport);exactObservations(readingManifest,'reading-manifest',readingViewport);
  }
  if(!isReading)need(svgMetrics?.revision===sha(source)&&equal(svgMetrics?.hashes,manifest?.hashes)&&equal(svgMetrics?.viewport,presentationViewport)&&svgMetrics?.captureManifest?.sha256===manifestSha256&&svgMetrics?.captureManifest?.path===manifestPath,'svg-capture','SVG metrics identify the exact presentation manifest bytes, path, viewport and complete inputs.');
  const expectedImages=roles.flatMap(r=>(r.images||[]).map(i=>({role:r,image:i})));
  if(!isReading)need(Array.isArray(svgMetrics?.observations)&&svgMetrics.observations.length===expectedImages.length,'svg-inventory','Every current SVG is observed exactly once.');
  function textObservation(role,target,observation,reading){
    const id=(reading?'reading-':'present-')+role.id+'-'+target.sourceLine+'-'+target.tag+'-'+sha(target.text).slice(0,8);
    const matches=(observation?.typography||[]).filter(n=>n.tag===target.tag&&Number(n.sourceLine)===target.sourceLine&&same(n.text,target.text));
    if(!need(matches.length===1,id+'-identity','Exactly one actual sourceLine/tag/text Range observation is mandatory.'))return;
    const n=matches[0],rows=actualLines(n),font=parseFloat(n.fontSize),rect=n.logicalBox||n.rect,stage=observation.stage;
    if(!need(Array.isArray(n.lines)&&n.lines.length&&n.lines.every(l=>box(l))&&rows&&same(rows.map(l=>l.text).join(''),target.text),id+'-glyphs','Complete real Range glyph rows retain all source text.'))return;
    const scale=reading?1:stage?.width/1600;
    need(Number.isFinite(font)&&Number.isFinite(n.effectivePixels)&&Number.isFinite(scale)&&Math.abs(font*scale-n.effectivePixels)<.1,id+'-scale','Computed font and effective pixels agree with actual stage or native reading scale.');
    add(id+'-font',font+.05>=(reading?target.minReading||18:target.minLogical)?'pass':'regression','Actual rendered font retains its declared role size.');
    need(box(rect),id+'-box','Actual text box is measured.');
    if(box(rect))add(id+'-clipping',reading?boxInside(rect,{x:0,y:0,width:observation.rect?.width||readingViewport.width,height:observation.rect?.height||100000},2)&&n.lines.every(l=>boxInside(l,{x:0,y:0,width:observation.rect?.width||readingViewport.width,height:observation.rect?.height||100000},2))?'pass':'regression':boxInside(rect,{x:0,y:0,width:1600,height:900},2)&&n.lines.every(l=>boxInside(l,{x:0,y:0,width:1600,height:900},2))?'pass':'regression','All text and metadata glyphs remain in the actual frame.');
    need('copyRole'in n&&typeof n.directBody==='boolean'&&'parentGroup'in n,id+'-dom-observed','Copy role and actual DOM body/group membership are measured.');
    if(!['navigation','source'].includes(target.role))add(id+'-membership',n.copyRole==='navigation'?'regression':'pass','A required meaning cannot be reclassified as navigation metadata.');
    if(target.directBody!==undefined)add(id+'-body',n.directBody===target.directBody?'pass':'regression','Required common/body ownership remains in the native DOM.');
    if(target.parentGroup!==undefined)add(id+'-group',(target.parentGroup===null?n.parentGroup===null:n.parentGroup?.index===target.parentGroup)?'pass':'regression','Required group ownership matches its source role.');
    need(Array.isArray(n.breaks)&&n.breaks.length===(target.boundaries||[]).length,id+'-break-count','Every authored boundary is actually observed once.');
    for(const [i,b]of (target.boundaries||[]).entries())add(id+'-boundary-'+i,breakVerdict(n,b.before,b.after),'Authored breaks use the real before/after glyph y positions.');
    need(Array.isArray(n.emphasis)&&JSON.stringify(n.emphasis.map(e=>({tag:e.tag,text:e.text})))===JSON.stringify(target.emphasis||[]),id+'-emphasis','Actual strong/em text and source order remain observed.');
    const forbidden=target.forbiddenRows||[];add(id+'-rows',rows.some(r=>forbidden.some(t=>same(r.text,t)))?'regression':'pass','The designated predicates never become isolated actual glyph rows.');
  }
  for(const role of roles){const present=manifest?.observations?.find(o=>Number(o.index)===role.slide-1),reading=readingMetrics?.observations?.find(o=>Number(o.index)===role.slide-1);
    for(const t of role.native||[]){if(!isReading)textObservation(role,t,present,false);else textObservation(role,t,reading,true);}
    if(isReading&&reading)need(box(reading.rect),'reading-frame-'+role.id,'Native reading slide-local frame is actually measured.');
    if(isReading&&reading)need(Number.isFinite(reading.scrollWidth)&&Number.isFinite(reading.clientWidth),'reading-width-observed-'+role.id,'Native reading scroll/client width is actually measured.');
    if(isReading&&Number.isFinite(reading?.scrollWidth)&&Number.isFinite(reading?.clientWidth))add('reading-overflow-'+role.id,reading.scrollWidth<=reading.clientWidth+1?'pass':'regression','Current native reading has no unhandled horizontal overflow.');
    if(!isReading)for(const image of role.images||[]){const found=(svgMetrics?.observations||[]).filter(o=>o.slide===role.slide&&o.sourcePaths?.includes(image.path));if(!need(found.length===1,'svg-identity-'+role.id,'One current SVG observation matches its actual source path.'))continue;const o=found[0];
      need(o.assetSha256===manifest.hashes?.[image.path]&&o.materialKind===image.kind&&o.fit==='contain'&&box(o.renderedRect)&&box(o.svgViewBox),'svg-material-'+role.id,'Asset bytes, actual DOM classification and contain geometry are observed.');
      need(o.texts?.length===image.texts.length,'svg-text-inventory-'+role.id,'No SVG text, including metadata, can vanish from observations.');
      for(const t of image.texts){const targets=(o.texts||[]).filter(n=>same(n.text,t.text));if(!need(targets.length===1,'svg-text-'+role.id+'-'+t.text,'One complete SVG glyph observation is required.'))continue;const n=targets[0];
        need(box(n.bbox)&&Array.isArray(n.glyphRows)&&n.glyphRows.length&&n.glyphRows.every(box)&&same(n.glyphRows.map(r=>r.text).join(''),t.text),'svg-glyph-'+role.id+'-'+t.text,'Actual SVG glyph rows cannot be replaced with a text bbox alone.');
        const projected=parseFloat(n.fontSize)*o.renderedRect.width/o.svgViewBox.width/(present?.stage?.width/1600);
        need(Number.isFinite(n.stageLogicalPixels)&&Number.isFinite(projected)&&Math.abs(n.stageLogicalPixels-projected)<.1,'svg-contain-'+role.id+'-'+t.text,'Observed font includes actual contain projection and stage scale.');
        add('svg-font-'+role.id+'-'+t.text,n.stageLogicalPixels+.05>=t.minLogical?'pass':'regression','Required relation/document text keeps its role size after contain projection.');
        add('svg-clipping-'+role.id+'-'+t.text,boxInside(n.bbox,o.svgViewBox,0)&&n.glyphRows?.every(r=>boxInside(r,o.svgViewBox,0))?'pass':'regression','Metadata and required glyphs stay inside the actual SVG viewBox.');
      }
      if(image.geometry)for(const c of rectGeometry(o,image.geometry))checks.push({...c,id:'geometry-'+role.id+'-'+c.id});
    }
  }
  if(isReading){
  // Source link contracts also cover final request/notes access without adding per-slide navigation.
  const readingBase=manifest?.observations?.[0]?.url;
  const url=(href,base)=>{try{return new URL(href,base).href;}catch{return null;}};
  const expectedLink=href=>{
    if(/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href))return url(href,readingBase);
    if(href.startsWith('#'))return url(href,readingBase);
    const [raw,fragment]=href.split('#');
    if(raw.endsWith('.md'))return url(raw.replace(/\.md$/,'.html')+(fragment?'#'+fragment:''),readingBase);
    const sourcePath=path.posix.normalize(path.posix.join(path.posix.dirname(SOURCE),raw));
    const hash=manifest?.hashes?.[sourcePath];
    if(!hash)return null;
    return url('assets/'+hash.slice(0,12)+'-'+path.posix.basename(raw)+(fragment?'#'+fragment:''),readingBase);
  };
  need(typeof readingBase==='string'&&url(readingBase),'reading-url','Actual public reading URL establishes the exact local output path and origin.');
  for(const role of roles)for(const link of role.links||[]){const observed=readingMetrics?.observations?.find(o=>Number(o.index)===role.slide-1)?.links||[];const expected=expectedLink(link.href);need(expected&&observed.some(o=>url(o.href,readingBase)===expected),'reading-link-'+role.id+'-'+link.href,'Current native reading retains the exact output path, origin and anchor of the source link.');}
  const expectedIndex=url('materials/index.html',readingBase);
  need(expectedIndex&&readingMetrics?.supportNavigation?.some(l=>url(l.href,readingBase)===expectedIndex),'reading-support-navigation','The actual global learning-materials navigation uses the correct local path and origin.');
  const support=readingMetrics?.supportDocuments?.filter(d=>d.sourcePath===notes)||[];
  if(need(support.length===1,'native-notes-observation','Native public notes must be actually observed at this reading viewport.')){const n=support[0];
    need(url(n.url,readingBase)===url('materials/'+path.posix.basename(notes,'.md')+'.html',readingBase),'native-notes-url','Notes observation comes from the exact current public path and origin.');
    need(typeof n.text==='string'&&Array.isArray(n.anchors)&&Array.isArray(n.links),'native-notes-fields','Actual notes text, anchors and links are mandatory.');
    for(const t of topics||[])for(const fragment of t.notes?.required||[])need(compact(n.text).includes(compact(fragment)),'native-notes-topic-'+t.originalSlide+'-'+fragment,'Required relocated meaning is actually readable in the public notes.');
    for(const {image}of expectedImages)for(const fragment of image.readingSupport?.required||[])need(compact(n.text).includes(compact(fragment)),'native-svg-support-'+image.path+'-'+fragment,'The actual native notes retain the SVG excerpt, relationship and condition meaning.');
    for(const t of topics||[])need(n.anchors?.includes(t.notes?.anchor),'native-notes-anchor-'+t.originalSlide,'Each coverage anchor exists in the actual native notes DOM.');
    need(Number.isFinite(n.scrollWidth)&&Number.isFinite(n.clientWidth),'native-notes-width-observation','Actual public notes scroll/client width is measured.');
    if(Number.isFinite(n.scrollWidth)&&Number.isFinite(n.clientWidth))add('native-notes-overflow',n.scrollWidth<=n.clientWidth+1?'pass':'regression','The notes remain readable at this exact viewport.');
  }
  }
  return finish();
}
module.exports={evaluate,rectGeometry,nativeNodes,svgTexts,section,SOURCE,CONTRACT,COVERAGE};
if(require.main===module){
  try{
    const opts={},args=process.argv.slice(2);while(args.length){const key=args.shift();if(!['--mode','--manifest','--source','--svg-metrics','--reading-metrics','--output'].includes(key)||!args.length)throw Error('Usage: --mode current|source --source talks/llm-wiki/slides.md [--manifest path --svg-metrics path --reading-metrics path] [--output path]');opts[key.slice(2)]=args.shift();}
    const root=path.resolve(__dirname,'..'),mode=opts.mode||'current';if(path.resolve(opts.source||'')!==path.join(root,SOURCE))throw Error('The canonical --source is required.');
    const read=name=>{const p=path.resolve(root,name);if(path.isAbsolute(name)||!p.startsWith(root+path.sep))throw Error('Repository-relative files required.');return fs.readFileSync(p,'utf8');};
    const json=name=>JSON.parse(read(name));let manifest,svgMetrics,readingMetrics,readingManifest,manifestBytes,readingBytes;
    if(mode==='current'){if(!opts.manifest)throw Error('Current mode requires an exact capture manifest.');manifestBytes=read(opts.manifest);manifest=JSON.parse(manifestBytes);if(manifest.captureMode==='presentation-stage-only'){if(!opts['svg-metrics']||opts['reading-metrics'])throw Error('Presentation requires its exact --svg-metrics pair.');svgMetrics=json(opts['svg-metrics']);}else if(manifest.captureMode==='read-slide-crop'){if(!opts['reading-metrics']||opts['svg-metrics'])throw Error('Reading requires its exact --reading-metrics pair.');readingMetrics=json(opts['reading-metrics']);readingBytes=manifestBytes;readingManifest=manifest;}else throw Error('Unsupported current capture mode.');}
    const currentInputs=collectInputs({repoRoot:root,source:SOURCE}).inputs;for(const name of ['AGENTS.md','DESIGN.md',CONTRACT,COVERAGE,...Object.keys(manifest?.hashes||{})])currentInputs[name]=sha(fs.readFileSync(path.resolve(root,name)));
    const activeContract=json(CONTRACT),actualPreserved=Object.fromEntries(Object.keys(activeContract.preservation?.files||{}).map(name=>[name,sha(fs.readFileSync(path.resolve(root,name)))]));
    const result=evaluate({source:read(SOURCE),contract:activeContract,actualPreserved,coverage:json(COVERAGE),readFile:read,currentInputs,manifest,manifestPath:opts.manifest,manifestSha256:manifestBytes&&sha(manifestBytes),svgMetrics,readingMetrics,readingManifest,readingManifestSha256:readingBytes&&sha(readingBytes),mode});
    result.contract={path:CONTRACT,sha256:currentInputs[CONTRACT],coverage:{path:COVERAGE,sha256:currentInputs[COVERAGE]}};if(manifestBytes)result.evidence={manifest:{path:opts.manifest,sha256:sha(manifestBytes)},...(svgMetrics?{svgMetrics:{path:opts['svg-metrics'],sha256:sha(read(opts['svg-metrics']))}}:{readingMetrics:{path:opts['reading-metrics'],sha256:sha(read(opts['reading-metrics']))}})};
    const output=JSON.stringify(result,null,2)+'\n';if(opts.output)fs.writeFileSync(opts.output,output);process.stdout.write(output);process.exitCode=result.status==='pass'?0:result.status==='contract-invalid'?2:1;
  }catch(error){process.stderr.write(error.message+'\n');process.exitCode=2;}
}
