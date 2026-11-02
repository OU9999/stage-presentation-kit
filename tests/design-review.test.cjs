'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { RUNTIME } = require('../scripts/runtime.cjs');
const { sha256, collectInputs, createDraft, checkRecord } = require('../scripts/design-review.cjs');
const repo = path.resolve(__dirname, '..');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
const size = { width: 1440, height: 1000, devicePixelRatio: 1 };
const source = 'talks/new-topic/slides.md';
function write(root, name, bytes) {
  fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
  fs.writeFileSync(path.join(root, name), bytes);
}
function json(root, name, value) { write(root, name, JSON.stringify(value, null, 2)); }
function file(root, name) { return { path: name, sha256: sha256(fs.readFileSync(path.join(root, name))) }; }
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-review-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const inputs = [...RUNTIME, 'DESIGN.md', 'package.json', 'package-lock.json', 'templates/presentation.html', 'templates/material.html', 'templates/materials.css'];
  for (const entry of fs.readdirSync(path.join(repo, 'scripts'))) if (entry.endsWith('.cjs')) inputs.push('scripts/' + entry);
  for (const name of inputs) write(root, name, fs.readFileSync(path.join(repo, name)));
  json(root, 'stage.config.json', { sourceDir: 'talks', outputDir: 'out', theme: 'stage' });
  write(root, source, '# 새 발표\n\n![읽을 그림](assets/figure.svg)\n\n---\n\n# 다음 행동\n\n작은 시도부터 시작합니다.\n');
  write(root, 'talks/new-topic/assets/figure.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>');
  write(root, 'talks/new-topic/materials/guide.md', '# 보조자료\n\n[로컬 자료](../assets/detail.txt)\n');
  write(root, 'talks/new-topic/assets/detail.txt', '의미 있는 보존 자료');
  write(root, 'talks/new-topic/README.md', '빌드에서 참조하지 않는 안내');
  const record = createDraft({ repoRoot: root, source, mode: 'presentation-stage-only', viewport: size });
  const manifest = { revision: record.source.sha256, hashes: { [source]: record.source.sha256, 'DESIGN.md': record.design.sha256 }, captureMode: 'presentation-stage-only', observations: [1, 2].map(slide => ({ index: String(slide - 1), filename: '/original/machine/slide-' + slide + '.png', viewport: size, stage: { width: 1, height: 1 }, revision: record.source.sha256 })) };
  json(root, 'evidence/manifest.json', manifest);
  for (const slide of [1, 2]) write(root, 'evidence/slide-' + slide + '.png', png);
  record.capture = { designSha256: record.design.sha256, inputs: { ...record.inputs, 'DESIGN.md': record.design.sha256 }, manifest: file(root, 'evidence/manifest.json'), evidence: [1, 2].map(slide => ({ ...file(root, 'evidence/slide-' + slide + '.png'), slides: [slide], mode: 'presentation-stage-only', viewport: size })) };
  record.reviews = record.reviews.map((item, index) => ({ ...item, status: index ? 'needs-changes' : 'approved', reviewer: '직접 검토자', reviewedAt: '2026-11-02', reason: index ? '보조자료 링크와 첫 행동의 위계가 같은 크기로 보임' : '큰 제목 뒤 그림의 관계가 한 방향으로 읽힘', evidence: ['evidence/slide-' + (index + 1) + '.png'], owner: '다음 발표 수정 담당', nextAction: '내용을 보존하고 읽는 순서를 고친 뒤 다시 캡처' }));
  return { root, record, check: (options = {}) => checkRecord({ repoRoot: root, source, record, ...options }) };
}

test('new decks auto-collect actual assets/materials and separate review validity from approval', t => {
  const f = fixture(t);
  assert.ok(f.record.inputs['talks/new-topic/assets/figure.svg']);
  assert.ok(f.record.inputs['talks/new-topic/assets/detail.txt']);
  assert.ok(f.record.inputs['scripts/markdown-deck.cjs']);
  assert.ok(f.record.inputs['templates/presentation.html']);
  assert.equal(f.record.inputs['talks/new-topic/README.md'], undefined);
  assert.deepEqual(f.check().counts, { approved: 1, 'needs-changes': 1, unreviewed: 0 });
  assert.equal(f.check().passed, true);
  assert.equal(f.check({ requireApproved: true }).passed, false);
  f.record.reviews[1].status = 'approved';
  assert.equal(f.check({ requireApproved: true }).passed, true);
});

for (const [label, name] of [['manuscript', source], ['SVG', 'talks/new-topic/assets/figure.svg'], ['runtime', 'app.js'], ['DESIGN', 'DESIGN.md'], ['build helper', 'scripts/markdown-deck.cjs'], ['template', 'templates/presentation.html']]) {
  test(label + ' changes invalidate the prior review even when other inputs match', t => {
    const f = fixture(t);
    fs.appendFileSync(path.join(f.root, name), '\nchanged');
    assert.throws(() => f.check(), /stale/);
  });
}

test('record author cannot omit mandatory local assets, runtime or new build inputs', t => {
  const f = fixture(t);
  delete f.record.inputs['talks/new-topic/assets/figure.svg'];
  assert.throws(() => f.check(), /필수 입력 누락/);
  f.record.inputs = collectInputs({ repoRoot: f.root, source }).inputs;
  write(f.root, 'scripts/new-build-helper.cjs', '// new rendering input');
  assert.throws(() => f.check(), /필수 입력 누락/);
});

test('missing and tampered screenshot/manifest fail with intact manuscript', t => {
  const f = fixture(t);
  write(f.root, 'evidence/slide-1.png', Buffer.concat([png, Buffer.from('tampered')]));
  assert.throws(() => f.check(), /stale 또는 변조/);
  write(f.root, 'evidence/slide-1.png', png);
  fs.rmSync(path.join(f.root, 'evidence/slide-1.png'));
  assert.throws(() => f.check(), /파일 누락/);
  write(f.root, 'evidence/slide-1.png', png);
  fs.appendFileSync(path.join(f.root, 'evidence/manifest.json'), ' ');
  assert.throws(() => f.check(), /stale 또는 변조/);
});

test('scope, reviewer, reason and each screenshot must correspond to the decision', t => {
  const f = fixture(t);
  const saved = structuredClone(f.record);
  f.record.reviews[0].viewport = { ...size, width: 960 };
  assert.throws(() => f.check(), /scope/);
  Object.assign(f.record, structuredClone(saved));
  f.record.reviews[0].evidence = ['evidence/slide-2.png'];
  assert.throws(() => f.check(), /대응/);
  Object.assign(f.record, structuredClone(saved));
  f.record.reviews[0].reviewer = '';
  assert.throws(() => f.check(), /검토자/);
  Object.assign(f.record, structuredClone(saved));
  f.record.reviews[1].reason = '';
  assert.throws(() => f.check(), /구체 이유/);
  Object.assign(f.record, structuredClone(saved));
  f.record.reviews.pop();
  assert.throws(() => f.check(), /판정이 없는/);
});

test('unreviewed drafts have no automatic approval or invented reasons and remain incomplete', t => {
  const f = fixture(t);
  const draft = createDraft({ repoRoot: f.root, source, mode: 'read', viewport: size });
  assert.ok(draft.reviews.every(item => item.status === 'unreviewed' && !item.reason && !item.reviewer));
  const result = f.check({ record: draft });
  assert.equal(result.valid, true);
  assert.equal(result.reviewedComplete, false);
  assert.equal(result.passed, false);
  assert.equal(result.approved, false);
  for (const slides of ['2-1', '1-999999999999', '0', '3', '1,1']) assert.throws(() => createDraft({ repoRoot: f.root, source, mode: 'read', viewport: size, slides }), /slides/);
});

test('DESIGN-only rereview preserves capture criterion and requires explicit manual rereview', t => {
  const f = fixture(t);
  const oldDesign = f.record.capture.designSha256;
  fs.appendFileSync(path.join(f.root, 'DESIGN.md'), '\n새 기준');
  f.record.design = file(f.root, 'DESIGN.md');
  assert.throws(() => f.check(), /직접 재검토/);
  f.record.reReview = { reviewer: '새 기준으로 직접 읽은 사람', reviewedAt: '2026-11-02', reason: '제품 입력은 그대로이며 새 기준의 주역·읽는 순서로 기존 화면을 다시 판단함' };
  assert.equal(f.check().passed, true);
  assert.equal(f.record.capture.designSha256, oldDesign);
  f.record.capture.designSha256 = f.record.design.sha256;
  assert.throws(() => f.check(), /캡처 당시 DESIGN/);
});

test('capture input gaps need actual Git bytes, not author assertions', t => {
  const f = fixture(t);
  const git = (...args) => execFileSync('git', args, { cwd: f.root, stdio: 'pipe' });
  git('init'); git('add', '.'); git('-c', 'user.name=Review fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'capture');
  const revision = git('rev-parse', 'HEAD').toString().trim();
  const name = 'templates/presentation.html';
  const hash = f.record.capture.inputs[name];
  delete f.record.capture.inputs[name];
  assert.throws(() => f.check(), /미확인 캡처 입력/);
  f.record.capture.supplemental = { revision, inputs: { [name]: hash } };
  assert.equal(f.check().passed, true);
  fs.appendFileSync(path.join(f.root, name), '\nchanged after capture');
  f.record.inputs = collectInputs({ repoRoot: f.root, source }).inputs;
  f.record.capture.supplemental.inputs[name] = f.record.inputs[name];
  assert.throws(() => f.check(), /캡처 HEAD와 현재/);
});

test('operational npm scripts and unreferenced README do not stale render input, dependency drift does', t => {
  const f = fixture(t);
  const packageInfo = JSON.parse(fs.readFileSync(path.join(f.root, 'package.json'), 'utf8'));
  packageInfo.scripts['new-local-check'] = 'node local.cjs';
  json(f.root, 'package.json', packageInfo);
  write(f.root, 'talks/new-topic/README.md', '안내 수정');
  assert.equal(f.check().passed, true);
  packageInfo.dependencies.yaml = '0.0.1';
  json(f.root, 'package.json', packageInfo);
  assert.throws(() => f.check(), /package.json과 lock/);
  packageInfo.dependencies.yaml = JSON.parse(fs.readFileSync(path.join(f.root, 'package-lock.json'), 'utf8')).packages[''].dependencies.yaml;
  packageInfo.devDependencies = { 'unlocked-build-helper': '1.0.0' };
  json(f.root, 'package.json', packageInfo);
  assert.throws(() => f.check(), /devDependencies/);
});

test('manual audit source and historical input manifest cannot be removed or silently rewritten', t => {
  const f = fixture(t);
  write(f.root, 'audit.md', '두 화면의 직접 판정');
  f.record.reviewSource = file(f.root, 'audit.md');
  json(f.root, 'evidence/inputs.json', f.record.capture.inputs);
  f.record.capture.inputManifest = file(f.root, 'evidence/inputs.json');
  assert.equal(f.check().passed, true);
  f.record.capture.inputs['DESIGN.md'] = 'a'.repeat(64);
  assert.throws(() => f.check(), /이력은/);
  f.record.capture.inputs['DESIGN.md'] = f.record.design.sha256;
  write(f.root, 'audit.md', '검토 후 변경된 감사');
  assert.throws(() => f.check(), /stale 또는 변조/);
  fs.rmSync(path.join(f.root, 'audit.md'));
  assert.throws(() => f.check(), /파일 누락/);
});

test('stage screenshot dimensions account for declared DPR', t => {
  const f = fixture(t);
  const manifest = JSON.parse(fs.readFileSync(path.join(f.root, 'evidence/manifest.json'), 'utf8'));
  const retina = { ...size, devicePixelRatio: 2 };
  f.record.scope[0].viewport = retina;
  for (const item of [...f.record.reviews, ...f.record.capture.evidence]) item.viewport = retina;
  for (const observation of manifest.observations) { observation.viewport = retina; observation.stage = { width: 0.5, height: 0.5 }; }
  json(f.root, 'evidence/manifest.json', manifest);
  f.record.capture.manifest = file(f.root, 'evidence/manifest.json');
  assert.equal(f.check().passed, true);
  manifest.observations[0].stage.width = 1;
  json(f.root, 'evidence/manifest.json', manifest);
  f.record.capture.manifest = file(f.root, 'evidence/manifest.json');
  assert.throws(() => f.check(), /크기\/DPR/);
});

test('declared supporting boards preserve file existence and bytes without a visual verdict', t => {
  const f = fixture(t);
  write(f.root, 'evidence/contact.jpg', 'supporting board bytes');
  f.record.capture.supportingEvidence = [file(f.root, 'evidence/contact.jpg')];
  assert.equal(f.check().passed, true);
  write(f.root, 'evidence/contact.jpg', 'changed board bytes');
  assert.throws(() => f.check(), /stale 또는 변조/);
  fs.rmSync(path.join(f.root, 'evidence/contact.jpg'));
  assert.throws(() => f.check(), /파일 누락/);
});
