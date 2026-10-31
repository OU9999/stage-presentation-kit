# LLM Wiki · 자료가 지식으로 쌓이는 방식

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
