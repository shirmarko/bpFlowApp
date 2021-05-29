import VueRenderPlugin from "rete-vue-render-plugin";
import { CodeControl } from "../controls/CodeControlVue.js"
import { PayloadControl } from "../controls/PayloadControlVue"
import { OutputWithPayload } from "./OutputWithPayload.js"
import { EditGeneralNodeControl } from "../controls/EditGeneralNodeControl.js"
import * as Socket from "../sockets";
import Rete from "rete";

var CustomGeneralNode = {
    template: `<div class="node">
    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
      <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
      <!-- <div class="input-title" v-show="!input.showControl()">{{input.name}}</div> -->
      <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
    </div>
    <div class="title">&nbsp;&nbsp;{{node.id}}. {{node.name}}</div>
    <!-- Outputs-->
    <div class="outputGeneral" v-for="output in outputs()" :key="output.key">
      <div class="output-title">{{output.name}}</div>
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
    
    <!-- Controls-->
    <div id="wrapper">
        <div class="btn-group">
            <div v-for="control in controls()" v-control="control">
            </div>
        </div>
    </div>

  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
        Socket: VueRenderPlugin.Socket
    }
}


export class GeneralComponent extends Rete.Component {
    constructor(name, numOfOutputs, outputsTitles) {
        super(name);
        this.data.component = CustomGeneralNode;
        this.outputsTitles = outputsTitles;
        this.numOfOutputs = numOfOutputs;
    }

    builder(node) {
        for (let i = 0; i < this.numOfOutputs; i++) {
            node.addOutput(new OutputWithPayload(this.outputsTitles[i], this.outputsTitles[i], Socket.general));
        }
        node.data.payloadView = {};
        var inp = new Rete.Input('input', "Input", Socket.general, true);
        const editGeneralNodeControl = new EditGeneralNodeControl('edit', this.name, node.outputs, this.editor, node.id);
        node.addInput(inp)
            .addControl(new CodeControl('code', node.outputs, node.id))
            .addControl(new PayloadControl('payload', node.data, node.id))
            .addControl(editGeneralNodeControl)


        editGeneralNodeControl.addNodeToProps(node);

        return node;
    }

    worker(node, inputs, outputs) {

    }
}