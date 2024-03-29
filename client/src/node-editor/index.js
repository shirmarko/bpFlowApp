import Rete from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';
import ReadonlyPlugin from 'rete-readonly-plugin';
import FileSaver from 'file-saver';
import { BsyncComponent } from "./components/BsyncComponent";
import { StartComponent } from "./components/StartComponent";
import { GeneralComponent } from "./components/GeneralComponent";
import { ForComponent } from "./components/ForComponent";
import { WhileComponent } from "./components/WhileComponent";
import * as Consts from "./helpers/Consts";
import * as ButtonsHandlers from "./helpers/ButtonsHandlers"
import * as EventHandlers from "./EventHandlers/EventHandlers.js"



export let editor;
let engine;
let logConsoleContent;
let nevBarbuttonsVisibility;
let id;
let eventSource;

if (process.env.NODE_ENV === 'production') {
    eventSource = new EventSource(`http://132.72.116.73:48401/subscribe`);
}
else {//NODE_ENV === development
    eventSource = new EventSource(`http://localhost:8090/subscribe`);
}

eventSource.addEventListener('init', setId);
function setId(event){
    let newId = event.data;
    id = newId;
}

export async function OnClickRun() {
    ButtonsHandlers.SendGraphToServer(editor, engine, "run");
}

export async function OnClickDebug() {
    ButtonsHandlers.SendGraphToServer(editor, engine, "debug");
}

export async function OnClickStop() {
    ButtonsHandlers.OnClickStop(editor);
}

export async function OnClickStep() {
    ButtonsHandlers.OnClickStep(editor, engine);
}

export function addLogLine(line) {
    logConsoleContent.push(line);
}

export function enableStepButton() {
    nevBarbuttonsVisibility.isStepDisabled = false;
}

export function disableStepButton() {
    nevBarbuttonsVisibility.isStepDisabled = true;
}

export function enableStopButton() {
    nevBarbuttonsVisibility.isStopDisabled = false;
}

export function disableStopButton() {
    nevBarbuttonsVisibility.isStopDisabled = true;
}

export function enableDebugButton() {
    nevBarbuttonsVisibility.isDebugDisabled = false;
}

export function disableDebugButton() {
    nevBarbuttonsVisibility.isDebugDisabled = true;
}

export function enableRunButton() {
    nevBarbuttonsVisibility.isRunDisabled = false;
}

export function disableRunButton() {
    nevBarbuttonsVisibility.isRunDisabled = true;
}

export function cleanBoard() {
    editor.clear();
}

export function saveEditor() {

    const curr_editor = editor.toJSON();
    const data = JSON.stringify(curr_editor);

    const blob = new Blob([data], { type: 'application/json' })
    FileSaver.saveAs(blob, `editor.json`);
}

export async function loadEditor(json_file) {
    cleanBoard();
    const data = JSON.parse(json_file);
    data.id = id;
    await editor.fromJSON(data);
    editor.view.resize();
    AreaPlugin.zoomAt(editor);
}

export async function loadEditorExample(programName) {
    cleanBoard();
    const data = require(`../Resources/examples/${programName}.json`);
    data.id = id;
    await editor.fromJSON(data);
    editor.view.resize();
    AreaPlugin.zoomAt(editor);
}

export async function ChangeGraphReadOnly() {
    let readonlyEnabled = editor.trigger('isreadonly');
    await editor.trigger('readonly', !readonlyEnabled);

    console.log("readonly graph state: ", !readonlyEnabled);
}


export async function init(container, logContent, buttonsVisibility) {
    // //----------------EventListener---------------
    console.log('-----init editor--------');
    logConsoleContent = logContent;
    nevBarbuttonsVisibility = buttonsVisibility;
    eventSource.addEventListener('flowEvent', EventHandlers.flowEventHandler);
    eventSource.addEventListener('step', EventHandlers.stepEventHandler);
    eventSource.addEventListener('selectedEvents', EventHandlers.selectedEventsHandler);

    while(id === undefined){
        await new Promise(r => setTimeout(r, 2000));
    }
    engine = new Rete.Engine(id);

    editor = new Rete.NodeEditor(id, container);
    const components = [new StartComponent(Consts.defaultOutputName), new BsyncComponent(Consts.defaultOutputName),
        new GeneralComponent(), new ForComponent(), new WhileComponent()];

    (async () => {
        editor.use(ConnectionPlugin);
        editor.use(VueRenderPlugin);
        editor.use(ContextMenuPlugin);
        editor.use(ConnectionReroutePlugin);
        editor.use(ReadonlyPlugin, { enabled: false }); // enabled is true by default
        // editor.use(DockPlugin);
        editor.use(AreaPlugin);


        components.map(c => {
            editor.register(c);
            engine.register(c);
        });

        const data = require("../Resources/examples/HelloWorld.json");
        data.id = id;
        await editor.fromJSON(data);
        editor.view.resize();
        AreaPlugin.zoomAt(editor);

        editor.trigger('process');
    })();
}