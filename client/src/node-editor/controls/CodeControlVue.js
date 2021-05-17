import Rete from "rete";
import CodeControlVue from "./CodeControlVue.vue"

export class CodeControl extends Rete.Control {
  constructor(key, nodeOutputs, nodeId) {
    super(key);
    this.props = { ikey: key , nodeOutputs, nodeId};
    this.component = CodeControlVue;
  }
}
