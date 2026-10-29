# LLM Wiki 발표의 시각 자료·짧은 인용 출처

확인 기준: 2026-10-29. 사진·인용의 원문 대조는 `research/llm-wiki-experience-20261029/media/SOURCES.md`와 manifest에 기록했다. 아래 사진은 공부·기록 상황을 설명하는 스톡 장면이다. 발표자·스터디 참여자·인용 저자의 사진이나 실제 사용후기, AI 성능의 증거가 아니다.

## 로컬 사진

| 파일 | 작가와 원본 | 이용 조건·화면 의도 |
| --- | --- | --- |
| `photos/open-books.jpg` | [Ron Lach, Open Books Lying on Desk](https://www.pexels.com/photo/open-books-lying-on-desk-9871139/) | Pexels License. 창가 책상·펼친 책과 공책. 1장 가로 장면은 아래 책을 보존하도록 focus `50% 75%`. |
| `photos/study-table.jpg` | [cottonbro studio, Books and Books on Brown Wooden Table](https://www.pexels.com/photo/books-and-books-on-brown-wooden-table-4769464/) | Pexels License. 책과 필기 자료의 관계. 9장 세로 분할, focus `50% 72%`. |
| `photos/library.jpg` | [Ayşe İpek, Books in the Library](https://www.pexels.com/photo/books-in-the-library-13278839/) | Pexels License. 자료가 쌓인 서가의 비유. 3장 좁은 세로 장면, focus `50% 50%`. |
| `photos/writing.jpg` | [LinkedIn Sales Navigator, Woman Sitting on Gray Chair While Writing on Table](https://www.pexels.com/photo/woman-sitting-on-gray-chair-while-writing-on-table-1251832/) | Pexels License. 내 질문을 쓰는 행동. 기존 공통 `assets/photos/write.jpg`와 바이트가 같은 로컬 사본. 34장 focus `44% 54%`, 얼굴·펜 든 손 보존. |

[Pexels License](https://www.pexels.com/license/)는 무료 사용·수정과 웹/발표 사용을 허용한다. 크레딧은 의무가 아니지만 출처를 남겼다. 퍼블릭 도메인이나 별도 오픈 라이선스로 표기하지 않는다. 피사체를 보증자로 소개하지 않으며, 원본 사진 자체 판매나 다른 스톡 플랫폼 재배포에 사용하지 않는다. 로컬 파일을 사용하므로 발표 중 외부 이미지 요청은 필요 없다. 사진 속 책·필기 내용은 발표 근거로 해석하지 않는다.

## 짧은 원문 인용

- 7장: Andrej Karpathy, *LLM Wiki*, The core idea. [고정 revision 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a). 원저자의 12단어 한 문장을 한 번 인용하고 발표팀 번역을 별도 표시한다. 지속적으로 유지하는 위키의 설계 아이디어를 소개하며 성능 실험으로 사용하지 않는다.
- 30장: Vannevar Bush, *As We May Think*, The Atlantic, July 1945, §6. [원출판사 보관 원문](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/). 연상에 관한 12단어 연속 두 문장을 한 번 인용하고 발표팀 번역을 표시한다. 1945년 지식 장치 구상의 맥락이며 현대 AI의 성능 근거가 아니다.

두 글의 별도 자유 재사용 라이선스는 확인되지 않았다. 저자·제목·원문 링크를 붙인 짧은 인용만 사용한다. 원문 전체·댓글·인물 프로필/역사 사진을 복제하지 않는다. 정확한 영어 문구와 번역의 대조표는 연구 SOURCES에 있다.

## 자체 도식

기존 `wiki-layers.svg`, `knowledge-map.svg`, `change-trace.svg`는 보존했다. 새 `impact-map.svg`, `reuse-inputs.svg`, `current-pending.svg`, `decision-transition.svg`는 이번 발표팀이 실제 데모 파일을 읽고 만든 SVG이며 외부 도식·스크린샷을 복제하지 않았다. 자체 도식에 외부 사진이나 아이콘을 포함하지 않는다. DevDay 색·서체·열린 여백은 기존 발표의 시각 체계를 따른다.

- `impact-map.svg`: 승인안이 갱신한 기존 5쪽과 새 3쪽의 역할. 위쪽 화살표는 설명 관계이며 자동 추론/실행 순서가 아니다.
- `reuse-inputs.svg`: Q2의 판단 입력인 C1/Q1/D1 재읽기. 자동 검색이나 LLM 새 답 생성 실험이 아니다.
- `current-pending.svg`: D2에 따라 현행과 검토 대기를 구분하는 이 학습 예제의 정책. 검토 대기의 단정은 지원되지 않는 초안으로 표시한다.
- `decision-transition.svg`: 초기 D1의 맥락·결과를 보존하며 D2로 대체하는 예제. 검토 비용을 함께 표시한다.

C1/Q1은 [RAG v4 §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4), [LoRA v2 §4.1](https://arxiv.org/html/2106.09685v2#S4.SS1)의 학습 대상을 대조한다. D1/D2의 기록 형식은 [Michael Nygard의 결정 기록](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)을 스터디 운영에 응용했다. 데모의 초안 오류와 저장 정책은 발표자가 구성했으며 실제 LLM의 오류나 모든 스터디에 최선인 운영법을 입증한 것이 아니다.
