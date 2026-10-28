# LLM Wiki · 지식 축적 · 출처 · 결정 기록

Zoom에서 약20분으로 진행하는 발표와, 발표 뒤 혼자 공부할 수 있는 별도 학습 자료입니다. RAG·LoRA·LLM Wiki를 읽어 개념·비교·질문을 연결하고, 검토한 답과 변경 이유를 남기는 과정을 다룹니다.

## 화면으로 보기

- [발표](../../presentations/llm-wiki/index.html) · [슬라이드 읽기](../../presentations/llm-wiki/read.html)
- **[학습 자료 모음](../../presentations/llm-wiki/materials/index.html)**
- [혼자 공부하기](../../presentations/llm-wiki/materials/study-guide.html) · [실습과 해설](../../presentations/llm-wiki/materials/workshop.html)
- [발표 대본](../../presentations/llm-wiki/materials/speaker-script.html) · [원문 읽기 안내·용어](../../presentations/llm-wiki/materials/reference-library.html)

학습 가이드는 작동 원리·파일 예제·연결도·변경 diff·FAQ와 자가점검 해설을 담습니다. 실습에는 입력, 진행 순서, 모범 답과 오류 해설이 있습니다. 대본에는 실제로 말할 문장·전환·청중 질문·예상 답변이 있으며, 참고 자료는 1차 원문의 읽을 절과 지원 범위를 안내합니다. 제시한 시간은 진행을 위한 추정이며 실제 낭독·학습 시간을 측정한 결과가 아닙니다.

## 수정할 원본

- 발표: [slides.md](slides.md)
- 자료 목차: [materials/index.md](materials/index.md)
- 학습서: [materials/study-guide.md](materials/study-guide.md)
- 실습: [materials/workshop.md](materials/workshop.md)
- 대본: [materials/speaker-script.md](materials/speaker-script.md)
- 참고 자료: [materials/reference-library.md](materials/reference-library.md)

원문은 모두 일반 Markdown입니다. `npm run dev`를 실행하고 원본을 수정하면 발표와 별도 자료를 다시 생성합니다. 생성한 `presentations/` 안의 HTML·content.js는 직접 수정하지 않습니다. 문서끼리 `.md`로 연결하면 생성 과정에서 HTML로 연결됩니다.

자료의 논문과 설계 문서는 실제 출처이며, 학습자·질문 카드·파일 변경·운영 결정은 작동 원리를 설명하는 구성 예제입니다. 카드의 읽기 메모는 원문 전문을 대신하지 않습니다. 초기 txt4개는 이전 자료의 기록·복사용입니다. 초기 진행 메모는 당시12장 기준이며, 현재14장의 대본과 깊이 공부할 경로는 위의 독립 Markdown 자료입니다.

## 다른 주제로 재사용하기

이 폴더 전체를 `talks/새이름/`으로 복사하고 원고와 `materials/`, `assets/`를 바꿉니다. 자체 자산만 참조하므로 다른 예제 폴더를 복사하지 않아도 됩니다. `npm run build`로 현재 프로젝트를, `npm run build:site`로 전체 공개 사이트를 생성합니다. 공유할 때는 공통 runtime을 포함한 `presentations/` 전체를 전달합니다.

배치와 자료 문법은 [작성 안내](../../MARKDOWN-FIRST.md)를 참고하세요. 이번 개선 검수는 [검토 폴더](../../research/llm-wiki-companion-20261028/)에 보관합니다.
