#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { fileURLToPath } = require("node:url");
const model = require("../deck-model.js");

const FRONT_KEYS = new Set(["id", "title", "theme", "speaker", "date", "footer"]);
const COMMON = ["id", "layout", "eyebrow", "notes", "theme", "tone", "surface", "align", "quiet", "highlight"];
const MEDIA = ["src", "video", "poster", "alt", "fit", "focalPoint", "zoom", "caption"];
const FIELDS = {
  cover: ["title", "subtitle"], statement: ["title", "subtitle", "support"],
  section: ["number", "title", "subtitle"], closing: ["title", "takeaway", "action", "url"],
  compare: ["title", "left", "right"], metric: ["value", "unit", "label", "support", "source"],
  chart: ["title", "subtitle", "chart", "source"], image: ["title", ...MEDIA],
  media: MEDIA, demo: ["title", "steps", "url", ...MEDIA], quote: ["quote", "attribution", "support"],
  steps: ["title", "steps"], gallery: ["title", "subtitle", "items", "variant", "source"],
  mosaic: ["title", "subtitle", "items", "source"], results: ["title", "subtitle", "items", "source"],
  categories: ["title", "subtitle", "items", "source"]
};
const PARAGRAPH = {
  cover: "subtitle", statement: "subtitle", section: "subtitle", closing: "takeaway",
  metric: "support", chart: "subtitle", image: "caption", media: "caption", demo: "caption",
  quote: "attribution", gallery: "subtitle", mosaic: "subtitle", results: "subtitle", categories: "subtitle"
};
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const record = value => value !== null && typeof value === "object" && !Array.isArray(value);
const posix = value => value.split(path.sep).join("/");

function fail(message, slideIndex) {
  throw new Error((slideIndex === undefined ? "Markdown" : `슬라이드 ${slideIndex + 1}`) + ": " + message);
}

function assertSafeKeys(value) {
  if (!value || typeof value !== "object") return;
  for (const key of Object.keys(value)) {
    if (["__proto__", "constructor", "prototype"].includes(key)) fail(`설정 키 '${key}'는 지원하지 않습니다.`);
    assertSafeKeys(value[key]);
  }
}

function decodeScalar(raw, location) {
  const text = raw.trim();
  if (!text) return "";
  if (text.startsWith("\"")) {
    try {
      const value = JSON.parse(text);
      if (typeof value !== "string") throw new Error();
      return value;
    } catch (_) { fail(`${location}: 큰따옴표 문자열은 JSON 문법으로 작성하세요.`); }
  }
  if (text.startsWith("'") || text.startsWith("[") || text.startsWith("{")) fail(`${location}: flat 값은 일반 문자열 또는 JSON 문자열·숫자·true/false/null만 지원합니다.`);
  if (["true", "false", "null"].includes(text)) return JSON.parse(text);
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(text)) {
    const value = Number(text);
    if (!Number.isFinite(value)) fail(`${location}: 유한한 숫자를 사용하세요.`);
    return value;
  }
  return text;
}

function parseFlat(lines, label, allowed) {
  const result = {};
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex].trim();
    if (!line) continue;
    const match = /^([A-Za-z][A-Za-z0-9]*)\s*:\s*(.*)$/.exec(line);
    if (!match) fail(`${label} ${lineIndex + 1}행: key: value 형식을 사용하세요.`);
    const key = match[1];
    if (["__proto__", "constructor", "prototype"].includes(key) || (allowed && !allowed.has(key))) fail(`${label}: 지원하지 않는 키 '${key}'입니다.`);
    if (own(result, key)) fail(`${label}: '${key}'가 두 번 정의됐습니다.`);
    result[key] = decodeScalar(match[2], `${label}.${key}`);
  }
  return result;
}

function mergeUnique(target, source, label, slideIndex) {
  assertSafeKeys(source);
  for (const [key, value] of Object.entries(source)) {
    if (own(target, key)) fail(`'${key}' 중복 정의입니다 (${label}). 한 곳에서만 지정하세요.`, slideIndex);
    target[key] = value;
  }
}

function splitSlides(lines) {
  const slides = [];
  let current = [];
  let fence = false;
  let comment = false;
  for (const line of lines) {
    if (!comment && /^\s*```/.test(line)) fence = !fence;
    if (!fence && /<!--/.test(line)) comment = true;
    if (!fence && comment && /-->/.test(line)) comment = false;
    if (!fence && !comment && /^\s*---\s*$/.test(line)) {
      if (!current.some(value => value.trim())) fail("빈 슬라이드가 있습니다. 구분선 ---를 확인하세요.");
      slides.push(current);
      current = [];
    } else current.push(line);
  }
  if (fence) fail("코드 fence가 닫히지 않았습니다.");
  if (comment) fail("주석이 닫히지 않았습니다.");
  if (current.some(value => value.trim())) slides.push(current);
  else if (slides.length) fail("마지막 --- 뒤에 빈 슬라이드가 있습니다.");
  if (!slides.length) fail("한 장 이상의 슬라이드를 작성하세요.");
  return slides;
}

function parseSlide(lines, slideIndex) {
  const slide = {};
  const body = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*<!--\s*stage\s*$/.test(line)) {
      const metadata = [];
      while (++index < lines.length && !/^\s*-->\s*$/.test(lines[index])) metadata.push(lines[index]);
      if (index >= lines.length) fail("stage metadata 주석이 닫히지 않았습니다.", slideIndex);
      mergeUnique(slide, parseFlat(metadata, `slides.${slideIndex} metadata`), "metadata", slideIndex);
    } else if (/^\s*```/.test(line)) {
      const language = line.trim().slice(3).trim();
      if (language !== "stage") fail("설정에는 ```stage JSON fence만 사용할 수 있습니다. 코드 예시는 이미지나 JSON 문자열로 넣으세요.", slideIndex);
      const json = [];
      while (++index < lines.length && !/^\s*```\s*$/.test(lines[index])) json.push(lines[index]);
      if (index >= lines.length) fail("stage JSON fence가 닫히지 않았습니다.", slideIndex);
      let config;
      try { config = JSON.parse(json.join("\n")); }
      catch (error) { fail(`stage JSON 파싱 오류: ${error.message}`, slideIndex); }
      if (!record(config)) fail("stage JSON은 객체여야 합니다. 배열 또는 null을 사용할 수 없습니다.", slideIndex);
      mergeUnique(slide, config, "stage JSON", slideIndex);
    } else body.push(line);
  }
  if (!own(slide, "layout")) slide.layout = "statement";
  if (typeof slide.layout !== "string" || !own(FIELDS, slide.layout)) fail(`지원하지 않는 layout '${String(slide.layout)}'입니다.`, slideIndex);
  const allowed = new Set([...COMMON, ...FIELDS[slide.layout]]);
  for (const key of Object.keys(slide)) if (!allowed.has(key)) fail(`layout '${slide.layout}'에서 표시하지 않는 필드 '${key}'입니다.`, slideIndex);
  const headings = [];
  const paragraphs = [];
  const images = [];
  const bullets = [];
  let paragraph = [];
  let afterHeadings = false;
  const flush = () => { if (paragraph.length) { paragraphs.push(paragraph.join(" ")); paragraph = []; } };
  for (const raw of body) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const heading = /^#\s+(.+)$/.exec(line);
    if (heading) {
      if (afterHeadings) fail("# 제목은 본문 앞에 모아서 작성하세요.", slideIndex);
      headings.push(heading[1]);
      continue;
    }
    if (/^#{2,}\s/.test(line)) fail("제목은 단일 #만 지원합니다. 여러 줄 제목은 # 행을 연속해서 쓰세요.", slideIndex);
    afterHeadings = true;
    const image = /^!\[([^\]]*)\]\((.+)\)$/.exec(line);
    if (image) {
      flush();
      let src = image[2].trim();
      if (src.startsWith("<") && src.endsWith(">")) src = src.slice(1, -1);
      if (!src || /\s+["'][^"']*["']\s*$/.test(src)) fail("이미지는 ![설명](경로) 형식만 지원합니다. 이미지 제목 옵션은 caption 문단으로 옮기세요.", slideIndex);
      images.push({ src, alt: image[1] });
      continue;
    }
    if (/^!\[/.test(line)) fail("이미지 문법을 확인하세요: ![설명](상대/경로)", slideIndex);
    const bullet = /^-\s+(.+)$/.exec(line);
    if (bullet) { flush(); bullets.push(bullet[1]); continue; }
    if (/^(?:\*|\+|\d+[.)])\s/.test(line) || /^\s*\|.*\|\s*$/.test(line) || /^>\s/.test(line)) fail("이 목록·표·인용 본문 문법은 지원하지 않습니다. stage JSON의 해당 필드를 사용하세요.", slideIndex);
    paragraph.push(line);
  }
  flush();
  if (headings.length) {
    if (slide.layout === "media") fail("media는 제목을 표시하지 않습니다. # 제목 대신 caption 문단을 쓰세요.", slideIndex);
    const key = slide.layout === "quote" ? "quote" : slide.layout === "metric" ? "label" : "title";
    const value = key === "title" ? (headings.length === 1 ? headings[0] : headings) : headings.join("\n");
    mergeUnique(slide, { [key]: value }, "# 제목", slideIndex);
  }
  if (paragraphs.length) {
    const key = PARAGRAPH[slide.layout];
    if (!key) fail(`layout '${slide.layout}'는 일반 문단을 표시하지 않습니다. stage JSON의 구조 필드를 사용하세요.`, slideIndex);
    mergeUnique(slide, { [key]: paragraphs.join("\n\n") }, "문단", slideIndex);
  }
  if (bullets.length) {
    if (slide.layout !== "demo") fail("- 목록 자동 변환은 demo.steps만 지원합니다. 다른 양식은 stage JSON을 사용하세요.", slideIndex);
    mergeUnique(slide, { steps: bullets }, "- 목록", slideIndex);
  }
  if (images.length) {
    if (["gallery", "mosaic", "results"].includes(slide.layout)) {
      if (slide.layout === "mosaic") images.forEach(item => { item.span = 1; });
      mergeUnique(slide, { items: images }, "Markdown 이미지", slideIndex);
    } else if (["image", "media", "demo"].includes(slide.layout)) {
      if (images.length !== 1) fail("이 양식은 이미지 한 장만 지원합니다. gallery/mosaic/results를 사용하세요.", slideIndex);
      if (own(slide, "src") || own(slide, "video") || own(slide, "alt")) fail("Markdown 이미지와 JSON/metadata의 src·video·alt는 동시에 지정할 수 없습니다.", slideIndex);
      mergeUnique(slide, images[0], "Markdown 이미지", slideIndex);
    } else fail(`layout '${slide.layout}'는 Markdown 이미지를 표시하지 않습니다. 이미지 양식을 선택하세요.`, slideIndex);
  }
  return slide;
}

function reference(value) {
  if (typeof value !== "string") return null;
  const scheme = /^([A-Za-z][A-Za-z0-9+.-]*):/.exec(value);
  if (scheme) {
    if (["http", "https", "file"].includes(scheme[1].toLowerCase()) || /^data:(?:image|video)\//i.test(value)) return { remote: true, value };
    fail(`미디어 URI 형식을 지원하지 않습니다: ${scheme[1]}:`);
  }
  if (value.startsWith("//")) return { remote: true, value };
  const split = /^([^?#]*)([?#][\s\S]*)?$/.exec(value);
  let filename;
  try { filename = decodeURIComponent(split[1]); } catch (_) { fail(`미디어 경로의 URI 인코딩을 확인하세요: ${value}`); }
  if (!filename) fail("빈 미디어 파일 경로입니다.");
  return { remote: false, filename, suffix: split[2] || "" };
}

function eachMedia(deck, callback) {
  deck.slides.forEach((slide, slideIndex) => {
    for (const key of ["src", "video", "poster"]) if (own(slide, key)) callback(slide, key, `slides.${slideIndex}.${key}`);
    if (Array.isArray(slide.items)) slide.items.forEach((item, itemIndex) => {
      if (record(item)) for (const key of ["src", "video", "poster"]) if (own(item, key)) callback(item, key, `slides.${slideIndex}.items.${itemIndex}.${key}`);
    });
  });
}

function parseMarkdown(source, options = {}) {
  if (typeof source !== "string") fail("원고는 문자열이어야 합니다.");
  const lines = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
  let front = {};
  if (lines[0].trim() === "---") {
    let end = 1;
    while (end < lines.length && lines[end].trim() !== "---") end += 1;
    if (end === lines.length) fail("최상단 frontmatter가 닫히지 않았습니다.");
    front = parseFlat(lines.slice(1, end), "frontmatter", FRONT_KEYS);
    lines.splice(0, end + 1);
  }
  const slides = splitSlides(lines).map(parseSlide);
  const firstTitle = slides[0].title || slides[0].label || slides[0].quote;
  const fallbackTitle = Array.isArray(firstTitle) ? firstTitle.join(" ") : firstTitle;
  const deck = { id: options.sourcePath ? path.basename(options.sourcePath, path.extname(options.sourcePath)) : "markdown-deck", title: fallbackTitle || "발표 자료", theme: "stage", ...front, slides };
  eachMedia(deck, (object, key) => {
    const ref = reference(object[key]);
    if (!ref || ref.remote || !options.sourcePath || !options.outputDir) return;
    const absolute = path.resolve(path.dirname(path.resolve(options.sourcePath)), ref.filename);
    const relative = posix(path.relative(path.resolve(options.outputDir), absolute));
    object[key] = relative.split("/").map(encodeURIComponent).join("/") + ref.suffix;
  });
  return deck;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}

function generatedHtml(template, deck, inputPath, outputDir, repoRoot, content) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(deck.title)} — Stage</title>`);
  const hash = value => crypto.createHash("sha256").update(value).digest("hex").slice(0, 12);
  html = html.replace(/\b(href|src)=("|')(?:\.\/)?(styles\.css|deck-model\.js|app\.js)(?:[?#][^"']*)?\2/g, (_, attribute, quote, file) => {
    const sharedPath = path.join(repoRoot, file);
    return `${attribute}=${quote}${escapeHtml(posix(path.relative(outputDir, sharedPath)))}?v=${hash(fs.readFileSync(sharedPath))}${quote}`;
  });
  html = html.replace(/\bsrc=("|')(?:\.\/)?content\.js(?:[?#][^"']*)?\1/g, (_, quote) => `src=${quote}content.js?v=${hash(content)}${quote}`);
  const sourceLink = escapeHtml(posix(path.relative(outputDir, inputPath)));
  const galleryLink = escapeHtml(posix(path.relative(outputDir, path.join(repoRoot, "examples", "index.html"))));
  const marker = html.indexOf('id="helpDialog"');
  if (marker < 0) throw new Error("루트 index.html에 helpDialog가 없습니다.");
  const intro = `<p>이 예제의 원본은 <a href="${sourceLink}">${escapeHtml(path.basename(inputPath))}</a>입니다. Markdown을 수정한 뒤 빌드하면 content.js와 이 화면이 갱신됩니다. 브라우저에서 편집한 내용은 content.js로 내보낼 수 있으며 Markdown 원고를 자동 수정하지 않습니다. <a href="${galleryLink}">예제 모음으로 돌아가기</a></p>`;
  const after = html.slice(marker);
  if (!/<div class="dialog-body">\s*<p>[\s\S]*?<\/p>/.test(after)) throw new Error("루트 도움말의 원본 안내를 찾지 못했습니다.");
  html = html.slice(0, marker) + after.replace(/(<div class="dialog-body">)\s*<p>[\s\S]*?<\/p>/, (_, opening) => opening + intro);
  return html;
}

function buildDeck(inputPath, outputDir, options = {}) {
  if (typeof options === "string") options = { repoRoot: options };
  const input = path.resolve(inputPath);
  const output = path.resolve(outputDir);
  const repoRoot = path.resolve(options.repoRoot || path.join(__dirname, ".."));
  const deck = parseMarkdown(fs.readFileSync(input, "utf8"), { sourcePath: input, outputDir: output, repoRoot });
  const issues = model.validateDeck(deck);
  const errors = issues.filter(issue => issue.severity === "error");
  if (errors.length) throw new Error("입력 검증 실패:\n" + errors.map(issue => `${issue.path}: ${issue.message}`).join("\n"));
  eachMedia(deck, (object, key, fieldPath) => {
    const ref = reference(object[key]);
    if (!ref || ref.remote) {
      if (ref && /^file:/i.test(ref.value) && !fs.statSync(fileURLToPath(ref.value)).isFile()) throw new Error(`${fieldPath}: 미디어 파일이 아닙니다.`);
      return;
    }
    const absolute = path.resolve(output, ref.filename);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) throw new Error(`${fieldPath}: 미디어 파일이 없습니다: ${object[key]}`);
  });
  for (const file of ["styles.css", "deck-model.js", "app.js"]) if (!fs.existsSync(path.join(repoRoot, file))) throw new Error(`공유 런타임 파일이 없습니다: ${file}`);
  const template = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
  const json = JSON.stringify(deck, null, 2).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const content = "/* Generated from " + path.basename(input).replace(/[\r\n*\/]/g, "_") + ". Edit the Markdown source and rebuild. */\nwindow.PRESENTATION = " + json + ";\n";
  const html = generatedHtml(template, deck, input, output, repoRoot, content);
  const files = { content: path.join(output, "content.js"), index: path.join(output, "index.html") };
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(files.content, content, "utf8");
  fs.writeFileSync(files.index, html, "utf8");
  return { deck, issues, files };
}

module.exports = { parseMarkdown, buildDeck };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    process.stderr.write("사용법: node scripts/markdown-deck.cjs input.md output-directory\n");
    process.exitCode = 1;
  } else {
    try {
      const result = buildDeck(args[0], args[1]);
      for (const issue of result.issues) process.stderr.write(`[${issue.severity}] ${issue.path}: ${issue.message}\n`);
      process.stdout.write(`${result.deck.slides.length}장 생성: ${result.files.index}\n`);
    } catch (error) { process.stderr.write(error.message + "\n"); process.exitCode = 1; }
  }
}
