import Rete from "rete";
import EditGeneralNodeControlVue from "./EditGeneralNodeControlVue.vue"

export class EditGeneralNodeControl extends Rete.Control {
  constructor(key, numOfOutputs, name) {
    super(key);
    this.props = { ikey: key , numOfOutputs, name};
    this.component = EditGeneralNodeControlVue;
  }
}
