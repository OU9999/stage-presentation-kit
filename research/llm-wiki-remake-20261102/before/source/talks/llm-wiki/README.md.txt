# LLM Wiki · 내 자료를 AI와 함께 정리하는 방법

**내 자료를 AI와 함께 정리하고 연결하는 마크다운 지식창고**를 설명하는 26장 발표입니다. 본편 35분+Q&A 5분의 배분안이며 실제 음성 리허설 실측값은 아닙니다.

## 발표 흐름

- 1~6장: 내 자료를 이해하는 개인 지식 베이스, 개인비서의 맥락, 파일과 사람·AI 역할
- 7~14장: RAG 핵심 비교와 두 경로 그림, Ingest의 소화·분해·연결·축적, 질문과 갱신
- 15~18장: 가치 있는 자료 선택, 목적과 구조화, 직접 쓴 감정·생각·판단과 AI 정리의 구분
- 19~25장: 활용과 실제 결과물, 사람이 읽고 고치는 장점, 한계와 첫 요청
- 26장: 자기 자료와 질문으로 Q&A

기존 핵심 도식9개를 유지합니다. [그림 부록](materials/visual-appendix.md)에서 전체19도식과 수정 전48장 원고·대본을 읽을 수 있습니다. 스터디 메모와 새 조건은 설명용 구성 예이며 실제 실행이나 학습 효과의 증거가 아닙니다.

## test.md의 내용을 반영한 곳

| 메모의 핵심 | 발표 |
| --- | --- |
| 내 데이터를 이해하는 개인 지식 베이스·마크다운·Karpathy의 공개 아이디어 | 2~5장 |
| 개인비서가 내 맥락을 알아야 하는 이유 | 4장 |
| RAG 준비와 파일 기반 시작 비교 | 7~9장 |
| 소화·분해·연결·축적·목차·문서 그래프 | 10~14장 |
| 모든 자료보다 목적에 맞는 가치 있는 자료 | 15~16장 |
| 맥락과 구조화가 어려운 이유·목적 없는 수집 | 17장 |
| 내가 정한 목적·직접 쓴 감정·생각·판단·AI와 구분 | 18·24장 |
| 읽기 쉽게 정리하고 사람도 함께 편집하는 장점 | 6·21장 |

날짜와 도구 예는 일차 자료에 확인했고, 유행의 인과·RAG DB 필수·10만개 경계 등의 단정은 교정했습니다.

## 화면과 자료

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- [26장 대본](materials/speaker-script.md) · [진행표](assets/speaker-guide.txt)
- [원본 그림·48장 원고](materials/visual-appendix.md)
- [학습 자료](materials/index.md) · [혼자 공부하기](materials/study-guide.md)
- [자료 읽는 방법](materials/workshop.md) · [설계와 기술 원문](materials/reference-library.md)
- [예제 팩](assets/expanded-study.txt) · [별도 15분 활동](materials/session-plan.md)
- [고정 파일 교정 기록](materials/demo-log.md) · [고정 데모 ZIP](demo/llm-wiki-demo.zip)

## 수정과 재사용

원고는 [slides.md](slides.md)이며 `theme: stage`를 사용합니다. `test.md`는 사용자가 작성한 흐름 참고 메모로 보존합니다. 시각 자산과 기존 심화 예제도 보존합니다.

수정 전 [DESIGN.md](../../DESIGN.md)를 읽고 변경 범위와 보존할 의미·자료를 정합니다. 최신 사용자 지시가 우선입니다. [현재 26장 검토](../../research/design-governance-20261102/design/LLM_WIKI_AUDIT.md)의 역할 맵을 재사용하고 영향 장·앞뒤 흐름을 갱신합니다. 완료할 때 [현재 판 검수](../../DESIGN.md#변경과-현재-판-검수)에 따라 실제 화면과 판정 이유를 남기며, [검수 기록 안내](../../DESIGN-REVIEW.md)로 현재 입력과 근거를 확인합니다. 기술 검사 성공과 시각 승인은 별도입니다.

`npm run dev`로 미리 보고, `npm run build:site`로 생성하고, `npm run verify:site`로 생성물 일치를 확인합니다. `presentations/`는 생성 결과이므로 직접 편집하지 않습니다.
