import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const repo = resolve(process.argv[2]);
const source = await readFile(resolve(repo, 'index.html'), 'utf8');
const expected = ['content.js', 'deck-model.js', 'visual.js', 'app.js'];
const scripts = [...source.matchAll(/<script\b([^>]*)>/g)].map(m => m[1]);
assert.equal(scripts.length, 4);
for (const [i, tag] of scripts.entries()) {
  assert(tag.includes(`src="${expected[i]}?`)); assert(/\bdefer\b/.test(tag)); assert(!/\btype=/.test(tag));
}
const checks = ['Current product HTML has four classic defer scripts in content/model/visual/app order'];
for (const html of ['index.html', 'vanilla.html']) {
  const built = await readFile(resolve('dist', html), 'utf8');
  const classic = [...built.matchAll(/<script src="([^"]+)" defer><\/script>/g)].map(m => m[1]);
  assert.deepEqual(classic, ['content.js', 'deck-model.js', 'visual.js', 'legacy-bridge.js'].map(f => '/stage-presentation-kit/' + f));
  assert(/type="module"/.test(built));
  checks.push(`${html}: built classic tags/order/base preserved; module output present (static check)`);
}
const readyEvents = [];
const scope = { Event: function Event(type) { this.type = type; }, window: { dispatchEvent: event => readyEvents.push(event.type) } };
vm.createContext(scope);
for (const [file, global] of [['content.js','PRESENTATION'], ['deck-model.js','STAGE_MODEL'], ['visual.js','StageVisual'], ['legacy-bridge.js','PROBE_BRIDGE']]) {
  vm.runInContext(await readFile(resolve('public', file), 'utf8'), scope, { filename: file, timeout: 2000 });
  assert(scope.window[global]);
}
assert.deepEqual(readyEvents, ["stage-probe:ready"]);
const bridge = scope.window.PROBE_BRIDGE;
assert.equal(scope.window.STAGE_MODEL.validateVisual(bridge.snapshot(), 'slides.0.visual', 0).length, 0);
const changed = bridge.snapshot(); changed.values[1] = 60;
assert.equal(bridge.commit(changed).values[1], 60);
assert.throws(() => bridge.commit({ kind: 'bars', labels: ['A'], values: [NaN] }));
assert.equal(bridge.snapshot().values[1], 60);
checks.push('Node VM explicit classic initialization and pure model/bridge valid commit + invalid rejection passed; no browser scheduling/DOM test');
for (const file of ['deck-model.js','visual.js']) {
  assert((await readFile(resolve(repo, file))).equals(await readFile(resolve('dist',file))));
}
checks.push('Copied production model and visual source are byte-identical to current product source');
const files=[];
async function walk(dir) {
  for (const name of (await readdir(dir)).sort()) {
    const path=resolve(dir,name);
    if ((await stat(path)).isDirectory()) await walk(path);
    else { const bytes=await readFile(path); files.push({path:relative(resolve('dist'),path),bytes:bytes.length,gzipBytes:gzipSync(bytes).length,sha256:createHash('sha256').update(bytes).digest('hex')}); }
  }
}
await walk(resolve('dist'));
const manifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));
function entryFiles(entry) {
  const all = new Set([entry]);
  function add(key) { const item=manifest[key]; all.add(item.file); for (const imp of item.imports||[]) add(imp); }
  add(entry); for (const file of ['content.js','deck-model.js','visual.js','legacy-bridge.js']) all.add(file);
  return [...all].sort();
}
const entries={};
for (const entry of ['index.html','vanilla.html']) {
  const paths=entryFiles(entry); const own=files.filter(f=>paths.includes(f.path));
  entries[entry]={files:paths,rawBytes:own.reduce((s,f)=>s+f.bytes,0),sumIndividualGzipBytes:own.reduce((s,f)=>s+f.gzipBytes,0)};
}
const result={capturedAt:new Date().toISOString(),head:'a1b621c26d7e124a3c8d33eb288723ac7683c950',node:process.version,checks,files,manifest,entries,limitations:['Small isolated fixture; not full app conversion or functionally equal vanilla/React benchmark','Static production outputs and Node VM initialization only; no browser UI, file protocol, runtime perf, IME, presenter or full 20-layout regression','Gzip calculated per file offline with Node zlib; not HTTP transfer measurements; entries include shared files once each','Original app.js is never imported; legacy-bridge.js is a fixture, not actual application integration']};
await writeFile('probe-results.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({checks,entries},null,2));
