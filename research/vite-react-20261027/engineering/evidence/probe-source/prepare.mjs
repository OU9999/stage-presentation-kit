import { copyFile, readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const repo = resolve(process.argv[2]);
await mkdir('public', { recursive: true });
for (const file of ['deck-model.js', 'visual.js']) {
  const bytes = await readFile(resolve(repo, file));
  await copyFile(resolve(repo, file), resolve('public', file));
  console.log(file, createHash('sha256').update(bytes).digest('hex'));
}
