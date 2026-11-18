'use strict';
// Source and integration checks only. This script does not build or approve visuals.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
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
const source = prefix + 'talks/first-look/slides.md';
const material = prefix + 'talks/first-look/materials/notes.md';
const pack = prefix + 'talks/first-look/materials/source-pack.txt';
const config = prefix + 'ou.config.json';
const deck = parseDocument(read(source).toString(), { sourcePath: source, id: 'first-look' });
const notes = parseMaterial(read(material).toString(), { sourcePath: material });
const plans = deck.slides.map(slide => slide.layout === 'blocks' ? planSlide(slide) : { composition: slide.layout, warnings: [] });
const plain = node => !node ? '' : node.type === 'text' ? node.value : node.tag === 'br' ? ' ' : (node.children || []).map(plain).join('');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const checks = [];
function check(name, pass, detail) { checks.push({ name, pass: Boolean(pass), detail }); }

const project = loadProject({ configPath: path.join(root, config) });
check('isolated-project', project.sourceRoot === path.join(root, prefix, 'talks') && project.output === path.join(root, prefix, 'site'), { config, source });
check('four-valid-roles', !validateDeck(deck).length && deck.slides.length === 4 && plans.every(plan => !plan.warnings.length) && plans.map(plan => plan.composition).join('/') === 'message/gallery/split/results', plans.map(plan => ({ composition: plan.composition, variant: plan.variant || '' })));

const references = collectReferences(deck);
const images = references.filter(ref => ref.kind === 'image').map(ref => path.relative(root, path.resolve(path.dirname(path.join(root, source)), ref.owner[ref.key])));
check('all-seven-active-images-exist', images.length === 7 && images.every(file => fs.existsSync(path.join(root, file))), images);
const support = references.filter(ref => ref.kind === 'support').map(ref => ref.owner[ref.key]);
check('three-support-destinations-and-results-section', support.length === 3 && support.every(href => notes.headingIds.includes(decodeURIComponent(href.split('#')[1]))) && notes.headingIds.includes('다음-작업의-모양'), { support, results: 'materials/notes.html#다음-작업의-모양', resultsAccess: 'published materials index and notes table of contents' });

const quote = deck.slides[2].blocks.find(node => node.tag === 'blockquote');
const quoteText = normalize(plain(quote));
check('short-native-quote-is-an-exact-contiguous-selection', quoteText === '다음 질문의 근거를 찾는 경험을 먼저 하고 싶다.' && read(pack).toString().includes(quoteText) && quote.children[0].children.filter(node => node.tag === 'br').length === 2, { text: quoteText, sourceLine: quote.position.line, kind: 'selection from an authored hypothetical example' });
check('original-pack-preserved-byte-for-byte', sha(pack) === sha('talks/llm-wiki/assets/expanded-study.txt'), sha(pack));

const rendered = renderMaterial(notes).body;
check('public-context-is-renderable-and-explains-example-status', rendered.includes('발표팀이 만든 설명용 예') && rendered.includes('정확도·속도·비용의 우열을 측정한 비교가 아닙니다.') && rendered.includes('원자료 전문') && notes.references.some(ref => ref.value === './source-pack.txt'), { headingIds: notes.headingIds, bytes: Buffer.byteLength(rendered) });
check('native-message-and-equal-labels', deck.slides[0].heading.children.some(node => node.tag === 'br') && deck.slides[0].heading.children.some(node => node.tag === 'strong') && plans[1].images.map(image => image.node.attrs.title).join('/') === '이번 답/다시 쓸 지식' && deck.slides[3].items.length === 4, { message: deck.slides[0].title, resultTitle: deck.slides[3].title });

const baseline = JSON.parse(read('research/devday-rebuild-20261117/starting-inputs.json')).inputs;
const authorized = new Set(['blocks.css', 'blocks.js', 'deck-model.js', 'lib/markdown-document.cjs']);
const protectedInputs = Object.entries(baseline).filter(([file]) => !authorized.has(file));
const changedProtected = protectedInputs.filter(([file, hash]) => sha(file) !== hash).map(([file]) => file);
check('old-main-assets-history-and-unowned-inputs-preserved', changedProtected.length === 0, { protectedCount: protectedInputs.length, changedProtected, authorizedRuntimeChanges: [...authorized] });

const provenance = ['plan', 'map', 'question', 'brief'].map(name => prefix + 'assets/output-' + name + '.html');
const inputs = [...new Set([config, source, material, pack, ...images, ...provenance, ...RUNTIME, TEMPLATE, 'templates/material.html', 'templates/materials.css', 'lib/markdown-document.cjs', 'lib/materials.cjs', 'lib/project.cjs', 'CONFIG.md', 'MARKDOWN-FIRST.md'])].sort();
const result = { scope: '2026-11-17 isolated first-look source integration', visualApproval: false, observedRender: false, passed: checks.filter(item => item.pass).length, failed: checks.filter(item => !item.pass).length, checks, inputs: Object.fromEntries(inputs.map(file => [file, sha(file)])) };
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
if (result.failed) process.exitCode = 1;
