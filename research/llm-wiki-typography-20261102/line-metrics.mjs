// Browser-side observation: actual glyph rows, not aesthetic verdicts.
export function collectLineMetrics() {
  const slide = document.querySelector('#slideStage .is-active');
  const stage = slide.getBoundingClientRect(), scale = stage.width / 1600;
  const logical = box => ({x:(box.x-stage.x)/scale,y:(box.y-stage.y)/scale,width:box.width/scale,height:box.height/scale});
  const groups = [...slide.querySelectorAll('.md-group')];
  const targets = [...slide.querySelectorAll('.slide-title,.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body p,.markdown-body li,.markdown-body th,.markdown-body td,.markdown-body pre')];
  return targets.filter(el => !el.matches('li') || !el.querySelector('p')).map(el => {
    const style = getComputedStyle(el), box = el.getBoundingClientRect();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), glyphs = [], breakPositions=[];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.ELEMENT_NODE) { if (node.tagName === 'BR') breakPositions.push(glyphs.length); continue; }
      let offset = 0;
      for (const char of node.textContent) {
        const range = document.createRange(); range.setStart(node, offset); range.setEnd(node, offset + char.length); offset += char.length;
        const rect = range.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) glyphs.push({ char, x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom });
      }
    }
    const lines = [];
    for (const glyph of glyphs) {
      let line = lines.find(line => Math.abs(line.y - glyph.y) < 5 * scale);
      if (!line) { line = { text:'', x:glyph.x, y:glyph.y, right:glyph.right, bottom:glyph.bottom }; lines.push(line); }
      line.text += glyph.char; line.x = Math.min(line.x,glyph.x); line.right = Math.max(line.right,glyph.right); line.bottom = Math.max(line.bottom,glyph.bottom);
    }
    const group = el.closest('.md-group');
    const breaks = breakPositions.map(index => {
      const before = glyphs.slice(0,index).filter(g=>g.char.trim()), after=glyphs.slice(index).filter(g=>g.char.trim());
      const point = g => g ? {x:(g.x-stage.x)/scale,y:(g.y-stage.y)/scale} : null;
      return {beforeText:glyphs.slice(0,index).map(g=>g.char).join('').trim(),afterText:glyphs.slice(index).map(g=>g.char).join('').trim(),beforeGlyph:point(before.at(-1)),afterGlyph:point(after[0])};
    });
    return { tag:el.tagName,classes:el.className,sourceLine:el.closest('[data-source-line]')?.dataset.sourceLine,text:el.textContent,
      parentGroup:group?{index:groups.indexOf(group),heading:group.querySelector('h2')?.textContent||null,sourceLine:group.dataset.sourceLine||null,logicalBox:logical(group.getBoundingClientRect())}:null,
      domParent:{tag:el.parentElement.tagName,classes:el.parentElement.className},directBody:el.parentElement.matches('.markdown-body'),breaks,
      emphasis:[...el.querySelectorAll('strong,em')].map(e=>({tag:e.tagName,text:e.textContent})),
      fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,color:style.color,wordBreak:style.wordBreak,overflowWrap:style.overflowWrap,textWrap:style.textWrap,whiteSpace:style.whiteSpace,
      effectivePixels:parseFloat(style.fontSize)*scale, logicalBox:logical(box),
      lines:lines.map(line => ({text:line.text.trim(),x:(line.x-stage.x)/scale,y:(line.y-stage.y)/scale,width:(line.right-line.x)/scale,height:(line.bottom-line.y)/scale})) };
  });
}
