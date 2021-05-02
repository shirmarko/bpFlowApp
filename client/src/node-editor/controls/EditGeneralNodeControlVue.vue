<template>
  <div>
    <b-button size="sm" pill v-b-modal.editNode-modal-prevent-closing
      >Edit Node</b-button
    >

    <b-modal
      id="editNode-modal-prevent-closing"
      ref="editNode-modal"
      centered
      title="Edit Node"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="title"
          label="Title: "
          label-for="title-id"
          invalid-feedback="Please enter title"
          :state="stateTitle"
        >
          <b-form-input
            id="title-id"
            v-model="titleValue"
            :state="stateTitle"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="numberOfOutputs"
          label="Number Of Outputs: "
          label-for="numberOfOutputs-id"
          invalid-feedback="Number of outputs should be greater then 0"
          :state="stateNumber"
        >
          <b-form-spinbutton
            id="numberOfOutputs"
            v-model="numberOfOutputsValue"
            min="0"
            max="10"
            @change="handleChangeNumOfOutputs"
          ></b-form-spinbutton>
        </b-form-group>

        <b-form-group
          v-for="(output, index) in Object.fromEntries(outputs)"
          :key="`${componentKey}-${index}`"
          :id="index"
          :label="index"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
        >
          <b-form-input :id="index" v-model="output.key" trim></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
//import Modal from './Modal.vue';
import {
  BModal,
  VBModal,
  BButton,
  BFormGroup,
  BFormInput,
  BFormSpinbutton,
} from "bootstrap-vue";

import * as Socket from "../sockets";
import Rete from "rete";

export default {
  props: ["ikey", "name", "nodeOutputs", "myNode"],
  data() {
    let myData = {
      titleValue: this.name,
      numberOfOutputsValue: this.nodeOutputs.size,
      stateTitleVal: this.name.length > 0,
      stateNumberVal: this.numOfOutputs >= 0,
      outputs: this.nodeOutputs,
      componentKey: 0,
      value: 3,
    };
    for (const [key, value] of this.nodeOutputs.entries()) {
      myData[key] = value.name;
    }

    return myData;
  },
  computed: {
    stateTitle() {
      this.stateTitleVal = this.titleValue.length > 0;
      return this.stateTitleVal;
    },
    stateNumber() {
      this.stateNumberVal = this.numberOfOutputsValue >= 0;
      return this.stateNumberVal;
    },
  },
  // mounted: function () {
  //   console.log("---" + this.nodeOutputs.entries());

  //   for (const [key, value] of this.nodeOutputs.entries()) {
  //     console.log(key, value);
  //     Vue.set(this, key, value.name);
  //   }
  //   console.log(this.data);
  // },
  methods: {
    handleChangeNumOfOutputs() {
      if (this.numberOfOutputsValue > this.outputs.size) {
        this.addOutput(this.outputs.size + 1);
      } else {
        this.removeOutput(this.outputs.size);
      }
      console.log(this.outputs);
      this.forceRerender();
    },
    addOutput(i) {
      var out = new Rete.Output(`output${i}`, `Output${i}`, Socket.general);
      this.outputs.set(`output${i}`, out);
    },
    removeOutput(i) {
      this.outputs.delete(`output${i}`);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    checkFormValidity() {
      return this.stateTitleVal && this.stateNumberVal;
    },
    resetModal() {
      this.codeState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.forceRerender();

      // for(var output in this.myOutputs){
      //   this.nodeOutputs.get(key).name = value;
      // }
      for (const [key, output] of this.outputs.entries()) {
        output.name = output.key;
      }

      this.myNode.update();
      //this.putData(this.ikey, this.code);
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs["editNode-modal"].hide("editNode-modal-prevent-closing");
      });
    },
  },
  components: { BModal, BButton, BFormGroup, BFormInput, BFormSpinbutton },
  directives: { "b-modal": VBModal },
};
</script>


<style>
</style>