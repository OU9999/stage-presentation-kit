'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {evaluateGeometry,segmentIntersectsBox,linearPoints}=require('../scripts/llm-wiki-geometry-qa.cjs');
const history=require('../research/llm-wiki-typography-20261102/round-01/present-1280/svg-metrics.json');
const root=path.join(__dirname,'..');
const contracts={
  9:{nodes:['concept','comparison','plan'],relations:[{from:'concept',to:'comparison'},{from:'concept',to:'plan'},{from:'comparison',to:'plan'}],labels:['미리 작성하고 유지한 문서','LLM Wiki 개념','RAG와 위키 비교','우리 스터디 계획','필요한 쪽 재읽기 → 이번 답에 활용']},
  10:{nodes:['summary','concept-comparison','plan'],relations:[{from:'summary',to:'concept-comparison'},{from:'summary',to:'plan'},{from:'concept-comparison',to:'plan'}],labels:['문서·목차·링크 갱신','자료 요약','원자료의 입구','개념 · 비교','기존 설명과 연결','현재 계획','여러 자료의 종합']}
};
function legacy(slide) {
  const observation=structuredClone(history.observations.find(o=>o.slide===slide)),contract=contracts[slide];
  const file=observation.sourcePaths[0];
  const source=fs.readFileSync(path.join(root,'research/llm-wiki-typography-20261102/round-01/source',file),'utf8');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'),observation.assetSha256,'preserved source must match the measured historical asset');
  const circles=[...source.matchAll(/<circle\s+cx="([\d.]+)"\s+cy="([\d.]+)"/g)];
  assert.equal(circles.length,3);
  // The historic paths lack IDs. Exact preserved relation-path positions are explicit.
  const paths=[...source.matchAll(/<path\s+d="([^"]+)"/g)].map(m=>m[1]).filter(d=>slide===9?/^M(?:675|1260) 290/.test(d):/^M(?:715 320|1210 190)/.test(d));
  assert.equal(paths.length,3);
  observation.geometry={coordinateSpace:'root-svg-viewBox',nodes:circles.map((m,i)=>({id:contract.nodes[i],x:Number(m[1]),y:Number(m[2])})),relations:paths.map((d,i)=>({...contract.relations[i],id:'legacy-'+i,points:linearPoints(d),strokeWidth:3,visible:true,opacity:1,markerStart:null,markerEnd:null}))};
  return observation;
}
function correctedFixture(slide) {
  const o=legacy(slide);
  if(slide===9) {
    o.geometry.nodes[2].y=440;
    for(const r of o.geometry.relations)if(r.to==='plan')r.points[r.points.length-1].y=440;
    o.texts.find(t=>t.text==='우리 스터디 계획').bbox.y=467.5;
  } else {
    o.geometry.relations[0].points=[{x:715,y:320},{x:900,y:310},{x:900,y:190},{x:1210,y:190}];
    o.geometry.relations[1].points=[{x:715,y:320},{x:900,y:330},{x:900,y:470},{x:1210,y:470}];
    o.geometry.relations[2].points=[{x:1210,y:190},{x:1455,y:190},{x:1455,y:470},{x:1210,y:470}];
  }
  return o;
}
function sourceLayoutProbe(slide) {
  const o=legacy(slide),file=o.sourcePaths[0];
  const read=prefix=>fs.readFileSync(path.join(root,prefix,file),'utf8');
  const old=read('research/llm-wiki-typography-20261102/round-01/source'),current=read('');
  const attrs=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  const texts=s=>[...s.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map(m=>({attrs:attrs(m[1]),text:m[2]}));
  assert.equal(old.match(/<g\b[^>]*>/)[0],current.match(/<g\b[^>]*>/)[0],'font family and spacing must stay identical for a translation-only source probe');
  const before=texts(old),after=texts(current);
  o.texts=o.texts.map(t=>{
    const from=before.filter(n=>n.text===t.text),to=after.filter(n=>n.text===t.text);assert.equal(from.length,1);assert.equal(to.length,1);
    for(const key of ['font-size','font-weight','text-anchor'])assert.equal(to[0].attrs[key],from[0].attrs[key],key+' must remain unchanged for the source-layout probe');
    const dx=Number(to[0].attrs.x)-Number(from[0].attrs.x),dy=Number(to[0].attrs.y)-Number(from[0].attrs.y);
    assert.ok(Number.isFinite(dx)&&Number.isFinite(dy));
    return {...t,bbox:{...t.bbox,x:t.bbox.x+dx,y:t.bbox.y+dy}};
  });
  o.geometry={coordinateSpace:'root-svg-viewBox',nodes:[...current.matchAll(/<circle\b([^>]*)\/>/g)].map(m=>{const a=attrs(m[1]);return {id:a['data-node-id'],x:Number(a.cx),y:Number(a.cy)};}),relations:[...current.matchAll(/<polyline\b([^>]*)\/>/g)].map(m=>{const a=attrs(m[1]);return {id:a['data-relation-id'],from:a['data-from'],to:a['data-to'],points:a.points.trim().split(/\s+/).map(p=>{const [x,y]=p.split(',').map(Number);return {x,y};}),strokeWidth:Number(a['stroke-width']),visible:a.stroke!=='none',opacity:1,markerStart:a['marker-start']||null,markerEnd:a['marker-end']||null};})};
  return o;
}
test('preserved round-01 path coordinates plus real text bboxes reproduce both R4 failures',()=>{
  for(const slide of [9,10]) {
    const r=evaluateGeometry(legacy(slide),contracts[slide]);
    assert.equal(r.status,'regression');assert.equal(r.visualApproval,false);
    assert.equal(r.checks.filter(c=>c.id.endsWith('-trace')&&c.status==='pass').length,3);
    assert.equal(r.checks.filter(c=>c.id.endsWith('-labels')&&c.status==='regression').length,slide===9?2:3);
    assert.ok(r.checks.some(c=>c.status==='regression'&&c.detail.includes(slide===9?'우리 스터디 계획':'기존 설명과 연결')));
  }
});
test('actual candidate source paths clear translated historical bboxes when unchanged-font assumptions hold; this is not a fresh capture',()=>{
  for(const slide of [9,10]){const r=evaluateGeometry(sourceLayoutProbe(slide),contracts[slide]);assert.equal(r.status,'pass',JSON.stringify(r));}
});
test('the same R4 checker accepts separated labels and a continuous three-pair undirected route',()=>{
  for(const slide of [9,10]){const result=evaluateGeometry(correctedFixture(slide),contracts[slide]);assert.equal(result.status,'pass',JSON.stringify({slide,checks:result.checks}));}
});
test('line/box intersection handles diagonal crossings, endpoints, stroke width and boxes outside a segment',()=>{
  const b={x:10,y:10,width:10,height:10};
  assert.equal(segmentIntersectsBox({x:0,y:0},{x:30,y:30},b),true);
  assert.equal(segmentIntersectsBox({x:0,y:0},{x:10,y:10},b),true);
  assert.equal(segmentIntersectsBox({x:0,y:9},{x:30,y:9},b),false);
  assert.equal(segmentIntersectsBox({x:0,y:9},{x:30,y:9},b,1.5),true);
  assert.equal(segmentIntersectsBox({x:0,y:0},{x:5,y:5},b),false);
});
test('linear historic path parser keeps exact corners and refuses curves, compound paths and unsupported syntax',()=>{
  assert.deepEqual(linearPoints('M1210 190H1455V470H1210'),[{x:1210,y:190},{x:1455,y:190},{x:1455,y:470},{x:1210,y:470}]);
  for(const d of ['M0 0C1 2 3 4 5 6','M0 0L1 1M2 2L3 3','m0 0l1 1','M0','not a path'])assert.equal(linearPoints(d),null);
});
test('missing/duplicate labels, nodes or relation pairs are contract-invalid rather than deleting a failure',()=>{
  const mutations=[o=>o.texts.splice(o.texts.findIndex(t=>t.text==='우리 스터디 계획'),1),o=>o.texts.push(structuredClone(o.texts.find(t=>t.text==='우리 스터디 계획'))),o=>o.geometry.nodes.pop(),o=>o.geometry.relations.pop(),o=>o.geometry.relations[2]={...o.geometry.relations[0]},o=>delete o.texts.find(t=>t.text==='우리 스터디 계획').bbox,o=>delete o.geometry.coordinateSpace];
  for(const mutate of mutations){const o=correctedFixture(9);mutate(o);assert.equal(evaluateGeometry(o,contracts[9]).status,'contract-invalid');}
});
test('hidden, disconnected or directional relations cannot pass by avoiding a label',()=>{
  for(const mutate of [r=>r.visible=false,r=>r.opacity=0,r=>r.markerEnd='url(#arrow)',r=>r.points[0].x+=20,r=>r.points.splice(1,0,{x:1600,y:300})]){
    const o=correctedFixture(10);mutate(o.geometry.relations[2]);assert.equal(evaluateGeometry(o,contracts[10]).status,'regression');
  }
});

test('incomplete role contracts and collapsed three-node relations cannot be reported as a clear graph',()=>{
  for(const mutate of [c=>c.nodes[0]=null,c=>c.relations[0]=null,c=>c.labels[0]='',c=>c.relations[0].to=c.relations[0].from]){
    const c=structuredClone(contracts[9]);mutate(c);assert.equal(evaluateGeometry(correctedFixture(9),c).status,'contract-invalid');
  }
  const o=correctedFixture(9);
  for(const n of o.geometry.nodes){n.x=900;n.y=320;}
  for(const r of o.geometry.relations)r.points=[{x:900,y:320},{x:900,y:320}];
  assert.equal(evaluateGeometry(o,contracts[9]).status,'regression');
});
test('a route detour is checked on every segment, not just its clear endpoints',()=>{
  const o=correctedFixture(10);o.geometry.relations[2].points[1].x=1210;o.geometry.relations[2].points[2].x=1210;
  const result=evaluateGeometry(o,contracts[10]);assert.equal(result.status,'regression');assert.ok(result.checks.some(c=>c.detail.includes('현재 계획')));
});
test('geometry observations require finite path, visibility and marker data; unrelated text is outside this narrow contract',()=>{
  for(const mutate of [r=>delete r.points,r=>r.points[0].x=NaN,r=>delete r.visible,r=>delete r.opacity,r=>delete r.markerStart]){
    const o=correctedFixture(9);mutate(o.geometry.relations[0]);assert.equal(evaluateGeometry(o,contracts[9]).status,'contract-invalid');
  }
  const o=correctedFixture(9);o.texts.push({text:'다른 그림의 의도된 짧은 라벨'});assert.equal(evaluateGeometry(o,contracts[9]).status,'pass');
});
