/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "489b05e48bd8ab93fc2c66e136aa175371fbebf26588fd8de3b8b8616b8e0710"
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
                "alt": "창가 책상에 펼친 책과 공책, 펜이 놓여 있다.",
                "title": "Ron Lach / Pexels · 학습을 설명하는 스톡 사진"
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
      "title": "메모는 남았는데 어느 문장이 근거일까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "메모는 남았는데 어느 문장이 근거일까"
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
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽은 흔적만 남은, 발표자가 만든 작은 메모입니다."
            }
          ],
          "position": {
            "line": 25,
            "endLine": 25
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
                  "value": "RAG: 외부 자료를 찾아 답한다.\n위키: 읽은 내용을 파일로 남긴다.\n그러면 파일을 고치는 것도 모델 학습일까?\n"
                }
              ],
              "position": {
                "line": 27,
                "endLine": 31
              }
            }
          ],
          "position": {
            "line": 27,
            "endLine": 31
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
                  "value": "마지막 질문에 답하려면, 앞 두 줄의 근거와 범위가 필요합니다."
                }
              ],
              "position": {
                "line": 33,
                "endLine": 33
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 33,
            "endLine": 33
          }
        }
      ],
      "origin": {
        "line": 19,
        "endLine": 33
      },
      "tone": "yellow",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "자료를 모은 뒤에도 설명할 일이 남는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "자료를 모은 뒤에도 설명할 일이 남는다"
          }
        ],
        "position": {
          "line": 43,
          "endLine": 43
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
                "src": "assets/b07f03559eed-library.jpg",
                "alt": "책이 가득한 서가 사이의 통로. 책의 내용은 발표의 근거로 사용하지 않는다.",
                "title": "Ayşe İpek / Pexels · 스톡 사진"
              },
              "children": [],
              "position": {
                "line": 45,
                "endLine": 45
              }
            }
          ],
          "position": {
            "line": 45,
            "endLine": 45
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
                      "value": "자료 목록은 "
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "무엇을 읽었는지"
                        }
                      ],
                      "position": {
                        "line": 47,
                        "endLine": 47
                      }
                    },
                    {
                      "type": "text",
                      "value": " 알려줍니다."
                    }
                  ],
                  "position": {
                    "line": 47,
                    "endLine": 47
                  }
                }
              ],
              "position": {
                "line": 47,
                "endLine": 47
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
                      "value": "설명 노트는 "
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "무엇을 알았는지"
                        }
                      ],
                      "position": {
                        "line": 48,
                        "endLine": 48
                      }
                    },
                    {
                      "type": "text",
                      "value": " 연결합니다."
                    }
                  ],
                  "position": {
                    "line": 48,
                    "endLine": 48
                  }
                }
              ],
              "position": {
                "line": 48,
                "endLine": 48
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
                      "value": "판단 기록은 "
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "왜 그렇게 했는지"
                        }
                      ],
                      "position": {
                        "line": 49,
                        "endLine": 49
                      }
                    },
                    {
                      "type": "text",
                      "value": " 남깁니다."
                    }
                  ],
                  "position": {
                    "line": 49,
                    "endLine": 49
                  }
                }
              ],
              "position": {
                "line": 49,
                "endLine": 49
              }
            }
          ],
          "position": {
            "line": 47,
            "endLine": 49
          }
        }
      ],
      "origin": {
        "line": 37,
        "endLine": 49
      },
      "tone": "purple",
      "view": {
        "compose": "split",
        "fit": "cover",
        "focus": "50% 52%"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 모임에는 다른 질문이 온다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 모임에는 다른 질문이 온다"
          }
        ],
        "position": {
          "line": 57,
          "endLine": 57
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "이번 질문 · Q1"
            }
          ],
          "position": {
            "line": 62,
            "endLine": 62
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "위키 파일을 고치면 모델도"
            },
            {
              "type": "text",
              "value": "\n"
            },
            {
              "type": "text",
              "value": "그 내용을 학습하나요?"
            }
          ],
          "position": {
            "line": 64,
            "endLine": 65
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다음 질문 · Q2"
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
              "type": "text",
              "value": "우리 스터디는"
            },
            {
              "type": "text",
              "value": "\n"
            },
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
                  "value": "어떤 답을 저장할까요?"
                }
              ],
              "position": {
                "line": 72,
                "endLine": 73
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 72,
            "endLine": 73
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "개념을 고친 결과가, 다음 운영 판단의 입력이 됩니다."
            }
          ],
          "position": {
            "line": 75,
            "endLine": 75
          }
        }
      ],
      "origin": {
        "line": 53,
        "endLine": 75
      },
      "tone": "purple",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "purple",
            "origin": {
              "line": 59,
              "endLine": 61
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 67,
              "endLine": 69
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
          "line": 83,
          "endLine": 83
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
                "line": 85,
                "endLine": 85
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "읽은 주소, 검토한 답, 바뀐 이유를 함께 남깁니다."
            }
          ],
          "position": {
            "line": 87,
            "endLine": 87
          }
        }
      ],
      "origin": {
        "line": 79,
        "endLine": 87
      },
      "tone": "green",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "남길 것은 답과 근거와 바뀐 이유",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "남길 것은 답과 근거와 바뀐 이유"
          }
        ],
        "position": {
          "line": 95,
          "endLine": 95
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
                  "value": "원자료 → 주장 → 검토 → diff → 다음 질문"
                }
              ],
              "position": {
                "line": 97,
                "endLine": 97
              }
            },
            {
              "type": "text",
              "value": ""
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
              "type": "text",
              "value": "오늘의 끝에는 고친 답, 보류한 부분, 새 저장 규칙이 파일로 남습니다."
            }
          ],
          "position": {
            "line": 99,
            "endLine": 99
          }
        }
      ],
      "origin": {
        "line": 91,
        "endLine": 99
      },
      "tone": "orange",
      "view": {
        "compose": "message"
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
          "line": 107,
          "endLine": 107
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
                  "value": "This is the key difference: the wiki is a persistent, compounding artifact."
                }
              ],
              "position": {
                "line": 109,
                "endLine": 109
              }
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
              "value": "“핵심 차이는 이것입니다. 위키는 계속 남고, 쌓여 가는 결과물입니다.” — 발표팀 번역"
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
                "line": 113,
                "endLine": 113
              }
            },
            {
              "type": "text",
              "value": ", The core idea · "
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
                "line": 113,
                "endLine": 113
              }
            }
          ],
          "position": {
            "line": 113,
            "endLine": 113
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설계 아이디어의 설명입니다. 이제 남는 파일을 직접 보겠습니다."
            }
          ],
          "position": {
            "line": 115,
            "endLine": 115
          }
        }
      ],
      "origin": {
        "line": 103,
        "endLine": 115
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
          "line": 124,
          "endLine": 124
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
                "line": 126,
                "endLine": 126
              }
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
                "line": 128,
                "endLine": 128
              }
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
                "line": 130,
                "endLine": 130
              }
            }
          ],
          "position": {
            "line": 130,
            "endLine": 130
          }
        }
      ],
      "origin": {
        "line": 119,
        "endLine": 130
      },
      "tone": "blue",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "원문과 내 설명을 구분한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "원문과 내 설명을 구분한다"
          }
        ],
        "position": {
          "line": 140,
          "endLine": 140
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
                "src": "assets/258a229c6dc8-study-table.jpg",
                "alt": "책과 필기한 공책, 필기도구가 모여 있는 공부 책상. 사진 속 글은 근거 자료로 읽지 않는다.",
                "title": "cottonbro studio / Pexels · 스톡 사진"
              },
              "children": [],
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
                      "value": ""
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "원문:"
                        }
                      ],
                      "position": {
                        "line": 144,
                        "endLine": 144
                      }
                    },
                    {
                      "type": "text",
                      "value": " RAG v4 §2.4"
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
                      "value": ""
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "읽기 메모:"
                        }
                      ],
                      "position": {
                        "line": 145,
                        "endLine": 145
                      }
                    },
                    {
                      "type": "text",
                      "value": " 질의 인코더와 생성기를 학습한다."
                    }
                  ],
                  "position": {
                    "line": 145,
                    "endLine": 145
                  }
                }
              ],
              "position": {
                "line": 145,
                "endLine": 145
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
                      "value": ""
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "우리 해석:"
                        }
                      ],
                      "position": {
                        "line": 146,
                        "endLine": 146
                      }
                    },
                    {
                      "type": "text",
                      "value": " 외부 파일 사용만으로 학습 유무를 정할 수 없다."
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
          "position": {
            "line": 144,
            "endLine": 146
          }
        }
      ],
      "origin": {
        "line": 134,
        "endLine": 146
      },
      "tone": "green",
      "view": {
        "compose": "split",
        "fit": "cover",
        "focus": "50% 72%"
      }
    },
    {
      "layout": "blocks",
      "title": "오늘은 승인한 교정안을 실행한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "오늘은 승인한 교정안을 실행한다"
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
              "value": "발표자가 준비한 것"
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
              "value": "의도적으로 오류를 심은 초안"
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
              "value": "원문을 대조한 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "고정 승인 교정안"
                }
              ],
              "position": {
                "line": 163,
                "endLine": 163
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "Node가 실행하는 것"
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
              "value": "파일 수정 · diff · 링크 · 해시 검사"
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
              "value": "LLM 호출 없이 로컬에서 재현"
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/demo-log.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "전체 파일과 실행 기록"
                }
              ],
              "position": {
                "line": 174,
                "endLine": 174
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
                "line": 174,
                "endLine": 174
              }
            }
          ],
          "position": {
            "line": 174,
            "endLine": 174
          }
        }
      ],
      "origin": {
        "line": 150,
        "endLine": 174
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
              "line": 156,
              "endLine": 158
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "blue",
            "origin": {
              "line": 165,
              "endLine": 167
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
          "line": 182,
          "endLine": 182
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
                "line": 184,
                "endLine": 184
              }
            }
          ],
          "position": {
            "line": 184,
            "endLine": 184
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
                "line": 188,
                "endLine": 188
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 188,
            "endLine": 188
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
                "line": 190,
                "endLine": 190
              }
            },
            {
              "type": "text",
              "value": " 발췌."
            }
          ],
          "position": {
            "line": 190,
            "endLine": 190
          }
        }
      ],
      "origin": {
        "line": 178,
        "endLine": 190
      },
      "tone": "yellow",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "채팅 A 또는 B · 링크가 있으면 충분할까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "채팅 A 또는 B · 링크가 있으면 충분할까"
          }
        ],
        "position": {
          "line": 198,
          "endLine": 198
        }
      },
      "blocks": [
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
            "line": 203,
            "endLine": 203
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
                  "value": "출처 링크가 있으니 현행 답으로 저장한다."
                }
              ],
              "position": {
                "line": 205,
                "endLine": 205
              }
            }
          ],
          "position": {
            "line": 205,
            "endLine": 205
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
            "line": 210,
            "endLine": 210
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
                  "value": "원문이 이 문장과 범위를 지원하는지 먼저 본다."
                }
              ],
              "position": {
                "line": 212,
                "endLine": 212
              }
            }
          ],
          "position": {
            "line": 212,
            "endLine": 212
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "A 또는 B를 Zoom 채팅에 적어 주세요. 발표자가 직접 읽습니다."
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "#13"
              },
              "children": [
                {
                  "type": "text",
                  "value": "정답 보기 → 13장"
                }
              ],
              "position": {
                "line": 216,
                "endLine": 216
              }
            }
          ],
          "position": {
            "line": 216,
            "endLine": 216
          }
        }
      ],
      "origin": {
        "line": 194,
        "endLine": 216
      },
      "tone": "yellow",
      "view": {
        "compose": "editorial",
        "groups": [
          {
            "start": 0,
            "end": 2,
            "tone": "orange",
            "origin": {
              "line": 200,
              "endLine": 202
            }
          },
          {
            "start": 2,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 207,
              "endLine": 209
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
          "line": 224,
          "endLine": 224
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
            "line": 231,
            "endLine": 232
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
              "value": "질의 인코더와 생성기를 미세조정한다."
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
              "value": "외부 파일 사용과 학습은 함께 있을 수 있다."
            }
          ],
          "position": {
            "line": 241,
            "endLine": 241
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "링크의 유무 다음에는 "
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
                "line": 243,
                "endLine": 243
              }
            },
            {
              "type": "text",
              "value": "를 대조합니다. "
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
                  "value": "RAG v4 §2.4"
                }
              ],
              "position": {
                "line": 243,
                "endLine": 243
              }
            }
          ],
          "position": {
            "line": 243,
            "endLine": 243
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
                "line": 245,
                "endLine": 245
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
                  "value": "읽기 메모 이어 보기 → 14장"
                }
              ],
              "position": {
                "line": 245,
                "endLine": 245
              }
            }
          ],
          "position": {
            "line": 245,
            "endLine": 245
          }
        }
      ],
      "origin": {
        "line": 220,
        "endLine": 245
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
              "line": 226,
              "endLine": 228
            }
          },
          {
            "start": 2,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 234,
              "endLine": 236
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
          "line": 253,
          "endLine": 253
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
            "line": 258,
            "endLine": 258
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
                "line": 260,
                "endLine": 260
              }
            },
            {
              "type": "text",
              "value": "을 읽음"
            }
          ],
          "position": {
            "line": 260,
            "endLine": 260
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
            "line": 262,
            "endLine": 262
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
                "line": 269,
                "endLine": 269
              }
            },
            {
              "type": "text",
              "value": " 읽음"
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
              "value": "학습 대상을 확인해 추가로 메모"
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
                "line": 273,
                "endLine": 273
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 273,
            "endLine": 273
          }
        }
      ],
      "origin": {
        "line": 249,
        "endLine": 273
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
              "line": 255,
              "endLine": 257
            }
          },
          {
            "start": 3,
            "end": 7,
            "tone": "blue",
            "origin": {
              "line": 264,
              "endLine": 266
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
          "line": 281,
          "endLine": 281
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
            "line": 286,
            "endLine": 286
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
            "line": 288,
            "endLine": 288
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
              "value": "RAG v4 §2.4: 질의 인코더·생성기 학습"
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
              "value": "LoRA v2 §4.1: 기본 가중치 고정, 추가 행렬 학습"
            }
          ],
          "position": {
            "line": 297,
            "endLine": 297
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
              "value": "이 파일 교정 데모는 모델 학습을 실행하지 않는다."
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
                "line": 306,
                "endLine": 306
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
                "line": 306,
                "endLine": 306
              }
            }
          ],
          "position": {
            "line": 306,
            "endLine": 306
          }
        }
      ],
      "origin": {
        "line": 277,
        "endLine": 306
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
              "line": 283,
              "endLine": 285
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "purple",
            "origin": {
              "line": 290,
              "endLine": 292
            }
          },
          {
            "start": 5,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 299,
              "endLine": 301
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
          "line": 314,
          "endLine": 314
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
                "line": 316,
                "endLine": 316
              }
            },
            {
              "type": "text",
              "value": "의 실제 승인 항목"
            }
          ],
          "position": {
            "line": 316,
            "endLine": 316
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
                "line": 318,
                "endLine": 324
              }
            }
          ],
          "position": {
            "line": 318,
            "endLine": 324
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
                "line": 326,
                "endLine": 326
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 326,
            "endLine": 326
          }
        }
      ],
      "origin": {
        "line": 310,
        "endLine": 326
      },
      "tone": "purple",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "실제 diff에서 한 문장을 고친다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "실제 diff에서 한 문장을 고친다"
          }
        ],
        "position": {
          "line": 334,
          "endLine": 334
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "삭제한 문장"
            }
          ],
          "position": {
            "line": 339,
            "endLine": 339
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
            "line": 341,
            "endLine": 341
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "추가한 문장"
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
              "value": "이 데모의 파일 수정은 모델 매개변수 학습을 실행하지 않는다. 외부 파일을 쓰는 시스템에도 별도의 학습 과정이 있을 수 있다."
            }
          ],
          "position": {
            "line": 348,
            "endLine": 348
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
                "line": 350,
                "endLine": 350
              }
            },
            {
              "type": "text",
              "value": "의 실제 문장 필드 발췌. "
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
                  "value": "전체 diff와 범위 변경"
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
        }
      ],
      "origin": {
        "line": 330,
        "endLine": 350
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
              "line": 336,
              "endLine": 338
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 343,
              "endLine": 345
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
          "line": 358,
          "endLine": 358
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
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "다음 질문에 반영하려면 고친 파일을 다시 찾아 읽어 답의 문맥에 넣어야 한다."
            }
          ],
          "position": {
            "line": 362,
            "endLine": 362
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
                "line": 366,
                "endLine": 366
              }
            },
            {
              "type": "text",
              "value": " 고친 파일이 있어도 다음 답에서 읽지 않으면 어떻게 확인할까?"
            }
          ],
          "position": {
            "line": 366,
            "endLine": 366
          }
        }
      ],
      "origin": {
        "line": 354,
        "endLine": 366
      },
      "tone": "green",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "같이 바뀔 페이지를 따라간다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "같이 바뀔 페이지를 따라간다"
          }
        ],
        "position": {
          "line": 375,
          "endLine": 375
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
                "src": "assets/ac3c13699c77-impact-map.svg",
                "alt": "C1에서 Q1로, Q1과 초기 D1에서 새 운영 질문 Q2로, Q2에서 D2와 pending으로 이어진다. index는 입구를 연결하고 log는 변경 이유를 남긴다. 실제 현행 8개 파일의 관계이며 모든 연결을 자동 발견했다는 뜻은 아니다."
              },
              "children": [],
              "position": {
                "line": 377,
                "endLine": 377
              }
            }
          ],
          "position": {
            "line": 377,
            "endLine": 377
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
                "href": "assets/ac3c13699c77-impact-map.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 379,
                "endLine": 379
              }
            }
          ],
          "position": {
            "line": 379,
            "endLine": 379
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "C1·Q1·index·log·D1 갱신, Q2·D2·pending 생성: "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "이 예제의 8쪽"
                }
              ],
              "position": {
                "line": 381,
                "endLine": 381
              }
            },
            {
              "type": "text",
              "value": "입니다."
            }
          ],
          "position": {
            "line": 381,
            "endLine": 381
          }
        }
      ],
      "origin": {
        "line": 370,
        "endLine": 381
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
          "line": 389,
          "endLine": 389
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
              "value": "현행 답 저장 정책: 검토 후 갱신"
            }
          ],
          "position": {
            "line": 396,
            "endLine": 396
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
            "line": 398,
            "endLine": 398
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
            "line": 400,
            "endLine": 400
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
              "value": "C1의 일반화를 교정했다."
            }
          ],
          "position": {
            "line": 407,
            "endLine": 407
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
              "value": "D1은 D2로 대체 표시했다."
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
                "line": 413,
                "endLine": 413
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
                "line": 413,
                "endLine": 413
              }
            },
            {
              "type": "text",
              "value": "의 항목 발췌."
            }
          ],
          "position": {
            "line": 413,
            "endLine": 413
          }
        }
      ],
      "origin": {
        "line": 385,
        "endLine": 413
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
              "line": 391,
              "endLine": 393
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 402,
              "endLine": 404
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
          "line": 421,
          "endLine": 421
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
                  "value": "Q2 · 우리 스터디는 어떤 답을 저장할까"
                }
              ],
              "position": {
                "line": 423,
                "endLine": 423
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "개념 설명을 고친 뒤에는, 다음 모임에서 쓸 답의 저장 기준을 정합니다."
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
                "line": 427,
                "endLine": 427
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 427,
            "endLine": 427
          }
        }
      ],
      "origin": {
        "line": 417,
        "endLine": 427
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
          "line": 436,
          "endLine": 436
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
                "src": "assets/d7ccb06b6f80-reuse-inputs.svg",
                "alt": "Q2가 다시 읽는 파일은 교정된 C1, Q1, 초기 D1이다. C1에서 링크만으로 일반화를 지원하지 못함을, Q1에서 다음 답이 파일을 다시 읽어야 함을, D1에서 모든 답을 현행으로 모으려던 이유를 가져와 현행과 검토 대기함을 나누는 판단에 쓴다."
              },
              "children": [],
              "position": {
                "line": 438,
                "endLine": 438
              }
            }
          ],
          "position": {
            "line": 438,
            "endLine": 438
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
                "href": "assets/d7ccb06b6f80-reuse-inputs.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
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
                "line": 442,
                "endLine": 442
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 442,
            "endLine": 442
          }
        }
      ],
      "origin": {
        "line": 431,
        "endLine": 442
      },
      "tone": "purple",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "채팅 A 또는 B · 근거 부족 답은 어디에 둘까",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "채팅 A 또는 B · 근거 부족 답은 어디에 둘까"
          }
        ],
        "position": {
          "line": 450,
          "endLine": 450
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "근거 부족 초안"
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
              "value": "파일 위키를 만들면 필요한 파일을 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "언제나"
                }
              ],
              "position": {
                "line": 457,
                "endLine": 457
              }
            },
            {
              "type": "text",
              "value": " 찾을 수 있다."
            }
          ],
          "position": {
            "line": 457,
            "endLine": 457
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
            "line": 462,
            "endLine": 462
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
                  "value": "다른 답과 함께 현행 노트에 바로 저장한다."
                }
              ],
              "position": {
                "line": 464,
                "endLine": 464
              }
            }
          ],
          "position": {
            "line": 464,
            "endLine": 464
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
            "line": 469,
            "endLine": 469
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
                  "value": "이유와 다음 확인을 적어 검토 대기함에 둔다."
                }
              ],
              "position": {
                "line": 471,
                "endLine": 471
              }
            }
          ],
          "position": {
            "line": 471,
            "endLine": 471
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "A/B를 Zoom 채팅에 적어 주세요. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "#24"
              },
              "children": [
                {
                  "type": "text",
                  "value": "이 예제의 선택 보기 → 24장"
                }
              ],
              "position": {
                "line": 473,
                "endLine": 473
              }
            }
          ],
          "position": {
            "line": 473,
            "endLine": 473
          }
        }
      ],
      "origin": {
        "line": 446,
        "endLine": 473
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
              "line": 452,
              "endLine": 454
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "orange",
            "origin": {
              "line": 459,
              "endLine": 461
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 466,
              "endLine": 468
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
          "line": 482,
          "endLine": 482
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
                "line": 484,
                "endLine": 484
              }
            }
          ],
          "position": {
            "line": 484,
            "endLine": 484
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
                  "value": "이 예제의 선택은 B."
                }
              ],
              "position": {
                "line": 488,
                "endLine": 488
              }
            },
            {
              "type": "text",
              "value": " 검토한 답은 현행, 근거 부족 답은 대기함에 남깁니다."
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
                "line": 490,
                "endLine": 490
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
                  "value": "보류 이유 이어 보기 → 25장"
                }
              ],
              "position": {
                "line": 490,
                "endLine": 490
              }
            }
          ],
          "position": {
            "line": 490,
            "endLine": 490
          }
        }
      ],
      "origin": {
        "line": 477,
        "endLine": 490
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
          "line": 498,
          "endLine": 498
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
              "value": "필요한 파일을 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "언제나"
                }
              ],
              "position": {
                "line": 505,
                "endLine": 505
              }
            },
            {
              "type": "text",
              "value": " 찾을 수 있다는 답"
            }
          ],
          "position": {
            "line": 505,
            "endLine": 505
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
              "value": "이 파일 교정 실행은 우리 자료에서 검색 누락이 없다는 주장을 지원하지 않는다."
            }
          ],
          "position": {
            "line": 512,
            "endLine": 512
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
            "line": 517,
            "endLine": 517
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "실제 질문 몇 개를 정하고, 답이 읽은 파일과 빠뜨린 근거를 사람이 확인한다."
            }
          ],
          "position": {
            "line": 519,
            "endLine": 519
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
                  "value": "after/wiki/pending/retrieval-coverage.md"
                }
              ],
              "position": {
                "line": 521,
                "endLine": 521
              }
            },
            {
              "type": "text",
              "value": " 발췌."
            }
          ],
          "position": {
            "line": 521,
            "endLine": 521
          }
        }
      ],
      "origin": {
        "line": 494,
        "endLine": 521
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
              "line": 500,
              "endLine": 502
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "orange",
            "origin": {
              "line": 507,
              "endLine": 509
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 514,
              "endLine": 516
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "옛 결정은 superseded로 남긴다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "옛 결정은 superseded로 남긴다"
          }
        ],
        "position": {
          "line": 530,
          "endLine": 530
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
                "src": "assets/45145c571942-decision-transition.svg",
                "alt": "초기 결정 D1은 모든 질문 답을 현행 노트로 저장하려는 선택이다. C1 교정 뒤 superseded로 표시하고 D2 검토한 답을 현행으로 표시하기로 연결한다. 예전 맥락과 결과는 보존한다."
              },
              "children": [],
              "position": {
                "line": 532,
                "endLine": 532
              }
            }
          ],
          "position": {
            "line": 532,
            "endLine": 532
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
                "href": "assets/45145c571942-decision-transition.svg"
              },
              "children": [
                {
                  "type": "text",
                  "value": "도식 원본 열기"
                }
              ],
              "position": {
                "line": 534,
                "endLine": 534
              }
            }
          ],
          "position": {
            "line": 534,
            "endLine": 534
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
                "line": 536,
                "endLine": 536
              }
            },
            {
              "type": "text",
              "value": "을 적습니다."
            }
          ],
          "position": {
            "line": 536,
            "endLine": 536
          }
        }
      ],
      "origin": {
        "line": 525,
        "endLine": 536
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
          "line": 544,
          "endLine": 544
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
            "line": 549,
            "endLine": 549
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
            "line": 551,
            "endLine": 551
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
            "line": 556,
            "endLine": 556
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
            "line": 558,
            "endLine": 558
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
            "line": 563,
            "endLine": 563
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "수정 이유로 돌아갈 수 있다. 매번 검토 시간이 들고 관련 페이지 누락도 점검해야 한다."
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
              "type": "text",
              "value": "실제 D2 발췌 · "
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
        "line": 540,
        "endLine": 567
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
              "line": 546,
              "endLine": 548
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "green",
            "origin": {
              "line": 553,
              "endLine": 555
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "orange",
            "origin": {
              "line": 560,
              "endLine": 562
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
          "line": 575,
          "endLine": 575
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
            "line": 580,
            "endLine": 580
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "1판·2판의 날짜와 적용 범위를 따로 보존"
            }
          ],
          "position": {
            "line": 582,
            "endLine": 582
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
            "line": 587,
            "endLine": 587
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "달라진 문장이 무엇을 지원하는지 대조"
            }
          ],
          "position": {
            "line": 589,
            "endLine": 589
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
            "line": 594,
            "endLine": 594
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "현행 설명을 고치고 과거 판단으로 돌아갈 길 유지"
            }
          ],
          "position": {
            "line": 596,
            "endLine": 596
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
                  "value": "앞으로 적용할 운영법입니다."
                }
              ],
              "position": {
                "line": 598,
                "endLine": 598
              }
            },
            {
              "type": "text",
              "value": " 오늘 데모는 같은 RAG v4의 읽기 범위만 확장했습니다."
            }
          ],
          "position": {
            "line": 598,
            "endLine": 598
          }
        }
      ],
      "origin": {
        "line": 571,
        "endLine": 598
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
              "line": 577,
              "endLine": 579
            }
          },
          {
            "start": 2,
            "end": 4,
            "tone": "purple",
            "origin": {
              "line": 584,
              "endLine": 586
            }
          },
          {
            "start": 4,
            "end": 7,
            "tone": "green",
            "origin": {
              "line": 591,
              "endLine": 593
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "상충하면 어느 쪽인지 먼저 좁힌다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "상충하면 어느 쪽인지 먼저 좁힌다"
          }
        ],
        "position": {
          "line": 606,
          "endLine": 606
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
                "line": 608,
                "endLine": 608
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 608,
            "endLine": 608
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
            "line": 610,
            "endLine": 610
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "C1은 ‘모든 외부 파일 시스템’을 ‘이 데모’로 좁혔습니다. "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/study-guide.html#11-%EC%B6%A9%EB%8F%8C%EC%98%A4%EB%9E%98%EB%90%9C-%EC%A0%95%EB%B3%B4%EC%82%AD%EC%A0%9C%EC%99%80-%EB%8C%80%EC%B2%B4%EB%A5%BC-%EB%8B%A4%EB%A3%A8%EA%B8%B0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "충돌과 낡은 정보 더 읽기"
                }
              ],
              "position": {
                "line": 612,
                "endLine": 612
              }
            }
          ],
          "position": {
            "line": 612,
            "endLine": 612
          }
        }
      ],
      "origin": {
        "line": 602,
        "endLine": 612
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
          "line": 620,
          "endLine": 620
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
                  "value": "The human mind does not work that way. It operates by association."
                }
              ],
              "position": {
                "line": 622,
                "endLine": 622
              }
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
              "value": "“인간의 마음은 그런 방식으로 작동하지 않습니다. 연상으로 작동합니다.” — 발표팀 번역"
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
                "line": 626,
                "endLine": 626
              }
            },
            {
              "type": "text",
              "value": ", 1945년 7월, §6 · "
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
                "line": 626,
                "endLine": 626
              }
            }
          ],
          "position": {
            "line": 626,
            "endLine": 626
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "분류 색인과 연상의 차이에서 지식 장치를 구상한 글입니다. 내 자료 두 개를 잇는 질문으로 이어갑니다."
            }
          ],
          "position": {
            "line": 628,
            "endLine": 628
          }
        }
      ],
      "origin": {
        "line": 616,
        "endLine": 628
      },
      "tone": "purple",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "검사 결과가 말하는 것",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "검사 결과가 말하는 것"
          }
        ],
        "position": {
          "line": 636,
          "endLine": 636
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "반영한 페이지"
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
                "line": 643,
                "endLine": 643
              }
            },
            {
              "type": "text",
              "value": " 쪽"
            }
          ],
          "position": {
            "line": 643,
            "endLine": 643
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "승인안 적용: 기존 5쪽 갱신 + 3쪽 생성"
            }
          ],
          "position": {
            "line": 645,
            "endLine": 645
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "검사한 로컬 링크"
            }
          ],
          "position": {
            "line": 650,
            "endLine": 650
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
                "line": 652,
                "endLine": 652
              }
            },
            {
              "type": "text",
              "value": " 개"
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
              "value": "현행 파일의 상대 경로 연결 확인"
            }
          ],
          "position": {
            "line": 654,
            "endLine": 654
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "보존한 파일"
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
                "line": 661,
                "endLine": 661
              }
            },
            {
              "type": "text",
              "value": " 파일"
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
              "value": "읽기 메모 5개 + 초기 5쪽 SHA 보존"
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
              "value": "이 예제의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "파일 검사 수치"
                }
              ],
              "position": {
                "line": 665,
                "endLine": 665
              }
            },
            {
              "type": "text",
              "value": "입니다. "
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
                  "value": "실행과 범위"
                }
              ],
              "position": {
                "line": 665,
                "endLine": 665
              }
            }
          ],
          "position": {
            "line": 665,
            "endLine": 665
          }
        }
      ],
      "origin": {
        "line": 632,
        "endLine": 665
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
              "line": 638,
              "endLine": 640
            }
          },
          {
            "start": 3,
            "end": 6,
            "tone": "green",
            "origin": {
              "line": 647,
              "endLine": 649
            }
          },
          {
            "start": 6,
            "end": 10,
            "tone": "orange",
            "origin": {
              "line": 656,
              "endLine": 658
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
          "line": 673,
          "endLine": 673
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
              "value": "읽기 메모 · 연결 후보 · 답 초안 · 수정안"
            }
          ],
          "position": {
            "line": 680,
            "endLine": 680
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
            "line": 685,
            "endLine": 685
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
              "value": "실제 운영의 역할 제안입니다. 오늘 Node 스크립트는 사람이 승인한 안을 재현했습니다."
            }
          ],
          "position": {
            "line": 689,
            "endLine": 689
          }
        }
      ],
      "origin": {
        "line": 669,
        "endLine": 689
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
              "line": 675,
              "endLine": 677
            }
          },
          {
            "start": 2,
            "end": 5,
            "tone": "green",
            "origin": {
              "line": 682,
              "endLine": 684
            }
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "읽기 질문하기 점검하기를 반복한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "읽기 질문하기 점검하기를 반복한다"
          }
        ],
        "position": {
          "line": 698,
          "endLine": 698
        }
      },
      "blocks": [
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
                      "value": "읽고 엮기 · ingest"
                    }
                  ],
                  "position": {
                    "line": 700,
                    "endLine": 700
                  }
                }
              ],
              "position": {
                "line": 700,
                "endLine": 700
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
                      "value": "답하고 남기기 · query"
                    }
                  ],
                  "position": {
                    "line": 701,
                    "endLine": 701
                  }
                }
              ],
              "position": {
                "line": 701,
                "endLine": 701
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
                      "value": "점검하기 · lint"
                    }
                  ],
                  "position": {
                    "line": 702,
                    "endLine": 702
                  }
                }
              ],
              "position": {
                "line": 702,
                "endLine": 702
              }
            }
          ],
          "position": {
            "line": 700,
            "endLine": 702
          }
        }
      ],
      "origin": {
        "line": 693,
        "endLine": 702
      },
      "tone": "blue",
      "view": {
        "compose": "icon-wall",
        "icons": [
          {
            "icon": "folder",
            "tone": "blue"
          },
          {
            "icon": "voice",
            "tone": "purple"
          },
          {
            "icon": "check",
            "tone": "green"
          }
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "내 자료 세 개에서 시작한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "내 자료 세 개에서 시작한다"
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
          "tag": "p",
          "children": [
            {
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/478e6580030c-writing.jpg",
                "alt": "노트에 쓰는 인물의 스톡 사진",
                "title": "질문 적기 · LinkedIn Sales Navigator / Pexels"
              },
              "children": [],
              "position": {
                "line": 715,
                "endLine": 715
              }
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
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/5aa7ac752bff-open-books.jpg",
                "alt": "창가 책상에 펼친 책과 공책",
                "title": "자료 고르기 · Ron Lach / Pexels"
              },
              "children": [],
              "position": {
                "line": 717,
                "endLine": 717
              }
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
              "type": "element",
              "tag": "img",
              "attrs": {
                "src": "assets/258a229c6dc8-study-table.jpg",
                "alt": "책과 공책과 필기도구가 모인 책상",
                "title": "설명 대조하기 · cottonbro studio / Pexels"
              },
              "children": [],
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
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 3개 · 질문 1개 · 검토자 1명. 사진은 학습을 설명하는 스톡 장면입니다."
            }
          ],
          "position": {
            "line": 721,
            "endLine": 721
          }
        }
      ],
      "origin": {
        "line": 706,
        "endLine": 721
      },
      "tone": "orange",
      "view": {
        "compose": "gallery",
        "variant": "strip",
        "fit": "cover",
        "focus": [
          "44% 54%",
          "50% 75%",
          "50% 72%"
        ]
      }
    },
    {
      "layout": "blocks",
      "title": "내 질문 하나를 실제로 적는다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "내 질문 하나를 실제로 적는다"
          }
        ],
        "position": {
          "line": 729,
          "endLine": 729
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
                  "value": "내 자료 A + 내 자료 B → 다음 모임에 답할 질문"
                }
              ],
              "position": {
                "line": 731,
                "endLine": 731
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "20초 동안 자기 노트에 적어 보세요."
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
              "type": "text",
              "value": "자료 두 개의 제목, 연결 질문 한 줄, 먼저 확인할 근거 한 곳."
            }
          ],
          "position": {
            "line": 735,
            "endLine": 735
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "예: RAG 메모 + 지난 Q1 → 다음 답이 어떤 파일을 읽었는지 어떻게 확인할까?"
            }
          ],
          "position": {
            "line": 737,
            "endLine": 737
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "채팅에 공유하는 것은 선택입니다."
            }
          ],
          "position": {
            "line": 739,
            "endLine": 739
          }
        }
      ],
      "origin": {
        "line": 725,
        "endLine": 739
      },
      "tone": "yellow",
      "view": {
        "compose": "message"
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
          "line": 747,
          "endLine": 747
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
                "line": 749,
                "endLine": 749
              }
            },
            {
              "type": "text",
              "value": "의 요청을 줄여 쓰면:"
            }
          ],
          "position": {
            "line": 749,
            "endLine": 749
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
                "line": 751,
                "endLine": 755
              }
            }
          ],
          "position": {
            "line": 751,
            "endLine": 755
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
                "line": 757,
                "endLine": 757
              }
            },
            {
              "type": "text",
              "value": "에 있습니다. 실제 LLM 실행 결과가 아닌 시작 요청입니다."
            }
          ],
          "position": {
            "line": 757,
            "endLine": 757
          }
        }
      ],
      "origin": {
        "line": 743,
        "endLine": 757
      },
      "tone": "purple",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 모임 전, 파일을 읽을 사람을 정한다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 모임 전, 파일을 읽을 사람을 정한다"
          }
        ],
        "position": {
          "line": 766,
          "endLine": 766
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "작업 규칙 네 가지와 함께 시작합니다."
            }
          ],
          "position": {
            "line": 768,
            "endLine": 768
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
                      "value": "원자료를 보존하기"
                    }
                  ],
                  "position": {
                    "line": 770,
                    "endLine": 770
                  }
                }
              ],
              "position": {
                "line": 770,
                "endLine": 770
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
                      "value": "근거와 범위를 붙이기"
                    }
                  ],
                  "position": {
                    "line": 771,
                    "endLine": 771
                  }
                }
              ],
              "position": {
                "line": 771,
                "endLine": 771
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
                      "value": "모르는 것은 보류하기"
                    }
                  ],
                  "position": {
                    "line": 772,
                    "endLine": 772
                  }
                }
              ],
              "position": {
                "line": 772,
                "endLine": 772
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
                      "value": "결정 이력 남기기"
                    }
                  ],
                  "position": {
                    "line": 773,
                    "endLine": 773
                  }
                }
              ],
              "position": {
                "line": 773,
                "endLine": 773
              }
            }
          ],
          "position": {
            "line": 770,
            "endLine": 773
          }
        }
      ],
      "origin": {
        "line": 761,
        "endLine": 773
      },
      "tone": "green",
      "view": {
        "compose": "icon-wall",
        "icons": [
          "folder",
          "search",
          "select",
          "record"
        ]
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
          "line": 781,
          "endLine": 781
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
            "line": 786,
            "endLine": 786
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
            "line": 788,
            "endLine": 788
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
            "line": 790,
            "endLine": 790
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
            "line": 792,
            "endLine": 792
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
            "line": 797,
            "endLine": 797
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
            "line": 799,
            "endLine": 799
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
              "value": "목차·검색의 누락 확인"
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
              "type": "text",
              "value": "한 주제로 작게 시도하고, 다음 모임에서 재사용과 부담을 함께 확인합니다."
            }
          ],
          "position": {
            "line": 805,
            "endLine": 805
          }
        }
      ],
      "origin": {
        "line": 777,
        "endLine": 805
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
              "line": 783,
              "endLine": 785
            }
          },
          {
            "start": 4,
            "end": 9,
            "tone": "orange",
            "origin": {
              "line": 794,
              "endLine": 796
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
          "line": 813,
          "endLine": 813
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
            "line": 818,
            "endLine": 818
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
                "line": 820,
                "endLine": 820
              }
            }
          ],
          "position": {
            "line": 820,
            "endLine": 820
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
            "line": 822,
            "endLine": 822
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
                "line": 824,
                "endLine": 824
              }
            }
          ],
          "position": {
            "line": 824,
            "endLine": 824
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
            "line": 829,
            "endLine": 829
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
                "line": 831,
                "endLine": 831
              }
            }
          ],
          "position": {
            "line": 831,
            "endLine": 831
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
            "line": 833,
            "endLine": 833
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
                "line": 835,
                "endLine": 835
              }
            }
          ],
          "position": {
            "line": 835,
            "endLine": 835
          }
        }
      ],
      "origin": {
        "line": 809,
        "endLine": 835
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
              "line": 815,
              "endLine": 817
            }
          },
          {
            "start": 4,
            "end": 8,
            "tone": "green",
            "origin": {
              "line": 826,
              "endLine": 828
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
          "line": 843,
          "endLine": 843
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
                "line": 845,
                "endLine": 845
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "Q&A 별도 2분 추정"
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
                "href": "materials/index.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "공부 자료 목차"
                }
              ],
              "position": {
                "line": 849,
                "endLine": 849
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
                "line": 849,
                "endLine": 849
              }
            }
          ],
          "position": {
            "line": 849,
            "endLine": 849
          }
        }
      ],
      "origin": {
        "line": 839,
        "endLine": 849
      },
      "tone": "purple",
      "view": {
        "compose": "closing"
      }
    }
  ]
};
