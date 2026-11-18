// Browser-side native reading observation: CSS pixels, without the presentation 1600px scale.
export function collectReadingLineMetrics(selector) {
  const slide = document.querySelector(selector);
  const stage = slide.getBoundingClientRect(), scale = 1;
  const logical = box => ({x:(box.x-stage.x)/scale,y:(box.y-stage.y)/scale,width:box.width/scale,height:box.height/scale});
  const groups = [...slide.querySelectorAll('.md-group')];
  const targets = [...slide.querySelectorAll('.slide-title,.slide-body [data-field],.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body p,.markdown-body li,.markdown-body th,.markdown-body td,.markdown-body pre,.markdown-body figcaption')];
  return targets.filter(el => !el.matches('[data-copy-role="support"]') && (!el.matches('li') || !el.querySelector('p'))).map(el => {
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
    return { tag:el.tagName,classes:el.className,dataField:el.getAttribute('data-field'),sourceLine:el.closest('[data-source-line]')?.dataset.sourceLine,text:el.textContent,
      copyRole:el.getAttribute('data-copy-role'),logicalPixels:parseFloat(style.fontSize),rect:logical(box),
      parentGroup:group?{index:groups.indexOf(group),heading:group.querySelector('h2')?.textContent||null,sourceLine:group.dataset.sourceLine||null,logicalBox:logical(group.getBoundingClientRect())}:null,
      domParent:{tag:el.parentElement.tagName,classes:el.parentElement.className},directBody:el.parentElement.matches('.markdown-body'),breaks,
      emphasis:[...el.querySelectorAll('strong,em')].map(e=>({tag:e.tagName,text:e.textContent})),
      fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,color:style.color,wordBreak:style.wordBreak,overflowWrap:style.overflowWrap,textWrap:style.textWrap,whiteSpace:style.whiteSpace,
      effectivePixels:parseFloat(style.fontSize)*scale, logicalBox:logical(box),
      lines:lines.map(line => ({text:line.text.trim(),x:(line.x-stage.x)/scale,y:(line.y-stage.y)/scale,width:(line.right-line.x)/scale,height:(line.bottom-line.y)/scale})) };
  });
}

// Public support navigation is authored metadata, measured separately from source body nodes.
export function collectSupportLinkMetrics(selector) {
  const slide=document.querySelector(selector),origin=slide.getBoundingClientRect();
  const links=[...slide.querySelectorAll('.markdown-support a,a[data-copy-role="support"]')];
  return links.map(el=>{
    const style=getComputedStyle(el),rect=el.getBoundingClientRect(),glyphs=[];
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){let offset=0;for(const char of node.textContent){const range=document.createRange();range.setStart(node,offset);offset+=char.length;range.setEnd(node,offset);const b=range.getBoundingClientRect();if(b.width&&b.height)glyphs.push({char,x:b.x,y:b.y,right:b.right,bottom:b.bottom});}}
    const rows=[];for(const glyph of glyphs){let row=rows.find(r=>Math.abs(r.y-glyph.y)<5);if(!row){row={text:'',x:glyph.x,y:glyph.y,right:glyph.right,bottom:glyph.bottom};rows.push(row);}row.text+=glyph.char;row.x=Math.min(row.x,glyph.x);row.right=Math.max(row.right,glyph.right);row.bottom=Math.max(row.bottom,glyph.bottom);}
    let visible=rect.width>0&&rect.height>0,opacity=1;for(let parent=el;parent;parent=parent.parentElement){const s=getComputedStyle(parent);opacity*=parseFloat(s.opacity);visible=visible&&s.display!=='none'&&s.visibility!=='hidden'&&s.visibility!=='collapse';if(parent===slide)break;}visible=visible&&opacity>0;
    return{sourceLine:el.closest('[data-source-line]')?.getAttribute('data-source-line'),visible,href:el.href,authoredHref:el.getAttribute('href'),label:el.textContent,text:el.textContent,copyRole:el.getAttribute('data-copy-role')||el.closest('[data-copy-role]')?.getAttribute('data-copy-role'),fontSize:style.fontSize,effectivePixels:parseFloat(style.fontSize),rect:{x:rect.x-origin.x,y:rect.y-origin.y,width:rect.width,height:rect.height},lines:rows.map(r=>({text:r.text.trim(),x:r.x-origin.x,y:r.y-origin.y,width:r.right-r.x,height:r.bottom-r.y}))};
  });
}

// Read the actual public material glyph rows, including Korean words inside quotes/strong.
export function collectMaterialLineMetrics() {
  const headings=[...document.querySelectorAll('.material-content h2,.material-content h3')];
  return [...document.querySelectorAll('.material-content p')].map(el=>{
    const style=getComputedStyle(el),rows=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){let offset=0;for(const char of node.textContent){const range=document.createRange();range.setStart(node,offset);offset+=char.length;range.setEnd(node,offset);const b=range.getBoundingClientRect();if(!b.width||!b.height)continue;let row=rows.find(r=>Math.abs(r.y-b.y)<4);if(!row){row={text:'',x:b.x,y:b.y,right:b.right,bottom:b.bottom};rows.push(row);}row.text+=char;row.x=Math.min(row.x,b.x);row.right=Math.max(row.right,b.right);row.bottom=Math.max(row.bottom,b.bottom);}}
    const section=headings.filter(h=>h.compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING).at(-1)?.id||null;
    return{section,text:el.textContent,isQuote:Boolean(el.closest('blockquote')),fontSize:style.fontSize,wordBreak:style.wordBreak,overflowWrap:style.overflowWrap,lines:rows.map(r=>({text:r.text.trim(),x:r.x+scrollX,y:r.y+scrollY,width:r.right-r.x,height:r.bottom-r.y}))};
  });
}
