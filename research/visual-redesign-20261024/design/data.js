window.REDESIGN_DATA = {
  "schemaVersion": 1,
  "meta": {
    "id": "first-value-12-weeks",
    "title": "첫 경험 개선을 위한 12주 실험",
    "fictional": true,
    "disclosure": "발표 양식용 가상 데이터 · 실제 회사나 실제 성과가 아닙니다.",
    "studyDesign": "기간별 코호트를 비교한 가상 관찰 예시. 무작위 대조 실험이나 인과 효과 추정이 아닙니다.",
    "reportingCutoff": "W13 종료: W12 가입자의 가입 후 7일 관찰까지 완료한 시점",
    "weekLabels": "W1–W12는 프로젝트 내 주차이며 실제 달력 날짜가 아닙니다."
  },
  "measurement": {
    "population": "해당 주에 처음 가입한 고유 사용자",
    "cohortAssignment": "최초 가입 주 기준. 한 사용자는 한 주차에만 포함됩니다.",
    "outcomeWindowDays": 7,
    "activation": "가입 후 7일 이내 첫 프로젝트를 공유한 고유 사용자",
    "activationRateDenominator": "해당 기간에 처음 가입한 고유 사용자 합계",
    "percentageDecimals": 1,
    "displayRounding": "원본 정수로 계산한 뒤 표시할 때만 소수 첫째 자리로 사사오입(81.25% → 81.3%). 정수 백분율의 .0은 생략할 수 있습니다.",
    "differenceUnit": "percentagePoints",
    "relativeChangeDecimals": 1
  },
  "weeklyCohorts": [
    {
      "week": 1,
      "registered": 300,
      "activated": 90
    },
    {
      "week": 2,
      "registered": 300,
      "activated": 102
    },
    {
      "week": 3,
      "registered": 300,
      "activated": 111
    },
    {
      "week": 4,
      "registered": 300,
      "activated": 117
    },
    {
      "week": 5,
      "registered": 300,
      "activated": 123
    },
    {
      "week": 6,
      "registered": 300,
      "activated": 132
    },
    {
      "week": 7,
      "registered": 300,
      "activated": 141
    },
    {
      "week": 8,
      "registered": 300,
      "activated": 150
    },
    {
      "week": 9,
      "registered": 300,
      "activated": 156
    },
    {
      "week": 10,
      "registered": 300,
      "activated": 162
    },
    {
      "week": 11,
      "registered": 300,
      "activated": 168
    },
    {
      "week": 12,
      "registered": 300,
      "activated": 174
    }
  ],
  "periods": [
    {
      "id": "baseline",
      "label": "기준",
      "fromWeek": 1,
      "toWeek": 4
    },
    {
      "id": "rollout",
      "label": "변경 적용",
      "fromWeek": 5,
      "toWeek": 8
    },
    {
      "id": "followup",
      "label": "후반 관찰",
      "fromWeek": 9,
      "toWeek": 12
    }
  ],
  "funnel": {
    "kind": "가상 관찰 집계",
    "window": "각 사용자 가입 후 7일 이내",
    "stages": [
      {
        "id": "registered",
        "label": "신규 가입",
        "source": "periodRegistered"
      },
      {
        "id": "started",
        "label": "프로젝트 시작",
        "source": "intermediateCounts"
      },
      {
        "id": "drafted",
        "label": "초안 완성",
        "source": "intermediateCounts"
      },
      {
        "id": "activated",
        "label": "첫 프로젝트 공유",
        "source": "periodActivated"
      }
    ],
    "intermediateCounts": [
      {
        "period": "baseline",
        "started": 840,
        "drafted": 600
      },
      {
        "period": "followup",
        "started": 960,
        "drafted": 780
      }
    ],
    "denominatorRule": "모든 단계의 전체 전환율 분모는 같은 기간 신규 가입자. 직전 단계 전환율을 쓰면 별도 라벨을 표시합니다."
  },
  "interviews": {
    "kind": "가상 정성 조사 분류",
    "period": "W2–W4",
    "sampleSize": 48,
    "sampling": "가입 후 7일 내 첫 프로젝트를 공유하지 않은 사용자 중 임의 선정한 가상 48명. 전체 사용자 대표 표본이 아닙니다.",
    "coding": "응답자별 대표 마찰 원인 하나만 분류한 상호 배타적 집계",
    "categories": [
      {
        "id": "blank-start",
        "label": "빈 화면에서 시작하기 어려움",
        "count": 18
      },
      {
        "id": "unclear-next-step",
        "label": "다음 행동이 불명확함",
        "count": 12
      },
      {
        "id": "share-confidence",
        "label": "공유 전 확신이 부족함",
        "count": 10
      },
      {
        "id": "other",
        "label": "기타",
        "count": 8
      }
    ]
  },
  "initiatives": {
    "kind": "가상 기획 판단",
    "scoreScale": {
      "min": 1,
      "max": 5,
      "impactMeaning": "첫 경험 마찰을 줄일 것으로 예상하는 정도",
      "effortMeaning": "상대적 구현 부담"
    },
    "scoresAreMeasuredOutcomes": false,
    "items": [
      {
        "id": "starter",
        "label": "시작 템플릿",
        "impactScore": 5,
        "effortScore": 2,
        "priority": "먼저 검증"
      },
      {
        "id": "guide",
        "label": "다음 행동 안내",
        "impactScore": 4,
        "effortScore": 2,
        "priority": "먼저 검증"
      },
      {
        "id": "share-preview",
        "label": "공유 미리보기",
        "impactScore": 4,
        "effortScore": 3,
        "priority": "함께 검증"
      },
      {
        "id": "dashboard",
        "label": "대시보드 확장",
        "impactScore": 2,
        "effortScore": 5,
        "priority": "뒤로 배치"
      }
    ]
  },
  "journeyMap": {
    "kind": "제안 기능과 여정 단계의 대응 관계. 실제 사용자 이동량이나 검증된 인과 관계가 아닙니다.",
    "nodes": [
      {
        "id": "registered",
        "label": "신규 가입"
      },
      {
        "id": "started",
        "label": "프로젝트 시작"
      },
      {
        "id": "drafted",
        "label": "초안 완성"
      },
      {
        "id": "activated",
        "label": "첫 프로젝트 공유"
      }
    ],
    "path": [
      "registered",
      "started",
      "drafted",
      "activated"
    ],
    "interventions": [
      {
        "initiative": "starter",
        "atStage": "started",
        "interviewReason": "blank-start"
      },
      {
        "initiative": "guide",
        "atStage": "drafted",
        "interviewReason": "unclear-next-step"
      },
      {
        "initiative": "share-preview",
        "atStage": "activated",
        "interviewReason": "share-confidence"
      }
    ]
  },
  "roadmap": {
    "kind": "가상 실행 계획",
    "unit": "주",
    "inclusiveEndpoints": true,
    "tasks": [
      {
        "id": "observe",
        "label": "기준 관찰·인터뷰",
        "fromWeek": 1,
        "toWeek": 4
      },
      {
        "id": "build",
        "label": "세 개선안 구현·점진 적용",
        "fromWeek": 5,
        "toWeek": 8
      },
      {
        "id": "follow",
        "label": "후반 코호트 관찰",
        "fromWeek": 9,
        "toWeek": 12
      }
    ],
    "followupNote": "W12 코호트의 7일 관찰 완료를 위해 집계 확정은 W13 종료에 수행합니다."
  },
  "effortAllocation": {
    "kind": "가상 투입 계획",
    "unit": "인·주",
    "definition": "한 사람의 1주 전일 투입에 해당하는 계획량. 프로젝트 경과 주수와 다릅니다.",
    "periodOrder": [
      "baseline",
      "rollout",
      "followup"
    ],
    "items": [
      {
        "id": "research",
        "label": "조사",
        "personWeeksByPeriod": [
          3,
          2,
          1
        ]
      },
      {
        "id": "design",
        "label": "설계",
        "personWeeksByPeriod": [
          1,
          3,
          2
        ]
      },
      {
        "id": "engineering",
        "label": "개발·품질 점검",
        "personWeeksByPeriod": [
          1,
          2,
          3
        ]
      }
    ]
  },
  "nextValidation": {
    "kind": "가상 후속 검증 계획 · 아직 수집하지 않은 결과",
    "period": "W14–W15에 설계·소규모 점검, 후속 성과 보고일은 별도 확정",
    "plans": [
      {
        "initiative": "starter",
        "question": "시작 템플릿이 빈 화면의 부담을 줄이는가?",
        "method": "신규 사용자의 첫 행동 관찰과 이해도 인터뷰",
        "measure": "프로젝트 시작 여부·막힌 지점",
        "decision": "동일한 가입 코호트·관찰창의 비교 설계를 먼저 확정"
      },
      {
        "initiative": "guide",
        "question": "다음 행동 안내가 초안 완성까지의 길을 명확히 하는가?",
        "method": "과업 기반 사용성 점검",
        "measure": "초안 완성 여부·잘못 이해한 단계",
        "decision": "혼동이 반복되는 문구·순서를 수정한 뒤 다시 점검"
      },
      {
        "initiative": "share-preview",
        "question": "공유 미리보기가 마지막 확신을 돕는가?",
        "method": "미리보기 이해 점검과 오류 경로 확인",
        "measure": "공유 의미 이해·오류 발생 지점",
        "decision": "안전하게 설명되는 흐름을 확인한 뒤 별도 비교 검증"
      }
    ],
    "note": "단기 사용성 점검의 결과를 활성화율 인과 효과로 바꾸어 말하지 않습니다."
  }
};
