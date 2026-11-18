'use strict';
// Mechanical integration of unchanged, independently authored visual verdicts.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),base=path.relative(root,__dirname);
const {createDraft,sha256,checkRecord}=require('../../scripts/design-review.cjs');
const round=process.argv[2],reviewDirectory=process.argv[3]||base+'/design';
if(!/^round-\d+$/.test(round||''))throw Error('An explicit captured round is required');
const source='talks/llm-wiki/slides.md';
const file=name=>({path:name,sha256:sha256(fs.readFileSync(path.join(root,name)))});
const results=[];fs.mkdirSync(path.join(__dirname,round,'reviews'),{recursive:true});
for(const [key,mode,width,height] of [['present-1280','presentation-stage-only',1280,720],['present-1920','presentation-stage-only',1920,1080],['read-1440','read-slide-crop',1440,1000],['read-390','read-slide-crop',390,844]]){
 const folder=base+'/'+round+'/'+key,manifestPath=folder+'/manifest.json';
 const manifest=JSON.parse(fs.readFileSync(path.join(root,manifestPath),'utf8'));
 const reviewPath=reviewDirectory+'/'+key+'.reviews.json';
 const record=createDraft({repoRoot:root,source,mode,viewport:{width,height,devicePixelRatio:1},owner:'/root/design_audit_manager'});
 record.recordAuthor='/root (mechanical integration of unchanged independent verdicts)';
 record.reviewSource=file(reviewPath);record.inputs=manifest.hashes;
 record.capture={designSha256:manifest.hashes['DESIGN.md'],inputs:manifest.hashes,manifest:file(manifestPath),evidence:manifest.observations.map(row=>({...file(path.relative(root,row.filename)),slides:[Number(row.index)+1],mode,viewport:row.viewport})),supportingEvidence:fs.readdirSync(path.join(root,folder)).filter(name=>name.startsWith('contact-')).map(name=>file(folder+'/'+name))};
 record.reviews=JSON.parse(fs.readFileSync(path.join(root,reviewPath),'utf8'));
 const normal=checkRecord({repoRoot:root,source,record}),approval=checkRecord({repoRoot:root,source,record,requireApproved:true});
 const recordPath=base+'/'+round+'/reviews/'+key+'.review.json';
 fs.writeFileSync(path.join(root,recordPath),JSON.stringify(record,null,2)+'\n');
 results.push({scope:key,record:recordPath,normal,requireApproved:approval});
}
fs.writeFileSync(path.join(__dirname,round,'review-checks.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
