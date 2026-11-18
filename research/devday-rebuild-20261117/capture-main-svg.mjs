const fs = await import('node:fs/promises');
const crypto = await import('node:crypto');
const root='/Users/ou9999-wdl/Documents/devday-presentation-kit';
const base=root+'/research/devday-rebuild-20261117';
const request=JSON.parse(await fs.readFile(base+'/main-capture-request.json','utf8'));
const folder=base+'/'+request.round+'/present-'+request.width;
const manifestBytes=await fs.readFile(folder+'/manifest.json');
const manifest=JSON.parse(manifestBytes.toString('utf8'));
const page=(await taskSpace(request.taskSpaceId)).page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1600,height:900,deviceScaleFactor:1,mobile:false});
const observations=[];
for(const row of manifest.observations){
  for(const img of row.images){
    if(!img.src.endsWith('.svg'))continue;
    await page.goto('http://127.0.0.1:'+request.port+'/presentations/llm-wiki/'+img.src);
    await page.waitForSelector('svg');
    await page.waitForFunction(()=>document.fonts.status==='loaded');
    const svg=await page.evaluate(()=>{
      const root=document.querySelector('svg'),v=root.viewBox.baseVal, inverseRoot=root.getCTM().inverse();
      const matrixFor=el=>inverseRoot.multiply(el.getCTM());
      const point=(el,x,y)=>{const p=root.createSVGPoint();p.x=x;p.y=y;const r=p.matrixTransform(matrixFor(el));return{x:r.x,y:r.y};};
      const rootBox=(el,b)=>{const corners=[point(el,b.x,b.y),point(el,b.x+b.width,b.y),point(el,b.x,b.y+b.height),point(el,b.x+b.width,b.y+b.height)];const xs=corners.map(p=>p.x),ys=corners.map(p=>p.y);return{x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};};
      const bbox=el=>rootBox(el,el.getBBox());
      const glyphRows=el=>{
        const style=getComputedStyle(el),raw=el.textContent||'',content=style.whiteSpace.startsWith('pre')?raw:raw.replace(/\s+/g,' ').trim();
        const chars=[...content],count=el.getNumberOfChars();if(chars.length!==count)return null;
        const rows=[];
        for(let i=0;i<count;i++){const pos=el.getStartPositionOfChar(i),baseline=point(el,pos.x,pos.y),b=rootBox(el,el.getExtentOfChar(i));
          let row=rows.find(row=>Math.abs(row.baselineY-baseline.y)<.5);
          if(!row){row={text:'',x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height,baselineY:baseline.y};rows.push(row);}
          row.text+=chars[i];row.x=Math.min(row.x,b.x);row.y=Math.min(row.y,b.y);row.right=Math.max(row.right,b.x+b.width);row.bottom=Math.max(row.bottom,b.y+b.height);
        }
        return rows.map(row=>({text:row.text.trim(),x:row.x,y:row.y,width:row.right-row.x,height:row.bottom-row.y,baselineY:row.baselineY}));
      };
      const observeEdge=el=>{
          if(el.hasAttribute('data-from')!==el.hasAttribute('data-to'))throw Error('Incomplete graph reference');
          const s=getComputedStyle(el),tag=el.tagName.toLowerCase();let points;
          if(tag==='polyline')points=Array.from({length:el.points.numberOfItems},(_,i)=>{const p=el.points.getItem(i);return point(el,p.x,p.y);});
          else if(tag==='line')points=[point(el,el.x1.baseVal.value,el.y1.baseVal.value),point(el,el.x2.baseVal.value,el.y2.baseVal.value)];
          else if(tag==='path'){
            const d=el.getAttribute('d'),tokens=d.match(/[MLHVmlhv]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)||[];
            if(d.replace(/[MLHVmlhv]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?|[\s,]/gi,'').length)throw Error('Unsupported path command');
            let i=0,cmd='',x=0,y=0;points=[];
            while(i<tokens.length){if(/^[MLHVmlhv]$/.test(tokens[i]))cmd=tokens[i++];const relative=cmd===cmd.toLowerCase(),upper=cmd.toUpperCase();if(upper==='M'||upper==='L'){const nx=Number(tokens[i++]),ny=Number(tokens[i++]);x=relative?x+nx:nx;y=relative?y+ny:ny;if(upper==='M')cmd=relative?'l':'L';}else if(upper==='H'){const n=Number(tokens[i++]);x=relative?x+n:n;}else if(upper==='V'){const n=Number(tokens[i++]);y=relative?y+n:n;}else throw Error('Unsupported path');points.push(point(el,x,y));}
            const start=el.getPointAtLength(0),end=el.getPointAtLength(el.getTotalLength());
            if(Math.hypot(points[0].x-point(el,start.x,start.y).x,points[0].y-point(el,start.x,start.y).y)>.01||Math.hypot(points.at(-1).x-point(el,end.x,end.y).x,points.at(-1).y-point(el,end.x,end.y).y)>.01)throw Error('Path endpoint mismatch');
          }else throw new Error('Expected exact path/line/polyline geometry, got '+tag);
          let opacity=parseFloat(s.strokeOpacity),visible=s.stroke!=='none';
          for(let parent=el;parent;parent=parent.parentElement){const style=getComputedStyle(parent);opacity*=parseFloat(style.opacity);visible=visible&&style.display!=='none'&&style.visibility!=='hidden'&&style.visibility!=='collapse';if(parent===root)break;}
          const m=matrixFor(el),strokeWidth=parseFloat(s.strokeWidth)*Math.max(Math.hypot(m.a,m.b),Math.hypot(m.c,m.d));
          return{id:el.getAttribute('data-edge-id'),from:el.getAttribute('data-from'),to:el.getAttribute('data-to'),fromPort:el.getAttribute('data-from-port'),toPort:el.getAttribute('data-to-port'),points,strokeWidth,markerStart:s.markerStart==='none'?null:s.markerStart,markerEnd:s.markerEnd==='none'?null:s.markerEnd,visible:visible&&opacity>0&&strokeWidth>0,opacity};
      };
      const geometry={coordinateSpace:'root-svg-viewBox',nodes:[...root.querySelectorAll('[data-node-id]')].map(el=>{const id=el.getAttribute('data-node-id'),tag=el.tagName.toLowerCase(),rects=tag==='rect'?[el]:tag==='g'?[...el.children].filter(c=>c.tagName.toLowerCase()==='rect'):[];if(rects.length!==1)throw Error('Expected one exact observed rectangle per named node');const b=bbox(rects[0]);const ports=[...root.querySelectorAll('[data-edge-id]')].flatMap(edge=>['from','to'].filter(side=>edge.getAttribute('data-'+side)===id).map(side=>edge.getAttribute('data-'+side+'-port')));return{id,shape:'rect',bbox:b,ports:[...new Set(ports)].map(name=>({id:name,...({east:{x:b.x+b.width,y:b.y+b.height/2},west:{x:b.x,y:b.y+b.height/2},north:{x:b.x+b.width/2,y:b.y},south:{x:b.x+b.width/2,y:b.y+b.height}}[name]||(()=>{throw Error('Unknown port')})())}))};}),
        relations:[...root.querySelectorAll('[data-edge-id]')].filter(el=>(el.hasAttribute('data-from')||el.hasAttribute('data-to'))&&!['work','shared-scope'].includes(el.closest('[data-relation-kind]')?.getAttribute('data-relation-kind'))).map(observeEdge),
        correspondences:[...root.querySelectorAll('[data-edge-id]')].filter(el=>!el.hasAttribute('data-from')&&!el.hasAttribute('data-to')).map(observeEdge)};
      geometry.shapes = [...root.querySelectorAll('[data-observe-id]')].map(el => {
        const style = getComputedStyle(el);
        let opacity = 1;
        let visible = true;
        for (let ancestor = el; ancestor; ancestor = ancestor.parentElement) {
          const current = getComputedStyle(ancestor);
          opacity *= parseFloat(current.opacity);
          visible = visible && current.display !== 'none' && !['hidden','collapse'].includes(current.visibility);
          if (ancestor === root) break;
        }
        const matrix = matrixFor(el);
        return {
          id: el.getAttribute('data-observe-id'), tag: el.tagName.toLowerCase(), bbox: bbox(el),
          visible: visible && opacity > 0, opacity, fill: style.fill, stroke: style.stroke,
          strokeWidth: parseFloat(style.strokeWidth) * Math.max(Math.hypot(matrix.a, matrix.b), Math.hypot(matrix.c, matrix.d)),
        };
      });
      if (new Set(geometry.shapes.map(shape => shape.id)).size !== geometry.shapes.length) throw Error('Duplicate SVG observation IDs');
      return{materialKind:root.getAttribute('data-material-kind'),viewBox:{x:v.x,y:v.y,width:v.width,height:v.height},geometry,
        texts:[...root.querySelectorAll('text')].map(el=>{const s=getComputedStyle(el);return{tag:el.tagName,text:el.textContent,fontSize:s.fontSize,fontWeight:s.fontWeight,fill:s.fill,bbox:bbox(el),glyphRows:glyphRows(el)};})};
    });
    const projectedScale=Math.min(img.box.width/svg.viewBox.width,img.box.height/svg.viewBox.height);
    const stageScale=row.stage.width/1600;
    const renderedRect={x:img.box.x+(img.box.width-svg.viewBox.width*projectedScale)/2,y:img.box.y+(img.box.height-svg.viewBox.height*projectedScale)/2,width:svg.viewBox.width*projectedScale,height:svg.viewBox.height*projectedScale};
    const assetSha256=crypto.createHash('sha256').update(await fs.readFile(root+'/presentations/llm-wiki/'+img.src)).digest('hex');
    const sourcePaths=Object.entries(manifest.hashes).filter(([name,hash])=>name.endsWith('.svg')&&hash===assetSha256).map(([name])=>name);
    if(!sourcePaths.length)throw new Error('SVG not tied to captured source inputs');
    observations.push({slide:Number(row.index)+1,src:img.src,assetSha256,sourcePaths,materialKind:svg.materialKind,fit:img.fit,renderedRect,stageScale,projectedScale,svgViewBox:svg.viewBox,geometry:svg.geometry,
      texts:svg.texts.map(text=>({...text,projectedPixels:parseFloat(text.fontSize)*projectedScale,stageLogicalPixels:parseFloat(text.fontSize)*projectedScale/stageScale}))});
  }
}
const expectedSVGs=manifest.observations.flatMap(row=>row.images.filter(img=>img.src.endsWith('.svg')));
if(observations.length!==expectedSVGs.length || !observations.length)throw new Error('The complete actual SVG inventory must be measured');
await fs.writeFile(folder+'/svg-metrics.json',JSON.stringify({revision:manifest.revision,hashes:manifest.hashes,viewport:manifest.observations[0]?.viewport,
  captureManifest:{path:folder.slice(root.length+1)+'/manifest.json',sha256:crypto.createHash('sha256').update(manifestBytes).digest('hex')},
  method:'Computed SVG fonts projected through the actual contain box and stage; observations, not aesthetic approval.',observations},null,2)+'\n');
console.log({complete:true,folder,svgCount:observations.length});
