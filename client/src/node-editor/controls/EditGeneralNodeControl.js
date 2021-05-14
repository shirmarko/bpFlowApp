import Rete from "rete";
import EditGeneralNodeControlVue from "./EditGeneralNodeControlVue.vue"

export class EditGeneralNodeControl extends Rete.Control {
  constructor(key, name, nodeOutputs, editor) {
    super(key);
    // console.log("outputs :" + JSON.stringify(Object.fromEntries(nodeOutputs)));
    let myNode;
    let globalEditor = editor;
    this.props = { ikey: key, name, nodeOutputs, myNode, globalEditor };
    this.component = EditGeneralNodeControlVue;
  }

  addNodeToProps(node) {
    this.props["myNode"] = node;
  }
}
