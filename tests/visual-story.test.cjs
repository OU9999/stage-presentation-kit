"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const { validateData, assertValidData, deriveData, assertSvg } = require("../scripts/visual-story/data.cjs");
const theme = require("../scripts/visual-story/theme.cjs");
const charts = require("../scripts/visual-story/charts.cjs");
const diagrams = require("../scripts/visual-story/diagrams.cjs");
const generator = require("../scripts/build-visual-story.cjs");
const { validateDeck } = require("../deck-model.js");
const repoRoot = path.resolve(__dirname, "..");
const inputFile = path.join(repoRoot, "examples/visual-story/data.json");
const canonical = () => JSON.parse(fs.readFileSync(inputFile, "utf8"));
const allRenderers = { ...charts, ...diagrams };
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);
function deepFreeze(value) {
  if (value && typeof value === "object") { Object.values(value).forEach(deepFreeze); Object.freeze(value); }
  return value;
}
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "stage-visual-story-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const source = path.join(directory, "custom-input.json");
  const output = path.join(directory, "different", "depth", "deck");
  fs.writeFileSync(source, JSON.stringify(canonical(), null, 2) + "\n");
  return { directory, source, output, build: () => generator.buildVisualStory(source, output, { repoRoot }) };
}
const snapshot = result => result.outputs.map(file => fs.readFileSync(file, "utf8"));
const loadDeck = file => { const context = { window: {} }; vm.runInNewContext(fs.readFileSync(file, "utf8"), context); return JSON.parse(JSON.stringify(context.window.PRESENTATION)); };

test("TC-VS01 canonical integers derive all denominators, differences and effort totals without changing input", () => {
  const data = deepFreeze(canonical()), before = JSON.stringify(data);
  assert.deepEqual(validateData(data), []);
  const summary = deriveData(data);
  assert.deepEqual(summary.periods.map(period => [period.registered, period.activated, period.rate]), [[1200, 420, 35], [1200, 546, 45.5], [1200, 660, 55]]);
  assert.equal(summary.activationDifference, 20);
  close(summary.relativeChange, 57.14285714285714);
  assert.deepEqual(summary.funnels.followup.map(stage => stage.value), [1200, 960, 780, 660]);
  assert.equal(theme.percent(summary.stepRates[1].followup.rate), "81.3%");
  assert.equal(theme.points(summary.maxStepDifference.difference), "+14.6%p");
  assert.equal(summary.maxStepDifference.to, "activated");
  assert.equal(summary.interviews.reduce((sum, item) => sum + item.count, 0), 48);
  assert.deepEqual(summary.effort.rows.map(row => row.total), [6, 6, 6]);
  assert.deepEqual(summary.effort.columns.map(column => column.total), [5, 7, 6]);
  assert.equal(summary.effort.total, 18);
  assert.equal(JSON.stringify(data), before);
});

test("TC-VS02 eight pure SVG renderers preserve input and emit deterministic, locally valid XML", () => {
  const data = deepFreeze(canonical()), before = JSON.stringify(data);
  for (const [name, render] of Object.entries(allRenderers)) {
    const svg = render(data);
    assert.equal(svg, render(data), name);
    assert.equal(assertSvg(svg, name), svg);
    assert.match(svg, /viewBox="0 0 1280 640"/);
    assert.doesNotMatch(svg, /(?:NaN|Infinity|undefined)/);
    assert.doesNotMatch(svg, /<(?:script|image|foreignObject)\b|\shref=/i);
  }
  assert.equal(JSON.stringify(data), before);
});

test("TC-VS03 bad structures, impossible integers, zero denominators and conflicting references yield repairable field errors", () => {
  const cases = [
    ["fictional", d => { d.meta.fictional = false; }, "meta.fictional"],
    ["null root", () => null, "$"],
    ["null measurement", d => { d.measurement = null; }, "measurement"],
    ["zero week denominator", d => { d.weeklyCohorts[0].registered = 0; }, "weeklyCohorts.0.registered"],
    ["noninteger", d => { d.weeklyCohorts[0].activated = 2.5; }, "weeklyCohorts.0.activated"],
    ["numeric string", d => { d.weeklyCohorts[0].activated = "90"; }, "weeklyCohorts.0.activated"],
    ["outside cohort", d => { d.weeklyCohorts[0].activated = 301; }, "weeklyCohorts.0.activated"],
    ["duplicate week", d => { d.weeklyCohorts[1].week = 1; }, "weeklyCohorts.1.week"],
    ["wrong week count", d => { d.weeklyCohorts.pop(); }, "weeklyCohorts"],
    ["overlap period", d => { d.periods[1].fromWeek = 4; }, "periods.1.fromWeek"],
    ["copied period total", d => { d.periods[0].activated = 999; }, "periods.0.activated"],
    ["copied week rate", d => { d.weeklyCohorts[0].rate = 99; }, "weeklyCohorts.0.rate"],
    ["copied interview share", d => { d.interviews.categories[0].share = 99; }, "interviews.categories.0.share"],
    ["copied effort total", d => { d.effortAllocation.total = 99; }, "effortAllocation.total"],
    ["zero relative denominator", d => { d.weeklyCohorts.slice(0, 4).forEach(row => { row.activated = 0; }); }, "weeklyCohorts"],
    ["zero step denominator", d => { d.funnel.intermediateCounts[0].drafted = 0; }, "funnel.intermediateCounts.0.drafted"],
    ["non nested funnel", d => { d.funnel.intermediateCounts[0].started = 500; }, "funnel.intermediateCounts.0"],
    ["duplicated endpoint", d => { d.funnel.intermediateCounts[0].registered = 1200; }, "funnel.intermediateCounts.0.registered"],
    ["wrong funnel source", d => { d.funnel.stages[0].source = "intermediateCounts"; }, "funnel.stages.0.source"],
    ["zero interview denominator", d => { d.interviews.sampleSize = 0; }, "interviews.sampleSize"],
    ["interview total mismatch", d => { d.interviews.categories[0].count++; }, "interviews.categories"],
    ["wrong category count", d => { d.interviews.categories.pop(); }, "interviews.categories"],
    ["flat scale", d => { d.initiatives.scoreScale.max = 1; }, "initiatives.scoreScale.max"],
    ["outside scale", d => { d.initiatives.items[0].impactScore = 6; }, "initiatives.items.0.impactScore"],
    ["colliding points", d => { d.initiatives.items[1].impactScore = 5; }, "initiatives.items.1"],
    ["missing initiative", d => { d.journeyMap.interventions[0].initiative = "missing"; }, "journeyMap.interventions.0.initiative"],
    ["colliding interventions", d => { d.journeyMap.interventions[0].atStage = "drafted"; }, "journeyMap.interventions.1.atStage"],
    ["label conflict", d => { d.journeyMap.nodes[0].label = "다른 이름"; }, "journeyMap.nodes.0.label"],
    ["reverse task", d => { d.roadmap.tasks[0].fromWeek = 5; }, "roadmap.tasks.0.toWeek"],
    ["outside task", d => { d.roadmap.tasks[0].toWeek = 13; }, "roadmap.tasks.0.toWeek"],
    ["matrix dimension", d => { d.effortAllocation.items[0].personWeeksByPeriod.pop(); }, "effortAllocation.items.0.personWeeksByPeriod"],
    ["all-zero scale", d => { d.effortAllocation.items.forEach(row => { row.personWeeksByPeriod = [0, 0, 0]; }); }, "effortAllocation.items"],
    ["wrong effort order", d => { d.effortAllocation.periodOrder.reverse(); }, "effortAllocation.periodOrder.0"],
    ["missing plan initiative", d => { d.nextValidation.plans[0].initiative = "missing"; }, "nextValidation.plans.0.initiative"],
    ["long SVG name", d => { d.initiatives.items[0].label = "가".repeat(15); }, "initiatives.items.0.label"],
    ["XML control", d => { d.meta.title = "나쁜\u0000제목"; }, "meta.title"],
    ["lone surrogate", d => { d.meta.title = "나쁜\ud800제목"; }, "meta.title"],
  ];
  for (const [name, change, expected] of cases) {
    let data = canonical(); const result = change(data); if (result === null) data = result;
    const before = JSON.stringify(data), issues = validateData(data);
    assert.ok(issues.some(issue => issue.path === expected), `${name}: ${JSON.stringify(issues)}`);
    assert.throws(() => assertValidData(data), error => error.issues.some(issue => issue.path === expected), name);
    assert.equal(JSON.stringify(data), before, name);
  }
});

test("TC-VS04 actual zero outcomes and small composition shares stay finite while legend values remain readable", () => {
  const data = canonical();
  data.weeklyCohorts[0].activated = 0;
  data.interviews.categories.forEach((item, index) => { item.count = [0, 1, 1, 46][index]; });
  assert.deepEqual(validateData(data), []);
  assert.equal(deriveData(data).weekly[0].rate, 0);
  const svg = charts.renderComposition(data);
  assertSvg(svg);
  assert.doesNotMatch(svg, /NaN|Infinity/);
  assert.match(svg, /0명 · 0%/);
  assert.match(svg, /1명 · 2\.1%/);
  assert.equal((svg.match(/y="169"/g) || []).length, 1, "only the wide segment receives an inside percentage");
});

test("TC-VS05 largest step difference compares absolute magnitude and retains a negative sign in SVG and derived data", () => {
  const data = canonical();
  data.weeklyCohorts.slice(8).forEach(row => { row.activated = 30; });
  data.funnel.intermediateCounts[1].started = 600;
  data.funnel.intermediateCounts[1].drafted = 240;
  const summary = deriveData(data);
  assert.equal(summary.maxStepDifference.to, "drafted");
  assert.ok(summary.maxStepDifference.difference < 0);
  assert.match(charts.renderStepRates(data), new RegExp(theme.points(summary.maxStepDifference.difference).replace(/[+.*?^${}()|[\]\\]/g, "\\$&")));
  assert.equal(theme.largestChangeIndex([-20, 10, 20]), 0, "ties keep the first stage");
});

test("TC-VS06 many effort values retain all nine numbers with at most three representative legend entries", () => {
  const data = canonical();
  data.effortAllocation.items.forEach((row, index) => { row.personWeeksByPeriod = [index * 3 + 1, index * 3 + 2, index * 3 + 3]; });
  assert.deepEqual(validateData(data), []);
  assert.equal(deriveData(data).effort.total, 45);
  const svg = diagrams.renderEffort(data);
  assertSvg(svg);
  assert.equal((svg.match(/y="586"/g) || []).length, 3);
  for (const value of [1, 5, 9]) assert.match(svg, new RegExp(`${value}인·주`));
  data.roadmap.tasks[0].toWeek = 1;
  assert.match(diagrams.renderRoadmap(data), />W1<\/text>/);
});

test("TC-VS07 XML escaping preserves literal labels while malformed or executable SVG is rejected", () => {
  const data = canonical(); data.initiatives.items[0].label = '<A & "B">';
  const svg = diagrams.renderPriority(data);
  assertSvg(svg);
  assert.match(svg, /&lt;A &amp; &quot;B&quot;&gt;/);
  const valid = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>제목</title><desc>설명</desc><g/></svg>';
  assert.equal(assertSvg(valid), valid);
  for (const broken of [
    valid.replace("<g/>", "<g>"), valid.replace("설명", "잘못된 & 엔티티"),
    valid.replace("<g/>", '<rect width="NaN"/>'), valid.replace("<g/>", '<g onload="alert(1)"/>'),
    valid.replace("<g/>", '<script>alert(1)</script>'), valid.replace("설명", "&#0;"),
    valid.replace("<g/>", '<g style="fill:url(https://example.com/a)"/>'), valid + "<g/>",
  ]) assert.throws(() => assertSvg(broken, "bad.svg"), /bad\.svg/);
});

test("TC-VS08 one command generates twelve valid slides, eight images and ten real table sections at a different output depth", t => {
  const f = fixture(t), source = fs.readFileSync(f.source, "utf8"), built = f.build();
  assert.equal(built.deck.slides.length, 12);
  assert.equal(Object.keys(built.files.graphics).length, 8);
  assert.equal(built.outputs.length, 12);
  assert.deepEqual(validateDeck(built.deck), []);
  const deck = loadDeck(built.files.content);
  assert.equal(deck.slides.filter(slide => slide.layout === "image" && slide.fit === "contain").length, 8);
  for (const slide of deck.slides.filter(item => item.layout === "image")) {
    const url = new URL(slide.src, "https://example.test/");
    const expected = crypto.createHash("sha256").update(fs.readFileSync(built.files.graphics[slide.id])).digest("hex").slice(0, 12);
    assert.equal(url.searchParams.get("v"), expected, `${slide.id}: image URL must version the final SVG bytes`);
  }
  assert.equal(deck.slides.at(-1).url, "data.html");
  for (const id of ["trend", "composition", "journey", "priorities", "roadmap", "effort"]) {
    const slide = deck.slides.find(item => item.id === id);
    assert.doesNotMatch(slide.notes, /출처:.*W1–W4 \/ W9–W12/, `${id}: unrelated cohort windows must not label interviews or planning data`);
  }
  const table = fs.readFileSync(built.files.data, "utf8");
  for (const id of ["periods", "weekly", "funnel", "interviews", "step-rates", "journey", "priorities", "roadmap", "effort", "next-validation"]) assert.match(table, new RegExp(`id="${id}"`));
  assert.equal((table.match(/<table\b/g) || []).length, 10);
  assert.equal((table.match(/<caption\b/g) || []).length, 10);
  assert.match(table, /scope="col"/); assert.match(table, /scope="row"/);
  assert.match(table, /81\.3/); assert.match(table, /가상/);
  for (const file of [built.files.index, built.files.data]) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const url = match[1].replaceAll("&amp;", "&");
      if (/^(?:[a-z]+:|#)/i.test(url)) continue;
      const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), pathname)), `${file}: missing ${url}`);
    }
  }
  assert.equal(fs.readFileSync(f.source, "utf8"), source);
  const first = snapshot(built); f.build(); assert.deepEqual(snapshot(built), first);
});

test("TC-VS09 changing source counts updates native KPI, SVG, tables and generated Markdown together", t => {
  const f = fixture(t); const original = f.build(); const first = snapshot(original);
  const initialUrls = Object.fromEntries(loadDeck(original.files.content).slides.filter(slide => slide.layout === "image").map(slide => [slide.id, slide.src]));
  const data = canonical(); data.weeklyCohorts[8].activated += 12;
  const updatedSource = JSON.stringify(data);
  fs.writeFileSync(f.source, updatedSource);
  const updated = f.build(), deck = loadDeck(updated.files.content);
  assert.equal(fs.readFileSync(f.source, "utf8"), updatedSource);
  for (const slide of deck.slides.filter(item => item.layout === "image")) {
    if (["funnel", "trend", "step-rates"].includes(slide.id)) assert.notEqual(slide.src, initialUrls[slide.id], `${slide.id}: changed SVG must have a new URL`);
    else assert.equal(slide.src, initialUrls[slide.id], `${slide.id}: identical SVG bytes keep the same URL`);
    const version = crypto.createHash("sha256").update(fs.readFileSync(updated.files.graphics[slide.id])).digest("hex").slice(0, 12);
    assert.equal(new URL(slide.src, "https://example.test/").searchParams.get("v"), version);
  }
  const layers = [JSON.stringify(deck), fs.readFileSync(updated.files.slides, "utf8"), fs.readFileSync(updated.files.data, "utf8")];
  for (const corpus of layers) { assert.match(corpus, /672/); assert.match(corpus, /56/); assert.match(corpus, /21%p/); }
  const funnel = fs.readFileSync(updated.files.graphics.funnel, "utf8");
  assert.match(funnel, /672명/); assert.match(funnel, /56%/);
  assert.notDeepEqual(snapshot(updated), first);
  assert.equal(deriveData(data).followup.rate, 56);
  assert.match(fs.readFileSync(updated.files.graphics.trend, "utf8"), /168\/300명, 56%/);
  data.weeklyCohorts.slice(8).forEach(row => { row.activated = 0; });
  fs.writeFileSync(f.source, JSON.stringify(data));
  const zero = f.build();
  for (const file of [zero.files.content, zero.files.slides, zero.files.data]) {
    const text = fs.readFileSync(file, "utf8");
    assert.match(text, /-35%p/); assert.match(text, /0%/); assert.doesNotMatch(text, /NaN|Infinity/);
  }
  assert.match(fs.readFileSync(zero.files.graphics["step-rates"], "utf8"), /-70%p/);
});

test("TC-VS10 validation and malformed graphics fail before replacing any generated result", t => {
  const f = fixture(t), built = f.build(), before = snapshot(built), data = canonical();
  data.weeklyCohorts[0].registered = 0;
  fs.writeFileSync(f.source, JSON.stringify(data));
  assert.throws(f.build, /weeklyCohorts\.0\.registered/);
  assert.deepEqual(snapshot(built), before);
  fs.writeFileSync(f.source, JSON.stringify(canonical()));
  const render = generator.renderers.funnel;
  generator.renderers.funnel = () => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>x</title><desc>x</desc><g></svg>';
  try { assert.throws(f.build, /funnel\.svg|XML/); assert.deepEqual(snapshot(built), before); }
  finally { generator.renderers.funnel = render; }
});

test("TC-VS11 missing local media or runtime preserves every existing output", t => {
  const f = fixture(t), built = f.build(), before = snapshot(built);
  const otherRoot = path.join(f.directory, "runtime"); fs.mkdirSync(otherRoot);
  for (const file of ["index.html", "styles.css", "deck-model.js"]) fs.copyFileSync(path.join(repoRoot, file), path.join(otherRoot, file));
  assert.throws(() => generator.buildVisualStory(f.source, f.output, { repoRoot: otherRoot }), /app\.js/);
  assert.deepEqual(snapshot(built), before);
  const original = generator.renderers.funnel;
  delete generator.renderers.funnel;
  try { assert.throws(f.build, /funnel|src|없|파일/i); assert.deepEqual(snapshot(built), before); }
  finally { generator.renderers.funnel = original; }
});

test("TC-VS12 source paths colliding with generated files are rejected without changing input or outputs", t => {
  const f = fixture(t), built = f.build();
  const collision = built.files.slides;
  fs.writeFileSync(collision, JSON.stringify(canonical()));
  const before = snapshot(built);
  assert.throws(() => generator.buildVisualStory(collision, f.output, { repoRoot }), /inputPath|원본|충돌/);
  assert.deepEqual(snapshot(built), before);
  const alias = path.join(f.directory, "source-alias.json");
  fs.symlinkSync(collision, alias);
  assert.throws(() => generator.buildVisualStory(alias, f.output, { repoRoot }), /inputPath|원본|충돌/);
  assert.deepEqual(snapshot(built), before);
});

test("TC-VS13 XML and HTML quotations survive generation as text while HTML controls never appear", t => {
  const f = fixture(t), data = canonical();
  data.meta.title = '제목 <tag & "문구">'; data.initiatives.items[0].label = '<A & "B">';
  fs.writeFileSync(f.source, JSON.stringify(data));
  const built = f.build(), table = fs.readFileSync(built.files.data, "utf8");
  assert.match(table, /&lt;A &amp; &quot;B&quot;&gt;/);
  assert.doesNotMatch(table, /<tag|<A /);
  assert.equal(loadDeck(built.files.content).title, data.meta.title);
  for (const file of Object.values(built.files.graphics)) assertSvg(fs.readFileSync(file, "utf8"), file);
});
