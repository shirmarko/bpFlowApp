import { parseDataToSend } from "../../src/node-editor/helpers/Parser";
import { mockEditor } from "../Mocks/editorMock";
import { mockNode } from "../Mocks/nodeMock";
import { mockOutput } from "../Mocks/outputMock";
import * as Consts from "../.././src/node-editor/helpers/Consts";

var assert = require('assert');
describe('Parser', function () {

    it('Empty Graph', function () {
        const inputEmptyGraph = require( "../../src/Resources/testsResources/input/EmptyGraphBeforeParse.json");
        const expectedEmptyGraph = require( "../../src/Resources/testsResources/expected/EmptyGraphExpected.json");
        let EmptyGraphMockEditor = new mockEditor();
        assert.deepStrictEqual(parseDataToSend(EmptyGraphMockEditor, inputEmptyGraph), expectedEmptyGraph);
    });

    it('Only Start Graph', function () {
        const inputOnlyStartGraph  = require( "../../src/Resources/testsResources/input/OnlyStartGraphBeforeParse.json");
        const expectedOnlyStartGraph  = require( "../../src/Resources/testsResources/expected/OnlyStartGraphExpected.json");
        let OnlyStartGraphMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        
        OnlyStartGraphMockEditor.nodes = [start1];
        assert.deepStrictEqual(parseDataToSend(OnlyStartGraphMockEditor, inputOnlyStartGraph), expectedOnlyStartGraph);
    });

    it('Unconnected Graph', function () {
        const inputUnconnectedGraph  = require( "../../src/Resources/testsResources/input/unconnectedGraphBeforeParse.json");
        const expectedUnconnectedGraph  = require( "../../src/Resources/testsResources/expected/unconnectedGraphExpected.json");
        let UnconnectedGraphMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync2 = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));

        UnconnectedGraphMockEditor.nodes = [start1, bsync2];

        assert.deepStrictEqual(parseDataToSend(UnconnectedGraphMockEditor, inputUnconnectedGraph), expectedUnconnectedGraph);
    });

    it('Unconnected Graph 2', function () {
        const inputUnconnectedGraph2  = require( "../../src/Resources/testsResources/input/unconnectedGraphBeforeParse#2.json");
        const expectedUnconnectedGraph2  = require( "../../src/Resources/testsResources/expected/unconnectedGraphExpected#2.json");
        let UnconnectedGraphMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync2 = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let general3 = new mockNode(3, new Map([["output1", new mockOutput("output1")]]));

        UnconnectedGraphMockEditor.nodes = [start1, bsync2, general3];

        assert.deepStrictEqual(parseDataToSend(UnconnectedGraphMockEditor, inputUnconnectedGraph2), expectedUnconnectedGraph2);
    });

    it('Only Bsync Graph', function () {
        const inputOnlyBsyncGraph = require( "../../src/Resources/testsResources/input/OnlyBsyncGraphBeforeParse.json");
        const expectedOnlyBsyncGraph = require( "../../src/Resources/testsResources/expected/OnlyBsyncGraphExpected.json");
        let OnlyBsyncMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync2 = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync3 = new mockNode(3, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync4 = new mockNode(4, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync5 = new mockNode(5, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        OnlyBsyncMockEditor.nodes = [start1, bsync2, bsync3, bsync4, bsync5];

        assert.deepStrictEqual(parseDataToSend(OnlyBsyncMockEditor, inputOnlyBsyncGraph), expectedOnlyBsyncGraph);
    });

    it('Only General Graph', function () {
        const inputOnlyGeneralGraph  = require( "../../src/Resources/testsResources/input/OnlyGeneralGraphBeforeParse.json");
        const expectedOnlyGeneralGraph = require( "../../src/Resources/testsResources/expected/OnlyGeneralGraphExpected.json");
        let OnlyGeneralMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let general3 = new mockNode(3, new Map([["output1", new mockOutput("output1")],["output2", new mockOutput("output2")]]));
        let general4 = new mockNode(4, new Map([["output1", new mockOutput("output1")],["output2", new mockOutput("output2")]]));
        OnlyGeneralMockEditor.nodes = [start1, general3, general4];

        assert.deepStrictEqual(parseDataToSend(OnlyGeneralMockEditor, inputOnlyGeneralGraph), expectedOnlyGeneralGraph);
    });

    it('Simple Mixed Graph', function () {
        const inputSimpleMixedGraph  = require( "../../src/Resources/testsResources/input/SimpleMixedGraphBeforeParse.json");
        const expectedSimpleMixedGraph  = require( "../../src/Resources/testsResources/expected/SimpleMixedGraphExpected.json");
        let SimpleMixedMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let bsync2 = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let general3 = new mockNode(3, new Map([["output1", new mockOutput("output1")]]));
        let bsync4 = new mockNode(4, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));

        SimpleMixedMockEditor.nodes = [start1,bsync2, general3, bsync4];

        assert.deepStrictEqual(parseDataToSend(SimpleMixedMockEditor, inputSimpleMixedGraph), expectedSimpleMixedGraph);
    });

    it('Hello World', function () {

        const inputHelloWorldTest = require("../../src/Resources/testsResources/input/HelloWorldBeforeParse.json");
        const expectedHelloWorldTest = require( "../../src/Resources/testsResources/expected/HelloWorldExpexted.json");
        let HelloWorldMockEditor = new mockEditor();
        let start1 = new mockNode(1, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let helloNode = new mockNode(2, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let start2 = new mockNode(3, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let worldNode = new mockNode(4, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let start3 = new mockNode(5, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        let arbitarNode = new mockNode(6, new Map([[Consts.defaultOutputName, new mockOutput(Consts.defaultOutputName)]]));
        HelloWorldMockEditor.nodes = [start1, helloNode, start2, worldNode, start3, arbitarNode];
        assert.deepStrictEqual(parseDataToSend(HelloWorldMockEditor, inputHelloWorldTest), expectedHelloWorldTest);
    });

    it('Hot Cold', function () {
        const inputHotColdTest = require( "../../src/Resources/testsResources/input/HotColdBeforeParse.json");
        const expectedHotColdTest = require( "../../src/Resources/testsResources/expected/HotColdExpected.json");
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
        assert.deepStrictEqual(parseDataToSend(HotColdMockEditor, inputHotColdTest), expectedHotColdTest);
    });

    it('Generic Hot Cold', function () {
        const inputGenericHotColdTest = require( "../../src/Resources/testsResources/input/GenericHotColdBeforeParse.json");
        const expectedGenericHotColdTest = require( "../../src/Resources/testsResources/expected/GenericHotColdExpected.json");
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
        assert.deepStrictEqual(parseDataToSend(GenericHotColdMockEditor, inputGenericHotColdTest), expectedGenericHotColdTest);
    });

});