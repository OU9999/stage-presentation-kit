# LLM Wiki · 내 자료를 AI와 함께 정리하는 방법

11장 키노트입니다. 이번 답과 오래 쓰는 문서의 차이에서 출발해, 원자료의 근거를 연결하고 새 질문에 다시 쓰는 과정을 보여 줍니다. [대본의 진행표](materials/speaker-script.md#현재-진행표)는 본편 35분과 질의·자료 탐색 5분을 계획한 것입니다.

| 장 | 발표에서 보는 것 | 이어 읽기 |
| --- | --- | --- |
| 1–2 | 선언과 두 작업창 | [이번 답과 지속 문서](materials/keynote-notes.md#검색과-지속-문서) |
| 3–4 | 가상 모임의 기사와 인용, 네 가지 결과면 | [기사 편집과 정확 원문](materials/keynote-notes.md#다음-모임의-출발점) · [결과물 전문](materials/keynote-notes.md#네-가지-작업-결과) |
| 5–8 | LLM Wiki의 정의, 한 준비 기록에 남기는 사람과 AI의 역할, 연결 문서와 계획 전후 | [정의](materials/keynote-notes.md#정의와-개인-맥락) · [사람의 선택과 기록](materials/keynote-notes.md#사람의-선택과-기록) · [세 관계](materials/keynote-notes.md#세-무방향-관계) · [계획이 바뀐 근거](materials/keynote-notes.md#계획이-바뀐-근거) |
| 9–11 | 자료 두 개를 고르고 요청을 쓴 뒤 다음에 묻고 싶은 질문 정하기 | [복사할 시작 요청](materials/keynote-notes.md#시작-요청과-선택-기준) · [예제 읽기](materials/workshop.md#기본-읽기-주제-메모에서-다음-스터디로) |

[발표 읽기](slides.md) · [발표 대본](materials/speaker-script.md) · [학습 자료](materials/index.md) · [예제 팩 전문](assets/expanded-study.txt)

[현재 시각자료](assets/devday-current/)는 발표팀이 만든 설명용 작업창과 관계도, 가상 메모의 기사 편집, 실제 제공 예제에서 고른 네 가지 결과면입니다. 기사 인용은 발표용 편집 문장입니다. 공개 해설에서 팩의 정확한 원문과 결과물의 전문을 확인할 수 있습니다.

[이전 26장 도식의 관계 설명](materials/diagram-reading.md) · [원본 그림과 48장 원고](materials/visual-appendix.md) · [고정 데모](demo/) · [이전 20장 진행표](assets/speaker-guide.txt)

## 수정과 검수

정본은 [slides.md](slides.md), [공개 해설](materials/keynote-notes.md), [대본](materials/speaker-script.md)입니다. 수정 전 [디자인 가이드](../../DESIGN.md)에서 발표면과 읽기면의 역할을 확인합니다. `presentations/` 출력은 `npm run build:site`로 생성하며 `npm run verify:site`로 일치를 검사합니다.

[현재 역할 계약](qa/keynote-current.json)은 실제 11장과 native 글·이미지·읽기 링크를, [coverage](qa/keynote-coverage.json)는 26개 주제의 현재 발표·해설·대본 위치를 명시합니다. 발표와 읽기 두 폭에서 [관측 계약](qa/keynote-observation.md)과 [작성 안내의 네 범위 명령](../../MARKDOWN-FIRST.md#실제-관측의-프로젝트-회귀)을 실행합니다.

현재 제작과 실물은 [DevDay 재제작 기록](../../research/devday-rebuild-20261117/)에서 확인합니다. 실제 크기에서의 위계, 자료의 대비, 장의 흐름은 [검수 안내](../../DESIGN-REVIEW.md)에 따라 근거와 판정을 남깁니다. [이전 DevDay 비교](../../research/devday-fidelity-20261116/)와 [이전 키노트 검수](../../research/llm-wiki-keynote-reset-20261113/)에서 당시 입력, 실측과 판정을 볼 수 있습니다.
