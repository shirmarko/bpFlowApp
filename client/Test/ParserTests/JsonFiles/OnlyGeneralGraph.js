export let OnlyGeneralGraphBeforeParse = 
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
            "connections": []
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
            "connections": []
          }
        },
        "outputs": {
          "output1": {
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
            "connections": []
          }
        },
        "outputs": {
          "output1": {
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
export let OnlyGeneralExpectedParse = 
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
          "Output": []
        },
        "type": "Start"
      },
      "3": {
        "id": 3,
        "data": {
          "code": "let outputs = {};\n\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "output1": []
        },
        "type": "General"
      },
      "4": {
        "id": 4,
        "data": {
          "code": "let outputs = {};\n\nreturn outputs;"
        },
        "inputs": [],
        "outputs": {
          "output1": []
        },
        "type": "General"
      }
    }
  }