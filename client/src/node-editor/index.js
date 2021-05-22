import Rete from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';
// import DockPlugin from "rete-dock-plugin";
import CommentPlugin from "rete-comment-plugin";
import { BsyncComponent, statusColor } from "./components/BsyncComponent";
import { StartComponent } from "./components/StartComponent";
import { GeneralComponent } from "./components/GeneralComponent";
import * as Consts from "./helpers/Consts";
import * as ButtonsHandlers from "./helpers/ButtonsHandlers" 
import * as EventHandlers from "./EventHandlers/EventHandlers.js"

const eventSource = new EventSource('http://localhost:8090/subscribe');
export let nodeNamesToIds = {};
export let editor;
let engine;
let logConsoleContent;
let nevBarbuttonsVisibility;

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) + "@0.1.0";
}

export async function OnClickRun() {
    ButtonsHandlers.SendGraphToServer(editor, engine, nodeNamesToIds, "run");
}

export async function OnClickDebug() {
    ButtonsHandlers.SendGraphToServer(editor, engine, nodeNamesToIds, "debug");
}

export async function OnClickStop() {
    ButtonsHandlers.OnClickStop(editor, nodeNamesToIds);
}

export async function OnClickStep() {
    ButtonsHandlers.OnClickStep(editor, engine);
}

export function addLogLine(line){
    logConsoleContent.push(line);
}

export function enableStepButton(){
    nevBarbuttonsVisibility.isStepDisabled = false;
}

export function disableStepButton(){
    nevBarbuttonsVisibility.isStepDisabled = true;
}

export function enableStopButton(){
    nevBarbuttonsVisibility.isStopDisabled = false;
}

export function disableStopButton(){
    nevBarbuttonsVisibility.isStopDisabled = true;
}

export function enableDebugButton(){
    nevBarbuttonsVisibility.isDebugDisabled = false;
}

export function disableDebugButton(){
    nevBarbuttonsVisibility.isDebugDisabled = true;
}

export function enableRunButton(){
    nevBarbuttonsVisibility.isRunDisabled = false;
}

export function disableRunButton(){
    nevBarbuttonsVisibility.isRunDisabled = true;
}

export function cleanBoard(){
    editor.clear();
}

export function init(container, logContent, buttonsVisibility) {
    // //----------------EventListener---------------
    console.log('-----init editor--------');
    logConsoleContent = logContent;
    nevBarbuttonsVisibility = buttonsVisibility;
    eventSource.addEventListener('flowEvent', EventHandlers.flowEventHandler);
    eventSource.addEventListener('step', EventHandlers.stepEventHandler);


    const id = createUUID();
    engine = new Rete.Engine(id);
    // var container = document.querySelector('#rete');
    editor = new Rete.NodeEditor(id, container);
    const components = [new StartComponent(Consts.defaultOutputName), new BsyncComponent(Consts.defaultOutputName), new GeneralComponent("General", 2, ["output1", "output2"])];

    (async () => {
        editor.use(ConnectionPlugin);
        editor.use(VueRenderPlugin);
        editor.use(ContextMenuPlugin);
        editor.use(ConnectionReroutePlugin);
        // editor.use(DockPlugin);
        editor.use(AreaPlugin);
        //editor.use(CommentPlugin);

        components.map(c => {
            editor.register(c);
            engine.register(c);
        });

        var startNode = await components[0].createNode();
        var bsyncNode = await components[1].createNode();
        
        startNode.position = [100, 100];
        bsyncNode.position = [400, 100];

        editor.addNode(startNode);
        editor.addNode(bsyncNode);

        editor.view.resize();
        AreaPlugin.zoomAt(editor);
        editor.trigger('process');

    })();
}