---
title: 'LLM Wiki: 읽은 자료를 다음 질문으로 잇기'
footer: 'Zoom AI 스터디 · 18분 발표 + 2분 질문 · 2026-10-28'
---

<!-- stage-slide
compose: message
tone: blue
-->
# 다음 주에도 이 답을 설명할 수 있나요?

**답에서 근거로, 근거에서 다음 질문으로.**

RAG와 LoRA를 읽는 작은 AI 스터디

---

<!-- stage-slide
compose: message
tone: purple
-->
# 읽고 고치는 파일이 남습니다

LLM이 자료를 읽고, 연결된 Markdown 위키를 갱신합니다.

실제 원문을 읽는 가상 스터디로 따라가 봅니다.

Karpathy의 설계 아이디어 · [LLM Wiki 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

---

<!-- stage-slide
compose: media
tone: blue
fit: contain
-->
# 원자료는 보존, 설명은 갱신

![원자료에서 연결된 위키를 갱신합니다. schema는 이 흐름의 옆에서 보존·근거·검토 방법을 정하는 작업 규칙입니다.](./assets/wiki-layers.svg)

schema는 작업법을 정합니다. 규칙이 실제로 지켜졌는지는 결과에서 확인합니다. [설계 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

---

<!-- stage-slide
compose: editorial
tone: blue
-->
# 세 원문에서, 읽기 메모로

<!-- stage-group
tone: blue
-->
## RAG · §2

검색한 문서를 **답 생성에 사용**합니다.

가상 메모의 질문: 이 논문에는 학습도 있을까?

[Methods · Training](https://arxiv.org/html/2005.11401v4#S2)

<!-- stage-group
tone: purple
-->
## LoRA · 초록

기본 가중치는 고정, **추가 행렬은 학습**합니다.

가상 메모의 질문: 무엇이 바뀌는가?

[Abstract · §4.1](https://arxiv.org/html/2106.09685v2)

<!-- stage-group
tone: green
-->
## LLM Wiki · 설계

읽고 정리한 **파일을 계속 유지**합니다.

가상 메모의 질문: 다음에 어떤 파일을 읽을까?

[Architecture · Operations](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)


---

<!-- stage-slide
compose: editorial
tone: blue
-->
# 검색과 모델 적응, 바뀌는 대상부터

<!-- stage-group
tone: blue
-->
## 검색 문맥

관련 문서 → 답을 만들 때 읽는 문맥

RAG 논문의 모델은 검색한 문서를 생성에 활용합니다.

[§2 Methods](https://arxiv.org/html/2005.11401v4#S2) · 원논문에는 [§2.4 Training](https://arxiv.org/html/2005.11401v4#S2.SS4)도 있습니다.

<!-- stage-group
tone: purple
-->
## 학습 가능한 매개변수

훈련 데이터 → 추가 행렬의 갱신

LoRA는 기본 가중치를 고정하고 저랭크 행렬을 학습합니다.

[Abstract · §4.1](https://arxiv.org/html/2106.09685v2)

---

<!-- stage-slide
compose: editorial
tone: green
-->
# 같은 질문: 다음 답에 어떻게 반영되나요?

<!-- stage-group
tone: green
-->
## 위키 갱신

설명·연결 파일을 고칩니다.

다음 질문에서 **필요한 파일을 다시 읽습니다.**

확인할 것: 주장 범위·링크·수정 이유

[파일 축적의 설계](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

<!-- stage-group
tone: blue
-->
## 검색을 이용한 생성

관련 자료를 찾습니다.

찾은 자료를 **답의 문맥에 넣습니다.**

확인할 것: 검색 누락·관련성·답의 지원

[RAG §2](https://arxiv.org/html/2005.11401v4#S2)

<!-- stage-group
tone: purple
-->
## LoRA 모델 적응

추가 행렬을 학습합니다.

**학습 결과를 적용한 모델**로 답합니다.

확인할 것: 데이터·목표·평가·적용 대상

[LoRA Abstract·§4.1](https://arxiv.org/html/2106.09685v2)

---

<!-- stage-slide
compose: media
tone: green
fit: contain
-->
# 연결은 근거로 돌아가는 길

![가상 학습 경로. RAG는 검색 개념에, LoRA는 모델 적응 개념에, LLM Wiki 설계는 파일 정리에 연결됩니다. 같은 질문으로 비교하고 위키 수정은 학습인가에 답합니다. 검토한 답은 관련 개념과 비교에 다시 연결합니다.](./assets/knowledge-map.svg)

질문에서 원문으로 근거를 되짚고, 원문에서 질문으로 수정할 후보를 찾습니다. [파일 예제와 읽는 법](./materials/study-guide.md#5-연결도를-읽는-법)

---

<!-- stage-slide
compose: quote
tone: purple
-->
# 질문 · 위키 파일을 고치면 모델도 학습하나요?

> 이 예제에서 바뀌는 것은 파일입니다.
> 다음 답에 쓰려면 다시 읽어야 합니다.

모델 매개변수를 학습하는 절차와 구분합니다. 근거·범위를 검토한 답을 질문 페이지에 저장하고, 개념·비교 페이지에 연결합니다.

남은 질문: 우리 자료에서 필요한 파일을 제대로 찾을 수 있을까요? [가상 질문 페이지 전문](./materials/study-guide.md#6-질문의-답을-다시-저장하는-query)

---

<!-- stage-slide
compose: media
tone: orange
fit: contain
-->
# 새 근거는 예전 문장을 고칩니다

![가상 위키의 수정 과정. 외부 파일을 쓰면 학습하지 않는다는 과도한 일반화를 삭제합니다. RAG Training과 LoRA의 학습 대상을 대조해 파일 수정과 매개변수 학습을 구분하는 문장으로 고칩니다. 현재 본문을 교정하고 변경 이유는 log에 남깁니다.](./assets/change-trace.svg)

일반화를 지우고 범위를 고칩니다. 관련 질문도 검토하며, 이유는 이력에 남깁니다. [수정 diff](./materials/study-guide.md#7-ingest-새-자료를-넣을-때-실제로-달라지는-것) · [RAG §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4) · [LoRA](https://arxiv.org/html/2106.09685v2)

---

<!-- stage-slide
compose: editorial
tone: green
-->
# index는 지금, log는 바뀐 이유

<!-- stage-group
tone: green
-->
## index · 무엇부터 읽지?

처음 이해하기 → 검색 문맥 / 모델 적응

차이 알아보기 → 같은 기준의 비교

질문에서 시작하기 → 위키 수정은 학습인가

[가상 index 전문](./materials/study-guide.md#8-index와-log는-서로-다른-질문에-답한다)

<!-- stage-group
tone: orange
-->
## log · 무엇을 왜 고쳤지?

LoRA 메모를 개념에 연결했다.

‘외부 파일 사용 = 학습 없음’을 교정했다.

이유: 파일 사용과 학습 대상을 섞었다.

[가상 log 전문](./materials/study-guide.md#8-index와-log는-서로-다른-질문에-답한다)

---

<!-- stage-slide
compose: editorial
tone: yellow
-->
# 논문을 읽어도, 선택은 우리가 합니다

<!-- stage-group
tone: yellow
-->
## 선택

**검토한 질문 답부터 파일로 남긴다.**

질문 1개 · 개념 2개 · 비교 1개부터

가상 스터디의 결정 · [전체 기록](./materials/study-guide.md#9-근거를-읽은-다음에도-결정은-남는다)

<!-- stage-group
tone: green
-->
## 이유와 대안

다음 모임에 근거와 수정 이유를 다시 읽고 싶습니다.

채팅만 유지하거나, 검색부터 구축할 수도 있습니다.

[결정 기록](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)을 스터디에 응용했습니다.

<!-- stage-group
tone: orange
-->
## 결과와 재검토

검토·연결 관리 시간이 듭니다.

페이지를 계속 못 찾거나 검토가 밀리면 다시 결정합니다.


---

<!-- stage-slide
compose: editorial
tone: orange
-->
# 링크 다음에는, 문장을 확인합니다

<!-- stage-group
tone: orange
-->
## 링크는 있지만 틀린 요약

“LoRA는 기본 가중치를 고정하므로 학습이 없다.”

초록의 **추가 행렬을 학습한다**는 부분을 빠뜨렸습니다.

[LoRA 초록으로 돌아가기](https://arxiv.org/html/2106.09685v2)

<!-- stage-group
tone: green
-->
## 문장 지원과 진실 판단

먼저 자료가 이 문장과 범위를 지원하는지 봅니다.

지원되더라도 자료 자체의 조건·오류·다른 근거는 따로 검토합니다.

[ALCE 인용 평가](https://arxiv.org/html/2305.14627v2#S3.SS3) · [PROV 출처 정보](https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/)

---

<!-- stage-slide
compose: editorial
tone: blue
-->
# 작은 질문으로, 유지할 일을 확인합니다

<!-- stage-group
tone: blue
-->
## 읽기 · 반영

원문 두세 개와 질문 하나부터 시작합니다.

관련 개념과 비교에 연결합니다.

<!-- stage-group
tone: green
-->
## 찾기 · 질문

놓치는 페이지가 생기면 목차와 검색을 점검합니다.

검토한 답과 남은 질문을 이어갑니다.

<!-- stage-group
tone: orange
-->
## 고치기 · 점검

주장·연결·이력에 검토 시간을 배정합니다.

효과·절감·유지비는 미측정입니다. [운영의 tradeoff](./materials/study-guide.md#14-규모와-운영-비용의-tradeoff)

---

<!-- stage-slide
compose: closing
tone: blue
-->
# 다음 질문에, 근거부터 이어 봅시다

**무엇을 읽었고, 어디까지 알며, 왜 선택했나요?**

질문 2분 · [공부 자료 목차](./materials/index.md)

[학습 가이드](./materials/study-guide.md) · [발표 대본](./materials/speaker-script.md) · [원문 읽기](./materials/reference-library.md) · [실습과 해설](./materials/workshop.md)
