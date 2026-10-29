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

save('wiki-maintenance-loop','정리한 지식이 다음 질문의 출발점이 된다','보존 원자료를 읽은 LLM이 개념·비교·종합 페이지를 작성하고 유지한다. 새 질문은 그 페이지를 찾아 읽어 답하고 유용한 답은 다시 위키에 저장한다. 작업 규칙은 이 읽기·쓰기·점검 전체에 적용한다.',[
 t(32,63,'보존하는 원자료',30,C.blue),paper(32,107,252,282),
 t(59,167,'읽은 자료',44),t(59,225,'논문 · 문서',32,C.muted),t(59,270,'읽기 메모',32,C.muted),
 line(59,310,247,310),line(59,339,219,339),
 arrow(313,247,424),t(368,205,'읽음',28,C.muted,400,'middle'),
 t(478,63,'LLM이 작성·갱신',30,C.green),t(478,145,'연결된 위키',58),
 line(478,177,982,177),t(478,237,'개념 · 개체',44),line(478,261,982,261),t(478,319,'비교 · 잠정 종합',44),line(478,345,982,345),
 t(478,394,'근거와 연결을 함께 남김',30,C.muted),
 arrow(1016,247,1105),t(1151,174,'다음 질문',52),t(1151,239,'위키를 찾아 읽고',32,C.muted),t(1151,287,'근거와 함께 답함',32,C.muted),
 route('M1320 326V480H735V420',C.orange),tip(735,420,'up',C.orange),
 t(1040,454,'유용한 답도 페이지로 저장',32,C.orange,400,'middle'),
 t(32,480,'작업 규칙은 전체에 적용',28,C.muted)
]);

save('wiki-layers','원자료와 위키를 나누고 같은 작업 규칙으로 다룬다','raw는 읽은 판을 보존하는 원자료다. wiki는 LLM이 작성·갱신하는 연결된 설명이다. schema는 둘 뒤에 통과하는 결과물이 아니라 전체의 읽기·쓰기·질문·점검을 안내하는 작업 규칙이다.',[
 t(40,57,'보존',30,C.blue),t(40,142,'raw/',66),t(40,220,'논문 · 문서 · 읽기 메모',40),t(40,280,'읽었던 판과 원본 위치',32,C.muted),
 arrow(565,220,738),t(651,180,'읽어 갱신',28,C.muted,400,'middle'),
 t(820,57,'LLM이 작성·유지',30,C.green),t(820,142,'wiki/',66),t(820,220,'개념 ↔ 비교 ↔ 질문',44),t(820,280,'개체 · 잠정 종합 · 출처 연결',32,C.muted),
 line(40,382,1460,382,C.purple),t(40,438,'schema',38,C.purple),t(300,438,'읽기 · 쓰기 · 질문 · 점검의 작업 규칙',34),t(300,490,'두 영역의 작업 전체를 안내합니다.',28,C.muted)
]);

save('wiki-ingest-update','새 자료를 반영하면 관련된 여러 페이지를 갱신한다','LLM은 새 자료와 기존 위키를 대조한다. 새 자료의 요약뿐 아니라 관련 개념·개체·비교·잠정 종합도 갱신한다. 오른쪽 항목은 갱신 대상이며 차례대로 통과하는 네 단계가 아니다.',[
 t(40,70,'새 입력',30,C.blue),paper(40,110,270,288),t(70,186,'새 자료',52),t(70,246,'읽은 판을 보존',30,C.muted),line(70,290,270,290),line(70,325,241,325),
 t(391,216,'기존 위키와',42),t(391,283,'대조',42),t(391,352,'LLM이 관련된 쪽을 갱신',28,C.muted),
 arrow(695,255,807,C.green),
 t(878,67,'같이 바뀌는 페이지',30,C.green),
 ...[['자료 요약','새로 읽은 내용'],['개념 · 개체','관련 설명'],['비교','조건과 차이'],['잠정 종합','현재의 해석']].flatMap(([label,sub],i)=>{const y=145+i*87;return[line(854,y-30,854,y+8,C.green,4),t(883,y,label,42),t(1210,y,sub,28,C.muted),line(878,y+26,1460,y+26)];}),
 t(40,492,'필요한 페이지를 찾아 고칩니다. 고정된 통과 순서는 없습니다.',30,C.muted)
]);

save('wiki-query-return','관련 페이지를 읽고 유용한 답을 다시 남긴다','index와 검색으로 위키를 찾고 관련 본문을 현재 답변의 문맥에 읽는다. 그 문맥으로 답하고 필요한 원자료도 확인한다. 유용한 답은 위키 페이지로 저장·연결해 다음 질문에서 다시 찾을 수 있게 한다.',[
 t(40,85,'찾기',30,C.muted),t(40,176,'index · 검색',54),t(40,239,'관련 위키로 진입',32,C.muted),
 arrow(369,192,450),
 t(510,85,'현재 답변의 문맥',30,C.green),t(510,176,'페이지의 본문',54),t(510,239,'필요하면 원자료도 확인',32,C.muted),
 arrow(960,192,1046),
 t(1110,85,'답하기',30,C.muted),t(1110,176,'근거 있는 답',54),t(1110,239,'남은 의문도 함께',32,C.muted),
 route('M1298 302V437H205V302',C.purple),tip(205,302,'up',C.purple),
 t(750,403,'유용한 답은 페이지로 저장하고 관련 개념에 연결',34,C.purple,400,'middle'),
 t(750,511,'다음 질문이 저장된 설명을 다시 찾아 읽습니다.',34,C.fg,400,'middle')
]);

save('case-reading','새 장을 읽으면 인물과 주제의 해석도 달라진다','가상 소설의 구성 예다. 1장에서 서하는 지도를 숨기고 떠났고 3장에서 지도에 추적 장치가 있었다는 정보가 추가된다. 동료를 피신시키려 했다는 서하의 자기 설명을 인물·신뢰 주제·장 요약에 연결하되 그 말 전체의 진위는 미확인으로 남긴다.',[
 t(40,55,'장 메모에서 읽은 것',30,C.muted),t(40,135,'1장 · 행동',30,C.blue),t(40,190,'지도를 숨기고 북문을 떠남',40),
 t(40,290,'3장 · 새로 알게 된 것',30,C.orange),t(40,345,'지도에는 추적 장치가 있었다.',36),t(40,399,'서하: “동료를 피신시키려 했다.”',32,C.muted),
 arrow(619,246,713),
 t(785,55,'갱신할 인물 페이지',30,C.green),t(785,150,'서하',72),t(785,217,'동료 보호가 목적이었다고 설명한다.',36),
 line(785,261,1460,261),
 t(785,325,'신뢰',44,C.purple),t(1016,325,'1·3장',44,C.blue),line(891,309,979,309),
 t(785,370,'주제',28,C.muted),t(1016,370,'다시 읽을 근거',28,C.muted),
 line(785,420,785,495,C.orange,4),t(810,451,'미확인',28,C.orange),t(810,493,'서하의 설명 전체와 이후 선택',32,C.muted)
]);

save('case-team','요구를 보존하면서 상태와 응대 지식을 갱신한다','가상 고객 요구의 구성 예다. 월말 정산을 위한 수동 CSV와 매일 자동 수집은 서로 다른 요구다. 새 회의는 수동 CSV 범위 검토와 예약 전송 보류를 정한다. 비교와 응대 FAQ를 갱신하지만 고객 요청을 출시 약속으로 바꾸지 않는다.',[
 t(40,55,'상담에서 읽은 요구',30,C.muted),t(40,144,'A · 월말 정산',46),t(40,199,'CSV 수동 다운로드',34,C.blue),
 line(40,241,581,241),t(40,308,'B · 매일 대시보드 갱신',42),t(40,363,'CSV 자동 수신',34,C.blue),
 arrow(620,242,713),
 t(785,55,'새 회의 이후',30,C.green),t(785,142,'내보내기',62),
 t(785,223,'수동 CSV',40),t(1210,223,'범위 검토',30,C.green),line(785,254,1460,254),
 t(785,310,'예약 전송',40),t(1210,310,'보류',30,C.orange),t(785,372,'출시일은 아직 미확정',30,C.muted),
 line(40,432,1460,432),t(40,492,'고객 B에게 무엇을 말할까?',38),t(755,492,'응대 FAQ에 현재 상태와 보류 이유를 남김',30,C.muted)
]);

save('case-course','공유하는 개념과 새로 비교할 기준을 구분한다','가상 강의 메모의 구성 예다. 2주차 회귀와 7주차 회귀트리는 제곱오차를 공유한다. 옆의 새 8주차 분류트리 예는 Gini 불순도를 사용한다. 같은 기준으로 합치지 않고 개념·비교·종합에 새로운 조건으로 연결한다.',[
 t(40,62,'이미 읽은 두 단원',30,C.muted),t(40,151,'2주차',28,C.blue),t(40,218,'회귀',58),
 t(40,331,'7주차',28,C.blue),t(40,398,'회귀트리',58),
 route('M334 202H490V288H585',C.line),route('M334 382H490V288',C.line),dot(490,288,C.green),
 t(637,241,'공유하는 기준',30,C.green),t(637,319,'제곱오차',66),
 line(1045,105,1045,418),
 t(1110,151,'새 8주차',30,C.orange),t(1110,218,'분류트리',48),t(1110,302,'Gini 불순도',42,C.orange),t(1110,357,'이 예에서 다른 기준',28,C.muted),
 line(40,458,1460,458),t(40,512,'새 자료는 비교표와 종합에 조건을 더합니다.',34)
]);

save('reuse-inputs','고친 설명과 이전 선택을 새 질문에서 함께 읽는다','고정 승인 예제의 C1 주장과 Q1 답, D1 이전 선택을 함께 읽어 Q2 저장 기준을 판단한다. 자동 검색이나 모델 생성 성공의 기록이 아니라 사람이 준비한 구성 예다.',[
 t(40,65,'다시 읽을 세 기록',30,C.muted),
 t(40,132,'교정한 주장 · C1',28,C.blue),t(40,183,'링크가 있어도 일반화는 틀릴 수 있다.',36),line(40,219,700,219),
 t(40,275,'첫 답 · Q1',28,C.blue),t(40,326,'다음 답에는 고친 파일을 다시 읽는다.',36),line(40,362,700,362),
 t(40,418,'이전 선택 · D1',28,C.blue),t(40,469,'채팅에서 찾기 어려워 모든 답을 모으려 했다.',32),
 route('M751 135V449M751 287H880',C.line),tip(880,287),t(812,248,'함께 읽음',25,C.muted,400,'middle'),
 t(960,120,'새 질문 · Q2',30,C.purple),t(960,226,'우리 스터디는',54),t(960,302,'어떤 답을',54),t(960,378,'저장할까?',54)
]);

save('decision-transition','새 결정을 남기고 이전 결정도 보존한다','고정 예제의 초기 D1은 모든 답을 현행에 모으는 선택이다. D2는 문장·근거 위치·범위를 대조한 뒤 현행 답을 갱신한다. 이전 결정의 맥락은 대체됨으로 보존하고 새 결정에는 검토 시간도 기록한다.',[
 t(40,63,'D1 · 초기 선택',30,C.muted),t(838,63,'D2 · 이 예제의 선택',30,C.green),
 line(47,111,1456,111),dot(50,111,C.muted,6),dot(850,111,C.green,7),tip(820,111),t(470,92,'이유를 남겨 대체',28,C.muted),
 t(40,210,'모든 답을',54),t(40,283,'현행에 모은다.',54),t(40,355,'채팅에서 찾기 어려워',32,C.muted),t(40,401,'한곳에 모으려 했다.',32,C.muted),t(40,460,'대체됨 · 맥락 보존',30,C.orange),
 t(838,210,'검토한 답을',54),t(838,283,'현행에 연결한다.',54),t(838,355,'문장 · 근거 위치 · 범위 대조',32,C.muted),t(838,401,'검토 시간이 든다는 부담도 기록',32,C.orange),
 t(838,486,'이전 결정의 맥락과 결과는 지우지 않습니다.',28,C.muted)
]);

console.log('Regenerated 9 LLM Wiki diagrams.');
