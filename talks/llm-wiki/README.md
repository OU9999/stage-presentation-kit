# LLM Wiki · 지식 축적 · 출처 · 결정 기록

Zoom에서 가볍게 진행하는 한국어 AI 스터디 자료입니다. 12장, 발표 18분과 질문 2분으로 구성했습니다.

- [발표](../../presentations/llm-wiki/index.html) · [읽기](../../presentations/llm-wiki/read.html)
- **수정할 원본:** [slides.md](slides.md)
- [진행 가이드](assets/speaker-guide.txt): 장별 시간, 설명과 질문
- [출처 대장](assets/sources.txt): 실제 1차 자료와 주장 근거, 확인 범위
- [결정 예제](assets/decision-example.txt): 합성 자료·주장·결정과 변경 이력
- [시작 템플릿](assets/starter-template.txt): 작은 위키와 기록 카드의 작성 예

세 도식은 직접 만든 SVG입니다. 발표의 AI 스터디 운영 사례와 인물·날짜·결정은 설명용 합성 예제입니다. 조사한 LLM Wiki 아이디어와 기록 관행을 스터디에 응용했으며, 실제 운영 효과를 측정한 발표는 아닙니다.

## 수정하고 확인하기

저장소 루트에서 `npm run dev`를 실행하고 이 폴더의 `slides.md`와 `assets/`를 수정합니다. 발표와 읽기 화면은 같은 원고에서 생성됩니다. `presentations/llm-wiki/content.js`는 생성물이므로 직접 수정하지 않습니다.

다른 발표로 재사용하려면 이 폴더 전체를 `talks/새이름/`으로 복사하고 제목·내용·도식·출처·진행 시간을 바꿉니다. 자체 자산만 참조하므로 다른 예제 폴더를 복사할 필요가 없습니다. `npm run build`로 현재 발표 모음을, `npm run build:site`로 전체 공개 사이트를 생성합니다. 공유 시에는 공통 runtime을 포함한 `presentations/` 전체를 전달합니다.

세부 배치 문법은 [Markdown 작성 안내](../../MARKDOWN-FIRST.md)를 참고하세요. 조사·팀 검토 근거는 [이번 연구 폴더](../../research/llm-wiki-20261028/)에 보관합니다.
