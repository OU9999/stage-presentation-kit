'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const model = require('../deck-model.js');
const { parseDocument, collectReferences } = require('../scripts/markdown-document.cjs');
class Element {
  constructor(tag) {
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.className = ''; this.value = '';
    this.style = { setProperty(key, value) { this[key] = value; } };
    this.classList = { add: (...names) => { this.className += ' ' + names.join(' '); } };
  }
  append(...nodes) { nodes.forEach(node => this.children.push(...(node.tagName === '#fragment' ? node.children : [node]))); }
  setAttribute(key, value) { this.attrs[key] = String(value); if (key === 'class') this.className = String(value); }
  addEventListener() {}
  set textContent(value) { this.value = String(value); this.children = []; }
  get textContent() { return this.value + this.children.map(node => node.textContent).join(''); }
}
const document = {
  createElement: tag => new Element(tag), createElementNS: (_, tag) => new Element(tag),
  createTextNode: value => Object.assign(new Element('#text'), { value }), createDocumentFragment: () => new Element('#fragment')
};
const context = { document, window: { STAGE_MODEL: model } };
vm.runInNewContext(fs.readFileSync(require.resolve('../blocks.js'), 'utf8'), context);
const renderer = context.window.StageBlocks;
const all = node => [node, ...node.children.flatMap(all)];
const classes = (node, name) => all(node).filter(el => el.className.split(/\s+/).includes(name));
const control = value => '<!-- stage-slide\n' + value + '\n-->\n';
const group = value => '<!-- stage-group\n' + value + '\n-->\n';
const sourceText = node => !node ? '' : node.type === 'text' ? node.value : (node.children || []).map(sourceText).join('');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const renderedText = node => node.tagName === 'figcaption' || node.className === 'md-wall-caption' ? '' : node.value + node.children.map(renderedText).join('');
function check(source, preview = false) {
  const deck = parseDocument(source, { id: 'fixture', sourcePath: 'talks/fixture/slides.md' });
  assert.deepEqual(model.validateDeck(deck), []);
  const before = structuredClone(deck);
  function freeze(value) { if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(freeze); } }
  freeze(deck);
  const slide = deck.slides[0];
  const result = renderer.renderSlide(slide, { preview, sourcePath: deck.document.sourcePath });
  assert.deepEqual(deck, before);
  assert.equal(classes(result.body, 'md-heading').length, slide.heading ? 1 : 0);
  // Captions are visible additions from authored title attributes, not duplicate prose.
  assert.equal(normalize(renderedText(result.body)), normalize(sourceText(slide.heading) + slide.blocks.map(sourceText).join('')));
  const astImages = collectReferences(deck).filter(ref => ref.kind === 'image').map(ref => ref.owner[ref.key]);
  assert.deepEqual(all(result.body).filter(node => node.tagName === 'img').map(node => node.attrs.src), astImages);
  if (preview) assert.ok(!all(result.body).some(node => node.tagName === 'a'));
  return { ...result, slide };
}
const photos = count => Array.from({ length: count }, (_, i) => '![Alt ' + i + '](image-' + i + '.jpg "Caption ' + i + '")').join('\n\n');
const items = count => Array.from({ length: count }, (_, i) => '- **할 일 ' + i + '** [자료 ' + i + '](https://example.com/' + i + ')').join('\n');
const icons = count => '[' + Array.from({ length: count }, (_, i) => i === 1 ? '{icon: code, tone: neutral}' : 'search').join(', ') + ']';
const groups = count => Array.from({ length: count }, (_, i) => (i === 1 ? group('primary: true\nicon: code\ntone: blue') : '') + '## 자료 ' + i + '\n\n' + ['![Alt ' + i + '](a-' + i + '.jpg "출처 ' + i + '")', '**024** 개\n\n가상 계획', '> 원문 인용', '- 관찰\n- 질문', '본문 [자료](https://example.com)'][i % 5]).join('\n\n');

test('two new distinct stories keep their seventeen intended compositions, references and all source content', () => {
  const expected = {
    'photo-essay': ['message', 'gallery', 'gallery', 'quote', 'mosaic', 'document', 'document', 'closing'],
    'community-exhibit': ['message', 'split', 'media', 'quote', 'bento', 'document', 'icon-wall', 'icon-wall', 'closing']
  };
  for (const [name, compositions] of Object.entries(expected)) {
    const filename = path.join(__dirname, '../talks', name, 'slides.md'), source = fs.readFileSync(filename, 'utf8');
    const deck = parseDocument(source, { id: name, sourcePath: 'talks/' + name + '/slides.md' });
    assert.deepEqual(model.validateDeck(deck), []);
    const before = structuredClone(deck);
    assert.deepEqual(deck.slides.map(slide => renderer.renderSlide(slide).composition), compositions);
    for (const slide of deck.slides) {
      const result = renderer.renderSlide(slide, { preview: true });
      assert.equal(classes(result.body, 'md-heading').length, slide.heading ? 1 : 0);
      assert.equal(normalize(renderedText(result.body)), normalize(sourceText(slide.heading) + slide.blocks.map(sourceText).join('')));
      assert.ok(!all(result.body).some(node => node.tagName === 'a'));
      assert.equal(all(result.body).filter(node => node.tagName === 'img').length, collectReferences({ slides: [slide] }).filter(ref => ref.kind === 'image').length);
    }
    assert.deepEqual(deck, before); assert.equal(fs.readFileSync(filename, 'utf8'), source);
  }
});

test('portraits and strip bind two to six actual columns, source captions and per-image focus', () => {
  for (const variant of ['portraits', 'strip']) for (let count = 2; count <= 6; count++) {
    const result = check(control('compose: gallery\nvariant: ' + variant + '\nfit: cover\nfocus: [' + Array(count).fill('"0% 100%"').join(',') + ']') + photos(count));
    assert.equal(result.composition, 'gallery'); assert.equal(result.variant, variant);
    const grid = classes(result.body, 'md-grid')[0];
    assert.equal(grid.style['--md-columns'], String(count)); assert.equal(grid.style['--md-rows'], '1');
    assert.deepEqual(all(grid).filter(node => node.tagName === 'figcaption').map(node => node.textContent), Array.from({ length: count }, (_, i) => 'Caption ' + i));
    assert.ok(all(grid).filter(node => node.tagName === 'img').every(node => node.style.objectPosition === '0% 100%'));
  }
});

test('staggered consumes unchanged legacy packing coordinates and falls back on count mismatch', () => {
  const result = check(control('compose: mosaic\nvariant: staggered') + '# 흐름\n\n' + photos(6));
  assert.equal(result.variant, 'staggered'); assert.equal(result.composition, 'mosaic');
  const grid = classes(result.body, 'md-grid')[0]; assert.equal(grid.style['--md-columns'], '4'); assert.equal(grid.style['--md-rows'], '2');
  const expected = model.packMosaic([2, 1, 1, 1, 1, 2].map(span => ({ span })));
  grid.children.forEach((node, i) => { assert.equal(node.style['--md-column'], String(expected[i].column)); assert.equal(node.style['--md-row'], String(expected[i].row)); assert.equal(node.style['--md-col-span'], String(expected[i].span)); });
  const mismatch = check(control('compose: mosaic\nvariant: staggered') + photos(5));
  assert.equal(mismatch.composition, 'document'); assert.ok(mismatch.body.dataset.compositionWarning); assert.equal(mismatch.variant, '');
});

test('bento consumes shared balanced and preset plans with source-order mixed surfaces and decorative icons', () => {
  for (const [count, variant] of [[5, 'balanced'], [8, 'balanced'], [12, 'balanced'], [12, 'seoul'], [12, 'recap']]) {
    const result = check(control('compose: bento\nvariant: ' + variant) + '# 자료\n\n' + groups(count));
    assert.equal(result.composition, 'bento'); assert.equal(result.variant, variant);
    const body = classes(result.body, 'markdown-body')[0], tiles = classes(result.body, 'md-tile');
    const plan = model.planBento(count, { variant, primaryIndex: 1 });
    assert.equal(body.style['--md-columns'], String(plan.columns)); assert.equal(body.style['--md-rows'], String(plan.rows));
    assert.equal(tiles.length, count);
    assert.deepEqual(tiles.slice(0, 5).map(tile => tile.dataset.kind), ['image', 'value', 'quote', 'list', 'text']);
    tiles.forEach((tile, i) => { for (const [key, field] of [['column', 'column'], ['row', 'row'], ['col-span', 'columnSpan'], ['row-span', 'rowSpan']]) assert.equal(tile.style['--md-' + key], String(plan.slots[i][field])); });
    const svg = classes(result.body, 'md-tile-icon')[0]; assert.equal(svg.attrs['aria-hidden'], 'true'); assert.equal(svg.children[0].attrs.d, model.iconPaths.code);
    assert.equal(classes(result.body, 'md-value-number')[0].textContent, '024'); assert.equal(classes(result.body, 'md-value-unit')[0].textContent, ' 개');
  }
});

test('bento prelude, unsupported counts and preset mismatch retain all prose, tables and final conditions', () => {
  for (const source of [
    control('compose: bento') + '# 자료\n\n앞 안내\n\n' + groups(5),
    control('compose: bento') + '# 자료\n\n| 항목 | 값 |\n| - | - |\n| 가상 | 24 |\n\n' + groups(5),
    control('compose: bento\nvariant: seoul') + '# 자료\n\n' + groups(8),
    control('compose: bento') + '# 자료\n\n' + groups(13)
  ]) {
    const result = check(source + '\n\n마지막 조건: 가상 계획이며 실적이 아닙니다.');
    assert.equal(result.composition, 'document'); assert.ok(result.body.dataset.compositionWarning); assert.equal(result.body.dataset.sourceLine, String(result.slide.origin.line));
    assert.equal(classes(result.body, 'md-tile').length, 0); assert.ok(result.body.textContent.endsWith('마지막 조건: 가상 계획이며 실적이 아닙니다.'));
  }
});

test('builtin walls bind five, twelve and twenty-two original labels, rich links and item tones once', () => {
  for (const count of [5, 12, 22]) for (const preview of [false, true]) {
    const result = check(control('compose: icon-wall\nicons: ' + icons(count)) + '# 함께 하는 일\n\n앞 조건\n\n' + items(count), preview);
    assert.equal(result.composition, 'icon-wall');
    const copy = classes(result.body, 'md-wall-copy')[0], list = classes(result.body, 'md-wall-items')[0];
    assert.equal(copy.textContent, '함께 하는 일앞 조건'); assert.equal(list.tagName, 'ul'); assert.equal(list.children.length, count);
    const plan = model.planIconWall(count); assert.equal(classes(result.body, 'md-wall')[0].style['--md-columns'], String(plan.columns));
    list.children.forEach((item, i) => { assert.equal(item.style['--md-column'], String(plan.slots[i].column)); assert.equal(item.style['--md-row'], String(plan.slots[i].row)); assert.equal(classes(item, 'md-wall-label')[0].textContent, '할 일 ' + i + ' 자료 ' + i); });
    assert.equal(list.children[1].dataset.tone, 'neutral');
    assert.equal(all(result.body).filter(node => node.tagName === 'svg' && node.attrs['aria-hidden'] === 'true').length, count);
    assert.equal(all(result.body).filter(node => node.tagName === 'a').length, preview ? 0 : count);
  }
});

test('custom image-first wall preserves source images, rich labels, links, titles and preview without icons array', () => {
  const source = control('compose: icon-wall') + '# 표식\n\n자체 제작 표식입니다.\n\n' + Array.from({ length: 3 }, (_, i) => '- ![정확한 alt ' + i + '](icon-' + i + '.svg "원title ' + i + '") **라벨 ' + i + '** [링크](https://example.com/' + i + ')').join('\n');
  for (const preview of [false, true]) {
    const result = check(source, preview); assert.equal(result.composition, 'icon-wall');
    assert.equal(all(result.body).filter(node => node.tagName === 'svg').length, 0);
    const images = all(result.body).filter(node => node.tagName === 'img');
    assert.deepEqual(images.map(node => [node.attrs.src, node.attrs.alt, node.attrs.title]), Array.from({ length: 3 }, (_, i) => ['icon-' + i + '.svg', '정확한 alt ' + i, '원title ' + i]));
    assert.deepEqual(classes(result.body, 'md-wall-caption').map(node => node.textContent), ['원title 0', '원title 1', '원title 2']);
    assert.equal(all(result.body).filter(node => node.tagName === 'a').length, preview ? 0 : 3);
  }
});

test('ordered numbering, tail conditions, array mismatch, mixed custom icons and excess walls use whole-source fallback', () => {
  for (const source of [
    control('compose: icon-wall\nicons: [code, search]') + '# 번호\n\n4. 첫 단계\n5. 다음 단계',
    control('compose: icon-wall\nicons: [code, search]') + '# 조건\n\n- 하나\n- 둘\n\n뒤 조건',
    control('compose: icon-wall\nicons: [code]') + '# 수량\n\n- 하나\n- 둘',
    control('compose: icon-wall\nicons: []') + '# 빈 배열\n\n- 하나',
    control('compose: icon-wall') + '# 혼합\n\n- ![원형](a.svg) 하나\n- 그림 없는 둘',
    control('compose: icon-wall') + '# 링크이미지\n\n- [![원형](a.svg)](https://example.com) 하나',
    control('compose: icon-wall\nicons: ' + icons(23)) + '# 과다\n\n' + items(23)
  ]) {
    const result = check(source);
    assert.equal(result.composition, 'document'); assert.ok(result.body.dataset.compositionWarning);
    assert.equal(classes(result.body, 'md-wall').length, 0);
    if (source.includes('4. 첫')) assert.equal(all(result.body).find(node => node.tagName === 'ol').attrs.start, '4');
  }
});

test('known variant on incompatible shape safely warns, while read CSS explicitly restores new layout hooks', () => {
  for (const source of [control('compose: gallery\nvariant: seoul') + photos(3), control('compose: bento\nvariant: portraits') + groups(5), control('icons: [search]') + '# 선택 실수\n\n짧은 본문', control('compose: editorial') + group('icon: code') + '## 자료\n\n원문']) {
    const result = check(source); assert.equal(result.composition, 'document'); assert.ok(result.warnings.length);
  }
  const unmarked = check(control('compose: bento') + Array.from({length: 5}, (_, i) => '## 자료 ' + i + '\n\n원문').join('\n\n'));
  assert.equal(unmarked.variant, 'balanced'); assert.equal(unmarked.composition, 'bento');
  const direct = structuredClone(unmarked.slide);
  direct.view.groups = [{start: 0, end: 2, icon: ' CODE '}];
  assert.deepEqual(model.validateDeck({slides: [direct]}), []);
  assert.equal(classes(renderer.renderSlide(direct).body, 'md-tile-icon')[0].children[0].attrs.d, model.iconPaths.code);
  const css = fs.readFileSync(path.join(__dirname, '../blocks.css'), 'utf8');
  for (const hook of ['md-wall', 'md-wall-copy', 'md-wall-items', 'md-tile']) assert.ok(css.includes('body[data-mode="read"] #slideStage .layout-blocks .' + hook));
  assert.match(css, /ol\.md-wall-items\s*\{ list-style:decimal/); assert.match(css, /md-wall-item\[data-tone\]\s*\{ --md-accent:var\(--tone-color\)/);
  assert.doesNotMatch(css, /#[\da-f]{3,8}\b/i);
});
