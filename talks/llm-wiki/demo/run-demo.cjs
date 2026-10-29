#!/usr/bin/env node
'use strict';
// Applies a presenter-approved fixture. No AI API and no automatic semantic grading.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = __dirname;
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
function files(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true })
    .flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]).sort();
}
const immutablePaths = [...files('source-notes'), ...files('before')];
const immutable = Object.fromEntries(immutablePaths.map(p => [p, hash(read(p))]));
const expected = Object.fromEntries(files('before').map(p => [p.slice(7), read(p)]));
const initial = { ...expected };
const review = JSON.parse(read('review/review.json'));
assert.equal(review.not_a_model_run, true);
const changed = [];
for (const op of review.operations) {
  assert.match(op.path, /^wiki\/[a-z0-9/-]+\.md$/);
  assert.ok(!op.path.split('/').includes('..'));
  assert.ok(!changed.includes(op.path), 'one approved operation per file');
  if (op.action === 'create') assert.equal(expected[op.path], undefined);
  else assert.equal(typeof expected[op.path], 'string');
  expected[op.path] = op.action === 'append' ? expected[op.path] + op.content : op.content;
  changed.push(op.path);
}
function unified(before, after, name) {
  const a = before ? before.trimEnd().split('\n') : [];
  const b = after.trimEnd().split('\n');
  const table = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
  const lines = [`--- ${before ? `before/${name}` : '/dev/null'}`, `+++ after/${name}`, `@@ -${a.length ? 1 : 0},${a.length} +1,${b.length} @@`];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { lines.push(` ${a[i++]}`); j++; }
    else if (i < a.length && (j === b.length || table[i + 1][j] >= table[i][j + 1])) lines.push(`-${a[i++]}`);
    else lines.push(`+${b[j++]}`);
  }
  return `${lines.join('\n')}\n`;
}
const diff = changed.slice().sort().map(p => unified(initial[p], expected[p], p)).join('\n');
let linkCount = 0;
for (const [name, content] of Object.entries(expected)) {
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^https?:/.test(target)) continue;
    const resolved = path.resolve(root, 'after', path.dirname(name), target);
    const relative = path.relative(path.join(root, 'after'), resolved);
    assert.ok(Object.hasOwn(expected, relative) || fs.existsSync(resolved), `missing link ${name}: ${target}`);
    linkCount++;
  }
}
const checkOnly = process.argv.includes('--check');
if (checkOnly) {
  assert.deepEqual(files('after').map(p => p.slice(6)), Object.keys(expected).sort());
  for (const [p, content] of Object.entries(expected)) assert.equal(read(`after/${p}`), content, p);
  assert.equal(read('changes.diff'), diff);
  const receipt = JSON.parse(read('receipt.json'));
  assert.deepEqual(receipt.immutable_sha256, immutable);
  assert.equal(receipt.diff_sha256, hash(diff));
  assert.deepEqual(receipt.after_sha256, Object.fromEntries(Object.keys(expected).sort().map(p => [p, hash(expected[p])])));
} else {
  for (const [p, content] of Object.entries(expected)) {
    fs.mkdirSync(path.dirname(path.join(root, 'after', p)), { recursive: true });
    fs.writeFileSync(path.join(root, 'after', p), content);
  }
  fs.writeFileSync(path.join(root, 'changes.diff'), diff);
  const receipt = {
    executed_at_utc: new Date().toISOString(), node_version: process.version,
    kind: 'deterministic-approved-file-correction', model_invoked: false,
    semantic_review: 'presenter-authored source comparison; script does not establish truth',
    source_note_count: files('source-notes').length, before_page_count: Object.keys(initial).length,
    after_page_count: Object.keys(expected).length, changed_page_count: changed.length,
    created_page_count: changed.filter(p => !Object.hasOwn(initial, p)).length,
    local_link_count: linkCount, immutable_sha256: immutable,
    after_sha256: Object.fromEntries(Object.keys(expected).sort().map(p => [p, hash(expected[p])])),
    diff_sha256: hash(diff),
    checks: ['approved operations applied', 'local links resolve', 'source notes and before snapshot unchanged']
  };
  fs.writeFileSync(path.join(root, 'receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
}
for (const [p, digest] of Object.entries(immutable)) assert.equal(hash(read(p)), digest, p);
console.log(JSON.stringify({status:'pass', mode:checkOnly?'check':'apply', model_invoked:false,
  changed_pages:changed.length, created_pages:changed.filter(p => !Object.hasOwn(initial,p)).length,
  after_pages:Object.keys(expected).length, local_links:linkCount, immutable_files:immutablePaths.length,
  diff_sha256:hash(diff)}, null, 2));
