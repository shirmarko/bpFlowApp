import VueRenderPlugin from "rete-vue-render-plugin";
import { CodeControl } from "../controls/CodeControlVue.js"
import { EditGeneralNodeControl } from "../controls/EditGeneralNodeControl.js"
import * as Socket from "../sockets";
import Rete from "rete";

//---------------------------------------Bsync-------------------------------------------------
var CustomBSyncNode = {
    template: `<div v-bind:class="[ node.data.isBasic ? 'node' : 'node1' ]"> 
    <div class="title">{{node.name}}</div>
    <!-- Outputs-->
    <div class="outputGeneral" v-for="output in outputs()" :key="output.key">
      <div class="output-title">{{output.name}}</div>
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


export class GeneralComponent extends Rete.Component {
    constructor(numOfOutputs = 2, outputsTitles = ["output1", "output2"]) {
        super("General");
        this.data.component = CustomBSyncNode;
        this.numOfOutputs = numOfOutputs;
        this.outputsTitles = outputsTitles;
    }

    builder(node) {
        for(let i = 0; i < this.numOfOutputs; i++){
            node.addOutput(new Rete.Output(this.outputsTitles[i], this.outputsTitles[i], Socket.general));
        }
        var inp = new Rete.Input('input', "Input", Socket.general);
        node.data.isBasic = true;
        return node
            .addInput(inp)
            .addControl(new CodeControl('code'))
            .addControl(new EditGeneralNodeControl('edit', this.numOfOutputs, this.name));
    }

    worker(node, inputs, outputs) {

    }
}