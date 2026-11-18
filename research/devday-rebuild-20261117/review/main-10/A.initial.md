# Stage 독립 초기 검수 · main-10

검토자 `/root/devday_recheck_sol62/a_stage` · GPT‑6.2 Sol high · `2026-11-18T01:49:42Z`.

LLM Wiki 1–11장, `presentation-stage-only` 1920×1080 및 1280×720 DPR 1. 실제 PNG 크기는 각각 1557×876, 917×516이다. 1920은 main-09 각 장의 11개 PNG와 보드 두 개를 열고 현재 main-10 파일과 모두 바이트가 같은지 직접 확인했다. 1280은 main-10 각 장의 11개 PNG와 두 보드를 직접 열었다. 두 폭 모두 main-08과 바뀐 실물은 05·07·09·10이며 나머지 7장씩은 같은 바이트였다. [캡처 비교](../../main-10/preceding-pixel-comparison.json)

원고 `4d4ade76b7d83c0ac938bdb34f81425cb5db8b74d37d2f934790cd0fceb19c2e`, 기준 DESIGN `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`. 동결 원고·로컬 자산·공통 스타일·런타임 등의 스냅샷 SHA-256은 `713438a5dbf7dee852418b24cef9e7350aea7be672b3df5e33c97ebfadfa2fe2`이다. [동결 스냅샷](../../main-10/source-snapshot.json)

1920 manifest `f1a56dacb7385ad2795e65f5ecf21f1ed46d9b75587e8e95b4e72915584187fa`. 1280 manifest `4b5429744704a02e6a7f46423bc1c67dc1f20045a938b0ac056914e3d1634acb`. 두 발표 폭의 입력 목록은 동일하며 SHA-256은 `3f0111dcdd675da793edaa167d0dd3e719f5f1cc3290d5be65035628e2f8d795`이다. [1920 manifest](../../main-10/present-1920/manifest.json) · [1280 manifest](../../main-10/present-1280/manifest.json) · [두 폭 공통 입력 목록](../../main-10/present-1920/inputs.json)

DevDay 원본에서 직접 열어 본 선언·비교·인용·결과군·이름 공개·관계·선택 강조·다음 행동의 화면으로 대조했다. 실제 폰트와 색 값을 방송 프레임에서 추정하지 않았다. 이 범위는 로컬 정지 캡처이며 실제 공연장 투사·전환 모션·다른 OS는 확인하지 않았다. 변경 장의 글자 폭과 빈 y 구간은 실제 PNG에서 가장 밝은 RGB 채널이 115 이상인 픽셀을 기준으로 센 근삿값이다. [공식 DevDay 프레임](../../../devday-fidelity-20261116/evidence/README.md)

## 장별 시각 판정

| 장과 역할 | 원본 대조 | 현재 범위 | 판정과 이유 |
| --- | --- | --- | --- |
| **01 첫 선언** | Codex20:00 · Keynote20:30 | [1920×1080](../../main-10/present-1920/slide-01.png) | `approved` · 흰 ‘지식을 남기는 방식이’가 질문을 만들고 바로 아래 주황 ‘다음 질문을 바꾼다’가 선언을 완성한다. 아래 행을 짧게 끊은 폭과 중간의 검은 행간이 두 의미행을 한 시야에 묶는다. |
|  |  | [1280×720](../../main-10/present-1280/slide-01.png) | `approved` · ‘방식이’와 ‘바꾼다’까지 어절 단위로 온전하다. 가운데의 흰 행과 주황 행이 같은 크기로 쉽게 읽히고 위아래로 비운 면은 첫 문장을 기다리는 정지감을 만든다. |
| **02 두 작업창 비교** | Codex01:30 | [1920×1080](../../main-10/present-1920/slide-02.png) | `approved` · 왼쪽 파란 말풍선 하나와 오른쪽에 서로 이어진 여러 문서가 먼저 대비된다. 같은 폭의 작업창과 같은 기준선 아래에 ‘이번 답’과 ‘다시 쓸 지식’이 남아 어느 창을 가리키는지 바로 읽힌다. |
|  |  | [1280×720](../../main-10/present-1280/slide-02.png) | `approved` · 아래 캡션은 작지만 각각 한 줄의 밝은 글씨로 자기 창에 붙는다. 오른쪽의 서류 윤곽과 연결선·색이 가는 내부 막대보다 먼저 보이고, 왼쪽의 단순한 답 모양과 서로 다른 결과를 읽을 수 있다. |
| **03 기사의 확대 인용** | Keynote24:00 | [1920×1080](../../main-10/present-1920/slide-03.png) | `approved` · 밝은 오른쪽 인용면이 먼저 보이고 왼쪽 어두운 기사의 제목과 본문이 출처 표면으로 이어진다. 두 면은 얕게 겹치며 인용의 세 의미행과 기사의 제목·본문을 가리지 않는다. |
|  |  | [1280×720](../../main-10/present-1280/slide-03.png) | `approved` · 파란 인용부호 아래 ‘다음 질문에 쓸 근거를 / 연결된 문서에서 / 다시 찾고 싶다’가 각각 분명하다. 왼쪽은 제목을 읽고 기사 형태를 확인할 수 있으며 이 폭에서 작은 본문 전문은 읽기 자료가 맡는다. |
| **04 네 결과물 회수** | Keynote25:00 | [1920×1080](../../main-10/present-1920/slide-04.png) | `approved` · 왼쪽 문장이 짧은 두 행으로 물러나고 오른쪽에서 일정표·관계 지도·질문 파일·안내가 주역이 된다. 같은 가장자리와 간격으로 모으면서 다른 표면을 살려 네 개가 서로 다른 결과물로 읽힌다. |
|  |  | [1280×720](../../main-10/present-1280/slide-04.png) | `approved` · 2×2에 검은 띠나 눌린 칸 없이 표, 지도, 편집기, 안내 양식이 각각 구별된다. ‘함께 읽는 15분’과 ‘모임 준비 안내’ 같은 제목은 남고, 좌측 문장은 결과물 가장자리와 충분히 떨어진다. |
| **05 이름 공개** | Keynote21:00 · Keynote24:15 | [1920×1080](../../main-10/present-1920/slide-05.png) | `approved` · 중앙의 ‘LLM Wiki’가 넓고 또렷한 획으로 먼저 보인다. 이름이 약 547px, 정의가 약 408px 폭이고 실제 글자 사이 검은 틈이 약 69px에서 44px로 줄었다. 04의 네 면 뒤에 한 이름과 한 줄 정의가 같은 중심으로 남는다. |
|  |  | [1280×720](../../main-10/present-1280/slide-05.png) | `approved` · 이름은 약 323px 폭으로, 한 줄 정의는 약 240px 폭으로 중앙에 선다. 두 글줄 사이의 약 26px 간격은 이름과 정의의 층을 나누면서 바로 이어 읽히고 ‘LLM Wiki’의 영문 획이 전환을 지탱한다. |
| **06 사람과 AI의 준비 기록** | Keynote23:00 · Keynote24:00 | [1920×1080](../../main-10/present-1920/slide-06.png) | `approved` · ‘스터디 준비 기록’ 아래 사람의 선택과 AI의 연결을 가르는 두 행이 한 기록 면에 있다. 왼쪽의 주황·파랑 라벨과 오른쪽 본문의 공통 시작점이 두 작업의 소속을 분명히 가른다. |
|  |  | [1280×720](../../main-10/present-1280/slide-06.png) | `approved` · ‘목적과 맥락’을 골랐다는 사람 행과 AI가 근거를 붙인 행이 각각 한 줄로 읽힌다. 구분선이 바른 기준을 유지하고 패널의 약한 외곽보다 색 라벨과 밝은 역할 문장이 먼저 보인다. |
| **07 세 문서 사이의 연결** | Codex03:30 | [1920×1080](../../main-10/present-1920/slide-07.png) | `approved` · 왼쪽 ‘자료 요약’에서 두 문서로 뻗는 선과 오른쪽 상하의 세로선이 바로 추적된다. 오른쪽 두 테두리가 같은 좌우 끝에 서고 세로선은 공통 중심축을 곧게 잇는다. 왼쪽 얇은 윤곽이 물러나고 아래의 더 굵은 ‘현재 계획’이 결과로 남는다. |
|  |  | [1280×720](../../main-10/present-1280/slide-07.png) | `approved` · ‘자료 요약’에서 오른쪽 두 문서로 이어지는 두 대각선과 공통 세로축의 세 번째 선이 모두 구분된다. 색을 구별하지 않아도 세 관계를 따라갈 수 있고, 더 굵은 ‘현재 계획’과 캘린더 기호가 화면 아래에서 같은 역할을 가리킨다. |
| **08 계획의 전후 비교** | Keynote25:50 | [1920×1080](../../main-10/present-1920/slide-08.png) | `approved` · 같은 왼쪽 기준에서 처음의 회색 미정과 갱신의 밝은 행을 비교한다. 새 조건 ‘입문자와 15분 동안’에만 주황이 붙고 뒤의 실제 할 일이 같은 한 행에 붙어 읽힌다. |
|  |  | [1280×720](../../main-10/present-1280/slide-08.png) | `approved` · ‘처음’과 ‘갱신’이 같은 축에 놓이고 미정 문장 전체와 주황 다음의 흰 서술을 분리해 읽을 수 있다. 강조 구절이나 뒤의 서술어가 고아행으로 떨어지지 않는다. |
| **09 청중의 세 행동** | Keynote23:00 | [1920×1080](../../main-10/present-1920/slide-09.png) | `approved` · ‘자료 두 개로 시작합니다’ 아래 주황 ‘고르기’와 나머지 두 행동이 같은 가로 띠에서 시작한다. 제목과 행동 사이의 검은 틈이 약 285px에서 104px로 줄어 한 덩어리가 중앙에 놓인다. 세 설명은 한 줄이고 열린 열 간격을 유지한다. |
|  |  | [1280×720](../../main-10/present-1280/slide-09.png) | `approved` · 왼쪽 제목에서 바로 아래 주황 ‘고르기’로 연결되고 나머지 행동을 같은 기준선에서 찾을 수 있다. 제목 아래 약 62px의 여백은 개별 행동 설명 앞보다 넓지만 한 화면에서 시작 안내와 세 항목을 함께 읽을 수 있는 거리다. |
| **10 그대로 말하는 첫 요청** | Codex20:00 | [1920×1080](../../main-10/present-1920/slide-10.png) | `approved` · 작은 회색 ‘첫 요청’이 첫 발화 바로 위로 내려왔고 두 글자 덩어리 사이의 검정 틈은 약 46px이다. 발화 두 흰 행과 근거·모르는 점을 남기는 주황 행이 한 발화로 연결되며, 네 행은 같은 좌측 시작선을 공유한다. |
|  |  | [1280×720](../../main-10/present-1280/slide-10.png) | `approved` · ‘첫 요청’ 아래 약 28px만 지나면 첫 흰 행이 시작한다. 두 흰 행의 실행 요청과 주황 마지막 행의 기록 조건이 같은 왼쪽에서 이어지고, 한 줄씩 온전히 보여 읽는 중간에 겹치거나 떨어지는 어절이 없다. |
| **11 마지막 질문** | Keynote20:30 | [1920×1080](../../main-10/present-1920/slide-11.png) | `approved` · ‘어떤 질문을 / 다시 묻고 싶나요?’의 중앙 두 행이 무대의 유일한 초점이다. 아래 행이 길어지는 질문의 호흡과 흰색의 절제가 10의 왼쪽 발화 뒤에 대답할 시간을 만든다. |
|  |  | [1280×720](../../main-10/present-1280/slide-11.png) | `approved` · ‘다시’와 ‘묻고 싶나요?’가 같은 둘째 행에 온전히 들어오고 물음표까지 읽힌다. 01의 큰 두 행을 떠올리게 하면서 눈길은 흰 질문 하나에 멈춘다. |

## 이전 교정과 덱의 흐름

- 01 시작 선언부터 02 작업창, 03 기사와 인용, 04 결과물까지 밀도와 시각 중심이 바뀐다. 03의 읽기용 가상 사례·원문 링크 수정과 04의 모바일 순서 변경은 Stage 양폭 PNG 바이트에 영향을 주지 않았다. 03의 좌측 기사와 우측 인용 사이 편집 관계 및 04의 일정표·지도·문서·안내 면을 유지한다.
- 04의 밀도 뒤 05의 새로 커진 이름이 중심을 고정하고, 짧은 정의가 따라온다. 06 준비 기록에서 07의 열린 세 관계, 08의 비교로 넘어간다. 07 오른쪽 선은 1920 PNG의 y=420·490·551에서 모두 x=1116–1119, 1280 PNG의 y=247·288·325에서 모두 x=657–659이다. 이 밝은 선과 약해진 왼쪽 윤곽 덕분에 관계와 결과 문서의 우선순위를 함께 읽는다.
- 09는 가운데에 모인 열린 세 행동이 10의 같은 왼쪽 축으로 모인 구체 발화로 줄어들고, 11은 중앙의 두 행으로 돌아간다. 09는 이전 1280의 약 167px 간격을 약 62px로, 10은 회색 표제의 큰 빈 틈을 1280 약 28px까지 줄였다. 두 장의 세 행·세 설명과 11의 여백을 보존한다. [1920 앞 보드](../../main-10/present-1920/contact-01-08.jpg) · [1920 뒤 보드](../../main-10/present-1920/contact-09-11.jpg) · [1280 앞 보드](../../main-10/present-1280/contact-01-08.jpg) · [1280 뒤 보드](../../main-10/present-1280/contact-09-11.jpg)
- 현재 Stage의 독립 판정은 시각 심사 후보 22개, 개선 필요 0개다. 판정 결과는 현행 PNG의 정지 화면에 한정한다. 최종 승인 여부는 총괄의 명시 범위 승인 검사와 연결한다.

## 장·범위별 판정 데이터

```json
{
  "reviews": [
    {
      "slide": 1,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "흰 ‘지식을 남기는 방식이’가 질문을 만들고 바로 아래 주황 ‘다음 질문을 바꾼다’가 선언을 완성한다. 아래 행을 짧게 끊은 폭과 중간의 검은 행간이 두 의미행을 한 시야에 묶는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-01.png"
      ]
    },
    {
      "slide": 1,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘방식이’와 ‘바꾼다’까지 어절 단위로 온전하다. 가운데의 흰 행과 주황 행이 같은 크기로 쉽게 읽히고 위아래로 비운 면은 첫 문장을 기다리는 정지감을 만든다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-01.png"
      ]
    },
    {
      "slide": 2,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "왼쪽 파란 말풍선 하나와 오른쪽에 서로 이어진 여러 문서가 먼저 대비된다. 같은 폭의 작업창과 같은 기준선 아래에 ‘이번 답’과 ‘다시 쓸 지식’이 남아 어느 창을 가리키는지 바로 읽힌다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-02.png"
      ]
    },
    {
      "slide": 2,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "아래 캡션은 작지만 각각 한 줄의 밝은 글씨로 자기 창에 붙는다. 오른쪽의 서류 윤곽과 연결선·색이 가는 내부 막대보다 먼저 보이고, 왼쪽의 단순한 답 모양과 서로 다른 결과를 읽을 수 있다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-02.png"
      ]
    },
    {
      "slide": 3,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "밝은 오른쪽 인용면이 먼저 보이고 왼쪽 어두운 기사의 제목과 본문이 출처 표면으로 이어진다. 두 면은 얕게 겹치며 인용의 세 의미행과 기사의 제목·본문을 가리지 않는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-03.png"
      ]
    },
    {
      "slide": 3,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "파란 인용부호 아래 ‘다음 질문에 쓸 근거를 / 연결된 문서에서 / 다시 찾고 싶다’가 각각 분명하다. 왼쪽은 제목을 읽고 기사 형태를 확인할 수 있으며 이 폭에서 작은 본문 전문은 읽기 자료가 맡는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-03.png"
      ]
    },
    {
      "slide": 4,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "왼쪽 문장이 짧은 두 행으로 물러나고 오른쪽에서 일정표·관계 지도·질문 파일·안내가 주역이 된다. 같은 가장자리와 간격으로 모으면서 다른 표면을 살려 네 개가 서로 다른 결과물로 읽힌다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-04.png"
      ]
    },
    {
      "slide": 4,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "2×2에 검은 띠나 눌린 칸 없이 표, 지도, 편집기, 안내 양식이 각각 구별된다. ‘함께 읽는 15분’과 ‘모임 준비 안내’ 같은 제목은 남고, 좌측 문장은 결과물 가장자리와 충분히 떨어진다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-04.png"
      ]
    },
    {
      "slide": 5,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "중앙의 ‘LLM Wiki’가 넓고 또렷한 획으로 먼저 보인다. 이름이 약 547px, 정의가 약 408px 폭이고 실제 글자 사이 검은 틈이 약 69px에서 44px로 줄었다. 04의 네 면 뒤에 한 이름과 한 줄 정의가 같은 중심으로 남는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-05.png"
      ]
    },
    {
      "slide": 5,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "이름은 약 323px 폭으로, 한 줄 정의는 약 240px 폭으로 중앙에 선다. 두 글줄 사이의 약 26px 간격은 이름과 정의의 층을 나누면서 바로 이어 읽히고 ‘LLM Wiki’의 영문 획이 전환을 지탱한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-05.png"
      ]
    },
    {
      "slide": 6,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘스터디 준비 기록’ 아래 사람의 선택과 AI의 연결을 가르는 두 행이 한 기록 면에 있다. 왼쪽의 주황·파랑 라벨과 오른쪽 본문의 공통 시작점이 두 작업의 소속을 분명히 가른다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-06.png"
      ]
    },
    {
      "slide": 6,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘목적과 맥락’을 골랐다는 사람 행과 AI가 근거를 붙인 행이 각각 한 줄로 읽힌다. 구분선이 바른 기준을 유지하고 패널의 약한 외곽보다 색 라벨과 밝은 역할 문장이 먼저 보인다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-06.png"
      ]
    },
    {
      "slide": 7,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "왼쪽 ‘자료 요약’에서 두 문서로 뻗는 선과 오른쪽 상하의 세로선이 바로 추적된다. 오른쪽 두 테두리가 같은 좌우 끝에 서고 세로선은 공통 중심축을 곧게 잇는다. 왼쪽 얇은 윤곽이 물러나고 아래의 더 굵은 ‘현재 계획’이 결과로 남는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-07.png"
      ]
    },
    {
      "slide": 7,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘자료 요약’에서 오른쪽 두 문서로 이어지는 두 대각선과 공통 세로축의 세 번째 선이 모두 구분된다. 색을 구별하지 않아도 세 관계를 따라갈 수 있고, 더 굵은 ‘현재 계획’과 캘린더 기호가 화면 아래에서 같은 역할을 가리킨다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-07.png"
      ]
    },
    {
      "slide": 8,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "같은 왼쪽 기준에서 처음의 회색 미정과 갱신의 밝은 행을 비교한다. 새 조건 ‘입문자와 15분 동안’에만 주황이 붙고 뒤의 실제 할 일이 같은 한 행에 붙어 읽힌다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-08.png"
      ]
    },
    {
      "slide": 8,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘처음’과 ‘갱신’이 같은 축에 놓이고 미정 문장 전체와 주황 다음의 흰 서술을 분리해 읽을 수 있다. 강조 구절이나 뒤의 서술어가 고아행으로 떨어지지 않는다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-08.png"
      ]
    },
    {
      "slide": 9,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘자료 두 개로 시작합니다’ 아래 주황 ‘고르기’와 나머지 두 행동이 같은 가로 띠에서 시작한다. 제목과 행동 사이의 검은 틈이 약 285px에서 104px로 줄어 한 덩어리가 중앙에 놓인다. 세 설명은 한 줄이고 열린 열 간격을 유지한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-09.png"
      ]
    },
    {
      "slide": 9,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "왼쪽 제목에서 바로 아래 주황 ‘고르기’로 연결되고 나머지 행동을 같은 기준선에서 찾을 수 있다. 제목 아래 약 62px의 여백은 개별 행동 설명 앞보다 넓지만 한 화면에서 시작 안내와 세 항목을 함께 읽을 수 있는 거리다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-09.png"
      ]
    },
    {
      "slide": 10,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "작은 회색 ‘첫 요청’이 첫 발화 바로 위로 내려왔고 두 글자 덩어리 사이의 검정 틈은 약 46px이다. 발화 두 흰 행과 근거·모르는 점을 남기는 주황 행이 한 발화로 연결되며, 네 행은 같은 좌측 시작선을 공유한다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-10.png"
      ]
    },
    {
      "slide": 10,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘첫 요청’ 아래 약 28px만 지나면 첫 흰 행이 시작한다. 두 흰 행의 실행 요청과 주황 마지막 행의 기록 조건이 같은 왼쪽에서 이어지고, 한 줄씩 온전히 보여 읽는 중간에 겹치거나 떨어지는 어절이 없다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-10.png"
      ]
    },
    {
      "slide": 11,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘어떤 질문을 / 다시 묻고 싶나요?’의 중앙 두 행이 무대의 유일한 초점이다. 아래 행이 길어지는 질문의 호흡과 흰색의 절제가 10의 왼쪽 발화 뒤에 대답할 시간을 만든다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1920/slide-11.png"
      ]
    },
    {
      "slide": 11,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "status": "approved",
      "reviewer": "/root/devday_recheck_sol62/a_stage",
      "reviewedAt": "2026-11-18T01:49:42Z",
      "reason": "‘다시’와 ‘묻고 싶나요?’가 같은 둘째 행에 온전히 들어오고 물음표까지 읽힌다. 01의 큰 두 행을 떠올리게 하면서 눈길은 흰 질문 하나에 멈춘다.",
      "evidence": [
        "research/devday-rebuild-20261117/main-10/present-1280/slide-11.png"
      ]
    }
  ]
}
```
