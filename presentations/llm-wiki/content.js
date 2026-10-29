/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "2b09aaabe8682deacadad7571ac4b6f1f6545ac2173c3bb138f1c0533b0ec233"
  },
  "id": "llm-wiki",
  "title": "다음 질문에 다시 쓰는 LLM Wiki",
  "theme": "stage",
  "slides": [
    {
      "layout": "blocks",
      "title": "이번 주 읽은 자료를 다음 주에도 쓸 수 있을까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이번 주 읽은 자료를 다음 주에도 쓸 수 있을까"
          }
        ],
        "position": {
          "line": 11,
          "endLine": 11
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
                "src": "assets/5aa7ac752bff-open-books.jpg",
                "alt": "창가 책상에 펼친 책과 공책, 펜이 놓여 있다."
              },
              "children": [],
              "position": {
                "line": 13,
                "endLine": 13
              }
            }
          ],
          "position": {
            "line": 13,
            "endLine": 13
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
                  "value": "다음 질문에 다시 쓸 노트를 남겨 봅시다."
                }
              ],
              "position": {
                "line": 15,
                "endLine": 15
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 15,
            "endLine": 15
          }
        }
      ],
      "origin": {
        "line": 5,
        "endLine": 15
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "cover",
        "focus": "50% 75%"
      }
    },
    {
      "layout": "blocks",
      "title": "LLM Wiki는 읽고 고치는 파일 노트",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM Wiki는 읽고 고치는 파일 노트"
          }
        ],
        "position": {
          "line": 23,
          "endLine": 23
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
                  "value": "LLM이 자료를 읽고 설명·연결·수정 후보를 제안합니다."
                }
              ],
              "position": {
                "line": 25,
                "endLine": 25
              }
            }
          ],
          "position": {
            "line": 25,
            "endLine": 25
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "사람은 근거와 범위를 검토해 노트를 함께 고칩니다."
            }
          ],
          "position": {
            "line": 27,
            "endLine": 27
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이 발표에서는 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "공용 스터디 노트"
                }
              ],
              "position": {
                "line": 29,
                "endLine": 29
              }
            },
            {
              "type": "text",
              "value": "처럼 생각해 봅니다."
            }
          ],
          "position": {
            "line": 29,
            "endLine": 29
          }
        }
      ],
      "origin": {
        "line": 19,
        "endLine": 29
      },
      "tone": "blue",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "고친 노트 한 쪽에 설명과 근거와 이유를 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "고친 노트 한 쪽에 설명과 근거와 이유를 남긴다"
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
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "설명"
            }
          ],
          "position": {
            "line": 42,
            "endLine": 42
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이 데모의 파일 수정은 모델 매개변수 학습을 실행하지 않는다. 외부 파일을 쓰는 시스템에도 별도의 학습 과정이 있을 수 있다."
            }
          ],
          "position": {
            "line": 44,
            "endLine": 44
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "원문 위치"
            }
          ],
          "position": {
            "line": 49,
            "endLine": 49
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
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "RAG v4 §2.4"
                }
              ],
              "position": {
                "line": 51,
                "endLine": 51
              }
            }
          ],
          "position": {
            "line": 51,
            "endLine": 51
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
                "href": "https://arxiv.org/html/2106.09685v2#S4.SS1"
              },
              "children": [
                {
                  "type": "text",
                  "value": "LoRA v2 §4.1"
                }
              ],
              "position": {
                "line": 53,
                "endLine": 53
              }
            }
          ],
          "position": {
            "line": 53,
            "endLine": 53
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "바꾼 이유"
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
              "type": "text",
              "value": "외부 파일 사용이나 기본 가중치 고정만으로 학습의 부재를 일반화할 수 없다."
            }
          ],
          "position": {
            "line": 60,
            "endLine": 60
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "C1 파일의 문장·근거와 이유 발췌. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/demo-log.html#4-%EC%8B%A4%EC%A0%9C-diff%EC%97%90%EC%84%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EB%AC%B8%EC%9E%A5"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실제 파일 읽기"
                }
              ],
              "position": {
                "line": 62,
                "endLine": 62
              }
            }
          ],
          "position": {
            "line": 62,
            "endLine": 62
          }
        }
      ],
      "origin": {
        "line": 33,
        "endLine": 62
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "green",
            "origin": {
              "line": 39,
              "endLine": 41
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "blue",
            "origin": {
              "line": 46,
              "endLine": 48
            }
          },
          {
            "start": 5,
            "end": 8,
            "tone": "orange",
            "origin": {
              "line": 55,
              "endLine": 57
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "LLM이 제안하고 사람이 검토한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM이 제안하고 사람이 검토한다"
          }
        ],
        "position": {
          "line": 70,
          "endLine": 70
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "운영 · LLM"
            }
          ],
          "position": {
            "line": 75,
            "endLine": 75
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설명 초안"
            }
          ],
          "position": {
            "line": 77,
            "endLine": 77
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "연결 후보"
            }
          ],
          "position": {
            "line": 79,
            "endLine": 79
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "수정 제안"
            }
          ],
          "position": {
            "line": 81,
            "endLine": 81
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "운영 · 사람"
            }
          ],
          "position": {
            "line": 86,
            "endLine": 86
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
                  "value": "원문·문장·범위"
                }
              ],
              "position": {
                "line": 88,
                "endLine": 88
              }
            },
            {
              "type": "text",
              "value": "를 대조하고 채택"
            }
          ],
          "position": {
            "line": 88,
            "endLine": 88
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "오늘의 예제"
            }
          ],
          "position": {
            "line": 93,
            "endLine": 93
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "사람이 준비한 고정 승인안을 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "Node로 파일에 반영"
                }
              ],
              "position": {
                "line": 95,
                "endLine": 95
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 95,
            "endLine": 95
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "오늘은 LLM을 호출하지 않았습니다."
            }
          ],
          "position": {
            "line": 97,
            "endLine": 97
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
                "href": "#6"
              },
              "children": [
                {
                  "type": "text",
                  "value": "파일 역할 보기"
                }
              ],
              "position": {
                "line": 99,
                "endLine": 99
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
                "href": "#5"
              },
              "children": [
                {
                  "type": "text",
                  "value": "세 기록 구분"
                }
              ],
              "position": {
                "line": 99,
                "endLine": 99
              }
            }
          ],
          "position": {
            "line": 99,
            "endLine": 99
          }
        }
      ],
      "origin": {
        "line": 66,
        "endLine": 99
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 72,
              "endLine": 74
            }
          },
          {
            "start": 4,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 83,
              "endLine": 85
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 90,
              "endLine": 92
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문에 무엇을 다시 쓸까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문에 무엇을 다시 쓸까"
          }
        ],
        "position": {
          "line": 107,
          "endLine": 107
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
                  "value": "원문 · 설명 · 판단"
                }
              ],
              "position": {
                "line": 109,
                "endLine": 109
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "읽은 주소, 검토한 답, 바뀐 이유를 함께 남깁니다."
            }
          ],
          "position": {
            "line": 111,
            "endLine": 111
          }
        }
      ],
      "origin": {
        "line": 103,
        "endLine": 111
      },
      "tone": "green",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "공용 노트를 파일로 옮기면",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "공용 노트를 파일로 옮기면"
          }
        ],
        "position": {
          "line": 120,
          "endLine": 120
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
                "src": "assets/3eb3b028a341-study-notebook-map.svg",
                "alt": "원자료함은 읽은 자료 raw, 함께 고친 설명은 wiki, 적는 약속은 작업 규칙, 바꾼 이유는 log에 대응한다. 규칙은 모든 작업에 적용되며 다음 변환 단계가 아니다."
              },
              "children": [],
              "position": {
                "line": 122,
                "endLine": 122
              }
            }
          ],
          "position": {
            "line": 122,
            "endLine": 122
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원자료함 raw는 보존하고, 설명쪽 wiki는 근거를 대조해 고칩니다. 작업 규칙은 전체에 적용하고 log에 바꾼 이유를 남깁니다."
            }
          ],
          "position": {
            "line": 124,
            "endLine": 124
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
                "href": "assets/3eb3b028a341-study-notebook-map.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "대응 그림 원본"
                }
              ],
              "position": {
                "line": 126,
                "endLine": 126
              }
            }
          ],
          "position": {
            "line": 126,
            "endLine": 126
          }
        }
      ],
      "origin": {
        "line": 115,
        "endLine": 126
      },
      "tone": "orange",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "계속 남고 쌓여 가는 결과물",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "계속 남고 쌓여 가는 결과물"
          }
        ],
        "position": {
          "line": 134,
          "endLine": 134
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
                  "value": "핵심 차이는 이것입니다. 위키는 계속 남고, 쌓여 가는 결과물입니다."
                }
              ],
              "position": {
                "line": 136,
                "endLine": 136
              }
            }
          ],
          "position": {
            "line": 136,
            "endLine": 136
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "발표팀 번역"
            }
          ],
          "position": {
            "line": 138,
            "endLine": 138
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "This is the key difference: the wiki is a persistent, compounding artifact."
            }
          ],
          "position": {
            "line": 140,
            "endLine": 140
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Andrej Karpathy, "
            },
            {
              "type": "element",
              "tag": "em",
              "children": [
                {
                  "type": "text",
                  "value": "LLM Wiki"
                }
              ],
              "position": {
                "line": 142,
                "endLine": 142
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
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a#the-core-idea"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 원문"
                }
              ],
              "position": {
                "line": 142,
                "endLine": 142
              }
            }
          ],
          "position": {
            "line": 142,
            "endLine": 142
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
                "href": "#10"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실제 파일 확인하기"
                }
              ],
              "position": {
                "line": 144,
                "endLine": 144
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
                "href": "#8"
              },
              "children": [
                {
                  "type": "text",
                  "value": "노트 구조 더 보기"
                }
              ],
              "position": {
                "line": 144,
                "endLine": 144
              }
            }
          ],
          "position": {
            "line": 144,
            "endLine": 144
          }
        }
      ],
      "origin": {
        "line": 130,
        "endLine": 144
      },
      "tone": "purple",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "원자료 옆에 설명 노트를 둔다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원자료 옆에 설명 노트를 둔다"
          }
        ],
        "position": {
          "line": 153,
          "endLine": 153
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
                "alt": "원자료는 보존하고 위키는 갱신한다. 작업 규칙은 둘 사이의 작업 전체에 적용하며 세 번째 변환 산출물이 아니다."
              },
              "children": [],
              "position": {
                "line": 155,
                "endLine": 155
              }
            }
          ],
          "position": {
            "line": 155,
            "endLine": 155
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
                "href": "assets/9de04be0b94d-wiki-layers.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 157,
                "endLine": 157
              }
            }
          ],
          "position": {
            "line": 157,
            "endLine": 157
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LLM이 읽고 연결한 Markdown을 유지하는 설계입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Karpathy · Architecture"
                }
              ],
              "position": {
                "line": 159,
                "endLine": 159
              }
            }
          ],
          "position": {
            "line": 159,
            "endLine": 159
          }
        }
      ],
      "origin": {
        "line": 148,
        "endLine": 159
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "원문 위치와 메모와 해석을 나눈다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원문 위치와 메모와 해석을 나눈다"
          }
        ],
        "position": {
          "line": 167,
          "endLine": 167
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "원문 위치"
            }
          ],
          "position": {
            "line": 172,
            "endLine": 172
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "RAG v4 §2.4 Training"
            }
          ],
          "position": {
            "line": 174,
            "endLine": 174
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
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실제 논문의 해당 절"
                }
              ],
              "position": {
                "line": 176,
                "endLine": 176
              }
            }
          ],
          "position": {
            "line": 176,
            "endLine": 176
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "한국어 읽기 메모"
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
              "value": "문서 인코더와 색인은 고정하고, 질의 인코더와 BART 생성기를 미세조정한다."
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
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "source-notes/rag.md"
                }
              ],
              "position": {
                "line": 185,
                "endLine": 185
              }
            },
            {
              "type": "text",
              "value": " 요약"
            }
          ],
          "position": {
            "line": 185,
            "endLine": 185
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "우리 질문의 해석"
            }
          ],
          "position": {
            "line": 190,
            "endLine": 190
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "외부 파일 사용만으로 학습 유무를 정할 수 없다."
            }
          ],
          "position": {
            "line": 192,
            "endLine": 192
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "메모의 근거와 범위를 다시 대조한다."
            }
          ],
          "position": {
            "line": 194,
            "endLine": 194
          }
        }
      ],
      "origin": {
        "line": 163,
        "endLine": 194
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "blue",
            "origin": {
              "line": 169,
              "endLine": 171
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 178,
              "endLine": 180
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 187,
              "endLine": 189
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "오늘은 승인한 교정안을 파일에 반영한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "오늘은 승인한 교정안을 파일에 반영한다"
          }
        ],
        "position": {
          "line": 202,
          "endLine": 202
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "사람이 준비한 승인안"
            }
          ],
          "position": {
            "line": 207,
            "endLine": 207
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "학습용 오류가 있는 Q1 초안"
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
              "value": "원문을 대조한 고정 교정안"
            }
          ],
          "position": {
            "line": 211,
            "endLine": 211
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "Node로 반영한 결과"
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
              "value": "고친 답 · 새 질문 · 보류 · 대체 결정"
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
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "changes.diff"
                }
              ],
              "position": {
                "line": 220,
                "endLine": 220
              }
            },
            {
              "type": "text",
              "value": "와 파일·링크·해시 검사"
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
                "href": "materials/demo-log.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실행 기록"
                }
              ],
              "position": {
                "line": 222,
                "endLine": 222
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
                "href": "assets/9c0a83b5bf0a-llm-wiki-demo.zip"
              },
              "children": [
                {
                  "type": "text",
                  "value": "데모 ZIP"
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
        }
      ],
      "origin": {
        "line": 198,
        "endLine": 222
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "origin": {
              "line": 204,
              "endLine": 206
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "blue",
            "origin": {
              "line": 213,
              "endLine": 215
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "첫 질문의 초안을 연다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "첫 질문의 초안을 연다"
          }
        ],
        "position": {
          "line": 230,
          "endLine": 230
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
                  "value": "위키 파일을 고치는 것은 파일을 수정하는 작업이다. 외부 파일을 쓰는 시스템은 모델을 학습하지 않는다."
                }
              ],
              "position": {
                "line": 232,
                "endLine": 232
              }
            }
          ],
          "position": {
            "line": 232,
            "endLine": 232
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Q1 · 위키 파일을 고치면 모델도 그 내용을 학습하나요?"
            }
          ],
          "position": {
            "line": 234,
            "endLine": 234
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "출처 후보: RAG 최초 읽기 메모 · "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "상태: 검토 전"
                }
              ],
              "position": {
                "line": 236,
                "endLine": 236
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 236,
            "endLine": 236
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "발표자가 심은 학습용 오류입니다. "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "before/wiki/questions/wiki-and-learning.md"
                }
              ],
              "position": {
                "line": 238,
                "endLine": 238
              }
            },
            {
              "type": "text",
              "value": " 발췌."
            }
          ],
          "position": {
            "line": 238,
            "endLine": 238
          }
        }
      ],
      "origin": {
        "line": 226,
        "endLine": 238
      },
      "tone": "yellow",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "링크가 있으면 충분할까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "링크가 있으면 충분할까"
          }
        ],
        "position": {
          "line": 246,
          "endLine": 246
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "판단할 초안"
            }
          ],
          "position": {
            "line": 251,
            "endLine": 251
          }
        },
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
                  "value": "외부 파일을 쓰는 시스템은"
                },
                {
                  "type": "element",
                  "tag": "br",
                  "children": [],
                  "position": {
                    "line": 253,
                    "endLine": 254
                  }
                },
                {
                  "type": "text",
                  "value": "모델을 학습하지 않는다."
                }
              ],
              "position": {
                "line": 253,
                "endLine": 254
              }
            }
          ],
          "position": {
            "line": 253,
            "endLine": 254
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Zoom 채팅에 A/B를 적어 주세요."
            }
          ],
          "position": {
            "line": 256,
            "endLine": 256
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이유 한 줄은 선택입니다."
            }
          ],
          "position": {
            "line": 258,
            "endLine": 258
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
                "href": "#13"
              },
              "children": [
                {
                  "type": "text",
                  "value": "근거 확인하기"
                }
              ],
              "position": {
                "line": 260,
                "endLine": 260
              }
            }
          ],
          "position": {
            "line": 260,
            "endLine": 260
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "A"
            }
          ],
          "position": {
            "line": 265,
            "endLine": 265
          }
        },
        {
          "type": "element",
          "tag": "blockquote",
          "children": [
            {
              "type": "element",
              "tag": "p",
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "attrs": {
                    "href": "#13"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "현행 노트로 저장한다."
                    }
                  ],
                  "position": {
                    "line": 267,
                    "endLine": 267
                  }
                }
              ],
              "position": {
                "line": 267,
                "endLine": 267
              }
            }
          ],
          "position": {
            "line": 267,
            "endLine": 267
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "B"
            }
          ],
          "position": {
            "line": 272,
            "endLine": 272
          }
        },
        {
          "type": "element",
          "tag": "blockquote",
          "children": [
            {
              "type": "element",
              "tag": "p",
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "attrs": {
                    "href": "#13"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "원문 범위를 검토한다."
                    }
                  ],
                  "position": {
                    "line": 274,
                    "endLine": 274
                  }
                }
              ],
              "position": {
                "line": 274,
                "endLine": 274
              }
            }
          ],
          "position": {
            "line": 274,
            "endLine": 274
          }
        }
      ],
      "origin": {
        "line": 242,
        "endLine": 274
      },
      "tone": "neutral",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 5,
            "tone": "neutral",
            "origin": {
              "line": 248,
              "endLine": 250
            }
          },
          {
            "start": 5,
            "end": 7,
            "tone": "neutral",
            "origin": {
              "line": 262,
              "endLine": 264
            }
          },
          {
            "start": 7,
            "end": 9,
            "tone": "neutral",
            "origin": {
              "line": 269,
              "endLine": 271
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "B · 링크와 문장 지원을 대조한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "B · 링크와 문장 지원을 대조한다"
          }
        ],
        "position": {
          "line": 282,
          "endLine": 282
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "초안의 일반화"
            }
          ],
          "position": {
            "line": 287,
            "endLine": 287
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "외부 파일을 쓰는 시스템은"
            },
            {
              "type": "text",
              "value": "\n"
            },
            {
              "type": "text",
              "value": "모델을 학습하지 않는다."
            }
          ],
          "position": {
            "line": 289,
            "endLine": 290
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "RAG 원논문 §2.4"
            }
          ],
          "position": {
            "line": 295,
            "endLine": 295
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질의 인코더와 생성기를 미세조정한다."
            }
          ],
          "position": {
            "line": 297,
            "endLine": 297
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "외부 파일 사용과 학습은 함께 있을 수 있다."
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
              "value": "링크 다음에는 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "문장과 근거의 범위"
                }
              ],
              "position": {
                "line": 301,
                "endLine": 301
              }
            },
            {
              "type": "text",
              "value": "를 대조합니다."
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "RAG v4 §2.4"
                }
              ],
              "position": {
                "line": 303,
                "endLine": 303
              }
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
                "href": "#12"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문으로 돌아가기"
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
                "href": "#17"
              },
              "children": [
                {
                  "type": "text",
                  "value": "교정 결과 보기"
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
                "href": "#14"
              },
              "children": [
                {
                  "type": "text",
                  "value": "읽은 범위 확인"
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
        "line": 278,
        "endLine": 305
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "orange",
            "origin": {
              "line": 284,
              "endLine": 286
            }
          },
          {
            "start": 2,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 292,
              "endLine": 294
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "최초 메모를 남기고 더 읽은 메모를 붙인다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "최초 메모를 남기고 더 읽은 메모를 붙인다"
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
              "value": "최초 · rag-initial.md"
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
              "value": "같은 RAG v4의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "§2.3"
                }
              ],
              "position": {
                "line": 320,
                "endLine": 320
              }
            },
            {
              "type": "text",
              "value": "을 읽음"
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
              "value": "검색 문서를 생성에 쓰는 구조를 메모"
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
              "value": "확장 · rag.md"
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
              "value": "같은 RAG v4의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "§2.4까지"
                }
              ],
              "position": {
                "line": 329,
                "endLine": 329
              }
            },
            {
              "type": "text",
              "value": " 읽음"
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
              "value": "학습 대상을 확인해 추가로 메모"
            }
          ],
          "position": {
            "line": 331,
            "endLine": 331
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문이 교체된 사건이 아닙니다. "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "읽은 범위가 달라졌습니다."
                }
              ],
              "position": {
                "line": 333,
                "endLine": 333
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 333,
            "endLine": 333
          }
        }
      ],
      "origin": {
        "line": 309,
        "endLine": 333
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "yellow",
            "origin": {
              "line": 315,
              "endLine": 317
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "blue",
            "origin": {
              "line": 324,
              "endLine": 326
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "주장마다 근거와 범위를 맞춘다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "주장마다 근거와 범위를 맞춘다"
          }
        ],
        "position": {
          "line": 341,
          "endLine": 341
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "C1 · 고칠 문장"
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
              "type": "text",
              "value": "외부 파일을 쓰는 시스템은 모델을 학습하지 않는다."
            }
          ],
          "position": {
            "line": 348,
            "endLine": 348
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "근거 위치"
            }
          ],
          "position": {
            "line": 353,
            "endLine": 353
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "RAG v4 §2.4"
            }
          ],
          "position": {
            "line": 355,
            "endLine": 355
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질의 인코더·생성기 학습"
            }
          ],
          "position": {
            "line": 357,
            "endLine": 357
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LoRA v2 §4.1"
            }
          ],
          "position": {
            "line": 359,
            "endLine": 359
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기본 가중치 고정 · 추가 행렬 학습"
            }
          ],
          "position": {
            "line": 361,
            "endLine": 361
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "고친 범위"
            }
          ],
          "position": {
            "line": 366,
            "endLine": 366
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이 파일 교정 데모는 모델 학습을 실행하지 않는다."
            }
          ],
          "position": {
            "line": 368,
            "endLine": 368
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
                "href": "https://arxiv.org/html/2005.11401v4#S2.SS4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "RAG"
                }
              ],
              "position": {
                "line": 370,
                "endLine": 370
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
                "href": "https://arxiv.org/html/2106.09685v2#S4.SS1"
              },
              "children": [
                {
                  "type": "text",
                  "value": "LoRA"
                }
              ],
              "position": {
                "line": 370,
                "endLine": 370
              }
            }
          ],
          "position": {
            "line": 370,
            "endLine": 370
          }
        }
      ],
      "origin": {
        "line": 337,
        "endLine": 370
      },
      "tone": "orange",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "orange",
            "origin": {
              "line": 343,
              "endLine": 345
            }
          },
          {
            "start": 2,
            "end": 7,
            "tone": "purple",
            "origin": {
              "line": 350,
              "endLine": 352
            }
          },
          {
            "start": 7,
            "end": 10,
            "tone": "green",
            "origin": {
              "line": 363,
              "endLine": 365
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "검토는 고칠 문장과 이유를 정한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "검토는 고칠 문장과 이유를 정한다"
          }
        ],
        "position": {
          "line": 378,
          "endLine": 378
        }
      },
      "blocks": [
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
                  "value": "review/review.json"
                }
              ],
              "position": {
                "line": 380,
                "endLine": 380
              }
            },
            {
              "type": "text",
              "value": "의 실제 승인 항목"
            }
          ],
          "position": {
            "line": 380,
            "endLine": 380
          }
        },
        {
          "type": "element",
          "tag": "pre",
          "children": [
            {
              "type": "element",
              "tag": "code",
              "attrs": {
                "class": "language-json"
              },
              "children": [
                {
                  "type": "text",
                  "value": "{\n  \"claim\": \"외부 파일을 쓰는 시스템은 모델을 학습하지 않는다.\",\n  \"decision\": \"일반화 삭제 후 범위 교정\",\n  \"source_ids\": [\"S-RAG\", \"S-LORA\"]\n}\n"
                }
              ],
              "position": {
                "line": 382,
                "endLine": 388
              }
            }
          ],
          "position": {
            "line": 382,
            "endLine": 388
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이유: RAG의 학습과 LoRA의 추가 행렬 학습을 원문에서 확인했습니다. "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "의미 검토와 승인은 발표자가 했습니다."
                }
              ],
              "position": {
                "line": 390,
                "endLine": 390
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 390,
            "endLine": 390
          }
        }
      ],
      "origin": {
        "line": 374,
        "endLine": 390
      },
      "tone": "purple",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "모든 시스템에서 이 데모로 좁힌다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "모든 시스템에서 이 데모로 좁힌다"
          }
        ],
        "position": {
          "line": 398,
          "endLine": 398
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "삭제 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/demo-log.html#4-%EC%8B%A4%EC%A0%9C-diff%EC%97%90%EC%84%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EB%AC%B8%EC%9E%A5"
              },
              "children": [
                {
                  "type": "text",
                  "value": "모든 시스템"
                }
              ],
              "position": {
                "line": 403,
                "endLine": 403
              }
            }
          ],
          "position": {
            "line": 403,
            "endLine": 403
          }
        },
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
                  "value": "외부 파일을 쓰는 시스템은"
                },
                {
                  "type": "element",
                  "tag": "br",
                  "children": [],
                  "position": {
                    "line": 405,
                    "endLine": 406
                  }
                },
                {
                  "type": "text",
                  "value": "모델을 학습하지 않는다."
                }
              ],
              "position": {
                "line": 405,
                "endLine": 406
              }
            }
          ],
          "position": {
            "line": 405,
            "endLine": 406
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "추가 · 이 데모"
            }
          ],
          "position": {
            "line": 411,
            "endLine": 411
          }
        },
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
                  "value": "이 데모의 파일 수정은 모델 매개변수 학습을 실행하지 않는다. 외부 파일을 쓰는 시스템에도 별도의 학습 과정이 있을 수 있다."
                }
              ],
              "position": {
                "line": 413,
                "endLine": 413
              }
            }
          ],
          "position": {
            "line": 413,
            "endLine": 413
          }
        }
      ],
      "origin": {
        "line": 394,
        "endLine": 413
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "orange",
            "origin": {
              "line": 400,
              "endLine": 402
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "green",
            "origin": {
              "line": 408,
              "endLine": 410
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "고친 답에는 다음 확인이 남는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "고친 답에는 다음 확인이 남는다"
          }
        ],
        "position": {
          "line": 421,
          "endLine": 421
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
                  "value": "이 데모에서 바뀌는 것은 Markdown 파일이며 모델 매개변수 학습을 실행하지 않는다."
                }
              ],
              "position": {
                "line": 423,
                "endLine": 423
              }
            }
          ],
          "position": {
            "line": 423,
            "endLine": 423
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 질문에 반영하려면 고친 파일을 다시 찾아 읽어 답의 문맥에 넣어야 한다."
            }
          ],
          "position": {
            "line": 425,
            "endLine": 425
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Q1 현행 답 발췌 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "after/wiki/questions/wiki-and-learning.md"
                }
              ],
              "position": {
                "line": 427,
                "endLine": 427
              }
            }
          ],
          "position": {
            "line": 427,
            "endLine": 427
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
                  "value": "다음 질문:"
                }
              ],
              "position": {
                "line": 429,
                "endLine": 429
              }
            },
            {
              "type": "text",
              "value": " 고친 파일이 있어도 다음 답에서 읽지 않으면 어떻게 확인할까?"
            }
          ],
          "position": {
            "line": 429,
            "endLine": 429
          }
        }
      ],
      "origin": {
        "line": 417,
        "endLine": 429
      },
      "tone": "green",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "고친 설명을 새 질문과 판단에 다시 쓴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "고친 설명을 새 질문과 판단에 다시 쓴다"
          }
        ],
        "position": {
          "line": 438,
          "endLine": 438
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
                "src": "assets/65eecce8e8af-reuse-route.svg",
                "alt": "교정한 주장 C1을 첫 질문의 답 Q1에 반영하고, 이전 설명과 초기 결정을 함께 읽어 새 운영 질문 Q2와 저장 기준 D2를 판단한다. 목차·변경 이유·옛 결정·검토 대기는 별도 지원 기록으로 남긴다."
              },
              "children": [],
              "position": {
                "line": 440,
                "endLine": 440
              }
            }
          ],
          "position": {
            "line": 440,
            "endLine": 440
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "고친 주장과 첫 답, 이전 선택을 다시 읽어 새 저장 기준을 정합니다."
            }
          ],
          "position": {
            "line": 442,
            "endLine": 442
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
                "href": "assets/65eecce8e8af-reuse-route.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "관계도 원본"
                }
              ],
              "position": {
                "line": 444,
                "endLine": 444
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
                "href": "#21"
              },
              "children": [
                {
                  "type": "text",
                  "value": "새 질문에 다시 쓰기"
                }
              ],
              "position": {
                "line": 444,
                "endLine": 444
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
                "href": "#20"
              },
              "children": [
                {
                  "type": "text",
                  "value": "목차와 이력 더 보기"
                }
              ],
              "position": {
                "line": 444,
                "endLine": 444
              }
            }
          ],
          "position": {
            "line": 444,
            "endLine": 444
          }
        }
      ],
      "origin": {
        "line": 433,
        "endLine": 444
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "index는 입구 log는 바뀐 이유",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "index는 입구 log는 바뀐 이유"
          }
        ],
        "position": {
          "line": 452,
          "endLine": 452
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "index.md · 어디서 읽지?"
            }
          ],
          "position": {
            "line": 457,
            "endLine": 457
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "현행 답 저장 정책: 검토 후 갱신"
            }
          ],
          "position": {
            "line": 459,
            "endLine": 459
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 운영 질문 Q2: 어떤 답을 저장할까"
            }
          ],
          "position": {
            "line": 461,
            "endLine": 461
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검토 대기 답: 단정할 수 없는 부분"
            }
          ],
          "position": {
            "line": 463,
            "endLine": 463
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "log.md · 왜 고쳤지?"
            }
          ],
          "position": {
            "line": 468,
            "endLine": 468
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "C1의 일반화를 교정했다."
            }
          ],
          "position": {
            "line": 470,
            "endLine": 470
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Q2에서 C1 교정과 저장 정책을 재사용했다."
            }
          ],
          "position": {
            "line": 472,
            "endLine": 472
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "D1은 D2로 대체 표시했다."
            }
          ],
          "position": {
            "line": 474,
            "endLine": 474
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "실제 "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "after/wiki/index.md"
                }
              ],
              "position": {
                "line": 476,
                "endLine": 476
              }
            },
            {
              "type": "text",
              "value": "와 "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "log.md"
                }
              ],
              "position": {
                "line": 476,
                "endLine": 476
              }
            },
            {
              "type": "text",
              "value": "의 항목 발췌."
            }
          ],
          "position": {
            "line": 476,
            "endLine": 476
          }
        }
      ],
      "origin": {
        "line": 448,
        "endLine": 476
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "green",
            "origin": {
              "line": 454,
              "endLine": 456
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 465,
              "endLine": 467
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "새 질문 · 우리 스터디는 어떤 답을 저장할까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 질문 · 우리 스터디는 어떤 답을 저장할까"
          }
        ],
        "position": {
          "line": 484,
          "endLine": 484
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
                  "value": "Q2 · 답의 저장 기준 정하기"
                }
              ],
              "position": {
                "line": 486,
                "endLine": 486
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 486,
            "endLine": 486
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "개념 설명을 고친 뒤에는, 다음 모임에서 쓸 답의 저장 기준을 정합니다."
            }
          ],
          "position": {
            "line": 488,
            "endLine": 488
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "불러올 기록: "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "교정된 C1 · Q1의 답 · 초기 결정 D1"
                }
              ],
              "position": {
                "line": 490,
                "endLine": 490
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 490,
            "endLine": 490
          }
        }
      ],
      "origin": {
        "line": 480,
        "endLine": 490
      },
      "tone": "purple",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "이전 설명과 판단을 함께 읽는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이전 설명과 판단을 함께 읽는다"
          }
        ],
        "position": {
          "line": 499,
          "endLine": 499
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
                "src": "assets/c3618c438e6a-reuse-inputs.svg",
                "alt": "Q2가 다시 읽는 파일은 교정된 C1, Q1, 초기 D1이다. C1에서 링크만으로 일반화를 지원하지 못함을, Q1에서 다음 답이 파일을 다시 읽어야 함을, D1에서 모든 답을 현행으로 모으려던 이유를 가져와 현행과 검토 대기함을 나누는 판단에 쓴다."
              },
              "children": [],
              "position": {
                "line": 501,
                "endLine": 501
              }
            }
          ],
          "position": {
            "line": 501,
            "endLine": 501
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
                "href": "assets/c3618c438e6a-reuse-inputs.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 503,
                "endLine": 503
              }
            }
          ],
          "position": {
            "line": 503,
            "endLine": 503
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "C1의 교정, Q1의 다음 확인, D1의 기존 선택을 함께 놓고 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "Q2를 판단"
                }
              ],
              "position": {
                "line": 505,
                "endLine": 505
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 505,
            "endLine": 505
          }
        }
      ],
      "origin": {
        "line": 494,
        "endLine": 505
      },
      "tone": "purple",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "이 답을 어디에 남길까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이 답을 어디에 남길까"
          }
        ],
        "position": {
          "line": 513,
          "endLine": 513
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "판단할 초안"
            }
          ],
          "position": {
            "line": 518,
            "endLine": 518
          }
        },
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
                  "value": "파일 위키를 만들면 필요한 파일을 언제나 찾을 수 있다."
                }
              ],
              "position": {
                "line": 520,
                "endLine": 520
              }
            }
          ],
          "position": {
            "line": 520,
            "endLine": 520
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Zoom 채팅에 A/B를 적어 주세요."
            }
          ],
          "position": {
            "line": 522,
            "endLine": 522
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "이유 한 줄은 선택입니다."
            }
          ],
          "position": {
            "line": 524,
            "endLine": 524
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
                "href": "#24"
              },
              "children": [
                {
                  "type": "text",
                  "value": "이 예제의 선택 확인"
                }
              ],
              "position": {
                "line": 526,
                "endLine": 526
              }
            }
          ],
          "position": {
            "line": 526,
            "endLine": 526
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "A"
            }
          ],
          "position": {
            "line": 531,
            "endLine": 531
          }
        },
        {
          "type": "element",
          "tag": "blockquote",
          "children": [
            {
              "type": "element",
              "tag": "p",
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "attrs": {
                    "href": "#24"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "현행 노트로 저장한다."
                    }
                  ],
                  "position": {
                    "line": 533,
                    "endLine": 533
                  }
                }
              ],
              "position": {
                "line": 533,
                "endLine": 533
              }
            }
          ],
          "position": {
            "line": 533,
            "endLine": 533
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "B"
            }
          ],
          "position": {
            "line": 538,
            "endLine": 538
          }
        },
        {
          "type": "element",
          "tag": "blockquote",
          "children": [
            {
              "type": "element",
              "tag": "p",
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "attrs": {
                    "href": "#24"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "검토 대기에 보류한다."
                    }
                  ],
                  "position": {
                    "line": 540,
                    "endLine": 540
                  }
                }
              ],
              "position": {
                "line": 540,
                "endLine": 540
              }
            }
          ],
          "position": {
            "line": 540,
            "endLine": 540
          }
        }
      ],
      "origin": {
        "line": 509,
        "endLine": 540
      },
      "tone": "neutral",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 5,
            "tone": "neutral",
            "origin": {
              "line": 515,
              "endLine": 517
            }
          },
          {
            "start": 5,
            "end": 7,
            "tone": "neutral",
            "origin": {
              "line": 528,
              "endLine": 530
            }
          },
          {
            "start": 7,
            "end": 9,
            "tone": "neutral",
            "origin": {
              "line": 535,
              "endLine": 537
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "B · 이 예제는 검토 뒤 현행으로 옮긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "B · 이 예제는 검토 뒤 현행으로 옮긴다"
          }
        ],
        "position": {
          "line": 549,
          "endLine": 549
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
                "src": "assets/8c6c53e6a95d-current-pending.svg",
                "alt": "Q2의 답은 원문과 범위를 대조한 설명을 현행 위키에 연결하고, 필요한 파일을 언제나 찾는다는 근거 부족 답은 pending에 남긴다. D2에는 이 저장 기준과 검토 부담을 기록한다. 이는 이 구성 예제의 운영 선택이다."
              },
              "children": [],
              "position": {
                "line": 551,
                "endLine": 551
              }
            }
          ],
          "position": {
            "line": 551,
            "endLine": 551
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
                "href": "assets/8c6c53e6a95d-current-pending.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 553,
                "endLine": 553
              }
            }
          ],
          "position": {
            "line": 553,
            "endLine": 553
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
                  "value": "이 예제의 선택은 B."
                }
              ],
              "position": {
                "line": 555,
                "endLine": 555
              }
            },
            {
              "type": "text",
              "value": " 검토한 답은 현행, 근거 부족 답은 대기함에 남깁니다."
            }
          ],
          "position": {
            "line": 555,
            "endLine": 555
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
                "href": "#23"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문으로 돌아가기"
                }
              ],
              "position": {
                "line": 557,
                "endLine": 557
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
                "href": "#25"
              },
              "children": [
                {
                  "type": "text",
                  "value": "보류 이유 읽기"
                }
              ],
              "position": {
                "line": 557,
                "endLine": 557
              }
            }
          ],
          "position": {
            "line": 557,
            "endLine": 557
          }
        }
      ],
      "origin": {
        "line": 544,
        "endLine": 557
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "보류에도 이유와 다음 행동을 적는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "보류에도 이유와 다음 행동을 적는다"
          }
        ],
        "position": {
          "line": 565,
          "endLine": 565
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "상태 · 보류"
            }
          ],
          "position": {
            "line": 570,
            "endLine": 570
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "필요한 파일을 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "항상"
                }
              ],
              "position": {
                "line": 572,
                "endLine": 572
              }
            },
            {
              "type": "text",
              "value": " 찾는다는 초안"
            }
          ],
          "position": {
            "line": 572,
            "endLine": 572
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "보류 이유"
            }
          ],
          "position": {
            "line": 577,
            "endLine": 577
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검색 누락 여부는 미확인"
            }
          ],
          "position": {
            "line": 579,
            "endLine": 579
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다음 행동"
            }
          ],
          "position": {
            "line": 584,
            "endLine": 584
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "실제 질문 몇 개를 고른다."
            }
          ],
          "position": {
            "line": 586,
            "endLine": 586
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽은 파일과 빠진 근거를 점검한다."
            }
          ],
          "position": {
            "line": 588,
            "endLine": 588
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
                "href": "materials/demo-log.html#7-pending%EC%9D%80-%EC%9D%B4%EC%9C%A0%EC%99%80-%EB%8B%A4%EC%9D%8C-%ED%96%89%EB%8F%99%EC%9D%84-%EB%82%A8%EA%B8%B4%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "보류 기록 전문"
                }
              ],
              "position": {
                "line": 590,
                "endLine": 590
              }
            }
          ],
          "position": {
            "line": 590,
            "endLine": 590
          }
        }
      ],
      "origin": {
        "line": 561,
        "endLine": 590
      },
      "tone": "yellow",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "yellow",
            "origin": {
              "line": 567,
              "endLine": 569
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "orange",
            "origin": {
              "line": 574,
              "endLine": 576
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 581,
              "endLine": 583
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "옛 결정은 대체됨으로 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "옛 결정은 대체됨으로 남긴다"
          }
        ],
        "position": {
          "line": 599,
          "endLine": 599
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
                "src": "assets/d23557eecf49-decision-transition.svg",
                "alt": "초기 결정 D1은 모든 질문 답을 현행 노트로 저장하려는 선택이다. C1 교정 뒤 superseded로 표시하고 D2 검토한 답을 현행으로 표시하기로 연결한다. 예전 맥락과 결과는 보존한다."
              },
              "children": [],
              "position": {
                "line": 601,
                "endLine": 601
              }
            }
          ],
          "position": {
            "line": 601,
            "endLine": 601
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
                "href": "assets/d23557eecf49-decision-transition.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 603,
                "endLine": 603
              }
            }
          ],
          "position": {
            "line": 603,
            "endLine": 603
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "D1은 채팅 답을 모으려던 이유와 함께 보존합니다. "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "D2에는 새 선택과 검토 부담"
                }
              ],
              "position": {
                "line": 605,
                "endLine": 605
              }
            },
            {
              "type": "text",
              "value": "을 적습니다."
            }
          ],
          "position": {
            "line": 605,
            "endLine": 605
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
                "href": "#29"
              },
              "children": [
                {
                  "type": "text",
                  "value": "상충하는 근거 다루기"
                }
              ],
              "position": {
                "line": 607,
                "endLine": 607
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
                "href": "#27"
              },
              "children": [
                {
                  "type": "text",
                  "value": "결정 비용 더 보기"
                }
              ],
              "position": {
                "line": 607,
                "endLine": 607
              }
            }
          ],
          "position": {
            "line": 607,
            "endLine": 607
          }
        }
      ],
      "origin": {
        "line": 594,
        "endLine": 607
      },
      "tone": "orange",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "새 결정에는 검토 비용도 적는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 결정에는 검토 비용도 적는다"
          }
        ],
        "position": {
          "line": 615,
          "endLine": 615
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "맥락"
            }
          ],
          "position": {
            "line": 620,
            "endLine": 620
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "출처 링크가 있는 초안에도 미지원 일반화가 있었다."
            }
          ],
          "position": {
            "line": 622,
            "endLine": 622
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "결정 · D2"
            }
          ],
          "position": {
            "line": 627,
            "endLine": 627
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "문장·근거 위치·주장 범위를 대조한 뒤 현행 답을 갱신한다."
            }
          ],
          "position": {
            "line": 629,
            "endLine": 629
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "결과"
            }
          ],
          "position": {
            "line": 634,
            "endLine": 634
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "수정 이유를 다시 읽는다."
            }
          ],
          "position": {
            "line": 636,
            "endLine": 636
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검토 시간을 들여야 한다."
            }
          ],
          "position": {
            "line": 638,
            "endLine": 638
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "관련 페이지 누락도 살핀다."
            }
          ],
          "position": {
            "line": 640,
            "endLine": 640
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "D2 기록 요약 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Nygard의 결정 기록 형식을 스터디에 응용"
                }
              ],
              "position": {
                "line": 642,
                "endLine": 642
              }
            }
          ],
          "position": {
            "line": 642,
            "endLine": 642
          }
        }
      ],
      "origin": {
        "line": 611,
        "endLine": 642
      },
      "tone": "orange",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "purple",
            "origin": {
              "line": 617,
              "endLine": 619
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "green",
            "origin": {
              "line": 624,
              "endLine": 626
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 631,
              "endLine": 633
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "서로 다른 판은 같은 이름으로 덮지 않는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "서로 다른 판은 같은 이름으로 덮지 않는다"
          }
        ],
        "position": {
          "line": 650,
          "endLine": 650
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "자료에 새 판이 생기면"
            }
          ],
          "position": {
            "line": 655,
            "endLine": 655
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "판·날짜·적용 범위 보존"
            }
          ],
          "position": {
            "line": 657,
            "endLine": 657
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "주장으로 돌아가서"
            }
          ],
          "position": {
            "line": 662,
            "endLine": 662
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "문장과 지원 범위 대조"
            }
          ],
          "position": {
            "line": 664,
            "endLine": 664
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "영향과 결정을 검토"
            }
          ],
          "position": {
            "line": 669,
            "endLine": 669
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "현행 설명 갱신 · 과거 판단 보존"
            }
          ],
          "position": {
            "line": 671,
            "endLine": 671
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
                  "value": "원문이 바뀔 때 적용"
                }
              ],
              "position": {
                "line": 673,
                "endLine": 673
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 673,
            "endLine": 673
          }
        }
      ],
      "origin": {
        "line": 646,
        "endLine": 673
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "blue",
            "origin": {
              "line": 652,
              "endLine": 654
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 659,
              "endLine": 661
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 666,
              "endLine": 668
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "상충하면 먼저 범위를 확인한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "상충하면 먼저 범위를 확인한다"
          }
        ],
        "position": {
          "line": 681,
          "endLine": 681
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
                  "value": "같은 대상? → 같은 시점? → 같은 조건?"
                }
              ],
              "position": {
                "line": 683,
                "endLine": 683
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 683,
            "endLine": 683
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "조건이 다르면 범위를 나눕니다. 같은 조건에서 충돌하면 근거를 대조하고, 아직 판단할 수 없으면 보류합니다."
            }
          ],
          "position": {
            "line": 685,
            "endLine": 685
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
                "href": "#31"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실행에서 확인한 것"
                }
              ],
              "position": {
                "line": 687,
                "endLine": 687
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
                "href": "#30"
              },
              "children": [
                {
                  "type": "text",
                  "value": "연결 질문의 배경"
                }
              ],
              "position": {
                "line": 687,
                "endLine": 687
              }
            }
          ],
          "position": {
            "line": 687,
            "endLine": 687
          }
        }
      ],
      "origin": {
        "line": 677,
        "endLine": 687
      },
      "tone": "yellow",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "자료 둘을 잇는 질문을 적는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "자료 둘을 잇는 질문을 적는다"
          }
        ],
        "position": {
          "line": 695,
          "endLine": 695
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
                  "value": "인간의 마음은 그런 방식으로 작동하지 않습니다. 연상으로 작동합니다."
                }
              ],
              "position": {
                "line": 697,
                "endLine": 697
              }
            }
          ],
          "position": {
            "line": 697,
            "endLine": 697
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "발표팀 번역"
            }
          ],
          "position": {
            "line": 699,
            "endLine": 699
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "The human mind does not work that way. It operates by association."
            }
          ],
          "position": {
            "line": 701,
            "endLine": 701
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Vannevar Bush, "
            },
            {
              "type": "element",
              "tag": "em",
              "children": [
                {
                  "type": "text",
                  "value": "As We May Think"
                }
              ],
              "position": {
                "line": 703,
                "endLine": 703
              }
            },
            {
              "type": "text",
              "value": ", 1945년, §6 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/"
              },
              "children": [
                {
                  "type": "text",
                  "value": "출판사 원문"
                }
              ],
              "position": {
                "line": 703,
                "endLine": 703
              }
            }
          ],
          "position": {
            "line": 703,
            "endLine": 703
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "분류 색인과 연상의 차이에서 지식 장치를 구상한 대목입니다."
            }
          ],
          "position": {
            "line": 705,
            "endLine": 705
          }
        }
      ],
      "origin": {
        "line": 691,
        "endLine": 705
      },
      "tone": "purple",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "이번 실행에서 확인한 것",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이번 실행에서 확인한 것"
          }
        ],
        "position": {
          "line": 713,
          "endLine": 713
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "교정안 반영"
            }
          ],
          "position": {
            "line": 718,
            "endLine": 718
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
                  "value": "8"
                }
              ],
              "position": {
                "line": 720,
                "endLine": 720
              }
            },
            {
              "type": "text",
              "value": " 쪽"
            }
          ],
          "position": {
            "line": 720,
            "endLine": 720
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 5쪽 갱신 + 신규 3쪽"
            }
          ],
          "position": {
            "line": 722,
            "endLine": 722
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
                "href": "#17"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고친 문장"
                }
              ],
              "position": {
                "line": 724,
                "endLine": 724
              }
            }
          ],
          "position": {
            "line": 724,
            "endLine": 724
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "로컬 링크 검사"
            }
          ],
          "position": {
            "line": 729,
            "endLine": 729
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
                  "value": "25"
                }
              ],
              "position": {
                "line": 731,
                "endLine": 731
              }
            },
            {
              "type": "text",
              "value": " 링크"
            }
          ],
          "position": {
            "line": 731,
            "endLine": 731
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "상대 경로의 연결 확인"
            }
          ],
          "position": {
            "line": 733,
            "endLine": 733
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
                "href": "#19"
              },
              "children": [
                {
                  "type": "text",
                  "value": "함께 바뀐 기록"
                }
              ],
              "position": {
                "line": 735,
                "endLine": 735
              }
            }
          ],
          "position": {
            "line": 735,
            "endLine": 735
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "보존 파일 해시"
            }
          ],
          "position": {
            "line": 740,
            "endLine": 740
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
                  "value": "10"
                }
              ],
              "position": {
                "line": 742,
                "endLine": 742
              }
            },
            {
              "type": "text",
              "value": " 파일"
            }
          ],
          "position": {
            "line": 742,
            "endLine": 742
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽기 메모 5개 + 초기 5쪽"
            }
          ],
          "position": {
            "line": 744,
            "endLine": 744
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
                "href": "materials/demo-log.html#10-zip%EC%97%90%EC%84%9C-%EC%9E%AC%ED%98%84%ED%95%98%EA%B8%B0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "검사 범위"
                }
              ],
              "position": {
                "line": 746,
                "endLine": 746
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
                "href": "#33"
              },
              "children": [
                {
                  "type": "text",
                  "value": "다음 읽기"
                }
              ],
              "position": {
                "line": 746,
                "endLine": 746
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
                "href": "#32"
              },
              "children": [
                {
                  "type": "text",
                  "value": "역할"
                }
              ],
              "position": {
                "line": 746,
                "endLine": 746
              }
            }
          ],
          "position": {
            "line": 746,
            "endLine": 746
          }
        }
      ],
      "origin": {
        "line": 709,
        "endLine": 746
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "blue",
            "origin": {
              "line": 715,
              "endLine": 717
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 726,
              "endLine": 728
            }
          },
          {
            "start": 8,
            "end": 12,
            "tone": "orange",
            "origin": {
              "line": 737,
              "endLine": 739
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "LLM에게 초안과 연결 후보를 맡긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM에게 초안과 연결 후보를 맡긴다"
          }
        ],
        "position": {
          "line": 754,
          "endLine": 754
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LLM에게 부탁할 일"
            }
          ],
          "position": {
            "line": 759,
            "endLine": 759
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽기 메모 · 연결 후보 · 답 초안 · 수정안"
            }
          ],
          "position": {
            "line": 761,
            "endLine": 761
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "사람이 검토할 일"
            }
          ],
          "position": {
            "line": 766,
            "endLine": 766
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문 위치 · 주장 범위 · 보류 · 현행 채택"
            }
          ],
          "position": {
            "line": 768,
            "endLine": 768
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "실제 운영의 역할 제안입니다. 오늘 Node 스크립트는 사람이 승인한 안을 재현했습니다."
            }
          ],
          "position": {
            "line": 770,
            "endLine": 770
          }
        }
      ],
      "origin": {
        "line": 750,
        "endLine": 770
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "purple",
            "origin": {
              "line": 756,
              "endLine": 758
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 763,
              "endLine": 765
            }
          }
        ]
      }
    },
    {
      "layout": "visual",
      "quiet": true,
      "subtitle": "점검에서 찾은 문제는 다음 읽기와 질문으로 이어집니다.",
      "visual": {
        "kind": "flow",
        "items": [
          "읽고 엮기 · ingest",
          "답하고 남기기 · query",
          "점검하기 · lint"
        ],
        "composition": "wide"
      },
      "source": "Karpathy, LLM Wiki · Operations: 자료를 반영하고 답을 남기고 내용·연결을 점검하는 반복 작업",
      "title": "읽기·질문·점검을 반복한다",
      "origin": {
        "line": 774,
        "endLine": 790
      }
    },
    {
      "layout": "blocks",
      "title": "자료를 고르고 질문을 쓰고 대조한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "자료를 고르고 질문을 쓰고 대조한다"
          }
        ],
        "position": {
          "line": 801,
          "endLine": 801
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
                "src": "assets/5aa7ac752bff-open-books.jpg",
                "alt": "창가 책상에 펼친 책과 공책",
                "title": "자료 고르기"
              },
              "children": [],
              "position": {
                "line": 803,
                "endLine": 803
              }
            }
          ],
          "position": {
            "line": 803,
            "endLine": 803
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/478e6580030c-writing.jpg",
                "alt": "노트에 쓰는 인물",
                "title": "질문 적기"
              },
              "children": [],
              "position": {
                "line": 805,
                "endLine": 805
              }
            }
          ],
          "position": {
            "line": 805,
            "endLine": 805
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/258a229c6dc8-study-table.jpg",
                "alt": "책과 공책과 필기도구가 모인 책상",
                "title": "설명 대조하기"
              },
              "children": [],
              "position": {
                "line": 807,
                "endLine": 807
              }
            }
          ],
          "position": {
            "line": 807,
            "endLine": 807
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "준비 예: 자료 3개 · 질문 1개 · 검토자 1명. 지금은 질문 한 줄부터."
            }
          ],
          "position": {
            "line": 809,
            "endLine": 809
          }
        }
      ],
      "origin": {
        "line": 794,
        "endLine": 809
      },
      "tone": "orange",
      "view": {
        "compose": "gallery",
        "variant": "strip",
        "fit": "cover",
        "focus": [
          "50% 75%",
          "44% 54%",
          "50% 72%"
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "내 질문 한 줄부터 적는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "내 질문 한 줄부터 적는다"
          }
        ],
        "position": {
          "line": 817,
          "endLine": 817
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
                  "value": "내 질문 [한 줄]"
                }
              ],
              "position": {
                "line": 819,
                "endLine": 819
              }
            }
          ],
          "position": {
            "line": 819,
            "endLine": 819
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 제목 [기억나는 만큼] → 근거 위치 [다음 모임에 확인]"
            }
          ],
          "position": {
            "line": 821,
            "endLine": 821
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
                  "value": "20초 동안 쓰기 · 채팅 공유는 선택"
                }
              ],
              "position": {
                "line": 823,
                "endLine": 823
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 823,
            "endLine": 823
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "예: 다음 답이 고친 노트를 읽었는지 어떻게 확인할까?"
            }
          ],
          "position": {
            "line": 825,
            "endLine": 825
          }
        }
      ],
      "origin": {
        "line": 813,
        "endLine": 825
      },
      "tone": "yellow",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "처음 부탁할 말은 짧게 정한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "처음 부탁할 말은 짧게 정한다"
          }
        ],
        "position": {
          "line": 833,
          "endLine": 833
        }
      },
      "blocks": [
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
                  "value": "starter.txt"
                }
              ],
              "position": {
                "line": 835,
                "endLine": 835
              }
            },
            {
              "type": "text",
              "value": "의 요청을 줄여 쓰면:"
            }
          ],
          "position": {
            "line": 835,
            "endLine": 835
          }
        },
        {
          "type": "element",
          "tag": "pre",
          "children": [
            {
              "type": "element",
              "tag": "code",
              "attrs": {
                "class": "language-text"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원문은 보존하고, 이 자료가 기존 질문과 연결될 후보를 찾아 줘.\n주장마다 근거 위치와 아직 지원하지 못한 부분을 표시해 줘.\n반영 전에 바뀔 문장과 이유를 diff로 보여 줘.\n"
                }
              ],
              "position": {
                "line": 837,
                "endLine": 841
              }
            }
          ],
          "position": {
            "line": 837,
            "endLine": 841
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문과 작업 규칙은 "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/9c0a83b5bf0a-llm-wiki-demo.zip"
              },
              "children": [
                {
                  "type": "text",
                  "value": "데모 ZIP"
                }
              ],
              "position": {
                "line": 843,
                "endLine": 843
              }
            },
            {
              "type": "text",
              "value": "에 있습니다. 실제 LLM 실행 결과가 아닌 시작 요청입니다."
            }
          ],
          "position": {
            "line": 843,
            "endLine": 843
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
                "href": "#39"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실행 파일과 공부 자료"
                }
              ],
              "position": {
                "line": 845,
                "endLine": 845
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
                "href": "#37"
              },
              "children": [
                {
                  "type": "text",
                  "value": "검토 규칙과 유지 부담"
                }
              ],
              "position": {
                "line": 845,
                "endLine": 845
              }
            }
          ],
          "position": {
            "line": 845,
            "endLine": 845
          }
        }
      ],
      "origin": {
        "line": 829,
        "endLine": 845
      },
      "tone": "purple",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 모임의 검토자를 정한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 모임의 검토자를 정한다"
          }
        ],
        "position": {
          "line": 853,
          "endLine": 853
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
                  "value": "검토자 한 명과 네 규칙을 함께 읽습니다."
                }
              ],
              "position": {
                "line": 855,
                "endLine": 855
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 855,
            "endLine": 855
          }
        },
        {
          "type": "element",
          "tag": "ul",
          "children": [
            {
              "type": "element",
              "tag": "li",
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "children": [
                    {
                      "type": "text",
                      "value": "원자료를 보존한다."
                    }
                  ],
                  "position": {
                    "line": 857,
                    "endLine": 857
                  }
                }
              ],
              "position": {
                "line": 857,
                "endLine": 857
              }
            },
            {
              "type": "element",
              "tag": "li",
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "children": [
                    {
                      "type": "text",
                      "value": "핵심 주장에 근거와 범위를 붙인다."
                    }
                  ],
                  "position": {
                    "line": 858,
                    "endLine": 858
                  }
                }
              ],
              "position": {
                "line": 858,
                "endLine": 858
              }
            },
            {
              "type": "element",
              "tag": "li",
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "children": [
                    {
                      "type": "text",
                      "value": "미확인 내용은 보류한다."
                    }
                  ],
                  "position": {
                    "line": 859,
                    "endLine": 859
                  }
                }
              ],
              "position": {
                "line": 859,
                "endLine": 859
              }
            },
            {
              "type": "element",
              "tag": "li",
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "children": [
                    {
                      "type": "text",
                      "value": "바뀐 결정과 이유를 남긴다."
                    }
                  ],
                  "position": {
                    "line": 860,
                    "endLine": 860
                  }
                }
              ],
              "position": {
                "line": 860,
                "endLine": 860
              }
            }
          ],
          "position": {
            "line": 857,
            "endLine": 860
          }
        }
      ],
      "origin": {
        "line": 849,
        "endLine": 860
      },
      "tone": "green",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "다시 찾을 가치와 유지 부담을 같이 본다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다시 찾을 가치와 유지 부담을 같이 본다"
          }
        ],
        "position": {
          "line": 868,
          "endLine": 868
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다시 쓸 가치"
            }
          ],
          "position": {
            "line": 873,
            "endLine": 873
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "반복하는 질문"
            }
          ],
          "position": {
            "line": 875,
            "endLine": 875
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자주 바뀌는 자료"
            }
          ],
          "position": {
            "line": 877,
            "endLine": 877
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다른 사람과 나눌 설명"
            }
          ],
          "position": {
            "line": 879,
            "endLine": 879
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "계속 드는 일"
            }
          ],
          "position": {
            "line": 884,
            "endLine": 884
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문 대조와 검토"
            }
          ],
          "position": {
            "line": 886,
            "endLine": 886
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "중복 설명과 낡은 링크 점검"
            }
          ],
          "position": {
            "line": 888,
            "endLine": 888
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "목차·검색의 누락 확인"
            }
          ],
          "position": {
            "line": 890,
            "endLine": 890
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 모임에서 가치와 부담을 봅니다."
            }
          ],
          "position": {
            "line": 892,
            "endLine": 892
          }
        }
      ],
      "origin": {
        "line": 864,
        "endLine": 892
      },
      "tone": "orange",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "green",
            "origin": {
              "line": 870,
              "endLine": 872
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 881,
              "endLine": 883
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "파일 묶음에서 다음 모임으로",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "파일 묶음에서 다음 모임으로"
          }
        ],
        "position": {
          "line": 900,
          "endLine": 900
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "실행해 보기"
            }
          ],
          "position": {
            "line": 905,
            "endLine": 905
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
                "href": "assets/9c0a83b5bf0a-llm-wiki-demo.zip"
              },
              "children": [
                {
                  "type": "text",
                  "value": "데모 ZIP 내려받기"
                }
              ],
              "position": {
                "line": 907,
                "endLine": 907
              }
            }
          ],
          "position": {
            "line": 907,
            "endLine": 907
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "압축 해제 → apply → check"
            }
          ],
          "position": {
            "line": 909,
            "endLine": 909
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
                "href": "materials/demo-log.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실제 파일 읽기와 검증 범위"
                }
              ],
              "position": {
                "line": 911,
                "endLine": 911
              }
            }
          ],
          "position": {
            "line": 911,
            "endLine": 911
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "깊이 공부하기"
            }
          ],
          "position": {
            "line": 916,
            "endLine": 916
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
                "href": "materials/index.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "공부 자료 목차"
                }
              ],
              "position": {
                "line": 918,
                "endLine": 918
              }
            }
          ],
          "position": {
            "line": 918,
            "endLine": 918
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "학습서 · 실습 해설 · 대본 · 원문 안내"
            }
          ],
          "position": {
            "line": 920,
            "endLine": 920
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
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 LLM Wiki 원문"
                }
              ],
              "position": {
                "line": 922,
                "endLine": 922
              }
            }
          ],
          "position": {
            "line": 922,
            "endLine": 922
          }
        }
      ],
      "origin": {
        "line": 896,
        "endLine": 922
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
              "line": 902,
              "endLine": 904
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 913,
              "endLine": 915
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "어떤 노트부터 다시 쓰고 싶나요",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "어떤 노트부터 다시 쓰고 싶나요"
          }
        ],
        "position": {
          "line": 930,
          "endLine": 930
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
                  "value": "질문 · 내 자료 적용 · 검토 부담"
                }
              ],
              "position": {
                "line": 932,
                "endLine": 932
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 932,
            "endLine": 932
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
                "href": "materials/index.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "공부 자료 목차"
                }
              ],
              "position": {
                "line": 934,
                "endLine": 934
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
                "href": "assets/9c0a83b5bf0a-llm-wiki-demo.zip"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실행 가능한 데모 ZIP"
                }
              ],
              "position": {
                "line": 934,
                "endLine": 934
              }
            }
          ],
          "position": {
            "line": 934,
            "endLine": 934
          }
        }
      ],
      "origin": {
        "line": 926,
        "endLine": 934
      },
      "tone": "purple",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
