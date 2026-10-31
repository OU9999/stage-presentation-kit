# LLM Wiki · 내 자료를 AI와 함께 정리하는 방법

**내 자료를 AI와 함께 정리하고 연결하는 마크다운 지식창고**를 설명하는 23장 발표입니다. 본편 35분+Q&A 5분의 배분안이며 실제 음성 리허설 실측값은 아닙니다.

## 발표 흐름

- 1~5장: 정의·필요·파일 구조·사람과 AI의 역할
- 6~8장: 핵심 비교표와 같은 질문의 RAG/위키 경로 두 그림
- 9~13장: 자료 반영·개념 연결·목차·질문·새 조건의 갱신
- 14~22장: 자료 선택·목적·활용·실제 진행안·장점과 한계·첫 요청
- 23장: 자기 자료와 질문으로 Q&A

**기존 도식 9개를 본편에 배치**했습니다. 전체19도식과 수정 전48장 원고·대본은 [그림 부록](materials/visual-appendix.md)에 보존합니다. 본편을 간결하게 읽으며 필요한 상세 설명도 다시 찾을 수 있습니다. 스터디 메모·새 조건은 설명용 구성 예이며 실제 모델 실행이나 학습 효과의 증거가 아닙니다.

## 화면과 자료

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- [23장 대본](materials/speaker-script.md) · [진행표](assets/speaker-guide.txt)
- [원본 그림·48장 원고](materials/visual-appendix.md)
- [학습 자료](materials/index.md) · [혼자 공부하기](materials/study-guide.md)
- [자료 읽는 방법](materials/workshop.md) · [설계와 기술 원문](materials/reference-library.md)
- [예제 팩](assets/expanded-study.txt) · [별도 15분 활동](materials/session-plan.md)
- [고정 파일 교정 기록](materials/demo-log.md) · [고정 데모 ZIP](demo/llm-wiki-demo.zip)

## 수정과 재사용

원고는 [slides.md](slides.md)이며 `theme: stage`를 사용합니다. `test.md`는 사용자가 작성한 흐름 참고 메모로 보존합니다. 시각 자산과 기존 심화 예제도 보존합니다.

`npm run dev`로 미리 보고, `npm run build:site`로 생성하고, `npm run verify:site`로 생성물 일치를 확인합니다. `presentations/`는 생성 결과이므로 직접 편집하지 않습니다.
