'use strict';

const MarkdownIt = require('markdown-it');
const YAML = require('yaml');
const crypto = require('node:crypto');
const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const inlineText = tokens => (tokens || []).map(t => t.type === 'image' ? t.content : t.children ? inlineText(t.children) : ['text', 'code_inline', 'softbreak', 'hardbreak'].includes(t.type) ? t.content || ' ' : '').join('');
const slugify = value => value.normalize('NFKC').toLowerCase().trim().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '') || 'section';

md.renderer.rules.table_open = (tokens, i, options, env, renderer) => '<div class="material-table-scroll" tabindex="0" role="region" aria-label="표 가로 스크롤">' + renderer.renderToken(tokens, i, options);
md.renderer.rules.table_close = (tokens, i, options, env, renderer) => renderer.renderToken(tokens, i, options) + '</div>\n';
for (const rule of ['fence', 'code_block']) {
  const renderCode = md.renderer.rules[rule];
  md.renderer.rules[rule] = (...args) => renderCode(...args).replace('<pre>', '<pre tabindex="0" role="region" aria-label="코드 가로 스크롤">');
}

function parseMaterial(source, options = {}) {
  const sourcePath = options.sourcePath || 'materials/document.md';
  const fail = (message, line = 1) => { throw new Error(sourcePath + ':' + line + ': ' + message); };
  if (typeof source !== 'string') fail('학습 자료는 Markdown 문자열이어야 합니다.');
  const lines = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  let start = 0, front = {};
  if (/^---\s*$/.test(lines[0])) {
    const end = lines.findIndex((line, index) => index > 0 && /^---\s*$/.test(line));
    if (end < 0) fail('자료 frontmatter가 닫히지 않았습니다.');
    const parsed = YAML.parseDocument(lines.slice(1, end).join('\n'), { uniqueKeys: true });
    if (parsed.errors.length) fail('자료 frontmatter: ' + parsed.errors[0].message, 2);
    try { front = parsed.contents === null ? {} : parsed.toJS({ maxAliasCount: 0 }); } catch (error) { fail(error.message, 2); }
    if (!front || typeof front !== 'object' || Array.isArray(front)) fail('자료 frontmatter는 객체여야 합니다.', 2);
    for (const [key, value] of Object.entries(front)) {
      if (!['title', 'description', 'order'].includes(key)) fail('지원하지 않는 자료 설정: ' + key, 2);
      if (key === 'order' ? !Number.isSafeInteger(value) || value < 0 : typeof value !== 'string' || (key === 'title' && !value.trim())) fail('자료 설정 값을 확인하세요: ' + key, 2);
    }
    start = end + 1;
  }
  const tokens = md.parse(lines.slice(start).join('\n'), {});
  const h1s = tokens.filter(t => t.type === 'heading_open' && t.tag === 'h1');
  if (h1s.length !== 1 || tokens[0]?.type !== 'heading_open' || tokens[0]?.tag !== 'h1') fail('자료는 첫 내용에 H1 제목 한 개를 사용하세요.', start + 1);
  const used = new Set(), headings = [], headingIds = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open') continue;
    const label = inlineText(tokens[i + 1].children), base = slugify(label);
    let id = base, suffix = 2;
    while (used.has(id)) id = base + '-' + suffix++;
    used.add(id); tokens[i].attrSet('id', id); headingIds.push(id);
    if (['h2', 'h3'].includes(tokens[i].tag)) headings.push({ id, label, level: Number(tokens[i].tag.slice(1)) });
  }
  const headingId = tokens[0].attrGet('id');
  const headingHtml = md.renderer.render([tokens[1]], md.options, {});
  const title = front.title || inlineText(tokens[1].children);
  const references = [];
  function visit(token, inheritedLine) {
    const line = token.map ? token.map[0] + start + 1 : inheritedLine;
    if (token.type === 'link_open' || token.type === 'image') {
      const attribute = token.type === 'image' ? 'src' : 'href';
      references.push({ token, attribute, value: token.attrGet(attribute), kind: token.type === 'image' ? 'image' : 'link', line });
    }
    for (const child of token.children || []) visit(child, line);
  }
  for (const token of tokens) visit(token, start + 1);
  return { title, headingHtml, headingInline: tokens[1], headingId, description: front.description || '', order: front.order || 0, sourcePath, revision: crypto.createHash('sha256').update(source).digest('hex'), tokens: tokens.slice(3), headings, headingIds, references };
}

function renderMaterial(material, resolveReference) {
  if (resolveReference) for (const ref of material.references) ref.token.attrSet(ref.attribute, resolveReference(ref.value, ref));
  material.headingHtml = md.renderer.render([material.headingInline], md.options, {});
  const body = md.renderer.render(material.tokens, md.options, {});
  const toc = material.headings.length ? '<ul>' + material.headings.map(h => '<li class="toc-level-' + h.level + '"><a href="#' + escape(h.id) + '">' + escape(h.label) + '</a></li>').join('') + '</ul>' : '<p>이 문서의 자료 목록을 확인하세요.</p>';
  return { body, toc };
}

function materialPage(template, material, options) {
  const text = { TITLE: material.title, HEADING_ID: material.headingId, DESCRIPTION: material.description, DECK_TITLE: options.deckTitle, DECK_URL: options.deckUrl, READ_URL: options.readUrl, INDEX_URL: options.indexUrl, STYLESHEET: options.stylesheet, SOURCE_PATH: material.sourcePath, REVISION: material.revision };
  const html = { HEADING: material.headingHtml, CONTENT: options.body, TOC: options.toc, MATERIAL_NAV: options.navigation, INTRO_DESCRIPTION: material.description ? '<p>' + escape(material.description) + '</p>' : '' };
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => key in html ? html[key] : key in text ? escape(text[key]) : (() => { throw new Error('알 수 없는 자료 template 자리: ' + key); })());
}

module.exports = { parseMaterial, renderMaterial, materialPage, slugify, escape };
