import VueRenderPlugin from "rete-vue-render-plugin";
import * as Socket from "../sockets";
import Rete from "rete";

var CustomStartNode = {
    template: `<div class=triangle-right> 
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
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
      var out = new Rete.Output('output', this.outputName, Socket.general);
      return node
        .addOutput(out)
    }

    worker(node, inputs, outputs) {

    }
  }