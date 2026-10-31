async page => {
  const url = 'http://127.0.0.1:4320/llm-wiki/index.html#3';
  const observe = async () => {
    await page.waitForTimeout(450);
    return page.evaluate(() => ({warning: document.querySelector('#diagnosticsBadge:not([hidden])')?.textContent || null, details: document.querySelector('#diagnosticsList')?.textContent || ''}));
  };
  const reset = async () => {
    await page.goto(url);
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#slideStage .is-active img').evaluate(img => img.decode());
    return observe();
  };
  await page.setViewportSize({width: 1440, height: 1000});
  const healthy = await reset();
  await page.evaluate(() => {document.querySelector('#slideStage .is-active h1').style.width = '2500px'; dispatchEvent(new Event('resize'));});
  const horizontalOverflow = await observe();
  await reset();
  await page.evaluate(() => {document.querySelector('#slideStage .is-active h1').style.transform = 'translateY(-1000px)'; dispatchEvent(new Event('resize'));});
  const clippedAboveSlide = await observe();
  await reset();
  await page.evaluate(() => {document.querySelector('#slideStage .is-active .markdown-body > p').style.transform = 'translateX(2000px)'; dispatchEvent(new Event('resize'));});
  const bodyOverflow = await observe();
  const restored = await reset();
  return {healthy, horizontalOverflow, clippedAboveSlide, bodyOverflow, restored};
}
