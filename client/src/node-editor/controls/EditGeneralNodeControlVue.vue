<template>
  <div>
    <b-button 
    :id="`edit-control-${curNodeId}`" 
    size="sm" 
    variant="dark"
    v-b-modal.editNode-modal-prevent-closing
    v-b-tooltip.bottom="'Edit Node'">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
    </b-button>

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
            v-model="myNode.name"
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
  BTooltip,
  VBTooltip
} from "bootstrap-vue";

import * as Socket from "../sockets";
import { OutputWithPayload } from "../components/OutputWithPayload.js"

export default {
  props: ["ikey", "name", "nodeOutputs", "myNode", "globalEditor", "nodeId"],
  data() {
    return {
      titleValue: this.myNode.name,
      numberOfOutputsValue: this.nodeOutputs.size,
      stateTitleVal: this.myNode.name.length > 0,
      stateNumberVal: this.numOfOutputs >= 0,
      outputs: this.nodeOutputs,
      componentKey: 0,
      curNodeId: this.nodeId
    };
  },
  computed: {
    stateTitle() {
      this.stateTitleVal = this.myNode.name.length > 0;
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
      this.myNode.update();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs["editNode-modal"].hide("editNode-modal-prevent-closing");
      });
    },
  },
  components: { BModal, BButton, BFormGroup, BFormInput, BFormSpinbutton, BTooltip, VBTooltip },
  directives: { "b-modal": VBModal, 'b-tooltip': VBTooltip },
};
</script>


<style>
</style>