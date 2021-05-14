import { parseDataToSend } from "./Parser";
import { post } from "../Comunication/Controller"

export async function SendGraphToServer(editor, engine, nodeNamesToIds, route) {
    console.log('--------click run--------');
    console.log(editor.toJSON());
    console.log(JSON.stringify(editor.toJSON()));
    await engine.abort();
    await engine.process(editor.toJSON());

    let dataToSend = parseDataToSend(editor, nodeNamesToIds);
    dataToSend = JSON.stringify(dataToSend);
    console.log(dataToSend);
    post(route, dataToSend);
}

export async function OnClickStop(editor, nodeNamesToIds) {
    editor.nodes.forEach(node => {
        node.data.color = "BLUE";
        node.data.payloadView = {};
        node.update();
    });
    for (var entry in nodeNamesToIds) delete nodeNamesToIds[entry];
    let dataToSend = editor.toJSON().id;
    post("stop", dataToSend);
}

export async function OnClickStep(editor, engine) {
    console.log("STEATETGGERG!#@$!5%$@^^$#^$^");
    console.log(editor.toJSON());
    await engine.abort();
    await engine.process(editor.toJSON());
    let dataToSend = editor.toJSON().id;

    post("step", dataToSend);
}

