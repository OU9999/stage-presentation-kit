'use strict';
// Static integration only; actual glyphs, image edges and aesthetics require a new capture.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const prefix = 'research/devday-rebuild-20261117/prototypes/';
const read = file => fs.readFileSync(path.join(root, file));
const sha = file => crypto.createHash('sha256').update(read(file)).digest('hex');
const { parseDocument, collectReferences } = require(path.join(root, 'lib/markdown-document.cjs'));
const { parseMaterial, renderMaterial } = require(path.join(root, 'lib/materials.cjs'));
const { validateDeck } = require(path.join(root, 'deck-model.js'));
const { planSlide } = require(path.join(root, 'blocks.js'));
const { loadProject } = require(path.join(root, 'lib/project.cjs'));
const { RUNTIME, TEMPLATE } = require(path.join(root, 'lib/runtime.cjs'));
const source = prefix + 'talks/first-look/slides.md', material = prefix + 'talks/first-look/materials/notes.md';
const pack = prefix + 'talks/first-look/materials/source-pack.txt', config = prefix + 'ou.config.json';
const deck = parseDocument(read(source).toString(), { sourcePath: source, id: 'first-look' });
const notes = parseMaterial(read(material).toString(), { sourcePath: material });
const plans = deck.slides.map(slide => slide.layout === 'blocks' ? planSlide(slide) : { composition: slide.layout, variant: slide.variant, warnings: [] });
const plain = node => !node ? '' : node.type === 'text' ? node.value : node.tag === 'br' ? ' ' : (node.children || []).map(plain).join('');
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: Boolean(pass), detail });
const project = loadProject({ configPath: path.join(root, config) });
check('isolated-project', project.sourceRoot === path.join(root, prefix, 'talks') && project.output === path.join(root, prefix, 'site'), config);
check('four-valid-explicit-roles', !validateDeck(deck).length && deck.slides.length === 4 && plans.every(plan => !plan.warnings.length) && plans.map(plan => plan.composition + '/' + plan.variant).join('|') === 'message/declaration|gallery/comparison|split/quote-card|results/unframed', plans.map(plan => ({ composition: plan.composition, variant: plan.variant })));

const references = collectReferences(deck);
const images = references.filter(ref => ref.kind === 'image').map(ref => path.relative(root, path.resolve(path.dirname(path.join(root, source)), ref.owner[ref.key])));
check('seven-active-assets-exist', images.length === 7 && images.every(file => fs.existsSync(path.join(root, file))), images);
const support = references.filter(ref => ref.kind === 'support').map(ref => ref.owner[ref.key]);
check('public-support-and-results-context', support.length === 3 && support.every(href => notes.headingIds.includes(decodeURIComponent(href.split('#')[1]))) && notes.headingIds.includes('다음-작업의-모양') && notes.references.some(ref => ref.value === './source-pack.txt'), { support, resultsAccess: 'published materials index and notes table of contents' });

const quote = deck.slides[2].blocks.find(node => node.tag === 'blockquote');
const quoteText = plain(quote).replace(/\s+/g, ' ').trim();
const html = renderMaterial(notes).body;
check('rewritten-passage-is-disclosed-and-original-purpose-retained', quoteText === '문서를 따라 읽고 다음 질문에 쓸 근거를 찾고 싶다' && html.includes(quoteText) && html.includes('원문을 그대로 발췌한 인용이 아니라') && html.includes('도구 설치보다 목차와 연결을 따라 다음 질문의 근거를 찾는 경험을 먼저 하고 싶다.') && read(prefix + 'assets/condition-article-r02.svg').toString().includes(quoteText), { text: quoteText, sourceLine: quote.position.line, kind: 'editorial rewriting of an authored hypothetical purpose' });
check('source-pack-byte-preservation', sha(pack) === sha('talks/llm-wiki/assets/expanded-study.txt'), sha(pack));
check('native-message-label-and-title-inputs', deck.slides[0].heading.children.some(node => node.tag === 'br') && deck.slides[0].heading.children.some(node => node.tag === 'strong') && plans[1].images.map(image => image.node.attrs.title).join('/') === '이번 답/다시 쓸 지식' && deck.slides[3].items.length === 4 && deck.slides[3].items.every(item => item.fit === 'contain' && !item.zoom), { message: deck.slides[0].title, resultTitle: deck.slides[3].title, authoredQuoteBreaks: quote.children[0].children.filter(node => node.tag === 'br').length });

const former = JSON.parse(read(prefix + 'source-proof.json'));
const formerAssets = Object.entries(former.inputs).filter(([file]) => file.startsWith(prefix + 'assets/'));
const alteredFormerAssets = formerAssets.filter(([file, hash]) => sha(file) !== hash).map(([file]) => file);
check('round01-assets-and-four-result-pngs-preserved', alteredFormerAssets.length === 0, { protectedAssets: formerAssets.length, alteredFormerAssets });
const historical = {
  'research/devday-rebuild-20261117/prototypes/source-proof.cjs': '0184880ede9c990591b509097697297c4694f6c2f2364cb2e5001ed0756dbfff',
  'research/devday-rebuild-20261117/prototypes/source-proof.json': '6616dfa2b395e810e718a88176857b52de618b411c642ba3dac70a266ba1ab60',
  'research/devday-rebuild-20261117/production/integration.md': '5442fda4bff77f54f15571b85395bf7ef46b355d153ddddf370a8018003499cd'
};
check('historical-source-proof-and-handoff-unchanged', Object.entries(historical).every(([file, hash]) => sha(file) === hash), Object.keys(historical));

const baseline = JSON.parse(read('research/devday-rebuild-20261117/starting-inputs.json')).inputs;
const authorized = new Set(['app.js', 'styles.css', 'blocks.css', 'blocks.js', 'deck-model.js', 'lib/markdown-document.cjs', 'lib/markdown-deck.cjs']);
const protectedInputs = Object.entries(baseline).filter(([file]) => !authorized.has(file));
const changedProtected = protectedInputs.filter(([file, hash]) => sha(file) !== hash).map(([file]) => file);
check('main-and-unowned-inputs-preserved', changedProtected.length === 0, { protectedCount: protectedInputs.length, changedProtected, authorizedRuntimeChanges: [...authorized] });

const provenance = ['plan', 'map', 'question', 'brief'].map(name => prefix + 'assets/output-' + name + '.html');
const inputs = [...new Set([config, source, material, pack, ...images, ...provenance, ...RUNTIME, TEMPLATE, 'templates/material.html', 'templates/materials.css', 'lib/markdown-document.cjs', 'lib/markdown-deck.cjs', 'lib/materials.cjs', 'lib/project.cjs', 'CONFIG.md', 'MARKDOWN-FIRST.md'])].sort();
const result = { scope: '2026-11-17 isolated first-look round02 source integration', visualApproval: false, observedRender: false, passed: checks.filter(item => item.pass).length, failed: checks.filter(item => !item.pass).length, checks, inputs: Object.fromEntries(inputs.map(file => [file, sha(file)])) };
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
if (result.failed) process.exitCode = 1;
