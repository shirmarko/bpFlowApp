import { AbstractComponent } from "./AbstractComponent"
import { CodeControl } from "../controls/CodeControlVue.js"
import { InputTextControl } from "../controls/InputTextControlVue.js"

export class ForComponent extends AbstractComponent {
    constructor() {
        super("For");
    }

    builder(node) {
        node = AbstractComponent.prototype.builder(node,  2, [ "i<n", "i=n" ]);
        node.data.code =
`if(!payload.hasOwnProperty("i")){
    payload["i"] = 0;
}
if(payload["i"] < n){
  payload["i"]++;
  outputs["i<n"] = payload; 
}
else{
  outputs["i=n"] = payload; 
}`

        node.addControl(new InputTextControl('n'));

        return node;
    }

    worker(node, inputs, outputs) {

    }
}