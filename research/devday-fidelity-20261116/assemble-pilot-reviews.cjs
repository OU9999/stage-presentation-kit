'use strict';
// Preserve each independent judge verbatim; no averaging, adjudication or inferred approvals.
const fs=require('node:fs'),path=require('node:path');
const {createDraft,sha256,checkRecord}=require('../../scripts/design-review.cjs');
const root=path.resolve(__dirname,'../..'),base=path.relative(root,__dirname),round=process.argv[2];
if(!/^round-\d+$/.test(round||''))throw Error('Explicit captured round required');
const source=base+'/prototypes/talks/'+round+'/slides.md';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const file=p=>({path:p,sha256:sha256(fs.readFileSync(path.join(root,p)))});
const folder=base+'/evidence/'+round;fs.mkdirSync(path.join(root,folder,'reviews'),{recursive:true});
const results=[];
for(const judge of ['art-direction','reading-meaning']){
 const rawPath=base+'/review/'+round+'/'+judge+'.reviews.json',manual=read(rawPath),raw=Array.isArray(manual)?manual:manual.reviews;
 if(!Array.isArray(raw)||raw.length!==8)throw Error('Expected eight explicit independent verdicts: '+rawPath);
 for(const [width,height]of [[1920,1080],[1280,720]]){
  const mode='presentation-stage-only',size={width,height,devicePixelRatio:1},capture=folder+'/present-'+width,manifestPath=capture+'/manifest.json',manifest=read(manifestPath);
  const reviews=raw.filter(r=>r.mode===mode&&r.viewport.width===width&&r.viewport.height===height&&r.viewport.devicePixelRatio===1);
  if(reviews.length!==4||new Set(reviews.map(r=>r.slide)).size!==4)throw Error('Wrong judge scope');
  const record=createDraft({repoRoot:root,source,mode,viewport:size,owner:reviews[0].reviewer});
  record.recordAuthor='/root (verbatim mechanical integration of one independent judge)';record.reviewSource=file(rawPath);record.inputs=manifest.hashes;
  record.capture={designSha256:manifest.hashes['DESIGN.md'],inputs:manifest.hashes,manifest:file(manifestPath),evidence:manifest.observations.map(o=>({...file(path.relative(root,o.filename)),slides:[Number(o.index)+1],mode,viewport:o.viewport})),supportingEvidence:['contact-01-04.jpg','reference-before-after.jpg','context-storyboard.jpg','context-storyboard.json','svg-metrics.json'].map(n=>file(capture+'/'+n))};
  record.reviews=reviews;
  const name=folder+'/reviews/'+judge+'-'+width+'.review.json';
  fs.writeFileSync(path.join(root,name),JSON.stringify(record,null,2)+'\n');
  results.push({judge,width,record:name,normal:checkRecord({repoRoot:root,source,record}),requireApproved:checkRecord({repoRoot:root,source,record,requireApproved:true})});
 }
}
fs.writeFileSync(path.join(root,folder,'review-validation.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
