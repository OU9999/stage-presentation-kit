// Mechanical integration only. Verdicts and reasons belong to independent reviewers.
const fs = require('node:fs');
const path = require('node:path');
const { createDraft, sha256, checkRecord } = require('../../scripts/design-review.cjs');
const root = path.resolve(__dirname, '../..');
const base = 'research/llm-wiki-typography-20261102';
const source = 'talks/llm-wiki/slides.md';
const file = name => ({ path:name, sha256:sha256(fs.readFileSync(path.join(root,name))) });
const output = path.join(__dirname,'final');
fs.mkdirSync(output,{recursive:true});
for(const [key,mode,width,height] of [
  ['present-1920','presentation-stage-only',1920,1080],
  ['present-1280','presentation-stage-only',1280,720],
  ['read-1440','read-slide-crop',1440,1000],
  ['read-390','read-slide-crop',390,844]
]) {
  const folder = base+'/round-03/'+key;
  const reviewPath = base+'/review/'+key+'.reviews.json';
  const reviews = JSON.parse(fs.readFileSync(path.join(root,reviewPath),'utf8'));
  const manifestPath = folder+'/manifest.json';
  const manifest = JSON.parse(fs.readFileSync(path.join(root,manifestPath),'utf8'));
  const record = createDraft({repoRoot:root,source,mode,viewport:{width,height,devicePixelRatio:1},owner:'/root/presentation_recovery_manager'});
  record.recordAuthor = '/root (mechanical integration; independent verdicts copied unchanged)';
  record.reviewSource = file(reviewPath);
  record.capture = {designSha256:manifest.hashes['DESIGN.md'],inputs:manifest.hashes,manifest:file(manifestPath),
    evidence:manifest.observations.map(row=>({...file(path.relative(root,row.filename)),slides:[Number(row.index)+1],mode,viewport:row.viewport})),
    supportingEvidence:fs.readdirSync(path.join(root,folder)).filter(name=>name.startsWith('contact-')).map(name=>file(folder+'/'+name))};
  record.reviews = reviews;
  const result = checkRecord({repoRoot:root,source,record,requireApproved:true});
  if(!result.passed) throw new Error(key+' is not approved: '+JSON.stringify(result));
  fs.writeFileSync(path.join(output,key+'.review.json'),JSON.stringify(record,null,2)+'\n');
  console.log(key,JSON.stringify(result));
}
