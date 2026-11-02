#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
const { parseDocument, collectReferences } = require('./markdown-document.cjs');
const model = require('../deck-model.js');
const { RUNTIME, TEMPLATE, hash, readRuntime, loadTemplate, runtimeHtml } = require('./runtime.cjs');
const { compareTrees } = require('./generated-files.cjs');
const { parseMaterial, renderMaterial, materialPage } = require('./materials.cjs');

const MARKER = '.stage-generated.json';
const MATERIAL_TEMPLATE = 'templates/material.html';
const MATERIAL_STYLE = 'templates/materials.css';
const posix = value => value.split(path.sep).join('/');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const inside = (parent, child) => child === parent || child.startsWith(parent + path.sep);
const encodePath = value => posix(value).split('/').map(encodeURIComponent).join('/');

function canonical(filename) {
  let current = path.resolve(filename);
  const rest = [];
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) throw new Error('경로를 확인할 수 없습니다: ' + filename);
    rest.unshift(path.basename(current)); current = parent;
  }
  return path.join(fs.realpathSync(current), ...rest);
}

function loadProject(options = {}) {
  const configPath = fs.realpathSync(path.resolve(options.configPath || 'stage.config.json'));
  const projectRoot = path.dirname(configPath);
  const repoRoot = fs.realpathSync(options.repoRoot || path.join(__dirname, '..'));
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!config || Array.isArray(config) || typeof config !== 'object') throw new Error('프로젝트 설정은 JSON 객체여야 합니다.');
  for (const key of Object.keys(config)) if (!['title', 'theme', 'sourceDir', 'outputDir'].includes(key)) throw new Error('지원하지 않는 프로젝트 설정: ' + key);
  for (const key of ['title', 'theme', 'sourceDir', 'outputDir']) if (config[key] !== undefined && (typeof config[key] !== 'string' || !config[key].trim())) throw new Error(key + ': 비어 있지 않은 문자열을 사용하세요.');
  const theme = config.theme || 'stage';
  if (!['stage', 'paper', 'midnight'].includes(theme)) throw new Error('theme: stage/paper/midnight 중 하나를 사용하세요.');
  const sourceRoot = fs.realpathSync(path.resolve(projectRoot, config.sourceDir || 'talks'));
  const output = canonical(path.resolve(projectRoot, config.outputDir || 'presentations'));
  if (!fs.statSync(sourceRoot).isDirectory()) throw new Error('sourceDir는 폴더여야 합니다.');
  if (inside(output, repoRoot) || inside(output, projectRoot) || inside(output, sourceRoot) || inside(sourceRoot, output)) throw new Error('outputDir가 저장소/프로젝트/원고 폴더와 겹칩니다. 별도 출력 폴더를 사용하세요.');
  if (fs.existsSync(output)) {
    if (!fs.statSync(output).isDirectory()) throw new Error('outputDir가 폴더가 아닙니다.');
    let marker;
    try { marker = JSON.parse(fs.readFileSync(path.join(output, MARKER), 'utf8')); } catch (_) { /* Reject below. */ }
    if (!marker || marker.format !== 'stage-project-v1' || typeof marker.config !== 'string' || path.resolve(output, marker.config) !== configPath) throw new Error('outputDir는 이 도구가 생성한 폴더가 아닙니다. 기존 폴더를 덮어쓰지 않습니다.');
  }
  return { configPath, projectRoot, repoRoot, sourceRoot, output, title: config.title || 'STAGE 발표 모음', theme };
}

function walkFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('원고 폴더의 심볼릭 링크는 지원하지 않습니다: ' + filename);
    if (entry.isDirectory()) files.push(...walkFiles(filename));
    else if (entry.isFile()) files.push(filename);
  }
  return files;
}

function slugFor(relativeFolder) {
  if (!relativeFolder) return 'main';
  return posix(relativeFolder).split('/').map(part => part.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '')).join('/');
}

function relativeUrl(fromDirectory, target) {
  return encodePath(path.relative(fromDirectory, target)) || '.';
}

function discoverMaterials(record, project) {
  const directory = path.join(path.dirname(record.source), 'materials');
  record.assets = new Map();
  record.dependencies = new Set();
  record.materials = [];
  if (!fs.existsSync(directory)) return;
  if (!fs.statSync(directory).isDirectory()) throw new Error(record.relativeSource + ': materials는 폴더여야 합니다.');
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.md$/i.test(entry.name)) continue;
    if (!/^[a-z0-9][a-z0-9_-]*\.md$/.test(entry.name)) throw new Error('학습 자료 이름은 소문자 영문·숫자·-·_와 .md를 사용하세요: ' + entry.name);
    const source = fs.realpathSync(path.join(directory, entry.name));
    const relativeSource = posix(path.relative(project.projectRoot, source));
    const material = parseMaterial(fs.readFileSync(source, 'utf8'), { sourcePath: relativeSource });
    const output = path.join(record.slug, 'materials', entry.name.replace(/\.md$/, '.html'));
    record.materials.push({ source, relativeSource, output, material });
    record.dependencies.add(source);
  }
  record.materials.sort((a, b) => a.material.order - b.material.order || a.output.localeCompare(b.output));
}

function rewriteReferences(records) {
  const bySource = new Map();
  for (const record of records) {
    bySource.set(record.source, { record, output: path.join(record.slug, 'read.html') });
    for (const document of record.materials) bySource.set(document.source, { record, ...document });
  }
  function resolve(record, context, value, ref) {
    if (typeof value !== 'string' || !value) return value;
    let referenceLabel = value;
    try { const decoded = decodeURIComponent(value); if (decoded !== value) referenceLabel += '; ' + JSON.stringify(decoded); } catch (_) { /* The URI validation below reports the original value. */ }
    const fail = (message, watchFiles = []) => { const error = new Error(context.relativeSource + ':' + (ref.line || ref.position?.line || 1) + ': ' + message + ' (' + referenceLabel + ')'); error.watchFiles = watchFiles; throw error; };
    if (/^(?:https?:|\/\/)/i.test(value) || (ref.kind === 'link' && /^mailto:/i.test(value)) || (['image', 'poster'].includes(ref.kind) && /^data:image\//i.test(value)) || (ref.kind === 'video' && /^data:video\//i.test(value))) return value;
    if (/^[a-z][a-z\d+.-]*:/i.test(value)) fail('지원하지 않는 참조 URI입니다');
    const match = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(value);
    let pathname, anchor;
    try { pathname = decodeURIComponent(match[1]); anchor = match[3] ? decodeURIComponent(match[3].slice(1)) : ''; } catch (_) { fail('URI 인코딩을 확인하세요'); }
    const suffix = (match[2] || '') + (match[3] || '');
    function validateAnchor(linked) {
      if (!anchor) return;
      if (linked.material) {
        if (!linked.material.headingIds.includes(anchor)) fail('자료 heading anchor가 없습니다: #' + anchor);
      } else if (!/^\d+$/.test(anchor) || (context.material && (Number(anchor) < 1 || Number(anchor) > linked.record.deck.slides.length))) fail('유효한 #장번호를 사용하세요');
    }
    if (!pathname) {
      validateAnchor(context.material ? context : { record });
      return value;
    }
    const target = path.resolve(path.dirname(context.source), pathname);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) fail('참조 파일이 없습니다', [target]);
    const realTarget = fs.realpathSync(target);
    record.dependencies.add(realTarget);
    if (/\.md$/i.test(realTarget)) {
      const linked = bySource.get(realTarget);
      if (!linked || ref.kind !== 'link') fail('등록된 slides.md와 materials/*.md만 연결할 수 있습니다. 임의 Markdown은 자동 복사하지 않습니다');
      validateAnchor(linked);
      return relativeUrl(context.outputDirectory, linked.output) + suffix;
    }
    const bytes = fs.readFileSync(realTarget);
    const basename = path.basename(realTarget).replace(/[^\p{L}\p{N}._-]+/gu, '-');
    const destination = hash(bytes) + '-' + basename;
    record.assets.set(destination, { bytes, source: realTarget });
    return relativeUrl(context.outputDirectory, path.join(record.slug, 'assets', destination)) + suffix;
  }
  for (const record of records) {
    const context = { source: record.source, relativeSource: record.relativeSource, outputDirectory: record.slug };
    for (const ref of collectReferences(record.deck)) ref.owner[ref.key] = resolve(record, context, ref.owner[ref.key], ref);
    for (const document of record.materials) {
      const context = { ...document, outputDirectory: path.dirname(document.output) };
      document.rendered = renderMaterial(document.material, (value, ref) => resolve(record, context, value, ref));
    }
  }
}

function materialNavigation(record, current) {
  const hub = '<li><a href="index.html"' + (!current ? ' class="is-current" aria-current="page"' : '') + '>자료 모음</a></li>';
  return '<ul>' + (record.materials.some(document => path.basename(document.output) === 'index.html') ? '' : hub) + record.materials.map(document => '<li><a href="' + escape(encodePath(path.basename(document.output))) + '"' + (document === current ? ' class="is-current" aria-current="page"' : '') + '>' + escape(document.material.title) + '</a></li>').join('') + '</ul>';
}

function writeMaterials(directory, record, resources) {
  if (!record.materials.length) return;
  fs.mkdirSync(path.join(directory, 'materials'));
  const options = current => ({ navigation: materialNavigation(record, current), deckTitle: record.deck.title, deckUrl: '../index.html', readUrl: '../read.html', indexUrl: 'index.html', stylesheet: relativeUrl(path.join(record.slug, 'materials'), '_runtime/materials.css') + '?v=' + hash(resources.style) });
  for (const document of record.materials) fs.writeFileSync(path.join(directory, 'materials', path.basename(document.output)), materialPage(resources.template, document.material, { ...options(document), ...document.rendered }));
  if (!record.materials.some(document => path.basename(document.output) === 'index.html')) {
    const material = { title: '학습 자료', headingId: '학습-자료', headingHtml: '학습 자료', description: '', sourcePath: '', revision: hash(record.materials.map(document => document.material.revision).join('\n')) };
    fs.writeFileSync(path.join(directory, 'materials/index.html'), materialPage(resources.template, material, { ...options(null), body: '<h2 id="자료-목록">자료 목록</h2>' + materialNavigation(record, null), toc: '<ul><li><a href="#자료-목록">자료 목록</a></li></ul>' }));
  }
}

function presentationHtml(template, record, runtime, content, view) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, () => '<title>' + escape(record.deck.title) + (view === 'read' ? ' — 읽기' : ' — Stage') + '</title>');
  const prefix = relativeUrl(record.slug, '_runtime');
  html = runtimeHtml(html, runtime, prefix, content);
  html = html.replace(/<body\b([^>]*)>/i, (_, attrs) => '<body' + attrs.replace(/\sdata-view=["'][^"']*["']/g, '') + ' data-view="' + view + '">');
  const collection = relativeUrl(record.slug, 'index.html');
  const navigation = record.materials.length
    ? '<nav class="stage-document-links" aria-label="발표 모음과 학습 자료"><a href="' + collection + '">발표 모음</a> · <a href="materials/index.html">학습 자료</a></nav>'
    : '<nav class="stage-document-links" aria-label="발표 모음과 읽기"><a href="' + collection + '">발표 모음</a> · <a href="index.html">발표</a> · <a href="read.html">읽기</a></nav>';
  html = html.replace('<div class="header-actions">', navigation + '<div class="header-actions">');
  const marker = html.indexOf('id="helpDialog"');
  if (marker < 0) throw new Error('발표 template에 helpDialog가 없습니다.');
  const intro = '<p>Markdown 원고를 수정하고 미리보기에서 확인하세요. 이 화면은 읽기 전용이며 원고를 자동 수정하지 않습니다. <a href="' + collection + '">발표 모음</a> · <a href="read.html">청중 읽기</a></p><p>방향키·Space·Page Up/Down으로 이동하고 Home/End로 첫 장과 마지막 장을 엽니다. O는 전체 보기, F는 전체 화면, P는 발표자 화면입니다. Esc로 열린 창을 닫습니다.</p><p>공유하려면 생성한 발표 모음 폴더 전체를 전달하세요. 원본 Markdown은 자동 공유하지 않으며 노트 역할은 아직 지원하지 않습니다.</p>';
  const tail = html.slice(marker).replace(/(<div class="dialog-body">)[\s\S]*?(<\/div>\s*<\/section>\s*<\/div>)/, (_, opening, closing) => opening + intro + closing);
  return html.slice(0, marker) + tail;
}

function collectionHtml(project, records, runtime) {
  const cards = records.map(record => '<li><h2>' + escape(record.deck.title) + '</h2><p>' + record.deck.slides.length + '장</p><a href="' + encodePath(record.slug) + '/index.html">발표</a> · <a href="' + encodePath(record.slug) + '/read.html">읽기</a>' + (record.materials.length ? ' · <a href="' + encodePath(record.slug) + '/materials/index.html">학습 자료</a>' : '') + '</li>').join('\n');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>' + escape(project.title) + '</title><link rel="icon" href="data:,"/><link rel="stylesheet" href="_runtime/styles.css?v=' + hash(runtime['styles.css']) + '"/><style>body.stage-collection{max-width:1120px;margin:0 auto;padding:64px 24px;overflow:auto}h1{font-size:clamp(32px,6vw,64px);letter-spacing:-.04em}ul{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px}li{padding:28px;border:1px solid var(--chrome-border);background:var(--chrome-panel)}h2{font-size:24px;line-height:1.4}p{color:var(--chrome-muted)}a{color:var(--chrome-text);text-underline-offset:.25em}</style></head><body class="stage-collection" data-theme="' + escape(project.theme) + '"><main><p>STAGE · 발표와 읽기</p><h1>' + escape(project.title) + '</h1><ul>' + cards + '</ul></main></body></html>\n';
}

function buildProject(options = {}) {
  const project = loadProject(options);
  const candidates = new Set(walkFiles(project.sourceRoot).filter(file => path.basename(file) === 'slides.md'));
  const deckSources = new Map();
  function isDeckSource(source) {
    if (deckSources.has(source)) return deckSources.get(source);
    const owner = path.join(path.dirname(path.dirname(source)), 'slides.md');
    const material = path.basename(path.dirname(source)) === 'materials' && candidates.has(owner) && isDeckSource(owner);
    deckSources.set(source, !material);
    return !material;
  }
  const sources = [...candidates].filter(isDeckSource);
  if (!sources.length) throw new Error('sourceDir에 slides.md 원고가 없습니다.');
  const records = sources.map(source => {
    const folder = path.relative(project.sourceRoot, path.dirname(source));
    const relativeSource = posix(path.relative(project.projectRoot, source));
    const slug = slugFor(folder);
    if (!slug || slug.split('/').some(part => !part || part.startsWith('_'))) throw new Error('원고 폴더의 출력 이름을 확인하세요: ' + relativeSource);
    const deck = parseDocument(fs.readFileSync(source, 'utf8'), { sourcePath: relativeSource, id: posix(folder) || 'main', theme: project.theme });
    const errors = model.validateDeck(deck).filter(issue => issue.severity === 'error');
    if (errors.length) throw new Error(relativeSource + ': ' + errors.map(issue => issue.path + ': ' + issue.message).join('\n'));
    return { source, relativeSource, slug, deck };
  });
  for (const property of ['slug', 'id']) {
    const seen = new Set();
    for (const record of records) {
      const value = property === 'id' ? record.deck.id : record.slug;
      if (seen.has(value)) throw new Error('중복 ' + property + ': ' + value);
      seen.add(value);
    }
  }
  for (const record of records) discoverMaterials(record, project);
  rewriteReferences(records);
  const runtime = readRuntime(project.repoRoot);
  const template = loadTemplate(project.repoRoot);
  const hasMaterials = records.some(record => record.materials.length);
  const materialResources = hasMaterials ? { template: fs.readFileSync(path.join(project.repoRoot, MATERIAL_TEMPLATE), 'utf8'), style: fs.readFileSync(path.join(project.repoRoot, MATERIAL_STYLE)) } : null;
  const materialDependencies = hasMaterials ? [path.join(project.repoRoot, MATERIAL_TEMPLATE), path.join(project.repoRoot, MATERIAL_STYLE)] : [];
  const manifest = {
    format: 'stage-project-v1', title: project.title, theme: project.theme,
    decks: records.map(record => {
      const entry = {
        id: record.deck.id, source: record.relativeSource, slug: record.slug,
        format: record.deck.format, title: record.deck.title,
        links: { slides: encodePath(record.slug) + '/index.html', read: encodePath(record.slug) + '/read.html' }
      };
      if (record.materials.length) {
        entry.links.materials = encodePath(record.slug) + '/materials/index.html';
        entry.materials = record.materials.map(document => ({
          source: document.relativeSource, title: document.material.title,
          order: document.material.order, revision: document.material.revision, href: encodePath(document.output)
        }));
      }
      return entry;
    })
  };
  if (!options.check) fs.mkdirSync(path.dirname(project.output), { recursive: true });
  const staging = options.check
    ? fs.mkdtempSync(path.join(os.tmpdir(), 'stage-verify-'))
    : fs.mkdtempSync(path.join(path.dirname(project.output), '.' + path.basename(project.output) + '.stage-'));
  let backup;
  let differences = [];
  try {
    fs.mkdirSync(path.join(staging, '_runtime'));
    for (const [file, bytes] of Object.entries(runtime)) fs.writeFileSync(path.join(staging, '_runtime', file), bytes);
    if (hasMaterials) fs.writeFileSync(path.join(staging, '_runtime/materials.css'), materialResources.style);
    for (const record of records) {
      const directory = path.join(staging, record.slug);
      fs.mkdirSync(path.join(directory, 'assets'), { recursive: true });
      for (const [name, asset] of record.assets) fs.writeFileSync(path.join(directory, 'assets', name), asset.bytes);
      const json = JSON.stringify(record.deck, null, 2).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      const content = '/* Generated from Markdown. Edit the source and rebuild. */\nwindow.PRESENTATION = ' + json + ';\n';
      fs.writeFileSync(path.join(directory, 'content.js'), content);
      fs.writeFileSync(path.join(directory, 'index.html'), presentationHtml(template, record, runtime, content, 'present'));
      fs.writeFileSync(path.join(directory, 'read.html'), presentationHtml(template, record, runtime, content, 'read'));
      writeMaterials(directory, record, materialResources);
    }
    fs.writeFileSync(path.join(staging, 'index.html'), collectionHtml(project, records, runtime));
    fs.writeFileSync(path.join(staging, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    fs.writeFileSync(path.join(staging, MARKER), JSON.stringify({ format: 'stage-project-v1', config: posix(path.relative(project.output, project.configPath)) }) + '\n');
    // All references are prepared before publishing. Validate the complete HTML closure.
    for (const filename of walkFiles(staging).filter(file => file.endsWith('.html'))) {
      for (const match of fs.readFileSync(filename, 'utf8').matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
        const value = match[1].replace(/&amp;/g, '&');
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue;
        const target = path.resolve(path.dirname(filename), decodeURIComponent(value.split(/[?#]/)[0]));
        if (!inside(staging, target) || !fs.existsSync(target)) throw new Error('출력 안에 없는 HTML 참조: ' + value);
      }
    }
    if (options.check) {
      differences = compareTrees(staging, project.output);
      fs.rmSync(staging, { recursive: true, force: true });
    } else {
      if (fs.existsSync(project.output)) {
        backup = staging + '.previous';
        fs.renameSync(project.output, backup);
      }
      try { fs.renameSync(staging, project.output); }
      catch (error) { if (backup) fs.renameSync(backup, project.output); throw error; }
      if (backup) fs.rmSync(backup, { recursive: true, force: true });
    }
  } catch (error) {
    fs.rmSync(staging, { recursive: true, force: true });
    throw error;
  }
  return { outputDir: project.output, manifest, decks: records.map(record => record.deck), dependencies: [...new Set([...records.flatMap(record => [...record.dependencies]), ...materialDependencies])], differences };
}

const DEV_SCRIPT = `<script>(function(){var events=new EventSource('/__stage/events');events.addEventListener('built',function(){location.reload()});events.addEventListener('build-error',function(event){var box=document.getElementById('__stage_error');if(!box){box=document.createElement('pre');box.id='__stage_error';box.setAttribute('role','alert');box.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99999;margin:0;padding:20px;background:#551a16;color:white;white-space:pre-wrap;max-height:40vh;overflow:auto;font:14px/1.5 monospace';document.body.append(box)}box.textContent='원고 빌드 오류 — 마지막 정상 화면을 유지합니다.\\n'+JSON.parse(event.data).message})})();</script>`;

function startDev(options = {}) {
  let last = buildProject(options);
  let project = loadProject(options);
  let errorMessage = '';
  let failedDependencies = [];
  const clients = new Set();
  const send = (event, data) => { for (const response of clients) response.write('event: ' + event + '\ndata: ' + JSON.stringify(data) + '\n\n'); };
  function fingerprint() {
    const roots = new Set([project.sourceRoot]);
    // Watch the configured candidate even when its first build failed; serving still uses last good output.
    try {
      const candidate = JSON.parse(fs.readFileSync(project.configPath, 'utf8'));
      if (candidate.sourceDir === undefined || typeof candidate.sourceDir === 'string') roots.add(path.resolve(project.projectRoot, candidate.sourceDir || 'talks'));
    } catch (_) { /* The config file itself remains watched for recovery. */ }
    const sources = [];
    for (const root of roots) {
      if (inside(root, project.output) || inside(project.output, root)) { sources.push(root); continue; }
      try { sources.push(...walkFiles(root)); } catch (_) { sources.push(root); }
    }
    const files = [...sources, project.configPath, path.join(project.repoRoot, TEMPLATE), ...RUNTIME.map(file => path.join(project.repoRoot, file)), ...last.dependencies, ...failedDependencies];
    return files.map(file => { try { const stat = fs.statSync(file); return file + ':' + stat.mtimeMs + ':' + stat.size; } catch (_) { return file + ':missing'; } }).join('\n');
  }
  let previous = fingerprint();
  let queuedAt = 0;
  let busy = false;
  const interval = setInterval(() => {
    let current;
    try { current = fingerprint(); } catch (error) { current = error.message; }
    if (current !== previous) { previous = current; queuedAt = Date.now(); }
    if (!queuedAt || Date.now() - queuedAt < 140 || busy) return;
    busy = true; queuedAt = 0;
    try {
      last = buildProject(options); project = loadProject(options); failedDependencies = []; previous = fingerprint(); errorMessage = '';
      send('built', { decks: last.manifest.decks.length });
      if (!options.quiet) process.stdout.write('STAGE 갱신: ' + last.manifest.decks.length + '개 발표\n');
    } catch (error) {
      errorMessage = error.message; failedDependencies = [...new Set([...failedDependencies, ...(error.watchFiles || []), ...(error.path ? [error.path] : [])])]; previous = fingerprint(); send('build-error', { message: errorMessage });
      if (!options.quiet) process.stderr.write(errorMessage + '\n');
    } finally { busy = false; }
  }, 180);
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8' };
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname === '/__stage/events') {
      response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      response.write(': stage connected\n\n'); clients.add(response);
      if (errorMessage) response.write('event: build-error\ndata: ' + JSON.stringify({ message: errorMessage }) + '\n\n');
      request.on('close', () => clients.delete(response)); return;
    }
    try {
      let filename = path.resolve(project.output, '.' + decodeURIComponent(pathname));
      if (!inside(project.output, filename)) throw new Error('outside output');
      if (fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');
      if (!inside(project.output, fs.realpathSync(filename)) || path.basename(filename) === MARKER) throw new Error('outside output');
      let body = fs.readFileSync(filename);
      const extension = path.extname(filename).toLowerCase();
      if (extension === '.html') body = Buffer.from(body.toString('utf8').replace('</body>', DEV_SCRIPT + '</body>'));
      response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch (_) { response.writeHead(404); response.end('Not found'); }
  });
  return new Promise((resolve, reject) => {
    server.once('error', error => { clearInterval(interval); reject(error); });
    server.listen(options.port ?? 4320, options.host || '127.0.0.1', () => resolve({ server, port: server.address().port, url: 'http://' + (options.host || '127.0.0.1') + ':' + server.address().port, close: () => new Promise(done => { clearInterval(interval); for (const client of clients) client.end(); server.close(done); server.closeIdleConnections(); }) }));
  });
}

module.exports = { buildProject, startDev };
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args.shift();
  const options = {};
  try {
    while (args.length) {
      const option = args.shift();
      if (option === '--config' && args.length) options.configPath = args.shift();
      else if (option === '--port' && args.length) { options.port = Number(args.shift()); if (!Number.isInteger(options.port) || options.port < 0 || options.port > 65535) throw new Error('port: 0~65535 정수를 사용하세요.'); }
      else throw new Error('알 수 없는 옵션: ' + option);
    }
    if (command === 'build') { const result = buildProject(options); process.stdout.write(result.manifest.decks.length + '개 발표 생성: ' + result.outputDir + '\n'); }
    else if (command === 'dev') startDev(options).then(dev => { process.stdout.write('STAGE 미리보기: ' + dev.url + '\n'); for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => dev.close().then(() => process.exit(0))); }).catch(error => { process.stderr.write(error.message + '\n'); process.exitCode = 1; });
    else throw new Error('사용법: node scripts/stage.cjs build|dev [--config path] [--port 4320]');
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
