// Root-owned real browser actions, run through ego-browser nodejs.
const fs = await import('node:fs/promises');
const root = '/Users/ou9999-wdl/Documents/devday-presentation-kit';
const taskBase = root + '/research/llm-wiki-typography-20261102';
const request = JSON.parse(await fs.readFile(taskBase + '/capture-request.json','utf8'));
const base = taskBase + '/' + request.round;
const task = await taskSpace(27), page = task.page('p1');
const revision = JSON.parse(await fs.readFile(base + '/read-1440/manifest.json', 'utf8')).revision;
let results = [];
try { results = JSON.parse(await fs.readFile(base + '/reading-actions.json', 'utf8')).results; } catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const width of [390, 1440]) {
  await page.cdp('Emulation.setDeviceMetricsOverride', { width, height: width === 390 ? 844 : 1000, deviceScaleFactor: 1, mobile: false });
  const folder = base + '/actions-' + width;
  await fs.mkdir(folder, { recursive: true });
  for (const slide of [3, 5, 8, 9, 10, 11, 14, 16, 20]) {
    if (results.some(row => row.slide === slide && row.viewport.width === width)) continue;
    await page.goto('http://127.0.0.1:4330/presentations/llm-wiki/read.html?actions=' + width + '-' + slide + '#' + slide);
    await page.waitForFunction(rev => document.body.dataset.mode === 'read' && window.PRESENTATION?.document.revision === rev && document.querySelectorAll('#slideStage .slide').length === 26, revision);
    await page.waitForFunction(n => { const r = document.querySelector('.slide[data-index="' + (n - 1) + '"]').getBoundingClientRect(); return Number(document.querySelector('.slide.is-active').dataset.index) === n - 1 && r.top >= 90 && r.top < 94 && document.fonts.status === 'loaded' && [...document.images].every(img => img.complete && img.naturalWidth > 0); }, slide);
    const selector = '.slide[data-index="' + (slide - 1) + '"] a[href*="' + (slide === 20 ? 'session-plan.html' : 'diagram-reading.html') + '"]';
    const departure = await page.evaluate(sel => { const a = document.querySelector(sel); return { text: a.textContent, href: a.href }; }, selector);
    await page.click(selector, { label: '설명 자료 열기' });
    await page.waitForSelector('.material-article');
    await page.waitForFunction(() => document.fonts.status === 'loaded');
    const observation = await page.evaluate(() => {
      const heading = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : document.querySelector('.material-article h1');
      if (!heading) throw new Error('Missing destination heading');
      const section = [heading];
      if (location.hash) {
        for (let next = heading.nextElementSibling; next && next.tagName !== 'H2'; next = next.nextElementSibling) section.push(next);
      } else section.push(document.querySelector('.material-content'));
      return { url: location.href, heading: heading.textContent, text: section.map(el => el.textContent).join('\n'),
        viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, documentWidth: document.documentElement.scrollWidth,
        fonts: [...document.querySelectorAll('.material-content p,.material-content li,.material-content td')].map(el => getComputedStyle(el).fontSize),
        headingTop: heading.getBoundingClientRect().top,
        tables: [...document.querySelectorAll('.material-table-scroll')].map(el => ({ clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, scrollLeft: el.scrollLeft, rows: [...el.querySelectorAll('tbody tr')].map(tr => tr.textContent.trim()) })) };
    });
    if (observation.viewport.width !== width || observation.documentWidth !== width) throw new Error('Unexpected reading width');
    if (slide !== 20 && !observation.heading.startsWith(slide + '장')) throw new Error('Wrong section');
    const screenshot = folder + '/destination-' + slide + '.png';
    await page.screenshot({ path: screenshot });
    const row = { slide, departure, ...observation, screenshot };
    if (slide !== 20) {
      await page.evaluate(n => document.querySelector('a[href="../read.html#' + n + '"]').scrollIntoView({ block: 'center', behavior: 'instant' }), slide);
      row.sectionEndScreenshot = folder + '/destination-' + slide + '-end.png';
      await page.screenshot({ path: row.sectionEndScreenshot });
    }
    if (slide === 20) {
      await page.screenshot({ path: folder + '/session-plan-full.png', fullPage: true });
      await page.evaluate(() => document.querySelector('.material-table-scroll').scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForFunction(() => { const r = document.querySelector('.material-table-scroll').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
      await page.focus('.material-table-scroll');
      await page.screenshot({ path: folder + '/table-left.png' });
      if (width === 390) {
        const region = await page.evaluate(() => { const el = document.querySelector('.material-table-scroll'), r = el.getBoundingClientRect(); return { x:r.x+r.width/2,y:r.y+r.height/2,max:el.scrollWidth-el.clientWidth }; });
        await page.mouse.move(region.x,region.y);
        await page.mouse.wheel(region.max+100,0,{label:'활동 표 오른쪽 읽기'});
        await page.waitForFunction(() => { const el = document.querySelector('.material-table-scroll'); return el.scrollLeft >= el.scrollWidth - el.clientWidth - 1; });
      }
      row.scrollInput = 'horizontal-wheel-over-observed-table';
      row.tableAfterScroll = await page.evaluate(() => { const el = document.querySelector('.material-table-scroll'); return { clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, scrollLeft: el.scrollLeft, rect:el.getBoundingClientRect().toJSON() }; });
      await page.screenshot({ path: folder + '/table-right.png' });
      if (width === 390 && row.tableAfterScroll.scrollLeft < row.tableAfterScroll.scrollWidth - row.tableAfterScroll.clientWidth - 1) throw new Error('Table did not reach right edge');
    }
    const backSelector = slide === 20 ? 'a[href="../read.html#20"]' : 'a[href="../read.html#' + slide + '"]';
    await page.click(backSelector, { label: '발표 장으로 돌아가기' });
    await page.waitForFunction(n => location.pathname.endsWith('/read.html') && Number(location.hash.slice(1)) === n && document.querySelectorAll('#slideStage .slide').length === 26, slide);
    row.returned = await page.evaluate(() => ({ url: location.href, mode: document.body.dataset.mode, revision: window.PRESENTATION.document.revision }));
    if (row.returned.revision !== revision) throw new Error('Return used stale source');
    results.push(row);
    await fs.writeFile(base + '/reading-actions.json', JSON.stringify({ revision, complete: false, results }, null, 2) + '\n');
    console.log({ width, slide, heading: observation.heading, returned: true });
  }
}
await fs.writeFile(base + '/reading-actions.json', JSON.stringify({ revision, complete: true, results }, null, 2) + '\n');
console.log({ complete: true, actions: results.length });
