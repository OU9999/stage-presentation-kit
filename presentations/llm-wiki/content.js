/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "23145e8c452a041ef55d7489c8fd00da96914a1e98b03d3ad03d423f52fcde58"
  },
  "id": "llm-wiki",
  "title": "LLM Wiki: 답을 근거와 연결해 남기기",
  "theme": "stage",
  "footer": "Zoom AI 스터디 · 20분 · 2026-10-28",
  "slides": [
    {
      "layout": "blocks",
      "title": "전에 찾은 답, 이유도 찾을 수 있나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "전에 찾은 답, 이유도 찾을 수 있나요?"
          }
        ],
        "position": {
          "line": 10,
          "endLine": 10
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "답과 함께 근거와 선택의 이유를 남겨 봅시다."
                }
              ],
              "position": {
                "line": 12,
                "endLine": 12
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 12,
            "endLine": 12
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LLM Wiki에서 출발하는 20분 AI 스터디"
            }
          ],
          "position": {
            "line": 14,
            "endLine": 14
          }
        }
      ],
      "origin": {
        "line": 6,
        "endLine": 14
      },
      "tone": "blue",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "답을 이어 가는 파일 위키",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "답을 이어 가는 파일 위키"
          }
        ],
        "position": {
          "line": 22,
          "endLine": 22
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LLM이 자료를 읽고, 서로 연결된 Markdown 페이지를 계속 갱신합니다."
            }
          ],
          "position": {
            "line": 24,
            "endLine": 24
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Karpathy의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "설계 아이디어"
                }
              ],
              "position": {
                "line": 26,
                "endLine": 26
              }
            },
            {
              "type": "text",
              "value": "입니다. 특정 완제품이나 표준은 아닙니다."
            }
          ],
          "position": {
            "line": 26,
            "endLine": 26
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S1 · LLM Wiki 원문"
                }
              ],
              "position": {
                "line": 28,
                "endLine": 28
              }
            }
          ],
          "position": {
            "line": 28,
            "endLine": 28
          }
        }
      ],
      "origin": {
        "line": 18,
        "endLine": 28
      },
      "tone": "purple",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "자료와 위키, 옆에는 작업 규칙",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "자료와 위키, 옆에는 작업 규칙"
          }
        ],
        "position": {
          "line": 37,
          "endLine": 37
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/3933d033dc61-wiki-layers.svg",
                "alt": "원자료 raw는 보존하고 연결된 wiki 파일을 갱신합니다. schema는 다음 단계가 아니라 옆에서 작업 방법을 정하는 규칙입니다.",
                "title": "자체 제작 개념도 · S1의 3층 설계"
              },
              "children": [],
              "position": {
                "line": 39,
                "endLine": 39
              }
            }
          ],
          "position": {
            "line": 39,
            "endLine": 39
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "raw는 보존, wiki는 갱신. schema는 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "옆에서 작업법을 정하는 규칙"
                }
              ],
              "position": {
                "line": 41,
                "endLine": 41
              }
            },
            {
              "type": "text",
              "value": "입니다. 규칙 준수는 보장되지 않습니다."
            }
          ],
          "position": {
            "line": 41,
            "endLine": 41
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/3933d033dc61-wiki-layers.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본"
                }
              ],
              "position": {
                "line": 43,
                "endLine": 43
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S1 · 3층 설계 원문"
                }
              ],
              "position": {
                "line": 43,
                "endLine": 43
              }
            }
          ],
          "position": {
            "line": 43,
            "endLine": 43
          }
        }
      ],
      "origin": {
        "line": 32,
        "endLine": 43
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "일정뿐 아니라 개념과 질문도 연결",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "일정뿐 아니라 개념과 질문도 연결"
          }
        ],
        "position": {
          "line": 52,
          "endLine": 52
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/3fa6045e0553-knowledge-map.svg",
                "alt": "합성 예제. E1 공지 1판은 운영 페이지, E3 읽기 메모는 개념 페이지, E4 질문 메모는 질문 페이지에 연결됩니다. 운영·개념·질문 페이지를 서로 연결하고, 유용한 답은 검토한 뒤 위키 파일에 남깁니다.",
                "title": "합성 예제 · AI 스터디 준비 위키"
              },
              "children": [],
              "position": {
                "line": 54,
                "endLine": 54
              }
            }
          ],
          "position": {
            "line": 54,
            "endLine": 54
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 공지 E1·읽기 메모 E3·질문 E4 → 운영·개념·질문 파일. 유용한 답은 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "사람 검토 후 wiki에 저장"
                }
              ],
              "position": {
                "line": 56,
                "endLine": 56
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 56,
            "endLine": 56
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "페이지 구성과 검토 후 저장은 우리 제안입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/3fa6045e0553-knowledge-map.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본"
                }
              ],
              "position": {
                "line": 58,
                "endLine": 58
              }
            }
          ],
          "position": {
            "line": 58,
            "endLine": 58
          }
        }
      ],
      "origin": {
        "line": 47,
        "endLine": 58
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "읽고, 묻고, 다시 점검하기",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "읽고, 묻고, 다시 점검하기"
          }
        ],
        "position": {
          "line": 66,
          "endLine": 66
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "ingest · 반영"
            }
          ],
          "position": {
            "line": 72,
            "endLine": 72
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새 자료를 읽고 관련 페이지에 연결합니다."
            }
          ],
          "position": {
            "line": 74,
            "endLine": 74
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "query · 질문"
            }
          ],
          "position": {
            "line": 80,
            "endLine": 80
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문에 답하고, 유용한 결과를 다시 남깁니다."
            }
          ],
          "position": {
            "line": 82,
            "endLine": 82
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "lint · 점검"
            }
          ],
          "position": {
            "line": 88,
            "endLine": 88
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "낡은 주장·빠진 연결·모순을 살핍니다. 누락은 가능합니다."
            }
          ],
          "position": {
            "line": 90,
            "endLine": 90
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "index · 찾기"
            }
          ],
          "position": {
            "line": 96,
            "endLine": 96
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "index"
                }
              ],
              "position": {
                "line": 98,
                "endLine": 98
              }
            },
            {
              "type": "text",
              "value": "는 페이지 목록입니다."
            }
          ],
          "position": {
            "line": 98,
            "endLine": 98
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "log · 변경 이력"
            }
          ],
          "position": {
            "line": 104,
            "endLine": 104
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "log"
                }
              ],
              "position": {
                "line": 106,
                "endLine": 106
              }
            },
            {
              "type": "text",
              "value": "는 무엇을 언제 바꿨는지 남깁니다."
            }
          ],
          "position": {
            "line": 106,
            "endLine": 106
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S1 · 반복 작업 원문"
                }
              ],
              "position": {
                "line": 108,
                "endLine": 108
              }
            }
          ],
          "position": {
            "line": 108,
            "endLine": 108
          }
        }
      ],
      "origin": {
        "line": 62,
        "endLine": 108
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "icon": "folder",
            "tone": "blue",
            "origin": {
              "line": 68,
              "endLine": 71
            }
          },
          {
            "start": 2,
            "end": 4,
            "icon": "search",
            "tone": "purple",
            "origin": {
              "line": 76,
              "endLine": 79
            }
          },
          {
            "start": 4,
            "end": 6,
            "icon": "check",
            "tone": "green",
            "origin": {
              "line": 84,
              "endLine": 87
            }
          },
          {
            "start": 6,
            "end": 8,
            "icon": "record",
            "tone": "neutral",
            "origin": {
              "line": 92,
              "endLine": 95
            }
          },
          {
            "start": 8,
            "end": 11,
            "icon": "record",
            "tone": "neutral",
            "origin": {
              "line": 100,
              "endLine": 103
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "유용한 답도 다음 질문의 바탕으로",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "유용한 답도 다음 질문의 바탕으로"
          }
        ],
        "position": {
          "line": 116,
          "endLine": 116
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "질문 페이지 · E4"
            }
          ],
          "position": {
            "line": 123,
            "endLine": 123
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“답에 링크가 있으면 문장 전체를 믿어도 될까요?”"
            }
          ],
          "position": {
            "line": 125,
            "endLine": 125
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 예제"
            }
          ],
          "position": {
            "line": 127,
            "endLine": 127
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "검토한 답 → 파일에 남김"
            }
          ],
          "position": {
            "line": 133,
            "endLine": 133
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“링크된 자료가 이 문장과 적용 범위를 실제로 지원하는지 확인합니다.”"
            }
          ],
          "position": {
            "line": 135,
            "endLine": 135
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "개념 페이지에 연결하고 다음 질문에서 다시 씁니다. 합성 답안이며 자동 저장은 하지 않습니다."
            }
          ],
          "position": {
            "line": 137,
            "endLine": 137
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "링크는 확인할 단서"
            }
          ],
          "position": {
            "line": 143,
            "endLine": 143
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "출처 링크가 정답이나 신뢰를 보장하지는 않습니다."
            }
          ],
          "position": {
            "line": 145,
            "endLine": 145
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S11 · 출처 정보 개요"
                }
              ],
              "position": {
                "line": 147,
                "endLine": 147
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/abs/2005.11401"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S12 · 한계 참고"
                }
              ],
              "position": {
                "line": 147,
                "endLine": 147
              }
            }
          ],
          "position": {
            "line": 147,
            "endLine": 147
          }
        }
      ],
      "origin": {
        "line": 112,
        "endLine": 147
      },
      "tone": "purple",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "primary": true,
            "tone": "purple",
            "icon": "search",
            "origin": {
              "line": 118,
              "endLine": 122
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "icon": "book",
            "origin": {
              "line": 129,
              "endLine": 132
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "icon": "check",
            "origin": {
              "line": 139,
              "endLine": 142
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "이 자료로 “매주”까지 말할 수 있을까요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이 자료로 “매주”까지 말할 수 있을까요?"
          }
        ],
        "position": {
          "line": 155,
          "endLine": 155
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "자료 · E1"
            }
          ],
          "position": {
            "line": 161,
            "endLine": 161
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“11월 5일 AI 스터디는 오후 8시에 시작한다.”"
            }
          ],
          "position": {
            "line": 163,
            "endLine": 163
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 공지 1판 · 2026-10-20"
            }
          ],
          "position": {
            "line": 165,
            "endLine": 165
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "지원되는 주장 · EC1"
            }
          ],
          "position": {
            "line": 171,
            "endLine": 171
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“11월 5일 시작은 오후 8시.”"
            }
          ],
          "position": {
            "line": 173,
            "endLine": 173
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 주장 · 1판 기준 확인"
            }
          ],
          "position": {
            "line": 175,
            "endLine": 175
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "근거가 부족한 확장"
            }
          ],
          "position": {
            "line": 181,
            "endLine": 181
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“매주 오후 8시.” → 반복 주기는 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "미확인"
                }
              ],
              "position": {
                "line": 183,
                "endLine": 183
              }
            },
            {
              "type": "text",
              "value": "입니다."
            }
          ],
          "position": {
            "line": 183,
            "endLine": 183
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 → 주장 → 결정 카드는 우리 제안이며 표준 양식이 아닙니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/"
              },
              "children": [
                {
                  "type": "text",
                  "value": "착안 S11"
                }
              ],
              "position": {
                "line": 185,
                "endLine": 185
              }
            }
          ],
          "position": {
            "line": 185,
            "endLine": 185
          }
        }
      ],
      "origin": {
        "line": 151,
        "endLine": 185
      },
      "tone": "orange",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "neutral",
            "icon": "record",
            "origin": {
              "line": 157,
              "endLine": 160
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "icon": "check",
            "origin": {
              "line": 167,
              "endLine": 170
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "icon": "search",
            "origin": {
              "line": 177,
              "endLine": 180
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "사실과 우리가 선택한 행동은 다릅니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "사실과 우리가 선택한 행동은 다릅니다"
          }
        ],
        "position": {
          "line": 193,
          "endLine": 193
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "확인한 주장 · EC1"
            }
          ],
          "position": {
            "line": 199,
            "endLine": 199
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "11월 5일 시작은 오후 8시."
            }
          ],
          "position": {
            "line": 201,
            "endLine": 201
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 예제 · E1의 1판 기준"
            }
          ],
          "position": {
            "line": 203,
            "endLine": 203
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "운영자의 선택"
            }
          ],
          "position": {
            "line": 209,
            "endLine": 209
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "1판 기준 오후 8시 안내를 사용하기로 합니다."
            }
          ],
          "position": {
            "line": 211,
            "endLine": 211
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 결정 ED1 · 당시 accepted · 담당 민지 · 2026-10-21"
            }
          ],
          "position": {
            "line": 213,
            "endLine": 213
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "이유와 재검토도 남김"
            }
          ],
          "position": {
            "line": 219,
            "endLine": 219
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "혼선을 줄이기 위해 선택. 대안은 확인까지 안내 보류. 공지가 바뀌면 재검토합니다."
            }
          ],
          "position": {
            "line": 221,
            "endLine": 221
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S10 · 결정 기록 원문"
                }
              ],
              "position": {
                "line": 223,
                "endLine": 223
              }
            },
            {
              "type": "text",
              "value": " · 스터디 적용은 우리 제안 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/58c5bbb5da45-decision-example.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "전체 결정 카드"
                }
              ],
              "position": {
                "line": 223,
                "endLine": 223
              }
            }
          ],
          "position": {
            "line": 223,
            "endLine": 223
          }
        }
      ],
      "origin": {
        "line": 189,
        "endLine": 223
      },
      "tone": "yellow",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "neutral",
            "icon": "record",
            "origin": {
              "line": 195,
              "endLine": 198
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "yellow",
            "icon": "select",
            "origin": {
              "line": 205,
              "endLine": 208
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "icon": "compare",
            "origin": {
              "line": 215,
              "endLine": 218
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "새 날짜보다, 명시적인 변경을 확인",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 날짜보다, 명시적인 변경을 확인"
          }
        ],
        "position": {
          "line": 231,
          "endLine": 231
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "새 자료 · E2"
            }
          ],
          "position": {
            "line": 237,
            "endLine": 237
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“이번 11월 5일 모임은 오후 8시 30분으로 변경한다.”"
            }
          ],
          "position": {
            "line": 239,
            "endLine": 239
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 변경 공지 2판 · 2026-10-27"
            }
          ],
          "position": {
            "line": 241,
            "endLine": 241
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "새 주장 · EC2"
            }
          ],
          "position": {
            "line": 247,
            "endLine": 247
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“11월 5일 시작은 오후 8시 30분.”"
            }
          ],
          "position": {
            "line": 249,
            "endLine": 249
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 주장 · 해당 날짜만 지원합니다. 다른 날짜로 넓히지 않습니다."
            }
          ],
          "position": {
            "line": 251,
            "endLine": 251
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "사람이 영향 범위 검토"
            }
          ],
          "position": {
            "line": 257,
            "endLine": 257
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "운영 페이지·기존 주장·안내 결정을 함께 확인합니다."
            }
          ],
          "position": {
            "line": 259,
            "endLine": 259
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "우리 제안 · 나중 자료라는 이유만으로 자동 교체하지 않습니다."
            }
          ],
          "position": {
            "line": 261,
            "endLine": 261
          }
        }
      ],
      "origin": {
        "line": 227,
        "endLine": 261
      },
      "tone": "orange",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "icon": "mail",
            "origin": {
              "line": 233,
              "endLine": 236
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "icon": "check",
            "origin": {
              "line": 243,
              "endLine": 246
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "purple",
            "icon": "search",
            "origin": {
              "line": 253,
              "endLine": 256
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "바꾸되, 예전 이유는 지우지 않습니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "바꾸되, 예전 이유는 지우지 않습니다"
          }
        ],
        "position": {
          "line": 270,
          "endLine": 270
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/7fa4c28da602-change-trace.svg",
                "alt": "합성 예제. 변경 공지 E2의 명시적 변경을 확인해 EC2를 연결하고 사람이 ED2를 승인합니다. ED1은 삭제하지 않고 superseded by ED2로 보존합니다. 이번 11월 5일 안내만 교체하며 관련 안내는 점검할 일로 남깁니다.",
                "title": "합성 예제 · E2 → EC2 → ED2, ED1의 대체 이력 보존"
              },
              "children": [],
              "position": {
                "line": 272,
                "endLine": 272
              }
            }
          ],
          "position": {
            "line": 272,
            "endLine": 272
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 변경 공지 → 새 주장 → 새 안내 결정. 11월 5일 안내만 20:30으로. 이전 결정 ED1은 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "superseded by ED2"
                }
              ],
              "position": {
                "line": 274,
                "endLine": 274
              }
            },
            {
              "type": "text",
              "value": "로 보존합니다."
            }
          ],
          "position": {
            "line": 274,
            "endLine": 274
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "합성 ED2 · accepted · 2026-10-28. 초대장 등은 점검할 일이며 실제 수정 완료를 뜻하지 않습니다."
            }
          ],
          "position": {
            "line": 276,
            "endLine": 276
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/7fa4c28da602-change-trace.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본"
                }
              ],
              "position": {
                "line": 278,
                "endLine": 278
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S10 · 대체 이력 원문"
                }
              ],
              "position": {
                "line": 278,
                "endLine": 278
              }
            },
            {
              "type": "text",
              "value": " · 검토 절차는 우리 제안"
            }
          ],
          "position": {
            "line": 278,
            "endLine": 278
          }
        }
      ],
      "origin": {
        "line": 265,
        "endLine": 278
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "남기는 파일과 모델 학습은 구분합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "남기는 파일과 모델 학습은 구분합니다"
          }
        ],
        "position": {
          "line": 286,
          "endLine": 286
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "파일 위키"
            }
          ],
          "position": {
            "line": 292,
            "endLine": 292
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이 사례에서 지속되는 것은 열어 볼 수 있는 Markdown 파일입니다."
            }
          ],
          "position": {
            "line": 294,
            "endLine": 294
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설계 해석 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S1 원문"
                }
              ],
              "position": {
                "line": 296,
                "endLine": 296
              }
            }
          ],
          "position": {
            "line": 296,
            "endLine": 296
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "모델 학습"
            }
          ],
          "position": {
            "line": 302,
            "endLine": 302
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "모델 가중치를 바꾸는 일입니다. 파일 저장 자체가 모델 학습은 아닙니다."
            }
          ],
          "position": {
            "line": 304,
            "endLine": 304
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이 설계 범위의 구분입니다."
            }
          ],
          "position": {
            "line": 306,
            "endLine": 306
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "RAG와도 함께"
            }
          ],
          "position": {
            "line": 312,
            "endLine": 312
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "관련 자료를 검색해 답 생성에 씁니다. 위키도 검색과 함께 쓸 수 있습니다."
            }
          ],
          "position": {
            "line": 314,
            "endLine": 314
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "정의는 원문, 병행은 해석 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/abs/2005.11401"
              },
              "children": [
                {
                  "type": "text",
                  "value": "S12 RAG 논문"
                }
              ],
              "position": {
                "line": 316,
                "endLine": 316
              }
            }
          ],
          "position": {
            "line": 316,
            "endLine": 316
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "확인은 계속 필요"
            }
          ],
          "position": {
            "line": 322,
            "endLine": 322
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "출처가 있어도 오답·낡은 정보·검토 누락은 가능합니다."
            }
          ],
          "position": {
            "line": 324,
            "endLine": 324
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "도입 효과는 미측정"
            }
          ],
          "position": {
            "line": 330,
            "endLine": 330
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "정확도·절감 효과·유지비는 이번에 측정하지 않았습니다."
            }
          ],
          "position": {
            "line": 332,
            "endLine": 332
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "근거와 문장을 대조하는 검토 제안입니다."
            }
          ],
          "position": {
            "line": 334,
            "endLine": 334
          }
        }
      ],
      "origin": {
        "line": 282,
        "endLine": 334
      },
      "tone": "purple",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "blue",
            "icon": "folder",
            "origin": {
              "line": 288,
              "endLine": 291
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "purple",
            "icon": "brain",
            "origin": {
              "line": 298,
              "endLine": 301
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "green",
            "icon": "search",
            "origin": {
              "line": 308,
              "endLine": 311
            }
          },
          {
            "start": 9,
            "end": 11,
            "tone": "orange",
            "icon": "check",
            "origin": {
              "line": 318,
              "endLine": 321
            }
          },
          {
            "start": 11,
            "end": 14,
            "tone": "neutral",
            "icon": "compare",
            "origin": {
              "line": 326,
              "endLine": 329
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "자료 하나, 주장 하나, 결정 하나부터",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "자료 하나, 주장 하나, 결정 하나부터"
          }
        ],
        "position": {
          "line": 342,
          "endLine": 342
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "무엇을 읽었고, 어디까지 알며, 왜 선택했나요?"
                }
              ],
              "position": {
                "line": 344,
                "endLine": 344
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 344,
            "endLine": 344
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "남은 2분: 내 메모에서 다시 찾고 싶은 질문을 나눠 봅시다."
            }
          ],
          "position": {
            "line": 346,
            "endLine": 346
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/0827f3843e16-sources.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "출처·근거"
                }
              ],
              "position": {
                "line": 348,
                "endLine": 348
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/58c5bbb5da45-decision-example.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "합성 결정 카드"
                }
              ],
              "position": {
                "line": 348,
                "endLine": 348
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/c122e725c09d-starter-template.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "시작 템플릿"
                }
              ],
              "position": {
                "line": 348,
                "endLine": 348
              }
            },
            {
              "type": "text",
              "value": " · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/eeba1d88fabe-speaker-guide.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "진행 가이드 · 공개"
                }
              ],
              "position": {
                "line": 348,
                "endLine": 348
              }
            }
          ],
          "position": {
            "line": 348,
            "endLine": 348
          }
        }
      ],
      "origin": {
        "line": 338,
        "endLine": 348
      },
      "tone": "blue",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
