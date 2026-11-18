# main-08 읽기 최종 판정 및 두 채널 취합 — B

검토자 `/root/devday_recheck_sol62/b_reading`, GPT-6.2 Sol high. 읽기 DPR1 1440×1000과 390×844에서 각각 11장을 직접 읽었다. 읽기 합계는 `approved` 19건과 `needs-changes` 3건이다. 1440은 03, 390은 03·04에 교정이 필요하다. 독립 초기와 교차 후 판정의 상태는 동일하다. 현재 기록은 교정 대상과 보존할 근거를 인계하며, 시각 승인 산출물은 총괄이 현재 입력에서 별도 확인한다. [B 초기 원문](B.initial.md)

동결 원고는 `a44cb9d1a06a868aa316a4374906c5091adce561782ab070e7761c0af371e834`, 기준 DESIGN은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다. 105개 현재 입력 동결본은 SHA256 `50076755daf8122e769e27418b2884488351680d60fe45eab1121a32b33d8c74`다. 읽기 manifest SHA256은 1440 `47c80d8f647f80afd3880c106bc917cd4c0e6d6ca7357fa5e492802cc362577a`, 390 `044671d019891baf473df6c43be9bf798101af8b4ae77ee09134e4c60d0b43e6`다. [입력 동결본](../../main-08/source-snapshot.json) · [1440 manifest](../../main-08/read-1440/manifest.json) · [390 manifest](../../main-08/read-390/manifest.json)

## 직접 교차 협의

- 두 초기 원문을 각각 저장해 동결한 뒤 Stage 담당 A와 직접 메시지를 교환했다. A는 Read 3·4의 실제 PNG·타일과 390 관계도를 추가로 열었고, B는 Stage 3·4·5·7·9·10의 1280 PNG를 직접 열어 수정 영향과 보존 조건을 대조했다. 기존 Stage의 자료 역할과 390에서 독립적으로 읽는 조건을 함께 논의했다. [A 초기](A.initial.md) · [B 초기](B.initial.md)
- 03 Stage의 왼쪽 기사와 밝은 세 줄 인용의 겹침은 출처 지면과 읽을 구절의 위계를 만든다. 낭독 맥락에서 사례 지위 설명이 있으므로 현 Stage는 그 위계를 보존한다. Read는 발췌 곁 기존 링크에 ‘가상 사례 기사와 예제 팩 원문’을 한 행으로 보여 주고, 자료 자체의 표면과 두 원문으로 이어지는 상세 절을 보존하는 국소 교정에 합의했다. [Stage 1280](../../main-08/present-1280/slide-03.png) · [Read 1440](../../main-08/read-1440/slide-03.png) · [Read 390](../../main-08/read-390/slide-03.png)
- 04 Stage와 Read 1440의 네 자료는 각각 일정표·지도·Markdown·안내 형태로 먼저 구별된다. Read 390은 314px 네 면과 순서를 유지하며 하나의 전문 링크가 제목 뒤·첫 타일 전에 보이게 한다. 좁은 화면의 실제 DOM·탭 이동도 제목부터 상세 링크, 네 자료 순과 일치하고 1440에서는 상세가 네 면에 계속 귀속되어야 한다. [Stage 1280](../../main-08/present-1280/slide-04.png) · [Read 1440](../../main-08/read-1440/slide-04.png) · [390 첫 화면](../../main-08/read-390/tiles/slide-04-01.png) · [390 다음 화면](../../main-08/read-390/tiles/slide-04-02.png)
- 07 Stage의 오른쪽 두 문서 사이 연결점이 대략 세로인 채 서로 어긋나 시선이 이름과 연결 사이에서 멈춘다. 두 연결점을 한 세로축으로 잡고 작은 요약의 윤곽을 조정하되, 연결의 최소 밝기·굵기와 현재 계획 우선, 세 무방향 관계를 지킨다. 390의 318px 그림에서 세 선과 글자 세 개를 식별하는 현재 성질을 재확인한다. [Stage 1280](../../main-08/present-1280/slide-07.png) · [Read 390](../../main-08/read-390/slide-07.png)

## 다음 제작 인계

| 영향 범위 | 교정과 보존 |
| --- | --- |
| Stage 05 양폭 | 검정 중앙축과 정의를 유지하며 이름의 실제 크기와 획을 키우고 이름·정의 사이의 빈 간격을 줄인다. Read에서는 제목·정의·추가 탐색의 현재 왼쪽 흐름을 유지한다. |
| Stage 07 양폭, Read 영향 확인 | 오른쪽 위·아래 노드의 공통 연결축과 요약 윤곽을 교정한다. 공유 SVG를 바꾸면 318px 모바일에서 세 이름과 세 선을 다시 본다. |
| Stage 09 양폭 | 제목과 세 행동의 큰 검정 틈을 좁혀 하나의 안내로 읽히게 한다. 열린 세 열, 첫 주황 행동, 각 한 줄과 Read 세로 순서를 유지한다. |
| Stage 10 양폭 | 작은 ‘첫 요청’ 표제를 발화 쪽으로 가까이 두고 공통 왼쪽 시작점을 유지한다. 인용의 세 의미행과 마지막 주황 행, 읽기의 복사용 전문 링크를 유지한다. |
| Read 03 양폭 | 가상 사례 기사와 예제 팩 원문을 구별하는 기존 탐색 링크 한 줄을 발췌 곁에 둔다. 새 판에서 기사 지위·전문 도착과 인용 세 의미행을 확인한다. |
| Read 04 390 | 제목과 첫 자료 사이에서 전체 자료로 이동할 수 있게 한다. 키보드 순서·첫 실제 화면·전문 도착을 함께 보고 원비율과 네 표면·순서를 보존한다. |

05·09·10은 Stage 모드의 간격 교정으로 한정하는 데 동의했다. 03·04에 읽기 의존 교정을 두는 것과 07이 공유 자산인 점을 제작에 함께 인계한다. 독립 Stage 판정 8개와 읽기 판정 3개를 합하면 44범위 중 개선 필요 11개다. 실제 구현 후 영향 범위를 새 입력으로 다시 판정한다. 정지 화면 판정이라 현장 발표 거리·다른 OS·모션과 상세 링크 실제 클릭은 이 직접 검토 범위 밖이다. [Stage 05](../../main-08/present-1280/slide-05.png) · [Stage 09](../../main-08/present-1280/slide-09.png) · [Stage 10](../../main-08/present-1280/slide-10.png)

## 장·범위별 판정 데이터

```json
{
  "reviews": [
    {
      "slide": 1,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "왼쪽 48px 두 행에서 흰 전제와 굵은 주황 결론이 한 주장이다. 하단 밑줄 탐색은 충분히 떨어지고, 오른쪽 여백이 짧은 선언의 호흡을 보존한다. 어절 온전. 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-01.png"
      ]
    },
    {
      "slide": 2,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "같은 너비 두 창과 두 18px 캡션이 같은 기준선에 있다. 왼쪽 파란 답 하나와 오른쪽 여러 연결 면이 장의 전부를 설명하고, 캡션과 하단 공통 비교 링크의 거리·정렬이 각각의 소속을 구분한다. 회색 막대는 개념 작업창의 표현이다. 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-02.png"
      ]
    },
    {
      "slide": 3,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "needs-changes",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "좌측 파란 선과 34px 세 행에서 발췌가 먼저 읽히고, 우측 기사 제목은 독립해서 보인다. ‘원문과 기사 전문’은 가상 사례를 편집한 기사와 예제 팩의 정확 원문을 구별하지 못한다. 기존 18px 링크에서 두 텍스트의 지위를 밝히고 세 의미행, 기사 제목과 표면, 상세 전문에 이르는 경로를 보존한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-03.png"
      ],
      "owner": "LLM Wiki 제작 담당",
      "nextAction": "Read 기존 전문 링크를 ‘가상 사례 기사와 예제 팩 원문’처럼 구체화한다. 현재 기사·팩 경로와 34px 인용 세 의미행을 보존하고 1440 실물을 다시 캡처한다."
    },
    {
      "slide": 4,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "왼쪽 두 행의 주장과 오른쪽 네 표면이 다른 역할을 맡는다. 네 면의 제목과 일정표·지도·파일·안내 구조가 순서대로 보이고, 자료 전문 링크는 2×2 바로 아래 첫 열 기준선에서 묶인다. 작은 표의 한 칸까지 읽는 용도는 상세 자료가 맡는다. 네 면의 비율과 넓은 거터 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-04.png"
      ]
    },
    {
      "slide": 5,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "큰 이름, 바로 아래 한 줄 18px 정의, 이후 밑줄 지원 링크가 위에서 순서대로 읽힌다. 정의와 링크가 같은 크기라도 밑줄·문단 간격·앞 문장과의 거리로 분리된다. 4장 뒤 쉼을 주는 세로 길이와 한 줄 정의 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-05.png"
      ]
    },
    {
      "slide": 6,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "큰 ‘스터디 준비 기록’ 아래 주황 사람·파랑 AI, 각각 가까운 한 줄 18px 서술이 행동 주체를 구분한다. 마지막 링크는 밑줄과 추가 간격으로 두 기록 뒤 함께 읽힌다. 공통 기준선과 두 그룹 소속 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-06.png"
      ]
    },
    {
      "slide": 7,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "상단 큰 한 줄 주장 이후 오른쪽 두 문서, 왼쪽 작은 자료 요약, 가는 연결 세 개가 하나의 도식으로 읽힌다. 오른쪽 수직에 가까운 선도 각 박스에 닿고 제목과 선이 겹치지 않는다. 현재 계획의 조금 더 큰 무게와 화살표 없는 선, 하단 상세 링크 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-07.png"
      ]
    },
    {
      "slide": 8,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "48px 제목이 한 계획의 변화를 말하고 첫 상태와 갱신행의 세로 정렬이 같은 축을 만든다. 주황이 갱신된 입문자·15분 조건에 멈추고 실제 할 일은 한 행에서 이어 읽힌다. 하단의 전후 원문과 새 조건 링크가 별도이다. 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-08.png"
      ]
    },
    {
      "slide": 9,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "제목에서 자료 두 개가 먼저 읽히고 주황 ‘고르기’로 들어가 세 행동과 각각의 18px 설명을 순서대로 본다. 짧은 설명과 링크에 모두 동사가 있지만 밑줄과 간격으로 자료 탐색을 구별한다. 번호·박스 없이 현재 입력 순서와 첫 단계 강조를 보존한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-09.png"
      ]
    },
    {
      "slide": 10,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "48px 이름표, 주황 인용선의 24px 세 행, 별도 복사용 전문 링크 순이다. 마지막 행이 굵지만 첫 두 행도 선명해 행동 전체가 묶인다. 세 의미행과 후속 요청 경로 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-10.png"
      ]
    },
    {
      "slide": 11,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 1440,
        "height": 1000,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "목적어와 질문부가 48px 두 행이 되어 청중에게 물음을 돌려준다. 아래 밑줄은 낮은 위계에서 자료 입구 역할을 한다. 10장 대비 강조색 없는 쉼과 큰 여백 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-1440/slide-11.png"
      ]
    },
    {
      "slide": 1,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "왼쪽 여백 24px에서 34px 두 행이 서고 아래 주황 문장이 온전히 남는다. 하단 정의 링크가 한 행이며, 상단 타이포와 크기·간격 차이가 분명하다. 모바일에서도 행을 추가하거나 축소할 이유가 없다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-01.png"
      ]
    },
    {
      "slide": 2,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "두 창이 상하 같은 폭으로 읽히고 각각 바로 아래 18px 캡션이 붙는다. 두 번째 창의 다색 면과 연결은 작은 실제 도형에서도 식별된다. 아래 캡션과 왼쪽 한 줄 비교 링크의 정렬이 다른 역할을 밝힌다. 한 열·두 캡션 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-02.png"
      ]
    },
    {
      "slide": 3,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "needs-changes",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "24px의 의도된 세 인용행, 바로 아래 한 행 링크, 같은 폭의 기사 제목과 본문이 순서대로 읽힌다. ‘원문과 기사 전문’은 가상 사례 기사와 예제 팩 원문의 관계를 보여 주지 않는다. 기존 318px 본문 폭에서 링크 한 행에 둘의 차이를 드러내고 인용행·자료면·전문 경로를 보존한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-03.png"
      ],
      "owner": "LLM Wiki 제작 담당",
      "nextAction": "Read 기존 전문 링크를 ‘가상 사례 기사와 예제 팩 원문’처럼 구체화한다. 318px 폭에서 18px 한 행, 24px 인용의 세 행, 기사와 전문 도착을 다시 확인한다."
    },
    {
      "slide": 4,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "needs-changes",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "34px 두 행 아래 네 결과물이 314px 폭의 한 열로 보이고 각 표면과 제목이 뚜렷하다. 일정표 셀과 안내 세부는 작으며 읽을 수 있는 전문으로 가는 유일한 링크는 네 번째 면 아래 다음 실제 화면에 있다. 첫 실제 화면에서 제목과 첫 결과물 사이로 기존 링크를 옮겨 전문을 선택할 수 있게 하고 네 면의 순서·비율·여백을 유지한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-04.png"
      ],
      "owner": "LLM Wiki 제작 담당",
      "nextAction": "390에서 제목 직후·첫 결과물 전에 기존 상세 링크 하나가 실제 문서와 키보드 탐색 순서에 나타나게 한다. 타일 첫 화면과 클릭 도착을 재확인하고 1440의 결과물 묶음 소속과 Stage의 네 면을 보존한다."
    },
    {
      "slide": 5,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "‘LLM Wiki’ 34px가 왼쪽 위, 한 줄 정의가 중간, 따로 밑줄이 아래다. 어절과 영문 이름이 끊기지 않고 공간이 4장의 자료 밀도와 대비된다. 현재 단순 구성을 유지한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-05.png"
      ]
    },
    {
      "slide": 6,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "주황 사람의 18px 한 줄을 먼저, 파랑 AI의 ‘개념과 비교를 계획에 / 연결하고 근거를 붙였다.’ 18px 두 줄을 이어 읽는다. AI의 둘째 줄에 서술 전체가 들어오며 마지막 밑줄 링크는 두 그룹을 다 읽고 만난다. 18px 본문과 명확한 소속 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-06.png"
      ]
    },
    {
      "slide": 7,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "34px 제목이 이어지는 두 절로 나뉜다. 그 아래 자료 요약과 오른쪽 두 문서의 이름, 세 무방향 관계를 따라갈 수 있다. 가장 약한 오른쪽 사선은 시각 대비 여유가 적으므로 다음 공유 그림 교정에서도 점과 선이 닿고 세 선을 읽을 수 있게 유지한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-07.png"
      ]
    },
    {
      "slide": 8,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "‘입문자가 오면 / 계획이 바뀝니다’ 두 행과 흰 처음·주황 갱신을 차례로 읽는다. 아래 두 설명은 18px 한 행씩이며 강조가 ‘입문자와 15분 동안’에만 묶이고 한 문장을 유지한다. 세로 읽기와 전문 링크 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-08.png"
      ]
    },
    {
      "slide": 9,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "제목이 34px 한 행에 들어가고 아래 세 행동을 같은 왼쪽부터 각자 한 줄로 읽는다. ‘고르기’의 주황과 아래 설명은 처음 행동을 선명히 한다. 제목 오른쪽 여유가 넓지는 않지만 글자와 획이 유효하고 앞뒤 행동 문맥이 서로 섞이지 않는다. 현 폭에서 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-09.png"
      ]
    },
    {
      "slide": 10,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "‘첫 요청’ 아래 주황 선 한 개와 23px 세 행의 간격이 발화 단위를 만든다. 마지막 주황 ‘근거와 모르는 점도 남겨 줘.’가 단독 결론으로 남고, 아래 한 행 밑줄은 이어서 복사할 전문으로 읽힌다. 세 행과 링크의 공간을 보존한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-10.png"
      ]
    },
    {
      "slide": 11,
      "mode": "read-slide-crop",
      "viewport": {
        "width": 390,
        "height": 844,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/b_reading",
      "reviewedAt": "2026-11-18T01:40:11Z",
      "reason": "34px ‘어떤 질문을 / 다시 묻고 싶나요?’ 두 행이 왼쪽 여백 안에서 자연스럽게 읽히고 한 줄 자료 링크가 아래 멈춘다. 행동을 요청하는 9·10장 뒤 여운이 성립한다. 두 의미행과 단일 링크 유지.",
      "evidence": [
        "research/devday-rebuild-20261117/main-08/read-390/slide-11.png"
      ]
    }
  ]
}
```
