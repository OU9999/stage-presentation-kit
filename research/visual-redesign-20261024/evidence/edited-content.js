/* Stage 발표 원본 — 이 파일을 발표 폴더의 content.js와 교체하세요. */
window.PRESENTATION = {
  "id": "stage-redesign-independent-qa-20261024",
  "title": "지원 경험을 돌아보는 작은 실험",
  "theme": "stage",
  "footer": "독립 검수용 가상 자료",
  "slides": [
    {
      "layout": "visual",
      "title": "일곱 번의 관찰, 다음 질문.",
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
        "numerators": [
          78,
          91,
          91,
          112,
          111,
          135,
          136
        ],
        "denominators": [
          120,
          140,
          130,
          160,
          150,
          180,
          170
        ],
        "unit": "%",
        "focus": 6,
        "emphasis": "focus",
        "composition": "wide"
      }
    },
    {
      "layout": "visual",
      "title": "문의는 어디에 모였을까요?",
      "visual": {
        "kind": "composition",
        "labels": [
          "탐색",
          "작성",
          "공유",
          "설정",
          "기타"
        ],
        "values": [
          8,
          16,
          10,
          6,
          4
        ],
        "unit": "건",
        "focus": 1,
        "emphasis": "focus",
        "composition": "split"
      }
    },
    {
      "layout": "visual",
      "title": "요청에서 답변까지.",
      "visual": {
        "kind": "flow",
        "items": [
          "요청 접수",
          "답변 완료"
        ]
      }
    },
    {
      "layout": "visual",
      "title": "작은 흐름도, 길어질 수 있습니다.",
      "visual": {
        "kind": "flow",
        "items": [
          "문제 등록",
          "담당 선택",
          "해결안 작성",
          "답변 전송",
          "확인 완료"
        ]
      }
    },
    {
      "layout": "visual",
      "title": "음수도, 한 자료의 일부입니다.",
      "visual": {
        "kind": "bars",
        "labels": [
          "첫 주",
          "둘째 주",
          "셋째 주",
          "넷째 주",
          "다섯째 주"
        ],
        "values": [
          -12,
          0,
          8,
          -3,
          15
        ],
        "unit": "건",
        "focus": 4
      }
    },
    {
      "layout": "visual",
      "title": "같은 위치에도 두 이름이 있습니다.",
      "visual": {
        "kind": "matrix",
        "xLabel": "필요한 노력",
        "yLabel": "예상 영향",
        "items": [
          {
            "label": "첫 질문",
            "x": 2,
            "y": 4
          },
          {
            "label": "같은 점의 다른 질문",
            "x": 2,
            "y": 4
          },
          {
            "label": "후속 확인",
            "x": 5,
            "y": 1
          }
        ]
      }
    },
    {
      "layout": "visual",
      "title": "빈 값은 영으로 바꾸지 않습니다.",
      "visual": {
        "kind": "line",
        "labels": [
          "월",
          "화",
          "수",
          "목",
          "금"
        ],
        "values": [
          0,
          4,
          null,
          8,
          6
        ],
        "unit": "건",
        "focus": 4
      }
    },
    {
      "layout": "visual",
      "title": "일정은 열두 주보다 길 수도.",
      "visual": {
        "kind": "timeline",
        "unit": "주",
        "items": [
          {
            "label": "접수와 관찰",
            "start": 2,
            "end": 5
          },
          {
            "label": "충분히 긴 설명을 가진 후속 확인 단계",
            "start": 8,
            "end": 17
          }
        ]
      }
    },
    {
      "layout": "visual",
      "title": "다른 크기의 표도 그대로.",
      "visual": {
        "kind": "heatmap",
        "rows": [
          "지원",
          "제작"
        ],
        "columns": [
          "월",
          "화",
          "수",
          "목",
          "금"
        ],
        "values": [
          [
            1,
            2,
            0,
            4,
            3
          ],
          [
            3,
            0,
            2,
            1,
            5
          ]
        ],
        "unit": "시간"
      }
    },
    {
      "layout": "visual",
      "title": "합계가 영이면 비율은 없습니다.",
      "visual": {
        "kind": "composition",
        "labels": [
          "A",
          "B"
        ],
        "values": [
          0,
          0
        ],
        "unit": "건"
      }
    }
  ]
};
