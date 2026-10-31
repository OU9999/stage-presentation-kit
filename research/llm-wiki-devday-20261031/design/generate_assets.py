"""Stage-native vector scenes. Adapted from the preserved expanded generator.

The SVG root provides the Stage black background for reuse on light pages.
Bright surfaces belong to readable documents;
neutral boundaries indicate an actual input scope. All examples are authored
teaching material, not captures of an LLM run or another speaker's slides.
"""
from pathlib import Path
from html import escape
import json
import sys

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else 'talks/llm-wiki/assets/expanded')
OUT.mkdir(parents=True, exist_ok=True)
TEXT = '#F6F6F4'
MUTED = '#A4A4A1'
LINE = '#5A5A57'
SURFACE = '#151515'
BLUE = '#24A8FF'
GREEN = '#69CF82'
ORANGE = '#FF7A3D'
PAPER = '#F6F6F4'
INK = '#1D1D1B'
INK_MUTED = '#62625F'
PAPER_LINE = '#CDCDC7'
INK_GREEN = '#2D6A43'
FONT = "'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif"
MANIFEST = []


def text(x, y, label, size=36, fill=TEXT, weight=400, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{escape(label)}</text>'


def graph_label(x, y, label, size=36, fill=TEXT, weight=400, anchor='start'):
    # Only open graph labels: keep edges legible without crossing letterforms.
    # Document text deliberately uses text(), preserving its own ink/surface.
    return text(x,y,label,size,fill,weight,anchor).replace('<text ', '<text paint-order="stroke" stroke="#080808" stroke-width="8" stroke-linejoin="round" ',1)


def lines(x, y, labels, size=36, fill=TEXT, step=60, weight=400, anchor='start'):
    return ''.join(text(x, y+i*step, label, size, fill, weight, anchor) for i, label in enumerate(labels))


def rect(x, y, width, height, fill=SURFACE, stroke=None, radius=0):
    border = f' stroke="{stroke}" stroke-width="2"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}"{border}/>'


def path(d, color=LINE, width=2, dash=None):
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'


def rule(x1, y1, x2, y2, color=LINE, width=2):
    return path(f'M{x1} {y1}L{x2} {y2}', color, width)


def circle(x, y, r, fill=GREEN, stroke=None):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>'


def arrow(x1, y1, x2, y2, color=LINE, width=2):
    if y1 == y2:
        return rule(x1,y1,x2,y2,color,width)+path(f'M{x2-13} {y2-8}L{x2} {y2}L{x2-13} {y2+8}',color,width)
    if x1 == x2:
        return rule(x1,y1,x2,y2,color,width)+path(f'M{x2-8} {y2-13}L{x2} {y2}L{x2+8} {y2-13}',color,width)
    return rule(x1,y1,x2,y2,color,width)+circle(x2,y2,4,color)


def document(x, y, w, h):
    return rect(x,y,w,h,PAPER,PAPER_LINE,8)


def save(name, title, desc, body, slides):
    data = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="600" viewBox="0 0 1500 600" style="background:#080808" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title>
<desc id="desc">{escape(desc)}</desc>
<g font-family="{FONT}" letter-spacing="-.4">{body}</g>
</svg>
'''
    (OUT/name).write_text(data)
    MANIFEST.append({'file':name,'slides':slides,'title':title,'description':desc,'width':1500,'height':600})


def three_sources(x=35, y=185, w=330):
    b = text(x,y-64,'같은 원자료 세 메모',28,MUTED)
    rows = [('목적과 맥락','목적 · 이유 · 결과'),('검색과 비교','근거 검색 · 차이'),('지식의 활용','종합 · 공유 · 검토')]
    for i,(label,focus) in enumerate(rows):
        yy=y+i*125
        b+=text(x,yy,label,36,TEXT,550)
        b+=text(x,yy+44,focus,27,MUTED)
        if i<2:b+=rule(x,yy+70,x+w,yy+70,LINE,1)
    return b


# 3: Saved sources and named relations occupy the same open stage.
b=text(35,115,'원자료',40,TEXT,600)+text(35,169,'보존할 세 주제 메모',28,MUTED)
for i,label in enumerate(['목적과 맥락','검색과 비교','지식의 활용']):
    yy=255+i*105
    b+=text(35,yy,label,36,TEXT)+rule(35,yy+28,360,yy+28,LINE,1)
b+=arrow(400,310,505,310)+text(398,270,'읽고 연결',28,MUTED)
b+=text(580,92,'연결된 지식',45,TEXT,600)+text(1435,90,'wiki/',28,MUTED,anchor='end')
points=[(650,210,'개념'),(1280,205,'비교'),(970,320,'현재 이해'),(760,480,'계획'),(1270,480,'다음 질문')]
for a,z in [(0,2),(1,2),(2,3),(2,4),(3,4)]:
    x1,y1,_=points[a];x2,y2,_=points[z];b+=rule(x1,y1,x2,y2)
for x,y,label in points:
    b+=circle(x,y,11,TEXT if label=='현재 이해' else GREEN)+text(x,y-26,label,38,TEXT,500,'middle')
save('knowledge-layers.svg','원자료와 다시 읽는 연결 지식','자작 주제 메모 세 개를 보존하고 개념·비교·현재 이해·계획·다음 질문을 연결된 문서로 작성해 다시 읽는 설명용 구조다. 관계의 저장과 갱신을 나타내며 자동 정확도를 보장하지 않는다.',b,[3])

# 11: One temporary input scope, with the same sources and question as slide 12.
b=text(35,54,'공통 질문 · 다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?',31,MUTED)
b+=three_sources()+arrow(392,316,475,316)
b+=rect(505,132,493,365,SURFACE,LINE,10)
b+=text(544,195,'이번에 찾은 근거',38,BLUE,550)
b+=lines(544,277,['목적과 맥락에 관한 부분','검색과 비교에 관한 부분','지식 활용과 검토의 부분'],32,TEXT,60)
b+=text(544,459,'이번 답의 입력 문맥',28,MUTED)
b+=arrow(1018,316,1084,316)
b+=text(1110,196,'현재 질문의 답',34,TEXT,550)
b+=lines(1110,290,['세 메모를 엮어','스터디 계획을','정리합니다.'],38,TEXT,70)
save('rag-path.svg','질문에 필요한 근거를 이번 문맥으로 읽기','목적과 맥락·검색과 비교·지식의 활용이라는 같은 세 자작 주제 메모와 같은 질문을 쓴다. 검색한 근거를 이번 입력 문맥으로 읽어 현재 답을 종합하는 기본 RAG 설명 예이며 실제 모델 실행이나 성능 비교가 아니다.',b,[11])

# 12: Persistent named relations, not a recolored version of the input box.
b=text(35,54,'공통 질문 · 다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?',31,MUTED)
b+=three_sources()+arrow(392,316,475,316)
b+=text(530,145,'미리 작성하고 유지한 문서',36,GREEN,550)
pts=[(666,278,'LLM Wiki 개념'),(1267,278,'RAG와 위키 비교'),(948,453,'우리 스터디 계획')]
for a,z in [(0,1),(0,2),(1,2)]:
    x1,y1,_=pts[a];x2,y2,_=pts[z];b+=rule(x1,y1,x2,y2)
for x,y,label in pts:b+=circle(x,y,11,GREEN)+graph_label(x,y-29,label,35,TEXT,500,'middle')
b+=text(947,550,'필요한 쪽 재읽기 → 이번 답에 활용',31,MUTED,anchor='middle')
save('wiki-path.svg','저장된 관계와 종합에서 필요한 쪽을 다시 읽기','목적과 맥락·검색과 비교·지식의 활용이라는 같은 세 주제 메모로 개념·비교·현재 계획을 연결해 유지한다. 같은 질문에서 필요한 페이지를 다시 읽어 스터디의 현재 계획을 종합한다. RAG와의 성능 우열이나 검색 없는 위키를 뜻하지 않는다.',b,[12])

# 15: Routing and iteration are operations, not a new knowledge store.
b=text(35,125,'사용자의 질문',34,TEXT,550)+lines(35,215,['필요한 근거는','무엇일까?'],42,TEXT,70)
b+=arrow(382,300,557,300)
b+=circle(700,300,108,SURFACE,LINE)+text(700,292,'에이전트',39,TEXT,550,'middle')+text(700,349,'검색 판단',29,MUTED,anchor='middle')
for y,label,selected in [(130,'원자료',False),(300,'위키 페이지',True),(470,'웹 · 다른 도구',False)]:
    b+=path(f'M808 300C965 300 980 {y} 1100 {y}',BLUE if selected else LINE,3 if selected else 2)
    b+=circle(1110,y,9,BLUE if selected else MUTED)+text(1148,y+12,label,38,TEXT,550 if selected else 400)
b+=path('M700 409C700 564 1060 571 1110 494',ORANGE,2)+graph_label(800,562,'부족하면 다시 찾기',29,ORANGE)
save('agentic-routing.svg','질문에 따라 검색할 곳과 반복을 판단','에이전트가 질문에 필요한 원자료·위키 페이지·웹 또는 다른 도구의 근거를 찾고 부족하면 다시 탐색한다. 위키 문서도 검색 대상이 될 수 있으며 선택과 반복은 색·이름·위치로 함께 구별한다.',b,[15])

# 20: Brightness belongs to the saved source document, not the abstract wiki scope.
b=document(35,35,425,420)+text(73,103,'raw/',44,INK,600)+text(73,161,'보존할 원자료',34,INK)
b+=rule(73,190,421,190,PAPER_LINE)
b+=lines(73,247,['context-note.md','retrieval-note.md','synthesis-note.md'],30,INK_MUTED,57)
b+=text(73,415,'요지 · 선택 이유 · 남은 질문',27,INK_MUTED)
b+=arrow(487,250,560,250)
b+=text(600,104,'wiki/',44,TEXT,600)+text(600,163,'작성하고 갱신할 이해',34,MUTED)
for y,label,detail in [(238,'개념','여러 자료에서 만나는 설명'),(315,'비교 · 종합','차이와 현재 계획'),(392,'질문 · 목차 · 로그','답과 탐색, 변화의 이유')]:
    b+=text(600,y,label,34,TEXT,550)+text(915,y,detail,32,TEXT)
b+=rule(35,510,1460,510)+text(35,565,'rules.md',30,TEXT,550)+text(230,565,'원자료 보존 · 근거 연결 · 관련 쪽 갱신 · 중요한 결과 확인',30,MUTED)
save('raw-wiki-rules.svg','원자료와 위키를 구별하고 전체 작업 규칙을 두기','raw의 context-note.md·retrieval-note.md·synthesis-note.md는 자작 설명용 원자료 메모다. wiki의 개념·비교·종합·질문·목차·로그를 작성하고 갱신하며 두 영역 밖 rules.md가 전체 작업을 안내한다. 원요지·사람의 이유·종합을 구별한다.',b,[20])

# 23: A human purpose and four open questions, rather than a decorative panel.
b=text(35,118,'사람이 남기는 선택 이유',30,MUTED)
b+=lines(35,234,['좋았던 자료를','다음 스터디의','진행안으로'],47,TEXT,77,550)
b+=text(35,530,'쓰임을 먼저 정합니다.',32,ORANGE)
qs=[('맥락','다음 AI 스터디를 준비합니다.'),('선택 이유','차이를 설명할 자료를 골랐습니다.'),('중요한 점','원문 · 내 이유 · 연결된 종합'),('앞으로의 쓰임','한 쪽 진행안과 다음 읽기 활동')]
for i,(q,a) in enumerate(qs):
    yy=115+i*130
    b+=text(610,yy,q,30,MUTED)+text(610,yy+53,a,36,TEXT,500)
save('purpose-questions.svg','자료를 고른 맥락과 다음 쓰임을 함께 남기기','사람이 직접 적은 목적·선택 이유·중요한 점·앞으로의 쓰임을 자작 예제로 보여준다. 다음 AI 스터디의 한 쪽 진행안을 만들려는 설명용 목적이며 실제 개인 프로필이나 외부 발표자의 인용문이 아니다.',b,[23])

# 25: Three sources converge into named, stored relations on an open canvas.
b=three_sources(35,185,330)+arrow(393,316,485,316)
b+=text(537,102,'요약을 넘어, 기존 설명과 연결',40,TEXT,550)
pts=[(690,250,'자료 요약','원자료의 입구'),(1235,250,'개념 · 비교','기존 설명과 연결'),(1000,474,'현재 계획','여러 자료의 종합')]
for a,z in [(0,1),(0,2),(1,2)]:
    x1,y1,_,_=pts[a];x2,y2,_,_=pts[z];b+=rule(x1,y1,x2,y2)
for x,y,label,sub in pts:
    b+=circle(x,y,11,GREEN)+graph_label(x,y-30,label,38,TEXT,550,'middle')+graph_label(x,y+51,sub,28,MUTED,anchor='middle')
save('ingest-map.svg','자료를 반영하며 요약과 개념과 현재 계획을 연결','자작 주제 메모 세 개를 읽어 자료 요약을 만들고 기존 개념·비교·현재 스터디 계획과의 관계를 작성하고 갱신한다. 형식 변환만 하는 흐름과 구별하며 원자료·사람의 이유·종합을 유지한다.',b,[25])

# 26: Both are readable documents; their source scope differs.
b=document(35,35,610,520)+text(76,99,'자료 요약',29,INK_MUTED)+text(76,162,'목적과 맥락',41,INK,600)
b+=lines(76,248,['자료를 넣는 목적을 정한다.','내 이유와 다음 쓰임을 적는다.'],34,INK,65)
b+=rule(76,390,602,390,PAPER_LINE)+text(76,446,'한 메모의 요지를 다시 찾는 입구',29,INK_MUTED)+text(76,510,'근거  context-note.md',27,INK_MUTED)
b+=arrow(670,295,720,295)
b+=document(747,35,716,520)+text(788,99,'개념 페이지',29,INK_MUTED)+text(788,162,'LLM Wiki',43,INK,600)
b+=lines(788,248,['자료 사이의 관계와 현재 이해를','연결된 문서로 작성하고 갱신한다.'],34,INK,65)
b+=rule(788,390,1420,390,PAPER_LINE)+text(788,447,'근거  목적과 맥락 · 검색과 비교 · 지식의 활용',27,INK_MUTED)+text(788,510,'연결  RAG와 위키 비교 · 현재 계획',29,INK_GREEN)
save('source-concept.svg','한 자료 요약과 여러 자료를 엮는 개념 페이지','context-note.md의 요약은 목적과 맥락이라는 한 메모의 요지를 다시 읽는 입구다. LLM Wiki 개념 페이지는 목적과 맥락·검색과 비교·지식의 활용 세 자작 메모를 엮어 설명하고 비교·현재 계획에 연결하는 종합 문서다. 실제 실행 화면이 아닌 구성 예다.',b,[26])

# 27: Equal-axis comparison becomes a purpose-specific plan document.
b=text(35,96,'RAG  ↔  LLM Wiki',41,TEXT,550)
for i,(name,detail) in enumerate([('정리하는 시점','질문할 때 · 자료를 반영할 때'),('남는 결과','근거와 답 · 연결된 개념과 종합'),('함께 쓰는 방식','위키를 검색 대상으로 활용')]):
    y=205+i*144
    b+=text(35,y,name,29,MUTED)+text(35,y+58,detail,34,TEXT)
b+=arrow(727,310,795,310)
b+=document(830,35,634,520)+text(872,110,'우리의 첫 시도',43,INK,600)
b+=lines(872,220,['세 메모를 함께 읽습니다.','개념·비교·계획을 남깁니다.','후속 질문에서 다시 읽습니다.'],34,INK,90)
b+=text(872,510,'syntheses/study-plan.md',27,INK_MUTED)
save('comparison-synthesis.svg','같은 축의 비교를 우리 목적의 계획으로 종합','RAG와 LLM Wiki를 정리 시점·남는 결과·병행 방식이라는 같은 축으로 비교한다. 자작 주제 메모 세 개의 개념과 비교를 읽고 다음 스터디의 첫 시도 계획을 만드는 종합 예이며 성능 우열 수치나 실측 결과가 아니다.',b,[27])

# 29: Written criteria and an open graph are different representations.
b=text(35,106,'정리의 기준',40,TEXT,550)
b+=lines(35,225,['원문과 우리 해석을 구별한다.','관계를 연결한 이유를 적는다.','모르는 내용은 질문으로 남긴다.'],34,TEXT,110)
b+=text(35,550,'rules.md',28,MUTED)
b+=text(780,95,'연결을 따라 읽는 보기',36,TEXT,550)
pts=[(845,205,'목적과 맥락'),(1330,205,'검색과 비교'),(1050,325,'LLM Wiki'),(1350,395,'검색'),(830,475,'비교'),(1175,475,'계획'),(1020,565,'질문'),(1080,205,'지식의 활용')]
for a,z in [(0,2),(1,2),(1,3),(2,4),(2,5),(3,4),(4,5),(5,6),(7,2),(7,5)]:
    x1,y1,_=pts[a];x2,y2,_=pts[z];b+=rule(x1,y1,x2,y2,LINE,1.7)
for x,y,label in pts:b+=circle(x,y,8,GREEN)+graph_label(x,y-22,label,31,TEXT,500,'middle')
save('rules-graph.svg','정리 기준과 문서 연결을 따라 읽는 보기','왼쪽 rules.md는 원자료와 해석·관계의 이유·남은 질문을 구별하는 기준을 적는다. 오른쪽 그래프는 세 자작 주제 메모·개념·검색·비교·계획·질문의 문서 연결을 탐색하는 보기다. 그래프 자체가 정확성이나 완전한 지식 구조를 증명하지 않는다.',b,[29])

# 31: One new condition changes three scoped explanations; no universal redefinition.
b=text(35,119,'새 모임 조건',35,ORANGE,550)
b+=lines(35,224,['입문자와 함께','준비된 읽기 팩','15분 활동'],40,TEXT,85)
b+=text(35,531,'설명용 가상 조건',28,MUTED)+arrow(433,315,515,315)
for i,(name,detail) in enumerate([('개념 · 우리 적용 범위','입문 설명부터 다룹니다.'),('비교 · 선택 기준','작은 자료 묶음으로 시작합니다.'),('계획 · 작업과 시간','15분 활동에 맞춰 조정합니다.')]):
    y=126+i*174
    b+=text(570,y,name,30,MUTED)+text(570,y+70,detail,42,TEXT,500)
    b+=rule(570,y+99,1455,y+99,LINE,1)
save('related-updates.svg','가상 새 조건이 관련 설명과 현재 계획을 바꾸는 모습','입문자와 준비된 주제 메모 팩을 쓰는 15분 활동이라는 가상 조건을 반영한다. 보편적인 LLM Wiki 정의를 바꾸는 대신 우리 적용 범위·선택 기준·현재 계획의 작업과 시간을 갱신하며 목차·로그·관련 질문도 확인한다.',b,[31])

# 32: Existing pages are found and actually read in the current context.
b=text(35,108,'필요한 페이지 찾기',36,TEXT,550)
for i,label in enumerate(['목차와 작업 규칙','관련 개념과 비교','현재 스터디 계획','필요하면 원자료']):
    y=215+i*86;b+=circle(43,y-11,5,MUTED)+text(70,y,label,34,TEXT)
b+=arrow(393,315,475,315)
b+=rect(505,125,495,380,SURFACE,LINE,10)+text(546,193,'이번 답의 입력 문맥',32,BLUE,550)
b+=lines(546,303,['찾아낸 페이지를','실제로 읽습니다.'],43,TEXT,78,550)
b+=arrow(1020,315,1080,315)
b+=text(1110,193,'현재 질문의 답',34,TEXT,550)+lines(1110,295,['목차와 연결을','읽고, 근거를','찾아봅니다.'],37,TEXT,70)
b+=text(35,576,'파일의 존재 ≠ 이번 답에서 실제로 읽은 사실',29,MUTED)
save('query-reading.svg','필요한 위키 페이지를 찾아 현재 문맥에서 실제로 읽기','입문자와 15분 활동은 무엇부터 할지라는 질문에 목차·작업 규칙·개념·비교·현재 계획과 필요한 원자료를 찾아 실제 입력으로 읽는다. 파일이 존재하는 사실과 이번 답에 읽혔다는 사실을 구별하는 설명 예다.',b,[32])

# 33: A retained question is a concrete readable artifact.
b=text(35,224,'검토한 질문과 답',34,TEXT,550)+lines(35,309,['다시 읽을','위키의 일부로'],41,TEXT,73)
b+=arrow(340,315,395,315)
b+=document(425,35,1040,520)+text(466,94,'wiki/questions/first-study.md',27,INK_MUTED)+rule(466,120,1422,120,PAPER_LINE)
b+=text(466,185,'입문자와 15분 활동은 무엇부터 할까?',36,INK,600)
b+=lines(466,279,['목차에서 개념·비교·계획을 찾아 읽습니다.','근거를 찾고, 질문 답을 남겨 다시 읽습니다.'],34,INK,65)
b+=rule(466,385,1422,385,PAPER_LINE)+text(466,442,'근거  관련 개념 · 비교 · 현재 계획',30,INK_GREEN)
b+=text(466,511,'남은 확인  필요한 페이지를 실제로 읽었는가?',29,INK_MUTED)
save('saved-question.svg','질문 답과 근거와 남은 확인이 담긴 새 문서','활동을 준비하며 목차에서 개념·비교·현재 계획을 찾아 읽는다는 검토한 답을 질문 페이지에 저장한 구성 예다. 근거와 남은 확인을 연결하며, 15분 읽기 활동 중 위키 파일을 쓴다는 뜻이나 실제 모델 실행 결과가 아니다.',b,[33])

# Study guide only: parallel record types, never a fabricated duration axis.
b=text(35,75,'기록의 종류를 구별합니다',40,TEXT,550)
rows=[('의도','오늘 집중할 일'),('실행','메모 · 회의 · 실제 작업'),('현실','관찰된 화면 · 활동 기록'),('해석','돌아보며 의미 붙이기'),('AI 로그','대화와 작업의 요약')]
for i,(name,detail) in enumerate(rows):
    y=165+i*85
    b+=text(35,y,name,35,TEXT,550)+text(280,y,detail,34,TEXT)
    b+=rule(280,y+23,1115,y+23,LINE,1)+rule(1135,y-10,1220,y-10,LINE,1)
b+=path('M1220 155L1250 155L1250 495L1220 495',LINE,2)+arrow(1270,325,1312,325)
b+=text(1400,304,'회고',39,GREEN,550,'middle')+text(1400,367,'다음 계획',30,TEXT,anchor='middle')
b+=text(35,581,'개인 기록의 설명 예 · 다섯 유형은 LLM Wiki의 필수 구조가 아닙니다.',28,MUTED)
save('five-layers.svg','서로 다른 다섯 기록을 구별해 회고에 활용','의도·실행·현실·해석·AI 로그라는 서로 다른 기록 유형의 자작 설명 예다. 병렬 기록을 회고와 다음 계획에서 다시 읽으며 실제 시간·기간·고정 순서나 측정값을 뜻하지 않는다. 다섯 유형을 LLM Wiki의 필수 구조로 일반화하지 않는다.',b,[])

# Study guide only: each period asks a different question of saved records.
b=document(35,290,330,235)+text(72,361,'일별 기록',35,INK,550)+text(72,446,'무엇을 했나?',38,INK)
b+=arrow(392,395,470,332)
b+=text(520,214,'주간의 종합',37,GREEN,550)+lines(520,318,['무엇이 반복됐나?','다음 주는 어떻게?'],39,TEXT,83)
b+=arrow(965,285,1042,219)
b+=text(1080,137,'월 · 분기 · 연간',34,MUTED)+lines(1080,261,['어떤 맥락이','바뀌었나?'],44,TEXT,80,550)
b+=text(1080,463,'더 긴 질문과 서사',30,MUTED)
b+=text(35,583,'관찰한 사실과 나의 해석을 구별하며, 기록을 다시 읽어 종합합니다.',29,MUTED)
save('reflection-layers.svg','일별 기록을 다시 읽어 더 긴 기간의 질문으로','일별 기록을 주간에 다시 읽어 반복과 다음 계획을 종합하고 월·분기·연간의 더 긴 맥락을 묻는 자작 설명 배치다. 관찰 사실과 해석을 구별하며 회고의 정확성이나 효과를 자동으로 보장하지 않는다.',b,[])

# 38: The shared knowledge is open; roles do not create isolated stores.
b=text(35,70,'사람의 목적 · 다음 스터디의 한 쪽 진행안',33,MUTED)
b+=text(35,215,'작성 역할',38,TEXT,550)+lines(35,315,['읽기 · 초안','관계 연결'],38,TEXT,78)
b+=text(35,510,'각자 작업하며',28,MUTED)+arrow(362,330,450,330)
b+=text(510,185,'함께 읽는 위키',44,TEXT,550)
b+=lines(510,286,['원자료 · 개념 · 비교','현재 계획과 결정의 이유','결과물과 남은 확인'],36,TEXT,80)
b+=rule(510,495,1100,495,GREEN,2)+text(510,548,'같은 근거와 현재 결정',30,GREEN)
b+=arrow(1125,330,1200,330)+text(1240,215,'검토 역할',38,TEXT,550)+lines(1240,314,['근거 대조','조건 확인','수정 제안'],36,TEXT,75)
b+=path('M1350 502C1350 580 855 593 800 557',LINE,2)
save('shared-workspace.svg','작성과 검토가 같은 현재 위키를 함께 읽기','사람의 목적 아래 작성 역할과 검토 역할이 같은 원자료·개념·비교·현재 계획·결정 이유·결과와 남은 확인을 읽고 수정하는 자작 구성 예다. 역할별 독립 저장소나 실제 유명인 참여를 뜻하지 않는다.',b,[38])

# 39: Four meanings in working records, not four mandatory files.
rows=[('맥락','입문자와, 준비된 팩으로 15분'),('요청','한 쪽 진행안을 만들어 주세요.'),('논의','왜 이 두 메모인가?  범위는 맞는가?'),('결과','진행안 + 근거 + 남은 확인')]
b=''
for i,(label,detail) in enumerate(rows):
    y=105+i*130
    b+=text(35,y,label,38,MUTED)+text(295,y,detail,43,TEXT,500)
    if i<3:b+=rule(35,y+48,1460,y+48,LINE,1)
b+=text(35,581,'문서와 대화에 연결해 남길 내용 · 네 개의 독립 파일이 필수라는 뜻은 아닙니다.',27,MUTED)
save('work-context.svg','작업 기록의 맥락과 요청과 논의와 결과','입문자와 준비된 주제 메모 팩으로 15분 활동을 하려는 맥락, 한 쪽 진행안 요청, 두 메모의 선택 이유와 범위에 관한 논의, 진행안·근거·남은 확인을 연결하는 자작 구성 예다. 네 의미를 네 독립 파일의 의무로 제시하지 않는다.',b,[39])

# 40: The bright surface is an actual excerpt of the registered session plan.
b=document(35,20,1430,533)+text(75,86,'입문자와 함께 읽는 15분 LLM Wiki 활동',44,INK,600)
b+=text(75,149,'목표: 한 관계의 근거를 찾아 읽고, 다음 질문과 확인할 점을 남긴다.',34,INK)
b+=text(75,198,'자작 주제 메모 팩 · 목적과 맥락 + 지식의 활용',28,INK_MUTED)+rule(75,224,1423,224,PAPER_LINE)
rows=[('0~2분','왜 이 자료를 다시 쓰려는지 질문 정하기'),('2~6분','선택한 두 읽기 메모 확인하기'),('6~11분','원자료→개념→비교의 연결 한 개를 따라 읽기'),('11~15분','후속 질문에 근거를 연결하고 남은 확인 적기')]
for i,(time,action) in enumerate(rows):
    y=282+i*79;b+=text(75,y,time,36,INK,550)+text(345,y,action,35,INK)
b+=text(35,588,'준비된 팩을 함께 읽는 활동 배분안 · 설치나 모델 생성 완료 시간의 실측이 아닙니다.',27,MUTED)
save('session-plan.svg','15분 LLM Wiki 활동 진행안의 실제 발췌','등록 자료 materials/session-plan.md의 제목·목표·두 선택 메모·네 시간 구간을 발췌했다. 목적과 맥락·지식의 활용을 선택하고 목적2분·읽기4분·관계근거5분·후속질문4분으로 배분한다. 자작 주제 메모 팩의 활동안이며 실제 운영·학습효과·설치나 모델 생성 시간 측정이 아니다.',b,[40])

# 41: Review, saved result and next question have different visual jobs.
b=text(35,115,'대조한 내용',38,TEXT,550)+lines(35,216,['2 + 4 + 5 + 4 = 15분','출처와 작성 주체','근거와 문서 연결'],34,TEXT,88)
b+=text(35,520,'문서에서 확인한 범위',28,MUTED)+arrow(437,315,493,315)
b+=document(520,55,525,485)+text(560,125,'결과와 이유를 저장',36,INK,600)
b+=lines(560,227,['한 쪽 진행안','두 메모의 선택 이유','아직 남은 확인'],35,INK,88)
b+=text(560,496,'검토 기록을 위키에 연결',29,INK_GREEN)
b+=arrow(1062,315,1120,315)+text(1150,150,'다음 질문',29,MUTED)+text(1150,233,'30분이라면?',43,TEXT,550)
b+=lines(1150,338,['이번 결과와','선택 이유부터','다시 읽습니다.'],34,TEXT,68)
save('review-return.svg','진행안의 검토와 선택 이유를 다음 질문으로 연결','활동안의 시간 합계·출처와 작성 주체·근거 및 문서 연결을 대조한 범위를 나타낸다. 결과·두 메모의 선택 이유·남은 확인을 저장하고 30분이라면 무엇을 더 읽고 확인할지라는 후속 질문에 연결한다. 실제 학습효과나 사람 실행을 검증한 통계가 아니다.',b,[41])

print(json.dumps({'output':str(OUT),'files':len(MANIFEST),'theme':'stage','assets':MANIFEST},ensure_ascii=False,indent=2))
