'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const model = require('../deck-model.js');
const { parseMarkdown, buildDeck } = require('../scripts/markdown-deck.cjs');
const { singleSlide, normalDecks } = require('./fixtures/decks.cjs');

const repoRoot = path.resolve(__dirname, '..');
const icons = ['brain', 'price', 'speed', 'image', 'voice', 'record', 'compare', 'select', 'share', 'code', 'chart', 'search', 'book', 'calendar', 'mail', 'globe', 'check', 'folder', 'music', 'spark'];
const tones = ['blue', 'green', 'orange', 'purple', 'yellow', 'white'];
const errors = deck => model.validateDeck(deck).filter(issue => issue.severity === 'error');
const advanced = slide => `\`\`\`stage\n${JSON.stringify(slide, null, 2)}\n\`\`\``;
const markdown = slides => `---\nid: visual-contract\ntitle: 새 주제 발표\ntheme: stage\n---\n\n${slides.map(advanced).join('\n\n---\n\n')}\n`;

function bento(preset = 'recap') {
  return { layout: 'bento', preset, items: Array.from({ length: 12 }, (_, index) => {
    if (index % 3 === 0) return { type: 'media', src: `assets/picture-${index}.svg`, alt: `장면 ${index}`, fit: 'cover', focalPoint: '40% 30%' };
    if (index % 3 === 1) return { type: 'metric', value: index === 1 ? 0 : '1.2M', unit: '%', label: `측정 ${index}`, tone: tones[index % tones.length] };
    return { type: 'text', text: `이야기 ${index}`, label: '함께 보기', tone: tones[index % tones.length] };
  }) };
}

function wall(count = 22) {
  return { layout: 'icon-wall', title: '하나의 중심 메시지', items: Array.from({ length: count }, (_, index) => index % 2
    ? { src: `assets/icon-${index}.svg`, alt: `서비스 ${index}`, label: `서비스 ${index}`, tone: tones[index % tones.length] }
    : { icon: icons[index % icons.length], label: `역할 ${index}`, tone: tones[index % tones.length] }) };
}

function pair() {
  return { layout: 'metric-pair', title: '같은 기준의 비교', items: [{ value: 0, unit: 'ms', label: '준비', tone: 'white' }, { value: '1.2M', unit: '회', label: '실행', tone: 'orange' }] };
}

function assertIsolatedError(slide, expectedPath) {
  const deck = { id: 'isolation', title: '앞뒤 장 보존', slides: [{ layout: 'statement', title: '앞 장' }, slide, { layout: 'statement', title: '뒤 장' }] };
  const original = structuredClone(deck);
  const issues = errors(deck);
  assert.ok(issues.length > 0, 'invalid authored params must explain their error');
  assert.ok(issues.every(issue => issue.slideIndex === 1 && issue.path.startsWith('slides.1')), JSON.stringify(issues));
  if (expectedPath) assert.ok(issues.some(issue => issue.path === `slides.1.${expectedPath}`), JSON.stringify(issues));
  assert.ok(issues.every(issue => typeof issue.message === 'string' && issue.message.length > 0));
  assert.deepEqual(deck, original, 'validation must preserve the full source for repair and export');
}

for (const [preset, columns, rows] of [['recap', 6, 3], ['seoul', 12, 6]]) {
  test(`TC-V01/${preset} gives twelve nonoverlapping tiles covering its complete stage`, () => {
    const composition = model.bentoPreset(preset);
    assert.equal(composition.columns, columns);
    assert.equal(composition.rows, rows);
    assert.equal(composition.slots.length, 12);
    const occupied = new Set();
    for (const slot of composition.slots) {
      for (const key of ['column', 'row', 'columnSpan', 'rowSpan']) assert.ok(Number.isInteger(slot[key]) && slot[key] >= 1, key);
      assert.ok(slot.column + slot.columnSpan - 1 <= columns);
      assert.ok(slot.row + slot.rowSpan - 1 <= rows);
      for (let row = slot.row; row < slot.row + slot.rowSpan; row += 1) {
        for (let column = slot.column; column < slot.column + slot.columnSpan; column += 1) {
          const cell = `${row}:${column}`;
          assert.ok(!occupied.has(cell), `${preset}: tiles overlap at ${cell}`);
          occupied.add(cell);
        }
      }
    }
    assert.equal(occupied.size, columns * rows, 'the composition must leave no accidental empty cells');
  });
}

test('TC-V02 default and invalid preset names have explicit results', () => {
  assert.deepEqual(model.bentoPreset(), model.bentoPreset('recap'));
  for (const preset of ['other', '', 'constructor', null, 1, {}, []]) assert.equal(model.bentoPreset(preset), null);
});

test('TC-V03 public composition results and browser exports cannot mutate later arrangements', () => {
  const first = model.bentoPreset('seoul');
  const original = structuredClone(first);
  first.slots[0].column = 100;
  first.slots.pop();
  assert.deepEqual(model.bentoPreset('seoul'), original);
  const positions = model.iconWallSlots(22);
  const expectedPositions = structuredClone(positions);
  positions[0].row = 99;
  assert.deepEqual(model.iconWallSlots(22), expectedPositions);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(repoRoot, 'deck-model.js'), 'utf8'), context);
  assert.deepEqual(JSON.parse(JSON.stringify(context.window.STAGE_MODEL.bentoPreset('recap'))), model.bentoPreset('recap'));
  assert.deepEqual(JSON.parse(JSON.stringify(context.window.STAGE_MODEL.iconWallSlots(22))), expectedPositions);
});

test('TC-V04 both twelve-tile presets accept reusable mixed media, text and numeric data unchanged', () => {
  for (const preset of ['recap', 'seoul']) {
    const deck = singleSlide(bento(preset));
    const original = structuredClone(deck);
    assert.deepEqual(model.validateDeck(deck), [], 'valid media and all six item tones must need no fallback');
    assert.deepEqual(deck, original);
  }
});

for (const count of [0, 11, 13]) {
  test(`TC-V05/${count} bento items report a slide error without trimming authored tiles`, () => {
    const slide = bento();
    slide.items = Array.from({ length: count }, (_, index) => ({ type: 'text', text: `남겨둘 항목 ${index}` }));
    assertIsolatedError(slide, 'items');
  });
}

for (const [label, mutate, expectedPath] of [
  ['unknown-preset', slide => { slide.preset = 'freeform'; }, 'preset'],
  ['unknown-tile-type', slide => { slide.items[0].type = 'script'; }, 'items.0.type'],
  ['null-tile', slide => { slide.items[0] = null; }, 'items.0'],
  ['object-metric', slide => { slide.items[1].value = { raw: 10 }; }, 'items.1.value'],
  ['missing-text', slide => { delete slide.items[2].text; }, 'items.2.text'],
  ...['column', 'row', 'columnSpan', 'rowSpan', 'span'].map(key => [`override-${key}`, slide => { slide.items[0][key] = 1; }, `items.0.${key}`]),
]) {
  test(`TC-V06/${label} rejects an unrenderable tile contract at its exact field`, () => {
    const slide = bento();
    mutate(slide);
    assertIsolatedError(slide, expectedPath);
  });
}

test('TC-V07 every supported icon-wall count has unique perimeter slots and leaves the message center empty', () => {
  for (let count = 1; count <= 22; count += 1) {
    const slots = model.iconWallSlots(count);
    assert.equal(slots.length, count);
    const cells = new Set();
    for (const slot of slots) {
      assert.ok(Number.isInteger(slot.column) && slot.column >= 1 && slot.column <= 8);
      assert.ok(Number.isInteger(slot.row) && slot.row >= 1 && slot.row <= 5);
      assert.ok(slot.row === 1 || slot.row === 5 || slot.column === 1 || slot.column === 8, 'the central six columns × three rows belong to the message');
      cells.add(`${slot.row}:${slot.column}`);
    }
    assert.equal(cells.size, count, 'every item must retain its own visible slot');
    assert.deepEqual(model.validateDeck(singleSlide(wall(count))), []);
  }
  assert.equal(new Set(model.iconWallSlots(22).map(slot => `${slot.row}:${slot.column}`)).size, 22, 'the maximum count fills the complete perimeter');
});

for (const count of [0, 23]) {
  test(`TC-V08/${count} icon-wall items fail explicitly and preserve every original item`, () => {
    assert.equal(model.iconWallSlots(count), null);
    assertIsolatedError(wall(count), 'items');
  });
}

test('TC-V08/non-integer the public icon-wall arranger rejects incompatible count inputs', () => {
  for (const count of [-1, 1.5, '2', null, undefined, {}, NaN, Infinity]) assert.equal(model.iconWallSlots(count), null);
});

for (const [label, item, expectedPath] of [
  ['missing-source', { label: '사라지지 않을 원본' }, 'items.0'],
  ['both-sources', { src: 'assets/a.svg', icon: 'brain', alt: '충돌' }, 'items.0'],
  ['unknown-icon', { icon: 'constructor' }, 'items.0.icon'],
  ['raw-icon-markup', { icon: '<svg onload="window.INJECTED=true"></svg>' }, 'items.0.icon'],
  ['video', { icon: 'brain', video: 'assets/a.mp4' }, 'items.0'],
  ['poster', { icon: 'brain', poster: 'assets/a.svg' }, 'items.0'],
  ['null-item', null, 'items.0'],
]) {
  test(`TC-V09/${label} icon-wall errors stay at their own slide and preserve authored source`, () => {
    assertIsolatedError({ layout: 'icon-wall', title: '중심', items: [item] }, expectedPath);
  });
}

test('TC-V10 two metrics accept formatted text, zero, finite values and white independently', () => {
  const slide = pair();
  for (const value of [0, 1000, -3, 1.25, '1.2M', '73%', '—']) {
    slide.items[0].value = value;
    const original = structuredClone(slide);
    assert.deepEqual(model.validateDeck(singleSlide(slide)), []);
    assert.deepEqual(slide, original);
  }
});

for (const [label, mutate, expectedPath] of [
  ['zero-items', slide => { slide.items = []; }, 'items'],
  ['one-item', slide => { slide.items.pop(); }, 'items'],
  ['three-items', slide => { slide.items.push({ value: 2, label: '세 번째' }); }, 'items'],
  ['missing-label', slide => { delete slide.items[0].label; }, 'items.0.label'],
  ...[null, true, [], {}, NaN, Infinity].map((value, index) => [`invalid-value-${index}`, slide => { slide.items[0].value = value; }, 'items.0.value']),
]) {
  test(`TC-V11/${label} metric-pair rejects incompatible params without rewriting either metric`, () => {
    const slide = pair();
    mutate(slide);
    assertIsolatedError(slide, expectedPath);
  });
}

test('TC-V12 all twenty semantic icon keys, six colors and legacy category symbols stay usable', () => {
  assert.deepEqual(model.iconNames, icons);
  for (const [index, icon] of icons.entries()) {
    const slide = { layout: 'categories', items: [{ icon, label: `범주 ${index}`, tone: tones[index % tones.length] }] };
    assert.deepEqual(model.validateDeck(singleSlide(slide)), [], 'every documented icon and color must render without a fallback warning');
  }
  const legacy = { layout: 'categories', items: [{ symbol: '◇', label: '기존 사용자', tone: 'white' }, { icon: 'brain', symbol: 'B', label: '두 입력 공존', tone: 'blue' }] };
  const original = structuredClone(legacy);
  assert.deepEqual(model.validateDeck(singleSlide(legacy)), [], 'legacy symbol and new white must not silently fall back');
  assert.deepEqual(legacy, original, 'icon precedence must retain the legacy symbol source');
  assert.deepEqual(model.validateDeck(singleSlide(pair())), [], 'white in a metric pair is a supported color');
});

for (const icon of ['<img src=x onerror="window.INJECTED=true">', 'not-a-key', 42, {}]) {
  test(`TC-V13/${typeof icon}-${String(icon)} categories explain invalid icons rather than treating input as SVG markup`, () => {
    assertIsolatedError({ layout: 'categories', items: [{ label: '안전한 문구', icon }] }, 'items.0.icon');
  });
}

test('TC-V14 advanced Markdown retains the exact params of every nineteen-layout renderer contract', () => {
  const slides = [...structuredClone(normalDecks[0].slides), bento(), wall(), pair()];
  const deck = parseMarkdown(markdown(slides));
  assert.deepEqual(deck.slides, slides);
  assert.equal(new Set(deck.slides.map(slide => slide.layout)).size, 19);
  assert.deepEqual(errors(deck), []);
  const invalid = bento();
  invalid.items[0].span = 2;
  const invalidDeck = parseMarkdown(markdown([invalid]));
  assert.deepEqual(invalidDeck.slides, [invalid]);
  assert.deepEqual(errors(invalidDeck), errors(singleSlide(invalid)), 'Markdown and direct JavaScript must diagnose the same invalid field');
});

test('TC-V15 Markdown rebases new-layout media while keeping text and semantic icon keys literal', () => {
  const sourcePath = path.join(os.tmpdir(), 'stage-visual-source', 'source', 'slides.md');
  const outputDir = path.join(os.tmpdir(), 'stage-visual-source', 'output', 'deck');
  const slides = [bento(), wall(), pair()];
  slides[0].items[2].text = '<svg onload="window.INJECTED=true"></svg>';
  const deck = parseMarkdown(markdown(slides), { sourcePath, outputDir });
  for (const [slideIndex, itemIndex, reference] of [[0, 0, 'assets/picture-0.svg'], [1, 1, 'assets/icon-1.svg']]) {
    assert.equal(path.resolve(outputDir, deck.slides[slideIndex].items[itemIndex].src), path.resolve(path.dirname(sourcePath), reference));
  }
  assert.equal(deck.slides[0].items[2].text, slides[0].items[2].text);
  assert.equal(deck.slides[1].items[0].icon, 'brain');
});

test('TC-V16 invalid new-layout Markdown does not replace previous generated output', t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-visual-build-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const inputPath = path.join(directory, 'slides.md');
  const outputDir = path.join(directory, 'output');
  fs.writeFileSync(inputPath, markdown([pair()]));
  const first = buildDeck(inputPath, outputDir, { repoRoot });
  const original = Object.values(first.files).map(file => fs.readFileSync(file, 'utf8'));
  for (const slide of [bento(), wall(23), { ...pair(), items: [pair().items[0]] }]) {
    if (slide.layout === 'bento') slide.items.pop();
    fs.writeFileSync(inputPath, markdown([slide]));
    assert.throws(() => buildDeck(inputPath, outputDir, { repoRoot }), /입력 검증 실패/);
    assert.deepEqual(Object.values(first.files).map(file => fs.readFileSync(file, 'utf8')), original);
  }
});
