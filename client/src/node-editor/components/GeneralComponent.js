import VueRenderPlugin from "rete-vue-render-plugin";
import { CodeControl } from "../controls/CodeControlVue.js"
import { EditGeneralNodeControl } from "../controls/EditGeneralNodeControl.js"
import { AbstractComponent } from "./AbstractComponent"

export class GeneralComponent extends AbstractComponent {
    constructor() {
        super("General");
    }

    builder(node) {
        node = AbstractComponent.prototype.builder(node, 1, ["output1"]);

        const editGeneralNodeControl = new EditGeneralNodeControl(this.name, node.outputs, this.editor, node.id);
        node.addControl(new CodeControl(node.outputs, node.id))
            .addControl(editGeneralNodeControl)
        editGeneralNodeControl.addNodeToProps(node);

        return node;
    }

    worker(node, inputs, outputs) {

    }
}