export let HotColdBeforeParse = 
{
    "id": "dd57dee9-61b5-4dd7-bc4b-590b075d8130@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 2,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          100,
          100
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Hot\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 1,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 3,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          400,
          100
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Hot\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 2,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 4,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          801.3781645103803,
          104.58479988488654
        ],
        "name": "Bsync"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Hot\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 3,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": []
          }
        },
        "position": [
          1172.9955368701922,
          104.58457010599261
        ],
        "name": "Bsync"
      },
      "5": {
        "id": 5,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 6,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          85.5781585334285,
          432.55567700704364
        ],
        "name": "Start"
      },
      "6": {
        "id": 6,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 5,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 7,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          391.6875689027225,
          432.2631395578423
        ],
        "name": "Bsync"
      },
      "7": {
        "id": 7,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 6,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 8,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          802.9176930811612,
          438.12890534395905
        ],
        "name": "Bsync"
      },
      "8": {
        "id": 8,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 7,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": []
          }
        },
        "position": [
          1187.8214079096085,
          422.3023275345822
        ],
        "name": "Bsync"
      },
      "9": {
        "id": 9,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 10,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          86.57891537628655,
          816.427936565041
        ],
        "name": "Start"
      },
      "10": {
        "id": 10,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "wait": "\"Hot\"",
          "block": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 11,
                "output": " Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 9,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 11,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          428.3596949803878,
          793.3346735044274
        ],
        "name": "Bsync"
      },
      "11": {
        "id": 11,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "block": "\"Hot\"",
          "wait": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 10,
                "output": " Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 10,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          851.7368861755268,
          804.1114172165744
        ],
        "name": "Bsync"
      }
    }
  }

export let HotColdExpectedParse =
{
  "id": "dd57dee9-61b5-4dd7-bc4b-590b075d8130@0.1.0",
  "nodes": {
    "1": {
      "id": 1,
      "data": {
        "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
      "outputs": {
        " Output": [
          2
        ]
      },
      "type": "Start"
    },
    "2": {
      "id": 2,
      "data": {
        "code": "nodesLists[\"active\"][2] = true;\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"][2] = false;\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        1
      ],
      "outputs": {
        " Output": [
          3
        ]
      },
      "type": "General"
    },
    "3": {
      "id": 3,
      "data": {
        "code": "nodesLists[\"active\"][3] = true;\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"][3] = false;\nnodesLists[\"selectedEvent\"] = 3;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        2
      ],
      "outputs": {
        " Output": [
          4
        ]
      },
      "type": "General"
    },
    "4": {
      "id": 4,
      "data": {
        "code": "nodesLists[\"active\"][4] = true;\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"][4] = false;\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        3
      ],
      "outputs": {
        " Output": []
      },
      "type": "General"
    },
    "5": {
      "id": 5,
      "data": {
        "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
      "outputs": {
        " Output": [
          6
        ]
      },
      "type": "Start"
    },
    "6": {
      "id": 6,
      "data": {
        "code": "nodesLists[\"active\"][6] = true;\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][6] = false;\nnodesLists[\"selectedEvent\"] = 6;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        5
      ],
      "outputs": {
        " Output": [
          7
        ]
      },
      "type": "General"
    },
    "7": {
      "id": 7,
      "data": {
        "code": "nodesLists[\"active\"][7] = true;\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][7] = false;\nnodesLists[\"selectedEvent\"] = 7;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        6
      ],
      "outputs": {
        " Output": [
          8
        ]
      },
      "type": "General"
    },
    "8": {
      "id": 8,
      "data": {
        "code": "nodesLists[\"active\"][8] = true;\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][8] = false;\nnodesLists[\"selectedEvent\"] = 8;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        7
      ],
      "outputs": {
        " Output": []
      },
      "type": "General"
    },
    "9": {
      "id": 9,
      "data": {
        "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
      "outputs": {
        " Output": [
          10
        ]
      },
      "type": "Start"
    },
    "10": {
      "id": 10,
      "data": {
        "code": "nodesLists[\"active\"][10] = true;\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][10] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        11,
        9
      ],
      "outputs": {
        " Output": [
          11
        ]
      },
      "type": "General"
    },
    "11": {
      "id": 11,
      "data": {
        "code": "nodesLists[\"active\"][11] = true;\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"][11] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        10
      ],
      "outputs": {
        " Output": [
          10
        ]
      },
      "type": "General"
    }
  }
}