# 조사 출처

확인일은 모두 **2026-10-28**. S*는 실제 외부 조사 자료, E*는 발표자가 만든 합성 예제다. 확실도는 문서가 해당 설명을 직접 지원하는 정도이며 실제 운영 효과의 점수가 아니다. 실제 검색 후 원문을 열었고, 원문 전문·댓글은 복제하지 않았다.

| ID | 출처·원저자 | 작성 / 수정 | 확인일 | 실제 확인 범위 | 지원 주장 | 범위·확실도 |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), Andrej Karpathy | GitHub 생성 표시 2026-04-04 16:25, 표시 시간대 불명. 별도 수정일 불명, Revisions 1 표시. 버전 SHA 미확보 | 2026-10-28 | 본문 The core idea, Architecture, Operations, Indexing and logging, Note | C01~C04: 지속적인 Markdown wiki, 원자료/wiki/schema 3층, ingest/query/lint, index/log | 설계 아이디어 원문. 제품 기능 명세나 비교 실험 아님. 제안 내용의 직접 지원 높음 |
| S10 | [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), Michael Nygard | 작성 2011-11-15. 별도 수정일 불명 | 2026-10-28 | Context, Decision, Status, Consequences | C07: 배경·선택·상태·결과를 짧게 기록하고 이전 결정을 superseded로 유지 | 원래 중요한 소프트웨어 아키텍처 결정 대상. 스터디 운영에 적용은 우리 제안. 직접 지원 높음 |
| S11 | [PROV-Overview, 2013-04-30 판](https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/), W3C, editors Paul Groth·Luc Moreau | 발행 2013-04-30. 이 판 이후 수정일 불명 | 2026-10-28 | Abstract, Introduction, Status | C06: 생성된 결과물·과정·관여자의 출처 정보는 신뢰성 평가의 재료 | **Working Group Note, 비규범 개요**. 아래 카드 템플릿을 규정하거나 사실을 보증하지 않음. 직접 지원 높음 |
| S12 | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401), Patrick Lewis et al. [본문 v4](https://arxiv.org/html/2005.11401v4) | 최초 제출 2020-05-22 / v4 수정 2021-04-12. NeurIPS 2020 | 2026-10-28 | Abstract, §2, §4.2~4.3/Table 4, §4.5, Broader Impact | C05: 외부 검색 문맥과 생성 모델의 결합. C09의 한계 해석에 참고 | 논문 조건의 실험이며 모든 시스템 성능 보장 아님. 원 논문은 fine-tuning도 수행하므로 ‘RAG는 학습하지 않는다’고 일반화 금지. 직접 지원 높음 |

S2~S9·S13~S19는 이번 최소 조사에서 사용하지 않는다. 같은 RAG 논문을 S2/S12로 이중 등록하지 않고 S12로 통일한다. S1의 성능·유지비·규모에 관한 서술은 제안자의 관찰/주장으로만 읽고 발표의 검증된 수치로 사용하지 않는다.

## 조사 경로와 인수

- B: ADR 저자/제목, W3C PROV, Lewis RAG 원논문을 실제 검색 후 각 공식·저자 원문 open. RAG v4 본문도 확인. S1 본문을 별도 open해 통합 전에 대조했다.
- A: S1 원출처·작성 표시·본문 검증 담당. 교차 검토 결과와 최종 참조는 [주장 대장](claim-ledger.md), [발표 합의](synthesis.md)에 연결한다.
- 자료를 읽었다는 기록과 그 자료가 특정 주장을 지원한다는 판단은 다르다. 근거 위치와 안전한 표현은 주장 대장에서 확인한다.

## 합성 예제 자료

E1(공지 1판), E2(변경 공지 2판), E3(읽기 메모), E4(질문 메모)는 모두 발표용 창작물이다. 작성일·이름·시간·결정도 가상이며 실제 모임 운영의 증거나 논문 근거가 아니다. 정확한 내용과 연결 계약은 [발표 합의](synthesis.md)를 기준으로 한다.
