'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const model = require('../deck-model.js');
const { singleSlide } = require('./fixtures/decks.cjs');

function editorial() {
  return { layout: 'bento', preset: 'seoul', variant: 'editorial', items: [
    { type: 'metric', value: 24, unit: '개', label: '관찰', tone: 'blue' },
    { type: 'media', src: 'photos/write.jpg', alt: '기록', caption: '장면을 남기기' },
    { type: 'metric', value: 6, label: '주제', tone: 'orange' },
    { type: 'artifact', kind: 'cover', label: 'A STUDY', title: ['새로운', '기록'], subtitle: '다음 행동', footer: '기록 / 분류', edition: '2027', src: 'art/cover.svg', alt: '표지 그림' },
    { type: 'artifact', kind: 'quote', label: '기록 08', text: '<img src=x onerror=alert(1)> 어디로 가죠?' },
    { type: 'artifact', kind: 'waveform', label: '녹음', text: '맥락을 남깁니다.' },
    { type: 'artifact', kind: 'concepts', items: ['동선', '안내', '첫 경험'], caption: '주제 일부' },
    { type: 'artifact', kind: 'task', title: '다음 행동', progress: '1 / 3', text: '안내 고치기', tools: [{ icon: ' Record ', label: '기록' }, { src: 'tools/voice.svg', alt: '음성', label: '음성' }] },
    { type: 'artifact', kind: 'report', number: '01', label: '발견', title: '시작의 장벽', items: ['안내가 늦다.', '동선이 안 보인다.', '선택지가 많다.'] },
    { type: 'metric', value: 3, label: '다음 행동', tone: 'purple' },
    { type: 'artifact', kind: 'process', title: '다음 일을 정하는 흐름', items: ['기록', '분류', '결정'] },
    { type: 'artifact', kind: 'actions', title: '공유된 실행 목록', items: ['안내 앞당기기', '동선 보이기', '선택 줄이기'], icon: 'SHARE' },
  ] };
}

const errors = deck => model.validateDeck(deck).filter(issue => issue.severity === 'error');

test('TC-E01 eight editorial artifacts accept reusable params in every existing theme without changing the source', () => {
  for (const theme of ['stage', 'paper', 'midnight']) {
    const deck = { ...singleSlide(editorial()), theme };
    const original = structuredClone(deck);
    assert.deepEqual(model.validateDeck(deck), []);
    assert.deepEqual(deck, original);
  }
});

const invalid = [
  ['kind', slide => { slide.items[4].kind = 'raw-html'; }, 'items.4.kind'],
  ['cover-title', slide => { delete slide.items[3].title; }, 'items.3.title'],
  ['cover-array', slide => { slide.items[3].title = ['A', 1]; }, 'items.3.title.1'],
  ['empty-cover-array', slide => { slide.items[3].title = []; }, 'items.3.title'],
  ['many-cover-lines', slide => { slide.items[3].title = ['1', '2', '3', '4', '5']; }, 'items.3.title'],
  ['quote-text', slide => { delete slide.items[4].text; }, 'items.4.text'],
  ['waveform-text', slide => { slide.items[5].text = {}; }, 'items.5.text'],
  ['zero-concepts', slide => { slide.items[6].items = []; }, 'items.6.items'],
  ['many-concepts', slide => { slide.items[6].items.push('네 번째'); }, 'items.6.items'],
  ['task-text', slide => { delete slide.items[7].text; }, 'items.7.text'],
  ['zero-tools', slide => { slide.items[7].tools = []; }, 'items.7.tools'],
  ['many-tools', slide => { slide.items[7].tools = Array(5).fill({ icon: 'record' }); }, 'items.7.tools'],
  ['null-tool', slide => { slide.items[7].tools = [null]; }, 'items.7.tools.0'],
  ['tool-source', slide => { slide.items[7].tools = [{ icon: 'record', src: 'x.svg' }]; }, 'items.7.tools.0'],
  ['tool-icon', slide => { slide.items[7].tools = [{ icon: '<svg />' }]; }, 'items.7.tools.0.icon'],
  ['tool-video', slide => { slide.items[7].tools = [{ src: 'x.svg', video: 'x.mp4' }]; }, 'items.7.tools.0.video'],
  ['cover-video', slide => { slide.items[3].video = 'x.mp4'; }, 'items.3.video'],
  ['cover-poster', slide => { slide.items[3].poster = 'x.svg'; }, 'items.3.poster'],
  ['missing-variant', slide => { delete slide.variant; }, 'variant'],
  ['unknown-variant', slide => { slide.variant = 'editoiral'; }, 'variant'],
  ['report-title', slide => { delete slide.items[8].title; }, 'items.8.title'],
  ['report-item', slide => { slide.items[8].items[0] = {}; }, 'items.8.items.0'],
  ['one-process', slide => { slide.items[10].items = ['한 단계']; }, 'items.10.items'],
  ['many-actions', slide => { slide.items[11].items.push('네 번째'); }, 'items.11.items'],
  ['coordinates', slide => { slide.items[4].column = 2; }, 'items.4.column'],
];
for (const [name, mutate, expectedPath] of invalid) {
  test(`TC-E02/${name} invalid editorial params identify the authored field and preserve neighboring slides`, () => {
    const slide = editorial();
    mutate(slide);
    const deck = { slides: [{ layout: 'statement', title: '앞' }, slide, { layout: 'statement', title: '뒤' }] };
    const original = structuredClone(deck);
    const issues = errors(deck);
    assert.ok(issues.some(issue => issue.path === `slides.1.${expectedPath}`), JSON.stringify(issues));
    assert.ok(issues.every(issue => issue.slideIndex === 1));
    assert.deepEqual(deck, original);
  });
}

// The DOM is the external boundary here; the production renderer and model run unchanged.
class Node {
  constructor(tag) {
    this.tagName = tag; this.children = []; this.dataset = {}; this.attributes = {};
    this.style = { setProperty(key, value) { this[key] = value; } };
    this.classList = { add: name => { this.className += ` ${name}`; } };
    this._text = '';
  }
  append(...nodes) { this.children.push(...nodes); }
  setAttribute(key, value) { this.attributes[key] = value; }
  addEventListener() {}
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(node => node.textContent).join(''); }
}
function nodes(node) { return [node, ...node.children.flatMap(nodes)]; }
function renderer(slide) {
  const source = fs.readFileSync(require.resolve('../app.js'), 'utf8');
  const globals = source.slice(source.indexOf('  var names ='), source.indexOf('  var storageKey ='));
  const functions = source.slice(source.indexOf('  function element('), source.indexOf('  function render()'));
  const deck = singleSlide(slide);
  const context = {
    model, deck, rawDeck: deck, state: { theme: 'stage' }, validationIssues: model.validateDeck(deck), rootFatal: false,
    document: { createElement: tag => new Node(tag), createElementNS: (_, tag) => new Node(tag), createTextNode: text => { const node = new Node('#text'); node.textContent = text; return node; } },
    scheduleDiagnostics() {}, record: value => value !== null && typeof value === 'object' && !Array.isArray(value),
    owns: (value, key) => Object.prototype.hasOwnProperty.call(value, key),
  };
  vm.createContext(context);
  vm.runInContext(`${globals}\n${functions}\nthis.rendered = renderSlide(deck.slides[0], 0, false); this.setField = setAt;`, context);
  return context;
}

test('TC-E03 every editorial visible string retains a native editable path and media reports its nested source', () => {
  const slide = editorial();
  const { rendered, setField } = renderer(slide);
  const all = nodes(rendered);
  assert.equal(rendered.dataset.variant, 'editorial');
  for (const field of ['items.3.title.0', 'items.3.title.1', 'items.3.label', 'items.3.subtitle', 'items.3.footer', 'items.3.edition', 'items.4.text', 'items.5.text', 'items.6.items.0', 'items.6.caption', 'items.7.title', 'items.7.progress', 'items.7.text', 'items.8.number', 'items.8.title', 'items.8.items.2', 'items.10.items.1', 'items.10.title', 'items.11.title', 'items.11.items.2']) {
    assert.ok(all.some(node => node.dataset.field === field), field);
  }
  assert.ok(all.some(node => node.dataset.mediaPath === 'items.3.src'));
  assert.ok(all.some(node => node.dataset.mediaPath === 'items.7.tools.1.src'));
  const quote = all.find(node => node.dataset.field === 'items.4.text');
  assert.equal(quote.textContent, slide.items[4].text);
  assert.equal(quote.children.length, 0, 'authored HTML must stay literal text');
  setField(slide, 'items.8.items.0', '수정한 발견');
  const restored = JSON.parse(JSON.stringify(slide));
  assert.equal(nodes(renderer(restored).rendered).find(node => node.dataset.field === 'items.8.items.0').textContent, '수정한 발견');
});

test('TC-E04 optional artifact decoration and legacy mixed bento stay independent of editorial styling', () => {
  const slide = editorial();
  delete slide.items[3].src; delete slide.items[3].alt; delete slide.items[7].tools; delete slide.items[11].icon;
  assert.deepEqual(model.validateDeck(singleSlide(slide)), []);
  const rendered = renderer(slide).rendered;
  assert.equal(nodes(rendered).filter(node => node.className === 'artifact-tool').length, 4);
  const legacy = { layout: 'bento', preset: 'recap', items: Array.from({ length: 12 }, (_, index) => ({ type: 'text', label: '기존', text: `문장 ${index}` })) };
  assert.deepEqual(model.validateDeck(singleSlide(legacy)), []);
  assert.equal(renderer(legacy).rendered.dataset.variant, undefined);
  assert.equal(model.normalizeIcon(' Record '), 'record');
  assert.equal(model.normalizeIcon('constructor'), null);
});

for (const [kind, itemIndex, min, max] of [['concepts', 6, 1, 3], ['report', 8, 1, 3], ['process', 10, 2, 4], ['actions', 11, 1, 3], ['task', 7, 1, 4]]) {
  for (const count of [min, max]) {
    test(`TC-E05/${kind}-${count} accepts and renders every documented quantity boundary`, () => {
      const slide = editorial();
      const item = slide.items[itemIndex];
      if (kind === 'task') item.tools = Array.from({ length: count }, () => ({ icon: 'record' }));
      else item.items = Array.from({ length: count }, (_, index) => `항목 ${index}`);
      assert.deepEqual(model.validateDeck(singleSlide(slide)), []);
      const all = nodes(renderer(slide).rendered);
      if (kind === 'task') assert.equal(all.filter(node => node.className === 'artifact-tool').length, count);
      else for (let index = 0; index < count; index += 1) assert.ok(all.some(node => node.dataset.field === `items.${itemIndex}.items.${index}`));
    });
  }
}

for (const count of [1, 4]) {
  test(`TC-E05/cover-${count} accepts and renders every authored title line at the documented boundary`, () => {
    const slide = editorial();
    slide.items[3].title = Array.from({ length: count }, (_, index) => `줄 ${index}`);
    assert.deepEqual(model.validateDeck(singleSlide(slide)), []);
    const all = nodes(renderer(slide).rendered);
    for (let index = 0; index < count; index += 1) assert.ok(all.some(node => node.dataset.field === `items.3.title.${index}`));
  });
}

test('TC-E06 clearing and restoring required titles leaves editable fields without an undefined placeholder', () => {
  const slide = editorial();
  slide.items[3].title = '';
  slide.items[8].title = '';
  assert.deepEqual(model.validateDeck(singleSlide(slide)), []);
  const all = nodes(renderer(JSON.parse(JSON.stringify(slide))).rendered);
  for (const path of ['items.3.title', 'items.8.title']) assert.equal(all.find(node => node.dataset.field === path).textContent, '');
  assert.ok(!all.some(node => node.textContent === 'undefined'));
});

test('TC-E07 unknown artifact fields explain likely typos and preserve nested source values without interpreting them', () => {
  const slide = editorial();
  slide.items[3].subitle = { src: 'literal.jpg' };
  slide.items[3].text = { ignored: true };
  const original = structuredClone(slide);
  const issues = model.validateDeck(singleSlide(slide));
  assert.equal(issues.filter(issue => issue.severity === 'error').length, 0);
  assert.ok(issues.some(issue => issue.severity === 'warning' && issue.path === 'slides.0.items.3.subitle'));
  assert.deepEqual(slide, original);
});

test('TC-E08 unsupported artifact media properties warn and remain preserved without changing the rendered media', () => {
  const slide = editorial();
  Object.assign(slide.items[3], { fit: 'cover', focalPoint: '40% 30%', zoom: 2 });
  Object.assign(slide.items[7].tools[1], { fit: 'cover', focalPoint: '10% 20%', zoom: 3 });
  const original = structuredClone(slide);
  const issues = model.validateDeck(singleSlide(slide));
  assert.equal(issues.filter(issue => issue.severity === 'error').length, 0);
  for (const path of ['items.3.zoom', 'items.7.tools.1.fit', 'items.7.tools.1.focalPoint', 'items.7.tools.1.zoom']) {
    assert.ok(issues.some(issue => issue.severity === 'warning' && issue.path === `slides.0.${path}`));
  }
  const all = nodes(renderer(slide).rendered);
  const cover = all.find(node => node.dataset.mediaPath === 'items.3.src').children[0];
  const tool = all.find(node => node.dataset.mediaPath === 'items.7.tools.1.src').children[0];
  assert.equal(cover.style.objectFit, 'cover', 'the documented cover crop remains supported');
  assert.equal(cover.style.objectPosition, '40% 30%');
  assert.equal(cover.style.transform, 'scale(1)', 'unsupported cover zoom must have no effect');
  assert.equal(tool.style.objectFit, 'contain');
  assert.equal(tool.style.objectPosition, undefined);
  assert.equal(tool.style.transform, 'scale(1)');
  assert.deepEqual(slide, original, 'ignored properties remain available for repair and export');
});
