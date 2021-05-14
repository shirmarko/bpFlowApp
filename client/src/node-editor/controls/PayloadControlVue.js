import Rete from "rete";
import PayloadControlVue from "./PayloadControlVue.vue"

export class PayloadControl extends Rete.Control {
  constructor(key, nodeData, nodeId) {
    super(key);
    this.props = { ikey: key , nodeData, nodeId};
    this.component = PayloadControlVue;
  }
}
