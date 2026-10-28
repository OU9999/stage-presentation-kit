'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseDocument } = require('../scripts/markdown-document.cjs');
const { validateDeck } = require('../deck-model.js');
const { planSlide } = require('../blocks.js');

class Node {
  constructor(tag) {
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.style = {}; this.className = ''; this.value = '';
    this.events = {};
    this.classList = { add: (...names) => { this.className += ' ' + names.join(' '); } };
  }
  append(...children) { for (const child of children) this.children.push(...(child.tagName === '#fragment' ? child.children : [child])); }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  addEventListener(key, callback) { (this.events[key] ||= []).push(callback); }
  set textContent(value) { this.value = String(value); this.children = []; }
  get textContent() { return this.value + this.children.map(child => child.textContent).join(''); }
}
const document = { createElement: tag => new Node(tag), createTextNode: value => Object.assign(new Node('#text'), { value }), createDocumentFragment: () => new Node('#fragment') };
const context = { document, window: {} };
vm.runInNewContext(fs.readFileSync(require.resolve('../blocks.js'), 'utf8'), context);
const renderer = context.window.StageBlocks;
const nodes = root => [root, ...root.children.flatMap(nodes)];
const hasClass = (node, name) => node.className.split(/\s+/).includes(name);
const findClass = (root, name) => nodes(root).filter(node => hasClass(node, name));
const plainSource = node => {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  // Soft breaks between standalone images are layout separators, not authored prose.
  if (node.tag === 'p' && node.children.every(child => child.tag === 'img' || child.type === 'text' && !child.value.trim())) return '';
  return (node.children || []).map(plainSource).join('');
};
const normalize = text => text.replace(/\s+/g, ' ').trim();
const visibleSource = root => root.tagName === 'figcaption' ? '' : root.value + root.children.map(visibleSource).join('');
const control = settings => '<!-- stage-slide\n' + settings + '\n-->\n';
const group = settings => '<!-- stage-group\n' + settings + '\n-->\n';
function slide(source) { return parseDocument(source, { sourcePath: 'talks/example/slides.md', id: 'example' }).slides[0]; }
function freeze(value) { if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(freeze); } return value; }
function preserved(source, options = {}) {
  const parsed = slide(source), before = structuredClone(parsed);
  freeze(parsed);
  const result = renderer.renderSlide(parsed, { sourcePath: 'talks/example/slides.md', ...options });
  assert.deepEqual(parsed, before);
  assert.equal(normalize(visibleSource(result.body)), normalize(plainSource(parsed.heading) + parsed.blocks.map(plainSource).join('')));
  assert.equal(findClass(result.body, 'md-heading').length, parsed.heading ? 1 : 0);
  return { parsed, ...result };
}

test('composition planning is pure and chooses safe default shapes without inventing layout meaning', () => {
  const cases = [
    ['# 한 문장\n\n짧은 맥락', 'message'],
    ['# 화면\n\n![Alt](a.svg "Caption")', 'media'],
    ['# 장면\n\n![Alt](a.svg)\n\n- 관찰\n- 질문', 'split'],
    ['> 인용 원문\n\n귀속과 조건', 'quote'],
    ['# 자료\n\n| 항목 | 값 |\n| - | - |\n| A | 24 |', 'document'],
    ['# 코드\n\n```js\nconst x = `\n---\n`;\n```', 'document']
  ];
  for (const [source, expected] of cases) {
    const parsed = freeze(slide(source));
    assert.equal(planSlide(parsed).composition, expected);
    const result = preserved(source);
    assert.equal(result.composition, expected);
    if (source.includes('```')) assert.equal(nodes(result.body).find(node => node.tagName === 'pre').textContent, 'const x = `\n---\n`;\n');
  }
});

test('the two authored stories render sixteen canonical slides with the intended distinct rhythm', () => {
  const expected = {
    'product-notes': ['message', 'split', 'document', 'editorial', 'quote', 'message', 'document', 'closing'],
    'team-learning': ['message', 'media', 'gallery', 'mosaic', 'quote', 'editorial', 'document', 'closing']
  };
  for (const [name, compositions] of Object.entries(expected)) {
    const filename = path.join(__dirname, '../talks', name, 'slides.md');
    const source = fs.readFileSync(filename, 'utf8');
    const deck = parseDocument(source, { sourcePath: 'talks/' + name + '/slides.md', id: name });
    assert.deepEqual(validateDeck(deck), []);
    const before = structuredClone(deck); freeze(deck);
    assert.deepEqual(deck.slides.map((entry, index) => renderer.renderSlide(entry, { index, total: 8 }).composition), compositions);
    assert.deepEqual(deck, before); assert.equal(fs.readFileSync(filename, 'utf8'), source);
  }
});

test('gallery and mosaic preserve two to six images, captions and trailing conditions including a single pure-image paragraph', () => {
  for (const compose of ['gallery', 'mosaic']) for (let count = 2; count <= 6; count++) for (const separator of ['\n', '\n\n']) {
    const images = Array.from({ length: count }, (_, index) => '![Alt ' + index + '](image-' + index + '.jpg "Caption ' + index + '")').join(separator);
    const result = preserved(control('compose: ' + compose + '\nfit: cover\nfocus: "0% 100%"') + '# 사진\n\n' + images + '\n\n서로 다른 장면이며 전후 비교가 아닙니다.');
    assert.equal(result.composition, compose);
    const grid = findClass(result.body, 'md-grid')[0];
    assert.equal(grid.children.length, count);
    assert.ok(grid.children.every(child => hasClass(child, 'md-media') && child.dataset.fit === 'cover'));
    assert.deepEqual(nodes(grid).filter(node => node.tagName === 'img').map(node => node.attrs.alt), Array.from({ length: count }, (_, index) => 'Alt ' + index));
    assert.deepEqual(nodes(grid).filter(node => node.tagName === 'figcaption').map(node => node.textContent), Array.from({ length: count }, (_, index) => 'Caption ' + index));
    assert.ok(nodes(grid).filter(node => node.tagName === 'img').every(node => node.style.objectPosition === '0% 100%'));
  }
  const auto = preserved('# 사진\n\n![A](a.jpg)\n![B](b.jpg)');
  assert.equal(auto.composition, 'gallery');
});

test('mixed prose, interleaved media and linked images fall back without dropping, reordering or unwrapping content', () => {
  for (const source of [
    control('compose: split') + '# H\n\n앞 설명\n\n![A](a.jpg "원캡션")\n\n뒤 설명',
    control('compose: gallery') + '# H\n\n![A](a.jpg) 중요한 글 ![B](b.jpg)',
    control('compose: gallery') + '# H\n\n[![A](a.jpg "연결된 그림")](https://example.com)\n\n![B](b.jpg)',
    control('compose: gallery') + '# H\n\n' + Array.from({ length: 7 }, (_, index) => '![' + index + '](' + index + '.jpg)').join('\n')
  ]) {
    const result = preserved(source);
    assert.equal(result.composition, 'document');
    assert.equal(result.warnings.length, 1);
    assert.match(result.body.dataset.compositionWarning, /기본 문서/);
    assert.equal(result.body.dataset.sourceLine, String(result.parsed.origin.line));
    if (source.includes('https://example.com')) assert.equal(nodes(result.body).find(node => node.tagName === 'a').attrs.href, 'https://example.com');
  }
});

test('editorial keeps prelude, all H2 groups, an unmarked H2 boundary and final conditions in canonical order', () => {
  const source = control('compose: editorial') + '# 자료\n\n전체 안내\n\n| 항목 | 값 |\n| - | - |\n| A | 1 |\n\n' + group('tone: green\nprimary: true\nfit: cover\nfocus: "25% 40%"') + '## 첫 그룹\n\n![A](a.jpg "출처 A")\n\n## 미선택 그룹\n\n원문\n\n' + group('tone: purple') + '## 마지막 그룹\n\n**24** 개\n\n가상 수치이며 성과나 전환율이 아닙니다.';
  const result = preserved(source);
  assert.equal(result.composition, 'editorial');
  const groups = findClass(result.body, 'md-group');
  assert.equal(groups.length, 3);
  assert.equal(groups[0].dataset.tone, 'green'); assert.equal(groups[1].dataset.tone, undefined); assert.equal(groups[2].dataset.tone, 'purple');
  assert.equal(groups.filter(node => hasClass(node, 'is-primary')).length, 1);
  const body = findClass(result.body, 'markdown-body')[0];
  assert.equal(body.dataset.groupCount, '3'); assert.equal(body.children[0].textContent, '전체 안내');
  assert.equal(nodes(body).filter(node => node.tagName === 'table').length, 1);
  assert.ok(groups[2].textContent.endsWith('가상 수치이며 성과나 전환율이 아닙니다.'));
});

test('only standalone numeric emphasis followed by a short plain unit receives value hooks', () => {
  const cases = [
    ['**9,876,543.2** 건', true], ['**0** 개', true], ['**024** 개', true],
    ['**기록을** 남깁니다.', false], ['**24** 개를 기록합니다.', false], ['**24** [출처](https://example.com)', false], ['**24개**', false]
  ];
  for (const [paragraph, expected] of cases) {
    const result = preserved(control('compose: editorial') + '# 자료\n\n## 기록\n\n' + paragraph);
    const values = findClass(result.body, 'md-value');
    assert.equal(values.length, expected ? 1 : 0, paragraph);
    if (expected) {
      assert.equal(findClass(result.body, 'md-value-number')[0].textContent, paragraph.match(/\*\*(.*?)\*\*/)[1]);
      assert.equal(findClass(result.body, 'md-value-unit')[0].textContent, paragraph.split('**')[2]);
    }
  }
});

test('preview retains composition, sources, captions and scroll semantics while disabling links', () => {
  const source = control('compose: editorial') + '# [제목](https://example.com)\n\n## 자료\n\n![Alt](a.jpg "Caption")\n\n[출처](https://example.com)\n\n```js\n---\n```';
  const result = preserved(source, { preview: true });
  assert.equal(result.composition, 'editorial');
  assert.ok(!nodes(result.body).some(node => node.tagName === 'a' || node.attrs.id));
  assert.ok(findClass(result.body, 'blocks-scroll').every(node => node.tabIndex === -1));
  assert.ok(nodes(result.body).some(node => Number(node.dataset.sourceLine) > 1));
  assert.equal(nodes(result.body).find(node => node.tagName === 'figcaption').textContent, 'Caption');
});

test('media callbacks and validated focus agree with model whitespace and reject CSS injection', () => {
  const parsed = slide(control('fit: cover\nfocus: "50% 30%"') + '# 사진\n\n![Alt](a.jpg "Caption")');
  parsed.view.focus = '0%\t100%';
  assert.deepEqual(validateDeck({ slides: [parsed] }), []);
  let changed = 0;
  const result = renderer.renderSlide(parsed, { onMediaChange: () => changed++ });
  const image = nodes(result.body).find(node => node.tagName === 'img');
  assert.equal(image.style.objectPosition, '0% 100%');
  image.events.load[0](); image.events.error[0]();
  assert.equal(changed, 2); assert.equal(image.dataset.mediaError, 'a.jpg');
  parsed.view.focus = '0%; color:red 100%';
  assert.ok(validateDeck({ slides: [parsed] }).some(issue => issue.severity === 'error'));
  assert.equal(nodes(renderer.renderSlide(parsed).body).find(node => node.tagName === 'img').style.objectPosition, undefined);
});

test('per-image focus arrays parse with full source positions and bind gallery/mosaic images in source order', () => {
  for (const compose of ['gallery', 'mosaic']) {
    const source = control('compose: ' + compose + '\nfit: cover\nfocus: ["50% 40%", "50%\t25%", "50% 0%"]') + '# 세 사진\n\n![A](a.jpg "A 출처")\n![B](b.jpg "B 출처")\n![C](c.jpg "C 출처")';
    const parsed = slide(source), before = structuredClone(parsed);
    assert.deepEqual(parsed.view.focus, ['50% 40%', '50% 25%', '50% 0%']);
    assert.deepEqual(validateDeck({ slides: [parsed] }), []);
    assert.equal(parsed.heading.position.line, source.split('\n').findIndex(line => line.startsWith('# ')) + 1);
    const result = preserved(source);
    const images = nodes(result.body).filter(node => node.tagName === 'img');
    assert.deepEqual(images.map(node => node.attrs.alt), ['A', 'B', 'C']);
    assert.deepEqual(images.map(node => node.style.objectPosition), ['50% 40%', '50% 25%', '50% 0%']);
    assert.deepEqual(parsed, before);
  }
});

test('valid focus arrays with changed count or unsupported composition warn and preserve every image uncropped', () => {
  for (const [compose, focus, body] of [
    ['mosaic', '["0% 0%", "100% 100%"]', '![A](a.jpg)\n![B](b.jpg)\n![C](c.jpg)'],
    ['gallery', '["0% 0%", "50% 50%", "100% 100%"]', '![A](a.jpg)\n![B](b.jpg)'],
    ['media', '["0% 0%"]', '![A](a.jpg)'],
    ['editorial', '["0% 0%"]', group('primary: true\nfit: cover\nfocus: "90% 10%"') + '## 문서\n\n![A](a.jpg)']
  ]) {
    const source = control('compose: ' + compose + '\nfit: cover\nfocus: ' + focus) + '# 자료\n\n' + body;
    const parsed = slide(source);
    assert.deepEqual(validateDeck({ slides: [parsed] }), []);
    const result = preserved(source);
    assert.equal(result.composition, 'document');
    assert.match(result.body.dataset.compositionWarning, /focus 배열/);
    assert.ok(findClass(result.body, 'md-media').every(node => node.dataset.fit === 'contain'));
    assert.ok(nodes(result.body).filter(node => node.tagName === 'img').every(node => node.style.objectPosition === undefined));
  }
});

test('focus arrays reject invalid coordinates, nested arrays, lengths and group arrays at parser/model boundaries', () => {
  const base = '# 사진\n\n![A](a.jpg)\n![B](b.jpg)';
  for (const value of ['[]', '["101% 0%"]', '["0% -1%"]', '["0%; color:red 100%"]', '[["0% 0%"]]', '[1]', '[' + Array(7).fill('"0% 0%"').join(',') + ']']) {
    assert.throws(() => slide(control('focus: ' + value) + base), /focus/);
  }
  assert.throws(() => slide('# 자료\n\n' + group('focus: ["0% 0%"]') + '## 그룹\n\n본문'), /focus/);
  const parsed = slide(control('compose: gallery\nfocus: ["0% 0%", "100% 100%"]') + base);
  for (const value of [[], ['101% 0%'], [['0% 0%']], Array(7).fill('0% 0%')]) {
    const modified = structuredClone(parsed); modified.view.focus = value;
    assert.ok(validateDeck({ slides: [modified] }).some(issue => issue.severity === 'error' && issue.path.includes('focus')));
  }
  const grouped = slide('# 자료\n\n' + group('focus: "0% 0%"') + '## 그룹\n\n본문');
  grouped.view.groups[0].focus = ['0% 0%'];
  assert.ok(validateDeck({ slides: [grouped] }).some(issue => issue.severity === 'error' && issue.path.includes('focus')));
});

test('composition styles use the shared palette and flatten all visual wrappers in read mode', () => {
  const css = fs.readFileSync(path.join(__dirname, '../blocks.css'), 'utf8');
  assert.doesNotMatch(css, /#[\da-f]{3,8}\b/i);
  assert.match(css, /\.md-group\[data-tone\]\s*\{\s*--md-accent:var\(--tone-color\)/);
  assert.match(css, /data-tone="neutral"[\s\S]*--md-accent:var\(--slide-text\)/);
  for (const hook of ['markdown-composition', 'markdown-body', 'md-grid', 'md-group']) assert.ok(css.includes('body[data-mode="read"] #slideStage .layout-blocks .' + hook));
  assert.match(css, /height:auto; max-height:none; object-fit:contain/);
  assert.match(css, /\.layout-blocks:not\(\.is-quiet\) \.slide-body \{ top:0; bottom:48px; \}/);
});
