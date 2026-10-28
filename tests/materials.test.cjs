'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const vm = require('node:vm');
const { buildProject, startDev } = require('../scripts/stage.cjs');
const { parseMaterial, renderMaterial } = require('../scripts/materials.cjs');
const { RUNTIME } = require('../scripts/runtime.cjs');

const repoRoot = path.resolve(__dirname, '..');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const snapshot = directory => Object.fromEntries(walk(directory).sort().map(file => [path.relative(directory, file), sha(fs.readFileSync(file))]));
const times = directory => Object.fromEntries(walk(directory).sort().map(file => [path.relative(directory, file), fs.statSync(file).mtimeMs]));
function fixture(t, privateRuntime = false) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-materials-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.mkdirSync(path.join(directory, 'talks'));
  const configPath = path.join(directory, 'stage.config.json');
  fs.writeFileSync(configPath, JSON.stringify({ title: '독립 학습 자료', sourceDir: 'talks', outputDir: 'out' }));
  const runtime = privateRuntime ? path.join(directory, 'kit') : repoRoot;
  if (privateRuntime) {
    fs.mkdirSync(runtime);
    for (const file of RUNTIME) fs.copyFileSync(path.join(repoRoot, file), path.join(runtime, file));
    fs.cpSync(path.join(repoRoot, 'templates'), path.join(runtime, 'templates'), { recursive: true });
  }
  return { directory, configPath, output: path.join(directory, 'out'), options: { configPath, repoRoot: runtime } };
}
function write(project, relative, content) {
  const file = path.join(project.directory, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); return file;
}
const read = (project, relative) => fs.readFileSync(path.join(project.output, relative), 'utf8');
function deck(project, slug) {
  const context = { window: {} }; vm.runInNewContext(read(project, slug + '/content.js'), context);
  return JSON.parse(JSON.stringify(context.window.PRESENTATION));
}
function assertClosure(output) {
  for (const file of walk(output).filter(file => file.endsWith('.html'))) {
    for (const match of fs.readFileSync(file, 'utf8').matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replace(/&amp;/g, '&');
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue;
      const target = path.resolve(path.dirname(file), decodeURIComponent(value.split(/[?#]/)[0]));
      assert(target.startsWith(output + path.sep), value + ' leaves output');
      assert(fs.existsSync(target), path.relative(output, file) + ' → ' + value);
    }
  }
}
async function until(check, message) {
  const deadline = Date.now() + 9000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise(resolve => setTimeout(resolve, 70));
  }
  assert.fail(message);
}

test('materials render ordinary Markdown safely, preserve code examples and assign stable Korean heading anchors', () => {
  const source = '---\ntitle: "표시 제목 <자료>"\ndescription: "설명 & 범위"\norder: 3\n---\n# 본문 제목\n\n## 같은 제목!\n\n### 같은 제목!\n\n## 같은 제목-2\n\n```md\n---\n[가상 링크](./not-a-real-file.md)\n<script>alert(1)</script>\n```\n\n`[가상](./inline.md)`\n\n<script>alert(2)</script>\n\n<img src=x onerror=alert(3)>\n\n| 항목 | 내용 |\n| --- | --- |\n| 가 | 나 |\n\n[실제 링크](https://example.org/source?q=1&v=2)';
  const material = parseMaterial(source, { sourcePath: 'materials/notes.md' });
  assert.equal(material.title, '표시 제목 <자료>');
  assert.equal(material.description, '설명 & 범위'); assert.equal(material.order, 3);
  assert.deepEqual(material.headingIds, ['본문-제목', '같은-제목', '같은-제목-2', '같은-제목-2-2']);
  assert.deepEqual(material.references.map(ref => ref.value), ['https://example.org/source?q=1&v=2']);
  const { body, toc } = renderMaterial(material);
  assert.match(body, /---\n\[가상 링크\]/); assert.match(body, /&lt;script&gt;alert\(2\)&lt;\/script&gt;/);
  assert.match(body, /&lt;img src=x onerror=alert\(3\)&gt;/);
  assert.doesNotMatch(body, /<script\b|<img src=x|href="\.\/not-a-real-file/);
  assert.match(body, /<pre[^>]*tabindex="0"/); assert.match(body, /material-table-scroll[^>]*tabindex="0"/);
  assert.match(toc, /href="#같은-제목-2"/); assert.match(toc, /toc-level-3/);
  const normalized = parseMaterial('# 한 제목\n\n## ＡＢＣ 질문!\n\n## abc 질문');
  assert.deepEqual(normalized.headingIds, ['한-제목', 'abc-질문', 'abc-질문-2']);
  for (const invalid of ['본문 먼저\n\n# 제목', '# 하나\n\n# 둘', '---\nsecret: true\n---\n# 제목', '---\norder: -1\n---\n# 제목']) {
    assert.throws(() => parseMaterial(invalid, { sourcePath: 'materials/bad.md' }), /materials\/bad\.md:\d+:/);
  }
});

test('an arbitrary nested deck discovers documents, converts links and keeps all output references portable', t => {
  const project = fixture(t);
  write(project, 'talks/team/topic/slides.md', '# 발표\n\n[학습](./materials/lesson.md?view=full#같은-제목-2)\n\n---\n\n# 둘째 장');
  write(project, 'talks/team/topic/materials/lesson.md', '---\ntitle: "자료 <하나>"\ndescription: "깊이 & 범위"\norder: 5\n---\n# 공부 제목\n\n## 같은 제목\n\n### 같은 제목\n\n[다른 자료](./reading.md?mode=all#핵심-내용) · [같은 문서](#같은-제목-2) · [인코딩](#%EA%B0%99%EC%9D%80-%EC%A0%9C%EB%AA%A9) · [발표](../slides.md#2) · [외부](https://example.org/source?q=1&x=2)\n\n<script>alert(1)</script>\n\n```md\n[가상](./missing.md)\n---\n```');
  write(project, 'talks/team/topic/materials/reading.md', '---\norder: 1\n---\n# 먼저 읽기\n\n## 핵심 내용\n\n[돌아가기](lesson.md#같은-제목)');
  const result = buildProject(project.options);
  assert.equal(result.manifest.decks.length, 1); assert.equal(deck(project, 'team/topic').slides.length, 2);
  const entry = result.manifest.decks[0];
  assert.equal(entry.links.materials, 'team/topic/materials/index.html');
  assert.deepEqual(entry.materials.map(doc => doc.title), ['먼저 읽기', '자료 <하나>']);
  assert(entry.materials.every(doc => /^[a-f\d]{64}$/.test(doc.revision) && doc.href.endsWith('.html')));
  const html = read(project, 'team/topic/materials/lesson.html');
  assert.match(html, /자료 &lt;하나&gt;/); assert.match(html, /깊이 &amp; 범위/);
  assert.match(html, /reading\.html\?mode=all#(?:핵심-내용|%ED%95%B5%EC%8B%AC-%EB%82%B4%EC%9A%A9)/);
  assert.match(html, /href="#(?:같은-제목-2|%EA%B0%99%EC%9D%80-%EC%A0%9C%EB%AA%A9-2)"/);
  assert.match(html, /href="\.\.\/read\.html#2"/);
  assert.match(html, /href="https:\/\/example\.org\/source\?q=1&amp;x=2"/);
  assert.doesNotMatch(html, /<script\b/); assert.match(html, /&lt;script&gt;/);
  assert.match(html, /class="material-mobile-nav"/); assert.match(html, /aria-current="page"/);
  assert.match(read(project, 'team/topic/materials/reading.html'), /lesson\.html#/);
  assert.match(JSON.stringify(deck(project, 'team/topic')), /materials\/lesson\.html\?view=full#/);
  for (const page of ['index.html', 'read.html']) assert.match(read(project, 'team/topic/' + page), /href="materials\/index\.html"/);
  assert.match(read(project, 'index.html'), /team\/topic\/materials\/index\.html/);
  assert.match(read(project, 'team/topic/materials/index.html'), /lesson\.html/);
  for (const source of ['lesson.md', 'reading.md']) assert(result.dependencies.includes(fs.realpathSync(path.join(project.directory, 'talks/team/topic/materials', source))));
  for (const source of ['templates/material.html', 'templates/materials.css']) assert(result.dependencies.includes(fs.realpathSync(path.join(repoRoot, source))));
  assertClosure(project.output);
});

test('one document is enough for an automatic hub, while an explicit source index wins and ghost Markdown is rejected', t => {
  const project = fixture(t);
  const slide = write(project, 'talks/solo/slides.md', '# 단독 발표');
  write(project, 'talks/solo/materials/slides.md', '# 자료 이름도 slides\n\n## 설명\n\n자료 내용');
  buildProject(project.options);
  assert.equal(JSON.parse(read(project, 'manifest.json')).decks.length, 1);
  assert.match(read(project, 'solo/materials/index.html'), /slides\.html/);
  const first = snapshot(project.output);
  fs.writeFileSync(slide, '# 단독 발표\n\n[없는 원본](./materials/index.md)');
  assert.throws(() => buildProject(project.options), /index\.md/); assert.deepEqual(snapshot(project.output), first);
  write(project, 'talks/solo/materials/index.md', '# 직접 쓴 자료 목차\n\n고유한 안내 본문\n\n[자료](./slides.md#설명)');
  buildProject(project.options);
  assert.match(read(project, 'solo/materials/index.html'), /고유한 안내 본문/);
  assert.match(JSON.stringify(deck(project, 'solo')), /materials\/index\.html/);
  assertClosure(project.output);
});

test('slide and material assets share content-addressed bytes and retain every source dependency', t => {
  const project = fixture(t);
  write(project, 'talks/assets/slides.md', '# 같은 자료\n\n[슬라이드 첨부](../../shared/first/same.txt)');
  write(project, 'talks/assets/materials/notes.md', '# 첨부 읽기\n\n[첫째](../../../shared/first/same.txt?download=1#part) · [둘째](../../../shared/second/same.txt)');
  const first = write(project, 'shared/first/same.txt', '동일한 원자료\n');
  const second = write(project, 'shared/second/same.txt', '동일한 원자료\n');
  const result = buildProject(project.options);
  const files = fs.readdirSync(path.join(project.output, 'assets/assets'));
  assert.equal(files.length, 1); assert.match(files[0], /^[a-f\d]{12}-same\.txt$/);
  assert.equal(files[0].slice(0, 12), sha(fs.readFileSync(first)).slice(0, 12));
  assert.deepEqual(fs.readFileSync(path.join(project.output, 'assets/assets', files[0])), fs.readFileSync(second));
  assert.match(read(project, 'assets/materials/notes.html'), /href="\.\.\/assets\/[a-f\d]{12}-same\.txt\?download=1#part"/);
  for (const source of [first, second]) assert(result.dependencies.includes(fs.realpathSync(source)));
  fs.writeFileSync(first, '바뀐 첫 자료'); buildProject(project.options);
  assert.equal(fs.readdirSync(path.join(project.output, 'assets/assets')).length, 2);
  assertClosure(project.output);
});

test('bad references report the source paragraph and original target, preserving the complete last good output', t => {
  const project = fixture(t);
  write(project, 'talks/check/slides.md', '# 확인\n\n[자료](./materials/notes.md)');
  const material = write(project, 'talks/check/materials/notes.md', '# 정상 자료\n\n## 있는 제목\n\n정상 본문');
  write(project, 'talks/check/private.md', '# 임의 Markdown');
  buildProject(project.options); const before = snapshot(project.output);
  for (const target of ['./missing.svg', '#없는-제목', '../slides.md#99', '../private.md', './notes.md#없는-제목', './index.md']) {
    fs.writeFileSync(material, '# 정상 자료\n\n## 있는 제목\n\n문단 시작\n[문제 참조](' + target + ')');
    let error; try { buildProject(project.options); } catch (caught) { error = caught; }
    assert(error, target + ' was silently accepted');
    assert.match(error.message, /talks\/check\/materials\/notes\.md:5:/);
    assert(error.message.includes(target), 'source reference missing from ' + error.message);
    assert.deepEqual(snapshot(project.output), before, target + ' changed last good output');
  }
  fs.writeFileSync(material, '# 정상 자료\n\n## 있는 제목');
  write(project, 'talks/check/slides.md', '# 확인\n\n[자료](./materials/notes.md#없는-제목)');
  assert.throws(() => buildProject(project.options), /slides\.md:3:.*notes\.md#없는-제목/);
  assert.deepEqual(snapshot(project.output), before);
});

test('decks without materials keep their bytes and do not depend on the material template or stylesheet', t => {
  const project = fixture(t, true);
  write(project, 'talks/plain/slides.md', '# 그대로인 발표\n\n내용');
  const first = buildProject(project.options); const before = snapshot(project.output);
  assert.equal(Object.hasOwn(first.manifest.decks[0].links, 'materials'), false);
  assert.equal(Object.hasOwn(first.manifest.decks[0], 'materials'), false);
  assert.equal(fs.readdirSync(path.join(project.output, '_runtime')).length, 7);
  assert.equal(first.dependencies.some(file => /material(?:s)?\.(?:html|css)$/.test(file)), false);
  fs.rmSync(path.join(project.options.repoRoot, 'templates/material.html'));
  fs.rmSync(path.join(project.options.repoRoot, 'templates/materials.css'));
  buildProject(project.options); assert.deepEqual(snapshot(project.output), before);
  fs.cpSync(path.join(repoRoot, 'templates'), path.join(project.options.repoRoot, 'templates'), { recursive: true });
  write(project, 'talks/other/slides.md', '# 다른 발표');
  write(project, 'talks/other/materials/notes.md', '# 추가한 자료');
  buildProject(project.options);
  for (const [file, hash] of Object.entries(before).filter(([file]) => file.startsWith('plain/'))) assert.equal(snapshot(project.output)[file], hash);
});

test('a pre-existing deck named materials remains a deck while its owning deck can have a slides-named document', t => {
  const project = fixture(t);
  write(project, 'talks/materials/slides.md', '# 이름이 materials인 발표\n\n기존 주제 내용');
  write(project, 'talks/other/slides.md', '# 다른 주제');
  buildProject(project.options);
  const before = snapshot(path.join(project.output, 'materials'));
  write(project, 'talks/other/materials/slides.md', '# 자료 이름이 slides\n\n별도 학습 자료');
  const result = buildProject(project.options);
  assert.deepEqual(result.manifest.decks.map(item => item.id), ['materials', 'other']);
  assert.equal(result.manifest.decks[0].links.materials, undefined);
  assert.equal(result.manifest.decks[1].materials.length, 1);
  assert.match(read(project, 'other/materials/slides.html'), /별도 학습 자료/);
  assert.deepEqual(snapshot(path.join(project.output, 'materials')), before);
});

test('a standalone material project rebuilds byte-for-byte after moving and works through the CLI', t => {
  const project = fixture(t);
  write(project, 'talks/movable/slides.md', '# 옮길 발표\n\n[읽기](./materials/guide.md#준비)');
  write(project, 'talks/movable/materials/guide.md', '# 옮길 자료\n\n## 준비\n\n[발표](../slides.md#1)\n\n![자체 그림](../assets/chart.svg)');
  write(project, 'talks/movable/assets/chart.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>');
  buildProject(project.options); const before = snapshot(project.output);
  const moved = project.directory + '-moved'; t.after(() => fs.rmSync(moved, { recursive: true, force: true }));
  fs.renameSync(project.directory, moved);
  const cli = cp.spawnSync(process.execPath, [path.join(repoRoot, 'scripts/stage.cjs'), 'build', '--config', path.join(moved, 'stage.config.json')], { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.equal(cli.status, 0, cli.stderr); assert.deepEqual(snapshot(path.join(moved, 'out')), before);
  assertClosure(path.join(moved, 'out'));
});

test('verification detects material content, style, missing and stale pages without modifying generated bytes or times', t => {
  const project = fixture(t, true);
  write(project, 'talks/review/slides.md', '# 검증할 발표');
  const material = write(project, 'talks/review/materials/notes.md', '# 검증할 자료\n\n기존 내용');
  buildProject(project.options); assert.deepEqual(buildProject({ ...project.options, check: true }).differences, []);
  fs.appendFileSync(material, '\n\n새로운 학습 내용\n');
  fs.appendFileSync(path.join(project.options.repoRoot, 'templates/materials.css'), '\n/* changed material style */\n');
  fs.rmSync(path.join(project.output, 'review/materials/index.html'));
  fs.writeFileSync(path.join(project.output, 'review/materials/obsolete.html'), 'stale page');
  const before = snapshot(project.output), beforeTimes = times(project.output);
  const result = buildProject({ ...project.options, check: true });
  const differences = result.differences.map(item => ({ ...item, file: path.relative(fs.realpathSync(project.output), item.file).split(path.sep).join('/') }));
  assert(differences.some(item => item.file === 'review/materials/notes.html' && item.reason === 'changed'));
  assert(differences.some(item => item.file === '_runtime/materials.css' && item.reason === 'changed'));
  assert(differences.some(item => item.file === 'review/materials/index.html' && item.reason === 'missing'));
  assert(differences.some(item => item.file === 'review/materials/obsolete.html' && item.reason === 'unexpected'));
  assert.deepEqual(snapshot(project.output), before); assert.deepEqual(times(project.output), beforeTimes);
  buildProject(project.options); assert.deepEqual(buildProject({ ...project.options, check: true }).differences, []);
});

test('dev watches material creation, source, shared assets, template and CSS, then recovers a missing external asset', async t => {
  const project = fixture(t, true);
  write(project, 'talks/live/slides.md', '# 실시간 발표');
  const dev = await startDev({ ...project.options, port: 0, quiet: true });
  t.after(() => dev.close());
  const controller = new AbortController();
  const response = await fetch(dev.url + '/__stage/events', { signal: controller.signal });
  const reader = response.body.getReader(); let events = '';
  const reading = (async () => { try { for (;;) { const part = await reader.read(); if (part.done) break; events += Buffer.from(part.value).toString(); } } catch (_) {} })();
  try {
    const material = write(project, 'talks/live/materials/notes.md', '# 처음 추가한 자료\n\n본문');
    await until(() => fs.existsSync(path.join(project.output, 'live/materials/notes.html')), 'adding a materials folder did not rebuild');
    fs.writeFileSync(material, '# 갱신된 자료\n\n새 본문');
    await until(() => read(project, 'live/materials/notes.html').includes('갱신된 자료'), 'material edit did not rebuild');
    fs.appendFileSync(path.join(project.options.repoRoot, 'templates/material.html'), '\n<!-- watched-material-template -->\n');
    await until(() => read(project, 'live/materials/notes.html').includes('watched-material-template'), 'material template was not watched');
    fs.appendFileSync(path.join(project.options.repoRoot, 'templates/materials.css'), '\n/* watched-material-css */\n');
    await until(() => read(project, '_runtime/materials.css').includes('watched-material-css'), 'material CSS was not watched');
    const before = snapshot(project.output);
    const errorCount = (events.match(/event: build-error/g) || []).length;
    fs.writeFileSync(material, '# 외부 자료\n\n[자료](../../../external/new.txt)');
    await until(() => (events.match(/event: build-error/g) || []).length > errorCount, 'missing material asset did not report an error');
    assert.deepEqual(snapshot(project.output), before);
    write(project, 'external/new.txt', '추가한 외부 원자료');
    await until(() => read(project, 'live/materials/notes.html').includes('-new.txt'), 'creating missing external material asset did not recover');
    const first = write(project, 'external/one/same.txt', '같은 자료');
    write(project, 'external/two/same.txt', '같은 자료');
    fs.writeFileSync(material, '# 공유 자료\n\n[하나](../../../external/one/same.txt) · [둘](../../../external/two/same.txt)');
    await until(() => read(project, 'live/materials/notes.html').includes('-same.txt') && fs.readdirSync(path.join(project.output, 'live/assets')).length === 1, 'deduplicated material assets did not rebuild');
    fs.writeFileSync(first, '바뀐 첫째 원자료');
    await until(() => fs.readdirSync(path.join(project.output, 'live/assets')).length === 2, 'shared first material asset was not watched');
    assert.equal((await fetch(dev.url + '/live/materials/notes.html')).status, 200);
    assert.equal((await fetch(dev.url + '/talks/live/materials/notes.md')).status, 404);
    assertClosure(project.output);
  } finally { controller.abort(); await reading; }
});

test('equal editorial columns have a scoped large-text rule while primary asides and reading retain their sizes', () => {
  const css = fs.readFileSync(path.join(repoRoot, 'blocks.css'), 'utf8');
  const rule = selector => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(escaped + '\\s*\\{([^}]+)\\}').exec(css);
    assert(match, 'missing scoped CSS rule: ' + selector); return match[1];
  };
  const base = '.layout-blocks[data-composition="editorial"] .markdown-body[data-group-count="3"]';
  assert.match(rule(base + ':not(:has(> .is-primary)) > .md-group'), /font-size:32px/);
  assert.match(rule(base + ':not(:has(> .is-primary)) > .md-group > h2'), /font-size:40px/);
  assert.match(rule(base + ':has(> .is-primary) > .md-group:not(.is-primary)'), /font-size:22px/);
  assert.match(rule(base + ':has(> .is-primary) > .md-group:not(.is-primary) > h2'), /font-size:28px/);
  assert.match(rule('body[data-mode="read"] #slideStage .layout-blocks .md-group'), /font-size:18px/);
  assert.match(rule('body[data-mode="read"] #slideStage .layout-blocks .md-group > h2'), /font-size:26px/);
});
