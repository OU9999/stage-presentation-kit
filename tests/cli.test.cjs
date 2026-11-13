'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const { initProject, newTalk, buildProject, startDev } = require('../lib/index.cjs');
const { run } = require('../lib/cli.cjs');
const { findConfig } = require('../lib/config.cjs');
const repo = path.resolve(__dirname, '..');
const cli = path.join(repo, 'bin/ou-presentation.cjs');
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ou-cli-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function exec(cwd, ...args) { return cp.spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' }); }
const silent = { write() {} };

test('init/new build multiple portable decks from a separate project and discover config from nested cwd', async t => {
  const root = fixture(t), project = path.join(root, '독립 project');
  assert.equal(exec(root, 'init', project, '--title', '독립 발표: "근거"').status, 0);
  assert.equal(fs.existsSync(path.join(project, 'lib')), false);
  assert.equal(fs.existsSync(path.join(project, 'talks/llm-wiki')), false);
  assert.equal(exec(project, 'new', 'team-review', '--title', '팀 회고').status, 0);
  assert.equal(exec(path.join(project, 'talks/team-review/assets'), 'build').status, 0);
  assert.equal(exec(project, 'verify').status, 0);
  const manifest = JSON.parse(fs.readFileSync(path.join(project, 'presentations/manifest.json')));
  assert.deepEqual(manifest.decks.map(deck => deck.id), ['my-talk', 'team-review']);
  assert.equal(manifest.decks[1].title, '팀 회고');
  const source = path.join(project, 'talks/team-review/slides.md');
  fs.appendFileSync(source, '\n추가한 실제 문장\n');
  assert.equal(exec(project, 'verify').status, 1);
  assert.doesNotMatch(fs.readFileSync(path.join(project, 'presentations/team-review/content.js'), 'utf8'), /추가한 실제 문장/);
  const dev = await startDev({ cwd: project, port: 0, quiet: true });
  t.after(() => dev.close());
  const html = await (await fetch(dev.url + '/team-review/')).text();
  assert.match(html, /EventSource/);
  assert.match(await (await fetch(dev.url + '/team-review/content.js')).text(), /추가한 실제 문장/);
});

test('scaffolding rejects existing content, traversal, symlinks, duplicate folders and duplicate ids without overwriting', t => {
  const root = fixture(t), project = path.join(root, 'project');
  initProject(project);
  const source = path.join(project, 'talks/my-talk/slides.md');
  const before = fs.readFileSync(source, 'utf8');
  assert.throws(() => initProject(project), /비어 있는/);
  assert.throws(() => newTalk('my-talk', { cwd: project }), /이미 있는/);
  for (const slug of ['../outside', '/outside', '_runtime', 'team/review', '.', 'UPPER']) {
    assert.throws(() => newTalk(slug, { cwd: project }), /발표 이름/);
  }
  fs.writeFileSync(source, before.replace('id: "my-talk"', 'id: "already-used"'));
  assert.throws(() => newTalk('already-used', { cwd: project }), /사용 중인 발표 id/);
  assert.equal(fs.existsSync(path.join(project, 'talks/already-used')), false);
  fs.symlinkSync(project, path.join(root, 'linked'), 'dir');
  assert.throws(() => initProject(path.join(root, 'linked')), /비어 있는/);
  assert.equal(fs.readFileSync(source, 'utf8'), before.replace('id: "my-talk"', 'id: "already-used"'));
});

test('legacy config and CLI stay usable and the new config takes precedence in the same directory', t => {
  const project = fixture(t);
  initProject(project);
  const canonical = path.join(project, 'ou.config.json'), legacy = path.join(project, 'stage.config.json');
  fs.renameSync(canonical, legacy);
  assert.equal(findConfig(path.join(project, 'talks/my-talk')), legacy);
  const oldCli = cp.spawnSync(process.execPath, [path.join(repo, 'scripts/stage.cjs'), 'build', '--config', legacy], { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.equal(oldCli.status, 0, oldCli.stderr);
  fs.copyFileSync(legacy, canonical);
  assert.equal(findConfig(project), canonical);
  // Explicit configuration remains available even when both names exist.
  assert.equal(buildProject({ configPath: legacy }).manifest.decks.length, 1);
});

test('CLI rejects invalid commands/options before creating any project files', async t => {
  const cwd = fixture(t);
  for (const args of [['unknown'], ['constructor'], ['toString'], ['init', 'project', '--port', '4'], ['new'], ['build', 'extra'], ['dev', '--port', '-1'], ['dev', '--port', '1e2'], ['init', '--title'], ['build', '--config', 'a', '--config', 'b']]) {
    await assert.rejects(run(args, { cwd, stdout: silent }));
  }
  assert.deepEqual(fs.readdirSync(cwd), []);
});

test('packed engine runs init/new/build/verify after extraction without repository scripts, talks, examples or research', t => {
  const root = fixture(t);
  const packed = cp.spawnSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', root], {
    cwd: repo, encoding: 'utf8', env: { ...process.env, npm_config_cache: path.join(root, 'npm-cache') }
  });
  assert.equal(packed.status, 0, packed.stderr);
  const pack = JSON.parse(packed.stdout)[0];
  for (const entry of pack.files) assert.doesNotMatch(entry.path, /^(?:talks|examples|research|presentations|tests|scripts|starters)\//);
  assert(pack.files.some(entry => entry.path === 'lib/project.cjs'));
  const extracted = path.join(root, 'engine'); fs.mkdirSync(extracted);
  const tar = cp.spawnSync('tar', ['-xzf', path.join(root, pack.filename), '-C', extracted], { encoding: 'utf8' });
  assert.equal(tar.status, 0, tar.stderr);
  const engine = path.join(extracted, 'package');
  // Supply only declared third-party dependencies; never link back to the engine source.
  fs.mkdirSync(path.join(engine, 'node_modules'));
  for (const name of ['markdown-it', 'yaml', 'argparse', 'entities', 'linkify-it', 'mdurl', 'punycode.js', 'uc.micro']) {
    fs.cpSync(path.join(repo, 'node_modules', name), path.join(engine, 'node_modules', name), { recursive: true });
  }
  const installedCli = path.join(engine, 'bin/ou-presentation.cjs');
  const project = path.join(root, 'reusable');
  for (const args of [['init', project, '--package', 'file:./engine.tgz'], ['new', 'review'], ['build'], ['verify']]) {
    const result = cp.spawnSync(process.execPath, [installedCli, ...args], { cwd: fs.existsSync(project) ? project : root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
  const api = require(engine);
  assert.equal(api.buildProject({ cwd: project }).manifest.decks.length, 2);
  const content = fs.readFileSync(path.join(project, 'presentations/review/content.js'), 'utf8');
  assert.match(content, /발표의 핵심 메시지/);
});
