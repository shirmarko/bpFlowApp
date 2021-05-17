export let HotColdBeforeParse = 
{
    "id": "544936e9-89ca-4a02-a27c-358d670856be@0.1.0",
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
          -23,
          -25
        ],
        "name": "Start"
      },
      "2": {
        "id": 2,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Hot\""
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
          216,
          -51.371742293227925
        ],
        "name": "Bsync"
      },
      "3": {
        "id": 3,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Hot\""
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
          566.9629603313596,
          -41.51851063835187
        ],
        "name": "Bsync"
      },
      "4": {
        "id": 4,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Hot\""
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
          901.5308515921905,
          -35.34567076617034
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
          -15.753098476080254,
          265.8888828607253
        ],
        "name": "Start"
      },
      "6": {
        "id": 6,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Cold\""
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
            "connections": [
              {
                "node": 7,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          227.45678181871867,
          267.1234586311467
        ],
        "name": "Bsync"
      },
      "7": {
        "id": 7,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 6,
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
                "node": 8,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          539.6652839948707,
          273.2962996013543
        ],
        "name": "Bsync"
      },
      "8": {
        "id": 8,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "request": "\"Cold\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 7,
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
          863.2592509545211,
          283.17284372625255
        ],
        "name": "Bsync"
      },
      "9": {
        "id": 9,
        "data": {},
        "inputs": {},
        "outputs": {
          " Output": {
            "connections": [
              {
                "node": 10,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          10.447255508223009,
          606.3552960067266
        ],
        "name": "Start"
      },
      "10": {
        "id": 10,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "block": "\"Cold\"",
          "wait": "\"Hot\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 9,
                "output": " Output",
                "data": {
                  "pins": []
                }
              },
              {
                "node": 11,
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
                "node": 11,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          257.3607931595622,
          587.1508817150823
        ],
        "name": "Bsync"
      },
      "11": {
        "id": 11,
        "data": {
          "payloadView": {},
          "color": "BLUE",
          "wait": "\"Cold\"",
          "block": "\"Hot\""
        },
        "inputs": {
          "input": {
            "connections": [
              {
                "node": 10,
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
                "node": 10,
                "input": "input",
                "data": {
                  "pins": []
                }
              }
            ]
          }
        },
        "position": [
          736.0988209619945,
          562.4595157376078
        ],
        "name": "Bsync"
      }
    }
  }

export let HotColdExpectedParse =
{
  "id": "544936e9-89ca-4a02-a27c-358d670856be@0.1.0",
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
        "code": "nodesLists[\"active\"].push(2);\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(2), 1);\nnodesLists[\"selectedEvent\"] = 2;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
        "code": "nodesLists[\"active\"].push(3);\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(3), 1);\nnodesLists[\"selectedEvent\"] = 3;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        2
      ],
      "outputs": {
        " Output": [
          4
        ]
      },
      "type": "General"
    },
    "4": {
      "id": 4,
      "data": {
        "code": "nodesLists[\"active\"].push(4);\n\n                bp.sync( {request:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(4), 1);\nnodesLists[\"selectedEvent\"] = 4;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
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
        "code": "nodesLists[\"active\"].push(6);\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(6), 1);\nnodesLists[\"selectedEvent\"] = 6;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        5
      ],
      "outputs": {
        " Output": [
          7
        ]
      },
      "type": "General"
    },
    "7": {
      "id": 7,
      "data": {
        "code": "nodesLists[\"active\"].push(7);\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(7), 1);\nnodesLists[\"selectedEvent\"] = 7;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        6
      ],
      "outputs": {
        " Output": [
          8
        ]
      },
      "type": "General"
    },
    "8": {
      "id": 8,
      "data": {
        "code": "nodesLists[\"active\"].push(8);\n\n                bp.sync( {request:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(8), 1);\nnodesLists[\"selectedEvent\"] = 8;\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        7
      ],
      "outputs": {
        " Output": []
      },
      "type": "General"
    },
    "9": {
      "id": 9,
      "data": {
        "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [],
      "outputs": {
        " Output": [
          10
        ]
      },
      "type": "Start"
    },
    "10": {
      "id": 10,
      "data": {
        "code": "nodesLists[\"active\"].push(10);\n\n                bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(10), 1);\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        9,
        11
      ],
      "outputs": {
        " Output": [
          11
        ]
      },
      "type": "General"
    },
    "11": {
      "id": 11,
      "data": {
        "code": "nodesLists[\"active\"].push(11);\n\n                bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );\n\n                nodesLists[\"active\"].splice(nodesLists[\"active\"].indexOf(11), 1);\n\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;"
      },
      "inputs": [
        10
      ],
      "outputs": {
        " Output": [
          10
        ]
      },
      "type": "General"
    }
  }
}