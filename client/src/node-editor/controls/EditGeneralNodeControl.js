import Rete from "rete";
import EditGeneralNodeControlVue from "./EditGeneralNodeControlVue.vue"

export class EditGeneralNodeControl extends Rete.Control {
  constructor(name, nodeOutputs, editor, nodeId) {
    super('edit');
    // console.log("outputs :" + JSON.stringify(Object.fromEntries(nodeOutputs)));
    let myNode;
    let globalEditor = editor;
    this.props = { ikey: 'edit', name, nodeOutputs, myNode, globalEditor, nodeId };
    this.component = EditGeneralNodeControlVue;
  }

  addNodeToProps(node) {
    this.props["myNode"] = node;
  }
}
