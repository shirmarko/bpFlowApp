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
        let outputKey = editor.nodes.find(n => n.id == curNode.id).outputs.get(m).name;
        outputs[outputKey] = newConnections;
    }
    curNode.outputs = outputs;
}

function generateBsyncCode(curNode, nodeNamesToIds){
    let code = "";
    let body = [];
    let curId = parseInt(curNode.id, 10);
    if (curNode.data.hasOwnProperty("request")) {
        nodeNamesToIds[curNode.data["request"]] = curId;
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
    code = `nodesLists["active"].push(${curId});\n
            bp.sync( {${body.join(", ")}} );\n
            nodesLists["active"].splice(nodesLists["active"].indexOf(${curId}), 1);\n`;
    let returnPayloadCode = [`let outputs = {};`, `outputs["${Consts.defaultOutputName}"] = payload;`, `return outputs;`];
    returnPayloadCode = returnPayloadCode.join("\n");
    curNode.data["code"] = `${code}\n${returnPayloadCode}`;
    curNode.type = "General";
}

function generateStartCode(curNode){
    let returnPayloadCode = [`let outputs = {};`, `outputs["${Consts.defaultOutputName}"] = payload;`, `return outputs;`];
    curNode.data["code"] = returnPayloadCode.join("\n");
}

//generate outputs if the code is empty
function generateCodeGeneral(curNode, editor){
    const node = editor.nodes.find(n => n.id == curNode.id);
    let payloadsCode = [`let outputs = {};`];
    for (const [key, output] of node.outputs.entries()) {
        payloadsCode.push(`outputs["${output.name}"] = ${output.payload};`);
    }
    payloadsCode.push("return outputs;");
    payloadsCode = payloadsCode.join("\n");
    curNode.data["code"] = payloadsCode;
}

function parseNodeData(editor, curNode, nodeNamesToIds) {
    //data:
    delete curNode.data.color;
    delete curNode.data.payloadView;
    // bp.sync( {waitFor:bp.Event("Hello,"), block:bp.Event("World!")} );
    //parse bsync:
    if (curNode.type === "Bsync") {
        generateBsyncCode(curNode, nodeNamesToIds);
    }
    else if (curNode.type === "Start") {
        generateStartCode(curNode);
    }

    if(!curNode.data.hasOwnProperty("code")){ //in case code of general node wasn't edited
        generateCodeGeneral(curNode, editor);
    }
}


function parseNodes(editor, newData, nodeNamesToIds) {
    for (var i in newData.nodes) {
        let curNode = newData.nodes[i];
        delete curNode.position;

        //change name to type:
        curNode.type = curNode.name;
        delete curNode.name;

        parseNodeInputs(curNode);
        parseNodeOutputs(editor, curNode);
        parseNodeData(editor, curNode, nodeNamesToIds);
    }
}

export function parseDataToSend(editor, nodeNamesToIds) {
    let newData = JSON.parse(JSON.stringify(editor.toJSON()));
    delete newData.comments;
    parseNodes(editor, newData, nodeNamesToIds);
    return newData;
}