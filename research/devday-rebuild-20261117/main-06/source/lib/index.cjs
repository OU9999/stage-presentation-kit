'use strict';
const { buildProject, startDev } = require('./project.cjs');
const { initProject, newTalk } = require('./scaffold.cjs');
const { parseDocument } = require('./markdown-document.cjs');
module.exports = { buildProject, startDev, initProject, newTalk, parseDocument };
