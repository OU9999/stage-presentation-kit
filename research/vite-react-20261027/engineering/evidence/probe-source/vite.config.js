import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  base: '/stage-presentation-kit/',
  build: { manifest: true, rolldownOptions: { input: {
    editor: resolve(import.meta.dirname, 'index.html'),
    vanilla: resolve(import.meta.dirname, 'vanilla.html')
  } } }
});
