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
          :id="`editName-${index}`"
          :label="index"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
        >
          <b-form-input :id="`inputName-${index}`" v-model="output.name" trim></b-form-input>
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
import { OutputWithPayload } from "../components/OutputWithPayload.js"

export default {
  props: ["ikey", "name", "nodeOutputs", "myNode", "globalEditor"],
  data() {
    let myData = {
      titleValue: this.name,
      numberOfOutputsValue: this.nodeOutputs.size,
      stateTitleVal: this.name.length > 0,
      stateNumberVal: this.numOfOutputs >= 0,
      outputs: this.nodeOutputs,
      componentKey: 0
    };
    // for (const [key, value] of this.nodeOutputs.entries()) {
    //   myData[key] = value.name;
    // }

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
      var out = new OutputWithPayload(`output${i}`, `Output${i}`, Socket.general);
      this.myNode.addOutput(out);
    },
    removeOutput(i) {
      let toRemove = this.myNode.outputs.get(`output${i}`);
      while(toRemove.connections.length > 0){
          let connection = toRemove.connections[toRemove.connections.length - 1];
          this.globalEditor.view.removeConnection(connection);
          connection.remove();
      }
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

    //   for (const [key, output] of this.outputs.entries()) {
    //     output.name = output.key;
    //   }

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