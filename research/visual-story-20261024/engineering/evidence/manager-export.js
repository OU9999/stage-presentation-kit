/* Stage 발표 원본 — 이 파일을 발표 폴더의 content.js와 교체하세요. */
window.PRESENTATION = {
  "id": "first-value-12-weeks-manager-fixture",
  "title": "첫 경험 개선을 위한 12주 실험",
  "theme": "stage",
  "speaker": "가상 프로젝트 팀",
  "date": "12주 관찰 예시",
  "footer": "가상 데이터 · 실제 성과 아님",
  "slides": [
    {
      "id": "opening",
      "layout": "cover",
      "align": "center",
      "motion": "rise",
      "title": [
        "첫 경험을,",
        "검증한 다음 행동으로."
      ],
      "tone": "blue",
      "highlight": "검증한 다음 행동으로.",
      "subtitle": "12주 가상 제품 개선 프로젝트",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#periods\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다."
    },
    {
      "id": "observed-change",
      "layout": "metric-pair",
      "motion": "fade",
      "title": "활성화율의 관찰 차이, +20%p.",
      "items": [
        {
          "value": "35",
          "unit": "%",
          "label": "기준 · W1–W4",
          "tone": "white"
        },
        {
          "value": "55",
          "unit": "%",
          "label": "후반 관찰 · W9–W12",
          "tone": "blue"
        }
      ],
      "support": "420/1,200명 → 660/1,200명 · 가입 후 7일 내 첫 공유",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#periods\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다."
    },
    {
      "id": "funnel",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "첫 공유까지, 어디가 달랐을까?",
      "src": "assets/funnel.svg",
      "alt": "기준과 후반의 단계별 인원을 비교한 퍼널. 첫 공유는 420명에서 660명으로 관찰됐습니다.",
      "fit": "contain",
      "caption": "첫 공유 420명 → 660명 · 신규 가입 1,200명 / 1,200명",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#funnel\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#funnel"
    },
    {
      "id": "trend",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "변화가 이어지는 시간을 봅니다.",
      "src": "assets/trend.svg",
      "alt": "12개 가입 코호트의 7일 내 첫 공유율 추세. 첫 주 30%, 마지막 주 58%이며 인과 효과를 뜻하지 않습니다.",
      "fit": "contain",
      "caption": "주별 첫 공유율 30% → 58%. 모든 주는 같은 관찰창.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#weekly\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#weekly"
    },
    {
      "id": "composition",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "사람들이 말한, 첫 마찰.",
      "src": "assets/composition.svg",
      "alt": "선정한 가상 인터뷰 응답자 48명의 대표 마찰 분포. 전체 가입자의 발생률은 아닙니다.",
      "fit": "contain",
      "caption": "48명 중 18명: 빈 화면에서 시작하기 어려움.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#interviews\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#interviews"
    },
    {
      "id": "step-rates",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "다음 연결을, 더 자세히.",
      "src": "assets/step-rates.svg",
      "alt": "기준과 후반의 직전 단계 전환율 비교. 초안 완성 → 첫 프로젝트 공유 구간에서 가장 큰 관찰 변화폭이 나타났습니다.",
      "fit": "contain",
      "caption": "초안 완성 → 첫 프로젝트 공유 구간: 가장 큰 관찰 변화폭 +14.6%p.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#step-rates\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#step-rates"
    },
    {
      "id": "journey",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "마찰을, 다음 행동에 연결합니다.",
      "src": "assets/journey.svg",
      "alt": "가입부터 첫 공유까지의 여정에 제안 기능과 인터뷰 이유를 연결한 도식. 실제 이동량이나 인과 관계가 아닙니다.",
      "fit": "contain",
      "caption": "기능 제안과 경험 단계의 대응 관계를 그립니다.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#journey\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#journey"
    },
    {
      "id": "priorities",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "무엇을 먼저, 확인할까요?",
      "src": "assets/priorities.svg",
      "alt": "개선안의 예상 영향과 노력에 대한 가상 기획 점수. 측정 성과나 성공 확률이 아닙니다.",
      "fit": "contain",
      "caption": "예상 영향과 노력의 기획 판단으로 검증 순서를 정합니다.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#priorities\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#priorities"
    },
    {
      "id": "roadmap",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "관찰에서, 적용과 확인까지.",
      "src": "assets/roadmap.svg",
      "alt": "프로젝트 주차별 과업 일정. 각 과업의 시작과 종료를 모두 포함하며 마지막 코호트 추적 완료 시점을 구분합니다.",
      "fit": "contain",
      "caption": "12주 계획. 마지막 코호트의 추적 완료 후 집계를 확정합니다.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#roadmap\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#roadmap"
    },
    {
      "id": "effort",
      "layout": "image",
      "motion": "fade",
      "quiet": true,
      "title": "사람의 시간을, 나눠 봅니다.",
      "src": "assets/effort.svg",
      "alt": "역할과 기간별 투입 계획. 셀·행·열 합계를 인·주로 비교하며 전체 18인·주입니다.",
      "fit": "contain",
      "caption": "역할과 기간별 계획 18인·주. 경과 주수와 다른 단위입니다.",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#effort\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다.\n출처: 가상 데이터 · W1–W4 / W9–W12 · 상세 표 data.html#effort"
    },
    {
      "id": "next-validation",
      "layout": "steps",
      "motion": "stagger",
      "title": [
        "관찰 차이 다음에는,",
        "다시 검증합니다."
      ],
      "steps": [
        {
          "title": "시작 템플릿",
          "description": "신규 사용자의 첫 행동 관찰과 이해도 인터뷰"
        },
        {
          "title": "다음 행동 안내",
          "description": "과업 기반 사용성 점검"
        },
        {
          "title": "공유 미리보기",
          "description": "미리보기 이해 점검과 오류 경로 확인"
        }
      ],
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#next-validation\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다."
    },
    {
      "id": "closing",
      "layout": "closing",
      "align": "center",
      "motion": "rise",
      "title": [
        "작게 적용하고,",
        "같은 기준으로 다시 봅니다."
      ],
      "takeaway": "가상 관찰과 다음 검증 계획을 구분합니다.",
      "action": "정확한 수치·계산·표 열기",
      "url": "data.html",
      "notes": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.\n기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.\n집계 정의: 가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자\nW13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점\n수치·관계·계산: data.html#next-validation\n수정 원본: data.json. slides.md·SVG·data.html은 생성물입니다."
    }
  ]
};
