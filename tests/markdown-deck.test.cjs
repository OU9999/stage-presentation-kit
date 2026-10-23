'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { normalDecks } = require('./fixtures/decks.cjs');
const { validateDeck } = require('../deck-model.js');
const { parseMarkdown, buildDeck } = require('../scripts/markdown-deck.cjs');

const repoRoot = path.resolve(__dirname, '..');
const frontmatter = metadata => ['---', ...Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`), '---'].join('\n');
const metadata = text => `<!-- stage\n${text}\n-->`;
const markdown = slides => `${frontmatter({ id: 'markdown-contract', title: '새로운 이야기', speaker: '발표자', date: '2027. 02. 01.', theme: 'paper' })}\n\n${slides.join('\n\n---\n\n')}\n`;
const advanced = slide => `\`\`\`stage\n${JSON.stringify(slide, null, 2)}\n\`\`\``;

function temporaryDirectory(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-markdown-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function readContent(file) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
  return { deck: JSON.parse(JSON.stringify(context.window.PRESENTATION)), context };
}

function modelErrors(deck) { return validateDeck(deck).filter(issue => issue.severity === 'error'); }

test('TC-M01 frontmatter, slide metadata and Markdown content produce reusable slide params', () => {
  const source = markdown([
    `${metadata('layout: cover\nalign: center\nquiet: true\nnotes: "첫 줄\\n다음 줄"')}\n# 첫 번째 제목\n# 두 번째 제목\n\n짧은 소개 문장.`,
    `${metadata('layout: demo')}\n# 실행으로 보여줍니다\n\n- 조건 선택\n- 실행\n- 결과 확인\n\n![정적 화면](../../assets/example.svg)`,
    `${metadata('layout: image\nzoom: 1.5')}\n# 한 장의 장면\n\n사진의 크레딧.\n\n![호수 사진](../../assets/lake.jpg)`,
  ]);

  const deck = parseMarkdown(source);

  assert.equal(deck.id, 'markdown-contract');
  assert.equal(deck.theme, 'paper');
  assert.equal(deck.date, '2027. 02. 01.');
  assert.equal(deck.slides.length, 3);
  assert.deepEqual(deck.slides[0].title, ['첫 번째 제목', '두 번째 제목']);
  assert.equal(deck.slides[0].subtitle, '짧은 소개 문장.');
  assert.equal(deck.slides[0].notes, '첫 줄\n다음 줄');
  assert.equal(deck.slides[0].quiet, true);
  assert.deepEqual(deck.slides[1].steps, ['조건 선택', '실행', '결과 확인']);
  assert.equal(deck.slides[1].src, '../../assets/example.svg');
  assert.equal(deck.slides[1].alt, '정적 화면');
  assert.equal(deck.slides[2].caption, '사진의 크레딧.');
  assert.equal(deck.slides[2].zoom, 1.5);
  assert.deepEqual(modelErrors(deck), []);
});

test('TC-M02 advanced stage JSON supports every existing layout without changing its params', () => {
  const authored = normalDecks[0];
  const source = markdown(authored.slides.map(advanced));

  const deck = parseMarkdown(source);

  assert.deepEqual(deck.slides, authored.slides);
  assert.equal(new Set(deck.slides.map(slide => slide.layout)).size, 16);
  assert.deepEqual(modelErrors(deck), []);
});

test('TC-M03 valid fenced notes preserve separator text and malformed fenced separators report JSON errors', () => {
  const slide = { layout: 'statement', title: '구분자', notes: '이전\n---\n다음' };
  const deck = parseMarkdown(markdown([advanced(slide)]));
  assert.equal(deck.slides.length, 1);
  assert.equal(deck.slides[0].notes, slide.notes);
  assert.throws(() => parseMarkdown(markdown(['```stage\n---\n```'])), /JSON/i);
});

for (const [label, source] of [
  ['unclosed-frontmatter', '---\ntitle: 닫히지 않은 문서\n# 제목'],
  ['unclosed-metadata', markdown(['<!-- stage\nlayout: statement\n# 닫히지 않은 설정'])],
  ['invalid-stage-json', markdown(['```stage\n{"layout":"chart",}\n```'])],
  ['non-object-stage-json', markdown(['```stage\n["statement"]\n```'])],
]) {
  test(`TC-M04/${label} explicitly rejects malformed source`, () => {
    assert.throws(() => parseMarkdown(source), error => error instanceof Error && error.message.length > 0);
  });
}

test('TC-M05 duplicate definitions fail even when the repeated field has the same value', () => {
  const sameTitle = `${metadata('layout: statement')}\n# 같은 제목\n\n${advanced({ title: '같은 제목' })}`;
  const duplicateParagraph = `${metadata('layout: statement\nsubtitle: "설명"')}\n# 제목\n\n설명`;
  assert.throws(() => parseMarkdown(markdown([sameTitle])), /title/);
  assert.throws(() => parseMarkdown(markdown([duplicateParagraph])), /subtitle/);
  assert.throws(() => parseMarkdown('---\nid: first\nid: second\n---\n# 제목'), /id/);
});

for (const [label, source] of [
  ['list-outside-demo', markdown([`${metadata('layout: statement')}\n# 제목\n\n- 보존해야 할 항목`])],
  ['table', markdown([`${metadata('layout: statement')}\n# 제목\n\n| 이름 | 수치 |\n| --- | --- |\n| A | 1 |`])],
  ['unknown-code-fence', markdown(['```javascript\nwindow.lost = true;\n---\n```'])],
  ['empty-document', ''],
]) {
  test(`TC-M06/${label} explains unsupported content instead of dropping it`, () => {
    assert.throws(() => parseMarkdown(source), error => error instanceof Error && error.message.length > 0);
  });
}

test('TC-M07 nested media paths rebase from the Markdown source to the output document', t => {
  const directory = temporaryDirectory(t);
  const sourcePath = path.join(directory, 'source', 'slides.md');
  const outputDir = path.join(directory, 'published', 'deck');
  const slide = {
    layout: 'gallery', items: [
      { src: '../images/a.jpg', alt: '사진 A', fit: 'cover' },
      { video: '../movies/a.mp4', poster: '../images/poster.jpg', caption: '영상' },
      { src: 'https://example.com/a.jpg', alt: '외부 사진' },
    ],
  };

  const deck = parseMarkdown(markdown([advanced(slide)]), { sourcePath, outputDir, repoRoot: directory });

  for (const [item, key, relative] of [[0, 'src', '../images/a.jpg'], [1, 'video', '../movies/a.mp4'], [1, 'poster', '../images/poster.jpg']]) {
    assert.equal(path.resolve(outputDir, deck.slides[0].items[item][key]), path.resolve(path.dirname(sourcePath), relative));
  }
  assert.equal(deck.slides[0].items[2].src, 'https://example.com/a.jpg');
});

test('TC-M08 HTML and JavaScript-looking text remain literal data in generated files', t => {
  const directory = temporaryDirectory(t);
  const input = path.join(directory, 'slides$&.md');
  const output = path.join(directory, 'output');
  const title = "</script><img src=x onerror=\"window.INJECTED=true\"> $& $' $`";
  const paragraph = '"; window.INJECTED = true; //';
  fs.writeFileSync(input, `${frontmatter({ id: 'literal-text', title })}\n\n${metadata('layout: statement')}\n# ${title}\n\n${paragraph}\n`);

  const built = buildDeck(input, output, { repoRoot });
  const generated = readContent(built.files.content);

  assert.equal(generated.deck.title, title);
  assert.equal(generated.deck.slides[0].subtitle, paragraph);
  assert.equal(generated.context.window.INJECTED, undefined);
  const html = fs.readFileSync(built.files.index, 'utf8');
  assert.ok(!html.includes('<img src=x'));
  assert.equal(
    /<title>([\s\S]*?)<\/title>/.exec(html)[1],
    '&lt;/script&gt;&lt;img src=x onerror=&quot;window.INJECTED=true&quot;&gt; $&amp; $&#39; $` — Stage',
    'replacement metacharacters in an authored title must stay literal in the initial HTML',
  );
  assert.ok(html.includes('href="../slides$&amp;.md">slides$&amp;.md</a>'), 'the original Markdown filename must stay literal in the help link');
});

test('TC-M09 repeated builds are deterministic and invalid input does not replace previous output', t => {
  const directory = temporaryDirectory(t);
  const input = path.join(directory, 'slides.md');
  const output = path.join(directory, 'output');
  fs.writeFileSync(input, markdown([`${metadata('layout: statement')}\n# 같은 원본\n\n같은 결과.`]));
  const first = buildDeck(input, output, { repoRoot });
  const files = [first.files.index, first.files.content];
  const before = files.map(file => fs.readFileSync(file, 'utf8'));

  const second = buildDeck(input, output, { repoRoot });
  assert.deepEqual(second.deck, first.deck);
  assert.deepEqual(files.map(file => fs.readFileSync(file, 'utf8')), before);
  fs.writeFileSync(input, markdown([advanced({ layout: 'steps', title: '범위를 넘는 원본', steps: Array.from({ length: 7 }, () => ({ title: '보존', description: '고칠 내용' })) })]));
  assert.throws(() => buildDeck(input, output, { repoRoot }), Error);
  assert.deepEqual(files.map(file => fs.readFileSync(file, 'utf8')), before);
});

test('TC-M09/missing-media rejects an unavailable local image before writing new output', t => {
  const directory = temporaryDirectory(t);
  const input = path.join(directory, 'slides.md');
  const output = path.join(directory, 'output');
  fs.writeFileSync(input, markdown([`${metadata('layout: image')}\n# 사진\n\n![없는 사진](./missing.jpg)`]));
  assert.throws(() => buildDeck(input, output, { repoRoot }), Error);
  assert.equal(fs.existsSync(path.join(output, 'content.js')), false);
  assert.equal(fs.existsSync(path.join(output, 'index.html')), false);
});

const exampleSlugs = ['product-launch', 'engineering-review', 'photo-story', 'workshop'];
test('TC-M10 four saved examples match their Markdown sources and use existing local media', () => {
  const layouts = new Set();
  for (const slug of exampleSlugs) {
    const directory = path.join(repoRoot, 'examples', slug);
    const sourcePath = path.join(directory, 'slides.md');
    const expected = parseMarkdown(fs.readFileSync(sourcePath, 'utf8'), { sourcePath, outputDir: directory, repoRoot });
    const actual = readContent(path.join(directory, 'content.js')).deck;
    assert.deepEqual(actual, expected, `${slug}: generated content must match authored Markdown`);
    assert.equal(actual.slides.length, 7, `${slug}: the complete seven-slide example must be retained`);
    assert.deepEqual(modelErrors(actual), [], `${slug}: generated content must follow the renderer contract`);
    const html = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
    for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (reference.startsWith('#') || reference.startsWith('data:')) continue;
      assert.ok(!/^[a-z][a-z\d+.-]*:/i.test(reference), `${slug}: runtime references must stay local: ${reference}`);
      assert.ok(!path.isAbsolute(reference), `${slug}: runtime references must survive moving the repository`);
      const localFile = reference.split(/[?#]/, 1)[0];
      assert.ok(fs.statSync(path.resolve(directory, localFile)).isFile(), `${slug}: runtime reference must exist: ${reference}`);
    }
    for (const slide of actual.slides) {
      layouts.add(slide.layout);
      for (const item of [slide, ...(slide.items || [])]) {
        for (const key of ['src', 'video', 'poster']) {
          if (!item[key]) continue;
          assert.ok(!/^[a-z][a-z\d+.-]*:/i.test(item[key]), `${slug}: media must be local: ${item[key]}`);
          assert.ok(!path.isAbsolute(item[key]), `${slug}: media paths must survive moving the repository`);
          assert.ok(fs.statSync(path.resolve(directory, item[key])).isFile(), `${slug}: ${key} must point to a saved local asset`);
        }
      }
    }
  }
  assert.equal(layouts.size, 16, 'the examples together must demonstrate every existing layout');
});

test('TC-M11 the original JavaScript entry point stays usable alongside Markdown authoring', () => {
  const { deck } = readContent(path.join(repoRoot, 'content.js'));
  assert.equal(deck.id, 'stage-photo-color-example');
  assert.equal(deck.slides.length, 20);
  assert.deepEqual(modelErrors(deck), []);
  const index = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
  assert.match(index, /src="content\.js(?:\?[^\"]*)?"/);
});

test('TC-M12 rebuilding changed Markdown and shared runtime updates their cache addresses', t => {
  const directory = temporaryDirectory(t);
  const runtime = path.join(directory, 'runtime');
  const input = path.join(directory, 'source.md');
  const output = path.join(directory, 'published', 'deck');
  fs.mkdirSync(runtime);
  for (const file of ['index.html', 'styles.css', 'deck-model.js', 'app.js']) fs.copyFileSync(path.join(repoRoot, file), path.join(runtime, file));
  const reference = (html, filename) => {
    const entry = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).find(value => path.basename(value.split(/[?#]/, 1)[0]) === filename);
    assert.ok(entry, `generated HTML must reference ${filename}`);
    return entry;
  };

  fs.writeFileSync(input, markdown([`${metadata('layout: statement')}\n# 처음 문장`]));
  const first = buildDeck(input, output, { repoRoot: runtime });
  const initialHtml = fs.readFileSync(first.files.index, 'utf8');
  const initialContent = reference(initialHtml, 'content.js');
  for (const filename of ['styles.css', 'deck-model.js', 'app.js']) {
    const address = reference(initialHtml, filename);
    assert.ok(fs.statSync(path.resolve(output, address.split(/[?#]/, 1)[0])).isFile(), `${filename}: a cache query must not prevent runtime path rebasing`);
  }

  fs.writeFileSync(input, markdown([`${metadata('layout: statement')}\n# 수정한 문장`]));
  const changed = buildDeck(input, output, { repoRoot: runtime });
  const changedHtml = fs.readFileSync(changed.files.index, 'utf8');
  assert.notEqual(reference(changedHtml, 'content.js'), initialContent, 'changed source content must get a fresh script address');
  assert.equal(readContent(changed.files.content).deck.slides[0].title, '수정한 문장');

  const priorApp = reference(changedHtml, 'app.js');
  fs.appendFileSync(path.join(runtime, 'app.js'), '\n/* Runtime cache regression fixture. */\n');
  const runtimeChanged = buildDeck(input, output, { repoRoot: runtime });
  assert.notEqual(reference(fs.readFileSync(runtimeChanged.files.index, 'utf8'), 'app.js'), priorApp, 'changed runtime content must get a fresh script address');
});
