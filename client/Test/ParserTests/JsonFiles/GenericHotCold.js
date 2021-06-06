
export let GenericHotColdBeforeParse = 
{
    "id": "04471b21-6137-47da-9f3a-9e11a7e8a0ad@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "outputs[\"Output\"] = {i:3}"
        },
        "inputs": {},
        "outputs": {
          "Output": {
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
          -23.456790123456784,
          251.85185185185185
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
          "Output": {
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
          518.5185097343099,
          120.9876527654507
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {},
          "code": "if(payload[\"i\"] > 0){\n \tpayload[\"i\"]--;\n  \toutputs[\"output1\"] = payload;\n}"
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 1,
                "output": "Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 2,
                "output": "Output",
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
          210.08638882598484,
          152.69747270114726
        ],
        "name": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "code": "if(payload[\"i\"] > 0){\n \tpayload[\"i\"]--;\n  \toutputs[\"output1\"] = payload;\n}"
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 1,
                "output": "Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 5,
                "output": "Output",
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
          210.0863840937301,
          397.4315430321711
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
          "Output": {
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
          528.6049213821323,
          373.6851945238967
        ],
        "name": "Bsync"
      },
      "6": {
        "id": 6,
        "data": {
          "code": "outputs[\"Output\"] = {}"
        },
        "inputs": {},
        "outputs": {
          "Output": {
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
          -73.0717063859161,
          696.4713341288485
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
                "output": "Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 8,
                "output": "Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          "Output": {
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
          167.74527219005205,
          694.947167094002
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
                "output": "Output",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "outputs": {
          "Output": {
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
          565.5504980647179,
          720.8578540516623
        ],
        "name": "Bsync"
      }
    }
  }
export let GenericHotColdExpectedParse =
{
    "id": "04471b21-6137-47da-9f3a-9e11a7e8a0ad@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {i:3}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            3,
            4
          ]
        },
        "type": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "code": "nodesLists[\"active\"].get(\"2\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].get(\"2\").decrementAndGet();\n\n                selectedEvents.add(2);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          3
        ],
        "outputs": {
          "Output": [
            3
          ]
        },
        "type": "General"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "let outputs = {};\nif(payload[\"i\"] > 0){\n \tpayload[\"i\"]--;\n  \toutputs[\"output1\"] = payload;\n}\nreturn outputs;"
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
          "code": "let outputs = {};\nif(payload[\"i\"] > 0){\n \tpayload[\"i\"]--;\n  \toutputs[\"output1\"] = payload;\n}\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].get(\"5\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"5\").decrementAndGet();\n\n                selectedEvents.add(5);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          4
        ],
        "outputs": {
          "Output": [
            4
          ]
        },
        "type": "General"
      },
      "6": {
        "id": 6,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            7
          ]
        },
        "type": "Start"
      },
      "7": {
        "id": 7,
        "data": {
          "code": "nodesLists[\"active\"].get(\"7\").incrementAndGet();\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"7\").decrementAndGet();\n\n                selectedEvents.add(7);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          6,
          8
        ],
        "outputs": {
          "Output": [
            8
          ]
        },
        "type": "General"
      },
      "8": {
        "id": 8,
        "data": {
          "code": "nodesLists[\"active\"].get(\"8\").incrementAndGet();\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].get(\"8\").decrementAndGet();\n\n                selectedEvents.add(8);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          7
        ],
        "outputs": {
          "Output": [
            7
          ]
        },
        "type": "General"
      }
    }
  }