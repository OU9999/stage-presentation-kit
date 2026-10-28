"use strict";
// Exercise real author edits in an isolated copy; never mutate the example originals.
const fs = require("node:fs"), path = require("node:path"), os = require("node:os");
const crypto = require("node:crypto"), vm = require("node:vm"), assert = require("node:assert/strict");
const repo = path.resolve(__dirname, "../../..");
const { buildProject } = require(path.join(repo, "scripts/stage.cjs"));
const project = fs.mkdtempSync(path.join(os.tmpdir(), "stage-renewal-authoring-"));
fs.cpSync(path.join(repo, "talks"), path.join(project, "talks"), { recursive: true });
fs.cpSync(path.join(repo, "assets"), path.join(project, "assets"), { recursive: true });
const configPath = path.join(project, "stage.config.json");
fs.writeFileSync(configPath, JSON.stringify({ title: "다른 발표로 바꿔보기", theme: "stage", sourceDir: "talks", outputDir: "out" }));
const options = { configPath, repoRoot: repo }, sourcePath = path.join(project, "talks/product-notes/slides.md");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const outputFile = path.join(project, "out/product-notes/content.js");
buildProject(options);
const before = fs.readFileSync(outputFile, "utf8"), original = fs.readFileSync(sourcePath, "utf8");
let source = original;
const replacements = [
  ["작은 관찰에서, **다음 행동으로.**", "다음 발표에서는, **질문부터.**"],
  ["../../assets/photos/write.jpg", "../../assets/photos/capture.jpg"],
  ["야외 테이블에서 노트에 쓰는 인물을 담은 스톡 사진", "휴대폰으로 장면을 기록하는 인물의 스톡 사진"],
  ["기록하는 장면 · LinkedIn Sales Navigator / Pexels", "기록하는 장면 · Andrea Piacquadio / Pexels"],
  ["| 결과 확인 | 완료 상태를 다시 질문함 | 상태 문구 비교하기 |", "| 결과 확인 | 완료 상태를 다시 질문함 | 상태 문구 비교하기 |\n| 다시 찾기 | 지난 기록의 위치를 물음 | 검색 이름 함께 읽기 |"],
  ["**24** 개", "**31** 개"],
  ["작게 바꾸고, **다시 봅니다.**", "질문을 남기고, **함께 확인합니다.**"]
];
for (const [from, to] of replacements) { assert(source.includes(from), "Missing edit target: " + from); source = source.replace(from, to); }
fs.writeFileSync(sourcePath, source);
buildProject(options);
const after = fs.readFileSync(outputFile, "utf8");
assert.notEqual(after, before);
for (const value of ["다음 발표에서는,", "31", "검색 이름 함께 읽기", "함께 확인합니다.", "capture.jpg", "../team-learning/read.html"]) assert(after.includes(value), "Missing authored result: " + value);
assert.equal(fs.readFileSync(sourcePath, "utf8"), source);
const context = { window: {} }; vm.runInNewContext(after, context);
assert.equal(context.window.PRESENTATION.slides.length, 8);
assert.equal(context.window.PRESENTATION.format, "markdown-v1");
fs.writeFileSync(sourcePath, source.replace("../../assets/photos/capture.jpg", "./missing-photo.jpg"));
assert.throws(() => buildProject(options), /참조 파일/);
assert.equal(fs.readFileSync(outputFile, "utf8"), after);
fs.writeFileSync(sourcePath, source);
buildProject(options);
const receipt = { isolatedProject: project, configPath, edits: replacements.map(([from, to]) => ({ from, to })), sourceOnlyEdits: true, originalSha256: sha(original), editedSha256: sha(source), outputChanged: sha(before) !== sha(after), originalExamplesUnchanged: fs.readFileSync(path.join(repo, "talks/product-notes/slides.md"), "utf8") === original, lastGoodOutputPreservedOnMissingAsset: true, slides: 8 };
fs.writeFileSync(path.join(__dirname, "authoring-result.json"), JSON.stringify(receipt, null, 2) + "\n");
console.log(receipt);
