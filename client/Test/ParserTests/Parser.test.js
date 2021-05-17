import { parseDataToSend } from "../../src/node-editor/helpers/Parser";
import { mockEditor } from "../Mocks/editorMock";
import { mockNode  } from "../Mocks/nodeMock";
import { mockOutput } from "../Mocks/outputMock";
import * as HelloWorldTest from "./JsonFiles/HelloWorldTest";
import * as Consts from "../.././src/node-editor/helpers/Consts";

// var Parser = require("../src/node-editor/helpers/Parser.js");


var assert = require('assert');
describe('Parser', function () {
        it('Hello World', function () {
            let HelloWorldMockEditor = new mockEditor();
            let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            let helloNode = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            let start2 = new mockNode(3, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            let worldNode = new mockNode(4, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            let start3 = new mockNode(5, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            let arbitarNode = new mockNode(6, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
            HelloWorldMockEditor.nodes = [start1, helloNode, start2, worldNode, start3, arbitarNode];
            assert.deepStrictEqual(parseDataToSend(HelloWorldMockEditor, HelloWorldTest.HelloWorldBeforeParse, []), HelloWorldTest.HelloWorldExpectedParse);
    });
});