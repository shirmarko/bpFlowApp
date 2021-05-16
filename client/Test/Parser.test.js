import { parseDataToSend } from "../src/node-editor/helpers/Parser";
import { mockEditor } from "./Mocks/editorMock";

// var Parser = require("../src/node-editor/helpers/Parser.js");


const data = {
    "id": "c1cc5db0-3e06-4a5a-ac5e-56ae51a29f57@0.1.0",
    "nodes":
    {
        "3":
        {
            "id": 3,
            "data":
            {
                "color": "BLUE",
                "request": "a"
            },
            "inputs":
            {
                "input":
                    { "connections": [{ "node": 4, "output": "output", "data": {} }] }
            },
            "outputs":
            {
                "output":
                {
                    "connections": []
                }
            },
            "position": [400, 100],
            "name": "Bsync"
        },
        "4":
        {
            "id": 4,
            "data": {},
            "inputs": {},
            "outputs": { "output": { "connections": [{ "node": 3, "input": "input", "data": {} }] } },
            "position": [100, 100],
            "name": "Start"
        }
    },
    "comments": []
}

const ans = {
    "id": "84587c02-ab65-43e0-b3b6-b5b400f656a5@0.1.0",
    "nodes":
    {
        "1":
        {
            "id": 1,
            "data": { "code": "bp.sync( {request:bp.Event(\"a\")} );\nlet outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;" },
            "inputs": [2],
            "outputs": { " Output": [] },
            "type": "General"
        },
        "2": {
            "id": 2,
            "data": { "code": "let outputs = {};\noutputs[\" Output\"] = payload;\nreturn outputs;" },
            "inputs": [],
            "outputs": { " Output": [1] },
            "type": "Start"
        }
    }
};

let t = {   comments: [],
            nodes: {}
        }


var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.deepStrictEqual(parseDataToSend(new mockEditor(), t, []), {nodes: {}});
        });
    });
});