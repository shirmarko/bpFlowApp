export let OnlyStartGraphBeforeParse = 
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
          100,
          100
        ],
        "name": "Start"
      }
    }
  }
export let OnlyStartGraphExpectedParse = 
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
      }
    }
  }