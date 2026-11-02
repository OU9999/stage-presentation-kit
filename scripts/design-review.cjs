#!/usr/bin/env node
'use strict';

// This checks review provenance, never visual quality. Reuse the build's parsers
// so a second, incomplete Markdown reference parser cannot omit render inputs.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { parseDocument, collectReferences } = require('./markdown-document.cjs');
const { parseMaterial, renderMaterial } = require('./materials.cjs');
const { RUNTIME, TEMPLATE } = require('./runtime.cjs');
const FORMAT = 'stage-design-review-v1';
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const nonempty = value => typeof value === 'string' && Boolean(value.trim());
const digest = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const inside = (root, file) => file.startsWith(root + path.sep);
function need(condition, message) { if (!condition) throw new Error(message); }
function local(root, name) {
  need(nonempty(name) && !path.isAbsolute(name), '저장소 상대 경로가 필요합니다: ' + name);
  const file = path.resolve(root, name);
  need(inside(root, file), '저장소 밖 경로: ' + name);
  need(fs.existsSync(file) && fs.statSync(file).isFile(), '파일 누락: ' + name);
  need(inside(root, fs.realpathSync(file)), '저장소 밖 실제 경로: ' + name);
  return file;
}
const relative = (root, file) => path.relative(root, file).split(path.sep).join('/');
function fingerprint(root, name) { return sha256(fs.readFileSync(local(root, name))); }
function verifyFile(root, item, label) {
  need(item && digest(item.sha256), label + ': SHA256이 필요합니다.');
  need(fingerprint(root, item.path) === item.sha256, 'stale 또는 변조: ' + item.path);
}
function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(root, entry.name);
    need(!entry.isSymbolicLink(), '입력 심볼릭 링크는 지원하지 않습니다: ' + file);
    return entry.isDirectory() ? walk(file) : entry.isFile() ? [file] : [];
  });
}

function collectInputs({ repoRoot, source }) {
  const root = fs.realpathSync(repoRoot);
  const sourceFile = local(root, source);
  need(path.basename(sourceFile) === 'slides.md', '--source는 Markdown 정본 slides.md여야 합니다.');
  const files = new Set(RUNTIME.concat([TEMPLATE, 'templates/material.html', 'templates/materials.css', 'package-lock.json']));
  // npm commands/README metadata do not render slides. The lock fingerprints
  // dependencies and engines; reject package.json drift from that locked input.
  const packageInfo = JSON.parse(fs.readFileSync(local(root, 'package.json'), 'utf8'));
  const locked = JSON.parse(fs.readFileSync(local(root, 'package-lock.json'), 'utf8')).packages?.[''];
  for (const key of ['dependencies', 'optionalDependencies', 'devDependencies', 'peerDependencies', 'peerDependenciesMeta', 'engines']) {
    need(JSON.stringify(packageInfo[key] || {}) === JSON.stringify(locked?.[key] || {}), 'package.json과 lock의 ' + key + '가 다릅니다.');
  }
  // Conservative build-code closure: new build helpers also invalidate old reviews.
  for (const file of walk(path.join(root, 'scripts'))) {
    if (/\.(?:cjs|mjs|js)$/.test(file) && path.basename(file) !== 'design-review.cjs') files.add(relative(root, file));
  }
  let configFile;
  for (let directory = path.dirname(sourceFile); directory !== path.dirname(root); directory = path.dirname(directory)) {
    const candidate = path.join(directory, 'stage.config.json');
    if (fs.existsSync(candidate)) { configFile = candidate; break; }
  }
  need(configFile, '대상 원고의 stage.config.json을 찾을 수 없습니다.');
  files.add(relative(root, configFile));
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const sourceRoot = path.resolve(path.dirname(configFile), config.sourceDir || 'talks');
  need(inside(sourceRoot, sourceFile), '원고가 설정의 sourceDir 밖에 있습니다.');
  const visited = new Set();
  let slideCount;
  function reference(owner, value) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return;
    const target = path.resolve(path.dirname(owner), decodeURIComponent(value.split(/[?#]/)[0]));
    const name = relative(root, target);
    local(root, name); files.add(name);
    if (/\.md$/i.test(target)) visit(target);
  }
  function visit(file) {
    if (visited.has(file)) return;
    visited.add(file); files.add(relative(root, file));
    const text = fs.readFileSync(file, 'utf8');
    if (path.basename(file) === 'slides.md') {
      const deck = parseDocument(text, { sourcePath: relative(root, file), theme: config.theme || 'stage' });
      if (file === sourceFile) slideCount = deck.slides.length;
      for (const ref of collectReferences(deck)) reference(file, ref.owner[ref.key]);
      const materials = path.join(path.dirname(file), 'materials');
      if (fs.existsSync(materials)) {
        for (const entry of fs.readdirSync(materials, { withFileTypes: true })) {
          if (entry.isFile() && /\.md$/i.test(entry.name)) visit(path.join(materials, entry.name));
        }
      }
    } else {
      const material = parseMaterial(text, { sourcePath: relative(root, file) });
      renderMaterial(material, value => { reference(file, value); return value; });
    }
  }
  visit(sourceFile);
  return { inputs: Object.fromEntries([...files].sort().map(name => [name, fingerprint(root, name)])), slideCount };
}

function viewport(value) {
  need(value && ['width', 'height', 'devicePixelRatio'].every(key => Number.isFinite(value[key]) && value[key] > 0), 'viewport width/height/devicePixelRatio가 필요합니다.');
  return [value.width, value.height, value.devicePixelRatio].join('x');
}
function scopeKey(slide, mode, size) {
  need(Number.isInteger(slide) && slide > 0 && nonempty(mode), '유효한 장/모드가 필요합니다.');
  return slide + ':' + mode + ':' + viewport(size);
}
function identity(item, label) {
  need(item && nonempty(item.reviewer) && nonempty(item.reason) && nonempty(item.reviewedAt) && Number.isFinite(Date.parse(item.reviewedAt)), label + ': 검토자·검토시점·구체 이유가 필요합니다.');
}

function checkRecord({ repoRoot, source, record, requireApproved = false }) {
  const root = fs.realpathSync(repoRoot);
  need(record && record.format === FORMAT, '지원하지 않는 검토 기록 형식입니다.');
  need(record.source?.path === source, '--source와 기록의 대상이 다릅니다.');
  verifyFile(root, record.source, 'source');
  need(record.design?.path === 'DESIGN.md', '현재 기준은 DESIGN.md여야 합니다.');
  verifyFile(root, record.design, 'design');
  if (record.reviewSource) verifyFile(root, record.reviewSource, '수동 검토 원문');
  const current = collectInputs({ repoRoot: root, source });
  need(record.inputs && typeof record.inputs === 'object', '필수 입력 fingerprints가 없습니다.');
  for (const [name, hash] of Object.entries(current.inputs)) {
    need(record.inputs[name] === hash, 'stale 또는 필수 입력 누락: ' + name);
  }
  for (const [name, hash] of Object.entries(record.inputs)) {
    need(digest(hash) && fingerprint(root, name) === hash, 'stale 입력: ' + name);
  }
  const scoped = new Set();
  need(Array.isArray(record.scope) && record.scope.length > 0, '검토 scope가 필요합니다.');
  for (const scope of record.scope) {
    need(Array.isArray(scope.slides) && scope.slides.length > 0, 'scope 장 목록이 필요합니다.');
    for (const slide of scope.slides) {
      need(slide <= current.slideCount, '원고에 없는 scope 장: ' + slide);
      const key = scopeKey(slide, scope.mode, scope.viewport);
      need(!scoped.has(key), '중복 scope: ' + key); scoped.add(key);
    }
  }
  const counts = { approved: 0, 'needs-changes': 0, unreviewed: 0 };
  const reviewed = new Set();
  need(Array.isArray(record.reviews), 'reviews 목록이 필요합니다.');
  const completed = record.reviews.some(item => item.status !== 'unreviewed');
  const evidence = new Map();
  if (completed || record.capture) {
    const capture = record.capture;
    need(capture && digest(capture.designSha256), '캡처 당시 DESIGN hash가 필요합니다.');
    verifyFile(root, capture.manifest, 'capture manifest');
    if (capture.supportingEvidence !== undefined) {
      need(Array.isArray(capture.supportingEvidence), '보조 근거는 목록이어야 합니다.');
      for (const item of capture.supportingEvidence) verifyFile(root, item, '보조 근거');
    }
    const manifest = JSON.parse(fs.readFileSync(local(root, capture.manifest.path), 'utf8'));
    need(manifest.hashes?.['DESIGN.md'] === capture.designSha256, '캡처 당시 DESIGN hash와 manifest가 다릅니다.');
    need(manifest.revision === record.source.sha256, 'stale 캡처 원고 revision');
    need(capture.inputs && typeof capture.inputs === 'object', '캡처 당시 입력이 필요합니다.');
    if (capture.inputManifest) {
      verifyFile(root, capture.inputManifest, 'capture input manifest');
      const historical = JSON.parse(fs.readFileSync(local(root, capture.inputManifest.path), 'utf8'));
      need(JSON.stringify(Object.entries(historical).sort()) === JSON.stringify(Object.entries(capture.inputs).sort()), '캡처 입력 이력은 input manifest 그대로 보존해야 합니다.');
      need(historical['DESIGN.md'] === capture.designSha256, '캡처 기준 이력이 다릅니다.');
    }
    for (const [name, hash] of Object.entries(manifest.hashes || {})) {
      need(capture.inputs[name] === hash, 'manifest와 캡처 입력 이력이 다릅니다: ' + name);
    }
    for (const [name, hash] of Object.entries(current.inputs)) {
      if (capture.inputs[name] === hash) continue;
      const proof = capture.supplemental;
      need(capture.inputs[name] === undefined && proof?.inputs?.[name] === hash && /^[a-f0-9]{7,40}$/.test(proof.revision || ''), 'stale 또는 미확인 캡처 입력: ' + name);
      let bytes;
      try { bytes = execFileSync('git', ['show', proof.revision + ':' + name], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] }); }
      catch (_) { throw new Error('캡처 HEAD 보강 근거를 확인할 수 없습니다: ' + name); }
      need(sha256(bytes) === hash, '캡처 HEAD와 현재 입력이 다릅니다: ' + name);
    }
    if (capture.designSha256 !== record.design.sha256) identity(record.reReview, '새 DESIGN 직접 재검토');
    need(Array.isArray(capture.evidence), '화면 근거 목록이 필요합니다.');
    for (const item of capture.evidence) {
      verifyFile(root, item, '화면 근거');
      const bytes = fs.readFileSync(local(root, item.path));
      need(bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')), '화면 근거는 실제 PNG여야 합니다: ' + item.path);
      need(!evidence.has(item.path), '중복 화면 근거: ' + item.path);
      need(Array.isArray(item.slides) && item.slides.length === 1, '장별 원본 PNG 한 개를 연결하세요.');
      const key = scopeKey(item.slides[0], item.mode, item.viewport);
      need(scoped.has(key), 'scope 밖 화면 근거: ' + key);
      const observation = manifest.observations?.find(value => Number(value.index) + 1 === item.slides[0]);
      need(observation && item.mode === manifest.captureMode && viewport(observation.viewport) === viewport(item.viewport), 'manifest와 화면 scope가 다릅니다: ' + item.path);
      need(path.resolve(root, item.path) === path.resolve(path.dirname(local(root, capture.manifest.path)), path.basename(observation.filename || '')), 'manifest와 PNG 경로가 다릅니다: ' + item.path);
      need(observation.revision === record.source.sha256, '화면 원고 revision 불일치');
      if (item.mode === 'presentation-stage-only') need(bytes.readUInt32BE(16) === Math.round(observation.stage?.width * item.viewport.devicePixelRatio) && bytes.readUInt32BE(20) === Math.round(observation.stage?.height * item.viewport.devicePixelRatio), 'PNG와 stage 측정 크기/DPR이 다릅니다.');
      evidence.set(item.path, key);
    }
  }
  for (const item of record.reviews) {
    const key = scopeKey(item.slide, item.mode, item.viewport);
    need(scoped.has(key) && !reviewed.has(key), 'scope 불일치 또는 중복 판정: ' + key);
    reviewed.add(key);
    need(Object.hasOwn(counts, item.status), '판정은 approved/needs-changes/unreviewed여야 합니다.');
    counts[item.status]++;
    if (item.status === 'unreviewed') {
      need(nonempty(item.owner) && nonempty(item.nextAction), '미확인 범위의 담당·다음 행동이 필요합니다.');
    } else {
      identity(item, key);
      need(Array.isArray(item.evidence) && item.evidence.length > 0 && item.evidence.every(name => evidence.get(name) === key), '판정과 실제 화면 근거가 대응하지 않습니다: ' + key);
      if (item.status === 'needs-changes') need(nonempty(item.owner) && nonempty(item.nextAction), '개선 필요의 담당·교정 행동이 필요합니다.');
    }
  }
  need(reviewed.size === scoped.size, 'scope에 판정이 없는 장이 있습니다.');
  const reviewedComplete = counts.unreviewed === 0;
  const approved = counts.approved === scoped.size;
  return { valid: true, reviewedComplete, approved, passed: reviewedComplete && (!requireApproved || approved), counts, scopeCount: scoped.size, slideCount: current.slideCount };
}

function createDraft({ repoRoot, source, slides, mode, viewport: size, owner = '미배정' }) {
  repoRoot = fs.realpathSync(repoRoot);
  const current = collectInputs({ repoRoot, source });
  let chosen = slides || Array.from({ length: current.slideCount }, (_, index) => index + 1);
  if (typeof chosen === 'string') {
    const range = /^(\d+)-(\d+)$/.exec(chosen);
    if (range) {
      const first = Number(range[1]); const last = Number(range[2]);
      need(first >= 1 && first <= last && last <= current.slideCount, '--slides 범위가 원고와 맞지 않습니다.');
      chosen = Array.from({ length: last - first + 1 }, (_, index) => first + index);
    } else chosen = chosen.split(',').map(Number);
  }
  need(Array.isArray(chosen) && chosen.length > 0 && chosen.every(slide => Number.isInteger(slide) && slide > 0 && slide <= current.slideCount) && new Set(chosen).size === chosen.length, '--slides는 중복 없는 실제 원고 장이어야 합니다.');
  viewport(size); need(nonempty(mode), '--mode가 필요합니다.');
  return { format: FORMAT, source: { path: source, sha256: fingerprint(repoRoot, source) }, design: { path: 'DESIGN.md', sha256: fingerprint(repoRoot, 'DESIGN.md') }, inputs: current.inputs, scope: [{ slides: chosen, mode, viewport: size }], capture: null, reviews: chosen.map(slide => ({ slide, mode, viewport: size, status: 'unreviewed', owner, nextAction: '현재 화면을 캡처하고 DESIGN에 따라 직접 검토한 뒤 검토자·시점·이유·근거를 기록' })) };
}

module.exports = { FORMAT, sha256, collectInputs, createDraft, checkRecord };
if (require.main === module) {
  try {
    const args = process.argv.slice(2); const command = args.shift(); const options = {};
    while (args.length) {
      const name = args.shift();
      if (name === '--require-approved') options.requireApproved = true;
      else { need(['--source', '--record', '--slides', '--mode', '--viewport', '--dpr', '--owner'].includes(name) && args.length, '알 수 없거나 값이 없는 옵션: ' + name); options[name.slice(2)] = args.shift(); }
    }
    need(['draft', 'check'].includes(command) && options.source && options.record, '사용법: node scripts/design-review.cjs draft|check --source talks/<id>/slides.md --record review.json [draft --mode presentation-stage-only --viewport 1440x1000 --slides 1-26] [check --require-approved]');
    const repoRoot = fs.realpathSync(path.join(__dirname, '..'));
    const recordFile = path.resolve(repoRoot, options.record);
    need(inside(repoRoot, recordFile), '기록은 저장소 안에 저장하세요.');
    if (command === 'draft') {
      need(!options.requireApproved, 'draft는 승인을 생성하지 않습니다.');
      const dimensions = /^(\d+)x(\d+)$/.exec(options.viewport || '');
      need(dimensions, '--viewport WIDTHxHEIGHT가 필요합니다.');
      const record = createDraft({ ...options, repoRoot, viewport: { width: Number(dimensions[1]), height: Number(dimensions[2]), devicePixelRatio: Number(options.dpr || 1) } });
      checkRecord({ repoRoot, source: options.source, record });
      fs.mkdirSync(path.dirname(recordFile), { recursive: true });
      fs.writeFileSync(recordFile, JSON.stringify(record, null, 2) + '\n', { flag: 'wx' });
      process.stdout.write('미확인 초안 생성: ' + options.record + ' (승인 없음)\n');
    } else {
      const result = checkRecord({ repoRoot, source: options.source, record: JSON.parse(fs.readFileSync(recordFile, 'utf8')), requireApproved: options.requireApproved });
      process.stdout.write('기록 최신성·범위 유효 · 검토 ' + (result.reviewedComplete ? '완료' : '미완료') + ': 승인 ' + result.counts.approved + ' · 개선 필요 ' + result.counts['needs-changes'] + ' · 미확인 ' + result.counts.unreviewed + ' (' + result.scopeCount + '개 장/모드/viewport 범위, 원고 ' + result.slideCount + '장)\n');
      process.stdout.write('제품 시각 승인: ' + (result.approved ? '명시 범위 승인' : '완료되지 않음') + '\n');
      if (!result.passed) process.exitCode = 1;
    }
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
