import Rete from "rete";
import EditGeneralNodeControlVue from "./EditGeneralNodeControlVue.vue"

export class EditGeneralNodeControl extends Rete.Control {
  constructor(key, numOfOutputs, name, nodeOutputs) {
    super(key);
    // console.log("outputs :" + JSON.stringify(Object.fromEntries(nodeOutputs)));
    let myNode;
    this.props = { ikey: key , numOfOutputs, name, nodeOutputs, myNode};
    this.component = EditGeneralNodeControlVue;
  }

  addNodeToProps(node){
    this.props["myNode"] = node;
  }
}
