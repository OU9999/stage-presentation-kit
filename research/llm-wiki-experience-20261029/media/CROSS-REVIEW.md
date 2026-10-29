# 사진·인용 / 경험 demo 직접 교차검토

확인일: 2026-10-29. A: media_evidence, B: experience_demo. 이 기록은 A가 소유한 media/에만 작성했다. WORK_LOG·원고·demo는 수정하지 않았다.

## 최신 요구 대조

사용자 새 목표는 정확히 40장이다. 40분 요구가 아니며 30분 설명 초안과 Q&A 시간은 후속 추정이다. 처음 읽은 B의 27장 초안은 새 요구로 대체 중이므로 최종 40장 전체 구성/시간/정답 링크는 이 검토의 합격 대상이 아니다. 사진 4장과 인용 2개, 노트 → 연결 → 다음 질문 → 결정 재사용이라는 장면 역할은 그대로 유효하다.

## B가 A를 검토한 내용

B가 SOURCES.md와 photo-manifest.json을 모두 읽고 로컬 사진 4장의 bytes/SHA를 독립 대조해 일치함을 확인했다. Bush 출판사 본문 §6 앞뒤와 Pexels License를 직접 열어 인용 12단어/번역/맥락 및 사진 사용조건을 확인했다. Karpathy 인용은 A의 원문 확인과 출처 문서로 검토했고 B가 별도 primary를 열었다고 확대하지 않는다. B는 두 인용을 AI 성능 증거로 사용하지 않고, Bush 뒤 자료 두 개의 연결 질문 작성, Karpathy 뒤 실제 파일 결과로 전환하는 흐름을 수용했다.

manager도 사진 4장을 직접 열어 crop 주의를 확인했고 A의 제안과 일치했다. open-books는 하단 책 보존, study-table은 세로 분할, writing은 얼굴과 손 보존이 필요하다. 최종 화면 crop 합격을 선언한 것은 아니다.

## A가 B를 검토한 내용

A는 초기 experience/storyboard.md와 demo/README.md를 읽고 기술 오해 교정이 전체 주인공이 되지 않도록 상위 질문과 지식 연결/결정 재사용을 보강하자고 B에게 직접 보냈다. B가 상위 질문을 다음 질문에 재사용할 내용으로 바꾸고 Q2·보류·D1 대체·D2를 실제 파일에 추가했음을 확인했다.

그 후 A는 아래 실제 파일의 전문을 읽었다.

- `talks/llm-wiki/demo/run-demo.cjs`
- `talks/llm-wiki/demo/review/review.json`
- `talks/llm-wiki/demo/after/wiki/questions/what-to-save.md`
- `talks/llm-wiki/demo/after/wiki/decisions/save-all.md`
- `talks/llm-wiki/demo/after/wiki/decisions/review-before-current.md`
- `talks/llm-wiki/demo/after/wiki/pending/retrieval-coverage.md`

직접 실행: `node talks/llm-wiki/demo/run-demo.cjs --check`, exit 0/pass. model_invoked false, changed_pages 8, created_pages 3, after_pages 8, local_links 25, immutable_files 10. diff SHA-256 `1658ca53ae3a46f655e541c2abf11891d8105d460b5a4222cb30d891d8515489`.

Q2는 C1·Q1·D1을 다시 읽은 입력으로 표시하고, 현행 답/보류를 구분한 선택을 D2에 연결한다. D1은 당시 맥락을 지운 대신 superseded/D2 연결을 남긴다. D2는 검토 비용과 점검 부담을 함께 말하고 정확도/시간 절감 측정을 주장하지 않는다. 보류 파일은 부족한 근거와 다음 행동을 분리한다. 승인된 예제의 파일 반영을 확인하는 결정적 실행이며 실제 LLM 실험으로 오인할 표현이 없다.

필수 결함은 발견하지 않았다. B에게 직접 남긴 표현 주의: changed_pages 8은 신규 3개를 포함한다. 발표에서 “8수정+3추가”라고 합계 11로 읽히지 않게 “기존 5갱신+3생성=8페이지 반영”으로 설명한다.

## 범위와 종료

40장 최종 장순서·전체 원고·런타임 클릭·발표 리허설·최종 crop·출력은 미검수이며 manager/root/후속 디자인팀이 이어받는다. A는 사진·인용·직접 상호검토를 완료하고 소유 파일 편집을 종료한다. 인용 원문 전체나 개인 스터디 후기·실명은 복제하지 않았다.
