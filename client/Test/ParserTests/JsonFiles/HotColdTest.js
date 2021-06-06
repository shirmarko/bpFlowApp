export let HotColdBeforeParse = 
{
    "id": "d908a0d2-ffd5-4958-bddb-5c5baac36e2c@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "outputs[\"Output\"] = {}"
        },
        "inputs": {},
        "outputs": {
          "Output": {
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
          718.6666783030016,
          107.55551966450759
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
            "connections": []
          }
        },
        "position": [
          1015.333206124309,
          119.77791359051497
        ],
        "name": "Bsync"
      },
      "5": {
        "id": 5,
        "data": {
          "code": "outputs[\"Output\"] = {}"
        },
        "inputs": {},
        "outputs": {
          "Output": {
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
          100.88887532552084,
          418.66667005750867
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
          343.11109421248824,
          409.77776992757583
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
          676.4444370574743,
          408.6666558517938
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
            "connections": []
          }
        },
        "position": [
          1014.2222097706058,
          430.88887560345677
        ],
        "name": "Bsync"
      },
      "9": {
        "id": 9,
        "data": {
          "code": "outputs[\"Output\"] = {}"
        },
        "inputs": {},
        "outputs": {
          "Output": {
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
          76.54804224012116,
          738.5142461921226
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
                "node": 9,
                "output": "Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 11,
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
          340.2274052117151,
          727.8451312386535
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
          677.0663073445734,
          720.2243407207205
        ],
        "name": "Bsync"
      }
    }
  }
export let HotColdExpectedParse =
{
    "id": "d908a0d2-ffd5-4958-bddb-5c5baac36e2c@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            2
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
          1
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
          "code": "nodesLists[\"active\"].get(\"3\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].get(\"3\").decrementAndGet();\n\n                selectedEvents.add(3);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          2
        ],
        "outputs": {
          "Output": [
            4
          ]
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "nodesLists[\"active\"].get(\"4\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].get(\"4\").decrementAndGet();\n\n                selectedEvents.add(4);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          3
        ],
        "outputs": {
          "Output": []
        },
        "type": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            6
          ]
        },
        "type": "Start"
      },
      "6": {
        "id": 6,
        "data": {
          "code": "nodesLists[\"active\"].get(\"6\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"6\").decrementAndGet();\n\n                selectedEvents.add(6);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          5
        ],
        "outputs": {
          "Output": [
            7
          ]
        },
        "type": "General"
      },
      "7": {
        "id": 7,
        "data": {
          "code": "nodesLists[\"active\"].get(\"7\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"7\").decrementAndGet();\n\n                selectedEvents.add(7);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          6
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
          "code": "nodesLists[\"active\"].get(\"8\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"8\").decrementAndGet();\n\n                selectedEvents.add(8);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          7
        ],
        "outputs": {
          "Output": []
        },
        "type": "General"
      },
      "9": {
        "id": 9,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            10
          ]
        },
        "type": "Start"
      },
      "10": {
        "id": 10,
        "data": {
          "code": "nodesLists[\"active\"].get(\"10\").incrementAndGet();\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].get(\"10\").decrementAndGet();\n\n                selectedEvents.add(10);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          9,
          11
        ],
        "outputs": {
          "Output": [
            11
          ]
        },
        "type": "General"
      },
      "11": {
        "id": 11,
        "data": {
          "code": "nodesLists[\"active\"].get(\"11\").incrementAndGet();\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].get(\"11\").decrementAndGet();\n\n                selectedEvents.add(11);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          10
        ],
        "outputs": {
          "Output": [
            10
          ]
        },
        "type": "General"
      }
    }
  }