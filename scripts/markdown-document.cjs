'use strict';

const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const YAML = require('yaml');
const legacy = require('./markdown-deck.cjs');

const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
const FRONT = new Set(['id', 'title', 'theme', 'speaker', 'date', 'footer']);
const TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'strong', 'em', 's', 'a', 'img', 'br', 'hr']);
const UNSUPPORTED = new Set(['notes', 'appendix', 'role', 'sourceDownload']);
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const text = value => ({ type: 'text', value });
const element = (tag, children, position, attrs) => ({ type: 'element', tag, ...(attrs && Object.keys(attrs).length ? { attrs } : {}), children, ...(position ? { position } : {}) });

function parseDocument(source, options = {}) {
  if (typeof source !== 'string') throw new TypeError('Markdown 원고는 문자열이어야 합니다.');
  const sourcePath = options.sourcePath || 'slides.md';
  const lines = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const fail = (message, line = 1) => { throw new Error(`${sourcePath}:${line}: ${message}`); };
  let start = 0;
  let front = {};
  if (/^---[ \t]*$/.test(lines[0])) {
    let end = 1;
    while (end < lines.length && !/^---[ \t]*$/.test(lines[end])) end += 1;
    if (end === lines.length) fail('frontmatter가 닫히지 않았습니다.');
    const parsed = YAML.parseDocument(lines.slice(1, end).join('\n'), { uniqueKeys: true });
    if (parsed.errors.length) fail('frontmatter: ' + parsed.errors[0].message, 2);
    try { front = parsed.contents === null ? {} : parsed.toJS({ maxAliasCount: 0 }); }
    catch (error) { fail('frontmatter: ' + error.message, 2); }
    if (!front || typeof front !== 'object' || Array.isArray(front)) fail('frontmatter는 key: value 객체여야 합니다.', 2);
    for (const [key, value] of Object.entries(front)) {
      if (!FRONT.has(key)) fail(`frontmatter '${key}'는 이번 Markdown 모드에서 지원하지 않습니다.`, 2);
      if (typeof value !== 'string') fail(`frontmatter '${key}'는 문자열이어야 합니다.`, 2);
      if (['id', 'title', 'theme'].includes(key) && !value.trim()) fail(`frontmatter '${key}'는 비울 수 없습니다.`, 2);
    }
    start = end + 1;
  }

  // Token maps keep delimiters inside fences, indented code and nested lists/quotes literal.
  const protectedLines = new Set();
  const wholeTokens = md.parse(lines.slice(start).join('\n'), {});
  for (const token of wholeTokens) {
    if (token.map && (token.type === 'fence' || token.type === 'code_block' || token.level > 0)) {
      for (let i = token.map[0] + start; i < token.map[1] + start; i += 1) protectedLines.add(i);
    }
  }
  let inComment = false;
  for (let i = start; i < lines.length; i += 1) {
    if (protectedLines.has(i) && !inComment) continue;
    if (lines[i].includes('<!--')) inComment = true;
    if (inComment) protectedLines.add(i);
    if (inComment && lines[i].includes('-->')) inComment = false;
  }
  if (inComment) fail('HTML 주석이 닫히지 않았습니다.', lines.length);
  const segments = [];
  let segmentStart = start;
  for (let i = start; i < lines.length; i += 1) {
    if (!protectedLines.has(i) && /^ {0,3}---\s*$/.test(lines[i])) {
      if (!lines.slice(segmentStart, i).some(line => line.trim())) fail('빈 슬라이드입니다.', i + 1);
      segments.push({ start: segmentStart, end: i }); segmentStart = i + 1;
    }
  }
  if (lines.slice(segmentStart).some(line => line.trim())) segments.push({ start: segmentStart, end: lines.length });
  else if (segments.length) fail('마지막 구분선 뒤에 빈 슬라이드가 있습니다.', lines.length);
  if (!segments.length) fail('한 장 이상의 슬라이드를 작성하세요.');

  const slides = segments.map(segment => {
    let first = segment.start;
    let last = segment.end;
    while (first < last && !lines[first].trim()) first += 1;
    while (last > first && !lines[last - 1].trim()) last -= 1;
    const origin = { line: first + 1, endLine: last };
    const body = lines.slice(segment.start, segment.end).join('\n');
    const tokens = md.parse(body, {});
    const fences = tokens.filter(token => token.type === 'fence');
    const codeLines = new Set();
    for (const token of tokens) if (token.map && ['fence', 'code_block'].includes(token.type)) {
      for (let i = token.map[0]; i < token.map[1]; i += 1) codeLines.add(i);
    }
    const metadata = lines.slice(segment.start, segment.end).some((line, index) => !codeLines.has(index) && /^\s*<!--\s*stage\s*$/.test(line));
    const stageTokens = fences.filter(token => token.level === 0 && token.info.trim() === 'stage');
    const stageFence = stageTokens.length > 0;
    if (stageTokens.some(token => token.markup !== '```')) fail('stage JSON은 세 백틱의 ```stage fence만 지원합니다.', origin.line);
    if (metadata || stageFence) {
      let converted;
      try {
        const adapted = legacy.parseMarkdown(body);
        if (adapted.slides.length !== 1) fail('명시 layout 안의 중첩 구분선은 지원하지 않습니다. 장을 명확히 분리하세요.', origin.line);
        converted = adapted.slides[0];
      }
      catch (error) { fail('명시 layout: ' + error.message, origin.line); }
      if (!stageFence && !/\blayout\s*:/.test(body)) fail('stage metadata는 명시 layout과 함께 사용하세요.', origin.line);
      for (const key of UNSUPPORTED) if (own(converted, key)) fail(`'${key}'는 이번 Markdown 모드에서 지원하지 않습니다. 발표자 노트를 공개 원고에 넣지 마세요.`, origin.line);
      return { ...converted, origin };
    }
    const position = (token, fallback) => token.map ? { line: segment.start + token.map[0] + 1, endLine: segment.start + token.map[1] } : fallback;
    function attributes(token) {
      const result = {};
      for (const [key, value] of token.attrs || []) {
        if (key === 'style' && /^(?:text-align:)(left|right|center)$/.test(value)) result.align = value.slice(11);
        else if (['href', 'src', 'alt', 'title', 'start'].includes(key)) result[key] = value;
        else fail(`지원하지 않는 Markdown 속성 '${key}'입니다.`, origin.line);
      }
      return result;
    }
    function convert(tokenList, inherited) {
      const nodes = [];
      const stack = [{ children: nodes, position: inherited }];
      for (const token of tokenList) {
        const parent = stack[stack.length - 1];
        const pos = position(token, parent.position);
        if (token.type === 'inline') { parent.children.push(...convert(token.children || [], pos)); continue; }
        if (token.type === 'text') { parent.children.push(text(token.content)); continue; }
        if (token.type === 'softbreak') { parent.children.push(text('\n')); continue; }
        if (token.type === 'hardbreak') { parent.children.push(element('br', [], pos)); continue; }
        if (token.type === 'code_inline') { parent.children.push(element('code', [text(token.content)], pos)); continue; }
        if (token.type === 'fence' || token.type === 'code_block') {
          const info = token.info.trim().split(/\s+/)[0];
          if (info === 'stage') fail('stage JSON은 최상위 명시 layout에서만 사용하세요.', pos.line);
          if (info && !/^[A-Za-z0-9_+-]+$/.test(info)) fail('코드 언어 이름은 영문·숫자·_·+·-만 지원합니다.', pos.line);
          parent.children.push(element('pre', [element('code', [text(token.content)], pos, info ? { class: 'language-' + info } : undefined)], pos));
          continue;
        }
        if (token.type === 'image') {
          const attrs = attributes(token); attrs.alt = plain(convert(token.children || [ { type: 'text', content: token.content } ], pos));
          parent.children.push(element('img', [], pos, attrs)); continue;
        }
        if (token.nesting === -1) {
          if (stack.length === 1 || parent.tag !== token.tag) fail(`지원하지 않는 Markdown 닫기 '${token.type}'입니다.`, pos.line);
          stack.pop(); continue;
        }
        if (!TAGS.has(token.tag)) fail(`지원하지 않는 Markdown 노드 '${token.type}'입니다.`, pos.line);
        const node = element(token.tag, [], pos, attributes(token));
        parent.children.push(node);
        if (token.nesting === 1) stack.push(node);
      }
      if (stack.length !== 1) fail('Markdown 노드 구조가 닫히지 않았습니다.', origin.line);
      return nodes;
    }
    const blocks = convert(tokens, origin);
    let heading;
    if (blocks[0] && blocks[0].type === 'element' && blocks[0].tag === 'h1') heading = blocks.shift();
    return { layout: 'blocks', ...(heading ? { title: plain([heading]), heading } : {}), blocks, origin };
  });
  const firstTitle = slides[0].title || slides[0].label || slides[0].quote;
  return {
    format: 'markdown-v1', document: { sourcePath, revision: crypto.createHash('sha256').update(source).digest('hex') },
    id: options.id || path.basename(sourcePath, path.extname(sourcePath)),
    title: Array.isArray(firstTitle) ? firstTitle.join(' ') : firstTitle || '발표 자료',
    theme: options.theme || 'stage', ...front, slides
  };
}

function plain(nodes) {
  return nodes.map(node => node.type === 'text' ? node.value : node.tag === 'img' ? node.attrs?.alt || '' : node.tag === 'br' ? '\n' : plain(node.children || [])).join('');
}

function collectReferences(deck) {
  const refs = [];
  function add(owner, key, kind, position) {
    if (typeof owner[key] === 'string' && owner[key]) refs.push({ owner, key, kind, position });
  }
  function visit(node, fallback) {
    if (!node || node.type !== 'element') return;
    const position = node.position || fallback;
    if (node.attrs) {
      if (node.tag === 'img') add(node.attrs, 'src', 'image', position);
      if (node.tag === 'a') add(node.attrs, 'href', 'link', position);
    }
    for (const child of node.children || []) visit(child, position);
  }
  for (const slide of deck.slides || []) {
    if (slide.layout === 'blocks') {
      if (slide.heading) visit(slide.heading, slide.origin);
      for (const node of slide.blocks || []) visit(node, slide.origin);
      continue;
    }
    for (const key of ['src', 'video', 'poster', 'url']) add(slide, key, key === 'src' ? 'image' : key === 'url' ? 'link' : key, slide.origin);
    for (const item of slide.items || []) {
      if (!item || typeof item !== 'object') continue;
      if (slide.layout === 'bento' && item.type === 'artifact') {
        if (item.kind === 'cover') add(item, 'src', 'image', slide.origin);
        if (item.kind === 'task') for (const tool of item.tools || []) if (tool && typeof tool === 'object') add(tool, 'src', 'image', slide.origin);
      } else for (const key of ['src', 'video', 'poster']) add(item, key, key === 'src' ? 'image' : key, slide.origin);
    }
  }
  return refs;
}

module.exports = { parseDocument, collectReferences };
