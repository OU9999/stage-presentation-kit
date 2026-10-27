# Isolated STAGE Vite/React build probe

This folder is a minimal reproducible fixture, not the STAGE application.
Copy this folder into a new `/tmp` directory. Run all commands from that directory.
Use a checkout of STAGE HEAD `a1b621c26d7e124a3c8d33eb288723ac7683c950` as `REPO_PATH`.

```sh
node prepare.mjs "$REPO_PATH"
npm ci --ignore-scripts --no-audit --no-fund
npm run build
node verify.mjs "$REPO_PATH"
```

`prepare.mjs` copies the product's `deck-model.js` and `visual.js` to fixture `public/` and prints hashes.
Neither `app.js` nor product CSS/layouts are imported. `legacy-bridge.js` is a fixture.
The editor entry eagerly imports React/ReactDOM; the vanilla entry only mounts the legacy preview/status.
The two entries are not a functionally equivalent performance comparison.

The production build preserves public classic scripts while bundling only the module entries.
Warnings about non-module classic scripts are expected for this boundary.
`verify.mjs` checks emitted tags/base/order and file identity, explicitly runs classic globals in a Node VM,
and checks pure valid/invalid visual commit. It does not execute DOM/React in a browser.
No file-protocol, IME, focus, storage, presenter, complete layout or performance result is claimed.

The adjacent `probe-results.json` contains exact production file sizes, hashes and raw Vite manifest object.
Gzip is an offline Node zlib estimate per file; console Vite gzip and Python baseline gzip may differ.
Do not commit generated `public/deck-model.js`, `public/visual.js`, `node_modules/`, `dist/` or result files to this source folder.
