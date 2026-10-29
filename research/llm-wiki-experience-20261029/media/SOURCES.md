# 사진·짧은 인용 원문 확인

확인일: 2026-10-29. 담당: media_evidence(A). 웹 1차 자료를 직접 열어 작가/원문/이용조건을 확인했고, 사진 4장 모두 로컬 파일을 직접 열어 내용과 해상도를 확인했다. 사진은 학습을 설명하는 스톡 장면이며 발표자·청중의 실제 사진이나 AI 실험 결과가 아니다.

## 사용할 인용 2개

### Q1 — Andrej Karpathy, LLM Wiki

> This is the key difference: the wiki is a persistent, compounding artifact.

- 원문: [Karpathy가 게시한 LLM Wiki, The core idea](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f#the-core-idea). 해당 문단의 첫 문장을 생략/수정 없이 발췌했다. 공백 기준 **12단어**. 이 자료의 다른 영어 문구를 별도 인용하지 않는다.
- 번역(발표팀 번역): “핵심 차이는 이것입니다. 위키는 계속 남고, 쌓여 가는 결과물입니다.” 번역을 원문으로 오인하지 않게 표시한다.
- 맥락: 질문 때마다 원자료를 다시 조합하는 흐름과, 읽고 연결한 설명을 Markdown 위키로 유지하는 구상을 비교하는 대목이다. 저자가 설계 아이디어로 제시한 글이며 성능 비교 실험이나 품질 보증이 아니다.
- 사용 장면: 오프닝의 ‘읽기는 했는데 다음 질문 때 다시 찾는’ 경험 다음. 인용 한 문장 → ‘그럼 무엇이 남을까요?’ → 실제 before/after 파일 확인으로 연결한다. 저자의 후반부 유지비/일관성 관련 강한 단정을 검증된 효과로 전용하지 않는다.
- 권리/허용범위: 공개 gist 원저자 출처를 확인했다. 별도 재사용 라이선스는 확인하지 못했다. 저자·제목·링크와 함께 이 짧은 문장만 인용하며 원문 전체·댓글·프로필 사진을 복제하지 않는다.

### Q2 — Vannevar Bush, As We May Think (1945)

> The human mind does not work that way. It operates by association.

- 원문: [Vannevar Bush, The Atlantic, July 1945, §6](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/). §6에서 색인 방식의 제약을 설명한 다음 나오는 연속 두 문장을 생략/수정 없이 발췌했다. 공백 기준 **12단어**. 이 자료의 다른 영어 문구를 별도 인용하지 않는다.
- 번역(발표팀 번역): “인간의 마음은 그런 방식으로 작동하지 않습니다. 연상으로 작동합니다.”
- 맥락: 분류 색인과 연상의 차이에서 개인 지식 장치 Memex를 구상한다. 현대 AI의 성능 증거로 사용하지 않는다.
- 사용 장면: 폴더의 자료 목록에서 ‘서로 이어진 노트’로 전환하는 장면. 인용 뒤 청중이 자신의 자료 두 개와 연결 질문을 적게 한다.
- 권리/허용범위: 원출판사 보관 원문과 저자 표기를 확인했다. 별도 자유 재사용 라이선스/관할별 저작권 상태는 확인하지 않았다. 짧은 인용과 자체 번역만 사용하며 기사/역사사진을 복제하지 않는다.

인용 확인은 두 글의 해당 본문과 앞뒤 문맥에 한정한다. Karpathy 글의 모든 일반화, Bush의 역사적 예시 전체를 독립 검증한 것은 아니다. 유명인의 권위로 demo 결과를 대신하지 않는다.

## 실제 사진 4장

모든 사용 조건: [Pexels License](https://www.pexels.com/license/)를 2026-10-29 다시 열어 확인했다. 무료 사용·수정·발표/웹 사용을 허용하며 크레딧은 의무가 아니지만 출처를 남긴다. 식별 가능한 인물을 모욕적으로 묘사하거나 추천/보증자로 제시하지 않는다. 원본 사진 자체 판매, 다른 스톡/배경화면 플랫폼 재배포, 상표 사용은 금지된다. 아래 사진을 오픈 라이선스나 퍼블릭 도메인이라고 표시하지 않는다. 사진 안 책/필기 내용은 발표의 근거 자료로 읽어 내지 않는다.

로컬 경로는 저장소 루트 기준. 다운로드는 Pexels 이미지 CDN을 사용했고, 발표 실행 중 외부 사진 요청이 필요 없다.

| ID / 로컬 파일 | 작가·원본 페이지 | 확보·해상도 | alt / 권장 focus | 사용 장면·crop 주의 |
| --- | --- | --- | --- | --- |
| P1 `talks/llm-wiki/assets/photos/open-books.jpg` | [Ron Lach / Open Books Lying on Desk](https://www.pexels.com/photo/open-books-lying-on-desk-9871139/) | 신규 다운로드, 1800×1200, JPEG | 창가 책상에 펼친 책과 공책, 펜이 놓여 있다. / `50% 75%` | 오프닝 ‘이번 주 읽은 자료, 다음 주에도 쓸 수 있을까?’ 가로 장면. 위쪽 창이 넓어서 중앙 crop은 책을 잃기 쉽다. 책/노트가 있는 아래쪽을 보존. |
| P2 `talks/llm-wiki/assets/photos/study-table.jpg` | [cottonbro studio / Books and Books on Brown Wooden Table](https://www.pexels.com/photo/books-and-books-on-brown-wooden-table-4769464/) | 신규 다운로드, 1800×2700, JPEG | 책과 필기한 공책, 필기도구가 모여 있는 공부 책상. / `50% 72%` | ‘자료와 내 설명을 함께 남기기’의 세로 사진. 원자료/필기 두 요소를 함께 보존하고 책 내용 자체를 설명하지 않는다. 전체화면 가로 cover보다 세로 분할이 적합. |
| P3 `talks/llm-wiki/assets/photos/library.jpg` | [Ayşe İpek / Books in the Library](https://www.pexels.com/photo/books-in-the-library-13278839/) | 신규 다운로드, 1800×1200, JPEG | 긴 책장에 책이 빽빽하게 꽂혀 있고 통로 끝에 사람이 서 있다. / `50% 50%` | 자료가 쌓인 상태를 잠깐 보여주는 전환 장면. ‘AI가 이만큼 읽었다’로 표현하지 않는다. 오른쪽 인물은 Karpathy/Bush/발표자와 무관하다. |
| P4 `talks/llm-wiki/assets/photos/writing.jpg` | [LinkedIn Sales Navigator / Woman Sitting on Gray Chair While Writing on Table](https://www.pexels.com/photo/woman-sitting-on-gray-chair-while-writing-on-table-1251832/) | 기존 `assets/photos/write.jpg`의 바이트 동일 로컬 사본, 1600×1067, JPEG; 출처/라이선스 이번 재확인 | 야외 테이블에서 노트북 옆 공책에 펜으로 적는 사람. / `44% 54%` | 마지막 ‘내 자료 하나와 다음 질문 하나’를 적는 실습. 머리와 펜 든 손을 함께 보존. 발표자/청중의 실제 사용후기 사진으로 소개하지 않는다. |

원본 CDN 다운로드 URL은 `photo-manifest.json`에 기록한다. 실제 로컬 JPEG의 SHA-256/크기/해상도도 해당 파일에 기록했다. focus는 원본을 보고 제안한 값이며 최종 발표 화면의 crop 검수는 다음 디자인팀/root가 수행해야 한다.

## 장면 사용 판단

사진·인용은 기술 분류를 앞세우기보다 노트 → 연결 → 질문 → 결정 재사용의 논리적 장면에 배치한다. Q1 뒤에는 남은 노트의 연결/질문/결정을 확인하고, Q2 뒤에는 자료 두 개를 잇는 질문을 실제로 적는다. 공개 예제와 실제 검증 결과를 구분하고 새 출처로 보류/대체된 결정을 감추지 않는다.

사진을 모든 장에 깔지 않는다. P1의 익숙한 공부책상 → 실제 파일 확인 → P4의 내 상황 적용으로 변화가 있게 사용한다. P2는 원자료/노트의 대비가 필요할 때, P3는 자료 축적 장면이 필요할 때 선택한다. 파일 diff·개념 연결도·출처 표가 더 명확한 장면은 해당 시각자료를 유지한다. Q1/Q2는 각각 한 번만 사용하고 각 인용 뒤 바로 관찰/행동으로 연결한다.

## 원문 확인 범위와 남은 확인

- 확인: 원저자 게시 gist 본문/제목/작성일 표시(2026-04-04), Atlantic 저자/제목/1945년7월호/§6 앞뒤, 네 사진의 원출처 작가 표기, Pexels License 현재 내용, 로컬 사진 실제 내용·해상도·파일 해시.
- 미확인: gist의 고정 revision SHA, 두 글의 별도 재사용 라이선스, 촬영지/피사체 신원, 사진 속 책의 내용·필기 의미, 최종 슬라이드 crop/글자 가독성. 사진은 발표의 사실증거나 효과측정 자료가 아니다.
- 실습/demo 파일과 인용의 연결은 B와 직접 교차검토 완료했다. 범위·실제 실행 결과는 [교차검토 기록](CROSS-REVIEW.md)에 있다. 정확히 40장 목표를 수신했으며 최종 장번호·발표·자료 링크·출력 검수는 manager/root/후속 디자인팀 소유다.
- 인용 원문 재대조 방법과 확인 결과는 `quote-verification.json`에 있다. Q1은 raw Markdown의 강조 기호 제거 뒤 원문 문자열을 추가 비교했다. Q2는 출판사 web 본문을 직접 읽어 대조했고 선택 curl 다운로드 실패를 숨기지 않았다.
- A의 사진·인용 소유 파일 편집은 종료했다.
