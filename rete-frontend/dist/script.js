//----------------EventListener---------------
var eventSource = new EventSource('http://localhost:8080/subscribe');

eventSource.addEventListener('flowEvent', function(event){
  console.log('got flowEvent event!')
})
//--------------------------------------------

var numSocket = new Rete.Socket('Number value');

var VueNumControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class NumControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

//class as var
var CustomNode = {
    template: `<div v-bind:class="[ node.data.isBasic ? 'node' : 'node1' ]"> 
    <div class="title">{{node.name}}</div>
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <div class="output-title">{{output.name}}</div>
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
    <!-- Controls-->
    <div class="control" v-for="control in controls()" v-control="control"></div>
    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
      <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
      <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
      <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
    </div>
  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
      Socket: VueRenderPlugin.Socket
    }
}


// var CustomNode = {
//     template: `<div class="node" :class="[selected(), node.name] | kebab">
//     <div class="title">{{node.name}}</div>
//     <!-- Outputs-->
//     <div class="output" v-for="output in outputs()" :key="output.key">
//       <div class="output-title">{{output.name}}</div>
//       <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
//     </div>
//     <!-- Controls-->
//     <div class="control" v-for="control in controls()" v-control="control"></div>
//     <!-- Inputs-->
//     <div class="input" v-for="input in inputs()" :key="input.key">
//       <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
//       <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
//       <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
//     </div>
//   </div>`,
//     mixins: [VueRenderPlugin.mixin],
//     components: {
//       Socket: VueRenderPlugin.Socket
//     }
//   }

class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);
        node.data.isBasic = true;
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

class AddComponent extends Rete.Component {
    constructor(){
        super("Add");
        this.data.component = CustomNode;
    }

    builder(node) {
        var inp1 = new Rete.Input('num',"Number", numSocket);
        var inp2 = new Rete.Input('num2', "Number2", numSocket);
        var out = new Rete.Output('num', "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, 'num'))
        inp2.addControl(new NumControl(this.editor, 'num2'))
        node.data.isBasic = true;
        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        var curNode = this.editor.nodes.find(n => n.id == node.id);
        curNode.controls.get('preview').setValue(sum);
        curNode.data.isBasic = false;
        curNode.update();
        outputs['num'] = sum;
        //document.getElementById(node.id).className = 'node1'; 
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        var curNode = this.editor.nodes.find(n => n.id == node.id);
        curNode.controls.get('preview').setValue(sum);
        curNode.data.isBasic = false;
        curNode.update();
        outputs['num'] = sum;
        //document.getElementById(node.id).className = 'node1'; 
    }
}
var engine = new Rete.Engine('demo@0.1.0');
var container = document.querySelector('#rete');
var components = [new NumComponent(), new AddComponent()];
var editor = new Rete.NodeEditor('demo@0.1.0', container);


(async () => {
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin);
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

    var n1 = await components[0].createNode({num: 2});
    var n2 = await components[0].createNode({num: 4});
    var add = await components[1].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];
 

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(n1.outputs.get('num'), add.inputs.get('num'));
    editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));


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




async function OnClickRun(){
    console.log('click run');
    console.log(editor.toJSON());
    await engine.abort();
    await engine.process(editor.toJSON());
    
    const dataToSend = JSON.stringify(editor.toJSON());
    // fetch('http://localhost:8080/run',
    //     {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: dataToSend
    // }).then(async (res) => {
    //     console.log("HTTPStatus: "+res.status);
    //     if( res.status == 200){
    //         console.log("HTTP OK");
    //     }
    //     else{ //internal error
    //         alert("There is a problem, try later.");
    //     }
    // })

   
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