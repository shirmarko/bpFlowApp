export let unconnectedGraphBeforeParse = 
{
    "id": "eb34d2c3-fffb-4597-b851-45bee124257a@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": []
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
          "color": "BRIGHTGRAY"
        },
        "inputs": {
          "input": {
            "connections": []
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
            "connections": []
          }
        },
        "position": [
          870.6913969375641,
          117.77781784317395
        ],
        "name": "General"
      }
    }
  }

export let unconnectedGraphExpectedParse = {
  "id": "eb34d2c3-fffb-4597-b851-45bee124257a@0.1.0",
  "nodes": {
    "1": {
      "id": 1,
      "data": {
        "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
      "outputs": {
        " Output": []
      },
      "type": "Start"
    },
    "2": {
      "id": 2,
      "data": {
        "code": "nodesLists[\"active\"][2] = true;\n\n                bp.sync( {} );\n\n                nodesLists[\"active\"][2] = false;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
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
        "output1": []
      },
      "type": "General"
    }
  }
}