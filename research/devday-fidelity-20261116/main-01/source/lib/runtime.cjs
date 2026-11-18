'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const RUNTIME = Object.freeze(['styles.css', 'visual.css', 'blocks.css', 'deck-model.js', 'visual.js', 'blocks.js', 'app.js']);
const TEMPLATE = 'templates/presentation.html';
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const readRuntime = root => Object.fromEntries(RUNTIME.map(file => [file, fs.readFileSync(path.join(root, file))]));
const loadTemplate = root => fs.readFileSync(path.join(root, TEMPLATE), 'utf8');

function runtimeHtml(template, runtime, prefix, content) {
  const counts = Object.fromEntries([...RUNTIME, 'content.js'].map(file => [file, 0]));
  const names = RUNTIME.map(file => file.replace('.', '\\.')).join('|');
  const join = file => prefix && prefix !== '.' ? prefix.replace(/\/$/, '') + '/' + file : file;
  let html = template.replace(new RegExp('\\b(href|src)=("|\')(?:\\./)?(' + names + ')(?:[?#][^"\']*)?\\2', 'g'), (_, attr, quote, file) => {
    counts[file] += 1;
    return attr + '=' + quote + escape(join(file)) + '?v=' + hash(runtime[file]) + quote;
  });
  html = html.replace(/\bsrc=("|')(?:\.\/)?content\.js(?:[?#][^"']*)?\1/g, (_, quote) => {
    counts['content.js'] += 1;
    return 'src=' + quote + 'content.js?v=' + hash(content) + quote;
  });
  const invalid = Object.keys(counts).filter(file => counts[file] !== 1);
  if (invalid.length) throw new Error('발표 template의 runtime 참조는 각각 한 개여야 합니다: ' + invalid.join(', '));
  return html;
}

module.exports = { RUNTIME, TEMPLATE, hash, readRuntime, loadTemplate, runtimeHtml };
