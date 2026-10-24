'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const model = require('../deck-model.js');
const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const fixture = {window:{}};
vm.runInNewContext(fs.readFileSync(require.resolve('../research/visual-redesign-20261024/qa-reuse/content.js'),'utf8'), fixture);
const reuse = JSON.parse(JSON.stringify(fixture.window.PRESENTATION));

class Node {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.children=[];this.attributes={};this.dataset={};this._text='';this.className='';
    this.style={setProperty(key,value){this[key]=value;}};
    this.classList={add:(name)=>{this.className+=' '+name;}};
  }
  append(...nodes){this.children.push(...nodes);}
  prepend(...nodes){this.children.unshift(...nodes);}
  replaceChildren(...nodes){this.children=[...nodes];this._text='';}
  setAttribute(key,value){this.attributes[key]=String(value);}
  removeAttribute(key){delete this.attributes[key];}
  set textContent(value){this._text=String(value);this.children=[];}
  get textContent(){return this._text+this.children.map(n=>n.textContent).join('');}
}
const document={createElement:tag=>new Node(tag),createElementNS:(_,tag)=>new Node(tag),createTextNode:text=>{const n=new Node('#text');n.textContent=text;return n;}};
const context={window:{STAGE_MODEL:model},document};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../visual.js'),'utf8'),context);
const visual=context.window.StageVisual;
const nodes=root=>[root,...root.children.flatMap(nodes)];
const plain=value=>JSON.parse(JSON.stringify(value));

test('TC-NV01 independent topic uses 7 points, 5 categories, 2/5 flows, signed bars, duplicate coordinates, null, 17 weeks and 2x5 cells',()=>{
 const before=structuredClone(reuse);assert.deepEqual(model.validateDeck(reuse),[]);
 for(const slide of reuse.slides){const r=visual.render(slide.visual);assert.ok(r.plot);assert.ok(r.table.rows.length);assert.ok(!nodes(r.plot).some(n=>n.tagName==='IMG'||n.className.includes('media-frame')));}
 assert.deepEqual(reuse,before);
});
test('TC-NV02 ratio hero and table use the same derived values and preserve raw denominators',()=>{
 const v=reuse.slides[0].visual,r=visual.render(v);
 assert.equal(r.hero.value,80);assert.equal(r.table.rows[6][1],'80');assert.deepEqual(plain(r.table.rows[6].slice(-2)),[136,170]);
 const edited=structuredClone(v);edited.numerators[6]=85;const changed=visual.render(edited);assert.equal(changed.hero.value,50);assert.equal(changed.table.rows[6][1],'50');
 assert.notDeepEqual(nodes(r.plot).filter(n=>n.tagName==='POLYLINE').map(n=>n.attributes.points),nodes(changed.plot).filter(n=>n.tagName==='POLYLINE').map(n=>n.attributes.points));
});
test('TC-NV03 null observations split line segments and never become zeros; 0-total composition has no fake percentage',()=>{
 const r=visual.render({kind:'line',labels:['a','b','c','d','e'],values:[0,4,null,8,6]});
 assert.equal(nodes(r.plot).filter(n=>n.tagName==='POLYLINE').length,4);assert.equal(r.table.rows[2][1],'—');
 const empty=visual.render({kind:'composition',labels:['a','b'],values:[0,0]});assert.match(empty.plot.textContent,/계산할 수 없습니다/);assert.ok(empty.table.rows.every(row=>row[2]==='계산 불가'));assert.doesNotMatch(empty.plot.textContent,/NaN|Infinity/);
});
test('TC-NV04 field diagnostics isolate invalid values, lengths, ratios and references without mutating source',()=>{
 const invalid=[
  [{kind:'line',labels:['a'],values:[NaN]},'values.0'],
  [{kind:'line',labels:['a'],values:['5']},'values.0'],
  [{kind:'line',labels:['a'],values:[1,2]},'values'],
  [{kind:'line',labels:['a'],values:[1],numerators:[1],denominators:[2]},'values'],
  [{kind:'line',labels:['a'],numerators:[1],denominators:[0]},'denominators.0'],
  [{kind:'line',labels:['a'],numerators:[Number.MAX_VALUE],denominators:[.01]},'numerators.0'],
  [{kind:'composition',labels:['a'],values:[-1]},'values.0'],
  [{kind:'flow',items:[{id:'a',label:'A'},{id:'b',label:'B'}],links:[{from:'a',to:'missing'}]},'links.0.to'],
  [{kind:'timeline',items:[{label:'task',start:5,end:2}]},'items.0.end'],
  [{kind:'heatmap',rows:['a'],columns:['x','y'],values:[[1]]},'values.0']
 ];
 for(const [input,path]of invalid){const before=structuredClone(input);const issues=model.validateVisual(input,'visual',2);assert.ok(issues.some(i=>i.path==='visual.'+path),JSON.stringify(issues));assert.ok(issues.every(i=>i.slideIndex===2));assert.deepEqual(input,before);}
 assert.deepEqual(model.validateVisual({kind:'line',labels:['a'],values:[150],unit:'%'}),[]);
 assert.deepEqual(model.validateVisual({kind:'flow',items:[{id:'a',label:'A'},{id:'b',label:'B'}],links:[{from:'a',to:1}]}),[]);
});
test('TC-NV05 every same-source table has caption and scoped row/column headers; source strings stay literal',()=>{
 const v={kind:'bars',labels:['<img src=x onerror=alert(1)>'],values:[-4],unit:'건'};
 const table=visual.renderTable(v,{caption:'다른 주제'}),all=nodes(table);
 assert.equal(all.find(n=>n.tagName==='CAPTION').textContent,'다른 주제');assert.ok(all.filter(n=>n.tagName==='TH').every(n=>n.scope==='row'||n.scope==='col'));assert.ok(!all.some(n=>n.tagName==='IMG'));assert.match(table.textContent,/<img src=x/);
 const branch=visual.render({kind:'flow',items:[{id:'a',label:'A'},{id:'b',label:'B'},{id:'c',label:'C'}],links:[{from:'a',to:'b'}]});assert.equal(branch.table.rows.length,3);assert.equal(branch.table.rows[2][1],'연결 없음');
 const container=new Node('main');visual.renderDataPage(reuse,container);assert.equal(container.children.length,10);assert.equal(nodes(container).filter(n=>n.tagName==='TABLE').length,10);
});
test('TC-NV06 native visual headings keep existing editable paths and no image frame',()=>{
 const globals=app.slice(app.indexOf('  var names ='),app.indexOf('  var storageKey ='));
 const functions=app.slice(app.indexOf('  function element('),app.indexOf('  function render()'));
 const deck={slides:[structuredClone(reuse.slides[0])]};deck.slides[0].subtitle='수정 가능한 설명';
 const c={model,deck,rawDeck:deck,state:{theme:'paper'},validationIssues:[],rootFatal:false,document,window:{StageVisual:visual},record:v=>v!==null&&typeof v==='object'&&!Array.isArray(v),owns:(v,k)=>Object.hasOwn(v,k)};
 vm.createContext(c);vm.runInContext(globals+'\n'+functions+'\nthis.result=renderSlide(deck.slides[0],0,false);',c);
 const all=nodes(c.result);assert.equal(c.result.dataset.layout,'visual');assert.ok(all.some(n=>n.dataset.field==='title'));assert.ok(all.some(n=>n.dataset.field==='subtitle'));assert.ok(!all.some(n=>n.className.includes('media-frame')));assert.ok(all.some(n=>n.tagName==='TABLE'));
});
test('TC-NV07 actual JSON apply rejects invalid draft atomically, cancel preserves input, valid draft updates the persisted visual',()=>{
 const input=new Node('textarea'),errors=new Node('p'),deck={slides:[structuredClone(reuse.slides[0])]};
 let rendered=0,persisted=0,closed=0;
 const c={model,rawDeck:deck,record:v=>v!==null&&typeof v==='object'&&!Array.isArray(v),document:{getElementById:id=>id==='visualJsonInput'?input:errors},closeDialog(){closed++;},persist(){persisted++;},render(){rendered++;},toast(){}};
 vm.createContext(c);vm.runInContext(app.slice(app.indexOf('  var visualEditorIndex ='),app.indexOf('  function allIssues()'))+'\nvisualEditorIndex=0;this.apply=applyVisualEditor;',c);
 const before=structuredClone(deck);input.value='{bad json';c.apply();assert.deepEqual(deck,before);assert.match(errors.textContent,/JSON/);assert.equal(persisted,0);
 input.value=JSON.stringify({...deck.slides[0].visual,denominators:[0,140,130,160,150,180,170]});c.apply();assert.deepEqual(deck,before);assert.match(errors.textContent,/denominators.0/);assert.equal(rendered,0);
 // Opening/editing a textarea has no deck write; only an explicit valid Apply commits.
 input.value=JSON.stringify({...deck.slides[0].visual,focus:0});assert.deepEqual(deck,before);c.apply();assert.equal(deck.slides[0].visual.focus,0);assert.equal(persisted,1);assert.equal(rendered,1);assert.equal(closed,1);
});
test('TC-NV08 initial source cloning preserves invalid finite diagnostics instead of turning NaN into a valid null gap',()=>{
 const c={};vm.createContext(c);vm.runInContext(app.slice(app.indexOf('  function clone('),app.indexOf('  var original ='))+'\nthis.copy=clone;',c);
 const original={kind:'line',labels:['a'],values:[NaN]},copy=c.copy(original);assert.ok(Number.isNaN(copy.values[0]));assert.ok(model.validateVisual(copy).some(i=>i.path==='visual.values.0'));assert.notEqual(copy,original);
});

test('TC-NV09 the header data action opens the current edited table without loading a separate disk-source page',()=>{
 const summary={focused:false,focus(){this.focused=true;}};
 const table={textContent:'edited 123',open:false,scrolled:false,querySelector:()=>summary,scrollIntoView(){this.scrolled=true;}};
 const stage={children:[{querySelector:()=>null},{querySelector:()=>table}]};
 const c={state:{index:1,mode:'present'},stage,document:{body:{dataset:{mode:'present'}}},goTo(index){this.state.index=index;},requestAnimationFrame:fn=>fn(),closeDialog:()=>{c.dialogClosed=true;},toast(){throw new Error('valid table must be found');}};
 // A normal function is used for the existing goTo boundary so this stays in the VM context.
 c.goTo=index=>{c.state.index=index;};vm.createContext(c);
 vm.runInContext(app.slice(app.indexOf('  function showCurrentData()'),app.indexOf('  var visualEditorIndex ='))+'\nthis.showData=showCurrentData;',c);
 c.showData();assert.equal(c.dialogClosed,true);assert.equal(c.state.mode,'read');assert.equal(c.state.index,1);assert.equal(table.open,true);assert.equal(table.scrolled,true);assert.equal(summary.focused,true);assert.equal(table.textContent,'edited 123');
 c.state.index=0;c.showData();assert.equal(c.state.index,1,'a nonvisual current slide falls back to the first actual table');
});

test('TC-NV10 focused table and horizontal plot regions retain native scroll keys while the rest of the deck still navigates',()=>{
 let listener,navigated=0,prevented=0;
 const c={document:{addEventListener:(name,fn)=>{listener=fn;}},state:{index:0},currentDialog:null,goTo(){navigated++;}};
 vm.createContext(c);vm.runInContext(app.slice(app.indexOf('  document.addEventListener("keydown"'),app.indexOf('  window.addEventListener("hashchange"')),c);
 for(const key of ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown',' ']){
  listener({key,target:{closest:selector=>selector.startsWith('.visual-table-scroll')?{}:null},preventDefault(){prevented++;}});
 }
 assert.equal(navigated,0);assert.equal(prevented,0,'native scrolling must receive the event');
 listener({key:'ArrowRight',target:{closest:()=>null},preventDefault(){prevented++;}});
 assert.equal(navigated,1);assert.equal(prevented,1,'normal stage navigation stays intact');
});
