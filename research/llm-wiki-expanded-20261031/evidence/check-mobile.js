async page => {
  await page.setViewportSize({width:390,height:900});
  await page.goto('http://127.0.0.1:4320/llm-wiki/materials/session-plan.html');
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:'research/llm-wiki-expanded-20261031/evidence/screens/mobile-session-plan.png'});
  await page.getByRole('heading',{name:'15분 진행안',exact:true}).scrollIntoViewIfNeeded();
  await page.screenshot({path:'research/llm-wiki-expanded-20261031/evidence/screens/mobile-session-activities.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:4320/llm-wiki/index.html#40');
  return {screens:['mobile-session-plan.png','mobile-session-activities.png'],restoredSlide:40};
}
