#!/usr/bin/env node
'use strict';
// Compatibility entry point. Reusable implementation lives in lib/.
module.exports = require('../lib/project.cjs');
if (require.main === module) require('../lib/cli.cjs').main();
