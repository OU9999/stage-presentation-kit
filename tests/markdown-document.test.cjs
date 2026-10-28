'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { parseDocument, collectReferences } = require('../scripts/markdown-document.cjs');
const legacy = require('../scripts/markdown-deck.cjs');

function elements(node, tag) {
  const nodes = Array.isArray(node) ? node : [node];
  return nodes.flatMap(item => !item || item.type !== 'element' ? [] : [...(item.tag === tag ? [item] : []), ...elements(item.children, tag)]);
}
const value = node => Array.isArray(node) ? node.map(value).join('') : node.type === 'text' ? node.value : value(node.children);
const metadata = fields => '<!-- stage\n' + fields + '\n-->\n';

test('mixed ordinary Markdown preserves block order, inline semantics, image alt, tables and code whitespace', () => {
  const source = '# A **rich** [title](https://example.com)\n\nFirst *emphasis*, ~~removed~~ and `inline`.\n\n![A **diagram**](./figure.svg "Figure")\n\n- One\n- Two\n\n> Quote\n\n| Item | Value |\n| :--- | ---: |\n| A | 2 |\n\n```js\n  const a = 1;\n\tconsole.log(a);\n```';
  const deck = parseDocument(source, { sourcePath: 'talks/a/slides.md', id: 'a', theme: 'paper' });
  const slide = deck.slides[0];
  assert.equal(deck.format, 'markdown-v1'); assert.equal(deck.id, 'a'); assert.equal(deck.theme, 'paper');
  assert.equal(slide.title, 'A rich title');
  assert.equal(elements(slide.heading, 'strong').length, 1);
  assert.deepEqual(slide.blocks.map(node => node.tag), ['p', 'p', 'ul', 'blockquote', 'table', 'pre']);
  assert.equal(elements(slide.blocks, 'img')[0].attrs.alt, 'A diagram');
  assert.equal(elements(slide.blocks, 'img')[0].attrs.title, 'Figure');
  assert.equal(elements(slide.blocks, 's').length, 1);
  assert.equal(elements(slide.blocks, 'th')[1].attrs.align, 'right');
  assert.equal(value(elements(slide.blocks, 'pre')[0]), '  const a = 1;\n\tconsole.log(a);\n');
  assert.equal(elements(slide.blocks, 'code').at(-1).attrs.class, 'language-js');
  assert.equal(deck.document.revision, crypto.createHash('sha256').update(source).digest('hex'));
});

test('only a leading first H1 becomes heading; subsequent headings and a later H1 remain ordered body', () => {
  const leading = parseDocument('# First\n\n# Second\n\n## Third').slides[0];
  assert.equal(value(leading.heading), 'First');
  assert.deepEqual(leading.blocks.map(node => node.tag), ['h1', 'h2']);
  const later = parseDocument('Before\n\n# Later\n\nAfter').slides[0];
  assert.equal(later.heading, undefined); assert.equal(later.title, undefined);
  assert.deepEqual(later.blocks.map(node => node.tag), ['p', 'h1', 'p']);
});

test('frontmatter metadata and slide/node positions refer to full source lines', () => {
  const source = '---\nid: explicit\ntitle: Deck\nspeaker: Person\n---\n\n# One\n\nParagraph\n\n---\n\n# Two\n\n1. Numbered\n2. List\n';
  const deck = parseDocument(source, { sourcePath: 'talks/demo/slides.md', id: 'fallback' });
  assert.equal(deck.id, 'explicit'); assert.equal(deck.title, 'Deck'); assert.equal(deck.speaker, 'Person');
  assert.deepEqual(deck.slides[0].origin, { line: 7, endLine: 9 });
  assert.deepEqual(deck.slides[0].heading.position, { line: 7, endLine: 7 });
  assert.deepEqual(deck.slides[1].origin, { line: 13, endLine: 16 });
  assert.deepEqual(deck.slides[1].blocks[0].position, { line: 15, endLine: 16 });
});

test('delimiters inside backtick/tilde fences, indented code and nested containers stay inside one slide', () => {
  for (const source of ['````js\n```\n---\n````', '~~~\n---\n~~~', '    ---\n    code', '- One\n\n  ---\n\n  After', '> Quote\n>\n> ---\n> After']) {
    assert.equal(parseDocument(source).slides.length, 1, source);
  }
  const deck = parseDocument('# One\n\n```js\n---\n```\n\n---\n\n# Two');
  assert.equal(deck.slides.length, 2); assert.equal(value(deck.slides[0].blocks), '---\n');
});

test('ordinary HTML stays literal, unsafe link syntax does not become executable nodes', () => {
  const deck = parseDocument('# Title\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))');
  assert.match(value(deck.slides[0].blocks), /<script>alert\(1\)<\/script>/);
  assert.equal(elements(deck.slides[0].blocks, 'script').length, 0);
  assert.equal(collectReferences(deck).length, 0);
});

test('explicit legacy layout preserves legacy meaning and rejects unmatched prose/duplicates', () => {
  const source = metadata('layout: image') + '# Picture\n\n![Alt](./photo.svg)\n\nCaption';
  const current = parseDocument(source).slides[0];
  const expected = legacy.parseMarkdown(source).slides[0];
  const { origin, ...slide } = current;
  assert.deepEqual(slide, expected); assert.deepEqual(origin, { line: 1, endLine: 8 });
  assert.throws(() => parseDocument(metadata('layout: image') + '# Image\n\n![Alt](a.svg)\n\n- Lost'), /demo.steps/);
  assert.throws(() => parseDocument(metadata('layout: statement\nsubtitle: Config') + '# H\n\nBody'), /중복/);
  assert.throws(() => parseDocument(metadata('theme: paper') + '# H'), /명시 layout/);
});

test('stage JSON stays an explicit advanced adapter and unknown fields are rejected', () => {
  const source = '# Metric\n\n```stage\n{"layout":"metric","value":42,"unit":"개"}\n```';
  assert.equal(parseDocument(source).slides[0].layout, 'metric');
  assert.equal(parseDocument(source).slides[0].value, 42);
  assert.throws(() => parseDocument('```stage\n{"layout":"statement","blocks":[]}\n```\n# H'), /표시하지 않는 필드/);
  assert.throws(() => parseDocument('~~~stage\n{"layout":"metric","value":42}\n~~~'), /세 백틱/);
  assert.throws(() => parseDocument('````stage\n{"layout":"metric","value":42}\n````'), /세 백틱/);
});

test('frontmatter and explicit adapters reject notes/roles/appendix and invalid or duplicate metadata', () => {
  for (const key of ['notes', 'appendix', 'role', 'sourceDownload']) {
    assert.throws(() => parseDocument(`---\n${key}: secret\n---\n# H`), /지원하지 않습니다/);
    assert.throws(() => parseDocument(metadata(`layout: statement\n${key}: secret`) + '# H'), /지원하지|표시하지/);
    assert.throws(() => parseDocument('```stage\n' + JSON.stringify({ layout: 'statement', [key]: 'secret', title: 'H' }) + '\n```'), /지원하지|표시하지/);
  }
  assert.throws(() => parseDocument('---\ntitle: First\ntitle: Second\n---\n# H'), /frontmatter/);
  assert.throws(() => parseDocument('---\n__proto__: bad\n---\n# H'), /지원하지/);
  assert.throws(() => parseDocument('---\ntitle: [One, Two]\n---\n# H'), /문자열/);
  assert.throws(() => parseDocument('---\nfalse\n---\n# H'), /객체/);
});

test('collectReferences returns mutable AST and legacy owners with original-source positions', () => {
  const source = '# [Title](./other/slides.md)\n\n![Alt](./figure.svg)\n\n[Attachment](./data.csv)\n\n---\n\n' + metadata('layout: demo\nurl: https://example.com') + '# Demo\n\n![Media](./poster.svg)';
  const deck = parseDocument(source);
  const refs = collectReferences(deck);
  assert.deepEqual(refs.map(ref => ref.kind), ['link', 'image', 'link', 'image', 'link']);
  assert.deepEqual(refs.map(ref => ref.position.line), [1, 3, 5, 9, 9]);
  refs[1].owner[refs[1].key] = 'assets/copied.svg';
  assert.equal(elements(deck.slides[0].blocks, 'img')[0].attrs.src, 'assets/copied.svg');
  refs[3].owner[refs[3].key] = 'assets/poster.svg';
  assert.equal(deck.slides[1].src, 'assets/poster.svg');
});

test('legacy artifact media references include cover and task tools without treating literal data as media', () => {
  const source = '```stage\n' + JSON.stringify({ layout: 'bento', title: 'Artifacts', items: [{type:'artifact',kind:'cover',title:'Cover',src:'./cover.svg'}, {type:'artifact',kind:'task',title:'Task',tools:[{src:'./tool.svg'}]}] }) + '\n```';
  const deck = parseDocument(source);
  assert.deepEqual(collectReferences(deck).map(ref => ref.owner[ref.key]), ['./cover.svg', './tool.svg']);
});

test('input is unchanged, CRLF positions remain whole-source and explicit blank slides fail with location', () => {
  const source = '\ufeff# First\r\n\r\nParagraph\r\n\r\n---\r\n\r\n# Second\r\n';
  const unchanged = source;
  const deck = parseDocument(source, { sourcePath: 'talks/a/slides.md' });
  assert.equal(source, unchanged); assert.equal(deck.slides[1].origin.line, 7);
  assert.equal(deck.document.revision, crypto.createHash('sha256').update(source).digest('hex'));
  assert.throws(() => parseDocument('# H\n\n---\n', {sourcePath:'talks/b/slides.md'}), /talks\/b\/slides.md:4:/);
  assert.throws(() => parseDocument(''), /한 장 이상/);
});

test('notes words and HTML/code literals remain public text; role keys alone are unsupported', () => {
  const source = '# Notes about notes\n\n<!-- notes: literal public comment -->\n\n```text\nnotes: not-a-private-role\nappendix: public code\n```';
  const deck = parseDocument(source);
  assert.match(value(deck.slides[0].blocks), /notes: literal public comment/);
  assert.match(value(deck.slides[0].blocks), /appendix: public code/);
});

test('legacy adapter never silently drops a second slide made by its different nested separator rules', () => {
  const source = metadata('layout: demo') + '# Demo\n\n- First\n\n  ---\n\n  Following text';
  assert.throws(() => parseDocument(source), /중첩 구분선|명시 layout/);
});

test('stage-slide masks control lines while keeping the leading heading, source positions and canonical nodes', () => {
  const control = '<!-- stage-slide\ncompose: split\ntone: neutral\nfit: cover\nfocus: "0.5% 100%"\n-->\n';
  const content = '# A **heading**\n\n![Alt](./figure.svg "Caption")\n\n- First\n- Second';
  const slide = parseDocument(control + content, {sourcePath:'talks/control/slides.md'}).slides[0];
  assert.equal(slide.title, 'A heading'); assert.equal(slide.tone, 'neutral');
  assert.deepEqual(slide.view, {compose:'split', fit:'cover', focus:'0.5% 100%'});
  assert.deepEqual(slide.heading.position, {line:7,endLine:7});
  assert.equal(value(slide.blocks).includes('stage-slide'), false);
  assert.equal(collectReferences({slides:[slide]})[0].position.line, 9);
  const masked = control.split('\n').slice(0,-1).map(()=>'').join('\n')+'\n'+content;
  const canonical = parseDocument(masked).slides[0];
  assert.deepEqual(slide.heading, canonical.heading); assert.deepEqual(slide.blocks, canonical.blocks);
});

test('stage-group binds to post-heading blocks, stops at every H2 and preserves marker versus heading locations', () => {
  const source = '# Heading\n\nIntro\n\n<!-- stage-group\nprimary: true\ntone: blue\nfit: contain\n-->\n\n## First\n\nText\n\n## Unselected\n\nMiddle\n\n<!-- stage-group\ntone: orange\n-->\n## Last\n\nEnd';
  const slide = parseDocument(source).slides[0];
  assert.deepEqual(slide.view.groups, [
    {start:1,end:3,primary:true,tone:'blue',fit:'contain',origin:{line:5,endLine:9}},
    {start:5,end:7,tone:'orange',origin:{line:19,endLine:21}}
  ]);
  assert.equal(slide.blocks[1].tag,'h2'); assert.equal(slide.blocks[1].position.line,11);
  assert.equal(slide.blocks[3].tag,'h2'); assert.equal(slide.blocks[5].position.line,22);
  assert.equal(value(slide.blocks).includes('stage-group'),false);
  assert.equal(value(slide.blocks),'IntroFirstTextUnselectedMiddleLastEnd');
});

test('composition control examples in fences, inline code and ordinary HTML comments remain literal', () => {
  const example = '<!-- stage-slide\ncompose: message\n-->';
  for (const source of ['```html\n'+example+'\n```','~~~html\n'+example+'\n~~~','`example\n'+example+'\nend`','<!-- documentation\n'+example+'\n-->','<!-- documentation with `inline` code\n'+example+'\n-->','<!-- one --> <!-- documentation\n'+example+'\n-->']) {
    const slide = parseDocument(source).slides[0];
    assert.equal(slide.view,undefined,source); assert.equal(slide.tone,undefined);
    assert.match(value(slide.blocks), /stage-slide/);
  }
  const inline = parseDocument('`<!-- stage-slide -->` and ordinary text').slides[0];
  assert.equal(inline.view,undefined); assert.equal(elements(inline.blocks,'code').length,1);
});

test('bad control schema, placement, aliases, duplicate choices and legacy mixing report source locations', () => {
  const slide = settings => '<!-- stage-slide\n'+settings+'\n-->\n# Heading';
  const group = settings => '# Heading\n\n<!-- stage-group\n'+settings+'\n-->\n## Group\n\nText';
  for (const source of [slide('compose: invented'),slide('tone: pink'),slide('fit: fill'),slide('focus: "101% 50%"'),slide('focus: "-1% 20%"'),slide('focus: "left center"'),slide('notes: private'),slide('compose: auto\ncompose: message'),group('primary: "true"'),group('compose: editorial'),group('focus: "10%; color:red 20%"'),'<!-- stage-unknown\nvalue: x\n-->\n# H','<!-- stage-slide tone: blue -->\n# H','# Before\n\n'+slide('tone: blue'),'<!-- stage-slide\ncompose: auto\n-->\n'+slide('tone: blue'),group('tone: blue').replace('## Group','Paragraph\n\n## Group'),'<!-- stage-slide\ncompose: auto\n-->\n'+metadata('layout: statement')+'# H','<!-- stage-slide\ncompose: auto\n-->\n```stage\n{"layout":"statement","title":"H"}\n```']) {
    assert.throws(()=>parseDocument(source,{sourcePath:'talks/bad/slides.md'}),/talks\/bad\/slides.md:\d+:/,source);
  }
  const duplicatePrimary = group('primary: true')+'\n\n<!-- stage-group\nprimary: true\n-->\n## Second';
  assert.throws(()=>parseDocument(duplicatePrimary),/primary/);
  assert.throws(()=>parseDocument('# H\n\n<!-- stage-group\ntone: blue\n-->\n> ## Nested'),/H2/);
});

test('all composition names are syntax-valid even when renderer needs a document fallback', () => {
  for (const compose of ['auto','message','split','media','gallery','mosaic','editorial','quote','closing','document']) {
    assert.equal(parseDocument('<!-- stage-slide\ncompose: '+compose+'\n-->\n# H').slides[0].view.compose,compose);
  }
});

test('the two authored eight-slide stories preserve semantic AST, references and whole-source positions', () => {
  const fs = require('node:fs'); const path = require('node:path'); const model = require('../deck-model.js');
  let totalGroups=0,totalImages=0;
  for (const name of ['product-notes','team-learning']) {
    const filename=path.join(__dirname,'../talks',name,'slides.md');const source=fs.readFileSync(filename,'utf8');
    const deck=parseDocument(source,{sourcePath:'talks/'+name+'/slides.md',id:name});
    assert.equal(deck.slides.length,8);assert.deepEqual(model.validateDeck(deck),[]);
    const masked=source.replace(/^<!-- stage-(?:slide|group)\n[\s\S]*?^-->[ \t]*$/gm,match=>match.split('\n').map(()=>'').join('\n'));
    const canonical=parseDocument(masked).slides;
    deck.slides.forEach((slide,index)=>{
      assert.deepEqual(slide.heading,canonical[index].heading);assert.deepEqual(slide.blocks,canonical[index].blocks);
      if(slide.heading)assert.match(source.split('\n')[slide.heading.position.line-1],/^# /);
      totalGroups+=(slide.view?.groups||[]).length;
    });
    totalImages+=collectReferences(deck).filter(ref=>ref.kind==='image').length;
    assert.equal(fs.readFileSync(filename,'utf8'),source);
  }
  assert.equal(totalGroups,5);assert.equal(totalImages,10);
});
