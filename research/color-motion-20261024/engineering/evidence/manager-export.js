/* Stage 발표 원본 — 이 파일을 발표 폴더의 content.js와 교체하세요. */
window.PRESENTATION = {
  "id": "stage-manager-color-motion-stage-manager-color-motion-TX5KoJ",
  "title": "컬러·모션 독립 검증",
  "theme": "stage",
  "speaker": "발표자 이름",
  "date": "2026. 10. 23.",
  "footer": "SMALL MOMENTS / CLEAR STORIES",
  "slides": [
    {
      "id": "color-statement",
      "motion": "rise",
      "layout": "statement",
      "align": "center",
      "tone": "orange",
      "title": [
        "보여주는 방식이,",
        "검증한 문장입니다."
      ],
      "highlight": "검증한 문장입니다.",
      "notes": "Codex의 주황색 한 줄 선언을 참고했습니다. tone은 강조색을 정하고 highlight는 문장 안에서 강조할 의미 단위를 정합니다. 다음 장까지 주황색을 장식처럼 반복하지 않습니다."
    },
    {
      "id": "color-roles",
      "motion": "stagger",
      "layout": "categories",
      "quiet": true,
      "title": "색에는, 역할을 맡깁니다.",
      "items": [
        {
          "label": "관찰",
          "tone": "blue",
          "icon": "search"
        },
        {
          "label": "비교",
          "tone": "green",
          "icon": "compare"
        },
        {
          "label": "강조",
          "tone": "orange",
          "icon": "select"
        },
        {
          "label": "전환",
          "tone": "purple",
          "icon": "share"
        }
      ],
      "notes": "SF 키노트 23:00의 원형 픽토그램과 같은 색 이름을 참고한 독자 SVG입니다. 아이콘 키와 라벨을 함께 바꾸세요. 추가 질문과 설명은 말로 덧붙이고 화면에는 범주만 남깁니다.",
      "align": "center"
    },
    {
      "id": "new-voice",
      "motion": "rise",
      "layout": "section",
      "align": "center",
      "quiet": true,
      "tone": "purple",
      "title": [
        "김하늘"
      ],
      "highlight": "김하늘",
      "subtitle": "작은 관찰에서, 다음 가능성으로.",
      "notes": "보라색 이름만 크게 놓은 발표자 소개 양식입니다. 이름은 가상의 예시입니다. slide.tone과 highlight에 발표자 이름 전체를 지정합니다. 다음 장은 선택 막대 하나에만 파랑을 쓰는 근거 화면입니다."
    },
    {
      "id": "one-proof",
      "motion": "chart",
      "tone": "blue",
      "layout": "chart",
      "quiet": true,
      "title": [
        "관찰을,",
        "근거로 연결합니다."
      ],
      "subtitle": "같은 기준에서 차이를 확인합니다.",
      "chart": {
        "title": "비교 데이터 · 양식 예시",
        "unit": "점",
        "max": 100,
        "rows": [
          {
            "label": "옵션 A",
            "value": 32
          },
          {
            "label": "옵션 B",
            "value": 56
          },
          {
            "label": "옵션 C",
            "value": 84,
            "highlight": true
          }
        ]
      },
      "source": "양식 설명용 가상 수치 · 실제 데이터와 출처로 교체하세요.",
      "notes": "[메시지와 차트] 왼쪽에는 결론을, 오른쪽에는 단일 차트를 놓습니다. 이 숫자는 성과가 아닌 가상 예시입니다. chart.rows의 label/value와 chart.max/unit을 바꾸세요. 강조할 행 하나에 highlight: true를 줍니다. source에는 실제 측정 기준과 출처를 적으세요."
    },
    {
      "id": "a-number",
      "layout": "metric",
      "eyebrow": "03 / MAKE IT TANGIBLE",
      "value": "42",
      "unit": "%",
      "label": "변화를, 한 숫자로.",
      "support": "수치의 의미와 비교 조건을 함께.",
      "source": "예시 수치 · 실제 자료와 출처로 교체하세요",
      "notes": "[숫자] 이 수치는 레이아웃 예시입니다. 실제 발표에서는 검증한 값, 측정 기준, 출처를 함께 적으세요.",
      "tone": "green"
    },
    {
      "id": "next-steps",
      "motion": "stagger",
      "layout": "steps",
      "eyebrow": "07 / A SIMPLE WAY FORWARD",
      "title": [
        "다음 행동은",
        "쉽고 분명하게."
      ],
      "steps": [
        {
          "title": "복사하기",
          "description": "이 폴더로 새 발표를 시작하세요."
        },
        {
          "title": "바꿔 쓰기",
          "description": "문장과 이미지를 당신의 것으로."
        },
        {
          "title": "리허설하기",
          "description": "실제 화면에서 한 번 말해보세요."
        }
      ],
      "notes": "[단계] 다음 행동을 세 단계 안으로 나누세요. 각 단계의 제목은 짧게 쓰고 설명은 한 문장으로 정리합니다."
    },
    {
      "layout": "metric-pair",
      "title": "독립 검증용 두 수치",
      "items": [
        {
          "value": 24,
          "unit": "개",
          "label": "관찰",
          "tone": "blue"
        },
        {
          "value": 6,
          "unit": "개",
          "label": "주제",
          "tone": "purple"
        }
      ]
    }
  ]
};
