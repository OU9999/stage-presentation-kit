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
const motions = ['none', 'fade', 'rise', 'stagger', 'chart'];
const errors = deck => validateDeck(deck).filter(issue => issue.severity === 'error');
const source = slides => '---\nid: reusable-motion\ntitle: 다른 발표\n---\n\n' + slides.map(slide => '```stage\n' + JSON.stringify(slide) + '\n```').join('\n\n---\n\n') + '\n';

function directory(t) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-motion-contract-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  return temporary;
}

test('TC-MN01 optional motions validate across all nineteen layouts and preserve authored data', () => {
  const deck = structuredClone(normalDecks[0]);
  deck.slides.push(
    { layout: 'bento', items: Array.from({ length: 12 }, () => ({ type: 'metric', value: 3, label: '관찰' })) },
    { layout: 'icon-wall', title: '연결', items: [{ icon: 'share' }] },
    { layout: 'metric-pair', items: [{ value: 24, label: '이전' }, { value: 8, label: '이후' }] },
  );
  assert.equal(new Set(deck.slides.map(slide => slide.layout)).size, 19);
  for (const motion of [undefined, ...motions]) {
    const authored = structuredClone(deck);
    if (motion !== undefined) authored.slides.forEach(slide => { slide.motion = motion; });
    const before = structuredClone(authored);
    assert.deepEqual(errors(authored), [], `motion=${motion}`);
    assert.deepEqual(authored, before);
  }
});

test('TC-MN02 malformed motions report their own slide without changing repairable source', () => {
  for (const motion of ['spin', 'Rise', '', ' rise ', null, 0, false, {}, ['rise']]) {
    const deck = { slides: [{ layout: 'statement', title: '앞' }, { layout: 'statement', title: '고칠 장', motion }, { layout: 'statement', title: '뒤' }] };
    const before = structuredClone(deck);
    const issues = errors(deck);
    assert.ok(issues.some(issue => issue.path === 'slides.1.motion' && issue.slideIndex === 1), JSON.stringify(motion));
    assert.ok(issues.every(issue => issue.slideIndex === 1));
    assert.deepEqual(deck, before);
  }
});

test('TC-MN03 Markdown metadata and params retain the same motion and literal notes', () => {
  for (const motion of motions) {
    const params = { layout: 'statement', motion, title: '같은 메시지', notes: 'motion: spin은 메모의 글자입니다.' };
    const metadata = '---\nid: reusable-motion\ntitle: 다른 발표\n---\n\n<!-- stage\nlayout: statement\nmotion: ' + motion + '\nnotes: motion: spin은 메모의 글자입니다.\n-->\n# 같은 메시지\n';
    const flat = parseMarkdown(metadata);
    const advanced = parseMarkdown(source([params]));
    assert.deepEqual(flat.slides, [params]);
    assert.deepEqual(advanced.slides, [params]);
    assert.deepEqual(errors(flat), []);
    assert.deepEqual(errors(advanced), []);
  }
});

test('TC-MN04 invalid motion builds retain both previous output files and the authored input', t => {
  const temporary = directory(t);
  const input = path.join(temporary, 'slides.md');
  const output = path.join(temporary, 'output');
  fs.writeFileSync(input, source([{ layout: 'statement', title: '이전 결과', motion: 'rise' }]));
  const built = buildDeck(input, output, { repoRoot });
  const files = [built.files.content, built.files.index];
  const before = files.map(file => fs.readFileSync(file, 'utf8'));
  for (const motion of ['spin', null, { duration: 300 }]) {
    const invalid = source([{ layout: 'statement', title: '고칠 원고', motion }]);
    fs.writeFileSync(input, invalid);
    assert.throws(() => buildDeck(input, output, { repoRoot }), error => /slides\.0\.motion/.test(error.message));
    assert.deepEqual(files.map(file => fs.readFileSync(file, 'utf8')), before);
    assert.equal(fs.readFileSync(input, 'utf8'), invalid);
  }
});

test('TC-MN05 generated content preserves explicit and omitted motions with deterministic rebuilds', t => {
  const temporary = directory(t);
  const input = path.join(temporary, 'slides.md');
  const output = path.join(temporary, 'output');
  const slides = motions.map(motion => ({ layout: 'statement', title: '다른 주제 ' + motion, motion }));
  slides.push({ layout: 'statement', title: '기존 원고' });
  fs.writeFileSync(input, source(slides));
  const built = buildDeck(input, output, { repoRoot });
  const files = [built.files.content, built.files.index];
  const first = files.map(file => fs.readFileSync(file, 'utf8'));
  const context = { window: {} };
  vm.runInNewContext(first[0], context);
  const actual = JSON.parse(JSON.stringify(context.window.PRESENTATION));
  assert.deepEqual(actual.slides, slides);
  assert.equal(Object.hasOwn(actual.slides.at(-1), 'motion'), false);
  assert.deepEqual(errors(actual), []);
  buildDeck(input, output, { repoRoot });
  assert.deepEqual(files.map(file => fs.readFileSync(file, 'utf8')), first);
});
