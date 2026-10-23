/*
 * 다른 주제를 위한 params 예제입니다.
 * 발표 폴더 전체를 복사한 뒤 이 파일의 내용으로 루트 content.js를 교체하세요.
 * 미디어 경로는 열린 index.html 기준입니다. app.js/styles.css는 바꾸지 않습니다.
 * 수치는 양식 설명용 가상 데이터입니다.
 */
window.PRESENTATION = {
  id: "project-review-example",
  title: "릴리스, 다음을 위한 회고",
  theme: "paper",
  speaker: "예시 발표자",
  date: "2027. 01. 15.",
  footer: "PROJECT REVIEW / EXAMPLE",
  slides: [
    {
      id: "start", layout: "cover", align: "center",
      title: ["릴리스,", "다음을 위한 회고."],
      subtitle: "관찰한 변화와 다음 행동을 연결합니다.",
      notes: "다른 주제에 재사용하는 예제입니다. 실제 프로젝트의 이름과 발표자로 바꾸세요."
    },
    {
      id: "question", layout: "statement", align: "center", tone: "blue",
      title: ["무엇이 달라졌고,", "다음에는 무엇을 할까요?"],
      highlight: "다음에는 무엇을 할까요?",
      notes: "전체 문장 중 하나의 의미 단위를 강조합니다."
    },
    {
      id: "compare", layout: "compare", title: "같은 기준에서, 전후를 봅니다.",
      left: { label: "이전", points: ["수동 확인", "담당자별 기록", "릴리스 뒤의 점검"] },
      right: { label: "이후", points: ["반복 확인 자동화", "공통 기준의 기록", "릴리스 전의 점검"] },
      notes: "좌우 항목을 같은 기준으로 비교하세요. 각 열은 최대 세 항목입니다."
    },
    {
      id: "evidence", layout: "chart", quiet: true,
      title: ["차이는,", "하나의 근거로."],
      subtitle: "같은 환경에서 측정한 값을 사용하세요.",
      chart: {
        title: "처리 시간 · 가상 예시", unit: "ms", max: 200,
        rows: [{ label: "이전", value: 160 }, { label: "이후", value: 95, highlight: true }]
      },
      source: "양식용 가상 수치 · 실제 측정과 출처로 교체하세요.",
      notes: "값뿐 아니라 단위·최댓값·측정 조건도 바꿉니다."
    },
    {
      id: "outputs", layout: "results", quiet: true,
      title: ["관찰을,", "다음 결과물로."],
      subtitle: "기록과 데이터를 나란히 놓습니다.",
      items: [
        { src: "assets/examples/report.svg", alt: "관찰을 정리한 예시 문서", label: "기록", fit: "contain" },
        { src: "assets/examples/dashboard.svg", alt: "가상 수치의 예시 대시보드", label: "관찰", fit: "contain" }
      ],
      source: "직접 만든 양식용 SVG · 실제 자료로 교체하세요.",
      notes: "사진과 문서의 크롭 정책은 다릅니다. 문서는 contain으로 내용을 보존합니다."
    },
    {
      id: "finish", layout: "closing", align: "center",
      title: ["다음 릴리스를,", "조금 더 분명하게."],
      takeaway: "발견한 한 가지를 다음 행동으로.", action: "질문을 받겠습니다.",
      notes: "마지막에는 다음 행동 하나를 정합니다."
    }
  ]
};
