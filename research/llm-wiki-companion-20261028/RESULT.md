# 발표와 별도 학습 자료·디자인 개선

[학습 자료 모음](../../presentations/llm-wiki/materials/index.html) · [발표](../../presentations/llm-wiki/index.html) · [화면과 전후 비교](index.html)

사용자가 이전 발표는 정보가 짧고 부족하며 스타일도 문제라고 평가했다. 같은 슬라이드 읽기나 짧은 txt 첨부를 학습서 대신 제공한 범위를 넓혀, 일반 Markdown 원본5개에서 별도 장문 HTML을 만들고 발표를14장으로 다시 구성했다.

## 실제 자료

- [학습 가이드](../../talks/llm-wiki/materials/study-guide.md): RAG·LoRA·LLM Wiki 원문을 읽어 개념·비교·질문을 연결하고, 검토한 답을 저장하며 과잉 일반화를 새 근거로 고치는 파일·diff 예제. 운영 tradeoff·FAQ·자가점검과 해설을 포함한다.
- [실습](../../talks/llm-wiki/materials/workshop.md): 입력 자료와 단계별 진행·모범 답·오류 해설. 설치 없이 읽기·편집기로 수행할 수 있다.
- [대본](../../talks/llm-wiki/materials/speaker-script.md):14장 발화·질문·전환·예상 Q&A,18분설명+2분질문의 배분표.
- [원문 안내](../../talks/llm-wiki/materials/reference-library.md):6개1차 자료의 읽을 절·지원하는 주장·한계·학습 순서와 용어. 링크 목록에 그치지 않는다.
- [자료 목차](../../talks/llm-wiki/materials/index.md):목적별 진입·혼자 공부하는 순서.

학습45~60분·실습20~30분·발표20분은 작성자의 배분/추정이며 실측 결과가 아니다. 원문 논문은 실제 자료, 학습자/카드/파일변경/결정은 구성 예제다.

## 디자인팀의 판단과 적용

이전 거대 밝은 카드의 반복과 축소된 관계도가 내용의 위계를 약하게 만들었다. 기존 native의 열린 검은 면·색 표식·비교/단계 화면과 직접 대조했다. 새 발표는 열린 비교·큰1200×450 도식·질문/인용·짧은 설명으로 바꾸고, 자료는18px본문·읽기너비·목차를 갖춘 별도 종이 조판으로 만들었다. 모바일의 탐색600px 점유는 native details로 접어 본문부터 읽도록 교정했다.

공통 editorial3열이 primary없는 열까지22px로축소하던 규칙도 좁게 고쳤다. 동등3열은본문32/제목40px, 기존 primary옆은22/28px, 모바일read는18/26px를 실제 확인했다. 색/열기하/수치/다른 구도는 보존했다. [디자인 검수](design/REVIEW.md).

## 재사용 구현

`talks/<주제>/materials/*.md`를선택적으로추가하면`presentations/<주제>/materials/*.html`을생성한다. authored index가없으면자료목록을자동으로만든다. 문서목차·현재자료·문서간Markdown/한글fragment링크·발표복귀·발표/모음진입·공통CSS/hash·자산복사·watch·last-good·verify를공통경로에통합했다. raw HTML은실행하지않고코드/표는키보드로자체scroll한다. 자료없는덱의기존출력계약을유지한다. [엔지니어링 검수](engineering/REVIEW.md),[실행 근거](engineering/verification.json).

## 최종 로컬 검증

- 전체261/261,build:site/verify:site통과. 새11회귀에파싱/escaping/목차/MD링크·fragment·assets/단독복사/자동hub/기존호환·오류last-good/check·watch경계를포함한다.
- 실제생성14장모두현재revision으로캡처·오류/이미지실패/본문넘침/진단0. 대표화면직접열람·Paper6·기존primary예product-notes4를확인했다. [화면](evidence/slides.json).
- 자료5개각각1440/390에서전체원고text fragment의순서·누락0·각source revision동일·본문18px·body가로넘침0·JS0·codefocus전부를확인했다. 접힌목차Enter열닫·긴코드ArrowRight가로scroll통과. [본문/키보드](evidence/documents.json).
- overview14/preview링크0·presenter양방향이동·발표→자료목차→가이드목차→대본→read14실제이동을확인했다. 깊은14장링크는해당목차로이동한뒤클릭했다. read390의본문18/제목26·상단링크/모드/테마영역보존. [실사용](evidence/navigation.json).
- 인쇄CSS에서탐색숨김·긴코드줄바꿈·가로잘림0·전체본문유지확인. [인쇄](evidence/print.json).
- 세manager와실무자모두직접초안/교차검토/인수후편집종료했다. root가공통문서helper/template·최종통합/실화면/전체회귀/Git/Pages를담당했다. [콘텐츠 검수](content/manager-review.md).

공개배포후같은원고/문서/스타일과실제자료탐색을GitHub Pages에서추가검증한다. 과거연구기록은보존했고임시prototype HTML은정리했다. 실제LLM Wiki 앱·도입성과측정은이번자료제작범위가아니다.
