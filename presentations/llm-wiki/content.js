/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "37544465f9f310da923ddf6d3fa23476b0669c500e8d1be550d2c6f992180576"
  },
  "id": "llm-wiki",
  "title": "다음 질문에 다시 쓰는 LLM Wiki",
  "theme": "stage",
  "slides": [
    {
      "layout": "blocks",
      "title": "읽은 자료의 관계를 다음 질문에도 쓸 수 있을까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "읽은 자료의 관계를 다음 질문에도 쓸 수 있을까"
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
              "value": "자료를 함께 읽으며 얻은 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념과 비교"
                }
              ],
              "position": {
                "line": 15,
                "endLine": 15
              }
            },
            {
              "type": "text",
              "value": "를 남겨 봅시다."
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
      "title": "LLM이 쓰고 계속 갱신하는 지식 위키",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM이 쓰고 계속 갱신하는 지식 위키"
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
                  "value": "LLM이 원자료 사이의 개념·비교·연결을 Markdown 위키로 작성하고 계속 갱신해, 다음 질문이 이전 정리에서 출발하도록 하는 지식관리 방식입니다."
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념 · 비교 · 종합"
                }
              ],
              "position": {
                "line": 27,
                "endLine": 27
              }
            },
            {
              "type": "text",
              "value": "이 연결된 채 남습니다."
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
              "value": "Karpathy의 설계 아이디어를 발표팀이 풀어 쓴 정의 · "
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
                  "value": "고정 원문"
                }
              ],
              "position": {
                "line": 29,
                "endLine": 29
              }
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
      "title": "같은 자료를 매번 다시 엮고 있다면",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "같은 자료를 매번 다시 엮고 있다면"
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
              "value": "이번 질문"
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
              "value": "자료 다섯 개를 읽는다."
            }
          ],
          "position": {
            "line": 44,
            "endLine": 44
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "조건과 차이를 비교해 답한다."
            }
          ],
          "position": {
            "line": 46,
            "endLine": 46
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다음 질문"
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
              "type": "text",
              "value": "이전 비교가 정리되어 있지 않으면,"
            }
          ],
          "position": {
            "line": 53,
            "endLine": 53
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료의 관계를 다시 찾아 엮는다."
            }
          ],
          "position": {
            "line": 55,
            "endLine": 55
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "그 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "관계와 잠정 종합을 남겨 갱신"
                }
              ],
              "position": {
                "line": 57,
                "endLine": 57
              }
            },
            {
              "type": "text",
              "value": "하려는 설계입니다."
            }
          ],
          "position": {
            "line": 57,
            "endLine": 57
          }
        }
      ],
      "origin": {
        "line": 33,
        "endLine": 57
      },
      "tone": "orange",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "origin": {
              "line": 39,
              "endLine": 41
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "purple",
            "origin": {
              "line": 48,
              "endLine": 50
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "답만 남기는 대신 개념과 비교를 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "답만 남기는 대신 개념과 비교를 남긴다"
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
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/8263a8f3fd79-wiki-maintenance-loop.svg",
                "alt": "원자료를 읽은 LLM이 자료 요약과 기존 개념·비교·종합을 작성하고, 질문에서 위키를 다시 읽어 얻은 유용한 답을 저장한다. 작업 규칙은 전체 작업을 안내한다."
              },
              "children": [],
              "position": {
                "line": 68,
                "endLine": 68
              }
            }
          ],
          "position": {
            "line": 68,
            "endLine": 68
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
                  "value": "LLM이 여러 자료의 개념·비교·종합을 작성하고 갱신합니다."
                }
              ],
              "position": {
                "line": 70,
                "endLine": 70
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/8263a8f3fd79-wiki-maintenance-loop.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림 원본"
                }
              ],
              "position": {
                "line": 70,
                "endLine": 70
              }
            }
          ],
          "position": {
            "line": 70,
            "endLine": 70
          }
        }
      ],
      "origin": {
        "line": 61,
        "endLine": 70
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "LLM은 위키를 쓰고 사람은 탐색을 이끈다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM은 위키를 쓰고 사람은 탐색을 이끈다"
          }
        ],
        "position": {
          "line": 78,
          "endLine": 78
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LLM 에이전트"
            }
          ],
          "position": {
            "line": 83,
            "endLine": 83
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "파일을 현재 문맥에 읽고 Markdown 작성"
            }
          ],
          "position": {
            "line": 85,
            "endLine": 85
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "요약 · 관련 페이지 갱신"
            }
          ],
          "position": {
            "line": 87,
            "endLine": 87
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "연결 · 답 저장 · 점검"
            }
          ],
          "position": {
            "line": 89,
            "endLine": 89
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "사람"
            }
          ],
          "position": {
            "line": 94,
            "endLine": 94
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 · 범위 · 질문 선택"
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
              "value": "분석 방향 · 결과 확인"
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
              "value": "읽는 도구"
            }
          ],
          "position": {
            "line": 103,
            "endLine": 103
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "페이지와 링크 탐색"
            }
          ],
          "position": {
            "line": 105,
            "endLine": 105
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Obsidian 등에서 읽기"
            }
          ],
          "position": {
            "line": 107,
            "endLine": 107
          }
        }
      ],
      "origin": {
        "line": 74,
        "endLine": 107
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 80,
              "endLine": 82
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 91,
              "endLine": 93
            }
          },
          {
            "start": 7,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 100,
              "endLine": 102
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "원자료와 위키 그리고 작업 규칙",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원자료와 위키 그리고 작업 규칙"
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
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/79afc5f22a98-wiki-layers.svg",
                "alt": "보존하는 원자료 raw와 LLM이 갱신하는 wiki를 구별한다. schema 작업 규칙은 읽기·쓰기·질문·점검 전체에 적용되며 세 번째 변환 산출물이 아니다."
              },
              "children": [],
              "position": {
                "line": 118,
                "endLine": 118
              }
            }
          ],
          "position": {
            "line": 118,
            "endLine": 118
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원자료는 보존 · 위키는 갱신 · 규칙은 전체에 적용. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a#architecture"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Architecture"
                }
              ],
              "position": {
                "line": 120,
                "endLine": 120
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
                "href": "assets/79afc5f22a98-wiki-layers.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림 원본"
                }
              ],
              "position": {
                "line": 120,
                "endLine": 120
              }
            }
          ],
          "position": {
            "line": 120,
            "endLine": 120
          }
        }
      ],
      "origin": {
        "line": 111,
        "endLine": 120
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "새 자료 한 개가 여러 설명을 바꾼다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 자료 한 개가 여러 설명을 바꾼다"
          }
        ],
        "position": {
          "line": 129,
          "endLine": 129
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
                "src": "assets/127df6c27adf-wiki-ingest-update.svg",
                "alt": "새 자료를 읽어 요약을 만들면서 관련 개념·비교·잠정 종합도 갱신한다. 기존 내용과 대조하고 근거와 아직 확인하지 못한 부분을 남긴다."
              },
              "children": [],
              "position": {
                "line": 131,
                "endLine": 131
              }
            }
          ],
          "position": {
            "line": 131,
            "endLine": 131
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
                  "value": "Ingest:"
                }
              ],
              "position": {
                "line": 133,
                "endLine": 133
              }
            },
            {
              "type": "text",
              "value": " 새 요약과 관련된 기존 페이지를 함께 갱신합니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/127df6c27adf-wiki-ingest-update.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림 원본"
                }
              ],
              "position": {
                "line": 133,
                "endLine": 133
              }
            }
          ],
          "position": {
            "line": 133,
            "endLine": 133
          }
        }
      ],
      "origin": {
        "line": 124,
        "endLine": 133
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문은 저장된 위키를 찾아 읽는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문은 저장된 위키를 찾아 읽는다"
          }
        ],
        "position": {
          "line": 142,
          "endLine": 142
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
                "src": "assets/d68e2a55ee89-wiki-query-return.svg",
                "alt": "index나 검색으로 관련 위키를 찾고 현재 답변의 문맥으로 읽어 답한다. 유용한 새 답은 페이지로 저장하고 관련 위키에 연결한다. 필요한 근거는 원자료로 돌아간다."
              },
              "children": [],
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
                  "value": "Query:"
                }
              ],
              "position": {
                "line": 146,
                "endLine": 146
              }
            },
            {
              "type": "text",
              "value": " 위키를 읽어 답하고 유용한 답을 다시 저장합니다. 파일 갱신과 가중치 학습은 별개입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/d68e2a55ee89-wiki-query-return.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림 원본"
                }
              ],
              "position": {
                "line": 146,
                "endLine": 146
              }
            }
          ],
          "position": {
            "line": 146,
            "endLine": 146
          }
        }
      ],
      "origin": {
        "line": 137,
        "endLine": 146
      },
      "tone": "purple",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "낡은 설명과 빠진 연결을 점검한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "낡은 설명과 빠진 연결을 점검한다"
          }
        ],
        "position": {
          "line": 154,
          "endLine": 154
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "낡은 설명 · lint"
            }
          ],
          "position": {
            "line": 159,
            "endLine": 159
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새 자료가 들어왔는데"
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
              "value": "옛 상태만 남아 있나?"
            }
          ],
          "position": {
            "line": 163,
            "endLine": 163
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다른 조건"
            }
          ],
          "position": {
            "line": 168,
            "endLine": 168
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "두 설명이 충돌하나?"
            }
          ],
          "position": {
            "line": 170,
            "endLine": 170
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "서로 다른 범위인가?"
            }
          ],
          "position": {
            "line": 172,
            "endLine": 172
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "빠진 연결"
            }
          ],
          "position": {
            "line": 177,
            "endLine": 177
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "중요한 개념이 빠졌나?"
            }
          ],
          "position": {
            "line": 179,
            "endLine": 179
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다시 찾아갈 길이 있나?"
            }
          ],
          "position": {
            "line": 181,
            "endLine": 181
          }
        }
      ],
      "origin": {
        "line": 150,
        "endLine": 181
      },
      "tone": "yellow",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "origin": {
              "line": 156,
              "endLine": 158
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "purple",
            "origin": {
              "line": 165,
              "endLine": 167
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "green",
            "origin": {
              "line": 174,
              "endLine": 176
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "소설을 읽으며 인물과 주제를 쌓는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "소설을 읽으며 인물과 주제를 쌓는다"
          }
        ],
        "position": {
          "line": 190,
          "endLine": 190
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
                "src": "assets/381686fba25b-case-reading.svg",
                "alt": "가상 소설의 1장과 3장 메모를 인물 서하·신뢰 주제·장 요약에 연결한다. 읽은 장의 근거와 인물의 자기 설명을 구별하며 배신에 관한 질문의 답을 남긴다."
              },
              "children": [],
              "position": {
                "line": 192,
                "endLine": 192
              }
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
              "value": "가상 소설의 적용 예 · 읽은 장의 근거와 미확인을 함께 남깁니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#%EC%86%8C%EC%84%A4-%EB%8F%85%EC%84%9C"
              },
              "children": [
                {
                  "type": "text",
                  "value": "학습서"
                }
              ],
              "position": {
                "line": 194,
                "endLine": 194
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
                "href": "assets/c25067e5b335-reading.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "입력과 전후 파일"
                }
              ],
              "position": {
                "line": 194,
                "endLine": 194
              }
            }
          ],
          "position": {
            "line": 194,
            "endLine": 194
          }
        }
      ],
      "origin": {
        "line": 185,
        "endLine": 194
      },
      "tone": "purple",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "새 장은 인물의 동기 해석을 바꾼다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 장은 인물의 동기 해석을 바꾼다"
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
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 소설 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "characters/seoha.md"
                }
              ],
              "position": {
                "line": 204,
                "endLine": 204
              }
            },
            {
              "type": "text",
              "value": " 구성 파일 발췌"
            }
          ],
          "position": {
            "line": 204,
            "endLine": 204
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "1장까지"
            }
          ],
          "position": {
            "line": 209,
            "endLine": 209
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
                  "value": "서하의 의도는 아직 확인하지 못했다."
                }
              ],
              "position": {
                "line": 211,
                "endLine": 211
              }
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
              "value": "3장까지"
            }
          ],
          "position": {
            "line": 216,
            "endLine": 216
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
                  "value": "서하는 동료를 피신시키려 했다고 설명한다."
                }
              ],
              "position": {
                "line": 218,
                "endLine": 218
              }
            }
          ],
          "position": {
            "line": 218,
            "endLine": 218
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
                  "value": "미확인: 서하의 설명 전체와 이후 선택"
                }
              ],
              "position": {
                "line": 220,
                "endLine": 220
              }
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
              "type": "text",
              "value": "인물 · 신뢰 주제 · 3장 요약을 함께 갱신합니다."
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
      "tone": "purple",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 1,
            "end": 3,
            "tone": "blue",
            "origin": {
              "line": 206,
              "endLine": 208
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "purple",
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
      "title": "다음 질문은 관계와 남은 의문을 다시 쓴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문은 관계와 남은 의문을 다시 쓴다"
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
                  "value": "서하의 선택을 왜 배신으로만 볼 수 없을까?"
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
              "value": "가상 소설 · 저장할 질문 페이지"
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
              "value": "도윤의 판단과 서하의 자기 설명을 구별해 답하고, "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "인물·신뢰 페이지에 연결해 저장"
                }
              ],
              "position": {
                "line": 236,
                "endLine": 236
              }
            },
            {
              "type": "text",
              "value": "합니다."
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
                "line": 238,
                "endLine": 238
              }
            },
            {
              "type": "text",
              "value": " 서하의 이후 행동은 이 설명과 일치할까?"
            }
          ],
          "position": {
            "line": 238,
            "endLine": 238
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
                "href": "assets/c25067e5b335-reading.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문 답의 구성 파일"
                }
              ],
              "position": {
                "line": 240,
                "endLine": 240
              }
            }
          ],
          "position": {
            "line": 240,
            "endLine": 240
          }
        }
      ],
      "origin": {
        "line": 226,
        "endLine": 240
      },
      "tone": "purple",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "같은 CSV 요청으로 묶어도 될까요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "같은 CSV 요청으로 묶어도 될까요?"
          }
        ],
        "position": {
          "line": 248,
          "endLine": 248
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "고객 A · 가상 상담"
            }
          ],
          "position": {
            "line": 253,
            "endLine": 253
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "월말 정산에 사용"
            }
          ],
          "position": {
            "line": 255,
            "endLine": 255
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "화면에서 CSV 다운로드"
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
              "value": "회계 담당자에게 전달"
            }
          ],
          "position": {
            "line": 259,
            "endLine": 259
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "고객 B · 가상 상담"
            }
          ],
          "position": {
            "line": 264,
            "endLine": 264
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "매일 대시보드 갱신"
            }
          ],
          "position": {
            "line": 266,
            "endLine": 266
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새벽에 CSV 자동 수신"
            }
          ],
          "position": {
            "line": 268,
            "endLine": 268
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "매일 새 자료를 수집"
            }
          ],
          "position": {
            "line": 270,
            "endLine": 270
          }
        }
      ],
      "origin": {
        "line": 244,
        "endLine": 270
      },
      "tone": "neutral",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 4,
            "tone": "neutral",
            "origin": {
              "line": 250,
              "endLine": 252
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "neutral",
            "origin": {
              "line": 261,
              "endLine": 263
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "새 회의가 요구 비교와 현재 상태를 바꾼다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 회의가 요구 비교와 현재 상태를 바꾼다"
          }
        ],
        "position": {
          "line": 279,
          "endLine": 279
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
                "src": "assets/0719dc19d603-case-team.svg",
                "alt": "월말 수동 다운로드와 일별 자동 수집 요청을 내보내기 개념과 비교에 연결한다. 새 회의는 이번 분기 수동 CSV 범위 검토와 예약 전송 보류를 알려 관련 상태·비교·FAQ를 갱신한다. 출시일은 미확정이다."
              },
              "children": [],
              "position": {
                "line": 281,
                "endLine": 281
              }
            }
          ],
          "position": {
            "line": 281,
            "endLine": 281
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 고객 요구의 적용 예 · "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "요구는 보존하고 상태를 갱신"
                }
              ],
              "position": {
                "line": 283,
                "endLine": 283
              }
            },
            {
              "type": "text",
              "value": "합니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#%EA%B3%A0%EA%B0%9D-%EC%9A%94%EA%B5%AC"
              },
              "children": [
                {
                  "type": "text",
                  "value": "학습서"
                }
              ],
              "position": {
                "line": 283,
                "endLine": 283
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
                "href": "assets/b9b79ffd8cd0-team.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "입력과 전후 파일"
                }
              ],
              "position": {
                "line": 283,
                "endLine": 283
              }
            }
          ],
          "position": {
            "line": 283,
            "endLine": 283
          }
        }
      ],
      "origin": {
        "line": 274,
        "endLine": 283
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "고객에게 답할 때 이전 구분을 다시 쓴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "고객에게 답할 때 이전 구분을 다시 쓴다"
          }
        ],
        "position": {
          "line": 291,
          "endLine": 291
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
                  "value": "예약 전송은 운영 비용 검토가 남아 보류 중이며 출시일은 확정하지 않았다."
                }
              ],
              "position": {
                "line": 293,
                "endLine": 293
              }
            }
          ],
          "position": {
            "line": 293,
            "endLine": 293
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 응대 초안 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "questions/what-to-tell-b.md"
                }
              ],
              "position": {
                "line": 295,
                "endLine": 295
              }
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "질문:"
                }
              ],
              "position": {
                "line": 297,
                "endLine": 297
              }
            },
            {
              "type": "text",
              "value": " 고객 B에게 지금 무엇을 말할까?"
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
              "value": "내보내기 개념·요구 비교·회의 근거를 읽고 답을 저장합니다."
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
              "value": "다음에 확인할 것: 일별 수동 다운로드로도 업무를 해결할 수 있을까?"
            }
          ],
          "position": {
            "line": 301,
            "endLine": 301
          }
        }
      ],
      "origin": {
        "line": 287,
        "endLine": 301
      },
      "tone": "green",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "떨어진 강의에서 같은 개념을 만난다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "떨어진 강의에서 같은 개념을 만난다"
          }
        ],
        "position": {
          "line": 310,
          "endLine": 310
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
                "src": "assets/92826f25bf47-case-course.svg",
                "alt": "2주차 회귀와 7주차 회귀트리의 제곱오차를 공유 개념에 연결한다. 8주차 분류트리의 Gini 기준을 비교에 더하고 공통점과 차이를 종합 파일로 남긴다."
              },
              "children": [],
              "position": {
                "line": 312,
                "endLine": 312
              }
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
              "value": "가상 강의 메모의 적용 예 · "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "공통 기준과 다른 조건을 비교·종합에 연결"
                }
              ],
              "position": {
                "line": 314,
                "endLine": 314
              }
            },
            {
              "type": "text",
              "value": "합니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#%EA%B0%95%EC%9D%98-%EB%A9%94%EB%AA%A8"
              },
              "children": [
                {
                  "type": "text",
                  "value": "학습서"
                }
              ],
              "position": {
                "line": 314,
                "endLine": 314
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
                "href": "assets/7f02c1c31f4c-course.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "입력과 전후 파일"
                }
              ],
              "position": {
                "line": 314,
                "endLine": 314
              }
            }
          ],
          "position": {
            "line": 314,
            "endLine": 314
          }
        }
      ],
      "origin": {
        "line": 305,
        "endLine": 314
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "새 강의는 비교할 기준을 늘린다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 강의는 비교할 기준을 늘린다"
          }
        ],
        "position": {
          "line": 322,
          "endLine": 322
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 강의 · 기존 비교에 8주차를 추가"
            }
          ],
          "position": {
            "line": 324,
            "endLine": 324
          }
        },
        {
          "type": "element",
          "tag": "table",
          "children": [
            {
              "type": "element",
              "tag": "thead",
              "children": [
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "읽은 메모"
                        }
                      ],
                      "position": {
                        "line": 326,
                        "endLine": 326
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "모델"
                        }
                      ],
                      "position": {
                        "line": 326,
                        "endLine": 326
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "이 예의 기준"
                        }
                      ],
                      "position": {
                        "line": 326,
                        "endLine": 326
                      }
                    }
                  ],
                  "position": {
                    "line": 326,
                    "endLine": 326
                  }
                }
              ],
              "position": {
                "line": 326,
                "endLine": 326
              }
            },
            {
              "type": "element",
              "tag": "tbody",
              "children": [
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "2주차"
                        }
                      ],
                      "position": {
                        "line": 328,
                        "endLine": 328
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "회귀"
                        }
                      ],
                      "position": {
                        "line": 328,
                        "endLine": 328
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "제곱오차"
                        }
                      ],
                      "position": {
                        "line": 328,
                        "endLine": 328
                      }
                    }
                  ],
                  "position": {
                    "line": 328,
                    "endLine": 328
                  }
                },
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "7주차"
                        }
                      ],
                      "position": {
                        "line": 329,
                        "endLine": 329
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "회귀트리"
                        }
                      ],
                      "position": {
                        "line": 329,
                        "endLine": 329
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "제곱오차"
                        }
                      ],
                      "position": {
                        "line": 329,
                        "endLine": 329
                      }
                    }
                  ],
                  "position": {
                    "line": 329,
                    "endLine": 329
                  }
                },
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
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
                              "value": "새 8주차"
                            }
                          ],
                          "position": {
                            "line": 330,
                            "endLine": 330
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
                        }
                      ],
                      "position": {
                        "line": 330,
                        "endLine": 330
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
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
                              "value": "분류트리"
                            }
                          ],
                          "position": {
                            "line": 330,
                            "endLine": 330
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
                        }
                      ],
                      "position": {
                        "line": 330,
                        "endLine": 330
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
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
                              "value": "Gini 불순도"
                            }
                          ],
                          "position": {
                            "line": 330,
                            "endLine": 330
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
                        }
                      ],
                      "position": {
                        "line": 330,
                        "endLine": 330
                      }
                    }
                  ],
                  "position": {
                    "line": 330,
                    "endLine": 330
                  }
                }
              ],
              "position": {
                "line": 328,
                "endLine": 330
              }
            }
          ],
          "position": {
            "line": 326,
            "endLine": 330
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새 개념과 근거를 더하고, "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "비교·관련 질문도 함께 갱신"
                }
              ],
              "position": {
                "line": 332,
                "endLine": 332
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 332,
            "endLine": 332
          }
        }
      ],
      "origin": {
        "line": 318,
        "endLine": 332
      },
      "tone": "blue",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "질문에서 얻은 종합도 다음 학습에 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "질문에서 얻은 종합도 다음 학습에 남긴다"
          }
        ],
        "position": {
          "line": 340,
          "endLine": 340
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
                  "value": "구조가 다른 모델이 같은 기준을 쓸 수 있고, 같은 트리 계열에서도 과제에 따라 기준이 다를 수 있다."
                }
              ],
              "position": {
                "line": 342,
                "endLine": 342
              }
            }
          ],
          "position": {
            "line": 342,
            "endLine": 342
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 강의 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "synthesis/error-and-trees.md"
                }
              ],
              "position": {
                "line": 344,
                "endLine": 344
              }
            },
            {
              "type": "text",
              "value": " 구성 파일 발췌"
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
              "value": "이 세 메모의 근거를 함께 연결해 저장합니다."
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
                "line": 348,
                "endLine": 348
              }
            },
            {
              "type": "text",
              "value": " 분할 기준을 바꾸면 무엇을 새로 확인해야 할까?"
            }
          ],
          "position": {
            "line": 348,
            "endLine": 348
          }
        }
      ],
      "origin": {
        "line": 336,
        "endLine": 348
      },
      "tone": "blue",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "입력은 달라도 남기는 구조는 같다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "입력은 달라도 남기는 구조는 같다"
          }
        ],
        "position": {
          "line": 356,
          "endLine": 356
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 적용 예 세 가지 비교"
            }
          ],
          "position": {
            "line": 358,
            "endLine": 358
          }
        },
        {
          "type": "element",
          "tag": "table",
          "children": [
            {
              "type": "element",
              "tag": "thead",
              "children": [
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "입력"
                        }
                      ],
                      "position": {
                        "line": 360,
                        "endLine": 360
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "유지할 위키"
                        }
                      ],
                      "position": {
                        "line": 360,
                        "endLine": 360
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "다음 질문에서 재사용"
                        }
                      ],
                      "position": {
                        "line": 360,
                        "endLine": 360
                      }
                    }
                  ],
                  "position": {
                    "line": 360,
                    "endLine": 360
                  }
                }
              ],
              "position": {
                "line": 360,
                "endLine": 360
              }
            },
            {
              "type": "element",
              "tag": "tbody",
              "children": [
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "소설의 장 메모"
                        }
                      ],
                      "position": {
                        "line": 362,
                        "endLine": 362
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "인물 · 주제 · 해석"
                        }
                      ],
                      "position": {
                        "line": 362,
                        "endLine": 362
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "행동을 어떻게 해석할까?"
                        }
                      ],
                      "position": {
                        "line": 362,
                        "endLine": 362
                      }
                    }
                  ],
                  "position": {
                    "line": 362,
                    "endLine": 362
                  }
                },
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "고객 상담과 회의"
                        }
                      ],
                      "position": {
                        "line": 363,
                        "endLine": 363
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "요구 · 비교 · 응대 답"
                        }
                      ],
                      "position": {
                        "line": 363,
                        "endLine": 363
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "무엇을 말하고 확인할까?"
                        }
                      ],
                      "position": {
                        "line": 363,
                        "endLine": 363
                      }
                    }
                  ],
                  "position": {
                    "line": 363,
                    "endLine": 363
                  }
                },
                {
                  "type": "element",
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "여러 주차의 강의"
                        }
                      ],
                      "position": {
                        "line": 364,
                        "endLine": 364
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "개념 · 비교 · 종합"
                        }
                      ],
                      "position": {
                        "line": 364,
                        "endLine": 364
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "무엇이 같고 다른가?"
                        }
                      ],
                      "position": {
                        "line": 364,
                        "endLine": 364
                      }
                    }
                  ],
                  "position": {
                    "line": 364,
                    "endLine": 364
                  }
                }
              ],
              "position": {
                "line": 362,
                "endLine": 364
              }
            }
          ],
          "position": {
            "line": 360,
            "endLine": 364
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
                  "value": "새 입력 → 여러 페이지 갱신 → 다음 질문 → 유용한 답 저장"
                }
              ],
              "position": {
                "line": 366,
                "endLine": 366
              }
            },
            {
              "type": "text",
              "value": ""
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#%EC%84%B8-%EA%B0%80%EC%A7%80-%EC%A0%81%EC%9A%A9-%EC%98%88"
              },
              "children": [
                {
                  "type": "text",
                  "value": "세 가지 적용 예 자세히 읽기"
                }
              ],
              "position": {
                "line": 368,
                "endLine": 368
              }
            }
          ],
          "position": {
            "line": 368,
            "endLine": 368
          }
        }
      ],
      "origin": {
        "line": 352,
        "endLine": 368
      },
      "tone": "orange",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "위키도 필요한 페이지를 찾아야 한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "위키도 필요한 페이지를 찾아야 한다"
          }
        ],
        "position": {
          "line": 376,
          "endLine": 376
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "index · 읽을 입구"
            }
          ],
          "position": {
            "line": 381,
            "endLine": 381
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문과 관련된 쪽을 찾습니다."
            }
          ],
          "position": {
            "line": 383,
            "endLine": 383
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "필요한 페이지의 본문을 읽습니다."
            }
          ],
          "position": {
            "line": 385,
            "endLine": 385
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "검색 · 필요한 근거로"
            }
          ],
          "position": {
            "line": 390,
            "endLine": 390
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "위키와 원자료를 함께 찾을 수 있습니다."
            }
          ],
          "position": {
            "line": 392,
            "endLine": 392
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새 범위나 세부 사항은 원자료로 돌아갑니다."
            }
          ],
          "position": {
            "line": 394,
            "endLine": 394
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "파일이 있다는 것과 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "이번 답이 읽었다는 것"
                }
              ],
              "position": {
                "line": 396,
                "endLine": 396
              }
            },
            {
              "type": "text",
              "value": "을 구별합니다."
            }
          ],
          "position": {
            "line": 396,
            "endLine": 396
          }
        }
      ],
      "origin": {
        "line": 372,
        "endLine": 396
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
              "line": 378,
              "endLine": 380
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "purple",
            "origin": {
              "line": 387,
              "endLine": 389
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "저장된 설명에도 오류와 누락은 남는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "저장된 설명에도 오류와 누락은 남는다"
          }
        ],
        "position": {
          "line": 404,
          "endLine": 404
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "독서의 해석"
            }
          ],
          "position": {
            "line": 409,
            "endLine": 409
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "인물의 자기 설명을"
            }
          ],
          "position": {
            "line": 411,
            "endLine": 411
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "확정 동기로 바꾸지 않기"
            }
          ],
          "position": {
            "line": 413,
            "endLine": 413
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "고객의 요구"
            }
          ],
          "position": {
            "line": 418,
            "endLine": 418
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "접수된 요청을"
            }
          ],
          "position": {
            "line": 420,
            "endLine": 420
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "출시 약속으로 바꾸지 않기"
            }
          ],
          "position": {
            "line": 422,
            "endLine": 422
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "강의의 기준"
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
              "value": "한 예의 기준을"
            }
          ],
          "position": {
            "line": 429,
            "endLine": 429
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "모든 모델로 넓히지 않기"
            }
          ],
          "position": {
            "line": 431,
            "endLine": 431
          }
        }
      ],
      "origin": {
        "line": 400,
        "endLine": 431
      },
      "tone": "orange",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "purple",
            "origin": {
              "line": 406,
              "endLine": 408
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 415,
              "endLine": 417
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "blue",
            "origin": {
              "line": 424,
              "endLine": 426
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "다시 쓸 가치와 유지 부담을 같이 본다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다시 쓸 가치와 유지 부담을 같이 본다"
          }
        ],
        "position": {
          "line": 439,
          "endLine": 439
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
            "line": 444,
            "endLine": 444
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "반복해서 비교할 질문"
            }
          ],
          "position": {
            "line": 446,
            "endLine": 446
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "계속 추가되는 자료"
            }
          ],
          "position": {
            "line": 448,
            "endLine": 448
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "함께 읽을 개념과 설명"
            }
          ],
          "position": {
            "line": 450,
            "endLine": 450
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
            "line": 455,
            "endLine": 455
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 반영과 기존 페이지 갱신"
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
              "value": "근거·중복·낡은 설명 검토"
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
              "value": "필요한 파일을 찾는 경로 점검"
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
              "value": "자기 질문에서 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "재사용 가치와 유지 부담"
                }
              ],
              "position": {
                "line": 463,
                "endLine": 463
              }
            },
            {
              "type": "text",
              "value": "을 확인합니다."
            }
          ],
          "position": {
            "line": 463,
            "endLine": 463
          }
        }
      ],
      "origin": {
        "line": 435,
        "endLine": 463
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
              "line": 441,
              "endLine": 443
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 452,
              "endLine": 454
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "읽기·질문·점검이 같은 위키로 돌아온다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "읽기·질문·점검이 같은 위키로 돌아온다"
          }
        ],
        "position": {
          "line": 472,
          "endLine": 472
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
                "src": "assets/8263a8f3fd79-wiki-maintenance-loop.svg",
                "alt": "읽고 엮는 ingest, 위키를 읽어 답하고 저장하는 query, 내용과 연결을 점검하는 lint가 같은 지속 위키를 갱신한다. 규칙은 전체 작업을 안내한다."
              },
              "children": [],
              "position": {
                "line": 474,
                "endLine": 474
              }
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "읽고 엮기 · 답하고 남기기 · 낡은 설명과 연결 점검하기."
                }
              ],
              "position": {
                "line": 476,
                "endLine": 476
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/8263a8f3fd79-wiki-maintenance-loop.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "순환 그림 원본"
                }
              ],
              "position": {
                "line": 476,
                "endLine": 476
              }
            }
          ],
          "position": {
            "line": 476,
            "endLine": 476
          }
        }
      ],
      "origin": {
        "line": 467,
        "endLine": 476
      },
      "tone": "green",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "내 자료에서 다시 답할 질문 한 줄",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "내 자료에서 다시 답할 질문 한 줄"
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
                "line": 486,
                "endLine": 486
              }
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "20초 동안 자기 노트에 쓰기 · 공유는 선택"
                }
              ],
              "position": {
                "line": 488,
                "endLine": 488
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "자료 제목 [기억나는 만큼] → 근거 위치 [다음에 확인]"
            }
          ],
          "position": {
            "line": 490,
            "endLine": 490
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "예: 지난 상담과 새 회의를 함께 보면 고객에게 무엇을 말할 수 있을까?"
            }
          ],
          "position": {
            "line": 492,
            "endLine": 492
          }
        }
      ],
      "origin": {
        "line": 480,
        "endLine": 492
      },
      "tone": "yellow",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "기존 설명을 함께 갱신해 달라고 부탁한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "기존 설명을 함께 갱신해 달라고 부탁한다"
          }
        ],
        "position": {
          "line": 500,
          "endLine": 500
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "파일을 읽고 쓸 수 있는 LLM 에이전트에 보내는 시작 요청"
            }
          ],
          "position": {
            "line": 502,
            "endLine": 502
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
                  "value": "새 자료를 읽고 기존 개념·비교·종합을 함께 갱신해 줘.\n근거와 조건 차이, 충돌·미확인을 구별해 줘.\n주요 변경과 그 이유를 보여 줘.\n유용한 질문의 답도 관련 페이지에 연결해 저장해 줘.\n"
                }
              ],
              "position": {
                "line": 504,
                "endLine": 509
              }
            }
          ],
          "position": {
            "line": 504,
            "endLine": 509
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 위치와 작업 규칙을 함께 알려 줍니다."
            }
          ],
          "position": {
            "line": 511,
            "endLine": 511
          }
        }
      ],
      "origin": {
        "line": 496,
        "endLine": 511
      },
      "tone": "purple",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문에서 실제로 다시 읽어 본다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문에서 실제로 다시 읽어 본다"
          }
        ],
        "position": {
          "line": 522,
          "endLine": 522
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
                "line": 524,
                "endLine": 524
              }
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
              "tag": "img",
              "attrs": {
                "src": "assets/478e6580030c-writing.jpg",
                "alt": "노트에 쓰는 인물",
                "title": "질문 정하기"
              },
              "children": [],
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
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/258a229c6dc8-study-table.jpg",
                "alt": "책과 공책과 필기도구가 모인 책상",
                "title": "갱신된 쪽 다시 읽기"
              },
              "children": [],
              "position": {
                "line": 528,
                "endLine": 528
              }
            }
          ],
          "position": {
            "line": 528,
            "endLine": 528
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "작게 시작할 예: 자료 몇 개 · 질문 하나 · 결과를 확인할 사람."
            }
          ],
          "position": {
            "line": 530,
            "endLine": 530
          }
        }
      ],
      "origin": {
        "line": 515,
        "endLine": 530
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
      "title": "개념·예제·실습을 따로 이어 읽는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "개념·예제·실습을 따로 이어 읽는다"
          }
        ],
        "position": {
          "line": 538,
          "endLine": 538
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "개념 이해"
            }
          ],
          "position": {
            "line": 543,
            "endLine": 543
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
                  "value": "학습서"
                }
              ],
              "position": {
                "line": 545,
                "endLine": 545
              }
            }
          ],
          "position": {
            "line": 545,
            "endLine": 545
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
                "href": "materials/reference-library.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원문과 근거 안내"
                }
              ],
              "position": {
                "line": 547,
                "endLine": 547
              }
            }
          ],
          "position": {
            "line": 547,
            "endLine": 547
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "내 자료로 작성"
            }
          ],
          "position": {
            "line": 552,
            "endLine": 552
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
                "href": "materials/study-guide.html#%EC%84%B8-%EA%B0%80%EC%A7%80-%EC%A0%81%EC%9A%A9-%EC%98%88"
              },
              "children": [
                {
                  "type": "text",
                  "value": "세 가지 적용 예"
                }
              ],
              "position": {
                "line": 554,
                "endLine": 554
              }
            }
          ],
          "position": {
            "line": 554,
            "endLine": 554
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
                "href": "materials/workshop.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실습과 해설"
                }
              ],
              "position": {
                "line": 556,
                "endLine": 556
              }
            }
          ],
          "position": {
            "line": 556,
            "endLine": 556
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "파일 교정 재현"
            }
          ],
          "position": {
            "line": 561,
            "endLine": 561
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
                  "value": "실제 실행 범위"
                }
              ],
              "position": {
                "line": 563,
                "endLine": 563
              }
            }
          ],
          "position": {
            "line": 563,
            "endLine": 563
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
                  "value": "고정 데모 ZIP"
                }
              ],
              "position": {
                "line": 565,
                "endLine": 565
              }
            }
          ],
          "position": {
            "line": 565,
            "endLine": 565
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
                  "value": "전체 자료 목차와 40장 대본"
                }
              ],
              "position": {
                "line": 567,
                "endLine": 567
              }
            }
          ],
          "position": {
            "line": 567,
            "endLine": 567
          }
        }
      ],
      "origin": {
        "line": 534,
        "endLine": 567
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "blue",
            "origin": {
              "line": 540,
              "endLine": 542
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 549,
              "endLine": 551
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "orange",
            "origin": {
              "line": 558,
              "endLine": 560
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문이 이전 정리에서 출발하도록",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문이 이전 정리에서 출발하도록"
          }
        ],
        "position": {
          "line": 575,
          "endLine": 575
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
                  "value": "LLM이 작성하고 갱신하는 위키."
                }
              ],
              "position": {
                "line": 577,
                "endLine": 577
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "개념과 비교와 종합을 남기고,"
            }
          ],
          "position": {
            "line": 579,
            "endLine": 579
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 질문에서 다시 찾아 읽습니다."
            }
          ],
          "position": {
            "line": 581,
            "endLine": 581
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
                "href": "#40"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문과 적용 이야기"
                }
              ],
              "position": {
                "line": 583,
                "endLine": 583
              }
            }
          ],
          "position": {
            "line": 583,
            "endLine": 583
          }
        }
      ],
      "origin": {
        "line": 571,
        "endLine": 583
      },
      "tone": "green",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "공개 구현은 등록과 LLM 작성을 나눈다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "공개 구현은 등록과 LLM 작성을 나눈다"
          }
        ],
        "position": {
          "line": 591,
          "endLine": 591
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "공개 코드 관찰 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "microsoft/llmwiki"
                }
              ],
              "position": {
                "line": 593,
                "endLine": 593
              }
            },
            {
              "type": "text",
              "value": " 고정 판"
            }
          ],
          "position": {
            "line": 593,
            "endLine": 593
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "기계 등록 · ingestSource"
            }
          ],
          "position": {
            "line": 598,
            "endLine": 598
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료의 미리보기 페이지"
            }
          ],
          "position": {
            "line": 600,
            "endLine": 600
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "index · log 갱신"
            }
          ],
          "position": {
            "line": 602,
            "endLine": 602
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "LLM 내용 작성 · llmIngest"
            }
          ],
          "position": {
            "line": 607,
            "endLine": 607
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 텍스트와 index를 모델에 전달"
            }
          ],
          "position": {
            "line": 609,
            "endLine": 609
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "요약 · 개체 · 개념 · 연결 작성"
            }
          ],
          "position": {
            "line": 611,
            "endLine": 611
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설치·실행 결과가 아닌 코드 관찰입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://github.com/microsoft/llmwiki/tree/e09126f257c1fcf8e63234382748a51cf6a5df7f"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 코드"
                }
              ],
              "position": {
                "line": 613,
                "endLine": 613
              }
            }
          ],
          "position": {
            "line": 613,
            "endLine": 613
          }
        }
      ],
      "origin": {
        "line": 587,
        "endLine": 613
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 1,
            "end": 4,
            "tone": "blue",
            "origin": {
              "line": 595,
              "endLine": 597
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "purple",
            "origin": {
              "line": 604,
              "endLine": 606
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "문서의 기능 설명도 코드와 대조한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "문서의 기능 설명도 코드와 대조한다"
          }
        ],
        "position": {
          "line": 621,
          "endLine": 621
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "공개 코드 관찰 · 같은 고정 판"
            }
          ],
          "position": {
            "line": 623,
            "endLine": 623
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "질문 · handleQuery"
            }
          ],
          "position": {
            "line": 628,
            "endLine": 628
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "키워드 검색의 상위 8쪽"
            }
          ],
          "position": {
            "line": 630,
            "endLine": 630
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "각 앞 3,000자를 답의 문맥에 넣음"
            }
          ],
          "position": {
            "line": 632,
            "endLine": 632
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "저장 · handleSave"
            }
          ],
          "position": {
            "line": 637,
            "endLine": 637
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "파일을 쓰지 않고 수동 저장을 안내합니다."
            }
          ],
          "position": {
            "line": 639,
            "endLine": 639
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "README의 "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "/save"
                }
              ],
              "position": {
                "line": 641,
                "endLine": 641
              }
            },
            {
              "type": "text",
              "value": "를 자동 저장 구현으로 읽지 않습니다."
            }
          ],
          "position": {
            "line": 641,
            "endLine": 641
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
                "href": "https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/chatParticipant.ts"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 코드"
                }
              ],
              "position": {
                "line": 643,
                "endLine": 643
              }
            }
          ],
          "position": {
            "line": 643,
            "endLine": 643
          }
        }
      ],
      "origin": {
        "line": 617,
        "endLine": 643
      },
      "tone": "purple",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 1,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 625,
              "endLine": 627
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "orange",
            "origin": {
              "line": 634,
              "endLine": 636
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "살아 있는 코드라면 판과 해시도 추적한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "살아 있는 코드라면 판과 해시도 추적한다"
          }
        ],
        "position": {
          "line": 651,
          "endLine": 651
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "공개 구현의 변형 · "
            },
            {
              "type": "element",
              "tag": "code",
              "children": [
                {
                  "type": "text",
                  "value": "llm-code-wiki"
                }
              ],
              "position": {
                "line": 653,
                "endLine": 653
              }
            }
          ],
          "position": {
            "line": 653,
            "endLine": 653
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
                  "value": "코드 → 저장소 개요·개념·계약 → 다음 질문"
                }
              ],
              "position": {
                "line": 655,
                "endLine": 655
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "읽었던 판과 해시를 식별하고 코드가 바뀌면 관련 설명을 재검토합니다."
            }
          ],
          "position": {
            "line": 657,
            "endLine": 657
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "해시 차이는 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "변경 신호"
                }
              ],
              "position": {
                "line": 659,
                "endLine": 659
              }
            },
            {
              "type": "text",
              "value": "입니다. 의미 오류 판정이나 자동 수정은 아닙니다."
            }
          ],
          "position": {
            "line": 659,
            "endLine": 659
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
                "href": "https://github.com/dylannalex/llm-code-wiki/tree/422fe1d3ff889295285b2f1a339cdbf789f43e5b"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 설계와 검사 코드"
                }
              ],
              "position": {
                "line": 661,
                "endLine": 661
              }
            }
          ],
          "position": {
            "line": 661,
            "endLine": 661
          }
        }
      ],
      "origin": {
        "line": 647,
        "endLine": 661
      },
      "tone": "blue",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "강의 위키를 QA로 비교한 초기 연구도 있다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "강의 위키를 QA로 비교한 초기 연구도 있다"
          }
        ],
        "position": {
          "line": 669,
          "endLine": 669
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "논문 실험 · Wright, arXiv v1 · 실제 평가의 문맥 조건"
            }
          ],
          "position": {
            "line": 671,
            "endLine": 671
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "Wiki arm"
            }
          ],
          "position": {
            "line": 676,
            "endLine": 676
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "59문항에 같은 고정 section 제공"
            }
          ],
          "position": {
            "line": 678,
            "endLine": 678
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "각 질문의 대상 자료도 포함"
            }
          ],
          "position": {
            "line": 680,
            "endLine": 680
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "문맥 선택 실패 단계 없음"
            }
          ],
          "position": {
            "line": 682,
            "endLine": 682
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "RAG arm"
            }
          ],
          "position": {
            "line": 687,
            "endLine": 687
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "21벡터 중 5개를 검색"
            }
          ],
          "position": {
            "line": 689,
            "endLine": 689
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검색된 문맥으로 답함"
            }
          ],
          "position": {
            "line": 691,
            "endLine": 691
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "검색 누락이 생길 수 있음"
            }
          ],
          "position": {
            "line": 693,
            "endLine": 693
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "질문 답의 품질을 비교한 실험입니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://arxiv.org/html/2609.25303v1"
              },
              "children": [
                {
                  "type": "text",
                  "value": "논문 §6"
                }
              ],
              "position": {
                "line": 695,
                "endLine": 695
              }
            }
          ],
          "position": {
            "line": 695,
            "endLine": 695
          }
        }
      ],
      "origin": {
        "line": 665,
        "endLine": 695
      },
      "tone": "green",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 1,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 673,
              "endLine": 675
            }
          },
          {
            "start": 5,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 684,
              "endLine": 686
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "문맥 선택의 차이를 위키 전체의 우위로 넓히지 않는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "문맥 선택의 차이를 위키 전체의 우위로 넓히지 않는다"
          }
        ],
        "position": {
          "line": 703,
          "endLine": 703
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "비교 조건 · 논문 실험"
            }
          ],
          "position": {
            "line": 708,
            "endLine": 708
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "고정 문맥 제공과 검색의 차이"
            }
          ],
          "position": {
            "line": 710,
            "endLine": 710
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "표현만의 공정 비교로 해석 불가"
            }
          ],
          "position": {
            "line": 712,
            "endLine": 712
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "평가 범위"
            }
          ],
          "position": {
            "line": 717,
            "endLine": 717
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "단일 코퍼스 · 답변 1회"
            }
          ],
          "position": {
            "line": 719,
            "endLine": 719
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "한 LLM judge의 판단"
            }
          ],
          "position": {
            "line": 721,
            "endLine": 721
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "확인하지 않은 것"
            }
          ],
          "position": {
            "line": 726,
            "endLine": 726
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "학생 학습성과"
            }
          ],
          "position": {
            "line": 728,
            "endLine": 728
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "운영 비용 · 보편 우위"
            }
          ],
          "position": {
            "line": 730,
            "endLine": 730
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
                "href": "materials/reference-library.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실험 조건과 근거 안내"
                }
              ],
              "position": {
                "line": 732,
                "endLine": 732
              }
            }
          ],
          "position": {
            "line": 732,
            "endLine": 732
          }
        }
      ],
      "origin": {
        "line": 699,
        "endLine": 732
      },
      "tone": "orange",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "origin": {
              "line": 705,
              "endLine": 707
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "purple",
            "origin": {
              "line": 714,
              "endLine": 716
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 723,
              "endLine": 725
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "보조 실습은 승인한 교정안을 파일에 반영한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "보조 실습은 승인한 교정안을 파일에 반영한다"
          }
        ],
        "position": {
          "line": 740,
          "endLine": 740
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 고정 데모 · 사람이 의미를 검토하고 Node로 반영"
            }
          ],
          "position": {
            "line": 742,
            "endLine": 742
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "준비한 입력"
            }
          ],
          "position": {
            "line": 747,
            "endLine": 747
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "학습용 오류가 있는 Q1"
            }
          ],
          "position": {
            "line": 749,
            "endLine": 749
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "원문을 대조한 고정 승인안"
            }
          ],
          "position": {
            "line": 751,
            "endLine": 751
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "실제 실행"
            }
          ],
          "position": {
            "line": 756,
            "endLine": 756
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "파일 수정 · diff 생성"
            }
          ],
          "position": {
            "line": 758,
            "endLine": 758
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "링크 · 보존 파일 해시 검사"
            }
          ],
          "position": {
            "line": 760,
            "endLine": 760
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "LLM 호출·자동 검색·새 답 생성은 수행하지 않았습니다."
            }
          ],
          "position": {
            "line": 762,
            "endLine": 762
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
                  "value": "실제 파일 읽기"
                }
              ],
              "position": {
                "line": 764,
                "endLine": 764
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
                "href": "#40"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문으로 돌아가기"
                }
              ],
              "position": {
                "line": 764,
                "endLine": 764
              }
            }
          ],
          "position": {
            "line": 764,
            "endLine": 764
          }
        }
      ],
      "origin": {
        "line": 736,
        "endLine": 764
      },
      "tone": "blue",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 1,
            "end": 4,
            "tone": "orange",
            "origin": {
              "line": 744,
              "endLine": 746
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "blue",
            "origin": {
              "line": 753,
              "endLine": 755
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "실제 diff는 문장과 적용 범위를 바꾼다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "실제 diff는 문장과 적용 범위를 바꾼다"
          }
        ],
        "position": {
          "line": 772,
          "endLine": 772
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "삭제 · 모든 시스템"
            }
          ],
          "position": {
            "line": 777,
            "endLine": 777
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 고정 데모 · C1 파일 발췌"
            }
          ],
          "position": {
            "line": 779,
            "endLine": 779
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
                    "line": 781,
                    "endLine": 782
                  }
                },
                {
                  "type": "text",
                  "value": "모델을 학습하지 않는다."
                }
              ],
              "position": {
                "line": 781,
                "endLine": 782
              }
            }
          ],
          "position": {
            "line": 781,
            "endLine": 782
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
            "line": 787,
            "endLine": 787
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
                "line": 789,
                "endLine": 789
              }
            }
          ],
          "position": {
            "line": 789,
            "endLine": 789
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
                "line": 791,
                "endLine": 791
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
                  "value": "LoRA v2 §4.1"
                }
              ],
              "position": {
                "line": 791,
                "endLine": 791
              }
            }
          ],
          "position": {
            "line": 791,
            "endLine": 791
          }
        }
      ],
      "origin": {
        "line": 768,
        "endLine": 791
      },
      "tone": "blue",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 3,
            "tone": "orange",
            "origin": {
              "line": 774,
              "endLine": 776
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 784,
              "endLine": 786
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "교정한 설명을 다른 질문에도 다시 쓴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "교정한 설명을 다른 질문에도 다시 쓴다"
          }
        ],
        "position": {
          "line": 800,
          "endLine": 800
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
                "src": "assets/441435e97663-reuse-inputs.svg",
                "alt": "교정된 C1, Q1의 다음 확인, 초기 결정 D1을 함께 읽어 새 운영 질문 Q2를 판단한다. 이 목록은 고정 승인 예제의 입력이며 자동 검색의 성공 기록이 아니다."
              },
              "children": [],
              "position": {
                "line": 802,
                "endLine": 802
              }
            }
          ],
          "position": {
            "line": 802,
            "endLine": 802
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "고정 승인 예제의 판단 입력입니다. 자동 검색·생성 실행의 기록이 아닙니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/demo-log.html#6-%EC%83%88-%EC%A7%88%EB%AC%B8-q2%EA%B0%80-%EC%9D%B4%EC%A0%84-%EA%B2%B0%EA%B3%BC%EB%A5%BC-%EB%8B%A4%EC%8B%9C-%EC%93%B4%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Q2 재사용 기록"
                }
              ],
              "position": {
                "line": 804,
                "endLine": 804
              }
            }
          ],
          "position": {
            "line": 804,
            "endLine": 804
          }
        }
      ],
      "origin": {
        "line": 795,
        "endLine": 804
      },
      "tone": "purple",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "선택이 바뀌면 맥락과 결과를 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "선택이 바뀌면 맥락과 결과를 남긴다"
          }
        ],
        "position": {
          "line": 813,
          "endLine": 813
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
                "src": "assets/70a44a23d5e1-decision-transition.svg",
                "alt": "모든 답을 현행에 저장하려던 D1은 대체됨으로 남기고 검토한 답을 현행으로 연결하는 D2에 새 선택과 검토 부담을 적는다."
              },
              "children": [],
              "position": {
                "line": 815,
                "endLine": 815
              }
            }
          ],
          "position": {
            "line": 815,
            "endLine": 815
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 구성 예 · ADR을 응용한 운영 선택이며 LLM Wiki의 필수 형식은 아닙니다. "
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
                  "value": "결정 기록 근거"
                }
              ],
              "position": {
                "line": 817,
                "endLine": 817
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
                "href": "materials/demo-log.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "실행 기록"
                }
              ],
              "position": {
                "line": 817,
                "endLine": 817
              }
            }
          ],
          "position": {
            "line": 817,
            "endLine": 817
          }
        }
      ],
      "origin": {
        "line": 808,
        "endLine": 817
      },
      "tone": "orange",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "파일 검사와 의미 검토는 다른 확인이다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "파일 검사와 의미 검토는 다른 확인이다"
          }
        ],
        "position": {
          "line": 825,
          "endLine": 825
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
            "line": 830,
            "endLine": 830
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 데모의 파일 검사"
            }
          ],
          "position": {
            "line": 832,
            "endLine": 832
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
                "line": 834,
                "endLine": 834
              }
            },
            {
              "type": "text",
              "value": " 쪽"
            }
          ],
          "position": {
            "line": 834,
            "endLine": 834
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
            "line": 836,
            "endLine": 836
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "로컬 링크"
            }
          ],
          "position": {
            "line": 841,
            "endLine": 841
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
                "line": 843,
                "endLine": 843
              }
            },
            {
              "type": "text",
              "value": " 링크"
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
              "type": "text",
              "value": "상대 경로의 연결 확인"
            }
          ],
          "position": {
            "line": 845,
            "endLine": 845
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "보존 해시"
            }
          ],
          "position": {
            "line": 850,
            "endLine": 850
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
                "line": 852,
                "endLine": 852
              }
            },
            {
              "type": "text",
              "value": " 파일"
            }
          ],
          "position": {
            "line": 852,
            "endLine": 852
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
            "line": 854,
            "endLine": 854
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "정확도·검색 누락·시간 절감의 측정값은 아닙니다."
            }
          ],
          "position": {
            "line": 856,
            "endLine": 856
          }
        }
      ],
      "origin": {
        "line": 821,
        "endLine": 856
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
              "line": 827,
              "endLine": 829
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 838,
              "endLine": 840
            }
          },
          {
            "start": 7,
            "end": 11,
            "tone": "orange",
            "origin": {
              "line": 847,
              "endLine": 849
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "원문과 구성 예의 근거를 구분해 읽는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원문과 구성 예의 근거를 구분해 읽는다"
          }
        ],
        "position": {
          "line": 864,
          "endLine": 864
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "원저자 설계"
            }
          ],
          "position": {
            "line": 869,
            "endLine": 869
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "무엇을 제안했나?"
            }
          ],
          "position": {
            "line": 871,
            "endLine": 871
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "공개 코드 관찰"
            }
          ],
          "position": {
            "line": 876,
            "endLine": 876
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "어떤 경로가 구현됐나?"
            }
          ],
          "position": {
            "line": 878,
            "endLine": 878
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "논문 실험"
            }
          ],
          "position": {
            "line": 883,
            "endLine": 883
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "어떤 조건을 평가했나?"
            }
          ],
          "position": {
            "line": 885,
            "endLine": 885
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "구성 적용 예"
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
              "value": "무엇을 가정해 설명했나?"
            }
          ],
          "position": {
            "line": 892,
            "endLine": 892
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
                "href": "materials/reference-library.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원문과 근거 안내"
                }
              ],
              "position": {
                "line": 894,
                "endLine": 894
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
                "href": "#40"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문으로 돌아가기"
                }
              ],
              "position": {
                "line": 894,
                "endLine": 894
              }
            }
          ],
          "position": {
            "line": 894,
            "endLine": 894
          }
        }
      ],
      "origin": {
        "line": 860,
        "endLine": 894
      },
      "tone": "purple",
      "view": {
        "compose": "bento",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "blue",
            "origin": {
              "line": 866,
              "endLine": 868
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 873,
              "endLine": 875
            }
          },
          {
            "start": 4,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 880,
              "endLine": 882
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 887,
              "endLine": 889
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "어떤 자료에서 다음 질문을 이어 가고 싶나요",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "어떤 자료에서 다음 질문을 이어 가고 싶나요"
          }
        ],
        "position": {
          "line": 902,
          "endLine": 902
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
                  "value": "내 자료 · 반복하는 질문 · 유지할 설명"
                }
              ],
              "position": {
                "line": 904,
                "endLine": 904
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 904,
            "endLine": 904
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
                "line": 906,
                "endLine": 906
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
                "href": "materials/study-guide.html#%EC%84%B8-%EA%B0%80%EC%A7%80-%EC%A0%81%EC%9A%A9-%EC%98%88"
              },
              "children": [
                {
                  "type": "text",
                  "value": "세 가지 적용 예"
                }
              ],
              "position": {
                "line": 906,
                "endLine": 906
              }
            }
          ],
          "position": {
            "line": 906,
            "endLine": 906
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
                  "value": "공개 구현과 실험 더 보기"
                }
              ],
              "position": {
                "line": 908,
                "endLine": 908
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
                "href": "#34"
              },
              "children": [
                {
                  "type": "text",
                  "value": "기존 파일 교정 예제"
                }
              ],
              "position": {
                "line": 908,
                "endLine": 908
              }
            }
          ],
          "position": {
            "line": 908,
            "endLine": 908
          }
        }
      ],
      "origin": {
        "line": 898,
        "endLine": 908
      },
      "tone": "purple",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
