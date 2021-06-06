export let OnlyBsyncGraphBeforeParse = 
{
    "id": "1a5abcee-a6da-45ad-a1c9-1dd774519a9c@0.1.0",
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
          64.94434410418683,
          92.37920524004062
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"a\""
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
          "request": "\"b\""
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
          789.565242719289,
          100.87199527483955
        ],
        "name": "Bsync"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"c\""
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
          1161.4596773434528,
          106.96858081263838
        ],
        "name": "Bsync"
      },
      "5": {
        "id": 5,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"d\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 4,
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
          1528.7817258834698,
          106.96857418531914
        ],
        "name": "Bsync"
      }
    }
  }

export let OnlyBsyncGraphExpectedParse = 
{
    "id": "1a5abcee-a6da-45ad-a1c9-1dd774519a9c@0.1.0",
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
          "code": "nodesLists[\"active\"].get(\"2\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"a\")} );\n\n                nodesLists[\"active\"].get(\"2\").decrementAndGet();\n\n                selectedEvents.add(2);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].get(\"3\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"b\")} );\n\n                nodesLists[\"active\"].get(\"3\").decrementAndGet();\n\n                selectedEvents.add(3);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].get(\"4\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"c\")} );\n\n                nodesLists[\"active\"].get(\"4\").decrementAndGet();\n\n                selectedEvents.add(4);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          3
        ],
        "outputs": {
          "Output": [
            5
          ]
        },
        "type": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "code": "nodesLists[\"active\"].get(\"5\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"d\")} );\n\n                nodesLists[\"active\"].get(\"5\").decrementAndGet();\n\n                selectedEvents.add(5);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          4
        ],
        "outputs": {
          "Output": []
        },
        "type": "General"
      }
    }
  }