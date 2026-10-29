'use strict';
// Topic-local diagram source. Regenerate with: node <this file>.
// Shapes denote documents; rules denote groups; arrowheads denote a direction.
const fs=require('node:fs'),path=require('node:path');
const output=path.resolve(__dirname,'../../talks/llm-wiki/assets');
const C={bg:'#080808',fg:'#f6f6f4',muted:'#a5a5a2',line:'#474745',paper:'#161615',blue:'#24a8ff',green:'#69cf82',purple:'#a080ff',orange:'#ff9d60'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const t=(x,y,s,size=36,color=C.fg,weight=400,anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;
const line=(x1,y1,x2,y2,color=C.line,width=2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const route=(d,color=C.line,width=2)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const tip=(x,y,d='right',color=C.muted)=>{const points={right:`${x-12},${y-8} ${x},${y} ${x-12},${y+8}`,left:`${x+12},${y-8} ${x},${y} ${x+12},${y+8}`,up:`${x-8},${y+12} ${x},${y} ${x+8},${y+12}`};return `<polyline points="${points[d]}" fill="none" stroke="${color}" stroke-width="2.5"/>`;};
const arrow=(x1,y,x2,color=C.muted)=>line(x1,y,x2,y,color)+tip(x2,y,'right',color);
const dot=(x,y,color=C.fg,r=5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const paper=(x,y,w,h)=>`<path d="M${x} ${y}H${x+w-32}L${x+w} ${y+32}V${y+h}H${x}Z" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/><path d="M${x+w-32} ${y}V${y+32}H${x+w}" fill="none" stroke="${C.line}" stroke-width="1.5"/>`;
function save(name,title,desc,body){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="540" viewBox="0 0 1500 540" role="img" aria-labelledby="title desc">\n<title id="title">${esc(title)}</title>\n<desc id="desc">${esc(desc)}</desc>\n<rect width="1500" height="540" fill="${C.bg}"/>\n<g font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" letter-spacing="-.6">\n${body.join('\n')}\n</g>\n</svg>\n`;
 fs.writeFileSync(path.join(output,name+'.svg'),svg);
}

save('case-reading-initial','1장 근거로 인물과 신뢰 주제를 연결한다','가상 소설의1장까지 읽은 상태다. 서하가 지도를 숨기고 북문을 떠난 행동과 버림받았다는 도윤의 말을 인물과 신뢰 주제에 연결한다. 서하의 동기는 아직 미확인이다.',[
 t(40,55,'1장까지 읽은 근거',30,C.muted),
 t(40,135,'서하의 행동',30,C.blue),t(40,190,'지도를 숨기고 북문을 떠남',40),
 t(40,290,'도윤의 말',30,C.purple),t(40,345,'버림받았다고 느낀다.',40),
 arrow(619,246,713),
 t(785,55,'현재 인물 페이지',30,C.green),t(785,150,'서하',72),
 t(785,225,'행동은 알지만,',40),t(785,286,'동기는 아직 미확인.',40,C.orange),
 line(785,325,1460,325),t(785,389,'신뢰',44,C.purple),t(1016,389,'1장',44,C.blue),
 line(891,373,979,373),t(785,441,'연결할 주제',28,C.muted),t(1016,441,'다시 읽을 근거',28,C.muted)
]);

save('case-course-initial','두 강의의 공통 기준을 개념 페이지에 연결한다','가상 강의의2주차 회귀와7주차 회귀트리 메모만 읽은 상태다. 이 예에서 두 모델에 쓰인 제곱오차를 공유 개념에 연결하고 어느 강의에서 읽었는지 남긴다.',[
 t(60,62,'읽은 두 단원',30,C.muted),
 t(60,151,'2주차',30,C.blue),t(60,218,'회귀',58),
 t(60,331,'7주차',30,C.blue),t(60,398,'회귀트리',58),
 route('M360 202H580V288H725'),route('M360 382H580V288'),dot(580,288,C.green),
 t(800,241,'공유 개념 페이지',32,C.green),t(800,319,'제곱오차',72),t(800,394,'근거: 2·7주차',30,C.muted),
 line(40,458,1460,458),t(40,512,'같은 기준이 쓰인 위치를 연결합니다.',34)
]);

console.log('Generated 2 initial-state diagrams; existing full diagrams preserved.');
