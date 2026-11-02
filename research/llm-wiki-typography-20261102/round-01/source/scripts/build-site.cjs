#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { readRuntime, loadTemplate, runtimeHtml } = require('./runtime.cjs');
const { compareFiles, writeFiles } = require('./generated-files.cjs');
const { readDirectDeck } = require('./direct-deck.cjs');
const { collectReferences } = require('./markdown-document.cjs');
const { buildExamples } = require('./build-examples.cjs');
const { buildProject } = require('./stage.cjs');

function directReferences(directory, deck) {
  for (const ref of collectReferences(deck)) {
    const value = ref.owner[ref.key];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    const filename = path.resolve(directory, decodeURIComponent(value.split(/[?#]/)[0]));
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) throw new Error('참조 파일이 없습니다: ' + value);
  }
}

function runSite(repoRoot, check) {
  const template = loadTemplate(repoRoot);
  const runtime = readRuntime(repoRoot);
  const root = readDirectDeck(repoRoot);
  directReferences(repoRoot, root.deck);
  const expectedRoot = [[path.join(repoRoot, 'index.html'), runtimeHtml(template, runtime, '', root.content)]];
  const rootDifferences = check ? compareFiles(expectedRoot) : [];
  const examples = buildExamples({ repoRoot, check });
  for (const example of examples.filter(item => ['visual-story', 'visual-starter', 'text-layout'].includes(item.slug))) directReferences(path.dirname(example.files.content), example.deck);
  const projects = [
    { name: 'presentations', configPath: path.join(repoRoot, 'stage.config.json') },
    { name: 'markdown-starter', configPath: path.join(repoRoot, 'starters/markdown/stage.config.json') }
  ].map(project => ({ name: project.name, ...buildProject({ repoRoot, configPath: project.configPath, check }) }));
  if (!check) writeFiles(expectedRoot);
  const differences = [...rootDifferences, ...examples.flatMap(item => item.differences), ...projects.flatMap(item => item.differences)]
    .sort((a, b) => a.file.localeCompare(b.file));
  return { repoRoot, examples: examples.length, projects: projects.map(item => ({ name: item.name, decks: item.manifest.decks.length })), differences };
}

function buildSite(options = {}) {
  const repoRoot = fs.realpathSync(path.resolve(options.repoRoot || path.join(__dirname, '..')));
  // Parse and validate every input before updating the live generated files.
  const checked = runSite(repoRoot, true);
  if (options.check) return checked;
  runSite(repoRoot, false);
  const verified = runSite(repoRoot, true);
  if (verified.differences.length) throw new Error('빌드 중 원본이 변경됐습니다. build:site를 다시 실행하세요.');
  return verified;
}

module.exports = { buildSite };
if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 1 || !['build', 'verify'].includes(args[0])) throw new Error('사용법: node scripts/build-site.cjs build|verify');
    const check = args[0] === 'verify';
    const result = buildSite({ check });
    if (result.differences.length) {
      process.stderr.write('생성물이 원본과 다릅니다. npm run build:site를 실행하세요.\n');
      for (const item of result.differences) process.stderr.write('[' + item.reason + '] ' + path.relative(result.repoRoot, item.file) + '\n');
      process.exitCode = 1;
    } else process.stdout.write((check ? '전체 사이트 검증 완료' : '전체 사이트 생성·검증 완료') + ': 기존 예제 ' + result.examples + '개 · ' + result.projects.map(item => item.name + ' ' + item.decks + '개 발표').join(' · ') + '\n');
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
