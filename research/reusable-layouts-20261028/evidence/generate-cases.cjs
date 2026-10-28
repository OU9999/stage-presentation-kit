"use strict";
// Independent author inputs. Generated after the implementation is handed off.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const repo = path.resolve(__dirname, "../../..");
const { parseDocument } = require(path.join(repo, "scripts/markdown-document.cjs"));
const { generatedHtml } = require(path.join(repo, "scripts/markdown-deck.cjs"));
const model = require(path.join(repo, "deck-model.js"));
const cases = [];
const hint = value => "<!-- stage-slide\n" + value + "\n-->\n\n";
const group = value => "<!-- stage-group\n" + value + "\n-->\n";
const photos = ["capture", "listen", "write", "observe", "portrait-one", "portrait-two"];
const labels = ["기록", "듣기", "쓰기", "관찰", "발견", "다른 시선"];
const focus = ["68% 45%", "52% 40%", "45% 50%", "48% 34%", "48% 30%", "49% 28%"];
const image = (name, caption = name) => "![스톡 사진 " + name + "](../../../../assets/photos/" + name + '.jpg "' + caption + '")';
for (const variant of ["portraits", "strip"]) for (const count of [2, 3, 6]) {
  cases.push({ id: variant + "-" + count, composition: "gallery", variant, count, source: hint("compose: gallery\nvariant: " + variant + "\nfit: cover\nfocus: " + JSON.stringify(focus.slice(0, count))) + photos.slice(0, count).map((name, index) => image(name, labels[index])).join("\n\n") });
}
cases.push({ id: "staggered-6", composition: "mosaic", variant: "staggered", count: 6, source: hint("compose: mosaic\nvariant: staggered\nfit: cover\nfocus: " + JSON.stringify(focus)) + "# 서로 다른 자료를 한눈에\n\n" + photos.map((name, index) => image(name, labels[index])).join("\n\n") });
const material = [
  group("tone: blue") + "## 남겨 둔 기록\n\n**24** 개\n\n가상 편집 예시입니다.",
  group("primary: true\nfit: cover\nfocus: '45% 43%'") + "## 기록하는 장면\n\n" + image("write", "스톡 장면 · Pexels"),
  "## 함께 읽을 원칙\n\n> 관찰과 짐작을 구분합니다.",
  group("icon: record\ntone: green") + "## 다음에 할 일\n\n- 이름을 함께 읽습니다.\n- 같은 질문으로 돌아옵니다.",
  "## 맥락을 남깁니다\n\n**같은 원고**에서 자료와 [외부 참고](https://example.com)를 확인합니다.",
  group("fit: contain") + "## 찾아 둔 단서\n\n" + image("observe", "서로 다른 스톡 장면"),
  group("tone: orange") + "## 확인할 질문\n\n**6** 가지\n\n서로 다른 작업 단위이며 성과가 아닙니다.",
  "## 읽는 순서\n\n1. 맥락\n2. 관찰\n3. 질문",
  group("icon: share") + "## 공유할 기록\n\n짧은 설명과 **다음 행동**을 함께 남깁니다.",
  "## 함께 보는 장면\n\n" + image("capture", "기록하기 · Pexels"),
  "## 검토의 기준\n\n> 모르는 것은 질문으로 남깁니다.",
  "## 이후의 확인\n\n- 해석을 다시 읽습니다.\n- 근거의 위치를 남깁니다."
];
for (const count of [5, 8, 12]) cases.push({ id: "bento-" + count, composition: "bento", variant: "balanced", count, source: hint("compose: bento") + "# 기록과 다음 행동\n\n" + material.slice(0, count).join("\n\n") });
for (const variant of ["seoul", "recap"]) cases.push({ id: "bento-" + variant + "-12", composition: "bento", variant, count: 12, source: hint("compose: bento\nvariant: " + variant) + material.map((value, index) => value.replace("primary: true\n", "")).join("\n\n") });
for (const count of [5, 12, 22]) {
  const icons = Array.from({ length: count }, (_, index) => ({ icon: model.iconNames[index % model.iconNames.length], tone: ["blue", "green", "orange", "purple", "yellow"][index % 5] }));
  cases.push({ id: "wall-" + count, composition: "icon-wall", count, source: hint("compose: icon-wall\nicons: " + JSON.stringify(icons)) + "# 함께 살펴볼 도구\n\n가상 역할 이름이며 실제 서비스 목록이 아닙니다.\n\n" + icons.map((_, index) => "- **역할 " + (index + 1) + "** · [자료](https://example.com/" + index + ")").join("\n") });
}
const customDirectory = path.join(repo, "talks/community-exhibit/icons");
const custom = fs.readdirSync(customDirectory).filter(file => file.endsWith(".svg")).sort();
assert(custom.length >= 3, "The authored custom icon assets must be handed off first.");
cases.push({ id: "wall-custom-3", composition: "icon-wall", count: 3, source: hint("compose: icon-wall") + "# 우리만의 표식\n\n" + custom.slice(0, 3).map((file, index) => "- ![자체 제작 표식 " + (index + 1) + "](../../../../talks/community-exhibit/icons/" + file + ") **표식 " + (index + 1) + "** [설명](https://example.com/" + index + ")").join("\n") });
cases.push({ id: "preset-count-mismatch", composition: "document", warning: true, source: hint("compose: bento\nvariant: seoul") + material.slice(0, 5).join("\n\n") });
cases.push({ id: "icons-count-mismatch", composition: "document", warning: true, source: hint("compose: icon-wall\nicons: [search, code]") + "# 개수가 다른 선택\n\n- 하나\n- 둘\n- 셋" });
cases.push({ id: "wall-23", composition: "document", warning: true, source: hint("compose: icon-wall\nicons: " + JSON.stringify(Array(23).fill("search"))) + "# 많은 항목을 보존합니다\n\n" + Array.from({ length: 23 }, (_, index) => "- 역할 " + (index + 1)).join("\n") });
const directory = path.join(__dirname, "check-deck"); fs.mkdirSync(directory, { recursive: true });
const sourcePath = path.join(directory, "slides.md"), source = cases.map(item => item.source).join("\n\n---\n\n");
fs.writeFileSync(sourcePath, source);
const deck = parseDocument(source, { sourcePath: path.relative(repo, sourcePath), id: "reusable-layout-checks" });
assert.equal(deck.slides.length, cases.length);
assert.deepEqual(model.validateDeck(deck).filter(issue => issue.severity === "error"), []);
const content = "window.PRESENTATION = " + JSON.stringify(deck, null, 2) + ";\n";
fs.writeFileSync(path.join(directory, "content.js"), content);
const html = generatedHtml(fs.readFileSync(path.join(repo, "index.html"), "utf8"), deck, sourcePath, directory, repo, content);
fs.writeFileSync(path.join(directory, "index.html"), html);
fs.writeFileSync(path.join(directory, "read.html"), html.replace(/<body\b/, '<body data-view="read"'));
fs.writeFileSync(path.join(__dirname, "cases.json"), JSON.stringify(cases.map(({ source, ...item }, index) => ({ ...item, number: index + 1 })), null, 2) + "\n");
// The public result board links to the normal cases without intentional QA warnings.
const exampleDirectory = path.join(__dirname, "count-examples"); fs.mkdirSync(exampleDirectory, { recursive: true });
const exampleDeck = { ...deck, id: "reusable-layout-examples", title: "자료 수에 따라 바뀌는 배치", slides: deck.slides.slice(0, 16) };
const exampleContent = "window.PRESENTATION = " + JSON.stringify(exampleDeck, null, 2) + ";\n";
fs.writeFileSync(path.join(exampleDirectory, "content.js"), exampleContent);
const exampleHtml = generatedHtml(fs.readFileSync(path.join(repo, "index.html"), "utf8"), exampleDeck, sourcePath, exampleDirectory, repo, exampleContent);
fs.writeFileSync(path.join(exampleDirectory, "index.html"), exampleHtml);
fs.writeFileSync(path.join(exampleDirectory, "read.html"), exampleHtml.replace(/<body\b/, '<body data-view="read"'));
console.log("Generated " + cases.length + " independent authoring cases and sixteen normal public examples.");
