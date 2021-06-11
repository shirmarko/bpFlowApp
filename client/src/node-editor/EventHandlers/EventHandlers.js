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

export function selectedEventsHandler(event){
    let selectedEvents = JSON.parse(event.data);
    for(let idx in selectedEvents){
        // if(prevActiveNodes[nodeId] && !data.active[nodeId]){
            changeNodeColor(selectedEvents[idx], "GREEN");
            prevSelectedNodeId.push(selectedEvents[idx]);
        //}
    }
}

export function stepEventHandler(event) {

    let data = JSON.parse(event.data);
    console.log("STEP!!!! " + JSON.stringify(data));
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
        console.log("data.active = " + JSON.stringify(data.active));
        for(let nodeId in data.active){
            if(data.active[nodeId] > 0){
                changeNodeColor(nodeId, "DARKGRAY");
            }
        }
        isFirstStep = false;
    }

    // if(data.selectedEvent != null){
    //     changeNodeColor(data.selectedEvent, "GREEN");
    //     prevSelectedNodeId.push(data.selectedEvent);
    // }
    // for(let nodeId in data.selectedEvents){
    //     // if(prevActiveNodes[nodeId] && !data.active[nodeId]){
    //         changeNodeColor(nodeId, "GREEN");
    //         prevSelectedNodeId.push(nodeId);
    //     //}
    // }

    updatePayloads(data);
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
        if(globalData.active[nodeId] > 0){
            changeNodeColor(nodeId, "DARKGRAY");
        }
    }
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
    let data = JSON.parse(event.data);
    if(data.hasOwnProperty("data") && data.data != null){
        console.log(`${data.name}, data = ${data.data}`);
        Index.addLogLine(`${data.name}, data = ${JSON.stringify(data.data)}`);
    }
    else{
        console.log(`${data.name},`);
        Index.addLogLine(`${data.name}`);
    }
    
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