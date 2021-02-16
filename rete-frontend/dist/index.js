import NumComponent from "./components/NumComponent";
import AddComponent from "./components/AddComponent";
import BsyncComponent from "./components/BsyncComponent";
import StartComponent from "./components/StartComponent";

// const NumComponent = require("./components/NumComponent");
// const AddComponent = require("./components/AddComponent");
// const BsyncComponent = require("./components/BsyncComponent");
// const StartComponent = require("./components/StartComponent");

var engine = new Rete.Engine('demo@0.1.0');
var container = document.querySelector('#rete');
var components = [new NumComponent(), new AddComponent(), new BsyncComponent(), new StartComponent()];
var editor = new Rete.NodeEditor('demo@0.1.0', container);


//ventListener
var eventSource = new EventSource('http://localhost:8080/subscribe');

eventSource.addEventListener('flowEvent', function(event){
  console.log(event.data)
})


const JsRenderPlugin = {
    install(editor, params = {}) {
      editor.on("rendercontrol", ({ el, control }) => {
        if (control.render && control.render !== "js") return;
  
        control.handler(el, editor);
      });
    }
  };

//run app
(async () => {
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin);
    editor.use(JsRenderPlugin);
    // editor.use(ConnectionPlugin.default);
    // editor.use(VueRenderPlugin.default);    
    // editor.use(ContextMenuPlugin.default);
    // editor.use(AreaPlugin);
    // ditor.use(CommentPlugin.default);
    //editor.use(HistoryPlugin);
    //editor.use(ConnectionMasteryPlugin.default);

    //var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    // var n1 = await components[0].createNode({num: 2});
    // var n2 = await components[0].createNode({num: 4});
    // var add = await components[1].createNode();
    var bsync = await components[2].createNode();

    // n1.position = [80, 200];
    // n2.position = [80, 400];
    // add.position = [500, 240];
    bsync.position = [80,200];

    // editor.addNode(n1);
    // editor.addNode(n2);
    // editor.addNode(add);
    editor.addNode(bsync);

    //editor.connect(n1.outputs.get('num'), add.inputs.get('num'));
    //editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));


    // editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
    //   console.log('process');
    //     await engine.abort();
    //     await engine.process(editor.toJSON());
    // });

    // editor.on('process', async () => {
    //   console.log('process');
    //     await engine.abort();
    //     await engine.process(editor.toJSON());
    // });

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
    console.log(editor.toJSON());

})();

//--------------------------------------------


async function OnClickRun(){
    console.log('click run');
    console.log(editor.toJSON());
    await engine.abort();
    await engine.process(editor.toJSON());
    
    const dataToSend = JSON.stringify(editor.toJSON());

    fetch('http://localhost:8080/run',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataToSend
    }).then(async (res) => {
          console.log("HTTPStatus: "+res.status);
          if( res.status == 200){
              console.log("HTTP OK");
          }
          else{ //internal error
              alert("There is a problem, try later.");
          }
      })

}

