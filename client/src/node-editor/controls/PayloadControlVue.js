import Rete from "rete";
import PayloadControlVue from "./PayloadControlVue.vue"

export class PayloadControl extends Rete.Control {
  constructor(nodeData, nodeId) {
    super('payloadView');
    this.props = { ikey: 'payloadView' , nodeData, nodeId};
    this.component = PayloadControlVue;
  }
}
