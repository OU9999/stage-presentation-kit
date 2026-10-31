async page => {
  const base = 'http://127.0.0.1:4320/llm-wiki/';
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.setViewportSize({width: 1440, height: 1000});
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto(base + 'index.html');
  await page.reload();
  await page.locator('#slideStage .is-active').waitFor();
  const expected = await page.evaluate(() => ({revision: window.PRESENTATION.document.revision, theme: window.PRESENTATION.theme, titles: window.PRESENTATION.slides.map(s => s.title)}));
  if (expected.titles.length !== 48) throw new Error('Expected the expanded 48-slide deck');
  if (expected.theme !== 'paper') throw new Error('Expected the new paper presentation design');
  const slides = [];
  for (let n = 1; n <= expected.titles.length; n++) {
    await page.goto(base + 'index.html#' + n);
    await page.waitForFunction(i => document.querySelector('#slideStage .is-active')?.dataset.index === String(i), n - 1);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#slideStage .is-active img').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode().catch(() => {}))));
    // Runtime geometry diagnostics are debounced by 220ms after navigation.
    await page.waitForTimeout(350);
    const observed = await page.evaluate(() => {
      const slide = document.querySelector('#slideStage .is-active');
      const body = slide.querySelector('.slide-body');
      const bounds = body.getBoundingClientRect();
      const tolerance = 6 * slide.getBoundingClientRect().width / 1600;
      const outside = (r, c = bounds) => r.left < c.left - tolerance || r.top < c.top - tolerance || r.right > c.right + tolerance || r.bottom > c.bottom + tolerance;
      const overflow = [...body.querySelectorAll('.block-node,.md-media figcaption')].flatMap(node => {
        if (!node.getBoundingClientRect().width || node.closest('.blocks-scroll')) return [];
        // Font ascenders may extend above an h1 line box while remaining safely
        // inside the slide. Detect clipping against the actual slide for h1.
        const local = node.matches('h1') ? slide.getBoundingClientRect() : node.closest('.md-tile')?.getBoundingClientRect() || bounds;
        const range = document.createRange(); range.selectNodeContents(node);
        const glyphs = range.getBoundingClientRect();
        return outside(node.getBoundingClientRect(), local) || (glyphs.width && outside(glyphs, local)) ? [node.textContent.slice(0, 100)] : [];
      });
      const heading = slide.querySelector('h1');
      const headingStyle = getComputedStyle(heading);
      const headingLines = heading.getBoundingClientRect().height / (parseFloat(headingStyle.lineHeight) * slide.getBoundingClientRect().width / 1600);
      return {
        n: Number(slide.dataset.index) + 1, title: heading.textContent,
        revision: window.PRESENTATION.document.revision,
        theme: slide.dataset.theme, composition: slide.dataset.composition, headingLines: Math.round(headingLines * 100) / 100,
        overflow, diagnostic: document.querySelector('#diagnosticsBadge:not([hidden])')?.textContent || null,
        images: [...slide.querySelectorAll('img')].map(img => ({src: img.getAttribute('src'), alt: img.alt, width: img.naturalWidth, height: img.naturalHeight, fit: getComputedStyle(img).objectFit})),
        links: [...slide.querySelectorAll('a')].map(a => ({text: a.textContent, href: a.getAttribute('href')})),
        clippedScroll: [...body.querySelectorAll('.blocks-scroll')].filter(el => el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2).length
      };
    });
    const screenshot = '.playwright-cli/expanded-slide-' + String(n).padStart(2, '0') + '.png';
    await page.locator('#slideStage .is-active').screenshot({path: screenshot});
    slides.push({...observed, screenshot});
  }
  const compact = [];
  await page.setViewportSize({width: 960, height: 700});
  for (const n of [3, 6, 7, 11, 12, 14, 17, 20, 23, 25, 26, 27, 29, 31, 32, 33, 35, 39, 40, 41, 46, 48]) {
    await page.goto(base + 'index.html#' + n);
    await page.locator('#slideStage .is-active').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(350);
    compact.push(await page.evaluate(() => ({index: document.querySelector('#slideStage .is-active').dataset.index, diagnostic: document.querySelector('#diagnosticsBadge:not([hidden])')?.textContent || null, width: document.documentElement.scrollWidth, viewport: innerWidth})));
  }
  const reading = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(base + 'read.html');
    await page.locator('#slideStage .slide').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    reading.push(await page.evaluate(() => ({width: innerWidth, documentWidth: document.documentElement.scrollWidth, count: document.querySelectorAll('#slideStage .slide').length, titles: [...document.querySelectorAll('#slideStage .slide h1')].map(el => el.textContent), images: [...document.querySelectorAll('#slideStage img')].map(img => ({alt: img.alt, fit: getComputedStyle(img).objectFit}))})));
  }
  const materials = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 900});
    for (const name of ['index', 'study-guide', 'workshop', 'speaker-script', 'reference-library', 'demo-log', 'session-plan']) {
      await page.goto(base + 'materials/' + name + '.html');
      await page.evaluate(() => document.fonts.ready);
      materials.push(await page.evaluate(() => ({path: location.pathname, width: innerWidth, documentWidth: document.documentElement.scrollWidth, title: document.querySelector('h1')?.textContent, mainFontSize: getComputedStyle(document.querySelector('.material-content')).fontSize, brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth).length})));
    }
  }
  await page.setViewportSize({width: 1440, height: 1000});
  await page.goto(base + 'index.html#1');
  await page.keyboard.press('End');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '47');
  await page.keyboard.press('Home');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '0');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '1');
  await page.goto(base + 'index.html#3');
  return {base, expected, slides, compact, reading, materials, navigation: {end: 48, home: 1, right: 2}, errors};
}
