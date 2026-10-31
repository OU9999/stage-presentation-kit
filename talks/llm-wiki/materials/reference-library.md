---
title: '원문 읽기 안내와 용어 모음'
description: '참고한 세 영상과 LLM Wiki 설계·검색·모델 적응의 일차 근거를 구분해 읽는 안내'
order: 4
---

# 원문 읽기 안내와 용어 모음

이 문서는 링크를 모으는 데서 한 걸음 더 나아가, **어떤 질문으로 원문을 읽고 어디까지 주장할 수 있는지** 안내합니다. 먼저 [스터디 가이드](./study-guide.md)를 읽고 궁금해진 주제의 원문을 골라도 좋습니다. 직접 파일을 써 보려면 [실습과 해설](./workshop.md), 말로 설명하려면 [발표 대본](./speaker-script.md)을 이용하세요.

발표의 읽기 메모·위키·질문 답은 발표팀이 작성한 **설명용 구성 예**입니다. 실제 외부 원문, 그 원문을 읽고 만든 예시 문장, 기존 ZIP의 고정 교정 실행을 구분해 읽으세요. 기존 정밀 교정 원문은 2026-10-28, 아래 공개 코드·논문은 2026-10-29 확인했으며, 세 영상의 전체 자동자막과 비교용 공식 문서는 2026-10-31 대조했습니다. 직접 인용 대신 한국어로 의역합니다.

## 세 영상 전체에서 무엇을 읽었나

2026-10-31 두 영상의 **한국어 자동자막 전체**를 처음부터 끝까지 읽고 챕터별 대표 화면을 대조했습니다. 첫 영상은 재생 길이 48:47·마지막 발화 48:42, 둘째 영상은 재생 길이 22:17·마지막 발화 22:16입니다. 전체 음성의 연속 재생 완주나 모든 프레임의 확인과는 구분합니다. 자동자막에는 오인식이 있을 수 있어 직접 인용 대신 요지를 풀어 씁니다.

### 1번 영상: 목적·연결·개인 기록의 재사용

[빌더 조쉬 Builder Josh · 브라이언 대담](https://www.youtube.com/watch?v=t4XEda3CB3Q)

| 실제 발화 구간 | 읽은 내용 | 이번 발표와의 연결 |
| --- | --- | --- |
| [02:43~05:47](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=163s) | 좋은 답과 내 맥락에 맞는 답, 저장과 다시 찾기 | 목적과 개인 맥락을 먼저 정하기 |
| [05:50~08:24](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=350s) | LLM 지식층과 에이전트 협업의 등장 배경 해석 | 지속 문서를 둘 이유, 원저자 설계와 화자 해석 구분 |
| [08:26~12:02](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=506s) | 공동 편집·개념 추출·연결·활용 목적 | LLM Wiki의 본질과 ingest 설명 |
| [12:03~17:17](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=723s) | 정제된 문서의 장점, RAG 비교, 목적 없는 구축 | 같은 축의 비교와 작은 시작; 보편 우위는 교정 |
| [17:19~29:29](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=1039s) | 계획·실행 기록·화면 기록·AI 작업 로그의 개인 시스템 | 개인 활용 예와 세 작업의 공통 구조 구분 |
| [29:34~33:51](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=1774s) | 클리핑·raw/wiki·목적 질문·관련 쪽 생성 | 수집과 자료 반영, 자료별 요약과 개념 연결 |
| [33:53~37:14](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=2033s) | 기존 개체에 새 자료 연결, 그래프와 정리 기준 | 다중 페이지·관계·작업 규칙 |
| [37:15~42:00](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=2235s) | 기간별 기록의 종합과 개인적 활용 경험 | QA 한 문장 외에 회고·계획으로 재사용 |
| [42:02~48:42](https://www.youtube.com/watch?v=t4XEda3CB3Q&t=2522s) | 자기 맥락·활용 목적부터 시작하라는 조언, 향후 목표와 마무리 | 개인 프로필·장비 전체를 요구하지 않는 첫 시도 |

첫 영상에는 07:45·09:15 무렵의 개념 설명 화면과 뒤의 raw/wiki·Obsidian·에이전트 작업 화면이 있습니다. 이 발표는 그 설명의 흐름과 실제 작업의 역할을 참고해 새 그림과 예제를 만든 것입니다. 원본 슬라이드 덱을 입수하거나 모든 화면을 그대로 복제한 자료가 아닙니다.

### 2번 영상: RAG·Agentic 검색·학습·위키의 관계

[코딩알려주는누나 · 용담 대담](https://www.youtube.com/watch?v=vvOuhfgH02E)

| 실제 발화 구간 | 읽은 내용 | 이번 발표와의 연결 |
| --- | --- | --- |
| [02:08~03:57](https://www.youtube.com/watch?v=vvOuhfgH02E&t=128s) | 외부 근거와 검색·생성의 제어점 | RAG 기본 흐름과 같은 질문 비교 |
| [03:59~06:49](https://www.youtube.com/watch?v=vvOuhfgH02E&t=239s) | 참고 문맥·파라미터 변화·병행 사용 | 문서·문맥·모델 학습의 구분 |
| [07:16~09:53](https://www.youtube.com/watch?v=vvOuhfgH02E&t=436s) | HR 예를 통한 접근 범위·정책·운영 부담 | 자료 보유 외에 운영과 검토도 판단 |
| [09:55~11:51](https://www.youtube.com/watch?v=vvOuhfgH02E&t=595s) | 에이전트의 정보원 선택과 통제 문제 | 검색의 판단·반복, 무조건 다음 단계는 아님 |
| [13:34~15:50](https://www.youtube.com/watch?v=vvOuhfgH02E&t=814s) | 연결된 텍스트 위키와 검색의 관계 | 지속 지식과 검색의 병행, 과한 일반화는 교정 |
| [16:02~17:38](https://www.youtube.com/watch?v=vvOuhfgH02E&t=962s) | 같은 PDF·질문으로 서비스와 직접 만든 시스템의 제어점을 설명 | 같은 입력·질문으로 설명하는 형식; 공정 성능 실험과 구분 |

도입부·개인 일화·18:58 이후 강좌 모집을 포함해 전체 자막을 읽었지만 기술 근거나 효과의 증거로 모두 채택하지는 않았습니다. 둘째 13:34 이후의 위키 설명은 주로 대화 장면이고, 16:02 이후에는 화면 비교가 나옵니다.

### 3번 영상: 선별한 지식에서 사람이 쓸 결과로

[브레인트리니티 · 「위키는 만들었는데, 뭘 하죠?」 공동 세미나](https://www.youtube.com/watch?v=Ef4AGnSU8UE)의 한국어 자동자막 전체 00:00~86:35 발화를 읽었습니다. 재생 길이는 86:39입니다. 첫 두 영상과 마찬가지로 연속 음성 완주나 시연 도구의 독립 실행을 뜻하지 않습니다. 대표 화면 확인과 자막 실독을 구분합니다.

| 구간 | 읽은 내용 | 이번 발표에 반영한 것 |
| --- | --- | --- |
| [08:43~14:23](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=523s) | 내 문제와 관련된 자료·경험·생각을 선별하는 ‘골드 데이터’ | 목적에 맞는 입력의 선택; 정답 라벨·사실 인증으로 읽지 않기 |
| [16:30~18:10](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=990s) | 만들 결과·목적, 사람의 생각/판단, 사람 입력과 AI 산출의 구분 | 목적과 직접 쓴 이유·작성 주체를 초반부터 명시 |
| [21:35~35:55](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=1295s) | 수집 이유·개념/개체·기존 중복/관계·목차 갱신 | 왜 저장했는지와 새 자료의 통합을 같은 작업에서 설명 |
| [36:02~39:40](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=2162s) | 목차에서 필요한 쪽 읽기, 질문 답을 종합에 저장해 콘텐츠에 활용 | 질문 답에서 실제 쓸 결과물로 이어 가기 |
| [49:26~50:40](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=2966s), [59:31~64:09](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=3571s) | 공유 문서함, 맥락/발주/회의/결과와 작업 산출물의 연결 | 같은 근거·현재 판단의 공유, 맥락·요청·논의·결과의 구분 |
| [71:50~79:47](https://www.youtube.com/watch?v=Ef4AGnSU8UE&t=4310s) | 저장한 작업 과정 재사용, 제작·검토 분담 | 실제 활동안과 검토한 범위·이유를 다시 연결 |

골드 데이터는 화자의 목적 관련 선별 입력이라는 표현입니다. 좋은 입력이 언제나 정확한 출력을 보장한다는 법칙이 아닙니다. 냉장고 비유는 자료를 고르고 손질해 활용한다는 흐름의 보조 설명으로만 사용합니다. 네 작업 구분이나 여러 에이전트·스킬·훅도 필수 규격으로 옮기지 않습니다.

원문은 자기 시연의 한계도 밝힙니다. **38:17에는 방금 수집한 두 글이 아직 검색되지 않았다고 말하며, 82:19~82:40에는 자료 표시 혼선을 인정하고 약10분에는 위키 저장·토론만 했고 PDF/슬라이드는 준비해 왔다고 설명합니다.** 77:20~77:28의 약60% 자동화는 화자의 개인 추정입니다. 라이브 10분 안에 모든 산출물을 완성한 실험이나 검증된 생산성 수치로 소개하지 않습니다.

14~16분의 RAG 대조에는 화자 스스로 설명이 정확하지 않았다고 말하는 부분도 있습니다. 기존의 검색-생성/지속 문서/병행 가능성이라는 정확한 비교는 유지합니다. ‘숫자 검색 대 의미 이해’, ‘검색 없음’으로 양분하지 않습니다. 실제 이번 결과는 [15분 활동안](./session-plan.md)이며, 시간·근거·작성 주체를 확인한 범위와 실제 모임 효과를 구분합니다.

### 영상 설명을 기술 근거와 대조하기

영상의 설명을 출발점으로 삼되 **RAG의 전체 재색인이 언제나 필수인 것은 아니고, LLM Wiki에 검색이 금지된 것도 아닙니다.** 특정 문서 수·두 제품 조합·기업 보편 우위를 공식 기준으로 제시하지 않습니다. 둘째 PDF 시연은 프롬프트·모델·검색 조건을 고정한 성능 실험으로 읽지 않습니다.

첫 영상의 다섯 겹 기록·장비·24시간 수집·회고는 화자의 큰 개인 시스템입니다. 이를 LLM Wiki의 필수 다섯 계층으로 바꾸지 않습니다. 그래프는 문서 연결을 탐색하는 보기이며, 예제의 `rules.md`는 작업 규칙입니다. 개인적인 질서에 관한 화자의 설명을 참고하되 규칙 파일 자체를 형식 온톨로지의 구현이라고 부르지 않습니다.

## 비교와 도구 역할의 일차 근거

| 자료 | 확인 위치 | 여기서 사용하는 범위 |
| --- | --- | --- |
| [LangChain 검색 문서](https://docs.langchain.com/oss/python/deepagents/retrieval) | RAG architectures, Agentic RAG | 고정 검색 흐름과 에이전트가 검색 시점·방법을 선택하는 흐름 |
| [Azure AI Search 데이터 가져오기](https://learn.microsoft.com/en-us/azure/search/search-what-is-data-import) | Indexing actions, change tracking | 개별 문서 갱신·삭제와 변경 추적 가능; 전체 재색인 필수라는 일반화 교정 |
| [Obsidian 저장 방식](https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data) | Markdown vault, external changes | 문서를 읽고 연결을 탐색하는 도구의 역할 |
| [Claude Code 개요](https://code.claude.com/docs/en/overview) | Overview | 파일을 읽고 편집하는 에이전트의 한 예 |
| [GraphRAG indexing](https://microsoft.github.io/graphrag/index/overview/) · [query](https://microsoft.github.io/graphrag/query/overview/) | 개체·관계 추출, 커뮤니티 요약·검색 | RAG도 입력시 관계와 종합을 축적할 수 있는 한 구현 |

네 방식은 서로 다른 설계 축입니다. 위키 문서는 검색 대상이 될 수 있고, 검색에 에이전트 판단을 붙이거나 모델 적응을 병행할 수 있습니다. 이 병행 제안은 이번 학습 자료의 설계 해석이며 비교 성능 실험 결과가 아닙니다. 새 세 영상 예제의 입력·규칙·위키 기대 모양은 [확장 학습 팩](../assets/expanded-study.txt)에서 읽을 수 있습니다. [이전 RAG·LoRA 팩](../assets/rebuild-study.txt)은 구판 부록입니다.

## 질문에 따라 읽는 순서

| 지금 궁금한 것 | 먼저 읽을 곳 | 읽은 뒤 남길 것 |
| --- | --- | --- |
| LLM Wiki에서 무엇이 지속되는가 | Karpathy의 설계 글 | 원자료·위키·작업 규칙의 역할을 한 문장씩 |
| 파일 저장·검색·학습은 어떻게 다른가 | RAG §2와 LoRA Abstract·§4.1 | 입력 문맥과 학습 파라미터를 구분한 비교 표 |
| 출처에 무엇을 적어야 다시 확인할 수 있는가 | PROV-Overview Abstract·Introduction | 자료·생성 과정·검토자 중 현재 빠진 정보 |
| 왜 그렇게 선택했는가를 어떻게 남길까 | Nygard의 Decision 부분 | 배경·선택·상태·결과를 갖춘 결정 한 개 |
| 답의 링크가 실제 문장을 뒷받침하는가 | ALCE §3.3 | 미지원 문장과 불필요한 인용을 나눈 검토 결과 |

전체 논문을 한 번에 읽을 필요는 없습니다. 아래 ‘첫 읽기’ 구간만 읽고 질문을 적은 다음, 실험 조건이나 수식이 필요한 경우 ‘더 읽기’로 넘어가세요. 각 구간을 이해하는 데 걸리는 시간은 독자의 배경에 따라 달라집니다.

## 1. LLM Wiki 설계 글

[Andrej Karpathy, LLM Wiki 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a) · 자료 ID S1. revisions HTML의 생성 항목 datetime `2026-04-04T16:25:13Z`와 유일 revision 링크 `ac46de1ad27f92b28ac95459c782c07f6b8c964a`를2026-10-29 대조했습니다. API history는 접근 오류로 확인하지 못했고 별도 수정 UTC 시각은 미확인입니다. HTML 메타데이터 확인을 API 검증으로 표시하지 않습니다. 댓글과 홍보 링크는 저자 본문과 구분하세요. 같은 고정판 raw 본문은 2026-10-31 다시 가져와 전체를 읽고 설계·세 작업·선택 도구·Note까지 재확인했습니다.

**읽는 이유:** ‘AI에게 문서를 맡긴다’는 말을 실제 저장 대상과 반복 작업으로 바꾸기 위해 읽습니다. 첫 읽기는 The core idea → Architecture → Operations → Indexing and logging → Note 순서입니다. 저자가 제안하는 것은 원자료를 읽어 연결된 Markdown 페이지를 유지하는 설계 패턴입니다. 원자료·위키·schema의 역할, ingest/query/lint, index와 log의 차이를 확인할 수 있습니다. [저자 본문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a)

**지원하는 주장:** 질문에서 얻은 설명도 파일로 남겨 다음 탐색에 이어 쓸 수 있다는 설계입니다. **지원하지 않는 확장:** 모든 RAG가 지식을 축적하지 못한다거나, 위키가 항상 모순을 발견하고 저렴하게 유지된다는 보편적 결론은 이 글로 입증할 수 없습니다. 비교 성능을 검증한 논문이나 공식 표준도 아닙니다.

**읽은 뒤 할 일:** [스터디 가이드](./study-guide.md)의 학습 예제에서 원자료, 개념 페이지, 질문 페이지를 찾아보세요. ‘규칙에 적어 둔 기대’와 ‘변경 결과에서 확인한 사실’을 다른 색으로 표시해 보면 좋습니다. 더 읽을 때는 원문이 권하는 사람의 요약·수정 검토를 찾아, 자동 유지라는 표현의 운영 조건을 따져보세요.

## 2. RAG 원논문

[Patrick Lewis 외, Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) · 자료 ID S12. 최초 제출 2020-05-22, 여기서는 [v4 본문](https://arxiv.org/html/2005.11401v4)(2021-04-12)을 읽습니다.

**읽는 이유:** 검색한 자료를 생성에 쓰는 과정과 모델을 학습하는 과정을 분리해 보기 위해 읽습니다. 첫 읽기는 Figure 1과 §2 첫 문단, §2.4 Training입니다. 이 논문은 검색기와 생성기를 결합하며, 검색한 문서를 생성 문맥으로 사용하고 학습도 수행합니다. 따라서 ‘RAG는 학습이 전혀 없다’는 정의로 줄이면 원논문을 잘못 읽게 됩니다. [§2 Methods](https://arxiv.org/html/2005.11401v4#S2)

**지원하는 주장:** 외부 자료 검색과 생성 모델을 결합하는 방법이 존재합니다. **지원하지 않는 확장:** 모든 검색 결과가 관련 있고, 모든 응답이 최신·정확하다는 보장은 아닙니다. §4.3의 Table 4는 특정 생성 과제·비교 모델에 대한 사람 평가입니다. 그 수치를 현재 사용 중인 도구의 품질로 옮기면 안 됩니다.

**읽은 뒤 할 일:** [실습](./workshop.md)의 검색 개념 카드에 ‘어디서 가져와 무엇의 입력으로 쓰는가’를 적으세요. 더 읽기는 §4.5의 index hot-swapping과 Broader Impact입니다. 자료 교체의 가능성과 원자료 편향·오류의 위험을 함께 읽습니다. 위키도 필요한 페이지를 검색해 사용할 수 있다는 병행 설계는 이 학습 자료의 해석이며, 해당 조합의 성능 실험 결과가 아닙니다.

## 3. LoRA 원논문

[Edward J. Hu 외, LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) · 자료 ID S20. 최초 제출 2021-06-17, [v2 본문](https://arxiv.org/html/2106.09685v2)은 2021-10-16 판입니다.

**읽는 이유:** ‘저장했으니 AI가 배웠다’는 표현에서 실제로 무엇이 바뀌었는지 묻기 위해 읽습니다. 첫 읽기는 Abstract, Figure 1, §4.1입니다. LoRA는 사전학습 가중치를 고정하고 저랭크 행렬을 학습해 가중치의 변화를 표현합니다. 기본 가중치를 고정한다는 문구만 보고 ‘아무 파라미터도 학습하지 않는다’고 정리하지 마세요. [Abstract·§4.1](https://arxiv.org/html/2106.09685v2)

**지원하는 주장:** 파일에 메모를 저장하는 일과 학습 가능한 행렬을 최적화하는 일은 구분해야 합니다. **지원하지 않는 확장:** LoRA가 모든 작업에서 전체 미세조정보다 낫다거나, 위키를 만들면 LoRA가 필요 없어졌다는 결론은 나오지 않습니다. 초록의 자원 절감 수치는 특정 모델·옵티마이저·비교 조건을 갖습니다.

**읽은 뒤 할 일:** [스터디 가이드](./study-guide.md)의 비교 페이지에 ‘바뀌는 대상’을 적고, RAG는 ‘검색된 문맥’, LoRA는 ‘학습한 파라미터’에 표시하세요. 이 구분은 두 방법을 배타적으로 선택하라는 뜻이 아닙니다. 더 읽기는 §5의 비교 대상과 Appendix D의 실험 설정입니다. 도입을 검토한다면 논문 이름보다 자신의 과제·데이터·평가 조건을 먼저 정해야 합니다.

## 4. PROV 출처 정보 개요

[W3C, PROV-Overview](https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/) · 자료 ID S11. 편집자 Paul Groth·Luc Moreau, 2013-04-30 판입니다.

**읽는 이유:** 출처를 URL 하나보다 넓게 보기 위해 읽습니다. 첫 읽기는 Abstract, Status of This Document, §1 Introduction입니다. provenance는 결과물과 그것을 만든 활동·관여자의 정보를 다룹니다. 이런 정보는 품질과 신뢰성을 평가할 재료가 됩니다. 문서 자체는 **비규범 Working Group Note**이며 PROV 계열 문서로 가는 안내입니다. [Abstract·§1](https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/)

**지원하는 주장:** 무엇을 바탕으로 누가 어떻게 결과를 만들었는지 기록할 이유가 있습니다. **지원하지 않는 확장:** 출처 정보가 있다는 사실만으로 내용이 참이 되지 않습니다. 이 학습 자료의 자료·주장·결정 카드가 W3C 인증 양식이라는 뜻도 아닙니다.

**읽은 뒤 할 일:** [실습](./workshop.md)의 카드에서 원문 위치, 읽은 판, 검토자, 확인일을 찾아보세요. URL은 있지만 어느 절을 읽었는지 없다면 재확인이 어려운 이유를 설명해 보세요. 더 읽기는 이 개요의 §2 Document Roadmap입니다. 상호운용 가능한 출처 데이터를 실제 구현해야 할 때 PROV-DM, PROV-O 등 역할에 맞는 규범 문서를 골라야 하며, 작은 스터디가 그 전체를 구현할 필요는 없습니다.

## 5. 짧은 결정 기록의 원문

[Michael Nygard, Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) · 자료 ID S10. 작성 2011-11-15, 별도 수정일은 이번 확인에서 확정하지 않았습니다.

**읽는 이유:** 확인한 정보와 우리가 선택한 행동을 나눠 남기기 위해 읽습니다. 첫 읽기는 Context에서 문제를 파악한 뒤 Decision의 형식 설명, 마지막 Consequences입니다. 중요한 소프트웨어 아키텍처 결정에 배경·선택·상태·결과를 남기며, 후속 결정으로 바뀌어도 이전 기록을 대체 상태로 보존합니다. [Decision·Consequences](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

**지원하는 주장:** 과거 선택의 이유와 현재 유효한 결정을 함께 읽을 수 있게 기록할 수 있습니다. **지원하지 않는 확장:** 모든 사실 확인이 결정이 되는 것은 아닙니다. 스터디의 답 저장 기준에 이 방식을 적용하거나 담당자·재검토 조건·대안을 추가하는 것은 우리의 응용입니다.

**읽은 뒤 할 일:** [고정 교정 기록](./demo-log.md)의 ‘검토한 답만 저장한다’는 가상 선택을 보세요. ‘논문에 이렇게 적혀 있다’와 ‘그래서 우리는 이렇게 운영한다’를 구분합니다. [D1→D2 대체 기록](./demo-log.md#8-d1을-삭제하지-않고-d2로-대체한다)에서는 기존 이유를 보존하고 후속 결정을 연결합니다. 검토 시간과 유지 부담도 결과에 포함하세요.

## 6. ALCE 인용 평가 논문

[Tianyu Gao 외, Enabling Large Language Models to Generate Text with Citations](https://arxiv.org/abs/2305.14627v2) · 자료 ID S21. 최초 제출 2023-05-24, 여기서는 [v2 본문](https://arxiv.org/html/2305.14627v2)(2023-10-31)을 읽습니다.

**읽는 이유:** ‘문장이 맞는가’, ‘인용이 문장을 지원하는가’, ‘불필요한 인용은 없는가’를 구별하기 위해 읽습니다. 첫 읽기는 Figure 1, §3의 평가 축, §3.3 Citation Quality입니다. 논문은 citation recall로 진술들이 인용 근거에 의해 지원되는지를, citation precision으로 불필요한 인용을 살핍니다. 구체적인 자동 평가는 NLI 모델의 판단을 사용합니다. [§3.3 Citation Quality](https://arxiv.org/html/2305.14627v2#S3.SS3)

**지원하는 주장:** 링크를 달았다는 외형과 실제 문장 지원은 다른 평가 대상입니다. **지원하지 않는 확장:** 자동 함의 판단이 진실 판정의 최종 심판은 아닙니다. 논문의 당시 모델·데이터셋 결과를 지금 도구의 오류율로 읽거나, 우리의 카드 검토를 ‘ALCE를 실행했다’고 부르면 안 됩니다.

**읽은 뒤 할 일:** [실습](./workshop.md)에서 근거는 맞지만 문장이 지나치게 넓은 경우와, 문장은 지원되지만 무관한 링크를 더 붙인 경우를 나눠보세요. 사람의 읽기 활동에 평가 관점을 빌린 것입니다. 더 읽기는 §5.3 Retrieval Analysis와 §6 Human Evaluation입니다. 검색 문제·합성 문제·평가 모델의 한계를 어느 층에서 확인하는지 살펴봅니다.

## 공개 구현과 초기 연구

아래는 원저자의 설계 글을 실제 구현·실험과 대조하기 위한 일차 근거입니다. **관찰한 공개 구현**과 **논문 실험**을 구별하며 설치·실행 성공이나 조직 도입으로 소개하지 않습니다. 소유자가 설명하는 기능과 고정 코드의 실제 함수도 나눠 읽습니다.

### Microsoft 공개 구현: 등록·LLM 작성·질문 경로

[README](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/README.md)와 [ARCHITECTURE](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/ARCHITECTURE.md)를 확인했습니다. 고정 SHA는 `e09126f257c1fcf8e63234382748a51cf6a5df7f`, API commit 시각은2026-10-12T17:08:00Z입니다.2026-10-29 조회했습니다. GitHub microsoft organization의 공개 구현이며 Microsoft 전사 도입의 근거는 아닙니다.

| 실제 읽은 코드 | 확인한 경로 | 아직 보장하지 않는 것 |
| --- | --- | --- |
| [ingest.ts / ingestSource](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/core/src/ingest.ts#L81) | 앞500자 preview의 source 페이지와 index/log를 기계적으로 작성 | 이 단계의 의미 종합이나 모델 호출 |
| [llmIngest.ts](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/llmIngest.ts#L43) | 기계 등록 뒤 소스+기존 index를 Copilot 모델에 보내 summary/entities/concepts/crosslinks를 작성 | 모든 기존 본문 검토·모든 영향 자동 갱신. 모델이 없으면 기계 등록만 남을 수 있음 |
| [chatParticipant / handleQuery](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/chatParticipant.ts#L112) | index와 키워드 상위8쪽의 각 앞3000자를 현재 답변의 문맥에 넣음 | 저장된 모든 내용이 자동으로 읽히거나 빠짐없이 검색됨 |
| [handleSave](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/chatParticipant.ts#L237) | 해당 판에서는 수동 작성/ingest와 경로 안내만 출력 | README 설명처럼 이전 답을 자동 파일 저장했다는 주장 |

핵심 질문은 ‘어떤 입력이 어느 함수에서 모델 문맥에 들어가고 어떤 파일이 바뀌는가’입니다. 코드 경로의 존재는 문장 정확성이나 실행 품질의 검증이 아닙니다. 새 발표에서는 [21장 도구 역할](../slides.md#21)과 연결되는 별도 심화 근거로 제공합니다.

### 코드 저장소를 입력으로 쓰는 독립 변형

[dylannalex/llm-code-wiki의 고정 constitution](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/constitution.md#L31)과 [validator](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/scripts/validate.py#L291)를 읽었습니다. SHA `422fe1d3ff889295285b2f1a339cdbf789f43e5b`, API commit 시각2026-07-06T20:32:34Z, 조회2026-10-29입니다.

살아 있는 코드를 참조·해시하고 repo overview, 저장소 간 개념, 서비스 계약 등을 유지하는 설계입니다. 소스 해시·locator·frontmatter·index 참조를 검사하는 코드가 있습니다. 해시 차이는 변경 신호이며 설명의 의미 오류나 자동 수정의 인증이 아닙니다. 원형의 보존 raw와 이 변형의 ‘코드 판/해시를 식별하고 파생 설명을 유지’하는 방식을 구별하세요. 규칙 문서의 승인 절차를 모든 LLM Wiki의 필수로 확대하지 않습니다. 이번 자료의 별도 공개 코드 읽기입니다.

### 강의 코퍼스 QA 논문의 조건과 한계

Brian Wright, [Potential for Enhanced Learning in Machine Learning Classes by Using Wiki LLM Indexing](https://arxiv.org/html/2609.25303v1), arXiv:2609.25303v1, 제출2026-09-21T18:53:37Z.2026-10-29 본문 §3·Table1~2·§5.4·§6을 확인했습니다.

강의 텍스트 부분집합의12페이지(개념7+안내5), RAG21벡터,59문항(단일페이지45/교차페이지14)을 평가했습니다. RAG는1500토큰 chunk/100 overlap·all-mpnet-base-v2·top5입니다. 같은 답변자·프롬프트·질문을 사용한다고 보고하지만 **wiki arm은59문항 모두 동일한 고정 section 집합과 각 질문의 목표 자료를 제공받아 문맥 선택 실패 단계가 없습니다.** RAG는21벡터에서5개를 검색합니다. §3의 탐색 설계와 §6의 실제 문맥 제공을 구별해야 하며 표현만의 공정 비교나 위키 탐색 성공 실험으로 읽지 않습니다.

질문당 각 arm 답변1회, 한 LLM judge가10점 품질·이진 groundedness를 평가했습니다. Table2의 교차페이지14문항 결과는 RAG8.14/64%, Wiki9.93/100%입니다. 단일 코퍼스·기저선 재조정 여지·문맥 제공 비대칭·한 judge·천장효과가 있어 전체 wiki/RAG의 우열로 일반화하지 않습니다. 비용은 설계에서 언급하지만 §5.4에서 미측정이라고 밝힙니다. 학생 학습성과를 측정한 실험이 아니며 교육과정 개정 대응의 별도 실측 결과도 본문에서 확인되지 않았습니다. 초록의 single-fact와 본문의 topic-page를 같은 분류로 취급하지 않습니다.

새 48장 본편에서는 이 연구를 성능 경쟁 차트로 사용하지 않고 별도 읽기 자료로 제공합니다. [가상 강의 메모](../assets/examples/course.txt)는 논문의 실제 wiki 출력이 아닌 별도 구성 예입니다.

### 네 종류의 사례를 읽는 기준

원저자가 열거한 연구·독서·개인·팀은 **제안 용도**, 위 두 저장소는 **코드/설계 관찰**, Wright는 **제한된 QA 실험**, [새 세 영상 스터디 예제](../assets/expanded-study.txt)는 **우리가 만든 파일 설계**입니다. 공개 원문이 존재한다는 사실이 우리의 가상 학습·고객 응대·모델 실행이나 효과를 입증하지 않습니다.

## 용어를 역할로 구분하기

아래 구분은 이 학습 자료에서 쓰는 설명용 약속입니다. 여러 표준이 함께 정한 단일 데이터 형식이 아닙니다.

| 용어 | 이 자료에서의 뜻 | 섞기 쉬운 것 |
| --- | --- | --- |
| raw · 원자료 | 읽은 논문·설명·공지와 그 판을 보존하거나 다시 찾을 수 있게 기록한 것 | AI가 쓴 요약을 원문으로 취급하기 |
| source · 자료 카드 | 저자·제목·판·URL·확인일 등 자료를 다시 찾는 정보 | 그 자료가 모든 주장을 지원한다는 판정 |
| claim · 주장 | 지원 여부를 확인할 수 있도록 하나로 쪼갠 문장 | 두 논문의 내용을 합친 해석을 직접 진술로 표시하기 |
| evidence · 근거 | 그 주장을 지원한다고 제시한 실제 문장·표·절과 위치 | 문서 첫 화면 URL만 제시하기 |
| inference · 해석 | 하나 이상의 근거에서 우리가 이끌어 낸 설명·추론 | 저자가 실험으로 확인한 결과처럼 말하기 |
| decision · 결정 | 배경과 근거를 보고 사람이 채택한 행동 | 자료에서 읽은 사실 자체 |
| schema · 작업 규칙 | 파일 구조·검토·변경 방법을 적은 약속 | AI가 반드시 지킨다는 보장 |
| index · 목차 | 필요한 페이지를 찾는 입구 | 시간순 변경 이력 |
| log · 변경 이력 | 언제 무엇을 왜 바꿨는지의 기록 | 지금 유효한 설명 전체 |
| diff · 차이 | 이전 파일과 제안된 파일 사이에서 추가·삭제·수정된 부분 | 의미 검토까지 완료했다는 증거 |
| graph · 연결 보기 | 페이지 링크의 관계를 그린 표현 | 연결이 많을수록 내용이 정확하다는 점수 |
| stale · 낡은 상태 | 현재 적용 여부를 다시 확인해야 하는 상태 | 작성일이 오래됐으므로 거짓이라는 판단 |
| conflict · 충돌 | 같은 대상·조건에서 함께 받아들이기 어려운 진술 | 대상이나 실험 조건이 다른 결과 |
| superseded · 대체됨 | 후속 결정이 현행이 되고 이전 이유는 이력으로 남은 상태 | 원문과 이전 결정의 무조건 삭제 |

검색·학습 관련 용어는 [RAG 원논문](https://arxiv.org/html/2005.11401v4), [LoRA 원논문](https://arxiv.org/html/2106.09685v2), 인용 평가 용어는 [ALCE §3.3](https://arxiv.org/html/2305.14627v2#S3.SS3)을 기준으로 다시 확인하세요. ‘근거가 지원한다’는 판정은 자료의 대상·시점·조건이 해당 문장과 맞는지 함께 봐야 합니다.

## 더 읽고 싶을 때 고르는 경로

주제 수를 늘리기 전에 위 6개 원문의 읽지 않은 부분을 골라 읽는 편을 권합니다. 검색을 구현하려면 RAG의 retriever·generator·training을, 학습을 구현하려면 LoRA의 방법·하이퍼파라미터·평가를, 검증을 설계하려면 ALCE의 자동 평가와 사람 평가를 이어 읽으세요. 이 세 갈래는 서로 다른 질문에 답합니다.

위키가 커졌을 때의 선택은 페이지 수 하나로 결정하기 어렵습니다. 다음 표는 **실무 설계 제안**이며 이 자료에서 측정한 성능 결과가 아닙니다.

| 관찰한 문제 | 먼저 확인할 것 | 추가 운영 부담 |
| --- | --- | --- |
| 목차에서 필요한 페이지를 못 찾음 | 제목·분류·별칭·링크가 질문을 반영하는지 | 분류와 연결 유지 |
| 원문을 매번 너무 많이 읽음 | 파일 검색으로 후보를 좁힐 수 있는지 | 검색 누락·인덱스 최신성 평가 |
| 요약만 보고 범위를 잘못 넓힘 | 주장에서 원문의 근거 위치로 돌아갈 수 있는지 | 원문 대조와 검토 시간 |
| 같은 설명이 여러 페이지에서 어긋남 | 기준 개념 페이지와 영향 페이지가 드러나는지 | 변경 전파와 충돌 검토 |
| 오래된 답이 현행처럼 사용됨 | 적용 시점·판·재검토 조건이 남아 있는지 | 정기 점검과 담당 배정 |

목차 탐색·텍스트 검색·의미 검색·구조화된 검색은 필요에 따라 함께 쓸 수 있습니다. 새로운 검색 장치를 붙여도 원자료 보존과 주장 범위 검토의 책임이 사라지지는 않습니다. 도입 효과를 말하려면 실제 질문 집합을 정해 정답 지원, 누락, 수정 시간, 운영 비용을 관찰해야 합니다.

[자료 목차](./index.md) · [스터디 가이드](./study-guide.md) · [실습과 해설](./workshop.md) · [발표 대본](./speaker-script.md) · [고정 교정의 실제 diff](./demo-log.md#4-실제-diff에서-달라진-문장)


## 7. 연관되는 역사적 읽기

[Vannevar Bush, As We May Think, The Atlantic, 1945년7월, §6](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/)은 분류 색인과 연상 경로에서 개인 지식 장치 Memex를 구상한 글입니다. 현대 LLM이나 위키의 성능을 증명하는 원문은 아닙니다. 이전 발표의 짧은 인용 출처로 보존하며, 현재 48장에는 Karpathy/Bush의 영문 직접 인용을 사용하지 않습니다. 원문 전문·댓글·역사 사진은 복제하지 않습니다.

## 8. 사진·자체 도식 출처

이 주제에 보관한 사진 자산의 작가와 원본입니다.

| 로컬 파일 | 작가·원본 | 사진의 내용 |
| --- | --- | --- |
| `photos/open-books.jpg` | [Ron Lach, Open Books Lying on Desk](https://www.pexels.com/photo/open-books-lying-on-desk-9871139/) | 창가에 펼친 책과 공책 |
| `photos/study-table.jpg` | [cottonbro studio, Books and Books on Brown Wooden Table](https://www.pexels.com/photo/books-and-books-on-brown-wooden-table-4769464/) | 책과 공책이 있는 공부 책상 |
| `photos/library.jpg` | [Ayşe İpek, Books in the Library](https://www.pexels.com/photo/books-in-the-library-13278839/) | 책이 꽂힌 서가 |
| `photos/writing.jpg` | [LinkedIn Sales Navigator, Woman Sitting on Gray Chair While Writing on Table](https://www.pexels.com/photo/woman-sitting-on-gray-chair-while-writing-on-table-1251832/) | 노트에 글을 쓰는 인물 |

사진은 [Pexels License](https://www.pexels.com/license/)에 따라 사용합니다(2026-10-29 확인). 무료 사용·수정·웹/발표 사용이 가능하며, 원본 사진 자체 판매·이미지 서비스 재배포·인물의 추천을 암시하는 사용은 제한됩니다.

도식은 발표팀이 자체 작성했습니다. 기존 원자료/위키/규칙 도식과 새 영향8쪽·Q2재사용·현행/보류·결정대체 도식은 외부 그림을 복제하지 않았습니다. 상세 실제 문장은 [데모 기록](./demo-log.md)의 표와 문단에서 읽을 수 있습니다. 도식 원본은 [파일 관계](../assets/impact-map.svg), [Q2의 입력](../assets/reuse-inputs.svg), [현행·보류](../assets/current-pending.svg), [D1→D2](../assets/decision-transition.svg)에 있습니다. 기존 교정 예제는 반영한 8쪽(기존 5쪽 갱신+신규 3쪽), 검사한 25링크, 해시를 보존한 10파일을 서로 다른 단위로 나누어 읽습니다. 비율·성과 점수로 비교하지 않습니다. 보존한 과거 도식과 새 스터디 문서 도식도 구별해 읽으세요.

[48장·본편 35분 대본](./speaker-script.md) · [자료 목차](./index.md) · [데모 ZIP](../demo/llm-wiki-demo.zip) · [실제 파일 읽기](./demo-log.md)
