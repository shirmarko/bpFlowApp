import * as Consts from "./Consts";

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

function parseNodeOutputs(editor, curNode) {
    let outputs = {};
    let oldOutputs = curNode.outputs;
    for (var m in oldOutputs) {
        let connections = oldOutputs[m].connections;
        let newConnections = [];
        for (var j in connections) {
            newConnections.push(connections[j].node);
        }
        let outputKey = editor.nodes.find(n => n.id == curNode.id).outputs.get(m).key;
        outputs[outputKey] = newConnections;
    }
    curNode.outputs = outputs;
}

function generateBPSyncCode(curNode){
    let body = [];
    if (curNode.data.hasOwnProperty("request") && curNode.data["request"] != "") {
        //nodeNamesToIds[curNode.data["request"]] = curId;
        body.push(`request:${curNode.data["request"]}`);
        delete curNode.data["request"];
    }
    if (curNode.data.hasOwnProperty("wait") && curNode.data["wait"] != "") {
        body.push(`waitFor:${curNode.data["wait"]}`);
        delete curNode.data["wait"];
    }
    if (curNode.data.hasOwnProperty("block") && curNode.data["block"] != "") {
        body.push(`block:${curNode.data["block"]}`);
        delete curNode.data["block"];
    }
    return body;
}

function generateBsyncCode(curNode){
    
    let hasRequest = curNode.data.hasOwnProperty("request") && curNode.data["request"] != "";
    let curId = parseInt(curNode.id, 10);
    let body = generateBPSyncCode(curNode);
    
    let code = `nodesLists["active"][${curId}] = true;\n
                bp.sync( {${body.join(", ")}} );\n
                nodesLists["active"][${curId}] = false;\n
                selectedEvents.add(${curId});\n`;
    

    let returnPayloadCode = [`let outputs = {};`, `outputs["${Consts.defaultOutputName}"] = payload;`, `return outputs;`];
    returnPayloadCode = returnPayloadCode.join("\n");
    curNode.data["code"] = `${code}\n${returnPayloadCode}`;
}

function generateGeneralCode(curNode){
    let codeBody = [];
    for (var key in curNode.data){
        if(!Consts.DefaultControlsNames.includes(key)){
            codeBody.push(`let ${key} = ${curNode.data[key]};`)
            delete curNode.data[key];
        }
    }

    codeBody.push("let outputs = {};");
    codeBody.push(curNode.data["code"]);
    codeBody.push("return outputs;")
    curNode.data["code"] = codeBody.join("\n");
}

// function generateLocalEnv(curNode){
//     let env = {};
//     for (var key in curNode.data){
//         console.log(`generateLocalEnv key = ${key}`);
//         if(!Consts.DefaultControlsNames.includes(key)){
//             console.log(`generateLocalEnv includes - ${key}`);
//             env[key] = curNode.data[key];
//             delete curNode.data[key];
//         }
//     }
//     curNode.data["env"] = env;
// }

function parseGeneralData(curNode){
    generateGeneralCode(curNode);
    //generateLocalEnv(curNode);
}

function parseNodeData(curNode) {
    //data:
    delete curNode.data.color;
    delete curNode.data.payloadView;
    //parse bsync:
    if (curNode.type === "Bsync") {
        generateBsyncCode(curNode);
    }
    else{
        parseGeneralData(curNode);
    }
    // if(!curNode.data.hasOwnProperty("code")){ //in case code of general\start node wasn't edited
    //     generateCode(curNode, editor);
    // }
}


function parseNodes(editor, newData) {
    for (var i in newData.nodes) {
        let curNode = newData.nodes[i];
        delete curNode.position;

        //change name to type:
        curNode.type = curNode.name;
        delete curNode.name;

        parseNodeInputs(curNode);
        parseNodeOutputs(editor, curNode);
        parseNodeData(curNode);

        if(curNode.type != "Start"){
            curNode.type = "General";
        }
    }
}

export function parseDataToSend(editor, data) {
    let newData = JSON.parse(JSON.stringify(data));
    delete newData.comments;
    parseNodes(editor, newData);
    return newData;
}