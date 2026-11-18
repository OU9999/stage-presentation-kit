'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { loadProject } = require('./project.cjs');
const engineRoot = path.resolve(__dirname, '..');
const posix = name => name.split(path.sep).join('/');
const json = data => JSON.stringify(data, null, 2) + '\n';

function talkFiles(slug, title) {
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) throw new Error('title: 비어 있지 않은 문자열을 사용하세요.');
  const heading = title || slug;
  // Frontmatter owns the title: arbitrary punctuation never becomes Markdown syntax.
  const source = fs.readFileSync(path.join(engineRoot, 'templates/talk/slides.md'), 'utf8');
  return { 'slides.md': '---\nid: ' + JSON.stringify(slug) + '\ntitle: ' + JSON.stringify(heading) + '\n---\n\n' + source };
}

function writeTalk(directory, files) {
  fs.mkdirSync(directory); // Exclusive: never overwrite an existing talk.
  fs.mkdirSync(path.join(directory, 'assets'));
  for (const [name, bytes] of Object.entries(files)) fs.writeFileSync(path.join(directory, name), bytes, { flag: 'wx' });
}

function initProject(directory = '.', options = {}) {
  const destination = path.resolve(options.cwd || process.cwd(), directory);
  if (fs.existsSync(destination) && (fs.lstatSync(destination).isSymbolicLink() || !fs.statSync(destination).isDirectory() || fs.readdirSync(destination).length)) {
    throw new Error('새 프로젝트는 비어 있는 폴더에 만드세요. 기존 파일은 덮어쓰지 않습니다: ' + destination);
  }
  if (options.packageSpec !== undefined && (typeof options.packageSpec !== 'string' || !options.packageSpec.trim())) throw new Error('--package: 패키지 경로 또는 설치 spec이 필요합니다.');
  const files = talkFiles('my-talk', options.title || '나의 발표');
  const title = options.title || '나의 발표';
  const packageSpec = options.packageSpec || 'file:' + (posix(path.relative(destination, engineRoot)) || '.');
  const projectName = path.basename(destination).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^[^a-z0-9]+|-+$/g, '') || 'my-presentations';
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, 'ou.config.json'), json({ title, theme: 'stage', sourceDir: 'talks', outputDir: 'presentations' }), { flag: 'wx' });
  fs.writeFileSync(path.join(destination, 'package.json'), json({
    name: projectName, version: '1.0.0', private: true,
    scripts: { dev: 'ou-presentation dev', build: 'ou-presentation build', verify: 'ou-presentation verify', 'new:talk': 'ou-presentation new' },
    engines: { node: '>=20' }, devDependencies: { 'ou-presentation': packageSpec }
  }), { flag: 'wx' });
  fs.writeFileSync(path.join(destination, '.gitignore'), 'node_modules/\npresentations/\n.DS_Store\n', { flag: 'wx' });
  fs.copyFileSync(path.join(engineRoot, 'templates/project-README.md'), path.join(destination, 'README.md'), fs.constants.COPYFILE_EXCL);
  fs.mkdirSync(path.join(destination, 'talks'));
  writeTalk(path.join(destination, 'talks/my-talk'), files);
  return { projectRoot: destination, configPath: path.join(destination, 'ou.config.json'), packageSpec };
}

function newTalk(slug, options = {}) {
  // One stable path segment keeps identity and output names portable on all OSes.
  if (typeof slug !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(slug)) throw new Error('발표 이름은 소문자 영문·숫자로 시작하고 영문·숫자·-·_만 사용하세요.');
  const files = talkFiles(slug, options.title);
  const project = loadProject(options);
  const directory = path.join(project.sourceRoot, slug);
  if (fs.existsSync(directory)) throw new Error('이미 있는 발표 폴더입니다: ' + directory);
  // Also reject a frontmatter id collision in a differently named folder before writing.
  const { parseDocument } = require('./markdown-document.cjs');
  function checkIds(folder) {
    const source = path.join(folder, 'slides.md');
    if (fs.existsSync(source)) {
      const id = posix(path.relative(project.sourceRoot, folder)) || 'main';
      const deck = parseDocument(fs.readFileSync(source, 'utf8'), { id });
      if (deck.id === slug) throw new Error('이미 사용 중인 발표 id입니다: ' + slug);
    }
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error('원고 폴더의 심볼릭 링크는 지원하지 않습니다: ' + entry.name);
      if (entry.isDirectory() && entry.name !== 'materials' && entry.name !== 'assets') checkIds(path.join(folder, entry.name));
    }
  }
  checkIds(project.sourceRoot);
  writeTalk(directory, files);
  return { source: path.join(directory, 'slides.md') };
}

module.exports = { initProject, newTalk };
