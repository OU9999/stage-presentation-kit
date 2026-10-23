---
id: example-devday-compositions
title: 화면이 설명하는 발표 — 현장 구성 양식
theme: stage
speaker: 발표자 이름
date: 2026. 10. 23.
footer: 현장 구성으로 만든 가상 예제
---

<!-- stage
layout: cover
align: center
notes: 서울·도쿄의 현장 사진과 SF 세션에서 관찰한 배치를 재사용 양식으로 만든 독자 예제입니다. 사진은 스톡, UI와 아이콘은 직접 제작했으며 모든 숫자는 가상입니다. 원본 로고나 실제 성과를 복제하지 않았습니다.
-->
# 화면이 설명하는,
# 다음 이야기.

현장 구성에서 출발한 양식 · 가상 수치와 스톡 사진

---

<!-- stage
layout: gallery
variant: portraits
quiet: true
notes: SF 키노트 48:30의 같은 높이 세로 프레임과 상단 짧은 설명을 참고했습니다. 서로 다른 스톡 사진이며 원본의 통일 촬영 시리즈는 아닙니다. 작가와 원본은 assets/CREDITS.md에서 확인하세요.
-->


```stage
{
  "items": [
    {
      "src": "../../assets/photos/capture.jpg",
      "alt": "거리에서 휴대폰으로 장면을 기록하는 인물",
      "label": "시선을 담아,\n장면을 기록합니다.",
      "fit": "cover",
      "focalPoint": "68% 45%"
    },
    {
      "src": "../../assets/photos/listen.jpg",
      "alt": "창가에서 헤드폰을 쓰고 노트북을 사용하는 인물",
      "label": "소리를 듣고,\n작업에 집중합니다.",
      "fit": "cover",
      "focalPoint": "52% 40%"
    },
    {
      "src": "../../assets/photos/write.jpg",
      "alt": "야외 테이블에서 노트에 생각을 적는 인물",
      "label": "생각을 적어,\n다음으로 이어갑니다.",
      "fit": "cover",
      "focalPoint": "45% 50%"
    },
    {
      "src": "../../assets/photos/observe.jpg",
      "alt": "한쪽 눈에 돋보기를 대고 관찰하는 인물",
      "label": "작은 차이를,\n다시 들여다봅니다.",
      "fit": "cover",
      "focalPoint": "48% 34%"
    },
    {
      "src": "../../assets/photos/portrait-one.jpg",
      "alt": "작업 공간에서 현금을 들고 앉아 있는 인물",
      "label": "일상 가까이,\n가능성을 발견합니다.",
      "fit": "cover",
      "focalPoint": "48% 30%"
    },
    {
      "src": "../../assets/photos/portrait-two.jpg",
      "alt": "도시 거리에서 갈색 옷을 입고 서 있는 인물",
      "label": "밖으로 나가,\n새로운 시선을 만납니다.",
      "fit": "cover",
      "focalPoint": "49% 28%"
    }
  ]
}
```

---

<!-- stage
layout: categories
align: center
quiet: true
notes: SF 키노트 23:00의 원형 픽토그램과 같은 색 이름을 참고했습니다. 선 굵기를 통일한 자체 SVG이며 흰 범주도 포함합니다.
-->
# 서로 다른 역할을, 한눈에.

```stage
{
  "items": [
    {
      "icon": "brain",
      "label": "생각",
      "tone": "blue"
    },
    {
      "icon": "folder",
      "label": "정리",
      "tone": "green"
    },
    {
      "icon": "speed",
      "label": "속도",
      "tone": "white"
    },
    {
      "icon": "image",
      "label": "이미지",
      "tone": "orange"
    },
    {
      "icon": "share",
      "label": "공유",
      "tone": "purple"
    }
  ]
}
```

---

<!-- stage
layout: bento
preset: seoul
quiet: true
notes: 서울 10월22일과 도쿄 10월20일 현장 사진에서 확인한 사진·문서·UI·수치 혼합과 오른쪽 높은 주역 타일을 참고한 12슬롯 고정 프리셋입니다. 모든 숫자와 UI는 가상이며 스톡 사진 크레딧은 assets/CREDITS.md에 있습니다.
-->


```stage
{
  "items": [
    {
      "type": "metric",
      "value": "24",
      "unit": "개",
      "label": "모아 둔 아이디어",
      "tone": "blue"
    },
    {
      "type": "media",
      "src": "../../assets/stage/shape-study.svg",
      "alt": "직접 만든 파랑·주황·보라 입체 도형",
      "fit": "cover",
      "focalPoint": "50% 58%"
    },
    {
      "type": "metric",
      "value": "6",
      "unit": "가지",
      "label": "연결한 작업",
      "tone": "orange"
    },
    {
      "type": "media",
      "src": "../../assets/stage/signal-study.svg",
      "alt": "빛나는 고리를 그린 가상 제품의 시각물",
      "fit": "contain"
    },
    {
      "type": "media",
      "src": "../../assets/photos/write.jpg",
      "alt": "야외에서 생각을 적는 인물의 스톡 사진",
      "fit": "cover",
      "focalPoint": "45% 50%"
    },
    {
      "type": "text",
      "label": "BUILD",
      "text": "생각을\n실행으로.",
      "tone": "white"
    },
    {
      "type": "text",
      "label": "CREATE",
      "text": "다르게\n만들어요.",
      "tone": "purple"
    },
    {
      "type": "media",
      "src": "../../assets/stage/work-panel.svg",
      "alt": "가상 프로젝트의 작업을 정리한 자체 제작 UI",
      "fit": "contain"
    },
    {
      "type": "media",
      "src": "../../assets/examples/report.svg",
      "alt": "자체 제작한 가상 관찰 보고서",
      "fit": "contain"
    },
    {
      "type": "metric",
      "value": "3",
      "unit": "단계",
      "label": "다음 행동으로 연결",
      "tone": "purple"
    },
    {
      "type": "media",
      "src": "../../assets/photos/landscape.jpg",
      "alt": "푸른 호수와 산의 풀컬러 스톡 사진",
      "fit": "cover"
    },
    {
      "type": "media",
      "src": "../../assets/examples/dashboard.svg",
      "alt": "가상 수치를 표시하는 자체 제작 대시보드",
      "fit": "contain"
    }
  ],
  "source": "구성용 가상 수치 · 자체 제작 UI와 시각물 · Pexels 스톡 사진"
}
```

---

<!-- stage
layout: icon-wall
quiet: true
tone: blue
notes: 서울 현장의 중앙 메시지와 외곽 앱 타일 구성을 참고했습니다. 이 예제는 22개 자체 의미 아이콘이며 실제 서비스·협력사 로고 목록이 아닙니다. alt와 icon 또는 사용자가 가진 로컬 src를 바꾸어 쓸 수 있습니다.
-->
# 함께 만들어요.

서로 다른 도구를, 하나의 흐름으로.

```stage
{
  "items": [
    {
      "icon": "brain",
      "alt": "생각 · 독자 아이콘",
      "tone": "blue"
    },
    {
      "icon": "price",
      "alt": "가격 · 독자 아이콘",
      "tone": "green"
    },
    {
      "icon": "speed",
      "alt": "속도 · 독자 아이콘",
      "tone": "orange"
    },
    {
      "icon": "image",
      "alt": "이미지 · 독자 아이콘",
      "tone": "purple"
    },
    {
      "icon": "voice",
      "alt": "음성 · 독자 아이콘",
      "tone": "yellow"
    },
    {
      "icon": "record",
      "alt": "기록 · 독자 아이콘",
      "tone": "blue"
    },
    {
      "icon": "compare",
      "alt": "비교 · 독자 아이콘",
      "tone": "green"
    },
    {
      "icon": "select",
      "alt": "선택 · 독자 아이콘",
      "tone": "orange"
    },
    {
      "icon": "share",
      "alt": "공유 · 독자 아이콘",
      "tone": "purple"
    },
    {
      "icon": "code",
      "alt": "코드 · 독자 아이콘",
      "tone": "yellow"
    },
    {
      "icon": "chart",
      "alt": "도표 · 독자 아이콘",
      "tone": "blue"
    },
    {
      "icon": "search",
      "alt": "검색 · 독자 아이콘",
      "tone": "green"
    },
    {
      "icon": "book",
      "alt": "읽기 · 독자 아이콘",
      "tone": "orange"
    },
    {
      "icon": "calendar",
      "alt": "일정 · 독자 아이콘",
      "tone": "purple"
    },
    {
      "icon": "mail",
      "alt": "메일 · 독자 아이콘",
      "tone": "yellow"
    },
    {
      "icon": "globe",
      "alt": "연결 · 독자 아이콘",
      "tone": "blue"
    },
    {
      "icon": "check",
      "alt": "확인 · 독자 아이콘",
      "tone": "green"
    },
    {
      "icon": "folder",
      "alt": "정리 · 독자 아이콘",
      "tone": "orange"
    },
    {
      "icon": "music",
      "alt": "음악 · 독자 아이콘",
      "tone": "purple"
    },
    {
      "icon": "spark",
      "alt": "발견 · 독자 아이콘",
      "tone": "yellow"
    },
    {
      "icon": "image",
      "alt": "사진 · 독자 아이콘",
      "tone": "blue"
    },
    {
      "icon": "code",
      "alt": "구현 · 독자 아이콘",
      "tone": "green"
    }
  ]
}
```

---

<!-- stage
layout: metric-pair
quiet: true
notes: 서울 현장의 파랑·주황 두 열 수치처럼 같은 위계의 값을 비교합니다. 값은 양식용 가상 숫자이며 실제 OpenAI·행사·제품의 지표가 아닙니다. 값·단위·라벨·비교 조건·출처를 함께 바꾸세요.
-->


```stage
{
  "items": [
    {
      "value": "24",
      "unit": "개",
      "label": "모아 둔 아이디어",
      "tone": "blue"
    },
    {
      "value": "6",
      "unit": "가지",
      "label": "연결한 작업",
      "tone": "orange"
    }
  ],
  "source": "양식 설명용 가상 수치 · 실제 측정 결과가 아닙니다."
}
```

---

<!-- stage
layout: closing
align: center
notes: Markdown 원문의 문장·아이콘 키·이미지 경로·숫자만 바꿔 같은 구성을 재사용합니다. 발표 재생에 AI 연결은 필요하지 않습니다.
-->
# 당신의 장면으로,
# 다음 이야기를.

문장과 자료를 바꾸면, 같은 양식으로 다시 발표합니다.

```stage
{
  "action": "slides.md 수정 → 다시 생성 → 발표"
}
```
