import VueRenderPlugin from "rete-vue-render-plugin";
import * as Socket from "../sockets";
import Rete from "rete";
import { CodeControl } from "../controls/CodeControlVue.js"
import { OutputWithPayload } from "./OutputWithPayload.js"

var CustomStartNode = {
    template: `<div class=triangle-right> 
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
    <!-- Controls-->
    <div class="control" v-for="control in controls()" v-control="control">       
    </div>
  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
      Socket: VueRenderPlugin.Socket
    }
  }

  export class StartComponent extends Rete.Component {
    constructor(outputName) {
      super("Start");
      this.data.component = CustomStartNode;
      this.outputName = outputName;
    }

    builder(node) {
      var out = new OutputWithPayload('output', this.outputName, Socket.general);
      return node
        .addOutput(out)
        .addControl(new CodeControl('code', node.outputs))
    }

    worker(node, inputs, outputs) {

    }
  }