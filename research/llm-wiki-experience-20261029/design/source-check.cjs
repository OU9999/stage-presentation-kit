'use strict';
// Independent source/structure checks. Does not build or claim browser verification.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../..');
const { parseDocument, collectReferences } = require(path.join(repo, 'scripts/markdown-document.cjs'));
const { parseMaterial } = require(path.join(repo, 'scripts/materials.cjs'));
const { validateDeck } = require(path.join(repo, 'deck-model.js'));
const { planSlide } = require(path.join(repo, 'blocks.js'));
const base = path.join(repo, 'talks/llm-wiki');
const source = fs.readFileSync(path.join(base, 'slides.md'), 'utf8');
const deck = parseDocument(source, { sourcePath: 'talks/llm-wiki/slides.md', id: 'llm-wiki' });
assert.equal(deck.slides.length, 40);
assert.deepEqual(validateDeck(deck), []);
const nodeText = node => node?.type === 'text' ? node.value : (node?.children || []).map(nodeText).join('');
const walk = node => [node, ...(node?.children || []).flatMap(walk)];
const plans = deck.slides.map((slide, i) => {
  const plan = planSlide(slide, { index: i, total: 40 });
  assert.deepEqual(plan.warnings, [], 'composition warning on ' + (i + 1));
  const nodes = [slide.heading, ...slide.blocks].filter(Boolean).flatMap(walk);
  return { slide: i + 1, title: nodeText(slide.heading), requested: plan.requested, composition: plan.composition,
    links: nodes.filter(n => n.tag === 'a').map(n => n.attrs.href), images: nodes.filter(n => n.tag === 'img').map(n => n.attrs) };
});
for (const [slide, targets] of [[12, ['#13']], [13, ['#12', '#14']], [23, ['#24']], [24, ['#23', '#25']]]) {
  for (const target of targets) assert.ok(plans[slide - 1].links.includes(target), `slide ${slide} link ${target}`);
}
const refs = collectReferences(deck).map(ref => ({ kind: ref.kind, value: ref.owner[ref.key] }));
for (const ref of refs) {
  if (/^(https?:|mailto:|#)/.test(ref.value)) continue;
  assert.ok(fs.existsSync(path.resolve(base, decodeURIComponent(ref.value.split('#')[0]))), 'missing local reference ' + ref.value);
  assert.ok(!ref.value.includes('/demo/') || !ref.value.endsWith('.md'), 'unregistered demo Markdown link');
}
for (const quote of ['This is the key difference: the wiki is a persistent, compounding artifact.', 'The human mind does not work that way. It operates by association.']) assert.equal(source.split(quote).length - 1, 1);
for (const photo of ['open-books.jpg', 'study-table.jpg', 'library.jpg', 'writing.jpg']) assert.ok(source.includes(photo));
const materialFiles = fs.readdirSync(path.join(base, 'materials')).filter(f => f.endsWith('.md'));
const materials = materialFiles.map(file => {
  const content = fs.readFileSync(path.join(base, 'materials', file), 'utf8');
  const parsed = parseMaterial(content, { sourcePath: 'talks/llm-wiki/materials/' + file });
  for (const ref of parsed.references) {
    if (/^(https?:|mailto:)/.test(ref.value)) continue;
    const [name, fragment] = ref.value.split('#');
    const target = name ? path.resolve(base, 'materials', decodeURIComponent(name)) : path.join(base, 'materials', file);
    assert.ok(fs.existsSync(target), file + ' missing material reference ' + ref.value);
    if (target.endsWith('.md') && fragment) {
      if (path.basename(target) === 'slides.md') assert.ok(Number(fragment) >= 1 && Number(fragment) <= 40);
      else {
        const targetMaterial = parseMaterial(fs.readFileSync(target, 'utf8'), { sourcePath: target });
        assert.ok(targetMaterial.headingIds.includes(decodeURIComponent(fragment)), file + ' missing material anchor ' + ref.value);
      }
    }
  }
  return { file, characters: content.length, headings: parsed.headings.length, references: parsed.references.length };
});
const script = fs.readFileSync(path.join(base, 'materials/speaker-script.md'), 'utf8');
const scriptSlides = [...script.matchAll(/^## (\d+)장\s*[·.:]/gm)].map(match => Number(match[1]));
assert.deepEqual(scriptSlides, Array.from({ length: 40 }, (_, i) => i + 1));
const scriptTitles = [...script.matchAll(/^## (\d+)장 · (.+)$/gm)].map(match => match[2]);
assert.deepEqual(scriptTitles, plans.map(p => p.title), 'script titles match slides');
const timing = JSON.parse(fs.readFileSync(path.join(repo, 'research/llm-wiki-experience-20261029/experience/storyboard.json')));
assert.equal(timing.slides.slice(0, 39).reduce((n, s) => n + s.seconds, 0), 1800);
assert.equal(timing.slides[39].seconds, 120);
const clock = seconds => String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
const scriptTimes = [...script.matchAll(/^\| (\d+) \| (\d\d:\d\d)~(\d\d:\d\d) \| (.+) \|$/gm)];
assert.equal(scriptTimes.length, 40, '40 script timing rows');
scriptTimes.forEach((row, i) => {
  assert.equal(Number(row[1]), i + 1);
  assert.equal(row[2], clock(timing.slides[i].start_seconds));
  assert.equal(row[3], clock(timing.slides[i].start_seconds + timing.slides[i].seconds));
  assert.equal(row[4], plans[i].title);
});
const guide = fs.readFileSync(path.join(base, 'assets/speaker-guide.txt'), 'utf8');
const guideRows = [...guide.matchAll(/^(\d+)장 (\d\d:\d\d)~(\d\d:\d\d) \((\d+)초\) (.+)$/gm)];
assert.equal(guideRows.length, 40, '40 speaker guide timing rows');
guideRows.forEach((row, i) => {
  assert.equal(Number(row[1]), i + 1);
  assert.equal(row[2], clock(timing.slides[i].start_seconds));
  assert.equal(row[3], clock(timing.slides[i].start_seconds + timing.slides[i].seconds));
  assert.equal(Number(row[4]), timing.slides[i].seconds);
  assert.equal(row[5], plans[i].title);
});
const oldSvg = new Set(['wiki-layers.svg', 'knowledge-map.svg', 'change-trace.svg']);
const newSvg = fs.readdirSync(path.join(base, 'assets')).filter(file => file.endsWith('.svg') && !oldSvg.has(file)).map(file => {
  const content = fs.readFileSync(path.join(base, 'assets', file), 'utf8');
  const fontSizes = [...content.matchAll(/font-size[=:]\s*[\"']?(\d+(?:\.\d+)?)/g)].map(match => Number(match[1]));
  assert.ok(fontSizes.length > 0, file + ' explicit font sizes');
  assert.ok(Math.min(...fontSizes) >= 32, file + ' minimum font >= 32');
  return { file, min_font_size: Math.min(...fontSizes), font_size_declarations: fontSizes.length };
});
const report = { new_svg: newSvg, scope: 'source parse, composition plan, links, quote spelling, material parse and 40-part script; no browser/layout check',
  source_sha256: crypto.createHash('sha256').update(source).digest('hex'), slides: plans, materials,
  compositions: plans.reduce((o, p) => (o[p.composition] = (o[p.composition] || 0) + 1, o), {}), references: refs.length,
  talk_seconds: 1800, qa_separate_seconds: 120, script_sections: scriptSlides.length };
fs.writeFileSync(path.join(__dirname, 'source-check.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ slides: plans.length, compositions: report.compositions, materials: materials.length, references: refs.length, script_sections: scriptSlides.length }));
