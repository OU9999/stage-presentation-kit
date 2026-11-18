'use strict';
const fs = require('node:fs');
const path = require('node:path');

const CONFIG_NAMES = Object.freeze(['ou.config.json', 'stage.config.json']);

function findConfig(directory = process.cwd(), { searchParents = true } = {}) {
  for (let current = path.resolve(directory); ; current = path.dirname(current)) {
    for (const name of CONFIG_NAMES) {
      const candidate = path.join(current, name);
      if (fs.existsSync(candidate)) return candidate;
    }
    if (!searchParents || current === path.dirname(current)) break;
  }
  throw new Error('ou.config.json을 찾을 수 없습니다. ou-presentation init으로 시작하거나 --config 경로를 지정하세요.');
}

module.exports = { CONFIG_NAMES, findConfig };
