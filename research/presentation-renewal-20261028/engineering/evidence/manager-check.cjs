'use strict';
// Independent semantic probe; writes only to an explicitly supplied /tmp output.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../../..');
const { parseDocument } = require(path.join(repo, 'scripts/markdown-document.cjs'));
const model = require(path.join(repo, 'deck-model.js'));
class DOMNode {
  constructor(tag) { this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.style = {}; this.className = ''; this.classList = { add: (...names) => { this.className += ' ' + names.join(' '); } }; }
  append(...nodes) { for (const node of nodes) this.children.push(...(node.tagName === '#fragment' ? node.children : [node])); }
  setAttribute(key, value) { this.attrs[key] = value; }
  addEventListener() {}
  set textContent(value) { this.children = []; this.value = value; }
  get textContent() { return this.value !== undefined ? this.value : this.children.map(node => node.textContent).join(''); }
}
const context = { window: {}, document: { createElement: tag => new DOMNode(tag), createTextNode: value => Object.assign(new DOMNode('#text'), { value }), createDocumentFragment: () => new DOMNode('#fragment') } };
vm.runInNewContext(fs.readFileSync(path.join(repo, 'blocks.js'), 'utf8'), context);
const renderer = context.window.StageBlocks;
const walk = node => [node, ...node.children.flatMap(walk)];
const astText = node => node.type === 'text' ? node.value : (node.children || []).map(astText).join('');
const visibleText = node => node.tagName === 'figcaption' ? '' : node.value !== undefined ? node.value : node.children.map(visibleText).join('');
const normalize = value => value.replace(/\s+/g, ' ').trim();
function astImages(node) { return node.type === 'element' ? [...(node.tag === 'img' ? [node] : []), ...(node.children || []).flatMap(astImages)] : []; }
function astLinks(node) { return node.type === 'element' ? [...(node.tag === 'a' ? [node.attrs?.href] : []), ...(node.children || []).flatMap(astLinks)] : []; }
const results = [];
function check(name, source, expected, extra = {}) {
  const deck = parseDocument(source, { sourcePath: name + '/slides.md', id: name });
  assert.deepEqual(model.validateDeck(deck), []);
  const original = JSON.stringify(deck);
  const slides = deck.slides.map((slide, index) => {
    const plan = renderer.planSlide(slide, { index, total: deck.slides.length });
    if (expected) assert.equal(plan.composition, expected);
    const rendered = renderer.renderSlide(slide, { sourcePath: deck.document.sourcePath });
    const canonical = [slide.heading, ...slide.blocks].filter(Boolean);
    assert.equal(normalize(visibleText(rendered.body)), normalize(canonical.map(astText).join('')));
    const images = canonical.flatMap(astImages), dom = walk(rendered.body);
    const renderedImages = dom.filter(node => node.tagName === 'img');
    assert.equal(renderedImages.length, images.length);
    images.forEach((image, i) => {
      for (const key of ['src', 'alt', 'title']) assert.equal(renderedImages[i].attrs[key], image.attrs?.[key]);
    });
    if (extra.positions) assert.deepEqual(renderedImages.map(image => image.style.objectPosition), extra.positions);
    if (extra.warning) assert.ok(plan.warnings.length > 0);
    if (extra.contain) assert.ok(dom.filter(node => node.tagName === 'figure').every(node => node.dataset.fit === 'contain'));
    assert.deepEqual(dom.filter(node => node.tagName === 'a').map(node => node.attrs.href), canonical.flatMap(astLinks));
    assert.equal(dom.filter(node => node.tagName === 'h1').length, canonical.filter(node => node.tag === 'h1').length);
    for (const caption of dom.filter(node => node.tagName === 'figcaption')) assert.ok(Number(caption.dataset.sourceLine) > 0);
    const preview = renderer.renderSlide(slide, { preview: true });
    assert.ok(!walk(preview.body).some(node => node.tagName === 'a'));
    assert.ok(walk(preview.body).filter(node => node.className.includes('blocks-scroll')).every(node => node.tabIndex === -1));
    if (plan.warnings.length) assert.ok(rendered.body.dataset.compositionWarning);
    return { composition: plan.composition, images: images.length, warnings: plan.warnings.length };
  });
  assert.equal(JSON.stringify(deck), original);
  results.push({ name, slides });
}
for (const id of ['product-notes', 'team-learning']) check(id, fs.readFileSync(path.join(repo, 'talks', id, 'slides.md'), 'utf8'));
check('image-between-copy', '# 앞뒤\n\n앞 설명\n\n![그림](a.png "그림 출처")\n\n뒤 설명', 'document');
check('mixed-inline', '# 혼합\n\n앞 ![가](a.png) 중간 ![나](b.png) 뒤', 'document');
check('linked-image', '# 링크 그림\n\n[![대체](a.png "출처")](https://example.com)', 'document');
check('editorial-preface-and-condition', '<!-- stage-slide\ncompose: editorial\n-->\n# 자료\n\n먼저 읽을 조건\n\n## 앞\n\n**24** 개\n\n## 뒤\n\n> 원문 인용\n\n마지막 사실 조건', 'editorial');
check('fallback-table', '<!-- stage-slide\ncompose: mosaic\n-->\n# 표\n\n|대상|값|\n|---|---|\n|가|01|', 'document');
check('fallback-long-korean', '<!-- stage-slide\ncompose: message\n-->\n# 긴 문장\n\n' + '모든 원문과 조건을 그대로 읽습니다. '.repeat(30), 'document');
for (let count = 2; count <= 6; count++) {
  const images = Array.from({ length: count }, (_, i) => `![설명${i}](image${i}.png "출처${i}")`);
  check('gallery-separated-' + count, '# 사진\n\n' + images.join('\n\n'), 'gallery');
  check('gallery-one-paragraph-' + count, '# 사진\n\n' + images.join('\n'), 'gallery');
  check('mosaic-' + count, '<!-- stage-slide\ncompose: mosaic\n-->\n# 사진\n\n' + images.join('\n\n'), 'mosaic');
}
const pair = '![가](a.png "출처 가")\n![나](b.png "출처 나")';
check('gallery-per-image-focus', '<!-- stage-slide\nfit: cover\nfocus: ["25% 0%", "75% 100%"]\n-->\n# 사진\n\n' + pair, 'gallery', { positions: ['25% 0%', '75% 100%'] });
check('focus-count-fallback', '<!-- stage-slide\ncompose: mosaic\nfit: cover\nfocus: ["50% 0%"]\n-->\n# 사진\n\n' + pair, 'document', { warning: true, contain: true });
check('focus-shape-fallback', '<!-- stage-slide\nfit: cover\nfocus: ["50% 0%"]\n-->\n# 한 그림\n\n![가](a.png)', 'document', { warning: true, contain: true });
const hashes = Object.fromEntries(['scripts/markdown-document.cjs', 'deck-model.js', 'blocks.js', 'blocks.css', 'talks/product-notes/slides.md', 'talks/team-learning/slides.md'].map(file => [file, crypto.createHash('sha256').update(fs.readFileSync(path.join(repo, file))).digest('hex')]));
const receipt = { scope: 'Node VM semantic/plan checks, no browser/layout/contrast assertion', node: process.version, projects: results.length, slides: results.reduce((n, result) => n + result.slides.length, 0), results, hashes };
const output = process.argv[2];
if (!output || !path.resolve(output).startsWith('/tmp/')) throw new Error('Provide a /tmp output filename.');
fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ output, projects: receipt.projects, slides: receipt.slides }));
