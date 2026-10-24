/*
 * STAGE — 사진과 컬러를 활용한 재사용 예제. 이 파일이 발표의 원본입니다.
 * assets/CREDITS.md에 사진 작가와 원본을 기록했습니다. 모든 자산은 로컬입니다.
 * 16 layouts: cover | statement | chart | media | section | compare | metric |
 * image | demo | quote | steps | closing | gallery | mosaic | results | categories
 * gallery.variant: portraits | strip / items: src, alt, label, caption, fit, focalPoint
 * mosaic: items[].span=1|2; 예제는 합계8. results: items 4개. categories: 항목별 tone.
 * tone: orange | purple | blue | green | yellow. highlight: 강조할 문장/이름 전체.
 * motion: none | fade | rise | stagger | chart. 생략하면 fade, 읽기·편집·인쇄는 정적.
 * surface: butter 는 선택적 소개 색면입니다. 기본 예제는 검정 무대를 유지합니다.
 * zoom: 1~3(표시 프레임의 디지털 확대). fit/focalPoint/zoom을 함께 확인하세요.
 * quiet:true는 반복 라벨/푸터를 숨깁니다. notes는 발표자 창에서 읽습니다.
 */
window.PRESENTATION = {
  "id": "stage-photo-color-example",
  "title": "작은 장면, 큰 이야기",
  "theme": "stage",
  "speaker": "발표자 이름",
  "date": "2026. 10. 23.",
  "footer": "SMALL MOMENTS / CLEAR STORIES",
  "slides": [
    {
      "id": "opening",
      "layout": "cover",
      "align": "center",
      "title": [
        "작은 장면,",
        "큰 이야기."
      ],
      "subtitle": "이미지와 컬러로 만드는 다음 발표.",
      "notes": "중립적인 표지로 시작합니다. 이 예제는 특정 주제의 실제 성과가 아닌 재사용 양식 시연입니다. title·speaker·date를 자신의 발표로 바꾸세요."
    },
    {
      "id": "one-message",
      "layout": "statement",
      "align": "center",
      "title": [
        "먼저, 사람을 봅니다."
      ],
      "notes": "중립적인 한 문장 뒤에 사진 모음을 배치합니다. 정보량과 이미지 면적이 달라지면서 다음 장에 시선이 모입니다."
    },
    {
      "id": "people-scenes",
      "layout": "gallery",
      "variant": "portraits",
      "quiet": true,
      "items": [
        {
          "src": "assets/photos/capture.jpg",
          "alt": "거리에서 휴대폰으로 장면을 기록하는 인물",
          "label": "시선을 담아,\n장면을 기록합니다.",
          "fit": "cover",
          "focalPoint": "68% 45%"
        },
        {
          "src": "assets/photos/listen.jpg",
          "alt": "창가에서 헤드폰을 쓰고 노트북을 사용하는 인물",
          "label": "소리를 듣고,\n작업에 집중합니다.",
          "fit": "cover",
          "focalPoint": "52% 40%"
        },
        {
          "src": "assets/photos/write.jpg",
          "alt": "야외 테이블에서 노트에 생각을 적는 인물",
          "label": "생각을 적어,\n다음으로 이어갑니다.",
          "fit": "cover",
          "focalPoint": "45% 50%"
        },
        {
          "src": "assets/photos/observe.jpg",
          "alt": "한쪽 눈에 돋보기를 대고 관찰하는 인물",
          "label": "작은 차이를,\n다시 들여다봅니다.",
          "fit": "cover",
          "focalPoint": "48% 34%"
        },
        {
          "src": "assets/photos/portrait-one.jpg",
          "alt": "작업 공간에서 현금을 들고 앉아 있는 인물",
          "label": "일상 가까이,\n가능성을 발견합니다.",
          "fit": "cover",
          "focalPoint": "48% 30%"
        },
        {
          "src": "assets/photos/portrait-two.jpg",
          "alt": "도시 거리에서 갈색 옷을 입고 서 있는 인물",
          "label": "밖으로 나가,\n새로운 시선을 만납니다.",
          "fit": "cover",
          "focalPoint": "49% 28%"
        }
      ],
      "notes": "SF 키노트 48:30의 상단 설명과 동일 세로 프레임을 16:9로 재구성했습니다. 사진은 서로 다른 Pexels 스톡 장면이며 원본의 통일 촬영 시리즈를 재현한 것은 아닙니다. 원래 색을 유지하고 행동이 보이는 크롭을 선택했습니다. 작가와 원본: assets/CREDITS.md. src·alt·label·focalPoint를 함께 바꾸세요."
    },
    {
      "id": "full-color-scene",
      "layout": "media",
      "quiet": true,
      "title": "하나의 풍경을 크게.",
      "src": "assets/photos/landscape.jpg",
      "alt": "푸른 호수에 주황빛 산과 초록 숲이 비치는 풍경",
      "fit": "cover",
      "focalPoint": "50% 48%",
      "caption": "Moraine Lake · James Wheeler / Pexels",
      "notes": "사진 한 장의 컬러와 질감을 크게 보여줍니다. 이 장면을 먼저 본 뒤 다음 장에서 같은 사진의 디지털 크롭을 비교합니다. 실제 렌즈 초점거리나 카메라 성능 비교는 아닙니다."
    },
    {
      "id": "crop-comparison",
      "layout": "gallery",
      "variant": "strip",
      "quiet": true,
      "tone": "yellow",
      "title": "같은 장면을, 다른 범위로.",
      "subtitle": "프레임을 고정하고, 관찰할 범위를 바꿉니다.",
      "items": [
        {
          "src": "assets/photos/landscape.jpg",
          "alt": "같은 호수 사진의 1배 디지털 표시 크롭",
          "label": "기본 프레임",
          "caption": "전체의 맥락",
          "fit": "cover",
          "focalPoint": "46% 32%",
          "zoom": 1
        },
        {
          "src": "assets/photos/landscape.jpg",
          "alt": "같은 호수 사진의 1.4배 디지털 표시 크롭",
          "label": "1.4× 디지털 크롭",
          "caption": "산과 호수",
          "fit": "cover",
          "focalPoint": "46% 32%",
          "zoom": 1.4
        },
        {
          "src": "assets/photos/landscape.jpg",
          "alt": "같은 호수 사진의 2배 디지털 표시 크롭",
          "label": "2× 디지털 크롭",
          "caption": "능선의 표정",
          "fit": "cover",
          "focalPoint": "46% 32%",
          "zoom": 2
        },
        {
          "src": "assets/photos/landscape.jpg",
          "alt": "같은 호수 사진의 2.8배 디지털 표시 크롭",
          "label": "2.8× 디지털 크롭",
          "caption": "가까이 보는 디테일",
          "fit": "cover",
          "focalPoint": "46% 32%",
          "zoom": 2.8
        }
      ],
      "source": "James Wheeler / Pexels · 기본 표시 프레임 기준의 디지털 확대 예시",
      "notes": "Apple의 조건 라벨이 있는 사진 스트립에서 비교 기준을 유지하는 방법을 참고했습니다. 이 예제는 같은 사진을 CSS zoom으로 확대하며 광학 줌·별도 촬영 데이터가 아닙니다. label과 zoom을 함께 바꾸고 실제 조건을 명시하세요."
    },
    {
      "id": "color-statement",
      "motion": "rise",
      "layout": "statement",
      "align": "center",
      "tone": "orange",
      "title": [
        "보여주는 방식이,",
        "이해를 바꿉니다."
      ],
      "highlight": "이해를 바꿉니다.",
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
      "id": "different-results",
      "layout": "results",
      "quiet": true,
      "title": [
        "하나의 생각이,",
        "다양한 결과로."
      ],
      "items": [
        {
          "src": "assets/examples/report.svg",
          "alt": "관찰 과정을 정리한 독자 제작 예시 문서",
          "fit": "contain"
        },
        {
          "src": "assets/examples/objects.svg",
          "alt": "파랑 입체 도형과 주황 구체의 독자 제작 이미지",
          "fit": "contain"
        },
        {
          "src": "assets/examples/dashboard.svg",
          "alt": "가상 지표와 파란 선 도표가 있는 독자 제작 대시보드",
          "fit": "contain"
        },
        {
          "src": "assets/workspace-demo.svg",
          "alt": "문서와 편집 화면을 보여주는 독자 제작 작업 공간 UI",
          "fit": "contain"
        }
      ],
      "source": "자체 제작 · 양식용 가상 자료",
      "notes": "DevDay 25:00의 주장 옆 2×2 결과물 배열을 참고했습니다. 사람 사진 모음과 다른 양식입니다. 문서와 UI는 잘리지 않도록 contain을 기본으로 두고, 실제 자료와 출처로 바꾸세요."
    },
    {
      "id": "work-collection",
      "layout": "mosaic",
      "quiet": true,
      "title": "서로 다른 결과를, 하나의 이야기로.",
      "items": [
        {
          "src": "assets/examples/poster-wide.svg",
          "alt": "연보라 바탕에 큰 보라 타이포와 주황 원을 놓은 포스터",
          "span": 2,
          "fit": "contain"
        },
        {
          "src": "assets/photos/listen.jpg",
          "alt": "헤드폰을 쓴 인물의 풀컬러 사진",
          "span": 1,
          "fit": "cover",
          "focalPoint": "50% 15%"
        },
        {
          "src": "assets/examples/objects.svg",
          "alt": "푸른 도형과 주황 구체를 배치한 작품",
          "span": 1,
          "fit": "contain"
        },
        {
          "src": "assets/photos/portrait-two.jpg",
          "alt": "갈색 옷을 입고 도시 거리에 서 있는 인물",
          "span": 1,
          "fit": "cover",
          "focalPoint": "50% 0%"
        },
        {
          "src": "assets/examples/report.svg",
          "alt": "관찰 기록 문서 전체",
          "span": 1,
          "fit": "contain"
        },
        {
          "src": "assets/photos/landscape.jpg",
          "alt": "호수와 산의 컬러 풍경",
          "span": 2,
          "fit": "cover"
        }
      ],
      "source": "사진: Pexels · 포스터·문서·도형: 자체 제작",
      "notes": "Figma 제품 데모 계열의 4×2 작품 모음입니다. span 합은 8입니다. DevDay 현장 사진의 12개 혼합 타일은 별도 bento 양식과 devday-compositions 예제를 사용하세요."
    },
    {
      "id": "warm-introduction",
      "motion": "rise",
      "layout": "section",
      "align": "center",
      "quiet": true,
      "title": [
        "이서윤"
      ],
      "subtitle": "다음 이야기를 만드는 사람.",
      "notes": "SF 키노트의 보라색 이름 소개를 참고해 검정 무대 위에 큰 이름을 놓았습니다. 가상 이름을 발표자 이름으로 바꾸세요. 밝은 butter 표면은 선택 기능으로만 유지합니다.",
      "tone": "purple",
      "highlight": "이서윤"
    },
    {
      "id": "back-to-message",
      "layout": "statement",
      "align": "center",
      "title": [
        "이제, 핵심에 집중합니다."
      ],
      "notes": "이름 소개 다음에 중립적인 큰 문장으로 돌아옵니다."
    },
    {
      "id": "comparison",
      "layout": "compare",
      "eyebrow": "02 / A CLEAR COMPARISON",
      "title": [
        "차이는,",
        "같은 기준에서."
      ],
      "left": {
        "label": "익숙한 시선",
        "points": [
          "장면 전체를 봅니다.",
          "핵심 정보를 찾습니다.",
          "맥락을 함께 읽습니다."
        ]
      },
      "right": {
        "label": "새로운 시선",
        "points": [
          "다른 범위를 봅니다.",
          "비교 조건을 정합니다.",
          "한 가지 차이를 발견합니다."
        ]
      },
      "notes": "[비교] 좌우 항목을 같은 기준으로 짝지으세요. 각 열은 세 항목 이내가 읽기 좋습니다."
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
      "id": "show-it",
      "layout": "image",
      "eyebrow": "04 / SHOW, THEN TELL",
      "title": "한 장에 담는, 하나의 인상.",
      "src": "assets/examples/poster.svg",
      "alt": "연보라 포스터의 보라 타이포와 주황 원",
      "fit": "contain",
      "caption": "MAKE ROOM FOR IDEAS · 자체 제작 포스터 예시",
      "notes": "[이미지] src에 로컬 파일 경로를 넣고 alt에는 장면을 설명하세요. fit은 contain 또는 cover를 선택할 수 있습니다."
    },
    {
      "id": "demo",
      "layout": "demo",
      "eyebrow": "05 / LET IT WORK",
      "title": [
        "보여주는 순간,",
        "이해가 됩니다."
      ],
      "src": "assets/examples/dashboard.svg",
      "alt": "가상 신호 데이터를 보여주는 독자 제작 대시보드",
      "caption": "정적 화면 시연 예시 · 실제 시연 화면으로 교체하세요.",
      "steps": [
        "무엇을 할지 먼저 말하기",
        "결과가 보이는 한 장면",
        "의미를 한 문장으로 연결"
      ],
      "notes": "[데모] src를 화면 캡처 경로로 바꾸거나, video에 로컬 영상 경로를 지정하세요. url을 추가하면 실제 데모를 여는 링크가 표시됩니다."
    },
    {
      "id": "a-voice",
      "layout": "quote",
      "eyebrow": "06 / A VOICE TO REMEMBER",
      "quote": "좋은 문장은,\n다음 생각을 열어줍니다.",
      "attribution": "인용한 사람 또는 자료",
      "support": "실제 인용문과 정확한 출처로 교체하세요.",
      "notes": "[인용] 인용문은 짧게 고르고 출처를 적으세요. 이 문장은 양식 예시로 만든 문장입니다."
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
      "id": "closing",
      "layout": "closing",
      "eyebrow": "MAKE ROOM FOR WHAT MATTERS",
      "title": [
        "당신의 장면으로,",
        "이야기를 시작하세요."
      ],
      "highlight": "",
      "takeaway": "기억할 한 장면, 분명한 한 메시지.",
      "action": "질문을 받겠습니다.",
      "url": "",
      "notes": "[마무리] 청중이 가져갈 메시지와 다음 행동을 적으세요. 필요하다면 url에 연락처나 참고 링크를 넣습니다.",
      "align": "center"
    }
  ]
};
