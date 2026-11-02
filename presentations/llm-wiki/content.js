/* Generated from Markdown. Edit the source and rebuild. */
window.PRESENTATION = {
  "format": "markdown-v1",
  "document": {
    "sourcePath": "talks/llm-wiki/slides.md",
    "revision": "f6a5a79c444a79a9f62ed8759c1a7a1e745298b30d3766dcb32202a220619bbe"
  },
  "id": "llm-wiki",
  "title": "LLM Wiki · 내 자료를 AI와 함께 정리하는 방법",
  "theme": "stage",
  "slides": [
    {
      "layout": "blocks",
      "title": "LLM Wiki",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM Wiki"
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
                  "value": "내 자료를 AI와 함께 정리하는 방법"
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
              "value": "모아 둔 자료를, 다음 질문에 다시 쓰기"
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
      "tone": "neutral",
      "view": {
        "compose": "message"
      }
    },
    {
      "layout": "blocks",
      "title": "LLM Wiki는 무엇인가요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "LLM Wiki는 무엇인가요?"
          }
        ],
        "position": {
          "line": 21,
          "endLine": 21
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
                  "value": "내 자료를 AI와 함께 정리하고 연결하는"
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
                      "value": "나만의 마크다운 지식 베이스입니다."
                    }
                  ],
                  "position": {
                    "line": 23,
                    "endLine": 24
                  }
                },
                {
                  "type": "text",
                  "value": ""
                }
              ],
              "position": {
                "line": 23,
                "endLine": 24
              }
            }
          ],
          "position": {
            "line": 23,
            "endLine": 24
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "내가 읽고 고칠 수 있고, AI도 찾아 읽고 갱신합니다."
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
                  "value": "Karpathy가 2026년 4월 공개한 설계 아이디어"
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
        "line": 17,
        "endLine": 28
      },
      "tone": "neutral",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "왜 필요한가요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "왜 필요한가요?"
          }
        ],
        "position": {
          "line": 36,
          "endLine": 36
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
                "src": "assets/bf4ad827da99-knowledge-layers.svg",
                "alt": "세 원자료 메모를 개념과 관계로 연결해 현재 이해와 다음 질문에 다시 쓰는 구조."
              },
              "children": [],
              "position": {
                "line": 38,
                "endLine": 38
              }
            }
          ],
          "position": {
            "line": 38,
            "endLine": 38
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
                  "value": "“AI가 내 자료를 좀 더 잘 이해해 줬으면.”"
                }
              ],
              "position": {
                "line": 40,
                "endLine": 40
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 40,
            "endLine": 40
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료를 개념과 관계로 정리해, 다음 질문에 다시 씁니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#3%EC%9E%A5-%EC%9E%90%EB%A3%8C%EC%97%90%EC%84%9C-%EC%97%B0%EA%B2%B0%EB%90%9C-%EC%A7%80%EC%8B%9D%EC%9C%BC%EB%A1%9C"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
                }
              ],
              "position": {
                "line": 42,
                "endLine": 42
              }
            }
          ],
          "position": {
            "line": 42,
            "endLine": 42
          }
        }
      ],
      "origin": {
        "line": 31,
        "endLine": 42
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "개인비서도 내 맥락이 필요합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "개인비서도 내 맥락이 필요합니다"
          }
        ],
        "position": {
          "line": 50,
          "endLine": 50
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "알아야 할 맥락"
            }
          ],
          "position": {
            "line": 52,
            "endLine": 52
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "내 상황 · 선호 · "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "이전에 선택한 이유"
                }
              ],
              "position": {
                "line": 54,
                "endLine": 54
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 54,
            "endLine": 54
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "위키가 돕는 일"
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
              "value": "흩어진 맥락을 문서로 정리해 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "필요할 때 다시 읽게 합니다."
                }
              ],
              "position": {
                "line": 58,
                "endLine": 58
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "개인비서형 에이전트 예: "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "https://docs.openclaw.ai/concepts/memory"
              },
              "children": [
                {
                  "type": "text",
                  "value": "OpenClaw"
                }
              ],
              "position": {
                "line": 60,
                "endLine": 60
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
                "href": "https://github.com/NousResearch/hermes-agent"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Hermes"
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
        }
      ],
      "origin": {
        "line": 45,
        "endLine": 60
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "무엇이 생기나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "무엇이 생기나요?"
          }
        ],
        "position": {
          "line": 68,
          "endLine": 68
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
                "src": "assets/f2422a7925dc-raw-wiki-rules.svg",
                "alt": "원자료 raw는 보존하고 wiki는 개념과 연결을 정리하며 rules.md는 원자료 보존·근거 연결·검토 등 작업 약속을 담는 구조."
              },
              "children": [],
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
                  "value": "원자료(raw) · 정리한 문서(wiki) · 작업 규칙(rules.md)"
                }
              ],
              "position": {
                "line": 72,
                "endLine": 72
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "마크다운은 글과 링크를 적는 텍스트 파일입니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#5%EC%9E%A5-raw-wiki-rules%EC%9D%98-%EC%97%AD%ED%95%A0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
                }
              ],
              "position": {
                "line": 74,
                "endLine": 74
              }
            }
          ],
          "position": {
            "line": 74,
            "endLine": 74
          }
        }
      ],
      "origin": {
        "line": 63,
        "endLine": 74
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "사람과 AI가 함께 편집합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "사람과 AI가 함께 편집합니다"
          }
        ],
        "position": {
          "line": 82,
          "endLine": 82
        }
      },
      "blocks": [
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
            "line": 84,
            "endLine": 84
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
                  "value": "목적을 정하고, 내 생각과 판단을 직접 적습니다."
                }
              ],
              "position": {
                "line": 86,
                "endLine": 86
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 86,
            "endLine": 86
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "AI"
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "자료를 읽고, 문서를 쓰고, 연결과 목차를 갱신합니다."
                }
              ],
              "position": {
                "line": 90,
                "endLine": 90
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 90,
            "endLine": 90
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "사람도 같은 마크다운 문서를 읽고 고칠 수 있습니다."
            }
          ],
          "position": {
            "line": 92,
            "endLine": 92
          }
        }
      ],
      "origin": {
        "line": 77,
        "endLine": 92
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "RAG와 무엇이 다른가요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "RAG와 무엇이 다른가요?"
          }
        ],
        "position": {
          "line": 99,
          "endLine": 99
        }
      },
      "blocks": [
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
                          "value": "살펴볼 점"
                        }
                      ],
                      "position": {
                        "line": 101,
                        "endLine": 101
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "RAG 구성"
                        }
                      ],
                      "position": {
                        "line": 101,
                        "endLine": 101
                      }
                    },
                    {
                      "type": "element",
                      "tag": "th",
                      "children": [
                        {
                          "type": "text",
                          "value": "작은 LLM Wiki"
                        }
                      ],
                      "position": {
                        "line": 101,
                        "endLine": 101
                      }
                    }
                  ],
                  "position": {
                    "line": 101,
                    "endLine": 101
                  }
                }
              ],
              "position": {
                "line": 101,
                "endLine": 101
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
                          "value": "중심 작업"
                        }
                      ],
                      "position": {
                        "line": 103,
                        "endLine": 103
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "자료를 검색해 답하기"
                        }
                      ],
                      "position": {
                        "line": 103,
                        "endLine": 103
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "문서를 정리하고 연결하기"
                        }
                      ],
                      "position": {
                        "line": 103,
                        "endLine": 103
                      }
                    }
                  ],
                  "position": {
                    "line": 103,
                    "endLine": 103
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
                          "value": "준비할 것"
                        }
                      ],
                      "position": {
                        "line": 104,
                        "endLine": 104
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "검색 방법·색인 등 설계"
                        }
                      ],
                      "position": {
                        "line": 104,
                        "endLine": 104
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "파일·목차·링크부터 시작"
                        }
                      ],
                      "position": {
                        "line": 104,
                        "endLine": 104
                      }
                    }
                  ],
                  "position": {
                    "line": 104,
                    "endLine": 104
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
                          "value": "질문할 때"
                        }
                      ],
                      "position": {
                        "line": 105,
                        "endLine": 105
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "찾은 근거를 참고"
                        }
                      ],
                      "position": {
                        "line": 105,
                        "endLine": 105
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "정리한 문서와 원자료를 참고"
                        }
                      ],
                      "position": {
                        "line": 105,
                        "endLine": 105
                      }
                    }
                  ],
                  "position": {
                    "line": 105,
                    "endLine": 105
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
                          "value": "유지할 것"
                        }
                      ],
                      "position": {
                        "line": 106,
                        "endLine": 106
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "검색 품질·자료 변경"
                        }
                      ],
                      "position": {
                        "line": 106,
                        "endLine": 106
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "문서 내용·연결·자료 변경"
                        }
                      ],
                      "position": {
                        "line": 106,
                        "endLine": 106
                      }
                    }
                  ],
                  "position": {
                    "line": 106,
                    "endLine": 106
                  }
                }
              ],
              "position": {
                "line": 103,
                "endLine": 106
              }
            }
          ],
          "position": {
            "line": 101,
            "endLine": 106
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
                  "value": "함께 쓸 수 있습니다. 규모가 커지면 위키에도 검색이 필요합니다."
                }
              ],
              "position": {
                "line": 108,
                "endLine": 108
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 108,
            "endLine": 108
          }
        }
      ],
      "origin": {
        "line": 95,
        "endLine": 108
      },
      "tone": "neutral",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "RAG는 필요한 근거를 찾아 답합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "RAG는 필요한 근거를 찾아 답합니다"
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
                "src": "assets/1f943e43d8d7-rag-path.svg",
                "alt": "같은 세 메모에서 이번 질문에 필요한 근거를 찾아 현재 답에 사용하는 RAG 경로."
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
              "value": "같은 자료에서 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "지금 질문에 필요한 부분을 찾아"
                }
              ],
              "position": {
                "line": 120,
                "endLine": 120
              }
            },
            {
              "type": "text",
              "value": " 답을 만듭니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#8%EC%9E%A5-%EC%A7%88%EB%AC%B8%EC%97%90-%EB%94%B0%EB%9D%BC-%EA%B7%BC%EA%B1%B0-%EC%B0%BE%EA%B8%B0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
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
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "위키는 정리해 둔 문서를 읽습니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "위키는 정리해 둔 문서를 읽습니다"
          }
        ],
        "position": {
          "line": 128,
          "endLine": 128
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
                "src": "assets/e39c92d904c4-wiki-path.svg",
                "alt": "같은 세 메모를 개념·비교·현재 계획 문서로 미리 정리하고 필요한 문서와 원자료를 다시 읽는 위키 경로."
              },
              "children": [],
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
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료를 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념·비교·계획으로 미리 정리"
                }
              ],
              "position": {
                "line": 132,
                "endLine": 132
              }
            },
            {
              "type": "text",
              "value": "하고, 필요한 쪽을 다시 읽습니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#9%EC%9E%A5-%EB%AF%B8%EB%A6%AC-%EC%A0%95%EB%A6%AC%ED%95%9C-%EB%AC%B8%EC%84%9C-%EB%8B%A4%EC%8B%9C-%EC%9D%BD%EA%B8%B0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
                }
              ],
              "position": {
                "line": 132,
                "endLine": 132
              }
            }
          ],
          "position": {
            "line": 132,
            "endLine": 132
          }
        }
      ],
      "origin": {
        "line": 123,
        "endLine": 132
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "Ingest는 자료를 소화하고 연결하는 일",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "Ingest는 자료를 소화하고 연결하는 일"
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
                "src": "assets/e93f12b83834-ingest-map.svg",
                "alt": "세 메모를 읽고 나누어 자료 요약을 입구로 만들고, 기존 개념·비교와 현재 계획의 연결 및 문서·목차·링크를 갱신하는 관계."
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
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "자료 읽기 → 내용 나누기 → 문서·목차·링크 갱신하기 · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#10%EC%9E%A5-%EC%9D%BD%EA%B3%A0-%EB%82%98%EB%88%84%EA%B3%A0-%EC%97%B0%EA%B2%B0-%EA%B0%B1%EC%8B%A0%ED%95%98%EA%B8%B0"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
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
        "line": 135,
        "endLine": 144
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "요약 하나로 끝나지 않습니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "요약 하나로 끝나지 않습니다"
          }
        ],
        "position": {
          "line": 152,
          "endLine": 152
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
                "src": "assets/a3c7b37535df-source-concept.svg",
                "alt": "한 자료의 요약과 여러 자료를 연결한 개념 문서의 차이."
              },
              "children": [],
              "position": {
                "line": 154,
                "endLine": 154
              }
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
                  "value": "자료 요약"
                }
              ],
              "position": {
                "line": 156,
                "endLine": 156
              }
            },
            {
              "type": "text",
              "value": "은 그 자료를, "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념 문서"
                }
              ],
              "position": {
                "line": 156,
                "endLine": 156
              }
            },
            {
              "type": "text",
              "value": "는 여러 자료의 공통 주제를 설명합니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#11%EC%9E%A5-%EC%9E%90%EB%A3%8C-%EC%9A%94%EC%95%BD%EA%B3%BC-%EA%B0%9C%EB%85%90-%EB%AC%B8%EC%84%9C"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
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
        "line": 147,
        "endLine": 156
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "나무위키처럼 문서들이 연결됩니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "나무위키처럼 문서들이 연결됩니다"
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
              "value": "주제별 문서"
            }
          ],
          "position": {
            "line": 166,
            "endLine": 166
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "한 파일에 몰아넣지 않고 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념별로 나눕니다."
                }
              ],
              "position": {
                "line": 168,
                "endLine": 168
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 168,
            "endLine": 168
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "목차와 링크"
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
              "value": "관련 개념과 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "원자료를 찾아 읽습니다."
                }
              ],
              "position": {
                "line": 172,
                "endLine": 172
              }
            },
            {
              "type": "text",
              "value": ""
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
              "value": "연결된 지식"
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
              "type": "text",
              "value": "새 자료가 오면 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "문서와 관계를 보완합니다."
                }
              ],
              "position": {
                "line": 176,
                "endLine": 176
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 176,
            "endLine": 176
          }
        }
      ],
      "origin": {
        "line": 159,
        "endLine": 176
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "질문하면 이렇게 씁니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "질문하면 이렇게 씁니다"
          }
        ],
        "position": {
          "line": 183,
          "endLine": 183
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
                  "value": "질문"
                }
              ],
              "position": {
                "line": 185,
                "endLine": 185
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 185,
            "endLine": 185
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
                  "value": "다음 AI 스터디에서 LLM Wiki를 어떻게 시도할까?"
                }
              ],
              "position": {
                "line": 187,
                "endLine": 187
              }
            }
          ],
          "position": {
            "line": 187,
            "endLine": 187
          }
        },
        {
          "type": "element",
          "tag": "ol",
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
                      "value": "정리한 "
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "개념과 비교 문서"
                        }
                      ],
                      "position": {
                        "line": 189,
                        "endLine": 189
                      }
                    },
                    {
                      "type": "text",
                      "value": "를 읽습니다."
                    }
                  ],
                  "position": {
                    "line": 189,
                    "endLine": 189
                  }
                }
              ],
              "position": {
                "line": 189,
                "endLine": 189
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
                          "value": "우리 목적과 조건"
                        }
                      ],
                      "position": {
                        "line": 190,
                        "endLine": 190
                      }
                    },
                    {
                      "type": "text",
                      "value": "에 맞춰 답합니다."
                    }
                  ],
                  "position": {
                    "line": 190,
                    "endLine": 190
                  }
                }
              ],
              "position": {
                "line": 190,
                "endLine": 190
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
                      "value": "쓸 만한 답은 확인한 뒤 "
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "children": [
                        {
                          "type": "text",
                          "value": "문서로 남깁니다."
                        }
                      ],
                      "position": {
                        "line": 191,
                        "endLine": 191
                      }
                    },
                    {
                      "type": "text",
                      "value": ""
                    }
                  ],
                  "position": {
                    "line": 191,
                    "endLine": 191
                  }
                }
              ],
              "position": {
                "line": 191,
                "endLine": 192
              }
            }
          ],
          "position": {
            "line": 189,
            "endLine": 192
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "발표용 스터디 사례입니다."
            }
          ],
          "position": {
            "line": 193,
            "endLine": 193
          }
        }
      ],
      "origin": {
        "line": 179,
        "endLine": 193
      },
      "tone": "neutral",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "새 자료가 오면 기존 문서도 고칩니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "새 자료가 오면 기존 문서도 고칩니다"
          }
        ],
        "position": {
          "line": 201,
          "endLine": 201
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
                "src": "assets/6b2263dbe032-related-updates.svg",
                "alt": "입문자·준비된 팩·15분이라는 새 조건에 맞춰 개념 설명, 비교의 선택 기준, 현재 계획을 함께 고치는 예."
              },
              "children": [],
              "position": {
                "line": 203,
                "endLine": 203
              }
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
              "type": "text",
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "입문자와 15분 활동이라는 새 조건"
                }
              ],
              "position": {
                "line": 205,
                "endLine": 205
              }
            },
            {
              "type": "text",
              "value": "으로 설명·선택 기준·계획을 함께 고칩니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#14%EC%9E%A5-%EC%83%88-%EC%A1%B0%EA%B1%B4%EA%B3%BC-%EC%84%B8-%EB%AC%B8%EC%84%9C%EC%9D%98-%EB%B3%80%EA%B2%BD"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
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
        }
      ],
      "origin": {
        "line": 196,
        "endLine": 205
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "다 넣기보다, 다시 쓸 자료부터",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다 넣기보다, 다시 쓸 자료부터"
          }
        ],
        "position": {
          "line": 213,
          "endLine": 213
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "내 목적에 필요한가"
            }
          ],
          "position": {
            "line": 215,
            "endLine": 215
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "앞으로 만들 결과와 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "관련된 자료"
                }
              ],
              "position": {
                "line": 217,
                "endLine": 217
              }
            },
            {
              "type": "text",
              "value": "인가"
            }
          ],
          "position": {
            "line": 217,
            "endLine": 217
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "왜 골랐는가"
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
              "value": "가치 있다고 느낀 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "이유를 직접 적을 수 있는가"
                }
              ],
              "position": {
                "line": 221,
                "endLine": 221
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 221,
            "endLine": 221
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "작게 시작하기"
            }
          ],
          "position": {
            "line": 223,
            "endLine": 223
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "같은 주제의 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "자료 두 개부터 연결"
                }
              ],
              "position": {
                "line": 225,
                "endLine": 225
              }
            },
            {
              "type": "text",
              "value": "합니다."
            }
          ],
          "position": {
            "line": 225,
            "endLine": 225
          }
        }
      ],
      "origin": {
        "line": 208,
        "endLine": 225
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "목적이 있어야 정리 기준이 생깁니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "목적이 있어야 정리 기준이 생깁니다"
          }
        ],
        "position": {
          "line": 233,
          "endLine": 233
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
                "src": "assets/de481ad077ff-purpose-questions.svg",
                "alt": "다음 스터디 진행안이라는 쓰임에 맞춰 메모의 맥락·선택 이유·중요한 점과 다음 활용을 직접 적는 예."
              },
              "children": [],
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
                  "value": "왜 골랐는지, 어디에 쓸지"
                }
              ],
              "position": {
                "line": 237,
                "endLine": 237
              }
            },
            {
              "type": "text",
              "value": "를 적으면 정리할 기준이 생깁니다. · "
            },
            {
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/diagram-reading.html#16%EC%9E%A5-%EC%93%B0%EC%9E%84%EC%97%90%EC%84%9C-%EC%84%A0%ED%83%9D-%EA%B8%B0%EC%A4%80%EC%9C%BC%EB%A1%9C"
              },
              "children": [
                {
                  "type": "text",
                  "value": "그림의 관계 읽기"
                }
              ],
              "position": {
                "line": 237,
                "endLine": 237
              }
            }
          ],
          "position": {
            "line": 237,
            "endLine": 237
          }
        }
      ],
      "origin": {
        "line": 228,
        "endLine": 237
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "내 맥락을 정리하는 일은 어렵습니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "내 맥락을 정리하는 일은 어렵습니다"
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
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "같은 자료라도 내 목적과 경험에 따라 묶는 기준이 달라집니다."
            }
          ],
          "position": {
            "line": 246,
            "endLine": 246
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
                  "value": "왜 골랐고,"
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
                      "value": "어떤 질문을 풀려는가?"
                    }
                  ],
                  "position": {
                    "line": 248,
                    "endLine": 249
                  }
                },
                {
                  "type": "text",
                  "value": ""
                }
              ],
              "position": {
                "line": 248,
                "endLine": 249
              }
            }
          ],
          "position": {
            "line": 248,
            "endLine": 249
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기준부터 적어 다시 쓸 방향을 잡습니다."
            },
            {
              "type": "text",
              "value": "\n"
            },
            {
              "type": "text",
              "value": "목적 없이 모으기만 하면 다시 쓰기 어렵습니다."
            }
          ],
          "position": {
            "line": 251,
            "endLine": 252
          }
        }
      ],
      "origin": {
        "line": 240,
        "endLine": 252
      },
      "tone": "neutral",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "사람이 직접 남기는 맥락",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "사람이 직접 남기는 맥락"
          }
        ],
        "position": {
          "line": 259,
          "endLine": 259
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
                  "value": "목적과 내 판단은"
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
                      "value": "내가 적습니다."
                    }
                  ],
                  "position": {
                    "line": 261,
                    "endLine": 262
                  }
                },
                {
                  "type": "text",
                  "value": ""
                }
              ],
              "position": {
                "line": 261,
                "endLine": 262
              }
            }
          ],
          "position": {
            "line": 261,
            "endLine": 262
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "누구를 위해 무엇을 만들지 목적은 직접 정하고,"
            },
            {
              "type": "text",
              "value": "\n"
            },
            {
              "type": "text",
              "value": "감정 · 생각 · 판단 · 선택 이유를 직접 남깁니다."
            }
          ],
          "position": {
            "line": 264,
            "endLine": 265
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "기록은 구분합니다: 원문 · 내 기록 · AI가 쓴 요약과 해석."
            }
          ],
          "position": {
            "line": 267,
            "endLine": 267
          }
        }
      ],
      "origin": {
        "line": 255,
        "endLine": 267
      },
      "tone": "neutral",
      "view": {
        "compose": "quote"
      }
    },
    {
      "layout": "blocks",
      "title": "어디에 쓸 수 있나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "어디에 쓸 수 있나요?"
          }
        ],
        "position": {
          "line": 275,
          "endLine": 275
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "공부"
            }
          ],
          "position": {
            "line": 277,
            "endLine": 277
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "읽은 자료를 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "개념과 질문으로 연결"
                }
              ],
              "position": {
                "line": 279,
                "endLine": 279
              }
            },
            {
              "type": "text",
              "value": "하기"
            }
          ],
          "position": {
            "line": 279,
            "endLine": 279
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "프로젝트"
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
              "value": "배경과 결정 이유를 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "함께 읽기"
                }
              ],
              "position": {
                "line": 283,
                "endLine": 283
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 283,
            "endLine": 283
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "글과 발표"
            }
          ],
          "position": {
            "line": 285,
            "endLine": 285
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "모아 둔 근거로 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "초안 만들기"
                }
              ],
              "position": {
                "line": 287,
                "endLine": 287
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 287,
            "endLine": 287
          }
        }
      ],
      "origin": {
        "line": 270,
        "endLine": 287
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "정리한 지식으로 만든 15분 활동안",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "정리한 지식으로 만든 15분 활동안"
          }
        ],
        "position": {
          "line": 295,
          "endLine": 295
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
                "src": "assets/71a3edfad9bd-session-plan.svg",
                "alt": "자작 메모 두 개를 함께 읽는 15분 활동안 발췌. 목표와 네 활동 구간을 제시하며 실제 운영·학습효과·설치·모델 생성 시간의 실측은 아니다."
              },
              "children": [],
              "position": {
                "line": 297,
                "endLine": 297
              }
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/session-plan.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "15분 활동안 전체 읽기"
                }
              ],
              "position": {
                "line": 299,
                "endLine": 299
              }
            }
          ],
          "position": {
            "line": 299,
            "endLine": 299
          }
        }
      ],
      "origin": {
        "line": 290,
        "endLine": 299
      },
      "tone": "neutral",
      "view": {
        "compose": "media",
        "fit": "contain"
      }
    },
    {
      "layout": "blocks",
      "title": "장점은 나도 AI도 읽고 고친다는 것",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "장점은 나도 AI도 읽고 고친다는 것"
          }
        ],
        "position": {
          "line": 307,
          "endLine": 307
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "함께 읽기"
            }
          ],
          "position": {
            "line": 309,
            "endLine": 309
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "설명과 근거가 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "마크다운 문서로 남습니다."
                }
              ],
              "position": {
                "line": 311,
                "endLine": 311
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 311,
            "endLine": 311
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "함께 고치기"
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
              "value": "AI의 정리에 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "내 경험과 판단을 보탭니다."
                }
              ],
              "position": {
                "line": 315,
                "endLine": 315
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 315,
            "endLine": 315
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "다시 활용하기"
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
              "value": "정리된 개념과 연결을 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "다음 질문에 씁니다."
                }
              ],
              "position": {
                "line": 319,
                "endLine": 319
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 319,
            "endLine": 319
          }
        }
      ],
      "origin": {
        "line": 302,
        "endLine": 319
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "AI가 정리해도 확인은 필요합니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "AI가 정리해도 확인은 필요합니다"
          }
        ],
        "position": {
          "line": 327,
          "endLine": 327
        }
      },
      "blocks": [
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "내용"
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
              "value": ""
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "잘못된 요약과 근거 없는 연결"
                }
              ],
              "position": {
                "line": 331,
                "endLine": 331
              }
            },
            {
              "type": "text",
              "value": "이 생길 수 있습니다."
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
              "value": "변화"
            }
          ],
          "position": {
            "line": 333,
            "endLine": 333
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "새 자료와 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "예전 설명이 충돌"
                }
              ],
              "position": {
                "line": 335,
                "endLine": 335
              }
            },
            {
              "type": "text",
              "value": "할 수 있습니다."
            }
          ],
          "position": {
            "line": 335,
            "endLine": 335
          }
        },
        {
          "type": "element",
          "tag": "h2",
          "children": [
            {
              "type": "text",
              "value": "관리"
            }
          ],
          "position": {
            "line": 337,
            "endLine": 337
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "확인하고 고치는 데 "
            },
            {
              "type": "element",
              "tag": "strong",
              "children": [
                {
                  "type": "text",
                  "value": "시간이 듭니다."
                }
              ],
              "position": {
                "line": 339,
                "endLine": 339
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 339,
            "endLine": 339
          }
        }
      ],
      "origin": {
        "line": 322,
        "endLine": 339
      },
      "tone": "neutral",
      "view": {
        "compose": "editorial",
        "variant": "centered"
      }
    },
    {
      "layout": "blocks",
      "title": "이럴 때 작게 시작하세요",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "이럴 때 작게 시작하세요"
          }
        ],
        "position": {
          "line": 346,
          "endLine": 346
        }
      },
      "blocks": [
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
                          "value": "내 상황"
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
                          "value": "먼저 해 볼 일"
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
                          "value": "같은 주제를 자주 다시 물음"
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
                          "value": "관련 자료 두 개를 연결해 보기"
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
                          "value": "내 경험과 판단도 함께 필요함"
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
                          "value": "선택 이유와 현재 상황 적기"
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
                          "value": "자료가 많고 자주 바뀜"
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
                          "value": "검색·갱신·검토 비용 비교하기"
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
                  "tag": "tr",
                  "children": [
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "한 번만 확인하면 됨"
                        }
                      ],
                      "position": {
                        "line": 353,
                        "endLine": 353
                      }
                    },
                    {
                      "type": "element",
                      "tag": "td",
                      "children": [
                        {
                          "type": "text",
                          "value": "간단한 노트와 검색부터 시작하기"
                        }
                      ],
                      "position": {
                        "line": 353,
                        "endLine": 353
                      }
                    }
                  ],
                  "position": {
                    "line": 353,
                    "endLine": 353
                  }
                }
              ],
              "position": {
                "line": 350,
                "endLine": 353
              }
            }
          ],
          "position": {
            "line": 348,
            "endLine": 353
          }
        }
      ],
      "origin": {
        "line": 342,
        "endLine": 353
      },
      "tone": "neutral",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "첫 요청은 이 정도면 됩니다",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "첫 요청은 이 정도면 됩니다"
          }
        ],
        "position": {
          "line": 360,
          "endLine": 360
        }
      },
      "blocks": [
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
                  "value": "목적: AI 스터디에서 LLM Wiki를 설명하고 싶어.\n자료: 내가 고른 두 자료와 직접 쓴 생각·선택 이유를 읽어 줘.\n정리: 원문·내 기록·AI 요약을 구분하고 개념과 근거를 연결해 줘.\n확인: 원자료 링크, 바꾼 파일, 모르는 점을 알려줘.\n"
                }
              ],
              "position": {
                "line": 362,
                "endLine": 367
              }
            }
          ],
          "position": {
            "line": 362,
            "endLine": 367
          }
        },
        {
          "type": "element",
          "tag": "h3",
          "children": [
            {
              "type": "text",
              "value": "함께 볼 자료"
            }
          ],
          "position": {
            "line": 369,
            "endLine": 369
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
                "href": "assets/245ebc8ac44e-expanded-study.txt"
              },
              "children": [
                {
                  "type": "text",
                  "value": "예제 팩"
                }
              ],
              "position": {
                "line": 371,
                "endLine": 371
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
                  "value": "자료 읽는 방법"
                }
              ],
              "position": {
                "line": 371,
                "endLine": 371
              }
            }
          ],
          "position": {
            "line": 371,
            "endLine": 371
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
                "href": "materials/visual-appendix.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원본 그림·48장 원고 보기"
                }
              ],
              "position": {
                "line": 373,
                "endLine": 373
              }
            }
          ],
          "position": {
            "line": 373,
            "endLine": 373
          }
        }
      ],
      "origin": {
        "line": 356,
        "endLine": 373
      },
      "tone": "neutral",
      "view": {
        "compose": "document"
      }
    },
    {
      "layout": "blocks",
      "title": "다음 질문에 쓸 자료 두 개부터",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "다음 질문에 쓸 자료 두 개부터"
          }
        ],
        "position": {
          "line": 380,
          "endLine": 380
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
                  "value": "목적을 정하고 → 연결하고 → 확인하고 → 다시 씁니다."
                }
              ],
              "position": {
                "line": 382,
                "endLine": 382
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 382,
            "endLine": 382
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "내 자료를, 나와 AI가 함께 읽는 지식으로."
            }
          ],
          "position": {
            "line": 384,
            "endLine": 384
          }
        }
      ],
      "origin": {
        "line": 376,
        "endLine": 384
      },
      "tone": "neutral",
      "view": {
        "compose": "closing"
      }
    },
    {
      "layout": "blocks",
      "title": "어떤 자료로 시작하고 싶나요?",
      "heading": {
        "type": "element",
        "tag": "h1",
        "children": [
          {
            "type": "text",
            "value": "어떤 자료로 시작하고 싶나요?"
          }
        ],
        "position": {
          "line": 391,
          "endLine": 391
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
                  "value": "내가 다시 묻는 질문 하나,"
                },
                {
                  "type": "text",
                  "value": "\n"
                },
                {
                  "type": "text",
                  "value": "그 질문에 쓸 자료 두 개는 무엇인가요?"
                }
              ],
              "position": {
                "line": 393,
                "endLine": 394
              }
            },
            {
              "type": "text",
              "value": ""
            }
          ],
          "position": {
            "line": 393,
            "endLine": 394
          }
        },
        {
          "type": "element",
          "tag": "p",
          "children": [
            {
              "type": "text",
              "value": "Q&A"
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/index.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "학습 자료"
                }
              ],
              "position": {
                "line": 398,
                "endLine": 398
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
                  "value": "설계와 기술 원문"
                }
              ],
              "position": {
                "line": 398,
                "endLine": 398
              }
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
              "type": "element",
              "tag": "a",
              "attrs": {
                "href": "materials/visual-appendix.html"
              },
              "children": [
                {
                  "type": "text",
                  "value": "원본 그림·48장 원고 보기"
                }
              ],
              "position": {
                "line": 400,
                "endLine": 400
              }
            }
          ],
          "position": {
            "line": 400,
            "endLine": 400
          }
        }
      ],
      "origin": {
        "line": 387,
        "endLine": 400
      },
      "tone": "neutral",
      "view": {
        "compose": "message"
      }
    }
  ]
};
