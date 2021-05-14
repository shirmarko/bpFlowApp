import { editor, nodeNamesToIds } from "../index"


let prevSelectedNodeId;

export function stepEventHandler(event) {
    let data = JSON.parse(event.data);
    if (prevSelectedNodeId != undefined) {
        changeNodeColor(prevSelectedNodeId, "BLUE");
    }

    if (data.isDone) {
        endDebug();
        return;
    }
    if (data.selectedEvent != null) {
        changeNodeColor(nodeNamesToIds[data.selectedEvent.name], "GREEN");
        prevSelectedNodeId = nodeNamesToIds[data.selectedEvent.name];
    }

    data.blocked.forEach(nodeId => changeNodeColor(nodeId, "RED"));
    data.active.forEach(nodeId => changeNodeColor(nodeId, "GRAY"));

    //payloads update
    for(let nodeId in data.payloads){
        const node = editor.nodes.find(n => n.id == nodeId);
        node.data.payloadView = data.payloads[nodeId];
        node.update();
    }
};

function changeNodeColor(nodeId, color){
    const node = editor.nodes.find(n => n.id == nodeId);
    node.data.color = color;
    node.update();
}

export function flowEventHandler(event) {
    console.log(event.data);
};


function endDebug(){
    editor.nodes.forEach(node => {
        node.data.color = "BLUE";
        node.data.payloadView = {};
        node.update();
    });
    for (var entry in nodeNamesToIds) delete nodeNamesToIds[entry];
}