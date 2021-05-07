import Rete from "rete";
import CodeControlVue from "./CodeControlVue.vue"

export class CodeControl extends Rete.Control {
  constructor(key, nodeOutputs) {
    super(key);
    this.props = { ikey: key , nodeOutputs};
    this.component = CodeControlVue;
  }
}
