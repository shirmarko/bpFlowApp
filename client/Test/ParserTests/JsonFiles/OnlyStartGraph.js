export let OnlyStartGraphBeforeParse = {
    "id": "11d51078-e901-40e0-8691-af83e4b1cd5b@0.1.0",
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
      }
    }
  }
export let OnlyStartGraphExpectedParse = {
    "id": "11d51078-e901-40e0-8691-af83e4b1cd5b@0.1.0",
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
      }
    }
  }