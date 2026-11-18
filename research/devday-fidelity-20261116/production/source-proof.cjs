#!/usr/bin/env node
'use strict';

// Static source/provenance checks for the isolated four-slide checkpoint.
// This script never builds, captures, opens a browser, or issues a visual approval.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const repo = path.resolve(__dirname, '../../..');
const projectRoot = path.resolve(__dirname, '../prototypes');
const talk = path.join(projectRoot, 'talks/round-01');
const { parseDocument, collectReferences } = require(path.join(repo, 'lib/markdown-document.cjs'));
const { parseMaterial } = require(path.join(repo, 'lib/materials.cjs'));
const { loadProject } = require(path.join(repo, 'lib/project.cjs'));
const { planSlide } = require(path.join(repo, 'blocks.js'));
const { validateDeck } = require(path.join(repo, 'deck-model.js'));
const relative = filename => path.relative(repo, filename).split(path.sep).join('/');
const read = filename => fs.readFileSync(filename, 'utf8');
const digest = filename => crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const must = (condition, message) => { if (!condition) throw new Error(message); };
const nodeText = node => !node ? '' : node.type === 'text' ? node.value : node.tag === 'br' ? ' ' : node.tag === 'img' ? '' : (node.children || []).map(nodeText).join('');
const descendants = node => [node, ...(node.children || []).flatMap(descendants)];
const decode = value => value.replace(/&(?:amp|lt|gt|quot|apos);/g, token => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"})[token]);
const svgText = source => normalize([...source.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(match => decode(match[1].replace(/<[^>]*>/g, ' '))).join(' '));
const checks = [];
function check(id, action) {
  try { const detail = action(); checks.push({ id, status: 'pass', ...(detail === undefined ? {} : { detail }) }); }
  catch (error) { checks.push({ id, status: 'fail', error: error.message }); }
}
const sourcePath = path.join(repo, 'talks/llm-wiki/assets/expanded-study.txt');
const source = read(sourcePath);
const slidePath = path.join(talk, 'slides.md');
const slideSource = read(slidePath);
const deck = parseDocument(slideSource, { sourcePath: relative(slidePath), id: 'round-01' });
const notesPath = path.join(talk, 'materials/notes.md');
const notesSource = read(notesPath);
const notes = parseMaterial(notesSource, { sourcePath: relative(notesPath) });
const materials = new Map(fs.readdirSync(path.join(talk, 'materials')).filter(name => name.endsWith('.md')).map(name => {
  const filename = path.join(talk, 'materials', name);
  return [filename, parseMaterial(read(filename), { sourcePath: relative(filename) })];
}));
function section(name) {
  const marker = '========== ' + name + ' ==========';
  const start = source.indexOf(marker);
  must(start >= 0, 'Missing logical source section: ' + name);
  const next = source.indexOf('\n========== ', start + marker.length);
  return { name, startLine: source.slice(0, start).split('\n').length, text: source.slice(start, next < 0 ? undefined : next) };
}
const question = '다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?';
const purpose = '도구 설치보다 목차와 연결을 따라 다음 질문의 근거를 찾는 경험을 먼저 하고 싶다.';
const roles = [
  { index: 1, mainSlide: '05', role: '같은 질문의 비교', compose: 'media', asset: 'same-question-comparison.svg', anchor: '검색과-지속-문서', label: '같은 질문의 두 예와 비교 범위를 글로 읽기', sections: ['wiki/comparisons/rag-vs-wiki.md — 처음'], exact: ['공통 질문: ' + question, '기본 검색-생성 예: 관련 원자료를 찾아 현재 입력에서 종합해 이번 답을 만든다.', '위키를 유지하는 예: 자료 반영 때 개념·비교·종합을 문서로 남기고, 필요한 쪽을 읽어 이번 답을 만든다.'] },
  { index: 2, mainSlide: '07', role: '기존 문서의 세 무방향 관계', compose: 'media', asset: 'connected-documents.svg', anchor: '세-무방향-관계', label: '세 무방향 관계와 실제 문서 구절을 글로 읽기', sections: ['wiki/sources/context-note.md', 'wiki/concepts/llm-wiki.md — 처음', 'wiki/comparisons/rag-vs-wiki.md — 처음', 'wiki/syntheses/study-plan.md — 처음'], exact: ['자료를 왜 남기고 어디에 다시 쓸지 정하고, 관련 여러 문서의 작성·갱신과 재읽기를 연결한다.', 'LLM이 원자료의 개념·비교·종합을 연결 문서로 작성하고 갱신하는 지식관리 패턴이다.', '발표팀의 설명용 주제 메모 세 개에서 개념·비교·계획을 만들고 다음 질문에 재사용한다.'] },
  { index: 3, mainSlide: '13', role: '설명용 활동안의 한 행', compose: 'media', asset: 'session-plan-row.svg', anchor: '활동안과-미확인-범위', label: '활동안의 정확한 한 행과 전문을 글로 읽기', sections: ['wiki/outputs/study-session-plan.md'], exact: ['# 입문자와 함께 읽는 15분 LLM Wiki 활동', '## 15분 진행안', '| 활동 시간 | 할 일 | 남길 것 |', '| 6~11분 | 원자료→개념→비교의 연결 한 개를 따라 읽기 | 관계를 뒷받침하는 근거 위치 |', '범위: 미리 준비된 읽기 팩을 쓰는 활동이다. 설치·계정 연결·위키 제작은 활동 범위에 포함하지 않는다.', '작성: 발표팀의 설명용 활동안. 실제 모임 운영·입문자 이해도·학습 효과를 측정한 결과가 아니다.'] },
  { index: 4, mainSlide: '15', role: '조건 메모의 정체성과 선택한 목적 구절', compose: 'split', variant: 'evidence', asset: 'condition-note-selection.svg', anchor: '선택의-근거-확인', label: '확인 질문과 조건 메모의 정확한 구절을 글로 읽기', sections: ['raw/study-retro.md — 나중에 추가'], exact: ['# 다음 모임의 조건 메모', '설명용 가상 조건이다. 실제 참가자 조사·회고·운영 성과를 기록한 것이 아니다.', '다음 모임에는 입문자가 함께한다고 가정한다.', '본편 뒤 별도 활동은 15분만 배정한다.', '발표팀의 설명용 주제 메모 세 개로 시작한다.', purpose] }
];

check('project-input-and-four-roles', () => {
  const project = loadProject({ configPath: path.join(projectRoot, 'ou.config.json'), repoRoot: repo });
  must(project.sourceRoot === path.join(projectRoot, 'talks') && project.output === path.join(projectRoot, 'site'), 'Project directories differ from isolated prototype contract');
  must(deck.slides.length === 4, 'Exactly four checkpoint slides are required');
  must(validateDeck(deck).length === 0, 'Deck validation produced issues');
  return { sourceDir: relative(project.sourceRoot), outputDir: relative(project.output), mainSlideOrder: roles.map(role => role.mainSlide) };
});
check('original-source-and-whole-public-pack', () => {
  must(digest(sourcePath) === '245ebc8ac44ecc39c5e610e3ead72c21e4594d0f419a8eb2ba33fc1e06e443e1', 'The original source pack changed');
  const copy = path.join(talk, 'materials/study-pack.txt');
  must(fs.readFileSync(copy).equals(fs.readFileSync(sourcePath)), 'Public text pack is not byte-identical');
  const readingPack = read(path.join(talk, 'materials/reading-pack.md'));
  const fenced = readingPack.split('````text\n')[1]?.split('\n````')[0];
  must(fenced === source, 'Public reading document does not contain the entire exact source');
  must(notesSource.includes('[팩 전문을 문서로 읽기](./reading-pack.md#팩-전문)') && notesSource.includes('[원래 텍스트 팩 전문](./study-pack.txt)'), 'Public whole-pack paths are missing');
  return { source: relative(sourcePath), sha256: digest(sourcePath), byteIdenticalPublicCopy: relative(copy) };
});
for (const role of roles) {
  check('role-' + role.mainSlide + '-exact-source-and-public-section', () => {
    const sections = role.sections.map(section);
    const joined = sections.map(item => item.text).join('\n');
    for (const quote of role.exact) {
      must(joined.includes(quote), 'Exact excerpt absent from stated original section: ' + quote);
      const content = quote.replace(/^#{1,2} /, '');
      must(notesSource.includes(content), 'Exact excerpt/title absent from public notes: ' + content);
    }
    must(notes.headingIds.includes(role.anchor), 'Actual public heading anchor missing');
    return { role: role.role, logicalSections: sections.map(item => ({name:item.name, startLine:item.startLine})), exactExcerptCount: role.exact.length, publicAnchor: role.anchor, exampleStatus: 'presentation-team-authored explanatory example; not an independent .md file, model run, or operational result' };
  });
  check('role-' + role.mainSlide + '-current-input-and-support', () => {
    const slide = deck.slides[role.index - 1], plan = planSlide(slide);
    must(plan.composition === role.compose && plan.variant === (role.variant || '') && plan.warnings.length === 0, 'Actual planner composition/variant differs or falls back');
    const support = slide.view?.support;
    must(support?.label === role.label && support.href === './materials/notes.md#' + role.anchor, 'Support label or exact public path differs');
    must(support.origin.line > 0 && slideSource.split('\n')[support.origin.line - 1] === '<!-- stage-slide', 'Support is not attached to the actual source control');
    const image = slide.blocks.flatMap(descendants).filter(node => node.tag === 'img');
    must(image.length === 1 && image[0].attrs.src === './assets/' + role.asset && image[0].attrs.alt.includes('발표팀'), 'Actual image path or example alt differs');
    const asset = read(path.join(talk, 'assets', role.asset));
    must(/data-material-kind="explanatory-reconstruction"/.test(asset) && /role="img"/.test(asset) && /<title\b/.test(asset) && /<desc\b/.test(asset), 'Asset is missing reconstruction/accessibility semantics');
    return { prototypeSlide: role.index, mainSlide: role.mainSlide, composition: plan.composition, variant: plan.variant, support: {label:support.label, href:support.href, sourceLine:support.origin.line}, asset: role.asset };
  });
}
check('comparison-concrete-objects-and-limits', () => {
  const asset = read(path.join(talk, 'assets/same-question-comparison.svg'));
  for (const id of ['current-input', 'current-answer-search', 'persistent-connected-documents', 'current-answer-wiki']) must(asset.includes('data-object-id="' + id + '"'), 'Concrete comparison object missing: ' + id);
  must(nodeText(deck.slides[0].heading) === question, 'The shared question is not the actual native heading');
  for (const text of ['기본 검색-생성 예','위키를 유지하는 예','지속되는 연결 문서','LLM Wiki','RAG와 위키','다음 스터디의 첫 시도']) must(svgText(asset).includes(text), 'Visible comparison clue missing: ' + text);
  const copy = normalize(deck.slides[0].blocks.map(nodeText).join(' '));
  must(copy.includes('함께 쓸 수 있으며') && copy.includes('정확도·속도·비용의 우열을 측정하지 않습니다.'), 'Visible essential comparison scope is absent');
});
check('relationships-match-original-three-undirected-edges', () => {
  const asset = read(path.join(talk, 'assets/connected-documents.svg'));
  const old = read(path.join(repo, 'talks/llm-wiki/assets/keynote/connected-understanding.svg'));
  const edges = xml => [...xml.matchAll(/<path\b([^>]*data-edge-id="[^"]+"[^>]*)>/g)].map(match => Object.fromEntries([...match[1].matchAll(/data-(edge-id|from|to)="([^"]+)"/g)].map(entry => [entry[1],entry[2]]))).sort((a,b)=>a['edge-id'].localeCompare(b['edge-id']));
  must(JSON.stringify(edges(asset)) === JSON.stringify(edges(old)) && edges(asset).length === 3, 'Original three relation identities/endpoints changed');
  const ids = [...asset.matchAll(/data-node-id="([^"]+)"/g)].map(match => match[1]).sort();
  must(JSON.stringify(ids) === JSON.stringify(['concept-comparison','current-plan','source-summary']), 'The three areas changed');
  must(!/marker-(?:start|end)|<marker\b/.test(asset), 'Undirected relationship diagram contains arrow markers');
  for (const [id, clues] of [['source-summary',['목적과 맥락','원자료의 입구']],['concept-comparison',['LLM Wiki','RAG와 위키']],['current-plan',['다음 스터디의 첫 시도']]]) {
    const group = new RegExp('<g data-node-id="' + id + '">([\\s\\S]*?)<\\/g>').exec(asset)?.[1] || '';
    for (const clue of clues) must(svgText(group).includes(clue), 'Document clue is not inside its stated area: ' + clue);
  }
  must(normalize(deck.slides[1].blocks.map(nodeText).join(' ')).includes('함께 읽고 고칠 기존 문서의 세 무방향 관계'), 'Together-edit meaning is absent from visible authored body');
  return { originalEdges: edges(old), currentEdges: edges(asset), direction: 'undirected', geometryAndDisplayedScale: 'not observed by this static check' };
});
check('activity-identity-fields-and-one-exact-row', () => {
  const visible = svgText(read(path.join(talk, 'assets/session-plan-row.svg')));
  for (const text of ['입문자와 함께 읽는 15분 LLM Wiki 활동','15분 진행안','활동 시간','할 일','남길 것','6~11분','원자료→개념→비교의 연결 한 개를 따라 읽기','관계를 뒷받침하는 근거 위치']) must(visible.includes(text), 'Visible activity identity/field/row missing: ' + text);
  must(nodeText(deck.slides[2].blocks[1]).includes('설명용 활동안 · 한 행 발췌'), 'Visible excerpt status is missing');
});
check('condition-identity-purpose-question-and-native-ownership', () => {
  const asset = read(path.join(talk, 'assets/condition-note-selection.svg'));
  const visible = svgText(asset);
  for (const text of ['다음 모임의 조건 메모','다음 모임에는 입문자가 함께한다고 가정한다.','본편 뒤 별도 활동은 15분만 배정한다.','발표팀의 설명용 주제 메모 세 개로 시작한다.']) must(visible.includes(text), 'Visible identity/condition missing: ' + text);
  must(asset.includes('data-selected-text="' + purpose + '"'), 'Selected source location does not identify the exact purpose');
  const slide = deck.slides[3], quotes = slide.blocks.filter(node => node.tag === 'blockquote');
  must(quotes.length === 1 && normalize(nodeText(quotes[0])) === purpose, 'Actual native quote is not exactly the source purpose');
  must(descendants(quotes[0]).filter(node => node.tag === 'br').length === 3, 'The four authored purpose rows lost their three native br nodes');
  must(!descendants(quotes[0]).some(node => ['strong','h1','h2'].includes(node.tag)), 'Purpose was promoted to a heading or whole-bold claim');
  must(slide.blocks[1].tag === 'p' && nodeText(slide.blocks[1]) === '15분이니까 ‘읽기부터’?', 'The reconstructed check question is no longer separate native prose');
  must(!section('raw/study-retro.md — 나중에 추가').text.includes('15분이니까'), 'A reconstructed question was falsely treated as source text');
  must(normalize(slide.blocks.map(nodeText).join(' ')).includes('설명용 가상 조건'), 'Visible hypothetical status is missing');
  return { nativeQuoteSourceLine: quotes[0].position.line, authoredHardbreaks: 3, sourceQuestion: false, purposeExact: true, fontAndActualGlyphRows: 'root observation required' };
});
check('all-static-public-links-and-anchors', () => {
  const references = collectReferences(deck).map(ref => ({ context:slidePath, value:ref.owner[ref.key], kind:ref.kind }));
  for (const [filename, material] of materials) for (const ref of material.references) references.push({context:filename,value:ref.value,kind:ref.kind});
  let local = 0;
  for (const ref of references) {
    if (/^(?:https?:|mailto:|\/\/|data:)/i.test(ref.value)) continue;
    const [pathname, anchor = ''] = ref.value.split('#');
    must(!pathname.includes('?'), 'Unexpected query in public prototype path');
    const target = pathname ? path.resolve(path.dirname(ref.context), decodeURIComponent(pathname)) : ref.context;
    must(fs.existsSync(target) && fs.statSync(target).isFile(), 'Missing public target: ' + relative(target));
    if (anchor) {
      if (materials.has(target)) must(materials.get(target).headingIds.includes(decodeURIComponent(anchor)), 'Missing actual material anchor: ' + ref.value);
      else if (target === slidePath) must(/^[1-4]$/.test(anchor), 'Slide target is outside the four-slide checkpoint');
      else throw new Error('Anchor is not a registered public material or slide: ' + ref.value);
    }
    if (ref.kind === 'support') must(materials.has(target) && anchor, 'Support is not an actual registered material section');
    local++;
  }
  return { localReferences: local, registeredPublicMaterials: [...materials.keys()].map(relative), staticOnly: true };
});
check('original-deck-assets-materials-and-history-preserved', () => {
  const baseline = JSON.parse(read(path.join(__dirname, '../starting-state.json'))).hashes;
  const protectedEntries = Object.entries(baseline).filter(([filename]) => filename.startsWith('talks/llm-wiki/') || filename.startsWith('research/llm-wiki-keynote-reset-20261113/main-05/'));
  for (const [filename, expected] of protectedEntries) must(digest(path.join(repo, filename)) === expected, 'Protected original changed: ' + filename);
  return { checkedFiles: protectedEntries.length, commonExtensionExcludedFromThisOriginalPreservationCheck: true };
});
const inputs = [
  'AGENTS.md','DESIGN.md','MARKDOWN-FIRST.md','CONFIG.md','styles.css','blocks.css','blocks.js','deck-model.js','lib/markdown-document.cjs','lib/materials.cjs','lib/project.cjs','app.js','visual.js','visual.css','package-lock.json',
  relative(sourcePath), relative(slidePath), relative(path.join(projectRoot,'ou.config.json')), relative(__filename),
  ...fs.readdirSync(path.join(talk,'assets')).map(name => relative(path.join(talk,'assets',name))),
  ...fs.readdirSync(path.join(talk,'materials')).map(name => relative(path.join(talk,'materials',name)))
].sort();
const failed = checks.filter(item => item.status === 'fail');
const report = {
  format:'devday-four-role-static-source-proof-v1', checkedAt:new Date().toISOString(),
  status:failed.length ? 'fail' : 'pass', checks:checks.length, failed:failed.length,
  visualApproval:false, scope:'Static exact excerpts, source/example status, relation identities, supported input shapes, public paths, and original preservation only. No build, browser, displayed size, geometry, aesthetic or reading approval.',
  roles:roles.map(({exact,...role})=>role), results:checks,
  inputHashes:Object.fromEntries(inputs.map(filename=>[filename,digest(path.join(repo,filename))])),
  unverified:['1920/1280 stage and actual SVG contain scale','native computed font size and actual glyph rows','relation line/area geometry at displayed scale','public support click and reading layout','same-role original comparison and four-slide/context flow','independent visual verdict and user aesthetic acceptance']
};
const outputIndex = process.argv.indexOf('--output');
if (outputIndex >= 0) {
  must(process.argv[outputIndex+1], '--output requires a JSON path');
  fs.writeFileSync(path.resolve(process.argv[outputIndex+1]), JSON.stringify(report,null,2)+'\n');
}
console.log(JSON.stringify({status:report.status,checks:report.checks,failed:report.failed,visualApproval:false,failedChecks:failed},null,2));
process.exitCode = failed.length ? 1 : 0;
