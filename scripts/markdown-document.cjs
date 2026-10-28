'use strict';

const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const YAML = require('yaml');
const legacy = require('./markdown-deck.cjs');
const model = require('../deck-model.js');

const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
const FRONT = new Set(['id', 'title', 'theme', 'speaker', 'date', 'footer']);
const TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'strong', 'em', 's', 'a', 'img', 'br', 'hr']);
const UNSUPPORTED = new Set(['notes', 'appendix', 'role', 'sourceDownload']);
const COMPOSITIONS = ['auto', 'message', 'split', 'media', 'gallery', 'mosaic', 'editorial', 'quote', 'closing', 'document', 'bento', 'icon-wall'];
const TONES = ['orange', 'purple', 'blue', 'green', 'yellow', 'neutral'];
const VARIANTS = ['portraits', 'strip', 'staggered', 'balanced', 'seoul', 'recap'];
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
    const rawLines = lines.slice(segment.start, segment.end);
    const controls = extractControls(rawLines, segment.start, fail);
    const body = controls.lines.join('\n');
    const tokens = md.parse(body, {});
    const fences = tokens.filter(token => token.type === 'fence');
    const codeLines = new Set();
    for (const token of tokens) if (token.map && ['fence', 'code_block'].includes(token.type)) {
      for (let i = token.map[0]; i < token.map[1]; i += 1) codeLines.add(i);
    }
    const metadata = controls.lines.some((line, index) => !codeLines.has(index) && /^\s*<!--\s*stage\s*$/.test(line));
    const stageTokens = fences.filter(token => token.level === 0 && token.info.trim() === 'stage');
    const stageFence = stageTokens.length > 0;
    if (stageTokens.some(token => token.markup !== '```')) fail('stage JSON은 세 백틱의 ```stage fence만 지원합니다.', origin.line);
    if (metadata || stageFence) {
      if (controls.slide || controls.groups.length) fail('stage-slide/group은 기존 stage layout/JSON과 한 장에서 함께 사용할 수 없습니다.', origin.line);
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
    const groupBindings = controls.groups.map(control => {
      const groupStart = blocks.findIndex(node => node.type === 'element' && node.tag === 'h2' && node.position.line === control.headingLine);
      if (groupStart < 0) fail('stage-group은 최상위 H2 바로 앞에 두세요.', control.origin.line);
      let groupEnd = groupStart + 1;
      while (groupEnd < blocks.length && !(blocks[groupEnd].type === 'element' && blocks[groupEnd].tag === 'h2')) groupEnd += 1;
      return { start: groupStart, end: groupEnd, ...control.values, origin: control.origin };
    });
    const slideSettings = controls.slide ? controls.slide.values : {};
    const { tone, ...view } = slideSettings;
    if (groupBindings.length) view.groups = groupBindings;
    return { layout: 'blocks', ...(heading ? { title: plain([heading]), heading } : {}), blocks, origin,
      ...(tone !== undefined ? { tone } : {}), ...(Object.keys(view).length ? { view } : {}) };
  });
  const firstTitle = slides[0].title || slides[0].label || slides[0].quote;
  return {
    format: 'markdown-v1', document: { sourcePath, revision: crypto.createHash('sha256').update(source).digest('hex') },
    id: options.id || path.basename(sourcePath, path.extname(sourcePath)),
    title: Array.isArray(firstTitle) ? firstTitle.join(' ') : firstTitle || '발표 자료',
    theme: options.theme || 'stage', ...front, slides
  };
}

// Controls are metadata, not authored semantic nodes. Blank masking keeps source offsets.
function extractControls(sourceLines, offset, fail) {
  const lines = sourceLines.slice();
  const protectedCode = new Set();
  const inlineRanges = [];
  const lineStarts = [];
  let cursor = 0;
  for (const line of sourceLines) { lineStarts.push(cursor); cursor += line.length + 1; }
  const tokens = md.parse(sourceLines.join('\n'), {});
  for (const token of tokens) {
    if (!token.map) continue;
    if (['fence', 'code_block'].includes(token.type)) {
      for (let line = token.map[0]; line < token.map[1]; line += 1) protectedCode.add(line);
    } else if (token.type === 'inline' && (token.children || []).some(child => child.type === 'code_inline')) {
      // markdown-it bounds inline code to its containing paragraph/heading.
      const raw = sourceLines.slice(token.map[0], token.map[1]).join('\n');
      const runs = [...raw.matchAll(/`+/g)];
      for (let i = 0; i < runs.length; i += 1) {
        const opening = runs[i];
        const prefix = raw.slice(0, opening.index);
        const slashes = /\\*$/.exec(prefix)[0].length;
        if (slashes % 2) continue;
        let closing = i + 1;
        while (closing < runs.length && runs[closing][0].length !== opening[0].length) closing += 1;
        if (closing === runs.length) continue;
        inlineRanges.push({ start: lineStarts[token.map[0]] + opening.index, end: lineStarts[token.map[0]] + runs[closing].index + runs[closing][0].length });
        i = closing;
      }
    }
  }
  const inCode = (line, column) => protectedCode.has(line) || inlineRanges.some(range => range.start <= lineStarts[line] + column && range.end > lineStarts[line] + column);
  let ordinaryComment = false;
  let slide;
  const groups = [];
  for (let index = 0; index < sourceLines.length; index += 1) {
    const line = sourceLines[index];
    let commentScan = 0;
    if (ordinaryComment) {
      const end = line.indexOf('-->');
      if (end < 0) continue;
      ordinaryComment = false; commentScan = end + 3;
    } else if (inCode(index, 0)) continue;
    const opening = /^<!-- stage-(slide|group)$/.exec(line);
    if (opening) {
      let end = index + 1;
      while (end < sourceLines.length && sourceLines[end].trim() !== '-->') end += 1;
      if (end === sourceLines.length) fail('stage-' + opening[1] + ' 제어 주석이 닫히지 않았습니다.', offset + index + 1);
      const values = readControl(sourceLines.slice(index + 1, end).join('\n'), opening[1], offset + index + 1, fail);
      const control = { values, origin: { line: offset + index + 1, endLine: offset + end + 1 } };
      if (opening[1] === 'slide') {
        if (slide) fail('stage-slide은 한 장에 한 번만 지정하세요.', control.origin.line);
        if (sourceLines.slice(0, index).some(value => value.trim())) fail('stage-slide은 장의 첫 내용 앞에 두세요.', control.origin.line);
        slide = control;
      } else {
        let next = end + 1;
        while (next < sourceLines.length && !sourceLines[next].trim()) next += 1;
        if (next === sourceLines.length || !/^ {0,3}##(?:[ \t]+|$)/.test(sourceLines[next])) fail('stage-group은 H2 바로 앞에 두세요. 사이에는 빈 줄만 허용합니다.', control.origin.line);
        control.headingLine = offset + next + 1;
        groups.push(control);
      }
      for (let removed = index; removed <= end; removed += 1) lines[removed] = '';
      index = end;
      continue;
    }
    if (/^\s*<!--\s*stage-/.test(line)) fail('알 수 없거나 잘못된 stage 제어 구문입니다. stage-slide/group을 독립 여러 줄 주석으로 작성하세요.', offset + index + 1);
    for (;;) {
      const start = line.indexOf('<!--', commentScan);
      if (start < 0) break;
      if (inCode(index, start)) { commentScan = start + 4; continue; }
      const end = line.indexOf('-->', start + 4);
      if (end < 0) { ordinaryComment = true; break; }
      commentScan = end + 3;
    }
  }
  if (groups.filter(group => group.values.primary === true).length > 1) fail('primary: true인 stage-group은 한 장에 하나만 지정하세요.', groups.find(group => group.values.primary).origin.line);
  return { lines, slide, groups };
}

function readControl(source, kind, line, fail) {
  const document = YAML.parseDocument(source, { uniqueKeys: true });
  if (document.errors.length) fail('stage-' + kind + ': ' + document.errors[0].message, line);
  let values;
  try { values = document.contents === null ? {} : document.toJS({ maxAliasCount: 0 }); }
  catch (error) { fail('stage-' + kind + ': ' + error.message, line); }
  if (!values || typeof values !== 'object' || Array.isArray(values)) fail('stage-' + kind + '은 YAML key: value 객체여야 합니다.', line);
  const allowed = kind === 'slide' ? ['compose', 'tone', 'fit', 'focus', 'variant', 'icons'] : ['tone', 'primary', 'fit', 'focus', 'icon'];
  for (const [key, value] of Object.entries(values)) {
    if (!allowed.includes(key)) fail('stage-' + kind + "에서 지원하지 않는 키 '" + key + "'입니다.", line);
    if (key === 'compose' && !COMPOSITIONS.includes(value)) fail('compose: ' + COMPOSITIONS.join('/') + ' 중 하나를 사용하세요.', line);
    if (key === 'tone' && !TONES.includes(value)) fail('tone: ' + TONES.join('/') + ' 중 하나를 사용하세요.', line);
    if (key === 'fit' && !['contain', 'cover'].includes(value)) fail('fit: contain/cover 중 하나를 사용하세요.', line);
    if (key === 'variant' && !VARIANTS.includes(value)) fail('variant: ' + VARIANTS.join('/') + ' 중 하나를 사용하세요.', line);
    if (key === 'icon') {
      const normalized = model.normalizeIcon(value);
      if (!normalized) fail('icon: 기존 아이콘 이름 ' + model.iconNames.join('/') + ' 중 하나를 사용하세요.', line);
      values.icon = normalized;
    }
    if (key === 'icons') {
      if (!Array.isArray(value)) fail('icons는 아이콘 이름 또는 {icon, tone}의 배열이어야 합니다.', line);
      values.icons = value.map((item, index) => {
        if (typeof item === 'string') {
          const normalized = model.normalizeIcon(item);
          if (!normalized) fail('icons.' + index + ': 지원하지 않는 아이콘 이름입니다.', line);
          return normalized;
        }
        if (!item || typeof item !== 'object' || Array.isArray(item)) fail('icons.' + index + ': 아이콘 이름 또는 {icon, tone} 객체를 사용하세요.', line);
        for (const entry of Object.keys(item)) if (!['icon', 'tone'].includes(entry)) fail('icons.' + index + ': 지원하지 않는 키 ' + entry + '입니다.', line);
        const normalized = model.normalizeIcon(item.icon);
        if (!normalized) fail('icons.' + index + '.icon: 지원하는 기존 아이콘 이름이 필요합니다.', line);
        if (item.tone !== undefined && !TONES.includes(item.tone)) fail('icons.' + index + '.tone: 지원하는 의미색을 사용하세요.', line);
        return { icon: normalized, ...(item.tone !== undefined ? { tone: item.tone } : {}) };
      });
    }

    if (key === 'primary' && typeof value !== 'boolean') fail('primary는 true/false여야 합니다.', line);
    if (key === 'focus') {
      const normalizeFocus = position => {
        const match = typeof position === 'string' && /^(\d+(?:\.\d+)?)%[ \t]+(\d+(?:\.\d+)?)%$/.exec(position.trim());
        if (!match || Number(match[1]) > 100 || Number(match[2]) > 100) fail("focus는 '0% 0%'부터 '100% 100%' 사이의 두 위치여야 합니다.", line);
        return match[1] + '% ' + match[2] + '%';
      };
      if (Array.isArray(value)) {
        if (kind !== 'slide' || value.length < 1 || value.length > 6) fail('장 focus 배열은 gallery/mosaic의 원순서 사진1~6개 위치만 지원합니다. 그룹 focus는 문자열을 사용하세요.', line);
        values.focus = value.map(normalizeFocus);
      } else values.focus = normalizeFocus(value);
    }
  }
  return values;
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
