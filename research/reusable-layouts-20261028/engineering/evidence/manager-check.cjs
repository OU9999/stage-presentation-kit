'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const repo=path.resolve(__dirname,'../../../..');
const {parseDocument}=require(path.join(repo,'scripts/markdown-document.cjs'));
const model=require(path.join(repo,'deck-model.js'));
class DOMNode {
 constructor(tag){this.tagName=tag;this.children=[];this.attrs={};this.dataset={};this.className='';this.style={setProperty:(key,value)=>{this.style[key]=String(value);}};this.classList={add:(...names)=>{this.className+=' '+names.join(' ');}};}
 append(...nodes){for(const node of nodes)this.children.push(...(node.tagName==='#fragment'?node.children:[node]));}
 setAttribute(key,value){this.attrs[key]=String(value);}
 addEventListener(){}
 set textContent(value){this.value=String(value);this.children=[];}
 get textContent(){return this.value!==undefined?this.value:this.children.map(node=>node.textContent).join('');}
}
const context={window:{STAGE_MODEL:model},document:{createElement:tag=>new DOMNode(tag),createElementNS:(_ns,tag)=>new DOMNode(tag),createTextNode:value=>Object.assign(new DOMNode('#text'),{value}),createDocumentFragment:()=>new DOMNode('#fragment')}};
vm.runInNewContext(fs.readFileSync(path.join(repo,'blocks.js'),'utf8'),context);
const renderer=context.window.StageBlocks;
const all=node=>[node,...node.children.flatMap(all)];
const astAll=node=>[node,...(node.children||[]).flatMap(astAll)];
const plain=node=>node.type==='text'?node.value:(node.children||[]).map(plain).join('');
const visible=node=>['svg','figcaption'].includes(node.tagName)||node.className.split(/\s+/).includes('md-wall-caption')?'':node.value!==undefined?node.value:node.children.map(visible).join('');
const normal=value=>value.replace(/\s+/g,' ').trim();
const control=(settings)=>'<!-- stage-slide\n'+settings+'\n-->\n';
const results=[];
function check(name,source,expected,variant){
 const deck=parseDocument(source,{id:name,sourcePath:name+'/slides.md'});assert.deepEqual(model.validateDeck(deck),[]);
 const before=JSON.stringify(deck);
 const slides=deck.slides.map(slide=>{
  const result=renderer.renderSlide(slide,{sourcePath:deck.document.sourcePath}),nodes=all(result.body),canonical=[slide.heading,...slide.blocks].filter(Boolean),sourceNodes=canonical.flatMap(astAll);
  if(expected)assert.equal(result.composition,expected,name);if(variant)assert.equal(result.variant,variant,name);
  assert.equal(normal(visible(result.body)),normal(canonical.map(plain).join('')),name+' text/order');
  const sourceImages=sourceNodes.filter(n=>n.tag==='img'),images=nodes.filter(n=>n.tagName==='img');assert.equal(images.length,sourceImages.length,name+' image count');
  sourceImages.forEach((image,index)=>{for(const key of ['src','alt','title'])assert.equal(images[index].attrs[key],image.attrs?.[key],name+' '+key);});
  assert.deepEqual(nodes.filter(n=>n.tagName==='a').map(n=>n.attrs.href),sourceNodes.filter(n=>n.tag==='a').map(n=>n.attrs.href),name+' link relation');
  assert.equal(nodes.filter(n=>n.tagName==='h1').length,sourceNodes.filter(n=>n.tag==='h1').length,name+' H1 once');
  const sourceOrdered=sourceNodes.filter(n=>n.tag==='ol'),ordered=nodes.filter(n=>n.tagName==='ol');assert.equal(ordered.length,sourceOrdered.length,name+' ordered list');
  sourceOrdered.forEach((node,index)=>assert.equal(ordered[index].attrs.start,node.attrs?.start===undefined?undefined:String(node.attrs.start),name+' list start'));
  const preview=renderer.renderSlide(slide,{preview:true});assert.ok(!all(preview.body).some(n=>n.tagName==='a'),name+' preview links');
  return {composition:result.composition,variant:result.variant||null,images:images.length,warnings:result.warnings?.length||0};
 });
 assert.equal(JSON.stringify(deck),before,name+' AST unchanged');results.push({name,slides});
}
for(const name of ['product-notes','team-learning','photo-essay','community-exhibit'])check(name,fs.readFileSync(path.join(repo,'talks',name,'slides.md'),'utf8'));
function groups(count){return Array.from({length:count},(_,index)=>'## 자료 '+index+'\n\n'+['![설명](picture.svg "출처")','**024** 개','> 원문 인용','- 순서 없는 항목\n- 다음 항목','의미를 유지하는 본문'][index%5]).join('\n\n');}
for(const count of [5,8,12])check('balanced-'+count,control('compose: bento')+'# 자료\n\n'+groups(count),'bento','balanced');
for(const variant of ['seoul','recap'])check('preset-'+variant,control('compose: bento\nvariant: '+variant)+groups(12),'bento',variant);
check('preset-count-mismatch',control('compose: bento\nvariant: seoul')+groups(8),'document');
check('bento-prelude',control('compose: bento')+'# 자료\n\n전체 사실 조건\n\n'+groups(5));
function wall(count,tail='',ordered=false){const icons=Array.from({length:count},(_,index)=>model.iconNames[index%model.iconNames.length]);return control('compose: icon-wall\nicons: '+JSON.stringify(icons))+'# 중앙 원문\n\n전제 조건\n\n'+Array.from({length:count},(_,index)=>(ordered?(index+4)+'. ':'- ')+'**항목 '+index+'** [원전](https://example.com/'+index+')').join('\n')+tail;}
for(const count of [5,12,22])check('wall-'+count,wall(count),'icon-wall');
check('wall-overflow',wall(23),'document');check('wall-tail',wall(5,'\n\n뒤의 중요한 조건'));
check('wall-ordered-start',wall(5,'',true));
check('custom-wall',control('compose: icon-wall')+'# 자체 표식\n\n'+Array.from({length:3},(_,index)=>'- ![원색의 자체 표식'+index+'](own'+index+'.svg) **라벨 '+index+'** [자료](https://example.com/'+index+')').join('\n'),'icon-wall');
for(const variant of ['portraits','strip'])for(const count of [2,3,6])check(variant+'-'+count,control('compose: gallery\nvariant: '+variant)+Array.from({length:count},(_,index)=>'![설명'+index+'](photo'+index+'.jpg "원래caption'+index+'")').join('\n\n'),'gallery',variant);
check('staggered-six',control('compose: mosaic\nvariant: staggered')+Array.from({length:6},(_,index)=>'![설명'+index+'](photo'+index+'.jpg "원래caption'+index+'")').join('\n\n'),'mosaic','staggered');
function cells(slot){const result=[];for(let row=slot.row;row<slot.row+slot.rowSpan;row++)for(let column=slot.column;column<slot.column+slot.columnSpan;column++)result.push(column+','+row);return result;}
function geometry(plan,count){assert.equal(plan.slots.length,count);const occupied=new Set();for(const slot of plan.slots){for(const key of ['column','row','columnSpan','rowSpan'])assert.ok(Number.isInteger(slot[key])&&slot[key]>0);assert.ok(slot.column+slot.columnSpan-1<=plan.columns&&slot.row+slot.rowSpan-1<=plan.rows);for(const cell of cells(slot)){assert.ok(!occupied.has(cell),'overlap '+cell);occupied.add(cell);}}return occupied;}
let bentoPlans=0,wallPlans=0;
for(let count=1;count<=12;count++)for(const primaryIndex of [-1,0,count-1]){const options={variant:'balanced',primaryIndex},before=JSON.stringify(options),plan=model.planBento(count,options);assert.equal(geometry(plan,count).size,plan.columns*plan.rows);assert.equal(JSON.stringify(options),before);bentoPlans++;}
for(let count=1;count<=22;count++){const plan=model.planIconWall(count),occupied=geometry(plan,count);for(const cell of cells(plan.copy))assert.ok(!occupied.has(cell),'copy overlap '+cell);wallPlans++;}
const baselineContext={module:{exports:{}}};
vm.runInNewContext(require('node:child_process').execFileSync('git',['show','f1f76a9:deck-model.js'],{cwd:repo,encoding:'utf8'}),baselineContext);
const baseline=baselineContext.module.exports;
for(const variant of ['seoul','recap'])assert.equal(JSON.stringify(model.bentoPreset(variant)),JSON.stringify(baseline.bentoPreset(variant)));
for(const count of [5,12,22])assert.equal(JSON.stringify(model.iconWallSlots(count)),JSON.stringify(baseline.iconWallSlots(count)));
const spans=[2,1,1,1,1,2].map(span=>({span}));assert.equal(JSON.stringify(model.packMosaic(spans)),JSON.stringify(baseline.packMosaic(spans)));
const paths=['scripts/markdown-document.cjs','deck-model.js','blocks.js','blocks.css','talks/product-notes/slides.md','talks/team-learning/slides.md','talks/photo-essay/slides.md','talks/community-exhibit/slides.md'];
const hashes=Object.fromEntries(paths.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.join(repo,file))).digest('hex')]));
const receipt={scope:'Independent Node VM semantics, source/links/images/list start and plan checks; no browser/ratio/aesthetic assertion',node:process.version,inputs:results.length,slides:results.reduce((sum,entry)=>sum+entry.slides.length,0),planner:{bentoPlans,wallPlans,legacyComparisons:6,baseline:'f1f76a9'},results,hashes};
const output=process.argv[2];if(!output||!path.resolve(output).startsWith('/tmp/'))throw Error('Provide a /tmp output filename.');fs.writeFileSync(output,JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({output,inputs:receipt.inputs,slides:receipt.slides}));
