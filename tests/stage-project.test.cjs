'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { buildProject, startDev } = require('../scripts/stage.cjs');

const repoRoot = path.resolve(__dirname, '..');
function fixture(t, config = {}) {
  const directory = fs.mkdtempSync('/tmp/stage-project-');
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.mkdirSync(path.join(directory, 'talks'), { recursive: true });
  const configPath = path.join(directory, 'stage.config.json');
  fs.writeFileSync(configPath, JSON.stringify({ title: '한 원고의 두 화면', sourceDir: 'talks', outputDir: 'out', ...config }));
  return { directory, configPath, output: path.join(directory, 'out'), options: { configPath, repoRoot } };
}
function write(project, file, content) {
  const filename = path.join(project.directory, file);
  fs.mkdirSync(path.dirname(filename), { recursive: true }); fs.writeFileSync(filename, content);
  return filename;
}
function deckAt(output, slug) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(output, slug, 'content.js'), 'utf8'), context);
  return JSON.parse(JSON.stringify(context.window.PRESENTATION));
}
const outputText = output => fs.readFileSync(path.join(output, 'alpha', 'content.js'), 'utf8');
function snapshot(directory) {
  const files = {};
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const filename = path.join(current, entry.name);
      if (entry.isDirectory()) visit(filename);
      else files[path.relative(directory, filename)] = crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
    }
  }
  visit(directory); return files;
}
async function until(check, message) {
  const deadline = Date.now() + 7000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise(resolve => setTimeout(resolve, 60));
  }
  assert.fail(message);
}

test('STAGE project keeps two decks, semantic content and assets inside the output root', t => {
  const project = fixture(t);
  const title = '제목 $& $` $\' 끝';
  const source = '---\ntitle: ' + JSON.stringify(title) + '\n---\n\n# **제품** 회고\n\n![설명](../../shared/space%20name.svg?v=2#figure)\n\n- 관찰\n- 결정\n\n[다른 발표](../beta/slides.md?view=all#2) · [첨부](./details.txt)\n\n---\n\n# 코드\n\n```text\n---\n원문\n```\n';
  const input = write(project, 'talks/alpha/slides.md', source);
  write(project, 'talks/alpha/details.txt', '첨부의 원문');
  write(project, 'talks/beta/slides.md', '# 팀 학습\n\n| 항목 | 값 |\n| --- | --- |\n| 기록 | 하나 |');
  const image = write(project, 'shared/space name.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const result = buildProject(project.options);
  assert.deepEqual(result.manifest.decks.map(deck => deck.id), ['alpha', 'beta']);
  assert.equal(result.manifest.decks[0].links.read, 'alpha/read.html');
  const deck = deckAt(project.output, 'alpha');
  assert.equal(deck.format, 'markdown-v1');
  assert.equal(deck.slides.length, 2);
  const serialized = JSON.stringify(deck);
  assert.match(serialized, /assets\/[a-f0-9]{12}-space-name\.svg\?v=2#figure/);
  assert.match(serialized, /\.\.\/beta\/read\.html\?view=all#2/);
  assert.match(serialized, /---\\n원문/);
  assert.equal(fs.readFileSync(input, 'utf8'), source);
  assert.equal(fs.readFileSync(image, 'utf8'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  assert.equal(fs.readdirSync(path.join(project.output, 'alpha', 'assets')).length, 2);
  assert.equal(fs.readdirSync(path.join(project.output, '_runtime')).length, 7);
  assert.equal(fs.existsSync(path.join(project.output, 'alpha', 'slides.md')), false);
  const html = fs.readFileSync(path.join(project.output, 'alpha', 'index.html'), 'utf8');
  assert.equal(html.match(/<title>([\s\S]*?)<\/title>/)[1], '제목 $&amp; $` $&#39; 끝 — Stage');
  const help = html.slice(html.indexOf('id="helpDialog"'));
  assert.match(help, /읽기 전용/);
  assert.doesNotMatch(help, /data-action="reset"|content\.js.*교체|href="[^\"]*slides\.md/);
  assert.match(fs.readFileSync(path.join(project.output, 'alpha', 'read.html'), 'utf8'), /data-view="read"/);
  assert.doesNotMatch(html, /EventSource/);
});

test('STAGE project preserves the complete successful output on parser, model, asset and identity errors', t => {
  const project = fixture(t);
  const source = write(project, 'talks/alpha/slides.md', '# 정상 원고\n\n보존할 내용');
  write(project, 'talks/beta/slides.md', '# 독립된 두 번째 원고');
  buildProject(project.options);
  const before = outputText(project.output);
  const collectionBefore = snapshot(project.output);
  for (const invalid of [
    '---\nnotes: SECRET\n---\n# 노트',
    '<!-- stage\nlayout: visual\n-->\n# 자료 누락',
    '# 없는 이미지\n\n![설명](./missing.svg)',
    '# 등록하지 않은 원고\n\n[원본](./notes.md)',
    '# 지원하지 않는 anchor\n\n[제목](#heading)'
  ]) {
    fs.writeFileSync(source, invalid);
    assert.throws(() => buildProject(project.options));
    assert.equal(outputText(project.output), before);
    assert.deepEqual(snapshot(project.output), collectionBefore);
  }
  fs.writeFileSync(source, '---\nid: stable\n---\n# 첫 원고');
  write(project, 'talks/beta/slides.md', '---\nid: stable\n---\n# 두 번째');
  assert.throws(() => buildProject(project.options), /중복 id/);
  assert.equal(outputText(project.output), before);
  assert.deepEqual(snapshot(project.output), collectionBefore);
  fs.rmSync(path.join(project.directory, 'talks/beta'), { recursive: true });
  write(project, 'talks/a b/slides.md', '# 공백');
  write(project, 'talks/a-b/slides.md', '# 연결');
  assert.throws(() => buildProject(project.options), /중복 slug/);
  assert.equal(outputText(project.output), before);
  assert.deepEqual(snapshot(project.output), collectionBefore);
});

test('STAGE nested decks use relative collection/runtime/read URLs and retain explicit legacy media', t => {
  const project = fixture(t);
  write(project, 'talks/alpha/slides.md', '# 연결 대상');
  const media = 'data:video/mp4;base64,AAAA';
  write(project, 'talks/group/nested/slides.md', '# 중첩 원고\n\n[다른 발표](../../alpha/slides.md)\n\n---\n\n```stage\n' + JSON.stringify({ layout: 'media', video: media, caption: '명시 미디어' }) + '\n```');
  buildProject(project.options);
  const deck = deckAt(project.output, 'group/nested');
  assert.equal(deck.id, 'group/nested');
  assert.equal(deck.slides[1].video, media);
  assert.match(JSON.stringify(deck.slides[0]), /\.\.\/\.\.\/alpha\/read\.html/);
  const html = fs.readFileSync(path.join(project.output, 'group/nested/index.html'), 'utf8');
  assert.match(html, /src="\.\.\/\.\.\/_runtime\/blocks\.js\?v=/);
  assert.match(html, /href="\.\.\/\.\.\/index\.html"/);
});

test('STAGE refuses existing non-generated directories, overlapping output and symlinked source', t => {
  const project = fixture(t);
  write(project, 'talks/alpha/slides.md', '# 제목');
  write(project, 'out/keep.txt', '기존 파일');
  assert.throws(() => buildProject(project.options), /생성한 폴더가 아닙니다/);
  assert.equal(fs.readFileSync(path.join(project.output, 'keep.txt'), 'utf8'), '기존 파일');
  for (const outputDir of ['.', 'talks', 'talks/generated', '..', repoRoot]) {
    fs.writeFileSync(project.configPath, JSON.stringify({ sourceDir: 'talks', outputDir }));
    assert.throws(() => buildProject(project.options), /겹칩니다/);
  }
  fs.writeFileSync(project.configPath, JSON.stringify({ sourceDir: 'talks', outputDir: 'generated' }));
  fs.symlinkSync(path.join(project.directory, 'talks'), path.join(project.directory, 'source-alias'), 'dir');
  fs.writeFileSync(project.configPath, JSON.stringify({ sourceDir: 'talks', outputDir: 'source-alias' }));
  assert.throws(() => buildProject(project.options), /겹칩니다/);
  fs.writeFileSync(project.configPath, JSON.stringify({ sourceDir: 'talks', outputDir: 'generated' }));
  fs.symlinkSync(path.join(project.directory, 'talks/alpha'), path.join(project.directory, 'talks/alias'), 'dir');
  assert.throws(() => buildProject(project.options), /심볼릭 링크/);
});

test('STAGE restores the previous collection when publication rename fails and cleans staging', t => {
  const project = fixture(t);
  const source = write(project, 'talks/alpha/slides.md', '# 이전 성공본');
  buildProject(project.options);
  const before = outputText(project.output);
  fs.writeFileSync(source, '# 다음 원고');
  const canonicalOutput = fs.realpathSync(project.output);
  const rename = fs.renameSync;
  let injected = false;
  try {
    fs.renameSync = function (from, to) {
      if (!injected && from.includes('.out.stage-') && !from.endsWith('.previous') && to === canonicalOutput) { injected = true; throw new Error('injected publish failure'); }
      return rename.call(this, from, to);
    };
    assert.throws(() => buildProject(project.options), /injected publish failure/);
  } finally { fs.renameSync = rename; }
  assert.equal(injected, true);
  assert.equal(outputText(project.output), before);
  assert.equal(fs.readdirSync(project.directory).some(name => name.startsWith('.out.stage-')), false);
});

test('STAGE generated project rebuilds after the whole project moves', t => {
  const project = fixture(t);
  write(project, 'talks/alpha/slides.md', '# 옮길 수 있는 원고');
  buildProject(project.options);
  const moved = project.directory + '-moved';
  t.after(() => fs.rmSync(moved, { recursive: true, force: true }));
  fs.renameSync(project.directory, moved);
  const result = buildProject({ ...project.options, configPath: path.join(moved, 'stage.config.json') });
  assert.equal(result.manifest.decks[0].id, 'alpha');
  const marker = JSON.parse(fs.readFileSync(path.join(moved, 'out', '.stage-generated.json'), 'utf8'));
  assert.equal(marker.config, '../stage.config.json');
  assert.equal(path.isAbsolute(marker.config), false);
});

test('STAGE dev watches both source files when identical assets share one generated URL', async t => {
  const project = fixture(t);
  write(project, 'talks/alpha/slides.md', '# 두 첨부\n\n[첫째](../../shared/one/same.txt) [둘째](../../shared/two/same.txt)');
  const first = write(project, 'shared/one/same.txt', 'same bytes');
  write(project, 'shared/two/same.txt', 'same bytes');
  const dev = await startDev({ ...project.options, port: 0, quiet: true });
  t.after(() => dev.close());
  assert.equal(fs.readdirSync(path.join(project.output, 'alpha/assets')).length, 1);
  fs.writeFileSync(first, 'changed first source');
  await until(() => fs.readdirSync(path.join(project.output, 'alpha/assets')).length === 2, 'deduplicated first asset was not watched');
});

test('STAGE dev serves only output, injects reload into HTML, rebuilds and recovers an external missing asset', async t => {
  const project = fixture(t);
  const privateRuntime = path.join(project.directory, 'runtime-source');
  fs.mkdirSync(privateRuntime);
  for (const file of ['index.html', 'styles.css', 'visual.css', 'blocks.css', 'deck-model.js', 'visual.js', 'blocks.js', 'app.js']) fs.copyFileSync(path.join(repoRoot, file), path.join(privateRuntime, file));
  project.options.repoRoot = privateRuntime;
  const input = write(project, 'talks/alpha/slides.md', '# 첫 성공본\n\n본문');
  const dev = await startDev({ ...project.options, port: 0, quiet: true });
  t.after(() => dev.close());
  const get = file => fetch(dev.url + file);
  const html = await (await get('/alpha/index.html')).text();
  assert.match(html, /EventSource/);
  assert.doesNotMatch(await (await get('/_runtime/app.js')).text(), /__stage_error/);
  assert.equal((await get('/talks/alpha/slides.md')).status, 404);
  assert.equal((await get('/.stage-generated.json')).status, 404);
  const streamController = new AbortController();
  const stream = await fetch(dev.url + '/__stage/events', { signal: streamController.signal });
  const reader = stream.body.getReader(); let events = '';
  const reading = (async () => { try { for (;;) { const part = await reader.read(); if (part.done) break; events += Buffer.from(part.value).toString(); } } catch (_) {} })();
  try {
    fs.writeFileSync(input, '# 갱신된 제목\n\n다음 본문');
    await until(() => outputText(project.output).includes('갱신된 제목'), 'source change did not rebuild');
    await until(() => events.includes('event: built'), 'reload event missing');
    const before = outputText(project.output);
    fs.writeFileSync(input, '# 외부 첨부\n\n[자료](../../shared/new%20file.txt)');
    await until(() => events.includes('event: build-error'), 'missing asset diagnostic missing');
    assert.equal(outputText(project.output), before);
    // No further Markdown edit: creating the previously missing external dependency must recover.
    write(project, 'shared/new file.txt', '나중에 만든 자료');
    await until(() => outputText(project.output).includes('new-file.txt'), 'external asset recovery did not rebuild');
    const last = deckAt(project.output, 'alpha');
    assert.match(JSON.stringify(last), /assets\/[a-f0-9]{12}-new-file\.txt/);
    const content = await (await get('/alpha/content.js')).text();
    assert.match(content, /외부 첨부/);
    fs.writeFileSync(project.configPath, JSON.stringify({ title: '설정 변경도 반영', sourceDir: 'talks', outputDir: 'out' }));
    await until(() => fs.readFileSync(path.join(project.output, 'index.html'), 'utf8').includes('설정 변경도 반영'), 'config change did not rebuild');
    fs.appendFileSync(path.join(privateRuntime, 'blocks.css'), '\n/* watched-runtime */\n');
    await until(() => fs.readFileSync(path.join(project.output, '_runtime/blocks.css'), 'utf8').includes('watched-runtime'), 'runtime change did not rebuild');
    const errorCount = (events.match(/event: build-error/g) || []).length;
    const good = outputText(project.output);
    fs.renameSync(path.join(project.directory, 'talks'), path.join(project.directory, 'talks-away'));
    await until(() => (events.match(/event: build-error/g) || []).length > errorCount, 'missing source root diagnostic missing');
    assert.equal(outputText(project.output), good);
    assert.equal((await get('/alpha/index.html')).status, 200);
    const builtCount = (events.match(/event: built/g) || []).length;
    fs.renameSync(path.join(project.directory, 'talks-away'), path.join(project.directory, 'talks'));
    await until(() => (events.match(/event: built/g) || []).length > builtCount, 'source root restoration did not recover');
    const nextInput = write(project, 'next-talks/beta/slides.md', '---\nnotes: unsupported\n---\n# 새 원고');
    const configErrors = (events.match(/event: build-error/g) || []).length;
    fs.writeFileSync(project.configPath, JSON.stringify({ sourceDir: 'next-talks', outputDir: 'out' }));
    await until(() => (events.match(/event: build-error/g) || []).length > configErrors, 'candidate source error missing');
    assert.equal(outputText(project.output), good);
    // Fix only the newly selected source, without touching config or the old source tree.
    fs.writeFileSync(nextInput, '# 새 폴더에서 복구\n\n본문');
    await until(() => fs.existsSync(path.join(project.output, 'beta/content.js')), 'candidate source edit did not recover');
    assert.match(fs.readFileSync(path.join(project.output, 'beta/content.js'), 'utf8'), /새 폴더에서 복구/);
  } finally { streamController.abort(); await reading; }
});
