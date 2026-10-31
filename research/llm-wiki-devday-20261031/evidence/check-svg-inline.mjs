import { readFile, writeFile } from 'node:fs/promises';

const folder = '/Users/ou9999/Documents/stage-presentation-kit/talks/llm-wiki/assets/expanded/';
const evidence = '/Users/ou9999/Documents/stage-presentation-kit/research/llm-wiki-devday-20261031/evidence/';

export async function checkSvgInline(page, names, viewport) {
  const assets = await Promise.all(names.map(async name => ({ name, xml: await readFile(folder + name, 'utf8') })));
  const rows = await page.evaluate(async assets => {
    const holder = document.createElement('div'); holder.style.cssText = 'position:absolute;left:-10000px;top:0;width:1500px'; document.body.append(holder);
    const svgs = assets.map(asset => {
      const svg = document.importNode(new DOMParser().parseFromString(asset.xml, 'image/svg+xml').documentElement, true);
      holder.append(svg); return { name: asset.name, svg };
    });
    await document.fonts.ready;
    const results = svgs.map(({ name, svg }) => {
      const v = svg.viewBox.baseVal;
      const boxes = [...svg.querySelectorAll('text')].map(el => { const b = el.getBBox(); return { text: el.textContent, x: b.x, y: b.y, w: b.width, h: b.height }; });
      const outside = boxes.filter(b => b.x < -1 || b.y < -1 || b.x + b.w > v.width + 1 || b.y + b.h > v.height + 1);
      const overlaps = [];
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 1 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 1) overlaps.push([a.text, b.text]);
      }
      return { name, textCount: boxes.length, outside, overlaps };
    });
    holder.remove(); return results;
  }, assets);
  await writeFile(evidence + 'svg-bounds.json', JSON.stringify(rows, null, 2) + '\n');
  await viewport(page, 1500, 600);
  for (const asset of assets.filter(a => ['five-layers.svg', 'reflection-layers.svg'].includes(a.name))) {
    await page.evaluate(async asset => {
      document.getElementById('__svgPreview')?.remove();
      const holder = document.createElement('div'); holder.id = '__svgPreview'; holder.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;width:1500px;height:600px;background:#080808';
      holder.append(document.importNode(new DOMParser().parseFromString(asset.xml, 'image/svg+xml').documentElement, true)); document.body.append(holder);
      await document.fonts.ready;
    }, asset);
    await page.screenshot({ path: evidence + 'screens/asset-' + asset.name.replace('.svg', '.png'), clip: { x: 0, y: 0, width: 1500, height: 600 } });
  }
  await page.evaluate(() => document.getElementById('__svgPreview')?.remove());
  return { count: rows.length, issues: rows.filter(r => r.outside.length || r.overlaps.length) };
}
