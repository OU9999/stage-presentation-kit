# 40장 경험 설계와 파일 데모 인수

실무 B의 편집을 종료한다. 40장 스토리보드와 배포 ZIP을 후속 디자인팀이 사용할 수 있다. 발표의 상위 질문은 “다음 질문에 무엇을 다시 쓸까”다. 초기 개념 오해 교정 뒤 새 운영 질문·보류·결정 대체로 이어지며 RAG·LoRA의 분류를 중심으로 삼지 않는다.

## 인수할 실물

- [40장 스토리보드](storyboard.md)와 [번호와 시간 JSON](storyboard.json): 정확 40장, 1~39장 설명·참여 1800초, 40장 Q&A 별도 120초 추정. 실제 리허설 미측정.
- `talks/llm-wiki/demo/llm-wiki-demo.zip`: 23,952바이트, 24파일. [패키지 manifest](package-manifest.json)의 SHA-256과 일치한다.
- `talks/llm-wiki/demo/`: 공개 원문 읽기 메모 5개, before 5쪽, review 승인안, after 8쪽, 실제 diff와 receipt, 오프라인 Node 도구, 복사 가능한 starter.txt.
- [격리 실행 증거](execution-evidence.json): ZIP CRC 검사, 임시 폴더 압축 해제 후 check → apply → check 모두 exit 0. after Markdown 8개 원본과 바이트 동일.

기존 5쪽 갱신+새 3쪽 생성=총 8쪽에 반영했다. local link 25개, 원자료 읽기 메모 5개+before 5쪽의 SHA를 보존했다. 파일 규모를 정확도나 시간 절감으로 해석하지 않는다. 실행은 발표자가 승인한 고정 교정안을 적용한 것이며 실제 모델을 호출하지 않았다. source-note는 원문 전문이 아니라 작성자의 한국어 요약이다.

## 양방향 직접 교차 검토

B는 A의 SOURCES.md와 photo-manifest.json을 전문 읽고 4사진의 바이트·SHA를 독립 대조했다. Bush의 출판사 원문 §6 두 문장과 Pexels License를 직접 열어 인용·맥락과 발표 사용 조건을 확인했다. A에게 2인용 각12단어·번역·설계/역사 구상 범위가 적절하다고 직접 회신하고, 인용 뒤 파일 확인과 질문 작성으로 바로 잇도록 제안했다. Karpathy 인용은 B도 앞서 gist 본문 The core idea를 직접 열어 확인했다.

A는 B의 review.json, run-demo.cjs, after의 Q2·D1·D2·pending을 직접 읽고 check를 실제 실행해 통과를 회신했다. C1·Q1·D1의 새 질문 재사용, D1 맥락 보존, D2 검토 비용과 보류 후속 행동이 드러난다고 확인했다. A가 지적한 “8수정+3추가” 오독 가능성은 최종 자료의 “기존5갱신+3생성=8반영”으로 반영했다. A는 최종 40장 표 작성 전 편집을 종료했으므로 최종 40장 표를 A가 읽었다고 기록하지 않는다.

manager는 별도 임시 복사에서 check/apply/check를 재현했고, diff를 patch 도구로 독립 적용해 after 8파일 바이트 일치를 확인했다. 최종 40장 번호·고유 제목·누적 시간·참여와 복귀 해시·ZIP 내용도 독립 검수했다.

## 후속 구현 계약

참여1은 12장 A/B → 13장 답 `#13` → 14장 본 흐름, 참여2는 23장 A/B → 24장 예제 정책 `#24` → 25장 본 흐름이다. 발표자가 실제 Zoom 채팅을 읽는다. 가짜 응답·집계·웹 투표 기능 표현을 넣지 않는다. 둘째 B는 이 예제의 선택이다.

사진은 1/3/9/34장에 P1/P3/P2/P4를 서로 다른 구도로, 짧은 원저자 인용은 7장 Karpathy와 30장 Bush에 배치한다. [A의 확인 기록](../media/SOURCES.md)을 따라 작가·출처·권리·번역을 표시한다. Karpathy 고정 revision은 root가 실제 확인한 `ac46de1ad27f92b28ac95459c782c07f6b8c964a`이며 링크는 https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a 이다. 불변 데모의 읽기 메모는 재생성하지 않았다.

builder의 임의 demo Markdown 등록 제약 때문에 덱 배포 링크는 `./demo/llm-wiki-demo.zip`으로 건다. 28장의 원문 교체 절차는 앞으로의 운영법이다. 이번 실물은 같은 RAG 논문의 읽기 범위 확장이라서 논문 버전이 교체된 실행 사례로 소개하면 안 된다.

남은 일은 후속 원고·대본·자료목차·README·발표 안내의 40장/시간/해시 동기화, 사진 crop·발표/읽기/모바일, 실제 답 공개 링크 클릭, 빌드와 공개 ZIP 다운로드 검수다. 브라우저와 제품 통합은 root/디자인팀 소유다. B는 원고·materials·공통코드·build·Git·WORK_LOG·브라우저를 수정하거나 조작하지 않았다.
