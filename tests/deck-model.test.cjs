'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { clone, singleSlide, normalDecks } = require('./fixtures/decks.cjs');
const { validateDeck, packMosaic } = require('../deck-model.js');

function errors(deck) { return validateDeck(deck).filter(issue => issue.severity === 'error'); }
function mediaItems(count) { return Array.from({ length: count }, (_, index) => ({ src: `assets/${index}.jpg`, alt: `장면 ${index}`, label: `장면 ${index}` })); }

for (const [index, deck] of normalDecks.entries()) {
  test(`TC-00${index + 1} validates structured params for ${deck.id} across all 16 layouts`, () => {
    const original = clone(deck);
    const issues = errors(deck);
    assert.deepEqual(issues, []);
    assert.equal(new Set(deck.slides.map(slide => slide.layout)).size, 16);
    assert.deepEqual(deck, original, 'validation must preserve authored content');
  });
}

const invalidSlides = [
  { id: 'TC-003', label: 'null slide', slide: null },
  { id: 'TC-004', label: 'comparison points object', slide: { layout: 'compare', title: '비교', left: { points: {} }, right: { points: [] } } },
  { id: 'TC-005', label: 'steps string', slide: { layout: 'steps', title: '순서', steps: 'A' } },
  { id: 'TC-006', label: 'inherited constructor layout', slide: { layout: 'constructor', title: '잘못된 양식' } },
];
for (const { id, label, slide } of invalidSlides) {
  test(`${id} reports ${label} at its own slide without altering other slides`, () => {
    const deck = { id: 'isolation', title: '오류 격리', slides: [{ layout: 'statement', title: '앞 장' }, clone(slide), { layout: 'statement', title: '뒤 장' }] };
    const original = clone(deck);
    const issues = errors(deck);
    assert.ok(issues.length > 0, 'invalid input must produce a user-facing error');
    assert.ok(issues.every(issue => issue.slideIndex === 1), JSON.stringify(issues));
    assert.ok(issues.every(issue => /^slides\.1(?:\.|$)/.test(issue.path)), JSON.stringify(issues));
    assert.ok(issues.every(issue => typeof issue.message === 'string' && issue.message.length > 0));
    assert.deepEqual(deck, original);
  });
}

function assertValidPacking(items) {
  const original = clone(items);
  const positions = packMosaic(items);
  assert.ok(Array.isArray(positions), 'a valid mosaic must have an explicit position per item');
  assert.equal(positions.length, items.length, 'every input picture must be retained');
  const occupied = new Set();
  positions.forEach((position, index) => {
    assert.equal(position.span, items[index].span || 1, 'positions correspond to original item indices');
    assert.ok(Number.isInteger(position.row) && position.row >= 1 && position.row <= 2);
    assert.ok(Number.isInteger(position.column) && position.column >= 1 && position.column + position.span - 1 <= 4);
    for (let column = position.column; column < position.column + position.span; column += 1) {
      const cell = `${position.row}:${column}`;
      assert.ok(!occupied.has(cell), `pictures must not overlap at ${cell}`);
      occupied.add(cell);
    }
  });
  assert.deepEqual(items, original, 'packing must preserve authored order and metadata');
  return positions;
}

test('TC-007 mosaic span [2,1,2,1,2] retains every picture in two rows without overlap', () => {
  const items = [2, 1, 2, 1, 2].map((span, index) => ({ src: `assets/work-${index}.jpg`, span, label: `작품 ${index}` }));
  assert.deepEqual(errors(singleSlide({ layout: 'mosaic', title: '작품 모음', items })), []);
  assertValidPacking(items);
});

test('TC-008 seven steps produce a configuration error instead of silently accepting clipped content', () => {
  const deck = singleSlide({ layout: 'steps', title: '다음 순서', steps: Array.from({ length: 7 }, (_, index) => ({ title: `단계 ${index}`, description: '짧은 설명' })) });
  assert.ok(errors(deck).some(issue => issue.slideIndex === 0 && issue.path === 'slides.0.steps'));
  assert.equal(deck.slides[0].steps.length, 7, 'error handling must retain source data for export and repair');
});

test('TC-009 five results produce a configuration error while preserving all source items', () => {
  const deck = singleSlide({ layout: 'results', title: '결과물', items: mediaItems(5) });
  assert.ok(errors(deck).some(issue => issue.slideIndex === 0 && issue.path === 'slides.0.items'));
  assert.equal(deck.slides[0].items.length, 5);
});

const boundaries = [
  ['steps-one', { layout: 'steps', title: '단계', steps: [{ title: '하나', description: '설명' }] }],
  ['steps-three', { layout: 'steps', title: '단계', steps: Array.from({ length: 3 }, () => ({ title: '제목', description: '설명' })) }],
  ['results-one', { layout: 'results', title: '결과', items: mediaItems(1) }],
  ['results-four', { layout: 'results', title: '결과', items: mediaItems(4) }],
  ['gallery-one', { layout: 'gallery', items: mediaItems(1) }],
  ['gallery-six', { layout: 'gallery', items: mediaItems(6) }],
  ['categories-one', { layout: 'categories', items: [{ symbol: '1', label: '역할' }] }],
  ['categories-five', { layout: 'categories', items: Array.from({ length: 5 }, () => ({ symbol: '1', label: '역할' })) }],
  ['compare-zero', { layout: 'compare', title: '비교', left: { points: [] }, right: { points: [] } }],
  ['compare-three', { layout: 'compare', title: '비교', left: { points: ['A', 'B', 'C'] }, right: { points: ['A', 'B', 'C'] } }],
];
for (const [label, slide] of boundaries) {
  test(`TC-010/${label} accepts the documented quantity boundary`, () => {
    assert.deepEqual(errors(singleSlide(slide)), []);
  });
}

test('TC-011 validation and packing retain raw authored data including invalid and extra fields', () => {
  const deck = singleSlide({ layout: 'results', title: '수정할 내용', items: mediaItems(5), notes: '나중에 고칠 노트', extension: { authored: true } });
  const before = JSON.stringify(deck);
  assert.ok(errors(deck).length > 0);
  assert.equal(JSON.stringify(deck), before, 'the source remains serializable for intact content.js export');
  const items = [{ src: 'original.jpg', span: 3, label: '수정할 작품' }];
  assert.equal(packMosaic(items), null);
  assert.deepEqual(items, [{ src: 'original.jpg', span: 3, label: '수정할 작품' }]);
});

// TC-012 is a real-browser case: long text warning -> edit -> warning clears,
// including presenter/overview/read/print. Geometry is not simulated by this suite.

for (const [label, items] of [
  ['empty', []],
  ['over-capacity', Array.from({ length: 9 }, () => ({ span: 1 }))],
  ['invalid-span', [{ span: 3 }]],
  ['zero-span', [{ span: 0 }]],
]) {
  test(`TC-013/${label} returns an explicit failure for an unrenderable mosaic`, () => {
    const before = clone(items);
    assert.equal(packMosaic(items), null);
    assert.deepEqual(items, before);
  });
}

test('TC-014 public model works as a browser classic script without a module loader', () => {
  const browser = {};
  browser.window = browser;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../deck-model.js'), 'utf8'), browser);
  assert.equal(typeof browser.STAGE_MODEL.validateDeck, 'function');
  assert.equal(typeof browser.STAGE_MODEL.packMosaic, 'function');
  assert.equal(browser.STAGE_MODEL.validateDeck(normalDecks[0]).filter(issue => issue.severity === 'error').length, 0);
});

test('TC-015 chart accepts exported numeric strings and rejects non-finite input', () => {
  const slide = { layout: 'chart', title: '시간 비교', chart: { max: 200, unit: 'ms', rows: [{ label: 'A', value: '47' }, { label: 'B', value: 136 }] } };
  assert.deepEqual(errors(singleSlide(slide)), []);
  slide.chart.rows[0].value = 'not-a-number';
  assert.ok(errors(singleSlide(slide)).some(issue => issue.path === 'slides.0.chart.rows.0.value'));
});

test('TC-015/zero-accepted accepts zero as the lower boundary of the bar chart', () => {
  const deck = singleSlide({ layout: 'chart', title: '기준값', chart: { max: 100, rows: [{ label: 'A', value: 0 }] } });
  const original = clone(deck);
  assert.deepEqual(errors(deck), []);
  assert.deepEqual(deck, original);
});

test('TC-015/negative-rejected explains an unsupported negative bar value without changing it', () => {
  const deck = singleSlide({ layout: 'chart', title: '기준값', chart: { max: 100, rows: [{ label: 'A', value: -1 }] } });
  const original = clone(deck);
  assert.ok(errors(deck).some(issue => issue.path === 'slides.0.chart.rows.0.value'));
  assert.deepEqual(deck, original);
});

test('TC-016 empty deck is explained without throwing', () => {
  const issues = errors({ title: '빈 발표', slides: [] });
  assert.ok(issues.some(issue => issue.path === 'slides'));
});

test('TC-017 shipped 20-slide example remains valid under the public contract', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../content.js'), 'utf8'), context);
  const deck = context.window.PRESENTATION;
  assert.equal(deck.slides.length, 20);
  assert.equal(new Set(deck.slides.map(slide => slide.layout)).size, 16);
  assert.deepEqual(errors(deck), []);
});

test('TC-018 existing mosaic and maximum eight small pictures remain supported', () => {
  assertValidPacking([2, 1, 1, 1, 1, 2].map(span => ({ span })));
  assertValidPacking(Array.from({ length: 8 }, () => ({ span: 1 })));
});

test('TC-019 alternate project-review content file is accepted without engine changes', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../examples/project-review.js'), 'utf8'), context);
  const deck = context.window.PRESENTATION;
  assert.ok(Array.isArray(deck.slides) && deck.slides.length > 0);
  assert.notEqual(deck.id, 'stage-photo-color-example');
  assert.deepEqual(errors(deck), []);
});

for (const [label, slide, issuePath] of [
  ['gallery-seven', { layout: 'gallery', items: mediaItems(7) }, 'slides.0.items'],
  ['categories-six', { layout: 'categories', items: Array.from({ length: 6 }, () => ({ symbol: '1', label: '역할' })) }, 'slides.0.items'],
  ['compare-four', { layout: 'compare', title: '비교', left: { points: ['A', 'B', 'C', 'D'] }, right: { points: [] } }, 'slides.0.left.points'],
  ['mosaic-over-capacity', { layout: 'mosaic', items: mediaItems(5).map(item => ({ ...item, span: 2 })) }, 'slides.0.items'],
]) {
  test(`TC-020/${label} explains a quantity beyond the supported layout contract`, () => {
    const deck = singleSlide(slide);
    const original = clone(deck);
    assert.ok(errors(deck).some(issue => issue.path === issuePath));
    assert.deepEqual(deck, original);
  });
}

for (const value of ['1.2M', '42', 42]) {
  test(`TC-021/accept-${typeof value}-${String(value)} accepts a readable metric display value`, () => {
    assert.deepEqual(errors(singleSlide({ layout: 'metric', value, label: '핵심 지표' })), []);
  });
}
for (const [label, value] of [['object', { count: 42 }], ['array', [42]], ['boolean', false], ['null', null]]) {
  test(`TC-021/reject-${label} explains an invalid metric value without rewriting it`, () => {
    const deck = singleSlide({ layout: 'metric', value, label: '핵심 지표' });
    const original = clone(deck);
    assert.ok(errors(deck).some(issue => issue.path === 'slides.0.value'));
    assert.deepEqual(deck, original);
  });
}

test('blocks view validates composition settings and H2 bindings without mutating the authored tree', () => {
  const {parseDocument}=require('../scripts/markdown-document.cjs');
  const source='<!-- stage-slide\ncompose: editorial\ntone: neutral\nfit: cover\nfocus: "0% 100%"\n-->\n# H\n\n<!-- stage-group\nprimary: true\ntone: neutral\n-->\n## One\n\nText\n\n## Two\n\nEnd';
  const deck=parseDocument(source);const original=clone(deck);
  assert.deepEqual(errors(deck),[]);assert.deepEqual(deck,original);
  const mutations=[
    s=>s.view.extra=true,s=>s.view.tone='blue',s=>s.view.compose='invented',s=>s.view.fit='fill',s=>s.view.focus='100.1% 0%',s=>s.view.focus='0% 0%; color:red',s=>s.tone='pink',
    s=>s.view.groups[0].copy='text',s=>s.view.groups[0].tone='pink',s=>s.view.groups[0].primary='yes',s=>s.view.groups[0].start=1,s=>s.view.groups[0].end=4,s=>s.view.groups[0].end=1,s=>s.view.groups[0].origin={line:5,endLine:3},s=>s.view.groups.push({...s.view.groups[0]}),s=>s.view.groups='bad'
  ];
  for(const mutate of mutations){const changed=clone(deck);mutate(changed.slides[0]);assert.ok(errors(changed).length,JSON.stringify(changed.slides[0].view));}
  const legacyTone=validateDeck({title:'Legacy',slides:[{layout:'statement',title:'H',tone:'neutral'}]});
  assert.ok(legacyTone.some(issue=>issue.path==='slides.0.tone'),'neutral remains outside legacy tone choices');
  assert.ok(errors({title:'Legacy',slides:[{layout:'statement',title:'H',view:{compose:'message'}}]}).some(issue=>issue.path==='slides.0.view'));
});
