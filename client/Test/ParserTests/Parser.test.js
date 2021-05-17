import { parseDataToSend } from "../../src/node-editor/helpers/Parser";
import { mockEditor } from "../Mocks/editorMock";
import { mockNode  } from "../Mocks/nodeMock";
import { mockOutput } from "../Mocks/outputMock";
import * as HelloWorldTest from "./JsonFiles/HelloWorldTest";
import * as HotColdTest from "./JsonFiles/HotColdTest";
import * as GenericHotColdTest from "./JsonFiles/GenericHotCold";
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

    it('Hot Cold', function () {
        let HotColdMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let hot1 = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let hot2 = new mockNode(3, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let hot3 = new mockNode(4, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let start2 = new mockNode(5, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let cold1 = new mockNode(6, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let cold2 = new mockNode(7, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let cold3 = new mockNode(8, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let start3 = new mockNode(9, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let blockCold = new mockNode(10, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let blockHot = new mockNode(11, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        HotColdMockEditor.nodes = [start1, hot1, hot2, hot3, start2, cold1, cold2, cold3, start3, blockCold, blockHot];
        assert.deepStrictEqual(parseDataToSend(HotColdMockEditor, HotColdTest.HotColdBeforeParse, []), HotColdTest.HotColdExpectedParse);
    });

    it('Generic Hot Cold', function () {
        let GenericHotColdMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName, "{i:3}")]]));
        let hot = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let hotCounter = new mockNode(3, new Map([["output1", new mockOutput("output1")]]));
        let coldCounter = new mockNode(4, new Map([["output1", new mockOutput("output1")]]));
        let cold = new mockNode(5, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let start2 = new mockNode(6, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let blockCold = new mockNode(7, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let blockHot = new mockNode(8, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        GenericHotColdMockEditor.nodes = [start1, hot, hotCounter, coldCounter, cold, start2, blockCold, blockHot];
        assert.deepStrictEqual(parseDataToSend(GenericHotColdMockEditor, GenericHotColdTest.GenericHotColdBeforeParse, []), GenericHotColdTest.GenericHotColdExpectedParse);
    });
});