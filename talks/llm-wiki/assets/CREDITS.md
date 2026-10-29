# LLM Wiki 발표의 사진·도식·사례·원문 출처

확인 기준:2026-10-29. 기존 사진 원본·인용 대조 기록은 `research/llm-wiki-experience-20261029/media/SOURCES.md`와 manifest에 보관했습니다. 현재40장은 영문 직접 인용을 추가하지 않았으며 기존 Karpathy/Bush 인용장도 사용하지 않습니다.

## 사진

| 파일 | 작가와 원본 |
| --- | --- |
| `photos/open-books.jpg` | [Ron Lach, Open Books Lying on Desk](https://www.pexels.com/photo/open-books-lying-on-desk-9871139/) |
| `photos/study-table.jpg` | [cottonbro studio, Books and Books on Brown Wooden Table](https://www.pexels.com/photo/books-and-books-on-brown-wooden-table-4769464/) |
| `photos/library.jpg` | [Ayşe İpek, Books in the Library](https://www.pexels.com/photo/books-in-the-library-13278839/) |
| `photos/writing.jpg` | [LinkedIn Sales Navigator, Woman Sitting on Gray Chair While Writing on Table](https://www.pexels.com/photo/woman-sitting-on-gray-chair-while-writing-on-table-1251832/) |

사진은 [Pexels License](https://www.pexels.com/license/)에 따라 사용합니다. 무료 사용·수정·웹/발표 사용이 가능하며, 원본 사진 자체 판매·이미지 서비스 재배포·인물의 추천을 암시하는 사용은 제한됩니다.

## 새 자체 도식과 구성 예

발표팀이 기존 DevDay 색과 서체로 직접 작성했습니다. 외부 이미지를 복제하지 않았습니다.

| 파일 | 내용과 근거 |
| --- | --- |
| `wiki-maintenance-loop.svg` | 원자료→LLM의 여러 페이지 작성·유지→질문 읽기→유용한 답 저장의 순환. 작업 규칙은 전체에 적용 |
| `wiki-ingest-update.svg` | 새 요약뿐 아니라 기존 개체·개념·비교·잠정 종합의 갱신 |
| `wiki-query-return.svg` | 관련 파일을 현재 답변의 문맥에 읽고 답을 저장하는 귀환 |
| `case-reading.svg` | 가상 소설의 장 메모/인물/주제/질문. 자기 설명·미확인 유지 |
| `case-team.svg` | 가상 상담/회의/요구 비교/응대. 고객 요청과 출시 약속 구별 |
| `case-course.svg` | 가상 단원 메모/공유 개념/새 기준/종합. 실제 논문 출력과 구별 |

첫 세 도식은 [Karpathy의 LLM Wiki 설계](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a)를 설명하기 위한 자체 구성입니다. 세 사례의 입력·인물·조직·파일 문장은 모두 발표팀이 만든 적용 예이며 모델 실행·실제 도입 성과가 아닙니다. `examples/{reading,team,course}.txt`와 학습 가이드/실습에 입력·전후·질문 저장 내용을 제공합니다.

## 보존한 기존 도식과 교정 실습

`wiki-layers.svg`, `knowledge-map.svg`, `change-trace.svg`, `impact-map.svg`, `reuse-inputs.svg`, `current-pending.svg`, `decision-transition.svg`, `study-notebook-map.svg`, `reuse-route.svg`도 발표팀 자체 도식입니다. 사용 여부와 별개로 원본을 보존했습니다. 원자료/위키/규칙 관계와 기존 고정 예제의 주장·답·결정 관계를 나타냅니다.

심화38장의8쪽(기존5+신규3),25링크,10보존파일은 단위가 다른 실제 파일 검사의 범위입니다. 지식 증가·정확도·시간 절감 점수로 비교하지 않습니다. 기존 demo/ZIP은 사람의 고정 승인안을 Node로 반영한 보조 실습이며 모델을 호출하지 않았습니다.

C1/Q1의 근거는 [RAG v4 §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4), [LoRA v2 §4.1](https://arxiv.org/html/2106.09685v2#S4.SS1)입니다. D1/D2 형식은 [Michael Nygard의 결정 기록](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)을 응용했습니다. 실제 발췌·파일·검사 범위는 `materials/demo-log.md`에 있습니다.

## 공개 근거와 보관된 인용 출처

공개 구현·논문은 `materials/reference-library.md`에서 고정SHA·직접 읽은 함수·실험 조건과 함께 확인합니다. 코드 관찰, 제한된 QA 실험, 원저자의 제안 용도와 우리의 구성 예를 구별합니다. 외부 저장소의 설치·명령은 실행하지 않았습니다.

이전 발표에서 사용한 짧은 인용의 출처로 Karpathy의 위 설계 글과 [Vannevar Bush, As We May Think, The Atlantic, 1945년7월 §6](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/)을 보존합니다. 당시 각 영문12단어를 사용했으나 현재40장에는 인용문을 싣지 않습니다. 원문 전문·댓글·저자 사진은 복제하지 않았고 별도 자유 재사용 라이선스를 확인한 것으로 표시하지 않습니다.

## 2026-10-29 도식의 조판 교정

현재 사용 중인 자체 도식9종은 문서 구조·변경 대상·질문 재사용·개념 관계·결정의 시간 흐름에 맞춰 다시 그렸습니다. 색 테두리 박스를 반복하지 않고, 중립 선과 문서 형태·타이포 크기로 구분합니다. 파랑은 원자료, 초록은 위키의 작성·갱신, 보라는 질문·연결, 주황은 새 조건·보류·재저장 같은 변화에 사용합니다. 사례와 고정 실행의 근거 경계는 유지합니다. 재생성 원본은 `research/llm-wiki-diagram-redesign-20261029/render-diagrams.cjs`이며 주제 자산만 생성합니다.
