'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const cp = require('node:child_process');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { buildSite } = require('../scripts/build-site.cjs');
const { buildProject } = require('../scripts/stage.cjs');
const { RUNTIME, loadTemplate } = require('../scripts/runtime.cjs');
const { collectReferences } = require('../scripts/markdown-document.cjs');
const repo = path.resolve(__dirname, '..');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const walk = p => fs.readdirSync(p, { withFileTypes: true }).flatMap(x => x.isDirectory() ? walk(path.join(p, x.name)) : [path.join(p, x.name)]);
const snapshot = p => Object.fromEntries(walk(p).sort().map(f => [path.relative(p, f), hash(fs.readFileSync(f))]));
const sourcePaths = root => walk(path.join(root, 'talks')).filter(f => path.basename(f) === 'slides.md').map(f => path.relative(root, f).split(path.sep).join('/')).sort();
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-site-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const file of [...RUNTIME, 'content.js', 'index.html', 'package.json', 'stage.config.json']) fs.copyFileSync(path.join(repo, file), path.join(directory, file));
  for (const folder of ['templates', 'scripts', 'talks', 'assets', 'examples', 'starters']) fs.cpSync(path.join(repo, folder), path.join(directory, folder), { recursive: true });
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
  return fs.realpathSync(directory);
}
function readDeck(file) {
  const scope = { window: {} }; vm.runInNewContext(fs.readFileSync(file, 'utf8'), scope);
  return JSON.parse(JSON.stringify(scope.window.PRESENTATION));
}
function published(root) {
  return Object.fromEntries(['index.html', 'examples', 'presentations', 'starters/markdown/presentations'].flatMap(name => {
    const file = path.join(root, name);
    return (fs.statSync(file).isDirectory() ? walk(file) : [file]).map(f => [path.relative(root, f), hash(fs.readFileSync(f))]);
  }).sort(([a], [b]) => a.localeCompare(b)));
}

test('one site build updates root, both legacy copies, both Markdown projects and is reproducible', t => {
  const root = fixture(t), css = path.join(root, 'blocks.css');
  fs.appendFileSync(css, '\n/* shared site change */\n');
  const result = buildSite({ repoRoot: root });
  assert.equal(result.examples, 8); assert.deepEqual(result.projects.map(x => x.decks), [sourcePaths(root).length, 1]);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'presentations/manifest.json'), 'utf8')).decks.map(x => x.source).sort(), sourcePaths(root));
  const source = fs.readFileSync(css);
  for (const folder of ['examples/visual-starter/runtime', 'examples/text-layout/runtime', 'presentations/_runtime', 'starters/markdown/presentations/_runtime']) assert.deepEqual(fs.readFileSync(path.join(root, folder, 'blocks.css')), source);
  assert(fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('blocks.css?v=' + hash(source).slice(0, 12)));
  assert.deepEqual(buildSite({ repoRoot: root, check: true }).differences, []);
  const before = published(root); buildSite({ repoRoot: root }); assert.deepEqual(published(root), before);
});

test('verification detects stale source/runtime, missing and unexpected generated files without repairing them', t => {
  const root = fixture(t); buildSite({ repoRoot: root });
  const runtime = path.join(root, 'blocks.css'); fs.appendFileSync(runtime, '\n/* unpublished design change */\n');
  const input = path.join(root, 'talks/photo-essay/slides.md'); fs.appendFileSync(input, '\n\n추가한 작성 문장입니다.\n');
  fs.rmSync(path.join(root, 'presentations/photo-essay/read.html'));
  const extra = path.join(root, 'presentations/obsolete.txt'); fs.writeFileSync(extra, 'stale output');
  const before = published(root);
  const timestamps = () => Object.fromEntries(Object.keys(before).map(file => [file, fs.statSync(path.join(root, file)).mtimeMs]));
  const beforeTimes = timestamps();
  const result = buildSite({ repoRoot: root, check: true });
  const relative = result.differences.map(x => ({ ...x, file: path.relative(root, x.file) }));
  assert(relative.some(x => x.file === 'index.html' && x.reason === 'changed'));
  assert(relative.some(x => x.file === 'examples/visual-starter/runtime/blocks.css'));
  assert(relative.some(x => x.file === 'presentations/photo-essay/content.js'));
  assert(relative.some(x => x.file === 'presentations/photo-essay/read.html' && x.reason === 'missing'));
  assert(relative.some(x => x.file === 'presentations/obsolete.txt' && x.reason === 'unexpected'));
  assert.deepEqual(published(root), before);
  assert.deepEqual(timestamps(), beforeTimes);
  const cli = cp.spawnSync(process.execPath, [path.join(root, 'scripts/build-site.cjs'), 'verify'], { encoding: 'utf8' });
  assert.equal(cli.status, 1); assert.match(cli.stderr, /npm run build:site/); assert.deepEqual(published(root), before);
  assert.deepEqual(timestamps(), beforeTimes);
  buildSite({ repoRoot: root }); assert.deepEqual(buildSite({ repoRoot: root, check: true }).differences, []); assert.equal(fs.existsSync(extra), false);
});

test('new and legacy Markdown use the canonical template independently of the public root page', t => {
  const root = fixture(t); fs.writeFileSync(path.join(root, 'index.html'), '<!doctype html><title>다른 첫 화면</title>');
  const result = buildProject({ repoRoot: root, configPath: path.join(root, 'stage.config.json') });
  assert.deepEqual(result.manifest.decks.map(x => x.source).sort(), sourcePaths(root));
  assert.match(fs.readFileSync(path.join(root, 'presentations/photo-essay/index.html'), 'utf8'), /id="helpDialog"/);
  const { buildExamples } = require('../scripts/build-examples.cjs'); buildExamples({ repoRoot: root });
  assert.match(fs.readFileSync(path.join(root, 'examples/product-launch/index.html'), 'utf8'), /id="slideStage"/);
  assert.match(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), /다른 첫 화면/);
  assert.match(loadTemplate(root), /id="slideStage"/);
});

test('invalid source preflight preserves every previous site output including root and standalone copies', t => {
  const root = fixture(t); buildSite({ repoRoot: root }); const before = published(root);
  fs.appendFileSync(path.join(root, 'blocks.css'), '\n/* pending runtime change */\n');
  fs.appendFileSync(path.join(root, 'talks/photo-essay/slides.md'), '\n\n![누락](./not-there.svg)\n');
  assert.throws(() => buildSite({ repoRoot: root }), /참조 파일/);
  assert.deepEqual(published(root), before);
});

test('the Markdown starter copies and moves independently with source-owned assets and complete read output', t => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-starter-test-')); t.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const root = path.join(parent, 'first project'); fs.cpSync(path.join(repo, 'starters/markdown'), root, { recursive: true });
  const build = directory => buildProject({ repoRoot: repo, configPath: path.join(directory, 'stage.config.json') });
  build(root); const before = snapshot(path.join(root, 'presentations'));
  const moved = path.join(parent, 'moved project'); fs.renameSync(root, moved); build(moved);
  assert.deepEqual(snapshot(path.join(moved, 'presentations')), before);
  const deck = readDeck(path.join(moved, 'presentations/my-talk/content.js')); assert.equal(deck.slides.length, 6);
  const refs = collectReferences(deck); assert(refs.length >= 6);
  for (const ref of refs) assert(fs.existsSync(path.resolve(moved, 'presentations/my-talk', ref.owner[ref.key])));
  for (const file of walk(path.join(moved, 'presentations')).filter(x => x.endsWith('.html'))) for (const match of fs.readFileSync(file, 'utf8').matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(match[1])) continue;
    assert(fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(match[1].split(/[?#]/)[0]))));
  }
  const source = path.join(moved, 'talks/my-talk/slides.md'); fs.appendFileSync(source, '\n\n새 원고의 마무리 문장입니다.\n'); build(moved);
  assert(fs.readFileSync(path.join(moved, 'presentations/my-talk/content.js'), 'utf8').includes('새 원고의 마무리'));
});
