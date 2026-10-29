# 다음 질문에 다시 쓰는 LLM Wiki

Zoom AI 스터디를 위한 40장 발표와 별도로 깊이 읽는 학습 자료입니다. 원문과 설명을 구분하고, Q1의 근거 교정 결과를 Q2의 저장 정책 판단에 재사용하며, 현행·보류·대체 결정과 운영 부담을 함께 다룹니다. 기본 진행은 핵심27장: 설명·참여18분과 Q&A2분입니다. 선택 심화13장의 시간은 별도로 더하며 20분은 리허설 전 배분안입니다.

## 화면으로 보기

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- **[학습 자료 모음](../../presentations/llm-wiki/materials/index.html)**
- [혼자 공부하기](../../presentations/llm-wiki/materials/study-guide.html) · [실습과 해설](../../presentations/llm-wiki/materials/workshop.html)
- [40장 대본](../../presentations/llm-wiki/materials/speaker-script.html) · [원문·사진·인용 출처](../../presentations/llm-wiki/materials/reference-library.html)
- [실제 파일 읽기와 교정 실행 기록](../../presentations/llm-wiki/materials/demo-log.html) · [데모 ZIP](demo/llm-wiki-demo.zip)

발표자가 초기 오류와 고정 승인 교정안을 작성했습니다. Node는 파일 변경·링크·해시를 검사합니다. 실제 AI의 오답 수집·검색·답 생성·성능 실험은 아닙니다. RAG의 두 메모는 같은 v4의 읽은 범위 차이이며 원문 교체 사건이 아닙니다. 28장의 판 교체는 향후 운영법입니다.

## 수정할 원본

- 발표: [slides.md](slides.md)
- 자료 목차: [materials/index.md](materials/index.md)
- 학습서: [materials/study-guide.md](materials/study-guide.md)
- 실습: [materials/workshop.md](materials/workshop.md)
- 대본: [materials/speaker-script.md](materials/speaker-script.md)
- 참고 자료: [materials/reference-library.md](materials/reference-library.md)
- 실제 실행 예제 읽기: [materials/demo-log.md](materials/demo-log.md)

원문은 일반 Markdown입니다. `npm run dev`에서 원본을 수정하면 발표와 별도 자료를 다시 생성합니다. 생성한 `presentations/`의 HTML·content.js는 직접 수정하지 않습니다. 문서끼리 `.md`로 연결하면 생성 과정에서 HTML로 연결됩니다. 등록된 자료 이외의 데모 Markdown은 직접 웹 링크로 만들지 않고 ZIP 안에서 읽습니다.

12장 A/B→13장 근거 공개→17장 교정 결과, 23장 A/B→24장 이 예제의 선택 공개→25장 보류 이유입니다. 13장의14장 링크는 읽은 범위를 더 보는 심화 경로입니다. 답 장에는 질문 복귀 링크가 있습니다. Zoom 채팅은 발표자가 수동으로 읽고 웹이 투표를 수집·집계하지 않습니다. 35장에는 자기 노트 작성20초가 있습니다. 질문 한 줄이 우선이고 자료 제목은 기억나는 만큼, 근거 위치는 다음 모임에 확인합니다.

## 핵심 진행과 선택 심화

핵심 경로는1→2→3→4→6→7→10→11→12→13→17→18→19→21→22→23→24→25→26→29→31→33→34→35→36→39→40입니다. 비연속 이동은 해당 발표 장 안의 의미 있는 전환 링크로 제공합니다. 학습 자료의 `../slides.md#N` 링크는 별도 읽기 화면을 여는 참고 경로입니다. 대본에는40장 모두 실제 발언·진행·전환과 핵심/심화 구분이 있습니다.

도입의 공용 스터디 노트 비유는 원자료함→raw, 함께 고치는 설명→wiki, 적는 약속→작업 규칙, 바꾼 이유→log에 대응합니다. LLM이 사실을 보증하거나 저장된 파일이 자동으로 기억·학습된다는 뜻은 아닙니다.

## 실행과 재사용

ZIP을 풀고 `llm-wiki-demo/`에서 `node run-demo.cjs`와 `node run-demo.cjs --check`를 실행합니다. 추가 패키지·API·로그인 없이 파일 작업을 재현합니다. 기존5쪽 갱신+3쪽 생성=8쪽, 로컬링크25개, 불변10파일은 파일 검사 수치입니다. 의미·검색 품질·시간 절감의 측정값은 아닙니다.

다른 주제로 옮기려면 이 폴더를 `talks/새이름/`으로 복사하고 원고·자료·자산을 바꿉니다. 자기 자료의 출처와 판, 실제 실행 범위를 다시 확인하고 기존 예제의 수치를 성과처럼 재사용하지 않습니다. 사진·인용 조건은 [자체 크레딧](assets/CREDITS.md)과 [읽기 안내](materials/reference-library.md)에 보존합니다. 오래된 txt 첨부의 예제는 이전 판의 보조 복사용이며 현재 진행은 40장 대본과 speaker-guide를 기준으로 합니다.

`npm run build`는 현재 프로젝트, `npm run build:site`는 전체 공개 사이트를 생성합니다. 공유할 때는 공통 runtime을 포함한 `presentations/` 전체를 전달합니다. 문법은 [작성 안내](../../MARKDOWN-FIRST.md), 이번 조사·경험 설계 근거는 [검토 폴더](../../research/llm-wiki-experience-20261029/)에 있습니다.
