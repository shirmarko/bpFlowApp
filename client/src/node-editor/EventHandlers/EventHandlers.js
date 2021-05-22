import * as Index from "../index"

let prevSelectedNodeId;
let prevActiveNodes = {};


export function clearPrevSelectedNodeId(){
    prevSelectedNodeId = undefined;
}

export function clearPrevActiveNodes(){
    prevActiveNodes = {};
}

export function stepEventHandler(event) {
    //prevActiveNodes.forEach(nodeId => changeNodeColor(nodeId, "BRIGHTGRAY"));
    for(let nodeId in prevActiveNodes){
        if(prevActiveNodes[nodeId]){
            changeNodeColor(nodeId, "BRIGHTGRAY");
        }
    }

    let data = JSON.parse(event.data);
    console.log(data);
    console.log(Index.nodeNamesToIds);
    if (prevSelectedNodeId != undefined) {
        changeNodeColor(prevSelectedNodeId, "BRIGHTGRAY");
    }

    if (data.isDone) {
        endDebug();
        return;
    }

    for(let nodeId in data.blocked){
        if(data.blocked[nodeId]){
            changeNodeColor(nodeId, "RED");
        }
    }
    //data.blocked.forEach(nodeId => changeNodeColor(nodeId, "RED"));
    for(let nodeId in data.active){
        if(data.active[nodeId]){
            changeNodeColor(nodeId, "DARKGRAY");
        }
    }

    //data.active.forEach(nodeId => changeNodeColor(nodeId, "DARKGRAY"));

    if (data.selectedEvent != null) {
        //let nodeId = nodeNamesToIds[data.selectedEvent.name] == undefined ? nodeNamesToIds[`"${data.selectedEvent.name}"`] : nodeNamesToIds[data.selectedEvent.name];
        let nodeId = data.selectedEvent;
        changeNodeColor(nodeId, "GREEN");
        prevSelectedNodeId = nodeId;
    }

    //payloads update
    for(let nodeId in data.payloads){
        const node = Index.editor.nodes.find(n => n.id == nodeId);
        node.data.payloadView = data.payloads[nodeId];
        node.update();
    }

    prevActiveNodes = data.active;
};

function changeNodeColor(nodeId, color){
    const node = Index.editor.nodes.find(n => n.id == nodeId);
    node.data.color = color;
    node.update();
}

export function flowEventHandler(event) {
    console.log(event.data);
    Index.addLogLine(event.data);
};


function endDebug(){
    prevSelectedNodeId = undefined;
    prevActiveNodes = {};
    Index.editor.nodes.forEach(node => {
        node.data.color = "BRIGHTGRAY";
        node.data.payloadView = {};
        node.update();
    });
    Index.enableRunButton();
    Index.enableDebugButton();
    Index.disableStepButton();
    Index.disableStopButton();
    //for (var entry in nodeNamesToIds) delete nodeNamesToIds[entry];
}