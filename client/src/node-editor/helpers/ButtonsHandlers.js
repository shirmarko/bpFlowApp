import { parseDataToSend } from "./Parser";
import { post } from "../Comunication/Controller"
import { stop, colorSecondStep} from "../EventHandlers/EventHandlers"

let shouldCallToServer = true;

export async function SendGraphToServer(editor, engine, route) {
    console.log('--------click run--------');

    // if(route === "debug"){
    //     clearPrevSelectedNodeId();
    //     clearPrevActiveNodes();
    // }
    
    console.log(editor.toJSON());
    console.log(JSON.stringify(editor.toJSON()));
    await engine.abort();
    await engine.process(editor.toJSON());

    let dataToSend = parseDataToSend(editor, editor.toJSON());
    dataToSend = JSON.stringify(dataToSend);
    console.log(dataToSend);
    post(route, dataToSend);
}

export async function OnClickStop(editor) {
    stop();
    shouldCallToServer = true;
    editor.nodes.forEach(node => {
        node.data.color = "BRIGHTGRAY";
        node.data.payloadView = {};
        node.update();
    });
    let dataToSend = editor.toJSON().id;
    post("stop", dataToSend);
}

export async function OnClickStep(editor, engine) {
    console.log(editor.toJSON());
    await engine.abort();
    await engine.process(editor.toJSON());
    let dataToSend = editor.toJSON().id;

    if(shouldCallToServer){
        shouldCallToServer = false;
        post("step", dataToSend);
    }
    else{
        shouldCallToServer = true;
        colorSecondStep();
    }
}

export function setShouldCallToServer(newValue){
    shouldCallToServer = newValue;
}

