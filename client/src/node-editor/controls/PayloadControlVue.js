import Rete from "rete";
import PayloadControlVue from "./PayloadControlVue.vue"

export class PayloadControl extends Rete.Control {
  constructor(key, payload) {
    super(key);
    this.props = { ikey: key , payload};
    this.component = PayloadControlVue;
  }
}
