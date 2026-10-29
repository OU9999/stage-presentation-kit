# LLM Wiki 발표의 사진·도식·인용 출처

확인 기준: 2026-10-29. 사진 원본·인용 대조 기록은 `research/llm-wiki-experience-20261029/media/SOURCES.md`와 manifest에 보관했습니다.

## 사진

| 파일 | 작가와 원본 |
| --- | --- |
| `photos/open-books.jpg` | [Ron Lach, Open Books Lying on Desk](https://www.pexels.com/photo/open-books-lying-on-desk-9871139/) |
| `photos/study-table.jpg` | [cottonbro studio, Books and Books on Brown Wooden Table](https://www.pexels.com/photo/books-and-books-on-brown-wooden-table-4769464/) |
| `photos/library.jpg` | [Ayşe İpek, Books in the Library](https://www.pexels.com/photo/books-in-the-library-13278839/) |
| `photos/writing.jpg` | [LinkedIn Sales Navigator, Woman Sitting on Gray Chair While Writing on Table](https://www.pexels.com/photo/woman-sitting-on-gray-chair-while-writing-on-table-1251832/) |

사진은 [Pexels License](https://www.pexels.com/license/)에 따라 사용합니다. 무료 사용·수정·웹/발표 사용이 가능하며, 원본 사진 자체 판매·이미지 서비스 재배포·인물의 추천을 암시하는 사용은 제한됩니다.

## 짧은 원문 인용

- 7장: Andrej Karpathy, *LLM Wiki*, The core idea. [고정 revision 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a). 위키를 지속적으로 유지하는 설계 아이디어를 소개합니다.
- 30장: Vannevar Bush, *As We May Think*, The Atlantic, July 1945, §6. [원출판사 보관 원문](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/). 분류 색인과 연상의 차이에서 지식 장치를 구상하는 대목입니다.

각 인용은 원문 12단어를 한 번 사용하고 발표팀 번역을 표시했습니다. 두 글의 별도 자유 재사용 라이선스는 확인되지 않았으며, 저자·제목·원문 링크를 붙인 짧은 인용으로 사용합니다.

## 도식·차트

`wiki-layers.svg`, `knowledge-map.svg`, `change-trace.svg`, `impact-map.svg`, `reuse-inputs.svg`, `current-pending.svg`, `decision-transition.svg`, `study-notebook-map.svg`, `reuse-route.svg`는 발표팀이 작성한 자체 도식입니다. LLM Wiki 설계와 학습 예제의 원자료·주장·답·결정 관계를 그렸으며 기존 DevDay 색과 서체를 사용했습니다. 새 공용 노트 도식은 원자료함/raw, 함께 고친 설명쪽/wiki, 적는 약속/작업 규칙, 바꾼 이유/log의 대응을 나타냅니다. 기록 재사용 도식은 한국어 역할을 먼저 읽고 파일 ID를 보조로 확인하도록 구성했습니다.

31장은 기존 5쪽 갱신과 신규 3쪽 생성으로 반영한 8쪽, 로컬 링크 25개, 보존 파일 10개의 확인 범위를 단위별로 표시합니다. 서로 다른 단위를 비중이나 성과 점수로 비교하지 않습니다. 33장의 네이티브 흐름도는 Karpathy의 Operations를 읽기·질문·점검의 순서로 표현했습니다. 원값 표시와 흐름도는 기존 STAGE 렌더러를 사용합니다.

C1/Q1의 근거는 [RAG v4 §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4), [LoRA v2 §4.1](https://arxiv.org/html/2106.09685v2#S4.SS1)입니다. D1/D2의 형식은 [Michael Nygard의 결정 기록](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)을 응용했습니다. 실제 발췌와 파일 경로는 `materials/demo-log.md`에 있습니다.
