import Rete from "rete";
import CodeControlVue from "./CodeControlVue.vue"

export class CodeControl extends Rete.Control {
  constructor(key) {
    super(key);
    this.props = { ikey: key };
    this.component = CodeControlVue;
  }
}
