from pathlib import Path
from html import escape
import sys


OUT = Path(sys.argv[1] if len(sys.argv) > 1 else 'talks/llm-wiki/assets/rebuild')
OUT.mkdir(parents=True, exist_ok=True)
BG = '#080808'
PAPER = '#f2f0e8'
INK = '#232321'
MUTED = '#6b6b65'
WHITE = '#f6f6f4'
GREY = '#a5a5a0'
BLUE = '#275f89'
YELLOW = '#f5df91'
FONT = "'Noto Sans CJK KR','Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif"


def txt(x, y, label, size=34, color=INK, weight=400, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{escape(label)}</text>'


def lines(x, y, labels, size=34, color=INK, leading=50, weight=400):
    return ''.join(txt(x, y + i * leading, label, size, color, weight) for i, label in enumerate(labels))


def rect(x, y, w, h, fill=PAPER, stroke=None):
    border = f' stroke="{stroke}" stroke-width="1.5"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"{border}/>'


def line(x1, y1, x2, y2, color='#cac8c0', width=1.5):
    return f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{width}"/>'


def arrow(x1, y, x2, color=GREY):
    return line(x1, y, x2, y, color, 2) + f'<path d="M{x2-13} {y-8}L{x2} {y}L{x2-13} {y+8}" fill="none" stroke="{color}" stroke-width="2"/>'


def save(name, title, desc, body):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="540" viewBox="0 0 1500 540" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title>
<desc id="desc">{escape(desc)}</desc>
<rect width="1500" height="540" fill="{BG}"/>
<g font-family="{FONT}" letter-spacing="-.35">{body}</g>
</svg>
'''
    (OUT / name).write_text(svg, encoding='utf-8')


def paper(x=0, w=1500, path='wiki/comparisons/context-vs-weights.md', title='입력 문맥과 모델의 파라미터'):
    return rect(x, 8, w, 524) + txt(x+42, 59, path, 26, MUTED) + line(x+42, 82, x+w-42, 82) + txt(x+42, 148, title, 44, INK, 600)


def sidebar(active='comparison'):
    b = txt(16, 54, 'my-study/', 30, GREY)
    b += txt(16, 119, 'raw/', 34, WHITE)
    b += lines(38, 167, ['rag-note.md', 'lora-note.md'], 26, GREY, 42)
    b += txt(16, 274, 'wiki/', 34, WHITE)
    items = [('concept', 'concepts/'), ('comparison', 'comparisons/'), ('question', 'questions/')]
    for index, (key, label) in enumerate(items):
        y = 324 + index * 46
        b += txt(38, y, label, 28, WHITE if key == active else GREY)
        if key == active:
            b += line(16, y-23, 16, y+5, '#69cf82', 3)
    b += txt(16, 502, 'rules.md', 28, GREY)
    return b


# 3 / 9: First show the actual result. Repeat this exact file later.
b = paper()
b += txt(42, 222, 'RAG', 34, BLUE, 600)
b += txt(796, 222, '미세조정', 34, BLUE, 600)
b += line(750, 193, 750, 387)
b += lines(42, 281, ['찾은 자료를 읽어', '답의 입력에 사용한다.'], 38, INK, 54)
b += lines(796, 281, ['예제로 학습해', '모델의 동작을 조정한다.'], 38, INK, 54)
b += txt(42, 391, '바뀌는 대상: 현재 입력 문맥', 30, MUTED)
b += txt(796, 391, '바뀌는 대상: 파라미터·어댑터', 30, MUTED)
b += line(42, 431, 1458, 431)
b += txt(42, 485, '연결  [[검색해 읽기]]  [[모델 적응]]', 30, BLUE)
b += txt(1458, 485, '근거: rag-note · lora-note', 26, MUTED, anchor='end')
save('compare-page.svg', '입력 문맥과 파라미터를 비교한 위키 문서', '설명용 구성 예. 같은 비교 페이지에서 RAG는 관련 자료를 현재 입력에 사용하고 미세조정은 학습으로 파라미터나 어댑터를 조정한다는 차이를 읽는다. 관련 개념과 원자료를 연결한다.', b)


# 6: Raw source material is preserved; the wiki is maintained.
b = rect(0, 20, 470, 430)
b += txt(38, 88, 'raw/', 48, INK, 600)
b += txt(38, 139, '원자료를 보존', 30, MUTED)
b += line(38, 168, 432, 168)
b += txt(38, 238, 'rag-note.md', 36)
b += txt(38, 300, 'lora-note.md', 36)
b += txt(38, 414, '원문 링크 · 읽기 메모', 28, MUTED)
b += arrow(493, 265, 553)
b += rect(580, 20, 920, 430)
b += txt(622, 88, 'wiki/', 48, INK, 600)
b += txt(622, 139, '개념과 비교를 작성·갱신', 30, MUTED)
b += line(622, 168, 1458, 168)
b += txt(622, 235, 'concepts/', 34, BLUE)
b += txt(875, 235, '검색해 읽기 · 모델 적응', 34)
b += txt(622, 305, 'comparisons/', 34, BLUE)
b += txt(875, 305, '입력 문맥과 파라미터', 34)
b += txt(622, 375, 'questions/', 34, BLUE)
b += txt(875, 375, '다시 쓸 질문과 답', 34)
b += txt(0, 510, 'rules.md  읽기·쓰기·근거·점검의 규칙', 28, GREY)
save('raw-wiki.svg', '보존하는 원자료와 갱신하는 위키', '설명용 스터디 폴더. raw에는 RAG와 LoRA 읽기 메모를 보존한다. wiki에는 개념, 비교, 질문과 답을 작성하고 갱신한다. rules.md는 이 전체 작업의 규칙이다.', b)


# 7: A source note is read into one concept and linked into a comparison.
b = rect(0, 30, 500, 480)
b += txt(36, 86, 'raw/rag-note.md', 28, MUTED)
b += line(36, 110, 464, 110)
b += txt(36, 180, 'RAG 읽기 메모', 42, INK, 600)
b += lines(36, 256, ['필요한 자료를 찾아', '답의 입력에 사용한다.'], 36, INK, 55)
b += txt(36, 449, '원문을 확인한 메모', 28, MUTED)
b += arrow(525, 271, 626)
b += rect(652, 30, 848, 480)
b += txt(692, 86, 'wiki/concepts/retrieval.md', 28, MUTED)
b += line(692, 110, 1460, 110)
b += txt(692, 180, '검색해 읽기', 44, INK, 600)
b += lines(692, 256, ['관련 자료를 찾아', '현재 답변의 문맥에 넣는다.'], 36, INK, 55)
b += line(692, 356, 1460, 356)
b += txt(692, 407, '기존 비교에 연결  [[문맥과 가중치]]', 32, BLUE)
b += txt(692, 458, '근거  rag-note.md → 원문 링크', 28, MUTED)
save('ingest-links.svg', '자료를 개념과 기존 비교에 연결하는 인제스트', '설명용 구성 예. RAG 읽기 메모를 읽어 검색해 읽기 개념을 작성하고, 기존 문맥과 가중치 비교 페이지에 연결하며 원자료 근거를 남긴다.', b)


# 8: Open one concept; viewers can read the actual explanation.
b = sidebar('concept') + paper(355, 1145, 'wiki/concepts/retrieval.md', '검색해 읽기')
b += lines(397, 226, ['관련 자료를 찾아', '현재 답변의 입력에 사용한다.'], 40, INK, 58)
b += txt(397, 367, '파라미터를 바꾸는 학습과 구분한다.', 34)
b += line(397, 410, 1458, 410)
b += txt(397, 459, '연결  [[모델 적응]]  [[문맥과 가중치]]', 30, BLUE)
b += txt(397, 507, '근거  rag-note.md · 원문 링크', 26, MUTED)
save('concept-page.svg', '위키의 검색해 읽기 개념 페이지', '설명용 구성 예. 관련 자료를 찾아 현재 답변의 입력에 사용하는 개념을 설명한다. 모델의 파라미터를 바꾸는 학습과 구별하고, 모델 적응과 문맥 대 가중치 비교 및 원문 근거에 연결한다.', b)


# 10: Read selected files into this answer's context; no automatic memory.
b = txt(0, 83, '다음 질문', 30, GREY)
b += lines(0, 163, ['우리 스터디의', '최신 정정은 어디에', '반영할까요?'], 43, WHITE, 64, 500)
b += arrow(437, 337, 530)
b += rect(570, 20, 930, 500)
b += txt(612, 81, '이번 답변에서 읽은 문맥', 38, INK, 600)
b += line(612, 111, 1458, 111)
b += txt(612, 169, '작업 규칙', 32, MUTED)
b += txt(612, 218, '문맥과 가중치 비교 · 관련 원자료', 32, MUTED)
b += line(612, 259, 1458, 259)
b += lines(612, 330, ['정정을 위키에 남기고,', '다음 답변에서 다시 읽습니다.'], 38, INK, 57)
b += txt(612, 470, '관련 페이지를 찾아 실제 입력에 읽어 넣기', 28, BLUE)
save('query-context.svg', '관련 위키를 찾아 현재 답변의 문맥에 읽는 질문 과정', '설명용 구성 예. 우리 스터디의 최신 정정을 어디 반영할지 질문한다. 작업 규칙, 기존 문맥과 가중치 비교, 관련 원자료를 실제 답변 문맥으로 읽어 정정을 위키에 남기고 다음 답변에서 다시 읽으라고 답한다.', b)


# 11: The answer is now one persistent, linked question page.
b = sidebar('question') + paper(355, 1145, 'wiki/questions/study-corrections.md', '스터디의 최신 정정 반영')
b += lines(397, 227, ['정정은 검토한 위키 문서에 남긴다.', '다음 답변에서 관련 페이지를 찾아 읽는다.'], 34, INK, 55)
b += txt(397, 373, '위키 수정이 모델 학습은 아니다.', 34, BLUE)
b += line(397, 412, 1458, 412)
b += txt(397, 459, '근거  [[문맥과 가중치]]  +  관련 원자료', 30, MUTED)
b += txt(397, 507, '다음 확인  바뀐 설명이 다음 답변에도 쓰이는가', 28, MUTED)
save('question-saved.svg', '답과 근거가 남은 질문 페이지', '설명용 구성 예. 스터디의 최신 정정을 위키에 남기고 다음 답변에서 관련 페이지를 찾아 읽는다는 답을 질문 파일에 저장한다. 위키 수정은 모델 학습이 아니며, 비교 페이지와 관련 원자료를 근거로 연결한다.', b)


# 12: Preserve the previous comparison, then add an agentic search dimension.
b = paper()
b += txt(42, 214, 'RAG', 34, BLUE, 600)
b += txt(796, 214, '미세조정', 34, BLUE, 600)
b += line(750, 190, 750, 319)
b += txt(42, 270, '찾은 자료를 현재 입력에 사용', 34)
b += txt(796, 270, '학습으로 파라미터를 조정', 34)
b += rect(28, 331, 1444, 126, YELLOW)
b += txt(50, 374, '새 비교 축  ·  Agentic RAG', 28, MUTED)
b += txt(50, 425, '에이전트가 검색할 곳·방법·반복을 결정', 36, INK, 500)
b += txt(42, 502, '근거 추가  raw/agentic-note.md → 원문 링크', 28, MUTED)
save('agentic-update.svg', '새 자료로 검색 판단의 비교 축이 추가된 같은 위키', '설명용 구성 예. 기존 RAG와 미세조정의 차이를 유지한다. 새 agentic RAG 메모를 읽어 에이전트가 검색할 곳과 방법과 반복을 결정할 수 있다는 비교 축을 기존 문서에 보완하고 새 근거를 연결한다.', b)


# 13: Lint is a check of the page and its evidence, not proof of truth.
b = paper(0, 1000, 'wiki/concepts/retrieval.md', '검색해 읽기')
b += lines(42, 229, ['관련 자료를 찾아', '현재 답변의 입력에 사용한다.'], 38, INK, 58)
b += line(42, 345, 958, 345)
b += txt(42, 398, '연결  [[문맥과 가중치]]', 32, BLUE)
b += txt(42, 459, '근거  rag-note.md → 원문 링크', 30, MUTED)
b += txt(1075, 85, '읽고 확인하기', 32, GREY)
b += lines(1075, 180, ['근거가 맞는가', '설명이 낡았는가', '연결이 열리는가'], 38, WHITE, 88)
b += line(1075, 407, 1480, 407, '#555550')
b += lines(1075, 463, ['파일 점검만으로', '의미가 맞지는 않는다.'], 30, GREY, 46)
save('lint-review.svg', '문서의 근거와 내용과 연결을 점검하는 린트', '설명용 구성 예. 개념 페이지를 다시 읽으며 근거가 맞는지, 설명이 오래되었는지, 연결이 열리는지 확인한다. 파일과 링크 검사만으로 의미 정확도가 보장되지는 않는다.', b)

print(f'Wrote {len(list(OUT.glob("*.svg")))} SVG files to {OUT}')
