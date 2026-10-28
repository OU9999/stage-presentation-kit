'use strict';
const fs = require('node:fs');
const path = require('node:path');

function compareFiles(entries) {
  const differences = [];
  for (const [file, expected] of entries) {
    if (!fs.existsSync(file)) differences.push({ file, reason: 'missing' });
    else if (!fs.statSync(file).isFile() || !fs.readFileSync(file).equals(Buffer.from(expected))) differences.push({ file, reason: 'changed' });
  }
  return differences;
}

function writeFiles(entries) {
  for (const [file, bytes] of entries) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, bytes);
  }
}

function filesIn(directory) {
  if (!fs.existsSync(directory)) return [];
  if (!fs.statSync(directory).isDirectory()) return [directory];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function compareTrees(expected, actual) {
  const entries = filesIn(expected).map(file => [path.join(actual, path.relative(expected, file)), fs.readFileSync(file)]);
  const differences = compareFiles(entries);
  const managed = new Set(entries.map(([file]) => file));
  for (const file of filesIn(actual)) if (!managed.has(file)) differences.push({ file, reason: 'unexpected' });
  return differences;
}

module.exports = { compareFiles, writeFiles, compareTrees };
