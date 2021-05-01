import Rete from "rete";
import VueTextControl from "./InputTextControlVue.vue";

export class InputTextControl extends Rete.Control {
  constructor(key) {
    super(key);
    this.component = VueTextControl;
    this.props = { ikey: key };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
