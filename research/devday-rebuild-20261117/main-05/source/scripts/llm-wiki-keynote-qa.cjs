#!/usr/bin/env node
'use strict';
// Current keynote checks are deliberately separate from the frozen 26-slide regressions.
// Real observations are mandatory in current mode. This never grants visual approval.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {parseDocument} = require('./markdown-document.cjs');
const {planSlide} = require('../blocks.js');
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
const domValue = n => n.type === 'text' ? n.value : (n.children || []).map(domValue).join('');
const identity = (a,b) => typeof a === 'string' && typeof b === 'string' && a.normalize() === b.normalize();
const stageBox = {x:0,y:0,width:1600,height:900};
const assetPath = src => path.posix.normalize(path.posix.join(path.posix.dirname(SOURCE),src));
const bound = (target, range) => Array.isArray(range) && range.length === 2 && Number.isFinite(target) && target >= range[0] && target <= range[1];
const closeBox = (a,b,tolerance=1) => box(a) && box(b) && ['x','y','width','height'].every(k=>Math.abs(a[k]-b[k])<=tolerance);
function sourceBreaks(node) {
  const parts=[''];
  function visit(child){
    if(child.tag==='br')parts.push('');
    else if(child.type==='text')parts[parts.length-1]+=child.value;
    else (child.children||[]).forEach(visit);
  }
  visit(node);
  return parts.slice(1).map((after,i)=>({before:parts[i],after}));
}
function legacyResultsNodes(slide) {
  const nodes=[];
  const field=(dataField,tag,text,domParentTag)=>{if(typeof text==='string'&&text.trim())nodes.push({type:'element',tag,dataField,domParentTag,children:[{type:'text',value:text}]});};
  if(Array.isArray(slide.title)){
    if(slide.title.length)field(null,'h1',slide.title.join(''),'DIV');
    slide.title.forEach((line,i)=>field('title.'+i,'span',line,'H1'));
  }else field('title','h1',slide.title,'DIV');
  field('subtitle','p',slide.subtitle,'DIV');
  field('source','p',slide.source,'DIV');
  (slide.items||[]).forEach((item,i)=>{
    field('items.'+i+'.label','div',item.label,'FIGURE');
    field('items.'+i+'.caption','figcaption',item.caption,'FIGURE');
  });
  return nodes;
}
function slideImages(slide, nodes) {
  if(slide.layout==='results')return (slide.items||[]).filter(i=>i.src).map(({src,alt,fit})=>({src,alt,fit:fit||'contain'}));
  return nodes.filter(n=>n.tag==='img').map(n=>({...n.attrs,fit:slide.view?.fit||'contain'}));
}
function pngSize(bytes) {
  return Buffer.isBuffer(bytes) && bytes.length>=24 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii',12,16)==='IHDR'
    ? [bytes.readUInt32BE(16),bytes.readUInt32BE(20)] : null;
}
function svgAttributes(source) {
  return Object.fromEntries([...(source.match(/<svg\b([^>]*)>/)?.[1]||'').matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
}
function svgShapes(source) {
  return [...source.matchAll(/<([\w:-]+)\b[^>]*?\bdata-observe-id="([^"]+)"/g)].map(m=>({id:m[2],tag:m[1]}));
}
const equal = (a,b) => !!a && !!b && JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
const box = b => b && ['x','y','width','height'].every(k => Number.isFinite(b[k])) && b.width > 0 && b.height > 0;
const point = p => p && Number.isFinite(p.x) && Number.isFinite(p.y);
const near = (a,b,e=2) => point(a) && point(b) && Math.hypot(a.x-b.x,a.y-b.y) <= e;
const nativeTags = new Set(['h1','h2','h3','h4','h5','h6','p','pre','li','th','td']);
function nativeNodes(slide) {
  if(slide?.layout==='results')return legacyResultsNodes(slide);
  const result=[];
  function visit(node,parent){
    const parentTag=parent?.tag==='blockquote'?'BLOCKQUOTE':['th','td'].includes(node.tag)&&parent?.tag==='tr'?'TR':null;
    if(nativeTags.has(node.tag)&&compact(value(node))&&!(node.tag==='li'&&(node.children||[]).some(c=>['p','ul','ol'].includes(c.tag))))result.push(parentTag?{...node,domParentTag:parentTag}:node);
    // Only an unwrapped, image-only block becomes a figure in the production renderer.
    const meaningful=node.tag==='p'?(node.children||[]).filter(c=>c.type!=='text'||c.value.trim()):[node];
    const figures=!parent&&(node.tag==='p'||node.tag==='img')&&meaningful.length&&meaningful.every(c=>c.tag==='img')?meaningful:[];
    for(const image of figures)if(image.attrs?.title)result.push({type:'element',tag:'figcaption',position:image.position||node.position,domParentTag:'FIGURE',children:[{type:'text',value:image.attrs.title}]});
    if(figures.length)return;
    for(const child of node.children||[])visit(child,node);
  }
  for(const node of [slide?.heading,...(slide?.blocks||[])].filter(Boolean))visit(node,null);
  return result;
}
function svgTexts(source) {
  const decode = x => x.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  return [...source.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(m => decode(m[1].replace(/<[^>]+>/g,'')));
}
function svgTextClasses(source) {
  return [...source.matchAll(/<text\b([^>]*)>[\s\S]*?<\/text>/g)].map(m=>{
    const classes=/\bclass=(['"])(.*?)\1/.exec(m[1]);
    return classes?classes[2].split(/\s+/).filter(Boolean):[];
  });
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
function nativeSectionText(source) {
  const material=parseMaterial('# Required section\n\n'+source);
  const text=token=>['softbreak','hardbreak'].includes(token.type)?' ':token.children?token.children.map(text).join(''):token.content||'';
  return material.tokens.filter(t=>['inline','fence','code_block'].includes(t.type)).map(text).join(' ');
}
function nativeParagraphChecks(document, contract) {
  const checks=[],add=(id,status,detail)=>checks.push({id,status,detail});
  if(!contract||typeof contract.path!=='string'||typeof contract.section!=='string'||typeof contract.text!=='string'||!contract.text||typeof contract.isQuote!=='boolean'||!Number.isFinite(contract.minReading)||contract.minReading<18||typeof contract.wordBreak!=='string'||typeof contract.sameRowPhrase!=='string'||!compact(contract.sameRowPhrase)||!compact(contract.text).includes(compact(contract.sameRowPhrase))){add('contract','contract-invalid','The exact native quotation, section, size and one meaning phrase are explicit.');return checks;}
  if(document?.sourcePath!==contract.path){add('document','contract-invalid','The exact measured public source document is required.');return checks;}
  const matches=(document?.paragraphs||[]).filter(p=>p&&p.section===contract.section&&p.isQuote===contract.isQuote&&same(p.text,contract.text));
  if(!Array.isArray(document?.paragraphs)||matches.length!==1){add('identity','contract-invalid','Exactly one measured native quote in the required public section must retain the complete text.');return checks;}
  const n=matches[0],font=parseFloat(n.fontSize);
  if(!Number.isFinite(font))add('font-observation','contract-invalid','Computed native CSS font size is actually observed.');
  else add('font',font+.05>=contract.minReading?'pass':'regression','The exact quotation retains its 18 CSS px reading size.');
  if(typeof n.wordBreak!=='string')add('word-break-observation','contract-invalid','The actual computed word-break is observed.');
  else add('word-break',n.wordBreak===contract.wordBreak?'pass':'regression','The quotation retains its observed Korean word preservation.');
  if(!Array.isArray(n.lines)||!n.lines.length||!n.lines.every(box)){add('glyphs','contract-invalid','Complete positive actual Range glyph rows are mandatory.');return checks;}
  const rows=actualLines(n);
  if(!rows||!same(rows.map(r=>r.text).join(''),contract.text)){add('glyphs','contract-invalid','Every exact source character remains in the actual glyph rows and order.');return checks;}
  add('glyphs','pass','All exact quotation characters are represented by measured glyph rows.');
  add('meaning-row',rows.some(row=>compact(row.text).includes(compact(contract.sameRowPhrase)))?'pass':'regression','The designated phrase “'+contract.sameRowPhrase+'” is read together on one actual glyph row.');
  return checks;
}
function supportLinkChecks(observed, contract, targetURL, frame) {
  const checks=[],add=(id,status,detail)=>checks.push({id,status,detail});
  if(!Array.isArray(observed)||observed.length!==(contract?1:0)){add('inventory','contract-invalid','Every declared adjacent support link is actually observed exactly once.');return checks;}
  if(!contract)return checks;
  const n=observed[0];if(!n||typeof n!=='object'){add('identity','contract-invalid','The declared support target requires a complete actual DOM observation.');return checks;}
  const rows=actualLines(n),font=parseFloat(n.fontSize);
  if(!Number.isInteger(Number(n.sourceLine))||Number(n.sourceLine)!==contract.sourceLine||typeof n.href!=='string'||typeof (n.label??n.text)!=='string'||!same(n.label??n.text,contract.label)||n.copyRole!=='support')add('identity','contract-invalid','The actual support origin, label, href and explicit support DOM role must match.');
  if(!Array.isArray(n.lines)||!n.lines.length||!n.lines.every(box)||!rows||!same(rows.map(r=>r.text).join(''),contract.label))add('glyphs','contract-invalid','The navigation label has complete actual Range glyph rows.');
  if(!Number.isFinite(font)||!Number.isFinite(n.effectivePixels)||Math.abs(font-n.effectivePixels)>.1)add('scale','contract-invalid','Support font/effective pixels are measured native CSS pixels.');
  else add('font',font+.05>=contract.minReading?'pass':'regression','The adjacent native support link retains the explicit 18 CSS px navigation role.');
  if(!box(n.rect)||!box(frame))add('box','contract-invalid','Actual slide-local support and reading frame rects are required.');
  else add('clipping',boxInside(n.rect,frame,2)&&n.lines?.every(l=>boxInside(l,frame,2))?'pass':'regression','The support label and every glyph stay inside the actual reading frame.');
  if(typeof n.visible!=='boolean')add('visibility','contract-invalid','Actual DOM visibility is observed rather than inferred from an authored link.');
  else add('visibility',n.visible?'pass':'regression','The adjacent navigation link is visibly available in reading.');
  let actual;try{actual=new URL(n.href,targetURL).href;}catch{}
  add('target',targetURL&&actual===targetURL?'pass':'contract-invalid','The link opens the exact registered public material section at the current origin.');
  return checks;
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
function correspondenceChecks(observation, expected) {
  const checks=[],add=(id,status,detail)=>checks.push({id,status,detail}),actual=observation?.geometry?.correspondences;
  if(!Array.isArray(expected)||!expected.length||!Array.isArray(actual)||actual.length!==expected.length||new Set(actual.map(e=>e.id)).size!==expected.length){add('inventory','contract-invalid','Every declared field correspondence requires one actual path observation.');return checks;}
  for(const edge of expected){const found=actual.find(e=>e.id===edge.id);
    if(!found||!Array.isArray(edge.points)||!edge.points.length||!Array.isArray(found.points)||found.points.length!==edge.points.length||!found.points.every(point)||!Number.isFinite(found.strokeWidth)||typeof found.visible!=='boolean'||!Number.isFinite(found.opacity)||!('markerStart'in found)||!('markerEnd'in found)){add(edge.id,'contract-invalid','Exact identity, complete actual path points, stroke and visibility are mandatory.');continue;}
    const frame=observation.svgViewBox,inside=box(frame)&&found.points.every(p=>p.x>=frame.x&&p.x<=frame.x+frame.width&&p.y>=frame.y&&p.y<=frame.y+frame.height);
    add(edge.id,found.points.every((p,i)=>near(p,edge.points[i]))&&inside&&found.visible&&found.opacity>0&&found.strokeWidth>0&&[found.markerStart,found.markerEnd].every(m=>m===null||m==='none')?'pass':'regression','The visible undirected field path matches its selected source locations at actual SVG scale.');
  }
  return checks;
}
function evaluate({source, contract, coverage, readFile, readAsset, currentInputs, manifest, manifestSha256, manifestPath, svgMetrics, readingMetrics, readingManifest, readingManifestSha256, actualPreserved, mode='current'}) {
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
    const renderedText=contents===null?null:nativeSectionText(contents);
    for(const [i,t]of target.required.entries())need(typeof t==='string'&&compact(t)&&renderedText!==null&&compact(renderedText).includes(compact(t)),id+'-meaning-'+i,'Required meaning remains in its actual native section text: '+t);
  }
  if(need(Array.isArray(contract.nativeParagraphs)&&contract.nativeParagraphs.length>0&&new Set(contract.nativeParagraphs.map(p=>p.id)).size===contract.nativeParagraphs.length,'native-paragraph-contract','The explicitly observed native quotation regression remains a required current role.'))for(const target of contract.nativeParagraphs){
    destination({path:target.path,anchor:target.section,required:[target.text,target.sameRowPhrase]},'native-paragraph-source-'+target.id);
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
  for(const role of roles){
    const slide=deck.slides[role.slide-1],nodes=nativeNodes(slide),targets=role.native||[];
    const plan=slide.layout==='blocks'?planSlide(slide):null;
    if(role.layout)need(role.layout===slide.layout&&role.composition===(plan?.composition||null)&&role.variant===(plan?.variant||slide.variant||null)&&(!plan||!plan.warnings.length),'source-layout-'+role.id,'The actual selected layout, composition and explicitly authored variant match the current role.');
    need(slide.layout==='blocks'||slide.layout==='results','source-layout-supported-'+role.id,'Every current layout has a complete native source inventory.');
    need(targets.length===nodes.length&&targets.every((t,i)=>{
      const n=nodes[i];
      const origin=slide.layout==='blocks'?t.sourceLine===n.position.line&&t.dataField===undefined:t.sourceLine===undefined&&t.dataField===n.dataField;
      return t.tag===n.tag.toUpperCase()&&origin&&identity(t.text,value(n))&&(t.domText===undefined||identity(t.domText,domValue(n)));
    }),'source-role-'+role.id,'Every source text role matches its AST line or legacy field, tag and exact text.');
    for(const [i,t]of targets.entries()){
      const node=nodes[i],figureLabel=plan?.composition==='gallery'&&plan.variant==='comparison';
      const requiredRole=node?.tag==='figcaption'?(figureLabel?'figure-label':'source-caption'):null;
      need(requiredRole ? t.role===requiredRole : !['figure-label','source-caption'].includes(t.role),'source-caption-role-'+role.id+'-'+i,'Caption and comparison label roles follow native FIGCAPTION and the authored gallery variant.');
      if(node?.domParentTag)need(t.domParentTag===node.domParentTag,'source-owner-'+role.id+'-'+i,'Source-derived figure, quote, table and legacy parent tags are explicit.');
      if(node?.domParentTag==='BLOCKQUOTE')need(!['navigation','source','source-caption'].includes(t.role)&&t.minLogical>=32,'source-quotation-role-'+role.id+'-'+i,'Quoted purposes and judgments remain primary body text.');
      if(node?.domParentTag==='TR')need(t.directBody===false&&!['navigation','source','source-caption'].includes(t.role)&&t.minLogical>=32&&t.minReading>=18,'source-table-role-'+role.id+'-'+i,'Required table text retains its row and body size.');
      if(node){
        const emphasis=walk(node).filter(n=>['strong','em'].includes(n.tag)).map(n=>({tag:n.tag.toUpperCase(),text:domValue(n)}));
        need(Array.isArray(t.emphasis)&&JSON.stringify(t.emphasis)===JSON.stringify(emphasis),'source-emphasis-'+role.id+'-'+i,'Every authored emphasis and its order is explicit.');
        need(JSON.stringify(t.boundaries||[])===JSON.stringify(sourceBreaks(node)),'source-breaks-'+role.id+'-'+i,'Every actual Markdown hard break is explicitly tied to its adjacent text.');
        if(slide.layout==='results'&&value(node).includes('\n'))need(JSON.stringify(t.rows)===JSON.stringify(value(node).split('\n')),'source-legacy-rows-'+role.id+'-'+i,'Every authored legacy newline has an explicit native glyph row contract.');
      }
      const floor=t.role==='figure-label'?26:['navigation','source','source-caption'].includes(t.role)?1:t.role==='cover-subtitle'?30:32;
      need(Number.isFinite(t.minLogical)&&t.minLogical>=floor&&Number.isFinite(t.minReading)&&t.minReading>=18,'role-size-'+role.id+'-'+i,'Native text retains its explicit role and minimum display size.');
    }
    const sourceNodes=[slide.heading,...(slide.blocks||[])].filter(Boolean).flatMap(walk),sourceImages=slideImages(slide,sourceNodes),sourceLinks=sourceNodes.filter(n=>n.tag==='a');
    need((role.images||[]).length===sourceImages.length&&(role.images||[]).every((image,i)=>{
      const src=sourceImages[i];
      return image.path===assetPath(src.src)&&image.alt===src.alt&&image.fit===src.fit;
    }),'source-images-'+role.id,'Every source image has an ordered asset, exact alt text and fit contract.');
    need((role.links||[]).length===sourceLinks.length&&(role.links||[]).every((link,i)=>link.href===sourceLinks[i].attrs.href&&link.text===value(sourceLinks[i])),'source-links-'+role.id,'Every source link has the exact target and label.');
    const authoredSupport=deck.slides[role.slide-1].view?.support;
    need(!authoredSupport&&!role.support||authoredSupport&&role.support&&authoredSupport.label===role.support.label&&authoredSupport.href===role.support.href&&role.support.sourceLine===authoredSupport.origin?.line,'source-support-'+role.id,'Declared reading navigation exactly matches the source metadata, including its control origin.');
    if(role.support){const target=role.support.target,parts=String(role.support.href||'').split('#'),supportPath=path.posix.normalize(path.posix.join(path.posix.dirname(SOURCE),parts[0]));
      need(typeof role.support.label==='string'&&role.support.label.trim()&&Number.isFinite(role.support.minReading)&&role.support.minReading>=18&&contract.publicMaterials.includes(target?.path)&&parts.length===2&&supportPath===target?.path&&parts[1]===target?.anchor,'support-target-'+role.id,'Adjacent support links use registered public Markdown, a real exact anchor, and the 18 px reading role.');
      destination(target,'adjacent-native-support-'+role.id);
    }
    need(!(role.images||[]).length||!!role.support,'image-adjacent-support-'+role.id,'Each scaled material has an explicit nearby link to its actual native reading section.');
    for(const image of role.images||[]){
      destination(image.readingSupport,'svg-native-support-'+role.id);
      need(role.support?.target?.path===image.readingSupport?.path&&role.support?.target?.anchor===image.readingSupport?.anchor,'image-support-target-'+role.id,'The material and its adjacent support link identify the same exact native section.');
      const extension=path.extname(image.path).toLowerCase();
      if(extension==='.png'){
        const bytes=readAsset?.(image.path),size=pngSize(bytes);
        need(size&&equal(size,image.intrinsic)&&image.kind==='editorial-adaptation','asset-png-'+image.path,'A declared prepared PNG has its actual header dimensions and editorial reading source.');
        continue;
      }
      const asset=read(image.path);
      if(!need(extension==='.svg'&&typeof asset==='string','asset-'+image.path,'Every current asset is present in a supported SVG or PNG format.'))continue;
      const attributes=svgAttributes(asset), viewBox=attributes.viewBox?.trim().split(/ +/).map(Number);
      need(attributes['data-material-kind']===image.kind&&['explanatory-reconstruction','editorial-adaptation'].includes(image.kind)&&
        (image.kind!=='editorial-adaptation'||identity(attributes['data-source'],image.materialSource)),'asset-kind-'+image.path,'Actual SVG marks its authored material type and, for edited materials, the underlying source.');
      need(equal([Number(attributes.width),Number(attributes.height)],image.intrinsic)&&equal(viewBox,[0,0,...image.intrinsic]),'asset-dimensions-'+image.path,'Compiled image natural dimensions match the SVG viewBox and authoring contract.');
      const shapes=svgShapes(asset);
      need(Array.isArray(image.shapes)&&image.shapes.length>0&&equal(shapes,image.shapes)&&new Set(shapes.map(t=>t.id)).size===shapes.length,'asset-shapes-'+image.path,'Every named SVG feature and tag is covered exactly once.');
      if(image.geometry){
        const nodes=[...asset.matchAll(/data-node-id="([^"]+)"/g)].map(m=>m[1]).sort(),edges=[...asset.matchAll(/data-edge-id="([^"]+)"/g)].map(m=>m[1]).sort();
        need(JSON.stringify(nodes)===JSON.stringify(image.geometry.nodes.map(n=>n.id).sort())&&JSON.stringify(edges)===JSON.stringify(image.geometry.relations.map(e=>e.id).sort()),'asset-geometry-'+role.id,'Every SVG node and edge remains in the named geometry contract.');
        need(image.texts.every(t=>t.role==='body'&&t.minLogical>=32),'asset-relation-roles-'+role.id,'Required relation labels remain body text.');
      }
      if(image.correspondences){
        const edges=[...asset.matchAll(/<path\b([^>]*data-edge-id="([^"]+)"[^>]*)>/g)];
        need(Array.isArray(image.correspondences)&&edges.length===image.correspondences.length&&edges.every(e=>!/[\s]data-(?:from|to)=/.test(e[1]))&&edges.every(e=>image.correspondences.some(c=>c.id===e[2])),'asset-correspondences-'+role.id,'Every field correspondence is distinct from document relation endpoints.');
      }
      const texts=svgTexts(asset),classes=svgTextClasses(asset);
      need(Array.isArray(image.texts)&&texts.length===image.texts.length&&texts.every((t,i)=>identity(t,image.texts[i].text)),'asset-texts-'+image.path,'Every SVG text, including surface details, has an exact ordered observation role.');
      for(const [i,t]of (image.texts||[]).entries()){
        const surface=t.role==='surface-detail'&&image.kind==='editorial-adaptation';
        if(t.role==='source')need(typeof t.sourceClass==='string'&&/^[\w-]+$/.test(t.sourceClass)&&classes[i]?.includes(t.sourceClass),'asset-source-role-'+image.path+'-'+i,'Provenance is tied to the source SVG text class.');
        const small=surface||['source','navigation'].includes(t.role);
        need(Number.isFinite(t.minLogical)&&t.minLogical>0&&(!small||typeof t.roleReason==='string'&&t.roleReason.trim())&&(small||t.minLogical>=32),'asset-role-'+image.path+'-'+i,'Primary labels and contextual document detail keep their explicit roles and size floors.');
      }
    }
  }
  if(mode==='source')return finish();
  if(!need(mode==='current','mode','Use current for actual observations or source for explicitly static checks.'))return finish();
  const inputs=Object.entries(currentInputs||{});
  need(inputs.length>0&&[SOURCE,'blocks.css','blocks.js',CONTRACT,COVERAGE,'DESIGN.md'].every(p=>currentInputs?.[p])&&equal(currentInputs,manifest?.hashes),'current-inputs','Exact current source, runtime, style, assets, public support and role/coverage hashes are mandatory.');
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
  const expectedSVGs=expectedImages.filter(({image})=>image.path.endsWith('.svg'));
  if(!isReading)need(Array.isArray(svgMetrics?.observations)&&svgMetrics.observations.length===expectedSVGs.length,'svg-inventory','Every current SVG is observed exactly once.');
  function textObservation(role,target,observation,reading){
    const legacy=Object.hasOwn(target,'dataField');
    const id=(reading?'reading-':'present-')+role.id+'-'+(legacy?target.dataField:target.sourceLine)+'-'+target.tag+'-'+sha(target.text).slice(0,8);
    const matches=(observation?.typography||[]).filter(n=>n.tag===target.tag&&identity(n.text,target.domText??target.text)&&
      Object.hasOwn(n,'dataField')&&(legacy?n.sourceLine==null&&n.dataField===target.dataField:n.dataField===null&&Number(n.sourceLine)===target.sourceLine));
    if(!need(matches.length===1,id+'-identity','Exactly one native Range observation matches the real Markdown sourceLine or legacy data-field, tag, and exact text.'))return null;
    const n=matches[0],rows=actualLines(n),font=parseFloat(n.fontSize),rect=n.logicalBox||n.rect,stage=observation.stage;
    if(!need(Array.isArray(n.lines)&&n.lines.length&&n.lines.every(l=>box(l))&&rows&&same(rows.map(l=>l.text).join(''),target.text),id+'-glyphs','Complete real Range glyph rows retain all source text.'))return;
    const scale=reading?1:stage?.width/1600;
    need(Number.isFinite(font)&&Number.isFinite(n.effectivePixels)&&Number.isFinite(scale)&&Math.abs(font*scale-n.effectivePixels)<.1,id+'-scale','Computed font and effective pixels agree with actual stage or native reading scale.');
    add(id+'-font',font+.05>=(reading?target.minReading||18:target.minLogical)?'pass':'regression','Actual rendered font retains its declared role size.');
    need(box(rect),id+'-box','Actual text box is measured.');
    if(box(rect))add(id+'-clipping',reading?boxInside(rect,{x:0,y:0,width:observation.rect?.width||readingViewport.width,height:observation.rect?.height||100000},2)&&n.lines.every(l=>boxInside(l,{x:0,y:0,width:observation.rect?.width||readingViewport.width,height:observation.rect?.height||100000},2))?'pass':'regression':boxInside(rect,{x:0,y:0,width:1600,height:900},2)&&n.lines.every(l=>boxInside(l,{x:0,y:0,width:1600,height:900},2))?'pass':'regression','All text and metadata glyphs remain in the actual frame.');
    need('copyRole'in n&&typeof n.directBody==='boolean'&&'parentGroup'in n,id+'-dom-observed','Copy role and actual DOM body/group membership are measured.');
    if(target.domParentTag){
      if(need(n.domParent&&typeof n.domParent.tag==='string',id+'-parent-observed','Actual quotation/figure DOM parent tags are mandatory.'))add(id+'-parent',n.domParent.tag===target.domParentTag?'pass':'regression','The actual quotation paragraph or caption remains in its source-derived parent.');
    }
    if(target.role==='figure-label')add(id+'-figure-label',n.copyRole==='figure-label'?'pass':'regression','A comparison label retains its actual native FIGCAPTION role.');
    if(!['navigation','source','source-caption'].includes(target.role))add(id+'-membership',n.copyRole==='navigation'?'regression':'pass','A required meaning cannot be reclassified as navigation metadata.');
    if(target.directBody!==undefined)add(id+'-body',n.directBody===target.directBody?'pass':'regression','Required common/body ownership remains in the native DOM.');
    if(target.parentGroup!==undefined)add(id+'-group',(target.parentGroup===null?n.parentGroup===null:n.parentGroup?.index===target.parentGroup)?'pass':'regression','Required group ownership matches its source role.');
    need(Array.isArray(n.breaks)&&n.breaks.length===(target.boundaries||[]).length,id+'-break-count','Every authored boundary is actually observed once.');
    for(const [i,b]of (target.boundaries||[]).entries())add(id+'-boundary-'+i,breakVerdict(n,b.before,b.after),'Authored breaks use the real before/after glyph y positions.');
    need(Array.isArray(n.emphasis)&&JSON.stringify(n.emphasis.map(e=>({tag:e.tag,text:e.text})))===JSON.stringify(target.emphasis||[]),id+'-emphasis','Actual strong/em text and source order remain observed.');
    const forbidden=target.forbiddenRows||[];add(id+'-rows',rows.some(r=>forbidden.some(t=>same(r.text,t)))?'regression':'pass','The designated predicates never become isolated actual glyph rows.');
    if(target.rows&&!reading)add(id+'-exact-rows',rows.length===target.rows.length&&rows.every((r,i)=>same(r.text,target.rows[i]))?'pass':'regression','The authored stage lines retain their real Korean glyph rows.');
    if(target.rowWidthRatio&&!reading)add(id+'-row-width-ratio',rows.length===2&&bound(rows[1].width/rows[0].width,target.rowWidthRatio)?'pass':'regression','The highlighted second line fits visibly inside the first line.');
    return n;
  }
  function imageObservation(observed, images, role, reading){
    const collection=observed?.images;
    if(!need(Array.isArray(collection)&&collection.length===images.length,'image-inventory-'+role.id,'Every current image has exactly one ordered, decoded native image.'))return [];
    return images.map((image,i)=>{
      const n=collection[i],id=role.id+'-'+i,hash=manifest.hashes?.[image.path];
      const basename=path.posix.basename(image.path),output='assets/'+hash?.slice(0,12)+'-'+basename;
      const rect=reading?n.box:n.logicalBox,frame=reading?observed.rect:stageBox;
      const required=need(n.src===output&&typeof hash==='string'&&n.alt===image.alt&&n.fit===image.fit&&
        equal([n.naturalWidth,n.naturalHeight],image.intrinsic)&&(!reading||n.complete===true)&&box(rect)&&box(frame),
        'image-observation-'+id,'Actual bound image bytes, fit, alt, intrinsic dimensions and display rect match the source.');
      if(required)add('image-frame-'+id,boxInside(rect,frame)?'pass':'regression','The complete native media rect fits within its owning slide.');
      if(role.variant==='unframed'&&!reading){
        if(need(box(n.frameLogicalBox)&&Number.isFinite(n.frameBorder)&&typeof n.frameBackground==='string','result-frame-observed-'+id,'The actual results wrapper geometry, border and backing color are measured.')){
          const aspect=n.naturalWidth/n.naturalHeight;
          add('result-unframed-'+id,closeBox(rect,n.frameLogicalBox)&&Math.abs(rect.width/rect.height-aspect)<.01&&n.frameBorder===0&&n.frameBackground==='rgba(0, 0, 0, 0)'?'pass':'regression','The results frame has no backing band or border and follows the actual image aspect ratio.');
        }
      }
      return required?n:null;
    });
  }
  function shapeObservations(o,image,id){
    if(!need(o.geometry?.coordinateSpace==='root-svg-viewBox'&&Array.isArray(o.geometry.shapes)&&o.geometry.shapes.length===image.shapes.length&&
      new Set(o.geometry.shapes.map(s=>s.id)).size===image.shapes.length,'svg-shape-inventory-'+id,'Each named asset feature needs one actual root-viewBox geometry observation.'))return;
    for(const shape of image.shapes){
      const found=o.geometry.shapes.find(s=>s.id===shape.id);
      const shapeBox=found?.bbox,hasBox=shapeBox&&['x','y','width','height'].every(k=>Number.isFinite(shapeBox[k]))&&shapeBox.width>=0&&shapeBox.height>=0&&(shapeBox.width>0||shapeBox.height>0);
      if(need(found?.tag===shape.tag&&hasBox&&typeof found.visible==='boolean'&&Number.isFinite(found.opacity)&&typeof found.fill==='string'&&typeof found.stroke==='string'&&Number.isFinite(found.strokeWidth),'svg-shape-'+id+'-'+shape.id,'Actual feature tag, bounding box, paint, stroke and visibility are mandatory.')){
        const contained=boxInside({...shapeBox,width:Math.max(.01,shapeBox.width),height:Math.max(.01,shapeBox.height)},o.svgViewBox,1.2);
        add('svg-shape-visible-'+id+'-'+shape.id,found.visible&&found.opacity>0&&contained?'pass':'regression','Each meaningful window, article, document or connection feature is visible inside its asset.');
      }
    }
  }
  function slideArrangement(role,present,images,native,svgs){
    if(role.variant==='comparison'){
      const [left,right]=images.map(n=>n?.logicalBox),[leftLabel,rightLabel]=native.map(n=>n?.lines?.[0]);
      if(need([left,right,leftLabel,rightLabel].every(box),'comparison-arrangement','Both actual windows and both native caption glyph rects are mandatory.')){
        const g=right.x-left.x-left.width;
        const reveal=Math.abs(left.width-right.width)<1&&Math.abs(left.height-right.height)<1&&Math.abs(left.y-right.y)<1&&bound(g,role.arrangement.gap);
        const caption=(image,label)=>bound(label.y-image.y-image.height,role.arrangement.captionGap)&&Math.abs(label.x+label.width/2-image.x-image.width/2)<10;
        add('comparison-arrangement',reveal&&caption(left,leftLabel)&&caption(right,rightLabel)&&Math.abs(leftLabel.y-rightLabel.y)<1?'pass':'regression','The two windows keep a shared baseline and readable gap, with each caption near its owning surface.');
      }
    }
    if(role.variant==='quote-card'){
      const card=present?.quoteCardLogicalBox,image=images[0]?.logicalBox,o=svgs[0],text=native[0]?.logicalBox;
      if(need([card,image,text,o?.svgViewBox,o?.renderedRect].every(box)&&o?.texts?.every(t=>box(t.bbox)),'article-card-arrangement','The actual quote-card, article contain rect and glyph geometry are available.')){
        const stage=present.stage,scale=stage.width/1600;
        const projected=o.renderedRect.width/o.svgViewBox.width/scale;
        const x=(o.renderedRect.x-stage.x)/scale, y=(o.renderedRect.y-stage.y)/scale;
        const article={x,y,width:o.svgViewBox.width*projected,height:o.svgViewBox.height*projected};
        const ink=o.texts.map(t=>({ x:x+t.bbox.x*projected,y:y+t.bbox.y*projected,width:t.bbox.width*projected,height:t.bbox.height*projected }));
        const collision=ink.some(b=>b.x+b.width>card.x&&b.x<card.x+card.width&&b.y+b.height>card.y&&b.y<card.y+card.height);
        add('article-card-overlap',bound(article.x+article.width-card.x,role.arrangement.overlap)&&bound(card.height,role.arrangement.cardHeight)&&
          !collision&&boxInside(text,card,0)&&boxInside(card,stageBox,0)?'pass':'regression','Article and card overlap shallowly, without covering actual article glyphs or clipping the native quote.');
      }
    }
    if(role.variant==='unframed'&&images.every(Boolean)){
      const [a,b,c,d]=images.map(n=>n.logicalBox);
      const aligned=Math.abs(a.x-c.x)<1&&Math.abs(b.x-d.x)<1&&Math.abs(a.y-b.y)<1&&Math.abs(c.y-d.y)<1;
      const rightGap=b.x-a.x-a.width,bottomGap=c.y-a.y-a.height;
      add('result-grid',aligned&&bound(rightGap,role.arrangement.gap)&&bound(bottomGap,role.arrangement.gap)?'pass':'regression','The four unframed media cells keep their ordered two-by-two rhythm and actual gaps.');
    }
  }
  for(const role of roles){
    const present=manifest?.observations?.find(o=>Number(o.index)===role.slide-1),reading=readingMetrics?.observations?.find(o=>Number(o.index)===role.slide-1);
    const observed=isReading?reading:present;
    const actualTypography=observed?.typography;
    need(Array.isArray(actualTypography)&&actualTypography.length===role.native.length,'native-inventory-'+role.id,'Every actual native measured field or AST node appears exactly once.');
    const native=role.native.map(t=>textObservation(role,t,observed,isReading));
    if(isReading&&reading)need(box(reading.rect),'reading-frame-'+role.id,'Native reading slide-local frame is measured.');
    if(isReading&&reading)need(Number.isFinite(reading.scrollWidth)&&Number.isFinite(reading.clientWidth),'reading-width-observed-'+role.id,'Native reading scroll/client width is measured.');
    if(isReading&&Number.isFinite(reading?.scrollWidth)&&Number.isFinite(reading?.clientWidth))add('reading-overflow-'+role.id,reading.scrollWidth<=reading.clientWidth+1?'pass':'regression','Current native reading has no unhandled horizontal overflow.');
    const images=imageObservation(observed,role.images||[],role,isReading),svgs=[];
    if(isReading){
      need(equal(reading?.images,present?.images),'reading-image-pair-'+role.id,'Reading metrics agree with the exact manifest image observations.');
      continue;
    }
    for(const [index,image]of (role.images||[]).entries()){
      if(!image.path.endsWith('.svg'))continue;
      const id=role.id+'-'+index,found=(svgMetrics?.observations||[]).filter(o=>o.slide===role.slide&&o.sourcePaths?.includes(image.path));
      if(!need(found.length===1,'svg-identity-'+id,'One SVG observation matches the exact stage and source path.'))continue;
      const o=found[0],n=images[index];
      svgs[index]=o;
      if(!need(n&&o.src===n.src&&o.assetSha256===manifest.hashes?.[image.path]&&o.materialKind===image.kind&&o.fit===image.fit&&
        box(o.renderedRect)&&box(o.svgViewBox)&&equal([o.svgViewBox.width,o.svgViewBox.height],image.intrinsic),'svg-material-'+id,'Actual stage asset bytes, classification, fit and viewBox match.'))continue;
      shapeObservations(o,image,id);
      const containScale=Math.min(n.box.width/o.svgViewBox.width,n.box.height/o.svgViewBox.height);
      const width=o.svgViewBox.width*containScale,height=o.svgViewBox.height*containScale;
      const projection={x:n.box.x+(n.box.width-width)/2,y:n.box.y+(n.box.height-height)/2,width,height};
      need(closeBox(o.renderedRect,projection,.2),'svg-projection-'+id,'The observed SVG projection corresponds to the actual contain image box.');
      need(Array.isArray(o.texts)&&o.texts.length===image.texts.length,'svg-text-inventory-'+id,'Every SVG text node and ordered row must be observed.');
      for(const [i,t]of image.texts.entries()){
        const glyph=o.texts?.[i],key=id+'-'+i;
        if(!need(glyph?.tag?.toLowerCase()==='text'&&identity(glyph.text,t.text)&&box(glyph.bbox)&&Array.isArray(glyph.glyphRows)&&glyph.glyphRows.length&&
          glyph.glyphRows.every(box)&&same(glyph.glyphRows.map(r=>r.text).join(''),t.text),'svg-glyph-'+key,'Each ordered SVG text node has the complete actual glyph rows.'))continue;
        const projected=parseFloat(glyph.fontSize)*containScale/(present.stage.width/1600);
        need(Number.isFinite(glyph.stageLogicalPixels)&&Number.isFinite(projected)&&Math.abs(glyph.stageLogicalPixels-projected)<.1,'svg-contain-'+key,'Observed font includes actual contain projection and stage scale.');
        add('svg-font-'+key,glyph.stageLogicalPixels+.05>=t.minLogical?'pass':'regression','The SVG text keeps its declared displayed role size.');
        add('svg-clipping-'+key,boxInside(glyph.bbox,o.svgViewBox,0)&&glyph.glyphRows.every(r=>boxInside(r,o.svgViewBox,0))?'pass':'regression','Every actual SVG glyph remains inside the asset viewBox.');
      }
      if(image.geometry)for(const c of rectGeometry(o,image.geometry))checks.push({...c,id:'geometry-'+role.id+'-'+c.id});
      if(image.correspondences)for(const c of correspondenceChecks(o,image.correspondences))checks.push({...c,id:'correspondence-'+role.id+'-'+c.id});
    }
    if(role.arrangement)slideArrangement(role,present,images,native,svgs);
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
  for(const role of roles){const observation=readingMetrics?.observations?.find(o=>Number(o.index)===role.slide-1),frame=observation?.rect;for(const c of supportLinkChecks(observation?.supportLinks,role.support,role.support?expectedLink(role.support.href):null,box(frame)?{x:0,y:0,width:frame.width,height:frame.height}:null))checks.push({...c,id:'reading-support-'+role.id+'-'+c.id});}
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
    for(const role of roles)if(role.support?.target?.path===notes)need(n.anchors?.includes(role.support.target.anchor),'native-adjacent-support-anchor-'+role.id,'The exact nearby navigation target exists in the observed native document.');
    for(const target of contract.nativeParagraphs||[])if(target.path===notes)for(const c of nativeParagraphChecks(n,target))checks.push({...c,id:'native-paragraph-'+target.id+'-'+c.id});
    need(Number.isFinite(n.scrollWidth)&&Number.isFinite(n.clientWidth),'native-notes-width-observation','Actual public notes scroll/client width is measured.');
    if(Number.isFinite(n.scrollWidth)&&Number.isFinite(n.clientWidth))add('native-notes-overflow',n.scrollWidth<=n.clientWidth+1?'pass':'regression','The notes remain readable at this exact viewport.');
  }
  }
  return finish();
}
module.exports={evaluate,rectGeometry,correspondenceChecks,supportLinkChecks,nativeParagraphChecks,nativeNodes,svgTexts,section,SOURCE,CONTRACT,COVERAGE};
if(require.main===module){
  try{
    const opts={},args=process.argv.slice(2);while(args.length){const key=args.shift();if(!['--mode','--manifest','--source','--svg-metrics','--reading-metrics','--output'].includes(key)||!args.length)throw Error('Usage: --mode current|source --source talks/llm-wiki/slides.md [--manifest path --svg-metrics path --reading-metrics path] [--output path]');opts[key.slice(2)]=args.shift();}
    const root=path.resolve(__dirname,'..'),mode=opts.mode||'current';if(path.resolve(opts.source||'')!==path.join(root,SOURCE))throw Error('The canonical --source is required.');
    const read=name=>{const p=path.resolve(root,name);if(path.isAbsolute(name)||!p.startsWith(root+path.sep))throw Error('Repository-relative files required.');return fs.readFileSync(p,'utf8');};
    const json=name=>JSON.parse(read(name));let manifest,svgMetrics,readingMetrics,readingManifest,manifestBytes,readingBytes;
    if(mode==='current'){if(!opts.manifest)throw Error('Current mode requires an exact capture manifest.');manifestBytes=read(opts.manifest);manifest=JSON.parse(manifestBytes);if(manifest.captureMode==='presentation-stage-only'){if(!opts['svg-metrics']||opts['reading-metrics'])throw Error('Presentation requires its exact --svg-metrics pair.');svgMetrics=json(opts['svg-metrics']);}else if(manifest.captureMode==='read-slide-crop'){if(!opts['reading-metrics']||opts['svg-metrics'])throw Error('Reading requires its exact --reading-metrics pair.');readingMetrics=json(opts['reading-metrics']);readingBytes=manifestBytes;readingManifest=manifest;}else throw Error('Unsupported current capture mode.');}
    const currentInputs=collectInputs({repoRoot:root,source:SOURCE}).inputs;for(const name of ['AGENTS.md','DESIGN.md',CONTRACT,COVERAGE,])currentInputs[name]=sha(fs.readFileSync(path.resolve(root,name)));
    const activeContract=json(CONTRACT),actualPreserved=Object.fromEntries(Object.keys(activeContract.preservation?.files||{}).map(name=>[name,sha(fs.readFileSync(path.resolve(root,name)))]));
    const result=evaluate({source:read(SOURCE),contract:activeContract,actualPreserved,coverage:json(COVERAGE),readFile:read,readAsset:name=>fs.readFileSync(path.join(root,name)),currentInputs,manifest,manifestPath:opts.manifest,manifestSha256:manifestBytes&&sha(manifestBytes),svgMetrics,readingMetrics,readingManifest,readingManifestSha256:readingBytes&&sha(readingBytes),mode});
    result.contract={path:CONTRACT,sha256:currentInputs[CONTRACT],coverage:{path:COVERAGE,sha256:currentInputs[COVERAGE]}};if(manifestBytes)result.evidence={manifest:{path:opts.manifest,sha256:sha(manifestBytes)},...(svgMetrics?{svgMetrics:{path:opts['svg-metrics'],sha256:sha(read(opts['svg-metrics']))}}:{readingMetrics:{path:opts['reading-metrics'],sha256:sha(read(opts['reading-metrics']))}})};
    const output=JSON.stringify(result,null,2)+'\n';if(opts.output)fs.writeFileSync(opts.output,output);process.stdout.write(output);process.exitCode=result.status==='pass'?0:result.status==='contract-invalid'?2:1;
  }catch(error){process.stderr.write(error.message+'\n');process.exitCode=2;}
}
