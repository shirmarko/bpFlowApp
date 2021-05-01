import VueRenderPlugin from "rete-vue-render-plugin";
import { InputControl } from "../controls/InputControl"
import { InputTextControl } from "../controls/InputTextControlVue.js"
import * as Socket from "../sockets";
import Rete from "rete";

//---------------------------------------Bsync-------------------------------------------------
var CustomBSyncNode = {
    template: `<div v-bind:class="[ node.data.isBasic ? 'node' : 'node1' ]"> 
    <div class="title">{{node.name}}</div>
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
    <!-- <div class="output-title">{{output.name}}</div> -->
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>

    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
      <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
      <!-- <div class="input-title" v-show="!input.showControl()">{{input.name}}</div> -->
      <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
    </div>
    
    <!-- Controls-->
    <div class="control" v-for="control in controls()" v-control="control">
            <div class="control-title">{{control.key}}:</div>
    </div>

  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
      Socket: VueRenderPlugin.Socket
    }
  }


  export class BsyncComponent extends Rete.Component {
    constructor() {
      super("Bsync");
      this.data.component = CustomBSyncNode;
    }

    builder(node) {
      var inp = new Rete.Input('input', "Input", Socket.general, true);
      var out = new Rete.Output('output', "Output", Socket.general);

      node.data.isBasic = true;
      return node
        .addInput(inp)
        .addOutput(out)
        .addControl(new InputTextControl('request'))
        .addControl(new InputTextControl('wait'))
        .addControl(new InputTextControl('block'))
    }

    worker(node, inputs, outputs) {
        
    }
  }