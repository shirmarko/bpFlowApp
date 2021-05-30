import { AbstractComponent } from "./AbstractComponent"
import { CodeControl } from "../controls/CodeControlVue.js"
import { InputTextControl } from "../controls/InputTextControlVue.js"

export class WhileComponent extends AbstractComponent {
    constructor() {
        super("While");
    }

    builder(node) {
        node = AbstractComponent.prototype.builder(node,  2, [ "true", "false" ]);
        node.data.code =
`if(pred){
    outputs["true"] = payload; 
}
else{
    outputs["false"] = payload; 
}`

        node.addControl(new CodeControl(node.outputs, node.id))
            .addControl(new InputTextControl('pred'));

        return node;
    }

    worker(node, inputs, outputs) {

    }
}