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
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.style = { setProperty(key, value) { this[key] = value; } }; this.className = ''; this.value = '';
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
const context = { document, window: { STAGE_MODEL: require('../deck-model.js') } };
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

test('explicit quote preserves short framing prose while auto and unsafe shapes retain their fallback', () => {
  const content = '# 기준 질문\n\n같은 자료라도 목적에 따라 기준이 달라집니다.\n\n> 왜 골랐고, **어떤 질문을 풀려는가?**\n\n기준부터 적어 다시 쓸 방향을 잡습니다.';
  const explicit = preserved(control('compose: quote') + content);
  assert.equal(explicit.composition, 'quote');
  assert.equal(explicit.warnings.length, 0);
  const body = findClass(explicit.body, 'markdown-body')[0];
  assert.deepEqual(body.children.map(node => node.tagName), ['p', 'blockquote', 'p']);
  assert.equal(body.children[0].textContent, '같은 자료라도 목적에 따라 기준이 달라집니다.');
  assert.match(body.children[1].textContent, /어떤 질문을 풀려는가/);
  assert.equal(preserved(content).composition, 'document');
  assert.equal(preserved('# 인용\n\n> 질문\n\n조건').composition, 'quote');
  for (const invalid of [
    '앞 설명\n\n> 질문 하나\n\n중간 설명\n\n> 질문 둘',
    '앞 설명\n\n> 질문\n\n![대상](a.svg)',
    '앞 설명\n\n> 질문\n\n- 지원 목록',
    '앞 설명\n\n> ' + '가'.repeat(221),
    '가'.repeat(201) + '\n\n> 질문'
  ]) {
    const result = preserved(control('compose: quote') + '# 질문\n\n' + invalid);
    assert.equal(result.composition, 'document');
    assert.equal(result.warnings.length, 1);
  }
});

test('explicit selected-passage splits preserve one source image, native quotation, hardbreaks and provenance in order', () => {
  const content = '![자료의 제목과 선택 위치](source.svg "자료 출처")\n\n시간만으로 고른 것일까요?\n\n> 목차와 연결을 따라\\\n> **다음 질문의 근거를 찾습니다.** [원문](https://example.com/source)\n\n발표팀의 설명용 예입니다.';
  for (const variant of ['evidence', 'quote-card']) {
  const source = control('compose: split\nvariant: ' + variant + '\nfit: contain') + content;
  const canonical = slide(source.replace(/^<!-- stage-slide\n[\s\S]*?^-->$/m, match => match.split('\n').map(() => '').join('\n')));
  for (const preview of [false, true]) {
    const result = preserved(source, { preview });
    assert.deepEqual(validateDeck({ slides: [result.parsed] }), []);
    assert.equal(result.composition, 'split'); assert.equal(result.variant, variant); assert.equal(result.warnings.length, 0);
    assert.deepEqual(result.parsed.blocks, canonical.blocks, 'the variant leaves canonical reading nodes and positions intact');
    const body = findClass(result.body, 'markdown-body')[0], copy = findClass(body, 'md-copy')[0];
    assert.deepEqual(body.children.map(node => node.tagName), ['figure', 'div']);
    assert.deepEqual(copy.children.map(node => node.tagName), ['p', 'blockquote', 'p']);
    assert.equal(copy.children[1].dataset.sourceLine, String(result.parsed.blocks[2].position.line));
    assert.equal(nodes(copy.children[1]).filter(node => node.tagName === 'br').length, 1);
    assert.equal(nodes(copy.children[1]).find(node => node.tagName === 'strong').textContent, '다음 질문의 근거를 찾습니다.');
    assert.equal(copy.children[0].dataset.copyRole, 'body'); assert.equal(copy.children[2].dataset.copyRole, 'body');
    assert.equal(findClass(copy, 'md-meta').length, 0);
    assert.equal(nodes(body).find(node => node.tagName === 'figcaption').textContent, '자료 출처');
    assert.equal(nodes(copy).filter(node => node.tagName === 'a').length, preview ? 0 : 1);
  }
  }
  assert.equal(preserved(control('compose: split') + content).composition, 'document');
  assert.equal(preserved(content).composition, 'document', 'auto does not acquire the new quotation eligibility');
  assert.equal(preserved(control('compose: split') + '![원본](source.svg)\n\n보통 문단\n\n- 항목').composition, 'split');
});

test('selected-passage splits reject incompatible content without loss and are limited to explicit split', () => {
  for (const variant of ['evidence', 'quote-card']) {
  for (const content of [
    '앞 설명\n\n![자료](source.svg)\n\n> 인용',
    '![자료](source.svg)\n\n일반 문단만',
    '![자료](source.svg)\n\n> 첫 인용\n\n사이 문단\n\n> 둘째 인용',
    '![자료](source.svg)\n\n> 인용\n\n- 목록',
    '![자료](source.svg)\n\n> - 인용 안 목록',
    '![자료](source.svg)\n\n> ![다른 자료](other.svg)',
    '![자료](source.svg)\n\n> 인용\n\n![추가 자료](other.svg)',
    '![자료](source.svg)\n\n> ' + '가'.repeat(221),
    '![자료](source.svg)\n\n' + '가'.repeat(201) + '\n\n> 짧은 인용',
    '![자료](source.svg)\n\n' + '가'.repeat(181) + '\n\n> ' + '나'.repeat(200)
  ]) {
    const result = preserved(control('compose: split\nvariant: ' + variant) + content);
    assert.equal(result.composition, 'document'); assert.equal(result.variant, ''); assert.ok(result.warnings.length >= 1);
  }
  for (const compose of ['auto', 'document', 'media', 'quote']) {
    const result = preserved(control('compose: ' + compose + '\nvariant: ' + variant) + '![자료](source.svg)\n\n> 인용');
    assert.equal(result.composition, 'document'); assert.equal(result.variant, ''); assert.ok(result.warnings.length >= 1);
  }
  }
});

test('quote-first card keeps the authored quote, adjacent support and article in DOM order', () => {
  const content = '> 인용 줄 하나\\\n> 인용 다음 줄\n\n![가상 기사](article.svg)';
  const preview = control('compose: split\nvariant: quote-card\nsupport:\n  label: 기사 전문 읽기\n  href: ./materials/notes.md#기사') + content;
  const parsed = freeze(slide(preview));
  assert.equal(planSlide(parsed).quoteFirst, true);
  const rendered = renderer.renderSlide(parsed);
  assert.equal(rendered.variant, 'quote-card');
  const body = findClass(rendered.body, 'markdown-body')[0];
  assert.equal(body.dataset.quoteFirst, 'true');
  assert.deepEqual(body.children.map(n=>n.tagName), ['div', 'figure']);
  const [quote, support] = body.children[0].children;
  assert.equal(quote.tagName, 'blockquote');
  assert.equal(quote.dataset.sourceLine, String(parsed.blocks[0].position.line));
  assert.equal(support.dataset.copyRole, 'support');
  assert.equal(support.children[0].attrs.href, './materials/notes.md#기사');
  assert.equal(planSlide(slide(control('compose: split\nvariant: evidence') + content)).composition, 'document');
});

test('record and revision opt into two complete native document fields', () => {
  const content = '# 기록\n\n## 첫 항목\n\n한 문장\n\n## 바뀐 항목\n\n**다른 문장**';
  for (const variant of ['record', 'revision']) {
    const source = control('compose: editorial\nvariant: ' + variant) + content;
    const result = preserved(source);
    assert.equal(result.variant, variant);
    assert.deepEqual(findClass(result.body, 'md-group').map(node=>node.children.map(child=>child.tagName)), [['h2','p'],['h2','p']]);
    assert.deepEqual(validateDeck({slides:[result.parsed]}),[]);
    assert.equal(preserved(source + '\n\n추가 문단').composition,'document');
  }
});

test('comparison gallery keeps two independent images and native labels in source order', () => {
  const content = '![첫 작업](first.svg "이번 답")\n\n![두번째 작업](second.svg "다시 쓸 지식")';
  const source = control('compose: gallery\nvariant: comparison\nfit: contain') + content;
  const canonical = slide(source.replace(/^<!-- stage-slide\n[\s\S]*?^-->$/m, match => match.split('\n').map(() => '').join('\n')));
  for (const preview of [false, true]) {
    const result = preserved(source, { preview });
    assert.deepEqual(validateDeck({ slides: [result.parsed] }), []);
    assert.equal(result.composition, 'gallery'); assert.equal(result.variant, 'comparison'); assert.equal(result.warnings.length, 0);
    assert.deepEqual(result.parsed.blocks, canonical.blocks);
    const figures = findClass(result.body, 'md-media');
    assert.deepEqual(figures.map(figure => nodes(figure).find(node => node.tagName === 'img').attrs.src), ['first.svg', 'second.svg']);
    assert.deepEqual(figures.map(figure => nodes(figure).find(node => node.tagName === 'figcaption').textContent), ['이번 답', '다시 쓸 지식']);
    assert.ok(figures.every(figure => figure.tagName === 'figure' && figure.children.find(node => node.tagName === 'figcaption').dataset.copyRole === 'figure-label'));
    assert.deepEqual(figures.map(figure => nodes(figure).find(node => node.tagName === 'figcaption').dataset.sourceLine), canonical.blocks.map(block => String(block.position.line)));
  }
  assert.equal(preserved(content).composition, 'gallery', 'ordinary auto gallery still works');
  assert.equal(preserved(control('compose: gallery\nvariant: strip') + content).variant, 'strip');
  const ordinary = preserved(control('compose: gallery') + content);
  assert.ok(nodes(ordinary.body).filter(node => node.tagName === 'figcaption').every(node => node.dataset.copyRole === undefined), 'ordinary provenance captions do not acquire comparison-label semantics');
});

test('comparison rejects extra prose, mixed image paragraphs, wrong counts and non-gallery requests without loss', () => {
  const two = '![첫 작업](first.svg)\n\n![둘째 작업](second.svg)';
  for (const content of [
    '![한 작업](one.svg)',
    two + '\n\n![셋째 작업](third.svg)',
    '앞 설명\n\n' + two,
    two + '\n\n뒤 설명',
    '![첫 작업](first.svg)\n![둘째 작업](second.svg)',
    '![첫 작업](first.svg) 설명\n\n![둘째 작업](second.svg)'
  ]) {
    const result = preserved(control('compose: gallery\nvariant: comparison') + content);
    assert.equal(result.composition, 'document'); assert.equal(result.variant, ''); assert.ok(result.warnings.length >= 1);
  }
  for (const compose of ['auto', 'split', 'document', 'media', 'mosaic']) {
    const result = preserved(control('compose: ' + compose + '\nvariant: comparison') + two);
    assert.equal(result.composition, 'document'); assert.equal(result.variant, ''); assert.ok(result.warnings.length >= 1);
  }
});

test('declaration is explicit message-only and keeps native hardbreaks, emphasis and source positions', () => {
  const content = '지식을 남기는 방식이\\\n**다음 질문을 바꿉니다**\n====================';
  const source = control('compose: message\nvariant: declaration') + content;
  const canonical = slide(source.replace(/^<!-- stage-slide\n[\s\S]*?^-->$/m, match => match.split('\n').map(() => '').join('\n')));
  for (const preview of [false, true]) {
    const result = preserved(source, { preview });
    assert.equal(result.composition, 'message'); assert.equal(result.variant, 'declaration'); assert.equal(result.warnings.length, 0);
    assert.deepEqual(validateDeck({ slides: [result.parsed] }), []);
    assert.deepEqual(result.parsed.heading, canonical.heading); assert.deepEqual(result.parsed.blocks, canonical.blocks);
    const heading = findClass(result.body, 'md-heading')[0];
    assert.equal(heading.dataset.sourceLine, String(canonical.heading.position.line));
    assert.equal(nodes(heading).filter(node => node.tagName === 'br').length, 1);
    assert.equal(nodes(heading).find(node => node.tagName === 'strong').textContent, '다음 질문을 바꿉니다');
  }
  for (const compose of ['auto', 'closing', 'document', 'quote', 'split', 'gallery']) {
    const result = preserved(control('compose: ' + compose + '\nvariant: declaration') + content);
    assert.equal(result.composition, 'document'); assert.equal(result.variant, ''); assert.ok(result.warnings.length);
  }
  const unsuitable = preserved(control('compose: message\nvariant: declaration') + '# 제목\n\n- 목록');
  assert.equal(unsuitable.composition, 'document'); assert.ok(unsuitable.warnings.length);
  assert.equal(preserved(content).composition, 'message');
  assert.equal(preserved(control('compose: message') + content).variant, '');
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

test('centered editorial preserves linked group content and warns on an incompatible composition', () => {
  const content = '# 두 가지 역할\n\n## 원자료\n\n[근거](https://example.com/source)를 보존합니다.\n\n## 위키\n\n**이해를 연결**하고 고칩니다.';
  const result = preserved(control('compose: editorial\nvariant: centered') + content);
  assert.deepEqual(validateDeck({ slides: [result.parsed] }), []);
  assert.equal(result.composition, 'editorial');
  assert.equal(result.variant, 'centered');
  assert.equal(result.warnings.length, 0);
  assert.deepEqual(findClass(result.body, 'md-group').map(node => node.textContent), ['원자료근거를 보존합니다.', '위키이해를 연결하고 고칩니다.']);
  assert.equal(nodes(result.body).find(node => node.tagName === 'a').attrs.href, 'https://example.com/source');
  const ordinary = preserved(control('compose: editorial') + content);
  assert.equal(ordinary.variant, '');
  const fallback = preserved(control('compose: document\nvariant: centered') + content);
  assert.equal(fallback.composition, 'document');
  assert.equal(fallback.variant, '');
  assert.match(fallback.warnings[0].message, /variant/);
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

test('standalone navigation is distinct from linked essential prose and quoted claims without altering source', () => {
  const source = control('compose: quote') + '# 질문\n\n[근거](https://example.com)를 확인하고 내 판단을 적습니다.\n\n> [내가 정할 목적](https://example.com/purpose)\n\n[원문](https://example.com/source) · [자료](https://example.com/material)\n\n**[지금 시작하기](https://example.com/start)**';
  for (const preview of [false, true]) {
    const result = preserved(source, { preview });
    const body = findClass(result.body, 'markdown-body')[0];
    assert.equal(body.children[0].dataset.copyRole, 'body');
    assert.equal(hasClass(body.children[0], 'md-meta'), false);
    assert.equal(body.children[2].dataset.copyRole, 'navigation');
    assert.equal(hasClass(body.children[2], 'md-meta'), true);
    assert.equal(body.children[3].dataset.copyRole, 'body', 'an authored emphasized link can carry the central action');
    assert.equal(hasClass(body.children[3], 'md-meta'), false);
    assert.equal(findClass(body.children[1], 'md-meta').length, 0, 'a linked quote remains the main claim');
    assert.deepEqual(findClass(body, 'md-meta').map(node => node.textContent), ['원문 · 자료']);
  }
});

test('shared editorial prelude stays outside two equal-role groups and does not count as a third group', () => {
  const source = control('compose: editorial\nvariant: centered') + '# 공동 편집\n\n같은 문서를 함께 읽고 고칩니다.\n\n## 사람\n\n목적과 판단을 적습니다.\n\n## AI\n\n문서와 연결을 갱신합니다.';
  const result = preserved(source);
  const body = findClass(result.body, 'markdown-body')[0];
  assert.equal(body.dataset.groupCount, '2');
  assert.equal(body.dataset.hasPrelude, 'true');
  assert.deepEqual(body.children.map(node => node.tagName), ['p', 'section', 'section']);
  assert.equal(body.children[0].dataset.copyRole, 'body');
  assert.deepEqual(findClass(body, 'md-group').map(node => node.textContent), ['사람목적과 판단을 적습니다.', 'AI문서와 연결을 갱신합니다.']);
  assert.equal(findClass(preserved(control('compose: editorial\nvariant: centered') + '# 역할\n\n## 사람\n\n판단\n\n## AI\n\n정리').body, 'markdown-body')[0].dataset.hasPrelude, undefined);
});

test('authored body and quotation hardbreaks retain order and emphasis in audience and preview rendering', () => {
  const source = control('compose: quote') + '# 내 목적\n\n원문을 읽고,\\\n내 판단을 남깁니다.\n\n> 목적은 내가 정하고,\\\n> **판단도 내가 적습니다.**';
  for (const preview of [false, true]) {
    const result = preserved(source, { preview });
    const body = findClass(result.body, 'markdown-body')[0];
    assert.deepEqual(nodes(body).filter(node => node.tagName === 'br').length, 2);
    const quoted = nodes(body).find(node => node.tagName === 'blockquote');
    const meaningful = quoted.children[0].children.filter(node => node.tagName !== '#text' || node.textContent);
    assert.deepEqual(meaningful.map(node => node.tagName), ['#text', 'br', 'strong']);
    assert.equal(meaningful[2].textContent, '판단도 내가 적습니다.');
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

test('explicit quiet changes repeated chrome only while rendered body, links and reading copy remain present', () => {
  const content = '# 읽을 자료\n\n필수 책임과 조건을 남깁니다.\n\n[공개 해설](./materials/notes.md)';
  for (const quiet of [true, false]) {
    const result = preserved(control('compose: document\nquiet: ' + quiet) + content);
    assert.equal(result.quiet, quiet);
    assert.ok(result.body.textContent.includes('필수 책임과 조건을 남깁니다.'));
    assert.ok(nodes(result.body).some(n => n.tagName === 'a' && n.attrs.href === './materials/notes.md'));
    assert.ok(!nodes(result.body).some(n => 'hidden' in n.attrs || n.style.display === 'none'));
  }
});

test('explicit native support is a source-addressed sibling navigation link while authored body and previews stay intact', () => {
  const source = control('compose: document\nsupport:\n  label: "자료 본문을 글로 읽기"\n  href: "./materials/notes.md#핵심"') + '# 자료\n\n필수 책임과 원문을 보존합니다.';
  const parsed=slide(source),before=structuredClone(parsed),rendered=renderer.renderSlide(parsed);
  assert.deepEqual(parsed,before);
  const support=findClass(rendered.body,'markdown-support');assert.equal(support.length,1);assert.equal(support[0].dataset.copyRole,'support');assert.equal(Number(support[0].dataset.sourceLine),1);
  const link=nodes(support[0]).find(n=>n.tagName==='a');assert.equal(link.attrs.href,'./materials/notes.md#핵심');assert.equal(link.textContent,'자료 본문을 글로 읽기');
  const body=findClass(rendered.body,'markdown-body')[0];assert.equal(body.textContent,'필수 책임과 원문을 보존합니다.');assert.ok(!nodes(body).includes(support[0]));
  const preview=renderer.renderSlide(parsed,{preview:true});assert.ok(!nodes(preview.body).some(n=>n.tagName==='a'));assert.ok(preview.body.textContent.includes('필수 책임과 원문을 보존합니다.'));
});
