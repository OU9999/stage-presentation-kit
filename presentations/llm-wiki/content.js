/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "4b0484e0763d24d3811af1b14e69dc34571a9e1ca4b33e03e7ec09b2f1edc83c"
  },
  "id": "llm-wiki",
  "title": "LLM Wiki: 읽은 자료를 다음 질문으로 잇기",
  "theme": "stage",
  "footer": "Zoom AI 스터디 · 18분 발표 + 2분 질문 · 2026-10-28",
  "slides": [
    {
      "layout": "blocks",
      "title": "다음 주에도 이 답을 설명할 수 있나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 주에도 이 답을 설명할 수 있나요?"
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
                  "value": "답에서 근거로, 근거에서 다음 질문으로."
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
              "value": "RAG와 LoRA를 읽는 작은 AI 스터디"
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
      "title": "읽고 고치는 파일이 남습니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "읽고 고치는 파일이 남습니다"
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
              "value": "LLM이 자료를 읽고, 연결된 Markdown 위키를 갱신합니다."
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
              "value": "실제 원문을 읽는 가상 스터디로 따라가 봅니다."
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
              "type": "text",
              "value": "Karpathy의 설계 아이디어 · "
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
                  "value": "LLM Wiki 원문"
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
      "title": "원자료는 보존, 설명은 갱신",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원자료는 보존, 설명은 갱신"
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
                "src": "assets/9de04be0b94d-wiki-layers.svg",
                "alt": "원자료에서 연결된 위키를 갱신합니다. schema는 이 흐름의 옆에서 보존·근거·검토 방법을 정하는 작업 규칙입니다."
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
              "value": "schema는 작업법을 정합니다. 규칙이 실제로 지켜졌는지는 결과에서 확인합니다. "
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
                  "value": "설계 원문"
                }
              ],
              "position": {
                "line": 41,
                "endLine": 41
              }
            }
          ],
          "position": {
            "line": 41,
            "endLine": 41
          }
        }
      ],
      "origin": {
        "line": 32,
        "endLine": 41
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "세 원문에서, 읽기 메모로",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "세 원문에서, 읽기 메모로"
          }
        ],
        "position": {
          "line": 49,
          "endLine": 49
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "RAG · §2"
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
              "value": "검색한 문서를 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "답 생성에 사용"
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
              "value": "가상 메모의 질문: 이 논문에는 학습도 있을까?"
            }
          ],
          "position": {
            "line": 58,
            "endLine": 58
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
                "href": "https://arxiv.org/html/2005.11401v4#S2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Methods · Training"
                }
              ],
              "position": {
                "line": 60,
                "endLine": 60
              }
            }
          ],
          "position": {
            "line": 60,
            "endLine": 60
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LoRA · 초록"
            }
          ],
          "position": {
            "line": 65,
            "endLine": 65
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기본 가중치는 고정, "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "추가 행렬은 학습"
                }
              ],
              "position": {
                "line": 67,
                "endLine": 67
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 67,
            "endLine": 67
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 메모의 질문: 무엇이 바뀌는가?"
            }
          ],
          "position": {
            "line": 69,
            "endLine": 69
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
                "href": "https://arxiv.org/html/2106.09685v2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Abstract · §4.1"
                }
              ],
              "position": {
                "line": 71,
                "endLine": 71
              }
            }
          ],
          "position": {
            "line": 71,
            "endLine": 71
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LLM Wiki · 설계"
            }
          ],
          "position": {
            "line": 76,
            "endLine": 76
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽고 정리한 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "파일을 계속 유지"
                }
              ],
              "position": {
                "line": 78,
                "endLine": 78
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 78,
            "endLine": 78
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 메모의 질문: 다음에 어떤 파일을 읽을까?"
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Architecture · Operations"
                }
              ],
              "position": {
                "line": 82,
                "endLine": 82
              }
            }
          ],
          "position": {
            "line": 82,
            "endLine": 82
          }
        }
      ],
      "origin": {
        "line": 45,
        "endLine": 82
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "blue",
            "origin": {
              "line": 51,
              "endLine": 53
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "purple",
            "origin": {
              "line": 62,
              "endLine": 64
            }
          },
          {
            "start": 8,
            "end": 12,
            "tone": "green",
            "origin": {
              "line": 73,
              "endLine": 75
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "검색과 모델 적응, 바뀌는 대상부터",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "검색과 모델 적응, 바뀌는 대상부터"
          }
        ],
        "position": {
          "line": 91,
          "endLine": 91
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "검색 문맥"
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
              "type": "text",
              "value": "관련 문서 → 답을 만들 때 읽는 문맥"
            }
          ],
          "position": {
            "line": 98,
            "endLine": 98
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "RAG 논문의 모델은 검색한 문서를 생성에 활용합니다."
            }
          ],
          "position": {
            "line": 100,
            "endLine": 100
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
                "href": "https://arxiv.org/html/2005.11401v4#S2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "§2 Methods"
                }
              ],
              "position": {
                "line": 102,
                "endLine": 102
              }
            },
            {
              "type": "text",
              "value": " · 원논문에는 "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "§2.4 Training"
                }
              ],
              "position": {
                "line": 102,
                "endLine": 102
              }
            },
            {
              "type": "text",
              "value": "도 있습니다."
            }
          ],
          "position": {
            "line": 102,
            "endLine": 102
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "학습 가능한 매개변수"
            }
          ],
          "position": {
            "line": 107,
            "endLine": 107
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "훈련 데이터 → 추가 행렬의 갱신"
            }
          ],
          "position": {
            "line": 109,
            "endLine": 109
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LoRA는 기본 가중치를 고정하고 저랭크 행렬을 학습합니다."
            }
          ],
          "position": {
            "line": 111,
            "endLine": 111
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
                "href": "https://arxiv.org/html/2106.09685v2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Abstract · §4.1"
                }
              ],
              "position": {
                "line": 113,
                "endLine": 113
              }
            }
          ],
          "position": {
            "line": 113,
            "endLine": 113
          }
        }
      ],
      "origin": {
        "line": 87,
        "endLine": 113
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "blue",
            "origin": {
              "line": 93,
              "endLine": 95
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "purple",
            "origin": {
              "line": 104,
              "endLine": 106
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "같은 질문: 다음 답에 어떻게 반영되나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "같은 질문: 다음 답에 어떻게 반영되나요?"
          }
        ],
        "position": {
          "line": 121,
          "endLine": 121
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "위키 갱신"
            }
          ],
          "position": {
            "line": 126,
            "endLine": 126
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설명·연결 파일을 고칩니다."
            }
          ],
          "position": {
            "line": 128,
            "endLine": 128
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 질문에서 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "필요한 파일을 다시 읽습니다."
                }
              ],
              "position": {
                "line": 130,
                "endLine": 130
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 130,
            "endLine": 130
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "확인할 것: 주장 범위·링크·수정 이유"
            }
          ],
          "position": {
            "line": 132,
            "endLine": 132
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
                  "value": "파일 축적의 설계"
                }
              ],
              "position": {
                "line": 134,
                "endLine": 134
              }
            }
          ],
          "position": {
            "line": 134,
            "endLine": 134
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "검색을 이용한 생성"
            }
          ],
          "position": {
            "line": 139,
            "endLine": 139
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "관련 자료를 찾습니다."
            }
          ],
          "position": {
            "line": 141,
            "endLine": 141
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "찾은 자료를 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "답의 문맥에 넣습니다."
                }
              ],
              "position": {
                "line": 143,
                "endLine": 143
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "확인할 것: 검색 누락·관련성·답의 지원"
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
                "href": "https://arxiv.org/html/2005.11401v4#S2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "RAG §2"
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
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LoRA 모델 적응"
            }
          ],
          "position": {
            "line": 152,
            "endLine": 152
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "추가 행렬을 학습합니다."
            }
          ],
          "position": {
            "line": 154,
            "endLine": 154
          }
        },
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
                  "value": "학습 결과를 적용한 모델"
                }
              ],
              "position": {
                "line": 156,
                "endLine": 156
              }
            },
            {
              "type": "text",
              "value": "로 답합니다."
            }
          ],
          "position": {
            "line": 156,
            "endLine": 156
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "확인할 것: 데이터·목표·평가·적용 대상"
            }
          ],
          "position": {
            "line": 158,
            "endLine": 158
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
                "href": "https://arxiv.org/html/2106.09685v2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "LoRA Abstract·§4.1"
                }
              ],
              "position": {
                "line": 160,
                "endLine": 160
              }
            }
          ],
          "position": {
            "line": 160,
            "endLine": 160
          }
        }
      ],
      "origin": {
        "line": 117,
        "endLine": 160
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 123,
              "endLine": 125
            }
          },
          {
            "start": 5,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 136,
              "endLine": 138
            }
          },
          {
            "start": 10,
            "end": 15,
            "tone": "purple",
            "origin": {
              "line": 149,
              "endLine": 151
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "연결은 근거로 돌아가는 길",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "연결은 근거로 돌아가는 길"
          }
        ],
        "position": {
          "line": 169,
          "endLine": 169
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
                "src": "assets/07411af0788b-knowledge-map.svg",
                "alt": "가상 학습 경로. RAG는 검색 개념에, LoRA는 모델 적응 개념에, LLM Wiki 설계는 파일 정리에 연결됩니다. 같은 질문으로 비교하고 위키 수정은 학습인가에 답합니다. 검토한 답은 관련 개념과 비교에 다시 연결합니다."
              },
              "children": [],
              "position": {
                "line": 171,
                "endLine": 171
              }
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
              "value": "질문에서 원문으로 근거를 되짚고, 원문에서 질문으로 수정할 후보를 찾습니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#5-%EC%97%B0%EA%B2%B0%EB%8F%84%EB%A5%BC-%EC%9D%BD%EB%8A%94-%EB%B2%95"
              },
              "children": [
                {
                  "type": "text",
                  "value": "파일 예제와 읽는 법"
                }
              ],
              "position": {
                "line": 173,
                "endLine": 173
              }
            }
          ],
          "position": {
            "line": 173,
            "endLine": 173
          }
        }
      ],
      "origin": {
        "line": 164,
        "endLine": 173
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "질문 · 위키 파일을 고치면 모델도 학습하나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "질문 · 위키 파일을 고치면 모델도 학습하나요?"
          }
        ],
        "position": {
          "line": 181,
          "endLine": 181
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "blockquote",
          "children": [
            {
              "type": "element",
              "tag": "p",
              "children": [
                {
                  "type": "text",
                  "value": "이 예제에서 바뀌는 것은 파일입니다."
                },
                {
                  "type": "text",
                  "value": "\n"
                },
                {
                  "type": "text",
                  "value": "다음 답에 쓰려면 다시 읽어야 합니다."
                }
              ],
              "position": {
                "line": 183,
                "endLine": 184
              }
            }
          ],
          "position": {
            "line": 183,
            "endLine": 184
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "모델 매개변수를 학습하는 절차와 구분합니다. 근거·범위를 검토한 답을 질문 페이지에 저장하고, 개념·비교 페이지에 연결합니다."
            }
          ],
          "position": {
            "line": 186,
            "endLine": 186
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "남은 질문: 우리 자료에서 필요한 파일을 제대로 찾을 수 있을까요? "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#6-%EC%A7%88%EB%AC%B8%EC%9D%98-%EB%8B%B5%EC%9D%84-%EB%8B%A4%EC%8B%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8A%94-query"
              },
              "children": [
                {
                  "type": "text",
                  "value": "가상 질문 페이지 전문"
                }
              ],
              "position": {
                "line": 188,
                "endLine": 188
              }
            }
          ],
          "position": {
            "line": 188,
            "endLine": 188
          }
        }
      ],
      "origin": {
        "line": 177,
        "endLine": 188
      },
      "tone": "purple",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "새 근거는 예전 문장을 고칩니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 근거는 예전 문장을 고칩니다"
          }
        ],
        "position": {
          "line": 197,
          "endLine": 197
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
                "src": "assets/5efc5a198e7f-change-trace.svg",
                "alt": "가상 위키의 수정 과정. 외부 파일을 쓰면 학습하지 않는다는 과도한 일반화를 삭제합니다. RAG Training과 LoRA의 학습 대상을 대조해 파일 수정과 매개변수 학습을 구분하는 문장으로 고칩니다. 현재 본문을 교정하고 변경 이유는 log에 남깁니다."
              },
              "children": [],
              "position": {
                "line": 199,
                "endLine": 199
              }
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
              "value": "일반화를 지우고 범위를 고칩니다. 관련 질문도 검토하며, 이유는 이력에 남깁니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#7-ingest-%EC%83%88-%EC%9E%90%EB%A3%8C%EB%A5%BC-%EB%84%A3%EC%9D%84-%EB%95%8C-%EC%8B%A4%EC%A0%9C%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%80%EB%8A%94-%EA%B2%83"
              },
              "children": [
                {
                  "type": "text",
                  "value": "수정 diff"
                }
              ],
              "position": {
                "line": 201,
                "endLine": 201
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
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "RAG §2.4"
                }
              ],
              "position": {
                "line": 201,
                "endLine": 201
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
                "href": "https://arxiv.org/html/2106.09685v2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "LoRA"
                }
              ],
              "position": {
                "line": 201,
                "endLine": 201
              }
            }
          ],
          "position": {
            "line": 201,
            "endLine": 201
          }
        }
      ],
      "origin": {
        "line": 192,
        "endLine": 201
      },
      "tone": "orange",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "index는 지금, log는 바뀐 이유",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "index는 지금, log는 바뀐 이유"
          }
        ],
        "position": {
          "line": 209,
          "endLine": 209
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "index · 무엇부터 읽지?"
            }
          ],
          "position": {
            "line": 214,
            "endLine": 214
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "처음 이해하기 → 검색 문맥 / 모델 적응"
            }
          ],
          "position": {
            "line": 216,
            "endLine": 216
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "차이 알아보기 → 같은 기준의 비교"
            }
          ],
          "position": {
            "line": 218,
            "endLine": 218
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문에서 시작하기 → 위키 수정은 학습인가"
            }
          ],
          "position": {
            "line": 220,
            "endLine": 220
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
                "href": "materials/study-guide.html#8-index%EC%99%80-log%EB%8A%94-%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EC%A7%88%EB%AC%B8%EC%97%90-%EB%8B%B5%ED%95%9C%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "가상 index 전문"
                }
              ],
              "position": {
                "line": 222,
                "endLine": 222
              }
            }
          ],
          "position": {
            "line": 222,
            "endLine": 222
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "log · 무엇을 왜 고쳤지?"
            }
          ],
          "position": {
            "line": 227,
            "endLine": 227
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LoRA 메모를 개념에 연결했다."
            }
          ],
          "position": {
            "line": 229,
            "endLine": 229
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "‘외부 파일 사용 = 학습 없음’을 교정했다."
            }
          ],
          "position": {
            "line": 231,
            "endLine": 231
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이유: 파일 사용과 학습 대상을 섞었다."
            }
          ],
          "position": {
            "line": 233,
            "endLine": 233
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
                "href": "materials/study-guide.html#8-index%EC%99%80-log%EB%8A%94-%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EC%A7%88%EB%AC%B8%EC%97%90-%EB%8B%B5%ED%95%9C%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "가상 log 전문"
                }
              ],
              "position": {
                "line": 235,
                "endLine": 235
              }
            }
          ],
          "position": {
            "line": 235,
            "endLine": 235
          }
        }
      ],
      "origin": {
        "line": 205,
        "endLine": 235
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 211,
              "endLine": 213
            }
          },
          {
            "start": 5,
            "end": 10,
            "tone": "orange",
            "origin": {
              "line": 224,
              "endLine": 226
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "논문을 읽어도, 선택은 우리가 합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "논문을 읽어도, 선택은 우리가 합니다"
          }
        ],
        "position": {
          "line": 243,
          "endLine": 243
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "선택"
            }
          ],
          "position": {
            "line": 248,
            "endLine": 248
          }
        },
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
                  "value": "검토한 질문 답부터 파일로 남긴다."
                }
              ],
              "position": {
                "line": 250,
                "endLine": 250
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 250,
            "endLine": 250
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문 1개 · 개념 2개 · 비교 1개부터"
            }
          ],
          "position": {
            "line": 252,
            "endLine": 252
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 스터디의 결정 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#9-%EA%B7%BC%EA%B1%B0%EB%A5%BC-%EC%9D%BD%EC%9D%80-%EB%8B%A4%EC%9D%8C%EC%97%90%EB%8F%84-%EA%B2%B0%EC%A0%95%EC%9D%80-%EB%82%A8%EB%8A%94%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "전체 기록"
                }
              ],
              "position": {
                "line": 254,
                "endLine": 254
              }
            }
          ],
          "position": {
            "line": 254,
            "endLine": 254
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "이유와 대안"
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
              "value": "다음 모임에 근거와 수정 이유를 다시 읽고 싶습니다."
            }
          ],
          "position": {
            "line": 261,
            "endLine": 261
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "채팅만 유지하거나, 검색부터 구축할 수도 있습니다."
            }
          ],
          "position": {
            "line": 263,
            "endLine": 263
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
                  "value": "결정 기록"
                }
              ],
              "position": {
                "line": 265,
                "endLine": 265
              }
            },
            {
              "type": "text",
              "value": "을 스터디에 응용했습니다."
            }
          ],
          "position": {
            "line": 265,
            "endLine": 265
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "결과와 재검토"
            }
          ],
          "position": {
            "line": 270,
            "endLine": 270
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검토·연결 관리 시간이 듭니다."
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
              "value": "페이지를 계속 못 찾거나 검토가 밀리면 다시 결정합니다."
            }
          ],
          "position": {
            "line": 274,
            "endLine": 274
          }
        }
      ],
      "origin": {
        "line": 239,
        "endLine": 274
      },
      "tone": "yellow",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "yellow",
            "origin": {
              "line": 245,
              "endLine": 247
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 256,
              "endLine": 258
            }
          },
          {
            "start": 8,
            "end": 11,
            "tone": "orange",
            "origin": {
              "line": 267,
              "endLine": 269
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "링크 다음에는, 문장을 확인합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "링크 다음에는, 문장을 확인합니다"
          }
        ],
        "position": {
          "line": 283,
          "endLine": 283
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "링크는 있지만 틀린 요약"
            }
          ],
          "position": {
            "line": 288,
            "endLine": 288
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "“LoRA는 기본 가중치를 고정하므로 학습이 없다.”"
            }
          ],
          "position": {
            "line": 290,
            "endLine": 290
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "초록의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "추가 행렬을 학습한다"
                }
              ],
              "position": {
                "line": 292,
                "endLine": 292
              }
            },
            {
              "type": "text",
              "value": "는 부분을 빠뜨렸습니다."
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/html/2106.09685v2"
              },
              "children": [
                {
                  "type": "text",
                  "value": "LoRA 초록으로 돌아가기"
                }
              ],
              "position": {
                "line": 294,
                "endLine": 294
              }
            }
          ],
          "position": {
            "line": 294,
            "endLine": 294
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "문장 지원과 진실 판단"
            }
          ],
          "position": {
            "line": 299,
            "endLine": 299
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "먼저 자료가 이 문장과 범위를 지원하는지 봅니다."
            }
          ],
          "position": {
            "line": 301,
            "endLine": 301
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "지원되더라도 자료 자체의 조건·오류·다른 근거는 따로 검토합니다."
            }
          ],
          "position": {
            "line": 303,
            "endLine": 303
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
                "href": "https://arxiv.org/html/2305.14627v2#S3.SS3"
              },
              "children": [
                {
                  "type": "text",
                  "value": "ALCE 인용 평가"
                }
              ],
              "position": {
                "line": 305,
                "endLine": 305
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
                "href": "https://www.w3.org/TR/2013/NOTE-prov-overview-20130430/"
              },
              "children": [
                {
                  "type": "text",
                  "value": "PROV 출처 정보"
                }
              ],
              "position": {
                "line": 305,
                "endLine": 305
              }
            }
          ],
          "position": {
            "line": 305,
            "endLine": 305
          }
        }
      ],
      "origin": {
        "line": 279,
        "endLine": 305
      },
      "tone": "orange",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "orange",
            "origin": {
              "line": 285,
              "endLine": 287
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 296,
              "endLine": 298
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "작은 질문으로, 유지할 일을 확인합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "작은 질문으로, 유지할 일을 확인합니다"
          }
        ],
        "position": {
          "line": 313,
          "endLine": 313
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "읽기 · 반영"
            }
          ],
          "position": {
            "line": 318,
            "endLine": 318
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문 두세 개와 질문 하나부터 시작합니다."
            }
          ],
          "position": {
            "line": 320,
            "endLine": 320
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "관련 개념과 비교에 연결합니다."
            }
          ],
          "position": {
            "line": 322,
            "endLine": 322
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "찾기 · 질문"
            }
          ],
          "position": {
            "line": 327,
            "endLine": 327
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "놓치는 페이지가 생기면 목차와 검색을 점검합니다."
            }
          ],
          "position": {
            "line": 329,
            "endLine": 329
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검토한 답과 남은 질문을 이어갑니다."
            }
          ],
          "position": {
            "line": 331,
            "endLine": 331
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "고치기 · 점검"
            }
          ],
          "position": {
            "line": 336,
            "endLine": 336
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "주장·연결·이력에 검토 시간을 배정합니다."
            }
          ],
          "position": {
            "line": 338,
            "endLine": 338
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "효과·절감·유지비는 미측정입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#14-%EA%B7%9C%EB%AA%A8%EC%99%80-%EC%9A%B4%EC%98%81-%EB%B9%84%EC%9A%A9%EC%9D%98-tradeoff"
              },
              "children": [
                {
                  "type": "text",
                  "value": "운영의 tradeoff"
                }
              ],
              "position": {
                "line": 340,
                "endLine": 340
              }
            }
          ],
          "position": {
            "line": 340,
            "endLine": 340
          }
        }
      ],
      "origin": {
        "line": 309,
        "endLine": 340
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "blue",
            "origin": {
              "line": 315,
              "endLine": 317
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 324,
              "endLine": 326
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 333,
              "endLine": 335
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문에, 근거부터 이어 봅시다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문에, 근거부터 이어 봅시다"
          }
        ],
        "position": {
          "line": 348,
          "endLine": 348
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
                "line": 350,
                "endLine": 350
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 350,
            "endLine": 350
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문 2분 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/index.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "공부 자료 목차"
                }
              ],
              "position": {
                "line": 352,
                "endLine": 352
              }
            }
          ],
          "position": {
            "line": 352,
            "endLine": 352
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
                "href": "materials/study-guide.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "학습 가이드"
                }
              ],
              "position": {
                "line": 354,
                "endLine": 354
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
                "href": "materials/speaker-script.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "발표 대본"
                }
              ],
              "position": {
                "line": 354,
                "endLine": 354
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
                "href": "materials/reference-library.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원문 읽기"
                }
              ],
              "position": {
                "line": 354,
                "endLine": 354
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
                "href": "materials/workshop.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실습과 해설"
                }
              ],
              "position": {
                "line": 354,
                "endLine": 354
              }
            }
          ],
          "position": {
            "line": 354,
            "endLine": 354
          }
        }
      ],
      "origin": {
        "line": 344,
        "endLine": 354
      },
      "tone": "blue",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
