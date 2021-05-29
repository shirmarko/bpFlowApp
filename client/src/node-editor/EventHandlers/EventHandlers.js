import * as Index from "../index"
import {setShouldCallToServer} from "../helpers/ButtonsHandlers"


let prevSelectedNodeId = [];
let prevActiveNodes = {};
let globalData;
let isFirstStep = true;

export function stop(){
    prevSelectedNodeId = [];
    prevActiveNodes = {};
    isFirstStep = true;
}


export function stepEventHandler(event) {

    let data = JSON.parse(event.data);
    console.log(data);
    console.log(Index.nodeNamesToIds);

    if (data.isDone) {
        endDebug();
        return;
    }

    for(let nodeId in data.blocked){
        if(data.blocked[nodeId]){
            changeNodeColor(nodeId, "RED");
        }
    }

    if(isFirstStep){
        for(let nodeId in data.active){
            if(data.active[nodeId]){
                changeNodeColor(nodeId, "DARKGRAY");
            }
        }
        updatePayloads(data);
        isFirstStep = false;
    }

    if(data.selectedEvent != null){
        changeNodeColor(data.selectedEvent, "GREEN");
        prevSelectedNodeId.push(data.selectedEvent);
    }
    for(let nodeId in prevActiveNodes){
        if(prevActiveNodes[nodeId] && !data.active[nodeId]){
            changeNodeColor(nodeId, "GREEN");
            prevSelectedNodeId.push(nodeId);
        }
    }

    
    globalData = data;
    prevActiveNodes = data.active;
};

export function colorSecondStep(){
     //clear all "already-selected" nodes and update selected-list
    if (prevSelectedNodeId.length > 0) {
        for(var i = 0 ; i < prevSelectedNodeId.length ; i++){
            changeNodeColor(prevSelectedNodeId[i], "BRIGHTGRAY");
        }
        prevSelectedNodeId = [];
    }

    for(let nodeId in globalData.active){
        if(globalData.active[nodeId]){
            changeNodeColor(nodeId, "DARKGRAY");
        }
    }
    updatePayloads(globalData);
}

function updatePayloads(data){
    //payloads update
    for(let nodeId in data.payloads){
        const node = Index.editor.nodes.find(n => n.id == nodeId);
        node.data.payloadView = data.payloads[nodeId];
        node.update();
    }
}

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
    prevSelectedNodeId = [];
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

    Index.ChangeGraphReadOnly();
    isFirstStep = true;
    setShouldCallToServer(true);
}