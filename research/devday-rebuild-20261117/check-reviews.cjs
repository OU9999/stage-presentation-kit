'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { createDraft, sha256 } = require('../../scripts/design-review.cjs');

const root = path.resolve(__dirname, '../..');
const base = path.relative(root, __dirname);
const [round, ...reviewers] = process.argv.slice(2);
const pilot = /^round-\d+$/.test(round);
if ((!pilot && !/^main-\d+$/.test(round)) || !reviewers.length) {
  throw new Error('Usage: node check-reviews.cjs <round-XX|main-XX> <review filename stems>');
}
const source = pilot ? `${base}/prototypes/talks/first-look/slides.md` : 'talks/llm-wiki/slides.md';
const capture = pilot ? `${base}/evidence/${round}` : `${base}/${round}`;
const reviewDir = `${base}/review/${round}`;
const read = file => fs.readFileSync(path.join(root, file));
const fingerprint = file => ({ path: file, sha256: sha256(read(file)) });
const scopes = [
  ['present-1920', 1920, 1080, 'presentation-stage-only'],
  ['present-1280', 1280, 720, 'presentation-stage-only'],
];
if (!pilot) scopes.push(['read-1440', 1440, 1000, 'read-slide-crop'], ['read-390', 390, 844, 'read-slide-crop']);
const output = path.join(root, capture, 'reviews');
fs.mkdirSync(output, { recursive: true });
const results = [];

for (const reviewer of reviewers) {
  if (!/^[A-Za-z.\-]+$/.test(reviewer)) throw new Error(`Invalid review filename: ${reviewer}`);
  const reviewFile = `${reviewDir}/${reviewer}.md`;
  const blocks = [...read(reviewFile).toString('utf8').matchAll(/```json\s*([\s\S]*?)```/g)];
  const reviews = blocks.map(block => JSON.parse(block[1])).flatMap(block => block.reviews ?? []);
  let assigned = 0;
  for (const [scope, width, height, mode] of scopes) {
    const rows = reviews.filter(row => row.mode === mode && row.viewport.width === width && row.viewport.height === height);
    if (!rows.length) continue;
    assigned += rows.length;
    const viewport = { width, height, devicePixelRatio: 1 };
    const manifestFile = `${capture}/${scope}/manifest.json`;
    const manifest = JSON.parse(read(manifestFile));
    const record = createDraft({ repoRoot: root, source, mode, viewport, owner: 'DevDay design team' });
    record.recordAuthor = '/root (mechanical integration of manual verdicts)';
    record.reviewSource = fingerprint(reviewFile);
    record.inputs = manifest.hashes;
    record.capture = {
      designSha256: manifest.hashes['DESIGN.md'],
      inputs: manifest.hashes,
      manifest: fingerprint(manifestFile),
      evidence: manifest.observations.map(observation => ({
        ...fingerprint(path.relative(root, path.resolve(observation.filename))),
        slides: [Number(observation.index) + 1], mode, viewport: observation.viewport,
      })),
    };
    record.reviews = rows;
    if (record.reviews.length !== manifest.observations.length) throw new Error(`Incomplete ${reviewer} reviews for ${scope}`);
    const target = `${capture}/reviews/${reviewer}-${scope}.review.json`;
    fs.writeFileSync(path.join(root, target), JSON.stringify(record, null, 2) + '\n');
    for (const approved of [false, true]) {
      const args = ['scripts/design-review.cjs', 'check', '--source', source, '--record', target];
      if (approved) args.push('--require-approved');
      const check = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8' });
      results.push({ reviewer, scope, requireApproved: approved, command: ['node', ...args], exit: check.status, stdout: check.stdout, stderr: check.stderr });
    }
  }
  if (!assigned || assigned !== reviews.length) throw new Error(`Unexpected scope in ${reviewer}`);
}
if (scopes.some(([scope]) => !results.some(check => check.scope === scope))) throw new Error('The review does not cover all captured scopes');
fs.writeFileSync(path.join(root, capture, 'approval-cli.json'), JSON.stringify(results, null, 2) + '\n');
for (const check of results) console.log(`${check.reviewer} ${check.scope} ${check.requireApproved ? 'approval' : 'record'} ${check.exit}${check.stderr ? ` ${check.stderr.trim()}` : ''}`);
if (results.some(check => !check.requireApproved && check.exit !== 0)) process.exitCode = 1;
