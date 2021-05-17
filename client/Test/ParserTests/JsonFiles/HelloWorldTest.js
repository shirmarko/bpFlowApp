
export let HelloWorldBeforeParse = 
{
    "id": "d4f3e12f-3b21-4dea-bf29-3185724cd1ce@0.1.0",
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
          114.35802469135803,
          -143.4691358024691
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Hello\""
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
            "connections": []
          }
        },
        "position": [
          387.65432190267603,
          -122.22220575183114
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {},
        "inputs": {},
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
          101.67899426118825,
          174.52332531353963
        ],
        "name": "Start"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"World\""
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
          390.5678808625228,
          189.47532377186008
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
          83.16047574266975,
          461.0802544487847
        ],
        "name": "Start"
      },
      "6": {
        "id": 6,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "block": "\"World\"",
          "wait": "\"Hello\""
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
            "connections": []
          }
        },
        "position": [
          354.76541209272904,
          453.672853812538
        ],
        "name": "Bsync"
      }
    }
  }

export let HelloWorldExpectedParse =
{
    "id": "d4f3e12f-3b21-4dea-bf29-3185724cd1ce@0.1.0",
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
          "code": "nodesLists[\"active\"].push(2);\n\n                bp.sync( {request:bp.Event(\"Hello\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(2), 1);\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          " Output": [
            4
          ]
        },
        "type": "Start"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "nodesLists[\"active\"].push(4);\n\n                bp.sync( {request:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(4), 1);\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"].push(6);\n\n                bp.sync( {waitFor:bp.Event(\"Hello\"), block:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(6), 1);\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          5
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      }
    }
  }