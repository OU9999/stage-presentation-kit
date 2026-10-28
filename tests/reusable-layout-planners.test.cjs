'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const model = require('../deck-model.js');
const {parseDocument} = require('../scripts/markdown-document.cjs');
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
function checkPlan(plan, count, full) {
  assert(plan); assert.equal(plan.slots.length,count);
  const cells = new Set();
  function occupy(slot) {
    for(const key of ['column','row','columnSpan','rowSpan']) assert(Number.isInteger(slot[key])&&slot[key]>0,key);
    assert(slot.column+slot.columnSpan-1<=plan.columns);assert(slot.row+slot.rowSpan-1<=plan.rows);
    for(let row=slot.row;row<slot.row+slot.rowSpan;row++)for(let column=slot.column;column<slot.column+slot.columnSpan;column++){
      const key=row+':'+column;assert(!cells.has(key),'overlap at '+key);cells.add(key);
    }
  }
  plan.slots.forEach(occupy);if(plan.copy)occupy(plan.copy);
  if(full)assert.equal(cells.size,plan.columns*plan.rows);
}

test('balanced bento keeps every group with positive, nonoverlapping slots and fresh output for counts 1 through 12',()=>{
  for(let count=1;count<=12;count++)for(const primaryIndex of [-1,count-1]){
    const options={variant:'balanced',primaryIndex};const before=JSON.stringify(options);
    const plan=model.planBento(count,options);checkPlan(plan,count,true);
    assert.equal(JSON.stringify(options),before);
    plan.slots[0].column=999;assert.notEqual(model.planBento(count,options).slots[0].column,999);
  }
  for(const count of [5,8,12]){
    const plan=model.planBento(count,{primaryIndex:3});
    const areas=plan.slots.map(s=>s.columnSpan*s.rowSpan);
    assert.equal(areas[3],Math.max(...areas));
    assert(areas.some(area=>area<areas[3]),'primary should have more area than a support group');
  }
});

test('fixed twelve-tile presets preserve geometry while explicit primary can take the anchor slot',()=>{
  for(const variant of ['seoul','recap']){
    assert.deepEqual(model.planBento(12,{variant}),model.bentoPreset(variant));
    const fixed=model.bentoPreset(variant),anchor=variant==='seoul'?3:0;
    const chosen=model.planBento(12,{variant,primaryIndex:7});
    checkPlan(chosen,12,true);assert.deepEqual(chosen.slots[7],fixed.slots[anchor]);
    assert.deepEqual(chosen.slots.slice().sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))),fixed.slots.slice().sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))));
    assert.equal(model.planBento(8,{variant}),null);
  }
  for(const count of [0,13,-1,2.5,'5'])assert.equal(model.planBento(count),null);
  assert.equal(model.planBento(5,{variant:'unknown'}),null);
  assert.equal(model.planBento(5,{primaryIndex:5}),null);
});

test('new icon wall spreads 3/5/12/22 icons around a reserved central copy without changing legacy top-first slots',()=>{
  for(const count of [3,5,12,22]){
    const plan=model.planIconWall(count);checkPlan(plan,count,count===22);
    assert.equal(Math.min(...plan.slots.map(s=>s.row)),1);assert.equal(Math.max(...plan.slots.map(s=>s.row)),5);
    assert(plan.slots.every(s=>s.row===1||s.row===5||s.column===1||s.column===8));
    assert.deepEqual(plan.copy,{column:2,row:2,columnSpan:6,rowSpan:3});
    const center={x:plan.slots.reduce((sum,s)=>sum+s.column,0)/count,y:plan.slots.reduce((sum,s)=>sum+s.row,0)/count};
    assert(Math.abs(center.x-4.5)<=1&&Math.abs(center.y-3)<=1,'sparse slots should not remain on the upper edge');
  }
  for(let count=1;count<=22;count++)checkPlan(model.planIconWall(count),count,false);
  for(const count of [0,23,-1,2.5,'5'])assert.equal(model.planIconWall(count),null);
  assert.deepEqual(model.iconWallSlots(5),[1,2,3,4,5].map(column=>({column,row:1})));
});

test('legacy planner geometry and all twenty SVG path values remain byte-identical',()=>{
  assert.equal(hash({seoul:model.bentoPreset('seoul'),recap:model.bentoPreset('recap'),five:model.iconWallSlots(5),twelve:model.iconWallSlots(12),twentytwo:model.iconWallSlots(22),mosaic:model.packMosaic([2,1,1,1,1,2].map(span=>({span})))}),'8d7def02c258cda494af3025ad5230274cd5e1e99d41b500030243bbe467cf51');
  assert.deepEqual(Object.keys(model.iconPaths),model.iconNames);
  assert.equal(hash(model.iconPaths),'5f6831bd7cb1e45728f2869997ef3cb07478ff6af0ab7b69d49294c76d1ee421');
});

test('new variant and icon syntax validates safe names while count/preset mismatch remains a renderer decision',()=>{
  const make = settings => parseDocument('<!-- stage-slide\n'+settings+'\n-->\n# H\n\n- **One**\n- [Two](https://example.com)');
  for(const settings of ['compose: gallery\nvariant: portraits','compose: gallery\nvariant: strip','compose: mosaic\nvariant: staggered','compose: bento\nvariant: balanced','compose: bento\nvariant: seoul','compose: bento\nvariant: recap','compose: icon-wall\nicons: []','compose: icon-wall\nicons: ['+Array(23).fill('search').join(',')+']','compose: message\nvariant: strip\nicons: [search]']){
    const deck=make(settings);assert.deepEqual(model.validateDeck(deck).filter(i=>i.severity==='error'),[]);
  }
  for(const settings of ['variant: unknown','icons: null','icons: [null]','icons: [javascript:alert(1)]','icons: [{icon: search, src: "evil.svg"}]','icons: [{tone: blue}]','icons: [{icon: search, tone: white}]','icons: [[search]]'])assert.throws(()=>make(settings),/variant|icons/);
  assert.throws(()=>make('focus: []'),/focus/);assert.throws(()=>make('focus: ['+Array(7).fill('"0% 0%"').join(',')+']'),/focus/);
  const deck=make('compose: icon-wall\nicons: [search, {icon: CODE, tone: blue}]');
  assert.deepEqual(deck.slides[0].view.icons,['search',{icon:'code',tone:'blue'}]);
  for(const mutate of [s=>s.view.variant='invented',s=>s.view.icons=[null],s=>s.view.icons=[{icon:'search',svg:'bad'}],s=>s.view.icons=[{icon:'search',tone:'white'}]]){
    const changed=JSON.parse(JSON.stringify(deck));mutate(changed.slides[0]);assert(model.validateDeck(changed).some(i=>i.severity==='error'));
  }
});

test('stage-group icon uses the original H2 binding and rejects paths or unknown names',()=>{
  const source='<!-- stage-slide\ncompose: bento\n-->\n# H\n\n<!-- stage-group\nicon: image\n-->\n## Work\n\n![Alt](./figure.svg)';
  const slide=parseDocument(source).slides[0];assert.equal(slide.view.groups[0].icon,'image');assert.equal(slide.view.groups[0].start,0);assert.equal(slide.blocks[0].position.line,9);
  assert.deepEqual(model.validateDeck({title:'H',slides:[slide]}),[]);
  assert.throws(()=>parseDocument(source.replace('icon: image','icon: ./custom.svg')),/icon/);
  const changed=JSON.parse(JSON.stringify(slide));changed.view.groups[0].icon='unknown';assert(model.validateDeck({slides:[changed]}).some(i=>i.severity==='error'));
});
