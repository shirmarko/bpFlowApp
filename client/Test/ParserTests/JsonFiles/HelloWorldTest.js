
export let HelloWorldBeforeParse = 
{
    "id": "d67a444a-bf5c-42d0-838e-0e5a275158b4@0.1.0",
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
          400,
          100
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
          111.55558268229167,
          381.3333299424913
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
          420.4444589713291,
          387.9999863563376
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
          140.85599587941527,
          676.2441627282664
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
          408.3457002222787,
          680.3593758713249
        ],
        "name": "Bsync"
      }
    }
  }

export let HelloWorldExpectedParse =
{
    "id": "d67a444a-bf5c-42d0-838e-0e5a275158b4@0.1.0",
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
          "code": "nodesLists[\"active\"][2] = true;\n\n                bp.sync( {request:bp.Event(\"Hello\")} );\n\n                nodesLists[\"active\"][2] = false;\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"][4] = true;\n\n                bp.sync( {request:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"][4] = false;\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "nodesLists[\"active\"][6] = true;\n\n                bp.sync( {waitFor:bp.Event(\"Hello\"), block:bp.Event(\"World\")} );\n\n                nodesLists[\"active\"][6] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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