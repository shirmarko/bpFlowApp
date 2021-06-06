export let HotColdBeforeParse = 
{
    "id": "04471b21-6137-47da-9f3a-9e11a7e8a0ad@0.1.0",
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
          "request": "\"Hello\""
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
            "connections": []
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
          "code": "outputs[\"Output\"] = {}"
        },
        "inputs": {},
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
          116.51852454668209,
          371.84568805459105
        ],
        "name": "Start"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"World\""
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
          385.654335068009,
          369.3765605788196
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
          102.93827763310185,
          624.9320983886719
        ],
        "name": "Start"
      },
      "6": {
        "id": 6,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "wait": "\"Hello\"",
          "block": "\"World\""
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
            "connections": []
          }
        },
        "position": [
          375.77778508697173,
          674.3148202026914
        ],
        "name": "Bsync"
      }
    }
  }
export let HotColdExpectedParse =
{
    "id": "04471b21-6137-47da-9f3a-9e11a7e8a0ad@0.1.0",
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
          "code": "nodesLists[\"active\"].get(\"2\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"Hello\")} );\n\n                nodesLists[\"active\"].get(\"2\").decrementAndGet();\n\n                selectedEvents.add(2);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          "Output": []
        },
        "type": "General"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "let outputs = {};\noutputs[\"Output\"] = {}\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "Output": [
            4
          ]
        },
        "type": "Start"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "nodesLists[\"active\"].get(\"4\").incrementAndGet();\n\n                bp.sync( {request:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"].get(\"4\").decrementAndGet();\n\n                selectedEvents.add(4);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].get(\"6\").incrementAndGet();\n\n                bp.sync( {waitFor:bp.Event(\"Hello\"), block:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"].get(\"6\").decrementAndGet();\n\n                selectedEvents.add(6);\n\nlet outputs = {};\noutputs[\"Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          5
        ],
        "outputs": {
          "Output": []
        },
        "type": "General"
      }
    }
  }