export let unconnectedGraphBeforeParse = {
    "id": "da7b6be1-ebca-41d1-ad64-da0bc0c98691@0.1.0",
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
            "connections": []
          }
        },
        "position": [
          400,
          100
        ],
        "name": "Bsync"
      }
    }
  }
export let unconnectedGraphExpectedParse =
{
    "id": "da7b6be1-ebca-41d1-ad64-da0bc0c98691@0.1.0",
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
          " Output": []
        },
        "type": "General"
      }
    }
  }