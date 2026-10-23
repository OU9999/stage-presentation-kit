# 미국·유럽 DevDay: 직접 검증과 디자인 인계

담당 `/root/research_manager/west_research` · 확인 기준 2026-10-23, Asia/Seoul. 제품 코드·Markdown 예제·자산과 공통 작업 로그는 수정하지 않았다.

## 이번에 추가로 확인한 것

- SF 공식 2026 키노트 **20:00 성능/비용 차트**, **25:00 주장+2×2 결과 UI**를 실제 영상 재생 후 정지·캡처하고 보존 프레임과 대조했다.
- 기존 파일명이 `24m00`인 문서 인용 프레임은 **실제 24:00 영상과 일치하지 않았다.** 이번 24:00.786에는 빈 검정 화면과 발표자가, 별도 24:03.380 확인에는 중앙의 작은 다색 점 비주얼이 보였다. 기존 보존 이미지의 시각 관찰과 현재 영상의 정확한 타임코드를 분리한다. 문서 인용 장의 정확한 시점은 **UNVERIFIED**다.
- 유럽 2026 Berlin·Paris·London은 확인일보다 이후 일정이다. 현장 디자인을 확인한 것처럼 인용하지 않는다.
- 과거 유럽 사례로 공식 2024 Sana AI 세션 10:00을 실제 확인했다. 밝은 크림색 기술 설명 장이다. 이 영상의 London 귀속은 발표자 자신의 원문이 뒷받침하지만, 공식 설명란의 발표자 이름과 충돌이 있으므로 아래와 같이 한계를 남긴다. 2026 본무대의 일반 스타일로 확대하지 않는다.

## 출처·행사일·게시일·확인 범위

| 출처 | 행사일·게시일 | credit·직접 확인 | 한계 |
| --- | --- | --- | --- |
| [2026 공식 행사](https://devday.openai.com/) | 행사 2026-09-29, SF Fort Mason. 페이지 게시일 미표시 | OpenAI 행사 원문에서 날짜·도시·장소 확인. 전반 담당의 별도 원문 검증도 대조 | 웹사이트 스타일을 발표 장면 근거로 사용하지 않음 |
| [2026 공식 키노트](https://www.youtube.com/watch?v=Fls_onRviPM) | 행사 2026-09-29. 영상 게시 `2026-09-29T11:42:29-07:00` | OpenAI 공식 인증 채널, 채널 ID `UCXZCJLdBC09xxGZ6gcdrc6A`. 이번 방문의 player metadata 보존. 영상 프레임 credit: OpenAI / YouTube | 전편 시청하지 않음. 폰트·정확한 HEX·제작자·제작 도구 미확인 |
| [DevDay Exchange 2026 공식 일정](https://events.openai.com/devdayexchange2026/-1?lang=en) | Berlin 2026-10-26, Paris 10-28, London 11-03. 페이지 게시일 미표시 | 원문 HTML을 현재 HTTP로 받아 텍스트를 추출해 날짜 대조. [보존 HTML](evidence/west/exchange-2026-source.html), [텍스트](evidence/west/exchange-2026-text.txt) | 10/23 기준 미래. 완료 현장 사진·발표 화면으로 사용할 근거 없음. web open은 timeout이었으며 검색 결과 및 별도 HTTP 원문 확인과 구분 |
| [2024 공식 Sana AI 세션](https://www.youtube.com/watch?v=RndBNbHuV4s&t=600s) | 영상 게시 `2024-12-17T09:00:35-08:00`. London 2024-10-30 귀속은 아래 발표자 원문에 근거 | OpenAI 공식 인증 채널과 위와 같은 채널 ID 확인. 10:00.000→10:00.789 재생, pause, 영상 영역 캡처. 프레임 credit: OpenAI / YouTube; 화면은 Sana AI 기술 발표 콘텐츠 | 영상 자체 제목·설명에는 도시·행사 날짜가 없음. 슬라이드 디자인 제작자 미확인. 게스트 세션을 OpenAI의 통일된 디자인 규정으로 해석하지 않음 |
| [Daniel Sosebee 발표자 글](https://www.linkedin.com/posts/danielsosebee_excited-to-share-this-clip-from-my-talk-at-activity-7286438020113735681-9Rph) · [개인 회고](https://blog.danielsosebee.com/p/my-end-of-2024-update) | LinkedIn 본문은 상대 날짜만 확인. 자기 댓글에 발표일 2024-10-30 명시. 개인 회고 게시 2025-01-03 | 본인이 London에서 발표했다고 쓰고, 자기 댓글이 위 `RndBNbHuV4s` URL과 발표 제목을 연결. 개인 회고도 같은 제목과 London 발표를 명시 | 공식 영상 설명은 `Gerald Parloiu, AI Lead and Viktor Qvarfordt, Head of Engineering, Sana AI`라고 기재. 자기 원문·당시 일정 게시물은 Gery/Gerald Parloiu와 Daniel Sosebee를 연결한다. 이 이름 충돌을 임의 해결하지 않음 |

유럽 검색 범위: 공식 OpenAI 사이트의 DevDay/London/2024·2025 검색, 공식 YouTube DevDay London 2024 검색, 2026 Exchange 공식 일정, 발표자 자신의 원문까지 확인했다. [2024 공식 London AMA 영상](https://www.youtube.com/watch?v=Hn27upT2m_o)은 검색 결과의 공식 설명에 London 녹화가 명시되지만 이번에는 실제 재생·이미지 확인을 하지 않아 시각 근거로 쓰지 않았다. 다른 유럽 도시의 과거 발표 화면 전체를 검증했다는 뜻이 아니다.

## 미국 대표 장면 — 관찰·해석·제안

### 20:00 — 한 비교를 크게 보여 주는 차트

[원본 링크](https://www.youtube.com/watch?v=Fls_onRviPM&t=1200s) · [이번 캡처](evidence/west/sf-keynote-20m00-live.png) · [측정·metadata](evidence/west/sf-keynote-20m00-live.json). 재생 확인은 1200.000→1200.780500초다.

| 구분 | 내용 |
| --- | --- |
| 관찰 | 왼쪽에 큰 모델명, 오른쪽에 단일 DeepSWE 차트가 있다. 세 모델 선은 색으로 구분되며 선 가까이 모델명이 직접 붙는다. 세로 Score(%), 가로 Cost per task($), 축 눈금이 보인다. 차트 면은 주변 우주 비주얼보다 어둡고 약한 둥근 경계로 묶인다. |
| 해석 | 색은 비교 대상의 식별과 연결되고, 큰 제목과 차트가 서로 다른 읽기 역할을 맡는다. 다수의 작은 대시보드 카드로 나누지 않아 한 질문이 남는다. |
| 제안 | 실제 수치 증거는 #4의 작은 UI 속 그래프로만 처리하지 말고 전용 차트 장에서 크게 보여 준다. 모델/범주 색과 프레임 색의 역할을 분리한다. 발표 거리에서 축·단위·직접 라벨이 읽혀야 한다. |

### 25:00 — 짧은 주장과 동작하는 결과 네 개

[원본 링크](https://www.youtube.com/watch?v=Fls_onRviPM&t=1500s) · [이번 캡처](evidence/west/sf-keynote-25m00-live.png) · [측정](evidence/west/sf-keynote-25m00-live.json). 재생 확인은 1500.000→1500.780926초다.

| 구분 | 내용 |
| --- | --- |
| 관찰 | 왼쪽에 두 줄의 짧은 주장, 오른쪽에 같은 외곽 비율을 가진 2×2 결과가 있다. 문서·3D 도시·분석 UI·세금 양식의 원래 밝기와 색이 유지된다. 새 캡처에서 문서 스크롤 위치·3D 장면이 보존 프레임과 조금 다르다. |
| 해석 | 이 네 화면은 사진 갤러리보다 하나의 computer-use 주장을 받치는 서로 다른 작업 결과다. 정렬된 동일 크기 화면도 내용의 역할이 명확하면 작동한다. 짧은 구간과 다른 프레임의 내용 차이는 확인했지만 네 화면 각각의 실시간 데모 방식은 검증하지 않았다. |
| 제안 | 사진 배치를 고치기 전에 각 미디어가 어떤 주장의 증거인지 이름 붙인다. 여러 결과가 동등한 증거라면 2×2도 유효하다. #4의 혼합 요약장과 별도 양식으로 유지한다. 밝은 UI 자체 면이 경계를 만들 때 공용 외곽선을 추가하는 효과를 별도로 비교한다. |

### 24:00 — 정확한 타임코드에 대한 교정

기존 [보존 문서 인용 이미지](../../evidence/color-devday/keynote-24m00.png)는 이번에 직접 열어 보았지만, 새 [24:00.786 캡처](evidence/west/sf-keynote-24m00-live.png)에는 그 화면이 없었다. [별도 24:03.380 캡처](evidence/west/sf-keynote-24m02-live.png)에는 작은 다색 점 비주얼이 있다. 후자 파일명은 seek 시작 24:02를 뜻하며 실제 정지 시간은 [JSON](evidence/west/sf-keynote-24m02-live.json)에 기록했다.

두 장면을 연속 촬영해 전환을 검증한 것은 아니다. 각각의 짧은 재생·정지 범위만 확인했다. 기존 문서 장을 실제 영상 24:00에 있다고 보고하거나, 이 자료로 전환 지속시간·easing을 추정하지 않는다. [24:00 측정](evidence/west/sf-keynote-24m00-live.json)도 보존한다.

## 유럽 과거 사례가 알려 주는 범위

[Sana AI 10:00](https://www.youtube.com/watch?v=RndBNbHuV4s&t=600s) · [직접 확인한 캡처](evidence/west/london-sana-10m00-live.png) · [metadata·정지 상태](evidence/west/london-sana-10m00-live.json).

- **관찰:** 바깥 검정 영상 프레임에 세로 OpenAI/DevDay 표기가 있고, 내부 슬라이드는 밝은 크림색이다. 왼쪽 큰 제목의 `Solution:`은 파란색, 나머지 제목은 검정이다. 오른쪽 큰 도구 설명 영역에 Name·사용 지침·세 개의 도구 pill이 있고, 보조 라벨은 약하게 표시한다.
- **해석:** 모든 연도·게스트의 DevDay 슬라이드가 검정이라는 일반화는 성립하지 않는다. 이 화면의 역할은 엔터프라이즈 에이전트 설계의 도구 묶음을 설명하는 것이다. 2026 SF 본무대나 아시아 성과 요약과 목적·시기가 다르다.
- **제안:** 지금 #4의 기본 무대는 2026에 직접 확인한 어두운 장면을 중심으로 검토한다. 과거 게스트의 밝은 바탕은 내용별 디자인 선택이 존재한다는 범위 제한의 근거로 둔다. 밝은 전면 배경을 프로젝트 기본 스타일로 확대할 근거로 사용하지 않는다.

## 현재 제품과 제안의 구분·디자인 brief

**current**는 [baseline](../baseline.md)과 [current-slide-4.png](../current-slide-4.png)에 기록된 현제품 `examples/devday-compositions/index.html#4`다. 향후 `../design/proposal.html`은 독립적으로 만든 검토 시안이며 **OpenAI 원본도, 제품에 적용 완료한 구현도 아니다.** 이번 담당자는 그 시안을 작성하거나 검증하지 않았다.

1. **P0 — 먼저 장의 목적을 정한다.** 2026 SF 47:50의 제품 회수, 아시아의 성과·제품 혼합 요약, SF25:00의 동등한 결과 증거를 같은 프리셋의 복제로 취급하지 않는다. #4는 무엇을 회수하는지 한 문장으로 정의한다.
2. **P0 — 내용과 프레임을 분리한다.** 현재 모든 footprint의 같은 border가, 밝은 UI의 자체 면·asset 내부 프레임·contain 띠와 겹친다. 같은 콘텐츠를 유지한 비교안으로 바깥선의 필요성과 대비를 확인한다. 차트의 범주색을 border 장식으로 확장하지 않는다.
3. **P1 — 주장별로 읽힐 크기를 확보한다.** 큰 수치/모델명, 직접 라벨이 있는 큰 차트, 짧은 주장+결과, 코드/도구 설명을 각 역할에 맞게 구성한다. 코드 폰트·행 강조·정확한 전환 값은 이번 live 검증 밖이다.

## 검증 범위와 인계 상태

- 직접 열린 기존 이미지: SF20:00, 24:00, 25:00 보존 프레임 3장. 새 캡처 5장도 각각 `view_image`로 확인했다.
- 실제 재생 시간은 각 JSON에 기록한 짧은 구간뿐이다. 전편·전체 시퀀스·현장 참석·정확한 색 토큰·디자인 제작 소속은 주장하지 않는다.
- 원본 연구 프레임과 HTML은 이 evidence 폴더에만 두며 자유 사용 예제 asset으로 옮기지 않았다.
- 브라우저는 공용 Space **5**, 담당 tab **p3**만 사용했다. 최종 영상은 SF2026 키노트 `Fls_onRviPM`, **1443.380122초(24:03.380), paused=true**다. 사용자 Space4, 총괄 p1, 전반 담당 p2는 조작하지 않았다. TaskSpace 종료는 총괄 소유다.
- 제품 코드 변경이 없어 제품 자동 테스트·모바일·PDF 검증을 실행하지 않았다. 남은 일은 디자인 팀의 비교 시안과 총괄의 통합 검토다.
