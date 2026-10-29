# 원문·사례 직접 검토와 편집 결정

2026-10-29. 기준 main `37bb2bca611d2339c524838f3a0c98999ed5f3e4`. 공통 작업 상태는 WORK_LOG만 사용한다. 이 문서는 실제 검토 쟁점과 수용한 결정의 근거다.

## 역할과 인수 범위

manager `/root/llm_engineering_manager`가 manager 스킬과 coordinate 모델 선택 절을 적용했다. 신규 A `karpathy_design_reviewer`는 Karpathy 공개 원문의 설계 검토 역할이며 실제 저자 참여·고용·승인·미공개 의견을 뜻하지 않는다. 신규 B `evidence_cases_engineer`는 사례를 독립 조사하고 연구를 취합했다. 두 명 모두 `gpt-6.1-sol / high / fork none`으로 실제 생성했다. root의 2026-10-29 05:53 UTC 공식 최신 모델·실제 runtime catalog 확인을 같은 작업의 스냅샷으로 공유했다.

A는 원문과 현행 소재 감사 2파일, B는 사례·기전과 가상 입출력 3개 및 SYNTHESIS를 독립 작성했다. manager는 원문·사례 근거를 독립 확인하고 CONTENT_CONTRACT를 소유한다. 연구 중 제품 원고·데모·ZIP·과거 연구는 읽기 전용이었다. 외부 저장소의 명령·AGENTS·설치 지시는 분석 자료로만 읽었으며 설치나 실행을 하지 않았다.

## 원문과 현행 원고의 대조

manager는 [현재 Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)와 [고정 판](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a)의 본문을 끝 Note까지 실제 열었다. 댓글·홍보는 근거에서 제외했다. A와 manager가 [revisions HTML](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/revisions)을 각각 읽기 전용 HTTP로 확인했다. datetime `2026-04-04T16:25:13Z`와 유일 revision link `ac46de1ad27f92b28ac95459c782c07f6b8c964a`를 확인했으며, API history를 확인한 것으로 바꾸지 않았다.

합의한 핵심은 원자료 위에 LLM이 작성·유지하는 연결된 위키를 남긴다는 점이다. 사람의 자료 선정·탐색·질문과 LLM의 페이지 작성·갱신을 구별한다. 질의 때 원자료를 다시 엮는 작업의 일부를 ingest와 유용한 답의 저장 시점으로 옮긴다는 설명은 우리의 인과 해석이다. 모든 RAG가 축적할 수 없다는 제품 일반화나 역사적 최초성 주장은 채택하지 않았다. 저자의 낙관적인 유지비·누락·규모 표현도 검증된 보장으로 쓰지 않는다.

manager는 기존 40장 앞부분과 대본의 실제 문장을 직접 읽었다. 2·4장의 ‘후보 제안/사람 채택’ 정의와 초반부터 이어지는 RAG/LoRA 교정·claim/ADR 데모는 정직한 실행 범위를 설명하지만, 원형의 작성·유지 기능과 다양한 지식 축적을 충분히 드러내지 못했다. A는 전체 원고·가이드·대본·demo-log를 줄 단위로 감사했다. 기존 파일 교정 실습을 거짓으로 판정하지 않고, 본체의 설명을 대신하지 않도록 심화에 두기로 했다.

## 구현·논문 근거의 독립 인수

- **Microsoft 공개 코드**: manager도 고정 SHA `e09126f257c1fcf8e63234382748a51cf6a5df7f`의 [ingest.ts](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/core/src/ingest.ts), [llmIngest.ts](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/llmIngest.ts), [chatParticipant.ts](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/chatParticipant.ts)를 실제 열었다. 기계적 등록과 모델 기반 내용 작성이 분리되며, 질문에서 저장된 페이지를 다시 읽는다. README의 `/save` 기대와 달리 해당 handler는 안내만 출력한다. 따라서 완전한 자동 답 저장 구현·설치 성공·조직 도입으로 소개하지 않는다.
- **살아 있는 코드 위키 변형**: manager도 고정 SHA `422fe1d3ff889295285b2f1a339cdbf789f43e5b`의 [constitution](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/constitution.md)과 [validator](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/scripts/validate.py)를 실제 열었다. 코드 판·해시로 오래된 설명을 찾는 설계이며 해시 차이는 의미 오류 판정이나 자동 수정이 아니다. 이 저장소의 승인 규칙을 모든 LLM Wiki의 필수 규칙으로 확대하지 않는다.
- **강의 코퍼스 논문**: manager가 [Wright v1](https://arxiv.org/html/2609.25303v1)의 방법·결과·§5.4를 실제 읽었다. 제한된 코퍼스의 QA 비교이며 학생 학습성과 조사가 아니다. 단일 응답 실행·한 LLM judge·기저선 조정 여지·비용 미측정의 한계를 함께 다룬다. 설계 절의 비용 측정 표현보다 실제 한계 절의 미측정을 따른다. 초록 single-fact와 본문 topic-page 분류도 혼용하지 않는다.

## A↔B의 실제 논쟁과 수용

1. B는 A의 선형 흐름이 요약만 늘어나는 것으로 읽힐 수 있다고 지적했다. A는 기존 개념·비교·잠정 종합에 되돌아오는 연결과 query 답의 실제 파일 저장을 보강했다.
2. A는 독서 사례가 인물의 자기 설명을 확정 동기로 바꾸는 문제를 지적했다. manager도 같은 문제를 독립 발견했다. B는 서하가 그렇게 설명했다는 사실과 동기에 대한 해석·미확인을 구분했다.
3. A는 팀 사례의 ‘다음 분기’ 질문이 ‘이번 분기’ 입력과 맞지 않음을 지적했다. B는 실제 가상 입력과 후속 질문을 맞췄다.
4. A와 manager는 강의 사례가 기존 파일에 없던 오류를 새로 지어내 교정했다고 설명하는 문제를 각각 발견했다. B는 새 분류트리 자료로 기준 비교와 연결 범위를 확장하는 장면으로 바꿨다.
5. B는 세 사례의 새 답·질문·종합 파일 내용을 추가했고 A가 직접 재독했다. 입력→여러 위키 페이지→후속 질문→새 자료에 따른 갱신이라는 서로 다른 작동 장면을 유지했다.

원저자 제시 용도, 관찰한 공개 구현, 논문 실험, 우리가 만든 적용 예라는 네 라벨을 구분한다. 독서·팀·강의의 파일 문장은 합성 교육 예제이며 실제 모델 출력·조직 사례로 바꾸지 않는다. 직접 인용은 추가하지 않고 기존 영문 12단어를 포함한 출처당 25단어 이내 원칙을 유지한다.

## 다음 단계 결정

root는 별도 작성팀을 추가하는 대신 같은 두 검토자가 실제 원고에 반영하도록 범위를 확장했다. 연구 실물과 직접 교차를 먼저 동결하고, 40번호·핵심 시간·자료 링크·시각 경로를 CONTENT_CONTRACT로 확정한다. 양 담당자의 명시 수신과 root 통보 뒤 제품 소유권을 전환한다. 정의·문제·기전·다양한 사례를 앞세우고 공용노트 비유는 보조로 제한한다. 기존 27핵심 수와 참여 위치는 보존 의무가 아니다.

root는 TaskSpace108의 브라우저·최종 생성물·Git을 소유하고, 기존 사용자 Space와 서버를 보존한다. 외부 설치·실행 및 기존 고정 demo/ZIP 변경 금지는 다음 단계에도 유지한다.
