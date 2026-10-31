async page => {
  const assets=__ASSETS__;
  const results=[];
  for(const name of assets) {
    await page.goto('file:///home/omh23/stage-presentation-kit/talks/llm-wiki/assets/expanded/'+name);
    await page.evaluate(()=>document.fonts.ready);
    results.push(await page.evaluate(name=>{
      const svg=document.querySelector('svg'),v=svg.viewBox.baseVal;
      const boxes=[...svg.querySelectorAll('text')].map(el=>{const b=el.getBBox();return{text:el.textContent,x:b.x,y:b.y,w:b.width,h:b.height};});
      const outside=boxes.filter(b=>b.x<v.x-1||b.y<v.y-1||b.x+b.w>v.x+v.width+1||b.y+b.h>v.y+v.height+1);
      const overlaps=[];
      for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
        const a=boxes[i],b=boxes[j];
        if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>1 && Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>1)
          overlaps.push([a.text,b.text]);
      }
      return{name,textCount:boxes.length,viewBox:[v.width,v.height],outside,overlaps};
    },name));
  }
  return results;
}
