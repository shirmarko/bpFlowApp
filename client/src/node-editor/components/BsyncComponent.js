import VueRenderPlugin from "rete-vue-render-plugin";
import { InputTextControl } from "../controls/InputTextControlVue.js"
import { PayloadControl } from "../controls/PayloadControlVue"
import * as Socket from "../sockets";
import Rete from "rete";
export const statusColor = { BLUE: "node", GREEN: "selectedNode", RED: "blockedNode", GRAY: "activeNode" };

// node.data.color === 1 ? 'node' : 'selectedNode'
//---------------------------------------Bsync-------------------------------------------------
var CustomBSyncNode = {
    template: `<div v-bind:class="[ chooseColor(node) ]"> 
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
    },
    methods:{
      chooseColor: function (node) {
        return statusColor[node.data.color];
      },
    }
  }


  export class BsyncComponent extends Rete.Component {
    constructor(outputName) {
      super("Bsync");
      this.data.component = CustomBSyncNode;
      this.outputName = outputName;
    }

    builder(node) {
      var inp = new Rete.Input('input', "Input", Socket.general, true);
      var out = new Rete.Output(this.outputName, this.outputName, Socket.general);
      node.data.payloadView = {};
      node.data.color = "BLUE";
      return node
        .addInput(inp)
        .addOutput(out)
        .addControl(new InputTextControl('request'))
        .addControl(new InputTextControl('wait'))
        .addControl(new InputTextControl('block'))
        .addControl(new PayloadControl('payload', node.data, node.id))
    }

    worker(node, inputs, outputs) {
        
    }
  }