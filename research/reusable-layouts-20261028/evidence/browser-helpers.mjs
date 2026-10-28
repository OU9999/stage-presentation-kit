// Helpers for the root-owned Ego TaskSpace. Callers own navigation and viewport.
export async function captureSlide(page, url, filename, { stageOnly = false, theme } = {}) {
  await page.goto(url);
  await page.waitForSelector("#slideStage .is-active");
  if (theme) await page.selectOption("#themeSelect", theme);
  await page.waitForFunction(() => {
    const active = document.querySelector("#slideStage .is-active");
    return document.fonts.status === "loaded" && active &&
      [...active.querySelectorAll("img")].every(img => img.complete) &&
      document.getAnimations().every(animation => animation.playState === "finished");
  });
  const observation = await page.evaluate(() => {
    const slide = document.querySelector("#slideStage .is-active");
    const body = slide.querySelector(".slide-body");
    const box = node => {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
    };
    const bounds = box(body), tolerance = 6 * slide.getBoundingClientRect().width / 1600;
    const outside = (r, container = bounds) => r.x < container.x - tolerance || r.y < container.y - tolerance || r.right > container.right + tolerance || r.bottom > container.bottom + tolerance;
    const overflow = [...body.querySelectorAll(".block-node,.md-media figcaption,.md-wall-label")].flatMap(node => {
      const r = box(node);
      if (!r.width || !r.height || node.closest(".blocks-scroll")) return [];
      const range = document.createRange(); range.selectNodeContents(node);
      const glyph = range.getBoundingClientRect();
      const tile = node.closest(".md-tile,.md-wall-item"), local = tile ? box(tile) : bounds;
      return outside(r, local) || (glyph.width && outside({ x: glyph.x, y: glyph.y, right: glyph.right, bottom: glyph.bottom }, local)) ? [{ tag: node.tagName, line: node.dataset.sourceLine, text: node.textContent.slice(0, 100) }] : [];
    });
    return {
      url: location.href, title: document.title, index: slide.dataset.index,
      layout: slide.dataset.layout, composition: slide.dataset.composition, variant: slide.dataset.variant,
      heading: slide.querySelector(".slide-title")?.textContent,
      headingSize: slide.querySelector(".slide-title") && getComputedStyle(slide.querySelector(".slide-title")).fontSize,
      text: body.textContent, stage: box(slide), body: bounds, overflow,
      images: [...slide.querySelectorAll("img")].map(img => ({ src: img.getAttribute("src"), alt: img.alt, complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, fit: getComputedStyle(img).objectFit, focus: getComputedStyle(img).objectPosition, box: box(img) })),
      tiles: [...slide.querySelectorAll(".md-tile,.md-wall-item")].map(node=>({kind:node.dataset.kind, tone:node.dataset.tone, text:node.textContent, box:box(node), color:getComputedStyle(node).color, background:getComputedStyle(node).backgroundColor})),
      wall: slide.querySelector(".md-wall-copy") && box(slide.querySelector(".md-wall-copy")),
      accents: [...slide.querySelectorAll("strong,.md-group h2")].map(node => ({ text: node.textContent, color: getComputedStyle(node).color })),
      diagnostic: document.getElementById("diagnosticsBadge")?.hidden === false ? document.getElementById("diagnosticsList")?.textContent : null,
      failures: performance.getEntriesByType("resource").filter(entry => entry.responseStatus >= 400).map(entry => ({ name: entry.name, status: entry.responseStatus })),
      errors: window.__renewalErrors || [],
      authoring: document.body.dataset.authoring,
      editableNodes: document.querySelectorAll('[contenteditable="true"],[contenteditable="plaintext-only"]').length,
      localStorageCalls: window.__renewalStorage || []
    };
  });
  const clip = stageOnly ? { x: observation.stage.x, y: observation.stage.y, width: observation.stage.width, height: observation.stage.height } : undefined;
  if (filename) await page.screenshot({ path: filename, ...(clip ? { clip } : {}) });
  return { ...observation, filename };
}

export async function prepare(page) {
  await page.cdp("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await page.cdp("Page.addScriptToEvaluateOnNewDocument", { source: "window.__renewalErrors=[];window.__renewalStorage=[];addEventListener('error',e=>{if(e.message)window.__renewalErrors.push(e.message)});addEventListener('unhandledrejection',e=>window.__renewalErrors.push(String(e.reason)));for(const method of ['getItem','setItem','removeItem']){const original=Storage.prototype[method];Storage.prototype[method]=function(key,...rest){if(this===localStorage&&String(key).startsWith('stage-kit:')){window.__renewalStorage.push({method,key});return method==='getItem'?null:undefined;}return original.call(this,key,...rest);};}" });
}
