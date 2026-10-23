/* Generated from slides.md. Edit the Markdown source and rebuild. */
window.PRESENTATION = {
  "id": "example-engineering-review",
  "title": "반복 가능한 검증 — 가상 기술 개선 보고",
  "theme": "paper",
  "speaker": "발표자 이름",
  "date": "2026. 10. 23.",
  "footer": "가상 기술 개선 보고",
  "slides": [
    {
      "layout": "cover",
      "align": "center",
      "notes": "요청 처리 시스템의 개선 보고를 가정한 양식입니다. 시스템, 비교 조건, 수치는 모두 설명용 가상 예시입니다.",
      "title": [
        "느린 흐름을,",
        "측정 가능하게."
      ],
      "subtitle": "가상의 요청 처리 시스템 개선 보고"
    },
    {
      "layout": "compare",
      "tone": "blue",
      "eyebrow": "가상 개선안 비교",
      "notes": "같은 작업을 처리하는 두 가상 설계를 비교합니다. 실제 저장소나 서비스의 구조를 설명하지 않습니다.",
      "left": {
        "label": "가상 현행안",
        "points": [
          "요청마다 같은 값을 계산합니다.",
          "작업이 끝날 때까지 기다립니다.",
          "결과를 따로 기록합니다."
        ]
      },
      "right": {
        "label": "가상 개선안",
        "points": [
          "재사용할 값을 구분합니다.",
          "독립적인 작업을 나눕니다.",
          "같은 기준으로 결과를 남깁니다."
        ]
      },
      "title": [
        "같은 조건에서,",
        "바뀐 부분만 봅니다."
      ]
    },
    {
      "layout": "chart",
      "quiet": true,
      "notes": "수치와 조건은 모두 가상입니다. 실제 발표에서는 부하 조건, 표본, 측정 방식과 원본 기록을 함께 제시하세요.",
      "chart": {
        "title": "가상 응답 시간",
        "unit": "ms",
        "max": 400,
        "rows": [
          {
            "label": "현행안",
            "value": 300
          },
          {
            "label": "개선안",
            "value": 120,
            "highlight": true
          }
        ]
      },
      "source": "설명용 가상 수치 · 실제 벤치마크가 아닙니다.",
      "title": [
        "같은 부하에서,",
        "차이를 확인합니다."
      ],
      "subtitle": "가상의 동일 요청 시나리오를 비교합니다."
    },
    {
      "layout": "results",
      "quiet": true,
      "notes": "독자 제작한 문서와 지표판을 증거 자료의 자리 표시자로 사용했습니다. 실제 구현이나 운영 결과가 아닙니다.",
      "items": [
        {
          "src": "../../assets/examples/report.svg",
          "alt": "자체 제작한 가상 설계 검토 문서",
          "label": "설계 기록",
          "fit": "contain"
        },
        {
          "src": "../../assets/examples/dashboard.svg",
          "alt": "가상 지표를 표시하는 자체 제작 대시보드",
          "label": "비교 지표",
          "fit": "contain"
        },
        {
          "src": "../../assets/workspace-demo.svg",
          "alt": "문서와 편집 화면이 있는 자체 제작 작업 공간",
          "label": "검토 화면",
          "fit": "contain"
        },
        {
          "src": "../../assets/examples/objects.svg",
          "alt": "입체 도형으로 만든 자체 제작 시각화 시안",
          "label": "표현 시안",
          "fit": "contain"
        }
      ],
      "source": "자체 제작한 가상 자료 · 실제 개선의 증거로 사용하지 마세요.",
      "title": [
        "근거는,",
        "다시 읽을 수 있게."
      ],
      "subtitle": "가상 보고서와 화면을 한곳에 모읍니다."
    },
    {
      "layout": "quote",
      "notes": "가상의 검토 회의를 위해 만든 문장입니다. 실제 인물의 발언이나 녹취가 아닙니다.",
      "quote": "좋은 개선은,\n다시 확인할 수 있습니다.",
      "attribution": "가상 검토 회의를 위해 만든 문장"
    },
    {
      "layout": "steps",
      "notes": "가상 개선안을 실제로 검증한다면 어떤 순서가 필요한지 보여주는 진행 예시입니다.",
      "steps": [
        {
          "title": "조건 고정",
          "description": "같은 입력과 부하를 준비합니다."
        },
        {
          "title": "값 재측정",
          "description": "반복해서 기록하고 차이를 봅니다."
        },
        {
          "title": "범위 확인",
          "description": "영향받는 동작을 함께 확인합니다."
        }
      ],
      "title": [
        "다음 검증을,",
        "짧게 나눕니다."
      ]
    },
    {
      "layout": "closing",
      "align": "center",
      "tone": "blue",
      "highlight": "반복 가능한 검증.",
      "notes": "가상 예제를 실제 개선 보고로 바꿀 때 필요한 자료를 안내합니다.",
      "action": "실제 측정 조건, 기록, 출처로 바꾸세요.",
      "title": [
        "한 번의 숫자보다,",
        "반복 가능한 검증."
      ],
      "takeaway": "이 예제의 수치는 모두 가상입니다."
    }
  ]
};
