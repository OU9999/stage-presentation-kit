async page => {
  const base = 'http://127.0.0.1:4320/llm-wiki/';
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'index.html#1');
  const actual = () => page.locator('#slideStage .is-active').getAttribute('data-index');
  const walk = [Number(await actual())+1];
  for(let n=2;n<=48;n++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(i=>document.querySelector('#slideStage .is-active')?.dataset.index===String(i),n-1);
    walk.push(Number(await actual())+1);
  }
  await page.keyboard.press('o');
  await page.locator('#overviewDialog').waitFor({state:'visible'});
  const overview = await page.locator('#overviewGrid .overview-card').count();
  await page.locator('#overviewGrid .overview-card').nth(39).click();
  await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='39');
  const overviewSelection=Number(await actual())+1;
  const popupPending=page.waitForEvent('popup');
  await page.keyboard.press('p');
  const popup=await popupPending;
  await popup.waitForLoadState();
  await popup.waitForFunction(()=>document.querySelector('#presenterPosition')?.textContent==='40 / 48');
  await popup.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='40');
  const presenterToStage=Number(await actual())+1;
  await page.keyboard.press('ArrowRight');
  await popup.waitForFunction(()=>document.querySelector('#presenterPosition')?.textContent==='42 / 48');
  const stageToPresenter=await popup.locator('#presenterPosition').textContent();
  await popup.close();
  const clicks=[];
  for(const [n,tail] of [[40,'session-plan.html'],[41,'session-plan.html'],[46,'workshop.html'],[48,'study-guide.html']]) {
    await page.goto(base+'index.html#'+n);
    const chosen=page.locator('#slideStage .is-active a[href*="materials/'+tail+'"]');
    const target=await chosen.getAttribute('target');
    const opened = target==='_blank' ? page.waitForEvent('popup') : Promise.resolve(page);
    await chosen.click();
    const destination=await opened;
    await destination.waitForLoadState();
    await destination.locator('article h1').waitFor();
    clicks.push({slide:n,url:destination.url(),title:await destination.locator('article h1').textContent()});
    if(destination!==page) await destination.close();
  }
  await page.goto(base+'index.html#1');
  await page.keyboard.press('End');
  await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='47');
  const end=Number(await actual())+1;
  await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.querySelector('#slideStage .is-active')?.dataset.index==='0');
  const home=Number(await actual())+1;
  const revision=await page.evaluate(()=>window.PRESENTATION.document.revision);
  return {revision,walk,overview,overviewSelection,presenterToStage,stageToPresenter,clicks,end,home};
}
