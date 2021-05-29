import Rete from "rete";
import CodeControlVue from "./CodeControlVue.vue"

export class CodeControl extends Rete.Control {
  constructor(nodeOutputs, nodeId) {
    super("code");
    this.props = { ikey: "code" , nodeOutputs, nodeId};
    this.component = CodeControlVue;
  }
}
