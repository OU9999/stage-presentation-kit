'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { parseMarkdown, buildDeck } = require('../scripts/markdown-deck.cjs');
const model = require('../deck-model.js');
const repoRoot = path.resolve(__dirname, '..');
const source = slide => '---\nid: reusable-editorial\ntitle: 다른 이야기\n---\n\n```stage\n' + JSON.stringify(slide, null, 2) + '\n```\n';
const slide = () => ({
  layout: 'bento', preset: 'seoul', variant: 'editorial', quiet: true,
  items: [
    { type: 'metric', value: 18, unit: '건', label: '모아 본 의견' },
    { type: 'media', src: './assets/photo.png', alt: '사용자가 가진 사진' },
    { type: 'metric', value: 4, unit: '개', label: '확인한 문제' },
    { type: 'artifact', kind: 'cover', title: ['Release', 'Notes.'] },
    { type: 'artifact', kind: 'quote', text: '<script>literal()</script>' },
    { type: 'artifact', kind: 'waveform', text: '사용자 목소리' },
    { type: 'artifact', kind: 'concepts', items: ['진입', '선택', '완료'] },
    { type: 'artifact', kind: 'task', text: '첫 안내를 고치기' },
    { type: 'artifact', kind: 'report', title: '이번에 확인한 문제', items: ['조건이 보이지 않는다.'] },
    { type: 'metric', value: 2, unit: '개', label: '다음 실험' },
    { type: 'artifact', kind: 'process', items: ['관찰', '실험', '확인'] },
    { type: 'artifact', kind: 'actions', items: ['새 안내 실험하기'] },
  ],
});
function temporaryDirectory(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-editorial-authoring-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function readDeck(filename) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context);
  return JSON.parse(JSON.stringify(context.window.PRESENTATION));
}

test('TC-A01 the same editorial contract accepts another topic without changing literal authored data', () => {
  const authored = slide();
  const before = JSON.stringify(authored);

  const parsed = parseMarkdown(source(authored));

  assert.deepEqual(parsed.slides, [authored]);
  assert.deepEqual(model.validateDeck(parsed), []);
  assert.equal(JSON.stringify(authored), before);
  assert.equal(parsed.slides[0].items[4].text, '<script>literal()</script>');
});

test('TC-A02 only declared cover and nested tool media paths rebase from source to output', t => {
  const directory = temporaryDirectory(t);
  const sourcePath = path.join(directory, 'source', 'slides.md');
  const outputDir = path.join(directory, 'output', 'deck');
  const authored = slide();
  authored.items[1] = { type: 'media', video: './assets/clip.mp4?mode=1#start', poster: './assets/poster.png', alt: '영상' };
  authored.items[3].src = './assets/cover art.svg#mark';
  authored.items[3].alt = '표지 그림';
  authored.items[3].extra = { src: 'this-is-literal-data.svg' };
  authored.items[4].src = 'this-quote-field-is-literal.svg';
  authored.items[7].tools = [{ src: './assets/tool.svg?size=24', alt: '도구', label: '자료' }, { icon: 'record' }];
  const original = source(authored);

  const parsed = parseMarkdown(original, { sourcePath, outputDir });
  const items = parsed.slides[0].items;

  for (const [actual, relative] of [[items[1].video, './assets/clip.mp4'], [items[1].poster, './assets/poster.png'], [items[3].src, './assets/cover art.svg'], [items[7].tools[0].src, './assets/tool.svg']]) {
    assert.equal(path.resolve(outputDir, decodeURIComponent(actual.split(/[?#]/, 1)[0])), path.resolve(path.dirname(sourcePath), relative));
  }
  assert.ok(items[1].video.endsWith('?mode=1#start'));
  assert.ok(items[3].src.endsWith('cover%20art.svg#mark'));
  assert.ok(items[7].tools[0].src.endsWith('?size=24'));
  assert.equal(items[7].tools[1].icon, 'record');
  assert.equal(items[3].extra.src, 'this-is-literal-data.svg');
  assert.equal(items[4].src, 'this-quote-field-is-literal.svg');
  assert.equal(source(authored), original);
});

for (const target of ['src', 'video', 'poster', 'cover', 'tool']) {
  test(`TC-A03/${target} missing declared media preserves previous generated output`, t => {
    const directory = temporaryDirectory(t);
    const input = path.join(directory, 'slides.md');
    const output = path.join(directory, 'output');
    const valid = slide();
    valid.items[1].src = path.join(repoRoot, 'assets/photos/write.jpg');
    fs.writeFileSync(input, source(valid));
    const built = buildDeck(input, output, { repoRoot });
    const before = [built.files.content, built.files.index].map(file => fs.readFileSync(file, 'utf8'));
    const invalid = structuredClone(valid);
    let expectedPath;
    if (target === 'cover') {
      invalid.items[3].src = './missing-cover.svg'; invalid.items[3].alt = '없음'; expectedPath = 'items.3.src';
    } else if (target === 'tool') {
      invalid.items[7].tools = [{ src: './missing-tool.svg', alt: '없음' }]; expectedPath = 'items.7.tools.0.src';
    } else {
      if (target === 'video') delete invalid.items[1].src;
      invalid.items[1][target] = `./missing-${target}.png`; expectedPath = `items.1.${target}`;
    }
    fs.writeFileSync(input, source(invalid));

    assert.throws(() => buildDeck(input, output, { repoRoot }), error => error.message.includes(expectedPath) && /미디어 파일이 없습니다/.test(error.message));

    assert.deepEqual([built.files.content, built.files.index].map(file => fs.readFileSync(file, 'utf8')), before);
    assert.equal(fs.readFileSync(input, 'utf8'), source(invalid));
  });
}

test('TC-A04 the no-build starter uses root-relative local media and survives a deterministic Markdown round trip', t => {
  const directory = temporaryDirectory(t);
  const params = readDeck(path.join(repoRoot, 'examples/editorial-starter.js'));
  assert.deepEqual(model.validateDeck(params), []);
  assert.equal(params.slides.length, 1);
  const authored = params.slides[0];
  const original = JSON.stringify(params);
  const input = path.join(repoRoot, 'examples', 'editorial-starter-roundtrip.md');
  const markdown = source(authored);
  // The real starter is copied into root content.js; Markdown source paths are relative to its own folder.
  const parsed = parseMarkdown(markdown, { sourcePath: path.join(repoRoot, 'slides.md'), outputDir: directory });
  for (const item of parsed.slides[0].items) if (item.src) assert.ok(fs.statSync(path.resolve(directory, decodeURIComponent(item.src))).isFile());
  const temporaryInput = path.join(directory, 'slides.md');
  fs.writeFileSync(temporaryInput, source(parsed.slides[0]));

  const first = buildDeck(temporaryInput, path.join(directory, 'output'), { repoRoot });
  const content = fs.readFileSync(first.files.content, 'utf8');
  const html = fs.readFileSync(first.files.index, 'utf8');
  const second = buildDeck(temporaryInput, path.join(directory, 'output'), { repoRoot });

  assert.equal(fs.readFileSync(second.files.content, 'utf8'), content);
  assert.equal(fs.readFileSync(second.files.index, 'utf8'), html);
  assert.equal(JSON.stringify(params), original);
  assert.equal(fs.existsSync(input), false, 'round-trip verification does not write into the example source folder');
});

test('TC-A05 unused artifact fields warn without rewriting or treating their nested data as media', t => {
  const directory = temporaryDirectory(t);
  const input = path.join(directory, 'slides.md');
  const authored = slide();
  authored.items[1].src = path.join(repoRoot, 'assets/photos/write.jpg');
  authored.items[3].extra = { src: './not-a-media-reference.svg' };
  authored.items[4].src = './not-a-quote-image.svg';
  fs.writeFileSync(input, source(authored));

  const result = buildDeck(input, path.join(directory, 'output'), { repoRoot });

  assert.ok(result.issues.some(issue => issue.severity === 'warning' && issue.path === 'slides.0.items.3.extra'));
  assert.ok(result.issues.some(issue => issue.severity === 'warning' && issue.path === 'slides.0.items.4.src'));
  assert.equal(result.deck.slides[0].items[3].extra.src, './not-a-media-reference.svg');
  assert.equal(readDeck(result.files.content).slides[0].items[3].extra.src, './not-a-media-reference.svg');
  assert.equal(result.deck.slides[0].items[4].src, './not-a-quote-image.svg');
  assert.equal(fs.readFileSync(input, 'utf8'), source(authored));
});
