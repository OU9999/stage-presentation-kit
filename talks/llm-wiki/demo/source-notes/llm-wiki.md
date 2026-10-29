# LLM Wiki 설계 원문 읽기 메모

- 자료 ID: S-WIKI
- 원저자: Andrej Karpathy
- 원문: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- 읽은 위치: The core idea, Architecture, Operations, Indexing and logging
- 확인일: 2026-10-29
- 형식: 발표자가 작성한 한국어 요약이며 원문 전문이 아님

## 원문에서 확인한 내용

글은 높은 수준의 설계 아이디어로 소개된다. 원자료를 보존하고 연결된 Markdown 위키를 유지하며, 질문의 유용한 답을 페이지로 남기는 흐름을 제안한다. index는 내용의 입구, log는 시간순 작업 기록으로 구분한다.

## 이 데모의 설계 해석

갱신된 위키를 다음 답에 쓰려면 관련 파일을 다시 찾아 읽게 한다. 검토와 승인 뒤에만 현행 답을 바꾸는 정책은 이 데모의 선택이다. 원저자가 이 데모를 실행하거나 성능을 검증한 것은 아니다.
