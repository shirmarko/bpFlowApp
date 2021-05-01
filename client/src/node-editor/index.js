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


const eventSource = new EventSource('http://localhost:8080/subscribe');
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


export async function OnClickRun() {
  console.log('--------click run--------');
  console.log(editor.toJSON());
  await engine.abort();
  await engine.process(editor.toJSON());

  const dataToSend = JSON.stringify(editor.toJSON());

  fetch('http://localhost:8080/run', {
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

  engine = new Rete.Engine('demo@0.1.0');
  // var container = document.querySelector('#rete');
  editor = new Rete.NodeEditor('demo@0.1.0', container);
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