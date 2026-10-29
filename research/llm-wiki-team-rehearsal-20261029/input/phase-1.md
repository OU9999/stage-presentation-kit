# 발표 입력 1

배정된 구간의 화면과 말할 문장을 순서대로 확인합니다. 다음 구간을 먼저 열지 않습니다. 실제 음성이나 실시간 송출이 아니며 낭독 시간은 측정하지 않았습니다.

## 1장 · 읽은 자료의 관계를 다음 질문에도 쓸 수 있을까

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-01.png`

말할 문장:

“이번에 읽은 자료를 다음 질문에서도 함께 쓸 수 있을까요? 답 한 문장보다, 여러 자료에서 무엇을 비교하고 어떻게 연결했는지를 떠올려 보세요. 오늘은 그 정리를 LLM이 쓰고 계속 갱신하는 방식을 보겠습니다.”

전환으로 말할 문장: “먼저 LLM Wiki가 무엇인지 한 문장으로 보죠.”

## 2장 · LLM이 쓰고 계속 갱신하는 지식 위키

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-02.png`

말할 문장:

“LLM Wiki는 LLM이 원자료 사이의 개념과 비교, 연결을 Markdown 위키로 작성하고 계속 갱신하는 지식관리 방식입니다. 다음 질문이 이전 정리에서 출발하게 하려는 설계입니다. Karpathy가 공개한 아이디어를 풀어 쓴 설명이며 특정 완제품의 이름이나 공인된 표준은 아닙니다.”

전환으로 말할 문장: “이 방식이 풀려는 반복은 무엇일까요?”

## 3장 · 같은 자료를 매번 다시 엮고 있다면

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-03.png`

말할 문장:

“자료 다섯 개를 함께 읽고 좋은 답을 얻었다고 해봅시다. 다음 질문에서 이전에 어떤 조건을 비교했고 어떻게 해석했는지 정리되어 있지 않으면 자료의 관계를 다시 찾습니다. 이 종합 작업의 일부를 지속하는 페이지로 남겨 갱신하자는 생각입니다. 모든 검색 시스템이 축적할 수 없다는 뜻은 아닙니다.”

전환으로 말할 문장: “그러면 답 옆에 무엇을 남겨야 할까요?”

## 4장 · 답만 남기는 대신 개념과 비교를 남긴다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-04.png`

말할 문장:

“한 자료의 요약은 그 자료를 다시 읽을 입구입니다. 위키에는 여러 자료에서 반복해 만나는 개념, 같은 기준의 비교, 현재까지의 잠정 종합도 남깁니다. 다음 자료가 오면 그 설명을 고치고, 새 질문에서 유용한 답을 얻으면 다시 저장합니다.”

전환으로 말할 문장: “이 파일을 누가 읽고 쓰는지 나눠 보죠.”

## 5장 · LLM은 위키를 쓰고 사람은 탐색을 이끈다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-05.png`

말할 문장:

“파일 도구를 쓸 수 있는 LLM 에이전트가 관련 원자료와 위키를 읽어 현재 답변의 문맥에 넣고 Markdown을 작성·갱신합니다. 사람은 자료와 질문, 범위와 강조점을 정하고 결과를 확인합니다. 읽는 도구는 페이지와 연결을 살펴보는 창입니다. 파일이 생겼다고 모든 모델이 자동으로 접근하거나 영구 기억하는 것은 아닙니다.”

전환으로 말할 문장: “저장하는 층과 작업 규칙을 보겠습니다.”

## 6장 · 원자료와 위키 그리고 작업 규칙

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-06.png`

말할 문장:

“보존할 원자료와 고쳐 나갈 위키를 나눕니다. 원자료는 돌아가 확인할 입력이고, 위키는 LLM이 정리한 설명과 연결입니다. 작업 규칙은 페이지 형식과 자료 반영, 질문, 점검을 안내합니다. 규칙이 세 번째로 변환되어 나오는 결과물은 아닙니다. 목차는 읽을 입구, 로그는 작업 이력으로 둘 수 있습니다.”

전환으로 말할 문장: “새 자료 하나를 넣었을 때부터 따라가죠.”

## 7장 · 새 자료 한 개가 여러 설명을 바꾼다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-07.png`

말할 문장:

“Ingest는 새 요약 파일 하나를 만드는 데서 끝나지 않습니다. 새 자료를 읽고 기존 개념의 조건, 비교표의 근거, 잠정 종합에서 달라지는 부분을 함께 갱신합니다. 자료에 따라 기존 페이지부터 고칠 수도 있습니다. 새로운 지지와 충돌, 아직 모르는 부분을 남기고 목차와 작업 이력도 맞춥니다.”

전환으로 말할 문장: “질문할 때 이 저장 결과를 다시 읽습니다.”

## 8장 · 다음 질문은 저장된 위키를 찾아 읽는다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-08.png`

말할 문장:

“Query에서는 목차나 검색으로 필요한 페이지를 찾아 현재 답변의 문맥으로 읽습니다. 범위가 달라지면 원자료도 확인합니다. 새롭게 얻은 비교나 분석, 유용한 답은 실제 페이지로 저장해 관련 위키에 연결할 수 있습니다. 다음 질문도 저장된 쪽을 다시 읽어야 합니다. 이 파일 갱신은 모델 가중치를 학습시키는 작업과 구별됩니다.”

전환으로 말할 문장: “설명이 계속 쌓이면 무엇을 점검할까요?”

## 9장 · 낡은 설명과 빠진 연결을 점검한다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-diagram-redesign-20261029/evidence/screens/slide-09.png`

말할 문장:

“Lint는 낡은 설명과 서로 다른 조건, 빠진 개념과 연결을 찾아보는 작업입니다. 예를 들어 새 회의가 있는데 옛 상태만 남았는지, 충돌처럼 보이는 두 문장이 사실은 조건이 다른지 확인합니다. 의심 목록을 바탕으로 다음 읽기와 수정을 정합니다. 점검 후보가 곧 확정 오류는 아닙니다.”

전환으로 말할 문장: “서로 다른 세 가지 자료에서 이 흐름을 보겠습니다.”
