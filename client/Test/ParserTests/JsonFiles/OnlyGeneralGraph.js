export let OnlyGeneralGraphBeforeParse = {
    "id": "8d573636-921a-4e5b-9f58-10a5cf559c45@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
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
          102.17013827567256,
          100.48225295014946
        ],
        "name": "Start"
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
            "connections": []
          },
          "output2": {
            "connections": []
          }
        },
        "position": [
          433.09538939025856,
          102.1796709693158
        ],
        "name": "General"
      },
      "4": {
        "id": 4,
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
            "connections": []
          },
          "output2": {
            "connections": []
          }
        },
        "position": [
          429.85223425986595,
          312.4480511982969
        ],
        "name": "General"
      }
    }
  }
export let OnlyGeneralExpectedParse = {
    "id": "8d573636-921a-4e5b-9f58-10a5cf559c45@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          " Output": [
            3,
            4
          ]
        },
        "type": "Start"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "let outputs = {};\noutputs[\"output1\"] = payload;\noutputs[\"output2\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          "output1": [],
          "output2": []
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "let outputs = {};\noutputs[\"output1\"] = payload;\noutputs[\"output2\"] = payload;\nreturn outputs;"
        },
        "inputs": [
          1
        ],
        "outputs": {
          "output1": [],
          "output2": []
        },
        "type": "General"
      }
    }
  }