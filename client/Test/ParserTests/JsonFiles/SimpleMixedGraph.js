export let SimpleMixedGraphBeforeParse = {
    "id": "b7e01b4a-3b3f-44ab-bd89-0f13ff5d95bf@0.1.0",
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
              },
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
          100,
          100
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          "payloadView": {}
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
          401.6717554026777,
          329.1968149656474
        ],
        "name": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BLUE",
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
          729.4073549368707,
          304.6137651732662
        ],
        "name": "Bsync"
      }
    }
  }
export let SimpleMixedGraphExpectedParse = {
    "id": "b7e01b4a-3b3f-44ab-bd89-0f13ff5d95bf@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          " Output": [
            2,
            3
          ]
        },
        "type": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "code": "nodesLists[\"active\"].push(2);\n\n                bp.sync( {request:bp.Event(\"a\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(2), 1);\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
          "code": "let outputs = {};\noutputs[\"output1\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
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
          "code": "nodesLists[\"active\"].push(4);\n\n                bp.sync( {request:bp.Event(\"b\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(4), 1);\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
