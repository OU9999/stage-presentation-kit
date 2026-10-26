/* Text-layout recipes: edit this file and refresh; no build required. */
window.PRESENTATION = {
  "id": "text-layout-recipes-20261025",
  "title": "글과 근거가 만나는 자리",
  "theme": "stage",
  "footer": "가상 자료 · 글 배치 재사용 예제",
  "speaker": "발표자 이름",
  "date": "2026.10.25",
  "slides": [
    {
      "id": "opening",
      "layout": "cover",
      "align": "center",
      "motion": "rise",
      "title": [
        "첫 경험을,",
        "다음 행동으로."
      ],
      "tone": "blue",
      "highlight": "다음 행동으로.",
      "subtitle": "12주 가상 제품 개선 프로젝트",
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요."
    },
    {
      "id": "funnel",
      "layout": "visual",
      "title": "첫 공유까지, 어디가 달랐을까?",
      "subtitle": "각 기간의 같은 단계 인원을 비교합니다.",
      "motion": "fade",
      "quiet": true,
      "visual": {
        "kind": "funnel",
        "labels": [
          "신규 가입",
          "프로젝트 시작",
          "초안 완성",
          "첫 공유"
        ],
        "series": [
          {
            "label": "기준 · W1–W4",
            "values": [
              1200,
              840,
              600,
              420
            ]
          },
          {
            "label": "후반 · W9–W12",
            "values": [
              1200,
              960,
              780,
              660
            ]
          }
        ],
        "unit": "명",
        "focus": 3,
        "emphasis": "focus",
        "composition": "split"
      },
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#funnel"
    },
    {
      "id": "weekly",
      "layout": "visual",
      "title": "변화가 이어지는 시간을 봅니다.",
      "subtitle": "가입 후 7일 내 첫 프로젝트 공유 · 마지막 코호트도 W13 종료까지 추적",
      "motion": "fade",
      "quiet": true,
      "visual": {
        "kind": "line",
        "labels": [
          "W1",
          "W2",
          "W3",
          "W4",
          "W5",
          "W6",
          "W7",
          "W8",
          "W9",
          "W10",
          "W11",
          "W12"
        ],
        "numerators": [
          90,
          102,
          111,
          117,
          123,
          132,
          141,
          150,
          156,
          162,
          168,
          174
        ],
        "denominators": [
          300,
          300,
          300,
          300,
          300,
          300,
          300,
          300,
          300,
          300,
          300,
          300
        ],
        "unit": "%",
        "focus": 11,
        "emphasis": "focus",
        "composition": "wide"
      },
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#weekly"
    },
    {
      "id": "journey",
      "layout": "visual",
      "title": "마찰을, 다음 행동에 연결합니다.",
      "subtitle": "제안 기능과 경험의 순서 · 실제 이동량이나 인과 관계가 아님",
      "motion": "fade",
      "quiet": true,
      "visual": {
        "kind": "flow",
        "items": [
          "가입",
          "템플릿으로 시작",
          "안내 따라 초안",
          "미리보고 공유"
        ],
        "composition": "wide"
      },
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#journey"
    },
    {
      "id": "long-korean",
      "layout": "statement",
      "quiet": true,
      "title": "처음 접하는 기능을 이해한 뒤 다음 행동까지 이어지는 경험을 어떻게 확인할 수 있을까요?",
      "support": "가입 후 7일 내 첫 공유율을 같은 기준으로 살펴보되, 관찰된 차이를 변경 기능 하나의 효과로 단정하지 않습니다.",
      "subtitle": "기능의 사용 여부보다 사용자가 어떤 단계에서 방향을 잃는지 설명할 수 있어야 합니다. 숫자와 인터뷰를 나란히 보면서 다음에 확인할 질문을 정합니다.",
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요."
    },
    {
      "id": "portable-support",
      "title": "지원 요청이 쌓여도, 첫 응답을 놓치지 않습니다.",
      "subtitle": "다른 주제 · 7주 · 첫 응답까지의 중앙값 · 단위: 분",
      "visual": {
        "kind": "line",
        "labels": [
          "1주",
          "2주",
          "3주",
          "4주",
          "5주",
          "6주",
          "7주"
        ],
        "values": [
          123.4,
          116.2,
          108.8,
          98.5,
          88.1,
          80.7,
          72.5
        ],
        "unit": "분",
        "focus": 6,
        "emphasis": "focus",
        "composition": "wide"
      },
      "layout": "visual",
      "quiet": true,
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#portable-support"
    },
    {
      "id": "large-number",
      "title": "자료가 달라져도, 값과 설명의 관계를 유지합니다.",
      "subtitle": "긴 강조값·단위·라벨이 제목 읽기 폭을 침범하지 않는지 확인",
      "visual": {
        "kind": "bars",
        "labels": [
          "기준 기간의 누적 요청",
          "후반 기간의 누적 요청"
        ],
        "values": [
          123456.7,
          9876543.2
        ],
        "unit": "건",
        "focus": 1,
        "emphasis": "focus",
        "composition": "split"
      },
      "layout": "visual",
      "quiet": true,
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#large-number"
    },
    {
      "id": "large-number-wide",
      "title": "자료가 달라져도, 값과 설명의 관계를 유지합니다.",
      "subtitle": "긴 강조값·단위·라벨이 제목 읽기 폭을 침범하지 않는지 확인",
      "visual": {
        "kind": "bars",
        "labels": [
          "기준 기간의 누적 요청",
          "후반 기간의 누적 요청"
        ],
        "values": [
          123456.7,
          9876543.2
        ],
        "unit": "건",
        "focus": 1,
        "emphasis": "focus",
        "composition": "wide"
      },
      "layout": "visual",
      "quiet": true,
      "notes": "가상 자료 · 글 배치 재사용 예제.\n수정 원본은 content.js입니다. 글·자료·줄바꿈을 직접 바꾸고 새로고침하세요.\n상세 표: data.html#large-number-wide"
    }
  ]
};
