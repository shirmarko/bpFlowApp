
export let GenericHotColdBeforeParse = 
{
    "id": "857263a2-289f-4c1b-ab75-78b5dc0dfcfd@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "\nlet outputs = {};\noutputs[\" Output\"] = {i:3};\nreturn outputs;"
        },
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 3,
                "input": "input",
                "data": {
                  "pins": []
                }
              },
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
          -76.66666666666666,
          30
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
                "node": 3,
                "output": "output1",
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
          582.2222424808069,
          -61.4934116884784
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {},
          "code": "if(payload[\"i\"] > 0){\n  payload[\"i\"]--;\n}\nelse{\n  return -1;\n}\nlet outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
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
              },
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
          "output1": {
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
          209.66669300712246,
          -43.88891526210844
        ],
        "name": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "code": "if(payload[\"i\"] > 0){\n  payload[\"i\"]--;\n}\nelse{\n  return -1;\n}\nlet outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
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
              },
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
          "output1": {
            "connections": [
              {
                "node": 5,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          209.6666722034027,
          239.44443854732702
        ],
        "name": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 4,
                "output": "output1",
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
          641.888913569773,
          253.8888792537083
        ],
        "name": "Bsync"
      },
      "6": {
        "id": 6,
        "data": {},
        "inputs": {},
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
          -106.64152144096087,
          585.9876467857831
        ],
        "name": "Start"
      },
      "7": {
        "id": 7,
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
                "node": 6,
                "output": " Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 8,
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
          199.79014611089957,
          578.5802509076494
        ],
        "name": "Bsync"
      },
      "8": {
        "id": 8,
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
          669.9634301125905,
          564.0654125735251
        ],
        "name": "Bsync"
      }
    }
  }
export let GenericHotColdExpectedParse =
{
    "id": "857263a2-289f-4c1b-ab75-78b5dc0dfcfd@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "\nlet outputs = {};\noutputs[\" Output\"] = {i:3};\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          " Output": [
            3,
            4
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
          3
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
          "code": "if(payload[\"i\"] > 0){\n  payload[\"i\"]--;\n}\nelse{\n  return -1;\n}\nlet outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1,
          2
        ],
        "outputs": {
          "output1": [
            2
          ]
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "if(payload[\"i\"] > 0){\n  payload[\"i\"]--;\n}\nelse{\n  return -1;\n}\nlet outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1,
          5
        ],
        "outputs": {
          "output1": [
            5
          ]
        },
        "type": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "code": "nodesLists[\"active\"][5] = true;\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][5] = false;\nnodesLists[\"selectedEvent\"] = 5;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          4
        ],
        "outputs": {
          " Output": [
            4
          ]
        },
        "type": "General"
      },
      "6": {
        "id": 6,
        "data": {
          "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          " Output": [
            7
          ]
        },
        "type": "Start"
      },
      "7": {
        "id": 7,
        "data": {
          "code": "nodesLists[\"active\"][7] = true;\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"][7] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          6,
          8
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
          "code": "nodesLists[\"active\"][8] = true;\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"][8] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          7
        ],
        "outputs": {
          " Output": [
            7
          ]
        },
        "type": "General"
      }
    }
  }