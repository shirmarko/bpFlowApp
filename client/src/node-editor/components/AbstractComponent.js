import VueRenderPlugin from "rete-vue-render-plugin";
import { PayloadControl } from "../controls/PayloadControlVue"
import { InputTextControl } from "../controls/InputTextControlVue.js"
import { OutputWithPayload } from "./OutputWithPayload.js"
import * as Socket from "../sockets";
import Rete from "rete";

var CustomAbstractNode = {
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
    <div class="control" v-for="control in controls()" v-if="isInputText(control)" v-control="control">
        <div class="control-title">{{control.key}}:</div>
    </div>
    <div id="wrapper">
        <div class="btn-group">
            <div v-for="control in controls()" v-if="!isInputText(control)" v-control="control">
            </div>
        </div>
    </div>

  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
        Socket: VueRenderPlugin.Socket
    },
    methods:{
        isInputText: function (control) {
            return control instanceof InputTextControl;
        },
    }
}


export class AbstractComponent extends Rete.Component {
    constructor(name) {
        super(name);
        // this.outputsTitles = outputsTitles;
        // this.numOfOutputs = numOfOutputs;
        // console.log(`numOfOutputs Ctor = ${this.numOfOutputs}`);
        this.data.component = CustomAbstractNode;
    }

    builder(node, numOfOutputs, outputsTitles) {
        for (let i = 0; i < numOfOutputs; i++) {
            node.addOutput(new OutputWithPayload(outputsTitles[i], outputsTitles[i], Socket.general));
        }
        node.data.payloadView = {};
        node.addInput(new Rete.Input('input', "Input", Socket.general, true))
            .addControl(new PayloadControl(node.data, node.id));

        return node;
    }

    worker(node, inputs, outputs) {

    }
}