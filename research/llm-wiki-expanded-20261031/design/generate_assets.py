"""Original vector scenes for the 35-minute LLM Wiki presentation."""
from pathlib import Path
from html import escape
import json
import sys

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else 'talks/llm-wiki/assets/expanded')
OUT.mkdir(parents=True, exist_ok=True)
PAPER = '#F2F0E8'
WHITE = '#FCFBF7'
INK = '#252A28'
NAVY = '#172238'
MUTED = '#68716B'
LINE = '#CBD0C6'
TEAL = '#63D7C5'
GREEN = '#286A5B'
CORAL = '#BD4B45'
WARM = '#F0DDD2'
SOFT = '#DCECE5'
FONT = "'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif"
MANIFEST = []


def text(x, y, label, size=36, fill=INK, weight=400, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{escape(label)}</text>'


def lines(x, y, labels, size=36, fill=INK, step=54, weight=400, anchor='start'):
    return ''.join(text(x, y+i*step, label, size, fill, weight, anchor) for i, label in enumerate(labels))


def rect(x, y, width, height, fill=WHITE, stroke=None, radius=0):
    border = f' stroke="{stroke}" stroke-width="2"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}"{border}/>'


def path(d, color=LINE, width=2, dash=None):
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'


def rule(x1,y1,x2,y2,color=LINE,width=2):
    return path(f'M{x1} {y1}L{x2} {y2}',color,width)


def circle(x,y,r,fill=TEAL,stroke=None):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>'


def arrow(x1,y1,x2,y2,color=MUTED,width=2):
    if y1 == y2:
        return rule(x1,y1,x2,y2,color,width)+path(f'M{x2-13} {y2-8}L{x2} {y2}L{x2-13} {y2+8}',color,width)
    if x1 == x2:
        return rule(x1,y1,x2,y2,color,width)+path(f'M{x2-8} {y2-13}L{x2} {y2}L{x2+8} {y2-13}',color,width)
    return rule(x1,y1,x2,y2,color,width)+circle(x2,y2,4,color)


def save(name,title,desc,body,slides):
    data=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="600" viewBox="0 0 1500 600" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title>
<desc id="desc">{escape(desc)}</desc>
<rect width="1500" height="600" fill="{PAPER}"/>
<g font-family="{FONT}" letter-spacing="-.4">{body}</g>
</svg>
'''
    (OUT/name).write_text(data)
    MANIFEST.append({'file':name,'title':title,'description':desc,'slides':slides,'width':1500,'height':600})


def three_sources(x=35,y=150,w=330):
    b=text(x,y-24,'같은 원자료 세 편',28,MUTED)
    rows=[('브라이언 대담','목적 · 개념 연결'),('용담 대담','검색 · 제어'),('브라이언 세미나','사람의 이유 · 공유 작업')]
    for i,(name,focus) in enumerate(rows):
        yy=y+i*116
        b+=rect(x,yy,w,104,WHITE,LINE,8)
        b+=rect(x,yy,7,104,GREEN if i!=1 else CORAL)
        b+=text(x+25,yy+41,name,34,INK,600)
        b+=text(x+25,yy+82,focus,26,MUTED)
    return b


# 3: Source files are an input; the connected knowledge surface is the hero.
b=rect(38,102,342,390,WHITE,LINE,10)
b+=text(70,164,'원자료',40,GREEN,700)
b+=text(70,217,'영상 · 메모 · 문서',30,MUTED)
for i,(label,yy) in enumerate([('읽기 메모 1',282),('읽기 메모 2',362),('읽기 메모 3',442)]):
    b+=rect(70,yy-38,265,58,PAPER,None,4)+rect(70,yy-38,5,58,GREEN)+text(93,yy,label,30)
b+=arrow(404,295,497,295,CORAL,3)+text(402,255,'읽고 연결',28,CORAL)
b+=rect(530,32,930,510,NAVY,None,14)
b+=text(576,100,'연결된 지식',45,WHITE,700)+text(1418,97,'wiki/',28,TEAL,anchor='end')
# Connections precede labels and stop away from the words.
for x1,y1,x2,y2 in [(690,205,1010,290),(1190,190,1010,290),(1010,290,790,430),(1010,290,1230,430),(790,430,1230,430)]:
    b+=rule(x1,y1,x2,y2,'#436E7A',2)
for x,y,label,col in [(690,205,'개념',TEAL),(1190,190,'비교',TEAL),(1010,290,'현재 이해',WHITE),(790,430,'계획',TEAL),(1230,430,'다음 질문',TEAL)]:
    b+=circle(x,y,12,col)+text(x,y-26,label,36,WHITE,500,'middle')
b+=text(574,508,'관계와 종합이 남고, 새 자료로 다시 고칩니다.',31,TEAL)
b+=text(45,579,'원자료를 보존하고 · 이해를 연결하고 · 다음 질문에서 다시 읽기',30,MUTED)
save('knowledge-layers.svg','저장된 자료에서 연결된 지식으로','원자료 세 개를 읽고 연결해 개념·비교·현재 이해·계획·다음 질문이 연결된 위키를 작성하고 유지한다. 이름이 있는 다섯 노드로 저장되는 관계를 보여준다.',b,[3])

# 11: Both comparison paths use the same three readings and question.
question='다음 AI 스터디에서 무엇부터 시도할까?'
b=text(36,68,question,44,CORAL,600)+three_sources()
b+=arrow(390,322,470,322)
b+=rect(503,150,467,338,NAVY,None,12)+text(539,210,'질문할 때 찾은 근거',34,TEAL,600)
b+=rule(539,239,930,239,'#45606A')
b+=lines(539,290,['목적과 연결에 관한 부분','검색과 위키에 관한 부분','사람의 이유와 공유 작업'],34,WHITE,51)
b+=text(539,445,'이번 답의 입력 문맥',30,TEAL)
b+=arrow(991,322,1054,322)
b+=text(1090,207,'이번 질문의 답',34,GREEN,600)
b+=lines(1090,285,['세 메모를 엮어','스터디 계획을','정리해 봅니다.'],38,INK,64)
b+=text(38,565,'검색한 근거를 읽고, 이번 질문에 맞게 종합하는 흐름',32,MUTED)
save('rag-path.svg','같은 자료와 질문의 단순 RAG 설명 예','세 영상의 읽기 메모에서 질문에 필요한 근거를 검색해 이번 입력 문맥에 넣고 답을 종합하는 교육용 예. 나쁜 답을 만들어 위키와 성능 우열을 비교하지 않는다.',b,[11])

# 12: Keep the comparison input identical; show the persistent linked structure.
b=text(36,68,question,44,CORAL,600)+three_sources()
b+=arrow(390,322,470,322)
b+=rect(503,130,958,390,NAVY,None,12)
b+=text(545,193,'먼저 작성하고 유지하는 연결 문서',36,TEAL,600)
for x1,y1,x2,y2 in [(705,272,1190,272),(705,272,940,382),(1190,272,940,382)]:b+=rule(x1,y1,x2,y2,'#4F7D83',2)
for x,y,label in [(705,272,'LLM Wiki 개념'),(1190,272,'RAG와 위키 비교'),(940,382,'우리 스터디 계획')]:
    b+=circle(x,y,10,TEAL)+text(x,y-22,label,34,WHITE,500,'middle')
b+=text(545,482,'필요한 쪽 재읽기 → 이번 답에 활용',34,TEAL)
b+=text(38,568,'이번 답: 세 메모를 엮어 스터디의 현재 계획을 정리합니다.',34,GREEN)
save('wiki-path.svg','같은 자료와 질문에서 연결된 위키를 읽는 흐름','세 영상 읽기 메모를 반영하며 LLM Wiki 개념·RAG와 위키 비교·우리 스터디 계획을 연결된 문서로 작성한다. 질문할 때 필요한 페이지를 찾아 다시 읽으며 새 이해를 갱신한다. 실제 성능 비교가 아닌 설명용 구성이다.',b,[12])

# 15: Agentic retrieval is a choice and repeat decision, not a new storage format.
b=text(40,94,'어디를, 어떻게 찾아볼까?',48,INK,600)
b+=lines(40,209,['사용자의 질문','필요한 근거는 무엇일까?'],36,INK,68)
b+=arrow(426,290,585,290)
b+=circle(736,290,105,NAVY)+text(736,280,'에이전트',36,WHITE,600,'middle')+text(736,332,'검색 판단',29,TEAL,400,'middle')
for y,label,col in [(125,'원자료',MUTED),(290,'위키 페이지',GREEN),(455,'웹 · 다른 도구',MUTED)]:
    b+=path(f'M841 290C1000 290 990 {y} 1110 {y}',col,3 if col==GREEN else 2)
    b+=circle(1120,y,9,TEAL if col==GREEN else LINE)+text(1160,y+12,label,36,INK,600 if col==GREEN else 400)
b+=path('M735 398C735 535 1067 554 1118 477',CORAL,2)
b+=text(800,546,'부족하면 다시 찾기',30,CORAL)
save('agentic-routing.svg','검색할 곳과 반복을 판단하는 에이전트','에이전트가 질문을 보고 원자료·위키 페이지·웹 또는 다른 도구 중 필요한 근거를 찾을 곳과 방식을 고른다. 근거가 부족하면 다시 찾을 수 있다. 위키 자체가 검색 없는 방식이라는 뜻은 아니다.',b,[15])

# 20: Two storage roles with a genuinely global rule line.
b=rect(35,35,430,424,WHITE,LINE,10)+text(73,104,'raw/',44,GREEN,700)+text(73,161,'보존할 원자료',34)
b+=rule(73,191,428,191)
b+=lines(73,240,['brian-video.md','yongdam-video.md','seminar-video.md'],30,MUTED,55)
b+=text(73,409,'원문 위치 · 읽기 메모',29,MUTED)
b+=arrow(490,250,560,250,CORAL)
b+=rect(590,35,870,424,NAVY,None,12)+text(630,104,'wiki/',44,TEAL,700)+text(630,162,'작성하고 갱신할 이해',34,WHITE)
for y,label,detail in [(228,'개념','여러 자료에서 만나는 설명'),(296,'비교 · 종합','차이와 현재 계획'),(364,'질문 · 목차 · 로그','답과 탐색, 변화의 이유')]:
    b+=text(631,y,label,34,TEAL,500)+text(915,y,detail,34,WHITE)
b+=rule(37,507,1460,507,GREEN,2)+text(39,563,'rules.md',30,GREEN,600)+text(225,563,'원자료 보존 · 근거 연결 · 관련 페이지 갱신 · 중요한 결과 확인',30,INK)
save('raw-wiki-rules.svg','원자료와 위키와 전역 작업 규칙','raw에는 세 영상 읽기 메모를 보존하고 wiki에는 개념·비교·종합·질문·목차와 로그를 작성하고 갱신한다. 두 영역 밖 아래 공통 행의 rules.md가 전체 작업을 안내한다.',b,[20])

# 23: Make the human purpose visible; no four identical cards.
b=rect(30,70,430,460,NAVY,None,12)
b+=text(74,139,'내가 남기려는 이유',30,TEAL)
b+=lines(74,237,['좋았던 자료가','어디에 쓰일까?'],43,WHITE,75,600)
b+=text(74,460,'사람이 직접 쓴 선택 이유',29,TEAL)
qs=[('01','어떤 맥락에서 읽었나요?','다음 AI 스터디를 준비합니다.'),('02','왜 이 자료를 남겼나요?','차이를 설명하고 한 쪽 진행안을 만들고 싶어요.'),('03','무엇이 중요했나요?','좋은 재료 · 사람의 이유 · 연결된 종합입니다.'),('04','앞으로 어디에 쓸 건가요?','다음 모임의 읽기 활동을 준비합니다.')]
for i,(n,q,a) in enumerate(qs):
    y=95+i*125
    b+=text(509,y,n,30,CORAL,600)+text(578,y,q,34,INK,600)+text(578,y+48,a,34,MUTED)
save('purpose-questions.svg','원자료를 넣는 사람의 맥락과 목적','영상의 목적 질문에서 착안한 설명용 대화. 읽은 맥락·저장 이유·중요했던 부분·향후 활용을 함께 전달한다. 실제 사용자 개인 프로필이나 원영상의 직접 인용문이 아니다.',b,[23])

# 25: Asymmetric input-to-relations flow; the relation surface is larger.
b=three_sources(35,140,335)+arrow(393,304,484,304,CORAL,3)+text(394,255,'인제스트',28,CORAL,600)
b+=rect(520,54,944,480,NAVY,None,12)+text(562,119,'자료의 내용과 관계를 함께 씁니다',38,WHITE,600)
for d in ['M715 236L1098 234','M715 236L1025 399','M1098 234L1025 399']:
    b+=path(d,'#4B777D',2)
for x,y,label,sub in [(715,236,'자료 요약','원자료의 입구'),(1098,234,'개념 · 비교','기존 설명과 연결'),(1025,399,'현재 계획','여러 자료의 종합')]:
    b+=circle(x,y,11,TEAL)+text(x,y-23,label,36,WHITE,500,'middle')+text(x,y+48,sub,28,TEAL,400,'middle')
b+=text(35,581,'형식 변환 → 요약과 개념 추출 → 관련 페이지 연결·갱신',31,MUTED)
save('ingest-map.svg','인제스트가 만드는 요약과 개념과 종합의 관계','세 영상 읽기 메모를 반영해 자료 요약·개념과 비교·현재 스터디 계획을 연결한다. 형식 변환만 수행하는 대신 관련 페이지의 의미를 함께 작성하고 갱신한다.',b,[25])

# 26: Different page roles shown through their real contents, not labels alone.
b=rect(35,40,610,492,WHITE,LINE,10)+text(76,102,'자료 요약',30,GREEN,600)+text(76,163,'브라이언 영상 메모',39,INK,600)
b+=lines(76,251,['자료를 넣는 목적을 묻는다.','개념을 뽑아 서로 연결한다.'],34,INK,65)
b+=rule(76,394,601,394)+text(76,448,'이 자료가 말한 내용을 다시 찾는 입구',28,MUTED)+text(76,499,'원문 위치  09:41 · 11:04 · 31:37',27,MUTED)
b+=arrow(666,280,720,280)
b+=rect(747,40,716,492,NAVY,None,12)+text(788,102,'개념 페이지',30,TEAL,600)+text(788,163,'LLM Wiki',43,WHITE,600)
b+=lines(788,252,['자료 사이의 관계와 현재 이해를','연결된 문서로 작성하고 갱신한다.'],34,WHITE,65)
b+=rule(788,394,1420,394,'#45686E')+text(788,450,'근거  대담 두 편 + 공동 세미나',28,TEAL)+text(788,501,'연결  RAG와 위키 비교 · 현재 계획',28,TEAL)
save('source-concept.svg','한 자료의 요약과 여러 자료의 개념 페이지','한 영상의 요약은 원문 위치와 그 자료의 설명을 다시 찾는 입구다. 개념 페이지는 여러 자료가 다루는 설명을 종합하고 세 읽기 메모와 관련 비교·계획 페이지에 연결한다. 발표용 구성 예다.',b,[26])

# 27: Comparison becomes an actionable synthesis, without fake performance numbers.
b=text(36,95,'자료 사이의 차이',43,INK,600)+text(36,162,'RAG  ↔  LLM Wiki',34,GREEN,600)
for i,(name,detail) in enumerate([('정리하는 시점','질문할 때 · 자료를 반영할 때'),('남는 결과','근거와 답 · 연결된 개념과 종합'),('함께 쓰는 방식','위키를 검색 대상으로 활용')]):
    y=245+i*125
    b+=rule(36,y-54,708,y-54)+text(36,y,name,30,MUTED)+text(36,y+55,detail,34,INK)
b+=arrow(733,300,799,300,CORAL)
b+=rect(833,36,630,500,NAVY,None,12)+text(875,108,'우리의 첫 시도',43,WHITE,600)
b+=lines(875,206,['세 메모를 함께 읽습니다.','개념·비교·계획을 남깁니다.','후속 질문에서 다시 읽습니다.'],35,WHITE,82)
b+=text(875,489,'syntheses/study-plan.md',27,TEAL)
save('comparison-synthesis.svg','자료 비교를 우리 스터디 계획으로 종합','RAG와 LLM Wiki의 정리 시점·남는 결과·병행 방식을 비교한 뒤 자료 세 메모·개념과 비교·다음 질문의 재읽기를 갖춘 우리 스터디 첫 시도 계획을 작성하는 설명용 예다.',b,[27])

# 29: Rule text and graph view are deliberately different representations.
b=text(35,96,'문서화한 정리 기준',38,GREEN,600)
b+=lines(35,207,['원문과 우리 해석을 구별한다.','관계를 연결한 이유를 적는다.','모르는 내용은 질문으로 남긴다.'],34,INK,104)
b+=text(35,547,'규칙은 정리의 기준입니다.',31,MUTED)
b+=rect(760,30,703,530,NAVY,None,12)+text(801,94,'문서의 연결을 따라 읽기',35,WHITE,600)
pts=[(858,188,'영상 1'),(1259,183,'영상 2'),(1019,289,'LLM Wiki'),(1310,324,'검색'),(867,422,'비교'),(1191,429,'계획'),(1061,514,'질문'),(1070,188,'세미나')]
for a,z in [(0,2),(1,2),(1,3),(2,4),(2,5),(3,4),(4,5),(5,6),(7,2),(7,5)]:
    x1,y1,_=pts[a];x2,y2,_=pts[z];b+=rule(x1,y1,x2,y2,'#507D84',2)
for x,y,label in pts:
    b+=circle(x,y,8,TEAL)+text(x,y-19,label,34,WHITE,500,'middle')
save('rules-graph.svg','정리 기준 문서와 실제 문서 연결의 보기','왼쪽의 규칙 문서는 원문과 해석·관계 이유·남은 질문을 구별하는 기준을 적는다. 오른쪽 그래프는 세 영상·개념·검색·비교·계획·질문의 실제 문서 연결을 탐색하는 보기다. 그래프 자체가 진실이나 온톨로지 전체를 증명하지 않는다.',b,[29])

# 31: One new condition fans out to scoped changes; universal definition unchanged.
b=rect(35,62,388,440,WARM,None,10)+text(73,124,'새로운 모임 조건',35,CORAL,600)
b+=lines(73,221,['입문자와 함께','준비된 읽기 팩','15분 활동'],36,INK,78)
b+=text(73,463,'설명용 가상 조건',28,CORAL)
b+=arrow(441,286,500,286,CORAL,3)
b+=rect(526,35,938,477,NAVY,None,12)+text(566,98,'관련 설명을 함께 갱신',38,WHITE,600)
for i,(name,detail) in enumerate([('개념 · 우리 적용 범위','입문 설명부터 다룹니다.'),('비교 · 선택 기준','작은 자료 묶음으로 시작합니다.'),('계획 · 작업과 시간','15분 활동에 맞춰 조정합니다.')]):
    y=183+i*125
    b+=text(566,y,name,29,TEAL,500)+text(566,y+50,detail,35,WHITE)
b+=text(36,575,'공통 정의는 유지합니다. 적용 범위·선택 기준·현재 계획을 고칩니다.',31,MUTED)
save('related-updates.svg','새 조건이 관련 페이지와 현재 계획을 함께 바꾸는 모습','입문자·준비된 공개 읽기 팩·15분 활동이라는 가상 모임 조건을 반영한다. 보편적인 LLM Wiki 정의를 바꾸는 대신 개념의 우리 적용 범위, 비교의 선택 기준, 계획의 작업과 시간을 갱신한다. 목차·로그·관련 질문도 확인한다.',b,[31])

# 32: Actual context reading sits between persistent files and this answer.
b=text(36,72,'입문자와 15분 활동은 무엇부터 할까?',44,CORAL,600)
b+=text(36,159,'필요한 페이지를 찾기',30,GREEN,600)
for i,label in enumerate(['목차와 작업 규칙','관련 개념과 비교','현재 스터디 계획','필요하면 원자료']):
    yy=226+i*80;b+=circle(50,yy-10,6,GREEN)+text(76,yy,label,34,INK)
b+=arrow(386,323,472,323)
b+=rect(502,164,459,332,NAVY,None,12)+text(540,223,'이번 답의 입력 문맥',31,TEAL,600)
b+=lines(540,310,['찾아낸 페이지를','실제로 읽습니다.'],39,WHITE,70)
b+=arrow(983,323,1054,323)
b+=text(1090,222,'현재 질문의 답',34,GREEN,600)+lines(1090,305,['목차와 연결을','읽고, 근거를','찾아봅니다.'],36,INK,65)
b+=text(36,574,'파일이 있다는 사실과 이번 답에 읽혔다는 사실은 다릅니다.',31,MUTED)
save('query-reading.svg','위키 페이지를 찾아 이번 답의 문맥으로 읽기','입문자와 15분 활동은 무엇부터 할지 질문한다. 목차와 작업 규칙, 관련 개념·비교·현재 계획, 필요하면 원자료를 찾아 실제 입력 문맥에 읽고 답한다. 파일의 존재와 이번 답의 실제 재읽기를 구별한다.',b,[32])

# 33: The saved answer is a new visible artifact, with provenance and open question.
b=rect(33,183,285,224,NAVY,None,12)+lines(65,258,['질문과 답도','위키의 일부로'],35,WHITE,66,600)
b+=arrow(337,294,393,294,GREEN)
b+=rect(420,35,1044,505,WHITE,LINE,10)
b+=text(461,91,'wiki/questions/first-study.md',27,MUTED)+rule(461,117,1423,117)
b+=text(461,177,'입문자와 15분 활동은 무엇부터 할까?',35,INK,600)
b+=lines(461,260,['공개 메모 두 개에서 목차와 연결을 읽습니다.','근거를 찾고, 질문 답을 남겨 다시 읽습니다.'],34,INK,63)
b+=rule(461,369,1423,369)+text(461,421,'근거  관련 개념 · 비교 · 현재 계획',30,GREEN)
b+=text(461,485,'남은 확인  필요한 페이지를 실제로 읽었는가?',29,MUTED)
b+=text(35,583,'저장한 답과 종합을, 한 쪽 진행안을 만드는 근거로 다시 읽습니다.',30,MUTED)
save('saved-question.svg','검토한 답과 근거가 저장된 새 질문 페이지','입문자와 15분 활동에서 목차·연결을 읽고 근거를 찾은 뒤 질문 답을 남긴다는 검토한 답을 질문 페이지로 저장한다. 관련 개념·비교·현재 계획을 근거로 연결하고 실제로 읽었는지라는 남은 확인도 남긴다. 실제 모델 실행 결과가 아닌 설명용 구성이다.',b,[33])

# 39: Parallel record types feed a reflection; no measured time or duration axis.
b=text(35,48,'기록을 구별해서 남기기',31,GREEN,600)
rows=[('의도','오늘 집중할 일',125,GREEN),('실행','메모 · 회의 · 실제 작업',215,INK),('현실','관찰된 화면 · 활동 기록',305,MUTED),('해석','돌아보며 의미 붙이기',395,CORAL),('AI 로그','대화와 작업의 요약',485,GREEN)]
for name,detail,y,c in rows:
    b+=text(35,y,name,36,c,600)+rule(243,y-11,1220,y-11,LINE,1)
    b+=rect(280,y-37,610,48,PAPER)+text(291,y,detail,34,c)
    b+=rect(962,y-36,214,56,WHITE,LINE,5)
    b+=rule(984,y-18,1151,y-18,c,2)+rule(984,y-2,1127,y-2,LINE,2)
    b+=rule(1176,y-11,1260,y-11,LINE,1)
b+=path('M1260 114L1290 114L1290 474L1260 474',GREEN,2)
b+=text(1392,270,'회고',37,GREEN,600,'middle')+text(1392,323,'다음 계획',30,INK,400,'middle')
b+=arrow(1307,288,1334,288,GREEN)
b+=text(35,581,'영상 발표자의 개인 기록 사례 · 다섯 층은 LLM Wiki의 필수 형식이 아닙니다.',28,MUTED)
save('five-layers.svg','서로 다른 다섯 기록을 구별해 회고에 활용','원영상 발표자가 설명한 의도·실행·현실·해석·AI 로그를 서로 다른 기록 유형의 병렬 층으로 시각화한다. 같은 길이의 얇은 연결과 문서 표시가 회고와 다음 계획으로 모인다. 실제 시간·기간·고정 순서나 측정값이 아니며 다섯 층을 LLM Wiki의 필수 구조로 제시하지 않는다.',b,[])

# 41: Longer questions arise through several periods of synthesis and review.
b=rect(56,329,300,184,WHITE,LINE,6)+rect(45,318,300,184,WHITE,LINE,6)+rect(34,307,300,184,WHITE,LINE,6)
b+=text(67,370,'일별 기록',34,GREEN,600)+text(67,443,'무엇을 했나?',34,INK)
b+=arrow(362,397,479,330,GREEN)
b+=rect(510,194,418,309,NAVY,None,12)+text(553,261,'주간의 종합',36,TEAL,600)
b+=lines(553,344,['무엇이 반복됐나?','다음 주는 어떻게?'],36,WHITE,70)
b+=arrow(951,290,1045,216,GREEN)
b+=rect(1073,65,389,438,WHITE,LINE,10)+text(1114,132,'월 · 분기 · 연간',34,GREEN,600)
b+=lines(1114,242,['어떤 맥락이','바뀌었나?'],40,INK,71,600)
b+=text(1114,444,'더 긴 질문과 서사',29,MUTED)
b+=text(35,579,'기록을 다시 읽어 종합하고, 관찰한 사실과 나의 해석을 구별합니다.',30,MUTED)
save('reflection-layers.svg','일별 기록에서 더 긴 기간의 질문으로','일별 기록을 주간에 다시 읽어 반복 패턴과 다음 계획을 만들고 월·분기·연간에는 더 긴 맥락의 질문으로 이어가는 설명용 배치다. 관찰한 사실과 해석을 구별하며 자동으로 정확한 회고가 보장된다는 뜻은 아니다.',b,[])

# 38: Several roles refer to one shared knowledge layer and the human's purpose.
b=text(35,64,'사람의 목적: 다음 스터디의 한 쪽 진행안',39,CORAL,600)
b+=rect(35,174,330,320,WHITE,LINE,10)+text(75,240,'작성 역할',38,GREEN,600)
b+=lines(75,324,['읽기 · 초안','관계 연결'],35,INK,67)
b+=text(75,457,'각자 작업하며',28,MUTED)
b+=arrow(383,328,452,328,GREEN)
b+=rect(478,122,644,383,NAVY,None,12)+text(522,188,'함께 읽는 위키',42,WHITE,600)
b+=lines(522,272,['원자료 · 개념 · 비교','현재 계획과 결정의 이유','결과물과 남은 확인'],34,WHITE,73)
b+=text(522,467,'같은 근거와 현재 결정을 참조',28,TEAL)
b+=arrow(1140,328,1205,328,GREEN)
b+=text(1241,240,'검토 역할',36,GREEN,600)
b+=lines(1241,323,['근거 대조','조건 확인','수정 제안'],34,INK,66)
b+=path('M1331 475C1331 550 820 560 800 521',CORAL,2)
b+=text(35,580,'역할을 나눠도, 공유할 목적·근거·현재 결정을 함께 읽습니다.',30,MUTED)
save('shared-workspace.svg','여러 작업자가 같은 위키와 기준을 읽는 공유 작업','사람의 목적 아래 작성 역할과 검토 역할이 같은 원자료·개념·비교·현재 계획·결정 이유·결과물·남은 확인을 참조하는 구성 예. 실제 유명인이나 특정 봇이 참여한다는 표현 없이 역할과 공통 지식의 관계를 보여준다.',b,[38])

# 39: Four meanings on one shared working surface, not four mandatory files.
b=text(36,73,'작업의 맥락이 결과까지 이어지도록',42,GREEN,600)
rows=[('맥락','입문자와, 준비된 팩으로 15분'),('요청','한 쪽 진행안을 만들어 주세요.'),('논의','왜 이 두 메모인가?  범위는 맞는가?'),('결과','진행안 + 근거 + 남은 확인')]
for i,(name,detail) in enumerate(rows):
    y=171+i*107
    b+=text(39,y,name,38,GREEN,600)+text(295,y,detail,37,INK)
    if i<3:b+=rule(39,y+40,1456,y+40,LINE,1)
b+=text(37,583,'문서와 대화에 연결해 남길 내용입니다. 네 개의 독립 파일이 필수라는 뜻은 아닙니다.',27,MUTED)
save('work-context.svg','공유 작업의 맥락 요청 논의 결과를 연결','입문자와 준비된 읽기 팩으로 15분 활동을 진행하려는 맥락, 한 쪽 진행안 요청, 두 메모를 고른 이유와 범위에 관한 논의, 진행안과 근거와 남은 확인을 연결한 설명용 예. 네 종류의 의미이지 네 독립 파일의 보편 의무는 아니다.',b,[39])

# 40: An excerpt of the real registered activity plan, with four large time rows.
b=rect(34,20,1430,533,WHITE,LINE,10)
b+=text(75,86,'입문자와 함께 읽는 15분 LLM Wiki 활동',44,GREEN,600)
b+=text(75,149,'목표: 한 관계의 근거를 찾아 읽고, 다음 질문과 확인할 점을 남깁니다.',34,INK)
b+=text(75,198,'준비된 공개 읽기 팩 · 세 메모 중 브라이언 대담 + 공동 세미나 선택',28,MUTED)
b+=rule(75,224,1423,224,LINE,2)
rows=[('0~2분','목적 한 문장 정하기'),('2~6분','선택한 두 읽기 메모 확인하기'),('6~11분','원자료→개념→비교의 연결과 근거 읽기'),('11~15분','후속 질문과 남은 확인 남기기')]
for i,(time,action) in enumerate(rows):
    y=282+i*79
    b+=text(75,y,time,36,GREEN,600)+text(345,y,action,35,INK)
b+=text(35,589,'준비된 팩을 함께 읽는 활동 배분안 · 설치나 모델 생성 완료 시간을 측정한 결과가 아닙니다.',27,MUTED)
save('session-plan.svg','실제 15분 LLM Wiki 활동 진행안의 핵심 발췌','등록 자료 materials/session-plan.md의 제목·목표·선택 자료·네 시간 구간을 크게 발췌했다. 전체 세 영상 메모 중 브라이언 대담과 공동 세미나 메모를 선택하고 목적2분·읽기4분·관계근거5분·후속질문4분으로 배분한다. 준비된 읽기 팩을 쓰는 설명용 활동안이며 실제 운영이나 설치·모델 생성 완료 시간 측정이 아니다.',b,[40])

# 41: Show what was checked, what was retained, and the next question. No badges.
b=text(35,104,'대조한 내용',39,GREEN,600)
b+=lines(35,195,['2 + 4 + 5 + 4 = 15분','출처와 작성 주체','근거와 문서 연결'],34,INK,88)
b+=text(35,478,'문서에서 확인한 범위',28,MUTED)
b+=arrow(438,300,490,300,GREEN)
b+=rect(515,53,526,484,NAVY,None,12)+text(556,119,'결과와 이유를 저장',37,WHITE,600)
b+=lines(556,216,['한 쪽 진행안','두 메모의 선택 이유','아직 남은 확인'],35,WHITE,85)
b+=text(556,486,'검토 기록을 위키에 연결',29,TEAL)
b+=arrow(1058,300,1111,300,GREEN)
b+=text(1145,157,'다음 질문',29,CORAL,600)
b+=text(1145,228,'30분이라면?',43,INK,600)
b+=lines(1145,326,['이번 결과와','선택 이유부터','다시 읽습니다.'],34,INK,66)
b+=text(35,584,'확인한 결과와 선택 이유를 남겨, 다음 질문의 근거로 다시 읽습니다.',29,MUTED)
save('review-return.svg','진행안을 대조한 기록과 선택 이유를 다음 질문에 연결','실제 활동안의 시간 합계·출처와 작성 주체·근거 및 문서 연결을 대조한 범위, 결과물·두 메모 선택 이유·남은 확인의 저장, 30분이라면 무엇을 더 읽고 확인할지라는 후속 질문을 연결한다. 실제 학습효과나 사람 실행을 검증한 배지·통계는 사용하지 않는다.',b,[41])

for asset in MANIFEST:
    if asset['file'] in ['five-layers.svg','reflection-layers.svg']:
        asset['materials']=['study-guide.md']

(Path(__file__).resolve().parent/'ASSET_CONTRACT.json').write_text(json.dumps({'theme':'paper','palette':{'paper':PAPER,'navy':NAVY,'teal':TEAL,'coral':CORAL,'green':GREEN},'assets':MANIFEST},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'output':str(OUT),'files':len(MANIFEST)},ensure_ascii=False))
