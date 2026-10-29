# 다음 질문에 다시 쓰는 LLM Wiki

Zoom AI 스터디를 위한 40장 발표와 별도 학습 자료6개입니다. LLM이 원자료 사이의 개념·비교·종합을 연결된 Markdown 위키로 작성하고 갱신하는 이유와 흐름을 설명합니다. 독서·고객 요구·강의 메모의 서로 다른 적용 예로 입력→여러 페이지 갱신→후속 질문→유용한 답의 저장을 따라갑니다.

기본 진행은 **1~28장 연속: 설명·참여18분 → 40장 Q&A2분**입니다.29~39장은 선택 심화이며 모두 열면555초를 별도로 더합니다.20분은 배분안이며 실제 리허설·사람 반응은 측정하지 않았습니다.

## 화면과 자료

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- [학습 자료 모음](../../presentations/llm-wiki/materials/index.html)
- [혼자 공부하기](../../presentations/llm-wiki/materials/study-guide.html) · [실습과 해설](../../presentations/llm-wiki/materials/workshop.html)
- [40장 대본](../../presentations/llm-wiki/materials/speaker-script.html) · [원문과 근거 안내](../../presentations/llm-wiki/materials/reference-library.html)
- [보조 파일 교정 실행 기록](../../presentations/llm-wiki/materials/demo-log.html) · [고정 데모 ZIP](demo/llm-wiki-demo.zip)

본편의 세 사례는 가상 자료로 만든 적용 예이며 실제 모델 출력·고객·소설·학생 기록이 아닙니다. 입력과 전후 파일, 질문 답의 저장을 [독서](assets/examples/reading.txt)·[고객 요구](assets/examples/team.txt)·[강의 메모](assets/examples/course.txt) 첨부에서 읽을 수 있습니다.

심화에서는 원저자의 제안, 관찰한 공개 코드, 제한된 논문 실험, 우리가 만든 구성 예를 구별합니다. Microsoft 공개 코드의 `/save` handler는 수동 저장 안내만 하며, 논문의 실제 wiki arm은 고정 문맥과 질문 대상 자료를 받고 RAG arm은 검색합니다. 이를 설치 성공·조직 도입·표현만의 공정 비교·보편 우위로 소개하지 않습니다.

## 진행과 참여

28장 안의 ‘질문과 적용 이야기’→40장으로 이동합니다.40장에는29장 공개 구현/실험과34장 기존 파일 교정 실습 진입 링크가 있습니다.34/39장의 복귀 링크는40장으로 갑니다. 발표 장 안의 `#N` 링크로 이동하며 자료의 `slides.md#N`은 별도 읽기 화면을 여는 참고 경로입니다.

13장은 같은 크기와 색의 두 상담을 읽고 ‘같은 요청으로 묶어도 될까요?’를5초 생각합니다. 구분 이유는14/15장에서 확인합니다.24장은 자기 노트에 질문 한 줄을20초 동안 적고 공유는 선택입니다. 자료 제목은 기억나는 만큼, 근거 위치는 다음에 확인해도 됩니다. 응답이 없으면 질문을 간직하고 진행합니다. 웹 투표·자동 집계·입력 저장 기능은 없습니다.

## 수정할 원본

- 발표: [slides.md](slides.md)
- 자료 목차: [materials/index.md](materials/index.md)
- 학습서: [materials/study-guide.md](materials/study-guide.md)
- 실습: [materials/workshop.md](materials/workshop.md)
- 대본: [materials/speaker-script.md](materials/speaker-script.md)
- 원문 안내: [materials/reference-library.md](materials/reference-library.md)
- 보조 실행 기록: [materials/demo-log.md](materials/demo-log.md)
- 간단한 진행표: [assets/speaker-guide.txt](assets/speaker-guide.txt)

원본은 일반 Markdown입니다. `npm run dev`는 원고·자료를 다시 생성합니다. `presentations/`의 HTML·content.js는 직접 수정하지 않습니다. 등록된 자료 사이의 `.md` 링크는 생성 때 HTML로 연결됩니다. 새 사례 첨부는 `assets/examples/*.txt`이며 중첩 `materials/` 문서를 추가하지 않습니다.

## 고정 교정 실습과 재사용

기존 ZIP은 발표자가 학습용 오류와 고정 승인안을 작성하고 Node로 반영한 보조 예제입니다. 실제 LLM 호출·자동 검색·새 답 생성 실험은 아닙니다. 압축을 풀고 `llm-wiki-demo/`에서 `node run-demo.cjs`와 `node run-demo.cjs --check`를 실행합니다. 추가 패키지·API·로그인 없이 승인안 적용과 파일 검사를 재현합니다.

8쪽 반영·로컬 링크25개·보존 파일10개의 해시는 각기 다른 파일 검사 단위입니다. 의미 정확도·검색 품질·시간 절감의 측정값은 아닙니다. RAG의 두 읽기 메모는 같은 v4의 읽은 범위 차이이며 원문 교체 사건이 아닙니다.

`assets/sources.txt`, `starter-template.txt`, `decision-example.txt`는 이전 판의 보조 복사용 첨부로 보존합니다. 현재 발표의 정의·시작 요청·장번호는 40장 대본과 speaker-guide, 학습서·실습을 기준으로 읽습니다. 새 본편은 이전 txt를 현재 근거 경로로 연결하지 않습니다.

다른 주제로 옮기려면 이 폴더를 `talks/새이름/`으로 복사하고 원고·자료·자산을 바꿉니다. 자료의 판과 실제 실행 범위를 새로 확인하세요. `npm run build`는 현재 프로젝트, `npm run build:site`는 전체 공개 사이트를 생성합니다. 공유할 때는 공통 runtime을 포함한 `presentations/` 전체를 전달합니다. 문법은 [작성 안내](../../MARKDOWN-FIRST.md), 사진과 자체 도식의 출처는 [CREDITS](assets/CREDITS.md), 이번 근거는 [연구 인수 패킷](../../research/llm-wiki-foundations-20261029/engineering/SYNTHESIS.md)에 있습니다.
