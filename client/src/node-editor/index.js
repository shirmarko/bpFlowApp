import Rete from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
// import DockPlugin from "rete-dock-plugin";
import CommentPlugin from "rete-comment-plugin";
import { BsyncComponent } from "./components/BsyncComponent";
import { StartComponent } from "./components/StartComponent";
import { GeneralComponent } from "./components/GeneralComponent";

const eventSource = new EventSource('http://localhost:8090/subscribe');
let editor;
let engine;

// const JsRenderPlugin = {
//   install(editor, params = {}) {
//     editor.on("rendercontrol", ({ el, control }) => {
//       if (control.render && control.render !== "js") return;

//       control.handler(el, editor);
//     });
//   }
// };

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) + "@0.1.0";
}

function parseNodeInputs(curNode) {
    let inputs = [];
    if (Object.keys(curNode.inputs).length > 0) {
        let connections = curNode.inputs.input.connections;
        for (var j in connections) {
            inputs.push(connections[j].node);
        }
    }
    curNode.inputs = inputs;
}

function parseNodeOutputs(curNode) {
    let outputs = {};
    if (Object.keys(curNode.outputs).length > 0) {
        let oldOutputs = curNode.outputs;
        for (var m in oldOutputs) {
            if (Object.keys(oldOutputs).length > 0) {
                let connections = oldOutputs[m].connections;
                let newConnections = [];
                for (var j in connections) {
                    newConnections.push(connections[j].node);
                }
                outputs[m] = newConnections;
            }
        }
    }
    curNode.outputs = outputs;
}

function parseNodeData(curNode) {
    //data:
    delete curNode.data.isBasic;
    // bp.sync( {waitFor:bp.Event("Hello,"), block:bp.Event("World!")} );
    //parse bsync:
    if (curNode.type === "Bsync") {
        let code = "";
        let body = [];
        if (curNode.data.hasOwnProperty("request")) {
            body.push(`request:bp.Event("${curNode.data["request"]}")`);
            delete curNode.data["request"];
        }
        if (curNode.data.hasOwnProperty("wait")) {
            body.push(`waitFor:bp.Event("${curNode.data["wait"]}")`);
            delete curNode.data["wait"];
        }
        if (curNode.data.hasOwnProperty("block")) {
            body.push(`block:bp.Event("${curNode.data["block"]}")`);
            delete curNode.data["block"];
        }
        code = `bp.sync( {${body.join(", ")}} );`;
        let returnPayloadCode = ["let outputs = {};","outputs[\"output\"] = payload;","return outputs;"];
        returnPayloadCode = returnPayloadCode.join("\n");
        curNode.data["code"] = `${code}\n${returnPayloadCode}`;
        curNode.type = "General";
    }
    else if(curNode.type === "Start"){
        let returnPayloadCode = ["let outputs = {};","outputs[\"output\"] = payload;","return outputs;"];
        curNode.data["code"] = returnPayloadCode.join("\n");
    }
}


function parseNodes(newData) {
    for (var i in newData.nodes) {
        let curNode = newData.nodes[i];
        delete curNode.position;

        //change name to type:
        curNode.type = curNode.name;
        delete curNode.name;

        parseNodeInputs(curNode);
        parseNodeOutputs(curNode);
        parseNodeData(curNode);
    }
}


function parseDataToSend(data) {
    let newData = JSON.parse(JSON.stringify(data));
    delete newData.comments;
    parseNodes(newData);
    return newData;
}

export async function OnClickRun() {
    console.log('--------click run--------');
    //console.log(editor.toJSON());
    await engine.abort();
    await engine.process(editor.toJSON());

    let dataToSend = parseDataToSend(editor.toJSON());
    dataToSend = JSON.stringify(dataToSend);
    console.log(JSON.stringify(editor.toJSON()));
    console.log(dataToSend);

    fetch('http://localhost:8090/run', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataToSend
    }).then(async (res) => {
        console.log("HTTPStatus: " + res.status);
        if (res.status == 200) {
            console.log("HTTP OK");
        }
        else { //internal error
            alert("There is a problem, try later.");
        }
    })

}

export function init(container) {
    // //----------------EventListener---------------
    console.log('-----init editor--------');

    eventSource.addEventListener('flowEvent', function (event) {
        console.log(event.data)
    })
    const id = createUUID();
    engine = new Rete.Engine(id);
    // var container = document.querySelector('#rete');
    editor = new Rete.NodeEditor(id, container);
    const components = [new BsyncComponent(), new StartComponent(), new GeneralComponent()];

    (async () => {
        editor.use(ConnectionPlugin);
        editor.use(VueRenderPlugin);
        editor.use(ContextMenuPlugin);
        // editor.use(DockPlugin);
        editor.use(AreaPlugin);
        editor.use(CommentPlugin);
        //editor.use(JsRenderPlugin);

        components.map(c => {
            editor.register(c);
            engine.register(c);
        });

        var bsyncNode = await components[0].createNode();
        var startNode = await components[1].createNode();

        startNode.position = [100, 100];
        bsyncNode.position = [400, 100];

        editor.addNode(startNode);
        editor.addNode(bsyncNode);

        editor.view.resize();
        AreaPlugin.zoomAt(editor);
        editor.trigger('process');

    })();
}