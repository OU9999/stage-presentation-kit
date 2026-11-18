'use strict';
// Project-specific R4 geometry: the three undirected relations on LLM Wiki 9/10.
// A bbox intersection is a regression candidate, never an automatic ink/visual verdict.
const point = p => !!p && Number.isFinite(p.x) && Number.isFinite(p.y);
const box = b => !!b && ['x','y','width','height'].every(k => Number.isFinite(b[k])) && b.width > 0 && b.height > 0;
const pair = (a,b) => [a,b].sort().join('\0');

function segmentIntersectsBox(a,b,rect,padding=0) {
  if (!point(a) || !point(b) || !box(rect) || !Number.isFinite(padding) || padding < 0) throw new TypeError('Finite segment and positive SVG bbox required.');
  const minX=rect.x-padding,maxX=rect.x+rect.width+padding,minY=rect.y-padding,maxY=rect.y+rect.height+padding;
  let low=0,high=1;
  for (const [start,delta,min,max] of [[a.x,b.x-a.x,minX,maxX],[a.y,b.y-a.y,minY,maxY]]) {
    if (Math.abs(delta)<1e-12) { if (start<min || start>max) return false; }
    else { const t1=(min-start)/delta,t2=(max-start)/delta; low=Math.max(low,Math.min(t1,t2));high=Math.min(high,Math.max(t1,t2));if(low>high)return false; }
  }
  return true;
}

// The preserved R4 examples use one continuous absolute M/L/H/V path each.
// Refuse unsupported/compound shapes instead of flattening curves or arrow heads.
function linearPoints(d) {
  if(typeof d!=='string')return null;
  const tokens=d.match(/[MLHV]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/gi)||[];
  if(d.replace(/[MLHV]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?|[\s,]/gi,'') || /[mlhv]/.test(d))return null;
  const points=[];let i=0,command;
  while(i<tokens.length) {
    if(/^[MLHV]$/.test(tokens[i]))command=tokens[i++];
    if(!command || !points.length && command!=='M' || points.length && command==='M')return null;
    const n=command==='M'||command==='L'?2:1;
    const nums=tokens.slice(i,i+n).map(Number);if(nums.length!==n || nums.some(v=>!Number.isFinite(v)))return null;i+=n;
    const prior=points.at(-1)||{};
    points.push(command==='H'?{x:nums[0],y:prior.y}:command==='V'?{x:prior.x,y:nums[0]}:{x:nums[0],y:nums[1]});
    if(command==='M')command='L';
  }
  return points.length>=2?points:null;
}

function evaluateGeometry(observation,contract) {
  const checks=[];
  const add=(id,status,detail)=>checks.push({id,status,detail});
  const finish=()=>({status:checks.some(c=>c.status==='contract-invalid')?'contract-invalid':checks.some(c=>c.status==='regression')?'regression':'pass',visualApproval:false,checks});
  const g=observation?.geometry;
  if(!contract || !Array.isArray(contract.nodes) || contract.nodes.length!==3 || !Array.isArray(contract.relations) || contract.relations.length!==3 || !Array.isArray(contract.labels) || !contract.labels.length) {
    add('geometry-contract','contract-invalid','R4 requires its three named nodes, three undirected pairs and explicit label roles.');return finish();
  }
  const wantedNodes=contract.nodes.map(n=>typeof n==='string'?n:n?.id);
  if(wantedNodes.some(id=>typeof id!=='string'||!id) || contract.relations.some(r=>!r || typeof r.from!=='string'||typeof r.to!=='string') || contract.labels.some(t=>typeof t!=='string'||!t)) {
    add('geometry-contract','contract-invalid','Named source node, pair and label targets are required.');return finish();
  }
  const wantedPairs=contract.relations.map(r=>pair(r.from,r.to));
  if(new Set(wantedNodes).size!==3 || new Set(wantedPairs).size!==3 || contract.relations.some(r=>r.from===r.to||![r.from,r.to].every(id=>wantedNodes.includes(id))) || new Set(contract.labels).size!==contract.labels.length) {
    add('geometry-contract','contract-invalid','Node, relation and label targets must be unique and complete.');return finish();
  }
  if(!g || g.coordinateSpace!=='root-svg-viewBox' || !Array.isArray(g.nodes) || !Array.isArray(g.relations) || !Array.isArray(observation.texts) || !box(observation.svgViewBox)) {
    add('geometry-observation','contract-invalid','SVG-viewBox node, path and measured text observations required.');return finish();
  }
  if(g.nodes.length!==3 || g.relations.length!==3 || g.nodes.some(n=>!n||!wantedNodes.includes(n.id)||!point(n)) || new Set(g.nodes.map(n=>n.id)).size!==3 || g.relations.some(r=>!r||typeof r.from!=='string'||typeof r.to!=='string')) {
    add('geometry-nodes','contract-invalid','Exactly the three observed node anchors must remain.');return finish();
  }
  const labels=[];
  for(const text of contract.labels) {
    const found=observation.texts.filter(t=>t?.text===text);
    if(found.length!==1 || !box(found[0]?.bbox))add('geometry-label-'+text,'contract-invalid','One complete measured bbox is required for each designated label.');
    else labels.push(found[0]);
  }
  const actualPairs=g.relations.map(r=>pair(r.from,r.to));
  if(new Set(actualPairs).size!==3 || actualPairs.some(p=>!wantedPairs.includes(p))) {
    add('geometry-relations','contract-invalid','The original three undirected pairs must each remain once.');return finish();
  }
  for(const r of g.relations) {
    const id='geometry-edge-'+[r.from,r.to].sort().join('--');
    if(!Array.isArray(r.points) || r.points.length<2 || !r.points.every(point) || !Number.isFinite(r.strokeWidth) || r.strokeWidth<=0 || typeof r.visible!=='boolean' || !Number.isFinite(r.opacity) || !('markerStart' in r) || !('markerEnd' in r)) {
      add(id,'contract-invalid','Complete continuous path points, visible stroke and direction observations required.');continue;
    }
    const start=g.nodes.find(n=>n.id===r.from),end=g.nodes.find(n=>n.id===r.to);
    const near=(p,n)=>Math.hypot(p.x-n.x,p.y-n.y)<=2;
    const connected=near(r.points[0],start)&&near(r.points.at(-1),end)||near(r.points[0],end)&&near(r.points.at(-1),start);
    const undirected=[r.markerStart,r.markerEnd].every(m=>m===null||m==='none');
    const view=observation.svgViewBox,inFrame=r.points.every(p=>p.x>=view.x&&p.y>=view.y&&p.x<=view.x+view.width&&p.y<=view.y+view.height);
    const distinct=Math.hypot(start.x-end.x,start.y-end.y)>2;
    add(id+'-trace',connected&&distinct&&inFrame&&r.visible&&r.opacity>0&&undirected?'pass':'regression','Continuous visible relation must stay in the SVG frame, reach distinct named anchors and carry no direction markers.');
    const intersections=labels.filter(t=>r.points.slice(1).some((p,i)=>segmentIntersectsBox(r.points[i],p,t.bbox,r.strokeWidth/2))).map(t=>t.text);
    add(id+'-labels',intersections.length?'regression':'pass',intersections.length?'Path intersects measured label bbox: '+intersections.join(' / '):'No designated label bbox intersects this relation stroke.');
  }
  return finish();
}
module.exports={evaluateGeometry,segmentIntersectsBox,linearPoints};
