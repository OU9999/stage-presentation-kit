import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = 'http://127.0.0.1:4320/llm-wiki/';
const out = '/Users/ou9999/Documents/stage-presentation-kit/research/llm-wiki-devday-20261031/evidence/';

// The high-level navigation wrapper sometimes missed completion events after
// the local document had fully loaded. Stay in the same owned Page and wait
// for the resulting document through CDP and an observable readyState instead.
export async function navigate(page, url) {
  const result = await page.cdp('Page.navigate', { url });
  if (result.errorText) throw new Error(result.errorText);
  await page.waitForFunction(expected => location.href === expected && document.readyState === 'complete', url);
}

export async function viewport(page, width, height = 1000) {
  await page.cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
}

async function settled(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('#slideStage .is-active img')].map(img => img.decode().catch(() => {})));
    window.__qaDiagnosticsReady = false;
    const badge = document.getElementById('diagnosticsBadge');
    const observer = new MutationObserver(() => {
      observer.disconnect();
      window.__qaDiagnosticsReady = true;
    });
    observer.observe(badge, { attributes: true, childList: true });
    window.dispatchEvent(new Event('resize'));
  });
  await page.waitForFunction(() => window.__qaDiagnosticsReady === true);
}

export async function checkSlides(page, first, last, width = 1440, screenshots = true) {
  await viewport(page, width, width === 1440 ? 1000 : 700);
  await page.cdp('Page.addScriptToEvaluateOnNewDocument', { source: 'if (!window.__stageQaErrors) { window.__stageQaErrors = []; addEventListener("error", e => window.__stageQaErrors.push(String(e.message))); addEventListener("unhandledrejection", e => window.__stageQaErrors.push(String(e.reason))); }' });
  await navigate(page, base + 'index.html#' + first);
  await viewport(page, width, width === 1440 ? 1000 : 700);
  await page.waitForFunction(() => window.PRESENTATION?.slides?.length === 48);
  const sourceRevision = createHash('sha256').update(await readFile('/Users/ou9999/Documents/stage-presentation-kit/talks/llm-wiki/slides.md')).digest('hex');
  await page.waitForFunction(expected => window.PRESENTATION?.document?.revision === expected, sourceRevision);
  const revision = await page.evaluate(() => window.PRESENTATION.document.revision);
  const slides = [];
  for (let n = first; n <= last; n++) {
    if (n > first) await page.keyboard.press('ArrowRight');
    await page.waitForFunction(i => document.querySelector('#slideStage .is-active')?.dataset.index === String(i), n - 1);
    await settled(page);
    const observed = await page.evaluate(() => {
      const slide = document.querySelector('#slideStage .is-active');
      const body = slide.querySelector('.slide-body');
      const bounds = body.getBoundingClientRect();
      const rect = slide.getBoundingClientRect();
      const tolerance = 6 * rect.width / 1600;
      const outside = (r, c) => r.left < c.left - tolerance || r.top < c.top - tolerance || r.right > c.right + tolerance || r.bottom > c.bottom + tolerance;
      const overflow = [...body.querySelectorAll('.block-node,.md-media figcaption')].flatMap(node => {
        if (!node.getBoundingClientRect().width || node.closest('.blocks-scroll')) return [];
        const local = node.matches('h1') ? rect : node.closest('.md-tile')?.getBoundingClientRect() || bounds;
        const range = document.createRange(); range.selectNodeContents(node);
        const glyphs = range.getBoundingClientRect();
        return outside(node.getBoundingClientRect(), local) || (glyphs.width && outside(glyphs, local)) ? [node.textContent.slice(0, 100)] : [];
      });
      return {
        n: Number(slide.dataset.index) + 1,
        viewport: innerWidth,
        title: slide.querySelector('h1')?.textContent,
        revision: window.PRESENTATION.document.revision,
        theme: window.PRESENTATION.theme,
        composition: slide.dataset.composition, variant: slide.dataset.variant,
        expectedVariant: window.PRESENTATION.slides[Number(slide.dataset.index)].view?.variant,
        canvas: getComputedStyle(slide).backgroundColor,
        overflow,
        diagnostic: document.querySelector('#diagnosticsBadge:not([hidden])')?.textContent || null,
        diagnosticMessages: [...document.querySelectorAll('#diagnosticsList li')].map(el => el.textContent),
        brokenImages: [...slide.querySelectorAll('img')].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
        imageSources: [...slide.querySelectorAll('img')].map(img => img.getAttribute('src')),
        youtubeLinks: [...slide.querySelectorAll('a')].filter(a => /youtu(?:be\.com|\.be)/i.test(a.href)).map(a => a.href),
        errors: window.__stageQaErrors || [],
        clippedScroll: [...body.querySelectorAll('.blocks-scroll')].filter(el => el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2).length,
        clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      };
    });
    if (observed.revision !== revision) throw new Error('Source changed during review; do not combine revisions');
    if (screenshots) await page.screenshot({ path: out + 'screens/slide-' + String(n).padStart(2, '0') + '.png', clip: observed.clip });
    slides.push(observed);
  }
  const report = { revision, width, slides };
  await writeFile(out + 'slides-' + width + '-' + first + '-' + last + '.json', JSON.stringify(report, null, 2) + '\n');
  return { revision, width, count: slides.length, issues: slides.filter(s => s.viewport !== width || s.overflow.length || s.diagnostic || s.brokenImages.length || s.youtubeLinks.length || s.errors.length || s.theme !== 'stage' || s.variant !== s.expectedVariant) };
}

export async function checkReadingAndMaterials(page) {
  const reports = await page.evaluate(async () => {
    const rows = [], paths = ['read.html', ...['index', 'study-guide', 'workshop', 'speaker-script', 'reference-library', 'demo-log', 'session-plan'].map(name => 'materials/' + name + '.html')];
    for (const width of [1440, 390]) for (const path of paths) {
      const frame = document.createElement('iframe'); frame.style.cssText = 'display:block;border:0;height:900px;width:' + width + 'px';
      const loaded = new Promise((resolve, reject) => { frame.onload = resolve; frame.onerror = () => reject(new Error(path)); });
      frame.src = 'http://127.0.0.1:4320/llm-wiki/' + path; document.body.append(frame); await loaded;
      const doc = frame.contentDocument, win = frame.contentWindow; await doc.fonts.ready;
      rows.push({
        path, width, viewport: win.innerWidth, documentWidth: doc.documentElement.scrollWidth,
        title: doc.querySelector('h1')?.textContent, slides: doc.querySelectorAll('#slideStage .slide').length,
        textSize: win.getComputedStyle(doc.querySelector('.markdown-body,.material-content')).fontSize,
        youtubeLinks: [...doc.querySelectorAll('a')].filter(a => /youtu(?:be\.com|\.be)/i.test(a.href)).map(a => a.href),
        oldContext: /세 영상|첫 영상|공동 세미나|브라이언|용담|brian-video|yongdam-video|seminar-video/.test(doc.body.textContent)
      });
      frame.remove();
    }
    return rows;
  });
  await writeFile(out + 'reading-materials.json', JSON.stringify(reports, null, 2) + '\n');
  return { count: reports.length, issues: reports.filter(r => r.viewport !== r.width || r.documentWidth > r.width + 1 || r.youtubeLinks.length || r.oldContext) };
}

export async function checkCompactFrame(page) {
  const rows = await page.evaluate(async () => {
    const frame = document.createElement('iframe'); frame.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;display:block;border:0;height:700px;width:960px';
    const loaded = new Promise(resolve => { frame.onload = resolve; });
    frame.src = 'http://127.0.0.1:4320/llm-wiki/index.html#1'; document.body.append(frame); await loaded;
    const win = frame.contentWindow, doc = frame.contentDocument, rows = []; await doc.fonts.ready;
    for (let n = 1; n <= 48; n++) {
      win.location.hash = String(n);
      while (doc.querySelector('#slideStage .is-active')?.dataset.index !== String(n - 1)) await new Promise(resolve => win.requestAnimationFrame(resolve));
      await Promise.all([...doc.querySelectorAll('#slideStage .is-active img')].map(img => img.decode().catch(() => {})));
      await new Promise(resolve => {
        const observer = new win.MutationObserver(() => { observer.disconnect(); resolve(); });
        observer.observe(doc.getElementById('diagnosticsBadge'), { attributes: true, childList: true });
        win.dispatchEvent(new win.Event('resize'));
      });
      rows.push({ n, width: win.innerWidth, documentWidth: doc.documentElement.scrollWidth, revision: win.PRESENTATION.document.revision,
        diagnostic: doc.querySelector('#diagnosticsBadge:not([hidden])')?.textContent || null,
        brokenImages: [...doc.querySelectorAll('#slideStage .is-active img')].filter(img => !img.naturalWidth).length });
    }
    frame.remove(); return rows;
  });
  await writeFile(out + 'compact-960.json', JSON.stringify(rows, null, 2) + '\n');
  return { count: rows.length, issues: rows.filter(r => r.width !== 960 || r.documentWidth > 961 || r.diagnostic || r.brokenImages) };
}

export async function checkSvg(page, names) {
  const reports = [];
  for (const name of names) {
    await navigate(page, 'file:///Users/ou9999/Documents/stage-presentation-kit/talks/llm-wiki/assets/expanded/' + name);
    await page.evaluate(() => document.fonts.ready);
    reports.push(await page.evaluate(name => {
      const svg = document.querySelector('svg'), v = svg.viewBox.baseVal;
      const boxes = [...svg.querySelectorAll('text')].map(el => { const b = el.getBBox(); return { text: el.textContent, x: b.x, y: b.y, w: b.width, h: b.height }; });
      const outside = boxes.filter(b => b.x < v.x - 1 || b.y < v.y - 1 || b.x + b.w > v.x + v.width + 1 || b.y + b.h > v.y + v.height + 1);
      const overlaps = [];
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 1 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 1) overlaps.push([a.text, b.text]);
      }
      return { name, textCount: boxes.length, outside, overlaps };
    }, name));
  }
  await writeFile(out + 'svg-bounds.json', JSON.stringify(reports, null, 2) + '\n');
  return { count: reports.length, issues: reports.filter(r => r.outside.length || r.overlaps.length) };
}

export async function checkNavigation(page, task) {
  await navigate(page, base + 'index.html#1');
  // Native pointer input uses the real window; viewport emulation is reserved
  // for the geometry checks above.
  await page.cdp('Emulation.clearDeviceMetricsOverride');
  const walk = JSON.parse(await readFile(out + 'slides-960-1-48.json', 'utf8')).slides.map(slide => slide.n);
  await page.click('#slideStage .is-active', { label: '발표 화면에 포커스' });
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '1');
  await page.keyboard.press('ArrowLeft');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '0');
  await navigate(page, base + 'index.html#40');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '39');
  console.log({ checked: 'keyboard and previous 1-to-48 walk' });
  await page.keyboard.press('o');
  await page.waitForSelector('#overviewDialog', { state: 'visible' });
  const overview = await page.evaluate(() => document.querySelectorAll('#overviewGrid .overview-card').length);
  await page.click('#overviewGrid .overview-card:nth-child(40)', { label: '진행안 슬라이드 선택' });
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '39');
  console.log({ checked: 'overview', overview });
  const popupPending = page.waitForEvent('popup');
  await page.keyboard.press('p');
  const popup = await popupPending;
  await popup.waitForFunction(() => document.querySelector('#presenterPosition')?.textContent === '40 / 48');
  await popup.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '40');
  await page.keyboard.press('ArrowRight');
  await popup.waitForFunction(() => document.querySelector('#presenterPosition')?.textContent === '42 / 48');
  await popup.close();
  console.log({ checked: 'presenter in both directions' });
  const clicks = [];
  for (const [n, name] of [[40, 'session-plan'], [46, 'workshop'], [48, 'study-guide']]) {
    await navigate(page, base + 'index.html#' + n);
    await page.waitForFunction(i => document.querySelector('#slideStage .is-active')?.dataset.index === String(i), n - 1);
    const selector = '#slideStage .is-active a[href$="materials/' + name + '.html"]';
    const target = await page.evaluate(selector => document.querySelector(selector)?.target, selector);
    const opened = target === '_blank' ? page.waitForEvent('popup') : Promise.resolve(page);
    await page.click(selector, { label: '연결된 학습 자료 확인' });
    const destination = await opened;
    await destination.waitForSelector('article h1', { state: 'visible' });
    clicks.push(await destination.evaluate(() => ({ url: location.href, title: document.querySelector('article h1')?.textContent })));
    if (destination !== page) await destination.close();
    console.log({ checked: 'material link', slide: n, name });
  }
  await navigate(page, base + 'index.html#1');
  await page.keyboard.press('End');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '47');
  await page.keyboard.press('Home');
  await page.waitForFunction(() => document.querySelector('#slideStage .is-active')?.dataset.index === '0');
  const observed = await page.evaluate(() => ({ revision: window.PRESENTATION.document.revision, errors: window.__stageQaErrors || [] }));
  const result = { ...observed, walkEvidence: 'slides-960-1-48.json', walk, overview, presenterToStage: 41, stageToPresenter: '42 / 48', clicks, end: 48, home: 1 };
  await writeFile(out + 'navigation.json', JSON.stringify(result, null, 2) + '\n');
  return result;
}
