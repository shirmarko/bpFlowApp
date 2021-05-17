export let OnlyBsyncGraphBeforeParse = {
    "id": "51d38337-3a8a-4592-a149-bb3fa772603b@0.1.0",
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
          100,
          99.29958520517273
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
          400,
          100
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"c\""
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
          396.6627319304657,
          336.8195527446963
        ],
        "name": "Bsync"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"d\""
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
          401.1751965487107,
          578.2217034117207
        ],
        "name": "Bsync"
      },
      "5": {
        "id": 5,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"b\""
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
          " Output": {
            "connections": []
          }
        },
        "position": [
          773.5435258392447,
          97.35794820650469
        ],
        "name": "Bsync"
      }
    }
  }
export let OnlyBsyncGraphExpectedParse = {
    "id": "51d38337-3a8a-4592-a149-bb3fa772603b@0.1.0",
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
            3,
            4
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
          " Output": [
            5
          ]
        },
        "type": "General"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "nodesLists[\"active\"].push(3);\n\n                bp.sync( {request:bp.Event(\"c\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(3), 1);\nnodesLists[\"selectedEvent\"] = 3;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "nodesLists[\"active\"].push(4);\n\n                bp.sync( {request:bp.Event(\"d\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(4), 1);\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      },
      "5": {
        "id": 5,
        "data": {
          "code": "nodesLists[\"active\"].push(5);\n\n                bp.sync( {request:bp.Event(\"b\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(5), 1);\nnodesLists[\"selectedEvent\"] = 5;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          2
        ],
        "outputs": {
          " Output": []
        },
        "type": "General"
      }
    }
  }