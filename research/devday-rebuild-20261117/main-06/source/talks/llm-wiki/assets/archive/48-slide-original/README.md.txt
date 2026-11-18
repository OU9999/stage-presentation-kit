# LLM Wiki · 자료가 지식으로 쌓이는 방식

자료를 연결된 문서로 정리하고, 다음 질문과 결과물에 다시 쓰는 LLM Wiki를 설명하는 **48장, 본편 35분+Q&A 5분** 발표입니다. 시간은 배분안이며 음성 리허설 실측값은 아닙니다.

## 발표의 기승전결

| 막 | 범위 | 설명 |
| --- | --- | --- |
| 기 · 5분 | 1~8장 | 저장한 자료와 다시 쓸 이해의 차이, 등장 동기, 연결·축적·갱신 |
| 승 · 8분 | 9~19장 | 같은 자료와 질문의 RAG/위키 비교, 작업 시점·결과·갱신·부담, 병행 가능성 |
| 전 · 14분 | 20~36장 | 목적·raw/wiki/rules·문서 역할·새 조건의 다중 갱신·query/save/lint |
| 결 · 8분 | 37~47장 | 학습·공유 작업·한 쪽 진행안·검토와 후속 질문, 유지 판단과 첫 요청 |
| Q&A · 5분 | 48장 | 자기 자료와 후속 질문을 함께 검토 |

목적과 맥락·검색과 비교·지식의 활용이라는 세 주제 메모에서 출발합니다. 사람의 선택 이유와 개념·비교·현재 계획을 연결하고, 새 조건에 맞춰 갱신한 뒤 한 쪽 진행안과 검토 이유를 남깁니다. 같은 자료·질문으로 RAG와 지속 문서의 차이를 설명하는 구성 예이며 실제 성능 실험은 아닙니다. LLM Wiki의 개념은 Karpathy의 공개 설계와 관련 기술 원문을 바탕으로 설명합니다.

## 화면과 학습 자료

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- [학습 자료](../../presentations/llm-wiki/materials/index.html) · [48장 대본](materials/speaker-script.md)
- [혼자 공부하기](materials/study-guide.md) · [읽기 활동](materials/workshop.md) · [설계와 기술 원문](materials/reference-library.md)
- [주제 메모·새 조건·위키 예제 팩](assets/expanded-study.txt)
- [실제 15분 활동 진행안과 확인 범위](materials/session-plan.md)
- [기존 고정 파일 교정 기록](materials/demo-log.md) · [고정 데모 ZIP](demo/llm-wiki-demo.zip)

10~41장의 주제 메모와 파일, 답·활동안은 발표팀이 작성한 구성 예이며 새 모임 조건은 가상입니다. 실제 모임 성과나 자동 에이전트 실행으로 소개하지 않습니다. 개인 기록·회고 상세는 학습서에 보존했습니다. 별도 15분 활동은 준비된 팩에서 목적과 맥락·지식의 활용 메모를 골라 읽는 활동입니다. 설치나 위키 전체 생성 시간은 포함하지 않습니다.

## 진행과 참여

1→2→…→48장의 선형 진행입니다. 45장에서 자기 자료·대상·만들 결과를 한 문장으로 적는 20초를 배분하며 공유는 선택입니다. 웹 투표·입력 저장·자동 집계 기능은 없습니다. 40·41장에서 별도 읽기 활동의 진행안과 확인 범위를 보고, 46·48장에서 예제 팩·학습서·설계와 기술 원문으로 이어집니다. 발표 중 위키 제작 실습을 진행하지 않습니다.

## 수정과 재사용

- 원본: [slides.md](slides.md), 덱 로컬 `theme: stage` 설정
- 시각 자산: `assets/expanded/*.svg`, [출처와 제작 기록](assets/CREDITS.md)
- 대본: [speaker-script.md](materials/speaker-script.md), [진행표](assets/speaker-guide.txt)
- 생성: `npm run dev`, `npm run build:site`, 생성물 일치 확인 `npm run verify:site`

`presentations/`는 생성 결과이며 HTML·content.js를 직접 편집하지 않습니다. 다른 주제로 옮길 때 이 폴더를 복사해 원고·자료·자산과 예제의 근거를 바꾸고 공통 runtime을 포함해 생성합니다. 이전 사진·24장용 SVG·고정 교정 데모는 출처 이력과 함께 보존했습니다.

이번 복원 방향과 확인 범위는 [DevDay 복원 검토](../../research/llm-wiki-devday-20261031/)에 있습니다. 이전 조사와 원출처 기록은 기존 연구 폴더에 보존합니다.
