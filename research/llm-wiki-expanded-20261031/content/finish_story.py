# Executed by generate_story.py after the 48 content items are loaded.
assert len(ITEMS) == len(PLAN) == 48
assert sum(p['seconds'] for p in PLAN[:-1]) == 2100
talk = ROOT / 'talks/llm-wiki'
parts = ['---\ntitle: LLM Wiki · 자료가 지식으로 쌓이는 방식\ntheme: paper\n---']
for spec, item in zip(PLAN, ITEMS):
    controls = ['<!-- stage-slide', 'compose: ' + item['compose'], 'tone: ' + item['tone']]
    if item['image']:
        controls.append('fit: contain')
    controls.append('-->')
    content = '\n'.join(controls) + '\n# ' + spec['title'] + '\n\n'
    if item['image']:
        content += '![' + item['alt'] + '](./assets/expanded/' + item['image'] + ')\n\n'
    parts.append(content + item['body'])
header = parts.pop(0)
(talk / 'slides.md').write_text(header + '\n\n' + '\n\n---\n\n'.join(parts) + '\n')

def timestamp(seconds):
    return f'{seconds // 60:02}:{seconds % 60:02}'

script = '''---
title: '48장 대본 · 본편 35분과 Q&A 5분'
description: '필요·RAG와 비교·실제 작동·활용과 첫 시도의 기승전결을 잇는 발언과 진행 안내'
order: 3
---

# 48장 대본 · 본편 35분과 Q&A 5분

1~47장 본편은 **35분**, 48장 Q&A는 **5분**의 배분안입니다. 실제 음성 리허설을 측정한 시간은 아닙니다. 1→2→…→48장으로 진행합니다.

기승전결은 **기 5분: 필요 → 승 8분: RAG와 비교 → 전 14분: 위키 작동 → 결 8분: 활용·판단·첫 시도**입니다. 세 영상의 원문 자막과 개념 슬라이드·시연을 역할별로 재검토했습니다. 추가 공동 세미나는 별도 발표 전문가 두 명이 전체 자막을 각각 읽고 직접 협의한 계약을 반영했습니다. 연속 음성을 완주했다는 의미는 아닙니다. 기술 일반화는 일차 자료와 대조했습니다.

10~41장의 스터디 파일과 질문·답·한 쪽 진행안은 발표팀이 작성한 **설명용 구성 예**입니다. 세 영상의 읽기 메모는 실제 원문을 요약했고 새 모임 조건은 가상으로 정했습니다. 실제 모임 성과·자동 에이전트 실행·정확도 비교 결과로 소개하지 않습니다. 40장의 실제 활동안은 사전 준비된 공개 팩을 읽는 15분 활동이며 설치나 모델 생성 완료 시간은 아닙니다. 개인 기록·회고의 상세는 학습서에 보존합니다.

[학습 자료](./index.md) · [실습](./workshop.md) · [예제 팩](../assets/expanded-study.txt) · [실제 15분 진행안](./session-plan.md) · [영상과 기술 원문](./reference-library.md)

## 장별 시간표

| 장 | 막 | 시간 배분 | 화면 |
| --- | --- | --- | --- |
'''
elapsed = 0
ranges = []
for spec in PLAN:
    start = elapsed
    elapsed += spec['seconds']
    ranges.append((start, elapsed))
    script += f"| {spec['n']} | {spec['act']} | {timestamp(start)}~{timestamp(elapsed)} · {spec['seconds']}초 | {spec['title']} |\n"
script += '''
## 예제의 고정 경로

- 원자료: `raw/brian-video.md`, `raw/yongdam-video.md`, `raw/seminar-video.md`
- 가상 새 조건: `raw/study-retro.md`
- 작업 규칙: `rules.md`
- 개념: `wiki/concepts/llm-wiki.md`, `wiki/concepts/retrieval.md`
- 비교와 종합: `wiki/comparisons/rag-vs-wiki.md`, `wiki/syntheses/study-plan.md`
- 검토한 후속 답: `wiki/questions/first-study.md`
- 실제 읽는 결과와 확인: `wiki/outputs/study-session-plan.md`, `wiki/reviews/study-session-plan.md`
- 같은 결과의 등록 학습 문서: [session-plan.md](./session-plan.md)
- 탐색과 이력: `wiki/index.md`, `wiki/log.md`

이 경로의 내용은 [예제 팩](../assets/expanded-study.txt)에서 읽고 복사할 수 있습니다. 첨부를 여는 것만으로 여러 파일이 자동 생성되지는 않습니다. 도구가 규칙을 자동 인식한다고 가정하지 말고 요청에 명시합니다.
'''
for spec, item, (start, end) in zip(PLAN, ITEMS, ranges):
    script += f"\n## {spec['n']}장 · {spec['title']}\n\n"
    script += f"[읽기 {spec['n']}장](../slides.md#{spec['n']}) · {spec['act']} · {timestamp(start)}~{timestamp(end)} · {spec['seconds']}초\n\n"
    script += '**말하기**\n\n' + item['speech'] + '\n\n**진행:** ' + item['cue'] + '\n\n'
    if spec['n'] < 48:
        nxt = PLAN[spec['n']]
        script += f"**전환:** 다음은 {nxt['n']}장, 「{nxt['title']}」입니다.\n"
    else:
        script += '**마무리:** 남은 질문과 확인할 원문을 정리하고 종료합니다.\n'
(talk / 'materials/speaker-script.md').write_text(script)

guide = '''LLM Wiki · 자료가 지식으로 쌓이는 방식
48장 / 본편35분 + Q&A5분 / 시간 배분안

기 1~8장 00:00~05:00: 왜 지속하는 지식층이 필요한가
승 9~19장 05:00~13:00: RAG와 무엇을 남기고 언제 고치는가
전 20~36장 13:00~27:00: 세 영상 메모에서 개념·비교·계획·질문·갱신
결 37~47장 27:00~35:00: 학습·공유 작업·실제 한 쪽 진행안·검토·첫 시도
Q&A 48장 35:00~40:00

핵심: 연결·축적·갱신, 다음 질문에서 관련 쪽을 실제로 다시 읽기.
공통 질문: 다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?
후속 질문: 입문자와 15분 활동은 무엇부터 할까?
결과 뒤 질문: 30분이라면 무엇을 더 읽고 확인할까?

10~41장 구성 예: 실제 세 영상의 읽기 메모 + 가상 다음 모임 조건 + 실제 읽는 한 쪽 활동안.
자동 에이전트 실행·사람 운영 성과·RAG 성능 우열 실험으로 소개 금지.
37~41장: 학습→공유 지식→맥락/요청/논의/결과→실제 진행안→검토/30분 후속 질문.
15분 활동은 사전 준비 팩에서 세 메모 중 brian+seminar 두 개를 선택.
0~2 목적,2~6 메모 읽기,6~11 관계 근거,11~15 후속 질문:2+4+5+4=15분.
설치·계정 연결·모델 전체 생성 시간 보장·실제 학습 효과로 소개 금지.
45장 자기 노트 질문 작성20초, 공유 선택. 웹 입력/저장 기능 없음.
40/41장 실제 session-plan.md 읽기 링크,46장 예제 팩·실습,48장 학습서·세 영상 연결.
본편은 선형1→48. 실제 음성 시간·사람 반응은 측정하지 않음.

장별 제목과 시간
'''
for spec, (start, end) in zip(PLAN, ranges):
    guide += f"{spec['n']:02} {timestamp(start)}~{timestamp(end)} {spec['title']}\n"
(talk / 'assets/speaker-guide.txt').write_text(guide)

readme = '''# LLM Wiki · 자료가 지식으로 쌓이는 방식

제공된 세 영상의 자막·개념 슬라이드·시연과 별도 발표 전문가 공동 검토를 반영한 **48장, 본편35분+Q&A5분** 발표입니다. 시간은 배분안이며 음성 리허설 실측값은 아닙니다.

## 발표의 기승전결

| 막 | 범위 | 설명 |
| --- | --- | --- |
| 기 · 5분 | 1~8장 | 저장한 자료와 다시 쓸 이해의 차이, 등장 동기, 연결·축적·갱신 |
| 승 · 8분 | 9~19장 | 같은 자료와 질문의 RAG/위키 비교, 작업 시점·결과·갱신·부담, 병행 가능성 |
| 전 · 14분 | 20~36장 | 목적·raw/wiki/rules·문서 역할·새 조건의 다중 갱신·query/save/lint |
| 결 · 8분 | 37~47장 | 학습·공유 작업·한 쪽 진행안·검토와 후속 질문, 유지 판단과 첫 요청 |
| Q&A · 5분 | 48장 | 자기 자료와 후속 질문을 함께 검토 |

세 영상의 읽기 메모에서 선별·사람의 선택 이유·개념/비교·현재 계획·갱신과 후속 답을 거쳐 실제 읽을 수 있는 한 쪽 진행안으로 이어집니다. 같은 자료·질문으로 검색/생성과 지속 문서의 차이를 설명하지만 실제 성능 실험으로 소개하지 않습니다.

## 화면과 학습 자료

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- [학습 자료](../../presentations/llm-wiki/materials/index.html) · [48장 대본](materials/speaker-script.md)
- [혼자 공부하기](materials/study-guide.md) · [실습](materials/workshop.md) · [영상과 원문](materials/reference-library.md)
- [읽기 메모·새 조건·위키 예제 팩](assets/expanded-study.txt)
- [실제 15분 활동 진행안과 확인 범위](materials/session-plan.md)
- [기존 고정 파일 교정 기록](materials/demo-log.md) · [고정 데모 ZIP](demo/llm-wiki-demo.zip)

10~41장의 파일과 답·활동안은 발표팀이 작성한 구성 예입니다. 세 원자료 메모는 실제 영상을 요약했고 새 모임 조건은 가상입니다. 실제 모임 성과나 자동 에이전트 실행으로 소개하지 않습니다. 개인 기록·회고 상세는 학습서에 보존했습니다. 15분 활동은 준비된 팩에서 목적과 연결 메모·공동 세미나 메모 두 개를 골라 읽는 활동으로, 설치와 전체 생성 완료 시간은 아닙니다.

## 진행과 참여

1→2→…→48장의 선형 진행입니다. 45장에서 자기 자료·대상·만들 결과를 한 문장으로 적는20초를 배분하며 공유는 선택입니다. 웹 투표·입력 저장·자동 집계 기능은 없습니다. 40·41장에서 실제 활동안과 확인 범위를 읽고, 46장에서 예제 팩과 실습으로, 48장에서 학습서와 세 영상·기술 원문 안내로 이어집니다.

## 수정과 재사용

- 원본: [slides.md](slides.md), 덱 로컬 `theme: paper` 설정
- 시각 자산: `assets/expanded/*.svg`, [출처와 제작 기록](assets/CREDITS.md)
- 대본: [speaker-script.md](materials/speaker-script.md), [진행표](assets/speaker-guide.txt)
- 생성: `npm run dev`, `npm run build:site`, 생성물 일치 확인 `npm run verify:site`

`presentations/`는 생성 결과이며 HTML·content.js를 직접 편집하지 않습니다. 다른 주제로 옮길 때 이 폴더를 복사해 원고·자료·자산과 예제의 근거를 바꾸고 공통 runtime을 포함해 생성합니다. 이전 사진·24장용 SVG·고정 교정 데모는 출처 이력과 함께 보존했습니다.

이번 설계와 확인 범위는 [확장 발표 조사](../../research/llm-wiki-expanded-20261031/)에 있습니다.
'''
(talk / 'README.md').write_text(readme)
stats = dict(slides=len(ITEMS), speechCharacters=sum(len(i['speech']) for i in ITEMS[:-1]),
             speechCharactersWithQA=sum(len(i['speech']) for i in ITEMS), coreSeconds=2100, qaSeconds=300,
             media=[dict(n=p['n'], image=i['image']) for p,i in zip(PLAN,ITEMS) if i['image']],
             sourceTitles=[p['title'] for p in PLAN])
(HERE / 'source-stats.json').write_text(json.dumps(stats, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k:v for k,v in stats.items() if k not in ['media','sourceTitles']}, ensure_ascii=False))
