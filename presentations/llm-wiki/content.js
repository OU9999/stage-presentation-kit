/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "bec9b35fc7b711651ef55d354ede5b760a2d710650bb2fd7128c83f8657cab7f"
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
                "src": "assets/72d50863ca07-wiki-maintenance-loop.svg",
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
              "value": "한 자료의 요약을 넘어 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "여러 자료를 함께 읽은 결과"
                }
              ],
              "position": {
                "line": 70,
                "endLine": 70
              }
            },
            {
              "type": "text",
              "value": "를 유지합니다."
            }
          ],
          "position": {
            "line": 70,
            "endLine": 70
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
                "href": "assets/72d50863ca07-wiki-maintenance-loop.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "순환 그림 원본"
                }
              ],
              "position": {
                "line": 72,
                "endLine": 72
              }
            }
          ],
          "position": {
            "line": 72,
            "endLine": 72
          }
        }
      ],
      "origin": {
        "line": 61,
        "endLine": 72
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
          "line": 80,
          "endLine": 80
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
              "value": "파일을 현재 문맥에 읽고 Markdown 작성"
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
              "value": "요약 · 관련 페이지 갱신"
            }
          ],
          "position": {
            "line": 89,
            "endLine": 89
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
            "line": 91,
            "endLine": 91
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
              "value": "자료 · 범위 · 질문 선택"
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
              "value": "분석 방향 · 결과 확인"
            }
          ],
          "position": {
            "line": 100,
            "endLine": 100
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
              "value": "페이지와 링크 탐색"
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
              "value": "Obsidian 등에서 읽기"
            }
          ],
          "position": {
            "line": 109,
            "endLine": 109
          }
        }
      ],
      "origin": {
        "line": 76,
        "endLine": 109
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
              "line": 82,
              "endLine": 84
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 93,
              "endLine": 95
            }
          },
          {
            "start": 7,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 102,
              "endLine": 104
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
          "line": 118,
          "endLine": 118
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
                "alt": "보존하는 원자료 raw와 LLM이 갱신하는 wiki를 구별한다. schema 작업 규칙은 읽기·쓰기·질문·점검 전체에 적용되며 세 번째 변환 산출물이 아니다."
              },
              "children": [],
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
                  "value": "원자료는 보존 · 위키는 갱신 · 규칙은 전체 작업에 적용"
                }
              ],
              "position": {
                "line": 122,
                "endLine": 122
              }
            },
            {
              "type": "text",
              "value": ""
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/9de04be0b94d-wiki-layers.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "구조 그림 원본"
                }
              ],
              "position": {
                "line": 124,
                "endLine": 124
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
                "href": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a#architecture"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Architecture"
                }
              ],
              "position": {
                "line": 124,
                "endLine": 124
              }
            }
          ],
          "position": {
            "line": 124,
            "endLine": 124
          }
        }
      ],
      "origin": {
        "line": 113,
        "endLine": 124
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
          "line": 133,
          "endLine": 133
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
                "src": "assets/4de19f852a22-wiki-ingest-update.svg",
                "alt": "새 자료를 읽어 요약을 만들면서 관련 개념·비교·잠정 종합도 갱신한다. 기존 내용과 대조하고 근거와 아직 확인하지 못한 부분을 남긴다."
              },
              "children": [],
              "position": {
                "line": 135,
                "endLine": 135
              }
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
                "line": 137,
                "endLine": 137
              }
            },
            {
              "type": "text",
              "value": " 새 요약과 함께 기존 개념·비교·종합을 갱신합니다."
            }
          ],
          "position": {
            "line": 137,
            "endLine": 137
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
                "href": "assets/4de19f852a22-wiki-ingest-update.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "갱신 그림 원본"
                }
              ],
              "position": {
                "line": 139,
                "endLine": 139
              }
            }
          ],
          "position": {
            "line": 139,
            "endLine": 139
          }
        }
      ],
      "origin": {
        "line": 128,
        "endLine": 139
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
          "line": 148,
          "endLine": 148
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
                "src": "assets/523f5e200135-wiki-query-return.svg",
                "alt": "index나 검색으로 관련 위키를 찾고 현재 답변의 문맥으로 읽어 답한다. 유용한 새 답은 페이지로 저장하고 관련 위키에 연결한다. 필요한 근거는 원자료로 돌아간다."
              },
              "children": [],
              "position": {
                "line": 150,
                "endLine": 150
              }
            }
          ],
          "position": {
            "line": 150,
            "endLine": 150
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
                "line": 152,
                "endLine": 152
              }
            },
            {
              "type": "text",
              "value": " 관련 파일을 현재 문맥에 읽어 답하고, 유용한 답을 다시 저장합니다."
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
              "value": "파일 갱신과 모델 가중치 학습은 별개의 작업입니다."
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "assets/523f5e200135-wiki-query-return.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문과 저장 그림 원본"
                }
              ],
              "position": {
                "line": 156,
                "endLine": 156
              }
            }
          ],
          "position": {
            "line": 156,
            "endLine": 156
          }
        }
      ],
      "origin": {
        "line": 143,
        "endLine": 156
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
          "line": 164,
          "endLine": 164
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
            "line": 169,
            "endLine": 169
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
              "value": "옛 상태만 남아 있나?"
            }
          ],
          "position": {
            "line": 173,
            "endLine": 173
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
            "line": 178,
            "endLine": 178
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
            "line": 180,
            "endLine": 180
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
            "line": 182,
            "endLine": 182
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
            "line": 187,
            "endLine": 187
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
            "line": 189,
            "endLine": 189
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
            "line": 191,
            "endLine": 191
          }
        }
      ],
      "origin": {
        "line": 160,
        "endLine": 191
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
              "line": 166,
              "endLine": 168
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "purple",
            "origin": {
              "line": 175,
              "endLine": 177
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "green",
            "origin": {
              "line": 184,
              "endLine": 186
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
          "line": 200,
          "endLine": 200
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
                "src": "assets/c8c698645f7c-case-reading.svg",
                "alt": "가상 소설의 1장과 3장 메모를 인물 서하·신뢰 주제·장 요약에 연결한다. 읽은 장의 근거와 인물의 자기 설명을 구별하며 배신에 관한 질문의 답을 남긴다."
              },
              "children": [],
              "position": {
                "line": 202,
                "endLine": 202
              }
            }
          ],
          "position": {
            "line": 202,
            "endLine": 202
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 자료로 만든 적용 예 · 소설 독서"
            }
          ],
          "position": {
            "line": 204,
            "endLine": 204
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "1장: "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "서하는 지도를 숨기고 북문을 떠났다."
                }
              ],
              "position": {
                "line": 206,
                "endLine": 206
              }
            },
            {
              "type": "text",
              "value": " 동기는 아직 모릅니다."
            }
          ],
          "position": {
            "line": 206,
            "endLine": 206
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
                "href": "materials/study-guide.html#%EC%86%8C%EC%84%A4-%EB%8F%85%EC%84%9C"
              },
              "children": [
                {
                  "type": "text",
                  "value": "독서 파일 읽기"
                }
              ],
              "position": {
                "line": 208,
                "endLine": 208
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
                "line": 208,
                "endLine": 208
              }
            }
          ],
          "position": {
            "line": 208,
            "endLine": 208
          }
        }
      ],
      "origin": {
        "line": 195,
        "endLine": 208
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
          "line": 216,
          "endLine": 216
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
                "line": 218,
                "endLine": 218
              }
            },
            {
              "type": "text",
              "value": " 구성 파일 발췌"
            }
          ],
          "position": {
            "line": 218,
            "endLine": 218
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
            "line": 223,
            "endLine": 223
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
                "line": 225,
                "endLine": 225
              }
            }
          ],
          "position": {
            "line": 225,
            "endLine": 225
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
            "line": 230,
            "endLine": 230
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
                "line": 234,
                "endLine": 234
              }
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
              "value": "인물 · 신뢰 주제 · 3장 요약을 함께 갱신합니다."
            }
          ],
          "position": {
            "line": 236,
            "endLine": 236
          }
        }
      ],
      "origin": {
        "line": 212,
        "endLine": 236
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
              "line": 220,
              "endLine": 222
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "purple",
            "origin": {
              "line": 227,
              "endLine": 229
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
          "line": 244,
          "endLine": 244
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
                "line": 246,
                "endLine": 246
              }
            }
          ],
          "position": {
            "line": 246,
            "endLine": 246
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
                "line": 250,
                "endLine": 250
              }
            },
            {
              "type": "text",
              "value": "합니다."
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
                "line": 252,
                "endLine": 252
              }
            },
            {
              "type": "text",
              "value": " 서하의 이후 행동은 이 설명과 일치할까?"
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
                "line": 254,
                "endLine": 254
              }
            }
          ],
          "position": {
            "line": 254,
            "endLine": 254
          }
        }
      ],
      "origin": {
        "line": 240,
        "endLine": 254
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
          "line": 262,
          "endLine": 262
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
            "line": 267,
            "endLine": 267
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
            "line": 269,
            "endLine": 269
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
            "line": 271,
            "endLine": 271
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
            "line": 273,
            "endLine": 273
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
            "line": 278,
            "endLine": 278
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
            "line": 280,
            "endLine": 280
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
            "line": 282,
            "endLine": 282
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
            "line": 284,
            "endLine": 284
          }
        }
      ],
      "origin": {
        "line": 258,
        "endLine": 284
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
              "line": 264,
              "endLine": 266
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "neutral",
            "origin": {
              "line": 275,
              "endLine": 277
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
          "line": 293,
          "endLine": 293
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
                "src": "assets/145b3d5fc0a2-case-team.svg",
                "alt": "월말 수동 다운로드와 일별 자동 수집 요청을 내보내기 개념과 비교에 연결한다. 새 회의는 이번 분기 수동 CSV 범위 검토와 예약 전송 보류를 알려 관련 상태·비교·FAQ를 갱신한다. 출시일은 미확정이다."
              },
              "children": [],
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
              "value": "가상 고객 요구 · 상담 두 건과 새 회의"
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
              "value": "같은 CSV여도 목적과 자동화 범위가 다릅니다. "
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
                "line": 299,
                "endLine": 299
              }
            },
            {
              "type": "text",
              "value": "합니다."
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#%EA%B3%A0%EA%B0%9D-%EC%9A%94%EA%B5%AC"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고객 요구 파일 읽기"
                }
              ],
              "position": {
                "line": 301,
                "endLine": 301
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
                "line": 301,
                "endLine": 301
              }
            }
          ],
          "position": {
            "line": 301,
            "endLine": 301
          }
        }
      ],
      "origin": {
        "line": 288,
        "endLine": 301
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
          "line": 309,
          "endLine": 309
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
                "line": 311,
                "endLine": 311
              }
            }
          ],
          "position": {
            "line": 311,
            "endLine": 311
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
                "line": 313,
                "endLine": 313
              }
            }
          ],
          "position": {
            "line": 313,
            "endLine": 313
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
                "line": 315,
                "endLine": 315
              }
            },
            {
              "type": "text",
              "value": " 고객 B에게 지금 무엇을 말할까?"
            }
          ],
          "position": {
            "line": 315,
            "endLine": 315
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
            "line": 317,
            "endLine": 317
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
            "line": 319,
            "endLine": 319
          }
        }
      ],
      "origin": {
        "line": 305,
        "endLine": 319
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
          "line": 328,
          "endLine": 328
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
                "src": "assets/f910677f4df1-case-course.svg",
                "alt": "2주차 회귀와 7주차 회귀트리의 제곱오차를 공유 개념에 연결한다. 8주차 분류트리의 Gini 기준을 비교에 더하고 공통점과 차이를 종합 파일로 남긴다."
              },
              "children": [],
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
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "가상 자료로 만든 적용 예 · 강의 메모"
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
              "value": "2주차 회귀와 7주차 회귀트리에서 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "제곱오차"
                }
              ],
              "position": {
                "line": 334,
                "endLine": 334
              }
            },
            {
              "type": "text",
              "value": "를 다시 만납니다."
            }
          ],
          "position": {
            "line": 334,
            "endLine": 334
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
                "href": "materials/study-guide.html#%EA%B0%95%EC%9D%98-%EB%A9%94%EB%AA%A8"
              },
              "children": [
                {
                  "type": "text",
                  "value": "강의 메모 파일 읽기"
                }
              ],
              "position": {
                "line": 336,
                "endLine": 336
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
                "line": 336,
                "endLine": 336
              }
            }
          ],
          "position": {
            "line": 336,
            "endLine": 336
          }
        }
      ],
      "origin": {
        "line": 323,
        "endLine": 336
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
          "line": 344,
          "endLine": 344
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
            "line": 346,
            "endLine": 346
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
                        "line": 348,
                        "endLine": 348
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
                        "line": 348,
                        "endLine": 348
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
              "position": {
                "line": 348,
                "endLine": 348
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
                        "line": 350,
                        "endLine": 350
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
                        "line": 350,
                        "endLine": 350
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
                        "line": 350,
                        "endLine": 350
                      }
                    }
                  ],
                  "position": {
                    "line": 350,
                    "endLine": 350
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
                        "line": 351,
                        "endLine": 351
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
                        "line": 351,
                        "endLine": 351
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
                        "line": 351,
                        "endLine": 351
                      }
                    }
                  ],
                  "position": {
                    "line": 351,
                    "endLine": 351
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
                            "line": 352,
                            "endLine": 352
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
                        }
                      ],
                      "position": {
                        "line": 352,
                        "endLine": 352
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
                            "line": 352,
                            "endLine": 352
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
                        }
                      ],
                      "position": {
                        "line": 352,
                        "endLine": 352
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
                            "line": 352,
                            "endLine": 352
                          }
                        },
                        {
                          "type": "text",
                          "value": ""
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
                }
              ],
              "position": {
                "line": 350,
                "endLine": 352
              }
            }
          ],
          "position": {
            "line": 348,
            "endLine": 352
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
                "line": 354,
                "endLine": 354
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 354,
            "endLine": 354
          }
        }
      ],
      "origin": {
        "line": 340,
        "endLine": 354
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
          "line": 362,
          "endLine": 362
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
                "line": 364,
                "endLine": 364
              }
            }
          ],
          "position": {
            "line": 364,
            "endLine": 364
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
                "line": 366,
                "endLine": 366
              }
            },
            {
              "type": "text",
              "value": " 구성 파일 발췌"
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
              "value": "이 세 메모의 근거를 함께 연결해 저장합니다."
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
                "line": 370,
                "endLine": 370
              }
            },
            {
              "type": "text",
              "value": " 분할 기준을 바꾸면 무엇을 새로 확인해야 할까?"
            }
          ],
          "position": {
            "line": 370,
            "endLine": 370
          }
        }
      ],
      "origin": {
        "line": 358,
        "endLine": 370
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
              "type": "text",
              "value": "가상 적용 예 세 가지 비교"
            }
          ],
          "position": {
            "line": 380,
            "endLine": 380
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
                        "line": 382,
                        "endLine": 382
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
                        "line": 382,
                        "endLine": 382
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
                        "line": 382,
                        "endLine": 382
                      }
                    }
                  ],
                  "position": {
                    "line": 382,
                    "endLine": 382
                  }
                }
              ],
              "position": {
                "line": 382,
                "endLine": 382
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
                        "line": 384,
                        "endLine": 384
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
                        "line": 384,
                        "endLine": 384
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
                        "line": 384,
                        "endLine": 384
                      }
                    }
                  ],
                  "position": {
                    "line": 384,
                    "endLine": 384
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
                        "line": 385,
                        "endLine": 385
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
                        "line": 385,
                        "endLine": 385
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
                        "line": 385,
                        "endLine": 385
                      }
                    }
                  ],
                  "position": {
                    "line": 385,
                    "endLine": 385
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
                        "line": 386,
                        "endLine": 386
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
                        "line": 386,
                        "endLine": 386
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
                        "line": 386,
                        "endLine": 386
                      }
                    }
                  ],
                  "position": {
                    "line": 386,
                    "endLine": 386
                  }
                }
              ],
              "position": {
                "line": 384,
                "endLine": 386
              }
            }
          ],
          "position": {
            "line": 382,
            "endLine": 386
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
                "line": 388,
                "endLine": 388
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 388,
            "endLine": 388
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
                "line": 390,
                "endLine": 390
              }
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
              "value": "index · 읽을 입구"
            }
          ],
          "position": {
            "line": 403,
            "endLine": 403
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
            "line": 405,
            "endLine": 405
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
            "line": 407,
            "endLine": 407
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
            "line": 412,
            "endLine": 412
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
            "line": 414,
            "endLine": 414
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
            "line": 416,
            "endLine": 416
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
                "line": 418,
                "endLine": 418
              }
            },
            {
              "type": "text",
              "value": "을 구별합니다."
            }
          ],
          "position": {
            "line": 418,
            "endLine": 418
          }
        }
      ],
      "origin": {
        "line": 394,
        "endLine": 418
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
              "line": 400,
              "endLine": 402
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "purple",
            "origin": {
              "line": 409,
              "endLine": 411
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
          "line": 426,
          "endLine": 426
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
            "line": 431,
            "endLine": 431
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
            "line": 433,
            "endLine": 433
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
            "line": 435,
            "endLine": 435
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
              "value": "접수된 요청을"
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
              "type": "text",
              "value": "출시 약속으로 바꾸지 않기"
            }
          ],
          "position": {
            "line": 444,
            "endLine": 444
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
            "line": 449,
            "endLine": 449
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
            "line": 451,
            "endLine": 451
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
            "line": 453,
            "endLine": 453
          }
        }
      ],
      "origin": {
        "line": 422,
        "endLine": 453
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
              "line": 428,
              "endLine": 430
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 437,
              "endLine": 439
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "blue",
            "origin": {
              "line": 446,
              "endLine": 448
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
          "line": 461,
          "endLine": 461
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
            "line": 466,
            "endLine": 466
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
              "value": "계속 추가되는 자료"
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
              "value": "함께 읽을 개념과 설명"
            }
          ],
          "position": {
            "line": 472,
            "endLine": 472
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
            "line": 477,
            "endLine": 477
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
            "line": 479,
            "endLine": 479
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
            "line": 481,
            "endLine": 481
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
            "line": 483,
            "endLine": 483
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
                "line": 485,
                "endLine": 485
              }
            },
            {
              "type": "text",
              "value": "을 확인합니다."
            }
          ],
          "position": {
            "line": 485,
            "endLine": 485
          }
        }
      ],
      "origin": {
        "line": 457,
        "endLine": 485
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
              "line": 463,
              "endLine": 465
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 474,
              "endLine": 476
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
          "line": 494,
          "endLine": 494
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
                "src": "assets/72d50863ca07-wiki-maintenance-loop.svg",
                "alt": "읽고 엮는 ingest, 위키를 읽어 답하고 저장하는 query, 내용과 연결을 점검하는 lint가 같은 지속 위키를 갱신한다. 규칙은 전체 작업을 안내한다."
              },
              "children": [],
              "position": {
                "line": 496,
                "endLine": 496
              }
            }
          ],
          "position": {
            "line": 496,
            "endLine": 496
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
                  "value": "읽고 엮기 · 답하고 남기기 · 점검해 다시 읽기"
                }
              ],
              "position": {
                "line": 498,
                "endLine": 498
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 498,
            "endLine": 498
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
                "href": "assets/72d50863ca07-wiki-maintenance-loop.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "순환 그림 원본"
                }
              ],
              "position": {
                "line": 500,
                "endLine": 500
              }
            }
          ],
          "position": {
            "line": 500,
            "endLine": 500
          }
        }
      ],
      "origin": {
        "line": 489,
        "endLine": 500
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
          "line": 508,
          "endLine": 508
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
                "line": 510,
                "endLine": 510
              }
            }
          ],
          "position": {
            "line": 510,
            "endLine": 510
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
                "line": 512,
                "endLine": 512
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 512,
            "endLine": 512
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
            "line": 514,
            "endLine": 514
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
            "line": 516,
            "endLine": 516
          }
        }
      ],
      "origin": {
        "line": 504,
        "endLine": 516
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
          "line": 524,
          "endLine": 524
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
            "line": 526,
            "endLine": 526
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
                "line": 528,
                "endLine": 533
              }
            }
          ],
          "position": {
            "line": 528,
            "endLine": 533
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
            "line": 535,
            "endLine": 535
          }
        }
      ],
      "origin": {
        "line": 520,
        "endLine": 535
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
          "line": 546,
          "endLine": 546
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
                "line": 548,
                "endLine": 548
              }
            }
          ],
          "position": {
            "line": 548,
            "endLine": 548
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
                "line": 550,
                "endLine": 550
              }
            }
          ],
          "position": {
            "line": 550,
            "endLine": 550
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
                "line": 552,
                "endLine": 552
              }
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
              "type": "text",
              "value": "작게 시작할 예: 자료 몇 개 · 질문 하나 · 결과를 확인할 사람."
            }
          ],
          "position": {
            "line": 554,
            "endLine": 554
          }
        }
      ],
      "origin": {
        "line": 539,
        "endLine": 554
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
          "line": 562,
          "endLine": 562
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
            "line": 567,
            "endLine": 567
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
                "line": 569,
                "endLine": 569
              }
            }
          ],
          "position": {
            "line": 569,
            "endLine": 569
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
                "line": 571,
                "endLine": 571
              }
            }
          ],
          "position": {
            "line": 571,
            "endLine": 571
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
            "line": 576,
            "endLine": 576
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
                "line": 578,
                "endLine": 578
              }
            }
          ],
          "position": {
            "line": 578,
            "endLine": 578
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
                "line": 580,
                "endLine": 580
              }
            }
          ],
          "position": {
            "line": 580,
            "endLine": 580
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
            "line": 585,
            "endLine": 585
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
                "line": 587,
                "endLine": 587
              }
            }
          ],
          "position": {
            "line": 587,
            "endLine": 587
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
                "line": 589,
                "endLine": 589
              }
            }
          ],
          "position": {
            "line": 589,
            "endLine": 589
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
                "line": 591,
                "endLine": 591
              }
            }
          ],
          "position": {
            "line": 591,
            "endLine": 591
          }
        }
      ],
      "origin": {
        "line": 558,
        "endLine": 591
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
              "line": 564,
              "endLine": 566
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 573,
              "endLine": 575
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "orange",
            "origin": {
              "line": 582,
              "endLine": 584
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
                "line": 601,
                "endLine": 601
              }
            },
            {
              "type": "text",
              "value": ""
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
              "type": "text",
              "value": "개념과 비교와 종합을 남기고,"
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
              "value": "다음 질문에서 다시 찾아 읽습니다."
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
                "href": "#40"
              },
              "children": [
                {
                  "type": "text",
                  "value": "질문과 적용 이야기"
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
        "line": 595,
        "endLine": 607
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
          "line": 615,
          "endLine": 615
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
                "line": 617,
                "endLine": 617
              }
            },
            {
              "type": "text",
              "value": " 고정 판"
            }
          ],
          "position": {
            "line": 617,
            "endLine": 617
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
            "line": 622,
            "endLine": 622
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
            "line": 624,
            "endLine": 624
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
            "line": 626,
            "endLine": 626
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
            "line": 631,
            "endLine": 631
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
            "line": 633,
            "endLine": 633
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
            "line": 635,
            "endLine": 635
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
                "line": 637,
                "endLine": 637
              }
            }
          ],
          "position": {
            "line": 637,
            "endLine": 637
          }
        }
      ],
      "origin": {
        "line": 611,
        "endLine": 637
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
              "line": 619,
              "endLine": 621
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "purple",
            "origin": {
              "line": 628,
              "endLine": 630
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
          "line": 645,
          "endLine": 645
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
            "line": 647,
            "endLine": 647
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
            "line": 652,
            "endLine": 652
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
            "line": 654,
            "endLine": 654
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
            "line": 656,
            "endLine": 656
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
            "line": 661,
            "endLine": 661
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
            "line": 663,
            "endLine": 663
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
                "line": 665,
                "endLine": 665
              }
            },
            {
              "type": "text",
              "value": "를 자동 저장 구현으로 읽지 않습니다."
            }
          ],
          "position": {
            "line": 665,
            "endLine": 665
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
                "line": 667,
                "endLine": 667
              }
            }
          ],
          "position": {
            "line": 667,
            "endLine": 667
          }
        }
      ],
      "origin": {
        "line": 641,
        "endLine": 667
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
              "line": 649,
              "endLine": 651
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "orange",
            "origin": {
              "line": 658,
              "endLine": 660
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
          "line": 675,
          "endLine": 675
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
                "line": 677,
                "endLine": 677
              }
            }
          ],
          "position": {
            "line": 677,
            "endLine": 677
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
                "line": 679,
                "endLine": 679
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 679,
            "endLine": 679
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
            "line": 681,
            "endLine": 681
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
                "line": 683,
                "endLine": 683
              }
            },
            {
              "type": "text",
              "value": "입니다. 의미 오류 판정이나 자동 수정은 아닙니다."
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
                "line": 685,
                "endLine": 685
              }
            }
          ],
          "position": {
            "line": 685,
            "endLine": 685
          }
        }
      ],
      "origin": {
        "line": 671,
        "endLine": 685
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
          "line": 693,
          "endLine": 693
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
            "line": 695,
            "endLine": 695
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
            "line": 700,
            "endLine": 700
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
            "line": 702,
            "endLine": 702
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
            "line": 704,
            "endLine": 704
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
            "line": 706,
            "endLine": 706
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
            "line": 711,
            "endLine": 711
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
            "line": 713,
            "endLine": 713
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
            "line": 715,
            "endLine": 715
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
                "line": 719,
                "endLine": 719
              }
            }
          ],
          "position": {
            "line": 719,
            "endLine": 719
          }
        }
      ],
      "origin": {
        "line": 689,
        "endLine": 719
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
              "line": 697,
              "endLine": 699
            }
          },
          {
            "start": 5,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 708,
              "endLine": 710
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
          "line": 727,
          "endLine": 727
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
            "line": 732,
            "endLine": 732
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
            "line": 734,
            "endLine": 734
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
            "line": 736,
            "endLine": 736
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
            "line": 741,
            "endLine": 741
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
            "line": 743,
            "endLine": 743
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
            "line": 745,
            "endLine": 745
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
            "line": 750,
            "endLine": 750
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
            "line": 752,
            "endLine": 752
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
            "line": 754,
            "endLine": 754
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
                "line": 756,
                "endLine": 756
              }
            }
          ],
          "position": {
            "line": 756,
            "endLine": 756
          }
        }
      ],
      "origin": {
        "line": 723,
        "endLine": 756
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
              "line": 729,
              "endLine": 731
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "purple",
            "origin": {
              "line": 738,
              "endLine": 740
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "blue",
            "origin": {
              "line": 747,
              "endLine": 749
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
          "line": 764,
          "endLine": 764
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
            "line": 766,
            "endLine": 766
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
            "line": 771,
            "endLine": 771
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
            "line": 773,
            "endLine": 773
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
            "line": 775,
            "endLine": 775
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
            "line": 780,
            "endLine": 780
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
            "line": 782,
            "endLine": 782
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
            "line": 784,
            "endLine": 784
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
            "line": 786,
            "endLine": 786
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
                "line": 788,
                "endLine": 788
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
                "line": 788,
                "endLine": 788
              }
            }
          ],
          "position": {
            "line": 788,
            "endLine": 788
          }
        }
      ],
      "origin": {
        "line": 760,
        "endLine": 788
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
              "line": 768,
              "endLine": 770
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "blue",
            "origin": {
              "line": 777,
              "endLine": 779
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
          "line": 796,
          "endLine": 796
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
            "line": 801,
            "endLine": 801
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
            "line": 803,
            "endLine": 803
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
                    "line": 805,
                    "endLine": 806
                  }
                },
                {
                  "type": "text",
                  "value": "모델을 학습하지 않는다."
                }
              ],
              "position": {
                "line": 805,
                "endLine": 806
              }
            }
          ],
          "position": {
            "line": 805,
            "endLine": 806
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
            "line": 811,
            "endLine": 811
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
                "line": 813,
                "endLine": 813
              }
            }
          ],
          "position": {
            "line": 813,
            "endLine": 813
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
                "line": 815,
                "endLine": 815
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
                "line": 815,
                "endLine": 815
              }
            }
          ],
          "position": {
            "line": 815,
            "endLine": 815
          }
        }
      ],
      "origin": {
        "line": 792,
        "endLine": 815
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
              "line": 798,
              "endLine": 800
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 808,
              "endLine": 810
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
          "line": 824,
          "endLine": 824
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
                "alt": "교정된 C1, Q1의 다음 확인, 초기 결정 D1을 함께 읽어 새 운영 질문 Q2를 판단한다. 이 목록은 고정 승인 예제의 입력이며 자동 검색의 성공 기록이 아니다."
              },
              "children": [],
              "position": {
                "line": 826,
                "endLine": 826
              }
            }
          ],
          "position": {
            "line": 826,
            "endLine": 826
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기존 고정 구성 예 · 새 질문 Q2의 판단 입력"
            }
          ],
          "position": {
            "line": 828,
            "endLine": 828
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
                  "value": "Q2:"
                }
              ],
              "position": {
                "line": 830,
                "endLine": 830
              }
            },
            {
              "type": "text",
              "value": " 우리 스터디는 어떤 답을 저장할까?"
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/demo-log.html#6-%EC%83%88-%EC%A7%88%EB%AC%B8-q2%EA%B0%80-%EC%9D%B4%EC%A0%84-%EA%B2%B0%EA%B3%BC%EB%A5%BC-%EB%8B%A4%EC%8B%9C-%EC%93%B4%EB%8B%A4"
              },
              "children": [
                {
                  "type": "text",
                  "value": "고정 예제의 재사용 과정"
                }
              ],
              "position": {
                "line": 832,
                "endLine": 832
              }
            }
          ],
          "position": {
            "line": 832,
            "endLine": 832
          }
        }
      ],
      "origin": {
        "line": 819,
        "endLine": 832
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
          "line": 841,
          "endLine": 841
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
                "alt": "모든 답을 현행에 저장하려던 D1은 대체됨으로 남기고 검토한 답을 현행으로 연결하는 D2에 새 선택과 검토 부담을 적는다."
              },
              "children": [],
              "position": {
                "line": 843,
                "endLine": 843
              }
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
              "value": "기존 구성 예 · ADR 형식을 응용한 운영 선택"
            }
          ],
          "position": {
            "line": 845,
            "endLine": 845
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
                  "value": "D1 → D2:"
                }
              ],
              "position": {
                "line": 847,
                "endLine": 847
              }
            },
            {
              "type": "text",
              "value": " 당시 이유는 보존하고, 새 기준과 검토 부담을 남깁니다."
            }
          ],
          "position": {
            "line": 847,
            "endLine": 847
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
                "href": "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Nygard의 결정 기록"
                }
              ],
              "position": {
                "line": 849,
                "endLine": 849
              }
            },
            {
              "type": "text",
              "value": " · LLM Wiki의 필수 형식은 아닙니다."
            }
          ],
          "position": {
            "line": 849,
            "endLine": 849
          }
        }
      ],
      "origin": {
        "line": 836,
        "endLine": 849
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
          "line": 857,
          "endLine": 857
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
            "line": 862,
            "endLine": 862
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
            "line": 864,
            "endLine": 864
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
                "line": 866,
                "endLine": 866
              }
            },
            {
              "type": "text",
              "value": " 쪽"
            }
          ],
          "position": {
            "line": 866,
            "endLine": 866
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
            "line": 868,
            "endLine": 868
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
                "line": 875,
                "endLine": 875
              }
            },
            {
              "type": "text",
              "value": " 링크"
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
              "value": "상대 경로의 연결 확인"
            }
          ],
          "position": {
            "line": 877,
            "endLine": 877
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
            "line": 882,
            "endLine": 882
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
                "line": 884,
                "endLine": 884
              }
            },
            {
              "type": "text",
              "value": " 파일"
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
              "value": "읽기 메모 5개 + 초기 5쪽"
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
              "value": "정확도·검색 누락·시간 절감의 측정값은 아닙니다."
            }
          ],
          "position": {
            "line": 888,
            "endLine": 888
          }
        }
      ],
      "origin": {
        "line": 853,
        "endLine": 888
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
              "line": 859,
              "endLine": 861
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 870,
              "endLine": 872
            }
          },
          {
            "start": 7,
            "end": 11,
            "tone": "orange",
            "origin": {
              "line": 879,
              "endLine": 881
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
          "line": 896,
          "endLine": 896
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
            "line": 901,
            "endLine": 901
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
            "line": 903,
            "endLine": 903
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
            "line": 908,
            "endLine": 908
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
            "line": 910,
            "endLine": 910
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
            "line": 915,
            "endLine": 915
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
            "line": 917,
            "endLine": 917
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
            "line": 922,
            "endLine": 922
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
            "line": 924,
            "endLine": 924
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
                "line": 926,
                "endLine": 926
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
                "line": 926,
                "endLine": 926
              }
            }
          ],
          "position": {
            "line": 926,
            "endLine": 926
          }
        }
      ],
      "origin": {
        "line": 892,
        "endLine": 926
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
              "line": 898,
              "endLine": 900
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 905,
              "endLine": 907
            }
          },
          {
            "start": 4,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 912,
              "endLine": 914
            }
          },
          {
            "start": 6,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 919,
              "endLine": 921
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
          "line": 934,
          "endLine": 934
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
                "line": 936,
                "endLine": 936
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 936,
            "endLine": 936
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
                "line": 938,
                "endLine": 938
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
                "line": 938,
                "endLine": 938
              }
            }
          ],
          "position": {
            "line": 938,
            "endLine": 938
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
                "line": 940,
                "endLine": 940
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
                "line": 940,
                "endLine": 940
              }
            }
          ],
          "position": {
            "line": 940,
            "endLine": 940
          }
        }
      ],
      "origin": {
        "line": 930,
        "endLine": 940
      },
      "tone": "purple",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
