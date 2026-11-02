// Mechanical integration only. Status, reviewer and reasons are copied verbatim from independent reviewers.
const fs = require('node:fs');
const path = require('node:path');
const { createDraft, sha256, checkRecord } = require('../../scripts/design-review.cjs');
const root = path.resolve(__dirname, '../..');
const base = 'research/llm-wiki-remake-20261102';
const source = 'talks/llm-wiki/slides.md';
const file = name => ({ path:name,sha256:sha256(fs.readFileSync(path.join(root,name))) });
const output = path.join(__dirname,'final');
fs.mkdirSync(output,{recursive:true});
for (const [key,round,mode,width,height] of [
  ['present-1440','round-01','presentation-stage-only',1440,1000],
  ['present-960','round-01','presentation-stage-only',960,900],
  ['read-1440','round-03','read-slide-crop',1440,1000],
  ['read-390','round-03','read-slide-crop',390,844]
]) {
  const folder = base+'/'+round+'/'+key;
  const reviewPath = base+'/round-01/design-review/'+key+'.reviews.json';
  const reviews = JSON.parse(fs.readFileSync(path.join(root,reviewPath),'utf8'));
  const manifestPath = folder+'/manifest.json';
  const manifest = JSON.parse(fs.readFileSync(path.join(root,manifestPath),'utf8'));
  const record = createDraft({ repoRoot:root,source,mode,viewport:{width,height,devicePixelRatio:1},owner:'/root/remake_design_manager' });
  record.recordAuthor = '/root (mechanical integration; independent verdicts copied unchanged)';
  record.reviewSource = file(reviewPath);
  record.capture = { designSha256:manifest.hashes['DESIGN.md'],inputs:manifest.hashes,manifest:file(manifestPath),
    evidence:manifest.observations.map(row=>({ ...file(path.relative(root,row.filename)),slides:[Number(row.index)+1],mode,viewport:row.viewport })),
    supportingEvidence:fs.readdirSync(path.join(root,folder)).filter(name=>name.startsWith('contact-')).map(name=>file(folder+'/'+name)) };
  record.reviews = reviews;
  const result = checkRecord({repoRoot:root,source,record,requireApproved:true});
  if (!result.passed) throw new Error(key+' is not approved');
  fs.writeFileSync(path.join(output,key+'.review.json'),JSON.stringify(record,null,2)+'\n');
  console.log(key,JSON.stringify(result));
}
