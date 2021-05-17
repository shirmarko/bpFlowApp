
export let GenericHotColdBeforeParse = 
{
    "id": "12636264-5251-4d2d-8844-f21e9ca389a9@0.1.0",
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
          -20.641981820551983,
          118.69145198225006
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          594.5925931416057,
          -34.62962743357748
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
          278,
          -4.358019878208094
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
          265.0493916547564,
          254.82715705586293
        ],
        "name": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          613.3332765104506,
          239.90122398414292
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
          -66.62959346064815,
          548.5432189187886
        ],
        "name": "Start"
      },
      "7": {
        "id": 7,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          237.07411262211204,
          551.0123662505314
        ],
        "name": "Bsync"
      },
      "8": {
        "id": 8,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          617.3210277578958,
          547.3086619978147
        ],
        "name": "Bsync"
      }
    }
  }


export let GenericHotColdExpectedParse =
{
    "id": "12636264-5251-4d2d-8844-f21e9ca389a9@0.1.0",
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
          "code": "nodesLists[\"active\"].push(2);\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(2), 1);\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].push(5);\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(5), 1);\nnodesLists[\"selectedEvent\"] = 5;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].push(7);\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(7), 1);\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].push(8);\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(8), 1);\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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