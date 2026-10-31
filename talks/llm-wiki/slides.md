---
title: LLM Wiki · 내 자료를 AI와 함께 정리하는 방법
theme: stage
---

<!-- stage-slide
compose: message
tone: neutral
-->
# LLM Wiki

**내 자료를 AI와 함께 정리하는 방법**

모아 둔 자료를, 다음 질문에 다시 쓰기
---

<!-- stage-slide
compose: quote
tone: neutral
-->
# LLM Wiki는 무엇인가요?

> 내 자료를 AI와 함께 정리하고 연결하는
> **마크다운 지식창고입니다.**

내가 읽고 고칠 수 있고, AI도 찾아 읽고 갱신합니다.
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 왜 필요한가요?

![왜 필요한가요?를 설명하는 기존 도식.](./assets/expanded/knowledge-layers.svg)

자료를 모은 뒤, **다음에 다시 읽을 개념과 연결**을 남깁니다.
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 무엇이 생기나요?

![무엇이 생기나요?를 설명하는 기존 도식.](./assets/expanded/raw-wiki-rules.svg)

**원자료(raw) · 정리한 문서(wiki) · 작업 규칙(rules.md)**

마크다운은 글과 링크를 적는 텍스트 파일입니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 사람과 AI가 함께 편집합니다

## 사람

**목적과 자료를 고르고, 결과를 확인합니다.**

## AI

**읽고, 정리하고, 연결하고, 고칩니다.**

파일을 읽고 쓸 수 있는 에이전트와 함께 작업합니다.
---

<!-- stage-slide
compose: document
tone: neutral
-->
# RAG와 무엇이 다른가요?

| 살펴볼 점 | RAG | LLM Wiki |
| --- | --- | --- |
| 중심 작업 | 관련 자료를 검색해 답하기 | 읽을 문서를 정리하고 연결하기 |
| 질문할 때 | 찾은 근거를 참고 | 정리한 문서와 원자료를 참고 |
| 계속 관리할 것 | 검색 품질·자료 변경 | 문서 내용·연결·자료 변경 |

**함께 쓸 수 있습니다. 위키 문서를 RAG로 검색할 수도 있습니다.**
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# RAG는 필요한 근거를 찾아 답합니다

![RAG는 필요한 근거를 찾아 답합니다를 설명하는 기존 도식.](./assets/expanded/rag-path.svg)

같은 자료에서 **지금 질문에 필요한 부분을 찾아** 답을 만듭니다.
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 위키는 정리해 둔 문서를 읽습니다

![위키는 정리해 둔 문서를 읽습니다를 설명하는 기존 도식.](./assets/expanded/wiki-path.svg)

자료를 **개념·비교·계획으로 미리 정리**하고, 필요한 쪽을 다시 읽습니다.
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# Ingest는 자료를 읽고 연결하는 일

![Ingest는 자료를 읽고 연결하는 일를 설명하는 기존 도식.](./assets/expanded/ingest-map.svg)

**읽기 → 정리하기 → 기존 문서와 연결하기**
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 요약 하나로 끝나지 않습니다

![한 자료의 요약과 여러 자료를 연결한 개념 문서의 차이.](./assets/expanded/source-concept.svg)

**자료 요약**은 그 자료를, **개념 문서**는 여러 자료의 공통 주제를 설명합니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 목차에서 필요한 문서를 찾습니다

## 목차를 보고

어떤 문서가 있는지 **훑어봅니다.**

## 링크를 따라

질문과 관련된 **문서와 근거를 읽습니다.**

위키가 커지면 파일 검색도 함께 씁니다.
---

<!-- stage-slide
compose: document
tone: neutral
-->
# 질문하면 이렇게 씁니다

**질문**

> 다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?

1. 정리한 **개념과 비교 문서**를 읽습니다.
2. **우리 목적과 조건**에 맞춰 답합니다.
3. 쓸 만한 답은 확인한 뒤 **문서로 남깁니다.**

발표용 스터디 사례입니다.
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 새 자료가 오면 기존 문서도 고칩니다

![새 자료가 오면 기존 문서도 고칩니다를 설명하는 기존 도식.](./assets/expanded/related-updates.svg)

**입문자와 15분 활동이라는 새 조건**으로 설명·선택 기준·계획을 함께 고칩니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 어떤 자료부터 넣을까요?

## 다시 쓸 자료

내가 자주 묻는 **질문에 관련된 것**

## 이유가 있는 자료

왜 중요하게 봤는지 **설명할 수 있는 것**

## 작은 시작

같은 주제의 **자료 두 개부터**
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 목적이 있어야 정리 기준이 생깁니다

![목적이 있어야 정리 기준이 생깁니다를 설명하는 기존 도식.](./assets/expanded/purpose-questions.svg)

**왜 골랐는지, 어디에 쓸지**를 적으면 정리할 기준이 생깁니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 어디에 쓸 수 있나요?

## 공부

읽은 자료를 **개념과 질문으로 연결**하기

## 프로젝트

배경과 결정 이유를 **함께 읽기**

## 글과 발표

모아 둔 근거로 **초안 만들기**
---

<!-- stage-slide
compose: media
fit: contain
tone: neutral
-->
# 정리한 지식으로 만든 실제 결과

![정리한 지식으로 만든 실제 결과를 설명하는 기존 도식.](./assets/expanded/session-plan.svg)

[**15분 활동 진행안 읽기**](./materials/session-plan.md) · 준비된 메모와 연결을 읽는 활동 예입니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# 장점은 읽고 고칠 수 있다는 것

## 내가 읽을 수 있습니다

정리된 설명과 **근거를 확인**합니다.

## 내가 고칠 수 있습니다

내 경험과 판단을 **직접 보탭니다.**

## 다음에 다시 씁니다

쌓인 정리를 **새 질문에 활용**합니다.
---

<!-- stage-slide
compose: editorial
variant: centered
tone: neutral
-->
# AI가 정리해도 확인은 필요합니다

## 내용

**잘못된 요약과 근거 없는 연결**이 생길 수 있습니다.

## 변화

새 자료와 **예전 설명이 충돌**할 수 있습니다.

## 관리

확인하고 고치는 데 **시간이 듭니다.**
---

<!-- stage-slide
compose: document
tone: neutral
-->
# 이럴 때 작게 시작하세요

| 내 상황 | 먼저 해 볼 일 |
| --- | --- |
| 같은 주제를 자주 다시 물음 | 관련 자료 두 개를 연결해 보기 |
| 내 경험과 판단도 함께 필요함 | 선택 이유와 현재 상황 적기 |
| 자료가 많고 자주 바뀜 | 검색·갱신·검토 비용 비교하기 |
| 한 번만 확인하면 됨 | 간단한 노트와 검색부터 시작하기 |
---

<!-- stage-slide
compose: document
tone: neutral
-->
# 첫 요청은 이 정도면 됩니다

```text
목적: AI 스터디에서 LLM Wiki를 설명하고 싶어.
자료: 내가 고른 자료 두 개와 선택 이유를 읽어 줘.
정리: 개념과 차이를 마크다운으로 쓰고 서로 연결해 줘.
확인: 원자료 링크, 바꾼 파일, 모르는 점을 알려줘.
```

[예제 팩](./assets/expanded-study.txt) · [자료 읽는 방법](./materials/workshop.md)

[원본 그림·48장 원고 보기](./materials/visual-appendix.md)
---

<!-- stage-slide
compose: closing
tone: neutral
-->
# 다음 질문에 쓸 자료 두 개부터

**목적을 정하고 → 연결하고 → 확인하고 → 다시 씁니다.**

내 자료를, 나와 AI가 함께 읽는 지식으로.
---

<!-- stage-slide
compose: message
tone: neutral
-->
# 어떤 자료로 시작하고 싶나요?

**내가 다시 묻는 질문 하나,
그 질문에 쓸 자료 두 개는 무엇인가요?**

Q&A

[학습 자료](./materials/index.md) · [설계와 기술 원문](./materials/reference-library.md)

[원본 그림·48장 원고 보기](./materials/visual-appendix.md)
