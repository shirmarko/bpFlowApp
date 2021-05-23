export let SimpleMixedGraphBeforeParse = 
{
    "id": "13325196-57ff-4687-bda4-f16adce0fe1f@0.1.0",
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
          -105.54603681084325,
          78.2488615802522
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
          166.83017687336059,
          57.8067293603132
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {}
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
          "output1": {
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
          641.1770220293066,
          80.37893328801302
        ],
        "name": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BRIGHTGRAY",
          "request": "\"b\""
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
            "connections": []
          }
        },
        "position": [
          1023.7407224174542,
          62.08899859567798
        ],
        "name": "Bsync"
      }
    }
  }
export let SimpleMixedGraphExpectedParse = 
{
    "id": "13325196-57ff-4687-bda4-f16adce0fe1f@0.1.0",
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
          "code": "nodesLists[\"active\"][2] = true;\n\n                bp.sync( {request:bp.Event(\"a\")} );\n\n                nodesLists[\"active\"][2] = false;\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "let outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          2
        ],
        "outputs": {
          "output1": [
            4
          ]
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "nodesLists[\"active\"][4] = true;\n\n                bp.sync( {request:bp.Event(\"b\")} );\n\n                nodesLists[\"active\"][4] = false;\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          3
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      }
    }
  }