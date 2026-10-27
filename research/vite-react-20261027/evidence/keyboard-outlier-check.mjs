const fs = await import('node:fs/promises');
const task=await taskSpace(34), page=task.page('p1');
const previous=await page.evaluate(()=>({url:location.href,longTasks:window.__audit.longTasks,keyboard:window.__audit.navigation}));
await page.evaluate(()=>{window.__audit.navigation=[];window.__audit.longTasks=[];});
let expected=0;
for(let pass=0;pass<2;pass++) {
  for(const key of ['Home',...Array(7).fill('ArrowRight')]) {
    await page.keyboard.press(key);
    await page.waitForFunction(count=>window.__audit.navigation.length>=count,++expected);
  }
}
const repeat=await page.evaluate(()=>({url:location.href,longTasks:window.__audit.longTasks,keyboard:window.__audit.navigation}));
const result={head:'a1b621c26d7e124a3c8d33eb288723ac7683c950',capturedAt:new Date().toISOString(),reason:'Investigate one 249.7ms synchronous keyboard sample on text-layout; same browser and source, no code changes.',previous,repeat,limitations:['Diagnostic event processing excludes deferred layout and paint.','Two local repetitions cannot establish p75/p95 or field INP.','An unreplicated slow sample is preserved; this is not a causal performance trace.']};
await fs.writeFile('/Users/ou9999-wdl/Documents/devday-presentation-kit/research/vite-react-20261027/evidence/keyboard-outlier-check.json',JSON.stringify(result,null,2)+'\n');
console.log({events:repeat.keyboard.length,maxSyncMs:Math.max(...repeat.keyboard.map(x=>x.syncEventMs)),longTasks:repeat.longTasks});
